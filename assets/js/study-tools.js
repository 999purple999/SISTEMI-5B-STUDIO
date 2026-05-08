// Study Tools: focus mode, TTS, mistakes tracking, global search
window.StudyTools = (function () {
  const MISTAKES_KEY = 'sistemi5b.mistakes.v1';

  // ================= MISTAKES =================
  function loadMistakes() {
    try { return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '[]'); } catch { return []; }
  }
  function saveMistakes(arr) {
    try { localStorage.setItem(MISTAKES_KEY, JSON.stringify(arr.slice(-200))); } catch {}
  }
  function recordMistake(question, chapterId, chapterTitle) {
    const list = loadMistakes();
    list.push({ q: question, chapterId, chapterTitle, t: Date.now() });
    saveMistakes(list);
  }
  function clearMistakes() {
    localStorage.removeItem(MISTAKES_KEY);
  }

  // ================= GLOBAL SEARCH =================
  function searchAll(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];
    if (!window.MODULES || !window.CHAPTERS) return [];

    window.MODULES.forEach(mod => {
      mod.chapters.forEach(ch => {
        const data = window.CHAPTERS[ch.id];
        if (!data) return;
        let score = 0;
        let snippet = '';
        if (ch.title.toLowerCase().includes(q)) score += 10;
        if (data.title && data.title.toLowerCase().includes(q)) score += 8;
        const text = (data.body || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        const lower = text.toLowerCase();
        const at = lower.indexOf(q);
        if (at >= 0) {
          score += 5;
          const start = Math.max(0, at - 60);
          const end = Math.min(text.length, at + q.length + 80);
          snippet = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
          // Highlight
          snippet = snippet.replace(new RegExp(query, 'gi'), m => `<mark style="background:rgba(255,214,10,0.4); color:#fff; padding:0 3px; border-radius:3px;">${m}</mark>`);
        }
        // Search quizzes
        if (data.quiz) {
          data.quiz.forEach(qz => {
            if (qz.q.toLowerCase().includes(q) || qz.a.some(a => a.toLowerCase().includes(q))) score += 3;
          });
        }
        if (score > 0) {
          results.push({ mod, ch, data, score, snippet });
        }
      });
    });
    return results.sort((a, b) => b.score - a.score).slice(0, 20);
  }

  function buildGlobalSearch() {
    if (document.getElementById('gs-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'gs-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); z-index:200; display:none; align-items:flex-start; justify-content:center; padding-top:8vh;';
    overlay.innerHTML = `
      <div style="width:100%; max-width:640px; padding:0 1rem;">
        <div style="background:rgba(28,28,30,0.96); border:1px solid rgba(255,255,255,0.18); border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.7);">
          <div style="display:flex; align-items:center; padding:1rem 1.25rem; border-bottom:1px solid rgba(255,255,255,0.08);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1a6" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input id="gs-input" placeholder="Cerca tra tutti i capitoli, quiz e contenuti…" style="flex:1; background:transparent; border:none; outline:none; padding:0 0 0 0.75rem; color:#fff; font-size:1.05rem; font-family:inherit;" autofocus>
            <kbd style="background:rgba(255,255,255,0.08); padding:2px 7px; border-radius:5px; font-size:0.72rem; color:#a1a1a6;">ESC</kbd>
          </div>
          <div id="gs-results" style="max-height:60vh; overflow-y:auto; padding:0.5rem;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('gs-input');
    const results = document.getElementById('gs-results');
    let lastVal = '';

    function close() { overlay.style.display = 'none'; input.value = ''; }
    function open() {
      overlay.style.display = 'flex';
      setTimeout(() => input.focus(), 50);
      renderEmpty();
    }
    function renderEmpty() {
      results.innerHTML = `<p style="padding:2rem 1rem; text-align:center; color:#6e6e73; font-size:0.9rem;">Inizia a digitare per cercare…<br/><span style="font-size:0.8rem;">Funziona su titoli, contenuti, domande dei quiz</span></p>`;
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && overlay.style.display === 'flex') close();
      else if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });

    input.addEventListener('input', () => {
      const v = input.value.trim();
      if (v === lastVal) return;
      lastVal = v;
      if (v.length < 2) { renderEmpty(); return; }
      const found = searchAll(v);
      if (found.length === 0) {
        results.innerHTML = `<p style="padding:2rem 1rem; text-align:center; color:#6e6e73;">Nessun risultato per "${v}"</p>`;
        return;
      }
      const isChapterPage = window.location.pathname.includes('/chapters/');
      const prefix = isChapterPage ? '' : 'chapters/';
      results.innerHTML = found.map(r => `
        <a href="${prefix}${r.ch.slug}.html" style="display:block; padding:0.85rem 1rem; border-radius:10px; text-decoration:none; color:inherit;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <span style="font-size:0.7rem; padding:2px 8px; background:rgba(10,132,255,0.18); color:#6cb8ff; border-radius:99px; font-weight:600; text-transform:uppercase;">${r.mod.num}</span>
            <span style="font-weight:600; color:#fff;">${r.ch.icon || '📄'} ${r.ch.title}</span>
          </div>
          ${r.snippet ? `<div style="font-size:0.85rem; color:#a1a1a6; line-height:1.4;">${r.snippet}</div>` : ''}
        </a>
      `).join('');
    });

    return { open, close };
  }

  // ================= FOCUS MODE =================
  function setupFocus() {
    if (document.getElementById('focus-style')) return;
    const css = document.createElement('style');
    css.id = 'focus-style';
    css.textContent = `
      body.focus-mode .navbar,
      body.focus-mode footer,
      body.focus-mode .breadcrumb,
      body.focus-mode #toc,
      body.focus-mode .pom-fab,
      body.focus-mode #st-fab { display: none !important; }
      body.focus-mode { background: #050505 !important; }
      body.focus-mode .chapter-content { max-width: 720px; margin: 2rem auto; font-size: 1.08rem; line-height: 1.7; }
      body.focus-mode .chapter-content p { color: #d8d8db; }
      body.focus-mode .chapter-layout { grid-template-columns: 1fr !important; }
      body.focus-mode .container { padding-top: 1rem; }
    `;
    document.head.appendChild(css);
  }
  function toggleFocus() {
    setupFocus();
    document.body.classList.toggle('focus-mode');
    if (window.Storage && Storage.showToast) {
      Storage.showToast(document.body.classList.contains('focus-mode') ? '🎯 Focus mode ON' : 'Focus mode OFF');
    }
  }

  // ================= TTS (Text-to-Speech) =================
  let ttsActive = false;
  let utter = null;
  function speak(text) {
    if (!('speechSynthesis' in window)) {
      if (window.Storage && Storage.showToast) Storage.showToast('TTS non supportato');
      return;
    }
    speechSynthesis.cancel();
    if (ttsActive) { ttsActive = false; return; }
    const clean = text.replace(/\s+/g, ' ').trim();
    utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'it-IT';
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.onend = () => { ttsActive = false; };
    speechSynthesis.speak(utter);
    ttsActive = true;
  }
  function stopTTS() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    ttsActive = false;
  }

  // ================= FAB UI =================
  function buildFab() {
    if (document.getElementById('st-fab')) return;
    const css = document.createElement('style');
    css.textContent = `
      .st-fab {
        position: fixed; right: 16px; bottom: 84px; z-index: 90;
        background: rgba(28,28,30,0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.18); border-radius: 999px;
        padding: 0.45rem 0.5rem; display: flex; gap: 0.35rem;
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      }
      .st-fab button {
        width: 40px; height: 40px; border-radius: 50%;
        background: transparent; border: none; color: #fff;
        cursor: pointer; font-size: 1.1rem;
        transition: background 0.2s;
      }
      .st-fab button:hover { background: rgba(255,255,255,0.1); }
      .st-fab button.active { background: rgba(10,132,255,0.4); }
      .st-tooltip {
        position: absolute; bottom: 100%; left: 50%;
        transform: translateX(-50%) translateY(-6px);
        background: rgba(0,0,0,0.85); color: #fff;
        padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;
        white-space: nowrap; opacity: 0; pointer-events: none;
        transition: opacity 0.2s;
      }
      .st-fab button:hover .st-tooltip { opacity: 1; }
      @media (max-width: 480px) {
        .st-fab { padding: 0.3rem; }
        .st-fab button { width: 36px; height: 36px; font-size: 1rem; }
      }
    `;
    document.head.appendChild(css);

    const fab = document.createElement('div');
    fab.className = 'st-fab';
    fab.id = 'st-fab';
    fab.innerHTML = `
      <button id="st-search" aria-label="Cerca"><span>🔍</span><span class="st-tooltip">Cerca (Ctrl+K o /)</span></button>
      <button id="st-focus" aria-label="Focus"><span>🎯</span><span class="st-tooltip">Focus mode</span></button>
      <button id="st-tts" aria-label="Audio"><span>🔊</span><span class="st-tooltip">Leggi capitolo</span></button>
    `;
    document.body.appendChild(fab);

    const gs = buildGlobalSearch();
    document.getElementById('st-search').addEventListener('click', gs.open);

    document.getElementById('st-focus').addEventListener('click', () => {
      toggleFocus();
      document.getElementById('st-focus').classList.toggle('active');
    });

    document.getElementById('st-tts').addEventListener('click', () => {
      const btn = document.getElementById('st-tts');
      if (ttsActive) { stopTTS(); btn.classList.remove('active'); btn.querySelector('span:first-child').textContent = '🔊'; return; }
      const content = document.getElementById('chapter-content');
      if (!content) {
        if (window.Storage && Storage.showToast) Storage.showToast('Apri un capitolo prima');
        return;
      }
      const text = content.textContent;
      speak(text);
      btn.classList.add('active');
      btn.querySelector('span:first-child').textContent = '⏸';
      const checkEnd = setInterval(() => {
        if (!ttsActive) {
          btn.classList.remove('active');
          btn.querySelector('span:first-child').textContent = '🔊';
          clearInterval(checkEnd);
        }
      }, 500);
    });
  }

  function init() {
    buildFab();
  }

  return { init, recordMistake, clearMistakes, loadMistakes, searchAll, toggleFocus, speak };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.StudyTools) StudyTools.init();
});
