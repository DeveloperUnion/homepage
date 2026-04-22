import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { getAllBlogs, Blog } from '@/lib/blog';
import styles from '@/styles/Blog.module.css';

type Props = {
  blogs: Blog[];
};

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return { full: `${y}.${m}.${day}`, year: String(y), month: m };
}

function archiveKeyOf(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function buildHref(params: { category?: string | null; archive?: string | null; page?: number }) {
  const qs = new URLSearchParams();
  if (params.category) qs.set('category', params.category);
  if (params.archive) qs.set('archive', params.archive);
  if (params.page && params.page > 1) qs.set('page', String(params.page));
  const s = qs.toString();
  return s ? `/blog?${s}` : '/blog';
}

export default function BlogList({ blogs }: Props) {
  const router = useRouter();
  const activeCategory = typeof router.query.category === 'string' ? router.query.category : null;
  const activeArchive = typeof router.query.archive === 'string' ? router.query.archive : null;
  const pageParam = typeof router.query.page === 'string' ? parseInt(router.query.page, 10) : 1;

  const categories = blogs
    .filter((blog) => blog.category)
    .reduce((acc, blog) => {
      if (blog.category && !acc.find((c) => c.id === blog.category!.id)) {
        acc.push(blog.category);
      }
      return acc;
    }, [] as { id: string; name: string }[]);

  const archives = blogs.reduce((acc, blog) => {
    const date = new Date(blog.publishedAt);
    const yearMonth = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
    const key = archiveKeyOf(blog.publishedAt);

    if (!acc.find((a) => a.key === key)) {
      acc.push({ key, label: yearMonth, count: 1 });
    } else {
      acc.find((a) => a.key === key)!.count++;
    }
    return acc;
  }, [] as { key: string; label: string; count: number }[]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (activeCategory && blog.category?.id !== activeCategory) return false;
      if (activeArchive && archiveKeyOf(blog.publishedAt) !== activeArchive) return false;
      return true;
    });
  }, [blogs, activeCategory, activeArchive]);

  const isFiltering = Boolean(activeCategory || activeArchive);
  const activeCategoryName = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name ?? activeCategory
    : null;
  const activeArchiveLabel = activeArchive
    ? archives.find((a) => a.key === activeArchive)?.label ?? activeArchive
    : null;

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, isNaN(pageParam) ? 1 : pageParam), totalPages);
  const pagedBlogs = filteredBlogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <Head>
        <title>ブログ | union - 株式会社main character</title>
        <meta
          name="description"
          content="現場の業務改善やプロダクトに関する情報を発信しています。"
        />
        <meta
          name="keywords"
          content="union,SaaS,現場,建設業,福祉,業務改善,プロダクト"
        />
      </Head>

      <Header />
      <PageHero
        eyebrow="Journal — ブログ"
        title="現場からの、小さな発信"
        subtitle="プロダクトの裏側、現場の気づき、DX の実践。<br />unionチームが日々考えていることを、言葉にして残しています。"
      />

      <main className={styles.blogMain}>
        <div className={styles.container}>
          {blogs.length === 0 ? (
            <div className={styles.empty}>
              <p>まだ記事はありません。</p>
              <p className={styles.emptySub}>近いうちに、現場の声をお届けします。</p>
            </div>
          ) : (
            <>
              {(categories.length > 0 || archives.length > 0) && (
                <nav className={styles.filterBar} aria-label="記事フィルター">
                  {categories.length > 0 && (
                    <div className={styles.filterGroup}>
                      <span className={styles.filterLabel}>Category</span>
                      <ul className={styles.filterList}>
                        <li>
                          <Link
                            href={buildHref({ archive: activeArchive })}
                            className={`${styles.filterLink} ${!activeCategory ? styles.filterLinkActive : ''}`}
                          >
                            All
                          </Link>
                        </li>
                        {categories.map((c) => (
                          <li key={c.id}>
                            <Link
                              href={buildHref({ category: c.id, archive: activeArchive })}
                              className={`${styles.filterLink} ${activeCategory === c.id ? styles.filterLinkActive : ''}`}
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {archives.length > 0 && (
                    <div className={styles.filterGroup}>
                      <span className={styles.filterLabel}>Archive</span>
                      <ul className={styles.filterList}>
                        <li>
                          <Link
                            href={buildHref({ category: activeCategory })}
                            className={`${styles.filterLink} ${!activeArchive ? styles.filterLinkActive : ''}`}
                          >
                            All
                          </Link>
                        </li>
                        {archives.map((a) => (
                          <li key={a.key}>
                            <Link
                              href={buildHref({ category: activeCategory, archive: a.key })}
                              className={`${styles.filterLink} ${activeArchive === a.key ? styles.filterLinkActive : ''}`}
                            >
                              {a.label}
                              <span className={styles.filterCount}>{a.count}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </nav>
              )}

              {isFiltering && filteredBlogs.length === 0 && (
                <div className={styles.empty}>
                  <p>
                    {activeCategoryName ? `「${activeCategoryName}」` : ''}
                    {activeArchiveLabel ? `「${activeArchiveLabel}」` : ''}
                    に該当する記事はありません。
                  </p>
                  <p className={styles.emptySub}>
                    <Link href="/blog">すべての記事を表示</Link>
                  </p>
                </div>
              )}

              {filteredBlogs.length > 0 && (
                <div className={styles.listHead}>
                  <p className={styles.listLabel}>All entries</p>
                  {totalPages > 1 && (
                    <p className={styles.listCount}>
                      Page <span>{currentPage}</span>
                      <span className={styles.listCountDiv}>/</span>
                      <span>{totalPages}</span>
                    </p>
                  )}
                </div>
              )}

              <ul className={styles.entries}>
                {pagedBlogs.map((blog) => (
                  <li key={blog.id} className={styles.entry}>
                    <Link href={`/blog/${blog.id}`} className={styles.entryLink}>
                      {blog.eyecatch ? (
                        <div className={styles.entryMedia}>
                          <Image
                            src={blog.eyecatch.url}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 900px) 40vw, 320px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div className={`${styles.entryMedia} ${styles.entryMediaFallback}`} aria-hidden="true" />
                      )}
                      <div className={styles.entryBody}>
                        <div className={styles.entryMeta}>
                          <time className={styles.date}>
                            {formatDate(blog.publishedAt).full}
                          </time>
                          {blog.category && (
                            <span className={styles.category}>{blog.category.name}</span>
                          )}
                        </div>
                        <h3 className={styles.entryTitle}>{blog.title}</h3>
                      </div>
                      <span className={styles.entryArrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="ページネーション">
                  {currentPage > 1 ? (
                    <Link
                      href={buildHref({ category: activeCategory, archive: activeArchive, page: currentPage - 1 })}
                      className={styles.pageNav}
                      aria-label="前のページ"
                    >
                      ← Prev
                    </Link>
                  ) : (
                    <span className={`${styles.pageNav} ${styles.pageNavDisabled}`} aria-hidden="true">← Prev</span>
                  )}

                  <ol className={styles.pageList}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <li key={p}>
                        <Link
                          href={buildHref({ category: activeCategory, archive: activeArchive, page: p })}
                          className={`${styles.pageLink} ${p === currentPage ? styles.pageLinkActive : ''}`}
                          aria-current={p === currentPage ? 'page' : undefined}
                        >
                          {String(p).padStart(2, '0')}
                        </Link>
                      </li>
                    ))}
                  </ol>

                  {currentPage < totalPages ? (
                    <Link
                      href={buildHref({ category: activeCategory, archive: activeArchive, page: currentPage + 1 })}
                      className={styles.pageNav}
                      aria-label="次のページ"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className={`${styles.pageNav} ${styles.pageNavDisabled}`} aria-hidden="true">Next →</span>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogs = await getAllBlogs();

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return {
      props: {
        blogs: [],
      },
    };
  }
};
