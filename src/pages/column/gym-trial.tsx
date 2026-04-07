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
      question: "パーソナルジムの無料体験は本当に無料ですか？",
      answer: "ほとんどのパーソナルジムの初回体験は完全無料です。ただし、一部のジムでは「初回カウンセリング無料、実際のトレーニングは有料」というケースもあります。事前にホームページで確認するか、電話で「完全無料か」「追加料金がないか」を確認しましょう。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "複数のジムの体験を受けることはできますか？",
      answer: "はい。複数のジムの体験を受けることは推奨されています。実際、多くの利用者が2～5社の体験を受けてから入会を決定しています。異なるジムを比較することで、自分に合ったジムを見つけやすくなります。ただし、1日に複数のジムの体験を受けるのは体が疲れるため、1～2日間隔を開けることをおすすめします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体験後に入会を強く勧められたり、断りにくい雰囲気はありませんか？",
      answer: "優良なパーソナルジムは、無理な勧誘をしません。ただし、営業がしつこいジムも存在します。体験時に強引な勧誘がないか、スタッフの対応を確認しましょう。不安な場合は、「検討したい」と伝えて、その場での入会を避けることをおすすめします。信頼できるジムなら、検討期間を設けることに理解を示すはずです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "体験トレーニング時に何を持って行けばいいですか？",
      answer: "運動着、スニーカー、タオル、飲み物があれば十分です。多くのジムではトレーニングウェアやシューズ、タオルなどが用意されている場合もあります。シャワーを利用する予定がある場合は、着替えやシャンプーを持参しましょう。不明な点は事前にジムに電話で確認すると良いです。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "体験後、入会しない場合は連絡が必要ですか？",
      answer: "丁寧に「入会しない」旨を伝えることが基本的なマナーです。メール、電話、LINEなど、ジムが提供する連絡手段で伝えましょう。連絡しないままでいると、営業電話がかかってくる可能性があります。丁寧に「検討の結果、別のジムに決めました」と伝えれば、大体のジムは理解してくれます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "体験で効果を感じなくても、入会後に効果が出ることもありますか？",
      answer: "はい。1回の体験では、ジムの設備やトレーナーの指導方法の違いに戸惑う利用者も多いです。ただし、3～6ヶ月継続してようやく体の変化を感じることが一般的です。体験時に「3～6ヶ月でどの程度の変化が期待できるか」をトレーナーに聞くことで、入会後の実感につながりやすくなります。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymTrialPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの無料体験・体験入会ガイド" },
  ];

  const pageTitle = "パーソナルジムの無料体験・体験入会ガイド｜活用方法と注意点";
  const pageUrl = `${baseSiteUrl}/column/gym-trial/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの無料体験・体験入会の完全ガイド。体験レッスンの活用法、複数社の比較方法、確認すべきポイント、体験後の入会判断まで、失敗しない体験活用法。"
        path="/column/gym-trial/"
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
              description: "パーソナルジムの無料体験・体験入会の完全ガイド。体験レッスンの活用法、複数社の比較方法、確認すべきポイント、体験後の入会判断まで、失敗しない体験活用法。",
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
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              体験・申込
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの無料体験・体験入会は、ジムを選ぶ上で最重要のステップです。このガイドでは、体験レッスンの活用法、複数社の比較方法、体験時の確認ポイント、体験後の入会判断まで、失敗しない体験活用法をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                無料体験・体験入会の基本
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの無料体験は、ジム選びにおいて非常に重要です。以下は、体験活用の基本知識です：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">無料体験は活用すべき</h3>
                    <p className="text-gray-600">パーソナルジムの選択は高額な投資です。必ず複数の無料体験を受けて、実際に施設、トレーナー、雰囲気を確認してから決定しましょう。多くの利用者が3～5社の体験を受けています。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">複数社の比較がおすすめ</h3>
                    <p className="text-gray-600">同じパーソナルジムでも、ジムによって設備、トレーナーの質、価格体系、雰囲気が大きく異なります。複数社を比較することで、自分に最適なジムが見えてきます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">完全無料か確認が必須</h3>
                    <p className="text-gray-600">ほとんどの体験は無料ですが、一部では「カウンセリング無料、トレーニングは有料」というケースもあります。事前に「完全無料か」を確認しましょう。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">体験後の判断に時間をかける</h3>
                    <p className="text-gray-600">体験直後の興奮で判断せず、1～2日検討してから入会決定することをおすすめします。複数社の体験後、比較検討することが重要です。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験レッスンの予約から当日までの流れ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                効果的な体験を受けるために、予約から当日までの流れを理解しましょう：
              </p>
              <div className="space-y-4">
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Step 1: 予約方法</h3>
                  <p className="text-gray-700 text-sm mb-2">ホームページ、電話、LINEなど、各ジムが予約方法を用意しています。予約時に「完全無料か」「所要時間」「必要な持ち物」を確認しましょう。</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Step 2: 当日の準備</h3>
                  <p className="text-gray-700 text-sm mb-2">運動着、スニーカー、タオル、飲み物を用意します。シャワーを利用する予定がある場合は、着替えやシャンプーを持参しましょう。</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Step 3: 初回カウンセリング（15～20分）</h3>
                  <p className="text-gray-700 text-sm mb-2">目標、健康状態、運動経験などをヒアリングします。この時点で「このトレーナーは信頼できるか」「説明はわかりやすいか」を確認しましょう。</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Step 4: 体験トレーニング（30～60分）</h3>
                  <p className="text-gray-700 text-sm mb-2">実際のトレーニングを体験します。施設の広さ、器具の充実度、他の利用者との距離感、トレーナーの指導方法を確認しましょう。</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Step 5: 説明・入会勧誘（15～30分）</h3>
                  <p className="text-gray-700 text-sm mb-2">料金プラン、契約内容、キャンペーンなどの説明があります。無理な勧誘がないか、スタッフの対応を注視しましょう。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                複数社の体験を受けるときのコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                複数のジムを比較するために、効率的に体験を受けるコツをご紹介します：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">体験スケジュール</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 1日1社（体に負担をかけない）</li>
                    <li>✓ または2～3日間隔を開ける</li>
                    <li>✓ 3～5社を目安に比較</li>
                    <li>✓ 1～2週間かけて体験</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">比較ポイント</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 施設の広さ・清潔度</li>
                    <li>✓ トレーナーとの相性</li>
                    <li>✓ 料金体系の明確さ</li>
                    <li>✓ スタッフの対応品質</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                メモを持参して、各ジムの施設、トレーナー、料金、雰囲気を記録しておくと、比較検討がしやすくなります。
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験時に確認すべき項目チェックリスト
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体験時に確認すべき項目を、チェックリスト形式でまとめました。以下をすべて確認してから入会を決定しましょう：
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">施設・環境</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>□ 施設全体が清潔に保たれているか</li>
                    <li>□ 個室・半個室の広さと快適さ</li>
                    <li>□ シャワー・ロッカー・トイレが充実しているか</li>
                    <li>□ パウダールーム・アメニティは充実しているか</li>
                    <li>□ 駐車場・駐輪場が完備されているか</li>
                    <li>□ 営業時間は自分の生活パターンに合っているか</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーナー関連</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>□ トレーナーの説明はわかりやすいか</li>
                    <li>□ 資格・経歴は充実しているか</li>
                    <li>□ トレーナーの指導方法は自分に合っているか</li>
                    <li>□ 不明点への質問に丁寧に答えてくれるか</li>
                    <li>□ 女性/男性トレーナーの指定が可能か</li>
                    <li>□ 相性が合わない場合、トレーナー変更が可能か</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">料金・契約</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>□ 入会金・初期費用は明確か</li>
                    <li>□ 月額費用の内訳は詳しく説明されたか</li>
                    <li>□ 追加料金（食事指導、サプリメントなど）は発生するか</li>
                    <li>□ キャンセル・休会ポリシーは明確か</li>
                    <li>□ 契約期間に縛りはないか（短期契約は可能か）</li>
                    <li>□ 退会時の手続き・費用は明確か</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">スタッフ対応・雰囲気</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>□ スタッフの対応は親切・丁寧か</li>
                    <li>□ 無理な勧誘がないか</li>
                    <li>□ 他の利用者の雰囲気は良いか</li>
                    <li>□ 通いたいと思えるジムの雰囲気か</li>
                    <li>□ 女性/男性利用者の比率は適切か</li>
                    <li>□ 営業時間帯の混雑具合は許容範囲か</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験後の判断と入会のタイミング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                複数社の体験後、入会を決定する際のポイントをご紹介します：
              </p>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">入会すべき判断基準</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 施設が清潔で、器具が充実している</li>
                    <li>✓ トレーナーとの相性が良い</li>
                    <li>✓ 価格が予算の範囲内</li>
                    <li>✓ スタッフ対応が誠実で信頼できる</li>
                    <li>✓ 継続的に通える距離・時間帯</li>
                    <li>✓ 複数社との比較で優位性がある</li>
                  </ul>
                </div>
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">入会を避けるべき判断基準</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✗ 施設が汚い、器具が古い</li>
                    <li>✗ スタッフの対応がしつこい、不誠実</li>
                    <li>✗ 料金体系が不明確、追加料金が多い</li>
                    <li>✗ 契約に長期縛りがある</li>
                    <li>✗ 体験時の説明が不足している</li>
                    <li>✗ 「今日入会しないと特典がなくなる」など、無理な勧誘</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                最初の判断で迷った場合は、「もう1～2社体験してから決めたい」と伝えることが大切です。信頼できるジムなら、検討期間を設けることに理解を示すはずです。
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験後、入会しない場合の対応
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                複数社の体験を受けた場合、入会しない場合の適切な対応をご紹介します：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">連絡は必須です</h3>
                  <p className="text-gray-700 text-sm">「入会しない」という旨を、メール、電話、LINEなどで丁寧に伝えましょう。連絡がないと、営業電話がかかってくる可能性があります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">丁寧な言い方の例</h3>
                  <p className="text-gray-700 text-sm">「体験ありがとうございました。検討の結果、別のジムに決めさせていただきました。ご対応いただきありがとうございました。」</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">連絡を避けるべきではない理由</h3>
                  <p className="text-gray-700 text-sm">連絡なしで放置すると、営業電話が何度もかかってくるため、その後のやり取りがより面倒になる可能性があります。</p>
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
          <section className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              あなたにぴったりのパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。無料体験実施ジムから、費用、口コミ、トレーナー情報まで、あなたに合ったジムが見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-green-700 text-white font-bold rounded-full px-8 py-3 hover:bg-green-800 active:scale-[0.98] transition-all text-sm md:text-base"
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
                <h3 className="font-bold text-gray-900 hover:text-green-700 transition-colors mb-2">
                  パーソナルジム初心者ガイド｜始め方・準備すること
                </h3>
                <p className="text-sm text-gray-600">
                  初めてパーソナルジムに通う方へ、準備と確認事項をまとめました
                </p>
              </Link>
              <Link
                href="/column/gym-choosing/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-green-700 transition-colors mb-2">
                  パーソナルジムの選び方完全ガイド｜後悔しないための7つのチェックポイント
                </h3>
                <p className="text-sm text-gray-600">
                  ジム選びで失敗しないための7つのチェックポイントを解説します
                </p>
              </Link>
              <Link
                href="/column/gym-cost/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-green-700 transition-colors mb-2">
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
