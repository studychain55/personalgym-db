import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { siteName } from "@/utils/config";

export default function About() {
  return (
    <Layout>
      <SEO
        title="運営者情報"
        description={`${siteName}の運営者情報ページです。`}
        path="/about/"
      />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "運営者情報" }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">運営者情報</h1>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-600 w-32">サイト名</td>
                <td className="py-3">{siteName}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 font-medium text-gray-600">URL</td>
                <td className="py-3">https://personalgym-db.jp</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-600">お問い合わせ</td>
                <td className="py-3">お問い合わせフォームよりご連絡ください</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
