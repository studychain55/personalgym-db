import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="お問い合わせ | パーソナルジムDB"
        description="パーソナルジムDBへのお問い合わせページです。掲載情報の修正・追加・削除依頼など、お気軽にご連絡ください。"
        path="/contact/"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">お問い合わせ</h1>
        <p className="mt-2 text-gray-600">
          掲載情報の修正・追加・削除依頼、その他ご不明な点はお気軽にご連絡ください。
        </p>

        {/* 信頼シグナル */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">📧</div>
            <div className="text-sm font-bold text-gray-800">メールで対応</div>
            <div className="text-xs text-gray-500 mt-1">内容を丁寧に確認します</div>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-sm font-bold text-gray-800">通常3営業日以内に返信</div>
            <div className="text-xs text-gray-500 mt-1">お急ぎの場合もご記載ください</div>
          </div>
          <div className="bg-[#f0f6f0] rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-sm font-bold text-gray-800">プライバシー保護</div>
            <div className="text-xs text-gray-500 mt-1">個人情報は厳重に管理します</div>
          </div>
        </div>

        {/* お問い合わせ内容 */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">お問い合わせ先</h2>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">📬</span>
            <div>
              <div className="text-sm text-gray-500 mb-0.5">メールアドレス</div>
              <a
                href="mailto:info@personalgym-db.jp"
                className="text-[#1e782d] font-bold text-lg hover:underline"
              >
                info@personalgym-db.jp
              </a>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-bold text-gray-700 mb-2">よくあるお問い合わせ内容</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
                掲載ジム情報の追加・修正・削除依頼
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
                掲載に関するご相談
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
                サイトの不具合・表示のご報告
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1e782d] font-bold mt-0.5">✓</span>
                その他サービスに関するご質問
              </li>
            </ul>
          </div>

          <p className="mt-5 text-xs text-gray-400 border-t border-gray-100 pt-4">
            ※ お問い合わせの内容によっては、返答にお時間をいただく場合や、回答できない場合があります。あらかじめご了承ください。
          </p>
        </div>
      </div>
    </Layout>
  );
}
