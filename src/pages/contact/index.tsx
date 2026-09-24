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
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-gray-800 font-medium">
            メール: {contactEmail}
          </p>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">よくあるご質問</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <p className="font-semibold text-sm text-gray-800 mb-1">Q. お問い合わせへの返信はどのくらいかかりますか？</p>
              <p className="text-sm text-gray-600">通常、1〜3営業日以内にご返信しております。</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <p className="font-semibold text-sm text-gray-800 mb-1">Q. ジムへの予約はどこからできますか？</p>
              <p className="text-sm text-gray-600">各ジムの詳細ページ内のお問い合わせフォームからご予約いただけます。</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800 mb-1">Q. 掲載情報の誤りを見つけた場合は？</p>
              <p className="text-sm text-gray-600">対象ジムの詳細ページからお知らせいただくか、本ページの案内に従って掲載修正をご依頼ください。</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
