import zipfile
import xml.etree.ElementTree as ET
import os

docx_path = 'Bacaan_dan_Kuis_PRISMA_untuk_Web.docx'
out_path = 'parsed_docx_content.md'

with zipfile.ZipFile(docx_path, 'r') as z:
    xml_content = z.read('word/document.xml')

root = ET.fromstring(xml_content)

namespaces = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
}

body = root.find('w:body', namespaces)

output_lines = []

for elem in body:
    tag = elem.tag.split('}')[-1]
    if tag == 'p':
        # Paragraph
        texts = [node.text for node in elem.findall('.//w:t', namespaces) if node.text]
        p_text = "".join(texts).strip()
        if p_text:
            output_lines.append(p_text)
    elif tag == 'tbl':
        # Table
        output_lines.append('\n--- TABLE START ---')
        for row in elem.findall('.//w:tr', namespaces):
            row_cells = []
            for cell in row.findall('.//w:tc', namespaces):
                cell_texts = [node.text for node in cell.findall('.//w:t', namespaces) if node.text]
                row_cells.append(" ".join(cell_texts).strip())
            output_lines.append("| " + " | ".join(row_cells) + " |")
        output_lines.append('--- TABLE END ---\n')

with open(out_path, 'w', encoding='utf-8') as f:
    f.write("\n\n".join(output_lines))

print(f"Parsed {len(output_lines)} elements into {out_path}")
