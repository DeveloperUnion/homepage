'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const svg = svgRef.current;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // すべての手書きパスを取得して初期化
    const sketchPaths = svg.querySelectorAll('.sketch-path');
    sketchPaths.forEach((path) => {
      const el = path as SVGPathElement | SVGLineElement | SVGRectElement;
      if (el instanceof SVGPathElement || el instanceof SVGLineElement) {
        const length = el instanceof SVGPathElement ? el.getTotalLength() : 500;
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    // 手書きテキストを非表示に
    const sketchTexts = svg.querySelectorAll('.sketch-text');
    gsap.set(sketchTexts, { opacity: 0 });

    // 手書き矩形を非表示に
    const sketchRects = svg.querySelectorAll('.sketch-rect');
    gsap.set(sketchRects, { opacity: 0, strokeDasharray: 1200, strokeDashoffset: 1200 });

    // チェックマークを非表示に
    const checkmarks = svg.querySelectorAll('.sketch-check');
    checkmarks.forEach((path) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    });

    // デジタルレイヤーを非表示に
    const digitalLayer = svg.querySelector('.digital-layer');
    gsap.set(digitalLayer, { opacity: 0 });

    // デジタル要素を個別に非表示
    const digitalCards = svg.querySelectorAll('.digital-card');
    gsap.set(digitalCards, { opacity: 0, y: 10 });

    const digitalBars = svg.querySelectorAll('.digital-bar');
    gsap.set(digitalBars, { scaleY: 0, transformOrigin: 'bottom' });

    const digitalChecks = svg.querySelectorAll('.digital-check');
    digitalChecks.forEach((path) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    });

    const digitalLines = svg.querySelectorAll('.digital-line');
    gsap.set(digitalLines, { scaleX: 0, transformOrigin: 'left' });

    // ===== Phase 1: 手書きが描かれる =====

    // 伝票枠が描かれる
    tl.to('.sketch-rect', {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.15,
    }, 0.2);

    // チェックリストのテキストが現れる
    tl.to('.sketch-text', {
      opacity: 1,
      duration: 0.4,
      stagger: 0.2,
    }, 0.4);

    // 手書きパス（罫線・軸・グラフ線）が描かれる
    tl.to(sketchPaths, {
      strokeDashoffset: 0,
      duration: 1.0,
      stagger: 0.12,
    }, 0.6);

    // チェックマークがシュッと入る
    tl.to(checkmarks, {
      strokeDashoffset: 0,
      duration: 0.3,
      stagger: 0.15,
      ease: 'power3.out',
    }, 1.4);

    // ===== Phase 2: 手書きがフェードアウト → デジタルが現れる =====

    // 手書きレイヤーをフェードアウト
    tl.to('.sketch-layer', {
      opacity: 0,
      duration: 0.8,
      ease: 'power1.inOut',
    }, '+=0.6');

    // デジタルレイヤーを表示
    tl.to(digitalLayer, {
      opacity: 1,
      duration: 0.3,
    }, '-=0.3');

    // カードがふわっと上がってくる
    tl.to(digitalCards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.1');

    // 棒グラフが下から伸びる
    tl.to(digitalBars, {
      scaleY: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
    }, '-=0.4');

    // デジタルチェックマークがシュッと
    tl.to(digitalChecks, {
      strokeDashoffset: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3');

    // デジタルラインがスライドイン
    tl.to(digitalLines, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out',
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-chalkboard-svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>

      {/* ======= 手書きレイヤー ======= */}
      <g className="sketch-layer">

        {/* --- 左上：チェックリスト --- */}
        <rect x="60" y="60" width="320" height="220" rx="2" className="sketch-rect"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" fill="none" filter="url(#pencil)" />

        <text x="90" y="105" className="sketch-text"
          fill="rgba(0,0,0,0.2)" fontSize="17" fontFamily="var(--font-display)" filter="url(#pencil)">
          ☐ 朝礼 8:00
        </text>
        <path d="M 92 92 L 98 101 L 112 83" className="sketch-check"
          stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#pencil)" />

        <text x="90" y="145" className="sketch-text"
          fill="rgba(0,0,0,0.2)" fontSize="17" fontFamily="var(--font-display)" filter="url(#pencil)">
          ☐ 資材発注
        </text>

        <text x="90" y="185" className="sketch-text"
          fill="rgba(0,0,0,0.2)" fontSize="17" fontFamily="var(--font-display)" filter="url(#pencil)">
          ☐ 安全点検
        </text>

        <text x="90" y="225" className="sketch-text"
          fill="rgba(0,0,0,0.2)" fontSize="17" fontFamily="var(--font-display)" filter="url(#pencil)">
          ☐ 日報
        </text>

        {/* 罫線 */}
        <path d="M 75 118 L 365 118" className="sketch-path"
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 75 158 L 365 158" className="sketch-path"
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 75 198 L 365 198" className="sketch-path"
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 75 238 L 365 238" className="sketch-path"
          stroke="rgba(0,0,0,0.06)" strokeWidth="1" filter="url(#pencil)" />

        {/* --- 右上：手書きグラフ --- */}
        {/* 軸 */}
        <path d="M 880 120 L 880 420" className="sketch-path"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil)" />
        <path d="M 880 420 L 1150 420" className="sketch-path"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil)" />

        {/* 折れ線 */}
        <path d="M 910 380 C 940 360, 960 340, 990 310 C 1015 285, 1040 250, 1065 230 C 1085 215, 1105 185, 1130 165"
          className="sketch-path"
          stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#pencil)" />

        {/* 目盛りっぽい横線 */}
        <path d="M 875 340 L 890 340" className="sketch-path" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 875 260 L 890 260" className="sketch-path" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 875 180 L 890 180" className="sketch-path" stroke="rgba(0,0,0,0.08)" strokeWidth="1" filter="url(#pencil)" />

        {/* --- 左下：伝票風テーブル --- */}
        <rect x="60" y="340" width="320" height="200" rx="2" className="sketch-rect"
          stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" fill="none" filter="url(#pencil)" />

        <text x="80" y="370" className="sketch-text"
          fill="rgba(0,0,0,0.15)" fontSize="14" fontFamily="var(--font-display)" filter="url(#pencil)">
          出荷伝票 No.2847
        </text>

        <path d="M 60 385 L 380 385" className="sketch-path" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 60 420 L 380 420" className="sketch-path" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 60 455 L 380 455" className="sketch-path" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#pencil)" />
        <path d="M 60 490 L 380 490" className="sketch-path" stroke="rgba(0,0,0,0.07)" strokeWidth="1" filter="url(#pencil)" />

        <text x="80" y="410" className="sketch-text" fill="rgba(0,0,0,0.12)" fontSize="13" fontFamily="var(--font-display)" filter="url(#pencil)">
          単管パイプ ×120
        </text>
        <text x="80" y="445" className="sketch-text" fill="rgba(0,0,0,0.12)" fontSize="13" fontFamily="var(--font-display)" filter="url(#pencil)">
          クランプ ×240
        </text>
        <text x="80" y="480" className="sketch-text" fill="rgba(0,0,0,0.12)" fontSize="13" fontFamily="var(--font-display)" filter="url(#pencil)">
          足場板 ×60
        </text>

        {/* --- 中央下：走り書きメモ --- */}
        <path d="M 450 480 C 470 477, 560 483, 680 478" className="sketch-path"
          stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil)" />
        <path d="M 450 510 C 475 507, 540 513, 640 508" className="sketch-path"
          stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil)" />
        <path d="M 450 540 C 465 537, 520 543, 600 538" className="sketch-path"
          stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil)" />

        {/* --- 右下：手書き円グラフ風 --- */}
        <circle cx="1000" cy="520" r="40" className="sketch-rect"
          stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" fill="none" filter="url(#pencil)" />
        <path d="M 1000 520 L 1000 480" className="sketch-path"
          stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" filter="url(#pencil)" />
        <path d="M 1000 520 L 1035 540" className="sketch-path"
          stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" filter="url(#pencil)" />
      </g>

      {/* ======= デジタルレイヤー ======= */}
      <g className="digital-layer">

        {/* --- 左上：デジタルチェックリスト --- */}
        <rect x="50" y="50" width="340" height="240" rx="16" className="digital-card"
          fill="rgba(0,184,212,0.03)" stroke="rgba(0,184,212,0.1)" strokeWidth="1" />

        {/* item 1 */}
        <rect x="80" y="80" width="22" height="22" rx="6" stroke="#00b8d4" strokeWidth="1.5" fill="none" opacity="0.5" className="digital-card" />
        <path d="M 85 91 L 89 96 L 98 84" className="digital-check"
          stroke="#00b8d4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <rect x="116" y="87" width="200" height="8" rx="4" fill="#00b8d4" opacity="0.12" className="digital-line" />

        {/* item 2 */}
        <rect x="80" y="124" width="22" height="22" rx="6" stroke="#00b8d4" strokeWidth="1.5" fill="none" opacity="0.35" className="digital-card" />
        <path d="M 85 135 L 89 140 L 98 128" className="digital-check"
          stroke="#00b8d4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        <rect x="116" y="131" width="170" height="8" rx="4" fill="#00b8d4" opacity="0.08" className="digital-line" />

        {/* item 3 */}
        <rect x="80" y="168" width="22" height="22" rx="6" stroke="#00b8d4" strokeWidth="1.5" fill="none" opacity="0.25" className="digital-card" />
        <rect x="116" y="175" width="180" height="8" rx="4" fill="#00b8d4" opacity="0.06" className="digital-line" />

        {/* item 4 */}
        <rect x="80" y="212" width="22" height="22" rx="6" stroke="#00b8d4" strokeWidth="1.5" fill="none" opacity="0.2" className="digital-card" />
        <rect x="116" y="219" width="150" height="8" rx="4" fill="#00b8d4" opacity="0.05" className="digital-line" />

        {/* --- 右上：デジタル棒グラフ --- */}
        <rect x="850" y="100" width="320" height="370" rx="16" className="digital-card"
          fill="rgba(0,184,212,0.03)" stroke="rgba(0,184,212,0.1)" strokeWidth="1" />

        <line x1="890" y1="420" x2="890" y2="140" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
        <line x1="890" y1="420" x2="1140" y2="420" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

        <rect x="910" y="350" width="30" height="70" rx="4" className="digital-bar" fill="#00b8d4" opacity="0.12" />
        <rect x="955" y="310" width="30" height="110" rx="4" className="digital-bar" fill="#00b8d4" opacity="0.18" />
        <rect x="1000" y="270" width="30" height="150" rx="4" className="digital-bar" fill="#00b8d4" opacity="0.24" />
        <rect x="1045" y="230" width="30" height="190" rx="4" className="digital-bar" fill="#00b8d4" opacity="0.30" />
        <rect x="1090" y="190" width="30" height="230" rx="4" className="digital-bar" fill="#00b8d4" opacity="0.38" />

        {/* --- 左下：デジタルテーブル --- */}
        <rect x="50" y="330" width="340" height="220" rx="16" className="digital-card"
          fill="rgba(0,184,212,0.03)" stroke="rgba(0,184,212,0.1)" strokeWidth="1" />

        <rect x="75" y="355" width="120" height="8" rx="4" fill="#00b8d4" opacity="0.15" className="digital-line" />
        <line x1="75" y1="380" x2="365" y2="380" stroke="rgba(0,184,212,0.08)" strokeWidth="1" />
        <rect x="75" y="395" width="280" height="6" rx="3" fill="rgba(0,0,0,0.04)" className="digital-line" />
        <line x1="75" y1="418" x2="365" y2="418" stroke="rgba(0,184,212,0.06)" strokeWidth="1" />
        <rect x="75" y="433" width="240" height="6" rx="3" fill="rgba(0,0,0,0.03)" className="digital-line" />
        <line x1="75" y1="456" x2="365" y2="456" stroke="rgba(0,184,212,0.06)" strokeWidth="1" />
        <rect x="75" y="471" width="260" height="6" rx="3" fill="rgba(0,0,0,0.03)" className="digital-line" />

        {/* --- 中央下：サマリカード --- */}
        <rect x="430" y="450" width="380" height="120" rx="16" className="digital-card"
          fill="rgba(0,184,212,0.03)" stroke="rgba(0,184,212,0.1)" strokeWidth="1" />
        <rect x="460" y="478" width="180" height="8" rx="4" fill="rgba(0,0,0,0.05)" className="digital-line" />
        <rect x="460" y="500" width="140" height="8" rx="4" fill="rgba(0,0,0,0.04)" className="digital-line" />
        <rect x="460" y="522" width="100" height="8" rx="4" fill="rgba(0,0,0,0.03)" className="digital-line" />

        {/* --- 右下：デジタル円グラフ --- */}
        <rect x="850" y="490" width="140" height="90" rx="16" className="digital-card"
          fill="rgba(0,184,212,0.03)" stroke="rgba(0,184,212,0.1)" strokeWidth="1" />
        <circle cx="920" cy="535" r="25" stroke="#00b8d4" strokeWidth="3" fill="none" opacity="0.15" className="digital-card"
          strokeDasharray="60 97" />
        <circle cx="920" cy="535" r="25" stroke="#00b8d4" strokeWidth="3" fill="none" opacity="0.25" className="digital-card"
          strokeDasharray="35 122" strokeDashoffset="-60" />
      </g>
    </svg>
  );
}
