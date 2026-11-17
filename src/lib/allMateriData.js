/**
 * Dataset Seluruh Materi PRISMA Kelas 1 s/d 6 SD (Terstruktur)
 * Berisi 48 Modul Pembelajaran Interaktif (8 Bab per Kelas).
 * Sesuai PRISMA Design System: 100% Gratis, Ramah Anak, dan Sistem 3 Tab.
 */

export const allStructuredMateri = [
  {
    "id": "materi-k1-b1",
    "title": "Panen Tomat di Kebun Nenek",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar membaca kata dan kalimat sederhana melalui cerita Sari yang memetik tomat bersama Nenek, sekaligus belajar membilang benda sampai 20 dan menjumlahkan dengan benda konkret.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Ini Sari.  \nSari pergi ke kebun Nenek.  \nDi kebun ada tomat merah.  \nSari memetik 5 tomat.  \nNenek memetik 4 tomat.  \nSemua tomat ditaruh di keranjang.  \nAyo hitung! Ada berapa tomat di keranjang?",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b1-1",
          "title": "* Menjumlahkan artinya",
          "desc": "* Menjumlahkan artinya menggabungkan (5 + 4 = 9 tomat, dihitung lanjut dari 5: 6, 7, 8, 9)."
        },
        {
          "id": "lp-k1b1-2",
          "title": "Tanda \"=\" artinya",
          "desc": "Tanda \"=\" artinya \"sama dengan\", yaitu banyak benda di kiri sama dengan banyak benda di kanan."
        },
        {
          "id": "lp-k1b1-3",
          "title": "Mengenal bilangan 11 sampai 20",
          "desc": "bilangan belasan adalah 10 dan beberapa lagi (contoh: 13 = 10 + 3)."
        },
        {
          "id": "lp-k1b1-4",
          "title": "Strategi penjumlahan meliputi",
          "desc": "Strategi penjumlahan meliputi hitung semua dari 1, hitung lanjut dari bilangan yang lebih besar, membuat 10 (8 + 6 = 8 + 2 + 4 = 14), dan sifat tukar (5 + 4 = 4 + 5 = 9)."
        },
        {
          "id": "lp-k1b1-5",
          "title": "Membaca kata sederhana",
          "desc": "Membaca kata sederhana dilakukan dengan memecah kata menjadi suku kata lalu menggabungkannya (to-mat menjadi tomat, ke-bun menjadi kebun)."
        },
        {
          "id": "lp-k1b1-6",
          "title": "Contoh soal cerita",
          "desc": "Budi punya 7 kelereng, Kakak memberi 3 kelereng lagi. Mulai dari 7, hitung lanjut 3 kali (8, 9, 10), sehingga 7 + 3 = 10 kelereng."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Panen Tomat di Kebun Nenek",
      "questions": [
        {
          "id": "q-k1b1-1",
          "questionText": "Sari memetik 5 tomat dan Nenek memetik 4 tomat. Berapa jumlah seluruh tomat di dalam keranjang?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "7 tomat",
            "8 tomat",
            "9 tomat",
            "10 tomat"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! 5 tomat ditambah 4 tomat sama dengan 9 tomat (5 + 4 = 9)."
        },
        {
          "id": "q-k1b1-2",
          "questionText": "Kata \"tomat\" jika dipenggal menurut suku katanya menjadi...",
          "image": "",
          "points": 50,
          "options": [
            "to - mat",
            "tom - at",
            "t - omat",
            "toma - t"
          ],
          "correctOptionIndex": 0,
          "explanation": "Pintar sekali! Kata \"tomat\" terdiri dari dua suku kata: to-mat."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b1-1",
        "title": "* Menjumlahkan artinya",
        "desc": "* Menjumlahkan artinya menggabungkan (5 + 4 = 9 tomat, dihitung lanjut dari 5: 6, 7, 8, 9)."
      },
      {
        "id": "lp-k1b1-2",
        "title": "Tanda \"=\" artinya",
        "desc": "Tanda \"=\" artinya \"sama dengan\", yaitu banyak benda di kiri sama dengan banyak benda di kanan."
      },
      {
        "id": "lp-k1b1-3",
        "title": "Mengenal bilangan 11 sampai 20",
        "desc": "bilangan belasan adalah 10 dan beberapa lagi (contoh: 13 = 10 + 3)."
      },
      {
        "id": "lp-k1b1-4",
        "title": "Strategi penjumlahan meliputi",
        "desc": "Strategi penjumlahan meliputi hitung semua dari 1, hitung lanjut dari bilangan yang lebih besar, membuat 10 (8 + 6 = 8 + 2 + 4 = 14), dan sifat tukar (5 + 4 = 4 + 5 = 9)."
      },
      {
        "id": "lp-k1b1-5",
        "title": "Membaca kata sederhana",
        "desc": "Membaca kata sederhana dilakukan dengan memecah kata menjadi suku kata lalu menggabungkannya (to-mat menjadi tomat, ke-bun menjadi kebun)."
      },
      {
        "id": "lp-k1b1-6",
        "title": "Contoh soal cerita",
        "desc": "Budi punya 7 kelereng, Kakak memberi 3 kelereng lagi. Mulai dari 7, hitung lanjut 3 kali (8, 9, 10), sehingga 7 + 3 = 10 kelereng."
      }
    ],
    "created_at": "2026-11-15T06:02:10.441Z"
  },
  {
    "id": "materi-k1-b2",
    "title": "Kue untuk Bu Tini",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Melatih kemampuan menyimak percakapan antara Ibu dan Dimas serta belajar mengurangi bilangan sampai 20 dengan benda konkret.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Ibu: \"Dimas, tolong ambil kue di meja, ya.\"  \nDimas: \"Baik, Bu. Ada berapa kuenya?\"  \nIbu: \"Ada 12 kue. Berikan 5 kue untuk Bu Tini.\"  \nDimas: \"Sudah, Bu. Kuenya tinggal sedikit.\"  \nIbu: \"Terima kasih, Dimas. Kamu anak yang baik.\"",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b2-1",
          "title": "* Mengurangi artinya",
          "desc": "* Mengurangi artinya mengambil atau memberikan sebagian (12 - 5 = 7 kue, dihitung mundur dari 12: 11, 10, 9, 8, 7)."
        },
        {
          "id": "lp-k1b2-2",
          "title": "Kata kunci pengurangan",
          "desc": "Kata kunci pengurangan dalam cerita: diberikan, dimakan, meletus, tersisa, tinggal."
        },
        {
          "id": "lp-k1b2-3",
          "title": "Strategi pengurangan meliputi",
          "desc": "Strategi pengurangan meliputi hitung mundur (mulai dari satu angka di bawah bilangan awal), turun ke 10 (14 - 6 = 14 - 4 - 2 = 8), dan mengecek dengan penjumlahan (7 + 5 = 12)."
        },
        {
          "id": "lp-k1b2-4",
          "title": "Menyimak percakapan memerlukan",
          "desc": "Menyimak percakapan memerlukan perhatian pada siapa yang berbicara, apa yang diminta, dan angka yang disebut."
        },
        {
          "id": "lp-k1b2-5",
          "title": "Contoh soal cerita",
          "desc": "Ada 15 balon di pesta, 6 balon meletus. 15 - 5 = 10, lalu dikurangi 1 lagi menjadi 9 balon tersisa."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Pengurangan & Hitung Mundur",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Simulasi Berbagi Benda Ceria",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kue untuk Bu Tini",
      "questions": [
        {
          "id": "q-k1b2-1",
          "questionText": "Ada 12 kue di meja, lalu Dimas memberikan 5 kue untuk Bu Tini. Berapa sisa kue di meja sekarang?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "5 kue",
            "6 kue",
            "7 kue",
            "8 kue"
          ],
          "correctOptionIndex": 2,
          "explanation": "Luar biasa! 12 dikurangi 5 hasilnya adalah 7 kue tersisa (12 - 5 = 7)."
        },
        {
          "id": "q-k1b2-2",
          "questionText": "Ketika Ibu meminta tolong kepada Dimas, kalimat apa yang diucapkan Ibu setelah Dimas membantu?",
          "image": "",
          "points": 50,
          "options": [
            "\"Pergilah, Dimas.\"",
            "\"Terima kasih, Dimas.\"",
            "\"Jangan lupa makan.\"",
            "\"Ambil lagi kuenya.\""
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! Mengucapkan terima kasih adalah sikap santun saat dibantu orang lain."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b2-1",
        "title": "* Mengurangi artinya",
        "desc": "* Mengurangi artinya mengambil atau memberikan sebagian (12 - 5 = 7 kue, dihitung mundur dari 12: 11, 10, 9, 8, 7)."
      },
      {
        "id": "lp-k1b2-2",
        "title": "Kata kunci pengurangan",
        "desc": "Kata kunci pengurangan dalam cerita: diberikan, dimakan, meletus, tersisa, tinggal."
      },
      {
        "id": "lp-k1b2-3",
        "title": "Strategi pengurangan meliputi",
        "desc": "Strategi pengurangan meliputi hitung mundur (mulai dari satu angka di bawah bilangan awal), turun ke 10 (14 - 6 = 14 - 4 - 2 = 8), dan mengecek dengan penjumlahan (7 + 5 = 12)."
      },
      {
        "id": "lp-k1b2-4",
        "title": "Menyimak percakapan memerlukan",
        "desc": "Menyimak percakapan memerlukan perhatian pada siapa yang berbicara, apa yang diminta, dan angka yang disebut."
      },
      {
        "id": "lp-k1b2-5",
        "title": "Contoh soal cerita",
        "desc": "Ada 15 balon di pesta, 6 balon meletus. 15 - 5 = 10, lalu dikurangi 1 lagi menjadi 9 balon tersisa."
      }
    ],
    "created_at": "2026-11-15T07:02:10.442Z"
  },
  {
    "id": "materi-k1-b3",
    "title": "Kamar Rapi Rina",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menceritakan isi gambar dengan kalimat sederhana serta mengenal bangun datar (segitiga, segi empat, lingkaran) dan posisi benda (atas, bawah, kiri, kanan).",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Ini kamar Rina.  \nJendela kamar berbentuk persegi.  \nJam dinding berbentuk lingkaran.  \nJam ada di atas pintu.  \nBantal ada di atas kasur.  \nSandal ada di bawah kasur.  \nMeja belajar ada di sebelah kiri kasur.  \nLemari ada di sebelah kanan kasur.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b3-1",
          "title": "* Ciri bangun",
          "desc": "* Ciri bangun datar: Segitiga (3 sisi lurus, 3 sudut), Persegi (4 sisi sama panjang, 4 sudut), Persegi panjang (4 sisi, sisi berhadapan sama panjang), Lingkaran (tepi melengkung, tanpa sudut)."
        },
        {
          "id": "lp-k1b3-2",
          "title": "Bangun dapat disusun",
          "desc": "Bangun dapat disusun atau diurai (kertas persegi digunting diagonal menjadi 2 segitiga)."
        },
        {
          "id": "lp-k1b3-3",
          "title": "Posisi menunjukkan letak benda",
          "desc": "atas (ke arah langit-langit), bawah (ke arah lantai), kiri dan kanan (bergantung arah hadap), depan dan belakang."
        },
        {
          "id": "lp-k1b3-4",
          "title": "Menceritakan gambar menggunakan",
          "desc": "Menceritakan gambar menggunakan pola kalimat: \"[Benda] ada di [posisi] [benda lain].\""
        },
        {
          "id": "lp-k1b3-5",
          "title": "Contoh soal cerita",
          "desc": "Atap rumah Rina memiliki 3 sisi, sehingga berbentuk segitiga."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengenal Segitiga, Segi Empat, dan Lingkaran",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Berkreasi Menyusun Pola dan Bentuk",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kamar Rapi Rina",
      "questions": [
        {
          "id": "q-k1b3-1",
          "questionText": "Berdasarkan cerita kamar Rina, apa bentuk bangun datar jam dinding yang ada di atas pintu?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "Segitiga",
            "Persegi",
            "Persegi panjang",
            "Lingkaran"
          ],
          "correctOptionIndex": 3,
          "explanation": "Bagus sekali! Jam dinding di kamar Rina berbentuk lingkaran tanpa sudut."
        },
        {
          "id": "q-k1b3-2",
          "questionText": "Di manakah letak bantal di kamar Rina?",
          "image": "",
          "points": 50,
          "options": [
            "Di bawah kasur",
            "Di atas kasur",
            "Di dalam lemari",
            "Di atas meja belajar"
          ],
          "correctOptionIndex": 1,
          "explanation": "Benar! Bantal berada di atas kasur Rina."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b3-1",
        "title": "* Ciri bangun",
        "desc": "* Ciri bangun datar: Segitiga (3 sisi lurus, 3 sudut), Persegi (4 sisi sama panjang, 4 sudut), Persegi panjang (4 sisi, sisi berhadapan sama panjang), Lingkaran (tepi melengkung, tanpa sudut)."
      },
      {
        "id": "lp-k1b3-2",
        "title": "Bangun dapat disusun",
        "desc": "Bangun dapat disusun atau diurai (kertas persegi digunting diagonal menjadi 2 segitiga)."
      },
      {
        "id": "lp-k1b3-3",
        "title": "Posisi menunjukkan letak benda",
        "desc": "atas (ke arah langit-langit), bawah (ke arah lantai), kiri dan kanan (bergantung arah hadap), depan dan belakang."
      },
      {
        "id": "lp-k1b3-4",
        "title": "Menceritakan gambar menggunakan",
        "desc": "Menceritakan gambar menggunakan pola kalimat: \"[Benda] ada di [posisi] [benda lain].\""
      },
      {
        "id": "lp-k1b3-5",
        "title": "Contoh soal cerita",
        "desc": "Atap rumah Rina memiliki 3 sisi, sehingga berbentuk segitiga."
      }
    ],
    "created_at": "2026-11-15T08:02:10.442Z"
  },
  {
    "id": "materi-k1-b4",
    "title": "Telur di Kandang Ayam",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Mengenal huruf vokal dan membaca suku kata melalui cerita Edo membantu Kakek mengambil telur, serta membandingkan banyak benda dan mengurutkan bilangan sampai 20\\.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pagi ini Edo membantu Kakek.  \nMereka mengambil telur di kandang ayam.  \nDi kandang kiri ada 9 telur.  \nDi kandang kanan ada 12 telur.  \n\"Kandang mana yang telurnya lebih banyak?\" tanya Kakek.  \nEdo menghitung dengan teliti.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b4-1",
          "title": "* Membandingkan banyak",
          "desc": "* Membandingkan banyak benda dapat dilakukan dengan memasangkan satu per satu (kelompok yang bersisa lebih banyak) atau memakai urutan bilangan (12 > 9, selisihnya 12 - 9 = 3)."
        },
        {
          "id": "lp-k1b4-2",
          "title": "Kata pembanding",
          "desc": "lebih banyak, lebih sedikit, sama banyak."
        },
        {
          "id": "lp-k1b4-3",
          "title": "Huruf vokal terdiri",
          "desc": "Huruf vokal terdiri dari a, i, u, e, o. Setiap suku kata memiliki satu bunyi vokal (te-lur, kan-dang, a-yam)."
        },
        {
          "id": "lp-k1b4-4",
          "title": "Contoh soal cerita",
          "desc": "Rina punya 15 kelereng dan Doni punya 18 kelereng. Kelereng Rina lebih sedikit (15 < 18) dengan selisih 3 kelereng."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Perkalian sebagai Penjumlahan Berulang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Trik Seru Menghitung Perkalian Cepat",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Telur di Kandang Ayam",
      "questions": [
        {
          "id": "q-k1b4-1",
          "questionText": "Di kandang kiri ada 9 telur dan kandang kanan ada 12 telur. Manakah pernyataan yang benar?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Kandang kiri lebih banyak",
            "Kandang kanan lebih banyak",
            "Kedua kandang sama banyak",
            "Kandang kanan ada 9 telur"
          ],
          "correctOptionIndex": 1,
          "explanation": "Keren! 12 lebih besar dari 9, jadi kandang kanan memiliki telur lebih banyak."
        },
        {
          "id": "q-k1b4-2",
          "questionText": "Manakah di bawah ini yang seluruhnya merupakan huruf vokal?",
          "image": "",
          "points": 50,
          "options": [
            "b, c, d, f, g",
            "a, i, u, e, o",
            "k, l, m, n, p",
            "s, t, w, y, z"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! Huruf vokal dalam bahasa Indonesia adalah a, i, u, e, dan o."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b4-1",
        "title": "* Membandingkan banyak",
        "desc": "* Membandingkan banyak benda dapat dilakukan dengan memasangkan satu per satu (kelompok yang bersisa lebih banyak) atau memakai urutan bilangan (12 > 9, selisihnya 12 - 9 = 3)."
      },
      {
        "id": "lp-k1b4-2",
        "title": "Kata pembanding",
        "desc": "lebih banyak, lebih sedikit, sama banyak."
      },
      {
        "id": "lp-k1b4-3",
        "title": "Huruf vokal terdiri",
        "desc": "Huruf vokal terdiri dari a, i, u, e, o. Setiap suku kata memiliki satu bunyi vokal (te-lur, kan-dang, a-yam)."
      },
      {
        "id": "lp-k1b4-4",
        "title": "Contoh soal cerita",
        "desc": "Rina punya 15 kelereng dan Doni punya 18 kelereng. Kelereng Rina lebih sedikit (15 < 18) dengan selisih 3 kelereng."
      }
    ],
    "created_at": "2026-11-15T09:02:10.442Z"
  },
  {
    "id": "materi-k1-b5",
    "title": "Pola Gelang Manik-Manik",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar mengikuti petunjuk tertulis sederhana dalam membuat gelang serta mengenali, meniru, dan melanjutkan pola berulang (warna, bentuk, dan bilangan).",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Dina membuat gelang untuk Ibu.  \nIa memakai manik merah dan manik kuning.  \nPetunjuknya begini:  \nPasang satu manik merah.  \nPasang dua manik kuning.  \nUlangi lagi dari awal.  \nGelangnya menjadi: merah, kuning, kuning, merah, kuning, kuning, ...",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b5-1",
          "title": "* Pola berulang",
          "desc": "* Pola berulang adalah susunan yang terus berulang dengan urutan sama. Bagian terpendek yang berulang disebut inti pola (merah, kuning, kuning)."
        },
        {
          "id": "lp-k1b5-2",
          "title": "Untuk melanjutkan pola,",
          "desc": "Untuk melanjutkan pola, temukan inti polanya lalu lihat posisi terakhir di dalam inti pola tersebut."
        },
        {
          "id": "lp-k1b5-3",
          "title": "Pola juga berlaku",
          "desc": "Pola juga berlaku pada bentuk, bunyi, dan bilangan (contoh: 2, 4, 6, 8 bertambah 2; 10, 9, 8, 7 berkurang 1)."
        },
        {
          "id": "lp-k1b5-4",
          "title": "Mengikuti petunjuk tertulis",
          "desc": "Mengikuti petunjuk tertulis dilakukan dengan membaca satu per satu secara berurutan lalu memeriksa hasilnya."
        },
        {
          "id": "lp-k1b5-5",
          "title": "Contoh soal cerita",
          "desc": "Pola bintang, bulan, bintang, bulan, bintang, ... memiliki inti pola (bintang, bulan), sehingga gambar berikutnya adalah bulan."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Pola Gelang Manik-Manik",
      "questions": [
        {
          "id": "q-k1b5-1",
          "questionText": "Dina membuat gelang dengan pola: merah, kuning, kuning, merah, kuning, kuning, ... Manik apakah yang dipasang berikutnya?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "Manik hijau",
            "Manik merah",
            "Manik kuning",
            "Manik biru"
          ],
          "correctOptionIndex": 1,
          "explanation": "Wah teliti sekali! Setelah dua manik kuning, pola berulang kembali ke manik merah."
        },
        {
          "id": "q-k1b5-2",
          "questionText": "Pada barisan bilangan 2, 4, 6, 8, ... berapakah bilangan berikutnya dengan pola bertambah 2?",
          "image": "",
          "points": 50,
          "options": [
            "9",
            "10",
            "11",
            "12"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Pola bertambah 2: 8 + 2 = 10."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b5-1",
        "title": "* Pola berulang",
        "desc": "* Pola berulang adalah susunan yang terus berulang dengan urutan sama. Bagian terpendek yang berulang disebut inti pola (merah, kuning, kuning)."
      },
      {
        "id": "lp-k1b5-2",
        "title": "Untuk melanjutkan pola,",
        "desc": "Untuk melanjutkan pola, temukan inti polanya lalu lihat posisi terakhir di dalam inti pola tersebut."
      },
      {
        "id": "lp-k1b5-3",
        "title": "Pola juga berlaku",
        "desc": "Pola juga berlaku pada bentuk, bunyi, dan bilangan (contoh: 2, 4, 6, 8 bertambah 2; 10, 9, 8, 7 berkurang 1)."
      },
      {
        "id": "lp-k1b5-4",
        "title": "Mengikuti petunjuk tertulis",
        "desc": "Mengikuti petunjuk tertulis dilakukan dengan membaca satu per satu secara berurutan lalu memeriksa hasilnya."
      },
      {
        "id": "lp-k1b5-5",
        "title": "Contoh soal cerita",
        "desc": "Pola bintang, bulan, bintang, bulan, bintang, ... memiliki inti pola (bintang, bulan), sehingga gambar berikutnya adalah bulan."
      }
    ],
    "created_at": "2026-11-15T10:02:10.442Z"
  },
  {
    "id": "materi-k1-b6",
    "title": "Pita untuk Lomba",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Mengenal kata berlawanan arti (antonim) dan membandingkan panjang, tinggi, serta berat benda secara langsung dalam persiapan lomba sekolah.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Besok ada lomba di sekolah.  \nBu Guru membawa pita merah dan pita biru.  \nPita merah panjang. Pita biru pendek.  \nBu Guru juga membawa dua kotak hadiah.  \nKotak besar ternyata ringan, isinya balon.  \nKotak kecil ternyata berat, isinya kelereng.  \nLala tinggi, Upik rendah.  \nLala membantu menggantung pita di atas pintu.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b6-1",
          "title": "* Membandingkan panjang",
          "desc": "* Membandingkan panjang dilakukan dengan menyejajarkan satu ujung benda."
        },
        {
          "id": "lp-k1b6-2",
          "title": "Membandingkan tinggi dilakukan",
          "desc": "Membandingkan tinggi dilakukan dengan berdiri berdampingan di lantai yang sama."
        },
        {
          "id": "lp-k1b6-3",
          "title": "Membandingkan berat dilakukan",
          "desc": "Membandingkan berat dilakukan dengan mengangkat atau memakai neraca (benda besar belum tentu berat)."
        },
        {
          "id": "lp-k1b6-4",
          "title": "Antonim",
          "desc": "pasangan kata yang artinya berlawanan: panjang-pendek, tinggi-rendah, berat-ringan, besar-kecil."
        },
        {
          "id": "lp-k1b6-5",
          "title": "Contoh soal cerita",
          "desc": "Pensil A lebih panjang dari B, B lebih panjang dari C, maka pensil C paling pendek."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Pita untuk Lomba",
      "questions": [
        {
          "id": "q-k1b6-1",
          "questionText": "Bu Guru membawa pita merah yang panjang dan pita biru yang...",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "Lebar",
            "Pendek",
            "Tinggi",
            "Berat"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat! Lawan kata (antonim) dari kata panjang adalah pendek."
        },
        {
          "id": "q-k1b6-2",
          "questionText": "Kotak kecil di cerita ternyata terasa berat karena berisi...",
          "image": "",
          "points": 50,
          "options": [
            "Balon",
            "Kapas",
            "Kelereng",
            "Pita"
          ],
          "correctOptionIndex": 2,
          "explanation": "Bagus! Benda berukuran kecil bisa terasa berat tergantung isinya, seperti kelereng."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b6-1",
        "title": "* Membandingkan panjang",
        "desc": "* Membandingkan panjang dilakukan dengan menyejajarkan satu ujung benda."
      },
      {
        "id": "lp-k1b6-2",
        "title": "Membandingkan tinggi dilakukan",
        "desc": "Membandingkan tinggi dilakukan dengan berdiri berdampingan di lantai yang sama."
      },
      {
        "id": "lp-k1b6-3",
        "title": "Membandingkan berat dilakukan",
        "desc": "Membandingkan berat dilakukan dengan mengangkat atau memakai neraca (benda besar belum tentu berat)."
      },
      {
        "id": "lp-k1b6-4",
        "title": "Antonim",
        "desc": "pasangan kata yang artinya berlawanan: panjang-pendek, tinggi-rendah, berat-ringan, besar-kecil."
      },
      {
        "id": "lp-k1b6-5",
        "title": "Contoh soal cerita",
        "desc": "Pensil A lebih panjang dari B, B lebih panjang dari C, maka pensil C paling pendek."
      }
    ],
    "created_at": "2026-11-15T11:02:10.442Z"
  },
  {
    "id": "materi-k1-b7",
    "title": "Hari-Hariku",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menceritakan pengalaman secara berurutan menggunakan kata penghubung waktu serta mengenal nama hari, bagian hari, dan lama kegiatan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Namaku Bima. Aku sekolah hari Senin sampai Sabtu.  \nPagi hari, aku mandi lalu sarapan.  \nKemudian aku berangkat ke sekolah.  \nSiang hari, aku pulang dan makan siang.  \nSore hari, aku bermain bola bersama teman.  \nMalam hari, aku belajar lalu tidur.  \nHari Minggu aku libur dan membantu Ibu di kebun.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b7-1",
          "title": "* Satu minggu",
          "desc": "* Satu minggu ada 7 hari: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu (berulang kembali ke Senin)."
        },
        {
          "id": "lp-k1b7-2",
          "title": "Konsep kemarin, hari",
          "desc": "Konsep kemarin, hari ini, dan besok (jika hari ini Rabu, kemarin Selasa, besok Kamis)."
        },
        {
          "id": "lp-k1b7-3",
          "title": "Satu hari dibagi",
          "desc": "Satu hari dibagi menjadi pagi, siang, sore, dan malam."
        },
        {
          "id": "lp-k1b7-4",
          "title": "Membandingkan lama kegiatan",
          "desc": "Membandingkan lama kegiatan menggunakan istilah lebih lama dan lebih sebentar."
        },
        {
          "id": "lp-k1b7-5",
          "title": "Bercerita berurutan menggunakan",
          "desc": "Bercerita berurutan menggunakan kata pertama, lalu, kemudian, dan terakhir."
        },
        {
          "id": "lp-k1b7-6",
          "title": "Contoh soal cerita",
          "desc": "Hari ini Jumat, maka dua hari lagi adalah hari Minggu."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Hari-Hariku",
      "questions": [
        {
          "id": "q-k1b7-1",
          "questionText": "Jika hari ini adalah hari Rabu, hari apakah kemarin?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "Senin",
            "Selasa",
            "Kamis",
            "Jumat"
          ],
          "correctOptionIndex": 1,
          "explanation": "Keren! Sebelum hari Rabu adalah hari Selasa."
        },
        {
          "id": "q-k1b7-2",
          "questionText": "Kegiatan apa yang dilakukan Bima pada sore hari menurut cerita?",
          "image": "",
          "points": 50,
          "options": [
            "Berangkat sekolah",
            "Sarapan pagi",
            "Bermain bola bersama teman",
            "Mandi pagi"
          ],
          "correctOptionIndex": 2,
          "explanation": "Benar! Pada sore hari Bima bermain bola bersama teman-temannya."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b7-1",
        "title": "* Satu minggu",
        "desc": "* Satu minggu ada 7 hari: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu (berulang kembali ke Senin)."
      },
      {
        "id": "lp-k1b7-2",
        "title": "Konsep kemarin, hari",
        "desc": "Konsep kemarin, hari ini, dan besok (jika hari ini Rabu, kemarin Selasa, besok Kamis)."
      },
      {
        "id": "lp-k1b7-3",
        "title": "Satu hari dibagi",
        "desc": "Satu hari dibagi menjadi pagi, siang, sore, dan malam."
      },
      {
        "id": "lp-k1b7-4",
        "title": "Membandingkan lama kegiatan",
        "desc": "Membandingkan lama kegiatan menggunakan istilah lebih lama dan lebih sebentar."
      },
      {
        "id": "lp-k1b7-5",
        "title": "Bercerita berurutan menggunakan",
        "desc": "Bercerita berurutan menggunakan kata pertama, lalu, kemudian, dan terakhir."
      },
      {
        "id": "lp-k1b7-6",
        "title": "Contoh soal cerita",
        "desc": "Hari ini Jumat, maka dua hari lagi adalah hari Minggu."
      }
    ],
    "created_at": "2026-11-15T12:02:10.442Z"
  },
  {
    "id": "materi-k1-b8",
    "title": "Buah Kesukaan Teman Sekelas",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 1 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menyimak pertanyaan dan menjawab dengan kalimat lengkap serta mengelompokkan, membilang, dan menyajikan data dengan turus dan piktogram.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Bu Guru bertanya, \"Apa buah kesukaan kalian?\"  \nSetiap anak menempel gambar buah di papan.  \nAda 5 gambar pisang.  \nAda 3 gambar jeruk.  \nAda 7 gambar mangga.  \nAda 2 gambar semangka.  \n\"Buah apa yang paling disukai?\" tanya Bu Guru.\n\n| Buah | Piktogram (1 lingkaran = 1 anak) | Banyak |\n| :---- | :---- | :---- |\n| Pisang | O O O O O | 5 |\n| Jeruk | O O O | 3 |\n| Mangga | O O O O O O O | 7 |\n| Semangka | O O | 2 |",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k1b8-1",
          "title": "* Data adalah",
          "desc": "* Data adalah kumpulan jawaban atau hasil menghitung yang dikelompokkan menurut jenisnya."
        },
        {
          "id": "lp-k1b8-2",
          "title": "Membilang dengan turus",
          "desc": "setiap anak satu garis, garis kelima melintang mencoret empat garis sebelumnya."
        },
        {
          "id": "lp-k1b8-3",
          "title": "Pada piktogram, satu",
          "desc": "Pada piktogram, satu gambar mewakili satu anak. Baris paling panjang adalah yang paling banyak (mangga = 7), paling pendek adalah paling sedikit (semangka = 2), total seluruhnya 5 + 3 + 7 + 2 = 17 anak."
        },
        {
          "id": "lp-k1b8-4",
          "title": "Menjawab pertanyaan dengan",
          "desc": "Menjawab pertanyaan dengan kalimat lengkap, misalnya: \"Buah yang paling disukai adalah mangga.\""
        },
        {
          "id": "lp-k1b8-5",
          "title": "Contoh soal cerita:",
          "desc": "Contoh soal cerita: Selisih anak yang suka mangga (7) dan pisang (5) adalah 7 - 5 = 2 anak lebih banyak.\n\n# Kelas 2 (Fase A: Penguatan Konsep Dasar)"
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Membaca Piktogram dan Diagram Batang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Menghitung Frekuensi dan Menyajikan Data",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Buah Kesukaan Teman Sekelas",
      "questions": [
        {
          "id": "q-k1b8-1",
          "questionText": "Berdasarkan data piktogram, buah apakah yang paling banyak disukai teman sekelas?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Pisang (5 anak)",
            "Jeruk (3 anak)",
            "Mangga (7 anak)",
            "Semangka (2 anak)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Mangga memiliki 7 gambar lingkaran, paling banyak di antara semua buah."
        },
        {
          "id": "q-k1b8-2",
          "questionText": "Berapa selisih banyaknya anak yang menyukai mangga (7) dan pisang (5)?",
          "image": "",
          "points": 50,
          "options": [
            "1 anak",
            "2 anak",
            "3 anak",
            "4 anak"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! Selisihnya adalah 7 - 5 = 2 anak."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k1b8-1",
        "title": "* Data adalah",
        "desc": "* Data adalah kumpulan jawaban atau hasil menghitung yang dikelompokkan menurut jenisnya."
      },
      {
        "id": "lp-k1b8-2",
        "title": "Membilang dengan turus",
        "desc": "setiap anak satu garis, garis kelima melintang mencoret empat garis sebelumnya."
      },
      {
        "id": "lp-k1b8-3",
        "title": "Pada piktogram, satu",
        "desc": "Pada piktogram, satu gambar mewakili satu anak. Baris paling panjang adalah yang paling banyak (mangga = 7), paling pendek adalah paling sedikit (semangka = 2), total seluruhnya 5 + 3 + 7 + 2 = 17 anak."
      },
      {
        "id": "lp-k1b8-4",
        "title": "Menjawab pertanyaan dengan",
        "desc": "Menjawab pertanyaan dengan kalimat lengkap, misalnya: \"Buah yang paling disukai adalah mangga.\""
      },
      {
        "id": "lp-k1b8-5",
        "title": "Contoh soal cerita:",
        "desc": "Contoh soal cerita: Selisih anak yang suka mangga (7) dan pisang (5) adalah 7 - 5 = 2 anak lebih banyak.\n\n# Kelas 2 (Fase A: Penguatan Konsep Dasar)"
      }
    ],
    "created_at": "2026-11-15T13:02:10.442Z"
  },
  {
    "id": "materi-k2-b1",
    "title": "Sarapan Sehat, Badan Kuat",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Memahami isi bacaan tentang kesehatan serta belajar membaca bilangan sampai 100, menentukan nilai tempat (puluhan dan satuan), dan membandingkan bilangan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Setiap pagi, Bayu sarapan sebelum berangkat sekolah. Ibu memasak nasi, telur, dan sayur bayam. Sarapan membuat badan kuat dan pikiran segar.  \nHari Senin, kelas 2 mengadakan kegiatan makan buah bersama. Bu Guru membawa 45 jeruk dan 32 pisang. Sebelum makan, semua murid mencuci tangan dengan sabun.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b1-1",
          "title": "* Bilangan dua",
          "desc": "* Bilangan dua angka terdiri dari puluhan dan satuan (45 = 4 puluhan + 5 satuan = 40 + 5)."
        },
        {
          "id": "lp-k2b1-2",
          "title": "Nilai tempat menentukan",
          "desc": "Nilai tempat menentukan nilai angka: angka 5 pada 54 bernilai 50, sedangkan pada 45 bernilai 5\\."
        },
        {
          "id": "lp-k2b1-3",
          "title": "Membandingkan bilangan dilakukan",
          "desc": "Membandingkan bilangan dilakukan dengan melihat puluhannya dulu; jika sama, baru bandingkan satuannya (45 > 32)."
        },
        {
          "id": "lp-k2b1-4",
          "title": "Tanda perbandingan",
          "desc": "\">\" (lebih dari), \"<\" (kurang dari), \"=\" (sama dengan)."
        },
        {
          "id": "lp-k2b1-5",
          "title": "Mencari informasi dalam",
          "desc": "Mencari informasi dalam bacaan dilakukan dengan menemukan kata kunci dari pertanyaan di dalam teks."
        },
        {
          "id": "lp-k2b1-6",
          "title": "Contoh soal cerita",
          "desc": "Pohon mangga 68 dan pohon kelapa 86\\. Karena 8 puluhan > 6 puluhan, maka 86 > 68 (pohon kelapa lebih banyak)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Sarapan Sehat, Badan Kuat",
      "questions": [
        {
          "id": "q-k2b1-1",
          "questionText": "Pada bilangan 45 buah jeruk, berapakah nilai tempat angka 4?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "4 satuan (bernilai 4)",
            "4 puluhan (bernilai 40)",
            "4 ratusan (bernilai 400)",
            "4 ribuan (bernilai 4000)"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! Angka 4 berada di tempat puluhan sehingga bernilai 40."
        },
        {
          "id": "q-k2b1-2",
          "questionText": "Bu Guru membawa 45 jeruk dan 32 pisang. Tanda perbandingan yang tepat adalah...",
          "image": "",
          "points": 50,
          "options": [
            "45 < 32",
            "45 > 32",
            "45 = 32",
            "45 + 32"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! 45 lebih dari (>) 32 karena 4 puluhan lebih besar dari 3 puluhan."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b1-1",
        "title": "* Bilangan dua",
        "desc": "* Bilangan dua angka terdiri dari puluhan dan satuan (45 = 4 puluhan + 5 satuan = 40 + 5)."
      },
      {
        "id": "lp-k2b1-2",
        "title": "Nilai tempat menentukan",
        "desc": "Nilai tempat menentukan nilai angka: angka 5 pada 54 bernilai 50, sedangkan pada 45 bernilai 5\\."
      },
      {
        "id": "lp-k2b1-3",
        "title": "Membandingkan bilangan dilakukan",
        "desc": "Membandingkan bilangan dilakukan dengan melihat puluhannya dulu; jika sama, baru bandingkan satuannya (45 > 32)."
      },
      {
        "id": "lp-k2b1-4",
        "title": "Tanda perbandingan",
        "desc": "\">\" (lebih dari), \"<\" (kurang dari), \"=\" (sama dengan)."
      },
      {
        "id": "lp-k2b1-5",
        "title": "Mencari informasi dalam",
        "desc": "Mencari informasi dalam bacaan dilakukan dengan menemukan kata kunci dari pertanyaan di dalam teks."
      },
      {
        "id": "lp-k2b1-6",
        "title": "Contoh soal cerita",
        "desc": "Pohon mangga 68 dan pohon kelapa 86\\. Karena 8 puluhan > 6 puluhan, maka 86 > 68 (pohon kelapa lebih banyak)."
      }
    ],
    "created_at": "2026-11-15T14:02:10.442Z"
  },
  {
    "id": "materi-k2-b2",
    "title": "Kue Bolu untuk Berbagi",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar menulis kalimat sederhana dengan huruf kapital dan tanda titik serta memahami pecahan setengah (1/2) dan seperempat (1/4).",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Ibu membuat satu kue bolu bundar. Nisa dan adiknya, Raka, ingin makan kue. Ibu memotong kue menjadi 2 bagian sama besar. Nisa mendapat satu bagian, Raka juga mendapat satu bagian.  \nSore harinya, Ibu membuat satu kue bolu lagi. Kue itu dipotong menjadi 4 bagian sama besar untuk Ayah, Kakek, Nisa, dan Raka. Semua senang karena bisa berbagi.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b2-1",
          "title": "* Setengah (1/2)",
          "desc": "* Setengah (1/2) adalah 1 bagian dari 2 bagian yang sama besar. Seperempat (1/4) adalah 1 bagian dari 4 bagian yang sama besar."
        },
        {
          "id": "lp-k2b2-2",
          "title": "Syarat utama pecahan",
          "desc": "bagian-bagiannya harus sama besar. Bagian 1/4 lebih kecil daripada 1/2 karena dibagi menjadi lebih banyak potongan."
        },
        {
          "id": "lp-k2b2-3",
          "title": "Pecahan dari kumpulan benda",
          "desc": "setengah dari 8 kelereng adalah 4 kelereng; seperempat dari 8 kelereng adalah 2 kelereng."
        },
        {
          "id": "lp-k2b2-4",
          "title": "Menulis kalimat sederhana",
          "desc": "Menulis kalimat sederhana wajib diawali huruf kapital (termasuk nama orang/tempat) dan diakhiri tanda titik."
        },
        {
          "id": "lp-k2b2-5",
          "title": "Contoh soal cerita",
          "desc": "8 kelereng dibagi sama banyak untuk 2 anak menghasilkan 4 kelereng tiap anak (setengah dari 8)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Konsep Pecahan Sederhana",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Praktik Memotong Kue & Berbagi Rata",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kue Bolu untuk Berbagi",
      "questions": [
        {
          "id": "q-k2b2-1",
          "questionText": "Ibu memotong satu kue bolu bundar menjadi 2 bagian sama besar. Setiap bagian bernilai...",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "Satu per tiga (1/3)",
            "Setengah (1/2)",
            "Seperempat (1/4)",
            "Satu utuh (1)"
          ],
          "correctOptionIndex": 1,
          "explanation": "Benar! Satu bagian dari 2 bagian sama besar disebut setengah atau 1/2."
        },
        {
          "id": "q-k2b2-2",
          "questionText": "Ibu memiliki 8 kelereng untuk dibagikan sama banyak kepada 2 anak. Berapa kelereng yang didapat masing-masing anak (setengah dari 8)?",
          "image": "",
          "points": 50,
          "options": [
            "2 kelereng",
            "3 kelereng",
            "4 kelereng",
            "5 kelereng"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! 8 dibagi 2 adalah 4 kelereng untuk setiap anak."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b2-1",
        "title": "* Setengah (1/2)",
        "desc": "* Setengah (1/2) adalah 1 bagian dari 2 bagian yang sama besar. Seperempat (1/4) adalah 1 bagian dari 4 bagian yang sama besar."
      },
      {
        "id": "lp-k2b2-2",
        "title": "Syarat utama pecahan",
        "desc": "bagian-bagiannya harus sama besar. Bagian 1/4 lebih kecil daripada 1/2 karena dibagi menjadi lebih banyak potongan."
      },
      {
        "id": "lp-k2b2-3",
        "title": "Pecahan dari kumpulan benda",
        "desc": "setengah dari 8 kelereng adalah 4 kelereng; seperempat dari 8 kelereng adalah 2 kelereng."
      },
      {
        "id": "lp-k2b2-4",
        "title": "Menulis kalimat sederhana",
        "desc": "Menulis kalimat sederhana wajib diawali huruf kapital (termasuk nama orang/tempat) dan diakhiri tanda titik."
      },
      {
        "id": "lp-k2b2-5",
        "title": "Contoh soal cerita",
        "desc": "8 kelereng dibagi sama banyak untuk 2 anak menghasilkan 4 kelereng tiap anak (setengah dari 8)."
      }
    ],
    "created_at": "2026-11-15T15:02:10.442Z"
  },
  {
    "id": "materi-k2-b3",
    "title": "Siapa yang Lebih Panjang?",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar merespons dan mengajukan pertanyaan dengan santun dalam percakapan serta mengukur panjang dan berat dengan satuan tidak baku.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Bu Ani bertanya, \"Anak-anak, berapa panjang meja ini?\" Dodi mengangkat tangan. \"Boleh saya mengukur, Bu?\" tanyanya. Dodi mengukur meja dengan jengkal tangannya. Panjang meja 6 jengkal Dodi.  \nLalu Lala mengukur meja yang sama. Hasilnya 7 jengkal Lala. \"Maaf, Bu, kenapa hasilnya berbeda?\" tanya Lala dengan sopan. Bu Ani tersenyum. \"Karena panjang jengkal tangan kalian tidak sama.\"",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b3-1",
          "title": "* Satuan tidak",
          "desc": "* Satuan tidak baku menggunakan benda sehari-hari (jengkal, langkah, depa, pensil, klip) yang hasilnya bisa berbeda antarorang."
        },
        {
          "id": "lp-k2b3-2",
          "title": "Cara mengukur",
          "desc": "mulai dari ujung benda, letakkan alat ukur berderet tanpa celah dan tanpa bertumpuk. Makin kecil satuannya, makin banyak hitungannya."
        },
        {
          "id": "lp-k2b3-3",
          "title": "Membandingkan berat dengan neraca",
          "desc": "sisi yang turun lebih berat, sisi yang naik lebih ringan, datar berarti sama berat."
        },
        {
          "id": "lp-k2b3-4",
          "title": "Bertanya dengan santun",
          "desc": "Bertanya dengan santun dilakukan dengan mengangkat tangan, memakai sapaan (Bu/Pak), serta menggunakan kata maaf, tolong, boleh, dan terima kasih."
        },
        {
          "id": "lp-k2b3-5",
          "title": "Contoh soal cerita",
          "desc": "Pensil Ani 5 klip dan pensil Edo 8 klip. Pensil Edo lebih panjang dengan selisih 8 - 5 = 3 klip."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengukur Panjang, Berat & Waktu",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Eksperimen Menimbang dan Membandingkan",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Siapa yang Lebih Panjang?",
      "questions": [
        {
          "id": "q-k2b3-1",
          "questionText": "Mengapa hasil pengukuran panjang meja oleh Dodi (6 jengkal) berbeda dengan Lala (7 jengkal)?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "Mejanya bertambah panjang",
            "Dodi salah menghitung",
            "Panjang jengkal tangan setiap orang berbeda",
            "Penggarisnya patah"
          ],
          "correctOptionIndex": 2,
          "explanation": "Tepat sekali! Jengkal adalah satuan tidak baku, sehingga ukurannya berbeda antarorang."
        },
        {
          "id": "q-k2b3-2",
          "questionText": "Pensil Ani panjangnya 5 klip kertas, sedangkan pensil Edo panjangnya 8 klip kertas. Berapa selisih panjang pensil mereka?",
          "image": "",
          "points": 50,
          "options": [
            "2 klip",
            "3 klip",
            "4 klip",
            "13 klip"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Selisihnya adalah 8 - 5 = 3 klip kertas."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b3-1",
        "title": "* Satuan tidak",
        "desc": "* Satuan tidak baku menggunakan benda sehari-hari (jengkal, langkah, depa, pensil, klip) yang hasilnya bisa berbeda antarorang."
      },
      {
        "id": "lp-k2b3-2",
        "title": "Cara mengukur",
        "desc": "mulai dari ujung benda, letakkan alat ukur berderet tanpa celah dan tanpa bertumpuk. Makin kecil satuannya, makin banyak hitungannya."
      },
      {
        "id": "lp-k2b3-3",
        "title": "Membandingkan berat dengan neraca",
        "desc": "sisi yang turun lebih berat, sisi yang naik lebih ringan, datar berarti sama berat."
      },
      {
        "id": "lp-k2b3-4",
        "title": "Bertanya dengan santun",
        "desc": "Bertanya dengan santun dilakukan dengan mengangkat tangan, memakai sapaan (Bu/Pak), serta menggunakan kata maaf, tolong, boleh, dan terima kasih."
      },
      {
        "id": "lp-k2b3-5",
        "title": "Contoh soal cerita",
        "desc": "Pensil Ani 5 klip dan pensil Edo 8 klip. Pensil Edo lebih panjang dengan selisih 8 - 5 = 3 klip."
      }
    ],
    "created_at": "2026-11-15T16:02:10.443Z"
  },
  {
    "id": "materi-k2-b4",
    "title": "Lompat Katak di Pematang Sawah",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Melatih membaca nyaring teks pendek dengan lafal dan intonasi yang tepat serta mengenali dan melanjutkan pola bilangan lompat 2, 5, dan 10 sampai 100\\.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Sore itu, Tegar dan Sinta bermain di pematang sawah. \"Lihat, ada katak!\" seru Sinta. Katak hijau melompat dari batu ke batu. Batu-batu itu sudah diberi nomor oleh Tegar.  \nKatak mulai dari batu nomor 0, lalu melompat ke batu 2, 4, 6, dan 8\\. \"Wah, katak itu selalu melewati satu batu!\" kata Tegar sambil tertawa. \"Ke batu nomor berapa ia melompat berikutnya?\" tanya Sinta.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b4-1",
          "title": "* Pola bilangan",
          "desc": "* Pola bilangan adalah deretan bilangan dengan aturan tetap (selisih antarbilangan berurutan sama)."
        },
        {
          "id": "lp-k2b4-2",
          "title": "Pola lompat 2",
          "desc": "Pola lompat 2 menghasilkan bilangan genap (0, 2, 4, 6, ...) atau ganjil (1, 3, 5, 7, ...). Pola juga bisa lompat 5, lompat 10, maupun pola mundur (50, 45, 40, 35)."
        },
        {
          "id": "lp-k2b4-3",
          "title": "Membaca nyaring memerlukan",
          "desc": "Membaca nyaring memerlukan lafal yang jelas, jeda pada koma/titik, serta intonasi yang sesuai (nada bersemangat untuk tanda seru, nada naik di akhir untuk tanda tanya)."
        },
        {
          "id": "lp-k2b4-4",
          "title": "Contoh soal cerita",
          "desc": "Pola 15, 25, 35, ... bertambah 10 setiap langkah, sehingga dua bilangan berikutnya adalah 45 dan 55\\."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Lompat Katak di Pematang Sawah",
      "questions": [
        {
          "id": "q-k2b4-1",
          "questionText": "Katak melompat dengan pola bilangan genap: 0, 2, 4, 6, 8, ... Ke batu nomor berapakah katak melompat berikutnya?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "9",
            "10",
            "11",
            "12"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! Pola lompat 2: setelah 8 adalah 8 + 2 = 10."
        },
        {
          "id": "q-k2b4-2",
          "questionText": "Pada barisan bilangan lompat lima: 15, 20, 25, ... bilangan selanjutnya adalah...",
          "image": "",
          "points": 50,
          "options": [
            "26",
            "28",
            "30",
            "35"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! 25 ditambah 5 hasilnya 30."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b4-1",
        "title": "* Pola bilangan",
        "desc": "* Pola bilangan adalah deretan bilangan dengan aturan tetap (selisih antarbilangan berurutan sama)."
      },
      {
        "id": "lp-k2b4-2",
        "title": "Pola lompat 2",
        "desc": "Pola lompat 2 menghasilkan bilangan genap (0, 2, 4, 6, ...) atau ganjil (1, 3, 5, 7, ...). Pola juga bisa lompat 5, lompat 10, maupun pola mundur (50, 45, 40, 35)."
      },
      {
        "id": "lp-k2b4-3",
        "title": "Membaca nyaring memerlukan",
        "desc": "Membaca nyaring memerlukan lafal yang jelas, jeda pada koma/titik, serta intonasi yang sesuai (nada bersemangat untuk tanda seru, nada naik di akhir untuk tanda tanya)."
      },
      {
        "id": "lp-k2b4-4",
        "title": "Contoh soal cerita",
        "desc": "Pola 15, 25, 35, ... bertambah 10 setiap langkah, sehingga dua bilangan berikutnya adalah 45 dan 55\\."
      }
    ],
    "created_at": "2026-11-15T17:02:10.443Z"
  },
  {
    "id": "materi-k2-b5",
    "title": "Timbangan Kelereng",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Memahami dan mengikuti instruksi tertulis dalam permainan serta memahami makna tanda \"=\" sebagai keseimbangan nilai dan mencari bilangan yang belum diketahui.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kak Rani membuat permainan timbangan. Semua kelereng sama beratnya. Aturan permainan ditulis di papan:\n\n1. Taruh kelereng di piring kiri dan piring kanan.  \n2. Timbangan harus seimbang.  \n3. Jika timbangan miring, tambah kelereng di piring yang lebih ringan.  \n   Di piring kiri ada 8 kelereng merah dan 5 kelereng biru. Di piring kanan ada 10 kelereng hijau. Timbangan miring ke kiri. \"Berapa kelereng lagi yang harus ditambah di kanan?\" tanya Kak Rani.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b5-1",
          "title": "* Tanda \"=\"",
          "desc": "* Tanda \"=\" berarti nilai di kiri sama dengan nilai di kanan (seperti timbangan seimbang), bukan sekadar \"hasilnya adalah\"."
        },
        {
          "id": "lp-k2b5-2",
          "title": "Cara mencari bilangan yang hilang",
          "desc": "hitung sisi yang lengkap dulu, lalu cari bilangan yang membuat sisi lainnya bernilai sama (8 + 5 = 10 + 3, kedua sisi bernilai 13)."
        },
        {
          "id": "lp-k2b5-3",
          "title": "Mengikuti instruksi tertulis",
          "desc": "Mengikuti instruksi tertulis dilakukan dengan membaca semua langkah secara berurutan lalu memeriksa hasilnya."
        },
        {
          "id": "lp-k2b5-4",
          "title": "Contoh soal cerita",
          "desc": "Pada 7 + 7 = [kotak] + 10, sisi kiri bernilai 14, sehingga nilai kotak adalah 4 agar sisi kanan juga 14\\."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengukur Panjang, Berat & Waktu",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Eksperimen Menimbang dan Membandingkan",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Timbangan Kelereng",
      "questions": [
        {
          "id": "q-k2b5-1",
          "questionText": "Di piring kiri ada 8 kelereng merah dan 5 kelereng biru (total 13). Di piring kanan baru ada 10 kelereng. Berapa kelereng lagi yang harus ditambah agar seimbang?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "2 kelereng",
            "3 kelereng",
            "4 kelereng",
            "5 kelereng"
          ],
          "correctOptionIndex": 1,
          "explanation": "Benar! Sisi kiri 8 + 5 = 13. Agar sisi kanan bernilai 13, tambahkan 13 - 10 = 3 kelereng."
        },
        {
          "id": "q-k2b5-2",
          "questionText": "Arti tanda sama dengan (=) dalam matematika adalah...",
          "image": "",
          "points": 50,
          "options": [
            "Sisi kiri harus lebih besar",
            "Sisi kanan selalu nol",
            "Nilai di sebelah kiri sama nilainya dengan di sebelah kanan",
            "Operasi pengurangan"
          ],
          "correctOptionIndex": 2,
          "explanation": "Tepat sekali! Tanda \"=\" menunjukkan keseimbangan atau kesamaan nilai."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b5-1",
        "title": "* Tanda \"=\"",
        "desc": "* Tanda \"=\" berarti nilai di kiri sama dengan nilai di kanan (seperti timbangan seimbang), bukan sekadar \"hasilnya adalah\"."
      },
      {
        "id": "lp-k2b5-2",
        "title": "Cara mencari bilangan yang hilang",
        "desc": "hitung sisi yang lengkap dulu, lalu cari bilangan yang membuat sisi lainnya bernilai sama (8 + 5 = 10 + 3, kedua sisi bernilai 13)."
      },
      {
        "id": "lp-k2b5-3",
        "title": "Mengikuti instruksi tertulis",
        "desc": "Mengikuti instruksi tertulis dilakukan dengan membaca semua langkah secara berurutan lalu memeriksa hasilnya."
      },
      {
        "id": "lp-k2b5-4",
        "title": "Contoh soal cerita",
        "desc": "Pada 7 + 7 = [kotak] + 10, sisi kiri bernilai 14, sehingga nilai kotak adalah 4 agar sisi kanan juga 14\\."
      }
    ],
    "created_at": "2026-11-15T18:02:10.443Z"
  },
  {
    "id": "materi-k2-b6",
    "title": "Tangram Kakek",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar menulis deskripsi singkat tentang bentuk benda serta mengenali ciri bangun datar dan menyusun atau mengurai bangun datar menjadi bangun lain.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kakek membuat mainan dari kayu untuk Sari. Mainan itu bernama tangram. Tangram terdiri dari tujuh keping: lima segitiga, satu persegi, dan satu jajargenjang (segi empat yang miring).  \nSari menyusun keping-keping itu menjadi bentuk rumah, perahu, dan kucing. \"Hebat! Dari keping yang sama bisa jadi banyak bentuk,\" kata Kakek. Malam harinya, Sari menulis tentang mainan barunya di buku harian.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b6-1",
          "title": "* Ciri bangun",
          "desc": "* Ciri bangun datar ditentukan oleh banyak sisi dan sudutnya: segitiga (3 sisi), segi empat (4 sisi), segi lima (5 sisi), segi enam (6 sisi)."
        },
        {
          "id": "lp-k2b6-2",
          "title": "Menyusun dan mengurai bangun",
          "desc": "2 segitiga sama besar dapat membentuk persegi; 2 persegi sama besar dapat membentuk persegi panjang."
        },
        {
          "id": "lp-k2b6-3",
          "title": "Bangun yang diputar",
          "desc": "Bangun yang diputar atau dibalik tetap memiliki nama bangun yang sama karena banyak sisinya tidak berubah."
        },
        {
          "id": "lp-k2b6-4",
          "title": "Menulis deskripsi benda",
          "desc": "Menulis deskripsi benda mencakup nama benda, bentuk, warna, ukuran, bahan, dan kegunaannya."
        },
        {
          "id": "lp-k2b6-5",
          "title": "Contoh soal cerita",
          "desc": "Rumah yang disusun dari satu persegi (badan rumah, 4 sisi sama panjang) dan satu segitiga (atap rumah, 3 sisi)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengenal Segitiga, Segi Empat, dan Lingkaran",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Berkreasi Menyusun Pola dan Bentuk",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Tangram Kakek",
      "questions": [
        {
          "id": "q-k2b6-1",
          "questionText": "Berapa banyak keping yang menyusun permainan tangram tradisional milik Kakek?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "5 keping",
            "6 keping",
            "7 keping",
            "8 keping"
          ],
          "correctOptionIndex": 2,
          "explanation": "Bagus! Tangram terdiri dari 7 keping: 5 segitiga, 1 persegi, dan 1 jajargenjang."
        },
        {
          "id": "q-k2b6-2",
          "questionText": "Jika dua bangun segitiga sama kaki dan sebangun digabungkan pada sisi miringnya, bangun baru apa yang dapat terbentuk?",
          "image": "",
          "points": 50,
          "options": [
            "Persegi",
            "Lingkaran",
            "Segilima",
            "Bintang"
          ],
          "correctOptionIndex": 0,
          "explanation": "Keren! Dua segitiga yang pas dapat disusun membentuk bangun persegi."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b6-1",
        "title": "* Ciri bangun",
        "desc": "* Ciri bangun datar ditentukan oleh banyak sisi dan sudutnya: segitiga (3 sisi), segi empat (4 sisi), segi lima (5 sisi), segi enam (6 sisi)."
      },
      {
        "id": "lp-k2b6-2",
        "title": "Menyusun dan mengurai bangun",
        "desc": "2 segitiga sama besar dapat membentuk persegi; 2 persegi sama besar dapat membentuk persegi panjang."
      },
      {
        "id": "lp-k2b6-3",
        "title": "Bangun yang diputar",
        "desc": "Bangun yang diputar atau dibalik tetap memiliki nama bangun yang sama karena banyak sisinya tidak berubah."
      },
      {
        "id": "lp-k2b6-4",
        "title": "Menulis deskripsi benda",
        "desc": "Menulis deskripsi benda mencakup nama benda, bentuk, warna, ukuran, bahan, dan kegunaannya."
      },
      {
        "id": "lp-k2b6-5",
        "title": "Contoh soal cerita",
        "desc": "Rumah yang disusun dari satu persegi (badan rumah, 4 sisi sama panjang) dan satu segitiga (atap rumah, 3 sisi)."
      }
    ],
    "created_at": "2026-11-15T19:02:10.443Z"
  },
  {
    "id": "materi-k2-b7",
    "title": "Jam Berapa Sekarang?",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar membaca informasi dari jadwal kegiatan serta membaca jam tepat dan setengah jam dan membandingkan lama kegiatan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Raka menempel jadwal hari Minggu di dinding kamarnya.\n\n| Waktu | Kegiatan |\n| :---- | :---- |\n| 06.00 | Bangun tidur dan mandi |\n| 07.00 | Sarapan bersama keluarga |\n| 08.30 | Kerja bakti di lingkungan RT |\n| 10.00 | Bermain di rumah Doni |\n| 12.00 | Makan siang |\n\nRaka melihat jam dinding. Jarum pendek ada di antara angka 8 dan 9, sedangkan jarum panjang menunjuk angka 6\\. \"Ayo, waktunya kerja bakti!\" ajak Ayah.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b7-1",
          "title": "* Jarum pendek",
          "desc": "* Jarum pendek menunjukkan jam, sedangkan jarum panjang menunjukkan menit."
        },
        {
          "id": "lp-k2b7-2",
          "title": "Jam tepat",
          "desc": "jarum panjang di angka 12 (contoh: 07.00)."
        },
        {
          "id": "lp-k2b7-3",
          "title": "Setengah jam",
          "desc": "jarum panjang di angka 6 dan jarum pendek di antara dua angka (08.30 dibaca \"setengah sembilan\" karena menuju pukul 9)."
        },
        {
          "id": "lp-k2b7-4",
          "title": "Satuan waktu",
          "desc": "1 jam = 60 menit; setengah jam = 30 menit."
        },
        {
          "id": "lp-k2b7-5",
          "title": "Membaca jadwal dilakukan",
          "desc": "Membaca jadwal dilakukan dengan mencari baris jam yang ditanyakan lalu melihat kegiatan di sebelahnya."
        },
        {
          "id": "lp-k2b7-6",
          "title": "Contoh soal cerita",
          "desc": "Dari bangun pukul 06.00 sampai sarapan pukul 07.00 lamanya adalah 1 jam."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengukur Panjang, Berat & Waktu",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Eksperimen Menimbang dan Membandingkan",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Jam Berapa Sekarang?",
      "questions": [
        {
          "id": "q-k2b7-1",
          "questionText": "Pada jam dinding, jika jarum pendek menunjuk di antara angka 8 dan 9, serta jarum panjang menunjuk angka 6, maka menunjukkan pukul...",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "08.00",
            "08.30 (setengah sembilan)",
            "09.30",
            "06.40"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Jarum panjang di angka 6 berarti lewat 30 menit (setengah jam), yaitu pukul 08.30."
        },
        {
          "id": "q-k2b7-2",
          "questionText": "Raka bangun tidur pukul 06.00 dan sarapan pukul 07.00. Berapa lama waktu yang berlalu?",
          "image": "",
          "points": 50,
          "options": [
            "30 menit",
            "1 jam (60 menit)",
            "2 jam",
            "10 menit"
          ],
          "correctOptionIndex": 1,
          "explanation": "Benar! Dari pukul 06.00 hingga 07.00 lamanya adalah 1 jam (60 menit)."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b7-1",
        "title": "* Jarum pendek",
        "desc": "* Jarum pendek menunjukkan jam, sedangkan jarum panjang menunjukkan menit."
      },
      {
        "id": "lp-k2b7-2",
        "title": "Jam tepat",
        "desc": "jarum panjang di angka 12 (contoh: 07.00)."
      },
      {
        "id": "lp-k2b7-3",
        "title": "Setengah jam",
        "desc": "jarum panjang di angka 6 dan jarum pendek di antara dua angka (08.30 dibaca \"setengah sembilan\" karena menuju pukul 9)."
      },
      {
        "id": "lp-k2b7-4",
        "title": "Satuan waktu",
        "desc": "1 jam = 60 menit; setengah jam = 30 menit."
      },
      {
        "id": "lp-k2b7-5",
        "title": "Membaca jadwal dilakukan",
        "desc": "Membaca jadwal dilakukan dengan mencari baris jam yang ditanyakan lalu melihat kegiatan di sebelahnya."
      },
      {
        "id": "lp-k2b7-6",
        "title": "Contoh soal cerita",
        "desc": "Dari bangun pukul 06.00 sampai sarapan pukul 07.00 lamanya adalah 1 jam."
      }
    ],
    "created_at": "2026-11-15T20:02:10.443Z"
  },
  {
    "id": "materi-k2-b8",
    "title": "Belanja di Warung Bu Siti",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 2 • Fase A",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Melatih percakapan jual beli dengan santun serta mengenal nilai uang rupiah dan menghitung total belanja serta kembalian sampai Rp20.000.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Nisa disuruh Ibu membeli telur dan gula di warung Bu Siti.  \nNisa: \"Selamat pagi, Bu Siti. Saya mau membeli telur dan gula.\"  \nBu Siti: \"Selamat pagi, Nisa. Telurnya Rp8.000 dan gulanya Rp7.000.\"  \nNisa memberikan selembar uang Rp20.000.  \nBu Siti: \"Ini belanjaan dan kembaliannya, ya.\"  \nNisa: \"Terima kasih, Bu.\"",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k2b8-1",
          "title": "* Mengenal nilai",
          "desc": "* Mengenal nilai uang rupiah dilihat dari angka yang tertera pada uang (Rp1.000, Rp2.000, Rp5.000, Rp10.000, Rp20.000), bukan dari banyaknya lembar."
        },
        {
          "id": "lp-k2b8-2",
          "title": "Menghitung dalam satuan",
          "desc": "Menghitung dalam satuan \"ribu\" mempermudah penjumlahan: 8 ribu + 7 ribu = 15 ribu (Rp15.000)."
        },
        {
          "id": "lp-k2b8-3",
          "title": "Kembalian dihitung dengan",
          "desc": "Kembalian dihitung dengan mengurangkan total harga dari uang yang dibayarkan: Rp20.000 - Rp15.000 = Rp5.000."
        },
        {
          "id": "lp-k2b8-4",
          "title": "Percakapan jual beli",
          "desc": "Percakapan jual beli yang santun diawali salam, menyampaikan keperluan dengan jelas, dan diakhiri ucapan terima kasih."
        },
        {
          "id": "lp-k2b8-5",
          "title": "Contoh soal cerita:",
          "desc": "Contoh soal cerita: Buku Rp6.000 + pensil Rp3.000 = Rp9.000. Dibayar Rp10.000, kembaliannya Rp1.000.\n\n# Kelas 3 (Fase B: Eksplorasi & Konseptual)"
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Belanja di Warung Bu Siti",
      "questions": [
        {
          "id": "q-k2b8-1",
          "questionText": "Nisa membeli telur seharga Rp8.000 dan gula Rp7.000. Berapa total harga belanjaan Nisa?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Rp13.000",
            "Rp14.000",
            "Rp15.000",
            "Rp16.000"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! 8 ribu + 7 ribu = 15 ribu rupiah (Rp15.000)."
        },
        {
          "id": "q-k2b8-2",
          "questionText": "Nisa membayar belanjaan Rp15.000 dengan selembar uang Rp20.000. Berapakah uang kembalian yang diterima Nisa?",
          "image": "",
          "points": 50,
          "options": [
            "Rp3.000",
            "Rp4.000",
            "Rp5.000",
            "Rp6.000"
          ],
          "correctOptionIndex": 2,
          "explanation": "Luar biasa! Rp20.000 - Rp15.000 = Rp5.000 kembalian."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k2b8-1",
        "title": "* Mengenal nilai",
        "desc": "* Mengenal nilai uang rupiah dilihat dari angka yang tertera pada uang (Rp1.000, Rp2.000, Rp5.000, Rp10.000, Rp20.000), bukan dari banyaknya lembar."
      },
      {
        "id": "lp-k2b8-2",
        "title": "Menghitung dalam satuan",
        "desc": "Menghitung dalam satuan \"ribu\" mempermudah penjumlahan: 8 ribu + 7 ribu = 15 ribu (Rp15.000)."
      },
      {
        "id": "lp-k2b8-3",
        "title": "Kembalian dihitung dengan",
        "desc": "Kembalian dihitung dengan mengurangkan total harga dari uang yang dibayarkan: Rp20.000 - Rp15.000 = Rp5.000."
      },
      {
        "id": "lp-k2b8-4",
        "title": "Percakapan jual beli",
        "desc": "Percakapan jual beli yang santun diawali salam, menyampaikan keperluan dengan jelas, dan diakhiri ucapan terima kasih."
      },
      {
        "id": "lp-k2b8-5",
        "title": "Contoh soal cerita:",
        "desc": "Contoh soal cerita: Buku Rp6.000 + pensil Rp3.000 = Rp9.000. Dibayar Rp10.000, kembaliannya Rp1.000.\n\n# Kelas 3 (Fase B: Eksplorasi & Konseptual)"
      }
    ],
    "created_at": "2026-11-15T21:02:10.443Z"
  },
  {
    "id": "materi-k3-b1",
    "title": "Panen Bandeng di Tambak",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar menemukan ide pokok setiap paragraf melalui bacaan tentang petambak bandeng serta membaca, menulis, menentukan nilai tempat, dan membandingkan bilangan sampai 10.000.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Desa Pak Hasan dekat dengan pantai. Banyak warga bekerja di tambak. Tambak adalah kolam besar untuk memelihara ikan bandeng dan udang.  \nBulan ini, Pak Hasan panen bandeng. Ia mendapat 2.345 ekor bandeng. Tetangganya, Pak Karim, mendapat 3.150 ekor. Ikan-ikan itu dijual ke pasar dan ke tempat pengolahan ikan.  \nPanen yang baik membutuhkan air tambak yang bersih. Karena itu, para petambak rajin membersihkan tambak. Mereka juga memberi pakan ikan setiap hari.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b1-1",
          "title": "* Ide pokok",
          "desc": "* Ide pokok adalah gagasan utama sebuah paragraf (umumnya di kalimat pertama atau terakhir) yang didukung oleh kalimat-kalimat penjelas."
        },
        {
          "id": "lp-k3b1-2",
          "title": "Nilai tempat bilangan",
          "desc": "Nilai tempat bilangan empat angka terdiri dari ribuan, ratusan, puluhan, dan satuan (2.345 = 2.000 + 300 + 40 + 5). Jika suatu tempat kosong, isi dengan angka 0\\."
        },
        {
          "id": "lp-k3b1-3",
          "title": "Membandingkan bilangan dimulai",
          "desc": "Membandingkan bilangan dimulai dari nilai tempat paling kiri (ribuan), lalu ratusan, puluhan, hingga satuan (3.150 > 2.345)."
        },
        {
          "id": "lp-k3b1-4",
          "title": "Contoh soal cerita",
          "desc": "Bilangan 4.608 dalam bentuk panjang adalah 4.000 + 600 + 0 + 8 dan dibaca empat ribu enam ratus delapan."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Panen Bandeng di Tambak",
      "questions": [
        {
          "id": "q-k3b1-1",
          "questionText": "Pak Hasan memanen 2.345 ekor bandeng. Berapakah nilai angka 3 pada bilangan 2.345?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "3 satuan",
            "3 puluhan",
            "3 ratusan (300)",
            "3 ribuan (3000)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Tepat! Angka 3 menempati nilai ratusan sehingga bernilai 300."
        },
        {
          "id": "q-k3b1-2",
          "questionText": "Pak Hasan mendapat 2.345 ekor bandeng dan Pak Karim mendapat 3.150 ekor. Manakah pernyataan perbandingan yang benar?",
          "image": "",
          "points": 50,
          "options": [
            "2.345 > 3.150",
            "3.150 > 2.345",
            "Keduanya sama banyak",
            "Pak Hasan panen lebih banyak"
          ],
          "correctOptionIndex": 1,
          "explanation": "Bagus! 3 ribuan lebih besar dari 2 ribuan, jadi 3.150 > 2.345."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b1-1",
        "title": "* Ide pokok",
        "desc": "* Ide pokok adalah gagasan utama sebuah paragraf (umumnya di kalimat pertama atau terakhir) yang didukung oleh kalimat-kalimat penjelas."
      },
      {
        "id": "lp-k3b1-2",
        "title": "Nilai tempat bilangan",
        "desc": "Nilai tempat bilangan empat angka terdiri dari ribuan, ratusan, puluhan, dan satuan (2.345 = 2.000 + 300 + 40 + 5). Jika suatu tempat kosong, isi dengan angka 0\\."
      },
      {
        "id": "lp-k3b1-3",
        "title": "Membandingkan bilangan dimulai",
        "desc": "Membandingkan bilangan dimulai dari nilai tempat paling kiri (ribuan), lalu ratusan, puluhan, hingga satuan (3.150 > 2.345)."
      },
      {
        "id": "lp-k3b1-4",
        "title": "Contoh soal cerita",
        "desc": "Bilangan 4.608 dalam bentuk panjang adalah 4.000 + 600 + 0 + 8 dan dibaca empat ribu enam ratus delapan."
      }
    ],
    "created_at": "2026-11-15T22:02:10.443Z"
  },
  {
    "id": "materi-k3-b2",
    "title": "Kue Syukuran Kelas 3",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar membaca kata-kata baru dengan fasih dan memahami artinya serta melakukan operasi perkalian dan pembagian bilangan sampai 100 dalam soal cerita.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Besok kelas 3 mengadakan syukuran karena semua murid naik kelas. Wali kelas, Bu Rahma, meminta setiap kelompok membawa kue. Di kelas ada 6 kelompok. Setiap kelompok membawa 1 kotak kue lapis berisi 8 potong.  \nPada hari acara, semua kue dikumpulkan di meja guru. Ada 24 murid di kelas 3\\. Bu Rahma membagikan kue sama banyak kepada semua murid. Sebelum makan, mereka berdoa bersama.  \nKata baru:\n\n* syukuran = acara untuk berterima kasih kepada Tuhan  \n* kelompok = beberapa orang yang bekerja bersama  \n* wali kelas = guru yang bertanggung jawab atas satu kelas",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b2-1",
          "title": "* Perkalian adalah",
          "desc": "* Perkalian adalah penjumlahan berulang (6 x 8 = 48) dan memiliki sifat tukar (6 x 8 = 8 x 6)."
        },
        {
          "id": "lp-k3b2-2",
          "title": "Pembagian",
          "desc": "membagi sama banyak atau pengurangan berulang (48 : 24 = 2), yang berhubungan erat dengan perkalian melalui keluarga fakta (7 x 9 = 63, maka 63 : 7 = 9)."
        },
        {
          "id": "lp-k3b2-3",
          "title": "Mengenal kelipatan (hasil",
          "desc": "Mengenal kelipatan (hasil kali suatu bilangan) dan faktor (bilangan yang membagi habis bilangan tersebut)."
        },
        {
          "id": "lp-k3b2-4",
          "title": "Membaca kata baru",
          "desc": "Membaca kata baru dilakukan dengan memenggal suku kata, memahami konteks kalimat, dan mengecek kamus."
        },
        {
          "id": "lp-k3b2-5",
          "title": "Contoh soal cerita",
          "desc": "7 baris cabai berisi 9 batang per baris = 63 batang. Dibagi 7 orang = 9 batang per orang."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Perkalian sebagai Penjumlahan Berulang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Trik Seru Menghitung Perkalian Cepat",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kue Syukuran Kelas 3",
      "questions": [
        {
          "id": "q-k3b2-1",
          "questionText": "Ada 6 kelompok di kelas 3, dan tiap kelompok membawa 1 kotak kue lapis berisi 8 potong. Berapa jumlah seluruh kue lapis?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "42 potong",
            "46 potong",
            "48 potong",
            "54 potong"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Perkalian 6 kelompok x 8 potong = 48 potong kue."
        },
        {
          "id": "q-k3b2-2",
          "questionText": "Jika seluruh 48 potong kue dibagikan sama banyak kepada 24 murid kelas 3, berapa potong kue yang didapat setiap murid?",
          "image": "",
          "points": 50,
          "options": [
            "1 potong",
            "2 potong",
            "3 potong",
            "4 potong"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! 48 dibagi 24 adalah 2 potong kue tiap murid."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b2-1",
        "title": "* Perkalian adalah",
        "desc": "* Perkalian adalah penjumlahan berulang (6 x 8 = 48) dan memiliki sifat tukar (6 x 8 = 8 x 6)."
      },
      {
        "id": "lp-k3b2-2",
        "title": "Pembagian",
        "desc": "membagi sama banyak atau pengurangan berulang (48 : 24 = 2), yang berhubungan erat dengan perkalian melalui keluarga fakta (7 x 9 = 63, maka 63 : 7 = 9)."
      },
      {
        "id": "lp-k3b2-3",
        "title": "Mengenal kelipatan (hasil",
        "desc": "Mengenal kelipatan (hasil kali suatu bilangan) dan faktor (bilangan yang membagi habis bilangan tersebut)."
      },
      {
        "id": "lp-k3b2-4",
        "title": "Membaca kata baru",
        "desc": "Membaca kata baru dilakukan dengan memenggal suku kata, memahami konteks kalimat, dan mengecek kamus."
      },
      {
        "id": "lp-k3b2-5",
        "title": "Contoh soal cerita",
        "desc": "7 baris cabai berisi 9 batang per baris = 63 batang. Dibagi 7 orang = 9 batang per orang."
      }
    ],
    "created_at": "2026-11-15T23:02:10.443Z"
  },
  {
    "id": "materi-k3-b3",
    "title": "Mengukur Tubuh di UKS",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis teks laporan sederhana dari hasil pengukuran serta mengukur panjang dan berat dengan satuan baku (m, cm, kg, g).",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Hari Kamis, petugas puskesmas datang ke sekolah. Mereka memeriksa kesehatan murid di ruang UKS. Satu per satu murid ditimbang dan diukur tingginya.  \nBerat badan diukur dengan timbangan dalam satuan kilogram (kg). Tinggi badan diukur dengan alat pengukur tinggi dalam satuan sentimeter (cm).  \nTinggi badan Wulan 128 cm dan beratnya 26 kg. Tinggi badan Fajar 1 meter 32 sentimeter dan beratnya 29 kg. Petugas berpesan agar murid makan makanan bergizi dan rajin berolahraga.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b3-1",
          "title": "* Satuan baku",
          "desc": "* Satuan baku memberikan hasil ukur yang sama di mana pun: 1 m = 100 cm dan 1 kg = 1.000 g."
        },
        {
          "id": "lp-k3b3-2",
          "title": "Membandingkan ukuran harus",
          "desc": "Membandingkan ukuran harus dalam satuan yang sama: 1 m 32 cm = 132 cm, sehingga Fajar (132 cm) lebih tinggi 4 cm dari Wulan (128 cm)."
        },
        {
          "id": "lp-k3b3-3",
          "title": "Cara memakai penggaris",
          "desc": "ujung benda diletakkan tepat pada angka 0\\."
        },
        {
          "id": "lp-k3b3-4",
          "title": "Menulis laporan sederhana",
          "desc": "Menulis laporan sederhana memuat judul, objek yang diukur, hasil pengukuran (angka dan satuan), serta kesimpulan atau saran."
        },
        {
          "id": "lp-k3b3-5",
          "title": "Contoh soal cerita",
          "desc": "Sekarung beras 5 kg sama dengan 5 x 1.000 g = 5.000 gram."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengukur Panjang, Berat & Waktu",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Eksperimen Menimbang dan Membandingkan",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Mengukur Tubuh di UKS",
      "questions": [
        {
          "id": "q-k3b3-1",
          "questionText": "Tinggi badan Fajar adalah 1 meter 32 sentimeter. Berapa tinggi Fajar jika dinyatakan dalam satuan sentimeter (cm)?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "132 cm",
            "102 cm",
            "123 cm",
            "1320 cm"
          ],
          "correctOptionIndex": 0,
          "explanation": "Pintar! 1 meter = 100 cm, sehingga 100 cm + 32 cm = 132 cm."
        },
        {
          "id": "q-k3b3-2",
          "questionText": "Sekarung beras memiliki berat 5 kilogram (kg). Berapa berat beras tersebut dalam satuan gram (g)?",
          "image": "",
          "points": 50,
          "options": [
            "50 gram",
            "500 gram",
            "5.000 gram",
            "50.000 gram"
          ],
          "correctOptionIndex": 2,
          "explanation": "Benar! 1 kg = 1.000 gram, jadi 5 kg = 5 x 1.000 = 5.000 gram."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b3-1",
        "title": "* Satuan baku",
        "desc": "* Satuan baku memberikan hasil ukur yang sama di mana pun: 1 m = 100 cm dan 1 kg = 1.000 g."
      },
      {
        "id": "lp-k3b3-2",
        "title": "Membandingkan ukuran harus",
        "desc": "Membandingkan ukuran harus dalam satuan yang sama: 1 m 32 cm = 132 cm, sehingga Fajar (132 cm) lebih tinggi 4 cm dari Wulan (128 cm)."
      },
      {
        "id": "lp-k3b3-3",
        "title": "Cara memakai penggaris",
        "desc": "ujung benda diletakkan tepat pada angka 0\\."
      },
      {
        "id": "lp-k3b3-4",
        "title": "Menulis laporan sederhana",
        "desc": "Menulis laporan sederhana memuat judul, objek yang diukur, hasil pengukuran (angka dan satuan), serta kesimpulan atau saran."
      },
      {
        "id": "lp-k3b3-5",
        "title": "Contoh soal cerita",
        "desc": "Sekarung beras 5 kg sama dengan 5 x 1.000 g = 5.000 gram."
      }
    ],
    "created_at": "2026-11-16T00:02:10.443Z"
  },
  {
    "id": "materi-k3-b4",
    "title": "Pameran Kerajinan Sekolah",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menemukan informasi penting dalam teks informasi serta menjumlahkan dan mengurangkan bilangan sampai 1.000 dengan teknik menyimpan dan meminjam.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Sekolah mengadakan pameran kerajinan dari bahan bekas. Kelas 3 membuat tas dari bungkus kopi dan pot dari botol plastik. Pameran berlangsung selama dua hari di aula sekolah.  \nPada hari pertama, pengunjung yang datang sebanyak 368 orang. Pada hari kedua, pengunjung bertambah menjadi 457 orang. Hasil penjualan kerajinan dipakai untuk membeli buku perpustakaan.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b4-1",
          "title": "* Penjumlahan bersusun",
          "desc": "* Penjumlahan bersusun dengan menyimpan: susun lurus sesuai nilai tempat; jika hasil kolom >= 10, tulis satuannya dan simpan 1 ke kolom kiri (368 + 457 = 825)."
        },
        {
          "id": "lp-k3b4-2",
          "title": "Pengurangan bersusun dengan",
          "desc": "Pengurangan bersusun dengan meminjam: jika angka atas lebih kecil dari bawah, pinjam 1 dari nilai tempat di kirinya (457 - 368 = 89). Cek hasil dengan penjumlahan (89 + 368 = 457)."
        },
        {
          "id": "lp-k3b4-3",
          "title": "Mencari informasi penting",
          "desc": "Mencari informasi penting dilakukan dengan menjawab pertanyaan apa, di mana, kapan, berapa, dan untuk apa."
        },
        {
          "id": "lp-k3b4-4",
          "title": "Contoh soal cerita",
          "desc": "600 brosur dicetak, 245 dibagikan. Sisa brosur = 600 - 245 = 355 brosur."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Pameran Kerajinan Sekolah",
      "questions": [
        {
          "id": "q-k3b4-1",
          "questionText": "Pengunjung pameran pada hari pertama ada 368 orang, dan hari kedua ada 457 orang. Berapa jumlah seluruh pengunjung selama dua hari?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "815 orang",
            "825 orang",
            "725 orang",
            "835 orang"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! 368 + 457 = 825 orang."
        },
        {
          "id": "q-k3b4-2",
          "questionText": "Berapa selisih banyak pengunjung antara hari kedua (457) dan hari pertama (368)?",
          "image": "",
          "points": 50,
          "options": [
            "79 orang",
            "89 orang",
            "99 orang",
            "109 orang"
          ],
          "correctOptionIndex": 1,
          "explanation": "Keren! 457 - 368 = 89 orang."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b4-1",
        "title": "* Penjumlahan bersusun",
        "desc": "* Penjumlahan bersusun dengan menyimpan: susun lurus sesuai nilai tempat; jika hasil kolom >= 10, tulis satuannya dan simpan 1 ke kolom kiri (368 + 457 = 825)."
      },
      {
        "id": "lp-k3b4-2",
        "title": "Pengurangan bersusun dengan",
        "desc": "Pengurangan bersusun dengan meminjam: jika angka atas lebih kecil dari bawah, pinjam 1 dari nilai tempat di kirinya (457 - 368 = 89). Cek hasil dengan penjumlahan (89 + 368 = 457)."
      },
      {
        "id": "lp-k3b4-3",
        "title": "Mencari informasi penting",
        "desc": "Mencari informasi penting dilakukan dengan menjawab pertanyaan apa, di mana, kapan, berapa, dan untuk apa."
      },
      {
        "id": "lp-k3b4-4",
        "title": "Contoh soal cerita",
        "desc": "600 brosur dicetak, 245 dibagikan. Sisa brosur = 600 - 245 = 355 brosur."
      }
    ],
    "created_at": "2026-11-16T01:02:10.443Z"
  },
  {
    "id": "materi-k3-b5",
    "title": "Roti Bakar Dibagi Rata",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Melatih kemampuan membuat dan menjawab pertanyaan 5W1H dari bacaan serta mengenal, membandingkan, dan mengurutkan pecahan berpenyebut sampai 12\\.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pada hari Sabtu, Ayah membuat roti bakar di dapur. Roti pertama dipotong menjadi 3 bagian sama besar untuk Ibu, Kak Dimas, dan Lia. Roti kedua, yang ukurannya sama, dipotong menjadi 6 bagian sama besar untuk teman-teman Kak Dimas yang datang bermain.  \nLia memperhatikan potongan roti itu. \"Ayah, mengapa potongan roti teman Kak Dimas lebih kecil?\" tanyanya. Ayah tersenyum, \"Karena rotinya dibagi untuk lebih banyak orang.\"",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b5-1",
          "title": "* Pada pecahan,",
          "desc": "* Pada pecahan, angka atas disebut pembilang (bagian yang diambil) dan angka bawah disebut penyebut (banyak bagian keseluruhan)."
        },
        {
          "id": "lp-k3b5-2",
          "title": "Jika pembilang sama-sama",
          "desc": "Jika pembilang sama-sama 1, makin besar penyebut maka makin kecil ukuran bagiannya (1/3 > 1/6; urutan dari terbesar: 1/2 > 1/3 > 1/4 > 1/6 > 1/12)."
        },
        {
          "id": "lp-k3b5-3",
          "title": "Jika penyebut sama,",
          "desc": "Jika penyebut sama, bandingkan pembilangnya (2/6 < 5/6)."
        },
        {
          "id": "lp-k3b5-4",
          "title": "Membuat pertanyaan 5W1H",
          "desc": "Apa (kejadian), Siapa (tokoh), Di mana (tempat), Kapan (waktu), Mengapa (alasan), Bagaimana (cara)."
        },
        {
          "id": "lp-k3b5-5",
          "title": "Contoh soal cerita",
          "desc": "Lia mendapat 1/3 roti dan teman Kak Dimas 1/6 roti. Karena penyebut 3 < 6, potongan Lia (1/3) lebih besar."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Konsep Pecahan Sederhana",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Praktik Memotong Kue & Berbagi Rata",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Roti Bakar Dibagi Rata",
      "questions": [
        {
          "id": "q-k3b5-1",
          "questionText": "Lia mendapat 1/3 bagian roti dan temannya mendapat 1/6 bagian roti dari ukuran yang sama. Siapakah yang mendapat potongan lebih besar?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "Lia (1/3)",
            "Teman Kak Dimas (1/6)",
            "Sama besar",
            "Tidak bisa dibandingkan"
          ],
          "correctOptionIndex": 0,
          "explanation": "Tepat sekali! Makin kecil penyebut pada pecahan berpembilang 1, makin besar potongannya (1/3 > 1/6)."
        },
        {
          "id": "q-k3b5-2",
          "questionText": "Pada pecahan 2/6, angka 2 disebut sebagai...",
          "image": "",
          "points": 50,
          "options": [
            "Penyebut",
            "Pembilang",
            "Kelipatan",
            "Hasil bagi"
          ],
          "correctOptionIndex": 1,
          "explanation": "Bagus! Angka di atas disebut pembilang, sedangkan angka di bawah adalah penyebut."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b5-1",
        "title": "* Pada pecahan,",
        "desc": "* Pada pecahan, angka atas disebut pembilang (bagian yang diambil) dan angka bawah disebut penyebut (banyak bagian keseluruhan)."
      },
      {
        "id": "lp-k3b5-2",
        "title": "Jika pembilang sama-sama",
        "desc": "Jika pembilang sama-sama 1, makin besar penyebut maka makin kecil ukuran bagiannya (1/3 > 1/6; urutan dari terbesar: 1/2 > 1/3 > 1/4 > 1/6 > 1/12)."
      },
      {
        "id": "lp-k3b5-3",
        "title": "Jika penyebut sama,",
        "desc": "Jika penyebut sama, bandingkan pembilangnya (2/6 < 5/6)."
      },
      {
        "id": "lp-k3b5-4",
        "title": "Membuat pertanyaan 5W1H",
        "desc": "Apa (kejadian), Siapa (tokoh), Di mana (tempat), Kapan (waktu), Mengapa (alasan), Bagaimana (cara)."
      },
      {
        "id": "lp-k3b5-5",
        "title": "Contoh soal cerita",
        "desc": "Lia mendapat 1/3 roti dan teman Kak Dimas 1/6 roti. Karena penyebut 3 < 6, potongan Lia (1/3) lebih besar."
      }
    ],
    "created_at": "2026-11-16T02:02:10.443Z"
  },
  {
    "id": "materi-k3-b6",
    "title": "Jadwal Wisata Kelas 3",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar membaca informasi dari tabel jadwal serta membaca waktu dalam jam dan menit dan menghitung lama kegiatan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kelas 3 akan berwisata ke kebun binatang. Bu Rahma membagikan jadwal berikut.\n\n| Kegiatan | Waktu Mulai | Waktu Selesai |\n| :---- | :---- | :---- |\n| Perjalanan berangkat | 07.15 | 08.45 |\n| Berkeliling kebun binatang | 09.00 | 11.30 |\n| Makan siang | 11.30 | 12.15 |\n| Perjalanan pulang | 12.30 | 14.00 |\n\nBu Rahma berpesan, \"Datanglah ke sekolah 15 menit sebelum bus berangkat, ya.\"",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b6-1",
          "title": "* 1 jam",
          "desc": "* 1 jam = 60 menit. Setiap angka pada jam analog bernilai 5 menit untuk jarum panjang (angka 3 = 15 menit, angka 6 = 30 menit, angka 9 = 45 menit)."
        },
        {
          "id": "lp-k3b6-2",
          "title": "Lama kegiatan",
          "desc": "waktu selesai - waktu mulai (hitung jam penuhnya dulu, lalu sisa menitnya). Contoh: 07.15 ke 08.45 adalah 1 jam 30 menit."
        },
        {
          "id": "lp-k3b6-3",
          "title": "Menghitung waktu mundur",
          "desc": "15 menit sebelum 07.15 adalah pukul 07.00."
        },
        {
          "id": "lp-k3b6-4",
          "title": "Membaca tabel jadwal",
          "desc": "Membaca tabel jadwal dilakukan dengan mencocokkan baris kegiatan dengan kolom mulai dan selesai."
        },
        {
          "id": "lp-k3b6-5",
          "title": "Contoh soal cerita",
          "desc": "Berkeliling kebun binatang dari pukul 09.00 sampai 11.30 memakan waktu 2 jam 30 menit."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Jadwal Wisata Kelas 3",
      "questions": [
        {
          "id": "q-k3b6-1",
          "questionText": "Berdasarkan tabel jadwal, murid berkeliling kebun binatang dari pukul 09.00 sampai 11.30. Berapa lama kegiatan tersebut?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "1 jam 30 menit",
            "2 jam",
            "2 jam 30 menit",
            "3 jam"
          ],
          "correctOptionIndex": 2,
          "explanation": "Luar biasa! Dari 09.00 ke 11.30 adalah 2 jam ditambah 30 menit."
        },
        {
          "id": "q-k3b6-2",
          "questionText": "Jika bus berangkat pukul 07.15 dan murid harus tiba 15 menit sebelumnya, pukul berapa murid harus tiba di sekolah?",
          "image": "",
          "points": 50,
          "options": [
            "06.45",
            "07.00",
            "07.30",
            "06.30"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! 15 menit sebelum pukul 07.15 adalah tepat pukul 07.00."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b6-1",
        "title": "* 1 jam",
        "desc": "* 1 jam = 60 menit. Setiap angka pada jam analog bernilai 5 menit untuk jarum panjang (angka 3 = 15 menit, angka 6 = 30 menit, angka 9 = 45 menit)."
      },
      {
        "id": "lp-k3b6-2",
        "title": "Lama kegiatan",
        "desc": "waktu selesai - waktu mulai (hitung jam penuhnya dulu, lalu sisa menitnya). Contoh: 07.15 ke 08.45 adalah 1 jam 30 menit."
      },
      {
        "id": "lp-k3b6-3",
        "title": "Menghitung waktu mundur",
        "desc": "15 menit sebelum 07.15 adalah pukul 07.00."
      },
      {
        "id": "lp-k3b6-4",
        "title": "Membaca tabel jadwal",
        "desc": "Membaca tabel jadwal dilakukan dengan mencocokkan baris kegiatan dengan kolom mulai dan selesai."
      },
      {
        "id": "lp-k3b6-5",
        "title": "Contoh soal cerita",
        "desc": "Berkeliling kebun binatang dari pukul 09.00 sampai 11.30 memakan waktu 2 jam 30 menit."
      }
    ],
    "created_at": "2026-11-16T03:02:10.443Z"
  },
  {
    "id": "materi-k3-b7",
    "title": "Layang-Layang Arif",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis teks deskripsi benda serta mengenali ciri bangun datar (sisi, sudut, sudut siku-siku) dan menghitung keliling bangun datar.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Musim angin telah tiba. Arif membuat layang-layang dari bambu dan kertas minyak berwarna merah. Kerangkanya terdiri dari dua bilah bambu yang bersilangan tegak lurus. Tepi layang-layang diberi tali: dua sisi atas masing-masing 30 cm, dan dua sisi bawah masing-masing 45 cm.  \nArif juga membuat bingkai foto berbentuk persegi panjang untuk adiknya. Panjang bingkai 20 cm dan lebarnya 15 cm.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b7-1",
          "title": "* Keliling adalah",
          "desc": "* Keliling adalah panjang seluruh tepi bangun datar (jumlah panjang semua sisinya). Keliling layang-layang = 30 + 30 + 45 + 45 = 150 cm; keliling bingkai = 20 + 15 + 20 + 15 = 70 cm."
        },
        {
          "id": "lp-k3b7-2",
          "title": "Sudut siku-siku adalah",
          "desc": "Sudut siku-siku adalah sudut tegak lurus seperti pojok buku."
        },
        {
          "id": "lp-k3b7-3",
          "title": "Ciri bangun datar",
          "desc": "persegi (4 sisi sama panjang, 4 sudut siku-siku), persegi panjang (sisi berhadapan sama panjang, 4 sudut siku-siku), layang-layang (dua pasang sisi berdekatan sama panjang)."
        },
        {
          "id": "lp-k3b7-4",
          "title": "Menulis teks deskripsi",
          "desc": "Menulis teks deskripsi benda menyebutkan nama benda, bahan, bentuk, ukuran, warna, dan kegunaannya."
        },
        {
          "id": "lp-k3b7-5",
          "title": "Contoh soal cerita",
          "desc": "Ubin persegi bersisi 12 cm memiliki keliling 12 + 12 + 12 + 12 = 48 cm."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Layang-Layang Arif",
      "questions": [
        {
          "id": "q-k3b7-1",
          "questionText": "Bingkai foto adik Arif berbentuk persegi panjang dengan panjang 20 cm dan lebar 15 cm. Berapakah keliling bingkai tersebut?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "35 cm",
            "50 cm",
            "70 cm",
            "100 cm"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Keliling = 2 x (panjang + lebar) = 2 x (20 + 15) = 2 x 35 = 70 cm."
        },
        {
          "id": "q-k3b7-2",
          "questionText": "Sudut yang tegak lurus seperti pojok buku atau pojok bingkai foto dinamakan sudut...",
          "image": "",
          "points": 50,
          "options": [
            "Sudut lancip",
            "Sudut tumpul",
            "Sudut siku-siku",
            "Sudut lurus"
          ],
          "correctOptionIndex": 2,
          "explanation": "Benar! Sudut yang tegak lurus dinamakan sudut siku-siku (90 derajat)."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b7-1",
        "title": "* Keliling adalah",
        "desc": "* Keliling adalah panjang seluruh tepi bangun datar (jumlah panjang semua sisinya). Keliling layang-layang = 30 + 30 + 45 + 45 = 150 cm; keliling bingkai = 20 + 15 + 20 + 15 = 70 cm."
      },
      {
        "id": "lp-k3b7-2",
        "title": "Sudut siku-siku adalah",
        "desc": "Sudut siku-siku adalah sudut tegak lurus seperti pojok buku."
      },
      {
        "id": "lp-k3b7-3",
        "title": "Ciri bangun datar",
        "desc": "persegi (4 sisi sama panjang, 4 sudut siku-siku), persegi panjang (sisi berhadapan sama panjang, 4 sudut siku-siku), layang-layang (dua pasang sisi berdekatan sama panjang)."
      },
      {
        "id": "lp-k3b7-4",
        "title": "Menulis teks deskripsi",
        "desc": "Menulis teks deskripsi benda menyebutkan nama benda, bahan, bentuk, ukuran, warna, dan kegunaannya."
      },
      {
        "id": "lp-k3b7-5",
        "title": "Contoh soal cerita",
        "desc": "Ubin persegi bersisi 12 cm memiliki keliling 12 + 12 + 12 + 12 = 48 cm."
      }
    ],
    "created_at": "2026-11-16T04:02:10.443Z"
  },
  {
    "id": "materi-k3-b8",
    "title": "Lomba Kebersihan Kelas",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 3 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menulis kesimpulan berdasarkan data serta membaca dan menyajikan data dalam piktogram berskala dan diagram batang.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Sekolah mengadakan lomba kebersihan. Setiap kelas mengumpulkan sampah plastik selama satu minggu, lalu menyetorkannya ke bank sampah desa. Hasilnya disajikan dalam piktogram berikut.\n\n| Kelas | Simbol (1 kotak = 2 kantong) |\n| :---- | :---- |\n| Kelas 1 | [ ] [ ] [ ] |\n| Kelas 2 | [ ] [ ] [ ] [ ] |\n| Kelas 3 | [ ] [ ] [ ] [ ] [ ] [ ] |\n| Kelas 4 | [ ] [ ] [ ] [ ] [ ] |",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k3b8-1",
          "title": "* Pada piktogram",
          "desc": "* Pada piktogram berskala, periksa keterangan nilai satu gambar sebelum menghitung (1 gambar = 2 kantong). Setengah gambar berarti 1 kantong."
        },
        {
          "id": "lp-k3b8-2",
          "title": "Banyak kantong tiap kelas",
          "desc": "Kelas 1 = 6, Kelas 2 = 8, Kelas 3 = 12, Kelas 4 = 10\\. Total seluruhnya 36 kantong."
        },
        {
          "id": "lp-k3b8-3",
          "title": "Diagram batang menyajikan",
          "desc": "Diagram batang menyajikan data dengan batang tegak; tinggi batang menunjukkan banyaknya data."
        },
        {
          "id": "lp-k3b8-4",
          "title": "Menulis kesimpulan harus",
          "desc": "Menulis kesimpulan harus sesuai dengan data dan menyertakan angka pendukung."
        },
        {
          "id": "lp-k3b8-5",
          "title": "Contoh soal cerita:",
          "desc": "Contoh soal cerita: Selisih kantong Kelas 3 (12) dan Kelas 1 (6) adalah 12 - 6 = 6 kantong.\n\n# Kelas 4 (Fase B: Analisis Sederhana & Pemecahan Masalah)"
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Membaca Piktogram dan Diagram Batang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Menghitung Frekuensi dan Menyajikan Data",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Lomba Kebersihan Kelas",
      "questions": [
        {
          "id": "q-k3b8-1",
          "questionText": "Pada piktogram berskala, 1 kotak mewakili 2 kantong sampah. Jika Kelas 3 memiliki 6 kotak, berapa banyak kantong sampah Kelas 3?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "6 kantong",
            "8 kantong",
            "12 kantong",
            "16 kantong"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! 6 kotak dikalikan 2 kantong per kotak = 12 kantong sampah."
        },
        {
          "id": "q-k3b8-2",
          "questionText": "Berapa selisih kantong sampah plastik yang dikumpulkan Kelas 3 (12 kantong) dan Kelas 1 (6 kantong)?",
          "image": "",
          "points": 50,
          "options": [
            "4 kantong",
            "5 kantong",
            "6 kantong",
            "7 kantong"
          ],
          "correctOptionIndex": 2,
          "explanation": "Tepat! 12 kantong - 6 kantong = 6 kantong selisihnya."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k3b8-1",
        "title": "* Pada piktogram",
        "desc": "* Pada piktogram berskala, periksa keterangan nilai satu gambar sebelum menghitung (1 gambar = 2 kantong). Setengah gambar berarti 1 kantong."
      },
      {
        "id": "lp-k3b8-2",
        "title": "Banyak kantong tiap kelas",
        "desc": "Kelas 1 = 6, Kelas 2 = 8, Kelas 3 = 12, Kelas 4 = 10\\. Total seluruhnya 36 kantong."
      },
      {
        "id": "lp-k3b8-3",
        "title": "Diagram batang menyajikan",
        "desc": "Diagram batang menyajikan data dengan batang tegak; tinggi batang menunjukkan banyaknya data."
      },
      {
        "id": "lp-k3b8-4",
        "title": "Menulis kesimpulan harus",
        "desc": "Menulis kesimpulan harus sesuai dengan data dan menyertakan angka pendukung."
      },
      {
        "id": "lp-k3b8-5",
        "title": "Contoh soal cerita:",
        "desc": "Contoh soal cerita: Selisih kantong Kelas 3 (12) dan Kelas 1 (6) adalah 12 - 6 = 6 kantong.\n\n# Kelas 4 (Fase B: Analisis Sederhana & Pemecahan Masalah)"
      }
    ],
    "created_at": "2026-11-16T05:02:10.443Z"
  },
  {
    "id": "materi-k4-b1",
    "title": "Martabak Pesanan Pak RT",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Melatih kemampuan menceritakan kembali isi cerita dengan urutan yang benar serta mengenal dan menerapkan konsep pecahan senilai.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Malam itu ada rapat warga di rumah Pak RT. Pak RT memesan dua martabak manis yang sama besar di warung Bu Siti.  \nMartabak pertama dipotong menjadi 4 bagian sama besar. Martabak kedua dipotong menjadi 8 bagian sama besar. Andi mengambil 2 potong dari martabak pertama. Dewi mengambil 4 potong dari martabak kedua.  \n\"Wah, Dewi mengambil lebih banyak!\" seru Andi. Dewi menggeleng. \"Coba lihat, bagian kita sama besar, kok.\" Pak RT tertawa, lalu menjelaskan bahwa 2/4 dan 4/8 sama-sama setengah martabak.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b1-1",
          "title": "* Pecahan senilai",
          "desc": "* Pecahan senilai adalah pecahan yang bentuk angkanya berbeda tetapi nilainya sama (1/2 = 2/4 = 4/8)."
        },
        {
          "id": "lp-k4b1-2",
          "title": "Cara mencari pecahan senilai",
          "desc": "kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama (bukan nol). Menyederhanakan pecahan dilakukan dengan membagi pembilang dan penyebut hingga bentuk paling sederhana."
        },
        {
          "id": "lp-k4b1-3",
          "title": "Menceritakan kembali isi",
          "desc": "Menceritakan kembali isi cerita dilakukan dengan bahasa sendiri secara runtut mulai dari awal (tokoh, tempat), tengah (masalah), hingga akhir (penyelesaian)."
        },
        {
          "id": "lp-k4b1-4",
          "title": "Contoh soal cerita",
          "desc": "Rina makan 3 dari 6 bagian semangka (3/6). Dibagi 3 menjadi 1/2 (setengah semangka)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Konsep Pecahan Sederhana",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Praktik Memotong Kue & Berbagi Rata",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Martabak Pesanan Pak RT",
      "questions": [
        {
          "id": "q-k4b1-1",
          "questionText": "Andi mengambil 2 potong dari 4 bagian (2/4), sedangkan Dewi mengambil 4 potong dari 8 bagian (4/8). Mengapa bagian mereka sama besar?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "Karena 2/4 dan 4/8 adalah pecahan senilai (sama-sama setengah)",
            "Karena kuenya beda rasa",
            "Karena Andi mengambil lebih dulu",
            "Karena martabak Dewi lebih kecil"
          ],
          "correctOptionIndex": 0,
          "explanation": "Hebat! 2/4 jika disederhanakan dengan membagi 2 menghasilkan 1/2, sama dengan 4/8 yang disederhanakan menjadi 1/2."
        },
        {
          "id": "q-k4b1-2",
          "questionText": "Bentuk paling sederhana dari pecahan 6/8 adalah...",
          "image": "",
          "points": 50,
          "options": [
            "1/2",
            "2/3",
            "3/4",
            "4/5"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! Membagi pembilang dan penyebut dengan FPB 2 menghasilkan 3/4."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b1-1",
        "title": "* Pecahan senilai",
        "desc": "* Pecahan senilai adalah pecahan yang bentuk angkanya berbeda tetapi nilainya sama (1/2 = 2/4 = 4/8)."
      },
      {
        "id": "lp-k4b1-2",
        "title": "Cara mencari pecahan senilai",
        "desc": "kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama (bukan nol). Menyederhanakan pecahan dilakukan dengan membagi pembilang dan penyebut hingga bentuk paling sederhana."
      },
      {
        "id": "lp-k4b1-3",
        "title": "Menceritakan kembali isi",
        "desc": "Menceritakan kembali isi cerita dilakukan dengan bahasa sendiri secara runtut mulai dari awal (tokoh, tempat), tengah (masalah), hingga akhir (penyelesaian)."
      },
      {
        "id": "lp-k4b1-4",
        "title": "Contoh soal cerita",
        "desc": "Rina makan 3 dari 6 bagian semangka (3/6). Dibagi 3 menjadi 1/2 (setengah semangka)."
      }
    ],
    "created_at": "2026-11-16T06:02:10.443Z"
  },
  {
    "id": "materi-k4-b2",
    "title": "Belanja Hemat di Koperasi",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar menyajikan pendapat dengan pilihan kata, sikap tubuh, dan intonasi yang tepat serta mengenal hubungan antara pecahan, desimal, dan persen.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Koperasi sekolah menempelkan pengumuman baru: \"DISKON AKHIR BULAN! Semua buku tulis diskon 10%. Pensil diskon 25%.\" Harga sebuah buku tulis Rp5.000, sedangkan sebuah pensil Rp2.000.  \nTia dan Gilang membaca pengumuman itu. \"Menurutku, kita beli pensil sekarang karena diskonnya paling besar,\" kata Tia. Gilang menatap Tia dan menjawab dengan tenang, \"Aku setuju, tetapi kita juga perlu buku tulis untuk ujian minggu depan.\"",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b2-1",
          "title": "* Persen (%)",
          "desc": "* Persen (%) artinya per seratus. Hubungan bentuk senilai: 25% = 25/100 = 1/4 = 0,25; 10% = 1/10 = 0,1; 50% = 1/2 = 0,5."
        },
        {
          "id": "lp-k4b2-2",
          "title": "Desimal",
          "desc": "pecahan berpenyebut 10 atau 100\\. Membandingkan desimal dilakukan dengan menyamakan banyak angka di belakang koma (0,6 = 0,60 > 0,45)."
        },
        {
          "id": "lp-k4b2-3",
          "title": "Menghitung diskon",
          "desc": "diskon 25% dari Rp2.000 = 1/4 x Rp2.000 = Rp500, sehingga harga setelah diskon Rp1.500."
        },
        {
          "id": "lp-k4b2-4",
          "title": "Menyajikan pendapat menggunakan",
          "desc": "Menyajikan pendapat menggunakan pola: pendapat (\"Menurut saya...\"), alasan (\"karena...\"), dan bukti/contoh dengan intonasi jelas serta menatap lawan bicara."
        },
        {
          "id": "lp-k4b2-5",
          "title": "Contoh soal cerita",
          "desc": "Buku Rp5.000 diskon 10% (Rp500), maka harga bayarnya Rp4.500."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Belanja Hemat di Koperasi",
      "questions": [
        {
          "id": "q-k4b2-1",
          "questionText": "Buku tulis seharga Rp5.000 mendapat diskon 10%. Berapakah potongan harga (diskon) yang didapatkan?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "Rp200",
            "Rp500",
            "Rp1.000",
            "Rp1.500"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! 10% dari Rp5.000 = (10/100) x 5.000 = Rp500."
        },
        {
          "id": "q-k4b2-2",
          "questionText": "Pecahan 1/4 jika diubah ke dalam bentuk persen (%) adalah...",
          "image": "",
          "points": 50,
          "options": [
            "15%",
            "20%",
            "25%",
            "40%"
          ],
          "correctOptionIndex": 2,
          "explanation": "Benar! 1/4 = 25/100 = 25%."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b2-1",
        "title": "* Persen (%)",
        "desc": "* Persen (%) artinya per seratus. Hubungan bentuk senilai: 25% = 25/100 = 1/4 = 0,25; 10% = 1/10 = 0,1; 50% = 1/2 = 0,5."
      },
      {
        "id": "lp-k4b2-2",
        "title": "Desimal",
        "desc": "pecahan berpenyebut 10 atau 100\\. Membandingkan desimal dilakukan dengan menyamakan banyak angka di belakang koma (0,6 = 0,60 > 0,45)."
      },
      {
        "id": "lp-k4b2-3",
        "title": "Menghitung diskon",
        "desc": "diskon 25% dari Rp2.000 = 1/4 x Rp2.000 = Rp500, sehingga harga setelah diskon Rp1.500."
      },
      {
        "id": "lp-k4b2-4",
        "title": "Menyajikan pendapat menggunakan",
        "desc": "Menyajikan pendapat menggunakan pola: pendapat (\"Menurut saya...\"), alasan (\"karena...\"), dan bukti/contoh dengan intonasi jelas serta menatap lawan bicara."
      },
      {
        "id": "lp-k4b2-5",
        "title": "Contoh soal cerita",
        "desc": "Buku Rp5.000 diskon 10% (Rp500), maka harga bayarnya Rp4.500."
      }
    ],
    "created_at": "2026-11-16T07:02:10.443Z"
  },
  {
    "id": "materi-k4-b3",
    "title": "Kebun Sayur Sekolah",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis rangkaian kalimat yang beragam untuk menjelaskan data serta mengukur luas dan volume dengan satuan persegi dan kubus dan membaca diagram batang.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kelas 4 punya kebun sayur di belakang sekolah. Kebun dibagi menjadi petak-petak persegi yang sama besar. Lahan kangkung terdiri dari 3 baris, setiap baris 4 petak. Lahan bayam terdiri dari 2 baris, setiap baris 5 petak.  \nSetiap minggu, murid mencatat hasil panen kangkung dalam ikat. Mereka juga membuat bak kompos dari kotak-kotak kayu kecil berbentuk kubus. Bak itu panjangnya 3 kotak, lebarnya 2 kotak, dan tingginya 2 kotak.\n\n| Minggu | Hasil Panen Kangkung (Ikat) |\n| :---- | :---- |\n| Minggu 1 | 6 |\n| Minggu 2 | 8 |\n| Minggu 3 | 5 |\n| Minggu 4 | 9 |",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b3-1",
          "title": "* Luas adalah",
          "desc": "* Luas adalah banyaknya persegi satuan yang menutupi bidang (luas persegi panjang = panjang x lebar; lahan kangkung = 3 x 4 = 12 petak; satuan baku: cm2, m2)."
        },
        {
          "id": "lp-k4b3-2",
          "title": "Volume",
          "desc": "banyaknya kubus satuan yang mengisi ruang (bak kompos = 3 x 2 x 2 = 12 kubus satuan; satuan baku: cm3)."
        },
        {
          "id": "lp-k4b3-3",
          "title": "Membaca piktogram dan",
          "desc": "Membaca piktogram dan diagram batang dilakukan dengan melihat keterangan skala dan menarik garis dari ujung batang ke sumbu tegak."
        },
        {
          "id": "lp-k4b3-4",
          "title": "Menulis kalimat beragam",
          "desc": "Menulis kalimat beragam untuk menjelaskan data meliputi kalimat berita, perbandingan, tanya, dan saran."
        },
        {
          "id": "lp-k4b3-5",
          "title": "Contoh soal cerita",
          "desc": "Selisih panen minggu terbanyak (minggu 4 = 9 ikat) dan tersedikit (minggu 3 = 5 ikat) adalah 9 - 5 = 4 ikat."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kebun Sayur Sekolah",
      "questions": [
        {
          "id": "q-k4b3-1",
          "questionText": "Lahan kangkung berbentuk persegi panjang terdiri dari 3 baris, setiap baris 4 petak. Berapakah luas lahan kangkung dalam petak satuan?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "7 petak",
            "10 petak",
            "12 petak",
            "14 petak"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Luas persegi panjang = panjang x lebar = 4 x 3 = 12 petak satuan."
        },
        {
          "id": "q-k4b3-2",
          "questionText": "Bak kompos tersusun dari kubus satuan dengan panjang 3 kotak, lebar 2 kotak, dan tinggi 2 kotak. Berapa volume bak kompos tersebut?",
          "image": "",
          "points": 50,
          "options": [
            "7 kubus satuan",
            "10 kubus satuan",
            "12 kubus satuan",
            "16 kubus satuan"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Volume balok = panjang x lebar x tinggi = 3 x 2 x 2 = 12 kubus satuan."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b3-1",
        "title": "* Luas adalah",
        "desc": "* Luas adalah banyaknya persegi satuan yang menutupi bidang (luas persegi panjang = panjang x lebar; lahan kangkung = 3 x 4 = 12 petak; satuan baku: cm2, m2)."
      },
      {
        "id": "lp-k4b3-2",
        "title": "Volume",
        "desc": "banyaknya kubus satuan yang mengisi ruang (bak kompos = 3 x 2 x 2 = 12 kubus satuan; satuan baku: cm3)."
      },
      {
        "id": "lp-k4b3-3",
        "title": "Membaca piktogram dan",
        "desc": "Membaca piktogram dan diagram batang dilakukan dengan melihat keterangan skala dan menarik garis dari ujung batang ke sumbu tegak."
      },
      {
        "id": "lp-k4b3-4",
        "title": "Menulis kalimat beragam",
        "desc": "Menulis kalimat beragam untuk menjelaskan data meliputi kalimat berita, perbandingan, tanya, dan saran."
      },
      {
        "id": "lp-k4b3-5",
        "title": "Contoh soal cerita",
        "desc": "Selisih panen minggu terbanyak (minggu 4 = 9 ikat) dan tersedikit (minggu 3 = 5 ikat) adalah 9 - 5 = 4 ikat."
      }
    ],
    "created_at": "2026-11-16T08:02:10.443Z"
  },
  {
    "id": "materi-k4-b4",
    "title": "Mengecat Pagar Sekolah",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Memahami fungsi kata hubung (dan, lalu, tetapi, karena) dalam teks serta menjumlahkan dan mengurangkan pecahan berpenyebut sama.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Menjelang ulang tahun sekolah, murid kelas 4 mengecat pagar. Pagar dibagi menjadi 8 bagian yang sama panjang. Hari Senin, kelompok Adi mengecat 3/8 bagian. Hari Selasa, kelompok Mira mengecat 2/8 bagian lagi.  \nMereka ingin selesai pada hari Rabu, tetapi cat tinggal sedikit. Karena itu, Pak Kebun membeli cat baru, lalu semua murid bekerja sama menyelesaikan pagar.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b4-1",
          "title": "* Pada penjumlahan",
          "desc": "* Pada penjumlahan dan pengurangan pecahan berpenyebut sama, hitung pembilangnya saja sedangkan penyebutnya tetap (3/8 + 2/8 = 5/8)."
        },
        {
          "id": "lp-k4b4-2",
          "title": "Satu bagian utuh",
          "desc": "Satu bagian utuh sama dengan pecahan yang pembilang dan penyebutnya sama (1 = 8/8; sisa pagar belum dicat = 8/8 - 5/8 = 3/8)."
        },
        {
          "id": "lp-k4b4-3",
          "title": "Fungsi kata hubung",
          "desc": "\"dan\" (menambahkan), \"lalu\" (urutan), \"tetapi\" (pertentangan), \"karena\" (sebab)."
        },
        {
          "id": "lp-k4b4-4",
          "title": "Contoh soal cerita",
          "desc": "Sisa minyak dari 7/10 liter setelah dipakai 4/10 liter adalah 7/10 - 4/10 = 3/10 liter."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Mengecat Pagar Sekolah",
      "questions": [
        {
          "id": "q-k4b4-1",
          "questionText": "Hari Senin kelompok Adi mengecat 3/8 pagar, hari Selasa kelompok Mira mengecat 2/8 pagar lagi. Berapa total bagian pagar yang sudah dicat?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "5/16 bagian",
            "5/8 bagian",
            "6/8 bagian",
            "1/8 bagian"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! Pada pecahan berpenyebut sama, jumlahkan pembilangnya: 3/8 + 2/8 = 5/8 bagian."
        },
        {
          "id": "q-k4b4-2",
          "questionText": "Seluruh pagar dihitung sebagai 1 bagian utuh (8/8). Berapa sisa bagian pagar yang belum dicat?",
          "image": "",
          "points": 50,
          "options": [
            "2/8 bagian",
            "3/8 bagian",
            "4/8 bagian",
            "5/8 bagian"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! 8/8 dikurangi 5/8 hasilnya 3/8 bagian tersisa."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b4-1",
        "title": "* Pada penjumlahan",
        "desc": "* Pada penjumlahan dan pengurangan pecahan berpenyebut sama, hitung pembilangnya saja sedangkan penyebutnya tetap (3/8 + 2/8 = 5/8)."
      },
      {
        "id": "lp-k4b4-2",
        "title": "Satu bagian utuh",
        "desc": "Satu bagian utuh sama dengan pecahan yang pembilang dan penyebutnya sama (1 = 8/8; sisa pagar belum dicat = 8/8 - 5/8 = 3/8)."
      },
      {
        "id": "lp-k4b4-3",
        "title": "Fungsi kata hubung",
        "desc": "\"dan\" (menambahkan), \"lalu\" (urutan), \"tetapi\" (pertentangan), \"karena\" (sebab)."
      },
      {
        "id": "lp-k4b4-4",
        "title": "Contoh soal cerita",
        "desc": "Sisa minyak dari 7/10 liter setelah dipakai 4/10 liter adalah 7/10 - 4/10 = 3/10 liter."
      }
    ],
    "created_at": "2026-11-16T09:02:10.443Z"
  },
  {
    "id": "materi-k4-b5",
    "title": "Telur dari Peternakan Pak Bowo",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar menuliskan jawaban soal cerita dalam kalimat lengkap serta melakukan perkalian dan pembagian bersusun termasuk pembagian bersisa.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pak Bowo punya peternakan ayam petelur di ujung desa. Setiap hari, ayam-ayamnya menghasilkan 245 butir telur. Telur-telur itu disusun di rak; satu rak berisi 30 butir.  \nPak Bowo menjual telur ke warung-warung di desa. Hari ini ada 6 warung yang memesan, dan setiap warung memesan 2 rak telur.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b5-1",
          "title": "* Perkalian bersusun",
          "desc": "* Perkalian bersusun dikerjakan mulai dari satuan, puluhan, lalu ratusan dengan tetap menambahkan angka simpanan (245 x 7 = 1.715)."
        },
        {
          "id": "lp-k4b5-2",
          "title": "Pembagian dengan sisa",
          "desc": "245 butir dimasukkan ke rak isi 30 menghasilkan 8 rak penuh (30 x 8 = 240) dengan sisa 5 butir. Perhatikan konteks pertanyaan apakah sisa diabaikan atau membutuhkan wadah tambahan."
        },
        {
          "id": "lp-k4b5-3",
          "title": "Menulis jawaban dalam",
          "desc": "Menulis jawaban dalam kalimat lengkap dilakukan dengan mengulang kata kunci pertanyaan beserta satuannya."
        },
        {
          "id": "lp-k4b5-4",
          "title": "Contoh soal cerita",
          "desc": "6 warung memesan masing-masing 2 rak = 12 rak. Total telur = 12 x 30 = 360 butir."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Perkalian sebagai Penjumlahan Berulang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Trik Seru Menghitung Perkalian Cepat",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Telur dari Peternakan Pak Bowo",
      "questions": [
        {
          "id": "q-k4b5-1",
          "questionText": "Pak Bowo mengirim telur ke 6 warung. Setiap warung memesan 2 rak telur, dan tiap rak berisi 30 butir. Berapa butir total telur yang dipesan?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "180 butir",
            "240 butir",
            "360 butir",
            "420 butir"
          ],
          "correctOptionIndex": 2,
          "explanation": "Luar biasa! 6 warung x 2 rak = 12 rak. 12 rak x 30 butir = 360 butir telur."
        },
        {
          "id": "q-k4b5-2",
          "questionText": "Jika ada 245 butir telur dimasukkan ke dalam rak berkapasitas 30 butir, berapa rak yang terisi penuh dan berapa sisa telurnya?",
          "image": "",
          "points": 50,
          "options": [
            "7 rak penuh, sisa 35",
            "8 rak penuh, sisa 5 butir",
            "8 rak penuh, tanpa sisa",
            "9 rak penuh, sisa 10"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! 30 x 8 = 240 butir. Sisanya adalah 245 - 240 = 5 butir telur."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b5-1",
        "title": "* Perkalian bersusun",
        "desc": "* Perkalian bersusun dikerjakan mulai dari satuan, puluhan, lalu ratusan dengan tetap menambahkan angka simpanan (245 x 7 = 1.715)."
      },
      {
        "id": "lp-k4b5-2",
        "title": "Pembagian dengan sisa",
        "desc": "245 butir dimasukkan ke rak isi 30 menghasilkan 8 rak penuh (30 x 8 = 240) dengan sisa 5 butir. Perhatikan konteks pertanyaan apakah sisa diabaikan atau membutuhkan wadah tambahan."
      },
      {
        "id": "lp-k4b5-3",
        "title": "Menulis jawaban dalam",
        "desc": "Menulis jawaban dalam kalimat lengkap dilakukan dengan mengulang kata kunci pertanyaan beserta satuannya."
      },
      {
        "id": "lp-k4b5-4",
        "title": "Contoh soal cerita",
        "desc": "6 warung memesan masing-masing 2 rak = 12 rak. Total telur = 12 x 30 = 360 butir."
      }
    ],
    "created_at": "2026-11-16T10:02:10.443Z"
  },
  {
    "id": "materi-k4-b6",
    "title": "Kursi Pentas Seni",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Melatih membaca puisi dengan lafal, intonasi, dan ekspresi yang tepat serta mengenali dan mengembangkan pola bilangan membesar dan mengecil.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Untuk pentas seni, panitia menyusun kursi penonton di aula. Baris pertama berisi 6 kursi, baris kedua 8 kursi, baris ketiga 10 kursi, dan seterusnya. Pada acara itu, Rara membacakan puisi karyanya sendiri.\n\nKebun Sekolahku  \nTunas kecil tumbuh perlahan,  \ndisiram hujan, disapa mentari.  \nSeperti aku yang terus belajar,  \nsetiap hari, tak kenal henti.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b6-1",
          "title": "* Pola bilangan",
          "desc": "* Pola bilangan dapat membesar dengan penjumlahan (6, 8, 10, 12, 14, ... bertambah 2) atau perkalian (1, 2, 4, 8, ... dikali 2), maupun mengecil dengan pengurangan (100, 90, 80, ... berkurang 10)."
        },
        {
          "id": "lp-k4b6-2",
          "title": "Struktur puisi terdiri",
          "desc": "Struktur puisi terdiri dari larik (baris) dan bait (kumpulan larik)."
        },
        {
          "id": "lp-k4b6-3",
          "title": "Membaca puisi memerlukan",
          "desc": "Membaca puisi memerlukan lafal jelas, jeda pada koma/titik, intonasi, dan ekspresi wajah yang sesuai suasana puisi."
        },
        {
          "id": "lp-k4b6-4",
          "title": "Contoh soal cerita",
          "desc": "Dengan aturan tambah 2, baris ke-6 berisi 14 + 2 = 16 kursi."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Kursi Pentas Seni",
      "questions": [
        {
          "id": "q-k4b6-1",
          "questionText": "Pola kursi di aula: baris 1 ada 6 kursi, baris 2 ada 8 kursi, baris 3 ada 10 kursi. Berapa jumlah kursi pada baris ke-5?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "12 kursi",
            "14 kursi",
            "16 kursi",
            "18 kursi"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! Pola bertambah 2: baris 4 = 12, baris 5 = 14 kursi."
        },
        {
          "id": "q-k4b6-2",
          "questionText": "Puisi yang dibacakan Rara terdiri dari bait dan larik. Arti dari \"larik\" dalam puisi adalah...",
          "image": "",
          "points": 50,
          "options": [
            "Judul puisi",
            "Baris dalam puisi",
            "Paragraf cerita",
            "Nama pengarang"
          ],
          "correctOptionIndex": 1,
          "explanation": "Benar! Larik adalah sebutan untuk baris-baris kalimat dalam karya puisi."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b6-1",
        "title": "* Pola bilangan",
        "desc": "* Pola bilangan dapat membesar dengan penjumlahan (6, 8, 10, 12, 14, ... bertambah 2) atau perkalian (1, 2, 4, 8, ... dikali 2), maupun mengecil dengan pengurangan (100, 90, 80, ... berkurang 10)."
      },
      {
        "id": "lp-k4b6-2",
        "title": "Struktur puisi terdiri",
        "desc": "Struktur puisi terdiri dari larik (baris) dan bait (kumpulan larik)."
      },
      {
        "id": "lp-k4b6-3",
        "title": "Membaca puisi memerlukan",
        "desc": "Membaca puisi memerlukan lafal jelas, jeda pada koma/titik, intonasi, dan ekspresi wajah yang sesuai suasana puisi."
      },
      {
        "id": "lp-k4b6-4",
        "title": "Contoh soal cerita",
        "desc": "Dengan aturan tambah 2, baris ke-6 berisi 14 + 2 = 16 kursi."
      }
    ],
    "created_at": "2026-11-16T11:02:10.443Z"
  },
  {
    "id": "materi-k4-b7",
    "title": "Pagar Kandang Kambing",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis teks petunjuk yang runtut serta menghitung keliling persegi dan persegi panjang dan mengenal jenis sudut.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pak Karto ingin membuat kandang kambing berbentuk persegi panjang di belakang rumahnya. Panjang kandang 6 m dan lebarnya 4 m. Seluruh tepi kandang akan dipagari bambu, kecuali pintu selebar 1 m.  \nAgar kandang kokoh, setiap pojoknya harus membentuk sudut siku-siku. Rina, anak Pak Karto, membantu memeriksa setiap pojok dengan penggaris segitiga.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b7-1",
          "title": "* Rumus keliling:",
          "desc": "* Rumus keliling: Keliling persegi = 4 x sisi; Keliling persegi panjang = 2 x (panjang + lebar). Pada kandang Pak Karto, keliling = 2 x (6 + 4) = 20 m, dikurangi pintu 1 m menjadi 19 m bambu."
        },
        {
          "id": "lp-k4b7-2",
          "title": "Jenis sudut",
          "desc": "siku-siku (tegak lurus seperti pojok buku), lancip (lebih kecil dari siku-siku), tumpul (lebih besar dari siku-siku tetapi belum lurus)."
        },
        {
          "id": "lp-k4b7-3",
          "title": "Menulis teks petunjuk",
          "desc": "Menulis teks petunjuk memuat judul, alat/bahan, dan langkah bernomor yang diawali kata perintah (ukur, catat, jumlahkan)."
        },
        {
          "id": "lp-k4b7-4",
          "title": "Contoh soal cerita",
          "desc": "Kebun persegi bersisi 5 m membutuhkan pagar sepanjang 4 x 5 = 20 m."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Pagar Kandang Kambing",
      "questions": [
        {
          "id": "q-k4b7-1",
          "questionText": "Kandang kambing Pak Karto berbentuk persegi panjang dengan panjang 6 m dan lebar 4 m. Berapakah keliling kandang tersebut sebelum dikurangi pintu?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "10 meter",
            "20 meter",
            "24 meter",
            "19 meter"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Keliling = 2 x (panjang + lebar) = 2 x (6 + 4) = 2 x 10 = 20 meter."
        },
        {
          "id": "q-k4b7-2",
          "questionText": "Sudut yang ukurannya lebih kecil daripada sudut siku-siku (kurang dari 90 derajat) disebut...",
          "image": "",
          "points": 50,
          "options": [
            "Sudut tumpul",
            "Sudut lurus",
            "Sudut lancip",
            "Sudut putar"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Sudut lancip adalah sudut yang lebih runcing atau kurang dari 90 derajat."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b7-1",
        "title": "* Rumus keliling:",
        "desc": "* Rumus keliling: Keliling persegi = 4 x sisi; Keliling persegi panjang = 2 x (panjang + lebar). Pada kandang Pak Karto, keliling = 2 x (6 + 4) = 20 m, dikurangi pintu 1 m menjadi 19 m bambu."
      },
      {
        "id": "lp-k4b7-2",
        "title": "Jenis sudut",
        "desc": "siku-siku (tegak lurus seperti pojok buku), lancip (lebih kecil dari siku-siku), tumpul (lebih besar dari siku-siku tetapi belum lurus)."
      },
      {
        "id": "lp-k4b7-3",
        "title": "Menulis teks petunjuk",
        "desc": "Menulis teks petunjuk memuat judul, alat/bahan, dan langkah bernomor yang diawali kata perintah (ukur, catat, jumlahkan)."
      },
      {
        "id": "lp-k4b7-4",
        "title": "Contoh soal cerita",
        "desc": "Kebun persegi bersisi 5 m membutuhkan pagar sepanjang 4 x 5 = 20 m."
      }
    ],
    "created_at": "2026-11-16T12:02:10.443Z"
  },
  {
    "id": "materi-k4-b8",
    "title": "Toko Kue Bu Ratna",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 4 • Fase B",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menganalisis teks iklan sederhana (informasi, ajakan, klaim) serta menentukan faktor dan kelipatan bilangan dalam masalah sehari-hari.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "KUE BASAH BU RATNA  \nTersedia kemasan isi 4, 6, dan 12 buah!  \nCocok untuk arisan, syukuran, dan ulang tahun.  \nPesan sekarang, dijamin segar setiap hari!  \nBu Ratna menerima pesanan 24 kue lumpur. Ia ingin semua kue masuk ke dalam kotak tanpa ada yang tersisa. Kemasan mana yang bisa ia pakai?",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k4b8-1",
          "title": "* Faktor adalah",
          "desc": "* Faktor adalah bilangan yang membagi habis suatu bilangan (faktor 24: 1, 2, 3, 4, 6, 8, 12, 24). Karena 4, 6, dan 12 adalah faktor 24, semua kemasan bisa dipakai tanpa sisa."
        },
        {
          "id": "lp-k4b8-2",
          "title": "Kelipatan",
          "desc": "hasil kali suatu bilangan dengan bilangan asli (kelipatan 6: 6, 12, 18, 24, 30, ...)."
        },
        {
          "id": "lp-k4b8-3",
          "title": "Menganalisis teks iklan",
          "desc": "Menganalisis teks iklan membedakan antara informasi produk (ukuran kemasan), kalimat ajakan (\"Pesan sekarang\"), dan klaim (\"dijamin segar\")."
        },
        {
          "id": "lp-k4b8-4",
          "title": "Contoh soal cerita:",
          "desc": "Contoh soal cerita: Pesanan 30 kue hanya habis dibagi 6 (30 : 6 = 5 kotak), sehingga hanya kemasan isi 6 yang dapat dipakai tanpa sisa.\n\n# Kelas 5 (Fase C: Penalaran & Literasi Multimodal)"
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Toko Kue Bu Ratna",
      "questions": [
        {
          "id": "q-k4b8-1",
          "questionText": "Bu Ratna ingin mengemas 24 kue lumpur tanpa sisa. Kemasan manakah yang bisa ia gunakan jika pilihannya isi 4, 6, dan 12?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Hanya kemasan isi 4",
            "Hanya kemasan isi 6",
            "Hanya kemasan isi 12",
            "Semua kemasan (4, 6, dan 12) bisa digunakan"
          ],
          "correctOptionIndex": 3,
          "explanation": "Luar biasa! Karena 4, 6, dan 12 semuanya adalah faktor dari 24 (habis membagi 24)."
        },
        {
          "id": "q-k4b8-2",
          "questionText": "Manakah di bawah ini yang merupakan kelipatan dari bilangan 6?",
          "image": "",
          "points": 50,
          "options": [
            "15",
            "20",
            "24",
            "28"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! 6 x 4 = 24, jadi 24 adalah kelipatan 6."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k4b8-1",
        "title": "* Faktor adalah",
        "desc": "* Faktor adalah bilangan yang membagi habis suatu bilangan (faktor 24: 1, 2, 3, 4, 6, 8, 12, 24). Karena 4, 6, dan 12 adalah faktor 24, semua kemasan bisa dipakai tanpa sisa."
      },
      {
        "id": "lp-k4b8-2",
        "title": "Kelipatan",
        "desc": "hasil kali suatu bilangan dengan bilangan asli (kelipatan 6: 6, 12, 18, 24, 30, ...)."
      },
      {
        "id": "lp-k4b8-3",
        "title": "Menganalisis teks iklan",
        "desc": "Menganalisis teks iklan membedakan antara informasi produk (ukuran kemasan), kalimat ajakan (\"Pesan sekarang\"), dan klaim (\"dijamin segar\")."
      },
      {
        "id": "lp-k4b8-4",
        "title": "Contoh soal cerita:",
        "desc": "Contoh soal cerita: Pesanan 30 kue hanya habis dibagi 6 (30 : 6 = 5 kotak), sehingga hanya kemasan isi 6 yang dapat dipakai tanpa sisa.\n\n# Kelas 5 (Fase C: Penalaran & Literasi Multimodal)"
      }
    ],
    "created_at": "2026-11-16T13:02:10.443Z"
  },
  {
    "id": "materi-k5-b1",
    "title": "Menabung untuk Sepeda",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Menganalisis informasi dari teks visual (poster iklan) serta membaca nilai tempat bilangan sampai 1.000.000 dan menyelesaikan masalah keuangan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "TOKO SEPEDA MAJU JAYA  \nSepeda Gunung Anak (Rp850.000)  \nGRATIS helm untuk pembelian bulan Desember!  \nBuka setiap hari pukul 08.00-17.00  \nLaras melihat poster itu di papan pengumuman balai desa. Ia ingin sekali punya sepeda untuk berangkat sekolah. Tabungannya sekarang Rp475.000. Setiap minggu, Laras menabung Rp25.000 dari uang saku dan upah membantu ibunya berjualan di pasar.  \n\"Helmnya gratis, berarti aku harus beli bulan ini!\" kata Laras. Ibu tersenyum, \"Hitung dulu, Nak. Cukup atau belum uangmu?\"",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b1-1",
          "title": "* Nilai tempat",
          "desc": "* Nilai tempat sampai ratus ribuan: 850.000 = 8 ratus ribuan + 5 puluh ribuan. Kelompokkan 3 angka dari kanan untuk memudahkan pembacaan."
        },
        {
          "id": "lp-k5b1-2",
          "title": "Membandingkan bilangan besar",
          "desc": "Membandingkan bilangan besar dilakukan mulai dari nilai tempat paling kiri."
        },
        {
          "id": "lp-k5b1-3",
          "title": "Menyelesaikan masalah uang",
          "desc": "tulis yang diketahui dan ditanyakan, pilih operasi yang tepat (kekurangan = harga - tabungan; lama menabung = kekurangan : tabungan mingguan)."
        },
        {
          "id": "lp-k5b1-4",
          "title": "Menganalisis poster iklan",
          "desc": "Menganalisis poster iklan memisahkan informasi pokok (harga, jam buka) dari kalimat bujukan (\"GRATIS helm!\"), serta mengecek syarat yang berlaku."
        },
        {
          "id": "lp-k5b1-5",
          "title": "Contoh soal cerita",
          "desc": "Kekurangan uang Laras = Rp850.000 - Rp475.000 = Rp375.000. Lama menabung = Rp375.000 : Rp25.000 = 15 minggu."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Menabung untuk Sepeda",
      "questions": [
        {
          "id": "q-k5b1-1",
          "questionText": "Harga sepeda adalah Rp850.000 dan tabungan Laras Rp475.000. Berapa rupiah kekurangan uang yang masih dibutuhkan Laras?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "Rp325.000",
            "Rp375.000",
            "Rp425.000",
            "Rp475.000"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Rp850.000 - Rp475.000 = Rp375.000."
        },
        {
          "id": "q-k5b1-2",
          "questionText": "Jika setiap minggu Laras menabung Rp25.000, berapa minggu ia harus menabung untuk mengumpulkan kekurangan Rp375.000?",
          "image": "",
          "points": 50,
          "options": [
            "10 minggu",
            "12 minggu",
            "15 minggu",
            "18 minggu"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Rp375.000 dibagi Rp25.000 = 15 minggu."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b1-1",
        "title": "* Nilai tempat",
        "desc": "* Nilai tempat sampai ratus ribuan: 850.000 = 8 ratus ribuan + 5 puluh ribuan. Kelompokkan 3 angka dari kanan untuk memudahkan pembacaan."
      },
      {
        "id": "lp-k5b1-2",
        "title": "Membandingkan bilangan besar",
        "desc": "Membandingkan bilangan besar dilakukan mulai dari nilai tempat paling kiri."
      },
      {
        "id": "lp-k5b1-3",
        "title": "Menyelesaikan masalah uang",
        "desc": "tulis yang diketahui dan ditanyakan, pilih operasi yang tepat (kekurangan = harga - tabungan; lama menabung = kekurangan : tabungan mingguan)."
      },
      {
        "id": "lp-k5b1-4",
        "title": "Menganalisis poster iklan",
        "desc": "Menganalisis poster iklan memisahkan informasi pokok (harga, jam buka) dari kalimat bujukan (\"GRATIS helm!\"), serta mengecek syarat yang berlaku."
      },
      {
        "id": "lp-k5b1-5",
        "title": "Contoh soal cerita",
        "desc": "Kekurangan uang Laras = Rp850.000 - Rp475.000 = Rp375.000. Lama menabung = Rp375.000 : Rp25.000 = 15 minggu."
      }
    ],
    "created_at": "2026-11-16T14:02:10.444Z"
  },
  {
    "id": "materi-k5-b2",
    "title": "Resep Es Buah Segar",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Memahami struktur teks prosedur dan mempresentasikan langkahnya secara runtut serta menghitung operasi pecahan campuran, perkalian pecahan, dan desimal.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Es Buah Segar (untuk 4 gelas)  \nBahan: 1 1/2 gelas potongan semangka, 3/4 gelas potongan melon, 1/2 gelas nata de coco, 2 sendok makan sirup, air dingin, dan es batu secukupnya.  \nLangkah-langkah:\n\n1. Cuci tangan dan cuci buah sampai bersih.  \n2. Potong semangka dan melon berbentuk dadu kecil.  \n3. Masukkan semua buah dan nata de coco ke mangkuk besar.  \n4. Tuang air dingin dan sirup, lalu aduk perlahan.  \n5. Tambahkan es batu.  \n6. Sajikan dalam 4 gelas.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b2-1",
          "title": "* Mengubah pecahan",
          "desc": "* Mengubah pecahan campuran ke biasa: (bilangan bulat x penyebut + pembilang) / penyebut (1 1/2 = 3/2 = 1,5)."
        },
        {
          "id": "lp-k5b2-2",
          "title": "Penjumlahan dan pengurangan",
          "desc": "Penjumlahan dan pengurangan pecahan wajib menyamakan penyebut menggunakan KPK terlebih dahulu (1 1/2 + 3/4 + 1/2 = 2 3/4 gelas)."
        },
        {
          "id": "lp-k5b2-3",
          "title": "Mengalikan pecahan dengan",
          "desc": "Mengalikan pecahan dengan bilangan asli: kalikan pembilangnya saja (3/4 x 2 = 6/4 = 1 1/2). Membagi pecahan dengan bilangan asli: kalikan penyebutnya (3/4 : 3 = 3/12 = 1/4)."
        },
        {
          "id": "lp-k5b2-4",
          "title": "Struktur teks prosedur",
          "desc": "Struktur teks prosedur terdiri dari tujuan (judul), bahan/alat, dan langkah berurutan menggunakan kata perintah (cuci, potong, tuang)."
        },
        {
          "id": "lp-k5b2-5",
          "title": "Contoh soal cerita",
          "desc": "Untuk membuat 8 gelas (2 kali resep), dibutuhkan melon sebanyak 3/4 x 2 = 1 1/2 gelas (1,5 gelas)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Resep Es Buah Segar",
      "questions": [
        {
          "id": "q-k5b2-1",
          "questionText": "Resep membutuhkan 1 1/2 gelas semangka dan 1/2 gelas nata de coco. Berapa total gelas kedua bahan tersebut jika digabungkan?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "1 gelas",
            "2 gelas",
            "2 1/2 gelas",
            "3 gelas"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! 1 1/2 + 1/2 = 2 gelas utuh."
        },
        {
          "id": "q-k5b2-2",
          "questionText": "Jika ingin membuat 2 kali lipat resep, berapakah potongan melon yang dibutuhkan dari takaran awal 3/4 gelas?",
          "image": "",
          "points": 50,
          "options": [
            "6/8 gelas",
            "1 1/2 gelas (6/4)",
            "2 gelas",
            "3 gelas"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! (3/4) x 2 = 6/4 = 1 2/4 = 1 1/2 gelas."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b2-1",
        "title": "* Mengubah pecahan",
        "desc": "* Mengubah pecahan campuran ke biasa: (bilangan bulat x penyebut + pembilang) / penyebut (1 1/2 = 3/2 = 1,5)."
      },
      {
        "id": "lp-k5b2-2",
        "title": "Penjumlahan dan pengurangan",
        "desc": "Penjumlahan dan pengurangan pecahan wajib menyamakan penyebut menggunakan KPK terlebih dahulu (1 1/2 + 3/4 + 1/2 = 2 3/4 gelas)."
      },
      {
        "id": "lp-k5b2-3",
        "title": "Mengalikan pecahan dengan",
        "desc": "Mengalikan pecahan dengan bilangan asli: kalikan pembilangnya saja (3/4 x 2 = 6/4 = 1 1/2). Membagi pecahan dengan bilangan asli: kalikan penyebutnya (3/4 : 3 = 3/12 = 1/4)."
      },
      {
        "id": "lp-k5b2-4",
        "title": "Struktur teks prosedur",
        "desc": "Struktur teks prosedur terdiri dari tujuan (judul), bahan/alat, dan langkah berurutan menggunakan kata perintah (cuci, potong, tuang)."
      },
      {
        "id": "lp-k5b2-5",
        "title": "Contoh soal cerita",
        "desc": "Untuk membuat 8 gelas (2 kali resep), dibutuhkan melon sebanyak 3/4 x 2 = 1 1/2 gelas (1,5 gelas)."
      }
    ],
    "created_at": "2026-11-16T15:02:10.444Z"
  },
  {
    "id": "materi-k5-b3",
    "title": "Taman Bermain Balai Desa",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis paragraf deskripsi berdasarkan pengamatan (membedakan fakta dan perasaan) serta menentukan keliling dan luas bangun datar gabungan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pemerintah desa membangun taman bermain di samping balai desa. Bentuk taman seperti huruf L. Bagian pertama berbentuk persegi panjang dengan panjang 12 m dan lebar 8 m. Bagian kedua berbentuk persegi dengan sisi 6 m. Persegi itu menempel di atas ujung kiri persegi panjang, sehingga satu sisinya berimpit sepanjang 6 m.  \nTaman akan ditanami rumput, dan seluruh tepinya akan dipagari bambu. Kepala desa mengajak warga bergotong royong pada hari Minggu.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b3-1",
          "title": "* Luas bangun",
          "desc": "* Luas bangun gabungan dihitung dengan memecah menjadi bangun sederhana lalu menjumlahkan luasnya: (12 x 8) + (6 x 6) = 96 + 36 = 132 m2 (atau mengurangi luas persegi panjang besar dengan bagian kosong: 168 - 36 = 132 m2)."
        },
        {
          "id": "lp-k5b3-2",
          "title": "Keliling bangun gabungan",
          "desc": "jumlah panjang seluruh sisi terluar; sisi yang berimpit di dalam tidak dihitung (12 + 8 + 6 + 6 + 6 + 14 = 52 m)."
        },
        {
          "id": "lp-k5b3-3",
          "title": "Satuan keliling",
          "desc": "satuan panjang (m, cm), sedangkan satuan luas adalah satuan persegi (m2, cm2)."
        },
        {
          "id": "lp-k5b3-4",
          "title": "Menulis deskripsi pengamatan",
          "desc": "Menulis deskripsi pengamatan harus runtut dan memisahkan data fakta (ukuran, bentuk) dari perasaan penulis."
        },
        {
          "id": "lp-k5b3-5",
          "title": "Contoh soal cerita",
          "desc": "Lantai gabungan persegi panjang (5 m x 4 m = 20 m2) dan persegi (2 m x 2 m = 4 m2) memiliki luas 24 m2."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Taman Bermain Balai Desa",
      "questions": [
        {
          "id": "q-k5b3-1",
          "questionText": "Taman terdiri dari persegi panjang (12 m x 8 m) dan persegi (6 m x 6 m). Berapakah luas total taman bermain balai desa?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "96 m²",
            "120 m²",
            "132 m²",
            "144 m²"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Luas 1 = 12 x 8 = 96 m². Luas 2 = 6 x 6 = 36 m². Total = 96 + 36 = 132 m²."
        },
        {
          "id": "q-k5b3-2",
          "questionText": "Dalam menghitung keliling bangun gabungan berbentuk L, bagian sisi yang manakah yang TIDAK boleh ikut dihitung?",
          "image": "",
          "points": 50,
          "options": [
            "Sisi terluar",
            "Sisi yang berimpit di dalam bangun",
            "Sisi paling panjang",
            "Sisi bawah"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! Sisi yang berimpit berada di dalam area gabungan sehingga tidak dihitung sebagai keliling luar."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b3-1",
        "title": "* Luas bangun",
        "desc": "* Luas bangun gabungan dihitung dengan memecah menjadi bangun sederhana lalu menjumlahkan luasnya: (12 x 8) + (6 x 6) = 96 + 36 = 132 m2 (atau mengurangi luas persegi panjang besar dengan bagian kosong: 168 - 36 = 132 m2)."
      },
      {
        "id": "lp-k5b3-2",
        "title": "Keliling bangun gabungan",
        "desc": "jumlah panjang seluruh sisi terluar; sisi yang berimpit di dalam tidak dihitung (12 + 8 + 6 + 6 + 6 + 14 = 52 m)."
      },
      {
        "id": "lp-k5b3-3",
        "title": "Satuan keliling",
        "desc": "satuan panjang (m, cm), sedangkan satuan luas adalah satuan persegi (m2, cm2)."
      },
      {
        "id": "lp-k5b3-4",
        "title": "Menulis deskripsi pengamatan",
        "desc": "Menulis deskripsi pengamatan harus runtut dan memisahkan data fakta (ukuran, bentuk) dari perasaan penulis."
      },
      {
        "id": "lp-k5b3-5",
        "title": "Contoh soal cerita",
        "desc": "Lantai gabungan persegi panjang (5 m x 4 m = 20 m2) dan persegi (2 m x 2 m = 4 m2) memiliki luas 24 m2."
      }
    ],
    "created_at": "2026-11-16T16:02:10.444Z"
  },
  {
    "id": "materi-k5-b4",
    "title": "Jadwal Kerja Bakti dan Bingkisan",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menganalisis kata kunci dalam soal cerita untuk memilih cara penyelesaian masalah yang berkaitan dengan KPK dan FPB.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Di desa ada dua kegiatan rutin. Anggota karang taruna membersihkan saluran air setiap 4 hari sekali. Ibu-ibu PKK merawat taman desa setiap 6 hari sekali. Hari ini, 1 Desember, kedua kelompok bekerja pada hari yang sama.  \nSetelah bekerja, pengurus desa menyiapkan 24 kotak susu dan 36 bungkus roti untuk anak-anak yang ikut membantu. Semua makanan akan dimasukkan ke dalam bingkisan. Setiap bingkisan harus berisi susu dan roti dalam jumlah yang sama, tanpa ada sisa.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b4-1",
          "title": "* Bilangan prima",
          "desc": "* Bilangan prima adalah bilangan yang hanya memiliki dua faktor, yaitu 1 dan dirinya sendiri (2, 3, 5, 7, 11, ...)."
        },
        {
          "id": "lp-k5b4-2",
          "title": "KPK (Kelipatan Persekutuan",
          "desc": "KPK (Kelipatan Persekutuan Terkecil) digunakan untuk jadwal berulang yang terjadi bersamaan lagi (kata kunci: \"bersamaan lagi\", \"bertemu lagi\"). KPK 4 dan 6 = 12, sehingga bertemu lagi 1 + 12 = 13 Desember."
        },
        {
          "id": "lp-k5b4-3",
          "title": "FPB (Faktor Persekutuan",
          "desc": "FPB (Faktor Persekutuan Terbesar) digunakan untuk membagi beberapa barang sama rata ke kelompok sebanyak-banyaknya (kata kunci: \"dibagi sama banyak\", \"sebanyak-banyaknya\"). FPB 24 dan 36 = 12 bingkisan (tiap bingkisan berisi 2 susu dan 3 roti)."
        },
        {
          "id": "lp-k5b4-4",
          "title": "Contoh soal cerita",
          "desc": "Lampu merah berkedip tiap 3 detik dan hijau tiap 5 detik. Keduanya berkedip bersamaan lagi setelah KPK(3, 5) = 15 detik."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Jadwal Kerja Bakti dan Bingkisan",
      "questions": [
        {
          "id": "q-k5b4-1",
          "questionText": "Karang taruna bekerja setiap 4 hari dan ibu-ibu PKK setiap 6 hari. Jika hari ini 1 Desember mereka bekerja bersama, pada tanggal berapakah mereka akan bekerja bersama lagi (KPK 4 dan 6)?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "10 Desember",
            "12 Desember",
            "13 Desember",
            "15 Desember"
          ],
          "correctOptionIndex": 2,
          "explanation": "Luar biasa! KPK dari 4 dan 6 adalah 12 hari. Tanggal 1 + 12 = 13 Desember."
        },
        {
          "id": "q-k5b4-2",
          "questionText": "Tersedia 24 kotak susu dan 36 bungkus roti yang akan dibagi rata ke dalam bingkisan terbanyak tanpa sisa (FPB 24 dan 36). Berapa banyak bingkisan yang dapat dibuat?",
          "image": "",
          "points": 50,
          "options": [
            "6 bingkisan",
            "8 bingkisan",
            "12 bingkisan",
            "18 bingkisan"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! FPB dari 24 dan 36 adalah 12 bingkisan."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b4-1",
        "title": "* Bilangan prima",
        "desc": "* Bilangan prima adalah bilangan yang hanya memiliki dua faktor, yaitu 1 dan dirinya sendiri (2, 3, 5, 7, 11, ...)."
      },
      {
        "id": "lp-k5b4-2",
        "title": "KPK (Kelipatan Persekutuan",
        "desc": "KPK (Kelipatan Persekutuan Terkecil) digunakan untuk jadwal berulang yang terjadi bersamaan lagi (kata kunci: \"bersamaan lagi\", \"bertemu lagi\"). KPK 4 dan 6 = 12, sehingga bertemu lagi 1 + 12 = 13 Desember."
      },
      {
        "id": "lp-k5b4-3",
        "title": "FPB (Faktor Persekutuan",
        "desc": "FPB (Faktor Persekutuan Terbesar) digunakan untuk membagi beberapa barang sama rata ke kelompok sebanyak-banyaknya (kata kunci: \"dibagi sama banyak\", \"sebanyak-banyaknya\"). FPB 24 dan 36 = 12 bingkisan (tiap bingkisan berisi 2 susu dan 3 roti)."
      },
      {
        "id": "lp-k5b4-4",
        "title": "Contoh soal cerita",
        "desc": "Lampu merah berkedip tiap 3 detik dan hijau tiap 5 detik. Keduanya berkedip bersamaan lagi setelah KPK(3, 5) = 15 detik."
      }
    ],
    "created_at": "2026-11-16T17:02:10.444Z"
  },
  {
    "id": "materi-k5-b5",
    "title": "Jarum Jam Menara Balai Desa",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Memahami struktur dan kata sebab-akibat dalam teks eksplanasi serta mengukur besar sudut dalam derajat menggunakan busur dan mengenal jenis sudut.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Di depan balai desa berdiri menara jam yang tinggi. Setiap satu jam, jarum panjangnya berputar satu putaran penuh, yaitu 360 derajat.  \nMuka jam dibagi menjadi 12 angka yang jaraknya sama. Karena itu, sudut antara dua angka yang berdekatan adalah 360° : 12 = 30°. Pada pukul 3.00, kedua jarum membentuk sudut siku-siku, yaitu 90°. Pada pukul 6.00, kedua jarum membentuk garis lurus, yaitu 180°. Itulah sebabnya jam dapat dipakai untuk belajar tentang sudut.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b5-1",
          "title": "* Satu putaran",
          "desc": "* Satu putaran penuh = 360°; setengah putaran = 180°; seperempat putaran = 90°."
        },
        {
          "id": "lp-k5b5-2",
          "title": "Jenis sudut",
          "desc": "lancip (< 90°), siku-siku (90°), tumpul (antara 90° dan 180°), lurus (180°)."
        },
        {
          "id": "lp-k5b5-3",
          "title": "Pada jam tepat,",
          "desc": "Pada jam tepat, setiap selisih 1 angka bernilai 30°. Cara mengukur dengan busur: impitkan titik pusat busur dengan titik sudut dan salah satu kaki sudut dengan angka 0°."
        },
        {
          "id": "lp-k5b5-4",
          "title": "Teks eksplanasi menjelaskan",
          "desc": "Teks eksplanasi menjelaskan proses atau alasan terjadinya sesuatu menggunakan kata sebab-akibat (karena, sehingga, akibatnya, itulah sebabnya)."
        },
        {
          "id": "lp-k5b5-5",
          "title": "Contoh soal cerita",
          "desc": "Pada pukul 5.00, jarak jarum adalah 5 angka, sehingga besar sudutnya 5 x 30° = 150° (sudut tumpul)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengukur Panjang, Berat & Waktu",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Eksperimen Menimbang dan Membandingkan",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Jarum Jam Menara Balai Desa",
      "questions": [
        {
          "id": "q-k5b5-1",
          "questionText": "Besar sudut satu putaran penuh lingkaran pada jam adalah 360 derajat. Berapakah besar sudut antara dua angka jam yang berdekatan (360° : 12)?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "15°",
            "30°",
            "45°",
            "60°"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! 360° dibagi 12 angka = 30° per selisih satu angka."
        },
        {
          "id": "q-k5b5-2",
          "questionText": "Pada pukul 03.00 tepat, sudut terkecil yang dibentuk oleh kedua jarum jam adalah...",
          "image": "",
          "points": 50,
          "options": [
            "45°",
            "60°",
            "90° (sudut siku-siku)",
            "180°"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Jarum berada pada selisih 3 angka: 3 x 30° = 90° (sudut siku-siku)."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b5-1",
        "title": "* Satu putaran",
        "desc": "* Satu putaran penuh = 360°; setengah putaran = 180°; seperempat putaran = 90°."
      },
      {
        "id": "lp-k5b5-2",
        "title": "Jenis sudut",
        "desc": "lancip (< 90°), siku-siku (90°), tumpul (antara 90° dan 180°), lurus (180°)."
      },
      {
        "id": "lp-k5b5-3",
        "title": "Pada jam tepat,",
        "desc": "Pada jam tepat, setiap selisih 1 angka bernilai 30°. Cara mengukur dengan busur: impitkan titik pusat busur dengan titik sudut dan salah satu kaki sudut dengan angka 0°."
      },
      {
        "id": "lp-k5b5-4",
        "title": "Teks eksplanasi menjelaskan",
        "desc": "Teks eksplanasi menjelaskan proses atau alasan terjadinya sesuatu menggunakan kata sebab-akibat (karena, sehingga, akibatnya, itulah sebabnya)."
      },
      {
        "id": "lp-k5b5-5",
        "title": "Contoh soal cerita",
        "desc": "Pada pukul 5.00, jarak jarum adalah 5 angka, sehingga besar sudutnya 5 x 30° = 150° (sudut tumpul)."
      }
    ],
    "created_at": "2026-11-16T18:02:10.444Z"
  },
  {
    "id": "materi-k5-b6",
    "title": "Akuarium Kelas Lima",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar membaca dan menafsirkan petunjuk dalam infografik serta menghitung volume kubus dan balok dan mengonversi satuan cm3 ke liter.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kelas 5 ingin memelihara ikan di akuarium. Sebelumnya, mereka membaca infografik yang ditempel di dinding kelas.  \nMERAWAT IKAN HIAS DI AKUARIUM\n\n1. Isi air sampai 6 cm di bawah bibir akuarium.  \n2. Ganti 1/4 air setiap minggu.  \n3. Beri makan 2 kali sehari, sedikit saja.  \n4. Ingat: 1 liter = 1.000 cm3.  \n   Akuarium kelas berbentuk balok dengan panjang 40 cm, lebar 25 cm, dan tinggi 30 cm.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b6-1",
          "title": "* Rumus volume:",
          "desc": "* Rumus volume: Volume balok = panjang x lebar x tinggi; Volume kubus = sisi x sisi x sisi."
        },
        {
          "id": "lp-k5b6-2",
          "title": "Konversi satuan",
          "desc": "1 liter = 1 dm3 = 1.000 cm3."
        },
        {
          "id": "lp-k5b6-3",
          "title": "Menghitung volume air",
          "desc": "Menghitung volume air menggunakan tinggi air (30 - 6 = 24 cm): volume air = 40 x 25 x 24 = 24.000 cm3 = 24 liter. Air yang diganti mingguan = 1/4 x 24 = 6 liter."
        },
        {
          "id": "lp-k5b6-4",
          "title": "Membaca infografik dimulai",
          "desc": "Membaca infografik dimulai dari judul lalu mencermati angka, satuan, dan instruksi pada tiap poin."
        },
        {
          "id": "lp-k5b6-5",
          "title": "Contoh soal cerita",
          "desc": "Kotak kubus bersisi 10 cm memiliki volume 10 x 10 x 10 = 1.000 cm3 = 1 liter."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Akuarium Kelas Lima",
      "questions": [
        {
          "id": "q-k5b6-1",
          "questionText": "Akuarium berbentuk balok dengan panjang 40 cm, lebar 25 cm, dan tinggi air 24 cm. Berapakah volume air dalam satuan liter (1 liter = 1.000 cm³)?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "12 liter",
            "24 liter",
            "30 liter",
            "40 liter"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! Volume = 40 x 25 x 24 = 24.000 cm³ = 24 liter."
        },
        {
          "id": "q-k5b6-2",
          "questionText": "Menurut petunjuk infografik, jika 1/4 bagian air akuarium harus diganti setiap minggu, berapa liter air yang dikeluarkan dari total 24 liter?",
          "image": "",
          "points": 50,
          "options": [
            "4 liter",
            "6 liter",
            "8 liter",
            "10 liter"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! (1/4) x 24 liter = 6 liter air."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b6-1",
        "title": "* Rumus volume:",
        "desc": "* Rumus volume: Volume balok = panjang x lebar x tinggi; Volume kubus = sisi x sisi x sisi."
      },
      {
        "id": "lp-k5b6-2",
        "title": "Konversi satuan",
        "desc": "1 liter = 1 dm3 = 1.000 cm3."
      },
      {
        "id": "lp-k5b6-3",
        "title": "Menghitung volume air",
        "desc": "Menghitung volume air menggunakan tinggi air (30 - 6 = 24 cm): volume air = 40 x 25 x 24 = 24.000 cm3 = 24 liter. Air yang diganti mingguan = 1/4 x 24 = 6 liter."
      },
      {
        "id": "lp-k5b6-4",
        "title": "Membaca infografik dimulai",
        "desc": "Membaca infografik dimulai dari judul lalu mencermati angka, satuan, dan instruksi pada tiap poin."
      },
      {
        "id": "lp-k5b6-5",
        "title": "Contoh soal cerita",
        "desc": "Kotak kubus bersisi 10 cm memiliki volume 10 x 10 x 10 = 1.000 cm3 = 1 liter."
      }
    ],
    "created_at": "2026-11-16T19:02:10.444Z"
  },
  {
    "id": "materi-k5-b7",
    "title": "Panen Padi Meningkat",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar membaca berita dan menemukan unsur 5W1H serta menghitung persen dari suatu jumlah dan menentukan hasil setelah kenaikan persen.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Panen Padi Desa Sukamaju Naik 20 Persen  \nSukamaju, Senin - Kelompok tani Desa Sukamaju memanen padi di lahan seluas 50 hektare. Tahun lalu, hasil panen mereka sebanyak 200 ton. Tahun ini, hasilnya naik 20 persen.  \nKetua kelompok tani, Pak Joko, mengatakan kenaikan itu terjadi karena petani memakai bibit unggul dan mengatur pengairan sawah dengan baik. Sebanyak 25 persen hasil panen tahun ini akan disimpan di lumbung desa sebagai persediaan.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b7-1",
          "title": "* Persen artinya",
          "desc": "* Persen artinya per seratus (20% = 20/100 = 1/5; 25% = 1/4; 10% = 1/10)."
        },
        {
          "id": "lp-k5b7-2",
          "title": "Menghitung kenaikan persen",
          "desc": "hitung nilai persentasenya dulu lalu tambahkan ke nilai awal. Kenaikan 20% dari 200 ton = 40 ton, sehingga panen tahun ini = 200 + 40 = 240 ton. Padi di lumbung = 1/4 x 240 = 60 ton."
        },
        {
          "id": "lp-k5b7-3",
          "title": "Unsur berita 5W1H",
          "desc": "Apa (peristiwa), Siapa (pelaku/narasumber), Di mana (lokasi), Kapan (waktu), Mengapa (penyebab), Bagaimana (proses/cara)."
        },
        {
          "id": "lp-k5b7-4",
          "title": "Contoh soal cerita",
          "desc": "15% dari 200 ton = 10% (20 ton) + 5% (10 ton) = 30 ton."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Panen Padi Meningkat",
      "questions": [
        {
          "id": "q-k5b7-1",
          "questionText": "Hasil panen tahun lalu 200 ton dan tahun ini naik sebesar 20%. Berapa ton total hasil panen tahun ini?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "220 ton",
            "230 ton",
            "240 ton",
            "250 ton"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Kenaikan 20% dari 200 ton = 40 ton. Total panen = 200 + 40 = 240 ton."
        },
        {
          "id": "q-k5b7-2",
          "questionText": "Dari 240 ton panen, sebanyak 25% (seperempatnya) disimpan di lumbung desa. Berapa ton padi yang disimpan?",
          "image": "",
          "points": 50,
          "options": [
            "50 ton",
            "60 ton",
            "70 ton",
            "80 ton"
          ],
          "correctOptionIndex": 1,
          "explanation": "Keren! 25% = 1/4. Maka 1/4 x 240 ton = 60 ton padi."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b7-1",
        "title": "* Persen artinya",
        "desc": "* Persen artinya per seratus (20% = 20/100 = 1/5; 25% = 1/4; 10% = 1/10)."
      },
      {
        "id": "lp-k5b7-2",
        "title": "Menghitung kenaikan persen",
        "desc": "hitung nilai persentasenya dulu lalu tambahkan ke nilai awal. Kenaikan 20% dari 200 ton = 40 ton, sehingga panen tahun ini = 200 + 40 = 240 ton. Padi di lumbung = 1/4 x 240 = 60 ton."
      },
      {
        "id": "lp-k5b7-3",
        "title": "Unsur berita 5W1H",
        "desc": "Apa (peristiwa), Siapa (pelaku/narasumber), Di mana (lokasi), Kapan (waktu), Mengapa (penyebab), Bagaimana (proses/cara)."
      },
      {
        "id": "lp-k5b7-4",
        "title": "Contoh soal cerita",
        "desc": "15% dari 200 ton = 10% (20 ton) + 5% (10 ton) = 30 ton."
      }
    ],
    "created_at": "2026-11-16T20:02:10.444Z"
  },
  {
    "id": "materi-k5-b8",
    "title": "Lomba Lompat Jauh",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 5 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menulis teks laporan kegiatan sederhana serta membaca, membandingkan, mengurutkan, menjumlahkan, dan mengurangkan bilangan desimal.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pada Pekan Olahraga Sekolah, kelas 5 mengikuti lomba lompat jauh di lapangan. Setiap peserta melompat satu kali, lalu hasilnya dicatat dalam meter.\n\n| Peserta | Hasil Lompatan (m) |\n| :---- | :---- |\n| Andi | 2,45 |\n| Bunga | 2,8 |\n| Citra | 2,54 |\n| Deni | 2,08 |\n\nPanitia akan memberi medali kepada tiga peserta dengan lompatan terjauh.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k5b8-1",
          "title": "* Nilai tempat",
          "desc": "* Nilai tempat desimal: angka pertama setelah koma adalah persepuluhan, angka kedua perseratusan."
        },
        {
          "id": "lp-k5b8-2",
          "title": "Membandingkan desimal dilakukan",
          "desc": "Membandingkan desimal dilakukan dengan menyamakan jumlah angka di belakang koma (2,8 = 2,80). Urutan dari terjauh: 2,80 > 2,54 > 2,45 > 2,08."
        },
        {
          "id": "lp-k5b8-3",
          "title": "Penjumlahan dan pengurangan",
          "desc": "Penjumlahan dan pengurangan desimal dilakukan dengan meluruskan tanda koma ke bawah (2,80 - 2,54 = 0,26 m = 26 cm)."
        },
        {
          "id": "lp-k5b8-4",
          "title": "Menulis laporan kegiatan",
          "desc": "Menulis laporan kegiatan memuat judul, nama kegiatan, waktu/tempat, peserta, hasil, dan penutup."
        },
        {
          "id": "lp-k5b8-5",
          "title": "Contoh soal cerita:",
          "desc": "Contoh soal cerita: Jumlah lompatan Andi dan Deni = 2,45 + 2,08 = 4,53 m.\n\n# Kelas 6 (Fase C: Evaluasi, Analisis Data & Berpikir Kritis)"
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Lomba Lompat Jauh",
      "questions": [
        {
          "id": "q-k5b8-1",
          "questionText": "Hasil lompatan: Andi (2,45 m), Bunga (2,8 m), Citra (2,54 m), Deni (2,08 m). Siapakah peserta yang melompat paling jauh?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Andi",
            "Bunga (2,80 m)",
            "Citra",
            "Deni"
          ],
          "correctOptionIndex": 1,
          "explanation": "Tepat sekali! 2,8 m sama dengan 2,80 m, lebih besar dari 2,54 m, 2,45 m, dan 2,08 m."
        },
        {
          "id": "q-k5b8-2",
          "questionText": "Berapakah selisih panjang lompatan antara Bunga (2,80 m) dan Citra (2,54 m)?",
          "image": "",
          "points": 50,
          "options": [
            "0,24 m",
            "0,26 m",
            "0,34 m",
            "0,36 m"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! 2,80 - 2,54 = 0,26 meter (atau 26 cm)."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k5b8-1",
        "title": "* Nilai tempat",
        "desc": "* Nilai tempat desimal: angka pertama setelah koma adalah persepuluhan, angka kedua perseratusan."
      },
      {
        "id": "lp-k5b8-2",
        "title": "Membandingkan desimal dilakukan",
        "desc": "Membandingkan desimal dilakukan dengan menyamakan jumlah angka di belakang koma (2,8 = 2,80). Urutan dari terjauh: 2,80 > 2,54 > 2,45 > 2,08."
      },
      {
        "id": "lp-k5b8-3",
        "title": "Penjumlahan dan pengurangan",
        "desc": "Penjumlahan dan pengurangan desimal dilakukan dengan meluruskan tanda koma ke bawah (2,80 - 2,54 = 0,26 m = 26 cm)."
      },
      {
        "id": "lp-k5b8-4",
        "title": "Menulis laporan kegiatan",
        "desc": "Menulis laporan kegiatan memuat judul, nama kegiatan, waktu/tempat, peserta, hasil, dan penutup."
      },
      {
        "id": "lp-k5b8-5",
        "title": "Contoh soal cerita:",
        "desc": "Contoh soal cerita: Jumlah lompatan Andi dan Deni = 2,45 + 2,08 = 4,53 m.\n\n# Kelas 6 (Fase C: Evaluasi, Analisis Data & Berpikir Kritis)"
      }
    ],
    "created_at": "2026-11-16T21:02:10.444Z"
  },
  {
    "id": "materi-k6-b1",
    "title": "Takaran Pupuk Pak Darto",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar menganalisis teks secara kritis untuk membedakan fakta dengan opini serta bernalar proporsional menggunakan rasio dan rasio satuan.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pak Darto adalah petani padi di desa kami. Ia membuat pupuk cair sendiri. Petugas penyuluh pertanian mengajarinya mencampur 1 liter cairan pupuk dengan 4 liter air. Jika campurannya terlalu pekat, daun padi bisa layu. Jika terlalu encer, pupuk kurang bermanfaat.  \nPak Darto juga perlu membeli kompos. Toko Subur menjual 5 kg kompos seharga Rp60.000. Toko Makmur menjual 3 kg kompos seharga Rp39.000. Tetangganya berkata, \"Toko Makmur pasti lebih murah karena harganya di bawah Rp40.000.\" Pak Darto memilih menghitung dulu sebelum membeli.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b1-1",
          "title": "* Rasio adalah",
          "desc": "* Rasio adalah perbandingan dua jumlah (cairan pupuk : air = 1 : 4). Urutan rasio sangat penting dan dapat disederhanakan dengan membagi kedua bilangan dengan FPB-nya."
        },
        {
          "id": "lp-k6b1-2",
          "title": "Proporsi",
          "desc": "kesamaan dua rasio (1 : 4 = 2 : 8 = 3 : 12)."
        },
        {
          "id": "lp-k6b1-3",
          "title": "Rasio satuan menghitung",
          "desc": "Rasio satuan menghitung nilai per 1 satuan untuk membandingkan secara adil: Toko Subur = Rp60.000 : 5 = Rp12.000/kg; Toko Makmur = Rp39.000 : 3 = Rp13.000/kg. Jadi Toko Subur lebih murah."
        },
        {
          "id": "lp-k6b1-4",
          "title": "Fakta",
          "desc": "data yang dapat dibuktikan, sedangkan opini adalah pendapat atau dugaan (sering memakai kata pasti, sebaiknya, menurut saya) yang perlu diuji dengan data."
        },
        {
          "id": "lp-k6b1-5",
          "title": "Contoh soal cerita",
          "desc": "Untuk 3 liter cairan pupuk dengan rasio 1 : 4, dibutuhkan 4 x 3 = 12 liter air (total campuran 15 liter)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Perbandingan, Rasio & Skala",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Pengukuran Sudut & Bangun Ruang",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Takaran Pupuk Pak Darto",
      "questions": [
        {
          "id": "q-k6b1-1",
          "questionText": "Rasio campuran pupuk cair terhadap air adalah 1 : 4. Jika Pak Darto menggunakan 3 liter cairan pupuk, berapa liter air yang harus ditambahkan?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "7 liter",
            "10 liter",
            "12 liter",
            "15 liter"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Rasio 1 : 4, jika pupuk 3 liter maka air = 3 x 4 = 12 liter."
        },
        {
          "id": "q-k6b1-2",
          "questionText": "Toko Subur menjual kompos Rp60.000 untuk 5 kg (Rp12.000/kg). Toko Makmur menjual Rp39.000 untuk 3 kg (Rp13.000/kg). Toko mana yang lebih murah per kilogramnya?",
          "image": "",
          "points": 50,
          "options": [
            "Toko Subur",
            "Toko Makmur",
            "Harganya sama persis",
            "Tidak bisa dihitung"
          ],
          "correctOptionIndex": 0,
          "explanation": "Keren! Menghitung rasio satuan per 1 kg membuktikan Toko Subur (Rp12.000) lebih murah daripada Toko Makmur (Rp13.000)."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b1-1",
        "title": "* Rasio adalah",
        "desc": "* Rasio adalah perbandingan dua jumlah (cairan pupuk : air = 1 : 4). Urutan rasio sangat penting dan dapat disederhanakan dengan membagi kedua bilangan dengan FPB-nya."
      },
      {
        "id": "lp-k6b1-2",
        "title": "Proporsi",
        "desc": "kesamaan dua rasio (1 : 4 = 2 : 8 = 3 : 12)."
      },
      {
        "id": "lp-k6b1-3",
        "title": "Rasio satuan menghitung",
        "desc": "Rasio satuan menghitung nilai per 1 satuan untuk membandingkan secara adil: Toko Subur = Rp60.000 : 5 = Rp12.000/kg; Toko Makmur = Rp39.000 : 3 = Rp13.000/kg. Jadi Toko Subur lebih murah."
      },
      {
        "id": "lp-k6b1-4",
        "title": "Fakta",
        "desc": "data yang dapat dibuktikan, sedangkan opini adalah pendapat atau dugaan (sering memakai kata pasti, sebaiknya, menurut saya) yang perlu diuji dengan data."
      },
      {
        "id": "lp-k6b1-5",
        "title": "Contoh soal cerita",
        "desc": "Untuk 3 liter cairan pupuk dengan rasio 1 : 4, dibutuhkan 4 x 3 = 12 liter air (total campuran 15 liter)."
      }
    ],
    "created_at": "2026-11-16T22:02:10.444Z"
  },
  {
    "id": "materi-k6-b2",
    "title": "Peta Harta Karun Perkemahan",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Belajar menulis teks petunjuk arah yang runtut dan jelas serta menentukan lokasi pada peta berpetak, mengenal ciri kubus dan balok, dan tampak bangun ruang.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pramuka kelas 6 berkemah di lapangan desa. Kak Pembina membuat permainan mencari harta karun. Setiap regu mendapat peta berpetak. Kolom diberi huruf A sampai F dari kiri ke kanan. Baris diberi angka 1 sampai 6 dari atas ke bawah.  \nTenda regu Elang ada di petak B2. Tiang bendera ada di petak D4. Petunjuknya berbunyi: \"Dari tiang bendera, berjalanlah 1 petak ke kanan, lalu 1 petak ke bawah. Di sana ada kotak kayu berisi harta karun.\"  \nKotak kayu itu berbentuk balok. Kotak itu disusun dari kubus-kubus kecil: panjangnya 4 kubus, lebarnya 2 kubus, dan tingginya 3 kubus.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b2-1",
          "title": "* Peta berpetak",
          "desc": "* Peta berpetak dibaca huruf kolom dulu lalu angka baris (D4 = kolom D, baris 4). Bergerak ke kanan memajukan huruf, ke bawah menambah angka."
        },
        {
          "id": "lp-k6b2-2",
          "title": "Kubus dan balok",
          "desc": "Kubus dan balok sama-sama memiliki 6 sisi, 12 rusuk, dan 8 titik sudut. Sisi kubus semuanya persegi sama besar, sedangkan balok memiliki sisi berbentuk persegi panjang."
        },
        {
          "id": "lp-k6b2-3",
          "title": "Banyak kubus satuan penyusun balok",
          "desc": "4 x 2 x 3 = 24 kubus. Tampak bangun ruang meliputi tampak depan (panjang x tinggi), tampak atas (panjang x lebar), dan tampak samping (lebar x tinggi)."
        },
        {
          "id": "lp-k6b2-4",
          "title": "Menulis petunjuk arah",
          "desc": "Menulis petunjuk arah menyebutkan titik awal, arah, jumlah petak/langkah, patokan, dan tujuan akhir dengan kata urutan."
        },
        {
          "id": "lp-k6b2-5",
          "title": "Contoh soal cerita",
          "desc": "Dari B2 ke D4 berjalan 2 petak ke kanan (B ke D) lalu 2 petak ke bawah (2 ke 4)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Perbandingan, Rasio & Skala",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Pengukuran Sudut & Bangun Ruang",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Peta Harta Karun Perkemahan",
      "questions": [
        {
          "id": "q-k6b2-1",
          "questionText": "Pada peta berpetak, tiang bendera ada di D4. Jika regu berjalan 1 petak ke kanan lalu 1 petak ke bawah, di manakah posisi harta karun?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "C3",
            "E5",
            "E3",
            "D5"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! Dari kolom D ke kanan menjadi E, dari baris 4 ke bawah menjadi 5 (petak E5)."
        },
        {
          "id": "q-k6b2-2",
          "questionText": "Kotak harta karun tersusun dari kubus kecil: panjang 4 kubus, lebar 2 kubus, tinggi 3 kubus. Berapa banyak kubus satuan penyusunnya?",
          "image": "",
          "points": 50,
          "options": [
            "9 kubus",
            "18 kubus",
            "24 kubus",
            "32 kubus"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! Volume = panjang x lebar x tinggi = 4 x 2 x 3 = 24 kubus satuan."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b2-1",
        "title": "* Peta berpetak",
        "desc": "* Peta berpetak dibaca huruf kolom dulu lalu angka baris (D4 = kolom D, baris 4). Bergerak ke kanan memajukan huruf, ke bawah menambah angka."
      },
      {
        "id": "lp-k6b2-2",
        "title": "Kubus dan balok",
        "desc": "Kubus dan balok sama-sama memiliki 6 sisi, 12 rusuk, dan 8 titik sudut. Sisi kubus semuanya persegi sama besar, sedangkan balok memiliki sisi berbentuk persegi panjang."
      },
      {
        "id": "lp-k6b2-3",
        "title": "Banyak kubus satuan penyusun balok",
        "desc": "4 x 2 x 3 = 24 kubus. Tampak bangun ruang meliputi tampak depan (panjang x tinggi), tampak atas (panjang x lebar), dan tampak samping (lebar x tinggi)."
      },
      {
        "id": "lp-k6b2-4",
        "title": "Menulis petunjuk arah",
        "desc": "Menulis petunjuk arah menyebutkan titik awal, arah, jumlah petak/langkah, patokan, dan tujuan akhir dengan kata urutan."
      },
      {
        "id": "lp-k6b2-5",
        "title": "Contoh soal cerita",
        "desc": "Dari B2 ke D4 berjalan 2 petak ke kanan (B ke D) lalu 2 petak ke bawah (2 ke 4)."
      }
    ],
    "created_at": "2026-11-16T23:02:10.444Z"
  },
  {
    "id": "materi-k6-b3",
    "title": "Survei Botol Minum Kelas 6",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Melatih kemampuan menguji klaim dengan data secara kritis serta menyajikan dan menganalisis data dalam tabel frekuensi dan diagram batang.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kelas 6 sedang belajar tentang sampah plastik. Mereka melakukan survei kepada 30 murid kelas 6 tentang wadah minum yang dibawa ke sekolah. Setiap jawaban dicatat dengan turus, lalu dihitung menjadi tabel frekuensi.\n\n| Wadah Minum | Frekuensi (Jumlah Murid) |\n| :---- | :---- |\n| Botol isi ulang | 12 |\n| Botol plastik sekali pakai | 9 |\n| Gelas plastik sekali pakai | 6 |\n| Tidak membawa minum | 3 |\n\nKeesokan harinya, sebuah tulisan di majalah dinding berbunyi: \"Sebagian besar murid kelas 6 sudah membawa botol isi ulang!\"",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b3-1",
          "title": "* Tabel frekuensi",
          "desc": "* Tabel frekuensi mencatat banyaknya kemunculan data yang dihitung menggunakan turus (dikelompokkan per 5)."
        },
        {
          "id": "lp-k6b3-2",
          "title": "Menguji klaim dilakukan",
          "desc": "Menguji klaim dilakukan dengan mengubah kata kuantitas menjadi angka: \"sebagian besar\" berarti lebih dari setengah (> 15 dari 30 murid). Karena botol isi ulang hanya 12 murid, klaim tersebut salah (paling banyak dipilih, namun belum sebagian besar)."
        },
        {
          "id": "lp-k6b3-3",
          "title": "Waspadai grafik visual",
          "desc": "Waspadai grafik visual yang sumbu tegaknya tidak dimulai dari 0 karena dapat mengecoh perbandingan."
        },
        {
          "id": "lp-k6b3-4",
          "title": "Contoh soal cerita",
          "desc": "Selisih pemakai botol isi ulang (12) dan gelas plastik (6) adalah 12 - 6 = 6 murid."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Membaca Piktogram dan Diagram Batang",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Menghitung Frekuensi dan Menyajikan Data",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Survei Botol Minum Kelas 6",
      "questions": [
        {
          "id": "q-k6b3-1",
          "questionText": "Dari 30 murid: 12 membawa botol isi ulang, 9 botol sekali pakai, 6 gelas plastik, dan 3 tidak bawa. Apakah klaim mading bahwa \"sebagian besar murid membawa botol isi ulang\" tepat?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "Tepat, karena 12 adalah angka terbanyak",
            "Tidak tepat, karena sebagian besar berarti harus lebih dari 15 murid (> 50%)",
            "Tepat, karena lebih dari 10 murid",
            "Tidak ada yang benar"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hebat! Berpikir kritis: kata \"sebagian besar\" berarti lebih dari separuh (> 15 dari 30 murid). Walaupun 12 terbanyak, 12 belum mencapai sebagian besar."
        },
        {
          "id": "q-k6b3-2",
          "questionText": "Berapa banyak murid yang membawa wadah minum plastik sekali pakai (botol dan gelas plastik)?",
          "image": "",
          "points": 50,
          "options": [
            "9 murid",
            "12 murid",
            "15 murid",
            "18 murid"
          ],
          "correctOptionIndex": 2,
          "explanation": "Bagus! 9 botol plastik + 6 gelas plastik = 15 murid."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b3-1",
        "title": "* Tabel frekuensi",
        "desc": "* Tabel frekuensi mencatat banyaknya kemunculan data yang dihitung menggunakan turus (dikelompokkan per 5)."
      },
      {
        "id": "lp-k6b3-2",
        "title": "Menguji klaim dilakukan",
        "desc": "Menguji klaim dilakukan dengan mengubah kata kuantitas menjadi angka: \"sebagian besar\" berarti lebih dari setengah (> 15 dari 30 murid). Karena botol isi ulang hanya 12 murid, klaim tersebut salah (paling banyak dipilih, namun belum sebagian besar)."
      },
      {
        "id": "lp-k6b3-3",
        "title": "Waspadai grafik visual",
        "desc": "Waspadai grafik visual yang sumbu tegaknya tidak dimulai dari 0 karena dapat mengecoh perbandingan."
      },
      {
        "id": "lp-k6b3-4",
        "title": "Contoh soal cerita",
        "desc": "Selisih pemakai botol isi ulang (12) dan gelas plastik (6) adalah 12 - 6 = 6 murid."
      }
    ],
    "created_at": "2026-11-17T00:02:10.444Z"
  },
  {
    "id": "materi-k6-b4",
    "title": "Undian Doorprize Jalan Sehat",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menyampaikan gagasan berbasis fakta dan imajinasi serta menentukan kejadian yang kemungkinannya lebih besar atau lebih kecil dalam percobaan acak.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Pada acara jalan sehat desa, panitia menyiapkan undian doorprize. Di dalam kotak undian ada 50 kupon: 30 kupon bertuliskan \"payung\", 15 kupon \"kipas angin\", dan 5 kupon \"sepeda\". Semua kupon sama bentuk dan ukurannya, lalu diaduk sampai tercampur.  \nBima bersemangat. \"Aku yakin pasti dapat sepeda!\" katanya. Ayahnya tersenyum. \"Mungkin saja, Nak. Tapi coba lihat dulu berapa banyak kupon sepeda di kotak itu.\"",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b4-1",
          "title": "* Peluang menunjukkan",
          "desc": "* Peluang menunjukkan seberapa mungkin suatu kejadian terjadi pada percobaan acak (mengambil kupon, melempar koin/dadu)."
        },
        {
          "id": "lp-k6b4-2",
          "title": "Skala kemungkinan",
          "desc": "tidak mungkin (0) -> kecil kemungkinannya -> sama besar -> besar kemungkinannya -> pasti."
        },
        {
          "id": "lp-k6b4-3",
          "title": "Membandingkan kemungkinan berdasarkan",
          "desc": "Membandingkan kemungkinan berdasarkan jumlah kupon: payung (30/50 = 3/5), kipas angin (15/50 = 3/10), sepeda (5/50 = 1/10). Televisi tidak mungkin karena kuponnya 0\\."
        },
        {
          "id": "lp-k6b4-4",
          "title": "Menulis berbasis fakta",
          "desc": "Menulis berbasis fakta dan imajinasi tetap harus logis sesuai fakta yang ada dalam cerita."
        },
        {
          "id": "lp-k6b4-5",
          "title": "Contoh soal cerita",
          "desc": "Melempar dadu sekali, muncul angka genap (2, 4, 6 -> 3 kemungkinan) lebih mungkin daripada muncul angka 6 (1 kemungkinan)."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Perbandingan, Rasio & Skala",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Pengukuran Sudut & Bangun Ruang",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Undian Doorprize Jalan Sehat",
      "questions": [
        {
          "id": "q-k6b4-1",
          "questionText": "Kotak undian berisi 50 kupon: 30 kupon payung, 15 kupon kipas angin, dan 5 kupon sepeda. Hadiah manakah yang kemungkinannya paling besar didapatkan peserta?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "Sepeda",
            "Kipas angin",
            "Payung",
            "Semua sama"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Kupon payung ada 30 dari 50 (3/5), paling banyak dibandingkan hadiah lainnya."
        },
        {
          "id": "q-k6b4-2",
          "questionText": "Berapakah peluang atau rasio kemungkinan terambilnya kupon sepeda dari kotak (5 dari 50 kupon)?",
          "image": "",
          "points": 50,
          "options": [
            "1/5",
            "1/10",
            "1/2",
            "5/10"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! 5/50 disederhanakan dengan membagi 5 menjadi 1/10."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b4-1",
        "title": "* Peluang menunjukkan",
        "desc": "* Peluang menunjukkan seberapa mungkin suatu kejadian terjadi pada percobaan acak (mengambil kupon, melempar koin/dadu)."
      },
      {
        "id": "lp-k6b4-2",
        "title": "Skala kemungkinan",
        "desc": "tidak mungkin (0) -> kecil kemungkinannya -> sama besar -> besar kemungkinannya -> pasti."
      },
      {
        "id": "lp-k6b4-3",
        "title": "Membandingkan kemungkinan berdasarkan",
        "desc": "Membandingkan kemungkinan berdasarkan jumlah kupon: payung (30/50 = 3/5), kipas angin (15/50 = 3/10), sepeda (5/50 = 1/10). Televisi tidak mungkin karena kuponnya 0\\."
      },
      {
        "id": "lp-k6b4-4",
        "title": "Menulis berbasis fakta",
        "desc": "Menulis berbasis fakta dan imajinasi tetap harus logis sesuai fakta yang ada dalam cerita."
      },
      {
        "id": "lp-k6b4-5",
        "title": "Contoh soal cerita",
        "desc": "Melempar dadu sekali, muncul angka genap (2, 4, 6 -> 3 kemungkinan) lebih mungkin daripada muncul angka 6 (1 kemungkinan)."
      }
    ],
    "created_at": "2026-11-17T01:02:10.444Z"
  },
  {
    "id": "materi-k6-b5",
    "title": "Belanja Perlengkapan Kemah",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Materi.jpg",
    "description": "Belajar memahami teks instruksi yang memuat beberapa syarat serta menyelesaikan operasi hitung campuran dengan urutan pengerjaan yang benar.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Regu Elang mendapat tugas dari Kak Pembina: \"Belilah perlengkapan kemah dengan uang kas Rp150.000. Syaratnya, beli 4 botol air mineral besar, 2 bungkus roti, dan 1 senter. Simpan sisa uang di kotak kas, lalu catat semua pengeluaran di buku regu.\"  \nDi toko, harga air mineral besar Rp6.000 per botol, roti Rp12.500 per bungkus, dan senter Rp45.000.",
      "image": "/Banner_Materi.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b5-1",
          "title": "* Urutan pengerjaan",
          "desc": "* Urutan pengerjaan operasi hitung campuran: (1) operasi dalam tanda kurung, (2) perkalian dan pembagian setingkat dikerjakan dari kiri ke kanan, (3) penjumlahan dan pengurangan setingkat dikerjakan dari kiri ke kanan."
        },
        {
          "id": "lp-k6b5-2",
          "title": "Perhitungan belanja",
          "desc": "(4 x 6.000) + (2 x 12.500) + 45.000 = 24.000 + 25.000 + 45.000 = Rp94.000. Sisa uang = 150.000 - 94.000 = Rp56.000."
        },
        {
          "id": "lp-k6b5-3",
          "title": "Membaca instruksi bersyarat",
          "desc": "Membaca instruksi bersyarat dilakukan dengan menandai setiap kata kerja perintah dan batasan syaratnya lalu memeriksa kelengkapannya."
        },
        {
          "id": "lp-k6b5-4",
          "title": "Contoh soal cerita",
          "desc": "100 - 4 x 15 + 10 = 100 - 60 + 10 = 40 + 10 = 50\\."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Belanja Perlengkapan Kemah",
      "questions": [
        {
          "id": "q-k6b5-1",
          "questionText": "Regu Elang membeli: 4 botol air mineral (@Rp6.000), 2 bungkus roti (@Rp12.500), dan 1 senter (@Rp45.000). Berapakah total biaya belanja?",
          "image": "/Banner_Materi.jpg",
          "points": 50,
          "options": [
            "Rp84.000",
            "Rp94.000",
            "Rp98.000",
            "Rp104.000"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! (4 x 6.000) + (2 x 12.500) + 45.000 = 24.000 + 25.000 + 45.000 = Rp94.000."
        },
        {
          "id": "q-k6b5-2",
          "questionText": "Jika uang kas yang dibawa adalah Rp150.000, berapa sisa uang kas yang harus disimpan kembali di kotak kas?",
          "image": "",
          "points": 50,
          "options": [
            "Rp46.000",
            "Rp54.000",
            "Rp56.000",
            "Rp66.000"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Rp150.000 - Rp94.000 = Rp56.000."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b5-1",
        "title": "* Urutan pengerjaan",
        "desc": "* Urutan pengerjaan operasi hitung campuran: (1) operasi dalam tanda kurung, (2) perkalian dan pembagian setingkat dikerjakan dari kiri ke kanan, (3) penjumlahan dan pengurangan setingkat dikerjakan dari kiri ke kanan."
      },
      {
        "id": "lp-k6b5-2",
        "title": "Perhitungan belanja",
        "desc": "(4 x 6.000) + (2 x 12.500) + 45.000 = 24.000 + 25.000 + 45.000 = Rp94.000. Sisa uang = 150.000 - 94.000 = Rp56.000."
      },
      {
        "id": "lp-k6b5-3",
        "title": "Membaca instruksi bersyarat",
        "desc": "Membaca instruksi bersyarat dilakukan dengan menandai setiap kata kerja perintah dan batasan syaratnya lalu memeriksa kelengkapannya."
      },
      {
        "id": "lp-k6b5-4",
        "title": "Contoh soal cerita",
        "desc": "100 - 4 x 15 + 10 = 100 - 60 + 10 = 40 + 10 = 50\\."
      }
    ],
    "created_at": "2026-11-17T02:02:10.444Z"
  },
  {
    "id": "materi-k6-b6",
    "title": "Sumur dan Tampah Nenek",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/es_batu_card.jpg",
    "description": "Memahami teks eksplanasi tentang benda berbentuk bundar di sekitar serta mengenal unsur lingkaran dan menghitung keliling serta luas lingkaran.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Di belakang rumah Nenek ada sumur tua berbentuk lingkaran. Diameter bibir sumur itu 70 cm. Nenek juga punya tampah, yaitu wadah bundar dari anyaman bambu untuk menampi beras. Jari-jari tampah itu 28 cm.  \nMengapa banyak benda dibuat bundar? Bentuk lingkaran tidak punya sudut, sehingga tekanan dari segala arah tersebar merata dan benda menjadi lebih kuat. Bentuk bundar juga mudah diputar. Itulah sebabnya roda, sumur, dan tampah dibuat berbentuk lingkaran.",
      "image": "/es_batu_card.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b6-1",
          "title": "* Unsur lingkaran:",
          "desc": "* Unsur lingkaran: titik pusat, jari-jari (r), dan diameter (d = 2 x r)."
        },
        {
          "id": "lp-k6b6-2",
          "title": "Rumus keliling lingkaran",
          "desc": "pi x d (atau 2 x pi x r). Rumus luas lingkaran = pi x r x r. Gunakan pi = 22/7 untuk kelipatan 7, dan pi = 3,14 untuk bilangan lainnya."
        },
        {
          "id": "lp-k6b6-3",
          "title": "Keliling sumur (d",
          "desc": "70 cm) = 22/7 x 70 = 220 cm. Luas tampah (r = 28 cm) = 22/7 x 28 x 28 = 2.464 cm2."
        },
        {
          "id": "lp-k6b6-4",
          "title": "Teks eksplanasi menjelaskan",
          "desc": "Teks eksplanasi menjelaskan alasan/proses suatu fenomena menggunakan kata hubung sebab-akibat (sehingga, karena, itulah sebabnya)."
        },
        {
          "id": "lp-k6b6-5",
          "title": "Contoh soal cerita",
          "desc": "Keliling bibir sumur berdiameter 70 cm adalah 22/7 x 70 = 220 cm."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Mengenal Segitiga, Segi Empat, dan Lingkaran",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Berkreasi Menyusun Pola dan Bentuk",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Sumur dan Tampah Nenek",
      "questions": [
        {
          "id": "q-k6b6-1",
          "questionText": "Bibir sumur memiliki diameter 70 cm. Berapakah keliling lingkaran bibir sumur tersebut menggunakan nilai pi = 22/7 (Keliling = pi x d)?",
          "image": "/es_batu_card.jpg",
          "points": 50,
          "options": [
            "140 cm",
            "210 cm",
            "220 cm",
            "240 cm"
          ],
          "correctOptionIndex": 2,
          "explanation": "Pintar! Keliling = (22/7) x 70 cm = 22 x 10 = 220 cm."
        },
        {
          "id": "q-k6b6-2",
          "questionText": "Tampah nenek memiliki jari-jari (r) 28 cm. Berapakah diameter tampah tersebut (d = 2 x r)?",
          "image": "",
          "points": 50,
          "options": [
            "14 cm",
            "42 cm",
            "56 cm",
            "70 cm"
          ],
          "correctOptionIndex": 2,
          "explanation": "Keren! Diameter adalah dua kali panjang jari-jari: 2 x 28 cm = 56 cm."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b6-1",
        "title": "* Unsur lingkaran:",
        "desc": "* Unsur lingkaran: titik pusat, jari-jari (r), dan diameter (d = 2 x r)."
      },
      {
        "id": "lp-k6b6-2",
        "title": "Rumus keliling lingkaran",
        "desc": "pi x d (atau 2 x pi x r). Rumus luas lingkaran = pi x r x r. Gunakan pi = 22/7 untuk kelipatan 7, dan pi = 3,14 untuk bilangan lainnya."
      },
      {
        "id": "lp-k6b6-3",
        "title": "Keliling sumur (d",
        "desc": "70 cm) = 22/7 x 70 = 220 cm. Luas tampah (r = 28 cm) = 22/7 x 28 x 28 = 2.464 cm2."
      },
      {
        "id": "lp-k6b6-4",
        "title": "Teks eksplanasi menjelaskan",
        "desc": "Teks eksplanasi menjelaskan alasan/proses suatu fenomena menggunakan kata hubung sebab-akibat (sehingga, karena, itulah sebabnya)."
      },
      {
        "id": "lp-k6b6-5",
        "title": "Contoh soal cerita",
        "desc": "Keliling bibir sumur berdiameter 70 cm adalah 22/7 x 70 = 220 cm."
      }
    ],
    "created_at": "2026-11-17T03:02:10.444Z"
  },
  {
    "id": "materi-k6-b7",
    "title": "Tinggi Tanaman Kacang Hijau",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard.jpg",
    "description": "Belajar menulis kesimpulan laporan percobaan berdasarkan data serta menentukan rata-rata (mean), median, dan modus dari sekumpulan data.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Kelas 6 melakukan percobaan menanam kacang hijau di 8 gelas plastik. Setiap gelas diberi kapas basah dan disiram setiap pagi. Gelas-gelas itu diletakkan di tempat yang berbeda di dalam kelas.  \nSetelah 7 hari, tinggi tanaman diukur dalam sentimeter: 8, 10, 7, 10, 12, 9, 10, 6\\. Tanaman tertinggi (12 cm) berada di dekat jendela yang terkena cahaya matahari. Tanaman terpendek (6 cm) berada di pojok kelas yang gelap.",
      "image": "/Banner_Dashboard.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b7-1",
          "title": "* Rata-rata (mean)",
          "desc": "* Rata-rata (mean) = jumlah seluruh data dibagi banyak data (72 : 8 = 9 cm)."
        },
        {
          "id": "lp-k6b7-2",
          "title": "Median",
          "desc": "nilai tengah setelah data diurutkan dari terkecil (6, 7, 8, 9, 10, 10, 10, 12 -> karena genap, median = (9 + 10) : 2 = 9,5 cm)."
        },
        {
          "id": "lp-k6b7-3",
          "title": "Modus",
          "desc": "nilai yang paling sering muncul (10 cm, muncul sebanyak 3 kali)."
        },
        {
          "id": "lp-k6b7-4",
          "title": "Menulis kesimpulan percobaan",
          "desc": "Menulis kesimpulan percobaan harus menjawab tujuan percobaan, menyertakan angka pendukung, dan menyebutkan faktor yang memengaruhi hasil."
        },
        {
          "id": "lp-k6b7-5",
          "title": "Contoh soal cerita",
          "desc": "Data 5, 7, 3, 9, 6 memiliki rata-rata 30 : 5 = 6 dan median (setelah diurutkan 3, 5, 6, 7, 9) adalah 6\\."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Konsep Penjumlahan Benda Konkret",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Lagu & Cerita Belajar Berhitung",
        "url": "https://res.cloudinary.com/demo/video/upload/elephants.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Tinggi Tanaman Kacang Hijau",
      "questions": [
        {
          "id": "q-k6b7-1",
          "questionText": "Data tinggi 8 tanaman kacang hijau (cm): 6, 7, 8, 9, 10, 10, 10, 12 (jumlah total = 72). Berapakah rata-rata (mean) tinggi tanaman?",
          "image": "/Banner_Dashboard.jpg",
          "points": 50,
          "options": [
            "8 cm",
            "9 cm",
            "10 cm",
            "11 cm"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! Rata-rata = 72 dibagi 8 tanaman = 9 cm."
        },
        {
          "id": "q-k6b7-2",
          "questionText": "Nilai tinggi tanaman yang paling sering muncul (modus) pada percobaan tersebut adalah...",
          "image": "",
          "points": 50,
          "options": [
            "8 cm",
            "9 cm",
            "10 cm (muncul 3 kali)",
            "12 cm"
          ],
          "correctOptionIndex": 2,
          "explanation": "Hebat! Nilai 10 cm muncul sebanyak 3 kali, paling sering dibanding angka lainnya."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b7-1",
        "title": "* Rata-rata (mean)",
        "desc": "* Rata-rata (mean) = jumlah seluruh data dibagi banyak data (72 : 8 = 9 cm)."
      },
      {
        "id": "lp-k6b7-2",
        "title": "Median",
        "desc": "nilai tengah setelah data diurutkan dari terkecil (6, 7, 8, 9, 10, 10, 10, 12 -> karena genap, median = (9 + 10) : 2 = 9,5 cm)."
      },
      {
        "id": "lp-k6b7-3",
        "title": "Modus",
        "desc": "nilai yang paling sering muncul (10 cm, muncul sebanyak 3 kali)."
      },
      {
        "id": "lp-k6b7-4",
        "title": "Menulis kesimpulan percobaan",
        "desc": "Menulis kesimpulan percobaan harus menjawab tujuan percobaan, menyertakan angka pendukung, dan menyebutkan faktor yang memengaruhi hasil."
      },
      {
        "id": "lp-k6b7-5",
        "title": "Contoh soal cerita",
        "desc": "Data 5, 7, 3, 9, 6 memiliki rata-rata 30 : 5 = 6 dan median (setelah diurutkan 3, 5, 6, 7, 9) adalah 6\\."
      }
    ],
    "created_at": "2026-11-17T04:02:10.444Z"
  },
  {
    "id": "materi-k6-b8",
    "title": "Peta Desa Kami",
    "jenjang": "SD",
    "mataPelajaran": "Matematika & Bahasa Indonesia",
    "level": "Kelas 6 • Fase C",
    "badge": "Gratis",
    "image": "/Banner_Dashboard2.jpg",
    "description": "Belajar menyampaikan gagasan tentang suatu tempat berdasarkan peta serta menggunakan skala untuk menghitung jarak sebenarnya dan jarak pada peta.",
    "duration": "± 5-7 menit",
    "activityType": "Materi + Video + Kuis",
    "learningOptions": "3 Tab Interaktif",
    "types": [
      "Teks & Gambar",
      "2 Video Edukasi",
      "Kuis Bergambar"
    ],
    "materiContent": {
      "text": "Karang taruna membuat peta Desa Sukamaju dengan skala 1 : 10.000. Pada peta, jarak dari balai desa ke sekolah 5 cm, dari sekolah ke puskesmas 8 cm, dan dari balai desa ke pantai 15 cm.  \nPeta itu akan dipasang di depan balai desa agar tamu mudah menemukan tempat-tempat penting. Rani diminta menulis keterangan singkat di bawah peta.",
      "image": "/Banner_Dashboard2.jpg",
      "audioUrl": "",
      "points": [
        {
          "id": "lp-k6b8-1",
          "title": "* Skala 1",
          "desc": "* Skala 1 : 10.000 berarti 1 cm pada peta mewakili 10.000 cm (100 m) jarak sebenarnya."
        },
        {
          "id": "lp-k6b8-2",
          "title": "Rumus skala",
          "desc": "Jarak sebenarnya = jarak peta x penyebut skala (5 cm x 10.000 = 50.000 cm = 500 m). Jarak pada peta = jarak sebenarnya (dalam cm) : penyebut skala."
        },
        {
          "id": "lp-k6b8-3",
          "title": "Konversi satuan panjang",
          "desc": "1 m = 100 cm; 1 km = 1.000 m = 100.000 cm."
        },
        {
          "id": "lp-k6b8-4",
          "title": "Menyampaikan gagasan dari",
          "desc": "Menyampaikan gagasan dari peta menggabungkan data fakta (jarak/letak) dengan saran rute yang bermanfaat bagi pembaca."
        },
        {
          "id": "lp-k6b8-5",
          "title": "Contoh soal cerita",
          "desc": "Jarak peta balai desa ke pantai 15 cm dengan skala 1 : 10.000, maka jarak sebenarnya = 15 x 10.000 = 150.000 cm = 1.500 m = 1,5 km."
        }
      ]
    },
    "videos": {
      "video1": {
        "title": "Video 1: Memahami Perbandingan, Rasio & Skala",
        "url": "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
      },
      "video2": {
        "title": "Video 2: Pengukuran Sudut & Bangun Ruang",
        "url": "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4"
      }
    },
    "quiz": {
      "title": "Kuis Pemahaman: Peta Desa Kami",
      "questions": [
        {
          "id": "q-k6b8-1",
          "questionText": "Peta digambar dengan skala 1 : 10.000. Jarak balai desa ke sekolah pada peta adalah 5 cm. Berapa jarak sebenarnya dalam meter (5 x 10.000 cm)?",
          "image": "/Banner_Dashboard2.jpg",
          "points": 50,
          "options": [
            "50 meter",
            "500 meter",
            "5.000 meter",
            "5 kilometer"
          ],
          "correctOptionIndex": 1,
          "explanation": "Pintar! 5 cm x 10.000 = 50.000 cm. Karena 1 m = 100 cm, maka 50.000 cm = 500 meter."
        },
        {
          "id": "q-k6b8-2",
          "questionText": "Jarak dari balai desa ke pantai pada peta adalah 15 cm. Berapa jarak sebenarnya dalam satuan kilometer (km)?",
          "image": "",
          "points": 50,
          "options": [
            "1,0 km",
            "1,5 km",
            "2,0 km",
            "15 km"
          ],
          "correctOptionIndex": 1,
          "explanation": "Luar biasa! 15 cm x 10.000 = 150.000 cm = 1.500 m = 1,5 km."
        }
      ]
    },
    "learningPoints": [
      {
        "id": "lp-k6b8-1",
        "title": "* Skala 1",
        "desc": "* Skala 1 : 10.000 berarti 1 cm pada peta mewakili 10.000 cm (100 m) jarak sebenarnya."
      },
      {
        "id": "lp-k6b8-2",
        "title": "Rumus skala",
        "desc": "Jarak sebenarnya = jarak peta x penyebut skala (5 cm x 10.000 = 50.000 cm = 500 m). Jarak pada peta = jarak sebenarnya (dalam cm) : penyebut skala."
      },
      {
        "id": "lp-k6b8-3",
        "title": "Konversi satuan panjang",
        "desc": "1 m = 100 cm; 1 km = 1.000 m = 100.000 cm."
      },
      {
        "id": "lp-k6b8-4",
        "title": "Menyampaikan gagasan dari",
        "desc": "Menyampaikan gagasan dari peta menggabungkan data fakta (jarak/letak) dengan saran rute yang bermanfaat bagi pembaca."
      },
      {
        "id": "lp-k6b8-5",
        "title": "Contoh soal cerita",
        "desc": "Jarak peta balai desa ke pantai 15 cm dengan skala 1 : 10.000, maka jarak sebenarnya = 15 x 10.000 = 150.000 cm = 1.500 m = 1,5 km."
      }
    ],
    "created_at": "2026-11-17T05:02:10.444Z"
  }
];
