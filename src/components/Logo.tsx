interface LogoProps { size?: number; showText?: boolean; }

// 5-petal cherry blossom — soft watercolor style
function Blossom({ x, y, r, rotate = 0, opacity = 1 }: { x:number; y:number; r:number; rotate?:number; opacity?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {[0,72,144,216,288].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        const px = Math.sin(rad) * r * 0.53;
        const py = -Math.cos(rad) * r * 0.53;
        return <ellipse key={i} cx={px} cy={py} rx={r*0.40} ry={r*0.55}
          fill="#F2BDCA" opacity={0.93} transform={`rotate(${deg} ${px} ${py})`}/>;
      })}
      {/* inner petal blush */}
      {[0,72,144,216,288].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        const px = Math.sin(rad) * r * 0.28;
        const py = -Math.cos(rad) * r * 0.28;
        return <ellipse key={i} cx={px} cy={py} rx={r*0.16} ry={r*0.24}
          fill="#E8A0B4" opacity={0.4} transform={`rotate(${deg} ${px} ${py})`}/>;
      })}
      <circle cx={0} cy={0} r={r*0.19} fill="#FFF5F7"/>
      <circle cx={0} cy={0} r={r*0.10} fill="#FADADD"/>
      {[0,60,120,180,240,300].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        return <g key={i}>
          <line x1={0} y1={0} x2={Math.sin(rad)*r*0.27} y2={-Math.cos(rad)*r*0.27}
            stroke="#F0B8C8" strokeWidth="0.5" opacity={0.7}/>
          <circle cx={Math.sin(rad)*r*0.27} cy={-Math.cos(rad)*r*0.27} r={r*0.052} fill="#F9C6D0"/>
        </g>;
      })}
    </g>
  );
}

function Bud({ x, y, r, rotate=0 }: { x:number; y:number; r:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r*0.36} ry={r*0.54} fill="#F2BDCA" opacity={0.88}/>
      <ellipse cx={0} cy={r*0.1} rx={r*0.24} ry={r*0.34} fill="#E8A0B4" opacity={0.55}/>
      <ellipse cx={-r*0.17} cy={r*0.38} rx={r*0.13} ry={r*0.21} fill="#B2D5B2" opacity={0.82}
        transform={`rotate(-20 ${-r*0.17} ${r*0.38})`}/>
      <ellipse cx={r*0.17} cy={r*0.38} rx={r*0.13} ry={r*0.21} fill="#B2D5B2" opacity={0.82}
        transform={`rotate(20 ${r*0.17} ${r*0.38})`}/>
    </g>
  );
}

function Leaf({ x, y, r, rotate=0 }: { x:number; y:number; r:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r*0.26} ry={r*0.62} fill="#B8D8B8" opacity={0.82}/>
      <line x1={0} y1={-r*0.54} x2={0} y2={r*0.54} stroke="#96C296" strokeWidth="0.45" opacity={0.5}/>
    </g>
  );
}

function Stem({ x1,y1,x2,y2,cx:qx,cy:qy }:{x1:number;y1:number;x2:number;y2:number;cx:number;cy:number}) {
  return <path d={`M${x1},${y1} Q${qx},${qy} ${x2},${y2}`}
    stroke="#C8DFC8" strokeWidth="0.8" fill="none" opacity={0.7}/>;
}

export default function CLCLogo({ size = 60, showText = false }: LogoProps) {
  // Wide hexagonal frame: 6-sided, landscape orientation
  // ViewBox 220×190 — wider than tall, matching the actual logo shape
  const W = 220, H = 190;
  const mx = W / 2; // 110
  const my = H / 2; // 95

  // Hexagon corner coordinates (wide landscape hexagon)
  // Top-left, top-right, right, bottom-right, bottom-left, left
  const TL = { x: 52,  y: 18  };
  const TR = { x: 168, y: 18  };
  const R  = { x: 208, y: my  };
  const BR = { x: 168, y: H-18};
  const BL = { x: 52,  y: H-18};
  const L  = { x: 12,  y: my  };

  const framePath = `M${TL.x},${TL.y} L${TR.x},${TR.y} L${R.x},${R.y} L${BR.x},${BR.y} L${BL.x},${BL.y} L${L.x},${L.y} Z`;
  // Inner frame (slightly inset)
  const i = 10;
  const innerPath = `M${TL.x+i},${TL.y+i} L${TR.x-i},${TR.y+i} L${R.x-i},${R.y} L${BR.x-i},${BR.y-i} L${BL.x+i},${BL.y-i} L${L.x+i},${L.y} Z`;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width={size} height={size * (H/W)} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">

        {/* White oval background */}
        <ellipse cx={mx} cy={my} rx={92} ry={78} fill="white" opacity={0.97}/>

        {/* ── Outer hexagonal frame ── thin rose-gold lines */}
        <path d={framePath} fill="none" stroke="#CDB5B8" strokeWidth="1.4"/>
        {/* ── Inner hexagonal frame ── very faint */}
        <path d={innerPath} fill="none" stroke="#DEC8CB" strokeWidth="0.6"/>

        {/* ══════════════════════════════════
            UPPER-LEFT corner flower cluster
            (most prominent — matches logo)
        ══════════════════════════════════ */}
        {/* stems from TL corner outward */}
        <Stem x1={TL.x} y1={TL.y} x2={TL.x-20} y2={TL.y-12} cx={TL.x-8}  cy={TL.y-4}/>
        <Stem x1={TL.x} y1={TL.y} x2={TL.x-8}  y2={TL.y-24} cx={TL.x-2}  cy={TL.y-12}/>
        <Stem x1={TL.x} y1={TL.y} x2={TL.x+12} y2={TL.y-16} cx={TL.x+6}  cy={TL.y-6}/>
        <Stem x1={TL.x-20} y1={TL.y-12} x2={TL.x-32} y2={TL.y-24} cx={TL.x-26} cy={TL.y-16}/>
        <Stem x1={TL.x-8}  y1={TL.y-24} x2={TL.x-20} y2={TL.y-36} cx={TL.x-14} cy={TL.y-30}/>
        <Stem x1={TL.x-8}  y1={TL.y-24} x2={TL.x+4}  y2={TL.y-36} cx={TL.x-2}  cy={TL.y-30}/>
        {/* blossoms */}
        <Blossom x={TL.x-22} y={TL.y-16} r={11}  rotate={-20}/>
        <Blossom x={TL.x-8}  y={TL.y-28} r={12}  rotate={10}/>
        <Blossom x={TL.x+12} y={TL.y-20} r={9}   rotate={25}/>
        <Blossom x={TL.x-34} y={TL.y-28} r={8.5} rotate={-35}/>
        <Blossom x={TL.x-22} y={TL.y-40} r={8}   rotate={-10}/>
        <Blossom x={TL.x+4}  y={TL.y-40} r={7.5} rotate={15}/>
        {/* buds */}
        <Bud x={TL.x-4}  y={TL.y-14} r={5}   rotate={-8}/>
        <Bud x={TL.x-42} y={TL.y-18} r={4.5} rotate={-30}/>
        <Bud x={TL.x-14} y={TL.y-48} r={4}   rotate={5}/>
        {/* leaves */}
        <Leaf x={TL.x-14} y={TL.y-4}  r={9} rotate={-60}/>
        <Leaf x={TL.x+4}  y={TL.y-6}  r={8} rotate={55}/>
        <Leaf x={TL.x-30} y={TL.y-8}  r={8} rotate={-75}/>
        <Leaf x={TL.x-36} y={TL.y-40} r={7} rotate={-40}/>

        {/* ══════════════════════════════════
            UPPER-RIGHT corner flower cluster
        ══════════════════════════════════ */}
        <Stem x1={TR.x} y1={TR.y} x2={TR.x+20} y2={TR.y-12} cx={TR.x+8}  cy={TR.y-4}/>
        <Stem x1={TR.x} y1={TR.y} x2={TR.x+8}  y2={TR.y-24} cx={TR.x+2}  cy={TR.y-12}/>
        <Stem x1={TR.x} y1={TR.y} x2={TR.x-12} y2={TR.y-16} cx={TR.x-6}  cy={TR.y-6}/>
        <Stem x1={TR.x+20} y1={TR.y-12} x2={TR.x+32} y2={TR.y-24} cx={TR.x+26} cy={TR.y-16}/>
        <Stem x1={TR.x+8}  y1={TR.y-24} x2={TR.x+20} y2={TR.y-36} cx={TR.x+14} cy={TR.y-30}/>
        <Stem x1={TR.x+8}  y1={TR.y-24} x2={TR.x-4}  y2={TR.y-36} cx={TR.x+2}  cy={TR.y-30}/>
        <Blossom x={TR.x+22} y={TR.y-16} r={11}  rotate={20}/>
        <Blossom x={TR.x+8}  y={TR.y-28} r={12}  rotate={-10}/>
        <Blossom x={TR.x-12} y={TR.y-20} r={9}   rotate={-25}/>
        <Blossom x={TR.x+34} y={TR.y-28} r={8.5} rotate={35}/>
        <Blossom x={TR.x+22} y={TR.y-40} r={8}   rotate={10}/>
        <Blossom x={TR.x-4}  y={TR.y-40} r={7.5} rotate={-15}/>
        <Bud x={TR.x+4}  y={TR.y-14} r={5}   rotate={8}/>
        <Bud x={TR.x+42} y={TR.y-18} r={4.5} rotate={30}/>
        <Bud x={TR.x+14} y={TR.y-48} r={4}   rotate={-5}/>
        <Leaf x={TR.x+14} y={TR.y-4}  r={9} rotate={60}/>
        <Leaf x={TR.x-4}  y={TR.y-6}  r={8} rotate={-55}/>
        <Leaf x={TR.x+30} y={TR.y-8}  r={8} rotate={75}/>
        <Leaf x={TR.x+36} y={TR.y-40} r={7} rotate={40}/>

        {/* ══════════════════════════════════
            LOWER corners — smaller clusters
        ══════════════════════════════════ */}
        {/* bottom-left */}
        <Stem x1={BL.x} y1={BL.y} x2={BL.x-16} y2={BL.y+14} cx={BL.x-6} cy={BL.y+6}/>
        <Stem x1={BL.x} y1={BL.y} x2={BL.x+8}  y2={BL.y+18} cx={BL.x+4} cy={BL.y+8}/>
        <Blossom x={BL.x-16} y={BL.y+17} r={8}  rotate={15} opacity={0.85}/>
        <Blossom x={BL.x+8}  y={BL.y+20} r={7}  rotate={-10} opacity={0.85}/>
        <Bud  x={BL.x-22} y={BL.y+8}  r={4} rotate={-20}/>
        <Leaf x={BL.x-6}  y={BL.y+8}  r={7} rotate={60}/>
        <Leaf x={BL.x+6}  y={BL.y+6}  r={6} rotate={-55}/>
        {/* bottom-right */}
        <Stem x1={BR.x} y1={BR.y} x2={BR.x+16} y2={BR.y+14} cx={BR.x+6} cy={BR.y+6}/>
        <Stem x1={BR.x} y1={BR.y} x2={BR.x-8}  y2={BR.y+18} cx={BR.x-4} cy={BR.y+8}/>
        <Blossom x={BR.x+16} y={BR.y+17} r={8}  rotate={-15} opacity={0.85}/>
        <Blossom x={BR.x-8}  y={BR.y+20} r={7}  rotate={10} opacity={0.85}/>
        <Bud  x={BR.x+22} y={BR.y+8}  r={4} rotate={20}/>
        <Leaf x={BR.x+6}  y={BR.y+8}  r={7} rotate={-60}/>
        <Leaf x={BR.x-6}  y={BR.y+6}  r={6} rotate={55}/>

        {/* ══════════════════════════════════
            Large C and L — italic serif
        ══════════════════════════════════ */}
        <text x="86" y="113" textAnchor="middle" fontSize="80"
          fill="#2E2020" fontFamily="Georgia,'Times New Roman',serif"
          fontStyle="italic" fontWeight="400" opacity={0.88}>C</text>
        <text x="136" y="113" textAnchor="middle" fontSize="80"
          fill="#2E2020" fontFamily="Georgia,'Times New Roman',serif"
          fontStyle="italic" fontWeight="400" opacity={0.88}>L</text>

        {/* ── Mint ribbon ── */}
        <path d={`M30,${my-11} L${W-30},${my-11} L${W-30},${my+11} L30,${my+11} Z`}
          fill="#A8D5BE" opacity={0.75}/>
        <path d={`M30,${my-11} L18,${my} L30,${my+11} Z`} fill="#A8D5BE" opacity={0.75}/>
        <path d={`M${W-30},${my-11} L${W-18},${my} L${W-30},${my+11} Z`} fill="#A8D5BE" opacity={0.75}/>
        {/* Crystal Lynn on ribbon */}
        <text x={mx} y={my+4} textAnchor="middle" fontSize="9.5"
          fill="white" fontFamily="'Dancing Script','Brush Script MT',Georgia,serif"
          fontWeight="600" letterSpacing="0.5" opacity={0.97}>Crystal Lynn</text>

        {/* "creates" below ribbon */}
        <text x={mx} y={my+26} textAnchor="middle" fontSize="7"
          fill="#6B4E4E" fontFamily="Georgia,serif" letterSpacing="4">creates</text>

      </svg>

      {showText && (
        <div style={{ textAlign:'center', marginTop:4 }}>
          <p style={{ color:'#00A86B', fontWeight:700, fontSize:13, letterSpacing:4 }}>CLC</p>
          <p style={{ color:'#4CAF82', fontSize:10, letterSpacing:3 }}>PREMIERE STUDIOS</p>
        </div>
      )}
    </div>
  );
}
