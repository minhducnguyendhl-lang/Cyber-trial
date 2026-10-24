import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CHAPTERS, TEXT_SPEEDS, LANGUAGES, scenesFor } from './story';

const GameContext = createContext(null);
const STORAGE_KEY = 'cyber-trial-save-v3';
const LEGACY_STORAGE_KEY = 'cyber-trial-save-v2';
const emptySave = () => ({
  version_c: 2, active_c: 0, scene_c: 0, viewed_c: [0], clues_c: [], investigation_c: [],
  sessions_c: {}, completed_c: {}, route_c: null, ending_c: null, has_session_c: false, newest_c: null,
  settings_c: { muted_c: true, sfx_c: true, volume_c: 25, speed_c: TEXT_SPEEDS[1], language_c: LANGUAGES[0] }
});
function readSave() {
  const fallback = emptySave();
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const raw = JSON.parse(current || localStorage.getItem(LEGACY_STORAGE_KEY) || 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return fallback;
    const legacy = !current;
    const completed = {};
    CHAPTERS.forEach((_, i) => {
      const value = raw.completed_c?.[i];
      if (value === true || (Number(value) >= 1 && Number(value) <= 3)) completed[i] = true;
    });
    const active = Math.max(0, Math.min(CHAPTERS.length - 1, Math.floor(Number(raw.active_c) || 0)));
    const cleanIndices = (value, max) => Array.isArray(value) ? [...new Set(value.filter(n => Number.isInteger(n) && n >= 0 && n < max))] : [];
    const sessions = {};
    if (!legacy && raw.sessions_c && typeof raw.sessions_c === 'object' && !Array.isArray(raw.sessions_c)) {
      CHAPTERS.forEach((_, index) => {
        const session = raw.sessions_c[index];
        if (!session || typeof session !== 'object') return;
        const count = Math.max(1, scenesFor(CHAPTERS[index]).length);
        sessions[index] = {
          scene_c: Math.max(0, Math.min(count - 1, Math.floor(Number(session.scene_c) || 0))),
          viewed_c: cleanIndices(session.viewed_c, count),
          clues_c: cleanIndices(session.clues_c, 5),
          investigation_c: cleanIndices(session.investigation_c, 5)
        };
      });
    }
    const validActiveSceneCount = Math.max(1, scenesFor(CHAPTERS[active]).length);
    const cleanSettings = raw.settings_c && typeof raw.settings_c === 'object' ? raw.settings_c : {};
    return {
      ...fallback, active_c: active,
      scene_c: legacy ? 0 : Math.max(0, Math.min(validActiveSceneCount - 1, Math.floor(Number(raw.scene_c) || 0))),
      viewed_c: legacy ? [0] : cleanIndices(raw.viewed_c, validActiveSceneCount),
      clues_c: legacy ? [] : cleanIndices(raw.clues_c, 5),
      investigation_c: legacy ? [] : cleanIndices(raw.investigation_c, 5),
      sessions_c: sessions, completed_c: completed,
      route_c: !legacy && ['bad', 'independent'].includes(raw.route_c) ? raw.route_c : null,
      ending_c: !legacy && ['bad', 'normal', 'true'].includes(raw.ending_c) ? raw.ending_c : null,
      has_session_c: !legacy && Boolean(raw.has_session_c),
      newest_c: Number.isInteger(raw.newest_c) ? raw.newest_c : null,
      settings_c: {
        ...fallback.settings_c,
        muted_c: cleanSettings.muted_c !== false,
        sfx_c: cleanSettings.sfx_c !== false,
        volume_c: Math.min(100, Math.max(0, Number(cleanSettings.volume_c) || 0)),
        speed_c: TEXT_SPEEDS.includes(cleanSettings.speed_c) ? cleanSettings.speed_c : TEXT_SPEEDS[1],
        language_c: LANGUAGES.includes(cleanSettings.language_c) ? cleanSettings.language_c : LANGUAGES[0]
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
    if (!Number.isInteger(index) || index < 0 || index >= CHAPTERS.length) return false;
    if (index > 0 && !save.completed_c[index - 1]) return false;
    if (index === 6 && save.route_c !== 'independent') return false;
    setSave(s => {
      const savedSession = s.sessions_c[index];
      const validClues = Array.isArray(savedSession?.clues_c) ? savedSession.clues_c.filter(n => Number.isInteger(n) && n >= 0 && n < 5) : [];
      const validInvestigation = Array.isArray(savedSession?.investigation_c) ? savedSession.investigation_c.filter(n => Number.isInteger(n) && n >= 0 && n < 5) : [];
      const sceneCount = scenesFor(CHAPTERS[index]).length;
      const validViewed = Array.isArray(savedSession?.viewed_c) ? savedSession.viewed_c.filter(n => Number.isInteger(n) && n >= 0 && n < sceneCount) : [0];
      return { ...s, active_c: index, scene_c: Math.min(sceneCount - 1, Math.max(0, Number(savedSession?.scene_c) || 0)),
        clues_c: validClues, investigation_c: validInvestigation, viewed_c: validViewed, has_session_c: true };
    });
    return true;
  }
  function setScene(index) {
    setSave(s => {
      const viewed = [...new Set([...s.viewed_c, index])];
      return { ...s, scene_c: index, viewed_c: viewed,
        sessions_c: { ...s.sessions_c, [s.active_c]: { scene_c: index, clues_c: s.clues_c, viewed_c: viewed, investigation_c: s.investigation_c } } };
    });
  }
  function completeInvestigation(index) {
    if (!Number.isInteger(index) || index < 0 || index >= 5) return;
    setSave(s => {
      const clues = [...new Set([...s.clues_c, index])];
      const investigation = [...new Set([...s.investigation_c, index])];
      return { ...s, clues_c: clues, investigation_c: investigation, sessions_c: { ...s.sessions_c, [s.active_c]: {
        scene_c: s.scene_c, clues_c: clues, viewed_c: s.viewed_c, investigation_c: investigation
      } } };
    });
  }
  function finishChapter(outcome = {}) {
    setSave(s => {
      const completed = { ...s.completed_c, [s.active_c]: true };
      const route = s.active_c === 5 && ['bad', 'independent'].includes(outcome.route_c) ? outcome.route_c : s.route_c;
      const ending = s.active_c === 6 && ['normal', 'true'].includes(outcome.ending_c) ? outcome.ending_c : route === 'bad' ? 'bad' : s.ending_c;
      const next = s.active_c + 1;
      return { ...s, completed_c: completed, route_c: route, ending_c: ending,
        newest_c: next < CHAPTERS.length && !completed[next] && !(next === 6 && route !== 'independent') ? next : null };
    });
  }
  function replayChapter(index) {
    if (!Number.isInteger(index) || index < 0 || index >= CHAPTERS.length) return;
    setSave(s => ({ ...s, active_c: index, scene_c: 0, clues_c: [], investigation_c: [], viewed_c: [0], has_session_c: true,
      route_c: index === 5 ? null : s.route_c, ending_c: index >= 5 ? null : s.ending_c,
      sessions_c: { ...s.sessions_c, [index]: { scene_c: 0, clues_c: [], viewed_c: [0], investigation_c: [] } } }));
  }
  function reset() { setSave(s => ({ ...emptySave(), settings_c: s.settings_c })); }
  const chapter = CHAPTERS[save.active_c] || CHAPTERS[0];
  return <GameContext.Provider value={{
    save, chapter, t, english, settingsOpen, setSettingsOpen, setSettings,
     startChapter, replayChapter, setScene, completeInvestigation, finishChapter, reset, sound,
     totalCompleted: Object.keys(save.completed_c).length
  }}>{children}</GameContext.Provider>;
}
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('NetTrap requires GameProvider.');
  return context;
}