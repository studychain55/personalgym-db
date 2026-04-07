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
      question: "パーソナルジムでの体重減量は月何kg程度が現実的ですか？",
      answer: "安全で持続可能なペースは月1～2kg です。週0.5～1kgの減量が理想的です。月3kg以上の急速な減量は筋肉減少や代謝低下を招き、リバウンドのリスクが高まります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ダイエット中は筋肉が落ちないようにするにはどうすればいい？",
      answer: "適切なタンパク質摂取（体重×1.5～2g）とレジスタンストレーニングが必須です。パーソナルジムでのトレーニングで筋肉への刺激を保つことで、筋肉減少を最小化できます。栄養管理が非常に重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "ダイエット中の食事制限はどの程度までするべき？",
      answer: "急激な食事制限は避け、現在の摂取カロリーから300～500kcal削減する程度が目安です。必須栄養素（タンパク質、ビタミン、ミネラル）を確保しながら、カロリー収支を調整することが大切です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "リバウンドを防ぐにはどうすればいい？",
      answer: "ダイエット期間中から食事習慣を改善し、卒業後も継続することが大切です。月1～2回のジム利用継続、日常活動量の維持、栄養バランスを意識した食事を心がけることで、リバウンド率を大幅に低減できます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "ダイエット中の運動強度はどう調整すればいい？",
      answer: "有酸素運動＋レジスタンストレーニングの組み合わせが有効です。週2～3回のパーソナルトレーニング（筋トレ）と週1～2回の有酸素運動（ランニング、バイク等）が効果的です。過度な有酸素運動は筋肉減少につながるため注意。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "体重が落ちない停滞期はどう対応すればいい？",
      answer: "3～4週間以上体重が変わらない場合は、トレーナーと相談してプログラムを変更します。食事内容の見直し、トレーニング強度の調整、チートデイの導入など、複合的なアプローチが有効です。焦らず継続することが重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymWeightLossPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでの体重減量完全ガイド" },
  ];

  const pageTitle = "パーソナルジムでの体重減量完全ガイド｜リバウンドなし・成功の法則";
  const pageUrl = `${baseSiteUrl}/column/gym-weight-loss/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでの体重減量方法を完全解説。月1～2kg の安全なペース、筋肉維持の栄養戦略、停滞期の対応、リバウンド防止まで、科学的根拠に基づいた実践的なガイド。"
        path="/column/gym-weight-loss/"
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
              description: "パーソナルジムでの体重減量方法を完全解説。月1～2kg の安全なペース、筋肉維持の栄養戦略、停滞期の対応、リバウンド防止まで、科学的根拠に基づいた実践的なガイド。",
              url: pageUrl,
              datePublished: "2026-04-07",
              dateModified: "2026-04-07",
              author: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "ExerciseGym",
                name: "パーソナルジムナビ",
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <article>
          <div className="mt-4">
            <span className="text-xs font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-full">
              体重減量
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでのダイエット成功の鍵は、「急速な減量を避け、安全で持続可能なペースを守る」ことです。このガイドでは、月1～2kg の健康的な体重減量法、筋肉を維持しながら脂肪を落とす栄養戦略、停滞期の乗り越え方、そしてリバウンド防止の長期戦略をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                健康的な体重減量のペース設定
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエットの成功は、目標設定とペース配分で大きく左右されます。科学的根拠に基づいた現実的なペースを理解することが、継続と成功の第一歩です。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-transparent rounded-lg p-5 border-l-4 border-red-500">
                  <h3 className="font-bold text-gray-900 mb-3">推奨：月1～2kg の減量ペース</h3>
                  <p className="text-gray-700 mb-4">
                    これは栄養学、運動科学の現在のコンセンサスに基づいた安全なペースです。このペースで減量すると、筋肉の減少を最小化しながら、脂肪を効率的に落とせます。
                  </p>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">計算方法</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      1kg の脂肪 = 約7,000kcal なので、月1kg 減量には月7,000kcal のカロリー不足が必要です。
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ <strong>月1kg 減量</strong>：1日230kcal の不足（7,000kcal ÷ 30日）</li>
                      <li>✓ <strong>月2kg 減量</strong>：1日460kcal の不足（14,000kcal ÷ 30日）</li>
                    </ul>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ <strong>メリット</strong>：筋肉減少が少ない、持続可能、リバウンドリスク低い</li>
                    <li>✓ <strong>期間の目安</strong>：10kg 減量なら5～10ヶ月かかります</li>
                    <li>✓ <strong>体感</strong>：3～4ヶ月で見た目の変化を実感</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-transparent rounded-lg p-5 border-l-4 border-yellow-500">
                  <h3 className="font-bold text-gray-900 mb-3">避けるべき：月3kg以上の急速な減量</h3>
                  <p className="text-gray-700 mb-4">
                    多くの人が「3ヶ月で10kg」などの急速な減量を目指しますが、これは避けるべきです。健康と美しさを損ないます。
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✗ <strong>筋肉の著しい減少</strong>：脂肪だけでなく筋肉も大幅に失う</li>
                    <li>✗ <strong>基礎代謝の低下</strong>：筋肉が減ると代謝が低下し、ダイエット後にリバウンドしやすくなる</li>
                    <li>✗ <strong>肌のハリ・ツヤの喪失</strong>：急速な減量で皮膚がたるむ</li>
                    <li>✗ <strong>栄養不足</strong>：必須栄養素が不足し、疲労や免疫低下につながる</li>
                    <li>✗ <strong>ホルモンバランスの乱れ</strong>：月経不順や情動不安定になる可能性</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-transparent rounded-lg p-5 border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-900 mb-3">実例：現実的なダイエット期間の目安</h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <div className="bg-white rounded p-3">
                      <strong>目標：5kg 減量</strong>
                      <p className="mt-1">月1kg のペース → <span className="font-bold text-green-700">5ヶ月</span></p>
                      <p className="text-xs text-gray-600 mt-1">1日230kcal の不足で達成</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>目標：10kg 減量</strong>
                      <p className="mt-1">月2kg のペース → <span className="font-bold text-green-700">5ヶ月</span></p>
                      <p className="text-xs text-gray-600 mt-1">1日460kcal の不足で達成</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>目標：15kg 減量</strong>
                      <p className="mt-1">月2kg のペース → <span className="font-bold text-green-700">7～8ヶ月</span></p>
                      <p className="text-xs text-gray-600 mt-1">継続性を重視、停滞期を考慮</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット中の筋肉維持戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                脂肪を落としながら筋肉を維持することで、美しいボディラインと高い基礎代謝が保たれます。パーソナルジムでの効果的な筋肉維持方法を紹介します。
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">1. タンパク質摂取量の確保</h3>
                  <p className="text-gray-700 mb-3">
                    ダイエット中は通常より多くのタンパク質が必要です。これは、カロリー制限下でも筋肉の分解を防ぐためです。
                  </p>
                  <div className="bg-white rounded p-3 mb-3">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">タンパク質摂取目安</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ <strong>通常時</strong>：体重×0.8～1.0g /日</li>
                      <li>✓ <strong>ダイエット中</strong>：体重×1.5～2.0g /日</li>
                      <li>✓ <strong>例</strong>：体重70kg の場合、105～140g /日のタンパク質が必要</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    3食でタンパク質を均等に配分（各食35～47g）することで、筋肉合成が最適化されます。プロテインパウダーを活用して、効率的に必要量を摂取しましょう。
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">2. レジスタンストレーニング（筋トレ）の継続</h3>
                  <p className="text-gray-700 mb-3">
                    ダイエット中でも週2～3回のパーソナルトレーニングで、筋肉への刺激を維持します。これにより、筋肉減少を最小化できます。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>トレーニング内容</strong>：大きな筋肉（脚、背中、胸）を優先的に鍛える</li>
                    <li>✓ <strong>強度</strong>：最大筋力の70～80%の負荷でトレーニング</li>
                    <li>✓ <strong>セット数</strong>：各種目8～12レップ×3セットが目安</li>
                    <li>✓ <strong>ポイント</strong>：トレーニング前後の栄養補給を忘れずに</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">3. カロリー不足を適切に管理</h3>
                  <p className="text-gray-700 mb-3">
                    急激なカロリー制限は筋肉減少につながるため、1日300～500kcal の緩やかな不足に留めることが重要です。
                  </p>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>カロリー計算の例</strong>（体重70kg、デスクワーク、週2回トレーニング）
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• 基礎代謝：約1,680kcal</li>
                      <li>• 活動代謝：約600kcal（日常活動）</li>
                      <li>• トレーニング：約300kcal（週2回）</li>
                      <li>• <strong>合計</strong>：約2,580kcal /日</li>
                      <li>• <strong>ダイエット時の目標</strong>：2,100～2,280kcal /日</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">4. 栄養バランスを維持</h3>
                  <p className="text-gray-700 mb-3">
                    タンパク質に注力しつつ、ビタミン・ミネラルも確保することで、体の機能を正常に保ちます。
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                    <div className="bg-white rounded p-2">
                      <strong>タンパク質</strong>
                      <p>鶏肉、魚、卵、豆、乳製品</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <strong>炭水化物</strong>
                      <p>玄米、蕎麦、イモ類</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <strong>脂質</strong>
                      <p>魚、ナッツ、オリーブオイル</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <strong>野菜・果物</strong>
                      <p>多種類、毎日摂取</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                停滞期を乗り越える方法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット中、3～4週間以上体重が変わらない停滞期が必ず訪れます。これは正常な生体反応です。適切な対応で乗り越えましょう。
              </p>

              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-300 mb-6">
                <h3 className="font-bold text-gray-900 mb-2">停滞期の原因</h3>
                <p className="text-gray-700 text-sm">
                  体が現在のカロリー摂取量に適応して、エネルギー消費を削減します。これを「適応」と呼び、人体の自己防衛機構です。焦らず、戦略的に対応することが重要です。
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">対策1：トレーニング内容の変更</h3>
                  <p className="text-gray-700 text-sm">
                    同じプログラムを続けると、筋肉が適応して消費カロリーが減少します。トレーナーと相談して、種目、セット数、負荷を変更し、新たな刺激を筋肉に与えましょう。
                  </p>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">対策2：カロリー調整</h3>
                  <p className="text-gray-700 text-sm">
                    100～200kcal さらに減らすか、逆に100～200kcal 増やしてホルモンバランスをリセットする方法もあります。トレーナーと相談して調整します。
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">対策3：チートデイの導入</h3>
                  <p className="text-gray-700 text-sm">
                    週1回、カロリー制限を解いて通常量を食べる日を設けます。これにより、代謝が回復し、停滞期が短縮される場合があります。ただし、暴食は避けて、栄養バランスを意識しましょう。
                  </p>
                </div>

                <div className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">対策4：有酸素運動の追加</h3>
                  <p className="text-gray-700 text-sm">
                    週1～2回のランニングやバイクを追加し、消費カロリーを増やします。ただし、過度な有酸素運動は筋肉減少につながるため、週3回程度に留めましょう。
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">対策5：忍耐と継続</h3>
                  <p className="text-gray-700 text-sm">
                    停滞期は通常2～4週間で突破できます。焦らず、タンパク質摂取と栄養バランスを意識しながら、継続することが最も重要です。体重計ばかり見ずに、鏡での見た目や洋服のサイズ感で判定するのも効果的です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                リバウンド防止の長期戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット成功後、多くの人がリバウンドに悩みます。これは、ダイエット期間中に「一時的な行動変化」に留めていることが原因です。「習慣化」と「長期継続」が重要です。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">ステップ1：ダイエット期間中から習慣化を意識</h3>
                  <p className="text-gray-700 mb-3">
                    ダイエットは「我慢の期間」ではなく、「新しい習慣を身につける期間」と捉えることが大切です。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>食事習慣</strong>：「○○を食べない」ではなく「毎日タンパク質○gを摂取する」と考える</li>
                    <li>✓ <strong>運動習慣</strong>：「ダイエットのため」ではなく「健康維持のため」と思考をシフト</li>
                    <li>✓ <strong>期間</strong>：3ヶ月以上の習慣形成が必要です（初めの1～2ヶ月は忍耐）</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-transparent rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">ステップ2：目標達成後の食事管理の継続</h3>
                  <p className="text-gray-700 mb-3">
                    ダイエット目標達成後も、食事管理を緩和するだけで、完全に止めてはいけません。
                  </p>
                  <div className="bg-white rounded p-3 mb-3">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">食事管理の段階的緩和</h4>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span><strong>ダイエット期間</strong></span>
                        <span>カロリー厳密管理、外食は週1～2回</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>目標達成直後</strong></span>
                        <span>カロリー管理継続、外食は週2～3回</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>3～6ヶ月後</strong></span>
                        <span>大まかなカロリー意識、外食は週3～4回</span>
                      </div>
                      <div className="flex justify-between">
                        <span><strong>1年以上継続</strong></span>
                        <span>タンパク質と栄養バランスを意識、完全な食事制限なし</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-transparent rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">ステップ3：継続的なジム利用</h3>
                  <p className="text-gray-700 mb-3">
                    目標達成後も月1～2回程度ジムに通い、得た知識を維持し、体型を定期的に確認することが大切です。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>月1～2回</strong>：フォームの修正、新しいトレーニング方法の習得</li>
                    <li>✓ <strong>自宅トレーニング</strong>：週1～2回のセルフトレーニングで基礎代謝を維持</li>
                    <li>✓ <strong>定期測定</strong>：月1回の体脂肪率測定で、数値的な変化を追跡</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-transparent rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-3">ステップ4：生活習慣の定着</h3>
                  <p className="text-gray-700 mb-3">
                    食事と運動と同等に、睡眠と日常活動量の管理も重要です。
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>睡眠</strong>：毎日7～8時間の質の高い睡眠を確保（ホルモン分泌に影響）</li>
                    <li>✓ <strong>日常活動</strong>：エスカレータを使わず階段を利用、駅の1駅前で下車など、日常活動量を意識的に増やす</li>
                    <li>✓ <strong>ストレス管理</strong>：瞑想、アロマテラピー、友人との時間など、心身のリセットを心がける</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの活用で確実に成功する理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                自己流のダイエットと比較して、パーソナルジムが高い成功率を持つ理由を説明します。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3">1. 科学的根拠に基づく方法</h3>
                  <p className="text-gray-700 text-sm">
                    トレーナーは栄養学、運動学に基づいたプログラムを組みます。インターネット情報の誤り（急速な減量法など）を避けられます。
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-3">2. 個別カスタマイズ</h3>
                  <p className="text-gray-700 text-sm">
                    体質、生活スタイル、目標に合わせてプログラムが調整されます。停滞期にも柔軟に対応可能です。
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3">3. 継続性の向上</h3>
                  <p className="text-gray-700 text-sm">
                    予約制・トレーナーとの関係が動機づけになり、継続率が高いです。自己流で挫折しやすい人でも成功しやすい。
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-bold text-gray-900 mb-3">4. リバウンド防止</h3>
                  <p className="text-gray-700 text-sm">
                    ダイエット期間中から習慣化を意識し、目標達成後も継続的にサポートしてくれるため、リバウンドリスクが低い。
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-8 border border-red-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                安全で確実なダイエットを始めよう
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムでの体重減量は、単なるダイエットではなく「ライフスタイルの改善」です。プロのトレーナーと一緒に、科学的かつ持続可能な方法で目標達成を目指しましょう。
              </p>
              <p className="text-gray-700 mb-6">
                パーソナルジムナビでは、あなたの目標と予算に合ったジムを探すことができます。複数のジムで無料体験を受けて、自分に合ったパートナーを見つけてください。
              </p>
              <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition">
                パーソナルジムを探す →
              </Link>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
