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
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-6">パーソナルジムDBに関するご質問・ご意見をお寄せください。</p>

        {/* 安心ポイント */}
        <div className="flex flex-wrap gap-4 mb-6">
          {["入力3分で完了", "返信は2営業日以内", "秘密厳守"].map(text => (
            <span key={text} className="flex items-center gap-1 text-sm text-[#1e782d] font-medium">
              <span>✓</span> {text}
            </span>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
              <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="山田 太郎" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
              <input type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
              <textarea required rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="ご質問・ご意見をご記入ください"></textarea>
            </div>
            <p className="text-xs text-gray-500">送信先: info@gym-navi.jp</p>
            <a
              href="mailto:info@gym-navi.jp"
              className="block w-full bg-[#1e782d] text-white font-bold py-3 rounded-lg text-center hover:bg-[#155420] transition-colors text-sm"
            >
              メールで送る →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
