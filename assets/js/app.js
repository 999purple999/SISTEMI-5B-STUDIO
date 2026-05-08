// Main app for index.html
window.App = (function () {
  function renderHome() {
    const tot = Storage.totalProgress();
    const state = Storage.get();
    const ach = Storage.getAchievements();
    const unlocked = ach.filter(a => a.unlocked).length;

    document.getElementById('xp-num').textContent = state.xp;
    document.getElementById('streak-num').textContent = state.streak;
    document.getElementById('progress-num').textContent = `${tot.pct}%`;
    document.getElementById('chapters-num').textContent = `${tot.done}/${tot.total}`;

    // Modules
    const grid = document.getElementById('modules');
    grid.innerHTML = '';
    (window.MODULES || []).forEach(m => {
      const prog = Storage.moduleProgress(m.id);
      const card = document.createElement('a');
      card.className = 'module-card';
      card.href = `chapters/m${m.id}.html`;
      card.dataset.mod = m.id;
      card.innerHTML = `
        <div class="module-icon">${m.icon}</div>
        <div class="module-num">${m.num}</div>
        <h3>${m.title}</h3>
        <p class="module-desc">${m.desc}</p>
        <div class="module-progress"><div class="module-progress-bar" style="width:${prog.pct}%"></div></div>
        <div class="module-meta">
          <span>${prog.completed}/${prog.total} capitoli</span>
          <span>${prog.pct}%</span>
        </div>
      `;
      grid.appendChild(card);
    });

    // Achievements
    const achGrid = document.getElementById('achievements');
    achGrid.innerHTML = '';
    ach.forEach(a => {
      const div = document.createElement('div');
      div.className = `achievement ${a.unlocked ? 'unlocked' : 'locked'}`;
      div.innerHTML = `
        <div class="achievement-icon">${a.unlocked ? a.icon : '🔒'}</div>
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.desc}</div>
      `;
      achGrid.appendChild(div);
    });
    document.getElementById('ach-counter').textContent = `${unlocked}/${ach.length}`;
  }

  function setupNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
  }

  function setupSearch() {
    const input = document.getElementById('search');
    if (!input) return;
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      document.querySelectorAll('.module-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }

  function setupReset() {
    const btn = document.getElementById('reset-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (confirm('Sei sicuro di voler resettare tutti i progressi? Questa azione è irreversibile.')) {
        Storage.reset();
        renderHome();
        Storage.showToast('Progressi resettati', '');
      }
    });
  }

  function init() {
    setupNav();
    setupSearch();
    setupReset();
    renderHome();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
