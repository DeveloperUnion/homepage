import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import MemberProfiles from '@/components/MemberProfiles';
import TeamStrengths from '@/components/TeamStrengths';
import PageSeo from '@/components/PageSeo';

export default function Members() {
  return (
    <>
      <PageSeo
        title="メンバー紹介 | union"
        description="unionを開発・運営するチームメンバーをご紹介します。現場に通い、手を動かし、一緒に悩むチームです。"
        path="/members"
      />

      <Header />
      <PageHero
        eyebrow="Members — メンバー"
        title="unionをつくる人たち"
        subtitle="現場に通い、手を動かし、一緒に悩む。<br />unionを日々開発・運営しているチームをご紹介します。"
      />

      <MemberProfiles />
      <TeamStrengths />
      <Footer />
    </>
  );
}
