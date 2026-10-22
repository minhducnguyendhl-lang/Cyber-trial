import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CAST, CHAPTERS } from "@/components/nettrap/story";
import { useGame } from "@/components/nettrap/GameState";
import SceneArt, { Portrait } from "@/components/nettrap/Art";
import { PageHeader, downloadBlob } from "@/components/nettrap/GameUI";
import { characterName, characterText, getCharacterImage, loadCharacterImages, saveCharacterImage, subscribeCharacterImages } from "@/components/nettrap/characterImages";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const route = { path: '/gallery', layout: 'public', access: 'public' };
export const nav = { icon: 'Image', label: 'Thư Viện', order: 40, profiles: null };

export default function Gallery() {
  const { save, totalCompleted, t } = useGame();
  const [tab, setTab] = useState('characters');
  const [relationships, setRelationships] = useState(false);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef(null);
  const touchStart = useRef(null);
  const pinchStart = useRef(null);
  const [target, setTarget] = useState('An');
  const [importing, setImporting] = useState(false);
  const [, refreshImages] = useState(0);
  useEffect(() => {
    const unsubscribe = subscribeCharacterImages(() => refreshImages(value => value + 1));
    loadCharacterImages().catch(error => toast.error(`Không thể đọc ảnh đã lưu: ${error.message}`));
    return unsubscribe;
  }, []);
  async function importPortrait(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      await saveCharacterImage(target, file);
      toast.success(`Đã gắn ảnh và tên ${characterName(target)} vào vai ${target}.`);
    } catch (error) {
      toast.error(error.message || 'Không thể lưu ảnh.');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  }

  const items = tab === 'characters' ? CAST.map(person => ({
    key_c: person.key_c, portrait_c: person.name_c, title_c: characterName(person.name_c), subtitle_c: person.role_c,
    description_c: `${person.bio_c} Phương châm: “${person.slogan_c}”`, chapter_c: person.chapter_c, variant_c: person.variant_c
  })) : CHAPTERS.map((chapter, i) => ({
    key_c: chapter.key_c, title_c: chapter.title_c, subtitle_c: `CG / Vụ ${chapter.number_c}`,
    description_c: chapter.hook_c, chapter_c: i, variant_c: i % 2 ? 'suspect' : 'detective',
    scene_c: chapter.scene_c
  }));
  const unlockedIndices = items.map((item, i) => tab === 'characters' || save.completed_c[item.chapter_c] ? i : null).filter(i => i != null);
  const item = selected == null ? null : items[selected];
  function cycle(direction) {
    const position = unlockedIndices.indexOf(selected);
    if (!unlockedIndices.length) return;
    setSelected(unlockedIndices[(position + direction + unlockedIndices.length) % unlockedIndices.length]);
    setZoom(1);
  }
  function downloadArt() {
    try {
      const original = tab === 'characters' && getCharacterImage(item?.portrait_c);
      if (original) {
        downloadBlob(original.file_c, original.file_c.name);
        return;
      }
      const svg = imageRef.current?.querySelector('svg');
      if (!svg || !item) return;
      const clone = svg.cloneNode(true);
const computed = window.getComputedStyle(document.documentElement);
      const tokens = ['background', 'foreground', 'card', 'card-foreground', 'muted', 'muted-foreground', 'secondary', 'accent', 'primary', 'border', 'chart-2'];
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('style', tokens.map(token => `--${token}:${computed.getPropertyValue(`--${token}`).trim()}`).join(';'));
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '24');
      label.setAttribute('y', tab === 'characters' ? '648' : '620');
      label.setAttribute('fill', computed.getPropertyValue('--primary').trim());
      label.setAttribute('font-family', 'sans-serif');
      label.setAttribute('font-weight', 'bold');
      label.setAttribute('font-size', '22');
      label.textContent = 'CYBER-M / VECTOR ART';
      clone.appendChild(label);
downloadBlob(new Blob([new window.XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' }), `nettrap-${item.key_c}.svg`);
      toast.success('Đã tải minh họa vector CYBER-M.');
    } catch (error) {
      toast.error('Không thể tải tranh. Hãy thử lại.');
      console.error(`NetTrap art download failed: ${error.message}`);
    }
  }
  function touchMove(event) {
    if (event.touches.length === 2 && pinchStart.current) {
      const distance = Math.hypot(event.touches[0].clientX - event.touches[1].clientX, event.touches[0].clientY - event.touches[1].clientY);
      setZoom(Math.max(1, Math.min(3, distance / pinchStart.current.distance_c * pinchStart.current.zoom_c)));
    }
  }
  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-9">
    <PageHeader title={t('Thư Viện', 'Gallery')} subtitle={t('Những gương mặt và khoảnh khắc phía sau mỗi hồ sơ.', 'The faces and moments behind each case.')}
      action={<div className="flex border border-border bg-card p-1">
        {[['characters', 'Nhân vật', 'Users'], ['cg', 'CG', 'Image']].map(([key, label, icon]) => <button key={key} type="button" aria-pressed={tab === key} onClick={() => { setTab(key); setSelected(null); }} className={`game-focus flex min-h-11 items-center gap-2 px-4 text-xs font-bold transition-colors hover:bg-secondary ${tab === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><ApperIcon name={icon} className="h-4 w-4"/>{label}</button>)}
      </div>}/>
    {tab === 'characters' && <section className="panel-cut mb-6 space-y-4 border border-border bg-card p-4">
      <div><h2 className="text-base font-heading font-semibold">Gắn ảnh nhân vật của bạn</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Chọn vai rồi chọn ảnh gốc. Tên tệp (không gồm phần mở rộng) sẽ là tên nhân vật trong hội thoại. Ảnh được lưu trên trình duyệt này, không bị xóa khi chơi lại.</p></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2"><Label htmlFor="character-role">Vai trong cốt truyện</Label><Select value={target} onValueChange={setTarget} disabled={importing}><SelectTrigger id="character-role"><SelectValue/></SelectTrigger><SelectContent>{CAST.map(person => <SelectItem key={person.key_c} value={person.name_c}>{person.name_c} · {person.role_c}</SelectItem>)}</SelectContent></Select></div>
        <div className="min-w-0 space-y-2"><Label htmlFor="character-image">Ảnh PNG, JPG hoặc WebP · tối đa 15 MB</Label><Input id="character-image" type="file" accept="image/png,image/jpeg,image/webp" disabled={importing} onChange={importPortrait}/></div>
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">{importing ? 'Đang lưu ảnh…' : getCharacterImage(target) ? `Đã gắn: ${characterName(target)}` : 'Vai này đang dùng minh họa vector hiện có.'}</p>
    </section>}
    {tab === 'characters' && <Button variant="outline" onClick={() => setRelationships(!relationships)} className="mb-5 h-11 gap-2 border-border text-xs font-semibold hover:bg-secondary"><ApperIcon name="Network" className="h-4 w-4"/>{relationships ? 'Ẩn sơ đồ quan hệ' : 'Xem sơ đồ quan hệ'}</Button>}
    {relationships && tab === 'characters' && <div className="panel-cut mb-6 overflow-x-auto border border-border bg-card p-5">
      <svg viewBox="0 0 750 170" className="min-w-[550px]" role="img" aria-label="An và nhóm sinh viên kiểm chứng bằng chứng do Cyber-M kiểm soát">
        <g fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M170 80h132M442 80h132M151 112Q365 198 600 113"/></g>
        <g fill="var(--secondary)" stroke="var(--border)"><path d="M30 30h130l10 10v72H40l-10-10Z"/><path d="M302 30h130l10 10v72H312l-10-10Z"/><path d="M574 30h130l10 10v72H584l-10-10Z"/></g>
        <g fill="var(--foreground)" fontSize="24" fontFamily="var(--font-heading)" fontWeight="700" textAnchor="middle"><text x="100" y="78">AN</text><text x="372" y="78">9 SINH VIÊN</text><text x="644" y="78">CYBER-M</text></g>
        <g fill="var(--muted-foreground)" fontSize="12" textAnchor="middle"><text x="235" y="67">hỗ trợ</text><text x="507" y="67">thao túng</text><text x="370" y="152">điều tra</text></g>
      </svg>
    </div>}
    {!totalCompleted && <div className="panel-cut mb-6 flex flex-wrap items-center gap-4 border border-chart-2/30 bg-secondary p-5"><ApperIcon name="Image" className="h-9 w-9 text-accent-foreground"/><div className="flex-1"><p className="font-heading text-2xl font-semibold">Chơi để mở khóa hình ảnh đặc biệt</p><p className="mt-1 text-xs text-muted-foreground">Hoàn thành vụ án và đọc bài học để nhận tranh nguyên bản.</p></div><Link to="/chapters" className="game-focus flex min-h-11 items-center bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90">Chơi ngay</Link></div>}
    <div className="columns-2 gap-4 md:columns-3">
      {items.map((art, i) => {
        const open = tab === 'characters' || Boolean(save.completed_c[art.chapter_c]);
        return <button key={art.key_c} type="button" disabled={!open} onClick={() => { setSelected(i); setZoom(1); }} className="game-focus panel-cut group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md disabled:cursor-not-allowed">
          <div className={`relative overflow-hidden ${tab === 'characters' ? 'aspect-[1/1.4]' : i % 2 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
            {tab === 'characters' ? <Portrait name={art.portrait_c} variant={art.variant_c} emotion="neutral" className={`h-full w-full bg-secondary transition-transform duration-300 group-hover:scale-[1.03] ${open ? '' : 'opacity-25 blur-md'}`}/> : <SceneArt scene={art.scene_c} variant={art.variant_c} className={`h-full w-full ${open ? '' : 'opacity-25 blur-md'}`} preserveAspectRatio="xMidYMid slice"/>}
            {!open && <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center"><ApperIcon name="LockKeyhole" className="h-6 w-6"/><span className="text-[10px] text-muted-foreground">Hoàn thành Vụ {String(art.chapter_c + 1).padStart(2, '0')}</span></div>}
          </div>
          <div className="p-3 sm:p-4"><p className="text-[10px] uppercase tracking-widest text-primary">{art.subtitle_c}</p><h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">{open ? art.title_c : 'Hình ảnh chưa mở'}</h2>{open && tab === 'characters' && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{art.description_c}</p>}</div>
        </button>;
      })}
    </div>
    <Dialog open={selected != null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="flex max-h-[90vh] max-w-5xl flex-col gap-0 overflow-hidden border-border bg-background p-0"
        onKeyDown={event => { if (event.key === 'ArrowLeft') cycle(-1); if (event.key === 'ArrowRight') cycle(1); }}>
        <DialogHeader className="shrink-0 border-b border-border p-6"><DialogTitle className="font-heading text-3xl">{item?.title_c}</DialogTitle><DialogDescription>{item?.subtitle_c} · 22.10.2026 · Vuốt trái/phải để đổi tranh.</DialogDescription></DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {item && <div>
            <div ref={imageRef} className="mx-auto max-h-[50vh] overflow-auto bg-secondary"
              onTouchStart={event => {
                if (event.touches.length === 2) {
                  pinchStart.current = { distance_c: Math.hypot(event.touches[0].clientX - event.touches[1].clientX, event.touches[0].clientY - event.touches[1].clientY), zoom_c: zoom };
                  touchStart.current = null;
                } else touchStart.current = event.touches[0]?.clientX;
              }}
              onTouchMove={touchMove}
              onTouchEnd={event => {
                if (pinchStart.current) { pinchStart.current = null; return; }
                if (touchStart.current != null && zoom === 1) {
                  const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
                  if (Math.abs(delta) > 60) cycle(delta < 0 ? 1 : -1);
                }
                touchStart.current = null;
              }}>
              <div style={{ width: `${zoom * 100}%` }}>
                {tab === 'characters' ? <Portrait name={item.portrait_c} variant={item.variant_c} className="mx-auto h-[50vh] w-full"/> : <SceneArt scene={item.scene_c} variant={item.variant_c} className="w-full"/>}
              </div>
            </div>
            <details open className="mt-4 border-t border-border pt-4"><summary className="game-focus cursor-pointer font-heading text-xl font-semibold">Hồ sơ nhân vật và minh họa</summary><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{characterText(item.description_c)}</p><p className="mt-2 text-xs text-muted-foreground">{getCharacterImage(item.portrait_c) ? 'Ảnh gốc do bạn gắn; tên nhân vật lấy từ tên tệp.' : 'Minh họa vector hiện có. Gắn ảnh gốc để thay chân dung.'} Nhân vật và tình huống đều hư cấu.</p></details>
          </div>}
        </div>
        <DialogFooter className="shrink-0 flex-wrap gap-2 border-t border-border p-6">
          <Button variant="outline" aria-label="Tranh trước" onClick={() => cycle(-1)} className="h-11 border-border"><ApperIcon name="ChevronLeft" className="h-4 w-4"/></Button>
          <Button variant="outline" aria-label="Tranh tiếp theo" onClick={() => cycle(1)} className="h-11 border-border"><ApperIcon name="ChevronRight" className="h-4 w-4"/></Button>
          <Button variant="outline" onClick={() => setZoom(z => z >= 3 ? 1 : z + .5)} className="h-11 gap-2 border-border text-xs"><ApperIcon name="ZoomIn" className="h-4 w-4"/>{Math.round(zoom * 100)}%</Button>
          <Button onClick={downloadArt} className="h-11 gap-2 bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90"><ApperIcon name="Download" className="h-4 w-4"/>Tải tranh</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>;
}