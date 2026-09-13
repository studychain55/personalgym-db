import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import NextLink from "next/link";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。"
        path="/contact/"
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-gray-800 font-medium">
            メール: <a href="mailto:info@personalgym-db.jp" className="text-[#1e782d] hover:underline">info@personalgym-db.jp</a>
          </p>
        </div>
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <p className="font-bold text-lg mb-3">まずは無料でジムを探してみましょう</p>
          <NextLink href="/all/" className="inline-block bg-[#1e782d] text-white font-bold px-8 py-3 rounded-full hover:bg-[#155420] transition-colors">
            今すぐ無料で探す →
          </NextLink>
        </div>
      </div>
    </Layout>
  );
}
