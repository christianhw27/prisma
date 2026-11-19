/**
 * PRISMA - Defi Web Engine (100% Native Web Port dari prisma-chatbot/main.py)
 * Memindahkan seluruh logika Python (Kalkulator Dinamis, Lemmatizer, TF-IDF Dataset, dan Gemini Vision)
 * langsung ke dalam lingkungan browser / web client tanpa perlu hosting server terpisah.
 */

// ── 1. API Key Gemini dari Konfigurasi Lingkungan (Environment Variables) ───
const DEFAULT_GEMINI_KEY = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '') || ''
const GEMINI_MODEL = 'gemini-1.5-flash'

// ── 2. Persona Kak Defi untuk Gemini ──────────────────────────────────────
const DEFI_SYSTEM_PROMPT = `
Kamu adalah Kak Defi, teman belajar ceria dan pintar di PRISMA untuk siswa SD.
Tugas utamamu adalah menjawab pertanyaan siswa secara TEPAT, SANGAT SINGKAT, dan JELAS demi menghemat token, namun tetap hangat dan ramah anak.

Pedoman Wajib (Hemat Token):
1. LANGSUNG ke inti jawaban! Jangan gunakan basa-basi atau kalimat pengantar yang panjang.
2. Jelaskan dalam 2 sampai 3 kalimat pendek dan sederhana yang mudah dipahami anak SD.
3. Jika berupa langkah cara/hitungan, tulis maksimal 2-3 butir langkah singkat (1., 2., 3.).
4. Akhiri dengan satu kalimat penyemangat singkat (misalnya: "Tetap semangat belajar ya! ✨").
5. Hindari kata-kata rumit atau penjelasan bertele-tele. Maksimal panjang jawaban 50-70 kata.
`

const DEFI_VISION_PROMPT = `
Kamu adalah Kak Defi, kakak pendamping belajar yang ramah dan ceria di PRISMA untuk siswa SD.
Tugas utamamu adalah MEMBACA dan MENJELASKAN foto atau jepretan kamera tulisan tangan / buku soal siswa.

Panduan penting (Singkat & Jelas):
1. Bacalah tulisan tangan atau teks cetak pada foto dengan teliti (OCR).
2. Tuliskan kembali apa soal yang terbaca secara singkat.
3. Berikan langkah penyelesaiannya secara ringkas dan runtut (1., 2., 3.) dengan bahasa yang mudah dipahami anak SD.
4. Akhiri dengan satu kalimat penyemangat ceria.
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
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[""]/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
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

// ── 6. Mesin Penjelas Matematika Dinamis Super Ramah Anak ─────────────────
function explainAddition(a, b, benda = null) {
  const res = a + b
  const namaBenda = benda || "buah apel"
  const satuanLabel = benda ? ` ${benda}` : ""

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0 && a <= 10 && b <= 10) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita selesaikan penjumlahan **${ia} + ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
      `1. Bayangkan kamu memiliki **${ia} ${namaBenda}** di keranjangmu.\n` +
      `2. Lalu temanmu menambahkan lagi **${ib} ${namaBenda}** ke dalam keranjang.\n` +
      `3. Sekarang kita hitung maju sebanyak **${ib}** langkah dari **${ia}**: hasilnya adalah **${ir} ${namaBenda}**!\n\n` +
      `🎉 **Kesimpulan:**\n` +
      `Jadi, **${ia}${satuanLabel} + ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
      `Pintar sekali! Menghitung bersama Kak Defi itu seru dan mudah kan? Semangat terus ya! 🚀`
    )
  }

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    const satuanA = ia % 10, satuanB = ib % 10
    const puluhanA = Math.floor(ia / 10), puluhanB = Math.floor(ib / 10)
    const sumSatuan = satuanA + satuanB
    const sumPuluhan = puluhanA + puluhanB

    let steps = [
      `1. Uraikan kedua bilangan sesuai nilai tempatnya:\n` +
      `   • **${ia}** = **${puluhanA} puluhan** + **${satuanA} satuan**.\n` +
      `   • **${ib}** = **${puluhanB} puluhan** + **${satuanB} satuan**.\n`,
      `2. Jumlahkan angka satuannya terlebih dahulu:\n` +
      `   • **${satuanA} + ${satuanB} = ${sumSatuan}**.`
    ]

    if (sumSatuan >= 10) {
      const simpan = Math.floor(sumSatuan / 10)
      const sisaSatuan = sumSatuan % 10
      steps.push(
        `3. Karena hasil satuan adalah **${sumSatuan}** (lebih dari 9), kita tulis satuannya **${sisaSatuan}** dan simpan **${simpan} puluhan** ke depan.\n` +
        `4. Jumlahkan angka puluhannya beserta angka simpanan:\n` +
        `   • **${puluhanA} + ${puluhanB} + ${simpan} (simpanan) = ${sumPuluhan + simpan} puluhan**.\n` +
        `5. Gabungkan hasil puluhan dan satuannya sehingga diperoleh: **${ir}${satuanLabel}**.`
      )
    } else {
      steps.push(
        `3. Jumlahkan angka puluhannya:\n` +
        `   • **${puluhanA} + ${puluhanB} = ${sumPuluhan} puluhan**.\n` +
        `4. Gabungkan hasil puluhan dan satuannya sehingga diperoleh: **${ir}${satuanLabel}**.`
      )
    }

    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita selesaikan penjumlahan **${ia} + ${ib}${satuanLabel}** dengan cara bersusun bersama Kak Defi! 🌟\n\n` +
      steps.join('\n\n') + '\n\n' +
      `🎉 **Kesimpulan:**\n` +
      `Jadi, **${ia}${satuanLabel} + ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
      `Hebat sekali! Penjumlahan langkah demi langkah membuat perhitunganmu selalu teliti dan benar! Tetap semangat ya! 🚀`
    )
  }

  return cleanJawaban(
    `Halo sahabat pintar! Hasil penjumlahan dari **${formatNum(a)} + ${formatNum(b)}${satuanLabel}** adalah **${formatNum(res)}${satuanLabel}**.\n\nLuar biasa, kamu sangat teliti dalam berhitung! Teruslah rajin belajar ya! 🚀`
  )
}

function explainSubtraction(a, b, benda = null) {
  const res = a - b
  const namaBenda = benda || "kelereng"
  const satuanLabel = benda ? ` ${benda}` : ""

  if (a < b) {
    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita lihat pengurangan **${formatNum(a)} - ${formatNum(b)}${satuanLabel}** bersama Kak Defi: 🌟\n\n` +
      `💡 Karena angka **${formatNum(a)}** lebih kecil daripada **${formatNum(b)}**, jika dikurangkan hasilnya adalah bilangan negatif yaitu **${formatNum(res)}${satuanLabel}**.\n\n` +
      `📌 Di sekolah dasar, kita biasanya mengurangkan bilangan yang lebih besar dengan yang lebih kecil ya: **${formatNum(b)} - ${formatNum(a)} = ${formatNum(b - a)}${satuanLabel}**.\n\n` +
      `Tetap semangat belajar ya, kamu pasti bisa! 🚀`
    )
  }

  // 1. Bilangan kecil sederhana (a <= 10 dan b <= 10)
  if (Number.isInteger(a) && Number.isInteger(b) && a <= 10 && b <= 10) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita selesaikan pengurangan **${ia} - ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
      `1. Bayangkan kamu memiliki **${ia} ${namaBenda}** yang manis.\n` +
      `2. Lalu sebanyak **${ib} ${namaBenda}** kamu berikan kepada temanmu.\n` +
      `3. Sekarang kita hitung mundur sebanyak **${ib}** langkah dari **${ia}**: sisanya adalah **${ir} ${namaBenda}**!\n\n` +
      `🎉 **Kesimpulan:**\n` +
      `Jadi, **${ia}${satuanLabel} - ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
      `Pintar sekali! Menghitung dengan membayangkan benda nyata membuat belajar jadi seru dan mudah! Semangat terus ya! 🚀`
    )
  }

  // 2. Bilangan khusus: Kelipatan 100 (misal 100 - 5, 100 - 25, 200 - 45)
  if (Number.isInteger(a) && Number.isInteger(b) && a >= 100 && a % 100 === 0 && b < 100) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    const sisaRatusan = ia - 100
    if (sisaRatusan === 0) {
      // Kasus 100 - b (seperti soal 100 - 5)
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan pengurangan **100 - ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Cara Cepat & Mudah Memahami:**\n\n` +
        `1. Uraikan angka **100** menjadi **90 + 10**.\n` +
        `2. Kurangkan bagian satuannya terlebih dahulu: **10 - ${ib} = ${10 - ib}**.\n` +
        `3. Gabungkan kembali dengan sisa puluhannya: **90 + ${10 - ib} = ${ir}${satuanLabel}**.\n\n` +
        `✨ **Trik Hitung Mundur:**\n` +
        `Jika kamu hitung mundur ${ib} langkah dari 100, kamu akan tepat sampai di angka **${ir}**!\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **100 - ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
        `Hebat sekali! Pengurangan bilangan ratusan ternyata sangat mudah kan? Tetap semangat belajar ya! 🚀`
      )
    } else {
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan pengurangan **${ia} - ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `1. Uraikan bilangan **${ia}** menjadi **${sisaRatusan} + 100**.\n` +
        `2. Kurangkan bagian 100 dengan **${ib}**: **100 - ${ib} = ${100 - ib}**.\n` +
        `3. Jumlahkan kembali dengan bagian ratusannya: **${sisaRatusan} + ${100 - ib} = ${ir}${satuanLabel}**.\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia}${satuanLabel} - ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
        `Luar biasa! Kamu sangat teliti dalam berhitung! Teruslah rajin berlatih ya! 🚀`
      )
    }
  }

  // 3. Bilangan 2-digit (11 s.d. 99) menggunakan nilai tempat bersusun
  if (Number.isInteger(a) && Number.isInteger(b) && a < 100 && b < 100) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)
    const satuanA = ia % 10, satuanB = ib % 10
    const puluhanA = Math.floor(ia / 10), puluhanB = Math.floor(ib / 10)

    let steps = [
      `1. Uraikan bilangan berdasarkan nilai tempatnya:\n` +
      `   • **${ia}** = **${puluhanA} puluhan** (nilainya ${puluhanA * 10}) + **${satuanA} satuan**.\n` +
      `   • **${ib}** = **${puluhanB} puluhan** (nilainya ${puluhanB * 10}) + **${satuanB} satuan**.`
    ]

    if (satuanA >= satuanB) {
      steps.push(
        `2. Kurangkan angka satuannya:\n` +
        `   • **${satuanA} satuan - ${satuanB} satuan = ${satuanA - satuanB} satuan**.`
      )
      if (puluhanA > 0 || puluhanB > 0) {
        steps.push(
          `3. Kurangkan angka puluhannya:\n` +
          `   • **${puluhanA} puluhan - ${puluhanB} puluhan = ${puluhanA - puluhanB} puluhan** (nilainya ${(puluhanA - puluhanB) * 10}).`
        )
      }
      steps.push(
        `4. Gabungkan hasil puluhan dan satuannya:\n` +
        `   • **${(puluhanA - puluhanB) * 10} + ${satuanA - satuanB} = ${ir}${satuanLabel}**.`
      )
    } else {
      steps.push(
        `2. Karena satuan **${satuanA}** lebih kecil dari **${satuanB}**, kita pinjam **1 puluhan** (nilainya 10) dari angka depan:\n` +
        `   • Satuan menjadi: **${satuanA} + 10 = ${satuanA + 10}**.\n` +
        `   • Puluhan tersisa: **${puluhanA} - 1 = ${puluhanA - 1} puluhan**.`
      )
      steps.push(
        `3. Kurangkan angka satuannya:\n` +
        `   • **${satuanA + 10} satuan - ${satuanB} satuan = ${satuanA + 10 - satuanB} satuan**.`
      )
      if (puluhanA - 1 > 0 || puluhanB > 0) {
        steps.push(
          `4. Kurangkan angka puluhannya:\n` +
          `   • **${puluhanA - 1} puluhan - ${puluhanB} puluhan = ${puluhanA - 1 - puluhanB} puluhan** (nilainya ${(puluhanA - 1 - puluhanB) * 10}).`
        )
      }
      steps.push(
        `5. Gabungkan hasil akhir:\n` +
        `   • Diperoleh hasil: **${ir}${satuanLabel}**.`
      )
    }

    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita selesaikan pengurangan **${ia} - ${ib}${satuanLabel}** dengan cara bersusun bersama Kak Defi! 🌟\n\n` +
      steps.join('\n\n') + '\n\n' +
      `🎉 **Kesimpulan:**\n` +
      `Jadi, **${ia}${satuanLabel} - ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
      `Hebat sekali! Pengurangan dengan cara bersusun membuat hitunganmu rapi dan tepat! Semangat terus ya! 🚀`
    )
  }

  // 4. Umum untuk bilangan lainnya
  return cleanJawaban(
    `Halo sahabat pintar! Yuk, kita selesaikan pengurangan **${formatNum(a)} - ${formatNum(b)}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
    `1. Kurangkan kedua bilangan secara bertahap dari nilai tempat satuan, puluhan, hingga ratusan.\n` +
    `2. Hasil pengurangan yang didapat adalah **${formatNum(res)}${satuanLabel}**.\n\n` +
    `🎉 **Kesimpulan:**\n` +
    `Jadi, **${formatNum(a)}${satuanLabel} - ${formatNum(b)}${satuanLabel} = ${formatNum(res)}${satuanLabel}**.\n\n` +
    `Luar biasa! Teruslah rajin berlatih berhitung matematika ya! 🚀`
  )
}

function explainMultiplication(a, b, benda = null) {
  const res = a * b
  const satuanLabel = benda ? ` ${benda}` : ""
  const namaBenda = benda || "benda"

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
    const ia = Math.round(a), ib = Math.round(b), ir = Math.round(res)

    // Kasus perkalian dengan angka 0
    if (ia === 0 || ib === 0) {
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita pelajari sifat perkalian **${ia} x ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Aturan Emas Angka 0:**\n` +
        `Setiap bilangan jika dikalikan dengan angka **0**, hasilnya akan selalu **0**!\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} x ${ib}${satuanLabel} = 0**.\n\n` +
        `Keren banget! Kamu sudah tahu salah satu rahasia matematika paling seru! Semangat terus ya! 🚀`
      )
    }

    // Kasus perkalian dengan angka 1
    if (ia === 1 || ib === 1) {
      const nonOne = ia === 1 ? ib : ia
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan perkalian **${ia} x ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Aturan Bilangan 1:**\n` +
        `Setiap bilangan jika dikalikan dengan angka **1**, hasilnya adalah bilangan itu sendiri!\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} x ${ib}${satuanLabel} = ${nonOne}${satuanLabel}**.\n\n` +
        `Pintar sekali! Sangat cepat dan tepat! Semangat belajarnya ya! 🚀`
      )
    }

    // Kasus perkalian bilangan 10 (seperti 10 x 10, 5 x 10, dll)
    if (ia === 10 || ib === 10) {
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan perkalian **${ia} x ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Trik Ajaib Perkalian 10:**\n` +
        `Perkalian dengan angka 10 itu sangat mudah dan seru! Cukup ambil angka pasangannya, lalu tambahkan angka **0** di belakangnya!\n\n` +
        `1. Konsep dasar: **${ia} x ${ib}** artinya menjumlahkan puluhan sebanyak **${ia} kali**.\n` +
        `2. Jika kita hitung melompat kelipatan 10: ` +
        (ia <= 10 ? Array.from({length: ia}, (_, i) => (i + 1) * ib).join(', ') : `${ib}, ${ib*2}, ... , ${ir}`) + `.\n` +
        `3. Hasil akhirnya adalah **${ir}${satuanLabel}**!\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} x ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
        `Hebat sekali! Trik perkalian 10 membuat hitunganmu super kilat dan tepat! Tetap semangat ya! 🚀`
      )
    }

    // Kasus perkalian kecil (ia <= 6) -> cocok untuk penjumlahan berulang
    if (ia <= 6) {
      const addTerms = Array(ia).fill(`${ib}${satuanLabel}`).join(' + ')
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan perkalian **${ia} x ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Konsep Perkalian (Penjumlahan Berulang):**\n` +
        `Perkalian **${ia} x ${ib}** artinya angka **${ib}${satuanLabel}** dijumlahkan sebanyak **${ia} kali**.\n\n` +
        `1. Bentuk penjumlahan berulang:\n` +
        `   • **${addTerms}**\n` +
        `2. Hitung hasil penjumlahannya:\n` +
        `   • Diperoleh hasil: **${ir}${satuanLabel}**\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} x ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
        `Keren banget! Kamu sudah paham konsep perkalian dengan sangat baik! Tetap semangat belajar ya! 🚀`
      )
    }

    // Kasus perkalian tabel 7, 8, 9, atau bilangan 2-digit bersusun
    if (ia <= 10 && ib <= 10) {
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan perkalian **${ia} x ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Cara Mudah Mengingat Perkalian:**\n` +
        `1. Kita bisa pecah menjadi penjumlahan yang lebih mudah:\n` +
        `   • **5 x ${ib} = ${5 * ib}**\n` +
        `   • Sisanya: **${ia - 5} x ${ib} = ${(ia - 5) * ib}**\n` +
        `2. Sekarang kita jumlahkan keduanya:\n` +
        `   • **${5 * ib} + ${(ia - 5) * ib} = ${ir}${satuanLabel}**!\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, hasil dari **${ia} x ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
        `Luar biasa! Strategi memecah perkalian membuat ingatanmu makin kuat! Semangat terus ya! 🚀`
      )
    }

    // Kasus perkalian bersusun untuk angka lebih besar (> 10)
    const bawah = Math.min(ia, ib), atas = Math.max(ia, ib)
    const satuanAtas = atas % 10
    const puluhanAtas = Math.floor(atas / 10) % 10
    const k1 = bawah * satuanAtas
    const tulisK1 = k1 % 10
    const simpanK1 = Math.floor(k1 / 10)

    return cleanJawaban(
      `Halo sahabat pintar! Yuk, kita selesaikan perkalian **${ia} x ${ib}${satuanLabel}** dengan cara bersusun bersama Kak Defi! 🌟\n\n` +
      `Kita susun dengan angka yang lebih besar di atas (**${atas}**) dan pengali di bawah (**${bawah}**):\n\n` +
      `1. Kalikan pengali (**${bawah}**) dengan satuan (**${satuanAtas}**):\n` +
      `   • **${bawah} x ${satuanAtas} = ${k1}** (Tulis **${tulisK1}**, simpan **${simpanK1}**).\n` +
      `2. Kalikan pengali (**${bawah}**) dengan puluhan (**${puluhanAtas}**):\n` +
      `   • **${bawah} x ${puluhanAtas} = ${bawah * puluhanAtas}**.\n` +
      `   • Tambahkan simpanan (${simpanK1}): **${bawah * puluhanAtas} + ${simpanK1} = ${bawah * puluhanAtas + simpanK1}**.\n` +
      `3. Gabungkan seluruh angka sehingga diperoleh hasil akhir: **${ir}${satuanLabel}**.\n\n` +
      `🎉 **Kesimpulan:**\n` +
      `Jadi, hasil dari **${ia} x ${ib}${satuanLabel} = ${ir}${satuanLabel}**.\n\n` +
      `Luar biasa! Kamu hebat bisa mengikuti perkalian bersusun dengan sangat teliti! Semangat terus ya! 🚀`
    )
  }

  return cleanJawaban(
    `Halo sahabat pintar! Hasil perkalian dari **${formatNum(a)} x ${formatNum(b)}${satuanLabel}** adalah **${formatNum(res)}${satuanLabel}**.\n\nHebat sekali, teruslah rajin berlatih matematika bersama Kak Defi ya! 🚀`
  )
}

function explainDivision(a, b, benda = null) {
  if (b === 0) {
    return cleanJawaban(
      `Wah, dalam matematika kita tidak bisa membagi sebuah bilangan dengan angka **0** ya sahabat pintar! 🛑\n\nCoba ganti angka pembaginya dengan angka lain selain 0 ya, Kak Defi siap bantu hitung! Tetap semangat! ✨`
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
        `Halo sahabat pintar! Yuk, kita selesaikan pembagian **${ia} : ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Konsep Pembagian (Membagi Sama Rata):**\n` +
        `Bayangkan kamu memiliki **${ia} ${namaBenda}** yang ingin dibagikan secara adil kepada **${ib} teman**.\n\n` +
        `1. Kita bagi **${ia} ${namaBenda}** ke dalam **${ib} kelompok** secara sama rata.\n` +
        `2. Setiap kelompok mendapatkan tepat **${quotient} ${namaBenda}**.\n` +
        `3. Karena **${ib} x ${quotient} = ${ia}**, maka semua ${namaBenda} terbagi habis tanpa sisa (sisa 0).\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} : ${ib}${satuanLabel} = ${quotient}${satuanLabel}**.\n\n` +
        `Pintar sekali! Langkah-langkahmu sangat tepat dan rapi! Tetap semangat belajar ya! 🚀`
      )
    } else {
      const desimalStr = formatNum(res)
      return cleanJawaban(
        `Halo sahabat pintar! Yuk, kita selesaikan pembagian **${ia} : ${ib}${satuanLabel}** bersama Kak Defi! 🌟\n\n` +
        `💡 **Konsep Pembagian Bersisa:**\n` +
        `Bayangkan kita membagikan **${ia} ${namaBenda}** secara adil kepada **${ib} teman**.\n\n` +
        `1. Setiap teman mendapatkan **${quotient} ${namaBenda}** secara utuh (**${ib} x ${quotient} = ${ib * quotient}**).\n` +
        `2. Sisa ${namaBenda} yang belum terbagikan adalah: **${ia} - ${ib * quotient} = ${remainder} ${namaBenda}**.\n` +
        `3. Hasil pembagian: **${quotient} sisa ${remainder}${satuanLabel}** (atau bentuk desimal = **${desimalStr}${satuanLabel}**).\n\n` +
        `🎉 **Kesimpulan:**\n` +
        `Jadi, **${ia} dibagi ${ib}** hasilnya adalah **${quotient} sisa ${remainder}${satuanLabel}**.\n\n` +
        `Hebat sekali! Kamu sudah mengerti pembagian bersisa dengan sangat baik! Tetap semangat ya! 🚀`
      )
    }
  }

  return cleanJawaban(
    `Halo sahabat pintar! Hasil pembagian dari **${formatNum(a)} : ${formatNum(b)}${satuanLabel}** adalah **${formatNum(res)}${satuanLabel}**.\n\nPintar sekali, belajar berhitung bersama Kak Defi selalu menyenangkan! 🚀`
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

// ── 8. Pencarian Cerdas Dataset PRISMA (Ketat & Bebas Salah Tebak) ──────────
const GENERIC_QUERY_WORDS = new Set([
  'cara', 'buat', 'membuat', 'bikin', 'arti', 'maksud', 'jelaskan', 'pengertian',
  'contoh', 'apa', 'siapa', 'kapan', 'dimana', 'bagaimana', 'mengapa', 'kenapa',
  'berapa', 'apakah', 'ada', 'bisa', 'tahu', 'kak', 'defi', 'tanya', 'tolong'
])

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

  // Normalisasi & Ekstraksi kata konten spesifik
  const clean = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  const allWords = clean.split(/\s+/).filter(w => w.length > 1 && !INDO_STOPWORDS.has(w))
  const contentWords = allWords.filter(w => !GENERIC_QUERY_WORDS.has(w))

  // Jika tidak ada kata subjek materi yang jelas, JANGAN dipaksa ambil dari CSV -> serahkan ke AI
  if (contentWords.length === 0) return null

  // Terapkan lemma & perluas sinonim untuk kata konten
  const queryTokens = new Set()
  for (const w of contentWords) {
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

    // Cocok persis seluruh frasa materi
    if (clean.length > 8 && topic.includes(clean)) {
      score += 40
    }

    let matchedContentCount = 0
    for (const token of queryTokens) {
      let matched = false
      if (topic.includes(token)) {
        score += 12.0
        matched = true
      } else if (keywords.includes(token)) {
        score += 8.0
        matched = true
      }
      if (matched) matchedContentCount++
    }

    // Jika tidak ada kata materi yang cocok di judul atau kata kunci, lewati! JANGAN dipaksa!
    if (matchedContentCount === 0) continue

    // Ambang cakupan materi: minimal 60% kata materi harus cocok atau punya skor tinggi
    const contentCoverage = matchedContentCount / contentWords.length
    if (contentCoverage < 0.6 && score < 30) continue

    // Nilai tambahan untuk kata pelengkap jika materi utama sudah cocok
    for (const w of allWords.filter(w => GENERIC_QUERY_WORDS.has(w))) {
      if (topic.includes(w)) score += 2.0
    }

    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  // Ambang batas ketat: hanya ambil jika benar-benar yakin materi kurikulum cocok
  // Jika ragu atau tidak cocok, kembalikan null agar dialihkan ke AI Gemini!
  if (best && bestScore >= 20.0) {
    return {
      sumber: 'lokal_csv',
      status: 'success',
      confidence: Math.min(1.0, Math.round((bestScore / 40) * 100) / 100),
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
    const contextualPrompt = `Konteks siswa: ${kelas || 'Siswa SD umum'}.\nPertanyaan: ${prompt || 'Jawab pertanyaan ini ya Kak Defi!'}`

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
        temperature: base64Photo ? 0.2 : 0.3,
        maxOutputTokens: base64Photo ? 500 : 180 // Hemat token: 180 token cukup untuk 2-3 kalimat padat jelas
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
