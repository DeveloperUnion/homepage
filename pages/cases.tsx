import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CaseStudies from '@/components/CaseStudies';
import CTASection from '@/components/CTASection';

export default function Cases() {
  return (
    <>
      <Head>
        <title>導入事例 | union</title>
        <meta
          name="description"
          content="unionプロダクトの導入事例をご紹介します。"
        />
      </Head>

      <Header />
      <PageHero
        title="導入事例"
        subtitle="unionプロダクトの<br />導入事例をご紹介"
      />

      <CaseStudies />
      <CTASection />
      <Footer />
    </>
  );
}
