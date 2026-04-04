export interface PurposeDefinition {
  slug: "diet" | "women" | "beginner" | "muscle" | "food-support";
  label: string;
  shortLabel: string;
  description: string;
  seoTitleSuffix: string;
  intro: string;
  comparisonPoints: string[];
  programKeywords: string[];
  targetKeywords: string[];
  catchphraseKeywords: string[];
  requiresDietOption?: boolean;
}

export const PURPOSE_DEFINITIONS: PurposeDefinition[] = [
  {
    slug: "diet",
    label: "ダイエット向け",
    shortLabel: "ダイエット",
    description: "減量・体脂肪改善・ボディラインづくりを重視して探したい方向け。",
    seoTitleSuffix: "ダイエット向けパーソナルジム",
    intro: "短期集中や食事管理、体脂肪改善に強みがあるジムを見つけやすくします。",
    comparisonPoints: ["料金総額", "食事サポート", "体験の有無", "継続しやすさ"],
    programKeywords: ["ダイエット", "短期集中", "産後ダイエット", "脚痩せ", "下半身ボディメイク", "食事管理"],
    targetKeywords: ["diet", "weight", "postpartum", "rebound"],
    catchphraseKeywords: ["ダイエット", "減量", "痩せ"],
    requiresDietOption: true,
  },
  {
    slug: "women",
    label: "女性向け",
    shortLabel: "女性向け",
    description: "女性トレーナーや美ボディ、脚痩せなど女性ニーズに合うジムを探したい方向け。",
    seoTitleSuffix: "女性向けパーソナルジム",
    intro: "女性が通いやすい雰囲気や、女性向けメニューがあるジムを比較しやすくします。",
    comparisonPoints: ["女性向けプログラム", "食事サポート", "通いやすさ", "体験の有無"],
    programKeywords: ["女性向け", "女性向けトレーニング", "美ボディ", "脚痩せ", "産後ダイエット", "ピラティス"],
    targetKeywords: ["female", "women", "postpartum", "mothers"],
    catchphraseKeywords: ["女性", "美ボディ", "しなやか"],
  },
  {
    slug: "beginner",
    label: "初心者向け",
    shortLabel: "初心者向け",
    description: "運動習慣がない人や、ジム通いが初めてでも始めやすい施設を探したい方向け。",
    seoTitleSuffix: "初心者向けパーソナルジム",
    intro: "トレーニング経験が少ない方でも相談しやすいジムを見つけやすくします。",
    comparisonPoints: ["体験の有無", "料金の始めやすさ", "トレーナー数", "継続サポート"],
    programKeywords: ["初心者向け", "パーソナルトレーニング", "姿勢改善", "健康維持"],
    targetKeywords: ["beginner", "motivation", "gradual", "knowledge-seeking", "cost-conscious"],
    catchphraseKeywords: ["初心者", "初めて", "続けやすい"],
  },
  {
    slug: "muscle",
    label: "筋力アップ・ボディメイク向け",
    shortLabel: "筋力アップ",
    description: "筋力アップ、ボディメイク、見た目改善を重視したい方向け。",
    seoTitleSuffix: "筋力アップ向けパーソナルジム",
    intro: "筋トレやボディメイク、引き締めを重視したジムを比較しやすくします。",
    comparisonPoints: ["プログラム内容", "トレーナー数", "セッション時間", "設備"],
    programKeywords: ["ボディメイク", "筋トレ", "パワーアップ", "高度なトレーニング", "美ボディ"],
    targetKeywords: ["body", "aesthetic", "competition"],
    catchphraseKeywords: ["ボディメイク", "筋力", "引き締め"],
  },
  {
    slug: "food-support",
    label: "食事指導あり",
    shortLabel: "食事指導あり",
    description: "食事管理や栄養アドバイス込みでサポートを受けたい方向け。",
    seoTitleSuffix: "食事指導ありのパーソナルジム",
    intro: "食事指導や栄養サポートの有無を重視して探したい方に向けた一覧です。",
    comparisonPoints: ["食事指導の有無", "料金総額", "体験の有無", "継続支援"],
    programKeywords: ["食事指導", "食事管理", "3食食べる"],
    targetKeywords: ["diet", "health-conscious", "lifestyle"],
    catchphraseKeywords: ["食事", "栄養"],
    requiresDietOption: true,
  },
];

export function getPurposeDefinition(slug: string) {
  return PURPOSE_DEFINITIONS.find((purpose) => purpose.slug === slug);
}
