const fs = require('fs');
const path = require('path');

const CLOUD_NAME = 'vnq5qcdw';
const UPLOAD_PRESET = 'Prisma';

// 48 files mapping
// 'kelas 1 materi 1.m4a' -> { kelas: 1, materi: 1, id: 'materi-k1-b1' }
const RECORD_DIR = path.join(__dirname, '..', 'public', 'record');
const MAPPING_FILE = path.join(__dirname, 'audio_mapping.json');

async function uploadSingle(filePath, publicId) {
  const buffer = fs.readFileSync(filePath);
  const base64 = 'data:audio/m4a;base64,' + buffer.toString('base64');
  
  const form = new FormData();
  form.append('file', base64);
  form.append('upload_preset', UPLOAD_PRESET);
  form.append('resource_type', 'video');
  form.append('public_id', publicId);
  
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
    method: 'POST',
    body: form
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed for ${publicId} (status ${res.status}): ${errText}`);
  }
  
  const data = await res.json();
  return data.secure_url;
}

async function run() {
  console.log('Starting upload of 48 audio files to Cloudinary...');
  
  let mapping = {};
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
      console.log(`Found existing mapping with ${Object.keys(mapping).length} entries.`);
    } catch {}
  }

  const tasks = [];
  for (let k = 1; k <= 6; k++) {
    for (let m = 1; m <= 8; m++) {
      const fileName = `kelas ${k} materi ${m}.m4a`;
      const materiId = `materi-k${k}-b${m}`;
      const publicId = `prisma_audio_k${k}_b${m}`;
      const filePath = path.join(RECORD_DIR, fileName);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }
      
      tasks.push({ k, m, fileName, materiId, publicId, filePath });
    }
  }

  console.log(`Prepared ${tasks.length} audio files to verify/upload.`);
  
  // Concurrency limit: 4 parallel uploads
  const CONCURRENCY = 4;
  let successCount = 0;

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const chunk = tasks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (task) => {
      if (mapping[task.materiId] && mapping[task.materiId].startsWith('https://res.cloudinary.com')) {
        console.log(`[ALREADY UPLOADED] ${task.materiId} -> ${mapping[task.materiId]}`);
        successCount++;
        return;
      }
      
      try {
        console.log(`[UPLOADING] ${task.fileName} (${task.materiId})...`);
        const url = await uploadSingle(task.filePath, task.publicId);
        mapping[task.materiId] = url;
        console.log(`[SUCCESS] ${task.materiId} -> ${url}`);
        successCount++;
        // Save progress incrementally
        fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf8');
      } catch (err) {
        console.error(`[ERROR] ${task.fileName}:`, err.message);
      }
    }));
  }

  console.log(`\nFinished! Successfully processed ${successCount}/${tasks.length} audios.`);
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`Mapping saved to ${MAPPING_FILE}`);
}

run();
