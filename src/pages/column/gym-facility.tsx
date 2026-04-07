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
      question: "パーソナルジムの設備で必ず確認すべき3つのポイントは？",
      answer: "（1）マシンの種類が豊富で、ダンベルの重量範囲が広いか、（2）トレーニングスペースが十分で、個別トレーニングに支障がないか、（3）設備が新しく、定期的にメンテナンスされているか。これら3つを確認することで、継続通所時の満足度が大きく変わります。",
      sort_order: 1,
      is_global: false,
    },
    {
      id: 2,
      gym_id: null,
      question: "シャワー室が備わっていないパーソナルジムはどうしたらいい？",
      answer: "シャワーがないジムの場合、トレーニング後の着替え用タオルを複数持参するか、トレーニング後すぐに帰宅できる立地を選びましょう。近くに銭湯やジムのシャワールームがあるか事前確認が重要です。本気で継続するなら、シャワー完備のジムを選ぶことをお勧めします。",
      sort_order: 2,
      is_global: false,
    },
    {
      id: 3,
      gym_id: null,
      question: "男女混合ジムでのシャワー・ロッカーの安全性は？",
      answer: "良質なパーソナルジムでは、男女別のシャワー室・ロッカーが完備されています。体験時に確認し、更衣室が区切られているか、シャワーの隣同士の間隔は十分か、スタッフの配置が適切かをチェックしてください。不安があれば、女性専用ジムやプライベートシャワー付きジムを選ぶのも良い選択肢です。",
      sort_order: 3,
      is_global: false,
    },
    {
      id: 4,
      gym_id: null,
      question: "パーソナルジムの駐車場がない場合、代わりの選択肢は？",
      answer: "駐車場がない場合、近くの月極駐車場の料金を事前に確認しましょう。駅近くのジムなら、公共交通機関の利用を検討します。複数の通所方法を検討した上で、無理なく継続できる立地を選ぶことが重要です。体験時に実際に駐車・駅からのアクセスを確認するといいでしょう。",
      sort_order: 4,
      is_global: false,
    },
    {
      id: 5,
      gym_id: null,
      question: "パーソナルジムの設備清潔さを判断するポイントは？",
      answer: "床・トイレ・シャワー室の隅々をチェックしてください。カビやぬめりが目立つ、床に靴跡や汚れが目立つ場合は、清潔管理が不十分です。バスタオル・トレーニングマット・器具が毎日洗浄されているか、スタッフの清掃頻度を確認することも大切です。",
      sort_order: 5,
      is_global: false,
    },
    {
      id: 6,
      gym_id: null,
      question: "設備が古いジムと新しいジムで、トレーニング効果に違いはある？",
      answer: "設備の新旧より、自分の目標達成に必要なマシン・ダンベルが揃っているかが重要です。ただし、メンテナンス不足の古い設備は怪我のリスクが高まるため、最低限の安全性は確保されるべきです。設備よりトレーナーの質の方が、トレーニング効果への影響は大きいというのが実状です。",
      sort_order: 6,
      is_global: false,
    },
  ];

  setConditionalCacheHeaders(res, 1);

  return {
    props: { faqs },
  };
};

export default function GymFacilityPage({ faqs }: PageProps) {
  const breadcrumbItems = [
    { label: "コラム", href: "/column/" },
    { label: "パーソナルジムの設備・シャワー・ロッカーを事前確認するポイント" },
  ];

  const pageTitle = "パーソナルジムの設備・シャワー・ロッカーを事前確認するポイント";
  const pageUrl = `${baseSiteUrl}/column/gym-facility/`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="パーソナルジムの設備確認ポイントを詳解。マシン種類・重量範囲・スペース確認方法、シャワー室の有無と清潔さの確認方法、ロッカー・荷物置き場の実態、男女分離の重要性、駅近・駐車場などの立地条件、体験前に確認すべきチェックリスト。"
        path="/column/gym-facility/"
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
              description: "パーソナルジムの設備確認ポイントを詳解。マシン種類・重量範囲・スペース確認方法、シャワー室の有無と清潔さの確認方法、ロッカー・荷物置き場の実態、男女分離の重要性、駅近・駐車場などの立地条件、体験前に確認すべきチェックリスト。",
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
              ジム選びのコツ
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              パーソナルジム選びで「設備・シャワー・ロッカー」は看過しやすい要素ですが、継続通所を左右する極めて重要な要因です。優れたトレーナーと優良な料金体系でも、シャワーがなかったり、ロッカーが不足していたり、設備が古い・汚いジムでは、継続のモチベーションが低下してしまいます。このガイドでは、体験時に確認すべき設備ポイント、シャワー・ロッカー・更衣室の選び方、清潔さの判断基準、男女分離の重要性、駐車場・駅近など立地条件の影響、さらに体験前に必ず確認すべきチェックリストを、詳しく解説します。これらのポイントを押さえることで、「入会後に後悔した」という失敗を防ぎ、長期継続できるジムが見つかります。
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-10 space-y-8">
            {/* Section 1: 設備確認 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                パーソナルジムの設備を確認すべきポイント
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                パーソナルジムの設備は、トレーニングの質と継続性に大きな影響を与えます。体験時に重点的にチェックすべき項目を、優先度順に解説します。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">マシン・器具の種類と充実度</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ダンベル・バーベル・レッグプレス・チェストプレス・ラットプルダウンなど、主要なトレーニング機器が揃っているか確認します。特にダンベルの重量範囲が、初心者用（2～5kg）から上級者用（30kg以上）まで揃っているかが重要です。カスタマイズ可能なベンチやプーリーマシンの有無も、トレーニングの多様性を左右します。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">確認項目チェックリスト</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>☐ ダンベルが2kg～50kg以上の重量範囲で揃っているか</li>
                      <li>☐ ベンチプレス・インクラインベンチがあるか</li>
                      <li>☐ スミスマシン・ラックがあるか</li>
                      <li>☐ ラットプルダウン・チェストフライなどのマシンがあるか</li>
                      <li>☐ カーディオマシン（トレッドミル・バイク）は必要か</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">トレーニングスペースと個室レイアウト</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムは個別トレーニングが基本のため、トレーナー1人とクライアント1人が快適に動けるスペースが必須です。狭いと、正しいフォーム指導や動作チェックが難しくなり、トレーニング効果が低下します。個室型か、半個室型か、オープン型かは、プライバシーと落ち着き度に影響するため、自分の好みに合わせて確認しましょう。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">スペース確認のポイント</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>✓ 最低でも2mx3m以上のスペースがあるか</li>
                      <li>✓ ダンベルやバーベルを十分に扱えるか</li>
                      <li>✓ 他のクライアントが見えない（または見える）配置か</li>
                      <li>✓ 鏡が大きく、正しいフォームを確認できるか</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">設備の新しさとメンテナンス状況</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    最新の設備は快適ですが、古い設備がすべて悪いわけではありません。重要なのは「定期的にメンテナンスされているか」です。ダンベルが錆びていないか、ベンチのクッションは劣化していないか、マシンのピンはスムーズに動くか、など細部をチェックします。スタッフに「設備メンテナンスの頻度」を直接質問することも有効です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ダンベル・バーベルの状態</strong>
                        <p className="text-gray-600">錆やダメージがないか、グリップ感は良いか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>ベンチ・マシンの劣化</strong>
                        <p className="text-gray-600">クッションは適度な硬さか、グラつきはないか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>安全性の確保</strong>
                        <p className="text-gray-600">ラックは安定しているか、セーフティバーは機能するか</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>実際に触って確認を</strong>：体験時には遠慮なく器具を触って、重さ・安定性・使いやすさを確認しましょう。トレーナーに「このマシンはどのような筋肉に効きますか」と聞くことで、トレーナーの知識レベルも同時に判断できます。
                </p>
              </div>
            </section>

            {/* Section 2: シャワー・ロッカー */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                シャワー室・ロッカー・更衣室の完備状況確認
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                シャワー・ロッカー・更衣室の設備は、仕事帰りや朝の限られた時間の中での通所を可能にする、極めて重要な要素です。これらが不足していると、継続通所が困難になります。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">シャワー室の有無と特徴</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    パーソナルジムの多くが、トレーニング後のシャワー施設を備えています。確認すべきポイントは、シャワーの数（複数あるか）、水圧・温度の安定性、個別シャワーブースか、アメニティ（シャンプー・タオルなど）の完備度です。仕事帰りに通う場合、シャワーがないと職場で汗のままはたらくことになり、現実的ではありません。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">シャワー確認チェックリスト</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>☐ シャワー室の数（2個以上あるか）</li>
                      <li>☐ プライバシーは守られているか（カーテン・ドア）</li>
                      <li>☐ 水圧・温度は安定しているか（実際に試す）</li>
                      <li>☐ シャンプー・ボディソープは完備か</li>
                      <li>☐ バスタオルは持参か、レンタル・提供か</li>
                      <li>☐ ドライヤーはあるか</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">ロッカー・荷物置き場の十分性</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    仕事帰りに通う場合、スーツやバッグなど、大量の荷物を持ち込みます。小さなロッカーではスーツが皺くちゃになり、バッグが入らないこともあります。パーソナルジムはセキュリティが限られたスペースであることが多いため、貴重品管理がどうなっているか、十分に大きなロッカーがあるかを確認することが重要です。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">ロッカー確認項目</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>✓ ロッカーのサイズ（スーツが入るか）</li>
                      <li>✓ ロッカー数は十分か（複数セッション同時なら複数必要）</li>
                      <li>✓ 鍵がちゃんと機能するか</li>
                      <li>✓ 荷物置き台やハンガーはあるか</li>
                      <li>✓ 貴重品管理はどのようになっているか</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">更衣室・男女分離の状況</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    男女混合のパーソナルジムの場合、更衣室が完全に分離されているか、または個別の着替えスペースが設けられているかが、プライバシーと安心感に大きく影響します。特に女性にとっては、男性と更衣室を共有することに不安を感じることが多いため、最初から女性専用ジムを選ぶ、または男女別フロアのジムを選ぶことも選択肢です。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>男女分離の状況</strong>
                        <p className="text-gray-600">完全分離か、時間帯分離か、個別スペースか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>スタッフの配置</strong>
                        <p className="text-gray-600">女性スタッフが在籍しているか、緊急時の対応はどうか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>個別変更スペース</strong>
                        <p className="text-gray-600">トイレの個室利用か、独立した着替えルームがあるか</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>女性にとってのシャワー・ロッカー</strong>：女性がパーソナルジムを継続する際、設備の充実度がモチベーション維持に大きく影響します。メイク直しの鏡、ドライヤーの品質、シャンプー・トリートメントの質も重視する価値があります。高級なパーソナルジムではこれらに配慮していることが多いため、体験時に詳しく確認しましょう。
                </p>
              </div>
            </section>

            {/* Section 3: 清潔さ */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                設備の清潔さと衛生管理の確認方法
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                設備の清潔さは、ジムの運営姿勢を反映します。いくら豪華な設備でも、汚いジムでは継続できません。体験時に細部までチェックすることが重要です。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">目に見える汚れチェック</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    体験時には、目に見える汚れを細かくチェックしましょう。床の隅や角に汚れがないか、トイレ・シャワー室に水垢やカビがないか、器具に汗や油分が残っていないか、などを観察します。これらの汚れは、日常的なメンテナンスが不足していることを示す重要なサインです。
                  </p>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <p className="font-bold text-yellow-900 mb-2">詳細なチェック項目</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>・床：靴跡・汗の跡・ホコリが目立つ</li>
                      <li>・トイレ：便座・壁・床に汚れやカビ</li>
                      <li>・シャワー室：水垢・カビ・ヌメリ</li>
                      <li>・器具：ダンベル・ベンチに汗の跡・汚れ</li>
                      <li>・鏡：曇りや汚れで映りが悪い</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">臭いと空気質</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ジム内に入った時の臭いは、清潔さを判断する重要な指標です。汗くさいのは仕方ありませんが、カビ臭い・排水臭い・古い臭いがする場合は、通気設備や清掃が不十分な可能性があります。また、空気の流れが悪く、湿度が高いジムは、快適性が低く、疲労感も増します。
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <p className="font-bold text-gray-900 mb-2">空気質チェック</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>✓ 不快な臭いがしないか（カビ・排水臭など）</li>
                      <li>✓ 通気・換気設備が整っているか</li>
                      <li>✓ 湿度が高すぎないか（手がべたつく、鏡が曇る）</li>
                      <li>✓ 温度設定は快適か（冬暖かすぎないか、夏涼しいか）</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">衛生管理体制の確認</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    器具やマットは毎日洗浄・消毒されているか、タオル・バスマットはどのように管理されているか、スタッフの清掃頻度はどのくらいか、などを直接スタッフに質問することをお勧めします。答えが曖昧な場合は、日常的なメンテナンスが不十分な可能性があります。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">スタッフに確認する質問</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>「ダンベル・マット・器具は毎日洗浄していますか」</li>
                      <li>「トイレ・シャワーの清掃頻度はどのくらい」</li>
                      <li>「バスタオル・フェイスタオルはどう管理されていますか」</li>
                      <li>「設備のメンテナンスはどのくらいの頻度ですか」</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>清潔さは継続のモチベーション</strong>：「このジムは清潔で気持ちいい」という感覚は、継続通所を大きく促進します。体験時に不快感を感じたジムは、契約後に不快感が増すことが多いため、最初の印象を大切にしましょう。
                </p>
              </div>
            </section>

            {/* Section 4: 立地条件 */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                駅近・駐車場など立地条件の重要性
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                いくら優れたジムでも、アクセスが悪いと継続が困難になります。自分のライフスタイルに合わせた立地選択が、長期継続を左右する重要なファクターです。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">駅近・アクセスの利便性</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    仕事帰りに通う場合、駅から5分以内が理想的です。10分以上かかると、悪天候時や疲れているときに「ジムに行くのが面倒」と感じやすくなります。複数の路線が乗り入れている駅近のジムを選ぶと、通勤ルート変更時にも対応できます。体験時に実際に駅から歩いてみて、時間と負担を確認することをお勧めします。
                  </p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-bold text-blue-900 mb-2">駅近チェック</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>☐ 最寄駅から徒歩何分か（目安5分以内）</li>
                      <li>☐ 複数路線利用可能か</li>
                      <li>☐ 夜間の駅～ジム間は安全か</li>
                      <li>☐ 雨の日はどのようにアクセスするか</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">駐車場の有無と料金</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    車で通う場合、ジム直営の駐車場があるか、近くの月極駐車場がどのくらいか、月額費用がいくらかを確認することが重要です。駐車場がないジムでも、近くに安い月極駐車場があれば問題ありません。ただし、駐車場探しのストレスが、ジム通所のハードルを上げることもあるため、慎重に検討しましょう。
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <p className="font-bold text-green-900 mb-2">駐車場確認ポイント</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>✓ ジム直営の駐車場があるか</li>
                      <li>✓ 提携駐車場はあるか（割引はあるか）</li>
                      <li>✓ 近くの月極駐車場の料金は</li>
                      <li>✓ 月額ジム費用＋駐車場費用が許容範囲か</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">営業時間と自分のスケジュール</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    ジムの営業時間が、自分のスケジュールに合致していることは非常に重要です。朝5時から営業しているか、夜22時まで営業しているか、休業日はいつか、などを確認します。週に複数回通うつもりであれば、祝日営業も確認しましょう。営業時間が短いジムは、通い続けることが困難になる可能性があります。
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-purple-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>営業時間の確認</strong>
                        <p className="text-gray-600">自分が通いたい時間帯に営業しているか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>休業日</strong>
                        <p className="text-gray-600">定休日はいつか、祝日は営業しているか</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-700 font-bold flex-shrink-0">✓</span>
                      <div>
                        <strong>予約状況</strong>
                        <p className="text-gray-600">自分が通いたい時間帯は空いているか</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>「良いジムだけど続かなかった」の多くが立地問題</strong>：アクセスの悪さは、継続の大敵です。最初は「頑張って通う」という気合でカバーできても、疲れやストレスが溜まった時期に、アクセスの悪さが直撃します。立地条件は「ジム選びで最優先すべき要素」と言っても過言ではありません。
                </p>
              </div>
            </section>

            {/* Section 5: チェックリスト */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                体験前に確認すべき完全チェックリスト
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                体験時に忘れやすいポイントをまとめたチェックリストです。体験予約時にこのリストを印刷し、ジムで直接チェックすることをお勧めします。
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-transparent">
                  <h3 className="font-bold text-gray-900 mb-3">設備関連チェック項目（10項目）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>☐ ダンベルの重量範囲が十分か（2kg～50kg以上）</li>
                    <li>☐ 主要マシンが全て揃っているか</li>
                    <li>☐ トレーニングスペースは十分な広さか</li>
                    <li>☐ 鏡は大きく、フォーム確認が可能か</li>
                    <li>☐ 器具は新しく、メンテナンスされているか</li>
                    <li>☐ 安全ラック・セーフティバーは機能するか</li>
                    <li>☐ 床は清潔で、滑りやすくないか</li>
                    <li>☐ 通気・換気は良好か</li>
                    <li>☐ 温度・湿度は快適か</li>
                    <li>☐ 防犯カメラ・照明は十分か</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-transparent">
                  <h3 className="font-bold text-gray-900 mb-3">シャワー・ロッカー関連チェック（10項目）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>☐ シャワー室の数（2個以上）</li>
                    <li>☐ シャワーの水圧・温度は安定しているか（実際に試す）</li>
                    <li>☐ シャンプー・ボディソープは完備か</li>
                    <li>☐ バスタオルの提供または無料レンタルか</li>
                    <li>☐ ドライヤーはあるか（複数台）</li>
                    <li>☐ ロッカーのサイズは十分か（スーツが入るか）</li>
                    <li>☐ ロッカー数は十分か</li>
                    <li>☐ 鍵はしっかり機能するか</li>
                    <li>☐ 男女の更衣室は分離されているか</li>
                    <li>☐ プライバシーは守られているか</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-transparent">
                  <h3 className="font-bold text-gray-900 mb-3">立地・環境関連チェック（8項目）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>☐ 駅からの距離は徒歩5分以内か</li>
                    <li>☐ 複数路線の利用が可能か</li>
                    <li>☐ 駐車場があるか（なければ近くの月極駐車場を確認）</li>
                    <li>☐ 営業時間は自分のスケジュールに合致しているか</li>
                    <li>☐ 祝日は営業しているか</li>
                    <li>☐ 定休日はいつか</li>
                    <li>☐ 希望する時間帯に空きはあるか</li>
                    <li>☐ 周辺の安全性（特に夜間）は問題ないか</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-transparent">
                  <h3 className="font-bold text-gray-900 mb-3">清潔さ・衛生関連チェック（8項目）</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>☐ 床は清潔か（隅・角にホコリや汚れがないか）</li>
                    <li>☐ トイレは清潔か（便座・壁・床）</li>
                    <li>☐ シャワー室に水垢・カビはないか</li>
                    <li>☐ 不快な臭い（カビ臭・排水臭）がないか</li>
                    <li>☐ 器具に汗や油分が残っていないか</li>
                    <li>☐ 毎日の清掃体制は整っているか（スタッフに確認）</li>
                    <li>☐ 器具の消毒・洗浄は実施されているか</li>
                    <li>☐ タオル・マットの衛生管理は適切か</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>重要な項目でのNG判定</strong>：以下の項目で問題がある場合は、契約を避けることをお勧めします。①シャワー完備なしで仕事帰りに通うつもり、②ロッカーが極度に小さい、③清潔感が感じられない、④駅から15分以上、⑤営業時間が短い。これらは「後で良くなる」ことはほぼないため、最初から条件に合致したジムを選ぶことが重要です。
                </p>
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
              全国のパーソナルジムを比較
            </h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              設備・立地・サービスが充実したパーソナルジムを見つけましょう。全国のジム情報を検索・比較できます。
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
