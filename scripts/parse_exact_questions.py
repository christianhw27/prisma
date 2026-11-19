import json
import re

with open('debug_parsed_chapters.json', 'r', encoding='utf-8') as f:
    chapters = json.load(f)

# Mapping of images for image_choice questions
IMAGE_CHOICE_MAP = {
    '1-1-2': [
        {'label': 'Tomat Segar', 'image': '/quiz/items/tomat.svg'},
        {'label': 'Wortel Oranye', 'image': '/quiz/items/wortel.svg'},
        {'label': 'Apel Manis', 'image': '/quiz/items/apel.svg'}
    ],
    '1-4-1': [
        {'label': 'Kandang Kiri (9 Telur)', 'image': '/quiz/items/kandang-9-telur.svg'},
        {'label': 'Kandang Kanan (12 Telur)', 'image': '/quiz/items/kandang-12-telur.svg'}
    ],
    '1-5-1': [
        {'label': 'Manik Merah', 'image': '/quiz/items/manik-merah.svg'},
        {'label': 'Manik Kuning', 'image': '/quiz/items/manik-kuning.svg'},
        {'label': 'Manik Hijau', 'image': '/quiz/items/manik-hijau.svg'}
    ],
    '1-8-1': [
        {'label': 'Pisang', 'image': '/quiz/items/pisang.svg'},
        {'label': 'Jeruk (Terbanyak)', 'image': '/quiz/items/jeruk.svg'},
        {'label': 'Mangga', 'image': '/quiz/items/mangga.svg'},
        {'label': 'Semangka', 'image': '/quiz/items/semangka.svg'}
    ],
    '2-2-1': [
        {'label': 'Pecahan 1/2 (Sama Besar)', 'image': '/quiz/items/kue-setengah.svg'},
        {'label': 'Kue Tidak Sama Besar', 'image': '/quiz/items/kue-tidak-sama.svg'},
        {'label': 'Kue Dibagi 4 (Pecahan 1/4)', 'image': '/quiz/items/kue-seperempat.svg'}
    ],
    '2-7-1': [
        {'label': 'Pukul 07.00', 'image': '/quiz/items/jam-0700.svg'},
        {'label': 'Pukul 12.35', 'image': '/quiz/items/jam-1235.svg'},
        {'label': 'Pukul 07.30', 'image': '/quiz/items/jam-0730.svg'}
    ],
    '3-5-1': [
        {'label': 'Potongan 1/3 (Lebih Besar)', 'image': '/quiz/items/roti-sepertiga.svg'},
        {'label': 'Potongan 1/6 (Lebih Kecil)', 'image': '/quiz/items/roti-seperenam.svg'}
    ],
    '4-7-2': [
        {'label': 'Sudut Lancip (< 90°)', 'image': '/quiz/items/sudut-lancip.svg'},
        {'label': 'Sudut Siku-Siku (90°)', 'image': '/quiz/items/sudut-sikusiku.svg'},
        {'label': 'Sudut Tumpul (> 90°)', 'image': '/quiz/items/sudut-tumpul.svg'}
    ]
}

parsed_all = []

for ch in chapters:
    k = ch['kelas']
    m = ch['materi_num']
    for q in ch['questions']:
        q_num = q['num']
        raw_type = q['raw_type']
        raw_body = q['raw_body'].strip()
        ref_id = f"{k}-{m}-{q_num}"

        # Extract Info if present
        info_text = ""
        info_match = re.search(r'Info:\s*(.+?)(?=Pertanyaan:|$)', raw_body, re.DOTALL)
        if info_match:
            info_text = info_match.group(1).strip()

        # Extract Pertanyaan
        q_text_match = re.search(r'Pertanyaan:\s*(.+?)(?=(?:Pilihan|Kolom kiri|Kartu|Tampilan|Jawaban benar:|$))', raw_body, re.DOTALL)
        question_text = q_text_match.group(1).strip() if q_text_match else ""

        # Extract Umpan Balik
        feedback_match = re.search(r'Umpan balik:\s*(.+)', raw_body, re.DOTALL)
        feedback = feedback_match.group(1).strip() if feedback_match else ""

        # Determine normalized type & data
        norm_type = 'multiple_choice'
        options = []
        correct_index = 0
        pairs = None
        left_items = None
        right_items = None
        order_items = None
        correct_order = None
        image_options = None
        expected_answers = None
        multi_correct_indices = None
        target_cell = None
        initial_cell = None
        badge = "Pilihan Ganda"

        if raw_type == 'Pilihan ganda':
            norm_type = 'multiple_choice'
            badge = "Pilihan Ganda"
            # Extract Pilihan
            pilihan_match = re.search(r'Pilihan:\s*(.+?)(?=Jawaban benar:|$)', raw_body, re.DOTALL)
            if pilihan_match:
                p_raw = pilihan_match.group(1).strip()
                # Split on ' · ' or letters
                # Format: A. 8 · B. 9 · C. 10
                parts = re.split(r'\s*·\s*', p_raw)
                options = [re.sub(r'^[A-Z]\.\s*', '', p).strip() for p in parts if p.strip()]
            
            # Extract Jawaban benar
            ans_match = re.search(r'Jawaban benar:\s*([A-Z])\.\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)
            if ans_match:
                letter = ans_match.group(1).strip()
                correct_index = ord(letter) - ord('A')
            else:
                # Sometimes just letter or text
                ans_raw_match = re.search(r'Jawaban benar:\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)
                if ans_raw_match:
                    ans_val = ans_raw_match.group(1).strip()
                    for idx, opt in enumerate(options):
                        if opt.lower() in ans_val.lower() or ans_val.lower() in opt.lower():
                            correct_index = idx
                            break

        elif raw_type == 'Pilih gambar':
            norm_type = 'image_choice'
            badge = "Pilih Gambar"
            # Use predefined IMAGE_CHOICE_MAP
            if ref_id in IMAGE_CHOICE_MAP:
                image_options = IMAGE_CHOICE_MAP[ref_id]
                options = [io['label'] for io in image_options]
            
            ans_match = re.search(r'Jawaban benar:\s*([A-Z])\.\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)
            if ans_match:
                letter = ans_match.group(1).strip()
                correct_index = ord(letter) - ord('A')

        elif raw_type == 'Benar atau salah':
            norm_type = 'true_false'
            badge = "Benar atau Salah"
            options = ['Benar', 'Salah']
            ans_match = re.search(r'Jawaban benar:\s*(Benar|Salah)', raw_body, re.IGNORECASE)
            if ans_match and ans_match.group(1).lower() == 'salah':
                correct_index = 1
            else:
                correct_index = 0

        elif raw_type == 'Pasangkan':
            norm_type = 'matching'
            badge = "Pasangkan"
            left_match = re.search(r'Kolom kiri:\s*(.+?)(?=Kolom kanan:|$)', raw_body, re.DOTALL)
            right_match = re.search(r'Kolom kanan:\s*(.+?)(?=Pasangan benar:|$)', raw_body, re.DOTALL)
            pairs_match = re.search(r'Pasangan benar:\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)

            if left_match:
                left_items = [p.strip() for p in left_match.group(1).split('·') if p.strip()]
            if right_match:
                right_items = [p.strip() for p in right_match.group(1).split('·') if p.strip()]
            if pairs_match:
                pair_strs = [p.strip() for p in pairs_match.group(1).split('·') if p.strip()]
                pairs = []
                for ps in pair_strs:
                    # format: jam → lingkaran
                    if '→' in ps:
                        l_part, r_part = ps.split('→', 1)
                        pairs.append({'left': l_part.strip(), 'right': r_part.strip()})
            options = [f"{p['left']} = {p['right']}" for p in (pairs or [])]

        elif raw_type == 'Urutkan':
            norm_type = 'ordering'
            badge = "Urutkan"
            kartu_match = re.search(r'Kartu\s*\([^)]*\):\s*(.+?)(?=Urutan benar:|$)', raw_body, re.DOTALL)
            urutan_match = re.search(r'Urutan benar:\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)

            if kartu_match:
                order_items = [k.strip() for k in kartu_match.group(1).split('·') if k.strip()]
            if urutan_match:
                correct_order = [u.strip() for u in urutan_match.group(1).split('→') if u.strip()]
            options = [" → ".join(correct_order or [])]

        elif raw_type == 'Isi angka':
            norm_type = 'fill_in_blank'
            badge = "Isi Angka"
            ans_match = re.search(r'Jawaban benar:\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)
            if ans_match:
                raw_ans = ans_match.group(1).strip()
                # If format: 4 dan 5
                if ' dan ' in raw_ans:
                    expected_answers = [a.strip() for a in raw_ans.split(' dan ')]
                else:
                    expected_answers = [raw_ans]
            options = expected_answers or []

        elif raw_type == 'Pilih semua yang benar':
            norm_type = 'multi_select'
            badge = "Pilih Semua yang Benar"
            pilihan_match = re.search(r'Pilihan:\s*(.+?)(?=Jawaban benar:|$)', raw_body, re.DOTALL)
            if pilihan_match:
                p_raw = pilihan_match.group(1).strip()
                parts = re.split(r'\s*·\s*', p_raw)
                options = [re.sub(r'^[A-Z]\.\s*', '', p).strip() for p in parts if p.strip()]
            
            ans_match = re.search(r'Jawaban benar:\s*(.+?)(?=Umpan balik:|$)', raw_body, re.DOTALL)
            if ans_match:
                raw_ans = ans_match.group(1).strip()
                # A. 4, C. 6, E. 8 -> extract letters A, C, E
                letters = re.findall(r'([A-E])\.', raw_ans)
                multi_correct_indices = [ord(l) - ord('A') for l in letters]

        elif raw_type == 'Pilih petak di peta':
            norm_type = 'grid_map'
            badge = "Pilih Petak di Peta"
            ans_match = re.search(r'Jawaban benar:\s*(?:petak\s*)?([A-F][1-6])', raw_body, re.IGNORECASE)
            if ans_match:
                target_cell = ans_match.group(1).upper()
            initial_cell = 'D4'
            options = [f"Petak {target_cell}"]

        parsed_all.append({
            'ref_id': ref_id,
            'kelas': k,
            'materi_num': m,
            'num': q_num,
            'type': norm_type,
            'raw_type': raw_type,
            'instructionBadge': badge,
            'info': info_text,
            'questionText': question_text,
            'points': 50,
            'options': options,
            'correctOptionIndex': correct_index,
            'imageOptions': image_options,
            'pairs': pairs,
            'leftItems': left_items,
            'rightItems': right_items,
            'orderItems': order_items,
            'correctOrder': correct_order,
            'expectedAnswers': expected_answers,
            'multiCorrectIndices': multi_correct_indices,
            'targetCell': target_cell,
            'initialCell': initial_cell,
            'explanation': feedback
        })

print(f"Successfully parsed {len(parsed_all)} questions.")
with open('parsed_exact_quizzes.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_all, f, indent=2, ensure_ascii=False)
print("Saved to parsed_exact_quizzes.json")
