import React from "react";
import NextLink from "next/link";
import { siteName } from "@/utils/config";
import { GYM_CONDITIONS } from "@/types/conditions";

const FOOTER_LINKS = [
  { label: "ジム一覧", href: "/all/" },
  { label: "運営者情報", href: "/about/" },
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "お問い合わせ", href: "/contact/" },
];

const POPULAR_AREAS = [
  { label: "東京", slug: "tokyo" },
  { label: "大阪", slug: "osaka" },
  { label: "神奈川", slug: "kanagawa" },
  { label: "愛知", slug: "aichi" },
  { label: "福岡", slug: "fukuoka" },
  { label: "北海道", slug: "hokkaido" },
  { label: "京都", slug: "kyoto" },
  { label: "兵庫", slug: "hyogo" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <NextLink href="/" className="text-xl font-bold text-white no-underline">
              {siteName}
            </NextLink>
            <p className="text-sm mt-2 text-gray-400">
              日本最大級のパーソナルジム検索サイト
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="#counseling"
                className="inline-block bg-[#FF6B35] text-white font-bold px-4 py-2 rounded-lg text-sm text-center no-underline hover:bg-[#E55E2F] transition-colors"
              >
                無料カウンセリング予約
              </a>
              <a
                href="#line"
                className="inline-block bg-[#06C755] text-white font-bold px-4 py-2 rounded-lg text-sm text-center no-underline hover:opacity-90 transition-opacity"
              >
                LINEで相談する
              </a>
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">人気エリア</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_AREAS.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/gym/area/${area.slug}/`}
                  className="text-sm text-gray-400 hover:text-white no-underline transition-colors"
                >
                  {area.label}
                </NextLink>
              ))}
            </div>
            <h3 className="text-sm font-bold text-white mb-3 mt-6">条件から探す</h3>
            <div className="flex flex-wrap gap-2">
              {GYM_CONDITIONS.slice(0, 6).map((cond) => (
                <NextLink
                  key={cond.slug}
                  href={`/all/?condition=${cond.slug}`}
                  className="text-sm text-gray-400 hover:text-white no-underline transition-colors"
                >
                  {cond.shortLabel}
                </NextLink>
              ))}
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">サイト情報</h3>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white no-underline transition-colors"
                >
                  {link.label}
                </NextLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
