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
      question: "良いパーソナルトレーナーの条件は何ですか？",
      answer: "NESTA、JATI、NSCAなどの国際的な認定資格を持つこと、実務経験が3年以上あること、科学的根拠に基づいたプログラムを提案できることが重要です。また、クライアントの話をよく聞き、個人差に対応したカスタマイズができるトレーナーが良いトレーナーの条件です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "トレーナーの相性が悪い場合、変更できますか？",
      answer: "ほとんどのパーソナルジムではトレーナー変更に対応しています。初回カウンセリング時に相性が悪いと感じた場合は、遠慮なく変更を申し出ましょう。複数のトレーナーから選べるジムもありますので、体験時に確認することをおすすめします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーナーの資格を確認する方法は？",
      answer: "体験レッスンやカウンセリング時に直接聞くのが一番確実です。「どのような資格を持っていますか？」と質問してください。信頼できるトレーナーは資格や経歴について詳しく説明してくれます。ジムの公式サイトやパンフレットに記載されていることもあります。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "年齢や性別でトレーナーを指定できますか？",
      answer: "ほとんどのパーソナルジムでは、トレーナーの年齢や性別の希望に対応しています。女性トレーナーを希望する場合や、同年代のトレーナーを希望する場合は、入会前に相談しましょう。可能な限り対応してくれます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "初心者向けのトレーナーと上級者向けのトレーナーは異なりますか？",
      answer: "良いパーソナルトレーナーは、初心者から上級者まで、どのレベルのクライアントにも対応できるスキルを持っています。ただし、より高度な指導を求める場合は、その分野での専門性が高いトレーナーを選ぶことをおすすめします。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymTrainerPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーナーの選び方" },
  ];

  const pageTitle = "パーソナルトレーナーの選び方｜資格・経験・相性を確認する";
  const pageUrl = `${baseSiteUrl}/column/gym-trainer/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルトレーナーの選び方を完全解説。資格確認、経験年数、相性判定、カウンセリングのチェックポイント、トレーナー変更方法など、失敗しないトレーナー選びのコツをまとめました。"
        path="/column/gym-trainer/"
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
              description: "パーソナルトレーナーの選び方を完全解説。資格確認、経験年数、相性判定、カウンセリングのチェックポイントを解説します。",
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
              トレーナー選びのコツ
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルトレーニングの成功を左右するのは、トレーナーの質と相性です。このガイドでは、優秀なパーソナルトレーナーの見つけ方、資格確認のポイント、実務経験の評価方法、相性判定の方法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: トレーナー資格の確認 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                重要な資格・認定について
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルトレーナーの資格は、その知識と能力を証明する重要な指標です。以下の認定資格を持つトレーナーは、一定水準の知識と技術を備えていることが保証されています。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    NESTA（全米エクササイズ&スポーツトレーナー協会）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    最も知名度が高い国際的な認定資格です。フィットネスとスポーツトレーニングの幅広い知識が必要とされます。CPT（認定パーソナルトレーナー）資格が代表的です。
                  </p>
                  <p className="text-gray-600 text-sm">
                    取得難易度：中程度｜実務経験：不要
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    JATI（日本トレーニング指導者協会）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    日本の主要なトレーニング指導者認定資格です。トレーニング科学に基づいた教育体系が特徴です。ATI（認定トレーニング指導者）資格があります。
                  </p>
                  <p className="text-gray-600 text-sm">
                    取得難易度：高｜実務経験：2年以上必須
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    NSCA（全米ストレングス&コンディショニング協会）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    アスリート向けのストレングストレーニングに特化した資格です。CSCS（認定ストレングス&コンディショニング・スペシャリスト）はハイレベルな資格として高く評価されています。
                  </p>
                  <p className="text-gray-600 text-sm">
                    取得難易度：非常に高｜実務経験：1年以上必須
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    ACE（アメリカンカウンシル・オン・エクササイズ）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    フィットネス業界で広く認識されている国際資格です。一般向けフィットネスプログラムに強く、バランスの取れた知識が評価されています。
                  </p>
                  <p className="text-gray-600 text-sm">
                    取得難易度：中程度｜実務経験：不要
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    国家資格との併有
                  </h4>
                  <p className="text-gray-700 text-sm">
                    理学療法士（PT）や柔道整復師などの国家資格を持つトレーナーも多くいます。これらの資格を持つトレーナーは、リハビリテーションやケガ予防に関する深い知識を備えています。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 実務経験の確認 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                実務経験を見極めるポイント
              </h2>
              <p className="text-gray-700 mb-6">
                資格と同様に重要なのが、実務経験です。経験が豊かなトレーナーは、様々なクライアントのニーズに柔軟に対応でき、より効果的なプログラムを提案できます。
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    パーソナルトレーニング経験年数
                  </h3>
                  <p className="text-gray-700 mb-3">
                    以下を目安として確認してください：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 1年未満：初心者レベル。基本的な知識はありますが、対応パターンが少ない</li>
                    <li>・ 1～3年：成長段階。基本的な指導は確実です</li>
                    <li>・ 3年以上：経験豊かなレベル。様々なクライアント対応実績あり</li>
                    <li>・ 5年以上：ベテラン。複雑なケースや特殊なニーズへの対応が期待できます</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    指導経験者数と成功事例
                  </h3>
                  <p className="text-gray-700 mb-3">
                    トレーナーに以下の質問をしてください：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 指導してきたクライアント数は？（100人以上が目安）</li>
                    <li>・ 女性と男性の指導経験比率は？</li>
                    <li>・ 初心者から上級者まで幅広いレベルに対応した経験がある？</li>
                    <li>・ 成功事例（ビフォーアフター）を見せてもらえる？</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    目的別の指導経験
                  </h3>
                  <p className="text-gray-700 mb-3">
                    あなたの目的に関する指導経験があるか確認することが重要です：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ ダイエット目的：食事指導の経験が豊富か</li>
                    <li>・ 筋力アップ：競技者やボディビルダー指導の経験があるか</li>
                    <li>・ スポーツパフォーマンス向上：該当スポーツの指導経験があるか</li>
                    <li>・ リハビリ：既往歴のある人への対応経験があるか</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    継続教育への取り組み
                  </h3>
                  <p className="text-gray-700 mb-3">
                    業界で認識される優秀なトレーナーは、継続的に学び、知識をアップデートしています：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ セミナーや研修に定期的に参加しているか</li>
                    <li>・ 専門的な書籍や論文を読んでいるか</li>
                    <li>・ 複数の資格を取得しているか</li>
                    <li>・ 最新のトレーニング理論を取り入れているか</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 相性判定 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーナーとの相性を判定する方法
              </h2>
              <p className="text-gray-700 mb-6">
                どんなに優秀なトレーナーでも、相性が悪いと継続が難しくなります。初回カウンセリングで相性を丁寧に見極めることが重要です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    コミュニケーションスタイル
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    初回カウンセリングでの対話を注意深く観察してください：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ あなたの話を最後まで聞いてくれるか、すぐに割り込まないか</li>
                    <li>・ あなたの目標を理解しようとしているか</li>
                    <li>・ 質問に対して丁寧に答えてくれるか</li>
                    <li>・ 専門用語を分かりやすく説明してくれるか</li>
                    <li>・ 一方的な指示ではなく、相談形式で進めるか</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    教え方と指導スタイル
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    体験レッスン中のトレーナーの教え方を確認します：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 運動フォームを丁寧に説明してくれるか</li>
                    <li>・ 間違ったフォームを気づかせてくれるか</li>
                    <li>・ 励ましと厳しさのバランスが取れているか</li>
                    <li>・ あなたのペースに合わせてくれるか</li>
                    <li>・ 鼓舞するトーンと親しみやすさがあるか</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    柔軟性と対応力
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング中の課題への対応姿勢を見ます：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 「きつい」と言った時に、プログラムを調整してくれるか</li>
                    <li>・ 体調が悪い時に無理強いしないか</li>
                    <li>・ 新しい提案や質問に前向きに対応するか</li>
                    <li>・ ケガや既往歴への配慮があるか</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    信頼感と誠実さ
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    長く付き合える信頼感があるかを感じ取ります：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 根拠のない約束をしていないか（「絶対痩せる」など）</li>
                    <li>・ 結果について現実的な見通しを示しているか</li>
                    <li>・ 不得意な分野は正直に言うか</li>
                    <li>・ あなたの成功を心から応援しているように見えるか</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: 初回カウンセリングでの質問 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                初回カウンセリングで質問すべきこと
              </h2>
              <p className="text-gray-700 mb-6">
                初回カウンセリングで、優秀なトレーナーか判定するための質問リストです。これらの質問に対して、トレーナーがどう答えるかで、その実力と姿勢が分かります。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    資格・経験に関する質問
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0 text-lg">Q1</span>
                      <div>
                        <h4 className="font-bold text-gray-900">どのような資格をお持ちですか？</h4>
                        <p className="text-gray-600 text-sm mt-1">取得年や更新状況など、詳しく説明してくれることが重要です。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0 text-lg">Q2</span>
                      <div>
                        <h4 className="font-bold text-gray-900">パーソナルトレーニング指導は何年目ですか？</h4>
                        <p className="text-gray-600 text-sm mt-1">経験年数と、指導したクライアント数について聞きます。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-blue-700 font-bold flex-shrink-0 text-lg">Q3</span>
                      <div>
                        <h4 className="font-bold text-gray-900">私のような目的のクライアントを指導した経験はありますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">あなたの目的に特化した経験があるか確認します。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    プログラム設計に関する質問
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0 text-lg">Q4</span>
                      <div>
                        <h4 className="font-bold text-gray-900">どのような基準でトレーニングプログラムを作成しますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">科学的根拠に基づいた説明ができるか、カスタマイズの考え方を聞きます。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0 text-lg">Q5</span>
                      <div>
                        <h4 className="font-bold text-gray-900">成果測定はどのように行いますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">進捗確認の方法（体重、体脂肪率、筋肉量、見た目など）を聞きます。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0 text-lg">Q6</span>
                      <div>
                        <h4 className="font-bold text-gray-900">プログラムはどのくらいの頻度で変更しますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">定期的に見直しと改善を行うか確認します。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    食事指導に関する質問
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-orange-700 font-bold flex-shrink-0 text-lg">Q7</span>
                      <div>
                        <h4 className="font-bold text-gray-900">食事指導は含まれていますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">食事指導の内容、頻度、サポート方法を確認します。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-orange-700 font-bold flex-shrink-0 text-lg">Q8</span>
                      <div>
                        <h4 className="font-bold text-gray-900">食事指導の考え方を教えてください</h4>
                        <p className="text-gray-600 text-sm mt-1">極端な食事制限ではなく、バランスの取れた指導ができるか確認します。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    その他の質問
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-purple-700 font-bold flex-shrink-0 text-lg">Q9</span>
                      <div>
                        <h4 className="font-bold text-gray-900">ケガや既往歴への対応経験はありますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">あなたが既往歴を持つ場合、その対応が適切か確認します。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-purple-700 font-bold flex-shrink-0 text-lg">Q10</span>
                      <div>
                        <h4 className="font-bold text-gray-900">相性が合わないと感じた場合、トレーナー変更はできますか？</h4>
                        <p className="text-gray-600 text-sm mt-1">誠実なジムなら、変更に対応してくれることを確認します。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: 複数のトレーナーから選ぶ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                複数のジムで体験してトレーナーを比較する
              </h2>
              <p className="text-gray-700 mb-6">
                良いトレーナーを見つけるための最も確実な方法は、複数のジムで体験レッスンを受けることです。比較することで、違いが明確に見えます。
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    複数体験のメリット
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    最低でも2～3社の体験レッスンを受けることをおすすめします：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ トレーナーのスタイルの違いが分かる</li>
                    <li>・ 自分に合ったコミュニケーション方法が見つかる</li>
                    <li>・ 施設やサービスの違いを比較できる</li>
                    <li>・ 料金と内容のバランスが判定しやすい</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    体験時のチェックシート
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    体験後に、記録に残すと比較しやすくなります：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ トレーナーの名前、資格、経験年数</li>
                    <li>・ コミュニケーション（話しやすさ）：5段階評価</li>
                    <li>・ 指導の分かりやすさ：5段階評価</li>
                    <li>・ 相性（続けられそう）：5段階評価</li>
                    <li>・ 施設の清潔さと設備：5段階評価</li>
                    <li>・ 料金・サービス内容の満足度：5段階評価</li>
                    <li>・ その他の所感</li>
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
                  href="/column/gym-choosing/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの選び方完全ガイド
                  </h3>
                  <p className="text-sm text-gray-600">
                    失敗しないジム選びの7つのチェックポイント。目的別選び方、トレーナー評価法をまとめました。
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
                  href="/column/gym-cost/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの料金相場を解説
                  </h3>
                  <p className="text-sm text-gray-600">
                    料金体系を徹底解説。都度払い、月額制、回数券の違いをまとめました。
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
