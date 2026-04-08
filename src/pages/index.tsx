import type { GetServerSideProps } from "next";
import supabase from "@/utils/supabase";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchRegionsWithPrefectureCounts } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { siteName, baseSiteUrl } from "@/utils/config";
import type { GymListItem, RegionWithPrefectures } from "@/types";
import NextLink from "next/link";

interface CityItem {
  title: string;
  slug: string;
  entity_count: number;
}

interface HomeProps {
  featuredGyms: GymListItem[];
  totalCount: number;
  regions: RegionWithPrefectures[];
  topCities: CityItem[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ res }) => {
  const [gymsResult, regions] = await Promise.all([
    fetchGyms({ limit: 12 }),
    fetchRegionsWithPrefectureCounts(),
  ]);

  setConditionalCacheHeaders(res, gymsResult.totalCount);
  const entityCitiesRes = await supabase
    .from("gym_locations")
    .select("city_id")
    .eq("is_display", true)
    .not("city_id", "is", null);

  const cityCounts: Record<number, number> = {};
  for (const s of entityCitiesRes.data ?? []) {
    if (s.city_id) cityCounts[s.city_id] = (cityCounts[s.city_id] || 0) + 1;
  }

  const topCityIds = Object.entries(cityCounts)
    .filter(([, count]) => count >= 3)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 24)
    .map(([id]) => parseInt(id));

  let topCities: CityItem[] = [];
  if (topCityIds.length > 0) {
    const citiesRes = await supabase
      .from("City")
      .select("id, title, slug")
      .in("id", topCityIds);
    topCities = (citiesRes.data ?? []).map((c: any) => ({
      title: c.title,
      slug: c.slug,
      entity_count: cityCounts[c.id] || 0,
    }));
    topCities.sort((a, b) => b.entity_count - a.entity_count);
  }



  return {
    props: {
      featuredGyms: gymsResult.gyms,
      totalCount: gymsResult.totalCount,
      regions,
      topCities,
    },
  };
};

export default function Home({ featuredGyms, totalCount, regions, topCities }: HomeProps) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": baseSiteUrl,
            "description": `全国のパーソナルジムを料金・口コミ・特徴で比較できる「${siteName}」。あなたにぴったりのパーソナルジムが見つかります。`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question", "name": "パーソナルジムに通う費用はどのくらいですか？", "acceptedAnswer": {"@type": "Answer", "text": "パーソナルジムの費用はコースにより異なりますが、1～3ヶ月のダイエットコースで15万～60万円、都度払い（1回）で8,000～15,000円が一般的な相場です。無料体験レッスンを活用して自分に合ったジムを選びましょう。"}},
              {"@type": "Question", "name": "パーソナルジムはどのくらいの期間通えば効果が出ますか？", "acceptedAnswer": {"@type": "Answer", "text": "個人差はありますが、週2回以上のトレーニングで2～3ヶ月が一つの目安です。食事管理も合わせて行うことで効果が出やすくなります。多くのパーソナルジムでは2～3ヶ月の短期集中コースを提供しています。"}},
              {"@type": "Question", "name": "パーソナルジムと普通のジムの違いは何ですか？", "acceptedAnswer": {"@type": "Answer", "text": "パーソナルジムは専属トレーナーが個人の目標・体型・体力に合わせてプログラムを設計し、マンツーマンで指導します。普通のジムに比べて費用は高めですが、効率的に目標達成できます。食事管理・栄養指導が含まれるコースも多いです。"}},
              {"@type": "Question", "name": "初心者でもパーソナルジムに通えますか？", "acceptedAnswer": {"@type": "Answer", "text": "はい、パーソナルジムは運動未経験・初心者の方こそ活用いただける施設です。トレーナーが基礎から丁寧に指導するため、正しいフォームを身につけながら安全にトレーニングを始められます。"}},
              {"@type": "Question", "name": "パーソナルジムの選び方のポイントは？", "acceptedAnswer": {"@type": "Answer", "text": "①目的（ダイエット・筋力アップなど）に合ったコースがあるか、②トレーナーの資格・実績、③立地・通いやすさ、④費用と契約条件の透明性、⑤無料体験の有無を確認しましょう。複数のジムを体験してから選ぶことをおすすめします。"}},
            ]
          }),
        }}
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

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-orange-100 to-red-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            数字で見るパーソナルジム
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-gray-700 mb-2">{totalCount.toLocaleString()}件</div>
              <p className="text-gray-600">掲載パーソナルジム数</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-gray-700 mb-2">2～3ヶ月</div>
              <p className="text-gray-600">効果が出始める目安期間</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-gray-700 mb-2">15万～60万円</div>
              <p className="text-gray-600">短期集中コースの費用相場</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            よくある質問
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-bold text-gray-900 hover:text-gray-600 transition-colors flex justify-between items-center">
                <span>パーソナルジムに通う費用はどのくらいですか？</span>
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-3 ml-4">
                パーソナルジムの費用はコースにより異なりますが、1～3ヶ月のダイエットコースで15万～60万円、都度払い（1回）で8,000～15,000円が一般的な相場です。無料体験レッスンを活用して自分に合ったジムを選びましょう。
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-bold text-gray-900 hover:text-gray-600 transition-colors flex justify-between items-center">
                <span>パーソナルジムはどのくらいの期間通えば効果が出ますか？</span>
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-3 ml-4">
                個人差はありますが、週2回以上のトレーニングで2～3ヶ月が一つの目安です。食事管理も合わせて行うことで効果が出やすくなります。多くのパーソナルジムでは2～3ヶ月の短期集中コースを提供しています。
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-bold text-gray-900 hover:text-gray-600 transition-colors flex justify-between items-center">
                <span>パーソナルジムと普通のジムの違いは何ですか？</span>
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-3 ml-4">
                パーソナルジムは専属トレーナーが個人の目標・体型・体力に合わせてプログラムを設計し、マンツーマンで指導します。普通のジムに比べて費用は高めですが、効率的に目標達成できます。食事管理・栄養指導が含まれるコースも多いです。
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-bold text-gray-900 hover:text-gray-600 transition-colors flex justify-between items-center">
                <span>初心者でもパーソナルジムに通えますか？</span>
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-3 ml-4">
                はい、パーソナルジムは運動未経験・初心者の方こそ活用いただける施設です。トレーナーが基礎から丁寧に指導するため、正しいフォームを身につけながら安全にトレーニングを始められます。
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-bold text-gray-900 hover:text-gray-600 transition-colors flex justify-between items-center">
                <span>パーソナルジムの選び方のポイントは？</span>
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-3 ml-4">
                ①目的（ダイエット・筋力アップなど）に合ったコースがあるか、②トレーナーの資格・実績、③立地・通いやすさ、④費用と契約条件の透明性、⑤無料体験の有無を確認しましょう。複数のジムを体験してから選ぶことをおすすめします。
              </p>
            </details>
          </div>
        </div>
      </section>

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

      {/* 市区町村から探す */}
      {topCities.length > 0 && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">市区町村からパーソナルジムを探す</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {topCities.map((city) => (
                <NextLink
                  key={city.slug}
                  href={`/c-${city.slug}/`}
                  className="text-center py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs hover:border-orange-400 hover:text-orange-700 transition-colors"
                >
                  <span className="block font-medium">{city.title}</span>
                  <span className="text-gray-400 text-[10px]">{city.entity_count}件</span>
                </NextLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">最新コラム</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NextLink
              href="/column/gym-beginner/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3 w-fit">初心者向け</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-blue-700 transition-colors">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">パーソナルジムが初めての方へ。始める前に必要な準備をまとめました。</p>
                <div className="text-blue-700 font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
            <NextLink
              href="/column/gym-cost/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3 w-fit">費用</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-blue-700 transition-colors">
                  パーソナルジムの料金相場を解説
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">パーソナルジムの料金体系を徹底解説。相場費用をまとめた比較表。</p>
                <div className="text-blue-700 font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
            <NextLink
              href="/column/diet-gym/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3 w-fit">ダイエット</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-blue-700 transition-colors">
                  ダイエットにパーソナルジムをおすすめする理由
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">ダイエット成功率が高いパーソナルジムの秘訣を解説します。</p>
                <div className="text-blue-700 font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
          </div>
          <div className="text-center mt-8">
            <NextLink
              href="/column/"
              className="inline-block border-2 border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-colors no-underline"
            >
              すべてのコラムを見る
            </NextLink>
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
