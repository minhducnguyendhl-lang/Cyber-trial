import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { CHAPTERS, REPORT_TEXT, REFERENCE_URL } from '@/components/nettrap/story';
import { useGame } from '@/components/nettrap/GameState';
import { PageHeader, shareSafetyCard } from '@/components/nettrap/GameUI';

export const route = { path: '/codex', layout: 'public', access: 'public' };
export const nav = { icon: 'Library', label: 'Sổ Tay Lừa Đảo', order: 30, profiles: null };

const ICONS = ['Link', 'BadgeAlert', 'TrendingUp', 'AudioLines', 'BriefcaseBusiness', 'KeyRound', 'ShieldCheck'];

export default function ScamCodex() {
  const { save, totalCompleted, t } = useGame();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const entries = CHAPTERS.filter(chapter => (filter === 'all' || chapter.key_c === filter) &&
    `${chapter.category_c} ${chapter.title_c} ${chapter.definition_c}`.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')));
  const unlocked = selected != null && Boolean(save.completed_c[selected]);
  const chapter = selected == null ? null : CHAPTERS[selected];

  function printGuide() {
    if (!totalCompleted) { toast.info('Hoàn thành một vụ án để mở bài học đầu tiên.'); return; }
    toast.info('Chọn “Lưu dưới dạng PDF” trong hộp thoại in.');
    window.print();
  }
  return <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-9">
    <PageHeader title={t('Sổ Tay Lừa Đảo', 'Scam Codex')} subtitle={t('Nhận diện cái bẫy. Ghi nhớ cách thoát. Bài học mở khóa sau mỗi vụ án.', 'Recognize the trap. Remember the safe response. Unlock lessons by completing cases.')}
      action={<Button variant="outline" onClick={printGuide} className="h-11 gap-2 border-border px-4 text-xs font-bold hover:bg-secondary"><ApperIcon name="FileDown" className="h-4 w-4"/>Xuất sổ tay PDF</Button>}/>
    <div className="mb-6 flex items-center gap-4 border-l-4 border-chart-2 bg-secondary px-4 py-3">
      <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-label={`${totalCompleted}/${CHAPTERS.length} bài học đã mở`}>
        <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border)" strokeWidth="3"/><circle cx="22" cy="22" r="18" fill="none" stroke="var(--chart-2)" strokeWidth="3" strokeDasharray={`${totalCompleted / CHAPTERS.length * 113} 113`}/>
      </svg>
      <div><p className="text-sm font-bold">{totalCompleted}/{CHAPTERS.length} bài học đã mở</p><p className="mt-1 text-xs text-muted-foreground">Mỗi bài học là một lớp bảo vệ cho bạn và người thân.</p></div>
    </div>
    <div className="sticky top-0 z-20 space-y-3 border-b border-border bg-background/95 pb-4 pt-2">
      <div role="tablist" aria-label="Loại lừa đảo" className="flex gap-2 overflow-x-auto pb-1">
        <button type="button" role="tab" aria-selected={filter === 'all'} onClick={() => setFilter('all')} className={`game-focus shrink-0 border px-4 py-3 text-xs font-bold transition-colors hover:bg-secondary ${filter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'}`}>Tất cả</button>
        {CHAPTERS.map(chapter => <button type="button" key={chapter.key_c} role="tab" aria-selected={filter === chapter.key_c} onClick={() => setFilter(chapter.key_c)} className={`game-focus shrink-0 border px-4 py-3 text-xs font-semibold transition-colors hover:bg-secondary ${filter === chapter.key_c ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'}`}>{chapter.short_c}</button>)}
      </div>
      <div className="relative"><ApperIcon name="Search" className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"/><Input aria-label="Tìm kiếm sổ tay" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm tên thủ đoạn, OTP, chuyển tiền…" className="h-12 border-input bg-card pl-10 text-sm"/></div>
    </div>
    <div className="mt-5 space-y-3">
      {entries.map(chapter => {
        const index = CHAPTERS.indexOf(chapter);
        const open = Boolean(save.completed_c[index]);
        return <button key={chapter.key_c} type="button" onClick={() => { setSelected(index); setAnswers({}); }} className="game-focus panel-cut flex min-h-24 w-full items-center gap-4 border border-border bg-card p-4 text-left shadow-xs transition-colors hover:border-primary/50 hover:bg-muted sm:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-secondary text-accent-foreground"><ApperIcon name={ICONS[index]} className="h-5 w-5"/></span>
          <span className="min-w-0 flex-1"><span className="block font-heading text-2xl font-semibold">{chapter.category_c}</span><span className="mt-1 block line-clamp-1 text-xs text-muted-foreground">{chapter.hook_c}</span></span>
          <span className={`flex shrink-0 items-center gap-2 text-xs ${open ? 'text-success' : 'text-muted-foreground'}`}><ApperIcon name={open ? 'BookOpen' : 'LockKeyhole'} className="h-4 w-4"/><span className="hidden sm:inline">{open ? 'Đã mở' : `Vụ ${chapter.number_c}`}</span></span>
        </button>;
      })}
      {!entries.length && <div className="panel-cut border border-dashed border-border p-10 text-center"><ApperIcon name="SearchX" className="mx-auto mb-4 h-10 w-10 text-muted-foreground"/><p className="text-sm text-muted-foreground">Không tìm thấy bài học phù hợp. Thử từ khóa khác.</p><Button variant="outline" onClick={() => { setSearch(''); setFilter('all'); }} className="mt-5 h-11 border-border">Xóa tìm kiếm</Button></div>}
    </div>
    <Sheet open={selected != null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <SheetContent side="bottom" className="flex h-[94dvh] flex-col gap-0 border-border bg-background p-0">
        <SheetHeader className="shrink-0 border-b border-border p-6"><SheetTitle className="font-heading text-3xl uppercase">{chapter?.category_c || 'Hồ sơ'}</SheetTitle><SheetDescription>NetTrap / Sổ tay thực địa · Tình huống giáo dục hư cấu</SheetDescription></SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {chapter && (unlocked ? <div className="mx-auto max-w-3xl space-y-7">
            <p className="text-base leading-relaxed">{chapter.definition_c}</p>
            <section><h2 className="mb-4 font-heading text-3xl font-semibold">Cách cái bẫy vận hành</h2><ol className="space-y-4">{chapter.mechanism_c.map((step, i) => <li key={i} className="flex gap-4 text-sm leading-relaxed"><span className="font-heading text-3xl font-bold text-primary">{i + 1}</span><span className="pt-1">{step}</span></li>)}</ol></section>
            <section><h2 className="mb-3 font-heading text-3xl font-semibold">Dấu hiệu cảnh báo</h2><ul className="space-y-3">{chapter.clues_c.map((clue, i) => <li key={i} className="flex gap-3 text-sm leading-relaxed"><ApperIcon name="Flag" className="mt-1 h-4 w-4 shrink-0 text-primary"/>{clue[3]}</li>)}</ul></section>
            <section className="panel-cut border border-success-border bg-success-muted p-5"><h2 className="mb-3 font-heading text-3xl font-bold text-success">Nếu bạn đang bị nhắm tới</h2><p className="text-sm leading-relaxed">{chapter.action_c}</p><p className="mt-4 text-sm leading-relaxed">{REPORT_TEXT}</p></section>
            <a href={REFERENCE_URL} target="_blank" rel="noreferrer" className="game-focus inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-foreground hover:underline">Đọc thông tin từ Bộ Công an<ApperIcon name="ExternalLink" className="h-4 w-4"/></a>
            <section className="border-t border-border pt-6">
              <h2 className="mb-4 font-heading text-3xl font-semibold">Thử phản xạ an toàn</h2>
              {[0, 1].map(q => <div key={q} className="mb-6 space-y-3">
                <p className="text-sm font-semibold">{chapter.questions_c[q][0]}</p>
                {[2, 0, 1].map(index => <button key={index} type="button" onClick={() => setAnswers(a => ({ ...a, [q]: index }))} className={`game-focus block min-h-12 w-full border p-3 text-left text-sm leading-relaxed transition-colors hover:bg-secondary ${answers[q] === index ? 'border-chart-2 bg-secondary' : 'border-border bg-card'}`}>{chapter.questions_c[q][index + 1]}</button>)}
                {answers[q] != null && <p aria-live="polite" className={`text-sm ${answers[q] === 0 ? 'text-success' : 'text-destructive'}`}>{answers[q] === 0 ? 'Đúng. Kiểm chứng trước khi hành động.' : `Chưa đúng. Hãy nhớ: ${chapter.questions_c[q][1]}`}</p>}
              </div>)}
            </section>
          </div> : <div className="mx-auto flex max-w-md flex-col items-center justify-center py-16 text-center"><ApperIcon name="LockKeyhole" className="mb-5 h-14 w-14 text-primary"/><h2 className="font-heading text-3xl font-semibold">Bài học vẫn đang khóa</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Hoàn thành Vụ {chapter.number_c} để mở khóa bài học này.</p><Link to="/chapters" onClick={() => setSelected(null)} className="game-focus panel-cut mt-6 flex min-h-12 items-center justify-center bg-primary px-8 font-bold text-primary-foreground hover:bg-primary/90">Chơi ngay</Link></div>)}
        </div>
        <SheetFooter className="shrink-0 border-t border-border p-6"><Button disabled={!unlocked} onClick={() => shareSafetyCard(chapter.category_c, [chapter.action_c, ...chapter.clues_c.slice(0, 3).map(c => c[3])])} className="mx-auto h-12 w-full max-w-3xl gap-2 bg-primary font-bold text-primary-foreground hover:bg-primary/90"><ApperIcon name="Share2" className="h-4 w-4"/>Chia sẻ thẻ an toàn</Button></SheetFooter>
      </SheetContent>
    </Sheet>
    <div className="print-only">
      <h1>NetTrap — Sổ tay phòng chống lừa đảo</h1>
      <p>Tình huống giáo dục hư cấu. Dừng lại, kiểm chứng và tìm hỗ trợ.</p>
      {CHAPTERS.filter((_, i) => save.completed_c[i]).map(chapter => <article key={chapter.key_c}><h2>{chapter.category_c}</h2><p>{chapter.definition_c}</p><ol>{chapter.mechanism_c.map((step, i) => <li key={i}>{step}</li>)}</ol><h3>Dấu hiệu cảnh báo</h3><ul>{chapter.clues_c.map((clue, i) => <li key={i}>{clue[3]}</li>)}</ul><p><strong>{chapter.action_c}</strong></p></article>)}
      <p>{REPORT_TEXT}</p><p>Nguồn tham khảo: {REFERENCE_URL}</p>
    </div>
  </div>;
}