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
      question: "オンラインパーソナルジムとは何ですか？",
      answer: "オンラインパーソナルジムは、ビデオ通話を通じてトレーナーがマンツーマンでトレーニング指導を行うサービスです。自宅やジムで、リアルタイムでトレーナーの指導を受けられます。スマートフォンやパソコンがあれば、いつでもどこでも利用できます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "オンラインパーソナルジムは効果ありますか？",
      answer: "効果はあります。ただしフォーム指導の精度が通いのジムより劣ります。動きの細部まで見えないため、初心者は正しいフォームが習得しにくい傾向があります。一方、自宅で気軽に始められるメリットは大きく、継続しやすいとも言えます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "オンラインと通いのパーソナルジムの料金差はどのくらい？",
      answer: "一般的にオンラインの方が月3～5万円程度安いです。理由は、施設費用がかからないからです。オンライン月4～6万円、通い月8～12万円が目安です。料金を優先するならオンライン、効果を優先するなら通いを選ぶのが一般的です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "オンラインパーソナルジムに必要な機材は？",
      answer: "最低限、スマートフォンまたはパソコン、ネット環境があれば始められます。より良い指導を受けるには、トレーニングマット、ダンベル、レジスタンスバンドなどの機材があると効果的です。ジムによっては、機材セットをレンタル・販売している場合もあります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "オンラインパーソナルジムが向いている人、向かない人は？",
      answer: "向いている：継続力がある、ダイエット目的、食事管理を重視する、費用優先、自宅トレーニングを好む人。向かない：フォーム習得を優先したい、初心者、怪我がある、マンツーマンのサポートをしっかり受けたい人。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymOnlinePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "オンラインパーソナルジムのメリット・デメリット｜通いとの違いを比較" },
  ];

  const pageTitle = "オンラインパーソナルジムのメリット・デメリット｜通いとの違いを比較";
  const pageUrl = `${baseSiteUrl}/column/gym-online/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="オンラインパーソナルジムと通いのパーソナルジムを徹底比較。費用・効果・向いている人の違いを解説し、自分に合ったジムの選び方を紹介。"
        path="/column/gym-online/"
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
              description: "オンラインパーソナルジムと通いのパーソナルジムの違いを徹底比較",
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
              パーソナルジムの選択肢として、オンラインと通いの2つの形態があります。このガイドでは、オンラインパーソナルジムの仕組み、メリット・デメリット、通いのパーソナルジムとの比較、どちらが自分に向いているかの判断基準、そしてオンラインジム選びのポイントを詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: オンラインパーソナルジムとは */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オンラインパーソナルジムとは
              </h2>
              <p className="text-gray-700 mb-6">
                オンラインパーソナルジムは、ビデオ通話を使用して、トレーナーがリアルタイムで指導するサービスです。自宅、職場、ジムなど、どこでも受講できるのが特徴です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    サービスの形態
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Zoom、Google Meet、専用アプリなどを使用して、ビデオ通話で1対1のトレーニング指導を受けます。トレーナーがあなたの動きを見ながら、リアルタイムにアドバイスします。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    利用環境
                  </h4>
                  <p className="text-gray-700 text-sm">
                    スマートフォン、タブレット、パソコンがあれば利用可能です。安定したインターネット接続が必須です。自宅での利用が一般的ですが、ジムや公園でも利用できます。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    必要な機材
                  </h4>
                  <p className="text-gray-700 text-sm">
                    最低限は自分の体重を使ったトレーニングで対応可能です。より効果的な指導のために、ダンベル、バーベル、レジスタンスバンド、トレーニングマットなどがあると便利です。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    利用形式
                  </h4>
                  <p className="text-gray-700 text-sm">
                    多くのオンラインジムは月4～8回のプランを提供しており、1回30～60分のセッションが一般的です。スケジュールは予約制で、自由に時間帯を選べるジムが多いです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: オンラインのメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オンラインパーソナルジムのメリット
              </h2>
              <p className="text-gray-700 mb-6">
                オンラインパーソナルジムには、通いのジムにはない多くのメリットがあります。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 圧倒的に低い料金
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    通いのジムが月8～12万円に対し、オンラインは月4～6万円程度と、約40～50%安いです。理由は施設費用がかからないためです。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">料金比較：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ オンライン（月4回）：1回15,000～18,000円</li>
                      <li>・ 通い（月4回）：1回20,000～30,000円</li>
                      <li>・ 月間差額：約20,000～50,000円</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 通う手間がない（時間・交通費節約）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自宅からアクセスでき、移動時間がゼロです。これにより、仕事が忙しい人でも継続しやすくなります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">節約できるもの：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ 移動時間：毎回30分～1時間</li>
                      <li>・ 交通費：毎回500～2,000円</li>
                      <li>・ 駐車場代：毎回500～1,500円</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. スケジュール調整が簡単
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    多くのオンラインジムは、朝5時～夜11時など、幅広い時間帯を提供しており、自分のスケジュールに合わせやすいです。急な予定変更にも対応しやすいです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. プライバシーが守られる
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    他の利用者に見られることなく、自分のペースでトレーニングできます。これは、ジムに通う心理的ハードルが高い人にとって大きなメリットです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. トレーナー選択の自由度が高い
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    オンラインジムは全国から優秀なトレーナーを集めやすいため、相性が良いトレーナーを選べる可能性が高いです。トレーナー変更も簡単です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    6. 食事指導が充実している傾向
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    オンラインジムは食事記録アプリによる指導が充実している傾向があります。これにより、食事管理がしやすくなり、ダイエット効果が高まります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    7. 無料体験が豊富
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    オンラインジムは無料体験やお試し期間を提供しているところが多く、入会前に内容を確認しやすいです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: オンラインのデメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オンラインパーソナルジムのデメリット
              </h2>
              <p className="text-gray-700 mb-6">
                一方、オンラインジムにはいくつかの制限があります。これらを理解した上で選択することが重要です。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. フォーム指導の精度が落ちる
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    画面越しでは、細かいフォームの誤りを完全には把握できません。特に脊椎の位置や関節の角度などの細部は見逃しやすいです。
                  </p>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-sm text-gray-700">
                      初心者が自宅で独学するより、フォーム習得の観点からはオンラインの方が有利ですが、通いのジムには劣ります。
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 器材が限定される
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自宅にない器材でのトレーニングはできません。ダンベルなどを購入・レンタルする初期費用が必要です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. インターネット接続が必須
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    通信障害が起きると、トレーニングを受けられません。また、自宅のインターネット環境が悪いと、トレーナーがあなたの動きを正確に見られません。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. モチベーション維持が難しい
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    ジムという環境がないため、継続が難しい人もいます。また、自宅だからこそ、トレーニングを後回しにしてしまう傾向があります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 怪我のリスク管理が手薄
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    既存の怪我や痛みがある場合、オンラインでは対応が難しい場合があります。通いのジムなら、段階的にリハビリができますが、オンラインではその細かい調整が難しいです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    6. 機器の負荷設定の相談がしにくい
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自分で持っているダンベルの負荷しか使えないため、最適な負荷の選択が難しい場合があります。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 通いとの比較表 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                通いとオンラインの徹底比較
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="text-left p-3 font-bold">項目</th>
                      <th className="text-left p-3 font-bold text-purple-700">通いジム</th>
                      <th className="text-left p-3 font-bold text-blue-700">オンラインジム</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">月額費用</td>
                      <td className="p-3">8～12万円</td>
                      <td className="p-3">4～6万円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">1回あたり料金</td>
                      <td className="p-3">20,000～30,000円</td>
                      <td className="p-3">12,000～18,000円</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">移動時間</td>
                      <td className="p-3">30分～1時間</td>
                      <td className="p-3">0分</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">フォーム指導</td>
                      <td className="p-3 text-purple-700">非常に精度高い</td>
                      <td className="p-3">中程度</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">器材の充実度</td>
                      <td className="p-3 text-purple-700">豊富</td>
                      <td className="p-3">限定的</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">スケジュール調整</td>
                      <td className="p-3">限定的</td>
                      <td className="p-3 text-blue-700">非常に柔軟</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">プライバシー</td>
                      <td className="p-3">他者に見られる</td>
                      <td className="p-3 text-blue-700">完全プライベート</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">モチベーション</td>
                      <td className="p-3 text-purple-700">ジム環境で高い</td>
                      <td className="p-3">自主性が必要</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">継続率</td>
                      <td className="p-3">60～70%</td>
                      <td className="p-3">40～50%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">3ヶ月での効果</td>
                      <td className="p-3 text-purple-700">-5～10kg</td>
                      <td className="p-3">-3～7kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: どちらが向いているか */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オンラインと通いのジム、どちらが向いているか
              </h2>
              <p className="text-gray-700 mb-6">
                自分のライフスタイルや目的によって、最適な選択が異なります。以下を参考に判断してください。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg p-5 bg-green-50">
                  <h4 className="text-lg font-bold text-green-800 mb-4">
                    オンラインが向いている人
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>仕事が忙しく、通う時間がない</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>費用を重視する</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>ダイエット・食事管理が目的</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>自宅でのトレーニング継続力がある</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>既に基本的なフォームを知っている</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>地方に住んでいて、ジムが少ない</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>他者の目が気になる</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-purple-200 rounded-lg p-5 bg-purple-50">
                  <h4 className="text-lg font-bold text-purple-800 mb-4">
                    通いのジムが向いている人
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>正確なフォーム習得を優先したい</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>初心者で、トレーニング経験がない</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>筋力向上・ボディメイクが目的</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>怪我や持病がある</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>ジム環境でモチベーションが高まる</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>充実した器材を使いたい</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 font-bold mr-2">✓</span>
                      <span>継続が苦手で、環境づくりが必要</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: オンラインジム選びのポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オンラインパーソナルジム選びのポイント
              </h2>
              <p className="text-gray-700 mb-6">
                オンラインジムを選ぶ際には、以下のポイントに注意してください。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. トレーナーの資格と経験
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    NSCAやNESTAなどの認定資格を持つトレーナーを選びましょう。また、オンライン指導の経験年数も確認が必要です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 食事指導の内容
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    オンラインジムの強みは食事指導です。LINE等での日々の指導があるか、栄養士がいるかを確認しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 料金とプラン
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    初期費用、月額料金、1回あたりの料金、キャンセル料などを比較しましょう。安さだけで選ぶと、サービスが不十分な場合があります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. 無料体験の活用
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    多くのオンラインジムは無料体験を提供しています。実際に体験し、トレーナーとの相性、システムの使いやすさを確認しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 予約システムの柔軟性
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    キャンセルや予約変更の手続きが簡単か、24時間予約できるかなどを確認しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    6. 動画教材やコンテンツの充実
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    セッション以外に、自宅で使える動画教材があると、継続しやすくなります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    7. サポート体制
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    困ったことがあった時に、メールやLINEで相談できるサポート体制があるかを確認しましょう。
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                関連コラム
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/column/gym-choosing/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの選び方完全ガイド
                  </h3>
                  <p className="text-sm text-gray-600">
                    パーソナルジム選びで失敗しないためのポイントを解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-compare/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムを複数比較する方法
                  </h3>
                  <p className="text-sm text-gray-600">
                    複数のジムを比較するメリットと方法を紹介。
                  </p>
                </Link>
                <Link
                  href="/column/gym-cost/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの料金相場を解説
                  </h3>
                  <p className="text-sm text-gray-600">
                    料金体系と相場を徹底解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-diet/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムでダイエットを成功させる方法
                  </h3>
                  <p className="text-sm text-gray-600">
                    ダイエット成功のコツをまとめました。
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                自分に合ったパーソナルジムを見つけましょう
              </h2>
              <p className="mb-6 max-w-2xl mx-auto text-gray-700">
                オンラインと通いのジム、どちらも選択肢から全国のジムが見つかります。無料体験も活用して、最適なジムを選んでください。
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
          </div>
        </article>
      </div>
    </Layout>
  );
}
