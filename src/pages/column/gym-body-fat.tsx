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
      question: "体脂肪率を低下させるには何が最も重要ですか？",
      answer: "体脂肪率の低下には、カロリー収支がマイナスであることと、定期的なレジスタンストレーニングが最も重要です。パーソナルジムでの筋トレで筋肉を維持しながら、適切な食事管理で脂肪を落とすことで、効率的に体脂肪率を低下させられます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "現実的な体脂肪率低下のペースはどのくらい？",
      answer: "月1～1.5%の体脂肪率低下が現実的です。例えば体脂肪率30%なら、3～4ヶ月で25%程度に低下させることができます。月2%以上の急速な低下は筋肉減少につながるため、焦らず継続することが大切です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体脂肪率低下に適した食事管理のポイントは？",
      answer: "タンパク質を体重×1.5～2g摂取し、筋肉を維持しながらカロリー制限することが重要です。また、微量栄養素（ビタミン・ミネラル）の不足は代謝低下につながるため、バランス良い食事を心がけましょう。パーソナルジムの栄養指導が有効です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "有酸素運動は体脂肪率低下に必要ですか？",
      answer: "有酸素運動はあると便利ですが、食事管理とレジスタンストレーニングが充実していれば必須ではありません。ただし週1～2回の軽い有酸素運動（ウォーキング、バイク）を加えると、体脂肪率低下がより効率的になります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "体脂肪率が停滞するのはなぜ？対応策は？",
      answer: "約2～3週間停滞するのは正常です。その後も停滞が続く場合は、食事内容の見直し、トレーニング強度の調整、または目標設定の段階的引き上げが必要です。トレーナーとの相談が有効です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "体脂肪率低下後、リバウンドを防ぐには？",
      answer: "達成後も食事習慣を維持し、週1～2回のトレーニング継続が重要です。急激な食事量の増加を避け、徐々にカロリーを戻すこと、筋肉量を保つことが長期的な体脂肪率維持のコツです。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymBodyFatPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムで体脂肪率を低下させる科学的方法" },
  ];

  const pageTitle = "パーソナルジムで体脂肪率を低下させる科学的方法｜効率的な低下ペースと実践的ガイド";
  const pageUrl = `${baseSiteUrl}/column/gym-body-fat/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムで体脂肪率を低下させる完全ガイド。現実的な低下ペース、筋肉維持のためのトレーニング・食事戦略、有酸素運動の必要性、停滞期の対応、リバウンド防止までを科学的根拠に基づいて解説します。"
        path="/column/gym-body-fat/"
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
              description: "パーソナルジムで体脂肪率を低下させる完全ガイド。現実的な低下ペース、筋肉維持のためのトレーニング・食事戦略、有酸素運動の必要性、停滞期の対応、リバウンド防止までを科学的根拠に基づいて解説します。",
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
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              体脂肪率低下
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムで体脂肪率を効率的に低下させるには、単なるダイエットではなく「体組成」を意識したアプローチが必須です。本ガイドでは、体脂肪率と体重の違い、現実的な低下ペース、筋肉を維持しながら脂肪を落とすトレーニング戦略、効果的な食事管理、停滞期の乗り越え方、そしてリバウンド防止まで、科学的根拠に基づいた実践的なノウハウをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体脂肪率と体重の違いを理解する
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                ダイエット成功の第一歩は、「体重」ではなく「体脂肪率」に注目することです。パーソナルジムで効果的な体組成改善を目指すなら、この違いを正確に理解する必要があります。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">体重と体脂肪率の関係</h3>
                  <p className="text-gray-700 mb-4">
                    体重が減っても、失われたのが筋肉か脂肪かで結果は大きく異なります。例えば、3kg体重が減少しても、筋肉が3kg落ちた場合と脂肪が3kg落ちた場合では、見た目や健康度は全く異なります。パーソナルジムでは、体脂肪率計測によって「どの成分が減ったか」を正確に把握できる利点があります。これにより、効率的に脂肪を落としながら筋肉を維持できます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">体脂肪率低下と見た目の変化</h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪率が低下すると、実際の体重以上に見た目が変わります。特に女性で20～25%、男性で15～20%程度の体脂肪率に達すると、体の輪郭がはっきり見えるようになり、大幅な外見改善を実感できます。パーソナルジムの利点は、この段階的な変化をトレーナーが実感させてくれることで、モチベーション維持が容易になります。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                現実的な体脂肪率低下のペース設定
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体脂肪率低下には、個人差や現在の体組成によって大きな差がありますが、科学的根拠に基づいた現実的なペースを理解することが継続と成功の鍵です。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">推奨：月1～1.5%の体脂肪率低下</h3>
                  <p className="text-gray-700 mb-4">
                    これは栄養学および運動科学の現在のコンセンサスに基づいた安全で持続可能なペースです。例えば、体脂肪率30%の方は、月1.5%低下させると、3ヶ月で約25.5%、6ヶ月で約21%になります。このペースで低下させると、筋肉の減少を最小化しながら、脂肪を効率的に落とせます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">月2%以上の低下は要注意</h3>
                  <p className="text-gray-700 mb-4">
                    月2%以上の急速な体脂肪率低下は、筋肉の大幅な減少につながります。一度失われた筋肉を取り戻すには数倍の時間がかかるため、急速な低下は後々のリバウンドリスク、基礎代謝低下、体形の悪化（たるみ）につながります。パーソナルジムのトレーナーは、長期的な視点から持続可能なペースを提案してくれます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋肉を維持しながら脂肪を落とすトレーニング戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体脂肪率低下の成功は、トレーニングプログラムの質で大きく左右されます。パーソナルジムでは、個人に最適なプログラムをカスタマイズできるため、効率的に脂肪を落としながら筋肉を保つことができます。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">レジスタンストレーニングの優先順位</h3>
                  <p className="text-gray-700 mb-4">
                    週2～3回のパーソナルトレーニングでのレジスタンストレーニング（筋トレ）が、体脂肪率低下の基盤となります。なぜなら、筋肉への刺激が不足すると、体がエネルギー効率化のために筋肉を分解し、脂肪を温存しようとするからです。特に、下半身（スクワット、デッドリフト）と上半身（ベンチプレス、ベントオーバーロウ）の大きな筋肉グループへのアプローチが重要です。これにより、筋肉を維持しながら脂肪を優先的に減らせます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">有酸素運動の活用方法</h3>
                  <p className="text-gray-700 mb-4">
                    有酸素運動は補助的な役割として活用します。週1～2回の軽い有酸素運動（ウォーキング30分、自転車20分など）は、心肺機能向上とカロリー消費の補足として有効です。ただし、過度な有酸素運動（毎日ランニングなど）は筋肉減少につながるため避けましょう。パーソナルジムのトレーナーは、個人の体脂肪率目標に応じて最適なバランスを提案してくれます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング強度と頻度の設定</h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪率低下期は、高強度トレーニングに優先順位を置きます。低強度での長時間トレーニングより、短時間で高強度のレジスタンストレーニングが、筋肉維持と脂肪減少の効率が高いです。パーソナルジムなら、トレーナーが種目の選択、負荷設定、セット数を個別に調整してくれるため、最適な刺激を得られます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体脂肪率低下に効果的な食事管理
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体脂肪率低下の80%は食事管理で決まります。パーソナルジムの栄養指導を活用することで、科学的根拠に基づいた食事戦略を実装できます。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">タンパク質摂取の最適化</h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪率低下期のタンパク質摂取量は、体重×1.5～2g が目安です。例えば体重60kgなら、毎日90～120gのタンパク質が必要です。タンパク質は筋肉の分解を抑制し、脂肪優先的な減少を促します。また、食後の体熱産生（食事誘発性熱産生）で、タンパク質は糖質や脂肪より高いエネルギー消費を引き起こすため、カロリー管理の効率が向上します。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">カロリー収支の設定</h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪率低下には、摂取カロリーが消費カロリーより少ない「カロリー赤字」が必須です。現在のカロリー摂取量から300～500kcal削減することが目安です。例えば、通常2000kcal摂取の方は、1500～1700kcal に削減します。ただし、急激な削減（1日1200kcal以下）は栄養不足、代謝低下、筋肉減少につながるため避けましょう。パーソナルジムの栄養士が、個人のライフスタイルに合わせた現実的なカロリー設定を提案してくれます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">微量栄養素とビタミン管理</h3>
                  <p className="text-gray-700 mb-4">
                    カロリー制限時は、ビタミンB群（B1, B2, B6, B12）、ビタミンD、鉄分、亜鉛などの微量栄養素不足になりやすいです。これらが不足すると、代謝が低下し、体脂肪率低下がストップしやすくなります。色とりどりの野菜、全粒穀物、質の良いタンパク質源（鶏肉、魚、卵）をバランス良く摂取することで、必須栄養素を確保できます。必要に応じてサプリメンテーションも検討してください。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体脂肪率低下の停滞期と対応策
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                体脂肪率低下中に、3～4週間体脂肪率が変わらない「停滞期」は必ず訪れます。これは体の適応反応であり、正しく対応すれば再び低下します。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">停滞期が発生するメカニズム</h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪率低下により、体は摂取カロリーの減少に適応します。代謝が低下し、当初のカロリー赤字が相対的に小さくなるため、低下がストップします。これは悪いことではなく、体が新しい状態に適応している正常な反応です。焦らず継続することが大切です。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">停滞期の対応策</h3>
                  <p className="text-gray-700 mb-4">
                    停滞が2～3週間続いた場合、以下のいずれかを実施します：<br/>
                    1. トレーニング強度の増加（種目の変更、負荷アップ、セット数増加）<br/>
                    2. 食事内容の見直し（タンパク質比率調整、炭水化物タイミング変更）<br/>
                    3. チートデイの導入（週1回、意図的にカロリーを増加させる）<br/>
                    パーソナルジムのトレーナーが、個人の状況に応じた最適な対応を提案してくれます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">焦らない心構え</h3>
                  <p className="text-gray-700 mb-4">
                    停滞期中でも、実際には身体が変化している場合があります。体脂肪率計の測定誤差、水分保持の変動、内臓脂肪から皮下脂肪への変化など、体重計に現れない変化も起こっています。パーソナルジムなら、定期的な写真記録やサイズ測定により、見た目の変化を実感できるため、モチベーション維持が容易です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標達成後のリバウンド防止と長期維持
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                目標体脂肪率に到達することは成功ですが、その後の維持がさらに重要です。多くの方がここで失敗し、リバウンドしてしまいます。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">食事習慣の段階的変更</h3>
                  <p className="text-gray-700 mb-4">
                    目標達成後、急激にカロリーを増加させるとリバウンドします。代わりに、現在のカロリー摂取量を月100～150kcal程度ずつ増加させ、3～4ヶ月かけて通常の摂取量に戻していきます。この段階的なアプローチにより、体が新しい体重・体脂肪率に適応し、リバウンドを防ぎます。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング継続の重要性</h3>
                  <p className="text-gray-700 mb-4">
                    目標達成後のリバウンド防止には、週1～2回のパーソナルトレーニング継続が重要です。筋肉量を維持することで、基礎代謝が高い状態を保つことができます。パーソナルジムを「短期的な変身」ではなく、「長期的なライフスタイル改善」として捉えることが、永続的な成功の鍵です。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">定期的なモニタリングと調整</h3>
                  <p className="text-gray-700 mb-4">
                    目標達成後も、月1～2回の体脂肪率測定を継続することで、早期に変化を感知できます。体脂肪率が1～2%増加し始めたら、その時点で軽い調整（食事の意識化、トレーニング強度アップ）を行うことで、本格的なリバウンドを防ぎます。パーソナルジムなら、長期的なメンテナンスプログラムも提供してくれます。
                  </p>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体脂肪率低下のまとめ
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">1.</span>
                  <span>体脂肪率低下の現実的なペースは月1～1.5%。急速な低下は筋肉減少を招く</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">2.</span>
                  <span>週2～3回のレジスタンストレーニングで筋肉を維持しながら脂肪を落とす</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">3.</span>
                  <span>タンパク質を体重×1.5～2g摂取し、300～500kcal のカロリー赤字を作る</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">4.</span>
                  <span>停滞期はトレーニングと食事の工夫で突破。焦らず継続することが大切</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">5.</span>
                  <span>目標達成後も食事と運動の習慣を継続し、リバウンドを防止する</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">関連記事</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/column/gym-nutrition-guide/">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                  <p className="font-semibold text-gray-900">パーソナルジム栄養ガイド｜初心者向け食事管理の完全ステップ</p>
                </div>
              </Link>
              <Link href="/column/gym-protein/">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                  <p className="font-semibold text-gray-900">パーソナルジムでのタンパク質戦略｜筋肉と脂肪の科学</p>
                </div>
              </Link>
              <Link href="/column/gym-recovery/">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                  <p className="font-semibold text-gray-900">パーソナルジム後の回復戦略｜成果を最大化する方法</p>
                </div>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
