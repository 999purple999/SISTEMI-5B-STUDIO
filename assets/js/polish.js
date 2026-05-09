// POLISH — back-to-top, swipe between chapters, print CSS injection
window.Polish = (function () {

  // ============ BACK TO TOP ============
  function buildBackTop() {
    if (document.getElementById('btt')) return;
    const b = document.createElement('button');
    b.id = 'btt';
    b.title = 'Torna su';
    b.innerHTML = '↑';
    b.style.cssText = `
      position: fixed; right: 16px; bottom: 290px; z-index: 90;
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(8, 10, 30, 0.85); color: #00f0ff;
      border: 1px solid rgba(0,240,255,0.45);
      font-size: 1.2rem; cursor: pointer;
      box-shadow: 0 0 18px rgba(0,240,255,0.4);
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
    `;
    document.body.appendChild(b);
    b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    let lastShown = false;
    addEventListener('scroll', () => {
      const show = scrollY > 600;
      if (show === lastShown) return;
      lastShown = show;
      b.style.opacity = show ? '1' : '0';
      b.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });
  }

  // ============ SWIPE BETWEEN CHAPTERS ============
  // Uses the prev/next nav already built by chapter.js (#prev-next)
  function setupSwipe() {
    const nav = document.getElementById('prev-next');
    if (!nav) return;
    const prev = nav.querySelector('a:first-child[href]');
    const next = nav.querySelector('a:last-child[href]');
    let startX = 0, startY = 0, ok = false;
    addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; ok = true;
    }, { passive: true });
    addEventListener('touchend', (e) => {
      if (!ok || !e.changedTouches || !e.changedTouches[0]) return;
      ok = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dy) > 50) return; // scroll verticale
      if (Math.abs(dx) < 90) return; // troppo corto
      if (dx > 0 && prev && prev.getAttribute('href')) location.href = prev.getAttribute('href');
      if (dx < 0 && next && next.getAttribute('href')) location.href = next.getAttribute('href');
    }, { passive: true });
  }

  // ============ PRINT BUTTON + CSS ============
  function setupPrint() {
    if (!document.getElementById('chapter-content')) return;
    if (document.getElementById('print-style')) return;
    const css = document.createElement('style');
    css.id = 'print-style';
    css.textContent = `
      @media print {
        body { background: #fff !important; color: #000 !important; }
        body::before, .navbar, footer, .pom-fab, #st-fab, #cust-fab, #btt, #cf-clock, #cf-bg,
        .reset-zone, .quiz-section, .quiz-actions, #prev-next, #toc, .breadcrumb, #print-btn,
        .nav-toggle, .nav-links { display: none !important; }
        .container { max-width: 100% !important; padding: 0 !important; }
        .chapter-content { color: #000 !important; max-width: 100% !important; font-size: 11pt; line-height: 1.45; }
        .chapter-content h1, .chapter-content h2, .chapter-content h3, .chapter-title { color: #000 !important; page-break-after: avoid; }
        .chapter-content p, .chapter-content li { color: #222 !important; }
        .info-box { background: #f5f5f5 !important; border: 1px solid #aaa !important; color: #000 !important; page-break-inside: avoid; }
        .term { color: #000 !important; font-weight: 700; text-shadow: none !important; }
        table { background: #fff !important; border-collapse: collapse; page-break-inside: avoid; }
        table, th, td { border: 1px solid #888 !important; color: #000 !important; }
        th { background: #ddd !important; color: #000 !important; }
        code, pre, .formula { background: #f0f0f0 !important; color: #000 !important; border: 1px solid #ccc; font-family: 'Courier New', monospace; }
        .mermaid svg { max-width: 100% !important; height: auto !important; }
        a { color: #000 !important; text-decoration: none !important; }
        a[href]:after { content: "" !important; }
        @page { margin: 1.5cm; }
      }
    `;
    document.head.appendChild(css);

    if (document.getElementById('chapter-content')) {
      const btn = document.createElement('button');
      btn.id = 'print-btn';
      btn.className = 'btn btn-secondary btn-sm';
      btn.innerHTML = '🖨️ Stampa';
      btn.style.cssText = 'margin-left: 8px;';
      const bc = document.querySelector('.breadcrumb');
      if (bc) bc.appendChild(btn);
      btn.addEventListener('click', () => {
        // Forza render Mermaid prima della stampa
        if (window.mermaid) try { window.mermaid.run({ querySelector: '.mermaid' }); } catch {}
        setTimeout(() => window.print(), 250);
      });
    }
  }

  // ============ NAV UPGRADE — auto-add new pages link if missing ============
  function upgradeNav() {
    const links = document.getElementById('nav-links');
    if (!links) return;
    const has = (name) => !!links.querySelector(`a[href*="${name}"]`);
    const isChap = location.pathname.includes('/chapters/');
    const base = isChap ? '' : 'chapters/';
    const adds = [
      { href: `${base}mindmap.html`, label: '🧠', title: 'Mind Map' },
      { href: `${base}tools.html`, label: '🛠️', title: 'Tools' },
      { href: `${base}glossario.html`, label: '📖', title: 'Glossario' }
    ];
    for (const a of adds) {
      if (has(a.href.split('/').pop())) continue;
      const li = document.createElement('li');
      li.innerHTML = `<a href="${a.href}" title="${a.title}">${a.label}</a>`;
      links.appendChild(li);
    }
  }

  function init() {
    buildBackTop();
    setupSwipe();
    setupPrint();
    upgradeNav();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Polish.init());
