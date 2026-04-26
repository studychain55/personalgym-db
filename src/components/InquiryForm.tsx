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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', inquiry_type: 'general' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      site_id: siteId, facility_table: facilityTable, facility_id: facilityId,
      facility_uid: facilityUid, name: form.name, email: form.email,
      phone: form.phone || null, subject: `${facilityName}へのお問い合わせ`,
      message: form.message, inquiry_type: form.inquiry_type,
    });
    setStatus(error ? 'error' : 'success');
  };

  if (status === 'success') return (
    <div className="p-8 bg-green-50 rounded-xl text-center border border-green-200">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-[#1e782d] font-bold text-lg mb-1">お問い合わせを受け付けました</p>
      <p className="text-gray-600 text-sm mb-4">通常24時間以内にご連絡いたします。</p>
      <div className="text-left bg-white rounded-lg p-3 border border-green-100 text-xs text-gray-500 space-y-1.5">
        <p>📧 ご登録のメールアドレスに確認メールをお送りします</p>
        <p>📞 お急ぎの場合は直接お電話でお問い合わせください</p>
        <p>🔒 ご入力の情報はお問い合わせ対応にのみ使用します</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        {['入力3分で完了', '返信は24時間以内', '無料で相談できます'].map((text) => (
          <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
            <span className="text-[#1e782d]">✓</span> {text}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
          <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="山田 太郎"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
          <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="example@email.com"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">電話番号 <span className="text-xs text-gray-400 font-normal">（任意）</span></label>
          <input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="090-1234-5678"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
          <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
            rows={4} maxLength={500} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
            placeholder="ご質問・ご要望をご記入ください（例：料金プランについて詳しく聞きたい、体験レッスンを予約したい）"/>
          <p className="text-right text-[10px] text-gray-400 mt-0.5">{form.message.length}/500文字</p>
        </div>
        {status==='error' && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">送信に失敗しました。もう一度お試しください。</p>}
        <button type="submit" disabled={status==='loading'}
          className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50 hover:bg-[#155420] transition-colors text-sm">
          {status==='loading' ? '送信中...' : '無料で問い合わせる →'}
        </button>
        <p className="text-[10px] text-gray-400 text-center">
          🔒 送信いただいた情報は、お問い合わせ対応にのみ使用します。
        </p>
      </form>
    </div>
  );
}
