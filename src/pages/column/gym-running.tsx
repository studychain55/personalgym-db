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
      question: "ランニングとパーソナルトレーニングを組み合わせると、体はどう変わりますか？",
      answer: "有酸素運動（ランニング）で脂肪を燃焼させ、パーソナルトレーニング（筋トレ）で筋肉をつけることで、引き締まった体が完成します。持久力と筋力が両立され、代謝が上がるため、ダイエット効果が高まります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "有酸素運動と筋トレ、どちらを先にすべきですか？",
      answer: "目標によって異なります。筋肉を増やしたい場合は筋トレ→有酸素運動の順が効果的です。ダイエットが目的なら、軽い有酸素運動→筋トレ→有酸素運動のメニューが最適。パーソナルトレーナーに目標を伝え、最適な順序を決めましょう。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "ランナーがパーソナルトレーニングで鍛えるべき部位は？",
      answer: "体幹、臀部（おしり）、股関節周りが重要です。これらを強化するとランニングフォームが改善され、怪我のリスクが減ります。また、脚の筋肉をバランスよく鍛えることで、ランニング効率が上がり、スピード向上につながります。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ランニング後のトレーニングは体に負担がかかりませんか？",
      answer: "ランニング直後は軽いストレッチやセルフケアに止めるか、別日にパーソナルトレーニングを行うことをおすすめします。筋肉が疲れている状態でのトレーニングは怪我のリスクが高まるため、1～2日の間隔を空けるのが安全です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "週に何日、ランニングとトレーニングを組み合わせるべき？",
      answer: "週3～4日の組み合わせが目安です。例えば、月・木・土がパーソナルトレーニング、火・水・日がランニングといった具合に分散させることで、筋肉への過負荷を防ぎ、効果を最大化できます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "ランニングフォームの改善に、パーソナルトレーナーはどう役立ちますか？",
      answer: "パーソナルトレーナーが姿勢や足の運びを動画解析で診断し、フォーム矯正に必要な筋力トレーニングをメニュー化します。フォームが改善されると、ランニング効率が上がり、怪我の予防にもなります。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymRunningPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "ランニングとパーソナルトレーニングの組み合わせ" },
  ];

  const pageTitle = "ランニングとパーソナルトレーニングの組み合わせ｜効果的な有酸素運動と筋トレの順番";
  const pageUrl = `${baseSiteUrl}/column/gym-running/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="ランニングとパーソナルトレーニングを組み合わせるメリット、有酸素運動と筋トレの最適な順番、ランナー向けのトレーニングメニュー、ランニングフォーム改善に役立つ筋トレをわかりやすく解説します。"
        path="/column/gym-running/"
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
              description: "ランニングとパーソナルトレーニングを組み合わせるメリット、有酸素運動と筋トレの最適な順番、ランナー向けのトレーニングメニュー、ランニングフォーム改善に役立つ筋トレをわかりやすく解説します。",
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
              トレーニング方法
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              ランニングとパーソナルトレーニングは、独立した運動ではなく、組み合わせることでより大きな効果を発揮します。持久力と筋力をバランスよく発展させたい方や、走るフォームを改善したい方にとって、この組み合わせは理想的です。本記事では、ランニングとパーソナルトレーニングを効果的に組み合わせる方法、有酸素運動と筋トレの最適な順番、ランナーにおすすめのトレーニングメニュー、そしてランニングフォーム改善に役立つ筋トレについて、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ランニングとパーソナルトレーニングを組み合わせるメリット
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ランニングとパーソナルトレーニングの組み合わせは、単体では得られない様々なメリットがあります。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">持久力と筋力の両立</h3>
                    <p className="text-gray-600">ランニングで心肺機能を高め、パーソナルトレーニングで筋力を強化することで、全身の運動能力が大幅に向上します。マラソンランナーでも引き締まった体が作られます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">基礎代謝の向上</h3>
                    <p className="text-gray-600">筋肉量が増えることで安静時代謝が上がり、ランニングだけでは得られないダイエット効果が期待できます。脂肪燃焼効率が格段に高まります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">怪我の予防と回復力向上</h3>
                    <p className="text-gray-600">体幹や臀部の筋肉が強化されると、ランニング時の負荷が分散され、膝や足首の怪我が減ります。また、パーソナルトレーナーのサポートで正しいフォーム矯正も可能です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ランニングパフォーマンスの向上</h3>
                    <p className="text-gray-600">下半身の筋力が強化されると、ランニングスピードが上がり、より長い距離を走れるようになります。競技力向上にも直結します。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                有酸素運動と筋トレの最適な順番
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                運動の順序は目的によって異なります。最大の効果を得るために、目的別の最適な順番を理解しましょう：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">筋肉を増やしたい場合</h3>
                  <p className="text-gray-700 mb-3">推奨順序：<strong>筋トレ（パーソナルトレーニング）→ 有酸素運動（ランニング）</strong></p>
                  <p className="text-gray-600 text-sm">筋トレで体のエネルギーを消費してから有酸素運動を行うことで、脂肪燃焼が効率的に進みます。筋肉の分解を防ぎながら、脂肪だけを落とすことが可能です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">ダイエットが目的の場合</h3>
                  <p className="text-gray-700 mb-3">推奨順序：<strong>軽い有酸素運動 → 筋トレ → 高強度有酸素運動</strong></p>
                  <p className="text-gray-600 text-sm">ウォームアップとして軽くランニングし、パーソナルトレーニングで大きな筋肉を動かし、最後に高強度の有酸素運動で脂肪を落とします。この順序で脂肪燃焼効率が最大化されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">別日での実施（推奨）</h3>
                  <p className="text-gray-700 mb-3">推奨スケジュール：<strong>月木 = パーソナルトレーニング、火水日 = ランニング</strong></p>
                  <p className="text-gray-600 text-sm">同じ日に両方行う場合、疲労が蓄積しやすくなります。回復期を設けることで、各運動の効果が最大化され、怪我のリスクも低減します。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                週のトレーニングスケジュールの立て方
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ランニングとパーソナルトレーニングを効果的に組み合わせるために、週のスケジュール例を紹介します：
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-bold">曜日</th>
                      <th className="border border-gray-300 p-3 text-left font-bold">運動内容</th>
                      <th className="border border-gray-300 p-3 text-left font-bold">備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">月</td>
                      <td className="border border-gray-300 p-3">パーソナルトレーニング（60分）</td>
                      <td className="border border-gray-300 p-3">下半身・体幹メイン</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">火</td>
                      <td className="border border-gray-300 p-3">ランニング（30～40分）</td>
                      <td className="border border-gray-300 p-3">ペースは軽めで</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">水</td>
                      <td className="border border-gray-300 p-3">休息＆ストレッチ</td>
                      <td className="border border-gray-300 p-3">筋肉の回復に重点</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">木</td>
                      <td className="border border-gray-300 p-3">パーソナルトレーニング（60分）</td>
                      <td className="border border-gray-300 p-3">上半身・体幹メイン</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">金</td>
                      <td className="border border-gray-300 p-3">ランニング（30～40分）</td>
                      <td className="border border-gray-300 p-3">強度を上げても可</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">土</td>
                      <td className="border border-gray-300 p-3">ランニング（45～60分）</td>
                      <td className="border border-gray-300 p-3">長距離走習慣</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">日</td>
                      <td className="border border-gray-300 p-3">休息</td>
                      <td className="border border-gray-300 p-3">完全休息日</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ランナーにおすすめのパーソナルトレーニングメニュー
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ランニングパフォーマンスを高めるために、パーソナルトレーナーが重視する筋群は、体幹・臀部・股関節周りです。これらの部位を強化することで、ランニング効率が劇的に改善されます。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. 体幹トレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">プランク、サイドプランク、デッドバグなど。体幹が安定するとランニング時の上半身がぶれず、効率的に脚の力が地面に伝わります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. 臀部（おしり）トレーニング（15分）</h3>
                  <p className="text-gray-600 text-sm">ヒップスラスト、スクワット、ルーマニアンデッドリフトなど。大臀筋が強いランナーは走速度が速く、怪我も少ないです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. 股関節モビリティトレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">股関節の可動域を広げるストレッチやピラティス。股関節の動きが良くなるとランニングストライドが広がり、効率が向上します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. 脚の筋力トレーニング（15分）</h3>
                  <p className="text-gray-600 text-sm">レッグプレス、ハムストリング、ふくらはぎのトレーニング。下半身全体をバランスよく強化することで、ランニング関連の怪我が減り、スタミナが向上します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">5. 股関節周り（臀筋郡）トレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">外転・内転・外旋運動。ランニング時の足の落ち方が安定し、膝への負荷が減少します。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ランニングフォーム改善にパーソナルトレーナーを活用する方法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                フォーム改善は怪我予防と走力向上の両面で極めて重要です。パーソナルトレーナーは以下の方法でフォーム改善をサポートします：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">動画撮影・フォーム分析</h3>
                    <p className="text-gray-600">正面・側面からランニングを撮影し、足の着地位置、膝の角度、上半身の傾き、腕振りなど詳細に分析します。苦手な部分が明確になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">姿勢評価と問題点指摘</h3>
                    <p className="text-gray-600">立位での姿勢、骨盤の傾き、肩甲骨の位置などを評価し、ランニングフォームに影響する問題点を特定します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">フォーム矯正トレーニング</h3>
                    <p className="text-gray-600">分析結果に基づき、弱点部位を強化する筋トレメニューを作成。体幹・臀部・股関節周りのトレーニングで、正しいフォームが身につきます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">定期的なフォローアップ</h3>
                    <p className="text-gray-600">数週間後に再度動画撮影し、改善を確認。さらに細かい調整を加え、より効率的なフォームへ改善していきます。</p>
                  </div>
                </li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>結果：</strong>フォーム改善により、ランニングパフォーマンスが5～10%向上し、膝痛やふくらはぎの痛みといった故障リスクが大幅に減少します。
                </p>
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
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ランニングとトレーニングを組み合わせて理想の体へ
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              ランナーに最適なパーソナルトレーニングを受けることで、走力向上と怪我予防が同時に実現します。全国のパーソナルジムから、自分にぴったりのジムを見つけましょう。
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
                href="/column/gym-sport/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  スポーツパフォーマンス向上のためのパーソナルジム活用法｜競技力アップのコツ
                </h3>
                <p className="text-sm text-gray-600">
                  競技パフォーマンス向上に効果的なトレーニング
                </p>
              </Link>
              <Link
                href="/column/gym-injury/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムでの怪我予防とアフターケア｜安全にトレーニングを続けるコツ
                </h3>
                <p className="text-sm text-gray-600">
                  怪我の予防と回復を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-muscle/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  筋肉をつけるためのパーソナルジム活用法｜バルクアップと増量期のコツ
                </h3>
                <p className="text-sm text-gray-600">
                  効率的な筋力向上の方法を紹介
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
