<script setup>
import { ref, watch, onMounted } from 'vue'
import { currentUser, updateUserProfile, isAdmin } from '../lib/authService'
import {
  X,
  User,
  Palette,
  Eye,
  Check,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Coffee,
  Sliders,
  ShieldCheck,
  Mail,
  Zap
} from '@lucide/vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  initialTab: { type: String, default: 'theme' }
})

const emit = defineEmits(['close', 'updated'])

// Tab state
const activeTab = ref(props.initialTab)
watch(() => props.initialTab, (val) => { activeTab.value = val })

// Profile Form State
const editedName = ref('')
const selectedAvatar = ref('👧')
const profileSaveSuccess = ref(false)
const profileSaveError = ref('')

const AVATAR_OPTIONS = [
  { emoji: '👧', label: 'Anak Perempuan' },
  { emoji: '👦', label: 'Anak Laki-laki' },
  { emoji: '🦊', label: 'Rubah Cerdas' },
  { emoji: '🐼', label: 'Panda Bijak' },
  { emoji: '🚀', label: 'Penjelajah Roket' },
  { emoji: '🛡️', label: 'Penjaga Tangguh' },
  { emoji: '🦉', label: 'Burung Hantu Cermat' },
  { emoji: '🎨', label: 'Seniman Kreatif' },
  { emoji: '🐱', label: 'Kucing Ceria' },
  { emoji: '🐶', label: 'Anjing Sahabat' },
  { emoji: '🌟', label: 'Bintang Terang' },
  { emoji: '🦁', label: 'Singa Berani' }
]

// Theme State
const currentTheme = ref('light')
const THEME_OPTIONS = [
  {
    id: 'light',
    name: 'Prisma Biru',
    badge: 'Standar Ceria',
    desc: 'Warna biru cerah khas Prisma, ramah untuk aktivitas belajar harian.',
    icon: Sun,
    bgClass: 'bg-gradient-to-br from-[#3DA5FF] to-[#0F3261]',
    textColor: 'text-[#3587CE]'
  },
  {
    id: 'soft',
    name: 'Pastel Hangat',
    badge: 'Ramah Mata',
    desc: 'Nuansa sepia lembut yang meredakan ketegangan mata saat membaca lama.',
    icon: Coffee,
    bgClass: 'bg-gradient-to-br from-[#FFE4C4] to-[#D9A066]',
    textColor: 'text-amber-700'
  },
  {
    id: 'dark',
    name: 'Mode Gelap',
    badge: 'Malam / Fokus',
    desc: 'Tampilan gelap elegan untuk kenyamanan belajar di ruangan redup.',
    icon: Moon,
    bgClass: 'bg-gradient-to-br from-slate-800 to-slate-950',
    textColor: 'text-indigo-400'
  },
  {
    id: 'contrast',
    name: 'Kontras Tinggi',
    badge: 'Aksesibilitas',
    desc: 'Garis dan batas kontras diperjelas untuk kemudahan visual maksimal.',
    icon: Eye,
    bgClass: 'bg-gradient-to-br from-black to-yellow-500',
    textColor: 'text-yellow-600'
  }
]

// Accessibility Preferences State
const fontSize = ref('xl') // 'normal' | 'lg' | 'xl'
const dyslexicFont = ref(false)
const soundEffects = ref(true)
const reduceMotion = ref(false)

// Init data from localStorage & currentUser
const syncFromStorage = () => {
  if (currentUser.value) {
    editedName.value = currentUser.value.name || ''
    selectedAvatar.value = currentUser.value.avatar || '👧'
  }

  // Theme
  const savedTheme = localStorage.getItem('prisma_theme') || 'light'
  currentTheme.value = savedTheme
  applyTheme(savedTheme)

  // Font size
  const savedFontSize = localStorage.getItem('prisma_font_size') || 'xl'
  fontSize.value = savedFontSize
  applyFontSize(savedFontSize)

  // Dyslexic font
  const savedDyslexic = localStorage.getItem('prisma_dyslexic_font') === 'true'
  dyslexicFont.value = savedDyslexic
  applyDyslexicFont(savedDyslexic)

  // Sound effects
  const savedSound = localStorage.getItem('prisma_sound_effects') !== 'false'
  soundEffects.value = savedSound

  // Reduced motion
  const savedMotion = localStorage.getItem('prisma_reduce_motion') === 'true'
  reduceMotion.value = savedMotion
  applyReduceMotion(savedMotion)
}

watch(() => props.isOpen, (open) => {
  if (open) {
    syncFromStorage()
    profileSaveSuccess.value = false
    profileSaveError.value = ''
  }
})

onMounted(() => {
  syncFromStorage()
})

// Action: Save Profile
const handleSaveProfile = async () => {
  profileSaveSuccess.value = false
  profileSaveError.value = ''

  if (!editedName.value.trim()) {
    profileSaveError.value = 'Nama lengkap tidak boleh kosong.'
    return
  }

  try {
    const updated = await updateUserProfile({
      name: editedName.value.trim(),
      avatar: selectedAvatar.value
    })
    if (updated) {
      profileSaveSuccess.value = true
      emit('updated', updated)
      setTimeout(() => {
        profileSaveSuccess.value = false
      }, 3000)
    }
  } catch (e) {
    profileSaveError.value = 'Gagal menyimpan profil: ' + (e.message || 'Terjadi kesalahan')
  }
}

// Action: Apply Theme
const applyTheme = (themeId) => {
  const root = document.documentElement
  root.classList.remove('theme-light', 'theme-soft', 'theme-dark', 'theme-contrast')
  root.classList.add(`theme-${themeId}`)
}

const selectTheme = (themeId) => {
  currentTheme.value = themeId
  localStorage.setItem('prisma_theme', themeId)
  applyTheme(themeId)
}

// Action: Font Size
const applyFontSize = (size) => {
  const root = document.documentElement
  root.classList.remove('font-size-lg', 'font-size-xl')
  if (size === 'lg') root.classList.add('font-size-lg')
  if (size === 'xl') root.classList.add('font-size-xl')
}

const selectFontSize = (size) => {
  fontSize.value = size
  localStorage.setItem('prisma_font_size', size)
  applyFontSize(size)
}

// Action: Dyslexic Font
const applyDyslexicFont = (enabled) => {
  const root = document.documentElement
  if (enabled) {
    root.classList.add('font-dyslexic')
  } else {
    root.classList.remove('font-dyslexic')
  }
}

const toggleDyslexicFont = () => {
  dyslexicFont.value = !dyslexicFont.value
  localStorage.setItem('prisma_dyslexic_font', String(dyslexicFont.value))
  applyDyslexicFont(dyslexicFont.value)
}

// Action: Sound Effects
const toggleSoundEffects = () => {
  soundEffects.value = !soundEffects.value
  localStorage.setItem('prisma_sound_effects', String(soundEffects.value))
}

// Action: Reduced Motion
const applyReduceMotion = (enabled) => {
  const root = document.documentElement
  if (enabled) {
    root.classList.add('reduce-motion')
  } else {
    root.classList.remove('reduce-motion')
  }
}

const toggleReduceMotion = () => {
  reduceMotion.value = !reduceMotion.value
  localStorage.setItem('prisma_reduce_motion', String(reduceMotion.value))
  applyReduceMotion(reduceMotion.value)
}
</script>

<template>
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
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B3445]/60 backdrop-blur-sm overflow-y-auto"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#8F8575]/30 animate-slide-up my-8 max-h-[90vh] flex flex-col"
        >
          <!-- Header Banner (PRISMA Design System: Mint Tua) -->
          <div
            class="relative px-6 sm:px-8 pt-7 pb-6 text-white shrink-0 overflow-hidden bg-[#1E7A6F]"
          >
            <div class="relative z-10 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-white/20 border border-white/25 flex items-center justify-center text-2xl shadow-inner backdrop-blur-sm">
                  ⚙️
                </div>
                <div>
                  <h3 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold tracking-tight text-white">Pengaturan & Preferensi</h3>
                  <p class="font-['Lexend'] text-xs sm:text-sm text-[#FFF8F0]/90 font-normal">Sesuaikan tema visual dan kenyamanan belajarmu</p>
                </div>
              </div>
              <button
                @click="emit('close')"
                class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
                title="Tutup"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Tab Switcher -->
            <div class="flex items-center gap-2 mt-6 p-1.5 bg-black/20 backdrop-blur-md rounded-2xl border border-white/15">
              <button
                @click="activeTab = 'theme'"
                :class="[
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                  activeTab === 'theme'
                    ? 'bg-white text-[#1E7A6F] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                ]"
              >
                <Palette class="w-4 h-4" />
                <span>Tema</span>
              </button>

              <button
                @click="activeTab = 'accessibility'"
                :class="[
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                  activeTab === 'accessibility'
                    ? 'bg-white text-[#1E7A6F] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                ]"
              >
                <Sliders class="w-4 h-4" />
                <span>Aksesibilitas</span>
              </button>

              <button
                v-if="isAdmin"
                @click="activeTab = 'profile'"
                :class="[
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                  activeTab === 'profile'
                    ? 'bg-white text-[#1E7A6F] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                ]"
              >
                <User class="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <!-- Body Content (Scrollable, Warm Krem background) -->
          <div class="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FFF8F0] font-['Lexend'] text-left">

            <!-- TAB 1: PROFIL PENGGUNA -->
            <div v-if="activeTab === 'profile'" class="space-y-6">
              <!-- Success Alert -->
              <div
                v-if="profileSaveSuccess"
                class="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#7FD4C4]/25 border border-[#7FD4C4] text-[#2B3445] text-xs sm:text-sm font-semibold animate-slide-up"
              >
                <CheckCircle2 class="w-5 h-5 text-[#1E7A6F] shrink-0" />
                <span>Profil dan avatar berhasil diperbarui.</span>
              </div>

              <!-- Error Alert -->
              <div
                v-if="profileSaveError"
                class="p-3 rounded-2xl bg-[#FFDE7A]/30 border border-[#FFDE7A] text-[#2B3445] text-xs sm:text-sm font-semibold"
              >
                {{ profileSaveError }}
              </div>

              <!-- Avatar Preview & Selector -->
              <div class="card-prisma p-5 bg-white flex flex-col sm:flex-row items-center gap-6">
                <!-- Large Avatar Preview -->
                <div class="relative shrink-0">
                  <div
                    class="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-sm border-2 border-[#8F8575]/25 bg-[#FFF8F0]"
                  >
                    {{ selectedAvatar }}
                  </div>
                  <div class="absolute -bottom-1 -right-1 bg-[#1E7A6F] text-white rounded-full p-1 border-2 border-white shadow-xs">
                    <Check class="w-3.5 h-3.5" />
                  </div>
                </div>

                <div class="flex-1 text-center sm:text-left">
                  <h4 class="font-['Baloo_2'] text-base font-bold text-[#2B3445]">Pilih Avatar Karakter</h4>
                  <p class="text-xs text-[#5B6474] mt-0.5">Pilih ikon yang paling menggambarkan kepribadian belajarmu:</p>
                  
                  <!-- Avatar Grid -->
                  <div class="grid grid-cols-6 gap-2 mt-3 max-w-xs sm:max-w-none">
                    <button
                      v-for="item in AVATAR_OPTIONS"
                      :key="item.emoji"
                      type="button"
                      @click="selectedAvatar = item.emoji"
                      :title="item.label"
                      :class="[
                        'w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all duration-150 cursor-pointer border',
                        selectedAvatar === item.emoji
                          ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm scale-105'
                          : 'bg-white hover:bg-[#FFF8F0] border-[#8F8575]/30 text-[#2B3445]'
                      ]"
                    >
                      {{ item.emoji }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Input Form -->
              <div class="card-prisma p-5 bg-white space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-[#2B3445] mb-1.5 uppercase tracking-wide">
                    Nama Tampilan
                  </label>
                  <div class="relative">
                    <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6474]" />
                    <input
                      v-model="editedName"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8F8575]/30 bg-[#FFF8F0] focus:border-[#1E7A6F] text-xs font-medium text-[#2B3445] outline-none transition"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-[#2B3445] mb-1.5 uppercase tracking-wide">
                      Email Akun
                    </label>
                    <div class="relative">
                      <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6474]" />
                      <input
                        :value="currentUser?.email || 'Belum masuk'"
                        type="email"
                        disabled
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8F8575]/25 bg-white text-xs font-medium text-[#5B6474] cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-[#2B3445] mb-1.5 uppercase tracking-wide">
                      Peran Akun
                    </label>
                    <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]">
                      <ShieldCheck class="w-4 h-4 shrink-0 text-[#1E7A6F]" />
                      <span class="text-xs font-semibold text-[#2B3445]">
                        {{ isAdmin ? 'Guru / Pengajar' : 'Siswa / Pengguna Belajar' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button
                  type="button"
                  @click="handleSaveProfile"
                  class="btn-prisma-mint w-full py-3.5 px-6 font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>
            </div>

            <!-- TAB 2: TEMA TAMPILAN -->
            <div v-if="activeTab === 'theme'" class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-['Baloo_2'] text-base font-bold text-[#2B3445]">Pilih Gaya Tampilan</h4>
                  <p class="text-xs text-[#5B6474]">Pilih tema warna yang paling nyaman di matamu saat belajar.</p>
                </div>
                <span class="text-xs font-semibold px-3 py-1 bg-white text-[#1E7A6F] rounded-full border border-[#8F8575]/30">
                  Aktif: {{ THEME_OPTIONS.find(t => t.id === currentTheme)?.name || 'Prisma Biru' }}
                </span>
              </div>

              <!-- Theme Cards Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="theme in THEME_OPTIONS"
                  :key="theme.id"
                  @click="selectTheme(theme.id)"
                  :class="[
                    'relative p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between',
                    currentTheme === theme.id
                      ? 'border-2 border-[#1E7A6F] bg-white ring-2 ring-[#1E7A6F]/20 text-[#2B3445]'
                      : 'border-[#8F8575]/30 bg-white text-[#2B3445] hover:border-[#1E7A6F]'
                  ]"
                >
                  <!-- Card Header -->
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2.5">
                      <div :class="['w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs', theme.bgClass]">
                        <component :is="theme.icon" class="w-5 h-5" />
                      </div>
                      <div>
                        <p class="font-['Baloo_2'] text-sm font-bold text-[#2B3445]">{{ theme.name }}</p>
                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF8F0] border border-[#8F8575]/25 text-[#2B3445]">
                          {{ theme.badge }}
                        </span>
                      </div>
                    </div>

                    <!-- Active Radio Indicator -->
                    <div
                      :class="[
                        'w-6 h-6 rounded-full flex items-center justify-center border transition',
                        currentTheme === theme.id
                          ? 'border-[#1E7A6F] bg-[#1E7A6F] text-white'
                          : 'border-[#8F8575]/40 bg-white'
                      ]"
                    >
                      <Check v-if="currentTheme === theme.id" class="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p class="text-xs text-[#5B6474] leading-relaxed">{{ theme.desc }}</p>
                </div>
              </div>
            </div>

            <!-- TAB 3: AKSESIBILITAS & PREFERENSI -->
            <div v-if="activeTab === 'accessibility'" class="space-y-6">
              <div>
                <h4 class="font-['Baloo_2'] text-base font-bold text-[#2B3445]">Penyesuaian Aksesibilitas</h4>
                <p class="text-xs text-[#5B6474]">Fitur inklusif untuk kenyamanan membaca, visual, dan sensori.</p>
              </div>

              <!-- 1. Text Size Option -->
              <div class="card-prisma p-4 bg-white space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🔤</span>
                    <label class="text-xs font-semibold text-[#2B3445] uppercase tracking-wide">
                      Skala Ukuran Huruf / Teks
                    </label>
                  </div>
                  <span class="text-xs font-semibold text-[#5B6474]">
                    {{ fontSize === 'normal' ? 'Normal (100%)' : fontSize === 'lg' ? 'Besar (110%)' : 'Ekstra Besar (120%)' }}
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    @click="selectFontSize('normal')"
                    :class="[
                      'py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer text-center',
                      fontSize === 'normal'
                        ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                        : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                    ]"
                  >
                    Normal (A)
                  </button>
                  <button
                    type="button"
                    @click="selectFontSize('lg')"
                    :class="[
                      'py-2 px-3 rounded-xl border text-sm font-semibold transition cursor-pointer text-center',
                      fontSize === 'lg'
                        ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                        : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                    ]"
                  >
                    Besar (A+)
                  </button>
                  <button
                    type="button"
                    @click="selectFontSize('xl')"
                    :class="[
                      'py-2 px-3 rounded-xl border text-base font-semibold transition cursor-pointer text-center',
                      fontSize === 'xl'
                        ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                        : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                    ]"
                  >
                    Ekstra (A++)
                  </button>
                </div>
              </div>

              <!-- 2. Dyslexia Font Toggle -->
              <div class="card-prisma p-4 bg-white flex items-center justify-between gap-4">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="text-base">📖</span>
                    <span class="text-xs font-semibold text-[#2B3445] uppercase tracking-wide">Font Ramah Disleksia</span>
                  </div>
                  <p class="text-xs text-[#5B6474]">Bentuk huruf lebih lebar untuk mencegah pembalikan karakter.</p>
                </div>
                <button
                  type="button"
                  @click="toggleDyslexicFont"
                  :class="[
                    'w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 border border-[#8F8575]/25',
                    dyslexicFont ? 'bg-[#1E7A6F]' : 'bg-[#FFF8F0]'
                  ]"
                >
                  <div
                    :class="[
                      'w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200',
                      dyslexicFont ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>

              <!-- 3. Sound Effects Toggle -->
              <div class="card-prisma p-4 bg-white flex items-center justify-between gap-4">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2">
                    <component :is="soundEffects ? Volume2 : VolumeX" class="w-4 h-4 text-[#1E7A6F]" />
                    <span class="text-xs font-semibold text-[#2B3445] uppercase tracking-wide">Efek Suara Gamifikasi</span>
                  </div>
                  <p class="text-xs text-[#5B6474]">Bunyi klik tombol, apresiasi kuis berhasil, dan umpan balik interaktif.</p>
                </div>
                <button
                  type="button"
                  @click="toggleSoundEffects"
                  :class="[
                    'w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 border border-[#8F8575]/25',
                    soundEffects ? 'bg-[#1E7A6F]' : 'bg-[#FFF8F0]'
                  ]"
                >
                  <div
                    :class="[
                      'w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200',
                      soundEffects ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>

              <!-- 4. Reduced Motion Toggle -->
              <div class="card-prisma p-4 bg-white flex items-center justify-between gap-4">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🧘</span>
                    <span class="text-xs font-semibold text-[#2B3445] uppercase tracking-wide">Kurangi Gerakan Animasi</span>
                  </div>
                  <p class="text-xs text-[#5B6474]">Meredam getaran dan animasi bagi pengguna yang sensitif gerak.</p>
                </div>
                <button
                  type="button"
                  @click="toggleReduceMotion"
                  :class="[
                    'w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 border border-[#8F8575]/25',
                    reduceMotion ? 'bg-[#1E7A6F]' : 'bg-[#FFF8F0]'
                  ]"
                >
                  <div
                    :class="[
                      'w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200',
                      reduceMotion ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div class="px-6 py-4 bg-white border-t border-[#8F8575]/20 flex items-center justify-between shrink-0">
            <span class="text-xs text-[#5B6474] font-normal">PRISMA • Media Belajar Ramah Anak & Inklusif</span>
            <button
              type="button"
              @click="emit('close')"
              class="btn-prisma-white px-5 py-2 text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
