// Cartoon-style SVG avatar illustrations for each character skin
// These are original cartoon interpretations, not reproductions of copyrighted artwork

const S = 120; // standard viewBox size

// ─── FREE CHARACTERS ──────────────────────────────────────────────────────────

export function ScoobyAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      <circle cx="60" cy="65" r="40" fill="#8B6914"/>
      {/* floppy ears */}
      <ellipse cx="28" cy="52" rx="14" ry="22" fill="#7A5C10" transform="rotate(-15 28 52)"/>
      <ellipse cx="92" cy="52" rx="14" ry="22" fill="#7A5C10" transform="rotate(15 92 52)"/>
      <ellipse cx="28" cy="52" rx="9"  ry="17" fill="#A07820" transform="rotate(-15 28 52)"/>
      <ellipse cx="92" cy="52" rx="9"  ry="17" fill="#A07820" transform="rotate(15 92 52)"/>
      {/* snout */}
      <ellipse cx="60" cy="76" rx="18" ry="14" fill="#C8A030"/>
      <ellipse cx="60" cy="68" rx="10" ry="6"  fill="#1a1a1a"/>
      {/* eyes */}
      <circle cx="46" cy="57" r="9" fill="white"/><circle cx="74" cy="57" r="9" fill="white"/>
      <circle cx="48" cy="57" r="5" fill="#3B2800"/><circle cx="76" cy="57" r="5" fill="#3B2800"/>
      <circle cx="49" cy="55" r="2" fill="white"/><circle cx="77" cy="55" r="2" fill="white"/>
      {/* SD collar tag */}
      <rect x="46" y="96" width="28" height="8" rx="4" fill="#22C55E"/>
      <text x="60" y="103" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">SD</text>
    </svg>
  );
}

export function SpongeSkinAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* square sponge body/face */}
      <rect x="22" y="20" width="76" height="88" rx="8" fill="#FFD700"/>
      {/* pores */}
      {[35,50,65,80,35,55,72,42,68,55].map((x,i)=>(
        <circle key={i} cx={x} cy={30+Math.floor(i/2)*18} r="3" fill="#E6C200" opacity="0.7"/>
      ))}
      {/* eyes */}
      <circle cx="44" cy="55" r="13" fill="white"/><circle cx="76" cy="55" r="13" fill="white"/>
      <circle cx="44" cy="55" r="9"  fill="#87CEEB"/><circle cx="76" cy="55" r="9"  fill="#87CEEB"/>
      <circle cx="44" cy="55" r="5"  fill="#1a1a1a"/><circle cx="76" cy="55" r="5"  fill="#1a1a1a"/>
      <circle cx="45" cy="53" r="2"  fill="white"/><circle cx="77" cy="53" r="2"  fill="white"/>
      {/* buck teeth */}
      <rect x="50" y="76" width="9"  height="14" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="61" y="76" width="9"  height="14" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      {/* mouth */}
      <path d="M40 74 Q60 90 80 74" stroke="#8B6914" strokeWidth="2.5" fill="none"/>
      {/* pants/tie */}
      <rect x="35" y="96" width="50" height="10" rx="0" fill="#8B4513"/>
      <rect x="53" y="82" width="14" height="18" rx="2" fill="#CC0000"/>
    </svg>
  );
}

export function ToonMouseAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* ears */}
      <circle cx="36" cy="30" r="20" fill="#2C2C2C"/>
      <circle cx="84" cy="30" r="20" fill="#2C2C2C"/>
      <circle cx="36" cy="30" r="14" fill="#FF9999"/>
      <circle cx="84" cy="30" r="14" fill="#FF9999"/>
      {/* head */}
      <circle cx="60" cy="72" r="38" fill="#2C2C2C"/>
      {/* face */}
      <circle cx="60" cy="72" r="30" fill="#C8A080"/>
      {/* eyes */}
      <ellipse cx="46" cy="64" rx="8" ry="10" fill="white"/>
      <ellipse cx="74" cy="64" rx="8" ry="10" fill="white"/>
      <circle cx="47" cy="65" r="5" fill="#1a1a1a"/>
      <circle cx="75" cy="65" r="5" fill="#1a1a1a"/>
      <circle cx="48" cy="63" r="2" fill="white"/>
      <circle cx="76" cy="63" r="2" fill="white"/>
      {/* nose */}
      <ellipse cx="60" cy="78" rx="5" ry="3.5" fill="#FF6B8A"/>
      {/* smile */}
      <path d="M46 86 Q60 96 74 86" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <circle cx="36" cy="80" r="7" fill="#FF9999" opacity="0.5"/>
      <circle cx="84" cy="80" r="7" fill="#FF9999" opacity="0.5"/>
    </svg>
  );
}

export function MagicPrincessAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* hair */}
      <ellipse cx="60" cy="42" rx="38" ry="35" fill="#FFD700"/>
      <path d="M22 50 Q14 80 18 100 Q24 78 30 70Z" fill="#FFD700"/>
      <path d="M98 50 Q106 80 102 100 Q96 78 90 70Z" fill="#FFD700"/>
      {/* face */}
      <ellipse cx="60" cy="68" rx="30" ry="34" fill="#FDDCB0"/>
      {/* crown/tiara */}
      <path d="M34 38 L38 24 L46 34 L54 18 L60 30 L66 18 L74 34 L82 24 L86 38Z"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
      {[38,54,60,66,82].map((x,i)=>(
        <circle key={i} cx={x} cy={i%2===0?24:18} r="3" fill="#FF69B4"/>
      ))}
      {/* eyes — big animated eyes */}
      <ellipse cx="46" cy="64" rx="10" ry="12" fill="white"/>
      <ellipse cx="74" cy="64" rx="10" ry="12" fill="white"/>
      <ellipse cx="46" cy="66" rx="7"  ry="9"  fill="#6A0DAD"/>
      <ellipse cx="74" cy="66" rx="7"  ry="9"  fill="#6A0DAD"/>
      <circle cx="46" cy="66" r="4" fill="#1a1a1a"/>
      <circle cx="74" cy="66" r="4" fill="#1a1a1a"/>
      <circle cx="47" cy="63" r="2.5" fill="white"/>
      <circle cx="75" cy="63" r="2.5" fill="white"/>
      {/* smile */}
      <path d="M48 84 Q60 94 72 84" stroke="#CC4466" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="36" cy="76" r="6" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="84" cy="76" r="6" fill="#FFB6C1" opacity="0.6"/>
    </svg>
  );
}

export function SpaceBotAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* antenna */}
      <line x1="60" y1="14" x2="60" y2="30" stroke="#94A3B8" strokeWidth="3"/>
      <circle cx="60" cy="12" r="5" fill="#22D3EE"/>
      {/* head */}
      <rect x="24" y="30" width="72" height="62" rx="10" fill="#475569"/>
      {/* visor */}
      <rect x="30" y="38" width="60" height="30" rx="6" fill="#0EA5E9" opacity="0.85"/>
      {/* eyes inside visor */}
      <circle cx="46" cy="53" r="8" fill="#FCD34D"/><circle cx="74" cy="53" r="8" fill="#FCD34D"/>
      <circle cx="46" cy="53" r="4" fill="#1a1a1a"/><circle cx="74" cy="53" r="4" fill="#1a1a1a"/>
      <circle cx="47" cy="51" r="2" fill="white"/><circle cx="75" cy="51" r="2" fill="white"/>
      {/* mouth panel */}
      <rect x="34" y="76" width="52" height="10" rx="4" fill="#334155"/>
      {[38,46,54,62,70,78].map((x,i)=>(
        <rect key={i} x={x} y="78" width="4" height="6" rx="1" fill={i%2===0?"#22D3EE":"#A78BFA"}/>
      ))}
      {/* ear bolts */}
      <circle cx="24" cy="56" r="5" fill="#64748B"/><circle cx="96" cy="56" r="5" fill="#64748B"/>
    </svg>
  );
}

export function JungleKingAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* mane */}
      <circle cx="60" cy="62" r="44" fill="#92400E"/>
      {/* face */}
      <circle cx="60" cy="62" r="32" fill="#FCD34D"/>
      {/* ears */}
      <circle cx="32" cy="28" r="12" fill="#FCD34D"/>
      <circle cx="88" cy="28" r="12" fill="#FCD34D"/>
      <circle cx="32" cy="28" r="6"  fill="#F87171"/>
      <circle cx="88" cy="28" r="6"  fill="#F87171"/>
      {/* eyes */}
      <circle cx="47" cy="55" r="10" fill="#FFFBEB"/><circle cx="73" cy="55" r="10" fill="#FFFBEB"/>
      <circle cx="47" cy="56" r="6"  fill="#92400E"/><circle cx="73" cy="56" r="6"  fill="#92400E"/>
      <circle cx="47" cy="55" r="3"  fill="#1a1a1a"/><circle cx="73" cy="55" r="3"  fill="#1a1a1a"/>
      <circle cx="48" cy="53" r="1.5" fill="white"/><circle cx="74" cy="53" r="1.5" fill="white"/>
      {/* snout */}
      <ellipse cx="60" cy="72" rx="14" ry="10" fill="#F97316" opacity="0.8"/>
      <ellipse cx="60" cy="66" rx="7"  ry="5"  fill="#1a1a1a"/>
      {/* whiskers */}
      {[-22,-10,2,10,22].map((x,i)=>(
        <line key={i} x1={60+x} y1={70} x2={60+x+(i<2?-8:i>2?8:0)} y2={68} stroke="#92400E" strokeWidth="1"/>
      ))}
    </svg>
  );
}

// ─── PAID ANIME CHARACTERS ────────────────────────────────────────────────────

export function NarutoAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* spiky blonde hair */}
      {[-20,-12,-4,4,12,20].map((x,i)=>(
        <path key={i} d={`M${60+x},46 Q${60+x+(i%2===0?-8:8)},${22+i*3} ${60+x+(i%2===0?-4:4)},12`}
          fill="#FFD700" stroke="#E6B800" strokeWidth="0.5"/>
      ))}
      <ellipse cx="60" cy="42" rx="32" ry="18" fill="#FFD700"/>
      {/* face */}
      <ellipse cx="60" cy="70" rx="28" ry="32" fill="#FFD5A0"/>
      {/* headband */}
      <rect x="28" y="42" width="64" height="12" rx="3" fill="#1a6688"/>
      <rect x="42" y="43" width="36" height="10" rx="2" fill="#C0C0C0"/>
      <text x="60" y="51" textAnchor="middle" fontSize="8" fill="#4a4a4a" fontWeight="bold">葉</text>
      {/* whisker marks — 3 each side */}
      {[-1,0,1].map((i)=><line key={`l${i}`} x1="33" y1={68+i*7} x2="49" y2={70+i*5} stroke="#CC8844" strokeWidth="1.5" strokeLinecap="round"/>)}
      {[-1,0,1].map((i)=><line key={`r${i}`} x1="87" y1={68+i*7} x2="71" y2={70+i*5} stroke="#CC8844" strokeWidth="1.5" strokeLinecap="round"/>)}
      {/* eyes */}
      <circle cx="47" cy="64" r="8" fill="white"/><circle cx="73" cy="64" r="8" fill="white"/>
      <circle cx="47" cy="65" r="5" fill="#1B6EBF"/><circle cx="73" cy="65" r="5" fill="#1B6EBF"/>
      <circle cx="47" cy="64" r="3" fill="#1a1a1a"/><circle cx="73" cy="64" r="3" fill="#1a1a1a"/>
      <circle cx="48" cy="62" r="1.5" fill="white"/><circle cx="74" cy="62" r="1.5" fill="white"/>
      {/* grin */}
      <path d="M46 82 Q60 94 74 82" stroke="#CC6633" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* orange outfit hint */}
      <path d="M32 102 Q60 95 88 102" fill="#FF8C00" opacity="0.8"/>
    </svg>
  );
}

export function PikachuAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* ears — black-tipped pointed */}
      <path d="M34 48 L26 12 L46 36Z" fill="#FFD700" stroke="#E6B800" strokeWidth="1"/>
      <path d="M86 48 L94 12 L74 36Z" fill="#FFD700" stroke="#E6B800" strokeWidth="1"/>
      <path d="M35 44 L29 20 L43 36Z" fill="#1a1a1a"/>
      <path d="M85 44 L91 20 L77 36Z" fill="#1a1a1a"/>
      {/* round yellow body/face */}
      <circle cx="60" cy="72" r="42" fill="#FFD700"/>
      <circle cx="60" cy="72" r="38" fill="#FFE44D"/>
      {/* red cheeks — signature! */}
      <circle cx="34" cy="82" r="11" fill="#FF4444" opacity="0.85"/>
      <circle cx="86" cy="82" r="11" fill="#FF4444" opacity="0.85"/>
      {/* big eyes */}
      <circle cx="46" cy="66" r="11" fill="#1a1a1a"/>
      <circle cx="74" cy="66" r="11" fill="#1a1a1a"/>
      <circle cx="46" cy="66" r="8" fill="#2a2a2a"/>
      <circle cx="74" cy="66" r="8" fill="#2a2a2a"/>
      <circle cx="44" cy="63" r="4" fill="white"/>
      <circle cx="72" cy="63" r="4" fill="white"/>
      <circle cx="43" cy="62" r="2" fill="white" opacity="0.7"/>
      {/* cute nose */}
      <ellipse cx="60" cy="78" rx="4" ry="3" fill="#CC4400"/>
      {/* smile */}
      <path d="M48 86 Q60 96 72 86" stroke="#CC4400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* lightning tail hint at bottom */}
      <path d="M50 112 L60 100 L70 112 L80 98" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

export function LuffyAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* straw hat */}
      <ellipse cx="60" cy="36" rx="50" ry="14" fill="#E8C84A" stroke="#B8980A" strokeWidth="2"/>
      <ellipse cx="60" cy="32" rx="32" ry="20" fill="#E8C84A" stroke="#B8980A" strokeWidth="1.5"/>
      {/* hat band */}
      <path d="M28 36 Q60 44 92 36" stroke="#CC0000" strokeWidth="4" fill="none"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="30" fill="#FDDCB0"/>
      {/* scar under left eye */}
      <path d="M44 72 L50 78" stroke="#CC3333" strokeWidth="2.5" strokeLinecap="round"/>
      {/* eyes — determined squint */}
      <ellipse cx="47" cy="66" rx="8" ry="9" fill="white"/>
      <ellipse cx="73" cy="66" rx="8" ry="9" fill="white"/>
      <circle cx="47" cy="67" r="5" fill="#1a1a1a"/><circle cx="73" cy="67" r="5" fill="#1a1a1a"/>
      <circle cx="46" cy="64" r="2" fill="white"/><circle cx="72" cy="64" r="2" fill="white"/>
      {/* big grin */}
      <path d="M40 82 Q60 100 80 82" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* teeth */}
      <path d="M48 83 Q60 96 72 83 L72 88 Q60 100 48 88Z" fill="white" opacity="0.85"/>
      {/* black hair */}
      <path d="M32 52 Q30 42 36 38 Q46 30 60 32 Q74 30 84 38 Q90 42 88 52" fill="#1a1a1a"/>
      {/* red vest */}
      <path d="M32 100 Q60 92 88 100" fill="#CC0000"/>
    </svg>
  );
}

export function GokuAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* wild spiked black hair */}
      {[[-22,10],[-14,-2],[-6,-10],[2,-14],[10,-10],[18,-2],[24,8]].map(([x,y],i)=>(
        <path key={i} d={`M${50+i*3},44 Q${44+i*4+x},${30+y} ${46+i*3+x},${18+y}`}
          fill="#1a1a1a" stroke="#111" strokeWidth="0.5"/>
      ))}
      <ellipse cx="60" cy="38" rx="30" ry="16" fill="#1a1a1a"/>
      {/* face */}
      <ellipse cx="60" cy="70" rx="28" ry="32" fill="#FDDCB0"/>
      {/* eyes — intense */}
      <circle cx="46" cy="63" r="8" fill="white"/><circle cx="74" cy="63" r="8" fill="white"/>
      <circle cx="47" cy="64" r="5" fill="#1a1a1a"/><circle cx="75" cy="64" r="5" fill="#1a1a1a"/>
      <circle cx="46" cy="62" r="2" fill="white"/><circle cx="74" cy="62" r="2" fill="white"/>
      {/* scar on cheek */}
      <line x1="74" y1="72" x2="80" y2="78" stroke="#CC8844" strokeWidth="1.5"/>
      {/* determined mouth */}
      <path d="M47 80 Q60 88 73 80" stroke="#AA5533" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* orange gi collar */}
      <path d="M32 100 Q60 92 88 100" fill="#FF8C00"/>
      <path d="M52 92 L60 100 L68 92" fill="#1B4FCC"/>
      {/* eyebrows — stern */}
      <path d="M38 56 Q47 52 54 56" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M66 56 Q73 52 82 56" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function TanjiroAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* checkered haori */}
      <rect x="0" y="90" width="120" height="30" fill="none"/>
      {/* hair — dark burgundy */}
      <ellipse cx="60" cy="44" rx="30" ry="22" fill="#2D1B1B"/>
      <path d="M30 50 Q22 66 26 82 Q32 60 38 54Z" fill="#2D1B1B"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#FDDCB0"/>
      {/* scar on forehead */}
      <path d="M48 46 Q58 40 68 46 Q64 50 56 50Z" fill="#CC3333" opacity="0.8"/>
      {/* hanafuda earrings */}
      <ellipse cx="28" cy="72" rx="5" ry="8" fill="#FF6B6B" stroke="white" strokeWidth="1"/>
      <ellipse cx="92" cy="72" rx="5" ry="8" fill="#FF6B6B" stroke="white" strokeWidth="1"/>
      {/* eyes — kind */}
      <ellipse cx="46" cy="64" rx="9" ry="10" fill="white"/>
      <ellipse cx="74" cy="64" rx="9" ry="10" fill="white"/>
      <ellipse cx="46" cy="65" rx="6" ry="7" fill="#6B2D2D"/>
      <ellipse cx="74" cy="65" rx="6" ry="7" fill="#6B2D2D"/>
      <circle cx="46" cy="64" r="3" fill="#1a1a1a"/><circle cx="74" cy="64" r="3" fill="#1a1a1a"/>
      <circle cx="45" cy="62" r="1.5" fill="white"/><circle cx="73" cy="62" r="1.5" fill="white"/>
      {/* gentle smile */}
      <path d="M48 82 Q60 90 72 82" stroke="#AA5533" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* green haori collar */}
      <path d="M32 100 Q60 93 88 100" fill="#1B6622"/>
    </svg>
  );
}

export function DekuAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* messy green hair */}
      {[[-18,4],[-10,-4],[-2,-8],[6,-6],[14,-2],[20,6]].map(([x,y],i)=>(
        <ellipse key={i} cx={36+i*9+x} cy={38+y} rx="8" ry="12" fill="#2D7A2D" transform={`rotate(${-20+i*8} ${36+i*9+x} ${38+y})`}/>
      ))}
      <ellipse cx="60" cy="42" rx="28" ry="14" fill="#2D7A2D"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="27" ry="30" fill="#FDDCB0"/>
      {/* freckles */}
      {[[-12,0],[12,0],[-14,6],[14,6]].map(([x,y],i)=>(
        <circle key={i} cx={60+x} cy={78+y} r="2.5" fill="#CC9966" opacity="0.65"/>
      ))}
      {/* eyes — large hopeful */}
      <ellipse cx="46" cy="64" rx="9" ry="11" fill="white"/>
      <ellipse cx="74" cy="64" rx="9" ry="11" fill="white"/>
      <ellipse cx="46" cy="65" rx="6" ry="8" fill="#1B5E1B"/>
      <ellipse cx="74" cy="65" rx="6" ry="8" fill="#1B5E1B"/>
      <circle cx="46" cy="65" r="3" fill="#1a1a1a"/><circle cx="74" cy="65" r="3" fill="#1a1a1a"/>
      <circle cx="45" cy="62" r="2" fill="white"/><circle cx="73" cy="62" r="2" fill="white"/>
      {/* determined smile */}
      <path d="M47 83 Q60 93 73 83" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* hero suit collar — green */}
      <path d="M33 100 Q60 93 87 100" fill="#1B5E1B"/>
      <circle cx="60" cy="93" r="4" fill="#FFD700"/>
    </svg>
  );
}

export function SasukeAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* dark spiky hair */}
      {[[-16,6],[-8,-4],[0,-10],[8,-6],[16,4]].map(([x,y],i)=>(
        <path key={i} d={`M${44+i*8},44 Q${44+i*8+x},${28+y} ${46+i*7+x},${16+y}`} fill="#1a1a1a"/>
      ))}
      <ellipse cx="60" cy="40" rx="28" ry="16" fill="#1a1a1a"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#EDD5B0"/>
      {/* sharingan eyes — red with pattern */}
      <circle cx="46" cy="64" r="9" fill="white"/><circle cx="74" cy="64" r="9" fill="white"/>
      <circle cx="46" cy="65" r="6" fill="#CC0000"/><circle cx="74" cy="65" r="6" fill="#CC0000"/>
      <circle cx="46" cy="65" r="3" fill="#1a1a1a"/><circle cx="74" cy="65" r="3" fill="#1a1a1a"/>
      {[0,120,240].map((deg,i)=>{
        const r=deg*Math.PI/180;
        return <path key={i} d={`M${46+Math.sin(r)*3.5},${65-Math.cos(r)*3.5} Q${46+Math.sin(r)*5.5},${65-Math.cos(r)*5.5} ${46+Math.sin(r+0.5)*4},${65-Math.cos(r+0.5)*4}`}
          stroke="#880000" strokeWidth="1.2" fill="none"/>;
      })}
      {[0,120,240].map((deg,i)=>{
        const r=deg*Math.PI/180;
        return <path key={i} d={`M${74+Math.sin(r)*3.5},${65-Math.cos(r)*3.5} Q${74+Math.sin(r)*5.5},${65-Math.cos(r)*5.5} ${74+Math.sin(r+0.5)*4},${65-Math.cos(r+0.5)*4}`}
          stroke="#880000" strokeWidth="1.2" fill="none"/>;
      })}
      <circle cx="44" cy="62" r="2" fill="white"/><circle cx="72" cy="62" r="2" fill="white"/>
      {/* stern expression */}
      <path d="M48 82 Q60 86 72 82" stroke="#8B4513" strokeWidth="2" fill="none"/>
      {/* eyebrows — stern */}
      <path d="M38 56 Q47 52 54 57" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
      <path d="M66 57 Q73 52 82 56" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
      {/* blue outfit */}
      <path d="M34 100 Q60 93 86 100" fill="#1B4FCC"/>
    </svg>
  );
}

export function SailorMoonAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* twin tails — long blonde */}
      <ellipse cx="20" cy="70" rx="12" ry="36" fill="#FFD700" transform="rotate(-15 20 70)"/>
      <ellipse cx="100" cy="70" rx="12" ry="36" fill="#FFD700" transform="rotate(15 100 70)"/>
      {/* buns on top */}
      <circle cx="38" cy="30" r="16" fill="#FFD700" stroke="#E6B800" strokeWidth="1"/>
      <circle cx="82" cy="30" r="16" fill="#FFD700" stroke="#E6B800" strokeWidth="1"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="27" ry="32" fill="#FDDCB0"/>
      {/* crescent moon on forehead */}
      <path d="M60 42 Q56 36 62 32 Q58 38 64 40 Q60 36 60 42Z" fill="#FFD700"/>
      {/* big blue eyes */}
      <ellipse cx="44" cy="66" rx="11" ry="13" fill="white"/>
      <ellipse cx="76" cy="66" rx="11" ry="13" fill="white"/>
      <ellipse cx="44" cy="68" rx="8"  ry="10" fill="#1B6EBF"/>
      <ellipse cx="76" cy="68" rx="8"  ry="10" fill="#1B6EBF"/>
      <circle cx="44" cy="67" r="4" fill="#1a1a1a"/><circle cx="76" cy="67" r="4" fill="#1a1a1a"/>
      <circle cx="42" cy="64" r="2.5" fill="white"/><circle cx="74" cy="64" r="2.5" fill="white"/>
      {/* smile */}
      <path d="M47 86 Q60 96 73 86" stroke="#CC4466" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="34" cy="78" r="6" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="86" cy="78" r="6" fill="#FFB6C1" opacity="0.6"/>
      {/* sailor collar */}
      <path d="M33 100 Q60 93 87 100" fill="#1B4FCC"/>
      <path d="M52 93 L60 104 L68 93" fill="#1B4FCC"/>
      <line x1="44" y1="97" x2="76" y2="97" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

export function OnePunchAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* completely bald head */}
      <circle cx="60" cy="62" r="40" fill="#FDDCB0"/>
      {/* emotionless eyes */}
      <circle cx="45" cy="58" r="8" fill="white"/><circle cx="75" cy="58" r="8" fill="white"/>
      <circle cx="45" cy="58" r="5" fill="#1a1a1a"/><circle cx="75" cy="58" r="5" fill="#1a1a1a"/>
      <circle cx="44" cy="56" r="2" fill="white"/><circle cx="74" cy="56" r="2" fill="white"/>
      {/* flat mouth — bored expression */}
      <line x1="48" y1="76" x2="72" y2="76" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round"/>
      {/* yellow hero suit */}
      <path d="M20 100 Q60 90 100 100" fill="#FFD700"/>
      <path d="M44 90 L60 84 L76 90 L76 100 Q60 108 44 100Z" fill="#FFD700"/>
      {/* white cape hint */}
      <path d="M22 86 Q14 92 18 100 Q26 88 32 88Z" fill="white"/>
      <path d="M98 86 Q106 92 102 100 Q94 88 88 88Z" fill="white"/>
      {/* gloves */}
      <circle cx="24" cy="96" r="8" fill="white"/>
      <circle cx="96" cy="96" r="8" fill="white"/>
      {/* red boots */}
      <ellipse cx="44" cy="108" rx="12" ry="8" fill="#CC0000"/>
      <ellipse cx="76" cy="108" rx="12" ry="8" fill="#CC0000"/>
    </svg>
  );
}

export function ZoroAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* short green hair */}
      <ellipse cx="60" cy="44" rx="28" ry="16" fill="#2D8A2D"/>
      <path d="M32 48 Q28 56 32 64 Q36 52 40 48Z" fill="#2D8A2D"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="27" ry="30" fill="#FDDCB0"/>
      {/* scar over left eye */}
      <line x1="42" y1="58" x2="52" y2="72" stroke="#CC3333" strokeWidth="3" strokeLinecap="round"/>
      {/* eyes — one closed/scarred, one fierce */}
      <ellipse cx="46" cy="66" rx="7" ry="9" fill="white"/>
      <circle cx="46" cy="67" r="5" fill="#1a1a1a"/>
      <circle cx="45" cy="64" r="2" fill="white"/>
      {/* right eye — fierce */}
      <ellipse cx="74" cy="64" rx="8" ry="10" fill="white"/>
      <circle cx="74" cy="65" r="5" fill="#1a1a1a"/>
      <circle cx="73" cy="62" r="2" fill="white"/>
      {/* bandana around head */}
      <rect x="28" y="42" width="64" height="10" rx="3" fill="#1a1a1a"/>
      {/* serious mouth */}
      <path d="M48 84 L72 84" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round"/>
      {/* three swords hint */}
      <line x1="28" y1="88" x2="36" y2="108" stroke="#C0C0C0" strokeWidth="3"/>
      <line x1="36" y1="86" x2="44" y2="108" stroke="#C0C0C0" strokeWidth="3"/>
      {/* green outfit */}
      <path d="M34 100 Q60 93 86 100" fill="#1B6622"/>
    </svg>
  );
}

// ─── PAID ARTIST CARTOON AVATARS ─────────────────────────────────────────────

export function BiggieAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* crown */}
      <path d="M28 44 L34 28 L44 38 L54 22 L60 34 L66 22 L76 38 L86 28 L92 44Z"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
      {[34,54,60,66,86].map((x,i)=>(
        <circle key={i} cx={x} cy={i%2===0?28:22} r="4" fill="#FF1493"/>
      ))}
      {/* large round head */}
      <circle cx="60" cy="76" r="42" fill="#4A2C0A"/>
      {/* face */}
      <circle cx="60" cy="76" r="36" fill="#6B3A14"/>
      {/* eyes */}
      <circle cx="45" cy="70" r="9" fill="white"/><circle cx="75" cy="70" r="9" fill="white"/>
      <circle cx="46" cy="71" r="5" fill="#1a1a1a"/><circle cx="76" cy="71" r="5" fill="#1a1a1a"/>
      <circle cx="45" cy="68" r="2.5" fill="white"/><circle cx="75" cy="68" r="2.5" fill="white"/>
      {/* big smile */}
      <path d="M42 86 Q60 100 78 86" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* teeth */}
      <path d="M48 87 Q60 98 72 87 L72 93 Q60 100 48 93Z" fill="white" opacity="0.9"/>
      {/* gold chain */}
      {[36,44,52,60,68,76,84].map((x,i)=>(
        <circle key={i} cx={x} cy={108+Math.abs(i-3)*2} r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      ))}
      {/* plaid shirt collar */}
      <path d="M18 108 Q60 98 102 108" fill="#2D5A1B"/>
    </svg>
  );
}

export function TupacAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* red bandana */}
      <path d="M24 42 Q60 34 96 42 Q90 50 60 52 Q30 50 24 42Z" fill="#CC0000"/>
      <path d="M80 46 Q90 50 96 60 Q88 56 82 54Z" fill="#CC0000"/>
      {/* face */}
      <ellipse cx="60" cy="74" rx="32" ry="36" fill="#5C3010"/>
      <ellipse cx="60" cy="74" rx="28" ry="32" fill="#7A4520"/>
      {/* strong jaw */}
      <ellipse cx="60" cy="92" rx="22" ry="14" fill="#7A4520"/>
      {/* eyes — intense */}
      <circle cx="46" cy="68" r="8" fill="white"/><circle cx="74" cy="68" r="8" fill="white"/>
      <circle cx="47" cy="69" r="5" fill="#1a1a1a"/><circle cx="75" cy="69" r="5" fill="#1a1a1a"/>
      <circle cx="46" cy="66" r="2" fill="white"/><circle cx="74" cy="66" r="2" fill="white"/>
      {/* serious expression */}
      <path d="M48 84 Q60 89 72 84" stroke="#3a1a00" strokeWidth="2.5" fill="none"/>
      {/* chain */}
      {[38,48,58,68,78].map((x,i)=>(
        <circle key={i} cx={x} cy={104+Math.abs(i-2)*3} r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      ))}
      {/* dark outfit */}
      <path d="M28 108 Q60 98 92 108" fill="#1a1a1a"/>
      {/* tattoo marks — simplified lines */}
      <line x1="36" y1="62" x2="42" y2="58" stroke="#4a2000" strokeWidth="1" opacity="0.6"/>
      <line x1="78" y1="62" x2="84" y2="58" stroke="#4a2000" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

export function BeyonceAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* long wavy golden hair */}
      <path d="M22 46 Q16 76 20 108 Q28 78 34 66Z" fill="#CC9900"/>
      <path d="M98 46 Q104 76 100 108 Q92 78 86 66Z" fill="#CC9900"/>
      <ellipse cx="60" cy="42" rx="38" ry="28" fill="#CC9900"/>
      {/* tiara/crown */}
      <path d="M34 32 L38 18 L46 28 L54 14 L60 24 L66 14 L74 28 L82 18 L86 32Z"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
      {[38,54,60,66,82].map((x,i)=>(
        <circle key={i} cx={x} cy={i%2===0?18:14} r="3.5" fill="#FF69B4"/>
      ))}
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#C8882A"/>
      {/* glamorous eyes */}
      <ellipse cx="45" cy="65" rx="10" ry="12" fill="white"/>
      <ellipse cx="75" cy="65" rx="10" ry="12" fill="white"/>
      {/* lashes */}
      {[-8,-4,0,4,8].map((x,i)=>(
        <line key={i} x1={45+x} y1={54} x2={44+x-1} y2={48} stroke="#1a1a1a" strokeWidth="1.2"/>
      ))}
      {[-8,-4,0,4,8].map((x,i)=>(
        <line key={i} x1={75+x} y1={54} x2={74+x-1} y2={48} stroke="#1a1a1a" strokeWidth="1.2"/>
      ))}
      <ellipse cx="45" cy="67" rx="7" ry="9"  fill="#4B1A1A"/>
      <ellipse cx="75" cy="67" rx="7" ry="9"  fill="#4B1A1A"/>
      <circle cx="45" cy="66" r="4" fill="#1a1a1a"/><circle cx="75" cy="66" r="4" fill="#1a1a1a"/>
      <circle cx="43" cy="63" r="2.5" fill="white"/><circle cx="73" cy="63" r="2.5" fill="white"/>
      {/* luscious lips */}
      <path d="M44 85 Q60 96 76 85 Q68 92 60 93 Q52 92 44 85Z" fill="#CC2244"/>
      {/* glam outfit */}
      <path d="M30 104 Q60 95 90 104" fill="#1a1a1a"/>
      {/* earrings */}
      <ellipse cx="26" cy="74" rx="4" ry="8" fill="#FFD700"/>
      <ellipse cx="94" cy="74" rx="4" ry="8" fill="#FFD700"/>
    </svg>
  );
}

export function CardiBAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* big colorful wig — red/pink */}
      <ellipse cx="60" cy="36" rx="48" ry="34" fill="#CC0044"/>
      <path d="M12 42 Q8 68 14 90 Q20 66 26 56Z" fill="#CC0044"/>
      <path d="M108 42 Q112 68 106 90 Q100 66 94 56Z" fill="#CC0044"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#8B5E3C"/>
      {/* dramatic eye makeup */}
      <ellipse cx="44" cy="64" rx="11" ry="13" fill="white"/>
      <ellipse cx="76" cy="64" rx="11" ry="13" fill="white"/>
      {/* shadow */}
      <ellipse cx="44" cy="62" rx="11" ry="5" fill="#9966CC" opacity="0.5"/>
      <ellipse cx="76" cy="62" rx="11" ry="5" fill="#9966CC" opacity="0.5"/>
      <ellipse cx="44" cy="65" rx="7" ry="9"  fill="#1a1a1a"/>
      <ellipse cx="76" cy="65" rx="7" ry="9"  fill="#1a1a1a"/>
      <circle cx="44" cy="64" r="4" fill="#111"/><circle cx="76" cy="64" r="4" fill="#111"/>
      <circle cx="42" cy="61" r="2.5" fill="white"/><circle cx="74" cy="61" r="2.5" fill="white"/>
      {/* bold lips */}
      <path d="M44 84 Q60 96 76 84 Q68 92 60 93 Q52 92 44 84Z" fill="#FF1493"/>
      <line x1="44" y1="84" x2="76" y2="84" stroke="#CC0066" strokeWidth="1"/>
      {/* long nails (cartoon) */}
      {[34,42,50,70,78,86].map((x,i)=>(
        <ellipse key={i} cx={x} cy={108} rx="3" ry="8" fill="#FF1493" transform={`rotate(${i<3?-15:15} ${x} 108)`}/>
      ))}
      {/* jewelry */}
      {[38,50,62,74,86].map((x,i)=>(
        <circle key={i} cx={x} cy={100+Math.abs(i-2)*2} r="3.5" fill="#FFD700"/>
      ))}
    </svg>
  );
}

export function NickiMAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* big pink wig */}
      <ellipse cx="60" cy="34" rx="50" ry="32" fill="#FF69B4"/>
      <path d="M10 42 Q6 66 12 86 Q18 64 24 54Z" fill="#FF69B4"/>
      <path d="M110 42 Q114 66 108 86 Q102 64 96 54Z" fill="#FF69B4"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#C8882A"/>
      {/* bold eye makeup */}
      <ellipse cx="44" cy="64" rx="12" ry="14" fill="white"/>
      <ellipse cx="76" cy="64" rx="12" ry="14" fill="white"/>
      <ellipse cx="44" cy="63" rx="12" ry="6"  fill="#CC0044" opacity="0.4"/>
      <ellipse cx="76" cy="63" rx="12" ry="6"  fill="#CC0044" opacity="0.4"/>
      <ellipse cx="44" cy="66" rx="8" ry="10"  fill="#1a1a1a"/>
      <ellipse cx="76" cy="66" rx="8" ry="10"  fill="#1a1a1a"/>
      <circle cx="44" cy="64" r="4" fill="#111"/><circle cx="76" cy="64" r="4" fill="#111"/>
      <circle cx="42" cy="61" r="3" fill="white"/><circle cx="74" cy="61" r="3" fill="white"/>
      {/* lashes */}
      {[-6,-2,2,6,10].map((x,i)=>(
        <line key={i} x1={42+x} y1={52} x2={40+x} y2={46} stroke="#1a1a1a" strokeWidth="1.5"/>
      ))}
      {/* bold lips */}
      <path d="M44 84 Q60 97 76 84 Q68 92 60 94 Q52 92 44 84Z" fill="#CC0044"/>
      {/* pink outfit */}
      <path d="M32 104 Q60 95 88 104" fill="#FF69B4"/>
      {/* earrings — big hoops */}
      <circle cx="24" cy="74" r="8" fill="none" stroke="#FFD700" strokeWidth="3"/>
      <circle cx="96" cy="74" r="8" fill="none" stroke="#FFD700" strokeWidth="3"/>
    </svg>
  );
}

export function KeyshiaAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* long flowing dark hair */}
      <path d="M22 44 Q16 72 20 106 Q26 76 32 62Z" fill="#1a1a1a"/>
      <path d="M98 44 Q104 72 100 106 Q94 76 88 62Z" fill="#1a1a1a"/>
      <ellipse cx="60" cy="40" rx="38" ry="26" fill="#1a1a1a"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#7A4520"/>
      {/* elegant eyes */}
      <ellipse cx="45" cy="65" rx="10" ry="12" fill="white"/>
      <ellipse cx="75" cy="65" rx="10" ry="12" fill="white"/>
      <ellipse cx="45" cy="67" rx="7" ry="9"  fill="#3B1A5A"/>
      <ellipse cx="75" cy="67" rx="7" ry="9"  fill="#3B1A5A"/>
      <circle cx="45" cy="66" r="4" fill="#1a1a1a"/><circle cx="75" cy="66" r="4" fill="#1a1a1a"/>
      <circle cx="43" cy="63" r="2.5" fill="white"/><circle cx="73" cy="63" r="2.5" fill="white"/>
      {/* lashes */}
      {[-6,-2,2,6].map((x,i)=>(
        <line key={i} x1={43+x} y1={54} x2={42+x} y2={49} stroke="#1a1a1a" strokeWidth="1.2"/>
      ))}
      {/* warm smile */}
      <path d="M46 84 Q60 94 74 84" stroke="#8B2244" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M50 84 Q60 92 70 84 Q64 90 60 91 Q56 90 50 84Z" fill="#CC3366"/>
      {/* R&B outfit — purple */}
      <path d="M32 104 Q60 95 88 104" fill="#4B0082"/>
      {/* earrings */}
      <ellipse cx="26" cy="74" rx="3" ry="6" fill="#9966CC"/>
      <ellipse cx="94" cy="74" rx="3" ry="6" fill="#9966CC"/>
    </svg>
  );
}

export function EdSheeranAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* red/ginger hair — messy */}
      <ellipse cx="60" cy="42" rx="34" ry="26" fill="#CC4400"/>
      {[-16,-8,0,8,16].map((x,i)=>(
        <ellipse key={i} cx={44+i*8+x} cy={30} rx="7" ry="12" fill="#CC4400" transform={`rotate(${-10+i*5} ${44+i*8+x} 30)`}/>
      ))}
      {/* face */}
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#F5D5B0"/>
      {/* freckles */}
      {[[-14,-2],[14,-2],[-16,4],[16,4],[-10,8],[10,8],[0,6]].map(([x,y],i)=>(
        <circle key={i} cx={60+x} cy={76+y} r="2" fill="#CC8844" opacity="0.55"/>
      ))}
      {/* warm eyes — green */}
      <circle cx="45" cy="65" r="9" fill="white"/><circle cx="75" cy="65" r="9" fill="white"/>
      <circle cx="46" cy="66" r="6" fill="#228B22"/><circle cx="76" cy="66" r="6" fill="#228B22"/>
      <circle cx="46" cy="65" r="3" fill="#1a1a1a"/><circle cx="76" cy="65" r="3" fill="#1a1a1a"/>
      <circle cx="45" cy="63" r="2" fill="white"/><circle cx="75" cy="63" r="2" fill="white"/>
      {/* friendly smile */}
      <path d="M46 83 Q60 94 74 83" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* casual T-shirt & guitar hint */}
      <path d="M32 104 Q60 95 88 104" fill="#4A90D9"/>
      <ellipse cx="94" cy="86" rx="8" ry="22" fill="#8B6914" opacity="0.8"/>
      <ellipse cx="94" cy="80" rx="11" ry="12" fill="#A0522D"/>
      <line x1="94" y1="68" x2="94" y2="108" stroke="#8B6914" strokeWidth="3"/>
      {[70,75,80,85,90,95].map((y,i)=>(
        <line key={i} x1={88} y1={y} x2={100} y2={y} stroke="#C0C0C0" strokeWidth="0.8"/>
      ))}
    </svg>
  );
}

export function ChrisStapletonAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* cowboy hat */}
      <ellipse cx="60" cy="38" rx="46" ry="12" fill="#4A3728" stroke="#3A2718" strokeWidth="1.5"/>
      <path d="M28 38 Q28 14 60 12 Q92 14 92 38Z" fill="#5A4738" stroke="#3A2718" strokeWidth="1.5"/>
      {/* hat band */}
      <rect x="28" y="35" width="64" height="6" rx="2" fill="#8B6914"/>
      {/* face */}
      <ellipse cx="60" cy="74" rx="28" ry="30" fill="#C8882A"/>
      {/* thick beard */}
      <path d="M32 82 Q32 104 60 108 Q88 104 88 82 Q82 96 60 98 Q38 96 32 82Z" fill="#3A2A1A"/>
      {/* mustache */}
      <path d="M42 78 Q60 84 78 78 Q68 82 60 82 Q52 82 42 78Z" fill="#2A1A0A"/>
      {/* eyes — soulful */}
      <circle cx="45" cy="65" r="9" fill="white"/><circle cx="75" cy="65" r="9" fill="white"/>
      <circle cx="46" cy="66" r="6" fill="#3B2010"/><circle cx="76" cy="66" r="6" fill="#3B2010"/>
      <circle cx="46" cy="65" r="3" fill="#1a1a1a"/><circle cx="76" cy="65" r="3" fill="#1a1a1a"/>
      <circle cx="45" cy="63" r="2" fill="white"/><circle cx="75" cy="63" r="2" fill="white"/>
      {/* flannel shirt */}
      <path d="M32 104 Q60 96 88 104" fill="#CC3333"/>
      {[32,40,48,56,64,72,80,88].map((x,i)=>(
        <line key={i} x1={x} y1={104} x2={x} y2={116} stroke="#AA2222" strokeWidth="3"/>
      ))}
      <line x1="32" y1="110" x2="88" y2="110" stroke="#AA2222" strokeWidth="2"/>
    </svg>
  );
}

export function KPopStarAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* stylized colorful hair — lavender/silver */}
      <ellipse cx="60" cy="38" rx="36" ry="26" fill="#9966CC"/>
      {[-14,-6,2,10,18].map((x,i)=>(
        <path key={i} d={`M${40+i*9},44 Q${40+i*9+x},${24} ${42+i*8+x},${12}`} fill="#B388FF"/>
      ))}
      {/* face — flawless k-pop aesthetic */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#F8E8D0"/>
      {/* gradient eye makeup */}
      <ellipse cx="44" cy="64" rx="11" ry="13" fill="white"/>
      <ellipse cx="76" cy="64" rx="11" ry="13" fill="white"/>
      <ellipse cx="44" cy="63" rx="11" ry="5"  fill="#9966CC" opacity="0.3"/>
      <ellipse cx="76" cy="63" rx="11" ry="5"  fill="#9966CC" opacity="0.3"/>
      <ellipse cx="44" cy="66" rx="7"  ry="9"  fill="#1a1a1a"/>
      <ellipse cx="76" cy="66" rx="7"  ry="9"  fill="#1a1a1a"/>
      <circle cx="44" cy="65" r="4" fill="#111"/><circle cx="76" cy="65" r="4" fill="#111"/>
      <circle cx="42" cy="62" r="2.5" fill="white"/><circle cx="74" cy="62" r="2.5" fill="white"/>
      {/* perfect smile */}
      <path d="M48 84 Q60 92 72 84" stroke="#CC4466" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="34" cy="76" r="5" fill="#FFB6C1" opacity="0.55"/>
      <circle cx="86" cy="76" r="5" fill="#FFB6C1" opacity="0.55"/>
      {/* stage outfit — sparkly */}
      <path d="M34 104 Q60 95 86 104" fill="#6600CC"/>
      {[36,44,52,60,68,76,84].map((x,i)=>(
        <circle key={i} cx={x} cy={106} r="2" fill="#FFD700"/>
      ))}
      {/* microphone */}
      <circle cx="94" cy="72" r="8" fill="#888"/>
      <line x1="94" y1="80" x2="94" y2="100" stroke="#666" strokeWidth="3"/>
    </svg>
  );
}

export function KPopQueenAvatar() {
  return (
    <svg width={S} height={S} viewBox="0 0 120 120">
      {/* flowing black/dark hair with highlights */}
      <path d="M22 42 Q16 70 18 104 Q24 74 30 60Z" fill="#1a1a1a"/>
      <path d="M98 42 Q104 70 102 104 Q96 74 90 60Z" fill="#1a1a1a"/>
      <ellipse cx="60" cy="38" rx="38" ry="26" fill="#1a1a1a"/>
      {/* highlight streaks */}
      <path d="M38 20 Q44 34 40 50" stroke="#9966CC" strokeWidth="3" fill="none" opacity="0.7"/>
      <path d="M78 22 Q72 36 76 52" stroke="#FF69B4" strokeWidth="3" fill="none" opacity="0.7"/>
      {/* face */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#F5E0C8"/>
      {/* jeweled bindi/gem */}
      <circle cx="60" cy="46" r="4" fill="#FF1493"/>
      <circle cx="60" cy="46" r="2" fill="#FFD700"/>
      {/* stunning eyes */}
      <ellipse cx="44" cy="64" rx="11" ry="13" fill="white"/>
      <ellipse cx="76" cy="64" rx="11" ry="13" fill="white"/>
      <ellipse cx="44" cy="64" rx="7"  ry="9"  fill="#1a1a1a"/>
      <ellipse cx="76" cy="64" rx="7"  ry="9"  fill="#1a1a1a"/>
      <circle cx="44" cy="63" r="4" fill="#111"/><circle cx="76" cy="63" r="4" fill="#111"/>
      <circle cx="42" cy="60" r="2.5" fill="white"/><circle cx="74" cy="60" r="2.5" fill="white"/>
      {/* eyeliner wings */}
      <path d="M33 57 Q38 55 44 57" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M76 57 Q82 55 87 57" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* perfect lips */}
      <path d="M46 83 Q60 93 74 83 Q66 90 60 91 Q54 90 46 83Z" fill="#CC2244"/>
      <circle cx="34" cy="75" r="5" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="86" cy="75" r="5" fill="#FFB6C1" opacity="0.5"/>
      {/* idol outfit */}
      <path d="M34 104 Q60 95 86 104" fill="#CC0044"/>
      {/* earrings */}
      <path d="M22 70 L22 84" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="22" cy="86" r="4" fill="#FFD700"/>
      <path d="M98 70 L98 84" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="98" cy="86" r="4" fill="#FFD700"/>
    </svg>
  );
}

// Map id → component
export const AVATAR_MAP: Record<string, React.FC> = {
  "c-pup":       ScoobyAvatar,
  "c-sponge":    SpongeSkinAvatar,
  "c-mouse":     ToonMouseAvatar,
  "c-princess":  MagicPrincessAvatar,
  "c-robot":     SpaceBotAvatar,
  "c-lion":      JungleKingAvatar,
  "a-naruto":    NarutoAvatar,
  "a-pikachu":   PikachuAvatar,
  "a-luffy":     LuffyAvatar,
  "a-goku":      GokuAvatar,
  "a-tanjiro":   TanjiroAvatar,
  "a-deku":      DekuAvatar,
  "a-sasuke":    SasukeAvatar,
  "a-sailor":    SailorMoonAvatar,
  "a-saitama":   OnePunchAvatar,
  "a-zoro":      ZoroAvatar,
  "ar-biggie":   BiggieAvatar,
  "ar-tupac":    TupacAvatar,
  "ar-beyonce":  BeyonceAvatar,
  "ar-cardib":   CardiBAvatar,
  "ar-nicki":    NickiMAvatar,
  "ar-keisha":   KeyshiaAvatar,
  "ar-ed":       EdSheeranAvatar,
  "ar-stapleton":ChrisStapletonAvatar,
  "ar-kpop1":    KPopStarAvatar,
  "ar-kpop2":    KPopQueenAvatar,
};
