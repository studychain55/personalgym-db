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
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="mt-2 text-gray-600">
          パーソナルジムDBへのご意見・ご要望・掲載に関するお問い合わせはお気軽にどうぞ。
        </p>

        <div className="mt-8 bg-[#f0f6f0] border border-[#1e782d] rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">メールでのお問い合わせ</h2>
          <p className="text-gray-600 text-sm mb-5">
            お問い合わせは以下のメールアドレスまでお気軽にどうぞ。内容を確認のうえ、担当者よりご返信いたします。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-[#1e782d] transition-colors w-full"
          >
            <span className="text-[#1e782d] text-xl">✉</span>
            <span className="font-bold text-gray-800 text-lg">info@personalgym-db.jp</span>
          </a>
          <p className="mt-4 text-sm text-gray-500 flex items-center gap-1.5">
            <span className="text-[#1e782d] font-bold">✓</span>
            通常2営業日以内にご返信いたします
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏋️</div>
            <div className="text-sm font-bold text-gray-800 mb-1">掲載・修正依頼</div>
            <div className="text-xs text-gray-500">ジム情報の追加・修正はメールにてご連絡ください</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-sm font-bold text-gray-800 mb-1">ご意見・ご要望</div>
            <div className="text-xs text-gray-500">サービス改善に向けたフィードバックを歓迎します</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-sm font-bold text-gray-800 mb-1">業務提携</div>
            <div className="text-xs text-gray-500">広告・提携に関するお問い合わせもお気軽に</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
