const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'quiz', 'items');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const svgs = {
  // 1. Tomat
  'tomat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect width="200" height="200" rx="28" fill="#FFF8F0"/>
    <ellipse cx="100" cy="165" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Badan Tomat Merah Bulat Cerah -->
    <ellipse cx="100" cy="115" rx="58" ry="50" fill="#FF5252"/>
    <path d="M 65 110 C 65 80, 135 80, 135 110 C 135 145, 65 145, 65 110 Z" fill="#FF3838"/>
    <!-- Kilau Cahaya -->
    <path d="M 68 95 C 75 85, 95 82, 105 85 C 92 88, 75 98, 70 110 C 68 105, 67 100, 68 95 Z" fill="#FFFFFF" opacity="0.5"/>
    <!-- Kelopak Daun Hijau -->
    <path d="M 100 68 C 100 50, 108 45, 114 42" stroke="#2E7D32" stroke-width="6" stroke-linecap="round" fill="none"/>
    <polygon points="100,72 82,60 92,72 75,76 92,80 82,92 100,82 118,92 108,80 125,76 108,72 118,60" fill="#4CAF50"/>
    <text x="100" y="185" font-family="'Baloo 2', cursive, sans-serif" font-size="16" font-weight="bold" fill="#2B3445" text-anchor="middle">Tomat Segar</text>
  </svg>`,

  // 2. Wortel
  'wortel.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect width="200" height="200" rx="28" fill="#FFF8F0"/>
    <ellipse cx="100" cy="165" rx="45" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Daun Wortel Hijau -->
    <path d="M 100 70 C 85 45, 75 40, 70 35" stroke="#4CAF50" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M 100 70 C 100 40, 102 30, 100 25" stroke="#388E3C" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M 100 70 C 115 45, 125 40, 130 35" stroke="#4CAF50" stroke-width="5" stroke-linecap="round" fill="none"/>
    <!-- Badan Wortel Segitiga Melengkung -->
    <path d="M 80 72 C 80 68, 120 68, 120 72 C 120 90, 108 145, 100 155 C 92 145, 80 90, 80 72 Z" fill="#FF7043"/>
    <!-- Garis Tekstur Wortel -->
    <line x1="88" y1="88" x2="102" y2="88" stroke="#E64A19" stroke-width="3" stroke-linecap="round"/>
    <line x1="98" y1="105" x2="114" y2="105" stroke="#E64A19" stroke-width="3" stroke-linecap="round"/>
    <line x1="92" y1="122" x2="106" y2="122" stroke="#E64A19" stroke-width="3" stroke-linecap="round"/>
    <text x="100" y="185" font-family="'Baloo 2', cursive, sans-serif" font-size="16" font-weight="bold" fill="#2B3445" text-anchor="middle">Wortel Oranye</text>
  </svg>`,

  // 3. Apel
  'apel.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect width="200" height="200" rx="28" fill="#FFF8F0"/>
    <ellipse cx="100" cy="165" rx="50" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Tangkai & Daun -->
    <path d="M 100 70 C 102 52, 112 45, 118 42" stroke="#6D4C41" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M 105 60 C 125 50, 135 60, 130 70 C 118 72, 110 65, 105 60 Z" fill="#66BB6A"/>
    <!-- Badan Apel Merah Hati -->
    <path d="M 100 75 C 80 65, 60 75, 60 105 C 60 138, 85 152, 100 152 C 115 152, 140 138, 140 105 C 140 75, 120 65, 100 75 Z" fill="#E53935"/>
    <path d="M 72 90 C 78 82, 90 80, 95 82 C 85 85, 75 95, 72 105 Z" fill="#FFFFFF" opacity="0.45"/>
    <text x="100" y="185" font-family="'Baloo 2', cursive, sans-serif" font-size="16" font-weight="bold" fill="#2B3445" text-anchor="middle">Apel Manis</text>
  </svg>`,

  // 4. Kandang 9 Telur
  'kandang-9-telur.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 190" width="100%" height="100%">
    <rect width="220" height="190" rx="28" fill="#FFF8F0"/>
    <!-- Sarang Jerami -->
    <ellipse cx="110" cy="130" rx="80" ry="32" fill="#D7CCC8"/>
    <ellipse cx="110" cy="125" rx="72" ry="26" fill="#FFE082"/>
    <!-- 9 Butir Telur Cokelat Terhitung -->
    <!-- Baris Bawah (5 butir) -->
    <ellipse cx="62" cy="115" rx="12" ry="16" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="86" cy="118" rx="12" ry="16" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="110" cy="120" rx="12" ry="16" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="134" cy="118" rx="12" ry="16" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="158" cy="115" rx="12" ry="16" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <!-- Baris Atas (4 butir) -->
    <ellipse cx="74" cy="98" rx="12" ry="16" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="98" cy="100" rx="12" ry="16" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="122" cy="100" rx="12" ry="16" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="146" cy="98" rx="12" ry="16" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <!-- Badge Label -->
    <rect x="55" y="18" width="110" height="34" rx="12" fill="#1E7A6F"/>
    <text x="110" y="41" font-family="'Baloo 2', cursive, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Kandang Kiri</text>
    <text x="110" y="174" font-family="'Lexend', sans-serif" font-size="14" font-weight="bold" fill="#D84315" text-anchor="middle">Ada 9 Butir Telur</text>
  </svg>`,

  // 5. Kandang 12 Telur
  'kandang-12-telur.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 190" width="100%" height="100%">
    <rect width="220" height="190" rx="28" fill="#FFF8F0"/>
    <!-- Sarang Jerami Lebih Besar -->
    <ellipse cx="110" cy="130" rx="86" ry="34" fill="#D7CCC8"/>
    <ellipse cx="110" cy="125" rx="78" ry="28" fill="#FFD54F"/>
    <!-- 12 Butir Telur Cokelat Terhitung -->
    <!-- Baris 1 (5 butir) -->
    <ellipse cx="58" cy="120" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="80" cy="122" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="102" cy="124" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="124" cy="124" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="146" cy="122" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="168" cy="120" rx="11" ry="15" fill="#FFE0B2" stroke="#FFB74D" stroke-width="2"/>
    <!-- Baris 2 (4 butir) -->
    <ellipse cx="70" cy="104" rx="11" ry="15" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="92" cy="106" rx="11" ry="15" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="114" cy="106" rx="11" ry="15" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <ellipse cx="136" cy="104" rx="11" ry="15" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
    <!-- Baris 3 Atas (2 butir) -->
    <ellipse cx="92" cy="88" rx="11" ry="15" fill="#FFF8E1" stroke="#FFA726" stroke-width="2"/>
    <ellipse cx="114" cy="88" rx="11" ry="15" fill="#FFF8E1" stroke="#FFA726" stroke-width="2"/>
    <!-- Badge Label -->
    <rect x="50" y="18" width="120" height="34" rx="12" fill="#1E7A6F"/>
    <text x="110" y="41" font-family="'Baloo 2', cursive, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Kandang Kanan</text>
    <text x="110" y="174" font-family="'Lexend', sans-serif" font-size="14" font-weight="bold" fill="#2E7D32" text-anchor="middle">Ada 12 Butir Telur (Lebih Banyak!)</text>
  </svg>`,

  // 6. Manik Merah
  'manik-merah.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="24" fill="#FFF8F0"/>
    <ellipse cx="80" cy="130" rx="35" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Manik Merah Glaze -->
    <circle cx="80" cy="78" r="42" fill="#E53935"/>
    <circle cx="80" cy="78" r="42" fill="url(#gradRed)" opacity="0.3"/>
    <ellipse cx="68" cy="62" rx="14" ry="8" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 68 62)"/>
    <!-- Lubang Manik Tembus Benang -->
    <circle cx="80" cy="78" r="7" fill="#880E4F" opacity="0.8"/>
    <text x="80" y="146" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Manik Merah</text>
  </svg>`,

  // 7. Manik Kuning
  'manik-kuning.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="24" fill="#FFF8F0"/>
    <ellipse cx="80" cy="130" rx="35" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Manik Kuning Glaze -->
    <circle cx="80" cy="78" r="42" fill="#FFCA28"/>
    <ellipse cx="68" cy="62" rx="14" ry="8" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 68 62)"/>
    <circle cx="80" cy="78" r="7" fill="#F57F17" opacity="0.8"/>
    <text x="80" y="146" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Manik Kuning</text>
  </svg>`,

  // 8. Manik Hijau
  'manik-hijau.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="24" fill="#FFF8F0"/>
    <ellipse cx="80" cy="130" rx="35" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Manik Hijau Glaze -->
    <circle cx="80" cy="78" r="42" fill="#43A047"/>
    <ellipse cx="68" cy="62" rx="14" ry="8" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 68 62)"/>
    <circle cx="80" cy="78" r="7" fill="#1B5E20" opacity="0.8"/>
    <text x="80" y="146" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Manik Hijau</text>
  </svg>`,

  // 9. Pisang
  'pisang.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
    <rect width="180" height="180" rx="24" fill="#FFF8F0"/>
    <ellipse cx="90" cy="150" rx="45" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Sisir Pisang -->
    <path d="M 50 120 C 50 65, 120 60, 140 100 C 135 110, 110 80, 60 125 Z" fill="#FDD835"/>
    <path d="M 40 110 C 45 55, 115 50, 130 90 C 125 100, 100 70, 50 115 Z" fill="#FFEE58"/>
    <path d="M 38 108 L 32 114" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
    <path d="M 132 88 L 140 82" stroke="#689F38" stroke-width="4" stroke-linecap="round"/>
    <text x="90" y="165" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Pisang</text>
  </svg>`,

  // 10. Jeruk
  'jeruk.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
    <rect width="180" height="180" rx="24" fill="#FFF8F0"/>
    <ellipse cx="90" cy="150" rx="45" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Daun Hijau -->
    <path d="M 90 60 C 110 45, 125 55, 120 68 C 108 70, 96 64, 90 60 Z" fill="#43A047"/>
    <path d="M 90 62 L 90 52" stroke="#6D4C41" stroke-width="4" stroke-linecap="round"/>
    <!-- Badan Jeruk Oranye Bulat -->
    <circle cx="90" cy="100" r="42" fill="#FB8C00"/>
    <!-- Pori Pori Tekstur Jeruk -->
    <circle cx="75" cy="85" r="1.5" fill="#E65100" opacity="0.6"/>
    <circle cx="105" cy="90" r="1.5" fill="#E65100" opacity="0.6"/>
    <circle cx="85" cy="115" r="1.5" fill="#E65100" opacity="0.6"/>
    <ellipse cx="78" cy="84" rx="10" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 78 84)"/>
    <text x="90" y="165" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Jeruk (Paling Banyak)</text>
  </svg>`,

  // 11. Mangga
  'mangga.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
    <rect width="180" height="180" rx="24" fill="#FFF8F0"/>
    <ellipse cx="90" cy="150" rx="42" ry="10" fill="#EADBC8" opacity="0.6"/>
    <path d="M 85 55 L 85 45" stroke="#6D4C41" stroke-width="4" stroke-linecap="round"/>
    <!-- Buah Mangga Harum Manis -->
    <path d="M 85 58 C 115 58, 130 90, 120 120 C 110 145, 75 145, 65 125 C 55 105, 60 70, 85 58 Z" fill="#7CB342"/>
    <path d="M 85 62 C 110 65, 120 90, 115 115 C 95 100, 80 75, 85 62 Z" fill="#FDD835" opacity="0.65"/>
    <text x="90" y="165" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Mangga</text>
  </svg>`,

  // 12. Semangka
  'semangka.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
    <rect width="180" height="180" rx="24" fill="#FFF8F0"/>
    <ellipse cx="90" cy="150" rx="45" ry="10" fill="#EADBC8" opacity="0.6"/>
    <!-- Potongan Semangka Segitiga -->
    <path d="M 40 120 C 65 142, 115 142, 140 120 L 90 55 Z" fill="#2E7D32"/>
    <path d="M 46 116 C 68 136, 112 136, 134 116 L 90 62 Z" fill="#C8E6C9"/>
    <path d="M 52 112 C 72 130, 108 130, 128 112 L 90 68 Z" fill="#E53935"/>
    <!-- Biji Semangka Hitam Kecil -->
    <circle cx="80" cy="100" r="2.5" fill="#212121"/>
    <circle cx="100" cy="100" r="2.5" fill="#212121"/>
    <circle cx="90" cy="112" r="2.5" fill="#212121"/>
    <text x="90" y="165" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#2B3445" text-anchor="middle">Semangka</text>
  </svg>`,

  // 13. Kue Setengah (1/2)
  'kue-setengah.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <ellipse cx="95" cy="155" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Kue Bundar Dibagi 2 Sama Besar -->
    <circle cx="95" cy="92" r="50" fill="#FFE082" stroke="#8F8575" stroke-width="2.5"/>
    <!-- Setengah Bagian Diwarnai Toska (#1E7A6F) -->
    <path d="M 95 42 A 50 50 0 0 1 95 142 Z" fill="#1E7A6F"/>
    <line x1="95" y1="42" x2="95" y2="142" stroke="#2B3445" stroke-width="3"/>
    <!-- Label -->
    <text x="95" y="175" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#1E7A6F" text-anchor="middle">Pecahan 1/2 (Sama Besar)</text>
  </svg>`,

  // 14. Kue Tidak Sama Besar
  'kue-tidak-sama.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <ellipse cx="95" cy="155" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Kue Bundar Dibagi Tidak Seimbang -->
    <circle cx="95" cy="92" r="50" fill="#FFE082" stroke="#8F8575" stroke-width="2.5"/>
    <path d="M 125 48 A 50 50 0 0 1 125 136 Z" fill="#FF8A65"/>
    <line x1="125" y1="48" x2="125" y2="136" stroke="#2B3445" stroke-width="3"/>
    <text x="95" y="175" font-family="'Baloo 2', cursive, sans-serif" font-size="14" font-weight="bold" fill="#D84315" text-anchor="middle">Tidak Sama Besar</text>
  </svg>`,

  // 15. Kue Seperempat (1/4)
  'kue-seperempat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <ellipse cx="95" cy="155" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Kue Bundar Dibagi 4 -->
    <circle cx="95" cy="92" r="50" fill="#FFE082" stroke="#8F8575" stroke-width="2.5"/>
    <path d="M 95 92 L 145 92 A 50 50 0 0 1 95 142 Z" fill="#94C6FF"/>
    <line x1="95" y1="42" x2="95" y2="142" stroke="#2B3445" stroke-width="2"/>
    <line x1="45" y1="92" x2="145" y2="92" stroke="#2B3445" stroke-width="2"/>
    <text x="95" y="175" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#1565C0" text-anchor="middle">Pecahan 1/4</text>
  </svg>`,

  // 16. Jam 07.00
  'jam-0700.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <circle cx="95" cy="90" r="54" fill="#FFFFFF" stroke="#1E7A6F" stroke-width="6"/>
    <!-- Angka 12, 3, 6, 7, 9 -->
    <text x="95" y="52" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">12</text>
    <text x="135" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">3</text>
    <text x="95" y="136" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">6</text>
    <text x="55" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">9</text>
    <text x="70" y="124" font-family="'Baloo 2', cursive, sans-serif" font-size="12" font-weight="bold" fill="#1E7A6F" text-anchor="middle">7</text>
    <!-- Jarum Panjang ke 12 -->
    <line x1="95" y1="90" x2="95" y2="56" stroke="#2B3445" stroke-width="3" stroke-linecap="round"/>
    <!-- Jarum Pendek ke 7 -->
    <line x1="95" y1="90" x2="74" y2="114" stroke="#E53935" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="95" cy="90" r="4.5" fill="#2B3445"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#1E7A6F" text-anchor="middle">Pukul 07.00</text>
  </svg>`,

  // 17. Jam 12.35 (Jarum pendek 12, panjang 7)
  'jam-1235.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <circle cx="95" cy="90" r="54" fill="#FFFFFF" stroke="#8F8575" stroke-width="5"/>
    <text x="95" y="52" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">12</text>
    <text x="135" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">3</text>
    <text x="95" y="136" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">6</text>
    <text x="55" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">9</text>
    <text x="70" y="124" font-family="'Baloo 2', cursive, sans-serif" font-size="12" font-weight="bold" fill="#5B6474" text-anchor="middle">7</text>
    <!-- Jarum Pendek ke 12 -->
    <line x1="95" y1="90" x2="95" y2="65" stroke="#E53935" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Jarum Panjang ke 7 -->
    <line x1="95" y1="90" x2="68" y2="122" stroke="#2B3445" stroke-width="3" stroke-linecap="round"/>
    <circle cx="95" cy="90" r="4.5" fill="#2B3445"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#5B6474" text-anchor="middle">Pukul 12.35</text>
  </svg>`,

  // 18. Jam 07.30
  'jam-0730.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <circle cx="95" cy="90" r="54" fill="#FFFFFF" stroke="#8F8575" stroke-width="5"/>
    <text x="95" y="52" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">12</text>
    <text x="135" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">3</text>
    <text x="95" y="136" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">6</text>
    <text x="55" y="94" font-family="'Baloo 2', cursive, sans-serif" font-size="13" font-weight="bold" fill="#2B3445" text-anchor="middle">9</text>
    <!-- Jarum Pendek ke antara 7 & 8 -->
    <line x1="95" y1="90" x2="70" y2="108" stroke="#E53935" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Jarum Panjang ke 6 -->
    <line x1="95" y1="90" x2="95" y2="128" stroke="#2B3445" stroke-width="3" stroke-linecap="round"/>
    <circle cx="95" cy="90" r="4.5" fill="#2B3445"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#5B6474" text-anchor="middle">Pukul 07.30</text>
  </svg>`,

  // 19. Roti Sepertiga (1/3)
  'roti-sepertiga.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <ellipse cx="95" cy="155" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Roti Tawar Dibagi 3 Bagian -->
    <rect x="45" y="55" width="100" height="80" rx="16" fill="#FFE0B2" stroke="#8D6E63" stroke-width="3"/>
    <!-- 1 Bagian Besar Diarsir / Diwarnai -->
    <rect x="45" y="55" width="33" height="80" rx="8" fill="#1E7A6F"/>
    <line x1="78" y1="55" x2="78" y2="135" stroke="#8D6E63" stroke-width="2"/>
    <line x1="112" y1="55" x2="112" y2="135" stroke="#8D6E63" stroke-width="2"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#1E7A6F" text-anchor="middle">Potongan 1/3 (Lebih Besar)</text>
  </svg>`,

  // 20. Roti Seperenam (1/6)
  'roti-seperenam.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <ellipse cx="95" cy="155" rx="55" ry="12" fill="#EADBC8" opacity="0.6"/>
    <!-- Roti Tawar Dibagi 6 Bagian Kecil -->
    <rect x="45" y="55" width="100" height="80" rx="16" fill="#FFE0B2" stroke="#8D6E63" stroke-width="3"/>
    <rect x="45" y="55" width="16.6" height="80" rx="4" fill="#FF8A65"/>
    <line x1="61.6" y1="55" x2="61.6" y2="135" stroke="#8D6E63" stroke-width="1.5"/>
    <line x1="78.3" y1="55" x2="78.3" y2="135" stroke="#8D6E63" stroke-width="1.5"/>
    <line x1="95" y1="55" x2="95" y2="135" stroke="#8D6E63" stroke-width="1.5"/>
    <line x1="111.6" y1="55" x2="111.6" y2="135" stroke="#8D6E63" stroke-width="1.5"/>
    <line x1="128.3" y1="55" x2="128.3" y2="135" stroke="#8D6E63" stroke-width="1.5"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#D84315" text-anchor="middle">Potongan 1/6 (Lebih Kecil)</text>
  </svg>`,

  // 21. Sudut Lancip
  'sudut-lancip.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <!-- Sudut Lancip (Kurang dari 90 Derajat) -->
    <line x1="45" y1="130" x2="145" y2="130" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <line x1="45" y1="130" x2="125" y2="55" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <path d="M 85 130 A 40 40 0 0 0 76 100" fill="none" stroke="#FF7043" stroke-width="4"/>
    <circle cx="45" cy="130" r="5" fill="#1E7A6F"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#D84315" text-anchor="middle">Sudut Lancip (&lt; 90°)</text>
  </svg>`,

  // 22. Sudut Siku-Siku
  'sudut-sikusiku.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <!-- Sudut Siku-Siku Tepat 90 Derajat -->
    <line x1="50" y1="130" x2="145" y2="130" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <line x1="50" y1="130" x2="50" y2="35" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <!-- Tanda Kotak Siku-Siku -->
    <rect x="50" y="105" width="25" height="25" fill="#7FD4C4" fill-opacity="0.4" stroke="#1E7A6F" stroke-width="3"/>
    <circle cx="50" cy="130" r="5" fill="#1E7A6F"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#1E7A6F" text-anchor="middle">Sudut Siku-Siku (Tepat 90°)</text>
  </svg>`,

  // 23. Sudut Tumpul
  'sudut-tumpul.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190" width="100%" height="100%">
    <rect width="190" height="190" rx="26" fill="#FFF8F0"/>
    <!-- Sudut Tumpul Lebih dari 90 Derajat -->
    <line x1="100" y1="130" x2="165" y2="130" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <line x1="100" y1="130" x2="35" y2="60" stroke="#2B3445" stroke-width="5" stroke-linecap="round"/>
    <path d="M 135 130 A 35 35 0 0 0 75 102" fill="none" stroke="#FFA726" stroke-width="4"/>
    <circle cx="100" cy="130" r="5" fill="#1E7A6F"/>
    <text x="95" y="172" font-family="'Baloo 2', cursive, sans-serif" font-size="15" font-weight="bold" fill="#5B6474" text-anchor="middle">Sudut Tumpul (&gt; 90°)</text>
  </svg>`
};

let count = 0;
for (const [filename, content] of Object.entries(svgs)) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  count++;
}

console.log(`Generated ${count} choice item SVGs in ${outDir}`);
