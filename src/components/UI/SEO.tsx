import Head from "next/head";
import { baseSiteUrl, siteName } from "@/utils/config";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, path, noindex, ogImage }) => {
  const url = `${baseSiteUrl}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteName}`;
  const image = ogImage || `${baseSiteUrl}/og-default.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
