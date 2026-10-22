import { Link, Outlet } from 'react-router-dom';
import { APP_CONFIG } from '@/config/app.config';
import ApperIcon from '@/components/ApperIcon';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { GameProvider, useGame } from '@/components/nettrap/GameState';
import { SettingsDrawer } from '@/components/nettrap/GameUI';
import '@/components/nettrap/game.css';

function GameChrome() {
  const { save, setSettings, setSettingsOpen, t } = useGame();
  return <div className="min-h-dvh bg-background font-sans text-foreground">
    <header className="relative z-30 flex h-14 items-center justify-between gap-2 border-b border-border/50 bg-background/95 px-3 sm:px-6">
      <Link to="/" className="game-focus flex shrink-0 items-center gap-2 font-heading text-xl font-bold uppercase tracking-wider transition-colors hover:text-primary">
        <ApperIcon name={APP_CONFIG.icon || 'Shield'} className="h-5 w-5 text-primary"/><span className="hidden sm:inline">{APP_CONFIG.name || 'NetTrap'}</span>
      </Link>
      <div className="flex items-center gap-1 sm:gap-3">
        <Button type="button" variant="ghost" onClick={() => setSettings({ muted_c: !save.settings_c.muted_c })} aria-label={save.settings_c.muted_c ? t('Bật âm thanh', 'Enable audio') : t('Tắt âm thanh', 'Mute audio')} className="h-11 w-11 p-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <ApperIcon name={save.settings_c.muted_c ? 'VolumeX' : 'Volume2'} className="h-5 w-5"/>
        </Button>
        <Button type="button" variant="ghost" onClick={() => setSettingsOpen(true)} aria-label={t('Mở cài đặt', 'Open settings')} className="h-11 w-11 p-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground"><ApperIcon name="Settings2" className="h-5 w-5"/></Button>
        <div className="border-l border-border pl-2"><ThemeToggle /></div>
      </div>
    </header>
    <main><Outlet /></main>
    <SettingsDrawer />
  </div>;
}
export default function PublicLayout() {
  return <GameProvider><GameChrome /></GameProvider>;
}