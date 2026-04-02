import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ | union</title>
        <meta
          name="description"
          content="unionプロダクトの導入やご質問など、お気軽にお問い合わせください。"
        />
      </Head>

      <Header />
      <PageHero
        title="お問い合わせ"
        subtitle="unionプロダクトの導入やご質問など<br />お気軽にお問い合わせください"
      />

      <ContactForm />
      <ContactInfo />
      <Footer />
    </>
  );
}
