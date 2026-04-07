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
      question: "女性がパーソナルジムを選ぶ際に最も重要なポイントは？",
      answer: "女性にとって最も重要なポイントは、安心感と快適性です。女性専用か混合か、トレーナーの性別選択が可能か、プライバシー配慮（個室か半個室か）、シャワー施設の充実度などを確認することが大切です。体験レッスンで実際に施設を見学し、スタッフの対応も確認しましょう。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "女性専用と混合のパーソナルジムの違いは？",
      answer: "女性専用ジムは、女性のみが利用できるため、安心感とプライバシーが確保されます。一方、混合ジムは男性利用者も多いため、施設が充実していることが多く、費用が安い傾向があります。自分の優先順位によって選ぶことが重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "産後ダイエットを目指す場合、パーソナルジムはいつから始められますか？",
      answer: "出産後の運動開始時期は、自然分娩で6～8週間、帝王切開の場合は8～12週間程度経過後が目安です。ただし、医師の許可を得ることが重要です。多くのパーソナルジムは産後の体に配慮したプログラムを用意しており、子連れ対応や託児サービスがあるジムもあります。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "女性トレーナーを指定できるパーソナルジムは多いですか？",
      answer: "ほとんどのパーソナルジムでは、トレーナーの性別選択が可能です。特に体験レッスンの際に確認しておくことをおすすめします。なお、人気の女性トレーナーは予約が取りにくい場合もあるので、スケジュール確認も重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "女性向けパーソナルジムの料金相場は？",
      answer: "女性向けパーソナルジムの料金は、月額30,000～150,000円程度が相場です。女性専用か混合か、施設の充実度、トレーナーの経歴などによって変わります。多くのジムが複数のプランを用意しているので、予算に合わせて選べます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "子どもを預けながらトレーニングを受けられるパーソナルジムはありますか？",
      answer: "はい。キッズルームやベビーシッターサービスを提供しているパーソナルジムもあります。ただし、すべてのジムに完備されているわけではないので、事前に確認が必要です。託児サービスがある場合は、別途料金がかかることもあります。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function WomenGymPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "女性向けパーソナルジムの選び方" },
  ];

  const pageTitle = "女性向けパーソナルジムの選び方｜女性専用・混合の違いと注意点";
  const pageUrl = `${baseSiteUrl}/column/women-gym/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="女性がパーソナルジムを選ぶ際のポイント。女性専用vs混合、トレーナーの性別選択、プライバシー配慮、産後ダイエット、子連れ対応など、女性向けジム選びの完全ガイド。"
        path="/column/women-gym/"
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
              description: "女性がパーソナルジムを選ぶ際のポイント。女性専用vs混合、トレーナーの性別選択、プライバシー配慮、産後ダイエット、子連れ対応など、女性向けジム選びの完全ガイド。",
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
            <span className="text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full">
              女性向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              女性がパーソナルジムを選ぶ際には、安心感、快適性、プライバシーの配慮が重要です。このガイドでは、女性専用と混合ジムの違い、トレーナーの選び方、産後ダイエット対応、子連れ対応など、女性が知っておくべきジム選びのポイントをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                女性向けパーソナルジムの選び方の基本
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                女性がパーソナルジムを選ぶ際には、男性とは異なる優先事項があります。以下のポイントを確認することが重要です：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-pink-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">安心感とセキュリティ</h3>
                    <p className="text-gray-600">女性専用か混合か、スタッフの対応、施設のセキュリティ体制（防犯カメラ、カードキーなど）を確認しましょう。一人で通うことが多い場合、特に重要です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">プライバシーの配慮</h3>
                    <p className="text-gray-600">個室か半個室か、他の利用者との関わり、更衣室の充実度などを確認します。できるだけ人目が気にならない環境が理想的です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">シャワー・アメニティの充実度</h3>
                    <p className="text-gray-600">女性はメイク落とし、ドライヤー、スキンケア用品など、アメニティの充実を望むことが多いです。施設を見学して確認しましょう。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">通いやすさと時間帯</h3>
                    <p className="text-gray-600">営業時間、駅からの距離、駐車場の有無など。女性一人で通うことを考えると、夜間の営業、昼間の時間帯、交通アクセスが重要です。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                女性専用vs混合パーソナルジムの比較
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                女性向けパーソナルジムには、女性専用と混合の2つのタイプがあります。それぞれのメリット・デメリットを理解して選びましょう：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">女性専用ジム</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">メリット</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ 安心感が高い</li>
                        <li>✓ プライバシー保護</li>
                        <li>✓ 女性向けサービス充実</li>
                        <li>✓ 他の利用者との関わりが少ない</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-pink-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">デメリット</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✗ 費用がやや高い傾向</li>
                        <li>✗ 店舗数が少ない</li>
                        <li>✗ 立地が限定的</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">混合ジム</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">メリット</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ 費用が比較的安い</li>
                        <li>✓ 店舗数が多い</li>
                        <li>✓ アクセスが良い</li>
                        <li>✓ 施設が充実している</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-blue-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">デメリット</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✗ 男性利用者がいる</li>
                        <li>✗ プライバシーが限定的</li>
                        <li>✗ 女性向け配慮が少ないことも</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed text-sm">
                どちらを選ぶかは、優先順位によって異なります。安心感を最優先するなら女性専用、費用と利便性を優先するなら混合がおすすめです。
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーナーの選び方
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                女性にとってトレーナーとの相性は、パーソナルジム選びの重要な要素です。以下のポイントを確認しましょう：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-pink-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーナーの性別選択</strong> — 女性トレーナーを希望する場合、その旨を事前に伝えられるか確認</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-pink-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーナーの資格・経歴</strong> — NESTA、NSCA、JATI等の認定資格保有者が目安</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-pink-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>女性顧客への指導経験</strong> — 産後、更年期など、女性特有の悩み理解があるか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-pink-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>コミュニケーション能力</strong> — わかりやすい説明、適切なモチベーション維持ができるか</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-pink-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>相性が合わない場合の対応</strong> — トレーナー変更が可能か事前に確認</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                産後ダイエット対応のパーソナルジム
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                出産後の体は大きく変わります。産後ダイエットに対応したパーソナルジムを選ぶことが重要です：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">開始時期</h3>
                  <p className="text-gray-700 text-sm">自然分娩で6～8週間、帝王切開で8～12週間程度経過後が目安。医師の許可を得てから開始してください。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">産後向けプログラムの特徴</h3>
                  <p className="text-gray-700 text-sm">骨盤底筋のケア、腹直筋離開の対応、授乳中の栄養管理など、産後特有のニーズに対応したプログラム</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">子連れ対応</h3>
                  <p className="text-gray-700 text-sm">キッズルーム、ベビーシッター、子連れOKなど、託児対応があると通いやすい</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">スケジュール</h3>
                  <p className="text-gray-700 text-sm">授乳のため柔軟なスケジュール対応、短時間コースなど、赤ちゃんのお世話と両立しやすいプログラム</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験レッスン時にチェックすべきポイント
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体験レッスンは、ジムの雰囲気、スタッフの対応、トレーナーとの相性を確認する貴重な機会です。以下をチェックしましょう：
              </p>
              <div className="space-y-3">
                <div className="border border-pink-200 bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">施設面</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ シャワー室の清潔度、アメニティの充実度</li>
                    <li>✓ 個室・半個室の広さと快適さ</li>
                    <li>✓ ロッカー、パウダールームの充実度</li>
                    <li>✓ トイレ、洗面所の清潔度</li>
                  </ul>
                </div>
                <div className="border border-pink-200 bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">スタッフ対応</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 親切で丁寧か、押し売りがないか</li>
                    <li>✓ 女性向けニーズの理解度</li>
                    <li>✓ 質問への丁寧な回答</li>
                    <li>✓ 不安や疑問への対応</li>
                  </ul>
                </div>
                <div className="border border-pink-200 bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング内容</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ トレーナーの指導方法、わかりやすさ</li>
                    <li>✓ 自分の体力・目標に合わせた内容か</li>
                    <li>✓ トレーナーとの相性、話しやすさ</li>
                    <li>✓ 安全性、怪我防止の配慮</li>
                  </ul>
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
          <section className="bg-pink-50 border border-pink-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              あなたにぴったりのパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。女性向けジム、女性専用施設、産後対応ジムなど、あなたのニーズに合ったジムが見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-pink-700 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-800 active:scale-[0.98] transition-all text-sm md:text-base"
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
                <h3 className="font-bold text-gray-900 hover:text-pink-700 transition-colors mb-2">
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
                <h3 className="font-bold text-gray-900 hover:text-pink-700 transition-colors mb-2">
                  パーソナルジムの選び方完全ガイド｜後悔しないための7つのチェックポイント
                </h3>
                <p className="text-sm text-gray-600">
                  ジム選びで失敗しないための7つのチェックポイントを解説します
                </p>
              </Link>
              <Link
                href="/column/diet-gym/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-pink-700 transition-colors mb-2">
                  ダイエットにパーソナルジムをおすすめする理由
                </h3>
                <p className="text-sm text-gray-600">
                  ダイエット成功率が高い理由を解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
