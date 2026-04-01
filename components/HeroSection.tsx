'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import HeroIllustration from './HeroIllustration';

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="hero-section" ref={ref}>
      {/* 装飾要素 */}
      <div className="hero-decoration-left" />
      <div className="hero-decoration-dot" />
      <div className="hero-decoration-dot" />
      <div className="hero-decoration-dot" />
      <div className="hero-decoration-right" />

      <div className="hero-container hero-split">
        <div className="hero-text">
          <p className={`hero-lead reveal stagger-1 ${isVisible ? 'visible' : ''}`}>
            建設業界特化のDXパートナー
          </p>
          <h1 className={`hero-title reveal stagger-2 ${isVisible ? 'visible' : ''}`}>
            建設業界の課題を<br />
            テクノロジーの力で、<br />
            共に解決していく
          </h1>
          <p className={`hero-description reveal stagger-3 ${isVisible ? 'visible' : ''}`}>
            私たちは建設業に特化したDXアプリの開発運用と<br className="pc-only" />
            DX支援を通じて、建設現場の生産性向上を<br className="pc-only" />
            サポートします。
          </p>
          <div className={`hero-cta reveal stagger-4 ${isVisible ? 'visible' : ''}`}>
            <Link href="/contact" className="btn-primary">
              無料相談はこちら
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className={`hero-visual reveal-right stagger-3 ${isVisible ? 'visible' : ''}`}>
          <HeroIllustration />
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className={`hero-scroll-indicator reveal stagger-5 ${isVisible ? 'visible' : ''}`}>
        <span>Scroll</span>
      </div>
    </section>
  );
}
