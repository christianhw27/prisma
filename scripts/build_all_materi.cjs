const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'Materi PRISMA Kelas 1-6 (Terstruktur).md');
const content = fs.readFileSync(mdPath, 'utf8');

function cleanMarkdown(t) {
  if (!t) return '';
  return t
    .replace(/\\([+=!*<>_~`#\-\[\]\(\)])/g, (match, char) => char)
    .replace(/\r\n/g, '\n')
    .trim();
}

function cleanFormatting(t) {
  if (!t) return '';
  return cleanMarkdown(t)
    .replace(/\*\*/g, '')
    .replace(/^#+\s*/, '')
    .trim();
}

const rawSections = content.split(/(?=# \*\*Bab )/g).slice(1);

const IMAGES = [
  '/Banner_Materi.jpg',
  '/es_batu_card.jpg',
  '/Banner_Dashboard.jpg',
  '/Banner_Dashboard2.jpg'
];

const TOPIC_VIDEOS = {
  penjumlahan: {
    video1: { title: 'Video 1: Konsep Penjumlahan Benda Konkret', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Lagu & Cerita Belajar Berhitung', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  pengurangan: {
    video1: { title: 'Video 1: Memahami Pengurangan & Hitung Mundur', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Simulasi Berbagi Benda Ceria', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  bangun_datar: {
    video1: { title: 'Video 1: Mengenal Segitiga, Segi Empat, dan Lingkaran', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Berkreasi Menyusun Pola dan Bentuk', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  pengukuran: {
    video1: { title: 'Video 1: Mengukur Panjang, Berat & Waktu', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Eksperimen Menimbang dan Membandingkan', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  pecahan: {
    video1: { title: 'Video 1: Memahami Konsep Pecahan Sederhana', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Praktik Memotong Kue & Berbagi Rata', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  perkalian: {
    video1: { title: 'Video 1: Perkalian sebagai Penjumlahan Berulang', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Trik Seru Menghitung Perkalian Cepat', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  data_diagram: {
    video1: { title: 'Video 1: Membaca Piktogram dan Diagram Batang', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Menghitung Frekuensi dan Menyajikan Data', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  rasio_sudut: {
    video1: { title: 'Video 1: Memahami Perbandingan, Rasio & Skala', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Pengukuran Sudut & Bangun Ruang', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  }
};

function getVideoPair(title) {
  const t = title.toLowerCase();
  if (t.includes('pecahan') || t.includes('roti') || t.includes('kue bolu') || t.includes('martabak') || t.includes('persen') || t.includes('desimal')) {
    return TOPIC_VIDEOS.pecahan;
  }
  if (t.includes('perkalian') || t.includes('pembagian') || t.includes('syukuran') || t.includes('telur')) {
    return TOPIC_VIDEOS.perkalian;
  }
  if (t.includes('bangun') || t.includes('segitiga') || t.includes('persegi') || t.includes('tangram') || t.includes('kamar') || t.includes('lingkaran') || t.includes('sumur')) {
    return TOPIC_VIDEOS.bangun_datar;
  }
  if (t.includes('ukur') || t.includes('panjang') || t.includes('berat') || t.includes('timbangan') || t.includes('jam') || t.includes('waktu') || t.includes('keliling') || t.includes('luas') || t.includes('volume')) {
    return TOPIC_VIDEOS.pengukuran;
  }
  if (t.includes('data') || t.includes('diagram') || t.includes('piktogram') || t.includes('survei') || t.includes('kebersihan') || t.includes('buah kesukaan') || t.includes('rata-rata')) {
    return TOPIC_VIDEOS.data_diagram;
  }
  if (t.includes('rasio') || t.includes('pupuk') || t.includes('peta') || t.includes('skala') || t.includes('sudut') || t.includes('peluang') || t.includes('doorprize')) {
    return TOPIC_VIDEOS.rasio_sudut;
  }
  if (t.includes('kurang') || t.includes('kue untuk bu tini')) {
    return TOPIC_VIDEOS.pengurangan;
  }
  return TOPIC_VIDEOS.penjumlahan;
}

// 48 Chapters curated quizzes
const QUIZZES_MAP = {
  // Kelas 1
  '1-1': [
    {
      questionText: 'Sari memetik 5 tomat dan Nenek memetik 4 tomat. Berapa jumlah seluruh tomat di dalam keranjang?',
      options: ['7 tomat', '8 tomat', '9 tomat', '10 tomat'],
      correctOptionIndex: 2,
      explanation: 'Hebat! 5 tomat ditambah 4 tomat sama dengan 9 tomat (5 + 4 = 9).'
    },
    {
      questionText: 'Kata "tomat" jika dipenggal menurut suku katanya menjadi...',
      options: ['to - mat', 'tom - at', 't - omat', 'toma - t'],
      correctOptionIndex: 0,
      explanation: 'Pintar sekali! Kata "tomat" terdiri dari dua suku kata: to-mat.'
    }
  ],
  '1-2': [
    {
      questionText: 'Ada 12 kue di meja, lalu Dimas memberikan 5 kue untuk Bu Tini. Berapa sisa kue di meja sekarang?',
      options: ['5 kue', '6 kue', '7 kue', '8 kue'],
      correctOptionIndex: 2,
      explanation: 'Luar biasa! 12 dikurangi 5 hasilnya adalah 7 kue tersisa (12 - 5 = 7).'
    },
    {
      questionText: 'Ketika Ibu meminta tolong kepada Dimas, kalimat apa yang diucapkan Ibu setelah Dimas membantu?',
      options: ['"Pergilah, Dimas."', '"Terima kasih, Dimas."', '"Jangan lupa makan."', '"Ambil lagi kuenya."'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! Mengucapkan terima kasih adalah sikap santun saat dibantu orang lain.'
    }
  ],
  '1-3': [
    {
      questionText: 'Berdasarkan cerita kamar Rina, apa bentuk bangun datar jam dinding yang ada di atas pintu?',
      options: ['Segitiga', 'Persegi', 'Persegi panjang', 'Lingkaran'],
      correctOptionIndex: 3,
      explanation: 'Bagus sekali! Jam dinding di kamar Rina berbentuk lingkaran tanpa sudut.'
    },
    {
      questionText: 'Di manakah letak bantal di kamar Rina?',
      options: ['Di bawah kasur', 'Di atas kasur', 'Di dalam lemari', 'Di atas meja belajar'],
      correctOptionIndex: 1,
      explanation: 'Benar! Bantal berada di atas kasur Rina.'
    }
  ],
  '1-4': [
    {
      questionText: 'Di kandang kiri ada 9 telur dan kandang kanan ada 12 telur. Manakah pernyataan yang benar?',
      options: ['Kandang kiri lebih banyak', 'Kandang kanan lebih banyak', 'Kedua kandang sama banyak', 'Kandang kanan ada 9 telur'],
      correctOptionIndex: 1,
      explanation: 'Keren! 12 lebih besar dari 9, jadi kandang kanan memiliki telur lebih banyak.'
    },
    {
      questionText: 'Manakah di bawah ini yang seluruhnya merupakan huruf vokal?',
      options: ['b, c, d, f, g', 'a, i, u, e, o', 'k, l, m, n, p', 's, t, w, y, z'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! Huruf vokal dalam bahasa Indonesia adalah a, i, u, e, dan o.'
    }
  ],
  '1-5': [
    {
      questionText: 'Dina membuat gelang dengan pola: merah, kuning, kuning, merah, kuning, kuning, ... Manik apakah yang dipasang berikutnya?',
      options: ['Manik hijau', 'Manik merah', 'Manik kuning', 'Manik biru'],
      correctOptionIndex: 1,
      explanation: 'Wah teliti sekali! Setelah dua manik kuning, pola berulang kembali ke manik merah.'
    },
    {
      questionText: 'Pada barisan bilangan 2, 4, 6, 8, ... berapakah bilangan berikutnya dengan pola bertambah 2?',
      options: ['9', '10', '11', '12'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Pola bertambah 2: 8 + 2 = 10.'
    }
  ],
  '1-6': [
    {
      questionText: 'Bu Guru membawa pita merah yang panjang dan pita biru yang...',
      options: ['Lebar', 'Pendek', 'Tinggi', 'Berat'],
      correctOptionIndex: 1,
      explanation: 'Tepat! Lawan kata (antonim) dari kata panjang adalah pendek.'
    },
    {
      questionText: 'Kotak kecil di cerita ternyata terasa berat karena berisi...',
      options: ['Balon', 'Kapas', 'Kelereng', 'Pita'],
      correctOptionIndex: 2,
      explanation: 'Bagus! Benda berukuran kecil bisa terasa berat tergantung isinya, seperti kelereng.'
    }
  ],
  '1-7': [
    {
      questionText: 'Jika hari ini adalah hari Rabu, hari apakah kemarin?',
      options: ['Senin', 'Selasa', 'Kamis', 'Jumat'],
      correctOptionIndex: 1,
      explanation: 'Keren! Sebelum hari Rabu adalah hari Selasa.'
    },
    {
      questionText: 'Kegiatan apa yang dilakukan Bima pada sore hari menurut cerita?',
      options: ['Berangkat sekolah', 'Sarapan pagi', 'Bermain bola bersama teman', 'Mandi pagi'],
      correctOptionIndex: 2,
      explanation: 'Benar! Pada sore hari Bima bermain bola bersama teman-temannya.'
    }
  ],
  '1-8': [
    {
      questionText: 'Berdasarkan data piktogram, buah apakah yang paling banyak disukai teman sekelas?',
      options: ['Pisang (5 anak)', 'Jeruk (3 anak)', 'Mangga (7 anak)', 'Semangka (2 anak)'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Mangga memiliki 7 gambar lingkaran, paling banyak di antara semua buah.'
    },
    {
      questionText: 'Berapa selisih banyaknya anak yang menyukai mangga (7) dan pisang (5)?',
      options: ['1 anak', '2 anak', '3 anak', '4 anak'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! Selisihnya adalah 7 - 5 = 2 anak.'
    }
  ],

  // Kelas 2
  '2-1': [
    {
      questionText: 'Pada bilangan 45 buah jeruk, berapakah nilai tempat angka 4?',
      options: ['4 satuan (bernilai 4)', '4 puluhan (bernilai 40)', '4 ratusan (bernilai 400)', '4 ribuan (bernilai 4000)'],
      correctOptionIndex: 1,
      explanation: 'Pintar! Angka 4 berada di tempat puluhan sehingga bernilai 40.'
    },
    {
      questionText: 'Bu Guru membawa 45 jeruk dan 32 pisang. Tanda perbandingan yang tepat adalah...',
      options: ['45 < 32', '45 > 32', '45 = 32', '45 + 32'],
      correctOptionIndex: 1,
      explanation: 'Hebat! 45 lebih dari (>) 32 karena 4 puluhan lebih besar dari 3 puluhan.'
    }
  ],
  '2-2': [
    {
      questionText: 'Ibu memotong satu kue bolu bundar menjadi 2 bagian sama besar. Setiap bagian bernilai...',
      options: ['Satu per tiga (1/3)', 'Setengah (1/2)', 'Seperempat (1/4)', 'Satu utuh (1)'],
      correctOptionIndex: 1,
      explanation: 'Benar! Satu bagian dari 2 bagian sama besar disebut setengah atau 1/2.'
    },
    {
      questionText: 'Ibu memiliki 8 kelereng untuk dibagikan sama banyak kepada 2 anak. Berapa kelereng yang didapat masing-masing anak (setengah dari 8)?',
      options: ['2 kelereng', '3 kelereng', '4 kelereng', '5 kelereng'],
      correctOptionIndex: 2,
      explanation: 'Keren! 8 dibagi 2 adalah 4 kelereng untuk setiap anak.'
    }
  ],
  '2-3': [
    {
      questionText: 'Mengapa hasil pengukuran panjang meja oleh Dodi (6 jengkal) berbeda dengan Lala (7 jengkal)?',
      options: ['Mejanya bertambah panjang', 'Dodi salah menghitung', 'Panjang jengkal tangan setiap orang berbeda', 'Penggarisnya patah'],
      correctOptionIndex: 2,
      explanation: 'Tepat sekali! Jengkal adalah satuan tidak baku, sehingga ukurannya berbeda antarorang.'
    },
    {
      questionText: 'Pensil Ani panjangnya 5 klip kertas, sedangkan pensil Edo panjangnya 8 klip kertas. Berapa selisih panjang pensil mereka?',
      options: ['2 klip', '3 klip', '4 klip', '13 klip'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Selisihnya adalah 8 - 5 = 3 klip kertas.'
    }
  ],
  '2-4': [
    {
      questionText: 'Katak melompat dengan pola bilangan genap: 0, 2, 4, 6, 8, ... Ke batu nomor berapakah katak melompat berikutnya?',
      options: ['9', '10', '11', '12'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! Pola lompat 2: setelah 8 adalah 8 + 2 = 10.'
    },
    {
      questionText: 'Pada barisan bilangan lompat lima: 15, 20, 25, ... bilangan selanjutnya adalah...',
      options: ['26', '28', '30', '35'],
      correctOptionIndex: 2,
      explanation: 'Pintar! 25 ditambah 5 hasilnya 30.'
    }
  ],
  '2-5': [
    {
      questionText: 'Di piring kiri ada 8 kelereng merah dan 5 kelereng biru (total 13). Di piring kanan baru ada 10 kelereng. Berapa kelereng lagi yang harus ditambah agar seimbang?',
      options: ['2 kelereng', '3 kelereng', '4 kelereng', '5 kelereng'],
      correctOptionIndex: 1,
      explanation: 'Benar! Sisi kiri 8 + 5 = 13. Agar sisi kanan bernilai 13, tambahkan 13 - 10 = 3 kelereng.'
    },
    {
      questionText: 'Arti tanda sama dengan (=) dalam matematika adalah...',
      options: ['Sisi kiri harus lebih besar', 'Sisi kanan selalu nol', 'Nilai di sebelah kiri sama nilainya dengan di sebelah kanan', 'Operasi pengurangan'],
      correctOptionIndex: 2,
      explanation: 'Tepat sekali! Tanda "=" menunjukkan keseimbangan atau kesamaan nilai.'
    }
  ],
  '2-6': [
    {
      questionText: 'Berapa banyak keping yang menyusun permainan tangram tradisional milik Kakek?',
      options: ['5 keping', '6 keping', '7 keping', '8 keping'],
      correctOptionIndex: 2,
      explanation: 'Bagus! Tangram terdiri dari 7 keping: 5 segitiga, 1 persegi, dan 1 jajargenjang.'
    },
    {
      questionText: 'Jika dua bangun segitiga sama kaki dan sebangun digabungkan pada sisi miringnya, bangun baru apa yang dapat terbentuk?',
      options: ['Persegi', 'Lingkaran', 'Segilima', 'Bintang'],
      correctOptionIndex: 0,
      explanation: 'Keren! Dua segitiga yang pas dapat disusun membentuk bangun persegi.'
    }
  ],
  '2-7': [
    {
      questionText: 'Pada jam dinding, jika jarum pendek menunjuk di antara angka 8 dan 9, serta jarum panjang menunjuk angka 6, maka menunjukkan pukul...',
      options: ['08.00', '08.30 (setengah sembilan)', '09.30', '06.40'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Jarum panjang di angka 6 berarti lewat 30 menit (setengah jam), yaitu pukul 08.30.'
    },
    {
      questionText: 'Raka bangun tidur pukul 06.00 dan sarapan pukul 07.00. Berapa lama waktu yang berlalu?',
      options: ['30 menit', '1 jam (60 menit)', '2 jam', '10 menit'],
      correctOptionIndex: 1,
      explanation: 'Benar! Dari pukul 06.00 hingga 07.00 lamanya adalah 1 jam (60 menit).'
    }
  ],
  '2-8': [
    {
      questionText: 'Nisa membeli telur seharga Rp8.000 dan gula Rp7.000. Berapa total harga belanjaan Nisa?',
      options: ['Rp13.000', 'Rp14.000', 'Rp15.000', 'Rp16.000'],
      correctOptionIndex: 2,
      explanation: 'Pintar! 8 ribu + 7 ribu = 15 ribu rupiah (Rp15.000).'
    },
    {
      questionText: 'Nisa membayar belanjaan Rp15.000 dengan selembar uang Rp20.000. Berapakah uang kembalian yang diterima Nisa?',
      options: ['Rp3.000', 'Rp4.000', 'Rp5.000', 'Rp6.000'],
      correctOptionIndex: 2,
      explanation: 'Luar biasa! Rp20.000 - Rp15.000 = Rp5.000 kembalian.'
    }
  ],

  // Kelas 3
  '3-1': [
    {
      questionText: 'Pak Hasan memanen 2.345 ekor bandeng. Berapakah nilai angka 3 pada bilangan 2.345?',
      options: ['3 satuan', '3 puluhan', '3 ratusan (300)', '3 ribuan (3000)'],
      correctOptionIndex: 2,
      explanation: 'Tepat! Angka 3 menempati nilai ratusan sehingga bernilai 300.'
    },
    {
      questionText: 'Pak Hasan mendapat 2.345 ekor bandeng dan Pak Karim mendapat 3.150 ekor. Manakah pernyataan perbandingan yang benar?',
      options: ['2.345 > 3.150', '3.150 > 2.345', 'Keduanya sama banyak', 'Pak Hasan panen lebih banyak'],
      correctOptionIndex: 1,
      explanation: 'Bagus! 3 ribuan lebih besar dari 2 ribuan, jadi 3.150 > 2.345.'
    }
  ],
  '3-2': [
    {
      questionText: 'Ada 6 kelompok di kelas 3, dan tiap kelompok membawa 1 kotak kue lapis berisi 8 potong. Berapa jumlah seluruh kue lapis?',
      options: ['42 potong', '46 potong', '48 potong', '54 potong'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Perkalian 6 kelompok x 8 potong = 48 potong kue.'
    },
    {
      questionText: 'Jika seluruh 48 potong kue dibagikan sama banyak kepada 24 murid kelas 3, berapa potong kue yang didapat setiap murid?',
      options: ['1 potong', '2 potong', '3 potong', '4 potong'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! 48 dibagi 24 adalah 2 potong kue tiap murid.'
    }
  ],
  '3-3': [
    {
      questionText: 'Tinggi badan Fajar adalah 1 meter 32 sentimeter. Berapa tinggi Fajar jika dinyatakan dalam satuan sentimeter (cm)?',
      options: ['132 cm', '102 cm', '123 cm', '1320 cm'],
      correctOptionIndex: 0,
      explanation: 'Pintar! 1 meter = 100 cm, sehingga 100 cm + 32 cm = 132 cm.'
    },
    {
      questionText: 'Sekarung beras memiliki berat 5 kilogram (kg). Berapa berat beras tersebut dalam satuan gram (g)?',
      options: ['50 gram', '500 gram', '5.000 gram', '50.000 gram'],
      correctOptionIndex: 2,
      explanation: 'Benar! 1 kg = 1.000 gram, jadi 5 kg = 5 x 1.000 = 5.000 gram.'
    }
  ],
  '3-4': [
    {
      questionText: 'Pengunjung pameran pada hari pertama ada 368 orang, dan hari kedua ada 457 orang. Berapa jumlah seluruh pengunjung selama dua hari?',
      options: ['815 orang', '825 orang', '725 orang', '835 orang'],
      correctOptionIndex: 1,
      explanation: 'Hebat! 368 + 457 = 825 orang.'
    },
    {
      questionText: 'Berapa selisih banyak pengunjung antara hari kedua (457) dan hari pertama (368)?',
      options: ['79 orang', '89 orang', '99 orang', '109 orang'],
      correctOptionIndex: 1,
      explanation: 'Keren! 457 - 368 = 89 orang.'
    }
  ],
  '3-5': [
    {
      questionText: 'Lia mendapat 1/3 bagian roti dan temannya mendapat 1/6 bagian roti dari ukuran yang sama. Siapakah yang mendapat potongan lebih besar?',
      options: ['Lia (1/3)', 'Teman Kak Dimas (1/6)', 'Sama besar', 'Tidak bisa dibandingkan'],
      correctOptionIndex: 0,
      explanation: 'Tepat sekali! Makin kecil penyebut pada pecahan berpembilang 1, makin besar potongannya (1/3 > 1/6).'
    },
    {
      questionText: 'Pada pecahan 2/6, angka 2 disebut sebagai...',
      options: ['Penyebut', 'Pembilang', 'Kelipatan', 'Hasil bagi'],
      correctOptionIndex: 1,
      explanation: 'Bagus! Angka di atas disebut pembilang, sedangkan angka di bawah adalah penyebut.'
    }
  ],
  '3-6': [
    {
      questionText: 'Berdasarkan tabel jadwal, murid berkeliling kebun binatang dari pukul 09.00 sampai 11.30. Berapa lama kegiatan tersebut?',
      options: ['1 jam 30 menit', '2 jam', '2 jam 30 menit', '3 jam'],
      correctOptionIndex: 2,
      explanation: 'Luar biasa! Dari 09.00 ke 11.30 adalah 2 jam ditambah 30 menit.'
    },
    {
      questionText: 'Jika bus berangkat pukul 07.15 dan murid harus tiba 15 menit sebelumnya, pukul berapa murid harus tiba di sekolah?',
      options: ['06.45', '07.00', '07.30', '06.30'],
      correctOptionIndex: 1,
      explanation: 'Pintar! 15 menit sebelum pukul 07.15 adalah tepat pukul 07.00.'
    }
  ],
  '3-7': [
    {
      questionText: 'Bingkai foto adik Arif berbentuk persegi panjang dengan panjang 20 cm dan lebar 15 cm. Berapakah keliling bingkai tersebut?',
      options: ['35 cm', '50 cm', '70 cm', '100 cm'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Keliling = 2 x (panjang + lebar) = 2 x (20 + 15) = 2 x 35 = 70 cm.'
    },
    {
      questionText: 'Sudut yang tegak lurus seperti pojok buku atau pojok bingkai foto dinamakan sudut...',
      options: ['Sudut lancip', 'Sudut tumpul', 'Sudut siku-siku', 'Sudut lurus'],
      correctOptionIndex: 2,
      explanation: 'Benar! Sudut yang tegak lurus dinamakan sudut siku-siku (90 derajat).'
    }
  ],
  '3-8': [
    {
      questionText: 'Pada piktogram berskala, 1 kotak mewakili 2 kantong sampah. Jika Kelas 3 memiliki 6 kotak, berapa banyak kantong sampah Kelas 3?',
      options: ['6 kantong', '8 kantong', '12 kantong', '16 kantong'],
      correctOptionIndex: 2,
      explanation: 'Keren! 6 kotak dikalikan 2 kantong per kotak = 12 kantong sampah.'
    },
    {
      questionText: 'Berapa selisih kantong sampah plastik yang dikumpulkan Kelas 3 (12 kantong) dan Kelas 1 (6 kantong)?',
      options: ['4 kantong', '5 kantong', '6 kantong', '7 kantong'],
      correctOptionIndex: 2,
      explanation: 'Tepat! 12 kantong - 6 kantong = 6 kantong selisihnya.'
    }
  ],

  // Kelas 4
  '4-1': [
    {
      questionText: 'Andi mengambil 2 potong dari 4 bagian (2/4), sedangkan Dewi mengambil 4 potong dari 8 bagian (4/8). Mengapa bagian mereka sama besar?',
      options: ['Karena 2/4 dan 4/8 adalah pecahan senilai (sama-sama setengah)', 'Karena kuenya beda rasa', 'Karena Andi mengambil lebih dulu', 'Karena martabak Dewi lebih kecil'],
      correctOptionIndex: 0,
      explanation: 'Hebat! 2/4 jika disederhanakan dengan membagi 2 menghasilkan 1/2, sama dengan 4/8 yang disederhanakan menjadi 1/2.'
    },
    {
      questionText: 'Bentuk paling sederhana dari pecahan 6/8 adalah...',
      options: ['1/2', '2/3', '3/4', '4/5'],
      correctOptionIndex: 2,
      explanation: 'Pintar! Membagi pembilang dan penyebut dengan FPB 2 menghasilkan 3/4.'
    }
  ],
  '4-2': [
    {
      questionText: 'Buku tulis seharga Rp5.000 mendapat diskon 10%. Berapakah potongan harga (diskon) yang didapatkan?',
      options: ['Rp200', 'Rp500', 'Rp1.000', 'Rp1.500'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! 10% dari Rp5.000 = (10/100) x 5.000 = Rp500.'
    },
    {
      questionText: 'Pecahan 1/4 jika diubah ke dalam bentuk persen (%) adalah...',
      options: ['15%', '20%', '25%', '40%'],
      correctOptionIndex: 2,
      explanation: 'Benar! 1/4 = 25/100 = 25%.'
    }
  ],
  '4-3': [
    {
      questionText: 'Lahan kangkung berbentuk persegi panjang terdiri dari 3 baris, setiap baris 4 petak. Berapakah luas lahan kangkung dalam petak satuan?',
      options: ['7 petak', '10 petak', '12 petak', '14 petak'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Luas persegi panjang = panjang x lebar = 4 x 3 = 12 petak satuan.'
    },
    {
      questionText: 'Bak kompos tersusun dari kubus satuan dengan panjang 3 kotak, lebar 2 kotak, dan tinggi 2 kotak. Berapa volume bak kompos tersebut?',
      options: ['7 kubus satuan', '10 kubus satuan', '12 kubus satuan', '16 kubus satuan'],
      correctOptionIndex: 2,
      explanation: 'Keren! Volume balok = panjang x lebar x tinggi = 3 x 2 x 2 = 12 kubus satuan.'
    }
  ],
  '4-4': [
    {
      questionText: 'Hari Senin kelompok Adi mengecat 3/8 pagar, hari Selasa kelompok Mira mengecat 2/8 pagar lagi. Berapa total bagian pagar yang sudah dicat?',
      options: ['5/16 bagian', '5/8 bagian', '6/8 bagian', '1/8 bagian'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! Pada pecahan berpenyebut sama, jumlahkan pembilangnya: 3/8 + 2/8 = 5/8 bagian.'
    },
    {
      questionText: 'Seluruh pagar dihitung sebagai 1 bagian utuh (8/8). Berapa sisa bagian pagar yang belum dicat?',
      options: ['2/8 bagian', '3/8 bagian', '4/8 bagian', '5/8 bagian'],
      correctOptionIndex: 1,
      explanation: 'Pintar! 8/8 dikurangi 5/8 hasilnya 3/8 bagian tersisa.'
    }
  ],
  '4-5': [
    {
      questionText: 'Pak Bowo mengirim telur ke 6 warung. Setiap warung memesan 2 rak telur, dan tiap rak berisi 30 butir. Berapa butir total telur yang dipesan?',
      options: ['180 butir', '240 butir', '360 butir', '420 butir'],
      correctOptionIndex: 2,
      explanation: 'Luar biasa! 6 warung x 2 rak = 12 rak. 12 rak x 30 butir = 360 butir telur.'
    },
    {
      questionText: 'Jika ada 245 butir telur dimasukkan ke dalam rak berkapasitas 30 butir, berapa rak yang terisi penuh dan berapa sisa telurnya?',
      options: ['7 rak penuh, sisa 35', '8 rak penuh, sisa 5 butir', '8 rak penuh, tanpa sisa', '9 rak penuh, sisa 10'],
      correctOptionIndex: 1,
      explanation: 'Hebat! 30 x 8 = 240 butir. Sisanya adalah 245 - 240 = 5 butir telur.'
    }
  ],
  '4-6': [
    {
      questionText: 'Pola kursi di aula: baris 1 ada 6 kursi, baris 2 ada 8 kursi, baris 3 ada 10 kursi. Berapa jumlah kursi pada baris ke-5?',
      options: ['12 kursi', '14 kursi', '16 kursi', '18 kursi'],
      correctOptionIndex: 1,
      explanation: 'Pintar! Pola bertambah 2: baris 4 = 12, baris 5 = 14 kursi.'
    },
    {
      questionText: 'Puisi yang dibacakan Rara terdiri dari bait dan larik. Arti dari "larik" dalam puisi adalah...',
      options: ['Judul puisi', 'Baris dalam puisi', 'Paragraf cerita', 'Nama pengarang'],
      correctOptionIndex: 1,
      explanation: 'Benar! Larik adalah sebutan untuk baris-baris kalimat dalam karya puisi.'
    }
  ],
  '4-7': [
    {
      questionText: 'Kandang kambing Pak Karto berbentuk persegi panjang dengan panjang 6 m dan lebar 4 m. Berapakah keliling kandang tersebut sebelum dikurangi pintu?',
      options: ['10 meter', '20 meter', '24 meter', '19 meter'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Keliling = 2 x (panjang + lebar) = 2 x (6 + 4) = 2 x 10 = 20 meter.'
    },
    {
      questionText: 'Sudut yang ukurannya lebih kecil daripada sudut siku-siku (kurang dari 90 derajat) disebut...',
      options: ['Sudut tumpul', 'Sudut lurus', 'Sudut lancip', 'Sudut putar'],
      correctOptionIndex: 2,
      explanation: 'Keren! Sudut lancip adalah sudut yang lebih runcing atau kurang dari 90 derajat.'
    }
  ],
  '4-8': [
    {
      questionText: 'Bu Ratna ingin mengemas 24 kue lumpur tanpa sisa. Kemasan manakah yang bisa ia gunakan jika pilihannya isi 4, 6, dan 12?',
      options: ['Hanya kemasan isi 4', 'Hanya kemasan isi 6', 'Hanya kemasan isi 12', 'Semua kemasan (4, 6, dan 12) bisa digunakan'],
      correctOptionIndex: 3,
      explanation: 'Luar biasa! Karena 4, 6, dan 12 semuanya adalah faktor dari 24 (habis membagi 24).'
    },
    {
      questionText: 'Manakah di bawah ini yang merupakan kelipatan dari bilangan 6?',
      options: ['15', '20', '24', '28'],
      correctOptionIndex: 2,
      explanation: 'Pintar! 6 x 4 = 24, jadi 24 adalah kelipatan 6.'
    }
  ],

  // Kelas 5
  '5-1': [
    {
      questionText: 'Harga sepeda adalah Rp850.000 dan tabungan Laras Rp475.000. Berapa rupiah kekurangan uang yang masih dibutuhkan Laras?',
      options: ['Rp325.000', 'Rp375.000', 'Rp425.000', 'Rp475.000'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Rp850.000 - Rp475.000 = Rp375.000.'
    },
    {
      questionText: 'Jika setiap minggu Laras menabung Rp25.000, berapa minggu ia harus menabung untuk mengumpulkan kekurangan Rp375.000?',
      options: ['10 minggu', '12 minggu', '15 minggu', '18 minggu'],
      correctOptionIndex: 2,
      explanation: 'Keren! Rp375.000 dibagi Rp25.000 = 15 minggu.'
    }
  ],
  '5-2': [
    {
      questionText: 'Resep membutuhkan 1 1/2 gelas semangka dan 1/2 gelas nata de coco. Berapa total gelas kedua bahan tersebut jika digabungkan?',
      options: ['1 gelas', '2 gelas', '2 1/2 gelas', '3 gelas'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! 1 1/2 + 1/2 = 2 gelas utuh.'
    },
    {
      questionText: 'Jika ingin membuat 2 kali lipat resep, berapakah potongan melon yang dibutuhkan dari takaran awal 3/4 gelas?',
      options: ['6/8 gelas', '1 1/2 gelas (6/4)', '2 gelas', '3 gelas'],
      correctOptionIndex: 1,
      explanation: 'Pintar! (3/4) x 2 = 6/4 = 1 2/4 = 1 1/2 gelas.'
    }
  ],
  '5-3': [
    {
      questionText: 'Taman terdiri dari persegi panjang (12 m x 8 m) dan persegi (6 m x 6 m). Berapakah luas total taman bermain balai desa?',
      options: ['96 m²', '120 m²', '132 m²', '144 m²'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Luas 1 = 12 x 8 = 96 m². Luas 2 = 6 x 6 = 36 m². Total = 96 + 36 = 132 m².'
    },
    {
      questionText: 'Dalam menghitung keliling bangun gabungan berbentuk L, bagian sisi yang manakah yang TIDAK boleh ikut dihitung?',
      options: ['Sisi terluar', 'Sisi yang berimpit di dalam bangun', 'Sisi paling panjang', 'Sisi bawah'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! Sisi yang berimpit berada di dalam area gabungan sehingga tidak dihitung sebagai keliling luar.'
    }
  ],
  '5-4': [
    {
      questionText: 'Karang taruna bekerja setiap 4 hari dan ibu-ibu PKK setiap 6 hari. Jika hari ini 1 Desember mereka bekerja bersama, pada tanggal berapakah mereka akan bekerja bersama lagi (KPK 4 dan 6)?',
      options: ['10 Desember', '12 Desember', '13 Desember', '15 Desember'],
      correctOptionIndex: 2,
      explanation: 'Luar biasa! KPK dari 4 dan 6 adalah 12 hari. Tanggal 1 + 12 = 13 Desember.'
    },
    {
      questionText: 'Tersedia 24 kotak susu dan 36 bungkus roti yang akan dibagi rata ke dalam bingkisan terbanyak tanpa sisa (FPB 24 dan 36). Berapa banyak bingkisan yang dapat dibuat?',
      options: ['6 bingkisan', '8 bingkisan', '12 bingkisan', '18 bingkisan'],
      correctOptionIndex: 2,
      explanation: 'Pintar! FPB dari 24 dan 36 adalah 12 bingkisan.'
    }
  ],
  '5-5': [
    {
      questionText: 'Besar sudut satu putaran penuh lingkaran pada jam adalah 360 derajat. Berapakah besar sudut antara dua angka jam yang berdekatan (360° : 12)?',
      options: ['15°', '30°', '45°', '60°'],
      correctOptionIndex: 1,
      explanation: 'Hebat! 360° dibagi 12 angka = 30° per selisih satu angka.'
    },
    {
      questionText: 'Pada pukul 03.00 tepat, sudut terkecil yang dibentuk oleh kedua jarum jam adalah...',
      options: ['45°', '60°', '90° (sudut siku-siku)', '180°'],
      correctOptionIndex: 2,
      explanation: 'Keren! Jarum berada pada selisih 3 angka: 3 x 30° = 90° (sudut siku-siku).'
    }
  ],
  '5-6': [
    {
      questionText: 'Akuarium berbentuk balok dengan panjang 40 cm, lebar 25 cm, dan tinggi air 24 cm. Berapakah volume air dalam satuan liter (1 liter = 1.000 cm³)?',
      options: ['12 liter', '24 liter', '30 liter', '40 liter'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! Volume = 40 x 25 x 24 = 24.000 cm³ = 24 liter.'
    },
    {
      questionText: 'Menurut petunjuk infografik, jika 1/4 bagian air akuarium harus diganti setiap minggu, berapa liter air yang dikeluarkan dari total 24 liter?',
      options: ['4 liter', '6 liter', '8 liter', '10 liter'],
      correctOptionIndex: 1,
      explanation: 'Pintar! (1/4) x 24 liter = 6 liter air.'
    }
  ],
  '5-7': [
    {
      questionText: 'Hasil panen tahun lalu 200 ton dan tahun ini naik sebesar 20%. Berapa ton total hasil panen tahun ini?',
      options: ['220 ton', '230 ton', '240 ton', '250 ton'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Kenaikan 20% dari 200 ton = 40 ton. Total panen = 200 + 40 = 240 ton.'
    },
    {
      questionText: 'Dari 240 ton panen, sebanyak 25% (seperempatnya) disimpan di lumbung desa. Berapa ton padi yang disimpan?',
      options: ['50 ton', '60 ton', '70 ton', '80 ton'],
      correctOptionIndex: 1,
      explanation: 'Keren! 25% = 1/4. Maka 1/4 x 240 ton = 60 ton padi.'
    }
  ],
  '5-8': [
    {
      questionText: 'Hasil lompatan: Andi (2,45 m), Bunga (2,8 m), Citra (2,54 m), Deni (2,08 m). Siapakah peserta yang melompat paling jauh?',
      options: ['Andi', 'Bunga (2,80 m)', 'Citra', 'Deni'],
      correctOptionIndex: 1,
      explanation: 'Tepat sekali! 2,8 m sama dengan 2,80 m, lebih besar dari 2,54 m, 2,45 m, dan 2,08 m.'
    },
    {
      questionText: 'Berapakah selisih panjang lompatan antara Bunga (2,80 m) dan Citra (2,54 m)?',
      options: ['0,24 m', '0,26 m', '0,34 m', '0,36 m'],
      correctOptionIndex: 1,
      explanation: 'Pintar! 2,80 - 2,54 = 0,26 meter (atau 26 cm).'
    }
  ],

  // Kelas 6
  '6-1': [
    {
      questionText: 'Rasio campuran pupuk cair terhadap air adalah 1 : 4. Jika Pak Darto menggunakan 3 liter cairan pupuk, berapa liter air yang harus ditambahkan?',
      options: ['7 liter', '10 liter', '12 liter', '15 liter'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Rasio 1 : 4, jika pupuk 3 liter maka air = 3 x 4 = 12 liter.'
    },
    {
      questionText: 'Toko Subur menjual kompos Rp60.000 untuk 5 kg (Rp12.000/kg). Toko Makmur menjual Rp39.000 untuk 3 kg (Rp13.000/kg). Toko mana yang lebih murah per kilogramnya?',
      options: ['Toko Subur', 'Toko Makmur', 'Harganya sama persis', 'Tidak bisa dihitung'],
      correctOptionIndex: 0,
      explanation: 'Keren! Menghitung rasio satuan per 1 kg membuktikan Toko Subur (Rp12.000) lebih murah daripada Toko Makmur (Rp13.000).'
    }
  ],
  '6-2': [
    {
      questionText: 'Pada peta berpetak, tiang bendera ada di D4. Jika regu berjalan 1 petak ke kanan lalu 1 petak ke bawah, di manakah posisi harta karun?',
      options: ['C3', 'E5', 'E3', 'D5'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! Dari kolom D ke kanan menjadi E, dari baris 4 ke bawah menjadi 5 (petak E5).'
    },
    {
      questionText: 'Kotak harta karun tersusun dari kubus kecil: panjang 4 kubus, lebar 2 kubus, tinggi 3 kubus. Berapa banyak kubus satuan penyusunnya?',
      options: ['9 kubus', '18 kubus', '24 kubus', '32 kubus'],
      correctOptionIndex: 2,
      explanation: 'Pintar! Volume = panjang x lebar x tinggi = 4 x 2 x 3 = 24 kubus satuan.'
    }
  ],
  '6-3': [
    {
      questionText: 'Dari 30 murid: 12 membawa botol isi ulang, 9 botol sekali pakai, 6 gelas plastik, dan 3 tidak bawa. Apakah klaim mading bahwa "sebagian besar murid membawa botol isi ulang" tepat?',
      options: ['Tepat, karena 12 adalah angka terbanyak', 'Tidak tepat, karena sebagian besar berarti harus lebih dari 15 murid (> 50%)', 'Tepat, karena lebih dari 10 murid', 'Tidak ada yang benar'],
      correctOptionIndex: 1,
      explanation: 'Hebat! Berpikir kritis: kata "sebagian besar" berarti lebih dari separuh (> 15 dari 30 murid). Walaupun 12 terbanyak, 12 belum mencapai sebagian besar.'
    },
    {
      questionText: 'Berapa banyak murid yang membawa wadah minum plastik sekali pakai (botol dan gelas plastik)?',
      options: ['9 murid', '12 murid', '15 murid', '18 murid'],
      correctOptionIndex: 2,
      explanation: 'Bagus! 9 botol plastik + 6 gelas plastik = 15 murid.'
    }
  ],
  '6-4': [
    {
      questionText: 'Kotak undian berisi 50 kupon: 30 kupon payung, 15 kupon kipas angin, dan 5 kupon sepeda. Hadiah manakah yang kemungkinannya paling besar didapatkan peserta?',
      options: ['Sepeda', 'Kipas angin', 'Payung', 'Semua sama'],
      correctOptionIndex: 2,
      explanation: 'Keren! Kupon payung ada 30 dari 50 (3/5), paling banyak dibandingkan hadiah lainnya.'
    },
    {
      questionText: 'Berapakah peluang atau rasio kemungkinan terambilnya kupon sepeda dari kotak (5 dari 50 kupon)?',
      options: ['1/5', '1/10', '1/2', '5/10'],
      correctOptionIndex: 1,
      explanation: 'Pintar! 5/50 disederhanakan dengan membagi 5 menjadi 1/10.'
    }
  ],
  '6-5': [
    {
      questionText: 'Regu Elang membeli: 4 botol air mineral (@Rp6.000), 2 bungkus roti (@Rp12.500), dan 1 senter (@Rp45.000). Berapakah total biaya belanja?',
      options: ['Rp84.000', 'Rp94.000', 'Rp98.000', 'Rp104.000'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! (4 x 6.000) + (2 x 12.500) + 45.000 = 24.000 + 25.000 + 45.000 = Rp94.000.'
    },
    {
      questionText: 'Jika uang kas yang dibawa adalah Rp150.000, berapa sisa uang kas yang harus disimpan kembali di kotak kas?',
      options: ['Rp46.000', 'Rp54.000', 'Rp56.000', 'Rp66.000'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Rp150.000 - Rp94.000 = Rp56.000.'
    }
  ],
  '6-6': [
    {
      questionText: 'Bibir sumur memiliki diameter 70 cm. Berapakah keliling lingkaran bibir sumur tersebut menggunakan nilai pi = 22/7 (Keliling = pi x d)?',
      options: ['140 cm', '210 cm', '220 cm', '240 cm'],
      correctOptionIndex: 2,
      explanation: 'Pintar! Keliling = (22/7) x 70 cm = 22 x 10 = 220 cm.'
    },
    {
      questionText: 'Tampah nenek memiliki jari-jari (r) 28 cm. Berapakah diameter tampah tersebut (d = 2 x r)?',
      options: ['14 cm', '42 cm', '56 cm', '70 cm'],
      correctOptionIndex: 2,
      explanation: 'Keren! Diameter adalah dua kali panjang jari-jari: 2 x 28 cm = 56 cm.'
    }
  ],
  '6-7': [
    {
      questionText: 'Data tinggi 8 tanaman kacang hijau (cm): 6, 7, 8, 9, 10, 10, 10, 12 (jumlah total = 72). Berapakah rata-rata (mean) tinggi tanaman?',
      options: ['8 cm', '9 cm', '10 cm', '11 cm'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! Rata-rata = 72 dibagi 8 tanaman = 9 cm.'
    },
    {
      questionText: 'Nilai tinggi tanaman yang paling sering muncul (modus) pada percobaan tersebut adalah...',
      options: ['8 cm', '9 cm', '10 cm (muncul 3 kali)', '12 cm'],
      correctOptionIndex: 2,
      explanation: 'Hebat! Nilai 10 cm muncul sebanyak 3 kali, paling sering dibanding angka lainnya.'
    }
  ],
  '6-8': [
    {
      questionText: 'Peta digambar dengan skala 1 : 10.000. Jarak balai desa ke sekolah pada peta adalah 5 cm. Berapa jarak sebenarnya dalam meter (5 x 10.000 cm)?',
      options: ['50 meter', '500 meter', '5.000 meter', '5 kilometer'],
      correctOptionIndex: 1,
      explanation: 'Pintar! 5 cm x 10.000 = 50.000 cm. Karena 1 m = 100 cm, maka 50.000 cm = 500 meter.'
    },
    {
      questionText: 'Jarak dari balai desa ke pantai pada peta adalah 15 cm. Berapa jarak sebenarnya dalam satuan kilometer (km)?',
      options: ['1,0 km', '1,5 km', '2,0 km', '15 km'],
      correctOptionIndex: 1,
      explanation: 'Luar biasa! 15 cm x 10.000 = 150.000 cm = 1.500 m = 1,5 km.'
    }
  ]
};

const fullMateriList = rawSections.map((sec, idx) => {
  const lines = sec.trim().split('\n');
  const babMatch = lines[0].match(/Bab (\d+):\s*(.+)/);
  const babNum = babMatch ? parseInt(babMatch[1]) : (idx % 8 + 1);
  const kelasNum = Math.floor(idx / 8) + 1;
  
  let title = '';
  let desc = '';
  let kelas = 'Kelas ' + kelasNum;
  
  const titleMatch = sec.match(/Judul Materi:\*{0,2}\s*([^\n]+)/i);
  if (titleMatch) title = cleanFormatting(titleMatch[1]);
  else if (babMatch) title = cleanFormatting(babMatch[2]);
  
  const descMatch = sec.match(/Deskripsi Ringkas:\*{0,2}\s*([^\n]+)/i);
  if (descMatch) desc = cleanFormatting(descMatch[1]);
  
  const textIdx = sec.search(/Isi Teks Bacaan Materi:\*{0,2}/i);
  const pointsIdx = sec.search(/Poin-Poin Penting Belajar:\*{0,2}/i);
  
  let rawText = '';
  if (textIdx !== -1 && pointsIdx !== -1) {
    rawText = sec.substring(textIdx, pointsIdx)
                 .replace(/.*Isi Teks Bacaan Materi:\*{0,2}/i, '')
                 .trim();
  }
  
  let rawPoints = '';
  if (pointsIdx !== -1) {
    rawPoints = sec.substring(pointsIdx)
                   .replace(/.*Poin-Poin Penting Belajar:\*{0,2}/i, '')
                   .trim();
  }
  
  // Format text into clear paragraphs
  const cleanBody = cleanMarkdown(rawText)
    .replace(/\*\*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^[#\s]+|[#\s]+$/g, '')
    .trim();
  
  // Parse points into { id, title, desc }
  const rawPointBullets = rawPoints.split(/\n\s*\*\s+/).map(p => cleanFormatting(p)).filter(p => p.length > 0);
  
  const points = rawPointBullets.map((p, pIdx) => {
    let pointTitle = `Poin ${pIdx + 1}`;
    let pointDesc = p;
    
    const colonMatch = p.match(/^([A-Za-z0-9\s—–\/\(\)]+?)(?::|\s*=\s*|\s*adalah\s+)(.+)$/i);
    if (colonMatch && colonMatch[1].length < 35) {
      pointTitle = colonMatch[1].trim();
      pointDesc = colonMatch[2].trim();
    } else {
      const words = p.split(' ');
      if (words.length > 4) {
        pointTitle = words.slice(0, 3).join(' ');
        pointDesc = p;
      }
    }
    
    return {
      id: `lp-k${kelasNum}b${babNum}-${pIdx + 1}`,
      title: pointTitle,
      desc: pointDesc
    };
  });
  
  const fase = kelasNum <= 2 ? 'Fase A' : (kelasNum <= 4 ? 'Fase B' : 'Fase C');
  const levelStr = `${kelas} • ${fase}`;
  const imgCover = IMAGES[idx % IMAGES.length];
  const videoPair = getVideoPair(title);

  const quizKey = `${kelasNum}-${babNum}`;
  const rawQuestions = QUIZZES_MAP[quizKey] || [];
  const questions = rawQuestions.map((q, qIdx) => ({
    id: `q-k${kelasNum}b${babNum}-${qIdx + 1}`,
    questionText: q.questionText,
    image: qIdx === 0 ? imgCover : '',
    points: 50,
    options: q.options,
    correctOptionIndex: q.correctOptionIndex,
    explanation: q.explanation
  }));

  return {
    id: `materi-k${kelasNum}-b${babNum}`,
    title,
    jenjang: 'SD',
    mataPelajaran: 'Matematika & Bahasa Indonesia',
    level: levelStr,
    badge: 'Gratis',
    image: imgCover,
    description: desc,
    duration: '± 5-7 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    materiContent: {
      text: cleanBody,
      image: imgCover,
      audioUrl: '',
      points
    },
    videos: {
      video1: videoPair.video1,
      video2: videoPair.video2
    },
    quiz: {
      title: `Kuis Pemahaman: ${title}`,
      questions
    },
    learningPoints: points,
    created_at: new Date(Date.now() - (48 - idx) * 3600000).toISOString()
  };
});

const outJs = `/**
 * Dataset Seluruh Materi PRISMA Kelas 1 s/d 6 SD (Terstruktur)
 * Berisi 48 Modul Pembelajaran Interaktif (8 Bab per Kelas).
 * Sesuai PRISMA Design System: 100% Gratis, Ramah Anak, dan Sistem 3 Tab.
 */

export const allStructuredMateri = ${JSON.stringify(fullMateriList, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'lib', 'allMateriData.js');
fs.writeFileSync(outputPath, outJs, 'utf8');
console.log('Successfully wrote', fullMateriList.length, 'chapters to', outputPath);
