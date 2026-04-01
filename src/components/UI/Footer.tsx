import React from "react";
import NextLink from "next/link";
import { siteName } from "@/utils/config";

const FOOTER_LINKS = [
  { label: "ジム一覧", href: "/all/" },
  { label: "運営者情報", href: "/about/" },
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "お問い合わせ", href: "/contact/" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <NextLink href="/" className="text-xl font-bold text-white no-underline">
              {siteName}
            </NextLink>
            <p className="text-sm mt-2 text-gray-400">
              日本最大級のパーソナルジム検索サイト
            </p>
          </div>
          <nav className="flex flex-wrap gap-4">
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
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
