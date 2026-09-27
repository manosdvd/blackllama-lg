# Camp Lawton Leader Hub

The public-facing 2027 Camp Lawton information site for unit leaders, Scouts, and authorized camp staff. It includes the working Leader's Guide, official council registration links and fees, merit badge references, camp history and maps, and live operational conditions.

## Application

- Deployment target: [camp-lawton-leader-hub-2027.manosdvd.chatgpt.site](https://camp-lawton-leader-hub-2027.manosdvd.chatgpt.site)
- Product blueprint: [ONLINE_LEADERS_GUIDE_BLUEPRINT.md](ONLINE_LEADERS_GUIDE_BLUEPRINT.md)
- Operations and release procedure: [OPERATIONS.md](OPERATIONS.md)
- Live conditions integration: [docs/LIVE_CONDITIONS.md](docs/LIVE_CONDITIONS.md)
- Official registration and badge references: [docs/REGISTRATION.md](docs/REGISTRATION.md)
- Archived schedule-planning release gate: [docs/PROGRAM_PLANNING_ARCHIVE.md](docs/PROGRAM_PLANNING_ARCHIVE.md)

The draft badge catalog, class schedule, personal planner, and unit scheduling workspace remain archived in source but are disabled in the current public release. The 84 general badge guides are reference material. The council's [official event page](https://scoutingevent.com/011-ScoutCamp2027) provides registration and the camp's merit badge catalog.

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
