// Quiz engine
window.Quiz = (function () {
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function render(container, chapterId, questions) {
    if (!questions || !questions.length) {
      container.innerHTML = '<p class="text-center" style="color:var(--text-muted)">Nessun quiz disponibile per questo capitolo.</p>';
      return;
    }

    const state = {
      questions: shuffle(questions),
      idx: 0,
      score: 0,
      answers: [],
      total: questions.length
    };

    function paint() {
      if (state.idx >= state.total) {
        renderResult();
        return;
      }
      const q = state.questions[state.idx];
      const opts = q.a.map((opt, i) => ({ text: opt, idx: i }));
      const shuffledOpts = shuffle(opts);
      const correctIdx = shuffledOpts.findIndex(o => o.idx === q.correct);

      const pct = Math.round((state.idx / state.total) * 100);
      container.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-progress">
            <span class="quiz-counter">Domanda ${state.idx + 1} / ${state.total}</span>
            <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
            <span class="quiz-counter">${state.score}/${state.total}</span>
          </div>
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
        </div>
      `;

      const opts_btns = container.querySelectorAll('.quiz-option');
      const next = container.querySelector('#qnext');
      const skip = container.querySelector('#qskip');
      const fb = container.querySelector('#qfb');

      let answered = false;
      function answerWith(btn) {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.correct === 'true';
        opts_btns.forEach(b => {
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
        state.answers.push({ q: q.q, correct: isCorrect });
        if (!isCorrect && window.StudyTools) {
          StudyTools.recordMistake(q.q, chapterId, document.title);
        }
        next.disabled = false;
        next.focus();
      }
      opts_btns.forEach(btn => btn.addEventListener('click', () => answerWith(btn)));

      next.addEventListener('click', () => {
        state.idx++;
        paint();
      });
      skip.addEventListener('click', () => {
        state.answers.push({ q: q.q, correct: false, skipped: true });
        state.idx++;
        paint();
      });

      // Keyboard shortcuts
      document.onkeydown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key >= '1' && e.key <= String(opts_btns.length)) {
          const i = parseInt(e.key, 10) - 1;
          if (opts_btns[i]) answerWith(opts_btns[i]);
        } else if (e.key === 'Enter' && !next.disabled) {
          next.click();
        }
      };
    }

    function renderResult() {
      document.onkeydown = null;
      const pct = Math.round((state.score / state.total) * 100);
      let msg = "";
      if (pct === 100) msg = "🌟 Perfetto! Hai padroneggiato l'argomento.";
      else if (pct >= 80) msg = "💪 Ottimo lavoro! Capitolo superato.";
      else if (pct >= 60) msg = "👍 Quasi! Riprova per consolidare.";
      else msg = "📚 Ripassa il capitolo e riprova.";

      Storage.recordQuiz(chapterId, state.score, state.total);
      if (pct === 100 && window.ExamApp && window.ExamApp.confetti) window.ExamApp.confetti();

      container.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-result">
            <div class="quiz-result-score">${state.score}/${state.total}</div>
            <div class="quiz-result-pct">${pct}%</div>
            <div class="quiz-result-msg">${msg}</div>
            <div style="display:flex; gap:0.6rem; justify-content:center; flex-wrap:wrap; margin-top:1rem;">
              <button class="btn btn-primary" id="qretry">Riprova</button>
              <a href="../../index.html" class="btn btn-secondary">Torna ai moduli</a>
            </div>
          </div>
        </div>
      `;
      container.querySelector('#qretry').addEventListener('click', () => {
        render(container, chapterId, questions);
      });
    }

    paint();
  }

  return { render };
})();
