import urllib.request
import os
import time

mismatches = {
    "1-6": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", # Pita lomba
    "1-7": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80", # Hari-hariku anak sekolah
    "2-3": "https://images.unsplash.com/photo-1585336261026-6fb7fca2345e?auto=format&fit=crop&w=800&q=80", # Mengukur panjang pensil
    "2-5": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", # Timbangan kelereng
    "2-6": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80", # Tangram bentuk kakek
    "2-8": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", # Belanja di warung telur gula
    "3-2": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", # Kue syukuran kotak
    "3-3": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", # Ukur tubuh UKS
    "3-4": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", # Pameran kerajinan daur ulang
    "3-6": "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80", # Wisata kebun binatang
    "4-2": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80", # Koperasi diskon buku
    "4-4": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80", # Mengecat pagar kuas
    "4-5": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80", # Peternakan telur ayam peti
    "4-6": "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80", # Kursi penonton pentas seni
    "4-8": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", # Toko kue basah
    "5-2": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", # Es buah segar semangka
    "5-4": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80", # Kerja bakti gotong royong
    "5-7": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80", # Panen padi sawah
    "5-8": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", # Lomba lompat jauh atletik
    "6-3": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80", # Botol minum plastik isi ulang
    "6-4": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", # Undian doorprize jalan sehat
    "6-5": "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80", # Perlengkapan kemah tenda
    "6-6": "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80", # Sumur lingkaran batu
    "6-7": "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80", # Tunas kacang hijau gelas
}

headers = {'User-Agent': 'Mozilla/5.0'}

for k, url in mismatches.items():
    dest = os.path.join('public', 'covers', f"cover-k{k.replace('-', '-b')}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
        print(f"Updated {k} -> {dest} ({len(data)//1024} KB)")
        time.sleep(0.1)
    except Exception as e:
        print(f"Error {k}: {e}")

print("All mismatched covers updated!")
