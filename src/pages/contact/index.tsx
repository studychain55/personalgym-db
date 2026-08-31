import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。掲載内容の修正・追加・削除のご依頼もお気軽にどうぞ。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="text-gray-600 mt-2">
          サービスに関するご質問・掲載内容の修正依頼など、お気軽にご連絡ください。
        </p>

        {/* 問い合わせ種別ガイド */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center border border-[#bcd7c0]">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-sm font-bold text-gray-800">掲載内容の修正</div>
            <p className="text-xs text-gray-600 mt-1">住所・料金などの情報更新</p>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center border border-[#bcd7c0]">
            <div className="text-2xl mb-1">➕</div>
            <div className="text-sm font-bold text-gray-800">掲載のご依頼</div>
            <p className="text-xs text-gray-600 mt-1">新規ジムの掲載申請</p>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center border border-[#bcd7c0]">
            <div className="text-2xl mb-1">❓</div>
            <div className="text-sm font-bold text-gray-800">その他のご質問</div>
            <p className="text-xs text-gray-600 mt-1">サービスに関するお問い合わせ</p>
          </div>
        </div>

        {/* 連絡先 */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">メールでのお問い合わせ</h2>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="w-6 h-6 text-[#1e782d] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a
              href="mailto:info@personalgym-db.jp"
              className="text-[#1e782d] font-bold text-lg hover:underline"
            >
              info@personalgym-db.jp
            </a>
          </div>

          {/* 信頼シグナル */}
          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#1e782d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>通常2〜3営業日以内にご返信いたします</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#1e782d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span>いただいた情報は返信にのみ使用し、第三者への提供は行いません</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#1e782d] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>掲載内容の修正・削除依頼は迅速に対応いたします</span>
            </div>
          </div>
        </div>

        {/* メール本文テンプレート案内 */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
          <span className="font-bold text-yellow-800">メールを送る際のご案内: </span>
          件名に「掲載修正依頼」「掲載申請」などをご記入いただくとスムーズです。掲載内容に関するお問い合わせの場合は、ジム名と該当URLも合わせてお知らせください。
        </div>
      </div>
    </Layout>
  );
}
