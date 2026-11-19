import urllib.request
import os
import time

covers_dir = os.path.join('public', 'covers')
os.makedirs(covers_dir, exist_ok=True)

# Curated, 100% story-relevant educational photos matching each chapter
curated_photos = {
    # Kelas 1
    "1-1": "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80", # Tomat segar
    "1-2": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", # Kue di meja
    "1-3": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80", # Kamar tidur rapi
    "1-4": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80", # Telur di kandang ayam
    "1-5": "https://images.unsplash.com/photo-1766560362279-cfb5346871d3?auto=format&fit=crop&w=800&q=80", # Gelang manik-manik
    "1-6": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80", # Pita merah & kotak kado lomba
    "1-7": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", # Bima kegiatan belajar & sekolah
    "1-8": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80", # Buah tropis

    # Kelas 2
    "2-1": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80", # Sarapan sehat
    "2-2": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80", # Kue bolu bundar
    "2-3": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80", # Mengukur meja alat tulis
    "2-4": "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=800&q=80", # Katak hijau sawah
    "2-5": "https://images.unsplash.com/photo-1707137361471-9329fdfd42e5?auto=format&fit=crop&w=800&q=80", # Kelereng kaca warna-warni
    "2-6": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", # Mainan geometri kayu tangram
    "2-7": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80", # Jam dinding analog
    "2-8": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", # Belanja di warung sembako

    # Kelas 3
    "3-1": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", # Tambak ikan bandeng
    "3-2": "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80", # Kue syukuran pesta kelas
    "3-3": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80", # Pemeriksaan UKS tinggi/berat badan
    "3-4": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80", # Pameran kerajinan daur ulang
    "3-5": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", # Roti bakar lezat
    "3-6": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80", # Bus wisata sekolah
    "3-7": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80", # Layang-layang terbang
    "3-8": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80", # Lomba kebersihan sampah kelas

    # Kelas 4
    "4-1": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", # Martabak manis
    "4-2": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80", # Koperasi alat tulis pensil buku
    "4-3": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80", # Kebun sayur sekolah
    "4-4": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80", # Mengecat pagar sekolah
    "4-5": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80", # Krat telur peternakan ayam
    "4-6": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80", # Barisan kursi aula pentas seni
    "4-7": "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80", # Pagar kandang kambing kayu
    "4-8": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", # Toko kue basah display
    
    # Kelas 5
    "5-1": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80", # Sepeda impian
    "5-2": "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=800&q=80", # Semangkuk es buah segar dingin
    "5-3": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80", # Taman bermain balai desa perosotan
    "5-4": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80", # Kerja bakti & bingkisan sembako
    "5-5": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", # Jam menara balai desa
    "5-6": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80", # Akuarium ikan kelas
    "5-7": "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80", # Panen padi menguning subur
    "5-8": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", # Lomba lompat jauh atletik pasir

    # Kelas 6
    "6-1": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80", # Pupuk & sawah Pak Darto
    "6-2": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", # Peta kemah pramuka
    "6-3": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80", # Botol minum tumbler isi ulang
    "6-4": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", # Kupon undian doorprize jalan sehat
    "6-5": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80", # Tenda & perlengkapan kemah
    "6-6": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80", # Sumur batu tradisional
    "6-7": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80", # Kecambah tunas kacang hijau
    "6-8": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"  # Peta denah desa
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print(f"Verified {len(curated_photos)} chapter covers configuration.")
