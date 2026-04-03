import React from "react";

/**
 * 初心者向け不安解消セクション
 * ジム詳細ページやエリアページの下部に配置
 */
const AnxietyRelief: React.FC<{ className?: string }> = ({ className = "" }) => {
  const points = [
    {
      icon: "👤",
      title: "初心者でも安心",
      text: "パーソナルジムはマンツーマン指導なので、運動未経験の方でも自分のペースで始められます。",
    },
    {
      icon: "📋",
      title: "無料カウンセリングから",
      text: "いきなり入会ではなく、まずは無料カウンセリングであなたの目標や不安をプロに相談できます。",
    },
    {
      icon: "🔄",
      title: "体験してから決められる",
      text: "多くのジムで体験トレーニングを実施。実際の雰囲気やトレーナーとの相性を確認してから入会できます。",
    },
    {
      icon: "💰",
      title: "料金プランも多様",
      text: "月額制、回数券、短期集中など、予算やライフスタイルに合わせて選べるプランが充実しています。",
    },
  ];

  return (
    <section className={`bg-orange-50 rounded-xl p-6 md:p-8 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        パーソナルジムが初めてでも安心
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((point) => (
          <div key={point.title} className="bg-white rounded-lg p-4 flex gap-3">
            <span className="text-2xl shrink-0">{point.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{point.title}</h3>
              <p className="text-gray-600 text-xs mt-1">{point.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a
          href="#counseling"
          className="inline-block bg-[#FF6B35] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline"
        >
          まずは無料カウンセリングで相談する
        </a>
      </div>
    </section>
  );
};

export default AnxietyRelief;
