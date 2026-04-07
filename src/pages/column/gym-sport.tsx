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
      question: "パーソナルジムでスポーツパフォーマンスを上げるメリットは？",
      answer: "パーソナルジムでは、個別の競技特性に合わせたトレーニングが可能です。一般的なフィットネスジムでは得られない、競技力向上に特化した指導が受けられます。怪我予防・リハビリにも対応でき、スポーツ人生の延伸につながります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "ゴルフのパフォーマンス向上に必要な筋力は？",
      answer: "ゴルフは、体幹・肩周り・下半身の回転力が重要です。特に、体幹の回転パワーと下半身の安定性（スクワット能力）がスイングスピード・飛距離に直結します。パーソナルジムでは、これらを個別に鍛える専門的なプログラムが可能です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "テニス・卓球などの素早い動きに必要な力は？",
      answer: "素早い動きには、爆発力（瞬発力）と方向転換能力が必須です。パーソナルジムでは、プライオメトリクス（ジャンプトレーニング）や方向転換運動を組み入れ、競技特性に合わせた敏捷性を高めます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "オフシーズンと競技シーズンで取り組み方は変わりますか？",
      answer: "大きく変わります。オフシーズンは筋力・パワー構築に、シーズン中は筋力維持と怪我予防に重点を置きます。パーソナルジムではこの切り替えに対応し、シーズン通して最高のパフォーマンスを発揮できるようサポートします。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "運動能力が低い人でも競技力は向上しますか？",
      answer: "はい、向上します。パーソナルジムはトレーニング経験がない人にも対応しています。現在の能力から段階的に筋力・パワーを高めることで、確実に競技力が向上します。基礎から応用まで、個別に対応します。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "アスリート対応パーソナルジムの選び方は？",
      answer: "競技スポーツの経験がある、スポーツ栄養学の知識がある、怪我予防・リハビリに対応できるトレーナーがいるかを確認しましょう。また、競技別の専門的なプログラムを持っているジムが理想的です。体験時に具体的なプログラム提案を受けることをお勧めします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymSportPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "スポーツパフォーマンス向上のためのパーソナルジム活用法" },
  ];

  const pageTitle = "スポーツパフォーマンス向上のためのパーソナルジム活用法｜競技力アップのコツ";
  const pageUrl = `${baseSiteUrl}/column/gym-sport/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="趣味や競技のパフォーマンスをパーソナルジムで向上させる方法を解説。ゴルフ・テニス・サッカー・水泳など競技別に必要な筋力・柔軟性・体幹トレーニングのポイントを紹介。"
        path="/column/gym-sport/"
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
              description: "趣味や競技のパフォーマンスをパーソナルジムで向上させる方法を解説。ゴルフ・テニス・サッカー・水泳など競技別に必要な筋力・柔軟性・体幹トレーニングのポイントを紹介。",
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
              スポーツパフォーマンス
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              「ゴルフのスイング距離を伸ばしたい」「テニスでより速い動きを実現したい」「サッカーの競技力をもう一段階上げたい」「年を重ねても趣味のスポーツを続けたい」このような目標をお持ちですか？趣味のスポーツであれ、本格的な競技であれ、パーソナルジムでのトレーニングは、競技力向上に大きく貢献します。このガイドでは、パーソナルジムでスポーツパフォーマンスを上げるメリット、競技別に必要な身体能力の違い、体幹・柔軟性・爆発力トレーニングの組み合わせ、怪我予防と疲労回復のアプローチ、オフシーズンと競技シーズンでの取り組み方、アスリート対応パーソナルジムの選び方をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: スポーツパフォーマンス向上のメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムでスポーツパフォーマンスを上げるメリット
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムは、単なる筋力トレーニングの場ではなく、スポーツパフォーマンス向上の専門的なトレーニング施設です。競技特性に合わせた指導が、確実な成果をもたらします。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    メリット1：競技特性に合わせた専門的な指導
                  </h4>
                  <p className="text-gray-700 text-sm">
                    一般的なフィットネスジムでは、万人向けのトレーニングしか提供できません。パーソナルジムは、ゴルフ・テニス・サッカー・水泳など、各競技の特性を理解したトレーナーが、競技力向上に特化したプログラムを設計します。競技に不要な筋肉を鍛えず、必要な能力に集中できます。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    メリット2：怪我予防・リハビリ対応
                  </h4>
                  <p className="text-gray-700 text-sm">
                    競技を続けるためには、怪我の予防が最も重要です。パーソナルジムでは、過去の怪我・現在の痛みに対応したトレーニングが可能です。また、リハビリ資格を持つトレーナーなら、医学的に根拠のある怪我予防プログラムが提供できます。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    メリット3：スポーツ栄養学に基づいた食事管理
                  </h4>
                  <p className="text-gray-700 text-sm">
                    競技力向上には、栄養管理が不可欠です。パーソナルジムの管理栄養士から、個別の食事指導を受けることで、トレーニング効果が大幅に向上します。特に、競技シーズン前の体造り、試合前の栄養補給のタイミングなど、スポーツ栄養学の知識が活躍します。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    メリット4：モチベーション維持と進捗管理
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルトレーナーは、単なる指導者ではなく、競技力向上のパートナーです。定期的なミーティングで、進捗状況を可視化し、次のステップを明確にします。モチベーション維持が容易になり、長期的な成果につながります。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>プロ・アマ関わらず効果あり</strong>：パーソナルジムの専門的サポートは、プロアスリートはもちろん、趣味のスポーツを楽しむアマチュアにも大きな効果をもたらします。年齢や経験に関わらず、競技力向上は実現可能です。
                </p>
              </div>
            </section>

            {/* Section 2: 競技別に必要な身体能力の違い */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                競技別に必要な身体能力の違い
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                スポーツは、競技によって必要な身体能力が大きく異なります。パーソナルジムでは、この違いを認識し、競技特性に合わせたトレーニングを設計します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">競技別ガイド1：ゴルフ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ゴルフは、スイングスピード・飛距離・正確性が重要です。必要な筋力：
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>体幹の回転パワー</strong>
                        <p className="text-gray-600">ドライバーの飛距離に直結。下半身の安定性を保ちながら、胴体を素早く回転させるパワー</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>下半身の安定性・パワー</strong>
                        <p className="text-gray-600">スクワット・レッグプレスで下半身を強化。安定したスイングベースを実現</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>肩周り・背中の柔軟性</strong>
                        <p className="text-gray-600">バックスイング時の可動域拡大。スイングアークが大きくなり、パワー向上につながる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>手首・肘の安定性</strong>
                        <p className="text-gray-600">怪我予防。テニス肘の予防、インパクト時の安定性向上</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">競技別ガイド2：テニス・卓球</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    素早い動きと方向転換が重要です。必要な筋力：
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>爆発力（瞬発力）</strong>
                        <p className="text-gray-600">プライオメトリクス（ジャンプトレーニング）で実現。素早いサーブ・レシーブ</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>敏捷性・方向転換能力</strong>
                        <p className="text-gray-600">左右への素早い動き、急ブレーキ・急加速。ラテラルムーブメントの強化</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>肩周りの爆発力</strong>
                        <p className="text-gray-600">サーブのスピード向上。肩の動的安定性と瞬発力</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>下半身のバランス・柔軟性</strong>
                        <p className="text-gray-600">素早い動きでの怪我予防。足首・膝の安定性向上</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">競技別ガイド3：サッカー・フットサル</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    加速・減速・方向転換が頻繁です。必要な筋力：
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>下半身全体の爆発力</strong>
                        <p className="text-gray-600">スプリント能力の向上。スクワット・ジャンプトレーニングで実現</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>体幹の安定性</strong>
                        <p className="text-gray-600">ボール保持時の身体安定性。相手選手との競り合いでの安定性</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>足関節・膝の安定性</strong>
                        <p className="text-gray-600">怪我予防。アンクルスタビリティの強化</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>持久力</strong>
                        <p className="text-gray-600">90分間のパフォーマンス維持。有酸素能力の向上</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">競技別ガイド4：水泳</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    肩周りのパワーと全身の調和が重要です。必要な筋力：
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>肩周りの爆発力・柔軟性</strong>
                        <p className="text-gray-600">泳ぐスピード向上。肩関節の可動域拡大</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>体幹の安定性</strong>
                        <p className="text-gray-600">水中での姿勢維持。効率的な泳ぎの実現</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>持久力・無酸素パワー</strong>
                        <p className="text-gray-600">スプリント区間でのパワー、長距離での持久力</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>柔軟性全般</strong>
                        <p className="text-gray-600">肩・腰・足首など、全身の可動域拡大。怪我予防</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>競技特性の理解が重要</strong>：パーソナルジムを選ぶ際には、特定の競技に関する知識と実績を持つジムを選ぶことが、成功の鍵になります。
                </p>
              </div>
            </section>

            {/* Section 3: 体幹・柔軟性・爆発力トレーニング */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体幹・柔軟性・爆発力トレーニングの組み合わせ
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                スポーツパフォーマンス向上には、3つの要素のバランスが重要です。パーソナルジムでは、これら3つを統合的に強化します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">要素1：体幹の安定性強化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体幹は、すべての運動の基盤です。体幹が安定していないと、腕・脚のパワーを有効に活用できません。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>体幹トレーニング例</strong>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>・プランク：静的安定性</li>
                      <li>・デッドバグ：対角線運動での安定性</li>
                      <li>・サイドプランク：横方向の安定性</li>
                      <li>・ローテーション系：回転力と安定性の組み合わせ</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    これらを週2回以上、継続的に行うことで、3～4ヶ月で著しく安定性が向上します。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">要素2：柔軟性（可動域）の拡大</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    可動域が広いほど、大きなパワーを発揮でき、怪我のリスクが低下します。パーソナルジムでは、静的・動的ストレッチを組み合わせます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>柔軟性向上プログラム</strong>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>・動的ストレッチ（ウォームアップ時）：運動前の準備</li>
                      <li>・静的ストレッチ（クールダウン時）：回復と可動域拡大</li>
                      <li>・PNFストレッチ：より効率的な柔軟性向上</li>
                      <li>・フォームローラー：筋膜リリース</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    週3～4回のストレッチで、6～8週間で明らかな可動域拡大を実感できます。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">要素3：爆発力（プライオメトリクス）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    爆発力は、短時間で大きなパワーを発揮する能力です。素早い動き・ジャンプ・スプリントに直結します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>プライオメトリクス例</strong>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      <li>・バウンディング：連続ジャンプでの爆発力</li>
                      <li>・メディシンボール投げ：上半身の爆発力</li>
                      <li>・ボックスジャンプ：下半身のパワー</li>
                      <li>・素早い方向転換：敏捷性と爆発力</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    高強度のため、週2回程度で十分。基礎筋力がある程度ついた段階で導入されます。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">3要素を統合したプログラム例（1ヶ月）</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">週1セッション（例：月曜）</p>
                      <p className="text-gray-700 mt-1">・動的ストレッチ10分 → スクワット・デッドリフト（体幹・下半身筋力）30分 → プライオメトリクス（ジャンプ）10分 → 静的ストレッチ10分</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">週2セッション（例：水曜）</p>
                      <p className="text-gray-700 mt-1">・動的ストレッチ10分 → ベンチプレス・ラットプル（上半身筋力）25分 → メディシンボール投げ（上半身爆発力）10分 → 柔軟性トレーニング15分</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">週3セッション（例：金曜）</p>
                      <p className="text-gray-700 mt-1">・動的ストレッチ10分 → コアエクササイズ（体幹）15分 → 競技特性に合わせたカスタムトレーニング30分 → 柔軟性トレーニング15分</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>相乗効果</strong>：体幹が安定した状態で、柔軟性が高く、爆発力がある。この3つがそろえば、スポーツパフォーマンスは劇的に向上します。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 怪我予防と疲労回復 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                怪我予防と疲労回復のアプローチ
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                スポーツを長く続けるためには、怪我予防が最も重要です。パーソナルジムは、科学的根拠に基づいた怪我予防プログラムを提供します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">怪我予防1：バランス強化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    不安定な状態でのトレーニング（バランスボール、片脚スクワットなど）により、微細な筋肉が強化され、怪我のリスクが低下します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・バランスボード上でのスクワット</li>
                    <li>・片脚デッドリフト</li>
                    <li>・バランスボール上でのプランク</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">怪我予防2：関節安定性の強化</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    特に、スポーツで負荷がかかりやすい関節（肩・膝・足首）の安定性を強化します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・肩：ショルダースタビリティエクササイズ</li>
                    <li>・膝：クアッドセット・ハムストリング強化</li>
                    <li>・足首：アンクルスタビリティトレーニング</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">怪我予防3：既往症への対応</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    過去に怪我したことのある部位は、反復的な負荷で再発するリスクがあります。リハビリ知識を持つトレーナーなら、この部位を強化しながら怪我予防できます。
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                    <p className="text-gray-700 text-sm">
                      <strong>例</strong>：過去に肩を痛めた野球選手の場合、肩周りの深層筋を優先的に強化し、投球フォームも矯正します。
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">疲労回復1：アクティブリカバリー</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    競技後の適切なリカバリーが、次のパフォーマンスを左右します。パーソナルジムでは、科学的なリカバリープログラムを提供します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・軽いストレッチ・マッサージ（24時間以内）</li>
                    <li>・翌日の軽い運動（40～50%の強度）</li>
                    <li>・アイシング・温浴の使い分け</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">疲労回復2：栄養補給のタイミング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    運動直後のタンパク質・糖質補給が、筋肉の修復と疲労回復を加速させます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>推奨タイミング</strong>
                    <p className="mt-2 text-gray-700">運動終了後30～60分以内に、タンパク質20～30g + 糖質40～50g（例：バナナ1本+プロテインドリンク）</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">疲労回復3：睡眠・休息の重要性</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    筋肉の成長と疲労回復は、主に睡眠中に起こります。パーソナルトレーナーは、睡眠の質向上についてもアドバイスします。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・毎日同じ時刻に就寝する習慣</li>
                    <li>・寝る1時間前のブルーライト遮断</li>
                    <li>・目標睡眠時間：8時間以上</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>予防の哲学</strong>：「怪我してから治す」のではなく、「怪我を予防する」というアプローチが、スポーツ人生の延伸につながります。
                </p>
              </div>
            </section>

            {/* Section 5: オフシーズンと競技シーズンでの取り組み */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                オフシーズンと競技シーズンでの取り組み方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                スポーツパフォーマンス向上には、シーズンに応じた戦略的なトレーニング計画が重要です。パーソナルジムは、この計画立案と実行を支援します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">オフシーズン戦略：筋力・パワーの構築</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    競技から完全に離れる時期は、筋力・パワーの大幅な向上を目指します。高強度のウェイトトレーニングが中心です。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-1">トレーニング内容</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>・高重量ウェイトトレーニング（80～90%1RM）</li>
                        <li>・プライオメトリクス（週2回以上）</li>
                        <li>・柔軟性トレーニング（毎日）</li>
                        <li>・頻度：週4～5回</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-gray-700 text-sm">
                        <strong>目標</strong>：オフシーズン4～6ヶ月で、筋力を15～20%向上させ、競技シーズンでの高いパフォーマンスを実現する基盤を作る。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">競技シーズン戦略：維持と怪我予防</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    シーズン中は、獲得した筋力を維持しながら、競技による疲労・怪我を予防します。トレーニング強度は下げられます。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900 mb-1">トレーニング内容</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>・中程度のウェイトトレーニング（60～70%1RM）</li>
                        <li>・怪我予防プログラム（週3回以上）</li>
                        <li>・疲労回復・ストレッチ（毎日）</li>
                        <li>・頻度：週2～3回（軽めのセッション）</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-gray-700 text-sm">
                        <strong>目標</strong>：オフシーズンで獲得した筋力を95%以上維持しながら、競技での怪我を予防する。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">試合直前の調整</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    試合1～2週間前は、トレーニング量を大幅に削減し、身体をリセット（テーパリング）させます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・トレーニング強度：低強度（40～50%1RM）</li>
                    <li>・トレーニング量：通常の30～40%</li>
                    <li>・重点：軽いストレッチ・柔軟性</li>
                    <li>・栄養補給：試合本番の準備</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">年間計画の例（ゴルフ）</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">1月～3月：オフシーズン</p>
                      <p className="text-gray-700 mt-1">高強度ウェイトトレーニング。飛距離・回転パワー向上に集中</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">4月：準備期</p>
                      <p className="text-gray-700 mt-1">オフシーズン成果の維持。競技スキルへの移行</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">5月～10月：競技シーズン</p>
                      <p className="text-gray-700 mt-1">週2回のメンテナンストレーニング。怪我予防・疲労回復</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-900">11月～12月：オフシーズン</p>
                      <p className="text-gray-700 mt-1">完全なリセット。オフシーズンと同じ高強度トレーニング</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>長期的視点</strong>：オフシーズンの効率的なトレーニングが、シーズン中のパフォーマンスを左右します。パーソナルジムの年間計画に従うことで、継続的な成果を実現できます。
                </p>
              </div>
            </section>

            {/* Section 6: アスリート対応パーソナルジムの選び方 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                アスリート対応パーソナルジムの選び方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                スポーツパフォーマンス向上を目的とする場合、通常のパーソナルジムではなく、アスリート対応に特化したジムを選ぶことが重要です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント1：スポーツ経験を持つトレーナー</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    競技経験がトレーナーの指導クオリティに大きく影響します。以下を確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・トレーナー自身が競技経験を持つか</li>
                    <li>・指導している競技の経験年数</li>
                    <li>・競技での実績（選手経験、コーチ経験など）</li>
                    <li>・スポーツ栄養学の資格保有</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント2：競技別の専門プログラム</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ジムが競技別の専門的なプログラムを持つか確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・ゴルフ専用プログラムの有無</li>
                    <li>・テニス選手向けの怪我予防プログラム</li>
                    <li>・サッカー・フットサル向けの敏捷性トレーニング</li>
                    <li>・水泳向けの肩関節安定性プログラム</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント3：怪我予防・リハビリ対応</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    アスリート対応ジムは、怪我予防とリハビリが統合されていることが必須です：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・理学療法士の在籍</li>
                    <li>・過去の怪我に対応したリハビリプログラム</li>
                    <li>・スポーツ整形外科との連携</li>
                    <li>・緊急時の対応マニュアル</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント4：スポーツ栄養学に基づいた食事指導</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    競技力向上には、栄養管理が不可欠です。管理栄養士による指導があるか確認しましょう：
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・管理栄養士による個別食事指導</li>
                    <li>・競技前・試合前の栄養補給計画</li>
                    <li>・オフシーズンと競技シーズンでの食事戦略の違い</li>
                    <li>・定期的な栄養コンサルテーション</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ポイント5：体験時に確認すべき質問</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体験レッスン時に、以下を質問・確認しましょう：
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問1：競技経験と実績</p>
                      <p className="text-gray-700 mt-1">「担当トレーナーの競技経験は？」「どのような選手を指導した実績があるか？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問2：提案プログラムの内容</p>
                      <p className="text-gray-700 mt-1">「私の目標と現状を踏まえて、3ヶ月のプログラムを提案してもらえますか？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問3：怪我対応</p>
                      <p className="text-gray-700 mt-1">「過去の○○の怪我に対応できますか？」「リハビリプログラムはありますか？」</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-bold text-gray-900">質問4：年間計画</p>
                      <p className="text-gray-700 mt-1">「オフシーズン・シーズン中での取り組み方の違いを教えてください」</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>複数社の体験がお勧め</strong>：複数のアスリート対応パーソナルジムの体験を受け、トレーナーの競技知識・提案内容・相性を比較することが、成功の鍵になります。
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                スポーツパフォーマンス向上の第一歩を踏み出しましょう
              </h2>
              <p className="text-gray-700 mb-4">
                趣味のスポーツであれ、本格的な競技であれ、パーソナルジムでの専門的なサポートが、確実な成果をもたらします。競技経験と知識を持つトレーナーとの出会いが、スポーツ人生を大きく変えます。まずは、アスリート対応パーソナルジムの無料体験に申し込みましょう。
              </p>
              <Link
                href="/all/"
                className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold rounded-full px-6 py-2 hover:bg-blue-800 active:scale-[0.98] transition-all text-sm"
              >
                スポーツ対応パーソナルジムを探す
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
