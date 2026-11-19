import json, re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const allStructuredMateri = (\[[\s\S]*?\]);\s*$', text)
data = json.loads(m.group(1))

for item in data:
    mid = item['id']
    lvl = item['level']
    title = item['title']
    bacaan = item.get('bacaan', '').strip().replace('\n', ' ')
    first_sentence = bacaan.split('.')[0] if '.' in bacaan else bacaan[:60]
    print(f"[{mid}] {lvl} · {title}")
    print(f"   Story: {first_sentence}.")
