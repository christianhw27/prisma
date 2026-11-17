const fs = require('fs');
const path = require('path');

const materiFilePath = path.join(__dirname, '..', 'src', 'lib', 'allMateriData.js');
const rawContent = fs.readFileSync(materiFilePath, 'utf8');

const jsonMatch = rawContent.match(/export const allStructuredMateri = (\[[\s\S]+\]);/);
if (!jsonMatch) {
  console.error('Cannot parse allMateriData.js');
  process.exit(1);
}

const materiList = JSON.parse(jsonMatch[1]);
console.log(`Loaded ${materiList.length} materi chapters from allMateriData.js`);

// 96 Official Questions with Interactive Enhancements (image_choice, matching, ordering, true_false, multiple_choice)
const OFFICIAL_QUIZZES = {
  // === KELAS 1 ===
  '1-1': [
    {
      questionText: 'Sari punya 5 tomat. Nenek punya 4 tomat. Berapa semua tomatnya?',
      instructionBadge: 'Hitung dan Lingkari',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['8 tomat', '9 tomat', '10 tomat'],
      correctOptionIndex: 1,
      explanation: 'Hitung terus dari 5: 6, 7, 8, 9 tomat (5 + 4 = 9).'
    },
    {
      questionText: 'Lingkari gambar TOMAT yang segar!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Tomat Segar', 'Wortel Oranye', 'Apel Manis'],
      imageOptions: [
        { label: 'Tomat Segar', image: '/quiz/items/tomat.svg' },
        { label: 'Wortel Oranye', image: '/quiz/items/wortel.svg' },
        { label: 'Apel Manis', image: '/quiz/items/apel.svg' }
      ],
      correctOptionIndex: 0,
      explanation: 'Tomat berbentuk bulat, berwarna merah cerah, dan memiliki kelopak daun hijau di atasnya.'
    }
  ],
  '1-2': [
    {
      questionText: 'Ibu berkata, "Ada 12 kue. Berikan 5 kue untuk Bu Tini." Apakah Dimas memberi 5 kue kepada Bu Tini?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Ibu menyuruh memberikan 5 kue kepada Bu Tini dan Dimas mematuhinya.'
    },
    {
      questionText: 'Ada 12 kue. Dimas memberikan 5 kue kepada Bu Tini. Sisa berapa kue sekarang?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['6 kue', '7 kue', '8 kue'],
      correctOptionIndex: 1,
      explanation: 'Hitung mundur dari 12: 11, 10, 9, 8, 7 kue tersisa (12 - 5 = 7).'
    }
  ],
  '1-3': [
    {
      questionText: 'Pasangkan benda di kamar Rina dengan bentuk bangun datarnya yang tepat!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '/quiz/k1-b3-kamar-bentuk.svg',
      points: 50,
      options: ['Jam = Lingkaran, Jendela = Persegi, Atap = Segitiga'],
      pairs: [
        { left: 'Jam Dinding', right: 'Lingkaran' },
        { left: 'Jendela Kamar', right: 'Persegi' },
        { left: 'Atap Rumah', right: 'Segitiga' }
      ],
      leftItems: ['Jam Dinding', 'Jendela Kamar', 'Atap Rumah'],
      rightItems: ['Segitiga', 'Lingkaran', 'Persegi'],
      correctOptionIndex: 0,
      explanation: 'Jam dinding berbentuk lingkaran bulat, jendela persegi, dan atap rumah berbentuk segitiga.'
    },
    {
      questionText: 'Info: Bantal ada di atas kasur. Sandal ada di bawah kasur. Di manakah letak sandal Rina?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Di atas kasur', 'Di bawah kasur'],
      correctOptionIndex: 1,
      explanation: 'Sandal diletakkan rapi di lantai bawah kasur.'
    }
  ],
  '1-4': [
    {
      questionText: 'Perhatikan kedua kandang ayam! Lingkari kandang yang telurnya LEBIH BANYAK!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Kandang Kiri (9 Telur)', 'Kandang Kanan (12 Telur)'],
      imageOptions: [
        { label: 'Kandang Kiri (9 Telur)', image: '/quiz/items/kandang-9-telur.svg' },
        { label: 'Kandang Kanan (12 Telur)', image: '/quiz/items/kandang-12-telur.svg' }
      ],
      correctOptionIndex: 1,
      explanation: '12 telur lebih banyak daripada 9 telur, jadi kandang kanan memiliki telur terbanyak.'
    },
    {
      questionText: 'Urutkan bilangan telur berikut dari yang PALING KECIL ke yang paling besar!',
      instructionBadge: 'Urutkan Angka',
      type: 'ordering',
      image: '',
      points: 50,
      orderItems: ['14', '8', '11'],
      correctOrder: ['8', '11', '14'],
      options: ['8, 11, 14', '14, 11, 8', '11, 8, 14'],
      correctOptionIndex: 0,
      explanation: 'Urutan dari yang terkecil adalah 8 telur, lalu 11 telur, kemudian 14 telur.'
    }
  ],
  '1-5': [
    {
      questionText: 'Pola manik gelang: Merah, Kuning, Kuning, Merah, Kuning, Kuning, ... Manik apa berikutnya?',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '/quiz/k1-b5-pola-gelang.svg',
      points: 50,
      options: ['Manik Merah', 'Manik Kuning', 'Manik Hijau'],
      imageOptions: [
        { label: 'Manik Merah', image: '/quiz/items/manik-merah.svg' },
        { label: 'Manik Kuning', image: '/quiz/items/manik-kuning.svg' },
        { label: 'Manik Hijau', image: '/quiz/items/manik-hijau.svg' }
      ],
      correctOptionIndex: 0,
      explanation: 'Polanya berulang: satu merah diikuti dua kuning. Setelah dua kuning, pola kembali ke manik merah.'
    },
    {
      questionText: '2, 4, 6, … Bilangan berapakah berikutnya pada pola loncat 2 ini?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['7', '8', '10'],
      correctOptionIndex: 1,
      explanation: 'Pola selalu ditambah 2: 6 + 2 = 8.'
    }
  ],
  '1-6': [
    {
      questionText: 'Pasangkan kata ukuran pita lomba dengan lawan katanya yang tepat!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Panjang - Pendek, Berat - Ringan, Tinggi - Rendah'],
      pairs: [
        { left: 'Panjang', right: 'Pendek' },
        { left: 'Berat', right: 'Ringan' },
        { left: 'Tinggi', right: 'Rendah' }
      ],
      leftItems: ['Panjang', 'Berat', 'Tinggi'],
      rightItems: ['Ringan', 'Rendah', 'Pendek'],
      correctOptionIndex: 0,
      explanation: 'Lawan kata panjang adalah pendek, berat lawannya ringan, dan tinggi lawannya rendah.'
    },
    {
      questionText: 'Kotak besar berisi balon. Kotak kecil berisi kelereng. Benda manakah yang lebih berat?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Kotak besar berisi balon', 'Kotak kecil berisi kelereng'],
      correctOptionIndex: 1,
      explanation: 'Kelereng terbuat dari kaca padat sehingga lebih berat daripada balon yang hanya berisi udara.'
    }
  ],
  '1-7': [
    {
      questionText: 'Urutkan kegiatan harian Bima dari PAGI ke MALAM!',
      instructionBadge: 'Urutkan Kegiatan',
      type: 'ordering',
      image: '',
      points: 50,
      orderItems: ['Tidur malam', 'Mandi pagi', 'Berangkat sekolah'],
      correctOrder: ['Mandi pagi', 'Berangkat sekolah', 'Tidur malam'],
      options: ['Mandi pagi, Berangkat sekolah, Tidur malam', 'Tidur malam, Mandi pagi, Berangkat sekolah'],
      correctOptionIndex: 0,
      explanation: 'Kegiatan berurutan dari mandi pagi, lalu berangkat sekolah, dan diakhiri dengan tidur saat malam tiba.'
    },
    {
      questionText: 'Sekarang hari Rabu. Hari apakah besok lusa (dua hari lagi)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Kamis', 'Jumat', 'Sabtu'],
      correctOptionIndex: 1,
      explanation: 'Rabu -> besoknya Kamis -> lusa (dua hari lagi) adalah hari Jumat.'
    }
  ],
  '1-8': [
    {
      questionText: 'Lihat piktogram buah kesukaan! Lingkari gambar buah yang PALING BANYAK disukai teman sekelas!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '/quiz/k1-b8-piktogram-buah.svg',
      points: 50,
      options: ['Pisang', 'Jeruk', 'Mangga', 'Semangka'],
      imageOptions: [
        { label: 'Pisang (3 anak)', image: '/quiz/items/pisang.svg' },
        { label: 'Jeruk (5 anak)', image: '/quiz/items/jeruk.svg' },
        { label: 'Mangga', image: '/quiz/items/mangga.svg' },
        { label: 'Semangka (2 anak)', image: '/quiz/items/semangka.svg' }
      ],
      correctOptionIndex: 1,
      explanation: 'Buah jeruk memiliki 5 simbol piktogram, paling banyak di antara semua buah.'
    },
    {
      questionText: 'Berapa banyak anak yang menyukai buah apel pada piktogram?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k1-b8-piktogram-buah.svg',
      points: 50,
      options: ['3 anak', '4 anak', '5 anak'],
      correctOptionIndex: 1,
      explanation: 'Pada baris buah apel terdapat 4 simbol gambar apel.'
    }
  ],

  // === KELAS 2 ===
  '2-1': [
    {
      questionText: 'Apakah sarapan pagi membuat badan kuat dan pikiran menjadi segar?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Sarapan bergizi memberikan energi bagi tubuh dan otak untuk belajar dengan fokus.'
    },
    {
      questionText: 'Beni makan 15 suap nasi. Edo makan 18 suap nasi. Siapakah yang makan lebih banyak?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Beni', 'Edo', 'Sama banyak'],
      correctOptionIndex: 1,
      explanation: '18 suapan lebih besar daripada 15 suapan, jadi Edo makan lebih banyak.'
    }
  ],
  '2-2': [
    {
      questionText: 'Lingkari gambar kue yang menunjukkan pecahan SETENGAH (1/2) sama besar!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Kue dibagi 2 sama besar', 'Kue dibagi 2 tidak sama', 'Kue dibagi 4'],
      imageOptions: [
        { label: 'Pecahan 1/2 (Sama Besar)', image: '/quiz/items/kue-setengah.svg' },
        { label: 'Kue Tidak Sama Besar', image: '/quiz/items/kue-tidak-sama.svg' },
        { label: 'Kue Dibagi 4 (Pecahan 1/4)', image: '/quiz/items/kue-seperempat.svg' }
      ],
      correctOptionIndex: 0,
      explanation: 'Pecahan 1/2 terjadi saat 1 kue utuh dibagi tepat menjadi 2 potong yang SAMA BESAR.'
    },
    {
      questionText: '1 kue bolu dipotong menjadi 4 bagian sama besar. Berapakah nilai 1 potong kue tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k2-b2-pecahan-kue.svg',
      points: 50,
      options: ['1/2', '1/3', '1/4'],
      correctOptionIndex: 2,
      explanation: 'Satu potong dari empat potongan sama besar bernilai pecahan seperempat (1/4).'
    }
  ],
  '2-3': [
    {
      questionText: 'Ibu membeli 3 kantong jeruk. Setiap kantong berisi 4 jeruk. Berapa total seluruh jeruk?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['7 jeruk', '10 jeruk', '12 jeruk'],
      correctOptionIndex: 2,
      explanation: 'Perkalian adalah penjumlahan berulang: 3 × 4 = 4 + 4 + 4 = 12 jeruk.'
    },
    {
      questionText: 'Ada 12 kue mangkok yang dibagikan sama rata kepada 3 anak. Berapa kue yang diterima setiap anak?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['3 kue', '4 kue', '5 kue'],
      correctOptionIndex: 1,
      explanation: 'Pembagian: 12 dibagi 3 anak = 4 kue untuk setiap anak.'
    }
  ],
  '2-4': [
    {
      questionText: 'Katak melompat 3 langkah setiap kali melompat. Jika katak melompat 4 kali dari angka 0, di manakah katak mendarat?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k2-b4-lompat-katak.svg',
      points: 50,
      options: ['Angka 7', 'Angka 9', 'Angka 12'],
      correctOptionIndex: 2,
      explanation: 'Lompatan: 0 -> 3 -> 6 -> 9 -> 12 (4 lompatan × 3 langkah = 12).'
    },
    {
      questionText: 'Berdasarkan cerita: Siapa nama katak kecil yang ramah dan suka melompat?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Koko', 'Boni', 'Riri'],
      correctOptionIndex: 0,
      explanation: 'Katak kecil yang melompat di garis bilangan bernama Koko.'
    }
  ],
  '2-5': [
    {
      questionText: 'Berapakah nilai titik-titik pada persamaan timbangan: 6 + 4 = 5 + ...?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['4', '5', '6'],
      correctOptionIndex: 1,
      explanation: 'Ruas kiri: 6 + 4 = 10. Agar setimbang, ruas kanan harus bernilai 10 (5 + 5 = 10).'
    },
    {
      questionText: 'Apakah persamaan 6 + 4 = 5 + 5 bernilai BENAR atau SALAH?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Keduanya bernilai sama yaitu 10 (10 = 10).'
    }
  ],
  '2-6': [
    {
      questionText: 'Berapakah panjang pensil Lani jika diukur menggunakan penggaris dari angka 0 sampai 12?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['10 cm', '12 cm', '14 cm'],
      correctOptionIndex: 1,
      explanation: 'Ujung pensil dimulai tepat di angka 0 dan berakhir di angka 12, maka panjangnya 12 cm.'
    },
    {
      questionText: 'Benda manakah di dalam kelas yang lebih tepat diukur menggunakan meteran gulung daripada penggaris saku 15 cm?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Penghapus', 'Papan tulis kelas', 'Buku tulis'],
      correctOptionIndex: 1,
      explanation: 'Papan tulis kelas berukuran panjang lebih dari 1 meter sehingga membutuhkan meteran.'
    }
  ],
  '2-7': [
    {
      questionText: 'Raka sarapan tepat pukul 07.00. Lingkari gambar jam dinding yang menunjukkan PUKUL 07.00!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Pukul 07.00', 'Pukul 12.35', 'Pukul 07.30'],
      imageOptions: [
        { label: 'Pukul 07.00', image: '/quiz/items/jam-0700.svg' },
        { label: 'Pukul 12.35', image: '/quiz/items/jam-1235.svg' },
        { label: 'Pukul 07.30', image: '/quiz/items/jam-0730.svg' }
      ],
      correctOptionIndex: 0,
      explanation: 'Pukul 07.00 ditandai dengan jarum pendek di angka 7 dan jarum panjang tegak di angka 12.'
    },
    {
      questionText: 'Raka mulai kerja bakti pukul 08.30 dan selesai pukul 09.30. Berapa lama kegiatan kerja bakti berlangsung?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['30 menit', '1 jam', '2 jam'],
      correctOptionIndex: 1,
      explanation: 'Dari pukul 08.30 ke 09.30 berlalu tepat selama 1 jam (60 menit).'
    }
  ],
  '2-8': [
    {
      questionText: 'Berapa banyak murid yang memilih es teh pada diagram batang kesukaan kelas?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['6 murid', '8 murid', '10 murid'],
      correctOptionIndex: 1,
      explanation: 'Tinggi batang es teh sejajar dengan garis angka 8 pada sumbu tegak.'
    },
    {
      questionText: 'Minuman manakah yang paling sedikit dipilih oleh murid?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Air putih', 'Susu', 'Jus jeruk'],
      correctOptionIndex: 0,
      explanation: 'Batang minuman air putih adalah yang paling pendek di diagram.'
    }
  ],

  // === KELAS 3 ===
  '3-1': [
    {
      questionText: 'Sebuah perpustakaan memiliki 2.450 buku cerita dan mendapat kiriman 1.320 buku lagi. Berapa total seluruh buku?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['3.670 buku', '3.770 buku', '3.870 buku'],
      correctOptionIndex: 1,
      explanation: 'Penjumlahan ribuan: 2.450 + 1.320 = 3.770 buku.'
    },
    {
      questionText: 'Nilai tempat dari angka 4 pada bilangan 2.450 adalah...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Ribuan', 'Ratusan', 'Puluhan'],
      correctOptionIndex: 1,
      explanation: 'Angka 4 menempati posisi kedua dari kiri pada 4 angka ribuan, yaitu bernilai ratusan (400).'
    }
  ],
  '3-2': [
    {
      questionText: 'Pasangkan kata kosa kata perayaan kelas dengan artinya yang tepat!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Syukuran = Berterima kasih, Wali Kelas = Guru penanggung jawab'],
      pairs: [
        { left: 'Syukuran', right: 'Acara berterima kasih kepada Tuhan' },
        { left: 'Wali Kelas', right: 'Guru yang bertanggung jawab atas satu kelas' }
      ],
      leftItems: ['Syukuran', 'Wali Kelas'],
      rightItems: ['Guru yang bertanggung jawab atas satu kelas', 'Acara berterima kasih kepada Tuhan'],
      correctOptionIndex: 0,
      explanation: 'Syukuran adalah perayaan berterima kasih kepada Tuhan, dan wali kelas adalah pendamping kelas.'
    },
    {
      questionText: 'Ibu membawa 4 kotak kue lapis, masing-masing berisi 12 potong kue. Berapa potong seluruh kue?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['36 potong', '44 potong', '48 potong'],
      correctOptionIndex: 2,
      explanation: 'Perkalian: 4 kotak × 12 potong = 48 potong kue.'
    }
  ],
  '3-3': [
    {
      questionText: 'Pasangkan pengukuran di ruang UKS sekolah dengan satuan baku yang tepat!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Berat badan = kg, Tinggi badan = cm'],
      pairs: [
        { left: 'Berat Badan', right: 'Kilogram (kg)' },
        { left: 'Tinggi Badan', right: 'Sentimeter (cm)' }
      ],
      leftItems: ['Berat Badan', 'Tinggi Badan'],
      rightItems: ['Sentimeter (cm)', 'Kilogram (kg)'],
      correctOptionIndex: 0,
      explanation: 'Berat badan diukur menggunakan timbangan dengan satuan kg, sedangkan tinggi badan dengan pita cm.'
    },
    {
      questionText: 'Tinggi badan Siti adalah 1 meter lebih 25 sentimeter (1 m 25 cm). Berapakah tingginya dalam satuan sentimeter?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['125 cm', '150 cm', '175 cm'],
      correctOptionIndex: 0,
      explanation: '1 meter = 100 cm. Jadi 100 cm + 25 cm = 125 cm.'
    }
  ],
  '3-4': [
    {
      questionText: 'Toko kerajinan memiliki 64 gantungan kunci yang dikemas ke dalam 8 kantong sama banyak. Berapa isi tiap kantong?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['7 buah', '8 buah', '9 buah'],
      correctOptionIndex: 1,
      explanation: '64 : 8 = 8 buah per kantong (karena 8 × 8 = 64).'
    },
    {
      questionText: 'Apakah pot kerajinan murid kelas 3 dibuat dari botol plastik daur ulang?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Kerajinan peduli lingkungan memanfaatkan limbah botol plastik menjadi pot hias cantik.'
    }
  ],
  '3-5': [
    {
      questionText: 'Lingkari potongan roti yang ukurannya LEBIH BESAR!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Potongan 1/3 Roti', 'Potongan 1/6 Roti'],
      imageOptions: [
        { label: 'Potongan 1/3 (Lebih Besar)', image: '/quiz/items/roti-sepertiga.svg' },
        { label: 'Potongan 1/6 (Lebih Kecil)', image: '/quiz/items/roti-seperenam.svg' }
      ],
      correctOptionIndex: 0,
      explanation: '1/3 lebih besar daripada 1/6 karena kue hanya dibagi ke 3 orang, sehingga tiap potongnya lebih lebar.'
    },
    {
      questionText: 'Pasangkan pertanyaan 5W1H dari cerita roti bakar dengan jawabannya!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '/quiz/k3-b5-pecahan-roti.svg',
      points: 50,
      options: ['Kapan? = Hari Sabtu, Di mana? = Di dapur'],
      pairs: [
        { left: 'Kapan Ayah membuat roti?', right: 'Hari Sabtu' },
        { left: 'Di mana Ayah membuat roti?', right: 'Di dapur' }
      ],
      leftItems: ['Kapan Ayah membuat roti?', 'Di mana Ayah membuat roti?'],
      rightItems: ['Di dapur', 'Hari Sabtu'],
      correctOptionIndex: 0,
      explanation: 'Waktu peristiwa adalah hari Sabtu dan lokasinya di dapur.'
    }
  ],
  '3-6': [
    {
      questionText: 'Ibu memiliki tali sepanjang 5/8 meter dan digunakan 2/8 meter untuk mengikat paket. Berapa sisa tali Ibu?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['2/8 meter', '3/8 meter', '4/8 meter'],
      correctOptionIndex: 1,
      explanation: 'Penyebut sudah sama: (5 - 2) / 8 = 3/8 meter.'
    },
    {
      questionText: 'Sebuah persegi memiliki panjang sisi 6 cm. Berapakah keliling bangun persegi tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['18 cm', '24 cm', '36 cm'],
      correctOptionIndex: 1,
      explanation: 'Keliling persegi = 4 × sisi = 4 × 6 cm = 24 cm.'
    }
  ],
  '3-7': [
    {
      questionText: 'Sudut yang besarnya tepat sama dengan pojok buku tulis atau sudut meja adalah sudut...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Lancip', 'Siku-siku', 'Tumpul'],
      correctOptionIndex: 1,
      explanation: 'Sudut tegak lurus seperti pojok buku tulis berukuran tepat 90 derajat (sudut siku-siku).'
    },
    {
      questionText: 'Apakah pojok buku tulis membentuk sudut siku-siku?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Setiap pojok buku cetak atau buku tulis berbentuk siku-siku (90 derajat).'
    }
  ],
  '3-8': [
    {
      questionText: 'Berdasarkan tabel tabungan: Dani menabung Rp 5.000 setiap minggu selama 6 minggu berturut-turut. Berapa total tabungan Dani?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Rp 25.000', 'Rp 30.000', 'Rp 35.000'],
      correctOptionIndex: 1,
      explanation: '6 minggu × Rp 5.000 = Rp 30.000.'
    },
    {
      questionText: 'Jika Dani menggunakan Rp 10.000 dari tabungannya untuk membeli buku gambar, berapa sisa tabungan Dani sekarang?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Rp 15.000', 'Rp 20.000', 'Rp 25.000'],
      correctOptionIndex: 1,
      explanation: 'Rp 30.000 - Rp 10.000 = Rp 20.000 sisa tabungan Dani.'
    }
  ],

  // === KELAS 4 ===
  '4-1': [
    {
      questionText: 'Martabak manis dibagi 8 potong sama besar. Andi makan 2 potong martabak. Manakah bentuk pecahan yang senilai dengan bagian Andi?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['1/2', '1/4', '1/8'],
      correctOptionIndex: 1,
      explanation: '2 potong dari 8 bagian = 2/8. Jika pembilang dan penyebut dibagi 2, menjadi 1/4.'
    },
    {
      questionText: 'Apakah bagian Andi (2/4) sama besar dengan bagian Dewi (4/8)?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! 2/4 dan 4/8 keduanya senilai dengan 1/2.'
    }
  ],
  '4-2': [
    {
      questionText: 'Pasangkan bentuk persentase dengan bentuk pecahan biasa yang senilai!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['25% = 1/4, 50% = 1/2, 10% = 1/10'],
      pairs: [
        { left: '25%', right: '1/4' },
        { left: '50%', right: '1/2' },
        { left: '10%', right: '1/10' }
      ],
      leftItems: ['25%', '50%', '10%'],
      rightItems: ['1/2', '1/10', '1/4'],
      correctOptionIndex: 0,
      explanation: '25% = 25/100 = 1/4, 50% = 50/100 = 1/2, dan 10% = 10/100 = 1/10.'
    },
    {
      questionText: 'Sebuah buku tulis berharga Rp 10.000 mendapat potongan diskon 20%. Berapa rupiah potongan harga yang didapat pembeli?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Rp 1.000', 'Rp 2.000', 'Rp 3.000'],
      correctOptionIndex: 1,
      explanation: '20% dari Rp 10.000 = (20/100) × 10.000 = Rp 2.000.'
    }
  ],
  '4-3': [
    {
      questionText: 'Berapakah faktor persekutuan terbesar (FPB) dari 12 dan 18?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['3', '6', '9'],
      correctOptionIndex: 1,
      explanation: 'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor persekutuan terbesar adalah 6.'
    },
    {
      questionText: 'Lampu merah menyala setiap 4 detik, dan lampu hijau menyala setiap 6 detik. Setiap berapa detik kedua lampu akan menyala bersamaan (KPK)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['10 detik', '12 detik', '24 detik'],
      correctOptionIndex: 1,
      explanation: 'KPK dari 4 dan 6 adalah 12 detik.'
    }
  ],
  '4-4': [
    {
      questionText: 'Berapa luas kebun sayur berbentuk persegi panjang dengan panjang 8 meter dan lebar 5 meter?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['26 m²', '40 m²', '45 m²'],
      correctOptionIndex: 1,
      explanation: 'Luas persegi panjang = panjang × lebar = 8 m × 5 m = 40 m².'
    },
    {
      questionText: 'Berapa meter keliling pagar yang mengelilingi kebun sayur 8 meter × 5 meter tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['26 meter', '30 meter', '40 meter'],
      correctOptionIndex: 0,
      explanation: 'Keliling = 2 × (p + l) = 2 × (8 + 5) = 2 × 13 = 26 meter.'
    }
  ],
  '4-5': [
    {
      questionText: 'Berdasarkan diagram batang penjualan es krim: Rasa apakah yang paling banyak terjual sepanjang hari Minggu?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Cokelat', 'Vanila', 'Stroberi'],
      correctOptionIndex: 0,
      explanation: 'Batang es krim rasa cokelat menjulang paling tinggi pada diagram penjualan.'
    },
    {
      questionText: 'Berapa selisih penjualan es krim rasa cokelat (45 buah) dan vanila (30 buah)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['10 buah', '15 buah', '20 buah'],
      correctOptionIndex: 1,
      explanation: 'Selisih = 45 - 30 = 15 buah.'
    }
  ],
  '4-6': [
    {
      questionText: 'Di sebuah aula terdapat 12 baris kursi pentas seni, dan setiap baris berisi 15 kursi. Berapa jumlah seluruh kursi?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['150 kursi', '180 kursi', '200 kursi'],
      correctOptionIndex: 1,
      explanation: '12 × 15 = 180 kursi di aula.'
    },
    {
      questionText: 'Apakah satu baris kalimat dalam karya puisi disebut bait?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 1,
      explanation: 'Salah! Satu baris dalam puisi disebut larik. Kumpulan beberapa larik baris barulah disebut bait.'
    }
  ],
  '4-7': [
    {
      questionText: 'Sudut yang besarnya lebih dari 90 derajat tetapi kurang dari 180 derajat dinamakan sudut...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k4-b7-jenis-sudut.svg',
      points: 50,
      options: ['Sudut Lancip', 'Sudut Siku-Siku', 'Sudut Tumpul'],
      correctOptionIndex: 2,
      explanation: 'Sudut tumpul memiliki bukaan rentang lebih besar dari 90 derajat.'
    },
    {
      questionText: 'Lingkari gambar sudut SIKU-SIKU (tepat 90°) di bawah!',
      instructionBadge: 'Lingkari Gambar yang Benar',
      type: 'image_choice',
      image: '',
      points: 50,
      options: ['Sudut Lancip', 'Sudut Siku-Siku', 'Sudut Tumpul'],
      imageOptions: [
        { label: 'Sudut Lancip (< 90°)', image: '/quiz/items/sudut-lancip.svg' },
        { label: 'Sudut Siku-Siku (Tepat 90°)', image: '/quiz/items/sudut-sikusiku.svg' },
        { label: 'Sudut Tumpul (> 90°)', image: '/quiz/items/sudut-tumpul.svg' }
      ],
      correctOptionIndex: 1,
      explanation: 'Sudut siku-siku memiliki dua garis yang saling tegak lurus sempurna berukuran 90 derajat.'
    }
  ],
  '4-8': [
    {
      questionText: 'Sebuah denah sekolah menggunakan skala 1 : 100. Jika jarak ruang guru ke perpustakaan pada denah adalah 5 cm, berapa jarak sebenarnya?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['50 cm', '5 meter', '50 meter'],
      correctOptionIndex: 1,
      explanation: '5 cm × 100 = 500 cm = 5 meter jarak sebenarnya.'
    },
    {
      questionText: 'Arah mata angin yang berada di antara utara dan timur disebut arah...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Timur Laut', 'Tenggara', 'Barat Laut'],
      correctOptionIndex: 0,
      explanation: 'Antara utara dan timur adalah arah timur laut.'
    }
  ],

  // === KELAS 5 ===
  '5-1': [
    {
      questionText: 'Berapakah hasil dari 2/3 + 1/4?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['3/7', '11/12', '3/12'],
      correctOptionIndex: 1,
      explanation: 'Samakan penyebut ke KPK 12: 8/12 + 3/12 = 11/12.'
    },
    {
      questionText: 'Pak Danu memiliki 3 1/2 meter kayu. Dipotong 1 1/4 meter untuk membuat pigura. Berapa meter sisa kayu Pak Danu?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['2 1/4 meter', '2 1/2 meter', '2 3/4 meter'],
      correctOptionIndex: 0,
      explanation: '3 2/4 - 1 1/4 = 2 1/4 meter kayu.'
    }
  ],
  '5-2': [
    {
      questionText: 'Berapakah hasil perkalian pecahan: 3/5 × 2/7?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['5/12', '6/35', '6/12'],
      correctOptionIndex: 1,
      explanation: 'Kalikan pembilang dengan pembilang dan penyebut dengan penyebut: (3 × 2) / (5 × 7) = 6/35.'
    },
    {
      questionText: 'Urutkan langkah membuat es buah segar dari awal hingga siap disajikan!',
      instructionBadge: 'Urutkan Langkah-Langkah',
      type: 'ordering',
      image: '',
      points: 50,
      orderItems: ['Sajikan', 'Potong buah', 'Cuci buah', 'Tuang air dan sirup'],
      correctOrder: ['Cuci buah', 'Potong buah', 'Tuang air dan sirup', 'Sajikan'],
      options: [
        'Cuci buah -> Potong buah -> Tuang air & sirup -> Sajikan',
        'Potong buah -> Cuci buah -> Sajikan -> Tuang air & sirup',
        'Sajikan -> Potong buah -> Cuci buah -> Tuang air & sirup'
      ],
      correctOptionIndex: 0,
      explanation: 'Urutan higienis: Cuci buah hingga bersih -> Potong dadu -> Tuangkan air dan sirup -> Sajikan dengan es.'
    }
  ],
  '5-3': [
    {
      questionText: 'Sebuah taman kota berbentuk huruf L dibelah menjadi 2 persegi panjang: bagian satu 6 m × 4 m dan bagian dua 3 m × 2 m. Berapa luas total taman?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k5-b3-taman-l.svg',
      points: 50,
      options: ['24 m²', '30 m²', '36 m²'],
      correctOptionIndex: 1,
      explanation: 'Luas gabungan = (6 × 4) + (3 × 2) = 24 + 6 = 30 m².'
    },
    {
      questionText: 'Jika di sekeliling taman L tersebut akan dipasang lampu hias setiap jarak 3 meter, konsep apakah yang digunakan untuk menghitung kebutuhan lampu?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Luas bangun', 'Keliling bangun', 'Volume bangun'],
      correctOptionIndex: 1,
      explanation: 'Memasang pembatas atau lampu di sepanjang tepi luar menggunakan perhitungan keliling.'
    }
  ],
  '5-4': [
    {
      questionText: 'Ali ronda malam setiap 4 hari sekali dan Budi setiap 6 hari sekali. Pada hari ke berapa mereka ronda bersama untuk pertama kalinya?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Hari ke-10', 'Hari ke-12', 'Hari ke-24'],
      correctOptionIndex: 1,
      explanation: 'KPK dari 4 dan 6 adalah 12 hari.'
    },
    {
      questionText: 'Pasangkan jenis soal cerita dengan cara penyelesaian matematika yang tepat (KPK atau FPB)!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Bertemu lagi = KPK, Membagi bingkisan merata = FPB'],
      pairs: [
        { left: 'Kapan mereka bertemu lagi bersamaan?', right: 'KPK (Kelipatan Persekutuan Terkecil)' },
        { left: 'Dibagi sama banyak ke kantong sebanyak-banyaknya', right: 'FPB (Faktor Persekutuan Terbesar)' }
      ],
      leftItems: ['Kapan mereka bertemu lagi bersamaan?', 'Dibagi sama banyak ke kantong sebanyak-banyaknya'],
      rightItems: ['FPB (Faktor Persekutuan Terbesar)', 'KPK (Kelipatan Persekutuan Terkecil)'],
      correctOptionIndex: 0,
      explanation: 'Jadwal berulang diselesaikan dengan KPK, sedangkan pembagian merata bingkisan diselesaikan dengan FPB.'
    }
  ],
  '5-5': [
    {
      questionText: 'Berapa derajat sudut terkecil yang dibentuk oleh kedua jarum jam pada pukul 03.00 tepat?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['60°', '90°', '120°'],
      correctOptionIndex: 1,
      explanation: 'Tiap angka bernilai 30°. Pukul 03.00 jarum menunjuk angka 12 dan 3: 3 × 30° = 90° (siku-siku).'
    },
    {
      questionText: 'Pasangkan besar sudut jarum jam menara desa dengan jenis sudutnya!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['60° = Lancip, 90° = Siku-siku, 120° = Tumpul'],
      pairs: [
        { left: 'Sudut 60°', right: 'Sudut Lancip' },
        { left: 'Sudut 90°', right: 'Sudut Siku-Siku' },
        { left: 'Sudut 120°', right: 'Sudut Tumpul' }
      ],
      leftItems: ['Sudut 60°', 'Sudut 90°', 'Sudut 120°'],
      rightItems: ['Sudut Siku-Siku', 'Sudut Tumpul', 'Sudut Lancip'],
      correctOptionIndex: 0,
      explanation: 'Kurang dari 90° adalah sudut lancip, tepat 90° sudut siku-siku, dan lebih dari 90° sudut tumpul.'
    }
  ],
  '5-6': [
    {
      questionText: 'Sebuah akuarium kaca balok berukuran panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Berapa volume akuarium tersebut dalam cm³?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k5-b6-akuarium-balok.svg',
      points: 50,
      options: ['60.000 cm³', '6.000 cm³', '1.200 cm³'],
      correctOptionIndex: 0,
      explanation: 'Volume balok = p × l × t = 50 × 30 × 40 = 60.000 cm³.'
    },
    {
      questionText: 'Jika 1 liter = 1.000 cm³, berapa liter air yang dibutuhkan untuk mengisi penuh akuarium 60.000 cm³ tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['6 liter', '60 liter', '600 liter'],
      correctOptionIndex: 1,
      explanation: '60.000 cm³ : 1.000 = 60 liter air.'
    }
  ],
  '5-7': [
    {
      questionText: 'Berdasarkan teks berita: Berapa persen kenaikan panen padi di Desa Sukamaju pada tahun ini dibandingkan tahun sebelumnya?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['10%', '15%', '25%'],
      correctOptionIndex: 1,
      explanation: 'Berita mencatat keberhasilan kelompok tani meningkatkan panen sebesar 15% berkat irigasi modern.'
    },
    {
      questionText: 'Pasangkan unsur berita 5W1H dari teks panen padi dengan jawabannya!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Siapa? = Pak Joko & kelompok tani, Di mana? = Desa Sukamaju'],
      pairs: [
        { left: 'Siapa tokoh yang diberitakan?', right: 'Pak Joko dan kelompok tani' },
        { left: 'Di mana lokasi panen berlangsung?', right: 'Desa Sukamaju' }
      ],
      leftItems: ['Siapa tokoh yang diberitakan?', 'Di mana lokasi panen berlangsung?'],
      rightItems: ['Desa Sukamaju', 'Pak Joko dan kelompok tani'],
      correctOptionIndex: 0,
      explanation: 'Tokoh beritanya adalah Pak Joko bersama kelompok tani dan berlokasi di Desa Sukamaju.'
    }
  ],
  '5-8': [
    {
      questionText: 'Urutkan hasil lompatan atlet cilik berikut dari yang TERJAUH ke yang terpendek!',
      instructionBadge: 'Urutkan Bilangan Desimal',
      type: 'ordering',
      image: '',
      points: 50,
      orderItems: ['2,45 m', '2,8 m', '2,08 m', '2,54 m'],
      correctOrder: ['2,8 m', '2,54 m', '2,45 m', '2,08 m'],
      options: [
        '2,8 m > 2,54 m > 2,45 m > 2,08 m',
        '2,08 m > 2,45 m > 2,54 m > 2,8 m',
        '2,8 m > 2,08 m > 2,54 m > 2,45 m'
      ],
      correctOptionIndex: 0,
      explanation: '2,8 (2,80 m) adalah yang paling jauh, disusul 2,54 m, lalu 2,45 m, dan paling pendek 2,08 m.'
    },
    {
      questionText: 'Berapa selisih jarak antara lompatan terjauh (2,8 m) dan lompatan terpendek (2,08 m)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['0,72 meter', '0,88 meter', '0,78 meter'],
      correctOptionIndex: 0,
      explanation: '2,80 - 2,08 = 0,72 meter.'
    }
  ],

  // === KELAS 6 ===
  '6-1': [
    {
      questionText: 'Suhu di dalam freezer adalah -4°C, sedangkan suhu di dalam ruangan ber-AC adalah 20°C. Berapakah selisih suhu antara ruangan dan freezer?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['16°C', '24°C', '-24°C'],
      correctOptionIndex: 1,
      explanation: 'Selisih = 20 - (-4) = 20 + 4 = 24°C.'
    },
    {
      questionText: 'Seekor lumba-lumba berenang pada kedalaman -8 meter di bawah permukaan laut. Kemudian lumba-lumba melompat naik setinggi 11 meter ke udara. Berada di ketinggian berapa lumba-lumba di atas permukaan laut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['2 meter', '3 meter', '4 meter'],
      correctOptionIndex: 1,
      explanation: '-8 + 11 = 3 meter di atas permukaan air laut.'
    }
  ],
  '6-2': [
    {
      questionText: 'Perhatikan denah koordinat perkemahan! Jika Pos Utama berada di titik asal (0, 0), di manakah koordinat letak Tenda Regu Elang?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '/quiz/k6-b2-peta-perkemahan.svg',
      points: 50,
      options: ['(4, 3)', '(3, 4)', '(-4, 3)'],
      correctOptionIndex: 0,
      explanation: 'Maju 4 petak ke arah sumbu X (timur) dan 3 petak ke arah sumbu Y (utara): koordinat (4, 3).'
    },
    {
      questionText: 'Sumber air bersih terletak di koordinat (-2, 5). Di kuadran manakah letak sumber air tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Kuadran I', 'Kuadran II', 'Kuadran III'],
      correctOptionIndex: 1,
      explanation: 'Sumbu X negatif dan sumbu Y positif berada di Kuadran II.'
    }
  ],
  '6-3': [
    {
      questionText: 'Berdasarkan hasil survei 30 murid: 12 murid membawa botol isi ulang, 9 membawa botol plastik sekali pakai, dan 9 membeli minuman kemasan kantin. Berapa persen murid yang membawa botol isi ulang?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['30%', '40%', '50%'],
      correctOptionIndex: 1,
      explanation: '(12 / 30) × 100% = 40%.'
    },
    {
      questionText: 'Apakah pernyataan berikut BENAR: "Sebagian besar murid kelas 6 membawa botol minum isi ulang"?',
      instructionBadge: 'Lingkari B (Benar) atau S (Salah)',
      type: 'true_false',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 1,
      explanation: 'Salah! Sebagian besar berarti lebih dari separuh (> 50%). 12 dari 30 murid hanya 40% (kurang dari separuh).'
    }
  ],
  '6-4': [
    {
      questionText: 'Sebuah kotak undian jalan sehat berisi 10 kupon hadiah utama sepeda dan 90 kupon hadiah hiburan payung. Berapakah peluang seorang peserta mengambil kupon hadiah utama sepeda?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['1/10', '1/9', '1/100'],
      correctOptionIndex: 0,
      explanation: 'Peluang = 10 / (10 + 90) = 10 / 100 = 1/10 (atau 10%).'
    },
    {
      questionText: 'Pasangkan kemungkinan peristiwa dengan tingkat kepastiannya pada undian berhadiah!',
      instructionBadge: 'Tarik Garis / Pasangkan',
      type: 'matching',
      image: '',
      points: 50,
      options: ['Dapat sepeda = Mungkin, Dapat televisi = Tidak mungkin, Dapat hadiah = Pasti'],
      pairs: [
        { left: 'Mendapatkan hadiah sepeda', right: 'Mungkin' },
        { left: 'Mendapatkan televisi (tidak ada di daftar)', right: 'Tidak Mungkin' },
        { left: 'Mendapatkan salah satu hadiah doorprize', right: 'Pasti' }
      ],
      leftItems: ['Mendapatkan hadiah sepeda', 'Mendapatkan televisi (tidak ada di daftar)', 'Mendapatkan salah satu hadiah doorprize'],
      rightItems: ['Tidak Mungkin', 'Pasti', 'Mungkin'],
      correctOptionIndex: 0,
      explanation: 'Sepeda ada di daftar hadiah maka mungkin didapat; televisi tidak ada di daftar maka mustahil/tidak mungkin; dan setiap pemegang nomor menang pasti membawa pulang hadiah.'
    }
  ],
  '6-5': [
    {
      questionText: 'Sebuah taman kota berbentuk lingkaran memiliki diameter 28 meter (jari-jari r = 14 meter). Berapakah luas taman tersebut (gunakan π = 22/7)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['528 m²', '616 m²', '724 m²'],
      correctOptionIndex: 1,
      explanation: 'Luas lingkaran = π × r² = (22/7) × 14 × 14 = 22 × 28 = 616 m².'
    },
    {
      questionText: 'Berapa meter keliling tepi taman lingkaran dengan jari-jari 14 meter tersebut?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['44 meter', '88 meter', '132 meter'],
      correctOptionIndex: 1,
      explanation: 'Keliling = 2 × π × r = 2 × (22/7) × 14 = 88 meter.'
    }
  ],
  '6-6': [
    {
      questionText: 'Sebuah kaleng susu berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Berapakah volume kaleng susu tersebut dalam cm³ (π = 22/7)?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['1.450 cm³', '1.540 cm³', '1.620 cm³'],
      correctOptionIndex: 1,
      explanation: 'Volume tabung = π × r² × t = (22/7) × 7 × 7 × 10 = 154 × 10 = 1.540 cm³.'
    },
    {
      questionText: 'Bangun ruang yang memiliki 1 sisi lengkung selimut dan 1 titik puncak lancip di atasnya adalah...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Tabung', 'Kerucut', 'Bola'],
      correctOptionIndex: 1,
      explanation: 'Kerucut memiliki alas berbentuk lingkaran, satu selimut lengkung, dan sebuah titik puncak.'
    }
  ],
  '6-7': [
    {
      questionText: 'Data nilai ulangan matematika 5 orang murid adalah: 80, 75, 90, 85, dan 70. Berapakah nilai rata-rata (mean) ulangan mereka?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['78', '80', '82'],
      correctOptionIndex: 1,
      explanation: 'Rata-rata = (80 + 75 + 90 + 85 + 70) / 5 = 400 / 5 = 80.'
    },
    {
      questionText: 'Diberikan data nilai: 7, 8, 8, 9, 6, 8, 10. Nilai yang paling sering muncul (modus) adalah...',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['7', '8', '9'],
      correctOptionIndex: 1,
      explanation: 'Nilai 8 muncul paling sering yaitu sebanyak 3 kali.'
    }
  ],
  '6-8': [
    {
      questionText: 'Jika perbandingan uang saku Rian dan Dimas adalah 3 : 5, dan total uang mereka berdua adalah Rp 40.000, berapakah uang saku milik Dimas?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['Rp 15.000', 'Rp 20.000', 'Rp 25.000'],
      correctOptionIndex: 2,
      explanation: 'Bagian Dimas = (5 / (3 + 5)) × 40.000 = (5/8) × 40.000 = Rp 25.000.'
    },
    {
      questionText: 'Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam. Berapa jam waktu yang dibutuhkan untuk menempuh jarak perjalanan sejauh 180 km?',
      instructionBadge: 'Pilihan Ganda',
      type: 'multiple_choice',
      image: '',
      points: 50,
      options: ['2 jam', '3 jam', '4 jam'],
      correctOptionIndex: 1,
      explanation: 'Waktu tempuh = Jarak / Kecepatan = 180 km / 60 km/jam = 3 jam perjalanan.'
    }
  ]
};

// Update materiList with official quizzes
let updatedCount = 0;
materiList.forEach(materi => {
  const kMatch = materi.level?.match(/Kelas (\d)/i);
  const bMatch = materi.title?.match(/Bab (\d)/i);

  if (kMatch && bMatch) {
    const k = parseInt(kMatch[1]);
    const b = parseInt(bMatch[1]);
    const key = `${k}-${b}`;

    if (OFFICIAL_QUIZZES[key]) {
      const qList = OFFICIAL_QUIZZES[key].map((item, idx) => ({
        id: `q-${materi.id}-${idx + 1}`,
        questionText: item.questionText,
        instructionBadge: item.instructionBadge || 'Kuis Interaktif',
        type: item.type || 'multiple_choice',
        image: item.image || '',
        points: item.points || 50,
        options: item.options || [],
        imageOptions: item.imageOptions || null,
        pairs: item.pairs || null,
        leftItems: item.leftItems || null,
        rightItems: item.rightItems || null,
        orderItems: item.orderItems || null,
        correctOrder: item.correctOrder || null,
        correctOptionIndex: item.correctOptionIndex !== undefined ? item.correctOptionIndex : 0,
        explanation: item.explanation || ''
      }));

      materi.quiz = {
        title: `Kuis Interaktif: ${materi.title}`,
        questions: qList
      };
      materi.assessment = materi.quiz;
      updatedCount++;
    }
  }
});

console.log(`Updated ${updatedCount} chapters with enhanced interactive quizzes.`);

// Write back to allMateriData.js
const newFileContent = `// Database Komprehensif Seluruh Materi Resmi PRISMA (Kelas 1 - 6 SD, Bab 1 - 8 per Kelas)
// Total 48 Modul Materi Terstruktur dengan Kurikulum Lengkap & Kuis Interaktif Resmi
export const allStructuredMateri = ${JSON.stringify(materiList, null, 2)};
`;

fs.writeFileSync(materiFilePath, newFileContent, 'utf8');
console.log(`Successfully updated all 48 chapters in ${materiFilePath}!`);
