import type { GetServerSideProps } from "next";
import supabase from "@/utils/supabase";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchRegionsWithPrefectureCounts } from "@/utils/supabase/fetchPrefectures";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import { siteName, baseSiteUrl } from "@/utils/config";
import type { GymListItem, RegionWithPrefectures } from "@/types";
import NextLink from "next/link";
import GrowthNavigationHub from "@/components/GrowthNavigationHub";

interface CityItem {
  title: string;
  slug: string;
  entity_count: number;
}

interface StationItem {
  station: string;
  count: number;
}

interface HomeProps {
  featuredGyms: GymListItem[];
  totalCount: number;
  regions: RegionWithPrefectures[];
  topCities: CityItem[];
  topStations: StationItem[];
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
    topCities = (citiesRes.data ?? [])
      .filter((c: { slug: string | null }) => Boolean(c.slug))
      .map((c: { id: number; title: string; slug: string }) => ({
        title: c.title,
        slug: c.slug,
        entity_count: cityCounts[c.id] || 0,
      }));
    topCities.sort((a, b) => b.entity_count - a.entity_count);
  }

  const stationRes = await supabase
    .from("gym_locations")
    .select("nearest_station")
    .eq("is_display", true)
    .not("nearest_station", "is", null);
  const stationCounts: Record<string, number> = {};
  for (const s of stationRes.data ?? []) {
    if (s.nearest_station) stationCounts[s.nearest_station] = (stationCounts[s.nearest_station] || 0) + 1;
  }
  const topStations = Object.entries(stationCounts)
    .filter(([, count]) => count >= 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 24)
    .map(([station, count]) => ({ station, count }));

  return {
    props: {
      featuredGyms: gymsResult.gyms,
      totalCount: gymsResult.totalCount,
      regions,
      topCities,
      topStations,
    },
  };
};

export default function Home({ featuredGyms, totalCount, regions, topCities, topStations }: HomeProps) {
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
      <section className="bg-gradient-to-br from-[#F5F3FF] to-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            パーソナルジムで<span className="text-[#F97316]">本当に変わる。</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            2,000件以上のビフォー・アフター実例から、あなたの目的に合うジムが見つかります。<br/>営業なし。無料カウンセリング。複数社相談OK。
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <NextLink
              href="#"
              className="inline-block bg-[#F97316] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#E65A0B] transition-colors no-underline"
            >
              無料カウンセリング予約 →
            </NextLink>
            <NextLink
              href="/all/"
              className="inline-block border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold px-8 py-3 rounded-lg hover:bg-[#1E3A8A] hover:text-white transition-colors no-underline"
            >
              ジムを比較する
            </NextLink>
          </div>
        </div>
      </section>

      {/* ビフォー・アフター実例 */}
      <section className="bg-[#F5F3FF] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            実例で見る成果
          </h2>
          <p className="text-center text-gray-600 mb-10">
            2,000件以上のパーソナルジム利用者による、実際のビフォー・アフター事例
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="h-40 bg-gradient-to-r from-red-100 to-red-50 flex items-center justify-center">
                <span className="text-5xl">📊</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">ダイエット成功</h3>
                <p className="text-sm text-gray-600">30代女性、6ヶ月で−15kg、体脂肪率−8%達成</p>
                <p className="text-xs text-gray-500 mt-3">週2回のトレーニング + 食事管理で劇的変身</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                <span className="text-5xl">💪</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">筋力アップ</h3>
                <p className="text-sm text-gray-600">40代男性、3ヶ月で筋肉量+5kg、見た目変化</p>
                <p className="text-xs text-gray-500 mt-3">ボディメイク特化ジムでの実例</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="h-40 bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                <span className="text-5xl">✨</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">姿勢改善</h3>
                <p className="text-sm text-gray-600">20代女性、2ヶ月で猫背改善、肩こり解消</p>
                <p className="text-xs text-gray-500 mt-3">姿勢矯正トレーニング実例</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              ▲%の利用者が「3ヶ月以内に成果を実感」と回答
            </p>
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
                className="inline-block border-2 border-[#F97316] text-[#F97316] font-bold px-8 py-3 rounded-lg hover:bg-[#F97316] hover:text-white transition-colors no-underline"
              >
                すべてのジムを見る（{totalCount.toLocaleString()}件）
              </NextLink>
            </div>
          )}
        </section>
      )}

      {/* 目的別ジム選び */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            目的別ジム選び
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-[#F97316] rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🏃</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">ダイエット特化</h3>
              <p className="text-sm text-gray-600 mb-4">
                体重・体脂肪率を落としたい、見た目を変えたい方向け
              </p>
              <p className="text-xs text-gray-500 mb-4">
                平均 3〜6ヶ月で−10〜20kg 達成
              </p>
              <button className="text-[#F97316] font-bold text-sm hover:underline">
                ダイエット向けジムを比較 →
              </button>
            </div>
            <div className="border-2 border-[#1E3A8A] rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">筋トレ・ボディメイク</h3>
              <p className="text-sm text-gray-600 mb-4">
                筋肉をつけたい、逆三角体型を目指したい方向け
              </p>
              <p className="text-xs text-gray-500 mb-4">
                平均 3ヶ月で +3〜5kg 筋肉増加
              </p>
              <button className="text-[#1E3A8A] font-bold text-sm hover:underline">
                筋トレ向けジムを比較 →
              </button>
            </div>
            <div className="border-2 border-[#10B981] rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">姿勢・健康改善</h3>
              <p className="text-sm text-gray-600 mb-4">
                姿勢を正したい、肩こり解消、健康維持したい方向け
              </p>
              <p className="text-xs text-gray-500 mb-4">
                2ヶ月で姿勢改善、肩こり軽減報告多数
              </p>
              <button className="text-[#10B981] font-bold text-sm hover:underline">
                姿勢改善ジムを比較 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#FEF3C7] to-[#FEE2E2] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            数字で見るパーソナルジム
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-[#1e782d] mb-2">{totalCount.toLocaleString()}件</div>
              <p className="text-gray-600">掲載パーソナルジム数</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-[#1e782d] mb-2">2～3ヶ月</div>
              <p className="text-gray-600">効果が出始める目安期間</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl font-bold text-[#1e782d] mb-2">15万～60万円</div>
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

      {/* 不安を解消 */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            パーソナルジムの不安、すべて解決
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="border-l-4 border-[#F97316] pl-6 py-4">
              <h3 className="font-bold text-lg mb-2">❓ 営業されるのか？</h3>
              <p className="text-sm text-gray-600">
                ほとんどのジムは「体験後、あなたのペースで検討」というスタンスです。営業されることはありません。複数社の体験も OK。
              </p>
            </div>
            <div className="border-l-4 border-[#F97316] pl-6 py-4">
              <h3 className="font-bold text-lg mb-2">❓ 月額いくら？</h3>
              <p className="text-sm text-gray-600">
                相場は月◎円〜▲円。初心者向けなら月10,000〜15,000円程度。無料体験で正確な見積もりが得られます。
              </p>
            </div>
            <div className="border-l-4 border-[#1E3A8A] pl-6 py-4">
              <h3 className="font-bold text-lg mb-2">❓ 本当に効くのか？</h3>
              <p className="text-sm text-gray-600">
                2,000件以上の成功事例があります。3ヶ月で▲%のユーザーが目に見える変化を実感しています。
              </p>
            </div>
            <div className="border-l-4 border-[#1E3A8A] pl-6 py-4">
              <h3 className="font-bold text-lg mb-2">❓ キツくないか？</h3>
              <p className="text-sm text-gray-600">
                初心者向けプログラムが充実。女性向け、高齢者向けもあります。あなたの体力に合わせて設計されるので大丈夫。
              </p>
            </div>
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
                      className="text-sm text-gray-600 hover:text-[#F97316] no-underline transition-colors"
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

      {/* 駅から探す */}
      {topStations.length > 0 && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">駅からパーソナルジムを探す</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {topStations.map((s) => (
                <NextLink key={s.station} href={`/station/${encodeURIComponent(s.station)}/`}
                  className="text-center py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs hover:border-orange-400 hover:text-orange-700 transition-colors">
                  <span className="block font-medium">{s.station}</span>
                  <span className="text-gray-400 text-[10px]">{s.count}件</span>
                </NextLink>
              ))}
            </div>
            <div className="mt-3 text-right">
              <NextLink href="/station/" className="text-sm text-orange-700 hover:underline">すべての駅を見る →</NextLink>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="bg-[#fff7ed] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">最新コラム</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NextLink
              href="/column/gym-beginner/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-[#F97316] bg-[#ffedd5] px-3 py-1 rounded-full inline-block mb-3 w-fit">初心者向け</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-[#F97316] transition-colors">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">パーソナルジムが初めての方へ。始める前に必要な準備をまとめました。</p>
                <div className="text-[#F97316] font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
            <NextLink
              href="/column/gym-cost/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-[#F97316] bg-[#ffedd5] px-3 py-1 rounded-full inline-block mb-3 w-fit">費用</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-[#F97316] transition-colors">
                  パーソナルジムの料金相場を解説
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">パーソナルジムの料金体系を徹底解説。相場費用をまとめた比較表。</p>
                <div className="text-[#F97316] font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
            <NextLink
              href="/column/diet-gym/"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200 h-full flex flex-col no-underline"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="text-xs font-semibold text-[#F97316] bg-[#ffedd5] px-3 py-1 rounded-full inline-block mb-3 w-fit">ダイエット</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow line-clamp-2 hover:text-[#F97316] transition-colors">
                  ダイエットにパーソナルジムをおすすめする理由
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">ダイエット成功率が高いパーソナルジムの秘訣を解説します。</p>
                <div className="text-[#F97316] font-semibold text-sm">記事を読む →</div>
              </div>
            </NextLink>
          </div>
          <div className="text-center mt-8">
            <NextLink
              href="/column/"
              className="inline-block border-2 border-blue-700 text-[#F97316] font-bold px-8 py-3 rounded-lg hover:bg-[#F97316] hover:text-white transition-colors no-underline"
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
      <GrowthNavigationHub
          siteName="ジムナビ"
          categoryName="パーソナルジム"
          entityName="ジム"
          accent="#f97316"
          searchHref="/all/"
          compareHref="/brand/"
          guideHref="/column/"
          conversionHref="/contact/"
          popularLinks={[{"label":"ダイエット向け","href":"/all/?purpose=diet"},{"label":"料金で比較","href":"/column/gym-cost/"},{"label":"初心者向け","href":"/column/gym-beginner/"},{"label":"口コミで探す","href":"/column/gym-kuchikomi/"}]}
          areaLinks={[{"label":"東京","href":"/p-tokyo/"},{"label":"大阪","href":"/p-osaka/"},{"label":"神奈川","href":"/p-kanagawa/"},{"label":"愛知","href":"/p-aichi/"},{"label":"福岡","href":"/p-fukuoka/"},{"label":"北海道","href":"/p-hokkaido/"}]}
        />
    </Layout>
  );
}
