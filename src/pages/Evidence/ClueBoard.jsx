import { Link, Navigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { useGame } from '@/components/nettrap/GameState';
import { PageHeader, shareSafetyCard } from '@/components/nettrap/GameUI';
import CluePanel from '@/components/nettrap/CluePanel';

export const route = { path: '/clues', layout: 'public', access: 'public' };
export default function ClueBoard() {
  const { save, chapter, t } = useGame();
  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-9">
    <PageHeader back="/play" title={t('Bảng Manh Mối', 'Evidence board')} subtitle={`VỤ ${chapter.number_c} / ${chapter.title_c}`}
      action={<Button variant="outline" disabled={!save.clues_c.length} onClick={() => shareSafetyCard(`Hồ sơ ${chapter.title_c}`, save.clues_c.map(i => chapter.clues_c[i][1]), 'nettrap-manh-moi')} className="h-11 gap-2 border-border px-4 text-sm font-semibold hover:bg-secondary"><ApperIcon name="Share2" className="h-4 w-4"/>{t('Chia sẻ hồ sơ', 'Share evidence')}</Button>}/>
    <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <Link to="/chapters" className="game-focus py-2 hover:text-primary">Chọn Vụ Án</Link><ApperIcon name="ChevronRight" className="h-3 w-3"/><Link to="/play" className="game-focus py-2 hover:text-primary">{chapter.title_c}</Link><ApperIcon name="ChevronRight" className="h-3 w-3"/><span>Bảng Manh Mối</span>
    </div>
    <CluePanel/>
    <Link to="/play" className="game-focus mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-foreground hover:underline"><ApperIcon name="MessageSquare" className="h-4 w-4"/>{t('Quay lại điều tra', 'Return to investigation')} · {t('Cảnh', 'Scene')} {save.scene_c + 1}</Link>
  </div>;
}