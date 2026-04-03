import React, { useState } from "react";
import NextLink from "next/link";
import { siteName } from "@/utils/config";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NextLink href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-bold text-[#FF6B35]">{siteName}</span>
        </NextLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NextLink
            href="/all/"
            className="text-sm font-medium text-gray-600 hover:text-[#FF6B35] no-underline transition-colors"
          >
            ジム一覧
          </NextLink>
          <NextLink
            href="/#area"
            className="text-sm font-medium text-gray-600 hover:text-[#FF6B35] no-underline transition-colors"
          >
            エリアから探す
          </NextLink>
          <a
            href="#counseling"
            className="bg-[#FF6B35] text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#E55E2F] transition-colors no-underline"
          >
            無料カウンセリング
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニュー"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white pb-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-col gap-2 pt-3">
            <NextLink
              href="/all/"
              className="text-sm font-medium text-gray-600 py-2 no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              ジム一覧
            </NextLink>
            <NextLink
              href="/#area"
              className="text-sm font-medium text-gray-600 py-2 no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              エリアから探す
            </NextLink>
            <a
              href="#counseling"
              className="bg-[#FF6B35] text-white font-bold px-4 py-2.5 rounded-lg text-sm text-center no-underline mt-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              無料カウンセリング予約
            </a>
            <a
              href="#line"
              className="bg-[#06C755] text-white font-bold px-4 py-2.5 rounded-lg text-sm text-center no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              LINEで相談する
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
