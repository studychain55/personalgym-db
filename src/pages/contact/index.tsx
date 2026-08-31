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
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
              <span>個人情報は厳重に管理し、第三者への提供は一切行いません。</span>
            </p>
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
              <span>通常2営業日以内にご返信いたします。</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
