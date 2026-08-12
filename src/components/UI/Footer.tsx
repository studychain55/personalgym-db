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
    <footer className="bg-gray-900 text-gray-300 mt-10 sm:mt-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 mb-8 sm:mb-10">
          <div className="col-span-2 md:col-span-1">
            <NextLink href="/" className="text-lg font-bold text-white block mb-2">{siteName}</NextLink>
            <p className="text-xs text-gray-400 leading-relaxed">
              オンライン家庭教師を料金・講師タイプ・口コミで徹底比較。小学生、中学生、高校生、受験対策、不登校対応、無料体験の有無から選べます。
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
            <a href="https://gym-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ジムナビ</a>
            <a href="https://ohaka-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">お墓ステーション</a>
            <a href="https://photo-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">フォトスタジオナビ</a>
            <a href="https://tantei-navi.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">探偵ナビ</a>
            <a href="https://sigyo-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">士業ナビ</a>
            <a href="https://hakenstation.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">派遣ステーション</a>
            <a href="https://mendan-kakutoku.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">求職者面談獲得くん</a>
            <a href="https://robots-center.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ロボット手書きDMセンター</a>
            <a href="https://scout-souken.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">AIスカウト総合研究所</a>
            <a href="https://japan-writing-center.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">AIショート動画広告納品くん</a>
            <a href="https://driverstation.jp" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">ドライバーステーション</a>
            <a href="https://internationalschool-navi.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">インターナショナルスクールナビ</a>
            <a href="https://ryugakustation.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">留学ステーション</a>
            <a href="https://school-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">スクールステーション</a>
            <a href="https://musicschool-station.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">音楽教室ステーション</a>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 text-center">© 2026 {siteName} ｜ 掲載情報は参考です。最新情報は公式サイトをご確認ください。</p>
        </div>
      </div>
    </footer>
  );
}
