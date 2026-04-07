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
      question: "首痛の最も一般的な原因は何ですか？",
      answer: "首痛の主な原因は、僧帽筋や首周りの筋肉の緊張、頸椎のアライメント異常、そして不良姿勢です。特にデスクワークによる前かがみの姿勢、スマートフォンの長時間使用（スマートフォン首）、そして寝違えは首痛の主要な原因になります。また、ウエイトトレーニングでの不正なフォーム、特に首を過度に伸ばす動きは、首の痛みと損傷を招きます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "首の痛みはどのくらいの期間で改善しますか？",
      answer: "軽度の首痛は、正しいトレーニングと姿勢改善で1～2週間で改善が見られます。慢性的な首痛の場合は、6～8週間（1～2ヶ月）の継続的なトレーニングで大幅な改善が期待できます。重要なのは、改善した後も、首周りの筋肉を定期的に鍛え続けることで、再発を防ぐことです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "首痛がある時でもパーソナルトレーニングは安全ですか？",
      answer: "はい、適切に設計されたプログラムであれば安全です。パーソナルトレーナーは、首痛の詳細を確認してから、首に負荷をかけないエクササイズから開始します。むしろ、正しいトレーニングにより、首周りの安定筋が強化され、首痛が改善されます。脊柱損傷など医学的な懸念がある場合は、医師の許可を得た上でトレーニングを進めることが重要です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "頸椎椎間板ヘルニアや頸椎症がある場合はどうしますか？",
      answer: "頸椎椎間板ヘルニアや頸椎症などの医学的に診断された状態では、医師の許可が絶対条件です。その後、医学的制限に基づき、パーソナルトレーナーと医療専門家が協力して、段階的にリハビリテーション的なトレーニングを進めます。頸椎への負荷を最小限に保ちながら、周辺の安定筋を強化することが重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "首痛改善に最も効果的なトレーニングは何ですか？",
      answer: "首周りの安定化トレーニング（頸部アイソメトリックトレーニング、ネックフレクション）、肩甲骨周りの筋力強化（シーテッドロウ、フェイスプル）、そして胸鎖乳突筋のストレッチが最も効果的です。これらのトレーニングにより、首を支える筋肉の強さと安定性が向上し、首痛が大幅に改善されます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "日常生活で首痛を防ぐためにはどうしたらいいですか？",
      answer: "まず、デスク作業時に目の高さにモニターを配置し、前かがみの姿勢を避けることが大切です。スマートフォンを使うときは、目の高さに持つようにしましょう。毎日5～10分の首周りのストレッチと軽い筋力トレーニングを習慣化することで、再発を大幅に減らせます。また、十分な睡眠と、首に負荷をかけない寝姿勢（仰向けが理想的）が重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymNeckPainPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで首痛改善" },
  ];

  const pageTitle = "パーソナルトレーニングで首痛改善｜原因から効果的な対策まで完全ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-neck-pain/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="首痛の原因から改善方法まで完全解説。パーソナルトレーニングによる首周り筋強化、肩甲骨周り強化、姿勢改善など、科学的根拠に基づいた首痛対策を詳しく説明します。デスクワーク首痛、寝違えの予防法も網羅。"
        path="/column/gym-neck-pain/"
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
              description: "首痛の原因から改善方法まで完全解説。パーソナルトレーニングによる首周り筋強化、肩甲骨周り強化、姿勢改善など、科学的根拠に基づいた首痛対策を詳しく説明します。デスクワーク首痛、寝違えの予防法も網羅。",
              url: pageUrl,
              datePublished: "2026-04-07",
              dateModified: "2026-04-07",
              author: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "ExerciseGym",
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
              首痛は、現代人が最も悩む健康問題の一つです。デスクワークの増加、スマートフォンの長時間使用、そして不正なトレーニングフォームにより、首痛に苦しむ人は急増しています。スマートフォン首から寝違え、頸椎症まで、様々なタイプがありますが、多くの場合、正しいトレーニングと姿勢改善で大幅に改善されます。本記事では、首痛の最も一般的な原因、首痛が身体全体に及ぼす影響、パーソナルトレーナーによる首痛評価の方法、そして根本から首痛を改善するための効果的なトレーニング方法について、科学的根拠に基づいて詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                首痛の主な原因
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                首痛は多くの要因が組み合わさって発生します。以下は最も一般的な原因です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">デスクワークによる前かがみ姿勢</h3>
                    <p className="text-gray-600">パソコン画面を見下ろす姿勢は、首椎に約15～25kg の負荷をかけます。1日中この姿勢が続くと、首の後ろの筋肉に過度な緊張が生じ、首痛につながります。この「スマートフォン首」は、慢性首痛の最大の原因です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">首周りの筋肉の弱さ</h3>
                    <p className="text-gray-600">僧帽筋上部、脊柱起立筋、首の深層筋が弱いと、頭の重さを支える力が不足します。首は頭部の約7～10%の重さを支えるため、これらの筋肉が弱いと、痛みが発生しやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">頸椎のアライメント異常</h3>
                    <p className="text-gray-600">猫背やストレートネック（頸椎が真っすぐになる状態）は、椎間板に異常な圧力をかけます。頸椎の自然な前湾が失われると、頸椎椎間板ヘルニアなどの重篤な状態に至る可能性があります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">胸筋の緊張と肩甲骨の前傾</h3>
                    <p className="text-gray-600">胸筋が硬く、肩甲骨が前に傾くと、首が前に出る姿勢になりやすくなります。肩甲骨の位置異常は、首に異常な負荷をかけ、痛みを引き起こします。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">不適切なトレーニングと外傷</h3>
                    <p className="text-gray-600">ウエイトトレーニングで首を過度に伸ばす動き、または急激な頸椎の回旋は、首を損傷する危険性があります。また、寝違えなどの小さな外傷が、慢性的な首痛に発展することもあります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                首痛が身体に及ぼす影響
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                首痛は単なる局所的な問題ではなく、身体全体に多くの悪影響をもたらします。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">身体的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 肩や腕への放射痛</li>
                    <li>• 頭痛と偏頭痛</li>
                    <li>• めまいとバランス障害</li>
                    <li>• 手指のしびれ</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">機能的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 首を動かす範囲の制限</li>
                    <li>• トレーニングパフォーマンスの低下</li>
                    <li>• 日常生活動作の困難さ</li>
                    <li>• 運動能力の著しい低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">精神的・生活的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 睡眠障害</li>
                    <li>• 集中力低下</li>
                    <li>• 不安・抑うつ</li>
                    <li>• 生活の質の著しい低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">医学的リスク</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 頸椎椎間板ヘルニア</li>
                    <li>• 頸椎症</li>
                    <li>• 根性痛（神経痛）</li>
                    <li>• 脊髄圧迫症状</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>慢性首痛は頭痛、肩痛、腕痛に発展し、生活の質を大きく低下させます。早期の対策が非常に重要です。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる首痛評価
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、首痛の根本原因を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 首痛の詳細な聴取</h3>
                  <p className="text-gray-700 mb-2">痛みの性質、発症時期、悪化要因、改善要因を詳しく確認します：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• いつから痛みがあるか（急性か慢性か）</li>
                    <li>• どんな時に痛むか（朝起きた時、特定の動き）</li>
                    <li>• 医学的な診断があるか</li>
                    <li>• 過去の外傷やけが</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 姿勢評価</h3>
                  <p className="text-gray-700 mb-2">頸椎と頭部の位置、姿勢を確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 頭部が前に出ているか（前頭位）</li>
                    <li>• 肩が上がっているか（肩上がり）</li>
                    <li>• 猫背やストレートネック</li>
                    <li>• 肩甲骨の位置異常</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 頸椎の可動域測定（ROM）</h3>
                  <p className="text-gray-700 mb-2">首の動きを詳しく測定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 頸椎の前屈・後屈</li>
                    <li>• 頸椎の側屈・回旋</li>
                    <li>• 動作時の痛みの発生ポイント</li>
                    <li>• 動作の制限度合い</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テストと筋肉評価</h3>
                  <p className="text-gray-700 mb-2">首周りの筋力と筋肉の質を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 首周りの深層筋の強さ</li>
                    <li>• 僧帽筋上部の強さと緊張度</li>
                    <li>• 胸筋の柔軟性</li>
                    <li>• 肩甲骨周りの筋力バランス</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 機能的動作テスト</h3>
                  <p className="text-gray-700 mb-2">日常動作やトレーニング動作での首への負荷を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• デスク作業時の姿勢</li>
                    <li>• スマートフォン使用時の姿勢</li>
                    <li>• 寝て首を動かしている時の動き</li>
                    <li>• トレーニング時の頸椎への負荷</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                首痛改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                首痛改善には、首周り筋肉の安定化、肩甲骨周りの強化、そして姿勢改善が必須です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">首周り安定化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">頸部アイソメトリックトレーニング、頸部フレクション、首の深層筋を活性化させます。静的な保持トレーニングで、首を支える筋肉が強化され、首痛が改善されます。これが首痛改善の基本です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">肩甲骨周りの筋力強化</h3>
                  <p className="text-gray-600 text-sm mb-2">シーテッドロウ、ベントオーバーロウ、フェイスプルで、僧帽筋と菱形筋を強化。肩甲骨の安定性が向上すると、首への負荷が軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">胸筋のストレッチ</h3>
                  <p className="text-gray-600 text-sm mb-2">硬い大胸筋は、肩を前に引き出し、首が前に出る姿勢を助長します。定期的なストレッチで、胸筋の柔軟性を高めることは、首痛改善に不可欠です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">頸部の可動域トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">ネックロテーション、首の側屈エクササイズで、頸椎の可動域を改善。痛みのない範囲で、首の動きを徐々に広げていきます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">ストレッチボールを使った背部エクササイズ</h3>
                  <p className="text-gray-600 text-sm mb-2">ストレッチボールの上で背を伸ばすエクササイズで、脊椎全体の可動域を改善。首から背中全体を伸ばすことで、首への圧力が軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">姿勢矯正エクササイズ</h3>
                  <p className="text-gray-600 text-sm mb-2">ウォールエンジェル、スリーポイント胸椎回旋で、姿勢を改善。頭部が正しい位置に戻ることで、首の痛みが自然に軽減されます。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                首痛改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                首痛改善には個人差がありますが、正しい方法で継続すれば、必ず改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">1～2週間目</h3>
                  <p className="text-gray-600 text-sm">軽度の痛みであれば、初期的な改善を感じ始めます。トレーニングの効果を実感し、モチベーションが上がり始める時期です。朝の寝違え感が軽くなることもあります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">3～4週間目</h3>
                  <p className="text-gray-600 text-sm">明らかな改善を感じ始めます。首の動きが楽になり、痛みで制限されていた動作が可能になります。デスクワーク時の首の疲労も軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">8～12週間目（2～3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大幅な改善が実感できます。痛みのない日が増え、以前はできなかった動作が可能になります。姿勢が改善され、首の疲労感がほぼなくなります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目以上（6ヶ月以上）</h3>
                  <p className="text-gray-600 text-sm">改善した状態が定着し、再発のリスクが大幅に低下します。正しい姿勢と首周り筋肉の強さが習慣化され、生活の質が大幅に向上します。</p>
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
                  <span><strong>デスク環境の改善</strong> — モニター高さを調整し、前かがみの姿勢を避けることが重要です</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>定期的な姿勢確認</strong> — 鏡の前で毎日自分の姿勢をチェックし、改善状況を記録することが重要です</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">首痛を根本から改善したい方へ</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              パーソナルトレーナーが、あなたの首痛の原因を詳しく分析し、最適な改善プログラムを提案します。体験レッスンで、プロの評価と改善プランを受けることができます。
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
