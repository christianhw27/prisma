const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'quiz');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Colors from PRISMA Design System
const C = {
  krem: '#FFF8F0',
  putih: '#FFFFFF',
  garis: '#8F8575',
  tinta: '#2B3445',
  mint: '#7FD4C4',
  mintTua: '#1E7A6F',
  peach: '#FFB899',
  langit: '#94C6FF',
  kuning: '#FFDE7A',
  abuTeks: '#5B6474'
};

const svgs = {
  // 1. K1-B1: Tomat vs Wortel vs Apel
  'k1-b1-tomat.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  
  <!-- Item A: Tomat -->
  <g transform="translate(80, 110)">
    <circle cx="0" cy="10" r="42" fill="#FF5252" stroke="${C.tinta}" stroke-width="3"/>
    <ellipse cx="-15" cy="-5" rx="8" ry="14" fill="#FF7B7B" opacity="0.6"/>
    <path d="M 0,-32 Q -12,-48 -5,-55 Q 0,-38 0,-32 Q 12,-48 5,-55 Q 0,-38 0,-32" fill="${C.mintTua}" stroke="${C.tinta}" stroke-width="2"/>
    <path d="M -15,-30 Q -5,-35 0,-32 Q 5,-35 15,-30 Q 8,-25 0,-28 Q -8,-25 -15,-30" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="80" text-anchor="middle" font-family="Lexend, sans-serif" font-size="16" font-weight="bold" fill="${C.tinta}">(A) Tomat</text>
  </g>

  <!-- Item B: Wortel -->
  <g transform="translate(250, 110)">
    <path d="M -20,-20 L 20,-20 L 0,55 Z" fill="#FFA726" stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round"/>
    <line x1="-12" y1="0" x2="2" y2="0" stroke="${C.tinta}" stroke-width="2" opacity="0.4"/>
    <line x1="-2" y1="20" x2="10" y2="20" stroke="${C.tinta}" stroke-width="2" opacity="0.4"/>
    <!-- Daun Wortel -->
    <path d="M -8,-20 Q -15,-45 -5,-48 Q -5,-25 0,-20 Q 8,-48 15,-45 Q 8,-25 0,-20" fill="${C.mintTua}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="80" text-anchor="middle" font-family="Lexend, sans-serif" font-size="16" font-weight="bold" fill="${C.tinta}">(B) Wortel</text>
  </g>

  <!-- Item C: Apel -->
  <g transform="translate(420, 110)">
    <path d="M -35,5 C -35,-30 -5,-35 0,-20 C 5,-35 35,-30 35,5 C 35,40 10,48 0,45 C -10,48 -35,40 -35,5 Z" fill="#E53935" stroke="${C.tinta}" stroke-width="3"/>
    <path d="M 0,-20 Q 5,-38 12,-42" stroke="${C.garis}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 8,-35 Q 22,-45 22,-32 Q 15,-32 8,-35" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="80" text-anchor="middle" font-family="Lexend, sans-serif" font-size="16" font-weight="bold" fill="${C.tinta}">(C) Apel</text>
  </g>
</svg>`,

  // 2. K1-B3: Jam dinding, jendela, atap
  'k1-b3-kamar-bentuk.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
  <rect width="500" height="220" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  
  <!-- Jam: Lingkaran -->
  <g transform="translate(90, 100)">
    <circle cx="0" cy="0" r="45" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="3"/>
    <line x1="0" y1="0" x2="0" y2="-25" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="18" y2="0" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="4" fill="${C.tinta}"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend, sans-serif" font-size="14" font-weight="bold" fill="${C.tinta}">Jam (Lingkaran)</text>
  </g>

  <!-- Jendela: Persegi -->
  <g transform="translate(250, 100)">
    <rect x="-40" y="-40" width="80" height="80" rx="8" fill="${C.langit}" stroke="${C.tinta}" stroke-width="3"/>
    <line x1="0" y1="-40" x2="0" y2="40" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="-40" y1="0" x2="40" y2="0" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend, sans-serif" font-size="14" font-weight="bold" fill="${C.tinta}">Jendela (Persegi)</text>
  </g>

  <!-- Atap: Segitiga -->
  <g transform="translate(410, 100)">
    <polygon points="0,-45 45,35 -45,35" fill="${C.peach}" stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend, sans-serif" font-size="14" font-weight="bold" fill="${C.tinta}">Atap (Segitiga)</text>
  </g>
</svg>`,

  // 3. K1-B4: Kandang Ayam (9 telur vs 12 telur)
  'k1-b4-telur-kandang.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  
  <!-- Kandang Kiri (9 Telur) -->
  <g transform="translate(130, 40)">
    <rect x="-95" y="0" width="190" height="130" rx="16" fill="${C.putih}" stroke="${C.garis}" stroke-width="2"/>
    <path d="M -95,30 L 0,-25 L 95,30 Z" fill="${C.peach}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="25" text-anchor="middle" font-family="Baloo 2, cursive" font-size="15" font-weight="bold" fill="${C.tinta}">Kandang Kiri</text>
    <!-- 9 telur (3 baris x 3) -->
    <g transform="translate(-40, 50)">
      <ellipse cx="10" cy="10" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="10" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="70" cy="10" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="10" cy="40" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="40" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="70" cy="40" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="25" cy="70" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="55" cy="70" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="70" rx="10" ry="14" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
    </g>
    <rect x="-60" y="145" width="120" height="28" rx="10" fill="${C.mint}" stroke="${C.tinta}" stroke-width="1.5"/>
    <text x="0" y="164" text-anchor="middle" font-family="Lexend, sans-serif" font-size="13" font-weight="bold" fill="${C.tinta}">9 Butir Telur</text>
  </g>

  <!-- Kandang Kanan (12 Telur) -->
  <g transform="translate(370, 40)">
    <rect x="-95" y="0" width="190" height="130" rx="16" fill="${C.putih}" stroke="${C.mintTua}" stroke-width="2.5"/>
    <path d="M -95,30 L 0,-25 L 95,30 Z" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="25" text-anchor="middle" font-family="Baloo 2, cursive" font-size="15" font-weight="bold" fill="${C.tinta}">Kandang Kanan</text>
    <!-- 12 telur (4 baris x 3) -->
    <g transform="translate(-50, 45)">
      <ellipse cx="15" cy="10" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="10" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="65" cy="10" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="90" cy="10" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>

      <ellipse cx="15" cy="40" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="40" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="65" cy="40" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="90" cy="40" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>

      <ellipse cx="15" cy="70" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="40" cy="70" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="65" cy="70" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
      <ellipse cx="90" cy="70" rx="9" ry="13" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
    </g>
    <rect x="-60" y="145" width="120" height="28" rx="10" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="1.5"/>
    <text x="0" y="164" text-anchor="middle" font-family="Lexend, sans-serif" font-size="13" font-weight="bold" fill="${C.tinta}">12 Butir Telur</text>
  </g>
</svg>`,

  // 4. K1-B5: Pola Gelang Manik-Manik
  'k1-b5-pola-gelang.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" width="100%" height="100%">
  <rect width="540" height="180" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="270" y="32" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Pola Gelang Manik-Manik Dina</text>
  
  <line x1="40" y1="95" x2="500" y2="95" stroke="${C.garis}" stroke-width="4" stroke-dasharray="6,4"/>
  
  <!-- Manik 1: Merah -->
  <circle cx="70" cy="95" r="22" fill="#FF5252" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="70" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Merah</text>

  <!-- Manik 2: Kuning -->
  <circle cx="130" cy="95" r="22" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="130" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Kuning</text>

  <!-- Manik 3: Kuning -->
  <circle cx="190" cy="95" r="22" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="190" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Kuning</text>

  <!-- Manik 4: Merah -->
  <circle cx="250" cy="95" r="22" fill="#FF5252" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="250" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Merah</text>

  <!-- Manik 5: Kuning -->
  <circle cx="310" cy="95" r="22" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="310" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Kuning</text>

  <!-- Manik 6: Kuning -->
  <circle cx="370" cy="95" r="22" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2.5"/>
  <text x="370" y="145" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.tinta}">Kuning</text>

  <!-- Titik-titik & Tanda Tanya -->
  <circle cx="450" cy="95" r="26" fill="${C.putih}" stroke="${C.mintTua}" stroke-width="3" stroke-dasharray="4,4"/>
  <text x="450" y="103" text-anchor="middle" font-family="Baloo 2, cursive" font-size="26" font-weight="bold" fill="${C.mintTua}">?</text>
  <text x="450" y="145" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.mintTua}">Berikutnya</text>
</svg>`,

  // 5. K1-B8: Piktogram Buah
  'k1-b8-piktogram-buah.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="30" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Piktogram Buah Kesukaan (1 Lingkaran = 1 Anak)</text>
  
  <!-- Pisang -->
  <g transform="translate(40, 65)">
    <text x="0" y="14" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">🍌 Pisang</text>
    <circle cx="150" cy="10" r="12" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="185" cy="10" r="12" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="220" cy="10" r="12" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="255" cy="10" r="12" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="290" cy="10" r="12" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="420" y="15" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">5 anak</text>
  </g>

  <!-- Jeruk -->
  <g transform="translate(40, 110)">
    <text x="0" y="14" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">🍊 Jeruk</text>
    <circle cx="150" cy="10" r="12" fill="#FFA726" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="185" cy="10" r="12" fill="#FFA726" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="220" cy="10" r="12" fill="#FFA726" stroke="${C.tinta}" stroke-width="2"/>
    <text x="420" y="15" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">3 anak</text>
  </g>

  <!-- Mangga -->
  <g transform="translate(40, 155)">
    <text x="0" y="14" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">🥭 Mangga</text>
    <circle cx="150" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="185" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="220" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="255" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="290" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="325" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="360" cy="10" r="12" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <text x="420" y="15" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.mintTua}">7 anak</text>
  </g>

  <!-- Semangka -->
  <g transform="translate(40, 200)">
    <text x="0" y="14" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">🍉 Semangka</text>
    <circle cx="150" cy="10" r="12" fill="#EF5350" stroke="${C.tinta}" stroke-width="2"/>
    <circle cx="185" cy="10" r="12" fill="#EF5350" stroke="${C.tinta}" stroke-width="2"/>
    <text x="420" y="15" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">2 anak</text>
  </g>
</svg>`,

  // 6. K2-B2: Pecahan Kue (1/2 vs tidak sama vs 1/4)
  'k2-b2-pecahan-kue.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
  <rect width="500" height="220" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="28" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Pilihan Potongan Kue Bolu</text>
  
  <!-- Opsi A: Dibagi 2 sama besar, 1 diwarnai (Setengah 1/2) -->
  <g transform="translate(85, 105)">
    <circle cx="0" cy="0" r="45" fill="${C.putih}" stroke="${C.tinta}" stroke-width="3"/>
    <path d="M 0,-45 A 45 45 0 0 1 0,45 Z" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="0" y1="-45" x2="0" y2="45" stroke="${C.tinta}" stroke-width="3"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">(A) 2 sama besar (1/2)</text>
  </g>

  <!-- Opsi B: Dibagi 2 TIDAK sama besar -->
  <g transform="translate(250, 105)">
    <circle cx="0" cy="0" r="45" fill="${C.putih}" stroke="${C.tinta}" stroke-width="3"/>
    <path d="M 18,-41 A 45 45 0 0 1 18,41 Z" fill="${C.peach}" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="18" y1="-41" x2="18" y2="41" stroke="${C.tinta}" stroke-width="3"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">(B) 2 tidak sama</text>
  </g>

  <!-- Opsi C: Dibagi 4, 1 diwarnai (1/4) -->
  <g transform="translate(415, 105)">
    <circle cx="0" cy="0" r="45" fill="${C.putih}" stroke="${C.tinta}" stroke-width="3"/>
    <path d="M 0,-45 A 45 45 0 0 1 45,0 L 0,0 Z" fill="${C.langit}" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="0" y1="-45" x2="0" y2="45" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="-45" y1="0" x2="45" y2="0" stroke="${C.tinta}" stroke-width="2"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">(C) Dibagi 4 (1/4)</text>
  </g>
</svg>`,

  // 7. K2-B4: Lompat Katak Pematang Sawah
  'k2-b4-lompat-katak.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180" width="100%" height="100%">
  <rect width="520" height="180" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="260" y="30" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Lompatan Katak Hijau (Lompat 2)</text>
  
  <!-- Busur Lompatan -->
  <path d="M 60,110 Q 110,40 160,110" fill="none" stroke="${C.mintTua}" stroke-width="3" stroke-dasharray="6,4"/>
  <path d="M 160,110 Q 210,40 260,110" fill="none" stroke="${C.mintTua}" stroke-width="3" stroke-dasharray="6,4"/>
  <path d="M 260,110 Q 310,40 360,110" fill="none" stroke="${C.mintTua}" stroke-width="3" stroke-dasharray="6,4"/>
  <path d="M 360,110 Q 410,40 460,110" fill="none" stroke="${C.mintTua}" stroke-width="3" stroke-dasharray="6,4"/>

  <!-- Batu 0 -->
  <g transform="translate(60, 120)">
    <ellipse cx="0" cy="0" rx="28" ry="18" fill="#B0BEC5" stroke="${C.tinta}" stroke-width="2.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="Baloo 2" font-size="18" font-weight="bold" fill="${C.tinta}">0</text>
  </g>

  <!-- Batu 2 -->
  <g transform="translate(160, 120)">
    <ellipse cx="0" cy="0" rx="28" ry="18" fill="#B0BEC5" stroke="${C.tinta}" stroke-width="2.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="Baloo 2" font-size="18" font-weight="bold" fill="${C.tinta}">2</text>
  </g>

  <!-- Batu 4 -->
  <g transform="translate(260, 120)">
    <ellipse cx="0" cy="0" rx="28" ry="18" fill="#B0BEC5" stroke="${C.tinta}" stroke-width="2.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="Baloo 2" font-size="18" font-weight="bold" fill="${C.tinta}">4</text>
  </g>

  <!-- Batu 6 -->
  <g transform="translate(360, 120)">
    <ellipse cx="0" cy="0" rx="28" ry="18" fill="#B0BEC5" stroke="${C.tinta}" stroke-width="2.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="Baloo 2" font-size="18" font-weight="bold" fill="${C.tinta}">6</text>
  </g>

  <!-- Batu Selanjutnya (?) -->
  <g transform="translate(460, 120)">
    <ellipse cx="0" cy="0" rx="30" ry="20" fill="${C.kuning}" stroke="${C.mintTua}" stroke-width="3"/>
    <text x="0" y="8" text-anchor="middle" font-family="Baloo 2" font-size="22" font-weight="bold" fill="${C.mintTua}">?</text>
  </g>
</svg>`,

  // 8. K2-B7: Jam Dinding 07.00
  'k2-b7-jam-dinding.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="30" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Manakah Jam yang Menunjukkan Pukul 07.00?</text>

  <!-- Opsi A: Jarum Pendek di 7, Jarum Panjang di 12 (07.00) -->
  <g transform="translate(90, 120)">
    <circle cx="0" cy="0" r="48" fill="${C.putih}" stroke="${C.mintTua}" stroke-width="3"/>
    <!-- Angka-angka -->
    <text x="0" y="-34" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">12</text>
    <text x="36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">3</text>
    <text x="0" y="42" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">6</text>
    <text x="-36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">9</text>
    <!-- Jarum -->
    <line x1="0" y1="0" x2="0" y2="-32" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="-18" y2="20" stroke="${C.mintTua}" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="4" fill="${C.mintTua}"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">(A) Pendek 7, Panjang 12</text>
  </g>

  <!-- Opsi B: Pendek 12, Panjang 7 -->
  <g transform="translate(250, 120)">
    <circle cx="0" cy="0" r="48" fill="${C.putih}" stroke="${C.garis}" stroke-width="2"/>
    <text x="0" y="-34" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">12</text>
    <text x="36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">3</text>
    <text x="0" y="42" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">6</text>
    <text x="-36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">9</text>
    <line x1="0" y1="0" x2="0" y2="-20" stroke="${C.tinta}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="-18" y2="30" stroke="${C.garis}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="4" fill="${C.tinta}"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">(B) Pendek 12, Panjang 7</text>
  </g>

  <!-- Opsi C: Pendek 7, Panjang 6 (07.30) -->
  <g transform="translate(410, 120)">
    <circle cx="0" cy="0" r="48" fill="${C.putih}" stroke="${C.garis}" stroke-width="2"/>
    <text x="0" y="-34" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">12</text>
    <text x="36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">3</text>
    <text x="0" y="42" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">6</text>
    <text x="-36" y="4" text-anchor="middle" font-family="Lexend" font-size="10" font-weight="bold" fill="${C.tinta}">9</text>
    <line x1="0" y1="0" x2="-20" y2="18" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="0" y2="32" stroke="${C.garis}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="4" fill="${C.tinta}"/>
    <text x="0" y="70" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">(C) Pendek 7, Panjang 6</text>
  </g>
</svg>`,

  // 9. K3-B5: Pecahan Roti (1/3 vs 1/6)
  'k3-b5-pecahan-roti.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
  <rect width="500" height="220" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="30" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Perbandingan Potongan Roti Bakar</text>

  <!-- Roti A: 1/3 bagian -->
  <g transform="translate(130, 110)">
    <rect x="-80" y="-35" width="160" height="70" rx="12" fill="${C.putih}" stroke="${C.garis}" stroke-width="2"/>
    <rect x="-80" y="-35" width="53" height="70" rx="10" fill="${C.mint}" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="-27" y1="-35" x2="-27" y2="35" stroke="${C.garis}" stroke-width="2"/>
    <line x1="26" y1="-35" x2="26" y2="35" stroke="${C.garis}" stroke-width="2"/>
    <text x="0" y="65" text-anchor="middle" font-family="Baloo 2" font-size="16" font-weight="bold" fill="${C.mintTua}">1/3 Roti (Lia)</text>
    <text x="0" y="85" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.abuTeks}">Potongan Lebih Besar</text>
  </g>

  <!-- Roti B: 1/6 bagian -->
  <g transform="translate(370, 110)">
    <rect x="-80" y="-35" width="160" height="70" rx="12" fill="${C.putih}" stroke="${C.garis}" stroke-width="2"/>
    <rect x="-80" y="-35" width="26" height="70" rx="8" fill="${C.peach}" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="-54" y1="-35" x2="-54" y2="35" stroke="${C.garis}" stroke-width="1.5"/>
    <line x1="-27" y1="-35" x2="-27" y2="35" stroke="${C.garis}" stroke-width="1.5"/>
    <line x1="0" y1="-35" x2="0" y2="35" stroke="${C.garis}" stroke-width="1.5"/>
    <line x1="27" y1="-35" x2="27" y2="35" stroke="${C.garis}" stroke-width="1.5"/>
    <line x1="54" y1="-35" x2="54" y2="35" stroke="${C.garis}" stroke-width="1.5"/>
    <text x="0" y="65" text-anchor="middle" font-family="Baloo 2" font-size="16" font-weight="bold" fill="${C.tinta}">1/6 Roti (Teman)</text>
    <text x="0" y="85" text-anchor="middle" font-family="Lexend" font-size="12" fill="${C.abuTeks}">Potongan Lebih Kecil</text>
  </g>
</svg>`,

  // 10. K4-B7: Jenis-Jenis Sudut
  'k4-b7-jenis-sudut.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" width="100%" height="100%">
  <rect width="520" height="220" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="260" y="30" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Mengenal 3 Jenis Sudut</text>

  <!-- Sudut Lancip (<90°) -->
  <g transform="translate(85, 140)">
    <line x1="0" y1="0" x2="65" y2="0" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="45" y2="-55" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 22,0 A 22 22 0 0 0 15,-18" fill="none" stroke="${C.peach}" stroke-width="3"/>
    <text x="32" y="30" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">(A) Sudut Lancip</text>
    <text x="32" y="48" text-anchor="middle" font-family="Lexend" font-size="11" fill="${C.abuTeks}">&lt; 90°</text>
  </g>

  <!-- Sudut Siku-Siku (90°) -->
  <g transform="translate(250, 140)">
    <line x1="0" y1="0" x2="65" y2="0" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="0" y2="-65" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Tanda Siku -->
    <rect x="0" y="-18" width="18" height="18" fill="none" stroke="${C.mintTua}" stroke-width="3"/>
    <text x="32" y="30" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.mintTua}">(B) Sudut Siku-Siku</text>
    <text x="32" y="48" text-anchor="middle" font-family="Lexend" font-size="11" fill="${C.abuTeks}">Tepat 90°</text>
  </g>

  <!-- Sudut Tumpul (>90°) -->
  <g transform="translate(420, 140)">
    <line x1="0" y1="0" x2="65" y2="0" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="-45" y2="-50" stroke="${C.tinta}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 24,0 A 24 24 0 0 0 -15,-18" fill="none" stroke="${C.langit}" stroke-width="3"/>
    <text x="10" y="30" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">(C) Sudut Tumpul</text>
    <text x="10" y="48" text-anchor="middle" font-family="Lexend" font-size="11" fill="${C.abuTeks}">Antara 90° - 180°</text>
  </g>
</svg>`,

  // 11. K5-B3: Taman Huruf L
  'k5-b3-taman-l.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="28" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Denah Taman Bermain Balai Desa (Bentuk L)</text>

  <g transform="translate(100, 50)">
    <!-- Bagian 2: Persegi 6m x 6m (atas kiri) -->
    <rect x="0" y="0" width="80" height="80" fill="${C.kuning}" stroke="${C.tinta}" stroke-width="3"/>
    <text x="40" y="45" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="bold" fill="${C.tinta}">Bagian II</text>
    <text x="40" y="62" text-anchor="middle" font-family="Lexend" font-size="11" fill="${C.abuTeks}">36 m²</text>
    <text x="40" y="-8" text-anchor="middle" font-family="Lexend" font-size="11" font-weight="bold" fill="${C.mintTua}">6 m</text>
    <text x="-12" y="45" text-anchor="middle" font-family="Lexend" font-size="11" font-weight="bold" fill="${C.mintTua}">6 m</text>

    <!-- Bagian 1: Persegi Panjang 12m x 8m (bawah) -->
    <rect x="0" y="80" width="240" height="90" fill="${C.mint}" stroke="${C.tinta}" stroke-width="3"/>
    <text x="120" y="125" text-anchor="middle" font-family="Lexend" font-size="14" font-weight="bold" fill="${C.tinta}">Bagian I: 12 m × 8 m (96 m²)</text>
    <text x="120" y="190" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.mintTua}">Panjang Bawah = 12 m</text>
    <text x="255" y="130" text-anchor="middle" font-family="Lexend" font-size="11" font-weight="bold" fill="${C.mintTua}">8 m</text>
  </g>
</svg>`,

  // 12. K5-B6: Akuarium Balok
  'k5-b6-akuarium-balok.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="100%" height="100%">
  <rect width="500" height="240" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="28" text-anchor="middle" font-family="Baloo 2, cursive" font-size="16" font-weight="bold" fill="${C.tinta}">Akuarium Balok Kelas 5 (p=40, l=25, t=30 cm)</text>

  <g transform="translate(130, 60)">
    <!-- Balok 3D Akuarium -->
    <!-- Dinding Belakang -->
    <rect x="60" y="0" width="180" height="110" fill="#E1F5FE" stroke="${C.garis}" stroke-width="1.5" opacity="0.6"/>
    <!-- Sisi Air -->
    <rect x="0" y="20" width="180" height="90" fill="${C.langit}" opacity="0.45"/>
    <path d="M 0,20 L 60,0 L 240,0 L 180,20 Z" fill="${C.langit}" opacity="0.6"/>
    <!-- Rangka Balok Depan -->
    <rect x="0" y="20" width="180" height="90" fill="none" stroke="${C.tinta}" stroke-width="2.5"/>
    <!-- Garis Penghubung 3D -->
    <line x1="0" y1="20" x2="60" y2="0" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="180" y1="20" x2="240" y2="0" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="180" y1="110" x2="240" y2="90" stroke="${C.tinta}" stroke-width="2"/>
    <line x1="240" y1="0" x2="240" y2="90" stroke="${C.tinta}" stroke-width="2"/>

    <!-- Dimensi -->
    <text x="90" y="130" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.mintTua}">Panjang = 40 cm</text>
    <text x="215" y="8" text-anchor="middle" font-family="Lexend" font-size="11" font-weight="bold" fill="${C.mintTua}">Lebar = 25 cm</text>
    <text x="-25" y="65" text-anchor="middle" font-family="Lexend" font-size="11" font-weight="bold" fill="${C.mintTua}">Tinggi = 30 cm</text>
  </g>
</svg>`,

  // 13. K6-B2: Peta Koordinat Catur
  'k6-b2-peta-perkemahan.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" width="100%" height="100%">
  <rect width="500" height="250" rx="20" fill="${C.krem}" stroke="${C.garis}" stroke-width="2" stroke-opacity="0.3"/>
  <text x="250" y="26" text-anchor="middle" font-family="Baloo 2, cursive" font-size="15" font-weight="bold" fill="${C.tinta}">Peta Koordinat Berpetak Harta Karun</text>

  <g transform="translate(130, 45)">
    <!-- Label Kolom A - F -->
    <text x="15" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">A</text>
    <text x="45" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">B</text>
    <text x="75" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">C</text>
    <text x="105" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">D</text>
    <text x="135" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">E</text>
    <text x="165" y="-8" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">F</text>

    <!-- Grid 6x6 (30x30 tiap petak) -->
    <g stroke="${C.garis}" stroke-width="1.5" fill="${C.putih}">
      <!-- Baris 1-6 -->
      <rect x="0" y="0" width="180" height="180"/>
      <!-- Garis vertikal -->
      <line x1="30" y1="0" x2="30" y2="180"/>
      <line x1="60" y1="0" x2="60" y2="180"/>
      <line x1="90" y1="0" x2="90" y2="180"/>
      <line x1="120" y1="0" x2="120" y2="180"/>
      <line x1="150" y1="0" x2="150" y2="180"/>
      <!-- Garis horizontal -->
      <line x1="0" y1="30" x2="180" y2="30"/>
      <line x1="0" y1="60" x2="180" y2="60"/>
      <line x1="0" y1="90" x2="180" y2="90"/>
      <line x1="0" y1="120" x2="180" y2="120"/>
      <line x1="0" y1="150" x2="180" y2="150"/>
    </g>

    <!-- Label Baris 1 - 6 -->
    <text x="-12" y="20" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">1</text>
    <text x="-12" y="50" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">2</text>
    <text x="-12" y="80" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">3</text>
    <text x="-12" y="110" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">4</text>
    <text x="-12" y="140" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">5</text>
    <text x="-12" y="170" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="bold" fill="${C.tinta}">6</text>

    <!-- Marker Tenda di B2 -->
    <rect x="30" y="30" width="30" height="30" fill="${C.peach}" opacity="0.7"/>
    <text x="45" y="51" text-anchor="middle" font-size="14">⛺</text>

    <!-- Marker Tiang Bendera di D4 (x=90, y=90) -->
    <rect x="90" y="90" width="30" height="30" fill="${C.kuning}" opacity="0.7"/>
    <text x="105" y="111" text-anchor="middle" font-size="14">🚩</text>

    <!-- Panah Langkah: 1 petak kanan (D4->E4) lalu 1 petak bawah (E4->E5) -->
    <path d="M 105,105 L 135,105 L 135,135" fill="none" stroke="${C.mintTua}" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Marker Harta Karun di E5 (x=120, y=120) -->
    <rect x="120" y="120" width="30" height="30" fill="${C.mint}" stroke="${C.mintTua}" stroke-width="2"/>
    <text x="135" y="142" text-anchor="middle" font-size="14">💎</text>
  </g>
</svg>`
};

for (const [filename, svgContent] of Object.entries(svgs)) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, svgContent.trim(), 'utf8');
}

console.log(`Generated ${Object.keys(svgs).length} SVG quiz illustrations in ${outDir}`);
