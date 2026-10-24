import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SceneArt from '@/components/nettrap/Art';
import InvestigationTask from '@/components/nettrap/InvestigationTasks';
import { useGame } from '@/components/nettrap/GameState';

export const route = { path: '/investigation', layout: 'public', access: 'public' };
const HOTSPOTS = [[23, 32], [50, 25], [76, 35], [35, 66], [68, 69]];
const HOTSPOT_LABEL_POSITIONS = [
  'left-0 top-full mt-1 translate-x-0',
  'left-1/2 bottom-full mb-1 -translate-x-1/2',
  'right-0 top-full mt-1',
  'right-full top-1/2 -translate-y-1/2 mr-1',
  'left-full top-1/2 -translate-y-1/2 ml-1'
];

export default function Investigation() {
  const { save, chapter, completeInvestigation, t } = useGame();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  const tasks = chapter.investigation_c;
  const complete = save.investigation_c || [];
  const required = tasks.filter(task => task.required_c);
  const ready = required.every(task => complete.includes(task.clue_index_c));
  const task = selected == null ? null : tasks[selected];
  return <main className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-8 sm:py-8">
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
      <div><p className="text-xs font-bold uppercase tracking-widest text-primary">VỤ {chapter.number_c} · KHÁM NGHIỆM HIỆN TRƯỜNG</p><h1 className="font-heading text-3xl font-bold sm:text-4xl">{chapter.title_c}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Khám phá các điểm nóng, kiểm tra bản gốc và giữ lại những gì chứng cứ thực sự cho phép kết luận.</p></div>
      <p className="font-mono text-sm">{complete.length}/{tasks.length} · chứng cứ</p>
    </header>
    <section className="relative aspect-[1000/650] overflow-hidden border border-border bg-card" aria-label="Khu vực điều tra">
      <SceneArt scene={chapter.scene_c} className="absolute inset-0 h-full w-full"/>
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10"/>
      {tasks.map((item, index) => <button key={item.clue_index_c} type="button" onClick={() => setSelected(index)} disabled={complete.includes(index)} aria-label={`${item.hotspot_c}${complete.includes(index) ? ', đã kiểm tra' : ', điểm nóng cần kiểm tra'}`}
        style={{ left: `${HOTSPOTS[index][0]}%`, top: `${HOTSPOTS[index][1]}%` }} className={`game-focus group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg ${complete.includes(index) ? 'border-success bg-success text-success-foreground' : 'border-primary bg-background text-primary hover:scale-110'}`}>
        {complete.includes(index) ? <ApperIcon name="Check" className="h-5 w-5"/> : <span className="font-mono font-bold">{index + 1}</span>}
        <span className={`absolute z-10 w-max max-w-[7rem] border border-border bg-background px-2 py-1 text-[10px] font-semibold text-foreground opacity-100 shadow sm:left-1/2 sm:right-auto sm:top-full sm:bottom-auto sm:mt-1 sm:mb-0 sm:ml-0 sm:mr-0 sm:max-w-40 sm:-translate-x-1/2 sm:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 ${HOTSPOT_LABEL_POSITIONS[index]}`}>{item.hotspot_c}</span>
      </button>)}
      <div className="absolute inset-x-0 bottom-0 hidden flex-wrap items-center justify-between gap-2 p-3 sm:flex sm:p-5"><span className="bg-background/90 px-3 py-2 text-xs font-semibold">{chapter.setting_c}</span><span className="bg-background/90 px-3 py-2 text-xs">{ready ? chapter.number_c === '07' ? 'Linh: “Chúng ta có thể đến tòa. Nhưng càng nhiều nguồn độc lập càng tốt.”' : 'Có thể đến phiên tòa' : 'Chưa đủ chứng cứ bắt buộc'}</span></div>
    </section>
    <div className="grid gap-2 pb-24 sm:grid-cols-2 lg:grid-cols-3">{tasks.map((item, index) => <button key={item.clue_index_c} type="button" onClick={() => setSelected(index)} disabled={complete.includes(index)}
      className={`game-focus flex min-h-16 items-center gap-3 border p-3 text-left text-sm ${complete.includes(index) ? 'border-success/50 bg-success-muted' : 'border-border bg-card hover:bg-secondary'}`}>
      <span className="font-mono text-primary">{complete.includes(index) ? '✓' : `0${index + 1}`}</span><span className="min-w-0 flex-1"><b className="block">{item.hotspot_c}</b><span className="text-xs text-muted-foreground">{item.required_c ? 'Bắt buộc' : 'Chứng cứ độc lập bổ sung'}</span></span><ApperIcon name={complete.includes(index) ? 'Check' : 'Search'} className="h-4 w-4 shrink-0"/>
    </button>)}</div>
    <div className="border-t border-border bg-background/95 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {ready ? <Button onClick={() => navigate('/verdict')} className="min-h-12 w-full gap-2 font-bold"><ApperIcon name="Gavel" className="h-5 w-5"/>{t('Đến phiên tòa', 'Go to trial')}</Button> : <Button disabled className="min-h-12 w-full">{t('Hoàn thành các điểm nóng bắt buộc', 'Complete required hotspots')}</Button>}
    </div>
    <Dialog open={Boolean(task)} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto border-border bg-card sm:max-w-3xl">
        {task && <><DialogHeader><DialogTitle className="font-heading text-2xl">{task.title_c}</DialogTitle><DialogDescription className="space-y-1 text-left leading-relaxed">{task.dialogue_before_c.map((line, index) => <span key={index} className="block">{line}</span>)}</DialogDescription></DialogHeader>
          <InvestigationTask task={task} onComplete={() => { completeInvestigation(task.clue_index_c); setSelected(null); }}/></>}
      </DialogContent>
    </Dialog>
  </main>;
}
