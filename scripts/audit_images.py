import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'(export const allStructuredMateri = )(\[[\s\S]*?\]);\s*$'
match = re.search(pattern, text)
data = json.loads(match.group(2))

print(f"Total materi: {len(data)}")

# 1. Check materi cover images
cover_images = {}
for m in data:
    img = m.get('image', '')
    cover_images[img] = cover_images.get(img, 0) + 1

print("\n--- COVER IMAGES USAGE ---")
for img, count in cover_images.items():
    print(f"  {img}: {count} materi")

# 2. Check question images & imageOptions
question_images = []
image_options = []

for m in data:
    mid = m.get('id')
    title = m.get('title')
    lvl = m.get('level')
    quiz = m.get('quiz', {})
    for idx, q in enumerate(quiz.get('questions', [])):
        q_img = q.get('image')
        q_type = q.get('type')
        q_text = q.get('questionText')
        if q_img:
            question_images.append({
                'materi_id': mid,
                'level': lvl,
                'title': title,
                'q_idx': idx + 1,
                'type': q_type,
                'image': q_img,
                'text': q_text
            })
        opts = q.get('imageOptions') or []
        for o_idx, opt in enumerate(opts):
            if isinstance(opt, dict) and opt.get('image'):
                image_options.append({
                    'materi_id': mid,
                    'level': lvl,
                    'title': title,
                    'q_idx': idx + 1,
                    'opt_idx': o_idx,
                    'label': opt.get('label'),
                    'image': opt.get('image')
                })

print(f"\n--- QUESTION IMAGES ({len(question_images)} questions have image) ---")
for qi in question_images:
    print(f"[{qi['level']} · {qi['title']}] Q{qi['q_idx']}: {qi['image']} ({qi['text'][:40]}...)")

print(f"\n--- IMAGE OPTIONS ({len(image_options)} image options) ---")
for io in image_options:
    print(f"[{io['level']} · {io['title']}] Q{io['q_idx']} opt {io['label']}: {io['image']}")

# 3. Questions that mention "gambar" in docx or text
print("\n--- QUESTIONS IN DOCX THAT MENTION 'gambar' OR VISUAL CONTEXT ---")
visual_questions = []
for m in data:
    mid = m.get('id')
    title = m.get('title')
    lvl = m.get('level')
    quiz = m.get('quiz', {})
    for idx, q in enumerate(quiz.get('questions', [])):
        txt = (q.get('questionText', '') + ' ' + (q.get('info') or '') + ' ' + (q.get('instructionBadge') or '')).lower()
        has_kw = any(w in txt for w in ['gambar', 'piktogram', 'peta', 'diagram', 'dadu', 'timbangan', 'termometer', 'jaring-jaring', 'denah', 'tabel', 'sudut'])
        if has_kw:
            visual_questions.append({
                'level': lvl,
                'title': title,
                'q_idx': idx + 1,
                'type': q.get('type'),
                'text': q.get('questionText'),
                'info': q.get('info'),
                'image': q.get('image'),
                'has_image': bool(q.get('image'))
            })

for v in visual_questions:
    status = "ADA GAMBAR" if v['has_image'] else "BUTUH GAMBAR"
    print(f"[{status}] [{v['level']} · {v['title']}] Q{v['q_idx']} ({v['type']}):")
    print(f"   Teks: {v['text']}")
    if v['info']:
        print(f"   Info: {v['info']}")
    if v['image']:
        print(f"   File: {v['image']}")
