import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'(export const allStructuredMateri = )(\[[\s\S]*?\]);\s*$'
match = re.search(pattern, content)
prefix = content[:match.start(2)]
data = json.loads(match.group(2))

quiz_image_mappings = {
    ("1", "8", 1): "/quiz/k1-b8-piktogram-buah.svg", # Kelas 1 Bab 8 Soal 2 (piktogram)
    ("2", "4", 0): "/quiz/k2-b4-lompat-katak.svg",    # Kelas 2 Bab 4 Soal 1 (lompat katak)
    ("5", "3", 0): "/quiz/k5-b3-taman-l.svg",         # Kelas 5 Bab 3 Soal 1 (taman bentuk L)
    ("5", "6", 0): "/quiz/k5-b6-akuarium-balok.svg",  # Kelas 5 Bab 6 Soal 1 (akuarium balok)
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
        if key in quiz_image_mappings:
            q['image'] = quiz_image_mappings[key]
            linked += 1

print(f"Linked {linked} question images.")

new_content = prefix + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'

with open('src/lib/allMateriData.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Saved to src/lib/allMateriData.js!")
