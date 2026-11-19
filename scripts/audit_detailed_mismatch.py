import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const allStructuredMateri = (\[[\s\S]*?\]);\s*$', text)
data = json.loads(m.group(1))

for item in data:
    mid = item['id']
    title = item['title']
    lvl = item['level']
    img = item.get('image')
    bacaan = item.get('bacaan', '')[:100].replace('\n', ' ')
    print(f"[{lvl}] {title} -> {img}")
    print(f"   Bacaan: {bacaan}")
    for q_idx, q in enumerate(item['quiz']['questions']):
        q_text = q.get('questionText')
        q_type = q.get('type')
        q_img = q.get('image')
        q_opts = q.get('imageOptions')
        info = q.get('info')
        print(f"   Q{q_idx+1} ({q_type}): {q_text}")
        if info:
            print(f"      Info: {info}")
        if q_img:
            print(f"      Img: {q_img}")
        if q_opts:
            print(f"      ImageOptions: {[o.get('label') for o in q_opts]}")
    print()
