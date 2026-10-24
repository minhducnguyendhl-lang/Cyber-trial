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
  const image = getCharacterImage(name || (variant === 'detective' ? 'An' : 'Cyber-M'));
  const suspect = variant === 'suspect';
  const victim = variant === 'victim';
  const shocked = ['shocked', 'scared', 'confused'].includes(emotion);
  const angry = ['angry', 'suspicious', 'determined'].includes(emotion);
  const happy = emotion === 'happy';
  const viewBox = image?.built_in_c
    ? framing === 'bust' ? '0 0 626 850' : '0 0 626 1015'
    : framing === 'bust' ? '60 30 360 470' : '0 0 480 680';
  const label = `${name || 'An'} — ${emotionLabels[emotion] || emotionLabels.neutral}`;
  if (image) return <svg viewBox={viewBox} className={className} role="img" aria-label={label} {...props}><image href={image.url_c} width={image.built_in_c ? '626' : '480'} height={image.built_in_c ? '1015' : '680'} preserveAspectRatio={image.built_in_c ? 'xMidYMax meet' : 'xMidYMin meet'}/><EmotionMarks emotion={emotion}/></svg>;
  if (name === 'Cyber-M') return <svg viewBox={viewBox} className={className} role="img" aria-label={label} {...props}>
    <path d="M54 680 80 421 159 368Q100 182 166 94Q234 20 316 96Q378 189 322 368L403 421 435 680Z" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="3"/>
    <path d="M169 177Q240 133 310 177L293 316 241 356 188 316Z" fill="var(--secondary)"/>
    {Array.from({ length: 24 }, (_, i) => <rect key={i} x={176 + (i % 6) * 22} y={185 + Math.floor(i / 6) * 28} width="17" height="19" fill={i % 3 ? 'var(--muted)' : 'var(--chart-2)'} opacity={i % 2 ? '.4' : '.8'}/>)}
    <path d="M190 236h30m40 0h30M209 301h63M168 403l72 81 76-81M240 484v196" fill="none" stroke="var(--primary)" strokeWidth="6"/>
    <EmotionMarks emotion={emotion}/>
  </svg>;
  return <svg viewBox={viewBox} className={className} role="img" aria-label={label} {...props}>
    <defs>
      <linearGradient id={`coat-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--muted)"/><stop offset="1" stopColor="var(--background)"/></linearGradient>
      <linearGradient id={`face-${id}`}><stop stopColor="var(--card-foreground)"/><stop offset=".7" stopColor="var(--foreground)"/><stop offset="1" stopColor="var(--accent)"/></linearGradient>
      <linearGradient id={`hair-${id}`}><stop stopColor="var(--background)"/><stop offset="1" stopColor="var(--secondary)"/></linearGradient>
    </defs>
    <g className="portrait-line" stroke="var(--background)" strokeWidth="2">
      <path d="M55 680 75 463Q90 410 176 395L181 349H291L297 394Q391 412 412 467L448 680Z" fill={`url(#coat-${id})`}/>
      <path d="M184 347 181 408 231 449 295 403 288 347" fill={`url(#face-${id})`}/>
      <path d="M181 392 235 443 291 392 302 453 232 576 164 449Z" fill="var(--card)"/>
      <path d="M231 443 254 466 239 554 216 494Z" fill="var(--primary)"/>
      <path d="M171 396 119 420 170 475 143 502 223 637 197 466Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="3"/>
      <path d="M302 395 350 419 307 476 336 506 254 637 273 464Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="3"/>
      <path d="M85 490 141 542 130 678M371 487 333 550 362 677" fill="none" stroke="var(--border)" strokeWidth="3"/>
      <path d="M306 536h51v46h-51z" fill="var(--secondary)" stroke="var(--chart-2)"/>
      <path d="M319 546h24m-24 10h16m-16 10h20" fill="none" stroke="var(--chart-2)"/>
      <path d="M150 171Q143 100 224 78Q321 64 337 161L330 274Q321 341 241 377Q174 351 155 288Z" fill={`url(#face-${id})`}/>
      <path d="M151 218Q126 203 132 242Q133 269 160 274M329 218Q350 201 348 241Q345 264 328 271" fill="var(--card-foreground)" opacity=".7"/>
      <path d="M149 257Q128 193 136 148Q151 71 225 56Q317 49 351 123L343 256 312 205 318 138 284 173 280 128 236 203 231 137 174 205 179 159Z" fill={`url(#hair-${id})`}/>
      {victim && <path d="M147 184Q87 216 99 382L155 452 170 335M330 166Q390 246 365 412L311 448 316 325" fill={`url(#hair-${id})`}/>}
      <path d="M147 147 195 97 164 172M198 98 237 75 211 156M246 88 284 73 270 144M307 106 334 149 315 189" fill="none" stroke="var(--border)" strokeWidth="3"/>
      <path d={angry ? 'M167 218 208 231M268 231 309 215' : shocked ? 'M168 211 207 205M268 205 309 211' : 'M168 219 207 215M268 215 309 219'} fill="none" stroke="var(--background)" strokeWidth="5"/>
      <path d={shocked ? 'M166 246Q183 221 207 245Q190 269 166 246Z' : 'M164 246Q184 232 211 246Q190 257 164 246Z'} fill="var(--card)" strokeWidth="3"/>
      <path d={shocked ? 'M266 245Q288 221 311 244Q289 268 266 245Z' : 'M264 246Q285 232 313 243Q290 258 264 246Z'} fill="var(--card)" strokeWidth="3"/>
      <ellipse cx="190" cy="246" rx={shocked ? 6 : 8} ry={shocked ? 11 : 9} fill={suspect ? 'var(--primary)' : 'var(--chart-2)'}/>
      <ellipse cx="286" cy="246" rx={shocked ? 6 : 8} ry={shocked ? 11 : 9} fill={suspect ? 'var(--primary)' : 'var(--chart-2)'}/>
      <circle cx="192" cy="242" r="3" fill="var(--card)"/><circle cx="288" cy="242" r="3" fill="var(--card)"/>
      <path d="M237 250 226 292 241 299" fill="none" stroke="var(--muted-foreground)" strokeWidth="2"/>
      <path d={happy ? 'M215 321Q242 343 264 315' : shocked ? 'M233 319Q248 307 252 331Q242 346 233 319Z' : emotion === 'determined' ? 'M215 326h47' : 'M217 326Q241 322 260 325'} fill={shocked ? 'var(--background)' : 'none'} stroke="var(--background)" strokeWidth="3"/>
      <path d="M171 288 184 292M296 287 311 280" fill="none" stroke="var(--primary)" opacity=".3"/>
      {suspect && <g><path d="M132 220 209 218 219 264 141 263ZM259 218 337 220 329 263 250 264Z" fill="var(--background)" fillOpacity=".87" stroke="var(--primary)" strokeWidth="2"/><path d="M215 234h38" stroke="var(--primary)" strokeWidth="4"/><path d="M141 249 196 227M267 249 322 226" stroke="var(--primary)" opacity=".6"/></g>}
      {!suspect && !victim && <g><path d="M133 407 93 461 117 470 155 420" fill="var(--primary)"/><path d="M90 453 62 428 75 472 109 491" fill="var(--primary)"/><path d="M128 261 141 303" stroke="var(--primary)" strokeWidth="3"/></g>}
      <path d="M390 652 371 529Q368 489 342 471L301 443 288 452 322 487 282 469 268 480 306 511 274 498 264 511 305 550 327 666Z" fill={`url(#face-${id})`}/>
      <path d="M285 449 293 418 324 422 332 485" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="3"/>
      <path d="M294 432 319 435m-26 10 25 4" stroke="var(--chart-2)" strokeWidth="2"/>
      <path d="M300 613 351 599 380 680h-82Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="3"/>
      <path d="M151 342 205 374M323 308 278 358" stroke="var(--muted-foreground)" opacity=".35"/>
    </g>
    <EmotionMarks emotion={emotion}/>
  </svg>;
}

export default function SceneArt({ scene = 'maze-hub', className = '', ...props }) {
  const Backdrop = BACKDROPS[scene] || BACKDROPS['maze-hub'];
  return <Backdrop className={className} {...props}/>;
}