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
      question: "40代・50代からのパーソナルジムは遅くないですか？",
      answer: "決して遅くありません。むしろ40代・50代からのパーソナルジムは非常に効果的です。この年代から始める人の9割以上が、体の変化を実感しています。重要なのは「年齢」ではなく「正しいトレーニング」です。年齢に応じた安全な指導が受けられるパーソナルジムは、中高年こそ最適な選択肢です。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "40代・50代のパーソナルジム、効果が出るまでの期間は？",
      answer: "体の変化を実感するまで、1～2ヶ月が目安です。体重減少、見た目の変化、体力向上が同時に進みます。ただし、年齢とともに代謝が低下しているため、30代までより若干時間がかかる傾向があります。3～6ヶ月続けることで、確実に身体的・精神的な変化が出ます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体が硬い・運動経験がない場合、パーソナルジムは無理ですか？",
      answer: "むしろパーソナルジムは最適です。独学で運動を始めると、フォームの誤りが原因で怪我をする可能性が高いです。パーソナルジムなら、トレーナーが体の状態に合わせて、安全にプログラムを組み立てます。体が硬い、運動経験がない人ほど、パーソナルジムの指導が重要です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "40代・50代に多い怪我のリスクは？パーソナルジムで防げますか？",
      answer: "腰痛、肩痛、膝痛が中高年に多い怪我です。パーソナルジムでは、これらの既存の痛みを考慮したプログラムを作成します。不適切な自宅運動よりも、専門家の指導を受けることで、怪我リスクは大幅に低下します。むしろ正しいトレーニングは、既存の腰痛や肩痛を改善することもあります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "40代・50代からのパーソナルジムで推奨される通所頻度は？",
      answer: "週1～2回が目安です。30代までは週2～3回が効果的ですが、中高年は回復期間が必要なため、週1～2回で十分に効果が出ます。回数より継続が重要であり、3～6ヶ月の継続で確実な結果が出ます。無理なく続けられるペースを選ぶことが、長期継続の秘訣です。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymAgePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "40代・50代からのパーソナルジム｜年齢別の効果と注意点" },
  ];

  const pageTitle = "40代・50代からのパーソナルジム｜年齢別の効果と注意点";
  const pageUrl = `${baseSiteUrl}/column/gym-age/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="40代・50代向けパーソナルジムガイド。体の変化、推奨トレーニング強度、ジム選びのポイント、怪我防止、継続のコツをまとめました。"
        path="/column/gym-age/"
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
              description: "40代・50代からのパーソナルジムの効果と注意点",
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
              シニア向け・中高年向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              40代・50代からのパーソナルジム利用が増えています。「今からでは遅い」と考える人も多いですが、むしろこの年代こそパーソナルジムが最適な理由があります。このガイドでは、40代・50代の体の変化、推奨トレーニング強度、ジム選びのポイント、怪我を防ぐための注意点、継続のコツを詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 40代・50代の体の変化 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                40代・50代の体の変化を理解する
              </h2>
              <p className="text-gray-700 mb-6">
                40代・50代では、若い頃と比べて体に明確な変化が起きます。これらの変化を理解することが、適切なトレーニング選択の第一歩です。
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    1. 筋肉量の低下（年1%程度）
                  </h4>
                  <p className="text-gray-700 text-sm">
                    30代から年1%ずつ筋肉量が低下します。40代では10年で約10%、50代では20年で約20%の筋肉が失われるということです。この筋肉低下が、基礎代謝低下と体脂肪増加の主要因です。パーソナルジムでの適切なトレーニングは、この低下を最小限に抑えられます。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    2. 基礎代謝の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    筋肉量の低下に伴い、基礎代謝は10年で約10～15%低下します。つまり、20代と同じ量を食べていても、太りやすくなるということです。50代では、30代比で月3,000kcal分の代謝差が出ます。これを補うには、筋力トレーニングが必須です。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    3. ホルモンの変化（更年期）
                  </h4>
                  <p className="text-gray-700 text-sm">
                    40代～50代は更年期にかかり、女性はエストロゲン、男性はテストステロン低下が起きます。これが体脂肪増加、疲労感、寝不足の原因になります。適切なトレーニングと栄養は、ホルモン変化の悪影響を最小限にできます。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    4. 骨密度の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    特に女性は閉経後、骨密度が急激に低下します。これは骨粗鬆症リスク増加につながります。レジスタンストレーニングは、骨密度維持に最も効果的な対策です。パーソナルジムでの安全なトレーニングは、骨健康の維持に直結します。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    5. 体力・柔軟性の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    40代・50代では、階段を上るのが疲れやすい、靴下が履きにくいなど、日常的な動きの衰えを感じます。これは筋力、柔軟性、心肺機能の低下です。パーソナルジムでの適切なトレーニングにより、これらは改善可能です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 推奨トレーニング強度 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                40代・50代の推奨トレーニング強度
              </h2>
              <p className="text-gray-700 mb-6">
                40代・50代では、若い頃と同じ強度では怪我リスクが高まります。年齢に応じた適切な強度を設定することが重要です。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 軽～中程度の負荷が基本
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代は、最大負荷の50～70%程度の軽～中程度の負荷が最適です。これは若い世代の75～90%と比べて明らかに軽いです。この強度でも、週2～3回の継続により、筋肉量維持や増加が十分に可能です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">推奨負荷レベル：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ ベンチプレス：20～30kg（個人差あり）</li>
                      <li>・ スクワット：体重の50～70%程度</li>
                      <li>・ デッドリフト：体重相当程度</li>
                      <li>・ 有酸素運動：軽いジョギング～ウォーキング</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. セット数と反復回数
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代は、1セット15～20回程度の中程度の反復回数が目安です。これは若い世代の8～12回と比べて多いですが、この範囲でも筋肉量維持・増加が期待できます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-semibold mb-2">推奨セット構成：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ セット数：2～3セット</li>
                      <li>・ 反復回数：12～20回</li>
                      <li>・ インターバル：1～1.5分</li>
                      <li>・ 週の頻度：1～2回/週</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 有酸素運動とのバランス
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代は、レジスタンストレーニング（筋トレ）と有酸素運動の両方が重要です。推奨は週2回の筋トレ＋週2～3回の軽い有酸素運動です。この組み合わせにより、心肺機能と筋肉の両方が維持できます。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. 段階的な負荷増加
                  </h4>
                  <p className="text-gray-700 text-sm">
                    最初は軽い負荷でフォームを完璧にすることが優先です。2～4週間かけて、徐々に負荷を上げていきます。急激な負荷増加は、怪我につながるため避けるべきです。パーソナルトレーナーが段階的に調整してくれるため、安全に進められます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: ジム選びのポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                中高年がパーソナルジムを選ぶ際のポイント
              </h2>
              <p className="text-gray-700 mb-6">
                40代・50代向けのジムを選ぶ際には、特に確認すべきポイントがあります。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. トレーナーの中高年指導経験
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代向けのトレーニング経験が豊富なトレーナーを選びましょう。若い世代と同じ指導では、怪我のリスクが高まります。以下を確認することが重要です。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 40代・50代の指導経験年数</li>
                    <li>・ 既存の怪我（腰痛、肩痛など）への対応経験</li>
                    <li>・ 栄養学や健康管理の知識</li>
                    <li>・ リハビリテーション関連の資格有無</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 初期カウンセリングの充実度
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代では、既存の腰痛や肩痛、高血圧などの情報把握が重要です。体験時に、詳細なカウンセリング（30分以上）を行うジムを選びましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 医師・栄養士の連携体制
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    血圧、血糖値などの健康管理が必要な年代です。ジム内に医師・栄養士がいるか、連携体制があるかを確認しましょう。これはリスク管理の観点で重要です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. バリアフリー設備
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    シャワー、トイレ、更衣室のバリアフリー対応、滑りにくい床材、階段の手すりなど、安全な環境が整っているか確認してください。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 通いやすさの重視
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代では、無理なく続けられることが最優先です。自宅・職場から近い、営業時間が合致している、駐車場が完備されているなど、通いやすさを重視しましょう。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 怪我防止 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                怪我を防ぐための準備運動と注意点
              </h2>
              <p className="text-gray-700 mb-6">
                40代・50代では、怪我防止が非常に重要です。適切な準備と注意により、安全にトレーニングできます。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 入念なウォーミングアップ（10～15分）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代は、軽いジョギングやサイクリングで心拍数を上げた後、動的ストレッチを行います。30代までの5分程度では不十分です。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 有酸素運動：5～7分（心拍数を80～100bpmに上げる）</li>
                    <li>・ 動的ストレッチ：5～8分（関節を動かすストレッチ）</li>
                    <li>・ 軽い動作確認：数回のジャンプやスクワット</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. フォーム習得を最優先
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代での怪我の主原因は、不正なフォームです。重くしたい気持ちを抑え、軽い負荷でフォームを完璧にすることが、長期的な効果につながります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 既存の痛みがある場合の対応
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    腰痛、肩痛、膝痛がある場合は、事前にトレーナーに伝えることが重要です。パーソナルジムでは、これらの痛みを避けるプログラムを作成できます。むしろ正しいトレーニングにより、既存痛が改善することも多いです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. 十分な休息（週2回以上の休息日）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代は回復に時間がかかります。週2回のトレーニングなら、その間に1～2日の休息日を設けるのが理想です。無理なく続けることが、怪我防止の最大のコツです。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. トレーニング後のストレッチ（10分以上）
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代では、静的ストレッチによるクールダウンが重要です。これにより、DOMS（遅延性筋肉痛）を軽減し、可動域の回復を促進できます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 継続のコツ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                継続しやすいプログラムの選び方
              </h2>
              <p className="text-gray-700 mb-6">
                40代・50代からのパーソナルジムの最大の課題は「継続」です。長期継続できるプログラムの選び方を解説します。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 週1～2回の通所頻度を選ぶ
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    週3～4回では、仕事や生活との両立が難しいです。週1～2回なら、3～6ヶ月の継続が十分可能です。毎回のトレーニング効果が高いため、少ない通所頻度でも確実な結果が出ます。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 無理のない時間帯・曜日を固定
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    毎週同じ曜日・時間帯に通うことで、習慣化しやすくなります。仕事帰りが疲れるなら朝の時間帯を、朝が苦手なら昼間を選ぶなど、生活パターンに合わせることが継続の秘訣です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 3～6ヶ月の短期契約を選ぶ
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    12ヶ月以上の長期契約より、3～6ヶ月の短期契約を複数回更新する方が、モチベーション維持がしやすいです。目標達成ごとに新しい目標を設定できるため、継続しやすくなります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. トレーナーとの相性を最優先
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代では、トレーナーとの相性が継続を大きく左右します。親身に相談できる、同年代の経験が理解できるトレーナーを選ぶことが重要です。体験時にトレーナーをしっかり見極めましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 成果の見える化を重視
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    40代・50代では、筋肉量、体脂肪率、体力測定など、複数の指標を可視化することで、モチベーション維持ができます。体重だけでなく、見た目や体力の向上を感じることが、継続の力になります。
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                関連コラム
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/column/gym-senior/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    シニア・50代からのパーソナルジム
                  </h3>
                  <p className="text-sm text-gray-600">
                    安全な始め方、健康寿命延伸のメリット。ロコモティブシンドローム対策をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/gym-nutrition/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの食事管理
                  </h3>
                  <p className="text-sm text-gray-600">
                    トレーニングと食事の組み合わせ、タンパク質摂取を解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-bodymake/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムで体が変わるまでの期間
                  </h3>
                  <p className="text-sm text-gray-600">
                    目標別タイムライン、現実的な期待値を設定。
                  </p>
                </Link>
                <Link
                  href="/column/gym-continuing/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムを続けるコツ
                  </h3>
                  <p className="text-sm text-gray-600">
                    モチベーション維持、挫折防止の実践的なコツ。
                  </p>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                あなたにぴったりのパーソナルジムを見つけましょう
              </h2>
              <p className="mb-6 max-w-2xl mx-auto text-gray-700">
                全国のパーソナルジム情報を掲載。40代・50代向けのジムも多数掲載。安全で継続しやすいジムが見つかります。
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
          </div>
        </article>
      </div>
    </Layout>
  );
}
