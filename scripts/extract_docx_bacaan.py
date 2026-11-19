import zipfile
import xml.etree.ElementTree as ET
import re
import json

with zipfile.ZipFile('Bacaan_dan_Kuis_PRISMA_untuk_Web.docx', 'r') as z:
    xml_content = z.read('word/document.xml')

root = ET.fromstring(xml_content)
namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
body = root.find('w:body', namespaces)

elements = []
for elem in body:
    tag = elem.tag.split('}')[-1]
    if tag == 'p':
        texts = [node.text for node in elem.findall('.//w:t', namespaces) if node.text]
        pt = ''.join(texts).strip()
        if pt:
            elements.append(pt)
    elif tag == 'tbl':
        for tr in elem.findall('.//w:tr', namespaces):
            cells = []
            for tc in tr.findall('.//w:tc', namespaces):
                ct = ' '.join([node.text for node in tc.findall('.//w:t', namespaces) if node.text]).strip()
                cells.append(ct)
            elements.append(' | '.join(cells))

full_str = '\n\n'.join(elements)
chapters = re.split(r'\n+(?=Kelas \d · Materi \d: )', full_str)

results = {}
for ch in chapters:
    if not ch.strip().startswith('Kelas '):
        continue
    m = re.match(r'Kelas (\d) · Materi (\d): ([^\n]+)', ch)
    if not m:
        continue
    k = int(m.group(1))
    mat_num = int(m.group(2))
    key = f"{k}-{mat_num}"

    parts = re.split(r'\n+Kuis\n+', ch, maxsplit=1)
    before_kuis = parts[0]

    # Extract tujuan
    tujuan_match = re.search(r'(Tujuan [^\n]+)', before_kuis)
    tujuan = tujuan_match.group(1).strip() if tujuan_match else ''

    # Extract bacaan
    bacaan_match = re.search(r'Bacaan\n+(.+)', before_kuis, re.DOTALL)
    bacaan = bacaan_match.group(1).strip() if bacaan_match else ''

    results[key] = {
        'kelas': k,
        'materi_num': mat_num,
        'title': m.group(3).strip(),
        'tujuan': tujuan,
        'bacaan': bacaan
    }

print(f"Extracted {len(results)} reading chapters.")

with open('parsed_docx_bacaan.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

for k in ['1-1', '1-2', '2-1', '3-1', '4-1', '5-1', '6-1', '6-8']:
    r = results.get(k)
    if r:
        print(f"\n[{k}] {r['title']}:")
        print(f"  Tujuan: {r['tujuan'][:90]}...")
        print(f"  Bacaan: {r['bacaan'][:140]}...")
