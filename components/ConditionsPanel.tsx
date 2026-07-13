"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ConditionsReport, FeedStatus, ReportStatus } from "../lib/conditions/types";

export type LiveConditionsState = {
  report: ConditionsReport | null;
  loading: boolean;
  error: boolean;
};

const NWS_FALLBACK_URL = "https://forecast.weather.gov/MapClick.php?lat=32.4033&lon=-110.7215";
const USFS_FALLBACK_URL = "https://www.fs.usda.gov/r03/coronado/alerts";

export function useLiveConditions(): LiveConditionsState {
  const [report, setReport] = useState<ConditionsReport | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/conditions", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Conditions request failed")))
      .then((data: ConditionsReport) => {
        setReport(data);
        setError(false);
      })
      .catch((requestError: unknown) => {
        if ((requestError as { name?: string })?.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, []);

  return { report, loading: !report && !error, error };
}

function formatTimestamp(value: string | null, fallback = "Not reported"): string {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return fallback;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function statusLabel(status: ReportStatus): string {
  if (status === "current") return "Current";
  if (status === "partial") return "Partially available";
  if (status === "stale") return "Last known report";
  return "Unavailable";
}

function StatusBadge({ status }: { status: ReportStatus }) {
  return <span className={`source-status status-${status}`}>{statusLabel(status)}</span>;
}

function windText(direction: string | null, speed: number | null, gust: number | null): string {
  if (speed == null) return "Not reported";
  const directionText = direction ? `${direction} ` : "";
  return `${directionText}${speed} mph${gust != null ? `, gusting ${gust} mph` : ""}`;
}

function currentWeatherText(report: ConditionsReport | null): string {
  if (!report) return "Loading...";
  const observation = report.weather.observation;
  const forecast = report.weather.forecast.periods[0];
  const temperature = observation.temperatureF == null ? "Temperature unavailable" : `${observation.temperatureF}°F`;
  return `${temperature} · ${observation.description ?? forecast?.shortForecast ?? "Conditions unavailable"}`;
}

export function ConditionsHud({ state }: { state: LiveConditionsState }) {
  const { report, loading, error } = state;
  const fire = report?.fire;
  return (
    <div className="hud-bar" role="status" aria-live="polite">
      <div className="hud-item">
        <span className="hud-icon" aria-hidden="true">°</span>
        <span>Weather: {error ? "Unavailable" : loading ? "Loading..." : currentWeatherText(report)}</span>
      </div>
      <div className="hud-item">
        <span className="hud-icon" aria-hidden="true">▲</span>
        <span>Fire danger: {error ? "Unavailable" : loading ? "Loading..." : fire?.dangerLabel ?? "Not published"}</span>
      </div>
    </div>
  );
}

export function WeatherSummaryCard({ state }: { state: LiveConditionsState }) {
  const observation = state.report?.weather.observation;
  return (
    <article>
      <span className="alert-icon sky" aria-hidden="true">°</span>
      <div>
        <small>NWS weather · Scout Camp</small>
        <h3>{state.error ? "Weather report unavailable" : state.loading ? "Loading weather report..." : currentWeatherText(state.report)}</h3>
        <p>{observation ? `${observation.meta.statusMessage}. Observed ${formatTimestamp(observation.meta.updatedAt)}.` : "Current observation and point forecast from the National Weather Service."}</p>
        <Link href="/alerts">Open full weather report</Link>
      </div>
    </article>
  );
}

export function FireSummaryCard({ state }: { state: LiveConditionsState }) {
  const fire = state.report?.fire;
  const headline = fire?.restriction?.title ?? (fire?.meta.status === "unavailable" ? "Restriction status unavailable" : "No restriction notice published");
  return (
    <article>
      <span className="alert-icon amber" aria-hidden="true">▲</span>
      <div>
        <small>Coronado National Forest</small>
        <h3>{state.error ? "Fire status unavailable" : state.loading ? "Loading fire status..." : `${fire?.dangerLabel ?? "Danger not published"} · ${headline}`}</h3>
        <p>{fire ? `Official source ${fire.meta.fallback ? "last refreshed" : "checked"} ${formatTimestamp(fire.meta.checkedAt)}. Camp staff direction still controls every flame.` : "Fire danger and restriction status are checked independently."}</p>
        <Link href="/alerts">Open full fire report</Link>
      </div>
    </article>
  );
}

function FeedNote({ status, message, checkedAt, updatedAt, updatedLabel = "Updated" }: {
  status: FeedStatus;
  message: string;
  checkedAt: string;
  updatedAt: string | null;
  updatedLabel?: string;
}) {
  return (
    <div className="feed-note">
      <StatusBadge status={status} />
      <span>{message}</span>
      <time dateTime={updatedAt ?? checkedAt}>{updatedLabel} {formatTimestamp(updatedAt ?? checkedAt)}</time>
    </div>
  );
}

function LoadingReport() {
  return (
    <section className="conditions-loading" aria-busy="true" aria-live="polite">
      <span className="condition-icon sky" aria-hidden="true">°</span>
      <div><p className="section-kicker">Official live sources</p><h2>Loading current conditions...</h2><p>Checking the National Weather Service and Coronado National Forest.</p></div>
    </section>
  );
}

function UnavailableReport() {
  return (
    <section className="conditions-unavailable" role="alert">
      <p className="section-kicker">Live source status</p>
      <h2>Current conditions could not be loaded.</h2>
      <p>Use on-site staff direction and verify both official sources before acting on weather or fire information.</p>
      <div className="source-links"><a href={NWS_FALLBACK_URL} target="_blank" rel="noreferrer">Open NWS forecast</a><a href={USFS_FALLBACK_URL} target="_blank" rel="noreferrer">Open Coronado alerts</a></div>
    </section>
  );
}

export default function ConditionsPanel() {
  const state = useLiveConditions();
  if (state.loading) return <LoadingReport />;
  if (state.error || !state.report) return <UnavailableReport />;

  const { report } = state;
  const observation = report.weather.observation;
  const forecast = report.weather.forecast;
  const hazards = report.weather.hazards;
  const currentDescription = observation.description ?? forecast.periods[0]?.shortForecast ?? "No description reported";
  const fire = report.fire;
  const dangerClass = (fire.dangerLevel ?? "unknown").toLowerCase().replace(/\s+/g, "-");
  const hazardHeading = hazards.items.length
    ? `${hazards.items.length} active ${hazards.items.length === 1 ? "alert" : "alerts"}`
    : hazards.meta.status === "unavailable"
      ? "NWS alert status unavailable"
      : hazards.meta.status === "stale"
        ? "No alerts in the last known NWS response"
        : "No active NWS alerts for the camp point";

  return (
    <div className="conditions-report">
      <header className="conditions-report-header">
        <div><p className="section-kicker">Official live sources</p><h2>Camp Lawton conditions</h2></div>
        <div><StatusBadge status={report.status} /><time dateTime={report.checkedAt}>Report checked {formatTimestamp(report.checkedAt)}</time></div>
      </header>

      <section className={`hazard-report ${hazards.items.length ? "has-hazards" : ""}`} aria-labelledby="hazards-heading">
        <header>
          <div><p className="section-kicker">NWS watches, warnings & advisories</p><h2 id="hazards-heading">{hazardHeading}</h2></div>
          <FeedNote status={hazards.meta.status} message={hazards.meta.statusMessage} checkedAt={hazards.meta.checkedAt} updatedAt={hazards.meta.updatedAt} />
        </header>
        {hazards.meta.status === "unavailable" && <p className="source-warning">The NWS hazard feed is unavailable. Absence of alerts here is not an all-clear.</p>}
        {hazards.items.map((hazard) => (
          <article className="weather-hazard" key={hazard.id}>
            <div><span>{hazard.severity}</span><time dateTime={hazard.expiresAt ?? hazard.effectiveAt ?? undefined}>Expires {formatTimestamp(hazard.expiresAt)}</time></div>
            <h3>{hazard.headline}</h3>
            <details><summary>Read official details</summary><p>{hazard.description}</p>{hazard.instruction && <strong>{hazard.instruction}</strong>}</details>
            <a href={hazard.sourceUrl} target="_blank" rel="noreferrer">Open this NWS alert</a>
          </article>
        ))}
      </section>

      <section className="weather-now" aria-labelledby="weather-now-heading">
        <div className="weather-now-primary">
          <span className="condition-icon sky" aria-hidden="true">°</span>
          <div><p className="section-kicker">Current observation · {observation.stationName}</p><h2 id="weather-now-heading">{observation.temperatureF == null ? "Temperature unavailable" : `${observation.temperatureF}°F`}</h2><strong>{currentDescription}</strong><p>Station {observation.stationId} · {observation.elevationFeet.toLocaleString()} ft</p></div>
        </div>
        <dl className="weather-metrics">
          <div><dt>Feels like</dt><dd>{observation.feelsLikeF == null ? "Not reported" : `${observation.feelsLikeF}°F`}</dd></div>
          <div><dt>Humidity</dt><dd>{observation.relativeHumidityPercent == null ? "Not reported" : `${observation.relativeHumidityPercent}%`}</dd></div>
          <div><dt>Dewpoint</dt><dd>{observation.dewpointF == null ? "Not reported" : `${observation.dewpointF}°F`}</dd></div>
          <div><dt>Wind</dt><dd>{windText(observation.windDirection, observation.windSpeedMph, observation.windGustMph)}</dd></div>
          <div><dt>Visibility</dt><dd>{observation.visibilityMiles == null ? "Not reported" : `${observation.visibilityMiles} mi`}</dd></div>
        </dl>
        <FeedNote status={observation.meta.status} message={observation.meta.statusMessage} checkedAt={observation.meta.checkedAt} updatedAt={observation.meta.updatedAt} updatedLabel="Observed" />
        <a className="official-source-link" href={forecast.meta.sourceUrl} target="_blank" rel="noreferrer">Open official NWS forecast</a>
      </section>

      <section className="forecast-report" aria-labelledby="forecast-heading">
        <header>
          <div><p className="section-kicker">Point forecast · {forecast.locationName}</p><h2 id="forecast-heading">Three-day outlook</h2></div>
          <FeedNote status={forecast.meta.status} message={forecast.meta.statusMessage} checkedAt={forecast.meta.checkedAt} updatedAt={forecast.meta.updatedAt} />
        </header>
        {forecast.periods.length ? <div className="forecast-grid">{forecast.periods.map((period) => (
          <article key={period.id} className={period.isDaytime ? "forecast-day" : "forecast-night"}>
            <header><div><span>{period.name}</span><strong>{period.temperatureF}°F</strong></div>{period.iconUrl && <img src={period.iconUrl} width="86" height="86" alt={period.shortForecast} loading="lazy" />}</header>
            <h3>{period.shortForecast}</h3>
            <p>{period.detailedForecast}</p>
            <footer><span>Rain {period.precipitationChancePercent == null ? "not reported" : `${period.precipitationChancePercent}%`}</span><span>{period.windDirection} {period.windSpeed}</span></footer>
          </article>
        ))}</div> : <p className="source-warning">The point forecast is unavailable. Check the official NWS page before departure.</p>}
      </section>

      <section className="fire-report" aria-labelledby="fire-heading">
        <header>
          <div><p className="section-kicker">USDA Forest Service · Coronado National Forest</p><h2 id="fire-heading">Fire danger & restrictions</h2></div>
          <FeedNote status={fire.meta.status} message={fire.meta.statusMessage} checkedAt={fire.meta.checkedAt} updatedAt={null} updatedLabel="Checked" />
        </header>
        <div className="fire-status-grid">
          <div className={`fire-danger danger-${dangerClass}`}>
            <small>Published fire danger</small>
            <strong>{fire.dangerLabel ?? "Not available"}</strong>
            <p>{fire.dangerDescription ?? "The official danger rating could not be read from the forest source."}</p>
          </div>
          <div className="fire-restriction">
            <small>Current restriction notice</small>
            <h3>{fire.restriction?.title ?? "Restriction status unavailable"}</h3>
            <p>{fire.restriction?.summary ?? "No restriction statement could be verified from the official source."}</p>
            {fire.restriction && <a href={fire.restriction.sourceUrl} target="_blank" rel="noreferrer">Open restriction notice</a>}
          </div>
        </div>
        <p className="fire-safety-note"><strong>Camp rule:</strong> A low danger rating or a “No Fire Restrictions” notice does not authorize a campfire. Camp Lawton staff direction and permit conditions control all flame use.</p>
        <a className="official-source-link" href={fire.meta.sourceUrl} target="_blank" rel="noreferrer">Open all Coronado National Forest alerts</a>
      </section>
    </div>
  );
}
