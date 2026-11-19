import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(export const allStructuredMateri = )(\[[\s\S]*?\]);\s*$'
match = re.search(pattern, content)
prefix = content[:match.start(2)]
data = json.loads(match.group(2))

mappings = {
    ("1", "3", 0): "/quiz/k1-b3-kamar-bentuk.svg",
    ("1", "8", 0): "/quiz/k1-b8-piktogram-buah.svg",
    ("1", "8", 1): "/quiz/k1-b8-piktogram-buah.svg",
    ("2", "4", 0): "/quiz/k2-b4-lompat-katak.svg",
    ("3", "8", 1): "/quiz/k3-b8-piktogram-kebersihan.svg",
    ("4", "3", 0): "/quiz/k4-b3-petak-kangkung.svg",
    ("5", "3", 0): "/quiz/k5-b3-taman-l.svg",
    ("5", "5", 0): "/quiz/k5-b5-jam-3.svg",
    ("5", "6", 0): "/quiz/k5-b6-akuarium-balok.svg",
    ("6", "8", 0): "/quiz/k6-b8-peta-desa.svg",
}

linked = 0
for item in data:
    level = item.get('level', '')
    k_match = re.search(r'Kelas\s*(\d)', level)
    title = item.get('title', '')
    b_match = re.search(r'Bab\s*(\d)', title)
    if not (k_match and b_match):
        continue
    k = k_match.group(1)
    b = b_match.group(1)
    
    quiz = item.get('quiz', {})
    for q_idx, q in enumerate(quiz.get('questions', [])):
        key = (k, b, q_idx)
        if key in mappings:
            q['image'] = mappings[key]
            linked += 1

print(f"Linked {linked} question images.")

new_content = prefix + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'

with open('src/lib/allMateriData.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Saved to src/lib/allMateriData.js!")
