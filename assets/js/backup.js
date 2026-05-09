// Backup / Restore di tutti i dati persistenti del sito
// Esporta: progressi, flashcards SRS, mistakes, notes, customizzazioni, TTS config
// Importa: rimette tutto in localStorage e ricarica
window.Backup = (function () {
  const KEYS = [
    'sistemi5b.v1',                  // progressi base
    'sistemi5b.flashcards.v1',       // SM-2 SRS state
    'sistemi5b.flashcards.cards.v1', // card extra create dall'utente
    'sistemi5b.mistakes.v1',         // errori salvati
    'sistemi5b.notes.v1',            // note per capitolo
    'sistemi5b.cyberfx.v1',          // tema/bg/personalizzazioni
    'sistemi5b.tts.endpoint',
    'sistemi5b.tts.voice',
    'sistemi5b.tts.rate'
  ];

  function exportData() {
    const data = { __schema: 1, exportedAt: new Date().toISOString(), data: {} };
    for (const k of KEYS) {
      try { const v = localStorage.getItem(k); if (v != null) data.data[k] = v; } catch {}
    }
    return data;
  }

  function downloadJson() {
    const d = exportData();
    const today = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sistemi5b-backup-${today}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  function importData(text, opts) {
    opts = opts || {};
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { throw new Error('JSON non valido'); }
    if (!parsed || !parsed.data) throw new Error('Schema backup non riconosciuto');
    if (!opts.silent && !confirm(`Sovrascrivi i dati attuali con il backup del ${parsed.exportedAt || '?'}?\n\nI dati esistenti che non sono nel backup verranno preservati.`)) return false;
    for (const [k, v] of Object.entries(parsed.data)) {
      try { localStorage.setItem(k, v); } catch (e) { console.warn('skip', k, e); }
    }
    return true;
  }

  function importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        try { resolve(importData(reader.result)); }
        catch (e) { reject(e); }
      };
      reader.readAsText(file);
    });
  }

  // UI: pulsanti nella reset zone
  function injectUI() {
    const zone = document.querySelector('.reset-zone');
    if (!zone || document.getElementById('backup-row')) return;
    const row = document.createElement('div');
    row.id = 'backup-row';
    row.style.cssText = 'display:flex; flex-wrap:wrap; gap:.5rem; justify-content:center; margin-bottom: 1rem;';
    row.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="bk-export">💾 Esporta progressi</button>
      <button class="btn btn-secondary btn-sm" id="bk-import">📥 Importa backup</button>
      <input type="file" id="bk-file" accept="application/json" style="display:none">
    `;
    zone.parentNode.insertBefore(row, zone);
    document.getElementById('bk-export').onclick = downloadJson;
    document.getElementById('bk-import').onclick = () => document.getElementById('bk-file').click();
    document.getElementById('bk-file').onchange = async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try {
        const ok = await importFromFile(f);
        if (ok) {
          if (window.Storage && window.Storage.showToast) window.Storage.showToast('Backup importato — ricarico');
          setTimeout(() => location.reload(), 800);
        }
      } catch (err) {
        alert('Errore import: ' + err.message);
      }
    };
  }

  return { exportData, downloadJson, importData, importFromFile, injectUI };
})();

document.addEventListener('DOMContentLoaded', () => Backup.injectUI());
