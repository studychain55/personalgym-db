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
        <p className="mt-3 text-gray-600">
          パーソナルジムDBに関するご質問・ご意見・掲載に関するお問い合わせは、下記フォームまたはメールにてお気軽にご連絡ください。
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-2 rounded-lg">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          通常2営業日以内にご返信いたします
        </div>

        <form
          action="mailto:info@personalgym-db.jp"
          method="get"
          encType="text/plain"
          className="mt-6 bg-white border border-gray-200 rounded-lg p-6 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="山田 太郎"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={6}
              placeholder="お問い合わせ内容をご記入ください"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1e782d] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#155420] transition-colors text-base"
          >
            送信する
          </button>
        </form>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-1">メールでのお問い合わせ</p>
          <p>
            <a href="mailto:info@personalgym-db.jp" className="text-[#1e782d] hover:underline font-medium">
              info@personalgym-db.jp
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
