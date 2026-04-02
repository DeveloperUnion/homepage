'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="cta-section-v2" ref={ref}>
      <div className="cta-section-inner">
        <div className={`cta-content-v2 reveal stagger-1 ${isVisible ? 'visible' : ''}`}>
          <span className="cta-label-v2">Contact</span>
          <h2 className="cta-title-v2">
            unionに興味をお持ちの方へ
          </h2>
          <p className="cta-desc-v2">
            導入のご相談やプロダクトに関するご質問など、<br className="pc-only" />
            お気軽にお問い合わせください。
          </p>
        </div>
        <div className={`cta-action-v2 reveal stagger-2 ${isVisible ? 'visible' : ''}`}>
          <Link href="/contact" className="btn-primary">
            無料相談はこちら
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
