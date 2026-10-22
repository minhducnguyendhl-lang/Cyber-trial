import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import SceneArt from '@/components/nettrap/Art';
import { useGame } from '@/components/nettrap/GameState';

export const route = { path: '/', layout: 'public', access: 'public' };
export const nav = { icon: 'Home', label: 'Màn Hình Chính', order: 10, profiles: null };

export default function TitleScreen() {
  const { save, reset, setSettingsOpen, t } = useGame();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  function begin() {
    if (save.has_session_c || Object.keys(save.completed_c).length) setConfirm(true);
    else navigate('/chapters');
  }
  return <section className="relative isolate flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <SceneArt className="absolute right-[-32%] top-0 h-[78%] w-[155%] max-w-none opacity-65 sm:right-[-12%] sm:h-full sm:w-[110%] sm:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/0"/>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/90 to-transparent"/>
      {[0, 1, 2, 3, 4].map(i => <ApperIcon key={i} name="Fish" className="hook-fall absolute top-0 h-7 w-7 text-primary/20" style={{ left: `${15 + i * 19}%`, animationDelay: `${-i * 3.5}s` }}/>)}
    </div>
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 sm:px-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-accent-foreground"><span className="h-px w-10 bg-chart-2"/> {t('Visual novel trinh thám', 'Detective visual novel')}</p>
        <h1 data-text="CYBER-M" className="title-glitch font-heading text-[clamp(4rem,12vw,9rem)] font-black leading-[.9] tracking-[-.045em]">CYBER<span className="text-primary">-M</span></h1>
        <div className="mt-6 max-w-md border-l-4 border-primary pl-4">
          <p className="font-heading text-3xl font-semibold uppercase sm:text-4xl">Phiên tòa không có nhân chứng</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Mười sinh viên. Bảy chương trong Mê Cung Số. Khi tin nhắn, giọng nói và bằng chứng đều có thể giả mạo, bạn sẽ tin vào điều gì? Điều tra cùng An, chất vấn Cyber-M và tìm đường đưa mọi người trở về.</p>
        </div>
        <div className="mt-8 flex max-w-sm flex-col gap-3">
          <Button onClick={begin} className="h-14 rounded-full bg-primary text-base font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90"><ApperIcon name="Play" className="mr-2 h-5 w-5 fill-current"/>{t('Bắt Đầu', 'Start')}</Button>
          {save.has_session_c && <Button onClick={() => navigate('/play')} variant="outline" className="h-12 rounded-full border-chart-2/50 bg-background/80 text-sm font-bold text-accent-foreground hover:bg-secondary"><ApperIcon name="RotateCcw" className="mr-2 h-4 w-4"/>{t('Tiếp Tục', 'Continue')} · {t('Vụ', 'Case')} {String(save.active_c + 1).padStart(2, '0')}</Button>}
          <Button onClick={() => setSettingsOpen(true)} variant="ghost" className="h-11 rounded-full text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{t('Cài Đặt', 'Settings')}</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <Link to="/codex" className="game-focus flex items-center gap-2 py-2 hover:text-primary"><ApperIcon name="Library" className="h-4 w-4"/>{t('Sổ Tay Lừa Đảo', 'Scam Codex')}</Link>
          <Link to="/gallery" className="game-focus flex items-center gap-2 py-2 hover:text-primary"><ApperIcon name="Images" className="h-4 w-4"/>{t('Thư Viện', 'Gallery')}</Link>
        </div>
      </div>
      <p className="mt-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:absolute sm:bottom-20 sm:right-10 sm:max-w-48 sm:text-right">Solve the case.<br/>Outsmart the scammer.<br/>Stay safe.</p>
    </div>
    <div className="flex h-10 shrink-0 items-center overflow-hidden border-t border-chart-2/30 bg-secondary text-xs text-accent-foreground">
      <span className="z-10 flex h-full shrink-0 items-center bg-secondary px-5 font-bold">NET / NEWS</span>
      <p className="news-scroll px-4">{save.newest_c != null ? `Vụ ${String(save.newest_c + 1).padStart(2, '0')} đã mở khóa!` : 'Hồ sơ đầu tiên đang chờ bạn.'} — Dừng lại. Kiểm chứng. Tìm hỗ trợ. — Không ai có lỗi vì đã cần một người để tin tưởng.</p>
    </div>
    <Dialog open={confirm} onOpenChange={setConfirm}>
      <DialogContent className="border-border bg-card p-6">
        <DialogHeader><DialogTitle className="font-heading text-3xl">Bắt đầu lại?</DialogTitle><DialogDescription>Tiến trình, sao và hình ảnh đã mở khóa trên thiết bị này sẽ bị xóa. Bạn vẫn có thể chọn Tiếp Tục.</DialogDescription></DialogHeader>
        <DialogFooter className="gap-2 pt-4">
          <Button variant="outline" onClick={() => setConfirm(false)} className="h-11 border-border">Giữ tiến trình</Button>
          <Button onClick={() => { reset(); setConfirm(false); navigate('/chapters'); }} className="h-11 bg-primary font-bold text-primary-foreground hover:bg-primary/90">Bắt đầu lại</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </section>;
}