# PRISMA – Chatbot Defi: Panduan API untuk Tim UI/Frontend

> **Arsitektur:** Hybrid Offline-First — Kalkulator Dinamis → TF-IDF Lokal → Ollama Offline → Gemini Cloud

---

## Instalasi & Menjalankan Server

### 1. Prasyarat
- Python 3.11+
- Gemini API Key dari [aistudio.google.com](https://aistudio.google.com) *(opsional, hanya untuk `/chat-foto` dengan internet)*

### 2. Instalasi Dependensi
```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

### 3. Konfigurasi `.env`
Salin `.env.example` → `.env`, lalu isi:
```
GEMINI_API_KEY=api_key_gemini_kamu
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:1.5b
```

### 4. Menjalankan Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- API: `http://localhost:8000`
- Docs (Swagger): `http://localhost:8000/docs`

---

## Instalasi Ollama (Mode Offline untuk Sekolah Tanpa Internet)

Ollama memungkinkan Defi tetap menjawab pertanyaan bebas siswa tanpa internet, langsung dari RAM laptop.

```bash
# 1. Download & install Ollama
# Windows: https://ollama.com/download

# 2. Download model ringan hemat RAM (pilih salah satu)
ollama pull qwen2.5:1.5b     # Rekomendasi: 1 GB RAM, cepat
ollama pull gemma2:2b         # Alternatif: 2 GB RAM, lebih pintar
ollama pull llama3.2:1b       # Alternatif: 1 GB RAM

# 3. Untuk fitur baca foto offline (opsional, perlu RAM lebih besar)
ollama pull moondream          # ~1.7 GB RAM
ollama pull llava              # ~4 GB RAM

# 4. Jalankan Ollama (biarkan berjalan di background)
ollama serve
```

Setelah Ollama aktif, endpoint `GET /` akan menampilkan `"ollama_aktif": true`.

---

## Alur Jawaban `/chat` (Offline-First Priority)

```
Pertanyaan Siswa
       │
       ▼
① Kalkulator Matematika (0 ms, tanpa internet)
   "hitung 20 x 20" → langsung jawab dengan penjelasan langkah-demi-langkah
       │ tidak ada angka/operasi
       ▼
② TF-IDF Dataset Lokal CSV (< 10 ms, tanpa internet)
   Skor ≥ 0.35 → kembalikan jawaban dari 421+ baris materi Kelas 1–6
       │ skor rendah
       ▼
③ Ollama Lokal (1–5 detik, tanpa internet, butuh Ollama aktif)
   AI lokal menjawab pertanyaan bebas dengan persona Defi
       │ Ollama tidak aktif
       ▼
④ Fallback Ramah (0 ms) — TIDAK pernah HTTP 500
   Jawaban terdekat dari CSV atau pesan ramah mengajak ke topik SD
```

---

## Dokumentasi Endpoint API

### `GET /`
Cek status semua komponen.

```javascript
const resp = await fetch('http://localhost:8000/');
const data = await resp.json();
// {
//   "status": "aktif",
//   "chatbot": "Defi (PRISMA)",
//   "total_materi_csv": 421,
//   "kategori_csv": ["literasi","numerasi","gabungan"],
//   "gemini_vision_aktif": true,
//   "ollama_aktif": true,
//   "ollama_model": "qwen2.5:1.5b",
//   "ollama_base_url": "http://127.0.0.1:11434"
// }
```

---

### `POST /chat`
Pertanyaan teks siswa — dijawab offline-first.

**Request Body (JSON):**

| Field | Tipe | Wajib | Contoh |
|---|---|---|---|
| `pertanyaan` | string | ✅ | `"apa itu ide pokok"` |
| `kelas` | string | ❌ | `"Kelas 4"` |
| `kategori` | string | ❌ | `"literasi"` / `"numerasi"` / `"gabungan"` |

```javascript
// Contoh fetch() siap pakai untuk frontend
const resp = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pertanyaan: "bagaimana cara mencari ide pokok?",
    kelas: "Kelas 4",
    kategori: "literasi"
  })
});
const data = await resp.json();
console.log(data.jawaban);  // Teks satu paragraf rapi tanpa \n
```

**Response (semua format):**

```json
// Dari kalkulator:
{
  "sumber": "kalkulator_matematika",
  "status": "success",
  "confidence": 1.0,
  "jawaban": "Halo! Yuk, kita selesaikan perkalian 20 x 20 bersama Defi! ...",
  "metadata": { "topik": "Perkalian (20 dan 20)", "kelas": "Semua Kelas" }
}

// Dari TF-IDF CSV:
{
  "sumber": "lokal_csv",
  "status": "success",
  "confidence": 0.72,
  "jawaban": "Ide pokok adalah gagasan utama yang menjadi inti paragraf ...",
  "metadata": { "id_data": "LIT_42", "kelas": "Kelas 4", "kategori": "literasi" }
}

// Dari Ollama lokal:
{
  "sumber": "ollama_lokal",
  "status": "success",
  "confidence": 1.0,
  "jawaban": "Halo! Defi senang bisa membantu pertanyaanmu ...",
  "metadata": { "model_digunakan": "qwen2.5:1.5b" }
}

// Fallback (tidak ditemukan):
{
  "sumber": "lokal_csv",
  "status": "not_found",
  "confidence": 0.08,
  "jawaban": "Halo! Defi belum menemukan materi yang cocok ..."
}
```

> **Tip UI:** Cek field `status` — tampilkan `jawaban` di semua kasus (`success`, `partial`, `not_found`). Tidak pernah ada HTTP 500 dari endpoint ini.

---

### `POST /chat-foto`
Upload foto soal/gambar — dijawab Gemini Vision (online) atau Ollama Vision (offline).

**Request:** `multipart/form-data`

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `foto` | File | ✅ | JPG/PNG/WEBP, maks. 10 MB |
| `pertanyaan` | string | ❌ | Pertanyaan siswa tentang foto |
| `kelas` | string | ❌ | `"Kelas 3"` |

```javascript
// Contoh fetch() dengan FormData
const formData = new FormData();
formData.append('foto', fileInput.files[0]);
formData.append('pertanyaan', 'Tolong jelaskan soal di foto ini!');
formData.append('kelas', 'Kelas 3');

const resp = await fetch('http://localhost:8000/chat-foto', {
  method: 'POST',
  body: formData   // JANGAN set Content-Type, biarkan browser yang atur boundary
});
const data = await resp.json();

// Tangani semua status:
if (data.status === 'success') {
  tampilkanJawaban(data.jawaban);
} else if (data.status === 'busy') {
  tampilkanNotif('Server sedang sibuk, coba lagi 5 detik.');
} else if (data.status === 'offline') {
  tampilkanNotif('Koneksi internet terputus. Periksa Wi-Fi.');
}
```

**Kemungkinan nilai `status`:**

| `status` | `sumber` | Arti |
|---|---|---|
| `"success"` | `gemini_vision` / `ollama_vision_lokal` | Berhasil diproses |
| `"busy"` | `gemini_vision` | Server Gemini sedang sibuk |
| `"offline"` | `gemini_vision` | Koneksi internet terputus |

---

### `POST /reload-dataset`
Muat ulang `data/dataset.csv` tanpa restart server (berguna setelah update materi).

```javascript
await fetch('http://localhost:8000/reload-dataset', { method: 'POST' });
```

**Response:**
```json
{
  "message": "Dataset berhasil dimuat ulang!",
  "total_materi": 421,
  "rincian_kategori": { "gabungan": 240, "numerasi": 93, "literasi": 88 }
}
```

---

## Catatan Teknis untuk Tim UI

| Hal | Keterangan |
|---|---|
| **CORS** | Aktif untuk semua origin (`*`) — tidak perlu konfigurasi tambahan |
| **Format jawaban** | Semua `jawaban` adalah teks satu paragraf **tanpa `\n`** — aman langsung render di UI |
| **Input kosong** | `kelas=""` atau `kelas="string"` otomatis diabaikan |
| **HTTP Error** | Hanya `400` (input salah) atau `503` (API key belum diisi). Tidak ada `500` |
| **Port default** | `8000` — ubah di perintah `uvicorn` jika konflik |
