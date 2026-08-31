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
          {/* 信頼シグナル */}
          <div className="grid grid-cols-3 gap-3 mb-6 mt-4">
            {[
              { icon: "🕐", title: "24時間以内", sub: "に返信" },
              { icon: "🔒", title: "SSL暗号化", sub: "通信保護" },
              { icon: "✅", title: "無料相談", sub: "受付中" },
            ].map((item) => (
              <div key={item.title} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-xl mb-1">{item.icon}</div>
                <p className="text-xs font-bold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
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
