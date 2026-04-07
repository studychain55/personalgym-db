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
      question: "なぜフォームチェックがパーソナルトレーニングで重要なのですか？",
      answer: "正しいフォームでトレーニングしなければ、目的とする筋肉に正確に負荷がかかりません。例えば『スクワット』でも、膝の向きが悪いと、太もも前面に偏った負荷がかかり、ヒップアップの効果が激減します。また、不正なフォームは怪我のリスクを大幅に高めます。パーソナルトレーナーのフォームチェックは、『効果を最大化する』と『怪我を防ぐ』の両立を実現します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "スクワットの正しいフォームのポイントは何ですか？",
      answer: "スクワットは『膝がつま先より前に出ないこと』『胸を張ること』『腰を落とす際に膝が内側に入らないこと』が重要です。開始姿勢は足幅を肩幅程度に開き、つま先を少し外向きに向けます。腰を落とす際は、膝を曲げるのではなく『お尻を後ろに引く』イメージで、股関節と膝が同時に屈曲することが重要です。これにより、大臀筋と大腿四頭筋に均等に負荷がかかり、ヒップアップと脚やせの両立が実現します。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "デッドリフトで怪我しやすい間違ったフォームは？",
      answer: "デッドリフトで最も多い怪我は『腰痛』で、これは『背中を丸めた状態で持ち上げる』ことが原因です。正しいデッドリフトは『脊椎が中立位置を保ったまま』持ち上げることが必須です。また『膝を早すぎる段階で伸ばしてしまう』『腰を落とし始めた時に胸が落ちる』といった細微なフォーム崩れも、腰への負担を増やします。パーソナルトレーナーは、この細微なフォーム崩れをリアルタイムで修正し、怪我を防ぎながら背中・下半身の筋肉に正確に負荷をかけさせます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ベンチプレスのフォームで腕を痛めないコツは何ですか？",
      answer: "ベンチプレスで肩・肘を痛める最大の原因は『肘が体から離れすぎる』ことです。正しいフォームは『肘が体から約45度の角度を保つ』ことが重要です。また『バーを胸の上部に下ろす』『肩甲骨を寄せた状態をキープする』『首や頭をベンチから上げない』といった細部が、肩関節の安定性を確保します。パーソナルトレーナーは、これらの細部を毎セッション確認し、正確な胸の筋肉強化と肩関節の安全性を両立させます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "自宅でもフォームをチェックする方法はありますか？",
      answer: "スマートフォンで動画を撮影し、パーソナルトレーナーに送って確認してもらうことが効果的です。特に『側面からの動画』『正面からの動画』を併せて撮影すると、トレーナーがフォーム修正を正確に指摘できます。また、鏡を使って自分の動きを確認することも有効ですが、鏡だけでは判断が難しいため、トレーナーの指導を受けることを強くお勧めします。パーソナルジムの多くは『フォーム動画を記録・共有する制度』を持っており、自宅でのセルフチェック環境を提供しています。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "フォーム改善にはどのくらいの期間がかかりますか？",
      answer: "簡単な種目（スクワット・ダンベルプレス）は2～4週間で基本的なフォームが定着します。複雑な種目（デッドリフト・クリーン）は8～12週間かかる場合があります。重要なのは『毎セッション同じ種目を繰り返す』ことです。パーソナルトレーナーは、段階的にフォーム修正を進めながら、難易度を上げていきます。初期段階では『軽い重量で正確なフォームを習得する』ことが全てです。焦らず、正確さを優先することが、長期的な効果と安全性を確保します。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymFormCheckPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングのフォームチェック" },
  ];

  const pageTitle = "パーソナルトレーニングのフォームチェック｜正しいフォームで怪我を防ぎ効果を最大化する";
  const pageUrl = `${baseSiteUrl}/column/gym-form-check/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルトレーニングで正しいフォームが重要な理由、スクワット・デッドリフト・ベンチプレスの正しいフォーム、よくある間違いと修正方法、怪我予防とトレーニング効果の両立、自宅でのフォームチェック方法をわかりやすく解説します。"
        path="/column/gym-form-check/"
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
              description: "正しいフォームの重要性、主要種目の正しいフォーム、よくある怪我とその予防法、パーソナルトレーナーのフォームチェックの役割、自宅での継続方法をわかりやすく解説します。",
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
              パーソナルトレーニングで最も重要なのに、最も見落とされるのが『正しいフォーム』です。重い重量を扱うことより、正確なフォームでトレーニングすることが、結果を左右する最大の要因です。本記事では、なぜフォームチェックがパーソナルトレーニングで重要なのか、主要種目（スクワット・デッドリフト・ベンチプレス）の正しいフォームとよくある間違い、不正なフォームが引き起こす怪我の種類と予防方法、パーソナルトレーナーのフォームチェックが怪我防止と効果最大化の両立をいかに実現するのか、自宅でのセルフチェック方法、フォーム改善にかかる期間と段階的な難易度上昇について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                なぜフォームチェックがパーソナルトレーニングの最優先なのか
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルトレーニングの効果は『重い重量』ではなく『正確なフォーム』で決まります。フォーム改善は、単に「かっこよく見える」ための技術ではなく、『効果を最大化し、怪我を防ぐ』ための必須要素です。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">フォームが正確でないとどうなるのか</h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    フォームが崩れると、『目的の筋肉に負荷がかからず、意図しない部位に負荷がかかる』という問題が起こります。例えば：
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <span className="text-red-600 font-bold flex-shrink-0">●</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">スクワットの膝がつま先より前に出すぎる</h4>
                        <p className="text-gray-600 text-sm">膝関節へのストレスが増加し、膝痛のリスクが高まります。同時に、ヒップアップに必要な大臀筋への負荷が低下し、代わりに太もも前面（大腿四頭筋）ばかり肥大します。その結果『脚が太くなるだけで、ヒップアップしない』という悲劇が生まれます。</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-600 font-bold flex-shrink-0">●</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">デッドリフトで背中を丸める</h4>
                        <p className="text-gray-600 text-sm">脊椎への負担が増加し、腰椎椎間板ヘルニアのリスクが高まります。重い重量を扱うほど、このリスクは指数関数的に増加します。一度、腰を痛めると、数年間の治療期間が必要になる場合もあります。</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-600 font-bold flex-shrink-0">●</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">ベンチプレスで肘が体から大きく離れる</h4>
                        <p className="text-gray-600 text-sm">肩関節（特にローテーターカフ）への負担が増加し、インピンジメント症候群や腱炎のリスクが高まります。これは『痛みながら頑張る』という状況を生み出し、長期的には回復できない慢性痛に発展することもあります。</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">正しいフォームがもたらす3つのメリット</h3>
                  <ol className="space-y-3 text-gray-700 text-sm">
                    <li className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">1.</span>
                      <div>
                        <strong className="text-gray-900">目的の筋肉に確実に負荷がかかる</strong>
                        <p className="text-gray-600 mt-1">スクワットで大臀筋に正確に負荷がかかれば、3ヶ月で目に見えるヒップアップが実現します。ダンベルプレスで胸に正確に負荷がかかれば、バストアップと胸の厚みが同時に実現します。つまり『目標の部位が目標の速度で変わる』ということです。</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">2.</span>
                      <div>
                        <strong className="text-gray-900">怪我のリスクが激減する</strong>
                        <p className="text-gray-600 mt-1">正しいフォームは、関節への不要な負担を排除します。「痛みながらトレーニング」という悪循環を避け、『安全に継続できる環境』を実現します。長期的には、体の耐久性が向上し、加齢による機能低下も遅延します。</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-green-700 font-bold flex-shrink-0">3.</span>
                      <div>
                        <strong className="text-gray-900">進捗が加速する</strong>
                        <p className="text-gray-600 mt-1">同じ重量でも、フォームが正確になるほど、トレーニング刺激が増加します。結果として『軽い重量でも十分な効果が得られる』ようになり、短期間で重い重量が扱えるようになります。</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                主要種目の正しいフォームと、よくある間違い
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルトレーニングで最も頻出する3つの種目（スクワット・デッドリフト・ベンチプレス）について、正しいフォームとよくある間違いを詳しく解説します。
              </p>
              <div className="space-y-6">
                {/* Squat */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">1. スクワット｜下半身・ヒップアップの王様</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">正しいフォーム</h4>
                      <ol className="text-gray-600 text-sm space-y-2">
                        <li><strong>開始姿勢：</strong> 足幅は肩幅程度、つま先は30度程度外向きに向ける。視線は前方やや上を見つめる。</li>
                        <li><strong>下降段階：</strong> 「膝を曲げる」のではなく「お尻を後ろに引く」イメージで、股関節と膝が同時に屈曲する。</li>
                        <li><strong>膝の位置：</strong> 膝はつま先の垂直線上に留まり、つま先より前に出ない。膝がつま先の方向を向く。</li>
                        <li><strong>深さ：</strong> 太ももが床と平行になるまで下降するのが理想的。初心者は無理をせず、自分が制御できる範囲で実施。</li>
                        <li><strong>上昇段階：</strong> 膝を伸ばすのではなく「お尻に力を入れて立ち上がる」感覚で、股関節と膝が同時に伸展する。</li>
                      </ol>
                    </div>
                    <div className="bg-red-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">よくある間違い</h4>
                      <ul className="text-gray-600 text-sm space-y-2">
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>膝がつま先より前に出すぎる：</strong> 膝関節へのストレスが増加し、膝痛の原因になります。修正方法は『もっとお尻を後ろに引く』意識を持つこと。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>膝が内側に入る（ニーイン）：</strong> 膝蓋骨への不正な力がかかり、膝痛の主原因になります。『膝がつま先の方向を向く』イメージを持つこと。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>背中が丸まる：</strong> 脊椎への負担が増加します。『胸を張る』『腹圧を入れる』意識で修正。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>かかとが浮く：</strong> 体重がつま先に偏り、膝への負担が増加します。『かかとを踏ん張る』意識で修正。</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Deadlift */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">2. デッドリフト｜背中・腰の最強トレーニング</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">正しいフォーム</h4>
                      <ol className="text-gray-600 text-sm space-y-2">
                        <li><strong>セットアップ：</strong> バーが足の中心（かかとから5cm前方）の位置に置く。足幅は肩幅。</li>
                        <li><strong>スタート姿勢：</strong> 膝を曲げてバーに手を掛ける。この時点で『脊椎が中立（自然な湾曲）』を保つ。胸を張り、肩を後ろに引く。</li>
                        <li><strong>持ち上げ開始：</strong> 膝を伸ばすのではなく「脊椎を中立のまま、お尻を上に押し出す」イメージで、股関節と膝が同時に伸展する。バーは脚に沿ってスライドさせる。</li>
                        <li><strong>トップポジション：</strong> 完全に立ち上がり、肩がバーの真上に来る。膝・股関節・肩が全て伸展した状態。</li>
                        <li><strong>降ろす段階：</strong> 上げるのと逆の動きで、『脊椎を中立のまま』降ろす。バーは脚に沿ってスライド。</li>
                      </ol>
                    </div>
                    <div className="bg-red-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">よくある間違い</h4>
                      <ul className="text-gray-600 text-sm space-y-2">
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>背中が丸まる（バック・ラウンド）：</strong> デッドリフトで最も危険な間違い。脊椎に直接的な負担がかかり、椎間板ヘルニアのリスクが高まります。修正方法は『胸を張る』『腹圧を入れる』『脊椎を中立に保つ』意識。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>膝を早すぎる段階で伸ばす：</strong> バーを引き上げるのではなく『押す』動きになり、背中ではなく腿の裏に負荷が偏ります。『膝と股関節を同時に伸展させる』イメージで修正。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>バーが脚から離れる：</strong> バーが前に出ると、脊椎への負担が劇的に増加します。『バーを脚に沿ってスライド』させる意識を持つこと。</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bench Press */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">3. ベンチプレス｜胸・肩・腕の総合トレーニング</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">正しいフォーム</h4>
                      <ol className="text-gray-600 text-sm space-y-2">
                        <li><strong>セットアップ：</strong> ベンチに仰向けで寝る。頭・背中・お尻がベンチに密着。足は床に踏ん張る。</li>
                        <li><strong>肩甲骨の位置：</strong> 肩甲骨を寄せ、ベンチを押し込むイメージ。この『肩甲骨の安定性』が全ての基礎。</li>
                        <li><strong>バーの位置：</strong> 胸の上部（乳首の上）にバーを下ろす。肘の角度は45度を目安に。肘が体から大きく離れない。</li>
                        <li><strong>下降段階：</strong> ゆっくりバーを下ろし、胸にバーが軽く触れる位置まで。肩が沈まないよう注意。</li>
                        <li><strong>上昇段階：</strong> 『胸の力』『肩の力』で一気に押し上げる。肘を完全に伸ばさず、わずかに曲がった状態（フレッシュロック）をキープ。</li>
                      </ol>
                    </div>
                    <div className="bg-red-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">よくある間違い</h4>
                      <ul className="text-gray-600 text-sm space-y-2">
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>肘が体から大きく離れる：</strong> 肩関節への負担が増加し、インピンジメント症候群のリスクが高まります。『肘を約45度に保つ』『肘を体の近くに保つ』イメージで修正。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>肩甲骨の位置が緩む：</strong> 肩が不安定になり、胸への負荷が低下します。『肩甲骨を寄せたまま』『ベンチを押し込む感覚』を維持することが重要。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>首や頭がベンチから浮く：</strong> 脊椎への不正な力が加わります。『頭・背中・お尻がベンチに密着』させたまま実施。</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                          <span><strong>バーを胸の中央より低い位置に下ろす：</strong> 肩関節への負担が増加し、怪我のリスクが高まります。『胸の上部』を目安に下ろすことが重要。</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーがリアルタイムで行うフォームチェック
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルトレーニングの最大の価値は『リアルタイムのフォームチェックと修正』にあります。自己流では気づかない細微なフォーム崩れを修正し、最適なトレーニング刺激を実現します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">パーソナルトレーナーが実施する4段階のチェック</h3>
                  <ol className="space-y-3 text-gray-600 text-sm">
                    <li>
                      <strong className="text-gray-900">ステップ1：スタティック評価（静的評価）</strong>
                      <p className="mt-1">セッション開始時に、クライアントの『基本姿勢』『脊椎の湾曲』『肩の高さ』『骨盤の傾き』などを評価します。この基本的な姿勢の歪みが、全てのトレーニング動作に影響します。</p>
                    </li>
                    <li>
                      <strong className="text-gray-900">ステップ2：軽い重量での形成</strong>
                      <p className="mt-1">最初は軽い重量（またはダンベルなし）で、トレーニング動作を繰り返させます。この段階でトレーナーは『股関節の動き』『脊椎の安定性』『膝のアライメント』などを詳しく観察し、修正点を記録します。</p>
                    </li>
                    <li>
                      <strong className="text-gray-900">ステップ3：リアルタイム修正</strong>
                      <p className="mt-1">セット中に『膝が内側に入っていないか』『脊椎が中立を保っているか』『呼吸は正常か』などを、1回ごとに確認します。必要に応じて「膝をもっと外に」「胸をもっと張って」といった指示を出します。</p>
                    </li>
                    <li>
                      <strong className="text-gray-900">ステップ4：セット後の言語化</strong>
                      <p className="mt-1">セット後に「今のセットは膝のアライメントが改善されていた」「次のセットはもっと股関節を意識して」といった具体的なフィードバックを与え、クライアントが『何を改善すべきか』を理解させます。</p>
                    </li>
                  </ol>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">触覚フィードバックの重要性</h3>
                  <p className="text-gray-700 text-sm">
                    優れたパーソナルトレーナーは『見るだけ』ではなく『触って』修正します。例えば、スクワットで「お尻の筋肉が緊張しているか」を手で確認したり、デッドリフトで「脊椎が中立を保っているか」を手で確認したりします。この『触覚フィードバック』により、クライアントは『正しい感覚』を脳に刻み込み、その後の動作改善が加速します。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                フォーム改善の段階的プロセスと期間
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                フォーム改善は一夜にして完成するものではなく、段階的なプロセスを通じて、数週間～数ヶ月かけて定着します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-3">フォーム改善の段階</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">初期段階（1～2週間）：フォーム認知</h4>
                      <p className="text-gray-700 text-sm">
                        最初のセッションでは『間違ったフォーム』を認識させることが目標です。トレーナーが「今、膝が内側に入っていた」と指摘することで、クライアントが「あ、そんなことになっていたんだ」と気づきます。この認知段階が全ての基礎です。同時に、軽い重量でフォームを正確に習得することに専念します。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">習得段階（2～4週間）：脳への刻み込み</h4>
                      <p className="text-gray-700 text-sm">
                        毎セッション同じ種目を繰り返し実施し、『正しいフォーム』を脳に刻み込みます。この段階では重量の向上は二の次です。『質の高いフォーム』を繰り返すことで、筋肉が正しい動きを学習します。セッション内でのセット数が増え、セット内での『正確性の維持時間』が長くなります。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">定着段階（4～8週間）：オートマティック化</h4>
                      <p className="text-gray-700 text-sm">
                        この段階では『意識しなくても正しいフォーム』になっており、重量を段階的に上げても、フォームが崩れにくくなります。トレーナーの修正指示が大幅に減り、「いいね、そのまま」といった肯定的フィードバックが増えます。同時に、より高度な種目へのプログレッションが可能になります。
                      </p>
                    </div>
                    <li className="flex gap-2">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">応用段階（8週間以上）：複合種目への展開</h4>
                        <p className="text-gray-700 text-sm">
                          基本的な種目のフォームが定着したら、より複雑な種目（クリーン・スナッチなど）や、複数の種目を組み合わせた動作に進むことができます。この段階では『フォーム改善』から『パフォーマンス向上』にシフトします。
                        </p>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                自宅でのセルフ フォームチェック方法
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルトレーニング中のセッション以外の時間に、自宅でセルフチェックを実施することで、フォーム改善が加速します。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">スマートフォン動画撮影法</h3>
                  <ol className="text-gray-600 text-sm space-y-2">
                    <li><strong>側面撮影：</strong> トレーニング動作の側面を撮影。これにより『脊椎の位置』『膝と股関節の動き』『バーの軌跡』を確認できます。</li>
                    <li><strong>正面撮影：</strong> 正面から撮影。これにより『膝のアライメント（内側に入っていないか）』『肩の高さの左右差』を確認できます。</li>
                    <li><strong>トレーナーに送信：</strong> 撮影した動画をパーソナルトレーナーに送信し、フォームチェックを依頼。トレーナーが詳細な修正指示を返してくれます。</li>
                  </ol>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">鏡を使ったセルフチェック</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>正面鏡：</strong> 正面の鏡で『肩の高さ』『膝のアライメント』『体の傾き』を確認します。ただし、鏡の判断だけでは不十分なため、トレーナーのチェックと組み合わせることが重要です。</li>
                    <li><strong>側面鏡：</strong> 側面の鏡で『脊椎の湾曲』『膝の曲がり具合』を確認します。ただし『脊椎が本当に中立か』は、鏡では判断しづらいため、動画撮影の方がより正確です。</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                フォーム改善で、トレーニング効果を3倍に
              </h2>
              <p className="text-gray-700 mb-4">
                『正しいフォーム』がもたらす効果は、単なる技術的な改善ではなく『人生を変えるレベルの成果の加速』です。同じ重量を扱っても、フォーム一つで得られる効果は3倍、5倍と変わります。
              </p>
              <p className="text-gray-700">
                パーソナルトレーナーのフォームチェックは、高額な投資ではなく『最短で目標達成するための必須投資』です。あなたの体が変わるスピード、怪我のリスク、長期的な継続性の全てが『フォームの質』で決まります。
              </p>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
