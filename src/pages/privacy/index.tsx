import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { siteName } from "@/utils/config";

export default function Privacy() {
  return (
    <Layout>
      <SEO
        title="プライバシーポリシー"
        description={`${siteName}のプライバシーポリシーです。`}
        path="/privacy/"
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">プライバシーポリシー</h1>
        <div className="mt-6 prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-gray-900">個人情報の利用目的</h2>
          <p>当サイトでは、お問い合わせの際に氏名・メールアドレス等の個人情報をご提供いただく場合がございます。取得した個人情報は、お問い合わせへの回答や必要な情報の提供のために利用し、それ以外の目的では利用いたしません。</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6">アクセス解析ツールについて</h2>
          <p>当サイトでは、Googleアナリティクスによるアクセス解析を行っております。Googleアナリティクスはデータ収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6">免責事項</h2>
          <p>当サイトに掲載する情報は、その正確性や安全性を保証するものではありません。掲載情報によって生じたいかなる損害についても、当サイトは一切の責任を負いかねます。各パーソナルジムの最新情報は、必ず公式サイト等でご確認ください。</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6">著作権について</h2>
          <p>当サイトに掲載されている文章・画像等の著作権は、当サイトまたは各権利者に帰属します。無断転載・複製を禁じます。</p>
        </div>
      </div>
    </Layout>
  );
}
