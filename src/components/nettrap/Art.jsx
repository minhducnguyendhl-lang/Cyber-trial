import { useEffect, useId, useState } from 'react';
import { getCharacterImage, loadCharacterImages, subscribeCharacterImages } from './characterImages';
import { BACKDROPS } from './Backdrops';

const emotionLabels = { neutral: 'bình tĩnh', happy: 'vui mừng', scared: 'sợ hãi', shocked: 'hoang mang', confused: 'hoang mang', determined: 'kiên cường', suspicious: 'suy tư', angry: 'giận dữ' };

function EmotionMarks({ emotion }) {
  return <g aria-hidden="true" fill="none" strokeWidth="4" strokeLinecap="round">
    {emotion === 'happy' && <g stroke="var(--warning)"><path d="M90 150v28m-14-14h28M377 90v32m-16-16h32M358 189l12 14 12-14"/><path d="M105 285l16 7m-13 6 16 7M348 285l-16 7m13 6-16 7" stroke="var(--primary)"/></g>}
    {emotion === 'scared' && <g stroke="var(--chart-2)"><path d="M352 211q-18 25 0 25q18 0 0-25Z" fill="var(--chart-2)" fillOpacity=".5"/><path d="M165 201v25m10-25v20m10-20v16M96 280l-8 10 8 10-8 10M369 280l8 10-8 10 8 10"/></g>}
    {(emotion === 'confused' || emotion === 'shocked') && <g stroke="var(--warning)"><path d="M347 139q0-24 19-24t19 20q0 12-19 20v13m0 15v2M111 176v-32m0 46v2"/></g>}
    {emotion === 'determined' && <g stroke="var(--primary)"><path d="M77 255l38-10M80 275l33-6M364 245l38 10M366 269l33 6"/></g>}
    {emotion === 'angry' && <g stroke="var(--destructive)"><path d="M100 160l30 20m0-20l-30 20M340 160l30 20m0-20l-30 20"/></g>}
  </g>;
}

export function Portrait({ name, variant = 'detective', emotion = 'neutral', framing = 'full', className = '', ...props }) {
  const id = useId().replace(/:/g, '');
  const [, refresh] = useState(0);
  useEffect(() => {
    const unsubscribe = subscribeCharacterImages(() => refresh(value => value + 1));
    loadCharacterImages().catch(() => {});
    return unsubscribe;
  }, []);

  const targetName = name || (variant === 'detective' ? 'An' : 'Cyber-M');
  const image = getCharacterImage(targetName) || {
    url: `/characters/${targetName}.png`,
    url_c: `/characters/${targetName}.png`
  };

  // Tự động chuyển ảnh theo biểu cảm nếu có file cấu hình riêng, nếu không sẽ dùng ảnh mặc định
  const currentImageUrl = image[emotion] || image.url || image.url_c;

  // Cấu hình viewBox: Cắt nửa thân trên (bust shot) cho Cyber-M từ ảnh dọc toàn thân
  let viewBox = '0 0 650 850';
  let preserveAspectRatio = 'xMidYMid slice';

  if (targetName === 'Cyber-M') {
    viewBox = '0 0 650 520'; // Chỉ hiển thị phần từ đầu xuống ngang ngực/hông của Cyber-M
  }

  const label = `${targetName} — ${emotionLabels[emotion] || emotionLabels.neutral}`;

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label} {...props}>
      <image 
        href={currentImageUrl} 
        width="650" 
        height="850" 
        preserveAspectRatio={preserveAspectRatio}
      />
      <EmotionMarks emotion={emotion}/>
    </svg>
  );
}

export default function SceneArt({ scene = 'maze-hub', className = '', ...props }) {
  const Backdrop = BACKDROPS[scene] || BACKDROPS['maze-hub'];
  return <Backdrop className={className} {...props}/>;
}