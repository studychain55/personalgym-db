import type { GetServerSideProps } from "next";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchRegionsWithPrefectureCounts } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { siteName } from "@/utils/config";
import type { GymListItem, RegionWithPrefectures } from "@/types";
import NextLink from "next/link";

interface HomeProps {
  featuredGyms: GymListItem[];
  totalCount: number;
  regions: RegionWithPrefectures[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ res }) => {
  const [gymsResult, regions] = await Promise.all([
    fetchGyms({ limit: 12 }),
    fetchRegionsWithPrefectureCounts(),
  ]);

  setConditionalCacheHeaders(res, gymsResult.totalCount);

  return {
    props: {
      featuredGyms: gymsResult.gyms,
      totalCount: gymsResult.totalCount,
      regions,
    },
  };
};

export default function Home({ featuredGyms, totalCount, regions }: HomeProps) {
  return (
    <Layout>
      <SEO
        title={`${siteName} - 日本最大級のパーソナルジム検索・比較サイト`}
        description="全国のパーソナルジムを料金・口コミ・特徴で比較。あなたにぴったりのパーソナルジムが見つかる日本最大級の検索サイトです。"
        path="/"
      />
      <JsonLDListPage
        title={siteName}
        description="全国のパーソナルジム検索・比較"
        path="/"
        items={featuredGyms}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FFF3ED] to-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            あなたに最適な<span className="text-[#FF6B35]">パーソナルジム</span>が見つかる
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            全国{totalCount > 0 ? `${totalCount.toLocaleString()}件以上` : ""}のパーソナルジムを料金・口コミ・特徴で徹底比較
          </p>
          <div className="mt-8">
            <NextLink
              href="/all/"
              className="inline-block bg-[#FF6B35] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline"
            >
              ジム一覧を見る →
            </NextLink>
          </div>
        </div>
      </section>

      {/* Featured Gyms */}
      {featuredGyms.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">おすすめパーソナルジム</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
          {totalCount > 12 && (
            <div className="text-center mt-8">
              <NextLink
                href="/all/"
                className="inline-block border-2 border-[#FF6B35] text-[#FF6B35] font-bold px-8 py-3 rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors no-underline"
              >
                すべてのジムを見る（{totalCount.toLocaleString()}件）
              </NextLink>
            </div>
          )}
        </section>
      )}

      {/* Area Search */}
      <section id="area" className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">エリアからパーソナルジムを探す</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <div key={region.id} className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                  {region.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.prefectures.map((pref) => (
                    <NextLink
                      key={pref.id}
                      href={`/prefecture/${pref.slug}/`}
                      className="text-sm text-gray-600 hover:text-[#FF6B35] no-underline transition-colors"
                    >
                      {pref.title}
                      {pref.gym_count > 0 && (
                        <span className="text-xs text-gray-400 ml-0.5">({pref.gym_count})</span>
                      )}
                    </NextLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">パーソナルジムとは？</h2>
        <div className="prose prose-gray max-w-none text-gray-600">
          <p>
            パーソナルジムは、専属トレーナーがマンツーマンで指導する完全個室型のトレーニングジムです。
            一人ひとりの目標・体力・生活スタイルに合わせたオーダーメイドのトレーニングプログラムと食事指導を受けることができます。
          </p>
          <p>
            {siteName}では、料金・口コミ・設備・プログラム内容など多角的な情報で全国のパーソナルジムを比較できます。
            体験トレーニングの有無や、ウェア・シューズの無料レンタル、プロテイン提供などの付帯サービスも詳しく掲載しています。
          </p>
        </div>
      </section>
    </Layout>
  );
}
