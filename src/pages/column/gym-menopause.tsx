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
      question: "更年期とは、体にどのような変化が起こるのですか？",
      answer: "更年期は女性ホルモン（エストロゲン）の急激な低下により、基礎代謝が低下し、脂肪が蓄積しやすくなります。特に内臓脂肪が増え、お腹周りに脂肪がつきやすくなります。同時に骨密度が低下し、骨が弱くなるため、骨粗しょう症のリスクが高まります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "パーソナルトレーニングが更年期症状の改善に効果的な理由は？",
      answer: "定期的な運動によってホルモンバランスが整い、セロトニンなどの神経伝達物質が増加します。筋トレにより筋肉量が維持・増加し、基礎代謝が向上するため、ホットフラッシュ（火照り感）や気分の落ち込みが軽減され、睡眠の質も改善されます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "40～50代女性向けのトレーニングで最も重要なポイントは？",
      answer: "骨密度低下対策として、骨盤底筋群（膣・肛門周りの筋肉）と体幹トレーニングが最優先です。これらの筋肉を強化することで、骨への負荷が増加し、骨密度が向上します。また、低強度有酸素運動を組み合わせることで、関節への負荷を軽減しながら心肺機能を維持できます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ホットフラッシュや関節痛がある場合、トレーニングを控えるべき？",
      answer: "軽い症状であればトレーニングは続けるべきです。むしろ運動することで症状が軽減されるケースが多いです。ただし、高強度トレーニングは避け、温度管理ができた環境（冷房設備の整ったジム）で低～中強度のトレーニングを行うことをお勧めします。症状が強い場合は医師に相談してください。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "食事改善の際、特に意識すべき栄養素は？",
      answer: "カルシウム（骨密度維持）、タンパク質（筋肉合成）、イソフラボン（ホルモンバランス調整）が重要です。乳製品、豆製品、緑黄色野菜をバランスよく摂取し、特にタンパク質は1日体重1kg当たり1～1.2gの摂取を目指しましょう。パーソナルトレーナーや栄養士の指導を受けると効果的です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルトレーニングはいつ頃から始めるべき？",
      answer: "更年期の兆候が出始めたら、できるだけ早く始めることをお勧めします。40代後半から50代初期が目安です。早期に筋肉量を維持することで、更年期症状が軽くなり、骨密度低下を最小限に抑えられます。既に症状がある方でも遅くありません。パーソナルトレーナーの指導下で安全に始めましょう。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymMenopausePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "更年期とパーソナルトレーニング" },
  ];

  const pageTitle = "更年期とパーソナルトレーニング｜40・50代女性の体型変化と効果的な運動法";
  const pageUrl = `${baseSiteUrl}/column/gym-menopause/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="40・50代女性の更年期に起こる体型変化（基礎代謝低下・内臓脂肪増加・骨密度低下）のメカニズム、パーソナルトレーニングが更年期症状に効果的な理由、骨盤底筋・体幹トレーニング、ホットフラッシュや関節痛への対応、食事改善（カルシウム・タンパク質・イソフラボン）についてわかりやすく解説します。"
        path="/column/gym-menopause/"
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
              description: "40・50代女性の更年期に起こる体型変化のメカニズム、パーソナルトレーニングが更年期症状に効果的な理由、おすすめトレーニング内容、ホットフラッシュや関節痛への対応、食事改善との組み合わせ効果をわかりやすく解説します。",
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
              健康・年代別
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              40代・50代の女性が経験する更年期は、単なる加齢現象ではなく、女性ホルモンの急激な変化により、体に大きな影響をもたらします。基礎代謝が低下し、内臓脂肪が増加し、骨が弱くなる―これらの変化に対抗するために、パーソナルトレーニングは極めて有効です。本記事では、更年期に起こる体型変化のメカニズム、パーソナルトレーニングが更年期症状に効果的な理由、40～50代女性向けの推奨トレーニング内容、ホットフラッシュや関節痛への対応方法、そして食事改善との組み合わせ効果について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                更年期に起こる体型変化のメカニズム
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                更年期（45～55歳頃）に入ると、女性ホルモン・エストロゲンの急激な低下により、体は劇的に変わります。これは単なる加齢ではなく、ホルモン欠乏による生理的変化です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">基礎代謝の低下</h3>
                    <p className="text-gray-600">エストロゲンの減少により、基礎代謝が年1％程度低下します。食事量を変えなくても、30代比で10～15％の代謝低下が20年で蓄積。同じ食事量でも太りやすくなり、ダイエットが困難になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">内臓脂肪の増加</h3>
                    <p className="text-gray-600">エストロゲンは脂肪分布をコントロールしています。その減少により、脂肪がお腹周り（内臓脂肪）に蓄積しやすくなります。同じ体重でも、より太った見た目になり、生活習慣病のリスクが急増します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨密度の低下</h3>
                    <p className="text-gray-600">エストロゲンは骨の形成に必須。急激な低下により、更年期の5～7年で骨密度が年3～5％失われます。閉経後の女性は男性の4倍も骨粗しょう症になりやすく、転倒による大腿骨頸部骨折は寝たきりの原因になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">筋肉量の低下</h3>
                    <p className="text-gray-600">エストロゲンとテストステロンの両方が低下することで、筋肉量が加速度的に減少します。30代比で毎年0.5～1.0％の筋肉喪失が加速。筋肉が減ると、さらに基礎代謝が低下する悪循環に陥ります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーニングが更年期症状に効果的な理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルトレーニングは、更年期の体型変化と症状の両面に対して、科学的な根拠を持つ最強の対策です。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">ホルモンバランスの改善</h3>
                  <p className="text-gray-700 mb-3">定期的なレジスタンストレーニングにより、セロトニン・ドーパミン・エンドルフィン（気分向上ホルモン）が増加します。これにより、ホットフラッシュの頻度が50～60％減少、気分の落ち込みが改善され、更年期症状全体が軽減されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">基礎代謝の向上</h3>
                  <p className="text-gray-700 mb-3">筋肉量を1kg増やすと、基礎代謝が約20kcal/日向上します。週3回のトレーニングで6ヶ月間に2～3kg筋肉量が増えれば、基礎代謝が40～60kcal/日向上。年換算で14,600～21,900kcalの差になり、脂肪燃焼効果は驚異的です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">睡眠の質向上</h3>
                  <p className="text-gray-700 mb-3">運動は睡眠ホルモン・メラトニンの分泌を促進。更年期特有の不眠が改善されます。良好な睡眠はコルチゾール（ストレスホルモン）の低下につながり、ホットフラッシュと気分の落ち込みを同時に軽減します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">骨密度の維持・向上</h3>
                  <p className="text-gray-700 mb-3">レジスタンストレーニング（特に体重負荷が高いスクワット・デッドリフト）は、骨に直接負荷を加え、骨密度の低下を抑制・逆転させます。週3回の筋トレで骨密度の1～3％向上が報告されています。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                40～50代女性向けの推奨トレーニング内容
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                更年期女性にとって最適なトレーニングプログラムは、骨密度維持と筋肉量保持に特化したものです：
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. 骨盤底筋トレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">ケーゲル運動、骨盤底筋エクササイズ。膣・肛門周りの筋肉を強化。尿漏れ改善、骨盤安定化、性機能改善など、女性特有の課題解決に有効。毎日行うだけで3ヶ月で効果が出ます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. 体幹トレーニング（15分）</h3>
                  <p className="text-gray-600 text-sm">プランク、サイドプランク、デッドバグ、バードドッグ。脊椎周りの深い筋肉（インナーマッスル）を強化。骨を支える力が向上し、骨密度低下を抑制。姿勢も改善されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. レジスタンストレーニング（20分）</h3>
                  <p className="text-gray-600 text-sm">スクワット、デッドリフト、レッグプレス、腕立て伏せなど。大きな筋肉群（脚・背中・胸）に負荷をかけ、筋肉量を維持・増加。骨への負荷も高く、骨密度維持に極めて効果的。中等度の負荷（RPE6～7/10程度）が最適。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. 低強度有酸素運動（15～20分）</h3>
                  <p className="text-gray-600 text-sm">ウォーキング、サイクリング、エリプティカル。心拍数130～140程度の低～中強度。ホットフラッシュ対策として、高強度は避ける。レジスタンストレーニング後のクールダウン有酸素が最適。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">5. 柔軟性・バランストレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">ストレッチ、ヨガ、太極拳。転倒予防、関節可動域維持、リラックス効果。ホットフラッシュ時のストレス軽減に有効。</p>
                </div>
              </div>
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>推奨スケジュール：</strong> 週3回、1回60～70分。月・水・金またはそれに準ずる。回復日を確保し、無理なく継続することが成功の鍵です。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ホットフラッシュや関節痛がある場合の注意点
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                更年期特有の症状がある場合でも、適切な対応でトレーニングは継続できます：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ホットフラッシュ対策</h3>
                    <p className="text-gray-600">高強度トレーニングは避け、温度管理ができたジムを選ぶ。トレーニング後、急激に冷やさない（温度差による悪化を防止）。水分補給を頻繁に。運動時間帯は早朝か夕方を選ぶ（日中の気温差を避ける）。ホットフラッシュは運動で改善傾向なので、数週間で軽減します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">関節痛対策</h3>
                    <p className="text-gray-600">高強度の重量は避け、フォーム重視の軽～中負荷（RPE5～6/10）で実施。トレーニング前の十分なウォームアップ（15分）が必須。トレーニング後のストレッチとアイシングも重要。関節痛は筋肉強化で改善されるため、初期段階は我慢せず、医師の指導を仰ぐこと。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">気分の落ち込み対策</h3>
                    <p className="text-gray-600">グループレッスンを選ぶ、同じトレーナーをつけるなど、社会的サポートを増やす。達成感を得やすい目標設定（増加が目に見える重量設定など）も重要。ホルモン療法（HRT）とのバランスも医師に相談。運動自体が最強の抗うつ剤です。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事改善との組み合わせ効果
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                トレーニング効果を最大化するには、食事改善が不可欠です。更年期女性に特に重要な3つの栄養素：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">1. タンパク質（1日体重×1.2～1.5g）</h3>
                  <p className="text-gray-700 mb-3">筋肉合成に必須。鶏肉・魚・卵・乳製品・豆腐などから。トレーニング直後30分以内のプロテイン摂取で、筋肉合成効率が2倍向上。1回のメニューで20～25gの摂取がベスト。食事だけで賄えない場合、プロテインサプリメント活用も推奨。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">2. カルシウム（1日1,000～1,200mg）</h3>
                  <p className="text-gray-700 mb-3">骨密度維持の鍵。乳製品（ヨーグルト・チーズ・牛乳）、魚（イワシ・サバ）、緑黄色野菜（小松菜・ブロッコリー）から。ビタミンD（きのこ・鮭）との同時摂取で吸収率が7倍向上。毎食カルシウム源を意識的に取ること。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">3. イソフラボン（1日50～100mg）</h3>
                  <p className="text-gray-700 mb-3">大豆製品（豆腐・味噌・納豆・豆乳）に含まれ、エストロゲン様作用を持つ。ホットフラッシュ軽減、骨密度維持、肌艶改善に効果。毎日納豆1パック+豆乳1杯+豆腐50gで目標量クリア。ただし過剰摂取は避けること。</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>目標体重管理：</strong> 1ヶ月-0.5～1kg程度の緩やかな変化が理想的。急激なダイエット（月-2kg以上）は筋肉喪失を加速させるため厳禁。体重より体脂肪率（40％→35％）の改善を目指しましょう。
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                継続のための目標設定と記録方法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                更年期は人生で最も身体が変わりやすい時期です。だからこそ、適切な目標設定と記録が成功の鍵になります：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">SMART目標の設定</h3>
                    <p className="text-gray-600">「痩せたい」ではなく「3ヶ月で体脂肪率を3％低下させ、スクワット時の重量を5kg上げる」といった具体的・測定可能な目標。目標達成が実感でき、モチベーション維持につながります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">定期的な測定・記録</h3>
                    <p className="text-gray-600">月1回の体重・体脂肪率・ウエスト・ヒップ周囲径測定。毎回のトレーニング内容（種目・重量・回数）を記録し、進捗を可視化。パーソナルジムはデータ管理アプリで自動記録されることが多いため、活用すること。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">定期的なフォーム評価</h3>
                    <p className="text-gray-600">月1回、トレーナーに動画撮影してもらい、フォームを確認。正しいフォームはケガ予防と効果最大化の両面で重要。特に骨密度向上には、正確な負荷伝達が必須です。</p>
                  </div>
                </li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>継続期間：</strong> 体型変化が目に見える効果は6～12週間。しかし骨密度向上には最低3～6ヶ月必要。更年期症状（ホットフラッシュ・気分の落ち込み）の改善は3～4週間で実感できることが多いため、短期的な小さな成功を積み重ねることが、長期継続の鍵です。
                </p>
              </div>
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
              更年期の体型変化に立ち向かう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              更年期は人生の新しい章の始まり。適切なパーソナルトレーニングと栄養指導により、40代・50代からこそ最高の体が手に入ります。全国のパーソナルジムから、女性特有の課題に対応したジムを見つけましょう。
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
                href="/column/gym-diet-success/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムでダイエットを成功させる方法
                </h3>
                <p className="text-sm text-gray-600">
                  食事指導とトレーニングの組み合わせで確実に結果を出す方法
                </p>
              </Link>
              <Link
                href="/column/women-gym/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  女性向けパーソナルジムの選び方
                </h3>
                <p className="text-sm text-gray-600">
                  女性専用・混合ジムの違いと選択基準を解説
                </p>
              </Link>
              <Link
                href="/column/gym-metabolic/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  基礎代謝を高めるパーソナルトレーニング｜効率的な脂肪燃焼
                </h3>
                <p className="text-sm text-gray-600">
                  代謝向上のメカニズムと実践的なトレーニング方法
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
