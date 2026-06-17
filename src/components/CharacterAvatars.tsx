// Character avatar SVG components — original cartoon-style interpretations
// Each uses the character's most iconic visual signature features

// ─── FREE CARTOON CHARACTERS ──────────────────────────────────────────────────

export function ScoobyAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="70" rx="32" ry="28" fill="#6B8E23"/>
      <ellipse cx="22" cy="50" rx="13" ry="22" fill="#556B2F" transform="rotate(-12 22 50)"/>
      <ellipse cx="88" cy="50" rx="13" ry="22" fill="#556B2F" transform="rotate(12 88 50)"/>
      <ellipse cx="22" cy="50" rx="8" ry="16" fill="#8FBC8F" transform="rotate(-12 22 50)"/>
      <ellipse cx="88" cy="50" rx="8" ry="16" fill="#8FBC8F" transform="rotate(12 88 50)"/>
      <ellipse cx="55" cy="52" rx="30" ry="28" fill="#6B8E23"/>
      <ellipse cx="55" cy="65" rx="16" ry="12" fill="#8FBC8F"/>
      <ellipse cx="55" cy="58" rx="8" ry="5" fill="#1a1a1a"/>
      <circle cx="40" cy="47" r="9" fill="white"/>
      <circle cx="70" cy="47" r="9" fill="white"/>
      <circle cx="41" cy="48" r="5" fill="#4B0082"/>
      <circle cx="71" cy="48" r="5" fill="#4B0082"/>
      <circle cx="42" cy="46" r="2.5" fill="white"/>
      <circle cx="72" cy="46" r="2.5" fill="white"/>
      <path d="M42 68 Q55 78 68 68" stroke="#2d4a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="38" y="88" width="34" height="10" rx="5" fill="#1B6EBF"/>
      <circle cx="55" cy="93" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      <text x="55" y="96" textAnchor="middle" fontSize="5" fill="#333" fontWeight="bold">SD</text>
      <circle cx="35" cy="60" r="4" fill="#556B2F" opacity="0.6"/>
      <circle cx="75" cy="58" r="5" fill="#556B2F" opacity="0.6"/>
    </svg>
  );
}

export function SpongeBobAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <rect x="18" y="16" width="74" height="84" rx="6" fill="#FFD700"/>
      {[[28,26],[42,22],[58,24],[72,28],[32,40],[50,38],[68,36],[36,54],[60,50],[44,66],[70,62]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="#E6B800" opacity="0.7"/>
      ))}
      <ellipse cx="38" cy="48" rx="12" ry="14" fill="white"/>
      <ellipse cx="72" cy="48" rx="12" ry="14" fill="white"/>
      <ellipse cx="38" cy="50" rx="8" ry="10" fill="#5DADE2"/>
      <ellipse cx="72" cy="50" rx="8" ry="10" fill="#5DADE2"/>
      <circle cx="38" cy="49" r="5" fill="#1a1a1a"/>
      <circle cx="72" cy="49" r="5" fill="#1a1a1a"/>
      <circle cx="36" cy="47" r="2.5" fill="white"/>
      <circle cx="70" cy="47" r="2.5" fill="white"/>
      <circle cx="26" cy="62" r="4" fill="#E6A817" opacity="0.5"/>
      <circle cx="84" cy="62" r="4" fill="#E6A817" opacity="0.5"/>
      <rect x="42" y="70" width="11" height="16" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      <rect x="57" y="70" width="11" height="16" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5"/>
      <path d="M30 68 Q55 86 80 68" stroke="#8B6914" strokeWidth="2.5" fill="none"/>
      <rect x="18" y="90" width="74" height="10" rx="0" fill="#8B4513"/>
      <rect x="49" y="76" width="12" height="16" rx="3" fill="#CC0000"/>
      <polygon points="55,92 49,82 61,82" fill="#990000"/>
    </svg>
  );
}

export function TomCatAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <polygon points="26,38 18,14 38,30" fill="#708090"/>
      <polygon points="84,38 92,14 72,30" fill="#708090"/>
      <polygon points="28,36 22,18 36,30" fill="#FFB6C1"/>
      <polygon points="82,36 88,18 74,30" fill="#FFB6C1"/>
      <ellipse cx="55" cy="58" rx="34" ry="34" fill="#708090"/>
      <ellipse cx="55" cy="62" rx="26" ry="26" fill="#B0C4DE"/>
      <ellipse cx="42" cy="53" rx="10" ry="12" fill="white"/>
      <ellipse cx="68" cy="53" rx="10" ry="12" fill="white"/>
      <ellipse cx="42" cy="54" rx="7" ry="9" fill="#228B22"/>
      <ellipse cx="68" cy="54" rx="7" ry="9" fill="#228B22"/>
      <ellipse cx="42" cy="54" rx="2.5" ry="7" fill="#1a1a1a"/>
      <ellipse cx="68" cy="54" rx="2.5" ry="7" fill="#1a1a1a"/>
      <circle cx="40" cy="51" r="2" fill="white"/>
      <circle cx="66" cy="51" r="2" fill="white"/>
      <ellipse cx="55" cy="66" rx="4" ry="3" fill="#FF69B4"/>
      <line x1="20" y1="64" x2="45" y2="67" stroke="#555" strokeWidth="1.5"/>
      <line x1="20" y1="68" x2="45" y2="69" stroke="#555" strokeWidth="1.5"/>
      <line x1="65" y1="67" x2="90" y2="64" stroke="#555" strokeWidth="1.5"/>
      <line x1="65" y1="69" x2="90" y2="68" stroke="#555" strokeWidth="1.5"/>
      <path d="M42 74 Q55 83 68 74" stroke="#556" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="55" cy="30" rx="10" ry="6" fill="#607080"/>
    </svg>
  );
}

export function CinderellaSkinAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="36" rx="28" ry="22" fill="#FFD700"/>
      <ellipse cx="55" cy="20" rx="14" ry="12" fill="#E6C200"/>
      <path d="M35 28 L40 14 L48 22 L55 10 L62 22 L70 14 L75 28Z" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1"/>
      {[40,55,70].map((x,i)=><circle key={i} cx={x} cy={i===1?10:14} r="3.5" fill="#87CEEB"/>)}
      <ellipse cx="55" cy="65" rx="26" ry="30" fill="#FDDCB0"/>
      <ellipse cx="41" cy="58" rx="10" ry="12" fill="white"/>
      <ellipse cx="69" cy="58" rx="10" ry="12" fill="white"/>
      <ellipse cx="41" cy="60" rx="7" ry="9" fill="#4169E1"/>
      <ellipse cx="69" cy="60" rx="7" ry="9" fill="#4169E1"/>
      <circle cx="41" cy="59" r="4" fill="#1a1a1a"/>
      <circle cx="69" cy="59" r="4" fill="#1a1a1a"/>
      <circle cx="39" cy="56" r="2.5" fill="white"/>
      <circle cx="67" cy="56" r="2.5" fill="white"/>
      {[-6,-2,2,6].map((x,i)=><line key={i} x1={41+x} y1={48} x2={40+x} y2={42} stroke="#1a1a1a" strokeWidth="1.3"/>)}
      <path d="M43 78 Q55 88 67 78" stroke="#CC4466" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="32" cy="70" r="5" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="78" cy="70" r="5" fill="#FFB6C1" opacity="0.6"/>
      <path d="M29 98 Q55 88 81 98" fill="#4169E1"/>
      <path d="M40 88 L55 100 L70 88" fill="#4169E1"/>
    </svg>
  );
}

export function BenderRobotAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <defs>
        <linearGradient id="metalG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8A8A8"/>
          <stop offset="50%" stopColor="#E8E8E8"/>
          <stop offset="100%" stopColor="#A8A8A8"/>
        </linearGradient>
      </defs>
      <rect x="18" y="22" width="74" height="70" rx="12" fill="url(#metalG)" stroke="#888" strokeWidth="2"/>
      <line x1="55" y1="22" x2="55" y2="8" stroke="#888" strokeWidth="4"/>
      <circle cx="55" cy="7" r="5" fill="#FF4500"/>
      <rect x="26" y="34" width="24" height="18" rx="4" fill="#1a1a1a"/>
      <rect x="60" y="34" width="24" height="18" rx="4" fill="#1a1a1a"/>
      <ellipse cx="38" cy="43" rx="8" ry="6" fill="#FFD700"/>
      <ellipse cx="72" cy="43" rx="8" ry="6" fill="#FFD700"/>
      <ellipse cx="38" cy="43" rx="5" ry="4" fill="white"/>
      <ellipse cx="72" cy="43" rx="5" ry="4" fill="white"/>
      <circle cx="38" cy="43" r="2.5" fill="#1a1a1a"/>
      <circle cx="72" cy="43" r="2.5" fill="#1a1a1a"/>
      <rect x="22" y="62" width="66" height="18" rx="6" fill="#999"/>
      <rect x="24" y="64" width="62" height="14" rx="4" fill="#1a1a1a"/>
      {[28,36,44,52,60,68,76].map((x,i)=>(
        <rect key={i} x={x} y={66} width="5" height="10" rx="1" fill={i%2===0?"#FFD700":"#FF4500"}/>
      ))}
      <circle cx="18" cy="50" r="7" fill="#888"/>
      <circle cx="92" cy="50" r="7" fill="#888"/>
      <circle cx="18" cy="50" r="4" fill="#666"/>
      <circle cx="92" cy="50" r="4" fill="#666"/>
    </svg>
  );
}

export function SimbaAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="58" r="40" fill="#B8860B"/>
      <circle cx="55" cy="58" r="30" fill="#FFD700"/>
      <circle cx="25" cy="26" r="14" fill="#FFD700"/>
      <circle cx="85" cy="26" r="14" fill="#FFD700"/>
      <circle cx="25" cy="26" r="8" fill="#FF8C00"/>
      <circle cx="85" cy="26" r="8" fill="#FF8C00"/>
      <circle cx="42" cy="50" r="10" fill="white"/>
      <circle cx="68" cy="50" r="10" fill="white"/>
      <circle cx="43" cy="51" r="7" fill="#DAA520"/>
      <circle cx="69" cy="51" r="7" fill="#DAA520"/>
      <circle cx="43" cy="50" r="4" fill="#1a1a1a"/>
      <circle cx="69" cy="50" r="4" fill="#1a1a1a"/>
      <circle cx="42" cy="48" r="2" fill="white"/>
      <circle cx="68" cy="48" r="2" fill="white"/>
      <ellipse cx="55" cy="66" rx="14" ry="10" fill="#FF8C00"/>
      <ellipse cx="55" cy="60" rx="7" ry="5" fill="#CC3300"/>
      <line x1="12" y1="62" x2="40" y2="66" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="12" y1="67" x2="40" y2="68" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="70" y1="66" x2="98" y2="62" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="70" y1="68" x2="98" y2="67" stroke="#8B7355" strokeWidth="1.5"/>
    </svg>
  );
}

// ─── PAID ANIME ───────────────────────────────────────────────────────────────

export function NarutoAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M12 96 Q55 84 98 96" fill="#FF8C00"/>
      <rect x="40" y="84" width="30" height="10" rx="3" fill="#1a1a1a"/>
      {[[-26,8],[-18,-4],[-8,-12],[2,-16],[12,-12],[20,-4],[26,6]].map(([x,y],i)=>(
        <path key={i} d={`M${38+i*6},40 Q${38+i*6+x},${22+y} ${40+i*5+x},${10+y}`}
          fill="#FFD700" stroke="#E6B800" strokeWidth="0.5"/>
      ))}
      <ellipse cx="55" cy="36" rx="28" ry="14" fill="#FFD700"/>
      <ellipse cx="55" cy="65" rx="26" ry="30" fill="#FDDCB0"/>
      <rect x="24" y="36" width="62" height="12" rx="3" fill="#1B6EBF"/>
      <rect x="30" y="37" width="50" height="10" rx="2" fill="#C8C8C8"/>
      <circle cx="55" cy="42" r="3.5" fill="none" stroke="#555" strokeWidth="1.5"/>
      <path d="M55 42 Q58 39 55 38 Q51 38 51 42 Q51 46 55 47" stroke="#555" strokeWidth="1" fill="none"/>
      <line x1="28" y1="60" x2="46" y2="62" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="65" x2="46" y2="66" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="70" x2="46" y2="70" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <line x1="64" y1="62" x2="82" y2="60" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <line x1="64" y1="66" x2="82" y2="65" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <line x1="64" y1="70" x2="82" y2="70" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="42" cy="62" r="9" fill="white"/>
      <circle cx="68" cy="62" r="9" fill="white"/>
      <circle cx="43" cy="63" r="6" fill="#1B6EBF"/>
      <circle cx="69" cy="63" r="6" fill="#1B6EBF"/>
      <circle cx="43" cy="62" r="3.5" fill="#1a1a1a"/>
      <circle cx="69" cy="62" r="3.5" fill="#1a1a1a"/>
      <circle cx="42" cy="60" r="1.8" fill="white"/>
      <circle cx="68" cy="60" r="1.8" fill="white"/>
      <path d="M40 78 Q55 92 70 78" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M46 78 Q55 89 64 78 L64 84 Q55 92 46 84Z" fill="white" opacity="0.9"/>
    </svg>
  );
}

export function PikachuAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M28 44 L18 8 L42 34Z" fill="#FFD700"/>
      <path d="M82 44 L92 8 L68 34Z" fill="#FFD700"/>
      <path d="M29 40 L21 14 L38 32Z" fill="#1a1a1a"/>
      <path d="M81 40 L89 14 L72 32Z" fill="#1a1a1a"/>
      <ellipse cx="55" cy="70" rx="42" ry="38" fill="#FFD700"/>
      <ellipse cx="55" cy="68" rx="38" ry="36" fill="#FFE033"/>
      <ellipse cx="16" cy="72" rx="8" ry="14" fill="#CC8800" opacity="0.5"/>
      <ellipse cx="94" cy="72" rx="8" ry="14" fill="#CC8800" opacity="0.5"/>
      <ellipse cx="22" cy="80" rx="13" ry="10" fill="#FF3333" opacity="0.9"/>
      <ellipse cx="88" cy="80" rx="13" ry="10" fill="#FF3333" opacity="0.9"/>
      <circle cx="40" cy="62" r="12" fill="#1a1a1a"/>
      <circle cx="70" cy="62" r="12" fill="#1a1a1a"/>
      <circle cx="40" cy="62" r="9" fill="#2a2a2a"/>
      <circle cx="70" cy="62" r="9" fill="#2a2a2a"/>
      <circle cx="37" cy="58" r="5" fill="white"/>
      <circle cx="67" cy="58" r="5" fill="white"/>
      <circle cx="36" cy="57" r="2.5" fill="white" opacity="0.7"/>
      <ellipse cx="55" cy="74" rx="4" ry="3" fill="#CC4400"/>
      <path d="M43 80 Q55 92 67 80" stroke="#CC4400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M46 105 L58 90 L52 88 L65 72" stroke="#E6B800" strokeWidth="5" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

export function LuffyAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="32" rx="52" ry="14" fill="#E8C84A" stroke="#B8980A" strokeWidth="2"/>
      <ellipse cx="55" cy="26" rx="32" ry="20" fill="#E8C84A" stroke="#B8980A" strokeWidth="1.5"/>
      <path d="M23 32 Q55 42 87 32" stroke="#CC0000" strokeWidth="5" fill="none"/>
      <path d="M28 48 Q24 38 30 32 Q42 24 55 26 Q68 24 80 32 Q86 38 82 48" fill="#1a1a1a"/>
      <ellipse cx="55" cy="70" rx="28" ry="30" fill="#FDDCB0"/>
      <line x1="36" y1="64" x2="44" y2="74" stroke="#CC0000" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="40" cy="62" r="9" fill="white"/>
      <circle cx="70" cy="62" r="9" fill="white"/>
      <circle cx="41" cy="63" r="6" fill="#1a1a1a"/>
      <circle cx="71" cy="63" r="6" fill="#1a1a1a"/>
      <circle cx="40" cy="60" r="2.5" fill="white"/>
      <circle cx="70" cy="60" r="2.5" fill="white"/>
      <path d="M34 80 Q55 102 76 80" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M40 80 Q55 98 70 80 L70 88 Q55 102 40 88Z" fill="white" opacity="0.9"/>
      <path d="M27 100 Q55 90 83 100" fill="#CC0000"/>
    </svg>
  );
}

export function GokuAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M12 96 Q55 84 98 96" fill="#FF8C00"/>
      <path d="M35 86 L55 100 L75 86" fill="#FF8C00"/>
      <path d="M45 86 L55 94 L65 86" fill="#1B4FCC"/>
      {[[-22,4],[-15,-8],[-6,-16],[4,-20],[13,-16],[20,-8],[24,2]].map(([x,y],i)=>(
        <path key={i} d={`M${34+i*7},36 Q${34+i*7+x},${18+y} ${36+i*6+x},${6+y}`}
          fill="#1a1a1a" stroke="#111" strokeWidth="0.5"/>
      ))}
      <ellipse cx="55" cy="32" rx="26" ry="14" fill="#1a1a1a"/>
      <ellipse cx="55" cy="62" rx="26" ry="30" fill="#FDDCB0"/>
      <path d="M32 50 Q42 44 50 50" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M60 50 Q68 44 78 50" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <circle cx="42" cy="57" r="9" fill="white"/>
      <circle cx="68" cy="57" r="9" fill="white"/>
      <circle cx="43" cy="58" r="6" fill="#1a1a1a"/>
      <circle cx="69" cy="58" r="6" fill="#1a1a1a"/>
      <circle cx="42" cy="55" r="2.5" fill="white"/>
      <circle cx="68" cy="55" r="2.5" fill="white"/>
      <line x1="70" y1="62" x2="77" y2="70" stroke="#CC8844" strokeWidth="2" strokeLinecap="round"/>
      <path d="M43 74 Q55 84 67 74" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function TanjiroAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M10 96 Q55 82 100 96" fill="#1a6622"/>
      {[10,22,34,46,58,70,82,94].map((x,i)=>(
        <rect key={i} x={x} y={96} width="12" height="14"
          fill={i%2===0?"#1a6622":"#1a1a1a"}/>
      ))}
      <ellipse cx="55" cy="38" rx="28" ry="18" fill="#8B1A1A"/>
      {[-14,-6,2,10,18].map((x,i)=>(
        <path key={i} d={`M${40+i*7},38 Q${40+i*7+x},${20} ${42+i*6+x},${8}`} fill="#6B0000"/>
      ))}
      <ellipse cx="55" cy="36" rx="24" ry="14" fill="#8B1A1A"/>
      <ellipse cx="55" cy="68" rx="26" ry="30" fill="#FDDCB0"/>
      <path d="M40 42 Q55 36 70 42 Q65 48 55 50 Q45 48 40 42Z" fill="#CC2222" opacity="0.85"/>
      <ellipse cx="22" cy="70" rx="6" ry="10" fill="white" stroke="#CC0000" strokeWidth="1.5"/>
      <path d="M22 62 Q28 66 22 70 Q16 66 22 62Z" fill="#CC0000"/>
      <ellipse cx="88" cy="70" rx="6" ry="10" fill="white" stroke="#CC0000" strokeWidth="1.5"/>
      <path d="M88 62 Q94 66 88 70 Q82 66 88 62Z" fill="#CC0000"/>
      <ellipse cx="42" cy="60" rx="9" ry="11" fill="white"/>
      <ellipse cx="68" cy="60" rx="9" ry="11" fill="white"/>
      <ellipse cx="42" cy="62" rx="6" ry="8" fill="#6B0000"/>
      <ellipse cx="68" cy="62" rx="6" ry="8" fill="#6B0000"/>
      <circle cx="42" cy="61" r="3.5" fill="#1a1a1a"/>
      <circle cx="68" cy="61" r="3.5" fill="#1a1a1a"/>
      <circle cx="41" cy="58" r="2" fill="white"/>
      <circle cx="67" cy="58" r="2" fill="white"/>
      <path d="M44 78 Q55 87 66 78" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function DekuAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M12 96 Q55 84 98 96" fill="#2D7A2D"/>
      <path d="M38 86 L55 98 L72 86" fill="#2D7A2D"/>
      <rect x="38" y="88" width="34" height="12" rx="0" fill="#E8E8E8" opacity="0.4"/>
      {[[-18,2],[-10,-8],[-2,-14],[6,-12],[14,-6],[20,2]].map(([x,y],i)=>(
        <ellipse key={i} cx={34+i*9+Math.abs(x/2)} cy={34+y}
          rx="9" ry="13" fill="#2D7A2D"
          transform={`rotate(${-20+i*8} ${34+i*9} ${34+y})`}/>
      ))}
      <ellipse cx="55" cy="38" rx="26" ry="14" fill="#2D7A2D"/>
      <ellipse cx="55" cy="68" rx="26" ry="28" fill="#FDDCB0"/>
      {[[-14,-2],[-18,4],[14,-2],[18,4],[-10,8],[10,8]].map(([x,y],i)=>(
        <circle key={i} cx={55+x} cy={75+y} r="2.5" fill="#CC9966" opacity="0.65"/>
      ))}
      <ellipse cx="42" cy="60" rx="10" ry="12" fill="white"/>
      <ellipse cx="68" cy="60" rx="10" ry="12" fill="white"/>
      <ellipse cx="42" cy="62" rx="7" ry="9" fill="#1B5E1B"/>
      <ellipse cx="68" cy="62" rx="7" ry="9" fill="#1B5E1B"/>
      <circle cx="42" cy="61" r="4" fill="#1a1a1a"/>
      <circle cx="68" cy="61" r="4" fill="#1a1a1a"/>
      <circle cx="40" cy="58" r="2.5" fill="white"/>
      <circle cx="66" cy="58" r="2.5" fill="white"/>
      <path d="M43 78 Q55 89 67 78" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function SasukeAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M12 96 Q55 82 98 96" fill="#1E1B4B"/>
      <rect x="38" y="80" width="34" height="20" rx="0" fill="#1E1B4B"/>
      <path d="M34 80 L38 70 L55 76 L72 70 L76 80 Q55 86 34 80Z" fill="#1E1B4B"/>
      <ellipse cx="55" cy="38" rx="28" ry="16" fill="#1a1a1a"/>
      <path d="M62 28 Q78 22 88 34 Q78 30 70 32Z" fill="#1a1a1a"/>
      <path d="M60 26 Q72 14 85 22 Q74 22 66 28Z" fill="#1a1a1a"/>
      <ellipse cx="55" cy="65" rx="26" ry="28" fill="#EDD5B0"/>
      <circle cx="41" cy="57" r="11" fill="white"/>
      <circle cx="69" cy="57" r="11" fill="white"/>
      <circle cx="41" cy="58" r="8" fill="#CC0000"/>
      <circle cx="69" cy="58" r="8" fill="#CC0000"/>
      <circle cx="41" cy="58" r="4.5" fill="#1a1a1a"/>
      <circle cx="69" cy="58" r="4.5" fill="#1a1a1a"/>
      {[0,120,240].map((deg,i)=>{
        const r=deg*Math.PI/180;
        return <ellipse key={i} cx={41+Math.sin(r)*5.5} cy={58-Math.cos(r)*5.5}
          rx="1.8" ry="2.8" fill="#1a1a1a"
          transform={`rotate(${deg} ${41+Math.sin(r)*5.5} ${58-Math.cos(r)*5.5})`}/>;
      })}
      {[0,120,240].map((deg,i)=>{
        const r=deg*Math.PI/180;
        return <ellipse key={i} cx={69+Math.sin(r)*5.5} cy={58-Math.cos(r)*5.5}
          rx="1.8" ry="2.8" fill="#1a1a1a"
          transform={`rotate(${deg} ${69+Math.sin(r)*5.5} ${58-Math.cos(r)*5.5})`}/>;
      })}
      <circle cx="39" cy="55" r="2.5" fill="white"/>
      <circle cx="67" cy="55" r="2.5" fill="white"/>
      <path d="M44 76 Q55 81 66 76" stroke="#8B4513" strokeWidth="2" fill="none"/>
      <path d="M30 48 Q41 42 50 48" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M60 48 Q69 42 80 48" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function SailorMoonAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M14 60 Q6 84 10 108 Q18 78 24 64Z" fill="#FFD700"/>
      <path d="M96 60 Q104 84 100 108 Q92 78 86 64Z" fill="#FFD700"/>
      <circle cx="28" cy="28" r="18" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5"/>
      <circle cx="82" cy="28" r="18" fill="#FFD700" stroke="#E6B800" strokeWidth="1.5"/>
      <ellipse cx="55" cy="70" rx="28" ry="32" fill="#FDDCB0"/>
      <path d="M55 42 Q50 34 56 28 Q51 35 57 38 Q55 32 55 42Z" fill="#FFD700"/>
      <path d="M27 100 Q55 88 83 100" fill="#1B4FCC"/>
      <path d="M40 88 L55 100 L70 88 L70 95 L55 107 L40 95Z" fill="#1B4FCC"/>
      <line x1="33" y1="94" x2="77" y2="94" stroke="white" strokeWidth="2.5"/>
      <line x1="35" y1="98" x2="75" y2="98" stroke="white" strokeWidth="2"/>
      <path d="M46 90 L55 95 L64 90 Q58 86 55 85 Q52 86 46 90Z" fill="#CC0000"/>
      <ellipse cx="40" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="70" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="40" cy="65" rx="8" ry="11" fill="#1B4FCC"/>
      <ellipse cx="70" cy="65" rx="8" ry="11" fill="#1B4FCC"/>
      <circle cx="40" cy="64" r="5" fill="#1a1a1a"/>
      <circle cx="70" cy="64" r="5" fill="#1a1a1a"/>
      <circle cx="38" cy="61" r="3" fill="white"/>
      <circle cx="68" cy="61" r="3" fill="white"/>
      {[-7,-3,1,5,9].map((x,i)=>(
        <line key={i} x1={39+x} y1={50} x2={38+x} y2={44} stroke="#1a1a1a" strokeWidth="1.5"/>
      ))}
      <path d="M44 82 Q55 92 66 82" stroke="#CC4466" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="74" r="6" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="80" cy="74" r="6" fill="#FFB6C1" opacity="0.6"/>
    </svg>
  );
}

export function SaitamaAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M8 96 Q55 82 102 96" fill="#FFD700"/>
      <path d="M28 86 L55 100 L82 86" fill="#FFD700"/>
      <rect x="28" y="94" width="54" height="6" rx="2" fill="#1a1a1a"/>
      <path d="M8 72 Q2 86 6 100 Q14 80 20 74Z" fill="white"/>
      <path d="M102 72 Q108 86 104 100 Q96 80 90 74Z" fill="white"/>
      <circle cx="55" cy="54" r="38" fill="#FDDCB0"/>
      <circle cx="55" cy="54" r="36" fill="#F5C89A"/>
      <ellipse cx="44" cy="36" rx="8" ry="5" fill="white" opacity="0.3" transform="rotate(-20 44 36)"/>
      <circle cx="40" cy="53" r="10" fill="white"/>
      <circle cx="70" cy="53" r="10" fill="white"/>
      <circle cx="40" cy="54" r="6.5" fill="#1a1a1a"/>
      <circle cx="70" cy="54" r="6.5" fill="#1a1a1a"/>
      <circle cx="38" cy="51" r="3" fill="white"/>
      <circle cx="68" cy="51" r="3" fill="white"/>
      <line x1="42" y1="70" x2="68" y2="70" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="16" cy="92" rx="10" ry="8" fill="white"/>
      <ellipse cx="94" cy="92" rx="10" ry="8" fill="white"/>
    </svg>
  );
}

export function ZoroAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <line x1="16" y1="78" x2="28" y2="110" stroke="#C0C0C0" strokeWidth="4"/>
      <line x1="22" y1="76" x2="34" y2="110" stroke="#888" strokeWidth="2"/>
      <line x1="10" y1="82" x2="22" y2="110" stroke="#C0C0C0" strokeWidth="4"/>
      <line x1="10" y1="82" x2="22" y2="108" stroke="#888" strokeWidth="2"/>
      <path d="M18 96 Q55 82 92 96" fill="#1B6622"/>
      <ellipse cx="55" cy="38" rx="28" ry="16" fill="#2D8A2D"/>
      {[-12,-4,4,12].map((x,i)=>(
        <ellipse key={i} cx={43+i*7+x} cy={28} rx="8" ry="10" fill="#228B22" transform={`rotate(${-15+i*10} ${43+i*7+x} 28)`}/>
      ))}
      <ellipse cx="55" cy="68" rx="26" ry="28" fill="#FDDCB0"/>
      <line x1="35" y1="54" x2="46" y2="70" stroke="#CC2222" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="63" rx="8" ry="9" fill="white"/>
      <circle cx="40" cy="64" r="5.5" fill="#1a1a1a"/>
      <circle cx="39" cy="61" r="2" fill="white"/>
      <ellipse cx="70" cy="61" rx="9" ry="11" fill="white"/>
      <circle cx="70" cy="62" r="6" fill="#1a1a1a"/>
      <circle cx="69" cy="59" r="2.5" fill="white"/>
      <rect x="24" y="36" width="62" height="10" rx="3" fill="#1a1a1a"/>
      <path d="M44 80 L66 80" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="88" cy="68" r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
    </svg>
  );
}

// ─── PAID ARTISTS ─────────────────────────────────────────────────────────────

export function BiggieAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M20 40 L26 20 L38 34 L50 14 L55 28 L60 14 L72 34 L84 20 L90 40Z"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
      {[26,50,55,60,84].map((x,i)=>(
        <circle key={i} cx={x} cy={i===0||i===4?20:i===2?14:20} r="4.5" fill="#FF1493"/>
      ))}
      <ellipse cx="55" cy="72" rx="42" ry="38" fill="#3A2008"/>
      <ellipse cx="55" cy="70" rx="36" ry="34" fill="#5A3010"/>
      <rect x="14" y="96" width="82" height="14" rx="0" fill="#CC3300"/>
      {[14,26,38,50,62,74,86].map((x,i)=>(
        <rect key={i} x={x} y={97} width="10" height="6" rx="0"
          fill={["#FFD700","#00AA44","#CC3300","#1B4FCC","#FF69B4","#FF8C00","#9B59B6"][i]}/>
      ))}
      <ellipse cx="40" cy="64" rx="11" ry="9" fill="white"/>
      <ellipse cx="70" cy="64" rx="11" ry="9" fill="white"/>
      <circle cx="41" cy="65" r="6" fill="#1a1a1a"/>
      <circle cx="71" cy="65" r="6" fill="#1a1a1a"/>
      <circle cx="39" cy="63" r="2.5" fill="white"/>
      <circle cx="69" cy="63" r="2.5" fill="white"/>
      <path d="M36 80 Q55 96 74 80" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M42 80 Q55 94 68 80 L68 88 Q55 96 42 88Z" fill="white" opacity="0.9"/>
      {[22,31,40,49,58,67,76,85].map((x,i)=>(
        <circle key={i} cx={x} cy={104+Math.abs(i-3.5)*1.5} r="4.5"
          fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      ))}
    </svg>
  );
}

export function TupacAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M18 38 Q55 28 92 38 Q86 50 55 52 Q24 50 18 38Z" fill="#CC0000"/>
      <path d="M76 44 Q88 50 92 62 Q84 56 78 54Z" fill="#CC0000"/>
      <path d="M82 48 Q92 56 90 68 Q84 60 80 56Z" fill="#CC0000"/>
      <ellipse cx="55" cy="72" rx="30" ry="34" fill="#5C3010"/>
      <ellipse cx="55" cy="70" rx="26" ry="30" fill="#7A4520"/>
      <circle cx="42" cy="64" r="10" fill="white"/>
      <circle cx="68" cy="64" r="10" fill="white"/>
      <circle cx="43" cy="65" r="6.5" fill="#1a1a1a"/>
      <circle cx="69" cy="65" r="6.5" fill="#1a1a1a"/>
      <circle cx="41" cy="62" r="2.5" fill="white"/>
      <circle cx="67" cy="62" r="2.5" fill="white"/>
      <path d="M42 80 Q55 87 68 80" stroke="#3a1a00" strokeWidth="2.5" fill="none"/>
      {[30,39,48,57,66,75].map((x,i)=>(
        <circle key={i} cx={x} cy={100+Math.abs(i-2.5)*2} r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
      ))}
      <path d="M22 104 Q55 92 88 104" fill="#1a1a1a"/>
    </svg>
  );
}

export function BeyonceAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M16 44 Q8 74 12 108 Q20 76 28 62Z" fill="#CC9900"/>
      <path d="M94 44 Q102 74 98 108 Q90 76 82 62Z" fill="#CC9900"/>
      <ellipse cx="55" cy="36" rx="40" ry="26" fill="#CC9900"/>
      <ellipse cx="55" cy="70" rx="28" ry="32" fill="#C8882A"/>
      <path d="M30 30 L36 14 L44 24 L55 8 L66 24 L74 14 L80 30Z"
        fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
      {[36,55,74].map((x,i)=><circle key={i} cx={x} cy={i===1?8:14} r="4" fill="#FF69B4"/>)}
      <ellipse cx="41" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="69" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="41" cy="62" rx="8" ry="10" fill="#3B1810"/>
      <ellipse cx="69" cy="62" rx="8" ry="10" fill="#3B1810"/>
      <circle cx="41" cy="62" r="4.5" fill="#1a1a1a"/>
      <circle cx="69" cy="62" r="4.5" fill="#1a1a1a"/>
      <circle cx="39" cy="59" r="2.5" fill="white"/>
      <circle cx="67" cy="59" r="2.5" fill="white"/>
      {[-8,-4,0,4,8].map((x,i)=>(
        <line key={i} x1={41+x} y1={50} x2={40+x-1} y2={43} stroke="#1a1a1a" strokeWidth="1.8"/>
      ))}
      {[-8,-4,0,4,8].map((x,i)=>(
        <line key={i} x1={69+x} y1={50} x2={68+x-1} y2={43} stroke="#1a1a1a" strokeWidth="1.8"/>
      ))}
      <path d="M40 82 Q55 96 70 82 Q63 90 55 92 Q47 90 40 82Z" fill="#CC2244"/>
      <path d="M26 102 Q55 90 84 102" fill="#1a1a1a"/>
      {[30,42,55,68,80].map((x,i)=><circle key={i} cx={x} cy={104} r="2" fill="#FFD700"/>)}
      <ellipse cx="20" cy="72" rx="4" ry="9" fill="#FFD700"/>
      <ellipse cx="90" cy="72" rx="4" ry="9" fill="#FFD700"/>
    </svg>
  );
}

export function CardiBAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="30" rx="50" ry="30" fill="#CC0044"/>
      <path d="M5 38 Q2 62 8 88 Q14 62 20 50Z" fill="#CC0044"/>
      <path d="M105 38 Q108 62 102 88 Q96 62 90 50Z" fill="#CC0044"/>
      {[[-40,16],[40,16],[-36,28],[36,28]].map(([x,y],i)=>(
        <ellipse key={i} cx={55+x} cy={y} rx="8" ry="14" fill="#AA0033"/>
      ))}
      <ellipse cx="55" cy="70" rx="28" ry="30" fill="#8B5E3C"/>
      <ellipse cx="40" cy="60" rx="13" ry="15" fill="white"/>
      <ellipse cx="70" cy="60" rx="13" ry="15" fill="white"/>
      <ellipse cx="40" cy="57" rx="13" ry="7" fill="#9966CC" opacity="0.5"/>
      <ellipse cx="70" cy="57" rx="13" ry="7" fill="#9966CC" opacity="0.5"/>
      <ellipse cx="40" cy="62" rx="8" ry="10" fill="#1a1a1a"/>
      <ellipse cx="70" cy="62" rx="8" ry="10" fill="#1a1a1a"/>
      <circle cx="40" cy="61" r="4.5" fill="#111"/>
      <circle cx="70" cy="61" r="4.5" fill="#111"/>
      <circle cx="38" cy="58" r="2.5" fill="white"/>
      <circle cx="68" cy="58" r="2.5" fill="white"/>
      <path d="M38 80 Q55 96 72 80 Q64 90 55 92 Q46 90 38 80Z" fill="#FF1493"/>
      {[22,30,38,70,78,86].map((x,i)=>(
        <ellipse key={i} cx={x} cy={106} rx="3.5" ry="9" fill="#FF1493"
          transform={`rotate(${i<3?-12:12} ${x} 106)`}/>
      ))}
      {[30,40,50,60,70,80].map((x,i)=>(
        <circle key={i} cx={x} cy={98+Math.abs(i-2.5)*2} r="3.5" fill="#FFD700"/>
      ))}
    </svg>
  );
}

export function NickiMAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="28" rx="52" ry="28" fill="#FF1493"/>
      <path d="M3 36 Q0 60 4 84 Q10 60 16 48Z" fill="#FF1493"/>
      <path d="M107 36 Q110 60 106 84 Q100 60 94 48Z" fill="#FF1493"/>
      <ellipse cx="36" cy="20" rx="6" ry="16" fill="#FF69B4" opacity="0.6" transform="rotate(-20 36 20)"/>
      <ellipse cx="70" cy="18" rx="6" ry="16" fill="#CC0066" opacity="0.4" transform="rotate(15 70 18)"/>
      <ellipse cx="55" cy="70" rx="28" ry="30" fill="#C8882A"/>
      <ellipse cx="40" cy="62" rx="13" ry="15" fill="white"/>
      <ellipse cx="70" cy="62" rx="13" ry="15" fill="white"/>
      <ellipse cx="40" cy="60" rx="13" ry="6" fill="#CC0044" opacity="0.45"/>
      <ellipse cx="70" cy="60" rx="13" ry="6" fill="#CC0044" opacity="0.45"/>
      <ellipse cx="40" cy="64" rx="9" ry="11" fill="#1a1a1a"/>
      <ellipse cx="70" cy="64" rx="9" ry="11" fill="#1a1a1a"/>
      <circle cx="40" cy="63" r="5" fill="#111"/>
      <circle cx="70" cy="63" r="5" fill="#111"/>
      <circle cx="38" cy="59" r="3" fill="white"/>
      <circle cx="68" cy="59" r="3" fill="white"/>
      {[-7,-3,1,5,9].map((x,i)=>(
        <line key={i} x1={39+x} y1={48} x2={38+x} y2={41} stroke="#1a1a1a" strokeWidth="1.8"/>
      ))}
      <path d="M38 82 Q55 97 72 82 Q64 92 55 94 Q46 92 38 82Z" fill="#CC0044"/>
      <path d="M26 102 Q55 90 84 102" fill="#FF1493"/>
      <circle cx="18" cy="72" r="9" fill="none" stroke="#FFD700" strokeWidth="3.5"/>
      <circle cx="92" cy="72" r="9" fill="none" stroke="#FFD700" strokeWidth="3.5"/>
    </svg>
  );
}

export function KeyshiaAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M14 42 Q8 70 12 106 Q18 74 24 58Z" fill="#1a1a1a"/>
      <path d="M96 42 Q102 70 98 106 Q92 74 86 58Z" fill="#1a1a1a"/>
      <ellipse cx="55" cy="36" rx="40" ry="24" fill="#1a1a1a"/>
      <ellipse cx="55" cy="70" rx="28" ry="30" fill="#7A4520"/>
      <ellipse cx="41" cy="62" rx="11" ry="13" fill="white"/>
      <ellipse cx="69" cy="62" rx="11" ry="13" fill="white"/>
      <ellipse cx="41" cy="64" rx="7" ry="9" fill="#3B1A5A"/>
      <ellipse cx="69" cy="64" rx="7" ry="9" fill="#3B1A5A"/>
      <circle cx="41" cy="63" r="4" fill="#1a1a1a"/>
      <circle cx="69" cy="63" r="4" fill="#1a1a1a"/>
      <circle cx="39" cy="60" r="2.5" fill="white"/>
      <circle cx="67" cy="60" r="2.5" fill="white"/>
      {[-5,-1,3,7].map((x,i)=>(
        <line key={i} x1={39+x} y1={51} x2={38+x} y2={45} stroke="#1a1a1a" strokeWidth="1.4"/>
      ))}
      <path d="M43 80 Q55 92 67 80" stroke="#8B2244" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M47 80 Q55 90 63 80 Q59 87 55 88 Q51 87 47 80Z" fill="#CC3366"/>
      <path d="M28 102 Q55 90 82 102" fill="#4B0082"/>
      <ellipse cx="20" cy="72" rx="3.5" ry="7" fill="#9966CC"/>
      <ellipse cx="90" cy="72" rx="3.5" ry="7" fill="#9966CC"/>
    </svg>
  );
}

export function EdSheeranAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="38" rx="34" ry="24" fill="#CC4400"/>
      {[-16,-8,0,8,16].map((x,i)=>(
        <ellipse key={i} cx={40+i*8} cy={26} rx="9" ry="14" fill="#CC4400"
          transform={`rotate(${-10+i*5} ${40+i*8} 26)`}/>
      ))}
      <ellipse cx="55" cy="68" rx="28" ry="30" fill="#F5D5B0"/>
      {[[-16,-2],[16,-2],[-18,4],[18,4],[-12,8],[12,8],[0,6],
        [-8,-6],[8,-6],[-14,12],[14,12],[-6,14],[6,14]].map(([x,y],i)=>(
        <circle key={i} cx={55+x} cy={74+y} r="1.8" fill="#CC8844" opacity="0.55"/>
      ))}
      <circle cx="41" cy="61" r="10" fill="white"/>
      <circle cx="69" cy="61" r="10" fill="white"/>
      <circle cx="42" cy="62" r="6.5" fill="#228B22"/>
      <circle cx="70" cy="62" r="6.5" fill="#228B22"/>
      <circle cx="42" cy="61" r="3.5" fill="#1a1a1a"/>
      <circle cx="70" cy="61" r="3.5" fill="#1a1a1a"/>
      <circle cx="40" cy="59" r="2" fill="white"/>
      <circle cx="68" cy="59" r="2" fill="white"/>
      <path d="M42 79 Q55 91 68 79" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="92" cy="80" rx="12" ry="14" fill="#A0522D"/>
      <ellipse cx="92" cy="75" rx="9" ry="10" fill="#8B4513"/>
      <line x1="92" y1="65" x2="92" y2="96" stroke="#6B3A10" strokeWidth="3"/>
      {[68,73,78,83,88,93].map((y,i)=>(
        <line key={i} x1={86} y1={y} x2={98} y2={y} stroke="#DDD" strokeWidth="0.8"/>
      ))}
      <path d="M28 100 Q55 88 82 100" fill="#4A90D9"/>
    </svg>
  );
}

export function ChrisStapletonAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="38" rx="50" ry="12" fill="#3A2408" stroke="#2A1408" strokeWidth="1.5"/>
      <path d="M22 38 Q22 12 55 10 Q88 12 88 38Z" fill="#4A3418" stroke="#2A1408" strokeWidth="1.5"/>
      <rect x="22" y="34" width="66" height="7" rx="2" fill="#8B6914"/>
      <path d="M26 80 Q26 108 55 112 Q84 108 84 80 Q78 98 55 100 Q32 98 26 80Z" fill="#2A1A08"/>
      <path d="M38 74 Q55 82 72 74 Q64 80 55 80 Q46 80 38 74Z" fill="#1A0A00"/>
      <ellipse cx="55" cy="66" rx="28" ry="28" fill="#C8882A"/>
      <circle cx="41" cy="60" r="10" fill="white"/>
      <circle cx="69" cy="60" r="10" fill="white"/>
      <circle cx="42" cy="61" r="6.5" fill="#3B2010"/>
      <circle cx="70" cy="61" r="6.5" fill="#3B2010"/>
      <circle cx="42" cy="60" r="3.5" fill="#1a1a1a"/>
      <circle cx="70" cy="60" r="3.5" fill="#1a1a1a"/>
      <circle cx="40" cy="58" r="2" fill="white"/>
      <circle cx="68" cy="58" r="2" fill="white"/>
      <path d="M20 102 Q55 90 90 102" fill="#CC3333"/>
      {[22,31,40,49,58,67,76,85].map((x,i)=>(
        <line key={i} x1={x} y1={102} x2={x} y2={110} stroke="#AA2020" strokeWidth="3"/>
      ))}
      <line x1="20" y1="107" x2="90" y2="107" stroke="#AA2020" strokeWidth="2"/>
    </svg>
  );
}

export function KPopIdolAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="34" rx="36" ry="24" fill="#B388FF"/>
      {[-14,-6,2,10,18].map((x,i)=>(
        <path key={i} d={`M${36+i*9},38 Q${36+i*9+x},${18} ${38+i*8+x},${8}`}
          fill={i%2===0?"#B388FF":"#9B59D0"}/>
      ))}
      <ellipse cx="55" cy="70" rx="26" ry="28" fill="#F8E8D0"/>
      <ellipse cx="40" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="70" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="40" cy="60" rx="12" ry="5" fill="#9966CC" opacity="0.35"/>
      <ellipse cx="70" cy="60" rx="12" ry="5" fill="#9966CC" opacity="0.35"/>
      <ellipse cx="40" cy="64" rx="8" ry="10" fill="#1a1a1a"/>
      <ellipse cx="70" cy="64" rx="8" ry="10" fill="#1a1a1a"/>
      <circle cx="40" cy="63" r="4.5" fill="#111"/>
      <circle cx="70" cy="63" r="4.5" fill="#111"/>
      <circle cx="38" cy="60" r="2.8" fill="white"/>
      <circle cx="68" cy="60" r="2.8" fill="white"/>
      <circle cx="28" cy="74" r="6" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="82" cy="74" r="6" fill="#FFB6C1" opacity="0.5"/>
      <path d="M44 82 Q55 90 66 82" stroke="#CC4466" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M28 102 Q55 88 82 102" fill="#6600CC"/>
      {[28,37,46,55,64,73,82].map((x,i)=>(
        <circle key={i} cx={x} cy={104} r="2.5" fill="#FFD700"/>
      ))}
      <circle cx="90" cy="68" r="9" fill="#888"/>
      <circle cx="90" cy="68" r="7" fill="#999"/>
      <line x1="90" y1="77" x2="90" y2="100" stroke="#666" strokeWidth="3"/>
    </svg>
  );
}

export function KPopQueenAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <path d="M14 40 Q8 68 10 106 Q16 72 22 56Z" fill="#1a1a1a"/>
      <path d="M96 40 Q102 68 100 106 Q94 72 88 56Z" fill="#1a1a1a"/>
      <ellipse cx="55" cy="34" rx="40" ry="24" fill="#1a1a1a"/>
      <line x1="30" y1="16" x2="38" y2="48" stroke="#FF1493" strokeWidth="4" opacity="0.8" strokeLinecap="round"/>
      <line x1="74" y1="18" x2="68" y2="50" stroke="#9966CC" strokeWidth="4" opacity="0.8" strokeLinecap="round"/>
      <ellipse cx="55" cy="70" rx="26" ry="28" fill="#F5E0C8"/>
      <circle cx="55" cy="44" r="5" fill="#FF1493"/>
      <circle cx="55" cy="44" r="2.5" fill="#FFD700"/>
      <ellipse cx="40" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="70" cy="62" rx="12" ry="14" fill="white"/>
      <ellipse cx="40" cy="62" rx="8" ry="10" fill="#1a1a1a"/>
      <ellipse cx="70" cy="62" rx="8" ry="10" fill="#1a1a1a"/>
      <circle cx="40" cy="61" r="4.5" fill="#111"/>
      <circle cx="70" cy="61" r="4.5" fill="#111"/>
      <circle cx="38" cy="58" r="3" fill="white"/>
      <circle cx="68" cy="58" r="3" fill="white"/>
      <path d="M26 54 Q34 50 40 54" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 54 Q76 50 84 54" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M42 80 Q55 92 68 80 Q61 88 55 90 Q49 88 42 80Z" fill="#CC0044"/>
      <circle cx="28" cy="73" r="5" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="82" cy="73" r="5" fill="#FFB6C1" opacity="0.5"/>
      <path d="M28 102 Q55 90 82 102" fill="#CC0044"/>
      {[30,40,55,70,80].map((x,i)=><circle key={i} cx={x} cy={104} r="2.5" fill="#FFD700"/>)}
      <line x1="17" y1="68" x2="17" y2="82" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 82 L17 90 L22 82" stroke="#FFD700" strokeWidth="2" fill="none"/>
      <line x1="93" y1="68" x2="93" y2="82" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M88 82 L93 90 L98 82" stroke="#FFD700" strokeWidth="2" fill="none"/>
    </svg>
  );
}

// ─── CONTENT STYLE OVERLAYS ──────────────────────────────────────────────────

export function TikTokStyleAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <rect x="20" y="6" width="70" height="98" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
      <rect x="24" y="14" width="62" height="82" rx="4" fill="#1A1A2E"/>
      <ellipse cx="55" cy="38" rx="12" ry="12" fill="#FF6B6B" opacity="0.8"/>
      <path d="M38 70 Q55 52 72 70" fill="#FF6B6B" opacity="0.8"/>
      <rect x="24" y="68" width="62" height="28" rx="0" fill="black" opacity="0.7"/>
      <rect x="26" y="71" width="58" height="10" rx="3" fill="white"/>
      <text x="55" y="79" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1a1a1a">BOLD CAPTION</text>
      <rect x="26" y="83" width="44" height="9" rx="3" fill="#FF0050"/>
      <text x="48" y="90" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">SUBTITLE</text>
      <rect x="24" y="14" width="4" height="82" rx="2" fill="#00F2EA" opacity="0.6"/>
      <text x="80" y="50" fontSize="10" fill="#FF0050">♥</text>
      <text x="80" y="62" fontSize="8" fill="white">💬</text>
      <text x="80" y="74" fontSize="8" fill="white">↗</text>
    </svg>
  );
}

export function YTDocumentaryAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <rect x="4" y="4" width="102" height="102" rx="6" fill="#0D0D0D"/>
      <rect x="4" y="4" width="102" height="18" rx="6" fill="#000"/>
      <rect x="4" y="88" width="102" height="18" rx="6" fill="#000"/>
      <rect x="4" y="22" width="102" height="66" fill="#0D1F2D"/>
      {[[14,30],[28,40],[44,28],[60,36],[76,30],[90,42],[18,56],[36,60],[54,52],[70,58],[88,50],[24,72],[48,68],[66,72],[84,66]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="0.8" fill="white" opacity="0.18"/>
      ))}
      <ellipse cx="55" cy="46" rx="10" ry="10" fill="#1B3A4B"/>
      <path d="M40 66 Q55 52 70 66" fill="#1B3A4B"/>
      <rect x="4" y="22" width="102" height="66" fill="#0D2030" opacity="0.5"/>
      <ellipse cx="82" cy="32" rx="6" ry="3" fill="white" opacity="0.15"/>
      <ellipse cx="82" cy="32" rx="2" ry="1" fill="white" opacity="0.4"/>
      <rect x="18" y="80" width="74" height="11" rx="2" fill="black" opacity="0.8"/>
      <text x="55" y="88" textAnchor="middle" fontSize="6" fill="white" opacity="0.9">▶ Documentary Look</text>
      <rect x="38" y="45" width="34" height="22" rx="5" fill="#FF0000" opacity="0.85"/>
      <polygon points="48,50 64,56 48,62" fill="white"/>
    </svg>
  );
}

export function IGReelAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <defs>
        <linearGradient id="igG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F58529"/>
          <stop offset="33%" stopColor="#DD2A7B"/>
          <stop offset="66%" stopColor="#8134AF"/>
          <stop offset="100%" stopColor="#515BD4"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="102" height="102" rx="16" fill="url(#igG)"/>
      <rect x="16" y="10" width="78" height="90" rx="8" fill="#0A0A0A"/>
      <rect x="18" y="16" width="74" height="78" rx="4" fill="#1A0A2E"/>
      <rect x="18" y="16" width="74" height="78" rx="4" fill="#FF6B9D" opacity="0.3"/>
      <circle cx="55" cy="40" r="11" fill="#FF6B9D" opacity="0.9"/>
      <path d="M40 66 Q50 48 55 50 Q60 48 70 66" fill="#FF6B9D" opacity="0.9"/>
      <line x1="18" y1="38" x2="28" y2="38" stroke="white" strokeWidth="2" opacity="0.6"/>
      <line x1="18" y1="50" x2="32" y2="50" stroke="white" strokeWidth="2" opacity="0.6"/>
      <text x="74" y="38" fontSize="14" fill="white" opacity="0.9">♪</text>
      <rect x="18" y="16" width="30" height="11" rx="3" fill="#1a1a1a" opacity="0.7"/>
      <text x="33" y="24" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">REELS</text>
      <rect x="18" y="76" width="74" height="18" rx="0" fill="black" opacity="0.65"/>
      <rect x="20" y="78" width="52" height="8" rx="3" fill="white"/>
      <text x="46" y="84" textAnchor="middle" fontSize="6" fill="#1a1a1a" fontWeight="bold">✨ Bright &amp; Fast</text>
      <text x="80" y="52" fontSize="9" fill="white">♥</text>
      <text x="80" y="63" fontSize="8" fill="white">💬</text>
    </svg>
  );
}

export function GamingOverlayAvatar() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <rect x="4" y="4" width="102" height="102" rx="8" fill="#0A0A14"/>
      <rect x="4" y="4" width="102" height="102" rx="8" fill="none" stroke="#00FF41" strokeWidth="2" opacity="0.8"/>
      <rect x="10" y="10" width="50" height="8" rx="3" fill="#333"/>
      <rect x="10" y="10" width="34" height="8" rx="3" fill="#00FF41"/>
      <text x="12" y="17" fontSize="5" fill="white">HP</text>
      <rect x="78" y="8" width="26" height="26" rx="3" fill="#1a1a2e" stroke="#00FF41" strokeWidth="1" opacity="0.8"/>
      <circle cx="88" cy="21" r="3" fill="#00FF41" opacity="0.8"/>
      <circle cx="96" cy="16" r="2" fill="#FF0050" opacity="0.8"/>
      <circle cx="94" cy="27" r="2" fill="#FF0050" opacity="0.8"/>
      <rect x="10" y="22" width="30" height="8" rx="2" fill="#1a1a2e" opacity="0.8"/>
      <text x="12" y="28" fontSize="4.5" fill="#00FF41">SCORE: 99,999</text>
      <circle cx="55" cy="60" r="12" fill="none" stroke="#00FF41" strokeWidth="1.5" opacity="0.7"/>
      <line x1="55" y1="44" x2="55" y2="52" stroke="#00FF41" strokeWidth="1.5" opacity="0.9"/>
      <line x1="55" y1="68" x2="55" y2="76" stroke="#00FF41" strokeWidth="1.5" opacity="0.9"/>
      <line x1="39" y1="60" x2="47" y2="60" stroke="#00FF41" strokeWidth="1.5" opacity="0.9"/>
      <line x1="63" y1="60" x2="71" y2="60" stroke="#00FF41" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="55" cy="60" r="2" fill="#00FF41" opacity="0.9"/>
      <rect x="72" y="82" width="30" height="16" rx="3" fill="#1a1a2e" stroke="#00FF41" strokeWidth="1" opacity="0.9"/>
      <text x="87" y="88" textAnchor="middle" fontSize="5" fill="white">AMMO</text>
      <text x="87" y="96" textAnchor="middle" fontSize="7" fill="#00FF41" fontWeight="bold">30/90</text>
      <rect x="32" y="92" width="38" height="12" rx="4" fill="#7B2FBE" opacity="0.9"/>
      <text x="51" y="101" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">GAMING</text>
      {[20,30,40,50,60,70,80].map((y,i)=>(
        <line key={i} x1="4" y1={y} x2="106" y2={y} stroke="white" strokeWidth="0.4" opacity="0.04"/>
      ))}
    </svg>
  );
}

// ─── AVATAR MAP ───────────────────────────────────────────────────────────────

export const AVATAR_MAP: Record<string, React.FC> = {
  "c-pup":        ScoobyAvatar,
  "c-sponge":     SpongeBobAvatar,
  "c-mouse":      TomCatAvatar,
  "c-princess":   CinderellaSkinAvatar,
  "c-robot":      BenderRobotAvatar,
  "c-lion":       SimbaAvatar,
  "a-naruto":     NarutoAvatar,
  "a-pikachu":    PikachuAvatar,
  "a-luffy":      LuffyAvatar,
  "a-goku":       GokuAvatar,
  "a-tanjiro":    TanjiroAvatar,
  "a-deku":       DekuAvatar,
  "a-sasuke":     SasukeAvatar,
  "a-sailor":     SailorMoonAvatar,
  "a-saitama":    SaitamaAvatar,
  "a-zoro":       ZoroAvatar,
  "ar-biggie":    BiggieAvatar,
  "ar-tupac":     TupacAvatar,
  "ar-beyonce":   BeyonceAvatar,
  "ar-cardib":    CardiBAvatar,
  "ar-nicki":     NickiMAvatar,
  "ar-keisha":    KeyshiaAvatar,
  "ar-ed":        EdSheeranAvatar,
  "ar-stapleton": ChrisStapletonAvatar,
  "ar-kpop1":     KPopIdolAvatar,
  "ar-kpop2":     KPopQueenAvatar,
  "st-tiktok":    TikTokStyleAvatar,
  "st-yt-doc":    YTDocumentaryAvatar,
  "st-ig-reel":   IGReelAvatar,
  "st-gaming":    GamingOverlayAvatar,
};
