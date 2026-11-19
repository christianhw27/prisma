import json
import re

with open('parsed_docx_bacaan.json', 'r', encoding='utf-8') as f:
    docx_bacaan = json.load(f)

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(export const allStructuredMateri = )(\[[\s\S]*?\]);\s*$'
match = re.search(pattern, content)
if not match:
    raise ValueError("Could not find allStructuredMateri array in file")

prefix = content[:match.start(2)]
json_str = match.group(2)

data = json.loads(json_str)

updated_count = 0
for item in data:
    level_str = item.get('level', '')
    k_match = re.search(r'Kelas\s*(\d)', level_str)
    title = item.get('title', '')
    b_match = re.search(r'Bab\s*(\d)', title)
    
    if not (k_match and b_match):
        continue
    
    k = int(k_match.group(1))
    b = int(b_match.group(1))
    key = f"{k}-{b}"
    
    if key in docx_bacaan:
        info = docx_bacaan[key]
        item['bacaan'] = info['bacaan']
        item['tujuan'] = info['tujuan']
        if 'materiContent' in item and isinstance(item['materiContent'], dict):
            item['materiContent']['text'] = info['bacaan']
        updated_count += 1

print(f"Updated bacaan for {updated_count} / {len(data)} materi.")

new_content = prefix + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'

with open('src/lib/allMateriData.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Saved to src/lib/allMateriData.js successfully!")
