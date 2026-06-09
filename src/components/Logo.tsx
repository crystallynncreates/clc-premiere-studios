interface LogoProps { size?: number; showText?: boolean; }

// Blossom helper for logo
function LogoBlossom({ x, y, r, rotate=0 }: { x:number; y:number; r:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      {[0,72,144,216,288].map((deg,i) => {
        const rad = (deg*Math.PI)/180;
        const px = Math.sin(rad)*r*0.55;
        const py = -Math.cos(rad)*r*0.55;
        return <ellipse key={i} cx={px} cy={py} rx={r*0.38} ry={r*0.52}
          fill="#F9C6D0" opacity={0.9} transform={`rotate(${deg} ${px} ${py})`}/>;
      })}
      <circle cx={0} cy={0} r={r*0.18} fill="#FFF0F5"/>
      <circle cx={0} cy={0} r={r*0.1}  fill="#FADADD"/>
    </g>
  );
}
function LogoBud({ x, y, r, rotate=0 }: { x:number; y:number; r:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r*0.4} ry={r*0.6} fill="#F9C6D0" opacity={0.9}/>
      <ellipse cx={-r*0.2} cy={r*0.4} rx={r*0.15} ry={r*0.25} fill="#B2D8B2" opacity={0.8} transform={`rotate(-20 ${-r*0.2} ${r*0.4})`}/>
      <ellipse cx={ r*0.2} cy={r*0.4} rx={r*0.15} ry={r*0.25} fill="#B2D8B2" opacity={0.8} transform={`rotate(20 ${r*0.2} ${r*0.4})`}/>
    </g>
  );
}
function LogoLeaf({ x, y, r, rotate=0 }: { x:number; y:number; r:number; rotate?:number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r*0.3} ry={r*0.65} fill="#B2D8B2" opacity={0.85}/>
    </g>
  );
}

export default function CLCLogo({ size = 60, showText = false }: LogoProps) {
  const s = size;
  const cx = s/2, cy = s/2;
  // scale factor relative to 200px viewBox
  const sc = s/200;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width={s} height={s} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

        {/* White background circle */}
        <circle cx="100" cy="100" r="92" fill="white" opacity="0.95"/>

        {/* Outer diamond frame — thin, elegant */}
        <path d="M100 8 L192 100 L100 192 L8 100 Z"
          fill="none" stroke="#D4C5C7" strokeWidth="1.2"/>
        {/* Inner diamond frame */}
        <path d="M100 20 L180 100 L100 180 L20 100 Z"
          fill="none" stroke="#E8D8DA" strokeWidth="0.7"/>

        {/* Mint/jade ribbon across middle */}
        <path d="M24 93 L176 93 L176 113 L24 113 Z" fill="#A8D5BE" opacity="0.7"/>
        {/* Ribbon pointed ends */}
        <path d="M24 93 L14 103 L24 113 Z" fill="#A8D5BE" opacity="0.7"/>
        <path d="M176 93 L186 103 L176 113 Z" fill="#A8D5BE" opacity="0.7"/>
        {/* Crystal Lynn text on ribbon */}
        <text x="100" y="105" textAnchor="middle" fontSize="9"
          fill="white" fontFamily="'Dancing Script', Georgia, serif"
          fontWeight="600" letterSpacing="0.5" opacity="0.95">
          Crystal Lynn
        </text>

        {/* Large C — italic serif */}
        <text x="78" y="112" textAnchor="middle" fontSize="68"
          fill="#3D2B2B" fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic" fontWeight="400" opacity="0.88">C</text>

        {/* Large L — italic serif, overlapping C */}
        <text x="122" y="112" textAnchor="middle" fontSize="68"
          fill="#3D2B2B" fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic" fontWeight="400" opacity="0.88">L</text>

        {/* "creates" below ribbon */}
        <text x="100" y="130" textAnchor="middle" fontSize="7.5"
          fill="#6B4E4E" fontFamily="Georgia, serif" letterSpacing="3.5">
          creates
        </text>

        {/* ── TOP floral cluster ── */}
        {/* stems */}
        <path d="M100,38 Q92,30 82,28" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M100,38 Q108,30 118,28" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M100,38 Q100,28 100,22" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M82,28 Q74,24 68,20" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <path d="M118,28 Q126,24 132,20" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        {/* blossoms */}
        <LogoBlossom x={100} y={22} r={7} rotate={10}/>
        <LogoBlossom x={80}  y={24} r={8} rotate={-15}/>
        <LogoBlossom x={120} y={24} r={7} rotate={20}/>
        <LogoBlossom x={66}  y={17} r={6} rotate={-25}/>
        <LogoBlossom x={134} y={17} r={6} rotate={30}/>
        {/* buds */}
        <LogoBud x={88}  y={16} r={4.5} rotate={-10}/>
        <LogoBud x={112} y={16} r={4}   rotate={10}/>
        {/* leaves */}
        <LogoLeaf x={74}  y={28} r={8} rotate={-60}/>
        <LogoLeaf x={126} y={28} r={8} rotate={60}/>
        <LogoLeaf x={100} y={34} r={7} rotate={0}/>

        {/* ── BOTTOM floral cluster ── */}
        <path d="M100,162 Q92,170 82,172" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M100,162 Q108,170 118,172" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M100,162 Q100,172 100,178" stroke="#C8DFC8" strokeWidth="0.9" fill="none"/>
        <path d="M82,172 Q74,176 68,180" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <path d="M118,172 Q126,176 132,180" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <LogoBlossom x={100} y={178} r={7}   rotate={-10}/>
        <LogoBlossom x={80}  y={176} r={8}   rotate={15}/>
        <LogoBlossom x={120} y={176} r={7}   rotate={-20}/>
        <LogoBlossom x={66}  y={183} r={6}   rotate={25}/>
        <LogoBlossom x={134} y={183} r={6}   rotate={-30}/>
        <LogoBud x={88}  y={184} r={4.5} rotate={10}/>
        <LogoBud x={112} y={184} r={4}   rotate={-10}/>
        <LogoLeaf x={74}  y={172} r={8} rotate={60}/>
        <LogoLeaf x={126} y={172} r={8} rotate={-60}/>
        <LogoLeaf x={100} y={166} r={7} rotate={0}/>

        {/* ── LEFT small cluster ── */}
        <path d="M28,100 Q20,92 16,86" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <path d="M28,100 Q20,108 16,114" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <LogoBlossom x={14} y={84}  r={6} rotate={-30}/>
        <LogoBlossom x={14} y={116} r={6} rotate={30}/>
        <LogoBud     x={10} y={100} r={4} rotate={0}/>
        <LogoLeaf    x={22} y={94}  r={7} rotate={-80}/>
        <LogoLeaf    x={22} y={106} r={7} rotate={80}/>

        {/* ── RIGHT small cluster ── */}
        <path d="M172,100 Q180,92 184,86" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <path d="M172,100 Q180,108 184,114" stroke="#C8DFC8" strokeWidth="0.8" fill="none"/>
        <LogoBlossom x={186} y={84}  r={6} rotate={30}/>
        <LogoBlossom x={186} y={116} r={6} rotate={-30}/>
        <LogoBud     x={190} y={100} r={4} rotate={0}/>
        <LogoLeaf    x={178} y={94}  r={7} rotate={80}/>
        <LogoLeaf    x={178} y={106} r={7} rotate={-80}/>

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
