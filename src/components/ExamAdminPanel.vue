<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  examRooms,
  isLoadingExams,
  fetchExamRooms,
  createExamRoom,
  updateExamRoom,
  deleteExamRoom,
  generateRoomCode,
  fetchRoomParticipants,
  removeParticipant,
  subscribeToRoom
} from '../lib/examService'
import { materiList, KELAS_SD_OPTIONS, getKelasFromLevel } from '../lib/materiService'
import { currentUser, adminManagedKelas } from '../lib/authService'
import { uploadImage, isCloudinaryConfigured } from '../lib/cloudinary'
import { searchRelevantImages } from '../lib/imageSearchService'
import {
  Plus, KeyRound, Copy, Check, Play, Square, RotateCcw, Users,
  Trash2, Edit3, ArrowLeft, Save, Clock, Sparkles, Download,
  BookOpen, Power, UserX, CheckCircle2, HelpCircle, Search,
  ImagePlus, UploadCloud, X
} from '@lucide/vue'

const emit = defineEmits(['toast'])

const subView = ref('list') // 'list' | 'form' | 'lobby'
const formTab = ref('settings') // 'settings' | 'questions'
const isEditing = ref(false)
const isSaving = ref(false)
const searchQuery = ref('')
const copiedCode = ref('')
const showImportModal = ref(false)

// Lobby state
const lobbyRoom = ref(null)
const lobbyParticipants = ref([])
const selectedSession = ref(1)
let unsubscribeLobby = null

const availableSessions = computed(() => {
  const maxRoomSession = Number(lobbyRoom.value?.sessionNumber || 1)
  const maxPartSession = lobbyParticipants.value.reduce((max, p) => Math.max(max, Number(p.sessionNumber || 1)), 1)
  const total = Math.max(maxRoomSession, maxPartSession)
  return Array.from({ length: total }, (_, i) => i + 1)
})

const displayedParticipants = computed(() => {
  return lobbyParticipants.value.filter(p => Number(p.sessionNumber || 1) === Number(selectedSession.value))
})

const MATA_PELAJARAN_OPTIONS = [
  'IPAS', 'Matematika', 'Bahasa Indonesia', 'PPKn', 'Bahasa Inggris', 'Agama', 'Seni Budaya', 'PJOK'
]

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Pilihan Ganda' },
  { value: 'matching', label: 'Hubungkan Garis (Pasangan)' },
  { value: 'ordering', label: 'Urutkan Kartu' },
  { value: 'true_false', label: 'Benar / Salah' },
  { value: 'fill_in_blank', label: 'Isian Singkat' },
  { value: 'multi_select', label: 'Pilih Banyak Jawaban' }
]

const isUploadingQuestionImage = ref({})
const showImageSearchModal = ref(false)
const imageSearchTargetIdx = ref(null)
const imageSearchKeyword = ref('')
const imageSearchResults = ref([])
const isSearchingImages = ref(false)

function createEmptyQuestion() {
  return {
    type: 'multiple_choice',
    question: '',
    image: '',
    options: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    ],
    correctIndex: 0,
    correctIndices: [0],
    correctAnswer: '',
    pairs: [{ left: '', right: '' }, { left: '', right: '' }],
    correctOrder: ['', '', '']
  }
}

function createEmptyForm() {
  return {
    id: null,
    title: '',
    kelas: adminManagedKelas.value || 'Kelas 4',
    mataPelajaran: 'IPAS',
    description: '',
    roomCode: generateRoomCode(),
    durationMinutes: 15,
    isActive: true,
    settings: {
      shuffleQuestions: false,
      showScoreToStudent: true
    },
    questions: [createEmptyQuestion()]
  }
}

const form = ref(createEmptyForm())

const filteredRooms = computed(() => {
  return (examRooms.value || []).filter(room => {
    if (adminManagedKelas.value && room.kelas !== adminManagedKelas.value) {
      return false
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      return (
        room.title.toLowerCase().includes(q) ||
        room.roomCode.toLowerCase().includes(q) ||
        room.mataPelajaran.toLowerCase().includes(q)
      )
    }
    return true
  })
})

const importableMateri = computed(() => {
  return (materiList.value || []).filter(m => {
    const hasQuiz = Array.isArray(m.quiz) && m.quiz.length > 0
    if (!hasQuiz) return false
    if (adminManagedKelas.value) {
      return getKelasFromLevel(m.level) === adminManagedKelas.value
    }
    return true
  })
})

function copyRoomCode(code) {
  if (!code) return
  navigator.clipboard?.writeText(code)
  copiedCode.value = code
  emit('toast', `Kode room ${code} disalin!`)
  setTimeout(() => {
    if (copiedCode.value === code) copiedCode.value = ''
  }, 2000)
}

function openCreateForm() {
  isEditing.value = false
  form.value = createEmptyForm()
  formTab.value = 'settings'
  subView.value = 'form'
}

function openEditForm(room) {
  isEditing.value = true
  form.value = {
    id: room.id,
    title: room.title,
    kelas: room.kelas,
    mataPelajaran: room.mataPelajaran,
    description: room.description || '',
    roomCode: room.roomCode,
    durationMinutes: room.durationMinutes ?? 15,
    isActive: Boolean(room.isActive),
    settings: {
      shuffleQuestions: Boolean(room.settings?.shuffleQuestions),
      showScoreToStudent: room.settings?.showScoreToStudent !== false
    },
    questions: Array.isArray(room.questions) && room.questions.length
      ? JSON.parse(JSON.stringify(room.questions))
      : [createEmptyQuestion()]
  }
  formTab.value = 'settings'
  subView.value = 'form'
}

function addQuestion() {
  form.value.questions.push(createEmptyQuestion())
}

function removeQuestion(idx) {
  if (form.value.questions.length <= 1) return
  form.value.questions.splice(idx, 1)
}

function onQuestionTypeChange(q) {
  if (q.type === 'true_false') {
    q.options = [{ text: 'Benar' }, { text: 'Salah' }]
    q.correctIndex = 0
  } else if ((q.type === 'multiple_choice' || q.type === 'multi_select') && (!q.options || q.options.length < 2)) {
    q.options = [{ text: '' }, { text: '' }, { text: '' }, { text: '' }]
  } else if (q.type === 'matching' && (!Array.isArray(q.pairs) || q.pairs.length === 0)) {
    q.pairs = [{ left: '', right: '' }, { left: '', right: '' }]
  } else if (q.type === 'ordering' && (!Array.isArray(q.correctOrder) || q.correctOrder.length < 2)) {
    q.correctOrder = ['', '', '']
  }
}

function addMatchingPair(q) {
  if (!Array.isArray(q.pairs)) q.pairs = []
  q.pairs.push({ left: '', right: '' })
}

function removeMatchingPair(q, idx) {
  if (Array.isArray(q.pairs) && q.pairs.length > 1) {
    q.pairs.splice(idx, 1)
  }
}

function addOrderItem(q) {
  if (!Array.isArray(q.correctOrder)) q.correctOrder = []
  q.correctOrder.push('')
}

function removeOrderItem(q, idx) {
  if (Array.isArray(q.correctOrder) && q.correctOrder.length > 2) {
    q.correctOrder.splice(idx, 1)
  }
}

async function handleQuestionImageUpload(file, qIdx) {
  if (!file) return
  isUploadingQuestionImage.value = { ...isUploadingQuestionImage.value, [qIdx]: true }
  try {
    if (isCloudinaryConfigured) {
      const res = await uploadImage(file)
      form.value.questions[qIdx].image = res.secure_url || res.url || ''
    } else {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      form.value.questions[qIdx].image = dataUrl
    }
    emit('toast', 'Gambar soal berhasil ditambahkan!')
  } catch (err) {
    emit('toast', { message: err.message || 'Gagal mengunggah gambar soal.', type: 'error' })
  } finally {
    isUploadingQuestionImage.value = { ...isUploadingQuestionImage.value, [qIdx]: false }
  }
}

function openExamImageSearch(qIdx) {
  imageSearchTargetIdx.value = qIdx
  imageSearchKeyword.value = form.value.questions[qIdx]?.question?.slice(0, 40) || form.value.title || ''
  imageSearchResults.value = []
  showImageSearchModal.value = true
  if (imageSearchKeyword.value.trim()) {
    runExamImageSearch()
  }
}

async function runExamImageSearch() {
  const kw = imageSearchKeyword.value.trim()
  if (!kw) return
  isSearchingImages.value = true
  try {
    imageSearchResults.value = await searchRelevantImages(kw, form.value.mataPelajaran)
  } catch {
    imageSearchResults.value = []
  } finally {
    isSearchingImages.value = false
  }
}

function selectSearchedImage(imgUrl) {
  if (imageSearchTargetIdx.value !== null && form.value.questions[imageSearchTargetIdx.value]) {
    form.value.questions[imageSearchTargetIdx.value].image = imgUrl
  }
  showImageSearchModal.value = false
}

function toggleMultiCorrect(q, oIdx) {
  if (!Array.isArray(q.correctIndices)) q.correctIndices = []
  const pos = q.correctIndices.indexOf(oIdx)
  if (pos >= 0) q.correctIndices.splice(pos, 1)
  else q.correctIndices.push(oIdx)
}

function importQuizFromMateri(materi) {
  const compatibleTypes = ['multiple_choice', 'matching', 'ordering', 'true_false', 'fill_in_blank', 'multi_select', undefined]
  const imported = (materi.quiz || [])
    .filter(q => compatibleTypes.includes(q.type))
    .map(q => ({
      type: q.type || 'multiple_choice',
      question: q.questionText || q.question || '',
      image: q.image || '',
      options: Array.isArray(q.options)
        ? q.options.map(o => (typeof o === 'string' ? { text: o } : { text: o.text || '', image: o.image || '' }))
        : [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      correctIndex: Number(q.correctOptionIndex ?? q.correctIndex ?? 0),
      correctIndices: Array.isArray(q.multiCorrectIndices)
        ? [...q.multiCorrectIndices]
        : (Array.isArray(q.correctIndices) ? [...q.correctIndices] : [0]),
      correctAnswer: q.correctAnswer || '',
      pairs: Array.isArray(q.pairs) ? q.pairs.map(p => ({ left: p.left || '', right: p.right || '' })) : [{ left: '', right: '' }],
      correctOrder: Array.isArray(q.correctOrder) ? [...q.correctOrder] : ['', '', '']
    }))

  if (imported.length === 0) {
    emit('toast', { message: 'Materi ini belum memiliki soal kuis yang kompatibel.', type: 'warning' })
    return
  }

  // Jika hanya ada 1 soal kosong default, ganti langsung
  if (form.value.questions.length === 1 && !form.value.questions[0].question.trim()) {
    form.value.questions = imported
  } else {
    form.value.questions.push(...imported)
  }
  showImportModal.value = false
  emit('toast', `${imported.length} soal berhasil diimpor dari "${materi.title}"!`)
}

async function handleSaveRoom() {
  if (!form.value.title.trim()) {
    emit('toast', { message: 'Judul ujian wajib diisi.', type: 'error' })
    formTab.value = 'settings'
    return
  }
  const validQuestions = form.value.questions.filter(q => q.question && q.question.trim())
  if (validQuestions.length === 0) {
    emit('toast', { message: 'Minimal harus ada 1 soal ujian yang terisi.', type: 'error' })
    formTab.value = 'questions'
    return
  }

  isSaving.value = true
  try {
    const payload = {
      title: form.value.title.trim(),
      kelas: form.value.kelas,
      mataPelajaran: form.value.mataPelajaran,
      description: form.value.description.trim(),
      roomCode: (form.value.roomCode || generateRoomCode()).toUpperCase().trim(),
      durationMinutes: Number(form.value.durationMinutes || 0),
      isActive: Boolean(form.value.isActive),
      settings: form.value.settings,
      questions: validQuestions,
      createdBy: currentUser.value?.name || 'Guru Prisma'
    }

    if (isEditing.value && form.value.id) {
      await updateExamRoom(form.value.id, payload)
      emit('toast', 'Room ujian berhasil diperbarui!')
    } else {
      await createExamRoom(payload)
      emit('toast', `Room ujian berhasil dibuat dengan kode ${payload.roomCode}!`)
    }
    subView.value = 'list'
  } catch (err) {
    emit('toast', { message: err.message || 'Gagal menyimpan room ujian.', type: 'error' })
  } finally {
    isSaving.value = false
  }
}

async function handleToggleActive(room) {
  try {
    const updated = await updateExamRoom(room.id, { isActive: !room.isActive })
    if (lobbyRoom.value?.id === room.id) {
      lobbyRoom.value = updated
    }
    emit('toast', `Room ${updated.roomCode} sekarang ${updated.isActive ? 'AKTIF' : 'NONAKTIF'}.`)
  } catch (err) {
    emit('toast', { message: err.message || 'Gagal mengubah status room.', type: 'error' })
  }
}

async function handleDeleteRoom(room) {
  if (!confirm(`Hapus room ujian "${room.title}" (${room.roomCode})?`)) return
  try {
    await deleteExamRoom(room.id)
    emit('toast', 'Room ujian telah dihapus.')
  } catch (err) {
    emit('toast', { message: err.message || 'Gagal menghapus room.', type: 'error' })
  }
}

async function openLobby(room) {
  lobbyRoom.value = room
  selectedSession.value = Number(room.sessionNumber || 1)
  subView.value = 'lobby'
  lobbyParticipants.value = await fetchRoomParticipants(room.id)
  if (unsubscribeLobby) unsubscribeLobby()
  unsubscribeLobby = subscribeToRoom(room.id, {
    onRoomUpdate: (updated) => {
      if (updated) lobbyRoom.value = updated
    },
    onParticipantsUpdate: (list) => {
      lobbyParticipants.value = list
    }
  })
}

function closeLobby() {
  if (unsubscribeLobby) {
    unsubscribeLobby()
    unsubscribeLobby = null
  }
  lobbyRoom.value = null
  lobbyParticipants.value = []
  subView.value = 'list'
}

async function handleStartSession() {
  if (!lobbyRoom.value) return
  const updated = await updateExamRoom(lobbyRoom.value.id, {
    isActive: true,
    status: 'running',
    startedAt: new Date().toISOString()
  })
  lobbyRoom.value = updated
  emit('toast', 'Sesi ujian dimulai! Layar siswa otomatis berpindah ke soal.')
}

async function handleFinishSession() {
  if (!lobbyRoom.value) return
  const updated = await updateExamRoom(lobbyRoom.value.id, {
    status: 'finished',
    finishedAt: new Date().toISOString()
  })
  lobbyRoom.value = updated
  emit('toast', 'Sesi ujian telah diakhiri.')
}

async function handleResetSession() {
  if (!lobbyRoom.value) return
  const nextSession = Number(lobbyRoom.value.sessionNumber || 1) + 1
  const updated = await updateExamRoom(lobbyRoom.value.id, {
    status: 'waiting',
    sessionNumber: nextSession,
    startedAt: null,
    finishedAt: null
  })
  lobbyRoom.value = updated
  selectedSession.value = nextSession
  emit('toast', `Sesi ke-${nextSession} dibuka! Peserta lama tetap tersimpan di Riwayat Sesi.`)
}

async function handleKickParticipant(p) {
  if (!lobbyRoom.value) return
  await removeParticipant(p.id, lobbyRoom.value.id)
  lobbyParticipants.value = lobbyParticipants.value.filter(item => item.id !== p.id)
  emit('toast', `${p.studentName} dihapus dari room.`)
}

function exportCsv() {
  if (!lobbyRoom.value || !displayedParticipants.value.length) return
  const headers = ['Sesi', 'Nama Siswa', 'No Absen', 'Status', 'Benar', 'Total Soal', 'Nilai']
  const rows = displayedParticipants.value.map(p => [
    `Sesi ${selectedSession.value}`,
    `"${(p.studentName || '').replace(/"/g, '""')}"`,
    `"${p.studentAbsen || '-'}"`,
    p.status,
    p.correctCount,
    p.totalCount || lobbyRoom.value.questions.length,
    p.score
  ])
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rekap-${lobbyRoom.value.roomCode}-sesi-${selectedSession.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  fetchExamRooms()
})

onUnmounted(() => {
  if (unsubscribeLobby) unsubscribeLobby()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-['Lexend'] text-[#2B3445]">

    <!-- ==================== 1. DAFTAR ROOM UJIAN ==================== -->
    <template v-if="subView === 'list'">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border-2 border-[#8F8575]/20 shadow-2xs">
        <div>
          <h2 class="font-['Baloo_2'] text-xl sm:text-2xl font-extrabold text-[#2B3445]">
            Manajemen Room Ujian & Ulangan
          </h2>
          <p class="text-xs text-[#5B6474] mt-0.5">
            Buat kode room, aktif/nonaktifkan akses siswa, dan pantau siswa yang bergabung secara langsung.
          </p>
        </div>

        <button
          @click="openCreateForm"
          class="px-5 py-3 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer transition shrink-0"
        >
          <Plus class="w-4 h-4" />
          <span>Buat Room Ujian</span>
        </button>
      </div>

      <!-- Search -->
      <div class="relative max-w-md">
        <Search class="w-4 h-4 text-[#5B6474] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari judul ujian, kode room, atau mapel..."
          class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-xs sm:text-sm font-medium"
        />
      </div>

      <div v-if="isLoadingExams" class="py-12 text-center text-sm text-[#5B6474]">
        Memuat daftar room ujian...
      </div>

      <div v-else-if="filteredRooms.length === 0" class="bg-white rounded-3xl border-2 border-dashed border-[#8F8575]/30 p-10 text-center space-y-3">
        <KeyRound class="w-10 h-10 text-[#1E7A6F] mx-auto opacity-80" />
        <p class="font-['Baloo_2'] text-lg font-bold text-[#2B3445]">Belum Ada Room Ujian</p>
        <p class="text-xs text-[#5B6474] max-w-md mx-auto">
          Klik tombol <strong>Buat Room Ujian</strong> di atas untuk membuat paket soal dan kode room acak bagi siswa.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="room in filteredRooms"
          :key="room.id"
          class="bg-white rounded-3xl border-2 border-[#8F8575]/20 p-5 flex flex-col justify-between gap-4 shadow-2xs hover:border-[#1E7A6F]/40 transition"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF8F0] border border-[#8F8575]/25 text-[#1E7A6F]">
                  {{ room.kelas }}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7FD4C4]/20 text-[#1E7A6F]">
                  {{ room.mataPelajaran }}
                </span>
              </div>

              <!-- Toggle Aktif/Nonaktif -->
              <button
                @click="handleToggleActive(room)"
                :class="[
                  'px-2.5 py-1 rounded-full text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer border transition',
                  room.isActive
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-slate-100 border-slate-300 text-slate-500'
                ]"
                :title="room.isActive ? 'Klik untuk nonaktifkan room' : 'Klik untuk aktifkan room'"
              >
                <Power class="w-3 h-3" />
                <span>{{ room.isActive ? 'Aktif' : 'Nonaktif' }}</span>
              </button>
            </div>

            <div>
              <h3 class="font-['Baloo_2'] text-lg font-extrabold text-[#2B3445] leading-snug">
                {{ room.title }}
              </h3>
              <p class="text-xs text-[#5B6474] mt-1">
                {{ room.questions.length }} Soal • {{ room.durationMinutes ? `${room.durationMinutes} Menit` : 'Tanpa Batas Waktu' }}
              </p>
            </div>

            <!-- Kode Room Box -->
            <div class="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-[#5B6474]">Kode Room</p>
                <p class="text-base font-extrabold tracking-[0.18em] text-[#1E7A6F]">{{ room.roomCode }}</p>
              </div>
              <button
                @click="copyRoomCode(room.roomCode)"
                class="p-2 rounded-xl bg-white border border-[#8F8575]/25 hover:bg-[#7FD4C4]/20 text-[#1E7A6F] cursor-pointer transition"
                title="Salin Kode Room"
              >
                <Check v-if="copiedCode === room.roomCode" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="pt-3 border-t border-[#8F8575]/15 flex items-center justify-between gap-2">
            <button
              @click="openLobby(room)"
              class="flex-1 py-2.5 px-3 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <Users class="w-3.5 h-3.5" />
              <span>Buka Lobby & Pantau</span>
            </button>

            <button
              @click="openEditForm(room)"
              class="p-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFDE7A]/30 border border-[#8F8575]/25 text-[#2B3445] cursor-pointer transition"
              title="Edit Room & Soal"
            >
              <Edit3 class="w-4 h-4" />
            </button>

            <button
              @click="handleDeleteRoom(room)"
              class="p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 cursor-pointer transition"
              title="Hapus Room"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- ==================== 2. CMS BUAT / EDIT ROOM UJIAN ==================== -->
    <template v-else-if="subView === 'form'">
      <div class="bg-white rounded-3xl border-2 border-[#8F8575]/20 p-5 sm:p-8 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#8F8575]/20">
          <div class="flex items-center gap-3">
            <button
              @click="subView = 'list'"
              class="p-2 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 text-[#2B3445] cursor-pointer"
            >
              <ArrowLeft class="w-4 h-4" />
            </button>
            <div>
              <h2 class="font-['Baloo_2'] text-xl font-extrabold text-[#2B3445]">
                {{ isEditing ? 'Edit Room Ujian' : 'Buat Room Ujian Baru' }}
              </h2>
              <p class="text-xs text-[#5B6474]">Atur identitas room, kode acak, dan bank soal ujian.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="formTab = 'settings'"
              :class="[
                'px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer transition border',
                formTab === 'settings' ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]' : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25'
              ]"
            >
              1. Pengaturan Room
            </button>
            <button
              @click="formTab = 'questions'"
              :class="[
                'px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer transition border',
                formTab === 'questions' ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]' : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25'
              ]"
            >
              2. Bank Soal ({{ form.questions.length }})
            </button>
          </div>
        </div>

        <!-- Tab 1: Pengaturan -->
        <div v-if="formTab === 'settings'" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <label class="block text-xs font-bold mb-1.5">Judul Ujian / Ulangan *</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Contoh: Ulangan Harian 1 - Wujud Benda"
              class="w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
            />
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5">Kelas</label>
            <select
              v-model="form.kelas"
              :disabled="Boolean(adminManagedKelas)"
              class="w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold disabled:opacity-70"
            >
              <option v-for="k in KELAS_SD_OPTIONS" :key="k" :value="k">{{ k }}</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5">Mata Pelajaran</label>
            <select
              v-model="form.mataPelajaran"
              class="w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
            >
              <option v-for="m in MATA_PELAJARAN_OPTIONS" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5">Kode Room (Untuk Siswa)</label>
            <div class="flex gap-2">
              <input
                v-model="form.roomCode"
                @input="form.roomCode = form.roomCode.toUpperCase()"
                type="text"
                maxlength="8"
                class="flex-1 px-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-sm font-extrabold tracking-[0.2em] uppercase text-[#1E7A6F]"
              />
              <button
                type="button"
                @click="form.roomCode = generateRoomCode()"
                class="px-4 py-3 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/25 border-2 border-[#8F8575]/25 text-xs font-bold cursor-pointer transition"
              >
                Acak Ulang
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5">Durasi Ujian (Menit, 0 = Tanpa Batas)</label>
            <input
              v-model.number="form.durationMinutes"
              type="number"
              min="0"
              max="180"
              class="w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:outline-none text-sm font-semibold"
            />
          </div>

          <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <label class="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 cursor-pointer">
              <input v-model="form.isActive" type="checkbox" class="w-4 h-4 accent-[#1E7A6F]" />
              <span class="text-xs font-bold">Room Langsung Aktif</span>
            </label>

            <label class="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 cursor-pointer">
              <input v-model="form.settings.shuffleQuestions" type="checkbox" class="w-4 h-4 accent-[#1E7A6F]" />
              <span class="text-xs font-bold">Acak Urutan Soal</span>
            </label>

            <label class="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 cursor-pointer">
              <input v-model="form.settings.showScoreToStudent" type="checkbox" class="w-4 h-4 accent-[#1E7A6F]" />
              <span class="text-xs font-bold">Tampilkan Nilai ke Siswa</span>
            </label>
          </div>
        </div>

        <!-- Tab 2: Bank Soal -->
        <div v-else class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm text-[#5B6474] font-medium">
              Susun soal ujian secara manual atau impor langsung dari kuis materi yang sudah ada.
            </p>
            <div class="flex items-center gap-2.5">
              <button
                type="button"
                @click="showImportModal = true"
                class="px-4 py-2.5 rounded-2xl bg-[#FFDE7A]/40 hover:bg-[#FFDE7A]/60 border border-[#FFDE7A] text-[#2B3445] text-sm font-bold inline-flex items-center gap-2 cursor-pointer transition"
              >
                <BookOpen class="w-4 h-4" />
                <span>Ambil Soal dari Materi</span>
              </button>
              <button
                type="button"
                @click="addQuestion"
                class="px-4 py-2.5 rounded-2xl bg-[#1E7A6F] text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus class="w-4 h-4" />
                <span>Tambah Soal</span>
              </button>
            </div>
          </div>

          <div
            v-for="(q, qIdx) in form.questions"
            :key="qIdx"
            class="p-6 sm:p-7 rounded-3xl bg-[#FFF8F0] border-2 border-[#8F8575]/20 space-y-5"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <span class="px-4 py-1.5 rounded-full bg-[#1E7A6F] text-white text-sm font-bold">
                Soal {{ qIdx + 1 }}
              </span>

              <div class="flex items-center gap-2.5">
                <select
                  v-model="q.type"
                  @change="onQuestionTypeChange(q)"
                  class="px-4 py-2 rounded-2xl bg-white border border-[#8F8575]/30 text-sm font-bold"
                >
                  <option v-for="t in QUESTION_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
                </select>
                <button
                  v-if="form.questions.length > 1"
                  type="button"
                  @click="removeQuestion(qIdx)"
                  class="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 cursor-pointer"
                  title="Hapus Soal"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              v-model="q.question"
              rows="3"
              placeholder="Tulis pertanyaan di sini..."
              class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-base font-semibold"
            ></textarea>

            <!-- Gambar Soal (Opsional) -->
            <div class="p-4 rounded-2xl bg-white border border-[#8F8575]/25 space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-[#2B3445] flex items-center gap-2">
                  <ImagePlus class="w-4 h-4 text-[#1E7A6F]" />
                  <span>Gambar Soal (Opsional)</span>
                </label>
                <button
                  v-if="q.image"
                  type="button"
                  @click="q.image = ''"
                  class="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Hapus Gambar
                </button>
              </div>

              <div v-if="q.image" class="w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-[#8F8575]/25 bg-[#FFF8F0]">
                <img :src="q.image" alt="Preview Gambar Soal" class="w-full h-full object-contain" />
              </div>

              <div class="flex items-center gap-2.5 flex-wrap">
                <input
                  v-model="q.image"
                  placeholder="Tempel link gambar soal (opsional)..."
                  class="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0] text-sm text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                />
                <button
                  type="button"
                  @click="openExamImageSearch(qIdx)"
                  class="px-4 py-2.5 rounded-xl border border-[#1E7A6F]/30 bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 text-[#1E7A6F] text-sm font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition"
                >
                  <Search class="w-4 h-4" />
                  <span>Cari Gambar</span>
                </button>
                <label class="px-4 py-2.5 rounded-xl border border-[#8F8575]/30 bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#1E7A6F] text-sm font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                  <UploadCloud class="w-4 h-4" />
                  <span>{{ isUploadingQuestionImage[qIdx] ? 'Mengunggah...' : 'Pilih Gambar' }}</span>
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleQuestionImageUpload($event.target.files[0], qIdx)"
                  />
                </label>
              </div>
            </div>

            <!-- 1. Hubungkan Garis (Matching) -->
            <div v-if="q.type === 'matching'" class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-[#2B3445] uppercase tracking-wide">
                  Daftar Pasangan Benar (Kolom A ➔ Kolom B)
                </label>
                <button
                  type="button"
                  @click="addMatchingPair(q)"
                  class="text-sm font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-3.5 py-1.5 rounded-xl cursor-pointer hover:brightness-95"
                >
                  + Tambah Pasangan
                </button>
              </div>
              <div
                v-for="(pair, pIdx) in (q.pairs || [])"
                :key="pIdx"
                class="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-[#8F8575]/25 flex-wrap sm:flex-nowrap"
              >
                <span class="text-sm font-bold text-[#5B6474] px-1.5">{{ pIdx + 1 }}.</span>
                <input
                  v-model="pair.left"
                  placeholder="Item kiri (contoh: Jam)"
                  class="flex-1 min-w-[140px] px-3.5 py-2 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm font-semibold text-[#2B3445]"
                />
                <span class="text-base font-bold text-[#1E7A6F]">➔</span>
                <input
                  v-model="pair.right"
                  placeholder="Pasangan kanan (contoh: Lingkaran)"
                  class="flex-1 min-w-[140px] px-3.5 py-2 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm font-semibold text-[#2B3445]"
                />
                <button
                  v-if="(q.pairs || []).length > 1"
                  type="button"
                  @click="removeMatchingPair(q, pIdx)"
                  class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- 2. Urutkan Kartu (Ordering) -->
            <div v-else-if="q.type === 'ordering'" class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-[#2B3445] uppercase tracking-wide">
                  Urutan Kartu yang Benar (dari 1 ke akhir)
                </label>
                <button
                  type="button"
                  @click="addOrderItem(q)"
                  class="text-sm font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-3.5 py-1.5 rounded-xl cursor-pointer hover:brightness-95"
                >
                  + Tambah Kartu
                </button>
              </div>
              <div
                v-for="(_, oIdx) in (q.correctOrder || [])"
                :key="oIdx"
                class="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-[#8F8575]/25"
              >
                <span class="w-8 h-8 rounded-xl bg-[#1E7A6F] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {{ oIdx + 1 }}
                </span>
                <input
                  v-model="q.correctOrder[oIdx]"
                  :placeholder="`Isi kartu urutan ke-${oIdx + 1}...`"
                  class="flex-1 px-3.5 py-2 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm font-semibold text-[#2B3445]"
                />
                <button
                  v-if="(q.correctOrder || []).length > 2"
                  type="button"
                  @click="removeOrderItem(q, oIdx)"
                  class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- 3. Opsi Pilihan Ganda / Benar-Salah / Pilih Banyak -->
            <div v-else-if="q.type !== 'fill_in_blank'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="(opt, oIdx) in q.options"
                :key="oIdx"
                class="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-[#8F8575]/25"
              >
                <input
                  v-if="q.type === 'multi_select'"
                  type="checkbox"
                  :checked="Array.isArray(q.correctIndices) && q.correctIndices.includes(oIdx)"
                  @change="toggleMultiCorrect(q, oIdx)"
                  class="w-5 h-5 accent-[#1E7A6F] shrink-0"
                  title="Tandai sebagai jawaban benar"
                />
                <input
                  v-else
                  type="radio"
                  :name="`correct-${qIdx}`"
                  :checked="Number(q.correctIndex) === oIdx"
                  @change="q.correctIndex = oIdx"
                  class="w-5 h-5 accent-[#1E7A6F] shrink-0"
                  title="Pilih sebagai kunci jawaban"
                />
                <span class="text-sm font-extrabold text-[#1E7A6F] w-6">{{ String.fromCharCode(65 + oIdx) }}.</span>
                <input
                  v-model="opt.text"
                  type="text"
                  :readonly="q.type === 'true_false'"
                  placeholder="Isi pilihan jawaban..."
                  class="flex-1 text-sm font-semibold py-1 focus:outline-none"
                />
              </div>
            </div>

            <!-- Kunci Isian Singkat -->
            <div v-else>
              <label class="block text-sm font-bold text-[#5B6474] mb-1.5">Kunci Jawaban Singkat:</label>
              <input
                v-model="q.correctAnswer"
                type="text"
                placeholder="Contoh: Mencair"
                class="w-full px-4 py-3 rounded-2xl bg-white border border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-base font-bold"
              />
            </div>
          </div>
        </div>

        <!-- Footer Sticky: Tambah Soal (di tab soal) & Simpan -->
        <div class="sticky bottom-0 z-20 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 px-5 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-t-2 border-[#8F8575]/20 rounded-b-3xl shadow-[0_-6px_20px_rgba(43,52,69,0.06)] flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button
              v-if="formTab === 'questions'"
              type="button"
              @click="addQuestion"
              class="px-4 py-2.5 rounded-2xl bg-[#7FD4C4]/30 hover:bg-[#7FD4C4]/50 border-2 border-[#1E7A6F]/30 text-[#1E7A6F] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer transition active:scale-95"
            >
              <Plus class="w-4 h-4" />
              <span>Tambah Soal</span>
            </button>
            <span v-if="formTab === 'questions'" class="text-xs font-bold text-[#5B6474] hidden sm:inline">
              Total {{ form.questions.length }} Soal
            </span>
          </div>

          <div class="flex items-center gap-3 ml-auto">
            <button
              type="button"
              @click="subView = 'list'"
              class="px-5 py-2.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/30 text-xs font-bold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              @click="handleSaveRoom"
              :disabled="isSaving"
              class="px-6 py-2.5 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 shadow-sm"
            >
              <Save class="w-4 h-4" />
              <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Room Ujian' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Pencarian Gambar Soal -->
      <div v-if="showImageSearchModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 p-6 max-w-2xl w-full max-h-[85vh] flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h3 class="font-['Baloo_2'] text-lg font-extrabold text-[#2B3445]">Cari Gambar Soal</h3>
            <button @click="showImageSearchModal = false" class="p-1.5 rounded-xl hover:bg-[#FFF8F0] text-[#5B6474] cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </div>
          <form @submit.prevent="runExamImageSearch" class="flex gap-2">
            <input
              v-model="imageSearchKeyword"
              type="text"
              placeholder="Ketik kata kunci gambar (contoh: siklus air, kupu-kupu)..."
              class="flex-1 px-4 py-2.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none text-xs sm:text-sm font-semibold"
            />
            <button
              type="submit"
              :disabled="isSearchingImages"
              class="px-5 py-2.5 rounded-2xl bg-[#1E7A6F] text-white text-xs font-bold cursor-pointer disabled:opacity-60"
            >
              {{ isSearchingImages ? 'Mencari...' : 'Cari' }}
            </button>
          </form>
          <div v-if="isSearchingImages" class="py-10 text-center text-xs text-[#5B6474]">
            Sedang mencari gambar yang relevan...
          </div>
          <div v-else-if="imageSearchResults.length === 0" class="py-10 text-center text-xs text-[#5B6474]">
            Belum ada hasil gambar. Coba kata kunci lain yang lebih spesifik.
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
            <button
              v-for="(img, iIdx) in imageSearchResults"
              :key="iIdx"
              type="button"
              @click="selectSearchedImage(img.url)"
              class="group rounded-2xl border-2 border-[#8F8575]/20 hover:border-[#1E7A6F] overflow-hidden bg-[#FFF8F0] text-left cursor-pointer transition"
            >
              <div class="aspect-video overflow-hidden bg-white">
                <img :src="img.url" :alt="img.title" class="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div class="p-2 flex items-center justify-between gap-1">
                <span class="text-[11px] font-bold text-[#2B3445] truncate">{{ img.title }}</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#7FD4C4]/30 text-[#1E7A6F] shrink-0">{{ img.source }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Impor Soal dari Materi -->
      <div v-if="showImportModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 p-6 max-w-lg w-full max-h-[80vh] flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h3 class="font-['Baloo_2'] text-lg font-extrabold text-[#2B3445]">Ambil Soal dari Materi</h3>
            <button @click="showImportModal = false" class="text-xs font-bold text-[#5B6474] cursor-pointer">Tutup</button>
          </div>
          <div class="overflow-y-auto space-y-2 pr-1">
            <button
              v-for="m in importableMateri"
              :key="m.id"
              @click="importQuizFromMateri(m)"
              class="w-full text-left p-3.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/25 border border-[#8F8575]/25 transition cursor-pointer flex items-center justify-between gap-3"
            >
              <div>
                <p class="text-xs font-bold text-[#1E7A6F]">{{ getKelasFromLevel(m.level) }} • {{ m.mataPelajaran }}</p>
                <p class="text-sm font-bold text-[#2B3445]">{{ m.title }}</p>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-white text-[11px] font-bold text-[#1E7A6F] shrink-0">
                +{{ m.quiz.length }} Soal
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- ==================== 3. LOBBY GURU & LIVE MONITORING ==================== -->
    <template v-else-if="subView === 'lobby' && lobbyRoom">
      <div class="space-y-5">
        <div class="bg-white rounded-3xl border-2 border-[#8F8575]/20 p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div class="space-y-2">
            <button
              @click="closeLobby"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7A6F] hover:underline cursor-pointer"
            >
              <ArrowLeft class="w-4 h-4" />
              <span>Kembali ke Daftar Room</span>
            </button>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#2B3445]">
              {{ lobbyRoom.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#5B6474] font-medium">
              {{ lobbyRoom.mataPelajaran }} • {{ lobbyRoom.kelas }} • {{ lobbyRoom.questions.length }} Soal
            </p>
          </div>

          <!-- Kode Room Projector-Friendly -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="px-5 py-3 rounded-2xl bg-[#FFF8F0] border-2 border-[#1E7A6F] flex items-center gap-4">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-[#5B6474]">Kode Masuk Siswa</p>
                <p class="font-['Baloo_2'] text-3xl font-extrabold tracking-[0.2em] text-[#1E7A6F]">
                  {{ lobbyRoom.roomCode }}
                </p>
              </div>
              <button
                @click="copyRoomCode(lobbyRoom.roomCode)"
                class="p-2.5 rounded-xl bg-white border border-[#8F8575]/25 text-[#1E7A6F] cursor-pointer"
                title="Salin Kode"
              >
                <Check v-if="copiedCode === lobbyRoom.roomCode" class="w-5 h-5" />
                <Copy v-else class="w-5 h-5" />
              </button>
            </div>

            <button
              @click="handleToggleActive(lobbyRoom)"
              :class="[
                'px-4 py-3 rounded-2xl text-xs font-extrabold border-2 inline-flex items-center gap-1.5 cursor-pointer transition',
                lobbyRoom.isActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-slate-100 border-slate-300 text-slate-600'
              ]"
            >
              <Power class="w-4 h-4" />
              <span>{{ lobbyRoom.isActive ? 'Room Aktif' : 'Room Nonaktif' }}</span>
            </button>
          </div>
        </div>

        <!-- Kontrol Sesi -->
        <div class="bg-white rounded-3xl border-2 border-[#8F8575]/20 p-5 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span
              :class="[
                'px-3.5 py-1.5 rounded-full text-xs font-extrabold',
                lobbyRoom.status === 'waiting'
                  ? 'bg-[#FFDE7A]/50 text-[#2B3445]'
                  : lobbyRoom.status === 'running'
                    ? 'bg-emerald-100 text-emerald-700 animate-pulse'
                    : 'bg-slate-200 text-slate-700'
              ]"
            >
              {{ lobbyRoom.status === 'waiting' ? 'Menunggu Siswa' : lobbyRoom.status === 'running' ? 'Ujian Sedang Berlangsung' : 'Ujian Selesai' }}
            </span>
            <span class="px-3 py-1 rounded-full bg-[#7FD4C4]/25 text-[#1E7A6F] text-xs font-extrabold">
              Sesi ke-{{ lobbyRoom.sessionNumber || 1 }}
            </span>
            <span class="text-xs font-bold text-[#5B6474]">
              {{ displayedParticipants.length }} siswa pada sesi {{ selectedSession }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <button
              v-if="lobbyRoom.status === 'waiting'"
              @click="handleStartSession"
              class="px-5 py-2.5 rounded-2xl bg-[#1E7A6F] hover:bg-[#17635A] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-sm cursor-pointer transition"
            >
              <Play class="w-4 h-4" />
              <span>Mulai Ujian Sekarang</span>
            </button>

            <button
              v-if="lobbyRoom.status === 'running'"
              @click="handleFinishSession"
              class="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer transition"
            >
              <Square class="w-4 h-4" />
              <span>Akhiri Sesi Ujian</span>
            </button>

            <button
              v-if="lobbyRoom.status === 'finished'"
              @click="handleResetSession"
              class="px-4 py-2.5 rounded-2xl bg-[#FFDE7A]/50 hover:bg-[#FFDE7A]/80 border border-[#FFDE7A] text-[#2B3445] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Buka Sesi Baru (Kelas Lain)</span>
            </button>

            <button
              v-if="displayedParticipants.length > 0"
              @click="exportCsv"
              class="px-4 py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/25 border border-[#8F8575]/30 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download class="w-4 h-4 text-[#1E7A6F]" />
              <span>Unduh Rekap CSV</span>
            </button>
          </div>
        </div>

        <!-- Daftar Siswa yang Sudah Join -->
        <div class="bg-white rounded-3xl border-2 border-[#8F8575]/20 p-5 sm:p-6 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="font-['Baloo_2'] text-lg font-extrabold text-[#2B3445] flex items-center gap-2">
              <Users class="w-5 h-5 text-[#1E7A6F]" />
              <span>Daftar Siswa Sesi {{ selectedSession }} ({{ displayedParticipants.length }})</span>
            </h3>

            <!-- Riwayat Sesi Switcher -->
            <div v-if="availableSessions.length > 1" class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs font-bold text-[#5B6474] mr-1">Riwayat:</span>
              <button
                v-for="sNum in availableSessions"
                :key="sNum"
                @click="selectedSession = sNum"
                :class="[
                  'px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition border',
                  selectedSession === sNum
                    ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                    : 'bg-[#FFF8F0] text-[#5B6474] border-[#8F8575]/25 hover:border-[#1E7A6F]'
                ]"
              >
                Sesi {{ sNum }}{{ sNum === (lobbyRoom.sessionNumber || 1) ? ' (Aktif)' : '' }}
              </button>
            </div>
            <span v-else class="text-[11px] font-semibold text-[#5B6474]">Diperbarui otomatis secara langsung</span>
          </div>

          <div v-if="displayedParticipants.length === 0" class="py-10 text-center text-xs sm:text-sm text-[#5B6474] bg-[#FFF8F0] rounded-2xl border border-dashed border-[#8F8575]/30">
            Belum ada siswa pada Sesi {{ selectedSession }}. Minta siswa membuka tab <strong>Ujian</strong> dan memasukkan kode <strong>{{ lobbyRoom.roomCode }}</strong>.
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="p in displayedParticipants"
              :key="p.id"
              class="p-4 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-sm font-bold text-[#2B3445] truncate">
                  {{ p.studentName }}
                  <span v-if="p.studentAbsen" class="text-xs font-semibold text-[#5B6474]">(#{{ p.studentAbsen }})</span>
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-bold',
                      p.status === 'submitted'
                        ? 'bg-emerald-100 text-emerald-700'
                        : p.status === 'working'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-[#7FD4C4]/30 text-[#1E7A6F]'
                    ]"
                  >
                    {{ p.status === 'submitted' ? 'Selesai' : p.status === 'working' ? 'Mengerjakan' : 'Siap di Lobby' }}
                  </span>
                  <span v-if="p.status === 'submitted'" class="text-xs font-extrabold text-[#1E7A6F]">
                    Nilai: {{ p.score }} ({{ p.correctCount }}/{{ p.totalCount || lobbyRoom.questions.length }})
                  </span>
                </div>
              </div>

              <button
                v-if="lobbyRoom.status === 'waiting'"
                @click="handleKickParticipant(p)"
                class="p-2 rounded-xl bg-white hover:bg-rose-50 border border-[#8F8575]/20 text-rose-500 cursor-pointer shrink-0"
                title="Keluarkan dari lobby"
              >
                <UserX class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
