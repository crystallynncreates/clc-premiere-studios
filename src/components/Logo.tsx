interface LogoProps { size?: number; showText?: boolean; }

export default function CLCLogo({ size = 60, showText = false }: LogoProps) {
  const s = size;
  return (
    <div className="flex flex-col items-center">
      <svg width={s} height={s} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdf6" />
          </radialGradient>
        </defs>
        {/* Outer diamond */}
        <path d="M100 6 L194 100 L100 194 L6 100 Z" fill="none" stroke="#c8d8c0" strokeWidth="1.5"/>
        {/* Inner fill */}
        <path d="M100 18 L182 100 L100 182 L18 100 Z" fill="url(#bgGrad)" stroke="#b5c8ab" strokeWidth="0.8"/>
        {/* Jade ribbon */}
        <path d="M28 92 Q100 84 172 92 Q100 116 28 108 Z" fill="#00A86B" opacity="0.88"/>
        {/* Crystal Lynn text on ribbon */}
        <text x="100" y="105" textAnchor="middle" fontSize="9.5" fill="white" fontFamily="Georgia,serif" letterSpacing="1.5">Crystal Lynn</text>
        {/* C letter */}
        <text x="74" y="110" textAnchor="middle" fontSize="64" fill="#1a2e1a" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.92">C</text>
        {/* L letter */}
        <text x="124" y="110" textAnchor="middle" fontSize="64" fill="#1a2e1a" fontFamily="Georgia,serif" fontStyle="italic" opacity="0.92">L</text>
        {/* creates text */}
        <text x="100" y="132" textAnchor="middle" fontSize="8" fill="#4a5a4a" fontFamily="Georgia,serif" letterSpacing="3.5">creates</text>
        {/* Top flowers */}
        {[0,72,144,216,288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 100 + 20 * Math.cos(rad);
          const cy = 24 + 12 * Math.sin(rad);
          return <ellipse key={i} cx={cx} cy={cy} rx="4.5" ry="2.8" fill="#FFC2D1" opacity="0.85" transform={`rotate(${deg} ${cx} ${cy})`}/>;
        })}
        <circle cx="100" cy="24" r="3.5" fill="#FFD6E0"/>
        {/* Bottom flowers */}
        {[0,72,144,216,288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 100 + 20 * Math.cos(rad);
          const cy = 176 + 12 * Math.sin(rad);
          return <ellipse key={i} cx={cx} cy={cy} rx="4.5" ry="2.8" fill="#FFC2D1" opacity="0.85" transform={`rotate(${deg} ${cx} ${cy})`}/>;
        })}
        <circle cx="100" cy="176" r="3.5" fill="#FFD6E0"/>
        {/* Left leaves */}
        <path d="M12 94 Q22 86 16 78 Q6 88 12 94Z" fill="#86EFAC" opacity="0.75"/>
        <path d="M12 106 Q22 114 16 122 Q6 112 12 106Z" fill="#86EFAC" opacity="0.75"/>
        {/* Right leaves */}
        <path d="M188 94 Q178 86 184 78 Q194 88 188 94Z" fill="#86EFAC" opacity="0.75"/>
        <path d="M188 106 Q178 114 184 122 Q194 112 188 106Z" fill="#86EFAC" opacity="0.75"/>
      </svg>
      {showText && (
        <div className="text-center mt-1">
          <p className="text-jade-600 font-bold text-sm tracking-widest">CLC</p>
          <p className="text-jade-500 text-xs tracking-wider">PREMIERE STUDIOS</p>
        </div>
      )}
    </div>
  );
}
