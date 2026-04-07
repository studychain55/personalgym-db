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
      question: "トレーニング前後の食事タイミングはなぜ重要なのですか？",
      answer: "トレーニング前後の栄養摂取は、『トレーニング効果の最大化』『筋肉の合成促進』『疲労回復の加速』『次のセッションへの準備』に直結します。同じトレーニングをしても、食事タイミングで結果が2倍以上変わります。パーソナルジムのトレーナーは、この食事タイミングの指導に力を入れています。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "トレーニング何時間前に食事をすべき？",
      answer: "一般的には『2～3時間前』が目安です。大きな食事（米・タンパク質・野菜）は3時間前、軽い食事（バナナ・おにぎり）は1時間前、プロテインドリンクは30分前が理想的です。消化時間は個人差があるため、パーソナルトレーナーとの相談で最適なタイミングを決めることが重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニング後の『ゴールデンタイム』とは？",
      answer: "トレーニング後30分以内の栄養摂取のことを指します。この時間帯に高速吸収のプロテイン＋炭水化物を摂取することで、筋肉の合成が促進され、トレーニング効果が最大化されます。多くのジムが『セッション後はすぐにプロテインを飲む』と勧める理由は、この科学的根拠に基づいています。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "トレーニング前は何を食べるべき？",
      answer: "『良質なタンパク質（鶏胸肉・卵・魚）』『複合炭水化物（米・オートミール・サツマイモ）』『適度な脂質』の3つがバランスよく含まれた食事が理想的です。特に炭水化物は、トレーニング中のエネルギー源となり、パフォーマンス向上に直結します。ただし、消化しきる前にトレーニングを開始すると、胃もたれや気分の悪さが生じます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "トレーニング後の食事で避けるべき食べ物は？",
      answer: "『高脂肪食（揚げ物・ラーメン）』『高食物繊維食（ゴボウ・キノコ）』『アルコール』を避けるべきです。これらは消化に時間がかかり、せっかくのゴールデンタイムに栄養が吸収されません。トレーニング後2時間は『素早い吸収』を最優先にした食事選びが重要です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "毎日のトレーニング時間が異なる場合、食事タイミングはどう調整する？",
      answer: "『トレーニング開始時間から逆算して食事タイミングを決める』ことが原則です。朝6時トレーニングなら4～5時に起床して朝食、夜20時トレーニングなら17～18時に夕食、という具合に調整します。パーソナルジムではセッション時間が固定されることが多いため、ジム側が食事タイミング指導を事前に提供していることが多いです。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymNutritionTimingPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "トレーニングの食事タイミング｜プロテイン・炭水化物の摂り方" },
  ];

  const pageTitle = "トレーニングの食事タイミング｜プロテイン・炭水化物の摂り方";
  const pageUrl = `${baseSiteUrl}/column/gym-nutrition-timing/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="トレーニング前後の食事タイミングを完全解説。ゴールデンタイムの効果、トレーニング前の最適な食事、プロテイン摂取のベストタイミング、炭水化物・タンパク質の役割を詳しく紹介。"
        path="/column/gym-nutrition-timing/"
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
              description: "トレーニング前後の食事タイミングを完全解説。ゴールデンタイムの効果、トレーニング前の最適な食事、プロテイン摂取のベストタイミング、炭水化物・タンパク質の役割を詳しく紹介。",
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
              栄養管理
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでトレーニングを始めると「いつ何を食べるべきか」という質問は必ず出てきます。実は、同じ内容のトレーニングでも『食事タイミング』によってトレーニング効果が2～3倍変わります。多くの初心者は、栄養の『量』には気をつけますが、『タイミング』を見落としています。このガイドでは、トレーニング前後の食事タイミングの科学的根拠、ゴールデンタイムの正しい活用法、トレーニング前の最適な食事内容、プロテイン・炭水化物・タンパク質の役割と摂取タイミング、パーソナルジムのトレーナーが教える実践的な食事戦略を詳しく解説します。目標別（ダイエット・筋力アップ）の食事タイミング調整方法も掲載しています。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: ゴールデンタイム */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーニング後30分の『ゴールデンタイム』を最大限活用する
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ゴールデンタイムは、筋肉が成長するために最も栄養を必要とする時間帯です。この時間帯の栄養摂取で、トレーニング効果が大きく変わります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ゴールデンタイムの科学的な仕組み</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング中に筋線維が破壊され、その修復過程で筋肉が成長します。この修復に必要なタンパク質と炭水化物を、『破壊直後』に供給することが重要です。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">トレーニング直後の筋肉の状態</p>
                      <p className="text-gray-700 text-sm mt-2">トレーニング直後、筋肉は『ダメージを受けた状態』です。この状態で栄養を供給することで、筋肉の修復と合成が急速に促進されます。この反応は30分以内にピークを迎え、その後徐々に低下していきます。</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">タンパク質と炭水化物の役割</p>
                      <p className="text-gray-700 text-sm mt-2">タンパク質は『筋肉の修復材料』、炭水化物は『修復に必要なエネルギー』として機能します。どちらか一方だけでは効果が半減するため、この時間帯は『タンパク質＋炭水化物の組み合わせ』が必須です。</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-909">インスリンの役割</p>
                      <p className="text-gray-700 text-sm mt-2">炭水化物を摂取するとインスリンが分泌され、これが『タンパク質の吸収を促進』する働きをします。タンパク質とインスリンは相互に作用し、筋肉の成長を加速させます。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ゴールデンタイムの具体的な時間経過と効果</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    栄養摂取のタイミングが遅れるにつれ、筋肉の合成効率が低下します。
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-50 border-b border-gray-300">
                          <th className="text-left p-3 border border-gray-300">タイミング</th>
                          <th className="text-left p-3 border border-gray-300">筋肉の合成効率</th>
                          <th className="text-left p-3 border border-gray-300">推奨される栄養</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">直後～15分以内</td>
                          <td className="p-3 border border-gray-300 text-red-700 font-bold">100%（ピーク）</td>
                          <td className="p-3 border border-gray-300">高速吸収プロテイン＋単純炭水化物（ぶどう糖）</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">15～30分</td>
                          <td className="p-3 border border-gray-300 text-orange-700 font-bold">80～90%</td>
                          <td className="p-3 border border-gray-300">プロテイン＋炭水化物（米・バナナ）</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">30～60分</td>
                          <td className="p-3 border border-gray-300 text-yellow-700 font-bold">60～70%</td>
                          <td className="p-3 border border-gray-300">プロテイン＋複合炭水化物</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-300 font-bold">60分以降</td>
                          <td className="p-3 border border-gray-300 text-gray-700 font-bold">30～40%</td>
                          <td className="p-3 border border-gray-300">通常の食事（効果が大幅に低下）</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ゴールデンタイムの最適な栄養摂取量</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ただし、栄養をとれば良いわけではありません。適切な量を摂取することが重要です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>タンパク質：体重1kg当たり0.25～0.4g</strong>
                        <p className="text-gray-600">体重60kgなら、15～24gのタンパク質が目安。プロテイン1杯（20g）で対応できる場合が多い</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>炭水化物：タンパク質の1～2倍の量</strong>
                        <p className="text-gray-600">タンパク質20gなら、炭水化物20～40gが目安。バナナ1本で約27g、おにぎり1個で約40g含まれている</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>脂質は避ける</strong>
                        <p className="text-gray-600">脂質は消化が遅く、ゴールデンタイムの効果を損なう。この時間帯は脂質をなるべく避ける</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ゴールデンタイムの実践的な食事例</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    実際のパーソナルジムで多くのトレーナーが勧める食事パターンを紹介します。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">パターン1：プロテイン＋バナナ（最も手軽）</p>
                      <p className="text-gray-700 text-sm">プロテイン1杯（20g）＋バナナ1本（炭水化物27g）。ジムで飲めて、準備が簡単。吸収も最速。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">パターン2：プロテイン＋おにぎり（バランス重視）</p>
                      <p className="text-gray-700 text-sm">プロテイン1杯（20g）＋白米おにぎり1個（炭水化物40g）。持参が簡単で、栄養のバランスが優れている。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">パターン3：プロテイン＋ぶどう糖（最速吸収）</p>
                      <p className="text-gray-700 text-sm">プロテイン1杯（20g）＋ぶどう糖タブレット（20～30g）。吸収が最速で、セッション直後の摂取に最適。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">パターン4：鶏胸肉＋米（本格的）</p>
                      <p className="text-gray-700 text-sm">加熱済みの鶏胸肉150g（タンパク質35g）＋米200g（炭水化物50g）。最も栄養価が高いが、準備に時間がかかる。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>ゴールデンタイムの効果：同じトレーニングでも、ゴールデンタイムに栄養摂取＝筋肉成長30～50%向上。パーソナルジムを選ぶ時は、この時間帯の栄養摂取をサポートしているかを確認しましょう。</strong>
                </p>
              </div>
            </section>

            {/* Section 2: トレーニング前の食事 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーニング前の最適な食事タイミングと内容
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                トレーニング前の食事は『パフォーマンス向上』『エネルギー供給』『消化負担の回避』の3つを同時に満たす必要があります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング前の食事タイミングガイド</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    食事の『種類』によって消化時間が異なるため、タイミングを調整することが重要です。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900">3時間前：大きな食事</p>
                      <p className="text-gray-700 text-sm mt-2">タンパク質30～40g＋炭水化物60～80g＋脂質10～15gを含む食事。朝食や夕食がこれに相当する。充分に消化され、トレーニング中の胃もたれがない。</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900">1.5～2時間前：中程度の食事</p>
                      <p className="text-gray-700 text-sm mt-2">タンパク質20～30g＋炭水化物40～50g程度。弁当やサンドイッチなど、軽めの食事。十分に消化されるまで時間を確保できる場合に推奨。</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900">1時間前：軽い食事</p>
                      <p className="text-gray-700 text-sm mt-2">バナナ・おにぎり・エネルギーバー程度。脂肪が少なく、炭水化物が中心。消化が早く、トレーニング中のエネルギー源になる。</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900">30分前：液体・ドリンク</p>
                      <p className="text-gray-700 text-sm mt-2">プロテインドリンク・スポーツドリンク・ジュース程度。固形物ではなく液体が理想的。消化時間が最小化される。</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-900">直前：何も摂取しない</p>
                      <p className="text-gray-700 text-sm mt-2">トレーニング直前（10分以内）の食事は、胃が重くなりパフォーマンスが低下する可能性があるため避ける。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング前の最適な栄養バランス</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング前の食事では、3つの栄養素のバランスが重要です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>炭水化物（最優先）：全体の50～60%</strong>
                        <p className="text-gray-600">トレーニング中のエネルギー源として、十分な量が必須。複合炭水化物（米・オートミール・全粒粉パン）が推奨。単純糖質も急速なエネルギー補給に有効。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>タンパク質：全体の20～30%</strong>
                        <p className="text-gray-600">トレーニング中の筋タンパク質分解を抑制する役割。適度に含まれることで、トレーニング効果が高まる。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>脂質：全体の10～20%（少なめ）</strong>
                        <p className="text-gray-600">脂質が多いと消化に時間がかかり、トレーニング中の胃もたれ・パフォーマンス低下につながる。この時間帯は脂質を意識的に減らす。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング前の食事例（パターン別）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    実際のパーソナルジム通いで多く見られる食事パターンです。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">朝6時トレーニングの場合（3時間前食事）</p>
                      <p className="text-gray-700 text-sm">3時に起床 → 食事（白粥250g＋卵1個＋みそ汁）→ 3時間後6時セッション開始。十分な栄養＋十分な消化時間</p>
                    </div>
                    <li className="flex gap-3"></li>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">午前10時トレーニングの場合（2時間前食事）</p>
                      <p className="text-gray-700 text-sm">8時朝食終了 → 10時セッション開始。朝食からの時間がちょうど2時間でベストタイミング。バナナ1本を9時半に追加しても良い。</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">昼12時トレーニングの場合（1時間前食事）</p>
                      <p className="text-gray-700 text-sm">11時にサンドイッチまたはおにぎりを軽く食べる。脂肪が少なく、炭水化物が多い選択が重要。</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">夜20時トレーニングの場合（3時間前食事）</p>
                      <p className="text-gray-700 text-sm">17時に夕食を完全に済ませる。夜遅いトレーニングは朝食・昼食・早めの夕食で栄養を確保することが重要。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>トレーニング前の食事の価値：適切な食事＝トレーニング中のエネルギー不足なし＋パフォーマンス20～30%向上。個人差があるため、パーソナルトレーナーとの相談で最適なタイミングを調整することが重要です。</strong>
                </p>
              </div>
            </section>

            {/* Section 3: タンパク質と炭水化物の役割 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーニング効果を最大化するプロテインと炭水化物の役割
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムで『プロテインを飲みましょう』と勧められるのは、単なる営業ではなく、科学的な理由があります。プロテインと炭水化物の役割を正確に理解することが、効果的なトレーニングの第一歩です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">タンパク質の役割と摂取タイミング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    タンパク質は『筋肉の構成材料』です。トレーニング中のダメージを修復し、新しい筋肉を合成します。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">1. タンパク質の役割</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• 筋損傷の修復：トレーニングで破壊された筋線維を再構築</li>
                        <li>• 筋肉の成長：修復を超えて、より大きな筋肉を構築</li>
                        <li>• 酵素・ホルモン生成：体全体の機能維持</li>
                        <li>• 免疫機能向上：トレーニングによる免疫低下を補う</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">2. タンパク質の最適な摂取タイミング</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• トレーニング前30分：アミノ酸の血中濃度を高める</li>
                        <li>• トレーニング後30分以内：ゴールデンタイムでの最速吸収</li>
                        <li>• その他の食事時：3食＋間食で均等に分散</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">3. 1日のタンパク質摂取量</p>
                      <p className="text-gray-700 text-sm mt-2">体重1kg当たり1.6～2.2gが目安（筋力トレーニング実施時）。体重60kgなら96～132gが1日の目標。3食+プロテイン2杯で達成可能。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">炭水化物の役割と重要性</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    炭水化物は『エネルギー』です。トレーニング効果を最大化するためには、十分な炭水化物が必須です。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900">1. 炭水化物の役割</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• トレーニング中のエネルギー供給：筋力を発揮するための燃料</li>
                        <li>• 糖原（グリコーゲン）の補充：翌日のトレーニングに向けた準備</li>
                        <li>• インスリン分泌促進：タンパク質の吸収を効率化</li>
                        <li>• 中枢神経系の機能維持：トレーニング中の集中力</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900">2. トレーニング前後での炭水化物の違い</p>
                      <p className="text-gray-700 text-sm mt-2"><strong>前：複合炭水化物</strong>（米・オートミール・さつまいも）→ ゆっくりエネルギー供給で、トレーニング途中の失速を防ぐ<br/><strong>後：単純炭水化物</strong>（バナナ・ぶどう糖・白米）→ 素早い吸収でゴールデンタイムを最大活用</p>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900">3. 1日の炭水化物摂取量</p>
                      <p className="text-gray-700 text-sm mt-2">体重1kg当たり4～6gが目安（トレーニング実施日）。体重60kgなら240～360gが1日の目標。米3～4杯分相当。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">プロテインと炭水化物の黄金比</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    特に、ゴールデンタイムではこの比率が極めて重要です。
                  </p>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-bold text-purple-900">ゴールデンタイムの黄金比：タンパク質1に対して炭水化物1～2</p>
                    <p className="text-gray-700 text-sm mt-2">プロテイン20gなら、炭水化物20～40g。この比率で筋肉の合成が最大化されます。</p>
                    <ul className="text-gray-700 text-sm mt-3 space-y-1">
                      <li>• プロテイン20g＋バナナ1本（炭水化物27g）= 1：1.35の黄金比</li>
                      <li>• プロテイン20g＋米100g（炭水化物37g）= 1：1.85の黄金比</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>タンパク質＋炭水化物の相乗効果：プロテインだけ＝50%の効果 / 炭水化物だけ＝30%の効果 / 両方＝100%以上の相乗効果。パーソナルジムでの栄養指導は、この黄金比を教えることが最重要です。</strong>
                </p>
              </div>
            </section>

            {/* Section 4: 目標別の食事タイミング調整 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ダイエット・筋力アップ別の食事タイミング調整
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                同じトレーニングでも『目標』によって、食事タイミングを調整することで、より効果的な結果が得られます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ダイエット目的の場合</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    脂肪を落としながら筋肉を維持することが目標です。食事タイミングの工夫で、両立が可能です。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900">トレーニング前（2時間前）</p>
                      <p className="text-gray-700 text-sm">低脂質・中タンパク・中炭水化物。例：鶏胸肉150g+米150g。タンパク質で筋肉を保護しながら、炭水化物で運動エネルギーを確保。脂質を最小化。</p>
                    </div>

                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900">トレーニング直後（ゴールデンタイム）</p>
                      <p className="text-gray-700 text-sm">プロテイン20g+白米100g。ダイエット中も筋肉の合成を優先。ゴールデンタイムは『タンパク質摂取の最後の機会』と考え、絶対に逃さない。</p>
                    </div>

                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900">その他の食事</p>
                      <p className="text-gray-700 text-sm">朝食・昼食は通常量。夜間（トレーニング非実施時）はタンパク質中心で低炭水化物・低脂質。脂肪減少を優先しながら筋肉を保護。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">筋力アップ・バルクアップ目的の場合</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    筋肉を増やすことが目標です。栄養を積極的に摂取することが重要です。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900">トレーニング前（3時間前）</p>
                      <p className="text-gray-700 text-sm">高タンパク・高炭水化物・中程度脂質。例：鶏胸肉200g+米200g+卵1個。十分なエネルギーと栄養を確保し、高強度トレーニングをサポート。</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900">トレーニング直後（ゴールデンタイム）</p>
                      <p className="text-gray-700 text-sm">プロテイン25～30g+炭水化物50～60g。ダイエット時より多く摂取。筋肉成長の『カロリー供給源』として、積極的に栄養補給。</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900">その他の食事・間食</p>
                      <p className="text-gray-700 text-sm">朝食・昼食・夕食＋プロテイン2～3杯＋間食（ナッツ・チーズ等）。1日を通じて、カロリーと栄養をしっかり摂取。筋肉成長に必要なカロリー供給を最優先。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">共通の注意点</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    目標が異なっても、以下の2つは常に優先されるべきです。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>ゴールデンタイムは『目標を問わず最優先』</strong>
                        <p className="text-gray-600">ダイエット中でも、ゴールデンタイムのプロテイン摂取は絶対。これが筋肉を保護し、代謝を保つための最後の砦</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>『全く栄養がない状態でのトレーニング』は避ける</strong>
                        <p className="text-gray-600">朝起きてすぐ何も食べずにトレーニング、というのは最悪の選択。最低限のバナナやドリンクでも、効果が大きく異なる</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>食事タイミング調整の効果：同じトレーニング量でも、食事タイミングを最適化＝効果30～50%向上。パーソナルジムで食事指導を受けることの価値は、この細かいタイミング調整にあります。</strong>
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
