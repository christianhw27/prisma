import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from './supabaseClient.js'
import { allStructuredMateri } from './allMateriData.js'

const STORAGE_KEY = 'prisma_materi_list_v31'

export const KELAS_SD_OPTIONS = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']

/**
 * Memeriksa apakah URL adalah link YouTube
 */
export function isYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return false
  return /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/.test(url.trim())
}

/**
 * Mengubah URL YouTube menjadi URL embed (iframe)
 */
export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=0`
  }
  return url
}

/**
 * Normalisasi / ekstraksi tingkat kelas SD (Kelas 1 s/d 6)
 */
export function getKelasFromLevel(levelStr) {
  if (!levelStr) return 'Kelas 1'
  const s = String(levelStr).toLowerCase()
  if (s.includes('kelas 1') || (s.includes('kelas i') && !s.includes('kelas iv') && !s.includes('kelas ix'))) return 'Kelas 1'
  if (s.includes('kelas 2') || s.includes('kelas ii')) return 'Kelas 2'
  if (s.includes('kelas 3') || s.includes('kelas iii')) return 'Kelas 3'
  if (s.includes('kelas 4') || s.includes('kelas iv')) return 'Kelas 4'
  if (s.includes('kelas 5') || s.includes('kelas v')) return 'Kelas 5'
  if (s.includes('kelas 6') || s.includes('kelas vi')) return 'Kelas 6'
  return 'Kelas 1'
}

/**
 * Mengurutkan materi secara alami berdasarkan jenjang kelas (1-6) dan nomor bab
 */
export function sortMateriNaturally(list) {
  if (!Array.isArray(list)) return []
  return [...list].sort((a, b) => {
    const kelasA = parseInt(getKelasFromLevel(a.level).replace(/\D/g, '')) || 0
    const kelasB = parseInt(getKelasFromLevel(b.level).replace(/\D/g, '')) || 0
    if (kelasA !== kelasB) return kelasA - kelasB

    const babAFromTitle = a.title?.match(/Bab\s*(\d+)/i)
    const babBFromTitle = b.title?.match(/Bab\s*(\d+)/i)
    if (babAFromTitle && babBFromTitle) {
      return parseInt(babAFromTitle[1]) - parseInt(babBFromTitle[1])
    }

    const matchA = a.id?.match(/b(\d+)/i)
    const matchB = b.id?.match(/b(\d+)/i)
    if (matchA && matchB) {
      return parseInt(matchA[1]) - parseInt(matchB[1])
    }
    return (a.title || '').localeCompare(b.title || '')
  })
}

export const RELIABLE_MODE_VIDEOS = {
  standard: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
  slow: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4',
  high_contrast: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
  focus: 'https://www.w3schools.com/html/mov_bbb.mp4'
}

/**
 * Sanitize video URL — HANYA replace URL Google commondatastorage yang sudah 403.
 * URL Cloudinary, YouTube, URL custom, dan string kosong ('') dibiarkan apa adanya.
 */
export function sanitizeVideoUrl(url, mode = 'standard') {
  if (typeof url === 'string' && (url.includes('commondatastorage.googleapis.com') || url.includes('gtv-videos-bucket'))) {
    return RELIABLE_MODE_VIDEOS[mode] || RELIABLE_MODE_VIDEOS.standard
  }
  return url || ''
}

/**
 * Sanitize seluruh content materi (3 Tab: Materi Teks & Gambar, 2 Video, Quiz Pilihan Ganda Bergambar)
 */
export function sanitizeMateriItem(item) {
  if (!item) return item
  const clean = { ...item }
  clean.jenjang = 'SD'
  if (clean.level && (clean.level.includes('Kelas VII') || clean.level.includes('Kelas 7'))) {
    clean.level = 'IPAS • Kelas VI • Fase C'
  } else if (clean.level && (clean.level.includes('Kelas X') || clean.level.includes('Kelas 10'))) {
    clean.level = 'IPAS • Kelas V • Fase C'
  }

  // 1. Tab Materi (Teks, Gambar & Audio Suara)
  if (!clean.materiContent) {
    clean.materiContent = {
      text: clean.description || 'Materi pembelajaran interaktif SD.',
      image: clean.image || '/es_batu_card.jpg',
      audioUrl: clean.audioUrl || '',
      points: (clean.learningPoints || []).map((lp, idx) => ({
        id: lp.id || `p-${idx + 1}`,
        title: typeof lp === 'string' ? lp : lp.title || `Poin ${idx + 1}`,
        desc: ''
      }))
    }
  } else {
    if (!clean.materiContent.image) clean.materiContent.image = clean.image || '/es_batu_card.jpg'
    if (clean.materiContent.audioUrl === undefined) clean.materiContent.audioUrl = clean.audioUrl || ''
    if (!Array.isArray(clean.materiContent.points)) clean.materiContent.points = []
  }

  // 2. Tab Video (2 Video: Video 1 & Video 2)
  if (!clean.videos) {
    clean.videos = {
      video1: {
        title: clean.standardContent?.title || 'Video 1: Pengenalan Konsep',
        url: clean.standardContent?.videoUrl || clean.videoUrl || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: clean.slowContent?.title || 'Video 2: Eksperimen & Praktik',
        url: clean.slowContent?.videoUrl || RELIABLE_MODE_VIDEOS.slow
      }
    }
  } else {
    if (!clean.videos.video1) {
      clean.videos.video1 = { title: 'Video 1: Pengenalan Konsep', url: RELIABLE_MODE_VIDEOS.standard }
    }
    if (!clean.videos.video2) {
      clean.videos.video2 = { title: 'Video 2: Eksperimen & Praktik', url: RELIABLE_MODE_VIDEOS.slow }
    }
  }

  // 3. Tab Quiz (Pilihan Ganda & Soal Sangat Interaktif PRISMA)
  if (!clean.quiz) {
    const rawQuestions = clean.assessment?.questions || []
    clean.quiz = {
      title: clean.assessment?.title || 'Kuis Pemahaman Materi',
      questions: rawQuestions.length ? rawQuestions.map((q, idx) => ({
        ...q,
        id: q.id || `q-${idx + 1}`,
        type: q.type || 'multiple_choice',
        questionText: q.questionText || '',
        image: q.image || (idx === 0 ? clean.image || '' : ''),
        points: Number(q.points) || 25,
        options: Array.isArray(q.options) && q.options.length ? q.options : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
        correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
        explanation: q.explanation || ''
      })) : [
        {
          id: 'q-1',
          type: 'multiple_choice',
          questionText: 'Apa poin utama yang dipelajari pada materi ini?',
          image: clean.image || '',
          points: 50,
          options: ['Memahami Konsep Dasar', 'Mengabaikan Materi', 'Tidak Tahu', 'Bukan Keduanya'],
          correctOptionIndex: 0,
          explanation: 'Materi ini dirancang untuk memahami konsep dasar secara mendalam.'
        }
      ]
    }
  } else if (clean.quiz.questions) {
    clean.quiz.questions = clean.quiz.questions.map((q, idx) => {
      const isImgChoice = q.type === 'image_choice' || (Array.isArray(q.imageOptions) && q.imageOptions.length > 0)
      return {
        ...q,
        id: q.id || `q-${idx + 1}`,
        type: q.type || 'multiple_choice',
        questionText: q.questionText || '',
        image: isImgChoice ? '' : (q.image || ''),
        points: Number(q.points) || 25,
        options: Array.isArray(q.options) && q.options.length ? q.options : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
        correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
        explanation: q.explanation || ''
      }
    })
  }

  // Tetap sinkronkan backward compatibility fields
  clean.videoUrl = clean.videos.video1?.url || ''
  clean.standardContent = {
    title: clean.videos.video1?.title || clean.title,
    text: clean.materiContent?.text || clean.description,
    videoUrl: clean.videos.video1?.url || ''
  }
  clean.slowContent = {
    title: clean.videos.video2?.title || `${clean.title} (Video 2)`,
    text: clean.materiContent?.text || clean.description,
    videoUrl: clean.videos.video2?.url || ''
  }
  clean.assessment = clean.quiz

  return clean
}

const legacyInitialMateri = [
  {
    id: 'materi-1',
    title: 'Petualangan Si Es Batu',
    jenjang: 'SD',
    mataPelajaran: 'IPAS',
    level: 'IPAS • Kelas IV • Fase B',
    badge: 'Gratis',
    image: '/es_batu_card.jpg',
    description: 'Yuk ikuti perjalanan Es Batu dan temukan bagaimana benda dapat berubah wujud!',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    duration: '± 5 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    materiContent: {
      text: `Benda di sekitar kita memiliki wujud yang beragam, yaitu padat, cair, dan gas. Salah satu contoh yang paling mudah kita amati setiap hari adalah air!\n\nKetika air dimasukkan ke dalam tempat yang sangat dingin seperti freezer kulkas, air akan membeku menjadi es batu yang berwujud padat. Jika es batu tersebut dikeluarkan dan diletakkan di ruangan terbuka atau terkena sinar matahari yang hangat, es batu akan menyerap panas dan mencair kembali menjadi air cair.\n\nJika air cair tersebut kita masak di atas kompor hingga mendidih, air akan berubah wujud menjadi uap air yang berwujud gas (peristiwa menguap). Saat uap air menyentuh permukaan tutup panci yang dingin, uap tersebut akan kembali menjadi tetesan butiran air (peristiwa mengembun). Inilah siklus perubahan wujud benda yang luar biasa!`,
      image: '/es_batu_card.jpg',
      points: [
        { id: 'lp-1', title: 'Mencair', desc: 'Perubahan wujud dari padat menjadi cair karena menerima panas (kalor).' },
        { id: 'lp-2', title: 'Menguap', desc: 'Perubahan wujud dari cair menjadi gas saat dipanaskan hingga mendidih.' },
        { id: 'lp-3', title: 'Mengembun', desc: 'Perubahan wujud dari gas kembali menjadi zat cair saat suhu mendingin.' }
      ]
    },
    videos: {
      video1: {
        title: 'Video 1: Konsep Dasar Perubahan Wujud Zat',
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: 'Video 2: Eksperimen Mencair & Menguap',
        url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
      }
    },
    quiz: {
      title: 'Kuis Pemahaman Petualangan Si Es Batu',
      questions: [
        {
          id: 'q-1',
          questionText: 'Perhatikan gambar di bawah! Apa yang terjadi pada es batu berwujud padat ketika terkena panas suhu ruangan?',
          image: '/es_batu_card.jpg',
          points: 35,
          options: [
            'Mencair menjadi air cair',
            'Membeku menjadi lebih keras',
            'Berubah langsung menjadi batu karang',
            'Tidak mengalami perubahan apa pun'
          ],
          correctOptionIndex: 0,
          explanation: 'Es batu menyerap kalor/panas dari lingkungan sekitar sehingga ikatan partikelnya merenggang dan mencair menjadi zat cair.'
        },
        {
          id: 'q-2',
          questionText: 'Peristiwa keluarnya uap air saat air dimasak sampai mendidih dinamakan proses...',
          image: '',
          points: 35,
          options: [
            'Membeku',
            'Menguap',
            'Mengembun',
            'Mengkristal'
          ],
          correctOptionIndex: 1,
          explanation: 'Menguap adalah peristiwa perubahan wujud zat dari cair menjadi gas akibat pemanasan.'
        },
        {
          id: 'q-3',
          questionText: 'Ketika uap air mengenai permukaan yang dingin dan membentuk titik-titik embun air, proses tersebut disebut...',
          image: '',
          points: 30,
          options: [
            'Mengembun',
            'Mencair',
            'Menguap',
            'Menyublim'
          ],
          correctOptionIndex: 0,
          explanation: 'Mengembun adalah perubahan wujud gas menjadi cair ketika gas melepaskan energi panas ke benda yang lebih dingin.'
        }
      ]
    },
    learningPoints: [
      { id: 'lp-1', title: 'Mencair' },
      { id: 'lp-2', title: 'Menguap' },
      { id: 'lp-3', title: 'Mengembun' }
    ],
    standardContent: {
      title: 'Petualangan Si Es Batu (Standar)',
      text: 'Yuk ikuti perjalanan Es Batu dan temukan bagaimana benda dapat berubah wujud!',
      videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
    },
    slowContent: {
      title: 'Petualangan Si Es Batu (Eksperimen)',
      text: 'Eksperimen perubahan wujud zat cair ke padat dan gas.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
    },
    assessment: {
      title: 'Asesmen Pemahaman Materi Es Batu',
      questions: []
    }
  },
  {
    id: 'materi-2',
    title: 'Berhitung Bersama Sahabat Hutan',
    jenjang: 'SD',
    mataPelajaran: 'Matematika',
    level: 'Matematika • Kelas I • Fase A',
    badge: 'Gratis',
    image: '/Banner_Materi.jpg',
    description: 'Memahami konsep penjumlahan dasar melalui animasi buah-buahan dan benda sekitar.',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    duration: '± 5 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    materiContent: {
      text: `Selamat datang di hutan sahabat Prisma! Hari ini kita akan belajar berhitung penjumlahan bersama si Kelinci dan si Tupai.\n\nPenjumlahan artinya menggabungkan dua kelompok benda menjadi satu kesatuan yang lebih banyak. Misalnya, jika Kelinci membawa 2 buah apel merah yang manis, lalu Tupai datang membawakan 1 buah apel hijau segar, berapakah jumlah seluruh apel sekarang?\n\nMari kita hitung bersama: 1, 2... ditambah 1 lagi menjadi 3! Jadi, 2 apel + 1 apel = 3 apel. Mudah dan menyenangkan bukan? Kamu bisa berlatih menjumlahkan benda-benda di sekitarmu seperti pensil, buku, atau mainan!`,
      image: '/Banner_Materi.jpg',
      points: [
        { id: 'lp-2-1', title: 'Mengenal Angka 1-10', desc: 'Menghitung kuantitas benda dengan jari dan gambar.' },
        { id: 'lp-2-2', title: 'Simbol Tambah (+)', desc: 'Tanda tambah berarti menggabungkan benda menjadi lebih banyak.' },
        { id: 'lp-2-3', title: 'Simbol Sama Dengan (=)', desc: 'Menunjukkan hasil akhir dari penggabungan benda.' }
      ]
    },
    videos: {
      video1: {
        title: 'Video 1: Belajar Berhitung Angka 1 sampai 10',
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: 'Video 2: Cerita Buah & Penjumlahan Ceria',
        url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4'
      }
    },
    quiz: {
      title: 'Kuis Berhitung Ceria Bersama Sahabat Hutan',
      questions: [
        {
          id: 'q-2-1',
          questionText: 'Perhatikan gambar buah di bawah! Berapa hasil dari 2 buah apel ditambah 1 buah apel?',
          image: '/Banner_Materi.jpg',
          points: 50,
          options: ['2 apel', '3 apel', '4 apel', '5 apel'],
          correctOptionIndex: 1,
          explanation: '2 buah digabung dengan 1 buah menghasilkan 3 buah apel.'
        },
        {
          id: 'q-2-2',
          questionText: 'Tupai memiliki 3 kacang kenari, lalu ia menemukan 2 kacang kenari lagi di bawah pohon. Berapa total kacang kenari milik Tupai?',
          image: '',
          points: 50,
          options: ['4 kacang', '5 kacang', '6 kacang', '7 kacang'],
          correctOptionIndex: 1,
          explanation: '3 + 2 = 5 kacang kenari.'
        }
      ]
    },
    learningPoints: [
      { id: 'lp-2-1', title: 'Mengenal Angka 1-10' },
      { id: 'lp-2-2', title: 'Penjumlahan Bergambar' }
    ],
    standardContent: {
      title: 'Berhitung Bersama Sahabat Hutan (Standar)',
      text: 'Ayo berhitung bersama kelinci dan tupai ceria di hutan ajaib!',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4'
    },
    slowContent: {
      title: 'Berhitung Bersama Sahabat Hutan (Slow)',
      text: 'Satu apel... ditambah satu apel... menjadi dua apel.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
    },
    assessment: {
      title: 'Kuis Berhitung Ceria',
      questions: []
    }
  },
  {
    id: 'materi-3',
    title: 'Mengenal Tata Surya & Planet Ajaib',
    jenjang: 'SD',
    mataPelajaran: 'IPAS',
    level: 'IPAS • Kelas VI • Fase C',
    badge: 'Gratis',
    image: '/Banner_Materi.jpg',
    description: 'Menjelajahi keajaiban matahari, bumi, dan 8 planet di galaksi bimasakti untuk kelas 6 SD.',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    duration: '± 6 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    materiContent: {
      text: `Pernahkah kamu memandang ke langit malam yang penuh bintang? Bumi tempat tinggal kita hanyalah salah satu bagian dari sistem keluarga bintang raksasa yang disebut Tata Surya!\n\nPusat dari tata surya kita adalah Matahari, sebuah bola gas pijar raksasa yang memancarkan cahaya dan panas ke seluruh penjuru antariksa. Karena gravitasinya yang sangat kuat, 8 planet berputar mengelilingi matahari pada orbit lintasannya masing-masing.\n\nKedelapan planet tersebut secara berurutan dari yang paling dekat dengan matahari adalah: Merkurius, Venus, Bumi (rumah kita), Mars si planet merah, Jupiter planet terbesar, Saturnus dengan cincin cantiknya, Uranus, dan Neptunus si planet es biru yang dingin.`,
      image: '/Banner_Materi.jpg',
      points: [
        { id: 'lp-3-1', title: 'Matahari Pusat Tata Surya', desc: 'Bintang terbesar yang menjadi sumber energi utama bumi.' },
        { id: 'lp-3-2', title: 'Planet Dalam & Luar', desc: 'Dibatasi oleh sabuk asteroid antara Mars dan Jupiter.' },
        { id: 'lp-3-3', title: 'Revolusi & Rotasi', desc: 'Gerakan planet berputar pada porosnya dan mengelilingi matahari.' }
      ]
    },
    videos: {
      video1: {
        title: 'Video 1: Tur Antariksa Menjelajahi 8 Planet',
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: 'Video 2: Keunikan Cincin Saturnus & Badai Jupiter',
        url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
      }
    },
    quiz: {
      title: 'Kuis Cepat Tata Surya & Antariksa',
      questions: [
        {
          id: 'q-3-1',
          questionText: 'Planet apakah yang posisinya paling dekat dengan matahari dalam sistem tata surya?',
          image: '/Banner_Materi.jpg',
          points: 50,
          options: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
          correctOptionIndex: 0,
          explanation: 'Merkurius adalah planet terkecil dan letaknya paling dekat dengan matahari.'
        },
        {
          id: 'q-3-2',
          questionText: 'Planet terbesar di tata surya yang memiliki bintik merah raksasa adalah...',
          image: '',
          points: 50,
          options: ['Saturnus', 'Jupiter', 'Neptunus', 'Uranus'],
          correctOptionIndex: 1,
          explanation: 'Jupiter adalah planet gas raksasa terbesar di tata surya kita.'
        }
      ]
    },
    learningPoints: [
      { id: 'lp-3-1', title: 'Matahari sebagai Pusat Tata Surya' },
      { id: 'lp-3-2', title: 'Planet Dalam & Luar' }
    ],
    standardContent: {
      title: 'Mengenal Tata Surya & Planet Ajaib (Standar)',
      text: 'Selamat datang di antariksa! Mari kita terbang mengelilingi 8 planet yang mengorbit matahari.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4'
    },
    slowContent: {
      title: 'Mengenal Tata Surya & Planet Ajaib (Slow)',
      text: 'Matahari adalah bintang di pusat tata surya kita... Planet berputar mengelilinginya.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
    },
    assessment: {
      title: 'Kuis Cepat Tata Surya',
      questions: []
    }
  },
  {
    id: 'materi-4',
    title: 'Ekosistem & Rantai Makanan Alami',
    jenjang: 'SD',
    mataPelajaran: 'IPAS',
    level: 'IPAS • Kelas V • Fase C',
    badge: 'Gratis',
    image: '/Banner_Materi.jpg',
    description: 'Belajar bagaimana tumbuhan dan hewan saling terhubung dalam rantai makanan yang seimbang untuk kelas 5 SD.',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    duration: '± 5 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    materiContent: {
      text: `Di alam semesta, setiap makhluk hidup tidak bisa hidup sendirian. Tumbuhan dan hewan saling membutuhkan untuk bertahan hidup dalam sebuah ekosistem yang seimbang.\n\nHubungan peristiwa makan dan dimakan antar makhluk hidup dengan urutan tertentu disebut Rantai Makanan. Pada rantai makanan, tumbuhan hijau bertindak sebagai Produsen karena mampu membuat makanannya sendiri melalui fotosintesis dengan bantuan sinar matahari.\n\nKemudian tumbuhan dimakan oleh hewan pemakan tumbuhan (Konsumen I atau Herbivora), misalnya belalang atau kelinci. Kelinci dimakan oleh ular atau elang (Konsumen II atau Karnivora). Saat elang mati, tubuhnya akan diuraikan oleh bakteri dan jamur (Pengurai atau Dekomposer) kembali menjadi zat hara penyubur tanah.`,
      image: '/Banner_Materi.jpg',
      points: [
        { id: 'lp-4-1', title: 'Produsen', desc: 'Tumbuhan hijau yang menghasilkan makanan sendiri lewat fotosintesis.' },
        { id: 'lp-4-2', title: 'Konsumen', desc: 'Hewan pemakan tumbuhan (herbivora) atau hewan lain (karnivora).' },
        { id: 'lp-4-3', title: 'Pengurai (Dekomposer)', desc: 'Jamur dan bakteri yang menguraikan sisa makhluk hidup mati.' }
      ]
    },
    videos: {
      video1: {
        title: 'Video 1: Rantai Makanan di Sawah & Hutan',
        url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
      },
      video2: {
        title: 'Video 2: Peran Pengurai Menjaga Kesuburan Tanah',
        url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
      }
    },
    quiz: {
      title: 'Asesmen Ekosistem & Rantai Makanan',
      questions: [
        {
          id: 'q-4-1',
          questionText: 'Makhluk hidup yang bertindak sebagai produsen utama karena dapat membuat makanan sendiri adalah...',
          image: '/Banner_Materi.jpg',
          points: 50,
          options: ['Tumbuhan Hijau', 'Harimau', 'Burung Elang', 'Bakteri Jamur'],
          correctOptionIndex: 0,
          explanation: 'Tumbuhan hijau berfotosintesis membuat makanan sendiri sehingga disebut produsen.'
        },
        {
          id: 'q-4-2',
          questionText: 'Apa peran dekomposer (pengurai) seperti jamur dan cacing di dalam ekosistem?',
          image: '',
          points: 50,
          options: [
            'Memangsa hewan hidup berukuran besar',
            'Menguraikan sisa makhluk hidup mati menjadi zat hara tanah',
            'Menghalangi sinar matahari ke tanah',
            'Membuat air sungai menjadi kering'
          ],
          correctOptionIndex: 1,
          explanation: 'Dekomposer menguraikan bahan organik mati menjadi unsur hara mineral yang menyuburkan tanah.'
        }
      ]
    },
    learningPoints: [
      { id: 'lp-4-1', title: 'Produsen & Konsumen' },
      { id: 'lp-4-2', title: 'Keseimbangan Ekosistem' }
    ],
    standardContent: {
      title: 'Ekosistem & Rantai Makanan (Standar)',
      text: 'Setiap makhluk hidup di bumi saling membutuhkan makanan untuk bertahan hidup dalam sebuah ekosistem.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4'
    },
    slowContent: {
      title: 'Ekosistem & Rantai Makanan (Slow)',
      text: 'Tumbuhan menghasilkan makanan sendiri... Hewan memakan tumbuhan dan hewan lain.',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
    },
    assessment: {
      title: 'Asesmen Ekosistem & Rantai Makanan',
      questions: []
    }
  }
]

export const initialMateri = allStructuredMateri

// Reactive state - Langsung diisi dari initialMateri agar materi tidak pernah kosong saat startup / refresh
export const materiList = ref(sortMateriNaturally(initialMateri.map(sanitizeMateriItem)))
export const selectedMateri = ref(materiList.value[0] || null)
export const selectedMode = ref('standard') // 'standard' | 'focus'
export const isLoadingMateri = ref(false)

// Init — load dari Supabase dulu, fallback ke localStorage
initMateri()

/**
 * Inisialisasi materi:
 * 1. Supabase = source of truth (jika terkonfigurasi)
 * 2. Kalau Supabase kosong → seed initialMateri ke Supabase
 * 3. localStorage hanya sebagai cache offline
 */
async function initMateri() {
  isLoadingMateri.value = true
  try {
    if (isSupabaseConfigured) {
      await loadFromSupabase()
    } else {
      console.warn('[Prisma] Supabase belum dikonfigurasi — menggunakan localStorage saja.')
      loadFromLocalStorage()
    }
  } catch (e) {
    console.error('initMateri failed, falling back to localStorage:', e)
    loadFromLocalStorage()
  } finally {
    isLoadingMateri.value = false
  }
}

/**
 * Load dari Supabase. Jika tabel kosong, otomatis seed data awal.
 */
async function loadFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('materi')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      // Data ada di Supabase — gunakan sebagai sumber utama (filter baris sistem internal)
      const validMateri = data.filter(
        row => row.id !== 'site-feedback-reviews' && row.jenjang !== 'SYSTEM'
      )
      materiList.value = sortMateriNaturally(validMateri.map(row => sanitizeMateriItem(parseSupabaseRow(row))))
      selectedMateri.value = materiList.value[0] || null
      saveToLocalStorage() // Cache ke localStorage
      console.log(`[Prisma] ✅ Loaded ${validMateri.length} materi dari Supabase`)
      return
    }

    // Supabase kosong — seed initialMateri ke Supabase
    console.log('[Prisma] Supabase kosong, seeding data awal...')
    await seedInitialMateriToSupabase()
    return
  } catch (err) {
    console.warn('Supabase load failed, using localStorage:', err.message)
  }
  // Fallback ke localStorage kalau Supabase benar-benar gagal
  loadFromLocalStorage()
}

/**
 * Parse row Supabase ke format yang dipakai di frontend
 */
function parseSupabaseRow(row) {
  return {
    ...row,
    types: typeof row.types === 'string' ? JSON.parse(row.types) : (row.types || []),
    steps: typeof row.steps === 'string' ? JSON.parse(row.steps) : (row.steps || []),
    learningPoints: typeof row.learning_points === 'string' ? JSON.parse(row.learning_points) : (row.learningPoints || row.learning_points || []),
    materiContent: typeof row.materi_content === 'string' ? JSON.parse(row.materi_content) : (row.materiContent || row.materi_content || null),
    videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : (row.videos || null),
    quiz: typeof row.quiz === 'string' ? JSON.parse(row.quiz) : (row.quiz || null),
    standardConfig: typeof row.standard_config === 'string' ? JSON.parse(row.standard_config) : (row.standardConfig || row.standard_config || {}),
    focusConfig: typeof row.focus_config === 'string' ? JSON.parse(row.focus_config) : (row.focusConfig || row.focus_config || {}),
    standardContent: typeof row.standard_content === 'string' ? JSON.parse(row.standard_content) : (row.standardContent || row.standard_content || {}),
    slowContent: typeof row.slow_content === 'string' ? JSON.parse(row.slow_content) : (row.slowContent || row.slow_content || {}),
    highContrastContent: typeof row.high_contrast_content === 'string' ? JSON.parse(row.high_contrast_content) : (row.highContrastContent || row.high_contrast_content || {}),
    focusContent: typeof row.focus_content === 'string' ? JSON.parse(row.focus_content) : (row.focusContent || row.focus_content || {}),
    assessment: typeof row.assessment === 'string' ? JSON.parse(row.assessment) : (row.assessment || null)
  }
}

/**
 * Konversi item materi frontend ke format kolom Supabase
 */
function toSupabaseRow(item) {
  return {
    id: item.id,
    title: item.title,
    jenjang: item.jenjang,
    mata_pelajaran: item.mataPelajaran,
    level: item.level,
    badge: item.badge,
    image: item.image,
    description: item.description,
    duration: item.duration,
    activity_type: item.activityType,
    learning_options: item.learningOptions,
    types: item.types,
    steps: item.steps,
    learning_points: item.learningPoints,
    materi_content: item.materiContent,
    videos: item.videos,
    quiz: item.quiz,
    standard_config: item.standardConfig,
    focus_config: item.focusConfig,
    standard_content: item.standardContent,
    slow_content: item.slowContent,
    high_contrast_content: item.highContrastContent,
    focus_content: item.focusContent,
    assessment: item.assessment,
    created_at: item.created_at || new Date().toISOString()
  }
}

/**
 * Seed initialMateri ke Supabase (dipanggil sekali saat tabel kosong)
 */
async function seedInitialMateriToSupabase() {
  try {
    const rows = initialMateri.map(item => toSupabaseRow(sanitizeMateriItem(item)))
    const { error } = await supabase.from('materi').insert(rows)
    if (error) {
      console.warn('Seed to Supabase failed:', error.message)
      loadFromLocalStorage()
      return
    }
    // Reload dari Supabase setelah seed berhasil
    const { data } = await supabase.from('materi').select('*').order('created_at', { ascending: false })
    if (data && data.length > 0) {
      materiList.value = sortMateriNaturally(data.map(row => sanitizeMateriItem(parseSupabaseRow(row))))
      selectedMateri.value = materiList.value[0] || null
      saveToLocalStorage()
      console.log(`[Prisma] ✅ Seeded ${data.length} materi ke Supabase`)
    }
  } catch (err) {
    console.warn('Seed Supabase error:', err)
    loadFromLocalStorage()
  }
}

function loadFromLocalStorage() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const validMateri = parsed.filter(
          item => item.id !== 'site-feedback-reviews' && item.jenjang !== 'SYSTEM'
        )
        materiList.value = sortMateriNaturally(validMateri.map(sanitizeMateriItem))
        selectedMateri.value = materiList.value[0]
        return
      }
    }
  } catch (e) {
    console.error('Failed to load cached materi:', e)
  }
  materiList.value = sortMateriNaturally(initialMateri.map(sanitizeMateriItem))
  selectedMateri.value = materiList.value[0]
  saveToLocalStorage()
}

function cleanOldLocalStorageKeys() {
  try {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('prisma_materi_list_') && k !== STORAGE_KEY) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
  } catch (e) {
    console.warn('Cleanup old storage keys error:', e)
  }
}

function saveToLocalStorage() {
  cleanOldLocalStorageKeys()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materiList.value))
  } catch (e) {
    console.warn('Penyimpanan offline localStorage penuh, materi tetap berjalan di memori aplikasi:', e)
  }
}

/**
 * Tambah Materi Baru
 */
export async function addMateri(newItem) {
  const itemWithId = {
    id: `materi-${Date.now()}`,
    badge: 'Gratis',
    types: ['Video', 'Interaktif'],
    image: '/es_batu_card.jpg',
    duration: '± 5 menit',
    activityType: 'Video + Aktivitas',
    learningOptions: 'Standard & Focus Mode',
    learningPoints: [
      { id: 'lp-1', title: 'Konsep Dasar', iconType: 'droplet' },
      { id: 'lp-2', title: 'Aktivitas Mandiri', iconType: 'wind' }
    ],
    standardConfig: {
      title: 'Standard Mode',
      subtitle: 'Visual, animasi, dan narasi lengkap',
      features: [
        'Visual, animasi, dan narasi',
        'untuk pengalaman belajar yang lebih lengkap.'
      ]
    },
    focusConfig: {
      title: 'Focus Mode',
      subtitle: 'Tampilan lebih tenang dengan kontras jelas',
      features: [
        'Tampilan lebih sederhana',
        'Gerakan lebih lambat',
        'Distraksi lebih sedikit',
        'Kontras lebih jelas'
      ]
    },
    steps: [
      {
        id: `step-${Date.now()}-1`,
        number: 1,
        title: 'Pengenalan Materi',
        status: 'active',
        standardContent: {
          title: 'Pengenalan Materi',
          text: newItem.description || 'Mari mulai petualangan belajar kita!',
          videoUrl: ''
        },
        slowContent: {
          title: 'Pengenalan Materi (Slow)',
          text: newItem.description || 'Mari belajar secara bertahap dan santai.',
          videoUrl: ''
        },
        highContrastContent: {
          title: 'PENGENALAN MATERI',
          text: (newItem.description || 'MARI MULAI BELAJAR').toUpperCase(),
          videoUrl: ''
        },
        focusContent: {
          title: 'Poin Kunci Pengenalan',
          text: newItem.description || 'Mari mulai belajar dengan fokus dan tenang.',
          videoUrl: ''
        }
      }
    ],
    created_at: new Date().toISOString(),
    ...newItem
  }
  const cleanItem = sanitizeMateriItem(itemWithId)

  materiList.value.unshift(cleanItem)
  saveToLocalStorage()

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('materi').upsert([toSupabaseRow(cleanItem)], { onConflict: 'id' })
      if (error) console.warn('Supabase upsert warning:', error.message)
      else console.log(`[Prisma] ✅ Materi "${cleanItem.title}" berhasil disimpan ke Supabase`)
    } catch (err) {
      console.warn('Supabase sync skipped:', err)
    }
  }

  return cleanItem
}

/**
 * Update Materi — update reactive state + localStorage + Supabase
 */
export async function updateMateri(id, updatedFields) {
  const index = materiList.value.findIndex((m) => m.id === id)
  if (index === -1) return

  const updated = sanitizeMateriItem({ ...materiList.value[index], ...updatedFields })
  materiList.value[index] = updated
  if (selectedMateri.value?.id === id) {
    selectedMateri.value = updated
  }
  saveToLocalStorage()

  if (isSupabaseConfigured) {
    try {
      const row = toSupabaseRow(updated)
      delete row.created_at // jangan timpa created_at
      // Hapus field undefined
      Object.keys(row).forEach(k => row[k] === undefined && delete row[k])
      // Gunakan upsert agar tetap masuk walaupun row belum ada di Supabase
      const { error } = await supabase.from('materi').upsert(row, { onConflict: 'id' })
      if (error) console.warn('Supabase upsert warning:', error.message)
      else console.log(`[Prisma] ✅ Materi "${updated.title}" berhasil disimpan ke Supabase`)
    } catch (err) {
      console.warn('Supabase upsert skipped:', err)
    }
  }
}

/**
 * Hapus Materi
 */
export async function deleteMateri(id) {
  materiList.value = materiList.value.filter((item) => item.id !== id)
  if (selectedMateri.value?.id === id) {
    selectedMateri.value = materiList.value[0] || null
  }
  saveToLocalStorage()

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('materi').delete().eq('id', id)
      if (error) console.warn('Supabase delete warning:', error.message)
      else console.log(`[Prisma] ✅ Materi berhasil dihapus dari Supabase`)
    } catch (err) {
      console.warn('Supabase delete skipped:', err)
    }
  }
}

/**
 * Reset ke data default — juga reset di Supabase
 */
export async function resetMateri() {
  materiList.value = sortMateriNaturally(initialMateri.map(sanitizeMateriItem))
  selectedMateri.value = materiList.value[0]
  saveToLocalStorage()

  if (isSupabaseConfigured) {
    try {
      // Hapus semua data lama di Supabase
      await supabase.from('materi').delete().neq('id', '')
      // Seed ulang
      const rows = materiList.value.map(toSupabaseRow)
      const { error } = await supabase.from('materi').insert(rows)
      if (error) console.warn('Supabase reset warning:', error.message)
      else console.log('[Prisma] ✅ Data materi berhasil di-reset di Supabase')
    } catch (err) {
      console.warn('Supabase reset skipped:', err)
    }
  }
}

/**
 * Force-sync semua materi di memori (localStorage) ke Supabase via upsert.
 * Panggil ini dari Admin Dashboard setelah upload video agar data dipastikan masuk Supabase.
 * Jika ada kolom yang tidak ada di schema, otomatis retry dengan field minimal saja.
 */
export async function forceSyncToSupabase() {
  if (!isSupabaseConfigured) return { success: false, error: 'Supabase tidak dikonfigurasi' }
  try {
    const rows = materiList.value.map(toSupabaseRow)
    const { error } = await supabase.from('materi').upsert(rows, { onConflict: 'id' })
    if (error) {
      // Coba fallback dengan field minimal (tanpa kolom opsional yang mungkin belum ada)
      console.warn('Full sync failed, trying minimal fields:', error.message)
      const minimalRows = materiList.value.map(item => ({
        id: item.id,
        title: item.title,
        jenjang: item.jenjang,
        mata_pelajaran: item.mataPelajaran,
        level: item.level,
        badge: item.badge,
        image: item.image,
        description: item.description,
        duration: item.duration,
        materi_content: item.materiContent,
        videos: item.videos,
        quiz: item.quiz,
        created_at: item.created_at || new Date().toISOString()
      }))
      const { error: err2 } = await supabase.from('materi').upsert(minimalRows, { onConflict: 'id' })
      if (err2) {
        return { success: false, error: `${err2.message}\n\n⚠️ Jalankan SQL berikut di Supabase SQL Editor dulu:\nALTER TABLE public.materi ADD COLUMN IF NOT EXISTS materi_content JSONB, ADD COLUMN IF NOT EXISTS videos JSONB, ADD COLUMN IF NOT EXISTS quiz JSONB, ADD COLUMN IF NOT EXISTS assessment JSONB, ADD COLUMN IF NOT EXISTS learning_points JSONB, ADD COLUMN IF NOT EXISTS types JSONB;` }
      }
      console.log(`[Prisma] ✅ Minimal sync ${minimalRows.length} materi berhasil (beberapa kolom dilewati)`)
      return { success: true, count: minimalRows.length, partial: true }
    }
    console.log(`[Prisma] ✅ Force sync ${rows.length} materi ke Supabase berhasil`)
    return { success: true, count: rows.length }
  } catch (err) {
    console.warn('Force sync error:', err)
    return { success: false, error: err.message }
  }
}
