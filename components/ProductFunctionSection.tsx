'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ProductFunction } from '@/lib/products';

type Props = {
  fn: ProductFunction;
  align: 'image-right' | 'image-left';
  tone: 'white' | 'gray';
};

type MediaKind = 'composite' | 'portrait' | 'single';

function resolveMediaKind(fn: ProductFunction): MediaKind {
  if (fn.imageFront) return 'composite';
  if (fn.imageLayout === 'portrait') return 'portrait';
  return 'single';
}

export default function ProductFunctionSection({ fn, align, tone }: Props) {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>();

  const kind = resolveMediaKind(fn);

  const sectionClass = [
    'product-function',
    align === 'image-left' ? 'product-function--reverse' : '',
    tone === 'gray' ? 'product-function--gray' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mediaClass = [
    'product-function__media',
    `product-function__media--${kind}`,
    'rv rv-d2',
    imageVisible ? 'in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClass}>
      <div className="product-function__inner">
        <div
          ref={textRef}
          className={`product-function__text rv ${textVisible ? 'in' : ''}`}
        >
          <p className="product-function__label">{fn.label}</p>
          <h2 className="product-function__title">{fn.title}</h2>
          {fn.description.map((p, i) => (
            <p key={i} className="product-function__desc">
              {p}
            </p>
          ))}
          {fn.bullets && fn.bullets.length > 0 && (
            <ul className="product-function__bullets">
              {fn.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        <div ref={imageRef} className={mediaClass}>
          {kind === 'composite' && (
            <>
              <div className="product-function__composite-back">
                <Image
                  src={fn.image}
                  alt={fn.imageAlt}
                  fill
                  sizes="(max-width: 1100px) 70vw, 480px"
                />
              </div>
              <div className="product-function__composite-front">
                <Image
                  src={fn.imageFront as string}
                  alt={fn.imageFrontAlt ?? ''}
                  fill
                  sizes="(max-width: 1100px) 30vw, 200px"
                />
              </div>
            </>
          )}

          {kind === 'portrait' && (
            <div className="product-function__portrait">
              <Image
                src={fn.image}
                alt={fn.imageAlt}
                fill
                sizes="(max-width: 1100px) 60vw, 320px"
              />
            </div>
          )}

          {kind === 'single' && (
            <Image
              src={fn.image}
              alt={fn.imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 620px"
            />
          )}
        </div>
      </div>
    </section>
  );
}
