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
      question: "パーソナルジムで柔軟性向上が重要な理由は何ですか？",
      answer: "『柔軟性の向上』『パーソナルトレーニングの効果』『大きく左右する要因』『です』『理由として』『1）トレーニング効果の最大化』『可動域が広がると』『筋肉の動く範囲が増える』『より大きな刺激を得られる』『2）ケガの予防』『柔軟性が低いと』『トレーニング中に不正なフォームになりやすく』『関節や靭帯への負担が増加』『する』『3）筋肉の成長促進』『筋肉が伸ばされた状態を経験することで』『筋線維に機械的ストレスが加わり』『筋肥大が促進される』『4）日常生活の質向上』『股関節や背中の柔軟性が上がると』『腰痛や肩こりが改善される』『可能性が高い』『5）トレーニングの継続性』『可動域が広がるとトレーニングが快適になり』『継続しやすくなる』『という複合的な利点があります』『パーソナルジムでの専門的な柔軟性トレーニングは』『これらのメリットを最大限に引き出すために不可欠』『です』。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "静的ストレッチと動的ストレッチの違いは何ですか？",
      answer: "『ストレッチは』『大きく2つの種類に分類』『されます』『静的ストレッチ（スタティックストレッチ）』『一定の姿勢を保ちながら筋肉を伸ばす方法』『です』『例えば』『前屈で30秒静止する』『ヨガのポーズを30～60秒キープする』『といった形式』『です』『利点は』『筋肉の柔軟性を直接的に向上させられる』『副交感神経を優位にしてリラックス効果がある』『関節可動域（ROM）の改善』『が挙げられます』『最適なタイミングは』『トレーニング後』『クールダウン時』『です』『一方』『動的ストレッチ（ダイナミックストレッチ）』『筋肉を伸ばしながら同時に動く方法』『です』『例えば』『レッグスイング（脚を振る）』『アーム・サークル（腕を大きく回す）』『ウォーキング・ルンジ（歩きながら行うランジ）』『といった形式』『です』『利点は』『神経系を活性化させ筋肉の準備を整える』『心拍数と体温を上げる』『ケガのリスク低減』『が挙げられます』『最適なタイミングは』『トレーニング前のウォームアップ時』『です』『パーソナルジムでは』『この2つを適切に組み合わせることで』『最大の効果を引き出す』『重要』『です』。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "筋トレ前後のストレッチプログラムはどのように設計しますか？",
      answer: "『最適なストレッチプログラムは』『トレーニング周期に応じて変わります』『以下が基本的な設計原則』『です』『筋トレ前のウォームアップ（5～10分）』『1）軽い有酸素運動（2～3分）：ジョギングやエアロバイク』『2）動的ストレッチ（3～5分）：レッグスイング・肩甲骨回旋・ウォーキング・ルンジ』『3）対象筋の軽いエクササイズ（1～2分）：本メニュー前に軽い負荷で関節を動かす』『筋トレ中のストレッチ』『セット間のアクティブ・レスト（30～60秒）』『対象筋を軽く伸ばす』『本当の筋肥大を望む場合』『過度な静的ストレッチは避ける』『筋肉の緊張が低下し』『パフォーマンスが低下する可能性がある』『』『筋トレ後のクールダウン（5～10分）』『1）軽い有酸素運動（2～3分）：ウォーキング等で心拍数を低下』『2）静的ストレッチ（3～5分）：各筋肉を30～60秒かけてゆっくり伸ばす』『特に鍛えた部位を重点的に』『3）呼吸を意識した深いストレッチ：副交感神経を優位に』『このプログラムを』『パーソナルトレーナーと一緒に目的に応じて調整することで』『効果的な柔軟性向上』『実現可能』『です』。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "可動域（ROM）改善がトレーニング効果を高める理由は何ですか？",
      answer: "『可動域（ROM: Range of Motion）の改善』『トレーニング効果の向上』『直結する複数の理由』『あります』『1）筋肉への刺激が増加』『可動域が広がると』『筋肉がより長く伸び縮みする距離が増える』『より大きなメカニカルテンションを生み出す』『機械的刺激が増加し筋肥大が促進される』『2）フォームの改善』『可動域が狭いと』『不正なフォームでトレーニングしやすく』『目的外の筋肉に負担がかかる』『可動域を広げることで』『正確で美しいフォームでの実施が可能になる』『3）ケガの予防』『可動域が制限されていると』『トレーニング中に無理な動きをして靭帯や関節を傷める』『可能性がある』『可動域を広げることで』『このリスクが低減される』『4）筋肉の完全収縮』『可動域が広がると』『筋肉がより完全に収縮・伸張される』『筋繊維全体により強い刺激を与えられる』『5）長期的なパフォーマンス向上』『可動域の改善により』『トレーニング以外の日常生活でも体が楽に動く』『姿勢改善・痛みの軽減・アスリックパフォーマンスの向上』『が期待できる』『パーソナルジムでの専門的な可動域改善プログラム』『これらのメリットを最大限に活かす』『重要』『です』。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "硬い体でパーソナルジムを始める場合の注意点は何ですか？",
      answer: "『硬い体でのパーソナルジム開始』『多くの人が心配する要素』『しかし』『適切に進めれば全く問題ない』『むしろ』『パーソナルジムは硬い体を改善する最適な環境』『です』『以下が重要な注意点』『です』『1）段階的な可動域改善』『初期段階では』『無理に深く伸ばさない』『『痛みを感じない範囲で』『ゆっくり伸ばす』『2）事前の十分なウォームアップ』『冷えた状態でストレッチを行うと』『靭帯や腱を傷める可能性がある』『常に十分なウォームアップを実施』『3）呼吸を止めない』『ストレッチ中に呼吸を止めると』『筋肉が余計に緊張し』『柔軟性の向上が遅くなる』『常に深い呼吸を意識』『4）パーソナルトレーナーとの綿密なコミュニケーション』『現在の痛みや柔軟性の制限について』『事前に詳しく伝える』『その上でパーソナルトレーナーが個人に合ったプログラムを設計』『5）継続性の確保』『柔軟性の改善には』『『最低でも3～4週間の継続』『必要』『『短期間で諦めず』『『根気強く続ける』『が重要』『6）その他の改善方法の活用』『ストレッチだけでなく』『フォームローラー（筋膜リリース）』『ヨガ』『マッサージ』『を組み合わせることで』『改善速度が加速される』『パーソナルジムでの専門的なサポート』『硬い体を短期間で改善する最短ルート』『です』『不安を感じず』『プロに任せることが成功の鍵』『です』。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "柔軟性向上とパーソナルジムのパーソナルトレーニングの組み合わせメリットは？",
      answer: "『柔軟性向上』『パーソナルトレーニング』『を組み合わせることで』『単独での実施より遙かに大きな効果』『生まれます』『メリットは以下の通り』『です』『1）専門的な診断と設計』『パーソナルトレーナーが』『個人の柔軟性の制限部位と原因を診断』『その上で改善プログラムを設計』『より効率的で安全な改善が可能』『2）フォーム指導による筋トレ効果の最大化』『柔軟性が向上すると』『正確なフォームでトレーニング可能になり』『筋肥大や筋力向上の効果が大幅に上昇』『3）ケガリスクの低減』『プロの監視下で』『無理のない範囲での柔軟性改善』『トレーニング中のケガリスク減少』『4）モチベーション維持』『パーソナルトレーナーと一緒に進めることで』『進捗が実感でき』『モチベーションが維持しやすい』『5）目的に応じた最適化』『ボディメイク・パフォーマンス向上・ケガ予防』『など』『どの目的でも』『パーソナルトレーナーが柔軟性向上をカスタマイズ』『6）継続率の向上』『パーソナルジム利用者は』『自己流より継続率が高く』『長期的な柔軟性向上が実現しやすい』『パーソナルジムは単なる筋トレの場ではなく』『『包括的なボディケアと改善の専門機関』『です』『柔軟性向上の実現こそが』『『パーソナルジムの価値を最大限引き出すコツ』『です』。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymFlexibilityPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムで柔軟性を高める方法" },
  ];

  const pageTitle = "パーソナルジムで柔軟性を高める方法｜ストレッチ・可動域改善で筋トレ効果アップ";
  const pageUrl = `${baseSiteUrl}/column/gym-flexibility/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでの柔軟性向上トレーニングを解説。静的・動的ストレッチの使い分け、筋トレ前後のストレッチプログラム、可動域（ROM）改善による怪我予防、硬い体でも始められるパーソナルトレーニングのメリットを紹介。"
        path="/column/gym-flexibility/"
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
              description: "柔軟性向上とパーソナルトレーニングの組み合わせ、ストレッチの種類と効果的な実施方法、可動域改善がトレーニング効果に与える影響についてわかりやすく解説します。",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ExerciseGym",
              name: "パーソナルジムで柔軟性を高める方法",
              description: "柔軟性向上とストレッチ、トレーニング効果の最大化、ケガ予防のための完全ガイド",
              url: pageUrl,
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
              『パーソナルジムでのトレーニング』『多くの人が筋肥大や筋力向上のみに注目』『しかし』『柔軟性向上』『同じくらい重要な要素』『です』『本記事では』『パーソナルジムでの柔軟性向上の方法』『静的ストレッチと動的ストレッチの使い分け』『筋トレ前後のストレッチプログラム』『可動域（ROM）改善によるトレーニング効果の向上』『ケガ予防』『硬い体でも始められるパーソナルトレーニングのメリット』『について詳しく解説します』。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムで柔軟性向上が重要な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『柔軟性向上』『単なるボーナス要素ではなく』『パーソナルトレーニングの核となる要素』『です』『多くの人が見落としている』『このポイントを理解することで』『トレーニング効果が劇的に向上』『します』。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング効果の最大化</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    『柔軟性が低いと』『筋肉の動く範囲が制限される』『という現象が起きます』『例えば』『肩の柔軟性が低い場合』『ベンチプレスの可動域が狭くなり』『胸の筋肉が完全に伸張・収縮しない』『結果として』『『筋肥大効果が50%以下に低下』『することもあります』『一方』『柔軟性を向上させると』『より大きな可動域でトレーニング可能』『筋肉全体に強い刺激を与えられる』『同じ時間・重量でも』『『より高い効果を得られる』『というメリット』『生まれます』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-2">ケガの予防と安全性の向上</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    『柔軟性が低いと』『関節が本来の可動範囲を超えて無理に動かされる』『という状況が生じやすい』『この結果』『『靭帯や腱に過度なストレスがかかり』『『ケガのリスクが高まる』『パーソナルジムでのトレーニングは』『比較的高い負荷を扱うため』『ケガのリスクは自己流より高い』『しかし』『柔軟性を十分に確保していると』『このリスク大幅に低減』『安全で継続可能なトレーニング』『実現できます』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">フォーム改善による効率化</h3>
                  <p className="text-gray-700 text-sm">
                    『柔軟性が低いと』『『フォームが乱れやすい』『という現象が起きます』『例えば』『股関節の柔軟性が低いと』『スクワットで膝が内側に倒れやすくなる』『『結果として』『『大腿四頭筋ではなく膝関節に負担がかかる』『という不正なフォーム』『なります』『柔軟性を改善すると』『『正確で美しいフォームの実施が可能』『『パーソナルトレーナーの指導も効きやすくなる』『という相乗効果』『生まれます』。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                静的ストレッチと動的ストレッチの使い分け
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『ストレッチは』『実施方法により大きく効果が異なります』『『正しい知識に基づいた使い分けが重要』『です』。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">動的ストレッチ：トレーニング前のウォームアップに最適</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『動的ストレッチは』『筋肉を伸ばしながら同時に動く方法』『トレーニング前に実施するのに最適』『です』『例えば』『レッグスイング（脚を振る）』『アーム・サークル（腕を大きく回す）』『ウォーキング・ルンジ（歩きながら行うランジ）』『といった動き』『です』『効果として』『1）神経系の活性化：運動神経を目覚めさせ』『トレーニングへの準備を整える』『2）心拍数と体温の上昇：血流を増加させ』『筋肉に酸素と栄養を供給』『3）関節のウォームアップ：関節液の分泌を促進』『4）ケガのリスク低減』『があります』『パーソナルジムでのトレーニング前は』『最低でも5～10分間の動的ストレッチ』『推奨』『です』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">静的ストレッチ：トレーニング後のクールダウンが鉄則</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『静的ストレッチは』『一定の姿勢を保ちながら筋肉を伸ばす方法』『トレーニング後のクールダウンに最適』『です』『例えば』『前屈で30秒静止する』『ヨガのポーズを60秒キープする』『といった動き』『です』『効果として』『1）筋肉の柔軟性向上：直接的に可動域を拡大』『2）副交感神経の優位化：リラックス効果』『3）筋肉の疲労回復：乳酸の除去促進』『4）翌日以降の筋肉痛軽減』『があります』『注意点として』『トレーニング前に静的ストレッチを行うと』『筋肉の緊張が低下し』『『パフォーマンスが落ちる』『可能性があります』『トレーニング後のクールダウン時に』『『必ず実施する』『という使い分けが重要』『です』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">パーソナルジムでのストレッチ実施の黄金プログラム</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『パーソナルジムでの最適なストレッチプログラムは』『以下の構成』『です』『トレーニング前（5～10分）』『1）軽い有酸素運動2～3分』『2）動的ストレッチ3～5分』『3）対象筋の軽いエクササイズ1～2分』『本トレーニング中』『セット間の軽いストレッチ30～60秒』『トレーニング後（5～10分）』『1）軽い有酸素運動2～3分』『2）静的ストレッチ3～5分』『『この流れを毎回守ることで』『『最高のトレーニング効果』『実現できます』『パーソナルトレーナーがこのプログラムを厳密に管理』『『あなたの柔軟性向上を加速させる』『というのがパーソナルジムの価値』『です』。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                可動域（ROM）改善がトレーニング効果を劇的に向上させるメカニズム
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『可動域の改善』『筋トレの効果を左右する最大の要因』『一つです』『『メカニズムを理解することで』『『トレーニングへの向き合い方が大きく変わる』『』『です』。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">機械的テンションの増加による筋肥大促進</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『筋肥大のメカニズムは』『『機械的テンション・筋損傷・代謝ストレス』『3つの要因で決まる』『です』『このうち』『『機械的テンション（筋肉が伸ばされる力）』『『最も重要な要因』『です』『可動域が広がると』『『筋肉がより長く伸び縮みする距離が増える』『『この過程で機械的テンションが増加』『『結果として』『『筋線維に強い刺激が加わる』『『だから』『『同じ重量でも』『『可動域が広いほど筋肥大効果が高い』『という現象が起きる』『です』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">フォーム正確性の向上による目的筋への集中度アップ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『可動域が制限されていると』『『どうしてもフォームが乱れる』『という物理的な必然』『生じます』『例えば』『『肩の柔軟性が低いと』『『チェストプレスで腕を十分に下げられず』『『フォームが浅くなってしまう』『』『可動域を広げると』『『フォーム改善が自然に起きる』『『結果として』『『正確な動作で目的筋に集中できる』『『同じ負荷でも効果が大幅に上昇』『です』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">可動域改善による長期的なパフォーマンス向上</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『可動域改善のメリットは』『短期的なトレーニング効果だけではない』『です』『長期的には』『『日常生活の質が向上』『『スポーツパフォーマンスが上昇』『『老化を遅延させる』『など』『『人生全体の質が向上する』『というメリット』『生じます』『パーソナルジムでの可動域改善は』『『単なる筋トレの付加価値ではなく』『『人生のクオリティを上げる投資』『です』。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                硬い体でパーソナルジムを始める方が実は有利な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『硬い体でのパーソナルジム開始』『多くの人が不安を感じる』『しかし』『実は最大のメリット』『あります』『理由は』『『改善の余地が大きい』『『だからです』。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">改善による変化が大きく、モチベーション維持が容易</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『硬い体の人がパーソナルジムで柔軟性を改善すると』『『短期間で劇的な変化を実感できる』『『この実感がモチベーション維持に直結』『です』『例えば』『『初回は前屈で手が膝までの高さ』『『4週間後に手が足に付く』『『このような明確な改善』『』『継続のモチベーション大幅に上昇』『』『結果として』『『トレーニング継続率が高まる』『という好循環』『生じます』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">パーソナルトレーナーによる専門的な指導が活躍する場面が多い</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『硬い体の人は』『『自力での改善が難しい』『『『パーソナルトレーナーの出番が非常に多い』『』『つまり』『『パーソナルジムの価値を最大限に引き出せる』『『という逆転現象が起きる』『です』『正しいストレッチ方法・個人に合わせた可動域改善プログラム・ケガ防止の指導』『など』『『プロの指導が最も活躍する場面』『であり』『『結果として』『『短期間での劇的な改善』『実現しやすい』『です』。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">硬い体でのパーソナルジム開始の成功法則</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『硬い体でパーソナルジムを成功させるための重要ポイントは』『以下の通り』『です』『1）事前に柔軟性の制限について詳しく伝える：『何が硬いのか』『どの動作で痛みがあるのか』『を明確に説明』『2）段階的な目標設定：『いきなり深く伸ばす』『ではなく』『『第1段階は「痛みなく伸ばせる」』『第2段階は「柔軟性向上」』『という段階的な目標』『3）呼吸を意識する：『ストレッチ中に呼吸を止めると』『『筋肉がより緊張』『『柔軟性向上が遅れる』『4）継続性の確保：『『最低でも3～4週間の継続』『必要』『5）パーソナルトレーナーとのコミュニケーション：『『無理は絶対禁止』『』『『不安なことは遠慮なく伝える』『これらのポイントを守ることで』『『硬い体からの改善は加速される』『です』。
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                よくある質問と回答
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Q. {faq.question}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      A. {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* CTA Section */}
          <div className="mt-10 bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              柔軟性向上とトレーニング効果の最大化をパーソナルジムで実現
            </h3>
            <p className="text-blue-800 mb-4">
              柔軟性の向上は、パーソナルトレーニングの効果を最大限に引き出すための必須要素です。静的・動的ストレッチの適切な使い分け、可動域改善によるフォーム正確性の向上、ケガ防止など、パーソナルトレーナーの専門的な指導があれば、短期間での劇的な改善が実現します。硬い体からのスタートであっても、パーソナルジムでのサポートで必ず改善できます。プロのサポートを受けて、効率的に目標を達成しましょう。
            </p>
            <Link
              href="/contact/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              パーソナルジムを探す
            </Link>
          </div>
        </article>
      </div>
    </Layout>
  );
}
