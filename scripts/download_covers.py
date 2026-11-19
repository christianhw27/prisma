import urllib.request
import os
import json
import re
import time

covers_dir = os.path.join('public', 'covers')
os.makedirs(covers_dir, exist_ok=True)

# Curated high quality educational Unsplash photos matching each chapter
curated_photos = {
    # Kelas 1
    "1-1": "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80", # Tomat
    "1-2": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", # Kue
    "1-3": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80", # Kamar
    "1-4": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80", # Telur
    "1-5": "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?auto=format&fit=crop&w=800&q=80", # Gelang manik
    "1-6": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80", # Krayon
    "1-7": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80", # Kelinci
    "1-8": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80", # Buah tropis

    # Kelas 2
    "2-1": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80", # Sarapan
    "2-2": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80", # Kue bolu
    "2-3": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80", # Celengan tabungan
    "2-4": "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=800&q=80", # Katak hijau
    "2-5": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80", # Perpustakaan
    "2-6": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", # Balok kayu
    "2-7": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80", # Jam dinding
    "2-8": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80", # Kucing & anjing

    # Kelas 3
    "3-1": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", # Tambak ikan
    "3-2": "https://images.unsplash.com/photo-1585336261026-6fb7fca2345e?auto=format&fit=crop&w=800&q=80", # Koperasi alat tulis
    "3-3": "https://images.unsplash.com/photo-1606744888344-498238f01766?auto=format&fit=crop&w=800&q=80", # Anyaman bambu
    "3-4": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80", # Jam menara
    "3-5": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", # Roti bakar
    "3-6": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80", # Meteran ukur meja
    "3-7": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80", # Layang layang
    "3-8": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80", # Kebersihan & sampah

    # Kelas 4
    "4-1": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", # Martabak manis
    "4-2": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80", # Stasiun kereta
    "4-3": "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80", # Kebun sayur sekolah
    "4-4": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", # Pesta ulang tahun
    "4-5": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", # Lapangan lari
    "4-6": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80", # Jahe & kunyit rempah
    "4-7": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80", # Pagar kandang
    "4-8": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", # Lapangan basket

    # Kelas 5
    "5-1": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80", # Sepeda
    "5-2": "https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=800&q=80", # Kereta api wisata
    "5-3": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80", # Taman bunga
    "5-4": "https://images.unsplash.com/photo-1564689510742-4e9c7584181d?auto=format&fit=crop&w=800&q=80", # Kebun teh
    "5-5": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", # Jarum jam menara
    "5-6": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80", # Akuarium ikan
    "5-7": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", # Grafik nilai matematika
    "5-8": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80", # Festival layang layang

    # Kelas 6
    "6-1": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80", # Sawah padi pupuk
    "6-2": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", # Kompas & peta kemah
    "6-3": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80", # Toko buku & diskon
    "6-4": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", # Bibit pohon
    "6-5": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", # Roda gerobak kayu
    "6-6": "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=800&q=80", # Wadah tabung
    "6-7": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", # Puncak salju dingin
    "6-8": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80", # Peta navigasi jalan
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print(f"Starting download of {len(curated_photos)} chapter covers...")

success_count = 0
for key, url in curated_photos.items():
    dest = os.path.join(covers_dir, f"cover-k{key.replace('-', '-b')}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            with open(dest, 'wb') as f:
                f.write(content)
        success_count += 1
        print(f"[{success_count}/{len(curated_photos)}] Saved {dest} ({len(content) // 1024} KB)")
        time.sleep(0.1)
    except Exception as e:
        print(f"Failed {key} ({url}): {e}")

print(f"\nFinished! Downloaded {success_count} / {len(curated_photos)} images to {covers_dir}")
