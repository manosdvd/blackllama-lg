# Camp Lawton Leader Hub

A working prototype and product blueprint for the 2027 Camp Lawton online leader’s guide.

## View the recovered prototype

- [Open the interactive preview](https://manosdvd.github.io/blackllama-lg/)
- [Product blueprint](ONLINE_LEADERS_GUIDE_BLUEPRINT.md)

The preview is intentionally dependency-free so the current design can be reviewed while the unfinished application backend is rebuilt. It includes guide search, schedule tabs, event details, program filtering, exact-overlap warnings, responsive navigation, and a mock pre-registration flow. No form data is transmitted or stored.

## Run locally

```bash
npm run preview:static
```

Then open `http://localhost:8080`.

The original Next/vinext prototype remains under `app/`. Run its lightweight source checks with:

```bash
npm test
```

## Run the full application

The application requires Node.js 22.13 or newer and a migrated local D1 database. See [OPERATIONS.md](OPERATIONS.md) for local Worker preview, production migration, staff access, and launch approval requirements.
