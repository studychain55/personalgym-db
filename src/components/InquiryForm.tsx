'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  siteId: string;
  facilityTable: string;
  facilityId: number;
  facilityUid: string;
  facilityName: string;
}

export default function InquiryForm({ siteId, facilityTable, facilityId, facilityUid, facilityName }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      site_id: siteId, facility_table: facilityTable, facility_id: facilityId,
      facility_uid: facilityUid, name: form.name, email: form.email,
      phone: form.phone || null, subject: `${facilityName}へのお問い合わせ`,
      message: form.message, inquiry_type: 'general',
    });
    setStatus(error ? 'error' : 'success');
  };

  if (status === 'success') return (
    <div className="p-6 bg-green-50 rounded-xl text-center">
      <p className="text-[#1e782d] font-bold text-lg">お問い合わせを受け付けました</p>
      <p className="text-gray-600 mt-2 text-sm">内容を確認の上、ご連絡いたします。</p>
    </div>
  );

  return (
    <div>
      {/* トラストバッジ */}
      <div className="flex flex-wrap gap-3 mb-5">
        {['入力3分で完了', '返信は24時間以内', '無料で相談できます'].map((text) => (
          <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
            <span className="text-green-500">✓</span> {text}
          </span>
        ))}
      </div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
        <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]" placeholder="山田 太郎"/>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
        <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]" placeholder="example@email.com"/>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">電話番号</label>
        <input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]" placeholder="090-1234-5678"/>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
        <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
          rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]" placeholder="ご質問・ご要望をご記入ください"/>
      </div>
      {status==='error' && <p className="text-red-500 text-sm">送信に失敗しました。もう一度お試しください。</p>}
      <button type="submit" disabled={status==='loading'}
        className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-xl disabled:opacity-50 hover:bg-[#185e24] active:scale-95 transition-all text-base shadow-md">
        {status==='loading'?'送信中...':'今すぐ無料で問い合わせる →'}
      </button>
      <p className="text-xs text-gray-400 mt-2 text-center">
        送信することでプライバシーポリシーに同意したものとみなします。
      </p>
    </form>
    </div>
  );
}
