import type { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { JsonLDBreadcrumbs } from "@/components/UI/JsonLD";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  setConditionalCacheHeaders(res, 1);

  return {
    props: {},
  };
};

export default function ColumnIndexPage() {
  const breadcrumbItems = [
    { label: "コラム" },
  ];

  const columns = [
    {
      title: "パーソナルジム初心者ガイド｜始め方・準備すること",
      description: "パーソナルジムが初めての方へ。始める前に必要な準備、最初に確認すべきポイント、初回面談で質問すべきことをまとめました。",
      path: "/column/gym-beginner/",
      date: "2026-04-07",
      category: "初心者向け",
    },
    {
      title: "パーソナルジムの料金相場を解説｜月額・都度払いの違い",
      description: "パーソナルジムの料金体系を徹底解説。都度払い、月額制、回数券の違い、相場費用をまとめた比較表を掲載しています。",
      path: "/column/gym-cost/",
      date: "2026-04-07",
      category: "費用",
    },
    {
      title: "パーソナルジムの選び方完全ガイド｜後悔しないための7つのチェックポイント",
      description: "パーソナルジム選びで失敗しないための7つのチェックポイント。目的別の選び方、トレーナーの質を見極める方法、立地・通いやすさ、体験レッスンの活用法をまとめました。",
      path: "/column/gym-choosing/",
      date: "2026-04-07",
      category: "ジム選びのコツ",
    },
    {
      title: "ダイエットにパーソナルジムをおすすめする理由",
      description: "ダイエット成功率が高いパーソナルジム。成功の秘訣、フィットネスジムとの違い、効果的なトレーニング方法を解説します。",
      path: "/column/diet-gym/",
      date: "2026-04-07",
      category: "ダイエット",
    },
    {
      title: "パーソナルトレーニングの通う頻度・回数の目安",
      description: "パーソナルトレーニングの最適な通所頻度を目標別に解説。ダイエット・筋力アップ・スポーツパフォーマンス向上など、目的別の通所回数の目安をまとめました。",
      path: "/column/training-frequency/",
      date: "2026-04-07",
      category: "トレーニング方法",
    },
    {
      title: "パーソナルジムの食事管理｜トレーニングと食事の組み合わせ",
      description: "パーソナルジムでの効果を最大化する食事管理方法を解説。タンパク質摂取量、トレーニング後の栄養補給、ダイエット・筋力アップ別の食事戦略をまとめました。",
      path: "/column/gym-nutrition/",
      date: "2026-04-07",
      category: "栄養管理",
    },
  ];

  return (
    <Layout>
      <SEO
        title="パーソナルジムコラム"
        description="パーソナルジムに関する役立つ情報をコラム形式でお届けします。初心者ガイド、費用相場、ダイエット方法など、パーソナルジムについて知りたい情報が満載です。"
        path="/column/"
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          パーソナルジムコラム
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          パーソナルジムに関する役立つ情報をコラム形式でお届けします。初心者向けガイドから費用相場、ダイエット方法まで、パーソナルジムについて知りたい情報が満載です。
        </p>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {columns.map((column, idx) => (
            <Link
              key={idx}
              href={column.path}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col border border-gray-200"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {column.category}
                  </span>
                  <span className="text-xs text-gray-500">{column.date}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex-grow line-clamp-3 hover:text-blue-700 transition-colors">
                  {column.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {column.description}
                </p>
                <div className="text-blue-700 font-semibold text-sm flex items-center gap-2">
                  記事を読む
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            あなたにぴったりのパーソナルジムを見つけましょう
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-gray-700">
            全国のパーソナルジム情報を掲載。料金、口コミ、トレーナー情報から自分にぴったりのジムが見つかります。
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
    </Layout>
  );
}
