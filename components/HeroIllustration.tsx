export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 500 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
      aria-hidden="true"
    >
      {/* グリッド背景 */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b8d4" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0097a7" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00b8d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4dd0e1" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#212121" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#424242" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b8d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4dd0e1" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* 背景の大きな円 */}
      <circle cx="250" cy="210" r="180" fill="url(#grad1)" className="hero-bg-circle" />

      {/* ビル群（アイソメトリック風） */}
      {/* メインビル */}
      <g className="hero-building hero-building-1">
        <rect x="180" y="100" width="70" height="200" rx="2" fill="url(#grad3)" />
        {/* 窓 */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
          <g key={`w1-${row}`}>
            <rect x="190" y={115 + row * 23} width="10" height="12" rx="1" fill="#00b8d4" opacity="0.4" />
            <rect x="206" y={115 + row * 23} width="10" height="12" rx="1" fill="#4dd0e1" opacity="0.3" />
            <rect x="222" y={115 + row * 23} width="10" height="12" rx="1" fill="#00b8d4" opacity="0.5" />
            <rect x="238" y={115 + row * 23} width="10" height="12" rx="1" fill="#4dd0e1" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* サブビル左 */}
      <g className="hero-building hero-building-2">
        <rect x="120" y="170" width="55" height="130" rx="2" fill="#424242" opacity="0.85" />
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={`w2-${row}`}>
            <rect x="128" y={182 + row * 23} width="8" height="10" rx="1" fill="#00b8d4" opacity="0.35" />
            <rect x="142" y={182 + row * 23} width="8" height="10" rx="1" fill="#4dd0e1" opacity="0.25" />
            <rect x="156" y={182 + row * 23} width="8" height="10" rx="1" fill="#00b8d4" opacity="0.4" />
          </g>
        ))}
      </g>

      {/* サブビル右 */}
      <g className="hero-building hero-building-3">
        <rect x="260" y="140" width="60" height="160" rx="2" fill="#616161" opacity="0.75" />
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <g key={`w3-${row}`}>
            <rect x="270" y={155 + row * 23} width="9" height="11" rx="1" fill="#4dd0e1" opacity="0.3" />
            <rect x="285" y={155 + row * 23} width="9" height="11" rx="1" fill="#00b8d4" opacity="0.45" />
            <rect x="300" y={155 + row * 23} width="9" height="11" rx="1" fill="#4dd0e1" opacity="0.2" />
          </g>
        ))}
      </g>

      {/* 小ビル */}
      <g className="hero-building hero-building-4">
        <rect x="325" y="210" width="40" height="90" rx="2" fill="#757575" opacity="0.6" />
        {[0, 1, 2, 3].map((row) => (
          <g key={`w4-${row}`}>
            <rect x="332" y={222 + row * 20} width="7" height="9" rx="1" fill="#00b8d4" opacity="0.35" />
            <rect x="345" y={222 + row * 20} width="7" height="9" rx="1" fill="#4dd0e1" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* 地面ライン */}
      <line x1="80" y1="300" x2="420" y2="300" stroke="#e0e0e0" strokeWidth="1" />

      {/* 回路パターン（テクノロジー要素） */}
      <g className="hero-circuit">
        {/* メイン回路ライン */}
        <path
          d="M 250 95 L 250 60 L 350 60 L 350 90 L 400 90"
          stroke="url(#circuitGrad)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
          className="hero-circuit-line"
        />
        <circle cx="400" cy="90" r="4" fill="#00b8d4" opacity="0.6" className="hero-circuit-node" />
        <circle cx="250" cy="60" r="3" fill="#4dd0e1" opacity="0.5" />

        {/* サブ回路ライン */}
        <path
          d="M 120 165 L 80 165 L 80 120 L 130 120"
          stroke="url(#circuitGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          className="hero-circuit-line-2"
        />
        <circle cx="80" cy="120" r="3" fill="#00b8d4" opacity="0.4" />
        <circle cx="130" cy="120" r="3" fill="#4dd0e1" opacity="0.5" />

        {/* データフロー */}
        <path
          d="M 365 200 L 410 200 L 410 150 L 440 150"
          stroke="#00b8d4"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
          strokeDasharray="3 3"
          className="hero-circuit-line-3"
        />
        <circle cx="440" cy="150" r="3" fill="#00b8d4" opacity="0.4" />
      </g>

      {/* フローティングアイコン（DX要素） */}
      <g className="hero-float-element hero-float-1">
        {/* クラウドアイコン */}
        <rect x="370" y="40" width="48" height="48" rx="10" fill="white" stroke="#e0e0e0" strokeWidth="1" />
        <path d="M 384 68 C 382 68 380 66.5 380 64.5 C 380 62.5 382 61 384 61 C 384.2 59.5 386 58 388.5 58 C 390 58 391.3 58.7 392 59.8 C 392.5 59.5 393 59.3 393.5 59.3 C 395.5 59.3 397 60.8 397 62.8 L 397 63 C 398.7 63.3 400 64.7 400 66.5 C 400 68.5 398.2 70 396 70 L 385 70 C 382.8 70 381 68.5 381 66.5" fill="none" stroke="#00b8d4" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      <g className="hero-float-element hero-float-2">
        {/* グラフアイコン */}
        <rect x="60" y="75" width="44" height="44" rx="10" fill="white" stroke="#e0e0e0" strokeWidth="1" />
        <rect x="72" y="100" width="5" height="12" rx="1" fill="#00b8d4" opacity="0.5" />
        <rect x="80" y="94" width="5" height="18" rx="1" fill="#00b8d4" opacity="0.7" />
        <rect x="88" y="97" width="5" height="15" rx="1" fill="#4dd0e1" opacity="0.6" />
      </g>

      <g className="hero-float-element hero-float-3">
        {/* ギアアイコン */}
        <rect x="340" y="270" width="40" height="40" rx="8" fill="white" stroke="#e0e0e0" strokeWidth="1" />
        <circle cx="360" cy="290" r="7" fill="none" stroke="#00b8d4" strokeWidth="1.5" />
        <circle cx="360" cy="290" r="2.5" fill="#00b8d4" opacity="0.5" />
        <line x1="360" y1="281" x2="360" y2="284" stroke="#00b8d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="360" y1="296" x2="360" y2="299" stroke="#00b8d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="351" y1="290" x2="354" y2="290" stroke="#00b8d4" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="366" y1="290" x2="369" y2="290" stroke="#00b8d4" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
