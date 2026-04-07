import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs, JsonLDListPage, JsonLDFaq } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { PURPOSE_DEFINITIONS } from "@/constants/purposes";
import Pagination from "@mui/material/Pagination";
import { fetchGymsByStation } from "@/utils/supabase/fetchStations";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, GymFaq } from "@/types";

const PER_PAGE = 20;

interface StationPageProps {
  stationName: string;
  decodedStationName: string;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  faqs: GymFaq[];
}

/**
 * Generate dynamic FAQs for station page
 */
function generateStationFaqs(stationName: string, totalCount: number): GymFaq[] {
  return [
    {
      id: 1,
      gym_id: null,
      question: `${stationName}駅周辺のパーソナルジムの料金相場は？`,
      answer: `${stationName}駅周辺のパーソナルジムの料金は、1回あたり5,000円～15,000円が相場です。入会金は0円～50,000円程度となっています。体験レッスンは1,000円～5,000円で受けられるジムが多いため、まずは体験から始めることをおすすめします。`,
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: `${stationName}駅で推奨のパーソナルジムは？`,
      answer: `${stationName}駅周辺には${totalCount}件のパーソナルジムが登録されています。駅からの距離や評価が高いジムを当サイトで比較できます。各ジムの詳細ページで実際の利用者の口コミも確認できるため、参考にしてください。`,
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: `${stationName}駅周辺で女性向けプランはありますか？`,
      answer: `${stationName}駅周辺の多くのパーソナルジムで女性向けプランや女性専用レッスンを提供しています。当サイトで「女性向け」のタグが付いているジムを検索することで、女性向けプランがあるジムが簡単に見つかります。`,
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: `${stationName}駅で初心者向けのパーソナルジムはありますか？`,
      answer: `${stationName}駅周辺の多くのパーソナルジムが初心者向けプログラムを用意しています。初心者こそパーソナルトレーニングがおすすめです。専門的なトレーナーが正しいフォームを指導してくれるので、怪我のリスクが低く、効果的に身体を変えることができます。当サイトで「初心者向け」タグで検索すると、初心者向けプログラムが充実しているジムが見つかります。`,
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: `パーソナルジムで本当に痩せられますか？`,
      answer: `正しいトレーニングと栄養指導を組み合わせることで、多くの人が目標の体重に到達しています。特に「食事指導」が付いているパーソナルジムを選ぶことが重要です。実績が気になる場合は、ジムの詳細ページでビフォーアフターや口コミを確認してください。`,
      sort_order: 5,
      is_global: false,
    },
  ];
}

export const getServerSideProps: GetServerSideProps<StationPageProps> = async ({
  params,
  query,
  res,
}) => {
  const encodedStation = String(params?.station || "");
  const decodedStationName = decodeURIComponent(encodedStation);

  // Check if station exists by fetching 1 result
  const checkResult = await fetchGymsByStation(decodedStationName, 1, 1);

  if (checkResult.totalCount === 0) {
    return { notFound: true };
  }

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const gymResult = await fetchGymsByStation(decodedStationName, page, PER_PAGE);

  // Generate FAQs dynamically
  const faqs: GymFaq[] = generateStationFaqs(decodedStationName, gymResult.totalCount);

  setConditionalCacheHeaders(res, gymResult.totalCount);

  return {
    props: {
      stationName: decodedStationName,
      decodedStationName,
      gyms: gymResult.gyms,
      totalCount: gymResult.totalCount,
      page,
      faqs,
    },
  };
};

export default function StationPage({
  stationName,
  decodedStationName,
  gyms,
  totalCount,
  page,
  faqs,
}: StationPageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/station/${encodeURIComponent(decodedStationName)}/`;

  const breadcrumbItems = [
    { label: "駅から探す", href: "/station/" },
    { label: `${decodedStationName}駅` },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${decodedStationName}駅周辺のパーソナルジム${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${decodedStationName}駅周辺のパーソナルジム${totalCount}件を比較。駅からの近さ・料金・口コミで${decodedStationName}駅のあなたにぴったりのジムが見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${decodedStationName}駅周辺のパーソナルジム`}
        description={`${decodedStationName}駅周辺のパーソナルジム一覧`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {decodedStationName}駅周辺のパーソナルジム
          <span className="text-base font-normal text-gray-500 ml-2">
            ({totalCount.toLocaleString()}件)
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          {decodedStationName}駅周辺で料金・体験・食事指導・目的別の違いを比較しやすいように、主要情報が分かるジムを一覧化しています。
        </p>

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {decodedStationName}駅周辺のパーソナルジムについて
          </h2>
          <p className="text-gray-700 mb-2">
            {decodedStationName}駅周辺には、ダイエット・ボディメイク・健康増進など、様々な目的に対応したパーソナルジムが{totalCount}
            件あります。プロのトレーナーによるマンツーマン指導で、効率的に目標を達成することができます。
          </p>
          <p className="text-gray-700 mb-2">
            料金・入会金・食事指導の有無など、ジムごとに特徴が異なります。体験レッスンを受けて、自分に合ったジムを見つけることをおすすめします。
          </p>
          <p className="text-gray-700">
            当サイトでは、{decodedStationName}駅周辺の主要パーソナルジムを掲載しており、駅からの距離・口コミ・評価・料金を一覧で比較できます。
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-orange-100 bg-orange-50/70 p-5">
          <h2 className="text-lg font-bold text-gray-900">目的から探す</h2>
          <p className="text-sm text-gray-600 mt-2">
            「ダイエット」「女性向け」「初心者向け」など、検討目的に近い一覧へすぐ移動できます。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSE_DEFINITIONS.map((purpose) => (
              <NextLink
                key={purpose.slug}
                href={`/${purpose.slug}/`}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-[#FF6B35] no-underline hover:bg-orange-100 transition-colors"
              >
                {purpose.shortLabel}
              </NextLink>
            ))}
          </div>
        </section>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          {decodedStationName}駅周辺全体のジム一覧
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {decodedStationName}駅周辺にはまだパーソナルジムが登録されていません。
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              size="large"
            />
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {decodedStationName}駅周辺のパーソナルジムについてよくある質問
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border border-gray-300 rounded-lg p-4 hover:border-orange-300 transition-colors"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-lg group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 関連コラム */}
        <section className="mt-10 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">パーソナルジムに関するコラム記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: "/column/gym-trial/", title: "パーソナルジムの体験入会を活用しよう" },
              { href: "/column/women-gym/", title: "女性専用パーソナルジムの選び方" },
              { href: "/column/gym-cost/", title: "パーソナルジムの料金相場｜費用を抑える方法" },
              { href: "/column/gym-diet/", title: "パーソナルジムでダイエットを成功させる方法" },
              { href: "/column/gym-trainer/", title: "パーソナルトレーナーの選び方と資格の見方" },
              { href: "/column/gym-bodymake/", title: "パーソナルジムで体が変わるまでの期間と目安" },
              { href: "/column/gym-price/", title: "パーソナルジムの料金相場｜費用を抑えるコツ" },
              { href: "/column/gym-choosing/", title: "パーソナルジムの選び方｜失敗しない7つのポイント" },
              { href: "/column/gym-muscle/", title: "筋トレ効果を高めるパーソナルジム活用法" },
              { href: "/column/gym-senior/", title: "シニア・50代からのパーソナルジム" },
              { href: "/column/gym-student/", title: "学生・20代向けパーソナルジムの選び方" },
              { href: "/column/gym-continuing/", title: "パーソナルジムを続けるコツ｜モチベーション維持" },
              { href: "/column/gym-compare/", title: "パーソナルジムを複数比較する方法" },
              { href: "/column/gym-rebound/", title: "パーソナルジム卒業後のリバウンド防止" },
              { href: "/column/gym-age/", title: "40代・50代からのパーソナルジム" },
            ].map((col) => (
              <a
                key={col.href}
                href={col.href}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-sm text-gray-800 hover:text-orange-500">{col.title}</h3>
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
