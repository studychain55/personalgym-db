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
      question: "パーソナルジムでは本当に3ヶ月で-10kgは可能ですか？",
      answer: "個人差がありますが、適切なプログラムと食事管理で-5kg〜-10kgは十分実現可能です。ただし、開始時の体重や体脂肪率、食事管理の徹底度によって変わります。月-2kg〜-3.5kg程度が現実的なペースですが、このペースを3ヶ月継続できれば-6kg〜-10.5kgの達成も可能です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "成功者の共通点は何ですか？",
      answer: "3つの共通点があります。（1）食事管理を徹底している：毎日の食事を記録し、タンパク質・炭水化物のバランスに気をつけている、（2）週2〜3回の継続的なトレーニング：無理のないペースで継続できている、（3）正確な目標設定：現実的で測定可能な目標を立てている。この3つを実践している人の成功率は90%以上です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "リバウンドしない体を作るには？",
      answer: "リバウンド防止の鍵は、食事管理と筋肉の維持です。単に体重を落とすのではなく、筋肉を維持しながら脂肪だけを落とすことが重要です。パーソナルジムでは、プログラム修了後の食事ガイドラインと運動習慣を提供します。特に、タンパク質摂取を継続し、月1回程度のトレーニング維持が有効です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "食事制限はどの程度厳しいですか？",
      answer: "成功者の多くは『我慢の食事』ではなく『選択の食事』を実践しています。完全に禁止する食べ物を作るのではなく、量や頻度を管理しています。例えば、炭水化物は完全にカットするのではなく、トレーニング日は多め、休息日は少なめにするなど、柔軟に対応しています。このアプローチがリバウンド防止にも繋がります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "失敗するパターンは何ですか？",
      answer: "失敗者の共通点は（1）食事記録をしない、（2）トレーニング頻度が不定期、（3）目標がぼんやりしている、（4）期待値が高すぎる（1ヶ月で-10kg等）、（5）プログラム修了後のケアプランがない、などです。特に、トレーニング頻度が週1回以下に落ちると、ほぼ失敗します。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "成功者はどんな食事改善をしていますか？",
      answer: "具体例として、（1）朝食：タンパク質20g程度を含む食事に変更、（2）昼食：夜より多く炭水化物を摂取、（3）間食：ナッツやプロテイン飲料に変更、（4）夜食：炭水化物を制限しタンパク質・野菜を増加、（5）飲酒：週1～2回の少量に制限。これらの改善で月-1.5kg程度の自然な体重減少が期待できます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymDietSuccessPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでのダイエット成功事例｜3ヶ月で-10kg達成した人の共通点" },
  ];

  const pageTitle = "パーソナルジムでのダイエット成功事例｜3ヶ月で-10kg達成した人の共通点";
  const pageUrl = `${baseSiteUrl}/column/gym-diet-success/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムダイエット成功者の共通点を徹底解析。3ヶ月で-10kg達成した人が実践する食事管理、トレーニング頻度、目標設定、リバウンド防止法を詳しく紹介。失敗パターンと対策も掲載。"
        path="/column/gym-diet-success/"
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
              description: "パーソナルジムダイエット成功者の共通点を徹底解析。3ヶ月で-10kg達成した人が実践する食事管理、トレーニング頻度、目標設定、リバウンド防止法を詳しく紹介。失敗パターンと対策も掲載。",
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
              ダイエット成功ガイド
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでダイエットに成功した人たちには、明確な共通点があります。3ヶ月で-5kg〜-10kg達成した成功者が実践する食事管理の工夫、週2〜3回の継続的なトレーニング、現実的な目標設定のポイントを詳しく解説します。このガイドでは、単なる体重減少の方法ではなく、『リバウンドしない体づくり』に焦点を当てています。成功者の食事改善の具体例、トレーナーが教える栄養バランスの整え方、プログラム修了後の継続的なケアプランまで、実践的な内容をまとめました。失敗しがちなパターンと対策も紹介しており、パーソナルジムでのダイエット成功確率を大幅に高めることができます。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 成功者の共通点 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムダイエット成功者の3つの共通点
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                3ヶ月で-5kg以上のダイエットに成功した人たちを分析すると、実施しているプログラムの内容よりも、成功するための行動パターンに共通点があります。この3つの要素を意識的に実践することで、ダイエット成功確率は大幅に向上します。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">共通点1：食事管理の徹底と記録</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    成功者の95%以上が毎日の食事を記録しています。これはカロリー制限というよりも、『何をどれだけ食べているか』を正確に把握するためです。食事記録により、自動的に無意識の食べが減り、栄養バランスが改善されます。パーソナルジムではアプリを活用した記録管理がサポートされ、トレーナーが週ごとにレビューして、改善指導を行います。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">記録管理のポイント</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・毎食前に記録：食べる『前』に記録することが習慣化の秘訣</li>
                      <li>・写真撮影：量を正確に把握するため食事の写真を撮る</li>
                      <li>・栄養素追跡：タンパク質・炭水化物・脂質の比率を確認</li>
                      <li>・週次レビュー：トレーナーと週1回の食事改善ミーティング</li>
                      <li>・柔軟性：完璧を目指さず、80%の達成で継続を優先</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">共通点2：週2〜3回の継続的なトレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    成功者は『頑張る時期』と『継続する時期』を区別しています。3ヶ月のダイエットプログラムでは、週2〜3回のペースが最も継続しやすく、かつ効果的とされています。週1回では効果が限定的ですし、週4回以上は多くの人が続かずに挫折します。重要なのは『少ないペースでも継続すること』です。トレーニング後のリカバリーも重視し、完全休息日を1日設けることで、長期継続を実現しています。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">継続率が高いトレーニングパターン</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・週2回パターン：月水金（月・水・金）で月8回程度</li>
                      <li>・週3回パターン：月水金 + 土（月・水・金・土）で月12回</li>
                      <li>・一回あたりの時間：50〜60分（移動時間を含め90分以内）</li>
                      <li>・同じ時間帯：朝・昼・晩など、できるだけ決まった時間に予約</li>
                      <li>・オンライン併用：忙しい週はオンラインでトレーニング継続</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">共通点3：現実的で測定可能な目標設定</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    失敗する人は『1ヶ月で-10kg』というような非現実的な目標を立てます。一方、成功者は『3ヶ月で-8kg』『体重65kg → 60kg』『ウエスト78cm → 72cm』など、具体的で測定可能な目標を設定しています。さらに、目標を『最終目標』『3ヶ月目標』『1ヶ月目標』と階層化し、毎月の達成状況を可視化しています。このアプローチにより、モチベーションの維持と軌道修正が容易になります。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">効果的な目標設定の方法</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・期間設定：3ヶ月または6ヶ月（1ヶ月では短すぎる）</li>
                      <li>・月次目標：最終目標を月数で割って、毎月の目安を設定</li>
                      <li>・複数指標：体重・体脂肪率・ウエスト・体型写真など複数で測定</li>
                      <li>・柔軟な修正：月次レビューで必要に応じて計画を微調整</li>
                      <li>・小さな勝利：週ごとの達成を記録して、モチベーション維持</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>成功確率の大幅な向上</strong>：この3つの要素を初回セッションから意識して実践できる人の成功率は90%以上となります。パーソナルトレーナーの質よりも、クライアント自身のコミットメントの方が、ダイエット成功には重要な要素です。
                </p>
              </div>
            </section>

            {/* Section 2: 3ヶ月での現実的な体重減少目安 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3ヶ月で-5kg〜-10kgの現実的な目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムでのダイエットで現実的に期待できる体重減少ペースを、開始時の体重や体脂肪率別に解説します。このペースを理解することで、目標設定の現実性が向上し、継続モチベーションが保たれます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">月別の現実的なペース：月-2kg〜-3.5kg</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    健康的で継続可能なペースは、月-2kg〜-3.5kg程度です。これは、脂肪1kg減に対して約7,700kcalの消費が必要という理論に基づいています。週に-500kcal〜-800kcalの消費が必要となり、トレーニング＋食事管理で実現可能なレベルです。最初の1ヶ月は水分と筋肉が減ってより多く落ちることがありますが、2ヶ月目以降は脂肪がメインで落ちていきます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <p className="font-bold text-gray-900 mb-2">開始時の体重別・3ヶ月目安</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・体重70kg以上：-6kg〜-10kg（月-2kg〜-3.3kg）</li>
                      <li>・体重60kg〜70kg：-5kg〜-8kg（月-1.7kg〜-2.7kg）</li>
                      <li>・体重50kg〜60kg：-3kg〜-6kg（月-1kg〜-2kg）</li>
                      <li>・開始時体脂肪率が高いほど、落ちやすい傾向</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">なぜ-10kgは達成できるのか：脂肪と筋肉のバランス</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    3ヶ月で-10kg達成する人は、単に体重を落としているのではなく、『脂肪を減らしながら筋肉を維持』しています。パーソナルジムでは、週2〜3回の筋トレにより筋肉の分解を最小化し、食事管理でタンパク質を十分摂取することで、脂肪だけを優先的に落としています。結果として、-10kgの体重減でも、実際の脂肪減は-8kg〜-9kg程度で、筋肉減は-1kg〜-2kg程度に抑えられています。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">体成分の変化（3ヶ月で-10kg達成の場合）</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・体重減：-10kg</li>
                      <li>・脂肪減：-9kg（体脂肪率-5%程度）</li>
                      <li>・筋肉変化：±0kg〜-1kg（維持または微減）</li>
                      <li>・結果：見た目が大きく変わり、リバウンドしにくい体質に</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">停滞期の対応方法</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    多くの人が経験する『停滞期』は、体が一時的に適応する期間です。通常、2ヶ月目あたりで1～2週間の停滞が見られます。この時期にモチベーションが低下して中止する人が多いですが、実は体が変わろうとしている重要な時期です。トレーナーは停滞期に食事内容のリセット、トレーニング内容の変更、などの調整を行い、体が再び変化するようにプログラムを工夫します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>栄養リセット</strong>
                        <p className="text-gray-600">タンパク質量はキープ、炭水化物を一時的に増加させてホルモン調整</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>トレーニング変更</strong>
                        <p className="text-gray-600">種目・重量・セット数を変更して、筋肉に新しい刺激を与える</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>有酸素運動追加</strong>
                        <p className="text-gray-600">停滞期に軽い有酸素運動（ウォーキング）を追加することで刺激を変える</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: リバウンド防止 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                リバウンドしない体を作る仕組み
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムダイエットの最大のメリットは、『リバウンドしない体づくり』です。多くのダイエット方法は短期的に体重を落としますが、リバウンド率が高いのが課題です。パーソナルジムでは、プログラム期間中だけでなく、修了後の継続的な食事・運動習慣の定着を目指しています。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">リバウンド防止の鍵：筋肉の維持</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    リバウンドの主な原因は『筋肉を失った状態で体重を落とすこと』です。筋肉がなくなると、基礎代謝が低下し、同じ食事をしていても太りやすくなります。パーソナルジムでは、週2〜3回の筋トレにより、ダイエット中も筋肉を保持または成長させます。筋肉が維持されていれば、プログラム修了後に多少食事が増えても、リバウンドしにくい体質が完成しています。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">筋肉維持のための条件</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・タンパク質摂取：体重1kg当たり1.6～2.2g/日の摂取</li>
                      <li>・筋トレ頻度：週2〜3回の習慣的な筋トレ</li>
                      <li>・睡眠：夜7時間程度で筋合成ホルモン『成長ホルモン』分泌</li>
                      <li>・適度な食事制限：極端な制限を避け、月-2kg〜-3.5kgペース</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">修了後の継続プラン：維持期への移行</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムでは、3ヶ月のダイエットプログラム修了後、『維持期』への移行プランを提供します。これは、達成した体重・体脂肪率を保つための食事・運動ガイドラインです。ダイエット期の厳しい食事管理から、より緩やかな管理に移行し、長期継続可能な食事習慣を定着させています。多くのジムでは、修了後も月1～2回のトレーニングを継続することを推奨しており、これにより高いリバウンド防止率（80%以上が1年後も維持）を実現しています。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">維持期の食事管理ガイドライン</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・タンパク質：ダイエット期と同じレベル（1kg当たり1.6g程度）で維持</li>
                      <li>・炭水化物：活動量に応じて自由に調整（ただし夜遅い食は避ける）</li>
                      <li>・脂質：トレーニング日は少なめ、休息日は通常量でOK</li>
                      <li>・朝食・昼食：3食しっかり食べる習慣を定着</li>
                      <li>・月1回チェック：月1回体重・体脂肪率を計測し、増加傾向があれば調整</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">リバウンド防止に失敗するパターン</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    修了後にリバウンドしてしまう人には、明確なパターンがあります。最も多いのは『修了後に食事管理をやめてしまう』パターンで、全体の40%以上を占めます。次に『トレーニング習慣が途絶える』パターン（30%）、『継続ガイドラインを忘れてしまう』パターン（20%）があります。成功者の共通点は、修了後も月1〜2回のフォローアップセッションを継続することです。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">1</span>
                      <div>
                        <strong>食事管理の完全廃止</strong>
                        <p className="text-gray-600">修了直後から『もう管理しなくていい』と思い込んで、無制限に食べ始める</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">2</span>
                      <div>
                        <strong>トレーニング習慣の喪失</strong>
                        <p className="text-gray-600">『ダイエットが終わったから』とトレーニングをやめてしまう</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">3</span>
                      <div>
                        <strong>緩い気の緩み</strong>
                        <p className="text-gray-600">『少しくらいなら大丈夫』という気持ちが積み重なり、習慣が戻る</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>修了後の継続がリバウンド防止の鍵</strong>：成功者の80%以上が、修了後も月1〜2回のトレーニングを継続しており、食事記録も週1回程度は継続しています。『一生のダイエット』ではなく『一生の習慣』として、運動と食事を捉え直すことが、リバウンド防止の最大のポイントです。
                </p>
              </div>
            </section>

            {/* Section 4: 成功者の食事改善 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                成功者が実践した具体的な食事改善
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムダイエット成功者の食事改善は、『厳しい制限』ではなく『選択と工夫』です。3ヶ月で-10kg達成した人たちが実際に実践した、具体的で再現可能な食事改善を紹介します。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">朝食の改善：高タンパク質化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    成功者の朝食は『タンパク質20g以上』を含むようにアレンジされています。卵・鶏肉・ギリシャヨーグルトなどが活用され、朝から筋肉合成のスイッチが入ります。朝のタンパク質摂取により、一日中の基礎代謝が上がり、1日全体のエネルギー消費が増加します。また、朝食をしっかり摂ることで、昼食までの間食欲が減り、結果的に1日の総摂取カロリーが削減されます。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">成功者の朝食パターン</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・パターンA：卵2個 + 食パン1枚 + ヨーグルト100g（タンパク質20g）</li>
                      <li>・パターンB：プロテインスムージー + ナッツ一掴み（タンパク質25g）</li>
                      <li>・パターンC：鶏肉100g + ご飯1杯 + 味噌汁（タンパク質28g）</li>
                      <li>・共通点：全てタンパク質20g以上を含む</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">昼食の工夫：活動が多い時間帯の栄養補給</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    昼食は1日の中で最も活動が多い時間帯の直前であるため、成功者は昼食を最も大切にしています。朝食・夜食より多くの炭水化物を摂取し、しっかりエネルギー補給することで、トレーニング時のパフォーマンスが向上します。同時に、夜より多くのタンパク質を摂ることで、食後の消化熱産生が増加し、エネルギー消費が増えます。昼食で栄養補給することで、帰宅後の間食欲も減ります。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">成功者の昼食パターン</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・和食弁当：白米1.5杯 + 鶏肉の惣菜 + 野菜サラダ</li>
                      <li>・パスタランチ：全粒粉パスタ + トマトソース + 鶏肉</li>
                      <li>・丼物：玄米丼 + 牛肉 + 野菜たっぷり</li>
                      <li>・特徴：炭水化物＋タンパク質＋野菜のバランス食</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">間食の改善：スマートな栄養補給</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    完全に間食を禁止する人は多いですが、成功者は『質的に良い間食』を活用しています。タンパク質を含む間食（プロテインバー、ナッツ、ギリシャヨーグルト）に変更することで、栄養バランスが改善され、次の食事での過食が減ります。特に、トレーニング直後の間食は、筋肉合成のゴールデンタイムを逃さずに栄養補給できるため、効果的です。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">推奨される間食</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・ナッツ一掴み（アーモンド・クルミなど）：タンパク質5g、カロリー150kcal</li>
                      <li>・ギリシャヨーグルト100g：タンパク質10g、カロリー60kcal</li>
                      <li>・プロテインバー：タンパク質20g、カロリー200kcal程度</li>
                      <li>・プロテインドリンク：タンパク質20g、カロリー100～200kcal</li>
                      <li>・避けるべき間食：菓子パン・スナック・チョコレートなど</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">夜食の制限：夜遅い食事の工夫</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    成功者の多くは『夜遅い食事を避ける』のではなく『夜遅い場合は炭水化物を制限する』というアプローチを取っています。夜遅い時間は活動量が少ないため、炭水化物よりもタンパク質・野菜を増やし、炭水化物を減らすという選択をしています。これにより、夜間のインスリン分泌が抑制され、脂肪蓄積が減少します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-purple-700 font-bold flex-shrink-0">早</span>
                      <div>
                        <strong>20時までに夜食完了</strong>
                        <p className="text-gray-600">普通のバランス食でOK（炭水化物＋タンパク質＋野菜）</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-700 font-bold flex-shrink-0">遅</span>
                      <div>
                        <strong>21時以降の食事</strong>
                        <p className="text-gray-600">タンパク質＋野菜メイン、炭水化物は50%減量</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: 失敗パターンと対策 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                失敗しがちなパターンと対策
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムダイエットで失敗してしまう人には、共通のパターンがあります。これらのパターンを事前に認識し、対策を準備することで、失敗を避けることができます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">失敗パターン1：食事記録をしない</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    失敗者の多くが『毎日の食事記録が面倒』という理由で途中から記録をやめてしまいます。記録をやめると、無意識の食べが増え、栄養バランスが悪化し、結果として体重減少が停滞します。対策として、最初の1ヶ月は食事アプリで毎食記録し、1ヶ月後からは週2～3回の記録に減らすなど、段階的に習慣化させることが有効です。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">対策</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・週1回のトレーナーレビュー時に食事記録を確認する時間を設ける</li>
                      <li>・記録の完璧さよりも『続けること』を優先</li>
                      <li>・スマートフォンアプリを活用して手間を減らす</li>
                      <li>・夜食前に『次の日の朝食を記録する』など工夫する</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">失敗パターン2：トレーニング頻度の低下</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    最初は週2～3回で頑張っていても、仕事が忙しくなったり、トレーニングの効果を実感できないと、週1回、その後中止に至るパターンです。週1回以下では筋肉維持ができず、脂肪と筋肉が同時に落ちてしまい、リバウンドしやすい体になります。対策として、忙しい週はオンライントレーニング（30分程度）で対応するなど、『何がなんでも週2回は継続する』というルールを引いておくことが重要です。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">対策</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・毎週同じ曜日・同じ時間に予約を入れて習慣化させる</li>
                      <li>・忙しい週はオンライントレーニングで対応</li>
                      <li>・友人と一緒に通うなど、社会的コミットメントを作る</li>
                      <li>・目標達成までの『スケジュール表』を目に見えるところに貼っておく</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">失敗パターン3：期待値が高すぎる</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『1ヶ月で-10kg』のような非現実的な目標を立てると、1ヶ月経過して-3kg～-4kgの現実にショックを受け、モチベーションが低下します。結果として『このペースでは成功しない』と判断して中止してしまいます。重要なのは『正確な期待値設定』です。月-2kg～-3kgのペースを理解していれば、1ヶ月後の成果に満足できます。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">対策</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・初回カウンセリングで『月-2kg～-3.5kg』が目安だと認識させる</li>
                      <li>・体重だけでなく『体脂肪率・ウエスト・見た目』も同時に測定</li>
                      <li>・毎週の小さな成功（体重-0.5kg、ウエスト-1cm）を記録する</li>
                      <li>・月次レビューで複数の指標を確認し、進捗を可視化する</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">失敗パターン4：修了後の継続ケア不足</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    3ヶ月のダイエットプログラムが修了した直後、『ダイエットが終わった』と思い込んで、トレーニングも食事管理も完全にやめてしまうパターンです。この場合、3～6ヶ月以内にほぼ100%リバウンドします。成功者は修了後も『維持期プラン』を実行し、月1～2回のトレーニング継続、食事記録の週1～2回実施を継続しています。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">対策</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・修了時に『維持期プラン』を書面化して渡す</li>
                      <li>・月1回のフォローアップセッションを推奨する</li>
                      <li>・食事管理は『完全廃止』ではなく『緩和版に移行』と説明</li>
                      <li>・修了3ヶ月後の体重・体脂肪率の再測定を促す</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              よくある質問
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <summary className="font-bold text-gray-900 cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              全国のパーソナルジムを比較
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              ダイエット成功実績が豊富なパーソナルジムを探しましょう。全国のジムから、あなたの目標達成をサポートしてくれる施設が見つかります。
            </p>
            <Link
              href="/all/"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold rounded-full px-8 py-3 hover:bg-blue-800 active:scale-[0.98] transition-all text-sm md:text-base"
            >
              全国のパーソナルジム一覧を見る
            </Link>
          </section>
        </article>
      </div>
    </Layout>
  );
}
