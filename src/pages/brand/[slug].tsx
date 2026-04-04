import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/UI/Layout";
import SEO from "@/components/UI/SEO";
import { JsonLDListPage, JsonLDBreadcrumbs } from "@/components/UI/JsonLD";
import GymCard from "@/features/gym/components/GymCard";
import Breadcrumb from "@/components/UI/BreadCrumb";
import Pagination from "@mui/material/Pagination";
import { fetchGyms } from "@/utils/supabase/fetchGyms";
import { fetchBrandBySlug } from "@/utils/supabase/fetchBrands";
import { setConditionalCacheHeaders } from "@/utils/cacheHeaders";
import type { GymListItem, GymBrand } from "@/types";

const PER_PAGE = 20;

interface BrandPageProps {
  brand: GymBrand;
  gyms: GymListItem[];
  totalCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<BrandPageProps> = async ({ params, query, res }) => {
  const slug = String(params?.slug || "");
  const brand = await fetchBrandBySlug(slug);
  if (!brand) return { notFound: true };

  const page = Math.max(1, parseInt(String(query.page || "1"), 10) || 1);
  const result = await fetchGyms({ brandId: brand.id, page, limit: PER_PAGE });

  setConditionalCacheHeaders(res, result.totalCount);

  return { props: { brand, gyms: result.gyms, totalCount: result.totalCount, page } };
};

export default function BrandPage({ brand, gyms, totalCount, page }: BrandPageProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const basePath = `/brand/${brand.slug}/`;
  const breadcrumbItems = [
    { label: "ジム一覧", href: "/all/" },
    { label: brand.name },
  ];

  const handlePageChange = (_: unknown, value: number) => {
    router.push({ pathname: basePath, query: value > 1 ? { page: value } : {} });
  };

  return (
    <Layout>
      <SEO
        title={`${brand.name}の店舗一覧・料金比較${page > 1 ? `（${page}��ージ目）` : ""}`}
        description={`${brand.name}の全${totalCount}店舗を比較。料金・口コミ・特徴で${brand.name}のあなたに合った店舗が見つかる。`}
        path={`${basePath}${page > 1 ? `?page=${page}` : ""}`}
        noindex={page > 1}
      />
      <JsonLDListPage
        title={`${brand.name}の店舗一覧`}
        description={`${brand.name}の全店舗`}
        path={basePath}
        items={gyms}
      />
      <JsonLDBreadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-4 flex items-center gap-4">
          {brand.logo_url && (
            <img src={brand.logo_url} alt={brand.name} className="w-16 h-16 object-contain rounded" />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {brand.name}
              <span className="text-base font-normal text-gray-500 ml-2">({totalCount}店舗)</span>
            </h1>
            {brand.description && (
              <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {brand.name}の店舗はまだ登録されていません。
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              size="large"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
