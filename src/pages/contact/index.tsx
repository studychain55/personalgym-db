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
          <div className="flex items-start gap-4">
            <div className="text-3xl">📧</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">メールでのお問い合わせ</h2>
              <p className="text-gray-600 text-sm mb-3">
                以下のメールアドレスまでお気軽にご連絡ください。<br />
                通常1〜2営業日以内にご返信いたします。
              </p>
              <p className="text-gray-800 font-medium">メール: info@personalgym-db.jp</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">※ 掲載内容の修正・追加依頼もこちらからご連絡ください</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
