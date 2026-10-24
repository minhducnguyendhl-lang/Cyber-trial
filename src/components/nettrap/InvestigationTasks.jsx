import { useEffect, useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { Button } from '@/components/ui/button';

function EvidenceViewer({ task, onComplete }) {
  return <div className="mt-4 border border-primary/40 bg-secondary p-4" aria-live="polite">
    <p className="mb-2 font-heading text-lg font-bold text-primary">{task.type_c === 'confront' ? 'Lời thừa nhận được ghi lại' : 'Dữ liệu đã trích xuất'}</p>
    <p className="text-sm leading-relaxed">{task.artifact_c}</p>
    <div className="mt-3 space-y-1 border-l-2 border-primary pl-3 text-sm">{task.dialogue_after_c?.map((line, index) => <p key={index}>{line}</p>)}</div>
    <Button onClick={onComplete} className="mt-4 min-h-11 w-full font-bold">Lưu manh mối · {task.clue_c[0]}<ApperIcon name="Pin" className="ml-2 h-4 w-4"/></Button>
  </div>;
}

function Hint({ children }) {
  return children ? <p role="status" className="mt-3 border-l-2 border-warning bg-muted px-3 py-2 text-sm leading-relaxed text-muted-foreground">{children}</p> : null;
}

function InspectFrame({ task, renderSegments }) {
  const { frame_c: frame, header_c: header } = task;
  if (frame === 'sms') return <div className="mx-auto max-w-md rounded-[2rem] border-[8px] border-foreground/80 bg-background p-4 shadow-lg">
    <div className="mb-4 flex items-center justify-between border-b border-border pb-2 font-mono text-xs"><span>09:41 · LTE</span><span>●●●</span></div>
    <div className="mb-4 flex items-center gap-3 border-b border-border pb-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-bold text-primary">S</span><div><b className="block">{header.from_c}</b><span className="text-xs text-muted-foreground">Tin nhắn SMS · {header.time_c}</span></div></div>
    <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-secondary p-3 text-sm leading-relaxed"><p className="whitespace-pre-line">{renderSegments(task.body_c, 'body')}</p><p className="mt-2 text-right text-[10px] text-muted-foreground">{header.time_c}</p></div>
  </div>;
  if (frame === 'browser') return <div className="mx-auto max-w-2xl overflow-hidden rounded border border-border bg-background shadow-lg">
    <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2"><span className="h-2 w-2 rounded-full bg-destructive"/><span className="h-2 w-2 rounded-full bg-warning"/><span className="h-2 w-2 rounded-full bg-success"/><span className="ml-3 text-xs text-muted-foreground">Cổng học bổng · trình duyệt</span></div>
    <div className="border-b border-border p-3"><div className="rounded-full border border-warning bg-warning/10 px-3 py-2 font-mono text-xs sm:text-sm" aria-label="Địa chỉ trang web">{renderSegments(header.url_c, 'url')}</div></div>
    <div className="p-4 sm:p-6"><p className="mb-4 text-lg font-bold text-primary">Cổng xét duyệt học bổng</p><p className="whitespace-pre-line text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p>
      <div className="mt-4 grid gap-2 border-t border-border pt-4 sm:grid-cols-2"><input aria-label="Email đăng ký" placeholder="Email đăng ký" disabled className="border border-border bg-muted/30 px-3 py-2 text-sm"/><input aria-label="Mật khẩu và OTP" placeholder="Mật khẩu ngân hàng / OTP" disabled className="border border-warning bg-warning/5 px-3 py-2 text-sm"/></div>
      <button type="button" disabled className="mt-3 min-h-10 w-full bg-primary/80 text-sm font-bold text-primary-foreground">Xác minh hồ sơ</button>
    </div>
  </div>;
  if (frame === 'call') return <div className="mx-auto max-w-md rounded-[2rem] border-[8px] border-foreground/80 bg-background p-4 shadow-lg">
    <div className="mb-4 border-b border-border pb-3 text-center"><p className="text-xs uppercase tracking-widest text-muted-foreground">Nhật ký cuộc gọi</p><p className="mt-2 text-lg font-bold">{header.caller_c}</p><p className="text-sm text-muted-foreground">Đến · {header.duration_c}</p></div>
    <div className="rounded-xl border border-border bg-muted/30 p-4"><p className="mb-2 text-xs font-bold text-primary">BẢN GHI CUỘC GỌI</p><p className="whitespace-pre-line text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p></div>
    <div className="mt-3 flex items-center gap-3 border border-border p-3"><ApperIcon name="Paperclip" className="h-5 w-5 text-primary"/><span><b className="block text-sm">{header.attachment_c}</b><span className="text-xs text-muted-foreground">Tệp đính kèm · chưa mở</span></span></div>
  </div>;
  if (frame === 'email') return <div className="mx-auto max-w-2xl border border-border bg-background shadow-lg">
    <div className="border-b border-border bg-muted/50 p-4"><p className="text-xs font-bold uppercase tracking-widest text-primary">Hộp thư · thư đã lưu</p><h3 className="mt-2 font-heading text-lg font-bold">{header.subject_c}</h3><dl className="mt-3 grid gap-1 text-xs sm:grid-cols-[auto_1fr]"><dt className="text-muted-foreground">Từ</dt><dd>{header.from_c}</dd><dt className="text-muted-foreground">Đến</dt><dd>{header.to_c}</dd></dl></div>
    <div className="p-4 sm:p-6"><p className="whitespace-pre-line text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p><p className="mt-5 border-t border-border pt-3 text-xs text-muted-foreground">Bản email được lưu · chưa xác minh chữ ký số</p></div>
  </div>;
  if (frame === 'chat') return <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-lg">
    <div className="border-b border-border bg-secondary/60 p-3"><p className="font-bold">{header.room_c}</p><p className="text-xs text-muted-foreground">{header.from_c} · {header.time_c}</p></div>
    <div className="min-h-40 bg-muted/20 p-4"><div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-border bg-background p-3 text-sm leading-relaxed"><p className="whitespace-pre-line">{renderSegments(task.body_c, 'body')}</p></div><p className="mt-2 text-right text-[10px] text-muted-foreground">{header.time_c} · đã chuyển tiếp</p></div>
  </div>;
  if (frame === 'dashboard') return <div className="mx-auto max-w-2xl border border-border bg-background shadow-lg">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 p-4"><div><p className="text-xs uppercase tracking-widest text-primary">ASTER · Bảng dữ liệu</p><h3 className="font-heading font-bold">{header.title_c}</h3></div><span className="font-mono text-[10px] text-muted-foreground">{header.updated_c}</span></div>
    <div className="grid gap-3 p-4 sm:grid-cols-[7rem_1fr]"><nav className="hidden border-r border-border pr-3 text-xs text-muted-foreground sm:block">Tổng quan<br/><br/>Hồ sơ<br/><br/>Nguồn xuất</nav><div className="grid gap-3"><div className="grid grid-cols-3 gap-2"><span className="border border-border p-2 text-[10px]">Hồ sơ<br/><b>216</b></span><span className="border border-border p-2 text-[10px]">Nguồn<br/><b>03</b></span><span className="border border-border p-2 text-[10px]">Trạng thái<br/><b>Đã xuất</b></span></div><p className="whitespace-pre-line border border-border bg-muted/20 p-3 text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p></div></div>
  </div>;
  if (frame === 'notice') return <div className="mx-auto max-w-xl border border-border bg-[#f7f4e9] p-4 text-slate-900 shadow-lg sm:p-6">
    <div className="border-b-2 border-slate-700 pb-3 text-center"><p className="text-xs font-bold uppercase tracking-widest">THÔNG BÁO / BẢN LƯU</p><p className="mt-1 font-mono text-xs">{header.issuer_c}</p><p className="mt-1 text-[10px]">{header.issued_c} · Mã: {header.reference_c}</p></div>
    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p>
    <div className="mt-5 border-t border-slate-400 pt-2 text-right text-[10px]">Bản sao · chưa xác thực chữ ký</div>
  </div>;
  return <div className="mx-auto max-w-xl border-[8px] border-foreground/80 bg-background p-3 shadow-lg">
    <div className="mb-3 flex items-center justify-between border-b border-border pb-2 font-mono text-xs"><span>{header.device_c}</span><span>{header.captured_c}</span></div>
    <div className="border border-border bg-muted/20 p-3"><div className="mb-3 flex items-center justify-between text-xs"><b>{header.filename_c}</b><span>⋮</span></div><p className="whitespace-pre-line text-sm leading-relaxed">{renderSegments(task.body_c, 'body')}</p></div>
  </div>;
}

function InspectTask({ task, onComplete }) {
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const urlSegments = Array.isArray(task.header_c.url_c) ? task.header_c.url_c : [];
  const bodySegments = task.body_c;
  const suspicious = [
    ...urlSegments.map((segment, index) => ({ id: `url-${index}`, segment })),
    ...bodySegments.map((segment, index) => ({ id: `body-${index}`, segment }))
  ].filter(item => typeof item.segment !== 'string' && item.segment.bad);
  const done = suspicious.length > 0 && suspicious.every(item => selected.includes(item.id));
  function inspect(id, segment) {
    setFeedback(`${task.speaker_c}: “${segment.note}”`);
    if (segment.bad) setSelected(items => items.includes(id) ? items : [...items, id]);
  }
  function renderSegments(segments, prefix) {
    return segments.map((segment, index) => {
      if (typeof segment === 'string') return segment;
      const id = `${prefix}-${index}`;
      return <button key={id} type="button" aria-pressed={selected.includes(id)} onClick={() => inspect(id, segment)}
        className={`game-focus inline rounded px-0.5 text-left underline decoration-dotted ${selected.includes(id) ? 'bg-primary/20 text-primary' : segment.bad ? 'decoration-warning hover:bg-warning/10' : 'decoration-muted-foreground hover:bg-muted'}`}>
        {segment.t}{selected.includes(id) && <span aria-hidden="true" className="ml-1 text-[10px]">✓</span>}
      </button>;
    });
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">{task.prompt_c}</p>
    <InspectFrame task={task} renderSegments={renderSegments}/>
    <Hint>{feedback}</Hint>
    {done && <EvidenceViewer task={task} onComplete={onComplete}/>}
  </div>;
}

function ConfrontTask({ task, chapterTasks, collectedClues, onComplete }) {
  const [feedback, setFeedback] = useState('');
  const [revealed, setRevealed] = useState(false);
  const evidence = chapterTasks.filter(item => collectedClues.includes(item.clue_index_c));
  function present(index) {
    if (index === task.present_clue_c) {
      setRevealed(true);
      setFeedback('');
      return;
    }
    setRevealed(false);
    setFeedback(task.deflection_c);
  }
  return <div>
    <p className="mb-3 text-sm text-muted-foreground">{task.prompt_c}</p>
    <p className="mb-2 text-sm font-semibold">Chọn một vật chứng đã thu thập để đối chất:</p>
    <div className="grid gap-2 sm:grid-cols-2">{evidence.map(item => <button key={item.clue_index_c} type="button" onClick={() => present(item.clue_index_c)} className="game-focus border border-border bg-background p-3 text-left hover:bg-muted">
      <b className="block text-primary">{item.clue_c[0]}</b><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.clue_c[2]}</span>
    </button>)}</div>
    {!evidence.length && <Hint>Chưa có vật chứng nào để trình bày.</Hint>}
    <Hint>{feedback}</Hint>
    {revealed && <EvidenceViewer task={task} onComplete={onComplete}/>}
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

export default function InvestigationTask({ task, onComplete, chapterTasks = [], collectedClues = [] }) {
  if (task.type_c === 'inspect') return <InspectTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'confront') return <ConfrontTask task={task} chapterTasks={chapterTasks} collectedClues={collectedClues} onComplete={onComplete}/>;
  if (task.type_c === 'compare') return <CompareTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'search') return <SearchTask task={task} onComplete={onComplete}/>;
  if (task.type_c === 'connect') return <ConnectTask task={task} onComplete={onComplete}/>;
  return <AudioTask task={task} onComplete={onComplete}/>;
}
