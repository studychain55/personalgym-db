import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ | パーソナルジムDB"
        description="パーソナルジムDBへのお問い合わせページです。掲載に関するご相談やサイトへのご意見をお気軽にどうぞ。"
        path="/contact/"
      />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-6">掲載のご相談・サイトへのご意見はこちらからどうぞ。</p>

        {/* 信頼シグナル */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: "⏱", label: "24時間以内に返信" },
            { icon: "🔒", label: "個人情報は安全に管理" },
            { icon: "✅", label: "無料でご相談いただけます" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-[#f0f6f0] rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs text-[#1e782d] font-medium">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">メールでお問い合わせ</h2>
          <p className="text-sm text-gray-600 mb-4">
            以下のメールアドレスへ直接ご連絡ください。件名に「お問い合わせ」とご記入いただけるとスムーズです。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="flex items-center gap-3 w-full bg-[#1e782d] text-white font-bold px-5 py-4 rounded-lg hover:bg-[#155420] transition-colors no-underline justify-center text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            info@personalgym-db.jp にメールを送る
          </a>
          <p className="text-xs text-gray-400 text-center mt-3">
            ※ 返信は通常24時間以内（土日祝は翌営業日）
          </p>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-3">よくあるお問い合わせ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">Q.</span>
                <span>掲載されているジム情報の修正依頼</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">Q.</span>
                <span>新規ジムの掲載申請</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">Q.</span>
                <span>広告・タイアップのご相談</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
