import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { CHAPTERS, REPORT_TEXT, REFERENCE_URL } from '@/components/nettrap/story';
import { useGame } from '@/components/nettrap/GameState';
import { Portrait } from '@/components/nettrap/Art';
import { PageHeader, shareSafetyCard } from '@/components/nettrap/GameUI';

export const route = { path: '/verdict', layout: 'public', access: 'public' };
const SHARDS = [
  'polygon(0 0, 53% 0, 40% 35%, 0 47%)',
  'polygon(53% 0, 100% 0, 100% 42%, 40% 35%)',
  'polygon(0 47%, 40% 35%, 53% 65%, 0 100%)',
  'polygon(40% 35%, 100% 42%, 76% 74%, 53% 65%)',
  'polygon(0 100%, 53% 65%, 76% 74%, 62% 100%)',
  'polygon(76% 74%, 100% 42%, 100% 100%, 62% 100%)'
];

export default function VerdictScreen() {
  const { save, chapter, finishChapter, sound, t } = useGame();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [category, setCategory] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [debrief, setDebrief] = useState(false);
  const [read, setRead] = useState(false);
  const timer = useRef(null);
  const choices = [chapter.action_c, 'Làm theo ngay để tránh mất cơ hội hoặc bị xử lý.', 'Trả thêm một khoản để lấy lại tiền hoặc quyền truy cập.'];
  const actionOrder = save.active_c % 2 ? [1, 2, 0] : [2, 0, 1];
  const categories = CHAPTERS.map(c => c.category_c);
  const ready = category && evidence.length === 2 && action;
  const steps = [Boolean(category), evidence.length === 2, Boolean(action)];
  useEffect(() => () => clearTimeout(timer.current), []);

  function toggleEvidence(index) {
    if (result) return;
    setEvidence(items => items.includes(index) ? items.filter(item => item !== index) : items.length < 2 ? [...items, index] : [items[1], index]);
  }
  function submit() {
    if (!ready || result) return;
    const checks = [category === chapter.category_c, evidence.includes(0) && evidence.includes(2), action === chapter.action_c];
    const correct = checks.every(Boolean);
    const stars = correct ? (save.clues_c.length === chapter.clues_c.length ? 3 : 2) : 1;
    setResult({ checks_c: checks, correct_c: correct, stars_c: stars });
    sound(correct);
    timer.current = setTimeout(() => setDebrief(true), reduced ? 0 : 1050);
  }
  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  if (save.clues_c.length < 3) return <Navigate to="/clues" replace/>;

  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-9">
    <PageHeader back="/clues" title={t('Phán Quyết', 'Verdict')} subtitle={t('Bạn đã điều tra đủ chưa? Hãy đưa ra kết luận.', 'Have you investigated enough? Make your conclusion.')}/>
    <ol className="mb-6 flex gap-3 border-b border-border pb-5">
      {['Loại lừa đảo', 'Chứng cứ', 'Hành động'].map((label, i) => <li key={label} className="flex flex-1 items-center gap-2 text-xs"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-bold ${steps[i] ? 'border-chart-2 bg-secondary text-accent-foreground' : 'border-border text-muted-foreground'}`}>{steps[i] ? <ApperIcon name="Check" className="h-4 w-4"/> : i + 1}</span><span className="hidden sm:inline">{label}</span></li>)}
    </ol>
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        <fieldset disabled={Boolean(result)} className="panel-cut border border-border bg-card p-5 sm:p-6">
          <legend className="bg-background px-2 font-heading text-2xl font-semibold">01 / Đây là loại lừa đảo nào?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map(value => <button key={value} type="button" onClick={() => setCategory(value)} aria-pressed={category === value} className={`game-focus min-h-12 border px-3 py-3 text-left text-xs font-semibold transition-colors hover:bg-secondary ${category === value ? 'border-chart-2 bg-secondary text-accent-foreground' : 'border-border bg-background'}`}>{value}</button>)}
          </div>
        </fieldset>
        <fieldset disabled={Boolean(result)} className="panel-cut border border-border bg-card p-5 sm:p-6">
          <legend className="bg-background px-2 font-heading text-2xl font-semibold">02 / Hai chứng cứ quan trọng nhất?</legend>
          <p className="mb-3 text-xs text-muted-foreground">Chọn hai dấu hiệu trực tiếp vạch trần lời nói dối. Đã chọn {evidence.length}/2.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapter.clues_c.map((clue, i) => <button key={i} type="button" disabled={!save.clues_c.includes(i)} onClick={() => toggleEvidence(i)} aria-pressed={evidence.includes(i)}
              className={`game-focus flex min-h-16 items-center gap-3 border p-3 text-left text-xs transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 ${evidence.includes(i) ? 'border-chart-2 bg-secondary' : 'border-border bg-background'}`}>
              <ApperIcon name={save.clues_c.includes(i) ? evidence.includes(i) ? 'CheckCircle2' : 'Fingerprint' : 'Lock'} className="h-5 w-5 shrink-0 text-accent-foreground"/>
              {save.clues_c.includes(i) ? clue[0] : '??? · Chưa tìm thấy'}
            </button>)}
          </div>
        </fieldset>
        <fieldset disabled={Boolean(result)} className="panel-cut border border-border bg-card p-5 sm:p-6">
          <legend className="bg-background px-2 font-heading text-2xl font-semibold">03 / Nạn nhân nên làm gì?</legend>
          <div className="space-y-2">{actionOrder.map(index => <button key={index} type="button" onClick={() => setAction(choices[index])} aria-pressed={action === choices[index]} className={`game-focus min-h-12 w-full border px-4 py-3 text-left text-sm leading-relaxed transition-colors hover:bg-secondary ${action === choices[index] ? 'border-chart-2 bg-secondary text-accent-foreground' : 'border-border bg-background'}`}>{choices[index]}</button>)}</div>
        </fieldset>
      </div>
      <aside className="panel-cut relative min-h-56 overflow-hidden border border-border bg-secondary lg:min-h-[650px]">
        <div className="absolute inset-0 game-grid opacity-30"/>
        <p className="relative p-5 font-heading text-2xl font-bold uppercase text-primary">Đối tượng / {chapter.suspect_c}</p>
        <div className="relative mx-auto h-64 w-64 lg:h-[540px] lg:w-full">
          {result?.correct_c && !reduced ? SHARDS.map((clip, i) => <motion.div key={i} initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: (i % 2 ? 1 : -1) * (170 + i * 35), y: i < 2 ? -200 : 120 + i * 30, rotate: (i % 2 ? 1 : -1) * 38, opacity: 0 }} transition={{ duration: .4, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0" style={{ clipPath: clip }}><Portrait variant="suspect" emotion="shocked" className="h-full w-full"/></motion.div>)
            : <Portrait variant="suspect" emotion={result ? 'happy' : 'suspicious'} className={`h-full w-full ${result && !result.correct_c ? 'grayscale' : ''}`}/>}
        </div>
        {result && <motion.div initial={reduced ? false : { scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .25 }} className={`absolute inset-x-5 top-1/2 -rotate-6 border-4 bg-background/95 px-5 py-3 text-center font-heading text-5xl font-black ${result.correct_c ? 'border-success text-success' : 'border-destructive text-destructive'}`}>{result.correct_c ? 'ĐÚNG RỒI!' : 'CHƯA ĐÚNG'}</motion.div>}
        <p className="relative px-5 pb-5 text-xs leading-relaxed text-muted-foreground">Đừng chỉ nhìn khuôn mặt. Hãy nhìn yêu cầu, động cơ và chứng cứ.</p>
      </aside>
    </div>
    <div className="sticky bottom-0 z-20 mt-6 border-t border-border bg-background/95 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Button onClick={result ? () => setDebrief(true) : submit} disabled={!ready} className="h-14 w-full gap-3 bg-primary text-base font-extrabold text-primary-foreground hover:bg-primary/90"><ApperIcon name="Gavel" className="h-5 w-5"/>{result ? 'Đọc bài học' : 'Nộp Phán Quyết'}</Button>
    </div>
    <Sheet open={debrief} onOpenChange={setDebrief}>
      <SheetContent side="bottom" className="flex h-[94dvh] flex-col gap-0 border-border bg-background p-0">
        <SheetHeader className="shrink-0 border-b border-border p-6">
          <SheetTitle className="font-heading text-3xl uppercase sm:text-4xl">SỰ THẬT SAU MÀN HÌNH</SheetTitle>
          <SheetDescription>Hồ sơ {chapter.number_c} · Tình huống hư cấu dựa trên các thủ đoạn phổ biến.</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <motion.article initial={reduced ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }} className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-y-2 border-foreground py-3"><span className="font-heading text-2xl font-bold">NETTRAP / BẢN TIN AN TOÀN</span><span className="text-xs text-muted-foreground">22.10.2026 · Giáo dục số</span></div>
            <h2 className="my-5 font-heading text-4xl font-bold sm:text-6xl">{chapter.category_c}: cái bẫy đã được dựng như thế nào?</h2>
            <div className="mb-6 flex items-center gap-3">
              {[0, 1, 2].map(i => <motion.div key={i} initial={reduced ? false : { scale: .5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .15, delay: i * .15 }}><ApperIcon name="Star" className={`h-8 w-8 ${i < (result?.stars_c || 0) ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`}/></motion.div>)}
              <span className="text-xs text-muted-foreground">{result?.stars_c}/3 sao · Hoàn thành bài học để lưu</span>
            </div>
            {result && !result.correct_c && <div className="mb-6 border-l-4 border-destructive bg-muted p-4 text-sm leading-relaxed"><b>Cần kiểm tra lại:</b><ul className="mt-2 list-disc space-y-2 pl-5">
              {!result.checks_c[0] && <li>Loại lừa đảo đúng: {chapter.category_c}.</li>}
              {!result.checks_c[1] && <li>Hai chứng cứ then chốt: {chapter.clues_c[0][0]} và {chapter.clues_c[2][0]}.</li>}
              {!result.checks_c[2] && <li>Hành động an toàn: {chapter.action_c}</li>}
            </ul></div>}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-5">
                <section><h3 className="mb-2 font-heading text-2xl font-semibold">Bản chất thủ đoạn</h3><p className="text-sm leading-relaxed">{chapter.definition_c}</p></section>
                <section><h3 className="mb-2 font-heading text-2xl font-semibold">Diễn biến vụ án</h3><p className="text-sm leading-relaxed text-muted-foreground">{chapter.intro_c} {chapter.twist_c}</p></section>
                <section><h3 className="mb-2 font-heading text-2xl font-semibold">Dấu hiệu phải dừng lại</h3><ul className="space-y-3">{chapter.clues_c.map((clue, i) => <li key={i} className="flex gap-3 text-sm leading-relaxed"><ApperIcon name="Flag" className="mt-1 h-4 w-4 shrink-0 text-primary"/>{clue[1]}</li>)}</ul></section>
              </div>
              <div className="space-y-5">
                <section className="panel-cut border border-success-border bg-success-muted p-5"><h3 className="mb-3 font-heading text-2xl font-bold text-success">Bạn có thể làm ngay</h3><p className="text-sm leading-relaxed">{chapter.action_c}</p><p className="mt-4 text-sm leading-relaxed">{REPORT_TEXT}</p></section>
                <section><h3 className="mb-2 font-heading text-2xl font-semibold">Kiểm tra nguồn chính thức</h3><p className="text-xs leading-relaxed text-muted-foreground">Đây không phải hồ sơ người thật hay tư vấn pháp lý. Kiểm tra hướng dẫn hiện hành từ cơ quan chức năng.</p><a href={REFERENCE_URL} target="_blank" rel="noreferrer" className="game-focus mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-foreground hover:underline">Cổng thông tin Bộ Công an<ApperIcon name="ExternalLink" className="h-4 w-4"/></a></section>
                <Button variant="outline" onClick={() => shareSafetyCard(chapter.category_c, [chapter.action_c, ...chapter.clues_c.slice(0, 3).map(c => c[3])])} className="h-12 w-full gap-2 border-border text-sm font-semibold hover:bg-secondary"><ApperIcon name="Share2" className="h-4 w-4"/>Chia sẻ bài học</Button>
              </div>
            </div>
            <label className="game-focus mt-8 flex cursor-pointer items-start gap-3 border-t border-border py-5 text-sm leading-relaxed"><input type="checkbox" checked={read} onChange={e => setRead(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary"/>Tôi đã đọc dấu hiệu cảnh báo và biết hành động an toàn cần làm.</label>
          </motion.article>
        </div>
        <SheetFooter className="shrink-0 border-t border-border p-6">
          <Button disabled={!read} onClick={() => { finishChapter(result.stars_c); setDebrief(false); navigate('/chapters'); }} className="mx-auto h-12 w-full max-w-4xl bg-primary font-bold text-primary-foreground hover:bg-primary/90">{save.active_c === CHAPTERS.length - 1 ? 'Hoàn thành hồ sơ · Xem thành tích' : 'Lưu bài học · Chương tiếp theo'}<ApperIcon name="ArrowRight" className="ml-2 h-4 w-4"/></Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>;
}