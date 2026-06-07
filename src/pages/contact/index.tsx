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
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-700 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            通常2営業日以内に返信
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-700 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            個人情報は厳重に管理
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-2">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-xs text-gray-400 mb-6">
            ※ ジムへのお問い合わせは各ジムの公式サイトよりお願いします
          </p>
          <p className="text-gray-800 font-medium">
            メール: info@personalgym-db.jp
          </p>
        </div>
      </div>
    </Layout>
  );
}
