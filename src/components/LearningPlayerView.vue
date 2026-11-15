<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Video,
  Trophy,
  Clock,
  Award,
  ChevronRight,
  Star,
  Check,
  HelpCircle,
  Layers,
  Film,
  Volume2,
  VolumeX,
  Headphones,
  Mic,
  Music
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

// 3 Main Tabs: 'materi' | 'video' | 'quiz'
const activeTab = ref('materi')

// ==================== TAB 1: MATERI (TEKS & GAMBAR) ====================
const materiContent = computed(() => {
  if (props.materi?.materiContent) return props.materi.materiContent
  return {
    text: props.materi?.description || 'Materi pembelajaran interaktif SD.',
    image: props.materi?.image || '/es_batu_card.jpg',
    points: props.materi?.learningPoints || []
  }
})

// Paragraf teks materi yang bersih
const textParagraphs = computed(() => {
  const raw = materiContent.value?.text || props.materi?.description || ''
  return raw.split('\n\n').filter(p => p.trim() !== '')
})

// ==================== AUDIO / SUARA NARASI MATERI ====================
const audioPlayerRef = ref(null)
const isAudioPlaying = ref(false)
const audioCurrentTime = ref(0)
const audioDuration = ref(0)
const isSpeechActive = ref(false)

const hasCustomAudio = computed(() => {
  return Boolean(materiContent.value?.audioUrl && materiContent.value.audioUrl.trim() !== '')
})

const audioProgressPercent = computed(() => {
  if (!audioDuration.value) return 0
  return Math.min(100, Math.round((audioCurrentTime.value / audioDuration.value) * 100))
})

const formatAudioTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const onAudioTimeUpdate = () => {
  if (audioPlayerRef.value) {
    audioCurrentTime.value = audioPlayerRef.value.currentTime
  }
}

const onAudioLoadedMetadata = () => {
  if (audioPlayerRef.value) {
    audioDuration.value = audioPlayerRef.value.duration
  }
}

const onAudioEnded = () => {
  isAudioPlaying.value = false
  audioCurrentTime.value = 0
}

const stopAllAudio = () => {
  if (audioPlayerRef.value) {
    try { audioPlayerRef.value.pause() } catch (_) {}
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel() } catch (_) {}
  }
  isAudioPlaying.value = false
  isSpeechActive.value = false
}

const togglePlayAudio = () => {
  playButtonPop()
  if (hasCustomAudio.value) {
    if (!audioPlayerRef.value) return
    if (isAudioPlaying.value) {
      audioPlayerRef.value.pause()
      isAudioPlaying.value = false
    } else {
      stopAllAudio()
      audioPlayerRef.value.play().then(() => {
        isAudioPlaying.value = true
      }).catch(err => {
        console.warn('Audio play failed:', err)
      })
    }
  } else {
    // Fallback TTS cerdas dengan Web Speech API
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Perangkat Anda belum mendukung fitur pembacaan suara otomatis.')
      return
    }
    if (isAudioPlaying.value || isSpeechActive.value) {
      stopAllAudio()
    } else {
      stopAllAudio()
      const textToRead = `${props.materi?.title || ''}. ${materiContent.value?.text || props.materi?.description || ''}`
      const utterance = new SpeechSynthesisUtterance(textToRead)
      utterance.lang = 'id-ID'
      utterance.rate = 0.95
      utterance.pitch = 1.05
      utterance.onstart = () => {
        isAudioPlaying.value = true
        isSpeechActive.value = true
      }
      utterance.onend = () => {
        isAudioPlaying.value = false
        isSpeechActive.value = false
      }
      utterance.onerror = () => {
        isAudioPlaying.value = false
        isSpeechActive.value = false
      }
      window.speechSynthesis.speak(utterance)
    }
  }
}

const restartAudio = () => {
  playButtonPop()
  if (hasCustomAudio.value && audioPlayerRef.value) {
    audioPlayerRef.value.currentTime = 0
    audioPlayerRef.value.play()
    isAudioPlaying.value = true
  } else {
    togglePlayAudio()
  }
}

// Hentikan suara jika berpindah tab atau berganti materi
watch(activeTab, () => {
  stopAllAudio()
})
watch(() => props.materi?.id, () => {
  stopAllAudio()
  audioCurrentTime.value = 0
  audioDuration.value = 0
})

// ==================== TAB 2: VIDEO (2 VIDEO) ====================
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

// ==================== TAB 3: QUIZ (PILIHAN GANDA & GAMBAR SOAL) ====================
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

const nextQuestion = () => {
  playButtonPop()
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  playButtonPop()
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// Perhitungan Hasil Kuis
const quizScore = computed(() => {
  let score = 0
  questions.value.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.correctOptionIndex) {
      score += Number(q.points) || 25
    }
  })
  return score
})

const correctCount = computed(() => {
  let count = 0
  questions.value.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.correctOptionIndex) {
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
  isQuizSubmitted.value = false
}

// Reset tab & state saat materi berganti
watch(() => props.materi?.id, () => {
  activeTab.value = 'materi'
  selectedVideoIndex.value = 1
  resetQuiz()
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

onBeforeUnmount(() => {
  stopAllAudio()
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
        
        <!-- CARD MENU BELAJAR (3 TAB) -->
        <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-3.5 sm:p-4 shadow-xs space-y-3">
          <div class="px-3 pt-1 pb-1 flex items-center justify-between">
            <span class="text-xs font-semibold text-[#5B6474] uppercase tracking-wider flex items-center gap-1.5">
              <Layers class="w-3.5 h-3.5 text-[#1E7A6F]" />
              <span>Menu Belajar</span>
            </span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#7FD4C4]/25 text-[#1E7A6F]">
              3 Langkah
            </span>
          </div>

          <nav class="space-y-2">
            <!-- TAB 1: MATERI -->
            <button
              @click="activeTab = 'materi'; playButtonPop()"
              :class="[
                'w-full text-left p-3.5 rounded-2xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]',
                activeTab === 'materi'
                  ? 'bg-[#1E7A6F] text-white shadow-md ring-2 ring-[#1E7A6F]'
                  : 'bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#2B3445] border border-[#8F8575]/25'
              ]"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div
                  :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition',
                    activeTab === 'materi' ? 'bg-white/20 text-[#FFDE7A]' : 'bg-[#7FD4C4]/30 text-[#1E7A6F]'
                  ]"
                >
                  <BookOpen class="w-5 h-5" />
                </div>
                <div class="min-w-0">
                  <h4 class="text-sm font-bold font-['Baloo_2'] truncate leading-tight">1. Materi</h4>
                  <p :class="['text-xs truncate font-normal', activeTab === 'materi' ? 'text-white/85' : 'text-[#5B6474]']">
                    Teks, Gambar & Suara
                  </p>
                </div>
              </div>
              <span
                v-if="activeTab === 'materi'"
                class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white shrink-0"
              >
                Dibuka
              </span>
            </button>

            <!-- TAB 2: VIDEO -->
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
                  <h4 class="text-sm font-bold font-['Baloo_2'] truncate leading-tight">2. Video</h4>
                  <p :class="['text-xs truncate font-normal', activeTab === 'video' ? 'text-white/85' : 'text-[#5B6474]']">
                    2 Video Edukasi
                  </p>
                </div>
              </div>
              <span
                :class="[
                  'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0',
                  activeTab === 'video' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#2B3445]'
                ]"
              >
                2 Video
              </span>
            </button>

            <!-- TAB 3: QUIZ -->
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
                  <Sparkles class="w-5 h-5 text-[#2B3445]" />
                </div>
                <div class="min-w-0">
                  <h4 class="text-sm font-bold font-['Baloo_2'] truncate leading-tight">3. Quiz</h4>
                  <p :class="['text-xs truncate font-normal', activeTab === 'quiz' ? 'text-white/85' : 'text-[#5B6474]']">
                    Asesmen Pilihan Ganda
                  </p>
                </div>
              </div>
              <span
                :class="[
                  'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0',
                  activeTab === 'quiz' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#2B3445]'
                ]"
              >
                {{ questions.length }} Soal
              </span>
            </button>
          </nav>
        </div>

        <!-- CARD INFO TAMBAHAN SIDEBAR (POIN MATERI) -->
        <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-5 shadow-xs space-y-3.5 text-left hidden sm:block">
          <div class="flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
            <h4 class="text-xs font-bold font-['Baloo_2'] text-[#2B3445] uppercase tracking-wider">
              Apa yang akan kamu pelajari?
            </h4>
          </div>

          <div class="space-y-2">
            <div
              v-for="(point, idx) in (materiContent.points?.length ? materiContent.points : materi.learningPoints)"
              :key="point.id || idx"
              class="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 text-xs font-medium text-[#2B3445]"
            >
              <span class="w-5 h-5 rounded-full bg-[#7FD4C4] text-[#2B3445] text-[10px] font-bold flex items-center justify-center shrink-0">
                {{ idx + 1 }}
              </span>
              <span class="truncate">{{ typeof point === 'string' ? point : point.title }}</span>
            </div>
          </div>
        </div>

      </aside>

      <!-- ==================== MAIN CONTENT AREA KANAN ==================== -->
      <main class="lg:col-span-8 xl:col-span-9 min-w-0 space-y-6">

    <!-- ==================== TAB 1 CONTENT: MATERI (TEKS & GAMBAR) ==================== -->
    <div v-if="activeTab === 'materi'" class="space-y-6 animate-soft-pop">
      <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
        
        <!-- Hero Header Materi -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#8F8575]/20 pb-8">
          <div class="lg:col-span-7 space-y-3.5 text-left">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#7FD4C4]/25 text-[#1E7A6F] border border-[#7FD4C4]">
              <BookOpen class="w-3.5 h-3.5" /> Modul Bacaan Interaktif
            </span>
            <h2 class="text-2xl sm:text-4xl font-bold font-['Baloo_2'] text-[#2B3445] tracking-tight leading-tight">
              {{ materi.title }}
            </h2>
            <p class="text-base text-[#5B6474] font-normal leading-relaxed">
              {{ materi.description }}
            </p>
          </div>

          <div class="lg:col-span-5 flex justify-center">
            <div class="w-full max-w-sm aspect-video sm:aspect-4/3 rounded-3xl overflow-hidden shadow-xs border-2 border-[#8F8575]/20 bg-[#FFF8F0] relative group">
              <img
                :src="materiContent.image || materi.image || '/es_batu_card.jpg'"
                :alt="materi.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute bottom-3 left-3 right-3 bg-[#2B3445]/85 backdrop-blur-xs rounded-xl p-2 text-white text-[11px] font-semibold text-center">
                Ilustrasi Pembelajaran Prisma
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== SUARA / AUDIO MATERI INTERAKTIF ==================== -->
        <div class="p-4 sm:p-6 rounded-3xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs transition">
          <!-- Audio tag native jika materi memiliki file audio rekaman -->
          <audio
            v-if="hasCustomAudio"
            ref="audioPlayerRef"
            :src="materiContent.audioUrl"
            @timeupdate="onAudioTimeUpdate"
            @loadedmetadata="onAudioLoadedMetadata"
            @ended="onAudioEnded"
            class="hidden"
          ></audio>

          <div class="flex items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <!-- Tombol Play / Pause Utama (Mint #7FD4C4) -->
            <button
              @click="togglePlayAudio"
              :class="[
                'w-13 h-13 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-[#2B3445] shadow-sm transition-all duration-300 active:scale-90 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]',
                isAudioPlaying
                  ? 'bg-[#FFDE7A] ring-4 ring-[#FFDE7A]/50 animate-pulse'
                  : 'bg-[#7FD4C4] hover:bg-[#70cbba] ring-4 ring-[#7FD4C4]/30'
              ]"
              :title="isAudioPlaying ? 'Jeda Suara' : 'Dengarkan Penjelasan Suara'"
            >
              <Pause v-if="isAudioPlaying" class="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
              <Play v-else class="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 sm:ml-1" />
            </button>

            <!-- Informasi Narasi Suara -->
            <div class="text-left space-y-1 flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm sm:text-base font-bold font-['Baloo_2'] text-[#2B3445]">
                  {{ isAudioPlaying ? 'Sedang Memutar Suara Materi...' : 'Dengarkan Penjelasan Suara' }}
                </span>
                <span
                  :class="[
                    'text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 text-[#2B3445]',
                    hasCustomAudio ? 'bg-[#7FD4C4]' : 'bg-[#94C6FF]'
                  ]"
                >
                  <Headphones class="w-3 h-3 text-[#1E7A6F]" />
                  {{ hasCustomAudio ? 'Audio Rekaman' : 'Suara Otomatis' }}
                </span>
              </div>
              <p class="text-xs text-[#5B6474]">
                {{ hasCustomAudio ? 'Dengarkan rekaman audio narasi pembelajaran ini' : 'Klik tombol putar agar Prisma membacakan seluruh isi materi ini untukmu' }}
              </p>

              <!-- Progress bar untuk file custom audio -->
              <div v-if="hasCustomAudio && audioDuration > 0" class="flex items-center gap-3 pt-1.5 max-w-sm">
                <div class="flex-1 h-2 bg-[#8F8575]/20 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#1E7A6F] rounded-full transition-all duration-200"
                    :style="{ width: `${audioProgressPercent}%` }"
                  ></div>
                </div>
                <span class="text-[11px] font-mono font-medium text-[#5B6474] shrink-0">
                  {{ formatAudioTime(audioCurrentTime) }} / {{ formatAudioTime(audioDuration) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bagian Kanan: Gelombang Suara (Waveform) & Tombol Ulangi -->
          <div class="flex items-center gap-2.5 self-end sm:self-center shrink-0">
            <!-- Animasi Sound Wave dinamis saat suara aktif -->
            <div v-if="isAudioPlaying" class="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-[#8F8575]/20 shadow-xs">
              <span class="w-1.5 h-3.5 bg-[#1E7A6F] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span class="w-1.5 h-6 bg-[#7FD4C4] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span class="w-1.5 h-3 bg-[#FFDE7A] rounded-full animate-bounce [animation-delay:-0.45s]"></span>
              <span class="w-1.5 h-5 bg-[#94C6FF] rounded-full animate-bounce"></span>
            </div>

            <!-- Tombol Ulangi dari Awal -->
            <button
              v-if="isAudioPlaying || audioCurrentTime > 0"
              @click="restartAudio"
              class="btn-prisma-white px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Putar Ulang dari Awal"
            >
              <RotateCcw class="w-3.5 h-3.5 text-[#1E7A6F]" />
              <span>Ulangi</span>
            </button>
          </div>
        </div>

        <!-- Teks Narasi Materi Utama -->
        <div class="space-y-4 text-left">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center font-bold">
              📖
            </div>
            <h3 class="text-xl sm:text-2xl font-bold font-['Baloo_2'] text-[#2B3445]">
              Uraian & Penjelasan Materi
            </h3>
          </div>

          <!-- Bacaan Format: Lexend (18px / 31px), warna Tinta #2B3445 -->
          <div class="space-y-4 text-[#2B3445] text-lg sm:text-[18px] leading-[31px] bg-[#FFF8F0] p-6 sm:p-8 rounded-3xl border border-[#8F8575]/20">
            <p v-for="(p, idx) in textParagraphs" :key="idx" class="first-letter:text-2xl first-letter:font-bold first-letter:text-[#1E7A6F]">
              {{ p }}
            </p>
          </div>
        </div>

        <!-- Poin-Poin Penting Belajar -->
        <div v-if="materiContent.points?.length || materi.learningPoints?.length" class="space-y-4 text-left pt-2">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#94C6FF]/30 text-[#1E7A6F] flex items-center justify-center font-bold">
              💡
            </div>
            <h3 class="text-xl sm:text-2xl font-bold font-['Baloo_2'] text-[#2B3445]">
              Poin Penting yang Perlu Diingat
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="(point, idx) in (materiContent.points?.length ? materiContent.points : materi.learningPoints)"
              :key="point.id || idx"
              class="p-5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/20 hover:border-[#1E7A6F] transition space-y-2"
            >
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-xl bg-[#7FD4C4] text-[#2B3445] text-xs font-bold flex items-center justify-center shrink-0">
                  {{ idx + 1 }}
                </span>
                <h4 class="font-bold text-sm font-['Baloo_2'] text-[#2B3445]">
                  {{ typeof point === 'string' ? point : point.title }}
                </h4>
              </div>
              <p v-if="point.desc" class="text-xs text-[#5B6474] font-normal leading-relaxed pl-9">
                {{ point.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Action: Lanjut ke Video -->
        <div class="pt-6 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-[#5B6474]">
            Sudah selesai membaca materi? Lanjutkan menonton video penjelasannya!
          </span>
          <button
            @click="activeTab = 'video'; playButtonPop()"
            class="btn-prisma-mint px-6 py-3.5 text-sm font-semibold flex items-center gap-2 cursor-pointer transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]"
          >
            <span>Tonton Video Pembelajaran</span>
            <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== TAB 2 CONTENT: VIDEO (2 VIDEO) ==================== -->
    <div v-if="activeTab === 'video'" class="space-y-6 animate-soft-pop">
      <div class="card-prisma p-5 sm:p-7 lg:p-8 space-y-6">
        
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
          <button
            v-if="selectedVideoIndex === 1"
            @click="switchVideo(2)"
            class="btn-prisma-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <span>Tonton Video 2 Selanjutnya</span>
            <ChevronRight class="w-4 h-4 text-[#1E7A6F]" />
          </button>
          <div v-else></div>

          <button
            @click="activeTab = 'quiz'; playButtonPop()"
            class="btn-prisma-mint px-6 py-3 text-sm font-semibold flex items-center gap-2 cursor-pointer transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F]"
          >
            <span>Uji Pemahaman di Tab Quiz</span>
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== TAB 3 CONTENT: QUIZ (PILIHAN GANDA & GAMBAR SOAL) ==================== -->
    <div v-if="activeTab === 'quiz'" class="space-y-6 animate-soft-pop">
      <div class="card-prisma p-6 sm:p-8 lg:p-10 space-y-6">
        
        <!-- Header Quiz -->
        <div class="flex items-center justify-between border-b border-[#8F8575]/20 pb-5">
          <div class="text-left">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFDE7A]/40 text-[#2B3445] border border-[#8F8575]/25">
              <Sparkles class="w-3.5 h-3.5 text-[#1E7A6F]" /> Kuis Pilihan Ganda
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
          <div class="bg-[#FFF8F0] rounded-2xl p-6 sm:p-8 border border-[#8F8575]/25 space-y-6 text-left">
            
            <!-- Question Badge & Points -->
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1.5 rounded-xl bg-[#1E7A6F] text-white text-xs font-semibold">
                Pertanyaan {{ currentQuestionIndex + 1 }}
              </span>
              <span class="px-3 py-1 rounded-xl bg-[#FFDE7A]/50 text-[#2B3445] border border-[#8F8575]/30 text-xs font-semibold">
                +{{ currentQuestion.points || 25 }} Poin
              </span>
            </div>

            <!-- Question Text -->
            <h3 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#2B3445] leading-snug">
              {{ currentQuestion.questionText }}
            </h3>

            <!-- Question Image (Gambar Soal) -->
            <div v-if="currentQuestion.image" class="w-full flex justify-center py-2">
              <div class="max-w-md w-full aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-[#8F8575]/25 bg-white relative">
                <img
                  :src="currentQuestion.image"
                  :alt="currentQuestion.questionText"
                  class="w-full h-full object-contain p-2"
                />
              </div>
            </div>

            <!-- Multiple Choice Options (A, B, C, D) -->
            <div class="grid grid-cols-1 gap-3 pt-2">
              <button
                v-for="(opt, optIdx) in currentQuestion.options"
                :key="optIdx"
                @click="selectAnswer(optIdx)"
                :class="[
                  'w-full p-4 sm:p-5 rounded-2xl font-medium text-sm sm:text-base flex items-center gap-4 transition-all duration-150 cursor-pointer text-left border',
                  selectedAnswers[currentQuestionIndex] === optIdx
                    ? 'bg-white border-2 border-[#1E7A6F] text-[#2B3445] shadow-sm'
                    : 'bg-white border-[#8F8575]/30 hover:border-[#1E7A6F] text-[#2B3445]'
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
                    : selectedAnswers[qIdx] !== undefined
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
              :disabled="selectedAnswers[currentQuestionIndex] === undefined"
              :class="[
                'px-7 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2 transition cursor-pointer shadow-sm',
                selectedAnswers[currentQuestionIndex] !== undefined
                  ? 'btn-prisma-mint'
                  : 'bg-white border border-[#8F8575]/25 text-[#5B6474] cursor-not-allowed'
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
                :class="selectedAnswers[idx] === q.correctOptionIndex ? 'border-[#7FD4C4]' : 'border-[#FFDE7A]'"
              >
                <div class="flex items-center justify-between">
                  <!-- Umpan Balik: Benar = Mint, Belum Tepat = Kuning Ramah Anak -->
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-lg border"
                    :class="selectedAnswers[idx] === q.correctOptionIndex
                      ? 'bg-[#7FD4C4]/20 border-[#7FD4C4] text-[#2B3445]'
                      : 'bg-[#FFDE7A]/30 border-[#FFDE7A] text-[#2B3445]'"
                  >
                    Soal {{ idx + 1 }}: {{ selectedAnswers[idx] === q.correctOptionIndex ? '✓ Jawabanmu Tepat' : '💡 Coba Perhatikan Lagi' }}
                  </span>
                  <span class="text-xs font-semibold text-[#5B6474]">
                    {{ selectedAnswers[idx] === q.correctOptionIndex ? `+${q.points || 25} Poin` : '0 Poin' }}
                  </span>
                </div>

                <p class="font-semibold text-[#2B3445] text-base">
                  {{ q.questionText }}
                </p>

                <!-- Gambar Soal di Pembahasan -->
                <div v-if="q.image" class="w-full flex justify-start py-1">
                  <img :src="q.image" alt="Gambar Soal" class="max-h-48 rounded-xl border border-[#8F8575]/25 object-contain" />
                </div>

                <!-- Detail Pilihan Jawaban -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-2">
                  <div
                    class="p-3 rounded-xl border"
                    :class="selectedAnswers[idx] === q.correctOptionIndex
                      ? 'bg-[#7FD4C4]/15 border-[#7FD4C4]'
                      : 'bg-[#FFDE7A]/20 border-[#FFDE7A]'"
                  >
                    <span class="text-[#5B6474] block mb-0.5">Jawabanmu:</span>
                    <span class="text-[#2B3445] font-semibold">
                      {{ selectedAnswers[idx] !== undefined ? `${String.fromCharCode(65 + selectedAnswers[idx])}. ${q.options[selectedAnswers[idx]]}` : 'Tidak dijawab' }}
                    </span>
                  </div>

                  <div class="p-3 rounded-xl bg-[#7FD4C4]/20 border border-[#7FD4C4]">
                    <span class="text-[#1E7A6F] block mb-0.5">Kunci Jawaban Tepat:</span>
                    <span class="text-[#2B3445] font-semibold">
                      {{ String.fromCharCode(65 + q.correctOptionIndex) }}. {{ q.options[q.correctOptionIndex] }}
                    </span>
                  </div>
                </div>

                <p v-if="q.explanation" class="text-xs text-[#2B3445] font-normal bg-[#FFF8F0] p-3 rounded-xl border border-[#8F8575]/20">
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
              @click="activeTab = 'materi'; playButtonPop()"
              class="btn-prisma-white w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen class="w-4 h-4 text-[#1E7A6F]" />
              <span>Baca Ulang Materi</span>
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
