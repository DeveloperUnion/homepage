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

    // すべてのスケッチパスを取得
    const sketchPaths = svg.querySelectorAll('.sketch-path');
    sketchPaths.forEach((path) => {
      const el = path as SVGPathElement;
      if (el.getTotalLength) {
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    // カラーアクセントを非表示
    const accents = svg.querySelectorAll('.accent');
    gsap.set(accents, { opacity: 0 });

    // 動くパーツを初期位置に
    const movingParts = svg.querySelectorAll('.moving-part');
    gsap.set(movingParts, { opacity: 0 });

    // ===== Phase 1: 鉛筆で1人ずつ描かれる =====

    // 建設作業員（左端）
    tl.to('#worker1 .sketch-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.08,
    }, 0.3);

    // 介護士（左）
    tl.to('#worker2 .sketch-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.08,
    }, 0.8);

    // 料理人（中央）
    tl.to('#worker3 .sketch-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.08,
    }, 1.3);

    // 物流（右）
    tl.to('#worker4 .sketch-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.08,
    }, 1.8);

    // 整備士（右端）
    tl.to('#worker5 .sketch-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.08,
    }, 2.3);

    // 地面ライン
    tl.to('#ground .sketch-path', {
      strokeDashoffset: 0,
      duration: 1.0,
    }, 1.0);

    // ===== Phase 2: 色がつく =====
    tl.to(accents, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
    }, 3.2);

    // ===== Phase 3: 動き出す =====
    tl.to(movingParts, {
      opacity: 1,
      duration: 0.3,
    }, 3.8);

    // 建設: ハンマー振る
    tl.to('#hammer-arm', {
      rotation: -20,
      transformOrigin: '100% 0%',
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    }, 4.0);

    // 介護: 車椅子が微かに前後
    tl.to('#wheelchair-group', {
      x: 3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }, 4.0);

    // 料理人: 包丁の上下
    tl.to('#knife-arm', {
      rotation: -15,
      transformOrigin: '0% 0%',
      duration: 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    }, 4.0);

    // 物流: 段ボール上下（持ち上げ）
    tl.to('#box-group', {
      y: -4,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }, 4.0);

    // 整備士: レンチ回転
    tl.to('#wrench-arm', {
      rotation: 25,
      transformOrigin: '0% 50%',
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    }, 4.0);

    return () => {
      tl.kill();
    };
  }, []);

  const pencil = 'rgba(0,0,0,0.18)';
  const pencilThin = 'rgba(0,0,0,0.12)';
  const cyan = '#00b8d4';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-chalkboard-svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="pencil-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
        </filter>
      </defs>

      {/* ===== 地面ライン ===== */}
      <g id="ground">
        <path d="M 40 270 L 960 270" className="sketch-path"
          stroke={pencilThin} strokeWidth="1" strokeLinecap="round" filter="url(#pencil-texture)" />
      </g>

      {/* ===== 1. 建設作業員 ===== */}
      <g id="worker1" transform="translate(80, 0)">
        {/* ヘルメット */}
        <path d="M 55 130 C 55 115 70 105 85 105 C 100 105 115 115 115 130 L 115 135 L 55 135 Z"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#pencil-texture)" />
        {/* 頭 */}
        <path d="M 62 135 C 62 135 62 155 85 155 C 108 155 108 135 108 135"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 体 */}
        <path d="M 65 158 L 60 220 L 75 220 L 85 185 L 95 220 L 110 220 L 105 158 Z"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinejoin="round" filter="url(#pencil-texture)" />
        {/* 左腕 */}
        <path d="M 65 165 L 45 195 L 50 200"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 右腕（ハンマー持つ） */}
        <g id="hammer-arm">
          <path d="M 105 165 L 125 185 L 130 183"
            className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
          {/* ハンマー */}
          <path d="M 128 180 L 145 165" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
          <path d="M 140 160 L 150 165 L 147 170 L 137 167" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        </g>
        {/* 脚 */}
        <path d="M 75 220 L 65 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 95 220 L 105 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* ブーツ */}
        <path d="M 58 265 L 75 265" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 98 265 L 115 265" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* アクセントカラー */}
        <path d="M 58 130 C 58 117 72 108 85 108 C 98 108 112 117 112 130"
          className="accent" stroke={cyan} strokeWidth="2" fill="none" opacity="0" />
      </g>

      {/* ===== 2. 介護士 + 車椅子 ===== */}
      <g id="worker2" transform="translate(260, 0)">
        {/* 頭 */}
        <path d="M 70 120 C 70 108 80 100 90 100 C 100 100 110 108 110 120 C 110 132 100 140 90 140 C 80 140 70 132 70 120"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 体 */}
        <path d="M 78 143 L 72 210 L 108 210 L 102 143"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 腕（押す姿勢） */}
        <path d="M 102 160 L 130 175 L 135 195"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 78 160 L 60 180"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 脚 */}
        <path d="M 80 210 L 72 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 100 210 L 108 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />

        {/* 車椅子 */}
        <g id="wheelchair-group">
          <path d="M 130 200 L 130 250 L 170 250" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#pencil-texture)" />
          {/* 背もたれ */}
          <path d="M 130 195 L 130 240" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
          {/* 座面 */}
          <path d="M 130 240 L 165 240" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
          {/* 車輪 */}
          <circle cx="140" cy="258" r="12" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
          <circle cx="168" cy="258" r="8" className="sketch-path"
            stroke={pencil} strokeWidth="1.2" fill="none" filter="url(#pencil-texture)" />
          {/* ハンドル */}
          <path d="M 130 195 L 125 188" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        </g>
        {/* アクセント */}
        <circle cx="140" cy="258" r="12" className="accent" stroke={cyan} strokeWidth="1.5" fill="none" opacity="0" />
      </g>

      {/* ===== 3. 料理人 ===== */}
      <g id="worker3" transform="translate(460, 0)">
        {/* コック帽 */}
        <path d="M 65 120 C 65 90 75 80 85 78 C 95 80 105 90 105 120"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        <path d="M 62 120 L 108 120" className="sketch-path"
          stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 頭 */}
        <path d="M 68 120 C 68 120 68 148 85 148 C 102 148 102 120 102 120"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 体（エプロン） */}
        <path d="M 70 150 L 65 225 L 105 225 L 100 150"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* エプロンの紐 */}
        <path d="M 75 170 L 85 175 L 95 170"
          className="sketch-path" stroke={pencilThin} strokeWidth="1" fill="none" filter="url(#pencil-texture)" />
        {/* 左腕 */}
        <path d="M 70 158 L 50 190 L 55 195"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 右腕（包丁） */}
        <g id="knife-arm">
          <path d="M 100 158 L 120 180"
            className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
          {/* 包丁 */}
          <path d="M 118 178 L 130 195" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
          <path d="M 126 190 L 138 195 L 135 200 L 123 195" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.2" fill="none" filter="url(#pencil-texture)" />
        </g>
        {/* 脚 */}
        <path d="M 75 225 L 70 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 95 225 L 100 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* アクセント */}
        <path d="M 68 120 L 102 120" className="accent" stroke={cyan} strokeWidth="2" opacity="0" strokeLinecap="round" />
      </g>

      {/* ===== 4. 物流 ===== */}
      <g id="worker4" transform="translate(640, 0)">
        {/* キャップ */}
        <path d="M 65 115 L 105 115 L 108 122 L 62 122 Z"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        <path d="M 60 122 L 110 122"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 頭 */}
        <path d="M 68 122 C 68 122 68 148 85 148 C 102 148 102 122 102 122"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 体 */}
        <path d="M 70 150 L 65 218 L 105 218 L 100 150"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* 両腕（段ボール持つ） */}
        <path d="M 70 160 L 55 180" className="sketch-path"
          stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 100 160 L 115 180" className="sketch-path"
          stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 段ボール */}
        <g id="box-group">
          <path d="M 50 175 L 120 175 L 120 210 L 50 210 Z" className="sketch-path"
            stroke={pencil} strokeWidth="1.5" fill="none" strokeLinejoin="round" filter="url(#pencil-texture)" />
          <path d="M 70 175 L 70 210" className="sketch-path"
            stroke={pencilThin} strokeWidth="0.8" filter="url(#pencil-texture)" />
          <path d="M 100 175 L 100 210" className="sketch-path"
            stroke={pencilThin} strokeWidth="0.8" filter="url(#pencil-texture)" />
          {/* テープライン */}
          <path d="M 50 192 L 120 192" className="sketch-path"
            stroke={pencilThin} strokeWidth="0.8" filter="url(#pencil-texture)" />
        </g>
        {/* 脚 */}
        <path d="M 75 218 L 68 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 95 218 L 102 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* アクセント */}
        <path d="M 52 177 L 118 177 L 118 208 L 52 208 Z" className="accent"
          stroke={cyan} strokeWidth="1.5" fill="none" opacity="0" />
      </g>

      {/* ===== 5. 整備士 ===== */}
      <g id="worker5" transform="translate(820, 0)">
        {/* 頭 */}
        <path d="M 60 110 C 60 98 70 90 80 90 C 90 90 100 98 100 110 C 100 122 90 130 80 130 C 70 130 60 122 60 110"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* つなぎ */}
        <path d="M 65 132 L 58 225 L 102 225 L 95 132"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" filter="url(#pencil-texture)" />
        {/* ポケットライン */}
        <path d="M 68 180 L 92 180" className="sketch-path"
          stroke={pencilThin} strokeWidth="0.8" filter="url(#pencil-texture)" />
        {/* 左腕 */}
        <path d="M 65 145 L 45 175 L 48 180"
          className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* 右腕（レンチ） */}
        <g id="wrench-arm">
          <path d="M 95 145 L 115 168"
            className="sketch-path" stroke={pencil} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#pencil-texture)" />
          {/* レンチ */}
          <path d="M 113 166 L 135 175" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.8" strokeLinecap="round" filter="url(#pencil-texture)" />
          <path d="M 132 170 C 140 168 142 175 135 178" className="sketch-path moving-part"
            stroke={pencil} strokeWidth="1.2" fill="none" filter="url(#pencil-texture)" />
        </g>
        {/* 脚 */}
        <path d="M 70 225 L 65 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 90 225 L 95 268" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* ブーツ */}
        <path d="M 58 265 L 75 265" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        <path d="M 88 265 L 105 265" className="sketch-path" stroke={pencil} strokeWidth="1.5" strokeLinecap="round" filter="url(#pencil-texture)" />
        {/* アクセント */}
        <circle cx="80" cy="110" r="20" className="accent" stroke={cyan} strokeWidth="1.5" fill="none" opacity="0" />
      </g>
    </svg>
  );
}
