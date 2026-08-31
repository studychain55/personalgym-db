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
        {/* トラストバッジ */}
        <div className="flex flex-wrap gap-4 mt-4 mb-2">
          {["無料でご相談いただけます", "通常24時間以内に返信", "個人情報は厳重に管理"].map((text) => (
            <span key={text} className="flex items-center gap-1 text-sm text-[#1e782d] font-medium">
              <span className="text-green-500">✓</span> {text}
            </span>
          ))}
        </div>
        <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="inline-block text-[#1e782d] font-bold text-lg hover:underline"
          >
            info@personalgym-db.jp
          </a>
          <p className="text-xs text-gray-400 mt-4">
            送信することでプライバシーポリシーに同意したものとみなします。
          </p>
        </div>
      </div>
    </Layout>
  );
}
