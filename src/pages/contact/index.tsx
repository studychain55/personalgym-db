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
        {/* 信頼シグナル */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-[#f0f6f0] border border-[#1e782d]/20 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⏱</span>
            <div>
              <p className="font-bold text-sm text-gray-900">平均回答時間</p>
              <p className="text-xs text-gray-600 mt-0.5">通常2営業日以内にご返答いたします</p>
            </div>
          </div>
          <div className="bg-[#f0f6f0] border border-[#1e782d]/20 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <p className="font-bold text-sm text-gray-900">個人情報保護</p>
              <p className="text-xs text-gray-600 mt-0.5">ご連絡内容は厳重に管理し、第三者に提供しません</p>
            </div>
          </div>
          <div className="bg-[#f0f6f0] border border-[#1e782d]/20 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">📋</span>
            <div>
              <p className="font-bold text-sm text-gray-900">掲載・修正依頼</p>
              <p className="text-xs text-gray-600 mt-0.5">ジム情報の新規掲載・修正依頼もお気軽にどうぞ</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
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
