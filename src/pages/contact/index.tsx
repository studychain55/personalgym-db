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
            メール: info@personalgym-db.jp
          </p>
          <p className="text-xs text-gray-500 mt-4 text-center">送信後1〜2営業日以内にご返信します。<NextLink href="/privacy-policy/" className="underline hover:text-gray-700">プライバシーポリシー</NextLink>に同意のうえご連絡ください。</p>
        </div>
      </div>
    </Layout>
  );
}
