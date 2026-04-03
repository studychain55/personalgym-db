import Head from "next/head";
import type { GymFaq } from "@/types";

interface JsonLDFaqProps {
  faqs: GymFaq[];
}

/**
 * FAQPage構造化データ
 */
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

export default JsonLDFaq;
