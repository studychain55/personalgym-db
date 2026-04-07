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
      question: "入会金の相場はいくらですか？",
      answer: "パーソナルジムの入会金は20,000～50,000円程度が一般的です。キャンペーン期間は無料や割引になることもあります。複数のジムの入会金を比較するときは、トータル費用（入会金+月額費用）を見ることが重要です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "月額制と都度払いはどちらがお得ですか？",
      answer: "長期的に通う予定なら月額制がお得です。短期間（1～3ヶ月）なら都度払いが良いでしょう。ただしジムにより単価が異なるため、実際の料金を確認することが重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "食事指導料は月額費用に含まれていますか？",
      answer: "ジムにより異なります。無料で含まれるジム、月額5,000円程度の追加料金、LINE相談で5,000～10,000円などパターンがあります。契約前に必ず確認してください。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "サプリメント購入は強制ですか？",
      answer: "推奨されることはありますが、強制ではありません。「購入が契約条件」というジムは避けるべきです。不要な場合は、はっきりと断っても問題ありません。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "休会制度はありますか？",
      answer: "多くのジムで月額3,000～5,000円程度で休会できます。退会と異なり、復帰時に新たな入会金が不要です。長期的な人生計画に合わせて、柔軟に対応できるジムを選びましょう。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "返金保証制度はありますか？",
      answer: "一部のジムでは返金保証（目標未達成時の返金）を提供しています。ただし条件が厳しいことが多いため、詳細を確認してください。返金より、トレーニングを継続することが重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymCostPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジム料金相場" },
  ];

  const pageTitle = "パーソナルジムの料金相場を解説｜月額・都度払いの違い";
  const pageUrl = `${baseSiteUrl}/column/gym-cost/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの料金体系を徹底解説。都度払い、月額制、回数券の違い、相場費用をまとめた比較表を掲載しています。"
        path="/column/gym-cost/"
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
              description: "パーソナルジムの料金体系を徹底解説。都度払い、月額制、回数券の違い、相場費用をまとめた比較表を掲載しています。",
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
              費用
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの料金体系は複雑ですが、理解すればお得に利用できます。このガイドでは、都度払い・月額制・回数券の違い、相場費用、料金を抑えるコツをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの料金体系
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムの料金は、大きく以下の3つのタイプに分かれます：
              </p>

              {/* Pricing Types */}
              <div className="space-y-6">
                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">1. 都度払い</h3>
                  <p className="text-gray-700 mb-3">1回のトレーニングごとに支払う方式</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>相場:</strong> 1回あたり8,000～15,000円</li>
                    <li><strong>メリット:</strong> 自分のペースで通える、初期費用が少ない</li>
                    <li><strong>デメリット:</strong> 継続的に通うと割高になる</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">2. 月額制</h3>
                  <p className="text-gray-700 mb-3">月単位で通い放題または回数制限で支払う方式</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>相場:</strong> 月4回で50,000～80,000円、月8回で100,000～150,000円</li>
                    <li><strong>メリット:</strong> 長期的に通うとお得、回数が増えると単価が下がる</li>
                    <li><strong>デメリット:</strong> 最低契約期間が決まっていることが多い</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">3. 回数券・チケット</h3>
                  <p className="text-gray-700 mb-3">複数回分をまとめて購入する方式</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>相場:</strong> 10回で70,000～100,000円（1回あたり7,000～10,000円）</li>
                    <li><strong>メリット:</strong> 都度払いより割安、有効期限が長いことが多い</li>
                    <li><strong>デメリット:</strong> 有効期限が切れる可能性</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 - Price Comparison */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                料金比較表
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                各料金体系の総費用を比較しました（3ヶ月間、初月入会金50,000円含む）：
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-3 text-left font-bold">料金体系</th>
                      <th className="border border-gray-300 p-3 text-center font-bold">月4回</th>
                      <th className="border border-gray-300 p-3 text-center font-bold">月8回</th>
                      <th className="border border-gray-300 p-3 text-center font-bold">月12回</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">都度払い</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (10,000×12) = 170,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (10,000×24) = 290,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (10,000×36) = 410,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">月額制</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (60,000×3) = 230,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (120,000×3) = 410,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (180,000×3) = 590,000円</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">回数券</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (80,000×1.5) = 170,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (80,000×3) = 290,000円</td>
                      <td className="border border-gray-300 p-3 text-center">50,000 + (80,000×4.5) = 410,000円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                ※上記は参考値です。実際の料金はジムにより異なります
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                初期費用の内訳
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムを始めるときに必要な初期費用は：
              </p>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">①</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">入会金</h3>
                    <p className="text-gray-600 text-sm">20,000～50,000円（キャンペーンで無料の場合も）</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">②</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">設定料・カウンセリング料</h3>
                    <p className="text-gray-600 text-sm">5,000～10,000円（初回のみ。ボディメイク計画作成など）</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">③</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">初回月額費用（1回目）</h3>
                    <p className="text-gray-600 text-sm">50,000～150,000円（選択したコースによる）</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">④</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">その他（オプション）</h3>
                    <p className="text-gray-600 text-sm">食事指導料・サプリメント購入など</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700">
                <strong>合計：90,000～260,000円程度</strong>が初月に必要です。2ヶ月目以降は、①②④の費用が不要になります。
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                料金を抑えるコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの料金を抑える方法をご紹介します：
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900">キャンペーン期間を狙う</h3>
                    <p className="text-gray-600 text-sm">入会金無料、初月半額などのキャンペーンが季節によってあります</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900">複数のジムで相見積もり</h3>
                    <p className="text-gray-600 text-sm">3～5つのジムで料金とサービスを比較しましょう</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900">月4回から始める</h3>
                    <p className="text-gray-600 text-sm">効果を実感してから回数を増やすより、最初は低頻度で確認</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900">食事指導が不要なら削除</h3>
                    <p className="text-gray-600 text-sm">自分で食事管理できる場合、食事指導料を削減できます</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900">短期集中コースを検討</h3>
                    <p className="text-gray-600 text-sm">3ヶ月など短期コースで目標達成後、月額制に変更</p>
                  </div>
                </li>
              </ul>
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
                href="/column/gym-beginner/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600">
                  パーソナルジムが初めての方へ、準備と確認点をまとめました
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
                href="/column/gym-nutrition/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムで効果を高める食事管理
                </h3>
                <p className="text-sm text-gray-600">
                  トレーニングと食事の関係性を詳しく解説
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
