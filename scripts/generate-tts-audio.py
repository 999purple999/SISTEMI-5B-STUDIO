#!/usr/bin/env python3
"""
Pre-genera audio MP3 per ogni capitolo usando un server TTS locale (Piper / XTTS-v2 / F5-TTS).
Output: assets/audio/<chapter-slug>.mp3
Il sito (assets/js/tts.js) ha priorità: audio locale → endpoint TTS → Web Speech API.

Requirements:
  pip install requests beautifulsoup4

Esempio uso (con Piper su localhost:5000):
  python scripts/generate-tts-audio.py --endpoint http://localhost:5000/api/tts --voice it_IT-paola-medium

Esempio uso (con XTTS-v2 / Coqui-TTS su localhost:8020):
  python scripts/generate-tts-audio.py --endpoint http://localhost:8020/tts_to_audio --voice "Female 01" --xtts

Senza GPU: NON usare (Web Speech API browser è già il fallback).
"""
import argparse
import os
import re
import sys
import json
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
OUT_DIR = ROOT / "assets" / "audio"

def extract_chapters():
    """Estrae { slug → testo concatenato } leggendo i file content-*.js"""
    out = []
    # Carica modules.js per la mappatura id → slug
    mods_text = (DATA_DIR / "modules.js").read_text(encoding="utf-8")
    id_to_slug = {}
    for m in re.finditer(r'id:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', mods_text):
        id_to_slug[m.group(1)] = m.group(2)

    for jsf in sorted(DATA_DIR.glob("content-*.js")):
        text = jsf.read_text(encoding="utf-8")
        # Match window.CHAPTERS.<id> = { title: "...", body: `...`, ... }
        for m in re.finditer(
            r'window\.CHAPTERS\.(\w+)\s*=\s*\{\s*title:\s*"([^"]+)"\s*,\s*body:\s*`([\s\S]+?)`\s*,',
            text
        ):
            ch_id, title, body = m.group(1), m.group(2), m.group(3)
            slug = id_to_slug.get(ch_id, ch_id)
            # Strip HTML & Mermaid blocks
            body = re.sub(r'<pre class="mermaid">[\s\S]*?</pre>', '', body)
            body = re.sub(r'<[^>]+>', ' ', body)
            body = re.sub(r'&[a-z]+;', ' ', body)
            body = re.sub(r'\s+', ' ', body).strip()
            full = f"{title}. {body}"
            out.append({"id": ch_id, "slug": slug, "title": title, "text": full})
    return out

def call_tts(endpoint, voice, text, xtts=False, timeout=600):
    import requests
    if xtts:
        payload = {"text": text, "speaker_wav": "", "language": "it"}
    else:
        payload = {"text": text, "voice": voice, "lang": "it"}
    r = requests.post(endpoint, json=payload, timeout=timeout)
    r.raise_for_status()
    return r.content

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--endpoint", required=True, help="URL del server TTS (POST JSON)")
    ap.add_argument("--voice", default="it_IT-paola-medium")
    ap.add_argument("--xtts", action="store_true", help="Schema payload XTTS-v2 / Coqui invece di Piper")
    ap.add_argument("--limit", type=int, default=0, help="Solo primi N capitoli (debug)")
    ap.add_argument("--skip-existing", action="store_true", default=True)
    args = ap.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    chapters = extract_chapters()
    if args.limit:
        chapters = chapters[: args.limit]
    print(f"[+] {len(chapters)} chapters da generare in {OUT_DIR}")

    manifest = []
    failed = []
    for i, ch in enumerate(chapters, 1):
        out_file = OUT_DIR / f"{ch['slug']}.mp3"
        if args.skip_existing and out_file.exists():
            print(f"  [{i:3d}/{len(chapters)}] skip {ch['slug']} (esiste)")
            manifest.append({"slug": ch["slug"], "title": ch["title"], "file": out_file.name})
            continue
        n_chars = len(ch["text"])
        print(f"  [{i:3d}/{len(chapters)}] {ch['slug']} ({n_chars} chars) ...", end=" ", flush=True)
        try:
            t0 = time.time()
            audio = call_tts(args.endpoint, args.voice, ch["text"], xtts=args.xtts)
            out_file.write_bytes(audio)
            dt = time.time() - t0
            kb = len(audio) // 1024
            print(f"OK ({kb} KB in {dt:.1f}s)")
            manifest.append({"slug": ch["slug"], "title": ch["title"], "file": out_file.name, "size": len(audio)})
        except Exception as e:
            print(f"FAIL: {e}")
            failed.append(ch["slug"])

    # Manifest per il sito
    (OUT_DIR / "manifest.json").write_text(
        json.dumps({
            "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "voice": args.voice,
            "endpoint": args.endpoint,
            "chapters": manifest
        }, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    print(f"\n[+] Done. Generati: {len(manifest)}. Falliti: {len(failed)}.")
    if failed:
        print(f"[!] Fallback Web Speech per: {', '.join(failed)}")

if __name__ == "__main__":
    main()
