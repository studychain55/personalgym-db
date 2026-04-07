import type { GetStaticProps } from "next";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDBreadcrumbs } from "@/components/UI/JsonLD";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchAllStationsWithCount } from "@/utils/supabase/fetchStations";
import type { GymFaq } from "@/types";

interface StationListPageProps {
  stations: Array<{
    station: string;
    gym_count: number;
  }>;
}

export const getStaticProps: GetStaticProps<StationListPageProps> = async () => {
  const stations = await fetchAllStationsWithCount();

  // Revalidate every 24 hours
  return {
    props: {
      stations: stations.slice(0, 100), // Limit to top 100 stations
    },
    revalidate: 86400,
  };
};

export default function StationListPage({ stations }: StationListPageProps) {
  const breadcrumbItems = [{ label: "駅から探す" }];

  return (
    <Layout>
      <SEO
        title="駅から探す | パーソナルジムナビ"
        description="駅別にパーソナルジムを検索できます。あなたの最寄駅周辺のパーソナルジムを料金・口コミで比較。"
        path="/station/"
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mt-4">駅から探す</h1>
        <p className="text-sm md:text-base text-gray-600 mt-3">
          あなたの最寄駅周辺のパーソナルジムを検索できます。駅から近いジムを料金・口コミで比較して、あなたに合ったジムを見つけましょう。
        </p>

        {/* SEO Description Section */}
        <section className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">駅別パーソナルジム検索について</h2>
          <p className="text-gray-700 mb-2">
            パーソナルトレーニングジムを選ぶ際、「通いやすさ」はとても重要な要素です。当サイトでは、全国の駅別にパーソナルジムを掲載しており、最寄駅から近いジムを簡単に検索できます。
          </p>
          <p className="text-gray-700 mb-2">
            各ジムの詳細ページでは、駅からの距離・徒歩時間を記載しているため、通勤・通学ルート上にあるジムを見つけることができます。
          </p>
          <p className="text-gray-700">
            料金・プログラム・施設設備・口コミなど、複数の条件で比較しながら、あなたにぴったりのジムを選んでください。
          </p>
        </section>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">
          駅一覧（全{stations.length}駅）
        </h2>

        {stations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stations.map((station) => (
              <NextLink
                key={station.station}
                href={`/station/${encodeURIComponent(station.station)}/`}
                className="block p-4 rounded-lg border border-gray-200 bg-white hover:bg-orange-50 hover:border-orange-200 transition-colors no-underline"
              >
                <h3 className="font-semibold text-gray-900 text-lg">{station.station}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {station.gym_count}件のパーソナルジム
                </p>
              </NextLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            駅データがまだ登録されていません。
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">よくある質問</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                question: "駅別検索ではどのように駅を選べばよいですか？",
                answer:
                  "上記の駅一覧から、あなたの最寄駅を選択してください。その駅周辺のパーソナルジムが表示されます。",
              },
              {
                id: 2,
                question: "「徒歩○分」はどのように表記されていますか？",
                answer:
                  "各ジムの掲載情報に「徒歩○分」と記載されています。これは駅からのおおよその歩行時間です。実際の移動時間は個人差や季節によって異なる場合があります。",
              },
              {
                id: 3,
                question: "駅から遠いジムの場合、通うのに不便ですか？",
                answer:
                  "駅から少し離れていても、バスや自動車での移動が可能な場合があります。各ジムの詳細ページで「アクセス情報」を確認して、あなたの移動方法に合ったジムを選んでください。",
              },
              {
                id: 4,
                question: "掲載されていない駅周辺のジムを探すには？",
                answer:
                  "「エリアから探す」や「全国から探す」から、都道府県や市区町村で検索することもできます。こちらの検索方法をご利用ください。",
              },
            ].map((faq) => (
              <details
                key={faq.id}
                className="group border border-gray-300 rounded-lg p-4 hover:border-orange-300 transition-colors"
              >
                <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                  {faq.question}
                  <span className="ml-2 text-lg group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
