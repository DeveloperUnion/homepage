'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type IconName =
  | 'document'
  | 'cart'
  | 'calculator'
  | 'template'
  | 'refresh'
  | 'clipboard';

function FeatureIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'document':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h8l4 4v14H7V3z" />
          <path d="M15 3v4h4" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    case 'cart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4h2l2 11h12l2-8H6" />
          <circle cx="9" cy="19" r="1.4" />
          <circle cx="17" cy="19" r="1.4" />
        </svg>
      );
    case 'calculator':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="1.5" />
          <rect x="7" y="5" width="10" height="4" />
          <circle cx="9" cy="13" r="0.7" fill="currentColor" />
          <circle cx="12" cy="13" r="0.7" fill="currentColor" />
          <circle cx="15" cy="13" r="0.7" fill="currentColor" />
          <circle cx="9" cy="16" r="0.7" fill="currentColor" />
          <circle cx="12" cy="16" r="0.7" fill="currentColor" />
          <circle cx="15" cy="16" r="0.7" fill="currentColor" />
        </svg>
      );
    case 'template':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="6" width="13" height="15" rx="1" />
          <path d="M8 3h11v15" />
          <path d="M7 11h7M7 15h7" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12a8 8 0 0 1-14.93 3.93" />
          <path d="M4 12a8 8 0 0 1 14.93-3.93" />
          <path d="M20 4v5h-5" />
          <path d="M4 20v-5h5" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="12" height="17" rx="1.5" />
          <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}

const showcases: {
  slug: string;
  brandSub: string;
  headlinePre: string;
  headlineLeadIn: string;
  headlineEm: string;
  headlinePost: string;
  sub: string;
  features: { label: string; icon: IconName }[];
  image: string;
  imageAlt: string;
}[] = [
  {
    slug: 'scaffold',
    brandSub: 'for 足場',
    headlinePre: '足場資材の発注を、',
    headlineLeadIn: 'もっと',
    headlineEm: 'かんたん',
    headlinePost: 'に。',
    sub: '現場で選んで、そのまま手配。',
    features: [
      { label: 'カンタン選択', icon: 'document' },
      { label: 'スピード発注', icon: 'cart' },
      { label: '即座に重量計算', icon: 'calculator' },
    ],
    image: '/images/products/scaffold-keyvisual.png',
    imageAlt: 'union 発注 for 足場 — 足場資材の発注画面イメージ',
  },
  {
    slug: 'lease',
    brandSub: 'for リース',
    headlinePre: 'リース機材の発注を、',
    headlineLeadIn: 'もっと',
    headlineEm: 'スムーズ',
    headlinePost: 'に。',
    sub: 'テンプレートで、電話確認ゼロへ。',
    features: [
      { label: 'テンプレート発注', icon: 'template' },
      { label: '在庫リアルタイム', icon: 'refresh' },
      { label: '返却まで一元管理', icon: 'clipboard' },
    ],
    image: '/images/products/lease-keyvisual.png',
    imageAlt: 'union 発注 for リース — リース機材の発注画面イメージ',
  },
];

function ShowcaseCard({ sc }: { sc: (typeof showcases)[number] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Link
      href={`/services#service-${sc.slug}`}
      ref={ref}
      className={`product-showcase rv ${isVisible ? 'in' : ''}`}
    >
      <div className="showcase__body">
        <div className="showcase__brand">
          <Image
            src="/images/icon-shizai.png"
            alt=""
            width={486}
            height={823}
            className="showcase__brand-icon"
          />
          <div className="showcase__brand-text">
            発注<span className="sub">{sc.brandSub}</span>
          </div>
        </div>

        <h3 className="showcase__headline">
          {sc.headlinePre}
          <br />
          {sc.headlineLeadIn}
          <em>{sc.headlineEm}</em>
          {sc.headlinePost}
        </h3>

        <p className="showcase__sub">{sc.sub}</p>

        <div className="showcase__features">
          {sc.features.map((f) => (
            <div key={f.label} className="showcase__feature">
              <span className="showcase__feature-icon" aria-hidden="true">
                <FeatureIcon name={f.icon} />
              </span>
              <span className="showcase__feature-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="showcase__image">
        <Image
          src={sc.image}
          alt={sc.imageAlt}
          fill
          sizes="(max-width: 1100px) 100vw, 380px"
        />
      </div>

      <div className="showcase__arrow" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeLinecap="round">
          <line
            className="showcase__arrow-line"
            x1="4"
            y1="20"
            x2="28"
            y2="20"
            strokeWidth="1"
          />
          <path d="M22 12 L32 20 L22 28" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();

  return (
    <section className="products" id="products">
      <div
        ref={headRef}
        className={`products__head rv ${headVisible ? 'in' : ''}`}
      >
        <div>
          <p className="products__eyebrow">Products</p>
          <h2 className="products__title">プロダクト</h2>
        </div>
        <p className="products__lede">
          現場の課題に特化したSaaSプロダクトをラインナップで提供。
          現場の声から生まれたツールで、日々の業務をシンプルにします。
        </p>
      </div>

      <div className="product-showcases">
        {showcases.map((sc) => (
          <ShowcaseCard key={sc.slug} sc={sc} />
        ))}
      </div>
    </section>
  );
}
