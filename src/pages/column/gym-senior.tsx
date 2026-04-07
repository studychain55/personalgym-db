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
      question: "50代からパーソナルジムを始めるのに遅くないですか？",
      answer: "全く遅くありません。むしろ50代からこそパーソナルジムをお勧めします。加齢による筋力低下（サルコペニア）を防ぎ、健康寿命を延ばすために、パーソナルトレーナーの指導は大きな力になります。多くのシニア向けプログラムが用意されています。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "既往歴がある場合、パーソナルジムに通えますか？",
      answer: "事前に医師に相談し、許可が得られれば通えます。カウンセリング時に既往歴と現在の健康状態を正直に伝えることが重要です。多くのパーソナルジムはシニア向けのリハビリテーション経験を持つトレーナーがいます。安全性を優先したプログラムを作成してもらえます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "シニア向けの低強度トレーニングでも効果がありますか？",
      answer: "はい、効果があります。むしろ、加齢に伴う筋力低下防止には、低～中程度の強度で継続的に行うトレーニングが最適です。週2回の低強度トレーニングを3ヶ月継続すれば、筋力向上と日常生活での活動能力改善が期待できます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "股関節や膝に痛みがある場合、どんなトレーニングができますか？",
      answer: "パーソナルトレーナーが関節に負担の少ない代替運動を提案します。水中トレーニング、椅子を利用した運動、ゆっくりした可動域制限運動など、個人の状態に合わせたプログラムが可能です。医師の指示の範囲内で、安全に運動できます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムはシニア向けの健康管理もしてくれますか？",
      answer: "はい。血圧計測、体脂肪率測定、姿勢分析などを定期的に行います。さらに、栄養相談、運動処方の調整、生活習慣改善のアドバイスを提供するジムもあります。健康寿命延伸を目指した総合的なサポートが可能です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "シニア向けパーソナルジムの相場費用は？",
      answer: "50代以上向けのプログラムは月額5～12万円が一般的です。60分のセッションで週2回の契約が多いです。シニア割引やキャンペーンを用意しているジムもあるため、複数のジムの体験を受けて比較することをお勧めします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymSeniorPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "シニア・50代からのパーソナルジム" },
  ];

  const pageTitle = "シニア・50代からのパーソナルジム｜安全な始め方と効果";
  const pageUrl = `${baseSiteUrl}/column/gym-senior/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="50代以上の方へ。パーソナルジムがシニア向けに最適な理由、安全な始め方、筋力低下防止、ロコモティブシンドローム対策、健康寿命延伸のメリットを解説します。"
        path="/column/gym-senior/"
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
              description: "50代以上の方へ。パーソナルジムがシニア向けに最適な理由、安全な始め方、筋力低下防止、ロコモティブシンドローム対策、健康寿命延伸のメリットを解説します。",
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
              シニア向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              50代から始めるパーソナルジムは、健康寿命を延ばし、日常生活での活力を取り戻すための最適な選択肢です。このガイドでは、シニア向けのトレーニング方法、安全性への配慮、必要な準備をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                50代からパーソナルジムがおすすめな理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                加齢に伴う身体の変化に対応し、健康寿命を延ばすためにパーソナルジムは最適です：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">サルコペニア（筋肉減少症）の予防</h3>
                    <p className="text-gray-600">50代以降、毎年0.5～1％の筋肉が失われます。計画的なレジスタンストレーニングにより筋肉量を維持でき、基礎代謝低下と寝たきりリスクを防げます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ロコモティブシンドローム対策</h3>
                    <p className="text-gray-600">立つ、歩く、階段の上り下りなど、日常的な動作に必要な筋力・骨密度・バランス能力を改善。寝たきり防止に最適です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">生活習慣病の改善・予防</h3>
                    <p className="text-gray-600">運動により血圧低下、血糖値改善、コレステロール改善が期待できます。医師の処方した薬の効果を高める補助的役割も果たします。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨密度の維持・向上</h3>
                    <p className="text-gray-600">加齢と共に骨密度が低下（特に女性）し、骨粗鬆症のリスクが高まります。負荷をかけたトレーニングで骨密度を保つことができます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">心理的健康と社会的つながり</h3>
                    <p className="text-gray-600">パーソナルジムでのコミュニケーション、達成感、プロトレーナーのサポートにより、メンタルヘルスが向上し、人生の充実度が高まります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                安全なトレーニング開始の準備
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                シニアがパーソナルジムを始める際の重要な準備ステップです：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">医師の許可取得</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ かかりつけ医に相談</li>
                    <li>✓ 既往歴を全て報告</li>
                    <li>✓ 現在の薬を伝える</li>
                    <li>✓ 書面での許可が理想</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">健康診断実施</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 血液検査</li>
                    <li>✓ 血圧計測</li>
                    <li>✓ 運動負荷試験（推奨）</li>
                    <li>✓ 結果をトレーナーと共有</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-gray-700"><strong>重要：</strong> パーソナルジムのスタッフは医療専門家ではありません。必ず医師の指示を優先し、トレーナーと医師の指示を共有しておくことで、安全なトレーニングが実現できます。</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                シニア向けトレーニングの特徴
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                50代以上向けのトレーニングは、安全性と効果のバランスが重視されます：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>低～中程度の強度</strong> — 無理のない負荷で継続性を優先。週2～3回の継続が効果を生みます</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>関節への配慮</strong> — 膝、腰、肩など、加齢により痛みやすい関節を保護。代替運動を活用</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>バランス・柔軟性訓練</strong> — 転倒防止とケガ予防を重視。姿勢改善トレーニングも含める</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>定期的な体調チェック</strong> — 血圧計測、心拍数確認など、常に健康状態を監視</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>充分なウォーミングアップ</strong> — 20～30分程度かけて、ゆっくり体を温め、準備する</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                シニア向けの低強度トレーニング例
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                実際に多くのシニア向けパーソナルジムで実施されているトレーニング例です：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">レジスタンストレーニング</h3>
                  <p className="text-gray-700 text-sm">軽いダンベルやマシンを使用。スクワット、足の上げ下ろし、腕の運動など、日常動作に必要な筋肉を鍛えます。無理のない動作範囲で週2回が目安。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">バランストレーニング</h3>
                  <p className="text-gray-700 text-sm">片脚立ちや、バランスボードを利用した訓練。転倒防止とコアの安定性向上が目的。毎回15～20分程度。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">ストレッチ・可動域改善</h3>
                  <p className="text-gray-700 text-sm">加齢により硬くなった関節と筋肉を柔らかくする。動的ストレッチと静的ストレッチの組み合わせで、毎回15～20分。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">有酸素運動</h3>
                  <p className="text-gray-700 text-sm">ウォーキング、自転車、水中運動など、関節への負担が少ない活動。週2～3回、1回20～30分程度が目安。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                既往歴がある場合の対応
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                一般的な既往歴への対応例です（必ず医師の指示を優先してください）：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">高血圧</h3>
                  <p className="text-sm text-gray-700">適切なウォーミングアップと、血圧計測を毎回実施。過度な強度は避け、主に有酸素運動を重視。薬の服用時間に配慮。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">糖尿病</h3>
                  <p className="text-sm text-gray-700">低血糖のリスクに備え、水分補給とおやつ（ブドウ糖など）を準備。医師の指示に基づいた食事・運動タイミングの調整。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">心臓疾患</h3>
                  <p className="text-sm text-gray-700">心拍数計測、心拍数ゾーンの設定、定期的な医師診察。強度は低めに設定。胸痛や息切れ時は即座に中止。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">関節炎・腰痛</h3>
                  <p className="text-sm text-gray-700">患部を避けた運動、痛みのない可動域での訓練。水中運動など負担が少ない方法を活用。定期的なストレッチを重視。</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                栄養・食事のサポート
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                シニアのトレーニング効果を高める食事ポイント：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>タンパク質摂取</strong> — 加齢により必要量が増加（1日あたり体重1kg 当たり1.2～1.5g）。鶏肉、魚、卵、豆類を意識的に摂取</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>カルシウム・ビタミンD</strong> — 骨粗鬆症予防。乳製品、小魚、キノコ類を積極的に摂取</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>水分補給</strong> — 加齢により渇き感が低下し、脱水のリスクが高まる。意識的に水分を摂取</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>食事タイミング</strong> — トレーニング2時間前に軽食、トレーニング後1時間以内に栄養摂取</span>
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                実現する健康寿命の延伸
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                継続的なパーソナルジム利用で期待できる成果：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3ヶ月の変化</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 筋力向上（約5～10％）</li>
                    <li>✓ 日常動作の楽さを実感</li>
                    <li>✓ 転倒リスク低下</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">6ヶ月～1年の変化</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 筋肉量増加（5kg以上）</li>
                    <li>✓ 血圧・血糖値改善</li>
                    <li>✓ 姿勢改善</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">継続することで、自分の足で歩き、独立した生活を長く送ることができます。これが「健康寿命の延伸」の本質です。</p>
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
              シニア向けプログラムのあるパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。シニア向けプログラムと経験豊富なトレーナーが揃ったジムから選べます。
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
                href="/column/gym-beginner/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600">
                  初めてのパーソナルジムの準備と確認事項を解説します
                </p>
              </Link>
              <Link
                href="/column/training-frequency/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルトレーニングの通う頻度・回数の目安
                </h3>
                <p className="text-sm text-gray-600">
                  目標別の最適な通所頻度を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-nutrition/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの食事管理｜トレーニングと食事の組み合わせ
                </h3>
                <p className="text-sm text-gray-600">
                  効果的な栄養管理を解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
