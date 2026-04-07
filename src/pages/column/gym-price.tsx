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
      question: "パーソナルジムの全国平均料金は？",
      answer: "1回あたりの料金相場は5,000円～15,000円で、平均は7,000円～10,000円程度です。月額では月4回で28,000円～60,000円、月8回で56,000円～120,000円が目安となります。都心部は高め、地方は低めの傾向があります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "入会金をかけずにパーソナルジムに入会できる？",
      answer: "はい、多くのジムが入会金キャンペーンを実施しており、0円で入会できるジムも増えています。特に新店舗オープンや期間限定キャンペーンで入会金無料になることが多いです。体験時に「入会金キャンペーンはありますか？」と確認しましょう。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "短期集中コース（2ヶ月など）の料金相場は？",
      answer: "短期集中コースの料金は、2ヶ月（16回）で300,000円～500,000円が目安です。1回あたりに換算すると18,000円～31,000円と割高になることが多いですが、短期で結果が出やすい設計になっています。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "月額制と回数制、どちらがお得？",
      answer: "月額制と回数制では、ライフスタイルと目的で選ぶべきです。毎週定期的に通える人は月額制がお得、不定期な人は都度払いや回数制がおすすめです。多くのジムでは、月額制の方が1回あたりの単価が低く設定されています。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "追加料金（食事指導、サプリメント）にいくらかかる？",
      answer: "食事指導の追加料金は月5,000円～20,000円程度が一般的です。最初から食事指導が含まれているプランもあります。サプリメント販売は任意の場合が多いため、購入しなくても大丈夫です。事前に「基本料金以外の追加料金」を確認しましょう。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルジムを安く利用するコツは？",
      answer: "①複数のジムで体験を受けてキャンペーン比較②オフピーク時間帯割引の利用③月額制で継続による割引④紹介割引の活用⑤短期コースより長期プランの方が割安、などがあります。事前の情報収集が費用削減の鍵です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymPricePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの料金相場｜費用を抑えるコツ" },
  ];

  const pageTitle = "パーソナルジムの料金相場｜費用を抑えるコツと契約のポイント";
  const pageUrl = `${baseSiteUrl}/column/gym-price/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの料金相場を徹底解説。全国平均相場、入会金、月額制・回数制の比較、費用を抑えるコツ、体験レッスン、契約時の注意点など、賢く選ぶためのガイド。"
        path="/column/gym-price/"
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
              description: "パーソナルジムの料金相場を徹底解説。全国平均相場、入会金、月額制・回数制の比較、費用を抑えるコツ、体験レッスン、契約時の注意点など、賢く選ぶためのガイド。",
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
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              費用
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの料金は、初心者が最も気になるポイントの一つです。このガイドでは、全国の料金相場、入会金の相場、月額制と回数制の違い、費用を抑えるコツ、体験レッスンの活用法、契約時の注意点まで、賢くパーソナルジムを選ぶための情報をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの全国料金相場
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの料金は、ジムの場所、規模、トレーナーの経歴によって大きく異なります。以下は全国平均の相場です：
              </p>
              <div className="space-y-4">
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">入会金</h3>
                  <p className="text-gray-700 text-sm mb-1">相場：0円～50,000円</p>
                  <p className="text-gray-600 text-sm">最近は入会金無料キャンペーンを実施するジムが増えており、実際には0～20,000円程度のジムが大多数です。</p>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1回あたりの料金（回数制）</h3>
                  <p className="text-gray-700 text-sm mb-1">相場：5,000円～15,000円</p>
                  <p className="text-gray-600 text-sm">都心部（東京・大阪・名古屋など）：8,000円～15,000円 / 地方：5,000円～10,000円</p>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">月額制（月4回）</h3>
                  <p className="text-gray-700 text-sm mb-1">相場：28,000円～60,000円</p>
                  <p className="text-gray-600 text-sm">1回あたり7,000円～15,000円の計算になります。回数制より割安な設定のジムが多いです。</p>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">月額制（月8回）</h3>
                  <p className="text-gray-700 text-sm mb-1">相場：56,000円～120,000円</p>
                  <p className="text-gray-600 text-sm">1回あたり7,000円～15,000円程度です。月4回より割安な単価になることが多いです。</p>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体験レッスン</h3>
                  <p className="text-gray-700 text-sm mb-1">相場：1,000円～5,000円（無料の場合もあり）</p>
                  <p className="text-gray-600 text-sm">多くのジムが初回無料または格安で体験を提供しています。複数のジムを比較する絶好の機会です。</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                月額制 vs 回数制（都度払い）の比較
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの料金プランは大きく2つに分かれます。自分のライフスタイルに合ったプランを選択することが重要です：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">月額制プラン</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">✓</span>
                      <span>毎月固定費で予算管理が簡単</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">✓</span>
                      <span>1回あたりの単価が割安</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">✓</span>
                      <span>継続しやすくモチベーション維持</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">✗</span>
                      <span>急な予定で行けない月も費用発生</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">✗</span>
                      <span>長期契約（3～12ヶ月）が条件のことも</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <h3 className="text-xl font-bold text-green-900 mb-4">回数制・都度払いプラン</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 font-bold mr-2">✓</span>
                      <span>行った分だけ支払い（自由度が高い）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 font-bold mr-2">✓</span>
                      <span>長期契約の縛りがないことが多い</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 font-bold mr-2">✓</span>
                      <span>気軽に始められる</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 font-bold mr-2">✗</span>
                      <span>1回あたりの単価が割高</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 font-bold mr-2">✗</span>
                      <span>継続率が低い傾向</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mt-6">
                毎週定期的に通える人は月額制がお得です。不定期な人や初心者は、回数制で様子を見ながら月額制への切り替えを検討するのがおすすめです。
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                追加費用と隠れた料金
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                基本料金以外に発生する可能性のある費用をご紹介します。契約前に必ず確認しましょう：
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">よくある追加費用</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>食事指導：月5,000円～20,000円</li>
                    <li>管理栄養士による個別カウンセリング：1回5,000円～10,000円</li>
                    <li>サプリメント販売（任意）：3,000円～10,000円/月</li>
                    <li>トレーナー変更手数料：0円～5,000円</li>
                    <li>休会・退会手数料：0円～10,000円</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">注意すべき料金体系</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✗ 「最初は安いが、3ヶ月目から大幅値上げ」という契約</li>
                    <li>✗ 「退会時に違約金が発生する」という長期契約</li>
                    <li>✗ 「食事指導が自動付帯で追加料金発生」という仕様</li>
                    <li>✗ ウェア・シューズ・タオルレンタルが高額</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                費用を抑えるための7つのコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムは高額ですが、賢く選ぶことで費用を大幅に抑えることができます：
              </p>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. 複数のジムで体験を受けてキャンペーン比較</h3>
                  <p className="text-gray-700 text-sm">3～5社の体験を受け、入会金キャンペーンや割引プランを比較しましょう。時期によって大幅なキャンペーンを実施しているジムもあります。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. 入会金無料キャンペーンを活用</h3>
                  <p className="text-gray-700 text-sm">多くのジムが定期的に入会金無料キャンペーンを実施しています。入会金は0～50,000円と差が大きいため、この時期を狙うだけで大きく節約できます。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. オフピーク時間帯割引を利用</h3>
                  <p className="text-gray-700 text-sm">早朝（6～8時）や深夜（22～24時）などのオフピーク時間帯は、通常価格より5～20%割安になるジムもあります。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. 長期プランの方が割安</h3>
                  <p className="text-gray-700 text-sm">3ヶ月・6ヶ月・12ヶ月の長期プランの方が、1回あたりの単価が安くなります。短期集中より長期継続の方が経済的です。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">5. 食事指導付きプランを初期段階から選ぶ</h3>
                  <p className="text-gray-700 text-sm">食事指導を後から追加すると、追加料金が発生します。最初から食事指導が含まれたプランを選ぶと、トータルコストが安くなります。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">6. 紹介割引を活用</h3>
                  <p className="text-gray-700 text-sm">知人からの紹介で入会すると、5～10%の割引が受けられるジムが多くあります。紹介者にも割引が適用されることもあります。</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">7. 短期集中コースより通常プランが割安</h3>
                  <p className="text-gray-700 text-sm">短期集中コース（2～3ヶ月）は、月額制より1回あたりの単価が高く設定されています。計画的に通常プランで継続する方が経済的です。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験レッスンを賢く活用する
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体験レッスンは、あなたにぴったりのジムを見つけるための絶好の機会です。効果的に活用しましょう：
              </p>
              <div className="space-y-4">
                <div className="border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体験レッスン選びのポイント</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 無料～3,000円程度の体験を複数受ける</li>
                    <li>✓ 最低3社～5社を比較する</li>
                    <li>✓ 同じ時間帯を選んで、混雑状況を比較</li>
                    <li>✓ トレーナーとの相性を重視する</li>
                  </ul>
                </div>
                <div className="border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体験時に確認すべき費用項目</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>□ 基本料金（月額・回数制）</li>
                    <li>□ 入会金（キャンペーン情報）</li>
                    <li>□ 食事指導の有無と料金</li>
                    <li>□ 契約期間と違約金</li>
                    <li>□ その他の追加費用</li>
                    <li>□ 返金保証の有無</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                契約前に確認すべき重要ポイント
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                後悔しないために、契約前に以下の項目を必ず確認しましょう：
              </p>
              <div className="space-y-3">
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">契約期間と退会・休会</h3>
                  <p className="text-gray-700 text-sm">「最短いつから退会できるか」「休会ができるか」「違約金はいくらか」を確認することが重要です。急な事情で通えなくなった場合に備えましょう。</p>
                </div>
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">返金保証</h3>
                  <p className="text-gray-700 text-sm">「結果が出なかった場合の返金保証」があるジムなら、安心して始められます。返金保証の有無と条件を必ず確認しましょう。</p>
                </div>
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーナー変更の可否</h3>
                  <p className="text-gray-700 text-sm">「相性が合わないトレーナーを変更できるか」「変更手数料がかかるか」を確認しておくと、安心です。</p>
                </div>
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">更新・自動継続の仕組み</h3>
                  <p className="text-gray-700 text-sm">「契約期間終了後、自動更新されるのか」「更新時に料金が上がるのか」を確認し、後でトラブルにならないようにしましょう。</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの費用対効果を判断するポイント
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                「高い」と感じるパーソナルジムですが、実は高い費用対効果があります：
              </p>
              <div className="space-y-4">
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3～6ヶ月で結果が出れば費用対効果が高い</h3>
                  <p className="text-gray-700 text-sm">3ヶ月で月10万円のジムに通った場合、総費用は30万円。これで理想の体が手に入り、その後の人生が変わるなら、決して高くない投資です。</p>
                </div>
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">一度身につけた知識は一生の財産</h3>
                  <p className="text-gray-700 text-sm">パーソナルジムで学んだトレーニング法や栄養知識は、退会後も活用できます。この長期的な価値を考えると、費用は決して無駄ではありません。</p>
                </div>
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">継続できない人ほど安く利用すべき</h3>
                  <p className="text-gray-700 text-sm">「継続できるか不安」という人は、回数制やオフピーク割引を活用して、低コストで始めるのがおすすめです。</p>
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
          <section className="bg-purple-50 border border-purple-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              料金に納得できるパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。料金相場、キャンペーン情報、実際の利用者の口コミを参考に、あなたに合ったジムが見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-purple-700 text-white font-bold rounded-full px-8 py-3 hover:bg-purple-800 active:scale-[0.98] transition-all text-sm md:text-base"
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
                <h3 className="font-bold text-gray-900 hover:text-purple-700 transition-colors mb-2">
                  パーソナルジムの料金相場を解説｜月額・都度払いの違い
                </h3>
                <p className="text-sm text-gray-600">
                  パーソナルジムの料金体系を徹底解説します
                </p>
              </Link>
              <Link
                href="/column/gym-choosing/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-purple-700 transition-colors mb-2">
                  パーソナルジムの選び方完全ガイド｜後悔しないための7つのチェックポイント
                </h3>
                <p className="text-sm text-gray-600">
                  ジム選びで失敗しないためのポイントを解説します
                </p>
              </Link>
              <Link
                href="/column/gym-trial/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-purple-700 transition-colors mb-2">
                  パーソナルジムの無料体験・体験入会ガイド｜活用方法と注意点
                </h3>
                <p className="text-sm text-gray-600">
                  失敗しない体験活用法を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-beginner/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-purple-700 transition-colors mb-2">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600">
                  初めてパーソナルジムに通う方へのガイドです
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
