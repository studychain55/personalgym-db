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
      question: "パーソナルジムの口コミをどこで確認すればいいですか？",
      answer: "Google マップ、Twitter・Instagram などの SNS、公式サイトの口コミ欄が主な情報源です。複数のプラットフォームを確認することで、信頼性の高い情報を得られます。また、実際に体験入会を受けることが最も確実です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "サクラ・ステマレビューをどう見分けますか？",
      answer: "サクラ・ステマの特徴：①利用期間が短い、②具体的な内容がない、③褒める部分が曖昧、④悪い口コミが一切ない、⑤投稿者の他の評価と矛盾している。信頼できる口コミは、具体的な体験や数値、デメリットも記載されています。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "Google マップと SNS の口コミの違いは？",
      answer: "Google マップは属名が表示され、実名で投稿している傾向が強いため信頼性が高いです。一方、SNS は匿名で自由に投稿でき、より個人的な体験を知ることができます。両方確認することが重要です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "口コミで確認すべき 5 つのポイントは？",
      answer: "①トレーナーの質（経験・説明のわかりやすさ）、②食事指導の内容と厳しさ、③施設の清潔さと器具の充実度、④スタッフの対応・押し売りの有無、⑤実際の効果（体の変化の期間）。これらを複数の口コミから総合判断します。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "体験入会で何を確認すべきですか？",
      answer: "①トレーナーとの相性、②実際のカウンセリングの丁寧さ、③施設の雰囲気や清潔さ、④料金説明の明確さと勧誘の強さ、⑤実際のトレーニング内容が自分のレベルに合っているか。口コミの内容が実際と合致するか確認しましょう。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymKuchikomiPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの口コミ・評判の正しい見方" },
  ];

  const pageTitle = "パーソナルジムの口コミ・評判の正しい見方｜失敗しない選び方";
  const pageUrl = `${baseSiteUrl}/column/gym-kuchikomi/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムを選ぶ際の口コミ・評判の正しい活用方法を解説。信頼できる口コミの見分け方、サクラ・ステマの見抜き方、体験談で確認すべきポイントを紹介。"
        path="/column/gym-kuchikomi/"
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
              description: "パーソナルジムを選ぶ際の口コミ・評判の正しい活用方法を解説。信頼できる口コミの見分け方、サクラ・ステマの見抜き方、体験談で確認すべきポイントを紹介。",
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
              ジム選びの比較術
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムを選ぶ際、口コミ・評判は非常に重要な判断材料です。しかし、すべての口コミが信頼できるとは限りません。このガイドでは、口コミが重要な理由、信頼できる口コミの特徴、サクラ・ステマの見分け方、プラットフォーム別の違い、体験談で確認すべきポイント、そして口コミと合わせて実施すべき確認事項をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 口コミが重要な理由 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジム選びで口コミが重要な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムは費用が高く、継続的に通うサービスです。公式サイトだけでは実際の利用体験や効果を判断できないため、実際の利用者からの口コミが非常に重要になります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    トレーナーの質を判断できる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    資格の有無だけでなく、説明のわかりやすさ、励まし方、厳しさのバランスなど、実際の指導品質は体験を通じてしか判断できません。複数の口コミから、トレーナーの傾向を把握できます。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    実際の効果が見える
                  </h4>
                  <p className="text-gray-700 text-sm">
                    「3 ヶ月で 5kg 痩せた」「筋肉がついた」など、実際の体の変化の事例を知ることで、自分が通ったときの期待値を設定できます。公式サイトよりもリアルな情報です。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    施設や雰囲気をイメージできる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    清潔さ、器具の充実度、スタッフの対応、雰囲気など、実際に訪問する前に事前に把握できます。これによって、期待値とのギャップを減らせます。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    トラブルを事前に防げる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    強い勧誘、高額な追加料金、トレーナーの一方的な指導など、トラブルの事例を事前に知ることで、そうしたジムを避けることができます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 信頼できる口コミの特徴 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                信頼できる口コミの特徴を見分ける
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                口コミを評価する際、以下の特徴を持つ口コミは信頼度が高い傾向にあります：
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">具体的な数値や期間が記載されている</h3>
                    <p className="text-gray-600">「効果があった」ではなく「3 ヶ月で 8kg 痩せた」「ウエスト -8cm」など、具体的な変化が記載されている口コミは信頼性が高いです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">利用期間が長く、詳しい内容</h3>
                    <p className="text-gray-600">「3 ヶ月以上通った」など、一定期間の体験に基づいた口コミは、実際の経験に基づいた信頼できる評価です。短期間の利用では判断しがたい点も記載されています。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">メリットとデメリットの両方が記載</h3>
                    <p className="text-gray-600">「トレーナーは良いが、料金が高い」など、良い点と悪い点の両方を記載している口コミは、バランスの取れた評価です。万能なジムは存在しないため、デメリット記載は信頼性の証です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">体験前後での変化が具体的</h3>
                    <p className="text-gray-600">「最初は自信がなかったが、トレーナーのサポートで目標達成できた」など、感情や状態の変化が描かれている口コミは、実際の体験に基づいています。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">設備や食事指導などの具体的な言及</h3>
                    <p className="text-gray-600">「マシンが充実している」「栄養士の食事指導が丁寧」など、実際に体験した細部についての言及がある口コミは信頼度が高いです。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3: サクラ・ステマの見分け方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                サクラ・ステマレビューの見抜き方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                残念ながら、一部のジムではサクラレビュー（架空の利用者による高評価）やステマ（ステルスマーケティング）が存在します。以下のサインに注意しましょう：
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-red-900 mb-4">危険なサイン（高確率でサクラ・ステマ）</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>良い口コミばかり</strong> — 星 5 が 100%、悪い評価が 0 件は不自然です。実在するジムには必ずデメリットがあります。</span>
                  </li>
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>投稿日が集中</strong> — 同じ時期に多数の口コミが投稿されている場合、組織的に投稿された可能性があります。</span>
                  </li>
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>曖昧な内容</strong> — 「素晴らしい」「おすすめ」など、具体性が全くない口コミはサクラの可能性が高いです。</span>
                  </li>
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>投稿者のプロフィール情報がない</strong> — 匿名で他の投稿がなく、特定のジムにだけ投稿している場合は疑わしいです。</span>
                  </li>
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>文体が統一されている</strong> — 複数の口コミを読んで、同じ人が投稿しているような文体・表現が多い場合は注意が必要です。</span>
                  </li>
                  <li className="flex gap-3 text-red-900">
                    <span className="font-bold flex-shrink-0">✗</span>
                    <span><strong>短期間の効果を強調</strong> — 「1 週間で 5kg 痩せた」など、医学的に不可能な効果を謳う口コミは信頼できません。</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: プラットフォーム別の違い */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Google マップ・SNS・公式サイトの口コミの違い
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                口コミプラットフォームごとに、特徴と信頼度は異なります：
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Google マップ</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>信頼度</strong>：非常に高い（★★★★★）</p>
                    <p><strong>特徴</strong>：投稿者の名前が表示され、実名投稿が多いため信頼性が高い。ジムの位置情報、営業時間、電話番号と同じページに表示されるため、アクセスしやすい。</p>
                    <p><strong>注意点</strong>：古い情報も残るため、投稿日を確認が重要。</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Twitter・Instagram などの SNS</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>信頼度</strong>：中程度（★★★☆☆）</p>
                    <p><strong>特徴</strong>：利用者の顔写真やプロフィール情報が確認でき、投稿履歴から信頼性を判断できる。ビフォーアフター画像など、視覚的な証拠が多い。</p>
                    <p><strong>注意点</strong>：匿名アカウントが多く、アフィリエイト目的の投稿も存在。プロフィールが詳しい人からの投稿を優先しましょう。</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">公式サイトの口コミ欄</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>信頼度</strong>：低い（★★☆☆☆）</p>
                    <p><strong>特徴</strong>：ジムが管理しているため、掲載基準がある。ジムにとって都合の良い口コミ優先で掲載されることが多い。</p>
                    <p><strong>注意点</strong>：ネガティブな口コミは掲載されないことがほとんど。参考程度に留めるのが賢明です。</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">食べログ・Tabelog など統合口コミサイト</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>信頼度</strong>：高い（★★★★☆）</p>
                    <p><strong>特徴</strong>：複数の利用者からの評価が集約されており、平均点が算出される。サクラ検出システムが導入されているサイトが多い。</p>
                    <p><strong>注意点</strong>：一部、パーソナルジムに特化した統合サイトもあります。複数プラットフォームでの評価確認が重要です。</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>推奨される確認方法</strong>：Google マップ + SNS（フォロワーが多く、定期的に投稿している人）+ 公式サイト、の 3 つを組み合わせて確認することが最も信頼できます。
                </p>
              </div>
            </section>

            {/* Section 5: 体験談で確認すべき 5 つのポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験談で確認すべき 5 つのポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                複数の口コミ・体験談を見る際、以下の 5 つのポイントを軸に、総合的に判断することをおすすめします：
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">トレーナーの質と相性</h4>
                    <p className="text-gray-700 text-sm">
                      「説明がわかりやすい」「励ましてくれる」「初心者に丁寧」など。反対に「指導が厳しすぎる」「説明が不足」という口コミもチェック。自分のタイプと合致するか確認します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">食事指導の内容と厳しさ</h4>
                    <p className="text-gray-700 text-sm">
                      「食事指導がしっかりしている」「LINE で毎日管理」「ストレスなく続けられる」など。食事管理の方法とレベルは、ジムごとに大きく異なるため、自分の希望する厳しさを確認することが重要です。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">施設の清潔さと器具の充実度</h4>
                    <p className="text-gray-700 text-sm">
                      「トイレが綺麗」「シャワーが使える」「様々なマシンが揃っている」など、物理的な環境が口コミに多く反映されます。衛生管理とマシンのバリエーションは、継続に大きく影響します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">スタッフの対応と勧誘の有無</h4>
                    <p className="text-gray-700 text-sm">
                      「スタッフが親切」「強い勧誘がなかった」「入会後も丁寧な対応」など。逆に「無理な勧誘がある」「追加料金が多い」という口コミは要注意です。継続利用の満足度に直結します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-pink-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-700 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">実際の効果（体の変化の期間）</h4>
                    <p className="text-gray-700 text-sm">
                      「2 ヶ月で目に見える変化」「3 ヶ月で 10kg 減」「筋肉がついた」など。効果を実感した時期と内容を確認することで、自分の目標達成期間をシミュレーションできます。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: 口コミと合わせて体験入会で確認すること */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                口コミと合わせて体験入会で確認すること
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                口コミをリサーチした後は、複数のジムで体験入会を受けることが極めて重要です。口コミと実際の体験を照合することで、真実が見えてきます：
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">体験時のチェックリスト</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>トレーナーは口コミ通りか（説明、励まし方、厳しさ）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>施設は清潔か（トイレ、シャワー、マット、器具）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>スタッフの勧誘は強くないか（無理な契約圧力がないか）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>料金説明は明確か（隠れた追加料金がないか）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>カウンセリングは丁寧か（目標、食事、トレーニング期間の確認）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>他の利用者の雰囲気は（通いたいと思える環境か）</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>トレーニング内容は自分のレベルに合っているか</span>
                    </li>
                    <li className="flex gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>食事指導の厳しさは自分に合っているか</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>重要</strong>：口コミと体験の評価が大きく異なる場合は注意が必要です。例えば、「スタッフが親切」という高評価が多いのに、体験では営業的な対応を感じた場合、ジム側が意図的に良い評価を集めている可能性があります。複数のジムを体験することで、相対的に信頼できるジムが見えてきます。
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
                href="/column/gym-choosing/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの選び方完全ガイド｜後悔しないための 7 つのチェックポイント
                </h3>
                <p className="text-sm text-gray-600">
                  失敗しないジム選びのチェックポイントを解説
                </p>
              </Link>
              <Link
                href="/column/gym-compare/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムを複数比較する方法｜体験レッスンの活用術
                </h3>
                <p className="text-sm text-gray-600">
                  複数ジムの比較方法と体験活用法を紹介
                </p>
              </Link>
              <Link
                href="/column/gym-trial/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの無料体験・体験入会ガイド｜活用方法と注意点
                </h3>
                <p className="text-sm text-gray-600">
                  体験を最大限活用するコツを解説
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
