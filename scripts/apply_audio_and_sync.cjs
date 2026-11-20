const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const mappingPath = path.join(__dirname, 'audio_mapping.json');
const allMateriPath = path.join(__dirname, '..', 'src', 'lib', 'allMateriData.js');
const materiServicePath = path.join(__dirname, '..', 'src', 'lib', 'materiService.js');

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
console.log(`Loaded ${Object.keys(mapping).length} audio mapping URLs.`);

// 1. Read and update allMateriData.js
let fileContent = fs.readFileSync(allMateriPath, 'utf8');
const jsonMatch = fileContent.match(/export const allStructuredMateri = (\[[\s\S]+\]);/);
if (!jsonMatch) {
  console.error('Failed to parse allMateriData.js');
  process.exit(1);
}

const materiList = JSON.parse(jsonMatch[1]);
console.log(`Updating ${materiList.length} items in allMateriData.js...`);

let updatedCount = 0;
for (const item of materiList) {
  const audioUrl = mapping[item.id];
  if (audioUrl) {
    item.audioUrl = audioUrl;
    if (item.materiContent) {
      item.materiContent.audioUrl = audioUrl;
    }
    updatedCount++;
  }
}

console.log(`Applied audioUrl to ${updatedCount}/${materiList.length} materi items.`);

// Re-write allMateriData.js
const newFileContent = `// Dataset Lengkap 48 Materi PRISMA (Kelas 1 - Kelas 6 SD)
// Digenerate dan disinkronkan otomatis dengan Kurikulum Merdeka & Audio Cloudinary CDN

export const allStructuredMateri = ${JSON.stringify(materiList, null, 2)};
`;

fs.writeFileSync(allMateriPath, newFileContent, 'utf8');
console.log(`Successfully saved updated allMateriData.js!`);

// 2. Bump STORAGE_KEY in materiService.js to v30
let serviceContent = fs.readFileSync(materiServicePath, 'utf8');
serviceContent = serviceContent.replace(/const STORAGE_KEY = 'prisma_materi_list_v\d+'/, "const STORAGE_KEY = 'prisma_materi_list_v30'");
fs.writeFileSync(materiServicePath, serviceContent, 'utf8');
console.log(`Bumped STORAGE_KEY to prisma_materi_list_v30 in materiService.js!`);

// 3. Sync to Supabase table 'materi'
async function syncToSupabase() {
  const url = 'https://keosswofwcuiehqkjjxr.supabase.co';
  const key = 'sb_publishable_kOCzQKmVkm8aDHG7J4Za9g_OH48rjsN';
  const supabase = createClient(url, key);

  console.log('Transforming items for Supabase...');
  const rows = materiList.map(item => ({
    id: item.id,
    title: item.title,
    jenjang: item.jenjang || 'SD',
    mata_pelajaran: item.mataPelajaran || 'Matematika & Bahasa Indonesia',
    level: item.level,
    badge: item.badge || 'Gratis',
    image: item.image,
    description: item.description,
    duration: item.duration || '± 5 menit',
    activity_type: item.activityType || 'Materi + Video + Kuis',
    learning_options: item.learningOptions || '3 Tab Interaktif',
    types: item.types || ['Teks & Gambar', '2 Video Edukasi', 'Kuis Bergambar'],
    learning_points: item.materiContent?.points || [],
    materi_content: item.materiContent,
    videos: item.videos,
    quiz: item.quiz,
    assessment: item.quiz,
    standard_content: {
      title: item.videos?.video1?.title || item.title,
      text: item.materiContent?.text || item.description,
      videoUrl: item.videos?.video1?.url || ''
    },
    slow_content: {
      title: item.videos?.video2?.title || `${item.title} (Video 2)`,
      text: item.materiContent?.text || item.description,
      videoUrl: item.videos?.video2?.url || ''
    },
    created_at: item.created_at || new Date().toISOString()
  }));

  console.log('Upserting 48 rows to Supabase in batches...');
  for (let i = 0; i < rows.length; i += 10) {
    const batch = rows.slice(i, i + 10);
    const { error } = await supabase.from('materi').upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error(`Batch ${i / 10 + 1} error:`, error.message);
    } else {
      console.log(`Batch ${i / 10 + 1} (${batch.length} items) upserted to Supabase.`);
    }
  }

  const { data: allData, error: countErr } = await supabase.from('materi').select('id, title, materi_content');
  if (countErr) {
    console.error('Count error:', countErr.message);
  } else {
    const withAudio = allData.filter(d => d.materi_content?.audioUrl).length;
    console.log(`\n🎉 Total rows in Supabase: ${allData.length}, with audioUrl: ${withAudio}`);
  }
}

syncToSupabase().then(() => {
  console.log('Done all sync steps!');
});
