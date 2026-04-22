'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const items = [
  {
    label: 'Mission',
    headline: 'シンプルなものを、現場の当たり前に',
    body:
      'シンプルな機能、シンプルなデザイン。ITに詳しくなくても迷わず使える。そんな「当たり前に使えるツール」を現場に届けることが、私たちの使命です。',
  },
  {
    label: 'Vision',
    headline: '雑務を減らす。誇りを増やす。',
    body:
      '建設・福祉をはじめ、現場で汗を流す人たちにこそ、テクノロジーの恩恵を届けたい。小さなアプリから始めて、気づけば業務が変わっている。そんな現場発のDXを、本気で広めていきます。',
  },
];

export default function PhilosophySection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal();

  return (
    <section className="philosophy" id="philosophy">
      <div
        ref={headRef}
        className={`philosophy__head rv ${headVisible ? 'in' : ''}`}
      >
        <div>
          <p className="philosophy__eyebrow">Philosophy</p>
          <h2 className="philosophy__title">
            私たちが
            <br />
            大切にしていること
          </h2>
        </div>
        <p className="philosophy__intro">
          unionは、ツールを売るのではなく、現場の時間を取り戻すために在ります。
          ミッションとビジョンは、その旗印です。
        </p>
      </div>

      <div ref={listRef} className="philosophy__body">
        {items.map((it, i) => (
          <article
            key={it.label}
            className={`philosophy__item rv rv-d${i + 1} ${listVisible ? 'in' : ''}`}
          >
            <p className="philosophy__label">{it.label}</p>
            <h3 className="philosophy__headline">{it.headline}</h3>
            <p className="philosophy__text">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
