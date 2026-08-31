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

        {/* 信頼シグナル */}
        <div className="mt-4 flex flex-wrap gap-4">
          {["通常24時間以内に返信", "個人情報は厳重に管理", "無料でご相談いただけます"].map((text) => (
            <span key={text} className="flex items-center gap-1 text-sm text-[#1e782d] font-medium">
              <span>✓</span> {text}
            </span>
          ))}
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 mb-4">
            掲載内容の修正・追加、サービスに関するご質問など、お気軽にご連絡ください。
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 font-medium mb-1">メールでのお問い合わせ</p>
            <p className="text-gray-800 font-bold">info@personalgym-db.jp</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              ご入力いただいた個人情報は、お問い合わせ対応のみに使用し、第三者への提供は一切行いません。
              詳しくは<a href="/privacy/" className="underline hover:text-gray-600">プライバシーポリシー</a>をご確認ください。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
