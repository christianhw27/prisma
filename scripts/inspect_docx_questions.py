import re
import json

with open('parsed_docx_content.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

materi_blocks = []
current_materi = None

for line in lines:
    line = line.strip()
    if not line:
        continue
    m_match = re.match(r'Kelas (\d) · Materi (\d): (.+)', line)
    if m_match:
        if current_materi:
            materi_blocks.append(current_materi)
        current_materi = {
            'kelas': int(m_match.group(1)),
            'materi_num': int(m_match.group(2)),
            'title': m_match.group(3),
            'lines': []
        }
    elif current_materi:
        current_materi['lines'].append(line)

if current_materi:
    materi_blocks.append(current_materi)

print(f"Total materi parsed: {len(materi_blocks)}")

special_list = []
for m in materi_blocks:
    text = "\n".join(m['lines'])
    # find each Soal
    soal_matches = re.findall(r'(Soal \d+ · [^\n]+)\n(.*?)(?=(?:Soal \d+ · |$))', text, re.DOTALL)
    for sm in soal_matches:
        header = sm[0]
        body = sm[1].strip()
        q_type = header.split('·')[1].strip()
        if q_type in ['Isi angka', 'Pilih semua yang benar', 'Pilih petak di peta']:
            special_list.append({
                'kelas': m['kelas'],
                'materi_num': m['materi_num'],
                'header': header,
                'body': body
            })

for sp in special_list:
    print(f"[{sp['kelas']}-{sp['materi_num']}] {sp['header']}")
    print(sp['body'])
    print("-" * 50)
