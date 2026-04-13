import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage, JsonLDBreadcrumbs } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchBrandBySlug } from "@/utils/supabase/fetchBrands";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import supabase from "@/utils/supabase/index";
import type { GymListItem, GymBrand } from "@/types";

const PER_PAGE = 20;

interface BrandPageProps {
  brand: GymBrand;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
  prefectures: { id: number; title: string; slug: string }[];
}

export const getServerSideProps: GetServerSideProps<BrandPageProps> = async ({ params, query, res }) => {
  const slug = String(params?.slug || "");
  const brand = await fetchBrandBySlug(slug);
  if (!brand) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGyms({ brandId: brand.id, page, limit: PER_PAGE });

  const { data: prefectureData } = await supabase
    .from("Prefecture")
    .select("id, title, slug")
    .order("id", { ascending: true });

  const prefectures = (prefectureData || []) as { id: number; title: string; slug: string }[];

  setConditionalCacheHeaders(res, result.totalCount);

  return { props: { brand, gyms: result.gyms, totalCount: result.totalCount, page, prefectures } };
};

export default function BrandPage({ brand, gyms, totalCount, page, prefectures }: BrandPageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/brand/${brand.slug}/`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: brand.name },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  // Get prefectures that have gyms for this brand
  const prefecturesWithGyms = Array.from(
    new Set(gyms.map((gym) => gym.prefecture?.slug).filter(Boolean))
  ).map((slug) => prefectures.find((p) => p.slug === slug)).filter(Boolean) as { id: number; title: string; slug: string }[];

  return (
    <Layout>
      <SEO
        title={`${brand.name}の店舗一覧・料金比較${page > 1 ? `（${page}ページ目）` : ""}`}
        description={`${brand.name}の全${totalCount}店舗を比較。料金・口コミ・特徴で${brand.name}のあなたに合った店舗が見つかる。${prefecturesWithGyms.slice(0, 3).map((p) => p.title).join("・")}など全国対応。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${brand.name}の店舗一覧`}
        description={`${brand.name}の全店舗`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-4 flex items-center gap-4">
          {brand.logo_url && (
            <img src={brand.logo_url} alt={brand.name} className="w-16 h-16 object-contain rounded" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {brand.name}
              <span className="text-base font-normal text-gray-500 ml-2">({totalCount}店舗)</span>
            </h1>
            {brand.description && (
              <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
            )}
            {brand.founded_year && (
              <p className="text-xs text-gray-500 mt-1">設立年: {brand.founded_year}年</p>
            )}
          </div>
        </div>

        {/* SEO Text */}
        {totalCount > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg p-5 text-sm text-gray-700 leading-relaxed">
            <p>
              <span className="font-bold">{brand.name}</span>
              の全国{totalCount}店舗の詳細情報を一覧表示しています。
              料金比較、口コミ評価、トレーナー情報、アクセスなど、
              {brand.name}でジム選びに必要な情報をすべて掲載。
              {prefecturesWithGyms.length > 0 && (
                <span>
                  {prefecturesWithGyms.slice(0, 3).map((p) => p.title).join("・")}
                  {prefecturesWithGyms.length > 3 && "など"}全国で{brand.name}の店舗を検索できます。
                </span>
              )}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {brand.name}の店舗はまだ登録されていません。
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

        {/* Prefecture Links */}
        {prefecturesWithGyms.length > 0 && (
          <section className="mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">都道府県別{brand.name}一覧</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {prefecturesWithGyms.map((pref) => (
                <a
                  key={pref.slug}
                  href={`/p-${pref.slug}/?brand=${brand.slug}`}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-[#1e782d] hover:shadow-md transition"
                >
                  <span className="font-medium text-gray-800">{pref.title}の{brand.name}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{brand.name}よくある質問</h2>
          <div className="space-y-3">
            <details className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none flex justify-between items-center">
                <span>Q. {brand.name}の選び方は？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600">
                A. 料金比較、口コミ評価、アクセス、トレーナー資格などから、あなたに最適な{brand.name}の店舗を選ぶことができます。
                このページから全店舗の詳細情報が確認でき、比較しながら選べます。
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none flex justify-between items-center">
                <span>Q. {brand.name}の料金相場は？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600">
                A. {brand.name}の料金は店舗ごとに異なります。
                上記一覧から気になる店舗をクリックして、詳細な料金プランを確認してください。
                体験トレーニングも多くの店舗で提供しています。
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none flex justify-between items-center">
                <span>Q. 無料体験や無料カウンセリングは？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600">
                A. {brand.name}の各店舗では無料体験やカウンセリングを実施しています。
                各店舗の詳細ページから「無料体験を予約」ボタンで申し込みできます。
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none flex justify-between items-center">
                <span>Q. {brand.name}のアクセスは良い？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600">
                A. {brand.name}は全国{totalCount}店舗展開しており、主要駅近くに立地しています。
                各店舗の詳細ページで最寄り駅情報をご確認ください。
              </div>
            </details>
          </div>
        </section>
      </div>
    </Layout>
  );
}
