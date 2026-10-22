import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';
import { CHAPTERS } from '@/components/nettrap/story';
import { useGame } from '@/components/nettrap/GameState';
import SceneArt from '@/components/nettrap/Art';
import { PageHeader, Stars } from '@/components/nettrap/GameUI';

export const route = { path: '/chapters', layout: 'public', access: 'public' };
export const nav = { icon: 'BookOpen', label: 'Chọn Vụ Án', order: 20, profiles: null };

export default function ChapterSelect() {
  const { save, startChapter, replayChapter, totalStars, totalCompleted, t, english } = useGame();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  function enter(index, replay = false) {
    if (replay) replayChapter(index);
    else if (!startChapter(index)) return;
    navigate('/play');
  }
  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-9">
    <PageHeader title={t('Chọn Vụ Án', 'Choose a case')} subtitle={t('Mỗi lời nói dối để lại một dấu vết. Bắt đầu với hồ sơ đầu tiên.', 'Every lie leaves a trace. Begin with the first case.')}
      action={<div className="panel-cut flex items-center gap-5 border border-border bg-card px-5 py-3"><div className="flex items-center gap-2 font-heading text-3xl font-bold text-warning"><ApperIcon name="Star" className="h-5 w-5 fill-warning"/>{totalStars}<span className="text-base text-muted-foreground">/{CHAPTERS.length * 3}</span></div><div className="border-l border-border pl-5 text-xs text-muted-foreground"><b className="text-foreground">{totalCompleted}/{CHAPTERS.length}</b><br/>{t('vụ hoàn thành', 'cases completed')}</div></div>}
    />
    <div className="grid gap-5 md:grid-cols-2">
      {CHAPTERS.map((chapter, i) => {
        const locked = i > 0 && !save.completed_c[i - 1];
        const stars = save.completed_c[i] || 0;
        return <motion.div key={chapter.key_c} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .045, duration: .2 }}
          className={`panel-cut group relative overflow-hidden border border-border bg-card shadow-sm transition-shadow hover:shadow-md ${save.newest_c === i ? 'unlock-flash' : ''}`}>
          <button type="button" disabled={locked} onClick={() => enter(i)} className="game-focus block w-full text-left disabled:cursor-not-allowed">
            <div className="relative h-36 overflow-hidden sm:h-44">
              <SceneArt scene={chapter.scene_c} variant={i % 2 ? 'suspect' : 'detective'} className={`h-full w-full object-cover transition-transform duration-300 ${locked ? 'opacity-25 blur-[2px]' : 'group-hover:scale-[1.03]'}`} preserveAspectRatio="xMidYMid slice"/>
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"/>
              <span className="panel-cut absolute left-4 top-4 bg-primary px-3 py-1 font-heading text-xl font-bold text-primary-foreground">VỤ {chapter.number_c}</span>
              {stars > 0 && <span className="absolute right-4 top-5 -rotate-6 border-2 border-success px-2 py-1 font-heading text-lg font-bold text-success">{t('HOÀN THÀNH', 'COMPLETE')}</span>}
              {locked && <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground"><ApperIcon name="LockKeyhole" className="h-7 w-7"/><p className="text-xs">{t('Hoàn thành vụ trước để mở khóa', 'Complete the previous case to unlock')}</p></div>}
            </div>
            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between gap-2">
                <span title={chapter.definition_c} className="text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">{chapter.category_c}</span>
                <span className="border border-border px-2 py-1 text-[10px] text-muted-foreground">{chapter.difficulty_c}</span>
              </div>
              <h2 className="mt-2 font-heading text-3xl font-bold">{english ? chapter.title_en_c : chapter.title_c}</h2>
              <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-muted-foreground">{chapter.hook_c}</p>
              <div className="mt-4 flex items-center justify-between"><Stars count={stars}/><span className="text-[10px] uppercase tracking-widest text-muted-foreground">{locked ? 'LOCKED' : '15–30 MIN'}</span></div>
            </div>
          </button>
          {stars > 0 && <Button type="button" variant="ghost" onClick={() => enter(i, true)} className="absolute bottom-3 right-4 h-10 bg-card text-xs font-semibold text-primary opacity-100 hover:bg-secondary md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"><ApperIcon name="RotateCcw" className="mr-2 h-3 w-3"/>{t('Chơi lại', 'Replay')}</Button>}
        </motion.div>;
      })}
    </div>
    <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">{t('Tiến trình tự lưu trên trình duyệt này. Các vụ án là tình huống hư cấu phục vụ giáo dục.', 'Progress is saved in this browser. All cases are fictional educational scenarios.')}</p>
  </div>;
}