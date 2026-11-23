import asyncio
from functools import lru_cache
import io
import os
import re
import socket
import time
from typing import Optional

import httpx
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from PIL import Image
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
    _sastrawi_stemmer = StemmerFactory().create_stemmer()
except Exception:
    _sastrawi_stemmer = None

# ── Paksa IPv4 agar koneksi ke generativelanguage.googleapis.com langsung ──
# Windows sering menempatkan IPv6 di urutan teratas (timeout 15–20 detik).
# Monkey-patch getaddrinfo untuk mengutamakan AF_INET (IPv4).
_orig_getaddrinfo = socket.getaddrinfo

def _ipv4_first_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    results = _orig_getaddrinfo(host, port, family, type, proto, flags)
    ipv4 = [r for r in results if r[0] == socket.AF_INET]
    ipv6 = [r for r in results if r[0] != socket.AF_INET]
    return ipv4 + ipv6

socket.getaddrinfo = _ipv4_first_getaddrinfo

# Muat variabel dari file .env
load_dotenv()

app = FastAPI(
    title="PRISMA - Chatbot Defi Multimodal API",
    description="Otak Lokal TF-IDF (dataset.csv) + Kalkulator Dinamis + Gemini Vision untuk Siswa SD",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_script_dir = os.path.dirname(os.path.abspath(__file__))
_candidate_paths = [
    os.path.join(_script_dir, "data", "dataset.csv"),
    os.path.join(os.path.dirname(_script_dir), "dataset.csv"),
    os.path.join("data", "dataset.csv"),
    "dataset.csv"
]
DATASET_PATH = next((p for p in _candidate_paths if os.path.exists(p)), os.path.join("data", "dataset.csv"))

# Inisialisasi Gemini Client (aman meski API key belum diisi saat testing lokal)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    # Disable proxy/environment trust to avoid DNS lookup issues on Windows
    http_opts = types.HttpOptions(client_args={"trust_env": False}, async_client_args={"trust_env": False})
    gemini_client = genai.Client(api_key=GEMINI_API_KEY, http_options=http_opts)
else:
    gemini_client = None

# ── Konfigurasi Ollama (Mode Offline Lokal) ───────────────────────────────────
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434").rstrip("/")
OLLAMA_MODEL    = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")

# Prompt persona Defi untuk Ollama (satu paragraf, bahasa Indonesia ramah anak SD)
DEFI_OLLAMA_SYSTEM = (
    "Kamu adalah Defi, kakak pendamping belajar yang ramah, sabar, dan ceria di platform PRISMA "
    "untuk siswa SD (Kelas 1-6, termasuk siswa berkebutuhan khusus). "
    "Jawab pertanyaan siswa dalam bahasa Indonesia yang sederhana, hangat, dan mudah dipahami anak SD. "
    "Gunakan kalimat pendek (maksimal 10-12 kata), berikan langkah-langkah jika perlu menggunakan angka 1. 2. 3. "
    "dalam satu paragraf mengalir tanpa enter/newline. "
    "Selalu akhiri dengan satu kalimat penyemangat positif. "
    "Jangan gunakan tanda kutip ganda atau karakter newline di dalam jawabanmu."
)

# Cache status Ollama agar tidak di-ping setiap request
_ollama_model_cache: Optional[str] = None
_ollama_cache_time: float = 0.0
_OLLAMA_CACHE_TTL = 60.0   # detik — cek ulang setiap 1 menit

# Instruksi karakter Defi saat membaca foto dari siswa
DEFI_VISION_SYSTEM_PROMPT = """
Kamu adalah Defi, kakak pendamping belajar yang ramah, sabar, dan ceria di platform PRISMA untuk siswa SD (termasuk siswa berkebutuhan khusus/ABK).
Tugasmu adalah membantu siswa memahami gambar atau foto yang mereka unggah (seperti foto soal matematika, teks bacaan, atau catatan pelajaran).

Jawablah dalam satu paragraf cerita pendek yang mengalir, gunakan urutan angka 1., 2., 3. untuk langkah‑langkah namun jangan memisahkan baris dengan enter. Semua kalimat harus terhubung secara natural, gunakan bahasa Indonesia yang hangat, sederhana, dan kalimat‑kalimat pendek (maksimal 10‑12 kata per kalimat).
"""

# Daftar stop words Indonesia tanpa menghilangkan kata tanya/penjelas intent (apa, bagaimana, cara)
INDO_STOPWORDS = [
    "yang", "dan", "di", "ke", "dari", "adalah", "untuk",
    "dengan", "pada", "dalam", "sebuah", "suatu",
    "atau", "ini", "itu", "tersebut", "bisa", "dapat",
    "ya", "dong", "nih", "sih", "lah", "kah", "pun"
]

# Pemetaan morfologi kata berimbuhan umum materi SD ke kata dasar
STEM_MAP = {
    # Penjumlahan / Tambah
    "menjumlahkan": "jumlah",
    "penjumlahan": "jumlah",
    "menjumlah": "jumlah",
    "dijumlahkan": "jumlah",
    "dijumlah": "jumlah",
    "menambahkan": "tambah",
    "penambahan": "tambah",
    "ditambahkan": "tambah",
    "bertambah": "tambah",

    # Pengurangan / Kurang
    "mengurangkan": "kurang",
    "pengurangan": "kurang",
    "mengurang": "kurang",
    "dikurangkan": "kurang",
    "dikurang": "kurang",
    "berkurang": "kurang",

    # Perkalian / Kali
    "mengalikan": "kali",
    "perkalian": "kali",
    "dikalikan": "kali",
    "mengali": "kali",
    "dikali": "kali",
    "berkali": "kali",

    # Pembagian / Bagi
    "membagi": "bagi",
    "membagikan": "bagi",
    "pembagian": "bagi",
    "dibagikan": "bagi",
    "dibagi": "bagi",
    "terbagi": "bagi",

    # Menentukan / Tentu
    "menentukan": "tentu",
    "penentuan": "tentu",
    "ditentukan": "tentu",
    "tertentu": "tentu",

    # Menghitung / Hitung
    "menghitung": "hitung",
    "perhitungan": "hitung",
    "penghitungan": "hitung",
    "dihitung": "hitung",
    "berhitung": "hitung",

    # Membandingkan / Banding
    "membandingkan": "banding",
    "perbandingan": "banding",
    "dibandingkan": "banding",

    # Mengurutkan / Urut
    "mengurutkan": "urut",
    "pengurutan": "urut",
    "diurutkan": "urut",
    "berurutan": "urut",

    # Menyelesaikan / Selesai
    "menyelesaikan": "selesai",
    "penyelesaian": "selesai",
    "diselesaikan": "selesai",

    # Menemukan / Temu
    "menemukan": "temu",
    "penemuan": "temu",
    "ditemukan": "temu",

    # Mencari / Cari
    "mencari": "cari",
    "pencarian": "cari",
    "dicari": "cari",

    # Menyusun / Susun
    "menyusun": "susun",
    "penyusunan": "susun",
    "disusun": "susun",

    # Membedakan / Beda
    "membedakan": "beda",
    "perbedaan": "beda",
    "dibedakan": "beda",

    # Menjelaskan / Jelas
    "menjelaskan": "jelas",
    "penjelasan": "jelas",
    "dijelaskan": "jelas",

    # Mengukur / Ukur
    "mengukur": "ukur",
    "pengukuran": "ukur",
    "diukur": "ukur",

    # Membilang / Bilang
    "membilang": "bilang",
    "pembilangan": "bilang",
    "dibilang": "bilang",

    # Mengubah / Ubah
    "mengubah": "ubah",
    "perubahan": "ubah",
    "diubah": "ubah",

    # Menyederhanakan / Sederhana
    "menyederhanakan": "sederhana",
    "penyederhanaan": "sederhana",
    "disederhanakan": "sederhana",

    # Menggabungkan / Gabung
    "menggabungkan": "gabung",
    "penggabungan": "gabung",
    "digabungkan": "gabung",

    # Menulis / Tulis
    "menuliskan": "tulis",
    "menulis": "tulis",
    "penulisan": "tulis",
    "ditulis": "tulis",

    # Membaca / Baca
    "membaca": "baca",
    "bacaan": "baca",
    "pembacaan": "baca",
    "dibaca": "baca",

    # Menyimpulkan / Simpul
    "menyimpulkan": "simpul",
    "kesimpulan": "simpul",
    "penyimpulan": "simpul",
    "disimpulkan": "simpul",
}

# Kamus sinonim kata dasar materi SD
SYNONYMS = {
    "jumlah": ["tambah", "total", "gabung"],
    "tambah": ["jumlah", "total", "gabung"],
    "kurang": ["selisih"],
    "selisih": ["kurang"],
    "kali": ["lipat", "ganda"],
    "lipat": ["kali", "ganda"],
    "bagi": ["distribusi", "pecah"],
    "hitung": ["operasi", "kalkulasi"],
    "arti": ["definisi", "pengertian", "maksud", "makna"],
    "definisi": ["arti", "pengertian", "maksud", "makna"],
    "pengertian": ["arti", "definisi", "maksud", "makna"],
    "maksud": ["arti", "definisi", "pengertian", "makna"],
    "makna": ["arti", "definisi", "pengertian", "maksud"],
    "letak": ["posisi", "lokasi"],
    "posisi": ["letak", "lokasi"],
    "cara": ["langkah", "metode"],
    "langkah": ["cara", "metode"],
}


@lru_cache(maxsize=10000)
def stem_word(word: str) -> str:
    """Stemming kata menggunakan pemetaan morfologi dengan fallback Sastrawi dan cache cepat."""
    word = word.lower().strip()
    if word in STEM_MAP:
        return STEM_MAP[word]
    if _sastrawi_stemmer:
        s = _sastrawi_stemmer.stem(word)
        # Menjaga kata 'mengalikan' agar tidak keliru di-stem menjadi 'ali'
        if s == "ali" and "kali" in word:
            return "kali"
        return s
    return word


def preprocess_text(text: str) -> str:
    """Normalisasi teks, stemming morfologi, dan ekspansi sinonim kata dasar."""
    if not text:
        return ""
    cleaned = re.sub(r"[^a-zA-Z0-9\s]", " ", str(text).lower())
    tokens = cleaned.split()
    processed_tokens = []
    for tok in tokens:
        if tok in INDO_STOPWORDS:
            continue
        stemmed = stem_word(tok)
        processed_tokens.append(stemmed)
        if stemmed in SYNONYMS:
            processed_tokens.extend(SYNONYMS[stemmed])
    return " ".join(processed_tokens)


# ============================================================================
# MODUL KALKULATOR PENJELASAN LANGKAH-DEMI-LANGKAH (OPERASI HITUNG DINAMIS)
# ============================================================================

def clean_param(val: Optional[str]) -> Optional[str]:
    """Bersihkan nilai parameter string kosong atau nilai default Swagger UI ('string')."""
    if val is None:
        return None
    val_clean = str(val).strip()
    if not val_clean or val_clean.lower() == "string":
        return None
    return val_clean


EXCLUDE_WORDS = {
    # Simbol operator huruf — WAJIB ada agar "x", "X", "*" tidak jadi satuan
    "x", "X", "×", "*",

    # Operator matematika & kata kerja hitung
    "tambah", "ditambah", "menambahkan", "penambahan", "plus",
    "kurang", "dikurang", "mengurangkan", "pengurangan", "minus", "selisih",
    "kali", "dikali", "mengalikan", "perkalian", "kalikan", "silang",
    "bagi", "dibagi", "membagi", "pembagian", "bagikan",
    "hitung", "menghitung", "hitunglah", "selesaikan", "menyelesaikan",

    # Kata penghubung & preposisi
    "dan", "dengan", "sama", "oleh", "kepada", "ke", "di", "dari", "pada", "untuk",
    "antara", "atau", "seperti", "yaitu",

    # Kata tanya & partikel
    "berapa", "apakah", "apa", "bagaimana", "gimana", "kapan", "dimana",
    "siapa", "mengapa", "kenapa",
    "ya", "dong", "sih", "nih", "kah", "lah", "pun", "deh", "kan",

    # Kata penunjuk & umum
    "ini", "itu", "tersebut", "hasil", "hasilnya", "jumlah", "total",
    "menjadi", "jadi", "adalah", "ada"
}


def extract_benda(query: str) -> Optional[str]:
    """Ekstraksi nama benda/satuan setelah angka dari pertanyaan siswa.
    Mengabaikan semua kata operator/penghubung di EXCLUDE_WORDS (termasuk 'x', 'X', '*').
    """
    matches = re.findall(r"\d+(?:[.,]\d+)?\s+(?:buah\s+|ekor\s+|lembar\s+)?([a-zA-Z]+)", query.lower())
    for word in matches:
        if word not in EXCLUDE_WORDS and len(word) > 1:
            return word
    return None


def is_int(val: float) -> bool:
    return val == int(val)


def format_num(val: float) -> str:
    """Format angka ramah anak SD dengan koma untuk desimal."""
    if is_int(val):
        return str(int(val))
    return f"{val:.2f}".rstrip("0").rstrip(".").replace(".", ",")


def explain_addition(a: float, b: float, benda: Optional[str] = None) -> str:
    res = a + b
    sa, sb, sr = format_num(a), format_num(b), format_num(res)
    nama_benda = benda if benda else "buah apel"
    satuan_label = f" {benda}" if benda else ""

    # Angka kecil (keduanya <= 10): Gunakan ilustrasi benda konkret dan hitung maju
    if is_int(a) and is_int(b) and 0 <= a <= 10 and 0 <= b <= 10:
        ia, ib, ir = int(a), int(b), int(res)
        return (
            f"Halo! Yuk, kita selesaikan penjumlahan {ia} + {ib}{satuan_label} bersama Defi dengan langkah mudah:\n\n"
            f"1. Bayangkan kamu memiliki {ia} {nama_benda}.\n"
            f"2. Lalu kamu menambahkan lagi {ib} {nama_benda}.\n"
            f"3. Sekarang kita hitung maju sebanyak {ib} langkah dari {ia}: hasilnya adalah {ir} {nama_benda}.\n\n"
            f"Kesimpulan:\n"
            f"Jadi, hasil dari {ia} + {ib}{satuan_label} adalah {ir}{satuan_label}.\n\n"
            f"Pintar sekali! Belajar berhitung bersama Defi itu seru dan mudah. Semangat terus ya!"
        )

    # Angka puluhan / ratusan (> 10): Wajib jelaskan menggunakan cara bersusun / nilai tempat
    if is_int(a) and is_int(b):
        ia, ib, ir = int(a), int(b), int(res)
        satuan_a, satuan_b = ia % 10, ib % 10
        puluhan_a, puluhan_b = (ia // 10) % 10, (ib // 10) % 10

        sum_satuan = satuan_a + satuan_b
        sum_puluhan = puluhan_a + puluhan_b

        steps = [
            f"1. Uraikan bilangan berdasarkan nilai tempatnya:\n"
            f"   - {ia} = {ia - satuan_a} ({puluhan_a} puluhan) + {satuan_a} satuan.\n"
            f"   - {ib} = {ib - satuan_b} ({puluhan_b} puluhan) + {satuan_b} satuan.",
            f"2. Jumlahkan angka satuan terlebih dahulu:\n"
            f"   - {satuan_a} satuan + {satuan_b} satuan = {sum_satuan} satuan."
        ]

        if sum_satuan >= 10:
            simpan = sum_satuan // 10
            sisa_satuan = sum_satuan % 10
            steps.append(
                f"3. Karena hasil satuan adalah {sum_satuan} (lebih dari 9), simpan {simpan} ke nilai puluhan dan tulis satuannya {sisa_satuan}.\n"
                f"4. Jumlahkan angka puluhan beserta angka simpanan:\n"
                f"   - {puluhan_a} puluhan + {puluhan_b} puluhan + {simpan} simpanan = {sum_puluhan + simpan} puluhan.\n"
                f"5. Gabungkan hasil puluhan dan satuan untuk mendapatkan jawaban akhir: {ir}{satuan_label}."
            )
        else:
            steps.append(
                f"3. Jumlahkan angka puluhannya:\n"
                f"   - {puluhan_a} puluhan + {puluhan_b} puluhan = {sum_puluhan} puluhan (nilainya {sum_puluhan * 10}).\n"
                f"4. Gabungkan hasil puluhan dan satuannya: {sum_puluhan * 10} + {sum_satuan} = {ir}{satuan_label}."
            )

        step_text = "\n\n".join(steps)
        return (
            f"Halo! Yuk, kita selesaikan penjumlahan {ia} + {ib}{satuan_label} dengan cara bersusun dan nilai tempat bersama Defi:\n\n"
            f"{step_text}\n\n"
            f"Kesimpulan:\n"
            f"Jadi, {ia}{satuan_label} + {ib}{satuan_label} = {ir}{satuan_label}.\n\n"
            f"Hebat sekali! Kamu sudah menyelesaikan penjumlahan langkah demi langkah dengan sangat teliti. Tetap semangat belajar ya!"
        )

    return (
        f"Halo! Yuk, kita hitung penjumlahan {sa} + {sb}{satuan_label} bersama Defi:\n\n"
        f"1. Sejajarkan tanda koma desimal atau nilai tempat kedua bilangan.\n"
        f"2. Jumlahkan angka dari bagian paling kanan hingga paling kiri.\n"
        f"3. Hasil penjumlahan yang diperoleh adalah {sr}{satuan_label}.\n\n"
        f"Kesimpulan:\n"
        f"Jadi, {sa}{satuan_label} + {sb}{satuan_label} = {sr}{satuan_label}.\n\n"
        f"Luar biasa! Kamu sangat teliti dalam berhitung. Tetap semangat ya!"
    )


def explain_subtraction(a: float, b: float, benda: Optional[str] = None) -> str:
    res = a - b
    sa, sb, sr = format_num(a), format_num(b), format_num(res)
    nama_benda = benda if benda else "kelereng"
    satuan_label = f" {benda}" if benda else ""

    # Angka kecil (keduanya <= 10): Gunakan ilustrasi benda konkret dan hitung mundur
    if is_int(a) and is_int(b) and 0 <= a <= 10 and 0 <= b <= 10 and a >= b:
        ia, ib, ir = int(a), int(b), int(res)
        return (
            f"Halo! Yuk, kita selesaikan pengurangan {ia} - {ib}{satuan_label} bersama Defi dengan langkah mudah:\n\n"
            f"1. Bayangkan kamu memiliki {ia} {nama_benda}.\n"
            f"2. Lalu sebanyak {ib} {nama_benda} diambil atau diberikan kepada temanmu.\n"
            f"3. Sekarang kita hitung mundur sebanyak {ib} langkah dari {ia}: hasilnya tersisa {ir} {nama_benda}.\n\n"
            f"Kesimpulan:\n"
            f"Jadi, {ia}{satuan_label} - {ib}{satuan_label} = {ir}{satuan_label}.\n\n"
            f"Pintar sekali! Pengurangan dengan benda nyata membuat berhitung jadi sangat mudah. Semangat terus ya!"
        )

    # Angka puluhan / ratusan (> 10): Wajib jelaskan menggunakan cara bersusun / nilai tempat
    if is_int(a) and is_int(b):
        ia, ib, ir = int(a), int(b), int(res)
        satuan_a, satuan_b = ia % 10, ib % 10
        puluhan_a, puluhan_b = (ia // 10) % 10, (ib // 10) % 10

        steps = [
            f"1. Uraikan bilangan berdasarkan nilai tempatnya:\n"
            f"   - {ia} = {puluhan_a} puluhan + {satuan_a} satuan.\n"
            f"   - {ib} = {puluhan_b} puluhan + {satuan_b} satuan."
        ]

        if satuan_a >= satuan_b:
            steps.append(
                f"2. Kurangkan angka satuannya:\n"
                f"   - {satuan_a} satuan - {satuan_b} satuan = {satuan_a - satuan_b} satuan."
            )
            steps.append(
                f"3. Kurangkan angka puluhannya:\n"
                f"   - {puluhan_a} puluhan - {puluhan_b} puluhan = {puluhan_a - puluhan_b} puluhan (nilainya {(puluhan_a - puluhan_b) * 10})."
            )
            steps.append(
                f"4. Gabungkan hasil puluhan dan satuannya: {(puluhan_a - puluhan_b) * 10} + {satuan_a - satuan_b} = {ir}{satuan_label}."
            )
        else:
            steps.append(
                f"2. Karena satuan {satuan_a} lebih kecil dari {satuan_b}, pinjam 1 puluhan (10) dari angka depan:\n"
                f"   - Satuan menjadi: {satuan_a} + 10 = {satuan_a + 10}.\n"
                f"   - Puluhan tersisa: {puluhan_a} - 1 = {puluhan_a - 1} puluhan."
            )
            steps.append(
                f"3. Kurangkan angka satuannya:\n"
                f"   - {satuan_a + 10} satuan - {satuan_b} satuan = {satuan_a + 10 - satuan_b} satuan."
            )
            steps.append(
                f"4. Kurangkan angka puluhannya:\n"
                f"   - {puluhan_a - 1} puluhan - {puluhan_b} puluhan = {puluhan_a - 1 - puluhan_b} puluhan."
            )
            steps.append(
                f"5. Gabungkan hasil akhir sehingga diperoleh: {ir}{satuan_label}."
            )

        step_text = "\n\n".join(steps)
        return (
            f"Halo! Yuk, kita selesaikan pengurangan {ia} - {ib}{satuan_label} bersama Defi:\n\n"
            f"{step_text}\n\n"
            f"Kesimpulan:\n"
            f"Jadi, {ia}{satuan_label} - {ib}{satuan_label} = {ir}{satuan_label}.\n\n"
            f"Hebat sekali! Pengurangan dengan cara bersusun membuat hitunganmu rapi dan tepat. Semangat terus belajarnya ya!"
        )

    return (
        f"Halo! Yuk, kita hitung pengurangan {sa} - {sb}{satuan_label} bersama Defi:\n\n"
        f"1. Kurangkan kedua bilangan secara bertahap.\n"
        f"2. Hasil pengurangan yang didapat adalah {sr}{satuan_label}.\n\n"
        f"Kesimpulan:\n"
        f"Jadi, {sa}{satuan_label} - {sb}{satuan_label} = {sr}{satuan_label}.\n\n"
        f"Luar biasa! Teruslah rajin berlatih berhitung ya!"
    )


def explain_multiplication(a: float, b: float, benda: Optional[str] = None) -> str:
    res = a * b
    sa, sb, sr = format_num(a), format_num(b), format_num(res)
    satuan_label = f" {benda}" if benda else ""
    nama_benda = benda if benda else "benda"

    if is_int(a) and is_int(b) and a >= 0 and b >= 0:
        ia, ib, ir = int(a), int(b), int(res)

        if ia <= 10:
            add_terms = " + ".join([f"{ib}{satuan_label}"] * ia) if ia > 0 else "0"
            add_alt = " + ".join([f"{ia}{satuan_label}"] * ib) if ib > 0 and ib <= 10 else ""
        else:
            add_terms = " + ".join([f"{ia}{satuan_label}"] * ib) if ib > 0 and ib <= 10 else f"{ia} x {ib}"
            add_alt = ""

        if ia <= 10 and ib <= 10:
            alt_line = f"3. Kamu juga bisa memikirkannya sebagai {ib} kelompok berisi {ia} {nama_benda}: {add_alt} = {ir}{satuan_label}.\n\n" if add_alt else ""
            return (
                f"Halo! Yuk, kita selesaikan perkalian {ia} x {ib}{satuan_label} bersama Defi!\n\n"
                f"Konsep dasar perkalian adalah penjumlahan berulang:\n"
                f"{ia} x {ib} artinya angka {ib}{satuan_label} dijumlahkan sebanyak {ia} kali ({add_terms}).\n\n"
                f"Langkah-langkah pengerjaannya:\n"
                f"1. Tulis bentuk penjumlahan berulang: {add_terms}\n"
                f"2. Hitung hasil penjumlahan berulang tersebut: {add_terms} = {ir}{satuan_label}\n"
                f"{alt_line}"
                f"Kesimpulan:\n"
                f"Jadi, hasil dari {ia} x {ib}{satuan_label} adalah {ir}{satuan_label}.\n\n"
                f"Keren banget! Kamu sudah paham konsep perkalian dengan sangat baik. Tetap semangat belajar ya!"
            )
        else:
            bawah, atas = min(ia, ib), max(ia, ib)
            satuan_atas = atas % 10
            puluhan_atas = (atas // 10) % 10

            k1 = bawah * satuan_atas
            tulis_k1 = k1 % 10
            simpan_k1 = k1 // 10

            return (
                f"Halo! Yuk, kita selesaikan perkalian {ia} x {ib}{satuan_label} bersama Defi!\n\n"
                f"Konsep dasar perkalian adalah penjumlahan berulang:\n"
                f"{ia} x {ib} artinya menjumlahkan {atas}{satuan_label} sebanyak {bawah} kali.\n\n"
                f"Kita bisa menyelesaikannya dengan cara perkalian bersusun:\n"
                f"1. Kalikan pengali ({bawah}) dengan satuan ({satuan_atas}):\n"
                f"   {bawah} x {satuan_atas} = {k1}. Tulis angka {tulis_k1} di tempat satuan, dan simpan {simpan_k1}.\n"
                f"2. Kalikan pengali ({bawah}) dengan puluhan ({puluhan_atas}):\n"
                f"   {bawah} x {puluhan_atas} = {bawah * puluhan_atas}. Tambahkan simpanan ({simpan_k1}): {bawah * puluhan_atas} + {simpan_k1} = {bawah * puluhan_atas + simpan_k1}.\n"
                f"3. Gabungkan seluruh angka sehingga diperoleh hasil akhir {ir}{satuan_label}.\n\n"
                f"Kesimpulan:\n"
                f"Jadi, hasil dari {ia} x {ib}{satuan_label} adalah {ir}{satuan_label}.\n\n"
                f"Luar biasa! Kamu hebat bisa mengikuti perkalian langkah demi langkah dengan teliti. Semangat terus belajarnya ya!"
            )

    return (
        f"Halo! Yuk, kita hitung perkalian {sa} x {sb}{satuan_label} bersama Defi:\n\n"
        f"1. Kalikan kedua bilangan dengan teliti.\n"
        f"2. Hasil akhir yang didapat adalah {sr}{satuan_label}.\n\n"
        f"Kesimpulan:\n"
        f"Jadi, {sa} x {sb}{satuan_label} = {sr}{satuan_label}.\n\n"
        f"Hebat sekali! Teruslah rajin berlatih berhitung ya!"
    )


def explain_division(a: float, b: float, benda: Optional[str] = None) -> str:
    if b == 0:
        return (
            "Wah, dalam matematika kita tidak bisa membagi sebuah bilangan dengan angka 0 ya! "
            "Coba ganti angka pembaginya dengan angka lain selain 0 ya, semangat!"
        )

    res = a / b
    sa, sb, sr = format_num(a), format_num(b), format_num(res)
    satuan_label = f" {benda}" if benda else ""
    nama_benda = benda if benda else "buah kue"

    if is_int(a) and is_int(b) and a >= 0 and b > 0:
        ia, ib = int(a), int(b)
        quotient = ia // ib
        remainder = ia % ib

        if remainder == 0:
            return (
                f"Halo! Yuk, kita selesaikan pembagian {ia} : {ib}{satuan_label} bersama Defi!\n\n"
                f"Konsep pembagian adalah membagi sama rata (adil) tanpa ada sisa.\n"
                f"Bayangkan kamu punya {ia} {nama_benda} yang ingin dibagikan secara adil kepada {ib} teman.\n\n"
                f"Langkah-langkah pengerjaannya:\n"
                f"1. Kita bagi {ia} {nama_benda} ke dalam {ib} kelompok secara sama rata.\n"
                f"2. Setiap kelompok mendapatkan tepat {quotient} {nama_benda}.\n"
                f"3. Karena {ib} x {quotient} = {ia}, maka semua {nama_benda} terbagi habis tanpa sisa (sisa 0).\n\n"
                f"Kesimpulan:\n"
                f"Jadi, hasil dari {ia} : {ib}{satuan_label} adalah {quotient}{satuan_label}.\n\n"
                f"Pintar sekali! Langkah-langkahmu sangat tepat dan rapi. Tetap semangat belajar ya!"
            )
        else:
            desimal_str = format_num(res)
            return (
                f"Halo! Yuk, kita selesaikan pembagian {ia} : {ib} bersama Defi!\n\n"
                f"Konsep pembagian adalah membagi secara adil (sama rata) kepada beberapa orang/kelompok.\n"
                f"Bayangkan kamu punya {ia} {nama_benda} yang ingin dibagikan adil kepada {ib} temanmu.\n\n"
                f"Langkah-langkah pengerjaannya:\n"
                f"1. Setiap teman mendapatkan {quotient} {nama_benda} secara utuh.\n"
                f"   {nama_benda.capitalize()} yang sudah terbagikan adalah {ib} x {quotient} = {ib * quotient} {nama_benda}.\n"
                f"2. Hitung sisa {nama_benda} yang belum terbagikan:\n"
                f"   {ia} - {ib * quotient} = {remainder} {nama_benda} tersisa (karena {remainder} kurang dari {ib}, tidak bisa dibagikan utuh).\n"
                f"3. Bentuk pembagian bersisa:\n"
                f"   {ia} : {ib} = {quotient} sisa {remainder}{satuan_label}.\n"
                f"4. Bentuk bilangan desimal (koma):\n"
                f"   Sisa {remainder} dibagi {ib} menghasilkan {format_num(remainder / ib)}.\n"
                f"   Jika digabungkan dengan hasil bulat {quotient}, menjadi {desimal_str}{satuan_label}.\n\n"
                f"Kesimpulan:\n"
                f"Jadi, {ia} dibagi {ib} hasilnya adalah {quotient} sisa {remainder}{satuan_label} (atau dalam bentuk desimal = {desimal_str}{satuan_label}).\n\n"
                f"Hebat sekali! Kamu sudah mengerti pembagian bersisa dan bentuk desimal dengan sangat baik. Tetap semangat ya!"
            )

    return (
        f"Halo! Yuk, kita hitung pembagian {sa} : {sb}{satuan_label} bersama Defi:\n\n"
        f"1. Bagi bilangan {sa} dengan {sb} secara bertahap.\n"
        f"2. Hasil pembagian yang diperoleh adalah {sr}{satuan_label}.\n\n"
        f"Kesimpulan:\n"
        f"Jadi, {sa} : {sb}{satuan_label} = {sr}{satuan_label}.\n\n"
        f"Pintar sekali! Belajar matematika bersama Defi selalu menyenangkan, kan?"
    )


def parse_raw_number(s: str) -> float:
    return float(s.replace(",", "."))


def solve_dynamic_math(query: str, kelas: Optional[str] = None):
    """
    Parser matematika dinamis yang mengekstrak ekspresi aritmatika dari kalimat
    maupun simbol sebelum TF-IDF dijalankan tanpa memotong digit puluhan/ratusan.
    """
    if not query:
        return None

    kelas = clean_param(kelas)
    raw = query.lower().strip()
    raw = re.sub(r"[?!]+$", "", raw).strip()

    # 1. Ekstraksi seluruh angka utuh menggunakan re.findall agar digit tidak terpotong
    numbers = re.findall(r"\d+(?:[.,]\d+)?", raw)
    if len(numbers) < 2:
        return None

    n1_str, n2_str = numbers[0], numbers[1]

    # 2. Deteksi operator aritmatika
    op_key = None
    if re.search(r"(\d+\s*[:/÷]\s*\d+|\b(?:bagi|dibagi|membagi|bagikan|pembagian)\b)", raw):
        op_key = "div"
    elif re.search(r"(\*|×|\d+\s*[xX]\s*\d+|\b(?:kali|dikali|mengalikan|kalikan|perkalian)\b)", raw):
        op_key = "mul"
    elif re.search(r"(\d+\s*-\s*\d+|\b(?:kurang|dikurang|mengurangkan|kurangkan|pengurangan|selisih)\b)", raw):
        op_key = "sub"
    elif re.search(r"(\+|\b(?:tambah|ditambah|menjumlahkan|jumlahkan|dijumlahkan|penjumlahan|jumlah|gabung|gabungkan)\b)", raw):
        op_key = "add"

    if not op_key:
        return None

    try:
        a = parse_raw_number(n1_str)
        b = parse_raw_number(n2_str)
    except ValueError:
        return None

    # 3. Deteksi nama benda/satuan setelah angka
    benda = extract_benda(query)
    satuan_suffix = f" {benda}" if benda else ""

    if op_key == "add":
        jawaban = explain_addition(a, b, benda=benda)
        op_label = "Penjumlahan"
    elif op_key == "sub":
        jawaban = explain_subtraction(a, b, benda=benda)
        op_label = "Pengurangan"
    elif op_key == "mul":
        jawaban = explain_multiplication(a, b, benda=benda)
        op_label = "Perkalian"
    elif op_key == "div":
        jawaban = explain_division(a, b, benda=benda)
        op_label = "Pembagian"
    else:
        return None

    return {
        "sumber": "kalkulator_matematika",
        "status": "success",
        "confidence": 1.0,
        "jawaban": re.sub(r'\s+', ' ', jawaban).strip().replace('"', "'"),
        "metadata": {
            "id_data": "MATH_DYNAMIC",
            "kelas": kelas or "Semua Kelas",
            "kategori": "numerasi",
            "topik": f"{op_label} ({format_num(a)}{satuan_suffix} dan {format_num(b)}{satuan_suffix})",
            "capaian_pembelajaran": f"Menghitung {op_label.lower()} matematika dinamis langkah demi langkah",
        },
    }


# ============================================================================
# PEMROSESAN GAMBAR & VISION HELPER
# ============================================================================

def compress_and_resize_image(image_bytes: bytes, max_dim: int = 1024, quality: int = 80) -> bytes:
    """
    Kompresi dan resize gambar otomatis menggunakan Pillow sebelum dikirim ke Gemini:
    - Dimensi maksimal sisi terpanjang diubah menjadi 1024px (pertahankan rasio aspek)
    - Konversi ke format JPEG dengan kualitas 80% untuk meminimalkan payload
    """
    img = Image.open(io.BytesIO(image_bytes))

    # Konversi channel transparansi atau mode palet ke RGB
    if img.mode in ("RGBA", "LA", "P"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        background.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
        img = background
    elif img.mode != "RGB":
        img = img.convert("RGB")

    w, h = img.size
    if max(w, h) > max_dim:
        img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

    output_io = io.BytesIO()
    img.save(output_io, format="JPEG", quality=quality, optimize=True)
    return output_io.getvalue()


# ============================================================================
# OTAK LOKAL TF-IDF DATASET
# ============================================================================

class ChatTextRequest(BaseModel):
    pertanyaan: str
    kelas: Optional[str] = None      # Contoh: "Kelas 3" (opsional)
    kategori: Optional[str] = None   # Contoh: "literasi", "numerasi", "gabungan" (opsional)


class DefiLocalEngine:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.df = pd.DataFrame()
        self.vectorizer = None
        self.tfidf_matrix = None
        self.load_dataset()

    def load_dataset(self):
        if not os.path.exists(self.csv_path):
            raise FileNotFoundError(f"File dataset tidak ditemukan di: {self.csv_path}")

        loaded_df = None
        for enc in ["utf-8-sig", "utf-8", "cp1252", "latin1"]:
            try:
                loaded_df = pd.read_csv(self.csv_path, encoding=enc, sep=";")
                break
            except Exception:
                continue

        if loaded_df is None:
            # Fallback jika sep auto
            for enc in ["utf-8-sig", "utf-8", "cp1252", "latin1"]:
                try:
                    loaded_df = pd.read_csv(self.csv_path, encoding=enc, sep=None, engine="python")
                    break
                except Exception:
                    continue

        if loaded_df is None:
            raise ValueError("Gagal membaca file CSV. Pastikan format file valid.")

        loaded_df["kelas"] = loaded_df["kelas"].astype(str).str.strip()
        loaded_df["kategori"] = loaded_df["kategori"].astype(str).str.strip().str.lower()

        # Pembobotan kolom untuk pencarian TF-IDF
        loaded_df["search_corpus"] = (
            (loaded_df["pertanyaan_atau_topik"].fillna("") + " ") * 3
            + (loaded_df["kata_kunci"].fillna("") + " ") * 2
            + loaded_df["capaian_pembelajaran"].fillna("")
        )

        # Preprocessing & stemming morfologi Indonesia pada seluruh korpus
        loaded_df["search_processed"] = loaded_df["search_corpus"].apply(preprocess_text)

        self.df = loaded_df
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2))
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df["search_processed"])
        print(f"[DefiEngine] Berhasil memuat {len(self.df)} baris materi dari {self.csv_path}")

    def search(self, query: str, kelas: Optional[str] = None, kategori: Optional[str] = None, threshold: float = 0.25):
        # 1. Bersihkan parameter input default Swagger UI ('string' / '')
        kelas = clean_param(kelas)
        kategori = clean_param(kategori)

        # 2. Periksa apakah pertanyaan adalah operasi matematika dinamis
        math_result = solve_dynamic_math(query, kelas=kelas)
        if math_result:
            return math_result

        # 3. Periksa apakah pertanyaan adalah spesifik Kelas & Bab
        chapter_result = self.search_chapter(query, kelas=kelas)
        if chapter_result:
            return chapter_result

        # 4. Lakukan pencarian TF-IDF pada dataset lokal
        return self.search_tfidf(query=query, kelas=kelas, kategori=kategori, threshold=threshold)

    def search_chapter(self, query: str, kelas: Optional[str] = None) -> Optional[dict]:
        lower = query.lower()
        k_num = None
        b_num = None

        kelas_words = {'satu': 1, 'dua': 2, 'tiga': 3, 'empat': 4, 'lima': 5, 'enam': 6, 'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5, 'vi': 6}
        bab_words = {'satu': 1, 'dua': 2, 'tiga': 3, 'empat': 4, 'lima': 5, 'enam': 6, 'tujuh': 7, 'delapan': 8, 'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5, 'vi': 6, 'vii': 7, 'viii': 8}

        m1 = re.search(r'\bkelas\s*(\d+|satu|dua|tiga|empat|lima|enam|vi|iv|v|iii|ii|i)\b.*?\bbab\s*(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|viii|vii|vi|iv|v|iii|ii|i)\b', lower)
        if m1:
            k_val, b_val = m1.group(1), m1.group(2)
            k_num = int(k_val) if k_val.isdigit() else kelas_words.get(k_val)
            b_num = int(b_val) if b_val.isdigit() else bab_words.get(b_val)

        if not k_num or not b_num:
            m2 = re.search(r'\bbab\s*(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|viii|vii|vi|iv|v|iii|ii|i)\b.*?\bkelas\s*(\d+|satu|dua|tiga|empat|lima|enam|vi|iv|v|iii|ii|i)\b', lower)
            if m2:
                b_val, k_val = m2.group(1), m2.group(2)
                b_num = int(b_val) if b_val.isdigit() else bab_words.get(b_val)
                k_num = int(k_val) if k_val.isdigit() else kelas_words.get(k_val)

        if not k_num or not b_num:
            m3 = re.search(r'\bk(\d)\b.*?\bb(?:ab)?\s*(\d)\b', lower)
            if m3:
                k_num = int(m3.group(1))
                b_num = int(m3.group(2))

        # Query whole class (e.g. "daftar materi kelas 2", "kelas 1 belajar apa")
        if (not k_num or not b_num) and "bab" not in lower:
            is_asking_list = bool(re.match(r'^(?:materi\s+)?kelas\s*\w+$', lower.strip()) or re.search(r'daftar|apa saja|apa aja|ada apa|sebutkan|kurikulum|semua bab|pelajaran apa|belajar apa', lower))
            if is_asking_list:
                m_k_only = re.search(r'\bkelas\s*(\d+|satu|dua|tiga|empat|lima|enam|vi|iv|v|iii|ii|i)\b', lower)
                if m_k_only:
                    k_val = m_k_only.group(1)
                    k_single = int(k_val) if k_val.isdigit() else kelas_words.get(k_val)
                    if k_single and 1 <= k_single <= 6:
                        out = f"📚 **Daftar Materi PRISMA Kelas {k_single} (8 Bab)** 🌟\n\n"
                        for b in range(1, 9):
                            rows = self.df[self.df["id_data"] == f"K{k_single}-GAB-B{b}-KONSEP-NUM"]
                            topic = rows.iloc[0]["pertanyaan_atau_topik"] if not rows.empty else "Materi Pembelajaran"
                            topic_clean = re.sub(r'^(?:Bagaimana cara |Apa itu )', '', topic).rstrip('?')
                            out += f"• **Bab {b}**: {topic_clean}\n"
                        out += f"\nKamu mau pelajari bab berapa? Tanya misalnya: *'Materi kelas {k_single} bab 1'* ya! ✨"
                        return {
                            "sumber": "lokal_csv",
                            "status": "success",
                            "confidence": 1.0,
                            "jawaban": out,
                            "metadata": {"kelas": f"Kelas {k_single}", "bab": "Semua Bab"}
                        }

        if not k_num or not b_num or not (1 <= k_num <= 6 and 1 <= b_num <= 8):
            return None

        prefix = f"K{k_num}-GAB-B{b_num}"
        sub = self.df[self.df["id_data"].str.startswith(prefix)]
        if sub.empty:
            return None

        # Check sub-intent
        if re.search(r'soal\s*1|pertanyaan\s*1|kuis\s*1', lower):
            s1 = sub[sub["id_data"] == f"{prefix}-SOAL1"]
            if not s1.empty:
                row = s1.iloc[0]
                ans = f"📝 **Soal 1 (Kelas {k_num} Bab {b_num})**:\n{row['pertanyaan_atau_topik']}\n\n💡 **Kunci Jawaban & Pembahasan:**\n{row['jawaban']}"
                return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": ans, "metadata": {"id_data": row["id_data"], "topik": row["pertanyaan_atau_topik"]}}

        if re.search(r'soal\s*2|pertanyaan\s*2|kuis\s*2', lower):
            s2 = sub[sub["id_data"] == f"{prefix}-SOAL2"]
            if not s2.empty:
                row = s2.iloc[0]
                ans = f"📝 **Soal 2 (Kelas {k_num} Bab {b_num})**:\n{row['pertanyaan_atau_topik']}\n\n💡 **Kunci Jawaban & Pembahasan:**\n{row['jawaban']}"
                return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": ans, "metadata": {"id_data": row["id_data"], "topik": row["pertanyaan_atau_topik"]}}

        if re.search(r'kunci\s*jawaban|pembahasan|jawaban\s*soal', lower):
            s1 = sub[sub["id_data"] == f"{prefix}-SOAL1"]
            s2 = sub[sub["id_data"] == f"{prefix}-SOAL2"]
            out = f"💡 **Kunci Jawaban & Pembahasan Soal Kelas {k_num} Bab {b_num}**:\n\n"
            if not s1.empty:
                out += f"1️⃣ **{s1.iloc[0]['pertanyaan_atau_topik']}**\n👉 {s1.iloc[0]['jawaban']}\n\n"
            if not s2.empty:
                out += f"2️⃣ **{s2.iloc[0]['pertanyaan_atau_topik']}**\n👉 {s2.iloc[0]['jawaban']}"
            return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": out.strip(), "metadata": {"topik": "Kunci Jawaban"}}

        if re.search(r'literasi|membaca|menyimak|bacaan', lower) and not re.search(r'numerasi|matematika|hitung', lower):
            lit = sub[sub["id_data"] == f"{prefix}-KONSEP-LIT"]
            if not lit.empty:
                row = lit.iloc[0]
                ans = f"📖 **Materi Literasi Kelas {k_num} Bab {b_num}**:\n\n**{row['pertanyaan_atau_topik']}**\n\n{row['jawaban']}"
                return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": ans, "metadata": {"id_data": row["id_data"], "topik": row["pertanyaan_atau_topik"]}}

        if re.search(r'numerasi|matematika|hitung', lower) and not re.search(r'literasi|membaca', lower):
            num = sub[sub["id_data"] == f"{prefix}-KONSEP-NUM"]
            if not num.empty:
                row = num.iloc[0]
                ans = f"🔢 **Materi Numerasi (Matematika) Kelas {k_num} Bab {b_num}**:\n\n**{row['pertanyaan_atau_topik']}**\n\n{row['jawaban']}"
                return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": ans, "metadata": {"id_data": row["id_data"], "topik": row["pertanyaan_atau_topik"]}}

        if re.search(r'contoh\s*soal|soal\s*cerita|contoh', lower):
            cth = sub[sub["id_data"] == f"{prefix}-CONTOH"]
            if not cth.empty:
                row = cth.iloc[0]
                ans = f"📝 **Contoh Soal Cerita (Kelas {k_num} Bab {b_num})**:\n\n*{row['pertanyaan_atau_topik']}*\n\n💡 **Pembahasan:**\n{row['jawaban']}"
                return {"sumber": "lokal_csv", "status": "success", "confidence": 1.0, "jawaban": ans, "metadata": {"id_data": row["id_data"], "topik": row["pertanyaan_atau_topik"]}}

        # General chapter overview
        lit = sub[sub["id_data"] == f"{prefix}-KONSEP-LIT"]
        num = sub[sub["id_data"] == f"{prefix}-KONSEP-NUM"]
        cth = sub[sub["id_data"] == f"{prefix}-CONTOH"]
        cp = sub.iloc[0]["capaian_pembelajaran"] if not sub.empty else ""

        out = f"✨ **Materi PRISMA Kelas {k_num} Bab {b_num}** ✨\n\n"
        if cp:
            out += f"🎯 **Capaian Pembelajaran:**\n{cp}\n\n"
        if not lit.empty:
            out += f"📖 **Literasi (Membaca & Menyimak):**\n{lit.iloc[0]['pertanyaan_atau_topik']}\n👉 {lit.iloc[0]['jawaban'].split('.')[0]}.\n\n"
        if not num.empty:
            out += f"🔢 **Numerasi (Matematika & Berhitung):**\n{num.iloc[0]['pertanyaan_atau_topik']}\n👉 {num.iloc[0]['jawaban'].split('.')[0]}.\n\n"
        if not cth.empty:
            out += f"📝 **Contoh Soal Cerita:**\n*{cth.iloc[0]['pertanyaan_atau_topik']}*\n\n"
        out += f"Kamu bisa tanya *'soal 1 kelas {k_num} bab {b_num}'*, *'kunci jawaban kelas {k_num} bab {b_num}'*, atau *'literasi kelas {k_num} bab {b_num}'* ke Kak Defi ya! 🚀"

        return {
            "sumber": "lokal_csv",
            "status": "success",
            "confidence": 1.0,
            "jawaban": out,
            "metadata": {"kelas": f"Kelas {k_num}", "bab": f"Bab {b_num}", "capaian_pembelajaran": cp}
        }

    def search_tfidf(self, query: str, kelas: Optional[str] = None, kategori: Optional[str] = None, threshold: float = 0.25):
        """Pencarian TF-IDF murni dari dataset CSV (tanpa kalkulator & tanpa Ollama)."""
        subset = self.df.copy()

        if kelas:
            subset = subset[subset["kelas"].str.lower() == kelas.strip().lower()]
        if kategori:
            kat = kategori.strip().lower()
            subset = subset[subset["kategori"].str.lower().isin([kat, "gabungan"])]

        if subset.empty:
            subset = self.df

        sub_indices = subset.index
        processed_query = preprocess_text(query)
        query_vec = self.vectorizer.transform([processed_query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix[sub_indices]).flatten()

        best_pos = similarities.argmax()
        best_score = float(similarities[best_pos])

        if best_score < threshold:
            return {
                "sumber": "lokal_csv",
                "status": "not_found",
                "confidence": round(best_score, 3),
                "jawaban": (
                    "Maaf ya, Defi belum menemukan materi yang pas untuk pertanyaan itu. "
                    "Coba tanyakan topik pelajaran SD dengan kata yang lebih jelas, atau unggah foto soalnya ke Defi ya!"
                ),
                "metadata": None,
            }

        matched_row = self.df.loc[sub_indices[best_pos]]
        return {
            "sumber": "lokal_csv",
            "status": "success",
            "confidence": round(best_score, 3),
            "jawaban": matched_row["jawaban"],
            "metadata": {
                "id_data": matched_row["id_data"],
                "kelas": matched_row["kelas"],
                "kategori": matched_row["kategori"],
                "topik": matched_row["pertanyaan_atau_topik"],
                "capaian_pembelajaran": matched_row["capaian_pembelajaran"],
            },
        }


# Inisialisasi mesin pencarian lokal dari data/dataset.csv
defi_local = DefiLocalEngine(DATASET_PATH)


# ============================================================================
# OLLAMA OFFLINE HELPER FUNCTIONS
# ============================================================================

def _clean_jawaban(text: str) -> str:
    """Normalisasi semua jawaban: satu paragraf, tanpa \\n, tanpa kutip ganda."""
    return re.sub(r'\s+', ' ', text or "").strip().replace('"', "'")


async def _get_ollama_model() -> Optional[str]:
    """Cek model Ollama yang tersedia. Pakai cache 60 detik agar tidak spam ping."""
    global _ollama_model_cache, _ollama_cache_time
    now = time.monotonic()
    if _ollama_model_cache is not None and (now - _ollama_cache_time) < _OLLAMA_CACHE_TTL:
        return _ollama_model_cache

    preferred_order = [
        OLLAMA_MODEL,
        "qwen2.5:1.5b", "qwen2.5:3b", "gemma2:2b", "llama3.2:1b", "phi3:mini",
    ]
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if resp.status_code == 200:
                models = [m["name"] for m in resp.json().get("models", [])]
                # Pilih sesuai urutan prioritas
                for pref in preferred_order:
                    for m in models:
                        if m.startswith(pref.split(":")[0]):
                            _ollama_model_cache = m
                            _ollama_cache_time = now
                            return m
                # Fallback: ambil model pertama yang tersedia
                if models:
                    _ollama_model_cache = models[0]
                    _ollama_cache_time = now
                    return models[0]
    except Exception:
        pass

    _ollama_model_cache = None
    _ollama_cache_time = now
    return None


async def _get_ollama_vision_model() -> Optional[str]:
    """Cek model vision Ollama (moondream, llava) untuk offline /chat-foto."""
    vision_keywords = ["moondream", "llava", "bakllava", "minicpm-v", "llava-phi"]
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if resp.status_code == 200:
                models = [m["name"] for m in resp.json().get("models", [])]
                for m in models:
                    if any(kw in m.lower() for kw in vision_keywords):
                        return m
    except Exception:
        pass
    return None


async def _ask_ollama(pertanyaan: str, model: str, kelas: Optional[str] = None) -> Optional[str]:
    """Panggil Ollama API /api/generate secara async. Return None jika gagal."""
    konteks = f"Siswa kelas {kelas}. " if kelas else ""
    prompt = f"{konteks}Pertanyaan: {pertanyaan}"
    payload = {
        "model": model,
        "system": DEFI_OLLAMA_SYSTEM,
        "prompt": prompt,
        "stream": False,
        "options": {"num_predict": 250, "temperature": 0.4},
    }
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload)
            if resp.status_code == 200:
                raw = resp.json().get("response", "").strip()
                return _clean_jawaban(raw) if raw else None
    except Exception:
        pass
    return None


async def _ask_ollama_vision(image_bytes: bytes, pertanyaan: str, model: str, kelas: Optional[str] = None) -> Optional[str]:
    """Panggil Ollama vision model untuk membaca gambar secara offline."""
    import base64
    img_b64 = base64.b64encode(image_bytes).decode("utf-8")
    konteks = f"Siswa kelas {kelas}. " if kelas else ""
    prompt = f"{konteks}Tolong jelaskan isi gambar atau soal berikut dalam bahasa Indonesia yang sederhana untuk anak SD: {pertanyaan}"
    payload = {
        "model": model,
        "prompt": prompt,
        "images": [img_b64],
        "stream": False,
        "options": {"num_predict": 250, "temperature": 0.4},
    }
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload)
            if resp.status_code == 200:
                raw = resp.json().get("response", "").strip()
                return _clean_jawaban(raw) if raw else None
    except Exception:
        pass
    return None


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def cek_status():
    ollama_model = await _get_ollama_model()
    return {
        "status": "aktif",
        "chatbot": "Defi (PRISMA)",
        "total_materi_csv": len(defi_local.df),
        "kategori_csv": defi_local.df["kategori"].unique().tolist(),
        "gemini_vision_aktif": gemini_client is not None,
        "ollama_aktif": ollama_model is not None,
        "ollama_model": ollama_model or "tidak terdeteksi",
        "ollama_base_url": OLLAMA_BASE_URL,
    }


@app.post("/chat")
async def chat_teks(req: ChatTextRequest):
    """Endpoint utama: Hybrid Offline-First.
    Jalur 1: Kalkulator Dinamis → Jalur 2: TF-IDF CSV (skor ≥ 0.35) →
    Jalur 3: Ollama Lokal (offline AI) → Jalur 4: Fallback ramah."""
    if not req.pertanyaan or not req.pertanyaan.strip():
        raise HTTPException(status_code=400, detail="Pertanyaan tidak boleh kosong.")

    kelas = clean_param(req.kelas)
    kategori = clean_param(req.kategori)

    # ── Jalur 1: Kalkulator Matematika Dinamis (0 ms, tanpa internet/LLM) ───
    math_result = solve_dynamic_math(req.pertanyaan, kelas=kelas)
    if math_result:
        return math_result

    # ── Jalur 2: TF-IDF Lokal dari data/dataset.csv ──────────────────────────
    tfidf_result = defi_local.search_tfidf(query=req.pertanyaan, kelas=kelas, kategori=kategori)
    # Jika skor TF-IDF cukup tinggi, langsung kembalikan (cepat < 10 ms)
    if tfidf_result.get("status") == "success" and tfidf_result.get("confidence", 0) >= 0.35:
        tfidf_result["jawaban"] = _clean_jawaban(tfidf_result["jawaban"])
        return tfidf_result

    # ── Jalur 3: Ollama Lokal (Offline AI) ───────────────────────────────────
    ollama_model = await _get_ollama_model()
    if ollama_model:
        ollama_jawaban = await _ask_ollama(req.pertanyaan, model=ollama_model, kelas=kelas)
        if ollama_jawaban:
            return {
                "sumber": "ollama_lokal",
                "status": "success",
                "confidence": 1.0,
                "jawaban": ollama_jawaban,
                "metadata": {
                    "id_data": "OLLAMA_LOCAL",
                    "kelas": kelas or "Semua Kelas",
                    "kategori": kategori or "umum",
                    "topik": req.pertanyaan[:80],
                    "model_digunakan": ollama_model,
                },
            }

    # ── Jalur 4: Fallback Aman ────────────────────────────────────────────────
    # Jika skor TF-IDF >= 0.15, kembalikan jawaban terdekat dari CSV
    if tfidf_result.get("confidence", 0) >= 0.15 and tfidf_result.get("status") in ("success", "not_found"):
        # Paksa berikan jawaban terdekat walau skor rendah
        fallback_tfidf = defi_local.search_tfidf(
            query=req.pertanyaan, kelas=kelas, kategori=kategori, threshold=0.0
        )
        if fallback_tfidf.get("jawaban"):
            fallback_tfidf["jawaban"] = _clean_jawaban(fallback_tfidf["jawaban"])
            fallback_tfidf["status"] = "partial"
            return fallback_tfidf

    # Fallback terakhir: pesan ramah tanpa HTTP 500
    return {
        "sumber": "lokal_csv",
        "status": "not_found",
        "confidence": 0.0,
        "jawaban": (
            "Halo! Defi belum menemukan materi yang cocok untuk pertanyaan itu. "
            "Coba tanyakan topik pelajaran SD seperti matematika, membaca, menulis, atau IPA ya! "
            "Atau unggah foto soalnya agar Defi bisa membantu lebih baik. Semangat belajar!"
        ),
        "metadata": None,
    }


DEFAULT_VISION_MODELS = [
    "gemini-3.1-flash-lite",  # Model utama: paling cepat, latensi rendah
    "gemini-3.8-flash",       # Cadangan pertama
    "gemini-3.5-flash",
    "gemini-2.5-flash",
]


def is_connection_error(e: Exception) -> bool:
    """Mendeteksi apakah error disebabkan oleh masalah koneksi internet atau resolusi DNS.
    PENTING: asyncio.TimeoutError adalah subclass OSError di Python 3.11+ — wajib dikecualikan
    agar timeout tidak salah dianggap sebagai error jaringan offline.
    """
    # Kecualikan timeout — bukan error koneksi, tapi lambatnya server
    if isinstance(e, (asyncio.TimeoutError, TimeoutError)):
        return False

    # 1. Tipe exception bawaan Python untuk socket, jaringan, dan OS error
    if isinstance(e, (socket.gaierror, ConnectionError, OSError)):
        return True

    # 2. Periksa nama class exception (misal ConnectError, NetworkError dari httpx/SDK)
    cls_names = {cls.__name__ for cls in type(e).__mro__}
    if any(name in cls_names for name in ("ConnectError", "ConnectionError", "NetworkError", "ConnectTimeout")):
        return True

    # 3. Periksa exception bersarang (__cause__ atau __context__)
    cause = getattr(e, "__cause__", None)
    if cause and isinstance(cause, Exception) and is_connection_error(cause):
        return True
    context = getattr(e, "__context__", None)
    if context and isinstance(context, Exception) and is_connection_error(context):
        return True

    # 4. Periksa indikator teks pesan error
    msg = str(e).lower()
    offline_indicators = [
        "getaddrinfo failed",
        "connecterror",
        "name or service not known",
        "nodename nor servname provided",
        "failed to resolve",
        "temporary failure in name resolution",
        "connection refused",
        "network is unreachable",
        "network unreachable",
        "no route to host",
        "cannot connect",
    ]
    return any(ind in msg for ind in offline_indicators)


def is_transient_error(e: Exception) -> bool:
    """Mendeteksi apakah error adalah error sementara (503 UNAVAILABLE, 429 RATE LIMIT, kuota penuh)."""
    if is_connection_error(e):
        return False
    msg = str(e).lower()
    code = getattr(e, "code", None) or getattr(e, "status_code", None)
    if code in (503, 429, 500, 502, 504):
        return True
    indicators = [
        "503", "unavailable", "429", "resource_exhausted", "quota",
        "overloaded", "high demand", "busy", "rate limit", "temporarily",
        "try again later", "server error"
    ]
    return any(ind in msg for ind in indicators)


def get_candidate_vision_models() -> list[str]:
    """Mengambil daftar model vision prioritas dari gemini_client.models.list() dengan fallback aman."""
    models = ["gemini-3.8-flash"]
    try:
        if gemini_client:
            available = gemini_client.models.list()
            for m in available:
                name = getattr(m, "name", "") or ""
                model_id = name.replace("models/", "")
                actions = getattr(m, "supported_actions", []) or []
                if "generateContent" in actions and "flash" in model_id.lower() and "image" not in model_id.lower():
                    if model_id not in models:
                        models.append(model_id)
    except Exception:
        pass

    for fallback in DEFAULT_VISION_MODELS:
        if fallback not in models:
            models.append(fallback)

    return models


@app.post("/chat-foto")
async def chat_dengan_foto(
    foto: UploadFile = File(..., description="File gambar/foto dari siswa (JPG, PNG, WEBP)"),
    pertanyaan: str = Form("Tolong jelaskan isi gambar atau cara mengerjakan soal pada foto ini ya, Defi!"),
    kelas: Optional[str] = Form(None),
):
    """Endpoint khusus saat siswa mengunggah foto (menggunakan Gemini Flash Vision dengan Auto-Retry & Fallback)."""
    if gemini_client is None:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY belum diatur di file .env. Isi API key terlebih dahulu untuk fitur upload foto.",
        )

    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/heic"]
    if foto.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Format file '{foto.content_type}' tidak didukung. Gunakan foto JPG, PNG, atau WEBP.",
        )

    image_bytes = await foto.read()
    if len(image_bytes) > 10 * 1024 * 1024:  # Batas ukuran awal 10 MB sebelum kompresi
        raise HTTPException(status_code=400, detail="Ukuran foto maksimal 10 MB ya.")

    # ── Timer tahap kompresi ─────────────────────────────────────────────────
    t_start = time.monotonic()

    # Kompresi & Resize otomatis menggunakan Pillow (max 1024px, JPEG 80%)
    try:
        compressed_bytes = compress_and_resize_image(image_bytes, max_dim=1024, quality=80)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gagal memproses gambar: {str(e)}")

    t_kompresi = time.monotonic() - t_start

    # Sanitasi input kelas dari Swagger UI ('string' / '')
    kelas = clean_param(kelas)
    konteks_kelas = f"Siswa ini berada di tingkat {kelas}. " if kelas else ""
    prompt_user = f"{konteks_kelas}Pertanyaan siswa: {pertanyaan}"

    # ── Konfigurasi cepat: thinking_budget=0, max_output_tokens=450 ──────────
    config_args = {
        "system_instruction": DEFI_VISION_SYSTEM_PROMPT,
        "temperature": 0.4,
        "max_output_tokens": 450,
    }

    # Matikan thinking overhead jika SDK mendukung ThinkingConfig
    if hasattr(types, "ThinkingConfig"):
        try:
            config_args["thinking_config"] = types.ThinkingConfig(thinking_budget=0)
        except Exception:
            pass

    try:
        gen_config = types.GenerateContentConfig(**config_args)
    except Exception:
        config_args.pop("thinking_config", None)
        gen_config = types.GenerateContentConfig(**config_args)

    # ── Auto-Retry & Fallback Model jika terkena 503 / 429 ───────────────────
    candidate_models = get_candidate_vision_models()
    target_models = candidate_models[:4]

    response_text = None
    used_model = None
    last_error = None
    all_busy = True
    is_offline = False

    t_api_start = time.monotonic()

    for model_name in target_models:
        for attempt in range(2):  # Maksimal 2x percobaan per model
            try:
                # Async native (aio) dengan timeout 15 detik per percobaan
                response = await asyncio.wait_for(
                    gemini_client.aio.models.generate_content(
                        model=model_name,
                        contents=[
                            types.Part.from_bytes(data=compressed_bytes, mime_type="image/jpeg"),
                            prompt_user,
                        ],
                        config=gen_config,
                    ),
                    timeout=15.0,
                )
                if response and response.text:
                    response_text = response.text
                    used_model = model_name
                    break
            except (asyncio.TimeoutError, TimeoutError) as e:
                # Timeout bukan error jaringan — anggap transient, coba model berikutnya
                last_error = e
                print(f"[TIMER] Timeout {attempt+1}/2 pada model {model_name}")
                break  # Langsung ke model cadangan berikutnya
            except Exception as e:
                last_error = e
                # Cek jika error koneksi internet / kegagalan resolusi DNS
                if is_connection_error(e):
                    is_offline = True
                    all_busy = False
                    break
                if is_transient_error(e):
                    # Jika 503 / 429, tunggu 1.5 detik lalu coba lagi (hanya 1x)
                    if attempt < 1:
                        await asyncio.sleep(1.5)
                        continue
                    else:
                        break
                else:
                    all_busy = False
                    break

        if response_text or is_offline:
            break

    # ── Log waktu eksekusi ────────────────────────────────────────────────────
    t_api = time.monotonic() - t_api_start
    t_total = time.monotonic() - t_start
    print(f"[TIMER] Kompresi: {t_kompresi:.2f}s | Gemini API: {t_api:.2f}s | Total: {t_total:.2f}s | Model: {used_model or 'none'}")

    if response_text:
        return {
            "sumber": "gemini_vision",
            "status": "success",
            "jawaban": re.sub(r'\s+', ' ', response_text).strip().replace('"', "'"),
            "metadata": {
                "nama_file": foto.filename,
                "kelas": kelas or "Semua Kelas",
                "model_digunakan": used_model,
            },
        }

    # Penanganan error koneksi internet / DNS (socket.gaierror, ConnectError, OSError, atau "getaddrinfo failed")
    if is_offline or (last_error and is_connection_error(last_error)):
        # Coba Ollama Vision offline jika tersedia
        ollama_vision_model = await _get_ollama_vision_model()
        if ollama_vision_model:
            ollama_resp = await _ask_ollama_vision(
                compressed_bytes, pertanyaan, model=ollama_vision_model, kelas=kelas
            )
            if ollama_resp:
                return {
                    "sumber": "ollama_vision_lokal",
                    "status": "success",
                    "jawaban": ollama_resp,
                    "metadata": {
                        "nama_file": foto.filename,
                        "kelas": kelas or "Semua Kelas",
                        "model_digunakan": ollama_vision_model,
                    },
                }
        # Tidak ada model vision lokal — pesan ramah
        return {
            "sumber": "gemini_vision",
            "status": "offline",
            "jawaban": (
                "Waduh, koneksi internet Defi sedang terputus nih! "
                "Coba periksa jaringan Wi-Fi atau internetmu dulu ya, lalu kirim ulang fotonya! "
                "Atau minta gurumu untuk mengaktifkan Ollama Vision lokal agar Defi bisa baca foto tanpa internet."
            ),
            "metadata": {
                "nama_file": foto.filename,
                "kelas": kelas or "Semua Kelas",
            },
        }

    # Graceful Fallback: jika seluruh model Gemini mengalami 503 / UNAVAILABLE / 429
    if all_busy or (last_error and is_transient_error(last_error)):
        return {
            "sumber": "gemini_vision",
            "status": "busy",
            "jawaban": (
                "Waduh, mata Defi sedang ramai dipakai banyak teman belajar nih! "
                "Tunggu sekitar 5 detik lalu kirim ulang fotonya ya, Defi siap bantu!"
            ),
            "metadata": {
                "nama_file": foto.filename,
                "kelas": kelas or "Semua Kelas",
            },
        }

    # Error permanen lainnya
    raise HTTPException(status_code=500, detail=f"Gagal memproses foto dengan Gemini API: {str(last_error)}")


@app.post("/reload-dataset")
def reload_dataset():
    """Muat ulang data/dataset.csv setelah data diperbarui."""
    defi_local.load_dataset()
    return {
        "message": "Dataset berhasil dimuat ulang!",
        "total_materi": len(defi_local.df),
        "rincian_kategori": defi_local.df["kategori"].value_counts().to_dict(),
    }
