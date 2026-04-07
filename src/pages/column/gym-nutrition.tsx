import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { JsonLDBreadcrumbs, JsonLDFaq } from "@/components/UI/JsonLD";
import { baseSiteUrl, siteName } from "@/utils/config";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymFaq } from "@/types";

interface PageProps {
  faqs: GymFaq[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ res }) => {
  const faqs: GymFaq[] = [
    {
      id: 1,
      gym_id: null,
      question: "パーソナルジムに通う場合、食事管理は必須ですか？",
      answer: "トレーニングだけでなく、食事管理をしっかり行うことで効果が大きく変わります。特にダイエットや筋力アップを目指す場合は、食事指導を受けることを強くおすすめします。多くのパーソナルジムでは食事指導が含まれています。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ダイエット中のタンパク質摂取量の目安は？",
      answer: "体重1kg あたり 1.2～1.6g のタンパク質摂取が目安です。例えば、体重60kgなら1日72～96g のタンパク質を摂取する必要があります。鶏胸肉、卵、魚、豆類などから効率的に摂取しましょう。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニング後、どのくらい時間で食事をすべき？",
      answer: "トレーニング後30分～2時間以内に、タンパク質と炭水化物を含む食事を摂ることが推奨されます。この時間帯に栄養補給すると、筋肉の修復と成長が促進されます。難しい場合はプロテインでも対応可能です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "筋力アップ目的の場合、カロリー摂取はどうすべき？",
      answer: "筋力アップには、基礎代謝+トレーニング消費分を上回るカロリー摂取が必要です。一般的には300～500カロリー程度オーバーカロリーにすることをおすすめします。ただし、高タンパク、バランスの取れた栄養が重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "食事管理で避けるべき食べ物はありますか？",
      answer: "完全に禁止する必要はありませんが、高脂肪・高糖質でカロリー密度の高い食べ物（揚げ物、スイーツ、ジュースなど）は量を制限することをおすすめします。80%健康的な食事をし、20%は好きなものを食べるのが継続のコツです。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "水分摂取はどのくらい意識すべき？",
      answer: "1日2～3リットルの水を目安に、こまめに摂取することが重要です。特にトレーニング中は脱水状態を避けるため、こまめに水分補給してください。適切な水分摂取は、筋力アップやダイエット効果を高めます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymNutritionPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの食事管理" },
  ];

  const pageTitle = "パーソナルジムの食事管理｜トレーニングと食事の組み合わせ";
  const pageUrl = `${baseSiteUrl}/column/gym-nutrition/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでの効果を最大化する食事管理方法を解説。タンパク質摂取量、トレーニング後の栄養補給、ダイエット・筋力アップ別の食事戦略をまとめました。"
        path="/column/gym-nutrition/"
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />
      <JsonLDFaq faqs={faqs} />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: pageTitle,
              description: "パーソナルジムでの効果を最大化する食事管理方法を解説。タンパク ratio摂取量、トレーニング後の栄養補給、ダイエット・筋力アップ別の食事戦略をまとめました。",
              url: pageUrl,
              datePublished: "2026-04-07",
              dateModified: "2026-04-07",
              author: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <article>
          <div className="mt-4">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              栄養管理
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでの成果は、トレーニングと食事がセットで初めて実現します。適切な栄養管理がなければ、せっかくのトレーニングも効果が半減してしまいます。このガイドでは、ダイエット・筋力アップ別の食事戦略と栄養管理のコツをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムでの食事管理が重要な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                多くの人がトレーニングの効果を実感できない理由は、食事管理がおろそかになっているからです。栄養バランスの取れた食事とトレーニングを組み合わせることで、初めて理想の体を作ることができます。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">トレーニング</h3>
                  <p className="text-gray-700 text-sm">
                    筋肉を刺激し、成長のきっかけを作ります。ただし、刺激を与えるだけでは筋肉は成長しません。
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">食事管理</h3>
                  <p className="text-gray-700 text-sm">
                    刺激された筋肉を修復・成長させる材料を供給します。適切な栄養なくして成長なし。
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-600">
                <p className="text-gray-900 font-bold mb-2">一般的な効果の分配</p>
                <p className="text-gray-700 text-sm">
                  トレーニング50% + 食事管理40% + 睡眠10% = 理想の体
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット目的の食事戦略
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. 適切なカロリー制限</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      基礎代謝量＋アクティビティ量よりも300～500kcal少ない摂取量が目安です。例えば、基礎代謝が1500kcal、日常活動で500kcal消費する人なら、1500～1700kcal程度に抑えるのが効果的です。
                    </p>
                    <div className="text-sm text-gray-800 space-y-1">
                      <p>計算例：基礎代謝1500 + 日常活動500 = 2000kcal消費</p>
                      <p className="font-bold text-red-600">→ 1500～1700kcalの摂取が目安</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. タンパク質摂取の最適化</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      ダイエット中の筋肉損失を防ぐため、体重1kg あたり1.2～1.6g のタンパク質が必要です。カロリー制限中は、多めのタンパク質摂取が筋肉保持に重要です。
                    </p>
                    <div className="text-sm text-gray-800 space-y-1">
                      <p>体重60kg の場合：60 × 1.2～1.6 = 72～96g/日</p>
                      <p>タンパク質源：鶏胸肉(100g=23g)、卵(1個=6g)、魚(100g=20g)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. 栄養バランスの3大栄養素の配分</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      ダイエット時の理想的な三大栄養素の比率：
                    </p>
                    <ul className="text-sm text-gray-800 space-y-1">
                      <li>・ タンパク質：30～40%（筋肉保持）</li>
                      <li>・ 炭水化物：40～50%（エネルギー供給）</li>
                      <li>・ 脂質：10～20%（ホルモン分泌）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋力アップ・ボディメイク目的の食事戦略
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. オーバーカロリー摂取</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      筋肉を増やすには、消費カロリーを上回る摂取が必要です。一般的には、消費カロリー+300～500kcal が目安です。ただし、脂肪も増えやすくなるため、タンパク質を多めにすることが重要です。
                    </p>
                    <div className="text-sm text-gray-800">
                      <p className="font-bold text-blue-600">目安：消費2000kcal → 2300～2500kcal摂取</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. 高タンパク質摂取</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      筋力アップには、体重1kg あたり1.6～2.2g のタンパク質が必要です。分散して摂取することで、タンパク質の合成効率が高まります。
                    </p>
                    <div className="text-sm text-gray-800 space-y-1">
                      <p>体重70kg の場合：70 × 1.6～2.2 = 112～154g/日</p>
                      <p>朝食・昼食・夕食・間食で分散摂取（1回20～40g）</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. 三大栄養素の比率</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">
                      筋力アップ時の理想的な比率：
                    </p>
                    <ul className="text-sm text-gray-800 space-y-1">
                      <li>・ タンパク質：35～40%（筋肉成長）</li>
                      <li>・ 炭水化物：45～50%（トレーニングエネルギー）</li>
                      <li>・ 脂質：10～15%（ホルモン分泌）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーニング前後の栄養補給タイミング
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング2～3時間前</h3>
                  <p className="text-gray-700 text-sm">
                    消化に時間がかかる食事を摂ります。タンパク質＋炭水化物＋少量の脂肪（鶏胸肉＋白米など）を目安に。食べ過ぎるとトレーニング中に胃が重くなるので注意。
                  </p>
                </div>
                <div className="border-l-4 border-green-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング30分～1時間前</h3>
                  <p className="text-gray-700 text-sm">
                    軽い食事や飲料でエネルギー補給。バナナ、おにぎり、プロテイン飲料など、消化が早いものがおすすめです。こまめな水分補給も忘れずに。
                  </p>
                </div>
                <div className="border-l-4 border-purple-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング直後（30分以内）</h3>
                  <p className="text-gray-700 text-sm">
                    タンパク質＋炭水化物をすぐに摂取。この時間帯は栄養吸収が最も良く、筋肉の修復を促進します。プロテインシェイクやおにぎり+鶏胸肉が効果的です。
                  </p>
                </div>
                <div className="border-l-4 border-red-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング2時間後</h3>
                  <p className="text-gray-700 text-sm">
                    タンパク質＋炭水化物＋ビタミン・ミネラルを含む食事。鮭定食、鶏そば、唐揚げ弁当など、通常の食事で問題ありません。回復を促進するタイミングです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事管理で避けるべき習慣
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">避けるべき習慣</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✗ 夜遅い食事（寝る3時間以内）</li>
                    <li>✗ 朝食を抜く</li>
                    <li>✗ 過度な糖質制限</li>
                    <li>✗ アルコール過剰摂取</li>
                    <li>✗ 水分不足</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">おすすめの習慣</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ 毎日同じ時間に3食摂る</li>
                    <li>✓ 朝食で高タンパク質</li>
                    <li>✓ こまめな水分補給</li>
                    <li>✓ 夜9時までに夜食</li>
                    <li>✓ 週1回の好物OK</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              あなたにぴったりのパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。料金、口コミ、トレーナー情報から自分にぴったりのジムが見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold rounded-full px-8 py-3 hover:bg-blue-800 active:scale-[0.98] transition-all text-sm md:text-base"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              全国のパーソナルジム一覧を見る
            </Link>
          </section>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/column/training-frequency/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルトレーニングの通う頻度・回数の目安
                </h3>
                <p className="text-sm text-gray-600">
                  目標別の最適な通所頻度をわかりやすく解説します
                </p>
              </Link>
              <Link
                href="/column/diet-gym/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  ダイエットにパーソナルジムをおすすめする理由
                </h3>
                <p className="text-sm text-gray-600">
                  ダイエット成功率が高い理由を詳しく解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
