'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-inner">
        <div className="cta-container">
          <p className={`cta-label reveal stagger-1 ${isVisible ? 'visible' : ''}`}>
            Contact
          </p>
          <h2 className={`cta-title reveal stagger-2 ${isVisible ? 'visible' : ''}`}>
            まずはお気軽にご相談ください
          </h2>
          <p className={`cta-description reveal stagger-3 ${isVisible ? 'visible' : ''}`}>
            建設業界のDX化に関するお悩みやご質問など、<br className="pc-only" />
            お気軽にお問い合わせください。
          </p>
          <div className={`reveal stagger-4 ${isVisible ? 'visible' : ''}`}>
            <Link href="/contact" className="btn-primary">
              無料相談はこちら
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
