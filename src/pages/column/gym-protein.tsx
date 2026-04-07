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
      question: "プロテインとは何ですか？",
      answer: "プロテインは、タンパク質を効率的に摂取するための栄養補助食品です。一般食だけでは足りない栄養を補うために開発されました。粉を水や牛乳に混ぜて飲む液体タイプが一般的で、各種ホエイ・ソイ・カゼイン等の種類があります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ホエイプロテインとソイプロテインの違いは？",
      answer: "ホエイは動物性で吸収が早く、筋力増加に向く。ソイは植物性で吸収がゆっくりで、ダイエット向き。カゼインは牛乳由来でホエイより吸収が遅い。目的に応じて選び分けることが重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "プロテインを飲むのに最適なタイミングは？",
      answer: "トレーニング直後30分以内の摂取が最も効果的（ゴールデンタイム）。その他にも朝食時、就寝前など、タンパク質が不足しやすい時間帯の摂取も重要です。1日3回の食事だけでは、十分なタンパク質摂取が困難な場合、プロテインが活躍します。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "1日のプロテイン摂取量の目安は？",
      answer: "体重1kg当たり1.6～2.2g のタンパク質が目安です（体重60kgなら96～132g）。トレーニング日でも3～4杯のプロテインドリンク+食事で対応できます。過剰摂取は肝臓負担になるため注意が必要です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "プロテインだけで体が変わりますか？",
      answer: "いいえ。プロテインはタンパク質補給の道具に過ぎず、規則正しい食生活・適切なトレーニング・十分な睡眠の3つが揃わなければ、効果は期待できません。パーソナルジムでは、この3つのバランスを指導します。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "プロテイン選びで失敗しないコツは？",
      answer: "味・値段・成分（含有率）・添加物を確認してから購入することが重要です。また、自分の目的（ダイエット・筋力増加など）に合った種類を選ぶことで、より効果的になります。パーソナルジムのトレーナーに相談することをお勧めします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymProteinPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "プロテインの選び方と飲み方" },
  ];

  const pageTitle = "プロテインの選び方と飲み方｜パーソナルジムで教わる正しい活用方法";
  const pageUrl = `${baseSiteUrl}/column/gym-protein/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="プロテインの種類・選び方・飲むタイミングを解説。ホエイ・ソイ・カゼインの違い、目的別のプロテイン選び、パーソナルトレーナーが教えるプロテインの正しい飲み方を紹介。"
        path="/column/gym-protein/"
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
              description: "プロテインの種類・選び方・飲むタイミングを解説。ホエイ・ソイ・カゼインの違い、目的別のプロテイン選び、パーソナルトレーナーが教えるプロテインの正しい飲み方を紹介。",
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
              栄養管理
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでトレーニングを開始すると、多くのトレーナーから「プロテインを飲みましょう」とアドバイスされます。しかし、プロテインとは何か、どの種類を選べば良いのか、いつ飲むのが最適なのかが分からない人は多いでしょう。プロテインは、適切に活用すれば、トレーニング効果を大幅に高める重要なツールです。逆に、誤った使い方をすれば、効果が半減してしまいます。このガイドでは、プロテインの基礎知識から、ホエイ・ソイ・カゼインの違い、目的別の選び方、飲むタイミング、1日の適切な摂取量まで、パーソナルジムのトレーナーが教える正しいプロテイン活用法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: プロテインとは */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                プロテインとは（食事との違い・必要性）
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                プロテインの基礎を理解することが、正しい活用の第一歩です。単なる「筋力増加の栄養」ではなく、効率的なタンパク質補給の手段であることを認識しましょう。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">プロテインの定義</h3>
                  <p className="text-gray-700 text-sm">
                    プロテインは、タンパク質を効率的に摂取するための栄養補助食品です。牛乳・卵・大豆などを原材料とし、不要な脂肪・炭水化物を除去して、高濃度のタンパク質だけを抽出した製品です。粉を水や牛乳に混ぜて飲む液体タイプが最も一般的です。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">食事とプロテインの違い</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    食事からタンパク質を摂取する場合、余分な脂肪・炭水化物も一緒に摂取されます。一方、プロテインはタンパク質を効率的に摂取できるため、カロリー計算が容易で、タンパク質の含有率が高いのが特徴です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <p className="font-bold text-gray-900 mb-2">比較表</p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left p-2">項目</th>
                          <th className="text-center p-2">食事（鶏胸肉）</th>
                          <th className="text-center p-2">プロテイン</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="p-2">100gあたりのタンパク質</td>
                          <td className="text-center p-2">約22g</td>
                          <td className="text-center p-2">約20g（1杯30g）</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-2">カロリー（100g）</td>
                          <td className="text-center p-2">約165kcal</td>
                          <td className="text-center p-2">約110kcal（1杯）</td>
                        </tr>
                        <tr>
                          <td className="p-2">脂質含有量</td>
                          <td className="text-center p-2">約8g</td>
                          <td className="text-center p-2">約2g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">プロテインが必要な理由</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムでトレーニングを継続すると、筋肉の合成に大量のタンパク質が必要になります。通常の食事だけでは、必要なタンパク質量を摂取することが困難です。プロテインを活用することで、効率的かつ無理なく目標の摂取量に達することができます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>効率性</strong>
                        <p className="text-gray-600">食事と異なり、吸収が早く、摂取タイミングの調整が容易</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>携帯性</strong>
                        <p className="text-gray-600">職場・学校・外出先で手軽に摂取可能</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>経済性</strong>
                        <p className="text-gray-600">食事でのタンパク質摂取より割安で、栄養管理が容易</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: プロテインの種類 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ホエイ・ソイ・カゼインプロテインの違い
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                プロテインには複数の種類があり、原材料と特性が異なります。目的に応じた選択が、効果を大きく左右します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">プロテイン種類1：ホエイプロテイン</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    牛乳由来の動物性プロテインで、パーソナルジムで最も推奨される種類です。吸収速度が速く、トレーニング後の筋肉合成に最適です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>吸収速度</strong>
                        <p className="text-gray-600">約30分～1時間で吸収。トレーニング直後のゴールデンタイムに活躍</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>BCAA含量</strong>
                        <p className="text-gray-600">筋肉合成に必要なBCAA（分岐鎖アミノ酸）が豊富</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>味・飲みやすさ</strong>
                        <p className="text-gray-600">多種多様なフレーバーがあり、飲みやすい</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>最適な目的</strong>
                        <p className="text-gray-600">筋力増加・バルクアップ・トレーニング後の回復</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900">推奨される人</p>
                    <p className="text-gray-700 mt-1">筋力増加を目的とするすべてのトレーニング実践者。特に、本気で体を変えたい人におすすめ</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">プロテイン種類2：ソイプロテイン</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    大豆由来の植物性プロテインで、ダイエット向けとして人気が高い種類です。吸収速度がゆっくりで、満腹感が持続しやすいのが特徴です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>吸収速度</strong>
                        <p className="text-gray-600">約2～3時間でゆっくり吸収。満腹感が長く続く</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>イソフラボン含量</strong>
                        <p className="text-gray-600">ホルモンバランス調整・美肌効果。女性に人気</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>カロリー</strong>
                        <p className="text-gray-600">ホエイより低カロリー。ダイエット向け</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>最適な目的</strong>
                        <p className="text-gray-600">ダイエット・脂肪燃焼・朝食時のタンパク質補給</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900">推奨される人</p>
                    <p className="text-gray-700 mt-1">ダイエット目的の方、女性、動物性を避けたい方。特に、継続的に摂取したい人向け</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">プロテイン種類3：カゼインプロテイン</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    牛乳由来の動物性プロテインで、ホエイより吸収が遅い特性があります。就寝前の摂取に適しており、夜間の筋肉合成をサポートします。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>吸収速度</strong>
                        <p className="text-gray-600">約4～7時間かけてゆっくり吸収。夜間の栄養供給に最適</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>満腹感</strong>
                        <p className="text-gray-600">長く続くため、就寝前の空腹感対策に最適</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>価格</strong>
                        <p className="text-gray-600">3種類の中では最も価格帯が高い傾向</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>最適な目的</strong>
                        <p className="text-gray-600">就寝前のタンパク質補給・夜間の筋肉合成・空腹感対策</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900">推奨される人</p>
                    <p className="text-gray-700 mt-1">特に筋力増加を目指す方。就寝前摂取で、夜間の筋肉合成を促進したい方向け</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>複合摂取がおすすめ</strong>：目的に応じて、ホエイ・ソイ・カゼインを使い分けることで、より効果的な体づくりが実現できます。パーソナルジムのトレーナーに相談し、自分の目的に最適な組み合わせを見つけましょう。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: 目的別の選び方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目的別プロテインの選び方（ダイエット・筋肥大）
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                同じプロテインでも、使い方や選び方を工夫することで、目的に応じた効果が期待できます。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">選び方1：ダイエット目的</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ダイエット目的では、低カロリーで満腹感が続くソイプロテインが最適です。併せて、摂取カロリー管理が重要になります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-2">
                    <div>
                      <p className="font-bold text-gray-900">推奨プロテイン</p>
                      <p className="text-gray-700">ソイプロテイン（女性向け）、またはホエイのアイソレートタイプ（低脂質）</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">選ぶポイント</p>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>・タンパク質含有率が高い（20g以上/1杯）</li>
                        <li>・脂質が低い（2g以下/1杯）</li>
                        <li>・糖質が低い（5g以下/1杯）</li>
                        <li>・満腹感が得られる</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">摂取方法</p>
                      <p className="text-gray-700">朝食時（1杯）と夜の食事前（1杯）、合計1～2杯が目安</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">選び方2：筋肥大・バルクアップ目的</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    筋肥大目的では、吸収が速く、BCAA含量が高いホエイプロテインが最適です。トレーニング直後のゴールデンタイムに摂取することが重要です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-2">
                    <div>
                      <p className="font-bold text-gray-900">推奨プロテイン</p>
                      <p className="text-gray-700">ホエイプロテイン（コンセントレート・アイソレート）</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">選ぶポイント</p>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>・タンパク質含有率が高い（20g以上/1杯）</li>
                        <li>・BCAA含量が高い</li>
                        <li>・吸収速度が速い</li>
                        <li>・飲みやすい味</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">摂取方法</p>
                      <p className="text-gray-700">トレーニング直後30分以内（1～2杯）、朝食時（1杯）、計2～3杯が目安</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>同時に重要なこと</strong>：プロテイン選びと同じくらい重要なのが、食生活全体の栄養バランスとトレーニング強度です。プロテインだけに頼らず、パーソナルジムのトレーナーと相談しながら、総合的なアプローチを心がけましょう。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 飲むタイミング */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                飲むタイミング（トレーニング前後・就寝前）
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                プロテインの効果は、選び方と同じくらい「飲むタイミング」が重要です。最適なタイミングで摂取することで、効果が大幅に高まります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">タイミング1：トレーニング直後（ゴールデンタイム）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    最も効果的なタイミングが、トレーニング直後30分以内です。この時間帯の摂取を「ゴールデンタイム」と呼びます。筋肉が栄養を吸収しやすい状態になっているため、プロテイン摂取が最大の効果を発揮します。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">詳細</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・タイミング：トレーニング直後30分以内（理想は15分以内）</li>
                      <li>・量：20～30g（1～1.5杯）</li>
                      <li>・種類：ホエイプロテイン（吸収が速いため）</li>
                      <li>・効果：筋肉合成の促進、トレーニング疲労の回復</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">タイミング2：就寝前</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    就寝前のプロテイン摂取も重要です。寝ている間は、成長ホルモンが多く分泌され、筋肉合成が活発になります。この時間帯に栄養が不足していると、筋肉合成の機会を失ってしまいます。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">詳細</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・タイミング：就寝の30分～1時間前</li>
                      <li>・量：20～30g（1～1.5杯）</li>
                      <li>・種類：カゼインプロテイン、またはソイプロテイン</li>
                      <li>・効果：夜間の筋肉合成促進、朝の空腹感軽減</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">タイミング3：朝食時</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    朝食時のプロテイン摂取は、1日を通したタンパク質摂取量のバランスを取る上で重要です。特に、朝食を抜く習慣がある人にとっては、必須の栄養補給タイミングです。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">詳細</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・タイミング：朝食の一部として</li>
                      <li>・量：20～30g（1～1.5杯）</li>
                      <li>・種類：ホエイまたはソイプロテイン</li>
                      <li>・効果：1日のタンパク質摂取量の底上げ、朝の栄養補給</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>タイミング全般の注意点</strong>：「ゴールデンタイム」は確かに重要ですが、全体的な1日のタンパク質摂取量が十分であることが最も大切です。タイミングにこだわるあまり、1日の総摂取量が不足してしまっては本末転倒です。バランスよく摂取することを心がけましょう。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 1日の摂取量 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1日の適切な摂取量の目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                プロテイン摂取量は、個人の体重・目的・トレーニング強度によって異なります。正確な摂取量を計算することが、効果的な体づくりの基盤になります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">全体的なタンパク質摂取量の目安</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    基本となるのは、体重1kg当たりのタンパク質摂取量です。目的によって、推奨量が異なります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left p-2">目的</th>
                          <th className="text-center p-2">体重1kg当たり</th>
                          <th className="text-center p-2">体重60kgの場合</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="p-2">一般的な健康維持</td>
                          <td className="text-center p-2">0.8g</td>
                          <td className="text-center p-2">48g/日</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-2">軽いトレーニング</td>
                          <td className="text-center p-2">1.2g</td>
                          <td className="text-center p-2">72g/日</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-2">筋力増加（推奨）</td>
                          <td className="text-center p-2">1.6～2.2g</td>
                          <td className="text-center p-2">96～132g/日</td>
                        </tr>
                        <tr>
                          <td className="p-2">競技アスリート</td>
                          <td className="text-center p-2">2.2g以上</td>
                          <td className="text-center p-2">132g以上/日</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">プロテイン摂取量の実例</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体重60kg、筋力増加を目標とする人の場合、1日96～132g のタンパク質が必要です。食事とプロテインを組み合わせての摂取例を示します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-3">
                    <div>
                      <p className="font-bold text-gray-900">食事内容例</p>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>・朝食：卵2個+ご飯（約12g）</li>
                        <li>・昼食：鶏胸肉150g（約30g）</li>
                        <li>・夜食：牛肉100g（約20g）</li>
                        <li>・食事合計：約62g</li>
                      </ul>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <p className="font-bold text-gray-900">プロテイン摂取例</p>
                      <ul className="text-gray-700 space-y-1 mt-1">
                        <li>・朝食時：ホエイプロテイン1杯（20g）</li>
                        <li>・トレーニング直後：ホエイプロテイン1.5杯（30g）</li>
                        <li>・就寝前：カゼインプロテイン1杯（20g）</li>
                        <li>・プロテイン合計：約70g</li>
                      </ul>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <p className="font-bold text-gray-900">1日合計</p>
                      <p className="text-gray-700 mt-1">約132g（目安を満たす）</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">摂取量の注意点</h3>
                  <p className="text-gray-700 text-sm">
                    過剰なプロテイン摂取は、肝臓・腎臓に負担をかける可能性があります。一般的には、1日の総タンパク質摂取量が体重×2.2g を超えることは推奨されていません。また、十分な水分補給と定期的な健康診断を心がけましょう。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>目安は参考値</strong>：これらの数値は一般的な目安です。個人差が大きいため、パーソナルジムのトレーナーに相談し、自分に最適な摂取量を決めることが重要です。
                </p>
              </div>
            </section>

            {/* Section 6: プロテインだけでは痩せない */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                プロテインだけでは痩せられない理由
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                よくある誤解として「プロテインを飲めば痩せる」という考えがあります。しかし、これは大きな間違いです。プロテインは、あくまで補助的な栄養補給に過ぎません。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">誤解1：プロテインでカロリー削減</h3>
                  <p className="text-gray-700 text-sm">
                    確かに、プロテインはタンパク質に特化した製品であり、脂質を含まない製品が多いため、「低カロリー = 痩せる」と思う人は多いです。しかし、タンパク質は1g当たり4kcal のカロリーを含みます。過剰摂取すれば、カロリー過剰になり、ダイエット失敗につながります。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">誤解2：プロテイン+食事制限=ダイエット成功</h3>
                  <p className="text-gray-700 text-sm">
                    プロテイン摂取と食事制限だけでは、持続的なダイエットは困難です。極度の食事制限は、筋肉量の低下を招き、基礎代謝が低下して、リバウンドのリスクが高まります。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ダイエット成功の3要素</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    プロテインを含む「正しい食事管理」「適切なトレーニング」「十分な睡眠」の3要素が揃って初めて、ダイエットは成功します。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <p className="font-bold text-blue-900 mb-1">要素1：正しい食事管理</p>
                      <p className="text-gray-700">総カロリーの管理、栄養バランス（タンパク質・炭水化物・脂質）の調整。プロテインはあくまで補助手段</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <p className="font-bold text-green-900 mb-1">要素2：適切なトレーニング</p>
                      <p className="text-gray-700">有酸素運動と筋力運動の組み合わせ。パーソナルジムでの指導が最適</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded text-sm">
                      <p className="font-bold text-yellow-900 mb-1">要素3：十分な睡眠</p>
                      <p className="text-gray-700">7時間以上の質の良い睡眠。成長ホルモン分泌を促進し、脂肪燃焼効率を高める</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>重要な認識</strong>：プロテインは「魔法の薬」ではなく、あくまで「栄養補助食品」です。パーソナルジムでのトレーニングと食事指導があってこそ、プロテインの効果が生かされます。
                  </p>
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
              パーソナルジムで正しいプロテイン活用を学ぶ
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              プロテイン選びと摂取方法は、パーソナルジムのトレーナーに相談することで、より効果的になります。自分の目的に合わせた最適なプログラムを見つけましょう。
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
