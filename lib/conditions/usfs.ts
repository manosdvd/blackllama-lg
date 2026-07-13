import type { FireDangerLevel, FireReport } from "./types";

export const CORONADO_ALERTS_URL = "https://www.fs.usda.gov/r03/coronado/alerts";
const FOREST_NAME = "Coronado National Forest";

export type RawFireStatus = {
  dangerLabel: string;
  dangerDescription: string;
  zoneName: string;
  restrictionTitle: string;
  restrictionSummary: string;
  restrictionHref: string;
};

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeDangerLevel(value: string): FireDangerLevel | null {
  const levels: FireDangerLevel[] = ["Low", "Moderate", "High", "Very High", "Extreme"];
  const normalized = clean(value).toLowerCase();
  return levels.find((level) => level.toLowerCase() === normalized) ?? null;
}

function officialUrl(href: string): string {
  try {
    const url = new URL(href, CORONADO_ALERTS_URL);
    return url.protocol === "https:" && url.hostname === "www.fs.usda.gov" ? url.toString() : CORONADO_ALERTS_URL;
  } catch {
    return CORONADO_ALERTS_URL;
  }
}

export function normalizeFireStatus(raw: RawFireStatus, checkedAt: Date): FireReport {
  const dangerLabel = clean(raw.dangerLabel) || null;
  const restrictionTitle = clean(raw.restrictionTitle);
  const restrictionSummary = clean(raw.restrictionSummary);
  if (!dangerLabel && !restrictionTitle) throw new Error("USFS page did not contain fire status data");

  return {
    meta: {
      status: "current",
      checkedAt: checkedAt.toISOString(),
      updatedAt: null,
      sourceLabel: "USDA Forest Service",
      sourceUrl: CORONADO_ALERTS_URL,
      fallback: false,
      statusMessage: "Official forest status checked",
    },
    forestName: FOREST_NAME,
    zoneName: clean(raw.zoneName) || null,
    dangerLevel: dangerLabel ? normalizeDangerLevel(dangerLabel) : null,
    dangerLabel,
    dangerDescription: clean(raw.dangerDescription) || null,
    restriction: restrictionTitle ? {
      title: restrictionTitle,
      summary: restrictionSummary || null,
      sourceUrl: officialUrl(raw.restrictionHref),
    } : null,
  };
}

export async function fetchCoronadoFireStatus(checkedAt: Date, userAgent: string): Promise<FireReport> {
  const response = await fetch(CORONADO_ALERTS_URL, {
    headers: { Accept: "text/html", "User-Agent": userAgent },
    redirect: "follow",
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) throw new Error(`USFS request failed with ${response.status}`);

  const raw: RawFireStatus = {
    dangerLabel: "",
    dangerDescription: "",
    zoneName: "",
    restrictionTitle: "",
    restrictionSummary: "",
    restrictionHref: "",
  };
  let restrictionCardCount = 0;

  const transformed = new HTMLRewriter()
    .on(".wfs-fire__danger_level", {
      element(element) {
        raw.dangerDescription ||= element.getAttribute("aria-label") ?? element.getAttribute("title") ?? "";
      },
      text(text) { raw.dangerLabel += text.text; },
    })
    .on(".wfs-fire__zone span.margin-0", {
      text(text) { raw.zoneName += text.text; },
    })
    .on(".wfs-alerts__alerts a.alert_level--fire-restriction", {
      element(element) { raw.restrictionHref ||= element.getAttribute("href") ?? ""; },
      text(text) { raw.restrictionTitle += text.text; },
    })
    .on(".rows__container .wfs-alert-flag.fire-restriction .usa-card__body", {
      element() { restrictionCardCount += 1; },
      text(text) {
        if (restrictionCardCount === 1) raw.restrictionSummary += text.text;
      },
    });

  await transformed.transform(response).arrayBuffer();
  return normalizeFireStatus(raw, checkedAt);
}
