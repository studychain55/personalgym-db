'use client';
import { useState } from 'react';
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', category: 'general', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
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
        <p className="text-gray-600 text-sm mb-6">サイトに関するご質問・ご意見はこちらからお送りください。</p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-green-700 font-bold text-lg">送信が完了しました</p>
            <p className="text-gray-500 text-sm mt-1">通常2営業日以内にご連絡いたします。</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-5">
              {['お気軽にご相談ください', '2営業日以内に返信', '無料でご利用いただけます'].map((text) => (
                <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
                  <span>✓</span> {text}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ種別 <span className="text-red-500">*</span></label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                >
                  <option value="general">一般的なご質問</option>
                  <option value="gym_listing">掲載・修正依頼</option>
                  <option value="review">口コミについて</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e782d]"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">送信に失敗しました。info@personalgym-db.jp までご連絡ください。</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg hover:bg-[#155420] transition-colors disabled:opacity-50 text-base"
              >
                {status === 'loading' ? '送信中...' : '送信する →'}
              </button>
              <p className="text-[10px] text-gray-400 text-center">送信いただいた情報は返信目的にのみ使用します。</p>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
