import json
import re

with open('src/lib/allMateriData.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

json_match = re.search(r'export const allStructuredMateri = (\[[\s\S]+\]);', js_content)
if not json_match:
    print("Cannot parse allMateriData.js")
    exit(1)

materi_list = json.loads(json_match.group(1))
print(f"Loaded {len(materi_list)} materi from allMateriData.js")

with open('parsed_exact_quizzes.json', 'r', encoding='utf-8') as f:
    quizzes = json.load(f)

# Group quizzes by "kelas-materi"
quiz_by_km = {}
for q in quizzes:
    km = f"{q['kelas']}-{q['materi_num']}"
    if km not in quiz_by_km:
        quiz_by_km[km] = []
    quiz_by_km[km].append(q)

updated_count = 0
for m in materi_list:
    k_match = re.search(r'Kelas (\d)', m.get('level', ''), re.IGNORECASE)
    b_match = re.search(r'Bab (\d)', m.get('title', ''), re.IGNORECASE)

    if k_match and b_match:
        k = int(k_match.group(1))
        b = int(b_match.group(1))
        km = f"{k}-{b}"

        if km in quiz_by_km:
            q_raw_list = quiz_by_km[km]
            q_list = []
            for item in q_raw_list:
                q_obj = {
                    'id': f"q-{m['id']}-{item['num']}",
                    'num': item['num'],
                    'questionText': item['questionText'],
                    'instructionBadge': item['instructionBadge'],
                    'type': item['type'],
                    'info': item['info'] or '',
                    'points': 50,
                    'options': item['options'] or [],
                    'correctOptionIndex': item['correctOptionIndex'],
                    'imageOptions': item['imageOptions'],
                    'pairs': item['pairs'],
                    'leftItems': item['leftItems'],
                    'rightItems': item['rightItems'],
                    'orderItems': item['orderItems'],
                    'correctOrder': item['correctOrder'],
                    'expectedAnswers': item['expectedAnswers'],
                    'multiCorrectIndices': item['multiCorrectIndices'],
                    'targetCell': item['targetCell'],
                    'initialCell': item['initialCell'],
                    'explanation': item['explanation']
                }
                q_list.append(q_obj)

            m['quiz'] = {
                'title': f"Kuis Interaktif: {m['title']}",
                'questions': q_list
            }
            m['assessment'] = m['quiz']
            updated_count += 1

print(f"Updated {updated_count} materi modules with docx quizzes.")

new_js = f"""// Database Komprehensif Seluruh Materi Resmi PRISMA (Kelas 1 - 6 SD, Bab 1 - 8 per Kelas)
// Total 48 Modul Materi Terstruktur dengan Kurikulum Lengkap & Kuis Resmi dari Bacaan_dan_Kuis_PRISMA_untuk_Web.docx
export const allStructuredMateri = {json.dumps(materi_list, indent=2, ensure_ascii=False)};
"""

with open('src/lib/allMateriData.js', 'w', encoding='utf-8') as f:
    f.write(new_js)

print("Saved back to src/lib/allMateriData.js successfully!")
