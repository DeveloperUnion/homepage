'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ProductWorkflow, WorkflowIcon } from '@/lib/products';

type Props = {
  workflow: ProductWorkflow;
};

function StepIcon({ name }: { name: WorkflowIcon }) {
  switch (name) {
    case 'sunrise':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 24h24" />
          <path d="M8 24a8 8 0 0 1 16 0" />
          <path d="M16 6v4" />
          <path d="M6 14l2 2" />
          <path d="M26 14l-2 2" />
          <path d="M2 28h28" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="4" width="14" height="24" rx="2.5" />
          <path d="M13 8h6" />
          <circle cx="16" cy="24" r="1" fill="currentColor" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h14v14H3z" />
          <path d="M17 12h7l4 5v5h-11" />
          <circle cx="9" cy="24" r="2.2" />
          <circle cx="23" cy="24" r="2.2" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 27V6" />
          <path d="M5 27h22" />
          <path d="M10 22v-7" />
          <path d="M16 22v-12" />
          <path d="M22 22v-5" />
        </svg>
      );
  }
}

export default function ProductWorkflowSection({ workflow }: Props) {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="product-workflow">
      <div className="product-workflow__inner">
        <div
          ref={headRef}
          className={`product-workflow__head rv ${headVisible ? 'in' : ''}`}
        >
          <p className="product-workflow__eyebrow">{workflow.eyebrow}</p>
          <h2 className="product-workflow__title">{workflow.title}</h2>
          {workflow.lead && <p className="product-workflow__lead">{workflow.lead}</p>}
        </div>

        <div
          ref={gridRef}
          className={`product-workflow__grid rv rv-d2 ${gridVisible ? 'in' : ''}`}
        >
          {workflow.steps.map((step, idx) => (
            <article key={step.title} className="product-workflow__step">
              <div className="product-workflow__step-head">
                <span className="product-workflow__step-icon" aria-hidden="true">
                  <StepIcon name={step.icon} />
                </span>
                <span className="product-workflow__step-label">{step.label}</span>
              </div>
              <h3 className="product-workflow__step-title">{step.title}</h3>
              <p className="product-workflow__step-desc">{step.description}</p>
              {idx < workflow.steps.length - 1 && (
                <span className="product-workflow__step-connector" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
