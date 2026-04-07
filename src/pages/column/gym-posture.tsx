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
      question: "猫背や巻き肩は、どのくらいの期間で改善されますか？",
      answer: "個人差がありますが、週1～2回のパーソナルトレーニングを3～4ヶ月継続すれば、目に見える改善が期待できます。重度の姿勢の歪みでも、正しくトレーニングを続ければ6～8ヶ月で大幅に改善されることが多いです。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "姿勢が悪いと、どんな健康問題が起こりますか？",
      answer: "猫背や骨盤前傾により、肩こり、腰痛、首の痛み、頭痛、疲労感が増します。さらに、内臓への圧迫で消化不良や自律神経失調、呼吸が浅くなることで脳への酸素供給が減り、思考力低下にもつながります。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "パーソナルトレーナーは、姿勢の評価をどのように行いますか？",
      answer: "正面・側面・背面から立位での姿勢を観察し、骨盤、脊椎、肩、頭部の位置を測定します。さらに柔軟性テストや可動域測定を行い、どの部位が硬く、どの筋肉が弱いかを特定します。この分析結果に基づきトレーニングプランを作成します。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "姿勢改善に効果的な運動は、どのようなものですか？",
      answer: "胸椎モビリティ（背中の動き改善）、肩甲骨周りの柔軟性トレーニング、腹部・背中の体幹強化が中心です。また、ストレッチポールやフォームローラーでのセルフケアも姿勢改善に役立ちます。パーソナルトレーナーは、あなたの弱点に特化したメニューを組みます。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "姿勢改善は、ダイエットにも効果がありますか？",
      answer: "はい、大きな効果があります。姿勢が改善されると、内臓が正常な位置に戻り、消化機能が改善されます。また、背筋が伸びることで実際に痩せて見え、体幹が安定することで自然と日常動作での消費カロリーが増えます。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "骨盤の歪みはどうやって矯正されますか？",
      answer: "骨盤の前傾・後傾を矯正するには、腸腰筋や大腿四頭筋のストレッチ、お尻や腹部の筋力強化が必要です。パーソナルトレーナーが個別の歪み方を診断し、それに応じた矯正エクササイズを処方します。継続的なトレーニングで、正常な骨盤の位置が定着します。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymPosturePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルトレーニングで姿勢改善" },
  ];

  const pageTitle = "パーソナルトレーニングで姿勢改善｜猫背・巻き肩・骨盤の歪みを根本から直す方法";
  const pageUrl = `${baseSiteUrl}/column/gym-posture/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="猫背、巻き肩、骨盤前傾後傾といった現代人の姿勢の悩みをパーソナルトレーニングで改善する方法を詳しく解説。姿勢評価から矯正トレーニングまで、根本改善のための方法をまとめました。"
        path="/column/gym-posture/"
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
              description: "猫背、巻き肩、骨盤前傾後傾といった現代人の姿勢の悩みをパーソナルトレーニングで改善する方法を詳しく解説。姿勢評価から矯正トレーニングまで、根本改善のための方法をまとめました。",
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
              デスクワークやスマートフォンの長時間使用が当たり前の現代社会では、姿勢が歪む人が増えています。猫背、巻き肩、骨盤の歪みといった問題は、見た目の悪さだけでなく、肩こり、腰痛、頭痛といった身体的な不調の原因になります。本記事では、現代人に多い姿勢の悩み、姿勢の悪さが引き起こす健康問題、パーソナルトレーナーによる姿勢評価の方法、そして根本から姿勢を改善するための効果的なトレーニング方法について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                現代人に多い姿勢の悩み
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                デスクワークやスマートフォン使用が増えた現代では、以下のような姿勢の歪みが急増しています。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">猫背（ラウンドショルダー）</h3>
                    <p className="text-gray-600">背中が丸まり、首が前に出た状態です。デスクワークやスマートフォン利用で発生しやすく、最も一般的な姿勢の問題です。見た目の老け込みや呼吸の浅さにつながります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">巻き肩（フォワードショルダー）</h3>
                    <p className="text-gray-600">肩が前に巻き込んだ状態で、胸の筋肉が硬くなり、背中の筋肉が弱くなっています。肩こりや首の痛みの大きな原因です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨盤前傾</h3>
                    <p className="text-gray-600">骨盤が前に傾いた状態で、下腹が出て、腰に負荷がかかります。反り腰とも呼ばれ、腰痛の大きな原因になります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨盤後傾</h3>
                    <p className="text-gray-600">骨盤が後ろに傾いた状態で、丸い背中と連動していることが多いです。体幹が弱い人に見られ、腰痛やヒップラインの垂れにつながります。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">側弯（そくわん）</h3>
                    <p className="text-gray-600">脊椎が横に曲がった状態です。長年の偏った体の使い方や骨格の不均衡が原因で、肩の高さが異なって見えます。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                姿勢の悪さが引き起こす健康問題
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                悪い姿勢は単なる見た目の問題ではなく、身体全体に多くの健康問題をもたらします。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">筋骨格系の問題</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 肩こり・首の痛み</li>
                    <li>• 腰痛・腰部の違和感</li>
                    <li>• 膝痛</li>
                    <li>• 関節の痛みと可動域制限</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">神経・血管系の問題</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 頭痛・偏頭痛</li>
                    <li>• めまい・ふらつき</li>
                    <li>• 手足のしびれ</li>
                    <li>• 血流悪化</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">内臓・消化系の問題</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 消化不良・便秘</li>
                    <li>• 胃酸逆流</li>
                    <li>• 呼吸の浅さ</li>
                    <li>• 腹部膨張感</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-bold text-gray-900 mb-2">メンタル・自律神経系の問題</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• うつ症状・無気力</li>
                    <li>• 不安感・ストレス</li>
                    <li>• 睡眠障害</li>
                    <li>• 自律神経失調</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>注意：</strong>悪い姿勢は時間がたつほど改善が難しくなります。早期に対策することで、これらの問題の発生を防げます。
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーナーによる姿勢評価の方法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                優秀なパーソナルトレーナーは、以下の詳細な評価プロセスを通じて、あなたの姿勢の問題を特定します。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">1. 静的姿勢評価</h3>
                  <p className="text-gray-700 mb-2">立った状態で以下を確認します：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 正面：肩の高さ、骨盤の傾き、膝の向き</li>
                    <li>• 側面：耳、肩、股関節、膝、足首の一直線性</li>
                    <li>• 背面：肩甲骨の位置、脊椎のカーブ、足の外反内反</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">2. 可動域測定（ROM）</h3>
                  <p className="text-gray-700 mb-2">各関節の動きを測定し、制限がないか確認：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 首の回旋・前後左右</li>
                    <li>• 肩の外旋・内旋・挙上</li>
                    <li>• 脊椎の前屈・後屈・側屈</li>
                    <li>• 股関節の外旋・内旋・屈伸</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">3. 筋肉の柔軟性テスト</h3>
                  <p className="text-gray-700 mb-2">硬くなっている筋肉を特定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 大胸筋の硬さ（巻き肩の原因）</li>
                    <li>• 腸腰筋の硬さ（骨盤前傾の原因）</li>
                    <li>• ハムストリングスの硬さ（腰痛の原因）</li>
                    <li>• 脊柱起立筋の硬さ（反り腰の原因）</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">4. 筋力テスト</h3>
                  <p className="text-gray-700 mb-2">弱くなっている筋肉を特定：</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 背中（僧帽筋・菱形筋）の弱さ</li>
                    <li>• 体幹（腹筋・腰部）の弱さ</li>
                    <li>• 大臀筋の弱さ</li>
                    <li>• 首周りの筋肉の弱さ</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">5. 写真・動画撮影</h3>
                  <p className="text-gray-700 mb-2">視覚的に改善を追跡するため、初回と定期的に撮影し、比較します。数ヶ月後の改善が実感できます。</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                姿勢改善に効果的なトレーニング
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                姿勢改善には、硬くなっている筋肉のストレッチと、弱い筋肉の強化が必要です。
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">胸椎モビリティトレーニング（背中の動き改善）</h3>
                  <p className="text-gray-600 text-sm mb-2">猫背と巻き肩の改善に最も重要。背骨（胸椎）の回旋・側屈・伸展を改善することで、背中が自然に伸び、肩が後ろに引き戻されます。スレッドザニードル、プールヌードル、キャット・カウなどのエクササイズが効果的です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">肩甲骨周りの柔軟性・強化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">僧帽筋・菱形筋・前鋸筋を強化し、大胸筋と小胸筋をストレッチします。バンドロー、リバースフライ、シュラッグなどで、肩甲骨を正常な位置に戻します。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">体幹強化トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">腹筋・背筋・側腹筋をバランスよく鍛え、脊椎を安定させます。プランク、デッドバグ、サイドプランク、バードドッグなどで、正しい姿勢を保つ力をつけます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">大臀筋と股関節のトレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">骨盤前傾や後傾を矯正するには、大臀筋の強化と股関節周りの柔軟性が必須です。スクワット、ヒップスラスト、ランジなどで、骨盤を正中位に保つ筋力をつけます。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">深層筋トレーニング</h3>
                  <p className="text-gray-600 text-sm mb-2">腹横筋・多裂筋・骨盤底筋群といった深層の体幹筋を鍛えることで、安定性が増します。ピラティスやコアトレーニングが効果的です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">ストレッチとセルフケア</h3>
                  <p className="text-gray-600 text-sm mb-2">硬くなった胸、腸腰筋、ハムストリングスのストレッチが重要です。フォームローラーやストレッチポールを使ったセルフケアを習慣化することで、改善が加速します。</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                姿勢改善の目安期間と継続のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                姿勢改善には時間がかかりますが、正しい方法で継続すれば確実に改善されます。
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">4週間目</h3>
                  <p className="text-gray-600 text-sm">軽い改善を感じ始める時期。肩こりが少し楽になり、自分の悪い姿勢に気づきやすくなります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">8週間目（2ヶ月）</h3>
                  <p className="text-gray-600 text-sm">目に見える改善が現れます。背中が伸び、肩こりや頭痛が減り、周囲からも「姿勢が良くなった」と指摘されることがあります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">12週間目（3ヶ月）</h3>
                  <p className="text-gray-600 text-sm">大きな改善が実感できる時期。健康診断で「血圧が下がった」「呼吸が深い」などの改善が見られることもあります。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-2">24週間目（6ヶ月）</h3>
                  <p className="text-gray-600 text-sm">改善した姿勢が習慣化し始めます。トレーニングを減らしても、良い姿勢が自然と保たれるようになります。</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">継続のコツ</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>週1～2回のパーソナルトレーニング</strong> — 継続的なサポートと指導が改善を加速させます</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>自宅でのセルフケア</strong> — 教わったストレッチを毎日5～10分実践することで、改善が確実になります</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>日常の姿勢への気づき</strong> — デスク作業中に意識的に姿勢を正すことで、習慣化が早まります</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                  <span><strong>定期的な写真記録</strong> — 目に見える改善を実感することで、モチベーションが保たれます</span>
                </li>
              </ul>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="mt-10 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">よくある質問</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <summary className="font-medium text-gray-900 cursor-pointer flex justify-between items-center">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              姿勢を改善して、健康で活動的な体を取り戻しましょう
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              パーソナルトレーナーによる専門的な姿勢評価と矯正トレーニングで、猫背や肩こりを根本から解決できます。全国のパーソナルジムから、自分にぴったりのジムを見つけましょう。
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

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/column/gym-back/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  腰痛・肩こり改善のためのパーソナルジム活用｜姿勢矯正プログラムとは
                </h3>
                <p className="text-sm text-gray-600">
                  慢性的な痛みに対応するトレーニング
                </p>
              </Link>
              <Link
                href="/column/gym-stretch/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムでのストレッチ・柔軟性向上｜硬い体をほぐすトレーニングの効果
                </h3>
                <p className="text-sm text-gray-600">
                  柔軟性向上の実践的な方法
                </p>
              </Link>
              <Link
                href="/column/gym-bodymake/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  パーソナルジムで体が変わるまでの期間｜目標別タイムライン
                </h3>
                <p className="text-sm text-gray-600">
                  体を変える現実的なスケジュール
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
