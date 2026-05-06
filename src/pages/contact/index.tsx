import { useState } from "react";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-6">掲載に関するご相談・サイトへのご意見はこちらからお送りください。</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-bold text-green-800 text-lg mb-1">お問い合わせを受け付けました</p>
            <p className="text-sm text-gray-600">通常2〜3営業日以内にご連絡いたします。</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              {["入力3分で完了", "2〜3営業日以内に返信", "無料でご相談可能"].map(t => (
                <span key={t} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
                  <span>✓</span> {t}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="山田 太郎"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="ご質問・ご要望をご記入ください"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1e782d] text-white font-bold py-3 rounded-lg hover:bg-[#155f22] transition-colors"
              >
                送信する
              </button>
              <p className="text-[11px] text-gray-400 text-center">個人情報は安全に管理し、第三者に提供することはありません。</p>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
