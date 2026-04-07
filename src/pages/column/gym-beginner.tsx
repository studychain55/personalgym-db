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
      question: "パーソナルジムを始める前に必要な準備は？",
      answer: "健康状態の確認、運動目標の明確化、予算の決定が重要です。また、複数のジムの体験を受けることをおすすめします。体験時に施設設備、トレーナーの質、料金体系などを確認しましょう。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "初回カウンセリングで何を確認すればいいですか？",
      answer: "目標達成までの期間、トレーニング頻度、食事指導の有無、料金体系（追加料金の有無）、トレーナーの資格・経歴、キャンセルポリシーなどを確認しましょう。不明な点は必ず質問してください。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニング開始前に医師の診察は必要ですか？",
      answer: "特に既往歴がある場合は、医師の診察を受けることをおすすめします。多くのジムではカウンセリング時に健康状態について質問するため、正直に伝えましょう。安全なトレーニングプログラムを組んでもらえます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "服装や靴はどんなものを選べばいいですか？",
      answer: "動きやすいジャージやレギンス、スニーカーがおすすめです。汗をかくため速乾性のある素材が良いでしょう。ジムによってはドレスコードがあるかもしれないので、事前に確認してください。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "最初のトレーニングはどのくらい大変ですか？",
      answer: "初心者向けに負荷は調整されますが、多少の筋肉痛は覚悟してください。翌日～2日後に筋肉痛が出ることが多いです。これは正常な反応なので、無理なく続けることが大切です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルジムに通うペースは？",
      answer: "初心者は週1～2回から始めることをおすすめします。目標によって異なりますが、ダイエットの場合は週2～3回が効果的です。無理のないペースで継続することが成功の秘訣です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymBeginnerPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジム初心者ガイド" },
  ];

  const pageTitle = "パーソナルジム初心者ガイド｜始め方・準備すること";
  const pageUrl = `${baseSiteUrl}/column/gym-beginner/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムが初めての方へ。始める前に必要な準備、最初に確認すべきポイント、初回面談で質問すべきことをまとめました。"
        path="/column/gym-beginner/"
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
              description: "パーソナルジムが初めての方へ。始める前に必要な準備、最初に確認すべきポイント、初回面談で質問すべきことをまとめました。",
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
              初心者向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムを始めるなら、事前準備と確認事項をしっかり押さえることが成功の鍵です。このガイドでは、初めてパーソナルジムに通う方が知っておくべき準備、確認項目、初回面談でのポイントをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムを始める前に必要な準備
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムに通う前に、以下の準備をしておくと、スムーズにスタートできます：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">健康状態の確認</h3>
                    <p className="text-gray-600">既往歴や健康上の懸念がないか医師に相談しておくと、安心です。体重・体脂肪率・筋肉量を事前に測定しておくと、進捗が把握しやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">運動目標の明確化</h3>
                    <p className="text-gray-600">ダイエット、筋力アップ、体力向上など、目標を明確にしておきましょう。「3ヶ月で5kg痩せたい」など、具体的な目標があるとトレーナーが効果的なプログラムを組みやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">予算の決定</h3>
                    <p className="text-gray-600">月いくら使えるか決めておくと、ジム選びがスムーズです。初期費用（入会金、設定料）、月額費用、食事指導料などを含めた総費用を計算しましょう。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">複数のジムの体験</h3>
                    <p className="text-gray-600">最低3つのジムで体験セッションを受けることをおすすめします。施設、トレーナーの質、雰囲気など、実際に体験することで、自分に合ったジムが見つかりやすくなります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                初回カウンセリングでチェックすべき項目
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                初回カウンセリングで、以下の項目を必ず確認しましょう：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">プログラム関連</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 目標達成までの期間</li>
                    <li>✓ 推奨トレーニング頻度</li>
                    <li>✓ 食事指導の有無・内容</li>
                    <li>✓ サプリメント販売の有無</li>
                    <li>✓ 進捗測定の頻度</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">料金・契約関連</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 入会金・初期費用</li>
                    <li>✓ 月額費用の明細</li>
                    <li>✓ 追加料金の有無</li>
                    <li>✓ キャンセル・休会ポリシー</li>
                    <li>✓ 退会時の手続き</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーナー関連</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ トレーナーの資格・経歴</li>
                    <li>✓ 同じトレーナーか変わるか</li>
                    <li>✓ トレーナーの指定可否</li>
                    <li>✓ 急な欠勤時の対応</li>
                    <li>✓ 相性が合わない場合の変更</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">施設関連</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 営業時間・定休日</li>
                    <li>✓ シャワー・ロッカー完備</li>
                    <li>✓ 駐車場・駐輪場</li>
                    <li>✓ アメニティの充実度</li>
                    <li>✓ 混雑時間帯</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験セッション時に確認すべきポイント
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体験セッション（通常60分）では、実際の雰囲気を感じることが大切です。以下のポイントをチェックしましょう：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーナーとの相性</strong> — わかりやすく、励ましてくれるか、厳しすぎないか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>施設の清潔さ</strong> — トイレ、シャワー、マット、器具の清潔度</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>器具の充実度</strong> — 必要な器具が揃っているか、古くないか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>他の利用者の雰囲気</strong> — 居心地が良いか、通いたいと思えるか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>スタッフの対応</strong> — 親切で丁寧か、押し売りがないか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーニング内容</strong> — 自分の体力に合わせた内容か、無理がないか</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                初回トレーニング前の準備物
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                最初のトレーニングに向けて、以下を準備しておきましょう：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">必須アイテム</h3>
                  <p className="text-gray-700 text-sm">運動着（動きやすい服装）、スニーカー、タオル、飲み物（水やスポーツドリンク）</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">あると便利なもの</h3>
                  <p className="text-gray-700 text-sm">着替え、シャンプー・ボディソープ、制汗スプレー、ヘアゴム（長い髪の場合）</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">持参する必要はないもの</h3>
                  <p className="text-gray-700 text-sm">筋トレグローブ（ほとんどのジムで用意）、サプリメント（別途購入の場合を除く）</p>
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
                href="/column/gym-cost/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの料金相場を解説｜月額・都度払いの違い
                </h3>
                <p className="text-sm text-gray-600">
                  パーソナルジムの料金体系を徹底解説します
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
                  ダイエット成功率が高い理由を解説します
                </p>
              </Link>
              <Link
                href="/column/training-frequency/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの最適な通う頻度とは
                </h3>
                <p className="text-sm text-gray-600">
                  効果的な通頻度と継続のコツを解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
