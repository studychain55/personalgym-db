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
      question: "メタボリックシンドロームとは何ですか？",
      answer: "メタボリックシンドロームは、内臓脂肪の蓄積に伴い、高血圧・高血糖・脂質異常が複合的に起こる状態です。診断基準は、腹囲が男性85cm以上、女性90cm以上で、かつ3つ以上の症状（血圧・血糖・中性脂肪）を満たすことです。放置すると心筋梗塞や脳梗塞のリスクが大幅に増加します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "内臓脂肪を落とすのに最適なトレーニング方法は？",
      answer: "有酸素運動と筋トレの組み合わせが最も効果的です。筋トレで大きな筋肉（脚・背中・胸）を鍛えて基礎代謝を上げ、有酸素運動で脂肪燃焼を促進します。パーソナルジムでは、この2つを個別の体力に合わせて組み合わせるため、医療面での安全性も確保できます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "血糖値改善に効果的な食事管理のポイントは？",
      answer: "血糖値スパイクを防ぐため、食事の順序が重要です。野菜→タンパク質→炭水化物の順番で食べることで、血糖値の上昇が緩やかになります。また、夜間の空腹時血糖値を下げるためには、夜間の筋トレ後に適量の栄養補給も有効です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "糖尿病予防に通う場合、医師の診断書は必要ですか？",
      answer: "特に糖尿病予防段階では診断書は不要ですが、既に医学的な診断がある場合は医師に相談しパーソナルジムに伝えることをお勧めします。医学的知識を持つトレーナーなら、医師の指導と連携しながら安全で効果的なプログラムを提供できます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "メタボ改善はどのくらいの期間で効果が出ますか？",
      answer: "個人差がありますが、週2～3回のトレーニングと食事管理を3～4ヶ月続けると、多くの人が腹囲減少と血液検査数値の改善を実感します。内臓脂肪は皮下脂肪より落としやすいため、3ヶ月で5cm以上の腹囲減少も珍しくありません。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "メタボ対応のパーソナルジムを選ぶポイントは？",
      answer: "医療連携の実績、医学的な栄養指導ができるか、血糖値改善のプログラム経験がある、医師との連携体制が整っているかを確認しましょう。体験時に、検査結果を踏まえたプログラム提案ができるかどうかを見極めることが重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymMetabolicPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "メタボ・糖尿病予防のためのパーソナルジム活用法" },
  ];

  const pageTitle = "メタボ・糖尿病予防のためのパーソナルジム活用法｜内臓脂肪を落とすトレーニング";
  const pageUrl = `${baseSiteUrl}/column/gym-metabolic/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="メタボリックシンドロームや糖尿病予防を目的としたパーソナルジムの活用方法を解説。内臓脂肪を効率よく落とすトレーニングと食事管理、血糖値改善に効果的なアプローチを紹介。"
        path="/column/gym-metabolic/"
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
              description: "メタボリックシンドロームや糖尿病予防を目的としたパーソナルジムの活用方法を解説。内臓脂肪を効率よく落とすトレーニングと食事管理、血糖値改善に効果的なアプローチを紹介。",
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
              「健康診断でメタボリックシンドロームと診断された」「内臓脂肪が多いと言われたが、どう対策したらいいかわからない」「血糖値が高めで、将来糖尿病になるのではと心配」このような悩みをお持ちですか？メタボリックシンドロームや糖尿病予防は、単なるダイエットではなく、内臓脂肪を落とし、血糖値・血圧・脂質を改善する必要があります。このガイドでは、メタボリックシンドロームの基準と健康リスク、内臓脂肪を落とすためのトレーニングの特徴、有酸素運動と筋トレの組み合わせ方、食事管理との連携、かかりつけ医との連携の重要性、パーソナルジムを選ぶ際のポイントをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: メタボリックシンドロームの基準と健康リスク */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                メタボリックシンドロームの基準と健康リスク
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                メタボリックシンドロームは、単なる肥満ではなく、複数の病的な状態が組み合わさった危険な状態です。診断基準を理解することが、改善への第一歩です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    メタボリックシンドロームの診断基準
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    内臓脂肪型肥満（腹囲）に加えて、以下の3つ以上を満たすと診断されます：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・腹囲：男性85cm以上、女性90cm以上</li>
                    <li>・血圧：収縮期130mmHg以上、または拡張期85mmHg以上</li>
                    <li>・血糖値：空腹時110mg/dL以上（糖尿病予備軍は100mg/dL以上）</li>
                    <li>・中性脂肪：150mg/dL以上</li>
                    <li>・HDLコレステロール：40mg/dL未満（男性）、50mg/dL未満（女性）</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    メタボが放置されたときの健康リスク
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    メタボリックシンドロームを放置すると、以下のリスクが大幅に増加します：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・心筋梗塞：通常の20～30倍のリスク</li>
                    <li>・脳梗塞：通常の10～20倍のリスク</li>
                    <li>・2型糖尿病：発症リスクが著しく高まる</li>
                    <li>・腎臓病：糖尿病と高血圧の相乗効果で進行</li>
                    <li>・脂肪肝（NAFLD）：肝臓機能の悪化につながる</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    内臓脂肪と皮下脂肪の違い
                  </h4>
                  <p className="text-gray-700 text-sm">
                    内臓脂肪は、血管・臓器に直接接しているため、炎症物質を放出し、血糖値・血圧・脂質に負の影響を与えます。一方、皮下脂肪は見た目の問題が中心。メタボ予防には、内臓脂肪の減少が必須です。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>早期介入の重要性</strong>：メタボリックシンドロームの診断を受けたら、3～6ヶ月以内に医学的な介入を始めることが重要です。早期に内臓脂肪を落とせば、多くの指標が正常化します。
                </p>
              </div>
            </section>

            {/* Section 2: 内臓脂肪を落とすためのトレーニングの特徴 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                内臓脂肪を落とすためのトレーニングの特徴
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                内臓脂肪は、皮下脂肪よりも落としやすいという特徴があります。正しいトレーニングと食事管理で、効率的に落とせます。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">特徴1：基礎代謝を上げるトレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    内臓脂肪を落とすためには、基礎代謝（何もしなくても消費するカロリー）を上げることが重要です。これは、筋肉量を増やすことで実現します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>筋肉と脂肪の違い</strong>
                    <p className="mt-2">筋肉1kgは、1日約6kcalを消費します。筋肉を3kg増やせば、1日の消費カロリーが18kcal増え、年間6,500kcal多く消費できます。これは、脂肪0.9kg分に相当します。</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・大きな筋肉（脚・背中・胸）の優先的な鍛錬</li>
                    <li>・スクワット、デッドリフト、ベンチプレスなど、多関節運動</li>
                    <li>・週2～3回のウェイトトレーニング</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">特徴2：血糖値を上げないトレーニングタイミング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニングのタイミングは、血糖値改善と深く関わります。食後のトレーニングは、血糖値の上昇を抑え、糖尿病予防に効果的です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>推奨トレーニングタイミング</strong>
                    <p className="mt-2">夕食直後（食後15～30分以内）のトレーニングが最適です。この時間帯にトレーニングすることで、食事による血糖値上昇を最大30～40%削減できます。</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">特徴3：継続的な心拍数管理</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    内臓脂肪の燃焼には、適切な運動強度の維持が重要です。パーソナルジムでは、個別の体力に合わせて強度調整されます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・目標心拍数：最大心拍数の60～70%</li>
                    <li>・運動時間：1回30～50分</li>
                    <li>・心拍計を使った個別管理</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">特徴4：医学的安全性の確保</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    メタボ改善では、既存の高血圧・高血糖に配慮した安全なトレーニングが必須です。パーソナルジムは、この点で大きなメリットがあります。
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>事前の血液検査・健康診断結果の確認</strong>
                        <p className="text-gray-600">既存の数値を踏まえたプログラム設計</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>緊急時の対応体制</strong>
                        <p className="text-gray-600">低血糖や血圧上昇への対応マニュアル</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>医師との連携</strong>
                        <p className="text-gray-600">定期的な健康診断結果の医師へのフィードバック</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 有酸素運動と筋トレの組み合わせ方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                有酸素運動と筋トレの組み合わせ方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                内臓脂肪を落とすには、有酸素運動と筋トレの組み合わせが最も効果的です。それぞれの役割を理解し、相乗効果を生み出すことが重要です。
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-3">有酸素運動の役割：脂肪直接燃焼</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    有酸素運動は、運動中に脂肪を直接燃焼させます。内臓脂肪は皮下脂肪より先に動員されるため、有酸素運動は内臓脂肪削減に非常に有効です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・ウォーキング、ジョギング、エアロバイク、トレッドミル</li>
                    <li>・目安：週3～4回、1回30～40分</li>
                    <li>・強度：ややきつい程度（会話がぎこちない強度）</li>
                    <li>・内臓脂肪燃焼：週150分以上が推奨（厚労省ガイドライン）</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-3">筋トレの役割：基礎代謝向上と血糖値改善</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    筋トレは、基礎代謝を上げることで、長期的な脂肪燃焼を実現します。また、筋肉は糖を貯蔵・利用するため、血糖値改善に直結します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・スクワット：下半身全体の筋肉（体の40%）を鍛える</li>
                    <li>・デッドリフト：背中・腰・脚の総合的な筋力向上</li>
                    <li>・胸トレ・背中トレ：大きな筋肉で基礎代謝を効率的に上昇</li>
                    <li>・目安：週2～3回、1回40～50分</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">実践的な組み合わせプログラム例</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    1週間のモデルプログラムを示します：
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">月曜日：筋トレ（下半身）+ 有酸素</p>
                      <p className="text-sm text-gray-700">スクワット・レッグプレス・レッグカール 40分 → トレッドミル 20分</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">火曜日：軽い有酸素</p>
                      <p className="text-sm text-gray-700">ウォーキング・エアロバイク 40分（家でも可）</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">水曜日：筋トレ（背中・胸）+ 有酸素</p>
                      <p className="text-sm text-gray-700">ベンチプレス・ラットプルダウン・シーテッドロウ 40分 → トレッドミル 20分</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">木曜日：軽い有酸素 or 休息</p>
                      <p className="text-sm text-gray-700">余力があればウォーキング30分（無理は禁物）</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">金曜日：筋トレ（全身）+ 有酸素</p>
                      <p className="text-sm text-gray-700">複合エクササイズで全身を刺激 40分 → トレッドミル 20分</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-2">土日：軽い有酸素 or 完全休息</p>
                      <p className="text-sm text-gray-700">疲労度に応じて調整。回復も重要</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>相乗効果</strong>：筋トレで筋肉を刺激した直後に有酸素運動を行うと、脂肪燃焼効率が30～40%向上します。パーソナルジムの専門知識があれば、この最適な組み合わせを実現できます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 食事管理との連携 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事管理との連携：血糖値スパイクを防ぐ食べ方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                メタボ・糖尿病予防には、トレーニングと食事管理の両輪が必須です。血糖値改善に焦点を当てた食事管理を解説します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ポイント1：食事の順序が重要（ベジタスロー食べ法）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    血糖値スパイクを防ぐには、食べる順序が重要です。正しい順序で食べるだけで、血糖値上昇を30～40%削減できます。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">1. 野菜・食物繊維（最初の10分）</p>
                      <p className="text-sm text-gray-700 mt-1">ブロッコリー、ほうれん草、キャベツ、サラダなど。食物繊維が糖の吸収を遅延させます。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">2. タンパク質（次の10分）</p>
                      <p className="text-sm text-gray-700 mt-1">鶏肉、卵、魚、豆類など。タンパク質も血糖値上昇を緩和します。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">3. 炭水化物（最後）</p>
                      <p className="text-sm text-gray-700 mt-1">米、パン、麺など。この時点では、血糖値上昇が緩やかです。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ポイント2：夜間空腹時血糖値の改善</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    朝空腹時の血糖値（空腹時血糖値）が高い場合、前夜の夜食やタイミングが原因になることがあります。以下を確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・夜遅い食事（寝る3時間前）を避ける</li>
                    <li>・夜食は軽い食事（タンパク質中心）に限定</li>
                    <li>・夜間の筋トレ後は、糖質を含む栄養補給（筋トレ直後30分以内）</li>
                    <li>・その後、就寝までに最低2時間確保</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ポイント3：タンパク質摂取量の最適化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    メタボ改善では、タンパク質の適切な摂取が重要です。筋肉維持・増量に加え、血糖値改善にも役立ちます。
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-gray-700 text-sm">
                      <strong>推奨タンパク質量</strong>：体重1kgあたり1.2～1.6g/日（例：体重70kgなら、84～112g/日）
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・朝食：卵3個 + 鶏肉100g（タンパク質30g）</li>
                    <li>・昼食：魚150g + 豆（タンパク質35g）</li>
                    <li>・夜食：鶏肉150g + 豆（タンパク質40g）</li>
                    <li>・間食：プロテインドリンク（タンパク質20g）</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ポイント4：栄養補給のタイミング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニングと食事のタイミングを合わせることで、効果が大幅に向上します：
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>食後トレーニング</strong>
                        <p className="text-gray-600">食後15～30分以内にトレーニング開始。血糖値上昇を最小化</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>トレーニング直後</strong>
                        <p className="text-gray-600">筋肉合成ウィンドウを利用し、タンパク質＋糖質を摂取（30～60分以内）</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>就寝前の栄養管理</strong>
                        <p className="text-gray-600">カゼインプロテインなど、消化が遅いタンパク質を摂取（夜間の筋肉分解を抑止）</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>食事指導の重要性</strong>：パーソナルジムでの食事指導があれば、栄養管理と検査数値改善の連携が可能です。医学的知識がある指導者から、個別の食事アドバイスを受けることをお勧めします。
                </p>
              </div>
            </section>

            {/* Section 5: かかりつけ医との連携 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                かかりつけ医との連携の重要性
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                メタボリックシンドローム・糖尿病予防では、医学的管理と運動管理の連携が不可欠です。パーソナルジムとかかりつけ医の連携体制を整えることが、最も効果的な改善を実現します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">連携の形式1：医師の診断・評価</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>パーソナルジム開始前</strong>
                        <p className="text-gray-600">医師に相談し、トレーニング開始の許可・制限事項を確認</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>定期的な健康診断</strong>
                        <p className="text-gray-600">3ヶ月～6ヶ月ごとに健康診断を実施、数値改善を医学的に確認</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>トレーナーへのフィードバック</strong>
                        <p className="text-gray-600">検査結果をパーソナルジムに報告し、プログラムの最適化</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">連携の形式2：緊急時対応</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    メタボ対策パーソナルジムでは、医学的な緊急対応が整備されていることが重要です：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・低血糖症状（震え、冷汗、意識変化）への対応マニュアル</li>
                    <li>・血圧上昇への対応（運動中断・医師への連絡）</li>
                    <li>・AEDなどの緊急医療機器の完備</li>
                    <li>・医師との直通連絡体制</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">連携の形式3：薬物療法との相互作用管理</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    既に血圧降下薬・糖尿病治療薬を服用している場合、運動による影響を医師と確認することが重要です：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・運動による血糖値低下で、薬の用量調整が必要な場合がある</li>
                    <li>・血圧降下薬とトレーニング強度の関係を確認</li>
                    <li>・トレーナーが薬物療法の内容を理解し、プログラムを調整</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>医学的連携の実績</strong>：医療機関と連携しているパーソナルジムを選べば、医学的な安全性と効果の両立が実現します。体験時に、医師との連携体制を確認することをお勧めします。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: パーソナルジムを選ぶ際のポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                メタボ対応パーソナルジムを選ぶ際のポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                メタボリックシンドローム・糖尿病予防の目的でパーソナルジムを選ぶ際には、通常のダイエットジムとは異なるポイントを確認する必要があります。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント1：医学的知識と経験</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    メタボ対応には、リハビリテーション知識が必須です。以下を確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・理学療法士・作業療法士の資格を持つトレーナーがいるか</li>
                    <li>・糖尿病予防・メタボ改善の指導実績</li>
                    <li>・血液検査結果（HbA1c、中性脂肪等）の理解度</li>
                    <li>・個別の健康診断結果に基づくプログラム設計ができるか</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント2：医療機関との連携体制</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    医師と連携した対応ができるジムを選びましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・医師との協力体制があるか</li>
                    <li>・健康診断の検査結果をジムと医師で共有できるか</li>
                    <li>・定期的なトレーニング進捗報告が医師に届くか</li>
                    <li>・緊急時の医療対応マニュアルが整備されているか</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント3：栄養指導の質</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    食事管理は、メタボ改善に不可欠です。以下を確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・管理栄養士による指導があるか</li>
                    <li>・血糖値管理・糖質制限の知識があるか</li>
                    <li>・個別の食事プランニングが可能か</li>
                    <li>・食事記録アプリの提供・支援があるか</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント4：安全管理と機器</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    医学的なモニタリングと安全対応が整備されているか確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・心拍計・血圧計など、健康管理機器の完備</li>
                    <li>・AED・酸素等、緊急対応機器の装備</li>
                    <li>・トレーニング中の定期的なバイタルサイン測定</li>
                    <li>・医師への緊急連絡体制</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント5：体験時に確認すべき点</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体験レッスン時に、以下を質問・確認しましょう：
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問1：メタボ改善の実績件数</p>
                      <p className="text-gray-700 mt-1">「過去1年でメタボ改善を目的とした会員は何人いますか？」「平均的な改善結果は？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問2：トレーナーの資格</p>
                      <p className="text-gray-700 mt-1">「担当トレーナーの保有資格は？」「医学的な研修を受けているか？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問3：医師連携の具体例</p>
                      <p className="text-gray-700 mt-1">「医師と連携している例を具体的に教えてください」「共有できる情報は？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問4：プログラム提案</p>
                      <p className="text-gray-700 mt-1">「私の健康診断結果を見て、どのようなプログラムを提案しますか？」</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>選定のコツ</strong>：複数のパーソナルジムの体験を受け、医学的知識・栄養指導・医師連携の3点を比較することをお勧めします。3ヶ月で効果を実感するためには、ジム選びが最も重要です。
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                メタボ改善に向けた第一歩を踏み出しましょう
              </h2>
              <p className="text-gray-700 mb-4">
                メタボリックシンドローム・糖尿病予防は、早期介入ほど効果があります。医学的知識を持つパーソナルジムでの専門的サポートが、確実な改善につながります。まずは、医学的対応が整備されたパーソナルジムの無料体験に申し込みましょう。
              </p>
              <Link
                href="/all/"
                className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold rounded-full px-6 py-2 hover:bg-blue-800 active:scale-[0.98] transition-all text-sm"
              >
                メタボ対応パーソナルジムを探す
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
