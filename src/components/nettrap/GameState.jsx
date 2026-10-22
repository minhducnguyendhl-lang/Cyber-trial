import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CHAPTERS, TEXT_SPEEDS, LANGUAGES } from './story';

const GameContext = createContext(null);
const STORAGE_KEY = 'nettrap-save-v1';
const emptySave = () => ({
  version_c: 1, active_c: 0, scene_c: 0, viewed_c: [0], clues_c: [],
  sessions_c: {}, completed_c: {}, has_session_c: false, newest_c: null,
  settings_c: { muted_c: true, sfx_c: true, volume_c: 25, speed_c: TEXT_SPEEDS[1], language_c: LANGUAGES[0] }
});
function readSave() {
  const fallback = emptySave();
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!raw || raw.version_c !== 1) return fallback;
    const completed = {};
    CHAPTERS.forEach((_, i) => {
      const stars = Number(raw.completed_c?.[i]);
      if (stars >= 1 && stars <= 3) completed[i] = Math.floor(stars);
    });
    const active = Math.max(0, Math.min(CHAPTERS.length - 1, Math.floor(Number(raw.active_c) || 0)));
    const cleanIndices = (value, max) => Array.isArray(value) ? [...new Set(value.filter(n => Number.isInteger(n) && n >= 0 && n < max))] : [];
    return {
      ...fallback, active_c: active,
      scene_c: Math.max(0, Math.min(7, Math.floor(Number(raw.scene_c) || 0))),
      viewed_c: cleanIndices(raw.viewed_c, 8),
      clues_c: cleanIndices(raw.clues_c, 5),
      sessions_c: raw.sessions_c && typeof raw.sessions_c === 'object' ? raw.sessions_c : {},
      completed_c: completed, has_session_c: Boolean(raw.has_session_c),
      newest_c: Number.isInteger(raw.newest_c) ? raw.newest_c : null,
      settings_c: {
        ...fallback.settings_c,
        muted_c: raw.settings_c?.muted_c !== false,
        sfx_c: raw.settings_c?.sfx_c !== false,
        volume_c: Math.min(100, Math.max(0, Number(raw.settings_c?.volume_c) || 0)),
        speed_c: TEXT_SPEEDS.includes(raw.settings_c?.speed_c) ? raw.settings_c.speed_c : TEXT_SPEEDS[1],
        language_c: LANGUAGES.includes(raw.settings_c?.language_c) ? raw.settings_c.language_c : LANGUAGES[0]
      }
    };
  } catch { return fallback; }
}

export function GameProvider({ children }) {
  const [save, setSave] = useState(readSave);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const audio = useRef(null);
  const oscillators = useRef([]);
  const gain = useRef(null);
  const warned = useRef(false);
  const english = save.settings_c.language_c === LANGUAGES[1];
  const t = (vi, en) => english ? en : vi;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); }
    catch (error) {
      if (!warned.current) {
        warned.current = true;
        toast.error('Không thể lưu trên thiết bị. Kiểm tra quyền lưu trữ của trình duyệt.');
        console.error(`NetTrap local save failed: ${error.message}`);
      }
    }
  }, [save]);

  useEffect(() => {
    if (gain.current && audio.current) {
      gain.current.gain.setTargetAtTime(save.settings_c.muted_c ? 0 : save.settings_c.volume_c / 100 * 0.025, audio.current.currentTime, 0.2);
    }
  }, [save.settings_c.muted_c, save.settings_c.volume_c]);

  useEffect(() => () => {
    oscillators.current.forEach(o => { try { o.stop(); } catch {} });
    if (audio.current) audio.current.close().catch(() => {});
  }, []);

  function activateAudio() {
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      if (!audio.current) {
        audio.current = new AudioCtor();
        gain.current = audio.current.createGain();
        gain.current.gain.value = 0;
        gain.current.connect(audio.current.destination);
        [110, 164.81, 220.3].forEach(frequency => {
          const oscillator = audio.current.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.value = frequency;
          oscillator.connect(gain.current);
          oscillator.start();
          oscillators.current.push(oscillator);
        });
      }
      audio.current.resume().catch(() => toast.info('Bấm nút âm thanh để cho phép phát.'));
    } catch (error) { toast.error('Thiết bị chưa hỗ trợ âm thanh.'); }
  }

  function sound(correct = true) {
    if (!save.settings_c.sfx_c || save.settings_c.muted_c) return;
    activateAudio();
    if (!audio.current) return;
    const context = audio.current;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.frequency.setValueAtTime(correct ? 660 : 165, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(correct ? 990 : 110, context.currentTime + .18);
    volume.gain.setValueAtTime(Math.max(.002, save.settings_c.volume_c / 100 * .07), context.currentTime);
    volume.gain.exponentialRampToValueAtTime(.001, context.currentTime + .25);
    oscillator.connect(volume); volume.connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + .26);
    oscillator.onended = () => { oscillator.disconnect(); volume.disconnect(); };
  }

  function setSettings(patch) {
    if (patch.muted_c === false) activateAudio();
    setSave(s => ({ ...s, settings_c: { ...s.settings_c, ...patch } }));
  }
  function startChapter(index) {
    if (index > 0 && !save.completed_c[index - 1]) return false;
    setSave(s => {
      const savedSession = s.sessions_c[index];
      const validClues = Array.isArray(savedSession?.clues_c) ? savedSession.clues_c.filter(n => Number.isInteger(n) && n >= 0 && n < 5) : [];
      const validViewed = Array.isArray(savedSession?.viewed_c) ? savedSession.viewed_c.filter(n => Number.isInteger(n) && n >= 0 && n < 8) : [0];
      return { ...s, active_c: index, scene_c: Math.min(7, Math.max(0, Number(savedSession?.scene_c) || 0)),
        clues_c: validClues, viewed_c: validViewed, has_session_c: true };
    });
    return true;
  }
  function setScene(index, clue) {
    setSave(s => {
      const clues = clue == null ? s.clues_c : [...new Set([...s.clues_c, clue])];
      const viewed = [...new Set([...s.viewed_c, index])];
      return { ...s, scene_c: index, clues_c: clues, viewed_c: viewed,
        sessions_c: { ...s.sessions_c, [s.active_c]: { scene_c: index, clues_c: clues, viewed_c: viewed } } };
    });
  }
  function collectClue(index) {
    setSave(s => {
      const clues = [...new Set([...s.clues_c, index])];
      return { ...s, clues_c: clues, sessions_c: { ...s.sessions_c, [s.active_c]: {
        scene_c: s.scene_c, clues_c: clues, viewed_c: s.viewed_c
      } } };
    });
  }
  function finishChapter(stars) {
    setSave(s => ({
      ...s, completed_c: { ...s.completed_c, [s.active_c]: Math.max(stars, s.completed_c[s.active_c] || 0) },
      newest_c: s.active_c + 1 < CHAPTERS.length && !s.completed_c[s.active_c + 1] ? s.active_c + 1 : null
    }));
  }
  function replayChapter(index) {
    setSave(s => ({ ...s, active_c: index, scene_c: 0, clues_c: [], viewed_c: [0], has_session_c: true,
      sessions_c: { ...s.sessions_c, [index]: { scene_c: 0, clues_c: [], viewed_c: [0] } } }));
  }
  function reset() { setSave(s => ({ ...emptySave(), settings_c: s.settings_c })); }
  const chapter = CHAPTERS[save.active_c] || CHAPTERS[0];
  return <GameContext.Provider value={{
    save, chapter, t, english, settingsOpen, setSettingsOpen, setSettings,
    startChapter, replayChapter, setScene, collectClue, finishChapter, reset, sound,
    totalStars: Object.values(save.completed_c).reduce((sum, value) => sum + value, 0),
    totalCompleted: Object.keys(save.completed_c).length
  }}>{children}</GameContext.Provider>;
}
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('NetTrap requires GameProvider.');
  return context;
}