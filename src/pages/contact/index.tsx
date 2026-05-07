'use client';
import { useState } from "react";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");
  };

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

        {status === "success" ? (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <p className="text-green-700 font-bold text-lg mb-2">お問い合わせを受け付けました</p>
            <p className="text-gray-600 text-sm">通常2〜3営業日以内にご返信いたします。</p>
          </div>
        ) : (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              {["無料でご相談", "2〜3営業日以内に返信", "プライバシー厳守"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
                  <span>✓</span> {t}
                </span>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
                <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]" placeholder="山田 太郎" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]" placeholder="example@email.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">件名 <span className="text-red-500">*</span></label>
                <input required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]" placeholder="お問い合わせの件名" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]" placeholder="お問い合わせ内容をご記入ください" />
              </div>
              <button type="submit"
                className="w-full bg-[#1e782d] text-white font-bold py-3 rounded-lg text-sm hover:bg-[#185e24] transition-colors">
                送信する →
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                ご入力いただいた情報は、お問い合わせ対応にのみ使用いたします。
              </p>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
