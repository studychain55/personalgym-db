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
      {/* Trust Signals */}
      <div className="flex flex-wrap gap-3 mb-5">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#1e782d] bg-[#e9f2ea] border border-[#b8dbbe] px-3 py-2 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a9 9 0 100 18A9 9 0 0010 1zm0 2a7 7 0 110 14A7 7 0 0110 3zm-.293 9.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 10.586 8.707 9.293a1 1 0 00-1.414 1.414l2 2z" clipRule="evenodd"/></svg>
          無料・登録不要
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-2 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
          SSL暗号化通信
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-2 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-2.83-2h5.66A3 3 0 0110 18z"/></svg>
          通常24時間以内返信
        </span>
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
        className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50 hover:bg-[#155420] transition-colors text-lg shadow-md">
        {status==='loading'?'送信中...':'無料でお問い合わせする →'}
      </button>
      <p className="text-xs text-gray-400 text-center mt-2">個人情報は第三者に提供しません。プライバシーポリシーに同意の上、送信ください。</p>
    </form>
    </div>
  );
}
