import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  degreesToCardinal,
  normalizeForecast,
  normalizeHazards,
  normalizeObservation,
  speedToMph,
  temperatureToFahrenheit,
} from "../lib/conditions/nws";
import { normalizeFireStatus } from "../lib/conditions/usfs";

const checkedAt = new Date("2026-07-12T20:00:00.000Z");

test("NWS quantities are normalized into leader-friendly US units", () => {
  assert.equal(temperatureToFahrenheit({ unitCode: "wmoUnit:degC", value: 23.33 }), 74);
  assert.equal(speedToMph({ unitCode: "wmoUnit:km_h-1", value: 16.092 }), 10);
  assert.equal(degreesToCardinal(80), "E");
  assert.equal(temperatureToFahrenheit({ unitCode: "wmoUnit:degC", value: null }), null);
});

test("QSLA3 observation preserves nullable fields and reports freshness", () => {
  const report = normalizeObservation({ properties: {
    timestamp: "2026-07-12T19:37:00+00:00",
    textDescription: "",
    temperature: { unitCode: "wmoUnit:degC", value: 23.33 },
    heatIndex: { unitCode: "wmoUnit:degC", value: 22.9 },
    dewpoint: { unitCode: "wmoUnit:degC", value: 10.72 },
    relativeHumidity: { unitCode: "wmoUnit:percent", value: 44.97 },
    windDirection: { unitCode: "wmoUnit:degree_(angle)", value: 80 },
    windSpeed: { unitCode: "wmoUnit:km_h-1", value: 16.092 },
    windGust: { unitCode: "wmoUnit:km_h-1", value: null },
    visibility: { unitCode: "wmoUnit:m", value: null },
  } }, checkedAt);

  assert.equal(report.meta.status, "current");
  assert.equal(report.temperatureF, 74);
  assert.equal(report.description, null);
  assert.equal(report.relativeHumidityPercent, 45);
  assert.equal(report.windDirection, "E");
  assert.equal(report.visibilityMiles, null);

  const stale = normalizeObservation({ properties: {
    timestamp: "2026-07-12T12:00:00+00:00",
    temperature: { unitCode: "wmoUnit:degC", value: 20 },
  } }, checkedAt);
  assert.equal(stale.meta.status, "stale");
});

test("NWS point forecast is bounded, detailed, and rejects untrusted icons", () => {
  const periods = Array.from({ length: 8 }, (_, index) => ({
    number: index + 1,
    name: index % 2 ? "Tonight" : "Today",
    startTime: `2026-07-${String(12 + index).padStart(2, "0")}T06:00:00-07:00`,
    endTime: `2026-07-${String(12 + index).padStart(2, "0")}T18:00:00-07:00`,
    isDaytime: index % 2 === 0,
    temperature: 80 - index,
    probabilityOfPrecipitation: { unitCode: "wmoUnit:percent", value: 40 + index },
    windSpeed: "5 to 9 mph",
    windDirection: "ESE",
    shortForecast: "Chance Thunderstorms",
    detailedForecast: "A chance of thunderstorms after 11am.",
    icon: index === 0 ? "https://api.weather.gov/icons/land/day/tsra,40" : "https://example.com/icon.png",
  }));
  const report = normalizeForecast({ properties: {
    updateTime: "2026-07-12T18:34:00+00:00",
    elevation: { unitCode: "wmoUnit:m", value: 2301.8 },
    periods,
  } }, checkedAt, "Camp Lawton, AZ");

  assert.equal(report.meta.status, "current");
  assert.equal(report.periods.length, 6);
  assert.equal(report.periods[0].precipitationChancePercent, 40);
  assert.match(report.periods[0].detailedForecast, /thunderstorms/);
  assert.match(report.periods[0].iconUrl ?? "", /^https:\/\/api\.weather\.gov\/icons\//);
  assert.equal(report.periods[1].iconUrl, null);
});

test("NWS active hazards retain CAP urgency and official detail links", () => {
  const report = normalizeHazards({
    updated: "2026-07-12T19:55:00+00:00",
    features: [{ id: "https://api.weather.gov/alerts/test", properties: {
      event: "Red Flag Warning",
      headline: "Red Flag Warning issued for the Santa Catalina Mountains",
      severity: "Severe",
      urgency: "Expected",
      certainty: "Likely",
      effective: "2026-07-12T20:00:00+00:00",
      expires: "2026-07-13T03:00:00+00:00",
      description: "Critical fire weather conditions are expected.",
      instruction: "Avoid outdoor burning.",
    } }],
  }, checkedAt);

  assert.equal(report.meta.status, "current");
  assert.equal(report.items[0].event, "Red Flag Warning");
  assert.equal(report.items[0].severity, "Severe");
  assert.equal(report.items[0].sourceUrl, "https://api.weather.gov/alerts/test");
});

test("USFS normalization keeps fire danger separate from restrictions", () => {
  const report = normalizeFireStatus({
    dangerLabel: " Very High ",
    dangerDescription: "Fires start easily and spread rapidly.",
    zoneName: "Coronado National Forest",
    restrictionTitle: "No Fire Restrictions",
    restrictionSummary: "There are currently no fire restrictions within the Coronado National Forest.",
    restrictionHref: "/r03/coronado/alerts/no-fire-restrictions",
  }, checkedAt);

  assert.equal(report.dangerLevel, "Very High");
  assert.equal(report.restriction?.title, "No Fire Restrictions");
  assert.match(report.restriction?.sourceUrl ?? "", /^https:\/\/www\.fs\.usda\.gov\//);

  const noRestrictionStatement = normalizeFireStatus({
    dangerLabel: "High",
    dangerDescription: "Fires start easily.",
    zoneName: "Coronado National Forest",
    restrictionTitle: "",
    restrictionSummary: "",
    restrictionHref: "",
  }, checkedAt);
  assert.equal(noRestrictionStatement.restriction, null, "missing data must not be converted to a no-restrictions claim");
  assert.throws(() => normalizeFireStatus({
    dangerLabel: "", dangerDescription: "", zoneName: "", restrictionTitle: "", restrictionSummary: "", restrictionHref: "",
  }, checkedAt));
});

test("conditions route retains source isolation, bounded fallback, and conservative fire copy", async () => {
  const root = new URL("../", import.meta.url);
  const [route, parser, panel] = await Promise.all([
    readFile(new URL("app/api/conditions/route.ts", root), "utf8"),
    readFile(new URL("lib/conditions/usfs.ts", root), "utf8"),
    readFile(new URL("components/ConditionsPanel.tsx", root), "utf8"),
  ]);
  assert.match(route, /Promise\.all/);
  assert.match(route, /FALLBACK_MAX_AGE_MS/);
  assert.match(route, /stale-while-revalidate/);
  assert.match(parser, /\.wfs-fire__danger_level/);
  assert.match(parser, /alert_level--fire-restriction/);
  assert.match(panel, /does not authorize a campfire/);
  assert.doesNotMatch(panel, /fires are permitted/i);
});
