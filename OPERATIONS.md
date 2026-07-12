# Camp Lawton Leader Hub Operations

## Runtime

- Node.js 22.13 or newer is required.
- The application builds with vinext and deploys as a Cloudflare Worker with a D1 binding named `DB`.
- Public content has reviewed canonical fallbacks so an empty database does not blank the site. Staff-published database records override those fallbacks.

## Local production preview

```bash
npm run build
npm run db:migrate:local -- --persist-to dist/server/.wrangler/state
npx wrangler dev --config dist/server/wrangler.json --port 3000
```

Open `http://localhost:3000`.

## Production release

1. Provision the production D1 database and replace the placeholder database ID in `wrangler.json` when deploying outside the configured hosting control plane.
2. Set `CAMP_STAFF_EMAILS` as a comma-separated Worker secret or environment variable for the initial Camp Director and Program Director accounts.
3. Apply migrations before enabling forms:

```bash
npm run db:migrate:remote
```

4. Build and deploy through the configured hosting project. The build output is under `dist/`, and database migrations are copied to `dist/.openai/drizzle/`.
5. Verify `/api/conditions`, `/api/notices`, a test planning submission, staff authorization, and CSV export in the deployed environment.

## Required launch approvals

- Council approval of 2027 dates, fees, refund terms, policies, and registration language.
- Camp Director confirmation of QSLA3 and the official Coronado National Forest alert workflow.
- Privacy and retention review before collecting real unit contacts or Scout display names.
- Public-use approval and release verification for photography showing recognizable people.
- Cultural and historical review for expanded Tribe of Papago interpretation.

## Data retention

Planning submissions carry a `delete_after` date of August 31, 2027. An authorized administrator must run and audit the seasonal deletion process. The site does not collect medical records, birth dates, payment data, or official registration records.

## Staff access

Staff routes fail closed. Authentication alone does not grant editorial access. A user must be listed in `CAMP_STAFF_EMAILS` or have a row in `staff_roles` with `director`, `program-director`, or `editor` role.
