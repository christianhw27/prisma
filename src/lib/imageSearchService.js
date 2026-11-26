/**
 * PRISMA Image Search Service
 * Mencari gambar relevan dari koleksi lokal PRISMA + Openverse + Wikipedia + Wikimedia Commons
 * (semua gratis, mendukung CORS, tanpa API key) dengan auto-translate kata kunci ID -> EN.
 */

const LOCAL_PRISMA_IMAGES = [
  { title: 'Es Batu & Air', url: '/es_batu_card.jpg', keywords: 'es batu air mencair beku cair dingin ice water' },
  { title: 'Anak Belajar / Buku', url: '/quiz/k1-b3-benda.svg', keywords: 'benda bangun ruang bentuk jam jendela atap object shape' },
  { title: 'Panjang Pensil', url: '/quiz/k2-b3-panjang-pensil.svg', keywords: 'pensil panjang ukur klip penggaris pencil ruler' },
  { title: 'Tangram Geometri', url: '/quiz/k2-b6-tangram.svg', keywords: 'tangram segitiga persegi bangun datar bentuk geometry triangle square' },
  { title: 'Pecahan Pizza / Kue', url: '/quiz/k3-b1-pecahan.svg', keywords: 'pecahan kue pizza bagi bagian fraction pie' },
  { title: 'Jam & Waktu', url: '/quiz/k3-b4-jam.svg', keywords: 'jam waktu pukul jarum menit clock time' },
  { title: 'Piktogram Sampah', url: '/quiz/k3-b8-piktogram.svg', keywords: 'piktogram grafik data sampah daur ulang pictogram chart trash' },
  { title: 'Sudut & Bangun', url: '/quiz/k4-b6-sudut.svg', keywords: 'sudut siku lancip tumpul geometri angle' },
  { title: 'Diagram Batang', url: '/quiz/k5-b8-diagram.svg', keywords: 'diagram batang grafik data statistik bar chart graph' }
]

const ID_EN_DICT = {
  'tata surya': 'solar system',
  'daur air': 'water cycle',
  'es batu': 'ice cube',
  'bangun datar': 'geometric shapes',
  'bangun ruang': '3d geometric shapes',
  'diagram batang': 'bar chart',
  'rantai makanan': 'food chain',
  'siklus hidup': 'life cycle',
  'pecahan': 'fraction',
  'tumbuhan': 'plant',
  'tanaman': 'plant',
  'pohon': 'tree',
  'bunga': 'flower',
  'daun': 'leaf',
  'akar': 'plant roots',
  'hewan': 'animal',
  'binatang': 'animal',
  'kucing': 'cat',
  'anjing': 'dog',
  'burung': 'bird',
  'ikan': 'fish',
  'gajah': 'elephant',
  'kupu-kupu': 'butterfly',
  'matahari': 'sun',
  'bulan': 'moon',
  'bumi': 'planet earth',
  'bintang': 'star',
  'planet': 'planet',
  'air': 'water',
  'api': 'fire',
  'awan': 'cloud',
  'hujan': 'rain',
  'pelangi': 'rainbow',
  'gunung': 'mountain',
  'laut': 'ocean',
  'sungai': 'river',
  'hutan': 'forest',
  'buah': 'fruit',
  'apel': 'apple',
  'jeruk': 'orange fruit',
  'pisang': 'banana',
  'sayur': 'vegetables',
  'segitiga': 'triangle',
  'persegi': 'square',
  'lingkaran': 'circle',
  'kubus': 'cube',
  'balok': 'cuboid',
  'bola': 'ball',
  'jam': 'clock',
  'waktu': 'clock time',
  'uang': 'money coins',
  'sampah': 'trash recycling',
  'fotosintesis': 'photosynthesis',
  'magnet': 'magnet',
  'listrik': 'electricity',
  'pensil': 'pencil',
  'buku': 'book',
  'sekolah': 'school',
  'anak': 'children learning',
  'belajar': 'student studying',
  'sepeda': 'bicycle',
  'mobil': 'car',
  'rumah': 'house',
  'peta': 'map',
  'indonesia': 'indonesia',
  'bendera': 'flag'
}

const NOISY_WIKIMEDIA_RE = /\b(djvu|scan|gravestone|tombstone|herbarium|signature|autograph|manuscript)\b/i

async function fetchWithTimeout(url, timeoutMs = 5500) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Terjemahkan kata kunci Indonesia ke Inggris agar hasil pencarian gambar jauh lebih relevan.
 * Cek kamus cepat dulu, lalu fallback ke MyMemory API (gratis, CORS enabled).
 */
async function translateQueryToEnglish(query) {
  const lower = query.toLowerCase().trim()
  if (ID_EN_DICT[lower]) return ID_EN_DICT[lower]

  // Ganti frasa/kata yang ada di kamus jika cocok sebagian
  let replaced = lower
  let changed = false
  for (const [idTerm, enTerm] of Object.entries(ID_EN_DICT)) {
    const re = new RegExp(`\\b${idTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    if (re.test(replaced)) {
      replaced = replaced.replace(re, enTerm)
      changed = true
    }
  }
  if (changed) return replaced

  // Fallback ke MyMemory Translate API untuk kata Indonesia umum
  try {
    const resp = await fetchWithTimeout(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=id|en`,
      2500
    )
    if (resp.ok) {
      const data = await resp.json()
      const translated = data?.responseData?.translatedText?.trim()
      if (translated && !/MYMEMORY WARNING/i.test(translated)) {
        return translated
      }
    }
  } catch {
    // Abaikan jika timeout/offline, pakai query asli
  }

  return query
}

async function searchOpenverse(query) {
  try {
    const endpoint = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=10&mature=false`
    const resp = await fetchWithTimeout(endpoint, 6000)
    if (!resp.ok) return []
    const data = await resp.json()
    return (data?.results || [])
      .map(item => {
        const url = item.thumbnail || item.url || ''
        if (!url) return null
        return {
          title: item.title || query,
          url,
          source: 'Openverse'
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

async function searchWikipedia(query) {
  try {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=6&prop=pageimages&piprop=thumbnail&pithumbsize=480&format=json&origin=*`
    const resp = await fetchWithTimeout(endpoint, 6000)
    if (!resp.ok) return []
    const data = await resp.json()
    const pages = Object.values(data?.query?.pages || {}).sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
    return pages
      .map(p => {
        const url = p.thumbnail?.source || ''
        if (!url) return null
        return {
          title: p.title || query,
          url,
          source: 'Wikipedia'
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

async function searchWikimedia(query) {
  try {
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url|thumburl|mime&iiurlwidth=480&format=json&origin=*`
    const resp = await fetchWithTimeout(endpoint, 6000)
    if (!resp.ok) return []
    const data = await resp.json()
    const pages = Object.values(data?.query?.pages || {}).sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
    return pages
      .map(p => {
        const info = p.imageinfo?.[0]
        const mime = info?.mime || ''
        const url = info?.thumburl || info?.url || ''
        const title = (p.title || '').replace(/^File:/i, '').replace(/\.[^.]+$/, '')
        if (!url || NOISY_WIKIMEDIA_RE.test(title)) return null
        if (
          !mime.startsWith('image/jpeg') &&
          !mime.startsWith('image/png') &&
          !mime.startsWith('image/webp') &&
          !mime.startsWith('image/svg')
        ) {
          return null
        }
        return {
          title,
          url,
          source: 'Wikimedia'
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

/**
 * Cari gambar relevan berdasarkan kata kunci dari aset lokal PRISMA, Openverse, Wikipedia, dan Wikimedia Commons
 * @param {string} query
 * @returns {Promise<Array<{title: string, url: string, source: string}>>}
 */
export async function searchRelevantImages(query) {
  const clean = (query || '').trim()
  if (!clean) return LOCAL_PRISMA_IMAGES.slice(0, 6).map(i => ({ ...i, source: 'PRISMA' }))

  const lower = clean.toLowerCase()
  const tokens = lower.split(/\s+/).filter(Boolean)

  // 1. Cari di koleksi lokal PRISMA (instan, diurutkan berdasar kecocokan terbanyak)
  const localMatches = LOCAL_PRISMA_IMAGES
    .map(item => {
      const haystack = `${item.keywords} ${item.title.toLowerCase()}`
      const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0)
      return { item, score }
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => ({ title: item.title, url: item.url, source: 'PRISMA' }))

  // 2. Terjemahkan query ID -> EN agar sumber gambar online jauh lebih relevan
  const englishQuery = await translateQueryToEnglish(clean)

  // 3. Jalankan pencarian paralel ke Openverse, Wikipedia, dan Wikimedia Commons
  const [openverseRes, wikipediaRes, wikimediaRes] = await Promise.allSettled([
    searchOpenverse(englishQuery),
    searchWikipedia(englishQuery),
    searchWikimedia(englishQuery)
  ])

  const openverse = openverseRes.status === 'fulfilled' ? openverseRes.value : []
  const wikipedia = wikipediaRes.status === 'fulfilled' ? wikipediaRes.value : []
  const wikimedia = wikimediaRes.status === 'fulfilled' ? wikimediaRes.value : []

  // Gabungkan dengan urutan prioritas: Lokal -> Openverse -> Wikipedia -> Wikimedia (dedup by URL)
  const seen = new Set()
  const combined = []
  for (const item of [...localMatches, ...openverse, ...wikipedia, ...wikimedia]) {
    if (!item?.url || seen.has(item.url)) continue
    seen.add(item.url)
    combined.push(item)
    if (combined.length >= 18) break
  }

  return combined
}
