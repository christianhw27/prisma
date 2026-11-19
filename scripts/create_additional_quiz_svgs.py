import os

# 1. k3-b8-piktogram-kebersihan.svg
svg_k3_b8 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
  <rect width="600" height="320" rx="24" fill="#FFF8F0" stroke="#8F8575" stroke-width="2" stroke-opacity="0.25"/>
  
  <text x="300" y="38" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="20" font-weight="bold" fill="#2B3445">
    Piktogram Sampah Terkumpul per Kelas
  </text>
  
  <!-- Legend Banner -->
  <rect x="180" y="55" width="240" height="32" rx="12" fill="#7FD4C4" fill-opacity="0.25" stroke="#1E7A6F" stroke-width="1.5"/>
  <text x="300" y="76" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#1E7A6F">
    Keterangan: 1 🗑️ = 2 Kantong Sampah
  </text>
  
  <!-- Row 1: Kelas 1 (3 icon = 6 kantong) -->
  <g transform="translate(60, 115)">
    <text x="0" y="16" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">Kelas 1</text>
    <text x="120" y="18" font-size="22">🗑️ 🗑️ 🗑️</text>
    <text x="440" y="16" font-family="'Lexend', sans-serif" font-size="13" font-weight="bold" fill="#5B6474">(6 Kantong)</text>
  </g>
  <line x1="60" y1="145" x2="540" y2="145" stroke="#8F8575" stroke-opacity="0.2" stroke-dasharray="4 4"/>

  <!-- Row 2: Kelas 2 (4 icon = 8 kantong) -->
  <g transform="translate(60, 170)">
    <text x="0" y="16" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">Kelas 2</text>
    <text x="120" y="18" font-size="22">🗑️ 🗑️ 🗑️ 🗑️</text>
    <text x="440" y="16" font-family="'Lexend', sans-serif" font-size="13" font-weight="bold" fill="#5B6474">(8 Kantong)</text>
  </g>
  <line x1="60" y1="200" x2="540" y2="200" stroke="#8F8575" stroke-opacity="0.2" stroke-dasharray="4 4"/>

  <!-- Row 3: Kelas 3 (6 icon = 12 kantong - Terbanyak) -->
  <g transform="translate(60, 225)">
    <text x="0" y="16" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#1E7A6F">Kelas 3 🌟</text>
    <text x="120" y="18" font-size="22">🗑️ 🗑️ 🗑️ 🗑️ 🗑️ 🗑️</text>
    <text x="440" y="16" font-family="'Lexend', sans-serif" font-size="13" font-weight="bold" fill="#1E7A6F">(12 Kantong)</text>
  </g>
  <line x1="60" y1="255" x2="540" y2="255" stroke="#8F8575" stroke-opacity="0.2" stroke-dasharray="4 4"/>

  <!-- Row 4: Kelas 4 (5 icon = 10 kantong) -->
  <g transform="translate(60, 280)">
    <text x="0" y="16" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">Kelas 4</text>
    <text x="120" y="18" font-size="22">🗑️ 🗑️ 🗑️ 🗑️ 🗑️</text>
    <text x="440" y="16" font-family="'Lexend', sans-serif" font-size="13" font-weight="bold" fill="#5B6474">(10 Kantong)</text>
  </g>
</svg>'''

# 2. k4-b3-petak-kangkung.svg
svg_k4_b3 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
  <rect width="600" height="320" rx="24" fill="#FFF8F0" stroke="#8F8575" stroke-width="2" stroke-opacity="0.25"/>
  
  <text x="300" y="38" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="20" font-weight="bold" fill="#2B3445">
    Denah Petak Lahan Kangkung (3 Baris × 4 Kolom)
  </text>
  
  <!-- 3x4 Grid of garden plots -->
  <g transform="translate(130, 65)">
    <!-- Column labels -->
    <text x="40" y="-8" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Kolom 1</text>
    <text x="125" y="-8" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Kolom 2</text>
    <text x="210" y="-8" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Kolom 3</text>
    <text x="295" y="-8" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Kolom 4</text>
    
    <!-- Row 1 -->
    <text x="-45" y="45" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Baris 1</text>
    <rect x="0" y="8" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="40" y="45" text-anchor="middle" font-size="20">🌱</text>
    <rect x="85" y="8" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="125" y="45" text-anchor="middle" font-size="20">🌱</text>
    <rect x="170" y="8" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="210" y="45" text-anchor="middle" font-size="20">🌱</text>
    <rect x="255" y="8" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="295" y="45" text-anchor="middle" font-size="20">🌱</text>
    
    <!-- Row 2 -->
    <text x="-45" y="125" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Baris 2</text>
    <rect x="0" y="88" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="40" y="125" text-anchor="middle" font-size="20">🌱</text>
    <rect x="85" y="88" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="125" y="125" text-anchor="middle" font-size="20">🌱</text>
    <rect x="170" y="88" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="210" y="125" text-anchor="middle" font-size="20">🌱</text>
    <rect x="255" y="88" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="295" y="125" text-anchor="middle" font-size="20">🌱</text>

    <!-- Row 3 -->
    <text x="-45" y="205" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#5B6474">Baris 3</text>
    <rect x="0" y="168" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="40" y="205" text-anchor="middle" font-size="20">🌱</text>
    <rect x="85" y="168" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="125" y="205" text-anchor="middle" font-size="20">🌱</text>
    <rect x="170" y="168" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="210" y="205" text-anchor="middle" font-size="20">🌱</text>
    <rect x="255" y="168" width="80" height="65" rx="14" fill="#7FD4C4" fill-opacity="0.35" stroke="#1E7A6F" stroke-width="2"/>
    <text x="295" y="205" text-anchor="middle" font-size="20">🌱</text>
  </g>
</svg>'''

# 3. k5-b5-jam-3.svg
svg_k5_b5 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" width="100%" height="100%">
  <rect width="500" height="280" rx="24" fill="#FFF8F0" stroke="#8F8575" stroke-width="2" stroke-opacity="0.25"/>
  
  <text x="250" y="38" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="20" font-weight="bold" fill="#2B3445">
    Jarum Jam Menara Balai Desa: Pukul 03.00
  </text>

  <!-- Clock Circle -->
  <g transform="translate(250, 155)">
    <circle cx="0" cy="0" r="95" fill="#FFFFFF" stroke="#1E7A6F" stroke-width="5"/>
    <circle cx="0" cy="0" r="6" fill="#1E7A6F"/>
    
    <!-- Numbers -->
    <text x="0" y="-72" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">12</text>
    <text x="75" y="6" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">3</text>
    <text x="0" y="80" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">6</text>
    <text x="-75" y="6" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="16" font-weight="bold" fill="#2B3445">9</text>
    
    <!-- Right Angle Arc / Square -->
    <rect x="0" y="-22" width="22" height="22" fill="#7FD4C4" fill-opacity="0.4" stroke="#1E7A6F" stroke-width="2"/>
    <text x="32" y="-28" font-family="'Lexend', sans-serif" font-size="13" font-weight="bold" fill="#1E7A6F">90° (Siku-siku)</text>

    <!-- Minute Hand pointing to 12 -->
    <line x1="0" y1="0" x2="0" y2="-68" stroke="#2B3445" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Hour Hand pointing to 3 -->
    <line x1="0" y1="0" x2="52" y2="0" stroke="#1E7A6F" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>'''

# 4. k6-b8-peta-desa.svg
svg_k6_b8 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  <rect width="600" height="300" rx="24" fill="#FFF8F0" stroke="#8F8575" stroke-width="2" stroke-opacity="0.25"/>
  
  <text x="300" y="38" text-anchor="middle" font-family="'Baloo 2', cursive" font-size="20" font-weight="bold" fill="#2B3445">
    Peta Rute Desa Sukamaju (Skala 1 : 10.000)
  </text>
  
  <!-- Map Route Line -->
  <g transform="translate(60, 60)">
    <!-- Path Line -->
    <polyline points="40,90 180,90 320,150 440,90" fill="none" stroke="#1E7A6F" stroke-width="4" stroke-dasharray="8 6"/>
    
    <!-- Balai Desa -->
    <circle cx="40" cy="90" r="24" fill="#FFDE7A" stroke="#2B3445" stroke-width="2"/>
    <text x="40" y="96" text-anchor="middle" font-size="16">🏛️</text>
    <text x="40" y="130" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#2B3445">Balai Desa</text>

    <!-- Distance 1: 5 cm -->
    <rect x="90" y="66" width="46" height="22" rx="6" fill="#FFFFFF" stroke="#8F8575" stroke-width="1.5"/>
    <text x="113" y="81" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="11" font-weight="bold" fill="#1E7A6F">5 cm</text>

    <!-- Sekolah -->
    <circle cx="180" cy="90" r="24" fill="#7FD4C4" stroke="#2B3445" stroke-width="2"/>
    <text x="180" y="96" text-anchor="middle" font-size="16">🏫</text>
    <text x="180" y="130" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#2B3445">Sekolah</text>

    <!-- Distance 2: 8 cm -->
    <rect x="232" y="105" width="46" height="22" rx="6" fill="#FFFFFF" stroke="#8F8575" stroke-width="1.5"/>
    <text x="255" y="120" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="11" font-weight="bold" fill="#1E7A6F">8 cm</text>

    <!-- Puskesmas -->
    <circle cx="320" cy="150" r="24" fill="#FFB899" stroke="#2B3445" stroke-width="2"/>
    <text x="320" y="156" text-anchor="middle" font-size="16">🏥</text>
    <text x="320" y="190" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#2B3445">Puskesmas</text>

    <!-- Distance 3: 4 cm -->
    <rect x="362" y="105" width="46" height="22" rx="6" fill="#FFFFFF" stroke="#8F8575" stroke-width="1.5"/>
    <text x="385" y="120" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="11" font-weight="bold" fill="#1E7A6F">4 cm</text>

    <!-- Lapangan -->
    <circle cx="440" cy="90" r="24" fill="#94C6FF" stroke="#2B3445" stroke-width="2"/>
    <text x="440" y="96" text-anchor="middle" font-size="16">⚽</text>
    <text x="440" y="130" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#2B3445">Lapangan</text>
  </g>
  
  <!-- Scale Banner -->
  <rect x="200" y="250" width="200" height="28" rx="10" fill="#FFFFFF" stroke="#1E7A6F" stroke-width="1.5"/>
  <text x="300" y="269" text-anchor="middle" font-family="'Lexend', sans-serif" font-size="12" font-weight="bold" fill="#1E7A6F">
    Skala Peta: 1 cm = 100 meter (10.000 cm)
  </text>
</svg>'''

with open('public/quiz/k3-b8-piktogram-kebersihan.svg', 'w', encoding='utf-8') as f:
    f.write(svg_k3_b8)

with open('public/quiz/k4-b3-petak-kangkung.svg', 'w', encoding='utf-8') as f:
    f.write(svg_k4_b3)

with open('public/quiz/k5-b5-jam-3.svg', 'w', encoding='utf-8') as f:
    f.write(svg_k5_b5)

with open('public/quiz/k6-b8-peta-desa.svg', 'w', encoding='utf-8') as f:
    f.write(svg_k6_b8)

print("Created 4 custom quiz SVGs!")
