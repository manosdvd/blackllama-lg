# Camp Lawton Leader Hub

The live 2027 Camp Lawton planning application for unit leaders, Scouts, and authorized camp staff. It combines the reviewed leader guide, structured schedules and program catalog, personal planning tools, privacy-minimized pre-registration, staff publishing, and a live operational alert center.

## Application

- Live deployment: [camp-lawton-leader-hub-2027.manosdvd.chatgpt.site](https://camp-lawton-leader-hub-2027.manosdvd.chatgpt.site)
- Product blueprint: [ONLINE_LEADERS_GUIDE_BLUEPRINT.md](ONLINE_LEADERS_GUIDE_BLUEPRINT.md)
- Operations and release procedure: [OPERATIONS.md](OPERATIONS.md)
- Live conditions integration: [docs/LIVE_CONDITIONS.md](docs/LIVE_CONDITIONS.md)

The application includes public guide, schedule, merit badge, planner, alerts, and pre-registration routes; authenticated unit workspaces; and fail-closed staff content, schedule, notice, and submission tools.

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
