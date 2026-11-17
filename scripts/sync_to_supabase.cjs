const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const url = 'https://keosswofwcuiehqkjjxr.supabase.co';
const key = 'sb_publishable_kOCzQKmVkm8aDHG7J4Za9g_OH48rjsN';
const supabase = createClient(url, key);

async function syncAll() {
  const materiFile = path.join(__dirname, '..', 'src', 'lib', 'allMateriData.js');
  const fileContent = fs.readFileSync(materiFile, 'utf8');
  
  // Extract JSON from file
  const jsonMatch = fileContent.match(/export const allStructuredMateri = (\[[\s\S]+\]);/);
  if (!jsonMatch) {
    console.error('Failed to parse allMateriData.js');
    return;
  }
  const materiList = JSON.parse(jsonMatch[1]);
  console.log(`Loaded ${materiList.length} materi items to sync.`);

  // Transform each item to Supabase table row format
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

  console.log('Upserting rows in batches of 10 to Supabase...');
  for (let i = 0; i < rows.length; i += 10) {
    const batch = rows.slice(i, i + 10);
    const { data, error } = await supabase.from('materi').upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error(`Batch ${i / 10 + 1} error:`, error.message);
    } else {
      console.log(`Batch ${i / 10 + 1} (${batch.length} items) upserted successfully.`);
    }
  }

  // Check final count
  const { data: allData, error: countErr } = await supabase.from('materi').select('id, title, level');
  if (countErr) {
    console.error('Count error:', countErr.message);
  } else {
    console.log(`\n🎉 Total rows now in Supabase 'materi' table: ${allData.length}`);
  }
}

syncAll();
