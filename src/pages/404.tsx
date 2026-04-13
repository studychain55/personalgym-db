import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <Layout>
      <SEO
        title="ページが見つかりません"
        description="お探しのページは見つかりませんでした。"
        path="/404"
        noindex
      />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-[#1e782d]">404</h1>
        <p className="text-xl text-gray-600 mt-4">お探しのページは見つかりませんでした</p>
        <NextLink
          href="/"
          className="inline-block mt-8 bg-[#1e782d] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline"
        >
          トップページに戻る
        </NextLink>
      </div>
    </Layout>
  );
}
