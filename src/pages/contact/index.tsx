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

const INQUIRY_TYPES = [
  { value: 'listing', label: 'ジムの掲載について' },
  { value: 'info_correction', label: '情報修正のご依頼' },
  { value: 'media', label: 'メディア・取材について' },
  { value: 'other', label: 'その他' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', inquiry_type: 'other', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('site_inquiries').insert({
      site_id: 'personalgym-db',
      name: form.name,
      email: form.email,
      inquiry_type: form.inquiry_type,
      message: form.message,
    });
    setStatus(error ? 'error' : 'success');
  };

  return (
    <Layout>
      <SEO
        title="お問い合わせ｜パーソナルジムDB"
        description="パーソナルジムDBへのお問い合わせページ。ジムの掲載・情報修正・メディア連携などはこちらからどうぞ。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-gray-600 text-sm mb-6">
          ジムの掲載・情報修正・メディア連携など、お気軽にご連絡ください。通常2営業日以内にご返信します。
        </p>

        {/* 信頼シグナル */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['入力2分で完了', '2営業日以内に返信', '無料でご相談'].map((text) => (
            <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium bg-[#f0f9f0] px-3 py-1.5 rounded-full">
              <span>✓</span> {text}
            </span>
          ))}
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-[#1e782d] font-bold text-lg mb-1">お問い合わせを受け付けました</p>
            <p className="text-gray-600 text-sm">通常2営業日以内にご連絡いたします。</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* お問い合わせ種別 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INQUIRY_TYPES.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg cursor-pointer text-sm transition-colors ${
                        form.inquiry_type === type.value
                          ? 'border-[#1e782d] bg-[#f0f9f0] text-[#1e782d] font-medium'
                          : 'border-gray-300 text-gray-600 hover:border-[#1e782d]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiry_type"
                        value={type.value}
                        checked={form.inquiry_type === type.value}
                        onChange={(e) => setForm((f) => ({ ...f, inquiry_type: e.target.value }))}
                        className="sr-only"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  autoComplete="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  autoComplete="email"
                  inputMode="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  送信に失敗しました。もう一度お試しください。
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50 hover:bg-[#155420] transition-colors text-sm"
              >
                {status === 'loading' ? '送信中...' : '送信する →'}
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                送信いただいた情報は、お問い合わせ対応にのみ使用します。
              </p>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
