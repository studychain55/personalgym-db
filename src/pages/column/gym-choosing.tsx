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
      question: "自分に合ったパーソナルジムの選び方は？",
      answer: "目的（ダイエット・筋力アップ・競技力向上など）に合わせて選ぶことが重要です。次に、トレーナーの資格と経験を確認し、実際に体験レッスンを受けて相性を確認しましょう。立地や時間帯の利便性も継続のために大切です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "パーソナルジムのトレーナーの質を見極めるポイントは？",
      answer: "以下の点を確認しましょう：①NESTA、JATI、NSCAなどの認定資格を持っているか、②実務経験が3年以上あるか、③カウンセリングで丁寧に話を聞いてくれるか、④科学的根拠に基づいたプログラムを提案しているか。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体験レッスンで何を確認すべきですか？",
      answer: "①施設の清潔さと設備の充実度、②トレーナーの教え方と相性、③ウェアやシューズのレンタル有無、④食事指導の内容、⑤契約内容と追加費用、⑥キャンセルポリシー。少なくとも2～3社の体験を受けて比較することをおすすめします。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "継続できるパーソナルジムを選ぶコツは？",
      answer: "立地条件が最重要です。家や職場から近いジムなら継続しやすいです。次に、営業時間が自分の生活スケジュールに合っているか確認しましょう。また、料金とサービスのバランスが取れているかも重要な判断基準です。",
      sort_order: 4,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymChoosingPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの選び方完全ガイド" },
  ];

  const pageTitle = "パーソナルジムの選び方完全ガイド｜後悔しないための7つのチェックポイント";
  const pageUrl = `${baseSiteUrl}/column/gym-choosing/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジム選びで失敗しないための7つのチェックポイントを解説。目的別の選び方、トレーナーの質を見極める方法、立地・通いやすさ、体験レッスンの活用法をまとめました。"
        path="/column/gym-choosing/"
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
              description: "パーソナルジム選びで失敗しないための7つのチェックポイント。目的別の選び方、トレーナーの質を見極める方法、立地・通いやすさ、体験レッスンの活用法を解説します。",
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
              ジム選びのコツ
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの選択は、ダイエットやトレーニング成功の重要な決定です。このガイドでは、失敗しないためのジム選びの7つのチェックポイント、目的別の選び方、トレーナーの質を見極める方法、体験レッスンの活用法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 目的別選び方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目的別パーソナルジムの選び方
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムの選択は、まずあなたの目的を明確にすることから始まります。目的に合ったジムを選ぶことで、より効果的で継続しやすいトレーニングができます。
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    1. ダイエット目的の場合
                  </h3>
                  <p className="text-gray-700 mb-3">
                    食事指導が充実しているジムを選ぶことが重要です。以下のポイントを確認してください：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 栄養学の知識を持つトレーナーがいるか</li>
                    <li>・ LINEなどでの食事相談が含まれているか</li>
                    <li>・ 月のどのくらいの回数、食事指導があるか</li>
                    <li>・ 実際のダイエット成功事例（ビフォーアフター）がある</li>
                    <li>・ 返金保証制度があるか</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    2. 筋力アップ・ボディメイク目的の場合
                  </h3>
                  <p className="text-gray-700 mb-3">
                    高度なトレーニング知識を持つトレーナーを選ぶことが重要です。以下をチェックしてください：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ NESTA、JATI、NSCAなどの認定資格を持っているか</li>
                    <li>・ ウェイトトレーニングの専門知識があるか</li>
                    <li>・ 目的に応じたプログラムをカスタマイズできるか</li>
                    <li>・ 最新のトレーニング理論を理解しているか</li>
                    <li>・ 筋肉量の測定（体成分分析）ができるか</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    3. スポーツパフォーマンス向上の場合
                  </h3>
                  <p className="text-gray-700 mb-3">
                    競技経験や専門知識を持つトレーナーを探すことが大切です。確認すべき点：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 該当スポーツの競技経験やコーチ経験があるか</li>
                    <li>・ アスリート向けのトレーニングプログラムがあるか</li>
                    <li>・ 怪我予防の知識があるか</li>
                    <li>・ 競技力向上の実績（指導した選手の成績など）</li>
                    <li>・ 栄養管理の知識があるか</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    4. 健康維持・リハビリ目的の場合
                  </h3>
                  <p className="text-gray-700 mb-3">
                    医学的知識と丁寧な指導ができるトレーナーを選ぶことが重要です：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 理学療法士や柔道整復師などの資格を持っているか</li>
                    <li>・ 既往歴や怪我への対応経験があるか</li>
                    <li>・ 医師と連携して指導できるか</li>
                    <li>・ 無理のないペースでのプログラムを提案できるか</li>
                    <li>・ 定期的にカウンセリングを行うか</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: トレーナーの質を見極める */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーナーの質を見極める方法
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムの成功を左右するのは、トレーナーの質です。以下のポイントでトレーナーの質を評価してください。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    1. 資格・認定を確認する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    以下のような国際的に認定された資格を持っているトレーナーが信頼できます：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ NESTA（全米エクササイズ&スポーツトレーナー協会）</li>
                    <li>・ JATI（日本トレーニング指導者協会）</li>
                    <li>・ NSCA（全米ストレングス&コンディショニング協会）</li>
                    <li>・ ACE（アメリカンカウンシル・オン・エクササイズ）</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    2. 実務経験を聞く
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーナーの実務経験は重要な指標です。以下を確認しましょう：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ パーソナルトレーニング経験は何年か（3年以上が目安）</li>
                    <li>・ 指導した人数は何人か</li>
                    <li>・ 自分の目的に関する指導経験があるか</li>
                    <li>・ 既往歴のある人の指導経験があるか</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    3. カウンセリング時の対応で判断する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    初回カウンセリングで、以下の点をチェックしてください：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ あなたの話を丁寧に聞いてくれるか</li>
                    <li>・ 目標を明確に設定しようとするか</li>
                    <li>・ 無理なプログラムを提案していないか</li>
                    <li>・ 専門用語を分かりやすく説明してくれるか</li>
                    <li>・ 質問に丁寧に答えてくれるか</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    4. 科学的根拠に基づいているか確認する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    良いトレーナーは、推奨するプログラムの根拠を説明できます。例えば：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 「このプログラムは科学的に証明されている」と説明できるか</li>
                    <li>・ 最新の研究や論文を参考にしているか</li>
                    <li>・ 根拠のない方法を推奨していないか</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 立地・通いやすさ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                立地・通いやすさの重要性
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムでの継続率は立地に大きく左右されます。以下のポイントを確認してください。
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    1. 通勤・通学ルートの確認
                  </h4>
                  <p className="text-gray-700 text-sm">
                    職場や学校の近くのジムを選ぶと、仕事や学校帰りに通いやすく、継続率が上がります。寄り道の手間が少ないほど、習慣化しやすいです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    2. 営業時間の確認
                  </h4>
                  <p className="text-gray-700 text-sm">
                    朝活したい人は早朝営業しているか、夜遅くに通いたい人は営業時間が長いか確認しましょう。自分のライフスタイルに合った営業時間であることが継続の鍵です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    3. 駅からのアクセス
                  </h4>
                  <p className="text-gray-700 text-sm">
                    駅から5分以内のジムが目安です。雨の日でも通いやすい距離を心がけましょう。駅前のジムは利便性が高く、継続しやすい傾向があります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    4. 駐車場・駐輪場
                  </h4>
                  <p className="text-gray-700 text-sm">
                    車や自転車で通う場合、駐車場・駐輪場があるか、有料か無料か確認しましょう。通勤方法に合わせて選択することが大切です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 体験レッスンの活用法 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験レッスンの活用法
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジム選びで最も重要なのが体験レッスンです。以下を参考に、効果的に体験レッスンを活用してください。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験レッスン前に確認すること
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                      <div>
                        <h4 className="font-bold text-gray-900">体験レッスンの料金</h4>
                        <p className="text-gray-600 text-sm mt-1">無料なのか有料なのか、有料の場合はいくらなのか確認しましょう。無料体験が一般的です。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                      <div>
                        <h4 className="font-bold text-gray-900">体験レッスンの時間</h4>
                        <p className="text-gray-600 text-sm mt-1">通常は30～60分程度です。カウンセリング時間を含めて確認しましょう。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                      <div>
                        <h4 className="font-bold text-gray-900">持ち物の確認</h4>
                        <p className="text-gray-600 text-sm mt-1">ウェアやシューズ、タオルが必要か、レンタルがあるか確認してください。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験レッスン中に確認すること
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">施設環境</h4>
                      <p className="text-gray-700 text-sm">清潔さ、設備の充実度、混雑度などを確認してください。トイレやシャワー、ロッカーもチェック。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">トレーナーとの相性</h4>
                      <p className="text-gray-700 text-sm">トレーナーの説明が分かりやすいか、フォームの修正が丁寧か、相性が良さそうか感じ取ってください。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">プログラム内容</h4>
                      <p className="text-gray-700 text-sm">あなたの目標に合ったプログラムが提案されているか、難易度は適切か確認しましょう。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">その他スタッフの対応</h4>
                      <p className="text-gray-700 text-sm">受付スタッフの対応は親切か、全体的な雰囲気は良いか感じ取ってください。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験後に確認すること
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <p className="text-gray-700">月額料金と入会金、追加料金の詳細</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <p className="text-gray-700">契約期間と解約方法、違約金の有無</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <p className="text-gray-700">キャンセルポリシー（予約のキャンセル料金など）</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <p className="text-gray-700">返金保証制度の有無と内容</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <p className="text-gray-700">複数のジムと比較して決定する</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: FAQ */}
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
                  href="/column/gym-cost/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの料金相場を解説
                  </h3>
                  <p className="text-sm text-gray-600">
                    パーソナルジムの料金体系を徹底解説。都度払い、月額制、回数券の違いをまとめました。
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
                    初めての方へ。始める前に必要な準備、確認すべきポイントをまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/diet-gym/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    ダイエットにパーソナルジムをおすすめする理由
                  </h3>
                  <p className="text-sm text-gray-600">
                    ダイエット成功率が高い理由、フィットネスジムとの違いを解説します。
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
