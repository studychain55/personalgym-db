'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TIME_SLOTS = ['10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

interface Props {
  siteId: string; facilityTable: string; facilityId: number; facilityUid: string; facilityName: string;
}

export default function ReservationCalendar({ siteId, facilityTable, facilityId, facilityUid, facilityName }: Props) {
  const [step, setStep] = useState<'date'|'time'|'form'|'done'>('date');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name:'', email:'', phone:'', notes:'' });
  const [loading, setLoading] = useState(false);

  const dates = Array.from({length:14},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()+i+1); return d.toISOString().split('T')[0];
  }).filter(d=>new Date(d).getDay()!==0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await supabase.from('reservations').insert({
      site_id:siteId, facility_table:facilityTable, facility_id:facilityId,
      facility_uid:facilityUid, reservation_date:selectedDate, time_slot:selectedTime,
      customer_name:form.name, customer_email:form.email,
      customer_phone:form.phone||null, customer_notes:form.notes||null,
    });
    setLoading(false); setStep('done');
  };

  const fmt = (d:string) => {
    const dt=new Date(d); const days=['日','月','火','水','木','金','土'];
    return `${dt.getMonth()+1}/${dt.getDate()}(${days[dt.getDay()]})`;
  };

  if(step==='done') return (
    <div className="p-6 bg-green-50 rounded-xl text-center">
      <p className="text-[#1e782d] font-bold text-xl mb-2">予約が完了しました!</p>
      <p className="text-gray-600">{fmt(selectedDate)} {selectedTime}〜</p>
      <p className="text-gray-500 text-sm mt-3">確認のご連絡をお送りします。</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {step==='date' && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">希望日を選択してください</h3>
          <div className="grid grid-cols-4 gap-2">
            {dates.map(d=>(
              <button key={d} onClick={()=>{setSelectedDate(d);setStep('time');}}
                className="py-2 px-1 text-sm border rounded-lg hover:border-[#1e782d] hover:text-[#1e782d] transition-colors">
                {fmt(d)}
              </button>
            ))}
          </div>
        </div>
      )}
      {step==='time' && (
        <div>
          <button onClick={()=>setStep('date')} className="text-sm text-gray-500 mb-3">← 日程を変更</button>
          <h3 className="font-bold text-gray-800 mb-3">{fmt(selectedDate)} の時間帯を選択</h3>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(t=>(
              <button key={t} onClick={()=>{setSelectedTime(t);setStep('form');}}
                className="py-3 border rounded-lg hover:border-[#1e782d] hover:text-[#1e782d] font-bold transition-colors">
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
      {step==='form' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <button type="button" onClick={()=>setStep('time')} className="text-sm text-gray-500">← 時間を変更</button>
          <div className="bg-green-50 rounded-lg p-3 text-sm text-[#1e782d] font-bold">
            {fmt(selectedDate)} {selectedTime}〜 の体験予約
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
            <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]"/>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
            <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]"/>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">電話番号</label>
            <input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]"/>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ご質問・備考</label>
            <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
              rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1e782d]"/>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#1e782d] text-white font-bold py-4 rounded-lg disabled:opacity-50">
            {loading?'予約中...':'予約を確定する'}
          </button>
        </form>
      )}
    </div>
  );
}
