import re
import json

with open('parsed_docx_content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern for each chapter:
# Kelas X · Materi Y: Title
chapters = re.split(r'\n+(?=Kelas \d · Materi \d: )', text)
print(f"Total chapter chunks: {len(chapters)}")

parsed_chapters = []

for ch in chapters:
    if not ch.strip().startswith('Kelas '):
        continue
    header_match = re.match(r'Kelas (\d) · Materi (\d): ([^\n]+)', ch)
    if not header_match:
        continue
    kelas = int(header_match.group(1))
    materi_num = int(header_match.group(2))
    title = header_match.group(3).strip()

    # Split into Kuis section
    parts = re.split(r'\n+Kuis\n+', ch, maxsplit=1)
    bacaan_part = parts[0]
    kuis_part = parts[1] if len(parts) > 1 else ''

    # Extract reading text
    bacaan_match = re.search(r'Bacaan\n+(.+)', bacaan_part, re.DOTALL)
    bacaan_text = bacaan_match.group(1).strip() if bacaan_match else ''

    # Parse questions from kuis_part
    # Soal 1 · ... and Soal 2 · ...
    soal_chunks = re.split(r'\n+(?=Soal \d · )', kuis_part)
    questions = []

    for sc in soal_chunks:
        sc = sc.strip()
        if not sc.startswith('Soal '):
            continue
        first_line = sc.split('\n')[0]
        q_type_match = re.match(r'Soal (\d) · ([^\n]+)', first_line)
        q_num = int(q_type_match.group(1)) if q_type_match else len(questions) + 1
        raw_type = q_type_match.group(2).strip() if q_type_match else 'Pilihan ganda'
        body = sc[len(first_line):].strip()

        questions.append({
            'num': q_num,
            'raw_type': raw_type,
            'raw_body': body
        })

    parsed_chapters.append({
        'kelas': kelas,
        'materi_num': materi_num,
        'title': title,
        'bacaan': bacaan_text,
        'questions': questions
    })

print(f"Parsed {len(parsed_chapters)} chapters.")
with open('debug_parsed_chapters.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_chapters, f, indent=2, ensure_ascii=False)
print("Saved to debug_parsed_chapters.json")
