import React from "react";

interface InlineCTAProps {
  areaName?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * インラインCTA - ページ中盤に配置する無料カウンセリング誘導
 * primary: ファーストビュー用（目立つオレンジ背景）
 * secondary: 中盤用（白背景ボーダー）
 */
const InlineCTA: React.FC<InlineCTAProps> = ({
  areaName,
  variant = "primary",
  className = "",
}) => {
  if (variant === "secondary") {
    return (
      <div
        className={`border-2 border-[#FF6B35] rounded-xl p-6 text-center ${className}`}
      >
        <p className="text-[#FF6B35] font-bold text-lg">
          迷ったらまずは無料カウンセリング
        </p>
        <p className="text-gray-600 text-sm mt-2">
          {areaName ? `${areaName}の` : ""}パーソナルジム選びでお悩みですか？
          プロのカウンセラーが無料であなたに最適なジムをご提案します。
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#counseling"
            className="inline-block bg-[#FF6B35] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#E55E2F] transition-colors no-underline text-sm"
          >
            無料カウンセリングを予約する
          </a>
          <a
            href="#line"
            className="inline-block bg-[#06C755] text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity no-underline text-sm"
          >
            LINEで相談する
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] rounded-xl p-6 text-white ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-bold text-lg">
            {areaName ? `${areaName}で` : ""}パーソナルジムをお探しですか？
          </p>
          <p className="text-white/90 text-sm mt-1">
            無料カウンセリングで、あなたに最適なジムをプロがご提案します
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="#counseling"
            className="inline-block bg-white text-[#FF6B35] font-bold px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-colors no-underline text-sm text-center"
          >
            無料カウンセリング予約
          </a>
          <a
            href="#line"
            className="inline-block bg-[#06C755] text-white font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity no-underline text-sm text-center"
          >
            LINE相談
          </a>
        </div>
      </div>
    </div>
  );
};

export default InlineCTA;
