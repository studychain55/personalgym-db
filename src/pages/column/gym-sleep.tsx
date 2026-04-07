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
      question: "運動と睡眠にはどのような相関関係があるのですか？",
      answer: "定期的な中～高強度の運動は、深睡眠（NREM3ステージ）の割合を20～30%増加させます。運動により脳の神経活動が調整され、入眠潜時（寝付くまでの時間）が短縮され、総睡眠時間が延長します。特にパーソナルトレーニングのような計画的な運動は、睡眠構造を改善する最強の手段です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "夜遅い高強度トレーニングが睡眠を妨げる理由は？",
      answer: "就寝3時間前に高強度運動を行うと、交感神経が優位になり、コルチゾール（ストレスホルモン）とアドレナリンが上昇します。これらのホルモンは睡眠ホルモン・メラトニン分泌を抑制。運動後3～4時間は脳が興奮状態（core body temperature上昇）が続くため、就寝前の高強度運動は避けるべきです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "睡眠の質向上に最適なトレーニングの時間帯は？",
      answer: "午前7～9時（早朝）または午後14～17時（昼～夕方）がベスト。早朝運動は体内時計をリセットし、夜間のメラトニン分泌を促進。午後運動は、就寝3～4時間前に完了させれば、就寝時に体温が低下し、入眠が促進されます。夜21時以降の運動は睡眠を害するため避けてください。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "睡眠不足がトレーニング効果を下げる理由は？",
      answer: "睡眠不足により、筋肉成長ホルモン（HGH）の分泌が50%以上低下し、テストステロン（筋肉合成ホルモン）が25～30%減少します。同時にコルチゾール（筋肉分解ホルモン）が増加。結果として、筋力向上は1/3以下に低下し、脂肪燃焼効率も60%減少します。トレーニング効果を最大化するには、質の良い7～9時間の睡眠が必須です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "睡眠改善に特化したパーソナルジムのアプローチは？",
      answer: "睡眠改善プログラムでは、朝日を浴びるような運動時間設定、週3回の計画的な筋トレ、就寝前のストレッチ・瞑想サポート、食事時間指導（カフェイン制限・トリプトファン摂取）を組み合わせます。パーソナルトレーナーがハイテク睡眠計測（ウェアラブル）でモニタリングし、個別最適化されたプログラムが提供されます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "就寝前ストレッチと呼吸法はどの程度効果がありますか？",
      answer: "就寝30～60分前に10～15分のストレッチと腹式呼吸を実施すると、副交感神経が優位になり、メラトニン分泌が促進され、入眠潜時が20～30分短縮されます。4～4～8秒呼吸法（4秒吸って4秒止めて8秒かけてゆっくり吐く）は、自律神経のバランス調整に非常に効果的。毎夜実施すれば、睡眠の質が1～2週間で体感できます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymSleepPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "睡眠の質とパーソナルトレーニング" },
  ];

  const pageTitle = "睡眠の質とパーソナルトレーニング｜運動が睡眠に与える効果と注意点";
  const pageUrl = `${baseSiteUrl}/column/gym-sleep/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="運動と睡眠の相関関係、適度な運動が深睡眠を増やすメカニズム、夜遅い高強度トレーニングが睡眠を妨げる理由、睡眠向上に効果的なトレーニング時間帯と強度、睡眠不足がトレーニング効果を下げる理由、就寝前ストレッチ・呼吸法の活用法をわかりやすく解説します。"
        path="/column/gym-sleep/"
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
              description: "運動と睡眠の相関関係、深睡眠増加のメカニズム、最適なトレーニング時間帯、睡眠不足がもたらす負の影響、睡眠改善に特化したパーソナルジムのアプローチ、就寝前のストレッチ・呼吸法をわかりやすく解説します。",
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
              健康・生活習慣
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              睡眠の質とトレーニング効果は、密接不可分の関係にあります。「質の良い睡眠がなければ、いくら頑張ってトレーニングしても効果が出ない」これは科学的事実です。逆に、適切なパーソナルトレーニングは、不眠症や睡眠不足の最強の治療薬となり得ます。本記事では、運動と睡眠の相関関係、適度な運動が深睡眠を増やすメカニズム、夜遅い高強度トレーニングが睡眠を妨げる理由、睡眠の質向上に効果的なトレーニングの時間帯と強度、睡眠不足がトレーニング効果を下げる理由、睡眠改善に特化したパーソナルジムのアプローチ、就寝前ストレッチ・呼吸法との組み合わせについて、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                運動と睡眠の相関関係
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                運動と睡眠は、相互に強く影響し合う関係にあります。単なる「運動で疲れて寝やすくなる」という単純な話ではなく、神経ホルモン的な複雑なメカニズムが存在します。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">深睡眠の増加メカニズム</h3>
                    <p className="text-gray-600">定期的な中～高強度運動により、脳の睡眠誘発物質（アデノシン）が蓄積し、深睡眠（ノンレム睡眠3ステージ）の時間が20～30%増加します。深睡眠は脳と体の修復・リセットに最も重要。運動習慣がない人が週3回のパーソナルトレーニングを始めると、2～3週間で深睡眠が明らかに増加します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">入眠潜時の短縮</h3>
                    <p className="text-gray-600">運動習慣により、脳の体温（core body temperature）が上昇し、その後の低下が入眠シグナルになります。運動をしない人の入眠潜時は30～45分ですが、運動習慣がある人は5～15分。つまり、トレーニングで「寝付きが格段に良くなる」のです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">総睡眠時間の延長</h3>
                    <p className="text-gray-600">運動習慣によって、睡眠圧（眠気）が高まり、自然と総睡眠時間が30～60分延長されます。夜中の目覚めが減少し、睡眠の連続性が向上。「朝スッキリ目覚める」という体験は、運動習慣から生まれるのです。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">体内時計のリセット</h3>
                    <p className="text-gray-600">特に朝の運動は、体内時計を調整し、メラトニン分泌の時間を正常化。毎朝同じ時間に朝日を浴びながら軽い運動をすれば、体内時計が固定化され、毎晩同じ時間に自動的に眠くなります。これは時差ぼけ解消の最速手段でもあります。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                夜遅い高強度トレーニングが睡眠を妨げる理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                「運動は睡眠に良い」という一般的な認識は正確ではありません。タイミングが悪いと、運動は睡眠を大きく害します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-3">交感神経の過度な活性化</h3>
                  <p className="text-gray-700 mb-3">高強度トレーニング（RPE8～10）は、交感神経を著しく優位にします。アドレナリンとコルチゾール（ストレスホルモン）が3～5倍に跳ね上がり、心拍数が140～170bpmまで上昇。この興奮状態は、運動終了後3～4時間は続きます。就寝予定時刻が近いと、交感神経がいつまでも優位なままで、寝付けません。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-3">メラトニン分泌抑制</h3>
                  <p className="text-gray-700 mb-3">高コルチゾール・高アドレナリン状態では、睡眠ホルモン・メラトニンの分泌が抑制されます。通常、就寝1～2時間前にメラトニンが上昇開始しますが、就寝3時間前の高強度運動でこのプロセスが破壊されます。メラトニン分泌が回復するまで3～4時間必要。夜21時に高強度トレーニングをした人は、午前1～2時まで眠れません。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-3">体温（core body temperature）上昇の持続</h3>
                  <p className="text-gray-700 mb-3">入眠には、脳の体温が低下することが必須。しかし高強度運動により体温が上昇し、その低下に3～4時間必要。その間、「寝つきが悪い」「浅い眠りで何度も起きる」「悪夢を見る」という症状が出現。体温が正常に低下して初めて、深睡眠に入れます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-3">レムバウンス現象</h3>
                  <p className="text-gray-700 mb-3">最初の1～2時間が眠れず、その後寝た場合、その夜のREM睡眠（夢見睡眠）が著しく増加。レム睡眠が多すぎると、熟睡感なく目覚め、朝の疲労感が残ります。さらに翌日の認知機能・体力が低下。就寝3時間以内の高強度運動は、その夜のみならず翌日のトレーニング効果も低下させます。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                睡眠の質向上に効果的なトレーニング時間帯と強度
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                睡眠を改善するには、単に「運動をする」だけでなく、「いつ」「どの程度の強度で」が極めて重要です：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">最適時間帯：早朝（7～9時）</h3>
                  <p className="text-gray-700 mb-3">朝日を浴びながらの軽～中強度運動（RPE5～6）は、体内時計をリセット。この時点での運動は、その日のメラトニン分泌リズムを正常化させ、夜間の睡眠質を向上させます。朝7～8時に30分のウォーキングやヨガをするだけで、その晩の睡眠が劇的に改善される方は多いです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">次点：午後（14～17時）</h3>
                  <p className="text-gray-700 mb-3">午後14～15時の中～高強度運動（RPE6～8）も、睡眠改善に有効。この時間帯は脳の体温が自然に上昇する時間帯のため、運動による体温上昇が、その後の自然な低下を促進。ただし、運動終了後3～4時間はクールダウンに要するため、夜21時就寝なら17時までに運動を完了させることが必須。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">推奨スケジュール例</h3>
                  <p className="text-gray-700 mb-3">
                    月・木：早朝7時に軽～中強度ウォーキング（30分）<br/>
                    火・金：午後15時にパーソナルトレーニング中強度（60分）<br/>
                    水：完全休息またはヨガ（30分）<br/>
                    土：午前10時に軽いストレッチクラス（45分）<br/>
                    日：完全休息
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-3">夜間運動が必須の場合</h3>
                  <p className="text-gray-700 mb-3">やむを得ず夜間（19時以降）にトレーニングする場合は、高強度（RPE8+）を絶対に避け、軽～中強度（RPE4～5）のリカバリーワーク（ストレッチ・軽いウェイト）に限定。運動終了後、冷たいシャワー（15～20分）で体温を積極的に低下させ、その後のメラトニン分泌を促進。ただし、これは不可避の場合のみの対処法です。</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                睡眠不足がトレーニング効果を下げる理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                「トレーニング効果は就寝中に生まれる」―これは多くの人が知らない重要な事実です。睡眠不足は、トレーニング効果を50～60%も減少させます。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">成長ホルモン（HGH）の分泌低下</h3>
                    <p className="text-gray-600">HGHは、深睡眠（ノンレム睡眠N3）の初期段階に分泌。睡眠不足では深睡眠が短縮されるため、HGH分泌が50～70%低下。HGHは筋肉成長・脂肪分解・骨形成に不可欠。HGHなしに筋トレしても、筋肉成長は最小限。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">テストステロン低下</h3>
                    <p className="text-gray-600">テストステロン（筋肉合成ホルモン）も睡眠中に分泌。1週間の睡眠不足で、テストステロンが25～30%低下。筋力向上が著しく減速し、同じトレーニングでも効果が1/3以下に。特に男性は顕著です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">コルチゾール（筋肉分解ホルモン）の増加</h3>
                    <p className="text-gray-600">睡眠不足はストレスホルモン・コルチゾールを上昇させます。コルチゾール上昇は、せっかく筋トレで刺激した筋肉を分解。「筋トレ→筋肉分解」という悪循環に。食事でいくらタンパク質を摂っても、コルチゾール高値では筋肉が育たず、脂肪が増加。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">脂肪燃焼効率の低下</h3>
                    <p className="text-gray-600">睡眠不足により、インスリン感受性（血糖調整能）が低下。同じ食事でも血糖が上がりやすくなり、脂肪蓄積が促進。同時に、レプチン（満腹ホルモン）が低下し、グレリン（食欲ホルモン）が上昇。食べ過ぎへの誘惑が3～4倍増加。結果、脂肪燃焼が60%低下、脂肪蓄積が加速。</p>
                  </div>
                </li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>研究データ：</strong> 同じトレーニング・食事管理でも、睡眠7時間と5時間の群では、8週間後の結果が大きく異なります。7時間睡眠群は体脂肪-3.5kg・筋肉+1.2kg。5時間睡眠群は体脂肪-0.5kg・筋肉-0.8kg。つまり、睡眠不足ではダイエット効果が90%以上減少し、筋肉まで失われるのです。
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                睡眠改善に特化したパーソナルジムのアプローチ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                最近、睡眠改善プログラムに特化したパーソナルジムが増加しています。これらのジムは、単なるトレーニング指導ではなく、生活全般のサポートを行います：
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. スマートな運動時間設定</h3>
                  <p className="text-gray-600 text-sm">クライアントの生活スケジュール・就寝時刻を聞き取り、最適な運動時間帯を提案。朝は早寝型向けの朝日ウォーキング、午後は仕事の合間のトレーニング、というように個別対応。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. 段階的な強度調整</h3>
                  <p className="text-gray-600 text-sm">初期は軽～中強度（RPE4～6）に限定。2～3週間で睡眠改善を確認したら、段階的に強度UP。強度上げすぎて睡眠が悪化した場合は、即座に強度DOWN。データ（ウェアラブル睡眠計測）ベースで調整。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. 食事時間の指導</h3>
                  <p className="text-gray-600 text-sm">カフェイン（コーヒー・紅茶・緑茶）は14時までに制限。寝る3時間前の食事は消化を妨げるため軽めに。反対に、トリプトファン（セロトニン前駆体）を含む食事（バナナ・チーズ・鶏肉）を就寝3時間前に摂取。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. ウェアラブル睡眠計測の導入</h3>
                  <p className="text-gray-600 text-sm">Apple Watch・Oura Ring・Fitbit等で睡眠データを収集。毎週のセッション時にデータ確認。「深睡眠が前週比+20分！」といった小さな改善が、モチベーション維持につながる。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">5. 室内環境の最適化サポート</h3>
                  <p className="text-gray-600 text-sm">寝室の温度（16～19℃推奨）、湿度（40～60%）、光（完全暗闇）、音環境に関する助言。パーソナルジムが直接介入しなくても、環境改善のリストを提供。</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                就寝前ストレッチ・呼吸法との組み合わせ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルトレーニング単体ではなく、就寝前のストレッチと呼吸法を組み合わせることで、睡眠改善効果は劇的に向上します。実際には、パーソナルジムがセッション内に「リカバリー時間」として組み込むことが多いです。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">就寝30分前ストレッチ（10～15分）</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>実施メニュー：</strong><br/>
                    1. ハムストリングストレッチ（30秒×2セット）<br/>
                    2. 腸腰筋ストレッチ（30秒×2セット）<br/>
                    3. 僧帽筋ストレッチ（30秒×2セット）<br/>
                    4. 脊柱起立筋スパイナルツイスト（30秒×2セット）<br/>
                    5. 全身リラックスポーズ（2分）
                  </p>
                  <p className="text-gray-600 text-sm">これらのストレッチは、脊椎周りの筋肉（交感神経が走行）をリラックスさせ、副交感神経優位に転換。10～15分で、心拍数が60→45bpmまで低下。メラトニン分泌が促進されます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">就寝直前呼吸法「4-4-8呼吸」（5分）</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>実施方法：</strong><br/>
                    1. 4秒かけてゆっくり鼻から吸う<br/>
                    2. 4秒間、息を止める<br/>
                    3. 8秒かけてゆっくり口から吐く<br/>
                    4. これを10～15回繰り返す
                  </p>
                  <p className="text-gray-600 text-sm">この呼吸法により、副交感神経が優位になり、心拍変動（HRV）が改善。自律神経のバランスがリセットされ、入眠潜時が20～30分短縮。毎夜5分で効果が出るため、最も簡単で有効な睡眠対策です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">実施スケジュール例</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>22時に就寝希望の場合：</strong><br/>
                    21:30～21:45　ストレッチ（15分）<br/>
                    21:45～21:50　4-4-8呼吸法（5分）<br/>
                    21:50～22:00　瞑想・アロマテラピー（10分）<br/>
                    22:00　就寝<br/>
                  </p>
                  <p className="text-gray-600 text-sm">このルーティンを毎夜繰り返すことで、脳が「このシーケンスが来たら寝時」と認識。1週間で自動的に眠くなるようになります。</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                睡眠改善プログラムの効果測定
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                科学的成果を示す指標：
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                  <div>
                    <p className="text-gray-600"><strong>入眠潜時：</strong> 開始前40分 → 4週間後15分以下</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                  <div>
                    <p className="text-gray-600"><strong>深睡眠時間：</strong> 開始前60分 → 4週間後90～120分</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                  <div>
                    <p className="text-gray-600"><strong>総睡眠時間：</strong> 開始前6時間 → 4週間後7～8時間</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                  <div>
                    <p className="text-gray-600"><strong>睡眠スコア（Oura Ring等）：</strong> 開始前60/100 → 4週間後85/100</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                  <div>
                    <p className="text-gray-600"><strong>朝の体感：</strong> 「寝ても疲れた」 → 「朝スッキリ目覚める」</p>
                  </div>
                </li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>驚くべき副産物：</strong> 睡眠が改善されると、同じトレーニング量でも体脂肪の減少速度が2～3倍向上し、筋力向上も加速。つまり、睡眠改善プログラムは、実は「最高のダイエット・筋力向上プログラム」なのです。
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
              睡眠を改善して、トレーニング効果を最大化しよう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              質の良い睡眠なしに、トレーニング効果は生まれません。パーソナルトレーニング + 生活習慣改善で、睡眠改善と同時にボディメイクを実現させましょう。全国のパーソナルジムから、睡眠改善プログラムに対応したジムを見つけてください。
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
                href="/column/gym-nutrition/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの食事管理｜トレーニングと食事の組み合わせ
                </h3>
                <p className="text-sm text-gray-600">
                  栄養管理とトレーニング効果の関係を解説
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
                  代謝向上と脂肪燃焼のメカニズム
                </p>
              </Link>
              <Link
                href="/column/gym-injury/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムでの怪我予防とアフターケア
                </h3>
                <p className="text-sm text-gray-600">
                  怪我予防と回復の重要性を詳しく解説
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
