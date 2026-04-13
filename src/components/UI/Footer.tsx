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
        {/* おすすめサービス */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <h3 className="text-white font-bold text-sm mb-3">おすすめサービス</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://studychain.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Studychain</a>
            <a href="https://pilates-station.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ピラティスステーション</a>
            <a href="https://ohaka-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">お墓ステーション</a>
            <a href="https://photo-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">フォトスタジオナビ</a>
            <a href="https://tantei-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">探偵ナビ</a>
            <a href="https://sigyo-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">士業ナビ</a>
            <a href="https://hakenstation.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">派遣ステーション</a>
            <a href="https://driverstation.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ドライバーステーション</a>
            <a href="https://internationalschool-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">インターナショナルスクールナビ</a>
            <a href="https://ryugakustation.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">留学ステーション</a>
            <a href="https://school-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">スクールステーション</a>
            <a href="https://musicschool-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">音楽教室ステーション</a>
            <a href="https://butsudan-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">仏壇ステーション</a>
            <a href="https://eikaiwa-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">英会話ステーション</a>
            <a href="https://cookschool-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">料理教室ステーション</a>
            <a href="https://danceschool-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ダンススクールステーション</a>
            <a href="https://golfschool-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ゴルフスクールステーション</a>
            <a href="https://whitening-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ホワイトニングステーション</a>
            <a href="https://seitai-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">整体ステーション</a>
            <a href="https://kaitai-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">解体ステーション</a>
            <a href="https://reform-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">リフォームステーション</a>
            <a href="https://rojinhome-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">老人ホームステーション</a>
            <a href="https://trimming-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">トリミングステーション</a>
            <a href="https://petsalon-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ペットサロンナビ</a>
            <a href="https://pethotel-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ペットホテルナビ</a>
            <a href="https://animal-hospital-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">動物病院ナビ</a>
            <a href="https://allkaishu-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">不用品回収ナビ</a>
            <a href="https://hearing-aid-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">補聴器ナビ</a>
            <a href="https://ihinseiri-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">遺品整理ナビ</a>
            <a href="https://suido-repair-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">水道修理ナビ</a>
            <a href="https://kajidaiko-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">家事代行ナビ</a>
            <a href="https://kekkon-soudanjo-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">結婚相談所ナビ</a>
            <a href="https://karaoke-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">カラオケナビ</a>
            <a href="https://solarsystem-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">太陽光ナビ</a>
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
