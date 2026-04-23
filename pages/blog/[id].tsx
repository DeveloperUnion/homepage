import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageSeo from '@/components/PageSeo';
import { getBlogById, getAllBlogIds, Blog } from '@/lib/blog';
import { SITE_URL } from '@/lib/siteUrl';
import styles from '@/styles/BlogDetail.module.css';

type Props = {
  blog: Blog;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogDetail({ blog }: Props) {
  const description = (blog.html || blog.content)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 150);

  const canonical = `${SITE_URL}/blog/${blog.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    ...(blog.eyecatch ? { image: blog.eyecatch.url } : {}),
    author: {
      '@type': 'Organization',
      name: '株式会社main character',
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社main character',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <>
      <PageSeo
        title={`${blog.title} | ブログ - union`}
        description={description}
        path={`/blog/${blog.id}`}
        image={blog.eyecatch?.url}
        imageWidth={blog.eyecatch?.width}
        imageHeight={blog.eyecatch?.height}
        type="article"
        publishedTime={new Date(blog.publishedAt).toISOString()}
        modifiedTime={new Date(blog.updatedAt).toISOString()}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main className={styles.blogDetail}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroInner}>
            <Link href="/blog" className={styles.back}>
              <span aria-hidden="true">←</span>
              Journal
            </Link>

            <div className={styles.heroMeta}>
              <span className={styles.heroMetaLine} aria-hidden="true" />
              {blog.category && (
                <span className={styles.heroCategory}>{blog.category.name}</span>
              )}
              <time className={styles.heroDate}>{formatDate(blog.publishedAt)}</time>
            </div>

            <h1 className={styles.heroTitle}>{blog.title}</h1>
          </div>
        </header>

        {blog.eyecatch && (
          <div className={styles.eyecatchWrap}>
            <div className={styles.eyecatch}>
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                sizes="(max-width: 1100px) 100vw, 1080px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        )}

        <article className={styles.article}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.html || blog.content }}
          />

          <footer className={styles.articleFooter}>
            <Link href="/blog" className={styles.backBottom}>
              <span aria-hidden="true">←</span>
              すべての記事を見る
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllBlogIds();

  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return { notFound: true };
  }

  const blog = await getBlogById(params.id);

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: { blog },
  };
};
