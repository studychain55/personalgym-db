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

        {/* 安心トラストシグナル */}
        <div className="mt-4 bg-[#f0f9f1] border border-[#1e782d]/30 rounded-lg p-4">
          <p className="text-sm font-bold text-[#1e782d] mb-2">安心してご相談ください</p>
          <ul className="space-y-1">
            {[
              '✓ 無料・匿名で相談できます',
              '✓ しつこい営業はありません',
              '✓ 個人情報は厳重に管理しています',
              '✓ 通常24時間以内にご返信します',
            ].map((text) => (
              <li key={text} className="text-sm text-gray-700">{text}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            パーソナルジムDB（gym-navi.jp）に関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          </p>
          <p className="text-gray-800 font-medium">
            メール: info@personalgym-db.jp
          </p>
          <p className="text-gray-500 text-sm mt-3">
            ※ ジムへのお問い合わせは各ジム詳細ページのフォームよりお送りください。
          </p>
        </div>
      </div>
    </Layout>
  );
}
