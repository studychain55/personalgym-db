import { useState } from "react";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const mailto = `mailto:info@gym-navi.jp?subject=${encodeURIComponent(String(data.get("subject") || "お問い合わせ"))}&body=${encodeURIComponent(`お名前: ${data.get("name")}\nメールアドレス: ${data.get("email")}\n\n内容:\n${data.get("message")}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="お問い合わせ | gym-navi.jp"
        description="gym-navi.jpへのお問い合わせページです。掲載内容の修正依頼・ご質問などお気軽にご連絡ください。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="text-gray-600 mt-2 text-sm">
          掲載内容の修正依頼・ご質問など、お気軽にご連絡ください。
        </p>

        {submitted ? (
          <div className="mt-8 bg-[#f0f6f0] border border-[#1e782d] rounded-lg p-6 text-center">
            <div className="text-[#1e782d] text-4xl mb-3">✓</div>
            <p className="font-bold text-gray-900 text-lg">お問い合わせありがとうございます</p>
            <p className="text-gray-600 mt-2 text-sm">内容を確認の上、順次ご回答いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 bg-white border border-gray-200 rounded-lg p-6 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                お名前 <span className="text-red-500 text-xs">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent transition"
                placeholder="山田 太郎"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-red-500 text-xs">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent transition"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                件名
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent transition"
                placeholder="お問い合わせの件名"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                お問い合わせ内容 <span className="text-red-500 text-xs">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent transition resize-vertical"
                placeholder="お問い合わせ内容をご入力ください"
              />
            </div>

            <p className="text-xs text-gray-500">
              ※ご入力いただいた情報は適切に管理いたします
            </p>

            <button
              type="submit"
              className="w-full bg-[#1e782d] text-white font-bold py-3.5 rounded-lg hover:bg-[#155420] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:ring-offset-2"
            >
              送信する
            </button>
          </form>
        )}

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            メールで直接お問い合わせの場合：
            <a href="mailto:info@gym-navi.jp" className="text-[#1e782d] font-medium hover:underline ml-1">
              info@gym-navi.jp
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
