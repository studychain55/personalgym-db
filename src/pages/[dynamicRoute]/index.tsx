import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ComponentType } from "react";
import { getPurposeDefinition } from "@/constants/purposes";
import PrefecturePage, {
  getServerSideProps as getPrefectureServerSideProps,
} from "@/pages/prefecture/[slug]/index";
import RegionPage, {
  getServerSideProps as getRegionServerSideProps,
} from "@/pages/r-[region]/index";
import FeaturePage, {
  getServerSideProps as getFeatureServerSideProps,
} from "@/pages/f-[feature]/index";
import CityPage, {
  getServerSideProps as getCityServerSideProps,
} from "@/pages/c-[city]/index";
import PurposePage, {
  getServerSideProps as getPurposeServerSideProps,
} from "@/pages/purpose/[purpose]";

type RouteType = "prefecture" | "region" | "feature" | "city" | "purpose";

const PAGE_COMPONENTS: Record<RouteType, ComponentType<Record<string, unknown>>> = {
  prefecture: PrefecturePage as unknown as ComponentType<Record<string, unknown>>,
  region: RegionPage as unknown as ComponentType<Record<string, unknown>>,
  feature: FeaturePage as unknown as ComponentType<Record<string, unknown>>,
  city: CityPage as unknown as ComponentType<Record<string, unknown>>,
  purpose: PurposePage as unknown as ComponentType<Record<string, unknown>>,
};

async function injectRouteType<T extends object>(
  result: GetServerSidePropsResult<T>,
  routeType: RouteType,
) {
  if (!("props" in result)) {
    return result;
  }

  const props = await result.props;

  return {
    ...result,
    props: {
      ...props,
      __routeType: routeType,
    },
  };
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const dynamicRoute = String(context.params?.dynamicRoute || "");

  if (dynamicRoute.startsWith("p-")) {
    return injectRouteType(
      await getPrefectureServerSideProps({
        ...context,
        params: { ...context.params, slug: dynamicRoute.slice(2) },
      }),
      "prefecture",
    );
  }

  if (dynamicRoute.startsWith("r-")) {
    return injectRouteType(
      await getRegionServerSideProps({
        ...context,
        params: { ...context.params, region: dynamicRoute.slice(2) },
      }),
      "region",
    );
  }

  if (dynamicRoute.startsWith("f-")) {
    return injectRouteType(
      await getFeatureServerSideProps({
        ...context,
        params: { ...context.params, feature: dynamicRoute.slice(2) },
      }),
      "feature",
    );
  }

  if (dynamicRoute.startsWith("c-")) {
    return injectRouteType(
      await getCityServerSideProps({
        ...context,
        params: { ...context.params, city: dynamicRoute.slice(2) },
      }),
      "city",
    );
  }

  if (getPurposeDefinition(dynamicRoute)) {
    return injectRouteType(
      await getPurposeServerSideProps({
        ...context,
        params: { ...context.params, purpose: dynamicRoute },
      }),
      "purpose",
    );
  }

  return { notFound: true };
};

export default function DynamicRoutePage(
  props: Record<string, unknown> & { __routeType: RouteType },
) {
  const { __routeType, ...pageProps } = props;
  const PageComponent = PAGE_COMPONENTS[__routeType];

  return <PageComponent {...pageProps} />;
}
