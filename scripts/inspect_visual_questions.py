import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const allStructuredMateri = (\[[\s\S]*?\]);\s*$', text)
data = json.loads(m.group(1))

keywords = ['piktogram', 'diagram', 'tabel', 'grafik', 'skala', 'peta', 'bentuk', 'sudut', 'jam', 'petak', 'kue', 'roti']

for item in data:
    for q_idx, q in enumerate(item['quiz']['questions']):
        t = (q['questionText'] + ' ' + (q.get('info') or '')).lower()
        if any(w in t for w in keywords):
            print(f"[{item['level']} · {item['title']}] Q{q_idx+1} ({q['type']}):")
            print(f"   Q: {q['questionText']}")
            if q.get('info'):
                print(f"   Info: {q['info']}")
            print(f"   Image: {q.get('image')}\n")
