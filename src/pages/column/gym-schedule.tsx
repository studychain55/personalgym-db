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
      question: "パーソナルジムの最適な通う頻度は週何回ですか？",
      answer: "目標によって異なります。ダイエット目的なら週2～3回、筋力アップなら週2～4回、身体の維持なら週1～2回が目安です。初心者は週1～2回から始めて、徐々に増やしていくことをおすすめします。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "仕事が忙しい時の効果的なトレーニングスケジュールは？",
      answer: "週1回でも効果的です。その場合は1回のセッションで全身を効率的に鍛えるプログラムが必要になります。トレーナーに目標と時間的制約を伝え、カスタマイズしてもらいましょう。継続性が最も重要です。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "トレーニングと食事の調整タイミングはいつが最適ですか？",
      answer: "トレーニング前後の栄養補給が重要です。トレーニングの1～2時間前に炭水化物とタンパク質、トレーニング後30分～1時間以内にタンパク質と炭水化物を摂取すると効果的です。毎日の規則正しい食事も重要です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "スケジュール管理アプリやツールは何を使えばいい？",
      answer: "Google Calendar、スマートフォンのリマインダー機能、トレーニング管理アプリなどが便利です。多くのパーソナルジムは専用アプリで予約・スケジュール管理ができます。どのツールを使うにせよ、継続を優先に選びましょう。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "休息日の過ごし方について教えてください。",
      answer: "完全に休むのではなく、ウォーキングやストレッチなどの軽い活動がおすすめです。筋肉は休息中に成長するため、十分な睡眠（7～8時間）と栄養が重要です。過度な活動は避け、心身の回復に専念しましょう。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "急な予定でキャンセルした場合、どう対応すればいい？",
      answer: "できるだけ早くジムに連絡してください。多くのジムはキャンセルポリシーを定めており、直前キャンセルでも1回分の利用扱いになることがあります。予定を組む際は、確実に行ける時間帯を選ぶことが重要です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymSchedulePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムのスケジュール管理完全ガイド" },
  ];

  const pageTitle = "パーソナルジムのスケジュール管理完全ガイド｜通う頻度と時間調整";
  const pageUrl = `${baseSiteUrl}/column/gym-schedule/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの効果的なスケジュール管理方法を完全解説。最適な通う頻度、忙しい時の対応策、食事・睡眠との調整方法、スケジュール管理ツール、仕事と両立するコツをまとめました。"
        path="/column/gym-schedule/"
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
              description: "パーソナルジムの効果的なスケジュール管理方法を完全解説。最適な通う頻度、忙しい時の対応策、食事・睡眠との調整方法、スケジュール管理ツール、仕事と両立するコツをまとめました。",
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
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              スケジュール管理
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムの効果は、適切なスケジュール管理と継続性で決まります。このガイドでは、仕事や生活の中でパーソナルジムを効果的に組み込むための時間管理、最適な通う頻度、食事・睡眠との調整方法、スケジュール管理ツールの活用法をわかりやすく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                目標別・最適な通う頻度と回数
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムの効果は、通う頻度によって大きく変わります。以下は目標別の推奨頻度です。ただし、これはあくまで目安であり、個人の体質や生活スタイルで調整が必要です。
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3">ダイエット目的（1～3ヶ月で結果を出したい場合）</h3>
                  <p className="text-gray-700 mb-3">
                    週2～3回のトレーニングが推奨されます。週2回でも効果は期待できますが、週3回以上で結果が加速します。1回のセッションは60分が目安です。食事管理がトレーニングと同等に重要なため、トレーナーの食事指導を活用しましょう。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ <strong>週2回</strong>：確実な効果（3～4ヶ月で5～10kg減）</li>
                    <li>✓ <strong>週3回</strong>：加速的な効果（2～3ヶ月で5～10kg減）</li>
                    <li>✓ <strong>週4回以上</strong>：最大限の効果（ただし過度なオーバートレーニングに注意）</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-transparent rounded-lg p-5 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-900 mb-3">筋力アップ・ボディメイク目的</h3>
                  <p className="text-gray-700 mb-3">
                    週2～4回が推奨されます。筋肉成長には十分な休息が必要なため、週4回以上の場合は分割プログラム（上半身・下半身の日を分ける）が重要です。タンパク質摂取量も週4回以上の場合は意識的に増やしましょう。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ <strong>週2回</strong>：緩やかな筋力増強（効果実感は3～4ヶ月後）</li>
                    <li>✓ <strong>週3回</strong>：バランスの取れた筋力アップ（2～3ヶ月で効果実感）</li>
                    <li>✓ <strong>週4回以上</strong>：高速筋力増強（ただし恢復と栄養管理が必須）</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-transparent rounded-lg p-5 border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-900 mb-3">姿勢改善・体質改善目的</h3>
                  <p className="text-gray-700 mb-3">
                    週1～2回で十分です。姿勢改善は緩やかなプロセスで、3～6ヶ月で効果が実感できます。トレーナーから教わったストレッチやセルフケアを毎日行うことが重要です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ <strong>週1回</strong>：月1回の追加セッションで加速可能</li>
                    <li>✓ <strong>週2回</strong>：最適なペース（3～4ヶ月で姿勢改善実感）</li>
                    <li>✓ <strong>セルフケア</strong>：毎日5～10分のストレッチが重要</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                仕事と両立するスケジュール管理のコツ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                忙しい社会人でもパーソナルジムを継続するためのコツを5つ紹介します。
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">1.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">通いやすい時間帯を固定する</h3>
                    <p className="text-gray-600">「毎週月・木の19:00～20:00」など、同じ曜日・時間を固定することで、習慣化しやすくなります。朝活（6:00～7:00）やランチ時間帯、帰宅後の夜間など、自分のライフスタイルに合った時間を選びましょう。</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">2.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ジムの場所を自宅・職場の近くに選ぶ</h3>
                    <p className="text-gray-600">移動時間が短いほど、継続率が高まります。自宅から15分以内、または職場から駅まで5分以内のジムを選ぶと、急な時間変更にも対応しやすくなります。</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">3.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">早め目の予約・確保を心がける</h3>
                    <p className="text-gray-600">月初めに1ヶ月分の予約を入れることで、スケジュール調整がしやすくなります。できるだけ確実に参加できる日時を選び、急な変更は最小限に抑えましょう。</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">4.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">スケジュール管理アプリを活用する</h3>
                    <p className="text-gray-600">Google Calendar、スマートフォンのリマインダー、トレーニング管理アプリなどで、予約とリマインダーを一元管理します。ジムの予約システムと連携できるアプリを選ぶと、さらに便利です。</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="text-blue-700 font-bold flex-shrink-0">5.</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">キャンセルは早めに連絡する</h3>
                    <p className="text-gray-600">急な予定変更が避けられない場合は、できるだけ早くジムに連絡してください。直前キャンセルでもペナルティを最小化できることがあります。予約システムから自動キャンセルするより、電話やメールで直接連絡する方が、ジムとの関係も良好に保てます。</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                食事・睡眠・休息の適切なスケジュール調整
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                トレーニングと同等に重要なのが、食事・睡眠・休息の管理です。トレーニング効果を最大化するためのスケジュール調整を紹介します。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング前の栄養補給</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    トレーニング1～2時間前に、炭水化物とタンパク質を摂取します。これにより、トレーニング中のエネルギー不足を防ぎ、パフォーマンスが向上します。
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ ご飯とおかず（卵焼きなど）</li>
                    <li>✓ パン＋ハム＋チーズ</li>
                    <li>✓ バナナとプロテイン</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニング後の栄養補給</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    トレーニング後30分～1時間以内に、タンパク質と炭水化物を摂取します。「ゴールデンタイム」と呼ばれ、筋肉修復に最適です。
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ プロテイン＋バナナ</li>
                    <li>✓ 鶏肉＋ご飯</li>
                    <li>✓ ヨーグルト＋グラノーラ</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-3">毎日の食事スケジュール</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    朝・昼・夜の3食にタンパク質を含める、3時間ごとに栄養補給するなど、一日を通じた栄養管理が重要です。
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ 朝食：タンパク質20g</li>
                    <li>✓ 昼食：タンパク質25g</li>
                    <li>✓ 夜食：タンパク質25g</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3">睡眠スケジュール</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    筋肉は睡眠中に修復・成長します。毎日7～8時間の睡眠を、できるだけ同じ時間に寝ることが重要です。
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ 毎日23:00に寝て7:00に起床</li>
                    <li>✓ 睡眠1時間前のスマホ禁止</li>
                    <li>✓ 就寝30分前に温かい飲み物</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-300">
                <h3 className="font-bold text-gray-900 mb-3">休息日の過ごし方</h3>
                <p className="text-gray-700 mb-3">
                  週1～2日の完全な休息日を設けることで、心身の回復が促進されます。ただし、完全に何もしないのではなく、軽い活動が効果的です。
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ <strong>軽いストレッチ</strong>（10～15分）：筋肉の柔軟性向上、疲労回復</li>
                  <li>✓ <strong>ウォーキング</strong>（20～30分）：活動的な回復、心の安定</li>
                  <li>✓ <strong>瞑想・リラックス</strong>（10～20分）：メンタルリセット</li>
                  <li>✓ <strong>栄養バランスの良い食事</strong>：筋肉修復・エネルギー補充</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                スケジュール管理に便利なツール・アプリ
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                効果的なスケジュール管理には、適切なツールの活用が不可欠です。以下のツールを組み合わせることで、パーソナルジム通いが習慣化しやすくなります。
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Google Calendar</h3>
                  <p className="text-gray-700 mb-2">
                    ジムの予約、食事時間、睡眠時間を一元管理できます。スマートフォン・パソコン・タブレットで自動同期され、リマインダー通知も便利です。複数のカレンダーに色分けすることで、視覚的に管理しやすくなります。
                  </p>
                  <p className="text-sm text-gray-600">推奨：予約1日前にリマインダー設定</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">スマートフォン標準リマインダー</h3>
                  <p className="text-gray-700 mb-2">
                    iPhone の「リマインダー」、Android の「Google Tasks」などの標準機能は、シンプルで使いやすいです。毎週同じ日時の繰り返し設定も可能です。
                  </p>
                  <p className="text-sm text-gray-600">推奨：予約15分前にアラーム設定</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">トレーニング管理アプリ（Strong、JEFIT等）</h3>
                  <p className="text-gray-700 mb-2">
                    トレーニング内容、セット数、重量、日付を記録します。進捗の可視化により、モチベーション維持に有効です。多くのジムが独自アプリを提供しているので、利用できるか確認しましょう。
                  </p>
                  <p className="text-sm text-gray-600">推奨：毎回のセッション直後に記録</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">LINE・メール通知</h3>
                  <p className="text-gray-700 mb-2">
                    多くのジムは LINE や メール で予約確認・リマインダーを送信します。スマートフォンにプッシュ通知を設定すると、予約忘れを防ぐことができます。
                  </p>
                  <p className="text-sm text-gray-600">推奨：ジムの通知設定をオンにする</p>
                </div>

                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">栄養管理アプリ（MyFitnessPal等）</h3>
                  <p className="text-gray-700 mb-2">
                    食事内容、カロリー、タンパク質量を記録します。トレーニング目標に合わせた栄養管理が可能です。トレーナーと数値を共有することで、より効果的な指導が受けられます。
                  </p>
                  <p className="text-sm text-gray-600">推奨：毎日の食事を記録し、タンパク質目標を設定</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                よくある悩みへの対処法
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                パーソナルジムに通う中で、スケジュール管理に関する悩みはよくあります。以下の対処法を参考にしてください。
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">悩み1：仕事の繁忙期で行けなくなる</h3>
                  <p className="text-gray-700">
                    事前に繁忙期を把握して、その前に多く通うか、短期間の休会制度を利用することをおすすめします。多くのジムは休会制度を用意しているため、トレーナーに相談しましょう。繁忙期後に復帰しやすくなります。
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">悩み2：疲れて行きたくなくなる</h3>
                  <p className="text-gray-700">
                    これは多くの人が経験する悩みです。トレーニング後に達成感を感じるまで続けること、トレーナーに気分や疲れを伝えることが大切です。軽めのセッションにしてもらうなど、柔軟に対応してもらえます。行ってしまえば、実際に気分がスッキリすることがほとんどです。
                  </p>
                </div>

                <div className="border-l-4 border-green-400 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">悩み3：朝仕事がある日の夜通い or 帰宅後の夜通い、どちらが良い？</h3>
                  <p className="text-gray-700">
                    どちらでも効果は同じです。継続できることが最優先なので、自分のライフスタイルで無理なく続けられる時間帯を選びましょう。朝活なら昼間の疲労を軽減、夜間なら仕事終了直後がストレス解消につながります。
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">悩み4：月1回しか行けない環境になった</h3>
                  <p className="text-gray-700">
                    月1回でも継続することに価値があります。ただし、効果が実感しにくいため、自宅でのセルフケア（ストレッチ、セルフトレーニング）を増やすことをおすすめします。トレーナーにセルフケアメニューを教えてもらい、月1回のセッションで修正してもらうという方法も有効です。
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-8 border border-blue-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                自分に合ったパーソナルジムを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                効果的なスケジュール管理は、自分のライフスタイルに合ったジム選びから始まります。通いやすい場所、融通の利く予約システム、サポート的なトレーナーがいるジムを選ぶことが重要です。
              </p>
              <p className="text-gray-700 mb-6">
                パーソナルジムナビでは、あなたの希望条件に合わせたジムを検索できます。複数のジムの体験セッションを受けて、自分に最適なジムを見つけましょう。
              </p>
              <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
                パーソナルジムを探す →
              </Link>
            </section>
          </div>
        </article>
      </div>
    </Layout>
  );
}
