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
      question: "パーソナルジムでダイエットできない場合は？",
      answer: "ほとんどの場合、食事管理とトレーニングが相応しくないことが原因です。トレーナーに相談して、プログラムの見直しを検討しましょう。効果が出ない場合は、トレーナーを変更することも選択肢です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ダイエット効果は期間によってどう変わる？",
      answer: "通常2週間で体の変化を感じ始め、1ヶ月で周囲が気づく、3ヶ月で大きく変わります。結果には個人差があるため、最低3ヶ月は継続することをおすすめします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "ダイエット中に食べてもいい食べ物は？",
      answer: "鶏むね肉、魚、卵、豆類などのタンパク質、野菜、玄米などの食物繊維が良いです。トレーナーの食事指導に従うことが大切です。完全に制限するのではなく、バランスの良い食事を心がけましょう。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ダイエット停滞期はどう乗り切る？",
      answer: "停滞期（1～3ヶ月ごとに来ることが多い）では、トレーニング内容や食事内容を調整します。トレーナーに相談して、プログラムの変更をしましょう。焦らず継続することが大切です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "ダイエット後、リバウンドしない方法は？",
      answer: "目標達成後も月1～2回のトレーニングを継続することをおすすめします。食事習慣の改善も重要です。完全に食事制限を辞めるのではなく、バランスの良い食事を維持してください。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルジムとダイエットジムの違いは？",
      answer: "パーソナルジムは筋力アップも含めた総合的なトレーニング、ダイエットジムはダイエットに特化しています。ダイエットが主目的なら、ダイエットジムが専門的ですが、幅広い目標に対応したいならパーソナルジムがおすすめです。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function DietGymPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "ダイエットとパーソナルジム" },
  ];

  const pageTitle = "ダイエットにパーソナルジムをおすすめする理由";
  const pageUrl = `${baseSiteUrl}/column/diet-gym/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="ダイエット成功率が高いパーソナルジム。成功の秘訣、フィットネスジムとの違い、効果的なトレーニング方法を解説します。"
        path="/column/diet-gym/"
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
              description: "ダイエット成功率が高いパーソナルジム。成功の秘訣、フィットネスジムとの違い、効果的なトレーニング方法を解説します。",
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
              ダイエット
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              ダイエットに成功したいなら、パーソナルジムがおすすめです。このガイドでは、パーソナルジムでダイエット成功率が高い理由、フィットネスジムとの違い、効果的なトレーニング方法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムがダイエットに効果的な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムがダイエットに高い効果を発揮する理由を解説します：
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">1. 効率的なトレーニング</h3>
                  <p className="text-gray-700">トレーナーが最適なトレーニング方法を指導するため、自己流より短時間で高い効果が期待できます。正しいフォームで大きな筋群を効率的に鍛えることで、基礎代謝が上がり、ダイエット効果が高まります。</p>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">2. 個別の食事指導</h3>
                  <p className="text-gray-700">単なる「カロリー制限」ではなく、あなたの生活習慣や好みに合わせた食事指導が受けられます。継続可能な食事プランをトレーナーとともに作成することで、リバウンドしにくいダイエットが実現します。</p>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">3. モチベーション維持</h3>
                  <p className="text-gray-700">トレーナーからの継続的なサポートと励ましにより、モチベーションを維持できます。一人では挫折しやすいダイエットも、プロのサポートがあれば成功率が高まります。</p>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">4. 段階的な目標設定</h3>
                  <p className="text-gray-700">大きな目標を小さな段階に分けて、実現可能なペースで進めていきます。毎月の進捗測定で、成功を実感することでモチベーションが続きます。</p>
                </div>

                <div className="border-l-4 border-blue-700 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">5. トレーニング内容の調整</h3>
                  <p className="text-gray-700">ダイエット中の身体の変化に合わせて、トレーニング内容を随時調整します。停滞期が来たときも、プロのアドバイスで乗り切ることができます。</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムとフィットネスジムの比較
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット目的での選択を考えるなら、両者の違いを理解することが大切です：
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-3 text-left font-bold">項目</th>
                      <th className="border border-gray-300 p-3 text-left font-bold">パーソナルジム</th>
                      <th className="border border-gray-300 p-3 text-left font-bold">フィットネスジム</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">指導</td>
                      <td className="border border-gray-300 p-3">マンツーマン指導</td>
                      <td className="border border-gray-300 p-3">自己管理</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">食事指導</td>
                      <td className="border border-gray-300 p-3">あり（個別対応）</td>
                      <td className="border border-gray-300 p-3">通常なし</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">料金</td>
                      <td className="border border-gray-300 p-3">月50,000～150,000円</td>
                      <td className="border border-gray-300 p-3">月10,000～15,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">ダイエット成功率</td>
                      <td className="border border-gray-300 p-3">80～90%</td>
                      <td className="border border-gray-300 p-3">20～30%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="border border-gray-300 p-3 font-semibold">リバウンド率</td>
                      <td className="border border-gray-300 p-3">20～30%</td>
                      <td className="border border-gray-300 p-3">60～70%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">目標達成期間</td>
                      <td className="border border-gray-300 p-3">3～6ヶ月</td>
                      <td className="border border-gray-300 p-3">6ヶ月～1年以上</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット成功のポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムでダイエットを成功させるには、以下のポイントが重要です：
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">現実的な目標設定</h3>
                    <p className="text-gray-600 text-sm">「3ヶ月で10kg痩せたい」より「3ヶ月で5kg、健康的に痩せたい」といった実現可能な目標が成功につながります</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">トレーナーの指示に従う</h3>
                    <p className="text-gray-600 text-sm">食事指導やトレーニング内容は、あなたの体のために設計されています。その指示に従うことが成功の最短路です</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">継続的な通所</h3>
                    <p className="text-gray-600 text-sm">週2～3回のペースで3～4ヶ月以上継続することが重要です。短期での成果より、長期の習慣化が大切です</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">完璧を目指さない</h3>
                    <p className="text-gray-600 text-sm">100%完璧な食事管理は難しいです。80点のダイエットを継続することが、成功と継続につながります</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-blue-700 flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">定期的な測定と記録</h3>
                    <p className="text-gray-600 text-sm">体重だけでなく、体脂肪率や身体サイズも測定することで、進捗を実感できます</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット中の食事の考え方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムでのダイエットは「制限」ではなく「バランス」を重視します：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">積極的に摂取すべき</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ タンパク質（鶏むね肉、魚、卵）</li>
                    <li>✓ 食物繊維（野菜、玄米）</li>
                    <li>✓ 健康的な脂質（アボカド、ナッツ）</li>
                    <li>✓ 微量栄養素（ビタミン、ミネラル）</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">制限すべき</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✗ 砂糖たっぷりの食品</li>
                    <li>✗ 揚げ物（毎日の摂取）</li>
                    <li>✗ アルコール（毎日の摂取）</li>
                    <li>✗ 夜遅い食事（22時以降）</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <strong>重要：</strong>食事制限は「楽しく継続できる」ことが最優先です。好きな食べ物を完全に禁止するのではなく、量を調整したり、週1回なら食べてもいい、などの柔軟な対応をしましょう。
              </p>
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
