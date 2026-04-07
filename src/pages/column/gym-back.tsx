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
      question: "腰痛・肩こりはパーソナルジムで改善しますか？",
      answer: "はい、多くの場合改善します。慢性的な腰痛・肩こりの原因は、姿勢の歪みと筋力不足。パーソナルジムでの姿勢矯正プログラムと体幹強化で、根本原因を解決できます。3～4ヶ月の継続で、多くの人が症状の軽減を実感します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "パーソナルジムの姿勢矯正プログラムとは何ですか？",
      answer: "姿勢分析から始まり、歪みの原因となっている筋肉の強化・柔軟性向上・動作改善を総合的に行うプログラムです。単なるトレーニングではなく、医学的根拠に基づいた個別対応が特徴。体幹・背中・肩周りなど、歪みに関わる全ての筋肉にアプローチします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体幹強化と柔軟性向上は同時にできますか？",
      answer: "はい、できます。むしろパーソナルジムではこの両者を組み合わせることで、より早く姿勢を改善できます。トレーニングで筋肉に刺激を与え、ストレッチで柔軟性を高める。この相乗効果が、腰痛・肩こり改善のカギです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "既に医学的な診断がある場合、パーソナルジムに通えますか？",
      answer: "通えます。ただし事前に医師に相談し、診断内容をトレーナーに伝えることが重要です。医学的知識を持つトレーナーなら、既往症を配慮したプログラムを組めます。むしろ、医学的な指導とトレーニングの組み合わせが最も効果的です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "改善が見え始めるまでにはどのくらい期間が必要ですか？",
      answer: "個人差がありますが、週2回のトレーニングと日々の姿勢改善を意識した場合、2～4週間で症状の軽減を感じ始める人が多いです。より明確な改善は3～4ヶ月程度が目安。ただし、症状が強い場合は医師と相談が必須です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "パーソナルジム選びの際に確認すべきポイントは？",
      answer: "リハビリ経験者やRYT（ヨガ資格）を持つトレーナーが在籍しているか、医学的な知識があるか、体験時に姿勢分析を丁寧に行うかなどが重要です。腰痛・肩こり対応の実績が豊富なジムを選ぶことで、より確実な改善が期待できます。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymBackPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "腰痛・肩こり改善のためのパーソナルジム活用" },
  ];

  const pageTitle = "腰痛・肩こり改善のためのパーソナルジム活用｜姿勢矯正プログラムとは";
  const pageUrl = `${baseSiteUrl}/column/gym-back/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="慢性的な腰痛・肩こりに悩む人のためのパーソナルジム活用法を解説。姿勢の歪みが引き起こす不調とその改善トレーニング、体幹強化・ストレッチを組み合わせたプログラムを紹介。"
        path="/column/gym-back/"
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
              description: "慢性的な腰痛・肩こりに悩む人のためのパーソナルジム活用法を解説。姿勢の歪みが引き起こす不調とその改善トレーニング、体幹強化・ストレッチを組み合わせたプログラムを紹介。",
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
              健康・症状改善
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              「毎日のようにマッサージに通っているのに改善しない」「病院の検査では異常なしと言われたが、痛みが続く」このような悩みをお持ちですか？慢性的な腰痛・肩こりの原因の多くは、姿勢の歪みと筋力不足です。このガイドでは、腰痛・肩こりの根本原因、パーソナルジムの姿勢矯正プログラムの内容、体幹強化とストレッチの組み合わせ方、医療機関との連携、改善までのタイムライン、パーソナルジムの選び方をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 腰痛・肩こりの根本原因 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛・肩こりの主な原因：姿勢の歪みと筋力不足
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                腰痛・肩こりは、単なる筋肉疲労ではなく、姿勢の歪みと筋力不足が組み合わさった結果です。原因を理解することが、改善への第一歩です。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    猫背・反り腰による脊椎への過剰負荷
                  </h4>
                  <p className="text-gray-700 text-sm">
                    猫背により、脊椎（背骨）が本来の位置からずれます。これにより、脊椎周辺の筋肉と靭帯に過剰な負荷がかかり、痛みが生じます。また、反り腰も腰椎に大きな負担をかけ、腰痛の原因になります。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    体幹筋の弱化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    腹筋・背筋などの体幹筋が弱いと、脊椎を支える力が不足します。その結果、脊椎が不安定になり、周辺の筋肉が過剰に緊張して、腰痛が起こります。体幹筋の強化が、腰痛改善の鍵です。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    肩周りの筋肉の硬化
                  </h4>
                  <p className="text-gray-700 text-sm">
                    デスクワークなどで同じ姿勢を続けると、肩周りの筋肉（僧帽筋、肩甲骨周辺）が硬くなります。筋肉の硬化により、血流が悪くなり、肩こりが起こります。また、硬化した筋肉は関節の可動域を制限し、肩痛につながることもあります。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    股関節・胸椎の可動性低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    股関節や胸椎の可動性が低いと、その分脊椎が過剰に動員され、負担が増します。特に股関節の硬さは、腰痛に直結します。全身の可動性を高めることで、脊椎への負荷を分散できます。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>マッサージだけでは改善しない理由</strong>：マッサージは一時的に筋肉をほぐしますが、根本原因の「姿勢の歪み」と「筋力不足」を改善しません。だから症状が繰り返されるのです。パーソナルジムは、これら根本原因に対処します。
                </p>
              </div>
            </section>

            {/* Section 2: 姿勢矯正プログラムとは */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの姿勢矯正プログラムとは
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムの姿勢矯正プログラムは、医学的根拠に基づいた総合的なアプローチです。単なるトレーニングではなく、姿勢分析から始まる個別対応が特徴です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ステップ1：姿勢分析・評価</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルトレーナーが、立位・座位・歩行時の姿勢を詳しく分析します。どこがどれくらい歪んでいるか、その原因は何かを特定します。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・骨盤の傾き（前傾・後傾）の確認</li>
                    <li>・脊椎の歪み（猫背度合い・反り腰度合い）の測定</li>
                    <li>・肩の高さの比較</li>
                    <li>・股関節・胸椎の可動域測定</li>
                    <li>・筋肉の硬さ・バランスの確認</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ステップ2：原因筋肉の特定・柔軟性向上</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    姿勢の歪みの原因となっている筋肉を特定し、ストレッチで柔軟性を高めます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                    <strong>例：猫背の場合</strong>
                    <p className="mt-2">胸部の筋肉（大胸筋）と肩の筋肉（僧帽筋）が硬くなっているため、これらをストレッチで柔軟性を高めます。</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・静的ストレッチ（クールダウン時）</li>
                    <li>・動的ストレッチ（ウォームアップ時）</li>
                    <li>・フォームローラーを使った筋膜リリース</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ステップ3：体幹・背中トレーニング</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    弱化している体幹筋・背中筋を強化し、脊椎を正しい位置で支える力を回復させます。
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>腹筋トレーニング</strong>
                        <p className="text-gray-600">クランチ、プランク、レッグレイズ等、腹部の深層筋まで鍛える</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>背部トレーニング</strong>
                        <p className="text-gray-600">ラットプルダウン、シーテッドロウ、バックエクステンション等</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>肩周りトレーニング</strong>
                        <p className="text-gray-600">リバースフライ、ショルダープレス、顔引き等、肩甲骨周辺筋の強化</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ステップ4：動作パターン改善</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    正しい姿勢を保つための動作（立ち方、座り方、歩き方、物の持ち上げ方）を学びます。トレーニング中だけでなく、日常生活での習慣改善が重要です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・正しい立ち方・座り方の指導</li>
                    <li>・スマートフォン利用時の姿勢改善</li>
                    <li>・デスクワーク中の姿勢改善アドバイス</li>
                    <li>・日常生活での姿勢意識付け</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">ステップ5：月単位での再評価・プログラム調整</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    月1回程度、姿勢を再測定し、改善状況を確認します。改善に伴い、プログラムも段階的に調整されます。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>医学的根拠</strong>：パーソナルジムの姿勢矯正プログラムは、リハビリテーション医学や運動学に基づいています。医学的な知識がないトレーナーのトレーニングより、確実に結果が出ます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: 体幹強化とストレッチの組み合わせ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体幹強化とストレッチ：相乗効果による改善
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                体幹強化とストレッチは、一見対立するアプローチです。しかし、パーソナルジムではこの両者を組み合わせることで、相乗効果を生み出しています。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">なぜ両者を組み合わせるのか</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体幹強化だけでは、硬い筋肉が正常な位置で緊張することになり、改善が遅れます。同様に、ストレッチだけでは、脊椎を支える力がないため、姿勢は改善されません。両者を組み合わせることで、初めて根本改善が実現します。
                  </p>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-3">
                      <span className="text-green-700 font-bold">①</span>
                      <div>
                        <strong>体幹強化</strong>：脊椎を支える力を取り戻す
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-700 font-bold">②</span>
                      <div>
                        <strong>ストレッチ</strong>：硬い筋肉をほぐし、正しい位置に戻す
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-700 font-bold">③</span>
                      <div>
                        <strong>相乗効果</strong>：正しい姿勢が自然と保たれるようになる
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">具体的なトレーニング例：腰痛改善</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    腰痛改善の例で、具体的な組み合わせ方を紹介します。
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">ウォームアップ（5～10分）</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>軽い有酸素運動（トレッドミル）</li>
                        <li>動的ストレッチ（脚のスイング、腰の回転）</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">ストレッチ・柔軟性向上（5～10分）</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>股関節ストレッチ（梨状筋、大腿四頭筋）</li>
                        <li>腰部ストレッチ（腰部回転、脊椎前屈）</li>
                        <li>胸部ストレッチ（大胸筋）</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">体幹強化トレーニング（30～40分）</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>プランク（腹部深層筋）</li>
                        <li>デッドリフト（背部・ハムストリングス）</li>
                        <li>ケーブルロータリー（体幹回転筋）</li>
                        <li>グルートブリッジ（大臀筋・腰部安定）</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">クールダウン・ストレッチ（10～15分）</h4>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>全身のストレッチ（前述のストレッチを再度）</li>
                        <li>深い呼吸と共に、筋肉を深くほぐす</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>この組み合わせの効果</strong>：トレーニング直後は腹筋・背筋が疲れていますが、その状態でストレッチを行うことで、筋肉がより深くほぐれ、かつ正しい姿勢で筋肉が回復します。これが相乗効果です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 医療機関との連携 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                医療機関との連携：既往症がある場合
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                椎間板ヘルニア、脊柱管狭窄症などの既往症がある場合、パーソナルジムと医療機関の連携が重要です。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">医師への相談が必須な理由</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    既往症によっては、特定の動きが禁止されることがあります。医師の承認なしにトレーニングを始めると、症状が悪化する可能性があります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>・医師から「パーソナルジムでのトレーニングは可能か」の確認</li>
                    <li>・避けるべき動きの確認</li>
                    <li>・医師の診断書・許可書の提示</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">リハビリ経験者のトレーナーを選ぶ</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    既往症がある場合は、理学療法士の資格や運動療法の知識を持つトレーナーを選ぶことが重要です。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>確認ポイント</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      <li>理学療法士（PT）の資格有無</li>
                      <li>リハビリ経験の年数</li>
                      <li>医学的な知識の深さ</li>
                      <li>整形外科医との連携実績</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">定期的な医師への報告</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムでのトレーニングを始めた後、定期的に医師に報告することが重要です。もし症状が悪化した場合は、即座にトレーニングを中断し、医師に相談します。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>重要</strong>：既往症がある場合のパーソナルジム利用は、医師の承認とリハビリ経験者のトレーナーが必須条件です。これらなしでのトレーニングは推奨できません。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 改善期間・タイムライン */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                改善が見え始めるまでの期間：現実的なタイムライン
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                腰痛・肩こり改善の速度は、症状の重さとトレーニングの継続性に大きく依存します。現実的なタイムラインを紹介します。
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">初期段階（1～2週間）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    この段階では、体が変化に適応し始めます。多くの人は「体がリラックスした」という実感を得られます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>トレーニング直後は楽になるが、翌日には元に戻ることもある</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>筋肉痛が起こることがあり、一時的に不快感が増す可能性</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>正しい姿勢は「違和感がある」と感じることが多い</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週2回のトレーニング + 毎日の姿勢意識
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">症状軽減期（2～4週間）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    このフェーズで、多くの人が症状の軽減を実感し始めます。「朝起きた時の痛みが減った」「夕方の肩こりが軽い」などの変化が現れます。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>夜間の痛みが軽減し、睡眠が改善することも</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold">※</span>
                      <div>正しい姿勢が次第に楽に感じられるように</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-707 font-bold">※</span>
                      <div>体幹力が向上し、日常生活での動きが楽に</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週2回のトレーニング + 毎日20分のセルフケア
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">明確な改善期（3～4ヶ月）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    このフェーズでは、初期状態に比べて大幅な改善が見られます。人によっては「薬が必要でなくなった」「マッサージに通うのをやめた」などの変化が起こります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-707 font-bold">※</span>
                      <div>痛みが週単位で減少し、感じ方が変わる</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-707 font-bold">※</span>
                      <div>姿勢が目に見えて改善し、見た目も若々しく</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-707 font-bold">※</span>
                      <div>可動域が大幅に拡大</div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-707 font-bold">※</span>
                      <div>スポーツや運動がより快適に</div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded text-sm mt-3">
                    <strong>推奨頻度</strong>：週1～2回のトレーニング（メンテナンス）
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>継続が最重要</strong>：腰痛・肩こしは、改善後も再発のリスクがあります。目標達成後も、週1回程度のメンテナンストレーニングを続けることが、再発予防のカギです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: ジム選びのポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛・肩こし改善に対応したジム選びのポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                すべてのパーソナルジムが、腰痛・肩こし改善に対応しているわけではありません。慎重なジム選びが成功のカギです。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    リハビリ経験者・理学療法士の在籍
                  </h4>
                  <p className="text-gray-700 text-sm">
                    理学療法士や運動療法の資格を持つトレーナーが在籍しているか確認。既往症への対応経験が豊富なジムを選ぶことが重要です。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    姿勢分析・評価の詳しさ
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体験時に、体が細かく分析されるか確認。表面的な評価ではなく、医学的根拠に基づいた詳細な分析ができるジムを選びます。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    医療機関との連携
                  </h4>
                  <p className="text-gray-700 text-sm">
                    整形外科医との連携実績があるか、既往症がある利用者の対応実績があるか確認。医療機関とのネットワークが充実しているジムが安心です。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    月単位での再評価体制
                  </h4>
                  <p className="text-gray-700 text-sm">
                    月1回の姿勢再測定など、進捗を確認する仕組みがあるか。単なるトレーニング提供だけでなく、改善状況を追跡するジムが質が高い傾向にあります。
                  </p>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h4 className="font-bold text-pink-900 mb-2">
                    実績・口コミの確認
                  </h4>
                  <p className="text-gray-700 text-sm">
                    「腰痛が改善した」「肩こりが治った」などの実績が豊富なジムを選ぶ。可能であれば、実際に改善した利用者の声を確認しましょう。
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>複数ジムの比較は必須</strong>：腰痛・肩こし改善は、ジムの質で大きく左右されます。最低3～5社の無料体験を受け、慎重に比較することをお勧めします。
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                腰痛・肩こし改善に対応したパーソナルジムを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                慢性的な腰痛・肩こしは、適切なパーソナルジムでの姿勢矯正プログラムで、根本から改善できます。マッサージや医薬品での一時的な緩和ではなく、永続的な改善を目指しましょう。
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
