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
      question: "筋トレ効果を高めるために有酸素運動は必要ですか？",
      answer: "目標によって異なります。筋肉肥大が目標なら、有酸素運動は週1～2回程度に抑え、主にレジスタンストレーニングに力を入れましょう。体脂肪を減らしながら筋肉をつけたいなら、週2～3回の軽い有酸素運動（ジョギングやウォーキング）とレジスタンストレーニングを組み合わせるのが効果的です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "筋肥大を促進するために最適なトレーニングボリュームは？",
      answer: "1部位あたり週10～20セットが目安です。複合関節運動（スクワット、ベンチプレス）で6～12回のレップ数（RM）で行い、最後の1～2回が限界になる負荷が理想的です。トレーナーと相談して、個人の体力レベルに合わせたボリュームを決めましょう。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニング後の栄養補給タイミングは本当に重要ですか？",
      answer: "タンパク質は24時間かけて筋合成が行われるため、1回のタイミングより1日を通した合計摂取量が重要です。ただし、トレーニング後2～3時間以内にタンパク質と炭水化物を摂取すれば、より効率的です。パーソナルジムのトレーナーが食事タイミングをアドバイスしてくれます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ピリオダイゼーション（周期化）トレーニングの効果は？",
      answer: "ピリオダイゼーションは数週間単位でトレーニング強度・ボリュームを変化させる手法です。プラトー（停滞）を防ぎ、継続的な成長を促進します。4～8週間の周期で負荷を調整することで、筋力と筋肥大の両立が可能です。パーソナルトレーナーが個人に合わせたプログラムを設計します。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "HIIT（高強度インターバルトレーニング）は筋肥大を妨げますか？",
      answer: "HIIT を週1～2回程度に抑えれば、筋肥大を妨げません。むしろ心血管機能の改善と脂肪燃焼が期待でき、効率的な体脂肪の削減が可能です。ただし、メインのレジスタンストレーニングが優先で、HIIT は補助的に行うのが効果的です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルトレーナーのサポートで筋トレ効果は変わりますか？",
      answer: "大きく変わります。適切なフォーム矯正により怪我を防ぎ、効果的なトレーニングが可能です。また、個人の進捗に合わせた負荷調整、モチベーション維持、定期的なプログラム見直しなど、トレーナーのサポートは筋肥大効果を大幅に高めます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymMusclePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "筋トレ効果を高めるパーソナルジム活用法" },
  ];

  const pageTitle = "筋トレ効果を高めるパーソナルジム活用法｜有酸素運動との組み合わせ";
  const pageUrl = `${baseSiteUrl}/column/gym-muscle/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="筋肉肥大を目指す方へ。レジスタンストレーニングの効果を最大化する方法、有酸素運動との組み合わせ、栄養タイミング、パーソナルトレーナーの活用法を詳解します。"
        path="/column/gym-muscle/"
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
              description: "筋肉肥大を目指す方へ。レジスタンストレーニングの効果を最大化する方法、有酸素運動との組み合わせ、栄養タイミング、パーソナルトレーナーの活用法を詳解します。",
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
              筋肥大を目指す方が最大限の効果を得るためには、適切なトレーニング方法、栄養、そして有酸素運動とのバランスが重要です。このガイドでは、パーソナルジムで筋肉を効果的に成長させるための科学的アプローチと、プロのトレーナーサポートの活用法をお届けします。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                レジスタンストレーニングの基本原則
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                筋肥大を目指すレジスタンストレーニングには、以下の基本原則があります：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">適切な負荷選択</h3>
                    <p className="text-gray-600">1回のトレーニングで6～12回のレップ数（RM：最大反復回数）で限界が来る負荷が理想的です。最後の1～2回が全力が必要な重さを選びましょう。パーソナルトレーナーが個人体力に合わせた重さを提案します。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">トレーニングボリュームの管理</h3>
                    <p className="text-gray-600">1部位あたり週10～20セットが筋肥大に最適です。例えば、ベンチプレスなら週3回トレーニングして、合計15～20セット程度が目安。無理のない範囲で段階的にボリュームを増やしましょう。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">正確なフォーム</h3>
                    <p className="text-gray-600">重い重量を扱う場合、フォームの正確性が特に重要です。正確なフォームにより、ターゲット筋肉に効果的に負荷がかかり、怪我のリスクも減少します。パーソナルトレーナーの指導は必須です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">充分な回復時間</h3>
                    <p className="text-gray-600">同じ筋肉部位は最低48時間の回復期間を設けましょう。筋肉は休息中に成長するため、トレーニングと休息のバランスが重要です。週2～3回のトレーニングペースが多くの人に適切です。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                有酸素運動との組み合わせ方
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                筋肥大と有酸素運動は相反する面もありますが、適切に組み合わせることで相乗効果が期待できます：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">筋肥大重視の場合</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ 有酸素運動は週1～2回に抑える</li>
                    <li>✓ 1回20～30分程度の軽いもの</li>
                    <li>✓ ウォーキングやジョギングが目安</li>
                    <li>✓ レジスタンストレーニングを優先</li>
                    <li>✓ 体脂肪管理は食事で調整</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">筋力×脂肪燃焼の場合</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ レジスタンストレーニング週3回</li>
                    <li>✓ 軽い有酸素運動週2～3回</li>
                    <li>✓ HIIT週1回程度の活用</li>
                    <li>✓ 総運動時間のバランス調整</li>
                    <li>✓ 栄養摂取量の増加</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-gray-700"><strong>ポイント：</strong> パーソナルトレーナーと目標を共有し、有酸素運動の頻度と強度を調整することが成功の鍵です。パーソナルジムなら、レジスタンストレーニングと有酸素運動の両方をサポートしてくれます。</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                栄養タイミングと食事戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                筋肥大のためには、トレーニングと同じくらい食事が重要です：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>タンパク質の合計摂取量</strong> — 1日に体重1kg あたり1.6～2.2g が目安（70kg なら112～154g）</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーニング前の栄養</strong> — 1～2時間前に炭水化物とタンパク質を摂取し、エネルギーと筋タンパク質合成の準備</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>トレーニング直後の栄養</strong> — 30～60分以内にタンパク質と炭水化物を摂取すると、筋合成が促進される</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>夜間の栄養</strong> — 就寝前にカゼイン系プロテイン（牛乳など）を摂取すると、長時間の筋タンパク質合成が期待できる</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>総カロリー管理</strong> — 筋肥大にはわずかなカロリー過剰（+300～500kcal）が効果的</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ピリオダイゼーション（周期化）トレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                同じトレーニングを続けるとプラトー（停滞）が訪れます。ピリオダイゼーションで継続的な成長を促しましょう：
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">第1段階（1～2週）：軽い段階</h3>
                  <p className="text-gray-700 text-sm">軽い負荷で高レップ数（12～15回）。CNS（中枢神経系）の回復と筋の準備段階。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">第2段階（3～4週）：筋肥大重視</h3>
                  <p className="text-gray-700 text-sm">中程度の負荷で中程度レップ数（8～12回）。最適な筋肥大刺激を与える段階。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">第3段階（3～4週）：筋力重視</h3>
                  <p className="text-gray-700 text-sm">高い負荷で低レップ数（3～6回）。神経系の適応と筋力向上を目指す段階。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">第4段階（1週）：減負荷期</h3>
                  <p className="text-gray-700 text-sm">軽い負荷で低レップ数。体の疲労回復と次のサイクルへの準備。</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">この4週間のサイクルを繰り返すことで、プラトーを避けながら継続的な成長が期待できます。</p>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                HIIT と筋肥大の両立
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                高強度インターバルトレーニング（HIIT）は心肺機能と脂肪燃焼に優れていますが、筋肥大トレーニングと両立できます：
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>頻度の調整</strong> — HIIT は週1～2回に抑え、レジスタンストレーニングを優先</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>実施時間</strong> — 15～20分程度が目安。長時間のHIIT は筋分解のリスクが高まる</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>実施タイミング</strong> — レジスタンストレーニング後に軽く行うか、別日に実施</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>栄養の確保</strong> — HIIT を取り入れる場合、総カロリー摂取を30～50kcal 多めに調整</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーの活用法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                筋肥大を最大化するために、パーソナルトレーナーのサポートが不可欠です：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">フォーム矯正</h3>
                  <p className="text-sm text-gray-700">正確なフォームで最大の筋力を発揮。怪我防止と効果最大化を実現します。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">個別プログラム設計</h3>
                  <p className="text-sm text-gray-700">体力、目標、進捗に合わせた最適なトレーニングプランを作成。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">負荷調整</h3>
                  <p className="text-sm text-gray-700">毎回適切な負荷を提案。プラトーを避け、継続的な成長を促進。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">食事・栄養指導</h3>
                  <p className="text-sm text-gray-700">筋肥大に必要な栄養アドバイス。効果を最大化する食事戦略を指導。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">進捗測定・分析</h3>
                  <p className="text-sm text-gray-700">定期的な体力測定と体組成分析で、成長を可視化。</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">モチベーション維持</h3>
                  <p className="text-sm text-gray-700">プロのトレーナーのサポートで、長期的な継続を実現。</p>
                </div>
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
              筋肥大を実現するパーソナルジムを見つけましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              全国のパーソナルジム情報を掲載。筋肥大実績豊富なトレーナーが揃ったジムから、最適な選択ができます。
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
                  トレーニング効果を最大化する食事戦略を解説します
                </p>
              </Link>
              <Link
                href="/column/training-frequency/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルトレーニングの通う頻度・回数の目安
                </h3>
                <p className="text-sm text-gray-600">
                  目標別の最適な通所頻度を解説します
                </p>
              </Link>
              <Link
                href="/column/gym-bodymake/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムで体が変わるまでの期間｜目標別タイムライン
                </h3>
                <p className="text-sm text-gray-600">
                  現実的な結果期待値を設定する方法を解説します
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
