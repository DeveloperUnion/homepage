'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FeaturesSection() {
  const { ref: ref1, isVisible: v1 } = useScrollReveal();
  const { ref: ref2, isVisible: v2 } = useScrollReveal();
  const { ref: ref3, isVisible: v3 } = useScrollReveal();

  const features = [
    {
      number: '01',
      title: 'とにかくシンプル',
      description: '余計な機能は入れない。現場で手袋をしたままでも使えるくらい、シンプルで迷わないデザインです。',
      ref: ref1,
      isVisible: v1,
    },
    {
      number: '02',
      title: '現場の声から生まれている',
      description: '開発チームが実際に現場に足を運び、課題を聞いてつくっています。机上の空論ではない、本当に必要な機能だけを届けます。',
      ref: ref2,
      isVisible: v2,
    },
    {
      number: '03',
      title: '小さく始めて、少しずつ広げる',
      description: 'まずは1つのアプリから導入OK。現場が慣れてきたら、次のツールへ。無理なく段階的にDX化を進められます。',
      ref: ref3,
      isVisible: v3,
    },
  ];

  return (
    <section className="features-section-v2">
      <div className="features-section-inner">
        <div className="features-header-v2">
          <span className="features-label-v2">Why union?</span>
        </div>

        <div className="features-list-v2">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={feature.ref}
              className={`feature-row-v2 ${index % 2 === 1 ? 'feature-row-v2--reverse' : ''} reveal ${feature.isVisible ? 'visible' : ''}`}
            >
              <div className="feature-number-v2">{feature.number}</div>
              <div className="feature-content-v2">
                <h3 className="feature-title-v2">{feature.title}</h3>
                <p className="feature-desc-v2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
