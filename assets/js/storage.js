// localStorage progress + gamification
window.Storage = (function () {
  const KEY = 'sistemi5b.v1';
  const defaultState = {
    chapters: {},   // id -> { read: bool, quizScore: 0-100, completed: bool, attempts: n }
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    achievements: {},
    totalQuizzesTaken: 0,
    totalPerfect: 0
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch (e) {
      return { ...defaultState };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { console.warn('storage save failed', e); }
  }

  function get() { return load(); }

  function set(updater) {
    const s = load();
    const next = typeof updater === 'function' ? updater(s) : { ...s, ...updater };
    save(next);
    return next;
  }

  function reset() {
    localStorage.removeItem(KEY);
    return load();
  }

  function markRead(chapterId) {
    return set(s => {
      s.chapters[chapterId] = s.chapters[chapterId] || { read: false, quizScore: 0, completed: false, attempts: 0 };
      if (!s.chapters[chapterId].read) {
        s.chapters[chapterId].read = true;
        s.xp += 10;
        showToast(`+10 XP — Capitolo letto`, 'xp');
      }
      updateStreak(s);
      checkAchievements(s);
      return s;
    });
  }

  function recordQuiz(chapterId, score, total) {
    return set(s => {
      const pct = Math.round((score / total) * 100);
      s.chapters[chapterId] = s.chapters[chapterId] || { read: true, quizScore: 0, completed: false, attempts: 0 };
      s.chapters[chapterId].attempts = (s.chapters[chapterId].attempts || 0) + 1;
      const prev = s.chapters[chapterId].quizScore || 0;
      const wasCompleted = s.chapters[chapterId].completed;
      if (pct > prev) s.chapters[chapterId].quizScore = pct;
      if (pct >= 80 && !wasCompleted) {
        s.chapters[chapterId].completed = true;
        s.xp += 50;
        showToast(`+50 XP — Capitolo completato!`, 'xp');
      }
      const earned = score * 5;
      s.xp += earned;
      if (earned > 0) showToast(`+${earned} XP`, 'xp');
      s.totalQuizzesTaken += 1;
      if (pct === 100) s.totalPerfect += 1;
      updateStreak(s);
      checkAchievements(s);
      return s;
    });
  }

  function updateStreak(s) {
    const today = new Date().toISOString().slice(0, 10);
    if (s.lastActiveDate === today) return;
    if (s.lastActiveDate) {
      const last = new Date(s.lastActiveDate);
      const diff = Math.round((new Date(today) - last) / 86400000);
      if (diff === 1) s.streak += 1;
      else if (diff > 1) s.streak = 1;
    } else {
      s.streak = 1;
    }
    s.lastActiveDate = today;
  }

  function chapterProgress(chapterId) {
    const s = load();
    const c = s.chapters[chapterId];
    if (!c) return { read: false, quizScore: 0, completed: false };
    return c;
  }

  function moduleProgress(moduleId) {
    const s = load();
    const mod = (window.MODULES || []).find(m => m.id === moduleId);
    if (!mod) return { pct: 0, completed: 0, total: 0 };
    const total = mod.chapters.length;
    let completed = 0;
    mod.chapters.forEach(c => {
      const p = s.chapters[c.id];
      if (p && p.completed) completed += 1;
    });
    return { pct: total ? Math.round((completed / total) * 100) : 0, completed, total };
  }

  function totalProgress() {
    const s = load();
    let total = 0, done = 0;
    (window.MODULES || []).forEach(m => {
      m.chapters.forEach(c => {
        total += 1;
        if (s.chapters[c.id] && s.chapters[c.id].completed) done += 1;
      });
    });
    return { pct: total ? Math.round((done / total) * 100) : 0, done, total };
  }

  // Achievements
  const ACHIEVEMENTS = [
    { id: 'first_read',   icon: '📖', name: 'Primo passo', desc: 'Leggi un capitolo', test: s => Object.values(s.chapters).some(c => c.read) },
    { id: 'first_quiz',   icon: '🎯', name: 'Primo quiz',  desc: 'Completa il primo quiz', test: s => s.totalQuizzesTaken >= 1 },
    { id: 'perfect',      icon: '💯', name: 'Perfezione',  desc: 'Quiz con 100%', test: s => s.totalPerfect >= 1 },
    { id: 'streak3',      icon: '🔥', name: 'Streak 3',    desc: 'Studia per 3 giorni', test: s => s.streak >= 3 },
    { id: 'streak7',      icon: '⚡', name: 'Una settimana', desc: '7 giorni di streak', test: s => s.streak >= 7 },
    { id: 'mod1_done',    icon: '🔐', name: 'Crittografo',  desc: 'Completa Modulo 1', test: s => moduleProgress(1).pct === 100 },
    { id: 'mod2_done',    icon: '🛡️', name: 'Difensore',    desc: 'Completa Modulo 2', test: s => moduleProgress(2).pct === 100 },
    { id: 'mod3_done',    icon: '☁️', name: 'Cloud Master', desc: 'Completa Modulo 3', test: s => moduleProgress(3).pct === 100 },
    { id: 'mod4_done',    icon: '🎓', name: 'Esame ready',  desc: 'Completa Modulo 4', test: s => moduleProgress(4).pct === 100 },
    { id: 'all_done',     icon: '👑', name: 'Maestro',      desc: 'Completa tutti i moduli', test: s => totalProgress().pct === 100 },
    { id: 'xp1000',       icon: '⭐', name: '1000 XP',      desc: 'Raggiungi 1000 XP', test: s => s.xp >= 1000 },
    { id: 'xp5000',       icon: '🌟', name: '5000 XP',      desc: 'Raggiungi 5000 XP', test: s => s.xp >= 5000 }
  ];

  function checkAchievements(s) {
    ACHIEVEMENTS.forEach(a => {
      if (!s.achievements[a.id]) {
        if (a.test(s)) {
          s.achievements[a.id] = { unlockedAt: Date.now() };
          showToast(`🏆 ${a.name}: ${a.desc}`, 'achievement');
        }
      }
    });
  }

  function getAchievements() {
    const s = load();
    return ACHIEVEMENTS.map(a => ({ ...a, unlocked: !!s.achievements[a.id] }));
  }

  // Toast
  function showToast(msg, type) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast ${type || ''}`;
    t.innerHTML = `<span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  return {
    get, set, reset,
    markRead, recordQuiz,
    chapterProgress, moduleProgress, totalProgress,
    getAchievements, showToast
  };
})();
