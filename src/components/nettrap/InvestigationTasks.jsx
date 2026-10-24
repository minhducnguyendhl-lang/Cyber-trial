import { useEffect, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';

function EvidenceViewer({ task, onComplete }) {
  return <div className="mt-4 border border-primary/40 bg-secondary p-4" aria-live="polite">
    <p className="mb-2 font-heading text-lg font-bold text-primary">Dữ liệu đã trích xuất</p>
    <p className="text-sm leading-relaxed">{task.artifact_c}</p>
    <div className="mt-3 space-y-1 border-l-2 border-primary pl-3 text-sm">{task.dialogue_after_c?.map((line, index) => <p key={index}>{line}</p>)}</div>
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
  const browser = /trang|web|dashboard|học bổng/i.test(task.title_c);
  const phone = /sms|tin nhắn|cuộc gọi|điện thoại|thông điệp/i.test(task.title_c);
  const domain = task.items_c[1] || 'portal.example';
  const formalRecord = /hợp đồng|email|dashboard|bảng điều khiển/i.test(task.title_c);
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">Đọc bản gốc rồi chạm vào những cụm đáng ngờ ngay trong vật chứng. Chi tiết bình thường vẫn có thể được kiểm tra.</p>
    <div className={`mx-auto max-w-xl border-[8px] border-foreground/80 bg-background p-3 shadow-lg ${phone ? 'rounded-[2rem]' : ''}`}>
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2 font-mono text-xs"><span>{browser ? 'TRÌNH DUYỆT · KẾT NỐI KHÔNG XÁC MINH' : phone ? 'TIN NHẮN · THIẾT BỊ GỐC' : 'HỒ SƠ · BẢN ĐÃ THU THẬP'}</span><span>{task.items_c[0]?.match(/\d\d:\d\d/)?.[0] || '23:41'}</span></div>
      {browser && <div className="mb-3 rounded border border-warning bg-warning/10 px-3 py-2 font-mono text-sm"><span className="text-muted-foreground">https://</span>{domain.split('').map((character, index) => <button key={`${character}-${index}`} type="button" aria-label={`Ký tự ${character} trong tên miền`} onClick={() => inspect(1)} className={selected.includes(1) ? 'bg-primary/20 text-primary' : 'underline decoration-warning'}>{character}</button>)}</div>}
      {phone && <p className="mb-2 text-xs text-muted-foreground">Người gửi: {task.hotspot_c} · Thiết bị: Android · đã nhận</p>}
      {formalRecord && <div className="mb-3 grid gap-1 border border-border bg-muted/30 p-2 font-mono text-xs"><span>NGƯỜI GỬI / ĐƠN VỊ: Không xác minh</span><span>CHỦ ĐỀ: Yêu cầu xác nhận dữ liệu</span><span>TRẠNG THÁI: Chờ phê duyệt · không có nguồn ký</span></div>}
      <div className={`mb-3 border border-border p-3 ${phone ? 'rounded-2xl bg-secondary/60' : 'bg-muted/40'}`}>
        <p className="mb-2 text-xs font-bold text-primary">{browser ? 'BIỂU MẪU / HỒ SƠ' : phone ? 'NỘI DUNG TIN NHẮN · 23:41' : task.title_c}</p>
        <p className="mb-3 leading-relaxed">{task.prompt_c}</p>
        {browser && <div className="mb-3 grid gap-2 sm:grid-cols-2"><input aria-label="Trường email" placeholder="Email đăng ký" disabled className="border border-border bg-background px-2 py-2 text-sm"/><input aria-label="Trường OTP" placeholder="Mật khẩu / OTP" disabled className="border border-warning bg-background px-2 py-2 text-sm"/></div>}
        <p className="flex flex-wrap gap-1 leading-relaxed">{task.items_c.map((item, index) => <button key={item} type="button" onClick={() => inspect(index)} aria-pressed={selected.includes(index)}
          className={`game-focus rounded px-1 py-0.5 text-left text-sm ${selected.includes(index) ? 'bg-primary/20 text-primary' : 'underline decoration-dotted decoration-muted-foreground hover:bg-muted'}`}>
          {item}{selected.includes(index) && <span className="ml-1 text-[10px]">✓</span>}
        </button>)}</p>
      </div>
      {!phone && <div className="flex items-center justify-between text-[10px] text-muted-foreground"><span>Chi tiết không được sửa · Bản gốc giữ nguyên</span><span>Kiểm tra nguồn ⌕</span></div>}
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
    <div className="grid gap-3 overflow-x-auto md:grid-cols-2">
      {task.records_c.map((record, column) => <section key={record} className="min-w-56 border border-border bg-background p-2">
        <h3 className="mb-2 border-b border-border pb-2 font-mono text-xs font-bold text-primary">{record}</h3>
        <table className="w-full border-collapse text-left text-xs"><tbody>{task.rows_c.map((row, rowIndex) => <tr key={row[0]} className={selected.includes(rowIndex) ? 'bg-secondary' : ''}>
          <td className="border-b border-border p-1"><button type="button" onClick={() => select(rowIndex)} aria-pressed={selected.includes(rowIndex)} className="game-focus w-full text-left">
            <b className="block text-muted-foreground">{row[0]}</b><span>{row[column + 1]}</span>
          </button></td>
        </tr>)}</tbody></table>
      </section>)}
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
  const [metadataSelected, setMetadataSelected] = useState([]);
  const isChapterOne = /Yến/i.test(task.source_c);
  const metadata = isChapterOne
    ? [['Tài khoản gửi', 'Minh Khoa · tên hiển thị'], ['ID thiết bị', 'YEN-04 / thiết bị nhận'], ['Thời điểm gửi', '23:41 · ngoài phiên Khoa'], ['Source hash', '— · thiếu mã nguồn gốc'], ['Tuyến', 'ASTER / tác vụ mô phỏng']]
    : [['Tài khoản quản trị', 'Cyber-M / nguồn nội bộ'], ['ID thiết bị', 'ARCHIVE-17 / bản trích xuất'], ['Thời điểm truy cập', '09:18 · theo nhật ký hệ thống'], ['Source hash', '— · không kèm dữ liệu thô'], ['Tuyến', 'Cyber-M kiểm soát bản sao']];
  const anomalies = isChapterOne ? [2, 3] : [0, 3];
  const metadataDone = status === 'done' && anomalies.every(index => metadataSelected.includes(index));
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
    <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
    <button type="button" draggable aria-grabbed={selected} onDragStart={event => { event.dataTransfer.setData('text/plain', 'device'); setSelected(true); }}
      onClick={() => setSelected(true)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setSelected(true); }}
      className={`game-focus mb-4 flex min-h-20 w-full items-center gap-4 border p-4 text-left ${selected ? 'border-primary bg-secondary' : 'border-border bg-background'}`}>
      <ApperIcon name="Smartphone" className="h-8 w-8 shrink-0 text-primary"/><span><b className="block">{task.source_c}</b><span className="text-xs text-muted-foreground">{selected ? 'Đã chọn · hãy ghép vào cổng' : 'Điện thoại + cáp dữ liệu · kéo hoặc chọn bằng bàn phím'}</span></span>
    </button>
    <svg viewBox="0 0 80 60" aria-hidden="true" className="mx-auto h-12 w-16"><path d="M4 8c24 0 18 44 42 44h24" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="5 4"/></svg>
    <div className="rounded border-4 border-foreground/70 bg-muted p-3"><div className="mb-3 min-h-16 border-2 border-border bg-background p-3 text-center font-mono text-xs text-muted-foreground">LAPTOP · FORENSIC STATION</div>
    <div className="grid gap-2 sm:grid-cols-2">{[...task.ports_c, 'Cổng USB phụ · thiết bị khác', 'Cổng sạc · không truyền dữ liệu'].map((port, index) => <button key={port} type="button" disabled={status !== 'idle'}
      onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); setSelected(true); connectTo(index); }}
      onClick={() => connectTo(index)} className={`game-focus flex min-h-16 items-center gap-3 border px-4 py-3 text-left text-sm ${status === 'done' && index === task.target_c ? 'border-success bg-success-muted' : 'border-border bg-background hover:bg-muted disabled:opacity-60'}`}>
      <ApperIcon name={status === 'done' && index === task.target_c ? 'CircleCheck' : 'Cable'} className="h-5 w-5 shrink-0 text-primary"/>{port}
    </button>)}</div></div></div>
    <Hint>{hint}</Hint>
    {status !== 'idle' && status !== 'done' && <div role="status" className="mt-4 border border-primary/40 bg-muted p-4">
      <p className="font-semibold text-primary">{status === 'pairing' ? 'Đang ghép nối thiết bị…' : 'Đang trích xuất metadata…'}</p>
      <div className="mt-3 h-2 overflow-hidden bg-background"><div className={`h-full bg-primary transition-all duration-500 ${status === 'pairing' ? 'w-1/3' : 'w-2/3'}`}/></div>
    </div>}
    {status === 'done' && <div className="mt-4 border border-border bg-background p-3">
      <p className="mb-2 font-mono text-sm font-bold text-primary">METADATA · chọn các trường bất thường</p>
      <div className="overflow-x-auto"><table className="w-full min-w-[28rem] text-left text-xs"><tbody>{metadata.map(([label, value], index) => <tr key={label}><th className="border-b border-border p-2">{label}</th><td className="border-b border-border p-2">{value}</td><td className="border-b border-border p-1"><button type="button" onClick={() => anomalies.includes(index) ? setMetadataSelected(items => items.includes(index) ? items : [...items, index]) : setHint('Trường này chưa phải sai lệch. Hãy đối chiếu với dữ liệu gốc.')} aria-pressed={metadataSelected.includes(index)} className="game-focus min-h-9 border border-border px-2">{metadataSelected.includes(index) ? 'Đã đánh dấu' : 'Kiểm tra'}</button></td></tr>)}</tbody></table></div>
      <Hint>{hint}</Hint>
      {metadataDone && <><p className="mt-3 text-sm text-primary">{isChapterOne ? 'Thời điểm không khớp phiên Khoa; thiếu source hash nghĩa đây là bản tóm tắt do hệ thống tạo.' : 'Nguồn trích xuất do Cyber-M kiểm soát; thiếu hash nên không thể xác minh bản gốc độc lập.'}</p><EvidenceViewer task={task} onComplete={onComplete}/></>}
    </div>}
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
      <svg viewBox="0 0 1000 180" role="group" aria-label="Dạng sóng âm thanh; chọn các đoạn bị ghép" className="mt-4 h-36 w-full border border-border bg-muted/30">
        <path d="M0 90H1000" stroke="currentColor" strokeOpacity=".2"/>
        {task.segments_c.map((segment, index) => {
          const height = 18 + Math.round((Math.sin(index * 2.13) + 1) * 30) + (index % 3) * 10;
          const width = 1000 / task.segments_c.length;
          return <g key={segment} role="button" tabIndex="0" aria-label={`Đoạn ${index + 1}: ${segment}`} aria-pressed={selected.includes(index)}
            onClick={() => mark(index)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') mark(index); }}>
            <rect x={index * width + 4} y={(180 - height) / 2} width={Math.max(3, width - 8)} height={height} rx="3" fill={selected.includes(index) ? 'var(--warning)' : 'var(--primary)'} opacity=".8"/>
            <text x={index * width + width / 2} y="166" textAnchor="middle" fill="currentColor" fontSize="11">{index + 1}</text>
          </g>;
        })}
        <line x1={playhead * 10} x2={playhead * 10} y1="4" y2="176" stroke="var(--destructive)" strokeWidth="3"/>
      </svg>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{task.segments_c.map((segment, index) => <button key={segment} type="button" onClick={() => mark(index)} aria-pressed={selected.includes(index)} className={`game-focus min-h-10 border px-2 text-left text-xs ${selected.includes(index) ? 'border-warning bg-secondary' : 'border-border bg-muted'}`}>{selected.includes(index) ? '◆ ' : '◇ '}{segment}</button>)}</div>
    </div>
    <Hint>{hint}</Hint>
    {done && <><div className="mt-4 border border-primary/40 bg-muted p-4"><p className="font-mono text-sm font-bold text-primary">METADATA / PHÂN TÍCH ÂM THANH</p><dl className="mt-2 grid gap-2 text-xs sm:grid-cols-2"><div><dt className="text-muted-foreground">Codec</dt><dd>PCM · 48 kHz</dd></div><div><dt className="text-muted-foreground">Số đoạn nối</dt><dd>{selected.length} điểm cần đối chiếu</dd></div><div><dt className="text-muted-foreground">Nguồn ghi</dt><dd>Không trùng thiết bị nhận</dd></div><div><dt className="text-muted-foreground">Dấu thời gian</dt><dd>Có khoảng nhảy không tự nhiên</dd></div></dl></div><EvidenceViewer task={task} onComplete={onComplete}/></>}
  </div>;
}

export default function InvestigationTask({ task, onComplete }) {
  if (task.type_c === 'inspect') return <InspectTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'compare') return <CompareTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'search') return <SearchTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'connect') return <ConnectTask task={task} onComplete={onComplete}/>;
  return <AudioTask task={task} onComplete={onComplete}/>;
}
