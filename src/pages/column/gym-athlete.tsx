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
      question: "スポーツ選手・アスリートがパーソナルジムを利用する主な目的は何ですか？",
      answer: "パーソナルジムは、アスリートのパフォーマンス向上を科学的にサポートします。主な目的は：①競技特性に合わせた筋力強化（競技力向上）、②ケガの予防（解剖学的弱点の補強）、③オフシーズンのトレーニング（筋量維持・向上）、④リハビリテーション（復帰支援）、⑤栄養管理と併合による体脂肪率最適化。個別のスポーツ科学的アプローチにより、一般的なジムでは達成困難な、競技力の量的・質的向上が実現できます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "野球・サッカー・テニスなど異なる競技間で、トレーニング方針は大きく異なりますか？",
      answer: "はい、大きく異なります。野球投手は肩・肘の回旋力と体幹の安定性、サッカー選手は下肢爆発力と足関節の安定性、テニス選手は上肢の瞬発力と体幹の回旋力が求められます。パーソナルトレーナーは、各競技の動作分析（バイオメカニクス）を理解し、競技特性に合わせたカスタマイズプログラムを設計。一般的なボディメイクとは異なり、競技力向上に特化した専門的アプローチが必須です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "アスリートが効果を実感するまでの期間は一般人より短い？長い？",
      answer: "短期的な筋力向上は4～6週間で実感できます。ただし競技力（スコアやタイムなど）への反映は、トレーニング内容と専門性により大きく異なります。高度な専門性を持つトレーナーのもとで、競技特性に完全にカスタマイズされたプログラムであれば、8～12週間で顕著なパフォーマンス向上が期待できます。一方、汎用的なプログラムでは効果が限定的。パーソナルトレーナーのスポーツ科学的専門性が、成果の差を大きく左右します。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ケガ予防のためのパーソナルトレーニングは、どのような原理で機能しますか？",
      answer: "ケガは、筋力不均衡、可動域制限、神経筋コーディネーション不足から発生します。パーソナルトレーニングは、これらの解剖学的弱点を特定し、個別の補強を実施。例えば、野球投手の肩障害は、回旋外筋（ローテータカフ）の筋力不足と柔軟性低下が主原因。これらを科学的に改善することで、肩障害のリスクを大幅に低下させます。競技中のケガ予防という長期的視点が、短期的パフォーマンス向上と同等かそれ以上に重要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "オフシーズンと競技シーズン中で、トレーニング方針は異なりますか？",
      answer: "大きく異なります。オフシーズン（3～6ヶ月）は、高強度トレーニングに集中し、筋量・筋力の最大化を目指します。この時期に筋力基盤を構築することが、翌シーズンのパフォーマンスを大きく左右します。競技シーズン中は、獲得した筋力を維持しながら、競技特異的なパワー・スピード要素の練習に比重を移します。パーソナルトレーナーは、長期的なピーキング計画（年間計画）を立案し、シーズンに合わせてプログラムを動的に調整することが重要です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "栄養管理とパーソナルトレーニングの組み合わせで、アスリートのパフォーマンス向上効果はどの程度増幅されますか？",
      answer: "極めて大きいです。研究では、栄養管理なしのトレーニングと比較して、栄養管理を組み合わせると、筋力向上が30～50％、体脂肪率低下が40～60％増幅されることが報告されています。特に、タンパク質摂取量（体重×1.6～2.2g）、炭水化物タイミング（運動直後のリロード）、サプリメント（クレアチン・ベータアラニン等）の活用が重要。一流アスリートは、トレーナーだけでなく、栄養士とも連携し、個別化された食事計画を実施しています。パーソナルジムが栄養指導を提供している場合は、積極的に活用すべき価値が高いです。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymAthletePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "スポーツ選手・アスリートのパーソナルジム活用法" },
  ];

  const pageTitle = "スポーツ選手・アスリートのパーソナルジム活用法｜競技力向上と専門的トレーニング";
  const pageUrl = `${baseSiteUrl}/column/gym-athlete/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="スポーツ選手・アスリートのパーソナルジム活用法。競技特性に合わせたトレーニング設計、ケガの予防と復帰支援、野球・サッカー・テニス等各競技別アプローチ、オフシーズンと競技シーズンの違い、栄養管理とのシナジー、パフォーマンス向上に必要な専門的トレーニング方法をわかりやすく解説します。"
        path="/column/gym-athlete/"
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
              description: "スポーツ選手・アスリートのパーソナルジム活用法。競技特性に合わせたトレーニング設計、ケガの予防と復帰支援、各競技別アプローチ、オフシーズンと競技シーズンの違い、栄養管理とのシナジー、パフォーマンス向上に必要な専門的トレーニング方法をわかりやすく解説します。",
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
              競技力向上
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              スポーツ選手・アスリートにとって、パーソナルジムは単なる筋トレの場ではなく、競技力向上と怪我予防を実現する専門的支援の場です。競技特性に基づいた個別化されたトレーニングプログラムは、ジムでの汎用的なメニューでは決して実現できない、顕著なパフォーマンス向上をもたらします。本記事では、スポーツ選手がパーソナルジムから得るべき価値、競技特性に合わせたトレーニング設計の原理、野球・サッカー・テニス等各競技別の専門的アプローチ、ケガの予防と復帰支援、オフシーズンと競技シーズンの異なるトレーニング戦略、栄養管理とのシナジー効果、そして長期的なパフォーマンス向上計画について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                アスリートがパーソナルジムを選ぶべき理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムは、アスリートのパフォーマンス向上に不可欠な要素を、スポーツジムでは提供できません。その差別化要因を理解することが重要です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">競技特異的（Sport-Specific）トレーニング設計</h3>
                    <p className="text-gray-600">一般的なジムは、ボディメイクや健康目的の汎用的なプログラムしか提供できません。一方、パーソナルジムの優秀なトレーナーは、各競技のバイオメカニクス（動作学）を理解し、その競技で最も必要な筋力・パワー・スピード要素に特化したプログラムを設計します。例えば、野球投手と野手では、全く異なるトレーニングが必要です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">個別化されたケガ予防・リハビリテーション</h3>
                    <p className="text-gray-600">一般的なジムは、ケガ予防に対する科学的知識を持ちません。パーソナルトレーナーは、解剖学的な弱点を評価（ムーブメント・スクリーニング）し、ケガのリスク因子（筋力不均衡、可動域制限など）を特定。これらを個別に補強することで、慢性怪我を予防できます。既にケガがある場合も、医師と連携したリハビリプログラムで、安全かつ迅速な復帰支援が可能。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">パフォーマンス測定と科学的進捗管理</h3>
                    <p className="text-gray-600">優秀なパーソナルジムは、垂直跳び（爆発力測定）、20m走（加速力測定）、懸垂（上半身筋力）など、パフォーマンスの客観的指標を定期的に測定。これらのデータを基に、トレーニングプログラムを動的に調整します。数値の改善＝実際の競技力向上とは限りませんが、目安となる科学的指標を持つことで、トレーニングの効果検証が可能。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">長期的なピーキング計画（年間計画）</h3>
                    <p className="text-gray-600">競技選手には、オフシーズン・プレシーズン・競技シーズンごとに、異なるトレーニング目標が必要です。パーソナルトレーナーは、競技スケジュールを理解し、最大のパフォーマンスが「本番」で発揮されるよう、長期的な計画（マクロサイクル）を立案。単発のトレーニング効果ではなく、通年を見据えたパフォーマンス向上戦略が実施できます。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                競技別パーソナルトレーニング：具体的なアプローチ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                各競技には、異なる生理学的・バイオメカニクス的要求があります。以下は代表的な競技別アプローチです：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">野球選手向けトレーニング</h3>
                  <p className="text-gray-700 mb-3">投手：肩の回旋力（内旋・外旋筋）、体幹の安定性、股関節の可動域が最優先。肩障害予防が重要。トレーニング例：ケーブルローテーション、バンド外旋運動、プランク、シングルレッグデッドリフト。野手：下肢爆発力（スクワット・ジャンプ力）、上半身の回旋パワーが必要。スイング速度とスローイング速度の向上が目標。週3回、内容：体幹トレーニング10分、下肢パワー20分、上半身ローテーション10分、上肢筋力10分。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">サッカー選手向けトレーニング</h3>
                  <p className="text-gray-700 mb-3">下肢爆発力（キック力・スプリント力）と足関節の安定性が不可欠。また、上半身の強さ（ボール争い）も重要。トレーニング例：スクワット、デッドリフト、ハムストリング強化（ノルディックハムストリングカール）、シングルレッグバランス、プランク。高速での方向転換（アジリティ）能力も重要。週3～4回、内容：下肢最大筋力20分、爆発力トレーニング（ジャンプ・スプリント）15分、体幹安定性10分、足関節バランス10分。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">テニス選手向けトレーニング</h3>
                  <p className="text-gray-700 mb-3">上肢爆発力（サーブ速度・ショット力）、体幹の回旋パワー、下肢の側方安定性（横方向の動き）が求められます。肘・肩障害予防も重要。トレーニング例：ショルダープレス、ローテーションシット、シングルレッグスクワット、ケーブルローテーション、バンド外旋。週3～4回、内容：上半身パワー15分、体幹回旋力10分、下肢安定性10分、肩障害予防10分、柔軟性・モビリティ10分。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">陸上競技（長距離・短距離）選手向けトレーニング</h3>
                  <p className="text-gray-700 mb-3">短距離：下肢爆発力（スプリント力）の最大化、神経筋コーディネーション向上が最優先。トレーニング例：スクワット、ハングクリーン（パワー系）、バウンディング。長距離：経済走性（効率的な走動作）、体幹安定性、ケガ予防が重要。過度な筋肥大は避け、機能的強化に注力。週2～3回、内容：最大筋力トレーニング10分（短距離は多め、長距離は少なめ）、体幹トレーニング15分、ケガ予防10分。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ケガの予防と復帰支援：科学的アプローチ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                多くのアスリートは、ケガで競技を失う期間が、キャリアを左右します。パーソナルトレーニングによるケガ予防は、極めて重要です：
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. ムーブメント・スクリーニング（動作評価）</h3>
                  <p className="text-gray-600 text-sm">トレーニング開始時に、動作パターンを詳細に評価します。片脚スクワット、Y字バランス、肩関節可動域測定など、解剖学的な弱点を特定。これらの弱点が、ケガのリスク因子になります。例えば、片脚での安定性が低い場合、膝や足関節の損傷リスクが高まります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. リスク因子の個別補強</h3>
                  <p className="text-gray-600 text-sm">特定されたリスク因子に対して、個別的な補強運動を実施。例：片脚スクワット能力が低い→シングルレッグスクワットトレーニング、肩関節の可動域制限→肩甲骨や胸椎のモビリティワーク。これらの地味だが重要な補強を継続することで、ケガのリスクを40～50％低下させることが研究で示されています。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. 既存ケガからの安全な復帰プログラム</h3>
                  <p className="text-gray-600 text-sm">医師の許可を得て、段階的な復帰プログラムを実施。初期段階は、患部に過度な負荷をかけないようにしながら、周囲の筋肉を強化。中期段階で、患部への負荷を徐々に増加。後期段階で、競技特異的な動作を含める。無理な復帰は、二次的ケガを引き起こすため、科学的な段階化が必須。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. 神経筋コーディネーションの向上</h3>
                  <p className="text-gray-600 text-sm">バランストレーニング（片脚立ち、ボス運動）、反応性トレーニング（ラダードリル）により、神経筋の連携を向上。これにより、不意の衝撃（相手との接触など）に対する体の反応が向上し、ケガを防止できます。</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オフシーズンと競技シーズンの異なるトレーニング戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                年間を通じた計画的なトレーニング（ピーキング戦略）が、最高のパフォーマンスを実現します：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">オフシーズン（3～6ヶ月）：筋力基盤の構築</h3>
                    <p className="text-gray-600">この時期は、高強度レジスタンストレーニングに集中。目標：体重あたりの筋力向上（スクワット1RMが10～20kg増加など）。週3～4回、1回60～90分のトレーニング。内容：最大筋力トレーニング（ピリオドA：低回数・高重量）、筋肥大トレーニング（ピリオドB：中回数・中重量）、体幹・ケガ予防トレーニング。この時期に獲得した筋力が、次シーズンのパフォーマンスを大きく左右するため、最優先期。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">プレシーズン（4～8週）：筋力のパワー化</h3>
                    <p className="text-gray-600">獲得した筋力を、パワー（爆発力）に変換する時期。トレーニング内容：パワートレーニング（プリオメトリクス・ジャンプ系）、神経筋コーディネーション向上、競技特異的パワーの開発。週3～4回、1回60分。この時期での成功が、競技シーズンの初期パフォーマンスを決定。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">競技シーズン中：筋力維持とコンディショニング</h3>
                    <p className="text-gray-600">獲得した筋力を維持しながら、競技での疲労回復に注力。トレーニング内容：維持的筋力トレーニング（週2回、1回40～50分）、怪我の予防・リハビリ、疲労回復（ストレッチ・マッサージなど）。高強度トレーニングは最小化し、試合でのパフォーマンス発揮を優先。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                栄養管理との統合：パフォーマンス向上の相乗効果
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                トレーニングと栄養は、同等に重要です。栄養管理がなければ、トレーニング効果の50～60％が失われます：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">1. タンパク質摂取（1日体重×1.6～2.2g）</h3>
                  <p className="text-gray-700 mb-3">筋肉合成に最も重要。アスリートの場合、一般人（体重×0.8g）の2倍以上が必要。トレーニング直後30分以内に20～40gのタンパク質摂取で、筋肉合成効率が最大化。毎食20～30gのタンパク質を確保する計画的な食事管理が必須。鶏肉・魚・卵・プロテインサプリメントの活用。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">2. 炭水化物タイミング（運動直後のリロード）</h3>
                  <p className="text-gray-700 mb-3">高強度トレーニング後、筋グリコーゲンが枯渇します。この時期（30分以内）に、高GI炭水化物（白米・バナナ・ブドウ糖）を摂取することで、グリコーゲン再補給が加速。翌日以降のトレーニングパフォーマンスが向上。目安：体重1kg当たり炭水化物1～1.2gを運動直後に摂取。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">3. サプリメント活用（クレアチン・ベータアラニン等）</h3>
                  <p className="text-gray-700 mb-3">研究で効果が確認されているサプリメント：クレアチン（筋力5～15％向上）、ベータアラニン（高強度運動の持続時間延長）、カフェイン（神経集中力向上）。ただし、個人差が大きいため、医師・栄養士の指導下での活用が必須。禁止物質含有の確認も重要。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">4. 体脂肪率最適化（競技別に異なる）</h3>
                  <p className="text-gray-700 mb-3">各競技には、最適な体脂肪率が存在します。短距離走選手：5～8％、野球選手：8～12％、サッカー選手：7～10％。過度な低下は筋力損失につながるため、栄養管理と組み合わせた段階的な体脂肪率低下が必須。栄養士との連携が、成功の鍵です。</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナー選びのポイント：アスリート向け
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                アスリートのパフォーマンス向上は、トレーナーの専門性に大きく依存します。以下のポイントで選定してください：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">スポーツ科学の専門知識</h3>
                    <p className="text-gray-600">トレーナーが、あなたの競技に関する深い理解を持っているか確認。バイオメカニクス、神経筋生理学、スポーツ栄養学などの知識を持つトレーナーを選択。資格としては、CSCS（認定ストレングス・コンディショニング・スペシャリスト）やスポーツ栄養士資格を保有しているか確認。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">あなたの競技での指導経験</h3>
                    <p className="text-gray-600">同じ競技の選手を指導した経験があるか確認。例えば、野球選手を指導したいなら、複数の野球選手を指導した実績があるトレーナーを選択。競技特異的な知識の深さが異なります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">パフォーマンス測定と科学的進捗管理</h3>
                    <p className="text-gray-600">トレーナーが、垂直跳び・20m走・各種筋力測定などの客観的指標を定期的に測定し、データ管理するか確認。感覚的なトレーニング指導ではなく、科学的根拠に基づいたプログラム調整ができるか。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">医師・栄養士との連携体制</h3>
                    <p className="text-gray-600">ケガや栄養管理について、医師や栄養士と連携できるジムを選択。トレーナー単独では限界があります。総合的なサポート体制が整っているか確認。</p>
                  </div>
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
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              パーソナルトレーニングで競技力を次のレベルへ
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              スポーツ選手にとって、パーソナルジムは単なる筋トレの場ではなく、競技力向上とケガ予防を実現する専門的支援の場です。科学的アプローチに基づいた個別化されたプログラムで、あなたの可能性を最大化しましょう。全国のパーソナルジムから、スポーツ科学に基づいた指導ができるジムを見つけてください。
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

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/column/gym-injury-prevention/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  ケガの予防と復帰支援
                </h3>
                <p className="text-sm text-gray-600">
                  スポーツ選手のケガ予防戦略と医学的リハビリテーション
                </p>
              </Link>
              <Link
                href="/column/gym-nutrition-timing/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  トレーニングと栄養のタイミング
                </h3>
                <p className="text-sm text-gray-600">
                  筋力向上を最大化する栄養戦略
                </p>
              </Link>
              <Link
                href="/column/gym-sport/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  スポーツパフォーマンス向上
                </h3>
                <p className="text-sm text-gray-600">
                  競技力向上のための科学的トレーニング方法
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
