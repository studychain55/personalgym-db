import { useState } from "react";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", category: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // メール送信はバックエンド連携時に実装
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
        <p className="text-gray-500 text-sm mb-8">
          掲載内容のご確認・修正依頼・ジム掲載に関するご相談など、お気軽にご連絡ください。
        </p>

        {/* 信頼シグナル */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="text-center bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl font-bold text-[#1e782d]">24h</div>
            <div className="text-xs text-gray-500 mt-0.5">受付中</div>
          </div>
          <div className="text-center bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl font-bold text-[#1e782d]">1〜2日</div>
            <div className="text-xs text-gray-500 mt-0.5">返信目安</div>
          </div>
          <div className="text-center bg-[#f0f6f0] rounded-lg p-3">
            <div className="text-xl font-bold text-[#1e782d]">無料</div>
            <div className="text-xs text-gray-500 mt-0.5">相談無料</div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-[#f0f6f0] border border-[#1e782d] rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <h2 className="text-lg font-bold text-[#1e782d] mb-2">送信が完了しました</h2>
            <p className="text-gray-600 text-sm">
              お問い合わせありがとうございます。<br />
              1〜2営業日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お名前 <span className="text-red-500 text-xs">必須</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="山田 太郎"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-red-500 text-xs">必須</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お問い合わせ種別
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] bg-white"
              >
                <option value="">選択してください</option>
                <option value="listing">掲載情報の修正・更新</option>
                <option value="new">新規掲載のご相談</option>
                <option value="other">その他のお問い合わせ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お問い合わせ内容 <span className="text-red-500 text-xs">必須</span>
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d] focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e782d] text-white font-bold py-3.5 rounded-xl text-base hover:bg-[#155420] transition-colors"
            >
              送信する
            </button>

            <p className="text-xs text-gray-400 text-center">
              送信内容は <a href="/privacy/" className="underline hover:text-gray-600">プライバシーポリシー</a> に基づき適切に管理します。
            </p>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          メールでのお問い合わせ:{" "}
          <a href="mailto:info@personalgym-db.jp" className="text-[#1e782d] font-medium hover:underline">
            info@personalgym-db.jp
          </a>
        </div>
      </div>
    </Layout>
  );
}
