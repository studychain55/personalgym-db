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
      question: "50代女性がパーソナルジムを始めるのは遅すぎませんか？",
      answer: "むしろ、50代からが始め時です。パーソナルジムは加齢に伴う筋力低下や骨密度の低下に対する最適なソリューション。年を重ねるほど、専門家の指導の価値が高まります。正しいトレーニング方法で、健康寿命を延ばせます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "更年期の症状がパーソナルジムで改善しますか？",
      answer: "直接的な医学的治療ではありませんが、運動によってホルモンバランスの安定化、血流改善、気分の向上が期待できます。特に定期的な運動は自律神経を整え、ホットフラッシュや疲労感の軽減につながることが多いです。医師と相談の上で開始してください。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "骨粗しょう症予防には、どのような運動が効果的ですか？",
      answer: "重力に対する負荷運動が効果的です。スクワットやレッグプレスなどの下半身トレーニング、ダンベルを使った上半身トレーニングが骨に刺激を与え、骨密度の維持・向上につながります。パーソナルトレーナーが安全な負荷設定をします。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "猫背や姿勢の悪さは改善できますか？",
      answer: "改善可能です。背中、肩周り、体幹の筋肉を鍛えることで、自然と姿勢が改善されます。50代は姿勢のクセが強くなっているため、トレーナーの指導で正しい動作を学ぶことが重要。継続で見た目も若々しくなります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "50代は週に何回通えば効果が出ますか？",
      answer: "週2回が目安です。1回60分程度のトレーニングを週2回続ければ、3～4ヶ月で明らかな体の変化を感じられます。週1回でも効果はありますが、週2回の方が継続的な結果が期待できます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "更年期対応のパーソナルジムの選び方は？",
      answer: "更年期の悩みに理解のあるトレーナー、ホルモン変化や体の悩みについての知識がある環境を選びましょう。女性専用、女性トレーナーの在籍、更年期対策プログラムの有無などが選択基準になります。無料体験で相談してみることをお勧めします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymWomen50Page({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "50代女性のパーソナルジム" },
  ];

  const pageTitle = "50代女性のパーソナルジム｜更年期・骨密度・姿勢改善に効果的なトレーニング";
  const pageUrl = `${baseSiteUrl}/column/gym-women-50/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="50代女性がパーソナルジムで取り組むべきトレーニングを解説。更年期の症状改善、骨密度低下への対策、姿勢改善・体型維持のための運動プログラムを紹介。"
        path="/column/gym-women-50/"
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
              description: "50代女性がパーソナルジムで取り組むべきトレーニングを解説。更年期の症状改善、骨密度低下への対策、姿勢改善・体型維持のための運動プログラムを紹介。",
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
              女性向け
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              50代は人生の大きな転機。更年期による体の変化、筋力低下、骨密度の低下に直面する時期です。しかし、この時期こそパーソナルジムの出番。このガイドでは、50代女性の体の変化、更年期症状とトレーニングの関係性、骨粗しょう症予防の具体的な運動プログラム、姿勢改善エクササイズ、50代に合わせたトレーニング強度と通う頻度、ジム選びのポイントをわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 50代女性の体の変化 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                50代女性の体に起こる主な変化
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                50代の女性の体は、急速に変化します。これは自然な老化現象ですが、適切なトレーニングで多くの変化に対抗できます。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    更年期に伴うホルモン変化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    エストロゲン低下により、体脂肪の蓄積が増加、体がむくみやすくなります。また、自律神経のバランスが乱れ、ホットフラッシュ、倦怠感、イライラなどの症状が現れやすくなります。これらは運動で緩和が期待できます。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    筋肉量の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    加齢に伴い、年1％程度の筋肉量が低下します。特に下半身（太もも、ふくらはぎ）に顕著。筋肉量の低下は、基礎代謝の低下と直結し、太りやすい体へと変わっていきます。パーソナルジムでの筋トレは必須です。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    骨密度の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    閉経に伴うエストロゲン低下で、骨密度は急速に低下します。骨粗しょう症のリスクが高まり、転倒時に骨折しやすくなります。運動による骨への刺激が、骨密度維持に不可欠です。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    姿勢の悪化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    背中の筋肉が弱まり、肋骨が縮むことで自然と前かがみになります。猫背は見た目を老けさせるだけでなく、内臓圧迫や呼吸機能の低下をもたらします。背中トレーニングで改善可能です。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>50代の体は変わるもの</strong>：自然な変化ですが、運動習慣で多くの悪影響に対抗できます。パーソナルジムは、これらの変化に対する最強の防御手段です。
                </p>
              </div>
            </section>

            {/* Section 2: 更年期症状とパーソナルジム */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                更年期症状の改善にパーソナルジムが有効な理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                更年期は医学的な治療が重要ですが、運動によって多くの症状を緩和できます。パーソナルジムが特に効果的な理由を紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ホットフラッシュの軽減</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    定期的な運動は自律神経のバランスを整え、急激な血管拡張を緩和します。週2～3回のパーソナルジム通所で、ホットフラッシュの頻度・強度の軽減が期待できます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>目安</strong>：継続4～8週間で症状の軽減を感じる人が多い
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">気分の改善（抑うつ気分の軽減）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    運動により、セロトニン、エンドルフィンが分泌され、気分が向上します。また、パーソナルトレーナーとの定期的なサポートは、心理的な支えになります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>効果</strong>：運動直後から気分爽快感を感じられることが多い
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">睡眠の質向上</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    適度な運動は自律神経のメリハリをつけ、夜間の睡眠の質を向上させます。更年期の睡眠障害に悩む方には、特に効果的です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>ポイント</strong>：就寝3時間前までのトレーニングが推奨
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: 骨粗しょう症予防 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                骨粗しょう症予防の負荷トレーニング
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                骨の健康を守るには、重力に対する負荷がかかる運動が必須。パーソナルジムで実施される推奨エクササイズを紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">下半身強化プログラム</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>スクワット</strong>
                        <p className="text-gray-600">大腿骨、脛骨への直接的な負荷。週2回、10～15回×3セット程度が目安。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>レッグプレス</strong>
                        <p className="text-gray-600">スクワットより安全で、より大きな負荷をかけられます。初心者向け。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ランジ</strong>
                        <p className="text-gray-600">片脚への負荷を高め、バランス能力も向上。転倒予防効果も高い。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">上半身強化プログラム</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ダンベルプレス・フライ</strong>
                        <p className="text-gray-600">胸部、腕への負荷。前腕部の骨密度向上に効果的。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ダンベルロウ</strong>
                        <p className="text-gray-600">背中への負荷で、脊椎周辺の骨密度向上。姿勢改善にも有効。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>骨密度改善の期間</strong>：3～6ヶ月の継続で、骨密度スクリーニング検査で改善が見られることが期待できます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 姿勢改善エクササイズ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                姿勢改善・猫背対策のエクササイズ
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                50代で多い猫背。パーソナルジムで実施される姿勢改善プログラムを紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">背中トレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    猫背の原因は背中（特に広背筋、僧帽筋）の弱化。これらの筋肉を強化すると、自然と胸を張った姿勢になります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・ラットプルダウン（広背筋強化）</li>
                    <li>・シーテッドロウ（脊椎周辺筋強化）</li>
                    <li>・リバースフライ（菱形筋強化）</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">肩周り・胸部トレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    肩関節の可動域を広げ、胸部の筋肉を鍛えることで、肩が後ろに引かれるようになり、姿勢が改善されます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・ショルダープレス（肩部強化）</li>
                    <li>・チェストプレス（胸部強化）</li>
                    <li>・肩甲骨の柔軟性向上エクササイズ</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">体幹トレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体幹（腹筋、背筋）の強化は、姿勢維持の基礎。良い姿勢を楽に保つために必須です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・プランク（静的体幹トレーニング）</li>
                    <li>・バックエクステンション（脊柱起立筋強化）</li>
                    <li>・腹部トレーニング（ボトムアップの姿勢維持に必要）</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: トレーニング強度と頻度 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                50代女性に合わせたトレーニング強度と頻度
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                50代向けのパーソナルジムは、20～30代とは異なるアプローチが必要です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">推奨トレーニング頻度</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>週2回（推奨）</strong>
                      <p>1回60分、月8回程度のトレーニングで、確実な効果が期待できます。仕事と生活のバランスも取りやすい。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>週1回</strong>
                      <p>継続できる場合は効果あり。2回より結果が出るまで時間がかかります（3～6ヶ月）。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>週3回以上</strong>
                      <p>50代未経験者は過度。既に運動習慣がある場合のみ推奨。回復時間を大切にしましょう。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">トレーニング強度</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    50代は「無理のない範囲で継続」が鉄則。強度よりも、正しいフォームと継続性を優先します。
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-700">✓</span>
                      <div>
                        <strong>ウォームアップ</strong>：10～15分の軽い有酸素運動とストレッチ
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-700">✓</span>
                      <div>
                        <strong>メイン運動</strong>：30～40分。12～15回で限界が来る負荷（初心者は10回程度）
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-700">✓</span>
                      <div>
                        <strong>クールダウン</strong>：10～15分のストレッチ・瞑想
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>怪我予防が最優先</strong>：50代は回復が遅くなります。無理は禁物。トレーナーに「今日の体調」を常に伝え、調整してもらうことが大切です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: ジム選びのポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                50代女性のジム選びのポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムの質はジム選びで決まります。50代女性向けのジム選びチェックリストを紹介します。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    更年期の知識・対応能力
                  </h4>
                  <p className="text-gray-700 text-sm">
                    トレーナーが更年期に関する知識を持ち、症状に対応したプログラムが組める環境か確認。ホットフラッシュへの対応（温度管理、こまめな休憩など）が重要。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    女性スタッフ・女性トレーナーの在籍
                  </h4>
                  <p className="text-gray-700 text-sm">
                    女性トレーナーなら、体の悩みや更年期の話をしやすい環境。女性専用エリアがあると、プライバシーも確保できます。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    怪我予防・リハビリ対応
                  </h4>
                  <p className="text-gray-700 text-sm">
                    既往症や関節痛がある場合、個別対応が可能か確認。理学療法の知識があるトレーナーが在籍していると安心です。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    栄養管理・食事指導
                  </h4>
                  <p className="text-gray-700 text-sm">
                    50代は単なるダイエットではなく、栄養バランスと更年期対応が重要。管理栄養士やトレーナーによる食事指導があると効果的。
                  </p>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h4 className="font-bold text-pink-900 mb-2">
                    体験レッスンの質
                  </h4>
                  <p className="text-gray-700 text-sm">
                    無料体験で、加齢や更年期の悩みにどう向き合うか、丁寧に聞いてくれるか確認。長期的にサポートしてくれるジムを選ぶことが成功のカギです。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>複数ジム比較は必須</strong>：50代から始めるからこそ、自分に合ったジムを選ぶことが継続のコツ。最低3～5社の無料体験を受けてから決めることをお勧めします。
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                あなたに合ったパーソナルジムを見つけましょう
              </h2>
              <p className="text-gray-700 mb-6">
                50代からのパーソナルジムは、人生の質を大きく変えます。更年期の悩み、骨密度低下、姿勢改善に対応したジムが、あなたの健康寿命を延ばします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/all/"
                  className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold rounded-lg px-6 py-3 hover:bg-blue-800 transition-all"
                >
                  全国のパーソナルジムから探す
                </Link>
                <Link
                  href="/column/women-gym/"
                  className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 font-bold rounded-lg px-6 py-3 hover:bg-gray-300 transition-all"
                >
                  女性向けジム情報を見る
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
