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
      question: "短期集中パーソナルジムで本当に体は変わりますか？",
      answer: "体の変化は期待できますが、劇的な変化は個人差が大きいです。2 週間で 2～3kg、1 ヶ月で 4～6kg の減量や、目に見える筋肉量増加は十分可能です。ただし、遺伝的要因や初期体脂肪率によって結果は変わります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "短期プランと通常プランの違いは何ですか？",
      answer: "短期プランは高頻度（週 4～6 回）、高強度のトレーニング、食事管理の徹底が特徴です。通常プランは週 2～3 回程度。短期は結果を急ぐため、密度が濃く、費用は高くなる傾向があります。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "短期集中後はリバウンドしやすいですか？",
      answer: "短期間での急激な体の変化は、その後の食事管理が最重要です。ジム卒業後も学んだ食事習慣と簡単なトレーニングを継続すれば、リバウンドは防げます。完全に元に戻る人は、終了後に何もしない人です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "2 週間と 1 ヶ月プランでは、どちらを選ぶべきですか？",
      answer: "目標によります。体を変える実感が目的なら 1 ヶ月推奨。イベント前などで時間がないなら 2 週間でも効果は期待できますが、食事管理の質が重要。1 ヶ月の方が継続的な結果につながりやすいです。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "短期プランは体にダメージはありませんか？",
      answer: "医学的に健康な人なら、短期集中は問題ありません。ただし、既往歴や健康上の懸念がある場合は、事前に医師に相談してください。また、トレーナーの指導下での高強度トレーニングは、怪我のリスクを最小化できます。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymTankiPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "短期集中パーソナルジムで結果を出す方法" },
  ];

  const pageTitle = "短期集中パーソナルジムで結果を出す方法｜2 週間・1 ヶ月プランの効果";
  const pageUrl = `${baseSiteUrl}/column/gym-tanki/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="短期集中型パーソナルジムの 2 週間・1 ヶ月プランの効果と実態を解説。短期で体を変えるための食事・運動の組み合わせ方と、プログラム終了後の継続方法を紹介。"
        path="/column/gym-tanki/"
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
              description: "短期集中型パーソナルジムの 2 週間・1 ヶ月プランの効果と実態を解説。短期で体を変えるための食事・運動の組み合わせ方と、プログラム終了後の継続方法を紹介。",
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
              短期集中型パーソナルジムの 2 週間・1 ヶ月プランは、限られた時間で体を変えたい人に人気です。このガイドでは、短期集中プランとは何か、2 週間・1 ヶ月で期待できる変化、短期で結果を出すための食事戦略、トレーニング頻度と強度の組み方、メリット・デメリット、そしてプログラム終了後にリバウンドしないためのポイントをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 短期集中プランとは */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                短期集中パーソナルジムプランとは
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中パーソナルジムは、通常のパーソナルジムよりも短い期間（2 週間～3 ヶ月）で、集中的に体を変えるプログラムです。以下の特徴があります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    高頻度のトレーニング
                  </h4>
                  <p className="text-gray-700 text-sm">
                    通常のパーソナルジムは週 2～3 回ですが、短期集中は週 4～6 回のトレーニング。毎日、またはほぼ毎日ジムに通うため、効率的に体を変えられます。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    食事管理の徹底
                  </h4>
                  <p className="text-gray-700 text-sm">
                    毎食の記録、栄養バランスの厳密な管理、場合によっては外食禁止など、食事管理が非常に厳しくなります。トレーニングと同等、あるいはそれ以上に重要視されます。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    高強度トレーニング
                  </h4>
                  <p className="text-gray-700 text-sm">
                    結果を急ぐため、トレーニング強度が通常より上がります。初心者向けではなく、ある程度の体力がある、または短期で結果を出す覚悟がある人向けです。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    高い料金設定
                  </h4>
                  <p className="text-gray-700 text-sm">
                    通常より短期間で集中的なサービス提供となるため、料金は割高な傾向があります。2 週間 15～30 万円、1 ヶ月 30～80 万円程度が目安です。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>短期集中の特徴</strong>：結果を求める人向けのプログラム。通常のパーソナルジムより「期間を短く、密度を濃く、強度を高く」した形態です。
                </p>
              </div>
            </section>

            {/* Section 2: 2 週間・1 ヶ月で期待できる変化 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2 週間・1 ヶ月で期待できる現実的な体の変化
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中プログラムでどのくらいの体の変化が期待できるか、現実的な数値を紹介します。ただし、個人差が大きく、初期体脂肪率、年齢、性別、遺伝的要因によって大きく変わります。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">2 週間プランで期待できる変化</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体重</strong>
                        <p className="text-gray-600 text-sm">2～3kg の減量が目安。初期体脂肪率が高いほど、減量効果が大きい傾向。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">見た目の変化</strong>
                        <p className="text-gray-600 text-sm">顔や首回りがスッキリ、ウエストが引き締まる、など視覚的な変化が期待できます。写真で比較するとより明確。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体脂肪率</strong>
                        <p className="text-gray-600 text-sm">1～2% の低下が期待できます。筋肉量の大幅な増加は難しいため、主に脂肪減少。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体力・疲労感</strong>
                        <p className="text-gray-600 text-sm">初期段階での疲れやすさ改善は限定的。むしろ 2 週間はトレーニングの疲労が蓄積する期間。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">1 ヶ月プランで期待できる変化</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体重</strong>
                        <p className="text-gray-600 text-sm">4～6kg の減量が目安。2 週間プランより継続的な脂肪減少が期待できます。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">見た目の変化</strong>
                        <p className="text-gray-600 text-sm">周囲が「体が変わった」と気づくレベルの変化。腹筋の縦線、腕の筋肉、脚の引き締まりなど、部位ごとに変化が顕著。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">筋肉量</strong>
                        <p className="text-gray-600 text-sm">初心者なら 1～2kg の筋肉量増加が期待できます。筋トレ経験者でも 0.5～1kg 程度。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体脂肪率</strong>
                        <p className="text-gray-600 text-sm">2～4% の低下が期待できます。脂肪減少と筋肉増加の両立により、体の質が大きく変わります。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-gray-900">体力・疲労感</strong>
                        <p className="text-gray-600 text-sm">後半になると、トレーニングへの順応度が高まり、疲労感が減少。日常生活でも体が軽く感じられるようになります。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>個人差の例</strong>：初期体脂肪率 30% の人と 20% の人では、同じ 1 ヶ月プランでも結果が異なります。高い体脂肪率の人は 8kg 減なども可能ですが、低い体脂肪率の人は 2～3kg 程度になる傾向。
                </p>
              </div>
            </section>

            {/* Section 3: 短期で結果を出すための食事戦略 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                短期で結果を出すための食事戦略
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中の結果の 7 割は食事管理で決まります。トレーニング同様に、食事も戦略的に組む必要があります。
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">カロリー制限の設定</h4>
                    <p className="text-gray-700 text-sm">
                      基礎代謝に対して 500～1000kcal 程度の赤字を作ります。通常の食事量を 30～40% カットするイメージ。ただし、極度な制限は筋肉減少につながるため、トレーナーの指示に従います。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">タンパク質の高摂取</h4>
                    <p className="text-gray-700 text-sm">
                      体重 1kg あたり 2～2.5g のタンパク質を目指します。60kg の人なら 120～150g。鶏むね肉、魚、卵、プロテイン等で補給。筋肉維持・増加に不可欠です。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">炭水化物の賢い選択</h4>
                    <p className="text-gray-700 text-sm">
                      炭水化物は完全に抜くのではなく、質を優先します。白米 → 玄米・オートミールへ変更。トレーニング前後には炭水化物を摂取し、パフォーマンス維持。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">外食・間食の制限</h4>
                    <p className="text-gray-700 text-sm">
                      短期集中では外食は基本的に禁止。予め作り置きした食事を持参するか、自炊が鉄則。小腹が空いても、プロテインバーやナッツなど、栄養価の高い間食を選びます。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-pink-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-700 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">水分摂取と塩分管理</h4>
                    <p className="text-gray-700 text-sm">
                      毎日 2～3 リットルの水を摂取。代謝促進と空腹感軽減に効果的。反対に、塩分を制限し、むくみを減らすことで、見た目体重の低下を加速させます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>食事管理の工夫</strong>：多くの短期ジムでは「食事アプリで毎食写真報告」「栄養士によるチェック」など、継続的なサポート体制があります。これが継続できるかが、短期で結果を出せるかの分岐点になります。
                </p>
              </div>
            </section>

            {/* Section 4: トレーニング頻度と強度の組み方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                短期で効果を最大化するトレーニング頻度と強度
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中プログラムでは、トレーニングの頻度と強度が通常と大きく異なります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">推奨トレーニング頻度</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>2 週間プラン</strong>：週 6～7 回（毎日またはほぼ毎日、各 60 分）</li>
                    <li>• <strong>1 ヶ月プラン</strong>：週 4～5 回（1 日おきのペース、各 60～90 分）</li>
                    <li>• 週 2～3 回では短期効果は期待しにくい。高頻度が大前提。</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング内容の特徴</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="font-bold text-gray-900 flex-shrink-0">通常プラン</span>
                      <p className="text-gray-600">フォーム習得、基礎筋力向上を優先。低～中強度のトレーニング。</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-gray-900 flex-shrink-0">短期プラン</span>
                      <p className="text-gray-600">高強度・高密度のトレーニング。短時間に最大効果を狙うため、負荷が高い。個人の筋力に応じた追い込みが必須。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1 日の流れ（短期プランの例）</h3>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li><strong>1. ウォーミングアップ</strong>（10 分） — トレッドミル、ストレッチ</li>
                    <li><strong>2. メイントレーニング</strong>（40 分） — 高強度レジスタンストレーニング</li>
                    <li><strong>3. 有酸素運動</strong>（10～15 分） — 脂肪燃焼を加速</li>
                    <li><strong>4. クールダウン</strong>（5 分） — ストレッチ、心拍数の低下</li>
                  </ol>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">怪我リスクの管理</h4>
                  <p className="text-gray-700 text-sm">
                    高強度・高頻度は怪我のリスク。トレーナーのフォームチェックが必須。既往歴や関節の痛みがある場合は、事前に申告し、プログラムを調整してもらうことが重要です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: メリット・デメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                短期集中プランのメリット・デメリット
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中プログラムを選択する際、メリットとデメリットの両方を理解することが重要です。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">メリット</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <span><strong>短期間で目に見える結果</strong> — モチベーション維持が容易</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <span><strong>食事管理の習慣化</strong> — 短期の厳しい指導が、その後の自炊習慣につながる</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <span><strong>イベント前の駆け込み改善</strong> — 結婚式、同窓会など、期限が決まった目標に最適</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <span><strong>実績が共有されやすい</strong> — ビフォーアフター効果が大きく、モチベーション維持につながる</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-bold text-red-900 mb-4 text-lg">デメリット</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold flex-shrink-0">✗</span>
                      <span><strong>費用が高い</strong> — 通常のパーソナルジムの 2～3 倍</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold flex-shrink-0">✗</span>
                      <span><strong>継続が難しい場合がある</strong> — 終了後のフォロー不足で、リバウンドリスク</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold flex-shrink-0">✗</span>
                      <span><strong>社会的負担</strong> — 食事制限が厳しく、飲み会や外食ができない期間が続く</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700 font-bold flex-shrink-0">✗</span>
                      <span><strong>怪我リスク</strong> — 高強度・高頻度のため、フォーム不適切だと怪我の可能性</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: リバウンド防止 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                プログラム終了後にリバウンドしないためのポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                短期集中の最大の課題は「その後の継続」です。プログラム終了後、何もしなければ必ずリバウンドします。継続するための戦略を紹介します。
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">プログラム終了前にロードマップを作成</h4>
                    <p className="text-gray-700 text-sm">
                      終了 1～2 週間前から、「終了後の食事摂取量」「通うジムのペース」を決めておきます。いきなり制限を緩めるのではなく、段階的に戻します。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">終了後も週 1～2 回はジムに通う</h4>
                    <p className="text-gray-700 text-sm">
                      完全に通うのをやめるのではなく、週 1～2 回のペースに緩和。自宅トレーニングに移行する場合でも、月 1 回程度はジムで高強度トレーニングを入れるとリバウンド防止になります。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">学んだ食事知識を定着させる</h4>
                    <p className="text-gray-700 text-sm">
                      短期プログラムの大きな財産は「食事の知識」です。タンパク質の量、栄養バランスの見方を身につけることで、その後の食事選択が変わります。完全な自炊ではなく、外食で「栄養バランスの良いメニュー選択」を習慣化。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">月 1 回の進捗確認を設定</h4>
                    <p className="text-gray-700 text-sm">
                      プログラム終了後、月 1 回程度の「進捗確認セッション」（別途料金）を受けることで、モチベーション維持とリバウンド早期発見が可能。多くのジムはこうしたフォローアップを提供しています。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-pink-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-700 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">体重計に毎日乗り、数値を記録</h4>
                    <p className="text-gray-700 text-sm">
                      終了後のリバウンドは「気づかない間に」起こります。毎日体重を計測し、週平均で 1kg 以上の増加が見られたら、すぐにトレーニング・食事を調整。習慣化することで、リバウンド幅を最小化できます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>継続のコツ</strong>：短期集中の「厳しさ」を経験することで、その後の食事・運動選択が変わります。完全に元の生活に戻すのではなく、「80% の厳しさ」を継続するイメージで、長期的に体を維持できます。
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
              あなたにぴったりのパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。料金、口コミ、トレーナー情報から自分にぴったりのジムが見つかります。
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
                href="/column/gym-diet/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムでダイエットを成功させる方法
                </h3>
                <p className="text-sm text-gray-600">
                  ダイエット成功のポイントを徹底解説
                </p>
              </Link>
              <Link
                href="/column/gym-rebound/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジム卒業後のリバウンドを防ぐ方法
                </h3>
                <p className="text-sm text-gray-600">
                  リバウンド防止方法を完全解説
                </p>
              </Link>
              <Link
                href="/column/gym-price/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムの料金相場｜費用を抑えるコツ
                </h3>
                <p className="text-sm text-gray-600">
                  料金相場と費用を抑える方法を紹介
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
