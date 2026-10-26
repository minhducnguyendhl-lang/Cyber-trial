export function Portrait({ name, variant = 'detective', emotion = 'neutral', framing = 'full', className = '', ...props }) {
  const id = useId().replace(/:/g, '');
  const [, refresh] = useState(0);
  useEffect(() => {
    const unsubscribe = subscribeCharacterImages(() => refresh(value => value + 1));
    loadCharacterImages().catch(() => {});
    return unsubscribe;
  }, []);

  // Ép lấy đúng tên nhân vật, nếu không truyền gì mà variant là suspect/khác thì mặc định Cyber-M
  const targetName = name || (variant === 'detective' ? 'An' : 'Cyber-M');
  
  // Lấy ảnh từ helper, nếu chưa có thì tự động ép một đối tượng chứa đường dẫn file ảnh trong public
  let image = getCharacterImage(targetName);
  if (!image || targetName === 'Cyber-M') {
    image = {
      url: '/characters/Cyber-M.png',
      url_c: '/characters/Cyber-M.png',
      built_in_c: true
    };
  }

  const suspect = variant === 'suspect';
  const victim = variant === 'victim';
  const shocked = ['shocked', 'scared', 'confused'].includes(emotion);
  const angry = ['angry', 'suspicious', 'determined'].includes(emotion);
  const happy = emotion === 'happy';
  const viewBox = '0 0 626 1015';
  const label = `${targetName} — ${emotionLabels[emotion] || emotionLabels.neutral}`;

  // LUÔN TRẢ VỀ THẺ <image> ĐỂ HIỆN ẢNH PNG THAY VÌ VẼ SVG CODE
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label} {...props}>
      <image 
        href={image.url || image.url_c} 
        width="626" 
        height="1015" 
        preserveAspectRatio="xMidYMax meet"
      />
      <EmotionMarks emotion={emotion}/>
    </svg>
  );
}