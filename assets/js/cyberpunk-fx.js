// =============================================================
// CYBERPUNK FX — interactive background, 3D logo, multi-zone clock
// All effects respect prefers-reduced-motion and can be toggled
// from the Customize panel (assets/js/customize.js).
// =============================================================
window.CyberFX = (function () {
  const KEY = 'sistemi5b.cyberfx.v1';
  const DEFAULTS = {
    theme: 'cyber-tokyo',          // cyber-tokyo | anime-sunset | hacker-green | apple-classic
    bg: 'particles',               // particles | matrix | grid | off
    intensity: 0.7,                // 0..1 — opacity / density
    logo3d: true,                  // 3D rotating S-cube
    accent: null,                  // override CSS var --accent (hex)
    timezones: ['Europe/Rome', 'Asia/Tokyo', 'America/New_York'],
    showClock: true,
    // Matrix rain — velocità/densità/caratteri (colore deriva dal tema)
    matrixSpeed: 1.0,              // 0.2 (lento) .. 3 (veloce)
    matrixDensity: 1.0,            // 0.4 (rado) .. 2 (denso) — moltiplica n. colonne
    matrixGlyphs: 'katakana',      // katakana | digits | hex | mixed | binary
    matrixTrail: 0.10              // 0.05 (lunga scia) .. 0.30 (scia corta) — alpha overlay
  };

  const MATRIX_GLYPHSETS = {
    katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ',
    digits:   '0123456789',
    hex:      '0123456789ABCDEF',
    binary:   '01',
    mixed:    'アイウエオカキクケコ0123456789ABCDEF<>{}/\\|=+-*'
  };

  function loadCfg() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return Object.assign({}, DEFAULTS, saved);
    } catch { return Object.assign({}, DEFAULTS); }
  }
  function saveCfg(cfg) {
    try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch {}
  }
  let cfg = loadCfg();
  function getCfg() { return Object.assign({}, cfg); }
  function setCfg(patch) {
    cfg = Object.assign({}, cfg, patch);
    saveCfg(cfg);
    applyTheme();
    rebuildBg();
    rebuildClock();
    rebuildLogo();
  }

  // ========== THEME ==========
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', cfg.theme || 'cyber-tokyo');
    if (cfg.accent) {
      document.documentElement.style.setProperty('--accent', cfg.accent);
      document.documentElement.style.setProperty('--neon-cyan', cfg.accent);
    } else {
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--neon-cyan');
    }
  }

  // ========== INTERACTIVE BACKGROUND ==========
  let bgCanvas = null, bgCtx = null, bgRaf = null, bgCleanup = null;

  function ensureCanvas() {
    if (bgCanvas) return bgCanvas;
    bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'cf-bg';
    bgCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;opacity:0;transition:opacity 600ms ease;';
    document.body.appendChild(bgCanvas);
    bgCtx = bgCanvas.getContext('2d');
    return bgCanvas;
  }
  function destroyBg() {
    if (bgRaf) cancelAnimationFrame(bgRaf);
    if (bgCleanup) bgCleanup();
    bgCleanup = null;
    if (bgCanvas) { bgCanvas.style.opacity = '0'; }
  }
  function rebuildBg() {
    destroyBg();
    if (cfg.bg === 'off') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    ensureCanvas();
    bgCanvas.style.opacity = String(Math.min(1, Math.max(0, cfg.intensity || 0.7)));
    if (cfg.bg === 'matrix') startMatrix();
    else if (cfg.bg === 'grid') startGrid();
    else startParticles();
  }

  function fitCanvas() {
    if (!bgCanvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    bgCanvas.width = innerWidth * dpr;
    bgCanvas.height = innerHeight * dpr;
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getNeon() {
    const cs = getComputedStyle(document.documentElement);
    return {
      cyan: cs.getPropertyValue('--neon-cyan').trim() || '#00d9ff',
      pink: cs.getPropertyValue('--neon-pink').trim() || '#ff2a6d',
      violet: cs.getPropertyValue('--neon-violet').trim() || '#b026ff',
      amber: cs.getPropertyValue('--neon-amber').trim() || '#ffb800'
    };
  }

  // --- particles + lines (default, "non-cringe") ---
  function startParticles() {
    fitCanvas();
    const onResize = () => fitCanvas();
    addEventListener('resize', onResize, { passive: true });

    const N = Math.max(30, Math.min(70, Math.floor((innerWidth * innerHeight) / 38000)));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6
    }));

    const mouse = { x: -1e6, y: -1e6, on: false };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('mouseleave', onLeave, { passive: true });
    addEventListener('touchmove', (e) => { if (e.touches[0]) onMove(e.touches[0]); }, { passive: true });

    const link = 130;
    const colors = getNeon();

    function frame() {
      bgCtx.clearRect(0, 0, innerWidth, innerHeight);

      for (const p of pts) {
        if (mouse.on) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            const f = 0.0018 / Math.max(0.05, Math.sqrt(d2) / 150);
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = innerWidth + 10;
        if (p.x > innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = innerHeight + 10;
        if (p.y > innerHeight + 10) p.y = -10;
      }

      // lines between near points
      bgCtx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < link * link) {
            const a = 1 - Math.sqrt(d2) / link;
            bgCtx.strokeStyle = `rgba(0, 240, 255, ${a * 0.35})`;
            bgCtx.beginPath();
            bgCtx.moveTo(pts[i].x, pts[i].y);
            bgCtx.lineTo(pts[j].x, pts[j].y);
            bgCtx.stroke();
          }
        }
      }
      // dots
      for (const p of pts) {
        bgCtx.fillStyle = colors.cyan;
        bgCtx.shadowColor = colors.cyan;
        bgCtx.shadowBlur = 6;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        bgCtx.fill();
      }
      bgCtx.shadowBlur = 0;
      bgRaf = requestAnimationFrame(frame);
    }
    frame();
    bgCleanup = () => {
      removeEventListener('resize', onResize);
      removeEventListener('mousemove', onMove);
      removeEventListener('mouseleave', onLeave);
    };
  }

  // --- matrix rain (opt-in, denser) ---
  // colore = tema corrente (--neon-cyan per cyber, --neon-pink per anime, --accent per hacker-green)
  // parametri customizzabili: matrixSpeed, matrixDensity, matrixGlyphs, matrixTrail
  function startMatrix() {
    fitCanvas();
    const fontSize = 16;
    const cs = getComputedStyle(document.documentElement);
    const themeBg = cs.getPropertyValue('--bg').trim() || '#050514';
    function rgbaFromHex(hex, alpha) {
      const h = (hex || '#050514').replace('#', '');
      const v = h.length === 3 ? h.split('').map(c => c+c).join('') : h;
      const r = parseInt(v.slice(0,2), 16), g = parseInt(v.slice(2,4), 16), b = parseInt(v.slice(4,6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    function recompute() {
      fitCanvas();
      const density = Math.max(0.4, Math.min(2, cfg.matrixDensity || 1));
      columns = Math.floor((innerWidth / fontSize) * density);
      drops = new Array(columns).fill(0).map(() => Math.random() * (innerHeight / fontSize));
    }
    const onResize = () => recompute();
    addEventListener('resize', onResize, { passive: true });
    let columns, drops;
    recompute();
    const chars = MATRIX_GLYPHSETS[cfg.matrixGlyphs] || MATRIX_GLYPHSETS.katakana;
    function frame() {
      const trail = Math.max(0.04, Math.min(0.4, cfg.matrixTrail || 0.10));
      bgCtx.fillStyle = rgbaFromHex(themeBg, trail);
      bgCtx.fillRect(0, 0, innerWidth, innerHeight);
      const colors = getNeon();
      const accent = cs.getPropertyValue('--accent').trim() || colors.cyan;
      const speed = Math.max(0.2, Math.min(3, cfg.matrixSpeed || 1));
      bgCtx.font = fontSize + "px 'JetBrains Mono', monospace";
      const colCount = columns;
      const colWidth = innerWidth / colCount;
      for (let i = 0; i < colCount; i++) {
        const ch = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * colWidth;
        const y = drops[i] * fontSize;
        // Punta luminosa (testa della goccia) + scia tinta tema
        bgCtx.fillStyle = '#ffffff';
        bgCtx.fillText(ch, x, y);
        bgCtx.fillStyle = accent;
        bgCtx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), x, y - fontSize);
        if (y > innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speed;
      }
      bgRaf = requestAnimationFrame(frame);
    }
    frame();
    bgCleanup = () => removeEventListener('resize', onResize);
  }

  // --- grid pulse (subtle) ---
  function startGrid() {
    fitCanvas();
    const onResize = () => fitCanvas();
    addEventListener('resize', onResize, { passive: true });
    const colors = getNeon();
    let t = 0;
    function frame() {
      t += 0.008;
      bgCtx.clearRect(0, 0, innerWidth, innerHeight);
      const step = 50 + 6 * Math.sin(t);
      bgCtx.strokeStyle = `rgba(0, 240, 255, ${0.05 + 0.04 * (Math.sin(t * 2) * 0.5 + 0.5)})`;
      bgCtx.lineWidth = 1;
      for (let x = 0; x < innerWidth; x += step) {
        bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, innerHeight); bgCtx.stroke();
      }
      for (let y = 0; y < innerHeight; y += step) {
        bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(innerWidth, y); bgCtx.stroke();
      }
      bgRaf = requestAnimationFrame(frame);
    }
    frame();
    bgCleanup = () => removeEventListener('resize', onResize);
  }

  // ========== 3D LOGO (CSS cube + matrix shimmer) ==========
  function rebuildLogo() {
    const style = ensureLogoStyle();
    const brand = document.querySelector('.brand-logo');
    if (!brand) return;
    if (!cfg.logo3d) { brand.classList.remove('cf-logo3d'); brand.innerHTML = 'S'; return; }
    if (brand.classList.contains('cf-logo3d')) return;
    brand.classList.add('cf-logo3d');
    brand.innerHTML = `
      <div class="cf-cube">
        <span class="cf-face cf-front">S</span>
        <span class="cf-face cf-back">⌬</span>
        <span class="cf-face cf-right">5</span>
        <span class="cf-face cf-left">B</span>
        <span class="cf-face cf-top">/</span>
        <span class="cf-face cf-bot">\\</span>
      </div>
    `;
  }
  function ensureLogoStyle() {
    if (document.getElementById('cf-logo-style')) return;
    const s = document.createElement('style');
    s.id = 'cf-logo-style';
    s.textContent = `
      .cf-logo3d { perspective: 200px; background: transparent !important; box-shadow: none !important; }
      .cf-cube { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: cfSpin 10s linear infinite; }
      .cf-face {
        position: absolute; inset: 0; display: grid; place-items: center;
        font-family: 'Chakra Petch','Orbitron',monospace; font-weight: 800; font-size: 0.9rem;
        background: linear-gradient(135deg, rgba(0,240,255,0.6), rgba(255,42,109,0.6));
        border: 1px solid rgba(0,240,255,0.8);
        color: #001018;
        text-shadow: 0 0 4px rgba(255,255,255,0.6);
        backface-visibility: hidden;
      }
      .cf-front { transform: translateZ(16px); }
      .cf-back  { transform: rotateY(180deg) translateZ(16px); }
      .cf-right { transform: rotateY(90deg)  translateZ(16px); }
      .cf-left  { transform: rotateY(-90deg) translateZ(16px); }
      .cf-top   { transform: rotateX(90deg)  translateZ(16px); }
      .cf-bot   { transform: rotateX(-90deg) translateZ(16px); }
      @keyframes cfSpin {
        0%   { transform: rotateX(0)    rotateY(0); }
        100% { transform: rotateX(360deg) rotateY(360deg); }
      }
      @media (prefers-reduced-motion: reduce) { .cf-cube { animation: none; } }
    `;
    document.head.appendChild(s);
  }

  // ========== MULTI-ZONE CLOCK ==========
  let clockTick = null;
  function rebuildClock() {
    if (clockTick) { clearInterval(clockTick); clockTick = null; }
    const old = document.getElementById('cf-clock');
    if (old) old.remove();
    if (!cfg.showClock || !cfg.timezones || cfg.timezones.length === 0) return;
    if (!document.getElementById('cf-clock-style')) {
      const s = document.createElement('style');
      s.id = 'cf-clock-style';
      s.textContent = `
        #cf-clock {
          position: fixed; right: 16px; top: 76px; z-index: 80;
          background: rgba(5, 5, 20, 0.78);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 240, 255, 0.30);
          border-radius: 12px; padding: 0.45rem 0.75rem;
          font-family: 'JetBrains Mono', monospace; color: #6bf0ff;
          font-size: 0.74rem;
          box-shadow: 0 0 18px rgba(0, 240, 255, 0.18), inset 0 0 14px rgba(0, 240, 255, 0.04);
          display: flex; flex-direction: column; gap: 2px;
          min-width: 138px;
        }
        #cf-clock .cf-clock-row { display: flex; justify-content: space-between; gap: 0.6rem; }
        #cf-clock .cf-clock-tz { color: #95b3c4; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.65rem; }
        #cf-clock .cf-clock-time { color: #00f0ff; text-shadow: 0 0 6px rgba(0,240,255,0.6); }
        @media (max-width: 640px) { #cf-clock { right: 8px; top: 70px; padding: 0.3rem 0.55rem; font-size: 0.66rem; min-width: 110px; } }
      `;
      document.head.appendChild(s);
    }
    const box = document.createElement('div');
    box.id = 'cf-clock';
    document.body.appendChild(box);
    function fmt(tz) {
      try {
        return new Intl.DateTimeFormat('it-IT', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz }).format(new Date());
      } catch { return '--:--:--'; }
    }
    function shortTz(tz) { return (tz.split('/').pop() || tz).replace(/_/g, ' '); }
    function render() {
      box.innerHTML = cfg.timezones.map(tz => `
        <div class="cf-clock-row">
          <span class="cf-clock-tz">${shortTz(tz)}</span>
          <span class="cf-clock-time">${fmt(tz)}</span>
        </div>
      `).join('');
    }
    render();
    clockTick = setInterval(render, 1000);
  }

  // ========== INIT ==========
  function init() {
    applyTheme();
    rebuildBg();
    rebuildLogo();
    rebuildClock();
  }

  return { init, getCfg, setCfg, DEFAULTS };
})();

document.addEventListener('DOMContentLoaded', () => CyberFX.init());
