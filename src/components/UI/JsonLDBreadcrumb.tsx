import Head from "next/head";
import { baseSiteUrl } from "@/utils/config";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface JsonLDBreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList構造化データ
 */
export const JsonLDBreadcrumb: React.FC<JsonLDBreadcrumbProps> = ({ items }) => {
  const allItems = [{ label: "ホーム", href: "/" }, ...items];

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseSiteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
    </Head>
  );
};

export default JsonLDBreadcrumb;
