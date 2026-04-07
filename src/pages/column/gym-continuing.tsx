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
      question: "パーソナルジムを続けるために最も大切なことは何ですか？",
      answer: "通いやすい立地と、適切な目標設定が最も大切です。まずは立地を優先してジムを選び、次に現実的で達成可能な目標を設定することで、継続率が大きく上がります。また、トレーナーとの信頼関係構築も重要です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "結果が出ない時期が続く場合、どうすればよいですか？",
      answer: "3～4週間で多少の変化が見られる人が多いですが、個人差が大きいです。結果が出ない時期は、トレーナーにプログラムの調整を依頼し、食事管理を徹底することが大切です。また、短期的な結果より長期的な継続を意識することで、やがて確実に成果が出ます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "仕事が忙しくなった時の対策は？",
      answer: "通う頻度を減らす、セッション時間を短くするなど、柔軟に対応できるジムを選ぶことが大切です。多くのジムは月の途中での変更が可能です。また、通いやすい立地のジムなら、短時間でも通いやすくなります。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "モチベーション維持にはどのような工夫が必要ですか？",
      answer: "SMART目標（具体的・測定可能・達成可能・現実的・期限付き）を設定すること、定期的に進捗を確認すること、小さな成功を積み重ねることが効果的です。また、トレーナーに進捗状況を共有してもらうことで、モチベーション維持につながります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムを辞めた後、リバウンドを防ぐことはできますか？",
      answer: "パーソナルジムで学んだ運動習慣と食事管理を継続することが重要です。卒業時にトレーナーから自宅でできるトレーニングメニューをもらい、それを実践することでリバウンド防止につながります。完全にやめるのではなく、月1～2回は通って維持管理することもおすすめです。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymContinuingPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムを続けるコツ" },
  ];

  const pageTitle = "パーソナルジムを続けるコツ｜モチベーション維持と挫折防止";
  const pageUrl = `${baseSiteUrl}/column/gym-continuing/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムを続けるコツを解説。挫折の原因、SMART目標の設定方法、トレーナーとの関係構築、モチベーション維持、通いやすい環境作りなど、継続のための実践的なポイントをまとめました。"
        path="/column/gym-continuing/"
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
              description: "パーソナルジムを続けるための実践的なコツとモチベーション維持方法",
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
              継続のコツ
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでの成功の鍵は「継続」です。このガイドでは、パーソナルジムを挫折する主な原因、SMART目標の設定方法、トレーナーとの関係構築、結果が出ない時期を乗り越える方法、通いやすい環境作りなど、長期間継続するための実践的なコツをご紹介します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 挫折の原因 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムを挫折する主な原因3つ
              </h2>
              <p className="text-gray-700 mb-6">
                多くの人がパーソナルジムを途中で辞めてしまいます。ここでは、その主な原因と対策をお伝えします。これらを事前に理解することで、挫折を防ぐことができます。
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    1. 通いやすくない立地を選んでしまう
                  </h3>
                  <p className="text-gray-700 mb-3">
                    多くの人は、料金やトレーナーで選びがちですが、実は「立地」が継続率を最大に左右します。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 対策：自宅や職場から5分以内のジムを優先して選ぶ</li>
                    <li>・ 対策：通勤・通学ルートにあるジムを選ぶ</li>
                    <li>・ 対策：駅前のジムなら雨の日も通いやすい</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    2. 無理な目標設定と短期的な成果への執着
                  </h3>
                  <p className="text-gray-700 mb-3">
                    「1ヶ月で10kg痩せたい」「2週間で体が変わる」といった非現実的な目標は、達成できずモチベーション低下につながります。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 対策：月1～2kgのペースで目標を設定する</li>
                    <li>・ 対策：最初の1ヶ月は「習慣化」を目標とする</li>
                    <li>・ 対策：体重より体脂肪率や見た目の変化を追う</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    3. トレーナーとの関係が上手くいかない
                  </h3>
                  <p className="text-gray-700 mb-3">
                    トレーナーとの相性が合わないと、継続が苦痛になります。多くのジムでは複数のトレーナーから選べます。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 対策：体験時に複数のトレーナーの指導を受ける</li>
                    <li>・ 対策：合わないと感じたら早めに別のトレーナーに変更する</li>
                    <li>・ 対策：コミュニケーションで相性を確認する</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: SMART目標 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標設定のコツ（SMART目標）
              </h2>
              <p className="text-gray-700 mb-6">
                継続するためには、達成可能で現実的な目標設定が最重要です。SMART目標というフレームワークを使うことで、モチベーション維持と着実な進捗につながります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    Specific（具体的）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    「体を変えたい」ではなく「体脂肪を30%から25%にする」と具体的に。
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    例：3ヶ月で体脂肪を5%減らす
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    Measurable（測定可能）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    体重、体脂肪率、見た目など、数値で測定できることが大切です。
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    例：月1回の体成分分析で進捗を確認する
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    Achievable（達成可能）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自分の現在地から見て、実現可能な目標を立てることが重要です。
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    例：1ヶ月2kg（月4回通う場合）よりも月1kgペース
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    Relevant（現実的）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自分のライフスタイルや経済状況に合致した目標が重要です。
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    例：仕事が忙しい時期なら「通う回数維持」を優先
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    Time-bound（期限付き）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    いつまでに達成するのか、期限を決めることで行動が明確になります。
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    例：6ヶ月で体脂肪を25%にする
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: トレーナーとの関係構築 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーナーとの関係構築の重要性
              </h2>
              <p className="text-gray-700 mb-6">
                トレーナーとの信頼関係が構築できれば、継続率は大幅に上がります。良好なトレーナー関係は、モチベーション維持とプログラムの効果を大きく高めます。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    信頼関係を築くためのポイント
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">1. 定期的なコミュニケーション</h4>
                      <p className="text-gray-700 text-sm">毎回のセッションで、体の変化や悩みを率直に伝えることで、トレーナーがより適切なプログラムを提案できます。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">2. 指導への積極的な参加</h4>
                      <p className="text-gray-700 text-sm">トレーナーの指導を素直に受け入れ、アドバイスを実行することで、信頼関係が深まります。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">3. フィードバックの提供</h4>
                      <p className="text-gray-700 text-sm">セッション内容が合っているか、プログラムの難易度は適切かなど、フィードバックを伝えることが大切です。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">4. 感謝の気持ち</h4>
                      <p className="text-gray-700 text-sm">努力を認めてくれるトレーナーへの感謝の気持ちは、良好な関係につながります。</p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    トレーナーを変えるべき場合
                  </h3>
                  <p className="text-gray-700 mb-3">
                    以下のような場合は、遠慮なくトレーナー変更を相談しましょう：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 説明が分かりにくい、または十分な説明がない</li>
                    <li>・ 無理なプログラムを強要される</li>
                    <li>・ フォーム修正がなく、ただ見守っているだけ</li>
                    <li>・ 目標や現在地を理解していない</li>
                    <li>・ 人間関係が成立していない</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: 結果が出ない時期を乗り越える */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                結果が出ない時期を乗り越える方法
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムでも「停滞期」は誰もが経験します。この時期をどう対応するかが、最終的な成功を左右します。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    停滞期が起きる理由
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-gray-400 pl-4 py-2">
                      <p className="text-gray-700">
                        体は環境適応能力が高く、同じプログラムを続けると適応して、変化が起きにくくなります。これを「停滞期」と呼びます。
                      </p>
                    </div>
                    <div className="border-l-4 border-gray-400 pl-4 py-2">
                      <p className="text-gray-700">
                        停滞期は「体が変化している証拠」です。逆に言えば、停滞期がない人は、プログラムが適切でない可能性があります。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-3">
                    停滞期の対処方法
                  </h4>
                  <ol className="space-y-3 text-gray-700 text-sm">
                    <li>
                      <span className="font-bold">1. トレーニングプログラムの変更</span>
                      <p className="text-gray-600 mt-1">種目、重量、セット数、インターバルなど、プログラムを大幅に変更することで、新しい刺激が加わります。</p>
                    </li>
                    <li>
                      <span className="font-bold">2. 食事管理の徹底</span>
                      <p className="text-gray-600 mt-1">プログラムは完璧でも、食事がおろそかだと進捗は止まります。トレーナーに食事管理をより厳しく指導してもらいましょう。</p>
                    </li>
                    <li>
                      <span className="font-bold">3. 短期的な成果より長期的な視点</span>
                      <p className="text-gray-600 mt-1">停滞期は通常1～4週間続きます。この時期は「体が変化を準備している」と考え、トレーニングを継続することが大切です。</p>
                    </li>
                    <li>
                      <span className="font-bold">4. 体重以外の数値を追う</span>
                      <p className="text-gray-600 mt-1">体重は変わらなくても、体脂肪率や見た目、扱える重量などで進捗を確認することで、モチベーション維持につながります。</p>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 5: 通いやすい環境作り */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                通いやすい環境作り
              </h2>
              <p className="text-gray-700 mb-6">
                継続の最も重要な要素は「通いやすさ」です。以下の環境整備で、自動的に継続できる仕組みを作りましょう。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">
                    1. 立地・距離の最適化
                  </h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><span className="font-semibold">選ぶべき立地：</span> 自宅から5分以内、または職場から5～10分以内</p>
                    <p><span className="font-semibold">理想的な立地：</span> 駅前、もしくは通勤・通学ルート沿い</p>
                    <p><span className="font-semibold">利便性を確認：</span> 駐車場、駐輪場の有無（移動手段による）</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">
                    2. 営業時間の確認
                  </h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><span className="font-semibold">朝活派：</span> 6時～7時開店しているジムを選ぶ</p>
                    <p><span className="font-semibold">仕事帰り派：</span> 夜間（22時～23時）営業しているジムを選ぶ</p>
                    <p><span className="font-semibold">休日派：</span> 土日祝日の営業時間を確認する</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">
                    3. 通う頻度の設定
                  </h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><span className="font-semibold">目標達成を最優先：</span> 週2～3回（月8～12回）を最初に契約</p>
                    <p><span className="font-semibold">継続を最優先：</span> 週1回（月4回）でも3～6ヶ月継続するより、月8回を2ヶ月で辞めるより効果的</p>
                    <p><span className="font-semibold">忙しい時期の対応：</span> ジムと事前に相談し、月の途中で回数を減らせるプランを選ぶ</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">
                    4. 習慣化への工夫
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 毎週決まった曜日・時間を設定する（例：月・水・金の18時）</li>
                    <li>・ カレンダーに記入するなど、視認性を高める</li>
                    <li>・ 友人と一緒に通うなど、社会的な約束にする</li>
                    <li>・ 通った後のご褒美を用意する（好きなものを食べるなど）</li>
                    <li>・ 初めの1ヶ月は「必ず行く」と決めて、習慣化させる</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">
                    5. 装備・心理的準備
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ ウェア・シューズを揃え、すぐに行動できる環境を作る</li>
                    <li>・ 前夜に準備物をバッグに詰めておく</li>
                    <li>・ 長期的な視点を持つ（1ヶ月単位ではなく3～6ヶ月単位で考える）</li>
                    <li>・ 完璧を目指さない（1回スキップしても翌週から再開する）</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: FAQ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                よくある質問
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <details key={index} className="border-b border-gray-200 pb-4">
                    <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-700">
                      {faq.question}
                    </summary>
                    <p className="text-gray-700 mt-3 ml-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Articles */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/column/gym-bodymake/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムで体が変わるまでの期間
                  </h3>
                  <p className="text-sm text-gray-600">
                    目標別タイムライン。いつまでに結果が出るかの現実的な目安をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/gym-choosing/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの選び方
                  </h3>
                  <p className="text-sm text-gray-600">
                    失敗しないジム選びの7つのチェックポイント。立地・トレーナー・設備について解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-trainer/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルトレーナーの選び方
                  </h3>
                  <p className="text-sm text-gray-600">
                    資格・経験・相性を確認する方法。良いトレーナーの見極め方をまとめました。
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12">
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
          </div>
        </article>
      </div>
    </Layout>
  );
}
