import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="パーソナルジムDBへのお問い合わせページです。"
        path="/contact/"
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="mt-2 text-gray-600 text-sm">
          パーソナルジムDBに関するご質問・ご要望は、以下の方法よりお気軽にご連絡ください。
        </p>

        {/* 問い合わせ種別カード */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f0f6f0] border border-[#bcd7c0] rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">🏋️</div>
            <h2 className="font-bold text-gray-800 mb-1 text-sm">ジム掲載・情報修正</h2>
            <p className="text-xs text-gray-500">ジムオーナー様・担当者様向けの掲載申請・情報更新のご依頼</p>
          </div>
          <div className="bg-[#f0f6f0] border border-[#bcd7c0] rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <h2 className="font-bold text-gray-800 mb-1 text-sm">サイトに関するお問い合わせ</h2>
            <p className="text-xs text-gray-500">表示内容の誤りや不具合など、サイトに関するご報告</p>
          </div>
          <div className="bg-[#f0f6f0] border border-[#bcd7c0] rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">💬</div>
            <h2 className="font-bold text-gray-800 mb-1 text-sm">その他のご質問</h2>
            <p className="text-xs text-gray-500">上記以外のご質問・ご意見・ご要望など何でもどうぞ</p>
          </div>
        </div>

        {/* 連絡先 */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">お問い合わせ先</h2>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#1e782d] text-xl">✉</span>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">メールアドレス</p>
              <a
                href="mailto:info@personalgym-db.jp"
                className="text-[#1e782d] font-bold hover:underline"
              >
                info@personalgym-db.jp
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 flex items-start gap-1.5">
              <span className="mt-0.5">ℹ️</span>
              <span>通常、営業日3〜5営業日以内にご返信いたします。お急ぎの場合はその旨をメール本文にご記載ください。</span>
            </p>
          </div>
        </div>

        {/* よくある質問への誘導 */}
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
          <span className="text-orange-400 text-xl mt-0.5">💡</span>
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">まずはよくある質問をご確認ください</p>
            <p className="text-xs text-gray-600">
              パーソナルジムの料金・選び方・効果に関する疑問は、
              <a href="/#faq" className="text-[#1e782d] font-medium hover:underline">よくある質問</a>
              でお答えしています。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
