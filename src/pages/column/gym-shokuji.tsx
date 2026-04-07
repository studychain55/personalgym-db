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
      question: "パーソナルジムの食事指導は必ず必要ですか？",
      answer: "トレーニングだけでも効果は出ますが、食事指導があると結果が大きく異なります。特にダイエット目的の場合、成功率はトレーニング30%、食事70%とも言われています。筋力向上目的でも、栄養管理があると筋肉の成長が大幅に加速します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "食事指導の内容はどのような形式ですか？",
      answer: "ジムによって異なりますが、一般的には初回に栄養士が食事カウンセリングを行い、PFCバランスを設定します。その後は、日々の食事記録をアプリやメールで送信し、トレーナーや栄養士がフィードバックを提供する形式が多いです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "食事制限中、外食やコンビニで何を食べればいいですか？",
      answer: "外食では高タンパク低脂質のメニュー（焼き魚定食、鶏の唐揚げ避ける、豆腐料理など）を選びましょう。コンビニではサラダチキン、味付け卵、プロテインドリンク、玄米おにぎりなどがおすすめです。食事指導があると、具体的な選択肢をトレーナーから教わることができます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "食事記録アプリは何を使うべきですか？",
      answer: "一般的には『MyFitnessPal』『あすけん』『カロミル』などが使われています。ジムによっては独自アプリを提供しているところもあります。食事指導の効果は、正確な記録と定期的なフィードバックが鍵となるため、トレーナーが推奨するアプリを使うのが最適です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムの食事指導の料金は別途かかりますか？",
      answer: "ジムによって異なります。入会金・月額料金に含まれる場合と、オプション料金として月2,000～5,000円かかる場合があります。契約前に必ず確認し、食事指導込みのプランを選ぶことをおすすめします。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymShokujiPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの食事指導とは｜食事管理で結果を最大化する方法" },
  ];

  const pageTitle = "パーソナルジムの食事指導とは｜食事管理で結果を最大化する方法";
  const pageUrl = `${baseSiteUrl}/column/gym-shokuji/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの食事指導の内容と重要性を解説。カロリー管理・栄養バランス・食事記録の方法など、食事管理で筋トレ効果を最大化するポイントを紹介。"
        path="/column/gym-shokuji/"
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
              description: "パーソナルジムの食事指導で筋トレ効果を最大化する方法",
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
              食事管理・栄養
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの食事指導は、トレーニング効果を最大化するために不可欠な要素です。このガイドでは、食事指導の内容、カロリー計算とPFCバランスの基本、食事記録の方法、外食・コンビニ活用術、食事指導の有無による効果の違い、そして継続するためのコツを詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 食事指導の重要性 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムにおける食事指導の重要性
              </h2>
              <p className="text-gray-700 mb-6">
                トレーニングと食事は、パーソナルジムでの成果を左右する最も重要な2つの要素です。どちらが欠けても、目標達成は困難になります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    成功の秘訣：トレーニング30%、食事70%
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルジムでのダイエット成功の鍵は、適切な食事管理です。週2～3回のトレーニングだけでは、エネルギー消費量は限定的です。一方、毎日の食事を適正にコントロールすることで、確実に結果が出ます。ダイエット成功者の共通点は、食事管理を最優先していることです。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    筋力向上・ボディメイク目的の食事指導
                  </h4>
                  <p className="text-gray-700 text-sm">
                    筋肉を効率よく成長させるには、良質なタンパク質の摂取が不可欠です。単にタンパク質を多く摂るだけでなく、カロリー収支、タイミング、栄養バランスが重要です。パーソナルジムの食事指導により、筋肉成長を促進するための食事戦略が明確になります。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    食事改善による代謝向上
                  </h4>
                  <p className="text-gray-700 text-sm">
                    適切な食事管理は、単に体重減少だけでなく、基礎代謝の向上につながります。栄養バランスの良い食事を継続することで、体の基礎代謝が高まり、その後のリバウンド防止にも効果的です。パーソナルジムの食事指導は、リバウンドしにくい体作りをサポートします。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    食事指導により体調・体力も向上
                  </h4>
                  <p className="text-gray-700 text-sm">
                    食事改善により、疲労感の軽減、睡眠の質向上、肌荒れ改善、体力向上が同時に起こります。これらの変化により、トレーニング自体のパフォーマンスも向上し、良い循環が生まれます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 食事指導の内容 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事指導の主な内容
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムの食事指導は、ジムや目的によって内容が異なりますが、以下が主な指導内容です。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. カロリー計算と基礎代謝設定
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    初回カウンセリングで、身長・体重・運動量から、あなたの基礎代謝（Basal Metabolic Rate: BMR）と1日の消費カロリー（Total Daily Energy Expenditure: TDEE）を計算します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">例：体重60kg、身長160cm、事務仕事の場合</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ 基礎代謝：約1,400kcal/日</li>
                      <li>・ 1日消費カロリー：約2,000kcal/日（運動量考慮）</li>
                      <li>・ ダイエット目標：1,500kcal/日（500kcal制限）</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. PFCバランス（タンパク質・脂質・炭水化物）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    カロリーだけでなく、三大栄養素（タンパク質・脂質・炭水化物）のバランスが重要です。目的別にバランスを調整します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">目的別PFCバランス例：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ ダイエット：タンパク質40%、脂質20%、炭水化物40%</li>
                      <li>・ 筋力向上：タンパク質35%、脂質25%、炭水化物40%</li>
                      <li>・ 健康維持：タンパク質20%、脂質30%、炭水化物50%</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 栄養素の種類と質
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    単にカロリー計算だけでなく、栄養素の質が重視されます。例えば、同じ100kcalでも、白米と玄米では栄養価が異なります。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 良質なタンパク質：鶏胸肉、白身魚、卵、豆類</li>
                    <li>・ 良質な炭水化物：玄米、全粒粉パン、芋類</li>
                    <li>・ 良質な脂質：オリーブオイル、ナッツ、アボカド</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. 食事タイミングと栄養補給
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング前後の食事タイミングが筋肉成長に影響します。適切なタイミングで栄養補給することで、トレーニング効果が大幅に向上します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">トレーニング前後の栄養補給：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ トレーニング2～3時間前：バランスの良い食事</li>
                      <li>・ トレーニング直前：軽い炭水化物</li>
                      <li>・ トレーニング直後30分以内：タンパク質と炭水化物</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: 食事記録とアプリ活用 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事記録の方法とアプリ活用
              </h2>
              <p className="text-gray-700 mb-6">
                食事指導の効果を最大化するには、正確な食事記録が不可欠です。多くのパーソナルジムではアプリを活用した記録をおすすめしています。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 食事記録アプリの選び方
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    主流のアプリ：「MyFitnessPal」「あすけん」「カロミル」「カロナビ」など
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">良いアプリの条件：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ 日本の食品データベースが充実している</li>
                      <li>・ カロリーだけでなくPFCの内訳が見やすい</li>
                      <li>・ バーコードスキャンで簡単に食品を追加できる</li>
                      <li>・ トレーナーと記録を共有できる機能がある</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 日々の食事記録のポイント
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    正確な記録が食事指導の質を大きく左右します。以下のポイントを守りましょう。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 毎日同じ時刻に記録（習慣化するため）</li>
                    <li>・ 食べたものを全て記録（間食、飲み物も含む）</li>
                    <li>・ 分量を正確に計測する（最初はスケールで計測推奨）</li>
                    <li>・ 外食の場合は、実測値に近い数値を入力</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. トレーナーからのフィードバック
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    多くのジムでは、1～2週間ごとに記録内容をチェックし、フィードバックを提供します。このサイクルにより、食事習慣の改善が加速します。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 外食・コンビニ活用術 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事制限中の外食・コンビニ活用術
              </h2>
              <p className="text-gray-700 mb-6">
                食事指導中でも、完全に外食を避けることは難しいものです。上手に外食・コンビニを活用することが、継続のコツです。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 外食時の選択ポイント
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    外食時は、以下のポイントを意識して選択しましょう。
                  </p>
                  <div className="bg-gray-50 p-3 rounded space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">おすすめの店：</p>
                      <ul className="ml-4 space-y-1 text-gray-700">
                        <li>・ 定食屋：カロリー計算がしやすい</li>
                        <li>・ 和食レストラン：塩分控えめで栄養バランスが良い</li>
                        <li>・ 焼き鳥屋：タンパク質が豊富で脂肪を選べる</li>
                        <li>・ 魚介系：DHA・EPAが豊富で健康的</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">避けるべき食事：</p>
                      <ul className="ml-4 space-y-1 text-gray-700">
                        <li>・ 揚げ物が多いメニュー（唐揚げ丼、カツ丼など）</li>
                        <li>・ こってりした食事（ラーメン、カレー、パスタなど）</li>
                        <li>・ ファストフード（栄養バランスが悪い）</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. コンビニ活用術
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    コンビニ食は、栄養表示がされているため、カロリー計算が簡単です。上手に活用すれば、食事管理を継続しやすくなります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded space-y-2 text-sm">
                    <p className="font-semibold text-gray-900">おすすめ食品：</p>
                    <ul className="ml-4 space-y-1 text-gray-700">
                      <li>・ サラダチキン（タンパク質が豊富）</li>
                      <li>・ 味付き卵（栄養バランスが良い）</li>
                      <li>・ 豆腐製品（低カロリーでタンパク質が豊富）</li>
                      <li>・ サラダ（野菜で栄養補充）</li>
                      <li>・ 玄米おにぎり（良質な炭水化物）</li>
                      <li>・ プロテインドリンク（栄養補給が効率的）</li>
                      <li>・ チーズ（脂質と栄養が豊富）</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 飲み物の選択
                  </h4>
                  <p className="text-gray-700 text-sm">
                    飲み物にもカロリーがあります。砂糖入りの飲料は避け、水・お茶・コーヒー（ブラック）・無調整豆乳などを選びましょう。アルコールも避けることが理想的です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 食事指導ありとなしの違い */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事指導ありとなしのジムの違い
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムの中には、食事指導が充実しているジムと、トレーニング中心のジムがあります。この違いが成果に大きく影響します。
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="text-left p-3 font-bold">項目</th>
                      <th className="text-left p-3 font-bold text-green-700">食事指導あり</th>
                      <th className="text-left p-3 font-bold text-red-700">食事指導なし</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">料金</td>
                      <td className="p-3">月8～12万円程度</td>
                      <td className="p-3">月6～10万円程度</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">ダイエット効果</td>
                      <td className="p-3 text-green-700">3ヶ月で-5～10kg</td>
                      <td className="p-3 text-red-700">3ヶ月で-2～4kg</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">筋力向上</td>
                      <td className="p-3 text-green-700">高速（2ヶ月で変化）</td>
                      <td className="p-3 text-red-700">低速（4ヶ月で変化）</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">リバウンドリスク</td>
                      <td className="p-3 text-green-700">低い（食習慣改善）</td>
                      <td className="p-3 text-red-700">高い（知識不足）</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 font-semibold">継続率</td>
                      <td className="p-3 text-green-700">高い（70～80%）</td>
                      <td className="p-3 text-red-700">低い（40～50%）</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">初心者向け</td>
                      <td className="p-3 text-green-700">非常に向いている</td>
                      <td className="p-3 text-red-700">基礎知識が必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mt-6">
                料金差は月2～3万円程度ですが、成果の差は大きいです。コスト面では割高に感じるかもしれませんが、短期間で結果が出る分、費用対効果は高いと言えます。
              </p>
            </section>

            {/* Section 6: 食事管理を継続するコツ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事管理を継続するコツ
              </h2>
              <p className="text-gray-700 mb-6">
                食事指導を受けても、継続できなければ効果は出ません。以下は、食事管理を長く続けるためのコツです。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 完璧を目指さない
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    食事管理は継続が最優先です。100点を目指して挫折するより、80点を継続することが成功の秘訣です。週に1～2回は好物を食べてもOKという柔軟な考え方を持ちましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 食材のストック管理
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    冷蔵庫に常備すべき食材を決めておくと、調理の手間が減ります。サラダチキン、卵、豆腐、鶏むね肉など、タンパク質源をいつも用意しておくと、食事管理が楽になります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 調理の効率化（ミールプレップ）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    週末に1時間程度で1週間分の食事を準備するミールプレップは、非常に効果的です。あらかじめ分量を計測して調理しておくことで、毎日の記録が簡単になり、継続しやすくなります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. トレーナーとのコミュニケーション
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    困ったこと、分からないことがあれば、すぐにトレーナーに相談しましょう。食事指導のサポートが手厚いジムなら、個別アドバイスをしてくれます。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 成果の記録と可視化
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    毎週の体重・体脂肪率・見た目の変化を記録して、目に見える成果を実感しましょう。成果が見えると、食事管理を続けるモチベーションが大幅に上がります。
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
                  href="/column/gym-nutrition/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの食事管理｜トレーニングと食事の組み合わせ
                  </h3>
                  <p className="text-sm text-gray-600">
                    トレーニング効果を最大化する食事戦略を解説。
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
                    食事指導の方法、継続のコツをまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/gym-bodymake/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムで体が変わるまでの期間
                  </h3>
                  <p className="text-sm text-gray-600">
                    目標別のタイムラインを解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-beginner/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジム初心者ガイド
                  </h3>
                  <p className="text-sm text-gray-600">
                    初めての方へ必要な準備を紹介。
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                食事指導が充実したパーソナルジムを見つけましょう
              </h2>
              <p className="mb-6 max-w-2xl mx-auto text-gray-700">
                食事指導付きのパーソナルジムなら、効率的に目標達成できます。全国のジムから自分に合ったジムが見つかります。
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
