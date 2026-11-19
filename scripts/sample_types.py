import json

with open('debug_parsed_chapters.json', 'r', encoding='utf-8') as f:
    chapters = json.load(f)

by_type = {}
for ch in chapters:
    for q in ch['questions']:
        t = q['raw_type']
        if t not in by_type:
            by_type[t] = []
        by_type[t].append((f"{ch['kelas']}-{ch['materi_num']}", q['raw_body']))

for t, list_samples in by_type.items():
    print(f"=== TYPE: {t} (Count: {len(list_samples)}) ===")
    for ref, body in list_samples[:2]:
        print(f"[{ref}]: {body[:250]}...")
    print("\n")
