import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CHAPTERS } from '@/components/nettrap/story';
import { useGame } from '@/components/nettrap/GameState';

export default function TrialPanel() {
  const { save, chapter, finishChapter } = useGame();
  const navigate = useNavigate();
  const [beat, setBeat] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [chosen, setChosen] = useState([]);
  const [outcomeSaved, setOutcomeSaved] = useState(false);
  const trial = chapter.trial_c;
  const tasks = chapter.investigation_c;
  const beatLabels = [
    'Tuyên bố',
    ...trial.moments_c.map((_, index) => {
      if (index === 0) return 'Đối chất';
      return index === trial.moments_c.length - 1 && trial.moments_c.length > 2 ? 'Nguồn độc lập' : 'Mâu thuẫn';
    }),
    'Kết luận'
  ];
  const required = tasks.filter(task => task.required_c).map(task => task.clue_index_c);
  const ready = required.every(index => save.clues_c.includes(index));
  if (!save.has_session_c) return <Navigate to="/chapters" replace/>;
  if (!ready) return <Navigate to="/investigation" replace/>;
  const conclusionBeat = beatLabels.length - 1;
  const moment = beat > 0 && beat < conclusionBeat ? trial.moments_c[beat - 1] : null;
  function present(index) {
    if (moment.accepted_c.includes(index)) {
      setFeedback(moment.reply_c);
      setChosen(items => [...items, index]);
      setBeat(beat + 1);
    } else setFeedback('An: “Vật chứng này chưa trả lời được câu hỏi. Đối chiếu đúng nguồn và thử lại.”');
  }
  function decide(decision) {
    if (chapter.number_c === '06') finishChapter({ route_c: decision.route_c });
    else if (chapter.number_c === '07') {
      const optional = tasks.filter(task => task.optional_c).map(task => task.clue_index_c);
      const complete = optional.every(index => save.clues_c.includes(index));
      const ending = decision.ending_c === 'independent' && complete ? 'true' : 'normal';
      const missing = tasks.filter(task => task.optional_c && !save.clues_c.includes(task.clue_index_c)).map(task => task.hotspot_c);
      setFeedback(ending === 'true' ? 'Chuỗi độc lập đầy đủ. Tòa xác nhận sự thật.' : `Chuỗi độc lập còn thiếu mắt xích${missing.length ? `: ${missing.join(', ')}` : ''}. Kết luận tạm thời, chưa đủ nguồn để xác nhận.`);
      finishChapter({ ending_c: ending });
      setOutcomeSaved(true);
      return;
    } else finishChapter();
    navigate('/aftermath');
  }
  return <main className="mx-auto max-w-4xl space-y-5 px-4 py-8 sm:px-8">
    <p className="text-xs font-bold uppercase tracking-widest text-primary">PHIÊN TÒA · VỤ {chapter.number_c}</p>
    <h1 className="font-heading text-4xl font-bold">{beatLabels.join(' → ')}</h1>
    <nav aria-label="Các giai đoạn" className="grid gap-2" style={{ gridTemplateColumns: `repeat(${beatLabels.length}, minmax(0, 1fr))` }}>{beatLabels.map((label, index) => <div key={`${label}-${index}`} className={`border p-2 text-center text-xs ${index === beat ? 'border-primary bg-secondary text-primary' : 'border-border text-muted-foreground'}`}>{label}</div>)}</nav>
    <section className="min-h-48 border border-border bg-card p-5 sm:p-8">
      <h2 className="mb-4 font-heading text-2xl font-bold">{beatLabels[beat]}</h2>
      {beat === 0 && <p>{trial.moments_c[0].prompt_c}</p>}
      {moment && <><p className="mb-4">{moment.prompt_c}</p><div className="grid gap-2 sm:grid-cols-2">{chapter.clues_c.map((clue, index) => <Button key={clue[0]} variant="outline" className="h-auto min-h-12 whitespace-normal py-3 text-left" onClick={() => present(index)}>{clue[0]}</Button>)}</div></>}
      {beat === conclusionBeat && <><p className="mb-4">{trial.contradiction_c}</p><p>{trial.conclusion_c}</p>
        {(trial.decisions_c || [{ label_c: 'Ghi nhận kết luận và tiếp tục', ending_c: 'normal' }]).map(decision => <Button key={decision.label_c} onClick={() => decide(decision)} className="mt-3 min-h-12 w-full whitespace-normal py-3">{decision.label_c}</Button>)}</>}
      {feedback && <p role="status" className="mt-4 border-l-2 border-warning bg-secondary p-3 text-sm">{feedback}</p>}
      {outcomeSaved && <Button onClick={() => navigate('/aftermath')} className="mt-4 min-h-12 w-full">Xem hậu quả của lựa chọn</Button>}
      {beat === 0 && <Button onClick={() => { setBeat(1); setFeedback(''); }} className="mt-5 min-h-12 w-full">Đưa chứng cứ ra đối chất</Button>}
    </section>
    <p className="text-xs text-muted-foreground">Vật chứng đã lưu: {save.clues_c.length}/5</p>
  </main>;
}
