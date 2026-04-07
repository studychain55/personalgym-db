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
      question: "パーソナルジムで怪我を予防するために最も重要なことは何ですか？",
      answer: "フォーム指導とウォームアップの重要性を理解することです。正確なフォームでトレーニングを実施することで、怪我リスクが大幅に減少します。同時に、セッション開始前の十分なウォームアップが、筋肉と関節を適切に準備し、怪我予防に最も効果的です。パーソナルジムのトレーナーは、この2つを徹底指導します。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "初心者がトレーニングを始める前に確認すべきことは？",
      answer: "トレーナーに過去の怪我・関節の不具合・医学的な既往歴を詳しく伝えることが重要です。また、初回セッション時には『ウォームアップを軽く見ない』『焦って負荷を上げない』『正確なフォームを習得する』の3つを心がけましょう。怪我予防は、最初の数週間の準備が全てです。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "セッション中に関節に違和感を感じたらどうする？",
      answer: "『ピリッと走る痛み』『グキッという感覚』『動きの引っかかり』などは、即座に運動を中止してトレーナーに報告してください。軽い筋肉の疲労感とは異なり、これらの症状は靭帯・軟骨・神経の損傷の可能性があります。初期段階での対応が、重大な怪我への進行を防ぐ最も重要なステップです。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "ウォームアップで具体的には何をすればいい？",
      answer: "段階的に心拍数を上げるため、軽い有酸素運動（ジョギング・バイク）を3～5分行い、その後、動的ストレッチ（腕回し・レッグスウィング）を5～7分実施します。最後に、実施予定の種目を軽い負荷で練習し、神経系と筋肉を活性化させます。このプロセスが省略されると、怪我リスクが3倍以上に高まります。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "フォーム指導を受ける時のポイントは？",
      answer: "トレーナーが『静止した状態でのフォーム説明』だけでなく『実際の動き全体』を見てフィードバックしてくれるかを確認してください。スクワットなら『膝の位置』『腰の角度』『足幅』『視線』など、複数のポイントを同時に指導するトレーナーは、怪我予防の意識が高いです。初回セッションでこの指導の質が全て決まります。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "怪我を予防しながら効果的にトレーニングを続けるコツは？",
      answer: "『段階的な負荷増加』『回復日の確保』『定期的なフォーム見直し』の3つです。毎セッション負荷を上げるのではなく、フォームが完璧になってから次のステップに進むことで、怪我を防ぎながら長期的な成長が実現します。パーソナルジムのトレーナーは、この進捗管理が専門です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymInjuryPreventionPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムでのケガ予防｜フォーム指導とウォームアップの重要性" },
  ];

  const pageTitle = "パーソナルジムでのケガ予防｜フォーム指導とウォームアップの重要性";
  const pageUrl = `${baseSiteUrl}/column/gym-injury-prevention/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムでのケガ予防を完全解説。正確なフォーム指導、効果的なウォームアップ、初心者が避けるべき7つの行動、セッション中の違和感への対応、段階的な負荷増加のコツを紹介。"
        path="/column/gym-injury-prevention/"
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
              description: "パーソナルジムでのケガ予防を完全解説。正確なフォーム指導、効果的なウォームアップ、初心者が避けるべき7つの行動、セッション中の違和感への対応、段階的な負荷増加のコツを紹介。",
              url: pageUrl,
              datePublished: "2026-04-07",
              dateModified: "2026-04-07",
              author: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "ExerciseGym",
                name: "パーソナルジムナビ",
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
              安全なトレーニング
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでのケガ予防は、単なる「注意」ではなく、『正確なフォーム指導』と『適切なウォームアップ』という2つの柱で実現します。多くの初心者が焦って負荷を上げたり、ウォームアップを省略したりすることで、予防可能なケガを引き起こしてしまいます。このガイドでは、パーソナルジムのトレーナーが実践するケガ予防方法、効果的なウォームアップの手順、フォーム指導の見分けるポイント、初心者が避けるべき7つの行動を詳しく解説します。セッション中に違和感を感じた時の正確な判断基準、段階的な負荷増加のロードマップまで、長期的に安全にトレーニングを続けるための実践知識を網羅しています。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: フォーム指導の重要性 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                フォーム指導がケガ予防の基本
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムの最大の利点は『正確なフォーム指導』です。独学でトレーニングを行う場合、誤ったフォームが定着し、ケガのリスクが高まります。トレーナーによるリアルタイムのフォーム修正が、ケガ予防に最も効果的です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">誤ったフォームから生じる3つのリスク</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    不正確なフォームでトレーニングを続けると、時間とともにケガのリスクが累積します。初期段階での修正が、長期的なケガ予防に繋がります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">1</span>
                      <div>
                        <strong>関節への過度な負荷</strong>
                        <p className="text-gray-600">膝・腰・肩などの関節が本来の動き以外の角度で負荷を受け、関節炎や靭帯損傷のリスクが高まる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">2</span>
                      <div>
                        <strong>筋肉の片側への負荷集中</strong>
                        <p className="text-gray-600">動きが非対称だと、一方の筋肉への負荷が増加し、アンバランスな筋肉発達と肉離れのリスク</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">3</span>
                      <div>
                        <strong>神経系統への悪影響</strong>
                        <p className="text-gray-600">継続的な誤ったフォームが神経系に定着し、修正が困難になり、慢性的なケガに繋がる</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">優秀なトレーナーのフォーム指導の5つの特徴</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ケガ予防に力を入れるトレーナーには、共通の特徴があります。体験セッションで以下を確認しましょう。
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-2">✓ 複数のポイントを同時指導</p>
                      <p>スクワットなら「膝の位置・腰の角度・足幅・視線・呼吸」など5～7つのポイントを同時に指導する。単一の指摘だけでなく、全体的なフォーム修正を行う。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-2">✓ 鏡またはビデオで確認</p>
                      <p>動画撮影してセッション後に一緒に見直したり、鏡の前で動きを確認させたりする。言葉だけの説明ではなく、視覚的な確認を重視する。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-2">✓ 身体接触による修正</p>
                      <p>クライアントの肩・腰・膝などに軽く触れて、正しい位置・動きを身体で理解させる。感覚的に学ぶことで、より早く習得できる。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-2">✓ 段階的な習得プロセス</p>
                      <p>初回は軽い負荷・少ないセット数で、フォームが完璧になってから負荷を上げる。焦らず段階的に進める計画を立てる。</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-2">✓ 個人差への対応</p>
                      <p>身体の柔軟性・関節の可動域・既往歴に応じて、フォームをカスタマイズする。全員に同じフォームを強要しない。</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">初心者が避けるべき「焦った負荷増加」</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    多くの初心者は『早く効果を出したい』という気持ちから、フォームが完成していないうちに負荷を上げてしまいます。これは最もケガのリスクが高い行動です。
                  </p>
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <p className="font-bold text-red-900 mb-2">危険な負荷増加パターン</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・初回セッション後に「もっと重い負荷でしたい」と要望する</li>
                      <li>・2～3週間でダンベル重量を大幅に上げる</li>
                      <li>・セット数を無視して、1セッションで多数の種目を実施</li>
                      <li>・休息日を取らず、毎日同じ部位をトレーニングする</li>
                      <li>・トレーナーのアドバイスを無視して、自分のペースで進める</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>フォーム指導の価値：正確なフォームでのトレーニング＝ケガリスク最小化＋トレーニング効果最大化の実現です。パーソナルジムを選ぶ時は、フォーム指導にどれだけ時間をかけるかを確認しましょう。</strong>
                </p>
              </div>
            </section>

            {/* Section 2: 効果的なウォームアップ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ケガを予防する効果的なウォームアップの手順
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ウォームアップは『トレーニング時間の無駄』ではなく、『ケガ予防の投資』です。セッション時間が限られている場合、メインのトレーニングを減らしてもウォームアップは省略しないことが原則です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">段階的ウォームアップの理想的な流れ（15分）</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムで実施される理想的なウォームアップには、4つのフェーズがあります。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-2">フェーズ1：軽い有酸素運動（3～5分）</p>
                      <p className="text-gray-700 text-sm">目的：心拍数を段階的に上げ、全身の血流を改善する</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>・ジョギング：時速8～10km程度のペース</li>
                        <li>・ステーショナリーバイク：軽い負荷で回転</li>
                        <li>・ローイングマシン：ゆっくりとした動き</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-2">フェーズ2：動的ストレッチ（5～7分）</p>
                      <p className="text-gray-700 text-sm">目的：筋肉の可動性を向上させ、関節の滑液分泌を促進</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>・腕回し：20～30回の回転運動</li>
                        <li>・レッグスウィング：前後左右各20回</li>
                        <li>・キャットストレッチ：背骨を柔軟に</li>
                        <li>・体をひねり動かし：全身の可動性向上</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-2">フェーズ3：種目別軽負荷練習（3～5分）</p>
                      <p className="text-gray-700 text-sm">目的：その日のトレーニング種目の動きを神経系に刻み込む</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>・スクワット予定なら、軽いダンベルまたはバーのみで5～10回</li>
                        <li>・ベンチプレス予定なら、バーのみで10～15回</li>
                        <li>・動きを完璧にすることを優先（速度ではなく正確性）</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-2">フェーズ4：呼吸と神経系活性化（1～2分）</p>
                      <p className="text-gray-700 text-sm">目的：精神的にトレーニングに集中できる状態を作る</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>・深呼吸を5～10回（鼻からゆっくり吸って、口からゆっくり吐く）</li>
                        <li>・メンタルセット：本日のトレーニングの目標を確認</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">セッション日の天気・疲労度に応じた調整</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ウォームアップは固定的ではなく、その日の状態に応じて柔軟に調整する必要があります。優秀なトレーナーは、この調整を自動で行います。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>疲労度が高い日</strong>
                        <p className="text-gray-600">ウォームアップを1～2分延長し、有酸素運動の時間を増やして心拍数をゆっくり上げる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>関節の不具合がある日</strong>
                        <p className="text-gray-600">動的ストレッチの時間を延長し、その部位の可動域改善に注力する</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">●</span>
                      <div>
                        <strong>体調が良い日</strong>
                        <p className="text-gray-600">ウォームアップを短縮し、メインのトレーニング時間を増やしても良い場合がある</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>ウォームアップの投資効果：15分のウォームアップ＝ケガリスク70～80%削減＋トレーニング効果20～30%向上です。時間に余裕がない場合は、セッション時間を延長してでもウォームアップを優先しましょう。</strong>
                </p>
              </div>
            </section>

            {/* Section 3: 初心者が避けるべき7つの行動 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                初心者が避けるべきケガのリスクを高める7つの行動
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                多くの初心者は、無自覚のうちにケガのリスクを高める行動をしてしまいます。以下の7つは、パーソナルジムの現場で最も多く見られる危険パターンです。
              </p>

              <div className="space-y-3">
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動1：ウォームアップの省略</h3>
                  <p className="text-gray-700 text-sm">「時間がもったいない」という理由でウォームアップを削る。これはケガリスクを10倍以上に高めます。体温が上がっていない筋肉は、わずかな力でも損傷します。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動2：フォーム習得前の負荷増加</h3>
                  <p className="text-gray-700 text-sm">「軽い負荷は効果がない」と考えて、フォームが完成していないうちに重い負荷でトレーニング。誤ったフォームで重い負荷を使うほど危険なことはありません。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動3：トレーナーのアドバイスを無視</h3>
                  <p className="text-gray-700 text-sm">トレーナーが「今は負荷を上げるな」と言っているのに、自分の判断で追加負荷をかける。トレーナーはケガ予防の専門家です。アドバイスに従うことが最優先です。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動4：反動を使った動き</h3>
                  <p className="text-gray-700 text-sm">「より多くの回数をしたい」という理由で、反動をつけてダンベルを上げ下げする。反動は関節に予期しない負荷をかけ、肉離れや靭帯損傷の原因になります。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動5：一週間毎日同じ部位をトレーニング</h3>
                  <p className="text-gray-700 text-sm">「体を変えたい」という焦りから、脚を毎日トレーニングするなど、同じ部位を連続で酷使。筋肉が修復される前に新たなダメージが加わり、オーバートレーニング症候群に陥ります。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動6：セッション中の違和感を無視</h3>
                  <p className="text-gray-700 text-sm">「痛みじゃなければ大丈夫」と、関節の違和感やピリッとした感覚を無視して継続。初期段階での対応がないと、軽い症状が重大なケガに進行します。</p>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-2">❌ 行動7：既往歴をトレーナーに隠す</h3>
                  <p className="text-gray-700 text-sm">「過去の怪我を知られたくない」という理由で、膝や腰の既往歴を隠す。トレーナーはこの情報がないと、適切なプログラムが作成できず、再怪我のリスクが極度に高まります。</p>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>初心者の心構え：『早く効果を出したい』という気持ちは大切ですが、『長く安全に続ける』ことを最優先にしましょう。短期的な焦りが、長期的な回復期間を生み出します。</strong>
                </p>
              </div>
            </section>

            {/* Section 4: セッション中の違和感への対応 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                セッション中に違和感を感じた時の正確な判断と対応
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                トレーニング中に『痛み』と『違和感』は全く異なります。その区別ができれば、ケガの初期段階での対応が可能です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">「継続できる筋肉疲労」と「中止すべき痛み」の区別</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    この区別が正確にできることが、ケガ予防の最も重要なスキルです。
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-50 border-b border-gray-300">
                          <th className="text-left p-3 border border-gray-300">項目</th>
                          <th className="text-left p-3 border border-gray-300">継続できる疲労感</th>
                          <th className="text-left p-3 border border-gray-300">中止すべき痛み</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">痛みの質</td>
                          <td className="p-3 border border-gray-300">鈍く圧迫感のある感覚</td>
                          <td className="p-3 border border-gray-300">鋭く、ピリッと走る痛み</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">発生部位</td>
                          <td className="p-3 border border-gray-300">筋肉全体に広がる感覚</td>
                          <td className="p-3 border border-gray-300">局所的・一点集中の痛み</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="p-3 border border-gray-300 font-bold">動きやすさ</td>
                          <td className="p-3 border border-gray-300">普通に動かせる</td>
                          <td className="p-3 border border-gray-300">動くと痛む、引っかかり感</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-300 font-bold">対応</td>
                          <td className="p-3 border border-gray-300">継続でOK、むしろ継続すると効果増加</td>
                          <td className="p-3 border border-gray-300">即座に中止してトレーナーに報告</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">関節の「違和感」の主な症状と初期対応</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    以下のような違和感は、靭帯・軟骨・神経の損傷の初期段階である可能性があります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-orange-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>『グキッ』『ゴリッ』という感覚</strong>
                        <p className="text-gray-600">関節が『外れかけた』ような不快感。靭帯や軟骨の損傷の可能性。即座に中止。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>動きの『引っかかり』</strong>
                        <p className="text-gray-600">スムーズに動かないような感覚。軟骨の損傷や炎症の初期段階。即座に中止。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>『ピリッ』と走る痛み</strong>
                        <p className="text-gray-600">神経や靭帯に関わる鋭い痛み。肉離れや神経圧迫の可能性。即座に中止。</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-700 font-bold flex-shrink-0">⚠</span>
                      <div>
                        <strong>『ズキズキ』という脈動的な痛み</strong>
                        <p className="text-gray-600">炎症が進んでいる可能性。過度な腫れやアイシングが必要。即座に中止。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">違和感を感じた時の初期対応フロー</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    初期段階での対応が、その後の経過を大きく左右します。以下のフローを実行してください。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">ステップ1：運動を中止</p>
                      <p className="text-gray-700 text-sm">『もう少し続けたい』という気持ちを抑え、直ちに運動を中止する。初期段階での中止が、症状の進行を防ぎます。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">ステップ2：トレーナーに報告</p>
                      <p className="text-gray-700 text-sm">「どこがどのような感覚で違和感があるのか」を詳しく説明。トレーナーが原因を判断し、対応を決定します。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">ステップ3：軽いストレッチまたは安静</p>
                      <p className="text-gray-700 text-sm">トレーナーの指示に従い、軽いストレッチで対象部位をほぐすか、安静にします。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">ステップ4：セッション後のアイシング</p>
                      <p className="text-gray-700 text-sm">セッション後15～20分、患部に氷をあてる。炎症を最小化することが重要です。</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900">ステップ5：翌日も違和感が続けば医師に相談</p>
                      <p className="text-gray-700 text-sm">セッション後1日経っても違和感が残れば、医師または整形外科医に相談し、診断を受けてください。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>初期対応の価値：違和感に気付いて即座に対応＝軽症で済む。放置＝重大なケガに進行。初期段階での判断と対応が全てです。</strong>
                </p>
              </div>
            </section>

            {/* Section 5: 段階的な負荷増加のロードマップ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ケガ予防と効果のバランスを保つ段階的負荷増加
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                効果を出しながらケガを予防する最大のコツは『段階的な負荷増加』です。焦らず計画的に進めることが、長期的な成功の鍵です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">理想的な3ヶ月の負荷増加プラン</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムのプロトレーナーが推奨する、安全で効果的な進捗パターンです。
                  </p>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">月1～2週：フォーム習得期（軽負荷・多回数）</p>
                      <p className="text-gray-700 text-sm mt-2">• スクワット：ダンベル5kg以下、20回×3セット<br/>• ベンチプレス：バーのみまたは10kg以下、15回×3セット<br/>• 目的：完璧なフォームの習得。外的な負荷よりも『動きの正確性』を優先</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">月2～3週：軽負荷段階（軽負荷・やや高回数）</p>
                      <p className="text-gray-700 text-sm mt-2">• スクワット：ダンベル7.5～10kg、15回×3セット<br/>• ベンチプレス：バー＋5kg程度、12回×3セット<br/>• 目的：フォームを維持しながら、やや高い負荷に慣れ始める段階</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">月3～4週：中負荷段階（中程度負荷・中程度回数）</p>
                      <p className="text-gray-700 text-sm mt-2">• スクワット：ダンベル12.5～15kg、10回×3セット<br/>• ベンチプレス：バー＋10kg程度、10回×3セット<br/>• 目的：筋力増加と筋肥大のバランスの取れた段階</p>
                    </div>

                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900">月4～6週：高負荷段階（高負荷・低回数）</p>
                      <p className="text-gray-700 text-sm mt-2">• スクワット：ダンベル20kg以上、8回×3セット<br/>• ベンチプレス：バー＋20kg以上、8回×3セット<br/>• 目的：最大筋力の向上と筋肥大の本格化</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">「停滞と感じたら負荷を上げない」の原則</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    多くの初心者は「効果が感じられない」と負荷を上げてしまいますが、実は筋肉は着実に成長しています。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>停滞を感じた場合の対応1：セット数を増やす</strong>
                        <p className="text-gray-600">負荷ではなく、セット数を3→4セットに増やし、総負荷量を増加させる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>停滞を感じた場合の対応2：フォームを見直す</strong>
                        <p className="text-gray-600">トレーナーに「フォームがぶれていないか」をチェックしてもらう。フォーム改善で意外に効果が高まる</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>停滞を感じた場合の対応3：2～3週間待つ</strong>
                        <p className="text-gray-600">急激な負荷増加ではなく、現在の負荷で2～3週間継続し、筋肉が成長するまで待つ</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>長期的な成功の秘訣：『焦らず段階的に進める』ことで、ケガを予防しながら確実に結果を出すことができます。初心者ほど、この原則を守ることで、1年後に大きな差が生まれます。</strong>
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
