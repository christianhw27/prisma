import urllib.request
import os

fixes = {
    "3-2": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80", # Alat tulis
    "3-3": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", # Anyaman kerajinan
    "4-3": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80", # Kebun sayur
}

headers = {'User-Agent': 'Mozilla/5.0'}

for key, url in fixes.items():
    dest = os.path.join('public', 'covers', f"cover-k{key.replace('-', '-b')}.jpg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
        print(f"Fixed {key} -> {dest} ({len(data) // 1024} KB)")
    except Exception as e:
        print(f"Failed {key}: {e}")

# Verify all 48
all_exist = True
for k in range(1, 7):
    for b in range(1, 9):
        path = os.path.join('public', 'covers', f"cover-k{k}-b{b}.jpg")
        if not os.path.exists(path):
            print(f"Missing: {path}")
            all_exist = False

if all_exist:
    print("\n🎉 ALL 48 COVERS EXIST SUCCESSFULLY IN public/covers/!")
