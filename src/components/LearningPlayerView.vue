<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  Video,
  Trophy,
  ChevronRight,
  Star,
  Check,
  HelpCircle,
  Layers,
  Film,
  MousePointerClick,
  Link,
  ArrowUpDown,
  Undo2,
  Info,
  Hash,
  CheckSquare,
  Compass,
  MapPin,
  BookOpen,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp
} from '@lucide/vue'
import { isYouTubeUrl, getYouTubeEmbedUrl, getKelasFromLevel } from '../lib/materiService'
import { playMascotChime, playButtonPop } from '../lib/soundEffects'
import { saveQuizAttempt, submitToMateriLeaderboard } from '../lib/quizService'
import { currentUser } from '../lib/authService'

const props = defineProps({
  materi: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'finish', 'open-settings'])

// 2 Tahap Pembelajaran: 'video' | 'quiz'
const activeTab = ref('video')

// Data Poin Pembelajaran untuk ringkasan di sidebar
const learningPoints = computed(() => {
  return props.materi?.materiContent?.points || props.materi?.learningPoints || []
})

// ==================== TAHAP 1: VIDEO (2 VIDEO EDUKASI) ====================
const selectedVideoIndex = ref(1) // 1 atau 2

const videoList = computed(() => {
  const v1 = props.materi?.videos?.video1 || {
    title: props.materi?.standardContent?.title || 'Video 1: Pengenalan Konsep',
    url: props.materi?.standardContent?.videoUrl || props.materi?.videoUrl || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
  }
  const v2 = props.materi?.videos?.video2 || {
    title: props.materi?.slowContent?.title || 'Video 2: Eksperimen & Penerapan',
    url: props.materi?.slowContent?.videoUrl || 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
  }
  return { video1: v1, video2: v2 }
})

const currentVideo = computed(() => {
  return selectedVideoIndex.value === 1 ? videoList.value.video1 : videoList.value.video2
})

const isCurrentVideoYouTube = computed(() => {
  return isYouTubeUrl(currentVideo.value?.url)
})

const currentEmbedUrl = computed(() => {
  return getYouTubeEmbedUrl(currentVideo.value?.url)
})

const switchVideo = (index) => {
  playButtonPop()
  selectedVideoIndex.value = index
}

// Video Player Speed (untuk video MP4)
const videoPlayerRef = ref(null)
const currentPlaybackSpeed = ref(1.0)
const setPlaybackSpeed = (speed) => {
  currentPlaybackSpeed.value = speed
  if (videoPlayerRef.value) {
    videoPlayerRef.value.playbackRate = speed
  }
}

// ==================== BACAAN MELEKAT DI ATAS KUIS ====================
const readingText = computed(() => {
  return props.materi?.bacaan || props.materi?.materiContent?.text || ''
})

const readingGoal = computed(() => {
  return props.materi?.tujuan || ''
})

const isBacaanExpanded = ref(true)
const isPlayingAudio = ref(false)
let currentAudioElement = null

const toggleAudioNarration = () => {
  playButtonPop()
  if (isPlayingAudio.value) {
    stopAudioNarration()
    return
  }

  const customAudioUrl = props.materi?.materiContent?.audioUrl || props.materi?.audioUrl
  if (customAudioUrl) {
    if (!currentAudioElement) {
      currentAudioElement = new Audio(customAudioUrl)
      currentAudioElement.onended = () => { isPlayingAudio.value = false }
      currentAudioElement.onerror = () => { isPlayingAudio.value = false }
    }
    currentAudioElement.currentTime = 0
    currentAudioElement.play().catch(() => { isPlayingAudio.value = false })
    isPlayingAudio.value = true
    return
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window && readingText.value) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(readingText.value)
    utterance.lang = 'id-ID'
    utterance.rate = 0.9
    utterance.onend = () => { isPlayingAudio.value = false }
    utterance.onerror = () => { isPlayingAudio.value = false }
    window.speechSynthesis.speak(utterance)
    isPlayingAudio.value = true
  }
}

const stopAudioNarration = () => {
  if (currentAudioElement) {
    currentAudioElement.pause()
    currentAudioElement.currentTime = 0
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isPlayingAudio.value = false
}

watch(activeTab, () => {
  stopAudioNarration()
})

onBeforeUnmount(() => {
  stopAudioNarration()
})

// ==================== TAB 2: QUIZ (PILIHAN GANDA & GAMBAR SOAL) ====================
const quizData = computed(() => {
  if (props.materi?.quiz?.questions?.length) {
    return props.materi.quiz
  }
  if (props.materi?.assessment?.questions?.length) {
    return props.materi.assessment
  }
  return {
    title: 'Kuis Pemahaman Materi',
    questions: [
      {
        id: 'def-1',
        questionText: `Apa pemahaman utama yang kamu pelajari dari materi "${props.materi?.title || 'ini'}"?`,
        image: props.materi?.image || '/es_batu_card.jpg',
        points: 50,
        options: ['Memahami konsep dengan jelas', 'Membaca secara santai', 'Menonton video edukasi', 'Semua benar'],
        correctOptionIndex: 3,
        explanation: 'Semua kegiatan belajar membantu menguatkan pemahamanmu terhadap materi.'
      },
      {
        id: 'def-2',
        questionText: 'Mengapa kita perlu mempelajari materi ini dalam kehidupan sehari-hari?',
        image: '',
        points: 50,
        options: ['Agar memahami fenomena di sekitar', 'Hanya untuk ujian', 'Tidak ada manfaatnya', 'Agar cepat mengantuk'],
        correctOptionIndex: 0,
        explanation: 'Ilmu pengetahuan sangat berguna untuk memecahkan masalah dalam kehidupan nyata.'
      }
    ]
  }
})

const questions = computed(() => quizData.value.questions || [])
const currentQuestionIndex = ref(0)
const selectedAnswers = ref({})
const isQuizSubmitted = ref(false)

// State khusus untuk Tipe Soal Menjodohkan / Matching
const activeMatchingLeft = ref(null)

const getMatchingAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  if (cur && typeof cur === 'object' && !Array.isArray(cur)) {
    return cur
  }
  return {}
}

const selectMatchingLeft = (leftItem) => {
  playButtonPop()
  if (activeMatchingLeft.value === leftItem) {
    activeMatchingLeft.value = null
  } else {
    activeMatchingLeft.value = leftItem
  }
}

const selectMatchingRight = (rightItem) => {
  if (!activeMatchingLeft.value) return
  playButtonPop()
  const currentMap = { ...getMatchingAnswersForCurrent() }
  // Hapus jika rightItem sudah terhubung dengan item kiri lain
  for (const [k, v] of Object.entries(currentMap)) {
    if (v === rightItem) delete currentMap[k]
  }
  currentMap[activeMatchingLeft.value] = rightItem
  selectedAnswers.value[currentQuestionIndex.value] = currentMap
  activeMatchingLeft.value = null
}

const removeMatchingPair = (leftItem) => {
  playButtonPop()
  const currentMap = { ...getMatchingAnswersForCurrent() }
  delete currentMap[leftItem]
  selectedAnswers.value[currentQuestionIndex.value] = currentMap
}

const resetMatching = () => {
  playButtonPop()
  selectedAnswers.value[currentQuestionIndex.value] = {}
  activeMatchingLeft.value = null
}

const matchingPairColors = [
  { border: 'border-[#1E7A6F]', bg: 'bg-[#7FD4C4]/20', text: 'text-[#1E7A6F]', badgeBg: 'bg-[#1E7A6F]', label: 'Pasangan 1' },
  { border: 'border-[#D97706]', bg: 'bg-[#FFDE7A]/35', text: 'text-[#B45309]', badgeBg: 'bg-[#D97706]', label: 'Pasangan 2' },
  { border: 'border-[#2563EB]', bg: 'bg-[#94C6FF]/25', text: 'text-[#1D4ED8]', badgeBg: 'bg-[#2563EB]', label: 'Pasangan 3' },
  { border: 'border-[#9333EA]', bg: 'bg-[#E9D5FF]/35', text: 'text-[#7E22CE]', badgeBg: 'bg-[#9333EA]', label: 'Pasangan 4' }
]

const getPairColor = (leftItem) => {
  const pairs = getMatchingAnswersForCurrent()
  const keys = Object.keys(pairs)
  const idx = keys.indexOf(leftItem)
  if (idx < 0) return matchingPairColors[0]
  return matchingPairColors[idx % matchingPairColors.length]
}

const getPairColorForRight = (rightItem) => {
  const pairs = getMatchingAnswersForCurrent()
  for (const [left, right] of Object.entries(pairs)) {
    if (right === rightItem) {
      return getPairColor(left)
    }
  }
  return null
}

// State khusus untuk Tipe Soal Mengurutkan / Ordering
const getOrderingAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  if (Array.isArray(cur)) return cur
  return []
}

const addToOrdering = (item) => {
  playButtonPop()
  const cur = [...getOrderingAnswersForCurrent()]
  if (!cur.includes(item)) {
    cur.push(item)
    selectedAnswers.value[currentQuestionIndex.value] = cur
  }
}

const removeFromOrdering = (item) => {
  playButtonPop()
  const cur = getOrderingAnswersForCurrent().filter(i => i !== item)
  selectedAnswers.value[currentQuestionIndex.value] = cur
}

const resetOrdering = () => {
  playButtonPop()
  selectedAnswers.value[currentQuestionIndex.value] = []
}

// State khusus untuk Isi Angka (Fill in the Blank)
const onFillInBlankInput = (val) => {
  selectedAnswers.value[currentQuestionIndex.value] = val
}

const appendDigit = (digit) => {
  playButtonPop()
  const cur = String(selectedAnswers.value[currentQuestionIndex.value] || '')
  selectedAnswers.value[currentQuestionIndex.value] = cur + digit
}

const backspaceDigit = () => {
  playButtonPop()
  const cur = String(selectedAnswers.value[currentQuestionIndex.value] || '')
  selectedAnswers.value[currentQuestionIndex.value] = cur.slice(0, -1)
}

const clearDigit = () => {
  playButtonPop()
  selectedAnswers.value[currentQuestionIndex.value] = ''
}

// State khusus untuk Pilih Semua yang Benar (Multi Select)
const getMultiSelectAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  if (Array.isArray(cur)) return cur
  return []
}

const toggleMultiSelect = (optIdx) => {
  playButtonPop()
  const cur = [...getMultiSelectAnswersForCurrent()]
  const pos = cur.indexOf(optIdx)
  if (pos >= 0) {
    cur.splice(pos, 1)
  } else {
    cur.push(optIdx)
  }
  selectedAnswers.value[currentQuestionIndex.value] = cur
}

// State khusus untuk Peta Koordinat (Grid Map)
const selectGridCell = (cell) => {
  playButtonPop()
  selectedAnswers.value[currentQuestionIndex.value] = cell
}

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || {}
})

const totalPossibleScore = computed(() => {
  return questions.value.reduce((acc, q) => acc + (Number(q.points) || 25), 0)
})

const selectAnswer = (optionIdx) => {
  playButtonPop()
  selectedAnswers.value[currentQuestionIndex.value] = optionIdx
}

const isQuestionAnswered = (idx) => {
  const q = questions.value[idx]
  if (!q) return false
  const ans = selectedAnswers.value[idx]
  if (ans === undefined || ans === null) return false
  if (q.type === 'matching') {
    return typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length === (q.pairs?.length || 0)
  }
  if (q.type === 'ordering') {
    return Array.isArray(ans) && ans.length === (q.orderItems?.length || 0)
  }
  if (q.type === 'multi_select') {
    return Array.isArray(ans) && ans.length > 0
  }
  if (q.type === 'fill_in_blank') {
    return typeof ans === 'string' && ans.trim().length > 0
  }
  if (q.type === 'grid_map') {
    return typeof ans === 'string' && ans.trim().length > 0
  }
  return true
}

const checkAnswerCorrectness = (q, ans) => {
  if (ans === undefined || ans === null) return false
  if (q.type === 'matching' && q.pairs?.length) {
    if (typeof ans !== 'object' || Array.isArray(ans)) return false
    return q.pairs.every(p => ans[p.left] === p.right)
  }
  if (q.type === 'ordering' && q.correctOrder?.length) {
    if (Array.isArray(ans)) {
      return JSON.stringify(ans) === JSON.stringify(q.correctOrder)
    }
    return false
  }
  if (q.type === 'multi_select' && q.multiCorrectIndices?.length) {
    if (!Array.isArray(ans)) return false
    const sortedUser = [...ans].sort((a, b) => a - b)
    const sortedCorrect = [...q.multiCorrectIndices].sort((a, b) => a - b)
    return sortedUser.length === sortedCorrect.length && sortedUser.every((v, i) => v === sortedCorrect[i])
  }
  if (q.type === 'fill_in_blank') {
    if (typeof ans !== 'string') return false
    const cleanUser = ans.trim().toLowerCase().replace(/[\s\.\,]/g, '')
    if (!cleanUser) return false
    const expected = (q.expectedAnswers && q.expectedAnswers.length) ? q.expectedAnswers : [q.options?.[q.correctOptionIndex] || '']
    return expected.some(exp => {
      const cleanExp = String(exp).trim().toLowerCase().replace(/[\s\.\,]/g, '')
      return cleanUser === cleanExp || cleanUser.includes(cleanExp) || cleanExp.includes(cleanUser)
    })
  }
  if (q.type === 'grid_map') {
    const target = String(q.correctCell || 'E5').trim().toUpperCase()
    return String(ans).trim().toUpperCase() === target
  }
  return ans === q.correctOptionIndex
}

const nextQuestion = () => {
  playButtonPop()
  activeMatchingLeft.value = null
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  playButtonPop()
  activeMatchingLeft.value = null
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// Perhitungan Hasil Kuis Komprehensif
const quizScore = computed(() => {
  let score = 0
  questions.value.forEach((q, idx) => {
    if (checkAnswerCorrectness(q, selectedAnswers.value[idx])) {
      score += Number(q.points) || 25
    }
  })
  return score
})

const correctCount = computed(() => {
  let count = 0
  questions.value.forEach((q, idx) => {
    if (checkAnswerCorrectness(q, selectedAnswers.value[idx])) {
      count++
    }
  })
  return count
})

const isPerfectScore = computed(() => {
  return quizScore.value === totalPossibleScore.value && totalPossibleScore.value > 0
})

const submitQuiz = () => {
  playMascotChime()
  isQuizSubmitted.value = true

  // Simpan riwayat kuis
  try {
    saveQuizAttempt(props.materi?.id || 'materi', quizScore.value, totalPossibleScore.value, questions.value.length)
    if (currentUser.value?.displayName || currentUser.value?.email) {
      submitToMateriLeaderboard(props.materi?.id || 'materi', {
        userId: currentUser.value.id || 'user',
        userName: currentUser.value.displayName || 'Sahabat Prisma',
        userAvatar: currentUser.value.avatar || '🌟',
        score: quizScore.value
      })
    }
  } catch (err) {
    console.warn('Gagal menyimpan hasil kuis:', err)
  }
}

const resetQuiz = () => {
  playButtonPop()
  selectedAnswers.value = {}
  currentQuestionIndex.value = 0
  activeMatchingLeft.value = null
  isQuizSubmitted.value = false
}

// Reset tab & state saat materi berganti
watch(() => props.materi?.id, () => {
  activeTab.value = 'video'
  selectedVideoIndex.value = 1
  resetQuiz()
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="w-full flex flex-col space-y-6 animate-soft-pop pb-12 font-['Lexend'] text-[#2B3445]">
    <!-- ==================== TOP BAR HEADER ==================== -->
    <header class="bg-white rounded-3xl border border-[#8F8575]/25 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button
          @click="emit('back')"
          class="p-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 border border-[#8F8575]/30 text-[#2B3445] transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]"
          title="Kembali ke Daftar Materi"
        >
          <ArrowLeft class="w-4 h-4 text-[#1E7A6F]" />
          <span class="hidden sm:inline">Kembali</span>
        </button>

        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Badge Kelas: Latar Putih dengan border Garis -->
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#2B3445] border border-[#8F8575]">
              {{ getKelasFromLevel(materi.level) }}
            </span>
            <!-- Kategori Literasi (Peach) / Numerasi (Langit) -->
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#2B3445]',
                materi.mataPelajaran === 'Bahasa Indonesia' ? 'bg-[#FFB899]' : 'bg-[#94C6FF]'
              ]"
            >
              {{ materi.mataPelajaran || 'IPAS' }}
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold font-['Baloo_2'] text-[#2B3445] leading-tight mt-0.5">
            {{ materi.title }}
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-center">
        <button
          @click="emit('finish')"
          class="btn-prisma-mint px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]"
        >
          <CheckCircle2 class="w-4 h-4 text-[#1E7A6F]" />
          <span>Selesai Belajar</span>
        </button>
      </div>
    </header>

    <!-- ==================== BODY GRID (SIDEBAR NAV + MAIN CONTENT) ==================== -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- ==================== SIDEBAR NAVIGASI KIRI ==================== -->
      <aside class="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-6">
        
        <!-- CARD MENU BELAJAR (2 LANGKAH: VIDEO & QUIZ) -->
        <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-3.5 sm:p-4 shadow-xs space-y-3">
          <div class="px-3 pt-1 pb-1 flex items-center justify-between">
            <span class="text-xs font-semibold text-[#5B6474] uppercase tracking-wider flex items-center gap-1.5">
              <Layers class="w-3.5 h-3.5 text-[#1E7A6F]" />
              <span>Menu Belajar</span>
            </span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#7FD4C4]/25 text-[#1E7A6F]">
              2 Langkah
            </span>
          </div>

          <nav class="space-y-2">
            <!-- LANGKAH 1: VIDEO -->
            <button
              @click="activeTab = 'video'; playButtonPop()"
              :class="[
                'w-full text-left p-3.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]',
                activeTab === 'video'
                  ? 'bg-[#1E7A6F] text-white shadow-md ring-2 ring-[#1E7A6F]'
                  : 'bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#2B3445] border border-[#8F8575]/25'
              ]"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition',
                    activeTab === 'video' ? 'bg-white/20 text-white' : 'bg-[#94C6FF]/30 text-[#1E7A6F]'
                  ]"
                >
                  <Video class="w-5 h-5" />
                </div>
                <div class="min-w-0">
                  <h4 class="text-sm font-bold font-['Baloo_2'] truncate leading-tight">1. Video</h4>
                  <p :class="['text-xs truncate font-normal', activeTab === 'video' ? 'text-white/85' : 'text-[#5B6474]']">
                    Konsep & Praktik
                  </p>
                </div>
              </div>
              <span
                :class="[
                  'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0',
                  activeTab === 'video' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#2B3445]'
                ]"
              >
                {{ activeTab === 'video' ? 'Dibuka' : '2 Video' }}
              </span>
            </button>

            <!-- LANGKAH 2: QUIZ -->
            <button
              @click="activeTab = 'quiz'; playButtonPop()"
              :class="[
                'w-full text-left p-3.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]',
                activeTab === 'quiz'
                  ? 'bg-[#1E7A6F] text-white shadow-md ring-2 ring-[#1E7A6F]'
                  : 'bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#2B3445] border border-[#8F8575]/25'
              ]"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition',
                    activeTab === 'quiz' ? 'bg-white/20 text-[#FFDE7A]' : 'bg-[#FFDE7A]/40 text-[#2B3445]'
                  ]"
                >
                  <BookOpen class="w-5 h-5 text-[#2B3445]" />
                </div>
                <div class="min-w-0">
                  <h4 class="text-sm font-bold font-['Baloo_2'] truncate leading-tight">2. Quiz</h4>
                  <p :class="['text-xs truncate font-normal', activeTab === 'quiz' ? 'text-white/85' : 'text-[#5B6474]']">
                    Bacaan & Kuis
                  </p>
                </div>
              </div>
              <span
                :class="[
                  'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0',
                  activeTab === 'quiz' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#2B3445]'
                ]"
              >
                {{ activeTab === 'quiz' ? 'Dibuka' : `${questions.length} Soal` }}
              </span>
            </button>
          </nav>
        </div>

        <!-- CARD INFO MATERI DI SIDEBAR -->
        <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-5 shadow-xs space-y-3.5 text-left hidden sm:block">
          <div class="flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
            <h4 class="text-xs font-bold font-['Baloo_2'] text-[#2B3445] uppercase tracking-wider">
              Tentang Materi Ini
            </h4>
          </div>

          <p class="text-xs text-[#5B6474] leading-relaxed">
            {{ materi.description }}
          </p>

          <div v-if="learningPoints.length" class="space-y-2 pt-2 border-t border-[#8F8575]/15">
            <span class="text-[11px] font-bold text-[#2B3445] block">Poin Pembelajaran:</span>
            <div
              v-for="(point, idx) in learningPoints.slice(0, 3)"
              :key="idx"
              class="flex items-center gap-2 p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 text-xs font-medium text-[#2B3445]"
            >
              <span class="w-4 h-4 rounded-full bg-[#7FD4C4] text-[#2B3445] text-[10px] font-bold flex items-center justify-center shrink-0">
                {{ idx + 1 }}
              </span>
              <span class="truncate">{{ typeof point === 'string' ? point : (point.title || point.desc) }}</span>
            </div>
          </div>
        </div>

      </aside>

      <!-- ==================== MAIN CONTENT AREA KANAN ==================== -->
      <main class="lg:col-span-8 xl:col-span-9 min-w-0 space-y-6">

    <!-- ==================== LANGKAH 1: VIDEO (2 VIDEO EDUKASI) ==================== -->
    <div v-if="activeTab === 'video'" class="space-y-6 animate-soft-pop">
      <div class="card-prisma p-5 sm:p-7 lg:p-8 space-y-6">
        
        <!-- Header Tahap Video -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#8F8575]/20 pb-5 text-left">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#94C6FF]/25 text-[#1E7A6F] border border-[#94C6FF]/50">
              <Video class="w-3.5 h-3.5 text-[#1E7A6F]" /> Langkah 1: Video Pembelajaran
            </span>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445] mt-1.5 leading-snug">
              {{ materi.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#5B6474] font-normal mt-0.5">
              {{ materi.description }}
            </p>
          </div>

          <div class="text-right shrink-0">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/25 text-[#2B3445] block">
              2 Pilihan Video
            </span>
          </div>
        </div>

        <!-- Video 1 & Video 2 Selector Buttons -->
        <div class="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
          <button
            @click="switchVideo(1)"
            :class="[
              'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition cursor-pointer border',
              selectedVideoIndex === 1
                ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
            ]"
          >
            <Film class="w-4 h-4" />
            <span>{{ videoList.video1.title || 'Video 1: Konsep Materi' }}</span>
          </button>

          <button
            @click="switchVideo(2)"
            :class="[
              'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition cursor-pointer border',
              selectedVideoIndex === 2
                ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
            ]"
          >
            <Film class="w-4 h-4" />
            <span>{{ videoList.video2.title || 'Video 2: Eksperimen & Praktik' }}</span>
          </button>
        </div>

        <!-- Video Player Display Container -->
        <div class="w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md relative border border-[#8F8575]/25 flex items-center justify-center">
          
          <!-- Case A: YouTube Video -->
          <iframe
            v-if="isCurrentVideoYouTube"
            :src="currentEmbedUrl"
            :title="currentVideo.title"
            class="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          <!-- Case B: Direct Upload / MP4 Video -->
          <video
            v-else-if="currentVideo.url"
            ref="videoPlayerRef"
            :src="currentVideo.url"
            controls
            playsinline
            class="w-full h-full object-contain"
          ></video>

          <!-- Fallback No Video -->
          <div v-else class="text-center p-8 text-white space-y-2">
            <Video class="w-12 h-12 text-[#94C6FF] mx-auto" />
            <p class="font-semibold text-sm">Video belum diatur oleh admin</p>
          </div>
        </div>

        <!-- Video Info & Speed Control (For MP4) -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/20">
          <div class="text-left">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white text-[#1E7A6F] border border-[#8F8575]/30">
                Video {{ selectedVideoIndex }} dari 2
              </span>
              <span v-if="isCurrentVideoYouTube" class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFB899]/30 text-[#2B3445] border border-[#8F8575]/20">
                YouTube
              </span>
              <span v-else class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#7FD4C4]/30 text-[#2B3445] border border-[#8F8575]/20">
                MP4 Video
              </span>
            </div>
            <h4 class="font-['Baloo_2'] font-bold text-lg text-[#2B3445] mt-1">
              {{ currentVideo.title }}
            </h4>
          </div>

          <!-- Speed controller for native video -->
          <div v-if="!isCurrentVideoYouTube && currentVideo.url" class="flex items-center gap-1.5 self-end sm:self-center">
            <span class="text-xs font-semibold text-[#5B6474] mr-1">Kecepatan:</span>
            <button
              v-for="s in [0.75, 1.0, 1.25]"
              :key="s"
              @click="setPlaybackSpeed(s)"
              :class="[
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer',
                currentPlaybackSpeed === s
                  ? 'bg-[#1E7A6F] text-white'
                  : 'bg-white text-[#2B3445] border border-[#8F8575]/30 hover:border-[#1E7A6F]'
              ]"
            >
              {{ s }}x
            </button>
          </div>
        </div>

        <!-- Video Bottom Navigation -->
        <div class="pt-4 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <button
              v-if="selectedVideoIndex === 1"
              @click="switchVideo(2)"
              class="btn-prisma-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <span>Tonton Video 2 (Praktik)</span>
              <ChevronRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>
            <button
              v-else-if="selectedVideoIndex === 2"
              @click="switchVideo(1)"
              class="btn-prisma-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <ChevronRight class="w-4 h-4 text-[#1E7A6F] rotate-180" />
              <span>Kembali ke Video 1 (Konsep)</span>
            </button>
          </div>

          <button
            @click="activeTab = 'quiz'; playButtonPop()"
            class="btn-prisma-mint px-6 py-3.5 text-sm font-semibold flex items-center gap-2.5 cursor-pointer transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F] shadow-sm"
          >
            <span>Lanjut ke Kuis Interaktif (Langkah 2)</span>
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
            <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== LANGKAH 2: QUIZ (BACAAN & KUIS INTERAKTIF) ==================== -->
    <div v-if="activeTab === 'quiz'" class="space-y-6 animate-soft-pop">
      
      <!-- ==================== KARTU BACAAN MELEKAT DI ATAS KUIS ==================== -->
      <section
        v-if="readingText"
        class="bg-white rounded-3xl border-2 border-[#1E7A6F]/25 p-5 sm:p-7 shadow-xs space-y-4 text-left relative overflow-hidden transition-all duration-300"
      >
        <!-- Top Accent Strip -->
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E7A6F] via-[#7FD4C4] to-[#FFDE7A]"></div>

        <!-- Header Kartu Bacaan -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center shrink-0 border border-[#1E7A6F]/20">
              <BookOpen class="w-5 h-5 text-[#1E7A6F]" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1E7A6F] text-white">
                  Teks Bacaan Melekat
                </span>
                <span v-if="materi.title" class="text-xs font-semibold text-[#5B6474] hidden sm:inline">
                  {{ materi.title }}
                </span>
              </div>
              <h3 class="font-['Baloo_2'] text-lg sm:text-xl font-bold text-[#2B3445] mt-0.5 leading-snug">
                Bacalah Cerita Ini Sebelum Menjawab Soal Kuis
              </h3>
            </div>
          </div>

          <!-- Aksi: Suara Narasi & Buka/Tutup Bacaan -->
          <div class="flex items-center gap-2">
            <!-- Tombol Dengar Narasi Suara -->
            <button
              type="button"
              @click="toggleAudioNarration"
              class="px-3 py-1.5 rounded-xl border border-[#1E7A6F]/30 bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 text-[#1E7A6F] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              :title="isPlayingAudio ? 'Hentikan suara' : 'Dengarkan suara cerita'"
            >
              <Volume2 v-if="!isPlayingAudio" class="w-3.5 h-3.5" />
              <VolumeX v-else class="w-3.5 h-3.5 text-[#D97706]" />
              <span>{{ isPlayingAudio ? 'Hentikan Suara' : 'Dengar Cerita' }}</span>
            </button>

            <!-- Toggle Sembunyikan / Buka -->
            <button
              type="button"
              @click="isBacaanExpanded = !isBacaanExpanded; playButtonPop()"
              class="px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0] hover:bg-black/5 text-[#2B3445] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>{{ isBacaanExpanded ? 'Sembunyikan' : 'Buka Bacaan' }}</span>
              <ChevronUp v-if="isBacaanExpanded" class="w-3.5 h-3.5 text-[#5B6474]" />
              <ChevronDown v-else class="w-3.5 h-3.5 text-[#5B6474]" />
            </button>
          </div>
        </div>

        <!-- Tujuan Belajar (jika ada) -->
        <div v-if="readingGoal && isBacaanExpanded" class="bg-[#FFF8F0] px-4 py-2.5 rounded-2xl border border-[#8F8575]/20 text-xs text-[#5B6474] flex items-start gap-2">
          <Sparkles class="w-3.5 h-3.5 text-[#1E7A6F] shrink-0 mt-0.5" />
          <p class="leading-relaxed">
            <strong class="text-[#2B3445]">Tujuan Pembelajaran:</strong> {{ readingGoal }}
          </p>
        </div>

        <!-- Konten Teks Bacaan -->
        <div
          v-show="isBacaanExpanded"
          class="bg-[#FFF8F0]/80 p-5 sm:p-6 rounded-2xl border border-[#8F8575]/20 max-h-72 sm:max-h-80 overflow-y-auto space-y-3"
        >
          <p class="text-[#2B3445] font-['Lexend'] text-sm sm:text-base leading-relaxed sm:leading-loose whitespace-pre-line select-text">
            {{ readingText }}
          </p>
        </div>

        <!-- Ringkasan jika sedang disembunyikan -->
        <div
          v-if="!isBacaanExpanded"
          @click="isBacaanExpanded = true; playButtonPop()"
          class="bg-[#FFF8F0] p-3 rounded-2xl border border-dashed border-[#8F8575]/35 text-xs text-[#5B6474] flex items-center justify-between cursor-pointer hover:bg-[#7FD4C4]/15 transition"
        >
          <span class="truncate max-w-xl italic">"{{ readingText.slice(0, 110) }}..."</span>
          <span class="text-[#1E7A6F] font-bold shrink-0 ml-2">Buka Cerita ▾</span>
        </div>
      </section>

      <!-- ==================== KARTU KUIS AKTIF ==================== -->
      <div class="card-prisma p-6 sm:p-8 lg:p-10 space-y-6">
        
        <!-- Header Quiz -->
        <div class="flex items-center justify-between border-b border-[#8F8575]/20 pb-5">
          <div class="text-left">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFDE7A]/40 text-[#2B3445] border border-[#8F8575]/25">
              <Sparkles class="w-3.5 h-3.5 text-[#1E7A6F]" /> Langkah 2: Kuis Interaktif
            </span>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445] mt-1.5">
              {{ quizData.title || 'Kuis Pemahaman Materi' }}
            </h2>
          </div>

          <div v-if="!isQuizSubmitted" class="text-right">
            <span class="text-xs font-normal text-[#5B6474] block">Progres Kuis</span>
            <span class="text-sm font-bold text-[#2B3445]">
              {{ currentQuestionIndex + 1 }} / {{ questions.length }} Soal
            </span>
          </div>
        </div>

        <!-- ==================== QUIZ ACTIVE QUESTION VIEW ==================== -->
        <div v-if="!isQuizSubmitted && questions.length > 0" class="space-y-6">
          
          <!-- Progress Bar -->
          <div class="w-full h-2.5 bg-[#FFF8F0] rounded-full overflow-hidden border border-[#8F8575]/25">
            <div
              class="h-full bg-[#7FD4C4] transition-all duration-300 rounded-full"
              :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
            ></div>
          </div>

          <!-- Question Card Box -->
          <div class="bg-[#FFF8F0] rounded-3xl p-6 sm:p-8 border-2 border-[#8F8575]/25 space-y-6 text-left">
            
            <!-- Question Badge, Type & Points -->
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-3.5 py-1.5 rounded-xl bg-[#1E7A6F] text-white text-xs font-semibold">
                  Pertanyaan {{ currentQuestionIndex + 1 }}
                </span>
                <span
                  class="px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5"
                  :class="
                    currentQuestion.type === 'image_choice' ? 'bg-[#FFDE7A]/50 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'matching' ? 'bg-[#94C6FF]/35 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'ordering' ? 'bg-[#7FD4C4]/40 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'true_false' ? 'bg-[#FFB899]/40 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'fill_in_blank' ? 'bg-[#7FD4C4]/35 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'multi_select' ? 'bg-[#94C6FF]/35 text-[#2B3445] border-[#8F8575]/30' :
                    currentQuestion.type === 'grid_map' ? 'bg-[#FFDE7A]/50 text-[#2B3445] border-[#8F8575]/30' :
                    'bg-white text-[#5B6474] border-[#8F8575]/25'
                  "
                >
                  <Sparkles v-if="currentQuestion.type === 'image_choice'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <Link v-else-if="currentQuestion.type === 'matching'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <ArrowUpDown v-else-if="currentQuestion.type === 'ordering'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <Hash v-else-if="currentQuestion.type === 'fill_in_blank'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <CheckSquare v-else-if="currentQuestion.type === 'multi_select'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <Compass v-else-if="currentQuestion.type === 'grid_map'" class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  <span>{{ currentQuestion.instructionBadge || 'Kuis Pilihan Ganda' }}</span>
                </span>
              </div>

              <span class="px-3 py-1 rounded-xl bg-[#FFDE7A]/50 text-[#2B3445] border border-[#8F8575]/30 text-xs font-semibold">
                +{{ currentQuestion.points || 50 }} Poin
              </span>
            </div>

            <!-- Question Text -->
            <h3 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#2B3445] leading-snug">
              {{ currentQuestion.questionText }}
            </h3>

            <!-- Informasi Tambahan / Piktogram / Konteks (jika ada) -->
            <div v-if="currentQuestion.info" class="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FFF8F0] border-2 border-[#FFDE7A] text-xs sm:text-sm text-[#2B3445] shadow-xs">
              <div class="w-7 h-7 rounded-xl bg-[#FFDE7A] text-[#2B3445] flex items-center justify-center shrink-0 mt-0.5">
                <Info class="w-4 h-4" />
              </div>
              <div class="leading-relaxed">
                <span class="font-bold text-[#1E7A6F] block text-xs uppercase tracking-wider mb-0.5">Petunjuk Informasi:</span>
                <span>{{ currentQuestion.info }}</span>
              </div>
            </div>

            <!-- Optional Question Banner Image (if any) -->
            <div v-if="currentQuestion.image && currentQuestion.type !== 'image_choice'" class="w-full flex justify-center py-2">
              <div class="max-w-md w-full aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-[#8F8575]/25 bg-white relative">
                <img
                  :src="currentQuestion.image"
                  :alt="currentQuestion.questionText"
                  class="w-full h-full object-contain p-2"
                />
              </div>
            </div>

            <!-- ==================== MODE 1: IMAGE CHOICE ("LINGKARI GAMBAR") ==================== -->
            <div v-if="currentQuestion.type === 'image_choice'" class="space-y-4 pt-2">
              <div class="flex items-center gap-2 text-xs font-medium text-[#1E7A6F] bg-[#7FD4C4]/20 px-3.5 py-2 rounded-xl border border-[#7FD4C4]/40">
                <MousePointerClick class="w-4 h-4 shrink-0" />
                <span>Ketuk langsung gambar di bawah untuk melingkari jawaban pilihanmu!</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div
                  v-for="(opt, optIdx) in currentQuestion.imageOptions || []"
                  :key="optIdx"
                  @click="selectAnswer(optIdx)"
                  :class="[
                    'relative rounded-3xl p-4 transition-all duration-200 cursor-pointer flex flex-col items-center text-center bg-white border-2 select-none group',
                    selectedAnswers[currentQuestionIndex] === optIdx
                      ? 'border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 bg-[#7FD4C4]/5 scale-[1.02]'
                      : 'border-[#8F8575]/25 hover:border-[#1E7A6F]/60 hover:shadow-sm'
                  ]"
                >
                  <!-- Animated Hand-Drawn Crayon Circle SVG Overlay ("Lingkari") -->
                  <svg
                    v-if="selectedAnswers[currentQuestionIndex] === optIdx"
                    class="absolute inset-0 w-full h-full pointer-events-none z-20 p-1"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="47"
                      ry="45"
                      fill="none"
                      stroke="#1E7A6F"
                      stroke-width="4.5"
                      stroke-linecap="round"
                      class="animate-draw-circle"
                    />
                  </svg>

                  <!-- Selected Badge in top right corner -->
                  <div
                    v-if="selectedAnswers[currentQuestionIndex] === optIdx"
                    class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-[#1E7A6F] text-white text-xs font-bold shadow-sm flex items-center gap-1"
                  >
                    <Check class="w-3.5 h-3.5" />
                    <span>Dilingkari</span>
                  </div>

                  <!-- Choice Letter Badge -->
                  <span
                    :class="[
                      'absolute top-3 left-3 w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-colors z-30',
                      selectedAnswers[currentQuestionIndex] === optIdx
                        ? 'bg-[#1E7A6F] text-white'
                        : 'bg-[#FFF8F0] text-[#2B3445] border border-[#8F8575]/25'
                    ]"
                  >
                    {{ String.fromCharCode(65 + optIdx) }}
                  </span>

                  <!-- Image Container -->
                  <div class="w-full aspect-square max-h-44 rounded-2xl overflow-hidden bg-[#FFF8F0] flex items-center justify-center p-3 my-2">
                    <img
                      :src="opt.image"
                      :alt="opt.label"
                      class="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  <!-- Image Label -->
                  <p class="font-['Baloo_2'] text-base sm:text-lg font-bold text-[#2B3445] mt-1 leading-snug">
                    {{ opt.label }}
                  </p>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 2: MATCHING ("TARIK GARIS / PASANGKAN") ==================== -->
            <div v-else-if="currentQuestion.type === 'matching'" class="space-y-4 pt-2">
              <div class="flex items-center justify-between bg-[#94C6FF]/20 px-4 py-2.5 rounded-xl border border-[#94C6FF]/40">
                <div class="flex items-center gap-2 text-xs font-medium text-[#2B3445]">
                  <Link class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                  <span>
                    {{ activeMatchingLeft ? `Memilih pasangan untuk "${activeMatchingLeft}" 👉 Ketuk salah satu di Kolom Kanan` : 'Ketuk item di Kolom Kiri, lalu pasangkan dengan item di Kolom Kanan!' }}
                  </span>
                </div>
                <button
                  v-if="Object.keys(getMatchingAnswersForCurrent()).length > 0"
                  @click="resetMatching"
                  class="text-xs font-semibold text-[#B45309] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Undo2 class="w-3 h-3" /> Reset
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <!-- Kolom Kiri (A) -->
                <div class="space-y-3">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-[#5B6474] px-1 flex items-center justify-between">
                    <span>Kolom A</span>
                    <span class="text-[11px] font-normal">Pilih Item</span>
                  </h4>
                  <div class="space-y-2.5">
                    <div
                      v-for="(item, idx) in currentQuestion.leftItems || []"
                      :key="idx"
                      @click="selectMatchingLeft(item)"
                      :class="[
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-semibold select-none',
                        activeMatchingLeft === item
                          ? 'border-[#1E7A6F] bg-[#7FD4C4]/25 ring-2 ring-[#1E7A6F] scale-[1.02] shadow-sm text-[#1E7A6F]'
                          : getMatchingAnswersForCurrent()[item]
                          ? `${getPairColor(item).border} ${getPairColor(item).bg} text-[#2B3445]`
                          : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] text-[#2B3445]'
                      ]"
                    >
                      <div class="flex items-center gap-2.5">
                        <span class="w-6 h-6 rounded-lg bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold flex items-center justify-center text-[#5B6474]">
                          {{ idx + 1 }}
                        </span>
                        <span>{{ item }}</span>
                      </div>

                      <div class="flex items-center gap-2">
                        <span
                          v-if="getMatchingAnswersForCurrent()[item]"
                          :class="['px-2.5 py-1 rounded-lg text-xs font-bold text-white', getPairColor(item).badgeBg]"
                        >
                          {{ getPairColor(item).label }}
                        </span>
                        <button
                          v-if="getMatchingAnswersForCurrent()[item]"
                          @click.stop="removeMatchingPair(item)"
                          class="w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-xs text-[#5B6474]"
                          title="Lepas pasangan"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Kolom Kanan (B) -->
                <div class="space-y-3">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-[#5B6474] px-1 flex items-center justify-between">
                    <span>Kolom B</span>
                    <span class="text-[11px] font-normal">Pasangannya</span>
                  </h4>
                  <div class="space-y-2.5">
                    <div
                      v-for="(item, idx) in currentQuestion.rightItems || []"
                      :key="idx"
                      @click="selectMatchingRight(item)"
                      :class="[
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-semibold select-none',
                        getPairColorForRight(item)
                          ? `${getPairColorForRight(item).border} ${getPairColorForRight(item).bg} text-[#2B3445]`
                          : activeMatchingLeft
                          ? 'bg-white border-dashed border-[#1E7A6F] hover:bg-[#7FD4C4]/15 hover:scale-[1.01] text-[#2B3445]'
                          : 'bg-white border-[#8F8575]/25 text-[#2B3445]'
                      ]"
                    >
                      <div class="flex items-center gap-2.5">
                        <span class="w-6 h-6 rounded-lg bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold flex items-center justify-center text-[#5B6474]">
                          {{ String.fromCharCode(65 + idx) }}
                        </span>
                        <span>{{ item }}</span>
                      </div>

                      <span
                        v-if="getPairColorForRight(item)"
                        :class="['px-2.5 py-1 rounded-lg text-xs font-bold text-white', getPairColorForRight(item).badgeBg]"
                      >
                        {{ getPairColorForRight(item).label }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 3: ORDERING ("URUTKAN KOTAK") ==================== -->
            <div v-else-if="currentQuestion.type === 'ordering'" class="space-y-5 pt-2">
              <div class="flex items-center justify-between bg-[#7FD4C4]/20 px-4 py-2.5 rounded-xl border border-[#7FD4C4]/40">
                <div class="flex items-center gap-2 text-xs font-medium text-[#2B3445]">
                  <ArrowUpDown class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                  <span>Ketuk kartu di bawah untuk menyusun urutan dari kotak 1 ke kotak berikutnya!</span>
                </div>
                <button
                  v-if="getOrderingAnswersForCurrent().length > 0"
                  @click="resetOrdering"
                  class="text-xs font-semibold text-[#B45309] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Undo2 class="w-3 h-3" /> Reset Urutan
                </button>
              </div>

              <!-- Kotak Hasil Urutan (Slots) -->
              <div class="space-y-2">
                <span class="text-xs font-bold text-[#5B6474] block">Kotak Susunan Urutan:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div
                    v-for="(_, slotIdx) in currentQuestion.orderItems || []"
                    :key="slotIdx"
                    class="min-h-18 rounded-2xl border-2 p-3 flex flex-col justify-between transition-all"
                    :class="getOrderingAnswersForCurrent()[slotIdx]
                      ? 'bg-white border-[#1E7A6F] shadow-sm'
                      : 'border-dashed border-[#8F8575]/35 bg-[#FFF8F0]/70 items-center justify-center'"
                  >
                    <div class="flex items-center justify-between w-full">
                      <span class="w-6 h-6 rounded-lg bg-[#1E7A6F] text-white text-xs font-bold flex items-center justify-center">
                        {{ slotIdx + 1 }}
                      </span>
                      <button
                        v-if="getOrderingAnswersForCurrent()[slotIdx]"
                        @click="removeFromOrdering(getOrderingAnswersForCurrent()[slotIdx])"
                        class="w-5 h-5 rounded-full hover:bg-black/10 text-xs text-[#5B6474] flex items-center justify-center"
                        title="Keluarkan dari kotak"
                      >
                        ✕
                      </button>
                    </div>

                    <p v-if="getOrderingAnswersForCurrent()[slotIdx]" class="font-bold text-sm text-[#2B3445] mt-2 leading-snug">
                      {{ getOrderingAnswersForCurrent()[slotIdx] }}
                    </p>
                    <span v-else class="text-xs font-medium text-[#8F8575] py-2">
                      Kotak {{ slotIdx + 1 }} Kosong
                    </span>
                  </div>
                </div>
              </div>

              <!-- Bank Pilihan Kartu Tersedia -->
              <div class="space-y-2 pt-2 border-t border-[#8F8575]/20">
                <span class="text-xs font-bold text-[#5B6474] block">Pilihan Kartu yang Belum Masuk Kotak:</span>
                <div class="flex flex-wrap gap-2.5">
                  <button
                    v-for="(item, idx) in currentQuestion.orderItems || []"
                    :key="idx"
                    @click="addToOrdering(item)"
                    :disabled="getOrderingAnswersForCurrent().includes(item)"
                    :class="[
                      'px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border flex items-center gap-2 cursor-pointer',
                      getOrderingAnswersForCurrent().includes(item)
                        ? 'opacity-35 bg-[#E0E0E0] border-transparent text-[#8F8575] cursor-not-allowed line-through'
                        : 'bg-white border-[#8F8575]/30 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 text-[#2B3445] shadow-xs'
                    ]"
                  >
                    <span>{{ item }}</span>
                    <span v-if="!getOrderingAnswersForCurrent().includes(item)" class="text-xs text-[#1E7A6F]">＋</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 4: TRUE / FALSE ("LINGKARI B ATAU S") ==================== -->
            <div v-else-if="currentQuestion.type === 'true_false'" class="space-y-4 pt-2">
              <div class="flex items-center gap-2 text-xs font-medium text-[#2B3445] bg-[#FFB899]/25 px-3.5 py-2 rounded-xl border border-[#FFB899]/40">
                <Sparkles class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                <span>Lingkari B jika pernyataan ini Benar, atau lingkari S jika pernyataan ini Salah!</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <!-- Opsi B (Benar) -->
                <button
                  @click="selectAnswer(0)"
                  :class="[
                    'relative p-6 rounded-3xl border-2 transition-all flex items-center gap-5 cursor-pointer text-left select-none',
                    selectedAnswers[currentQuestionIndex] === 0
                      ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] ring-4 ring-[#7FD4C4]/40 shadow-sm scale-[1.02]'
                      : 'bg-white border-[#8F8575]/30 hover:border-[#1E7A6F]'
                  ]"
                >
                  <!-- Animated Marker Ring SVG -->
                  <svg
                    v-if="selectedAnswers[currentQuestionIndex] === 0"
                    class="absolute inset-0 w-full h-full pointer-events-none z-20 p-1"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="47"
                      ry="45"
                      fill="none"
                      stroke="#1E7A6F"
                      stroke-width="4.5"
                      stroke-linecap="round"
                      class="animate-draw-circle"
                    />
                  </svg>

                  <div
                    :class="[
                      'w-14 h-14 rounded-2xl font-bold font-[\'Baloo_2\'] text-2xl flex items-center justify-center shrink-0 transition-colors',
                      selectedAnswers[currentQuestionIndex] === 0
                        ? 'bg-[#1E7A6F] text-white'
                        : 'bg-[#FFF8F0] text-[#1E7A6F] border border-[#8F8575]/25'
                    ]"
                  >
                    B
                  </div>

                  <div class="flex-1">
                    <p class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">BENAR</p>
                    <p class="text-xs text-[#5B6474] font-normal">Pernyataan pada soal adalah tepat</p>
                  </div>

                  <Check v-if="selectedAnswers[currentQuestionIndex] === 0" class="w-6 h-6 text-[#1E7A6F] shrink-0" />
                </button>

                <!-- Opsi S (Salah) -->
                <button
                  @click="selectAnswer(1)"
                  :class="[
                    'relative p-6 rounded-3xl border-2 transition-all flex items-center gap-5 cursor-pointer text-left select-none',
                    selectedAnswers[currentQuestionIndex] === 1
                      ? 'bg-[#FFDE7A]/30 border-[#D97706] ring-4 ring-[#FFDE7A]/50 shadow-sm scale-[1.02]'
                      : 'bg-white border-[#8F8575]/30 hover:border-[#D97706]'
                  ]"
                >
                  <!-- Animated Marker Ring SVG -->
                  <svg
                    v-if="selectedAnswers[currentQuestionIndex] === 1"
                    class="absolute inset-0 w-full h-full pointer-events-none z-20 p-1"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="47"
                      ry="45"
                      fill="none"
                      stroke="#D97706"
                      stroke-width="4.5"
                      stroke-linecap="round"
                      class="animate-draw-circle"
                    />
                  </svg>

                  <div
                    :class="[
                      'w-14 h-14 rounded-2xl font-bold font-[\'Baloo_2\'] text-2xl flex items-center justify-center shrink-0 transition-colors',
                      selectedAnswers[currentQuestionIndex] === 1
                        ? 'bg-[#D97706] text-white'
                        : 'bg-[#FFF8F0] text-[#D97706] border border-[#8F8575]/25'
                    ]"
                  >
                    S
                  </div>

                  <div class="flex-1">
                    <p class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">SALAH</p>
                    <p class="text-xs text-[#5B6474] font-normal">Pernyataan pada soal kurang tepat</p>
                  </div>

                  <Check v-if="selectedAnswers[currentQuestionIndex] === 1" class="w-6 h-6 text-[#D97706] shrink-0" />
                </button>
              </div>
            </div>

            <!-- ==================== MODE 5: FILL IN THE BLANK ("ISI ANGKA / JAWABAN") ==================== -->
            <div v-else-if="currentQuestion.type === 'fill_in_blank'" class="space-y-4 pt-2">
              <div class="flex items-center gap-2 text-xs font-medium text-[#1E7A6F] bg-[#7FD4C4]/20 px-3.5 py-2.5 rounded-xl border border-[#7FD4C4]/40">
                <Hash class="w-4 h-4 shrink-0" />
                <span>{{ currentQuestion.hint || 'Tuliskan angka jawaban yang tepat pada kotak di bawah!' }}</span>
              </div>

              <div class="max-w-md mx-auto space-y-4 pt-1">
                <div class="relative">
                  <input
                    type="text"
                    :value="selectedAnswers[currentQuestionIndex] || ''"
                    @input="onFillInBlankInput($event.target.value)"
                    placeholder="Ketik jawabanmu di sini..."
                    class="w-full px-6 py-4 rounded-2xl border-2 border-[#8F8575]/30 focus:border-[#1E7A6F] focus:ring-4 focus:ring-[#7FD4C4]/30 outline-none text-2xl font-bold text-center text-[#2B3445] bg-white transition shadow-xs font-['Baloo_2']"
                  />
                </div>

                <!-- Tombol Cepat Angka untuk Siswa SD -->
                <div class="bg-[#FFF8F0] p-4 rounded-2xl border border-[#8F8575]/25 space-y-2.5">
                  <span class="text-[11px] font-semibold text-[#5B6474] text-center block uppercase tracking-wider">
                    Tombol Bantuan Angka:
                  </span>
                  <div class="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                    <button
                      v-for="digit in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']"
                      :key="digit"
                      type="button"
                      @click="appendDigit(digit)"
                      class="h-11 rounded-xl bg-white border border-[#8F8575]/25 font-['Baloo_2'] text-xl font-bold text-[#2B3445] hover:bg-[#7FD4C4]/25 hover:border-[#1E7A6F] active:scale-95 transition cursor-pointer shadow-2xs"
                    >
                      {{ digit }}
                    </button>
                  </div>
                  <div class="flex justify-center gap-2 pt-1">
                    <button
                      type="button"
                      @click="backspaceDigit"
                      class="px-4 py-2 rounded-xl bg-white border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474] hover:text-[#2B3445] hover:bg-black/5 active:scale-95 transition cursor-pointer"
                    >
                      ⌫ Hapus Satu
                    </button>
                    <button
                      type="button"
                      @click="clearDigit"
                      class="px-4 py-2 rounded-xl bg-white border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474] hover:text-[#2B3445] hover:bg-black/5 active:scale-95 transition cursor-pointer"
                    >
                      Kosongkan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 6: MULTI SELECT ("PILIH SEMUA YANG BENAR") ==================== -->
            <div v-else-if="currentQuestion.type === 'multi_select'" class="space-y-4 pt-2">
              <div class="flex items-center gap-2 text-xs font-medium text-[#1E7A6F] bg-[#7FD4C4]/20 px-3.5 py-2.5 rounded-xl border border-[#7FD4C4]/40">
                <CheckSquare class="w-4 h-4 shrink-0" />
                <span>{{ currentQuestion.hint || 'Bisa memilih lebih dari satu jawaban. Ketuk semua pilihan yang benar!' }}</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
                <button
                  v-for="(opt, optIdx) in currentQuestion.options || []"
                  :key="optIdx"
                  type="button"
                  @click="toggleMultiSelect(optIdx)"
                  :class="[
                    'p-4 rounded-2xl font-medium text-base flex items-center justify-between gap-3 transition-all cursor-pointer border-2 select-none',
                    getMultiSelectAnswersForCurrent().includes(optIdx)
                      ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] text-[#1E7A6F] font-bold shadow-sm ring-2 ring-[#7FD4C4]/40 scale-[1.02]'
                      : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] text-[#2B3445]'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <div
                      :class="[
                        'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
                        getMultiSelectAnswersForCurrent().includes(optIdx)
                          ? 'bg-[#1E7A6F] border-[#1E7A6F] text-white'
                          : 'border-[#8F8575]/40 bg-white'
                      ]"
                    >
                      <Check v-if="getMultiSelectAnswersForCurrent().includes(optIdx)" class="w-4 h-4" />
                    </div>
                    <span class="font-['Baloo_2'] text-lg">{{ opt }}</span>
                  </div>

                  <span
                    v-if="getMultiSelectAnswersForCurrent().includes(optIdx)"
                    class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E7A6F] text-white"
                  >
                    Dipilih
                  </span>
                </button>
              </div>
            </div>

            <!-- ==================== MODE 7: GRID MAP ("PILIH PETAK DI PETA / KOORDINAT") ==================== -->
            <div v-else-if="currentQuestion.type === 'grid_map'" class="space-y-4 pt-2">
              <div class="flex items-center gap-2 text-xs font-medium text-[#1E7A6F] bg-[#7FD4C4]/20 px-3.5 py-2.5 rounded-xl border border-[#7FD4C4]/40">
                <Compass class="w-4 h-4 shrink-0" />
                <span>{{ currentQuestion.hint || 'Mulai dari petak D4, ikuti petunjuk langkah lalu ketuk petak tujuanmu di papan peta!' }}</span>
              </div>

              <div class="max-w-md mx-auto bg-white p-4 rounded-3xl border-2 border-[#8F8575]/25 space-y-3">
                <div class="flex items-center justify-between text-xs font-semibold px-2">
                  <span class="flex items-center gap-1.5 text-[#1E7A6F]">
                    <MapPin class="w-3.5 h-3.5" /> Posisi Awal: <strong class="bg-[#FFF8F0] px-2 py-0.5 rounded-lg border border-[#8F8575]/25">{{ currentQuestion.initialCell || 'D4' }}</strong>
                  </span>
                  <span class="text-[#2B3445]">
                    Pilihanmu: <strong class="text-[#1E7A6F] bg-[#7FD4C4]/20 px-2 py-0.5 rounded-lg border border-[#1E7A6F]/30">{{ selectedAnswers[currentQuestionIndex] || '-' }}</strong>
                  </span>
                </div>

                <!-- 6x6 Grid Table (Kolom A-F, Baris 1-6) -->
                <div class="overflow-x-auto pb-1">
                  <div class="min-w-[280px]">
                    <!-- Kolom Header A, B, C, D, E, F -->
                    <div class="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-[#5B6474] mb-1.5">
                      <div></div>
                      <div v-for="col in (currentQuestion.gridColumns || ['A','B','C','D','E','F'])" :key="col" class="py-1">
                        {{ col }}
                      </div>
                    </div>

                    <!-- Baris 1 sampai 6 -->
                    <div
                      v-for="row in (currentQuestion.gridRows || [1, 2, 3, 4, 5, 6])"
                      :key="row"
                      class="grid grid-cols-7 gap-1.5 mb-1.5 items-center"
                    >
                      <!-- Label Baris -->
                      <div class="text-xs font-bold text-[#5B6474] text-center">
                        {{ row }}
                      </div>

                      <!-- Petak A-F untuk Baris ini -->
                      <button
                        v-for="col in (currentQuestion.gridColumns || ['A','B','C','D','E','F'])"
                        :key="`${col}${row}`"
                        type="button"
                        @click="selectGridCell(`${col}${row}`)"
                        :class="[
                          'h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer border select-none relative',
                          selectedAnswers[currentQuestionIndex] === `${col}${row}`
                            ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm ring-2 ring-[#7FD4C4] scale-105 z-10'
                            : `${col}${row}` === (currentQuestion.initialCell || 'D4')
                            ? 'bg-[#FFDE7A]/50 border-[#D97706] text-[#B45309]'
                            : 'bg-[#FFF8F0] border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 text-[#2B3445]'
                        ]"
                      >
                        <span>{{ col }}{{ row }}</span>
                        <span v-if="`${col}${row}` === (currentQuestion.initialCell || 'D4') && selectedAnswers[currentQuestionIndex] !== `${col}${row}`" class="text-[9px] font-normal leading-none text-[#B45309]">
                          Awal
                        </span>
                        <span v-else-if="selectedAnswers[currentQuestionIndex] === `${col}${row}`" class="text-[9px] font-normal leading-none text-white">
                          Tujuan
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 8: MULTIPLE CHOICE DEFAULT ==================== -->
            <div v-else class="grid grid-cols-1 gap-3 pt-2">
              <button
                v-for="(opt, optIdx) in currentQuestion.options"
                :key="optIdx"
                @click="selectAnswer(optIdx)"
                :class="[
                  'w-full p-4 sm:p-5 rounded-2xl font-medium text-sm sm:text-base flex items-center gap-4 transition-all duration-150 cursor-pointer text-left border-2',
                  selectedAnswers[currentQuestionIndex] === optIdx
                    ? 'bg-white border-[#1E7A6F] text-[#2B3445] shadow-sm ring-2 ring-[#7FD4C4]/30'
                    : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] text-[#2B3445]'
                ]"
              >
                <!-- Option Letter Badge (A, B, C, D) -->
                <span
                  :class="[
                    'w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 transition-colors',
                    selectedAnswers[currentQuestionIndex] === optIdx
                      ? 'bg-[#1E7A6F] text-white'
                      : 'bg-[#FFF8F0] text-[#2B3445] border border-[#8F8575]/25'
                  ]"
                >
                  {{ String.fromCharCode(65 + optIdx) }}
                </span>

                <span class="flex-1 font-semibold leading-snug">
                  {{ opt }}
                </span>

                <!-- Check icon when selected -->
                <Check
                  v-if="selectedAnswers[currentQuestionIndex] === optIdx"
                  class="w-5 h-5 text-[#1E7A6F] shrink-0"
                />
              </button>
            </div>
          </div>

          <!-- Bottom Quiz Navigation Bar -->
          <div class="flex items-center justify-between gap-4 pt-4 border-t border-[#8F8575]/20">
            <button
              @click="prevQuestion"
              :disabled="currentQuestionIndex === 0"
              :class="[
                'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border',
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-white border-[#8F8575]/20 text-[#5B6474]'
                  : 'btn-prisma-white'
              ]"
            >
              <ArrowLeft class="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <!-- Number Pills Quick Switcher -->
            <div class="hidden sm:flex items-center gap-2">
              <button
                v-for="(_, qIdx) in questions"
                :key="qIdx"
                @click="currentQuestionIndex = qIdx; playButtonPop()"
                :class="[
                  'w-8 h-8 rounded-xl text-xs font-semibold transition cursor-pointer border',
                  currentQuestionIndex === qIdx
                    ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                    : isQuestionAnswered(qIdx)
                    ? 'bg-[#7FD4C4] text-[#2B3445] border-[#7FD4C4]'
                    : 'bg-white text-[#5B6474] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                ]"
              >
                {{ qIdx + 1 }}
              </button>
            </div>

            <!-- Next or Submit Button -->
            <button
              v-if="currentQuestionIndex < questions.length - 1"
              @click="nextQuestion"
              class="btn-prisma-mint-dark px-6 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ArrowRight class="w-4 h-4" />
            </button>

            <button
              v-else
              @click="submitQuiz"
              :disabled="!isQuestionAnswered(currentQuestionIndex)"
              :class="[
                'px-7 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2 transition cursor-pointer shadow-sm',
                isQuestionAnswered(currentQuestionIndex)
                  ? 'btn-prisma-mint'
                  : 'bg-white border border-[#8F8575]/25 text-[#5B6474] opacity-50 cursor-not-allowed'
              ]"
            >
              <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
              <span>Kirim Jawaban & Selesai</span>
            </button>
          </div>

        </div>

        <!-- ==================== QUIZ RESULTS SCREEN (CHILD-FRIENDLY, NO RED!) ==================== -->
        <div v-else-if="isQuizSubmitted" class="space-y-8 animate-soft-pop text-center">
          
          <!-- Score Celebration Hero Card -->
          <div class="bg-[#FFF8F0] rounded-3xl p-8 sm:p-12 border border-[#8F8575]/25 space-y-4">
            <div class="w-20 h-20 rounded-2xl bg-[#FFDE7A] text-[#2B3445] flex items-center justify-center mx-auto text-4xl shadow-sm border border-[#8F8575]/25">
              <Trophy class="w-10 h-10 text-[#2B3445]" />
            </div>

            <div class="space-y-1">
              <h3 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445]">
                {{ isPerfectScore ? 'Luar Biasa! Nilai Sempurna! 🌟' : 'Hebat Sekali! Kamu Telah Menyelesaikan Kuis! 🎉' }}
              </h3>
              <p class="text-sm text-[#5B6474] font-normal">
                Kamu menjawab <strong class="text-[#1E7A6F] font-bold">{{ correctCount }} dari {{ questions.length }}</strong> soal dengan tepat.
              </p>
            </div>

            <!-- Score Pill -->
            <div class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-[#8F8575]/25 shadow-sm">
              <span class="text-xs font-semibold text-[#5B6474] uppercase tracking-wider">Skor Akhir:</span>
              <span class="font-['Baloo_2'] text-3xl sm:text-4xl font-bold text-[#2B3445]">
                {{ quizScore }} <span class="text-sm text-[#5B6474] font-normal">/ {{ totalPossibleScore }} Poin</span>
              </span>
            </div>
          </div>

          <!-- Question Review (Pembahasan Ramah Anak: Benar = Mint, Coba Lagi = Kuning) -->
          <div class="space-y-4 text-left">
            <h4 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445] flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-[#1E7A6F]" />
              <span>Pembahasan Soal & Kunci Jawaban</span>
            </h4>

            <div class="space-y-4">
              <div
                v-for="(q, idx) in questions"
                :key="q.id || idx"
                class="p-5 sm:p-6 rounded-2xl border bg-white space-y-3"
                :class="checkAnswerCorrectness(q, selectedAnswers[idx]) ? 'border-[#7FD4C4]' : 'border-[#FFDE7A]'"
              >
                <div class="flex items-center justify-between">
                  <!-- Umpan Balik: Benar = Mint, Belum Tepat = Kuning Ramah Anak -->
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-lg border"
                    :class="checkAnswerCorrectness(q, selectedAnswers[idx])
                      ? 'bg-[#7FD4C4]/20 border-[#7FD4C4] text-[#2B3445]'
                      : 'bg-[#FFDE7A]/30 border-[#FFDE7A] text-[#2B3445]'"
                  >
                    Soal {{ idx + 1 }}: {{ checkAnswerCorrectness(q, selectedAnswers[idx]) ? '✓ Jawabanmu Tepat' : '💡 Coba Perhatikan Lagi' }}
                  </span>
                  <span class="text-xs font-semibold text-[#5B6474]">
                    {{ checkAnswerCorrectness(q, selectedAnswers[idx]) ? `+${q.points || 50} Poin` : '0 Poin' }}
                  </span>
                </div>

                <p class="font-semibold text-[#2B3445] text-base">
                  {{ q.questionText }}
                </p>

                <!-- Gambar Soal di Pembahasan (jika bukan image_choice) -->
                <div v-if="q.image && q.type !== 'image_choice'" class="w-full flex justify-start py-1">
                  <img :src="q.image" alt="Gambar Soal" class="max-h-48 rounded-xl border border-[#8F8575]/25 object-contain" />
                </div>

                <!-- Detail Pilihan Jawaban di Review -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium pt-2">
                  <div
                    class="p-3.5 rounded-2xl border"
                    :class="checkAnswerCorrectness(q, selectedAnswers[idx])
                      ? 'bg-[#7FD4C4]/15 border-[#7FD4C4]'
                      : 'bg-[#FFDE7A]/25 border-[#FFDE7A]'"
                  >
                    <span class="text-[#5B6474] block mb-1.5 font-semibold">Jawabanmu:</span>
                    
                    <!-- Image Choice Review -->
                    <div v-if="q.type === 'image_choice'" class="flex items-center gap-2.5">
                      <img
                        v-if="q.imageOptions?.[selectedAnswers[idx]]?.image"
                        :src="q.imageOptions[selectedAnswers[idx]].image"
                        class="w-12 h-12 rounded-xl object-contain bg-white border border-[#8F8575]/25 p-1"
                      />
                      <span class="text-[#2B3445] font-bold text-sm">
                        {{ q.imageOptions?.[selectedAnswers[idx]]?.label || 'Tidak dijawab' }}
                      </span>
                    </div>

                    <!-- Matching Review -->
                    <div v-else-if="q.type === 'matching'" class="space-y-1">
                      <div v-for="(right, left) in (selectedAnswers[idx] || {})" :key="left" class="flex items-center gap-1.5 text-[#2B3445]">
                        <span class="font-semibold">{{ left }}</span>
                        <span>👉</span>
                        <span class="font-bold">{{ right }}</span>
                      </div>
                      <span v-if="!selectedAnswers[idx] || Object.keys(selectedAnswers[idx]).length === 0" class="text-[#8F8575]">Belum dipasangkan</span>
                    </div>

                    <!-- Ordering Review -->
                    <div v-else-if="q.type === 'ordering'" class="space-y-1">
                      <div class="flex flex-wrap gap-1.5 items-center">
                        <span
                          v-for="(item, oIdx) in (selectedAnswers[idx] || [])"
                          :key="oIdx"
                          class="px-2 py-0.5 rounded-md bg-white border border-[#8F8575]/25 font-bold text-[#2B3445]"
                        >
                          {{ oIdx + 1 }}. {{ item }}
                        </span>
                      </div>
                      <span v-if="!selectedAnswers[idx] || selectedAnswers[idx].length === 0" class="text-[#8F8575]">Belum diurutkan</span>
                    </div>

                    <!-- True False Review -->
                    <span v-else-if="q.type === 'true_false'" class="text-[#2B3445] font-bold text-sm">
                      {{ selectedAnswers[idx] === 0 ? 'Benar (B)' : selectedAnswers[idx] === 1 ? 'Salah (S)' : 'Tidak dijawab' }}
                    </span>

                    <!-- Fill in the blank Review -->
                    <span v-else-if="q.type === 'fill_in_blank'" class="text-[#2B3445] font-bold text-sm font-['Baloo_2'] text-base">
                      {{ selectedAnswers[idx] || 'Tidak dijawab' }}
                    </span>

                    <!-- Multi Select Review -->
                    <div v-else-if="q.type === 'multi_select'" class="flex flex-wrap gap-1.5 items-center">
                      <span
                        v-for="selIdx in (selectedAnswers[idx] || [])"
                        :key="selIdx"
                        class="px-2.5 py-0.5 rounded-lg bg-white border border-[#8F8575]/25 font-bold text-[#2B3445]"
                      >
                        {{ q.options[selIdx] }}
                      </span>
                      <span v-if="!selectedAnswers[idx] || selectedAnswers[idx].length === 0" class="text-[#8F8575]">Belum dipilih</span>
                    </div>

                    <!-- Grid Map Review -->
                    <span v-else-if="q.type === 'grid_map'" class="text-[#2B3445] font-bold text-sm">
                      Petak {{ selectedAnswers[idx] || 'Tidak dijawab' }}
                    </span>

                    <!-- Multiple Choice Review -->
                    <span v-else class="text-[#2B3445] font-bold text-sm">
                      {{ selectedAnswers[idx] !== undefined ? `${String.fromCharCode(65 + selectedAnswers[idx])}. ${q.options[selectedAnswers[idx]]}` : 'Tidak dijawab' }}
                    </span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-[#7FD4C4]/20 border border-[#7FD4C4]">
                    <span class="text-[#1E7A6F] block mb-1.5 font-semibold">Kunci Jawaban Tepat:</span>
                    
                    <!-- Image Choice Correct -->
                    <div v-if="q.type === 'image_choice'" class="flex items-center gap-2.5">
                      <img
                        v-if="q.imageOptions?.[q.correctOptionIndex]?.image"
                        :src="q.imageOptions[q.correctOptionIndex].image"
                        class="w-12 h-12 rounded-xl object-contain bg-white border border-[#1E7A6F]/30 p-1"
                      />
                      <span class="text-[#2B3445] font-bold text-sm">
                        {{ q.imageOptions?.[q.correctOptionIndex]?.label }}
                      </span>
                    </div>

                    <!-- Matching Correct -->
                    <div v-else-if="q.type === 'matching'" class="space-y-1">
                      <div v-for="(p, pIdx) in (q.pairs || [])" :key="pIdx" class="flex items-center gap-1.5 text-[#2B3445]">
                        <span class="font-semibold">{{ p.left }}</span>
                        <span>👉</span>
                        <span class="font-bold text-[#1E7A6F]">{{ p.right }}</span>
                      </div>
                    </div>

                    <!-- Ordering Correct -->
                    <div v-else-if="q.type === 'ordering'" class="space-y-1">
                      <div class="flex flex-wrap gap-1.5 items-center">
                        <span
                          v-for="(item, oIdx) in (q.correctOrder || [])"
                          :key="oIdx"
                          class="px-2 py-0.5 rounded-md bg-white border border-[#1E7A6F]/40 font-bold text-[#1E7A6F]"
                        >
                          {{ oIdx + 1 }}. {{ item }}
                        </span>
                      </div>
                    </div>

                    <!-- True False Correct -->
                    <span v-else-if="q.type === 'true_false'" class="text-[#2B3445] font-bold text-sm">
                      {{ q.correctOptionIndex === 0 ? 'Benar (B)' : 'Salah (S)' }}
                    </span>

                    <!-- Fill in the blank Correct -->
                    <span v-else-if="q.type === 'fill_in_blank'" class="text-[#1E7A6F] font-bold font-['Baloo_2'] text-base">
                      {{ q.expectedAnswers?.[0] || q.options?.[q.correctOptionIndex] }}
                    </span>

                    <!-- Multi Select Correct -->
                    <div v-else-if="q.type === 'multi_select'" class="flex flex-wrap gap-1.5 items-center">
                      <span
                        v-for="cIdx in (q.multiCorrectIndices || [])"
                        :key="cIdx"
                        class="px-2.5 py-0.5 rounded-lg bg-white border border-[#1E7A6F]/40 font-bold text-[#1E7A6F]"
                      >
                        {{ q.options[cIdx] }}
                      </span>
                    </div>

                    <!-- Grid Map Correct -->
                    <span v-else-if="q.type === 'grid_map'" class="text-[#1E7A6F] font-bold text-sm">
                      Petak {{ q.correctCell || 'E5' }}
                    </span>

                    <!-- Multiple Choice Correct -->
                    <span v-else class="text-[#2B3445] font-bold text-sm">
                      {{ String.fromCharCode(65 + q.correctOptionIndex) }}. {{ q.options[q.correctOptionIndex] }}
                    </span>
                  </div>
                </div>

                <p v-if="q.explanation" class="text-xs text-[#2B3445] font-normal bg-[#FFF8F0] p-3.5 rounded-xl border border-[#8F8575]/20 leading-relaxed">
                  <strong class="text-[#1E7A6F]">💡 Petunjuk Belajar:</strong> {{ q.explanation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bottom Actions after Quiz -->
          <div class="pt-6 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              @click="resetQuiz"
              class="btn-prisma-white w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw class="w-4 h-4 text-[#1E7A6F]" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              @click="activeTab = 'video'; playButtonPop()"
              class="btn-prisma-white w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video class="w-4 h-4 text-[#1E7A6F]" />
              <span>Tonton Ulang Video</span>
            </button>

            <button
              @click="emit('finish')"
              class="btn-prisma-mint w-full sm:w-auto px-7 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <CheckCircle2 class="w-4 h-4 text-[#1E7A6F]" />
              <span>Selesai & Keluar</span>
            </button>
          </div>

        </div>

        <!-- Empty Questions Case -->
        <div v-else class="py-12 text-center space-y-3">
          <HelpCircle class="w-12 h-12 text-[#94C6FF] mx-auto" />
          <h4 class="font-['Baloo_2'] text-lg font-bold text-[#2B3445]">Belum Ada Soal Kuis</h4>
          <p class="text-xs text-[#5B6474]">Admin belum menambahkan soal pilihan ganda untuk materi ini.</p>
        </div>

      </div>
    </div>

      </main>
    </div>

  </div>
</template>

<style scoped>
@keyframes drawCircle {
  0% {
    stroke-dashoffset: 400;
    opacity: 0.3;
    transform: scale(0.96) rotate(-4deg);
  }
  60% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
    transform: scale(1) rotate(-1deg);
  }
}

.animate-draw-circle {
  stroke-dasharray: 400;
  animation: drawCircle 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  transform-origin: center;
}
</style>
