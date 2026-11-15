<script setup>
import { ref, computed, watch } from 'vue'
import {
  materiList, addMateri, updateMateri, deleteMateri, resetMateri, isLoadingMateri, RELIABLE_MODE_VIDEOS, sanitizeVideoUrl, forceSyncToSupabase,
  KELAS_SD_OPTIONS, getKelasFromLevel, isYouTubeUrl, getYouTubeEmbedUrl
} from '../lib/materiService'
import { currentUser, isAdmin, logoutUser } from '../lib/authService'
import { uploadVideo, uploadImage, uploadAudio, isCloudinaryConfigured } from '../lib/cloudinary'
import { playMascotChime } from '../lib/soundEffects'
import {
  LayoutDashboard, BookOpen, Video, Settings, LogOut, Plus, Trash2, Edit3, Eye,
  X, Sun, CheckCircle2, UploadCloud, ShieldAlert, Search, Bell, ChevronRight,
  FileVideo, CloudUpload, RefreshCw, Sparkles, TrendingUp, Users, Clock,
  ArrowUpRight, MoreVertical, Filter, Download, AlertCircle, Menu, ChevronDown,
  ArrowLeft, Save, ImagePlus, ListVideo, Tag, AlignLeft, Layers, HelpCircle,
  Percent, DollarSign, RotateCcw, CreditCard, PlayCircle, Target, Film, FileText,
  Volume2, VolumeX, Mic, Music, Play, Pause
} from '@lucide/vue'

const emit = defineEmits(['previewMateri', 'backToApp', 'openAuth'])

// Sidebar nav state
const activePage = ref('dashboard') // 'dashboard' | 'materi' | 'video' | 'settings'
const sidebarCollapsed = ref(false)

// Modal state
const showForm = ref(false)
const isEditing = ref(false)
const activeFormTab = ref('materi') // 'materi' | 'video' | 'quiz'

// Search/filter in table
const tableSearch = ref('')
const selectedKelasFilter = ref('Semua')

// Upload state
const isUploadingVideo = ref(false)
const uploadProgress = ref(0)
const uploadTargetKey = ref(null)
const dragOverKey = ref(null)

const isUploadingImage = ref(false)
const imageUploadProgress = ref(0)

const isUploadingAudio = ref(false)
const audioUploadProgress = ref(0)

const isUploadingQuizImage = ref({})

// Konfigurasi Pilihan Kelas SD (Kelas 1 sampai 6)
const levelOptions = KELAS_SD_OPTIONS.map(k => ({ value: k, label: k }))

const normalizeLevelForForm = (rawLevel) => {
  return getKelasFromLevel(rawLevel)
}

// Form data
const currentForm = ref(getEmptyForm())

function getEmptyForm() {
  return {
    id: '',
    title: '',
    jenjang: 'SD',
    mataPelajaran: 'IPAS',
    level: 'Kelas 4',
    description: 'Yuk ikuti perjalanan seru dan temukan keajaiban ilmu pengetahuan!',
    badge: 'Gratis',
    duration: '± 5 menit',
    image: '/es_batu_card.jpg',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    // 1. Tab Materi (Teks, Gambar, dan Suara Audio)
    materiContent: {
      text: 'Tuliskan teks bacaan materi lengkap di sini agar siswa dapat membaca penjelasan materi secara mendalam...',
      image: '/es_batu_card.jpg',
      audioUrl: '',
      points: [
        { id: 'lp-1', title: 'Konsep Dasar', desc: 'Penjelasan konsep utama materi.' },
        { id: 'lp-2', title: 'Penerapan Nyata', desc: 'Contoh penerapan dalam kehidupan sehari-hari.' }
      ]
    },
    // 2. Tab Video (2 Video)
    videos: {
      video1: {
        title: 'Video 1: Pengenalan Konsep Materi',
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: 'Video 2: Praktik & Eksperimen Seru',
        url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
      }
    },
    // 3. Tab Quiz (Pilihan ganda dengan dukungan gambar soal)
    quiz: {
      title: 'Kuis Pemahaman Materi',
      questions: [
        {
          id: 'q-1',
          questionText: 'Apa pemahaman utama yang kamu pelajari dari materi ini?',
          image: '',
          points: 50,
          options: ['Memahami Konsep Dasar', 'Mengabaikan Pelajaran', 'Tidak Tahu', 'Bukan Salah Satunya'],
          correctOptionIndex: 0,
          explanation: 'Materi ini dirancang untuk memahami konsep utama dengan mudah.'
        },
        {
          id: 'q-2',
          questionText: 'Mengapa materi ini penting untuk dipelajari?',
          image: '',
          points: 50,
          options: ['Membantu kita memahami fenomena di sekitar', 'Hanya untuk tugas', 'Tidak ada manfaatnya', 'Agar cepat tidur'],
          correctOptionIndex: 0,
          explanation: 'Ilmu pengetahuan membantu kita memahami lingkungan dan alam sekitar.'
        }
      ]
    },
    learningPoints: [
      { id: 'lp-1', title: 'Konsep Dasar' },
      { id: 'lp-2', title: 'Penerapan Nyata' }
    ],
    standardContent: {
      title: 'Video 1: Pengenalan Konsep',
      text: '',
      videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
    },
    slowContent: {
      title: 'Video 2: Praktik & Eksperimen Seru',
      text: '',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
    },
    assessment: {
      title: 'Kuis Pemahaman Materi',
      questions: []
    }
  }
}

const openAddForm = () => {
  isEditing.value = false
  currentForm.value = getEmptyForm()
  activeFormTab.value = 'materi'
  showForm.value = true
  activePage.value = 'materi'
}

const openEditForm = (item) => {
  isEditing.value = true
  const copy = JSON.parse(JSON.stringify(item))

  // Inisialisasi Tab 1: materiContent jika belum ada
  if (!copy.materiContent) {
    copy.materiContent = {
      text: copy.standardContent?.text || copy.description || '',
      image: copy.image || '/es_batu_card.jpg',
      audioUrl: copy.audioUrl || '',
      points: (copy.learningPoints || []).map((lp, idx) => ({
        id: lp.id || `p-${idx + 1}`,
        title: typeof lp === 'string' ? lp : lp.title || `Poin ${idx + 1}`,
        desc: lp.desc || ''
      }))
    }
  } else {
    if (copy.materiContent.audioUrl === undefined) {
      copy.materiContent.audioUrl = copy.audioUrl || ''
    }
  }
  if (!copy.materiContent.points) copy.materiContent.points = []

  // Inisialisasi Tab 2: videos (2 Video) jika belum ada
  if (!copy.videos) {
    copy.videos = {
      video1: {
        title: copy.standardContent?.title || 'Video 1: Pengenalan Konsep',
        url: copy.standardContent?.videoUrl || copy.videoUrl || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: copy.slowContent?.title || 'Video 2: Praktik & Eksperimen',
        url: copy.slowContent?.videoUrl || 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
      }
    }
  } else {
    if (!copy.videos.video1) copy.videos.video1 = { title: 'Video 1', url: '' }
    if (!copy.videos.video2) copy.videos.video2 = { title: 'Video 2', url: '' }
  }

  // Inisialisasi Tab 3: quiz jika belum ada
  if (!copy.quiz) {
    const rawQs = copy.assessment?.questions || []
    copy.quiz = {
      title: copy.assessment?.title || 'Kuis Pemahaman Materi',
      questions: rawQs.map((q, idx) => ({
        id: q.id || `q-${idx + 1}`,
        questionText: q.questionText || '',
        image: q.image || '',
        points: Number(q.points) || 25,
        options: Array.isArray(q.options) && q.options.length ? q.options : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
        correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
        explanation: q.explanation || ''
      }))
    }
  } else if (copy.quiz.questions) {
    copy.quiz.questions.forEach((q, idx) => {
      if (!q.options || !Array.isArray(q.options)) q.options = ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D']
      if (!q.image) q.image = ''
      if (!q.points || isNaN(q.points)) q.points = 25
      if (typeof q.correctOptionIndex !== 'number') q.correctOptionIndex = 0
    })
  }

  copy.jenjang = 'SD'
  copy.level = normalizeLevelForForm(copy.level)

  currentForm.value = copy
  activeFormTab.value = 'materi'
  showForm.value = true
}

const addLearningPoint = () => {
  if (!currentForm.value.materiContent) {
    currentForm.value.materiContent = { points: [] }
  }
  if (!currentForm.value.materiContent.points) {
    currentForm.value.materiContent.points = []
  }
  currentForm.value.materiContent.points.push({
    id: `lp-${Date.now()}`,
    title: '',
    desc: ''
  })
}

const removeLearningPoint = (idx) => {
  if (currentForm.value.materiContent?.points) {
    currentForm.value.materiContent.points.splice(idx, 1)
  }
}

const addQuestion = () => {
  if (!currentForm.value.quiz) {
    currentForm.value.quiz = { title: 'Kuis Pemahaman Materi', questions: [] }
  }
  if (!currentForm.value.quiz.questions) {
    currentForm.value.quiz.questions = []
  }
  currentForm.value.quiz.questions.push({
    id: `q-${Date.now()}`,
    questionText: '',
    image: '',
    points: 25,
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: ''
  })
}

const removeQuestion = (idx) => {
  if (currentForm.value.quiz?.questions) {
    currentForm.value.quiz.questions.splice(idx, 1)
  }
}

const handleQuizImageUpload = async (file, qIdx) => {
  if (!file) return
  isUploadingQuizImage.value[qIdx] = true
  try {
    const res = await uploadImage(file, () => {}, `quiz_q${qIdx}_${Date.now()}`)
    if (res?.secure_url) {
      if (!currentForm.value.quiz) currentForm.value.quiz = { questions: [] }
      if (!currentForm.value.quiz.questions[qIdx]) return
      currentForm.value.quiz.questions[qIdx].image = res.secure_url
    }
  } catch (err) {
    alert(`Upload gambar soal gagal: ${err.message}`)
  } finally {
    isUploadingQuizImage.value[qIdx] = false
  }
}

const removeQuizImage = (qIdx) => {
  if (currentForm.value.quiz?.questions?.[qIdx]) {
    currentForm.value.quiz.questions[qIdx].image = ''
  }
}

const handleSave = async () => {
  if (!currentForm.value.title.trim()) {
    alert('Judul materi wajib diisi')
    return
  }
  if (isUploadingVideo.value || isUploadingImage.value || isUploadingAudio.value) {
    alert('Tunggu sebentar, upload media (video/gambar/audio) masih berjalan. Simpan setelah upload selesai (100%).')
    return
  }

  // Sinkronisasi data utama
  currentForm.value.image = currentForm.value.materiContent?.image || currentForm.value.image || '/es_batu_card.jpg'
  currentForm.value.audioUrl = currentForm.value.materiContent?.audioUrl || currentForm.value.audioUrl || ''
  currentForm.value.videoUrl = currentForm.value.videos?.video1?.url || ''
  currentForm.value.standardContent = {
    title: currentForm.value.videos?.video1?.title || currentForm.value.title,
    text: currentForm.value.materiContent?.text || currentForm.value.description,
    videoUrl: currentForm.value.videos?.video1?.url || ''
  }
  currentForm.value.slowContent = {
    title: currentForm.value.videos?.video2?.title || `${currentForm.value.title} (Video 2)`,
    text: currentForm.value.materiContent?.text || currentForm.value.description,
    videoUrl: currentForm.value.videos?.video2?.url || ''
  }
  currentForm.value.assessment = currentForm.value.quiz
  currentForm.value.learningPoints = (currentForm.value.materiContent?.points || []).map(p => ({
    id: p.id || `lp-${Date.now()}`,
    title: p.title || '',
    desc: p.desc || ''
  }))

  if (isEditing.value && currentForm.value.id) {
    await updateMateri(currentForm.value.id, currentForm.value)
  } else {
    await addMateri(currentForm.value)
  }
  showForm.value = false
}

const handleDelete = async (id, title) => {
  if (confirm(`Hapus materi "${title}"?\nData tidak dapat dikembalikan.`)) {
    await deleteMateri(id)
  }
}

const isSyncing = ref(false)
const syncModal = ref({
  isOpen: false,
  status: 'confirm', // 'confirm' | 'syncing' | 'success' | 'error'
  count: 0,
  errorMessage: ''
})

const openSyncModal = () => {
  syncModal.value = {
    isOpen: true,
    status: 'confirm',
    count: 0,
    errorMessage: ''
  }
}

const closeSyncModal = () => {
  if (syncModal.value.status === 'syncing') return
  syncModal.value.isOpen = false
}

const executeSync = async () => {
  syncModal.value.status = 'syncing'
  isSyncing.value = true
  try {
    const result = await forceSyncToSupabase()
    if (result.success) {
      syncModal.value.status = 'success'
      syncModal.value.count = result.count || materiList.value.length
      playMascotChime()
    } else {
      syncModal.value.status = 'error'
      syncModal.value.errorMessage = result.error || 'Gagal menyimpan pembaruan materi ke server.'
    }
  } catch (err) {
    syncModal.value.status = 'error'
    syncModal.value.errorMessage = err.message || 'Terjadi gangguan saat menghubungi server online.'
  } finally {
    isSyncing.value = false
  }
}

// Video upload handler for Video 1 & Video 2
const doUpload = async (file, videoKey) => {
  uploadTargetKey.value = videoKey
  uploadProgress.value = 0

  if (!isCloudinaryConfigured) {
    if (!currentForm.value.videos) currentForm.value.videos = {}
    if (!currentForm.value.videos[videoKey]) currentForm.value.videos[videoKey] = { title: '', url: '' }
    currentForm.value.videos[videoKey].url = videoKey === 'video1' ? RELIABLE_MODE_VIDEOS.standard : RELIABLE_MODE_VIDEOS.slow
    uploadTargetKey.value = null
    return
  }

  isUploadingVideo.value = true
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'video'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `prisma_${cleanSlug}_${videoKey}_${Date.now()}`
    const res = await uploadVideo(file, (pct) => { uploadProgress.value = pct }, customPublicId)
    if (!currentForm.value.videos) currentForm.value.videos = {}
    if (!currentForm.value.videos[videoKey]) currentForm.value.videos[videoKey] = { title: '', url: '' }
    currentForm.value.videos[videoKey].url = res.secure_url
  } catch (err) {
    alert(`Upload video gagal: ${err.message}. Anda juga bisa menempelkan link YouTube secara langsung.`)
  } finally {
    isUploadingVideo.value = false
    uploadTargetKey.value = null
    uploadProgress.value = 0
  }
}

const handleDrop = async (e, videoKey) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer?.files?.[0]
  if (file?.type.startsWith('video/')) await doUpload(file, videoKey)
}

const handleFileInput = async (e, videoKey) => {
  const file = e.target.files?.[0]
  if (file) await doUpload(file, videoKey)
}

// Image upload for thumbnail
const handleImageUpload = async (file) => {
  if (!file) return
  isUploadingImage.value = true
  imageUploadProgress.value = 0
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'thumb'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `thumb_${cleanSlug}_${Date.now()}`
    const res = await uploadImage(file, (pct) => { imageUploadProgress.value = pct }, customPublicId)
    currentForm.value.image = res.secure_url
  } catch (err) {
    alert(`Upload gambar gagal: ${err.message}`)
  } finally {
    isUploadingImage.value = false
    imageUploadProgress.value = 0
  }
}

const handleImageFileInput = async (e) => {
  const file = e.target.files?.[0]
  if (file) await handleImageUpload(file)
}

const handleImageDrop = async (e) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) await handleImageUpload(file)
}

// Audio upload for materi narration
const handleAudioUpload = async (file) => {
  if (!file) return
  isUploadingAudio.value = true
  audioUploadProgress.value = 0
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'audio'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `audio_${cleanSlug}_${Date.now()}`
    const res = await uploadAudio(file, (pct) => { audioUploadProgress.value = pct }, customPublicId)
    if (!currentForm.value.materiContent) {
      currentForm.value.materiContent = { audioUrl: '' }
    }
    currentForm.value.materiContent.audioUrl = res.secure_url
  } catch (err) {
    alert(`Upload audio gagal: ${err.message}`)
  } finally {
    isUploadingAudio.value = false
    audioUploadProgress.value = 0
  }
}

const handleAudioFileInput = async (e) => {
  const file = e.target.files?.[0]
  if (file) await handleAudioUpload(file)
}

const handleAudioDrop = async (e) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer?.files?.[0]
  if (file && (file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|aac)$/i.test(file.name))) {
    await handleAudioUpload(file)
  }
}

const removeAudio = () => {
  if (currentForm.value.materiContent) {
    currentForm.value.materiContent.audioUrl = ''
  }
}

// Computed stats
const totalPoinBelajar = computed(() => materiList.value.reduce((a, m) => a + (m.learningPoints?.length || 0), 0))
const totalVideos = computed(() => materiList.value.reduce((a, m) => {
  let count = 0
  if (m.standardContent?.videoUrl) count++
  if (m.slowContent?.videoUrl) count++
  if (m.highContrastContent?.videoUrl) count++
  if (m.focusContent?.videoUrl) count++
  return a + count
}, 0))

const availableTableKelasOptions = KELAS_SD_OPTIONS

// Filtered table
const filteredMateri = computed(() => {
  let list = materiList.value
  if (selectedKelasFilter.value !== 'Semua') {
    list = list.filter(m => normalizeLevelForForm(m.level) === selectedKelasFilter.value)
  }
  if (tableSearch.value.trim()) {
    const q = tableSearch.value.toLowerCase()
    list = list.filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.level?.toLowerCase().includes(q) ||
      m.mataPelajaran?.toLowerCase().includes(q)
    )
  }
  return list
})

// Nav items
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'materi', label: 'Konten Materi', icon: BookOpen },
  { key: 'video', label: 'Manajemen Video', icon: FileVideo },
  { key: 'settings', label: 'Pengaturan', icon: Settings },
]
</script>

<template>
  <!-- ====== ACCESS GUARD ====== -->
  <div v-if="!isAdmin" class="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF8F0] p-4 font-['Lexend']">
    <div class="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#8F8575]/30 shadow-xl text-center max-w-md w-full space-y-6">
      <div class="w-16 h-16 rounded-2xl bg-[#FFDE7A]/30 border-2 border-[#FFDE7A] flex items-center justify-center mx-auto text-[#1E7A6F]">
        <ShieldAlert class="w-8 h-8 text-[#1E7A6F]" />
      </div>
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Akses Khusus Admin</h2>
        <p class="text-sm text-[#2B3445]/70 mt-2 leading-relaxed">Halaman ini diperuntukkan bagi administrator untuk mengelola konten pembelajaran Prisma.</p>
      </div>
      <div class="flex flex-col gap-3">
        <button
          @click="emit('openAuth')"
          class="btn-prisma-mint w-full py-3.5 rounded-2xl font-bold text-sm text-[#FFF8F0] cursor-pointer shadow-md hover:brightness-105 active:scale-95 transition"
        >
          Masuk sebagai Admin
        </button>
        <button
          @click="emit('backToApp')"
          class="btn-prisma-white w-full py-3 rounded-2xl font-bold text-sm text-[#2B3445] border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] transition cursor-pointer"
        >
          Kembali ke Materi
        </button>
      </div>
    </div>
  </div>

  <!-- ====== FULL-SCREEN CMS LAYOUT ====== -->
  <template v-else>
    <div class="fixed inset-0 z-40 flex bg-[#FFF8F0] overflow-hidden font-['Lexend'] text-[#2B3445]">

      <!-- ==================== SIDEBAR ==================== -->
      <aside
        :class="[
          'flex flex-col shrink-0 transition-all duration-300 overflow-hidden bg-[#2B3445] border-r-2 border-[#8F8575]/25 z-20',
          sidebarCollapsed ? 'w-16' : 'w-60'
        ]"
      >
        <!-- Sidebar Header / Logo -->
        <div class="flex items-center gap-3 px-4 py-5 border-b border-white/10 shrink-0">
          <img src="/Logo.png" alt="Prisma" class="w-8 h-8 object-contain shrink-0" />
          <div v-if="!sidebarCollapsed" class="overflow-hidden">
            <p class="text-white font-bold font-['Baloo_2'] text-lg tracking-tight leading-none truncate">Prisma</p>
            <p class="text-[#7FD4C4] text-[10px] font-bold tracking-widest uppercase mt-0.5">Admin CMS</p>
          </div>
          <button
            @click="sidebarCollapsed = !sidebarCollapsed"
            class="ml-auto text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0"
            title="Toggle Menu"
          >
            <Menu class="w-4 h-4" />
          </button>
        </div>

        <!-- Nav Items -->
        <nav class="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <button
            v-for="item in navItems"
            :key="item.key"
            @click="activePage = item.key; showForm = false"
            :class="[
              'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition cursor-pointer text-left group',
              activePage === item.key
                ? 'bg-[#1E7A6F] text-white shadow-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/10 font-semibold'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 shrink-0" />
            <span v-if="!sidebarCollapsed" class="text-sm truncate">{{ item.label }}</span>
            <!-- Active indicator dot -->
            <div v-if="activePage === item.key" class="ml-auto w-2 h-2 rounded-full bg-[#7FD4C4] shrink-0"></div>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="px-3 py-4 border-t border-white/10 space-y-1.5 shrink-0">
          <!-- Back to App -->
          <button
            @click="emit('backToApp')"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-white/75 hover:text-white hover:bg-white/10 transition cursor-pointer font-semibold text-sm"
          >
            <ArrowLeft class="w-5 h-5 shrink-0" />
            <span v-if="!sidebarCollapsed" class="truncate">Tampilan Siswa</span>
          </button>
          <!-- Logout -->
          <button
            @click="logoutUser(); emit('backToApp')"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[#FFB899] hover:text-white hover:bg-[#FFB899]/20 transition cursor-pointer font-semibold text-sm"
          >
            <LogOut class="w-5 h-5 shrink-0" />
            <span v-if="!sidebarCollapsed" class="truncate">Keluar</span>
          </button>
        </div>
      </aside>

      <!-- ==================== MAIN CONTENT AREA ==================== -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FFF8F0]">

        <!-- Top Bar -->
        <header class="shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b-2 border-[#8F8575]/25 shadow-2xs">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm">
            <span class="text-[#8F8575] font-semibold">Admin CMS</span>
            <ChevronRight class="w-4 h-4 text-[#8F8575]/50" />
            <span class="font-bold font-['Baloo_2'] text-base text-[#1E7A6F]">
              {{ navItems.find(n => n.key === (showForm ? 'materi' : activePage))?.label }}
              <span v-if="showForm" class="text-[#2B3445]">
                / {{ isEditing ? 'Edit Materi' : 'Tambah Materi' }}
              </span>
            </span>
          </div>

          <!-- Right: Search + Notif + User -->
          <div class="flex items-center gap-3">
            <!-- Cloudinary badge -->
            <div :class="[
              'hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border-2',
              isCloudinaryConfigured
                ? 'bg-[#7FD4C4]/20 border-[#7FD4C4] text-[#1E7A6F]'
                : 'bg-[#FFDE7A]/30 border-[#FFDE7A] text-[#2B3445]'
            ]">
              <CloudUpload class="w-3.5 h-3.5" />
              {{ isCloudinaryConfigured ? 'Cloudinary Aktif' : 'Cloudinary Belum Diatur' }}
            </div>

            <!-- User chip -->
            <div class="flex items-center gap-2.5 pl-3 border-l-2 border-[#8F8575]/20">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ currentUser?.name }}</p>
                <p class="text-[10px] text-[#1E7A6F] font-bold mt-0.5">Administrator</p>
              </div>
              <div class="w-9 h-9 rounded-2xl bg-[#1E7A6F] text-[#FFF8F0] border-2 border-[#7FD4C4] flex items-center justify-center text-sm shadow-sm font-bold">
                {{ currentUser?.avatar || '👨‍💼' }}
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content (scrollable) -->
        <main class="flex-1 overflow-y-auto bg-[#FFF8F0]">

          <!-- ============ FORM EDITOR (fullscreen overlay on right panel) ============ -->
          <div v-if="showForm" class="h-full flex flex-col font-['Lexend']">
            <!-- Form Header -->
            <div class="bg-white border-b-2 border-[#8F8575]/25 px-6 py-4 flex items-center justify-between shrink-0 shadow-2xs">
              <div class="flex items-center gap-3">
                <button @click="showForm = false" class="p-2 rounded-2xl hover:bg-[#FFF8F0] border-2 border-[#8F8575]/20 text-[#2B3445] cursor-pointer transition">
                  <ArrowLeft class="w-5 h-5" />
                </button>
                <div>
                  <h2 class="text-xl font-bold font-['Baloo_2'] text-[#2B3445]">{{ isEditing ? 'Edit Materi' : 'Tambah Materi Baru' }}</h2>
                  <p class="text-xs text-[#2B3445]/60 font-medium">Isi semua informasi konten pembelajaran untuk siswa</p>
                </div>
              </div>
              <button
                @click="handleSave"
                class="btn-prisma-mint flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[#FFF8F0] text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition cursor-pointer"
              >
                <Save class="w-4 h-4" />
                Simpan Materi
              </button>
            </div>

            <!-- Form Body: Two column layout -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FFF8F0]">
              <div class="max-w-5xl mx-auto space-y-6">

                <!-- Tab Pills (3 Tabs: Materi + Video + Quiz) -->
                <div class="flex items-center gap-2.5 overflow-x-auto pb-1">
                  <button
                    v-for="(label, key) in {
                      materi: '1. Materi (Teks & Gambar)',
                      video: '2. Video (2 Video: YouTube / Upload)',
                      quiz: '3. Quiz (Pilihan Ganda & Gambar)'
                    }"
                    :key="key"
                    @click="activeFormTab = key"
                    :class="[
                      'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-2 shadow-2xs',
                      activeFormTab === key
                        ? 'bg-[#1E7A6F] text-[#FFF8F0] border-[#1E7A6F] shadow-sm'
                        : 'bg-white text-[#2B3445]/70 border-[#8F8575]/25 hover:border-[#1E7A6F]/50 hover:text-[#2B3445]'
                    ]"
                  >
                    <BookOpen v-if="key === 'materi'" class="w-4 h-4" />
                    <Video v-else-if="key === 'video'" class="w-4 h-4" />
                    <Sparkles v-else class="w-4 h-4" />
                    {{ label }}
                  </button>
                </div>

                <!-- ---- TAB 1: MATERI (TEKS & GAMBAR) ---- -->
                <div v-if="activeFormTab === 'materi'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <!-- Left column: main fields & text -->
                  <div class="lg:col-span-2 space-y-5">
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                        <AlignLeft class="w-4 h-4 text-[#1E7A6F]" /> Informasi & Uraian Materi
                      </h3>
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Judul Materi *</label>
                        <input
                          v-model="currentForm.title"
                          placeholder="Contoh: Petualangan Si Es Batu"
                          class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] font-bold"
                        />
                      </div>
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Deskripsi Ringkas</label>
                        <textarea
                          v-model="currentForm.description"
                          rows="3"
                          placeholder="Gambaran singkat tentang materi ini untuk ditampilkan ke siswa..."
                          class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] resize-none"
                        ></textarea>
                      </div>

                      <div class="grid grid-cols-3 gap-3">
                        <div>
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Jenjang</label>
                          <select v-model="currentForm.jenjang" disabled class="w-full px-3 py-3 rounded-2xl border-2 border-[#8F8575]/20 bg-[#8F8575]/10 text-sm font-semibold text-[#2B3445] focus:outline-none cursor-not-allowed">
                            <option value="SD">SD</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Mata Pelajaran</label>
                          <select v-model="currentForm.mataPelajaran" class="w-full px-3 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] text-sm text-[#2B3445] font-semibold focus:bg-white focus:border-[#1E7A6F] focus:outline-none cursor-pointer">
                            <option value="IPAS">IPAS</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                            <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                            <option value="Seni Budaya">Seni Budaya</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Kelas</label>
                          <select
                            v-model="currentForm.level"
                            class="w-full px-3 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] text-sm text-[#2B3445] font-semibold focus:bg-white focus:border-[#1E7A6F] focus:outline-none cursor-pointer"
                          >
                            <option
                              v-for="opt in levelOptions"
                              :key="opt.value"
                              :value="opt.value"
                            >
                              {{ opt.label }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <!-- Isi Lengkap Teks Bacaan Materi -->
                      <div class="pt-3 border-t-2 border-[#8F8575]/15">
                        <div class="flex items-center justify-between mb-1.5">
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide flex items-center gap-1.5">
                            <FileText class="w-4 h-4 text-[#1E7A6F]" />
                            <span>Isi Teks Bacaan Materi (Bisa Diedit Lengkap) *</span>
                          </label>
                          <span class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-2.5 py-0.5 rounded-full">Tampil di Tab Materi Siswa</span>
                        </div>
                        <textarea
                          v-if="currentForm.materiContent"
                          v-model="currentForm.materiContent.text"
                          rows="8"
                          placeholder="Tuliskan uraian materi lengkap di sini... Anda bisa membuat paragraf yang ramah anak, edukatif, dan jelas."
                          class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] font-medium resize-y leading-relaxed"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Apa yang akan kamu pelajari? (Poin Belajar) -->
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                          <Sparkles class="w-4 h-4 text-[#FFDE7A]" /> Poin-Poin Penting Belajar
                        </h3>
                        <button
                          type="button"
                          @click="addLearningPoint"
                          class="text-xs font-bold text-[#1E7A6F] hover:underline flex items-center gap-1 cursor-pointer bg-[#7FD4C4]/20 px-3 py-1 rounded-xl"
                        >
                          + Tambah Poin
                        </button>
                      </div>
                      <div class="space-y-3">
                        <div
                          v-for="(lp, idx) in currentForm.materiContent?.points"
                          :key="lp.id || idx"
                          class="flex items-start gap-2 bg-[#FFF8F0] p-3.5 rounded-2xl border-2 border-[#8F8575]/20"
                        >
                          <span class="w-6 h-6 rounded-full bg-[#1E7A6F] text-[#FFF8F0] text-xs font-bold flex items-center justify-center shrink-0 mt-1 font-['Baloo_2']">
                            {{ idx + 1 }}
                          </span>
                          <div class="flex-1 space-y-2">
                            <input
                              v-model="lp.title"
                              placeholder="Judul poin (misal: Mencair)..."
                              class="w-full px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs font-bold text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                            />
                            <input
                              v-model="lp.desc"
                              placeholder="Penjelasan ringkas poin ini..."
                              class="w-full px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs focus:border-[#1E7A6F] focus:outline-none text-[#2B3445]/80"
                            />
                          </div>
                          <button
                            type="button"
                            @click="removeLearningPoint(idx)"
                            class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer mt-1"
                            title="Hapus Poin"
                          >
                            <X class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right column: thumbnail image & audio -->
                  <div class="space-y-5">
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                        <ImagePlus class="w-4 h-4 text-[#1E7A6F]" /> Gambar Ilustrasi Materi
                      </h3>

                      <!-- Interactive Image Upload Drop Area -->
                      <div
                        @dragover.prevent="dragOverKey = 'image'"
                        @dragleave="dragOverKey = null"
                        @drop="handleImageDrop"
                        :class="[
                          'relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition group text-center flex items-center justify-center',
                          dragOverKey === 'image' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-[#FFF8F0] hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          class="absolute inset-0 opacity-0 cursor-pointer z-10"
                          @change="handleImageFileInput"
                        />
                        <img
                          :src="currentForm.materiContent?.image || currentForm.image || '/es_batu_card.jpg'"
                          alt="Thumbnail Preview"
                          class="w-full h-full object-cover"
                          @error="$event.target.src = '/es_batu_card.jpg'"
                        />
                        
                        <div class="absolute inset-0 bg-[#2B3445]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1 p-3 pointer-events-none">
                          <UploadCloud class="w-7 h-7 text-[#7FD4C4]" />
                          <span class="text-xs font-bold">Klik / Drag Gambar Baru</span>
                          <span class="text-[10px] text-white/80">Format PNG, JPG, WEBP, GIF</span>
                        </div>

                        <div v-if="isUploadingImage" class="absolute inset-0 bg-[#2B3445]/85 flex flex-col items-center justify-center text-white z-20 space-y-2">
                          <RefreshCw class="w-6 h-6 animate-spin text-[#7FD4C4]" />
                          <span class="text-xs font-bold">Mengunggah Gambar... {{ imageUploadProgress }}%</span>
                        </div>
                      </div>

                      <div>
                        <label class="btn-prisma-white w-full py-2.5 px-4 rounded-2xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-xs font-bold text-[#1E7A6F] flex items-center justify-center gap-2 transition cursor-pointer text-center">
                          <ImagePlus class="w-4 h-4" />
                          <span>Pilih Gambar dari Komputer</span>
                          <input
                            type="file"
                            accept="image/*"
                            class="hidden"
                            @change="handleImageFileInput"
                          />
                        </label>
                      </div>

                      <div class="pt-2">
                        <label class="text-[11px] font-bold text-[#2B3445]/70 uppercase tracking-wide block mb-1">Atau Tempel URL Gambar Langsung:</label>
                        <input
                          v-if="currentForm.materiContent"
                          v-model="currentForm.materiContent.image"
                          placeholder="/es_batu_card.jpg atau https://..."
                          class="w-full px-3 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-[#FFF8F0] text-xs text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <!-- Audio Narasi Suara Materi -->
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                          <Volume2 class="w-4 h-4 text-[#1E7A6F]" /> Suara Narasi Materi
                        </h3>
                        <span v-if="currentForm.materiContent?.audioUrl" class="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#7FD4C4]/30 text-[#1E7A6F]">
                          Ada Audio
                        </span>
                      </div>

                      <p class="text-xs text-[#2B3445]/70 leading-relaxed">
                        Unggah rekaman audio narasi penjelasan materi (.mp3, .wav, .m4a). Siswa dapat mendengarkan narasi ini lewat tombol suara interaktif.
                      </p>

                      <!-- Audio Player Preview jika audioUrl terisi -->
                      <div v-if="currentForm.materiContent?.audioUrl" class="p-3.5 bg-[#FFF8F0] border-2 border-[#7FD4C4]/50 rounded-2xl space-y-2">
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-bold text-[#1E7A6F] flex items-center gap-1.5">
                            <Music class="w-3.5 h-3.5 text-[#1E7A6F]" /> Audio Terpasang
                          </span>
                          <button
                            type="button"
                            @click="removeAudio"
                            class="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                          >
                            Hapus Audio
                          </button>
                        </div>
                        <audio
                          controls
                          :src="currentForm.materiContent.audioUrl"
                          class="w-full h-8 outline-none"
                        ></audio>
                      </div>

                      <!-- Drop & Upload Area Audio -->
                      <div
                        @dragover.prevent="dragOverKey = 'audio'"
                        @dragleave="dragOverKey = null"
                        @drop="handleAudioDrop"
                        :class="[
                          'relative p-4 rounded-2xl border-2 border-dashed transition group text-center flex flex-col items-center justify-center space-y-1.5 cursor-pointer',
                          dragOverKey === 'audio' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-[#FFF8F0] hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input
                          type="file"
                          accept="audio/*, .mp3, .wav, .m4a, .ogg"
                          class="absolute inset-0 opacity-0 cursor-pointer z-10"
                          @change="handleAudioFileInput"
                        />
                        <UploadCloud class="w-6 h-6 text-[#1E7A6F]" />
                        <span class="text-xs font-bold text-[#2B3445]">Klik / Drag File Audio ke Sini</span>
                        <span class="text-[10px] text-[#2B3445]/60">Format MP3, WAV, M4A, OGG</span>

                        <div v-if="isUploadingAudio" class="absolute inset-0 bg-[#2B3445]/85 rounded-2xl flex flex-col items-center justify-center text-white z-20 space-y-2">
                          <RefreshCw class="w-6 h-6 animate-spin text-[#7FD4C4]" />
                          <span class="text-xs font-bold">Mengunggah Audio... {{ audioUploadProgress }}%</span>
                        </div>
                      </div>

                      <div class="pt-1">
                        <label class="text-[11px] font-bold text-[#2B3445]/70 uppercase tracking-wide block mb-1">Atau Tempel URL Audio Langsung:</label>
                        <input
                          v-if="currentForm.materiContent"
                          v-model="currentForm.materiContent.audioUrl"
                          placeholder="https://.../suara-materi.mp3"
                          class="w-full px-3 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-[#FFF8F0] text-xs text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ---- TAB 2: VIDEO (2 VIDEO: YOUTUBE / UPLOAD) ---- -->
                <div v-if="activeFormTab === 'video'" class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden p-6 space-y-6">
                  <div class="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF8F0] border-2 border-[#7FD4C4]/50">
                    <div class="w-10 h-10 rounded-2xl bg-[#1E7A6F] text-[#FFF8F0] flex items-center justify-center font-bold">
                      <Video class="w-5 h-5" />
                    </div>
                    <div>
                      <h3 class="font-bold font-['Baloo_2'] text-base text-[#1E7A6F]">2 Video Pembelajaran</h3>
                      <p class="text-xs text-[#2B3445]/70">Materi ini memiliki 2 slot video. Anda dapat menempelkan tautan link YouTube atau mengunggah file video MP4 manual.</p>
                    </div>
                  </div>

                  <!-- VIDEO 1 BOX -->
                  <div class="p-5 rounded-3xl border-2 border-[#8F8575]/25 bg-[#FFF8F0]/50 space-y-4">
                    <div class="flex items-center justify-between border-b-2 border-[#8F8575]/15 pb-3">
                      <span class="px-3.5 py-1 rounded-xl bg-[#1E7A6F] text-white text-xs font-bold font-['Baloo_2']">
                        Video 1 (Utama / Konsep)
                      </span>
                      <span v-if="isYouTubeUrl(currentForm.videos?.video1?.url)" class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                        Link YouTube Terdeteksi
                      </span>
                    </div>

                    <div>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">Judul Video 1</label>
                      <input
                        v-if="currentForm.videos?.video1"
                        v-model="currentForm.videos.video1.title"
                        placeholder="Contoh: Video 1: Pengenalan Konsep Dasar"
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-sm font-bold text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">
                        URL Video 1 (YouTube atau Link MP4)
                      </label>
                      <input
                        v-if="currentForm.videos?.video1"
                        v-model="currentForm.videos.video1.url"
                        placeholder="Contoh: https://www.youtube.com/watch?v=... atau link file .mp4"
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-xs font-mono text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <!-- Upload File Manual untuk Video 1 -->
                    <div>
                      <label class="text-xs font-bold text-[#2B3445]/70 block mb-1">Atau Unggah File Video Manual:</label>
                      <div
                        @dragover.prevent="dragOverKey = 'video1'"
                        @dragleave="dragOverKey = null"
                        @drop="handleDrop($event, 'video1')"
                        :class="[
                          'relative border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer',
                          dragOverKey === 'video1' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-white hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input type="file" accept="video/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleFileInput($event, 'video1')" />
                        <div v-if="uploadTargetKey === 'video1' && isUploadingVideo" class="space-y-1">
                          <UploadCloud class="w-6 h-6 text-[#1E7A6F] mx-auto animate-bounce" />
                          <p class="text-xs text-[#1E7A6F] font-bold">Mengunggah Video 1... {{ uploadProgress }}%</p>
                        </div>
                        <div v-else class="flex items-center justify-center gap-2 text-[#2B3445]/70 text-xs font-bold">
                          <UploadCloud class="w-4 h-4 text-[#1E7A6F]" />
                          <span>Klik atau drag & drop file MP4 untuk Video 1</span>
                        </div>
                      </div>
                    </div>

                    <!-- Preview Video 1 -->
                    <div v-if="currentForm.videos?.video1?.url" class="pt-2">
                      <span class="text-xs font-bold text-[#2B3445]/60 block mb-1">Preview Video 1:</span>
                      <div class="w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-black shadow-md border-2 border-[#8F8575]/25">
                        <iframe
                          v-if="isYouTubeUrl(currentForm.videos.video1.url)"
                          :src="getYouTubeEmbedUrl(currentForm.videos.video1.url)"
                          class="w-full h-full border-0"
                          allowfullscreen
                        ></iframe>
                        <video
                          v-else
                          :src="currentForm.videos.video1.url"
                          controls
                          class="w-full h-full object-contain"
                        ></video>
                      </div>
                    </div>
                  </div>

                  <!-- VIDEO 2 BOX -->
                  <div class="p-5 rounded-3xl border-2 border-[#8F8575]/25 bg-[#FFF8F0]/50 space-y-4">
                    <div class="flex items-center justify-between border-b-2 border-[#8F8575]/15 pb-3">
                      <span class="px-3.5 py-1 rounded-xl bg-[#1E7A6F] text-white text-xs font-bold font-['Baloo_2']">
                        Video 2 (Eksperimen / Praktik)
                      </span>
                      <span v-if="isYouTubeUrl(currentForm.videos?.video2?.url)" class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                        Link YouTube Terdeteksi
                      </span>
                    </div>

                    <div>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">Judul Video 2</label>
                      <input
                        v-if="currentForm.videos?.video2"
                        v-model="currentForm.videos.video2.title"
                        placeholder="Contoh: Video 2: Eksperimen Seru & Praktik"
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-sm font-bold text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">
                        URL Video 2 (YouTube atau Link MP4)
                      </label>
                      <input
                        v-if="currentForm.videos?.video2"
                        v-model="currentForm.videos.video2.url"
                        placeholder="Contoh: https://www.youtube.com/watch?v=... atau link file .mp4"
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-xs font-mono text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <!-- Upload File Manual untuk Video 2 -->
                    <div>
                      <label class="text-xs font-bold text-[#2B3445]/70 block mb-1">Atau Unggah File Video Manual:</label>
                      <div
                        @dragover.prevent="dragOverKey = 'video2'"
                        @dragleave="dragOverKey = null"
                        @drop="handleDrop($event, 'video2')"
                        :class="[
                          'relative border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer',
                          dragOverKey === 'video2' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-white hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input type="file" accept="video/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleFileInput($event, 'video2')" />
                        <div v-if="uploadTargetKey === 'video2' && isUploadingVideo" class="space-y-1">
                          <UploadCloud class="w-6 h-6 text-[#1E7A6F] mx-auto animate-bounce" />
                          <p class="text-xs text-[#1E7A6F] font-bold">Mengunggah Video 2... {{ uploadProgress }}%</p>
                        </div>
                        <div v-else class="flex items-center justify-center gap-2 text-[#2B3445]/70 text-xs font-bold">
                          <UploadCloud class="w-4 h-4 text-[#1E7A6F]" />
                          <span>Klik atau drag & drop file MP4 untuk Video 2</span>
                        </div>
                      </div>
                    </div>

                    <!-- Preview Video 2 -->
                    <div v-if="currentForm.videos?.video2?.url" class="pt-2">
                      <span class="text-xs font-bold text-[#2B3445]/60 block mb-1">Preview Video 2:</span>
                      <div class="w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-black shadow-md border-2 border-[#8F8575]/25">
                        <iframe
                          v-if="isYouTubeUrl(currentForm.videos.video2.url)"
                          :src="getYouTubeEmbedUrl(currentForm.videos.video2.url)"
                          class="w-full h-full border-0"
                          allowfullscreen
                        ></iframe>
                        <video
                          v-else
                          :src="currentForm.videos.video2.url"
                          controls
                          class="w-full h-full object-contain"
                        ></video>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ---- TAB 3: QUIZ (PILIHAN GANDA & GAMBAR SOAL) ---- -->
                <div v-if="activeFormTab === 'quiz'" class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden p-6 space-y-6">
                  <div class="flex items-center justify-between p-4 rounded-2xl bg-[#FFDE7A]/25 border-2 border-[#FFDE7A]/70">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-2xl bg-[#1E7A6F] text-[#FFF8F0] flex items-center justify-center font-bold text-lg shadow-sm">
                        ✍️
                      </div>
                      <div>
                        <h3 class="font-bold font-['Baloo_2'] text-base text-[#2B3445]">Kuis Pilihan Ganda & Soal Bergambar</h3>
                        <p class="text-xs text-[#2B3445]/70">Admin dapat menambahkan soal kuis, menentukan kunci jawaban, dan menambahkan gambar untuk masing-masing soal.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="addQuestion"
                      class="btn-prisma-mint px-4 py-2.5 rounded-2xl text-[#FFF8F0] text-xs font-bold hover:brightness-105 transition cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Plus class="w-4 h-4" /> Tambah Soal
                    </button>
                  </div>

                  <div>
                    <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Judul Kuis</label>
                    <input
                      v-if="currentForm.quiz"
                      v-model="currentForm.quiz.title"
                      placeholder="Contoh: Kuis Pemahaman Perubahan Wujud Benda"
                      class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white text-sm font-bold text-[#2B3445]"
                    />
                  </div>

                  <!-- Ringkasan Total Poin -->
                  <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 text-xs">
                    <span class="font-bold text-[#2B3445]">Total Akumulasi Poin Kuis:</span>
                    <span class="font-black text-sm text-[#1E7A6F] bg-white border-2 border-[#7FD4C4] px-3.5 py-1 rounded-xl shadow-2xs font-['Baloo_2']">
                      {{ currentForm.quiz?.questions?.reduce((acc, q) => acc + (Number(q.points) || 25), 0) || 0 }} Poin
                    </span>
                  </div>

                  <!-- Questions List -->
                  <div v-if="!currentForm.quiz?.questions?.length" class="text-center py-10 border-2 border-dashed border-[#8F8575]/35 rounded-3xl bg-[#FFF8F0]">
                    <HelpCircle class="w-10 h-10 text-[#8F8575]/60 mx-auto mb-2" />
                    <p class="text-sm font-bold text-[#2B3445]">Belum ada soal untuk materi ini</p>
                    <p class="text-xs text-[#2B3445]/60 mb-4">Klik tombol di bawah untuk membuat soal pilihan ganda baru</p>
                    <button
                      type="button"
                      @click="addQuestion"
                      class="btn-prisma-mint px-5 py-2.5 rounded-2xl text-[#FFF8F0] text-xs font-bold hover:brightness-105 transition cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus class="w-4 h-4" /> Tambah Soal Pertama
                    </button>
                  </div>

                  <div v-else class="space-y-6">
                    <div
                      v-for="(q, qIdx) in currentForm.quiz.questions"
                      :key="q.id || qIdx"
                      class="p-5 rounded-3xl border-2 border-[#8F8575]/25 bg-[#FFF8F0]/50 space-y-4 relative group hover:border-[#1E7A6F] transition"
                    >
                      <!-- Header Soal -->
                      <div class="flex items-center justify-between border-b-2 border-[#8F8575]/15 pb-3 flex-wrap gap-2">
                        <div class="flex items-center gap-3">
                          <span class="text-xs font-bold uppercase tracking-wider text-white bg-[#1E7A6F] px-3.5 py-1 rounded-xl font-['Baloo_2']">
                            Soal {{ qIdx + 1 }}
                          </span>
                          <div class="flex items-center gap-1.5 bg-white border-2 border-[#8F8575]/25 rounded-xl px-2.5 py-1 shadow-2xs">
                            <span class="text-xs font-bold text-[#2B3445]/70">Bobot:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              v-model.number="q.points"
                              placeholder="25"
                              class="w-14 text-center text-xs font-black text-[#1E7A6F] focus:outline-none"
                            />
                            <span class="text-xs font-bold text-[#2B3445]/60">Poin</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="removeQuestion(qIdx)"
                          class="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 class="w-3.5 h-3.5" /> Hapus Soal
                        </button>
                      </div>

                      <!-- Pertanyaan Teks -->
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">
                          Pertanyaan / Soal *
                        </label>
                        <textarea
                          v-model="q.questionText"
                          rows="2"
                          placeholder="Tuliskan pertanyaan pilihan ganda di sini..."
                          class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-sm text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none resize-none font-medium"
                        ></textarea>
                      </div>

                      <!-- Gambar Soal (Opsional) -->
                      <div class="p-4 rounded-2xl bg-white border-2 border-[#8F8575]/20 space-y-2">
                        <div class="flex items-center justify-between">
                          <label class="text-xs font-bold text-[#2B3445] flex items-center gap-1.5">
                            <ImagePlus class="w-4 h-4 text-[#1E7A6F]" />
                            <span>Gambar Soal (Opsional)</span>
                          </label>
                          <button
                            v-if="q.image"
                            type="button"
                            @click="removeQuizImage(qIdx)"
                            class="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Hapus Gambar
                          </button>
                        </div>

                        <!-- Preview Gambar Soal -->
                        <div v-if="q.image" class="w-full max-w-xs aspect-video rounded-2xl overflow-hidden border-2 border-[#8F8575]/25 bg-[#FFF8F0] relative">
                          <img :src="q.image" alt="Preview Gambar Soal" class="w-full h-full object-contain" />
                        </div>

                        <!-- Input URL & Upload Button -->
                        <div class="flex items-center gap-2">
                          <input
                            v-model="q.image"
                            placeholder="Tempelkan URL gambar soal di sini..."
                            class="flex-1 px-3 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-[#FFF8F0] text-xs text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                          />
                          <label class="btn-prisma-white px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-[#1E7A6F] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                            <UploadCloud class="w-3.5 h-3.5" />
                            <span>{{ isUploadingQuizImage[qIdx] ? 'Mengunggah...' : 'Upload File' }}</span>
                            <input
                              type="file"
                              accept="image/*"
                              class="hidden"
                              @change="handleQuizImageUpload($event.target.files[0], qIdx)"
                            />
                          </label>
                        </div>
                      </div>

                      <!-- Options A, B, C, D -->
                      <div class="space-y-2.5">
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block">
                          Pilihan Jawaban (Klik Radio Button untuk Menentukan Kunci Jawaban Benar)
                        </label>
                        <div
                          v-for="(opt, oIdx) in 4"
                          :key="oIdx"
                          :class="[
                            'flex items-center gap-3 p-2.5 rounded-2xl border-2 transition',
                            q.correctOptionIndex === oIdx ? 'bg-[#7FD4C4]/20 border-[#1E7A6F]' : 'bg-white border-[#8F8575]/25'
                          ]"
                        >
                          <label
                            class="flex items-center justify-center w-7 h-7 rounded-xl font-bold text-xs shrink-0 cursor-pointer font-['Baloo_2']"
                            :class="q.correctOptionIndex === oIdx ? 'bg-[#1E7A6F] text-white' : 'bg-[#FFF8F0] border-2 border-[#8F8575]/30 text-[#2B3445]'"
                          >
                            <input
                              type="radio"
                              :name="`correct-${qIdx}`"
                              :value="oIdx"
                              v-model="q.correctOptionIndex"
                              class="sr-only"
                            />
                            {{ String.fromCharCode(65 + oIdx) }}
                          </label>

                          <input
                            v-model="q.options[oIdx]"
                            :placeholder="`Pilihan ${String.fromCharCode(65 + oIdx)}...`"
                            class="flex-1 px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                          />

                          <span v-if="q.correctOptionIndex === oIdx" class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/30 px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 font-['Baloo_2']">
                            <CheckCircle2 class="w-3.5 h-3.5" /> Kunci Jawaban Benar
                          </span>
                        </div>
                      </div>

                      <!-- Pembahasan / Penjelasan Singkat -->
                      <div>
                        <label class="text-xs font-bold text-[#2B3445]/70 uppercase tracking-wide block mb-1">
                          Penjelasan / Pembahasan Singkat (Opsional)
                        </label>
                        <input
                          v-model="q.explanation"
                          placeholder="Penjelasan yang tampil setelah siswa selesai menjawab kuis..."
                          class="w-full px-3 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs text-[#2B3445] focus:outline-none focus:border-[#1E7A6F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Save bar at bottom -->
                <div class="flex items-center justify-between pt-4 mt-6 border-t-2 border-[#8F8575]/20">
                  <button @click="showForm = false" class="btn-prisma-white px-6 py-2.5 rounded-2xl text-sm font-bold text-[#2B3445] border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] transition cursor-pointer">
                    Batal
                  </button>
                  <button
                    @click="handleSave"
                    class="btn-prisma-mint flex items-center gap-2 px-8 py-3 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer active:scale-95 transition shadow-md hover:brightness-105"
                  >
                    <Save class="w-4 h-4" />
                    Simpan Materi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- PAGE: DASHBOARD OVERVIEW -->
          <!-- ============================================================ -->
          <div v-else-if="activePage === 'dashboard'" class="p-4 sm:p-6 space-y-6 font-['Lexend']">
            <!-- Welcome -->
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Selamat datang kembali, {{ currentUser?.name?.split(' ')[0] }}! 👋</h1>
              <p class="text-[#2B3445]/60 text-sm mt-1">Pantau dan kelola seluruh konten pembelajaran Prisma dari sini.</p>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white rounded-3xl p-5 border-2 border-[#8F8575]/25 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-11 h-11 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center">
                    <BookOpen class="w-5 h-5" />
                  </div>
                  <ArrowUpRight class="w-4 h-4 text-[#1E7A6F]" />
                </div>
                <div>
                  <p class="text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">{{ materiList.length }}</p>
                  <p class="text-xs text-[#2B3445]/60 font-semibold mt-0.5">Total Materi</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-5 border-2 border-[#8F8575]/25 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-11 h-11 rounded-2xl bg-[#FFDE7A]/30 text-[#2B3445] flex items-center justify-center">
                    <Sparkles class="w-5 h-5 text-[#1E7A6F]" />
                  </div>
                  <ArrowUpRight class="w-4 h-4 text-[#1E7A6F]" />
                </div>
                <div>
                  <p class="text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">{{ totalPoinBelajar }}</p>
                  <p class="text-xs text-[#2B3445]/60 font-semibold mt-0.5">Poin Belajar</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-5 border-2 border-[#8F8575]/25 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-11 h-11 rounded-2xl bg-[#94C6FF]/30 text-[#1E7A6F] flex items-center justify-center">
                    <Video class="w-5 h-5 text-[#1E7A6F]" />
                  </div>
                </div>
                <div>
                  <p class="text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">{{ totalVideos }}</p>
                  <p class="text-xs text-[#2B3445]/60 font-semibold mt-0.5">Video Pembelajaran</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-5 border-2 border-[#8F8575]/25 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                  <div :class="['w-11 h-11 rounded-2xl flex items-center justify-center', isCloudinaryConfigured ? 'bg-[#7FD4C4]/25 text-[#1E7A6F]' : 'bg-[#FFDE7A]/30 text-[#2B3445]']">
                    <CloudUpload class="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p :class="['text-sm font-bold', isCloudinaryConfigured ? 'text-[#1E7A6F]' : 'text-[#2B3445]']">
                    {{ isCloudinaryConfigured ? 'Aktif Terhubung' : 'Perlu Diatur' }}
                  </p>
                  <p class="text-xs text-[#2B3445]/60 font-semibold mt-0.5">Cloudinary CDN</p>
                </div>
              </div>
            </div>

            <!-- Quick action + recent content -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <!-- Quick Actions -->
              <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-3">
                <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F]">Aksi Cepat</h3>
                <button
                  @click="openAddForm"
                  class="btn-prisma-mint w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#FFF8F0] shadow-sm hover:brightness-105 active:scale-95 transition cursor-pointer"
                >
                  <Plus class="w-5 h-5" /> Tambah Materi Baru
                </button>
                <button
                  @click="activePage = 'materi'"
                  class="btn-prisma-white w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-sm font-bold text-[#2B3445] transition cursor-pointer"
                >
                  <BookOpen class="w-5 h-5 text-[#1E7A6F]" /> Kelola Semua Materi
                </button>
                <button
                  @click="activePage = 'video'"
                  class="btn-prisma-white w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-sm font-bold text-[#2B3445] transition cursor-pointer"
                >
                  <FileVideo class="w-5 h-5 text-[#1E7A6F]" /> Manajemen Video
                </button>
              </div>

              <!-- Recent Content -->
              <div class="lg:col-span-2 bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F]">Konten Terbaru</h3>
                  <button @click="activePage = 'materi'" class="text-xs text-[#1E7A6F] font-bold cursor-pointer hover:underline">Lihat semua →</button>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="item in materiList.slice(0, 4)"
                    :key="item.id"
                    class="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8F0]/70 hover:bg-[#FFF8F0] border-2 border-[#8F8575]/15 transition group"
                  >
                    <img :src="item.image || '/es_batu_card.jpg'" :alt="item.title" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#8F8575]/20" />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-bold text-[#2B3445] truncate">{{ item.title }}</p>
                      <p class="text-xs text-[#2B3445]/60 truncate">{{ item.level }}</p>
                    </div>
                    <div class="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                      <button @click="emit('previewMateri', item)" class="p-2 rounded-xl bg-white border border-[#8F8575]/20 hover:bg-[#7FD4C4]/20 text-[#1E7A6F] cursor-pointer" title="Pratinjau Siswa">
                        <Eye class="w-4 h-4" />
                      </button>
                      <button @click="openEditForm(item)" class="p-2 rounded-xl bg-white border border-[#8F8575]/20 hover:bg-[#FFDE7A]/30 text-[#2B3445] cursor-pointer" title="Edit Materi">
                        <Edit3 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div v-if="materiList.length === 0" class="py-8 text-center text-[#2B3445]/60 text-sm">
                    Belum ada konten pembelajaran. Mulai dengan menambah materi pertama!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- PAGE: KONTEN MATERI (Table) -->
          <!-- ============================================================ -->
          <div v-else-if="activePage === 'materi'" class="p-4 sm:p-6 space-y-5 font-['Lexend']">
            <!-- Page header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Konten Materi</h1>
                <p class="text-[#2B3445]/60 text-sm mt-0.5">Kelola semua modul materi pembelajaran kurikulum Prisma</p>
              </div>
              <button
                @click="openAddForm"
                class="btn-prisma-mint flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer active:scale-95 transition shadow-sm shrink-0"
              >
                <Plus class="w-4 h-4" /> Tambah Materi
              </button>
            </div>

            <!-- Filter + Search Bar -->
            <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <!-- Search -->
              <div class="relative flex-1 min-w-0 w-full sm:w-auto">
                <Search class="w-4 h-4 text-[#8F8575] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  v-model="tableSearch"
                  placeholder="Cari judul materi pembelajaran..."
                  class="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445]"
                />
              </div>
              <!-- Kelas filter pills -->
              <div class="flex items-center gap-1.5 flex-wrap shrink-0">
                <button
                  v-for="k in ['Semua', ...availableTableKelasOptions]"
                  :key="k"
                  @click="selectedKelasFilter = k"
                  :class="[
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border-2',
                    selectedKelasFilter === k
                      ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-xs'
                      : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25 hover:border-[#1E7A6F]/50'
                  ]"
                >{{ k }}</button>
              </div>
              <button @click="resetMateri" class="btn-prisma-white flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/30 text-xs font-bold text-[#2B3445] hover:bg-[#FFF8F0] cursor-pointer transition shrink-0">
                <RefreshCw class="w-3.5 h-3.5" /> Reset
              </button>
              <button
                @click="openSyncModal"
                :disabled="isSyncing"
                title="Simpan seluruh materi dan video pembelajaran ke server online"
                class="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#1E7A6F] text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 cursor-pointer transition shrink-0 disabled:opacity-50"
              >
                <CloudUpload class="w-3.5 h-3.5" />
                {{ isSyncing ? 'Menyimpan...' : 'Simpan ke Cloud' }}
              </button>
            </div>

            <!-- Table Card -->
            <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden">
              <!-- Table header -->
              <div class="grid grid-cols-12 gap-3 px-5 py-3.5 border-b-2 border-[#8F8575]/20 bg-[#FFF8F0] text-xs font-bold font-['Baloo_2'] text-[#2B3445]/80 uppercase tracking-wide">
                <div class="col-span-5 lg:col-span-6">Materi Pembelajaran</div>
                <div class="col-span-2 hidden md:block">Tingkat Kelas</div>
                <div class="col-span-2 hidden lg:block">Status Mode</div>
                <div class="col-span-5 sm:col-span-3 lg:col-span-2 text-right">Aksi</div>
              </div>

              <!-- Loading -->
              <div v-if="isLoadingMateri" class="py-12 text-center">
                <RefreshCw class="w-6 h-6 animate-spin mx-auto mb-2 text-[#1E7A6F]" />
                <p class="text-sm text-[#2B3445]/60 font-semibold">Memuat materi pembelajaran...</p>
              </div>

              <!-- Rows -->
              <div v-else class="divide-y divide-[#8F8575]/15">
                <div
                  v-for="item in filteredMateri"
                  :key="item.id"
                  class="grid grid-cols-12 gap-3 items-center px-5 py-4 hover:bg-[#FFF8F0]/70 transition group"
                >
                  <!-- Materi info -->
                  <div class="col-span-5 lg:col-span-6 flex items-center gap-3 min-w-0">
                    <img :src="item.image || '/es_batu_card.jpg'" :alt="item.title" class="w-12 h-12 rounded-2xl object-cover shrink-0 border-2 border-[#8F8575]/20" />
                    <div class="min-w-0">
                      <p class="text-sm font-bold text-[#2B3445] truncate">{{ item.title }}</p>
                      <p class="text-xs text-[#2B3445]/60 truncate">{{ item.level }}</p>
                    </div>
                  </div>
                  <!-- Tingkat Kelas -->
                  <div class="col-span-2 hidden md:block">
                    <span class="px-3 py-1 rounded-xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 text-[#2B3445] text-xs font-bold font-['Baloo_2']">{{ getKelasFromLevel(item.level) }}</span>
                  </div>
                  <!-- Mode Status -->
                  <div class="col-span-2 hidden lg:block">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7FD4C4]/25 text-[#1E7A6F] border border-[#7FD4C4]">
                      <span class="w-2 h-2 rounded-full bg-[#1E7A6F]"></span> Video & Kuis Siap
                    </span>
                  </div>
                  <!-- Actions -->
                  <div class="col-span-5 sm:col-span-3 lg:col-span-2 flex items-center gap-1.5 justify-end">
                    <button @click="emit('previewMateri', item)" class="p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-[#7FD4C4]/30 text-[#1E7A6F] transition cursor-pointer" title="Pratinjau">
                      <Eye class="w-4 h-4" />
                    </button>
                    <button @click="openEditForm(item)" class="p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-[#FFDE7A]/40 text-[#2B3445] transition cursor-pointer" title="Edit">
                      <Edit3 class="w-4 h-4" />
                    </button>
                    <button @click="handleDelete(item.id, item.title)" class="p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-rose-100 text-rose-600 transition cursor-pointer" title="Hapus">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Empty state -->
                <div v-if="filteredMateri.length === 0" class="py-16 text-center">
                  <BookOpen class="w-10 h-10 text-[#8F8575]/50 mx-auto mb-3" />
                  <p class="text-[#2B3445]/60 font-semibold">{{ tableSearch ? 'Tidak ada materi yang cocok dengan pencarian.' : 'Belum ada materi pembelajaran.' }}</p>
                  <button v-if="!tableSearch" @click="openAddForm" class="btn-prisma-mint mt-3 px-5 py-2.5 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer shadow-sm">+ Tambah Sekarang</button>
                </div>
              </div>

              <!-- Table footer -->
              <div class="px-5 py-3.5 border-t-2 border-[#8F8575]/20 bg-[#FFF8F0] text-xs font-semibold text-[#2B3445]/70">
                Menampilkan {{ filteredMateri.length }} dari {{ materiList.length }} materi
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- PAGE: MANAJEMEN VIDEO -->
          <!-- ============================================================ -->
          <div v-else-if="activePage === 'video'" class="p-4 sm:p-6 space-y-5 font-['Lexend']">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Manajemen Video</h1>
              <p class="text-[#2B3445]/60 text-sm mt-0.5">Ringkasan video pembelajaran yang tersimpan per materi</p>
            </div>

            <!-- Cloudinary status card -->
            <div :class="[
              'rounded-3xl p-5 border-2 flex items-start gap-4',
              isCloudinaryConfigured ? 'bg-[#7FD4C4]/15 border-[#7FD4C4]' : 'bg-[#FFDE7A]/20 border-[#FFDE7A]'
            ]">
              <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', isCloudinaryConfigured ? 'bg-[#7FD4C4]/30 text-[#1E7A6F]' : 'bg-[#FFDE7A]/50 text-[#2B3445]']">
                <CloudUpload class="w-6 h-6" />
              </div>
              <div>
                <p class="font-bold text-sm font-['Baloo_2']" :class="isCloudinaryConfigured ? 'text-[#1E7A6F]' : 'text-[#2B3445]'">
                  {{ isCloudinaryConfigured ? 'Cloudinary CDN Terhubung' : 'Cloudinary Belum Dikonfigurasi' }}
                </p>
                <p class="text-xs mt-1 text-[#2B3445]/75 leading-relaxed">
                  {{ isCloudinaryConfigured
                    ? 'Video diunggah langsung ke Cloudinary CDN. Buka form edit materi untuk mengunggah atau mengganti video.'
                    : 'Isi VITE_CLOUDINARY_CLOUD_NAME dan VITE_CLOUDINARY_UPLOAD_PRESET di file .env.local, lalu restart server.'
                  }}
                </p>
              </div>
            </div>

            <!-- Video list per materi -->
            <div class="space-y-4">
              <div
                v-for="item in materiList"
                :key="item.id"
                class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden"
              >
                <div class="flex items-center gap-3 px-5 py-4 border-b-2 border-[#8F8575]/15 bg-[#FFF8F0]">
                  <img :src="item.image || '/es_batu_card.jpg'" :alt="item.title" class="w-11 h-11 rounded-2xl object-cover shrink-0 border border-[#8F8575]/25" />
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-[#2B3445] text-sm truncate">{{ item.title }}</p>
                    <p class="text-xs text-[#2B3445]/60">{{ item.level }}</p>
                  </div>
                  <button @click="openEditForm(item)" class="btn-prisma-mint flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#FFF8F0] cursor-pointer shadow-2xs">
                    <Edit3 class="w-3.5 h-3.5" /> Kelola Video
                  </button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                  <!-- Video Status -->
                  <div class="p-3.5 rounded-2xl border-2 border-[#7FD4C4]/40 bg-[#FFF8F0] text-xs space-y-1">
                    <p class="font-bold text-[#1E7A6F]">Slot Video Pembelajaran</p>
                    <p :class="(item.standardContent?.videoUrl || item.videoUrl) ? 'text-[#1E7A6F] font-bold' : 'text-[#2B3445]/50'">
                      {{ (item.standardContent?.videoUrl || item.videoUrl) ? 'Video Siap & Terkonfigurasi' : 'Belum Ada Video' }}
                    </p>
                  </div>
                  <!-- Assessment Status -->
                  <div class="p-3.5 rounded-2xl border-2 border-[#FFDE7A]/60 bg-[#FFF8F0] text-xs space-y-1">
                    <p class="font-bold text-[#2B3445]">Asesmen & Kuis Pilihan Ganda</p>
                    <p :class="item.assessment?.questions?.length ? 'text-[#1E7A6F] font-bold' : 'text-[#2B3445]/50'">
                      {{ item.assessment?.questions?.length ? `${item.assessment.questions.length} Soal Siap` : 'Belum Ada Soal' }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="materiList.length === 0" class="bg-white rounded-3xl p-12 text-center border-2 border-[#8F8575]/25 shadow-2xs">
                <FileVideo class="w-10 h-10 text-[#8F8575]/50 mx-auto mb-3" />
                <p class="text-[#2B3445]/60 text-sm font-semibold">Belum ada materi. Tambah materi untuk mengelola video.</p>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- PAGE: SETTINGS -->
          <!-- ============================================================ -->
          <div v-else-if="activePage === 'settings'" class="p-4 sm:p-6 space-y-5 font-['Lexend']">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Pengaturan CMS</h1>
              <p class="text-[#2B3445]/60 text-sm mt-0.5">Konfigurasi sistem penyimpanan dan database Prisma</p>
            </div>
            <div class="max-w-2xl space-y-4">
              <!-- Supabase -->
              <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden">
                <div class="px-5 py-4 border-b-2 border-[#8F8575]/15 bg-[#FFF8F0]">
                  <h3 class="font-bold font-['Baloo_2'] text-base text-[#1E7A6F]">Supabase Database</h3>
                  <p class="text-xs text-[#2B3445]/60 mt-0.5">Koneksi data materi, kuis, dan poin pembelajaran</p>
                </div>
                <div class="p-5 space-y-3">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-[#2B3445] font-semibold">VITE_SUPABASE_URL</span>
                    <span class="text-xs font-mono text-[#1E7A6F] bg-[#7FD4C4]/25 px-2.5 py-1 rounded-xl font-bold">Terkonfigurasi</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-[#2B3445] font-semibold">VITE_SUPABASE_ANON_KEY</span>
                    <span class="text-xs font-mono text-[#1E7A6F] bg-[#7FD4C4]/25 px-2.5 py-1 rounded-xl font-bold">Terkonfigurasi</span>
                  </div>
                </div>
              </div>

              <!-- Cloudinary -->
              <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden">
                <div class="px-5 py-4 border-b-2 border-[#8F8575]/15 bg-[#FFF8F0]">
                  <h3 class="font-bold font-['Baloo_2'] text-base text-[#1E7A6F]">Cloudinary Video CDN</h3>
                  <p class="text-xs text-[#2B3445]/60 mt-0.5">Penyimpanan media gambar, audio narasi, dan video pembelajaran</p>
                </div>
                <div class="p-5 space-y-3">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-[#2B3445] font-semibold">VITE_CLOUDINARY_CLOUD_NAME</span>
                    <span :class="['text-xs font-mono px-2.5 py-1 rounded-xl font-bold', isCloudinaryConfigured ? 'text-[#1E7A6F] bg-[#7FD4C4]/25' : 'text-[#2B3445] bg-[#FFDE7A]/30']">
                      {{ isCloudinaryConfigured ? 'Terkonfigurasi' : 'Belum diisi' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-[#2B3445] font-semibold">VITE_CLOUDINARY_UPLOAD_PRESET</span>
                    <span :class="['text-xs font-mono px-2.5 py-1 rounded-xl font-bold', isCloudinaryConfigured ? 'text-[#1E7A6F] bg-[#7FD4C4]/25' : 'text-[#2B3445] bg-[#FFDE7A]/30']">
                      {{ isCloudinaryConfigured ? 'Terkonfigurasi' : 'Belum diisi' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Data reset -->
              <div class="bg-white rounded-3xl border-2 border-[#FFB899] shadow-2xs overflow-hidden">
                <div class="px-5 py-4 border-b-2 border-[#FFB899]/40 bg-[#FFB899]/15">
                  <h3 class="font-bold font-['Baloo_2'] text-base text-rose-600">Zona Bahaya</h3>
                </div>
                <div class="p-5 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p class="text-sm font-bold text-[#2B3445]">Reset Data Materi ke Default</p>
                    <p class="text-xs text-[#2B3445]/60 mt-0.5">Kembalikan semua konten ke data contoh awal. Tindakan ini tidak bisa diurungkan.</p>
                  </div>
                  <button @click="resetMateri" class="px-4 py-2.5 rounded-2xl border-2 border-rose-300 text-rose-600 text-sm font-bold hover:bg-rose-50 transition cursor-pointer shrink-0">
                    Reset Default
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </template>

  <!-- ==================== MODERN SYNC CLOUD MODAL ==================== -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="syncModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B3445]/60 backdrop-blur-sm font-['Lexend']"
        @click.self="closeSyncModal"
      >
        <div
          class="bg-white rounded-3xl max-w-md w-full shadow-2xl border-2 border-[#8F8575]/30 overflow-hidden transform transition-all p-6 sm:p-7 text-center space-y-5 relative"
        >
          <!-- Close button -->
          <button
            v-if="syncModal.status !== 'syncing'"
            type="button"
            @click="closeSyncModal"
            class="absolute top-4 right-4 text-[#8F8575] hover:text-[#2B3445] transition p-1.5 rounded-xl hover:bg-[#FFF8F0] cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Step 1: Confirm -->
          <template v-if="syncModal.status === 'confirm'">
            <div class="w-16 h-16 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center mx-auto shadow-inner border border-[#7FD4C4]">
              <CloudUpload class="w-8 h-8" />
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold font-['Baloo_2'] text-[#2B3445]">
                Simpan Materi ke Cloud?
              </h3>
              <p class="text-xs sm:text-sm text-[#2B3445]/70 leading-relaxed px-2">
                Semua data materi dan video pembelajaran terbaru akan disimpan ke server online. Siswa dan guru di semua perangkat dapat langsung melihat pembaruan ini.
              </p>
            </div>
            <div class="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                @click="closeSyncModal"
                class="btn-prisma-white px-5 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 text-xs sm:text-sm font-bold text-[#2B3445] hover:bg-[#FFF8F0] transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                @click="executeSync"
                class="btn-prisma-mint flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[#FFF8F0] text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition cursor-pointer"
              >
                <CloudUpload class="w-4 h-4" />
                <span>Ya, Simpan Sekarang</span>
              </button>
            </div>
          </template>

          <!-- Step 2: Syncing in progress -->
          <template v-else-if="syncModal.status === 'syncing'">
            <div class="w-16 h-16 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center mx-auto shadow-inner border border-[#7FD4C4]">
              <RefreshCw class="w-8 h-8 animate-spin" />
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold font-['Baloo_2'] text-[#2B3445]">
                Sedang Menyimpan ke Cloud...
              </h3>
              <p class="text-xs sm:text-sm text-[#2B3445]/70 leading-relaxed px-2">
                Mohon tunggu sebentar, data materi dan video sedang disinkronkan ke server online.
              </p>
            </div>
            <div class="py-2 px-6">
              <div class="w-full bg-[#FFF8F0] border border-[#8F8575]/20 h-2.5 rounded-full overflow-hidden">
                <div class="h-full bg-[#1E7A6F] rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          </template>

          <!-- Step 3: Success -->
          <template v-else-if="syncModal.status === 'success'">
            <div class="w-16 h-16 rounded-2xl bg-[#7FD4C4]/30 text-[#1E7A6F] flex items-center justify-center mx-auto shadow-inner border border-[#7FD4C4]">
              <CheckCircle2 class="w-8 h-8" />
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold font-['Baloo_2'] text-[#2B3445]">
                Berhasil Disimpan!
              </h3>
              <p class="text-xs sm:text-sm text-[#2B3445]/70 leading-relaxed px-2">
                Sebanyak <strong class="text-[#1E7A6F] font-bold">{{ syncModal.count }} materi</strong> berhasil diperbarui di server online. Semua perangkat dan siswa sekarang sudah dapat melihat materi serta video terbaru.
              </p>
            </div>
            <div class="pt-2">
              <button
                type="button"
                @click="closeSyncModal"
                class="btn-prisma-mint w-full py-3 rounded-2xl text-[#FFF8F0] text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-95 cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </template>

          <!-- Step 4: Error -->
          <template v-else-if="syncModal.status === 'error'">
            <div class="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-200">
              <AlertCircle class="w-8 h-8" />
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold font-['Baloo_2'] text-rose-600">
                Gagal Menyimpan
              </h3>
              <p class="text-xs sm:text-sm text-[#2B3445]/70 leading-relaxed px-2">
                {{ syncModal.errorMessage || 'Terjadi gangguan saat menghubungkan ke server online. Silakan periksa koneksi internet Anda.' }}
              </p>
            </div>
            <div class="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                @click="closeSyncModal"
                class="btn-prisma-white px-5 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 text-xs sm:text-sm font-bold text-[#2B3445] hover:bg-[#FFF8F0] transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                @click="executeSync"
                class="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-rose-600 text-white text-xs sm:text-sm font-bold hover:bg-rose-700 active:scale-95 transition cursor-pointer"
              >
                <RefreshCw class="w-4 h-4" />
                <span>Coba Lagi</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
