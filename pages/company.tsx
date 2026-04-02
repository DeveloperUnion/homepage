import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CompanyInfo from '@/components/CompanyInfo';
import MissionVision from '@/components/MissionVision';

export default function Company() {
  return (
    <>
      <Head>
        <title>会社概要 | union</title>
        <meta
          name="description"
          content="unionを運営する株式会社main characterの会社概要。現場で働くプロフェッショナルのためのSaaSプロダクトを提供しています。"
        />
      </Head>

      <Header />
      <PageHero
        title="会社概要"
        subtitle="unionを運営する<br />株式会社main characterについて"
      />

      <CompanyInfo />
      <MissionVision />
      <Footer />
    </>
  );
}
