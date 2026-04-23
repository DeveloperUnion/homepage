import type { GetStaticProps } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import JournalSection from '@/components/JournalSection';
import CTASection from '@/components/CTASection';
import PageSeo from '@/components/PageSeo';
import { getAllBlogs, type Blog } from '@/lib/blog';

type Props = {
  latestBlogs: Blog[];
};

export default function Home({ latestBlogs }: Props) {
  return (
    <>
      <PageSeo
        title="union | 現場のあなたと、共につくる"
        description="職人の隣で考え、職人と一緒につくる。シンプルなアプリから始まる、現場発のデジタル変革。unionは現場特化のSaaSプロダクトシリーズです。"
        path="/"
      />

      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <JournalSection blogs={latestBlogs} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const blogs = await getAllBlogs();
    return {
      props: {
        latestBlogs: blogs.slice(0, 3),
      },
    };
  } catch (error) {
    console.error('Failed to fetch blogs for top page:', error);
    return {
      props: {
        latestBlogs: [],
      },
    };
  }
};
