'use client';

import { useEffect, useState } from 'react';

const slides = [
  { src: 'union-scaffold-sunset.png', pos: 'center 35%', delay: 0 },
  { src: 'union-construction-sunrise.png', pos: 'center 38%', delay: 10 },
  { src: 'union-care.png', pos: 'center 40%', delay: 20 },
  { src: 'union-warehouse.png', pos: 'center 40%', delay: 30 },
];

const titleLine1 = '現場のあなたと、';
const titleLine2 = '共につくる。';

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero__media">
        {slides.map((s) => (
          <div
            key={s.src}
            className="hero__slide"
            style={{
              backgroundImage: `url(/images/hero/${s.src})`,
              backgroundPosition: s.pos,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <div className="hero__wash" />
      </div>

      <div className="hero__grid">
        <div>
          <h1 className={`hero__headline char-reveal ${revealed ? 'in' : ''}`}>
            {titleLine1.split('').map((char, i) => (
              <span key={`l1-${i}`} style={{ transitionDelay: `${0.25 + i * 0.05}s` }}>
                {char}
              </span>
            ))}
            <br />
            {titleLine2.split('').map((char, i) => (
              <span
                key={`l2-${i}`}
                style={{ transitionDelay: `${0.25 + (titleLine1.length + i) * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className={`hero__sub rv rv-d4 ${revealed ? 'in' : ''}`}>
            机上ではなく、現場の温度で。職人の隣で考え、職人と一緒につくる。
            <br />
            union は建設・福祉の現場に特化した SaaS プロダクトシリーズです。
          </p>
        </div>
      </div>

      <div className="hero__progress" aria-hidden="true">
        <div className="hero__progress-seg" />
        <div className="hero__progress-seg" />
        <div className="hero__progress-seg" />
        <div className="hero__progress-seg" />
      </div>
    </section>
  );
}
