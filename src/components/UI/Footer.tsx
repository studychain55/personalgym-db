import React from "react";
import NextLink from "next/link";
import { siteName } from "@/utils/config";

const FOOTER_LINKS = [
  { label: "ジム一覧", href: "/all/" },
  { label: "エリアから探す", href: "/area/" },
  { label: "ブランドから探す", href: "/brand/" },
  { label: "運営者情報", href: "/about/" },
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "お問い合わせ", href: "/contact/" },
];

const PREFECTURE_REGIONS = [
  {
    name: "北海道・東北",
    prefectures: [
      { title: "北海道", slug: "hokkaido" },
      { title: "青森県", slug: "aomori" },
      { title: "岩手県", slug: "iwate" },
      { title: "宮城県", slug: "miyagi" },
      { title: "秋田県", slug: "akita" },
      { title: "山形県", slug: "yamagata" },
      { title: "福島県", slug: "fukushima" },
    ],
  },
  {
    name: "関東",
    prefectures: [
      { title: "東京都", slug: "tokyo" },
      { title: "神奈川県", slug: "kanagawa" },
      { title: "埼玉県", slug: "saitama" },
      { title: "千葉県", slug: "chiba" },
      { title: "茨城県", slug: "ibaraki" },
      { title: "栃木県", slug: "tochigi" },
      { title: "群馬県", slug: "gunma" },
    ],
  },
  {
    name: "中部",
    prefectures: [
      { title: "愛知県", slug: "aichi" },
      { title: "新潟県", slug: "niigata" },
      { title: "富山県", slug: "toyama" },
      { title: "石川県", slug: "ishikawa" },
      { title: "福井県", slug: "fukui" },
      { title: "山梨県", slug: "yamanashi" },
      { title: "長野県", slug: "nagano" },
      { title: "岐阜県", slug: "gifu" },
      { title: "静岡県", slug: "shizuoka" },
    ],
  },
  {
    name: "関西",
    prefectures: [
      { title: "大阪府", slug: "osaka" },
      { title: "京都府", slug: "kyoto" },
      { title: "兵庫県", slug: "hyogo" },
      { title: "奈良県", slug: "nara" },
      { title: "三重県", slug: "mie" },
      { title: "滋賀県", slug: "shiga" },
      { title: "和歌山県", slug: "wakayama" },
    ],
  },
  {
    name: "中国・四国",
    prefectures: [
      { title: "広島県", slug: "hiroshima" },
      { title: "岡山県", slug: "okayama" },
      { title: "鳥取県", slug: "tottori" },
      { title: "島根県", slug: "shimane" },
      { title: "山口県", slug: "yamaguchi" },
      { title: "徳島県", slug: "tokushima" },
      { title: "香川県", slug: "kagawa" },
      { title: "愛媛県", slug: "ehime" },
      { title: "高知県", slug: "kochi" },
    ],
  },
  {
    name: "九州・沖縄",
    prefectures: [
      { title: "福岡県", slug: "fukuoka" },
      { title: "佐賀県", slug: "saga" },
      { title: "長崎県", slug: "nagasaki" },
      { title: "熊本県", slug: "kumamoto" },
      { title: "大分県", slug: "oita" },
      { title: "宮崎県", slug: "miyazaki" },
      { title: "鹿児島県", slug: "kagoshima" },
      { title: "沖縄県", slug: "okinawa" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t border-[#1e782d]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Prefecture Links */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-white mb-4">エリアからパーソナルジムを探す</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PREFECTURE_REGIONS.map((region) => (
              <div key={region.name}>
                <p className="text-xs font-bold text-gray-400 mb-2">{region.name}</p>
                <ul className="list-none m-0 p-0 space-y-1">
                  {region.prefectures.map((pref) => (
                    <li key={pref.slug}>
                      <NextLink
                        href={`/p-${pref.slug}/`}
                        className="text-xs text-gray-500 hover:text-white no-underline transition-colors"
                      >
                        {pref.title}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row md:justify-between gap-6">
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
