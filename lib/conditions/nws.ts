import type {
  FeedMeta,
  ForecastPeriod,
  WeatherForecast,
  WeatherHazard,
  WeatherHazards,
  WeatherObservation,
} from "./types";

export const CAMP_LATITUDE = 32.4033;
export const CAMP_LONGITUDE = -110.7215;
export const NWS_STATION_ID = "QSLA3";
export const NWS_STATION_NAME = "SCOUT CAMP";
export const NWS_FORECAST_PAGE = `https://forecast.weather.gov/MapClick.php?lat=${CAMP_LATITUDE}&lon=${CAMP_LONGITUDE}`;
export const NWS_ALERTS_PAGE = `https://api.weather.gov/alerts/active?point=${CAMP_LATITUDE},${CAMP_LONGITUDE}`;
export const NWS_OBSERVATION_URL = `https://api.weather.gov/stations/${NWS_STATION_ID}/observations/latest`;

const NWS_POINT_URL = `https://api.weather.gov/points/${CAMP_LATITUDE},${CAMP_LONGITUDE}`;
const STALE_OBSERVATION_MS = 3 * 60 * 60 * 1000;
const STALE_FORECAST_MS = 12 * 60 * 60 * 1000;
const STALE_HAZARDS_MS = 30 * 60 * 1000;

type Quantity = { unitCode?: string; value?: number | null } | null | undefined;
type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? value as JsonRecord : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function round(value: number | null, precision = 0): number | null {
  if (value == null) return null;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function quantity(value: unknown): Quantity {
  return value && typeof value === "object" ? value as Quantity : null;
}

export function temperatureToFahrenheit(value: Quantity): number | null {
  const measurement = value?.value;
  if (measurement == null || !Number.isFinite(measurement)) return null;
  if (value?.unitCode?.endsWith(":degF")) return round(measurement);
  if (value?.unitCode?.endsWith(":degC")) return round(measurement * 9 / 5 + 32);
  return null;
}

export function speedToMph(value: Quantity): number | null {
  const measurement = value?.value;
  if (measurement == null || !Number.isFinite(measurement)) return null;
  if (value?.unitCode?.endsWith(":km_h-1")) return round(measurement * 0.621371, 1);
  if (value?.unitCode?.endsWith(":m_s-1")) return round(measurement * 2.23694, 1);
  return null;
}

export function degreesToCardinal(degrees: number | null): string | null {
  if (degrees == null) return null;
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16];
}

function statusForTimestamp(timestamp: string | null, staleAfterMs: number, now: Date): "current" | "stale" {
  if (!timestamp) return "stale";
  const value = Date.parse(timestamp);
  return Number.isFinite(value) && now.valueOf() - value <= staleAfterMs ? "current" : "stale";
}

function meta(input: Omit<FeedMeta, "fallback">): FeedMeta {
  return { ...input, fallback: false };
}

export function normalizeObservation(payload: unknown, checkedAt: Date): WeatherObservation {
  const properties = asRecord(asRecord(payload).properties);
  const observedAt = asString(properties.timestamp);
  const status = statusForTimestamp(observedAt, STALE_OBSERVATION_MS, checkedAt);
  const heatIndexF = temperatureToFahrenheit(quantity(properties.heatIndex));
  const windChillF = temperatureToFahrenheit(quantity(properties.windChill));
  const humidity = asNumber(quantity(properties.relativeHumidity)?.value);
  const visibilityMeters = asNumber(quantity(properties.visibility)?.value);

  return {
    meta: meta({
      status,
      checkedAt: checkedAt.toISOString(),
      updatedAt: observedAt,
      sourceLabel: `NWS station ${NWS_STATION_ID}`,
      sourceUrl: NWS_OBSERVATION_URL,
      statusMessage: status === "current" ? "Latest station observation" : "Latest station observation is older than three hours",
    }),
    stationId: NWS_STATION_ID,
    stationName: NWS_STATION_NAME,
    elevationFeet: 7554,
    temperatureF: temperatureToFahrenheit(quantity(properties.temperature)),
    feelsLikeF: heatIndexF ?? windChillF,
    description: asString(properties.textDescription),
    dewpointF: temperatureToFahrenheit(quantity(properties.dewpoint)),
    relativeHumidityPercent: round(humidity),
    windDirection: degreesToCardinal(asNumber(quantity(properties.windDirection)?.value)),
    windSpeedMph: speedToMph(quantity(properties.windSpeed)),
    windGustMph: speedToMph(quantity(properties.windGust)),
    visibilityMiles: visibilityMeters == null ? null : round(visibilityMeters / 1609.344, 1),
  };
}

function safeNwsIcon(value: unknown): string | null {
  const url = asString(value);
  return url?.startsWith("https://api.weather.gov/icons/") ? url : null;
}

export function normalizeForecast(payload: unknown, checkedAt: Date, locationName: string): WeatherForecast {
  const properties = asRecord(asRecord(payload).properties);
  const updatedAt = asString(properties.updateTime) ?? asString(properties.generatedAt);
  const rawPeriods = Array.isArray(properties.periods) ? properties.periods : [];
  const periods = rawPeriods.slice(0, 6).map((value, index): ForecastPeriod | null => {
    const period = asRecord(value);
    const temperature = asNumber(period.temperature);
    const startTime = asString(period.startTime);
    const endTime = asString(period.endTime);
    if (temperature == null || !startTime || !endTime) return null;
    return {
      id: asNumber(period.number) ?? index + 1,
      name: asString(period.name) ?? `Period ${index + 1}`,
      startTime,
      endTime,
      isDaytime: period.isDaytime === true,
      temperatureF: Math.round(temperature),
      precipitationChancePercent: round(asNumber(quantity(period.probabilityOfPrecipitation)?.value)),
      windSpeed: asString(period.windSpeed) ?? "Not reported",
      windDirection: asString(period.windDirection) ?? "",
      shortForecast: asString(period.shortForecast) ?? "Forecast details unavailable",
      detailedForecast: asString(period.detailedForecast) ?? "Forecast details unavailable.",
      iconUrl: safeNwsIcon(period.icon),
    };
  }).filter((period): period is ForecastPeriod => period !== null);

  if (!periods.length) throw new Error("NWS forecast did not contain usable periods");
  const elevation = asNumber(quantity(properties.elevation)?.value);
  const status = statusForTimestamp(updatedAt, STALE_FORECAST_MS, checkedAt);
  return {
    meta: meta({
      status,
      checkedAt: checkedAt.toISOString(),
      updatedAt,
      sourceLabel: "National Weather Service Tucson",
      sourceUrl: NWS_FORECAST_PAGE,
      statusMessage: status === "current" ? "Current point forecast" : "Forecast update is older than twelve hours",
    }),
    locationName,
    elevationFeet: elevation == null ? null : Math.round(elevation * 3.28084),
    periods,
  };
}

function safeAlertUrl(value: unknown): string {
  const url = asString(value);
  return url?.startsWith("https://api.weather.gov/") || url?.startsWith("https://www.weather.gov/") ? url : NWS_ALERTS_PAGE;
}

export function normalizeHazards(payload: unknown, checkedAt: Date): WeatherHazards {
  const root = asRecord(payload);
  const updatedAt = asString(root.updated);
  const features = Array.isArray(root.features) ? root.features : [];
  const items = features.map((value, index): WeatherHazard | null => {
    const feature = asRecord(value);
    const properties = asRecord(feature.properties);
    const event = asString(properties.event);
    if (!event) return null;
    return {
      id: asString(properties.id) ?? asString(feature.id) ?? `nws-alert-${index}`,
      event,
      headline: asString(properties.headline) ?? event,
      severity: asString(properties.severity) ?? "Unknown",
      urgency: asString(properties.urgency) ?? "Unknown",
      certainty: asString(properties.certainty) ?? "Unknown",
      effectiveAt: asString(properties.effective),
      expiresAt: asString(properties.expires),
      description: asString(properties.description) ?? "See the official NWS alert for details.",
      instruction: asString(properties.instruction),
      sourceUrl: safeAlertUrl(properties.web ?? properties.id ?? feature.id),
    };
  }).filter((item): item is WeatherHazard => item !== null);
  const status = statusForTimestamp(updatedAt, STALE_HAZARDS_MS, checkedAt);

  return {
    meta: meta({
      status,
      checkedAt: checkedAt.toISOString(),
      updatedAt,
      sourceLabel: "National Weather Service alerts",
      sourceUrl: NWS_ALERTS_PAGE,
      statusMessage: status === "current" ? "Active hazard feed checked" : "Hazard feed update is older than thirty minutes",
    }),
    items,
  };
}

async function nwsJson(url: string, userAgent: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/geo+json", "User-Agent": userAgent },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error(`NWS request failed with ${response.status}`);
  return response.json();
}

export async function fetchObservation(checkedAt: Date, userAgent: string): Promise<WeatherObservation> {
  return normalizeObservation(await nwsJson(NWS_OBSERVATION_URL, userAgent), checkedAt);
}

export async function fetchForecast(checkedAt: Date, userAgent: string): Promise<WeatherForecast> {
  const pointPayload = await nwsJson(NWS_POINT_URL, userAgent);
  const pointProperties = asRecord(asRecord(pointPayload).properties);
  const forecastUrl = asString(pointProperties.forecast);
  if (!forecastUrl?.startsWith("https://api.weather.gov/")) throw new Error("NWS point response did not provide a forecast URL");
  const relativeLocation = asRecord(asRecord(pointProperties.relativeLocation).properties);
  const city = asString(relativeLocation.city);
  const state = asString(relativeLocation.state);
  const locationName = city ? `${city}${state ? `, ${state}` : ""}` : "Camp Lawton, Arizona";
  return normalizeForecast(await nwsJson(forecastUrl, userAgent), checkedAt, locationName);
}

export async function fetchHazards(checkedAt: Date, userAgent: string): Promise<WeatherHazards> {
  return normalizeHazards(await nwsJson(NWS_ALERTS_PAGE, userAgent), checkedAt);
}
