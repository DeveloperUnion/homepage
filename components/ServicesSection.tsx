'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { DXConsultingIcon, ProductDevIcon } from './ServiceIcons';

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  const services = [
    {
      number: '01',
      title: 'DXコンサルティング',
      description: '建設業界の業務課題を分析し、最適なデジタル化戦略を立案。現状分析から導入支援まで一貫してサポートします。',
      href: '/services/dx-consulting',
      icon: <DXConsultingIcon />
    },
    {
      number: '02',
      title: 'プロダクト開発',
      description: '建設業に特化したカスタムアプリケーションの開発。現場の声を反映した使いやすいシステムを構築します。',
      href: '/services/product-development',
      icon: <ProductDevIcon />
    }
  ];

  return (
    <section className="section">
      <div className="section-header" ref={headerRef}>
        <p className={`section-label reveal stagger-1 ${headerVisible ? 'visible' : ''}`}>Services</p>
        <h2 className={`section-title reveal stagger-2 ${headerVisible ? 'visible' : ''}`}>サービス</h2>
      </div>
      <div className="services-grid services-grid-2" ref={cardsRef}>
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className={`service-card-simple reveal stagger-${index + 1} ${cardsVisible ? 'visible' : ''}`}
          >
            <div className="service-card-icon-area">
              {service.icon}
              <div className="service-card-number">{service.number}</div>
            </div>
            <div className="service-card-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-link">
                詳しく見る <span className="arrow">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
