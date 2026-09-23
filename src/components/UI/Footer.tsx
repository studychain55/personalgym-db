import NextLink from "next/link";
import { siteName } from "@/utils/config";

const gradeLinks = [
  { href: "/grade/elementary/", label: "小学生向け" },
  { href: "/grade/junior-high/", label: "中学生向け" },
  { href: "/grade/high-school/", label: "高校生向け" },
  { href: "/grade/ronin/", label: "浪人生向け" },
];
const styleLinks = [
  { href: "/style/individual/", label: "個別指導" },
  { href: "/style/video/", label: "映像授業" },
  { href: "/style/coaching/", label: "コーチング" },
  { href: "/style/correspondence/", label: "通信教育" },
];
const typeLinks = [
  { href: "/juku/", label: "オンライン塾一覧" },
  { href: "/tutor/", label: "家庭教師一覧" },
  { href: "/compare/", label: "料金比較表" },
  { href: "/guide/", label: "選び方ガイド" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t border-[#ea580c]">
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
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">学年別</p>
            <ul className="space-y-2">
              {gradeLinks.map(l => (
                <li key={l.href}>
                  <NextLink href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</NextLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">指導スタイル</p>
            <ul className="space-y-2">
              {styleLinks.map(l => (
                <li key={l.href}>
                  <NextLink href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</NextLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">サービス</p>
            <ul className="space-y-2">
              {typeLinks.map(l => (
                <li key={l.href}>
                  <NextLink href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</NextLink>
                </li>
              ))}
              <li><NextLink href="/privacy/" className="text-sm hover:text-white transition-colors">プライバシーポリシー</NextLink></li>
            </ul>
          </div>
        </div>
        {/* 関連サービス */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <h3 className="text-white font-bold text-sm mb-3">関連サービス</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 max-h-44 overflow-auto pr-1 sm:max-h-none sm:overflow-visible">
            <a href="https://studychain.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Studychain</a>
            <a href="https://mitsukaru-next.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ミツカル転職</a>
            <a href="https://mitsukaru-career.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ミツカル就職</a>
            <a href="https://pilates-station.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ピラティスステーション</a>
            <a href="https://ohaka-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">お墓ステーション</a>
            <a href="https://photo-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">フォトスタジオナビ</a>
            <a href="https://tantei-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">探偵ナビ</a>
            <a href="https://sigyo-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">士業ナビ</a>
            <a href="https://hakenstation.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">派遣ステーション</a>
            <a href="https://mendan-kakutoku.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">求職者面談獲得くん</a>
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
            <a href="https://kobetsu-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">個別指導塾比較ナビ</a>
            <a href="https://chugaku-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">中学受験塾比較ナビ</a>
            <a href="https://koko-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">高校受験塾比較ナビ</a>
            <a href="https://daigaku-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">大学受験予備校比較ナビ</a>
            <a href="https://onlinetutor-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">オンライン家庭教師比較ナビ</a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 text-center">© 2026 {siteName} ｜ 掲載情報は参考です。最新情報は公式サイトをご確認ください。</p>
        </div>
      </div>
    </footer>
  );
}
