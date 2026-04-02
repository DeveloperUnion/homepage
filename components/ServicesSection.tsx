'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const products = [
    { name: 'union 資材発注 for 足場', comingSoon: false },
    { name: 'union 資材発注 for リース', comingSoon: false },
    { name: 'union 健康管理', comingSoon: true },
    { name: 'union 日報', comingSoon: true },
    { name: 'union 勤怠管理', comingSoon: true },
  ];

  // マーキー用に2倍にして無限ループを実現
  const doubledProducts = [...products, ...products];

  return (
    <section className="section">
      <div className="section-header" ref={headerRef}>
        <p className={`section-label reveal stagger-1 ${headerVisible ? 'visible' : ''}`}>Products</p>
        <h2 className={`section-title reveal stagger-2 ${headerVisible ? 'visible' : ''}`}>プロダクト</h2>
      </div>
      <div className="products-overview" ref={contentRef}>
        <div className={`products-description reveal stagger-1 ${contentVisible ? 'visible' : ''}`}>
          <h3>unionプロダクトシリーズ</h3>
          <p>
            現場の課題に特化したSaaSプロダクトをラインナップで提供。<br className="pc-only" />
            現場の声から生まれたツールで、日々の業務をシンプルにします。
          </p>
        </div>
        <div className={`product-marquee reveal stagger-2 ${contentVisible ? 'visible' : ''}`}>
          <div className="product-marquee-track">
            {doubledProducts.map((product, index) => (
              <div key={index} className={`product-marquee-item ${product.comingSoon ? 'coming-soon' : ''}`}>
                <span className="product-marquee-name">{product.name}</span>
                {product.comingSoon && <span className="product-marquee-badge">Coming Soon</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
