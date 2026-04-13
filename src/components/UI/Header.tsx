import React from "react";
import NextLink from "next/link";
import { siteName } from "@/utils/config";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NextLink href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-bold text-[#1e782d]">{siteName}</span>
        </NextLink>
        <nav className="hidden md:flex items-center gap-6">
          <NextLink
            href="/all/"
            className="text-sm font-medium text-gray-600 hover:text-[#1e782d] no-underline transition-colors"
          >
            ジム一覧
          </NextLink>
          <NextLink
            href="/area/"
            className="text-sm font-medium text-gray-600 hover:text-[#1e782d] no-underline transition-colors"
          >
            エリアから探す
          </NextLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
