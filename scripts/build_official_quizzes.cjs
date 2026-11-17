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

// 96 Official Questions from Lembar_Soal_dan_Kunci_Jawaban_PRISMA.md
const OFFICIAL_QUIZZES = {
  // === KELAS 1 ===
  '1-1': [
    {
      questionText: 'Sari punya 5 tomat. Nenek punya 4 tomat. Berapa semua tomatnya?',
      image: '',
      points: 50,
      options: ['8 tomat', '9 tomat', '10 tomat'],
      correctOptionIndex: 1,
      explanation: 'Hitung terus dari 5: 6, 7, 8, 9 tomat (5 + 4 = 9).'
    },
    {
      questionText: 'Perhatikan gambar di bawah! Manakah gambar buah TOMAT?',
      image: '/quiz/k1-b1-tomat.svg',
      points: 50,
      options: ['Gambar (A) Tomat Merah', 'Gambar (B) Wortel', 'Gambar (C) Apel'],
      correctOptionIndex: 0,
      explanation: 'Tomat itu bulat dan merah dengan daun hijau segar di atasnya.'
    }
  ],
  '1-2': [
    {
      questionText: 'Berdasarkan cerita: Ibu berkata, "Ada 12 kue. Berikan 5 kue untuk Bu Tini." Apakah Dimas memberi 5 kue kepada Bu Tini?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Ibu berkata: "Berikan 5 kue untuk Bu Tini" dan Dimas melaksanakannya.'
    },
    {
      questionText: 'Ada 12 kue. Dimas memberikan 5 kue kepada Bu Tini. Sisa berapa kue sekarang?',
      image: '',
      points: 50,
      options: ['6 kue', '7 kue', '8 kue'],
      correctOptionIndex: 1,
      explanation: 'Hitung mundur dari 12: 11, 10, 9, 8, 7 kue tersisa (12 - 5 = 7).'
    }
  ],
  '1-3': [
    {
      questionText: 'Perhatikan gambar benda kamar Rina di bawah! Bentuk bangun datar apakah jam dinding?',
      image: '/quiz/k1-b3-kamar-bentuk.svg',
      points: 50,
      options: ['Lingkaran', 'Persegi', 'Segitiga'],
      correctOptionIndex: 0,
      explanation: 'Jam dinding berbentuk lingkaran yang tidak memiliki sudut.'
    },
    {
      questionText: 'Berdasarkan info bacaan: Bantal ada di atas kasur, sedangkan sandal ada di mana?',
      image: '',
      points: 50,
      options: ['Di bawah kasur', 'Di atas kasur', 'Di dalam lemari'],
      correctOptionIndex: 0,
      explanation: 'Sesuai bacaan: "Sandal ada di bawah kasur."'
    }
  ],
  '1-4': [
    {
      questionText: 'Perhatikan gambar di bawah! Kandang ayam manakah yang memiliki telur lebih banyak?',
      image: '/quiz/k1-b4-telur-kandang.svg',
      points: 50,
      options: ['Kandang Kanan (12 telur)', 'Kandang Kiri (9 telur)', 'Kedua kandang sama banyak'],
      correctOptionIndex: 0,
      explanation: '12 butir telur di kandang kanan lebih banyak daripada 9 butir telur di kandang kiri.'
    },
    {
      questionText: 'Urutkan bilangan 14, 8, dan 11 dari yang paling kecil!',
      image: '',
      points: 50,
      options: ['8, 11, 14', '14, 11, 8', '11, 8, 14'],
      correctOptionIndex: 0,
      explanation: 'Saat berhitung maju, bilangan 8 disebut paling awal, lalu 11, kemudian 14.'
    }
  ],
  '1-5': [
    {
      questionText: 'Perhatikan pola gelang di bawah: Merah, Kuning, Kuning, Merah, Kuning, Kuning, ... Manik apakah berikutnya?',
      image: '/quiz/k1-b5-pola-gelang.svg',
      points: 50,
      options: ['Merah', 'Kuning', 'Hijau'],
      correctOptionIndex: 0,
      explanation: 'Inti polanya adalah (merah, kuning, kuning), sehingga setelah dua kuning polanya diulang lagi dari merah.'
    },
    {
      questionText: 'Perhatikan barisan bilangan: 2, 4, 6, ... Bilangan berapakah berikutnya?',
      image: '',
      points: 50,
      options: ['7', '8', '10'],
      correctOptionIndex: 1,
      explanation: 'Setiap langkah bertambah 2: 6 + 2 = 8.'
    }
  ],
  '1-6': [
    {
      questionText: 'Pasangkan kata dengan lawannya: Lawan kata (antonim) dari "panjang" adalah...',
      image: '',
      points: 50,
      options: ['Pendek', 'Ringan', 'Rendah'],
      correctOptionIndex: 0,
      explanation: 'Lawan kata dari panjang adalah pendek.'
    },
    {
      questionText: 'Kotak besar berisi balon. Kotak kecil berisi kelereng. Manakah kotak yang lebih berat?',
      image: '',
      points: 50,
      options: ['Kotak kecil (isi kelereng)', 'Kotak besar (isi balon)', 'Sama beratnya'],
      correctOptionIndex: 0,
      explanation: 'Kelereng lebih berat daripada balon meskipun ukuran kotaknya lebih kecil.'
    }
  ],
  '1-7': [
    {
      questionText: 'Urutkan kegiatan Bima dari pagi hingga malam hari yang benar:',
      image: '',
      points: 50,
      options: ['Mandi pagi, berangkat sekolah, lalu tidur malam', 'Tidur malam, mandi pagi, berangkat sekolah', 'Berangkat sekolah, tidur malam, mandi pagi'],
      correctOptionIndex: 0,
      explanation: 'Pagi mandi, siang bersekolah, dan malam tidur.'
    },
    {
      questionText: 'Hari setelah hari Kamis adalah hari...',
      image: '',
      points: 50,
      options: ['Jumat', 'Rabu', 'Sabtu'],
      correctOptionIndex: 0,
      explanation: 'Urutan hari: Rabu, Kamis, lalu Jumat.'
    }
  ],
  '1-8': [
    {
      questionText: 'Perhatikan piktogram buah di bawah! Buah apakah yang paling disukai teman sekelas?',
      image: '/quiz/k1-b8-piktogram-buah.svg',
      points: 50,
      options: ['Mangga (7 anak)', 'Pisang (5 anak)', 'Jeruk (3 anak)', 'Semangka (2 anak)'],
      correctOptionIndex: 0,
      explanation: 'Baris mangga paling panjang, ada 7 anak yang menyukainya.'
    },
    {
      questionText: 'Berdasarkan piktogram buah kesukaan, berapa anak yang menyukai buah pisang?',
      image: '/quiz/k1-b8-piktogram-buah.svg',
      points: 50,
      options: ['5 anak', '3 anak', '7 anak', '2 anak'],
      correctOptionIndex: 0,
      explanation: 'Hitung lingkaran di baris pisang: terdapat 5 lingkaran (5 anak).'
    }
  ],

  // === KELAS 2 ===
  '2-1': [
    {
      questionText: 'Sarapan membuat badan kuat dan pikiran segar. Apakah pernyataan tersebut benar?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Itu manfaat sarapan bergizi menurut bacaan.'
    },
    {
      questionText: 'Bilangan 45 buah jeruk terdiri dari...',
      image: '',
      points: 50,
      options: ['4 puluhan dan 5 satuan', '5 puluhan dan 4 satuan', '40 puluhan dan 5 satuan'],
      correctOptionIndex: 0,
      explanation: 'Angka di sebelah kiri adalah puluhan (4 bernilai 40) dan angka di kanan adalah satuan (5).'
    }
  ],
  '2-2': [
    {
      questionText: 'Perhatikan gambar kue bolu di bawah! Gambar manakah yang menunjukkan pecahan setengah (1/2)?',
      image: '/quiz/k2-b2-pecahan-kue.svg',
      points: 50,
      options: ['Gambar (A) Kue dibagi 2 sama besar, 1 diwarnai', 'Gambar (B) Kue dibagi 2 tidak sama', 'Gambar (C) Kue dibagi 4, 1 diwarnai'],
      correctOptionIndex: 0,
      explanation: 'Setengah (1/2) adalah 1 bagian dari 2 bagian yang sama besar.'
    },
    {
      questionText: 'Manakah penulisan kalimat yang benar menggunakan huruf kapital dan tanda titik?',
      image: '',
      points: 50,
      options: ['Raka makan kue.', 'raka makan kue.', 'Raka makan kue'],
      correctOptionIndex: 0,
      explanation: 'Awal kalimat dan nama orang wajib menggunakan huruf kapital serta diakhiri tanda titik.'
    }
  ],
  '2-3': [
    {
      questionText: 'Pensil Ani 5 klip kertas. Pensil Edo 8 klip kertas. Pensil siapakah yang lebih panjang?',
      image: '',
      points: 50,
      options: ['Pensil Edo', 'Pensil Ani', 'Sama panjang'],
      correctOptionIndex: 0,
      explanation: '8 klip kertas lebih panjang dari 5 klip kertas (8 > 5).'
    },
    {
      questionText: 'Cara bertanya yang sopan kepada guru di kelas adalah...',
      image: '',
      points: 50,
      options: ['"Maaf, Bu, boleh saya bertanya?"', '"Bu, ini kenapa sih!"', '"Cepat jelaskan ini, Bu!"'],
      correctOptionIndex: 0,
      explanation: 'Bertanya dengan santun diawali dengan kata maaf, sapaan hormat, dan izin bertanya.'
    }
  ],
  '2-4': [
    {
      questionText: 'Perhatikan gambar batu lompat katak: 0, 2, 4, 6, ... Bilangan berapakah pada batu selanjutnya?',
      image: '/quiz/k2-b4-lompat-katak.svg',
      points: 50,
      options: ['8', '7', '9', '10'],
      correctOptionIndex: 0,
      explanation: 'Setiap lompatan bertambah 2: setelah 6 adalah 6 + 2 = 8.'
    },
    {
      questionText: 'Perhatikan barisan bilangan: 10, 20, 30, ... Bilangan berikutnya adalah...',
      image: '',
      points: 50,
      options: ['40', '31', '50'],
      correctOptionIndex: 0,
      explanation: 'Setiap langkah bertambah 10: 30 + 10 = 40.'
    }
  ],
  '2-5': [
    {
      questionText: 'Pada timbangan seimbang: 8 + 5 = 10 + ___. Bilangan berapakah yang tepat untuk mengisi titik-titik tersebut?',
      image: '',
      points: 50,
      options: ['3', '2', '4', '5'],
      correctOptionIndex: 0,
      explanation: 'Sisi kiri bernilai 8 + 5 = 13. Supaya sisi kanan juga bernilai 13, maka 10 + 3 = 13.'
    },
    {
      questionText: 'Apakah pernyataan persamaan matematika 6 + 4 = 5 + 5 bernilai seimbang?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Kedua sisi sama-sama bernilai 10 (6 + 4 = 10 dan 5 + 5 = 10).'
    }
  ],
  '2-6': [
    {
      questionText: 'Dua segitiga sama besar ditempel pada sisi miringnya. Bangun baru apakah yang dapat terbentuk?',
      image: '',
      points: 50,
      options: ['Persegi', 'Lingkaran', 'Segilima'],
      correctOptionIndex: 0,
      explanation: 'Gabungkan sisi terpanjangnya, jadilah sebuah bangun persegi.'
    },
    {
      questionText: 'Bangun datar segi enam memiliki berapa sisi lurus?',
      image: '',
      points: 50,
      options: ['6 sisi', '5 sisi', '7 sisi', '8 sisi'],
      correctOptionIndex: 0,
      explanation: 'Nama bangun segi enam sesuai dengan banyaknya sisinya, yaitu 6 sisi.'
    }
  ],
  '2-7': [
    {
      questionText: 'Perhatikan gambar jam di bawah! Gambar manakah yang menunjukkan tepat pukul 07.00?',
      image: '/quiz/k2-b7-jam-dinding.svg',
      points: 50,
      options: ['Gambar (A) Jarum pendek di 7, panjang di 12', 'Gambar (B) Jarum pendek di 12, panjang di 7', 'Gambar (C) Jarum pendek di 7, panjang di 6'],
      correctOptionIndex: 0,
      explanation: 'Jam tepat (07.00): jarum panjang tepat di angka 12 dan jarum pendek di angka 7.'
    },
    {
      questionText: 'Berdasarkan jadwal Raka: 07.00 sarapan, 08.30 kerja bakti, 10.00 bermain di rumah Doni, 12.00 makan siang. Pukul 10.00 Raka sedang...',
      image: '',
      points: 50,
      options: ['Bermain di rumah Doni', 'Sarapan', 'Makan siang'],
      correctOptionIndex: 0,
      explanation: 'Cari baris waktu 10.00 di jadwal: kegiatannya adalah bermain di rumah Doni.'
    }
  ],
  '2-8': [
    {
      questionText: 'Telur Rp8.000 dan gula Rp7.000. Berapa total harga belanjaannya?',
      image: '',
      points: 50,
      options: ['Rp15.000', 'Rp13.000', 'Rp17.000'],
      correctOptionIndex: 0,
      explanation: '8 ribu + 7 ribu = 15 ribu rupiah (Rp15.000).'
    },
    {
      questionText: 'Nisa membayar Rp20.000 untuk belanjaan Rp15.000. Berapakah uang kembaliannya?',
      image: '',
      points: 50,
      options: ['Rp5.000', 'Rp7.000', 'Rp15.000'],
      correctOptionIndex: 0,
      explanation: '20 ribu - 15 ribu = 5 ribu rupiah (Rp5.000).'
    }
  ],

  // === KELAS 3 ===
  '3-1': [
    {
      questionText: 'Ide pokok paragraf ketiga dari teks Panen Bandeng adalah...',
      image: '',
      points: 50,
      options: ['Panen yang baik membutuhkan air tambak yang bersih', 'Mereka juga memberi pakan ikan setiap hari', 'Air tambak berwarna keruh'],
      correctOptionIndex: 0,
      explanation: 'Ide pokok terdapat pada kalimat pertama paragraf.'
    },
    {
      questionText: 'Angka 3 pada bilangan 2.345 bernilai...',
      image: '',
      points: 50,
      options: ['300 (ratusan)', '30 (puluhan)', '3 (satuan)'],
      correctOptionIndex: 0,
      explanation: 'Angka 3 ada di tempat ratusan sehingga bernilai 300.'
    }
  ],
  '3-2': [
    {
      questionText: 'Pasangkan kata dengan artinya: Kata "syukuran" memiliki arti...',
      image: '',
      points: 50,
      options: ['Acara berterima kasih kepada Tuhan', 'Guru yang bertanggung jawab atas satu kelas', 'Kegiatan olahraga bersama'],
      correctOptionIndex: 0,
      explanation: 'Lihat bagian kata baru: syukuran = acara untuk berterima kasih kepada Tuhan.'
    },
    {
      questionText: 'Ada 6 kotak kue lapis. Setiap kotak berisi 8 potong. Berapa potong semuanya?',
      image: '',
      points: 50,
      options: ['48 potong', '42 potong', '54 potong'],
      correctOptionIndex: 0,
      explanation: 'Perkalian jumlah kotak dengan isi: 6 x 8 = 48 potong kue.'
    }
  ],
  '3-3': [
    {
      questionText: 'Satuan baku yang tepat untuk mengukur berat badan dan tinggi badan adalah...',
      image: '',
      points: 50,
      options: ['Berat badan dengan kg, tinggi badan dengan cm', 'Berat badan dengan cm, tinggi badan dengan kg', 'Keduanya menggunakan meter'],
      correctOptionIndex: 0,
      explanation: 'Berat badan diukur memakai kilogram (kg), sedangkan panjang/tinggi memakai sentimeter (cm).'
    },
    {
      questionText: 'Panjang 1 meter 32 sentimeter sama dengan...',
      image: '',
      points: 50,
      options: ['132 cm', '1.032 cm', '32 cm'],
      correctOptionIndex: 0,
      explanation: '1 m = 100 cm. Maka 100 + 32 = 132 cm.'
    }
  ],
  '3-4': [
    {
      questionText: 'Pengunjung hari pertama 368 orang dan hari kedua 457 orang. Berapa jumlah pengunjung semuanya?',
      image: '',
      points: 50,
      options: ['825 orang', '815 orang', '715 orang'],
      correctOptionIndex: 0,
      explanation: '368 + 457 = 825. Jangan lupa teknik menyimpan di satuan dan puluhan.'
    },
    {
      questionText: 'Apakah pot kerajinan kelas 3 dibuat dari botol plastik bekas?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Sesuai bacaan: kelas 3 membuat pot bunga dari botol plastik.'
    }
  ],
  '3-5': [
    {
      questionText: 'Perhatikan gambar potongan roti di bawah! Manakah potongan roti yang LEBIH BESAR?',
      image: '/quiz/k3-b5-pecahan-roti.svg',
      points: 50,
      options: ['1/3 bagian roti', '1/6 bagian roti', 'Sama besar'],
      correctOptionIndex: 0,
      explanation: '1/3 roti lebih besar karena dibagi untuk lebih sedikit orang dibandingkan 1/6.'
    },
    {
      questionText: 'Berdasarkan teks: "Pada hari Sabtu, Ayah membuat roti di dapur." Kata "hari Sabtu" dan "di dapur" masing-masing menjawab pertanyaan...',
      image: '',
      points: 50,
      options: ['Kapan (waktu) dan Di mana (tempat)', 'Siapa dan Mengapa', 'Bagaimana dan Apa'],
      correctOptionIndex: 0,
      explanation: 'Kapan = waktu (hari Sabtu). Di mana = tempat (di dapur).'
    }
  ],
  '3-6': [
    {
      questionText: 'Berdasarkan tabel jadwal wisata: Pukul berapa bus berangkat?',
      image: '',
      points: 50,
      options: ['07.15', '07.00', '08.45'],
      correctOptionIndex: 0,
      explanation: 'Lihat kolom waktu mulai pada baris perjalanan berangkat: 07.15.'
    },
    {
      questionText: 'Kegiatan berkeliling kebun binatang berlangsung pukul 09.00 sampai 11.30. Berapa lama kegiatan tersebut?',
      image: '',
      points: 50,
      options: ['2 jam 30 menit', '2 jam', '3 jam'],
      correctOptionIndex: 0,
      explanation: '09.00 menuju 11.00 adalah 2 jam, ditambah 30 menit lagi = 2 jam 30 menit.'
    }
  ],
  '3-7': [
    {
      questionText: 'Bingkai foto berukuran 20 cm x 15 cm. Berapa keliling bingkai tersebut?',
      image: '',
      points: 50,
      options: ['70 cm', '35 cm', '300 cm'],
      correctOptionIndex: 0,
      explanation: 'Jumlahkan 4 sisinya: 20 + 15 + 20 + 15 = 70 cm.'
    },
    {
      questionText: 'Apakah pojok buku tulis membentuk sudut siku-siku?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Sudut siku-siku berbentuk tegak lurus seperti pojok buku.'
    }
  ],
  '3-8': [
    {
      questionText: 'Satu simbol kotak mewakili 2 kantong. Jika Kelas 3 memiliki 6 kotak, berapa kantong sampah yang dikumpulkan?',
      image: '',
      points: 50,
      options: ['12 kantong', '6 kantong', '8 kantong'],
      correctOptionIndex: 0,
      explanation: '6 kotak dikali 2 kantong per kotak: 6 x 2 = 12 kantong.'
    },
    {
      questionText: 'Kesimpulan manakah yang sesuai dengan data piktogram lomba kebersihan?',
      image: '',
      points: 50,
      options: ['Kelas 3 mengumpulkan sampah paling banyak', 'Semua kelas mengumpulkan sama banyak', 'Kelas 1 mengumpulkan paling banyak'],
      correctOptionIndex: 0,
      explanation: 'Simbol kotak pada baris kelas 3 paling banyak (6 kotak = 12 kantong).'
    }
  ],

  // === KELAS 4 ===
  '4-1': [
    {
      questionText: 'Pecahan yang sama nilainya (senilai) dengan 1/2 adalah...',
      image: '',
      points: 50,
      options: ['3/6', '2/3', '1/4'],
      correctOptionIndex: 0,
      explanation: '3/6 jika dibagi 3 pembilang dan penyebutnya bernilai 1/2.'
    },
    {
      questionText: 'Apakah bagian Andi (2/4 martabak) sama besar dengan bagian Dewi (4/8 martabak)?',
      image: '',
      points: 50,
      options: ['Benar (B)', 'Salah (S)'],
      correctOptionIndex: 0,
      explanation: 'Benar! Keduanya sama-sama bernilai setengah (1/2) martabak manis.'
    }
  ],
  '4-2': [
    {
      questionText: 'Pasangkan persen dengan pecahannya: 25% sama nilainya dengan pecahan...',
      image: '',
      points: 50,
      options: ['1/4', '1/2', '1/10'],
      correctOptionIndex: 0,
      explanation: '25% = 25/100 = 1/4 (persen artinya per seratus).'
    },
    {
      questionText: 'Kalimat penyampaian pendapat yang baik dan berargumen adalah...',
      image: '',
      points: 50,
      options: ['"Menurut saya, kita beli buku karena perlu untuk ujian."', '"Pokoknya beli pensil!"', '"Jangan beli itu!"'],
      correctOptionIndex: 0,
      explanation: 'Pendapat yang baik diawali dengan kata santun dan dilengkapi alasan yang jelas.'
    }
  ],
  '4-3': [
    {
      questionText: 'Lahan kangkung terdiri dari 3 baris, tiap baris 4 petak. Berapakah luasnya?',
      image: '',
      points: 50,
      options: ['12 petak', '7 petak', '10 petak'],
      correctOptionIndex: 0,
      explanation: 'Luas = 3 x 4 = 12 petak.'
    },
    {
      questionText: 'Berdasarkan tabel panen kangkung: Minggu 1 (6 ikat), Minggu 2 (8), Minggu 3 (5), Minggu 4 (9). Minggu ke berapa panen paling banyak?',
      image: '',
      points: 50,
      options: ['Minggu 4 (9 ikat)', 'Minggu 2 (8 ikat)', 'Minggu 1 (6 ikat)'],
      correctOptionIndex: 0,
      explanation: 'Minggu ke-4 ada 9 ikat, paling banyak dibanding minggu lainnya.'
    }
  ],
  '4-4': [
    {
      questionText: 'Berapakah hasil dari 3/8 + 2/8?',
      image: '',
      points: 50,
      options: ['5/8', '5/16', '1/8'],
      correctOptionIndex: 0,
      explanation: 'Jumlahkan atasnya saja (3 + 2 = 5), penyebut bawahnya tetap 8.'
    },
    {
      questionText: '"Mereka ingin selesai pada hari Rabu, [...] cat tinggal sedikit." Kata yang tepat untuk melengkapi adalah...',
      image: '',
      points: 50,
      options: ['tetapi', 'dan', 'karena'],
      correctOptionIndex: 0,
      explanation: 'Kata "tetapi" digunakan untuk menyatakan pertentangan keadaan.'
    }
  ],
  '4-5': [
    {
      questionText: 'Sebanyak 245 butir telur dimasukkan ke dalam rak berkapasitas 30 butir. Ada berapa rak yang terisi PENUH?',
      image: '',
      points: 50,
      options: ['8 rak penuh (sisa 5 butir)', '7 rak penuh', '9 rak penuh'],
      correctOptionIndex: 0,
      explanation: '30 x 8 = 240 butir, jadi 8 rak penuh dengan sisa 5 butir telur.'
    },
    {
      questionText: 'Manakah bentuk jawaban soal cerita yang menggunakan kalimat lengkap?',
      image: '',
      points: 50,
      options: ['"Ada 8 rak telur yang penuh."', '"8."', '"Delapan rak."'],
      correctOptionIndex: 0,
      explanation: 'Kalimat lengkap menyebutkan jawaban dengan subjek dan satuannya dengan jelas.'
    }
  ],
  '4-6': [
    {
      questionText: 'Pola susunan kursi penonton: 6, 8, 10, 12, ... Kursi pada baris berikutnya berjumlah...',
      image: '',
      points: 50,
      options: ['14 kursi', '13 kursi', '16 kursi'],
      correctOptionIndex: 0,
      explanation: 'Setiap baris bertambah 2: 12 + 2 = 14 kursi.'
    },
    {
      questionText: 'Apakah satu baris dalam karya puisi disebut bait?',
      image: '',
      points: 50,
      options: ['Salah (S)', 'Benar (B)'],
      correctOptionIndex: 0,
      explanation: 'Salah! Satu baris dalam puisi disebut larik. Bait adalah kumpulan beberapa larik.'
    }
  ],
  '4-7': [
    {
      questionText: 'Kandang kambing berukuran 6 m x 4 m. Berapa keliling kandang tersebut?',
      image: '',
      points: 50,
      options: ['20 meter', '10 meter', '24 meter'],
      correctOptionIndex: 0,
      explanation: 'Keliling persegi panjang = 2 x (6 + 4) = 2 x 10 = 20 meter.'
    },
    {
      questionText: 'Perhatikan gambar jenis sudut di bawah! Manakah gambar yang menunjukkan sudut Siku-Siku (90 derajat)?',
      image: '/quiz/k4-b7-jenis-sudut.svg',
      points: 50,
      options: ['Gambar (B) Sudut Siku-Siku', 'Gambar (A) Sudut Lancip', 'Gambar (C) Sudut Tumpul'],
      correctOptionIndex: 0,
      explanation: 'Sudut siku-siku berbentuk tegak lurus (90 derajat) seperti pojok buku.'
    }
  ],
  '4-8': [
    {
      questionText: 'Manakah kumpulan bilangan yang seluruhnya merupakan faktor dari 24?',
      image: '',
      points: 50,
      options: ['4, 6, dan 8', '5, 7, dan 9', '9, 10, dan 11'],
      correctOptionIndex: 0,
      explanation: 'Faktor adalah bilangan yang membagi habis 24 tanpa sisa (24 habis dibagi 4, 6, dan 8).'
    },
    {
      questionText: 'Contoh kalimat ajakan dalam teks iklan kue Bu Ratna adalah...',
      image: '',
      points: 50,
      options: ['"Pesan sekarang, dijamin segar!"', '"Tersedia kemasan isi 4, 6, dan 12."', '"Toko buka setiap hari."'],
      correctOptionIndex: 0,
      explanation: 'Kalimat ajakan menyuruh atau membujuk pembaca melakukan suatu tindakan.'
    }
  ],

  // === KELAS 5 ===
  '5-1': [
    {
      questionText: 'Harga sepeda Rp850.000 dan tabungan Laras Rp475.000. Berapa kekurangan uang Laras?',
      image: '',
      points: 50,
      options: ['Rp375.000', 'Rp425.000', 'Rp475.000'],
      correctOptionIndex: 0,
      explanation: '850.000 - 475.000 = 375.000 rupiah.'
    },
    {
      questionText: 'Kalimat poster toko sepeda yang bersifat membujuk pembeli adalah...',
      image: '',
      points: 50,
      options: ['"GRATIS helm untuk pembelian bulan Desember!"', '"Sepeda Gunung Anak"', '"Buka setiap hari pukul 08.00–17.00"'],
      correctOptionIndex: 0,
      explanation: 'Kalimat tersebut mengajak orang agar segera membeli dengan iming-iming bonus gratis.'
    }
  ],
  '5-2': [
    {
      questionText: 'Pecahan campuran 1 1/2 sama nilainya dengan...',
      image: '',
      points: 50,
      options: ['3/2', '1/2', '2/3'],
      correctOptionIndex: 0,
      explanation: '1 utuh = 2/2, ditambah 1/2 = 3/2.'
    },
    {
      questionText: 'Urutkan langkah membuat es buah yang runtut dari awal:',
      image: '',
      points: 50,
      options: ['Cuci buah, potong buah, tuang air dan sirup, sajikan', 'Potong buah, cuci buah, sajikan, tuang sirup', 'Sajikan, tuang air, cuci buah, potong buah'],
      correctOptionIndex: 0,
      explanation: 'Cuci buah terlebih dahulu agar higienis, baru kemudian dipotong dan diracik.'
    }
  ],
  '5-3': [
    {
      questionText: 'Perhatikan denah taman bentuk L di bawah! Luas taman = 96 m² + 36 m². Luas seluruhnya adalah...',
      image: '/quiz/k5-b3-taman-l.svg',
      points: 50,
      options: ['132 m²', '102 m²', '144 m²'],
      correctOptionIndex: 0,
      explanation: 'Jumlahkan luas kedua bagian bangun gabungan: 96 + 36 = 132 m².'
    },
    {
      questionText: 'Kalimat manakah yang merupakan kalimat FAKTA?',
      image: '',
      points: 50,
      options: ['"Taman itu berbentuk huruf L dengan luas 132 m²."', '"Taman itu pasti paling indah sedunia."', '"Bunga di taman harus disiram tiap jam."'],
      correctOptionIndex: 0,
      explanation: 'Fakta dapat dibuktikan secara nyata dengan melihat dan mengukur.'
    }
  ],
  '5-4': [
    {
      questionText: 'KPK (Kelipatan Persekutuan Terkecil) dari bilangan 4 dan 6 adalah...',
      image: '',
      points: 50,
      options: ['12', '2', '24'],
      correctOptionIndex: 0,
      explanation: 'Kelipatan sama yang paling kecil dari 4 dan 6 adalah 12.'
    },
    {
      questionText: 'Masalah "Kapan mereka akan bekerja bersamaan lagi?" diselesaikan menggunakan...',
      image: '',
      points: 50,
      options: ['KPK', 'FPB', 'Rata-rata'],
      correctOptionIndex: 0,
      explanation: 'Kata kunci "bertemu/bersamaan lagi" diselesaikan dengan mencari KPK.'
    }
  ],
  '5-5': [
    {
      questionText: 'Pada pukul 03.00 tepat, sudut terkecil yang dibentuk kedua jarum jam adalah...',
      image: '/quiz/k5-b5-sudut-jam.svg',
      points: 50,
      options: ['90° (sudut siku-siku)', '60°', '180°'],
      correctOptionIndex: 0,
      explanation: '3 langkah angka jam: 3 x 30° = 90°, membentuk sudut siku-siku.'
    },
    {
      questionText: 'Sudut 60° dan 120° secara berurutan termasuk ke dalam jenis sudut...',
      image: '',
      points: 50,
      options: ['Sudut lancip dan sudut tumpul', 'Sudut siku-siku dan sudut lurus', 'Sudut tumpul dan sudut lancip'],
      correctOptionIndex: 0,
      explanation: 'Sudut lancip < 90° < sudut tumpul.'
    }
  ],
  '5-6': [
    {
      questionText: 'Perhatikan gambar akuarium di bawah! Akuarium berukuran 40 cm x 25 cm x 30 cm. Berapakah volumenya?',
      image: '/quiz/k5-b6-akuarium-balok.svg',
      points: 50,
      options: ['30.000 cm³', '3.000 cm³', '95 cm³'],
      correctOptionIndex: 0,
      explanation: 'Volume balok = panjang x lebar x tinggi = 40 x 25 x 30 = 30.000 cm³.'
    },
    {
      questionText: 'Volume 30.000 cm³ sama dengan berapa liter (ingat: 1 liter = 1.000 cm³)?',
      image: '',
      points: 50,
      options: ['30 liter', '3 liter', '300 liter'],
      correctOptionIndex: 0,
      explanation: '1 liter = 1.000 cm³. Maka 30.000 cm³ = 30 liter.'
    }
  ],
  '5-7': [
    {
      questionText: 'Panen tahun lalu 200 ton. Tahun ini naik 20%. Berapa ton kenaikannya?',
      image: '',
      points: 50,
      options: ['40 ton', '20 ton', '60 ton'],
      correctOptionIndex: 0,
      explanation: '10% dari 200 = 20, jadi 20% dari 200 = 40 ton kenaikannya.'
    },
    {
      questionText: 'Berdasarkan teks berita panen, informasi "Pak Joko dan kelompok tani" serta "Desa Sukamaju" masing-masing menjawab pertanyaan...',
      image: '',
      points: 50,
      options: ['Siapa (pelaku) dan Di mana (tempat)', 'Mengapa dan Kapan', 'Bagaimana dan Apa'],
      correctOptionIndex: 0,
      explanation: 'Siapa = orang/pelaku. Di mana = lokasi/tempat kejadian.'
    }
  ],
  '5-8': [
    {
      questionText: 'Urutkan hasil lompatan (meter): 2,45; 2,8; 2,08; 2,54 dari yang TERJAUH:',
      image: '',
      points: 50,
      options: ['2,8 > 2,54 > 2,45 > 2,08', '2,08 > 2,45 > 2,54 > 2,8', '2,45 > 2,54 > 2,8 > 2,08'],
      correctOptionIndex: 0,
      explanation: 'Samakan desimalnya: 2,8 = 2,80, sehingga urutan terjauh adalah 2,8 > 2,54 > 2,45 > 2,08.'
    },
    {
      questionText: 'Manakah nilai yang lebih besar antara 0,7 dan 0,65?',
      image: '',
      points: 50,
      options: ['0,7 lebih besar dari 0,65', '0,65 lebih besar dari 0,7', 'Keduanya sama besar'],
      correctOptionIndex: 0,
      explanation: '0,7 sama dengan 0,70. Nilai 0,70 lebih besar dari 0,65 (0,70 > 0,65).'
    }
  ],

  // === KELAS 6 ===
  '6-1': [
    {
      questionText: 'Rasio cairan pupuk : air = 1 : 4. Jika digunakan 3 liter cairan pupuk, berapa liter air yang dibutuhkan?',
      image: '',
      points: 50,
      options: ['12 liter', '7 liter', '15 liter'],
      correctOptionIndex: 0,
      explanation: '1 : 4 = 3 : 12. Jadi dibutuhkan 4 x 3 = 12 liter air.'
    },
    {
      questionText: 'Kalimat manakah yang merupakan kalimat OPINI (dugaan/pendapat)?',
      image: '',
      points: 50,
      options: ['"Toko Makmur pasti lebih murah."', '"Toko Subur menjual 5 kg Rp60.000."', '"Pak Darto membeli kompos."'],
      correctOptionIndex: 0,
      explanation: 'Kata "pasti" menunjukkan dugaan/opini yang belum tentu benar sebelum dihitung.'
    }
  ],
  '6-2': [
    {
      questionText: 'Perhatikan peta perkemahan berpetak di bawah! Mulai dari D4, berjalanlah 1 petak ke kanan lalu 1 petak ke bawah. Di petak manakah posisi harta karun?',
      image: '/quiz/k6-b2-peta-perkemahan.svg',
      points: 50,
      options: ['Petak E5', 'Petak C3', 'Petak E3', 'Petak D5'],
      correctOptionIndex: 0,
      explanation: 'Ke kanan: kolom D menjadi E. Ke bawah: baris 4 menjadi 5 (petak E5).'
    },
    {
      questionText: 'Kotak berukuran 4 x 2 x 3 kubus satuan tersusun dari berapa kubus?',
      image: '',
      points: 50,
      options: ['24 kubus', '9 kubus', '20 kubus'],
      correctOptionIndex: 0,
      explanation: 'Volume balok = 4 x 2 x 3 = 24 kubus.'
    }
  ],
  '6-3': [
    {
      questionText: 'Sebanyak 12 + 9 + 6 + 3 murid dihitung pada survei botol minum. Berapa jumlah seluruh murid yang disurvei?',
      image: '',
      points: 50,
      options: ['30 murid', '27 murid', '32 murid'],
      correctOptionIndex: 0,
      explanation: 'Jumlahkan seluruh frekuensi: 12 + 9 + 6 + 3 = 30 murid.'
    },
    {
      questionText: '"Sebagian besar murid membawa botol isi ulang (12 dari 30 murid)." Apakah pernyataan klaim tersebut benar?',
      image: '',
      points: 50,
      options: ['Salah (S)', 'Benar (B)'],
      correctOptionIndex: 0,
      explanation: 'Salah! Kata "sebagian besar" berarti lebih dari separuh (> 15). Ini hanya 12 murid.'
    }
  ],
  '6-4': [
    {
      questionText: 'Kotak berisi: payung 30 kupon, kipas angin 15 kupon, sepeda 5 kupon. Hadiah manakah yang paling mungkin didapat?',
      image: '',
      points: 50,
      options: ['Payung', 'Kipas angin', 'Sepeda'],
      correctOptionIndex: 0,
      explanation: 'Kupon payung ada 30 lembar, paling banyak di antara semua hadiah.'
    },
    {
      questionText: 'Pada undian doorprize tersebut, kejadian "mendapatkan hadiah televisi" adalah kejadian yang...',
      image: '',
      points: 50,
      options: ['Tidak mungkin', 'Pasti', 'Mungkin'],
      correctOptionIndex: 0,
      explanation: 'Tidak mungkin karena kupon televisi tidak ada di dalam kotak (0 kupon).'
    }
  ],
  '6-5': [
    {
      questionText: 'Berapakah hasil dari 20 + 6 x 3?',
      image: '',
      points: 50,
      options: ['38', '78', '29'],
      correctOptionIndex: 0,
      explanation: 'Kalikan terlebih dahulu: 6 x 3 = 18. Lalu 20 + 18 = 38.'
    },
    {
      questionText: 'Uang kas Rp150.000 dan belanja Rp94.000. Berapakah sisa uang kas?',
      image: '',
      points: 50,
      options: ['Rp56.000', 'Rp46.000', 'Rp66.000'],
      correctOptionIndex: 0,
      explanation: '150.000 - 94.000 = 56.000 rupiah sisa uang kas.'
    }
  ],
  '6-6': [
    {
      questionText: 'Diameter bibir sumur 70 cm. Berapakah panjang jari-jarinya?',
      image: '',
      points: 50,
      options: ['35 cm', '70 cm', '140 cm'],
      correctOptionIndex: 0,
      explanation: 'Jari-jari = diameter : 2 = 70 : 2 = 35 cm.'
    },
    {
      questionText: 'Keliling lingkaran berdiameter 70 cm (menggunakan π = 22/7) adalah...',
      image: '',
      points: 50,
      options: ['220 cm', '110 cm', '440 cm'],
      correctOptionIndex: 0,
      explanation: 'Keliling = (22/7) x 70 = 22 x 10 = 220 cm.'
    }
  ],
  '6-7': [
    {
      questionText: 'Data tinggi tanaman: 8, 10, 7, 10, 12, 9, 10, 6. Nilai modusnya adalah...',
      image: '',
      points: 50,
      options: ['10 cm', '8 cm', '12 cm'],
      correctOptionIndex: 0,
      explanation: 'Nilai 10 muncul paling sering, yaitu sebanyak 3 kali.'
    },
    {
      questionText: 'Tanaman dekat jendela tingginya 12 cm, di pojok gelap 6 cm. Kesimpulan yang sesuai percobaan adalah...',
      image: '',
      points: 50,
      options: ['"Tanaman yang terkena cahaya matahari tumbuh paling tinggi."', '"Kacang hijau tidak butuh air."', '"Semua tanaman tumbuh sama tinggi."'],
      correctOptionIndex: 0,
      explanation: 'Tanaman di dekat jendela mendapatkan cahaya matahari paling banyak dan tumbuh paling tinggi (12 cm).'
    }
  ],
  '6-8': [
    {
      questionText: 'Peta berskala 1 : 10.000. Jarak di peta 5 cm. Berapa jarak sebenarnya dalam meter?',
      image: '',
      points: 50,
      options: ['500 m', '50 m', '5 km'],
      correctOptionIndex: 0,
      explanation: '5 cm x 10.000 = 50.000 cm = 500 meter.'
    },
    {
      questionText: 'Keterangan peta yang berupa FAKTA adalah...',
      image: '',
      points: 50,
      options: ['"Sekolah berjarak 500 m dari balai desa."', '"Pantai desa paling indah sedunia."', '"Jalan ke sekolah pasti sepi."'],
      correctOptionIndex: 0,
      explanation: 'Jarak 500 m dapat dibuktikan dengan menghitung skala peta secara nyata.'
    }
  ]
};

// Update each chapter with official quiz questions
materiList.forEach((m, idx) => {
  const kelasNum = Math.floor(idx / 8) + 1;
  const babNum = (idx % 8) + 1;
  const key = `${kelasNum}-${babNum}`;
  
  const rawQuestions = OFFICIAL_QUIZZES[key];
  if (!rawQuestions) {
    console.warn(`No quiz found for key ${key}`);
    return;
  }
  
  m.quiz = {
    title: `Kuis Pemahaman: ${m.title}`,
    questions: rawQuestions.map((q, qIdx) => ({
      id: `q-k${kelasNum}b${babNum}-${qIdx + 1}`,
      questionText: q.questionText,
      image: q.image || '',
      points: q.points || 50,
      options: q.options,
      correctOptionIndex: q.correctOptionIndex,
      explanation: q.explanation
    }))
  };
  m.assessment = m.quiz;
});

const outJs = `/**
 * Dataset Seluruh Materi PRISMA Kelas 1 s/d 6 SD (Terstruktur)
 * Berisi 48 Modul Pembelajaran Interaktif (8 Bab per Kelas).
 * Sesuai PRISMA Design System: 100% Gratis, Ramah Anak, dan Sistem 3 Tab.
 */

export const allStructuredMateri = ${JSON.stringify(materiList, null, 2)};
`;

fs.writeFileSync(materiFilePath, outJs, 'utf8');
console.log(`Successfully updated all 48 chapters in ${materiFilePath} with 96 official questions!`);
