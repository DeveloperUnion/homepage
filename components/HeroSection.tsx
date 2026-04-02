'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import HeroIllustration from './HeroIllustration';

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="hero-section hero-section--chalkboard" ref={ref}>
      {/* ��板アニメーション（背景レイヤー） */}
      <div className="hero-chalkboard-bg">
        <HeroIllustration />
      </div>

      {/* テキスト（前面レイヤー） */}
      <div className="hero-container hero-container--overlay">
        <div className="hero-text hero-text--center">
          <h1 className={`hero-title hero-title--chalk reveal stagger-1 ${isVisible ? 'visible' : ''}`}>
            現場のあなたと、<br />
            共につくる。
          </h1>
          <p className={`hero-description hero-description--chalk reveal stagger-2 ${isVisible ? 'visible' : ''}`}>
            職人の隣で考え、職人と一緒につくる。<br className="pc-only" />
            シンプルなアプリから始まる、現場発のデジタル変革。
          </p>
          <div className={`hero-cta reveal stagger-3 ${isVisible ? 'visible' : ''}`}>
            <Link href="/contact" className="btn-primary">
              まずは話を聞いてみる
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className={`hero-scroll-indicator reveal stagger-5 ${isVisible ? 'visible' : ''}`}>
        <span>Scroll</span>
      </div>
    </section>
  );
}
