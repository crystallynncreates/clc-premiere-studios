// Floral border — exact style from Crystal Lynn Creates logo
// Soft watercolor cherry blossoms, small buds, green leaves, thin stems

function Petal({ cx, cy, rx, ry, rotate, color }: { cx:number; cy:number; rx:number; ry:number; rotate:number; color:string }) {
  return (
    <ellipse
      cx={cx} cy={cy} rx={rx} ry={ry}
      fill={color}
      opacity={0.88}
      transform={`rotate(${rotate} ${cx} ${cy})`}
    />
  );
}

// Full open blossom — 5 petals, exactly like logo
function Blossom({ x, y, size = 18, rotate = 0, opacity = 1 }: { x:number; y:number; size?:number; rotate?:number; opacity?:number }) {
  const r = size;
  const petalColor1 = "#F9C6D0"; // light pink
  const petalColor2 = "#F4A7B9"; // medium pink center
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {/* 5 outer petals */}
      {[0,72,144,216,288].map((deg,i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.55;
        const py = -Math.cos(rad) * r * 0.55;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r*0.38} ry={r*0.52}
            fill={petalColor1} opacity={0.9}
            transform={`rotate(${deg} ${px} ${py})`}
          />
        );
      })}
      {/* Inner petal shading */}
      {[0,72,144,216,288].map((deg,i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.32;
        const py = -Math.cos(rad) * r * 0.32;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r*0.18} ry={r*0.28}
            fill={petalColor2} opacity={0.5}
            transform={`rotate(${deg} ${px} ${py})`}
          />
        );
      })}
      {/* Center */}
      <circle cx={0} cy={0} r={r*0.18} fill="#FFF0F5" />
      <circle cx={0} cy={0} r={r*0.1}  fill="#FADADD" />
      {/* Stamens */}
      {[0,60,120,180,240,300].map((deg,i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={0} y1={0}
              x2={Math.sin(rad)*r*0.28} y2={-Math.cos(rad)*r*0.28}
              stroke="#F4A7B9" strokeWidth="0.6" opacity={0.7}
            />
            <circle cx={Math.sin(rad)*r*0.28} cy={-Math.cos(rad)*r*0.28}
              r={r*0.055} fill="#F9C6D0" />
          </g>
        );
      })}
    </g>
  );
}

// Small bud — like the ones in the logo
function Bud({ x, y, size = 8, rotate = 0 }: { x:number; y:number; size?:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={size*0.38} ry={size*0.55} fill="#F9C6D0" opacity={0.9} />
      <ellipse cx={0} cy={size*0.1} rx={size*0.28} ry={size*0.38} fill="#F4A7B9" opacity={0.7} />
      {/* sepal */}
      <ellipse cx={-size*0.18} cy={size*0.38} rx={size*0.14} ry={size*0.22} fill="#A8D5B5" opacity={0.8} transform={`rotate(-20 ${-size*0.18} ${size*0.38})`} />
      <ellipse cx={size*0.18}  cy={size*0.38} rx={size*0.14} ry={size*0.22} fill="#A8D5B5" opacity={0.8} transform={`rotate(20 ${size*0.18} ${size*0.38})`} />
    </g>
  );
}

// Leaf — narrow, pointed, like logo
function Leaf({ x, y, size = 14, rotate = 0 }: { x:number; y:number; size?:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={size*0.28} ry={size*0.62} fill="#B2D8B2" opacity={0.85} />
      <ellipse cx={0} cy={0} rx={size*0.14} ry={size*0.52} fill="#A8D5B5" opacity={0.6} />
      <line x1={0} y1={-size*0.58} x2={0} y2={size*0.58} stroke="#8FBC8F" strokeWidth="0.6" opacity={0.5} />
    </g>
  );
}

// Thin stem/vine line
function Stem({ x1,y1,x2,y2 }: { x1:number; y1:number; x2:number; y2:number }) {
  return <path d={`M${x1},${y1} Q${(x1+x2)/2+8},${(y1+y2)/2-8} ${x2},${y2}`}
    stroke="#C8DFC8" strokeWidth="1" fill="none" opacity={0.7} />;
}

// A cluster — blossoms + buds + leaves grouped together
function Cluster({ x, y, rotate = 0, scale = 1 }: { x:number; y:number; rotate?:number; scale?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      {/* stems */}
      <Stem x1={0} y1={0} x2={-22} y2={-18} />
      <Stem x1={0} y1={0} x2={20}  y2={-22} />
      <Stem x1={0} y1={0} x2={-8}  y2={-32} />
      <Stem x1={0} y1={0} x2={28}  y2={-8}  />
      <Stem x1={0} y1={0} x2={-28} y2={4}   />
      {/* blossoms */}
      <Blossom x={-22} y={-24} size={16} rotate={-15} />
      <Blossom x={22}  y={-28} size={20} rotate={20}  />
      <Blossom x={-6}  y={-40} size={14} rotate={-30} />
      <Blossom x={32}  y={-10} size={12} rotate={10}  />
      {/* buds */}
      <Bud x={-30} y={-8}  size={9}  rotate={-20} />
      <Bud x={10}  y={-50} size={8}  rotate={15}  />
      <Bud x={38}  y={12}  size={7}  rotate={30}  />
      {/* leaves */}
      <Leaf x={-18} y={8}   size={16} rotate={-50} />
      <Leaf x={14}  y={6}   size={14} rotate={40}  />
      <Leaf x={-32} y={-30} size={12} rotate={-70} />
      <Leaf x={30}  y={-32} size={13} rotate={60}  />
    </g>
  );
}

// Smaller trailing cluster for edges
function MiniCluster({ x, y, rotate = 0 }: { x:number; y:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <Stem x1={0} y1={0} x2={-14} y2={-12} />
      <Stem x1={0} y1={0} x2={12}  y2={-14} />
      <Stem x1={0} y1={0} x2={0}   y2={-22} />
      <Blossom x={-14} y={-16} size={13} rotate={-20} />
      <Blossom x={14}  y={-18} size={15} rotate={15}  />
      <Bud x={2}   y={-26} size={7}  rotate={-10} />
      <Bud x={-22} y={-4}  size={6}  rotate={20}  />
      <Leaf x={-10} y={5}  size={12} rotate={-45} />
      <Leaf x={10}  y={5}  size={11} rotate={50}  />
    </g>
  );
}

export default function FloralBorder() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 1280 960"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%' }}>

        {/* ═══ TOP-LEFT CORNER — main cluster ═══ */}
        <Cluster x={55}  y={90}  rotate={15}  scale={1.2} />
        <MiniCluster x={110} y={50}  rotate={30}  />
        <MiniCluster x={25}  y={145} rotate={-10} />

        {/* ═══ TOP-RIGHT CORNER ═══ */}
        <Cluster x={1225} y={90}  rotate={-15} scale={1.2} />
        <MiniCluster x={1170} y={50}  rotate={-30} />
        <MiniCluster x={1250} y={148} rotate={10}  />

        {/* ═══ BOTTOM-LEFT CORNER ═══ */}
        <Cluster x={55}   y={875} rotate={-20} scale={1.2} />
        <MiniCluster x={110}  y={920} rotate={-35} />
        <MiniCluster x={25}   y={820} rotate={10}  />

        {/* ═══ BOTTOM-RIGHT CORNER ═══ */}
        <Cluster x={1225} y={875} rotate={20}  scale={1.2} />
        <MiniCluster x={1170} y={920} rotate={35}  />
        <MiniCluster x={1250} y={820} rotate={-10} />

        {/* ═══ TOP EDGE — spaced mini clusters ═══ */}
        <MiniCluster x={260}  y={42} rotate={5}   />
        <MiniCluster x={420}  y={38} rotate={-8}  />
        <MiniCluster x={580}  y={44} rotate={12}  />
        <MiniCluster x={700}  y={36} rotate={-5}  />
        <MiniCluster x={860}  y={42} rotate={8}   />
        <MiniCluster x={1020} y={38} rotate={-12} />

        {/* ═══ BOTTOM EDGE ═══ */}
        <MiniCluster x={260}  y={928} rotate={-5}  />
        <MiniCluster x={420}  y={932} rotate={8}   />
        <MiniCluster x={580}  y={926} rotate={-12} />
        <MiniCluster x={700}  y={934} rotate={5}   />
        <MiniCluster x={860}  y={928} rotate={-8}  />
        <MiniCluster x={1020} y={932} rotate={12}  />

        {/* ═══ LEFT EDGE ═══ */}
        <MiniCluster x={32} y={280} rotate={90}  />
        <MiniCluster x={28} y={420} rotate={85}  />
        <MiniCluster x={32} y={560} rotate={95}  />
        <MiniCluster x={28} y={700} rotate={88}  />

        {/* ═══ RIGHT EDGE ═══ */}
        <MiniCluster x={1248} y={280} rotate={-90} />
        <MiniCluster x={1252} y={420} rotate={-85} />
        <MiniCluster x={1248} y={560} rotate={-95} />
        <MiniCluster x={1252} y={700} rotate={-88} />

      </svg>
    </div>
  );
}
