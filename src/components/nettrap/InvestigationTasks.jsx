import { useEffect, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';

function EvidenceViewer({ task, onComplete }) {
  return <div className="mt-4 border border-primary/40 bg-secondary p-4" aria-live="polite">
    <p className="mb-2 font-heading text-lg font-bold text-primary">Dữ liệu đã trích xuất</p>
    <p className="text-sm leading-relaxed">{task.artifact_c}</p>
    <Button onClick={onComplete} className="mt-4 min-h-11 w-full font-bold">Lưu manh mối · {task.clue_c[0]}<ApperIcon name="Pin" className="ml-2 h-4 w-4"/></Button>
  </div>;
}

function Hint({ children }) {
  return children ? <p role="status" className="mt-3 border-l-2 border-warning bg-muted px-3 py-2 text-sm leading-relaxed text-muted-foreground">{children}</p> : null;
}

function InspectTask({ task, onComplete }) {
  const [selected, setSelected] = useState([]);
  const [hint, setHint] = useState('');
  const done = task.targets_c.every(index => selected.includes(index));
  function inspect(index) {
    if (task.targets_c.includes(index)) {
      setSelected(items => items.includes(index) ? items : [...items, index]);
      setHint('');
    } else setHint(task.hint_c);
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">Chạm vào chi tiết đáng ngờ để tô sáng và chú thích.</p>
    <div className="grid gap-2 sm:grid-cols-2">
      {task.items_c.map((item, index) => <button key={item} type="button" onClick={() => inspect(index)} aria-pressed={selected.includes(index)}
        className={`game-focus min-h-14 border px-4 py-3 text-left text-sm transition-colors ${selected.includes(index) ? 'border-primary bg-secondary text-foreground' : 'border-border bg-background hover:bg-muted'}`}>
        <span className="mr-2 text-xs font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>{item}
        {selected.includes(index) && <span className="ml-2 text-xs text-primary">· Được đánh dấu</span>}
      </button>)}
    </div>
    <Hint>{hint}</Hint>
    {done && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

function CompareTask({ task, onComplete }) {
  const [selected, setSelected] = useState([]);
  const [hint, setHint] = useState('');
  const done = task.targets_c.every(index => selected.includes(index));
  function select(index) {
    if (!task.targets_c.includes(index)) { setHint(task.hint_c); return; }
    setSelected(items => items.includes(index) ? items.filter(value => value !== index) : [...items, index]);
    setHint('');
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">Chọn những hàng không khớp giữa các bản ghi.</p>
    <div className="space-y-3">
      {task.rows_c.map((row, rowIndex) => <button key={row[0]} type="button" onClick={() => select(rowIndex)} aria-pressed={selected.includes(rowIndex)}
        className={`game-focus w-full border p-3 text-left ${selected.includes(rowIndex) ? 'border-primary bg-secondary' : 'border-border bg-background hover:bg-muted'}`}>
        <span className="mb-2 block text-xs font-bold text-primary">{row[0]}</span>
        <span className="grid gap-2 sm:grid-cols-3">{task.records_c.map((record, index) => <span key={record} className="border-l border-border pl-2 text-xs leading-relaxed"><b className="block text-muted-foreground">{record}</b>{row[index + 1]}</span>)}</span>
      </button>)}
    </div>
    <Hint>{hint}</Hint>
    {done && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

function SearchTask({ task, onComplete }) {
  const [found, setFound] = useState(false);
  const [hint, setHint] = useState('');
  function search(index) {
    if (index === task.target_c) { setFound(true); setHint(''); }
    else setHint(task.hint_c);
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">Tìm trong phòng, ngăn kéo hoặc thư mục phù hợp.</p>
    <div className="grid gap-2 sm:grid-cols-2">{task.places_c.map((place, index) => <button key={place} type="button" onClick={() => search(index)} aria-pressed={found && index === task.target_c}
      className={`game-focus flex min-h-14 items-center gap-3 border px-4 py-3 text-left text-sm ${found && index === task.target_c ? 'border-primary bg-secondary' : 'border-border bg-background hover:bg-muted'}`}>
      <ApperIcon name={found && index === task.target_c ? 'FolderOpen' : 'Folder'} className="h-5 w-5 shrink-0 text-primary"/>{place}
    </button>)}</div>
    <Hint>{hint}</Hint>
    {found && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

function ConnectTask({ task, onComplete }) {
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState('idle');
  const [hint, setHint] = useState('');
  useEffect(() => {
    if (status === 'pairing') {
      const timer = setTimeout(() => setStatus('extracting'), 550);
      return () => clearTimeout(timer);
    }
    if (status === 'extracting') {
      const timer = setTimeout(() => setStatus('done'), 700);
      return () => clearTimeout(timer);
    }
  }, [status]);
  function connectTo(index) {
    if (!selected && index !== task.target_c) { setHint('Chọn thiết bị và cáp trước khi ghép nối.'); return; }
    if (index !== task.target_c) { setHint(task.hint_c); return; }
    setSelected(false);
    setHint('');
    setStatus('pairing');
  }
  return <div>
    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">Kéo thiết bị vào cổng đúng, hoặc chọn thiết bị rồi chọn cổng bằng bàn phím.</p>
    <button type="button" draggable aria-grabbed={selected} onDragStart={event => { event.dataTransfer.setData('text/plain', 'device'); setSelected(true); }}
      onClick={() => setSelected(true)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setSelected(true); }}
      className={`game-focus mb-4 flex min-h-20 w-full items-center gap-4 border p-4 text-left ${selected ? 'border-primary bg-secondary' : 'border-border bg-background'}`}>
      <ApperIcon name="Smartphone" className="h-8 w-8 shrink-0 text-primary"/><span><b className="block">{task.source_c}</b><span className="text-xs text-muted-foreground">{selected ? 'Đã chọn · hãy ghép vào cổng' : 'Giữ để kéo hoặc chọn để dùng bàn phím'}</span></span>
    </button>
    <div className="grid gap-2 sm:grid-cols-2">{task.ports_c.map((port, index) => <button key={port} type="button" disabled={status !== 'idle'}
      onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); setSelected(true); connectTo(index); }}
      onClick={() => connectTo(index)} className={`game-focus flex min-h-16 items-center gap-3 border px-4 py-3 text-left text-sm ${status === 'done' && index === task.target_c ? 'border-success bg-success-muted' : 'border-border bg-background hover:bg-muted disabled:opacity-60'}`}>
      <ApperIcon name={status === 'done' && index === task.target_c ? 'CircleCheck' : 'Cable'} className="h-5 w-5 shrink-0 text-primary"/>{port}
    </button>)}</div>
    <Hint>{hint}</Hint>
    {status !== 'idle' && status !== 'done' && <div role="status" className="mt-4 border border-primary/40 bg-muted p-4">
      <p className="font-semibold text-primary">{status === 'pairing' ? 'Đang ghép nối thiết bị…' : 'Đang trích xuất metadata…'}</p>
      <div className="mt-3 h-2 overflow-hidden bg-background"><div className={`h-full bg-primary transition-all duration-500 ${status === 'pairing' ? 'w-1/3' : 'w-2/3'}`}/></div>
    </div>}
    {status === 'done' && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

function AudioTask({ task, onComplete }) {
  const [selected, setSelected] = useState([]);
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState('');
  const done = task.targets_c.every(index => selected.includes(index));
  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => setPlayhead(value => {
      if (value >= 100) { setPlaying(false); return 100; }
      return value + 2;
    }), 100);
    return () => clearInterval(timer);
  }, [playing]);
  function mark(index) {
    if (!task.targets_c.includes(index)) { setHint(task.hint_c); return; }
    setSelected(items => items.includes(index) ? items.filter(value => value !== index) : [...items, index]);
    setHint('');
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">Phát, tua lại và đánh dấu điểm cắt hoặc metadata cần kiểm tra.</p>
    <div className="border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={() => { if (playhead >= 100) setPlayhead(0); setPlaying(value => !value); }} className="min-h-11 gap-2"><ApperIcon name={playing ? 'Pause' : 'Play'} className="h-4 w-4"/>{playing ? 'Tạm dừng' : 'Phát bản ghi'}</Button>
        <span className="text-xs font-mono text-muted-foreground">{(playhead / 10).toFixed(1)}s / 10.0s</span>
      </div>
      <input aria-label="Tua bản ghi âm" type="range" min="0" max="100" value={playhead} onChange={event => setPlayhead(Number(event.target.value))} className="game-range mt-3 w-full"/>
      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8">{task.segments_c.map((segment, index) => {
        const height = 24 + Math.round((Math.sin(index * 2.13) + 1) * 25) + (index % 3) * 8;
        return <button key={segment} type="button" onClick={() => mark(index)} aria-label={`Đoạn âm thanh ${index + 1}: ${segment}`} aria-pressed={selected.includes(index)}
          className={`game-focus flex min-h-20 flex-col items-center justify-end gap-2 border p-2 text-center text-[10px] ${selected.includes(index) ? 'border-warning bg-secondary' : 'border-border bg-muted hover:bg-secondary'}`}>
          <span aria-hidden="true" className="w-2 rounded-full bg-primary" style={{ height: `${height}px` }}/>
          <span>{segment}</span>
        </button>;
      })}</div>
    </div>
    <Hint>{hint}</Hint>
    {done && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

export default function InvestigationTask({ task, onComplete }) {
  if (task.type_c === 'inspect') return <InspectTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'compare') return <CompareTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'search') return <SearchTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'connect') return <ConnectTask task={task} onComplete={onComplete}/>;
  return <AudioTask task={task} onComplete={onComplete}/>;
}
