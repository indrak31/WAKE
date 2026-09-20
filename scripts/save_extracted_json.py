import zipfile
import csv
import io
import json
import os

os.makedirs('public/data', exist_ok=True)

# 1. Extract sample from Spotify history
spotify_samples = []
with zipfile.ZipFile('C:/Users/Admin/Downloads/archive.zip') as z:
    with z.open('spotify_history.csv') as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding='utf-8-sig', errors='replace'))
        for row in reader:
            if len(spotify_samples) < 500:
                spotify_samples.append({
                    'track': row.get('track_name'),
                    'artist': row.get('artist_name'),
                    'album': row.get('album_name'),
                    'ts': row.get('ts'),
                    'ms_played': row.get('ms_played'),
                    'platform': row.get('platform')
                })

with open('public/data/archive_extracted_spotify.json', 'w', encoding='utf-8') as out:
    json.dump(spotify_samples, out, indent=2)
print(f"Saved {len(spotify_samples)} Spotify history records to public/data/archive_extracted_spotify.json")

# 2. Extract sample from Daily Household Transactions
tx_samples = []
with zipfile.ZipFile('C:/Users/Admin/Downloads/archive (1).zip') as z:
    with z.open('Daily Household Transactions.csv') as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding='utf-8-sig', errors='replace'))
        for row in reader:
            if len(tx_samples) < 500:
                tx_samples.append({
                    'date': row.get('Date'),
                    'mode': row.get('Mode'),
                    'category': row.get('Category'),
                    'subcategory': row.get('Subcategory'),
                    'note': row.get('Note'),
                    'amount': row.get('Amount'),
                    'currency': row.get('Currency')
                })

with open('public/data/archive_extracted_transactions.json', 'w', encoding='utf-8') as out:
    json.dump(tx_samples, out, indent=2)
print(f"Saved {len(tx_samples)} Household Transaction records to public/data/archive_extracted_transactions.json")
