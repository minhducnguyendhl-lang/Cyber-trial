import { useState } from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { useGame } from './GameState';

export default function CluePanel({ compact = false }) {
  const { chapter, save, t } = useGame();
  const [flipped, setFlipped] = useState({});
  return <div className={compact ? 'space-y-4' : 'grid gap-6 lg:grid-cols-[1.8fr_1fr]'}>
    <div className="relative">
      {!compact && <svg viewBox="0 0 700 700" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" aria-hidden="true">
        {save.clues_c.length >= 2 && <path d="M175 120 525 120 175 340 525 340 175 580" className="string-reveal" fill="none" stroke="var(--primary)" strokeWidth="2" opacity=".5"/>}
      </svg>}
      <div className={`relative grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        {chapter.clues_c.map((clue, i) => {
          const unlocked = save.clues_c.includes(i);
          return <div key={`${chapter.key_c}-${i}`} className="evidence-flip">
            <button type="button" disabled={!unlocked} onClick={() => setFlipped(s => ({ ...s, [i]: !s[i] }))} aria-pressed={Boolean(flipped[i])} aria-label={unlocked ? `Lật manh mối ${i + 1}: ${clue[0]}` : `Manh mối ${i + 1} chưa tìm thấy`}
              className={`game-focus block w-full text-left ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
              <div className={`evidence-flip-inner relative min-h-[235px] ${flipped[i] ? 'flipped' : ''}`}>
                <div className="evidence-face panel-cut absolute inset-0 flex flex-col border border-border bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-primary">E / {String(i + 1).padStart(2, '0')}</span>
                    <ApperIcon name={unlocked ? 'Pin' : 'LockKeyhole'} className="h-4 w-4 text-muted-foreground"/>
                  </div>
                  {unlocked ? <>
                    <div className="mb-3 truncate border-l-2 border-primary bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">{clue[2]}</div>
                    <h2 className="font-heading text-2xl font-semibold">{clue[0]}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clue[1]}</p>
                    <span className="mt-auto pt-3 text-xs text-accent-foreground">{t('Chạm để đọc chứng cứ ↻', 'Tap to inspect ↻')}</span>
                  </> : <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground"><ApperIcon name="Fingerprint" className="mb-3 h-10 w-10 opacity-30"/><span className="font-heading text-3xl">???</span><p className="mt-2 text-xs">{t('Tìm trong hội thoại', 'Find in the dialogue')}</p></div>}
                </div>
                <div className="evidence-face evidence-back panel-cut absolute inset-0 flex flex-col border border-primary/40 bg-secondary p-5">
                  <p className="text-xs font-bold text-accent-foreground">{t('BẢN CHỤP CHỨNG CỨ', 'EVIDENCE TRANSCRIPT')} · 22.10.2026</p>
                  <blockquote className="my-3 text-sm font-semibold leading-relaxed">“{unlocked ? clue[2] : '???'}”</blockquote>
                  <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">{unlocked ? clue[3] : ''}</p>
                </div>
              </div>
            </button>
          </div>;
        })}
      </div>
    </div>
    <div>
      <details open={!compact} className="panel-cut border border-border bg-card lg:sticky lg:top-20">
        <summary className="game-focus cursor-pointer p-5 font-heading text-2xl font-semibold">{t('Hồ sơ nạn nhân', 'Victim file')}</summary>
        <div className="space-y-4 px-5 pb-5">
          <p className="text-xs font-semibold tracking-widest text-primary">VỤ {chapter.number_c} / {chapter.category_c}</p>
          <h2 className="font-heading text-3xl font-bold">{chapter.title_c}</h2>
          <p className="text-sm">{chapter.victim_c}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{chapter.hook_c}</p>
          <div className="border-t border-border pt-4">
            <p className="font-heading text-4xl font-semibold">{save.clues_c.length}<span className="text-lg text-muted-foreground"> / {chapter.clues_c.length}</span></p>
            <p className="mt-1 text-xs text-muted-foreground">{t('Đầu mối còn thiếu', 'Missing evidence')}: {chapter.clues_c.length - save.clues_c.length}</p>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{t('Cần ít nhất 3 manh mối. Bạn có thể xem lại hội thoại để tìm phần đã bỏ lỡ.', 'Find at least 3 clues. Replay dialogue to recover missed evidence.')}</p>
        </div>
      </details>
      <div className="sticky bottom-0 mt-4 bg-background py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {save.clues_c.length >= 3 ? <Link to="/verdict" className="game-focus panel-cut flex min-h-14 items-center justify-center gap-3 bg-primary px-5 font-bold text-primary-foreground transition-colors hover:bg-primary/90"><ApperIcon name="Gavel" className="h-5 w-5"/>{t('Đi đến Phán Quyết', 'Make a verdict')}</Link>
          : <div className="panel-cut flex min-h-14 items-center justify-center gap-2 bg-muted px-4 text-sm text-muted-foreground"><ApperIcon name="Lock" className="h-4 w-4"/>{t('Cần thêm manh mối', 'More evidence needed')}</div>}
      </div>
    </div>
  </div>;
}