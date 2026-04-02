import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogById, getAllBlogIds, Blog } from '@/lib/blog';
import styles from '@/styles/BlogDetail.module.css';

type Props = {
  blog: Blog;
};

export default function BlogDetail({ blog }: Props) {
  return (
    <>
      <Head>
        <title>{`${blog.title} | ブログ - 建設テックパートナーズ`}</title>
        <meta
          name="description"
          content={(blog.html || blog.content).substring(0, 150).replace(/<[^>]*>/g, '')}
        />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={(blog.html || blog.content).substring(0, 150).replace(/<[^>]*>/g, '')}
        />
        {blog.eyecatch && <meta property="og:image" content={blog.eyecatch.url} />}
        <meta property="og:type" content="article" />
      </Head>

      <Header />

      <main className={styles.blogDetail}>
        <div className={styles.container}>
          <Link href="/blog" className={styles.backLink}>
            ← ブログ一覧に戻る
          </Link>

          <article className={styles.article}>
            {blog.eyecatch && (
              <div className={styles.eyecatch}>
                <Image
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  width={blog.eyecatch.width}
                  height={blog.eyecatch.height}
                  priority
                />
              </div>
            )}

            <div className={styles.header}>
              <h1 className={styles.title}>{blog.title}</h1>

              <div className={styles.meta}>
                {blog.category && (
                  <span className={styles.category}>{blog.category.name}</span>
                )}
                <time className={styles.date}>
                  {new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: blog.html || blog.content }}
            />
          </article>

          <Link href="/blog" className={styles.backLinkBottom}>
            ← ブログ一覧に戻る
          </Link>
        </div>
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
