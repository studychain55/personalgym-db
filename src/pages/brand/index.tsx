import type { GetServerSideProps } from "next";
import NextLink from "next/link";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import Breadcrumb from "@/components/UI/BreadCrumb";
import { fetchAllBrands } from "@/utils/supabase/fetchBrands";
import { setVeryLongCacheHeaders } from "@/utils/cacheHeaders";
import type { GymBrand } from "@/types";

interface BrandIndexProps {
  brands: GymBrand[];
}

export const getServerSideProps: GetServerSideProps<BrandIndexProps> = async ({ res }) => {
  const brands = await fetchAllBrands();
  setVeryLongCacheHeaders(res);
  return { props: { brands } };
};

export default function BrandIndex({ brands }: BrandIndexProps) {
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: "ブランド一覧" },
  ];

  return (
    <Layout>
      <SEO
        title="パーソナルジムブランド一覧"
        description="全国の主要パーソナルジムブランドを一覧で比較。RIZAP、BEYOND、24/7など人気チェーンの特徴・料金・店舗数を確認。"
        path="/brand/"
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          パーソナルジムブランド一覧
          <span className="text-base font-normal text-gray-500 ml-2">({brands.length}ブランド)</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {brands.map((brand) => (
            <NextLink
              key={brand.id}
              href={`/brand/${brand.slug}/`}
              className="block no-underline bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                {brand.logo_url && (
                  <img src={brand.logo_url} alt={brand.name} className="w-12 h-12 object-contain rounded" />
                )}
                <div>
                  <div className="font-bold text-gray-900">{brand.name}</div>
                  {brand.total_locations && (
                    <div className="text-xs text-gray-500">全国{brand.total_locations}店舗</div>
                  )}
                </div>
              </div>
              {brand.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{brand.description}</p>
              )}
            </NextLink>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            ブランドはまだ登録されていません。
          </div>
        )}
      </div>
    </Layout>
  );
}
