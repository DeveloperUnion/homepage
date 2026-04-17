'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const heroPhotos = [
  { label: '技術者', file: 'engineer.jpg' },
  { label: '介護士', file: 'care.jpg' },
  { label: '電気工事', file: 'electrician.jpg' },
  { label: '塗装工', file: 'painter.jpg' },
  { label: '建設職人', file: 'construction.jpg' },
];

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const titleLine1 = '現場のあなたと、';
  const titleLine2 = '共につくる。';

  return (
    <section className="hero-section hero-section--refined" ref={ref}>
      {/* 写真背景 */}
      <div className="hero-photo-bg">
        {heroPhotos.map((photo, i) => (
          <div key={i} className="hero-photo-col">
            <Image
              src={`/images/hero/${photo.file}`}
              alt={photo.label}
              width={600}
              height={900}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* オーバーレイ（テキスト可読性確保） */}
      <div className="hero-overlay" />

      {/* テキスト（前面レイヤー） */}
      <div className="hero-container hero-container--overlay">
        <div className="hero-text hero-text--center">
          <h1 className="hero-title hero-title--refined">
            <span className={`hero-title-line ${isVisible ? 'hero-title-line--visible' : ''}`}>
              {titleLine1.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${0.3 + i * 0.04}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <br />
            <span className={`hero-title-line ${isVisible ? 'hero-title-line--visible' : ''}`}>
              {titleLine2.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${0.3 + (titleLine1.length + i) * 0.04}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
          <p className={`hero-description hero-description--refined reveal stagger-2 ${isVisible ? 'visible' : ''}`}>
            職人の隣で考え、職人と一緒につくる。<br className="pc-only" />
            シンプルなアプリから始まる、現場発のデジタル変革。
          </p>
          <div className={`hero-cta reveal stagger-3 ${isVisible ? 'visible' : ''}`}>
            <Link href="/contact" className="btn-primary">
              まずは話を聞いてみる
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
