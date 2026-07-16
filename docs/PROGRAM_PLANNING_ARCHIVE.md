# 2027 program-planning archive

The draft schedule, proposed merit-badge offerings, and personal schedule builder are intentionally disabled. They remain in the codebase as working material, but they are not approved public information and must not be used for unit planning.

`lib/site-features.ts` is the release gate. While `PROGRAM_PLANNING_PUBLISHED` is `false`:

- `/schedule` and `/my-plan` show an honest program-development notice instead of draft data.
- proposed offerings and times are absent from the public merit-badge landing page and candidate reference pages;
- schedule-specific Leader's Guide articles are withheld;
- schedule and planner links are absent from navigation and search discovery; and
- staff cannot publish schedule-event revisions accidentally.

Before re-enabling the feature, the Camp Director and Program Director should approve the badge list, capacities, fees, prerequisites, daily structure, and individual class times. Then review every schedule-specific guide article, update the catalog source and tests, verify mobile and print behavior, and only then set `PROGRAM_PLANNING_PUBLISHED` to `true`.
