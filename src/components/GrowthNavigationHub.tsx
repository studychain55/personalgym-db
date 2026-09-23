import Link from "next/link";

type HubLink = {
  label: string;
  href: string;
};

type GrowthNavigationHubProps = {
  siteName: string;
  categoryName: string;
  entityName: string;
  accent: string;
  searchHref: string;
  compareHref: string;
  guideHref: string;
  conversionHref: string;
  popularLinks: HubLink[];
  areaLinks: HubLink[];
};

export default function GrowthNavigationHub({
  siteName,
  categoryName,
  entityName,
  accent,
  searchHref,
  compareHref,
  guideHref,
  conversionHref,
  popularLinks,
  areaLinks,
}: GrowthNavigationHubProps) {
  const nextSteps = [
    { label: "一覧で比較する", href: searchHref, description: `${entityName}を料金・特徴・対応エリアでまとめて確認` },
    { label: "選び方を確認する", href: guideHref, description: "失敗しやすい比較軸を先に整理してから探せます" },
    { label: "候補を絞り込む", href: compareHref, description: "条件に合う候補だけを短時間で見比べられます" },
    { label: "相談・問い合わせへ進む", href: conversionHref, description: "気になる候補が見つかったら次の行動に進めます" },
  ];

  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)", gap: 24, alignItems: "start" }} className="growth-hub-grid">
          <div>
            <p style={{ color: accent, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>{siteName}の回遊ナビ</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.35, margin: "0 0 10px", fontWeight: 800 }}>
              {categoryName}探しを、次の1ページにつなげる。
            </h2>
            <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.8, margin: "0 0 20px" }}>
              トップページで終わらず、比較・エリア・選び方へ進める導線をまとめました。条件が決まっている人も、まだ迷っている人も、必要なページへすぐ移動できます。
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
              {nextSteps.map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
                  <div style={{ border: "1px solid #e5e7eb", borderLeft: `4px solid ${accent}`, borderRadius: 8, padding: 16, height: "100%", background: "#fff" }}>
                    <div style={{ color: "#111827", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.6 }}>{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 18, background: "#f9fafb" }}>
            <h3 style={{ color: "#111827", fontSize: 16, fontWeight: 800, margin: "0 0 12px" }}>人気の探し方</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {popularLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ color: accent, border: "1px solid #d1d5db", background: "#fff", borderRadius: 999, padding: "7px 11px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  {item.label}
                </Link>
              ))}
            </div>
            <h3 style={{ color: "#111827", fontSize: 16, fontWeight: 800, margin: "0 0 12px" }}>主要エリア</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
              {areaLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ color: "#374151", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 10px", fontSize: 13, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 820px) {
          .growth-hub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
