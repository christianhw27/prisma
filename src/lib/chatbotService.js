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
 * Alur prioritas hemat kuota (Gemini API TIDAK dipakai untuk pertanyaan kacang-kacang):
 * 1. Sapaan Ramah, Basa-basi & Terima Kasih (Lokal - 0 ms, 0 API call)
 * 2. Kalkulator Matematika Dinamis (Lokal - 0 ms, akurat 100%, 0 API call)
 * 3. Pencarian 421 Materi PRISMA Dataset (Lokal Lemmatizer + Sinonim, 0 API call)
 * 4. Filter Pertanyaan Kacang-kacang / Terlalu Pendek (Lokal guide)
 * 5. Gemini AI Cloud (Hanya untuk pertanyaan materi unik/kompleks di luar dataset)
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

  const clean = pertanyaan.trim()
  const lower = clean.toLowerCase()

  // ── Jalur 1: Sapaan Ramah & Basa-basi Ringan (Hemat Kuota - 100% Lokal) ───
  if (/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test|hai kak|halo kak|siapa kamu|terima kasih|makasih|makasi|thanks|ok|oke|sip|dadah|bye)\b/.test(lower)) {
    let sapaan = 'Halo sahabat pintar PRISMA! 👋 Aku Defi, teman belajar ceria kamu. Mau tanya soal berhitung matematika, materi membaca cerita, atau kirim foto soal tulisan tanganmu hari ini? Kak Defi siap bantu!'
    if (/terima kasih|makasih|makasi|thanks/.test(lower)) {
      sapaan = 'Sama-sama sahabat pintar! Kak Defi senang sekali bisa membantumu belajar. Tetap semangat dan jangan ragu bertanya lagi ya! ✨'
    } else if (/siapa kamu/.test(lower)) {
      sapaan = 'Aku Defi, robot teman belajar inklusif di PRISMA! Aku bisa membantumu memahami materi literasi, numerasi, berhitung langkah matematika, dan membaca jepretan foto soal tulisan tanganmu! 🤖✨'
    }
    return {
      sumber: 'system_greeting',
      status: 'success',
      jawaban: sapaan
    }
  }

  // ── Jalur 2: Kalkulator Matematika Dinamis (Hemat Kuota - 100% Lokal) ──────
  const mathResult = solveDynamicMath(clean, kelas)
  if (mathResult) {
    return mathResult
  }

  // ── Jalur 3: Pencarian 421 Materi PRISMA Dataset (Hemat Kuota - 100% Lokal) ─
  const datasetResult = await searchDefiDataset(clean, kelas, kategori)
  if (datasetResult) {
    return datasetResult
  }

  // ── Jalur 4: Filter Pertanyaan Kacang-kacang (Hemat Kuota) ────────────────
  // Jangan buang kuota Gemini untuk kata 1-2 kata acak seperti "apa", "kenapa", "gimana"
  const words = lower.split(/\s+/).filter(w => w.length > 1)
  if (words.length <= 2 && !lower.includes('?') && !lower.includes('hitung') && !lower.includes('cara') && !lower.includes('arti')) {
    return {
      sumber: 'client_fallback',
      status: 'success',
      jawaban: `Halo! Kak Defi siap membantumu belajar. Kamu bisa tanyakan materi pelajaran seperti "apa itu ide pokok?", "pecahan 1/2", minta hitung angka seperti "45 x 6", atau jepret foto soal tulisan tanganmu ya! ✨`
    }
  }

  // ── Jalur 5: Gemini AI Cloud (Hanya untuk pertanyaan materi kompleks di luar 421 dataset) ───
  const geminiAnswer = await askGeminiWeb(clean, null, null, kelas)
  if (geminiAnswer) {
    return {
      sumber: 'gemini_vision',
      status: 'success',
      confidence: 1.0,
      jawaban: geminiAnswer,
      metadata: { model: 'gemini-flash-lite', kelas: kelas || 'Semua Kelas' }
    }
  }

  // ── Jalur 6: Fallback Ramah Edukatif ─────────────────────────────────────
  return {
    sumber: 'client_fallback',
    status: 'success',
    jawaban: `Halo! Kak Defi senang kamu bertanya. Kamu bisa tanyakan konsep materi SD seputar ide pokok, huruf vokal/konsonan, pecahan, bangun datar, atau menghitung angka (seperti "25 x 4"). Kamu juga bisa jepret foto soalmu ya! ✨`
  }
}

/**
 * Kirim foto soal ke Chatbot Defi (Menggunakan Gemini Vision untuk membaca jepretan foto tulisan tangan / buku)
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
    const promptText = pertanyaan || 'Tolong baca tulisan tangan atau teks soal pada foto ini dengan teliti (OCR), lalu jelaskan cara penyelesaiannya langkah demi langkah dengan ramah untuk anak SD ya Kak Defi!'

    // Panggil Gemini Vision dengan model gemini-flash-lite-latest
    const visionResult = await askGeminiWeb(promptText, base64Data, mimeType, kelas)
    if (visionResult) {
      return {
        success: true,
        jawaban: visionResult,
        sumber: 'gemini_vision',
        status: 'success',
        metadata: { model: 'gemini-vision-ocr' }
      }
    }

    return {
      success: false,
      jawaban: 'Kak Defi sudah memeriksa fotomu tapi belum berhasil membaca tulisannya dengan jelas. Pastikan foto tulisan tangan cukup terang, tidak buram, dan coba ambil foto dari jarak yang lebih dekat ya! ✨',
      sumber: 'client_fallback',
      status: 'warning'
    }
  } catch (err) {
    console.error('[Defi Chatbot] Photo processing failed:', err)
    return {
      success: false,
      jawaban: 'Terjadi sedikit kendala saat memproses foto. Pastikan koneksi internet stabil dan coba unggah kembali fotomu ya sahabat! ✨',
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
