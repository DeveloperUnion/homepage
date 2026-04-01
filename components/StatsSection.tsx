'use client';

import { useScrollReveal, useCountUp } from '@/hooks/useScrollReveal';
import { useEffect } from 'react';

function StatItem({ number, unit, label, delay }: { number: number; unit: string; label: string; delay: number }) {
  const { ref, isVisible } = useScrollReveal(0.3);
  const { count, start } = useCountUp(number, 1800);

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <div ref={ref} className={`stat-item reveal stagger-${delay} ${isVisible ? 'visible' : ''}`}>
      <span className="stat-number">
        {count}<span className="stat-unit">{unit}</span>
      </span>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const stats = [
    { number: 7, unit: '社', label: '導入企業数' },
    { number: 20, unit: 'h', label: '月間業務効率化時間' },
    { number: 24, unit: 'h', label: 'サポート対応' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header" ref={headerRef}>
          <p className={`section-label reveal stagger-1 ${headerVisible ? 'visible' : ''}`}>Results</p>
          <h2 className={`section-title reveal stagger-2 ${headerVisible ? 'visible' : ''}`}>数字で見る実績</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              unit={stat.unit}
              label={stat.label}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
