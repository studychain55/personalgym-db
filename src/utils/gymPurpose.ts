import type { GymListItem, GymLocation } from "@/types";
import { PURPOSE_DEFINITIONS, getPurposeDefinition } from "@/constants/purposes";

type PurposeAwareGym = Pick<
  GymListItem,
  "name" | "catchphrase" | "programs" | "target_users" | "options_diet"
> | Pick<GymLocation, "name" | "catchphrase" | "programs" | "target_users" | "options_diet">;

const normalize = (value: string) => value.trim().toLowerCase();

const hasKeyword = (values: string[] | null | undefined, keywords: string[]) => {
  if (!values || values.length === 0) return false;
  const normalizedValues = values.map(normalize);
  return keywords.some((keyword) =>
    normalizedValues.some((value) => value.includes(normalize(keyword)))
  );
};

const hasTextKeyword = (value: string | null | undefined, keywords: string[]) => {
  if (!value) return false;
  const normalized = normalize(value);
  return keywords.some((keyword) => normalized.includes(normalize(keyword)));
};

export function matchesGymPurpose(gym: PurposeAwareGym, purposeSlug: string) {
  const purpose = getPurposeDefinition(purposeSlug);
  if (!purpose) return false;

  if (purpose.requiresDietOption && gym.options_diet) {
    return true;
  }

  return (
    hasKeyword(gym.programs, purpose.programKeywords) ||
    hasKeyword(gym.target_users, purpose.targetKeywords) ||
    hasTextKeyword(gym.catchphrase, purpose.catchphraseKeywords)
  );
}

export function getMatchedPurposes(gym: PurposeAwareGym, max = 3) {
  return PURPOSE_DEFINITIONS.filter((purpose) => matchesGymPurpose(gym, purpose.slug)).slice(0, max);
}

export function getRecommendedTags(gym: PurposeAwareGym, max = 5) {
  const tags = [
    ...getMatchedPurposes(gym, max).map((purpose) => purpose.shortLabel),
    ...(gym.programs || []).slice(0, max),
  ];

  return Array.from(new Set(tags)).slice(0, max);
}
