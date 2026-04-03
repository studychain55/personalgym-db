import type { GetServerSideProps } from "next";

/**
 * 旧URL (/p-tokyo/) → 新URL (/gym/area/tokyo/) への301リダイレクト
 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = String(params?.prefectureSlug || "").replace(/^p-/, "");

  return {
    redirect: {
      destination: `/gym/area/${slug}/`,
      permanent: true,
    },
  };
};

export default function PrefectureRedirect() {
  return null;
}
