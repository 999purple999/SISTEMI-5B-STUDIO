// Reading progress bar + estimated reading time + scroll-spy
window.ReadingBar = (function () {
  function inject() {
    if (document.getElementById('rb-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'rb-bar';
    bar.style.cssText = 'position:fixed; top:0; left:0; right:0; height:3px; background:transparent; z-index:101; pointer-events:none;';
    bar.innerHTML = '<div id="rb-fill" style="height:100%; width:0%; background:linear-gradient(90deg, #ff453a, #ff9f0a, #30d158, #0a84ff); transition:width 0.1s linear;"></div>';
    document.body.appendChild(bar);

    const style = document.createElement('style');
    style.textContent = `
      .rb-meta { display:flex; gap:1rem; flex-wrap:wrap; font-size:0.8rem; color:var(--text-muted); margin-top:0.6rem; }
      .rb-meta span { display:inline-flex; align-items:center; gap:0.3rem; }
    `;
    document.head.appendChild(style);
  }

  function estimateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 230));
    return { minutes, words };
  }

  function showMeta(content) {
    const header = document.getElementById('chapter-header');
    if (!header || header.querySelector('.rb-meta')) return;
    const text = content.textContent || '';
    const { minutes, words } = estimateReadingTime(text);
    const div = document.createElement('div');
    div.className = 'rb-meta';
    div.innerHTML = `
      <span>⏱️ ~${minutes} min lettura</span>
      <span>📝 ${words} parole</span>
      <span id="rb-pct">📖 0% letto</span>
    `;
    header.appendChild(div);
  }

  function track() {
    let lastSeen = 0;
    const fill = document.getElementById('rb-fill');
    const pctEl = document.getElementById('rb-pct');
    function onScroll() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      if (fill) fill.style.width = pct + '%';
      if (pctEl) pctEl.textContent = `📖 ${Math.round(pct)}% letto`;
      // Save last position per chapter
      if (Math.abs(pct - lastSeen) > 5) {
        lastSeen = pct;
        try {
          const m = location.pathname.match(/\/chapters\/([^./]+)\.html/);
          if (m) {
            const map = JSON.parse(localStorage.getItem('sistemi5b.lastpos') || '{}');
            map[m[1]] = { pct: Math.round(pct), t: Date.now() };
            localStorage.setItem('sistemi5b.lastpos', JSON.stringify(map));
          }
        } catch {}
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    inject();
    // Wait for content to be rendered
    const tryAttach = () => {
      const content = document.getElementById('chapter-content');
      if (content && content.children.length > 0) {
        showMeta(content);
        track();
      } else {
        setTimeout(tryAttach, 200);
      }
    };
    tryAttach();
  }

  return { init, estimateReadingTime };
})();
document.addEventListener('DOMContentLoaded', () => { if (window.ReadingBar) ReadingBar.init(); });
