# Camp Lawton Leader Hub

The public-facing 2027 Camp Lawton information and interest site for unit leaders, Scouts, and authorized camp staff. It centers Camp promotion, the working Leader's Guide, privacy-minimized pre-registration, the merit badge interest survey, camp history and maps, and live operational conditions.

## Application

- Deployment target: [camp-lawton-leader-hub-2027.manosdvd.chatgpt.site](https://camp-lawton-leader-hub-2027.manosdvd.chatgpt.site)
- Product blueprint: [ONLINE_LEADERS_GUIDE_BLUEPRINT.md](ONLINE_LEADERS_GUIDE_BLUEPRINT.md)
- Operations and release procedure: [OPERATIONS.md](OPERATIONS.md)
- Live conditions integration: [docs/LIVE_CONDITIONS.md](docs/LIVE_CONDITIONS.md)
- Merit badge survey catalog: [docs/MERIT_BADGE_SURVEY.md](docs/MERIT_BADGE_SURVEY.md)
- Archived schedule-planning release gate: [docs/PROGRAM_PLANNING_ARCHIVE.md](docs/PROGRAM_PLANNING_ARCHIVE.md)

The draft badge catalog, class schedule, personal planner, and unit scheduling workspace remain archived in source but are disabled in the current public release. The 84 survey subjects are broad interest candidates—not Camp Lawton's final offering list.

## Run locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open the URL printed by vinext, normally `http://localhost:3000`. If that port is already in use, run `npm run dev -- --port 3001`.

For a local production Worker build with a migrated D1 database, follow [OPERATIONS.md](OPERATIONS.md#local-production-preview).

## Verify

```bash
npm test
npx tsc --noEmit --incremental false
npm run lint
npm run build
```

The dependency-free recovered design preview remains under `preview/` for historical comparison. Run it with `npm run preview:static` and open `http://localhost:8080`; it is not the live application and does not submit data.
