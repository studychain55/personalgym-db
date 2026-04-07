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
      question: "バルクアップとダイエットは同時にできますか？",
      answer: "難しいです。バルクアップ（増量期）は筋肉成長を優先するため、わずかなカロリー過剰が必要。ダイエット（減量期）は脂肪燃焼を優先します。効率的には、増量期3～4ヶ月、減量期2～3ヶ月のサイクルが一般的です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "筋肉をつけるために必要なタンパク質量は？",
      answer: "体重1kg あたり1.6～2.2g が目安です。70kg の方なら112～154g が必要。毎食30～40g のタンパク質を摂取し、1日の合計で必要量に達するように配分します。パーソナルトレーナーが食事指導してくれます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "増量期に太りすぎてしまったら、どうすればいいですか？",
      answer: "増量期でも体脂肪率が25～30%を超えないようコントロールすることが重要。超えてしまった場合は、減量期を挟んで体脂肪を落としてから再び増量期に入ります。パーソナルトレーナーが体脂肪率を管理し、食事と運動をサポートします。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "プロテインは毎日必要ですか？",
      answer: "食事で十分なタンパク質が摂取できれば不要。ただし、忙しくて毎食タンパク質を確保できない場合、プロテイン補給は効率的です。トレーニング直後1～2時間以内にプロテインを摂取すると、筋タンパク質合成が促進されます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムで筋肉がつきやすい環境整備をしてくれますか？",
      answer: "します。フォーム矯正による効率的なトレーニング、個別の栄養アドバイス、進捗管理、負荷調整など、自分では難しい環境整備をトレーナーがサポート。結果として、独学の2～3倍速く筋肉成長が期待できます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "減量期の筋肉分解を防ぐにはどうすればいいですか？",
      answer: "減量期でも十分なタンパク質摂取（体重1kg あたり1.6～2.2g）とレジスタンストレーニングの継続が必須。過度な食事制限を避け、緩やかなカロリー制限（-300～500kcal）を心がけます。パーソナルトレーナーの食事・運動管理で筋肉損失を最小化できます。",
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
    { label: "筋肉をつけるためのパーソナルジム活用法" },
  ];

  const pageTitle = "筋肉をつけるためのパーソナルジム活用法｜バルクアップと増量期のコツ";
  const pageUrl = `${baseSiteUrl}/column/gym-muscle/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムで効率よく筋肉をつけるための方法を解説。バルクアップに必要な食事・トレーニングの組み合わせ、増量期と減量期の切り替え、プロテインの活用法を紹介。"
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
              description: "パーソナルジムで効率よく筋肉をつけるための方法を解説。バルクアップに必要な食事・トレーニングの組み合わせ、増量期と減量期の切り替え、プロテインの活用法を紹介。",
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
              パーソナルジムで効率的に筋肉をつけるには、単なるトレーニングだけでなく、目標設定、食事戦略、増量期と減量期のサイクル、プロテイン活用、そしてパーソナルトレーナーのサポートが不可欠です。このガイドでは、バルクアップの基本から実践的なコツ、増量期と減量期の切り替え方法、プロテインの正しい活用法、パーソナルトレーナーに依頼するメリットをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: バルクアップの基本 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                バルクアップとダイエットの違い
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                筋肉をつけるために最初に理解すべきは、バルクアップ（増量期）とダイエット（減量期）の本質的な違いです。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">バルクアップ（増量期）の目的</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    筋肉の成長を最優先に、わずかなカロリー過剰を作る時期です。筋肉と同時に、若干の脂肪も増える可能性がありますが、それは許容範囲内。筋肥大に必要なタンパク質とカロリーを確保することが目標です。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm space-y-2">
                    <p><strong>カロリー目標</strong>：日々の基礎代謝 + 300～500kcal</p>
                    <p><strong>期間</strong>：3～4ヶ月（筋肉成長が十分になるまで）</p>
                    <p><strong>体脂肪率の変化</strong>：+3～5% 程度の増加は許容</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ダイエット（減量期）の目的</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    増量期で獲得した筋肉を残しながら、不要な脂肪を落とす時期。過度なカロリー制限は筋肉分解につながるため、緩やかなカロリー制限と継続的なレジスタンストレーニングが重要です。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm space-y-2">
                    <p><strong>カロリー目標</strong>：日々の基礎代謝 - 300～500kcal</p>
                    <p><strong>期間</strong>：2～3ヶ月（目標体脂肪率に達するまで）</p>
                    <p><strong>筋肉維持</strong>：十分なタンパク質摂取とトレーニング継続が必須</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>目標設定が成功のカギ</strong>：「筋肉をつけたい」という漠然とした目標ではなく、「3ヶ月のバルクアップで5kg の筋肉を獲得する」などの具体的な目標を立てることが重要です。パーソナルトレーナーと目標を共有しましょう。
                </p>
              </div>
            </section>

            {/* Section 2: 筋肥大に必要な栄養 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋肥大に必要なカロリー・タンパク質量の目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                筋肉成長は、適切な栄養摂取なしでは成立しません。具体的な数値目安を紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">タンパク質摂取量</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>推奨摂取量：体重1kg あたり 1.6～2.2g</strong>
                      <p className="mt-1">例）70kg の場合、1日112～154g</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>摂取方法：毎食30～40g を目安に分散</strong>
                      <p className="mt-1">朝食：30g、昼食：40g、夜食：40g、間食：20g など</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>タンパク質源の例</strong>
                      <p className="mt-1">鶏肉（100g で20g）、卵（1個 で6g）、プロテイン（1杯で20～25g）</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">カロリー計算例</h3>
                  <p className="text-gray-700 text-sm mb-3">70kg、基礎代謝 1,600kcal の場合：</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong className="text-blue-700">バルクアップ時：</strong>
                      1,600 + 300～500kcal = 1,900～2,100kcal
                    </li>
                    <li>
                      <strong className="text-green-700">減量期時：</strong>
                      1,600 - 300～500kcal = 1,100～1,300kcal
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">炭水化物と脂肪の配分</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>炭水化物</strong>：総カロリーの45～50%（トレーニングのエネルギー源）</p>
                    <p><strong>脂肪</strong>：総カロリーの20～25%（ホルモン産生に必須）</p>
                    <p><strong>タンパク質</strong>：総カロリーの25～30%（筋肉成長に必須）</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: 増量期・減量期のサイクル */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                増量期・減量期のサイクルトレーニング
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                効率的に筋肉をつけるには、増量期と減量期の戦略的な切り替えが必須です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">年間サイクル例</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>1月～3月：バルクアップ（増量期）</strong>
                      <p className="mt-1">カロリー +300～500kcal、週3～4回のレジスタンストレーニング</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <strong>4月～5月：カッティング（減量期）</strong>
                      <p className="mt-1">カロリー -300～500kcal、週3～4回のレジスタンストレーニング＋週1～2回の有酸素運動</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>6月～8月：バルクアップ</strong>
                      <p className="mt-1">夏に向け、さらに筋肉成長を目指す</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <strong>9月～10月：カッティング</strong>
                      <p className="mt-1">秋のボディメイク完成に向け、脂肪調整</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">切り替え時のコツ</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>段階的な調整</strong>
                        <p className="text-gray-600">急激なカロリー変更は避ける。1週間かけて徐々に調整するのが理想的。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>体脂肪率の管理</strong>
                        <p className="text-gray-600">バルクアップ中も体脂肪率が25～30% を超えないようコントロール。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>トレーニングメニューの調整</strong>
                        <p className="text-gray-600">減量期は有酸素運動を増やし、筋肉分解を最小化するため負荷は落とさない。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: 重量・回数・セット数 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋肥大のための重量・回数・セット数の組み方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                筋肉を効率的に成長させるには、科学的な負荷設定が重要です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">最適なレップ数（回数）</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>筋肥大に最適：6～12レップ（RM）</strong>
                      <p className="mt-1">この範囲で最後の1～2回が全力が必要な重さが理想的。例）12回で限界が来る重さを選び、そこで3セット実施。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>高レップ（15～20回）の場合</strong>
                      <p className="mt-1">筋耐性向上が目標。筋肥大より筋持久力が強化される。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>低レップ（3～6回）の場合</strong>
                      <p className="mt-1">筋力向上が目標。筋肥大も期待できるが、怪我リスク上昇のため上級者推奨。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">セット数の目安</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    1部位あたり週10～20セットが筋肥大に最適です。具体例：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・スクワット週3日：12回×3セット＋8回×2セット = 25セット（多すぎる場合は調整）</li>
                    <li>・ベンチプレス週3日：12回×3セット = 9セット</li>
                    <li>・その他補助運動：各3～4セット</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">トレーニング分割例（週4日）</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>月（胸・肩・三頭筋）</strong>：ベンチプレス、ダンベルフライ、ショルダープレス</p>
                    <p><strong>火（背中・二頭筋）</strong>：ラットプルダウン、ダンベルロウ、バーベルカール</p>
                    <p><strong>木（脚）</strong>：スクワット、レッグプレス、レッグカール</p>
                    <p><strong>金（補助・有酸素）</strong>：補助運動、軽い有酸素運動</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: プロテインと食事タイミング */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                プロテインと食事タイミングの最適化
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                食事タイミングを最適化することで、筋肉成長の効率が格段に向上します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">プロテイン摂取のベストタイミング</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>トレーニング直後（30分以内）</strong>
                      <p className="mt-1">筋タンパク質合成のゴールデンタイム。プロテイン20～30g と炭水化物30～50g を摂取して、筋肉成長を最大化。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>朝食時</strong>
                      <p className="mt-1">就寝中に筋タンパク質分解が進むため、朝は十分なタンパク質補給が重要。30～40g のプロテインを含む朝食。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>就寝1時間前</strong>
                      <p className="mt-1">夜間の筋タンパク質分解を抑制。カゼイン系プロテイン（牛乳、ギリシャヨーグルト）がゆっくり吸収され効果的。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">プロテイン選びのコツ</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ホエイプロテイン</strong> — 吸収が早く、トレーニング直後に最適。筋肥大に向く。
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>カゼインプロテイン</strong> — 吸収がゆっくり。就寝前に最適。
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ソイプロテイン</strong> — ホエイと同等の効果。乳製品アレルギーがある場合に最適。
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">日常の食事タイミング例</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>朝7時</strong>：卵2個 + 食パン + プロテイン</p>
                    <p><strong>昼12時</strong>：鶏むね肉 + ご飯 + 野菜</p>
                    <p><strong>昼3時</strong>：プロテイン + バナナ</p>
                    <p><strong>トレーニング（17時）</strong></p>
                    <p><strong>夜19時</strong>：プロテイン + 炭水化物（最も重要）</p>
                    <p><strong>夜22時</strong>：牛乳 + ギリシャヨーグルト</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: パーソナルトレーナーの活用 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーに依頼するメリット
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                筋肉をつけるプロセスを加速させるため、パーソナルトレーナーのサポートが有効です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    正確なフォーム矯正
                  </h4>
                  <p className="text-gray-700 text-sm">
                    間違ったフォームで筋トレを続けると、効果が激減し、怪我のリスクが高まります。トレーナーが毎回フォームを矯正することで、効率的で安全なトレーニングが実現。結果として筋肉成長が2～3倍速くなります。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    個別の栄養管理
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体重、体脂肪率、トレーニング頻度に基づいた個別の食事指導。何を、いつ、どのくらい食べるかが明確になり、栄養管理の試行錯誤が不要に。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    進捗管理と負荷調整
                  </h4>
                  <p className="text-gray-700 text-sm">
                    毎回の体重、体脂肪率、筋力を測定し、最適な負荷に自動調整。プラトー（停滞）を避け、継続的な成長を促進します。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    モチベーション維持
                  </h4>
                  <p className="text-gray-700 text-sm">
                    専門家からのサポートにより、挫折のリスクが減少。定期的な目標設定と達成の実感が、長期継続につながります。
                  </p>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h4 className="font-bold text-pink-900 mb-2">
                    増量期・減量期の切り替え判断
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体の状態に基づき、最適なタイミングでサイクルを切り替え。個人の判断よりも効率的で正確な判断が可能。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>パーソナルジムの効果</strong>：独学でトレーニングする場合、結果が出るまでに6～12ヶ月かかることがほとんどです。パーソナルジムなら、正確なアドバイスと管理により、同じ結果を3～4ヶ月で達成可能。費用対効果は十分です。
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                筋肉成長をサポートするパーソナルジムを見つけましょう
              </h2>
              <p className="text-gray-700 mb-6">
                バルクアップ成功の鍵は、正確な知識と継続的なサポート。あなたの筋肉成長目標を実現するジムを選びましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/all/"
                  className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold rounded-lg px-6 py-3 hover:bg-blue-800 transition-all"
                >
                  全国のパーソナルジムから探す
                </Link>
                <Link
                  href="/column/gym-nutrition/"
                  className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 font-bold rounded-lg px-6 py-3 hover:bg-gray-300 transition-all"
                >
                  食事管理の詳細を見る
                </Link>
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
