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

## Registration and badge references

Registration is handled on the [official Catalina Council event page](https://scoutingevent.com/011-ScoutCamp2027). Shared links and the two published sessions live in `lib/registration.ts`. Confirm fees, dates, and catalog links against the live event page when updating them; indexed search results can be stale.

`masterMB.csv` supplies names and areas for the 84 general badge references. These guides do not establish Camp Lawton offerings, capacity, completion, or class times.

After changing the source CSV, run:

```bash
npm run badges:generate
npm run badges:check
npm test
```

The generated reference is committed at `lib/merit-badge-reference.generated.ts`. `npm test` and `npm run build` verify it against the CSV. See [docs/REGISTRATION.md](docs/REGISTRATION.md).

## Production release

1. The production D1 database is provisioned as `camp-lawton-leader-hub` in WNAM and bound as `DB` in `wrangler.json` (database ID `13226e36-f71a-489c-bf0b-e7277588a249`). If the database is ever replaced, update that ID or set `CLOUDFLARE_D1_DATABASE_ID` in the Cloudflare Workers Builds environment.
2. Set `CAMP_STAFF_EMAILS` as a comma-separated Worker secret or environment variable for the initial Camp Director and Program Director accounts.
3. Apply migrations before enabling staff publishing:

```bash
npm run db:migrate:remote
```

4. Build and deploy through the configured hosting project. The build output is under `dist/`, and database migrations are copied to `dist/.openai/drizzle/`.
5. Verify `/api/conditions`, `/api/notices`, staff authorization, and the official links on `/register`, `/plan`, and `/merit-badges`. Confirm legacy registration URLs redirect and the retired submission endpoint returns HTTP 410 without storing data.

If no real D1 UUID is configured, the build intentionally omits the invalid placeholder binding so the public informational site can deploy with its reviewed fallback content. Staff publishing requires the binding and migrations; official registration links work independently of D1.

## Required launch approvals

- Council approval of 2027 dates, fees, refund terms, policies, and registration language.
- Camp Director operational approval of the validated QSLA3/Camp Lawton point integration and the Coronado National Forest fallback workflow.
- Public-use approval and release verification for photography showing recognizable people.
- Cultural and historical review for expanded Tribe of Papago interpretation.

## Data retention

Existing database records and migration history are retained. Archived submissions carry a `delete_after` date of August 31, 2027; an authorized administrator must run and audit the seasonal deletion process. This update does not delete stored records. New camp registration and payment data are handled by Black Pug.

## Staff access

Staff routes fail closed. Authentication alone does not grant editorial access. A user must be listed in `CAMP_STAFF_EMAILS` or have a row in `staff_roles` with `director`, `program-director`, or `editor` role.
