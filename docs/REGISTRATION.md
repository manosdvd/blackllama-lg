# Official camp registration

Use [Catalina Council's event page](https://scoutingevent.com/011-ScoutCamp2027) for Summer Camp 2027. Shared links and sessions are maintained in `lib/registration.ts`; `/register` summarizes the published fees, deadlines, inclusions, and refund terms. Details were checked against the live page on September 26, 2026.

Week 1 runs June 6–12 and closes registration May 23. Week 2 runs June 13–19 and closes registration May 30. Both are limited to 150 youth. Merit badge registration opens February 1, 2027. The event page links to the official camp badge catalog and medical form.

The site sends visitors to Black Pug for registration. Legacy bookmarks redirect to `/register`; old submission requests receive HTTP 410 and the official URL. Existing D1 records and migrations remain intact, subject to their established retention dates.

The general merit badge library remains available for educational reference. `scripts/generate-merit-badge-reference.mjs` extracts only stable IDs, full titles, and areas from `masterMB.csv`. These subjects do not imply camp availability. Run `npm run badges:generate` after source updates, then `npm run badges:check`.
