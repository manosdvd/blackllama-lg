# Camp Lawton Online Leader’s Guide — Product Blueprint

**Working title:** Camp Lawton Leader Hub  
**Primary season:** 2027  
**Status:** Blueprint for design, content migration, and implementation  
**Source of truth for requested features:** `basicWants.txt`

## 1. Product vision

Build one mobile-first website that helps a leader move from interest to arrival:

1. Discover why Camp Lawton is worth attending.
2. Find trustworthy, current program and policy information.
3. Explore the week and merit badge offerings.
4. Build a conflict-free schedule for each Scout.
5. See urgent weather, fire, and camp notices.
6. Submit a non-binding unit pre-registration and merit badge interest survey.

The site should feel like Camp Lawton: historic, personal, outdoorsy, and energetic. It should not feel like a PDF placed on a webpage. The online guide becomes the canonical source; printable/PDF editions become exports or companion documents.

## 2. Product boundaries

### In scope

- Public promotional homepage with modern motion and camp photography.
- Searchable leader-guide knowledge base (“wiki”).
- Session-aware week schedule and merit badge catalog.
- Personal schedule builder with conflict warnings and alternatives.
- Weather, fire-danger, and staff-created alert center.
- Unit pre-registration, roster, contact information, and ranked merit badge survey.
- Staff publishing tools for the Camp Director and Program Director.
- Responsive, accessible, printable pages.

### Explicitly out of scope for the first release

- Official registration or payment processing; Black Pug remains the official registration system.
- Collecting medical records, medication details, safeguarding documents, or other highly sensitive health information.
- Replacing on-site attendance, advancement, or emergency-management systems.
- A public social network, chat, or youth login.
- Automatic schedule enrollment; the first release creates a plan and interest signal, not a guaranteed class seat.

## 3. Audiences and permissions

| Audience | Needs | Access |
| --- | --- | --- |
| Prospective family or leader | Understand the experience, dates, fees, and next steps | Public, no login |
| Unit leader | Read the guide, plan schedules, submit pre-registration and roster | Public reading; authenticated workspace for saved/submitted data |
| Scout or parent | Read shared information and view a leader-provided schedule | Public or read-only share link; no account required in phase 1 |
| Program Director | Manage programs, badges, schedules, program notices, and guide content | Staff editor |
| Camp Director | All editorial controls, policies, fees, alerts, submissions, and publishing | Staff administrator |
| Site administrator | Accounts, integrations, audit logs, backups, and system settings | Technical administrator |

**Permission rule:** only the Camp Director and Program Director can create or publish guide content. A technical administrator may manage the system but should not silently alter editorial content.

## 4. Information architecture

### Primary navigation

1. **Home**
2. **Plan Your Camp**
3. **Leader’s Guide**
4. **Schedule**
5. **Merit Badges**
6. **Alerts**
7. **Pre-Register**

On mobile, the most-used actions should remain visible: **Search**, **Today**, **My Plan**, and **Alerts**.

### Route map

```text
/
├── /plan
│   ├── /dates-and-fees
│   ├── /packing-list
│   ├── /paperwork
│   └── /arrival-and-check-in
├── /guide
│   ├── /program
│   ├── /policies
│   ├── /health-and-safety
│   ├── /facilities-and-campsites
│   ├── /history-and-traditions
│   └── /faq
├── /schedule
│   ├── /week
│   ├── /day/:date
│   └── /event/:event-slug
├── /merit-badges
│   ├── /by-time
│   ├── /by-badge
│   ├── /by-area
│   └── /:badge-slug
├── /my-plan
├── /alerts
├── /pre-register
│   ├── /unit
│   ├── /roster
│   ├── /interest-survey
│   └── /review
├── /privacy
├── /accessibility
└── /staff
    ├── /content
    ├── /program
    ├── /schedule
    ├── /alerts
    ├── /submissions
    └── /settings
```

## 5. Homepage blueprint

### Page goal

In under 20 seconds, a visitor should understand what Camp Lawton offers, when camp occurs, what makes it distinctive, and what to do next.

### Section order

1. **Utility alert bar** — only appears when an active notice exists; urgency controls color and prominence.
2. **Hero** — “A century of mountain adventure. Your 2027 crew starts here.” Primary actions: **Explore the program** and **Pre-register your unit**.
3. **2027 at a glance** — dates, program types, location, key limitations, and official-registration note.
4. **Choose your camp** — week-long BSA, condensed session, and Cub weekend cards.
5. **The Lawton experience** — program, advancement, campwide fun, history, and personal-scale advantages.
6. **Interactive week preview** — a small schedule strip showing a representative day; clicking opens event details.
7. **Program-area gallery** — badges and activities grouped by area.
8. **History and spirit** — Camp Lawton since 1921, Tribe of Papago, traditions, and stewardship, with culturally sensitive wording reviewed before publication.
9. **Prepare with confidence** — packing, paperwork, policies, fees, and arrival shortcuts.
10. **Call to action** — merit badge interest survey and unit pre-registration.
11. **Footer** — council/camp contact, emergency-use phone note, address, privacy, accessibility, copyright, and “last updated.”

### Motion direction

- Slow parallax or cross-fade in the hero; never autoplay a distracting video with sound.
- Subtle trail-line reveal as the visitor scrolls through the preparation steps.
- Schedule cards may slide into view once, then remain still.
- Honor `prefers-reduced-motion`; all meaning must remain without animation.
- Optimize imagery so motion and photography do not compromise mountain-area mobile connections.

## 6. Leader’s Guide wiki

### Content model

Every guide article should have:

- Title, slug, summary, and body.
- Category and tags.
- Applicable program type(s) and session(s).
- Audience: all visitors, unit leaders, Cub leaders, or staff.
- Priority: normal, important, or critical.
- Owner and reviewer.
- Effective date, reviewed date, and next-review date.
- Related articles, downloads, and schedule events.
- Version history and published revision.
- “Was this helpful?” feedback.

### Initial content tree

| Section | Initial articles |
| --- | --- |
| Start here | Welcome, session dates, critical information, contact, quick checklist |
| Program | 2027 theme, program overview, daily rhythm, program areas, merit badges, evening programs, campwide games, advancement, traditions |
| Policies | USFS permit requirements, Leave No Trace, safeguarding youth, buddy system, vehicles, quiet hours, prohibited items, range rules |
| Prepare | Packing list, forms and paperwork, fees and deadlines, dietary needs, accessibility/accommodations, leader training |
| Arrival | Directions, mountain-road guidance, check-in steps, medications handoff, campsite assignment, troop friend, first-day schedule |
| During camp | Communications, leader/SPL meetings, campsite life, dining, Trading Post, emergencies, wildlife, weather, fire restrictions |
| Departure | Checkout checklist, campsite inspection, medication return, advancement records, feedback |
| About Lawton | History, Catalina Mountains, facilities, camp spirit, Tribe of Papago, future and involvement |
| Help | FAQ, glossary, contact paths, report outdated information |

### Avoiding duplicate content

Policies and procedures should be shared canonical articles. Session-specific differences appear as conditional callouts such as “Applies to Cub Weekend” or “Week 1 Tuesday arrival.” The BSA and Cub experiences can have curated landing pages without maintaining separate copies of the same safety text.

### Editor requirements

The staff editor must support:

- Full WYSIWYG editing: headings, lists, tables, callouts, links, columns, captions, footnotes, and document-style formatting.
- Markdown source mode.
- Sanitized HTML source mode for advanced staff.
- Image upload, crop, focal point, alt text, credit, caption, and decorative-image marking.
- Responsive video embeds from an allowlist.
- Reusable content blocks: critical alert, checklist, fee table, contact card, schedule preview, related links, download, photo gallery.
- Draft, preview, review, scheduled publish, publish, unpublish, archive, and rollback.
- Side-by-side revision comparison.
- Link checking and required-field validation before publishing.

**Security requirement:** HTML must be sanitized on the server. Scripts, iframes from unapproved hosts, inline event handlers, and unsafe URLs are rejected even for staff accounts.

## 7. Schedule and merit badge explorer

### Week schedule

The default view is a mobile-friendly agenda, not a compressed desktop calendar. Visitors can switch among:

- Today/selected day agenda.
- Full week grid.
- Program area.
- Audience (Scout, leader, SPL, all camp, Cub group).
- Required/optional.

Each event card opens a detail drawer/page with time, duration, location, description, eligibility, capacity status, what to bring, prerequisites, accessibility notes, weather/fire dependency, contact, and related guide articles.

### Merit badge views

- **By time:** session blocks with badges grouped beneath them.
- **By badge:** alphabetical/searchable catalog.
- **By area:** program-area cards such as Nature, Handicraft, Scoutcraft, Range, and Leadership.

Filters should include age or experience guidance, Eagle-required, difficulty, estimated outside work, prerequisites, cost/material fee, capacity, session, and program area.

### Personal schedule builder

The leader creates a unit workspace, adds Scouts, selects the camp session, and adds desired classes or activities for each Scout. The interface must:

- Detect exact overlaps.
- Detect insufficient travel/transition time between locations.
- Detect ineligible choices, unmet prerequisites, capacity limits, and duplicate selections.
- Distinguish an error from a warning.
- Suggest alternatives with the same badge at another time first, then similar badges or open activities.
- Show a clear explanation for every suggestion.
- Permit a leader to acknowledge a warning but not bypass a truly impossible overlap.
- Export/print by Scout and by unit; optional calendar export may follow.

### Conflict logic

```text
For each Scout:
  sort selections by start time
  compare each selection to the next selection
  conflict when current.end + required_travel_time > next.start
  add rule warnings for eligibility, prerequisites, capacity, and session
  rank alternatives by:
    1. same badge, no conflict
    2. same program area, no conflict
    3. stated Scout interest
    4. available capacity
    5. least disruption to the existing plan
```

An AI recommendation layer is optional and should come after deterministic rules work reliably. AI may explain or rank valid alternatives; it must not invent offerings, override eligibility, or claim a seat is available without current structured data.

## 8. Alert center

### Alert sources

| Source | Behavior | Owner |
| --- | --- | --- |
| Weather | Pull current observations/forecast for the configured Camp Lawton station or point; validate the requested `QSLA3` identifier before launch | Automated integration with staff fallback |
| Fire danger/restrictions | Display official Coronado National Forest notices or a staff-verified summary with source link and last checked time | Camp Director/Ranger |
| Camp notice | Staff-authored, scheduled, expiring notice | Camp or Program Director |

### Urgency levels

- **Information:** blue/neutral; visible in alert center.
- **Advisory:** amber; alert center plus relevant page callout.
- **Urgent:** red; persistent site banner and dashboard card.
- **Emergency:** reserved for authorized staff; full-width takeover with time, instructions, and acknowledgment. The website is supplemental and must not replace on-site alarms or emergency direction.

Each alert contains title, plain-language summary, instructions, source, issued time, effective time, expiration, affected audience/session, urgency, and last update. Expired alerts disappear from public banners but remain in the staff archive.

### Reliability rules

- Show “last updated” and source status.
- If an automated feed is stale, label it stale rather than presenting old data as current.
- Cache the last successful response for brief outages.
- Staff can override automated display with a signed manual notice.
- Never infer that fires are permitted from missing restriction data.

## 9. Pre-registration and merit badge survey

### Required disclaimer

Display before the form and again before submission:

> This is a non-binding pre-registration and planning survey. It does not reserve a campsite, register participants, guarantee merit badge seats, or collect payment. Official registration will be available through Black Pug in spring.

### Step-by-step flow

1. **Unit:** council, unit type and number, city/state, selected session, estimated youth/adults, accessibility/accommodation follow-up request.
2. **Contacts:** primary and alternate adult leader name, email, phone, preferred contact method, authorization checkbox.
3. **Roster:** Scout display name or first name/last initial by default, age/rank/program, optional planning notes. Do not collect birth dates or health details.
4. **Interest survey:** enter the number of interested Scouts for each merit badge and rank overall viability/priority for the unit.
5. **Review:** summary, privacy notice, disclaimer, consent, and submit.
6. **Confirmation:** reference number, emailed receipt, edit link with expiration, and official-registration reminder.

### Survey design

The merit badge survey should be a structured grid with search and program-area filters. Each badge records:

- Number interested.
- Unit priority: must-have, strong interest, nice-to-have, or no interest.
- Optional note.

The staff dashboard aggregates demand by badge, session, unit, and program area. It must label all results as planning demand, not enrollment.

### Roster privacy

- Collect the minimum useful youth information.
- Keep rosters private to authorized unit leaders and designated camp staff.
- Encrypt data in transit and at rest.
- Never expose roster data in public URLs, analytics, logs, or email subject lines.
- Define and publish a retention schedule; recommended default is deletion after the season plus an administrative closeout period.
- Provide export and deletion controls to authorized staff.

## 10. Staff workspace

### Dashboard

- Drafts awaiting review.
- Scheduled publications and alerts.
- Failed/stale data integrations.
- Pre-registration totals and demand snapshot.
- Broken links, missing alt text, and content due for review.
- Recent audit activity.

### Core workflows

**Publish an article:** Draft → preview → validation → publish now/schedule → revision recorded.  
**Change a schedule:** Edit structured event → system shows affected personal plans → publish → optional notice to affected leaders.  
**Send a notice:** Select urgency/audience/session → compose → preview → set start/end → publish → audit record.  
**Process a pre-registration:** New → contacted → follow-up needed → ready for official registration → closed/withdrawn.

High-impact urgent/emergency alerts should require re-authentication and, if practical, a second staff confirmation.

## 11. Data blueprint

### Principal entities

| Entity | Important fields |
| --- | --- |
| User | id, name, email, role, unit access, MFA status, last login |
| ProgramType | BSA week-long, condensed BSA, Cub weekend |
| CampSession | name, dates, arrival/departure, capacity, status, program type |
| Article | title, slug, summary, body, applicability, priority, status, owner, version dates |
| Media | file, dimensions, focal point, alt text, caption, credit, usage rights |
| ProgramArea | name, slug, location, description, image |
| Offering | badge/activity, area, eligibility, prerequisites, fee, capacity guidance |
| Event | session, offering, dates/times, location, audience, required flag, dependency |
| Location | name, coordinates/map reference, accessibility notes, transition group |
| Alert | source, urgency, content, audience, effective/expiry times, source URL, status |
| UnitWorkspace | unit identity, session, contacts, status, submission reference |
| Participant | workspace, display name, program/rank, planning fields only |
| Interest | workspace, offering, interested count, priority, note |
| PlanSelection | participant, event, status, warning acknowledgments |
| Submission | workspace snapshot, consent, submitted time, revision |
| AuditLog | actor, action, object, timestamp, before/after reference |

### Important modeling decision

An **Offering** is not an **Event**. “First Aid Merit Badge” is an offering; “First Aid, Monday–Thursday, Session 2 at 9:00 AM” is an event. This distinction enables multiple time slots, substitutions, and alternative suggestions without duplicating badge descriptions.

## 12. Visual system and supplied photography

### Style direction

- **Palette:** ponderosa green, cabin brown, warm pine-needle tan, sky blue, and a restrained signal red for safety only.
- **Typography:** sturdy humanist sans-serif for interface text; a warm slab or display face for major headlines. Avoid novelty “pirate” fonts for body copy.
- **Texture:** subtle wood grain/topographic lines, used sparingly behind clean content surfaces.
- **Components:** trail-sign tabs, map-pin metadata, schedule cards, checklist cards, and clear safety callouts.
- **Tone:** confident, welcoming, candid, and practical.

### Recommended image assignments

| Use | File | Notes |
| --- | --- | --- |
| Primary homepage hero | `PXL_20260612_151123910~2.jpg` | Camp sign immediately establishes place; pair with a dark gradient for text |
| Wide promotional alternate | `Image_2.jpg` | Strong entrance view for “welcome to camp” |
| Heritage/facilities | `Image_5.jpg` or `PXL_20260530_020713874~3.jpg` | Historic log-building character |
| Campsite/accommodations | `PXL_20260605_172059179.PANO.jpg` | Shows cabin arrangement and fire ring |
| Daily life/evening program | `PXL_20260607_030525151.MP.jpg` | Use only after confirming photo permission for recognizable people |
| Program overview | `PXL_20260607_155608710.jpg` | Active group recreation |
| Staff/leadership | `PXL_20260607_215926999.jpg` | Human and welcoming; confirm releases |
| Handicraft area | `PXL_20260612_203957726-EDIT.jpg` | Establishing shot |
| Crafts | `PXL_20260612_204230166.MP.jpg`, `PXL_20260612_204430023.NIGHT.jpg`, `PXL_20260612_232536325.jpg` | Basketry, knotwork, and leatherwork |
| Nature | `PXL_20260612_204734336.PORTRAIT~2.jpg`, `PXL_20260612_205337817~2.jpg` | Pine detail and Nature Lodge |
| Disc golf/program catalog | `PXL_20260612_205106397.jpg` | Action/detail page image |
| Directions/location cue | `PXL_20260612_213815716.PORTRAIT.jpg` | Strong visual for wayfinding/help |

Before launch, record photographer, usage permission, recognizable-person release status, alt text, crop/focal point, and whether each image is approved for public promotional use. Photos showing youth require special care and documented authorization.

## 13. Technical architecture

### Recommended shape

- Server-rendered web application for fast first load, search visibility, and dependable sharing.
- Relational database for schedules, sessions, workspaces, rosters, and audit trails.
- Object storage plus image transformation for media.
- Structured rich-text editor storing a portable document tree; render sanitized HTML for visitors and generate Markdown/HTML when needed.
- Background jobs for scheduled publishing, alert expiration, feed refresh, email receipts, and stale-data checks.
- Search index covering published articles, programs, events, and badges.
- Staff authentication with MFA; secure emailed sign-in or established identity provider for unit leaders.
- Separate production, preview/staging, and local environments.

### Performance targets

- Core public pages usable on a slow mobile connection.
- Responsive images in modern formats with fixed dimensions to prevent layout shift.
- No homepage animation should block reading or interaction.
- Cache public guide pages while purging them immediately after publish.
- Provide an offline-friendly printable checklist and downloadable schedule; deeper offline support can follow.

### Integration boundary

All external feeds pass through a server-side adapter that normalizes fields, records source time, validates freshness, and returns a known internal format. The public interface should never depend directly on a third-party browser call.

## 14. Security, safety, and governance

- MFA required for staff accounts.
- Role-based access on every server action, not only hidden buttons.
- Rate limiting, bot protection, CSRF protection, secure cookies, and input validation.
- Sanitization for rich text and strict embed allowlists.
- Malware/type scanning and size limits for uploads.
- Encryption in transit and at rest; secrets kept outside the repository.
- Audit logs for publishing, alerting, exports, access changes, and submission deletion.
- Automated backups plus a tested restoration procedure.
- Privacy notice and consent language reviewed before collecting rosters.
- No public youth profiles, full birth dates, health data, or advancement records in the first release.
- Policy and compliance claims in the current drafts must receive an authorized annual review before publication; the website should show review/effective dates rather than implying permanent accuracy.

## 15. Accessibility and content quality

Target WCAG 2.2 AA:

- Full keyboard operation and visible focus.
- Semantic headings, landmarks, tables, labels, and error summaries.
- Minimum contrast and no color-only meaning.
- Reduced-motion support.
- Captions/transcripts for video and meaningful alt text for images.
- Schedule usable as an agenda/list, not only a visual grid.
- Plain-language error messages and saved form progress.
- Printable pages that retain warnings, links, and last-updated dates.

Editorial quality controls should catch missing alt text, empty links, unreviewed critical pages, expired dates, and duplicate slugs. A content owner should review fees, dates, paperwork, health/safety, and fire information on a defined schedule.

## 16. Analytics and success measures

Use privacy-conscious analytics without placing youth or roster information in event data.

### Funnel measures

- Homepage → program/guide engagement.
- Packing, paperwork, fees, and arrival-page completion.
- Schedule plans created and conflict-free plans completed.
- Pre-registration starts, completions, and abandonment by step.
- Merit badge survey coverage by expected session.

### Operational measures

- Searches with no useful result.
- Pages marked unhelpful or reported outdated.
- Schedule changes that affect saved plans.
- Alert feed freshness and failures.
- Time from staff draft to published update.
- Accessibility and broken-link defect counts.

## 17. Delivery roadmap

### Phase 0 — decisions and content cleanup

- Name the authoritative owner for dates, fees, policies, schedules, and program offerings.
- Reconcile contradictions and draft text across the existing 2027 guides.
- Approve public photography and historical/cultural language.
- Confirm official alert data sources and the `QSLA3` weather identifier.
- Define privacy, retention, and roster access rules.

**Exit:** approved content inventory, data definitions, and wireframes.

### Phase 1 — useful public guide

- Promotional homepage.
- Leader-guide wiki, search, and print styles.
- Program/session landing pages.
- Staff editor with draft, preview, publish, media, revisions, Markdown, and sanitized HTML.
- Manual camp notices.

**Exit:** staff can replace core PDF distribution with a trustworthy public website.

### Phase 2 — structured program planning

- Week schedule, event detail, and merit badge explorer.
- Filters by time, badge, and area.
- Personal/unit schedule builder with deterministic conflicts and alternatives.
- Printable/exportable plans.

**Exit:** a leader can produce a conflict-free plan from current program data.

### Phase 3 — demand and pre-registration

- Unit workspace, contacts, minimal roster, interest survey, review, receipt, and staff dashboard.
- Export/retention controls and Black Pug handoff messaging.

**Exit:** camp leadership can forecast attendance and badge demand without implying official enrollment.

### Phase 4 — live operational layer

- Validated weather integration.
- Official fire notice/restriction integration or verified staff workflow.
- Scheduled/expiring alerts with audience targeting.
- Notifications to authenticated leaders who opt in.

**Exit:** current conditions and staff notices are visible, attributable, and freshness-aware.

### Phase 5 — refinement

- Explainable AI ranking of already-valid alternatives.
- Calendar feeds, richer offline support, Black Pug linking/import where authorized, and advanced demand forecasting.

## 18. MVP acceptance criteria

The first public release is ready when:

- Visitors can find program, policies, packing, fees, paperwork, and arrival information within two navigation actions or one search.
- BSA week-long, condensed-week, and Cub-weekend differences are clearly labeled.
- Every public page shows its last reviewed/updated date.
- Staff can draft, preview, schedule, publish, revise, and roll back content without developer help.
- Uploaded images require alt text or an explicit decorative designation.
- Unsafe HTML and unapproved embeds are rejected.
- Active urgent notices appear across relevant public pages and expire automatically.
- Public pages pass keyboard, contrast, responsive, print, and reduced-motion checks.
- No pre-registration or roster field is publicly accessible or recorded in analytics.

Later planning releases add these criteria:

- A leader can browse the same schedule by time, badge, and area.
- Clicking an event reveals complete details without losing schedule context.
- The planner identifies all exact overlaps and required-transition conflicts.
- Every alternative is based on current structured offerings and explains why it was suggested.
- The pre-registration confirmation clearly states that Black Pug registration is still required.

## 19. Open decisions before implementation

1. Is the site branded primarily as Camp Lawton, Catalina Council, or a combined identity?
	Primarily Camp Lawton (Catalina Council should be around, but it's the parent organization)
2. Which 2027 guide is the editorial baseline when current drafts conflict?
	The "2027lexi..." docs are the most "canon" if you come across conflicts.
3. Are Cub and BSA content published at the same time or on separate release dates?
	The content can publish at the same time, just designate them with a blue or olive green coloring if they're specifically different
4. What leader identity method is acceptable, and may one leader invite another adult into a unit workspace?
	I'm thinking a anyone can create a user, create a troop "group" and then invite anyone to get in to plan their scout's merit badge schedule, etc. 
5. What minimum Scout identifier is truly needed for planning?
	Not much, just knowing what troop their joining. We don't want to store any personal information about the scouts besides a name.
6. How long should submitted rosters and surveys be retained?
	Submitted rosters should just be a number at this time (scouts & leaders with genders) and rosters and surveys should be archived after the summer is complete (end of July at the latest) 
7. Which camp staff may view/export unit rosters and contact data?
	Camp Director and/or a designated user. 
8. Is schedule capacity informational, or will staff maintain live remaining-seat counts?
	For the merit badge survey, it's just informational to help plan the schedule and choose which badges to teach. The actual merit badge class scheduling tool will need a back end to assign class sizes - usually default to 10)
9. What are the official weather point/station and authoritative fire restriction sources?
	Weather (nws QSLA3)
	Fire Danger (Coronado National Forest alerts)
10. Which photo releases and historical/cultural review approvals are already available?
	Photo releases are included in the medical forms. Other diet requests and cultural paperwork we don't currently have other than "tell us", so we need to make some. 
11. Should a future Black Pug integration transfer data, or only direct leaders to the official system?
	Black Pug doesn't directly work with this, so they'll have to start from scratch, but hopefully we can at least take care of the merit badge class scheduling because black pug is terrible for that
12. Who has final approval for emergency-level web alerts?
	Camp Director	

## 20. Recommended first build slice

Begin with one complete vertical slice rather than isolated pages:

1. Homepage hero and session selector.
2. One canonical “Arrival & Check-In” article with Cub/BSA applicability.
3. One schedule day with clickable event details.
4. Staff editing, preview, publish, and revision history for that article and schedule day.
5. One scheduled camp notice displayed on the homepage and relevant article.

This slice tests the design system, shared-content model, permissions, editor, schedule structure, alerts, performance, accessibility, and publishing workflow before the full content migration.
