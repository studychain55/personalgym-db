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
      question: "体が硬い人でもストレッチで柔軟性は改善しますか？",
      answer: "はい、確実に改善します。どんなに体が硬い人でも、正しいストレッチを継続すれば3～4週間で可動域の改善を感じられます。パーソナルジムでは個別の体の硬さに合わせたストレッチプログラムを組むため、独学より効率的に柔軟性を高められます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "静的ストレッチと動的ストレッチはどう違いますか？",
      answer: "静的ストレッチは、筋肉を伸ばした状態で15～30秒キープするもので、クールダウンに適しています。動的ストレッチは、腕や脚を大きく動かしながら行うもので、ウォームアップに適しています。パーソナルジムではこの両者を適切なタイミングで組み合わせて使い分けます。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "ストレッチだけでダイエット効果はありますか？",
      answer: "ストレッチ単独のダイエット効果は限定的です。しかし、柔軟性が高まるとトレーニングの可動域が広がり、より効果的なトレーニングができるようになります。パーソナルジムでは、ストレッチとトレーニングを組み合わせることで、ダイエット効果を最大化します。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "パーソナルジムでストレッチ指導を受けるメリットは？",
      answer: "個別の体の硬さに合わせたストレッチプログラムが組め、正しいフォームで効率的に柔軟性を高められます。また、自分では気づかない動きの癖や筋肉の硬さを指摘してもらえるため、より効果的です。医学的な知識も豊富なため、既往症がある場合も安心です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "柔軟性が高まるまでにはどのくらいの期間が必要ですか？",
      answer: "個人差がありますが、週2～3回のトレーニングと日々のセルフケアを組み合わせる場合、3～4ヶ月で明らかな変化を感じられます。特に最初の4週間で可動域の改善を感じる人が多いです。継続が鍵となります。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "自宅でのセルフケアストレッチと併用できますか？",
      answer: "ぜひ併用してください。パーソナルジムでプロから指導を受けたストレッチ方法を、自宅で毎日実践することで、柔軟性向上のスピードが大幅に加速します。多くのジムでは、自宅でのセルフケア方法も教えてくれます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymStretchPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでのストレッチ・柔軟性向上" },
  ];

  const pageTitle = "パーソナルジムでのストレッチ・柔軟性向上｜硬い体をほぐすトレーニングの効果";
  const pageUrl = `${baseSiteUrl}/column/gym-stretch/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="体が硬い人でもパーソナルジムで柔軟性を高める方法を解説。静的・動的ストレッチの違い、ストレッチがトレーニング効果を高める理由、柔軟性向上の目安となる期間を紹介。"
        path="/column/gym-stretch/"
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
              description: "体が硬い人でもパーソナルジムで柔軟性を高める方法を解説。静的・動的ストレッチの違い、ストレッチがトレーニング効果を高める理由、柔軟性向上の目安となる期間を紹介。",
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
              「体が硬くて、体操着が上手く着こなせない」「前屈で足が遠い」このような悩みをお持ちですか？体が硬いことは単なるコンプレックスではなく、怪我のリスク、トレーニング効果の低下、日常生活の制限につながります。このガイドでは、体が硬い原因、静的・動的ストレッチの正しい使い分け、パーソナルジムでストレッチ指導を受けるメリット、自宅でのセルフケアとの組み合わせ方、柔軟性が高まるまでの期間の目安をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 体が硬い原因と影響 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体が硬いことによる体への影響
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                体が硬いと聞くと、単なる体質の問題だと思う人も多いでしょう。しかし、柔軟性の低さは、体のさまざまな機能低下につながっています。
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    怪我のリスク増加
                  </h4>
                  <p className="text-gray-700 text-sm">
                    柔軟性が低いと、予期しない動きで筋肉の断裂や捻挫が起こりやすくなります。体の可動域が狭いため、日常生活での無理な動きが怪我につながることもあります。トレーニング中の怪我のリスクも高まります。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    トレーニング効果の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体が硬いと、トレーニング時の可動域が制限されます。例えば、スクワットで十分な深さまで腰を落とせない、腕立て伏せで十分な動きができないなど、トレーニング効果が低下します。効果を出すまでにより長い期間がかかります。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    血流悪化・筋肉凝りの悪化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    柔軟性が低いと、筋肉が常に緊張状態にあり、血流が悪くなります。これが肩こり、腰痛、冷え性などの原因になります。またむくみやすくもなり、見た目の印象も悪くなります。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    姿勢悪化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体が硬いと、無意識のうちに姿勢が丸くなったり、偏った形になったりします。これが猫背や反り腰につながり、見た目の老け込みを加速させます。正しい姿勢を保つのが困難になります。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>体が硬い＝体質ではなく改善可能</strong>：多くの人は、体が硬いことを体質だと諦めています。しかし、正しいストレッチと継続で、誰でも柔軟性を高められます。パーソナルジムは、この改善を専門的にサポートします。
                </p>
              </div>
            </section>

            {/* Section 2: 静的・動的ストレッチの違い */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                静的ストレッチと動的ストレッチの違いと使い分け
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ストレッチには大きく2つの種類があります。それぞれの特性を理解し、正しいタイミングで使い分けることが、トレーニング効果を最大化するカギです。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">静的ストレッチ（スタティックストレッチ）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    一つのポーズを15～30秒キープする、最も一般的なストレッチ方法です。ゆっくり筋肉を伸ばし、脳がリラックス状態（副交感神経優位）になります。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>適切なタイミング</strong>：トレーニング後のクールダウン、就寝前のリラックスタイム
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <strong>メリット</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li>筋肉を深くほぐせる</li>
                      <li>副交感神経を優位にしてリラックス効果がある</li>
                      <li>柔軟性向上に特に効果的</li>
                      <li>筋肉痛の軽減・回復促進</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 mt-3">
                    <strong>デメリット</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li>直後のトレーニング力が一時的に低下する</li>
                      <li>時間がかかる</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">動的ストレッチ（ダイナミックストレッチ）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    腕や脚を大きく動かしながら行うストレッチです。腕を大きく回す、脚を高く上げるなど、関節の可動域を使った運動です。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>適切なタイミング</strong>：トレーニング前のウォームアップ、朝のスタート前
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <strong>メリット</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li>体温が上がり、筋肉が温まる</li>
                      <li>交感神経を優位にして、活動的な状態にできる</li>
                      <li>トレーニングパフォーマンス向上</li>
                      <li>怪我予防効果が高い</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 mt-3">
                    <strong>デメリット</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li>柔軟性向上の効果は静的ストレッチより劣る</li>
                      <li>誤ったフォームで行うと怪我につながる</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>理想的なストレッチの組み合わせ</strong>：ウォームアップ（動的）→ メイントレーニング → クールダウン（静的）。この流れで、パフォーマンス向上と柔軟性向上を両立できます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: ウォームアップ・クールダウンでのストレッチ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ウォームアップ・クールダウンでのストレッチの役割
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムで実施されるトレーニングの流れは、ウォームアップ→メインセッション→クールダウンです。各段階でのストレッチの役割を理解することが重要です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ウォームアップでの動的ストレッチ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング開始前の5～10分、動的ストレッチで体を温めます。これにより、怪我予防とパフォーマンス向上を同時に実現できます。
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>腕のサークル運動</strong>
                        <p className="text-gray-600">肩関節を動員し、血流を増加させる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>レッグスイング</strong>
                        <p className="text-gray-600">股関節の可動域を広げ、下半身の血流を高める</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>体幹回転</strong>
                        <p className="text-gray-600">脊椎の可動性を高め、怪我を予防</p>
                      </div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-4">
                    <strong>効果</strong>：体温上昇、筋肉の温度向上、怪我リスク低下、トレーニング効率向上
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">クールダウンでの静的ストレッチ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    トレーニング後の10～15分、静的ストレッチで体をほぐします。疲労回復と柔軟性向上の両方を実現できます。
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>大腿四頭筋のストレッチ</strong>
                        <p className="text-gray-600">脚の前面の筋肉をほぐし、回復促進</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ハムストリングスのストレッチ</strong>
                        <p className="text-gray-600">脚の後面の筋肉をほぐし、前屈の柔軟性向上</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>肩周りのストレッチ</strong>
                        <p className="text-gray-600">肩甲骨周辺の凝りをほぐし、肩こり軽減</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>腰部のストレッチ</strong>
                        <p className="text-gray-600">脊椎周辺の筋肉をほぐし、腰痛予防</p>
                      </div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-4">
                    <strong>効果</strong>：疲労回復促進、心拍数低下、柔軟性向上、筋肉痛軽減、リラックス効果
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: パーソナルジムでストレッチ指導を受けるメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムでストレッチ指導を受けるメリット
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ストレッチは自宅でもできますが、パーソナルジムで専門家の指導を受けることで、より効率的に結果が出ます。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">個別の体の悩みに対応したプログラム</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体が硬い箇所は人によって異なります。前屈が苦手な人、開脚が苦手な人、肩が硬い人など、個別の悩みに対応したストレッチプログラムが組めます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>例</strong>：「前屈で20cm手が床から遠い」という相談なら、ハムストリングス・腰部・ふくらはぎ中心のプログラムを組みます
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">正しいフォーム・強度指導</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    自己流でストレッチをしていると、無意識のうちに間違ったフォームで行ってしまうことがあります。パーソナルトレーナーの指導なら、正確なフォームと最適な強度を学べます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・呼吸方法の指導（リラックス効果向上）</li>
                    <li>・ストレッチの深さの調整（怪我防止）</li>
                    <li>・筋肉の活動（触診による確認）</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">既往症・怪我への対応</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    腰痛、肩痛、膝痛などの既往症がある場合、医学的な知識なしに無理なストレッチをすると悪化する可能性があります。パーソナルジムなら、既往症を配慮したプログラムが組めます。
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ストレッチとトレーニング効果の相乗効果</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムのストレッチは、トレーニングと組み合わせられます。トレーニングで筋肉に刺激を与え、その後のストレッチでほぐすという流れで、より効率的に結果が出ます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>例</strong>：スクワットで脚に刺激→クールダウンで脚のストレッチ。こうすることで、筋肉の回復が早く、柔軟性も同時に向上
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">自宅でのセルフケア方法の指導</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムで学んだストレッチ方法を、自宅で毎日実践することで、柔軟性向上のスピードが加速します。多くのジムでは、自宅でのセルフケア方法も詳しく教えてくれます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 柔軟性向上の期間・目安 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                柔軟性が高まるまでの期間の目安
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                柔軟性の向上は、個人差が大きいです。ここでは、一般的な目安を紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">初期変化（1～4週間）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    このフェーズでは、体が反応し始めます。多くの人が「体が動きやすくなった」という実感を得られます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>可動域が5～10cm拡大することも珍しくない</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>筋肉の凝りが緩和され、肩こりや腰痛が軽減</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>朝の起床時の体の硬さが減少</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週2～3回のトレーニング + 毎日15分のセルフケア
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">明確な改善（1～3ヶ月）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    このフェーズでは、目に見える変化が現れます。周囲の人からも「柔軟になった」と指摘されることが多くなります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>前屈で20～30cm改善することも</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>開脚の可動域が大きく拡大</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>姿勢が自然と改善され、見た目がスッキリ</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>トレーニング中の可動域が拡大し、トレーニング効果も向上</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週2回のジム + 毎日20分のセルフケア
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">継続段階（3ヶ月以上）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    このフェーズでは、柔軟性の向上が最大化されます。さらに、ストレッチとトレーニングを継続することで、筋肉の質が向上し、バランスの取れた体になっていきます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>初期状態に比べて大幅に柔軟性が向上</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>怪我のリスクが大幅に低下</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>体が軽く、動きが楽になる</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週1回のジム（メンテナンス） + 毎日10～15分のセルフケア
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>継続が最重要</strong>：柔軟性の向上は、「止めると戻る」という性質があります。目標達成後も、セルフケアを習慣化させることが大切です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: セルフケアストレッチ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                自宅でできるセルフケアストレッチとの組み合わせ方
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムでのストレッチの効果を最大化するには、自宅でのセルフケアが欠かせません。パーソナルジムで学んだ方法を、日々実践することが成功の鍵です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">毎日のセルフケアルーティン</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムで習ったストレッチを、毎日15～20分実践することで、劇的に結果が変わります。
                  </p>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>朝（5～10分）</strong>
                      <p className="text-gray-600 mt-1">目覚めの硬さをほぐす軽いストレッチ。体を起こしながら行う。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>就寝前（10～15分）</strong>
                      <p className="text-gray-600 mt-1">体をリラックスさせるストレッチ。ゆっくり、深い呼吸と共に行う。</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>運動後（5～10分）</strong>
                      <p className="text-gray-600 mt-1">ジムでの指導と同じストレッチを実施。効果を最大化する。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">パーソナルジム × セルフケアの相乗効果</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ジムでの指導</strong>
                        <p className="text-gray-600">正しいフォーム、最適な強度、個別の悩みに対応したプログラム</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>セルフケア</strong>
                        <p className="text-gray-600">学んだ方法を毎日実践することで、成果を加速化</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>月単位での振り返り</strong>
                        <p className="text-gray-600">ジムでの計測で進捗を確認し、プログラムを調整</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">セルフケアの際の注意点</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-yellow-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>痛みを伴うストレッチはNG</strong>
                        <p className="text-gray-600">気持ち良い～やや痛気持ちいいレベルが目安。強い痛みは怪我につながります</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>呼吸を止めない</strong>
                        <p className="text-gray-600">ストレッチ中は深くゆっくり呼吸する。呼吸を止めると、筋肉がより硬くなります</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-yellow-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>反動をつけない</strong>
                        <p className="text-gray-600">バウンドするような反動は、筋肉を傷める可能性があります</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                柔軟性を高めるパーソナルジムを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                「体が硬い」は改善可能です。パーソナルジムの専門的な指導と、自宅でのセルフケアの組み合わせで、誰もが柔軟性を高められます。3～4ヶ月で、あなたの体は確実に変わります。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/all/"
                  className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold rounded-lg px-6 py-3 hover:bg-blue-800 transition-all"
                >
                  全国のパーソナルジムから探す
                </Link>
                <Link
                  href="/column/"
                  className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 font-bold rounded-lg px-6 py-3 hover:bg-gray-300 transition-all"
                >
                  その他のコラムを読む
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
