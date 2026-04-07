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
    ...(gym.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: gym.address,
        ...(gym.postal_code && { postalCode: gym.postal_code }),
        addressCountry: "JP",
      },
    }),
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

interface JsonLDBreadcrumbListProps {
  items: { label: string; href?: string }[];
}

export const JsonLDBreadcrumbList: React.FC<JsonLDBreadcrumbListProps> = ({ items }) => {
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
      ...(item.href && { item: `${baseSiteUrl}${item.href}` }),
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

interface JsonLDDynamicFaqProps {
  gym: GymLocation;
}

export const JsonLDDynamicFaq: React.FC<JsonLDDynamicFaqProps> = ({ gym }) => {
  // Dynamic FAQs based on gym data
  const dynamicFaqs = [
    {
      question: `${gym.name}の料金体系について教えてください`,
      answer: gym.price_min || gym.price_max
        ? `${gym.name}の料金は、月額${gym.price_min ? `¥${gym.price_min.toLocaleString()}` : ""}${gym.price_max ? `～¥${gym.price_max.toLocaleString()}` : ""}です。${gym.trial_available && gym.price_trial !== null ? `体験レッスンは${gym.price_trial === 0 ? "無料" : `¥${gym.price_trial.toLocaleString()}`}です。` : ""}詳細は料金プランセクションをご参照ください。`
        : `${gym.name}の料金については、詳細な料金プランセクションをご参照いただくか、お問い合わせください。`,
    },
    {
      question: `${gym.name}では体験レッスンを受けることができますか？`,
      answer: gym.trial_available
        ? `はい、${gym.name}では体験レッスンをご用意しています。${gym.price_trial !== null ? `体験料金は${gym.price_trial === 0 ? "無料" : `¥${gym.price_trial.toLocaleString()}`}です。` : ""}お気軽にお問い合わせください。`
        : `${gym.name}の体験レッスンの詳細については、公式サイトをご確認いただくか、お問い合わせください。`,
    },
    {
      question: `${gym.name}へのアクセス方法を教えてください`,
      answer: gym.nearest_station
        ? `${gym.name}は${gym.nearest_station}駅から徒歩${gym.walk_minutes ?? ""}分の好立地にあります。${gym.address ? `住所は${gym.address}です。` : ""}${gym.access_info ? `詳細なアクセス情報：${gym.access_info}` : ""}`
        : gym.address
        ? `${gym.name}は${gym.address}に位置しています。詳細なアクセス情報については、公式サイトをご確認ください。`
        : `${gym.name}へのアクセス方法については、公式サイトをご確認ください。`,
    },
  ];

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dynamicFaqs.map((faq) => ({
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
