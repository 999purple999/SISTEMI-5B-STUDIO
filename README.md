# Sistemi 5B — Study Hub

Sito di studio completo per il programma di **Sistemi e Reti — classe 5B**.

## ✨ Caratteristiche

- 📚 **40 capitoli** suddivisi in 4 moduli (Crittografia, Filtraggio reti, Datacenter/Cloud, Esame di Stato)
- 🎯 **Quiz a risposta multipla** per ogni capitolo (oltre 280 domande totali)
- 🏆 **Gamification**: XP, streak giornaliero, 12 trofei sbloccabili
- 💾 **Progressi salvati** in localStorage (nessun backend)
- 🍎 **Design Apple-style** dark mode con effetti glassmorphism
- 📱 **Mobile-first** completamente responsive
- ⚡ **Sito statico**: pure HTML/CSS/JS senza framework

## 🚀 Avvio locale

```bash
python -m http.server 8000
```

Apri `http://localhost:8000` nel browser.

## 📁 Struttura

```
.
├── index.html              # Homepage con elenco moduli e progressi
├── chapters/               # 40 pagine capitoli + 4 indici modulo
├── assets/
│   ├── css/style.css      # Design system completo
│   └── js/
│       ├── storage.js     # localStorage + gamification
│       ├── quiz.js        # Engine quiz
│       ├── chapter.js     # Logica pagine capitolo
│       └── app.js         # Logica homepage
├── data/                   # Contenuti e quiz (JS modules)
└── DOCS/                   # PDF originali (gitignored)
```

## 🎓 Materiale di base

Slide del Prof. Marcolin Mattia — Istituto Tecnico, settore Informatica.

## 📜 Licenza

Sito non ufficiale realizzato a scopo didattico.
