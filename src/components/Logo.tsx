interface LogoProps { size?: number; showText?: boolean; }

function Blossom({ x, y, r, rotate = 0, opacity = 1 }: {
  x: number; y: number; r: number; rotate?: number; opacity?: number;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.53;
        const py = -Math.cos(rad) * r * 0.53;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r * 0.40} ry={r * 0.55}
            fill="#F2BDCA" opacity={0.93} transform={`rotate(${deg} ${px} ${py})`} />
        );
      })}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.sin(rad) * r * 0.28;
        const py = -Math.cos(rad) * r * 0.28;
        return (
          <ellipse key={`b${i}`} cx={px} cy={py} rx={r * 0.16} ry={r * 0.24}
            fill="#E8A0B4" opacity={0.4} transform={`rotate(${deg} ${px} ${py})`} />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.19} fill="#FFF5F7" />
      <circle cx={0} cy={0} r={r * 0.10} fill="#FADADD" />
    </g>
  );
}

function Bud({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r * 0.36} ry={r * 0.54} fill="#F2BDCA" opacity={0.88} />
      <ellipse cx={-r * 0.17} cy={r * 0.38} rx={r * 0.13} ry={r * 0.21} fill="#B2D5B2" opacity={0.82}
        transform={`rotate(-20 ${-r * 0.17} ${r * 0.38})`} />
      <ellipse cx={r * 0.17} cy={r * 0.38} rx={r * 0.13} ry={r * 0.21} fill="#B2D5B2" opacity={0.82}
        transform={`rotate(20 ${r * 0.17} ${r * 0.38})`} />
    </g>
  );
}

function Leaf({ x, y, r, rotate = 0 }: { x: number; y: number; r: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse cx={0} cy={0} rx={r * 0.26} ry={r * 0.62} fill="#B8D8B8" opacity={0.78} />
      <line x1={0} y1={-r * 0.54} x2={0} y2={r * 0.54} stroke="#96C296" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

export default function CLCLogo({ size = 60, showText = false }: LogoProps) {
  const W = 500, H = 500;
  const cx = 250, cy = 250;
  const R = 210;

  // Arc: from 7:30 (θ=135°) to 4:30 (θ=45°) clockwise through the top (270° arc)
  const sx = cx + R * Math.cos((135 * Math.PI) / 180); // ≈ 101.5
  const sy = cy + R * Math.sin((135 * Math.PI) / 180); // ≈ 398.5
  const ex = cx + R * Math.cos((45 * Math.PI) / 180);  // ≈ 398.5
  const ey = cy + R * Math.sin((45 * Math.PI) / 180);  // ≈ 398.5

  const arcPath = `M ${sx.toFixed(1)},${sy.toFixed(1)} A ${R},${R} 0 1,1 ${ex.toFixed(1)},${ey.toFixed(1)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg
        width={size}
        height={size * (H / W)}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="clcTextRing" d={arcPath} />
          <radialGradient id="ovalBg" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFF8F3" />
            <stop offset="55%" stopColor="#F7EDE4" />
            <stop offset="100%" stopColor="#EFE0D4" />
          </radialGradient>
        </defs>

        {/* background intentionally transparent */}

        {/* ── TOP ARC TEXT: clockwise through top, reads L→R from outside ── */}
        <text
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="23"
          fontWeight="700"
          fill="#1C1C1C"
          letterSpacing="9"
        >
          <textPath href="#clcTextRing" startOffset="5%">
            ✦ CLC  PREMIER          STUDIOS  ✦
          </textPath>
        </text>

        {/* ── BOTTOM MIRRORED ARC TEXT (180° rotation = upside-down stamp look) ── */}
        <g transform={`rotate(180, ${cx}, ${cy})`}>
          <text
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="23"
            fontWeight="700"
            fill="#1C1C1C"
            letterSpacing="9"
          >
            <textPath href="#clcTextRing" startOffset="5%">
              ✦ CLC  PREMIER          STUDIOS  ✦
            </textPath>
          </text>
        </g>

        {/* ── CENTER OVAL (soft pink-lavender) ── */}
        <ellipse cx={cx} cy={cy} rx={160} ry={136} fill="url(#ovalBg)" opacity={0.92} />

        {/* ── Geometric polygon frame (gold) ── */}
        <polygon
          points="250,116 357,150 392,250 357,350 250,384 143,350 108,250 143,150"
          fill="none" stroke="#C0A870" strokeWidth="0.9" opacity="0.42"
        />

        {/* ── LEFT FLOWER CLUSTER ── */}
        <Blossom x={127} y={192} r={13}  rotate={-15} />
        <Blossom x={110} y={230} r={12}  rotate={22}  />
        <Blossom x={139} y={263} r={11}  rotate={-6}  />
        <Blossom x={114} y={186} r={8}   rotate={38} opacity={0.72} />
        <Bud     x={103} y={218} r={7}   rotate={-28} />
        <Bud     x={128} y={282} r={6}   rotate={14}  />
        <Leaf    x={134} y={206} r={9}   rotate={-58} />
        <Leaf    x={116} y={248} r={8}   rotate={72}  />
        <path d="M 140,202 Q 128,226 120,234" stroke="#C8D8C0" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 126,230 Q 118,252 113,266" stroke="#C8D8C0" strokeWidth="1" fill="none" opacity="0.5" />

        {/* ── RIGHT FLOWER CLUSTER ── */}
        <Blossom x={373} y={192} r={12}  rotate={15}  />
        <Blossom x={390} y={230} r={11}  rotate={-22} />
        <Blossom x={361} y={263} r={12}  rotate={6}   />
        <Blossom x={386} y={186} r={8}   rotate={-38} opacity={0.72} />
        <Bud     x={397} y={218} r={7}   rotate={28}  />
        <Bud     x={372} y={282} r={6}   rotate={-14} />
        <Leaf    x={366} y={206} r={9}   rotate={58}  />
        <Leaf    x={384} y={248} r={8}   rotate={-72} />
        <path d="M 360,202 Q 372,226 380,234" stroke="#C8D8C0" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 374,230 Q 382,252 387,266" stroke="#C8D8C0" strokeWidth="1" fill="none" opacity="0.5" />

        {/* ── GOLD ACCENT LINES (horizontal through center) ── */}
        <line x1={108} y1={246} x2={202} y2={246} stroke="#C0A870" strokeWidth="2"   opacity="0.82" />
        <line x1={108} y1={250} x2={202} y2={250} stroke="#C0A870" strokeWidth="0.7" opacity="0.44" />
        <line x1={298} y1={246} x2={392} y2={246} stroke="#C0A870" strokeWidth="2"   opacity="0.82" />
        <line x1={298} y1={250} x2={392} y2={250} stroke="#C0A870" strokeWidth="0.7" opacity="0.44" />

        {/* ── LARGE "C" (bold serif, upper-left of oval) ── */}
        <text
          x="212"
          y="292"
          textAnchor="middle"
          fontSize="172"
          fill="#252020"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="800"
          opacity={0.90}
        >
          C
        </text>

        {/* ── "Crystal Lynn" script (Dancing Script from Google Fonts) ── */}
        <text
          x={String(cx)}
          y="266"
          textAnchor="middle"
          fontSize="22"
          fill="#3A2828"
          fontFamily="'Dancing Script', 'Brush Script MT', Georgia, serif"
          fontWeight="700"
          fontStyle="italic"
        >
          Crystal Lynn
        </text>

        {/* ── MINT GREEN RIBBON with pointed tails ── */}
        <polygon points="186,272 176,286 186,300 314,300 324,286 314,272" fill="#7EC4A2" />
        <polygon points="186,272 176,286 186,300 314,300 324,286 314,272" fill="none"
          stroke="#6BB890" strokeWidth="0.8" opacity="0.6" />
        <text
          x={String(cx)}
          y="290"
          textAnchor="middle"
          fontSize="10.5"
          fill="white"
          fontFamily="Georgia, serif"
          letterSpacing="5"
          fontWeight="700"
        >
          CREATES
        </text>

        {/* ── LARGE "L" (italic, lower-right of oval) ── */}
        <text
          x="295"
          y="360"
          textAnchor="middle"
          fontSize="150"
          fill="#252020"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="700"
          opacity={0.88}
        >
          L
        </text>

        {/* ── Small accent flowers at top of oval ── */}
        <Blossom x={207} y={143} r={8}  rotate={12}  opacity={0.65} />
        <Blossom x={250} y={130} r={7}  rotate={-5}  opacity={0.55} />
        <Blossom x={293} y={143} r={8}  rotate={-12} opacity={0.65} />
        <Bud     x={229} y={132} r={5}  rotate={-18} />
        <Bud     x={271} y={132} r={5}  rotate={18}  />

      </svg>

      {showText && (
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <p style={{ color: "#00D485", fontWeight: 700, fontSize: 13, letterSpacing: 4, fontFamily: "Georgia, serif" }}>
            CLC
          </p>
          <p style={{ color: "#7EC4A2", fontSize: 10, letterSpacing: 3, fontFamily: "Georgia, serif" }}>
            PREMIER STUDIOS
          </p>
        </div>
      )}
    </div>
  );
}
