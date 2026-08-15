'use client';
import { useState } from "react";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
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

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span>通常2営業日以内に返信</span>
          <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span>無料でご相談いただけます</span>
        </div>

        {status === "success" ? (
          <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200 text-center">
            <p className="text-green-700 font-bold text-lg mb-1">お問い合わせを受け付けました</p>
            <p className="text-gray-600 text-sm">通常2営業日以内にご返信いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                placeholder="山田 太郎" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">件名 <span className="text-red-500">*</span></label>
              <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                placeholder="お問い合わせ内容の件名" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
              <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                placeholder="お問い合わせ内容をご記入ください" />
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="mt-0.5 flex-shrink-0 accent-[#1e782d]" />
              <span className="text-xs text-gray-500">
                <a href="/privacy/" className="text-[#1e782d] underline">プライバシーポリシー</a>に同意して送信します
              </span>
            </label>
            {status === "error" && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">送信に失敗しました。info@personalgym-db.jp までご連絡ください。</p>}
            <button type="submit" disabled={status === "loading" || !agreed}
              className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50 hover:bg-[#155420] transition-colors text-sm">
              {status === "loading" ? "送信中..." : "送信する →"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
