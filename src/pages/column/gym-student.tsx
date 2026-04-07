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
      question: "学生向けの割引プログラムがあるパーソナルジムは多いですか？",
      answer: "はい、多くのパーソナルジムが学生割引を提供しています。学生証提示で月額の10～30％割引が一般的です。チェーン店より地域のプライベートジムが独自の学生プランを持つことが多いので、複数のジムに問い合わせることをお勧めします。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "アルバイト中心の学生でも通えるパーソナルジムはありますか？",
      answer: "はい。夜間営業（22時まで）や短時間セッション（30分）を提供するジムもあります。また、回数制の契約なら、都合の良い時間に利用できます。パーソナルジムのカウンセリング時に「学生で時間が限定的」と伝えれば、最適なプランを提案してもらえます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "学生が1ヶ月のパーソナルジム費用を抑えるコツは？",
      answer: "複数のジムを比較検討することが最重要です。学生割引、入会金無料キャンペーン、短期集中プラン（3ヶ月）などを活用すれば、月額3～5万円程度で利用可能です。さらに、複数人での入会割引や友人紹介キャッシュバックも活用しましょう。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "学生のうちにパーソナルジムに通うメリットは？",
      answer: "若いうちにトレーニング習慣がつくと、以降の人生で継続しやすくなります。また、基礎体力の構築、正しいフォーム習得、健康意識の向上が期待できます。社会人になってから後悔しない体を作ることができます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "大学の4年間で体を変えるなら、いつから始めるべき？",
      answer: "理想は大学1年生から。4年間継続すれば、顕著な体の変化が期待できます。3年生からの開始でも、1～2年あれば理想の体に近づけます。後悔しないように、早めのスタートをお勧めします。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "学生向けパーソナルジムと通常のフィットネスジムの違いは？",
      answer: "パーソナルジムはプロトレーナーによる個別指導が受けられ、初心者から上級者まで対応します。フィットネスジムは機器利用中心で自分でプログラムを組む必要があります。体を変えたい・効率的に結果を出したいなら、パーソナルジムが最適です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymStudentPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "学生・20代向けパーソナルジムの選び方" },
  ];

  const pageTitle = "学生・20代向けパーソナルジムの選び方｜費用を抑えるコツ";
  const pageUrl = `${baseSiteUrl}/column/gym-student/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="学生・20代向けパーソナルジムガイド。学生割引活用、アルバイトと両立、費用を抑えるコツ、体を変えるための効果的な契約形態、おすすめの始め方を完全解説。"
        path="/column/gym-student/"
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
              description: "学生・20代向けパーソナルジムガイド。学生割引活用、アルバイトと両立、費用を抑えるコツ、体を変えるための効果的な契約形態、おすすめの始め方を完全解説。",
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
              学生・20代向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              学生時代は体づくりの黄金期。このガイドでは、限られた予算で最大の効果を得るパーソナルジム選びのポイント、学生割引の活用方法、アルバイトとの両立、そして人生を変える体への変身方法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生がパーソナルジムに通うメリット
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                学生のうちにパーソナルジムを始める価値は非常に高いです：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">基礎代謝が高い</h3>
                    <p className="text-gray-600">若いほど基礎代謝が高く、筋肉がつきやすく、脂肪が燃えやすいです。このチャンスを活かすことで、効率的に理想の体を作ることができます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">正しいフォームを若いうちに習得</h3>
                    <p className="text-gray-600">プロトレーナーから正しいトレーニング方法を学ぶと、以降の人生でケガなく効果的にトレーニングを続けられます。独学で学ぶと、後年ケガのリスクが高まります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">人生の習慣が変わる</h3>
                    <p className="text-gray-600">学生時代にトレーニング習慣がつくと、社会人になってからも継続しやすくなります。健康意識が高まり、仕事のパフォーマンスも向上します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">4年間で大きく変身できる</h3>
                    <p className="text-gray-600">大学4年間、継続的にパーソナルジムに通えば、顔つき、体格、姿勢などが劇的に変わります。就職活動や人間関係が好転する可能性も高まります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生割引を最大活用する方法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                学生割引はパーソナルジムを選ぶ際の重要な要素です。以下の方法で費用を最小化できます：
              </p>
              <div className="space-y-3 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">学生証で最大30％割引</h3>
                  <p className="text-gray-700 text-sm">多くのパーソナルジムは、学生証提示で月額料金を10～30％割引します。例えば月額8万円なら5.6～7.2万円に。複数のジムを比較して、割引率の高いところを選びましょう。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">入会金無料キャンペーン</h3>
                  <p className="text-gray-700 text-sm">春（4月）や夏（8月）にキャンペーンを実施するジムが多いです。通常5～5万円の入会金が無料になるため、大きな節約になります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">友人紹介キャッシュバック</h3>
                  <p className="text-gray-700 text-sm">友人を紹介すると、キャッシュバック（5,000～3万円）を受け取れるジムもあります。複数の友人を紹介すれば、数ヶ月分の月額料金が実質無料に。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">短期集中プラン</h3>
                  <p className="text-gray-700 text-sm">3ヶ月集中プラン（月2回×3ヶ月など）は、月額制より割安な場合が多いです。春休み・夏休みを利用した短期プランから始めるのも効果的。</p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-gray-700"><strong>ポイント：</strong> 複数のジムで体験を受け、学生割引・キャンペーン条件を比較することが最重要です。同じサービスでも、ジムによって割引率が大きく異なります。</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生・20代向けの契約形態の比較
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの主な契約形態と、学生に最適な選択：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">月額制（最も一般的）</h3>
                  <p className="text-gray-700 text-sm"><strong>費用：</strong> 月5～8万円 / <strong>頻度：</strong> 週1～2回 / <strong>おすすめ：</strong> 安定した収入（アルバイト）がある学生。長期的にコツコツ体を変えたい人向け。学生割引で月3.5～5万円に。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">回数制（柔軟性重視）</h3>
                  <p className="text-gray-700 text-sm"><strong>費用：</strong> 1回15,000～25,000円 / <strong>おすすめ：</strong> シフト制アルバイトで予定が不規則な学生。月1～3回利用なら月額制より安い。忙しい時期に無理なく調整可能。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">短期集中プラン（3ヶ月）</h3>
                  <p className="text-gray-700 text-sm"><strong>費用：</strong> 総額15～25万円（月5～8万円相当） / <strong>おすすめ：</strong> 春休み・夏休みを活用。目標（体脂肪低下、筋肉増加など）を短期で達成したい学生向け。3ヶ月後、継続か判断。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">都度払い（試験期間向け）</h3>
                  <p className="text-gray-700 text-sm"><strong>費用：</strong> 1回20,000～30,000円 / <strong>おすすめ：</strong> 試験期間中など、通える確実性が低い時期。最も割高だが、完全に自由な時間利用が可能。</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                アルバイト中心の生活とパーソナルジムの両立
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                アルバイトが多い学生でもパーソナルジムに通う方法：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>営業時間の確認</strong> — 夜間営業（22時まで）のジムを選べば、アルバイト終了後に通える</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>短時間セッション</strong> — 60分が標準だが、30～45分コースを提供するジムもあり。短い時間でも効果は期待できる</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>回数制の活用</strong> — 月1～2回の柔軟な契約なら、シフトが不規則でも無理なく続けられる</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>キャンセルポリシーの確認</strong> — アルバイトの予定が急に変わる可能性を考慮。キャンセル料が安いジムを選ぶ</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>目標の現実的な設定</strong> — 月2回の利用なら3ヶ月で劇的な変化は難しい。3～6ヶ月の中期目標を設定</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生向けおすすめの体変身プラン
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                大学4年間で理想の体を作るための現実的なプラン：
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1年生～2年生（基礎づくり）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 月2～3回のペースで基本的なトレーニングフォームを習得</li>
                    <li>✓ 目標：体脂肪率を5～10％低下させる</li>
                    <li>✓ 費用：月4～5万円（割引込み）</li>
                    <li>✓ 投資総額：約100～120万円（2年間）</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2年生～3年生（加速期）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 月3～4回に増やし、筋力アップとボディメイク加速</li>
                    <li>✓ 目標：腹筋が見える程度の体脂肪率 + 筋肉量増加</li>
                    <li>✓ 費用：月5～7万円</li>
                    <li>✓ 投資総額：約120～170万円（2年間）</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3年生～4年生（維持・仕上げ）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 月2～3回で維持・細かいボディメイク調整</li>
                    <li>✓ 目標：理想体を就職活動・社会人生活へ</li>
                    <li>✓ 費用：月4～5万円</li>
                    <li>✓ 投資総額：約100～120万円（2年間）</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">4年間の総投資：320～410万円。4年で人生が変わると考えれば、非常にコストパフォーマンスが良い投資です。</p>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生向けジム選びの重要チェックポイント
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                学生がパーソナルジムを選ぶ際に確認すべき項目：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">立地・アクセス</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 大学or自宅から近い</li>
                    <li>✓ 駅から徒歩10分以内</li>
                    <li>✓ 営業時間が自分の生活に合う</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">学生向け割引</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 学生割引率（10～30％）</li>
                    <li>✓ 入会金無料キャンペーン</li>
                    <li>✓ 友人紹介特典</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーナー品質</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 若いトレーナーが多いか</li>
                    <li>✓ 学生との相性が良いか</li>
                    <li>✓ モチベーション管理が得意か</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">施設・雰囲気</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 清潔で最新設備か</li>
                    <li>✓ 若い利用者が多いか</li>
                    <li>✓ 通いたいと思える雰囲気か</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                学生向けパーソナルジムvs通常フィットネス
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                両者の違いと、学生にとって最適な選択：
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 p-3 text-left font-bold text-gray-900">項目</th>
                      <th className="border border-gray-200 p-3 text-left font-bold text-gray-900">パーソナルジム</th>
                      <th className="border border-gray-200 p-3 text-left font-bold text-gray-900">フィットネスジム</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-900">月額費用</td>
                      <td className="border border-gray-200 p-3 text-gray-700">4～8万円</td>
                      <td className="border border-gray-200 p-3 text-gray-700">5,000～15,000円</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-900">個別指導</td>
                      <td className="border border-gray-200 p-3 text-gray-700">毎回プロが指導</td>
                      <td className="border border-gray-200 p-3 text-gray-700">自分でプラン作成</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-900">成果実現</td>
                      <td className="border border-gray-200 p-3 text-gray-700">3～6ヶ月で実感</td>
                      <td className="border border-gray-200 p-3 text-gray-700">1年以上かかる可能性</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-900">ケガのリスク</td>
                      <td className="border border-gray-200 p-3 text-gray-700">低い（フォーム矯正）</td>
                      <td className="border border-gray-200 p-3 text-gray-700">高い（誤ったフォーム）</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-semibold text-gray-900">おすすめ層</td>
                      <td className="border border-gray-200 p-3 text-gray-700">効果重視・予算あり</td>
                      <td className="border border-gray-200 p-3 text-gray-700">予算重視・自主性高い</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">結論：学生の間に体を変えるなら、パーソナルジムの投資がおすすめ。4年間で300～400万円は、人生100年の投資としては非常に有効です。</p>
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
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              学生向けプランのあるパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。学生割引やアルバイト対応のジムから選べます。大学時代の投資が人生を変えます。
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
                href="/column/gym-cost/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの料金相場を解説｜月額・都度払いの違い
                </h3>
                <p className="text-sm text-gray-600">
                  費用を抑えるコツを解説します
                </p>
              </Link>
              <Link
                href="/column/gym-beginner/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600">
                  初めてのパーソナルジムの準備を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-bodymake/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムで体が変わるまでの期間｜目標別タイムライン
                </h3>
                <p className="text-sm text-gray-600">
                  現実的な目標設定を解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
