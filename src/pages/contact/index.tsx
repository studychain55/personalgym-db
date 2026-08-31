'use client';
import { useState } from 'react';
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // メール送信処理（実装はバックエンドに委ねる）
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
  };

  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。掲載に関するご相談・サイト改善のご意見などお気軽にどうぞ。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-gray-500 text-sm mb-6">掲載に関するご相談、サイト改善のご意見などお気軽にお送りください。</p>

        {/* 信頼バナー */}
        <div className="bg-[#f0f6f0] border border-[#1e782d]/30 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['⏱', '入力2分で完了'], ['📩', '24時間以内に返信'], ['🔒', '個人情報は安全に管理']].map(([icon, text]) => (
              <div key={text} className="flex flex-col items-center gap-0.5">
                <span className="text-lg">{icon}</span>
                <span className="text-[11px] text-gray-700 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {status === 'success' ? (
          <div className="p-8 bg-green-50 rounded-xl text-center border border-green-200">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-[#1e782d] font-bold text-lg mb-1">お問い合わせを受け付けました</p>
            <p className="text-gray-600 text-sm">通常24時間以内にご連絡いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
                placeholder="山田 太郎" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
                placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">件名 <span className="text-red-500">*</span></label>
              <select required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]">
                <option value="">選択してください</option>
                <option value="listing">掲載・修正のご依頼</option>
                <option value="feedback">サイト改善のご意見</option>
                <option value="pr">広告・提携のご相談</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
              <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d] resize-none"
                placeholder="お問い合わせ内容をご記入ください" />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#1e782d] text-white font-bold py-3 rounded-lg text-sm hover:bg-[#155420] transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? '送信中...' : '送信する'}
            </button>
            <p className="text-xs text-gray-400 text-center">
              直接メール: <a href="mailto:info@personalgym-db.jp" className="text-[#1e782d] hover:underline">info@personalgym-db.jp</a>
            </p>
          </form>
        )}
      </div>
    </Layout>
  );
}
