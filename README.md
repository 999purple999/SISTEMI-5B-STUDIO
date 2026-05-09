# Sistemi 5B — Study Hub 🚀

> Sito di studio completo per il programma di **Sistemi e Reti — classe 5B Informatica**, in stile cyberpunk Tokyo, con tutti gli strumenti per superare l'Esame di Stato.

🌐 **Live**: https://999purple999.github.io/SISTEMI-5B-STUDIO/

---

## ✨ Caratteristiche

### 📚 Contenuti
- **5 moduli** completi: Crittografia, Filtraggio reti, Datacenter/Cloud, Esame di Stato, Casi di studio
- **57 capitoli HTML** con teoria, esempi numerici, diagrammi Mermaid
- **300+ quiz** a risposta multipla con spiegazioni
- **Casi di studio risolti**: LogiPack, DataForge, esercizi DMZ, RSA/DH numerici
- **Glossario alfabetico** con 200+ termini auto-estratti
- **Mind map interattiva** del programma
- **Cheatsheet** stampabile

### 🛠️ Tools per l'esame
- Calcolatore **VLSM/CIDR** con tabella sottoreti
- Convertitore **DEC ↔ BIN ↔ HEX** (IPv4, MAC, generico)
- Generatore **EUI-64** (IPv6 Link-Local da MAC)
- Calcolatore **wildcard ACL Cisco**
- **IP Info** (classe, tipo RFC1918, range, broadcast)

### 🎯 Modalità studio
- **Flashcards SRS** (algoritmo SM-2 spaced repetition)
- **Quiz** per capitolo con tracking progressi
- **Esame cronometrato** (preset 30 dom × 60 min, simulazione reale)
- **Speed reading** (RSVP, fino a 1000 parole/min)
- **Pomodoro timer** integrato
- **Note personali** per capitolo
- **Tracker errori** ("ripassa quelli sbagliati")
- **TTS** (Web Speech + audio pre-renderizzato + endpoint AI)

### 🎨 UI Cyberpunk Tokyo
- 4 temi swappabili: `cyber-tokyo`, `anime-sunset`, `hacker-green`, `apple-classic`
- **Background interattivo**: particelle reattive al mouse / matrix rain personalizzabile / griglia / off
- **Logo 3D** cubo rotante CSS
- **Orologio multi-fuso** (13 città)
- **Pannello Personalizza** ⚙ — cambio tema, accento, animazione live
- Font: Chakra Petch + Orbitron + Space Grotesk + JetBrains Mono

### 🏆 Gamification
- XP per ogni capitolo completato
- Streak giornaliero 🔥
- 12 trofei sbloccabili
- Dashboard progressi

### 📦 Tecnologia
- **PWA** installabile (icona, manifest, service worker offline)
- **100% offline** dopo il primo accesso (precache di tutti i capitoli)
- **Auto-update notification** quando arriva nuova versione
- **Backup/Restore** progressi (export/import JSON)
- **CI/CD**: deploy automatico su GitHub Pages a ogni push
- **Stampa** ottimizzata per ogni capitolo (CSS @media print)
- **Swipe** tra capitoli su mobile
- **Mermaid self-hosted** (niente dipendenze CDN per i diagrammi)

---

## 🚀 Avvio locale

```bash
python -m http.server 8000
# poi apri http://localhost:8000
```

Funziona anche aprendo `index.html` direttamente, ma il service worker richiede HTTP.

---

## 📁 Struttura

```
.
├── index.html                 # Homepage con elenco moduli e progressi
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker offline
│
├── chapters/                  # 57 pagine
│   ├── m1.html .. m5.html    # Indici modulo (1-5)
│   ├── introduzione.html ...  # 47 capitoli teoria
│   ├── exam.html              # Esame finale cronometrato
│   ├── flashcards.html        # SRS
│   ├── cheatsheet.html        # Riassunto stampabile
│   ├── mistakes.html          # Tracker errori
│   ├── mindmap.html           # Mind map interattiva (markmap)
│   ├── tools.html             # Calcolatori esame (VLSM/EUI-64/...)
│   ├── glossario.html         # Glossario alfabetico
│   └── speed-read.html        # RSVP speed reading
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Design system base
│   │   └── themes.css         # Cyberpunk + anime + hacker + classic
│   ├── js/
│   │   ├── app.js             # Homepage logic
│   │   ├── chapter.js         # Pagina capitolo (TOC, quiz, prev/next)
│   │   ├── storage.js         # Progressi + gamification (localStorage)
│   │   ├── quiz.js            # Engine quiz a scelta multipla
│   │   ├── exam.js            # Esame cronometrato
│   │   ├── flashcards.js      # SM-2 spaced repetition
│   │   ├── study-tools.js     # Focus / search / TTS bridge
│   │   ├── pomodoro.js        # Timer 25/5
│   │   ├── notes.js           # Note personali
│   │   ├── reading-bar.js     # Progress bar lettura
│   │   ├── shortcuts.js       # Scorciatoie tastiera
│   │   ├── tts.js             # Adapter TTS pluggabile (audio pre-rendered → endpoint → Web Speech)
│   │   ├── cyberpunk-fx.js    # Background canvas + logo 3D + orologio
│   │   ├── customize.js       # Pannello ⚙ Personalizza
│   │   ├── backup.js          # Export/Import JSON dei dati
│   │   ├── polish.js          # Back-to-top, swipe, print, nav upgrade
│   │   └── sw-updates.js      # Notifica nuova versione
│   ├── vendor/
│   │   └── mermaid.min.js     # Mermaid self-hosted (offline)
│   └── audio/                 # MP3 pre-renderizzati (opzionale, vedi script)
│
├── data/
│   ├── modules.js             # Struttura 5 moduli + capitoli
│   └── content-m{1,1b,1c,2,2b,3,4,4b,4c,5}.js   # Body HTML + quiz
│
├── scripts/
│   └── generate-tts-audio.py  # Pre-render audio capitoli (Piper/XTTS/F5-TTS)
│
├── .github/workflows/pages.yml # CI auto-deploy
├── TTS-FUTURE.md              # Roadmap voci AI realistiche con RTX 5080
└── DOCS/                      # PDF originali del prof (gitignored)
```

---

## 🎙️ TTS (Text-To-Speech)

Il sito ha 3 livelli, in ordine di qualità decrescente:

1. **Audio pre-renderizzato** (MP3 in `assets/audio/<slug>.mp3`) — top quality, latenza zero, offline
2. **Endpoint custom** (Piper / XTTS-v2 / F5-TTS in localhost) — alta qualità, richiede GPU
3. **Web Speech API** del browser — fallback (robotico ma sempre disponibile)

### Pre-renderizzare gli audio (con RTX 5080)
```bash
# Avvia un server TTS locale (es. Piper o XTTS-v2)
piper-server --model it_IT-paola-medium.onnx --port 5000

# Genera tutti gli MP3
python scripts/generate-tts-audio.py \
  --endpoint http://localhost:5000/api/tts \
  --voice it_IT-paola-medium
```

Vedi **[TTS-FUTURE.md](TTS-FUTURE.md)** per la roadmap completa (Piper, XTTS-v2, F5-TTS, OpenVoice, Bark).

### Configurare un endpoint custom
```js
localStorage.setItem('sistemi5b.tts.endpoint', 'http://localhost:5000/api/tts');
localStorage.setItem('sistemi5b.tts.voice', 'it_IT-paola-medium');
```

---

## 🎨 Personalizzazione

Premi il bottone ⚙ in basso a destra per:
- Cambiare **tema** (cyber-tokyo, anime-sunset, hacker-green, apple-classic)
- Scegliere **background animato** (particelle / matrix / grid / off)
- Personalizzare la **matrix rain** (velocità, densità, scia, glyphs)
- Cambiare **colore d'accento**
- Toggle **logo 3D** e **orologio multi-fuso**
- Selezionare i **fusi orari** preferiti

Tutto persiste in `localStorage`.

---

## 💾 Backup e ripristino progressi

Dalla home (sezione "⚠️ Resetta progressi"):
- **💾 Esporta progressi** → scarica `sistemi5b-backup-YYYY-MM-DD.json`
- **📥 Importa backup** → carica un JSON precedente

Il backup contiene: progressi capitoli, XP, streak, achievements, flashcards SRS, mistakes, note, customizzazioni UI, configurazione TTS.

---

## ⌨️ Scorciatoie

| Tasto | Azione |
|-------|--------|
| `Ctrl+K` o `/` | Ricerca globale |
| `1-4` | Risposta quiz |
| `Enter` | Quiz: prossima domanda |
| `Esc` | Chiudi popup/overlay |

---

## 🎓 Materiale di base

Slide del **Prof. Marcolin Mattia** — Istituto Tecnico, settore Informatica.
PDF originali in `DOCS/` (gitignored). Estratti come testo in `docs_extracted/` (anch'essa gitignored).

---

## 🤝 Contribuire

1. Fork → branch → PR
2. Test locale con `python -m http.server 8000`
3. Push su `main` → deploy automatico via GitHub Actions

---

## 📜 Licenza

Sito non ufficiale realizzato a scopo didattico.
