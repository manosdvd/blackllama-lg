# Camp Lawton Leader Hub Operations

## Runtime

- Node.js 22.13 or newer is required.
- The application builds with vinext and deploys as a Cloudflare Worker with a D1 binding named `DB`.
- Public content has reviewed canonical fallbacks so an empty database does not blank the site. Staff-published database records override those fallbacks.
- Draft schedule/catalog/planner data is release-gated off. See [docs/PROGRAM_PLANNING_ARCHIVE.md](docs/PROGRAM_PLANNING_ARCHIVE.md).

## Local production preview

```bash
npm run build
npm run db:migrate:local -- --persist-to dist/server/.wrangler/state
npx wrangler dev --config dist/server/wrangler.json --port 3000
```

Open `http://localhost:3000`.

## Live conditions

The conditions endpoint aggregates four independent official feeds:

- NWS point discovery and forecast for `32.4033,-110.7215`.
- NWS `QSLA3` (`SCOUT CAMP`) latest observation.
- NWS active alerts for the Camp Lawton point.
- Coronado National Forest fire danger and restriction status from `https://www.fs.usda.gov/r03/coronado/alerts`.

Set `NWS_USER_AGENT` to an identifying value with a monitored contact, for example `CampLawtonLeaderHub/2.0 (camp-operations@example.org)`. Do not use the example address without replacing it with a real Council-managed contact.

The route returns HTTP 200 with per-feed `current`, `stale`, or `unavailable` status so clients can render partial results. Warm Worker isolates retain the last successful value for six hours; fallback values are always labeled stale. Responses carry a five-minute public cache and fifteen-minute stale-while-revalidate window. The Forest Service rating has no published update timestamp, so the application records the check time.

Smoke-test the normalized contract after every release:

```bash
curl -sS http://localhost:3000/api/conditions
curl -I http://localhost:3000/alerts
curl -I http://localhost:3000/
```

Confirm that the response contains the Camp Lawton point, station `QSLA3`, forecast periods, NWS hazard status, a recognized USFS danger rating, and an explicit restriction title. Fire danger and restrictions must remain separate. Missing fire data must remain unavailable and must never imply that flame use is permitted.

See [docs/LIVE_CONDITIONS.md](docs/LIVE_CONDITIONS.md) for the full source contract, freshness rules, selectors, safety invariants, and maintenance checklist.

## Merit badge survey catalog

`masterMB.csv` is the canonical source for the 84-badge interest survey. Those subjects are survey candidates, not the final Camp Lawton list. Provisional offerings in `lib/camp-catalog.ts` remain archived from public use.

After changing the source CSV, run:

```bash
npm run survey:generate
npm run survey:check
npm test
```

The generated catalog is committed at `lib/merit-badge-survey.generated.ts`. `npm test` and `npm run build` verify that it has not drifted from the CSV. Review [docs/MERIT_BADGE_SURVEY.md](docs/MERIT_BADGE_SURVEY.md) for the field mapping, stable-ID rules, privacy boundary, and staff reporting contract.

Before using demand for a program decision, export the long-form staff CSV and compare totals by badge and session with the dashboard. Treat every result as planning demand rather than enrollment or reserved capacity.

## Production release

1. Provision the production D1 database and configure its real UUID. Either replace the all-zero `database_id` in `wrangler.json`, or set `CLOUDFLARE_D1_DATABASE_ID` in the Cloudflare Workers Builds environment. Retrieve an existing UUID with `npx wrangler d1 info camp-lawton-leader-hub`, or create the database with `npx wrangler d1 create camp-lawton-leader-hub`.
2. Set `CAMP_STAFF_EMAILS` as a comma-separated Worker secret or environment variable for the initial Camp Director and Program Director accounts.
3. Apply migrations before describing pre-registration or the badge survey as open:

```bash
npm run db:migrate:remote
```

4. Build and deploy through the configured hosting project. The build output is under `dist/`, and database migrations are copied to `dist/.openai/drizzle/`.
5. Verify `/api/conditions` against both official sources, `/api/notices`, a complete test pre-registration with at least one badge candidate, staff demand aggregation, staff authorization, and the long-form CSV export in the deployed environment. Confirm the submission contains no youth names.

If no real D1 UUID is configured, the build intentionally omits the invalid placeholder binding so the public informational site can deploy with its reviewed fallback content. Database-backed pre-registration and staff publishing remain unavailable until the binding is configured and migrations are applied; do not promote the survey as open in that state.

## Required launch approvals

- Council approval of 2027 dates, fees, refund terms, policies, and registration language.
- Camp Director operational approval of the validated QSLA3/Camp Lawton point integration and the Coronado National Forest fallback workflow.
- Privacy and retention review before collecting real adult unit contacts. The current public form does not collect youth names.
- Public-use approval and release verification for photography showing recognizable people.
- Cultural and historical review for expanded Tribe of Papago interpretation.

## Data retention

Planning submissions carry a `delete_after` date of August 31, 2027. An authorized administrator must run and audit the seasonal deletion process. The site does not collect medical records, birth dates, payment data, or official registration records.

## Staff access

Staff routes fail closed. Authentication alone does not grant editorial access. A user must be listed in `CAMP_STAFF_EMAILS` or have a row in `staff_roles` with `director`, `program-director`, or `editor` role.
