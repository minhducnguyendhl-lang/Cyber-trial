import { useEffect, useId, useState } from 'react';
import { getCharacterImage, loadCharacterImages, subscribeCharacterImages } from './characterImages';

export function Portrait({ name, variant = 'detective', emotion = 'neutral', className = '', ...props }) {
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
  const shocked = emotion === 'shocked' || emotion === 'scared';
  const angry = emotion === 'angry' || emotion === 'suspicious';
  const happy = emotion === 'happy';
  if (image) return <svg viewBox="0 0 480 680" className={className} role="img" aria-label={`Chân dung ${image.name_c}`} {...props}><image href={image.url_c} width="480" height="680" preserveAspectRatio="xMidYMid meet"/></svg>;
  return <svg viewBox="0 0 480 680" className={className} role="img" aria-label={name ? `Minh họa vector tạm dùng cho ${name}` : suspect ? 'Chân dung kẻ ẩn danh' : victim ? 'Nhân vật trong vụ án' : 'An, thám tử trẻ'} {...props}>
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
      <path d={happy ? 'M215 321Q242 343 264 315' : shocked ? 'M233 319Q248 307 252 331Q242 346 233 319Z' : 'M217 326Q241 322 260 325'} fill={shocked ? 'var(--background)' : 'none'} stroke="var(--background)" strokeWidth="3"/>
      <path d="M171 288 184 292M296 287 311 280" fill="none" stroke="var(--primary)" opacity=".3"/>
      {suspect && <g><path d="M132 220 209 218 219 264 141 263ZM259 218 337 220 329 263 250 264Z" fill="var(--background)" fillOpacity=".87" stroke="var(--primary)" strokeWidth="2"/><path d="M215 234h38" stroke="var(--primary)" strokeWidth="4"/><path d="M141 249 196 227M267 249 322 226" stroke="var(--primary)" opacity=".6"/></g>}
      {!suspect && !victim && <g><path d="M133 407 93 461 117 470 155 420" fill="var(--primary)"/><path d="M90 453 62 428 75 472 109 491" fill="var(--primary)"/><path d="M128 261 141 303" stroke="var(--primary)" strokeWidth="3"/></g>}
      <path d="M390 652 371 529Q368 489 342 471L301 443 288 452 322 487 282 469 268 480 306 511 274 498 264 511 305 550 327 666Z" fill={`url(#face-${id})`}/>
      <path d="M285 449 293 418 324 422 332 485" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="3"/>
      <path d="M294 432 319 435m-26 10 25 4" stroke="var(--chart-2)" strokeWidth="2"/>
      <path d="M300 613 351 599 380 680h-82Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="3"/>
      <path d="M151 342 205 374M323 308 278 358" stroke="var(--muted-foreground)" opacity=".35"/>
    </g>
  </svg>;
}

export default function SceneArt({ scene = 'maze-hub', variant = 'detective', emotion = 'suspicious', portrait = true, className = '', ...props }) {
  const id = useId().replace(/:/g, '');
  const digital = scene === 'digital';
  const zone = { 'maze-school': '01 / HỌC BỔNG', 'maze-bank': '02 / NGÂN HÀNG', 'maze-market': '03 / GIAO DỊCH', 'maze-residence': '04 / KÝ TÚC XÁ', 'maze-office': '05 / TUYỂN DỤNG', 'maze-archive': '06 / KHO LƯU TRỮ', 'maze-hub': '07 / TRUNG TÂM' }[scene] || 'TRUNG TÂM';
  return <svg viewBox="0 0 1000 650" className={className} role="img" aria-label={`Mê cung ảo rộng lớn, các phân khu cách biệt: ${zone}`} {...props}>
    <defs>
      <linearGradient id={`sky-${id}`} x2="0" y2="1"><stop stopColor="var(--secondary)"/><stop offset="1" stopColor="var(--background)"/></linearGradient>
      <radialGradient id={`halo-${id}`}><stop stopColor="var(--chart-2)" stopOpacity=".35"/><stop offset="1" stopColor="var(--chart-2)" stopOpacity="0"/></radialGradient>
      <pattern id={`dots-${id}`} width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--foreground)" opacity=".13"/></pattern>
    </defs>
    <rect width="1000" height="650" fill={`url(#sky-${id})`}/>
    <circle cx="681" cy="256" r="335" fill={`url(#halo-${id})`}/>
    <g stroke="var(--chart-2)" opacity=".18" fill="none">
      <path d="M0 470 1000 380M0 515 1000 415M0 570 1000 460M40 650 570 360M290 650 640 360M730 650 725 360M1000 650 780 360"/>
      <circle cx="710" cy="220" r="157"/><circle cx="710" cy="220" r="177" strokeDasharray="4 14"/>
    </g>
    <g fill="var(--background)" stroke="var(--border)" strokeWidth="2">
      <path d="M0 402V257h87v145h17V183h117v219h24V286h85v116h28V207h77v195h34V116h109v286h20V236h73v166h18V175h106v227h23V259h76v143h23V123h86v279h22V210h91v440H0Z"/>
      <path d="M113 184v-24h95v24M475 116v-18h96v18M737 177v-42h69v42M897 122V91h58v31"/>
    </g>
    <g stroke="var(--chart-2)" strokeWidth="4" opacity=".45">
      {[0, 1, 2, 3, 4, 5].map(row => <path key={row} d={`M123 ${207 + row * 25}h22m14 0h22m14 0h14M485 ${142 + row * 31}h20m16 0h20m14 0h13M895 ${146 + row * 29}h15m14 0h19`}/>)}
    </g>
    {scene === 'school' && <g fill="var(--muted)" stroke="var(--border)"><path d="M0 442h1000v49H0Z"/><path d="M40 491v159m155-159v159m155-159v159m155-159v159m155-159v159m155-159v159m155-159v159" strokeWidth="8"/><path d="M0 582h1000" strokeWidth="8"/></g>}
    {scene === 'cafe' && <g><path d="M0 0h90v650H0M430 0h15v480h-15M920 0h20v650h-20" fill="var(--muted)"/><path d="M0 476h1000v17H0M32 80h896" stroke="var(--border)" strokeWidth="5"/><path d="M129 72v73m265-73v73m412-73v73" stroke="var(--primary)" strokeWidth="3"/><path d="M89 177 129 136 169 177ZM354 177 394 136 434 177ZM766 177 806 136 846 177Z" fill="var(--primary)" opacity=".55"/></g>}
    {digital && <g fill="var(--secondary)" stroke="var(--chart-2)" strokeWidth="2" opacity=".7"><path d="M65 135h295v175H65Z"/><path d="M750 90h200v138H750Z"/><path d="M93 165h149m-149 22h226m-226 23h95m-95 28h202m-202 25h172" fill="none"/><text x="780" y="145" fontSize="21" fill="var(--chart-2)" fontFamily="monospace">ACCESS ?</text><path d="M776 172h135m-135 24h92"/></g>}
    <g transform="translate(81 91) rotate(-9)" stroke="var(--primary)" fill="var(--background)" strokeWidth="3">
      <rect width="200" height="264" rx="8"/><path d="M71 17h62" strokeWidth="4"/><circle cx="100" cy="78" r="27" fill="var(--muted)"/><path d="M65 146h101m-101 21h78m-78 21h101" stroke="var(--muted-foreground)" strokeWidth="6"/><path d="M54 213h94v28H54" fill="var(--primary)"/><path d="M100 64v17m0 7v3" strokeWidth="4"/>
    </g>
    <g stroke="var(--primary)" fill="none" strokeWidth="5" opacity=".55">
      <path d="M303 0v74c0 35 53 36 53 0v-18l-17 15M849 0v329c0 36 53 36 53 0v-17l-16 15"/>
      <path d="M286 343 387 249M866 387 976 290M0 609 330 491" strokeWidth="2"/>
    </g>
    <path d="M0 649 1000 537v113H0" fill="var(--background)" opacity=".9"/>
    <rect width="1000" height="650" fill={`url(#dots-${id})`}/>
    <g stroke="var(--chart-2)" strokeWidth="2">
      <path d="M0 0H1000V650H0Z" fill="var(--background)"/>
      <path d="M0 650 390 370H610L1000 650ZM0 0 390 200V370L0 650ZM1000 0 610 200V370L1000 650Z" fill="var(--secondary)"/>
      <path d="M390 200H610V370H390Z" fill="var(--background)"/>
      {[0, 1, 2, 3].map(i => <g key={i} opacity={1 - i * .18}>
        <path d={`M${70 + i * 88} ${36 + i * 45}V${600 - i * 62}M${930 - i * 88} ${36 + i * 45}V${600 - i * 62}`} strokeWidth="8"/>
        <path d={`M${70 + i * 88} ${36 + i * 45}H${930 - i * 88}`} stroke="var(--border)" strokeWidth="12"/>
      </g>)}
      <path d="M30 190 120 230V475L30 530ZM880 230 970 190V530L880 475Z" fill="var(--muted)" stroke="var(--primary)" strokeWidth="4"/>
      <path d="M440 240H560V370H440Z" fill="var(--muted)" stroke="var(--primary)" strokeWidth="4"/>
      <path d="M500 240V370M30 350 120 335M880 335 970 350" stroke="var(--primary)"/>
      <path d="M65 650 412 370M935 650 588 370M0 555H1000M170 460H830M295 410H705" opacity=".45"/>
      <path d="M0 90 390 240M1000 90 610 240" strokeWidth="5"/>
      <g transform="translate(735 38)" fill="var(--background)">
        <rect width="230" height="148" rx="4" stroke="var(--border)"/>
        <path d="M18 42h48v35H38v43h55V61h42v59h30V42h46M18 91h20M93 120v13h118M135 61V30h30M66 42V25h45" fill="none" strokeWidth="5"/>
        <text x="18" y="20" fill="var(--chart-2)" stroke="none" fontSize="11" fontFamily="monospace">RÉSEAU / SECTEURS ISOLÉS</text>
      </g>
      <text x="500" y="220" textAnchor="middle" fill="var(--chart-2)" stroke="none" fontSize="14" fontFamily="monospace">{zone}</text>
      <text x="500" y="292" textAnchor="middle" fill="var(--primary)" stroke="none" fontSize="12" fontFamily="monospace">ACCÈS VERROUILLÉ</text>
    </g>
    {portrait && <Portrait x="448" y="14" width="505" height="715" variant={variant} emotion={emotion}/>}
    <g stroke="var(--foreground)" opacity=".16" strokeWidth="2"><path d="M988 21 930 127M957 25 904 125M1000 446 942 468M15 585 134 553M25 610 144 568"/></g>
  </svg>;
}