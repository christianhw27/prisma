# PRISMA Design System (`design.md`)

Dokumen ini berisi panduan sistem desain visual, palet warna, tipografi, aturan penggunaan komponen, dan referensi antarmuka untuk platform pembelajaran anak **PRISMA**.

---

## 1. Palet Warna

Sistem warna PRISMA menggunakan **10 warna** dengan proporsi penggunaan:
* **70% Netral** (latar, kartu, teks, garis)
* **20% Utama / Mint** (identitas merek, interaksi utama)
* **10% Aksen** (kategori materi dan umpan balik)

### Daftar Token Warna

| Kategori | Nama Token | Kode Hex | Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| **Utama** | `Mint` | `#7FD4C4` | Tombol utama (*primary button*), penanda jawaban benar |
| **Utama** | `Mint Tua` | `#1E7A6F` | Teks tautan (*link*), ikon, cincin fokus (*focus ring*) |
| **Aksen** | `Peach` | `#FFB899` | Penanda kategori **Literasi** |
| **Aksen** | `Langit` | `#94C6FF` | Penanda kategori **Numerasi**, sorotan *Text-to-Speech* (TTS) |
| **Aksen** | `Kuning` | `#FFDE7A` | Petunjuk (*hint*), status "coba lagi", ikon bintang/penghargaan |
| **Netral** | `Krem` | `#FFF8F0` | Latar belakang utama halaman (*page background*) |
| **Netral** | `Putih` | `#FFFFFF` | Latar kartu (*card*), panel, dan *badge* kelas |
| **Netral** | `Garis` | `#8F8575` | Tepi kotak (*border*), batas pilihan jawaban, tepi *badge* |
| **Netral** | `Abu Teks` | `#5B6474` | Teks pendukung (*secondary text*), keterangan halaman/soal |
| **Netral** | `Tinta` | `#2B3445` | Teks utama (*primary text*), judul, isi bacaan |

### Aturan Penggunaan Warna
1. **Kontras Teks:** Seluruh teks di atas latar warna apa pun wajib menggunakan warna **Tinta (`#2B3445`)**, kecuali teks di atas **Mint Tua (`#1E7A6F`)** yang wajib menggunakan warna **Putih (`#FFFFFF`)**. Semua kombinasi pasangan teks telah lolos standar aksesibilitas kontras WCAG.
2. **Umpan Balik Ramah Anak:**
   * **Jawaban Benar:** Gunakan warna **Mint (`#7FD4C4`)** disertai ikon centang.
   * **Coba Lagi:** Gunakan warna **Kuning (`#FFDE7A`)** disertai ikon petunjuk/ulang.
   * **Tanpa Warna Merah:** Hindari penggunaan warna merah untuk menandai kesalahan agar anak tidak merasa takut atau tertekan saat salah menjawab.
3. **Penanda Kategori & Kelas:**
   * Kategori **Literasi** ditandai dengan **Peach (`#FFB899`)**.
   * Kategori **Numerasi** ditandai dengan **Langit (`#94C6FF`)**.
   * *Badge* tingkatan kelas menggunakan latar **Putih (`#FFFFFF`)** dengan tepi **Garis (`#8F8575`)**.
4. **Batasan Layar:** Gunakan maksimal **3 warna aksen** dalam satu layar agar tampilan tetap fokus dan tidak membingungkan anak.

---

## 2. Tipografi

PRISMA menggunakan dua keluarga *font* gratis berlisensi **SIL Open Font License** yang tersedia melalui Google Fonts.

### Keluarga Font
1. **Baloo 2** *(Judul)*
   * **Karakter:** Bulat, tebal, dan ramah anak.
   * **Penggunaan:** Judul halaman, judul bab, dan judul bagian.
   * **Ketebalan:** `Bold (700)`, `ExtraBold (800)`.
2. **Lexend** *(Bacaan & Antarmuka)*
   * **Karakter:** Dirancang khusus untuk meningkatkan keterbacaan visual (*readability*).
   * **Penggunaan:** Teks bacaan, soal cerita, angka matematika, label tombol, dan teks antarmuka.
   * **Ketebalan:** `Regular (400)`, `SemiBold (600)`.

### Skala Teks (*Type Scale*)

| Token Skala | Font Family | Ukuran / Line-Height | Weight | Konteks Penggunaan | Contoh Teks |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | Baloo 2 | `44px / 48px` | `800` | Judul layar pembuka / sambutan utama | *Ayo Belajar!* |
| `h1` | Baloo 2 | `34px / 40px` | `700` | Judul halaman atau topik utama | *Panen Bandeng* |
| `h2` | Baloo 2 | `26px / 32px` | `700` | Judul bagian atau sub-bab | *Kuis Pemahaman* |
| `h3` | Lexend | `20px / 28px` | `600` | Sub-judul instruksi atau kartu | *Contoh soal cerita* |
| `angka-soal` | Lexend | `32px / 40px` | `600` | Persamaan atau angka utama pada soal | `8 + 5 = 10 + ?` |
| `bacaan-besar` | Lexend | `22px / 38px` | `400` | Teks bacaan **Kelas 1–3** dan **Mode ABK** | *Sari memetik 5 tomat.* |
| `bacaan` | Lexend | `18px / 31px` | `400` | Teks bacaan **Kelas 4–6** | *Pak Darto mencampur pupuk.* |
| `label` | Lexend | `18px / 24px` | `600` | Teks pada tombol aksi dan pilihan | *Cek Jawaban* |
| `keterangan` | Lexend | `15px / 22px` | `400` | Indikator progres dan informasi tambahan | *Soal 3 dari 5* |

---

## 3. Referensi Desain & Prinsip UX

Pengembangan antarmuka dan pengalaman pengguna (UX) PRISMA mengadaptasi elemen terbaik dari empat platform edukasi anak berikut:

### 1. Khan Academy Kids
* **Referensi:** [learn.khanacademy.org/khan-academy-kids](https://learn.khanacademy.org/khan-academy-kids/)
* **Prinsip yang Diadaptasi:**
  * **Tokoh Pemandu:** Menghadirkan karakter pendamping yang menemani dan menyemangati anak di setiap aktivitas.
  * **Jalur Belajar Adaptif:** Penyesuaian tingkat kesulitan materi secara otomatis yang selaras dengan model klasifikasi PRISMA.

### 2. Duolingo Design Guidelines
* **Referensi:** [design.duolingo.com](https://design.duolingo.com)
* **Prinsip yang Diadaptasi:**
  * **Dominasi Warna Merek:** Memfokuskan identitas visual pada satu warna merek utama (`Mint`), sementara warna lain berfungsi sebagai pendukung kontekstual.
  * **Ilustrasi Sederhana:** Menggunakan aset visual dengan bentuk bersih dan palet warna terbatas agar pesan mudah ditangkap anak.

### 3. PBS KIDS Games
* **Referensi:** [pbskids.org/games](https://pbskids.org/games)
* **Prinsip yang Diadaptasi:**
  * **Navigasi Visual Besar:** Menyediakan menu bergambar berukuran besar sehingga anak dapat memilih aktivitas secara mandiri tanpa banyak membaca.
  * **Eksplorasi Berbasis Topik/Tokoh:** Memudahkan pencarian aktivitas belajar melalui karakter atau tema pelajaran.

### 4. Lingokids
* **Referensi:** [lingokids.com](https://lingokids.com)
* **Prinsip yang Diadaptasi:**
  * **Pengelompokan Fase/Level:** Mengorganisasikan konten berdasarkan jenjang usia dan level kemampuan (sejalan dengan pembagian fase belajar).
  * **Playlearning:** Merancang sesi belajar menjadi aktivitas singkat yang interaktif sehingga terasa seperti bermain.