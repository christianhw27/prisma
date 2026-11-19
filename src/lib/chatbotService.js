/**
 * PRISMA Chatbot Defi - Client Service
 * Menghubungkan antarmuka frontend dengan server FastAPI Defi (prisma-chatbot/main.py)
 * Mendukung mode Hybrid Offline-First: Kalkulator Dinamis, TF-IDF CSV, Ollama Lokal, dan Gemini Vision.
 * Dilengkapi Client-Side Intelligent Engine (421 materi langsung di browser tanpa perlu hosting backend).
 */

let clientDatasetCache = null
let isDatasetLoading = false

/**
 * Memuat dataset 421 materi ke dalam memori browser (sangat ringan, ~65 KB gzipped)
 */
export async function loadClientDataset() {
  if (clientDatasetCache && clientDatasetCache.length) return clientDatasetCache
  if (isDatasetLoading) {
    while (isDatasetLoading) {
      await new Promise(r => setTimeout(r, 60))
    }
    return clientDatasetCache
  }

  isDatasetLoading = true
  try {
    const resp = await fetch('/chatbot-dataset.json')
    if (resp.ok) {
      clientDatasetCache = await resp.json()
      // Dataset berhasil dimuat
    }
  } catch (e) {
    console.warn('[Defi Client Engine] Gagal memuat dataset statis:', e)
  } finally {
    isDatasetLoading = false
  }
  return clientDatasetCache
}

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
  // Pastikan dataset browser juga mulai dimuat di background
  loadClientDataset().catch(() => {})

  const resolved = getResolvedApiUrl(baseUrl)

  if (!resolved) {
    return {
      isOnline: false,
      isHostedWithoutBackend: true,
      error: 'Web berjalan di mode mandiri browser (421 materi aktif langsung)'
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
    const clientResult = await generateClientResponse(pertanyaan, kelas)
    return {
      success: true,
      isClientFallback: true,
      isHostedWithoutBackend: true,
      jawaban: clientResult.jawaban,
      sumber: clientResult.sumber,
      status: 'success',
      metadata: clientResult.metadata || {}
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

    const clientResult = await generateClientResponse(pertanyaan, kelas)
    return {
      success: true,
      isClientFallback: true,
      jawaban: clientResult.jawaban,
      sumber: clientResult.sumber,
      status: 'fallback',
      metadata: clientResult.metadata || { serverOffline: true }
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
      jawaban: 'Fitur analisis foto membutuhkan server cloud aktif dengan Gemini Vision. Di web hosting saat ini, seluruh fitur tanya-jawab materi SD (421 topik) dan kalkulator langkah matematika aktif 100% langsung di browser! Kamu bisa ketikkan teks soalnya ke Kak Defi ya! ✨',
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
      jawaban: `Wah, Kak Defi belum bisa memproses fotomu saat ini (${err.message}). Kamu bisa ketikkan teks soalnya langsung ke Kak Defi, Kak Defi siap bantu jawab! ✨`,
      sumber: 'client_fallback',
      status: 'error'
    }
  }
}

/**
 * Pencarian Cerdas Client-Side dari 421 baris materi PRISMA
 */
async function searchClientDataset(query, filterKelas) {
  const dataset = await loadClientDataset()
  if (!dataset || !dataset.length) return null

  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  const words = cleanQuery.split(/\s+/).filter(w => w.length > 2)
  if (!words.length) return null

  let best = null
  let bestScore = 0

  for (const item of dataset) {
    if (filterKelas && filterKelas !== 'Semua' && item.kelas && item.kelas !== filterKelas) {
      continue
    }

    let score = 0
    const topic = (item.pertanyaan_atau_topik || '').toLowerCase()
    const keywords = (item.kata_kunci || '').toLowerCase()
    const ans = (item.jawaban || '').toLowerCase()

    // Kecocokan frasa utuh
    if (cleanQuery.length > 4 && topic.includes(cleanQuery)) {
      score += 25
    }

    for (const w of words) {
      if (topic.includes(w)) score += 3.5
      if (keywords.includes(w)) score += 2.5
      if (ans.includes(w)) score += 0.5
    }

    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  // Ambang batas kecocokan minimum
  if (best && bestScore >= 4.5) {
    return {
      sumber: 'lokal_csv',
      jawaban: best.jawaban,
      metadata: {
        id_data: best.id_data,
        kelas: best.kelas,
        kategori: best.kategori,
        topik: best.pertanyaan_atau_topik,
        capaian_pembelajaran: best.capaian_pembelajaran,
        score: bestScore
      }
    }
  }

  return null
}

/**
 * Mesin Penjawab Mandiri di Browser (Client-side)
 */
async function generateClientResponse(text, kelas) {
  const lower = text.toLowerCase().trim()

  // 1. Sapaan ramah
  if (/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test|hai kak|halo kak)/.test(lower)) {
    return {
      sumber: 'system_greeting',
      jawaban: 'Halo sahabat pintar PRISMA! 👋 Aku Defi, teman belajar ceria kamu. Mau tanya soal berhitung matematika, materi membaca cerita, atau latihan soal hari ini? Kak Defi siap bantu!'
    }
  }

  // 2. Kalkulator Matematika Dinamis dengan Penjelasan Langkah-demi-Langkah
  const mathMatch = lower.match(/(\d+)\s*([\+\-\*\/xX]|kali|bagi|tambah|kurang)\s*(\d+)/)
  if (mathMatch) {
    const a = parseInt(mathMatch[1], 10)
    const op = mathMatch[2]
    const b = parseInt(mathMatch[3], 10)
    let res = 0
    let stepExplanation = ''

    if (op === '+' || op === 'tambah') {
      res = a + b
      stepExplanation = `Yuk selesaikan penjumlahan ${a} + ${b} bersama Kak Defi! 1. Kita jumlahkan bilangan ${a} dengan ${b}. 2. Hasil akhir yang diperoleh adalah ${res}. Hebat sekali, kamu teliti berhitung!`
    } else if (op === '-' || op === 'kurang') {
      res = a - b
      stepExplanation = `Yuk selesaikan pengurangan ${a} - ${b} bersama Kak Defi! 1. Bilangan mula-mula ${a} dikurangi sebanyak ${b}. 2. Sisa yang diperoleh adalah ${res}. Kerja bagus, terus berlatih ya!`
    } else if (op === '*' || op === 'x' || op === 'X' || op === 'kali') {
      res = a * b
      stepExplanation = `Yuk selesaikan perkalian ${a} × ${b} bersama Kak Defi! Perkalian adalah penjumlahan berulang: artinya ${a} dijumlahkan sebanyak ${b} kali. Hasil akhirnya adalah ${res}. Luar biasa, perkalianmu tepat sekali!`
    } else if (op === '/' || op === 'bagi') {
      if (b === 0) {
        stepExplanation = `Dalam matematika, bilangan tidak bisa dibagi dengan angka 0 ya sahabat pintar. Coba dengan pembagi yang lain!`
      } else {
        res = Math.round((a / b) * 100) / 100
        stepExplanation = `Yuk selesaikan pembagian ${a} ÷ ${b} bersama Kak Defi! Pembagian adalah pengurangan berulang hingga habis. Hasil dari ${a} dibagi ${b} adalah ${res}. Kamu pintar sekali!`
      }
    }

    return {
      sumber: 'kalkulator_matematika',
      jawaban: stepExplanation,
      metadata: { topik: `Perhitungan ${a} dan ${b}` }
    }
  }

  // 3. Pencarian 421 Materi PRISMA
  const datasetMatch = await searchClientDataset(text, kelas)
  if (datasetMatch) {
    return datasetMatch
  }

  // 4. Fallback edukatif jika tidak cocok
  return {
    sumber: 'client_fallback',
    jawaban: `Halo! Kak Defi senang kamu bertanya. Kak Defi siap membantu materi ${kelas || 'semua kelas SD'} seputar ide pokok, huruf vokal/konsonan, pecahan, bangun datar, atau menghitung angka (seperti "25 x 4"). Coba tanyakan materi yang ingin kamu pelajari ya! ✨`
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
