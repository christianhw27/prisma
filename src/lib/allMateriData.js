// Database Komprehensif Seluruh Materi Resmi PRISMA (Kelas 1 - 6 SD, Bab 1 - 8 per Kelas)
// Total 48 Modul Materi Terstruktur dengan Kurikulum Lengkap & Kuis Interaktif Resmi
export const allStructuredMateri = [
  {
    "id": "materi-k1-b1",
    "title": "Bab 1: Panen Tomat di Kebun Nenek",
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
      "title": "Kuis Interaktif: Bab 1: Panen Tomat di Kebun Nenek",
      "questions": [
        {
          "id": "q-materi-k1-b1-1",
          "questionText": "Sari punya 5 tomat. Nenek punya 4 tomat. Berapa semua tomatnya?",
          "instructionBadge": "Hitung dan Lingkari",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "8 tomat",
            "9 tomat",
            "10 tomat"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Hitung terus dari 5: 6, 7, 8, 9 tomat (5 + 4 = 9)."
        },
        {
          "id": "q-materi-k1-b1-2",
          "questionText": "Lingkari gambar TOMAT yang segar!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Tomat Segar",
            "Wortel Oranye",
            "Apel Manis"
          ],
          "imageOptions": [
            {
              "label": "Tomat Segar",
              "image": "/quiz/items/tomat.svg"
            },
            {
              "label": "Wortel Oranye",
              "image": "/quiz/items/wortel.svg"
            },
            {
              "label": "Apel Manis",
              "image": "/quiz/items/apel.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Tomat berbentuk bulat, berwarna merah cerah, dan memiliki kelopak daun hijau di atasnya."
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
    "created_at": "2026-11-15T06:17:22.270Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Panen Tomat di Kebun Nenek",
      "questions": [
        {
          "id": "q-materi-k1-b1-1",
          "questionText": "Sari punya 5 tomat. Nenek punya 4 tomat. Berapa semua tomatnya?",
          "instructionBadge": "Hitung dan Lingkari",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "8 tomat",
            "9 tomat",
            "10 tomat"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Hitung terus dari 5: 6, 7, 8, 9 tomat (5 + 4 = 9)."
        },
        {
          "id": "q-materi-k1-b1-2",
          "questionText": "Lingkari gambar TOMAT yang segar!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Tomat Segar",
            "Wortel Oranye",
            "Apel Manis"
          ],
          "imageOptions": [
            {
              "label": "Tomat Segar",
              "image": "/quiz/items/tomat.svg"
            },
            {
              "label": "Wortel Oranye",
              "image": "/quiz/items/wortel.svg"
            },
            {
              "label": "Apel Manis",
              "image": "/quiz/items/apel.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Tomat berbentuk bulat, berwarna merah cerah, dan memiliki kelopak daun hijau di atasnya."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b2",
    "title": "Bab 2: Kue untuk Bu Tini",
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
      "title": "Kuis Interaktif: Bab 2: Kue untuk Bu Tini",
      "questions": [
        {
          "id": "q-materi-k1-b2-1",
          "questionText": "Ibu berkata, \"Ada 12 kue. Berikan 5 kue untuk Bu Tini.\" Apakah Dimas memberi 5 kue kepada Bu Tini?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Ibu menyuruh memberikan 5 kue kepada Bu Tini dan Dimas mematuhinya."
        },
        {
          "id": "q-materi-k1-b2-2",
          "questionText": "Ada 12 kue. Dimas memberikan 5 kue kepada Bu Tini. Sisa berapa kue sekarang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 kue",
            "7 kue",
            "8 kue"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Hitung mundur dari 12: 11, 10, 9, 8, 7 kue tersisa (12 - 5 = 7)."
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
    "created_at": "2026-11-15T07:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Kue untuk Bu Tini",
      "questions": [
        {
          "id": "q-materi-k1-b2-1",
          "questionText": "Ibu berkata, \"Ada 12 kue. Berikan 5 kue untuk Bu Tini.\" Apakah Dimas memberi 5 kue kepada Bu Tini?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Ibu menyuruh memberikan 5 kue kepada Bu Tini dan Dimas mematuhinya."
        },
        {
          "id": "q-materi-k1-b2-2",
          "questionText": "Ada 12 kue. Dimas memberikan 5 kue kepada Bu Tini. Sisa berapa kue sekarang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 kue",
            "7 kue",
            "8 kue"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Hitung mundur dari 12: 11, 10, 9, 8, 7 kue tersisa (12 - 5 = 7)."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b3",
    "title": "Bab 3: Kamar Rapi Rina",
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
      "title": "Kuis Interaktif: Bab 3: Kamar Rapi Rina",
      "questions": [
        {
          "id": "q-materi-k1-b3-1",
          "questionText": "Pasangkan benda di kamar Rina dengan bentuk bangun datarnya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "/quiz/k1-b3-kamar-bentuk.svg",
          "points": 50,
          "options": [
            "Jam = Lingkaran, Jendela = Persegi, Atap = Segitiga"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Jam Dinding",
              "right": "Lingkaran"
            },
            {
              "left": "Jendela Kamar",
              "right": "Persegi"
            },
            {
              "left": "Atap Rumah",
              "right": "Segitiga"
            }
          ],
          "leftItems": [
            "Jam Dinding",
            "Jendela Kamar",
            "Atap Rumah"
          ],
          "rightItems": [
            "Segitiga",
            "Lingkaran",
            "Persegi"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Jam dinding berbentuk lingkaran bulat, jendela persegi, dan atap rumah berbentuk segitiga."
        },
        {
          "id": "q-materi-k1-b3-2",
          "questionText": "Info: Bantal ada di atas kasur. Sandal ada di bawah kasur. Di manakah letak sandal Rina?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Di atas kasur",
            "Di bawah kasur"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sandal diletakkan rapi di lantai bawah kasur."
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
    "created_at": "2026-11-15T08:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Kamar Rapi Rina",
      "questions": [
        {
          "id": "q-materi-k1-b3-1",
          "questionText": "Pasangkan benda di kamar Rina dengan bentuk bangun datarnya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "/quiz/k1-b3-kamar-bentuk.svg",
          "points": 50,
          "options": [
            "Jam = Lingkaran, Jendela = Persegi, Atap = Segitiga"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Jam Dinding",
              "right": "Lingkaran"
            },
            {
              "left": "Jendela Kamar",
              "right": "Persegi"
            },
            {
              "left": "Atap Rumah",
              "right": "Segitiga"
            }
          ],
          "leftItems": [
            "Jam Dinding",
            "Jendela Kamar",
            "Atap Rumah"
          ],
          "rightItems": [
            "Segitiga",
            "Lingkaran",
            "Persegi"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Jam dinding berbentuk lingkaran bulat, jendela persegi, dan atap rumah berbentuk segitiga."
        },
        {
          "id": "q-materi-k1-b3-2",
          "questionText": "Info: Bantal ada di atas kasur. Sandal ada di bawah kasur. Di manakah letak sandal Rina?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Di atas kasur",
            "Di bawah kasur"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sandal diletakkan rapi di lantai bawah kasur."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b4",
    "title": "Bab 4: Telur di Kandang Ayam",
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
      "title": "Kuis Interaktif: Bab 4: Telur di Kandang Ayam",
      "questions": [
        {
          "id": "q-materi-k1-b4-1",
          "questionText": "Perhatikan kedua kandang ayam! Lingkari kandang yang telurnya LEBIH BANYAK!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kandang Kiri (9 Telur)",
            "Kandang Kanan (12 Telur)"
          ],
          "imageOptions": [
            {
              "label": "Kandang Kiri (9 Telur)",
              "image": "/quiz/items/kandang-9-telur.svg"
            },
            {
              "label": "Kandang Kanan (12 Telur)",
              "image": "/quiz/items/kandang-12-telur.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "12 telur lebih banyak daripada 9 telur, jadi kandang kanan memiliki telur terbanyak."
        },
        {
          "id": "q-materi-k1-b4-2",
          "questionText": "Urutkan bilangan telur berikut dari yang PALING KECIL ke yang paling besar!",
          "instructionBadge": "Urutkan Angka",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "8, 11, 14",
            "14, 11, 8",
            "11, 8, 14"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "14",
            "8",
            "11"
          ],
          "correctOrder": [
            "8",
            "11",
            "14"
          ],
          "correctOptionIndex": 0,
          "explanation": "Urutan dari yang terkecil adalah 8 telur, lalu 11 telur, kemudian 14 telur."
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
    "created_at": "2026-11-15T09:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Telur di Kandang Ayam",
      "questions": [
        {
          "id": "q-materi-k1-b4-1",
          "questionText": "Perhatikan kedua kandang ayam! Lingkari kandang yang telurnya LEBIH BANYAK!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kandang Kiri (9 Telur)",
            "Kandang Kanan (12 Telur)"
          ],
          "imageOptions": [
            {
              "label": "Kandang Kiri (9 Telur)",
              "image": "/quiz/items/kandang-9-telur.svg"
            },
            {
              "label": "Kandang Kanan (12 Telur)",
              "image": "/quiz/items/kandang-12-telur.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "12 telur lebih banyak daripada 9 telur, jadi kandang kanan memiliki telur terbanyak."
        },
        {
          "id": "q-materi-k1-b4-2",
          "questionText": "Urutkan bilangan telur berikut dari yang PALING KECIL ke yang paling besar!",
          "instructionBadge": "Urutkan Angka",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "8, 11, 14",
            "14, 11, 8",
            "11, 8, 14"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "14",
            "8",
            "11"
          ],
          "correctOrder": [
            "8",
            "11",
            "14"
          ],
          "correctOptionIndex": 0,
          "explanation": "Urutan dari yang terkecil adalah 8 telur, lalu 11 telur, kemudian 14 telur."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b5",
    "title": "Bab 5: Pola Gelang Manik-Manik",
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
      "title": "Kuis Interaktif: Bab 5: Pola Gelang Manik-Manik",
      "questions": [
        {
          "id": "q-materi-k1-b5-1",
          "questionText": "Pola manik gelang: Merah, Kuning, Kuning, Merah, Kuning, Kuning, ... Manik apa berikutnya?",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "/quiz/k1-b5-pola-gelang.svg",
          "points": 50,
          "options": [
            "Manik Merah",
            "Manik Kuning",
            "Manik Hijau"
          ],
          "imageOptions": [
            {
              "label": "Manik Merah",
              "image": "/quiz/items/manik-merah.svg"
            },
            {
              "label": "Manik Kuning",
              "image": "/quiz/items/manik-kuning.svg"
            },
            {
              "label": "Manik Hijau",
              "image": "/quiz/items/manik-hijau.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Polanya berulang: satu merah diikuti dua kuning. Setelah dua kuning, pola kembali ke manik merah."
        },
        {
          "id": "q-materi-k1-b5-2",
          "questionText": "2, 4, 6, … Bilangan berapakah berikutnya pada pola loncat 2 ini?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7",
            "8",
            "10"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pola selalu ditambah 2: 6 + 2 = 8."
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
    "created_at": "2026-11-15T10:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Pola Gelang Manik-Manik",
      "questions": [
        {
          "id": "q-materi-k1-b5-1",
          "questionText": "Pola manik gelang: Merah, Kuning, Kuning, Merah, Kuning, Kuning, ... Manik apa berikutnya?",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "/quiz/k1-b5-pola-gelang.svg",
          "points": 50,
          "options": [
            "Manik Merah",
            "Manik Kuning",
            "Manik Hijau"
          ],
          "imageOptions": [
            {
              "label": "Manik Merah",
              "image": "/quiz/items/manik-merah.svg"
            },
            {
              "label": "Manik Kuning",
              "image": "/quiz/items/manik-kuning.svg"
            },
            {
              "label": "Manik Hijau",
              "image": "/quiz/items/manik-hijau.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Polanya berulang: satu merah diikuti dua kuning. Setelah dua kuning, pola kembali ke manik merah."
        },
        {
          "id": "q-materi-k1-b5-2",
          "questionText": "2, 4, 6, … Bilangan berapakah berikutnya pada pola loncat 2 ini?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7",
            "8",
            "10"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pola selalu ditambah 2: 6 + 2 = 8."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b6",
    "title": "Bab 6: Pita untuk Lomba",
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
      "title": "Kuis Interaktif: Bab 6: Pita untuk Lomba",
      "questions": [
        {
          "id": "q-materi-k1-b6-1",
          "questionText": "Pasangkan kata ukuran pita lomba dengan lawan katanya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Panjang - Pendek, Berat - Ringan, Tinggi - Rendah"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Panjang",
              "right": "Pendek"
            },
            {
              "left": "Berat",
              "right": "Ringan"
            },
            {
              "left": "Tinggi",
              "right": "Rendah"
            }
          ],
          "leftItems": [
            "Panjang",
            "Berat",
            "Tinggi"
          ],
          "rightItems": [
            "Ringan",
            "Rendah",
            "Pendek"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Lawan kata panjang adalah pendek, berat lawannya ringan, dan tinggi lawannya rendah."
        },
        {
          "id": "q-materi-k1-b6-2",
          "questionText": "Kotak besar berisi balon. Kotak kecil berisi kelereng. Benda manakah yang lebih berat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kotak besar berisi balon",
            "Kotak kecil berisi kelereng"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kelereng terbuat dari kaca padat sehingga lebih berat daripada balon yang hanya berisi udara."
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
    "created_at": "2026-11-15T11:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Pita untuk Lomba",
      "questions": [
        {
          "id": "q-materi-k1-b6-1",
          "questionText": "Pasangkan kata ukuran pita lomba dengan lawan katanya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Panjang - Pendek, Berat - Ringan, Tinggi - Rendah"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Panjang",
              "right": "Pendek"
            },
            {
              "left": "Berat",
              "right": "Ringan"
            },
            {
              "left": "Tinggi",
              "right": "Rendah"
            }
          ],
          "leftItems": [
            "Panjang",
            "Berat",
            "Tinggi"
          ],
          "rightItems": [
            "Ringan",
            "Rendah",
            "Pendek"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Lawan kata panjang adalah pendek, berat lawannya ringan, dan tinggi lawannya rendah."
        },
        {
          "id": "q-materi-k1-b6-2",
          "questionText": "Kotak besar berisi balon. Kotak kecil berisi kelereng. Benda manakah yang lebih berat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kotak besar berisi balon",
            "Kotak kecil berisi kelereng"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kelereng terbuat dari kaca padat sehingga lebih berat daripada balon yang hanya berisi udara."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b7",
    "title": "Bab 7: Hari-Hariku",
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
      "title": "Kuis Interaktif: Bab 7: Hari-Hariku",
      "questions": [
        {
          "id": "q-materi-k1-b7-1",
          "questionText": "Urutkan kegiatan harian Bima dari PAGI ke MALAM!",
          "instructionBadge": "Urutkan Kegiatan",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "Mandi pagi, Berangkat sekolah, Tidur malam",
            "Tidur malam, Mandi pagi, Berangkat sekolah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "Tidur malam",
            "Mandi pagi",
            "Berangkat sekolah"
          ],
          "correctOrder": [
            "Mandi pagi",
            "Berangkat sekolah",
            "Tidur malam"
          ],
          "correctOptionIndex": 0,
          "explanation": "Kegiatan berurutan dari mandi pagi, lalu berangkat sekolah, dan diakhiri dengan tidur saat malam tiba."
        },
        {
          "id": "q-materi-k1-b7-2",
          "questionText": "Sekarang hari Rabu. Hari apakah besok lusa (dua hari lagi)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kamis",
            "Jumat",
            "Sabtu"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rabu -> besoknya Kamis -> lusa (dua hari lagi) adalah hari Jumat."
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
    "created_at": "2026-11-15T12:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Hari-Hariku",
      "questions": [
        {
          "id": "q-materi-k1-b7-1",
          "questionText": "Urutkan kegiatan harian Bima dari PAGI ke MALAM!",
          "instructionBadge": "Urutkan Kegiatan",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "Mandi pagi, Berangkat sekolah, Tidur malam",
            "Tidur malam, Mandi pagi, Berangkat sekolah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "Tidur malam",
            "Mandi pagi",
            "Berangkat sekolah"
          ],
          "correctOrder": [
            "Mandi pagi",
            "Berangkat sekolah",
            "Tidur malam"
          ],
          "correctOptionIndex": 0,
          "explanation": "Kegiatan berurutan dari mandi pagi, lalu berangkat sekolah, dan diakhiri dengan tidur saat malam tiba."
        },
        {
          "id": "q-materi-k1-b7-2",
          "questionText": "Sekarang hari Rabu. Hari apakah besok lusa (dua hari lagi)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kamis",
            "Jumat",
            "Sabtu"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rabu -> besoknya Kamis -> lusa (dua hari lagi) adalah hari Jumat."
        }
      ]
    }
  },
  {
    "id": "materi-k1-b8",
    "title": "Bab 8: Buah Kesukaan Teman Sekelas",
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
      "title": "Kuis Interaktif: Bab 8: Buah Kesukaan Teman Sekelas",
      "questions": [
        {
          "id": "q-materi-k1-b8-1",
          "questionText": "Lihat piktogram buah kesukaan! Lingkari gambar buah yang PALING BANYAK disukai teman sekelas!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "/quiz/k1-b8-piktogram-buah.svg",
          "points": 50,
          "options": [
            "Pisang",
            "Jeruk",
            "Mangga",
            "Semangka"
          ],
          "imageOptions": [
            {
              "label": "Pisang (3 anak)",
              "image": "/quiz/items/pisang.svg"
            },
            {
              "label": "Jeruk (5 anak)",
              "image": "/quiz/items/jeruk.svg"
            },
            {
              "label": "Mangga",
              "image": "/quiz/items/mangga.svg"
            },
            {
              "label": "Semangka (2 anak)",
              "image": "/quiz/items/semangka.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Buah jeruk memiliki 5 simbol piktogram, paling banyak di antara semua buah."
        },
        {
          "id": "q-materi-k1-b8-2",
          "questionText": "Berapa banyak anak yang menyukai buah apel pada piktogram?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k1-b8-piktogram-buah.svg",
          "points": 50,
          "options": [
            "3 anak",
            "4 anak",
            "5 anak"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pada baris buah apel terdapat 4 simbol gambar apel."
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
    "created_at": "2026-11-15T13:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Buah Kesukaan Teman Sekelas",
      "questions": [
        {
          "id": "q-materi-k1-b8-1",
          "questionText": "Lihat piktogram buah kesukaan! Lingkari gambar buah yang PALING BANYAK disukai teman sekelas!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "/quiz/k1-b8-piktogram-buah.svg",
          "points": 50,
          "options": [
            "Pisang",
            "Jeruk",
            "Mangga",
            "Semangka"
          ],
          "imageOptions": [
            {
              "label": "Pisang (3 anak)",
              "image": "/quiz/items/pisang.svg"
            },
            {
              "label": "Jeruk (5 anak)",
              "image": "/quiz/items/jeruk.svg"
            },
            {
              "label": "Mangga",
              "image": "/quiz/items/mangga.svg"
            },
            {
              "label": "Semangka (2 anak)",
              "image": "/quiz/items/semangka.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Buah jeruk memiliki 5 simbol piktogram, paling banyak di antara semua buah."
        },
        {
          "id": "q-materi-k1-b8-2",
          "questionText": "Berapa banyak anak yang menyukai buah apel pada piktogram?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k1-b8-piktogram-buah.svg",
          "points": 50,
          "options": [
            "3 anak",
            "4 anak",
            "5 anak"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pada baris buah apel terdapat 4 simbol gambar apel."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b1",
    "title": "Bab 1: Sarapan Sehat, Badan Kuat",
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
      "title": "Kuis Interaktif: Bab 1: Sarapan Sehat, Badan Kuat",
      "questions": [
        {
          "id": "q-materi-k2-b1-1",
          "questionText": "Apakah sarapan pagi membuat badan kuat dan pikiran menjadi segar?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Sarapan bergizi memberikan energi bagi tubuh dan otak untuk belajar dengan fokus."
        },
        {
          "id": "q-materi-k2-b1-2",
          "questionText": "Beni makan 15 suap nasi. Edo makan 18 suap nasi. Siapakah yang makan lebih banyak?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Beni",
            "Edo",
            "Sama banyak"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "18 suapan lebih besar daripada 15 suapan, jadi Edo makan lebih banyak."
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
    "created_at": "2026-11-15T14:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Sarapan Sehat, Badan Kuat",
      "questions": [
        {
          "id": "q-materi-k2-b1-1",
          "questionText": "Apakah sarapan pagi membuat badan kuat dan pikiran menjadi segar?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Sarapan bergizi memberikan energi bagi tubuh dan otak untuk belajar dengan fokus."
        },
        {
          "id": "q-materi-k2-b1-2",
          "questionText": "Beni makan 15 suap nasi. Edo makan 18 suap nasi. Siapakah yang makan lebih banyak?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Beni",
            "Edo",
            "Sama banyak"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "18 suapan lebih besar daripada 15 suapan, jadi Edo makan lebih banyak."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b2",
    "title": "Bab 2: Kue Bolu untuk Berbagi",
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
      "title": "Kuis Interaktif: Bab 2: Kue Bolu untuk Berbagi",
      "questions": [
        {
          "id": "q-materi-k2-b2-1",
          "questionText": "Lingkari gambar kue yang menunjukkan pecahan SETENGAH (1/2) sama besar!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kue dibagi 2 sama besar",
            "Kue dibagi 2 tidak sama",
            "Kue dibagi 4"
          ],
          "imageOptions": [
            {
              "label": "Pecahan 1/2 (Sama Besar)",
              "image": "/quiz/items/kue-setengah.svg"
            },
            {
              "label": "Kue Tidak Sama Besar",
              "image": "/quiz/items/kue-tidak-sama.svg"
            },
            {
              "label": "Kue Dibagi 4 (Pecahan 1/4)",
              "image": "/quiz/items/kue-seperempat.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Pecahan 1/2 terjadi saat 1 kue utuh dibagi tepat menjadi 2 potong yang SAMA BESAR."
        },
        {
          "id": "q-materi-k2-b2-2",
          "questionText": "1 kue bolu dipotong menjadi 4 bagian sama besar. Berapakah nilai 1 potong kue tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k2-b2-pecahan-kue.svg",
          "points": 50,
          "options": [
            "1/2",
            "1/3",
            "1/4"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Satu potong dari empat potongan sama besar bernilai pecahan seperempat (1/4)."
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
    "created_at": "2026-11-15T15:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Kue Bolu untuk Berbagi",
      "questions": [
        {
          "id": "q-materi-k2-b2-1",
          "questionText": "Lingkari gambar kue yang menunjukkan pecahan SETENGAH (1/2) sama besar!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kue dibagi 2 sama besar",
            "Kue dibagi 2 tidak sama",
            "Kue dibagi 4"
          ],
          "imageOptions": [
            {
              "label": "Pecahan 1/2 (Sama Besar)",
              "image": "/quiz/items/kue-setengah.svg"
            },
            {
              "label": "Kue Tidak Sama Besar",
              "image": "/quiz/items/kue-tidak-sama.svg"
            },
            {
              "label": "Kue Dibagi 4 (Pecahan 1/4)",
              "image": "/quiz/items/kue-seperempat.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Pecahan 1/2 terjadi saat 1 kue utuh dibagi tepat menjadi 2 potong yang SAMA BESAR."
        },
        {
          "id": "q-materi-k2-b2-2",
          "questionText": "1 kue bolu dipotong menjadi 4 bagian sama besar. Berapakah nilai 1 potong kue tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k2-b2-pecahan-kue.svg",
          "points": 50,
          "options": [
            "1/2",
            "1/3",
            "1/4"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Satu potong dari empat potongan sama besar bernilai pecahan seperempat (1/4)."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b3",
    "title": "Bab 3: Siapa yang Lebih Panjang?",
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
      "title": "Kuis Interaktif: Bab 3: Siapa yang Lebih Panjang?",
      "questions": [
        {
          "id": "q-materi-k2-b3-1",
          "questionText": "Ibu membeli 3 kantong jeruk. Setiap kantong berisi 4 jeruk. Berapa total seluruh jeruk?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7 jeruk",
            "10 jeruk",
            "12 jeruk"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Perkalian adalah penjumlahan berulang: 3 × 4 = 4 + 4 + 4 = 12 jeruk."
        },
        {
          "id": "q-materi-k2-b3-2",
          "questionText": "Ada 12 kue mangkok yang dibagikan sama rata kepada 3 anak. Berapa kue yang diterima setiap anak?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3 kue",
            "4 kue",
            "5 kue"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pembagian: 12 dibagi 3 anak = 4 kue untuk setiap anak."
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
    "created_at": "2026-11-15T16:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Siapa yang Lebih Panjang?",
      "questions": [
        {
          "id": "q-materi-k2-b3-1",
          "questionText": "Ibu membeli 3 kantong jeruk. Setiap kantong berisi 4 jeruk. Berapa total seluruh jeruk?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7 jeruk",
            "10 jeruk",
            "12 jeruk"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Perkalian adalah penjumlahan berulang: 3 × 4 = 4 + 4 + 4 = 12 jeruk."
        },
        {
          "id": "q-materi-k2-b3-2",
          "questionText": "Ada 12 kue mangkok yang dibagikan sama rata kepada 3 anak. Berapa kue yang diterima setiap anak?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3 kue",
            "4 kue",
            "5 kue"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Pembagian: 12 dibagi 3 anak = 4 kue untuk setiap anak."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b4",
    "title": "Bab 4: Lompat Katak di Pematang Sawah",
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
      "title": "Kuis Interaktif: Bab 4: Lompat Katak di Pematang Sawah",
      "questions": [
        {
          "id": "q-materi-k2-b4-1",
          "questionText": "Katak melompat 3 langkah setiap kali melompat. Jika katak melompat 4 kali dari angka 0, di manakah katak mendarat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k2-b4-lompat-katak.svg",
          "points": 50,
          "options": [
            "Angka 7",
            "Angka 9",
            "Angka 12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Lompatan: 0 -> 3 -> 6 -> 9 -> 12 (4 lompatan × 3 langkah = 12)."
        },
        {
          "id": "q-materi-k2-b4-2",
          "questionText": "Berdasarkan cerita: Siapa nama katak kecil yang ramah dan suka melompat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Koko",
            "Boni",
            "Riri"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Katak kecil yang melompat di garis bilangan bernama Koko."
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
    "created_at": "2026-11-15T17:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Lompat Katak di Pematang Sawah",
      "questions": [
        {
          "id": "q-materi-k2-b4-1",
          "questionText": "Katak melompat 3 langkah setiap kali melompat. Jika katak melompat 4 kali dari angka 0, di manakah katak mendarat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k2-b4-lompat-katak.svg",
          "points": 50,
          "options": [
            "Angka 7",
            "Angka 9",
            "Angka 12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Lompatan: 0 -> 3 -> 6 -> 9 -> 12 (4 lompatan × 3 langkah = 12)."
        },
        {
          "id": "q-materi-k2-b4-2",
          "questionText": "Berdasarkan cerita: Siapa nama katak kecil yang ramah dan suka melompat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Koko",
            "Boni",
            "Riri"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Katak kecil yang melompat di garis bilangan bernama Koko."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b5",
    "title": "Bab 5: Timbangan Kelereng",
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
      "title": "Kuis Interaktif: Bab 5: Timbangan Kelereng",
      "questions": [
        {
          "id": "q-materi-k2-b5-1",
          "questionText": "Berapakah nilai titik-titik pada persamaan timbangan: 6 + 4 = 5 + ...?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "4",
            "5",
            "6"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Ruas kiri: 6 + 4 = 10. Agar setimbang, ruas kanan harus bernilai 10 (5 + 5 = 10)."
        },
        {
          "id": "q-materi-k2-b5-2",
          "questionText": "Apakah persamaan 6 + 4 = 5 + 5 bernilai BENAR atau SALAH?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Keduanya bernilai sama yaitu 10 (10 = 10)."
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
    "created_at": "2026-11-15T18:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Timbangan Kelereng",
      "questions": [
        {
          "id": "q-materi-k2-b5-1",
          "questionText": "Berapakah nilai titik-titik pada persamaan timbangan: 6 + 4 = 5 + ...?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "4",
            "5",
            "6"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Ruas kiri: 6 + 4 = 10. Agar setimbang, ruas kanan harus bernilai 10 (5 + 5 = 10)."
        },
        {
          "id": "q-materi-k2-b5-2",
          "questionText": "Apakah persamaan 6 + 4 = 5 + 5 bernilai BENAR atau SALAH?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Keduanya bernilai sama yaitu 10 (10 = 10)."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b6",
    "title": "Bab 6: Tangram Kakek",
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
      "title": "Kuis Interaktif: Bab 6: Tangram Kakek",
      "questions": [
        {
          "id": "q-materi-k2-b6-1",
          "questionText": "Berapakah panjang pensil Lani jika diukur menggunakan penggaris dari angka 0 sampai 12?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 cm",
            "12 cm",
            "14 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Ujung pensil dimulai tepat di angka 0 dan berakhir di angka 12, maka panjangnya 12 cm."
        },
        {
          "id": "q-materi-k2-b6-2",
          "questionText": "Benda manakah di dalam kelas yang lebih tepat diukur menggunakan meteran gulung daripada penggaris saku 15 cm?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Penghapus",
            "Papan tulis kelas",
            "Buku tulis"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Papan tulis kelas berukuran panjang lebih dari 1 meter sehingga membutuhkan meteran."
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
    "created_at": "2026-11-15T19:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Tangram Kakek",
      "questions": [
        {
          "id": "q-materi-k2-b6-1",
          "questionText": "Berapakah panjang pensil Lani jika diukur menggunakan penggaris dari angka 0 sampai 12?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 cm",
            "12 cm",
            "14 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Ujung pensil dimulai tepat di angka 0 dan berakhir di angka 12, maka panjangnya 12 cm."
        },
        {
          "id": "q-materi-k2-b6-2",
          "questionText": "Benda manakah di dalam kelas yang lebih tepat diukur menggunakan meteran gulung daripada penggaris saku 15 cm?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Penghapus",
            "Papan tulis kelas",
            "Buku tulis"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Papan tulis kelas berukuran panjang lebih dari 1 meter sehingga membutuhkan meteran."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b7",
    "title": "Bab 7: Jam Berapa Sekarang?",
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
      "title": "Kuis Interaktif: Bab 7: Jam Berapa Sekarang?",
      "questions": [
        {
          "id": "q-materi-k2-b7-1",
          "questionText": "Raka sarapan tepat pukul 07.00. Lingkari gambar jam dinding yang menunjukkan PUKUL 07.00!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Pukul 07.00",
            "Pukul 12.35",
            "Pukul 07.30"
          ],
          "imageOptions": [
            {
              "label": "Pukul 07.00",
              "image": "/quiz/items/jam-0700.svg"
            },
            {
              "label": "Pukul 12.35",
              "image": "/quiz/items/jam-1235.svg"
            },
            {
              "label": "Pukul 07.30",
              "image": "/quiz/items/jam-0730.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Pukul 07.00 ditandai dengan jarum pendek di angka 7 dan jarum panjang tegak di angka 12."
        },
        {
          "id": "q-materi-k2-b7-2",
          "questionText": "Raka mulai kerja bakti pukul 08.30 dan selesai pukul 09.30. Berapa lama kegiatan kerja bakti berlangsung?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "30 menit",
            "1 jam",
            "2 jam"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Dari pukul 08.30 ke 09.30 berlalu tepat selama 1 jam (60 menit)."
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
    "created_at": "2026-11-15T20:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Jam Berapa Sekarang?",
      "questions": [
        {
          "id": "q-materi-k2-b7-1",
          "questionText": "Raka sarapan tepat pukul 07.00. Lingkari gambar jam dinding yang menunjukkan PUKUL 07.00!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Pukul 07.00",
            "Pukul 12.35",
            "Pukul 07.30"
          ],
          "imageOptions": [
            {
              "label": "Pukul 07.00",
              "image": "/quiz/items/jam-0700.svg"
            },
            {
              "label": "Pukul 12.35",
              "image": "/quiz/items/jam-1235.svg"
            },
            {
              "label": "Pukul 07.30",
              "image": "/quiz/items/jam-0730.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Pukul 07.00 ditandai dengan jarum pendek di angka 7 dan jarum panjang tegak di angka 12."
        },
        {
          "id": "q-materi-k2-b7-2",
          "questionText": "Raka mulai kerja bakti pukul 08.30 dan selesai pukul 09.30. Berapa lama kegiatan kerja bakti berlangsung?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "30 menit",
            "1 jam",
            "2 jam"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Dari pukul 08.30 ke 09.30 berlalu tepat selama 1 jam (60 menit)."
        }
      ]
    }
  },
  {
    "id": "materi-k2-b8",
    "title": "Bab 8: Belanja di Warung Bu Siti",
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
      "title": "Kuis Interaktif: Bab 8: Belanja di Warung Bu Siti",
      "questions": [
        {
          "id": "q-materi-k2-b8-1",
          "questionText": "Berapa banyak murid yang memilih es teh pada diagram batang kesukaan kelas?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 murid",
            "8 murid",
            "10 murid"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Tinggi batang es teh sejajar dengan garis angka 8 pada sumbu tegak."
        },
        {
          "id": "q-materi-k2-b8-2",
          "questionText": "Minuman manakah yang paling sedikit dipilih oleh murid?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Air putih",
            "Susu",
            "Jus jeruk"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Batang minuman air putih adalah yang paling pendek di diagram."
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
    "created_at": "2026-11-15T21:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Belanja di Warung Bu Siti",
      "questions": [
        {
          "id": "q-materi-k2-b8-1",
          "questionText": "Berapa banyak murid yang memilih es teh pada diagram batang kesukaan kelas?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 murid",
            "8 murid",
            "10 murid"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Tinggi batang es teh sejajar dengan garis angka 8 pada sumbu tegak."
        },
        {
          "id": "q-materi-k2-b8-2",
          "questionText": "Minuman manakah yang paling sedikit dipilih oleh murid?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Air putih",
            "Susu",
            "Jus jeruk"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Batang minuman air putih adalah yang paling pendek di diagram."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b1",
    "title": "Bab 1: Panen Bandeng di Tambak",
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
      "title": "Kuis Interaktif: Bab 1: Panen Bandeng di Tambak",
      "questions": [
        {
          "id": "q-materi-k3-b1-1",
          "questionText": "Sebuah perpustakaan memiliki 2.450 buku cerita dan mendapat kiriman 1.320 buku lagi. Berapa total seluruh buku?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3.670 buku",
            "3.770 buku",
            "3.870 buku"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Penjumlahan ribuan: 2.450 + 1.320 = 3.770 buku."
        },
        {
          "id": "q-materi-k3-b1-2",
          "questionText": "Nilai tempat dari angka 4 pada bilangan 2.450 adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Ribuan",
            "Ratusan",
            "Puluhan"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Angka 4 menempati posisi kedua dari kiri pada 4 angka ribuan, yaitu bernilai ratusan (400)."
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
    "created_at": "2026-11-15T22:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Panen Bandeng di Tambak",
      "questions": [
        {
          "id": "q-materi-k3-b1-1",
          "questionText": "Sebuah perpustakaan memiliki 2.450 buku cerita dan mendapat kiriman 1.320 buku lagi. Berapa total seluruh buku?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3.670 buku",
            "3.770 buku",
            "3.870 buku"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Penjumlahan ribuan: 2.450 + 1.320 = 3.770 buku."
        },
        {
          "id": "q-materi-k3-b1-2",
          "questionText": "Nilai tempat dari angka 4 pada bilangan 2.450 adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Ribuan",
            "Ratusan",
            "Puluhan"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Angka 4 menempati posisi kedua dari kiri pada 4 angka ribuan, yaitu bernilai ratusan (400)."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b2",
    "title": "Bab 2: Kue Syukuran Kelas 3",
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
      "title": "Kuis Interaktif: Bab 2: Kue Syukuran Kelas 3",
      "questions": [
        {
          "id": "q-materi-k3-b2-1",
          "questionText": "Pasangkan kata kosa kata perayaan kelas dengan artinya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Syukuran = Berterima kasih, Wali Kelas = Guru penanggung jawab"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Syukuran",
              "right": "Acara berterima kasih kepada Tuhan"
            },
            {
              "left": "Wali Kelas",
              "right": "Guru yang bertanggung jawab atas satu kelas"
            }
          ],
          "leftItems": [
            "Syukuran",
            "Wali Kelas"
          ],
          "rightItems": [
            "Guru yang bertanggung jawab atas satu kelas",
            "Acara berterima kasih kepada Tuhan"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Syukuran adalah perayaan berterima kasih kepada Tuhan, dan wali kelas adalah pendamping kelas."
        },
        {
          "id": "q-materi-k3-b2-2",
          "questionText": "Ibu membawa 4 kotak kue lapis, masing-masing berisi 12 potong kue. Berapa potong seluruh kue?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "36 potong",
            "44 potong",
            "48 potong"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Perkalian: 4 kotak × 12 potong = 48 potong kue."
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
    "created_at": "2026-11-15T23:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Kue Syukuran Kelas 3",
      "questions": [
        {
          "id": "q-materi-k3-b2-1",
          "questionText": "Pasangkan kata kosa kata perayaan kelas dengan artinya yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Syukuran = Berterima kasih, Wali Kelas = Guru penanggung jawab"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Syukuran",
              "right": "Acara berterima kasih kepada Tuhan"
            },
            {
              "left": "Wali Kelas",
              "right": "Guru yang bertanggung jawab atas satu kelas"
            }
          ],
          "leftItems": [
            "Syukuran",
            "Wali Kelas"
          ],
          "rightItems": [
            "Guru yang bertanggung jawab atas satu kelas",
            "Acara berterima kasih kepada Tuhan"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Syukuran adalah perayaan berterima kasih kepada Tuhan, dan wali kelas adalah pendamping kelas."
        },
        {
          "id": "q-materi-k3-b2-2",
          "questionText": "Ibu membawa 4 kotak kue lapis, masing-masing berisi 12 potong kue. Berapa potong seluruh kue?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "36 potong",
            "44 potong",
            "48 potong"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Perkalian: 4 kotak × 12 potong = 48 potong kue."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b3",
    "title": "Bab 3: Mengukur Tubuh di UKS",
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
      "title": "Kuis Interaktif: Bab 3: Mengukur Tubuh di UKS",
      "questions": [
        {
          "id": "q-materi-k3-b3-1",
          "questionText": "Pasangkan pengukuran di ruang UKS sekolah dengan satuan baku yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Berat badan = kg, Tinggi badan = cm"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Berat Badan",
              "right": "Kilogram (kg)"
            },
            {
              "left": "Tinggi Badan",
              "right": "Sentimeter (cm)"
            }
          ],
          "leftItems": [
            "Berat Badan",
            "Tinggi Badan"
          ],
          "rightItems": [
            "Sentimeter (cm)",
            "Kilogram (kg)"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Berat badan diukur menggunakan timbangan dengan satuan kg, sedangkan tinggi badan dengan pita cm."
        },
        {
          "id": "q-materi-k3-b3-2",
          "questionText": "Tinggi badan Siti adalah 1 meter lebih 25 sentimeter (1 m 25 cm). Berapakah tingginya dalam satuan sentimeter?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "125 cm",
            "150 cm",
            "175 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "1 meter = 100 cm. Jadi 100 cm + 25 cm = 125 cm."
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
    "created_at": "2026-11-16T00:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Mengukur Tubuh di UKS",
      "questions": [
        {
          "id": "q-materi-k3-b3-1",
          "questionText": "Pasangkan pengukuran di ruang UKS sekolah dengan satuan baku yang tepat!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Berat badan = kg, Tinggi badan = cm"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Berat Badan",
              "right": "Kilogram (kg)"
            },
            {
              "left": "Tinggi Badan",
              "right": "Sentimeter (cm)"
            }
          ],
          "leftItems": [
            "Berat Badan",
            "Tinggi Badan"
          ],
          "rightItems": [
            "Sentimeter (cm)",
            "Kilogram (kg)"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Berat badan diukur menggunakan timbangan dengan satuan kg, sedangkan tinggi badan dengan pita cm."
        },
        {
          "id": "q-materi-k3-b3-2",
          "questionText": "Tinggi badan Siti adalah 1 meter lebih 25 sentimeter (1 m 25 cm). Berapakah tingginya dalam satuan sentimeter?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "125 cm",
            "150 cm",
            "175 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "1 meter = 100 cm. Jadi 100 cm + 25 cm = 125 cm."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b4",
    "title": "Bab 4: Pameran Kerajinan Sekolah",
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
      "title": "Kuis Interaktif: Bab 4: Pameran Kerajinan Sekolah",
      "questions": [
        {
          "id": "q-materi-k3-b4-1",
          "questionText": "Toko kerajinan memiliki 64 gantungan kunci yang dikemas ke dalam 8 kantong sama banyak. Berapa isi tiap kantong?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7 buah",
            "8 buah",
            "9 buah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "64 : 8 = 8 buah per kantong (karena 8 × 8 = 64)."
        },
        {
          "id": "q-materi-k3-b4-2",
          "questionText": "Apakah pot kerajinan murid kelas 3 dibuat dari botol plastik daur ulang?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Kerajinan peduli lingkungan memanfaatkan limbah botol plastik menjadi pot hias cantik."
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
    "created_at": "2026-11-16T01:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Pameran Kerajinan Sekolah",
      "questions": [
        {
          "id": "q-materi-k3-b4-1",
          "questionText": "Toko kerajinan memiliki 64 gantungan kunci yang dikemas ke dalam 8 kantong sama banyak. Berapa isi tiap kantong?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7 buah",
            "8 buah",
            "9 buah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "64 : 8 = 8 buah per kantong (karena 8 × 8 = 64)."
        },
        {
          "id": "q-materi-k3-b4-2",
          "questionText": "Apakah pot kerajinan murid kelas 3 dibuat dari botol plastik daur ulang?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Kerajinan peduli lingkungan memanfaatkan limbah botol plastik menjadi pot hias cantik."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b5",
    "title": "Bab 5: Roti Bakar Dibagi Rata",
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
      "title": "Kuis Interaktif: Bab 5: Roti Bakar Dibagi Rata",
      "questions": [
        {
          "id": "q-materi-k3-b5-1",
          "questionText": "Lingkari potongan roti yang ukurannya LEBIH BESAR!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Potongan 1/3 Roti",
            "Potongan 1/6 Roti"
          ],
          "imageOptions": [
            {
              "label": "Potongan 1/3 (Lebih Besar)",
              "image": "/quiz/items/roti-sepertiga.svg"
            },
            {
              "label": "Potongan 1/6 (Lebih Kecil)",
              "image": "/quiz/items/roti-seperenam.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "1/3 lebih besar daripada 1/6 karena kue hanya dibagi ke 3 orang, sehingga tiap potongnya lebih lebar."
        },
        {
          "id": "q-materi-k3-b5-2",
          "questionText": "Pasangkan pertanyaan 5W1H dari cerita roti bakar dengan jawabannya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "/quiz/k3-b5-pecahan-roti.svg",
          "points": 50,
          "options": [
            "Kapan? = Hari Sabtu, Di mana? = Di dapur"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Kapan Ayah membuat roti?",
              "right": "Hari Sabtu"
            },
            {
              "left": "Di mana Ayah membuat roti?",
              "right": "Di dapur"
            }
          ],
          "leftItems": [
            "Kapan Ayah membuat roti?",
            "Di mana Ayah membuat roti?"
          ],
          "rightItems": [
            "Di dapur",
            "Hari Sabtu"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Waktu peristiwa adalah hari Sabtu dan lokasinya di dapur."
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
    "created_at": "2026-11-16T02:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Roti Bakar Dibagi Rata",
      "questions": [
        {
          "id": "q-materi-k3-b5-1",
          "questionText": "Lingkari potongan roti yang ukurannya LEBIH BESAR!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Potongan 1/3 Roti",
            "Potongan 1/6 Roti"
          ],
          "imageOptions": [
            {
              "label": "Potongan 1/3 (Lebih Besar)",
              "image": "/quiz/items/roti-sepertiga.svg"
            },
            {
              "label": "Potongan 1/6 (Lebih Kecil)",
              "image": "/quiz/items/roti-seperenam.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "1/3 lebih besar daripada 1/6 karena kue hanya dibagi ke 3 orang, sehingga tiap potongnya lebih lebar."
        },
        {
          "id": "q-materi-k3-b5-2",
          "questionText": "Pasangkan pertanyaan 5W1H dari cerita roti bakar dengan jawabannya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "/quiz/k3-b5-pecahan-roti.svg",
          "points": 50,
          "options": [
            "Kapan? = Hari Sabtu, Di mana? = Di dapur"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Kapan Ayah membuat roti?",
              "right": "Hari Sabtu"
            },
            {
              "left": "Di mana Ayah membuat roti?",
              "right": "Di dapur"
            }
          ],
          "leftItems": [
            "Kapan Ayah membuat roti?",
            "Di mana Ayah membuat roti?"
          ],
          "rightItems": [
            "Di dapur",
            "Hari Sabtu"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Waktu peristiwa adalah hari Sabtu dan lokasinya di dapur."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b6",
    "title": "Bab 6: Jadwal Wisata Kelas 3",
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
      "title": "Kuis Interaktif: Bab 6: Jadwal Wisata Kelas 3",
      "questions": [
        {
          "id": "q-materi-k3-b6-1",
          "questionText": "Ibu memiliki tali sepanjang 5/8 meter dan digunakan 2/8 meter untuk mengikat paket. Berapa sisa tali Ibu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2/8 meter",
            "3/8 meter",
            "4/8 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Penyebut sudah sama: (5 - 2) / 8 = 3/8 meter."
        },
        {
          "id": "q-materi-k3-b6-2",
          "questionText": "Sebuah persegi memiliki panjang sisi 6 cm. Berapakah keliling bangun persegi tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "18 cm",
            "24 cm",
            "36 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Keliling persegi = 4 × sisi = 4 × 6 cm = 24 cm."
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
    "created_at": "2026-11-16T03:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Jadwal Wisata Kelas 3",
      "questions": [
        {
          "id": "q-materi-k3-b6-1",
          "questionText": "Ibu memiliki tali sepanjang 5/8 meter dan digunakan 2/8 meter untuk mengikat paket. Berapa sisa tali Ibu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2/8 meter",
            "3/8 meter",
            "4/8 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Penyebut sudah sama: (5 - 2) / 8 = 3/8 meter."
        },
        {
          "id": "q-materi-k3-b6-2",
          "questionText": "Sebuah persegi memiliki panjang sisi 6 cm. Berapakah keliling bangun persegi tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "18 cm",
            "24 cm",
            "36 cm"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Keliling persegi = 4 × sisi = 4 × 6 cm = 24 cm."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b7",
    "title": "Bab 7: Layang-Layang Arif",
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
      "title": "Kuis Interaktif: Bab 7: Layang-Layang Arif",
      "questions": [
        {
          "id": "q-materi-k3-b7-1",
          "questionText": "Sudut yang besarnya tepat sama dengan pojok buku tulis atau sudut meja adalah sudut...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Lancip",
            "Siku-siku",
            "Tumpul"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sudut tegak lurus seperti pojok buku tulis berukuran tepat 90 derajat (sudut siku-siku)."
        },
        {
          "id": "q-materi-k3-b7-2",
          "questionText": "Apakah pojok buku tulis membentuk sudut siku-siku?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Setiap pojok buku cetak atau buku tulis berbentuk siku-siku (90 derajat)."
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
    "created_at": "2026-11-16T04:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Layang-Layang Arif",
      "questions": [
        {
          "id": "q-materi-k3-b7-1",
          "questionText": "Sudut yang besarnya tepat sama dengan pojok buku tulis atau sudut meja adalah sudut...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Lancip",
            "Siku-siku",
            "Tumpul"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sudut tegak lurus seperti pojok buku tulis berukuran tepat 90 derajat (sudut siku-siku)."
        },
        {
          "id": "q-materi-k3-b7-2",
          "questionText": "Apakah pojok buku tulis membentuk sudut siku-siku?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! Setiap pojok buku cetak atau buku tulis berbentuk siku-siku (90 derajat)."
        }
      ]
    }
  },
  {
    "id": "materi-k3-b8",
    "title": "Bab 8: Lomba Kebersihan Kelas",
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
      "title": "Kuis Interaktif: Bab 8: Lomba Kebersihan Kelas",
      "questions": [
        {
          "id": "q-materi-k3-b8-1",
          "questionText": "Berdasarkan tabel tabungan: Dani menabung Rp 5.000 setiap minggu selama 6 minggu berturut-turut. Berapa total tabungan Dani?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 25.000",
            "Rp 30.000",
            "Rp 35.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "6 minggu × Rp 5.000 = Rp 30.000."
        },
        {
          "id": "q-materi-k3-b8-2",
          "questionText": "Jika Dani menggunakan Rp 10.000 dari tabungannya untuk membeli buku gambar, berapa sisa tabungan Dani sekarang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 15.000",
            "Rp 20.000",
            "Rp 25.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rp 30.000 - Rp 10.000 = Rp 20.000 sisa tabungan Dani."
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
    "created_at": "2026-11-16T05:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Lomba Kebersihan Kelas",
      "questions": [
        {
          "id": "q-materi-k3-b8-1",
          "questionText": "Berdasarkan tabel tabungan: Dani menabung Rp 5.000 setiap minggu selama 6 minggu berturut-turut. Berapa total tabungan Dani?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 25.000",
            "Rp 30.000",
            "Rp 35.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "6 minggu × Rp 5.000 = Rp 30.000."
        },
        {
          "id": "q-materi-k3-b8-2",
          "questionText": "Jika Dani menggunakan Rp 10.000 dari tabungannya untuk membeli buku gambar, berapa sisa tabungan Dani sekarang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 15.000",
            "Rp 20.000",
            "Rp 25.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rp 30.000 - Rp 10.000 = Rp 20.000 sisa tabungan Dani."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b1",
    "title": "Bab 1: Martabak Pesanan Pak RT",
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
      "title": "Kuis Interaktif: Bab 1: Martabak Pesanan Pak RT",
      "questions": [
        {
          "id": "q-materi-k4-b1-1",
          "questionText": "Martabak manis dibagi 8 potong sama besar. Andi makan 2 potong martabak. Manakah bentuk pecahan yang senilai dengan bagian Andi?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1/2",
            "1/4",
            "1/8"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "2 potong dari 8 bagian = 2/8. Jika pembilang dan penyebut dibagi 2, menjadi 1/4."
        },
        {
          "id": "q-materi-k4-b1-2",
          "questionText": "Apakah bagian Andi (2/4) sama besar dengan bagian Dewi (4/8)?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! 2/4 dan 4/8 keduanya senilai dengan 1/2."
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
    "created_at": "2026-11-16T06:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Martabak Pesanan Pak RT",
      "questions": [
        {
          "id": "q-materi-k4-b1-1",
          "questionText": "Martabak manis dibagi 8 potong sama besar. Andi makan 2 potong martabak. Manakah bentuk pecahan yang senilai dengan bagian Andi?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1/2",
            "1/4",
            "1/8"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "2 potong dari 8 bagian = 2/8. Jika pembilang dan penyebut dibagi 2, menjadi 1/4."
        },
        {
          "id": "q-materi-k4-b1-2",
          "questionText": "Apakah bagian Andi (2/4) sama besar dengan bagian Dewi (4/8)?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Benar! 2/4 dan 4/8 keduanya senilai dengan 1/2."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b2",
    "title": "Bab 2: Belanja Hemat di Koperasi",
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
      "title": "Kuis Interaktif: Bab 2: Belanja Hemat di Koperasi",
      "questions": [
        {
          "id": "q-materi-k4-b2-1",
          "questionText": "Pasangkan bentuk persentase dengan bentuk pecahan biasa yang senilai!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "25% = 1/4, 50% = 1/2, 10% = 1/10"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "25%",
              "right": "1/4"
            },
            {
              "left": "50%",
              "right": "1/2"
            },
            {
              "left": "10%",
              "right": "1/10"
            }
          ],
          "leftItems": [
            "25%",
            "50%",
            "10%"
          ],
          "rightItems": [
            "1/2",
            "1/10",
            "1/4"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "25% = 25/100 = 1/4, 50% = 50/100 = 1/2, dan 10% = 10/100 = 1/10."
        },
        {
          "id": "q-materi-k4-b2-2",
          "questionText": "Sebuah buku tulis berharga Rp 10.000 mendapat potongan diskon 20%. Berapa rupiah potongan harga yang didapat pembeli?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 1.000",
            "Rp 2.000",
            "Rp 3.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "20% dari Rp 10.000 = (20/100) × 10.000 = Rp 2.000."
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
    "created_at": "2026-11-16T07:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Belanja Hemat di Koperasi",
      "questions": [
        {
          "id": "q-materi-k4-b2-1",
          "questionText": "Pasangkan bentuk persentase dengan bentuk pecahan biasa yang senilai!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "25% = 1/4, 50% = 1/2, 10% = 1/10"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "25%",
              "right": "1/4"
            },
            {
              "left": "50%",
              "right": "1/2"
            },
            {
              "left": "10%",
              "right": "1/10"
            }
          ],
          "leftItems": [
            "25%",
            "50%",
            "10%"
          ],
          "rightItems": [
            "1/2",
            "1/10",
            "1/4"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "25% = 25/100 = 1/4, 50% = 50/100 = 1/2, dan 10% = 10/100 = 1/10."
        },
        {
          "id": "q-materi-k4-b2-2",
          "questionText": "Sebuah buku tulis berharga Rp 10.000 mendapat potongan diskon 20%. Berapa rupiah potongan harga yang didapat pembeli?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 1.000",
            "Rp 2.000",
            "Rp 3.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "20% dari Rp 10.000 = (20/100) × 10.000 = Rp 2.000."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b3",
    "title": "Bab 3: Kebun Sayur Sekolah",
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
      "title": "Kuis Interaktif: Bab 3: Kebun Sayur Sekolah",
      "questions": [
        {
          "id": "q-materi-k4-b3-1",
          "questionText": "Berapakah faktor persekutuan terbesar (FPB) dari 12 dan 18?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3",
            "6",
            "9"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor persekutuan terbesar adalah 6."
        },
        {
          "id": "q-materi-k4-b3-2",
          "questionText": "Lampu merah menyala setiap 4 detik, dan lampu hijau menyala setiap 6 detik. Setiap berapa detik kedua lampu akan menyala bersamaan (KPK)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 detik",
            "12 detik",
            "24 detik"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "KPK dari 4 dan 6 adalah 12 detik."
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
    "created_at": "2026-11-16T08:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Kebun Sayur Sekolah",
      "questions": [
        {
          "id": "q-materi-k4-b3-1",
          "questionText": "Berapakah faktor persekutuan terbesar (FPB) dari 12 dan 18?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3",
            "6",
            "9"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor persekutuan terbesar adalah 6."
        },
        {
          "id": "q-materi-k4-b3-2",
          "questionText": "Lampu merah menyala setiap 4 detik, dan lampu hijau menyala setiap 6 detik. Setiap berapa detik kedua lampu akan menyala bersamaan (KPK)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 detik",
            "12 detik",
            "24 detik"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "KPK dari 4 dan 6 adalah 12 detik."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b4",
    "title": "Bab 4: Mengecat Pagar Sekolah",
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
      "title": "Kuis Interaktif: Bab 4: Mengecat Pagar Sekolah",
      "questions": [
        {
          "id": "q-materi-k4-b4-1",
          "questionText": "Berapa luas kebun sayur berbentuk persegi panjang dengan panjang 8 meter dan lebar 5 meter?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "26 m²",
            "40 m²",
            "45 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas persegi panjang = panjang × lebar = 8 m × 5 m = 40 m²."
        },
        {
          "id": "q-materi-k4-b4-2",
          "questionText": "Berapa meter keliling pagar yang mengelilingi kebun sayur 8 meter × 5 meter tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "26 meter",
            "30 meter",
            "40 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Keliling = 2 × (p + l) = 2 × (8 + 5) = 2 × 13 = 26 meter."
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
    "created_at": "2026-11-16T09:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Mengecat Pagar Sekolah",
      "questions": [
        {
          "id": "q-materi-k4-b4-1",
          "questionText": "Berapa luas kebun sayur berbentuk persegi panjang dengan panjang 8 meter dan lebar 5 meter?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "26 m²",
            "40 m²",
            "45 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas persegi panjang = panjang × lebar = 8 m × 5 m = 40 m²."
        },
        {
          "id": "q-materi-k4-b4-2",
          "questionText": "Berapa meter keliling pagar yang mengelilingi kebun sayur 8 meter × 5 meter tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "26 meter",
            "30 meter",
            "40 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Keliling = 2 × (p + l) = 2 × (8 + 5) = 2 × 13 = 26 meter."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b5",
    "title": "Bab 5: Telur dari Peternakan Pak Bowo",
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
      "title": "Kuis Interaktif: Bab 5: Telur dari Peternakan Pak Bowo",
      "questions": [
        {
          "id": "q-materi-k4-b5-1",
          "questionText": "Berdasarkan diagram batang penjualan es krim: Rasa apakah yang paling banyak terjual sepanjang hari Minggu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Cokelat",
            "Vanila",
            "Stroberi"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Batang es krim rasa cokelat menjulang paling tinggi pada diagram penjualan."
        },
        {
          "id": "q-materi-k4-b5-2",
          "questionText": "Berapa selisih penjualan es krim rasa cokelat (45 buah) dan vanila (30 buah)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 buah",
            "15 buah",
            "20 buah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Selisih = 45 - 30 = 15 buah."
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
    "created_at": "2026-11-16T10:17:22.271Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Telur dari Peternakan Pak Bowo",
      "questions": [
        {
          "id": "q-materi-k4-b5-1",
          "questionText": "Berdasarkan diagram batang penjualan es krim: Rasa apakah yang paling banyak terjual sepanjang hari Minggu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Cokelat",
            "Vanila",
            "Stroberi"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Batang es krim rasa cokelat menjulang paling tinggi pada diagram penjualan."
        },
        {
          "id": "q-materi-k4-b5-2",
          "questionText": "Berapa selisih penjualan es krim rasa cokelat (45 buah) dan vanila (30 buah)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10 buah",
            "15 buah",
            "20 buah"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Selisih = 45 - 30 = 15 buah."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b6",
    "title": "Bab 6: Kursi Pentas Seni",
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
      "title": "Kuis Interaktif: Bab 6: Kursi Pentas Seni",
      "questions": [
        {
          "id": "q-materi-k4-b6-1",
          "questionText": "Di sebuah aula terdapat 12 baris kursi pentas seni, dan setiap baris berisi 15 kursi. Berapa jumlah seluruh kursi?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "150 kursi",
            "180 kursi",
            "200 kursi"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "12 × 15 = 180 kursi di aula."
        },
        {
          "id": "q-materi-k4-b6-2",
          "questionText": "Apakah satu baris kalimat dalam karya puisi disebut bait?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Salah! Satu baris dalam puisi disebut larik. Kumpulan beberapa larik baris barulah disebut bait."
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
    "created_at": "2026-11-16T11:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Kursi Pentas Seni",
      "questions": [
        {
          "id": "q-materi-k4-b6-1",
          "questionText": "Di sebuah aula terdapat 12 baris kursi pentas seni, dan setiap baris berisi 15 kursi. Berapa jumlah seluruh kursi?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "150 kursi",
            "180 kursi",
            "200 kursi"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "12 × 15 = 180 kursi di aula."
        },
        {
          "id": "q-materi-k4-b6-2",
          "questionText": "Apakah satu baris kalimat dalam karya puisi disebut bait?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Salah! Satu baris dalam puisi disebut larik. Kumpulan beberapa larik baris barulah disebut bait."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b7",
    "title": "Bab 7: Pagar Kandang Kambing",
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
      "title": "Kuis Interaktif: Bab 7: Pagar Kandang Kambing",
      "questions": [
        {
          "id": "q-materi-k4-b7-1",
          "questionText": "Sudut yang besarnya lebih dari 90 derajat tetapi kurang dari 180 derajat dinamakan sudut...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k4-b7-jenis-sudut.svg",
          "points": 50,
          "options": [
            "Sudut Lancip",
            "Sudut Siku-Siku",
            "Sudut Tumpul"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Sudut tumpul memiliki bukaan rentang lebih besar dari 90 derajat."
        },
        {
          "id": "q-materi-k4-b7-2",
          "questionText": "Lingkari gambar sudut SIKU-SIKU (tepat 90°) di bawah!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Sudut Lancip",
            "Sudut Siku-Siku",
            "Sudut Tumpul"
          ],
          "imageOptions": [
            {
              "label": "Sudut Lancip (< 90°)",
              "image": "/quiz/items/sudut-lancip.svg"
            },
            {
              "label": "Sudut Siku-Siku (Tepat 90°)",
              "image": "/quiz/items/sudut-sikusiku.svg"
            },
            {
              "label": "Sudut Tumpul (> 90°)",
              "image": "/quiz/items/sudut-tumpul.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sudut siku-siku memiliki dua garis yang saling tegak lurus sempurna berukuran 90 derajat."
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
    "created_at": "2026-11-16T12:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Pagar Kandang Kambing",
      "questions": [
        {
          "id": "q-materi-k4-b7-1",
          "questionText": "Sudut yang besarnya lebih dari 90 derajat tetapi kurang dari 180 derajat dinamakan sudut...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k4-b7-jenis-sudut.svg",
          "points": 50,
          "options": [
            "Sudut Lancip",
            "Sudut Siku-Siku",
            "Sudut Tumpul"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Sudut tumpul memiliki bukaan rentang lebih besar dari 90 derajat."
        },
        {
          "id": "q-materi-k4-b7-2",
          "questionText": "Lingkari gambar sudut SIKU-SIKU (tepat 90°) di bawah!",
          "instructionBadge": "Lingkari Gambar yang Benar",
          "type": "image_choice",
          "image": "",
          "points": 50,
          "options": [
            "Sudut Lancip",
            "Sudut Siku-Siku",
            "Sudut Tumpul"
          ],
          "imageOptions": [
            {
              "label": "Sudut Lancip (< 90°)",
              "image": "/quiz/items/sudut-lancip.svg"
            },
            {
              "label": "Sudut Siku-Siku (Tepat 90°)",
              "image": "/quiz/items/sudut-sikusiku.svg"
            },
            {
              "label": "Sudut Tumpul (> 90°)",
              "image": "/quiz/items/sudut-tumpul.svg"
            }
          ],
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sudut siku-siku memiliki dua garis yang saling tegak lurus sempurna berukuran 90 derajat."
        }
      ]
    }
  },
  {
    "id": "materi-k4-b8",
    "title": "Bab 8: Toko Kue Bu Ratna",
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
      "title": "Kuis Interaktif: Bab 8: Toko Kue Bu Ratna",
      "questions": [
        {
          "id": "q-materi-k4-b8-1",
          "questionText": "Sebuah denah sekolah menggunakan skala 1 : 100. Jika jarak ruang guru ke perpustakaan pada denah adalah 5 cm, berapa jarak sebenarnya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "50 cm",
            "5 meter",
            "50 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "5 cm × 100 = 500 cm = 5 meter jarak sebenarnya."
        },
        {
          "id": "q-materi-k4-b8-2",
          "questionText": "Arah mata angin yang berada di antara utara dan timur disebut arah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Timur Laut",
            "Tenggara",
            "Barat Laut"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Antara utara dan timur adalah arah timur laut."
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
    "created_at": "2026-11-16T13:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Toko Kue Bu Ratna",
      "questions": [
        {
          "id": "q-materi-k4-b8-1",
          "questionText": "Sebuah denah sekolah menggunakan skala 1 : 100. Jika jarak ruang guru ke perpustakaan pada denah adalah 5 cm, berapa jarak sebenarnya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "50 cm",
            "5 meter",
            "50 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "5 cm × 100 = 500 cm = 5 meter jarak sebenarnya."
        },
        {
          "id": "q-materi-k4-b8-2",
          "questionText": "Arah mata angin yang berada di antara utara dan timur disebut arah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Timur Laut",
            "Tenggara",
            "Barat Laut"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Antara utara dan timur adalah arah timur laut."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b1",
    "title": "Bab 1: Menabung untuk Sepeda",
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
      "title": "Kuis Interaktif: Bab 1: Menabung untuk Sepeda",
      "questions": [
        {
          "id": "q-materi-k5-b1-1",
          "questionText": "Berapakah hasil dari 2/3 + 1/4?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3/7",
            "11/12",
            "3/12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Samakan penyebut ke KPK 12: 8/12 + 3/12 = 11/12."
        },
        {
          "id": "q-materi-k5-b1-2",
          "questionText": "Pak Danu memiliki 3 1/2 meter kayu. Dipotong 1 1/4 meter untuk membuat pigura. Berapa meter sisa kayu Pak Danu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 1/4 meter",
            "2 1/2 meter",
            "2 3/4 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "3 2/4 - 1 1/4 = 2 1/4 meter kayu."
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
    "created_at": "2026-11-16T14:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Menabung untuk Sepeda",
      "questions": [
        {
          "id": "q-materi-k5-b1-1",
          "questionText": "Berapakah hasil dari 2/3 + 1/4?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "3/7",
            "11/12",
            "3/12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Samakan penyebut ke KPK 12: 8/12 + 3/12 = 11/12."
        },
        {
          "id": "q-materi-k5-b1-2",
          "questionText": "Pak Danu memiliki 3 1/2 meter kayu. Dipotong 1 1/4 meter untuk membuat pigura. Berapa meter sisa kayu Pak Danu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 1/4 meter",
            "2 1/2 meter",
            "2 3/4 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "3 2/4 - 1 1/4 = 2 1/4 meter kayu."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b2",
    "title": "Bab 2: Resep Es Buah Segar",
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
      "title": "Kuis Interaktif: Bab 2: Resep Es Buah Segar",
      "questions": [
        {
          "id": "q-materi-k5-b2-1",
          "questionText": "Berapakah hasil perkalian pecahan: 3/5 × 2/7?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "5/12",
            "6/35",
            "6/12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kalikan pembilang dengan pembilang dan penyebut dengan penyebut: (3 × 2) / (5 × 7) = 6/35."
        },
        {
          "id": "q-materi-k5-b2-2",
          "questionText": "Urutkan langkah membuat es buah segar dari awal hingga siap disajikan!",
          "instructionBadge": "Urutkan Langkah-Langkah",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "Cuci buah -> Potong buah -> Tuang air & sirup -> Sajikan",
            "Potong buah -> Cuci buah -> Sajikan -> Tuang air & sirup",
            "Sajikan -> Potong buah -> Cuci buah -> Tuang air & sirup"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "Sajikan",
            "Potong buah",
            "Cuci buah",
            "Tuang air dan sirup"
          ],
          "correctOrder": [
            "Cuci buah",
            "Potong buah",
            "Tuang air dan sirup",
            "Sajikan"
          ],
          "correctOptionIndex": 0,
          "explanation": "Urutan higienis: Cuci buah hingga bersih -> Potong dadu -> Tuangkan air dan sirup -> Sajikan dengan es."
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
    "created_at": "2026-11-16T15:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Resep Es Buah Segar",
      "questions": [
        {
          "id": "q-materi-k5-b2-1",
          "questionText": "Berapakah hasil perkalian pecahan: 3/5 × 2/7?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "5/12",
            "6/35",
            "6/12"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kalikan pembilang dengan pembilang dan penyebut dengan penyebut: (3 × 2) / (5 × 7) = 6/35."
        },
        {
          "id": "q-materi-k5-b2-2",
          "questionText": "Urutkan langkah membuat es buah segar dari awal hingga siap disajikan!",
          "instructionBadge": "Urutkan Langkah-Langkah",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "Cuci buah -> Potong buah -> Tuang air & sirup -> Sajikan",
            "Potong buah -> Cuci buah -> Sajikan -> Tuang air & sirup",
            "Sajikan -> Potong buah -> Cuci buah -> Tuang air & sirup"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "Sajikan",
            "Potong buah",
            "Cuci buah",
            "Tuang air dan sirup"
          ],
          "correctOrder": [
            "Cuci buah",
            "Potong buah",
            "Tuang air dan sirup",
            "Sajikan"
          ],
          "correctOptionIndex": 0,
          "explanation": "Urutan higienis: Cuci buah hingga bersih -> Potong dadu -> Tuangkan air dan sirup -> Sajikan dengan es."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b3",
    "title": "Bab 3: Taman Bermain Balai Desa",
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
      "title": "Kuis Interaktif: Bab 3: Taman Bermain Balai Desa",
      "questions": [
        {
          "id": "q-materi-k5-b3-1",
          "questionText": "Sebuah taman kota berbentuk huruf L dibelah menjadi 2 persegi panjang: bagian satu 6 m × 4 m dan bagian dua 3 m × 2 m. Berapa luas total taman?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k5-b3-taman-l.svg",
          "points": 50,
          "options": [
            "24 m²",
            "30 m²",
            "36 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas gabungan = (6 × 4) + (3 × 2) = 24 + 6 = 30 m²."
        },
        {
          "id": "q-materi-k5-b3-2",
          "questionText": "Jika di sekeliling taman L tersebut akan dipasang lampu hias setiap jarak 3 meter, konsep apakah yang digunakan untuk menghitung kebutuhan lampu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Luas bangun",
            "Keliling bangun",
            "Volume bangun"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Memasang pembatas atau lampu di sepanjang tepi luar menggunakan perhitungan keliling."
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
    "created_at": "2026-11-16T16:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Taman Bermain Balai Desa",
      "questions": [
        {
          "id": "q-materi-k5-b3-1",
          "questionText": "Sebuah taman kota berbentuk huruf L dibelah menjadi 2 persegi panjang: bagian satu 6 m × 4 m dan bagian dua 3 m × 2 m. Berapa luas total taman?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k5-b3-taman-l.svg",
          "points": 50,
          "options": [
            "24 m²",
            "30 m²",
            "36 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas gabungan = (6 × 4) + (3 × 2) = 24 + 6 = 30 m²."
        },
        {
          "id": "q-materi-k5-b3-2",
          "questionText": "Jika di sekeliling taman L tersebut akan dipasang lampu hias setiap jarak 3 meter, konsep apakah yang digunakan untuk menghitung kebutuhan lampu?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Luas bangun",
            "Keliling bangun",
            "Volume bangun"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Memasang pembatas atau lampu di sepanjang tepi luar menggunakan perhitungan keliling."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b4",
    "title": "Bab 4: Jadwal Kerja Bakti dan Bingkisan",
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
      "title": "Kuis Interaktif: Bab 4: Jadwal Kerja Bakti dan Bingkisan",
      "questions": [
        {
          "id": "q-materi-k5-b4-1",
          "questionText": "Ali ronda malam setiap 4 hari sekali dan Budi setiap 6 hari sekali. Pada hari ke berapa mereka ronda bersama untuk pertama kalinya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Hari ke-10",
            "Hari ke-12",
            "Hari ke-24"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "KPK dari 4 dan 6 adalah 12 hari."
        },
        {
          "id": "q-materi-k5-b4-2",
          "questionText": "Pasangkan jenis soal cerita dengan cara penyelesaian matematika yang tepat (KPK atau FPB)!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Bertemu lagi = KPK, Membagi bingkisan merata = FPB"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Kapan mereka bertemu lagi bersamaan?",
              "right": "KPK (Kelipatan Persekutuan Terkecil)"
            },
            {
              "left": "Dibagi sama banyak ke kantong sebanyak-banyaknya",
              "right": "FPB (Faktor Persekutuan Terbesar)"
            }
          ],
          "leftItems": [
            "Kapan mereka bertemu lagi bersamaan?",
            "Dibagi sama banyak ke kantong sebanyak-banyaknya"
          ],
          "rightItems": [
            "FPB (Faktor Persekutuan Terbesar)",
            "KPK (Kelipatan Persekutuan Terkecil)"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Jadwal berulang diselesaikan dengan KPK, sedangkan pembagian merata bingkisan diselesaikan dengan FPB."
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
    "created_at": "2026-11-16T17:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Jadwal Kerja Bakti dan Bingkisan",
      "questions": [
        {
          "id": "q-materi-k5-b4-1",
          "questionText": "Ali ronda malam setiap 4 hari sekali dan Budi setiap 6 hari sekali. Pada hari ke berapa mereka ronda bersama untuk pertama kalinya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Hari ke-10",
            "Hari ke-12",
            "Hari ke-24"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "KPK dari 4 dan 6 adalah 12 hari."
        },
        {
          "id": "q-materi-k5-b4-2",
          "questionText": "Pasangkan jenis soal cerita dengan cara penyelesaian matematika yang tepat (KPK atau FPB)!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Bertemu lagi = KPK, Membagi bingkisan merata = FPB"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Kapan mereka bertemu lagi bersamaan?",
              "right": "KPK (Kelipatan Persekutuan Terkecil)"
            },
            {
              "left": "Dibagi sama banyak ke kantong sebanyak-banyaknya",
              "right": "FPB (Faktor Persekutuan Terbesar)"
            }
          ],
          "leftItems": [
            "Kapan mereka bertemu lagi bersamaan?",
            "Dibagi sama banyak ke kantong sebanyak-banyaknya"
          ],
          "rightItems": [
            "FPB (Faktor Persekutuan Terbesar)",
            "KPK (Kelipatan Persekutuan Terkecil)"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Jadwal berulang diselesaikan dengan KPK, sedangkan pembagian merata bingkisan diselesaikan dengan FPB."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b5",
    "title": "Bab 5: Jarum Jam Menara Balai Desa",
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
      "title": "Kuis Interaktif: Bab 5: Jarum Jam Menara Balai Desa",
      "questions": [
        {
          "id": "q-materi-k5-b5-1",
          "questionText": "Berapa derajat sudut terkecil yang dibentuk oleh kedua jarum jam pada pukul 03.00 tepat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "60°",
            "90°",
            "120°"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Tiap angka bernilai 30°. Pukul 03.00 jarum menunjuk angka 12 dan 3: 3 × 30° = 90° (siku-siku)."
        },
        {
          "id": "q-materi-k5-b5-2",
          "questionText": "Pasangkan besar sudut jarum jam menara desa dengan jenis sudutnya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "60° = Lancip, 90° = Siku-siku, 120° = Tumpul"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Sudut 60°",
              "right": "Sudut Lancip"
            },
            {
              "left": "Sudut 90°",
              "right": "Sudut Siku-Siku"
            },
            {
              "left": "Sudut 120°",
              "right": "Sudut Tumpul"
            }
          ],
          "leftItems": [
            "Sudut 60°",
            "Sudut 90°",
            "Sudut 120°"
          ],
          "rightItems": [
            "Sudut Siku-Siku",
            "Sudut Tumpul",
            "Sudut Lancip"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Kurang dari 90° adalah sudut lancip, tepat 90° sudut siku-siku, dan lebih dari 90° sudut tumpul."
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
    "created_at": "2026-11-16T18:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Jarum Jam Menara Balai Desa",
      "questions": [
        {
          "id": "q-materi-k5-b5-1",
          "questionText": "Berapa derajat sudut terkecil yang dibentuk oleh kedua jarum jam pada pukul 03.00 tepat?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "60°",
            "90°",
            "120°"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Tiap angka bernilai 30°. Pukul 03.00 jarum menunjuk angka 12 dan 3: 3 × 30° = 90° (siku-siku)."
        },
        {
          "id": "q-materi-k5-b5-2",
          "questionText": "Pasangkan besar sudut jarum jam menara desa dengan jenis sudutnya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "60° = Lancip, 90° = Siku-siku, 120° = Tumpul"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Sudut 60°",
              "right": "Sudut Lancip"
            },
            {
              "left": "Sudut 90°",
              "right": "Sudut Siku-Siku"
            },
            {
              "left": "Sudut 120°",
              "right": "Sudut Tumpul"
            }
          ],
          "leftItems": [
            "Sudut 60°",
            "Sudut 90°",
            "Sudut 120°"
          ],
          "rightItems": [
            "Sudut Siku-Siku",
            "Sudut Tumpul",
            "Sudut Lancip"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Kurang dari 90° adalah sudut lancip, tepat 90° sudut siku-siku, dan lebih dari 90° sudut tumpul."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b6",
    "title": "Bab 6: Akuarium Kelas Lima",
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
      "title": "Kuis Interaktif: Bab 6: Akuarium Kelas Lima",
      "questions": [
        {
          "id": "q-materi-k5-b6-1",
          "questionText": "Sebuah akuarium kaca balok berukuran panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Berapa volume akuarium tersebut dalam cm³?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k5-b6-akuarium-balok.svg",
          "points": 50,
          "options": [
            "60.000 cm³",
            "6.000 cm³",
            "1.200 cm³"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Volume balok = p × l × t = 50 × 30 × 40 = 60.000 cm³."
        },
        {
          "id": "q-materi-k5-b6-2",
          "questionText": "Jika 1 liter = 1.000 cm³, berapa liter air yang dibutuhkan untuk mengisi penuh akuarium 60.000 cm³ tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 liter",
            "60 liter",
            "600 liter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "60.000 cm³ : 1.000 = 60 liter air."
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
    "created_at": "2026-11-16T19:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Akuarium Kelas Lima",
      "questions": [
        {
          "id": "q-materi-k5-b6-1",
          "questionText": "Sebuah akuarium kaca balok berukuran panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Berapa volume akuarium tersebut dalam cm³?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k5-b6-akuarium-balok.svg",
          "points": 50,
          "options": [
            "60.000 cm³",
            "6.000 cm³",
            "1.200 cm³"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Volume balok = p × l × t = 50 × 30 × 40 = 60.000 cm³."
        },
        {
          "id": "q-materi-k5-b6-2",
          "questionText": "Jika 1 liter = 1.000 cm³, berapa liter air yang dibutuhkan untuk mengisi penuh akuarium 60.000 cm³ tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "6 liter",
            "60 liter",
            "600 liter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "60.000 cm³ : 1.000 = 60 liter air."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b7",
    "title": "Bab 7: Panen Padi Meningkat",
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
      "title": "Kuis Interaktif: Bab 7: Panen Padi Meningkat",
      "questions": [
        {
          "id": "q-materi-k5-b7-1",
          "questionText": "Berdasarkan teks berita: Berapa persen kenaikan panen padi di Desa Sukamaju pada tahun ini dibandingkan tahun sebelumnya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10%",
            "15%",
            "25%"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Berita mencatat keberhasilan kelompok tani meningkatkan panen sebesar 15% berkat irigasi modern."
        },
        {
          "id": "q-materi-k5-b7-2",
          "questionText": "Pasangkan unsur berita 5W1H dari teks panen padi dengan jawabannya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Siapa? = Pak Joko & kelompok tani, Di mana? = Desa Sukamaju"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Siapa tokoh yang diberitakan?",
              "right": "Pak Joko dan kelompok tani"
            },
            {
              "left": "Di mana lokasi panen berlangsung?",
              "right": "Desa Sukamaju"
            }
          ],
          "leftItems": [
            "Siapa tokoh yang diberitakan?",
            "Di mana lokasi panen berlangsung?"
          ],
          "rightItems": [
            "Desa Sukamaju",
            "Pak Joko dan kelompok tani"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Tokoh beritanya adalah Pak Joko bersama kelompok tani dan berlokasi di Desa Sukamaju."
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
    "created_at": "2026-11-16T20:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Panen Padi Meningkat",
      "questions": [
        {
          "id": "q-materi-k5-b7-1",
          "questionText": "Berdasarkan teks berita: Berapa persen kenaikan panen padi di Desa Sukamaju pada tahun ini dibandingkan tahun sebelumnya?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "10%",
            "15%",
            "25%"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Berita mencatat keberhasilan kelompok tani meningkatkan panen sebesar 15% berkat irigasi modern."
        },
        {
          "id": "q-materi-k5-b7-2",
          "questionText": "Pasangkan unsur berita 5W1H dari teks panen padi dengan jawabannya!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Siapa? = Pak Joko & kelompok tani, Di mana? = Desa Sukamaju"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Siapa tokoh yang diberitakan?",
              "right": "Pak Joko dan kelompok tani"
            },
            {
              "left": "Di mana lokasi panen berlangsung?",
              "right": "Desa Sukamaju"
            }
          ],
          "leftItems": [
            "Siapa tokoh yang diberitakan?",
            "Di mana lokasi panen berlangsung?"
          ],
          "rightItems": [
            "Desa Sukamaju",
            "Pak Joko dan kelompok tani"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Tokoh beritanya adalah Pak Joko bersama kelompok tani dan berlokasi di Desa Sukamaju."
        }
      ]
    }
  },
  {
    "id": "materi-k5-b8",
    "title": "Bab 8: Lomba Lompat Jauh",
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
      "title": "Kuis Interaktif: Bab 8: Lomba Lompat Jauh",
      "questions": [
        {
          "id": "q-materi-k5-b8-1",
          "questionText": "Urutkan hasil lompatan atlet cilik berikut dari yang TERJAUH ke yang terpendek!",
          "instructionBadge": "Urutkan Bilangan Desimal",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "2,8 m > 2,54 m > 2,45 m > 2,08 m",
            "2,08 m > 2,45 m > 2,54 m > 2,8 m",
            "2,8 m > 2,08 m > 2,54 m > 2,45 m"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "2,45 m",
            "2,8 m",
            "2,08 m",
            "2,54 m"
          ],
          "correctOrder": [
            "2,8 m",
            "2,54 m",
            "2,45 m",
            "2,08 m"
          ],
          "correctOptionIndex": 0,
          "explanation": "2,8 (2,80 m) adalah yang paling jauh, disusul 2,54 m, lalu 2,45 m, dan paling pendek 2,08 m."
        },
        {
          "id": "q-materi-k5-b8-2",
          "questionText": "Berapa selisih jarak antara lompatan terjauh (2,8 m) dan lompatan terpendek (2,08 m)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "0,72 meter",
            "0,88 meter",
            "0,78 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "2,80 - 2,08 = 0,72 meter."
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
    "created_at": "2026-11-16T21:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Lomba Lompat Jauh",
      "questions": [
        {
          "id": "q-materi-k5-b8-1",
          "questionText": "Urutkan hasil lompatan atlet cilik berikut dari yang TERJAUH ke yang terpendek!",
          "instructionBadge": "Urutkan Bilangan Desimal",
          "type": "ordering",
          "image": "",
          "points": 50,
          "options": [
            "2,8 m > 2,54 m > 2,45 m > 2,08 m",
            "2,08 m > 2,45 m > 2,54 m > 2,8 m",
            "2,8 m > 2,08 m > 2,54 m > 2,45 m"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": [
            "2,45 m",
            "2,8 m",
            "2,08 m",
            "2,54 m"
          ],
          "correctOrder": [
            "2,8 m",
            "2,54 m",
            "2,45 m",
            "2,08 m"
          ],
          "correctOptionIndex": 0,
          "explanation": "2,8 (2,80 m) adalah yang paling jauh, disusul 2,54 m, lalu 2,45 m, dan paling pendek 2,08 m."
        },
        {
          "id": "q-materi-k5-b8-2",
          "questionText": "Berapa selisih jarak antara lompatan terjauh (2,8 m) dan lompatan terpendek (2,08 m)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "0,72 meter",
            "0,88 meter",
            "0,78 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "2,80 - 2,08 = 0,72 meter."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b1",
    "title": "Bab 1: Takaran Pupuk Pak Darto",
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
      "title": "Kuis Interaktif: Bab 1: Takaran Pupuk Pak Darto",
      "questions": [
        {
          "id": "q-materi-k6-b1-1",
          "questionText": "Suhu di dalam freezer adalah -4°C, sedangkan suhu di dalam ruangan ber-AC adalah 20°C. Berapakah selisih suhu antara ruangan dan freezer?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "16°C",
            "24°C",
            "-24°C"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Selisih = 20 - (-4) = 20 + 4 = 24°C."
        },
        {
          "id": "q-materi-k6-b1-2",
          "questionText": "Seekor lumba-lumba berenang pada kedalaman -8 meter di bawah permukaan laut. Kemudian lumba-lumba melompat naik setinggi 11 meter ke udara. Berada di ketinggian berapa lumba-lumba di atas permukaan laut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 meter",
            "3 meter",
            "4 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "-8 + 11 = 3 meter di atas permukaan air laut."
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
    "created_at": "2026-11-16T22:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 1: Takaran Pupuk Pak Darto",
      "questions": [
        {
          "id": "q-materi-k6-b1-1",
          "questionText": "Suhu di dalam freezer adalah -4°C, sedangkan suhu di dalam ruangan ber-AC adalah 20°C. Berapakah selisih suhu antara ruangan dan freezer?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "16°C",
            "24°C",
            "-24°C"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Selisih = 20 - (-4) = 20 + 4 = 24°C."
        },
        {
          "id": "q-materi-k6-b1-2",
          "questionText": "Seekor lumba-lumba berenang pada kedalaman -8 meter di bawah permukaan laut. Kemudian lumba-lumba melompat naik setinggi 11 meter ke udara. Berada di ketinggian berapa lumba-lumba di atas permukaan laut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 meter",
            "3 meter",
            "4 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "-8 + 11 = 3 meter di atas permukaan air laut."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b2",
    "title": "Bab 2: Peta Harta Karun Perkemahan",
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
      "title": "Kuis Interaktif: Bab 2: Peta Harta Karun Perkemahan",
      "questions": [
        {
          "id": "q-materi-k6-b2-1",
          "questionText": "Perhatikan denah koordinat perkemahan! Jika Pos Utama berada di titik asal (0, 0), di manakah koordinat letak Tenda Regu Elang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k6-b2-peta-perkemahan.svg",
          "points": 50,
          "options": [
            "(4, 3)",
            "(3, 4)",
            "(-4, 3)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Maju 4 petak ke arah sumbu X (timur) dan 3 petak ke arah sumbu Y (utara): koordinat (4, 3)."
        },
        {
          "id": "q-materi-k6-b2-2",
          "questionText": "Sumber air bersih terletak di koordinat (-2, 5). Di kuadran manakah letak sumber air tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kuadran I",
            "Kuadran II",
            "Kuadran III"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sumbu X negatif dan sumbu Y positif berada di Kuadran II."
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
    "created_at": "2026-11-16T23:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 2: Peta Harta Karun Perkemahan",
      "questions": [
        {
          "id": "q-materi-k6-b2-1",
          "questionText": "Perhatikan denah koordinat perkemahan! Jika Pos Utama berada di titik asal (0, 0), di manakah koordinat letak Tenda Regu Elang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "/quiz/k6-b2-peta-perkemahan.svg",
          "points": 50,
          "options": [
            "(4, 3)",
            "(3, 4)",
            "(-4, 3)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Maju 4 petak ke arah sumbu X (timur) dan 3 petak ke arah sumbu Y (utara): koordinat (4, 3)."
        },
        {
          "id": "q-materi-k6-b2-2",
          "questionText": "Sumber air bersih terletak di koordinat (-2, 5). Di kuadran manakah letak sumber air tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Kuadran I",
            "Kuadran II",
            "Kuadran III"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Sumbu X negatif dan sumbu Y positif berada di Kuadran II."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b3",
    "title": "Bab 3: Survei Botol Minum Kelas 6",
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
      "title": "Kuis Interaktif: Bab 3: Survei Botol Minum Kelas 6",
      "questions": [
        {
          "id": "q-materi-k6-b3-1",
          "questionText": "Berdasarkan hasil survei 30 murid: 12 murid membawa botol isi ulang, 9 membawa botol plastik sekali pakai, dan 9 membeli minuman kemasan kantin. Berapa persen murid yang membawa botol isi ulang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "30%",
            "40%",
            "50%"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "(12 / 30) × 100% = 40%."
        },
        {
          "id": "q-materi-k6-b3-2",
          "questionText": "Apakah pernyataan berikut BENAR: \"Sebagian besar murid kelas 6 membawa botol minum isi ulang\"?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Salah! Sebagian besar berarti lebih dari separuh (> 50%). 12 dari 30 murid hanya 40% (kurang dari separuh)."
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
    "created_at": "2026-11-17T00:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 3: Survei Botol Minum Kelas 6",
      "questions": [
        {
          "id": "q-materi-k6-b3-1",
          "questionText": "Berdasarkan hasil survei 30 murid: 12 murid membawa botol isi ulang, 9 membawa botol plastik sekali pakai, dan 9 membeli minuman kemasan kantin. Berapa persen murid yang membawa botol isi ulang?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "30%",
            "40%",
            "50%"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "(12 / 30) × 100% = 40%."
        },
        {
          "id": "q-materi-k6-b3-2",
          "questionText": "Apakah pernyataan berikut BENAR: \"Sebagian besar murid kelas 6 membawa botol minum isi ulang\"?",
          "instructionBadge": "Lingkari B (Benar) atau S (Salah)",
          "type": "true_false",
          "image": "",
          "points": 50,
          "options": [
            "Benar (B)",
            "Salah (S)"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Salah! Sebagian besar berarti lebih dari separuh (> 50%). 12 dari 30 murid hanya 40% (kurang dari separuh)."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b4",
    "title": "Bab 4: Undian Doorprize Jalan Sehat",
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
      "title": "Kuis Interaktif: Bab 4: Undian Doorprize Jalan Sehat",
      "questions": [
        {
          "id": "q-materi-k6-b4-1",
          "questionText": "Sebuah kotak undian jalan sehat berisi 10 kupon hadiah utama sepeda dan 90 kupon hadiah hiburan payung. Berapakah peluang seorang peserta mengambil kupon hadiah utama sepeda?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1/10",
            "1/9",
            "1/100"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Peluang = 10 / (10 + 90) = 10 / 100 = 1/10 (atau 10%)."
        },
        {
          "id": "q-materi-k6-b4-2",
          "questionText": "Pasangkan kemungkinan peristiwa dengan tingkat kepastiannya pada undian berhadiah!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Dapat sepeda = Mungkin, Dapat televisi = Tidak mungkin, Dapat hadiah = Pasti"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Mendapatkan hadiah sepeda",
              "right": "Mungkin"
            },
            {
              "left": "Mendapatkan televisi (tidak ada di daftar)",
              "right": "Tidak Mungkin"
            },
            {
              "left": "Mendapatkan salah satu hadiah doorprize",
              "right": "Pasti"
            }
          ],
          "leftItems": [
            "Mendapatkan hadiah sepeda",
            "Mendapatkan televisi (tidak ada di daftar)",
            "Mendapatkan salah satu hadiah doorprize"
          ],
          "rightItems": [
            "Tidak Mungkin",
            "Pasti",
            "Mungkin"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Sepeda ada di daftar hadiah maka mungkin didapat; televisi tidak ada di daftar maka mustahil/tidak mungkin; dan setiap pemegang nomor menang pasti membawa pulang hadiah."
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
    "created_at": "2026-11-17T01:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 4: Undian Doorprize Jalan Sehat",
      "questions": [
        {
          "id": "q-materi-k6-b4-1",
          "questionText": "Sebuah kotak undian jalan sehat berisi 10 kupon hadiah utama sepeda dan 90 kupon hadiah hiburan payung. Berapakah peluang seorang peserta mengambil kupon hadiah utama sepeda?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1/10",
            "1/9",
            "1/100"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Peluang = 10 / (10 + 90) = 10 / 100 = 1/10 (atau 10%)."
        },
        {
          "id": "q-materi-k6-b4-2",
          "questionText": "Pasangkan kemungkinan peristiwa dengan tingkat kepastiannya pada undian berhadiah!",
          "instructionBadge": "Tarik Garis / Pasangkan",
          "type": "matching",
          "image": "",
          "points": 50,
          "options": [
            "Dapat sepeda = Mungkin, Dapat televisi = Tidak mungkin, Dapat hadiah = Pasti"
          ],
          "imageOptions": null,
          "pairs": [
            {
              "left": "Mendapatkan hadiah sepeda",
              "right": "Mungkin"
            },
            {
              "left": "Mendapatkan televisi (tidak ada di daftar)",
              "right": "Tidak Mungkin"
            },
            {
              "left": "Mendapatkan salah satu hadiah doorprize",
              "right": "Pasti"
            }
          ],
          "leftItems": [
            "Mendapatkan hadiah sepeda",
            "Mendapatkan televisi (tidak ada di daftar)",
            "Mendapatkan salah satu hadiah doorprize"
          ],
          "rightItems": [
            "Tidak Mungkin",
            "Pasti",
            "Mungkin"
          ],
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 0,
          "explanation": "Sepeda ada di daftar hadiah maka mungkin didapat; televisi tidak ada di daftar maka mustahil/tidak mungkin; dan setiap pemegang nomor menang pasti membawa pulang hadiah."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b5",
    "title": "Bab 5: Belanja Perlengkapan Kemah",
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
      "title": "Kuis Interaktif: Bab 5: Belanja Perlengkapan Kemah",
      "questions": [
        {
          "id": "q-materi-k6-b5-1",
          "questionText": "Sebuah taman kota berbentuk lingkaran memiliki diameter 28 meter (jari-jari r = 14 meter). Berapakah luas taman tersebut (gunakan π = 22/7)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "528 m²",
            "616 m²",
            "724 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas lingkaran = π × r² = (22/7) × 14 × 14 = 22 × 28 = 616 m²."
        },
        {
          "id": "q-materi-k6-b5-2",
          "questionText": "Berapa meter keliling tepi taman lingkaran dengan jari-jari 14 meter tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "44 meter",
            "88 meter",
            "132 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Keliling = 2 × π × r = 2 × (22/7) × 14 = 88 meter."
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
    "created_at": "2026-11-17T02:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 5: Belanja Perlengkapan Kemah",
      "questions": [
        {
          "id": "q-materi-k6-b5-1",
          "questionText": "Sebuah taman kota berbentuk lingkaran memiliki diameter 28 meter (jari-jari r = 14 meter). Berapakah luas taman tersebut (gunakan π = 22/7)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "528 m²",
            "616 m²",
            "724 m²"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Luas lingkaran = π × r² = (22/7) × 14 × 14 = 22 × 28 = 616 m²."
        },
        {
          "id": "q-materi-k6-b5-2",
          "questionText": "Berapa meter keliling tepi taman lingkaran dengan jari-jari 14 meter tersebut?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "44 meter",
            "88 meter",
            "132 meter"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Keliling = 2 × π × r = 2 × (22/7) × 14 = 88 meter."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b6",
    "title": "Bab 6: Sumur dan Tampah Nenek",
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
      "title": "Kuis Interaktif: Bab 6: Sumur dan Tampah Nenek",
      "questions": [
        {
          "id": "q-materi-k6-b6-1",
          "questionText": "Sebuah kaleng susu berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Berapakah volume kaleng susu tersebut dalam cm³ (π = 22/7)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1.450 cm³",
            "1.540 cm³",
            "1.620 cm³"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Volume tabung = π × r² × t = (22/7) × 7 × 7 × 10 = 154 × 10 = 1.540 cm³."
        },
        {
          "id": "q-materi-k6-b6-2",
          "questionText": "Bangun ruang yang memiliki 1 sisi lengkung selimut dan 1 titik puncak lancip di atasnya adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Tabung",
            "Kerucut",
            "Bola"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kerucut memiliki alas berbentuk lingkaran, satu selimut lengkung, dan sebuah titik puncak."
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
    "created_at": "2026-11-17T03:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 6: Sumur dan Tampah Nenek",
      "questions": [
        {
          "id": "q-materi-k6-b6-1",
          "questionText": "Sebuah kaleng susu berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Berapakah volume kaleng susu tersebut dalam cm³ (π = 22/7)?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "1.450 cm³",
            "1.540 cm³",
            "1.620 cm³"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Volume tabung = π × r² × t = (22/7) × 7 × 7 × 10 = 154 × 10 = 1.540 cm³."
        },
        {
          "id": "q-materi-k6-b6-2",
          "questionText": "Bangun ruang yang memiliki 1 sisi lengkung selimut dan 1 titik puncak lancip di atasnya adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Tabung",
            "Kerucut",
            "Bola"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Kerucut memiliki alas berbentuk lingkaran, satu selimut lengkung, dan sebuah titik puncak."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b7",
    "title": "Bab 7: Tinggi Tanaman Kacang Hijau",
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
      "title": "Kuis Interaktif: Bab 7: Tinggi Tanaman Kacang Hijau",
      "questions": [
        {
          "id": "q-materi-k6-b7-1",
          "questionText": "Data nilai ulangan matematika 5 orang murid adalah: 80, 75, 90, 85, dan 70. Berapakah nilai rata-rata (mean) ulangan mereka?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "78",
            "80",
            "82"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rata-rata = (80 + 75 + 90 + 85 + 70) / 5 = 400 / 5 = 80."
        },
        {
          "id": "q-materi-k6-b7-2",
          "questionText": "Diberikan data nilai: 7, 8, 8, 9, 6, 8, 10. Nilai yang paling sering muncul (modus) adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7",
            "8",
            "9"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Nilai 8 muncul paling sering yaitu sebanyak 3 kali."
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
    "created_at": "2026-11-17T04:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 7: Tinggi Tanaman Kacang Hijau",
      "questions": [
        {
          "id": "q-materi-k6-b7-1",
          "questionText": "Data nilai ulangan matematika 5 orang murid adalah: 80, 75, 90, 85, dan 70. Berapakah nilai rata-rata (mean) ulangan mereka?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "78",
            "80",
            "82"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Rata-rata = (80 + 75 + 90 + 85 + 70) / 5 = 400 / 5 = 80."
        },
        {
          "id": "q-materi-k6-b7-2",
          "questionText": "Diberikan data nilai: 7, 8, 8, 9, 6, 8, 10. Nilai yang paling sering muncul (modus) adalah...",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "7",
            "8",
            "9"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Nilai 8 muncul paling sering yaitu sebanyak 3 kali."
        }
      ]
    }
  },
  {
    "id": "materi-k6-b8",
    "title": "Bab 8: Peta Desa Kami",
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
      "title": "Kuis Interaktif: Bab 8: Peta Desa Kami",
      "questions": [
        {
          "id": "q-materi-k6-b8-1",
          "questionText": "Jika perbandingan uang saku Rian dan Dimas adalah 3 : 5, dan total uang mereka berdua adalah Rp 40.000, berapakah uang saku milik Dimas?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 15.000",
            "Rp 20.000",
            "Rp 25.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Bagian Dimas = (5 / (3 + 5)) × 40.000 = (5/8) × 40.000 = Rp 25.000."
        },
        {
          "id": "q-materi-k6-b8-2",
          "questionText": "Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam. Berapa jam waktu yang dibutuhkan untuk menempuh jarak perjalanan sejauh 180 km?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 jam",
            "3 jam",
            "4 jam"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Waktu tempuh = Jarak / Kecepatan = 180 km / 60 km/jam = 3 jam perjalanan."
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
    "created_at": "2026-11-17T05:17:22.272Z",
    "assessment": {
      "title": "Kuis Interaktif: Bab 8: Peta Desa Kami",
      "questions": [
        {
          "id": "q-materi-k6-b8-1",
          "questionText": "Jika perbandingan uang saku Rian dan Dimas adalah 3 : 5, dan total uang mereka berdua adalah Rp 40.000, berapakah uang saku milik Dimas?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "Rp 15.000",
            "Rp 20.000",
            "Rp 25.000"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 2,
          "explanation": "Bagian Dimas = (5 / (3 + 5)) × 40.000 = (5/8) × 40.000 = Rp 25.000."
        },
        {
          "id": "q-materi-k6-b8-2",
          "questionText": "Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam. Berapa jam waktu yang dibutuhkan untuk menempuh jarak perjalanan sejauh 180 km?",
          "instructionBadge": "Pilihan Ganda",
          "type": "multiple_choice",
          "image": "",
          "points": 50,
          "options": [
            "2 jam",
            "3 jam",
            "4 jam"
          ],
          "imageOptions": null,
          "pairs": null,
          "leftItems": null,
          "rightItems": null,
          "orderItems": null,
          "correctOrder": null,
          "correctOptionIndex": 1,
          "explanation": "Waktu tempuh = Jarak / Kecepatan = 180 km / 60 km/jam = 3 jam perjalanan."
        }
      ]
    }
  }
];
