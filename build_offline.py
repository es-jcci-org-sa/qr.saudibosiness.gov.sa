"""Refresh the direct-file preview after editing JSON files."""
from pathlib import Path
import json

root = Path(__file__).resolve().parent
data = {path.name: json.loads(path.read_text(encoding='utf-8-sig'))
        for path in sorted((root / 'data').glob('*.json'))}
payload = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
(root / 'js' / 'offline-data.js').write_text(
    '/* Generated from data/*.json by build_offline.py. */\n'
    'window.__LOCAL_OFFLINE_DATA__ = ' + payload + ';\n', encoding='utf-8')
print(f'Updated direct-file data: {len(data)} records')
