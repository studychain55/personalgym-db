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
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="text-gray-600 mt-2 text-sm">
          掲載内容の修正・追加依頼、その他ご不明点はお気軽にご連絡ください。
        </p>

        {/* Trust signals */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl mb-1">24h</div>
            <div className="text-xs text-gray-600">いつでも受付</div>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl mb-1">2〜3日</div>
            <div className="text-xs text-gray-600">返信目安</div>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl mb-1">無料</div>
            <div className="text-xs text-gray-600">費用不要</div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">メールでのお問い合わせ</h2>
          <p className="text-gray-600 mb-4 text-sm">
            下記のメールアドレスへ件名・内容を明記の上ご連絡ください。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="inline-flex items-center gap-2 bg-[#1e782d] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#155420] transition-colors no-underline text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@personalgym-db.jp
          </a>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-2">よくあるお問い合わせ内容</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>掲載情報の修正・更新依頼</li>
              <li>新規ジムの掲載申請</li>
              <li>サイトに関するご意見・ご要望</li>
              <li>メディア・取材に関するお問い合わせ</li>
            </ul>
          </div>
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          ご連絡いただいた個人情報は、お問い合わせへの回答のみに使用し、第三者に提供することはありません。
          <a href="/privacy/" className="underline hover:text-gray-600 ml-1">プライバシーポリシー</a>
        </p>
      </div>
    </Layout>
  );
}
