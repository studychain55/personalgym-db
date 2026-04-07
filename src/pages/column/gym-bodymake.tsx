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
      question: "パーソナルジムで体が変わる期間は個人差がありますか？",
      answer: "はい、個人差が大きくあります。同じプログラムでも、遺伝要因、ホルモンバランス、食事の質、睡眠の質、基礎代謝など様々な要因が影響します。ただし、正しい方法で継続すれば、3ヶ月～6ヶ月で目に見える変化が期待できます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "短期間で効果を出すコツはありますか？",
      answer: "①食事管理を徹底する（トレーニングと同等の重要性）、②睡眠を7時間以上確保する、③通所頻度を守る（週2～3回が目安）、④ストレスを軽減する、⑤プログラムに一貫性を持たせる。この5つを徹底することで、期待以上の結果が期待できます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "結果が出ない場合、いつプログラムを見直すべきですか？",
      answer: "最低でも2～3ヶ月継続してから見直しを検討してください。3ヶ月経過しても全く変化がない場合、①食事管理が不十分、②運動量が不足、③睡眠不足、④ストレス、⑤基礎疾患が考えられます。トレーナーと相談して原因を特定してください。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "いつまでパーソナルジムに通う必要がありますか？",
      answer: "目標達成後、その体を維持できるようになったらジム通いを卒業できます。ただし、生活習慣が乱れると戻る可能性があります。完全に習慣化するまで（通常6～12ヶ月）は、月1～2回程度の継続をおすすめします。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "結果が出た後、リバウンドを防ぐにはどうすればいい？",
      answer: "①基礎代謝の向上（筋肉量が増えることで代謝が上がる）に頼る、②習慣化した食事管理を続ける、③週1～2回程度の運動を継続する、④定期的に体を測定する。これらにより、リバウンドのリスクを大幅に低減できます。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymBodymakePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでの体の変化" },
  ];

  const pageTitle = "パーソナルジムで体が変わるまでの期間｜目標別タイムライン";
  const pageUrl = `${baseSiteUrl}/column/gym-bodymake/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムで体が変わるまでの期間を目標別に詳解。ダイエット、筋力アップ、姿勢改善など、目標別の現実的なタイムライン、変化を実感するための条件、加速化させるコツをまとめました。"
        path="/column/gym-bodymake/"
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
              description: "パーソナルジムで体が変わるまでの期間を目標別に詳解。ダイエット、筋力アップ、姿勢改善など、目標別の現実的なタイムラインをまとめました。",
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
              結果への期待値設定
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムに通い始めてから、実際に体が変わるまでにはどのくらいの期間が必要か？このガイドでは、目標別の現実的なタイムライン、変化を実感するための条件、結果を加速化させるコツを詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 目標別タイムライン */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標別・体の変化タイムライン
              </h2>
              <p className="text-gray-700 mb-6">
                目標によって、結果が出る期間は異なります。以下のタイムラインは、正しい方法で継続した場合の一般的な目安です。個人差があることをご理解ください。
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    目標1：ダイエット（体脂肪減少）
                  </h3>
                  <p className="text-gray-700 mb-4">
                    体脂肪を落とし、細くなりたい方のタイムラインです。
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">1～2週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：ほぼなし（1～2kg程度の水分減少）｜実感度：低
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        このタイミングで多くの人が「効果がない」と感じやすい期間です。ただし、体内では脂肪分解が始まり、基礎代謝が向上し始めています。
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">3～4週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：2～3kg減少、わずかに引き締まり始める｜実感度：中
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        周囲の人が「ちょっと痩せた？」と感じ始める段階です。食事管理と運動の効果が目に見え始めます。
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">2～3ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：5～8kg減少、明らかに引き締まる、顔が痩せる｜実感度：高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        周囲から「明らかに変わった」と言われるレベルになります。体のラインの変化を実感できます。
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">3～6ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：10～15kg減少、大幅な体形変化、シルエット変化｜実感度：非常に高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        「別人のようになった」という感想が出るレベルです。ダイエット目的の多くの人が、この段階で目標達成します。
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">6ヶ月以上</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：15kg以上の減少、理想的な体形を達成｜実感度：完全達成
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        細かい調整段階です。顔周りや下腹部など、最後に落ちやすい部位の微調整が行われます。
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 bg-yellow-50 p-3 rounded">
                    ⚠️ 目安：月1～2kg程度のペースが健康的です。急激な体重減少は、筋肉も一緒に落ちる可能性があります。
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    目標2：筋力アップ・ボディメイク
                  </h3>
                  <p className="text-gray-700 mb-4">
                    筋肉を増やし、メリハリのある体を作りたい方のタイムラインです。
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">1～4週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：ほぼなし、神経系の適応が進む｜実感度：低
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        最初は扱える重量が増えたり、反復回数が増えたりする「神経適応」の段階です。筋肉は目に見える変化がありません。
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-green-900 mb-2">1～2ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：わずかに筋肉がつき始める、服のフィット感が変わる｜実感度：中
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        筋肉が付き始め、体が引き締まり始めます。トレーニング後の筋肉の張りが顕著になります。
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-green-900 mb-2">2～3ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：明らかに筋肉がつく、体のラインが変わる｜実感度：高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        肩幅が広くなったり、腕や脚が太くなったり（良い意味で）、ボディラインが整い始めます。
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-green-900 mb-2">3～6ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：3～5kg筋肉が増える、メリハリのある体形に｜実感度：非常に高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        顕著な筋肉の増加が見られ、体全体のバランスが整います。「筋肉がついた」と周囲に認識されるレベルです。
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-green-900 mb-2">6ヶ月以上</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：5kg以上の筋肉増加、理想的なボディメイク完成｜実感度：完全達成
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        細かい調整と維持の段階です。目的に応じた微調整が行われます。
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 bg-yellow-50 p-3 rounded">
                    ⚠️ 注意：筋肉増加時は体重が増える場合があります。体重計ではなく、見た目や体脂肪率の変化を目安にしましょう。
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    目標3：姿勢改善・体の歪み改善
                  </h3>
                  <p className="text-gray-700 mb-4">
                    猫背や骨盤の歪みを改善したい方のタイムラインです。
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">1～2週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：姿勢が良くなった気がする、腰の痛みが減る｜実感度：中
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        正しい姿勢を意識し始める段階です。まだ習慣化していないため、気をつけないと元に戻りやすい時期です。
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded">
                      <h4 className="font-bold text-orange-900 mb-2">2～4週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：頭痛・肩こり・腰痛が改善、背筋が伸びる｜実感度：高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        より顕著な改善が見られます。周囲から「姿勢が良くなった」と言われることが多くなります。
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded">
                      <h4 className="font-bold text-orange-900 mb-2">1～3ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：姿勢が習慣化、体の歪みが改善される｜実感度：非常に高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        姿勢の改善が習慣化し、無意識でも良い姿勢を保つようになります。体全体のバランスが整い始めます。
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded">
                      <h4 className="font-bold text-orange-900 mb-2">3ヶ月以上</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：完全に姿勢が改善、痛みなし｜実感度：完全達成
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        姿勢改善は最も短期間で効果が出やすい目標です。正しい生活習慣の維持で改善を続けることができます。
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 bg-yellow-50 p-3 rounded">
                    ⚠️ ポイント：姿勢改善は、継続が最重要です。悪い習慣が戻ると元に戻る可能性があります。
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    目標4：体力向上・スポーツパフォーマンス向上
                  </h3>
                  <p className="text-gray-700 mb-4">
                    体力をつけたい、スポーツの成績を上げたい方のタイムラインです。
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">1～2週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：疲れやすい、筋肉痛が出やすい｜実感度：低
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        適応段階です。筋肉が正しい刺激に慣れ始めています。
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded">
                      <h4 className="font-bold text-purple-900 mb-2">2～4週間</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：トレーニングが楽に感じ始める、心肺機能向上｜実感度：中
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        少しずつ体力がついてきた実感が生まれます。同じ運動でも疲れにくくなります。
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded">
                      <h4 className="font-bold text-purple-900 mb-2">1～3ヶ月</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：スポーツパフォーマンス向上、持久力向上｜実感度：高
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        目に見えた体力向上が実感できます。競技記録や運動能力の向上が期待できます。
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded">
                      <h4 className="font-bold text-purple-900 mb-2">3ヶ月以上</h4>
                      <p className="text-gray-700 text-sm">
                        体の変化：顕著なパフォーマンス向上｜実感度：完全達成
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        競技記録の大幅な向上や、運動能力の飛躍的な向上が期待できます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: 体の変化を加速させるコツ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体の変化を加速させるための5つの条件
              </h2>
              <p className="text-gray-700 mb-6">
                結果を出すスピードは、トレーニング以外の要因に大きく左右されます。以下の5つの条件を守ることで、体の変化が3～4倍加速する可能性があります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    1. 食事管理を徹底する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニングの効果は、食事で決まると言っても過言ではありません。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ タンパク質を毎食摂取（体重×1.2～2.0g/日）</li>
                    <li>・ 夜遅い食事や夜食を避ける</li>
                    <li>・ 加工食品や外食の頻度を減らす</li>
                    <li>・ 水分補給を意識する（1日2～3L）</li>
                    <li>・ アルコール摂取を控える</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    2. 十分な睡眠を確保する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    筋肉は、トレーニング中ではなく睡眠中に成長します。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 毎日7～9時間の睡眠を目指す</li>
                    <li>・ 毎日同じ時間に寝起きする</li>
                    <li>・ 就寝1時間前はスマホを避ける</li>
                    <li>・ 寝室を暗く、涼しく保つ</li>
                    <li>・ 就寝前のカフェイン摂取を避ける</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    3. 通所頻度を守る
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    一貫したトレーニング頻度が、結果を生み出します。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ ダイエット目的：週2～3回（月8～12回）</li>
                    <li>・ 筋力アップ：週2～3回（月8～12回）</li>
                    <li>・ パフォーマンス向上：週2～4回（月10～16回）</li>
                    <li>・ 姿勢改善：週1～2回（月4～8回）</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    4. ストレス管理
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    ストレスはコルチゾールの分泌を増やし、体脂肪の増加につながります。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 瞑想やヨガなどのリラクゼーション</li>
                    <li>・ 定期的な運動でストレス解消</li>
                    <li>・ 好きなことの時間を作る</li>
                    <li>・ 深呼吸習慣をつける</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    5. プログラムの一貫性
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    複雑に変えすぎず、計画的にプログラムを進めることが重要です。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 最低2～3ヶ月は同じプログラムで進める</li>
                    <li>・ 定期的に進捗を測定する</li>
                    <li>・ トレーナーの指導に一貫性を持たせる</li>
                    <li>・ 目標に対する動機を保つ</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 結果が出ない場合 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3ヶ月経過しても結果が出ない場合
              </h2>
              <p className="text-gray-700 mb-6">
                正しい方法で継続すれば、3ヶ月で目に見える変化が期待できます。もし変化がない場合は、以下の原因が考えられます。
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <h3 className="text-lg font-bold text-red-700 mb-3">
                    考えられる主な原因
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="font-bold text-lg">1.</span>
                      <div>
                        <p className="font-bold">食事管理が不十分</p>
                        <p className="text-sm text-gray-600 mt-1">ダイエット目的なのに、家での食事が乱れている。または、トレーニング後に甘いものを食べ過ぎている可能性があります。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-lg">2.</span>
                      <div>
                        <p className="font-bold">睡眠不足</p>
                        <p className="text-sm text-gray-600 mt-1">6時間以下の睡眠では、体の適応が進みません。また、ホルモンバランスが乱れやすくなります。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-lg">3.</span>
                      <div>
                        <p className="font-bold">通所頻度が低い</p>
                        <p className="text-sm text-gray-600 mt-1">月4回程度では、体の適応に不十分な場合があります。週2回程度の継続が目安です。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-lg">4.</span>
                      <div>
                        <p className="font-bold">ストレスが大きい</p>
                        <p className="text-sm text-gray-600 mt-1">仕事のストレスが大きいと、コルチゾールが分泌され、ダイエットが進みにくくなります。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-lg">5.</span>
                      <div>
                        <p className="font-bold">基礎疾患や医学的要因</p>
                        <p className="text-sm text-gray-600 mt-1">甲状腺機能低下症、多嚢胞性卵巣症候群（PCOS）など、医学的な理由で体重が減りにくい場合もあります。医師に相談しましょう。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    対処方法
                  </h4>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    <li>1. トレーナーに相談し、現状を正直に伝える</li>
                    <li>2. 食事記録をつけて、何が問題かを特定する</li>
                    <li>3. 睡眠時間や生活習慣を見直す</li>
                    <li>4. 医学的な原因がないか、医師に相談する</li>
                    <li>5. プログラムを調整し、新たな刺激を与える</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 4: リバウンド予防 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標達成後のリバウンド予防
              </h2>
              <p className="text-gray-700 mb-6">
                体の変化を達成した後、多くの人が直面するのが「リバウンド」の問題です。リバウンドを防ぐためには、パーソナルジム卒業後の生活習慣が重要です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    1. パーソナルジムを卒業する目安
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    通常、以下の条件を満たしたら卒業を検討できます：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 目標体重・体形に達している</li>
                    <li>・ 正しい食事管理が習慣化している</li>
                    <li>・ 運動習慣が身についている</li>
                    <li>・ 自分でプログラムを作成できるレベル</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    2. 卒業後の運動継続方法
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジム卒業後も、適度な運動を続けることが重要です：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 通常のジムでセルフトレーニング（週1～2回）</li>
                    <li>・ ランニングやウォーキング（週3～4回）</li>
                    <li>・ ヨガやピラティス（週1～2回）</li>
                    <li>・ 月1～2回のパーソナルトレーニング（メンテナンス）</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    3. 食事習慣の維持
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムで身につけた食事管理の習慣を続けることが最重要です：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ タンパク質摂取の習慣を続ける</li>
                    <li>・ 定期的に体重や体脂肪率を測定する</li>
                    <li>・ 食事記録を週1～2回程度つける</li>
                    <li>・ 夜遅い食事や夜食を避ける習慣を維持</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    4. 定期的なカウンセリング
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    月1～2回程度のパーソナルトレーニングで、以下の確認を行います：
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 生活習慣の変化を確認</li>
                    <li>・ 体の変化を測定</li>
                    <li>・ トレーニング方法の確認</li>
                    <li>・ モチベーションの維持</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: FAQ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                よくある質問
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <details key={index} className="border-b border-gray-200 pb-4">
                    <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-700">
                      {faq.question}
                    </summary>
                    <p className="text-gray-700 mt-3 ml-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Articles */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/column/gym-nutrition/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの食事管理
                  </h3>
                  <p className="text-sm text-gray-600">
                    トレーニングと食事の組み合わせ方。効果を最大化する栄養管理法をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/training-frequency/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルトレーニングの通う頻度
                  </h3>
                  <p className="text-sm text-gray-600">
                    最適な通所頻度を目標別に解説。効果を出すための通所回数の目安をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/diet-gym/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    ダイエットにパーソナルジムをおすすめする理由
                  </h3>
                  <p className="text-sm text-gray-600">
                    ダイエット成功率が高い理由。フィットネスジムとの違いを解説します。
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
