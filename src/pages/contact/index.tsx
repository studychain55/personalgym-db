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
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-gray-800 font-medium">
            メール: info@personalgym-db.jp
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <span className="text-green-600 text-lg leading-none">✓</span>
              <p className="text-sm text-green-800 font-medium">通常24時間以内にご返信いたします</p>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <span className="text-blue-600 text-lg leading-none">✓</span>
              <p className="text-sm text-blue-800 font-medium">個人情報は適切に管理いたします</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
