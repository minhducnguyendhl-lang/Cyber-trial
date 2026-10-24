import { useId } from 'react';

function Frame({ scene, label, className = '', children, ...props }) {
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 1000 650" className={className} role="img" aria-label={label} {...props}>
    <defs>
      <linearGradient id={`wall-${id}`} x2="0" y2="1"><stop stopColor="var(--secondary)"/><stop offset="1" stopColor="var(--background)"/></linearGradient>
      <linearGradient id={`floor-${id}`} x2="0" y2="1"><stop stopColor="var(--muted)"/><stop offset="1" stopColor="var(--background)"/></linearGradient>
      <radialGradient id={`glow-${id}`}><stop stopColor="var(--chart-2)" stopOpacity=".33"/><stop offset="1" stopColor="var(--chart-2)" stopOpacity="0"/></radialGradient>
      <pattern id={`grid-${id}`} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="var(--foreground)" strokeOpacity=".06"/></pattern>
    </defs>
    <rect width="1000" height="650" fill={`url(#wall-${id})`}/>
    <circle cx="690" cy="260" r="430" fill={`url(#glow-${id})`}/>
    <path d="M0 427 390 325H610L1000 427V650H0Z" fill={`url(#floor-${id})`}/>
    <path d="M0 650 390 325M1000 650 610 325M0 503H1000M0 564H1000M118 650 432 325M882 650 568 325" fill="none" stroke="var(--border)" strokeWidth="2" opacity=".38"/>
    {children}
    <rect width="1000" height="650" fill={`url(#grid-${id})`} pointerEvents="none"/>
    <g fill="none" stroke="var(--chart-2)" strokeWidth="3" opacity=".72" pointerEvents="none">
      <path d="M24 24h72v-12h38M976 24h-72v-12h-38M24 626h72v12h38M976 626h-72v12h-38"/>
      <path d="M0 112h20m960 0h20M0 540h20m960 0h20" strokeDasharray="5 12"/>
    </g>
    <path d="M0 40h18v570H0M982 40h18v570h-18" fill="var(--background)" opacity=".5" pointerEvents="none"/>
  </svg>;
}

function Screen({ x, y, width, height, title, children, alarm = false }) {
  return <g>
    <rect x={x} y={y} width={width} height={height} rx="8" fill="var(--background)" stroke={alarm ? 'var(--destructive)' : 'var(--chart-2)'} strokeWidth="4"/>
    <path d={`M${x + 12} ${y + 38}h${width - 24}`} stroke="var(--border)" strokeWidth="2"/>
    <text x={x + 18} y={y + 27} fill={alarm ? 'var(--destructive)' : 'var(--primary)'} fontSize="14" fontFamily="monospace" fontWeight="700">{title}</text>
    {children}
  </g>;
}

export function WhiteRoomBackdrop(props) {
  return <Frame scene="white-room" label="Phòng trắng mô phỏng, vòng tay điện tử và màn hình Cyber-M" {...props}>
    <path d="M0 0h1000v430L610 325H390L0 430Z" fill="var(--card)" stroke="var(--border)" strokeWidth="3"/>
    <path d="M0 432 390 325h220l390 107v24L610 354H390L0 456Z" fill="var(--primary)" opacity=".12"/>
    <g transform="translate(78 150)">
      <rect width="260" height="224" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="5"/>
      <text x="24" y="36" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">WRISTBAND / 01</text>
      <path d="M32 65h196v78H32Z" fill="var(--muted)" stroke="var(--chart-2)" strokeWidth="2"/>
      <text x="50" y="98" fill="var(--primary)" fontSize="16" fontFamily="monospace">IDENTITY LOCKED</text>
      <text x="50" y="125" fill="var(--foreground)" fontSize="13" fontFamily="monospace">SUBJECT: AN</text>
      <path d="M34 172h54l18-18 21 36 19-27h79" fill="none" stroke="var(--chart-2)" strokeWidth="3"/>
      <circle cx="227" cy="182" r="7" fill="var(--primary)"/>
      <path d="M102 224v44m56-44v44M80 268h100" stroke="var(--border)" strokeWidth="8"/>
    </g>
    <g transform="translate(452 82)">
      <rect width="470" height="270" rx="12" fill="var(--muted)" stroke="var(--chart-2)" strokeWidth="6"/>
      <rect x="16" y="16" width="438" height="230" rx="4" fill="var(--background)"/>
      <text x="36" y="48" fill="var(--primary)" fontSize="17" fontFamily="monospace">CYBER-M / WELCOME</text>
      <g transform="translate(117 68)" fill="var(--chart-2)">
        {Array.from({ length: 25 }, (_, i) => <rect key={i} x={(i % 5) * 34} y={Math.floor(i / 5) * 29} width="23" height="21" opacity={i % 3 ? '.45' : '.95'}/>)}
      </g>
      <path d="M182 218h112m-91 17h70" stroke="var(--primary)" strokeWidth="5"/>
      <path d="M195 270v39h80v-39M156 309h158" fill="none" stroke="var(--border)" strokeWidth="9"/>
    </g>
    <g transform="translate(352 438)">
      <rect width="296" height="22" rx="10" fill="var(--muted)" stroke="var(--border)" strokeWidth="4"/>
      <path d="M135 0v-35h26V0" fill="none" stroke="var(--primary)" strokeWidth="9"/>
      <rect x="113" y="-47" width="70" height="25" rx="8" fill="var(--chart-2)"/>
      <circle cx="147" cy="-35" r="6" fill="var(--background)"/>
      <path d="M38 23v80m220-80v80M22 104h268" stroke="var(--border)" strokeWidth="8"/>
    </g>
    <text x="500" y="595" textAnchor="middle" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">WHITE ROOM · ACCESS SEALED</text>
  </Frame>;
}

export function DormBackdrop(props) {
  return <Frame scene="maze-dorm" label="Ký túc xá với giường tầng, bàn học và cửa sổ nhìn ra thành phố ảo" {...props}>
    <rect x="320" y="76" width="372" height="226" rx="5" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="7"/>
    <path d="M506 80v216M324 190h364" stroke="var(--chart-2)" strokeWidth="4"/>
    <path d="M329 181h172v-96H329m184 94h170v-96H513" fill="none" stroke="var(--primary)" strokeWidth="2"/>
    <g fill="var(--muted)" opacity=".88">
      <path d="M342 181V135h24V106h32v76M405 181v-53h29v-28h40v81M522 181v-36h26V112h32v69M594 181v-63h20V96h46v85"/>
    </g>
    <g stroke="var(--border)" strokeWidth="9" fill="var(--card)">
      <path d="M60 156h240v276H60Z"/><path d="M60 288h240M60 432h240"/>
      <path d="M68 175h224v85H68Z" fill="var(--secondary)"/><path d="M68 307h224v91H68Z" fill="var(--secondary)"/>
    </g>
    <path d="M81 182h91v61H81Zm0 132h91v71H81Z" fill="var(--background)" stroke="var(--primary)" strokeWidth="3"/>
    <path d="M66 270h229m-229 145h229M79 164v258m202-258v258" stroke="var(--chart-2)" strokeWidth="4"/>
    <g transform="translate(704 347)">
      <path d="M0 77h234v15H0Zm18 15v94m198-94v94" fill="var(--muted)" stroke="var(--border)" strokeWidth="5"/>
      <rect x="45" y="18" width="135" height="58" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
      <path d="M56 31h108m-108 12h77m-77 12h94" stroke="var(--primary)" strokeWidth="3"/>
      <path d="M192 75v-74h12v74" stroke="var(--primary)" strokeWidth="4"/>
      <path d="M198 0v-27m-16 0h32" stroke="var(--warning)" strokeWidth="4"/>
    </g>
    <text x="500" y="566" textAnchor="middle" fill="var(--primary)" fontSize="18" fontFamily="monospace">KÝ TÚC XÁ · RETURN TO COMMON ROOM</text>
  </Frame>;
}

export function SchoolBackdrop(props) {
  return <Frame scene="maze-school" label="Trung tâm học bổng với bảng thông báo, kiosks và bản đồ thành phố" {...props}>
    <rect x="64" y="92" width="606" height="305" rx="10" fill="var(--muted)" stroke="var(--border)" strokeWidth="8"/>
    <text x="91" y="128" fill="var(--primary)" fontSize="21" fontFamily="monospace" fontWeight="700">TRUNG TÂM HỌC BỔNG / THÔNG BÁO</text>
    {Array.from({ length: 12 }, (_, i) => {
      const x = 92 + (i % 4) * 137;
      const y = 151 + Math.floor(i / 4) * 78;
      return <g key={i} transform={`translate(${x} ${y})`}>
        <rect width="116" height="63" fill={i === 3 ? 'var(--secondary)' : 'var(--background)'} stroke={i === 3 ? 'var(--destructive)' : 'var(--chart-2)'} strokeWidth="2"/>
        <path d="M10 16h95M10 28h72M10 40h84M10 51h49" stroke="var(--muted-foreground)" strokeWidth="3"/>
        <circle cx="101" cy="51" r="5" fill={i % 3 ? 'var(--primary)' : 'var(--warning)'}/>
      </g>;
    })}
    <g transform="translate(724 96)">
      <rect width="206" height="260" rx="8" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="5"/>
      <text x="18" y="31" fill="var(--primary)" fontSize="15" fontFamily="monospace">CITY / MAP</text>
      <path d="M20 60h166v165H20Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="2"/>
      <path d="M45 62v160m54-160v160m55-160v160M23 107h159m-159 56h159" fill="none" stroke="var(--chart-2)" strokeWidth="3" strokeDasharray="7 5"/>
      <circle cx="98" cy="136" r="12" fill="var(--destructive)"/><circle cx="45" cy="83" r="7" fill="var(--primary)"/>
      <text x="28" y="247" fill="var(--muted-foreground)" fontSize="12" fontFamily="monospace">YOU ARE HERE</text>
    </g>
    <g transform="translate(118 446)">
      <rect width="120" height="158" rx="7" fill="var(--background)" stroke="var(--primary)" strokeWidth="4"/>
      <rect x="17" y="17" width="86" height="87" fill="var(--secondary)"/>
      <path d="M28 35h64m-64 15h53m-53 15h61m-61 15h40" stroke="var(--chart-2)" strokeWidth="3"/>
      <path d="M35 124h50m-42 13h34" stroke="var(--border)" strokeWidth="6"/>
    </g>
    <g transform="translate(274 477)" stroke="var(--border)" strokeWidth="8"><path d="M0 53h375v15H0Zm18 15v58m339-58v58"/></g>
    <text x="461" y="510" fill="var(--primary)" fontSize="16" fontFamily="monospace">SCHOLARSHIP · CONTEST · JOB</text>
  </Frame>;
}

export function BankBackdrop(props) {
  return <Frame scene="maze-bank" label="Ngân hàng mô phỏng với quầy giao dịch, phòng kính báo động, két và bảng thoát hiểm" {...props}>
    <g transform="translate(50 116)">
      <rect width="284" height="276" fill="var(--muted)" stroke="var(--border)" strokeWidth="6"/>
      <text x="22" y="32" fill="var(--primary)" fontSize="16" fontFamily="monospace">TELLER / 01–04</text>
      {Array.from({ length: 4 }, (_, i) => <g key={i} transform={`translate(${18 + i * 64} 56)`}>
        <rect width="52" height="100" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="2"/>
        <rect x="7" y="10" width="38" height="26" fill="var(--secondary)"/>
        <path d="M8 56h36m-36 10h28m-28 10h35" stroke="var(--muted-foreground)" strokeWidth="3"/>
      </g>)}
      <path d="M15 179h254v61H15Z" fill="var(--background)" stroke="var(--primary)" strokeWidth="3"/>
      <text x="31" y="216" fill="var(--muted-foreground)" fontSize="13" fontFamily="monospace">VERIFY AT OFFICIAL COUNTER</text>
      <path d="M22 276v61m235-61v61M0 338h284" stroke="var(--border)" strokeWidth="9"/>
    </g>
    <g transform="translate(368 124)">
      <rect width="352" height="254" fill="var(--background)" fillOpacity=".62" stroke="var(--chart-2)" strokeWidth="5"/>
      <path d="M88 0v254m88-254v254m88-254v254" stroke="var(--chart-2)" strokeWidth="3" opacity=".7"/>
      <rect x="184" y="12" width="148" height="54" fill="var(--destructive)" fillOpacity=".12" stroke="var(--destructive)" strokeWidth="3"/>
      <text x="197" y="45" fill="var(--destructive)" fontSize="16" fontFamily="monospace">LOCKED / ALARM</text>
      <path d="M201 91h101m-101 18h76m-76 18h94" stroke="var(--muted-foreground)" strokeWidth="4"/>
      <circle cx="289" cy="173" r="26" fill="var(--background)" stroke="var(--destructive)" strokeWidth="5"/>
      <path d="M289 157v19m0 9v3" stroke="var(--destructive)" strokeWidth="5"/>
    </g>
    <g transform="translate(770 123)">
      <circle cx="94" cy="108" r="88" fill="var(--muted)" stroke="var(--primary)" strokeWidth="8"/>
      <circle cx="94" cy="108" r="58" fill="var(--background)" stroke="var(--border)" strokeWidth="6"/>
      <circle cx="94" cy="108" r="15" fill="var(--chart-2)"/>
      <path d="M94 22v172m-86-86h172M34 48l120 120m0-120L34 168" stroke="var(--border)" strokeWidth="5"/>
      <text x="36" y="220" fill="var(--primary)" fontSize="14" fontFamily="monospace">VAULT / SEALED</text>
    </g>
    <g transform="translate(386 444)">
      <rect width="240" height="96" rx="6" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
      <text x="17" y="27" fill="var(--primary)" fontSize="13" fontFamily="monospace">SYSTEMS / EXIT PANEL</text>
      <rect x="18" y="42" width="92" height="34" fill="var(--destructive)" fillOpacity=".16" stroke="var(--destructive)" strokeWidth="2"/>
      <text x="29" y="64" fill="var(--destructive)" fontSize="12" fontFamily="monospace">DISABLED</text>
      <path d="M134 50h85m-85 12h64" stroke="var(--muted-foreground)" strokeWidth="4"/>
    </g>
    <text x="500" y="596" textAnchor="middle" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">SIMULATED BANK · TRANSACTION FLOOR</text>
  </Frame>;
}

export function MarketBackdrop(props) {
  return <Frame scene="maze-market" label="Sàn giao dịch với biểu đồ nến, bảng xếp hạng tín dụng và bảng giá chạy" {...props}>
    <Screen x={44} y={82} width={554} height={300} title="LIVE MARKET / CREDIT LEDGER">
      <path d="M70 330V145h498M74 287l46-26 37 10 36-62 39 32 38-51 45 16 47-85 44 52 39-24 47 16 38-58" fill="none" stroke="var(--chart-2)" strokeWidth="4"/>
      {Array.from({ length: 16 }, (_, i) => {
        const x = 88 + i * 28;
        const h = 25 + ((i * 17) % 68);
        return <g key={i} stroke={i % 3 ? 'var(--primary)' : 'var(--destructive)'} strokeWidth="3">
          <path d={`M${x} ${195 + (i % 4) * 20}v${h + 18}`}/>
          <rect x={x - 6} y={210 + (i % 5) * 15} width="12" height={h} fill={i % 3 ? 'var(--primary)' : 'var(--destructive)'}/>
        </g>;
      })}
      <text x="75" y="366" fill="var(--muted-foreground)" fontSize="12" fontFamily="monospace">00:00 · 06:00 · 12:00 · SOURCE HASH: —</text>
    </Screen>
    <Screen x={633} y={82} width={320} height={300} title="CREDIT LEADERBOARD">
      {['01  KHOA     980', '02  LINH     740', '03  DUC      520', '04  YEN       0', '05  ???       —'].map((row, i) => <g key={row}>
        <text x="657" y={150 + i * 40} fill={i === 4 ? 'var(--destructive)' : 'var(--foreground)'} fontSize="16" fontFamily="monospace">{row}</text>
        <path d={`M656 ${162 + i * 40}h270`} stroke="var(--border)" strokeWidth="1"/>
      </g>)}
    </Screen>
    <rect x="0" y="429" width="1000" height="52" fill="var(--background)" stroke="var(--primary)" strokeWidth="3"/>
    <text x="30" y="462" fill="var(--primary)" fontSize="17" fontFamily="monospace">ASTER REF: 0xA7-••• · CREDIT TRANSFER: SOURCE MISMATCH · VERIFIED WITHDRAWABLE BALANCE: 0</text>
    <g transform="translate(120 503)">
      <path d="M0 63h760v18H0Zm36 18v55m688-55v55" fill="var(--muted)" stroke="var(--border)" strokeWidth="5"/>
      <rect x="276" y="0" width="208" height="58" rx="8" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
      <path d="M294 18h170m-170 15h112m-112 14h148" stroke="var(--primary)" strokeWidth="3"/>
    </g>
  </Frame>;
}

export function ResidenceBackdrop(props) {
  return <Frame scene="maze-residence" label="Hành lang căn hộ mô phỏng với cửa an ninh và bàn thiết bị âm thanh" {...props}>
    <path d="M0 94h1000v335H0Z" fill="var(--card)" stroke="var(--border)" strokeWidth="4"/>
    <path d="M0 94 212 169v260M1000 94 790 169v260" fill="none" stroke="var(--chart-2)" strokeWidth="5"/>
    {[
      [66, 145, 'A-01'], [257, 170, 'A-02'], [681, 170, 'A-03'], [858, 145, 'A-04']
    ].map(([x, y, label]) => <g key={label} transform={`translate(${x} ${y})`}>
      <rect width="115" height="235" rx="5" fill="var(--muted)" stroke="var(--border)" strokeWidth="5"/>
      <rect x="16" y="30" width="83" height="150" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="3"/>
      <text x="25" y="22" fill="var(--primary)" fontSize="13" fontFamily="monospace">{label}</text>
      <circle cx="85" cy="201" r="5" fill="var(--warning)"/>
      <path d="M25 73h64m-64 12h46m-46 12h60" stroke="var(--border)" strokeWidth="3"/>
    </g>)}
    <g transform="translate(435 165)">
      <rect width="130" height="242" fill="var(--background)" stroke="var(--destructive)" strokeWidth="5"/>
      <rect x="14" y="24" width="102" height="34" fill="var(--destructive)" fillOpacity=".13"/>
      <text x="22" y="46" fill="var(--destructive)" fontSize="12" fontFamily="monospace">SECURE / LOCK</text>
      <path d="M23 87h84v92H23Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="3"/>
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={37 + (i % 3) * 24} cy={102 + Math.floor(i / 3) * 22} r="5" fill={i === 4 ? 'var(--destructive)' : 'var(--chart-2)'}/>)}
      <circle cx="103" cy="213" r="7" fill="var(--primary)"/>
    </g>
    <g transform="translate(335 462)">
      <path d="M0 105h340v18H0Zm18 18v48m304-48v48" fill="var(--muted)" stroke="var(--border)" strokeWidth="5"/>
      <rect x="100" y="-5" width="146" height="92" rx="8" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
      <path d="M118 18q18-18 36 0v28q-18 18-36 0Zm74-6v45m-20-23h40m-89 24h109" fill="none" stroke="var(--primary)" strokeWidth="4"/>
      <path d="M55 84V37h30v47M260 84V44h31v40" fill="var(--secondary)" stroke="var(--border)" strokeWidth="3"/>
      <circle cx="70" cy="28" r="10" fill="var(--warning)"/>
    </g>
    <text x="500" y="620" textAnchor="middle" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">RESIDENCE BLOCK / ROOM AUDIO ARCHIVE</text>
  </Frame>;
}

export function OfficeBackdrop(props) {
  return <Frame scene="maze-office" label="Văn phòng tuyển dụng với bảng việc nhẹ lương cao, bàn máy và dashboard công khai" {...props}>
    <Screen x={56} y={75} width={396} height={226} title="RECRUITMENT / OPEN ROLES">
      <text x="78" y="145" fill="var(--primary)" fontSize="26" fontWeight="700" fontFamily="monospace">VIỆC NHẸ</text>
      <text x="78" y="183" fill="var(--warning)" fontSize="26" fontWeight="700" fontFamily="monospace">LƯƠNG CAO</text>
      <path d="M80 209h328m-328 18h210m-210 18h277" stroke="var(--muted-foreground)" strokeWidth="4"/>
      <text x="80" y="283" fill="var(--destructive)" fontSize="13" fontFamily="monospace">UPLOAD ANONYMIZED DATA TO GET PAID</text>
    </Screen>
    <Screen x={502} y={75} width={440} height={226} title="PUBLIC DASHBOARD / PEOPLE FILES">
      {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${521 + (i % 3) * 130} ${131 + Math.floor(i / 3) * 65})`}>
        <rect width="110" height="54" fill="var(--secondary)" stroke="var(--border)" strokeWidth="2"/>
        <circle cx="18" cy="17" r="8" fill="var(--chart-2)"/>
        <path d="M36 15h62M10 36h86" stroke="var(--muted-foreground)" strokeWidth="3"/>
      </g>)}
      <text x="521" y="270" fill="var(--destructive)" fontSize="12" fontFamily="monospace">DATA SOURCES: 06 / LAST SEEN: MULTIPLE DATES</text>
    </Screen>
    <g transform="translate(96 369)">
      {[0, 1, 2].map(i => <g key={i} transform={`translate(${i * 286} 0)`}>
        <path d="M0 92h235v14H0Zm18 14v105m199-105v105" fill="var(--muted)" stroke="var(--border)" strokeWidth="5"/>
        <rect x="38" y="14" width="161" height="79" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
        <path d="M53 31h131m-131 15h92m-92 15h118m-118 15h58" stroke="var(--primary)" strokeWidth="3"/>
        <circle cx="190" cy="77" r="5" fill="var(--warning)"/>
      </g>)}
    </g>
    <text x="500" y="620" textAnchor="middle" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">OPEN OFFICE · EXPORT TERMINAL / ASTER</text>
  </Frame>;
}

export function ArchiveBackdrop(props) {
  return <Frame scene="maze-archive" label="Kho lưu trữ với dãy máy chủ, buồng cách ly và thiết bị quản trị" {...props}>
    {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${34 + i * 124} ${94 + (i % 2) * 22})`}>
      <rect width="106" height="410" rx="5" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="4"/>
      <text x="12" y="27" fill="var(--primary)" fontSize="12" fontFamily="monospace">RACK / 0{i + 1}</text>
      {Array.from({ length: 6 }, (_, j) => <g key={j} transform={`translate(11 ${48 + j * 55})`}>
        <rect width="84" height="43" rx="3" fill="var(--muted)" stroke="var(--border)" strokeWidth="2"/>
        <path d="M10 13h50m-50 9h37" stroke="var(--muted-foreground)" strokeWidth="3"/>
        <circle cx="73" cy="29" r="4" fill={(i + j) % 4 ? 'var(--chart-2)' : 'var(--destructive)'}/>
      </g>)}
    </g>)}
    <g transform="translate(139 467)">
      {[0, 1, 2, 3].map(i => <g key={i} transform={`translate(${i * 191} 0)`}>
        <rect width="160" height="104" rx="42" fill="var(--secondary)" fillOpacity=".6" stroke="var(--primary)" strokeWidth="4"/>
        <circle cx="80" cy="52" r="23" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="3"/>
        <path d="M63 81q17-24 34 0" fill="none" stroke="var(--chart-2)" strokeWidth="4"/>
        <text x="80" y="124" textAnchor="middle" fill="var(--muted-foreground)" fontSize="11" fontFamily="monospace">ISOLATION POD</text>
      </g>)}
    </g>
    <g transform="translate(800 57)">
      <rect width="160" height="100" rx="7" fill="var(--background)" stroke="var(--destructive)" strokeWidth="4"/>
      <text x="14" y="25" fill="var(--destructive)" fontSize="13" fontFamily="monospace">ADMIN / VK-01</text>
      <path d="M18 45h124m-124 14h93m-93 14h111" stroke="var(--muted-foreground)" strokeWidth="3"/>
      <circle cx="141" cy="82" r="5" fill="var(--warning)"/>
    </g>
    <text x="500" y="622" textAnchor="middle" fill="var(--primary)" fontSize="16" fontFamily="monospace">ARCHIVE / ISOLATED IDENTITIES / SOURCE LOGS LOCKED</text>
  </Frame>;
}

export function HubBackdrop(props) {
  return <Frame scene="maze-hub" label="Quảng trường trung tâm với sáu hồ sơ vụ án và vòng bục tranh luận" {...props}>
    <g transform="translate(213 62)">
      <rect width="574" height="254" rx="8" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="6"/>
      <text x="25" y="35" fill="var(--primary)" fontSize="17" fontFamily="monospace">SIX INCIDENTS / SHARED ASTER ARCHIVE</text>
      {Array.from({ length: 6 }, (_, i) => {
        const x = 28 + (i % 3) * 172;
        const y = 57 + Math.floor(i / 3) * 89;
        return <g key={i} transform={`translate(${x} ${y})`}>
          <rect width="154" height="76" fill="var(--secondary)" stroke="var(--border)" strokeWidth="3"/>
          <text x="12" y="24" fill="var(--primary)" fontSize="14" fontFamily="monospace">CASE / 0{i + 1}</text>
          <path d="M12 39h130m-130 11h92m-92 11h111" stroke="var(--muted-foreground)" strokeWidth="3"/>
        </g>;
      })}
    </g>
    <ellipse cx="500" cy="495" rx="365" ry="93" fill="var(--background)" fillOpacity=".82" stroke="var(--chart-2)" strokeWidth="5"/>
    <ellipse cx="500" cy="495" rx="270" ry="58" fill="var(--muted)" stroke="var(--border)" strokeWidth="4"/>
    <path d="M460 439h80v78h-80Z" fill="var(--secondary)" stroke="var(--primary)" strokeWidth="4"/>
    <path d="M487 420v-34h26v34" fill="var(--primary)"/>
    {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${175 + i * 130} ${479 + (i % 2) * 31})`}>
      <circle r="11" fill="var(--chart-2)"/><path d="M0 11v25" stroke="var(--primary)" strokeWidth="4"/>
    </g>)}
    <text x="500" y="614" textAnchor="middle" fill="var(--muted-foreground)" fontSize="15" fontFamily="monospace">MAZE HUB · PUBLIC HEARING RING</text>
  </Frame>;
}

export function CourtBackdrop(props) {
  return <Frame scene="court" label="Phòng tranh luận hình tròn với mười bục và màn hình Cyber-M trung tâm" {...props}>
    <ellipse cx="500" cy="341" rx="435" ry="254" fill="var(--background)" fillOpacity=".38" stroke="var(--chart-2)" strokeWidth="5"/>
    <ellipse cx="500" cy="341" rx="337" ry="196" fill="var(--secondary)" fillOpacity=".45" stroke="var(--border)" strokeWidth="4"/>
    <ellipse cx="500" cy="422" rx="300" ry="100" fill="var(--background)" stroke="var(--primary)" strokeWidth="4"/>
    <ellipse cx="500" cy="422" rx="224" ry="59" fill="var(--muted)" stroke="var(--chart-2)" strokeWidth="4"/>
    <g transform="translate(389 137)">
      <rect width="222" height="153" rx="12" fill="var(--background)" stroke="var(--chart-2)" strokeWidth="6"/>
      <text x="20" y="29" fill="var(--primary)" fontSize="15" fontFamily="monospace">CYBER-M / COURT</text>
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={38 + (i % 4) * 37} y={47 + Math.floor(i / 4) * 27} width="25" height="19" fill={i % 3 ? 'var(--muted)' : 'var(--chart-2)'} opacity=".85"/>)}
      <path d="M72 138h78" stroke="var(--primary)" strokeWidth="4"/>
    </g>
    {Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
      const x = 500 + Math.cos(angle) * 380;
      const y = 342 + Math.sin(angle) * 197;
      return <g key={i} transform={`translate(${x - 37} ${y - 24})`}>
        <path d="M4 16 14 0h48l10 16v31H4Z" fill={i === 0 ? 'var(--secondary)' : 'var(--background)'} stroke={i === 0 ? 'var(--primary)' : 'var(--border)'} strokeWidth="3"/>
        <circle cx="37" cy="17" r="7" fill="var(--chart-2)"/>
        <path d="M21 33h32" stroke="var(--muted-foreground)" strokeWidth="3"/>
        <text x="37" y="60" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="monospace">S-{String(i + 1).padStart(2, '0')}</text>
      </g>;
    })}
    <path d="M0 92h116v21H0m884-21h116v21H884M0 145h52v20H0m948-20h52v20h-52" fill="var(--primary)" opacity=".35"/>
    <text x="500" y="614" textAnchor="middle" fill="var(--primary)" fontSize="16" fontFamily="monospace">PHIÊN TÒA TRANH LUẬN / TEN WITNESS STANDS</text>
  </Frame>;
}

export const BACKDROPS = {
  'white-room': WhiteRoomBackdrop,
  'maze-dorm': DormBackdrop,
  'maze-school': SchoolBackdrop,
  'maze-bank': BankBackdrop,
  'maze-market': MarketBackdrop,
  'maze-residence': ResidenceBackdrop,
  'maze-office': OfficeBackdrop,
  'maze-archive': ArchiveBackdrop,
  'maze-hub': HubBackdrop,
  court: CourtBackdrop
};
