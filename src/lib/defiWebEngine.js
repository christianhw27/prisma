/**
 * PRISMA - Defi Web Engine (100% Native Web Port dari prisma-chatbot/main.py)
 * Memindahkan seluruh logika Python (Kalkulator Dinamis, Lemmatizer, TF-IDF Dataset, dan Gemini Vision)
 * langsung ke dalam lingkungan browser / web client tanpa perlu hosting server terpisah.
 */

// ── 1. API Key Gemini dari Konfigurasi Lingkungan (Environment Variables) ───
const DEFAULT_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_MODEL = 'gemini-1.5-flash'

// ── 2. Persona Kak Defi untuk Gemini ──────────────────────────────────────
const DEFI_SYSTEM_PROMPT = `
Kamu adalah Defi, kakak pendamping belajar yang ramah, sabar, dan ceria di platform PRISMA untuk siswa SD (Kelas 1-6, termasuk siswa berkebutuhan khusus/ABK).
Jawab pertanyaan siswa dalam bahasa Indonesia yang sederhana, hangat, dan mudah dipahami anak SD.
Gunakan kalimat pendek (maksimal 10-12 kata per kalimat), berikan langkah-langkah jika perlu menggunakan angka 1. 2. 3. dalam satu paragraf mengalir tanpa enter/newline berlebihan.
Selalu akhiri dengan satu kalimat penyemangat positif.
`

const DEFI_VISION_PROMPT = `
Kamu adalah Kak Defi, kakak pendamping belajar yang ramah, sabar, dan ceria di platform media belajar PRISMA untuk siswa SD (termasuk siswa berkebutuhan khusus/ABK).
Tugas utamamu adalah MEMBACA dan MENJELASKAN foto atau jepretan kamera yang diunggah siswa (bisa berupa foto tulisan tangan di buku tulis, lembar soal matematika/literasi, teks bacaan, atau gambar diagram).

Panduan penting:
1. Bacalah tulisan tangan atau teks cetak pada foto dengan sangat teliti (OCR). Kenali angka, simbol matematika, dan kata-kata tulisan tangan siswa.
2. Tuliskan kembali apa soal atau tulisan yang kamu lihat di foto tersebut secara singkat dan jelas (misalnya: "Dari fotomu, Kak Defi membaca soal berikut: ...").
3. Berikan cara penyelesaian atau penjelasannya langkah demi langkah (1., 2., 3.) dengan bahasa Indonesia yang hangat, sederhana, ramah anak, dan mudah dipahami anak SD.
4. Jangan gunakan kata-kata yang rumit. Jika ada perhitungan, jabarkan langkahnya dengan jelas dan runtut.
5. Selalu akhiri dengan satu kalimat penyemangat positif yang menyenangkan!
`

// ── 3. Kamus Lemma & Sinonim Bahasa Indonesia (dari main.py) ───────────────
export const INDO_LEMMA_MAP = {
  // Penjumlahan / Tambah
  "menjumlahkan": "jumlah",
  "penjumlahan": "jumlah",
  "menjumlah": "jumlah",
  "dijumlahkan": "jumlah",
  "dijumlah": "jumlah",
  "menambahkan": "tambah",
  "penambahan": "tambah",
  "ditambahkan": "tambah",
  "bertambah": "tambah",

  // Pengurangan / Kurang
  "mengurangkan": "kurang",
  "pengurangan": "kurang",
  "mengurang": "kurang",
  "dikurangkan": "kurang",
  "dikurang": "kurang",
  "berkurang": "kurang",

  // Perkalian / Kali
  "mengalikan": "kali",
  "perkalian": "kali",
  "dikalikan": "kali",
  "mengali": "kali",
  "dikali": "kali",
  "berkali": "kali",

  // Pembagian / Bagi
  "membagi": "bagi",
  "membagikan": "bagi",
  "pembagian": "bagi",
  "dibagikan": "bagi",
  "dibagi": "bagi",
  "terbagi": "bagi",

  // Menentukan / Tentu
  "menentukan": "tentu",
  "penentuan": "tentu",
  "ditentukan": "tentu",
  "tertentu": "tentu",

  // Menghitung / Hitung
  "menghitung": "hitung",
  "perhitungan": "hitung",
  "penghitungan": "hitung",
  "dihitung": "hitung",
  "berhitung": "hitung",

  // Membandingkan / Banding
  "membandingkan": "banding",
  "perbandingan": "banding",
  "dibandingkan": "banding",

  // Mengurutkan / Urut
  "mengurutkan": "urut",
  "pengurutan": "urut",
  "diurutkan": "urut",
  "berurutan": "urut",

  // Menyelesaikan / Selesai
  "menyelesaikan": "selesai",
  "penyelesaian": "selesai",
  "diselesaikan": "selesai",

  // Menemukan / Temu
  "menemukan": "temu",
  "penemuan": "temu",
  "ditemukan": "temu",

  // Mencari / Cari
  "mencari": "cari",
  "pencarian": "cari",
  "dicari": "cari",

  // Menyusun / Susun
  "menyusun": "susun",
  "penyusunan": "susun",
  "disusun": "susun",

  // Membedakan / Beda
  "membedakan": "beda",
  "perbedaan": "beda",
  "dibedakan": "beda",

  // Menjelaskan / Jelas
  "menjelaskan": "jelas",
  "penjelasan": "jelas",
  "dijelaskan": "jelas",

  // Mengukur / Ukur
  "mengukur": "ukur",
  "pengukuran": "ukur",
  "diukur": "ukur",

  // Membilang / Bilang
  "membilang": "bilang",
  "pembilangan": "bilang",
  "dibilang": "bilang",

  // Mengubah / Ubah
  "mengubah": "ubah",
  "perubahan": "ubah",
  "diubah": "ubah",

  // Menyederhanakan / Sederhana
  "menyederhanakan": "sederhana",
  "penyederhanaan": "sederhana",
  "disederhanakan": "sederhana",

  // Menggabungkan / Gabung
  "menggabungkan": "gabung",
  "penggabungan": "gabung",
  "digabungkan": "gabung",

  // Menulis / Tulis
  "menuliskan": "tulis",
  "menulis": "tulis",
  "penulisan": "tulis",
  "ditulis": "tulis",

  // Membaca / Baca
  "membaca": "baca",
  "bacaan": "baca",
  "pembacaan": "baca",
  "dibaca": "baca",

  // Menyimpulkan / Simpul
  "menyimpulkan": "simpul",
  "kesimpulan": "simpul",
  "penyimpulan": "simpul",
  "disimpulkan": "simpul"
}

export const SYNONYMS = {
  "jumlah": ["tambah", "total", "gabung"],
  "tambah": ["jumlah", "total", "gabung"],
  "kurang": ["selisih"],
  "selisih": ["kurang"],
  "kali": ["lipat", "ganda"],
  "lipat": ["kali", "ganda"],
  "bagi": ["distribusi", "pecah"],
  "hitung": ["operasi", "kalkulasi"],
  "arti": ["definisi", "pengertian", "maksud", "makna"],
  "definisi": ["arti", "pengertian", "maksud"],
  "pengertian": ["arti", "definisi", "maksud"],
  "makna": ["arti", "maksud", "pengertian"],
  "cara": ["langkah", "tahap", "metode"],
  "langkah": ["cara", "tahap", "metode"],
  "ciri": ["karakteristik", "sifat", "tanda"],
  "contoh": ["misal", "ilustrasi", "sampel"],
  "fungsi": ["kegunaan", "manfaat", "tujuan"],
  "manfaat": ["fungsi", "kegunaan", "faedah"],
  "tujuan": ["fungsi", "maksud", "arah"]
}

export const INDO_STOPWORDS = new Set([
  "yang", "dan", "di", "ke", "dari", "adalah", "untuk",
  "dengan", "pada", "dalam", "sebuah", "suatu", "oleh",
  "juga", "atau", "sebagai", "dapat", "bisa", "akan",
  "telah", "sudah", "ini", "itu", "tersebut", "tentang",
  "secara", "karena", "sehingga", "maka", "tetapi",
  "namun", "hanya", "para", "setiap", "semua", "banyak",
  "beberapa", "lain", "lainnya", "harus", "perlu", "wajib",
  "sangat", "lebih", "paling", "terhadap", "kepada",
  "antar", "antara", "saat", "ketika", "waktu", "bila",
  "jika", "kalau", "agar", "supaya", "meskipun", "walaupun"
])

// ── 4. Formatter & Pembersih Teks Ramah Anak ──────────────────────────────
export function cleanJawaban(text) {
  if (!text) return ''
  let cleaned = text
    .replace(/\r\n/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/[""]/g, "'")
    .replace(/\s{2,}/g, ' ')
    .trim()
  return cleaned
}

function formatNum(val) {
  if (Number.isInteger(val)) return String(val)
  return val.toFixed(2).replace(/\.?0+$/, '').replace('.', ',')
}

// ── 5. Ekstraktor Benda / Satuan (dari main.py) ────────────────────────────
const DAFTAR_BENDA = [
  "buah apel", "butir telur", "butir kelereng", "buah mangga", "buah jeruk",
  "buah kue", "bungkus permen", "buah bola", "batang pensil", "lembar kertas",
  "buah buku", "potong kue", "ekor ikan", "ekor ayam", "ekor burung",
  "apel", "telur", "kelereng", "mangga", "jeruk", "kue", "permen", "bola",
  "pensil", "buku", "penghapus", "penggaris", "biskuit", "roti", "donat",
  "bunga", "balon", "gelas", "piring", "kursi", "meja", "kucing", "ayam",
  "ikan", "kelinci", "anak", "orang", "siswa", "murid", "lembar", "butir",
  "buah", "ekor", "potong", "kotak", "bungkus", "batang", "helai", "tas",
  "rupiah", "meter", "sentimeter", "liter", "gram", "kilogram", "cm", "kg"
]

function extractBenda(query) {
  const qLower = query.toLowerCase()
  for (const benda of DAFTAR_BENDA) {
    const pattern = new RegExp(`\\b${benda}\\b`, 'i')
    if (pattern.test(qLower)) {
      return benda
    }
  }
  return null
}

// ── 6. Mesin Penjelas Matematika Dinamis 100% Sesuai main.py ──────────────
function explainAddition(a, b, benda = null) {
  const res = a + b
  const namaBenda = benda || "buah apel"
  const satuanLabel = benda ? ` ${benda}` : ""

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0 && a <= 10 && b <= 10) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    return cleanJawaban(
      `Halo! Yuk, kita selesaikan penjumlahan ${ia} + ${ib}${satuanLabel} bersama Defi dengan langkah mudah: ` +
      `1. Bayangkan kamu memiliki ${ia} ${namaBenda}. ` +
      `2. Lalu kamu menambahkan lagi ${ib} ${namaBenda}. ` +
      `3. Sekarang kita hitung maju sebanyak ${ib} langkah dari ${ia}: hasilnya adalah ${ir} ${namaBenda}. ` +
      `Kesimpulan: Jadi, hasil dari ${ia} + ${ib}${satuanLabel} adalah ${ir}${satuanLabel}. ` +
      `Pintar sekali! Belajar berhitung bersama Defi itu seru dan mudah. Semangat terus ya!`
    )
  }

  if (Number.isInteger(a) && Number.isInteger(b)) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    const satuanA = ia % 10, satuanB = ib % 10
    const puluhanA = Math.floor(ia / 10) % 10, puluhanB = Math.floor(ib / 10) % 10
    const sumSatuan = satuanA + satuanB
    const sumPuluhan = puluhanA + puluhanB

    let steps = [
      `1. Uraikan bilangan berdasarkan nilai tempatnya: ${ia} = ${ia - satuanA} (${puluhanA} puluhan) + ${satuanA} satuan, dan ${ib} = ${ib - satuanB} (${puluhanB} puluhan) + ${satuanB} satuan.`,
      `2. Jumlahkan angka satuan terlebih dahulu: ${satuanA} satuan + ${satuanB} satuan = ${sumSatuan} satuan.`
    ]

    if (sumSatuan >= 10) {
      const simpan = Math.floor(sumSatuan / 10)
      const sisaSatuan = sumSatuan % 10
      steps.push(
        `3. Karena hasil satuan adalah ${sumSatuan} (lebih dari 9), simpan ${simpan} ke puluhan dan tulis satuannya ${sisaSatuan}. ` +
        `4. Jumlahkan angka puluhan beserta angka simpanan: ${puluhanA} puluhan + ${puluhanB} puluhan + ${simpan} simpanan = ${sumPuluhan + simpan} puluhan. ` +
        `5. Gabungkan hasil puluhan dan satuan untuk mendapatkan jawaban akhir: ${ir}${satuanLabel}.`
      )
    } else {
      steps.push(
        `3. Jumlahkan angka puluhannya: ${puluhanA} puluhan + ${puluhanB} puluhan = ${sumPuluhan} puluhan (nilainya ${sumPuluhan * 10}). ` +
        `4. Gabungkan hasil puluhan dan satuannya: ${sumPuluhan * 10} + ${sumSatuan} = ${ir}${satuanLabel}.`
      )
    }

    return cleanJawaban(
      `Halo! Yuk, kita selesaikan penjumlahan ${ia} + ${ib}${satuanLabel} dengan cara bersusun bersama Defi: ` +
      steps.join(' ') +
      ` Kesimpulan: Jadi, ${ia}${satuanLabel} + ${ib}${satuanLabel} = ${ir}${satuanLabel}. ` +
      `Hebat sekali! Kamu sudah menyelesaikan penjumlahan langkah demi langkah dengan sangat teliti. Tetap semangat belajar ya!`
    )
  }

  return cleanJawaban(
    `Halo! Hasil penjumlahan dari ${formatNum(a)} + ${formatNum(b)}${satuanLabel} adalah ${formatNum(res)}${satuanLabel}. Luar biasa, kamu sangat teliti dalam berhitung!`
  )
}

function explainSubtraction(a, b, benda = null) {
  const res = a - b
  const namaBenda = benda || "kelereng"
  const satuanLabel = benda ? ` ${benda}` : ""

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0 && a <= 10 && b <= 10 && a >= b) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    return cleanJawaban(
      `Halo! Yuk, kita selesaikan pengurangan ${ia} - ${ib}${satuanLabel} bersama Defi dengan langkah mudah: ` +
      `1. Bayangkan kamu memiliki ${ia} ${namaBenda}. ` +
      `2. Lalu sebanyak ${ib} ${namaBenda} diambil atau diberikan kepada temanmu. ` +
      `3. Sekarang kita hitung mundur sebanyak ${ib} langkah dari ${ia}: hasilnya tersisa ${ir} ${namaBenda}. ` +
      `Kesimpulan: Jadi, ${ia}${satuanLabel} - ${ib}${satuanLabel} = ${ir}${satuanLabel}. ` +
      `Pintar sekali! Pengurangan dengan benda nyata membuat berhitung jadi sangat mudah. Semangat terus ya!`
    )
  }

  if (Number.isInteger(a) && Number.isInteger(b)) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    const satuanA = ia % 10, satuanB = ib % 10
    const puluhanA = Math.floor(ia / 10) % 10, puluhanB = Math.floor(ib / 10) % 10

    let steps = [
      `1. Uraikan bilangan berdasarkan nilai tempatnya: ${ia} = ${puluhanA} puluhan + ${satuanA} satuan, dan ${ib} = ${puluhanB} puluhan + ${satuanB} satuan.`
    ]

    if (satuanA >= satuanB) {
      steps.push(
        `2. Kurangkan angka satuannya: ${satuanA} satuan - ${satuanB} satuan = ${satuanA - satuanB} satuan. ` +
        `3. Kurangkan angka puluhannya: ${puluhanA} puluhan - ${puluhanB} puluhan = ${puluhanA - puluhanB} puluhan. ` +
        `4. Gabungkan hasil puluhan dan satuannya: ${(puluhanA - puluhanB) * 10} + ${satuanA - satuanB} = ${ir}${satuanLabel}.`
      )
    } else {
      steps.push(
        `2. Karena satuan ${satuanA} lebih kecil dari ${satuanB}, pinjam 1 puluhan (10) dari angka depan: satuan menjadi ${satuanA + 10}, puluhan tersisa ${puluhanA - 1}. ` +
        `3. Kurangkan angka satuannya: ${satuanA + 10} satuan - ${satuanB} satuan = ${satuanA + 10 - satuanB} satuan. ` +
        `4. Kurangkan angka puluhannya: ${puluhanA - 1} puluhan - ${puluhanB} puluhan = ${puluhanA - 1 - puluhanB} puluhan. ` +
        `5. Gabungkan hasil akhir sehingga diperoleh: ${ir}${satuanLabel}.`
      )
    }

    return cleanJawaban(
      `Halo! Yuk, kita selesaikan pengurangan ${ia} - ${ib}${satuanLabel} bersama Defi: ` +
      steps.join(' ') +
      ` Kesimpulan: Jadi, ${ia}${satuanLabel} - ${ib}${satuanLabel} = ${ir}${satuanLabel}. ` +
      `Hebat sekali! Pengurangan dengan cara bersusun membuat hitunganmu rapi dan tepat. Semangat terus ya!`
    )
  }

  return cleanJawaban(
    `Halo! Hasil pengurangan dari ${formatNum(a)} - ${formatNum(b)}${satuanLabel} adalah ${formatNum(res)}${satuanLabel}. Luar biasa, teruslah rajin berlatih berhitung!`
  )
}

function explainMultiplication(a, b, benda = null) {
  const res = a * b
  const satuanLabel = benda ? ` ${benda}` : ""
  const namaBenda = benda || "benda"

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)

    if (ia <= 10 && ib <= 10) {
      const addTerms = Array(ia).fill(`${ib}${satuanLabel}`).join(' + ') || '0'
      return cleanJawaban(
        `Halo! Yuk, kita selesaikan perkalian ${ia} x ${ib}${satuanLabel} bersama Defi! ` +
        `Konsep dasar perkalian adalah penjumlahan berulang: ${ia} x ${ib} artinya angka ${ib}${satuanLabel} dijumlahkan sebanyak ${ia} kali (${addTerms}). ` +
        `Langkah-langkah pengerjaannya: 1. Tulis bentuk penjumlahan berulang: ${addTerms}. ` +
        `2. Hitung hasil penjumlahan tersebut sehingga diperoleh: ${ir}${satuanLabel}. ` +
        `Kesimpulan: Jadi, hasil dari ${ia} x ${ib}${satuanLabel} adalah ${ir}${satuanLabel}. ` +
        `Keren banget! Kamu sudah paham konsep perkalian dengan sangat baik. Tetap semangat belajar ya!`
      )
    } else {
      const bawah = Math.min(ia, ib), atas = Math.max(ia, ib)
      const satuanAtas = atas % 10
      const puluhanAtas = Math.floor(atas / 10) % 10
      const k1 = bawah * satuanAtas
      const tulisK1 = k1 % 10
      const simpanK1 = Math.floor(k1 / 10)

      return cleanJawaban(
        `Halo! Yuk, kita selesaikan perkalian ${ia} x ${ib}${satuanLabel} bersama Defi! ` +
        `Konsep dasar perkalian adalah penjumlahan berulang: ${ia} x ${ib} artinya menjumlahkan ${atas}${satuanLabel} sebanyak ${bawah} kali. ` +
        `Kita selesaikan dengan cara perkalian bersusun: 1. Kalikan pengali (${bawah}) dengan satuan (${satuanAtas}): ${bawah} x ${satuanAtas} = ${k1}. Tulis angka ${tulisK1} di tempat satuan, dan simpan ${simpanK1}. ` +
        `2. Kalikan pengali (${bawah}) dengan puluhan (${puluhanAtas}): ${bawah} x ${puluhanAtas} = ${bawah * puluhanAtas}. Tambahkan simpanan (${simpanK1}): ${bawah * puluhanAtas} + ${simpanK1} = ${bawah * puluhanAtas + simpanK1}. ` +
        `3. Gabungkan seluruh angka sehingga diperoleh hasil akhir ${ir}${satuanLabel}. ` +
        `Kesimpulan: Jadi, hasil dari ${ia} x ${ib}${satuanLabel} adalah ${ir}${satuanLabel}. ` +
        `Luar biasa! Kamu hebat bisa mengikuti perkalian langkah demi langkah dengan teliti. Semangat terus belajarnya ya!`
      )
    }
  }

  return cleanJawaban(
    `Halo! Hasil perkalian dari ${formatNum(a)} x ${formatNum(b)}${satuanLabel} adalah ${formatNum(res)}${satuanLabel}. Hebat sekali, teruslah rajin berlatih berhitung ya!`
  )
}

function explainDivision(a, b, benda = null) {
  if (b === 0) {
    return cleanJawaban(
      "Wah, dalam matematika kita tidak bisa membagi sebuah bilangan dengan angka 0 ya sahabat pintar! Coba ganti angka pembaginya dengan angka lain selain 0 ya, semangat!"
    )
  }

  const res = a / b
  const satuanLabel = benda ? ` ${benda}` : ""
  const namaBenda = benda || "buah kue"

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b > 0) {
    const ia = Math.round(a), ib = Math.round(b)
    const quotient = Math.floor(ia / ib)
    const remainder = ia % ib

    if (remainder === 0) {
      return cleanJawaban(
        `Halo! Yuk, kita selesaikan pembagian ${ia} : ${ib}${satuanLabel} bersama Defi! ` +
        `Konsep pembagian adalah membagi sama rata (adil) tanpa ada sisa. ` +
        `Bayangkan kamu punya ${ia} ${namaBenda} yang ingin dibagikan secara adil kepada ${ib} teman. ` +
        `Langkah-langkah pengerjaannya: 1. Kita bagi ${ia} ${namaBenda} ke dalam ${ib} kelompok secara sama rata. ` +
        `2. Setiap kelompok mendapatkan tepat ${quotient} ${namaBenda}. ` +
        `3. Karena ${ib} x ${quotient} = ${ia}, maka semua ${namaBenda} terbagi habis tanpa sisa (sisa 0). ` +
        `Kesimpulan: Jadi, hasil dari ${ia} : ${ib}${satuanLabel} adalah ${quotient}${satuanLabel}. ` +
        `Pintar sekali! Langkah-langkahmu sangat tepat dan rapi. Tetap semangat belajar ya!`
      )
    } else {
      const desimalStr = formatNum(res)
      return cleanJawaban(
        `Halo! Yuk, kita selesaikan pembagian ${ia} : ${ib} bersama Defi! ` +
        `Konsep pembagian adalah membagi secara adil (sama rata) kepada beberapa kelompok. ` +
        `Langkah-langkah pengerjaannya: 1. Setiap teman mendapatkan ${quotient} ${namaBenda} secara utuh (${ib} x ${quotient} = ${ib * quotient} ${namaBenda}). ` +
        `2. Sisa ${namaBenda} yang belum terbagikan adalah ${ia} - ${ib * quotient} = ${remainder} ${namaBenda}. ` +
        `3. Bentuk pembagian bersisa: ${ia} : ${ib} = ${quotient} sisa ${remainder}${satuanLabel} (atau dalam desimal = ${desimalStr}${satuanLabel}). ` +
        `Kesimpulan: Jadi, ${ia} dibagi ${ib} hasilnya adalah ${quotient} sisa ${remainder}${satuanLabel}. ` +
        `Hebat sekali! Kamu sudah mengerti pembagian bersisa dengan sangat baik. Tetap semangat ya!`
      )
    }
  }

  return cleanJawaban(
    `Halo! Hasil pembagian dari ${formatNum(a)} : ${formatNum(b)}${satuanLabel} adalah ${formatNum(res)}${satuanLabel}. Pintar sekali, belajar matematika bersama Defi selalu menyenangkan!`
  )
}

// ── 7. Parser Matematika Dinamis (Port solve_dynamic_math) ────────────────
export function solveDynamicMath(query, kelas = null) {
  if (!query) return null
  const raw = query.toLowerCase().replace(/[?!]+$/, '').trim()

  const numbers = raw.match(/\d+(?:[.,]\d+)?/g)
  if (!numbers || numbers.length < 2) return null

  const n1Str = numbers[0]
  const n2Str = numbers[1]

  let opKey = null
  if (/(\d+\s*[:/÷]\s*\d+|\b(?:bagi|dibagi|membagi|bagikan|pembagian)\b)/.test(raw)) {
    opKey = 'div'
  } else if (/(\*|×|\d+\s*[xX]\s*\d+|\b(?:kali|dikali|mengalikan|kalikan|perkalian)\b)/.test(raw)) {
    opKey = 'mul'
  } else if (/(\d+\s*-\s*\d+|\b(?:kurang|dikurang|mengurangkan|kurangkan|pengurangan|selisih)\b)/.test(raw)) {
    opKey = 'sub'
  } else if (/(\+|\b(?:tambah|ditambah|menjumlahkan|jumlahkan|dijumlahkan|penjumlahan|jumlah|gabung|gabungkan)\b)/.test(raw)) {
    opKey = 'add'
  }

  if (!opKey) return null

  const a = parseFloat(n1Str.replace(',', '.'))
  const b = parseFloat(n2Str.replace(',', '.'))
  if (isNaN(a) || isNaN(b)) return null

  const benda = extractBenda(query)
  let jawaban = ''
  let opLabel = ''

  if (opKey === 'add') {
    jawaban = explainAddition(a, b, benda)
    opLabel = `Penjumlahan (${n1Str} dan ${n2Str})`
  } else if (opKey === 'sub') {
    jawaban = explainSubtraction(a, b, benda)
    opLabel = `Pengurangan (${n1Str} dan ${n2Str})`
  } else if (opKey === 'mul') {
    jawaban = explainMultiplication(a, b, benda)
    opLabel = `Perkalian (${n1Str} dan ${n2Str})`
  } else if (opKey === 'div') {
    jawaban = explainDivision(a, b, benda)
    opLabel = `Pembagian (${n1Str} dan ${n2Str})`
  }

  return {
    sumber: 'kalkulator_matematika',
    status: 'success',
    confidence: 1.0,
    jawaban,
    metadata: {
      id_data: 'MATH_DYNAMIC',
      kelas: kelas || 'Semua Kelas',
      kategori: 'numerasi',
      topik: opLabel,
      capaian_pembelajaran: 'Menghitung matematika dinamis langkah demi langkah'
    }
  }
}

// ── 8. Pencarian Cerdas TF-IDF / Keyword di 421 Materi PRISMA ─────────────
let datasetCache = null

export async function getClientDataset() {
  if (datasetCache && datasetCache.length) return datasetCache
  try {
    const res = await fetch('/chatbot-dataset.json')
    if (res.ok) {
      datasetCache = await res.json()
    }
  } catch (e) {
    console.warn('[Defi Web Engine] Gagal memuat chatbot-dataset.json:', e)
  }
  return datasetCache || []
}

export async function searchDefiDataset(query, filterKelas = null, filterKategori = null) {
  const dataset = await getClientDataset()
  if (!dataset || !dataset.length) return null

  // Normalisasi & Lemmatisasi query
  const clean = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  const rawWords = clean.split(/\s+/).filter(w => w.length > 1 && !INDO_STOPWORDS.has(w))

  // Terapkan lemma & perluas sinonim
  const queryTokens = new Set()
  for (const w of rawWords) {
    const lemma = INDO_LEMMA_MAP[w] || w
    queryTokens.add(lemma)
    if (SYNONYMS[lemma]) {
      for (const syn of SYNONYMS[lemma]) queryTokens.add(syn)
    }
  }

  if (queryTokens.size === 0) return null

  let best = null
  let bestScore = 0

  for (const item of dataset) {
    // Filter kelas jika dipilih
    if (filterKelas && filterKelas !== 'Semua' && item.kelas && item.kelas !== filterKelas) {
      continue
    }
    // Filter kategori jika ada
    if (filterKategori && item.kategori && item.kategori !== filterKategori) {
      continue
    }

    let score = 0
    const topic = (item.pertanyaan_atau_topik || '').toLowerCase()
    const keywords = (item.kata_kunci || '').toLowerCase()
    const ans = (item.jawaban || '').toLowerCase()

    // Cocok persis seluruh frasa
    if (clean.length > 5 && topic.includes(clean)) {
      score += 30
    }

    for (const token of queryTokens) {
      if (topic.includes(token)) score += 4.0
      if (keywords.includes(token)) score += 3.0
      if (ans.includes(token)) score += 0.5
    }

    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  // Ambang batas (threshold setara 0.35 di TF-IDF Python)
  if (best && bestScore >= 5.0) {
    return {
      sumber: 'lokal_csv',
      status: 'success',
      confidence: Math.min(1.0, Math.round((bestScore / 25) * 100) / 100),
      jawaban: cleanJawaban(best.jawaban),
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

// ── 9. Integrasi Gemini Vision & AI Langsung dari Browser ──────────────────
export async function askGeminiWeb(prompt, base64Photo = null, mimeType = 'image/jpeg', kelas = '') {
  const apiKey = DEFAULT_GEMINI_KEY
  if (!apiKey) {
    console.warn('[Gemini Web] API Key belum disetel di VITE_GEMINI_API_KEY')
    return null
  }

  try {
    const parts = []

    // Tambahkan persona sistem
    const systemPrompt = base64Photo ? DEFI_VISION_PROMPT : DEFI_SYSTEM_PROMPT
    const contextualPrompt = `Konteks siswa: ${kelas || 'Siswa SD umum'}.\n${prompt || 'Tolong baca dan jelaskan soal pada foto ini ya Kak Defi!'}`

    parts.push({ text: `${systemPrompt}\n\nPertanyaan siswa: ${contextualPrompt}` })

    // Jika ada foto yang diunggah (OCR / Pembacaan Gambar)
    if (base64Photo) {
      const cleanBase64 = base64Photo.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '')
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64
        }
      })
    }

    const payload = {
      contents: [{ parts }],
      generationConfig: {
        temperature: base64Photo ? 0.2 : 0.4,
        maxOutputTokens: 800
      }
    }

    // Coba model multimodal utama Google: gemini-flash-lite-latest (lalu fallback ke gemini-3.8-flash / gemini-flash-latest)
    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-3.8-flash',
      'gemini-flash-latest'
    ]

    for (const modelName of candidateModels) {
      try {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (resp.ok) {
          const data = await resp.json()
          const textOut = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (textOut && textOut.trim()) {
            return cleanJawaban(textOut)
          }
        } else {
          console.warn(`[Gemini Web] Model ${modelName} returned status ${resp.status}, trying fallback...`)
        }
      } catch (e) {
        console.warn(`[Gemini Web] Model ${modelName} fetch failed, trying next...`, e)
      }
    }
  } catch (err) {
    console.error('[Gemini Web] Error calling Gemini API directly:', err)
  }

  return null
}
