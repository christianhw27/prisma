<script setup>
import { ref, computed } from 'vue'
import {
  materiList,
  getKelasFromLevel,
  KELAS_SD_OPTIONS
} from '../lib/materiService'
import {
  ArrowRight,
  Film,
  RotateCcw,
  Sparkles,
  Clock,
  Video,
  BookOpen
} from '@lucide/vue'
import DoodleOrnament from './DoodleOrnament.vue'
import { playButtonPop } from '../lib/soundEffects'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const emit = defineEmits(['openDetail'])

const handleOpenItem = (item) => {
  playButtonPop()
  emit('openDetail', item)
}

// Filter States (Khusus Jenjang SD: Kelas 1 sampai 6)
const selectedKelas = ref('Semua')
const selectedMapel = ref('Semua')

// Filter Options
const kelasOptions = ['Semua', ...KELAS_SD_OPTIONS]
const mapelOptions = ['Semua', 'Matematika', 'Bahasa Indonesia', 'IPAS', 'Literasi & Numerasi']

function matchesMapel(itemMapelRaw, filterRaw) {
  if (!filterRaw || filterRaw === 'Semua') return true
  const itemMapel = (itemMapelRaw || '').toLowerCase()
  const filter = filterRaw.toLowerCase()
  if (filter === 'literasi & numerasi') {
    return (
      itemMapel.includes('literasi') ||
      itemMapel.includes('numerasi') ||
      itemMapel.includes('matematika') ||
      itemMapel.includes('bahasa')
    )
  }
  return itemMapel.includes(filter)
}

// Detection for Category in Development (Empty category in database vs search mismatch)
const isCategoryInDevelopment = computed(() => {
  if (filteredMateri.value.length > 0) return false
  if (props.searchQuery.trim() !== '') return false

  const categoryTotal = materiList.value.filter((item) => {
    if (!matchesMapel(item.mataPelajaran, selectedMapel.value)) return false
    if (selectedKelas.value !== 'Semua') {
      const k = getKelasFromLevel(item.level)
      if (k !== selectedKelas.value) return false
    }
    return true
  }).length

  return categoryTotal === 0
})

const developmentCategoryLabel = computed(() => {
  const parts = []
  if (selectedKelas.value !== 'Semua') parts.push(selectedKelas.value)
  if (selectedMapel.value !== 'Semua') parts.push(selectedMapel.value)
  return parts.length ? parts.join(' • ') : 'Kategori Ini'
})

const hasActiveFilter = computed(() =>
  selectedKelas.value !== 'Semua' ||
  selectedMapel.value !== 'Semua' ||
  props.searchQuery.trim() !== ''
)

const filteredMateri = computed(() => {
  return materiList.value.filter((item) => {
    if (!matchesMapel(item.mataPelajaran, selectedMapel.value)) return false
    if (selectedKelas.value !== 'Semua') {
      const k = getKelasFromLevel(item.level)
      if (k !== selectedKelas.value) return false
    }
    if (props.searchQuery.trim()) {
      const q = props.searchQuery.toLowerCase()
      if (
        !item.title?.toLowerCase().includes(q) &&
        !item.description?.toLowerCase().includes(q) &&
        !item.mataPelajaran?.toLowerCase().includes(q) &&
        !item.level?.toLowerCase().includes(q)
      ) return false
    }
    return true
  })
})

const resetFilters = () => {
  playButtonPop()
  selectedKelas.value = 'Semua'
  selectedMapel.value = 'Semua'
}
</script>

<template>
  <div
    class="w-full flex flex-col flex-1 pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-10 space-y-4 sm:space-y-5 bg-[#FFF8F0] relative overflow-hidden"
  >
    <div class="w-full max-w-[1440px] mx-auto space-y-4 sm:space-y-5 relative z-10 animate-soft-pop">

      <!-- ==================== 1. AREA HEADER HALAMAN ==================== -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-1 py-1 relative">
        <!-- Text Left -->
        <div class="lg:col-span-8 space-y-1.5 text-left">
          <h1 class="font-['Baloo_2'] text-3xl sm:text-5xl font-bold text-[#2B3445] tracking-tight leading-tight">
            Jelajahi Materi Pembelajaran
          </h1>
          
          <p class="text-sm sm:text-base text-[#5B6474] font-normal leading-relaxed max-w-xl">
            Temukan media pembelajaran yang ramah dan adaptif untuk setiap anak.
          </p>
        </div>

        <!-- Banner Artwork Right -->
        <div class="lg:col-span-4 flex justify-center lg:justify-end pointer-events-none relative select-none">
          <img
            src="/Banner_Materi.jpg"
            alt="Artwork Notebook Prisma"
            class="w-full max-w-[170px] sm:max-w-[190px] lg:max-w-[210px] h-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500 rounded-2xl"
          />
        </div>
      </div>

      <!-- ==================== 2. KONTAINER LUAR UTAMA ==================== -->
      <div class="card-prisma p-5 sm:p-7 lg:p-8 space-y-6 sm:space-y-8 relative z-10">
        
        <!-- ==================== 3A. BAGIAN FILTER ==================== -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-[#2B3445] uppercase tracking-wider">Kategori Filter</span>
              <span v-if="hasActiveFilter" class="w-2 h-2 rounded-full bg-[#1E7A6F]"></span>
            </div>

            <button
              v-if="hasActiveFilter"
              @click="resetFilters"
              class="btn-prisma-white inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw class="w-3.5 h-3.5 text-[#1E7A6F]" />
              <span>Reset Filter</span>
            </button>
          </div>

          <!-- Filter Area -->
          <div class="space-y-4 bg-[#FFF8F0] p-5 rounded-2xl border border-[#8F8575]/20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Filter 1: Tingkat Kelas -->
              <div class="space-y-2 text-left">
                <label class="text-xs font-semibold text-[#2B3445] block">
                  Tingkat Kelas
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="opt in kelasOptions"
                    :key="opt"
                    @click="selectedKelas = opt; playButtonPop()"
                    :class="[
                      'px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border',
                      selectedKelas === opt
                        ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                        : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                    ]"
                  >
                    {{ opt }}
                  </button>
                </div>
              </div>

              <!-- Filter 2: Mata Pelajaran -->
              <div class="space-y-2 text-left">
                <label class="text-xs font-semibold text-[#2B3445] block">
                  Mata Pelajaran
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="opt in mapelOptions"
                    :key="opt"
                    @click="selectedMapel = opt; playButtonPop()"
                    :class="[
                      'px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border',
                      selectedMapel === opt
                        ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                        : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                    ]"
                  >
                    {{ opt }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== 3B. ITEM MATERI ==================== -->
        <div class="space-y-6 pt-2">
          <!-- Count info -->
          <div class="text-xs text-[#5B6474] font-normal text-left">
            Menampilkan <strong class="text-[#2B3445] font-semibold text-sm">{{ filteredMateri.length }}</strong> materi pembelajaran
          </div>

          <!-- Empty State Case 1: Category in Development -->
          <div
            v-if="filteredMateri.length === 0 && isCategoryInDevelopment"
            class="bg-[#FFF8F0] rounded-2xl p-8 sm:p-12 border border-dashed border-[#8F8575]/40 text-center space-y-4 shadow-sm relative overflow-hidden animate-soft-pop"
          >
            <div class="w-16 h-16 rounded-2xl bg-[#FFDE7A] text-[#2B3445] flex items-center justify-center mx-auto border border-[#8F8575]/25">
              <Sparkles class="w-8 h-8 text-[#1E7A6F]" />
            </div>

            <div class="space-y-1.5 max-w-md mx-auto">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white text-[#1E7A6F] border border-[#8F8575]/30 uppercase tracking-wider">
                Tahap Penyusunan Modul
              </span>
              <h3 class="font-['Baloo_2'] text-lg sm:text-xl font-bold text-[#2B3445] pt-1">
                Modul {{ developmentCategoryLabel }} Segera Hadir
              </h3>
              <p class="text-xs sm:text-sm text-[#5B6474] font-normal leading-relaxed">
                Tim kurikulum Prisma sedang aktif menyusun media pembelajaran adaptif untuk jenjang SD. Silakan jelajahi modul lain yang sudah tersedia.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                @click="resetFilters"
                class="btn-prisma-mint px-5 py-2.5 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen class="w-4 h-4 text-[#1E7A6F]" />
                <span>Lihat Semua Modul SD</span>
              </button>
            </div>
          </div>

          <!-- Empty State Case 2: Filter / Search Query No Match -->
          <div
            v-else-if="filteredMateri.length === 0"
            class="bg-[#FFF8F0] rounded-2xl p-8 sm:p-10 border border-[#8F8575]/30 text-center space-y-4"
          >
            <div class="w-16 h-16 rounded-2xl bg-white border border-[#8F8575]/25 flex items-center justify-center mx-auto shadow-xs">
              <Film class="w-7 h-7 text-[#5B6474]" />
            </div>
            <div class="space-y-1">
              <h3 class="font-['Baloo_2'] text-base font-bold text-[#2B3445]">Tidak Ada Materi yang Cocok</h3>
              <p class="text-xs sm:text-sm text-[#5B6474] max-w-sm mx-auto font-normal">
                Kombinasi filter atau kata kunci pencarian tersebut tidak menemukan hasil. Coba ubah atau reset filter.
              </p>
            </div>
            <button
              @click="resetFilters"
              class="btn-prisma-white px-5 py-2.5 text-xs font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>

          <!-- MATERI CARDS -->
          <div
            v-for="item in filteredMateri"
            :key="item.id"
            class="bg-white rounded-2xl border border-[#8F8575]/25 overflow-hidden p-5 sm:p-6 shadow-sm hover:border-[#1E7A6F] transition-all duration-200 flex flex-col md:flex-row items-stretch gap-6 group"
          >
            <!-- Left Thumbnail Image -->
            <div class="w-full md:w-64 lg:w-72 h-48 md:h-auto min-h-[200px] rounded-2xl overflow-hidden shrink-0 bg-[#FFF8F0] relative border-2 border-[#8F8575]/20">
              <img
                :src="item.image || '/es_batu_card.jpg'"
                :alt="item.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Badge Jenjang & Mapel -->
              <span
                class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold text-[#1E7A6F] bg-white border border-[#8F8575]/30 shadow-xs"
              >
                {{ getKelasFromLevel(item.level) }} • {{ item.mataPelajaran || 'IPAS' }}
              </span>
            </div>

            <!-- Right Details & Content -->
            <div class="flex-1 flex flex-col justify-between space-y-4 text-left">
              <div class="space-y-2">
                <h2 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#2B3445] group-hover:text-[#1E7A6F] transition-colors leading-tight">
                  {{ item.title }}
                </h2>
                <p class="text-xs font-semibold text-[#5B6474]">
                  {{ item.level }}
                </p>
                <p class="text-xs sm:text-sm text-[#2B3445] font-normal leading-relaxed max-w-2xl">
                  {{ item.description }}
                </p>
              </div>

              <!-- Apa yang akan kamu pelajari? (Learning Points) -->
              <div class="space-y-2 pt-1">
                <h3 class="font-['Baloo_2'] text-xs font-bold text-[#2B3445]">
                  Apa yang akan kamu pelajari?
                </h3>
                <div class="flex items-center gap-2 flex-wrap">
                  <div
                    v-for="(lp, idx) in (item.learningPoints || [{ title: 'Mencair' }, { title: 'Menguap' }, { title: 'Mengembun' }])"
                    :key="lp.id || idx"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-semibold text-[#2B3445]"
                  >
                    <Sparkles class="w-3.5 h-3.5 text-[#1E7A6F]" />
                    <span>{{ typeof lp === 'string' ? lp : lp.title }}</span>
                  </div>
                </div>
              </div>

              <!-- Meta Info Row (Durasi, Aktivitas, Pilihan Belajar) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-[#8F8575]/20 text-xs text-[#5B6474] font-normal">
                <div class="flex items-center gap-2 text-[#2B3445]">
                  <Clock class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                  <div>
                    <span class="block text-[10px] text-[#5B6474]">Durasi</span>
                    <span class="font-semibold text-[#2B3445]">{{ item.duration || '± 4 menit' }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-[#2B3445]">
                  <Video class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                  <div>
                    <span class="block text-[10px] text-[#5B6474]">Aktivitas</span>
                    <span class="font-semibold text-[#2B3445]">{{ item.activityType || 'Video + Aktivitas' }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-[#2B3445]">
                  <Sparkles class="w-4 h-4 text-[#1E7A6F] shrink-0" />
                  <div>
                    <span class="block text-[10px] text-[#5B6474]">Format Belajar</span>
                    <span class="font-semibold text-[#2B3445]">{{ item.activityType || 'Video + Aktivitas' }}</span>
                  </div>
                </div>
              </div>

              <!-- Bottom Row: CTA Button -->
              <div class="flex justify-end pt-3 border-t border-[#8F8575]/20">
                <button
                  @click="handleOpenItem(item)"
                  class="btn-prisma-mint px-6 py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0 shadow-sm transition active:scale-95 rounded-2xl"
                >
                  <span>Mulai Petualangan</span>
                  <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
