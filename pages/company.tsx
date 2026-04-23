import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CompanyInfo from '@/components/CompanyInfo';
import MissionVision from '@/components/MissionVision';
import CTASection from '@/components/CTASection';
import PageSeo from '@/components/PageSeo';

export default function Company() {
  return (
    <>
      <PageSeo
        title="会社概要 | union"
        description="unionを運営する株式会社main characterの会社概要。現場で働くプロフェッショナルのためのSaaSプロダクトを提供しています。"
        path="/company"
      />

      <Header />
      <PageHero
        eyebrow="Company — 会社概要"
        title="unionをつくる会社"
        subtitle="現場の隣で、職人と一緒にプロダクトを育てる。<br />株式会社main characterは、福岡・百道から現場発のSaaSを届けています。"
      />

      <CompanyInfo />
      <MissionVision />
      <CTASection />
      <Footer />
    </>
  );
}
