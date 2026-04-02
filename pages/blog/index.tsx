import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { getAllBlogs, Blog } from '@/lib/blog';
import styles from '@/styles/Blog.module.css';

type Props = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: Props) {
  // カテゴリー一覧を取得
  const categories = blogs
    .filter((blog) => blog.category)
    .reduce((acc, blog) => {
      if (blog.category && !acc.find((c) => c.id === blog.category!.id)) {
        acc.push(blog.category);
      }
      return acc;
    }, [] as { id: string; name: string }[]);

  // アーカイブ（年月別）を取得
  const archives = blogs.reduce((acc, blog) => {
    const date = new Date(blog.publishedAt);
    const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc.find((a) => a.key === key)) {
      acc.push({ key, label: yearMonth, count: 1 });
    } else {
      acc.find((a) => a.key === key)!.count++;
    }
    return acc;
  }, [] as { key: string; label: string; count: number }[]);

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
        title="ブログ"
        subtitle="現場の業務改善やプロダクトに関する情報を発信しています"
      />

      <main className={styles.blogMain}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              {blogs.length === 0 ? (
                <div className={styles.empty}>
                  <p>記事がまだありません</p>
                </div>
              ) : (
                <div className={styles.blogList}>
                  {blogs.map((blog) => (
                    <Link href={`/blog/${blog.id}`} key={blog.id} className={styles.blogCard}>
                      {blog.eyecatch && (
                        <div className={styles.eyecatch}>
                          <Image
                            src={blog.eyecatch.url}
                            alt={blog.title}
                            width={blog.eyecatch.width}
                            height={blog.eyecatch.height}
                          />
                        </div>
                      )}
                      <div className={styles.content}>
                        <h2 className={styles.blogTitle}>{blog.title}</h2>
                        <div className={styles.meta}>
                          {blog.category && (
                            <span className={styles.category}>{blog.category.name}</span>
                          )}
                          <time className={styles.date}>
                            {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              {categories.length > 0 && (
                <div className={styles.sidebarWidget}>
                  <h3 className={styles.sidebarTitle}>カテゴリー</h3>
                  <ul className={styles.categoryList}>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link href={`/blog?category=${category.id}`} className={styles.categoryLink}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {archives.length > 0 && (
                <div className={styles.sidebarWidget}>
                  <h3 className={styles.sidebarTitle}>アーカイブ</h3>
                  <ul className={styles.archiveList}>
                    {archives.map((archive) => (
                      <li key={archive.key}>
                        <Link href={`/blog?archive=${archive.key}`} className={styles.archiveLink}>
                          {archive.label} ({archive.count})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
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
