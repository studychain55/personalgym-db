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
      question: "トレーニング後の休息がなぜ重要なのですか？",
      answer: "筋肉の成長は、トレーニング中ではなく、その後の休息期間に起こります。トレーニングで微細なダメージを受けた筋肉が、修復される過程で、以前より強くなります。十分な休息がないと、筋肉の回復が追いつかず、疲労が蓄積し、パフォーマンスが低下します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "理想的なトレーニング間隔は何日ですか？",
      answer: "同じ筋肉グループのトレーニング間隔は、最低48時間（2日）必要です。週3回のパーソナルトレーニングが推奨される理由は、この回復時間を確保しながら、週に適切な刺激を与えられるからです。初心者は週2回、上級者は週4～5回が目安ですが、個人の回復能力によって調整が必要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "疲労が蓄積しているサインは？",
      answer: "疲労蓄積のサインは、パフォーマンス低下（いつもより重いウェイトが持てない）、持続的な筋肉痛（3日以上）、睡眠の質低下、食欲不振、免疫力低下（風邪を引きやすい）などです。このような兆候が見られたら、トレーニング強度を下げるか、完全休息日を取ることをお勧めします。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "アクティブリカバリーとは？",
      answer: "アクティブリカバリーは、低強度の運動（軽いウォーキング、ストレッチ、ヨガ、スイミング）を休息日に行う方法です。血流を促進し、乳酸の除去を加速させるため、完全休息より疲労回復が早くなる場合があります。ただし、疲労がひどい場合は、完全休息が優先です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "栄養とサプリメント、どちらが回復に重要ですか？",
      answer: "栄養が95％、サプリメントが5％程度の重要度です。特に重要なのは、タンパク質（1kg体重あたり1～1.2g）と炭水化物（筋グリコーゲン回復）です。これらが十分なら、サプリメントは補助的な役割に留まります。プロテインパウダーは便利ですが、鶏肉・卵・豆類などの食事から摂取することが最優先です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルトレーナーは回復管理もサポートしてくれますか？",
      answer: "良いパーソナルトレーナーは、トレーニングと同等の力で回復管理をサポートします。睡眠時間の確認、食事記録の分析、疲労度の聞き取り、トレーニング強度の調整などを行います。初回カウンセリングで、トレーナーが回復について質問するかどうかで、その質が判断できます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymRecoveryPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "トレーニング後の休息と回復" },
  ];

  const pageTitle = "パーソナルジムの休息・回復管理｜筋肉成長を最大化する休み方と栄養補給";
  const pageUrl = `${baseSiteUrl}/column/gym-recovery/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="トレーニング効果を最大化するための休息と回復の重要性、理想的なトレーニング間隔、疲労蓄積のサイン、アクティブリカバリーの方法、栄養補給（タンパク質・炭水化物・ミネラル）、睡眠の質向上、パーソナルトレーナーによる回復管理をわかりやすく解説します。"
        path="/column/gym-recovery/"
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
              description: "トレーニング効果を最大化するための休息と回復の重要性、理想的なトレーニング間隔、疲労蓄積のサイン、アクティブリカバリー、栄養補給（タンパク質・炭水化物・ミネラル）、睡眠の質向上、パーソナルトレーナーによる回復管理をわかりやすく解説します。",
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
              トレーニング方法
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              多くの人がパーソナルトレーニングの「努力」の部分にばかり注目しますが、実は筋肉の成長は休息中に起こります。トレーニング、栄養、睡眠のうち、どれが欠けてもトレーニング効果は半減します。本記事では、トレーニング効果を最大化するための休息と回復の科学、理想的なトレーニング間隔、疲労蓄積のサイン、アクティブリカバリーの方法、栄養補給（タンパク質・炭水化物・ミネラル）、睡眠の質向上、パーソナルトレーナーによる回復管理について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋肉成長は休息中に起こる
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                「筋肉は、トレーニングで成長する」―この言葉は、実は半分間違っています。正確には「筋肉は、トレーニングで刺激を受け、その後の休息中に成長する」のです。この基本原則を理解することが、パーソナルトレーニングの効果を最大化する鍵です。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニングの3段階</h3>
                  <ol className="text-gray-700 text-sm space-y-2">
                    <li><strong>第1段階（トレーニング中）：</strong> 筋肉が微細なダメージ（マイクロテア）を受けます。これが「筋肉痛」の原因になります。この時点では、まだ筋肉は成長していません。</li>
                    <li><strong>第2段階（トレーニング直後0～6時間）：</strong> 身体が「このダメージから守らなくては」と判断し、タンパク質合成が加速します。この時間帯が最も栄養補給が重要です。</li>
                    <li><strong>第3段階（トレーニング後6時間～48時間）：</strong> 筋肉が修復され、以前より強い筋肉へと再構築されます。この段階で、実際に筋肉が成長します。</li>
                  </ol>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                このプロセスを「超回復」と呼びます。超回復の完全なサイクルを確保しなければ、筋肉は成長しません。むしろ、休息なしにトレーニングを続けると、筋肉は成長せず、疲労が蓄積し、パフォーマンスが低下する悪循環に陥ります。
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>重要：</strong> 「疲労困憊するまで追い込むことが正義」という考え方は、実は逆効果です。パーソナルトレーニングの目的は「適切な刺激と回復のバランス」を実現することです。
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                理想的なトレーニング間隔と週単位での計画
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                効果的なトレーニングプログラムを組むには、「同じ筋肉グループの回復時間」を確保することが不可欠です。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">同じ筋肉グループの最小回復間隔</h3>
                  <ul className="text-gray-600 text-sm space-y-2 mb-4">
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                      <span><strong>初心者（トレーニング経験1年未満）：</strong> 最低72時間（3日）の回復期間が必要。同じ筋肉グループは週1回が目安。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                      <span><strong>中級者（トレーニング経験1～3年）：</strong> 48時間（2日）で回復。週2回、同じ筋肉グループのトレーニングが可能。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                      <span><strong>上級者（トレーニング経験3年以上）：</strong> 24～48時間で回復。週2～3回、同じ筋肉グループのトレーニングが可能。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">推奨トレーニングスケジュール（初心者・中級者向け）</h3>
                  <div className="text-gray-700 text-sm font-mono space-y-1 mb-4 bg-white p-3 rounded border border-gray-300">
                    <p><strong>月曜：</strong> 脚トレーニング + コア</p>
                    <p><strong>火曜：</strong> 有酸素運動 + ストレッチ（回復日）</p>
                    <p><strong>水曜：</strong> 上半身（背中・胸・肩）</p>
                    <p><strong>木曜：</strong> 完全休息</p>
                    <p><strong>金曜：</strong> 脚トレーニング（軽め）+ コア</p>
                    <p><strong>土日：</strong> 完全休息またはアクティブリカバリー</p>
                  </div>
                  <p className="text-gray-600 text-sm">このスケジュールにより、脚トレーニングは4日間隔（月→金）で刺激を与えながら、十分な回復時間を確保します。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                疲労蓄積のサインと過剰トレーニング症候群
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                休息不足により、「過剰トレーニング症候群（オーバートレーニング）」に陥ることがあります。以下のサインが見られたら、要注意です：
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">パフォーマンス低下のサイン</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>いつもより重いウェイトが持てなくなった</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>同じフォーム・強度でも、すぐに疲れるようになった</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>トレーニング中にモチベーションが湧かない</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>最後のセットで力が抜ける（疲労困憊が著しい）</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">身体的なサイン</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>筋肉痛が3日以上続く（通常は1～2日）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>原因不明の関節痛が出現する</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>心拍数が通常より高い（安静時心拍数 +5～10拍）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>免疫力低下（風邪を引きやすい）</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">生活習慣の変化</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>睡眠の質が低下（すぐに目が覚める、深く眠れない）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>食欲不振（特にタンパク質が食べたくなくなる）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>抑うつ気分・イライラ</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>日中の疲労感が取れない</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>対処法：</strong> これらのサインが見られたら、すぐにパーソナルトレーナーに相談してください。通常は、1～2週間の休息、またはトレーニング強度を30～50％低下させることで、快復します。自己判断で継続すると、回復に2～3ヶ月かかる場合もあります。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                アクティブリカバリーと完全休息のバランス
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                「休息」は、完全に何もしないことだけではありません。活動的な回復も、重要な戦略です。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">アクティブリカバリーとは</h3>
                  <p className="text-gray-600 text-sm mb-3">アクティブリカバリーは、低強度の運動を休息日に行い、血流を促進して疲労回復を加速させる方法です。以下のような活動が該当します：</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                      <span><strong>軽いウォーキング</strong>（心拍数100～110程度、15～20分）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                      <span><strong>ストレッチ</strong>（静的ストレッチ、1部位30秒×3セット）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                      <span><strong>ヨガ</strong>（リストラティブヨガなど、ゆったりペース）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                      <span><strong>スイミング</strong>（クロール以外、浮く・漂う程度）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                      <span><strong>軽いサイクリング</strong>（ロードバイクではなく、のんびりペース）</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">アクティブリカバリーのメリット</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold">✓</span>
                      <span><strong>乳酸除去を加速：</strong> 軽い運動により、血流が増加し、筋肉に溜まった乳酸が除去される速度が向上します。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold">✓</span>
                      <span><strong>DOMS（遅発性筋肉痛）の軽減：</strong> 血流増加により、筋肉の修復が促進され、筋肉痛が軽くなります。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold">✓</span>
                      <span><strong>心理的リフレッシュ：</strong> 運動することで、ストレスホルモン（コルチゾール）が低下し、気分が改善されます。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold">✓</span>
                      <span><strong>運動習慣の維持：</strong> 完全休息より、運動への心理的習慣が維持されやすいです。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">完全休息が必要な場合</h3>
                  <p className="text-gray-600 text-sm mb-3">以下のような場合は、アクティブリカバリーではなく、完全休息を優先してください：</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>疲労が著しい（朝起きて、昨日の疲労が全く取れていない）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>睡眠不足が続いている</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>風邪やインフルエンザで体調不良</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold">●</span>
                      <span>仕事のストレスが高い時期</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                栄養補給で加速する筋肉成長と回復
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                回復プロセスで最も重要なのが、栄養補給です。高度なトレーニング + 不十分な栄養 = 効果ゼロです。パーソナルトレーニングの成果を最大化する栄養管理を解説します。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. トレーニング直後30分以内の栄養補給</h3>
                  <p className="text-gray-600 text-sm mb-3">この時間帯は「ゴールデンタイム」と呼ばれ、筋肉のタンパク質合成が最大になります。理想的な栄養補給は：</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                      <span><strong>タンパク質：</strong> 20～40g（プロテインパウダー、鶏肉、卵など）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                      <span><strong>炭水化物：</strong> 40～80g（白米、バナナ、パンなど、GI値高め）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                      <span><strong>理由：</strong> タンパク質で筋肉修復、炭水化物で筋グリコーゲン（エネルギー）を回復させます。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 1日全体でのタンパク質摂取</h3>
                  <p className="text-gray-600 text-sm mb-3"><strong>推奨：</strong> 1kg体重あたり1～1.2gのタンパク質</p>
                  <p className="text-gray-600 text-sm mb-3">例）体重70kgの場合、1日70～84gのタンパク質が必要です。内訳：</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                      <span><strong>朝食：</strong> 卵3個 + ツナ缶（20g）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                      <span><strong>昼食：</strong> 鶏肉150g（40g）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">3.</span>
                      <span><strong>夕食：</strong> 牛肉150g（40g）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">4.</span>
                      <span><strong>合計：</strong> 100g（十分）</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 炭水化物の役割：エネルギー回復</h3>
                  <p className="text-gray-600 text-sm mb-3">筋肉は、グリコーゲン（炭水化物の貯蔵形態）をエネルギー源として使用します。トレーニング後、グリコーゲンが枯渇しているため、素早い補給が必要です。</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">1.</span>
                      <span><strong>推奨量：</strong> 1日体重1kg当たり4～6gの炭水化物（体重70kg = 280～420g）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">2.</span>
                      <span><strong>GI値を意識：</strong> トレーニング直後は、GI値が高い炭水化物（白米・バナナ）を優先。その他の時間帯は、GI値が低い炭水化物（玄米・全粒粉）を選択。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. ミネラル・ビタミン補給</h3>
                  <p className="text-gray-600 text-sm mb-3">タンパク質と炭水化物ばかりに注目されていますが、ミネラル・ビタミンも回復に不可欠です：</p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">1.</span>
                      <span><strong>マグネシウム：</strong> 筋肉の弛緩、睡眠の質向上（ナッツ、ほうれん草）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">2.</span>
                      <span><strong>亜鉛：</strong> テストステロン分泌、免疫力向上（牡蠣、牛肉）</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">3.</span>
                      <span><strong>ビタミンC：</strong> 抗酸化作用、コラーゲン合成（オレンジ、キウイ）</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                睡眠の質とトレーニング回復の関係
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                筋肉成長ホルモン（成長ホルモン）は、睡眠中の深睡眠時に最も分泌されます。睡眠の質が低いと、回復が著しく低下します。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">成長ホルモンと睡眠の関係</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">1.</span>
                      <span><strong>成長ホルモンの役割：</strong> 筋肉合成、骨密度維持、脂肪分解を促進。1日の成長ホルモンの70～80％は、睡眠中（特に深睡眠）に分泌されます。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">2.</span>
                      <span><strong>睡眠不足の影響：</strong> 成長ホルモン分泌が低下し、筋肉合成が50～60％低下。3日の睡眠不足で、トレーニング1ヶ月分の効果が帳消しになることもあります。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">睡眠の質を高める5つの方法</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">1.</span>
                      <span><strong>睡眠時間を確保：</strong> 最低7～9時間。初心者は8時間が目安。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">2.</span>
                      <span><strong>就寝時間の一定化：</strong> 毎日同じ時刻に寝て、起きる。体のリズムを安定化。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">3.</span>
                      <span><strong>就寝1時間前のスクリーン制限：</strong> ブルーライトがメラトニン（睡眠ホルモン）分泌を阻害。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">4.</span>
                      <span><strong>トレーニングは就寝3時間前まで：</strong> 就寝直前の高強度トレーニングは、睡眠を阻害。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">5.</span>
                      <span><strong>室温の最適化：</strong> 16～19℃が深睡眠を促進。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる回復管理のサポート
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                質の高いパーソナルトレーニングは、トレーニング時間だけではなく、回復管理も含めてサポートされるべきです。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">初回カウンセリングで確認すべき点</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">1.</span>
                      <span><strong>睡眠時間の聞き取り：</strong> 「毎晩何時に寝て、何時に起きるのか」を質問するか。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">2.</span>
                      <span><strong>食事記録のチェック：</strong> 食事内容・時間帯の確認を行うか。栄養不足をすぐに指摘できるか。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">3.</span>
                      <span><strong>疲労度の確認：</strong> 毎回のセッション開始時に「疲労度は何点ですか」と聞くか。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-707 font-bold flex-shrink-0">4.</span>
                      <span><strong>トレーニング強度の調整：</strong> 疲労が高い場合、強度を柔軟に低下させるか。「疲労困憊まで追い込む」を強要しないか。</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">優秀なトレーナーのサポート内容</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex gap-2">
                      <span className="text-green-707 font-bold">✓</span>
                      <span><strong>栄養指導：</strong> 食事記録アプリ（MyFitnessPal等）で記録を確認し、改善点を毎週指摘。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-707 font-bold">✓</span>
                      <span><strong>睡眠管理：</strong> 睡眠時間と質を聞き、改善が必要な場合は、就寝時刻やルーティンを提案。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-707 font-bold">✓</span>
                      <span><strong>トレーニングプログラムの調整：</strong> 毎週の疲労度に基づき、翌週のメニューを変更。</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-707 font-bold">✓</span>
                      <span><strong>セルフケア指導：</strong> ストレッチ、フォームローラー、瞑想など、自宅での回復プロトコルを教育。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                回復管理を含むパーソナルトレーニングを選ぼう
              </h2>
              <p className="text-gray-700 mb-4">
                トレーニング、栄養、睡眠の3つが揃ってこそ、初めてパーソナルトレーニングの効果が最大化されます。無料体験時に「回復管理をどのようにサポートしてくれるのか」を必ず質問しましょう。パーソナルトレーナーの回答内容で、その質が判断できます。
              </p>
              <p className="text-gray-700">
                短期的な「疲労困憊」ではなく、長期的な「持続可能な成長」を目指すパーソナルジムを選ぶことが、人生を変えるトレーニング経験につながります。
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
