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
      question: "ダイエット目的の場合、パーソナルジムは週何回通えばいいですか？",
      answer: "ダイエット効果を実感するなら、週2～3回の通所が目安です。週1回だと効果が出づらく、週4回以上は継続が難しくなる傾向があります。3ヶ月は継続することが重要なため、無理のないペースを選びましょう。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "筋力アップを目指す場合の理想的な通所頻度は？",
      answer: "筋肉を効果的に成長させるには、週2～4回の通所が効果的です。筋肉は48時間程度の回復期間が必要なため、同じ部位を3日置きにトレーニングするのが理想的です。初心者は週2回から始めても問題ありません。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体力向上・健康維持が目的の場合の目安は？",
      answer: "基礎体力の向上と健康維持が目的なら、週1～2回で十分です。継続することが最も重要なため、仕事や家事との両立ができるペースで長く続けることをおすすめします。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "スポーツパフォーマンス向上に必要な通所頻度は？",
      answer: "競技力向上を目指すなら、週3～5回のトレーニングが推奨されます。パーソナルトレーニングを週2～3回、他の練習と組み合わせる方法が多く採用されています。トレーナーと相談して最適なプログラムを組みましょう。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムの通所頻度を変更できますか？",
      answer: "ほとんどのジムでは目標達成状況に応じて通所頻度を変更できます。初期契約後も、進捗や生活状況に応じて調整可能です。3ヶ月ごとのカウンセリングで見直すことをおすすめします。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "忙しい時期は通所頻度を減らしても大丈夫ですか？",
      answer: "一時的に通所頻度を減らすことは可能ですが、完全に止めるより継続する方が効果的です。週1回でも継続すれば、筋力や体力の低下を抑えられます。忙しい時期こそ、軽めのトレーニングを継続することをおすすめします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function TrainingFrequencyPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングの通う頻度・回数の目安" },
  ];

  const pageTitle = "パーソナルトレーニングの通う頻度・回数の目安";
  const pageUrl = `${baseSiteUrl}/column/training-frequency/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルトレーニングの最適な通所頻度を目標別に解説。ダイエット・筋力アップ・スポーツパフォーマンス向上など、目的別の通所回数の目安をまとめました。"
        path="/column/training-frequency/"
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
              description: "パーソナルトレーニングの最適な通所頻度を目標別に解説。ダイエット・筋力アップ・スポーツパフォーマンス向上など、目的別の通所回数の目安をまとめました。",
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
              パーソナルトレーニングの効果は、通所頻度と目標設定に大きく左右されます。ダイエット、筋力アップ、スポーツパフォーマンス向上など、目標別に最適な通所回数の目安をわかりやすく解説します。無理なく続けられるペースで、確実に成果を出しましょう。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標別・パーソナルジムの通所頻度の目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルトレーニングの効果を最大限に引き出すには、目標に応じた通所頻度が重要です。以下は、各目標別の推奨通所頻度と期待できる効果です。
              </p>

              <div className="space-y-6">
                {/* Frequency 1 */}
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ダイエット目的：週2～3回が目安
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ダイエット効果を実感するには、週2～3回の通所が効果的です。週1回のペースだと、消費カロリーが不足して効果が出づらくなる傾向があります。
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">期間の目安：</span> 3～6ヶ月で5～10kg程度の体重減少が期待できます
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">ポイント：</span> 週2回なら月額8～12万円程度、週3回なら月額12～18万円が相場です。食事指導と並行することで効果が高まります。
                    </p>
                  </div>
                </div>

                {/* Frequency 2 */}
                <div className="border-l-4 border-green-700 pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    筋力アップ・ボディメイク：週2～4回が目安
                  </h3>
                  <p className="text-gray-700 mb-3">
                    筋肉を効果的に成長させるには、週2～4回のトレーニングが効果的です。筋肉は48時間の回復期間を必要とするため、同じ部位を3日置きにトレーニングするのが理想的です。
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">期間の目安：</span> 3ヶ月で体脂肪率2～4%低下、筋肉量2～3kg増加
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">ポイント：</span> 初心者は週2回から始めても問題ありません。3ヶ月後に進捗を確認して週3～4回に増やすのも効果的です。
                    </p>
                  </div>
                </div>

                {/* Frequency 3 */}
                <div className="border-l-4 border-purple-700 pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    体力向上・健康維持：週1～2回で十分
                  </h3>
                  <p className="text-gray-700 mb-3">
                    基礎体力の向上や健康維持が目的なら、週1～2回で十分です。継続することが最も重要なため、仕事や家事との両立ができるペースで長く続けることをおすすめします。
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">期間の目安：</span> 1～3ヶ月で基礎体力が向上し、日常生活での疲労感が軽減
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">ポイント：</span> 継続が一番大事です。無理のないペースで3年以上続けると、生活習慣病の予防効果が期待できます。
                    </p>
                  </div>
                </div>

                {/* Frequency 4 */}
                <div className="border-l-4 border-red-700 pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    スポーツパフォーマンス向上：週3～5回が推奨
                  </h3>
                  <p className="text-gray-700 mb-3">
                    競技力向上を目指すなら、週3～5回のトレーニングが推奨されます。パーソナルトレーニングを週2～3回、他の練習と組み合わせる方法が多く採用されています。
                  </p>
                  <div className="bg-red-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">期間の目安：</span> 3～6ヶ月で競技パフォーマンスが10～20%向上
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">ポイント：</span> 競技別に特化したプログラムが必要です。トレーナーと綿密に連携して、カスタマイズされたプログラムを組むことが成功の鍵です。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                通所頻度を決める際の重要ポイント
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">財政的な持続性</h3>
                  <p className="text-gray-700 text-sm">
                    週2回でも3年続ければ、週3回で3ヶ月続けるより成果が大きいことがほとんどです。無理なく続けられる予算で、長期継続可能なペースを選びましょう。
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">時間的な余裕</h3>
                  <p className="text-gray-700 text-sm">
                    移動時間を含めると1回あたり1～2時間かかります。仕事や家事の都合を考慮して、無理のないスケジュールを立てることが継続の秘訣です。
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">個人の体力レベル</h3>
                  <p className="text-gray-700 text-sm">
                    初心者は週1～2回から始め、体力がついてから週数を増やすのがおすすめです。オーバートレーニングは怪我のリスクになります。
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">生活習慣との両立</h3>
                  <p className="text-gray-700 text-sm">
                    仕事の忙しさ、家族との時間など、ライフステージに応じて柔軟に調整しましょう。固定的なペースより、継続可能なペースが重要です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                よくある質問・通所頻度の工夫
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">Q. 忙しい時期は通所頻度を減らしても大丈夫？</h3>
                  <p className="text-gray-700">
                    A. 完全に止めるより、週1回でも継続する方が効果的です。筋力や体力の低下を最小限に抑えられます。忙しい時期こそ、軽めのトレーニングを継続することをおすすめします。
                  </p>
                </div>
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">Q. 目標達成後は通所頻度を減らせる？</h3>
                  <p className="text-gray-700">
                    A. はい。目標達成後は維持を目的とした週1回程度のメンテナンストレーニングに切り替える方が多いです。費用と効果のバランスを取ることができます。
                  </p>
                </div>
                <div className="border-l-4 border-blue-700 pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">Q. グループレッスンと組み合わせるなら？</h3>
                  <p className="text-gray-700">
                    A. パーソナルトレーニング週1回＋グループレッスン週1～2回の組み合わせなら、週2～3回の効果が期待できます。費用を抑えながら高い効果を得られます。
                  </p>
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
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
