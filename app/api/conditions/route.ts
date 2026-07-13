import { getRuntimeSetting } from "../../../db";
import {
  CAMP_LATITUDE,
  CAMP_LONGITUDE,
  fetchForecast,
  fetchHazards,
  fetchObservation,
  NWS_ALERTS_PAGE,
  NWS_FORECAST_PAGE,
  NWS_OBSERVATION_URL,
  NWS_STATION_ID,
  NWS_STATION_NAME,
} from "../../../lib/conditions/nws";
import { CORONADO_ALERTS_URL, fetchCoronadoFireStatus } from "../../../lib/conditions/usfs";
import type {
  ConditionsReport,
  FeedMeta,
  FeedStatus,
  FireReport,
  ReportStatus,
  WeatherForecast,
  WeatherHazards,
  WeatherObservation,
} from "../../../lib/conditions/types";

const FALLBACK_MAX_AGE_MS = 6 * 60 * 60 * 1000;
const DEFAULT_USER_AGENT = "CampLawtonLeaderHub/2.0 (https://camp-lawton-leader-hub-2027.manosdvd.chatgpt.site)";

type CachedFeed = { value: { meta: FeedMeta }; savedAt: number };
type ConditionsGlobal = typeof globalThis & { __campLawtonConditionsCache?: Record<string, CachedFeed> };
const feedCache = (globalThis as ConditionsGlobal).__campLawtonConditionsCache ??= {};

function unavailableMeta(checkedAt: string, sourceLabel: string, sourceUrl: string, statusMessage: string): FeedMeta {
  return { status: "unavailable", checkedAt, updatedAt: null, sourceLabel, sourceUrl, fallback: false, statusMessage };
}

async function withFallback<T extends { meta: FeedMeta }>(key: string, checkedAt: Date, loader: () => Promise<T>, unavailable: () => T): Promise<T> {
  try {
    const value = await loader();
    feedCache[key] = { value, savedAt: checkedAt.valueOf() };
    return value;
  } catch (error) {
    console.warn(`Conditions refresh failed for ${key}`, error);
    const cached = feedCache[key];
    if (cached && checkedAt.valueOf() - cached.savedAt <= FALLBACK_MAX_AGE_MS) {
      const value = cached.value as T;
      return {
        ...value,
        meta: {
          ...value.meta,
          status: "stale",
          checkedAt: checkedAt.toISOString(),
          fallback: true,
          statusMessage: "Refresh failed; showing the last successful response",
        },
      };
    }
    return unavailable();
  }
}

function combine(statuses: FeedStatus[]): ReportStatus {
  if (statuses.every((status) => status === "unavailable")) return "unavailable";
  if (statuses.some((status) => status === "unavailable")) return "partial";
  if (statuses.some((status) => status === "stale")) return "stale";
  return "current";
}

export async function GET() {
  const checkedAt = new Date();
  const checkedAtIso = checkedAt.toISOString();
  const userAgent = getRuntimeSetting("NWS_USER_AGENT")?.trim() || DEFAULT_USER_AGENT;

  const [observation, forecast, hazards, fire] = await Promise.all([
    withFallback<WeatherObservation>("nws-observation", checkedAt, () => fetchObservation(checkedAt, userAgent), () => ({
      meta: unavailableMeta(checkedAtIso, `NWS station ${NWS_STATION_ID}`, NWS_OBSERVATION_URL, "Station observation is unavailable"),
      stationId: NWS_STATION_ID,
      stationName: NWS_STATION_NAME,
      elevationFeet: 7554,
      temperatureF: null,
      feelsLikeF: null,
      description: null,
      dewpointF: null,
      relativeHumidityPercent: null,
      windDirection: null,
      windSpeedMph: null,
      windGustMph: null,
      visibilityMiles: null,
    })),
    withFallback<WeatherForecast>("nws-forecast", checkedAt, () => fetchForecast(checkedAt, userAgent), () => ({
      meta: unavailableMeta(checkedAtIso, "National Weather Service Tucson", NWS_FORECAST_PAGE, "Point forecast is unavailable"),
      locationName: "Camp Lawton, Arizona",
      elevationFeet: null,
      periods: [],
    })),
    withFallback<WeatherHazards>("nws-hazards", checkedAt, () => fetchHazards(checkedAt, userAgent), () => ({
      meta: unavailableMeta(checkedAtIso, "National Weather Service alerts", NWS_ALERTS_PAGE, "Active hazard feed is unavailable"),
      items: [],
    })),
    withFallback<FireReport>("usfs-fire", checkedAt, () => fetchCoronadoFireStatus(checkedAt, userAgent), () => ({
      meta: unavailableMeta(checkedAtIso, "USDA Forest Service", CORONADO_ALERTS_URL, "Official fire status is unavailable"),
      forestName: "Coronado National Forest",
      zoneName: null,
      dangerLevel: null,
      dangerLabel: null,
      dangerDescription: null,
      restriction: null,
    })),
  ]);

  const weatherStatus = combine([observation.meta.status, forecast.meta.status, hazards.meta.status]);
  const status = combine([
    weatherStatus === "partial" ? "unavailable" : weatherStatus,
    fire.meta.status,
  ]);
  const report: ConditionsReport = {
    status: weatherStatus === "partial" && status === "unavailable" ? "partial" : status,
    checkedAt: checkedAtIso,
    location: {
      name: "Camp Lawton",
      latitude: CAMP_LATITUDE,
      longitude: CAMP_LONGITUDE,
      timeZone: "America/Phoenix",
    },
    weather: { status: weatherStatus, observation, forecast, hazards },
    fire,
  };

  return Response.json(report, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=900",
      "CDN-Cache-Control": "public, max-age=300, stale-while-revalidate=900",
    },
  });
}
