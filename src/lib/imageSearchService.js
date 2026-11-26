/**
 * PRISMA Image Search Service
 * Mencari gambar relevan dari koleksi lokal PRISMA + Wikimedia Commons (gratis tanpa API key)
 */

const LOCAL_PRISMA_IMAGES = [
  { title: 'Es Batu & Air', url: '/es_batu_card.jpg', keywords: 'es batu air mencair beku cair dingin' },
  { title: 'Anak Belajar / Buku', url: '/quiz/k1-b3-benda.svg', keywords: 'benda bangun ruang bentuk jam jendela atap' },
  { title: 'Panjang Pensil', url: '/quiz/k2-b3-panjang-pensil.svg', keywords: 'pensil panjang ukur klip penggaris' },
  { title: 'Tangram Geometri', url: '/quiz/k2-b6-tangram.svg', keywords: 'tangram segitiga persegi bangun datar bentuk' },
  { title: 'Pecahan Pizza / Kue', url: '/quiz/k3-b1-pecahan.svg', keywords: 'pecahan kue pizza bagi bagian' },
  { title: 'Jam & Waktu', url: '/quiz/k3-b4-jam.svg', keywords: 'jam waktu pukul jarum menit' },
  { title: 'Piktogram Sampah', url: '/quiz/k3-b8-piktogram.svg', keywords: 'piktogram grafik data sampah daur ulang' },
  { title: 'Sudut & Bangun', url: '/quiz/k4-b6-sudut.svg', keywords: 'sudut siku lancip tumpul geometri' },
  { title: 'Diagram Batang', url: '/quiz/k5-b8-diagram.svg', keywords: 'diagram batang grafik data statistik' }
]

/**
 * Cari gambar relevan berdasarkan kata kunci dari aset lokal PRISMA dan Wikimedia Commons
 * @param {string} query
 * @returns {Promise<Array<{title: string, url: string, source: string}>>}
 */
export async function searchRelevantImages(query) {
  const clean = (query || '').trim()
  if (!clean) return LOCAL_PRISMA_IMAGES.slice(0, 6).map(i => ({ ...i, source: 'PRISMA' }))

  const lower = clean.toLowerCase()
  const tokens = lower.split(/\s+/).filter(Boolean)

  // 1. Cari di koleksi lokal PRISMA (instan)
  const localMatches = LOCAL_PRISMA_IMAGES
    .filter(item => tokens.some(t => item.keywords.includes(t) || item.title.toLowerCase().includes(t)))
    .map(item => ({ title: item.title, url: item.url, source: 'PRISMA' }))

  // 2. Cari di Wikimedia Commons API (CORS enabled, gratis tanpa API key)
  let onlineMatches = []
  try {
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(clean)}&gsrlimit=8&prop=imageinfo&iiprop=url|thumburl|mime&iiurlwidth=480&format=json&origin=*`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const resp = await fetch(endpoint, { signal: controller.signal })
    clearTimeout(timer)

    if (resp.ok) {
      const data = await resp.json()
      const pages = Object.values(data?.query?.pages || {})
      onlineMatches = pages
        .map(p => {
          const info = p.imageinfo?.[0]
          const mime = info?.mime || ''
          const url = info?.thumburl || info?.url || ''
          if (!url || (!mime.startsWith('image/jpeg') && !mime.startsWith('image/png') && !mime.startsWith('image/webp') && !mime.startsWith('image/svg'))) {
            return null
          }
          return {
            title: (p.title || '').replace(/^File:/i, '').replace(/\.[^.]+$/, ''),
            url,
            source: 'Wikimedia'
          }
        })
        .filter(Boolean)
    }
  } catch (err) {
    console.warn('[ImageSearch] Pencarian online dilewati:', err?.message || err)
  }

  return [...localMatches, ...onlineMatches].slice(0, 12)
}
