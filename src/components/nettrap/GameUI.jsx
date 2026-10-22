import { Link } from "react-router-dom";
import { toast } from "sonner";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LANGUAGES, TEXT_SPEEDS } from "./story";
import { useGame } from "./GameState";
import React from "react";

export function PageHeader({ title, subtitle, back = '/', action }) {
  const { t } = useGame();
  return <header className="mb-7 space-y-5">
    <div className="flex items-center justify-between gap-3">
      <Link to={back} aria-label={t('Quay lại', 'Go back')} className="game-focus flex h-11 w-11 items-center justify-center border border-border bg-card transition-colors hover:bg-accent">
        <ApperIcon name="ArrowLeft" className="h-5 w-5"/>
      </Link>
      <nav aria-label={t('Menu trò chơi', 'Game menu')} className="flex items-center gap-1 text-xs font-semibold sm:gap-4">
        <Link className="game-focus px-2 py-3 transition-colors hover:text-primary" to="/chapters">{t('Vụ án', 'Cases')}</Link>
        <Link className="game-focus px-2 py-3 transition-colors hover:text-primary" to="/codex">{t('Sổ tay', 'Codex')}</Link>
        <Link className="game-focus px-2 py-3 transition-colors hover:text-primary" to="/gallery">{t('Thư viện', 'Gallery')}</Link>
      </nav>
    </div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="font-heading text-5xl font-bold uppercase tracking-tight sm:text-6xl">{title}</h1>{subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}</div>
      {action}
    </div>
  </header>;
}

export function SettingsDrawer() {
  const { save, settingsOpen, setSettingsOpen, setSettings, t } = useGame();
  const settings = save.settings_c;
  return <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
    <SheetContent side="bottom" className="mx-auto flex max-h-[85vh] max-w-2xl flex-col gap-0 rounded-t-xl border-border bg-card p-0">
      <SheetHeader className="shrink-0 border-b border-border p-6">
        <SheetTitle className="font-heading text-3xl uppercase">{t('Cài đặt', 'Settings')}</SheetTitle>
        <SheetDescription>{t('Lưu trên thiết bị này. Không cần tài khoản.', 'Saved on this device. No account needed.')}</SheetDescription>
      </SheetHeader>
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="sfx" className="text-sm font-semibold">{t('Hiệu ứng âm thanh', 'Sound effects')}</label>
          <input id="sfx" type="checkbox" checked={settings.sfx_c} onChange={e => setSettings({ sfx_c: e.target.checked })} className="game-focus h-5 w-5 accent-primary"/>
        </div>
        <div className="space-y-2">
          <label htmlFor="bgm" className="flex justify-between text-sm font-semibold">{t('Âm lượng nhạc nền', 'Music volume')}<span className="text-muted-foreground">{settings.volume_c}%</span></label>
          <input id="bgm" type="range" min="0" max="100" value={settings.volume_c} onChange={e => setSettings({ volume_c: Number(e.target.value) })} className="game-focus game-range w-full"/>
          <button type="button" className="game-focus py-2 text-xs text-primary hover:underline" onClick={() => setSettings({ muted_c: !settings.muted_c })}>{settings.muted_c ? t('Bật âm thanh', 'Enable audio') : t('Tắt âm thanh', 'Mute audio')}</button>
        </div>
        <div className="space-y-2">
          <label htmlFor="speed" className="text-sm font-semibold">{t('Tốc độ hội thoại', 'Dialogue speed')}</label>
          <select id="speed" value={settings.speed_c} onChange={e => setSettings({ speed_c: e.target.value })} className="game-focus h-12 w-full border border-input bg-background px-3 text-sm">
            {TEXT_SPEEDS.map((speed, i) => <option key={speed} value={speed}>{t(speed, ['Slow', 'Normal', 'Fast'][i])}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-semibold">{t('Ngôn ngữ điều khiển', 'Interface language')}</label>
          <select id="language" value={settings.language_c} onChange={e => setSettings({ language_c: e.target.value })} className="game-focus h-12 w-full border border-input bg-background px-3 text-sm">
            {LANGUAGES.map(language => <option key={language}>{language}</option>)}
          </select>
          <p className="text-xs leading-relaxed text-muted-foreground">{t('Hồ sơ và bài học giữ tiếng Việt để phù hợp bối cảnh địa phương. English có tóm tắt hội thoại.', 'Case files and safety lessons remain in Vietnamese. English includes dialogue summaries.')}</p>
        </div>
      </div>
      <SheetFooter className="shrink-0 border-t border-border p-6">
        <Button onClick={() => setSettingsOpen(false)} className="h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90">{t('Xong', 'Done')}</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>;
}

export function Stars({ count = 0, className = '' }) {
  return <span className={`inline-flex gap-1 ${className}`} aria-label={`${count}/3 sao`}>
    {[0, 1, 2].map(i => <ApperIcon key={i} name="Star" className={`h-4 w-4 ${i < count ? 'fill-warning text-warning' : 'text-muted-foreground/40'}`}/>)}
  </span>;
}

function wrapText(context, text, x, y, width, lineHeight) {
  const words = String(text).split(/\s+/);
  let line = '';
  words.forEach(word => {
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width > width && line) {
      context.fillText(line, x, y); y += lineHeight; line = word;
    } else line = next;
  });
  if (line) { context.fillText(line, x, y); y += lineHeight; }
  return y;
}

export async function shareSafetyCard(title, lines, filename = 'nettrap-bai-hoc') {
  try {
    await document.fonts.ready;
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 800;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Không thể tạo thẻ ảnh.');
const style = window.getComputedStyle(document.documentElement);
    const color = key => style.getPropertyValue(`--${key}`).trim();
    context.fillStyle = color('background'); context.fillRect(0, 0, 1200, 800);
    context.strokeStyle = color('primary'); context.lineWidth = 6;
    context.beginPath(); context.moveTo(34, 28); context.lineTo(1150, 28); context.lineTo(1170, 48); context.lineTo(1170, 772); context.lineTo(50, 772); context.lineTo(30, 752); context.closePath(); context.stroke();
    context.fillStyle = color('primary'); context.font = 'bold 34px "Be Vietnam Pro", sans-serif'; context.fillText('NETTRAP / GIỮ AN TOÀN TRÊN MẠNG', 65, 85);
    context.fillStyle = color('foreground'); context.font = 'bold 58px "Barlow Condensed", sans-serif';
    let y = wrapText(context, title.toUpperCase(), 65, 167, 1060, 64) + 24;
    context.font = '25px "Be Vietnam Pro", sans-serif';
    for (const line of lines.slice(0, 5)) { y = wrapText(context, `• ${line}`, 65, y, 1055, 36) + 18; }
    context.fillStyle = color('muted-foreground'); context.font = '19px "Be Vietnam Pro", sans-serif';
    context.fillText('Dừng lại. Kiểm chứng. Tìm hỗ trợ.  |  Tình huống giáo dục hư cấu.', 65, 733);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Không thể tạo ảnh.');
const file = new window.File([blob], `${filename}.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title, files: [file] });
      return;
    }
    downloadBlob(blob, `${filename}.png`);
    toast.success('Đã tải thẻ ảnh. Bạn có thể gửi qua ứng dụng yêu thích.');
  } catch (error) {
    if (error.name !== 'AbortError') {
      toast.error(error.message || 'Không thể chia sẻ. Hãy thử lại.');
      console.error(`NetTrap share failed: ${error.message}`);
    }
  }
}
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}