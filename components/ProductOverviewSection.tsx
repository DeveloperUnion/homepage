'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ProductOverview } from '@/lib/products';

type Props = {
  overview: ProductOverview;
};

export default function ProductOverviewSection({ overview }: Props) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="product-overview">
      <div className="product-overview__inner">
        <div
          ref={ref}
          className={`product-overview__text rv ${isVisible ? 'in' : ''}`}
        >
          <p className="product-overview__eyebrow">{overview.eyebrow}</p>
          <h2
            className="product-overview__title"
            dangerouslySetInnerHTML={{ __html: overview.title }}
          />
          <p className="product-overview__lead">{overview.lead}</p>
        </div>
      </div>
    </section>
  );
}
