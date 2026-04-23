import Head from 'next/head';
import { SITE_URL } from '@/lib/siteUrl';

type OgType = 'website' | 'article';

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: OgType;
  publishedTime?: string;
  modifiedTime?: string;
};

function toAbsoluteUrl(value: string): string {
  if (/^https?:\/\//.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
}

export default function PageSeo({
  title,
  description,
  path,
  image,
  imageWidth,
  imageHeight,
  type = 'website',
  publishedTime,
  modifiedTime,
}: Props) {
  const canonical = `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const ogImage = image ? toAbsoluteUrl(image) : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="union" />
      <meta property="og:locale" content="ja_JP" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {ogImage && imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
    </Head>
  );
}
