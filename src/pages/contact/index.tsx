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
        {/* 安心訴求 */}
        <div className="mt-6 flex flex-wrap gap-4 mb-4">
          {["通常24時間以内に返信", "無料でご相談いただけます", "掲載・修正依頼も受付中"].map((text) => (
            <span key={text} className="flex items-center gap-1.5 text-sm text-[#1e782d] font-medium">
              <span className="text-green-500">✓</span> {text}
            </span>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。ジムの掲載依頼・情報修正・サイトへのご意見もお気軽にどうぞ。
          </p>
          <p className="text-gray-800 font-medium">
            メール: info@personalgym-db.jp
          </p>
          <p className="text-xs text-gray-400 mt-3">※ 通常、営業日の24時間以内にご返信いたします。</p>
        </div>
      </div>
    </Layout>
  );
}
