const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'Materi PRISMA Kelas 1-6 (Terstruktur).md');
const content = fs.readFileSync(mdPath, 'utf8');

function cleanMarkdown(t) {
  if (!t) return '';
  return t
    .replace(/\\([+=!*<>_~`#\-\[\]\(\)])/g, (match, char) => char)
    .replace(/\r\n/g, '\n')
    .trim();
}

function cleanFormatting(t) {
  if (!t) return '';
  return cleanMarkdown(t)
    .replace(/\*\*/g, '')
    .replace(/^#+\s*/, '')
    .trim();
}

// Split into chapters
const rawSections = content.split(/(?=# \*\*Bab )/g).slice(1);

const IMAGES = [
  '/Banner_Materi.jpg',
  '/es_batu_card.jpg',
  '/Banner_Dashboard.jpg',
  '/Banner_Dashboard2.jpg'
];

// Curated educational video links for SD learning
const TOPIC_VIDEOS = {
  penjumlahan: {
    video1: { title: 'Video 1: Konsep Penjumlahan Benda Konkret', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Lagu & Cerita Belajar Berhitung', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  pengurangan: {
    video1: { title: 'Video 1: Memahami Pengurangan & Hitung Mundur', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Simulasi Berbagi Benda Ceria', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  bangun_datar: {
    video1: { title: 'Video 1: Mengenal Segitiga, Segi Empat, dan Lingkaran', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Berkreasi Menyusun Pola dan Bentuk', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  pengukuran: {
    video1: { title: 'Video 1: Mengukur Panjang, Berat & Waktu', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Eksperimen Menimbang dan Membandingkan', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  pecahan: {
    video1: { title: 'Video 1: Memahami Konsep Pecahan Sederhana', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Praktik Memotong Kue & Berbagi Rata', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  perkalian: {
    video1: { title: 'Video 1: Perkalian sebagai Penjumlahan Berulang', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Trik Seru Menghitung Perkalian Cepat', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  },
  data_diagram: {
    video1: { title: 'Video 1: Membaca Piktogram dan Diagram Batang', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Menghitung Frekuensi dan Menyajikan Data', url: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4' }
  },
  rasio_sudut: {
    video1: { title: 'Video 1: Memahami Perbandingan, Rasio & Skala', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    video2: { title: 'Video 2: Pengukuran Sudut & Bangun Ruang', url: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' }
  }
};

function getVideoPair(kelasNum, babNum, title) {
  const t = title.toLowerCase();
  if (t.includes('pecahan') || t.includes('roti') || t.includes('kue bolu') || t.includes('martabak') || t.includes('persen') || t.includes('desimal')) {
    return TOPIC_VIDEOS.pecahan;
  }
  if (t.includes('perkalian') || t.includes('pembagian') || t.includes('syukuran') || t.includes('telur')) {
    return TOPIC_VIDEOS.perkalian;
  }
  if (t.includes('bangun') || t.includes('segitiga') || t.includes('persegi') || t.includes('tangram') || t.includes('kamar') || t.includes('lingkaran') || t.includes('sumur')) {
    return TOPIC_VIDEOS.bangun_datar;
  }
  if (t.includes('ukur') || t.includes('panjang') || t.includes('berat') || t.includes('timbangan') || t.includes('jam') || t.includes('waktu') || t.includes('keliling') || t.includes('luas') || t.includes('volume')) {
    return TOPIC_VIDEOS.pengukuran;
  }
  if (t.includes('data') || t.includes('diagram') || t.includes('piktogram') || t.includes('survei') || t.includes('kebersihan') || t.includes('buah kesukaan') || t.includes('rata-rata')) {
    return TOPIC_VIDEOS.data_diagram;
  }
  if (t.includes('rasio') || t.includes('pupuk') || t.includes('peta') || t.includes('skala') || t.includes('sudut') || t.includes('peluang') || t.includes('doorprize')) {
    return TOPIC_VIDEOS.rasio_sudut;
  }
  if (t.includes('kurang') || t.includes('kue untuk bu tini')) {
    return TOPIC_VIDEOS.pengurangan;
  }
  return TOPIC_VIDEOS.penjumlahan;
}

const chapters = rawSections.map((sec, idx) => {
  const lines = sec.trim().split('\n');
  const babMatch = lines[0].match(/Bab (\d+):\s*(.+)/);
  const babNum = babMatch ? parseInt(babMatch[1]) : (idx % 8 + 1);
  const kelasNum = Math.floor(idx / 8) + 1;
  
  let title = '';
  let desc = '';
  let mapel = 'Matematika & Bahasa Indonesia (Literasi & Numerasi)';
  let kelas = 'Kelas ' + kelasNum;
  
  const titleMatch = sec.match(/Judul Materi:\*{0,2}\s*([^\n]+)/i);
  if (titleMatch) title = cleanFormatting(titleMatch[1]);
  else if (babMatch) title = cleanFormatting(babMatch[2]);
  
  const descMatch = sec.match(/Deskripsi Ringkas:\*{0,2}\s*([^\n]+)/i);
  if (descMatch) desc = cleanFormatting(descMatch[1]);
  
  const textIdx = sec.search(/Isi Teks Bacaan Materi:\*{0,2}/i);
  const pointsIdx = sec.search(/Poin-Poin Penting Belajar:\*{0,2}/i);
  
  let rawText = '';
  if (textIdx !== -1 && pointsIdx !== -1) {
    rawText = sec.substring(textIdx, pointsIdx)
                 .replace(/.*Isi Teks Bacaan Materi:\*{0,2}/i, '')
                 .trim();
  }
  
  let rawPoints = '';
  if (pointsIdx !== -1) {
    rawPoints = sec.substring(pointsIdx)
                   .replace(/.*Poin-Poin Penting Belajar:\*{0,2}/i, '')
                   .trim();
  }
  
  // Format text into clear paragraphs
  const cleanBody = cleanMarkdown(rawText)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // Parse points into { id, title, desc }
  const rawPointBullets = rawPoints.split(/\n\s*\*\s+/).map(p => cleanFormatting(p)).filter(p => p.length > 0);
  
  const points = rawPointBullets.map((p, pIdx) => {
    let pointTitle = `Poin ${pIdx + 1}`;
    let pointDesc = p;
    
    // Check if point has "Konsep: penjelasan" format
    const colonMatch = p.match(/^([A-Za-z0-9\s—–\/\(\)]+?)(?::|\s*=\s*|\s*adalah\s+)(.+)$/i);
    if (colonMatch && colonMatch[1].length < 35) {
      pointTitle = colonMatch[1].trim();
      pointDesc = colonMatch[2].trim();
    } else {
      const words = p.split(' ');
      if (words.length > 4) {
        pointTitle = words.slice(0, 3).join(' ');
        pointDesc = p;
      }
    }
    
    return {
      id: `lp-k${kelasNum}b${babNum}-${pIdx + 1}`,
      title: pointTitle,
      desc: pointDesc
    };
  });
  
  const fase = kelasNum <= 2 ? 'Fase A' : (kelasNum <= 4 ? 'Fase B' : 'Fase C');
  const levelStr = `${kelas} • ${fase}`;
  const imgCover = IMAGES[idx % IMAGES.length];
  const videoPair = getVideoPair(kelasNum, babNum, title);

  return {
    id: `materi-k${kelasNum}-b${babNum}`,
    title,
    jenjang: 'SD',
    mataPelajaran: 'Matematika & Bahasa Indonesia',
    level: levelStr,
    badge: 'Gratis',
    image: imgCover,
    description: desc,
    duration: '± 5-7 menit',
    activityType: 'Materi + Video + Kuis',
    learningOptions: '3 Tab Interaktif',
    materiContent: {
      text: cleanBody,
      image: imgCover,
      audioUrl: '',
      points
    },
    videos: {
      video1: videoPair.video1,
      video2: videoPair.video2
    },
    rawPointsText: rawPointBullets
  };
});

console.log('Processed', chapters.length, 'chapters successfully.');
fs.writeFileSync(path.join(__dirname, 'temp_parsed_chapters.json'), JSON.stringify(chapters, null, 2));
