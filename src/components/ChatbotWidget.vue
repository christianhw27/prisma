<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  X,
  Send,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Bot,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Calculator,
  BookOpen,
  MessageCircle,
  HelpCircle,
  Maximize2,
  Minimize2
} from '@lucide/vue'
import {
  checkChatbotStatus,
  sendChatText,
  sendChatPhoto,
  speakText,
  stopSpeech,
  isSpeaking
} from '../lib/chatbotService'
import { playButtonPop, playMascotChime } from '../lib/soundEffects'

// State widget
const isOpen = ref(false)
const isMaximized = ref(false)
const showTooltip = ref(true)
const isServerOnline = ref(false)
const isHostedWithoutBackend = ref(false)
const serverDetails = ref(null)
const isCheckingHealth = ref(false)
const isLoading = ref(false)
const isAutoSpeechEnabled = ref(false)
const currentlySpeakingId = ref(null)

const toggleMaximize = () => {
  playButtonPop()
  isMaximized.value = !isMaximized.value
  scrollToBottom()
}

// Chat history
const messages = ref([
  {
    id: 'msg-welcome',
    sender: 'defi',
    text: 'Halo sahabat pintar PRISMA! 👋 Aku **Defi**, teman belajarmu yang ramah dan ceria. Kamu bisa tanyakan apa saja tentang pelajaran membaca, cerita, berhitung matematika (misal: *"25 × 4 berapa?"*), atau unggah foto soal yang ingin kamu tanyakan! 📸✨',
    timestamp: new Date(),
    sumber: 'system_greeting'
  }
])

// Input form
const inputText = ref('')
const selectedPhoto = ref(null)
const photoPreviewUrl = ref('')
const fileInputRef = ref(null)
const chatContainerRef = ref(null)

// Quick Chips
const quickChips = [
  { label: '🧮 24 × 5 berapa?', text: '24 x 5 berapa?' },
  { label: '📖 Apa itu ide pokok?', text: 'Apa itu ide pokok paragraf?' },
  { label: '🍰 Mengapa pecahan 1/2 sama besar?', text: 'Jelaskan pecahan 1/2 pada kue' },
  { label: '📏 1 meter berapa cm?', text: '1 meter itu ada berapa sentimeter?' }
]

// Auto dismiss tooltip after 9 seconds
let tooltipTimer = null
onMounted(async () => {
  tooltipTimer = setTimeout(() => {
    showTooltip.value = false
  }, 9000)

  await checkHealth()
  // Cek berkala status server setiap 25 detik
  const healthInterval = setInterval(checkHealth, 25000)
  onUnmounted(() => {
    clearInterval(healthInterval)
    stopSpeech()
  })
})

const checkHealth = async () => {
  isCheckingHealth.value = true
  const res = await checkChatbotStatus()
  isServerOnline.value = res.isOnline
  isHostedWithoutBackend.value = Boolean(res.isHostedWithoutBackend)
  serverDetails.value = res.data || null
  isCheckingHealth.value = false
}

// Toggle widget open/close
const toggleChat = () => {
  playButtonPop()
  isOpen.value = !isOpen.value
  showTooltip.value = false
  if (isOpen.value) {
    playMascotChime()
    scrollToBottom()
  } else {
    stopSpeech()
    currentlySpeakingId.value = null
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
  }
}

// Reset Chat
const resetChat = () => {
  playButtonPop()
  stopSpeech()
  currentlySpeakingId.value = null
  selectedPhoto.value = null
  photoPreviewUrl.value = ''
  messages.value = [
    {
      id: `msg-${Date.now()}`,
      sender: 'defi',
      text: 'Obrolan sudah disegarkan kembali! Ada soal matematika atau materi literasi yang mau kita pelajari bersama lagi? ✨',
      timestamp: new Date(),
      sumber: 'system_greeting'
    }
  ]
}

// Photo Upload Handler
const triggerFileInput = () => {
  playButtonPop()
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const onFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validasi ukuran < 10 MB
  if (file.size > 10 * 1024 * 1024) {
    alert('Ukuran foto terlalu besar. Maksimal 10 MB ya sahabat!')
    return
  }

  selectedPhoto.value = file
  photoPreviewUrl.value = URL.createObjectURL(file)
}

const removeSelectedPhoto = () => {
  playButtonPop()
  selectedPhoto.value = null
  if (photoPreviewUrl.value) {
    URL.revokeObjectURL(photoPreviewUrl.value)
    photoPreviewUrl.value = ''
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Send Message
const handleSend = async () => {
  const text = inputText.value.trim()
  const photo = selectedPhoto.value

  if (!text && !photo) return
  if (isLoading.value) return

  playButtonPop()

  const currentPhotoPreview = photoPreviewUrl.value

  // Push pesan siswa
  const userMsgId = `user-${Date.now()}`
  messages.value.push({
    id: userMsgId,
    sender: 'user',
    text: text || (photo ? 'Tolong jelaskan foto soal ini ya Kak Defi!' : ''),
    photoUrl: currentPhotoPreview,
    timestamp: new Date()
  })

  // Reset input
  inputText.value = ''
  selectedPhoto.value = null
  photoPreviewUrl.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''

  isLoading.value = true
  scrollToBottom()

  try {
    let result
    if (photo) {
      result = await sendChatPhoto({
        foto: photo,
        pertanyaan: text || 'Jelaskan soal pada gambar ini',
        kelas: ''
      })
    } else {
      result = await sendChatText({
        pertanyaan: text,
        kelas: '',
        kategori: ''
      })
    }

    const defiMsgId = `defi-${Date.now()}`
    messages.value.push({
      id: defiMsgId,
      sender: 'defi',
      text: result.jawaban,
      sumber: result.sumber,
      isFallback: !result.success,
      timestamp: new Date()
    })

    // Auto speech bila diaktifkan pengguna
    if (isAutoSpeechEnabled.value) {
      speakMessage(defiMsgId, result.jawaban)
    }

  } catch (err) {
    messages.value.push({
      id: `defi-err-${Date.now()}`,
      sender: 'defi',
      text: 'Wah, Kak Defi sedikit kesulitan menghubungi otak server. Coba periksa koneksi atau ulangi sebentar lagi ya! Tetap semangat! ✨',
      sumber: 'error',
      isFallback: true,
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const sendChip = (chipText) => {
  inputText.value = chipText
  handleSend()
}

// Speech Audio Readout
const speakMessage = (msgId, text) => {
  playButtonPop()
  if (currentlySpeakingId.value === msgId) {
    stopSpeech()
    currentlySpeakingId.value = null
    return
  }

  stopSpeech()
  currentlySpeakingId.value = msgId
  speakText(text, () => {
    currentlySpeakingId.value = null
  })
}

const toggleAutoSpeech = () => {
  playButtonPop()
  isAutoSpeechEnabled.value = !isAutoSpeechEnabled.value
  if (!isAutoSpeechEnabled.value) {
    stopSpeech()
    currentlySpeakingId.value = null
  }
}

// Helper badge label sumber jawaban
const getSourceBadge = (sumber) => {
  switch (sumber) {
    case 'kalkulator_matematika':
      return { label: 'Kalkulator Cepat', icon: Calculator, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    case 'lokal_csv':
      return { label: 'Materi PRISMA', icon: BookOpen, color: 'bg-teal-50 text-teal-700 border-teal-200' }
    case 'ollama_lokal':
      return { label: 'AI Defi (Offline)', icon: Bot, color: 'bg-amber-50 text-amber-700 border-amber-200' }
    case 'gemini_vision':
      return { label: 'AI Kak Defi', icon: Sparkles, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
    case 'system_greeting':
      return { label: 'Sapaan Defi', icon: Bot, color: 'bg-[#FFF8F0] text-[#1E7A6F] border-[#1E7A6F]/30' }
    default:
      return { label: 'Sahabat Belajar', icon: Sparkles, color: 'bg-[#FFF8F0] text-[#8F8575] border-[#8F8575]/25' }
  }
}

// Parser Markdown Ceria, Terstruktur & Super Ramah Anak SD
const formatMarkdown = (txt) => {
  if (!txt) return ''

  // Pecah teks menjadi blok-blok terpisah berdasarkan 2 enter
  const paragraphs = txt.split(/\n\s*\n/)

  const htmlBlocks = paragraphs.map(para => {
    let p = para.trim()
    if (!p) return ''

    // Helper format inline teks
    const formatInline = (str) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1E7A6F]">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-[#5B6474]">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 rounded-lg bg-[#1E7A6F]/10 text-[#1E7A6F] font-bold font-mono text-sm sm:text-base border border-[#1E7A6F]/20">$1</code>')
    }

    // A. Kotak Kesimpulan Emas / Cerah (🎉 Kesimpulan: ...)
    if (/^(🎉\s*)?\*?\*?kesimpulan:?\*?\*?/i.test(p)) {
      const cleanBody = p.replace(/^(🎉\s*)?\*?\*?kesimpulan:?\*?\*?\s*:?/i, '').trim()
      return `
        <div class="my-3.5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFF8E6] via-[#FFF3D1] to-[#FFF8E6] border-2 border-[#FFDE7A] text-[#2B3445] shadow-xs">
          <div class="flex items-center gap-2 font-['Baloo_2'] font-extrabold text-sm sm:text-base text-[#D97706] mb-1.5">
            <span class="text-xl">🎉</span>
            <span class="uppercase tracking-wider">Kesimpulan Jawaban</span>
          </div>
          <div class="font-['Baloo_2'] text-base sm:text-xl font-extrabold text-[#1E7A6F] tracking-wide leading-relaxed">
            ${formatInline(cleanBody)}
          </div>
        </div>
      `
    }

    // B. Kotak Tips & Cara Mudah (💡 atau ✨ atau 📌)
    if (/^[💡✨📌]/.test(p)) {
      return `
        <div class="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#E8F6F3] border-2 border-[#7FD4C4]/60 text-[#165B53] shadow-2xs">
          <div class="text-sm sm:text-base font-semibold leading-relaxed">
            ${formatInline(p)}
          </div>
        </div>
      `
    }

    // C. Langkah-langkah Bernomor (1. ..., 2. ...)
    if (/^\d+\.\s+/.test(p) || p.includes('\n1. ') || p.includes('\n2. ')) {
      const lines = p.split('\n')
      const renderedLines = lines.map(line => {
        const stepMatch = line.trim().match(/^(\d+)\.\s+(.*)$/)
        if (stepMatch) {
          const stepNum = stepMatch[1]
          const stepContent = stepMatch[2]
          return `
            <div class="my-2 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#1E7A6F]/25 shadow-2xs flex items-start gap-3 hover:border-[#1E7A6F] transition-colors">
              <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white flex items-center justify-center font-['Baloo_2'] font-extrabold text-sm sm:text-base shrink-0 shadow-xs">
                ${stepNum}
              </span>
              <div class="flex-1 font-medium text-sm sm:text-base text-[#2B3445] leading-relaxed pt-0.5">
                ${formatInline(stepContent)}
              </div>
            </div>
          `
        }

        const bulletMatch = line.trim().match(/^[•\-*]\s+(.*)$/)
        if (bulletMatch) {
          return `
            <div class="flex items-start gap-2.5 pl-3 sm:pl-4 my-1 text-sm sm:text-base text-[#2B3445] font-medium leading-relaxed">
              <span class="text-[#1E7A6F] font-bold text-base leading-none mt-1">•</span>
              <div class="flex-1">${formatInline(bulletMatch[1])}</div>
            </div>
          `
        }

        if (line.trim()) {
          return `<p class="text-sm sm:text-base font-medium text-[#2B3445] leading-relaxed my-1">${formatInline(line)}</p>`
        }
        return ''
      }).join('')

      return `<div class="space-y-1 my-2">${renderedLines}</div>`
    }

    // D. Bullet list biasa (• ...)
    if (/^[•\-*]\s+/.test(p)) {
      const lines = p.split('\n')
      const renderedList = lines.map(line => {
        const item = line.trim().replace(/^[•\-*]\s+/, '')
        return `
          <div class="flex items-start gap-2.5 pl-2 my-1 text-sm sm:text-base text-[#2B3445] font-medium leading-relaxed">
            <span class="text-[#1E7A6F] font-bold text-base leading-none mt-1">•</span>
            <div class="flex-1">${formatInline(item)}</div>
          </div>
        `
      }).join('')
      return `<div class="my-2">${renderedList}</div>`
    }

    // E. Paragraf Biasa
    const isEnthusiastic = /[🚀✨👏💪🎉]/.test(p) || /semangat|hebat|luar biasa|pintar sekali|keren/i.test(p)
    return `
      <p class="text-sm sm:text-base ${isEnthusiastic ? 'font-semibold text-[#1E7A6F]' : 'font-medium text-[#2B3445]'} leading-relaxed my-1.5">
        ${formatInline(p)}
      </p>
    `
  })

  return htmlBlocks.join('')
}
</script>

<template>
  <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
    
    <!-- ==================== FLOATING TOOLTIP (MENYAPA SISWA) ==================== -->
    <div
      v-if="!isOpen && showTooltip"
      class="absolute bottom-20 right-0 mb-1 w-64 p-3 bg-white rounded-2xl shadow-xl border-2 border-[#1E7A6F]/30 text-left transition-all duration-300 animate-bounce"
    >
      <div class="flex items-start gap-2.5">
        <span class="text-2xl leading-none">🤖</span>
        <div class="flex-1">
          <p class="font-['Baloo_2'] text-sm font-bold text-[#1E7A6F] leading-tight">
            Tanya Kak Defi yuk!
          </p>
          <p class="text-xs text-[#5B6474] mt-0.5 leading-snug">
            Bisa hitung matematika cepat, tanya materi SD, atau kirim foto soal! ✨
          </p>
        </div>
        <button
          @click.stop="showTooltip = false"
          class="text-[#8F8575] hover:text-[#2B3445] p-0.5 rounded-md"
          title="Tutup sapaan"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
      <!-- Segitiga penunjuk tooltip ke arah tombol -->
      <div class="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-[#1E7A6F]/30 rotate-45"></div>
    </div>

    <!-- ==================== TOMBOL UTAMA CHATBOT (COLLAPSED) ==================== -->
    <button
      v-if="!isOpen"
      type="button"
      @click="toggleChat"
      class="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-4 border-white focus:outline-none focus:ring-4 focus:ring-[#7FD4C4]/50 cursor-pointer"
      aria-label="Buka Chatbot Kak Defi"
    >
      <!-- Defi Mascot Icon -->
      <div class="relative flex items-center justify-center">
        <!-- Smiling Bot Mascot SVG -->
        <svg class="w-9 h-9 sm:w-11 sm:h-11 group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm" viewBox="0 0 36 36" fill="none">
          <!-- Antena & Sparkle -->
          <line x1="18" y1="3" x2="18" y2="7" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="18" cy="3" r="2.5" fill="#FFDE7A" stroke="white" stroke-width="1"/>
          <!-- Head / Body -->
          <rect x="5" y="7" width="26" height="23" rx="11.5" fill="white" />
          <rect x="7" y="9" width="22" height="19" rx="9.5" fill="#1E7A6F" />
          <!-- Big Cute Eyes with shine -->
          <circle cx="13" cy="17" r="3.5" fill="white" />
          <circle cx="13.8" cy="16.2" r="1.3" fill="#1E7A6F" />
          <circle cx="23" cy="17" r="3.5" fill="white" />
          <circle cx="22.2" cy="16.2" r="1.3" fill="#1E7A6F" />
          <!-- Cheerful Smile -->
          <path d="M14 22.5 Q18 26.5 22 22.5" stroke="#FFDE7A" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <!-- Rosy Cheeks -->
          <ellipse cx="9.5" cy="21.5" rx="1.5" ry="1" fill="#FF8A8A" opacity="0.9"/>
          <ellipse cx="26.5" cy="21.5" rx="1.5" ry="1" fill="#FF8A8A" opacity="0.9"/>
        </svg>

        <!-- Status Dot (Hijau bila server online, oranye standby) -->
        <span
          class="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center shadow-xs bg-emerald-500"
          title="Kak Defi Siap Membantu"
        >
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
        </span>
      </div>
    </button>

    <!-- ==================== JENDELA CHAT LENGKAP (EXPANDED) ==================== -->
    <div
      v-else
      class="fixed inset-x-2 bottom-2 sm:inset-auto sm:right-6 sm:bottom-6 bg-[#FFF8F0] rounded-3xl shadow-2xl border-2 border-[#1E7A6F]/30 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 z-50"
      :class="[
        isMaximized
          ? 'w-[calc(100vw-1rem)] sm:w-[680px] md:w-[780px] lg:w-[860px] h-[92vh] max-h-[95vh]'
          : 'w-[calc(100vw-1rem)] sm:w-[480px] md:w-[540px] lg:w-[560px] h-[86vh] sm:h-[680px] md:h-[730px] max-h-[92vh]'
      ]"
    >
      
      <!-- HEADER JENDELA CHAT -->
      <header class="bg-gradient-to-r from-[#1E7A6F] to-[#165B53] text-white px-4 py-3.5 sm:px-6 sm:py-4.5 flex items-center justify-between shadow-md shrink-0">
        <!-- Profil Kak Defi -->
        <div class="flex items-center gap-3.5">
          <div class="relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-xs shrink-0">
            <!-- Smiling Mini Bot SVG -->
            <svg class="w-8 h-8 drop-shadow-sm" viewBox="0 0 36 36" fill="none">
              <line x1="18" y1="4" x2="18" y2="8" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
              <circle cx="18" cy="3.5" r="2" fill="#FFDE7A"/>
              <rect x="5" y="8" width="26" height="22" rx="10" fill="white" />
              <rect x="7" y="10" width="22" height="18" rx="8" fill="#1E7A6F" />
              <circle cx="13" cy="17" r="3" fill="white" />
              <circle cx="13.7" cy="16.3" r="1.2" fill="#1E7A6F" />
              <circle cx="23" cy="17" r="3" fill="white" />
              <circle cx="22.3" cy="16.3" r="1.2" fill="#1E7A6F" />
              <path d="M14 22 Q18 25.5 22 22" stroke="#FFDE7A" stroke-width="2" stroke-linecap="round" fill="none" />
              <circle cx="9.5" cy="21" r="1.2" fill="#FF8A8A" />
              <circle cx="26.5" cy="21" r="1.2" fill="#FF8A8A" />
            </svg>
            <span
              class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#1E7A6F] bg-emerald-400"
            ></span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-['Baloo_2'] font-extrabold text-lg sm:text-xl leading-tight tracking-wide text-white">
                Kak Defi
              </h2>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFDE7A] text-[#2B3445] leading-none">
                AI SD
              </span>
            </div>
            <div class="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 leading-tight mt-0.5">
              <span>🟢 Siap Membantu</span>
              <span class="text-white/50">•</span>
              <span class="text-white/95 font-medium">Teman Belajar PRISMA</span>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Header -->
        <div class="flex items-center gap-1.5">
          <!-- Tombol Auto-Voice (Membaca Jawaban) -->
          <button
            type="button"
            @click="toggleAutoSpeech"
            class="p-2 sm:p-2.5 rounded-xl transition cursor-pointer"
            :class="isAutoSpeechEnabled ? 'bg-[#FFDE7A] text-[#2B3445]' : 'bg-white/10 text-white hover:bg-white/20'"
            :title="isAutoSpeechEnabled ? 'Suara Narasi Otomatis Aktif' : 'Aktifkan Suara Narasi Otomatis (Ramah Siswa)'"
          >
            <Volume2 v-if="isAutoSpeechEnabled" class="w-4.5 h-4.5" />
            <VolumeX v-else class="w-4.5 h-4.5 opacity-75" />
          </button>

          <!-- Tombol Segarkan Obrolan -->
          <button
            type="button"
            @click="resetChat"
            class="p-2 sm:p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            title="Mulai Percakapan Baru"
          >
            <RotateCcw class="w-4.5 h-4.5" />
          </button>

          <!-- Tombol Perbesar / Perkecil Ukuran Jendela Chat -->
          <button
            type="button"
            @click="toggleMaximize"
            class="hidden sm:flex p-2 sm:p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            :title="isMaximized ? 'Perkecil Ukuran Jendela' : 'Perbesar Ukuran Jendela Chat'"
          >
            <Minimize2 v-if="isMaximized" class="w-4.5 h-4.5" />
            <Maximize2 v-else class="w-4.5 h-4.5" />
          </button>

          <!-- Tombol Tutup / Minimize -->
          <button
            type="button"
            @click="toggleChat"
            class="p-2 sm:p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer ml-0.5"
            title="Tutup Chat"
          >
            <X class="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      <!-- AREA DAFTAR PESAN (CHAT BODY) -->
      <div
        ref="chatContainerRef"
        class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF8F0]/50"
      >
        
        <!-- Render Tiap Pesan -->
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="flex flex-col"
          :class="msg.sender === 'user' ? 'items-end' : 'items-start'"
        >
          <!-- Bubble Pesan Siswa -->
          <div
            v-if="msg.sender === 'user'"
            class="max-w-[85%] bg-gradient-to-br from-[#1E7A6F] to-[#165B53] text-white p-4 sm:p-5 rounded-3xl rounded-br-xs shadow-sm space-y-2.5"
          >
            <!-- Lampiran Foto jika ada -->
            <div v-if="msg.photoUrl" class="rounded-2xl overflow-hidden border-2 border-white/30 max-h-56 bg-black/10">
              <img :src="msg.photoUrl" alt="Foto soal siswa" class="w-full h-auto object-cover" />
            </div>
            <p class="text-base sm:text-lg font-medium leading-relaxed whitespace-pre-wrap">
              {{ msg.text }}
            </p>
          </div>

          <!-- Bubble Pesan Kak Defi -->
          <div
            v-else
            class="max-w-[95%] sm:max-w-[92%] flex items-start gap-3"
          >
            <!-- Defi Avatar Bubble -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-white mt-1">
              <Bot class="w-5.5 h-5.5" />
            </div>

            <!-- Kartu Jawaban Super Ramah Anak -->
            <div class="bg-white p-4 sm:p-5.5 rounded-3xl rounded-tl-xs border-2 border-[#8F8575]/20 shadow-sm text-[#2B3445] space-y-3 flex-1">
              
              <!-- Badge Kategori Jawaban -->
              <div class="flex items-center justify-between gap-2 border-b border-[#8F8575]/15 pb-2.5">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold border shadow-2xs"
                  :class="getSourceBadge(msg.sumber).color"
                >
                  <component :is="getSourceBadge(msg.sumber).icon" class="w-4 h-4" />
                  <span>{{ getSourceBadge(msg.sumber).label }}</span>
                </span>

                <!-- Tombol Dengarkan Jawaban -->
                <button
                  type="button"
                  @click="speakMessage(msg.id, msg.text)"
                  class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E7A6F] hover:text-[#165B53] transition cursor-pointer px-3 py-1.5 rounded-xl hover:bg-[#7FD4C4]/15 active:scale-95"
                  :title="currentlySpeakingId === msg.id ? 'Hentikan suara' : 'Dengarkan suara Kak Defi'"
                >
                  <Volume2 class="w-4.5 h-4.5" :class="currentlySpeakingId === msg.id ? 'animate-pulse text-[#D97706]' : ''" />
                  <span>{{ currentlySpeakingId === msg.id ? 'Membaca...' : 'Dengarkan' }}</span>
                </button>
              </div>

              <!-- Teks Jawaban Ramah Anak (Besar, Jelas, & Menarik) -->
              <div
                class="text-base sm:text-lg leading-relaxed font-normal text-[#2B3445]"
                v-html="formatMarkdown(msg.text)"
              ></div>
            </div>
          </div>
        </div>

        <!-- QUICK CHIPS SUGGESTIONS (Hanya muncul jika baru mulai) -->
        <div v-if="messages.length <= 2" class="pt-2 space-y-2">
          <p class="text-xs sm:text-sm font-bold text-[#5B6474] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
            <span>Coba tanyakan contoh ini:</span>
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(chip, idx) in quickChips"
              :key="idx"
              type="button"
              @click="sendChip(chip.text)"
              class="px-3.5 py-2 rounded-2xl bg-white border border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 text-[#2B3445] text-xs sm:text-sm font-medium transition cursor-pointer text-left shadow-2xs active:scale-95"
            >
              {{ chip.label }}
            </button>
          </div>
        </div>

        <!-- INDIKATOR DEFI SEDANG BERPIKIR (TYPING INDICATOR) -->
        <div v-if="isLoading" class="flex items-start gap-3">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white flex items-center justify-center shrink-0 shadow-xs border border-white mt-1 animate-pulse">
            <Bot class="w-5 h-5" />
          </div>
          <div class="bg-white px-5 py-3.5 rounded-3xl rounded-tl-xs border-2 border-[#8F8575]/20 shadow-xs flex items-center gap-2.5">
            <span class="text-sm text-[#5B6474] font-medium">Kak Defi sedang berpikir</span>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 bg-[#1E7A6F] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span class="w-2 h-2 bg-[#1E7A6F] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span class="w-2 h-2 bg-[#1E7A6F] rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>

      </div>

      <!-- PRATINJAU FOTO TERPILIH (JIKA ADA FOTO YANG AKAN DIUNGGAH) -->
      <div v-if="photoPreviewUrl" class="px-4 py-3 bg-white border-t border-[#8F8575]/20 flex items-center justify-between gap-3 shrink-0">
        <div class="flex items-center gap-3 overflow-hidden">
          <img :src="photoPreviewUrl" alt="Thumbnail foto" class="w-12 h-12 object-cover rounded-xl border-2 border-[#1E7A6F]" />
          <div class="truncate text-xs sm:text-sm">
            <p class="font-bold text-[#2B3445] truncate">{{ selectedPhoto?.name }}</p>
            <p class="text-xs text-[#1E7A6F] font-semibold">Foto siap dikirim ke Kak Defi 📸</p>
          </div>
        </div>
        <button
          type="button"
          @click="removeSelectedPhoto"
          class="p-1.5 rounded-xl text-[#8F8575] hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
          title="Batalkan foto"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- FOOTER FORM INPUT PESAN -->
      <footer class="p-3.5 sm:p-4 bg-white border-t border-[#8F8575]/20 shrink-0">
        <form @submit.prevent="handleSend" class="flex items-center gap-2.5">
          
          <!-- Hidden Input Foto -->
          <input
            type="file"
            ref="fileInputRef"
            @change="onFileChange"
            accept="image/*"
            class="hidden"
          />

          <!-- Tombol Unggah Foto Soal -->
          <button
            type="button"
            @click="triggerFileInput"
            class="p-3 sm:p-3.5 rounded-2xl border-2 transition cursor-pointer shrink-0"
            :class="selectedPhoto ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] text-[#1E7A6F]' : 'border-[#8F8575]/25 text-[#5B6474] hover:border-[#1E7A6F] hover:bg-[#FFF8F0]'"
            title="Kirim Foto Soal / Catatan"
          >
            <ImageIcon class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <!-- Input Teks -->
          <div class="relative flex-1">
            <input
              v-model="inputText"
              type="text"
              :placeholder="selectedPhoto ? 'Tuliskan pertanyaan foto ini...' : 'Tanya apa saja ke Kak Defi...'"
              class="w-full py-3 sm:py-3.5 pl-4 pr-3 rounded-2xl bg-[#FFF8F0]/70 border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:bg-white text-sm sm:text-base text-[#2B3445] placeholder-[#8F8575] focus:outline-none transition shadow-inner"
              :disabled="isLoading"
            />
          </div>

          <!-- Tombol Kirim -->
          <button
            type="submit"
            :disabled="(!inputText.trim() && !selectedPhoto) || isLoading"
            class="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white shadow-xs hover:shadow-md transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 active:scale-95"
            title="Kirim Pesan"
          >
            <Send class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </form>

        <div class="mt-2 text-center text-xs text-[#8F8575]">
          PRISMA Defi AI • Pendamping Belajar Inklusif SD
        </div>
      </footer>

    </div>

  </div>
</template>

<style scoped>
/* Sembunyikan scrollbar horizontal untuk pill kelas */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
