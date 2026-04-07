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
      question: "パーソナルジムでの怪我は多いですか？",
      answer: "パーソナルジムでの怪我率は、独学でトレーニングする人と比べて大幅に低いです。トレーナーが正確なフォームをチェックし、個人の体力レベルに合わせたプログラムを作成するため、怪我のリスクが最小化されます。ただし、完全に怪我を避けることはできません。重要なのは『怪我を予防するプロセス』と『怪我が起きた時の対応』です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "軽い筋肉痛とケガの違いは？",
      answer: "筋肉痛は、トレーニング後24～48時間以内に現れる『遅発性筋肉痛（DOMS）』で、これは正常な反応です。痛みが鈍く、動かすと痛い程度なら筋肉痛です。一方、怪我による痛みは『急性で激しい痛み』『腫れや熱感』『動きの制限』『夜間痛』などの特徴があります。筋肉痛なら軽いストレッチで対応できますが、怪我の疑いがあればトレーナーに相談してください。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニング中に痛みを感じたら、その場で中止すべき？",
      answer: "痛みの種類によって判断が異なります。『心地よい筋肉の疲労感』なら継続できますが、『ピリッと走る痛み』『関節の違和感』『前触れなく起こる鋭い痛み』などは即座に中止してください。重要なのは『痛みの種類』を正確に把握することです。パーソナルジムなら、トレーナーが『大丈夫な痛み』と『危険な痛み』を判別してくれます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "怪我の回復期間、いつからトレーニング再開できる？",
      answer: "怪我の種類や重症度によって異なります。軽い肉離れなら1～2週間の安静後、段階的に復帰できます。靭帯損傷なら2～4週間以上の休息が必要な場合も。重要なのは『焦らずに段階的に復帰すること』です。パーソナルジムでは、医師の診断を基に、回復段階に合わせたリハビリプログラムを作成してくれます。完全に痛みが取れるまで安静を続けることが、長期的な再発防止につながります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "怪我を予防する上で、トレーナーのどこをチェックすべき？",
      answer: "優秀なトレーナーは『セッション開始前のウォームアップを重視』『フォーム指導に時間をかける』『個人の可動域を把握』『疲労度を確認して負荷調整』『クールダウンを丁寧に実施』の5つを実践しています。これらを確認することで、怪我予防への姿勢を見分けることができます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "怪我の既往歴がある場合、パーソナルジムで伝えるべき？",
      answer: "絶対に伝えてください。過去の怪我の部位・程度・治療内容を事前に伝えることで、トレーナーはそれに合わせたプログラムを作成します。『隠したままトレーニングする』と、同じ部位の再怪我に繋がる可能性が高まります。初回カウンセリングで詳しく伝えることで、より安全で効果的なプログラムが実現します。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymInjuryPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでの怪我予防とアフターケア｜安全にトレーニングを続けるコツ" },
  ];

  const pageTitle = "パーソナルジムでの怪我予防とアフターケア｜安全にトレーニングを続けるコツ";
  const pageUrl = `${baseSiteUrl}/column/gym-injury/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでの怪我予防とアフターケアを完全解説。多い怪我の種類、ウォームアップ・クールダウンの方法、痛みがある時の判断基準、回復プロセス、優秀なトレーナーの対応を紹介。"
        path="/column/gym-injury/"
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
              description: "パーソナルジムでの怪我予防とアフターケアを完全解説。多い怪我の種類、ウォームアップ・クールダウンの方法、痛みがある時の判断基準、回復プロセス、優秀なトレーナーの対応を紹介。",
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
              安全なトレーニング
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムで安全にトレーニングを続けるための怪我予防方法とアフターケアを詳しく解説します。パーソナルジムでよくある怪我の種類、効果的なウォームアップ・クールダウンの方法、痛みが生じた時の正確な判断基準、怪我後の回復プロセスと復帰方法までを網羅しています。さらに、優秀なトレーナーがどのように怪我予防に対応しているのか、その特徴と見分けるポイントも紹介します。スポーツ経験のない初心者こそ怪我のリスクが高いため、このガイドでは初心者向けの安全なトレーニング方法と、怪我が起きた時の対応法を詳しく掲載しました。長期的に無理なく継続するための、実践的なアフターケア方法も掲載しています。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 多い怪我の種類 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムで多い怪我の種類と発生部位
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムでのトレーニングに起因する怪我には、いくつかのパターンがあります。これらを事前に理解することで、予防策を立てやすくなります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">怪我の種類1：筋肉痛・遅発性筋肉痛（DOMS）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング後24～48時間以内に現れる筋肉の痛みです。これは正常な生理反応であり、怪我ではありません。筋線維が破壊され、修復される過程で痛みが生じます。パーソナルジムのトレーニングでは、初回セッション後や強度を上げた時に強い筋肉痛が出ることがあります。痛みは3～7日程度で自然に消失し、この期間はストレッチや軽い有酸素運動で対応できます。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">筋肉痛への対応</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・ストレッチ：筋肉痛の部位を20～30秒かけてゆっくり伸ばす</li>
                      <li>・温浴：入浴で患部を温めると血流が改善される</li>
                      <li>・軽い運動：ウォーキングなど軽い有酸素運動で血流促進</li>
                      <li>・栄養補給：タンパク質を意識的に摂取（1日体重×1.6g程度）</li>
                      <li>・睡眠：夜7時間の十分な睡眠で筋肉修復が促進</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">怪我の種類2：肉離れ・筋線維断裂</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    急激な力が加わった際に筋線維が部分的に断裂する怪我です。パーソナルジムではスクワット・デッドリフト・ランジなど、大きな力が必要な種目で発生しやすいです。肉離れは『ピリッと走るような痛み』『患部の腫れ』『動きの制限』『青紫色の内出血』などの症状が特徴です。軽度なら1～2週間で回復しますが、重度なら3週間以上の安静が必要です。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">肉離れが起こりやすい部位と種目</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・ハムストリングス：スクワット・デッドリフト・ランジで発生</li>
                      <li>・大腿四頭筋：レッグプレス・ランジ・ジャンプ系で発生</li>
                      <li>・腓腹筋（ふくらはぎ）：つま先立ち系の種目で発生</li>
                      <li>・上腕二頭筋：ダンベルカール・チンアップで発生</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">怪我の種類3：関節炎・関節痛</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    膝関節・肩関節・肘関節など、関節部位の炎症です。不正確なフォーム、負荷が高すぎる、柔軟性が低いなど複数の要因が重なって発生します。パーソナルジムでは『膝関節痛（ジャンパー膝）』『肩関節痛（インピンジメント症候群）』『肘関節痛（テニス肘）』が多く報告されています。関節痛は『ズキズキとした痛み』『動きの引っかかり感』『可動域の制限』が特徴で、進行すると日常生活に支障が出ます。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">関節痛が起こりやすい場合</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・不正確なフォーム：正確な関節の動きができていない</li>
                      <li>・可動域不足：柔軟性が低く、無理な動きをしている</li>
                      <li>・急激な負荷増加：一度に高い負荷でトレーニングを開始</li>
                      <li>・過度なボリューム：休息なく毎日同じ部位をトレーニング</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">怪我の種類4：オーバートレーニング症候群</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    短期間に過度なトレーニングを行うことで生じる、全身的な疲労と免疫機能の低下です。単一の怪我ではなく『心身の疲弊』です。症状としては『全身の倦怠感』『睡眠不足』『風邪をひきやすくなる』『トレーニングの効果がなくなる』などが挙げられます。パーソナルジムでは、短期集中プログラムで張り切りすぎたり、パーソナルジムと他の運動を並行している人に起こりやすいです。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">オーバートレーニング症候群の症状</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・トレーニング中のパフォーマンス低下</li>
                      <li>・夜間の睡眠不足や不眠</li>
                      <li>・心拍数が常に高い状態</li>
                      <li>・風邪をひきやすくなる</li>
                      <li>・筋肉痛が治らない状態が続く</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>怪我の種類別対応：これら4つのパターンを理解することで、自分の症状がどの段階にあるのかを判定しやすくなります。パーソナルジムなら、初期段階での正確な判別とそれに応じた対応が可能です。</strong>
                </p>
              </div>
            </section>

            {/* Section 2: ウォームアップ・クールダウン */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                怪我予防のためのウォームアップとクールダウン
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                適切なウォームアップとクールダウンは、怪我予防の最も基本的かつ重要な要素です。セッション開始時に十分なウォームアップを行わない、終了時にクールダウンを省略するなどは、怪我リスクを大幅に高めます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ウォームアップの目的と効果</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ウォームアップの目的は『体温上昇』『心拍数の段階的な増加』『筋肉の可動性向上』『神経系の活性化』です。冷えた筋肉は伸びにくく、損傷しやすい状態にあります。適切なウォームアップにより、筋肉の温度が上昇し、柔軟性が向上します。同時に、関節の滑液が分泌され、関節の動きが滑らかになります。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">効果的なウォームアップの流れ（10～15分）</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>1. 軽い有酸素運動（3～5分）：ジョギング・エアロバイク・バイスミル</li>
                      <li>2. 動的ストレッチ（5～7分）：腕回し・レッグスウィング・キャットストレッチ</li>
                      <li>3. 種目別のウォームアップセット：軽い負荷で実施予定の種目を練習</li>
                      <li>4. 呼吸確認：深呼吸を5回行い、神経系を活性化</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">動的ストレッチの具体例</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ウォームアップ時に実施する『動的ストレッチ』は、筋肉を伸ばしながら動かすストレッチです。静的ストレッチ（じっと伸ばす）と異なり、パフォーマンスを低下させず、むしろトレーニング効果を高めます。各動的ストレッチは20～30秒間、ゆっくりと動きながら実施します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">1</span>
                      <div>
                        <strong>腕回し</strong>
                        <p className="text-gray-600">両腕を大きく回転させ、肩関節の可動性を向上</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">2</span>
                      <div>
                        <strong>レッグスウィング</strong>
                        <p className="text-gray-600">脚を前後左右に振り、股関節と膝関節の可動性を改善</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">3</span>
                      <div>
                        <strong>ハンドウォーク</strong>
                        <p className="text-gray-600">両手を床について歩く動作で、全身を温める</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">4</span>
                      <div>
                        <strong>キャットストレッチ</strong>
                        <p className="text-gray-600">背骨の柔軟性を高め、体幹を活性化</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">クールダウンの目的と重要性</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    クールダウンの目的は『心拍数の低下』『血流の正常化』『筋肉の柔軟性回復』『精神的なリラックス』です。激しいトレーニング直後に突然止めると、血液が筋肉に溜まり、めまいや倦怠感が生じます。クールダウンにより、段階的に心拍数を下げることで、これらの症状を防げます。同時に、タンパク質が筋損傷をしている状態で静的ストレッチを行うと、筋肉修復が促進されます。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">効果的なクールダウンの流れ（5～10分）</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>1. 軽い有酸素運動（2～3分）：ゆっくりしたウォーキング</li>
                      <li>2. 静的ストレッチ（5～7分）：各部位20～30秒ずつ伸ばす</li>
                      <li>3. 呼吸・瞑想：深呼吸を5～10回行い、心身をリラックス</li>
                      <li>4. 栄養補給：プロテイン・糖質を摂取し、筋肉修復開始</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">クールダウン時の静的ストレッチ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    クールダウン時のストレッチは『キープする』ことが重要です。反動をつけず、ゆっくり伸ばした状態を20～30秒保持することで、筋肉の柔軟性が向上し、翌日の筋肉痛が軽減されます。特に、トレーニング中に酷使した部位を優先的にストレッチします。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>大腿四頭筋（太もも前側）</strong>
                        <p className="text-gray-600">立った状態で脚を後ろに曲げ、20～30秒キープ</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ハムストリングス（太もも裏）</strong>
                        <p className="text-gray-600">前屈姿勢で床に向かってゆっくり体を倒す</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>胸部・肩</strong>
                        <p className="text-gray-600">腕を交差させて胸を押す、または肩を後ろに引く</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>下背部・腰</strong>
                        <p className="text-gray-600">両膝を胸に引き寄せて腰をストレッチ</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>ウォームアップ・クールダウンの重要性：これら15～25分の準備と整理運動が、怪我防止率を90%以上に高めます。多くの初心者は『メインのトレーニングだけ大切』と考えますが、実は準備と整理が最も怪我予防に効果的です。</strong>
                </p>
              </div>
            </section>

            {/* Section 3: 痛みがある時の判断 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                トレーニング中に痛みを感じた時の正確な判断基準
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジム中に痛みを感じたとき『続けるべきか』『中止すべきか』の判断は、怪我予防の最も重要なポイントです。この判断を誤ると、軽い症状が重大な怪我に進行します。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">継続できる痛み vs 中止すべき痛み</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    痛みには『トレーニングで継続できる痛み』と『即座に中止すべき痛み』があります。その区別を理解することで、適切な判断ができます。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">継続できる痛み（筋肉の疲労感）</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・痛みの質：鈍く、圧迫感のある痛み</li>
                      <li>・痛みの位置：筋肉全体が疲労している感覚</li>
                      <li>・可動性：普通に動かせる</li>
                      <li>・タイミング：トレーニング中に段階的に増す</li>
                      <li>・対応：この痛みはトレーニングの効果指標</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">中止すべき痛みの特徴</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    以下のような痛みを感じたら、即座にトレーニングを中止してトレーナーに伝えてください。これらの痛みは、怪我の初期段階である可能性が高いです。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">！</span>
                      <div>
                        <strong>鋭い痛み・ピリッと走る痛み</strong>
                        <p className="text-gray-600">『ピッ』と走る痛みは神経や靭帯の損傷の可能性</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">！</span>
                      <div>
                        <strong>関節の違和感・引っかかり感</strong>
                        <p className="text-gray-600">『ゴリッ』『グキッ』という感覚は関節構造の損傷</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">！</span>
                      <div>
                        <strong>痛みの前触れなく突然発症</strong>
                        <p className="text-gray-600">予感なく突然痛くなった場合は急性損傷</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">！</span>
                      <div>
                        <strong>夜間痛（就寝中の痛み）</strong>
                        <p className="text-gray-600">寝ている時に痛みで目覚める場合は炎症が強い</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">！</span>
                      <div>
                        <strong>腫れ・内出血が見える</strong>
                        <p className="text-gray-600">患部の腫れ、青紫色の内出血は組織損傷の証</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">痛みが生じた時の対応フロー</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムで痛みが生じた場合の正確な対応順序を、優秀なトレーナーは以下のように実施します。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">対応ステップ</p>
                    <ul className="text-gray-700 space-y-2">
                      <li>1. 即座に中止：『どんな痛みですか』と質問</li>
                      <li>2. 患部確認：腫れ、熱感、可動域をチェック</li>
                      <li>3. アイシング：氷を当て、炎症を5～15分の間抑制</li>
                      <li>4. 代替種目：別の部位のトレーニングに変更</li>
                      <li>5. 医師相談：痛みが2週間以上続く場合は医師診察</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>正確な判断で怪我を最小化：痛みの種類を正確に判別できることで、軽い症状のうちに対応でき、重大な怪我への進行を防ぐことができます。『痛い = 中止』ではなく『痛みの種類 = 対応方法』という正確な判断が、安全なトレーニングの鍵です。</strong>
                </p>
              </div>
            </section>

            {/* Section 4: 怪我後の回復プロセス */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                怪我後の回復プロセスと段階的な復帰方法
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                怪我が起きた場合、回復プロセスを正しく進めることが、再発防止と長期的なトレーニング継続の鍵です。焦ってトレーニングを再開すると、同じ部位の再怪我に繋がります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">怪我直後（0～3日）：RICE処置</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    怪我直後の対応が、その後の回復速度を大きく左右します。『RICE処置』と呼ばれる4つのステップを実施することで、炎症を最小化し、回復期間を短縮できます。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">RICE処置の詳細</p>
                    <ul className="text-gray-700 space-y-2">
                      <li><strong>Rest（安静）</strong>：患部を動かさない。1～3日間の完全安静</li>
                      <li><strong>Ice（冷却）</strong>：氷を当てる（直接ではなくタオル経由で15～20分）</li>
                      <li><strong>Compression（圧迫）</strong>：弾性包帯で患部を軽く圧迫し、腫れを抑制</li>
                      <li><strong>Elevation（挙上）</strong>：患部を心臓より高い位置に保つ</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">初期回復期（4～14日）：段階的な動き</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    痛みが落ち着き始めたら、段階的に動かし始めます。この時期は『無理をしない』ことが重要です。患部周辺を軽く動かすことで、血流が改善され、修復を促進します。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">初期回復期の活動</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・軽いストレッチ：患部を伸ばさないよう注意（15～20秒程度）</li>
                      <li>・患部以外のトレーニング：腕の怪我なら脚のトレーニング継続</li>
                      <li>・温浴：冷却から温浴に移行し、血流を促進</li>
                      <li>・栄養補給：タンパク質を強化（1日体重×1.6～2.2g）</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">回復期（15～45日）：トレーニング復帰の段階</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    痛みがある程度落ち着いたら、トレーニングの段階的な復帰を開始します。医師の診断を得た上で、トレーナーが『段階的な負荷増加プログラム』を作成します。この段階で焦ると再発リスクが高まります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">1週目</span>
                      <div>
                        <strong>リハビリ運動：軽いストレッチ・可動域運動のみ</strong>
                        <p className="text-gray-600">患部の痛みが5以下（10段階評価）で実施</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">2週目</span>
                      <div>
                        <strong>軽い運動：患部を使わない部位のトレーニング</strong>
                        <p className="text-gray-600">段階的に通常強度の50%程度でスタート</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">3週目</span>
                      <div>
                        <strong>段階的負荷増加：通常強度の70%程度</strong>
                        <p className="text-gray-600">痛みがなければ徐々に強度を上げる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">4週目</span>
                      <div>
                        <strong>完全復帰：通常強度での通常トレーニング再開</strong>
                        <p className="text-gray-600">再発の兆候がなければ完全復帰</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">再発防止のための習慣化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    怪我が治った後、同じ怪我を繰り返す人が多いです。これは『根本原因の改善』をしていないためです。例えば、肩関節痛で治った後も『可動域が狭い』『形式的なウォームアップだけ』では再発します。
                  </p>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <p className="font-bold text-purple-900 mb-2">再発防止の方法</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・週3回の専門的ストレッチ：患部周辺の柔軟性向上</li>
                      <li>・15分のウォームアップ厳守：ウォームアップなしのトレーニング禁止</li>
                      <li>・月1回の医師チェック：3ヶ月間は医師の定期診察を継続</li>
                      <li>・トレーナーとの相談：怪我前と同じ種目をする前に相談</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>焦らない復帰が再発を防ぐ：怪我からの回復期間は『早さ』より『正確さ』が重要です。焦って早期に完全強度で復帰すると、70%以上の確率で同じ部位を再怪我します。段階的な復帰と根本原因の改善が、長期的なトレーニング継続の鍵です。</strong>
                </p>
              </div>
            </section>

            {/* Section 5: トレーナーの見分け方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                優秀なトレーナーの怪我予防への対応を見分けるポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムのトレーナーの質は、『どれだけ筋肉をつけさせるか』ではなく『どれだけ安全にトレーニングさせるか』で判定すべきです。優秀なトレーナーの特徴を理解することで、怪我予防が高いジムを見分けられます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴1：セッション開始前の15分ウォームアップを重視</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    優秀なトレーナーは『ウォームアップなんて不要』という考え方を持ちません。むしろ、セッション時間の20～25%をウォームアップに充てます。クライアントが『早くトレーニング本体をやりたい』と言っても『ウォームアップこそが最も大切』と丁寧に説明します。初回セッション時に、トレーナーがウォームアップをどれだけ重視しているかを見れば、そのトレーナーの質が判定できます。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴2：初回カウンセリングで怪我歴と既往症を詳しく聞く</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    優秀なトレーナーは『怪我の経歴』『既往症』『現在の不調』を詳しく聞きます。『腰痛がある』『昔、肩を脱臼した』『膝の違和感がある』など、クライアントの身体的リスク要因を把握しない限り、安全なプログラムは作成できません。初回カウンセリングが『体重・身長・体脂肪率』だけで済まされたら要注意です。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴3：個人の可動域を事前に測定し、プログラムに反映</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    怪我予防の最も重要な要素の一つが『個人の可動域を把握すること』です。可動域が狭い人に無理な動作をさせると、怪我に直結します。優秀なトレーナーは『肩の可動域テスト』『股関節の可動域テスト』『脊椎の柔軟性テスト』などを実施し、個人に合わせたプログラムを作成します。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴4：実施前に『このフォームだとリスクがある』と警告</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『このフォームだと膝に負荷がかかりすぎます』『この角度だと肩を痛める可能性があります』など、危険性を事前に説明できるトレーナーは、経験と知識が豊富です。クライアントが無理なフォームをしようとしたら『待ってください。まずは柔軟性を高めましょう』と調整できるトレーナーは、怪我予防への意識が高いです。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴5：クールダウンを丁寧に実施し、翌日のケアを指導</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    多くのトレーナーは『時間がないから』とクールダウンを省略しがちです。優秀なトレーナーは『クールダウンもトレーニングの一部』と考え、丁寧にストレッチを実施します。さらに『帰宅後のアイシング方法』『翌日の食事のポイント』『睡眠時間の重要性』など、セッション後のケアも詳しく指導します。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">特徴6：疲労度を確認して、無理な負荷増加をしない</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『最近、仕事が忙しくて睡眠不足です』『風邪を引きかけています』など、クライアントの日々の状態を聞き、トレーニング強度を調整するトレーナーは、怪我予防への意識が高いです。『疲労度の高い状態でのトレーニング強度は控える』という判断ができるトレーナーは、長期的なクライアントの健康を優先しています。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>トレーナー選びが怪我予防の半分：パーソナルジムの成功は『トレーナーの質』で80%以上が決まります。特に怪我予防は、トレーナーの知識と経験が直接反映されます。体験セッション時に、これら6つの特徴を確認することで、怪我予防に優れたトレーナー、優れたジムを見分けることができます。</strong>
                </p>
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
              安全で質の高いパーソナルジムを見つけよう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              怪我予防と安全性を重視したパーソナルジムを探しましょう。トレーナーの質と経験が、あなたの怪我予防を大きく左右します。
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
