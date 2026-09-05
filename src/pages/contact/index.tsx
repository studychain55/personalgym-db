import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。掲載内容の修正・追加、サイトに関するご意見など、お気軽にご連絡ください。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="text-gray-600 mt-2">
          パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
        </p>

        {/* Trust Signals */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#e9f2ea] rounded-lg p-3">
            <div className="text-2xl mb-1">📩</div>
            <div className="text-xs font-bold text-[#1e782d]">メール対応</div>
            <div className="text-xs text-gray-500">24時間受付</div>
          </div>
          <div className="bg-[#e9f2ea] rounded-lg p-3">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-xs font-bold text-[#1e782d]">返信目安</div>
            <div className="text-xs text-gray-500">2〜3営業日</div>
          </div>
          <div className="bg-[#e9f2ea] rounded-lg p-3">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs font-bold text-[#1e782d]">個人情報</div>
            <div className="text-xs text-gray-500">安全に管理</div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#1e782d] rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">メールアドレス</div>
              <a href="mailto:info@personalgym-db.jp" className="text-[#1e782d] font-bold hover:underline">
                info@personalgym-db.jp
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            上記アドレスへ直接メールをお送りください。2〜3営業日以内にご返信いたします。
          </p>
        </div>

        {/* Inquiry Categories */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">お問い合わせの種類</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl mt-0.5">🏋️</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">掲載ジムの情報修正・追加</div>
                <div className="text-xs text-gray-600 mt-1">営業時間・料金・住所の変更、新規掲載のご依頼はこちら。ジム名と修正内容を明記ください。</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl mt-0.5">✏️</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">口コミ・レビューに関するご連絡</div>
                <div className="text-xs text-gray-600 mt-1">口コミの内容に誤りがある場合や削除依頼は、対象ジム名とご連絡内容をお知らせください。</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl mt-0.5">💬</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">サイトに関するご意見・ご要望</div>
                <div className="text-xs text-gray-600 mt-1">使いにくい箇所、追加してほしい機能など、改善のご提案をお待ちしています。</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl mt-0.5">🤝</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">広告・業務提携のご相談</div>
                <div className="text-xs text-gray-600 mt-1">掲載プランや広告掲載、業務提携についてのご相談はお気軽にどうぞ。</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <span className="font-bold">ご注意：</span>パーソナルジムの入会・体験予約に関するお問い合わせは、各ジムの公式サイトへ直接ご連絡ください。当サイトでは個別のジムの予約・相談対応は行っておりません。
        </div>
      </div>
    </Layout>
  );
}
