// Chapter page logic
window.ChapterApp = (function () {
  function renderModuleIndex(moduleId) {
    const mod = (window.MODULES || []).find(m => m.id === moduleId);
    if (!mod) return;
    document.title = `${mod.title} — Sistemi 5B`;

    const header = document.getElementById('mod-header');
    const prog = Storage.moduleProgress(moduleId);
    header.innerHTML = `
      <div class="breadcrumb"><a href="../index.html">← Home</a> / ${mod.num}</div>
      <h1 class="chapter-title">${mod.icon} ${mod.title}</h1>
      <p class="chapter-sub">${mod.desc}</p>
      <div class="module-progress mt-3" style="max-width:480px;"><div class="module-progress-bar" style="width:${prog.pct}%; background: linear-gradient(90deg, ${mod.color}, ${mod.color}aa)"></div></div>
      <p class="mt-1" style="font-size:0.85rem; color:var(--text-muted)">${prog.completed} di ${prog.total} capitoli completati</p>
    `;

    const grid = document.getElementById('chapters-grid');
    grid.innerHTML = '';
    grid.style.setProperty('--card-color', mod.color);
    mod.chapters.forEach((ch, i) => {
      const p = Storage.chapterProgress(ch.id);
      const status = p.completed ? '✅' : (p.read ? '📖' : '○');
      const a = document.createElement('a');
      a.className = 'module-card';
      a.dataset.mod = mod.id;
      a.href = `${ch.slug}.html`;
      a.innerHTML = `
        <div class="module-icon">${ch.icon || '📄'}</div>
        <div class="module-num">Capitolo ${i + 1}</div>
        <h3>${ch.title}</h3>
        <div class="module-meta mt-2">
          <span>${status} ${p.completed ? 'Completato' : (p.read ? 'Letto' : 'Da iniziare')}</span>
          ${p.quizScore ? `<span>${p.quizScore}%</span>` : ''}
        </div>
      `;
      grid.appendChild(a);
    });
  }

  function renderChapter(chapterId) {
    const data = (window.CHAPTERS || {})[chapterId];
    if (!data) {
      document.getElementById('chapter-content').innerHTML = '<p>Capitolo non trovato.</p>';
      return;
    }
    document.title = `${data.title} — Sistemi 5B`;

    // Find module
    let mod = null, idx = -1;
    (window.MODULES || []).forEach(m => {
      const i = m.chapters.findIndex(c => c.id === chapterId);
      if (i >= 0) { mod = m; idx = i; }
    });

    const header = document.getElementById('chapter-header');
    if (header && mod) {
      header.innerHTML = `
        <div class="breadcrumb">
          <a href="../index.html">Home</a> /
          <a href="m${mod.id}.html">${mod.num}</a> /
          ${data.title}
        </div>
        <h1 class="chapter-title">${data.title}</h1>
        <p class="chapter-sub">${mod.title} — Capitolo ${idx + 1} di ${mod.chapters.length}</p>
      `;
    }

    document.getElementById('chapter-content').innerHTML = data.body;

    // TOC build
    const toc = document.getElementById('toc');
    if (toc) {
      const headings = document.querySelectorAll('#chapter-content h2[id]');
      if (headings.length > 0) {
        toc.innerHTML = '<h4>In questo capitolo</h4><ul>' +
          Array.from(headings).map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('') +
          '</ul>';
        // active link on scroll
        const links = toc.querySelectorAll('a');
        function setActive() {
          let active = links[0];
          headings.forEach((h, i) => {
            if (h.getBoundingClientRect().top < 100) active = links[i];
          });
          links.forEach(l => l.classList.remove('active'));
          if (active) active.classList.add('active');
        }
        window.addEventListener('scroll', setActive, { passive: true });
        setActive();
      } else {
        toc.style.display = 'none';
      }
    }

    // Mark as read on render
    Storage.markRead(chapterId);

    // Quiz
    const quizContainer = document.getElementById('quiz');
    if (quizContainer && data.quiz && data.quiz.length) {
      const startBtn = document.createElement('button');
      startBtn.className = 'btn btn-primary btn-lg';
      startBtn.textContent = '🎯 Inizia il quiz';
      quizContainer.parentNode.insertBefore(startBtn, quizContainer);
      startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        Quiz.render(quizContainer, chapterId, data.quiz);
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Prev / Next nav
    const prevNextBox = document.getElementById('prev-next');
    if (prevNextBox && mod) {
      const prev = idx > 0 ? mod.chapters[idx - 1] : null;
      const next = idx < mod.chapters.length - 1 ? mod.chapters[idx + 1] : null;
      prevNextBox.innerHTML = `
        ${prev ? `<a href="${prev.slug}.html" class="btn btn-secondary">← ${prev.title}</a>` : '<span></span>'}
        ${next ? `<a href="${next.slug}.html" class="btn btn-primary">${next.title} →</a>` : `<a href="m${mod.id}.html" class="btn btn-primary">Fine modulo →</a>`}
      `;
    }
  }

  function setupNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
  }

  return { renderModuleIndex, renderChapter, setupNav };
})();
