// Listen for SW update notifications and show a toast.
(function () {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (!e.data || e.data.type !== 'sw-updated') return;
    if (sessionStorage.getItem('sw-update-shown') === e.data.version) return;
    sessionStorage.setItem('sw-update-shown', e.data.version);
    showToast(e.data.version);
  });

  function showToast(version) {
    const t = document.createElement('div');
    t.style.cssText = `
      position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
      background: rgba(8, 10, 30, 0.95); color: #00f0ff;
      border: 1px solid rgba(0,240,255,0.5); border-radius: 12px;
      padding: 0.7rem 1rem; font-family: 'Chakra Petch', system-ui, sans-serif;
      font-size: 0.88rem; z-index: 999;
      box-shadow: 0 0 20px rgba(0,240,255,0.4);
      display: flex; gap: 0.6rem; align-items: center;
      animation: swSlide 0.3s ease;
    `;
    t.innerHTML = `
      <span>✨ Nuova versione disponibile</span>
      <button id="sw-reload" style="background: rgba(0,240,255,0.2); color:#00f0ff; border: 1px solid rgba(0,240,255,0.5); padding: 0.3rem 0.7rem; border-radius: 8px; cursor:pointer; font-family: inherit; font-size:0.78rem;">RICARICA</button>
      <button id="sw-dismiss" style="background:transparent; color:#95b3c4; border:none; cursor:pointer; font-family:inherit; font-size:0.78rem;">×</button>
    `;
    if (!document.getElementById('sw-style')) {
      const s = document.createElement('style');
      s.id = 'sw-style';
      s.textContent = '@keyframes swSlide { from { transform: translate(-50%, 20px); opacity: 0 } to { transform: translateX(-50%); opacity: 1 } }';
      document.head.appendChild(s);
    }
    document.body.appendChild(t);
    document.getElementById('sw-reload').onclick = () => location.reload();
    document.getElementById('sw-dismiss').onclick = () => t.remove();
    setTimeout(() => t.remove(), 12000);
  }
})();
