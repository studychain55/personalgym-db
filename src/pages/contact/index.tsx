import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

const CONTACT_TOPICS = [
  { value: "listing", label: "ジムの掲載・情報修正について" },
  { value: "usage", label: "サイトの使い方について" },
  { value: "report", label: "掲載情報の誤りを報告" },
  { value: "other", label: "その他" },
];

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ | パーソナルジムDB"
        description="パーソナルジムDBへのお問い合わせページです。掲載・修正依頼・ご意見はこちらから。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="text-sm text-gray-600 mt-2">
          ジムの掲載依頼・情報修正・ご意見・ご要望など、お気軽にご連絡ください。
        </p>

        {/* 信頼シグナル */}
        <div className="flex flex-wrap gap-3 mt-4 mb-6">
          {["通常2営業日以内に返信", "掲載は無料です", "情報修正は随時受付中"].map((text) => (
            <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium bg-[#f0f6f0] px-3 py-1.5 rounded-full">
              <span>✓</span> {text}
            </span>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <form action={`mailto:info@personalgym-db.jp`} method="get" className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {CONTACT_TOPICS.map((topic) => (
                  <label
                    key={topic.value}
                    className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer text-sm hover:border-[#1e782d] hover:bg-[#f0f6f0] transition-colors"
                  >
                    <input type="radio" name="topic" value={topic.value} className="accent-[#1e782d]" />
                    {topic.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="山田 太郎"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                name="body"
                placeholder="ご質問・ご要望をご記入ください"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e782d] text-white font-bold py-3.5 rounded-lg hover:bg-[#155420] transition-colors text-sm"
            >
              送信する →
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              または直接メールでご連絡ください: <a href="mailto:info@personalgym-db.jp" className="underline">info@personalgym-db.jp</a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
