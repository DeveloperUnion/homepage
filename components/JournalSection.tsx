'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Blog } from '@/lib/blog';

type Props = { blogs: Blog[] };

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function JournalSection({ blogs }: Props) {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.05);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="journal" id="journal">
      <div
        ref={headRef}
        className={`journal__head rv ${headVisible ? 'in' : ''}`}
      >
        <div>
          <p className="journal__eyebrow">Journal</p>
          <h2 className="journal__title">現場から考える、発信</h2>
        </div>
        <Link href="/blog" className="journal__all">
          <span>すべての記事</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div ref={listRef} className="journal__list">
        {blogs.map((blog, i) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className={`journal__card rv rv-d${i + 1} ${listVisible ? 'in' : ''}`}
          >
            <div className="journal__eyecatch">
              {blog.eyecatch ? (
                <Image
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 420px"
                />
              ) : (
                <div className="journal__eyecatch-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="journal__meta">
              {blog.category && (
                <span className="journal__cat">{blog.category.name}</span>
              )}
              <time className="journal__date" dateTime={blog.publishedAt}>
                {formatDate(blog.publishedAt)}
              </time>
            </div>
            <h3 className="journal__card-title">{blog.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
