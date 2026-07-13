# Live Conditions Integration

## Purpose

`GET /api/conditions` is the single normalized source for the homepage condition summary and the full `/alerts` report. External payloads never reach browser components directly. The route keeps observation weather, forecast weather, NWS hazards, USFS fire danger, and USFS restrictions separate so a failure or ambiguous result in one feed cannot be mistaken for an all-clear in another.

## Official sources

### National Weather Service

The forecast and alert point is the Council-published Camp Lawton location at `32.4033,-110.7215`. The point lookup currently resolves to the Tucson Weather Forecast Office grid `TWC/101,56`, forecast zone `AZZ514`, fire-weather zone `AZZ154`, and the `QSLA3` observation station.

- Point discovery: `https://api.weather.gov/points/32.4033,-110.7215`
- Latest Scout Camp observation: `https://api.weather.gov/stations/QSLA3/observations/latest`
- Active point hazards: `https://api.weather.gov/alerts/active?point=32.4033,-110.7215`
- Human-readable point forecast: `https://forecast.weather.gov/MapClick.php?lat=32.4033&lon=-110.7215`

The point response supplies the forecast endpoint dynamically because NWS grid assignments can change. The integration normalizes unit-tagged observations, preserves unavailable measurements as `null`, displays up to six 12-hour forecast periods, and retains CAP severity, urgency, effective time, expiration, description, and instructions for active hazards.

### USDA Forest Service

The authoritative source is the [Coronado National Forest alerts page](https://www.fs.usda.gov/r03/coronado/alerts). The Forest Service exposes the published adjective fire danger and current restriction link as semantic HTML, not through a supported JSON endpoint.

The Worker HTML parser reads only these source-owned elements:

- `.wfs-fire__danger_level` for the published `Low`, `Moderate`, `High`, `Very High`, or `Extreme` rating and its definition.
- `.wfs-fire__zone span.margin-0` for the named forest.
- `.wfs-alerts__alerts a.alert_level--fire-restriction` for the current restriction statement and official link.
- `.rows__container .wfs-alert-flag.fire-restriction .usa-card__body` for the matching summary.

The Forest Service does not publish a reliable update time for the adjective rating. The application therefore displays when the source was **checked**, not when the rating was updated.

## Response contract

The route returns a `ConditionsReport` with:

- Overall `current`, `partial`, `stale`, or `unavailable` status.
- A common check timestamp and Camp Lawton point metadata.
- Independent observation, forecast, and hazard feed metadata.
- Normalized observation measurements and forecast periods.
- Active NWS hazard records, including official source links.
- Independent USFS danger and restriction values.
- Per-feed source label, source URL, source update/check time, fallback flag, and status message.

Each external request has a bounded timeout. Requests run independently, and a feed failure returns a partial report instead of erasing successful feeds.

## Freshness and fallback

- QSLA3 observations become stale after three hours.
- Point forecasts become stale after twelve hours.
- The active-hazard index becomes stale after thirty minutes.
- Successful feed values are retained in a warm Worker isolate for up to six hours. If a refresh fails, the response is explicitly marked `stale` and `fallback: true`.
- The normalized response uses a five-minute public cache and a fifteen-minute stale-while-revalidate window.
- The service worker intentionally excludes `/api/conditions`; safety data is never treated as an offline asset.

Warm-isolate memory is a brief-outage fallback, not durable storage across all Worker isolates. A future durable last-known-good requirement should use a dedicated D1 or KV record with an audited retention and invalidation policy.

## Safety invariants

- Fire danger and fire restrictions are different facts and are never collapsed into one status.
- Missing or unparsable Forest Service data is `unavailable`; it never becomes “no restrictions.”
- A `Low` rating or `No Fire Restrictions` statement does not authorize flame use at Camp Lawton.
- Camp staff direction, emergency instructions, permit conditions, and signed Forest Orders always take precedence over the website.
- A successful empty NWS hazard feed is distinct from an unavailable hazard feed.

## Maintenance

Set `NWS_USER_AGENT` to a stable application identifier with a monitored Council contact before the public launch. The built-in value identifies the deployed application URL, but a monitored contact is preferable.

At each release and before camp opens:

1. Verify the Camp Lawton point still resolves through the NWS `/points` endpoint.
2. Compare `/api/conditions` with the NWS human forecast and Coronado alerts page.
3. Confirm the USFS selectors still return a recognized danger label and an explicit restriction statement.
4. Exercise unavailable and stale UI states in a preview environment.
5. Publish a Camp Lawton staff notice when local direction needs to supersede or clarify an automated feed.

Focused normalization and safety tests live in `tests/conditions.test.ts`.
