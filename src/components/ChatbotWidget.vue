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
  HelpCircle
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

const props = defineProps({
  currentKelas: {
    type: String,
    default: 'Semua'
  }
})

// State widget
const isOpen = ref(false)
const showTooltip = ref(true)
const isServerOnline = ref(false)
const isHostedWithoutBackend = ref(false)
const serverDetails = ref(null)
const isCheckingHealth = ref(false)
const isLoading = ref(false)
const isAutoSpeechEnabled = ref(false)
const currentlySpeakingId = ref(null)

// Class filter
const selectedKelas = ref(props.currentKelas || 'Semua')
const kelasOptions = ['Semua', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']

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

// Watchers
watch(() => props.currentKelas, (newVal) => {
  if (newVal && newVal !== 'Semua') {
    selectedKelas.value = newVal
  }
})

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
        kelas: selectedKelas.value !== 'Semua' ? selectedKelas.value : ''
      })
    } else {
      result = await sendChatText({
        pertanyaan: text,
        kelas: selectedKelas.value !== 'Semua' ? selectedKelas.value : '',
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
      return { label: 'Analisis Foto', icon: Sparkles, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
    case 'system_greeting':
      return { label: 'Sapaan Defi', icon: Bot, color: 'bg-[#FFF8F0] text-[#1E7A6F] border-[#1E7A6F]/30' }
    default:
      return { label: 'Sahabat Belajar', icon: Sparkles, color: 'bg-[#FFF8F0] text-[#8F8575] border-[#8F8575]/25' }
  }
}

// Format markdown sederhana (bold, list)
const formatMarkdown = (txt) => {
  if (!txt) return ''
  // Ubah **teks** menjadi <strong>teks</strong>
  let formatted = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Ubah *teks* menjadi <em>teks</em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
  return formatted
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
      class="group relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-3 border-white focus:outline-none focus:ring-4 focus:ring-[#7FD4C4]/50 cursor-pointer"
      aria-label="Buka Chatbot Kak Defi"
    >
      <!-- Defi Mascot Icon -->
      <div class="relative flex items-center justify-center">
        <!-- Smiling Bot Mascot SVG -->
        <svg class="w-8 h-8 sm:w-9 sm:h-9 group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm" viewBox="0 0 36 36" fill="none">
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
          class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-xs"
          :class="isServerOnline ? 'bg-emerald-500' : 'bg-amber-400'"
          :title="isServerOnline ? 'Server Defi Online' : 'Mode Cadangan Cerdas'"
        >
          <span
            v-if="isServerOnline"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
        </span>
      </div>
    </button>

    <!-- ==================== JENDELA CHAT LENGKAP (EXPANDED) ==================== -->
    <div
      v-else
      class="fixed inset-x-3 bottom-3 sm:static w-auto sm:w-[410px] h-[85vh] sm:h-[600px] max-h-[85vh] bg-[#FFF8F0] rounded-3xl shadow-2xl border-2 border-[#1E7A6F]/30 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      
      <!-- HEADER JENDELA CHAT -->
      <header class="bg-gradient-to-r from-[#1E7A6F] to-[#165B53] text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between shadow-md shrink-0">
        <!-- Profil Kak Defi -->
        <div class="flex items-center gap-3">
          <div class="relative w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-xs">
            <!-- Smiling Mini Bot SVG -->
            <svg class="w-7 h-7 drop-shadow-sm" viewBox="0 0 36 36" fill="none">
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
              class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#1E7A6F]"
              :class="isServerOnline ? 'bg-emerald-400' : 'bg-amber-300'"
            ></span>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h2 class="font-['Baloo_2'] font-extrabold text-base sm:text-lg leading-tight tracking-wide text-white">
                Kak Defi
              </h2>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FFDE7A] text-[#2B3445] leading-none">
                AI SD
              </span>
            </div>
            <div class="flex items-center gap-1 text-[11px] text-white/80 leading-tight">
              <span>{{ isServerOnline ? '🟢 Siap Membantu' : isHostedWithoutBackend ? '🟢 Mode Mandiri' : '🟡 Mode Cerdas' }}</span>
              <span class="text-white/50">•</span>
              <span class="text-white/90 font-medium">Teman PRISMA</span>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Header -->
        <div class="flex items-center gap-1">
          <!-- Tombol Auto-Voice (Membaca Jawaban) -->
          <button
            type="button"
            @click="toggleAutoSpeech"
            class="p-2 rounded-xl transition cursor-pointer"
            :class="isAutoSpeechEnabled ? 'bg-[#FFDE7A] text-[#2B3445]' : 'bg-white/10 text-white hover:bg-white/20'"
            :title="isAutoSpeechEnabled ? 'Suara Narasi Otomatis Aktif' : 'Aktifkan Suara Narasi Otomatis (Ramah Siswa)'"
          >
            <Volume2 v-if="isAutoSpeechEnabled" class="w-4 h-4" />
            <VolumeX v-else class="w-4 h-4 opacity-75" />
          </button>

          <!-- Tombol Segarkan Obrolan -->
          <button
            type="button"
            @click="resetChat"
            class="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            title="Mulai Percakapan Baru"
          >
            <RotateCcw class="w-4 h-4" />
          </button>

          <!-- Tombol Tutup / Minimize -->
          <button
            type="button"
            @click="toggleChat"
            class="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer ml-1"
            title="Tutup Chat"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </header>

      <!-- BAR PILIHAN KELAS (FILTER KONTEKS SISWA) -->
      <div class="bg-white/80 border-b border-[#8F8575]/20 px-3 py-2 flex items-center justify-between gap-2 shrink-0 overflow-x-auto text-xs">
        <div class="flex items-center gap-1.5 shrink-0 text-[#5B6474] font-medium">
          <BookOpen class="w-3.5 h-3.5 text-[#1E7A6F]" />
          <span>Fokus:</span>
        </div>
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            v-for="kelas in kelasOptions"
            :key="kelas"
            type="button"
            @click="selectedKelas = kelas; playButtonPop()"
            class="px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer"
            :class="selectedKelas === kelas ? 'bg-[#1E7A6F] text-white shadow-xs' : 'bg-[#FFF8F0] text-[#5B6474] hover:bg-[#7FD4C4]/20 border border-[#8F8575]/20'"
          >
            {{ kelas }}
          </button>
        </div>
      </div>

      <!-- AREA DAFTAR PESAN (CHAT BODY) -->
      <div
        ref="chatContainerRef"
        class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF8F0]/50"
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
            class="max-w-[85%] bg-gradient-to-br from-[#1E7A6F] to-[#165B53] text-white p-3.5 rounded-2xl rounded-br-xs shadow-sm space-y-2"
          >
            <!-- Lampiran Foto jika ada -->
            <div v-if="msg.photoUrl" class="rounded-xl overflow-hidden border-2 border-white/30 max-h-48 bg-black/10">
              <img :src="msg.photoUrl" alt="Foto soal siswa" class="w-full h-auto object-cover" />
            </div>
            <p class="text-sm font-normal leading-relaxed whitespace-pre-wrap">
              {{ msg.text }}
            </p>
          </div>

          <!-- Bubble Pesan Kak Defi -->
          <div
            v-else
            class="max-w-[90%] flex items-start gap-2.5"
          >
            <!-- Defi Avatar Bubble -->
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white flex items-center justify-center shrink-0 shadow-xs border border-white mt-1">
              <Bot class="w-4 h-4" />
            </div>

            <!-- Kartu Jawaban -->
            <div class="bg-white p-3.5 sm:p-4 rounded-2xl rounded-tl-xs border-2 border-[#8F8575]/20 shadow-xs text-[#2B3445] space-y-2.5">
              
              <!-- Badge Kategori Jawaban -->
              <div class="flex items-center justify-between gap-2 border-b border-[#8F8575]/15 pb-1.5">
                <span
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border"
                  :class="getSourceBadge(msg.sumber).color"
                >
                  <component :is="getSourceBadge(msg.sumber).icon" class="w-3 h-3" />
                  <span>{{ getSourceBadge(msg.sumber).label }}</span>
                </span>

                <!-- Tombol Dengarkan Jawaban -->
                <button
                  type="button"
                  @click="speakMessage(msg.id, msg.text)"
                  class="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E7A6F] hover:text-[#165B53] transition cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-[#7FD4C4]/15"
                  :title="currentlySpeakingId === msg.id ? 'Hentikan suara' : 'Dengarkan suara Kak Defi'"
                >
                  <Volume2 class="w-3.5 h-3.5" :class="currentlySpeakingId === msg.id ? 'animate-pulse text-[#D97706]' : ''" />
                  <span>{{ currentlySpeakingId === msg.id ? 'Membaca...' : 'Dengarkan' }}</span>
                </button>
              </div>

              <!-- Teks Jawaban Ramah Anak -->
              <div
                class="text-sm leading-relaxed font-normal text-[#2B3445] whitespace-pre-wrap space-y-1.5"
                v-html="formatMarkdown(msg.text)"
              ></div>

              <!-- Notifikasi Fallback Ramah jika server offline -->
              <div v-if="msg.isFallback" class="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
                <AlertCircle class="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>Tips: Jalankan server di terminal dengan <code>uvicorn main:app --reload</code> untuk AI & 420+ materi lengkap.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- QUICK CHIPS SUGGESTIONS (Hanya muncul jika baru mulai) -->
        <div v-if="messages.length <= 2" class="pt-2 space-y-1.5">
          <p class="text-[11px] font-bold text-[#5B6474] uppercase tracking-wider flex items-center gap-1">
            <Sparkles class="w-3 h-3 text-[#1E7A6F]" />
            <span>Coba tanyakan contoh ini:</span>
          </p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(chip, idx) in quickChips"
              :key="idx"
              type="button"
              @click="sendChip(chip.text)"
              class="px-3 py-1.5 rounded-xl bg-white border border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 text-[#2B3445] text-xs font-medium transition cursor-pointer text-left shadow-2xs active:scale-95"
            >
              {{ chip.label }}
            </button>
          </div>
        </div>

        <!-- INDIKATOR DEFI SEDANG BERPIKIR (TYPING INDICATOR) -->
        <div v-if="isLoading" class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white flex items-center justify-center shrink-0 shadow-xs border border-white mt-1 animate-pulse">
            <Bot class="w-4 h-4" />
          </div>
          <div class="bg-white px-4 py-3 rounded-2xl rounded-tl-xs border-2 border-[#8F8575]/20 shadow-xs flex items-center gap-2">
            <span class="text-xs text-[#5B6474] font-medium">Kak Defi sedang berpikir</span>
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-[#1E7A6F] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span class="w-1.5 h-1.5 bg-[#1E7A6F] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span class="w-1.5 h-1.5 bg-[#1E7A6F] rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>

      </div>

      <!-- PRATINJAU FOTO TERPILIH (JIKA ADA FOTO YANG AKAN DIUNGGAH) -->
      <div v-if="photoPreviewUrl" class="px-4 py-2.5 bg-white border-t border-[#8F8575]/20 flex items-center justify-between gap-3 shrink-0">
        <div class="flex items-center gap-2.5 overflow-hidden">
          <img :src="photoPreviewUrl" alt="Thumbnail foto" class="w-10 h-10 object-cover rounded-lg border border-[#1E7A6F]" />
          <div class="truncate text-xs">
            <p class="font-bold text-[#2B3445] truncate">{{ selectedPhoto?.name }}</p>
            <p class="text-[11px] text-[#1E7A6F]">Foto siap dikirim ke Kak Defi 📸</p>
          </div>
        </div>
        <button
          type="button"
          @click="removeSelectedPhoto"
          class="p-1 rounded-lg text-[#8F8575] hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
          title="Batalkan foto"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- FOOTER FORM INPUT PESAN -->
      <footer class="p-3 bg-white border-t border-[#8F8575]/20 shrink-0">
        <form @submit.prevent="handleSend" class="flex items-center gap-2">
          
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
            class="p-2.5 rounded-2xl border-2 transition cursor-pointer shrink-0"
            :class="selectedPhoto ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] text-[#1E7A6F]' : 'border-[#8F8575]/25 text-[#5B6474] hover:border-[#1E7A6F] hover:bg-[#FFF8F0]'"
            title="Kirim Foto Soal / Catatan"
          >
            <ImageIcon class="w-5 h-5" />
          </button>

          <!-- Input Teks -->
          <div class="relative flex-1">
            <input
              v-model="inputText"
              type="text"
              :placeholder="selectedPhoto ? 'Tuliskan pertanyaan foto ini...' : 'Tanya apa saja ke Kak Defi...'"
              class="w-full py-2.5 pl-3.5 pr-2 rounded-2xl bg-[#FFF8F0]/70 border-2 border-[#8F8575]/25 focus:border-[#1E7A6F] focus:bg-white text-sm text-[#2B3445] placeholder-[#8F8575] focus:outline-none transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Tombol Kirim -->
          <button
            type="submit"
            :disabled="(!inputText.trim() && !selectedPhoto) || isLoading"
            class="p-2.5 rounded-2xl bg-gradient-to-tr from-[#1E7A6F] to-[#7FD4C4] text-white shadow-xs hover:shadow-md transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 active:scale-95"
            title="Kirim Pesan"
          >
            <Send class="w-5 h-5" />
          </button>
        </form>

        <div class="mt-2 text-center text-[10px] text-[#8F8575]">
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
