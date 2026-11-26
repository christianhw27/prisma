<script setup>
import { ref, watch } from 'vue'
import { loginUser } from '../lib/authService'
import { X, Lock, Mail, ShieldAlert, Eye, EyeOff, CheckCircle2 } from '@lucide/vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'authenticated'])

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const showPassword = ref(false)

watch(() => props.isOpen, (open) => {
  if (open) {
    errorMessage.value = ''
    email.value = ''
    password.value = ''
  }
})

const handleLogin = async () => {
  errorMessage.value = ''
  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Email dan kata sandi admin wajib diisi.'
    return
  }
  isSubmitting.value = true
  try {
    const res = await loginUser(email.value.trim(), password.value)
    if (res.success) {
      if (res.user?.role !== 'admin') {
        errorMessage.value = 'Akun ini bukan administrator.'
        return
      }
      emit('authenticated', res.user)
      emit('close')
    } else {
      errorMessage.value = res.message || 'Kredensial admin salah. Silakan coba lagi.'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan saat masuk: ' + (err.message || err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#2B3445]/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        class="relative bg-white rounded-3xl w-full max-w-[420px] overflow-hidden shadow-2xl border border-[#8F8575]/30 animate-soft-pop"
      >
        <!-- Top PRISMA Banner -->
        <div class="px-8 pt-8 pb-6 text-center bg-[#1E7A6F] text-white relative">
          <button
            @click="emit('close')"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="Tutup"
          >
            <X class="w-4 h-4" />
          </button>

          <div class="w-16 h-16 rounded-2xl bg-white p-2.5 mx-auto mb-3 shadow-sm border border-[#8F8575]/25 flex items-center justify-center">
            <img src="/Logo.png" alt="Prisma Logo" class="w-full h-full object-contain" />
          </div>

          <h2 class="font-['Baloo_2'] text-2xl font-bold tracking-tight text-white">Login CMS Administrator</h2>
          <p class="font-['Lexend'] text-xs text-[#FFF8F0]/90 mt-1 font-normal">
            Masuk untuk mengelola materi, modul, dan konten Prisma
          </p>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleLogin" class="p-6 sm:p-8 space-y-4 font-['Lexend'] bg-white">
          <!-- Error Alert (Friendly, no harsh red) -->
          <div
            v-if="errorMessage"
            class="p-3.5 rounded-xl bg-[#FFDE7A]/30 border border-[#FFDE7A] text-[#2B3445] text-xs font-semibold flex items-center gap-2"
          >
            <ShieldAlert class="w-4 h-4 shrink-0 text-[#1E7A6F]" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Email Field -->
          <div class="space-y-1.5 text-left">
            <label class="text-xs font-semibold text-[#2B3445] block">Email Administrator</label>
            <div class="relative">
              <Mail class="w-4 h-4 text-[#5B6474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                v-model="email"
                type="email"
                required
                placeholder="admin@prisma.id"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8F8575]/30 bg-[#FFF8F0] text-xs font-medium text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none transition"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-1.5 text-left">
            <label class="text-xs font-semibold text-[#2B3445] block">Kata Sandi</label>
            <div class="relative">
              <Lock class="w-4 h-4 text-[#5B6474] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#8F8575]/30 bg-[#FFF8F0] text-xs font-medium text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6474] hover:text-[#2B3445] cursor-pointer"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-prisma-mint w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <span v-if="isSubmitting">Memverifikasi...</span>
              <span v-else>Masuk ke Dashboard Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
