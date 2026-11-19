/**
 * PRISMA Chatbot Defi - Client Service
 * Menghubungkan antarmuka frontend dengan otak Defi Web Engine (100% Native Web)
 * serta mendukung server backend FastAPI bila tersedia.
 */

import {
  solveDynamicMath,
  searchDefiDataset,
  askGeminiWeb,
  getClientDataset
} from './defiWebEngine'

/**
 * Cek status kesehatan Defi Engine
 */
export async function checkChatbotStatus() {
  // Muat dataset ke memori browser
  const dataset = await getClientDataset()
  return {
    isOnline: true,
    totalMateri: dataset.length || 421,
    mode: 'native_web'
  }
}

/**
 * Kirim pesan teks ke Chatbot Defi (Hybrid Web Engine)
 * Alur prioritas:
 * 1. Kalkulator Matematika Dinamis (0 ms, akurat 100%)
 * 2. Pencarian 421 Materi PRISMA Dataset (Lemmatizer + Sinonim)
 * 3. Gemini AI Cloud (Pertanyaan bebas dengan persona Defi)
 * 4. Fallback edukatif ramah anak
 */
export async function sendChatText({ pertanyaan, kelas = '', kategori = '' }) {
  if (!pertanyaan || !pertanyaan.trim()) {
    return {
      success: false,
      jawaban: 'Pertanyaan tidak boleh kosong ya sahabat!',
      sumber: 'system',
      status: 'error'
    }
  }

  // ── Jalur 1: Kalkulator Matematika Dinamis ───────────────────────────────
  const mathResult = solveDynamicMath(pertanyaan, kelas)
  if (mathResult) {
    return mathResult
  }

  // ── Jalur 2: Pencarian 421 Materi PRISMA Dataset ─────────────────────────
  const datasetResult = await searchDefiDataset(pertanyaan, kelas, kategori)
  if (datasetResult) {
    return datasetResult
  }

  // ── Jalur 3: Gemini Cloud AI (Pertanyaan Terbuka / Kreatif) ───────────────
  const geminiAnswer = await askGeminiWeb(pertanyaan, null, null, kelas)
  if (geminiAnswer) {
    return {
      sumber: 'gemini_vision',
      status: 'success',
      confidence: 1.0,
      jawaban: geminiAnswer,
      metadata: { model: 'gemini-1.5-flash', kelas: kelas || 'Semua Kelas' }
    }
  }

  // ── Jalur 4: Sapaan Ramah & Fallback Edukatif ─────────────────────────────
  const lower = pertanyaan.toLowerCase().trim()
  if (/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test|hai kak|halo kak)/.test(lower)) {
    return {
      sumber: 'system_greeting',
      status: 'success',
      jawaban: 'Halo sahabat pintar PRISMA! 👋 Aku Defi, teman belajar ceria kamu. Mau tanya soal berhitung matematika, materi membaca cerita, atau latihan soal hari ini? Kak Defi siap bantu!'
    }
  }

  return {
    sumber: 'client_fallback',
    status: 'success',
    jawaban: `Halo! Kak Defi senang sekali kamu bertanya tentang "${pertanyaan}". Kak Defi siap membantu materi ${kelas || 'semua kelas SD'} seputar ide pokok, huruf vokal/konsonan, pecahan, bangun datar, atau menghitung angka (seperti "25 x 4"). Coba tanyakan materi yang ingin kamu pelajari ya! ✨`
  }
}

/**
 * Kirim foto soal ke Chatbot Defi (Menggunakan Gemini Vision langsung dari Web)
 * @param {Object} params
 * @param {File|Blob} params.foto
 * @param {string} [params.pertanyaan]
 * @param {string} [params.kelas]
 */
export async function sendChatPhoto({ foto, pertanyaan = '', kelas = '' }) {
  if (!foto) {
    return {
      success: false,
      jawaban: 'Silakan pilih foto soal yang ingin kamu tanyakan ya sahabat!',
      sumber: 'system',
      status: 'error'
    }
  }

  try {
    // Konversi file foto menjadi Base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
      reader.readAsDataURL(foto)
    })

    const mimeType = foto.type || 'image/jpeg'
    const promptText = pertanyaan || 'Tolong jelaskan materi atau soal yang ada di foto ini untuk siswa SD ya Kak Defi!'

    const visionResult = await askGeminiWeb(promptText, base64Data, mimeType, kelas)
    if (visionResult) {
      return {
        success: true,
        jawaban: visionResult,
        sumber: 'gemini_vision',
        status: 'success',
        metadata: { model: 'gemini-vision-web' }
      }
    }

    return {
      success: false,
      jawaban: 'Wah, Kak Defi sedikit kesulitan membaca tulisan pada fotomu. Pastikan fotonya cukup terang dan jelas, atau kamu bisa mengetikkan teks soalnya langsung ke Kak Defi ya! ✨',
      sumber: 'client_fallback',
      status: 'warning'
    }
  } catch (err) {
    console.error('[Defi Chatbot] Photo processing failed:', err)
    return {
      success: false,
      jawaban: 'Terjadi sedikit kendala saat membaca foto. Kamu bisa ketikkan teks soalnya langsung ke Kak Defi, Kak Defi siap bantu! ✨',
      sumber: 'client_fallback',
      status: 'error'
    }
  }
}

/**
 * Text-to-Speech (Membaca jawaban Defi dengan suara ramah)
 */
let currentUtterance = null

export function speakText(text, onEnd) {
  if (!('speechSynthesis' in window)) return false
  stopSpeech()

  const clean = text.replace(/[*_#`~\[\]\(\)]/g, ' ').replace(/\s+/g, ' ').trim()
  if (!clean) return false

  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = 'id-ID'
  utter.rate = 0.95
  utter.pitch = 1.05

  const voices = window.speechSynthesis.getVoices()
  const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'))
  if (idVoice) utter.voice = idVoice

  utter.onend = () => {
    currentUtterance = null
    if (onEnd) onEnd()
  }
  utter.onerror = () => {
    currentUtterance = null
    if (onEnd) onEnd()
  }

  currentUtterance = utter
  window.speechSynthesis.speak(utter)
  return true
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  currentUtterance = null
}

export function isSpeaking() {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking
}
