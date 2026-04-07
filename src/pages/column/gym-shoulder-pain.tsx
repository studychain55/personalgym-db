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
      question: "肩痛の最も一般的な原因は何ですか？",
      answer: "肩痛の主な原因は、肩甲骨周りの筋肉（僧帽筋、菱形筋）の弱さ、肩関節の不安定性、そして姿勢の悪化です。特にデスクワークによる猫背や、肩が内巻きになる姿勢は肩関節に大きな負担をかけます。また、ウエイトトレーニングでの不正なフォーム、肩関節の可動域不足、腕の内部回旋の過剰な使用も肩痛の隠れた原因になります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "肩の痛みはどのくらいの期間で改善しますか？",
      answer: "軽度の肩痛は、正しいトレーニングと姿勢改善で2～3週間で改善が見られます。慢性的な肩痛の場合は、8～12週間（2～3ヶ月）の継続的なトレーニングで大幅な改善が期待できます。重要なのは、改善した後も、肩関節周りの筋肉を定期的に鍛え続けることで、再発を防ぐことです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "肩痛がある時でもパーソナルトレーニングは安全ですか？",
      answer: "はい、適切に設計されたプログラムであれば安全です。パーソナルトレーナーは、肩痛の詳細を確認してから、肩に負荷をかけないエクササイズから開始します。むしろ、正しいトレーニングにより、肩の安定筋が強化され、肩痛が改善されます。関節炎など医学的な診断がある場合は、医師の許可を得た上でトレーニングを進めることが重要です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "五十肩や肩腱炎がある場合はどうしますか？",
      answer: "五十肩（肩関節周囲炎）や肩腱炎などの医学的に診断された状態では、医師の許可が必須条件です。その後、医学的制限に基づき、パーソナルトレーナーと医療専門家が協力して、段階的にリハビリテーション的なトレーニングを進めます。可動域の改善フェーズ、筋力強化フェーズ、機能的トレーニングフェーズと、段階を踏むことが重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "肩痛改善に最も効果的なトレーニングは何ですか？",
      answer: "肩甲骨の安定化トレーニング（スキャプラープッシュアップ、ベントオーバーロウ）、肩の外部回旋トレーニング（エクスターナルローテーション）、菱形筋強化（フェイスプル）、そして前鋸筋の活性化が最も効果的です。これらのトレーニングにより、肩関節周りの筋力が向上し、肩の安定性が大幅に改善されます。また、ストレッチで肩関節の可動域を広げることも重要です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "日常生活で肩痛を防ぐためにはどうしたらいいですか？",
      answer: "まず、デスク作業時の姿勢を意識し、肩が内巻きにならないよう気をつけることが大切です。定期的に肩を後ろに引き、肩甲骨を寄せるストレッチを行いましょう。毎日5～10分の肩関節可動域エクササイズとストレッチを習慣化することで、再発を大幅に減らせます。また、重い荷物を片肩に継続してかけることは避け、バランスよく負荷をかけることが重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymShoulderPainPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで肩痛改善" },
  ];

  const pageTitle = "パーソナルトレーニングで肩痛改善｜原因から効果的な対策まで完全ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-shoulder-pain/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="肩痛の原因から改善方法まで完全解説。パーソナルトレーニングによる肩甲骨周り強化、肩の外部回旋トレーニング、姿勢改善など、科学的根拠に基づいた肩痛対策を詳しく説明します。五十肩、肩腱炎の予防法も網羅。"
        path="/column/gym-shoulder-pain/"
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
              description: "肩痛の原因から改善方法まで完全解説。パーソナルトレーニングによる肩甲骨周り強化、肩の外部回旋トレーニング、姿勢改善など、科学的根拠に基づいた肩痛対策を詳しく説明します。五十肩、肩腱炎の予防法も網羅。",
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
              肩痛は、パーソナルジムに通う人が最も悩む問題の一つです。デスクワークの増加、スマートフォンの長時間使用、そして不正なトレーニングフォームにより、肩痛に苦しむ人は急増しています。五十肩から肩関節痛、肩甲骨周りの痛みまで、様々なタイプがありますが、多くの場合、正しいトレーニングと姿勢改善で大幅に改善されます。本記事では、肩痛の最も一般的な原因、肩痛が身体全体に及ぼす影響、パーソナルトレーナーによる肩痛評価の方法、そして根本から肩痛を改善するための効果的なトレーニング方法について、科学的根拠に基づいて詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                肩痛の主な原因
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                肩痛は多くの要因が組み合わさって発生します。以下は最も一般的な原因です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">肩甲骨周り筋肉の弱さ</h3>
                    <p className="text-gray-600">僧帽筋、菱形筋、前鋸筋が弱いと、肩甲骨が安定せず、肩関節に過度な負荷がかかります。肩甲骨の安定性が低いと、日常生活の動きでも肩に負担がかかりやすくなります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">悪い姿勢と肩の内巻き</h3>
                    <p className="text-gray-600">猫背や肩が前に出る姿勢は、肩関節を不安定にし、肩の内部筋肉に過度な負荷をかけます。デスクワーク中の姿勢悪化は、慢性肩痛の最大の原因の一つです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">肩関節の可動域制限</h3>
                    <p className="text-gray-600">肩関節の外部回旋や内部回旋が制限されると、肩の動きが悪くなり、代償動作が増加します。これが肩関節内部の損傷を招き、痛みや炎症につながります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">不適切なウエイトトレーニング</h3>
                    <p className="text-gray-600">ベンチプレスやショルダープレスでのフォームミス、肩関節を無視した過度な負荷、ウォームアップ不足は、肩損傷の大きな原因になります。肩に負担をかけるトレーニング方法を避けることが重要です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">運動不足と肩関節の柔軟性低下</h3>
                    <p className="text-gray-600">運動が少ないと、肩関節周りの筋肉が硬くなり、関節の動きが制限されます。これにより、日常的な動作で肩に負担がかかりやすくなり、痛みが発生しやすくなります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                肩痛が身体に及ぼす影響
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                肩痛は単なる局所的な問題ではなく、身体全体に多くの悪影響をもたらします。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">身体的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 腕への痛みやしびれ</li>
                    <li>• 首・肩甲骨への連鎖的な痛み</li>
                    <li>• 筋肉のこわばりと硬化</li>
                    <li>• 肩関節の可動域制限</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">機能的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 腕の上げ下げ動作の困難さ</li>
                    <li>• トレーニングパフォーマンスの低下</li>
                    <li>• 日常生活動作の制限</li>
                    <li>• 力仕事や重い物を持つことができない</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">精神的・生活的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 睡眠障害（夜間痛）</li>
                    <li>• 不安・抑うつ</li>
                    <li>• 生活の質の低下</li>
                    <li>• トレーニング意欲の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">医学的リスク</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 五十肩（肩関節周囲炎）</li>
                    <li>• 肩腱炎・腱断裂</li>
                    <li>• インピンジメント症候群</li>
                    <li>• 回旋腱板損傷</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>慢性肩痛は首、背中、腕にも痛みを広げ、生活の質を大きく低下させます。早期の対策が非常に重要です。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる肩痛評価
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、肩痛の根本原因を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 肩痛の詳細な聴取</h3>
                  <p className="text-gray-700 mb-2">痛みの性質、発症時期、悪化要因、改善要因を詳しく確認します：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• いつから痛みがあるか（急性か慢性か）</li>
                    <li>• どんな時に痛むか（腕を上げる時、就寝時）</li>
                    <li>• 医学的な診断があるか</li>
                    <li>• 過去のトレーニング歴と痛みの関連性</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 姿勢評価</h3>
                  <p className="text-gray-700 mb-2">肩甲骨と肩関節の位置、姿勢を確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 肩の高さのバランス（片肩上がり）</li>
                    <li>• 肩の内巻き度合い</li>
                    <li>• 肩甲骨の位置異常</li>
                    <li>• 頸椎のアライメント異常</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 可動域測定（ROM）</h3>
                  <p className="text-gray-700 mb-2">肩関節の動きを詳しく測定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 肩の屈曲・伸展</li>
                    <li>• 肩の外部・内部回旋</li>
                    <li>• 肩の外転・内転</li>
                    <li>• 動作時の痛みの発生ポイント</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テストと筋肉評価</h3>
                  <p className="text-gray-700 mb-2">肩周りの筋力と筋肉の質を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 肩の外部回旋筋の強さ</li>
                    <li>• 菱形筋と僧帽筋の強さ</li>
                    <li>• 前鋸筋の活性度</li>
                    <li>• 胸筋の柔軟性</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 機能的動作テスト</h3>
                  <p className="text-gray-700 mb-2">日常動作やトレーニング動作での肩への負荷を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• ベンチプレス動作での肩の安定性</li>
                    <li>• オーバーヘッド（頭上）での動作</li>
                    <li>• プッシュアップ動作での肩甲骨の安定性</li>
                    <li>• 腕の振り動作での肩の代償動作</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                肩痛改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                肩痛改善には、肩甲骨の安定化、肩関節の外部回旋強化、そして正しい動作パターンの習得が必須です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">肩甲骨安定化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">肩甲骨の安定性を高める基本トレーニング。スキャプラープッシュアップ、ベントオーバーロウ、フェイスプルなどで、肩甲骨周りの深層筋を活性化させ、肩関節を保護する力をつけます。これが肩痛改善の基本です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">肩の外部回旋トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">肩の回旋腱板を強化し、肩関節の安定性を大幅に向上させる。エクスターナルローテーション、スリーポイントエクスターナルローテーション、ケーブルエクスターナルローテーションなどで、肩の安定筋を集中的に強化します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">菱形筋と僧帽筋の強化</h3>
                  <p className="text-gray-600 text-sm mb-2">シーテッドロウ、バーベルロウ、シングルアームダンベルロウで、菱形筋と僧帽筋を強化。これらの筋肉が弱いと、肩が内巻きになりやすく、肩痛につながります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">前鋸筋の活性化</h3>
                  <p className="text-gray-600 text-sm mb-2">シーテッドショルダープレス、ダンベルプルオーバー、ウォールスライドで、前鋸筋を活性化。前鋸筋が強いと、肩甲骨が正常な位置に保たれ、肩の機能が大幅に向上します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">肩関節の可動域トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">スリーポイントストレッチ、ウォールスライド、キャットカウストレッチなどで、肩関節の可動域を回復。これにより、肩の動きが滑らかになり、痛みが軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">胸筋のストレッチ</h3>
                  <p className="text-gray-600 text-sm mb-2">硬い大胸筋は、肩を前に引き出し、内巻きの姿勢を助長します。定期的なストレッチで、胸筋の柔軟性を高めることは、肩痛改善に不可欠です。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                肩痛改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                肩痛改善には個人差がありますが、正しい方法で継続すれば、必ず改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">1～2週間目</h3>
                  <p className="text-gray-600 text-sm">軽度の痛みであれば、初期的な改善を感じ始めます。トレーニングの効果を実感し、モチベーションが上がり始める時期です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">3～4週間目</h3>
                  <p className="text-gray-600 text-sm">明らかな改善を感じ始めます。腕を上げる動作が楽になり、痛みで制限されていた動きが可能になります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">8～12週間目（2～3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大幅な改善が実感できます。痛みのない日が増え、以前はできなかった動作が可能になります。肩の安定性が向上し、トレーニングの強度を上げることができます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目以上（6ヶ月以上）</h3>
                  <p className="text-gray-600 text-sm">改善した状態が定着し、再発のリスクが大幅に低下します。正しい動作パターンと肩の安定性が習慣化され、生活の質が大幅に向上します。</p>
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
                  <span><strong>日常生活での姿勢改善</strong> — 意識的に肩を後ろに引き、肩甲骨を寄せる習慣をつけることが重要です</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">肩痛を根本から改善したい方へ</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              パーソナルトレーナーが、あなたの肩痛の原因を詳しく分析し、最適な改善プログラムを提案します。体験レッスンで、プロの評価と改善プランを受けることができます。
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
