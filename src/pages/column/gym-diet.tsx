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
      question: "パーソナルジムでダイエットに成功するまでの期間は？",
      answer: "目標体重や現在の体重によって異なりますが、一般的には3～6ヶ月で目に見える成果が出る人が多いです。週2～3回のトレーニングと食事指導を組み合わせることで、より早く結果が出やすくなります。焦らず継続することが成功の鍵です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ダイエット中、1日何カロリー摂取すべき？",
      answer: "個人差があるため、トレーナーや栄養士に相談することをおすすめします。一般的には、現在の消費カロリーから300～500kcal低い設定が目安です。極端な食事制限は継続できず、リバウンドのリスクが高まるため、無理のない範囲での調整が重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "ダイエット中に炭水化物を食べても大丈夫？",
      answer: "はい、炭水化物は完全に避ける必要はありません。むしろ適量の炭水化物はトレーニングのエネルギー源として重要です。白米よりも玄米や十穀米など栄養価の高いものを選び、夜間の過剰摂取を避けることがポイントです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ダイエット中のタンパク質摂取量の目安は？",
      answer: "ダイエット中は、体重1kgあたり1.6～2.0gのタンパク質摂取が目安とされています。例えば60kg の人の場合、96～120g/日が目標です。鶏胸肉、卵、豆腐、魚など、低脂質・高タンパク質の食材を選ぶことが重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "ダイエット成功後、リバウンドを防ぐには？",
      answer: "目標達成後も、週1～2回のトレーニングと食事管理を継続することが重要です。パーソナルジムの中には、目標達成後の維持プランを提供しているジムもあります。急に食事量を増やしたり、トレーニングをやめたりしないことが、リバウンド防止の鍵です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "ダイエット中、どのくらいの頻度でトレーニングすべき？",
      answer: "ダイエット目的の場合、週2～3回のトレーニングが効果的とされています。週1回では効果が薄く、毎日は回復不足になるリスクがあります。自分のライフスタイルに合わせ、継続可能なペースでの通所が成功の秘訣です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymDietPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでダイエットを成功させる方法" },
  ];

  const pageTitle = "パーソナルジムでダイエットを成功させる方法｜食事指導と効果的なプラン";
  const pageUrl = `${baseSiteUrl}/column/gym-diet/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでダイエットを成功させるための完全ガイド。食事指導の方法、トレーニング頻度の目安、現実的なタイムライン、リバウンド防止のコツなど、確実に目標達成するための方法を解説します。"
        path="/column/gym-diet/"
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
              description: "パーソナルジムでダイエットを成功させるための完全ガイド。食事指導の方法、トレーニング頻度の目安、現実的なタイムライン、リバウンド防止のコツなど、確実に目標達成するための方法を解説します。",
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
            <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
              ダイエット
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでダイエットを成功させるには、適切なトレーニング、食事管理、継続が不可欠です。このガイドでは、食事指導の方法、効果的なトレーニング頻度、現実的なタイムライン、リバウンド防止のコツなど、確実に目標達成するための方法をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムのダイエット成功率が高い理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムでのダイエット成功率が高い理由は、以下のように複合的な要因によるものです：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-orange-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">パーソナルなトレーニングプラン</h3>
                    <p className="text-gray-600">あなたの体質、生活習慣、目標に合わせたオーダーメイドプランで、効率的にダイエットが進みます。フィットネスジムのように無駄な時間がありません。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">科学的な食事指導</h3>
                    <p className="text-gray-600">ほとんどのパーソナルジムでは、栄養学に基づいた食事指導が行われます。「何を食べるか」だけでなく「いつ」「どのくらい」かが重要です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">モチベーション管理</h3>
                    <p className="text-gray-600">トレーナーが励ましやサポートをしてくれるため、モチベーションを保ちやすく、継続しやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">効果的なトレーニング種目</h3>
                    <p className="text-gray-600">短時間で最大の効果を引き出すトレーニングプログラムで、代謝が向上し、脂肪が燃焼しやすい体に変わります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット成功のための現実的なタイムライン
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムでのダイエット効果は、継続期間によって大きく変わります。現実的な目標設定が重要です：
              </p>
              <div className="space-y-4">
                <div className="border border-orange-200 bg-[#f0f6f0] rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1～2週間</h3>
                  <p className="text-gray-700 text-sm mb-2">体重の変化よりも、身体の変化（引き締まった感覚、むくみの改善）が先に感じられます。食事管理により便秘が改善され、2～3kg の減少が見られることもあります。</p>
                </div>
                <div className="border border-orange-200 bg-[#f0f6f0] rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4～8週間（1～2ヶ月）</h3>
                  <p className="text-gray-700 text-sm mb-2">周囲が「痩せたね」と気づき始める段階です。3～5kg 程度の体重減が期待できます。体脂肪率も低下し、見た目の変化が明らかになります。</p>
                </div>
                <div className="border border-orange-200 bg-[#f0f6f0] rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3～4ヶ月</h3>
                  <p className="text-gray-700 text-sm mb-2">目標体重に近づく時期です。5～10kg 以上の減量が実現している人が多いです。体力も向上し、日常生活が快適になることを実感できます。</p>
                </div>
                <div className="border border-orange-200 bg-[#f0f6f0] rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">6ヶ月～1年</h3>
                  <p className="text-gray-700 text-sm mb-2">理想の体を手に入れ、その後の維持に入る段階です。筋肉がついているため、食事管理を継続すれば、リバウンドが少なくなります。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                効果的なトレーニング頻度の設定
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット目的の場合、トレーニング頻度は非常に重要です。効果と継続性のバランスを取ることが大切です：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">週1回コース</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>メリット：予算が抑えられる</li>
                    <li>メリット：気軽に継続できる</li>
                    <li>デメリット：効果が緩やか</li>
                    <li>デメリット：6～12ヶ月必要</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">週2～3回コース（推奨）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>メリット：効果が出やすい</li>
                    <li>メリット：3～4ヶ月で成果</li>
                    <li>メリット：モチベーション維持</li>
                    <li>標準的な通所ペース</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                ダイエットを成功させたい場合は、週2～3回のトレーニングと継続的な食事管理が最も効果的です。予算や時間に合わせて、最適なペースを選択しましょう。
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット成功のための食事管理ガイド
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット成功には、トレーニングと食事管理が7:3程度の比重で重要です。パーソナルジムでよく推奨される食事方法をご紹介します：
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">PFCバランスの最適化</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ タンパク質：体重×1.6～2.0g（筋肉維持のため重要）</li>
                    <li>✓ 脂質：総摂取カロリーの20～30%</li>
                    <li>✓ 炭水化物：残りのカロリー（低GI食品を選択）</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">食べるべき食材</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ タンパク質：鶏胸肉、卵、豆腐、納豆、魚</li>
                    <li>✓ 炭水化物：玄米、十穀米、全粒穀物</li>
                    <li>✓ 脂肪：オリーブオイル、ナッツ、アボカド</li>
                    <li>✓ 野菜：色鮮やかな野菜を毎食取入</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">避けるべき食材・習慣</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✗ 夜遅い時間の食事（21時以降は避ける）</li>
                    <li>✗ 揚げ物・ファストフード</li>
                    <li>✗ 砂糖たっぷりのお菓子・飲料</li>
                    <li>✗ アルコール（特にビール・甘いカクテル）</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット目標を設定するコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                現実的で達成可能な目標設定が、ダイエット成功の鍵となります。パーソナルジムでよく使われる目標設定方法をご紹介します：
              </p>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">短期目標（1～3ヶ月）</h3>
                  <p className="text-gray-700 text-sm">体重-3～5kg を目指す。モチベーション維持のため、小さな成功を積み重ねることが重要です。「来月までに体重を2kg減らす」という中間目標を設定しましょう。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">中期目標（3～6ヶ月）</h3>
                  <p className="text-gray-700 text-sm">体重-5～10kg、体脂肪率-5%程度を目指す。見た目の大きな変化が期待できる段階です。「ズボンのサイズが1～2サイズ小さくなる」という見た目目標も立てましょう。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">長期目標（6ヶ月～1年）</h3>
                  <p className="text-gray-700 text-sm">理想体重の達成。「健康的な体を維持する」という習慣化も含めた目標を設定します。ここから維持フェーズへ移行します。</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                リバウンド防止のための継続戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                多くの人がダイエットに成功しても、その後リバウンドしてしまいます。目標達成後も継続することが重要です：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">目標達成後も週1～2回は通う</h3>
                  <p className="text-gray-700 text-sm">パーソナルジムの多くは、目標達成後の維持プランを提供しています。完全にジムをやめるのではなく、メンテナンスで通い続けることが重要です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">食事管理は一生継続する</h3>
                  <p className="text-gray-700 text-sm">「ダイエット期間が終わった」と考えず、健康的な食事習慣は一生の財産です。完全に制限を解くのではなく、適度な管理を継続しましょう。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">定期的に体重・体脂肪率を測定</h3>
                  <p className="text-gray-700 text-sm">月に1～2回は体重計に乗り、変化を監視することで、早期に対策できます。2～3kg の増加で食事・運動を調整する癖をつけましょう。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーナーとの相談体制を保つ</h3>
                  <p className="text-gray-700 text-sm">疑問や不安が出たときに、いつでも相談できるトレーナーとの関係を保つことが、リバウンド防止に役立ちます。</p>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="mt-10 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">よくある質問</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <summary className="font-medium text-gray-900 cursor-pointer flex justify-between items-center">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ダイエットに特化したパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。ダイエット実績、食事指導、料金、口コミなど、あなたに合ったジムが見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-orange-700 text-white font-bold rounded-full px-8 py-3 hover:bg-orange-800 active:scale-[0.98] transition-all text-sm md:text-base"
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
                href="/column/gym-nutrition/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-orange-700 transition-colors mb-2">
                  パーソナルジムの食事管理｜トレーニングと食事の組み合わせ
                </h3>
                <p className="text-sm text-gray-600">
                  パーソナルジムでの効果を最大化する食事管理方法を解説します
                </p>
              </Link>
              <Link
                href="/column/training-frequency/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-orange-700 transition-colors mb-2">
                  パーソナルトレーニングの通う頻度・回数の目安
                </h3>
                <p className="text-sm text-gray-600">
                  最適な通所頻度を目標別に解説します
                </p>
              </Link>
              <Link
                href="/column/diet-gym/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-orange-700 transition-colors mb-2">
                  ダイエットにパーソナルジムをおすすめする理由
                </h3>
                <p className="text-sm text-gray-600">
                  パーソナルジムでダイエット成功が高い理由を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-bodymake/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-orange-700 transition-colors mb-2">
                  パーソナルジムで体が変わるまでの期間｜目標別タイムライン
                </h3>
                <p className="text-sm text-gray-600">
                  目標別の現実的なタイムラインをまとめました
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
