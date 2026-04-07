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
      question: "膝痛の最も一般的な原因は何ですか？",
      answer: "膝痛の主な原因は、大腿四頭筋と大臀筋の筋力バランスの悪さ、股関節と足首の可動域制限、膝を適切に安定させられない体幹の弱さです。また、トレーニング時のフォーム不良、特にスクワットやランジでの膝の内側への倒れ込みは、膝に大きなストレスをかけます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "膝痛の改善にはどのくらいの期間が必要ですか？",
      answer: "軽度の膝痛（使いすぎによるもの）は、正しいトレーニングと強化で2～4週間で改善します。慢性的な膝の問題の場合は、3～6ヶ月の継続的なトレーニングで大幅な改善が期待できます。重要なのは、根本原因（弱い筋肉、固い筋肉）に対処し、予防トレーニングを継続することです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "膝痛がある時でも筋トレはできますか？",
      answer: "はい、適切に設計されたプログラムであれば可能です。パーソナルトレーナーは、痛みのない範囲で、膝を支える筋肉（特に大臀筋と内側広筋）を強化し、膝の安定性を高めます。むしろ、正しいトレーニングにより、膝の痛みの原因である筋力バランスの悪さが改善され、膝痛が軽減されます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "膝の靭帯や軟骨の損傷がある場合はどうしますか？",
      answer: "ACL損傷や変形性膝関節症などの医学的に診断された状態では、医師の許可が必須です。その後、医学的制限に基づき、リハビリテーション専門家とトレーナーが協力して、段階的な強化プログラムを作成します。このような場合、通常のトレーニングではなく、特別な配慮が必要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "膝痛改善に最も効果的なトレーニングは何ですか？",
      answer: "大臀筋の強化（ヒップスラスト、スクワット、ランジ）、内側広筋の強化（レッグプレス、ウォールスクワット）、そして股関節の可動域改善（ピジョンポーズ、90/90ストレッチ）が最も効果的です。また、足首の安定性と可動域改善も、膝の負担軽減に重要です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "日常生活で膝痛を防ぐためにはどうしたらいいですか？",
      answer: "階段の上り下りや荷物を持つ時は、意識的に膝を外側に向けて、膝の内側への倒れ込みを避けてください。毎日のストレッチと軽い強化運動を習慣化し、トレーニング時は常に正しいフォームを維持することが大切です。また、足底アーチのサポートと適切な靴選びも、膝への負荷を軽減します。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymKneePainPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで膝痛改善" },
  ];

  const pageTitle = "パーソナルトレーニングで膝痛改善｜原因から根本的な解決まで完全ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-knee-pain/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="膝痛の原因から改善方法まで完全解説。パーソナルトレーニングによる大臀筋強化、股関節可動域改善、正しいフォーム習得など、科学的根拠に基づいた膝痛対策を詳しく説明します。ランナー膝、膝の内側痛の予防法も網羅。"
        path="/column/gym-knee-pain/"
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
              description: "膝痛の原因から改善方法まで完全解説。パーソナルトレーニングによる大臀筋強化、股関節可動域改善、正しいフォーム習得など、科学的根拠に基づいた膝痛対策を詳しく説明します。ランナー膝、膝の内側痛の予防法も網羅。",
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
              膝痛は、運動習慣のある人にとって最も一般的な問題の一つです。ランニング、スクワット、階段の上り下りなど、膝に負荷のかかる活動を行うと、膝の前側や内側に痛みを感じる人は多いです。しかし、多くの膝痛は、医学的な損傷ではなく、筋力バランスの悪さ、関節の可動域制限、そして不正なフォームが原因です。本記事では、膝痛の最も一般的な原因、膝痛が身体全体に及ぼす影響、パーソナルトレーナーによる膝痛評価の方法、そして根本から膝痛を改善するための効果的なトレーニング方法について、科学的根拠に基づいて詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                膝痛の主な原因
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                膝痛は、膝関節だけの問題ではなく、股関節、足首、体幹の機能障害から発生することが多いです。以下は最も一般的な原因です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">大臀筋の弱さ</h3>
                    <p className="text-gray-600">大臀筋が弱いと、スクワットやランジでの膝への安定性が失われ、膝が内側に倒れ込みやすくなります。これは膝の内側への過度なストレスと痛みを引き起こします。大臀筋の強化は、膝痛改善の最重要課題です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">股関節可動域の制限</h3>
                    <p className="text-gray-600">股関節が硬いと、スクワット動作で膝が過度に曲がり、膝に過度な負荷がかかります。特に股関節の外旋制限は、膝の内側痛の大きな原因になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">大腿四頭筋と大臀筋のバランス不良</h3>
                    <p className="text-gray-600">膝の安定性は、大腿四頭筋（特に内側広筋）と大臀筋のバランスで維持されます。このバランスが崩れると、膝が不安定になり、痛みが発生します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">不正なトレーニングフォーム</h3>
                    <p className="text-gray-600">スクワット、ランジ、レッグプレスなどで、膝が足首の上にない、または膝が内側に倒れ込むフォームでトレーニングすると、膝に過度なストレスがかかり、急性または慢性の膝痛を引き起こします。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">足首と体幹の不安定性</h3>
                    <p className="text-gray-600">足首が不安定だと、膝が代償的に動き、過度なストレスを受けます。また、体幹が弱いと、全身の安定性が失われ、膝への負荷が増加します。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                膝痛が身体に及ぼす影響
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                膝痛は、局所的な問題だけでなく、身体全体と生活の質に大きな影響を与えます。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">身体的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• スクワット・階段上下ができない</li>
                    <li>• 股関節・腰への代償的な負荷</li>
                    <li>• 歩行パターンの異常</li>
                    <li>• 足首・膝の関節機能低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">運動機能への影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• トレーニング強度の低下</li>
                    <li>• ランニング・スポーツ中止</li>
                    <li>• 日常活動の制限</li>
                    <li>• 筋力・持久力低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">生活的影響</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 日常動作での制限</li>
                    <li>• 社会活動の制限</li>
                    <li>• 睡眠障害</li>
                    <li>• 活動意欲の低下</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">長期的リスク</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 変形性膝関節症</li>
                    <li>• 軟骨損傷</li>
                    <li>• 膝周囲の筋萎縮</li>
                    <li>• 歩行障害の進行</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>膝痛は早期対策が非常に重要です。放置すると、変形性膝関節症などの慢性疾患に進行するリスクが高まります。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる膝痛評価
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、膝痛の根本原因を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 膝痛の詳細な聴取</h3>
                  <p className="text-gray-700 mb-2">痛みの性質、発症時期、悪化要因を詳しく確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 痛みの場所（膝前側・内側・外側）</li>
                    <li>• 痛みを引き起こす動作（スクワット、階段、ランニング）</li>
                    <li>• 痛みの性質（鋭い痛み・鈍い痛み・違和感）</li>
                    <li>• 既存の医学的診断の有無</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 静的な姿勢と膝の配置評価</h3>
                  <p className="text-gray-700 mb-2">立位での膝と下肢全体のアライメントを確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 膝の向き（直立・内向き・外向き）</li>
                    <li>• Q角（大腿骨と脛骨のなす角）</li>
                    <li>• 足のアーチと回内・回外</li>
                    <li>• 骨盤の傾き</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 可動域測定（ROM）</h3>
                  <p className="text-gray-700 mb-2">膝と股関節の動きを詳しく測定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 膝の屈伸可動域</li>
                    <li>• 股関節の外旋・内旋</li>
                    <li>• 股関節の屈伸</li>
                    <li>• 足首の背屈・底屈</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テストと筋肉評価</h3>
                  <p className="text-gray-700 mb-2">膝周りの筋力と筋肉バランスを評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 大臀筋の強さと活性（ヒップブリッジテスト）</li>
                    <li>• 大腿四頭筋の強さ（特に内側広筋）</li>
                    <li>• ハムストリングスの柔軟性</li>
                    <li>• 股関節外転筋の強さ</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 動的動作評価</h3>
                  <p className="text-gray-700 mb-2">スクワットやランジなどの動作での膝の軌跡を評価：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• スクワット時の膝の内側への倒れ込みの有無</li>
                    <li>• ランジ時の膝の安定性</li>
                    <li>• 階段上下での歩行パターン</li>
                    <li>• シングルレッグスタンスでの安定性</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                膝痛改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                膝痛改善には、膝を支える筋肉の強化、関節の可動域改善、そして正しい動作パターンの習得が必須です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">大臀筋強化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">膝の安定性を高める最重要トレーニング。ヒップスラスト、スクワット、ランジ、シングルレッグスクワットで、大臀筋を強化。弱い大臀筋は、膝痛の根本原因の一つです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">内側広筋の強化</h3>
                  <p className="text-gray-600 text-sm mb-2">膝の安定性に最も重要な筋肉。ウォールスクワット、シーテッドレッグエクステンション、ステップアップで、内側広筋を集中的に強化します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">股関節外転筋の強化</h3>
                  <p className="text-gray-600 text-sm mb-2">中臀筋と小臀筋の強化で、スクワット時の膝の内側への倒れ込みを防止。サイドクラムシェル、サイドライイングヒップアブダクション、バンドウォーク。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">股関節可動域改善</h3>
                  <p className="text-gray-600 text-sm mb-2">硬い股関節は、膝への過度な負荷を引き起こします。ピジョンポーズ、90/90ストレッチ、ヒップフレックスストレッチで、股関節の可動域を改善。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体幹安定化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">プランク、サイドプランク、デッドバグで、体幹の安定性を高めます。弱い体幹は、全身の運動パターンに悪影響を及ぼし、膝への負荷が増加します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">足首の安定化と可動域改善</h3>
                  <p className="text-gray-600 text-sm mb-2">足首が不安定だと、膝が代償的に動き、膝痛が悪化します。カーフレイズ、足関節の回内・回外運動、バランストレーニングで、足首の安定性を高めます。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                膝痛改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                膝痛改善には個人差がありますが、正しい方法で継続すれば、必ず改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">2～3週間目</h3>
                  <p className="text-gray-600 text-sm">軽度の膝痛であれば、初期的な改善を感じ始めます。日常生活での痛みが減り、簡単な運動時の痛みが軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">4～6週間目</h3>
                  <p className="text-gray-600 text-sm">明らかな改善を感じ始めます。階段の上り下りが楽になり、簡単なスクワットが痛みなくできるようになります。トレーニング強度を徐々に上げられるようになります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">12週間目（3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大幅な改善が実感できる時期。以前はできなかった動作（スクワット、ランジ、軽いランニング）が可能になり、膝の安定性が大きく向上します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目以上（6ヶ月以上）</h3>
                  <p className="text-gray-600 text-sm">改善した膝の状態が定着し、再発のリスクが大幅に低下します。強化された筋肉と改善された動作パターンが習慣化され、膝痛のない生活が確立されます。</p>
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
                  <span><strong>日常動作での正しいフォーム</strong> — 階段上下、スクワット、荷物を持つ時など、常に正しいフォームを心がけることが重要です</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>適切な靴選びと補助的なサポート</strong> — 足底アーチのサポート機能がある靴選びと、必要に応じたテーピングやサポーターの使用が、膝への負荷を軽減します</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">膝痛を根本から改善したい方へ</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              パーソナルトレーナーが、あなたの膝痛の原因を詳しく分析し、最適な改善プログラムを提案します。体験レッスンで、プロの評価と改善プランを受けることができます。
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
