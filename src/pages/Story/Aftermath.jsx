import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/components/nettrap/GameState';
import { CAST, CHAPTERS } from '@/components/nettrap/story';
import { ENDINGS } from '@/components/nettrap/cyberPlot';
import SceneArt, { Portrait } from '@/components/nettrap/Art';
import { characterName, characterText } from '@/components/nettrap/characterImages';

export const route = { path: '/aftermath', layout: 'public', access: 'public' };

export default function Aftermath() {
  const { save, chapter, startChapter, replayChapter } = useGame();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [ending, setEnding] = useState(false);
  const [playing, setPlaying] = useState(false);
  const endingKey = save.route_c === 'bad' ? 'bad' : save.ending_c === 'true' ? 'true' : 'normal';
  const film = ENDINGS[endingKey];
  const failed = [
    { speaker_c: 'Cyber-M', text_c: 'Phán quyết sai. Một phần hồ sơ đã bị công khai trong mô phỏng. Các ngươi đã trao quyền quyết định cho nỗi sợ.', emotion_c: 'neutral' },
    { speaker_c: 'An', text_c: `Mọi người nhìn nhau, không biết lời nào còn có thể tin. Tôi đã kết luận vượt quá chứng cứ. Tôi phải sửa sai: ${chapter.verdict_c[0]} Không ai đáng bị quy hết trách nhiệm chỉ vì đã bị lừa.`, emotion_c: 'scared' },
    ...(save.active_c === 5 ? [{ speaker_c: 'Bảo Linh', text_c: 'Cửa Kho Lưu Trữ đang đóng… An, tôi không phải chủ mưu. Xin giữ lại lời khai và tìm nguồn gốc, đừng chỉ giữ phán quyết.', emotion_c: 'scared' }] : [])
  ];
  const frames = ending ? film.frames_c : chapter.aftermath_c;
  const current = frames[Math.min(frame, frames.length - 1)];
  const last = frame === frames.length - 1;

  useEffect(() => {
    if (!playing || last) return;
    const timer = setTimeout(() => setFrame(f => f + 1), Math.max(7000, current.text_c.length * 65));
    return () => clearTimeout(timer);
  }, [playing, last, frame, current.text_c]);

  function proceed() {
    if (!last) { setFrame(f => f + 1); return; }
    if (!ending && (save.active_c === CHAPTERS.length - 1 || (save.active_c === 5 && save.route_c === 'bad'))) {
      setEnding(true); setFrame(0); setPlaying(!reduced); return;
    }
    if (ending) { navigate('/chapters'); return; }
    startChapter(save.active_c + 1); navigate('/play');
  }

  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  return <section className="relative isolate flex min-h-[calc(100dvh-3.5rem)] flex-col justify-between overflow-hidden bg-background">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <SceneArt scene={ending ? film.scene_c : current.scene_c || chapter.scene_c} portrait={false} className="h-full w-full" preserveAspectRatio="xMidYMid slice"/>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30"/>
    </div>
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/90 p-6">
      <div className="min-w-0"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{ending ? `${endingKey.toUpperCase()} ENDING · Cảnh điện ảnh` : `Chương ${chapter.number_c} · Hậu quả phiên tòa`}</p><h1 className="text-3xl font-heading font-semibold tracking-tight">{ending ? film.title_c : chapter.title_c}</h1></div>
      <Button variant="outline" onClick={() => setPlaying(p => !p)} className="shrink-0 active:scale-[0.98]">{playing ? 'Tạm dừng' : 'Tự động đọc'}</Button>
    </header>
    <motion.div key={`${ending}-${frame}`} initial={reduced ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }} className="mx-auto h-[38vh] w-full max-w-xl">
      <Portrait name={current.speaker_c} variant={CAST.find(p => p.name_c === current.speaker_c)?.variant_c || 'suspect'} emotion={current.emotion_c} className="h-full w-full"/>
    </motion.div>
    <div className="relative mx-auto w-full max-w-5xl space-y-6 p-6">
      <article aria-live="polite" className="panel-cut border border-border bg-card/95 p-6 shadow-lg">
        <h2 className="mb-4 break-words text-lg font-heading font-semibold text-primary">{characterName(current.speaker_c)}</h2>
        <p className="text-base leading-relaxed">{characterText(current.text_c)}</p>
      </article>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">{frame + 1}/{frames.length} · Tiến trình đã lưu{ending ? ' · Hoạt cảnh trong game, không phải video dựng sẵn' : ''}</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => { replayChapter(save.active_c); navigate('/play'); }} className="active:scale-[0.98]">Điều tra lại</Button>
          <Button onClick={proceed} className="active:scale-[0.98]">{!last ? 'Tiếp tục' : ending ? 'Về chọn chương' : save.active_c === 6 || (save.active_c === 5 && save.route_c === 'bad') ? 'Xem kết thúc' : 'Chương tiếp theo'}</Button>
        </div>
      </div>
    </div>
  </section>;
}