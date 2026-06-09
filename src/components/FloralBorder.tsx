// Cherry blossom border — matches the flowers in the Crystal Lynn Creates logo

interface BlossomProps {
  x: number;
  y: number;
  size?: number;
  rotate?: number;
  opacity?: number;
}

function Blossom({ x, y, size = 22, rotate = 0, opacity = 0.85 }: BlossomProps) {
  const r = size / 2;
  // 5-petal cherry blossom, each petal is an ellipse rotated around center
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {petals.map((deg, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={-r * 0.65}
          rx={r * 0.42}
          ry={r * 0.6}
          fill="#FFB7C5"
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Darker pink inner petals */}
      {petals.map((deg, i) => (
        <ellipse
          key={`inner-${i}`}
          cx={0}
          cy={-r * 0.55}
          rx={r * 0.2}
          ry={r * 0.28}
          fill="#FF8FAB"
          opacity={0.6}
          transform={`rotate(${deg})`}
        />
      ))}
      {/* Center */}
      <circle cx={0} cy={0} r={r * 0.18} fill="#FFF0F3" />
      <circle cx={0} cy={0} r={r * 0.1} fill="#FFD6E0" />
      {/* Stamens */}
      {petals.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={`s-${i}`}
            cx={Math.sin(rad) * r * 0.22}
            cy={-Math.cos(rad) * r * 0.22}
            r={r * 0.06}
            fill="#F9A8D4"
          />
        );
      })}
    </g>
  );
}

function Leaf({ x, y, rotate = 0, size = 14, opacity = 0.75 }: BlossomProps) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      <ellipse cx={0} cy={0} rx={size * 0.35} ry={size * 0.7} fill="#86EFAC" />
      <line x1={0} y1={-size * 0.65} x2={0} y2={size * 0.65} stroke="#4ADE80" strokeWidth={0.8} opacity={0.5} />
    </g>
  );
}

export default function FloralBorder() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>

        {/* ── TOP EDGE ── */}
        <Blossom x={30}  y={18} size={28} rotate={15}  opacity={0.8} />
        <Blossom x={70}  y={10} size={20} rotate={-20} opacity={0.7} />
        <Blossom x={110} y={22} size={24} rotate={30}  opacity={0.75}/>
        <Blossom x={150} y={8}  size={18} rotate={-10} opacity={0.65}/>
        <Blossom x={190} y={20} size={26} rotate={45}  opacity={0.8} />
        <Blossom x={240} y={12} size={20} rotate={-30} opacity={0.7} />
        <Blossom x={290} y={25} size={22} rotate={20}  opacity={0.75}/>
        <Blossom x={340} y={10} size={18} rotate={-15} opacity={0.65}/>
        <Blossom x={390} y={22} size={24} rotate={35}  opacity={0.8} />
        <Blossom x={440} y={8}  size={20} rotate={-25} opacity={0.7} />
        <Blossom x={490} y={20} size={26} rotate={15}  opacity={0.75}/>
        <Blossom x={540} y={10} size={18} rotate={-40} opacity={0.65}/>
        <Blossom x={590} y={24} size={22} rotate={25}  opacity={0.8} />
        <Blossom x={640} y={8}  size={20} rotate={-10} opacity={0.7} />
        <Blossom x={690} y={22} size={24} rotate={40}  opacity={0.75}/>
        <Blossom x={740} y={10} size={18} rotate={-20} opacity={0.65}/>
        <Blossom x={790} y={20} size={26} rotate={15}  opacity={0.8} />
        <Blossom x={840} y={8}  size={20} rotate={-35} opacity={0.7} />
        <Blossom x={890} y={24} size={22} rotate={30}  opacity={0.75}/>
        <Blossom x={940} y={10} size={18} rotate={-15} opacity={0.65}/>
        <Blossom x={990} y={20} size={24} rotate={20}  opacity={0.8} />
        <Blossom x={1040}y={8}  size={20} rotate={-30} opacity={0.7} />
        <Blossom x={1090}y={22} size={26} rotate={10}  opacity={0.75}/>
        <Blossom x={1140}y={10} size={18} rotate={-20} opacity={0.65}/>
        <Blossom x={1190}y={20} size={22} rotate={35}  opacity={0.8} />
        <Blossom x={1240}y={8}  size={20} rotate={-10} opacity={0.7} />

        {/* Top leaves */}
        <Leaf x={50}  y={14} rotate={30}  size={16} />
        <Leaf x={130} y={10} rotate={-20} size={14} />
        <Leaf x={215} y={16} rotate={45}  size={16} />
        <Leaf x={315} y={8}  rotate={-35} size={14} />
        <Leaf x={415} y={14} rotate={25}  size={16} />
        <Leaf x={515} y={8}  rotate={-15} size={14} />
        <Leaf x={615} y={16} rotate={40}  size={16} />
        <Leaf x={715} y={8}  rotate={-25} size={14} />
        <Leaf x={815} y={14} rotate={20}  size={16} />
        <Leaf x={915} y={8}  rotate={-40} size={14} />
        <Leaf x={1015}y={16} rotate={30}  size={16} />
        <Leaf x={1115}y={8}  rotate={-20} size={14} />

        {/* ── BOTTOM EDGE ── */}
        <Blossom x={30}  y={960} size={28} rotate={-15} opacity={0.8} />
        <Blossom x={80}  y={970} size={20} rotate={20}  opacity={0.7} />
        <Blossom x={130} y={958} size={24} rotate={-30} opacity={0.75}/>
        <Blossom x={180} y={968} size={18} rotate={10}  opacity={0.65}/>
        <Blossom x={230} y={960} size={26} rotate={-45} opacity={0.8} />
        <Blossom x={290} y={970} size={20} rotate={30}  opacity={0.7} />
        <Blossom x={350} y={955} size={22} rotate={-20} opacity={0.75}/>
        <Blossom x={410} y={968} size={18} rotate={15}  opacity={0.65}/>
        <Blossom x={470} y={958} size={24} rotate={-35} opacity={0.8} />
        <Blossom x={530} y={970} size={20} rotate={25}  opacity={0.7} />
        <Blossom x={590} y={960} size={26} rotate={-15} opacity={0.75}/>
        <Blossom x={650} y={968} size={18} rotate={40}  opacity={0.65}/>
        <Blossom x={710} y={958} size={22} rotate={-25} opacity={0.8} />
        <Blossom x={770} y={970} size={20} rotate={10}  opacity={0.7} />
        <Blossom x={830} y={960} size={24} rotate={-40} opacity={0.75}/>
        <Blossom x={890} y={968} size={18} rotate={20}  opacity={0.65}/>
        <Blossom x={950} y={958} size={26} rotate={-15} opacity={0.8} />
        <Blossom x={1010}y={970} size={20} rotate={35}  opacity={0.7} />
        <Blossom x={1070}y={960} size={22} rotate={-30} opacity={0.75}/>
        <Blossom x={1130}y={968} size={18} rotate={15}  opacity={0.65}/>
        <Blossom x={1190}y={958} size={24} rotate={-20} opacity={0.8} />
        <Blossom x={1240}y={970} size={20} rotate={30}  opacity={0.7} />

        {/* ── LEFT EDGE ── */}
        <Blossom x={10} y={80}  size={24} rotate={20}  opacity={0.75}/>
        <Blossom x={18} y={130} size={20} rotate={-30} opacity={0.7} />
        <Blossom x={8}  y={185} size={26} rotate={15}  opacity={0.8} />
        <Blossom x={20} y={240} size={18} rotate={-20} opacity={0.65}/>
        <Blossom x={10} y={295} size={22} rotate={35}  opacity={0.75}/>
        <Blossom x={18} y={350} size={20} rotate={-10} opacity={0.7} />
        <Blossom x={8}  y={405} size={24} rotate={25}  opacity={0.8} />
        <Blossom x={20} y={460} size={18} rotate={-35} opacity={0.65}/>
        <Blossom x={10} y={515} size={26} rotate={20}  opacity={0.75}/>
        <Blossom x={18} y={570} size={20} rotate={-15} opacity={0.7} />
        <Blossom x={8}  y={625} size={22} rotate={40}  opacity={0.8} />
        <Blossom x={20} y={680} size={18} rotate={-25} opacity={0.65}/>
        <Blossom x={10} y={735} size={24} rotate={15}  opacity={0.75}/>
        <Blossom x={18} y={790} size={20} rotate={-40} opacity={0.7} />
        <Blossom x={8}  y={845} size={26} rotate={30}  opacity={0.8} />
        <Blossom x={20} y={900} size={18} rotate={-20} opacity={0.65}/>

        {/* Left leaves */}
        <Leaf x={14} y={105} rotate={80}  size={16} />
        <Leaf x={14} y={210} rotate={-75} size={14} />
        <Leaf x={14} y={320} rotate={85}  size={16} />
        <Leaf x={14} y={435} rotate={-80} size={14} />
        <Leaf x={14} y={545} rotate={75}  size={16} />
        <Leaf x={14} y={655} rotate={-85} size={14} />
        <Leaf x={14} y={760} rotate={80}  size={16} />
        <Leaf x={14} y={870} rotate={-75} size={14} />

        {/* ── RIGHT EDGE ── */}
        <Blossom x={1250} y={80}  size={24} rotate={-20} opacity={0.75}/>
        <Blossom x={1242} y={135} size={20} rotate={30}  opacity={0.7} />
        <Blossom x={1252} y={190} size={26} rotate={-15} opacity={0.8} />
        <Blossom x={1240} y={245} size={18} rotate={20}  opacity={0.65}/>
        <Blossom x={1250} y={300} size={22} rotate={-35} opacity={0.75}/>
        <Blossom x={1242} y={355} size={20} rotate={10}  opacity={0.7} />
        <Blossom x={1252} y={410} size={24} rotate={-25} opacity={0.8} />
        <Blossom x={1240} y={465} size={18} rotate={35}  opacity={0.65}/>
        <Blossom x={1250} y={520} size={26} rotate={-20} opacity={0.75}/>
        <Blossom x={1242} y={575} size={20} rotate={15}  opacity={0.7} />
        <Blossom x={1252} y={630} size={22} rotate={-40} opacity={0.8} />
        <Blossom x={1240} y={685} size={18} rotate={25}  opacity={0.65}/>
        <Blossom x={1250} y={740} size={24} rotate={-15} opacity={0.75}/>
        <Blossom x={1242} y={795} size={20} rotate={40}  opacity={0.7} />
        <Blossom x={1252} y={850} size={26} rotate={-30} opacity={0.8} />
        <Blossom x={1240} y={905} size={18} rotate={20}  opacity={0.65}/>

        {/* Right leaves */}
        <Leaf x={1246} y={108} rotate={-80} size={16} />
        <Leaf x={1246} y={215} rotate={75}  size={14} />
        <Leaf x={1246} y={325} rotate={-85} size={16} />
        <Leaf x={1246} y={440} rotate={80}  size={14} />
        <Leaf x={1246} y={550} rotate={-75} size={16} />
        <Leaf x={1246} y={660} rotate={85}  size={14} />
        <Leaf x={1246} y={765} rotate={-80} size={16} />
        <Leaf x={1246} y={875} rotate={75}  size={14} />

        {/* ── CORNERS — extra cluster ── */}
        {/* Top-left */}
        <Blossom x={18} y={42} size={30} rotate={10}  opacity={0.85}/>
        <Blossom x={55} y={32} size={22} rotate={-20} opacity={0.8} />
        <Blossom x={42} y={58} size={18} rotate={35}  opacity={0.7} />
        <Leaf x={30}   y={48} rotate={40}  size={18} />

        {/* Top-right */}
        <Blossom x={1238} y={42} size={30} rotate={-10} opacity={0.85}/>
        <Blossom x={1200} y={32} size={22} rotate={20}  opacity={0.8} />
        <Blossom x={1215} y={58} size={18} rotate={-35} opacity={0.7} />
        <Leaf x={1225}    y={48} rotate={-40} size={18} />

        {/* Bottom-left */}
        <Blossom x={18} y={935} size={30} rotate={-10} opacity={0.85}/>
        <Blossom x={55} y={945} size={22} rotate={20}  opacity={0.8} />
        <Blossom x={42} y={918} size={18} rotate={-35} opacity={0.7} />
        <Leaf x={30}    y={930} rotate={-40} size={18} />

        {/* Bottom-right */}
        <Blossom x={1238} y={935} size={30} rotate={10}  opacity={0.85}/>
        <Blossom x={1200} y={945} size={22} rotate={-20} opacity={0.8} />
        <Blossom x={1215} y={918} size={18} rotate={35}  opacity={0.7} />
        <Leaf x={1225}    y={930} rotate={40}  size={18} />

      </svg>
    </div>
  );
}
