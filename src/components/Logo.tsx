interface LogoProps { size?: number; showText?: boolean; }

// Single cherry blossom petal cluster (5 petals + center)
function Blossom({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.52;
        const py = -Math.cos(rad) * r * 0.52;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r * 0.40} ry={r * 0.55}
            fill="#F9C6D0" opacity={0.92}
            transform={`rotate(${deg} ${px} ${py})`} />
        );
      })}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.28;
        const py = -Math.cos(rad) * r * 0.28;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r * 0.18} ry={r * 0.26}
            fill="#F4A7B9" opacity={0.45}
            transform={`rotate(${deg} ${px} ${py})`} />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.2} fill="#FFF0F5" />
      <circle cx={0} cy={0} r={r * 0.11} fill="#FADADD" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={0} y1={0} x2={Math.sin(rad) * r * 0.26} y2={-Math.cos(rad) * r * 0.26}
              stroke="#F4A7B9" strokeWidth="0.5" opacity={0.7} />
            <circle cx={Math.sin(rad) * r * 0.26} cy={-Math.cos(rad) * r * 0.26}
              r={r * 0.05} fill="#FBCFE8" />
          </g>
        );
      })}
    </g>
  );
}

function Bud({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r * 0.38} ry={r * 0.56} fill="#F9C6D0" opacity={0.9} />
      <ellipse cx={0} cy={r * 0.08} rx={r * 0.26} ry={r * 0.36} fill="#F4A7B9" opacity={0.65} />
      <ellipse cx={-r * 0.18} cy={r * 0.4} rx={r * 0.14} ry={r * 0.22}
        fill="#A8D5B5" opacity={0.8} transform={`rotate(-22 ${-r * 0.18} ${r * 0.4})`} />
      <ellipse cx={r * 0.18} cy={r * 0.4} rx={r * 0.14} ry={r * 0.22}
        fill="#A8D5B5" opacity={0.8} transform={`rotate(22 ${r * 0.18} ${r * 0.4})`} />
    </g>
  );
}

function Leaf({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r * 0.28} ry={r * 0.64} fill="#B2D8B2" opacity={0.85} />
      <ellipse cx={0} cy={0} rx={r * 0.13} ry={r * 0.52} fill="#A8D5B5" opacity={0.55} />
      <line x1={0} y1={-r * 0.58} x2={0} y2={r * 0.58}
        stroke="#8FBC8F" strokeWidth="0.5" opacity={0.5} />
    </g>
  );
}

function Stem({ x1, y1, x2, y2, qx, qy }: { x1:number; y1:number; x2:number; y2:number; qx:number; qy:number }) {
  return (
    <path d={`M${x1},${y1} Q${qx},${qy} ${x2},${y2}`}
      stroke="#C8DFC8" strokeWidth="0.85" fill="none" opacity={0.75} />
  );
}

export default function CLCLogo({ size = 60, showText = false }: LogoProps) {
  const s = size;
  // Use 220×220 internal viewBox for room around the diamond corners (flowers overflow)
  const V = 220;
  const cx = V / 2; // 110
  const cy = V / 2; // 110

  // Diamond corners (relative to 220×220)
  const TOP   = { x: cx,      y: 10  };
  const RIGHT = { x: V - 10,  y: cy  };
  const BOT   = { x: cx,      y: V - 10 };
  const LEFT  = { x: 10,      y: cy  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={s} height={s} viewBox={`0 0 ${V} ${V}`} xmlns="http://www.w3.org/2000/svg">

        {/* White background circle */}
        <circle cx={cx} cy={cy} r={90} fill="white" opacity={0.97} />

        {/* ── Outer diamond frame ── */}
        <path d={`M${TOP.x},${TOP.y} L${RIGHT.x},${RIGHT.y} L${BOT.x},${BOT.y} L${LEFT.x},${LEFT.y} Z`}
          fill="none" stroke="#D4C0C2" strokeWidth="1.3" />

        {/* ── Inner diamond frame ── */}
        <path d={`M${cx},24 L${V-24},${cy} L${cx},${V-24} L24,${cy} Z`}
          fill="none" stroke="#E8D0D3" strokeWidth="0.7" />

        {/* ── Mint ribbon ── */}
        <path d={`M28,${cy - 11} L${V - 28},${cy - 11} L${V - 28},${cy + 11} L28,${cy + 11} Z`}
          fill="#A8D5BE" opacity={0.72} />
        {/* Ribbon pointed left end */}
        <path d={`M28,${cy - 11} L16,${cy} L28,${cy + 11} Z`} fill="#A8D5BE" opacity={0.72} />
        {/* Ribbon pointed right end */}
        <path d={`M${V - 28},${cy - 11} L${V - 16},${cy} L${V - 28},${cy + 11} Z`}
          fill="#A8D5BE" opacity={0.72} />

        {/* "Crystal Lynn" on ribbon */}
        <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize="9.5"
          fill="white" fontFamily="'Dancing Script', 'Brush Script MT', Georgia, serif"
          fontWeight="600" letterSpacing="0.6" opacity={0.97}>
          Crystal Lynn
        </text>

        {/* ── Large C ── */}
        <text x="84" y="122" textAnchor="middle" fontSize="74"
          fill="#3D2B2B" fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic" fontWeight="400" opacity={0.87}>C</text>

        {/* ── Large L ── */}
        <text x="133" y="122" textAnchor="middle" fontSize="74"
          fill="#3D2B2B" fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic" fontWeight="400" opacity={0.87}>L</text>

        {/* "creates" below ribbon */}
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="7.5"
          fill="#6B4E4E" fontFamily="Georgia, serif" letterSpacing="3.8">
          creates
        </text>

        {/* ════════════════════════════════════
            TOP CORNER FLOWER CLUSTER
            Stems radiate upward from the top point of the diamond
        ════════════════════════════════════ */}
        {/* main stems */}
        <Stem x1={TOP.x} y1={TOP.y} x2={TOP.x - 22} y2={TOP.y - 22} qx={TOP.x - 8}  qy={TOP.y - 10} />
        <Stem x1={TOP.x} y1={TOP.y} x2={TOP.x}      y2={TOP.y - 26} qx={TOP.x}      qy={TOP.y - 14} />
        <Stem x1={TOP.x} y1={TOP.y} x2={TOP.x + 22} y2={TOP.y - 22} qx={TOP.x + 8}  qy={TOP.y - 10} />
        <Stem x1={TOP.x - 22} y1={TOP.y - 22} x2={TOP.x - 36} y2={TOP.y - 16} qx={TOP.x - 28} qy={TOP.y - 22} />
        <Stem x1={TOP.x + 22} y1={TOP.y - 22} x2={TOP.x + 36} y2={TOP.y - 16} qx={TOP.x + 28} qy={TOP.y - 22} />
        <Stem x1={TOP.x - 22} y1={TOP.y - 22} x2={TOP.x - 30} y2={TOP.y - 34} qx={TOP.x - 26} qy={TOP.y - 28} />
        <Stem x1={TOP.x + 22} y1={TOP.y + -22} x2={TOP.x + 30} y2={TOP.y - 34} qx={TOP.x + 26} qy={TOP.y - 28} />
        {/* blossoms */}
        <Blossom x={TOP.x}      y={TOP.y - 28} r={9}   rotate={10} />
        <Blossom x={TOP.x - 23} y={TOP.y - 26} r={10}  rotate={-18} />
        <Blossom x={TOP.x + 23} y={TOP.y - 26} r={9}   rotate={22} />
        <Blossom x={TOP.x - 38} y={TOP.y - 18} r={7.5} rotate={-30} />
        <Blossom x={TOP.x + 38} y={TOP.y - 18} r={7.5} rotate={32} />
        <Blossom x={TOP.x - 32} y={TOP.y - 37} r={6.5} rotate={-12} />
        <Blossom x={TOP.x + 32} y={TOP.y - 37} r={6}   rotate={15} />
        {/* buds */}
        <Bud x={TOP.x - 14} y={TOP.y - 20} r={5} rotate={-8} />
        <Bud x={TOP.x + 14} y={TOP.y - 20} r={4.5} rotate={10} />
        <Bud x={TOP.x - 44} y={TOP.y - 10} r={4} rotate={-25} />
        <Bud x={TOP.x + 44} y={TOP.y - 10} r={4} rotate={25} />
        {/* leaves */}
        <Leaf x={TOP.x - 16} y={TOP.y - 6}  r={9} rotate={-65} />
        <Leaf x={TOP.x + 16} y={TOP.y - 6}  r={9} rotate={65} />
        <Leaf x={TOP.x - 30} y={TOP.y - 10} r={8} rotate={-50} />
        <Leaf x={TOP.x + 30} y={TOP.y - 10} r={8} rotate={50} />

        {/* ════════════════════════════════════
            BOTTOM CORNER FLOWER CLUSTER
        ════════════════════════════════════ */}
        <Stem x1={BOT.x} y1={BOT.y} x2={BOT.x - 22} y2={BOT.y + 22} qx={BOT.x - 8}  qy={BOT.y + 10} />
        <Stem x1={BOT.x} y1={BOT.y} x2={BOT.x}      y2={BOT.y + 26} qx={BOT.x}      qy={BOT.y + 14} />
        <Stem x1={BOT.x} y1={BOT.y} x2={BOT.x + 22} y2={BOT.y + 22} qx={BOT.x + 8}  qy={BOT.y + 10} />
        <Stem x1={BOT.x - 22} y1={BOT.y + 22} x2={BOT.x - 36} y2={BOT.y + 16} qx={BOT.x - 28} qy={BOT.y + 22} />
        <Stem x1={BOT.x + 22} y1={BOT.y + 22} x2={BOT.x + 36} y2={BOT.y + 16} qx={BOT.x + 28} qy={BOT.y + 22} />
        <Blossom x={BOT.x}      y={BOT.y + 28} r={9}   rotate={-10} />
        <Blossom x={BOT.x - 23} y={BOT.y + 26} r={10}  rotate={18} />
        <Blossom x={BOT.x + 23} y={BOT.y + 26} r={9}   rotate={-22} />
        <Blossom x={BOT.x - 38} y={BOT.y + 18} r={7.5} rotate={28} />
        <Blossom x={BOT.x + 38} y={BOT.y + 18} r={7.5} rotate={-30} />
        <Bud x={BOT.x - 14} y={BOT.y + 20} r={5}   rotate={8} />
        <Bud x={BOT.x + 14} y={BOT.y + 20} r={4.5} rotate={-10} />
        <Leaf x={BOT.x - 16} y={BOT.y + 6}  r={9} rotate={65} />
        <Leaf x={BOT.x + 16} y={BOT.y + 6}  r={9} rotate={-65} />
        <Leaf x={BOT.x - 30} y={BOT.y + 10} r={8} rotate={55} />
        <Leaf x={BOT.x + 30} y={BOT.y + 10} r={8} rotate={-55} />

        {/* ════════════════════════════════════
            LEFT CORNER SMALL CLUSTER
        ════════════════════════════════════ */}
        <Stem x1={LEFT.x} y1={LEFT.y} x2={LEFT.x - 20} y2={LEFT.y - 16} qx={LEFT.x - 8}  qy={LEFT.y - 8} />
        <Stem x1={LEFT.x} y1={LEFT.y} x2={LEFT.x - 22} y2={LEFT.y + 14} qx={LEFT.x - 10} qy={LEFT.y + 6} />
        <Blossom x={LEFT.x - 20} y={LEFT.y - 19} r={8}   rotate={-28} />
        <Blossom x={LEFT.x - 22} y={LEFT.y + 17} r={8}   rotate={20} />
        <Bud     x={LEFT.x - 28} y={LEFT.y}       r={5}   rotate={0} />
        <Leaf    x={LEFT.x - 10} y={LEFT.y - 8}   r={8}   rotate={-80} />
        <Leaf    x={LEFT.x - 10} y={LEFT.y + 8}   r={8}   rotate={80} />

        {/* ════════════════════════════════════
            RIGHT CORNER SMALL CLUSTER
        ════════════════════════════════════ */}
        <Stem x1={RIGHT.x} y1={RIGHT.y} x2={RIGHT.x + 20} y2={RIGHT.y - 16} qx={RIGHT.x + 8}  qy={RIGHT.y - 8} />
        <Stem x1={RIGHT.x} y1={RIGHT.y} x2={RIGHT.x + 22} y2={RIGHT.y + 14} qx={RIGHT.x + 10} qy={RIGHT.y + 6} />
        <Blossom x={RIGHT.x + 20} y={RIGHT.y - 19} r={8}   rotate={28} />
        <Blossom x={RIGHT.x + 22} y={RIGHT.y + 17} r={8}   rotate={-20} />
        <Bud     x={RIGHT.x + 28} y={RIGHT.y}       r={5}   rotate={0} />
        <Leaf    x={RIGHT.x + 10} y={RIGHT.y - 8}   r={8}   rotate={80} />
        <Leaf    x={RIGHT.x + 10} y={RIGHT.y + 8}   r={8}   rotate={-80} />

      </svg>

      {showText && (
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <p style={{ color: '#00A86B', fontWeight: 700, fontSize: 13, letterSpacing: 4 }}>CLC</p>
          <p style={{ color: '#4CAF82', fontSize: 10, letterSpacing: 3 }}>PREMIERE STUDIOS</p>
        </div>
      )}
    </div>
  );
}
