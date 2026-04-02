'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="page-hero-v2" ref={ref}>
      <div className="page-hero-v2-inner">
        <h1 className={`page-hero-v2-title reveal stagger-1 ${isVisible ? 'visible' : ''}`}>
          {title}
        </h1>
        <p
          className={`page-hero-v2-subtitle reveal stagger-2 ${isVisible ? 'visible' : ''}`}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </div>
    </section>
  );
}
