import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { contactEmail } from "@/utils/config";

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

        {/* Trust signals */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">📩</div>
            <div className="font-bold text-gray-800 text-sm">返信まで1〜3営業日</div>
            <p className="text-xs text-gray-500 mt-1">受信後、順次ご対応いたします</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <div className="font-bold text-gray-800 text-sm">個人情報は安全に管理</div>
            <p className="text-xs text-gray-500 mt-1">お問い合わせ対応のみに使用します</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">💬</div>
            <div className="font-bold text-gray-800 text-sm">どんな内容でもOK</div>
            <p className="text-xs text-gray-500 mt-1">掲載依頼・修正依頼・ご意見など</p>
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">メールでのお問い合わせ</h2>
          <p className="text-gray-600 mb-4">
            以下のメールアドレスへ、件名・お問い合わせ内容をご記入のうえ送信してください。
          </p>
          <p className="text-gray-800 font-bold text-lg">
            {contactEmail}
          </p>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-3">よくあるお問い合わせ内容</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] font-bold mt-0.5">•</span>
                <span>掲載ジムの情報修正・追加依頼</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] font-bold mt-0.5">•</span>
                <span>新規ジムの掲載申し込み</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] font-bold mt-0.5">•</span>
                <span>掲載内容の削除依頼</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] font-bold mt-0.5">•</span>
                <span>サイトに関するご意見・ご要望</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
