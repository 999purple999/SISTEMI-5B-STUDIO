// =============================================================
// TTS ADAPTER — pluggable text-to-speech
// Default: Web Speech API (browser, gratis ma robotico).
// Custom: when localStorage 'sistemi5b.tts.endpoint' is set,
//         POST { text, voice, lang } to that URL and play returned
//         audio (audio/wav | audio/mpeg). Compatible with:
//         - Piper TTS server      (http://localhost:5000/api/tts)
//         - XTTS-v2 / Coqui       (http://localhost:8020/tts_to_audio)
//         - F5-TTS gradio API     (custom wrapper)
//         - openai-edge-tts proxy (http://localhost:5050/v1/audio/speech)
// Override window.TTS.speak from custom integration if needed.
// =============================================================
window.TTS = (function () {
  const KEY_ENDPOINT = 'sistemi5b.tts.endpoint';
  const KEY_VOICE    = 'sistemi5b.tts.voice';
  const KEY_RATE     = 'sistemi5b.tts.rate';

  let currentAudio = null;
  let utter = null;
  let active = false;

  function getEndpoint() { try { return localStorage.getItem(KEY_ENDPOINT) || ''; } catch { return ''; } }
  function getVoice()    { try { return localStorage.getItem(KEY_VOICE)    || 'it_IT-paola-medium'; } catch { return 'it_IT-paola-medium'; } }
  function getRate()     { try { return parseFloat(localStorage.getItem(KEY_RATE) || '1.0'); } catch { return 1.0; } }

  function clean(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  async function speak(text, opts = {}) {
    if (!text) return;
    stop();
    const endpoint = opts.endpoint || getEndpoint();
    const voice    = opts.voice    || getVoice();
    const rate     = opts.rate     || getRate();

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: clean(text), voice, lang: 'it', rate, language: 'it' })
        });
        if (!res.ok) throw new Error('TTS server ' + res.status);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        currentAudio.playbackRate = rate;
        currentAudio.onended = () => { active = false; URL.revokeObjectURL(url); };
        active = true;
        await currentAudio.play();
        return;
      } catch (err) {
        console.warn('[TTS] custom endpoint failed, falling back to Web Speech', err);
      }
    }

    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    utter = new SpeechSynthesisUtterance(clean(text));
    utter.lang = 'it-IT';
    utter.rate = rate;
    utter.pitch = 1.0;

    const voices = speechSynthesis.getVoices();
    const it = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('it'));
    if (it) utter.voice = it;

    utter.onend = () => { active = false; };
    speechSynthesis.speak(utter);
    active = true;
  }

  function stop() {
    if (currentAudio) { try { currentAudio.pause(); } catch {} currentAudio = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    active = false;
  }

  function isActive() { return active; }
  function isCustom() { return !!getEndpoint(); }

  function configure({ endpoint, voice, rate }) {
    try {
      if (endpoint !== undefined) localStorage.setItem(KEY_ENDPOINT, endpoint || '');
      if (voice !== undefined)    localStorage.setItem(KEY_VOICE, voice || 'it_IT-paola-medium');
      if (rate !== undefined)     localStorage.setItem(KEY_RATE, String(rate));
    } catch {}
  }

  return { speak, stop, isActive, isCustom, configure };
})();

// Bridge: replace StudyTools.speak if the legacy FAB exists.
document.addEventListener('DOMContentLoaded', () => {
  if (window.StudyTools && typeof window.StudyTools.speak === 'function') {
    const orig = window.StudyTools.speak;
    window.StudyTools.speak = (text) => {
      if (window.TTS.isActive()) { window.TTS.stop(); return; }
      window.TTS.speak(text);
    };
  }
});
