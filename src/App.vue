<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  Search,
  ArrowRight,
  Target,
  Accessibility,
  Gamepad2,
  LogOut,
  User,
  GraduationCap,
  Settings,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Headphones,
  Type,
  Clock,
  ShieldCheck,
  BookOpen,
  Mail,
  Award,
  Heart,
  Smile,
  Users,
  CheckCircle2,
  FileText,
  Check,
  Brain,
  Menu,
  X,
  Home,
  Compass,
  Star,
  Edit3,
  MessageSquareHeart,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Eye,
  Film,
  PauseCircle,
  Maximize2
} from '@lucide/vue'
import MateriView from './components/MateriView.vue'
import MateriDetailView from './components/MateriDetailView.vue'
import LearningPlayerView from './components/LearningPlayerView.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import AuthModal from './components/AuthModal.vue'
import SettingsModal from './components/SettingsModal.vue'
import SettingsView from './components/SettingsView.vue'
import DoodleOrnament from './components/DoodleOrnament.vue'
import ChatbotWidget from './components/ChatbotWidget.vue'
import {
  getAllDisplayReviews,
  fetchSiteReviewsFromSupabase
} from './lib/reviewService.js'
import {
  materiList,
  selectedMateri,
  isLoadingMateri,
  getKelasFromLevel,
  KELAS_SD_OPTIONS
} from './lib/materiService'
import {
  currentUser,
  isAuthenticated,
  isAdmin,
  logoutUser
} from './lib/authService'
import {
  canAccessRoute,
  ADMIN_ROUTES
} from './lib/navigationMiddleware'
import {
  playMascotChime,
  playButtonPop,
  toggleSound,
  isSoundEnabled
} from './lib/soundEffects'

// Interactive State for Section 1: Pilar Nilai & Aksesibilitas
const isDyslexiaDemoActive = ref(false)
const isAudioNarrationPlaying = ref(false)
const playAudioNarrationSample = () => {
  isAudioNarrationPlaying.value = true
  playMascotChime()
  setTimeout(() => {
    isAudioNarrationPlaying.value = false
  }, 3200)
}

// Interactive State for Section 2: Pratinjau Materi Filter Tabs (Kelas 1 s/d 6 SD)
const selectedKelasTab = ref('Semua') // 'Semua' | 'Kelas 1' ... 'Kelas 6'
const showAdminLoginModal = ref(false)
const isSettingsModalOpen = ref(false)

// Data materi bersumber langsung dari database (materiService.js)
const displayedLandingModules = computed(() => {
  return (materiList.value || []).map((item) => {
    const kelasStr = getKelasFromLevel(item.level)
    return {
      id: item.id,
      originalItem: item,
      title: item.title,
      jenjang: 'SD',
      kelas: kelasStr,
      category: (item.mataPelajaran || 'Umum').toLowerCase(),
      mataPelajaran: item.mataPelajaran || 'Umum',
      ageLabel: kelasStr,
      badges: Array.isArray(item.types) && item.types.length ? item.types : ['Video', 'Interaktif'],
      summary: item.description || 'Materi pembelajaran adaptif dan interaktif Prisma.',
      image: item.image || '/es_batu_card.jpg',
      isPro: false,
      isFree: true
    }
  })
})

// Filter berdasarkan kelas SD ('Semua', 'Kelas 1' s/d 'Kelas 6') dan ambil 4 materi teratas
const filteredLandingModules = computed(() => {
  let list = displayedLandingModules.value
  if (selectedKelasTab.value !== 'Semua') {
    list = list.filter((m) => m.kelas === selectedKelasTab.value)
  }
  // Ambil 4 materi teratas
  return list.slice(0, 4)
})

const handleModuleClick = (mod) => {
  playButtonPop()
  handleOpenDetail(mod.originalItem || mod)
}

// URL Hash & Session Persistence Helpers
const ALL_KNOWN_ROUTES = [
  'beranda',
  'materi',
  'materi-detail',
  'learning-player',
  'admin',
  'settings'
]

const normalizeRoute = (raw) => {
  if (!raw) return ''
  try {
    const clean = decodeURIComponent(raw).replace(/^#\/?/, '').trim().toLowerCase().replace(/[\s_]+/g, '-')
    if (clean === 'materi-detail') return 'learning-player'
    return ALL_KNOWN_ROUTES.includes(clean) ? clean : ''
  } catch {
    const fallback = raw.replace(/^#\/?/, '').trim().toLowerCase().replace(/[\s_]+/g, '-')
    if (fallback === 'materi-detail') return 'learning-player'
    return ALL_KNOWN_ROUTES.includes(fallback) ? fallback : ''
  }
}

const getInitialRoute = () => {
  const normalized = normalizeRoute(window.location.hash)
  if (normalized) {
    return normalized
  }
  const storedNav = sessionStorage.getItem('prisma_current_nav')
  if (storedNav && ALL_KNOWN_ROUTES.includes(storedNav)) {
    return storedNav
  }
  return 'beranda'
}

// Navigation state
const initialRouteCandidate = getInitialRoute()
const initialGuard = canAccessRoute(initialRouteCandidate)
const currentNav = ref(initialGuard.allowed ? initialRouteCandidate : 'beranda')
const searchQuery = ref('')

// Sound state
const soundActive = ref(true)
const handleToggleSound = () => {
  soundActive.value = toggleSound()
}



// Active item tracking
const getStoredOrInitialActiveMateri = () => {
  const storedId = sessionStorage.getItem('prisma_active_materi_id')
  if (storedId && materiList.value.length) {
    const found = materiList.value.find((m) => String(m.id) === String(storedId))
    if (found) return found
  }
  return materiList.value.length ? materiList.value[0] : null
}
const activeMateriItem = ref(getStoredOrInitialActiveMateri())

// Settings state
const previousNav = ref('beranda')
const settingsInitialTab = ref('theme')
const openSettings = (tab = 'theme') => {
  settingsInitialTab.value = tab
  isSettingsModalOpen.value = true
}

// Dynamic Website Reviews State & Carousel (Max 6 reviews per slide)
const displayReviews = ref(getAllDisplayReviews())
const refreshDisplayReviews = () => {
  displayReviews.value = getAllDisplayReviews()
}

const currentReviewPage = ref(0)
const REVIEWS_PER_PAGE = 6

const reviewPages = computed(() => {
  const pages = []
  const list = displayReviews.value || []
  for (let i = 0; i < list.length; i += REVIEWS_PER_PAGE) {
    pages.push(list.slice(i, i + REVIEWS_PER_PAGE))
  }
  return pages.length ? pages : [[]]
})

const totalReviewPages = computed(() => reviewPages.value.length)

const nextReviewPage = () => {
  if (currentReviewPage.value < totalReviewPages.value - 1) {
    currentReviewPage.value++
  } else {
    currentReviewPage.value = 0 // loop to first
  }
}

const prevReviewPage = () => {
  if (currentReviewPage.value > 0) {
    currentReviewPage.value--
  } else {
    currentReviewPage.value = totalReviewPages.value - 1 // loop to last
  }
}

const goToReviewPage = (idx) => {
  currentReviewPage.value = idx
}

// Touch swipe gestures for mobile & tablet
let reviewTouchStartX = 0
let reviewTouchEndX = 0
const handleReviewTouchStart = (e) => {
  if (e.touches && e.touches[0]) {
    reviewTouchStartX = e.touches[0].screenX
  }
}
const handleReviewTouchEnd = (e) => {
  if (e.changedTouches && e.changedTouches[0]) {
    reviewTouchEndX = e.changedTouches[0].screenX
    const diff = reviewTouchStartX - reviewTouchEndX
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextReviewPage()
      } else {
        prevReviewPage()
      }
    }
  }
}

const handleAdminAuthenticated = (user) => {
  showAdminLoginModal.value = false
  currentNav.value = 'admin'
  updateHashAndStorage('admin')
}

const updateHashAndStorage = (route) => {
  if (route && ALL_KNOWN_ROUTES.includes(route)) {
    const currentHash = window.location.hash || ''
    if (currentHash.includes('access_token') || currentHash.includes('type=') || currentHash.includes('error=')) {
      sessionStorage.setItem('prisma_current_nav', route)
      return
    }
    if (window.location.hash !== `#${route}`) {
      window.history.replaceState(null, '', `#${route}`)
    }
    sessionStorage.setItem('prisma_current_nav', route)
  }
}

const handleLogout = async () => {
  await logoutUser()
  sessionStorage.removeItem('prisma_current_nav')
  sessionStorage.removeItem('prisma_active_materi_id')
  sessionStorage.removeItem('prisma_chosen_mode')
  currentNav.value = 'beranda'
  updateHashAndStorage('beranda')
}

// Smart Auto-Hiding Navbar State
const isNavVisible = ref(true)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
let lastScrollY = 0
let scrollTicking = false

const handleWindowScroll = () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      isScrolled.value = currentScrollY > 20

      // If mobile dropdown menu is open, keep navbar visible
      if (isMobileMenuOpen.value) {
        isNavVisible.value = true
        lastScrollY = Math.max(0, currentScrollY)
        scrollTicking = false
        return
      }

      // Di dalam materi, materi-detail, dan learning-player, navbar selalu tetap tampil (tidak ter-hide saat scroll)
      if (['materi', 'materi-detail', 'learning-player'].includes(currentNav.value)) {
        isNavVisible.value = true
        lastScrollY = Math.max(0, currentScrollY)
        scrollTicking = false
        return
      }

      // Always show when near the very top of the page
      if (currentScrollY <= 30) {
        isNavVisible.value = true
      } else {
        const diff = currentScrollY - lastScrollY
        // Delta threshold to ignore tiny micro-movements
        if (Math.abs(diff) > 6) {
          if (diff > 0 && currentScrollY > 80) {
            // Scrolling DOWN -> hide navbar smoothly
            isNavVisible.value = false
          } else if (diff < 0) {
            // Scrolling UP -> reveal navbar immediately (never gets lost/tenggelam!)
            isNavVisible.value = true
          }
        }
      }

      lastScrollY = Math.max(0, currentScrollY)
      scrollTicking = false
    })
    scrollTicking = true
  }
}

const handleHashChange = () => {
  const route = normalizeRoute(window.location.hash) || 'beranda'
  if (ALL_KNOWN_ROUTES.includes(route) && route !== currentNav.value) {
    const guard = canAccessRoute(route)
    if (guard.allowed) {
      currentNav.value = route
    } else {
      navigateToAuth(guard.tab || 'login', guard.reason)
    }
  }
}

// Intersection Observer helper for Scroll Reveal Animations
const initScrollObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
        }
      })
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    }
  )

  setTimeout(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom')
    targets.forEach((el) => observer.observe(el))
  }, 100)
}

onMounted(async () => {
  window.addEventListener('scroll', handleWindowScroll, { passive: true })
  window.addEventListener('hashchange', handleHashChange)
  await fetchSiteReviewsFromSupabase()
  refreshDisplayReviews()

  const initialRoute = getInitialRoute()
  const guard = canAccessRoute(initialRoute)
  if (guard.allowed) {
    currentNav.value = initialRoute
  } else {
    currentNav.value = 'beranda'
  }
  updateHashAndStorage(currentNav.value)
  initScrollObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll)
  window.removeEventListener('hashchange', handleHashChange)
})

/**
 * Navigation Handler
 */
const navigateTo = (tab) => {
  isMobileMenuOpen.value = false
  isNavVisible.value = true
  if (currentNav.value !== 'settings') {
    previousNav.value = currentNav.value
  }

  if (tab === 'admin' && !isAdmin.value) {
    showAdminLoginModal.value = true
    return false
  }

  currentNav.value = tab
  window.scrollTo({ top: 0, behavior: 'smooth' })
  return true
}

// Flow Handlers
const handleOpenDetail = (item) => {
  const targetItem = item || (materiList.value.length ? materiList.value[0] : null)
  if (targetItem) {
    activeMateriItem.value = targetItem
    sessionStorage.setItem('prisma_active_materi_id', String(targetItem.id))
  }
  currentNav.value = 'learning-player'
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const handleStartAdventure = (item) => {
  if (item) {
    activeMateriItem.value = item
    sessionStorage.setItem('prisma_active_materi_id', String(item.id))
  } else if (!activeMateriItem.value && materiList.value.length) {
    activeMateriItem.value = materiList.value[0]
  }
  currentNav.value = 'learning-player'
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const handleSwitchMateri = (newMateri) => {
  if (newMateri) {
    activeMateriItem.value = newMateri
    sessionStorage.setItem('prisma_active_materi_id', String(newMateri.id))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

const handlePreviewFromAdmin = (item) => {
  if (item) {
    activeMateriItem.value = item
    sessionStorage.setItem('prisma_active_materi_id', String(item.id))
  }
  currentNav.value = 'learning-player'
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// State restoration for activeMateriItem
const restoreActiveMateri = (list) => {
  const storedId = sessionStorage.getItem('prisma_active_materi_id')
  if (storedId && Array.isArray(list) && list.length) {
    const found = list.find((m) => String(m.id) === String(storedId))
    if (found) {
      activeMateriItem.value = found
      return
    }
  }
  if (['materi-detail', 'learning-player'].includes(currentNav.value) && !activeMateriItem.value && Array.isArray(list) && list.length) {
    activeMateriItem.value = list[0]
  }
}

watch(materiList, (newList) => {
  restoreActiveMateri(newList)
}, { immediate: true })

watch(activeMateriItem, (newItem) => {
  if (newItem && newItem.id) {
    sessionStorage.setItem('prisma_active_materi_id', String(newItem.id))
  }
})

// Selalu reset scroll ke posisi paling atas dan sync URL Hash serta re-trigger observer setiap kali berpindah halaman/rute
watch(currentNav, (newNav) => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  updateHashAndStorage(newNav)
  if (newNav === 'beranda') {
    initScrollObserver()
  }
}, { immediate: true })

// Active Admin Guard Watcher
watch([currentNav, isAdmin], ([newNav, isAdm]) => {
  if (newNav === 'admin' && !isAdm) {
    showAdminLoginModal.value = true
    currentNav.value = 'beranda'
  }
})
</script>

<template>
  <div class="w-full min-h-screen bg-[#FFF8F0] text-[#2B3445] font-['Lexend'] flex flex-col overflow-x-hidden relative">

    <!-- ==================== ULTRA-MODERN FLOATING NAVBAR ==================== -->
    <header
      v-if="currentNav !== 'admin'"
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-3 sm:px-6 lg:px-10',
        (isNavVisible || ['materi', 'materi-detail', 'learning-player'].includes(currentNav)) ? 'translate-y-0' : '-translate-y-full pointer-events-none',
        isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4'
      ]"
    >
      <!-- Floating Pill Container (PRISMA Design System) -->
      <div
        :class="[
          'w-full max-w-[1600px] mx-auto rounded-2xl sm:rounded-full border transition-all duration-300 px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 relative overflow-visible',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-[#8F8575]/30 shadow-md'
            : 'bg-white/90 backdrop-blur-md border-[#8F8575]/25 shadow-sm hover:bg-white'
        ]"
      >
        <!-- Left: Combined Logo + Desktop Segmented Nav -->
        <div class="flex items-center gap-3 sm:gap-5 lg:gap-8 min-w-0">
          <!-- Logo Image + Stylized Text -->
          <button
            @click="navigateTo('beranda')"
            class="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F] rounded-xl transition-transform active:scale-95"
            title="Prisma - Beranda"
          >
            <img
              src="/Logo.png"
              alt="Prisma Logo"
              class="h-8 sm:h-11 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span class="font-['Baloo_2'] text-xl sm:text-3xl font-bold tracking-tight text-[#2B3445] group-hover:text-[#1E7A6F] transition-colors leading-none">Prisma</span>
          </button>

          <!-- Nav Links -->
          <nav class="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              @click="navigateTo('beranda')"
              :class="[
                'h-10 px-4 rounded-full text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 select-none border',
                currentNav === 'beranda'
                  ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                  : 'bg-transparent text-[#2B3445] border-transparent hover:bg-[#FFF8F0] hover:text-[#1E7A6F]'
              ]"
            >
              <Home class="w-4 h-4 shrink-0" />
              <span>Beranda</span>
            </button>

            <button
              @click="navigateTo('materi')"
              :class="[
                'h-10 px-4 rounded-full text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 select-none border',
                ['materi', 'materi-detail'].includes(currentNav)
                  ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                  : 'bg-transparent text-[#2B3445] border-transparent hover:bg-[#FFF8F0] hover:text-[#1E7A6F]'
              ]"
            >
              <Compass class="w-4 h-4 shrink-0" />
              <span>Materi</span>
            </button>

            <button
              @click="navigateTo('admin')"
              :class="[
                'h-10 px-4 rounded-full text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 select-none border',
                currentNav === 'admin'
                  ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                  : 'bg-transparent text-[#2B3445] border-transparent hover:bg-[#FFF8F0] hover:text-[#1E7A6F]'
              ]"
            >
              <LayoutDashboard class="w-4 h-4 shrink-0 text-[#1E7A6F]" />
              <span>CMS Admin</span>
            </button>
          </nav>
        </div>

        <!-- Right: Actions & Admin State -->
        <div class="flex items-center gap-1.5 sm:gap-3 justify-end shrink-0">
          <!-- Accessibility / Theme Settings Button -->
          <button
            @click="openSettings('theme')"
            class="btn-prisma-white flex items-center justify-center gap-2 h-9 sm:h-10 px-2.5 sm:px-4 text-xs font-semibold cursor-pointer select-none shrink-0"
            title="Pengaturan Tampilan"
          >
            <Settings class="w-4 h-4 text-[#1E7A6F]" />
            <span class="hidden sm:inline">Tampilan</span>
          </button>

          <!-- Admin Logged In Pill -->
          <div v-if="isAdmin" class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8F0] border border-[#8F8575]/30 text-[#1E7A6F] text-xs font-semibold">
              Administrator
            </span>
            <button
              @click="handleLogout"
              class="btn-prisma-white h-9 sm:h-10 px-2.5 sm:px-3.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="Keluar dari mode admin"
            >
              <LogOut class="w-3.5 h-3.5 text-[#5B6474]" />
              <span class="hidden sm:inline">Keluar</span>
            </button>
          </div>

          <!-- Mobile Hamburger Toggle Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-full bg-[#FFF8F0] border border-[#8F8575]/30 text-[#2B3445] transition cursor-pointer shrink-0"
            aria-label="Toggle Menu"
          >
            <X v-if="isMobileMenuOpen" class="w-5 h-5 text-[#2B3445]" />
            <Menu v-else class="w-5 h-5 text-[#2B3445]" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu (PRISMA Design System) -->
      <transition name="dropdown">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-[#8F8575]/30 rounded-2xl px-5 py-4 space-y-3 shadow-lg overflow-hidden"
        >
          <!-- Mobile Search -->
          <div class="relative">
            <Search class="w-4 h-4 text-[#5B6474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari materi belajar..."
              class="w-full bg-[#FFF8F0] text-sm text-[#2B3445] pl-10 pr-4 py-2.5 rounded-xl border border-[#8F8575]/30 focus:border-[#1E7A6F] focus:outline-none transition"
            />
          </div>

          <!-- Mobile Nav Buttons -->
          <div class="flex flex-col gap-1.5 pt-1">
            <button
              @click="navigateTo('beranda')"
              :class="[
                'w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer',
                currentNav === 'beranda' ? 'bg-[#1E7A6F] text-white' : 'text-[#2B3445] hover:bg-[#FFF8F0]'
              ]"
            >
              <div class="flex items-center gap-2">
                <Home class="w-4 h-4 opacity-80" />
                <span>Beranda</span>
              </div>
              <ArrowRight class="w-4 h-4 opacity-70" />
            </button>

            <button
              @click="navigateTo('materi')"
              :class="[
                'w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer',
                ['materi', 'materi-detail'].includes(currentNav) ? 'bg-[#1E7A6F] text-white' : 'text-[#2B3445] hover:bg-[#FFF8F0]'
              ]"
            >
              <div class="flex items-center gap-2">
                <Compass class="w-4 h-4 opacity-80" />
                <span>Katalog Materi</span>
              </div>
              <ArrowRight class="w-4 h-4 opacity-70" />
            </button>

            <button
              @click="navigateTo('admin')"
              :class="[
                'w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer',
                currentNav === 'admin' ? 'bg-[#1E7A6F] text-white' : 'text-[#2B3445] hover:bg-[#FFF8F0]'
              ]"
            >
              <div class="flex items-center gap-2">
                <LayoutDashboard class="w-4 h-4 text-[#1E7A6F]" />
                <span>CMS Admin Prisma</span>
              </div>
              <ArrowRight class="w-4 h-4 opacity-70" />
            </button>
          </div>

          <!-- Mobile Actions -->
          <div class="pt-3 border-t border-[#8F8575]/20 flex flex-col gap-2">
            <button
              @click="openSettings('theme'); isMobileMenuOpen = false"
              class="btn-prisma-white w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <Settings class="w-4 h-4 text-[#1E7A6F]" />
                <span>Pengaturan Tampilan</span>
              </div>
              <ChevronRight class="w-4 h-4 text-[#5B6474]" />
            </button>

            <button
              v-if="isAdmin"
              @click="handleLogout; isMobileMenuOpen = false"
              class="w-full py-2.5 rounded-xl bg-white text-[#5B6474] font-semibold text-xs text-center border border-[#8F8575]/30 cursor-pointer"
            >
              Keluar dari Mode Admin
            </button>
          </div>
        </div>
      </transition>
    </header>

    <!-- ==================== VIEW: BERANDA ==================== -->
    <main v-if="currentNav === 'beranda'" class="flex-1 flex flex-col">

      <!-- ===== HERO SECTION (PRISMA DESIGN SYSTEM: CLEAN, WARM KREM, ACCENT MINT) ===== -->
      <section class="relative w-full overflow-hidden flex flex-col justify-center min-h-[90vh] pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16 bg-[#FFF8F0] border-b border-[#8F8575]/20">
        
        <!-- Main Content Wrapper: Vertically Centered Grid -->
        <div class="relative z-10 w-full flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-center py-6 lg:py-8 animate-soft-pop">
          
          <!-- Desktop 2-Column Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">

            <!-- LEFT: Text Content (5-6 cols) -->
            <div class="lg:col-span-6 xl:col-span-5 space-y-6 text-left relative z-20">
              
              <!-- Eyebrow Badge (White pill with Garis border) -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#8F8575]/30 shadow-xs text-xs font-semibold text-[#1E7A6F]">
                <span class="w-2 h-2 rounded-full bg-[#1E7A6F]"></span>
                <span>Platform Pembelajaran Ramah Anak dan Inklusif</span>
              </div>

              <!-- Headline (Baloo 2 Display Scale) -->
              <div class="space-y-1 relative">
                <h1 class="font-['Baloo_2'] font-bold text-[#2B3445] tracking-tight leading-[1.12]">
                  <span class="block text-3xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem]">
                    Belajar dengan
                  </span>
                  <span class="block text-3xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] mt-0.5 text-[#1E7A6F]">
                    Cara yang Sesuai
                  </span>
                  <span class="block text-3xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] mt-0.5">
                    untuk Dirimu!
                  </span>
                </h1>
              </div>

              <!-- Subtitle (Lexend Body, Abu Teks, NO em dash) -->
              <p class="text-sm sm:text-base text-[#5B6474] font-normal leading-relaxed max-w-lg">
                Jelajahi media pembelajaran interaktif yang dirancang untuk berbagai cara belajar anak Indonesia: ramah, menyenangkan, dan bebas hambatan.
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  @click="navigateTo('materi'); playButtonPop()"
                  class="btn-prisma-mint px-8 py-3.5 font-semibold text-sm flex items-center gap-2.5 cursor-pointer shadow-sm transition active:scale-95"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
                </button>
              </div>

            </div>

            <!-- RIGHT: Artwork Image -->
            <div class="lg:col-span-6 xl:col-span-7 relative flex flex-col items-center justify-center">
              <div class="w-full flex justify-center items-center relative">
                <img
                  src="/Banner_Dashboard2.jpg"
                  alt="Anak-anak belajar bersama Prisma"
                  class="w-full max-w-[720px] xl:max-w-[800px] h-auto object-contain select-none pointer-events-none block rounded-3xl"
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      <!-- ==================== SECTION 1: PILAR NILAI & AKSESIBILITAS ==================== -->
      <section class="w-full bg-white px-4 sm:px-6 lg:px-10 py-16 sm:py-20 relative overflow-hidden border-b border-[#8F8575]/20">
        <div class="w-full max-w-[1440px] mx-auto space-y-12 relative z-10">
          
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto space-y-3 reveal-zoom">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F0] text-[#1E7A6F] border border-[#8F8575]/30 text-xs font-semibold tracking-wide uppercase">
              Mengapa Prisma
            </span>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-4xl font-bold text-[#2B3445] tracking-tight">
              Didesain untuk Memahami Keunikan Cara Belajar Setiap Anak
            </h2>
            <p class="text-sm sm:text-base text-[#5B6474] font-normal leading-relaxed">
              Tidak ada anak yang tertinggal. Kami merancang setiap media pembelajaran agar mudah dipahami, bebas tekanan, dan menyenangkan.
            </p>
          </div>

          <!-- 3 Feature Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Card 1: Multi-Sensori -->
            <div class="card-prisma p-6 flex flex-col justify-between group reveal-on-scroll delay-100">
              <div class="space-y-4 text-left">
                <div class="w-14 h-14 rounded-2xl bg-[#FFB899]/30 border border-[#8F8575]/25 text-[#2B3445] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Headphones class="w-7 h-7 text-[#1E7A6F]" />
                </div>
                <h3 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">Mode Multi-Sensori</h3>
                <p class="text-xs sm:text-sm text-[#5B6474] font-normal leading-relaxed">
                  Setiap teks narasi dilengkapi panduan suara berbahasa Indonesia yang ramah, membantu anak yang lebih mudah memahami lewat pendengaran.
                </p>
              </div>

              <!-- Interactive Audio Sample Demo Button -->
              <div class="pt-5 mt-4 border-t border-[#8F8575]/20">
                <button
                  @click="playAudioNarrationSample"
                  class="btn-prisma-white w-full py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Volume2 :class="['w-4 h-4 text-[#1E7A6F]', isAudioNarrationPlaying ? 'animate-bounce' : '']" />
                  <span>{{ isAudioNarrationPlaying ? 'Memutar Suara Narator...' : 'Coba Contoh Suara' }}</span>
                </button>
              </div>
            </div>

            <!-- Card 2: Zero-Pressure Pace -->
            <div class="card-prisma p-6 flex flex-col justify-between group reveal-on-scroll delay-200">
              <div class="space-y-4 text-left">
                <div class="w-14 h-14 rounded-2xl bg-[#94C6FF]/30 border border-[#8F8575]/25 text-[#2B3445] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Clock class="w-7 h-7 text-[#1E7A6F]" />
                </div>
                <h3 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">Belajar Tanpa Rasa Cemas</h3>
                <p class="text-xs sm:text-sm text-[#5B6474] font-normal leading-relaxed">
                  Tidak ada penalti waktu atau suara peringatan yang memicu rasa panik. Anak bebas mengulang materi sesuka hati hingga paham.
                </p>
              </div>
              <div class="pt-5 mt-4 border-t border-[#8F8575]/20">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B3445] bg-[#FFF8F0] border border-[#8F8575]/25 px-3 py-1.5 rounded-xl w-full justify-center">
                  Bebas Batas Waktu
                </span>
              </div>
            </div>

            <!-- Card 3: Aman & Bebas Iklan -->
            <div class="card-prisma p-6 flex flex-col justify-between group reveal-on-scroll delay-300">
              <div class="space-y-4 text-left">
                <div class="w-14 h-14 rounded-2xl bg-[#7FD4C4]/30 border border-[#8F8575]/25 text-[#2B3445] flex items-center justify-center transition-transform group-hover:scale-105">
                  <ShieldCheck class="w-7 h-7 text-[#1E7A6F]" />
                </div>
                <h3 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">Aman & Bebas Iklan</h3>
                <p class="text-xs sm:text-sm text-[#5B6474] font-normal leading-relaxed">
                  Ekosistem tertutup tanpa tautan luar berbahaya, tanpa pelacak data komersial, dan bebas dari tayangan iklan.
                </p>
              </div>
              <div class="pt-5 mt-4 border-t border-[#8F8575]/20">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B3445] bg-[#FFF8F0] border border-[#8F8575]/25 px-3 py-1.5 rounded-xl w-full justify-center">
                  100% Terproteksi
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ==================== SECTION 2: PRATINJAU MATERI & AKTIVITAS ==================== -->
      <section class="w-full bg-[#FFF8F0] px-4 sm:px-6 lg:px-10 py-16 sm:py-20 border-b border-[#8F8575]/20 relative overflow-hidden">
        <div class="w-full max-w-[1440px] mx-auto space-y-10">
          
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto space-y-3 reveal-zoom">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#1E7A6F] border border-[#8F8575]/30 text-xs font-semibold tracking-wide uppercase">
              Jelajahi Materi
            </span>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-4xl font-bold text-[#2B3445] tracking-tight">
              Petualangan Seru Menanti Setiap Hari
            </h2>
            <p class="text-sm sm:text-base text-[#5B6474] font-normal leading-relaxed">
              Pilih topik yang ingin dipelajari hari ini dan nikmati cara belajar yang interaktif.
            </p>
          </div>

          <!-- Filter Tabs Kelas SD (Semua Kelas, Kelas 1 - 6) -->
          <div class="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 reveal-on-scroll delay-100">
            <button
              v-for="k in ['Semua', ...KELAS_SD_OPTIONS]"
              :key="k"
              @click="selectedKelasTab = k; playButtonPop()"
              :class="[
                'px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border',
                selectedKelasTab === k
                  ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                  : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
              ]"
            >
              {{ k === 'Semua' ? 'Semua Kelas' : k }}
            </button>
          </div>

          <!-- Module Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            
            <!-- 1. LOADING STATE: Saat materi sedang dimuat dari Supabase -->
            <div v-if="isLoadingMateri" class="col-span-full py-16 text-center space-y-3">
              <div class="w-12 h-12 rounded-full border-4 border-blue-200 border-t-[#3DA5FF] animate-spin mx-auto"></div>
              <p class="text-xs font-bold text-slate-400">Memuat materi dari database...</p>
            </div>

            <!-- 2. EMPTY STATE: Jika kelas kosong atau belum ada materi di database -->
            <div
              v-else-if="filteredLandingModules.length === 0"
              class="col-span-full py-14 px-6 bg-white rounded-2xl border border-dashed border-[#8F8575]/40 text-center space-y-4 max-w-md mx-auto shadow-sm"
            >
              <div class="w-16 h-16 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/25 flex items-center justify-center mx-auto text-3xl">
                🧊
              </div>
              <div class="space-y-1.5">
                <h3 class="font-['Baloo_2'] text-lg font-bold text-[#2B3445]">
                  Belum Ada Materi di {{ selectedKelasTab === 'Semua' ? 'Kelas Ini' : selectedKelasTab }}
                </h3>
                <p class="text-xs sm:text-sm text-[#5B6474] font-normal leading-relaxed">
                  Materi pembelajaran untuk {{ selectedKelasTab === 'Semua' ? 'jenjang SD' : selectedKelasTab }} belum tersedia atau sedang disiapkan oleh tim pengajar Prisma.
                </p>
              </div>
              <button
                @click="selectedKelasTab = 'Semua'; playButtonPop()"
                class="btn-prisma-white px-5 py-2.5 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Lihat Semua Kelas</span>
                <ArrowRight class="w-3.5 h-3.5 text-[#1E7A6F]" />
              </button>
            </div>

            <!-- 3. REAL DATABASE CARDS -->
            <div
              v-else
              v-for="(mod, index) in filteredLandingModules"
              :key="mod.id"
              class="card-prisma bg-white flex flex-col justify-between overflow-hidden group relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <!-- Card Top Image Banner -->
              <div class="relative h-44 w-full overflow-hidden bg-[#FFF8F0] border-b border-[#8F8575]/20">
                <img :src="mod.image" :alt="mod.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <!-- Kelas Badge Overlay -->
                <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1E7A6F] text-white">
                    {{ mod.kelas || 'SD' }}
                  </span>
                </div>

                <div class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[11px] font-semibold text-[#1E7A6F] border border-[#8F8575]/30 shadow-xs">
                  {{ mod.mataPelajaran }}
                </div>
              </div>

              <!-- Card Body Content -->
              <div class="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div class="space-y-2">
                  <!-- Sensoric Badges -->
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span
                      v-for="(badge, idx) in mod.badges"
                      :key="idx"
                      class="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF8F0] text-[#1E7A6F] border border-[#8F8575]/25"
                    >
                      {{ badge }}
                    </span>
                  </div>

                  <h3 class="font-['Baloo_2'] text-lg font-bold text-[#2B3445] group-hover:text-[#1E7A6F] transition-colors leading-snug">
                    {{ mod.title }}
                  </h3>
                  <p class="text-xs text-[#5B6474] font-normal leading-relaxed">
                    {{ mod.summary }}
                  </p>
                </div>

                <div class="pt-3 border-t border-[#8F8575]/20 flex items-center justify-between">
                  <span class="text-[11px] font-normal text-[#5B6474]">{{ mod.categoryLabel }}</span>
                  <button
                    @click="handleModuleClick(mod)"
                    class="btn-prisma-mint px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Pelajari Materi</span>
                    <ArrowRight class="w-3.5 h-3.5 text-[#1E7A6F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>



      <!-- ==================== SECTION 6: FINAL CALL-TO-ACTION BANNER ==================== -->
      <section class="w-full bg-white px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div class="w-full max-w-[1440px] mx-auto">
          
          <div
            class="rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-md flex flex-col items-center justify-center space-y-8 bg-[#1E7A6F] border border-[#7FD4C4]/30"
          >
            <div class="max-w-2xl space-y-4 relative z-10">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white text-[#1E7A6F] text-xs font-semibold uppercase tracking-wider">
                Mulai Sekarang
              </span>
              <h2 class="font-['Baloo_2'] text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
                Mulai Perjalanan Belajar yang Lebih Ramah dan Menyenangkan
              </h2>
              <p class="text-sm sm:text-base text-[#FFF8F0]/90 font-normal leading-relaxed">
                Nikmati seluruh modul pembelajaran interaktif Prisma secara gratis dan terbuka bersama si kecil.
              </p>
            </div>

            <!-- CTA Action Button -->
            <div class="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <button
                @click="navigateTo('materi')"
                class="btn-prisma-mint px-10 py-4 font-semibold text-base flex items-center gap-3 cursor-pointer shadow-md"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight class="w-5 h-5 text-[#1E7A6F]" />
              </button>
            </div>

            <!-- Trust Elements -->
            <div class="relative z-10 flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-normal text-[#FFF8F0]/90">
              <div class="flex items-center gap-2">
                <Check class="w-4 h-4 text-[#FFDE7A]" />
                <span>Tanpa biaya tersembunyi</span>
              </div>
              <div class="flex items-center gap-2">
                <Check class="w-4 h-4 text-[#FFDE7A]" />
                <span>Materi ramah anak dan inklusif</span>
              </div>
              <div class="flex items-center gap-2">
                <Check class="w-4 h-4 text-[#FFDE7A]" />
                <span>Akses langsung dari peramban</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>




    <!-- ==================== VIEW: KATALOG MATERI ==================== -->
    <main v-else-if="currentNav === 'materi'" class="w-full flex-1 flex flex-col">
      <MateriView
        :search-query="searchQuery"
        @open-detail="handleOpenDetail"
      />
    </main>

    <!-- ==================== VIEW: DETAIL MATERI (LANGSUNG KE LEARNING PLAYER) ==================== -->
    <main v-else-if="currentNav === 'materi-detail'" class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-6 flex-1">
      <LearningPlayerView
        :materi="activeMateriItem || (materiList && materiList.length ? materiList[0] : null)"
        @back="navigateTo('materi')"
        @finish="navigateTo('materi')"
        @open-settings="openSettings"
        @change-materi="handleSwitchMateri"
      />
    </main>

    <!-- ==================== VIEW: LEARNING PLAYER ==================== -->
    <main v-else-if="currentNav === 'learning-player'" class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-6 flex-1">
      <LearningPlayerView
        :materi="activeMateriItem || (materiList && materiList.length ? materiList[0] : null)"
        @back="navigateTo('materi')"
        @finish="navigateTo('materi')"
        @open-settings="openSettings"
        @change-materi="handleSwitchMateri"
      />
    </main>

    <!-- ==================== VIEW: DASHBOARD ADMIN ==================== -->
    <main v-else-if="currentNav === 'admin'" class="w-full flex-1">
      <AdminDashboard
        v-if="isAdmin"
        @preview-materi="handlePreviewFromAdmin"
        @back-to-app="navigateTo('materi')"
      />
      <div v-else class="min-h-[70vh] flex items-center justify-center p-4">
        <div class="card-prisma bg-white p-8 sm:p-12 max-w-md w-full text-center space-y-5 animate-soft-pop">
          <div class="w-16 h-16 rounded-2xl bg-[#FFF8F0] text-[#1E7A6F] flex items-center justify-center mx-auto text-3xl border border-[#8F8575]/25">
            🛡️
          </div>
          <div>
            <h2 class="font-['Baloo_2'] text-2xl font-bold text-[#2B3445]">CMS Administrator</h2>
            <p class="text-xs sm:text-sm text-[#5B6474] mt-1 leading-relaxed font-normal">
              Halaman ini diperuntukkan bagi administrator untuk mengelola konten dan materi pembelajaran Prisma.
            </p>
          </div>
          <button
            @click="showAdminLoginModal = true"
            class="btn-prisma-mint w-full py-3.5 text-xs font-semibold cursor-pointer shadow-sm"
          >
            Masuk sebagai Administrator
          </button>
        </div>
      </div>
    </main>

    <!-- ==================== VIEW: SETTINGS & TEMA ==================== -->
    <main v-else-if="currentNav === 'settings'" class="w-full flex-1 flex flex-col">
      <SettingsView
        :initial-tab="settingsInitialTab"
        @back="navigateTo(previousNav || 'beranda')"
        @navigate="navigateTo"
        @logout="handleLogout"
        @updated="refreshDisplayReviews"
      />
    </main>

    <!-- ==================== VIEW: DEFAULT FALLBACK ==================== -->
    <main v-else class="flex-1 flex items-center justify-center p-8 pt-24 text-center">
      <div class="card-prisma bg-white max-w-md space-y-4 p-8">
        <div class="w-14 h-14 rounded-2xl bg-[#FFF8F0] text-[#1E7A6F] flex items-center justify-center mx-auto border border-[#8F8575]/25">
          <Home class="w-7 h-7" />
        </div>
        <h2 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">Halaman Tidak Ditemukan</h2>
        <p class="text-xs sm:text-sm text-[#5B6474] leading-relaxed font-normal">
          Rute yang Anda cari tidak tersedia.
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button
            @click="navigateTo('beranda')"
            class="btn-prisma-mint px-6 py-2.5 text-xs font-semibold cursor-pointer shadow-sm"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>

    <!-- ==================== INCLUSIVE FOOTER (PRISMA DESIGN SYSTEM) ==================== -->
    <footer
      v-if="!['learning-player', 'admin'].includes(currentNav)"
      class="w-full bg-[#2B3445] text-white mt-auto relative overflow-hidden shrink-0 border-t border-[#8F8575]/30"
    >
      <!-- PRISMA Top Accent Ribbon -->
      <div class="h-1.5 w-full flex">
        <div class="flex-1 bg-[#7FD4C4]"></div>
        <div class="flex-1 bg-[#FFB899]"></div>
        <div class="flex-1 bg-[#94C6FF]"></div>
        <div class="flex-1 bg-[#FFDE7A]"></div>
      </div>

      <div class="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
        
        <!-- Top Row: CTA Banner -->
        <div class="mb-10 sm:mb-12 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E7A6F] to-[#165B53] border border-[#7FD4C4]/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div class="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-3xl shrink-0 shadow-xs">
              🚀
            </div>
            <div>
              <h4 class="font-['Baloo_2'] text-lg sm:text-xl font-bold text-white leading-snug">
                Siap Belajar Seru Bersama Prisma?
              </h4>
              <p class="text-xs sm:text-sm text-[#FFF8F0]/90 font-normal mt-1 max-w-xl">
                Tonton video edukasi, dengarkan cerita bersuara, dan taklukkan kuis interaktif dari Kelas 1 hingga Kelas 6!
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              @click="navigateTo('materi'); playButtonPop()"
              class="btn-prisma-mint w-full md:w-auto justify-center px-6 py-3.5 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>
          </div>
        </div>

        <!-- Main Footer Grid (4 Kolom Rapi Tanpa Email & Jam Buka) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 text-left">
          
          <!-- Column 1: Brand Info & Deskripsi Baru -->
          <div class="sm:col-span-2 lg:col-span-4 space-y-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white rounded-2xl shadow-xs">
                <img src="/Logo.png" alt="Logo Prisma" class="h-8 w-auto" />
              </div>
              <div>
                <span class="font-['Baloo_2'] text-2xl font-bold tracking-tight text-white block leading-none">Prisma</span>
                <span class="text-[11px] font-semibold text-[#FFDE7A] tracking-wider uppercase mt-1 block">Media Belajar Literasi & Numerasi</span>
              </div>
            </div>
            
            <p class="text-xs sm:text-sm text-[#FFF8F0]/80 leading-relaxed max-w-md font-normal">
              Sahabat belajar interaktif untuk siswa SD Kelas 1–6. Dilengkapi video pembelajaran, bacaan cerita bersuara, kuis seru, serta asisten AI Kak Defi yang siap membantu memahami pelajaran langkah demi langkah.
            </p>
            
            <!-- Value Badges -->
            <div class="flex items-center gap-2 flex-wrap pt-1">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-[#7FD4C4] border border-[#7FD4C4]/30">
                Ramah Anak
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-[#FFB899] border border-[#FFB899]/30">
                Audio & Visual
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-[#94C6FF] border border-[#94C6FF]/30">
                Kuis Interaktif
              </span>
            </div>
          </div>

          <!-- Column 2: Navigasi -->
          <div class="lg:col-span-2 space-y-3.5">
            <h3 class="font-['Baloo_2'] text-xs font-bold text-[#FFDE7A] uppercase tracking-widest">Navigasi</h3>
            <ul class="space-y-2.5 text-xs sm:text-sm text-[#FFF8F0]/80 font-normal">
              <li>
                <button @click="navigateTo('beranda')" class="hover:text-[#7FD4C4] hover:translate-x-1 transition-all cursor-pointer inline-flex items-center gap-1.5">
                  <ArrowRight class="w-3 h-3 text-[#7FD4C4]" /> Beranda
                </button>
              </li>
              <li>
                <button @click="navigateTo('materi')" class="hover:text-[#7FD4C4] hover:translate-x-1 transition-all cursor-pointer inline-flex items-center gap-1.5">
                  <ArrowRight class="w-3 h-3 text-[#7FD4C4]" /> Jelajahi Materi
                </button>
              </li>
              <li>
                <button @click="navigateTo('admin')" class="hover:text-[#7FD4C4] hover:translate-x-1 transition-all cursor-pointer inline-flex items-center gap-1.5">
                  <ArrowRight class="w-3 h-3 text-[#7FD4C4]" /> Panel Guru
                </button>
              </li>
              <li>
                <button @click="openSettings('theme')" class="hover:text-[#7FD4C4] hover:translate-x-1 transition-all cursor-pointer inline-flex items-center gap-1.5">
                  <ArrowRight class="w-3 h-3 text-[#7FD4C4]" /> Pengaturan Tampilan
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 3: Fitur Utama -->
          <div class="lg:col-span-3 space-y-3.5">
            <h3 class="font-['Baloo_2'] text-xs font-bold text-[#FFDE7A] uppercase tracking-widest">Fitur Pembelajaran</h3>
            <div class="space-y-3">
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-[#7FD4C4] mt-1.5 shrink-0"></span>
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-white">Video Edukasi</p>
                  <p class="text-[11px] text-[#FFF8F0]/70 font-normal leading-snug">Penjelasan visual konsep & praktik untuk Kelas 1–6</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-[#FFB899] mt-1.5 shrink-0"></span>
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-white">Kuis Interaktif</p>
                  <p class="text-[11px] text-[#FFF8F0]/70 font-normal leading-snug">Pilihan ganda, tarik garis, urutkan kartu, & pembahasan instan</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-[#94C6FF] mt-1.5 shrink-0"></span>
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-white">Bacaan & Suara Narasi</p>
                  <p class="text-[11px] text-[#FFF8F0]/70 font-normal leading-snug">Cerita edukatif lengkap dengan audio narasi</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 4: Bantuan Belajar (Tanpa Email & Jam Buka) -->
          <div class="sm:col-span-2 lg:col-span-3 space-y-3.5">
            <h3 class="font-['Baloo_2'] text-xs font-bold text-[#FFDE7A] uppercase tracking-widest">Pendamping Belajar</h3>
            <p class="text-xs text-[#FFF8F0]/80 leading-relaxed font-normal">
              Butuh bantuan memahami materi atau soal? Tanya langsung lewat asisten pintar PRISMA!
            </p>
            <div class="space-y-2.5 pt-1">
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <span class="text-xl leading-none shrink-0 mt-0.5">🤖</span>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white">Chatbot Kak Defi</p>
                  <p class="text-[11px] text-[#FFF8F0]/75 leading-snug mt-0.5">Klik ikon robot di pojok kanan bawah kapan saja</p>
                </div>
              </div>
              <div class="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                <span class="text-xl leading-none shrink-0 mt-0.5">📚</span>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white">Kurikulum SD Lengkap</p>
                  <p class="text-[11px] text-[#FFF8F0]/75 leading-snug mt-0.5">Materi terstruktur dari Kelas 1 sampai Kelas 6</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Copyright Row -->
        <div class="mt-10 sm:mt-12 pt-6 border-t border-[#8F8575]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#FFF8F0]/70 font-normal">
          <p>© 2026 PRISMA. Platform Belajar Literasi & Numerasi SD.</p>
          <p class="text-[11px] text-[#FFF8F0]/55">Belajar Jadi Mudah, Seru, & Menyenangkan ✨</p>
        </div>

      </div>
    </footer>

    <!-- Dedicated Administrator Login Modal -->
    <AuthModal
      :is-open="showAdminLoginModal"
      @close="showAdminLoginModal = false"
      @authenticated="handleAdminAuthenticated"
    />

    <!-- Settings Modal -->
    <SettingsModal
      :is-open="isSettingsModalOpen"
      @close="isSettingsModalOpen = false"
    />

    <!-- Chatbot Defi Floating Widget (Selalu ada di pojok kanan bawah layar) -->
    <ChatbotWidget />
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
