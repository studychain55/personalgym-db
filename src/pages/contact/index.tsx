'use client';
import { useState } from 'react';
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      site_id: 'personalgym-db', facility_table: 'site', facility_id: 0,
      facility_uid: 'site', name: form.name, email: form.email,
      phone: null, subject: 'サイトへのお問い合わせ',
      message: form.message, inquiry_type: 'general',
    });
    setStatus(error ? 'error' : 'success');
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
        <p className="text-gray-600 mt-2 text-sm">ご質問・ご要望はフォームよりお気軽にどうぞ。</p>

        {status === 'success' ? (
          <div className="mt-8 p-6 bg-green-50 rounded-xl text-center border border-green-200">
            <p className="text-green-700 font-bold text-lg">お問い合わせを受け付けました</p>
            <p className="text-gray-600 mt-2 text-sm">内容を確認の上、通常24時間以内にご連絡いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e782d] text-sm" placeholder="山田 太郎" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e782d] text-sm" placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
              <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e782d] text-sm" placeholder="ご質問・ご要望をご記入ください" />
            </div>
            {status === 'error' && <p className="text-red-500 text-sm">送信に失敗しました。もう一度お試しください。</p>}
            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-[#1e782d] text-white font-bold py-3 rounded-lg hover:bg-[#155420] transition-colors disabled:opacity-50">
              {status === 'loading' ? '送信中...' : '送信する'}
            </button>
            <div className="flex items-center justify-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                SSL暗号化通信
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                通常24時間以内に返信
              </span>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
