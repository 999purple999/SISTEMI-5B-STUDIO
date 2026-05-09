// =============================================================
// CUSTOMIZE PANEL — theme/bg/clock/font/accent picker
// Adds a small floating button (⚙) that opens a side drawer.
// All choices persisted via CyberFX.setCfg.
// =============================================================
window.Customize = (function () {
  const TZ_PRESETS = [
    { tz: 'Europe/Rome',        label: 'Roma' },
    { tz: 'Asia/Tokyo',         label: 'Tokyo' },
    { tz: 'America/New_York',   label: 'New York' },
    { tz: 'America/Los_Angeles',label: 'Los Angeles' },
    { tz: 'Europe/London',      label: 'Londra' },
    { tz: 'Europe/Berlin',      label: 'Berlino' },
    { tz: 'Asia/Shanghai',      label: 'Shanghai' },
    { tz: 'Asia/Dubai',         label: 'Dubai' },
    { tz: 'Australia/Sydney',   label: 'Sydney' },
    { tz: 'Pacific/Auckland',   label: 'Auckland' },
    { tz: 'America/Sao_Paulo',  label: 'San Paolo' },
    { tz: 'Africa/Cairo',       label: 'Il Cairo' },
    { tz: 'UTC',                label: 'UTC' }
  ];

  const THEMES = [
    { id: 'cyber-tokyo',   label: 'Cyber Tokyo',  swatch: ['#00d9ff', '#ff2a6d'] },
    { id: 'anime-sunset',  label: 'Anime Sunset', swatch: ['#ff71ce', '#b266ff'] },
    { id: 'hacker-green',  label: 'Hacker Green', swatch: ['#00ff41', '#00ddff'] },
    { id: 'apple-classic', label: 'Apple Classic',swatch: ['#0a84ff', '#ff453a'] }
  ];

  const BG = [
    { id: 'particles', label: 'Particelle reattive', desc: 'Punti che si attraggono al mouse' },
    { id: 'matrix',    label: 'Matrix Rain',         desc: 'Pioggia di caratteri katakana' },
    { id: 'grid',      label: 'Griglia pulsante',    desc: 'Reticolo neon morbido' },
    { id: 'off',       label: 'Spento',              desc: 'Nessuna animazione' }
  ];

  const ACCENTS = [
    null, '#00d9ff', '#00f0ff', '#01cdfe', '#5fefff',
    '#ff2a6d', '#ff71ce', '#b266ff', '#00ff41', '#ffba35'
  ];

  function injectStyle() {
    if (document.getElementById('cust-style')) return;
    const s = document.createElement('style');
    s.id = 'cust-style';
    s.textContent = `
      #cust-fab {
        position: fixed; right: 16px; bottom: 220px; z-index: 95;
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(8, 10, 30, 0.85);
        border: 1px solid rgba(0, 240, 255, 0.45);
        color: #00f0ff; font-size: 1.2rem; cursor: pointer;
        box-shadow: 0 0 18px rgba(0, 240, 255, 0.4);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      #cust-fab:hover { transform: rotate(60deg); box-shadow: 0 0 28px rgba(0, 240, 255, 0.7); }
      #cust-overlay {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(0, 0, 0, 0.55); backdrop-filter: blur(6px);
        display: none; justify-content: flex-end;
      }
      #cust-overlay.open { display: flex; }
      #cust-panel {
        width: min(420px, 92vw); height: 100vh;
        background: linear-gradient(180deg, rgba(8, 10, 30, 0.96), rgba(5, 5, 20, 0.98));
        border-left: 1px solid rgba(0, 240, 255, 0.30);
        box-shadow: -20px 0 50px rgba(0, 240, 255, 0.15);
        padding: 1.4rem 1.2rem; overflow-y: auto;
        font-family: 'Space Grotesk', system-ui, sans-serif;
        color: #e7faff;
        animation: custSlide 280ms ease;
      }
      @keyframes custSlide { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
      #cust-panel h3 {
        font-family: 'Chakra Petch', 'Orbitron', sans-serif;
        text-transform: uppercase; letter-spacing: 0.06em;
        color: #00f0ff; font-size: 1.05rem; margin-bottom: 1.4rem;
        padding-bottom: 0.6rem; border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        display: flex; justify-content: space-between; align-items: center;
      }
      #cust-panel h4 {
        font-family: 'Chakra Petch', sans-serif; text-transform: uppercase;
        letter-spacing: 0.08em; font-size: 0.74rem; color: #95b3c4;
        margin: 1.2rem 0 0.55rem;
      }
      #cust-panel button.cust-close {
        background: transparent; border: 1px solid rgba(0,240,255,0.25);
        border-radius: 8px; color: #95b3c4; padding: 0.18rem 0.5rem;
        font-family: inherit; font-size: 0.78rem; cursor: pointer;
      }
      .cust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
      .cust-card {
        background: rgba(0, 240, 255, 0.04);
        border: 1px solid rgba(0, 240, 255, 0.18);
        border-radius: 10px; padding: 0.6rem 0.7rem;
        cursor: pointer; transition: all 0.15s;
        font-size: 0.84rem; display: flex; flex-direction: column; gap: 4px;
      }
      .cust-card:hover { border-color: rgba(0,240,255,0.5); background: rgba(0,240,255,0.08); }
      .cust-card.active { border-color: #00f0ff; background: rgba(0,240,255,0.13); box-shadow: 0 0 14px rgba(0,240,255,0.3) inset; }
      .cust-card .small { color: #95b3c4; font-size: 0.7rem; }
      .cust-swatches { display: flex; gap: 4px; }
      .cust-sw { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); }
      .cust-row { display: flex; align-items: center; gap: 0.6rem; margin: 0.4rem 0; }
      .cust-row input[type=range] { flex: 1; accent-color: #00f0ff; }
      .cust-row label { font-size: 0.84rem; min-width: 90px; color: #95b3c4; }
      .cust-row .cust-val { font-family: 'JetBrains Mono', monospace; color: #00f0ff; min-width: 48px; text-align: right; font-size: 0.78rem; }
      .cust-tz {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 0.32rem 0.6rem; border-radius: 99px;
        background: rgba(0,240,255,0.06); border: 1px solid rgba(0,240,255,0.2);
        font-size: 0.78rem; cursor: pointer; margin: 3px 4px 3px 0;
        transition: all 0.15s;
      }
      .cust-tz.on { background: rgba(0,240,255,0.18); border-color: #00f0ff; color: #00f0ff; }
      .cust-tz:hover { border-color: rgba(0,240,255,0.5); }
      .cust-accent-row { display: flex; flex-wrap: wrap; gap: 6px; }
      .cust-accent {
        width: 28px; height: 28px; border-radius: 50%;
        cursor: pointer; border: 2px solid transparent;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      }
      .cust-accent.on { border-color: #fff; transform: scale(1.1); }
      .cust-accent.none {
        background: linear-gradient(135deg, transparent 45%, #ff2a6d 45%, #ff2a6d 55%, transparent 55%);
        border: 1px dashed rgba(255,255,255,0.4);
      }
      .cust-toggle {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.5rem 0.7rem;
        background: rgba(0,240,255,0.04); border: 1px solid rgba(0,240,255,0.18);
        border-radius: 10px; cursor: pointer; font-size: 0.86rem;
        margin-bottom: 0.4rem;
      }
      .cust-toggle .pill {
        width: 36px; height: 20px; border-radius: 99px;
        background: rgba(255,255,255,0.1); position: relative;
        transition: background 0.2s;
      }
      .cust-toggle .pill::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 16px; height: 16px; border-radius: 50%;
        background: #fff; transition: transform 0.2s;
      }
      .cust-toggle.on .pill { background: #00f0ff; }
      .cust-toggle.on .pill::after { transform: translateX(16px); }
      .cust-help {
        margin-top: 1.5rem; padding: 0.8rem 0.9rem;
        background: rgba(255, 184, 0, 0.05);
        border-left: 2px solid #ffb800;
        border-radius: 6px; font-size: 0.78rem; color: #d4b3a3;
        line-height: 1.5;
      }
      .cust-help code { background: rgba(255,184,0,0.1); padding: 1px 6px; border-radius: 4px; color: #ffd06b; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; }
    `;
    document.head.appendChild(s);
  }

  function build() {
    if (document.getElementById('cust-fab')) return;
    injectStyle();

    const fab = document.createElement('button');
    fab.id = 'cust-fab';
    fab.title = 'Personalizza';
    fab.innerHTML = '⚙';
    document.body.appendChild(fab);

    const overlay = document.createElement('div');
    overlay.id = 'cust-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    const panel = document.createElement('div');
    panel.id = 'cust-panel';
    overlay.appendChild(panel);

    fab.addEventListener('click', open);

    function open() { overlay.classList.add('open'); render(); }
    function close() { overlay.classList.remove('open'); }

    function render() {
      const c = CyberFX.getCfg();
      panel.innerHTML = `
        <h3>⚡ Personalizza <button class="cust-close">CHIUDI</button></h3>

        <h4>Tema</h4>
        <div class="cust-grid">
          ${THEMES.map(t => `
            <div class="cust-card ${c.theme === t.id ? 'active' : ''}" data-theme="${t.id}">
              <div style="font-weight:600;">${t.label}</div>
              <div class="cust-swatches">${t.swatch.map(s => `<span class="cust-sw" style="background:${s}"></span>`).join('')}</div>
            </div>
          `).join('')}
        </div>

        <h4>Background animato</h4>
        <div class="cust-grid">
          ${BG.map(b => `
            <div class="cust-card ${c.bg === b.id ? 'active' : ''}" data-bg="${b.id}">
              <div style="font-weight:600;">${b.label}</div>
              <div class="small">${b.desc}</div>
            </div>
          `).join('')}
        </div>

        <h4>Intensità FX</h4>
        <div class="cust-row">
          <label>Opacità</label>
          <input type="range" id="cust-int" min="0.1" max="1" step="0.05" value="${c.intensity}">
          <span class="cust-val" id="cust-int-val">${Math.round(c.intensity * 100)}%</span>
        </div>

        ${c.bg === 'matrix' ? `
          <h4>🌧️ Matrix Rain — Personalizzazione</h4>
          <p class="small" style="color:#95b3c4; font-size:0.74rem; margin-bottom:0.5rem;">Il colore deriva dal tema corrente. Velocità, densità e caratteri sono indipendenti.</p>
          <div class="cust-row">
            <label>Velocità</label>
            <input type="range" id="cust-mspeed" min="0.2" max="3" step="0.1" value="${c.matrixSpeed}">
            <span class="cust-val" id="cust-mspeed-val">${(+c.matrixSpeed).toFixed(1)}×</span>
          </div>
          <div class="cust-row">
            <label>Densità</label>
            <input type="range" id="cust-mdens" min="0.4" max="2" step="0.1" value="${c.matrixDensity}">
            <span class="cust-val" id="cust-mdens-val">${(+c.matrixDensity).toFixed(1)}×</span>
          </div>
          <div class="cust-row">
            <label>Lunghezza scia</label>
            <input type="range" id="cust-mtrail" min="0.04" max="0.30" step="0.01" value="${c.matrixTrail}">
            <span class="cust-val" id="cust-mtrail-val">${Math.round((1 - c.matrixTrail / 0.30) * 100)}%</span>
          </div>
          <div class="cust-row" style="flex-wrap:wrap;">
            <label style="min-width:90px;">Caratteri</label>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              ${['katakana','digits','hex','binary','mixed'].map(g => `
                <span class="cust-tz ${c.matrixGlyphs === g ? 'on' : ''}" data-mglyph="${g}">${g === 'katakana' ? '日本' : g === 'digits' ? '0-9' : g === 'hex' ? 'HEX' : g === 'binary' ? '01' : 'mix'}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <h4>Colore Accento</h4>
        <div class="cust-accent-row">
          ${ACCENTS.map(col => `
            <div class="cust-accent ${col === c.accent ? 'on' : ''} ${col === null ? 'none' : ''}" data-accent="${col || ''}" style="${col ? 'background:'+col+';box-shadow:0 0 10px '+col : ''}" title="${col || 'default'}"></div>
          `).join('')}
        </div>

        <h4>Logo 3D</h4>
        <div class="cust-toggle ${c.logo3d ? 'on' : ''}" data-toggle="logo3d">
          <span>Cubo S rotante 3D</span>
          <div class="pill"></div>
        </div>

        <h4>Orologio multi-fuso</h4>
        <div class="cust-toggle ${c.showClock ? 'on' : ''}" data-toggle="showClock">
          <span>Mostra orologio in alto</span>
          <div class="pill"></div>
        </div>
        <div style="margin-top:0.6rem;">
          ${TZ_PRESETS.map(z => `
            <span class="cust-tz ${c.timezones.includes(z.tz) ? 'on' : ''}" data-tz="${z.tz}">${z.label}</span>
          `).join('')}
        </div>
        <p class="small" style="color:#95b3c4; font-size:0.74rem; margin-top:0.4rem;">Tocca i fusi per attivarli/disattivarli (max 5 consigliato).</p>

        <div class="cust-help">
          <strong>💡 TTS realistico futuro:</strong><br>
          La lettura attuale usa Web Speech API del browser. Quando avrai la <code>RTX 5080</code>, potrai avviare un server TTS locale (vedi <code>docs_extracted/_TTS-FUTURE.md</code>) e impostare l'URL in <code>localStorage.tts.endpoint</code>: il sito userà voci AI iper-realistiche (XTTS-v2, F5-TTS, Piper) senza modifiche al codice.
        </div>
      `;

      panel.querySelector('.cust-close').addEventListener('click', close);

      panel.querySelectorAll('[data-theme]').forEach(el => {
        el.addEventListener('click', () => { CyberFX.setCfg({ theme: el.dataset.theme }); render(); });
      });
      panel.querySelectorAll('[data-bg]').forEach(el => {
        el.addEventListener('click', () => { CyberFX.setCfg({ bg: el.dataset.bg }); render(); });
      });
      panel.querySelector('#cust-int').addEventListener('input', e => {
        const v = parseFloat(e.target.value);
        const lbl = panel.querySelector('#cust-int-val');
        if (lbl) lbl.textContent = Math.round(v * 100) + '%';
        CyberFX.setCfg({ intensity: v });
      });

      // Matrix controls (presenti solo se bg=matrix)
      const mspeed = panel.querySelector('#cust-mspeed');
      if (mspeed) mspeed.addEventListener('input', e => {
        const v = parseFloat(e.target.value);
        panel.querySelector('#cust-mspeed-val').textContent = v.toFixed(1) + '×';
        CyberFX.setCfg({ matrixSpeed: v });
      });
      const mdens = panel.querySelector('#cust-mdens');
      if (mdens) mdens.addEventListener('input', e => {
        const v = parseFloat(e.target.value);
        panel.querySelector('#cust-mdens-val').textContent = v.toFixed(1) + '×';
        CyberFX.setCfg({ matrixDensity: v });
      });
      const mtrail = panel.querySelector('#cust-mtrail');
      if (mtrail) mtrail.addEventListener('input', e => {
        const v = parseFloat(e.target.value);
        panel.querySelector('#cust-mtrail-val').textContent = Math.round((1 - v / 0.30) * 100) + '%';
        CyberFX.setCfg({ matrixTrail: v });
      });
      panel.querySelectorAll('[data-mglyph]').forEach(el => {
        el.addEventListener('click', () => {
          CyberFX.setCfg({ matrixGlyphs: el.dataset.mglyph });
          render();
        });
      });

      panel.querySelectorAll('[data-accent]').forEach(el => {
        el.addEventListener('click', () => {
          CyberFX.setCfg({ accent: el.dataset.accent || null });
          render();
        });
      });
      panel.querySelectorAll('[data-toggle]').forEach(el => {
        el.addEventListener('click', () => {
          const k = el.dataset.toggle;
          const patch = {}; patch[k] = !CyberFX.getCfg()[k];
          CyberFX.setCfg(patch); render();
        });
      });
      panel.querySelectorAll('[data-tz]').forEach(el => {
        el.addEventListener('click', () => {
          const tz = el.dataset.tz;
          const cur = CyberFX.getCfg().timezones.slice();
          const i = cur.indexOf(tz);
          if (i >= 0) cur.splice(i, 1); else cur.push(tz);
          CyberFX.setCfg({ timezones: cur });
          render();
        });
      });
    }
  }

  function init() { build(); }
  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Customize.init());
