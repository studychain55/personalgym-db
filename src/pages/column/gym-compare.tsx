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
      question: "複数のジムを比較する場合、何社くらい比較すべきですか？",
      answer: "最低でも2～3社、理想は3～5社の比較をおすすめします。2社では比較対象が不足し、5社以上だと情報が多すぎて判断が難しくなります。3社あれば、料金、トレーナーの質、施設設備の違いが明確に見えます。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "体験レッスンで聞くべき重要な質問は？",
      answer: "①月額料金と入会金、追加料金の詳細、②キャンセルポリシーと違約金、③食事指導の内容と頻度、④トレーナー変更は可能か、⑤返金保証制度の有無、⑥設備の詳細（シャワー、ロッカー等）、⑦契約期間と解約方法。これらを複数社で比較することで、自分に最適なジムが見つかります。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "無理な勧誘に対してどう対処すればよいですか？",
      answer: "体験後に勧誘されても、焦らず「他のジムも比較してから決めたい」と明確に伝えましょう。その場で決めなくてよいと明言してくれるジムは信頼できます。逆に「今日中に決めないと値段が変わる」と急かすジムは避けるべきです。複数比較が基本です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "同じ金額のジムでも選び方に違いはありますか？",
      answer: "料金が同じでも、内容は大きく異なります。月額50,000円でも、トレーナー変更不可のジムと自由に変更できるジムでは価値が異なります。1回あたりの時間、食事指導の範囲、施設設備など、トータルで判断することが大切です。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "オンライン相談と実地体験、どちらを優先すべきですか？",
      answer: "必ず実地体験を優先してください。オンライン相談で基本情報を確認した後、気になったジムは実際に訪問し、施設環境、スタッフの対応、トレーナーの指導スタイルを直接確認することが重要です。実地でしか分からない情報が多くあります。",
      sort_order: 5,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymComparePage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムを複数比較する方法" },
  ];

  const pageTitle = "パーソナルジムを複数比較する方法｜体験レッスンの活用術";
  const pageUrl = `${baseSiteUrl}/column/gym-compare/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="複数のパーソナルジムを比較するメリットと方法を解説。比較する際の7つのチェックポイント、体験レッスンの活用法、無理な勧誘への対処法、最終的な決め手となるポイントをまとめました。"
        path="/column/gym-compare/"
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
              description: "複数のパーソナルジムを比較する方法と体験レッスンの活用術",
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
              ジム選びの比較術
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジム選びで成功する秘訣は「複数比較」です。このガイドでは、複数のパーソナルジムを比較するメリット、比較する際の7つのチェックポイント、体験レッスンを最大限活用する方法、無理な勧誘への対処法、最終的な決め手となるポイントを詳しく解説します。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 複数比較のメリット */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                複数のパーソナルジムを比較するメリット
              </h2>
              <p className="text-gray-700 mb-6">
                1社のみ選んだ場合と複数比較した場合では、満足度が大きく変わります。以下のメリットを参考に、複数社の体験を受けることをおすすめします。
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">
                    1. 相場価格が明確に見える
                  </h4>
                  <p className="text-gray-700 text-sm">
                    複数社の料金を比較することで、「この金額が相場なのか、それとも高いのか」が判断できます。同じサービス内容でも、ジムによって価格が異なります。
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">
                    2. トレーナーの質の違いが分かる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    複数のトレーナーから指導を受けることで、説明の分かりやすさ、フォーム修正の丁寧さ、指導スタイルの違いが明確に見えます。
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-900 mb-2">
                    3. 施設環境を比較できる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    同じ料金のジムでも、設備の充実度、清潔さ、スタッフの対応に差があります。複数比較により、最適な環境が見つかります。
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">
                    4. 契約内容の落とし穴を発見できる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    あるジムでは「月額50,000円」でも、A社は食事指導が週1回なのに対し、B社は月8回と大きく異なります。比較により、本当の価値が見えます。
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-900 mb-2">
                    5. 最悪の選択を避けられる
                  </h4>
                  <p className="text-gray-700 text-sm">
                    複数比較により、「強引な勧誘をするジム」「質の低いトレーナー」「契約に隠れた落とし穴がある」といった問題を事前に発見できます。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 比較する際のチェックポイント */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                比較する際のチェックポイント7選
              </h2>
              <p className="text-gray-700 mb-6">
                複数のジムを比較する際、以下の7つのポイントを確認することで、最適なジムが見つかります。体験前にチェックリストを作成し、記入することをおすすめします。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. 料金体系の詳細
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 入会金：0円 or 有料？いくら？</li>
                      <li>・ 月額料金：月額制？回数制？</li>
                      <li>・ 1回あたりの料金：実際はいくら？</li>
                      <li>・ 追加料金：食事指導、更衣室利用に費用あり？</li>
                      <li>・ キャンペーン：期間限定割引あり？</li>
                      <li>・ 返金保証：あり？条件は？</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    複数社の「トータル費用」を計算。見かけの料金だけでなく、実際の負担額を比較することが大切です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    2. トレーナーの質と資格
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 国家資格/認定資格を持っているか（NESTA、JATI、NSCAなど）</li>
                      <li>・ パーソナルトレーニング経験は何年か</li>
                      <li>・ あなたの目的に関する指導経験があるか</li>
                      <li>・ 定期的に資格更新や研修を受けているか</li>
                      <li>・ トレーナー変更は可能か（別料金？）</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    体験時に「このトレーナーなら続けられるか」を判断することが重要です。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    3. 食事指導の内容
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 食事指導は付いているか（オプション？）</li>
                      <li>・ 指導頻度はどのくらい（週1回？月1回？）</li>
                      <li>・ LINEなどでの相談は可能か</li>
                      <li>・ 栄養学の知識を持つトレーナーか</li>
                      <li>・ 厳しすぎない指導か（継続可能か）</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    ダイエット目的なら食事指導は必須。指導の厚さで、効果が大きく変わります。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    4. 立地とアクセス
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 自宅/職場からの距離（徒歩何分？）</li>
                      <li>・ 駅からのアクセス（駅前？）</li>
                      <li>・ 駐車場の有無（料金？）</li>
                      <li>・ 営業時間（朝活/夜間対応？）</li>
                      <li>・ 通勤ルート上にあるか</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    立地が最も継続率に影響します。できるだけ近いジムを優先しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    5. 施設設備の充実度
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 器材の種類と数（十分か？）</li>
                      <li>・ 清潔さ（トイレ、ロッカー）</li>
                      <li>・ シャワー完備か（仕事帰り利用の場合必須）</li>
                      <li>・ ロッカーは鍵かかる？</li>
                      <li>・ ドライヤーはあるか</li>
                      <li>・ 更衣室は広いか（混雑度は？）</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    仕事帰りに通う場合、シャワーとロッカーは重要です。実際に確認しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    6. 契約・解約条件
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 契約期間（3ヶ月？6ヶ月？自由？）</li>
                      <li>・ 違約金の有無と金額</li>
                      <li>・ 中途解約は可能か</li>
                      <li>・ クーリングオフ制度の対象か</li>
                      <li>・ キャンセルポリシー（予約キャンセルは何日前？）</li>
                      <li>・ 返金保証の条件</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    ここで落とし穴があります。契約内容を十分に確認し、不明な点は必ず質問しましょう。
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    7. スタッフ対応とジムの雰囲気
                  </h4>
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-2">確認項目：</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>・ 受付スタッフの対応は親切か</li>
                      <li>・ トレーナーの説明は分かりやすいか</li>
                      <li>・ 質問に丁寧に答えてくれるか</li>
                      <li>・ 施設全体の雰囲気は良いか</li>
                      <li>・ 他の利用者との距離感は適切か</li>
                      <li>・ 強引な勧誘がないか</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-sm">
                    長期間通う環境なので、スタッフ対応と雰囲気は重要な判断材料です。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: 体験レッスンを活用する */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験レッスンを最大限活用する方法
              </h2>
              <p className="text-gray-700 mb-6">
                体験レッスンは、実際のジムの環境とトレーナーの質を確認できる貴重な機会です。以下のポイントを意識することで、より多くの情報を得られます。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験前の準備
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-yellow-50 p-4 rounded">
                      <h4 className="font-bold text-yellow-900 mb-2">チェックリストを作成する</h4>
                      <p className="text-gray-700 text-sm">上記の7つのチェックポイントをもとに、比較表を作成。体験後、その場で記入すると、ジムの違いが明確に見えます。</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded">
                      <h4 className="font-bold text-yellow-900 mb-2">複数のジムを予約する</h4>
                      <p className="text-gray-700 text-sm">できれば1週間程度で、3～5社の体験を集約。違いを比較しやすくなります。</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded">
                      <h4 className="font-bold text-yellow-900 mb-2">質問事項を事前に整理する</h4>
                      <p className="text-gray-700 text-sm">忘れやすい細かい質問（キャンセルポリシーなど）をメモに書き、体験時に聞きもらさないようにしましょう。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験中に確認すること
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">トレーナーの説明スタイル</h4>
                      <p className="text-gray-700 text-sm">説明が分かりやすいか、難しい専門用語を使いすぎていないか、あなたの話を聞いてくれているか、これらが長期継続のポイントです。</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">フォーム修正の丁寧さ</h4>
                      <p className="text-gray-700 text-sm">正しいフォームで行えなかった場合、トレーナーが丁寧に修正してくれるか。これが指導の質の大きな違いです。</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">施設環境の印象</h4>
                      <p className="text-gray-700 text-sm">見学時に感じた清潔さ、他の利用者の雰囲気、スタッフの対応など、直感的な感覚も大切です。</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">自分の目的への理解度</h4>
                      <p className="text-gray-700 text-sm">カウンセリングで、あなたの目的や悩みを十分に理解しようとするか。本当に親身になってくれるトレーナーかどうかが重要です。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    体験後に質問すべき項目
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      <span className="font-bold">料金関係：</span> 「他のジムとの比較で割引はありますか？」「回数・期間を変更する場合の手続きは？」
                    </li>
                    <li>
                      <span className="font-bold">契約関係：</span> 「クーリングオフの対象ですか？」「クレジットカード以外の支払い方法は？」
                    </li>
                    <li>
                      <span className="font-bold">トレーナー関係：</span> 「このトレーナーで続いた場合、指導内容の変更はいつから？」
                    </li>
                    <li>
                      <span className="font-bold">その他：</span> 「返金保証の詳細を書面でもらえますか？」「体験後の営業電話はありますか？」
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: 無理な勧誘への対処 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                無理な勧誘への対処法
              </h2>
              <p className="text-gray-700 mb-6">
                体験後、無理な勧誘を受けることもあります。以下の対処法で、焦らず判断することが大切です。
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    避けるべき勧誘の典型例
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>・ 「今日中に決めないと、この値段は今日限りです」</li>
                    <li>・ 「今すぐ契約したら○○円割引」という期間限定割引</li>
                    <li>・ 「もう枠がほぼ埋まっています」と焦らせようとする</li>
                    <li>・ 契約書を十分に読む時間をくれない</li>
                    <li>・ 質問に明確に答えず、勧誘を続ける</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-3">
                    推奨される対応方法
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">1. 明確に伝える</p>
                      <p className="text-gray-700 text-sm">「複数のジムを比較してから決めたいのですが」と、はっきり伝えましょう。誠実なジムなら理解してくれます。</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">2. 焦らない</p>
                      <p className="text-gray-700 text-sm">「今日中に決めないと損」という勧誘には応じないこと。正当な割引ならば後日でも対応してくれます。</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">3. 契約書を持ち帰る</p>
                      <p className="text-gray-700 text-sm">可能であれば、契約書をコピーしてもらい、自宅で十分に読んでから判断しましょう。</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm mb-1">4. 比較結果で判断</p>
                      <p className="text-gray-700 text-sm">他のジムとの比較が終わった後、冷静に判断することが最も重要です。</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">
                    信頼できるジムの特徴
                  </h4>
                  <p className="text-gray-700 text-sm">
                    「複数のジムを比較してから決めるのは良いことです」と言ってくれるジムは信頼できます。また、契約後の返金保証制度があるジムも、自信を持っていることの表れです。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 最終的な決め手 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                最終的な決め手となるポイント
              </h2>
              <p className="text-gray-700 mb-6">
                複数のジムを比較した後、最終決定する際に重視すべきポイントは何か、優先順位をつけることが大切です。
              </p>

              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    優先順位の付け方
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700 text-sm mb-2">
                        <span className="font-bold">最優先：「継続できるか」</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        立地、営業時間、料金が自分の生活パターンに合致しているか。これなしで効果は出ません。
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700 text-sm mb-2">
                        <span className="font-bold">第2優先：「トレーナーとの相性」</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        体験時に「このトレーナーなら信頼できるか」を判断。相性の良さが継続率を大きく左右します。
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700 text-sm mb-2">
                        <span className="font-bold">第3優先：「目的に合った指導内容」</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        ダイエット目的なら食事指導の厚さ、筋力アップなら高度なトレーニング知識など、目的に適したプログラムがあるか。
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700 text-sm mb-2">
                        <span className="font-bold">第4優先：「施設設備の充実度」</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        快適な環境で、継続率が上がります。ただし、極端に高級な施設である必要はありません。
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700 text-sm mb-2">
                        <span className="font-bold">最後：「料金の安さ」</span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        料金も重要ですが、続かないジムは安くても意味がありません。予算範囲内で、上記を満たすジムを選びましょう。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    決定時の最終チェック
                  </h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <p>立地が本当に通いやすいか（試しに実際に通ってみた）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <p>料金に隠れた追加費用がないか（書面で確認した）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <p>契約期間と解約条件に納得したか（書面を読んだ）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <p>返金保証制度は本当に有効か（条件を理解した）</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                      <p>トレーナーとの相性に確信があるか（複数回の体験を受けた）</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: FAQ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                よくある質問
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <details key={index} className="border-b border-gray-200 pb-4">
                    <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-700">
                      {faq.question}
                    </summary>
                    <p className="text-gray-700 mt-3 ml-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Articles */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/column/gym-choosing/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルジムの選び方
                  </h3>
                  <p className="text-sm text-gray-600">
                    失敗しないジム選びの7つのチェックポイント。目的別の選び方を解説。
                  </p>
                </Link>
                <Link
                  href="/column/gym-trial/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    体験入会ガイド
                  </h3>
                  <p className="text-sm text-gray-600">
                    無料体験の活用法、複数社の比較方法、失敗しない体験活用法をまとめました。
                  </p>
                </Link>
                <Link
                  href="/column/gym-trainer/"
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-800 mb-2 hover:text-blue-700">
                    パーソナルトレーナーの選び方
                  </h3>
                  <p className="text-sm text-gray-600">
                    資格・経験・相性を確認する方法。良いトレーナーの見極め方をまとめました。
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
                全国のパーソナルジム情報を掲載。複数比較して、自分に最適なジムを見つけることができます。
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
