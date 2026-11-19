/**
 * PRISMA Chatbot Defi - Client Service
 * Menghubungkan antarmuka frontend dengan server FastAPI Defi (prisma-chatbot/main.py)
 * Mendukung mode Hybrid Offline-First: Kalkulator Dinamis, TF-IDF CSV, Ollama Lokal, dan Gemini Vision.
 */

const DEFAULT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000'

/**
 * Cek status kesehatan server chatbot Defi
 * @param {string} [baseUrl] 
 * @returns {Promise<{ isOnline: boolean, data?: any, error?: string }>}
 */
export async function checkChatbotStatus(baseUrl = DEFAULT_API_URL) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500)

    const resp = await fetch(`${baseUrl.replace(/\/$/, '')}/`, {
      method: 'GET',
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (resp.ok) {
      const data = await resp.json()
      return { isOnline: true, data }
    }
    return { isOnline: false, error: `HTTP ${resp.status}` }
  } catch (err) {
    return { isOnline: false, error: err.message || 'Koneksi gagal' }
  }
}

/**
 * Kirim pesan teks ke Chatbot Defi
 * @param {Object} params
 * @param {string} params.pertanyaan
 * @param {string} [params.kelas] - 'Kelas 1' s/d 'Kelas 6'
 * @param {string} [params.kategori] - 'literasi' | 'numerasi' | 'gabungan'
 * @param {string} [baseUrl]
 */
export async function sendChatText({ pertanyaan, kelas = '', kategori = '' }, baseUrl = DEFAULT_API_URL) {
  const cleanBase = baseUrl.replace(/\/$/, '')
  try {
    const controller = new AbortController()
    // Berikan timeout 45 detik bila Ollama lokal sedang berpikir
    const timeoutId = setTimeout(() => controller.abort(), 45000)

    const resp = await fetch(`${cleanBase}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pertanyaan: pertanyaan.trim(),
        kelas: kelas || undefined,
        kategori: kategori || undefined
      }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!resp.ok) {
      throw new Error(`Server merespons kode status ${resp.status}`)
    }

    const data = await resp.json()
    return {
      success: true,
      jawaban: data.jawaban || 'Halo! Kak Defi sudah membaca pertanyaanmu tapi belum ada respon yang pas. Coba tanyakan dengan kata lain ya! ✨',
      sumber: data.sumber || 'lokal_csv',
      status: data.status || 'success',
      confidence: data.confidence ?? 1.0,
      metadata: data.metadata || {}
    }
  } catch (err) {
    console.warn('[Defi Chatbot] Server request failed, activating client fallback:', err)

    // Fallback cerdas di sisi browser jika server FastAPI belum dijalankan
    const clientFallback = generateClientFallback(pertanyaan, kelas)
    return {
      success: false,
      isClientFallback: true,
      jawaban: clientFallback.jawaban,
      sumber: clientFallback.sumber,
      status: 'fallback',
      metadata: { serverOffline: true }
    }
  }
}

/**
 * Kirim foto soal ke Chatbot Defi (/chat-foto)
 * @param {Object} params
 * @param {File|Blob} params.foto
 * @param {string} [params.pertanyaan]
 * @param {string} [params.kelas]
 * @param {string} [baseUrl]
 */
export async function sendChatPhoto({ foto, pertanyaan = '', kelas = '' }, baseUrl = DEFAULT_API_URL) {
  const cleanBase = baseUrl.replace(/\/$/, '')
  try {
    const formData = new FormData()
    formData.append('foto', foto)
    if (pertanyaan && pertanyaan.trim()) {
      formData.append('pertanyaan', pertanyaan.trim())
    }
    if (kelas && kelas.trim()) {
      formData.append('kelas', kelas.trim())
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)

    const resp = await fetch(`${cleanBase}/chat-foto`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!resp.ok) {
      const errJson = await resp.json().catch(() => ({}))
      throw new Error(errJson.detail || `Server foto merespons status ${resp.status}`)
    }

    const data = await resp.json()
    return {
      success: true,
      jawaban: data.jawaban,
      sumber: data.sumber || 'gemini_vision',
      status: data.status || 'success',
      metadata: data.metadata || {}
    }
  } catch (err) {
    console.error('[Defi Chatbot] Photo upload failed:', err)
    return {
      success: false,
      isClientFallback: true,
      jawaban: `Wah, Kak Defi belum bisa memproses fotomu saat ini (${err.message}). Pastikan server chatbot Defi di latar belakang sudah aktif ya! Kamu juga bisa ketikkan teks soalnya langsung ke Kak Defi. ✨`,
      sumber: 'client_fallback',
      status: 'error'
    }
  }
}

/**
 * Fallback kalkulator & panduan jika server python belum menyala
 */
function generateClientFallback(text, kelas) {
  const lower = text.toLowerCase().trim()

  // Selesaikan operasi hitung sederhana (tambah, kurang, kali, bagi)
  const mathMatch = lower.match(/(\d+)\s*([\+\-\*\/xX]|kali|bagi|tambah|kurang)\s*(\d+)/)
  if (mathMatch) {
    const a = parseInt(mathMatch[1], 10)
    const op = mathMatch[2]
    const b = parseInt(mathMatch[3], 10)
    let res = 0
    let symbol = '+'

    if (op === '+' || op === 'tambah') {
      res = a + b
      symbol = '+'
    } else if (op === '-' || op === 'kurang') {
      res = a - b
      symbol = '-'
    } else if (op === '*' || op === 'x' || op === 'X' || op === 'kali') {
      res = a * b
      symbol = '×'
    } else if (op === '/' || op === 'bagi') {
      res = b !== 0 ? Math.round((a / b) * 100) / 100 : 'tidak terdefinisi'
      symbol = '÷'
    }

    return {
      sumber: 'kalkulator_matematika',
      jawaban: `Halo! Hasil perhitungan dari ${a} ${symbol} ${b} adalah ${res}. Tetap semangat belajar berhitung bersama PRISMA ya! ✨`
    }
  }

  // Sapaan ramah
  if (/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test)/.test(lower)) {
    return {
      sumber: 'client_greeting',
      jawaban: 'Halo sahabat pintar PRISMA! 👋 Aku Defi, teman belajar ceria kamu. Mau tanya soal matematika, membaca cerita, atau latihan soal hari ini? Kak Defi siap bantu!'
    }
  }

  // Jawaban bawaan ramah mengarahkan
  return {
    sumber: 'client_fallback',
    jawaban: `Halo! Kak Defi senang sekali kamu bertanya tentang "${text}". Kak Defi siap menjawab pertanyaan literasi dan numerasi untuk ${kelas || 'semua kelas SD'}. (Tips: pastikan server backend chatbot Defi di port 8000 sudah berjalan agar seluruh 420+ materi PRISMA & AI aktif maksimal ya!) ✨`
  }
}

/**
 * Text-to-Speech (Membaca jawaban Defi dengan suara ramah)
 */
let currentUtterance = null

export function speakText(text, onEnd) {
  if (!('speechSynthesis' in window)) return false
  stopSpeech()

  // Bersihkan karakter markdown agar dibaca alami
  const clean = text.replace(/[*_#`~\[\]\(\)]/g, ' ').replace(/\s+/g, ' ').trim()
  if (!clean) return false

  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = 'id-ID'
  utter.rate = 0.95 // Tempo ramah anak, jelas dan bersahabat
  utter.pitch = 1.05

  // Cari suara Bahasa Indonesia bila tersedia di browser
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
