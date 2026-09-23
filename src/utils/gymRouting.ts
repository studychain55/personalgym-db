export const normalizeRouteParam = (
  value: string | string[] | undefined
): string => {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (typeof rawValue !== "string") {
    return "";
  }

  try {
    return decodeURIComponent(rawValue).trim().replace(/^\/+|\/+$/g, "");
  } catch {
    return rawValue.trim().replace(/^\/+|\/+$/g, "");
  }
};

export const normalizeImageSrc = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return encodeURI(trimmed);
  } catch {
    return trimmed;
  }
};

export const formatStationAccess = (
  station: string | null | undefined,
  walkMinutes: number | null | undefined
) => {
  if (!station) {
    return null;
  }

  const stationLabel = station.trim().replace(/\s+/g, " ");
  const normalizedStation = /駅$/.test(stationLabel)
    ? stationLabel
    : `${stationLabel}駅`;

  if (typeof walkMinutes === "number" && walkMinutes > 0) {
    return `${normalizedStation} 徒歩${walkMinutes}分`;
  }

  return normalizedStation;
};

export const buildGymDetailHref = (uid: string | null | undefined) => {
  if (!uid) {
    return "/all/";
  }

  return `/gym/${encodeURIComponent(uid)}/`;
};

export const buildGymReviewsHref = (uid: string | null | undefined) => {
  const detailPath = buildGymDetailHref(uid);

  if (detailPath === "/all/") {
    return detailPath;
  }

  return `${detailPath}reviews/`;
};

const isDisplayablePrice = (
  value: number | null | undefined
): value is number => typeof value === "number" && Number.isFinite(value) && value > 0;

export const formatGymPrice = (price: number | null | undefined) => {
  if (!isDisplayablePrice(price)) {
    return null;
  }

  return `¥${price.toLocaleString()}`;
};
