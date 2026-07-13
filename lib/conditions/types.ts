export type FeedStatus = "current" | "stale" | "unavailable";
export type ReportStatus = FeedStatus | "partial";
export type FireDangerLevel = "Low" | "Moderate" | "High" | "Very High" | "Extreme";

export type FeedMeta = {
  status: FeedStatus;
  checkedAt: string;
  updatedAt: string | null;
  sourceLabel: string;
  sourceUrl: string;
  fallback: boolean;
  statusMessage: string;
};

export type WeatherObservation = {
  meta: FeedMeta;
  stationId: string;
  stationName: string;
  elevationFeet: number;
  temperatureF: number | null;
  feelsLikeF: number | null;
  description: string | null;
  dewpointF: number | null;
  relativeHumidityPercent: number | null;
  windDirection: string | null;
  windSpeedMph: number | null;
  windGustMph: number | null;
  visibilityMiles: number | null;
};

export type ForecastPeriod = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperatureF: number;
  precipitationChancePercent: number | null;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
  iconUrl: string | null;
};

export type WeatherForecast = {
  meta: FeedMeta;
  locationName: string;
  elevationFeet: number | null;
  periods: ForecastPeriod[];
};

export type WeatherHazard = {
  id: string;
  event: string;
  headline: string;
  severity: string;
  urgency: string;
  certainty: string;
  effectiveAt: string | null;
  expiresAt: string | null;
  description: string;
  instruction: string | null;
  sourceUrl: string;
};

export type WeatherHazards = {
  meta: FeedMeta;
  items: WeatherHazard[];
};

export type FireRestriction = {
  title: string;
  summary: string | null;
  sourceUrl: string;
};

export type FireReport = {
  meta: FeedMeta;
  forestName: string;
  zoneName: string | null;
  dangerLevel: FireDangerLevel | null;
  dangerLabel: string | null;
  dangerDescription: string | null;
  restriction: FireRestriction | null;
};

export type ConditionsReport = {
  status: ReportStatus;
  checkedAt: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
    timeZone: string;
  };
  weather: {
    status: ReportStatus;
    observation: WeatherObservation;
    forecast: WeatherForecast;
    hazards: WeatherHazards;
  };
  fire: FireReport;
};
