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
      question: "股関節痛の最も一般的な原因は何ですか？",
      answer: "股関節痛の主な原因は、大臀筋と中臀筋の筋力不足、股関節の内部回旋制限、腸腰筋の過度な緊張、そして不正なトレーニングフォームです。特に、スクワットやランジで股関節を正しく動かせていない場合、股関節周りの筋肉が過度なストレスを受け、痛みが発生します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "股関節痛の改善にはどのくらいの期間が必要ですか？",
      answer: "軽度の股関節痛（筋肉の緊張による）は、正しいストレッチと強化で2～4週間で改善します。慢性的な股関節の問題の場合は、3～6ヶ月の継続的なトレーニングで大幅な改善が期待できます。重要なのは、根本原因に対処し、予防的なトレーニングを継続することです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "股関節痛がある時でも筋トレはできますか？",
      answer: "はい、適切に設計されたプログラムであれば可能です。パーソナルトレーナーは、痛みのない範囲で、股関節を支える筋肉（大臀筋、中臀筋、内転筋）を強化します。むしろ、正しいトレーニングにより、股関節周りの筋力バランスが改善され、痛みが軽減されます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "股関節の靭帯や軟骨の損傷がある場合はどうしますか？",
      answer: "股関節唇損傷や変形性股関節症などの医学的に診断された状態では、医師の許可が必須です。その後、医学的制限に基づき、リハビリテーション専門家とトレーナーが協力して、段階的な強化プログラムを作成します。このような場合、特別な配慮が必要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "股関節痛改善に最も効果的なトレーニングは何ですか？",
      answer: "大臀筋の強化（ヒップスラスト、スクワット、ルーマニアンデッドリフト）、中臀筋の強化（サイドクラムシェル、サイドライイングヒップアブダクション）、そして股関節の可動域改善（ピジョンポーズ、90/90ストレッチ）が最も効果的です。腸腰筋の過度な緊張も改善する必要があります。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "日常生活で股関節痛を防ぐためにはどうしたらいいですか？",
      answer: "長時間の座位を避け、定期的に立って股関節を動かしてください。毎日のストレッチと軽い強化運動を習慣化し、トレーニング時は常に正しいフォームを維持することが大切です。また、股関節の柔軟性維持と筋力強化を継続することで、股関節痛の再発を防ぐことができます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymHipPainPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで股関節痛改善" },
  ];

  const pageTitle = "パーソナルトレーニングで股関節痛改善｜原因から根本的な解決まで完全ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-hip-pain/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="股関節痛の原因から改善方法まで完全解説。パーソナルトレーニングによる大臀筋強化、中臀筋強化、股関節可動域改善など、科学的根拠に基づいた股関節痛対策を詳しく説明します。股関節の内部衝突、股関節唇損傷の予防法も網羅。"
        path="/column/gym-hip-pain/"
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
              description: "股関節痛の原因から改善方法まで完全解説。パーソナルトレーニングによる大臀筋強化、中臀筋強化、股関節可動域改善など、科学的根拠に基づいた股関節痛対策を詳しく説明します。股関節の内部衝突、股関節唇損傷の予防法も網羅。",
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
              股関節痛は、運動習慣のある人にとって非常に一般的な問題です。スクワット、ランジ、デッドリフト、ランニングなど、股関節に負荷のかかる活動を行うと、股関節の前側、側面、または深部に痛みを感じる人は多いです。多くの股関節痛は、医学的な損傷ではなく、大臀筋と中臀筋の筋力不足、股関節の可動域制限、腸腰筋の過度な緊張、そして不正なフォームが原因です。本記事では、股関節痛の最も一般的な原因、股関節痛が身体全体に及ぼす影響、パーソナルトレーナーによる股関節痛評価の方法、そして根本から股関節痛を改善するための効果的なトレーニング方法について、科学的根拠に基づいて詳しく解説します。股関節は身体全体の安定性と力の発揮の中心であるため、その健康の維持は全身の運動機能向上に極めて重要です。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                股関節痛の主な原因
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                股関節痛は、股関節だけの問題ではなく、周囲の筋肉、骨盤、脊椎の機能障害から発生することが多いです。以下は最も一般的な原因です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">大臀筋と中臀筋の弱さ</h3>
                    <p className="text-gray-600">大臀筋と中臀筋が弱いと、スクワットやランジでの股関節の安定性が失われ、股関節に過度なストレスがかかります。特に中臀筋が弱いと、立位や片脚動作での骨盤の安定性が低下し、股関節の内部衝突につながります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">腸腰筋の過度な緊張</h3>
                    <p className="text-gray-600">長時間の座位や不正なフォームにより、腸腰筋が過度に緊張すると、股関節の屈曲機能が制限されます。これにより、スクワットやランジで股関節を正しく動かすことができず、股関節前側の痛みが発生します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">股関節可動域の制限</h3>
                    <p className="text-gray-600">股関節の内部回旋や外部回旋が制限されると、動作時に正常な股関節の軌跡が失われ、関節に過度なストレスがかかります。特に内部回旋の制限は、股関節内部衝突の原因になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">不正なトレーニングフォーム</h3>
                    <p className="text-gray-600">スクワット、ランジ、デッドリフトなどで、股関節を正しく動かさないフォームでトレーニングすると、股関節に過度なストレスがかかり、痛みを引き起こします。膝が足首の上にない、または骨盤が過度に丸まるフォームは特に危険です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨盤の不安定性</h3>
                    <p className="text-gray-600">体幹が弱いと、骨盤の安定性が失われ、股関節に過度なストレスがかかります。また、骨盤の傾きや前後のバランス不良は、股関節関節の負荷配分に悪影響を及ぼします。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                股関節痛が身体に及ぼす影響
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                股関節痛は、局所的な問題だけでなく、身体全体と生活の質に大きな影響を与えます。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">身体的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• スクワット・ランジができない</li>
                    <li>• 腰・膝への代償的な負荷</li>
                    <li>• 歩行パターンの異常</li>
                    <li>• 股関節可動域の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">運動機能への影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• トレーニング強度の低下</li>
                    <li>• ランニング・スポーツ中止</li>
                    <li>• 日常活動の制限</li>
                    <li>• パワー発揮の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">生活的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 階段上下の困難</li>
                    <li>• 社会活動の制限</li>
                    <li>• 睡眠障害</li>
                    <li>• 活動意欲の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">長期的リスク</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 変形性股関節症</li>
                    <li>• 軟骨損傷</li>
                    <li>• 腰痛の慢性化</li>
                    <li>• 歩行障害の進行</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>股関節痛は早期対策が非常に重要です。放置すると、変形性股関節症などの慢性疾患に進行するリスクが高まります。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる股関節痛評価
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、股関節痛の根本原因を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 股関節痛の詳細な聴取</h3>
                  <p className="text-gray-700 mb-2">痛みの性質、発症時期、悪化要因を詳しく確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 痛みの場所（股関節前側・側面・深部）</li>
                    <li>• 痛みを引き起こす動作（スクワット、ランジ、ランニング）</li>
                    <li>• 痛みの性質（鋭い痛み・鈍い痛み・違和感）</li>
                    <li>• 既存の医学的診断の有無</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 静的な姿勢と股関節の配置評価</h3>
                  <p className="text-gray-700 mb-2">立位での股関節と骨盤全体のアライメントを確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 骨盤の傾き（前傾・後傾）</li>
                    <li>• 股関節の位置（内側・外側への偏位）</li>
                    <li>• 足のアーチと回内・回外</li>
                    <li>• 体幹の姿勢</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 可動域測定（ROM）</h3>
                  <p className="text-gray-700 mb-2">股関節の動きを詳しく測定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 股関節の屈伸可動域</li>
                    <li>• 股関節の内部回旋・外部回旋</li>
                    <li>• 股関節の内転・外転</li>
                    <li>• 腸腰筋の柔軟性</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テストと筋肉評価</h3>
                  <p className="text-gray-700 mb-2">股関節周りの筋力と筋肉バランスを評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 大臀筋の強さと活性（ヒップブリッジテスト）</li>
                    <li>• 中臀筋の強さ（サイドライイングテスト）</li>
                    <li>• 内転筋の強さ</li>
                    <li>• 体幹安定性の評価</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 動的動作評価</h3>
                  <p className="text-gray-700 mb-2">スクワットやランジなどの動作での股関節の軌跡を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• スクワット時の股関節の動き</li>
                    <li>• ランジ時の股関節の安定性</li>
                    <li>• 片脚スタンスでの骨盤の安定性</li>
                    <li>• 歩行パターンの分析</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                股関節痛改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                股関節痛改善には、股関節を支える筋肉の強化、関節の可動域改善、そして正しい動作パターンの習得が必須です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">大臀筋強化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">股関節の最大の安定化筋。ヒップスラスト、スクワット、ランジ、デッドリフトで、大臀筋を強化。弱い大臀筋は、股関節痛の根本原因の一つです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">中臀筋の強化</h3>
                  <p className="text-gray-600 text-sm mb-2">股関節の側方安定性に最も重要な筋肉。サイドクラムシェル、サイドライイングヒップアブダクション、モンスターウォークで、中臀筋を集中的に強化します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">腸腰筋のストレッチとリリース</h3>
                  <p className="text-gray-600 text-sm mb-2">過度に緊張した腸腰筋をストレッチし、股関節の屈曲機能を回復。ヨガのロー・ランジ、腸腰筋ストレッチ、フォームローラーでのリリース。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">股関節可動域改善</h3>
                  <p className="text-gray-600 text-sm mb-2">硬い股関節は、過度なストレスを引き起こします。ピジョンポーズ、90/90ストレッチ、ジャニュオーベイアーサナで、股関節の可動域を改善。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体幹安定化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">プランク、サイドプランク、デッドバグで、体幹の安定性を高めます。弱い体幹は、骨盤の安定性低下につながり、股関節への負荷が増加します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">正しいスクワット・ランジフォーム習得</h3>
                  <p className="text-gray-600 text-sm mb-2">パーソナルトレーナーの指導下で、正しいフォームを習得。膝が足首の上にあり、股関節が正しく動く動作パターンを確立することが、改善の鍵です。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                股関節痛改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                股関節痛改善には個人差がありますが、正しい方法で継続すれば、必ず改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">2～3週間目</h3>
                  <p className="text-gray-600 text-sm">軽度の股関節痛であれば、初期的な改善を感じ始めます。日常生活での痛みが減り、簡単な動作時の痛みが軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">4～6週間目</h3>
                  <p className="text-gray-600 text-sm">明らかな改善を感じ始めます。スクワット、ランジが楽になり、トレーニング強度を徐々に上げられるようになります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">12週間目（3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大幅な改善が実感できる時期。以前はできなかった動作（デッドリフト、ランニング、ジャンプ）が可能になり、股関節の安定性が大きく向上します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目以上（6ヶ月以上）</h3>
                  <p className="text-gray-600 text-sm">改善した股関節の状態が定着し、再発のリスクが大幅に低下します。強化された筋肉と改善された動作パターンが習慣化され、股関節痛のない生活が確立されます。</p>
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
                  <span><strong>毎日のセルフケアとストレッチ</strong> — 学んだストレッチと強化運動を毎日5～10分実践することで、改善が確実になります</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>日常動作での正しいフォーム</strong> — スクワット、階段上下など、常に正しいフォームを心がけることが重要です</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>定期的な評価と調整</strong> — パーソナルトレーナーが定期的に進捗を評価し、プログラムを調整することで、最適な改善を実現します</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">股関節痛を根本から改善したい方へ</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              パーソナルトレーナーが、あなたの股関節痛の原因を詳しく分析し、最適な改善プログラムを提案します。体験レッスンで、プロの評価と改善プランを受けることができます。
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
