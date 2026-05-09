// Keyboard shortcuts overlay (press ?)
window.Shortcuts = (function () {
  const SHORTCUTS = [
    { key: '?', desc: 'Mostra/nascondi questa lista' },
    { key: '/  o  Ctrl+K', desc: 'Cerca globale tra capitoli e quiz' },
    { key: 'Esc', desc: 'Chiudi overlay/modale' },
    { key: 'F', desc: 'Focus mode (legge senza distrazioni)' },
    { key: 'P', desc: 'Apri Pomodoro timer' },
    { key: 'T', desc: 'Leggi capitolo ad alta voce (TTS)' },
    { key: 'H', desc: 'Torna alla home' },
    { key: '←  →', desc: 'Capitolo precedente / successivo' },
    { key: '1-4 (in quiz)', desc: 'Seleziona la risposta' },
    { key: 'Spazio (flashcards)', desc: 'Mostra risposta' },
    { key: 'Enter (quiz)', desc: 'Domanda successiva' }
  ];

  function inject() {
    if (document.getElementById('sc-overlay')) return;
    const style = document.createElement('style');
    style.textContent = `
      .sc-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        z-index: 250; display: none; align-items: center; justify-content: center; padding: 1rem;
      }
      .sc-overlay.open { display: flex; animation: sc-in 0.2s ease; }
      @keyframes sc-in { from { opacity: 0; } to { opacity: 1; } }
      .sc-panel {
        background: linear-gradient(180deg, #1c1c1e 0%, #0a0a0c 100%);
        border: 1px solid rgba(255,255,255,0.18); border-radius: 18px;
        padding: 1.5rem; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;
      }
      .sc-panel h3 { margin-bottom: 1rem; font-size: 1.1rem; }
      .sc-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.55rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .sc-row:last-child { border-bottom: none; }
      .sc-row kbd {
        background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
        padding: 3px 9px; border-radius: 6px; font-size: 0.78rem; color: #fff;
        font-family: "SF Mono", monospace; font-weight: 600; white-space: nowrap;
      }
      .sc-row span { color: #d8d8db; font-size: 0.9rem; }
      .sc-close { float: right; background: none; border: none; color: #a1a1a6; font-size: 1.3rem; cursor: pointer; padding: 0; }
    `;
    document.head.appendChild(style);

    const ov = document.createElement('div');
    ov.className = 'sc-overlay'; ov.id = 'sc-overlay';
    ov.innerHTML = `
      <div class="sc-panel">
        <button class="sc-close" id="sc-close" aria-label="Chiudi">✕</button>
        <h3>⌨️ Scorciatoie tastiera</h3>
        ${SHORTCUTS.map(s => `<div class="sc-row"><kbd>${s.key}</kbd><span>${s.desc}</span></div>`).join('')}
      </div>
    `;
    document.body.appendChild(ov);

    function open() { ov.classList.add('open'); }
    function close() { ov.classList.remove('open'); }

    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    document.getElementById('sc-close').addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      const tag = (document.activeElement || {}).tagName;
      if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
      if (e.key === '?' || (e.shiftKey && e.key === '?')) { e.preventDefault(); open(); return; }
      if (e.key === 'Escape') { close(); return; }
      if (ov.classList.contains('open')) return;

      // Other shortcuts
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); if (window.StudyTools) StudyTools.toggleFocus(); }
      else if (e.key === 'p' || e.key === 'P') { e.preventDefault(); if (window.Pomodoro) Pomodoro.open(); }
      else if (e.key === 't' || e.key === 'T') { e.preventDefault(); const btn = document.getElementById('st-tts'); if (btn) btn.click(); }
      else if (e.key === 'h' || e.key === 'H') {
        const home = document.querySelector('a[href*="index.html"]');
        if (home && !e.metaKey && !e.ctrlKey) location.href = home.getAttribute('href');
      }
      else if (e.key === 'ArrowLeft') {
        const prev = document.querySelector('#prev-next a:first-child');
        if (prev && prev.tagName === 'A' && !e.metaKey) location.href = prev.getAttribute('href');
      }
      else if (e.key === 'ArrowRight') {
        const next = document.querySelector('#prev-next a:last-child');
        if (next && next.tagName === 'A' && !e.metaKey) location.href = next.getAttribute('href');
      }
    });
  }

  return { init: inject };
})();
document.addEventListener('DOMContentLoaded', () => { if (window.Shortcuts) Shortcuts.init(); });
