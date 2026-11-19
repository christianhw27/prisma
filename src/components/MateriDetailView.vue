<script setup>
import { computed, onMounted } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Wind,
  Cloud,
  Clock,
  Video,
  Sparkles
} from '@lucide/vue'
import { materiList, getKelasFromLevel } from '../lib/materiService'

const props = defineProps({
  materi: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'start', 'change-materi'])

const currentMateriIndex = computed(() => {
  if (!props.materi?.id || !materiList.value?.length) return -1
  return materiList.value.findIndex(m => String(m.id) === String(props.materi.id))
})

const nextMateri = computed(() => {
  const list = materiList.value || []
  const idx = currentMateriIndex.value
  if (idx >= 0 && idx < list.length - 1) return list[idx + 1]
  return null
})

const prevMateri = computed(() => {
  const list = materiList.value || []
  const idx = currentMateriIndex.value
  if (idx > 0) return list[idx - 1]
  return null
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="w-full flex flex-col flex-1 pt-4 sm:pt-6 pb-12 px-4 sm:px-6 lg:px-10 space-y-4 sm:space-y-5 bg-[#FFF8F0]">
    <div class="w-full max-w-[1440px] mx-auto space-y-4 sm:space-y-5">
    <!-- Header Navigasi Detail Materi & Switcher Bab -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <button
        @click="emit('back')"
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B6474] hover:text-[#1E7A6F] transition cursor-pointer"
      >
        <ArrowLeft class="w-4 h-4" />
        Kembali ke Materi
      </button>

      <div class="flex items-center gap-2">
        <button
          v-if="prevMateri"
          @click="emit('change-materi', prevMateri)"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474] hover:text-[#1E7A6F] transition cursor-pointer"
          :title="`Bab Sebelumnya: ${prevMateri.title}`"
        >
          <ChevronLeft class="w-3.5 h-3.5 text-[#1E7A6F]" />
          <span class="hidden sm:inline">Bab Sebelumnya</span>
        </button>

        <button
          v-if="nextMateri"
          @click="emit('change-materi', nextMateri)"
          class="btn-prisma-mint px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          :title="`Bab Selanjutnya: ${nextMateri.title}`"
        >
          <span>Bab Selanjutnya</span>
          <ChevronRight class="w-3.5 h-3.5 text-[#1E7A6F]" />
        </button>
      </div>
    </div>

    <!-- Main Card Detail Container -->
    <div class="card-prisma p-6 sm:p-8 lg:p-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <!-- Sisi Kiri: Image Preview -->
        <div class="lg:col-span-5 flex justify-center">
          <div
            @click="emit('start')"
            class="relative w-full max-w-md aspect-video sm:aspect-16/10 rounded-3xl overflow-hidden shadow-sm border-2 border-[#8F8575]/25 group cursor-pointer"
          >
            <img
              :src="materi.image || '/es_batu_card.jpg'"
              :alt="materi.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <!-- Sisi Kanan: Detail & Deskripsi Materi -->
        <div class="lg:col-span-7 space-y-5 text-left">
          <div class="space-y-2">
            <h1 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445] tracking-tight">
              {{ materi.title }}
            </h1>

            <p class="text-xs font-semibold text-[#5B6474]">
              {{ materi.level || 'IPAS • Kelas IV • Fase B' }}
            </p>

            <p class="text-xs sm:text-sm text-[#2B3445] leading-relaxed pt-1 font-normal">
              {{ materi.description }}
            </p>
          </div>

          <!-- Section: Apa yang akan kamu pelajari? -->
          <div class="space-y-3 pt-2">
            <h2 class="font-['Baloo_2'] text-sm sm:text-base font-bold text-[#2B3445]">
              Apa yang akan kamu pelajari?
            </h2>

            <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div
                v-for="(lp, idx) in (materi.learningPoints || [{ title: 'Mencair' }, { title: 'Menguap' }, { title: 'Mengembun' }])"
                :key="lp.id || idx"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-semibold text-[#2B3445]"
              >
                <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
                <span>{{ typeof lp === 'string' ? lp : lp.title }}</span>
              </div>
            </div>
          </div>

          <!-- Meta Info Row (Durasi, Aktivitas, Pilihan Belajar) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#8F8575]/20 text-xs">
            <div class="flex items-center gap-2 text-[#2B3445]">
              <Clock class="w-4 h-4 text-[#1E7A6F] shrink-0" />
              <div>
                <span class="block text-[11px] text-[#5B6474]">Durasi</span>
                <span class="font-semibold text-[#2B3445]">{{ materi.duration || '± 4 menit' }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-[#2B3445]">
              <Video class="w-4 h-4 text-[#1E7A6F] shrink-0" />
              <div>
                <span class="block text-[11px] text-[#5B6474]">Aktivitas</span>
                <span class="font-semibold text-[#2B3445]">{{ materi.activityType || 'Video + Aktivitas' }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-[#2B3445]">
              <Sparkles class="w-4 h-4 text-[#1E7A6F] shrink-0" />
              <div>
                <span class="block text-[11px] text-[#5B6474]">Pilihan Belajar</span>
                <span class="font-semibold text-[#2B3445]">{{ materi.learningOptions || 'Standard & Focus Mode' }}</span>
              </div>
            </div>
          </div>

          <!-- CTA Mulai Petualangan & Navigasi Bab -->
          <div class="pt-4 flex items-center gap-3 flex-wrap">
            <button
              @click="emit('start')"
              class="w-full sm:w-auto btn-prisma-mint px-8 py-3.5 font-semibold text-sm inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-95"
            >
              <span>Mulai Petualangan</span>
              <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>

            <button
              v-if="nextMateri"
              @click="emit('change-materi', nextMateri)"
              class="w-full sm:w-auto btn-prisma-white px-6 py-3.5 font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer hover:border-[#1E7A6F]"
              :title="`Lanjut ke ${nextMateri.title}`"
            >
              <span>Lanjut ke Bab Selanjutnya</span>
              <ChevronRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
