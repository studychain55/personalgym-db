import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

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
        {/* CTAバナー */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 mt-4 text-center border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">施設を探したい方はこちら</p>
          <NextLink href="/all/" className="inline-block bg-[#1e782d] text-white font-bold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
            施設を探す →
          </NextLink>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-gray-800 font-medium">
            メール: info@personalgym-db.jp
          </p>
        </div>
      </div>
    </Layout>
  );
}
