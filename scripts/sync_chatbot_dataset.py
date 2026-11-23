import os
import json
import pandas as pd

def sync_dataset():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    csv_path = os.path.join(root_dir, 'dataset.csv')
    json_path = os.path.join(root_dir, 'public', 'chatbot-dataset.json')
    chatbot_csv_path = os.path.join(root_dir, 'prisma-chatbot', 'data', 'dataset.csv')

    print(f"Reading dataset from: {csv_path}")

    # Read with multiple encoding fallbacks
    loaded_df = None
    used_enc = None
    for enc in ['cp1252', 'utf-8-sig', 'utf-8', 'latin1']:
        try:
            df = pd.read_csv(csv_path, sep=';', encoding=enc)
            # Verify columns
            if 'id_data' in df.columns and 'jawaban' in df.columns:
                loaded_df = df
                used_enc = enc
                break
        except Exception:
            continue

    if loaded_df is None:
        raise ValueError("Gagal membaca dataset.csv dengan encoding apapun!")

    print(f"Berhasil membaca {len(loaded_df)} baris dengan encoding '{used_enc}'.")

    # Clean records
    records = []
    for _, row in loaded_df.iterrows():
        rec = {}
        for col in loaded_df.columns:
            val = str(row[col]) if pd.notnull(row[col]) else ''
            val = val.strip()
            # Remove wrapping quotes if present
            if len(val) >= 2 and val.startswith('"') and val.endswith('"'):
                val = val[1:-1].strip()
            # Replace common Windows-1252 artifacts if any
            val = val.replace('\x96', '–').replace('\x97', '—').replace('\x91', "'").replace('\x92', "'").replace('\x93', '"').replace('\x94', '"')
            rec[col] = val
        records.append(rec)

    # 1. Write to public/chatbot-dataset.json
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    print(f"Tersimpan ke JSON: {json_path} ({len(records)} data)")

    # 2. Write to prisma-chatbot/data/dataset.csv (Clean UTF-8 CSV with semicolon)
    clean_df = pd.DataFrame(records)
    os.makedirs(os.path.dirname(chatbot_csv_path), exist_ok=True)
    clean_df.to_csv(chatbot_csv_path, sep=';', index=False, encoding='utf-8-sig')
    print(f"Tersinkron ke Python Chatbot CSV: {chatbot_csv_path}")

    # 3. Also save root dataset.csv as UTF-8-SIG so future reads won't suffer from cp1252 errors
    clean_df.to_csv(csv_path, sep=';', index=False, encoding='utf-8-sig')
    print(f"Dataset root disimpan kembali sebagai UTF-8-SIG: {csv_path}")

    print("\n✅ Sinkronisasi dataset chatbot sukses 100%!")

if __name__ == '__main__':
    sync_dataset()
