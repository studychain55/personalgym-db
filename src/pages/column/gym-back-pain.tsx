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
      question: "腰痛の最も一般的な原因は何ですか？",
      answer: "腰痛の最大の原因は、不良姿勢、体幹筋力の弱さ、そして腰部への過度なストレスです。デスクワークによる猫背、骨盤の傾き、硬くなった腸腰筋やハムストリングスが腰椎に負担をかけます。また、ウエイトトレーニングでの不正なフォームも急性腰痛の原因になります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "腰痛の改善にはどのくらいの期間が必要ですか？",
      answer: "軽度の筋肉由来の腰痛は、正しいトレーニングと姿勢改善で2～4週間で改善します。慢性的な腰痛の場合は、3～6ヶ月の継続的なトレーニングで大幅な改善が期待できます。重要なのは、一度改善した後も、再発防止のため定期的なトレーニングを続けることです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "腰痛がある時でもパーソナルトレーニングは安全ですか？",
      answer: "はい、適切に設計されたプログラムであれば安全です。パーソナルトレーナーは、あなたの痛みのレベルに応じて、負荷を調整し、腰に優しい運動から始めます。むしろ、正しいトレーニングにより、腰を支える筋肉が強化され、腰痛が改善されます。重要なのは、トレーナーに腰痛の詳細を事前に伝えることです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "椎間板ヘルニアや脊柱管狭窄症がある場合はどうしますか？",
      answer: "椎間板ヘルニアや脊柱管狭窄症などの医学的に診断された状態では、まず医師の許可を得ることが絶対条件です。その後、医学的制限に基づき、パーソナルトレーナーと医療専門家が協力して、リハビリテーション的なトレーニングプログラムを作成します。このような場合、通常のトレーニングではなく、特別な配慮が必要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "腰痛改善に最も効果的なトレーニングは何ですか？",
      answer: "体幹安定化トレーニング（プランク、デッドバグ、鳥のポーズ）、股関節可動域の改善（ヒップスラスト、スクワット）、そして腸腰筋と脊柱起立筋のストレッチが特に効果的です。また、背中と腹部をバランスよく鍛えることで、脊椎の安定性が向上し、腰痛が軽減されます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "日常生活で腰痛を防ぐためにはどうしたらいいですか？",
      answer: "まず、デスク作業中の姿勢を意識し、こまめに立ち上がってストレッチすることが大切です。荷物を持つ時は膝を曲げて持ち上げ、腰をひねらないようにしましょう。毎日5～10分の軽いストレッチや腹筋運動を習慣化することで、再発を大幅に減らせます。また、十分な睡眠と、トレーニングで鍛えた筋肉を維持することも重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymBackPainPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで腰痛改善" },
  ];

  const pageTitle = "パーソナルトレーニングで腰痛改善｜原因から効果的な対策まで完全ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-back-pain/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="腰痛の原因から改善方法まで完全解説。パーソナルトレーニングによる体幹強化、腸腰筋ストレッチ、姿勢改善など、科学的根拠に基づいた腰痛対策を詳しく説明します。慢性腰痛、ぎっくり腰の予防法も網羅。"
        path="/column/gym-back-pain/"
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
              description: "腰痛の原因から改善方法まで完全解説。パーソナルトレーニングによる体幹強化、腸腰筋ストレッチ、姿勢改善など、科学的根拠に基づいた腰痛対策を詳しく説明します。慢性腰痛、ぎっくり腰の予防法も網羅。",
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
              健康・症状改善
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              腰痛は、日本人が最も悩みを抱える健康問題の一つです。デスクワークの増加、スマートフォンの長時間使用、運動不足などにより、腰痛に苦しむ人は増加し続けています。急性腰痛（ぎっくり腰）から慢性腰痛まで、様々なタイプがありますが、多くの場合、正しいトレーニングと姿勢改善で大幅に改善されます。本記事では、腰痛の最も一般的な原因、腰痛が身体全体に及ぼす影響、パーソナルトレーナーによる腰痛評価の方法、そして根本から腰痛を改善するための効果的なトレーニング方法について、科学的根拠に基づいて詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛の主な原因
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                腰痛は多くの要因が組み合わさって発生します。以下は最も一般的な原因です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">体幹筋力の低下</h3>
                    <p className="text-gray-600">腹筋、背筋、側腹筋が弱いと、脊椎を支える力が不足し、腰椎に過度なストレスがかかります。体幹が不安定だと、日常生活の動きでも腰に負担がかかりやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">姿勢の悪化</h3>
                    <p className="text-gray-600">猫背や骨盤の傾きは、脊椎の自然な曲線を崩し、腰椎に異常な負荷をかけます。デスクワーク中の姿勢悪化は、慢性腰痛の最大の原因の一つです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">股関節可動域の制限</h3>
                    <p className="text-gray-600">股関節が硬いと、腰がその不足を補おうとして、腰椎に過度な負担がかかります。腸腰筋やハムストリングスの硬さは、腰痛の隠れた原因になることが多いです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">不適切なトレーニング方法</h3>
                    <p className="text-gray-600">ウエイトトレーニングでのフォームミス、過度な負荷、ウォームアップ不足は、急性腰痛の大きな原因になります。特にデッドリフトやスクワットでのフォーム不良は危険です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">運動不足と柔軟性の低下</h3>
                    <p className="text-gray-600">運動が少ないと、筋肉が硬くなり、関節の動きが悪くなります。これにより、日常的な動作で腰に負担がかかりやすくなります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛が身体に及ぼす影響
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                腰痛は単なる局所的な問題ではなく、身体全体に多くの悪影響をもたらします。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">身体的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 下肢への痛みやしびれ</li>
                    <li>• 股関節・膝・足首への負荷増加</li>
                    <li>• 筋肉のこわばりと硬化</li>
                    <li>• 可動域の制限</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">機能的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 日常生活動作の困難さ</li>
                    <li>• 運動能力の低下</li>
                    <li>• 仕事パフォーマンスの低下</li>
                    <li>• 長時間の立位・座位が困難</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">精神的・生活的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 睡眠障害</li>
                    <li>• 不安・抑うつ</li>
                    <li>• 生活の質の低下</li>
                    <li>• 活動意欲の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">医学的リスク</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 椎間板ヘルニア</li>
                    <li>• 脊柱管狭窄症</li>
                    <li>• 坐骨神経痛</li>
                    <li>• 脊椎すべり症</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>慢性腰痛は身体の他の部位にも悪影響を広げ、生活の質を大きく低下させます。早期の対策が非常に重要です。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる腰痛評価
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、腰痛の根本原因を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 腰痛の詳細な聴取</h3>
                  <p className="text-gray-700 mb-2">痛みの性質、発症時期、悪化要因、改善要因を詳しく確認します：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• いつから痛みがあるか（急性か慢性か）</li>
                    <li>• どんな時に痛むか（姿勢、運動、時間帯）</li>
                    <li>• 整形外科的な診断があるか</li>
                    <li>• 薬物療法や治療歴</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 姿勢評価</h3>
                  <p className="text-gray-700 mb-2">立位・座位での脊椎と骨盤のアライメントを確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 骨盤の前傾・後傾度</li>
                    <li>• 脊椎の湾曲異常</li>
                    <li>• 肩と骨盤のズレ</li>
                    <li>• 左右の筋肉バランスの差</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 可動域測定（ROM）と動的評価</h3>
                  <p className="text-gray-700 mb-2">脊椎と股関節の動きを詳しく測定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 脊椎の前屈・後屈・側屈・回旋</li>
                    <li>• 股関節の外旋・内旋・屈伸</li>
                    <li>• 動作時の痛みの発生ポイント</li>
                    <li>• 代償動作の有無</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テストと筋肉評価</h3>
                  <p className="text-gray-700 mb-2">腰周りの筋力と筋肉の質を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 体幹筋（腹筋・背筋）の強さ</li>
                    <li>• 大臀筋の強さと活性</li>
                    <li>• 腸腰筋、ハムストリングスの柔軟性</li>
                    <li>• 脊柱起立筋と腰部筋肉の質</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 機能的動作テスト</h3>
                  <p className="text-gray-700 mb-2">日常動作やトレーニング動作での腰部への負荷を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• スクワット動作での腰への負荷</li>
                    <li>• デッドリフト動作での脊椎中立性</li>
                    <li>• 座位から立位への動作</li>
                    <li>• 片足立ちでのバランスと体幹安定性</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                腰痛改善には、体幹の安定化、股関節の可動域改善、そして正しい動作パターンの習得が必須です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体幹安定化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">脊椎の安定性を高める深層筋を鍛える。プランク、デッドバグ、バードドッグなどで、腹横筋・多裂筋・骨盤底筋を活性化させ、脊椎を保護する力をつけます。これが腰痛改善の基本です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">股関節可動域改善トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">腸腰筋の柔軟性を高め、股関節の外旋・内旋を改善。ヒップスラスト、ランジ、90/90ストレッチなどで、股関節の動きを回復させ、腰への負荷を軽減します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">大臀筋と脊柱起立筋の強化</h3>
                  <p className="text-gray-600 text-sm mb-2">スクワット、ヒップスラスト、バックエクステンションで、腰を支える主要な筋肉を強化。これらの筋肉が弱いと、腰椎に直接的な負担がかかります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">ハムストリングスのストレッチ</h3>
                  <p className="text-gray-600 text-sm mb-2">硬いハムストリングスは、骨盤を後傾させ、腰椎に負荷をかけます。定期的なストレッチで、ハムストリングスの柔軟性を高めることは、腰痛改善に不可欠です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">脊椎中立性を保つトレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">デッドリフト、スクワット、ベアクロールなどで、脊椎を自然な曲線に保ったまま動く能力を習得。これにより、日常生活やスポーツでも腰に負担をかけない動作が身につきます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">セルフケアとモビリティワーク</h3>
                  <p className="text-gray-600 text-sm mb-2">フォームローラーでの筋膜リリース、ストレッチボールでの背部エクササイズ、日々のストレッチは、トレーニング効果を高めます。毎日5～10分のセルフケアが改善を加速させます。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                腰痛改善には個人差がありますが、正しい方法で継続すれば、必ず改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">1～2週間目</h3>
                  <p className="text-gray-600 text-sm">軽度の痛みであれば、初期的な改善を感じ始めます。トレーニングの効果を実感し、モチベーションが上がり始める時期です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">3～4週間目</h3>
                  <p className="text-gray-600 text-sm">明らかな改善を感じ始めます。日常生活での動作が楽になり、痛みで制限されていた動きが可能になります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">8～12週間目（2～3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大幅な改善が実感できます。痛みのない日が増え、以前はできなかった動作が可能になります。体幹の強さが向上し、姿勢改善も目立ってきます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目以上（6ヶ月以上）</h3>
                  <p className="text-gray-600 text-sm">改善した状態が定着し、再発のリスクが大幅に低下します。正しい動作パターンと体幹の強さが習慣化され、生活の質が大幅に向上します。</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">継続のコツ</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>週1～2回のパーソナルトレーニング</strong> — プロの指導により、正しいフォームと段階的な進行が確保されます</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>毎日のセルフケア</strong> — 学んだストレッチを毎日10分実践することで、改善が確実になります</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>日常生活での姿勢改善</strong> — 意識的に姿勢を正し、ストレッチブレイクを定期的に取ることが重要です</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>改善状況の記録</strong> — 痛みレベル、可動域、日常生活での変化を記録することで、進捗が実感でき、モチベーションが保たれます</span>
                </li>
              </ul>
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
                  <p className="text-gray-700 mt-4">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-300 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">腰痛を根本から改善したい方へ</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              パーソナルトレーナーが、あなたの腰痛の原因を詳しく分析し、最適な改善プログラムを提案します。体験レッスンで、プロの評価と改善プランを受けることができます。
            </p>
            <Link
              href="/search/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              パーソナルジムを探す
            </Link>
          </section>
        </article>
      </div>
    </Layout>
  );
}
