import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import MemberProfiles from '@/components/MemberProfiles';
import TeamStrengths from '@/components/TeamStrengths';

export default function Members() {
  return (
    <>
      <Head>
        <title>メンバー紹介 | union</title>
        <meta
          name="description"
          content="unionを開発・運営するチームメンバーをご紹介します。"
        />
      </Head>

      <Header />
      <PageHero
        title="メンバー紹介"
        subtitle="unionを開発・運営する<br />チームメンバー"
      />

      <MemberProfiles />
      <TeamStrengths />
      <Footer />
    </>
  );
}
