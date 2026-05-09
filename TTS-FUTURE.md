# 🎙️ TTS AI Realistico — Roadmap (RTX 5080)

Il sito usa attualmente **Web Speech API** del browser (voce robotica). Quando avrai la **RTX 5080** potrai sostituirla in 5 minuti senza toccare il codice.

L'adapter è già presente: `assets/js/tts.js`. Basta avviare un server TTS locale e impostare l'URL in localStorage.

## Opzioni in ordine di consigli

### 1. **Piper TTS** (consigliato per partire) — leggero, instant
- Repo: https://github.com/rhasspy/piper
- Voci italiane ufficiali: `it_IT-paola-medium`, `it_IT-riccardo-x_low`
- Latenza: <100 ms su RTX 5080
- Quality: 7/10 (naturale ma poco espressiva)

```bash
# Server HTTP (esempio via piper-server di terze parti)
piper-server --model it_IT-paola-medium.onnx --host 0.0.0.0 --port 5000
```

Endpoint da impostare nel sito (apri DevTools → Console):
```js
localStorage.setItem('sistemi5b.tts.endpoint', 'http://localhost:5000/api/tts');
localStorage.setItem('sistemi5b.tts.voice', 'it_IT-paola-medium');
```

### 2. **XTTS-v2 / Coqui-TTS** — altissima qualità, voice cloning 6 sec
- Repo: https://github.com/coqui-ai/TTS / https://github.com/idiap/coqui-ai-TTS
- Voci italiane native + clone della tua voce con 6 secondi di audio
- Latenza: ~1.5 s su RTX 5080 (vRAM ~6 GB)
- Quality: 9.5/10 (può imitarti perfettamente)

```bash
pip install coqui-tts
tts-server --model_name tts_models/multilingual/multi-dataset/xtts_v2 --port 8020
```

### 3. **F5-TTS** — qualità da podcast pro (top 2026)
- Repo: https://github.com/SWivid/F5-TTS
- Italiano via fine-tuning, latenza ~2 s
- vRAM: 8 GB, perfetto per RTX 5080 (24-32 GB)
- Quality: 9.8/10

### 4. **OpenVoice v2 / ChatTTS** — espressività emotiva
- Repo: https://github.com/myshell-ai/OpenVoice
- Espressioni emozionali (felice, triste, urgente — utile per studio mnemonico)
- Latenza ~2 s

### 5. **Bark (Suno)** — opzionale, espressività max
- Repo: https://github.com/suno-ai/bark
- Genera anche risate, sospiri, intonazioni natural
- Lento (~5 s/frase) ma perfetto per registrazioni offline di capitoli

## Come collegarlo al sito

L'adapter `assets/js/tts.js` esegue una `POST` JSON a:
```
{ "text": "<frase>", "voice": "<voce>", "lang": "it", "rate": 1.0 }
```
e si aspetta in risposta un blob audio (`audio/wav` o `audio/mpeg`).

Per Piper / XTTS / openai-edge-tts proxy questo formato è già compatibile. Per F5-TTS o Bark serve un wrapper Flask/FastAPI di 20 righe.

### Wrapper FastAPI minimale (esempio Piper)
```python
# tts_proxy.py
from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import subprocess, tempfile, os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.post("/api/tts")
async def tts(req: dict):
    text = req["text"]
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        out = f.name
    subprocess.run(
        ["piper", "--model", "it_IT-paola-medium.onnx", "--output_file", out],
        input=text.encode(), check=True
    )
    audio = open(out, "rb").read(); os.unlink(out)
    return Response(content=audio, media_type="audio/wav")
```

Avvio: `uvicorn tts_proxy:app --host 0.0.0.0 --port 5000`

## Idee future (con RTX 5080 disponibile)

- **Pre-rendering capitoli**: generare un MP3 per ogni capitolo (24 capitoli × ~3 min = ~72 min audio totali, ~70 MB) e caricarli in `assets/audio/`. Niente latenza, qualità top, funziona offline (PWA).
- **Lettura "podcast mode"**: encoder come **Bark** può aggiungere intonazione (es. domande del quiz lette con tono interrogativo).
- **AI tutor vocale**: collegare a un LLM locale (Ollama + qwen2.5 7B) → STT (Whisper) → LLM → TTS (XTTS) per chiedere a voce "spiegami la firma digitale" e ricevere risposta in voce.
- **Voice clone della prof.**: con XTTS basta un campione di 6 sec dalla registrazione di una lezione (con permesso). I capitoli verrebbero letti con voce 1:1.

## Senza GPU (oggi)

Funziona già:
- Web Speech API italiana (Microsoft Elsa / Cosimo, voci italiane di sistema)
- Per migliorare, su Windows installa **Microsoft Speech Italian** dalle impostazioni (voci → aggiungi → italiano premium).
- ElevenLabs TTS API: 10000 caratteri/mese gratis, qualità 10/10. Endpoint:
  ```js
  localStorage.setItem('sistemi5b.tts.endpoint', 'https://tu-proxy-elevenlabs/api/tts');
  ```
  (serve un proxy che trasforma la POST {text, voice} nello schema ElevenLabs).
