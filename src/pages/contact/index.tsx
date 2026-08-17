import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ | パーソナルジムDB"
        description="パーソナルジムDBへのお問い合わせページです。掲載内容の修正・追加、サービスに関するご質問はこちらから。"
        path="/contact/"
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-gray-500 text-sm mb-8">掲載情報の修正・追加依頼、サービスに関するご質問はこちらからご連絡ください。</p>

        {/* 安心バッジ */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["通常24時間以内に返信", "返信は無料", "掲載修正依頼も対応"].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-[#1e782d] font-medium">
              <span className="text-green-500">✓</span>
              {text}
            </div>
          ))}
        </div>

        {/* お問い合わせ種別 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "🏋️", title: "ジムの掲載依頼", desc: "新規掲載・情報追加のご依頼" },
            { icon: "✏️", title: "掲載情報の修正", desc: "住所・料金・営業時間などの更新" },
            { icon: "❓", title: "その他のご質問", desc: "サービスに関する一般的なご質問" },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-sm text-gray-800 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 連絡先 */}
        <div className="bg-white border border-[#1e782d]/30 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">連絡先</h2>
          <p className="text-gray-600 text-sm mb-4">
            以下のメールアドレスにお問い合わせ内容をご記載の上、お送りください。
            件名に「お問い合わせ種別」（例：掲載修正依頼、新規掲載）をご記入いただくとスムーズです。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="inline-flex items-center gap-2 bg-[#1e782d] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#155420] transition-colors text-sm"
          >
            ✉️ info@personalgym-db.jp
          </a>
          <p className="text-xs text-gray-400 mt-3">受付時間：平日 10:00〜18:00（土日祝除く）</p>
        </div>
      </div>
    </Layout>
  );
}
