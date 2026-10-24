import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { scenesFor, TEXT_SPEEDS, CAST } from '@/components/nettrap/story';
import { useGame } from '@/components/nettrap/GameState';
import SceneArt, { Portrait } from '@/components/nettrap/Art';
import CluePanel from '@/components/nettrap/CluePanel';
import { characterName, characterText } from '@/components/nettrap/characterImages';

export const route = { path: '/play', layout: 'public', access: 'public' };

export default function VisualNovelScene() {
  const { save, chapter, setScene, t, english, setSettingsOpen } = useGame();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const scenes = scenesFor(chapter);
  const node = scenes[save.scene_c] || scenes[0];
  const text = characterText(english ? node.english_c : node.text_c);
  const [visible, setVisible] = useState(0);
  const [auto, setAuto] = useState(false);
  const [cluesOpen, setCluesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    setVisible(reduced ? text.length : 0);
    if (reduced) return;
    const speed = [55, 27, 9][TEXT_SPEEDS.indexOf(save.settings_c.speed_c)] || 27;
    const interval = setInterval(() => setVisible(v => {
      if (v >= text.length) { clearInterval(interval); return v; }
      return v + 1;
    }), speed);
    return () => clearInterval(interval);
  }, [save.scene_c, save.active_c, text, save.settings_c.speed_c, reduced]);

  function next() {
    if (visible < text.length) { setVisible(text.length); return; }
    if (save.scene_c === scenes.length - 1) navigate('/investigation');
    else setScene(save.scene_c + 1);
  }

  useEffect(() => {
    if (!auto || visible < text.length || cluesOpen || menuOpen || exitOpen) return;
    const timer = setTimeout(() => {
      if (save.scene_c < scenes.length - 1) setScene(save.scene_c + 1);
      else setAuto(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [auto, visible, text.length, save.scene_c, cluesOpen, menuOpen, exitOpen]);

  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  return <div className="relative isolate min-h-[calc(100dvh-3.5rem)] overflow-hidden">
    <motion.div key={`${chapter.key_c}-${save.scene_c > 4}`} initial={reduced ? false : { opacity: .3 }} animate={{ opacity: 1 }} transition={{ duration: .35 }} className="pointer-events-none absolute inset-0 -z-10">
      <SceneArt scene={node.scene_c || chapter.scene_c} className="h-full w-full" preserveAspectRatio="xMidYMid slice"/>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/30"/>
    </motion.div>
    {node.warning_c && <div className="flag-pulse pointer-events-none absolute inset-0 z-10 border-[5px] border-primary/30" aria-hidden="true"/>}
    <div className="relative z-20 flex items-center justify-between gap-2 border-b border-border/50 bg-background/85 px-3 py-2 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" onClick={() => setExitOpen(true)} aria-label="Thoát vụ án" className="h-11 w-11 shrink-0 p-0 hover:bg-muted"><ApperIcon name="ArrowLeft" className="h-5 w-5"/></Button>
        <div className="min-w-0"><p className="truncate font-heading text-xl font-semibold">{english ? chapter.title_en_c : chapter.title_c}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground">{chapter.setting_c} · {save.scene_c + 1}/{scenes.length}</p></div>
      </div>
      <div className="flex shrink-0 gap-1">
        <Button variant="ghost" onClick={() => setCluesOpen(true)} aria-label="Mở bảng manh mối" className="h-11 px-3 text-accent-foreground hover:bg-secondary"><ApperIcon name="Pin" className="h-5 w-5"/><span className="ml-1 text-xs">{save.clues_c.length}</span></Button>
        <Button variant="ghost" onClick={() => setAuto(!auto)} aria-pressed={auto} aria-label="Tự động đọc hội thoại" className={`h-11 w-11 p-0 hover:bg-muted ${auto ? 'text-primary' : 'text-muted-foreground'}`}><ApperIcon name={auto ? 'Pause' : 'FastForward'} className="h-5 w-5"/></Button>
        <Button variant="ghost" onClick={() => setMenuOpen(true)} aria-label="Menu cảnh" className="h-11 w-11 p-0 hover:bg-muted"><ApperIcon name="Menu" className="h-5 w-5"/></Button>
      </div>
    </div>
    <div className="pointer-events-none relative mx-auto h-[35vh] min-h-52 max-w-5xl overflow-hidden sm:h-[44vh] sm:min-h-72">
      <Portrait name="An" framing="bust" variant="detective" emotion={node.speaker_c === 'An' ? node.emotion_c : 'suspicious'} className={`absolute bottom-0 left-0 h-full w-[52%] transition-opacity duration-(--transition-fast) ${node.speaker_c === 'An' ? 'opacity-100' : 'opacity-40'}`}/>
      {node.speaker_c !== 'An' && <Portrait name={node.speaker_c} framing="bust" variant={CAST.find(p => p.name_c === node.speaker_c)?.variant_c || 'suspect'} emotion={node.emotion_c} className="absolute bottom-0 right-0 h-full w-[52%] opacity-100"/>}
    </div>
    <section className="relative z-20 mx-auto max-w-5xl px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="panel-cut min-h-60 border border-border bg-background/95 p-5 shadow-lg sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="panel-cut min-w-0 break-words bg-primary px-5 py-1 font-heading text-xl font-bold text-primary-foreground">{characterName(node.speaker_c)}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{node.warning_c && node.speaker_c === 'Cyber-M' ? 'Thông báo sự cố' : node.investigation_c != null ? 'Khám nghiệm chứng cứ' : ({ happy: 'Vui mừng', scared: 'Sợ hãi', shocked: 'Hoang mang', confused: 'Hoang mang', determined: 'Kiên cường' }[node.emotion_c] || 'Đối thoại')}</span>
        </div>
        <button type="button" onClick={next} className="game-focus block min-h-20 w-full whitespace-pre-wrap break-words text-left text-base leading-[1.9] sm:text-lg" aria-label={visible < text.length ? 'Hiện toàn bộ hội thoại' : 'Đọc tiếp hội thoại'}>
          {text.slice(0, visible)}
          {visible < text.length && <span className="text-primary" aria-hidden="true">▌</span>}
        </button>
        <div className="mt-4 flex justify-end"><Button onClick={next} variant="ghost" className="h-11 px-4 font-semibold text-accent-foreground hover:bg-secondary">{save.scene_c === scenes.length - 1 ? t('Bắt đầu điều tra', 'Start investigation') : t('Tiếp tục', 'Continue')}<ApperIcon name="ChevronRight" className="ml-2 h-4 w-4"/></Button></div>
      </div>
    </section>
    <Sheet open={cluesOpen} onOpenChange={setCluesOpen}>
      <SheetContent className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-lg">
        <SheetHeader className="shrink-0 border-b border-border p-6"><SheetTitle className="font-heading text-3xl">Bảng Manh Mối</SheetTitle><SheetDescription>Phiên điều tra vẫn ở cảnh {save.scene_c + 1}. Đóng bảng để tiếp tục.</SheetDescription></SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-6"><CluePanel compact/></div>
      </SheetContent>
    </Sheet>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="bottom" className="mx-auto flex max-h-[75vh] max-w-xl flex-col gap-0 border-border bg-card p-0">
        <SheetHeader className="shrink-0 border-b border-border p-6"><SheetTitle className="font-heading text-3xl">Xem lại cảnh</SheetTitle><SheetDescription>Không xóa chứng cứ đã thu thập. Chọn một cảnh đã xem để điều tra lại.</SheetDescription></SheetHeader>
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-6">
          {scenes.map((scene, i) => <Button key={i} disabled={!save.viewed_c.includes(i)} variant="outline" onClick={() => { setScene(i); setMenuOpen(false); setAuto(false); }} className="h-auto min-h-12 w-full justify-start whitespace-normal border-border py-3 text-left text-sm">Cảnh {i + 1} · {scene.speaker_c}{!save.viewed_c.includes(i) && <ApperIcon name="Lock" className="ml-auto h-4 w-4"/>}</Button>)}
          <Button variant="ghost" onClick={() => { setMenuOpen(false); setSettingsOpen(true); }} className="h-12 w-full text-primary hover:bg-muted">Cài đặt</Button>
        </div>
      </SheetContent>
    </Sheet>
    <Dialog open={exitOpen} onOpenChange={setExitOpen}>
      <DialogContent className="border-border bg-card p-6"><DialogHeader><DialogTitle className="font-heading text-3xl">Thoát vụ án?</DialogTitle><DialogDescription>Tiến trình đã được lưu trên thiết bị này. Bạn có thể tiếp tục từ cảnh hiện tại.</DialogDescription></DialogHeader><DialogFooter className="gap-2 pt-4"><Button variant="outline" onClick={() => setExitOpen(false)} className="h-11 border-border">Ở lại</Button><Button onClick={() => navigate('/chapters')} className="h-11 bg-primary font-bold text-primary-foreground hover:bg-primary/90">Thoát vụ án</Button></DialogFooter></DialogContent>
    </Dialog>
  </div>;
}