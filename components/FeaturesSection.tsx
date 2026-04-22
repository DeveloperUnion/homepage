'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const pillars = [
  {
    title: 'とにかくシンプル',
    desc: '余計な機能は入れない。初めて触れる人でも迷わない、わかりやすさを一番にしたデザインです。',
  },
  {
    title: '現場の声から生まれている',
    desc: '開発チームが実際に現場に足を運び、課題を聞いてつくっています。机上の空論ではない、本当に必要な機能だけを届けます。',
  },
  {
    title: '小さく始めて、少しずつ広げる',
    desc: 'まずは1つのアプリから導入OK。現場が慣れてきたら、次のツールへ。無理なく段階的にDX化を進められます。',
  },
];

export default function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal();

  return (
    <section className="pillars" id="pillars">
      <div
        ref={headerRef}
        className={`pillars__head rv ${headerVisible ? 'in' : ''}`}
      >
        <div>
          <p className="pillars__eyebrow">Why union?</p>
          <h2 className="pillars__title">選ばれる理由</h2>
        </div>
        <p className="pillars__intro">
          現場で「明日から使える」と言ってもらえること。
          それだけを基準に、私たちは三つの姿勢を大切にしています。
        </p>
      </div>

      <div ref={listRef} className="pillars__list">
        {pillars.map((p, i) => (
          <article
            key={i}
            className={`pillar rv rv-d${i + 1} ${listVisible ? 'in' : ''}`}
          >
            <div className="pillar__mark" />
            <h3 className="pillar__name">{p.title}</h3>
            <p className="pillar__desc">{p.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
