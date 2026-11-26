<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
  joinExamRoom,
  findExamRoomByCode,
  updateParticipantProgress,
  gradeExamAnswers,
  subscribeToRoom,
  fetchRoomParticipants
} from '../lib/examService'
import { playButtonPop, playCorrectChime, playFanfare } from '../lib/soundEffects'
import {
  Trophy, KeyRound, User, Hash, ArrowRight, Clock, Volume2, VolumeX,
  CheckCircle2, ChevronLeft, ChevronRight, Send, Sparkles, LogOut,
  Users, AlertCircle, BookOpen, ShieldCheck
} from '@lucide/vue'

const SESSION_KEY = 'prisma_active_exam_session_v1'

// Form join
const roomCodeInput = ref('')
const studentNameInput = ref('')
const studentAbsenInput = ref('')
const isJoining = ref(false)
const joinError = ref('')

// Active exam state
const activeRoom = ref(null)
const activeParticipant = ref(null)
const lobbyParticipantsCount = ref(1)
const questions = ref([])
const currentIndex = ref(0)
const answers = ref({})
const showConfirmSubmit = ref(false)
const isSubmitting = ref(false)
const isSpeaking = ref(false)

// Timer state
const remainingSeconds = ref(null)
let timerInterval = null
let unsubscribeRoom = null

const phase = computed(() => {
  if (!activeRoom.value || !activeParticipant.value) return 'join'
  if (activeParticipant.value.status === 'submitted' || activeRoom.value.status === 'finished') {
    return 'finished'
  }
  if (activeRoom.value.status === 'running') {
    return 'running'
  }
  return 'waiting'
})

const currentQuestion = computed(() => {
  return questions.value[currentIndex.value] || null
})

function isQuestionAnswered(idx) {
  const val = answers.value[idx]
  if (Array.isArray(val)) return val.length > 0
  if (typeof val === 'string') return val.trim().length > 0
  if (val && typeof val === 'object') {
    return Object.values(val).some(v => String(v || '').trim().length > 0)
  }
  return val !== undefined && val !== null
}

const answeredCount = computed(() => {
  return questions.value.filter((_, idx) => isQuestionAnswered(idx)).length
})

const formattedTimer = computed(() => {
  if (remainingSeconds.value === null) return 'Tanpa Batas'
  const m = Math.floor(remainingSeconds.value / 60)
  const s = remainingSeconds.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function saveLocalSession() {
  if (!activeRoom.value || !activeParticipant.value) {
    sessionStorage.removeItem(SESSION_KEY)
    return
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({
    roomCode: activeRoom.value.roomCode,
    participant: activeParticipant.value,
    answers: answers.value
  }))
}

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function setupQuestions(room) {
  const raw = Array.isArray(room?.questions) ? room.questions : []
  if (questions.value.length > 0) return
  questions.value = room?.settings?.shuffleQuestions ? shuffleArray(raw) : raw
}

function getShuffledOrderOptions(q) {
  if (!q._shuffledRight) {
    const rights = (q.pairs || []).map(p => p.right).filter(Boolean)
    q._shuffledRight = shuffleArray(rights)
  }
  return q._shuffledRight
}

function setMatchingAnswer(qIdx, pairIdx, rightVal) {
  playButtonPop()
  const prev = (answers.value[qIdx] && typeof answers.value[qIdx] === 'object' && !Array.isArray(answers.value[qIdx]))
    ? { ...answers.value[qIdx] }
    : {}
  prev[pairIdx] = rightVal
  answers.value = { ...answers.value, [qIdx]: prev }
  saveLocalSession()
}

function getOrderingList(qIdx, q) {
  if (Array.isArray(answers.value[qIdx]) && answers.value[qIdx].length > 0) {
    return answers.value[qIdx]
  }
  if (!q._initialOrder) {
    const items = Array.isArray(q.correctOrder) ? [...q.correctOrder] : []
    q._initialOrder = shuffleArray(items)
  }
  return q._initialOrder
}

function moveOrderItem(qIdx, q, idx, dir) {
  playButtonPop()
  const list = [...getOrderingList(qIdx, q)]
  const target = idx + dir
  if (target < 0 || target >= list.length) return
  ;[list[idx], list[target]] = [list[target], list[idx]]
  answers.value = { ...answers.value, [qIdx]: list }
  saveLocalSession()
}

function startTimerIfNeeded(room) {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  const durationMin = Number(room?.durationMinutes || 0)
  if (!durationMin || room?.status !== 'running') {
    remainingSeconds.value = null
    return
  }

  const startMs = room.startedAt ? new Date(room.startedAt).getTime() : Date.now()
  const endMs = startMs + durationMin * 60 * 1000

  const tick = () => {
    const diff = Math.max(0, Math.floor((endMs - Date.now()) / 1000))
    remainingSeconds.value = diff
    if (diff <= 0 && phase.value === 'running' && !isSubmitting.value) {
      clearInterval(timerInterval)
      timerInterval = null
      handleSubmitExam(true)
    }
  }
  tick()
  timerInterval = setInterval(tick, 1000)
}

function attachRealtime(roomId) {
  if (unsubscribeRoom) unsubscribeRoom()
  unsubscribeRoom = subscribeToRoom(roomId, {
    onRoomUpdate: (updatedRoom) => {
      if (!updatedRoom) return
      // Jangan ubah layar siswa yang sudah selesai atau berasal dari sesi sebelumnya
      if (
        activeParticipant.value?.status === 'submitted' ||
        Number(updatedRoom.sessionNumber || 1) !== Number(activeParticipant.value?.sessionNumber || 1)
      ) {
        return
      }
      const prevStatus = activeRoom.value?.status
      activeRoom.value = updatedRoom
      setupQuestions(updatedRoom)
      if (updatedRoom.status === 'running' && prevStatus !== 'running') {
        playCorrectChime()
        if (activeParticipant.value && activeParticipant.value.status === 'joined') {
          activeParticipant.value = { ...activeParticipant.value, status: 'working' }
          updateParticipantProgress(activeParticipant.value.id, updatedRoom.id, {
            status: 'working',
            sessionNumber: activeParticipant.value.sessionNumber
          })
        }
        startTimerIfNeeded(updatedRoom)
      }
      if (updatedRoom.status === 'finished' && activeParticipant.value?.status !== 'submitted') {
        handleSubmitExam(true)
      }
    },
    onParticipantsUpdate: (list) => {
      const currentSess = Number(activeRoom.value?.sessionNumber || 1)
      const sessionList = list.filter(p => Number(p.sessionNumber || 1) === currentSess)
      lobbyParticipantsCount.value = sessionList.length
      if (activeParticipant.value) {
        const stillThere = sessionList.find(p => p.id === activeParticipant.value.id)
        if (!stillThere && activeRoom.value?.status === 'waiting') {
          // Dikeluarkan oleh guru dari lobby
          handleLeaveRoom('Kamu telah dikeluarkan dari ruang tunggu oleh guru.')
        }
      }
    }
  })
}

async function handleJoinRoom() {
  joinError.value = ''
  const code = roomCodeInput.value.trim().toUpperCase()
  const name = studentNameInput.value.trim()
  if (!code) {
    joinError.value = 'Masukkan kode room dari guru terlebih dahulu.'
    return
  }
  if (!name) {
    joinError.value = 'Masukkan nama lengkap kamu terlebih dahulu.'
    return
  }

  isJoining.value = true
  playButtonPop()
  try {
    const { room, participant } = await joinExamRoom(code, {
      studentName: name,
      studentAbsen: studentAbsenInput.value.trim()
    })
    activeRoom.value = room
    activeParticipant.value = participant
    answers.value = {}
    currentIndex.value = 0
    questions.value = []
    setupQuestions(room)
    const parts = await fetchRoomParticipants(room.id)
    const currentSess = Number(room.sessionNumber || 1)
    lobbyParticipantsCount.value = parts.filter(p => Number(p.sessionNumber || 1) === currentSess).length
    saveLocalSession()
    attachRealtime(room.id)
    if (room.status === 'running') {
      startTimerIfNeeded(room)
    }
    playCorrectChime()
  } catch (err) {
    joinError.value = err.message || 'Gagal bergabung ke room ujian.'
  } finally {
    isJoining.value = false
  }
}

function selectOption(qIdx, optIdx) {
  playButtonPop()
  answers.value = { ...answers.value, [qIdx]: optIdx }
  saveLocalSession()
}

function toggleMultiSelect(qIdx, optIdx) {
  playButtonPop()
  const prev = Array.isArray(answers.value[qIdx]) ? [...answers.value[qIdx]] : []
  const pos = prev.indexOf(optIdx)
  if (pos >= 0) prev.splice(pos, 1)
  else prev.push(optIdx)
  answers.value = { ...answers.value, [qIdx]: prev }
  saveLocalSession()
}

function updateTextAnswer(qIdx, val) {
  answers.value = { ...answers.value, [qIdx]: val }
  saveLocalSession()
}

async function handleSubmitExam(auto = false) {
  if (isSubmitting.value || !activeRoom.value || !activeParticipant.value) return
  isSubmitting.value = true
  showConfirmSubmit.value = false
  stopSpeaking()

  try {
    // Pastikan soal bertipe ordering yang belum digeser tetap memakai urutan yang tampil di layar siswa
    const finalAnswers = { ...answers.value }
    questions.value.forEach((q, idx) => {
      if (q.type === 'ordering' && !Array.isArray(finalAnswers[idx]) && Array.isArray(q._initialOrder)) {
        finalAnswers[idx] = [...q._initialOrder]
      }
    })
    answers.value = finalAnswers

    const { score, correctCount, totalCount } = gradeExamAnswers(questions.value, finalAnswers)
    const submittedAt = new Date().toISOString()
    const updated = await updateParticipantProgress(activeParticipant.value.id, activeRoom.value.id, {
      status: 'submitted',
      answers: answers.value,
      sessionNumber: activeParticipant.value.sessionNumber,
      score,
      correctCount,
      totalCount,
      submittedAt
    })
    activeParticipant.value = updated || {
      ...activeParticipant.value,
      status: 'submitted',
      answers: answers.value,
      score,
      correctCount,
      totalCount,
      submittedAt
    }
    saveLocalSession()
    if (!auto) playFanfare()
  } finally {
    isSubmitting.value = false
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }
}

function handleLeaveRoom(message = '') {
  stopSpeaking()
  if (unsubscribeRoom) {
    unsubscribeRoom()
    unsubscribeRoom = null
  }
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  activeRoom.value = null
  activeParticipant.value = null
  questions.value = []
  answers.value = {}
  currentIndex.value = 0
  sessionStorage.removeItem(SESSION_KEY)
  if (message) joinError.value = message
}

function speakCurrentQuestion() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !currentQuestion.value) return
  if (isSpeaking.value) {
    stopSpeaking()
    return
  }
  window.speechSynthesis.cancel()
  const q = currentQuestion.value
  let extraText = ''
  if (q.type === 'matching' && Array.isArray(q.pairs)) {
    extraText = '. Pasangkan item berikut: ' + q.pairs.map((p, i) => `${i + 1}, ${p.left || ''}`).join('. ')
  } else if (q.type === 'ordering' && Array.isArray(q.correctOrder)) {
    extraText = '. Urutkan kartu berikut: ' + getOrderingList(currentIndex.value, q).join(', ')
  } else if (Array.isArray(q.options) && q.options.length && q.type !== 'fill_in_blank') {
    extraText = '. Pilihan jawaban: ' + q.options.map((o, i) => `${String.fromCharCode(65 + i)}, ${o.text || ''}`).join('. ')
  }
  const utterance = new SpeechSynthesisUtterance(`${q.question || ''}${extraText}`)
  utterance.lang = 'id-ID'
  utterance.rate = 0.92
  utterance.onend = () => { isSpeaking.value = false }
  utterance.onerror = () => { isSpeaking.value = false }
  isSpeaking.value = true
  window.speechSynthesis.speak(utterance)
}

function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isSpeaking.value = false
}

watch(currentIndex, () => {
  stopSpeaking()
})

onMounted(async () => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed?.roomCode && parsed?.participant) {
        const room = await findExamRoomByCode(parsed.roomCode)
        const sameSession = room && Number(room.sessionNumber || 1) === Number(parsed.participant.sessionNumber || 1)
        if (room && sameSession) {
          activeRoom.value = room
          activeParticipant.value = parsed.participant
          answers.value = parsed.answers || {}
          setupQuestions(room)
          attachRealtime(room.id)
          if (room.status === 'running' && parsed.participant.status !== 'submitted') {
            startTimerIfNeeded(room)
          }
        } else {
          sessionStorage.removeItem(SESSION_KEY)
        }
      }
    }
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
  }
})

onUnmounted(() => {
  stopSpeaking()
  if (unsubscribeRoom) unsubscribeRoom()
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <section class="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 font-['Lexend'] text-[#2B3445]">

    <!-- ==================== FASE 1: MASUK ROOM (JOIN) ==================== -->
    <div v-if="phase === 'join'" class="max-w-xl mx-auto">
      <div class="card-prisma bg-white p-6 sm:p-10 space-y-6 animate-soft-pop relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1.5 prisma-spectrum-bar"></div>
        <div class="text-center space-y-2">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316]/20 via-[#FFDE7A]/30 to-[#7C3AED]/20 border-2 border-[#F97316]/40 text-[#EA580C] flex items-center justify-center mx-auto">
            <Trophy class="w-8 h-8" />
          </div>
          <h1 class="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#2B3445]">
            Ruang Ujian & Ulangan
          </h1>
          <p class="text-xs sm:text-sm text-[#5B6474] leading-relaxed">
            Masukkan <strong>Kode Room</strong> dari Ibu/Bapak Guru dan nama lengkapmu untuk mulai bergabung.
          </p>
        </div>

        <div v-if="joinError" class="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
          <span>{{ joinError }}</span>
        </div>

        <form @submit.prevent="handleJoinRoom" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-[#2B3445] mb-1.5">
              Kode Room Ujian <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <KeyRound class="w-5 h-5 text-[#1E7A6F] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                v-model="roomCodeInput"
                @input="roomCodeInput = roomCodeInput.toUpperCase()"
                type="text"
                maxlength="8"
                placeholder="Contoh: PRM482"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-lg font-extrabold tracking-[0.2em] uppercase text-[#1E7A6F] placeholder:tracking-normal placeholder:font-medium placeholder:text-sm placeholder:text-[#8F8575]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-[#2B3445] mb-1.5">
                Nama Lengkap Siswa <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <User class="w-4 h-4 text-[#5B6474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  v-model="studentNameInput"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  class="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#2B3445] mb-1.5">
                No. Absen
              </label>
              <div class="relative">
                <Hash class="w-4 h-4 text-[#5B6474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  v-model="studentAbsenInput"
                  type="text"
                  placeholder="07"
                  class="w-full pl-9 pr-3 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isJoining"
            class="w-full py-3.5 px-6 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition cursor-pointer disabled:opacity-60 active:scale-[0.99]"
          >
            <span>{{ isJoining ? 'Sedang Masuk...' : 'Gabung ke Room Ujian' }}</span>
            <ArrowRight class="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>

    <!-- ==================== FASE 2: RUANG TUNGGU (WAITING LOBBY) ==================== -->
    <div v-else-if="phase === 'waiting'" class="max-w-3xl mx-auto">
      <div class="card-prisma bg-white p-8 sm:p-12 text-center space-y-7 animate-soft-pop">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFDE7A]/40 border border-[#FFDE7A] text-[#2B3445] text-sm font-bold">
          <Sparkles class="w-4 h-4 text-[#D97706]" />
          <span>Berhasil Masuk Room {{ activeRoom.roomCode }}</span>
        </div>

        <div class="space-y-2">
          <h2 class="font-['Baloo_2'] text-3xl sm:text-4xl font-extrabold text-[#2B3445]">
            {{ activeRoom.title }}
          </h2>
          <p class="text-sm sm:text-base font-semibold text-[#1E7A6F]">
            {{ activeRoom.mataPelajaran }} • {{ activeRoom.kelas }} • {{ questions.length }} Soal
            <span v-if="activeRoom.durationMinutes"> • {{ activeRoom.durationMinutes }} Menit</span>
          </p>
        </div>

        <div class="p-7 sm:p-9 rounded-3xl bg-[#FFF8F0] border-2 border-[#8F8575]/20 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-[#1E7A6F] text-white flex items-center justify-center mx-auto animate-bounce shadow-md">
            <Clock class="w-8 h-8" />
          </div>
          <p class="font-['Baloo_2'] text-xl sm:text-2xl font-extrabold text-[#2B3445]">
            Halo, {{ activeParticipant.studentName }}!
          </p>
          <p class="text-sm sm:text-base text-[#5B6474] leading-relaxed max-w-xl mx-auto">
            Duduk yang tenang ya. Ujian akan dimulai otomatis begitu Ibu/Bapak Guru menekan tombol <strong>Mulai</strong>.
          </p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#8F8575]/25 text-sm font-bold text-[#1E7A6F] shadow-2xs">
            <Users class="w-4 h-4" />
            <span>{{ lobbyParticipantsCount }} siswa sudah bergabung</span>
          </div>
        </div>

        <button
          @click="handleLeaveRoom()"
          class="btn-prisma-white px-6 py-3 rounded-2xl text-sm font-bold text-[#5B6474] inline-flex items-center gap-2 cursor-pointer"
        >
          <LogOut class="w-4 h-4" />
          <span>Keluar dari Room</span>
        </button>
      </div>
    </div>

    <!-- ==================== FASE 3: MENGERJAKAN UJIAN (RUNNER) ==================== -->
    <div v-else-if="phase === 'running'" class="space-y-5">
      <!-- Top Bar Ujian -->
      <div class="card-prisma bg-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-[#1E7A6F]">
            {{ activeRoom.mataPelajaran }} • {{ activeRoom.kelas }}
          </p>
          <h2 class="font-['Baloo_2'] text-lg sm:text-xl font-extrabold text-[#2B3445]">
            {{ activeRoom.title }}
          </h2>
        </div>

        <div class="flex items-center gap-2.5">
          <div class="px-3.5 py-2 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold text-[#2B3445]">
            Terjawab: <span class="text-[#1E7A6F]">{{ answeredCount }}/{{ questions.length }}</span>
          </div>

          <div
            :class="[
              'px-3.5 py-2 rounded-2xl border text-xs font-extrabold flex items-center gap-1.5',
              remainingSeconds !== null && remainingSeconds <= 60
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                : 'bg-[#7FD4C4]/25 border-[#7FD4C4] text-[#1E7A6F]'
            ]"
          >
            <Clock class="w-4 h-4" />
            <span>{{ formattedTimer }}</span>
          </div>
        </div>
      </div>

      <!-- Navigasi Nomor Soal -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(q, idx) in questions"
          :key="idx"
          @click="currentIndex = idx; playButtonPop()"
          :class="[
            'w-9 h-9 rounded-xl text-xs font-extrabold border-2 transition cursor-pointer',
            currentIndex === idx
              ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
              : isQuestionAnswered(idx)
                ? 'bg-[#7FD4C4]/30 text-[#1E7A6F] border-[#7FD4C4]'
                : 'bg-white text-[#5B6474] border-[#8F8575]/25 hover:border-[#1E7A6F]/50'
          ]"
        >
          {{ idx + 1 }}
        </button>
      </div>

      <!-- Kartu Soal Aktif -->
      <div v-if="currentQuestion" class="card-prisma bg-white p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between gap-3">
          <span class="px-3 py-1 rounded-full bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold text-[#1E7A6F]">
            Soal {{ currentIndex + 1 }} dari {{ questions.length }}
          </span>

          <button
            @click="speakCurrentQuestion"
            class="px-3.5 py-1.5 rounded-full bg-[#FFF8F0] hover:bg-[#7FD4C4]/25 border border-[#8F8575]/25 text-xs font-bold text-[#2B3445] inline-flex items-center gap-1.5 cursor-pointer transition"
          >
            <VolumeX v-if="isSpeaking" class="w-4 h-4 text-rose-500" />
            <Volume2 v-else class="w-4 h-4 text-[#1E7A6F]" />
            <span>{{ isSpeaking ? 'Hentikan Suara' : 'Bacakan Soal' }}</span>
          </button>
        </div>

        <div v-if="currentQuestion.image" class="rounded-2xl overflow-hidden border border-[#8F8575]/20 bg-[#FFF8F0] max-h-64 flex items-center justify-center">
          <img :src="currentQuestion.image" alt="Gambar soal" class="max-h-64 object-contain" />
        </div>

        <h3 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#2B3445] leading-snug">
          {{ currentQuestion.question }}
        </h3>

        <!-- Tipe: Pilihan Ganda / Benar-Salah -->
        <div
          v-if="!currentQuestion.type || currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false'"
          class="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <button
            v-for="(opt, oIdx) in (currentQuestion.options || [])"
            :key="oIdx"
            @click="selectOption(currentIndex, oIdx)"
            :class="[
              'p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition cursor-pointer',
              answers[currentIndex] === oIdx
                ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] text-[#2B3445] shadow-sm'
                : 'bg-[#FFF8F0] border-[#8F8575]/25 hover:border-[#1E7A6F]/50 text-[#2B3445]'
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0',
                answers[currentIndex] === oIdx ? 'bg-[#1E7A6F] text-white' : 'bg-white text-[#5B6474] border border-[#8F8575]/25'
              ]"
            >
              {{ String.fromCharCode(65 + oIdx) }}
            </span>
            <div class="flex-1 min-w-0">
              <img v-if="opt.image" :src="opt.image" alt="" class="w-16 h-16 object-cover rounded-xl mb-2" />
              <p class="text-sm font-semibold break-words">{{ opt.text }}</p>
            </div>
          </button>
        </div>

        <!-- Tipe: Pilih Banyak Jawaban -->
        <div v-else-if="currentQuestion.type === 'multi_select'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="(opt, oIdx) in (currentQuestion.options || [])"
            :key="oIdx"
            @click="toggleMultiSelect(currentIndex, oIdx)"
            :class="[
              'p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition cursor-pointer',
              Array.isArray(answers[currentIndex]) && answers[currentIndex].includes(oIdx)
                ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] text-[#2B3445]'
                : 'bg-[#FFF8F0] border-[#8F8575]/25 hover:border-[#1E7A6F]/50'
            ]"
          >
            <span
              :class="[
                'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 border',
                Array.isArray(answers[currentIndex]) && answers[currentIndex].includes(oIdx)
                  ? 'bg-[#1E7A6F] border-[#1E7A6F] text-white'
                  : 'bg-white border-[#8F8575]/40'
              ]"
            >
              ✓
            </span>
            <span class="text-sm font-semibold">{{ opt.text }}</span>
          </button>
        </div>

        <!-- Tipe: Isian Singkat -->
        <div v-else-if="currentQuestion.type === 'fill_in_blank'" class="space-y-2">
          <label class="block text-xs font-bold text-[#5B6474]">Ketik jawaban singkatmu di bawah ini:</label>
          <input
            :value="answers[currentIndex] || ''"
            @input="updateTextAnswer(currentIndex, $event.target.value)"
            type="text"
            placeholder="Tulis jawabanmu di sini..."
            class="w-full px-4 py-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-base font-bold"
          />
        </div>

        <!-- Tipe: Hubungkan Garis / Pasangan (Matching) -->
        <div v-else-if="currentQuestion.type === 'matching'" class="space-y-3">
          <p class="text-xs font-bold text-[#5B6474]">Pilih pasangan yang tepat untuk setiap item di sebelah kiri:</p>
          <div
            v-for="(pair, pIdx) in (currentQuestion.pairs || [])"
            :key="pIdx"
            class="flex flex-col sm:flex-row sm:items-center gap-2.5 p-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25"
          >
            <div class="flex-1 text-sm font-bold text-[#2B3445]">
              {{ pIdx + 1 }}. {{ pair.left }}
            </div>
            <span class="hidden sm:inline text-[#1E7A6F] font-bold">➔</span>
            <select
              :value="(answers[currentIndex] && answers[currentIndex][pIdx]) || ''"
              @change="setMatchingAnswer(currentIndex, pIdx, $event.target.value)"
              class="flex-1 px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
            >
              <option value="">-- Pilih pasangan --</option>
              <option
                v-for="(rightOpt, rIdx) in getShuffledOrderOptions(currentQuestion)"
                :key="rIdx"
                :value="rightOpt"
              >
                {{ rightOpt }}
              </option>
            </select>
          </div>
        </div>

        <!-- Tipe: Urutkan Kartu (Ordering) -->
        <div v-else-if="currentQuestion.type === 'ordering'" class="space-y-3">
          <p class="text-xs font-bold text-[#5B6474]">Urutkan kartu dari nomor 1 hingga akhir menggunakan tombol panah:</p>
          <div
            v-for="(itemText, oIdx) in getOrderingList(currentIndex, currentQuestion)"
            :key="oIdx"
            class="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-8 h-8 rounded-xl bg-[#1E7A6F] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                {{ oIdx + 1 }}
              </span>
              <span class="text-sm font-bold text-[#2B3445] break-words">{{ itemText }}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                @click="moveOrderItem(currentIndex, currentQuestion, oIdx, -1)"
                :disabled="oIdx === 0"
                class="px-2.5 py-1.5 rounded-xl bg-white border border-[#8F8575]/30 text-xs font-bold cursor-pointer disabled:opacity-35"
                title="Naikkan"
              >
                ▲
              </button>
              <button
                type="button"
                @click="moveOrderItem(currentIndex, currentQuestion, oIdx, 1)"
                :disabled="oIdx === getOrderingList(currentIndex, currentQuestion).length - 1"
                class="px-2.5 py-1.5 rounded-xl bg-white border border-[#8F8575]/30 text-xs font-bold cursor-pointer disabled:opacity-35"
                title="Turunkan"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Navigasi -->
        <div class="pt-4 border-t border-[#8F8575]/20 flex items-center justify-between gap-3">
          <button
            @click="currentIndex = Math.max(0, currentIndex - 1); playButtonPop()"
            :disabled="currentIndex === 0"
            class="btn-prisma-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft class="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            v-if="currentIndex < questions.length - 1"
            @click="currentIndex = currentIndex + 1; playButtonPop()"
            class="px-5 py-2.5 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer transition"
          >
            <span>Berikutnya</span>
            <ChevronRight class="w-4 h-4" />
          </button>

          <button
            v-else
            @click="showConfirmSubmit = true; playButtonPop()"
            class="px-5 py-2.5 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm transition"
          >
            <Send class="w-4 h-4" />
            <span>Kumpulkan Ujian</span>
          </button>
        </div>
      </div>

      <!-- Modal Konfirmasi Kumpulkan -->
      <div v-if="showConfirmSubmit" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="card-prisma bg-white p-6 sm:p-8 max-w-md w-full text-center space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-[#FFDE7A]/40 text-[#D97706] flex items-center justify-center mx-auto">
            <ShieldCheck class="w-7 h-7" />
          </div>
          <h3 class="font-['Baloo_2'] text-xl font-extrabold text-[#2B3445]">Kumpulkan Jawaban?</h3>
          <p class="text-xs sm:text-sm text-[#5B6474]">
            Kamu sudah menjawab <strong>{{ answeredCount }} dari {{ questions.length }}</strong> soal. Setelah dikumpulkan, jawaban tidak bisa diubah lagi.
          </p>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button
              @click="showConfirmSubmit = false"
              class="btn-prisma-white px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
            >
              Periksa Lagi
            </button>
            <button
              @click="handleSubmitExam(false)"
              :disabled="isSubmitting"
              class="px-5 py-2.5 rounded-2xl bg-[#1E7A6F] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
            >
              {{ isSubmitting ? 'Mengirim...' : 'Ya, Kumpulkan!' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== FASE 4: SELESAI ==================== -->
    <div v-else class="max-w-lg mx-auto">
      <div class="card-prisma bg-white p-6 sm:p-10 text-center space-y-6 animate-soft-pop">
        <div class="w-16 h-16 rounded-2xl bg-[#7FD4C4]/30 border-2 border-[#7FD4C4] text-[#1E7A6F] flex items-center justify-center mx-auto">
          <CheckCircle2 class="w-9 h-9" />
        </div>

        <div class="space-y-1.5">
          <h2 class="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#2B3445]">
            Hebat, {{ activeParticipant.studentName }}!
          </h2>
          <p class="text-xs sm:text-sm text-[#5B6474]">
            Jawaban untuk <strong>{{ activeRoom.title }}</strong> sudah berhasil dikumpulkan.
          </p>
        </div>

        <div v-if="activeRoom.settings?.showScoreToStudent !== false" class="p-6 rounded-2xl bg-[#FFF8F0] border-2 border-[#7FD4C4] space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-[#1E7A6F]">Nilai Kamu</p>
          <p class="font-['Baloo_2'] text-5xl font-extrabold text-[#1E7A6F]">
            {{ activeParticipant.score }}
          </p>
          <p class="text-xs font-semibold text-[#5B6474]">
            Benar {{ activeParticipant.correctCount }} dari {{ activeParticipant.totalCount }} soal
          </p>
        </div>

        <div v-else class="p-5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474]">
          Nilai akan dibagikan oleh Ibu/Bapak Guru setelah seluruh siswa selesai.
        </div>

        <button
          @click="handleLeaveRoom()"
          class="w-full py-3.5 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer transition"
        >
          <BookOpen class="w-4 h-4" />
          <span>Kembali ke Halaman Masuk Ujian</span>
        </button>
      </div>
    </div>
  </section>
</template>
