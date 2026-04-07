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
      question: "HIITとは何ですか？通常の有酸素運動との違いは何ですか？",
      answer: "HIITとは『High-Intensity Interval Training』の略で、『高強度インターバルトレーニング』という意味です。最大心拍数の85～95%の高強度運動を20～30秒間行い、その後10～30秒間の低強度またはレスト期間を設けることを繰り返すトレーニング方法です。通常の有酸素運動（ジョギングやエアロバイク）は、比較的低～中程度の強度を20～60分間継続するのに対し、HIITは『短時間で爆発的に高い強度』を出し、『短い休息』を挟んで繰り返します。つまり、有酸素運動は『低強度・長時間』、HIITは『高強度・短時間』という根本的な違いがあります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "HIITが脂肪燃焼に効果的な理由は何ですか？",
      answer: "HIITが脂肪燃焼に効果的な最大の理由は『アフターバーン効果』（EPOC：運動後余剰酸素消費）です。高強度運動を行うと、運動中だけでなく、運動終了後も代謝が高い状態が数時間～24時間続きます。つまり『寝ているときでもカロリーを消費し続ける』という状態になります。20分のジョギングでは20分間だけカロリー消費が高まりますが、15分のHIITであれば15分の運動時間に加えて、その後24時間も代謝が高い状態が続くため、総消費カロリーが大きく増えます。さらに、HIITは筋肉を使う運動のため『筋肥大による基礎代謝向上』も期待でき、長期的には『太りにくい体』を作ることができます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "HIITの代表的な種目にはどんなものがありますか？",
      answer: "代表的なHIITの種目として、以下のようなものがあります。1）バービー：立った状態から両手を地面に付け、脚をジャンプで後ろに伸ばし、その後脚をジャンプで戻して立ち上がる運動。全身を使い、最も高強度な種目の一つです。2）マウンテンクライマー：プランク姿勢から両脚を交互に素早く胸に向かって引き上げる運動。体幹と脚の両方を鍛えます。3）ジャンピングスクワット：通常のスクワットからジャンプで立ち上がり、着地してすぐ次のスクワットに入る運動。脚の爆発力を高めます。4）スプリント：短距離全力走。最もシンプルで、心肺機能を高める最高の種目です。5）ジャンピングジャック：両脚を広げながらジャンプし、着地して脚を閉じてジャンプするラジオ体操の動き。初心者向けで心肺機能向上に効果的です。これらの種目を組み合わせることで、全身を効率よく鍛えながら、脂肪燃焼を最大化できます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "パーソナルトレーナーがHIITを指導する際に安全性を確保するポイントは？",
      answer: "パーソナルトレーナーがHIITを安全に指導するためのポイントは、以下の通りです。1）強度設定：クライアントの現在の体力レベルに合わせて、最初は『20秒間の高強度×30秒間の休息』という比較的緩い設定から始め、徐々に『30秒間の高強度×10秒間の休息』という厳しい設定に進めます。無理に高強度から始めると、ケガや心臓への過負荷につながります。2）インターバル比率：一般的には『高強度：低強度＝1：1』（20秒高強度、20秒休息）が最初の目安ですが、段階的に『高強度：低強度＝2：1』（20秒高強度、10秒休息）に進めます。3）フォームチェック：高強度で疲労している状態ではフォームが崩れやすく、ケガのリスクが高まります。トレーナーが常に『正しいフォームが保たれているか』を確認し、必要に応じて修正指導を行います。4）心拍数モニタリング：最大心拍数の85～95%に達しているか、心拍数が十分に回復しているかを確認し、クライアントの健康状態に異常がないかを監視します。5）事前の健康診断：特に高血圧や心疾患の既往がある場合は、医師の許可を得た上でHIITを実施します。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "HIITが向かない人、避けるべき人はいますか？",
      answer: "HIITは非常に効果的なトレーニング方法ですが、全ての人に適したものではありません。向かない人の例として、以下のようなケースが考えられます。1）心疾患や高血圧のある人：最大心拍数まで達するようなHIITは心臓への負担が大きく、医師の許可なしには実施できません。2）関節痛や痛みがある人：バービーやジャンピングスクワットといった高衝撃の種目は、膝や腰に大きな負荷をかけるため、既に関節痛がある場合は避けるべきです。3）初心者：HIITは『高強度』が前提のため、基礎的な筋力や心肺機能が不足している初心者が最初から取り組むと、ケガのリスクが高く、続かない可能性があります。まずは3～6ヶ月の基礎トレーニングで体を整えてからHIITに取り組むのが安全です。4）体重が非常に重い人：体重が重いと、ジャンプ系の種目では膝や腰への衝撃が大きくなるため、段階的に進める必要があります。5）現在、非常に疲労している状態：十分な回復がない状態でHIITに取り組むと、オーバートレーニング症候群につながります。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "HIITと有酸素運動、どちらが効果的ですか？また、週の実施回数の目安は？",
      answer: "『HIITと有酸素運動、どちらが効果的か』という問いに対する答えは『目的による』です。短時間で脂肪燃焼を最大化したい場合、アフターバーン効果を活用したい場合はHIITが圧倒的に優れています。しかし『心肺機能の継続的な向上』『関節への衝撃を最小化』『心身のリラックス』という点では有酸素運動が優れています。理想的なアプローチは『両者の組み合わせ』です。例えば、週3回のパーソナルトレーニングのうち、1回はHIITを含むセッション、1回は筋トレ＋軽い有酸素運動という配分が効果的です。週の実施回数の目安として、HIITは『週1～2回』が適切です。HIITは非常に高強度なため、毎日行うと『オーバートレーニング』になり、回復時間が不足します。週2回実施する場合は『最低でも2日間の間隔』を設けることが重要です。一方、低～中強度の有酸素運動は『週3～5回』でも問題ありません。HIITで脂肪燃焼と心肺機能を高め、その他の日に有酸素運動で継続的なカロリー消費を行うというバランスが、最も効率的で持続可能なアプローチです。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymHiitPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "HIITとパーソナルトレーニング" },
  ];

  const pageTitle = "HIITとパーソナルトレーニング｜高強度インターバルトレーニングの効果・種目・注意点";
  const pageUrl = `${baseSiteUrl}/column/gym-hiit/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="HIITの効果、代表的な種目、パーソナルトレーナーがHIITを安全に指導するポイント、HIITが向かない人、有酸素運動との比較、週の実施回数と回復時間の目安について詳しく解説します。"
        path="/column/gym-hiit/"
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
              description: "HIITの定義、脂肪燃焼メカニズム、代表的な種目、安全な指導方法、向かない人、週の実施回数についてわかりやすく解説します。",
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
              name: "パーソナルジムHIITトレーニングガイド",
              description: "HIITの効果、種目、安全な実施方法、週の実施回数",
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
              パーソナルトレーニングの世界で『短時間で最高の脂肪燃焼効果』を実現する方法として注目を集めているのが『HIIT』です。わずか15～20分で、1時間のジョギング以上の脂肪燃焼効果が期待できるHIITは、忙しい現代人にとって理想的なトレーニング方法です。本記事では、HIITとは何なのか、なぜ脂肪燃焼に効果的なのか、代表的なHIIT種目の詳細な実施方法、パーソナルトレーナーがHIITを安全に指導するための重要ポイント、HIITが向かない人の特徴、有酸素運動との効果比較、そして週の実施回数と回復時間の目安について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                HIITとは：高強度・短時間・インターバル構造の定義
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                HIITを正しく理解することが、効果を最大化する第一歩です。『短時間』『脂肪燃焼』『心肺機能向上』という3つのメリットを実現するHIITの仕組みを、詳しく説明します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-2">HIITの基本構造：高強度と低強度の繰り返し</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    HIITは『高強度運動』と『低強度またはレスト』の組み合わせで構成されています。典型的なHIITのパターンは『20秒間の全力バービー』『10秒間の休息』を繰り返すというものです。この短い高強度と短い休息の繰り返しが、通常の有酸素運動とは全く異なる『爆発的なエネルギー消費』を生み出します。重要なのは『高強度フェーズで最大心拍数の85～95%に達すること』です。ここまで心拍数を上げることで、心肺機能の向上と、その後のアフターバーン効果が実現されます。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-2">有酸素運動との最大の違い</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    有酸素運動は『低～中強度』を『長時間』続けるアプローチです。例えば、『時速10km のジョギングを30分間』という方法です。一方、HIITは『最大心拍数近い高強度』を『短時間』で繰り返すアプローチです。有酸素運動は『継続的で安定した』脂肪燃焼を実現しますが、運動終了後はカロリー消費が通常レベルに戻ります。これに対し、HIITは『爆発的で短時間の』高強度で、運動終了後も『アフターバーン効果』により24時間のカロリー消費が高い状態を維持します。これが『短時間で大きな効果』を実現するHIITの秘密です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">HIITが『時間効率が最高』の理由</h3>
                  <p className="text-gray-700 text-sm">
                    『時間がない』というのは現代人の悩みです。HIITであれば、わずか15分のトレーニングで『1時間のジョギング以上の効果』を実現できます。これは単に『運動時間内のカロリー消費が多い』だけでなく、『その後24時間のカロリー消費が高い』というアフターバーン効果があるからです。つまり、15分のHIITは『15分の運動時間＋その後24時間の高代謝』という組み合わせで、トータルの脂肪燃焼効果が非常に高くなります。忙しいビジネスマンやママたちにとって、『短時間で最大の効果』を実現するHIITは、理想的なトレーニング方法です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                HIITが脂肪燃焼・代謝アップに効果的な理由：アフターバーン効果の科学
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『なぜHIITはこんなに脂肪燃焼に効果的なのか』という疑問に対する答えは『アフターバーン効果』です。この科学的なメカニズムを理解することで、なぜパーソナルトレーナーがHIITを強く推奨するのかが納得できます。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">アフターバーン効果（EPOC）とは：運動後の高代謝状態</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    アフターバーン効果は『EPOC（Excess Post-Exercise Oxygen Consumption）』とも呼ばれ、運動後に酸素消費量が増加して、代謝が高い状態が続く現象です。HIITのような高強度運動を行うと、体は『酸素不足』の状態になります。運動終了後、その酸素不足を補うために『酸素消費量が増える』という仕組みです。この過程で『エネルギー再生成』『体温調整』『乳酸除去』などの生理的なプロセスが行われ、その結果として『基礎代謝が高い状態』が維持されます。一般的に『中～高強度の有酸素運動後は1～2時間』、『HIITのような高強度インターバル運動後は6～24時間』のアフターバーン効果が続くとされています。つまり『寝ているときでもカロリーを消費し続けている』という状態になるのです。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">筋肉の微細なダメージと修復がもたらす代謝向上</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITは『筋肉を使う高強度運動』のため、筋肉に微細なダメージを与えます。このダメージを修復する過程で『タンパク質合成』が活発になり、筋肉が徐々に強くなります。また、筋肉が増えることで『基礎代謝』が向上し、『日常生活の中でのカロリー消費量』が増えます。つまり、HIITは『短期的には運動後のアフターバーン効果』『長期的には筋肉増加による基礎代謝向上』という2つのレベルで脂肪燃焼を実現するのです。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">有酸素運動 vs HIIT：総消費カロリーの比較</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    具体例で比較してみましょう。『30分のジョギング』と『15分のHIIT』のカロリー消費を比較します。30分のジョギング（時速10km）では、運動時間内に約250kcal 消費し、運動後のアフターバーン効果は約50kcal です。総計：300kcal です。一方、15分のHIIT では、運動時間内に約150kcal 消費しますが、アフターバーン効果が24時間続くため、その間に約150～200kcal 追加で消費されます。総計：300～350kcal です。つまり『同等かそれ以上の脂肪燃焼効果を、半分の時間で実現できる』のです。これが『時間がない人にはHIITが理想的』である理由です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                代表的なHIIT種目の詳細解説：バービー・マウンテンクライマー・ジャンピングスクワット・スプリント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                HIITの効果は『選ぶ種目』によって大きく異なります。代表的で効果的なHIIT種目の詳細な実施方法を、パーソナルトレーナー視点で解説します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. バービー：全身を使う最強のHIIT種目</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    バービーは『最も高強度で、最も脂肪燃焼効果が高い』HIIT種目です。実施方法は：①直立した状態から、②両手を地面に付き、③脚をジャンプで後ろに伸ばし、④すぐにジャンプで脚を元に戻し、⑤勢いよく立ち上がってジャンプする、というサイクルです。このプロセスで『脚の力』『腕の力』『体幹』『心肺機能』が全て鍛えられます。20秒間の全力バービーを行うと、心拍数が最大に近づき、アフターバーン効果が最大化されます。初心者向けの変種として『脚をジャンプで戻さず、ゆっくり戻す』という低衝撃バージョンもあります。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. マウンテンクライマー：体幹と脚を同時に鍛える</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    マウンテンクライマーは、プランク姿勢から『両脚を交互に胸に向かって素早く引き上げる』運動です。実施方法は：①プランク姿勢を取り、②左脚を胸に引き上げてすぐに脚を戻し、③右脚を胸に引き上げてすぐに脚を戻す、これを高速で繰り返します。この運動は『体幹の安定性』『脚の爆発力』『心肺機能』を同時に鍛えられます。また、バービーほど高衝撃ではないため、膝への負荷が相対的に低く、安全性の面でもお勧めできます。20秒間の高速マウンテンクライマーは、脚と体幹を激しく疲労させ、高い脂肪燃焼効果を実現します。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. ジャンピングスクワット：脚の爆発力と脂肪燃焼</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ジャンピングスクワットは『通常のスクワットから、ジャンプで立ち上がり、着地してすぐに次のスクワットに入る』運動です。実施方法は：①肩幅程度に脚を開き、②お尻を後ろに突き出しながらスクワットを行い、③爆発的にジャンプして立ち上がり、④着地と同時に次のスクワットに入ります。この『ジャンプのタイミング』が重要で、着地時に膝への過度な衝撃を避けるため『膝の角度を鋭く曲げて、ジャンプの衝撃を吸収する』テクニックが必須です。ジャンピングスクワットは『脚の大きな筋肉群（大腿四頭筋・大殿筋・ハムストリングス）』を高強度で鍛えるため、脂肪燃焼効果とアフターバーン効果が非常に高い種目です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. スプリント：最もシンプルで最も効果的な有酸素運動</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    スプリントは『短距離全力走』です。30m～100m の距離を『全力』で走り、その後『ゆっくり歩いて回復』するというサイクルです。このシンプルな運動こそが『最も高い心拍数』『最も高いカロリー消費』『最も高いアフターバーン効果』を実現します。スプリントの利点は『安全性が高い』『フォームが簡単』『全身の筋肉を爆発的に使う』という点です。ただし『十分なスペースが必要』『屋外で行うことが多い』という制限があります。パーソナルジムでスプリントを行う場合は『トレッドミルでの全力走』や『バトルロープの高速運動』などで代用することもあります。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーがHIITを安全に指導するための重要ポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                HIITは非常に効果的である一方、『高強度』ゆえに『ケガのリスク』『心臓への過負荷』といった安全面の課題があります。パーソナルトレーナーが確認すべき重要ポイントを解説します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">強度設定：無理のない段階的な進行が安全</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITを初めて行う場合、いきなり『30秒間の全力バービー×10秒間の休息』という高強度から始めるのはケガの原因になります。正しい段階的進行は、①初回は『20秒間の中程度強度×40秒間の休息』（高強度：低強度＝1：2）から始め、②2～3週間後に『20秒間の高強度×30秒間の休息』（1：1.5）に進め、③その後『20秒間の高強度×20秒間の休息』（1：1）、④最終的に『20秒間の高強度×10秒間の休息』（1：0.5）へと進めます。この段階的な進行により、『体が段階的に適応』し、『ケガなく高い効果を実現』できます。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">インターバル比率：高強度と低強度のバランスが鍵</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITの効果は『インターバル比率』（高強度フェーズの時間：低強度フェーズの時間）によって大きく変わります。『1：1』（20秒高強度、20秒低強度）のバランスは『高強度と回復の中程度なバランス』で、初心者向けです。『2：1』（20秒高強度、10秒低強度）は『回復時間が短く、より高強度』で、中級者向けです。『1：2』（20秒高強度、40秒低強度）は『十分な回復時間』で、心臓への負荷が低く、高齢者や心疾患リスクのある人向けです。トレーナーがクライアントの現在の体力レベルに合わせて『最適なインターバル比率』を選択することが重要です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">フォームチェック：高強度でも正しいフォームを保つ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    高強度で疲労している状態では、フォームが崩れやすく『膝が内側に入る』『背中が丸まる』『着地が雑になる』などのケガリスクが高まります。パーソナルトレーナーは『全20秒間、常に正しいフォームが保たれているか』を目視で確認し、『フォームが崩れ始めたら、その時点でセットを終了』するなどの判断が必要です。つまり『無理に20秒間やり切る』よりも『15秒間で正しいフォームが保てなくなったら15秒間で終了』という『品質重視』のアプローチが安全です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">心拍数モニタリング：最大心拍数の範囲内での実施</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITの効果を最大化するには『最大心拍数の85～95%に達すること』が必須ですが、同時に『それ以上に超過しないこと』も重要です。パーソナルトレーナーは『心拍計の使用』『クライアント自身の脈拍測定』『主観的な運動強度評価』などで『現在の心拍数がHIITの目安範囲内にあるか』を確認します。特に高血圧や心疾患のリスクがあるクライアントの場合は『医学的な監視下での心拍数管理』が必須です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">事前の健康診断：禁忌の確認と医学的許可</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIIT開始前には『医学的スクリーニング』が必須です。特に『高血圧』『心臓疾患』『糖尿病』『関節疾患』のある場合は『医師の許可なしにはHIITを実施できない』という厳格な姿勢が重要です。パーソナルトレーナーは『初回カウンセリング時に詳細な健康歴を聞き取り』『該当する禁忌がないか』『医師の許可が必要な場合は医師の判断を取り付ける』という責任を持ちます。安全第一のアプローチこそが『パーソナルトレーナーとしての信頼と品質』を作り上げます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                HIITが向かない人と有酸素運動との使い分け
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『全ての人にHIITが適している』わけではありません。HIITが向かない人の特徴と、有酸素運動との使い分けについて解説します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">HIITが向かない人：心疾患・高血圧・初心者・関節痛</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITは『高強度』が前提のため、以下のような人は『医師の許可なしには実施すべきではない』か『段階的に進める必要がある』です。①心臓疾患や高血圧のある人：最大心拍数に近い領域まで達するHIITは『心臓への急激な負荷』になり、危険です。②膝痛や腰痛などの関節疾患のある人：バービーやジャンピングスクワットは『高衝撃』で、既存の関節損傷を悪化させるリスクがあります。③トレーニング初心者：基礎的な筋力や心肺機能が不足している初心者がいきなりHIITに取り組むと『ケガのリスク』が非常に高く『続かない可能性』があります。最初は3～6ヶ月の基礎トレーニングでコンディショニングを整えてからHIITに進むべきです。④過度に疲労している人：十分な回復がない状態でHIITに取り組むと『オーバートレーニング症候群』につながり、免疫低下や怪我のリスクが高まります。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">有酸素運動との使い分け：目的別のアプローチ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    『HIIT』と『有酸素運動』は『どちらが優れている』というわけではなく『目的によって使い分ける』べきです。『短期間で最大の脂肪燃焼』『心肺機能の急速な向上』『アフターバーン効果の活用』が目的ならHIIT です。『心身のリラックス』『関節への負荷を最小化』『持続的で安全なトレーニング』『運動習慣の定着』が目的なら有酸素運動です。理想的なアプローチは『両者の組み合わせ』で、例えば『週1回のHIITセッション＋週2～3回の軽い有酸素運動』という構成が『短期的な脂肪燃焼』『長期的な心肺機能向上』『怪我のリスク最小化』を同時に実現します。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                HIITの週の実施回数と回復時間の目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                『どのくらいの頻度でHIITを行うか』『どの程度の回復期間が必要か』は、HIITの効果を最大化し、同時に安全性を確保するための重要な判断です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">週1～2回が最適：オーバートレーニングの回避</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITは非常に高強度なため『毎日実施する』と『オーバートレーニング症候群』につながり『免疫低下』『怪我のリスク増加』『パフォーマンス低下』といった逆効果が生じます。推奨される実施頻度は『週1～2回』です。週1回であれば『1週間の十分な回復期間』が得られ『持続可能で安全』なアプローチです。週2回実施する場合は『最低でも2～3日間の間隔』を設けることが重要です。例えば『月曜日と木曜日』『火曜日と金曜日』というスケジュールが、十分な回復期間を確保しながらHIITの効果を最大化できます。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">回復期間の内容：アクティブリカバリーと十分な睡眠</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    HIITセッション後の『回復期間』は『何もしない』のではなく『質的な回復』を行うことが重要です。回復期間には『軽いストレッチ』『ヨガ』『軽いウォーキング』などの『低強度運動（アクティブリカバリー）』が効果的で『疲労物質の除去』『血行改善』『心理的なリラックス』を実現します。さらに『十分な睡眠（7～9時間）』『タンパク質を含む栄養補給』『ストレス管理』が『筋肉の修復』『ホルモンバランスの回復』『身体全体の最適化』を実現します。つまり『HIIT後の回復こそが、次のHIITセッションの効果を決める』という認識が重要です。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">実施スケジュール例：週2回のHIIT＋ライフスタイルの最適化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    実際の実施スケジュール例として『パーソナルトレーニング週2回＋自宅でのケア』というアプローチを提案します。月曜：HIIT セッション（パーソナルジムで20分）、火曜：アクティブリカバリー（ストレッチ・ヨガ30分）、水曜：筋トレセッション（軽～中程度の強度）、木曜：HIIT セッション（パーソナルジムで20分）、金曜：軽い有酸素運動（ウォーキング30分）、土曜：アクティブリカバリーまたは休息、日曜：完全休息。このスケジュールにより『週2回の高強度HIIT』『十分な回復期間』『有酸素運動の継続』『心身のリラックス』を全て実現できます。
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                HIITで理想の体を実現する
              </h2>
              <p className="text-gray-700 mb-4">
                『短時間で最大の効果』『脂肪燃焼と心肺機能の同時向上』『忙しい人のための効率的なトレーニング』——これがHIITの本質です。ただし『高強度』ゆえに『正しい知識』『安全な指導』『段階的な進行』が必須です。
              </p>
              <p className="text-gray-700 mb-4">
                パーソナルトレーナーと一緒にHIITに取り組むことで『強度設定の最適化』『フォームの正確さ』『心拍数の管理』『回復期間の質的向上』を実現でき、『ケガなく、安全に、効果的に』理想の体を作ることができます。
              </p>
              <p className="text-gray-700">
                『時間がない』『短期間で結果を出したい』『心肺機能も高めたい』という方にとって、パーソナルジムでのHIITトレーニングは『最高の選択肢』です。プロのパーソナルトレーナーと一緒に、HIITの効果を最大化し、人生が変わるレベルの体の変化を実現してください。
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
