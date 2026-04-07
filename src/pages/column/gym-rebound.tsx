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
      question: "パーソナルジム卒業後、リバウンドを防ぐための最低限の運動量は？",
      answer: "週2～3回、1回30～40分の軽めのトレーニングが目安です。完全にゼロ運動にならなければ、急激なリバウンドは起きにくくなります。ただし、食事管理を同時に行うことが最も重要です。運動だけに頼らず、タンパク質摂取と食事バランスの維持を優先してください。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "自宅でのトレーニングで、パーソナルジムの成果を維持できますか？",
      answer: "自宅トレーニングでも維持は可能ですが、強度が落ちやすくなります。パーソナルジムでは週2～3回の高強度トレーニングで筋肉が刺激されていたため、自宅では同じ強度を出しにくいのが現実です。ダンベルなどの軽い器材を購入し、パーソナルジムで習ったメニューを継続することをおすすめします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "体重が増え始めたら、すぐにジムに戻るべきですか？",
      answer: "いいえ、まずは食事と運動で3～4週間対応してください。少しの体重増加は水分や糖質の蓄積の場合が多く、すぐにジムに戻る必要はありません。ただし、2～3kg以上増加した場合や、対応後も増加が止まらない場合は、パーソナルジムで短期集中するのもよい選択肢です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "リバウンド後に、再度パーソナルジムに通う場合の効率的な契約期間は？",
      answer: "最初の3ヶ月を目安に考えてください。リバウンド状態からの回復は、最初からのダイエットより早く、約3ヶ月で元の体に戻りやすいです。その後は食事管理をメインに、月1～2回のトレーニングで維持する方が経済的です。月額制より回数制の契約がおすすめです。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "リバウンド防止のために、パーソナルジム卒業後どのくらいの頻度で通うべき？",
      answer: "理想は月2～4回の定期メンテナンス通いです。この頻度であれば、筋肉量の低下を防ぎながら、食事管理の重要性を定期的に確認できます。月1回以下になると筋肉低下が進みやすく、月2回以上の通所により、着実にリバウンド防止効果が出ます。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymReboundPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジム卒業後のリバウンドを防ぐ方法" },
  ];

  const pageTitle = "パーソナルジム卒業後のリバウンドを防ぐ方法｜食事管理と継続トレーニング";
  const pageUrl = `${baseSiteUrl}/column/gym-rebound/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジム卒業後のリバウンド防止方法を完全解説。リバウンドの原因、ジム卒業後の食事管理、自宅トレーニング方法、体重管理の習慣化、リバウンド後の対処法をまとめました。"
        path="/column/gym-rebound/"
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
              description: "パーソナルジム卒業後のリバウンド防止方法",
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
              卒業後の継続・リバウンド防止
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジムでせっかく手に入れた体を維持したいのに、卒業後にリバウンドしてしまう方は少なくありません。このガイドでは、リバウンドが起こる原因、ジム卒業後の食事管理方法、自宅で実践できるトレーニング、体重管理の習慣化、リバウンド後の対処法を詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: リバウンドが起きる理由 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                なぜパーソナルジム卒業後にリバウンドが起きるのか
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジムで目標を達成した後、多くの人がリバウンドを経験します。その理由は、ジムを卒業することで、それまで続けていた「トレーニング」と「食事管理」の両方が一度に失われることです。
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    1. カロリー制限の反動
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルジム中は厳しい食事管理を受けていました。卒業後、この制限がなくなると、制限されていたものを無意識に摂取してしまいます。これが「反動太り」として現れやすいのです。特に、卒業直後1～3ヶ月が最も危険な時期です。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    2. 筋肉量の低下
                  </h4>
                  <p className="text-gray-700 text-sm">
                    ジムを卒業すると、週2～3回の高強度トレーニングが失われます。筋肉は使わなくなると低下するため、基礎代謝が落ちます。1ヶ月で3～5%の筋肉低下が起きやすく、このわずかな代謝低下が、数ヶ月後の体重増加につながります。
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    3. トレーニングの継続困難
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルジムでは「トレーナーの指導」と「金銭的コスト」という2つの要素が、継続を強制していました。卒業後、自分一人で継続することは想像以上に難しく、やがてトレーニングが完全にストップしてしまいます。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    4. 食事管理の継続困難
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルジム中は、トレーナーが食事をチェックしていました。卒業後、この「監視」がなくなると、徐々に食事管理が緩くなります。最終的には、完全に意識が薄れて、元の食習慣に戻ってしまうパターンが非常に多いです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 食事管理 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ジム卒業後に維持するための食事管理方法
              </h2>
              <p className="text-gray-700 mb-6">
                リバウンド防止の最大のコツは、「食事管理の継続」です。トレーニングと違い、食事管理は毎日実践するものであり、これが維持の決め手になります。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. タンパク質摂取を優先する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    毎日のタンパク質摂取を、パーソナルジム中と同じ量（目安：体重×2g）を継続してください。タンパク質は、筋肉維持に最も重要な栄養素です。毎食ごとに意識的に摂取することで、筋肉低下を40～50%遅らせることができます。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 朝食：卵、ヨーグルト、プロテインなど（20～30g）</li>
                    <li>・ 昼食：肉・魚・豆類など（25～35g）</li>
                    <li>・ 夜食：肉・魚・鶏胸肉など（25～35g）</li>
                    <li>・ 補食：プロテイン、チーズなど（15～20g）</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 夜遅い食事と間食を制限する
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジム中に避けていた「夜遅い食事」と「間食」が、リバウンドの最大の敵です。これらを完全にゼロにする必要はありませんが、週3日以上を避けることで、体重増加を最小限に抑えられます。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 夜8時以降の食事は控える（やむを得ない場合は軽食のみ）</li>
                    <li>・ 間食は週2～3回の決まった時間のみ</li>
                    <li>・ アルコールは週1～2回に限定</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 週1回のチートデイを設定する
                  </h4>
                  <p className="text-gray-700 text-sm">
                    完全な制限は続きません。週1回は「好きなものを食べる日」を設定することで、心理的な負担を減らし、継続しやすくなります。この日を設定することで、他の6日間の食事管理が続きやすくなるという心理効果もあります。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: 自宅トレーニング */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                自宅でできる継続トレーニング方法
              </h2>
              <p className="text-gray-700 mb-6">
                パーソナルジム卒業後、週2～3回のトレーニングを続けることが理想ですが、自宅トレーニングでも工夫次第で筋肉維持は可能です。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    最小限の器材で効率的に
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    自宅トレーニングに必要な器材は最小限で十分です。パーソナルジムで習ったメニューを、自宅で再現できる環境を作りましょう。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ ダンベル（10～20kg）：大胸筋、背中、肩のトレーニング用</li>
                    <li>・ ヨガマット：コアトレーニングやストレッチ用</li>
                    <li>・ 懸垂棒：背中トレーニング用（オプション）</li>
                    <li>・ トレーニングベンチ（オプション）</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    週2回30～40分のプログラム例
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムを卒業しても、週2回のトレーニングで筋肉量の低下を最小限に抑えられます。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                    <p className="font-semibold mb-2">1日目（上半身）：30分</p>
                    <ul className="space-y-1 mb-3">
                      <li>・ ダンベルベンチプレス：3セット</li>
                      <li>・ ダンベルロー：3セット</li>
                      <li>・ ショルダープレス：2セット</li>
                      <li>・ 腹筋：2セット</li>
                    </ul>
                    <p className="font-semibold mb-2">2日目（下半身）：30分</p>
                    <ul className="space-y-1">
                      <li>・ スクワット：3セット</li>
                      <li>・ ルーマニアンデッドリフト：3セット</li>
                      <li>・ 階段上り下り：2セット</li>
                      <li>・ ストレッチ：5分</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    YouTubeやアプリを活用する
                  </h4>
                  <p className="text-gray-700 text-sm">
                    パーソナルジムでメニューを習った後、自宅ではYouTubeやトレーニングアプリで、フォーム確認や新しいメニュー習得をしましょう。トレーナーの指導は失われますが、自分で学び続けることで、継続のモチベーションも上がります。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 体重管理 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                定期的な体重チェックの習慣化
              </h2>
              <p className="text-gray-700 mb-6">
                リバウンド防止の重要な要素は、「早期発見・早期対応」です。体重の変化を定期的にチェックすることで、リバウンドの初期段階で対策を打つことができます。
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    毎日の体重計測の習慣
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    毎日同じ時間（目安：朝食前、排便後）に体重を計測し、記録するようにしましょう。体重は毎日変動するため、1日の変化に一喜一憂するのではなく、週平均で判断することが大切です。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ 毎朝同じ時間に計測：朝食前、排便後が目安</li>
                    <li>・ スマートフォンアプリで記録：トレンド把握が容易</li>
                    <li>・ 週平均で判断：1日の変動は-1kg～+1kg程度は正常範囲</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    目標体重の±3kg範囲を超えたら警告信号
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジム卒業時の体重を目標体重として設定し、その体重から3kg以上増加したら警告信号です。この段階で、食事管理とトレーニングを見直しましょう。
                  </p>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-sm font-semibold text-red-900 mb-2">リバウンド段階別対応：</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>・ +1～2kg：食事管理の強化のみで対応</li>
                      <li>・ +2～3kg：食事管理＋週3～4回の自宅トレーニングを実施</li>
                      <li>・ +3kg以上：月1～2回のパーソナルジム利用を検討</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    月1回のフォトチェック
                  </h4>
                  <p className="text-gray-700 text-sm">
                    体重だけでなく、姿見での見た目チェック、全身写真の撮影も月1回行いましょう。体重は変わらなくても、筋肉が低下している場合もあり、見た目で筋肉状態を把握することができます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: リバウンド後の対処 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                リバウンドしてしまった場合の対処法
              </h2>
              <p className="text-gray-700 mb-6">
                万が一、3kg以上のリバウンドが発生した場合でも、適切な対応で回復可能です。重要なのは、「諦めずに早期対応する」ことです。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 食事管理を最優先に
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    リバウンド後は、食事管理を最優先にしましょう。最初の2～4週間は、パーソナルジム中と同じレベルの厳しい食事管理が必要です。この期間で50～70%のリバウンド解消が期待できます。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ タンパク質：体重×2～2.5g/日を意識的に摂取</li>
                    <li>・ 夜遅い食事：完全に制限</li>
                    <li>・ 間食：完全に制限</li>
                    <li>・ アルコール：完全に制限</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. 短期パーソナルジム利用を検討
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    3kg以上のリバウンドが発生した場合、月2回～週1回のペースで、3～4ヶ月間パーソナルジムに戻るのが効率的です。リバウンド回復は新規ダイエットより早く、3～4ヶ月で回復します。
                  </p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>・ リバウンド3kg：月2～3回、3ヶ月の短期契約</li>
                    <li>・ リバウンド5kg以上：月4回（週1回）、4ヶ月の契約を推奨</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. メンタルケアも重要
                  </h4>
                  <p className="text-gray-700 text-sm">
                    リバウンドは多くの人が経験するものであり、恥ずかしいことではありません。重要なのは「そこからどう対応するか」です。ネガティブにならず、早期対応することで、3～4ヶ月での回復は十分可能です。リバウンド経験を糧に、今後の維持方法を改善することが次のステップです。
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
                  href="/column/gym-diet/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムでダイエットを成功させる方法
                  </h3>
                  <p className="text-sm text-gray-600">
                    食事指導、トレーニング頻度、リバウンド防止のコツを解説。確実に目標達成するための方法。
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
                    挫折防止、モチベーション維持、継続のための実践的なコツをまとめました。
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
                    トレーニングと食事の組み合わせ、栄養補給、タンパク質摂取の最適化をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/training-frequency/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルトレーニングの通う頻度
                  </h3>
                  <p className="text-sm text-gray-600">
                    目標別の最適な通所頻度、効果的なプログラムを解説。
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
                全国のパーソナルジム情報を掲載。卒業後のメンテナンスや、リバウンド回復に適したジムが見つかります。
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
