# Leader’s Guide Coverage and Integration Plan

## Summary

- Save this plan before changing site content or code.
- Keep `/guide` as the canonical searchable index, while integrating guide entry points throughout the homepage, camp planning, merit-badge, alerts, and map experiences.
- Use existing reviewed resources wherever possible. Preserve the current release gate for unapproved schedules and program offerings.
- Where approved facts are unavailable, publish a clearly labeled lorem-ipsum placeholder. Never imply that placeholder content satisfies NCAP or is safe to rely upon.

## Coverage Matrix

| Requirement | Current state | Planned resolution |
|---|---|---|
| PD-101 goals and behavioral outcomes | Mission language exists, but outcomes are not explicit | Create “Camp Purpose, Goals & Outcomes” from the existing mission, leadership, confidence, service, teamwork, and outdoor-learning language |
| PD-108 unit program building | Useful guidance exists but is scattered | Create “Build Your Unit’s Camp Program” using existing advancement-planning, leader-operations, service, and balanced-schedule guidance |
| PD-108 preparation and training | General mountain preparation exists; activity-specific requirements are not approved | Consolidate altitude, terrain, conditioning, leader training, and readiness guidance; use placeholders for program-specific preparation |
| PD-108 risk advisory | Covered across safety, weather, fire, wildlife, and packing articles | Create a consolidated risk-advisory summary linking to the canonical detailed safety pages |
| PS-207/PS-221 equipment needs | General packing is strong; program-specific equipment is unavailable | Retain the packing checklist and add placeholders for specialty, trek, fishing, and activity-specific equipment |
| NCS prerequisites | Final offerings are release-gated | Add a public, labeled placeholder in “Program Requirements & Materials” |
| NCS materials required | Final offerings are release-gated | Add a public, labeled placeholder beside prerequisites |
| Big picture | Mission and camp philosophy exist | Promote them into the new goals/outcomes article and guide landing page |
| Logistics and financials | Dates and registration boundary exist; fees, payment schedule, refunds, and assistance are missing | Expand the registration article with separate labeled placeholders for each missing financial item |
| Health and safety | Substantially covered | Improve findability and add placeholders for exact submission deadlines not present in approved sources |
| Daily camp life | Arrival, departure, meals, campsites, responsibilities, and visitors are covered; final schedule is gated | Create “Daily Camp Life” from approved material and use a placeholder for the typical daily schedule |
| Program planning guidance | General balancing advice exists; final first-year tracks, restrictions, fees, games, and prerequisites are not approved | Publish source-backed general planning methods and placeholders for every program-specific field |

## Implementation Checklist

- [x] Add a typed requirement registry with requirement ID, authority, status, canonical route, anchor, and source references.
- [x] Add canonical articles for goals/outcomes, unit program building, preparation/risk, program requirements/materials, and daily camp life.
- [x] Expand registration and health/safety content with explicitly labeled missing fields.
- [x] Add a reusable Markdown placeholder directive and accessible advisory rendering.
- [x] Reorganize the guide into task-oriented groups and enhance search terminology.
- [x] Add article breadcrumbs, anchored contents navigation, related-topic links, and content-status labels.
- [x] Add contextual guide entry points to planning, merit badges, alerts, map, and homepage surfaces.
- [x] Add automated coverage, placeholder, navigation, and release-gate tests.
- [x] Run TypeScript, lint, tests, build, visual checks, and Cloudflare smoke tests.

## Implementation Result

- Published to Cloudflare on July 17, 2026.
- Worker version: `140822ce-8447-4ab4-aabd-4f1f9f346956`.
- Public route: `https://blackllama-lg.manosdvd.workers.dev`.
- TypeScript, lint, 12 test files, production build, desktop/mobile visual review, and live-route smoke tests passed.

## Guardrails

- The supplied checklist is authoritative for this task; final NCAP compliance still requires authorized council/camp review.
- Existing sources may be used only when consistent with current reviewed public content and release gates.
- Draft schedules, offerings, capacities, prices, prerequisites, and materials remain unpublished.
- Public placeholders use: “Placeholder — approved 2027 information has not yet been published. Do not rely on this section for planning.” followed by “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
- Existing unrelated and previously completed worktree changes must be preserved.
