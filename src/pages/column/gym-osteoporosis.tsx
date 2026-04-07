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
      question: "骨粗しょう症とは何ですか？パーソナルトレーニングで本当に予防できるのですか？",
      answer: "骨粗しょう症は、骨の密度が低下し、骨がもろくなる疾患です。転倒時に骨折しやすくなり、寝たきりのリスクが高まります。パーソナルトレーニングは最も効果的な予防・改善手段です。レジスタンストレーニング（筋トレ）は骨に直接的な負荷をかけ、骨密度を増加させます。医学的研究でも、週3回の筋トレで骨密度が1～3％向上することが実証されています。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "50代・60代で骨粗しょう症の診断を受けました。今からでも改善できますか？",
      answer: "はい、十分改善できます。骨は生きている組織で、適切な刺激により再形成されます。50代以降でも、継続的なレジスタンストレーニングにより骨密度を逆転させることが可能です。ただし、医師の許可を得て、パーソナルトレーナーの指導下で安全に行うことが重要です。既に骨折のリスクが高い場合は、高強度トレーニングではなく、フォーム重視の中強度トレーニングから始めましょう。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "骨粗しょう症予防に最も効果的なトレーニングは何ですか？",
      answer: "スクワット・デッドリフト・レッグプレス・ステップアップなど、下肢に体重負荷がかかる動作が最も効果的です。これらの運動は、大腿骨（太ももの骨）や脊椎に直接的な圧負荷をかけ、骨形成を促進します。また、体幹トレーニング（プランク・デッドバグ）で脊椎を支える筋肉を強化することも重要。週3回、1回60分のプログラムで最大効果が得られます。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "女性ホルモン（エストロゲン）低下時の骨粗しょう症対策は？",
      answer: "更年期や閉経後、エストロゲン低下により骨密度が急速に低下します。この時期は特に筋トレが重要です。エストロゲンの低下は補えませんが、筋肉による骨への物理的負荷は増やせます。同時に、カルシウム・ビタミンD・タンパク質の摂取を強化し、医師の指示下でホルモン補充療法（HRT）の検討も視野に。パーソナルトレーニングと栄養管理の組み合わせが最強の予防策です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "既に骨粗しょう症がある場合、どのようなトレーニングを避けるべきですか？",
      answer: "高強度の落下・ジャンプ・激しいねじり動作は避けてください。椎体圧迫骨折のリスクがあります。避けるべき動作：バーベルスクワットの高重量、ジャンプ系トレーニング、腰をねじる動作（ロシアンツイスト）、過度な前かがみ。推奨トレーニング：自体重やライトダンベルを使ったスクワット、ウォーキング、水中運動、ストレッチ。パーソナルトレーナーに骨粗しょう症の診断を事前に伝え、安全なプログラムを作成してもらいましょう。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "骨粗しょう症予防に必要な栄養素と、トレーニング効果を高めるための食事のポイントは？",
      answer: "最重要3つの栄養素：①カルシウム（1日1,000～1,200mg）：乳製品・小魚・緑黄色野菜から。②ビタミンD（1日600～800IU）：きのこ・鮭・卵から。カルシウム吸収率が7倍向上します。③タンパク質（1日体重×1.0～1.2g）：骨基質形成に必須。鶏肉・魚・卵・豆製品から。トレーニング直後30分以内に20～25gのタンパク質摂取で筋肉と骨の同時形成を促進。定期的な栄養相談でアドバイスを受けることをお勧めします。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymOsteoporosisPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "骨粗しょう症予防のパーソナルトレーニング" },
  ];

  const pageTitle = "骨粗しょう症予防・改善のパーソナルトレーニング｜50・60代の骨密度低下対策";
  const pageUrl = `${baseSiteUrl}/column/gym-osteoporosis/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="骨粗しょう症のメカニズム、パーソナルトレーニングによる骨密度向上のメカニズム、50・60代向けの効果的なトレーニング方法、女性ホルモン低下時の対策、安全なトレーニングと避けるべき動作、骨密度向上に必要な栄養素（カルシウム・ビタミンD・タンパク質）についてわかりやすく解説します。"
        path="/column/gym-osteoporosis/"
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
              description: "骨粗しょう症のメカニズム、パーソナルトレーニングによる骨密度向上、50・60代向けの効果的なトレーニング方法、女性ホルモン低下時の対策、安全なトレーニングと避けるべき動作、骨密度向上に必要な栄養素についてわかりやすく解説します。",
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
              健康・年代別
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              骨粗しょう症は、転倒による大腿骨頸部骨折が寝たきりの主原因になるほど、高齢者の生活の質を大きく低下させる疾患です。しかし、適切なパーソナルトレーニングは、骨密度を実際に増加させ、骨粗しょう症を予防・改善できる唯一の方法です。本記事では、骨粗しょう症のメカニズム、パーソナルトレーニングが骨密度向上に効果的な理由、50・60代向けの具体的なトレーニングプログラム、女性特有の課題（エストロゲン低下による骨密度急速低下）への対策、安全なトレーニングと避けるべき動作、そして骨密度向上に必要な栄養素について、詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                骨粗しょう症とは―メカニズムと危険性
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                骨粗しょう症は、単なる「骨が弱くなる」ことではなく、医学的に重大な疾患です。その実態を理解することが、予防と改善の第一歩です。
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨密度とは何か</h3>
                    <p className="text-gray-600">骨は見た目では固く見えますが、内部はスポンジ状で、カルシウムとコラーゲンで構成されています。骨密度は、この骨内のカルシウム含有量を示す指標。骨密度が低下すると、骨がスカスカになり、転倒時に簡単に骨折してしまいます。骨密度は年1～1.5％低下するため、30年で30～45％失われます。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">加齢による骨密度低下</h3>
                    <p className="text-gray-600">30代までは骨密度が増加します。40代以降、徐々に低下を始め、50代で加速。特に女性は閉経により、エストロゲン低下によって年3～5％の加速度的低下が5～7年続きます。70代の女性は、30代比で30～40％の骨密度を失っている状態です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">大腿骨頸部骨折の危険性</h3>
                    <p className="text-gray-600">骨粗しょう症患者の転倒による大腿骨頸部骨折は、寝たきりの主原因（寝たきりの約1/4）。一度寝たきりになると、二次的な健康障害（誤嚥性肺炎、血栓症など）により、死亡リスクが大幅に増加します。転倒予防と骨密度向上は、健康寿命延伸の最優先課題です。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">骨代謝と運動の関係</h3>
                    <p className="text-gray-600">骨は常に破骨細胞（古い骨を破壊）と骨芽細胞（新しい骨を形成）のバランスで再形成されています。加齢とともに骨芽細胞の活動が低下しますが、適切な物理的負荷（運動）により、この活動を刺激し、骨形成を促進できます。これが、運動による骨密度向上のメカニズムです。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルトレーニングが骨粗しょう症予防に最も効果的な理由
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                医薬品や食事改善だけでは不十分です。パーソナルトレーニングは、骨に直接的な物理的負荷をかけ、骨形成を促進する唯一の方法です。
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">骨芽細胞の活性化</h3>
                  <p className="text-gray-700 mb-3">レジスタンストレーニングにより、骨に圧負荷がかかり、骨芽細胞が刺激されます。この刺激により、細胞は新しい骨を形成するタンパク質を産生。医学的研究では、週3回の筋トレにより、骨芽細胞のマーカー（P1NP）が30～50％増加することが報告されています。つまり、骨は確実に「作られている」のです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">骨密度の実質的向上</h3>
                  <p className="text-gray-700 mb-3">週3回のレジスタンストレーニング（特に下肢トレーニング）により、1～3年で骨密度が1～3％向上することが複数の研究で実証されています。薬物療法と異なり、骨の質も改善されるため、実際の強度が向上します。特に大腿骨近位部（股関節周辺）と脊椎の骨密度向上が顕著です。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">筋肉増加による転倒予防</h3>
                  <p className="text-gray-700 mb-3">同時に、レジスタンストレーニングは筋肉量を増やし、バランス能力を向上させます。骨密度が向上すると同時に、転倒そのものを予防できるため、二重のメリットが得られます。脚の筋力が強い高齢者は、転倒時も骨折しないことが多いです。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">全身的な健康改善</h3>
                  <p className="text-gray-700 mb-3">パーソナルトレーニングは、骨密度だけでなく、筋力向上、血糖値低下、血圧改善、精神的ストレス軽減など、多面的な健康効果をもたらします。これらの改善により、骨折後の回復力も向上し、全体的な健康寿命が延伸されます。</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                50・60代向け骨密度向上トレーニングプログラム
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                年齢と骨の状態に応じた、段階的なトレーニングプログラムを実施することが重要です：
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">1. 下肢レジスタンストレーニング（25分）</h3>
                  <p className="text-gray-600 text-sm">スクワット、レッグプレス、レッグエクステンション、レッグカール。大腿骨と脊椎に最も効果的な負荷。中程度の重量（RPE6～7/10）、高い反復回数（12～15回×3セット）で実施。骨密度の急速低下を防止できる最優先トレーニング。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2. 体幹・脊椎トレーニング（15分）</h3>
                  <p className="text-gray-600 text-sm">プランク、サイドプランク、デッドバグ、バードドッグ。脊椎周りの深い筋肉を強化し、脊椎を支える力を向上。脊椎圧迫骨折予防に極めて重要。高強度ではなく、フォーム重視で実施。毎日の習慣化が効果的。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">3. 上肢レジスタンストレーニング（15分）</h3>
                  <p className="text-gray-600 text-sm">ダンベルベンチプレス、ベンチプルオーバー、ショルダープレス。腕の骨（橈骨・尺骨）の骨密度向上。転倒時に手で支えるときの骨折予防にも有効。中程度の重量で実施。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">4. バランス・転倒予防トレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">片足立ち、タンデムウォーク、ボス（バランスボール）運動。筋肉よりも神経系の改善に効果的。転倒そのものを予防。年配者ほど重要。毎回のトレーニング最後に実施。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">5. 柔軟性トレーニング（10分）</h3>
                  <p className="text-gray-600 text-sm">ストレッチ、ヨガ。関節可動域を維持し、転倒時の怪我の程度を軽減。リラックス効果も。高強度なトレーニング後のクールダウンとして活用。</p>
                </div>
              </div>
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>推奨スケジュール：</strong> 週3回、1回60～75分。月・水・金またはそれに準ずる。初期段階（0～8週）は軽い重量で正確なフォーム習得に集中。中期（9～16週）で徐々に負荷を増加。長期継続（6ヶ月以上）で骨密度向上が顕著になります。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                安全なトレーニングと避けるべき動作
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                骨粗しょう症患者は、特に脊椎圧迫骨折のリスクが高いため、安全性の考慮が必須です：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">避けるべき高リスク動作</h3>
                    <p className="text-gray-600">高強度バーベルスクワット（特に高重量）、デッドリフト（高重量）、ジャンプ・落下運動、腰をねじる動作（ロシアンツイスト、ゴルフスイング）、過度な前かがみ動作（床から重い荷物を持ち上げる）。これらは脊椎圧迫骨折や椎間板損傷のリスクが高い。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">推奨トレーニング方式</h3>
                    <p className="text-gray-600">軽～中程度の重量（RPE5～7/10）、高い反復回数（12～20回）で実施。自体重や軽いダンベル・マシンを使用。必ず正確なフォームを優先。腰を丸めたり、無理な姿勢は避ける。トレーニング前に十分なウォームアップ（15分）を実施。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">医師の許可と定期的な相談</h3>
                    <p className="text-gray-600">既に骨粗しょう症の診断を受けている場合は、医師の許可を得てからトレーニングを開始。DEXA検査（骨密度測定）の結果を基に、パーソナルトレーナーと共有し、リスク評価に基づいたプログラムを作成。3～6ヶ月ごとに医師に進捗を報告し、トレーニング内容の調整を検討。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                骨密度向上に不可欠な栄養戦略
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                トレーニングと栄養は車の両輪。栄養不足では、いくら運動しても骨密度は向上しません：
              </p>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">1. カルシウム（1日1,200～1,500mg）</h3>
                  <p className="text-gray-700 mb-3">骨の主成分。乳製品（牛乳200mL×3杯で600mg）、小魚（イワシ・サバ缶）、緑黄色野菜（小松菜・ブロッコリー）から。毎食カルシウム源を意識的に取ることが重要。目安：朝食にヨーグルト＋牛乳、昼食に小魚、夕食に小松菜の味噌汁で目標達成。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">2. ビタミンD（1日800～1,000IU）</h3>
                  <p className="text-gray-700 mb-3">カルシウム吸収を促進する必須栄養素。ビタミンD不足だと、カルシウムを摂取しても吸収されません。鮭・きのこ・卵黄から。または朝日を浴びる（皮膚でビタミンDが合成される）。高齢者は吸収低下が著しいため、サプリメント補給も有効。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">3. タンパク質（1日体重×1.0～1.2g）</h3>
                  <p className="text-gray-700 mb-3">骨基質（コラーゲン）の形成に必須。カルシウムだけでなく、タンパク質なしに骨形成は起こりません。鶏肉・魚・卵・乳製品・豆製品から。トレーニング直後30分以内に20～30gのタンパク質摂取で、筋肉と骨の同時形成を促進。プロテインサプリメントの活用も推奨。</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-900 mb-3">4. マグネシウム・ビタミンK（補助栄養素）</h3>
                  <p className="text-gray-700 mb-3">マグネシウムはカルシウムの吸収を助け、ビタミンKは骨タンパク質の形成に必須。ほうれん草・アボカド・ナッツから。カルシウム：マグネシウム＝2：1の比率が理想的。</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>栄養管理のポイント：</strong> 栄養サプリメント（カルシウム・ビタミンD）の活用も有効。特に高齢者は食事からの吸収が低下するため、医師や栄養士の指導を受け、個別化された栄養計画を立てることをお勧めします。パーソナルジムが栄養指導サービスを提供している場合は、積極的に活用しましょう。
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                女性特有の骨粗しょう症対策：エストロゲン低下への対応
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                閉経による女性ホルモン（エストロゲン）の急激な低下は、男性の10倍の速度で骨密度を低下させます。対策は複合的です：
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ホルモン補充療法（HRT）の検討</h3>
                    <p className="text-gray-600">医師と相談し、ホルモン補充療法を検討。HRTにより、骨密度低下速度を大幅に減速できます。ただしリスク・ベネフィットの判断が必要なため、個別化された医学的判断が必須。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">エストロゲン様物質の食事からの補給</h3>
                    <p className="text-gray-600">大豆製品に含まれるイソフラボン（エストロゲン様作用）の摂取。毎日納豆＋豆腐＋豆乳で補給。ただし過剰摂取は避ける。効果はHRTより低いが、安全性が高い。</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">強化されたレジスタンストレーニング</h3>
                    <p className="text-gray-600">閉経後の女性は、更年期前の女性以上に強力なトレーニングが必要。週3回の中～高強度レジスタンストレーニング（男性並みの強度）により、薬物療法がなくても骨密度低下を抑制できます。医師の許可のもと、積極的なトレーニングを推奨。</p>
                  </div>
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
              骨粗しょう症を予防し、健康寿命を延伸する
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              骨粗しょう症は予防可能であり、既に発症していても改善可能な疾患です。パーソナルトレーニングと栄養管理の組み合わせで、50・60代からでも骨密度を向上させ、転倒に強い体を作ることができます。全国のパーソナルジムから、あなたに最適なジムを見つけましょう。
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
                href="/column/gym-menopause/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  更年期とパーソナルトレーニング
                </h3>
                <p className="text-sm text-gray-600">
                  40・50代女性の更年期症状と骨密度低下への対策
                </p>
              </Link>
              <Link
                href="/column/gym-senior/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  高齢者向けパーソナルトレーニング
                </h3>
                <p className="text-sm text-gray-600">
                  60・70代の筋力低下と転倒予防
                </p>
              </Link>
              <Link
                href="/column/gym-women-50/"
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                  50代女性向けパーソナルジム
                </h3>
                <p className="text-sm text-gray-600">
                  年代別の体の変化と効果的なトレーニング
                </p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
