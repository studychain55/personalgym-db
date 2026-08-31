'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const INQUIRY_TYPES = [
  { value: 'trial', label: '無料体験を予約したい' },
  { value: 'price', label: '料金・プランについて' },
  { value: 'access', label: 'アクセス・場所について' },
  { value: 'general', label: 'その他のご質問' },
];

interface Props {
  siteId: string;
  facilityTable: string;
  facilityId: number;
  facilityUid: string;
  facilityName: string;
}

export default function InquiryForm({ siteId, facilityTable, facilityId, facilityUid, facilityName }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', inquiry_type: 'trial' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      site_id: siteId, facility_table: facilityTable, facility_id: facilityId,
      facility_uid: facilityUid, name: form.name, email: form.email,
      phone: form.phone || null,
      subject: `${facilityName}へのお問い合わせ（${INQUIRY_TYPES.find(t => t.value === form.inquiry_type)?.label}）`,
      message: form.message, inquiry_type: form.inquiry_type,
    });
    setStatus(error ? 'error' : 'success');
  };

  if (status === 'success') return (
    <div className="p-8 bg-green-50 rounded-xl text-center border border-green-200">
      <div className="text-4xl mb-3">✅</div>
      <p className="text-[#1e782d] font-bold text-lg mb-1">お問い合わせを受け付けました</p>
      <p className="text-gray-600 text-sm">通常24時間以内にご連絡いたします。</p>
    </div>
  );

  return (
    <div>
      {/* 安心文言 */}
      <div className="flex flex-wrap gap-3 mb-5">
        {['入力3分で完了', '返信は24時間以内', '無料で相談できます'].map((text) => (
          <span key={text} className="flex items-center gap-1 text-xs text-[#1e782d] font-medium">
            <span className="text-green-500">✓</span> {text}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 問い合わせ種別 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">お問い合わせ種別 <span className="text-red-500">*</span></label>
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
                  onChange={e => setForm(f => ({ ...f, inquiry_type: e.target.value }))}
                  className="sr-only"
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
          <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
            autoComplete="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="山田 太郎"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
          <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
            autoComplete="email" inputMode="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="example@email.com"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            電話番号 <span className="text-xs text-gray-400 font-normal">（任意）</span>
          </label>
          <input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
            autoComplete="tel" inputMode="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]" placeholder="090-1234-5678"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
          <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
            rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1e782d] focus:ring-1 focus:ring-[#1e782d]"
            placeholder={form.inquiry_type === 'trial' ? '希望日時や目標などをお気軽にどうぞ' : 'ご質問・ご要望をご記入ください'}/>
        </div>
        {status==='error' && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">送信に失敗しました。もう一度お試しください。</p>}
        <button type="submit" disabled={status==='loading'}
          className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50 hover:bg-[#155420] transition-colors text-sm">
          {status==='loading' ? '送信中...' : '無料で問い合わせる →'}
        </button>
        <p className="text-[10px] text-gray-400 text-center">
          送信いただいた情報は、ジムへのお問い合わせ対応にのみ使用します。
        </p>
      </form>
    </div>
  );
}
