// Final Exam mode — mixes questions from all chapters
window.ExamApp = (function () {
  let state = null;
  let timerInterval = null;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function collectQuestions(modFilter) {
    const all = [];
    (window.MODULES || []).forEach(m => {
      if (modFilter && !modFilter.includes(m.id)) return;
      m.chapters.forEach(c => {
        const ch = (window.CHAPTERS || {})[c.id];
        if (ch && ch.quiz) {
          ch.quiz.forEach(q => all.push({ ...q, chapter: c.title, mod: m.id }));
        }
      });
    });
    return all;
  }

  function startExam(opts) {
    const all = collectQuestions(opts.mods);
    if (all.length === 0) {
      alert('Nessuna domanda disponibile.');
      return;
    }
    const questions = shuffle(all).slice(0, opts.count);
    state = {
      questions, idx: 0, score: 0, answers: [],
      total: questions.length,
      startedAt: Date.now(),
      duration: opts.duration * 60 * 1000, // ms
      ended: false
    };
    paint();
    startTimer();
  }

  function startTimer() {
    const tick = () => {
      if (!state || state.ended) return;
      const left = state.duration - (Date.now() - state.startedAt);
      const el = document.getElementById('exam-timer');
      if (!el) return;
      if (left <= 0) {
        endExam();
        return;
      }
      const mm = Math.floor(left / 60000);
      const ss = Math.floor((left % 60000) / 1000);
      el.textContent = `${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
      el.style.color = left < 60000 ? 'var(--error)' : '';
    };
    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function paint() {
    const root = document.getElementById('exam-root');
    if (!state || state.ended) return;
    if (state.idx >= state.total) {
      endExam();
      return;
    }
    const q = state.questions[state.idx];
    const opts = q.a.map((opt, i) => ({ text: opt, idx: i }));
    const shuffledOpts = shuffle(opts);
    const correctIdx = shuffledOpts.findIndex(o => o.idx === q.correct);
    const pct = Math.round((state.idx / state.total) * 100);

    root.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">
          <span class="quiz-counter">📝 ${state.idx + 1}/${state.total}</span>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
          <span class="quiz-counter" id="exam-timer" style="font-variant-numeric:tabular-nums; font-weight:700;">--:--</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.6rem; text-transform:uppercase; letter-spacing:0.05em;">${q.chapter}</div>
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options" id="qopts">
          ${shuffledOpts.map((opt, i) => `
            <button class="quiz-option" data-idx="${i}" data-correct="${i === correctIdx}">
              <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="qfb"></div>
        <div class="quiz-actions">
          <button class="btn btn-ghost btn-sm" id="qskip">Salta</button>
          <button class="btn btn-primary btn-sm" id="qnext" disabled>Prossima →</button>
        </div>
        <p style="text-align:center; margin-top:1rem; font-size:0.78rem; color:var(--text-muted);">Tasti: 1-4 per rispondere · Enter per andare avanti</p>
      </div>
    `;

    const optsBtns = root.querySelectorAll('.quiz-option');
    const next = root.querySelector('#qnext');
    const skip = root.querySelector('#qskip');
    const fb = root.querySelector('#qfb');
    let answered = false;

    function answerWith(btn) {
      if (answered) return;
      answered = true;
      const isCorrect = btn.dataset.correct === 'true';
      optsBtns.forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else if (b === btn) b.classList.add('wrong');
      });
      if (isCorrect) {
        state.score++;
        fb.className = 'quiz-feedback show right';
        fb.innerHTML = `<strong>✅ Corretto!</strong> ${q.explain || ''}`;
      } else {
        fb.className = 'quiz-feedback show wrong';
        fb.innerHTML = `<strong>❌ Sbagliato.</strong> ${q.explain || ''}`;
      }
      state.answers.push({ q: q.q, correct: isCorrect, mod: q.mod });
      next.disabled = false;
      next.focus();
    }

    optsBtns.forEach(btn => btn.addEventListener('click', () => answerWith(btn)));
    next.addEventListener('click', () => { state.idx++; paint(); });
    skip.addEventListener('click', () => { state.answers.push({ q: q.q, correct: false, mod: q.mod, skipped: true }); state.idx++; paint(); });

    // Keyboard shortcuts
    document.onkeydown = (e) => {
      if (e.key >= '1' && e.key <= String(optsBtns.length)) {
        const i = parseInt(e.key, 10) - 1;
        if (optsBtns[i]) answerWith(optsBtns[i]);
      } else if (e.key === 'Enter' && !next.disabled) {
        next.click();
      }
    };
  }

  function endExam() {
    if (!state || state.ended) return;
    state.ended = true;
    if (timerInterval) clearInterval(timerInterval);
    document.onkeydown = null;

    const root = document.getElementById('exam-root');
    const pct = Math.round((state.score / state.total) * 100);
    const elapsed = Math.round((Date.now() - state.startedAt) / 1000);
    const mm = Math.floor(elapsed / 60); const ss = elapsed % 60;

    let grade, msg;
    if (pct >= 90) { grade = '10'; msg = '🌟 Eccellente! Sei pronto per l\'esame.'; }
    else if (pct >= 80) { grade = '9'; msg = '💪 Ottimo lavoro!'; }
    else if (pct >= 70) { grade = '8'; msg = '👍 Buono. Ripassa i punti deboli.'; }
    else if (pct >= 60) { grade = '7'; msg = '📚 Sufficiente. Continua a studiare.'; }
    else if (pct >= 50) { grade = '6'; msg = '⚠️ Appena sufficiente. Concentrati sulle aree da rinforzare.'; }
    else { grade = '< 6'; msg = '🔥 Devi ancora ripassare. Riprova!'; }

    // Stats per modulo
    const perMod = {};
    state.answers.forEach(a => {
      perMod[a.mod] = perMod[a.mod] || { ok: 0, tot: 0 };
      perMod[a.mod].tot++;
      if (a.correct) perMod[a.mod].ok++;
    });
    const modStats = Object.entries(perMod).map(([id, s]) => {
      const m = (window.MODULES || []).find(mm => mm.id === parseInt(id));
      return `<li>${m ? m.num : 'Mod ' + id}: <strong>${s.ok}/${s.tot}</strong> (${Math.round(s.ok/s.tot*100)}%)</li>`;
    }).join('');

    // XP bonus from exam
    Storage.set(s => { s.xp += state.score * 10; return s; });
    if (pct === 100) confetti();

    root.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-result">
          <div class="quiz-result-score">${state.score}/${state.total}</div>
          <div class="quiz-result-pct">${pct}% — voto: ${grade}</div>
          <div class="quiz-result-msg">${msg}</div>
          <p style="color:var(--text-dim); margin-top:0.5rem;">⏱ Tempo: ${mm}m ${ss}s · +${state.score * 10} XP</p>
          <ul style="display:inline-block; text-align:left; margin-top:1rem; color:var(--text-dim); font-size:0.92rem;">
            ${modStats}
          </ul>
          <div style="display:flex; gap:0.6rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
            <button class="btn btn-primary" onclick="location.reload()">🔁 Nuovo esame</button>
            <a href="../index.html" class="btn btn-secondary">🏠 Home</a>
          </div>
        </div>
      </div>
    `;
  }

  // Confetti effect
  function confetti() {
    const cnv = document.createElement('canvas');
    cnv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
    cnv.width = innerWidth; cnv.height = innerHeight;
    document.body.appendChild(cnv);
    const ctx = cnv.getContext('2d');
    const colors = ['#ff453a','#ff9f0a','#ffd60a','#30d158','#0a84ff','#bf5af2','#ff375f'];
    const parts = [];
    for (let i = 0; i < 200; i++) {
      parts.push({
        x: innerWidth/2, y: innerHeight/2,
        vx: (Math.random()-0.5) * 30,
        vy: Math.random() * -25 - 5,
        g: 0.6,
        c: colors[i % colors.length],
        s: Math.random() * 8 + 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random()-0.5) * 0.3
      });
    }
    let t = 0;
    function step() {
      t++;
      ctx.clearRect(0, 0, cnv.width, cnv.height);
      parts.forEach(p => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s * 0.7);
        ctx.restore();
      });
      if (t < 200) requestAnimationFrame(step);
      else cnv.remove();
    }
    step();
  }

  function setup() {
    const startBtn = document.getElementById('start-exam');
    if (!startBtn) return;
    startBtn.addEventListener('click', () => {
      const count = parseInt(document.getElementById('exam-count').value, 10);
      const duration = parseInt(document.getElementById('exam-duration').value, 10);
      const modCheckboxes = document.querySelectorAll('.exam-mod:checked');
      const mods = Array.from(modCheckboxes).map(cb => parseInt(cb.value, 10));
      if (mods.length === 0) {
        alert('Seleziona almeno un modulo.');
        return;
      }
      document.getElementById('exam-setup').style.display = 'none';
      startExam({ count, duration, mods });
    });
  }

  return { setup, startExam, confetti };
})();
