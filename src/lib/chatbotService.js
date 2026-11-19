/**
 * PRISMA Chatbot Defi - Client Service
 * Menghubungkan antarmuka frontend dengan server FastAPI Defi (prisma-chatbot/main.py)
 * Mendukung mode Hybrid Offline-First: Kalkulator Dinamis, TF-IDF CSV, Ollama Lokal, dan Gemini Vision.
 */

/**
 * Menentukan URL API yang valid dan aman dari pemblokiran Mixed-Content di HTTPS
 */
export function getResolvedApiUrl(customUrl) {
  if (customUrl) return customUrl.replace(/\/$/, '')

  const envUrl = import.meta.env.VITE_CHATBOT_API_URL
  if (envUrl && envUrl.trim() && !envUrl.includes('localhost')) {
    return envUrl.replace(/\/$/, '')
  }

  // Jika web sedang berjalan di hosting HTTPS (misal Vercel/Netlify):
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    if (envUrl && envUrl.startsWith('https://')) {
      return envUrl.replace(/\/$/, '')
    }
    // Jika envUrl belum diatur ke domain HTTPS publik, jangan panggil http://localhost
    // agar browser tidak memblokir dan tidak memunculkan Mixed-Content error
    return null
  }

  // Pengujian di lokal (localhost)
  return envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:8000'
}

/**
 * Cek status kesehatan server chatbot Defi
 * @param {string} [baseUrl] 
 * @returns {Promise<{ isOnline: boolean, isHostedWithoutBackend?: boolean, data?: any, error?: string }>}
 */
export async function checkChatbotStatus(baseUrl) {
  const resolved = getResolvedApiUrl(baseUrl)

  if (!resolved) {
    return {
      isOnline: false,
      isHostedWithoutBackend: true,
      error: 'Web berjalan di HTTPS publik, backend cloud belum disambungkan di Vercel'
    }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const resp = await fetch(`${resolved}/`, {
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
export async function sendChatText({ pertanyaan, kelas = '', kategori = '' }, baseUrl) {
  const resolved = getResolvedApiUrl(baseUrl)

  // Jika web di-hosting di HTTPS dan backend belum dihubungkan ke server cloud publik
  if (!resolved) {
    const clientFallback = generateClientFallback(pertanyaan, kelas)
    return {
      success: true,
      isClientFallback: true,
      isHostedWithoutBackend: true,
      jawaban: clientFallback.jawaban,
      sumber: clientFallback.sumber,
      status: 'fallback',
      metadata: { serverOffline: true }
    }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)

    const resp = await fetch(`${resolved}/chat`, {
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
export async function sendChatPhoto({ foto, pertanyaan = '', kelas = '' }, baseUrl) {
  const resolved = getResolvedApiUrl(baseUrl)

  if (!resolved) {
    return {
      success: false,
      isClientFallback: true,
      isHostedWithoutBackend: true,
      jawaban: 'Fitur analisis foto membutuhkan server backend Python (Gemini Vision) aktif di cloud. Silakan hubungkan URL backend di pengaturan Vercel (VITE_CHATBOT_API_URL). Namun kamu tetap bisa mengetikkan soal langsung ke Kak Defi ya! ✨',
      sumber: 'client_fallback',
      status: 'notice'
    }
  }

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

    const resp = await fetch(`${resolved}/chat-foto`, {
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
      jawaban: `Wah, Kak Defi belum bisa memproses fotomu saat ini (${err.message}). Pastikan server chatbot Defi di cloud sudah aktif ya! Kamu juga bisa ketikkan teks soalnya langsung ke Kak Defi. ✨`,
      sumber: 'client_fallback',
      status: 'error'
    }
  }
}

/**
 * Knowledge Base Mandiri di sisi Browser (Client-side)
 * Memastikan web yang di-hosting tetap responsif & pintar untuk siswa SD
 */
const CLIENT_KNOWLEDGE_BASE = [
  {
    keywords: ['ide pokok', 'gagasan utama', 'pikiran pokok'],
    jawaban: 'Ide pokok adalah gagasan atau pikiran utama yang menjadi inti pembahasan dalam suatu paragraf. Dalam satu paragraf biasanya ada satu ide pokok yang terletak pada kalimat utama (bisa di awal, di akhir, atau campuran). Memahami ide pokok membuat kita cepat paham isi cerita!'
  },
  {
    keywords: ['huruf vokal', 'huruf konsonan', 'a i u e o'],
    jawaban: 'Huruf vokal adalah huruf hidup yang memberi bunyi jelas, yaitu: a, i, u, e, dan o. Sedangkan huruf konsonan adalah semua huruf abjad selain huruf vokal (seperti b, c, d, k, m, p). Contohnya pada kata "buku", huruf vokalnya adalah u, dan konsonannya adalah b dan k!'
  },
  {
    keywords: ['pecahan 1/2', 'setengah', 'satu per dua'],
    jawaban: 'Pecahan 1/2 (setengah) artinya satu benda utuh dipotong menjadi 2 bagian yang SAMA BESAR. Jika ukurannya tidak sama besar, maka potongannya belum bisa disebut pecahan 1/2 ya!'
  },
  {
    keywords: ['nilai tempat', 'puluhan', 'satuan'],
    jawaban: 'Nilai tempat menentukan nilai suatu angka berdasarkan letaknya. Pada bilangan dua angka seperti 45: angka kiri (4) menempati tempat puluhan bernilai 40, sedangkan angka kanan (5) menempati tempat satuan bernilai 5. Jadi 45 = 4 puluhan + 5 satuan!'
  },
  {
    keywords: ['1 meter', 'meter ke cm', 'sentimeter', 'panjang'],
    jawaban: '1 meter (m) sama dengan 100 sentimeter (cm). Satuan meter biasanya dipakai untuk mengukur benda yang panjang seperti pita lomba, panjang meja, atau tinggi badan, sedangkan sentimeter dipakai untuk benda kecil seperti pensil dan penghapus!'
  },
  {
    keywords: ['tanda baca', 'tanda titik', 'tanda tanya', 'tanda seru'],
    jawaban: 'Tanda titik (.) dipakai di akhir kalimat berita. Tanda tanya (?) dipakai saat menanyakan sesuatu. Tanda seru (!) dipakai untuk kalimat ajakan, perintah, atau kagum. Gunakan tanda baca agar tulisanmu mudah dipahami ya!'
  }
]

/**
 * Fallback kalkulator dinamis & materi di sisi browser
 */
function generateClientFallback(text, kelas) {
  const lower = text.toLowerCase().trim()

  // 1. Hitung matematika dinamis (tambah, kurang, kali, bagi)
  const mathMatch = lower.match(/(\d+)\s*([\+\-\*\/xX]|kali|bagi|tambah|kurang)\s*(\d+)/)
  if (mathMatch) {
    const a = parseInt(mathMatch[1], 10)
    const op = mathMatch[2]
    const b = parseInt(mathMatch[3], 10)
    let res = 0
    let symbol = '+'
    let opName = 'penjumlahan'

    if (op === '+' || op === 'tambah') {
      res = a + b
      symbol = '+'
      opName = 'penjumlahan'
    } else if (op === '-' || op === 'kurang') {
      res = a - b
      symbol = '-'
      opName = 'pengurangan'
    } else if (op === '*' || op === 'x' || op === 'X' || op === 'kali') {
      res = a * b
      symbol = '×'
      opName = 'perkalian'
    } else if (op === '/' || op === 'bagi') {
      res = b !== 0 ? Math.round((a / b) * 100) / 100 : 'tidak terdefinisi'
      symbol = '÷'
      opName = 'pembagian'
    }

    return {
      sumber: 'kalkulator_matematika',
      jawaban: `Halo! Hasil ${opName} dari ${a} ${symbol} ${b} adalah ${res}. Kamu hebat sekali suka berlatih berhitung bersama PRISMA! Tetap semangat ya! ✨`
    }
  }

  // 2. Cocokkan dengan materi esensial SD
  for (const item of CLIENT_KNOWLEDGE_BASE) {
    if (item.keywords.some(k => lower.includes(k))) {
      return {
        sumber: 'lokal_csv',
        jawaban: item.jawaban
      }
    }
  }

  // 3. Sapaan ramah
  if (/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test)/.test(lower)) {
    return {
      sumber: 'client_greeting',
      jawaban: 'Halo sahabat pintar PRISMA! 👋 Aku Defi, teman belajar ceria kamu. Mau tanya soal matematika, membaca cerita, atau latihan soal hari ini? Kak Defi siap bantu!'
    }
  }

  // 4. Default ramah
  return {
    sumber: 'client_fallback',
    jawaban: `Halo! Kak Defi senang sekali kamu bertanya tentang "${text}". Kak Defi siap menemani belajar ${kelas || 'semua kelas SD'}. (Tips: tanyakan materi seperti "apa itu ide pokok", "pecahan 1/2", atau hitung angka seperti "25 x 4" ya!) ✨`
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
