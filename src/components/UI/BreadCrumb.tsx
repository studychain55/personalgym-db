import React from "react";
import NextLink from "next/link";

type SxValue = number | string | undefined;

type SpacingSx = {
  px?: SxValue;
  mx?: SxValue;
  my?: SxValue;
  mt?: SxValue;
  mb?: SxValue;
};

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  textColor?: string;
  iconColor?: string;
  className?: string;
  sx?: Record<string, unknown>;
}

const toSpacing = (value: SxValue) => {
  if (typeof value === "number") {
    return `${value * 8}px`;
  }
  return value;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, textColor, iconColor, className, sx }) => {
  const color = textColor || "#9e9e9e";
  const homeIconColor = iconColor || color;
  const spacing = (sx ?? {}) as SpacingSx;
  const preventHomeNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      event.preventDefault();
    }
  };
  const style: React.CSSProperties = {
    paddingLeft: toSpacing(spacing.px),
    paddingRight: toSpacing(spacing.px),
    marginLeft: toSpacing(spacing.mx),
    marginRight: toSpacing(spacing.mx),
    marginTop: toSpacing(spacing.mt ?? spacing.my),
    marginBottom: toSpacing(spacing.mb ?? spacing.my),
  };

  return (
    <div
      className="overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
      style={style}
    >
      <nav aria-label="breadcrumb" className={className}>
        <ol className="flex items-center flex-nowrap list-none m-0 p-0">
          <li className="inline-flex items-center text-[10px] md:text-base">
            <NextLink
              href="/"
              onClick={preventHomeNavigation}
              className="inline-flex items-center no-underline hover:underline font-normal md:font-bold text-[10px] md:text-base"
              style={{ color: "inherit" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={homeIconColor} aria-hidden="true">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span
                className="ml-[10px] tracking-[0.04em] font-normal md:font-bold text-[10px] md:text-base"
                style={{ color }}
              >
                ホーム
              </span>
            </NextLink>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="inline-flex items-center mx-1 text-[16px] md:text-[20px]" aria-hidden="true">
                <span style={{ color }}>›</span>
              </li>
              <li className="inline-flex items-center text-[10px] md:text-base">
                {item.href ? (
                  <NextLink
                    href={item.href}
                    className="inline-flex no-underline hover:underline font-normal md:font-bold text-[10px] md:text-base"
                    style={{ color }}
                  >
                    {item.label}
                  </NextLink>
                ) : (
                  <span
                    className="inline-flex font-normal md:font-bold text-[10px] md:text-base tracking-[0.04em]"
                    style={{ color }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
