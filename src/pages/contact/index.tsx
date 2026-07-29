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

        {/* 安心の3ポイント */}
        <div className="flex flex-wrap gap-4 mt-4 mb-6">
          {['通常24時間以内に返信', '無料でご相談いただけます', '個人情報は適切に管理'].map((t) => (
            <span key={t} className="flex items-center gap-1 text-sm text-[#1e782d] font-medium">
              <span>✓</span> {t}
            </span>
          ))}
        </div>

        <div className="mt-2 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">
            パーソナルジムDBに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <a
            href="mailto:info@personalgym-db.jp"
            className="inline-flex items-center gap-2 bg-[#1e782d] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#155420] transition-colors"
          >
            ✉️ info@personalgym-db.jp にメールする
          </a>
          <p className="text-xs text-gray-400 mt-3">通常24時間以内にご返信いたします。</p>
        </div>

        {/* よくあるお問い合わせ */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-gray-900 mb-4">よくあるお問い合わせ</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-2">
              <span className="font-bold text-[#1e782d] shrink-0">Q.</span>
              <p>掲載されていないジムを追加したい</p>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1e782d] shrink-0">Q.</span>
              <p>掲載情報の修正・削除を依頼したい</p>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1e782d] shrink-0">Q.</span>
              <p>広告掲載・タイアップについて知りたい</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            上記に該当する場合も、メールにてお気軽にご連絡ください。
          </p>
        </div>
      </div>
    </Layout>
  );
}
