# Merit Badge Interest Survey

## Purpose

The interest survey asks units which merit badges Camp Lawton should consider offering in 2027. It is demand research, not registration, class scheduling, or a promise that a badge can be completed at camp.

The survey catalog and the archived working program data are intentionally separate:

- `masterMB.csv` is the canonical 84-badge candidate catalog used by the planning survey.
- `lib/camp-catalog.ts` retains provisional working offerings and schedule data for future staff review. It is not rendered as a public 2027 catalog.

A survey result can inform a later scheduling decision, but it does not become a scheduled offering automatically.

## Source workflow

`masterMB.csv` contains two metadata rows, one header row, and 84 badge records. Each record includes source tier, badge name, program area, completion feasibility, prerequisites, requirements unavailable at camp, estimated class hours, and estimated independent hours.

After editing the CSV, regenerate and verify the application catalog:

```bash
npm run survey:generate
npm run survey:check
```

The generator uses the maintained `csv-parse` RFC-compatible parser and writes `lib/merit-badge-survey.generated.ts`. The generated file is committed so Cloudflare Workers and browser bundles do not need filesystem access at runtime. Tests and production builds fail when the generated file does not exactly match the CSV.

The generator validates the row count, column count, exact headers, completion statuses, class-hour values, independent-hour syntax, and unique generated IDs.

## Normalization

- `Complete` becomes `complete`.
- `Complete*` and `Complete *` become `conditional` while preserving the CSV footnote.
- `Partial` becomes `partial`.
- Exact `None` and `N/A` prerequisite or unavailable-at-camp values become `null`.
- Independent effort remains available as its original display string and as parsed minimum hours, open-ended status, and context.
- Common abbreviated badge names are expanded for display and stable IDs. The original source title and row number remain in every generated record.

Tier codes `S`, `A`, `B`, `C`, and `D` are preserved as source metadata. Their meaning is not defined in the CSV, so the application does not invent labels, ranking claims, or public explanations for them.

## Survey behavior

Step 3 of pre-registration supports search and filters for program area and selected survey candidates. Feasibility, source-tier, workload, and class-time estimates are intentionally absent from the public survey while the program is unapproved. Each selection records:

- Estimated number of interested Scouts, capped at the unit’s estimated youth attendance.
- Must-have, strong-interest, or nice-to-have priority.
- An optional 250-character unit planning note.

Notes explicitly prohibit Scout names, health details, and other personal information. Only badges with a positive interest count are submitted. The API allowlists IDs against the generated catalog and discards unknown IDs.

Browser drafts are normalized when loaded. Obsolete fields, legacy youth names, and unknown badge IDs are removed; malformed drafts cannot replace required form defaults; and lowering youth attendance clamps badge counts.

## Staff reporting

The staff dashboard aggregates each badge by:

- Total interested Scouts.
- Number of units selecting the badge.
- Selected priority counts.
- Demand by camp session.
- Optional unit planning notes.

The staff CSV export is long-form, with one row per submitted badge interest. It includes unit/session context, attendance totals, badge metadata, count, priority, note, contact fields, and retention date. Spreadsheet formula prefixes are neutralized during export.

Malformed legacy snapshots are isolated from the dashboard and reported for administrative review instead of breaking all demand reporting.

## Editorial review

The CSV is internally valid, but feasibility and requirement language still requires authorized program review before publication decisions. Pay particular attention to dated prerequisite terminology, conditional staffing/equipment assumptions, badge-title changes, and requirements that may have changed since the source analysis.
