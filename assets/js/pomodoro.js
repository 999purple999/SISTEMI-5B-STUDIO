// Customizable Pomodoro timer — floating widget available on every page
window.Pomodoro = (function () {
  const STORAGE_KEY = 'sistemi5b.pomodoro.v1';
  const defaults = {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    cyclesBeforeLong: 4,
    soundEnabled: true,
    autoStartNext: false,
    notifications: false
  };

  let settings = load();
  let state = {
    phase: 'work',  // 'work' | 'short' | 'long'
    running: false,
    paused: false,
    remaining: settings.work * 60 * 1000,  // ms
    cycle: 0,
    completed: 0
  };
  let intervalId = null;
  let lastTick = 0;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return { ...defaults, ...(raw ? JSON.parse(raw) : {}) };
    } catch { return { ...defaults }; }
  }

  function saveSettings() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }

  function phaseDuration(phase) {
    if (phase === 'work') return settings.work * 60 * 1000;
    if (phase === 'short') return settings.shortBreak * 60 * 1000;
    if (phase === 'long') return settings.longBreak * 60 * 1000;
    return 0;
  }

  function phaseLabel(phase) {
    return phase === 'work' ? '🍅 Studio' : phase === 'short' ? '☕ Pausa breve' : '🌴 Pausa lunga';
  }

  function phaseColor(phase) {
    return phase === 'work' ? '#ff453a' : phase === 'short' ? '#0a84ff' : '#30d158';
  }

  function format(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function tick() {
    if (!state.running || state.paused) return;
    const now = Date.now();
    const dt = now - lastTick;
    lastTick = now;
    state.remaining -= dt;
    if (state.remaining <= 0) {
      finishPhase();
    }
    render();
  }

  function start() {
    if (state.running && !state.paused) return;
    state.running = true;
    state.paused = false;
    lastTick = Date.now();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(tick, 250);
    render();
  }

  function pause() {
    state.paused = true;
    render();
  }

  function resume() {
    state.paused = false;
    lastTick = Date.now();
    render();
  }

  function reset(phase) {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
    state.running = false;
    state.paused = false;
    state.phase = phase || 'work';
    state.remaining = phaseDuration(state.phase);
    render();
  }

  function finishPhase() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
    state.running = false;
    playBeep();
    notify();

    if (state.phase === 'work') {
      state.cycle++;
      state.completed++;
      // Award XP for a completed pomodoro
      if (window.Storage && Storage.set) {
        Storage.set(s => { s.xp = (s.xp || 0) + 25; return s; });
        if (window.Storage.showToast) Storage.showToast('🍅 +25 XP — Pomodoro completato!', 'xp');
      }
      const nextPhase = (state.cycle % settings.cyclesBeforeLong === 0) ? 'long' : 'short';
      state.phase = nextPhase;
      state.remaining = phaseDuration(nextPhase);
    } else {
      state.phase = 'work';
      state.remaining = phaseDuration('work');
    }

    if (settings.autoStartNext) {
      start();
    } else {
      render();
    }
  }

  function playBeep() {
    if (!settings.soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
      // second beep
      setTimeout(() => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = 'sine';
        o2.frequency.setValueAtTime(660, ctx.currentTime);
        g2.gain.setValueAtTime(0.25, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        o2.connect(g2); g2.connect(ctx.destination);
        o2.start();
        o2.stop(ctx.currentTime + 0.5);
      }, 400);
    } catch {}
  }

  function notify() {
    if (!settings.notifications) return;
    if (typeof Notification === 'undefined') return;
    if (Notification.permission !== 'granted') return;
    try {
      new Notification('Sistemi 5B', {
        body: state.phase === 'work' ? 'Pausa! Riposati 😌' : 'È ora di tornare a studiare 📚',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="22" fill="%23ff453a"/%3E%3C/svg%3E'
      });
    } catch {}
  }

  // ============ UI ============

  function injectStyles() {
    if (document.getElementById('pom-styles')) return;
    const css = `
.pom-fab {
  position: fixed; right: 16px; bottom: 16px; z-index: 90;
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, #ff453a, #ff7a73);
  color: #fff; border: none;
  font-size: 1.4rem; cursor: pointer;
  display: grid; place-items: center;
  box-shadow: 0 8px 24px rgba(255, 69, 58, 0.5);
  transition: all 0.25s var(--ease, ease);
}
.pom-fab:hover { transform: scale(1.08); }
.pom-fab.running {
  background: linear-gradient(135deg, #30d158, #5ee87f);
  box-shadow: 0 8px 24px rgba(48, 209, 88, 0.5);
  animation: pom-pulse 2s ease-in-out infinite;
}
@keyframes pom-pulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(48, 209, 88, 0.5); }
  50% { box-shadow: 0 12px 36px rgba(48, 209, 88, 0.9); }
}
.pom-fab .pom-fab-time {
  position: absolute;
  bottom: 100%; right: 0;
  margin-bottom: 6px;
  background: rgba(20,20,22,0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
}

.pom-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 200;
  display: none;
  align-items: flex-end;
  justify-content: center;
}
.pom-overlay.open { display: flex; animation: pom-fade 0.25s ease; }
@keyframes pom-fade { from { opacity: 0; } to { opacity: 1; } }
.pom-panel {
  background: linear-gradient(180deg, #1c1c1e 0%, #0a0a0c 100%);
  border-top: 1px solid rgba(255,255,255,0.12);
  border-radius: 22px 22px 0 0;
  width: 100%; max-width: 480px;
  padding: 1.5rem;
  max-height: 90vh; overflow-y: auto;
  animation: pom-slide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@media (min-width: 600px) {
  .pom-overlay { align-items: center; }
  .pom-panel { border-radius: 22px; }
}
@keyframes pom-slide {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.pom-close {
  background: none; border: none; color: #a1a1a6;
  font-size: 1.3rem; cursor: pointer; padding: 0.25rem 0.5rem;
  position: absolute; right: 1rem; top: 1rem;
}
.pom-close:hover { color: #fff; }
.pom-tabs { display: flex; gap: 0.4rem; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px; margin-bottom: 1.25rem; }
.pom-tab { flex: 1; background: transparent; border: none; color: #a1a1a6; padding: 0.55rem 0.5rem; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.pom-tab.active { background: rgba(255,255,255,0.12); color: #fff; }

.pom-display {
  text-align: center; padding: 1rem 0;
}
.pom-phase {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--phase-color, #ff453a);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.pom-time {
  font-size: 5rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  line-height: 1;
  background: linear-gradient(180deg, #fff 0%, #b0b0b8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.4rem 0;
}
.pom-cycle {
  color: #a1a1a6;
  font-size: 0.85rem;
}
.pom-controls {
  display: flex; gap: 0.6rem; justify-content: center;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}
.pom-btn {
  padding: 0.7rem 1.3rem; border-radius: 999px; border: none;
  font-weight: 600; cursor: pointer; font-family: inherit;
  font-size: 0.92rem;
  transition: all 0.2s;
}
.pom-btn-primary { background: var(--phase-color, #ff453a); color: #fff; }
.pom-btn-primary:hover { transform: scale(1.04); }
.pom-btn-secondary { background: rgba(255,255,255,0.1); color: #fff; }
.pom-btn-secondary:hover { background: rgba(255,255,255,0.18); }

.pom-progress {
  width: 100%; height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 99px; overflow: hidden;
  margin-top: 1.25rem;
}
.pom-progress-bar {
  height: 100%;
  background: var(--phase-color, #ff453a);
  border-radius: 99px;
  transition: width 0.5s linear;
}

.pom-settings { display: none; }
.pom-settings.show { display: block; }
.pom-display.hide { display: none; }

.pom-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  gap: 0.75rem;
}
.pom-row:last-child { border-bottom: none; }
.pom-row label { color: #fff; font-size: 0.95rem; font-weight: 500; }
.pom-row .pom-help {
  display: block;
  font-size: 0.78rem;
  color: #6e6e73;
  font-weight: 400;
  margin-top: 0.15rem;
}
.pom-stepper {
  display: flex; align-items: center; gap: 0.4rem;
  background: rgba(255,255,255,0.05);
  border-radius: 999px;
  padding: 4px;
}
.pom-stepper button {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: none; color: #fff; cursor: pointer;
  font-size: 1rem; display: grid; place-items: center;
}
.pom-stepper button:hover { background: rgba(255,255,255,0.18); }
.pom-stepper button:disabled { opacity: 0.3; cursor: not-allowed; }
.pom-stepper input {
  width: 56px; background: transparent; border: none; color: #fff;
  text-align: center; font-size: 1rem; font-weight: 700; font-variant-numeric: tabular-nums;
  font-family: inherit;
  -moz-appearance: textfield;
}
.pom-stepper input::-webkit-outer-spin-button,
.pom-stepper input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

.pom-toggle {
  position: relative;
  width: 48px; height: 28px;
  background: rgba(255,255,255,0.15);
  border-radius: 999px;
  cursor: pointer;
  border: none;
  transition: background 0.25s;
}
.pom-toggle::after {
  content: ""; position: absolute;
  width: 22px; height: 22px;
  background: #fff;
  border-radius: 50%;
  top: 3px; left: 3px;
  transition: transform 0.25s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.pom-toggle.on { background: #30d158; }
.pom-toggle.on::after { transform: translateX(20px); }
.pom-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.5rem; }
.pom-preset {
  padding: 0.5rem; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; color: #fff; cursor: pointer;
  font-size: 0.78rem; font-weight: 600; font-family: inherit;
  transition: all 0.2s;
}
.pom-preset:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); }
`;
    const style = document.createElement('style');
    style.id = 'pom-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function ensureUI() {
    injectStyles();
    if (document.getElementById('pom-fab')) return;

    const fab = document.createElement('button');
    fab.className = 'pom-fab';
    fab.id = 'pom-fab';
    fab.title = 'Pomodoro timer';
    fab.innerHTML = `<span>🍅</span><span class="pom-fab-time" id="pom-fab-time" style="display:none"></span>`;
    fab.addEventListener('click', open);
    document.body.appendChild(fab);

    const overlay = document.createElement('div');
    overlay.className = 'pom-overlay';
    overlay.id = 'pom-overlay';
    overlay.innerHTML = `
      <div class="pom-panel" role="dialog" aria-modal="true">
        <button class="pom-close" id="pom-close" aria-label="Chiudi">✕</button>
        <div class="pom-tabs">
          <button class="pom-tab active" data-tab="timer">Timer</button>
          <button class="pom-tab" data-tab="settings">⚙️ Impostazioni</button>
        </div>
        <div id="pom-display" class="pom-display">
          <div class="pom-phase" id="pom-phase">🍅 Studio</div>
          <div class="pom-time" id="pom-time">25:00</div>
          <div class="pom-cycle" id="pom-cycle">Sessione 1 di ${settings.cyclesBeforeLong}</div>
          <div class="pom-progress"><div class="pom-progress-bar" id="pom-prog" style="width:100%"></div></div>
          <div class="pom-controls" id="pom-controls"></div>
          <p style="margin-top:1.25rem; font-size:0.8rem; color:#6e6e73;">Completate <span id="pom-completed">0</span> sessioni di studio</p>
        </div>
        <div id="pom-settings" class="pom-settings">
          <div class="pom-row">
            <div>
              <label>Durata studio</label>
              <span class="pom-help">Minuti per ciclo Pomodoro</span>
            </div>
            <div class="pom-stepper" data-key="work">
              <button class="pom-dec">−</button>
              <input type="number" min="1" max="120" value="${settings.work}">
              <button class="pom-inc">+</button>
            </div>
          </div>
          <div class="pom-row">
            <div>
              <label>Pausa breve</label>
              <span class="pom-help">Tra una sessione e l'altra</span>
            </div>
            <div class="pom-stepper" data-key="shortBreak">
              <button class="pom-dec">−</button>
              <input type="number" min="1" max="60" value="${settings.shortBreak}">
              <button class="pom-inc">+</button>
            </div>
          </div>
          <div class="pom-row">
            <div>
              <label>Pausa lunga</label>
              <span class="pom-help">Dopo N sessioni di studio</span>
            </div>
            <div class="pom-stepper" data-key="longBreak">
              <button class="pom-dec">−</button>
              <input type="number" min="1" max="120" value="${settings.longBreak}">
              <button class="pom-inc">+</button>
            </div>
          </div>
          <div class="pom-row">
            <div>
              <label>Sessioni prima della pausa lunga</label>
              <span class="pom-help">Numero di Pomodori per ciclo</span>
            </div>
            <div class="pom-stepper" data-key="cyclesBeforeLong">
              <button class="pom-dec">−</button>
              <input type="number" min="1" max="10" value="${settings.cyclesBeforeLong}">
              <button class="pom-inc">+</button>
            </div>
          </div>
          <div class="pom-row">
            <div>
              <label>Suono di fine</label>
              <span class="pom-help">Beep al termine di ogni fase</span>
            </div>
            <button class="pom-toggle ${settings.soundEnabled ? 'on' : ''}" data-key="soundEnabled" aria-label="Sound"></button>
          </div>
          <div class="pom-row">
            <div>
              <label>Avvio automatico</label>
              <span class="pom-help">Inizia subito la fase successiva</span>
            </div>
            <button class="pom-toggle ${settings.autoStartNext ? 'on' : ''}" data-key="autoStartNext" aria-label="Auto"></button>
          </div>
          <div class="pom-row">
            <div>
              <label>Notifiche desktop</label>
              <span class="pom-help">Avvisi anche con la pagina in background</span>
            </div>
            <button class="pom-toggle ${settings.notifications ? 'on' : ''}" data-key="notifications" aria-label="Notif"></button>
          </div>

          <p style="margin:1rem 0 0.5rem; color:#a1a1a6; font-size:0.85rem; font-weight:600;">Preset</p>
          <div class="pom-presets">
            <button class="pom-preset" data-preset="classic">🎯 Classico<br>25/5/15</button>
            <button class="pom-preset" data-preset="long">🔥 Long<br>50/10/30</button>
            <button class="pom-preset" data-preset="short">⚡ Sprint<br>15/3/10</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });
    overlay.querySelector('#pom-close').addEventListener('click', close);
    overlay.querySelectorAll('.pom-tab').forEach(t => {
      t.addEventListener('click', () => {
        overlay.querySelectorAll('.pom-tab').forEach(b => b.classList.remove('active'));
        t.classList.add('active');
        const tab = t.dataset.tab;
        overlay.querySelector('#pom-display').classList.toggle('hide', tab !== 'timer');
        overlay.querySelector('#pom-settings').classList.toggle('show', tab === 'settings');
      });
    });

    // Steppers
    overlay.querySelectorAll('.pom-stepper').forEach(stepper => {
      const input = stepper.querySelector('input');
      const inc = stepper.querySelector('.pom-inc');
      const dec = stepper.querySelector('.pom-dec');
      const key = stepper.dataset.key;
      const min = parseInt(input.min);
      const max = parseInt(input.max);
      function update(v) {
        v = Math.max(min, Math.min(max, parseInt(v) || min));
        input.value = v;
        settings[key] = v;
        saveSettings();
        // If not running and on the relevant phase, refresh remaining
        if (!state.running) {
          if (key === 'work' && state.phase === 'work') state.remaining = phaseDuration('work');
          if (key === 'shortBreak' && state.phase === 'short') state.remaining = phaseDuration('short');
          if (key === 'longBreak' && state.phase === 'long') state.remaining = phaseDuration('long');
        }
        render();
      }
      inc.addEventListener('click', () => update(parseInt(input.value) + 1));
      dec.addEventListener('click', () => update(parseInt(input.value) - 1));
      input.addEventListener('change', () => update(input.value));
    });

    // Toggles
    overlay.querySelectorAll('.pom-toggle').forEach(t => {
      t.addEventListener('click', () => {
        const key = t.dataset.key;
        settings[key] = !settings[key];
        t.classList.toggle('on', settings[key]);
        saveSettings();
        if (key === 'notifications' && settings[key]) {
          if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
            Notification.requestPermission();
          }
        }
      });
    });

    // Presets
    overlay.querySelectorAll('.pom-preset').forEach(b => {
      b.addEventListener('click', () => {
        const p = b.dataset.preset;
        if (p === 'classic') Object.assign(settings, { work: 25, shortBreak: 5, longBreak: 15, cyclesBeforeLong: 4 });
        if (p === 'long')    Object.assign(settings, { work: 50, shortBreak: 10, longBreak: 30, cyclesBeforeLong: 3 });
        if (p === 'short')   Object.assign(settings, { work: 15, shortBreak: 3, longBreak: 10, cyclesBeforeLong: 4 });
        saveSettings();
        if (!state.running) reset(state.phase);
        // Refresh inputs
        overlay.querySelectorAll('.pom-stepper').forEach(s => {
          const k = s.dataset.key;
          s.querySelector('input').value = settings[k];
        });
      });
    });
  }

  function open() {
    ensureUI();
    document.getElementById('pom-overlay').classList.add('open');
    render();
  }

  function close() {
    const o = document.getElementById('pom-overlay');
    if (o) o.classList.remove('open');
  }

  function render() {
    const fab = document.getElementById('pom-fab');
    const fabTime = document.getElementById('pom-fab-time');
    if (fab) {
      fab.classList.toggle('running', state.running && !state.paused);
      if (state.running && fabTime) {
        fabTime.style.display = '';
        fabTime.textContent = format(state.remaining);
      } else if (fabTime) {
        fabTime.style.display = 'none';
      }
    }

    const overlay = document.getElementById('pom-overlay');
    if (!overlay || !overlay.classList.contains('open')) return;

    const color = phaseColor(state.phase);
    overlay.style.setProperty('--phase-color', color);

    const phaseEl = overlay.querySelector('#pom-phase');
    if (phaseEl) { phaseEl.textContent = phaseLabel(state.phase); phaseEl.style.color = color; }
    const timeEl = overlay.querySelector('#pom-time');
    if (timeEl) timeEl.textContent = format(state.remaining);
    const cycleEl = overlay.querySelector('#pom-cycle');
    if (cycleEl) cycleEl.textContent = `Sessione ${(state.cycle % settings.cyclesBeforeLong) + 1} di ${settings.cyclesBeforeLong}`;
    const prog = overlay.querySelector('#pom-prog');
    if (prog) {
      const pct = (state.remaining / phaseDuration(state.phase)) * 100;
      prog.style.width = pct + '%';
      prog.style.background = color;
    }
    const completedEl = overlay.querySelector('#pom-completed');
    if (completedEl) completedEl.textContent = state.completed;

    // Controls
    const controls = overlay.querySelector('#pom-controls');
    if (controls) {
      let html = '';
      if (!state.running) {
        html = `<button class="pom-btn pom-btn-primary" id="pom-start">▶ Avvia</button>
                <button class="pom-btn pom-btn-secondary" id="pom-skip">↪ Salta fase</button>
                <button class="pom-btn pom-btn-secondary" id="pom-reset">⟲ Reset</button>`;
      } else if (state.paused) {
        html = `<button class="pom-btn pom-btn-primary" id="pom-resume">▶ Riprendi</button>
                <button class="pom-btn pom-btn-secondary" id="pom-stop">⏹ Stop</button>`;
      } else {
        html = `<button class="pom-btn pom-btn-secondary" id="pom-pause">⏸ Pausa</button>
                <button class="pom-btn pom-btn-secondary" id="pom-stop">⏹ Stop</button>`;
      }
      controls.innerHTML = html;
      const $ = id => overlay.querySelector('#' + id);
      if ($('pom-start')) $('pom-start').addEventListener('click', start);
      if ($('pom-pause')) $('pom-pause').addEventListener('click', pause);
      if ($('pom-resume')) $('pom-resume').addEventListener('click', resume);
      if ($('pom-stop')) $('pom-stop').addEventListener('click', () => reset(state.phase));
      if ($('pom-reset')) $('pom-reset').addEventListener('click', () => reset('work'));
      if ($('pom-skip')) $('pom-skip').addEventListener('click', () => { state.remaining = 0; finishPhase(); });
    }
  }

  function init() {
    ensureUI();
    // FAB only initially; everything else loaded lazily
  }

  return { init, open, close, start, pause, reset };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.Pomodoro) Pomodoro.init();
});
