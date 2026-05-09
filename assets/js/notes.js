// Personal notes + highlighter per chapter
window.Notes = (function () {
  const KEY = 'sistemi5b.notes.v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} }
  function getNote(id) { return load()[id] || ''; }
  function setNote(id, text) { const d = load(); if (text) d[id] = text; else delete d[id]; save(d); }

  function inject() {
    if (document.getElementById('notes-fab')) return;

    const style = document.createElement('style');
    style.textContent = `
      .notes-fab {
        position: fixed; right: 16px; bottom: 152px; z-index: 90;
        background: linear-gradient(135deg, #ffd60a, #ff9f0a); color: #000;
        border: none; width: 44px; height: 44px; border-radius: 50%;
        cursor: pointer; font-size: 1.1rem; box-shadow: 0 6px 18px rgba(255,159,10,0.5);
        transition: transform 0.2s;
      }
      .notes-fab:hover { transform: scale(1.08); }
      .notes-panel {
        position: fixed; right: 16px; bottom: 210px;
        width: min(380px, calc(100vw - 32px));
        background: rgba(20,20,22,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.18); border-radius: 16px;
        padding: 1rem; z-index: 95; display: none;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      }
      .notes-panel.open { display: block; }
      .notes-panel h4 { font-size: 0.95rem; margin-bottom: 0.6rem; display:flex; align-items:center; justify-content:space-between; }
      .notes-panel textarea {
        width: 100%; height: 200px; resize: vertical;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
        color: #fff; padding: 0.75rem; font-family: inherit; font-size: 0.9rem;
        outline: none;
      }
      .notes-panel textarea:focus { border-color: #ffd60a; }
      .notes-panel .nt-row { display: flex; gap: 0.4rem; margin-top: 0.6rem; justify-content: space-between; }
      .notes-panel button { font-family: inherit; font-size: 0.8rem; }
      .notes-status { font-size: 0.72rem; color: #6e6e73; }
    `;
    document.head.appendChild(style);

    const fab = document.createElement('button');
    fab.className = 'notes-fab'; fab.id = 'notes-fab'; fab.title = 'Note personali';
    fab.innerHTML = '📝';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'notes-panel'; panel.id = 'notes-panel';
    panel.innerHTML = `
      <h4>📝 Le tue note <span class="notes-status" id="nt-status"></span></h4>
      <textarea id="nt-text" placeholder="Scrivi qui i tuoi appunti su questo capitolo..."></textarea>
      <div class="nt-row">
        <button class="btn btn-ghost btn-sm" id="nt-clear">Cancella</button>
        <button class="btn btn-secondary btn-sm" id="nt-close">Chiudi</button>
      </div>
    `;
    document.body.appendChild(panel);

    const chapterId = (() => {
      const m = location.pathname.match(/\/chapters\/([^./]+)\.html/);
      return m ? m[1] : null;
    })();
    if (!chapterId) { fab.style.display = 'none'; return; }

    const ta = document.getElementById('nt-text');
    const status = document.getElementById('nt-status');
    ta.value = getNote(chapterId);

    fab.addEventListener('click', () => {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) ta.focus();
    });
    document.getElementById('nt-close').addEventListener('click', () => panel.classList.remove('open'));
    document.getElementById('nt-clear').addEventListener('click', () => {
      if (confirm('Cancellare le note di questo capitolo?')) {
        ta.value = '';
        setNote(chapterId, '');
        status.textContent = 'Cancellate';
        setTimeout(() => status.textContent = '', 1500);
      }
    });

    let saveTimer = null;
    ta.addEventListener('input', () => {
      clearTimeout(saveTimer);
      status.textContent = '✏️ scrivendo...';
      saveTimer = setTimeout(() => {
        setNote(chapterId, ta.value);
        status.textContent = '💾 salvato';
        setTimeout(() => status.textContent = '', 1500);
      }, 600);
    });

    // Update fab icon if there are notes
    if (ta.value.trim()) fab.innerHTML = '📝<span style="position:absolute; top:2px; right:2px; width:10px; height:10px; background:#ff453a; border-radius:50%; border:2px solid #1c1c1e;"></span>';
  }

  return { init: inject, getNote, setNote, load };
})();
document.addEventListener('DOMContentLoaded', () => { if (window.Notes) Notes.init(); });
