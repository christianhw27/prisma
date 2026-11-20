const path = require('path');
const fs = require('fs');

const materiFile = path.join(__dirname, '..', 'src', 'lib', 'allMateriData.js');
const fileContent = fs.readFileSync(materiFile, 'utf8');

const jsonMatch = fileContent.match(/export const allStructuredMateri = (\[[\s\S]+\]);/);
if (!jsonMatch) {
  console.error('Failed to parse allMateriData.js');
  process.exit(1);
}
const materiList = JSON.parse(jsonMatch[1]);
console.log('Total materi:', materiList.length);

const byLevel = {};
materiList.forEach((item, idx) => {
  const lvl = item.level;
  if (!byLevel[lvl]) byLevel[lvl] = [];
  byLevel[lvl].push({ globalIndex: idx, id: item.id, title: item.title, audioUrl: item.audioUrl || item.materiContent?.audioUrl });
});

for (const [lvl, items] of Object.entries(byLevel)) {
  console.log(`\n=== ${lvl} (${items.length} materi) ===`);
  items.forEach((it, i) => {
    console.log(`  Materi ${i + 1}: [${it.id}] ${it.title} (audio: ${it.audioUrl || 'none'})`);
  });
}
