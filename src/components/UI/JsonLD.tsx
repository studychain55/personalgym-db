import Head from "next/head";
import { baseSiteUrl, siteName } from "@/utils/config";
import type { GymFaq, GymLocation } from "@/types";

interface JsonLDListPageProps {
  title: string;
  description: string;
  path: string;
  items: { uid: string; name: string }[];
}

export const JsonLDListPage: React.FC<JsonLDListPageProps> = ({
  title,
  description,
  path,
  items,
}) => {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    url: `${baseSiteUrl}${path}`,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseSiteUrl}/gym/${item.uid}/`,
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

interface JsonLDGymDetailProps {
  gym: GymLocation;
}

export const JsonLDGymDetail: React.FC<JsonLDGymDetailProps> = ({ gym }) => {
  const jsonld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["ExerciseGym", "LocalBusiness"],
    name: gym.name,
    description: gym.description || gym.catchphrase || `${gym.name}の詳細情報`,
    url: `${baseSiteUrl}/gym/${gym.uid}/`,
    ...(gym.address && { address: { "@type": "PostalAddress", streetAddress: gym.address } }),
    ...(gym.phone && { telephone: gym.phone }),
    ...(gym.website_url && { sameAs: gym.website_url }),
    ...(gym.image_url && { image: gym.image_url }),
    ...(gym.latitude &&
      gym.longitude && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: gym.latitude,
          longitude: gym.longitude,
        },
      }),
    ...(gym.review_average_rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: gym.review_average_rating,
        reviewCount: gym.total_review_count,
      },
    }),
    ...(gym.price_min && {
      priceRange: gym.price_max
        ? `¥${gym.price_min.toLocaleString()}〜¥${gym.price_max.toLocaleString()}`
        : `¥${gym.price_min.toLocaleString()}〜`,
    }),
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

interface JsonLDBreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export const JsonLDBreadcrumbs: React.FC<JsonLDBreadcrumbsProps> = ({ items }) => {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    ...items.filter((item) => item.href),
    ...items.filter((item) => !item.href).slice(-1),
  ];

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseSiteUrl}${item.href}` : undefined,
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

interface JsonLDFaqProps {
  faqs: GymFaq[];
}

export const JsonLDFaq: React.FC<JsonLDFaqProps> = ({ faqs }) => {
  if (faqs.length === 0) return null;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
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
