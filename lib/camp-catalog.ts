import type { PublicArticle, PublicScheduleEvent } from "./public-content";

export type CampSession = {
  id: string; name: string; shortName: string; program: "bsa" | "cub";
  dates: string; arrival: string; departure: string; note: string;
};

export type GuideArticle = PublicArticle & {
  category: string; tags: string[]; audience: "all" | "bsa" | "cub" | "leaders";
};

export type ProgramOffering = {
  id: string; title: string; area: string; description: string; eagleRequired: boolean;
  difficulty: "Introductory" | "Moderate" | "Advanced"; ageGuidance: string;
  prerequisites: string; outsideWork: string; fee: number; capacity: number;
  viability: "Core offering" | "Likely offering" | "Interest dependent";
  slots: { id: string; label: string; start: number; end: number; location: string }[];
};

export const sessions: CampSession[] = [
  { id: "bsa-week-1", name: "BSA Week 1", shortName: "Week 1", program: "bsa", dates: "June 1-5, 2027", arrival: "Tuesday, 1:00-3:00 PM", departure: "Saturday by 11:30 AM", note: "Condensed five-day program" },
  { id: "bsa-week-2", name: "BSA Week 2", shortName: "Week 2", program: "bsa", dates: "June 6-12, 2027", arrival: "Sunday, 1:00-3:00 PM", departure: "Saturday by 11:30 AM", note: "Full Sunday-arrival week" },
  { id: "bsa-week-3", name: "BSA Week 3", shortName: "Week 3", program: "bsa", dates: "June 13-19, 2027", arrival: "Sunday, 1:00-3:00 PM", departure: "Saturday by 11:30 AM", note: "Full Sunday-arrival week" },
  { id: "cub-weekend", name: "Cub Scout Weekend", shortName: "Cub Weekend", program: "cub", dates: "June 25-27, 2027", arrival: "Friday, 2:00-3:00 PM", departure: "Sunday after 10:55 AM", note: "Three-day family weekend" },
];

const reviewedAt = new Date("2026-07-11T00:00:00Z");

export const guideArticles: GuideArticle[] = [
  {
    title: "Arrival & Check-In", slug: "arrival-and-check-in", category: "Arrival", audience: "all", priority: "important", updatedAt: reviewedAt,
    summary: "Arrival windows, parking, paperwork, medication handoff, and required first-day briefings.",
    applicability: "BSA weeks and Cub Scout Weekend", tags: ["arrival", "check-in", "parking", "medications", "forms"],
    body: `## Before leaving home

- Bring current Annual Health and Medical Record Parts A, B, and C for every participant.
- Bring a signed unit roster and proof of current Youth Protection Training for registered adult leaders.
- Keep prescription medications in original labeled containers for handoff to the Camp Health Officer.
- Confirm dietary, accessibility, and accommodation needs with camp staff before traveling.

## BSA week arrival

Week 1 arrives Tuesday. Weeks 2 and 3 arrive Sunday. The check-in window is **1:00-3:00 PM**. Do not arrive early while staff setup is in progress.

## Cub Weekend arrival

Cub Scout Weekend check-in is Friday from **2:00-3:00 PM**. The required safety briefing begins at 4:30 PM.

## Parking and gear

Back vehicles into marked spaces so emergency egress remains clear. Vehicles are not permitted beyond the designated parking area. Plan for the unit to carry gear to its assigned campsite.

## Required briefing

All Scouts and leaders attend the session safety briefing. Tell staff immediately if a delayed arrival will affect attendance.`,
  },
  {
    title: "Dates, Fees & Registration", slug: "dates-fees-and-registration", category: "Start here", audience: "all", priority: "important", updatedAt: reviewedAt,
    summary: "2027 session dates, planning status, fee publication, and the Black Pug registration boundary.",
    applicability: "All 2027 sessions", tags: ["dates", "fees", "registration", "black pug"],
    body: `## 2027 sessions

- BSA Week 1: June 1-5, a condensed Tuesday-to-Saturday program.
- BSA Week 2: June 6-12, a full Sunday-to-Saturday week.
- BSA Week 3: June 13-19, a full Sunday-to-Saturday week.
- Cub Scout Weekend: June 25-27, Friday through Sunday.

## Fees

Final participant fees, deposits, refund terms, and payment deadlines have not been approved for publication. Staff will post the reviewed fee schedule here when council approval is complete.

## Registration boundary

Interest forms on this site are non-binding planning tools. They do not reserve a campsite, register a participant, guarantee a merit badge seat, or collect payment. Official registration will be completed separately through Black Pug in spring.`,
  },
  {
    title: "Packing List", slug: "packing-list", category: "Prepare", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Documents, mountain-weather gear, sleeping equipment, and items that must remain at home.",
    applicability: "All sessions", tags: ["packing", "gear", "clothing", "forms"],
    body: `## Documents

- Annual Health and Medical Record Parts A, B, and C.
- Signed unit roster and emergency contacts.
- Adult training verification.
- Accommodation or dietary follow-up information already discussed with staff.

## Personal equipment

- Layered clothing for warm days and cool mountain evenings.
- Rain protection, sun protection, sturdy closed-toe footwear, and a refillable water bottle.
- Sleeping bag and sleeping pad for wooden sleeping platforms.
- Flashlight or headlamp, personal toiletries, and required uniform items.

## Leave at home

Personal firearms, bows, arrows, fireworks, pets without prior authorization, and any equipment prohibited by current council or USFS rules. Camp Lawton has no pool or waterfront; do not pack for an aquatics program.`,
  },
  {
    title: "Camp Policies", slug: "camp-policies", category: "Policies", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "National Forest permit requirements, vehicles, wildlife, prohibited items, and quiet operation.",
    applicability: "All visitors and sessions", tags: ["policies", "usfs", "vehicles", "wildlife", "prohibited"],
    body: `## National Forest land

Camp Lawton operates under a USFS Special Use Permit. Permit conditions and current official restrictions prevail over ordinary camp practices.

## Leave No Trace

Stay on established trails, pack out waste, protect native vegetation, and never feed wildlife. Store food and scented items as directed. Do not dig, trench, or place stakes without Camp Ranger approval.

## Vehicles

Vehicles remain in designated parking areas except when specifically authorized. Back into marked spaces and keep emergency routes clear. The camp and access-road speed limit is 10 MPH.

## Prohibited equipment

Personal firearms, fireworks, bows, arrows, and range equipment are prohibited without written authorization. Missing online fire data never means a flame or campfire is permitted.`,
  },
  {
    title: "Health, Safety & Youth Protection", slug: "health-safety-and-youth-protection", category: "Health & safety", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "Medical records, medication control, two-deep leadership, buddy system, and incident reporting.",
    applicability: "All sessions", tags: ["health", "safety", "ypt", "buddy system", "medical"],
    body: `## Leadership

All adult leaders must be registered Scouting America members with current Youth Protection Training. Two-deep leadership is required, and one-on-one adult/youth contact is prohibited.

## Medical support

A Camp Health Officer is on duty during each session. Bring current medical records for every participant. Prescription medications are handed to the Health Officer at check-in and returned with confirmation at departure.

## Movement and emergencies

The buddy system applies throughout camp. Emergency assembly locations are posted at campsites and program areas. Report serious incidents immediately to the Camp Director and follow staff direction over website information.`,
  },
  {
    title: "Daily Rhythm & Program", slug: "daily-rhythm-and-program", category: "Program", audience: "bsa", priority: "normal", updatedAt: reviewedAt,
    summary: "Six merit badge blocks, transition time, meetings, competitions, meals, and evening programs.",
    applicability: "BSA weeks", tags: ["program", "schedule", "merit badges", "evening"],
    body: `## Daily pattern

Monday through Thursday uses six 50-minute merit badge blocks. Ten-minute transitions separate activities. Meal schedules include cleanup buffers that units should treat as part of the program.

## Unit leadership

SPL and leader meetings begin at 12:55 PM and run for 30 minutes. Scouts have supervised free time concurrently.

## Campwide activities

Campsite competitions begin at 4:35 PM. Evening programs generally begin at 7:25 PM. Final program locations and any weather or fire changes are announced by staff.`,
  },
  {
    title: "Cub Weekend Program", slug: "cub-weekend-program", category: "Program", audience: "cub", priority: "important", updatedAt: reviewedAt,
    summary: "Age-group rotations, family participation, weekend timing, and the climbing restriction.",
    applicability: "Cub Scout Weekend", tags: ["cub", "weekend", "families", "climbing"],
    body: `## Program groups

Group A serves Tigers and Wolves, Group B serves Bears, and Group C serves Webelos and Arrow of Light Scouts. Activities share a theme while instruction and challenge level change by group.

## Weekend shape

Friday includes arrival, campsite setup, safety briefing, dinner, and staff campfire. Saturday is the full activity day. Sunday includes pack-up, closing recognition, and departure.

## Climbing restriction

The climbing wall is limited to Group C, Webelos and Arrow of Light, with certified supervision. Tigers, Wolves, and Bears may not enter the climbing activity area.`,
  },
  {
    title: "Leader Logistics", slug: "leader-logistics", category: "During camp", audience: "leaders", priority: "normal", updatedAt: reviewedAt,
    summary: "Daily meetings, camp communications, issued equipment, and unit responsibilities.",
    applicability: "Unit and den leaders", tags: ["leaders", "spl", "radio", "meetings", "communication"],
    body: `## Daily coordination

BSA unit leaders and SPLs meet daily at 12:55 PM. Cub leaders meet Saturday at 2:10 PM. Locations are posted in the leader packet at check-in.

## Communication

Cell service can be limited. Use camp communication channels as the primary source while on site. Emergency contact instructions are included in the leader packet and posted at each campsite.

## Issued equipment

Keep track of radios, first aid kits, site keys, and other issued equipment. Return all issued items before departure clearance.`,
  },
  {
    title: "Fire, Weather & Wildlife", slug: "fire-weather-and-wildlife", category: "During camp", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "How to interpret online conditions and follow current staff and USFS direction.",
    applicability: "All sessions", tags: ["fire", "weather", "wildlife", "restrictions"],
    body: `## Fire status

Campfires and open flames depend on current Coronado National Forest restrictions and camp direction. Check with staff every day. Missing, delayed, or stale online data never means fire is permitted.

## Weather

Mountain conditions can change quickly. Bring layers and rain protection. The website may show NWS observations, but on-site staff direction controls program changes and emergency response.

## Wildlife

Observe wildlife from a distance and never feed it. Store food and scented items as directed. Report unusual animal activity to the Camp Ranger immediately.`,
  },
  {
    title: "Departure Checklist", slug: "departure-checklist", category: "Departure", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Campsite inspection, equipment return, medications, records, and departure clearance.",
    applicability: "All sessions", tags: ["departure", "checkout", "medications", "inspection"],
    body: `## Before leaving

- Pack all personal and unit equipment.
- Leave the campsite cleaner than it was found and complete the staff inspection.
- Return radios, first aid kits, keys, and other issued equipment.
- Retrieve medications from the Camp Health Officer with confirmation.
- Collect advancement records and any retained valuables.
- Receive departure clearance from the Camp Director.

Exit through the main entrance and observe the 10 MPH limit on camp and access roads.`,
  },
  {
    title: "Facilities & Campsites", slug: "facilities-and-campsites", category: "About Lawton", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Sleeping platforms, shared facilities, parking limits, and campsite expectations.",
    applicability: "All sessions", tags: ["facilities", "campsites", "sleeping", "parking"],
    body: `## Campsite setup

Campsites are the unit home base. Adirondack-style structures include wooden sleeping platforms; bring sleeping pads and sleeping bags. Follow buddy, age, and gender assignment requirements.

## Shared camp

Program areas, dining spaces, the Trading Post, health support, and meeting areas are within the compact camp footprint. Locations and accessibility routes are confirmed during the arrival tour.

## Vehicle boundary

Plan to carry gear between parking and the assigned campsite. Emergency routes must stay open throughout the session.`,
  },
  {
    title: "History & Camp Spirit", slug: "history-and-camp-spirit", category: "About Lawton", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Camp Lawton's mountain setting, long history, traditions, and stewardship responsibility.",
    applicability: "All visitors", tags: ["history", "traditions", "stewardship", "1921"],
    body: `## A mountain camp since 1921

Camp Lawton has served Scouts in the Catalina Mountains for more than a century. Its historic buildings, pine forest setting, and personal scale shape the experience.

## Stewardship

The camp's future depends on careful use of National Forest land, responsible maintenance, volunteer service, and respect for the history connected to the property.

## Cultural review

Historical names, symbols, and traditions require careful, authorized review before expanded public interpretation. Published language should distinguish documented history from later camp tradition.`,
  },
  {
    title: "Frequently Asked Questions", slug: "frequently-asked-questions", category: "Help", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Fast answers about aquatics, connectivity, fires, registration, and schedule guarantees.",
    applicability: "All sessions", tags: ["faq", "help", "aquatics", "registration"],
    body: `## Is there an aquatics program?

No. Camp Lawton has no pool or waterfront. All published 2027 activities are land-based.

## Does pre-registration reserve our unit?

No. It is a planning survey only. Official registration and payment occur separately through Black Pug.

## Are merit badge seats guaranteed?

No. The interest survey helps staff decide what to offer. A published class plan still depends on capacity and final scheduling.

## Can we rely on cell service?

No. Service can be limited. Use the camp communication system and leader-packet contacts while on site.`,
  },
];

export const programOfferings: ProgramOffering[] = [
  { id: "archery", title: "Archery", area: "Range", description: "Range safety, shooting form, equipment care, and scored practice under certified supervision.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Best for Scouts comfortable following strict range commands.", prerequisites: "None", outsideWork: "Minimal", fee: 0, capacity: 10, viability: "Core offering", slots: [{ id: "archery-1", label: "8:15-9:05 AM", start: 815, end: 905, location: "Archery Range" }, { id: "archery-4", label: "1:35-2:25 PM", start: 1335, end: 1425, location: "Archery Range" }] },
  { id: "first-aid", title: "First Aid", area: "Scoutcraft", description: "Practical first aid skills, scenarios, and emergency response fundamentals.", eagleRequired: true, difficulty: "Moderate", ageGuidance: "Suitable for most Scouts; younger Scouts benefit from Tenderfoot skills first.", prerequisites: "Bring current handbook; review rank first aid requirements.", outsideWork: "Some demonstration practice", fee: 0, capacity: 12, viability: "Core offering", slots: [{ id: "first-aid-2", label: "9:15-10:05 AM", start: 915, end: 1005, location: "Scoutcraft" }, { id: "first-aid-5", label: "2:35-3:25 PM", start: 1435, end: 1525, location: "Scoutcraft" }] },
  { id: "orienteering", title: "Orienteering", area: "Scoutcraft", description: "Map, compass, route planning, and practical navigation across camp terrain.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Recommended after basic compass instruction.", prerequisites: "Bring a baseplate compass if available.", outsideWork: "Course completion", fee: 0, capacity: 12, viability: "Core offering", slots: [{ id: "orienteering-3", label: "10:15-11:05 AM", start: 1015, end: 1105, location: "Scoutcraft" }] },
  { id: "pioneering", title: "Pioneering", area: "Scoutcraft", description: "Knots, lashings, anchors, and team-built camp structures.", eagleRequired: false, difficulty: "Advanced", ageGuidance: "Best for Scouts with basic knot proficiency.", prerequisites: "Square, clove, and timber hitch familiarity.", outsideWork: "Project time may extend beyond class", fee: 0, capacity: 10, viability: "Likely offering", slots: [{ id: "pioneering-4", label: "1:35-2:25 PM", start: 1335, end: 1425, location: "Scoutcraft" }] },
  { id: "basketry", title: "Basketry", area: "Handicraft", description: "Hands-on basket construction using prepared kits and traditional weaving techniques.", eagleRequired: false, difficulty: "Introductory", ageGuidance: "Good first-year badge.", prerequisites: "None", outsideWork: "Open-program finishing time likely", fee: 12, capacity: 12, viability: "Core offering", slots: [{ id: "basketry-1", label: "8:15-9:05 AM", start: 815, end: 905, location: "Handicraft" }] },
  { id: "leatherwork", title: "Leatherwork", area: "Handicraft", description: "Tool safety, pattern transfer, stamping, finishing, and leather project construction.", eagleRequired: false, difficulty: "Introductory", ageGuidance: "Suitable for most Scouts.", prerequisites: "None", outsideWork: "Project finishing", fee: 15, capacity: 12, viability: "Core offering", slots: [{ id: "leatherwork-2", label: "9:15-10:05 AM", start: 915, end: 1005, location: "Handicraft" }] },
  { id: "wood-carving", title: "Wood Carving", area: "Handicraft", description: "Knife safety, carving cuts, planning, and a small finished project.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Requires responsible knife handling.", prerequisites: "Totin' Chip required before tool use.", outsideWork: "Project finishing", fee: 8, capacity: 10, viability: "Likely offering", slots: [{ id: "wood-carving-5", label: "2:35-3:25 PM", start: 1435, end: 1525, location: "Handicraft" }] },
  { id: "nature", title: "Nature", area: "Nature", description: "Field observation of plants, animals, soil, and ecological relationships in the Catalina Mountains.", eagleRequired: false, difficulty: "Introductory", ageGuidance: "Good first-year badge.", prerequisites: "None", outsideWork: "Field observations", fee: 0, capacity: 14, viability: "Core offering", slots: [{ id: "nature-3", label: "10:15-11:05 AM", start: 1015, end: 1105, location: "Nature Lodge" }] },
  { id: "astronomy", title: "Astronomy", area: "Nature", description: "Celestial motion, observation, equipment, and navigation by the night sky.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Requires attendance at an evening observation.", prerequisites: "Plan for a late evening component.", outsideWork: "Night observation required", fee: 0, capacity: 16, viability: "Core offering", slots: [{ id: "astronomy-4", label: "1:35-2:25 PM", start: 1335, end: 1425, location: "Nature Lodge" }] },
  { id: "weather", title: "Weather", area: "Nature", description: "Weather systems, hazards, forecasting, instruments, and outdoor decision-making.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Suitable for most Scouts.", prerequisites: "None", outsideWork: "Weather log", fee: 0, capacity: 14, viability: "Likely offering", slots: [{ id: "weather-6", label: "3:35-4:25 PM", start: 1535, end: 1625, location: "Nature Lodge" }] },
  { id: "environmental-science", title: "Environmental Science", area: "Nature", description: "Ecosystems, pollution, conservation, and structured outdoor experiments.", eagleRequired: true, difficulty: "Advanced", ageGuidance: "Best for older Scouts prepared for written work.", prerequisites: "Read requirements before camp.", outsideWork: "Significant observations and writing", fee: 0, capacity: 12, viability: "Interest dependent", slots: [{ id: "environmental-science-1", label: "8:15-9:05 AM", start: 815, end: 905, location: "Nature Lodge" }] },
  { id: "emergency-preparedness", title: "Emergency Preparedness", area: "Leadership", description: "Preparedness planning, response roles, drills, and community resilience.", eagleRequired: true, difficulty: "Advanced", ageGuidance: "Recommended after First Aid merit badge.", prerequisites: "First Aid merit badge is required.", outsideWork: "Family emergency plan", fee: 0, capacity: 12, viability: "Likely offering", slots: [{ id: "emergency-preparedness-3", label: "10:15-11:05 AM", start: 1015, end: 1105, location: "Leadership Pavilion" }] },
  { id: "communication", title: "Communication", area: "Leadership", description: "Listening, speaking, writing, interviewing, and meeting leadership.", eagleRequired: true, difficulty: "Moderate", ageGuidance: "Best for Scouts ready to present to a group.", prerequisites: "Prepare a short speech topic.", outsideWork: "Speech and meeting requirement", fee: 0, capacity: 14, viability: "Interest dependent", slots: [{ id: "communication-6", label: "3:35-4:25 PM", start: 1535, end: 1625, location: "Leadership Pavilion" }] },
  { id: "chess", title: "Chess", area: "Leadership", description: "Rules, notation, strategy, sportsmanship, and tournament play.", eagleRequired: false, difficulty: "Introductory", ageGuidance: "All experience levels welcome.", prerequisites: "None", outsideWork: "Practice games", fee: 0, capacity: 16, viability: "Interest dependent", slots: [{ id: "chess-2", label: "9:15-10:05 AM", start: 915, end: 1005, location: "Leadership Pavilion" }] },
  { id: "geocaching", title: "Geocaching", area: "Outdoor Adventure", description: "GPS use, responsible cache practices, navigation, and course design.", eagleRequired: false, difficulty: "Moderate", ageGuidance: "Comfort with hiking recommended.", prerequisites: "None", outsideWork: "Course activity", fee: 0, capacity: 12, viability: "Likely offering", slots: [{ id: "geocaching-5", label: "2:35-3:25 PM", start: 1435, end: 1525, location: "Trailhead" }] },
  { id: "hiking", title: "Hiking", area: "Outdoor Adventure", description: "Hike planning, safety, conditioning, Leave No Trace, and trail practice.", eagleRequired: true, difficulty: "Advanced", ageGuidance: "Requires physical preparation and post-camp mileage.", prerequisites: "Proper footwear and water-carrying capacity.", outsideWork: "Required mileage cannot be completed entirely at camp", fee: 0, capacity: 10, viability: "Interest dependent", slots: [{ id: "hiking-1", label: "8:15-9:05 AM", start: 815, end: 905, location: "Trailhead" }] },
];

const event = (id: string, day: string, startTime: string, endTime: string, title: string, summary: string, kind: string, location: string, audience = "All camp", required = false): PublicScheduleEvent => ({ id, day, startTime, endTime, title, summary, kind, location, audience, required, whatToBring: null, accessibilityNotes: null });

export const bsaSchedule: PublicScheduleEvent[] = [
  event("sun-arrival", "Sunday", "1:00 PM", "3:00 PM", "Fleet arrival & campsite setup", "Check in, hand off medications, receive the unit campsite, and set up.", "routine", "Check-in station", "All participants", true),
  event("sun-safety", "Sunday", "3:00 PM", "4:00 PM", "Safety briefing & camp tour", "Emergency plans, USFS rules, buddy system, and camp orientation.", "leader", "Assembly area", "All participants", true),
  event("sun-campfire", "Sunday", "8:45 PM", "9:45 PM", "Staff campfire", "Staff-led opening program, subject to current fire restrictions.", "program", "Campfire circle"),
  event("mon-flags", "Monday", "6:40 AM", "7:00 AM", "Morning flags", "Opening ceremony for all camp.", "routine", "Flag field", "All camp", true),
  event("mon-breakfast", "Monday", "7:10 AM", "7:45 AM", "Breakfast", "Meal service with cleanup buffer afterward.", "meal", "Dining area", "All camp", true),
  event("mon-mb-1", "Monday", "8:15 AM", "9:05 AM", "Merit badge session 1", "Scouts report to assigned program areas.", "program", "Program areas", "Scouts"),
  event("mon-mb-2", "Monday", "9:15 AM", "10:05 AM", "Merit badge session 2", "Second morning instruction block.", "program", "Program areas", "Scouts"),
  event("mon-mb-3", "Monday", "10:15 AM", "11:05 AM", "Merit badge session 3", "Third morning instruction block.", "program", "Program areas", "Scouts"),
  event("mon-lunch", "Monday", "11:40 AM", "12:25 PM", "Lunch", "Midday meal service with cleanup afterward.", "meal", "Dining area", "All camp", true),
  event("mon-leaders", "Monday", "12:55 PM", "1:25 PM", "SPL & leaders meeting", "Daily updates and unit coordination; Scout free time runs concurrently.", "leader", "Captain's Quarters", "SPLs and unit leaders", true),
  event("mon-mb-4", "Monday", "1:35 PM", "2:25 PM", "Merit badge session 4", "First afternoon instruction block.", "program", "Program areas", "Scouts"),
  event("mon-mb-5", "Monday", "2:35 PM", "3:25 PM", "Merit badge session 5", "Second afternoon instruction block.", "program", "Program areas", "Scouts"),
  event("mon-mb-6", "Monday", "3:35 PM", "4:25 PM", "Merit badge session 6", "Final daily instruction block.", "program", "Program areas", "Scouts"),
  event("mon-comp", "Monday", "4:35 PM", "5:25 PM", "Pieces of Eight challenge", "Unit orienteering and scavenger competition.", "program", "All camp"),
  event("mon-dinner", "Monday", "6:05 PM", "6:55 PM", "Dinner", "Evening meal service with cleanup afterward.", "meal", "Dining area", "All camp", true),
  event("mon-evening", "Monday", "7:25 PM", "9:00 PM", "Pirate movie night", "G-rated all-camp movie program.", "program", "Program pavilion"),
  event("tue-program", "Tuesday", "8:15 AM", "4:25 PM", "Merit badge sessions 1-6", "Six scheduled badge blocks with transitions and lunch.", "program", "Program areas", "Scouts"),
  event("tue-comp", "Tuesday", "4:35 PM", "5:25 PM", "Knot-tying challenge", "Units secure the ship's rigging in a skills competition.", "program", "All camp"),
  event("tue-evening", "Tuesday", "7:25 PM", "8:45 PM", "Karaoke night", "Optional all-camp evening program.", "program", "Program pavilion"),
  event("wed-program", "Wednesday", "8:15 AM", "4:25 PM", "Merit badge sessions 1-6", "Six scheduled badge blocks with transitions and lunch.", "program", "Program areas", "Scouts"),
  event("wed-comp", "Wednesday", "4:35 PM", "5:25 PM", "Campfire preparation", "Unit creative time for approved Friday program content.", "program", "Campsites"),
  event("wed-evening", "Wednesday", "7:25 PM", "8:45 PM", "Pirate lore & stargazing", "Astronomy and celestial navigation program.", "program", "Nature Lodge"),
  event("thu-program", "Thursday", "8:15 AM", "4:25 PM", "Merit badge sessions 1-6", "Final regular day of badge instruction.", "program", "Program areas", "Scouts"),
  event("thu-comp", "Thursday", "4:35 PM", "5:25 PM", "Gaga ball tournament", "All-unit campsite competition.", "program", "Gaga pit"),
  event("thu-approval", "Thursday", "7:25 PM", "8:25 PM", "Campfire kit approval", "Staff review of all youth skits, songs, and stories.", "leader", "Program pavilion", "Performers and leaders", true),
  event("fri-campfire", "Friday", "3:05 PM", "5:05 PM", "Camper pirate campfire", "Approved youth performances and full camp program.", "program", "Campfire circle"),
  event("sat-pack", "Saturday", "8:30 AM", "11:00 AM", "Pack-up & campsite inspection", "Leave the site cleaner than found and complete staff clearance.", "routine", "Campsites", "All units", true),
  event("sat-farewell", "Saturday", "11:10 AM", "11:30 AM", "Final gathering & farewell", "Closing message before departure.", "program", "Assembly area", "All camp", true),
];

export const cubSchedule: PublicScheduleEvent[] = [
  event("cub-fri-arrival", "Friday", "2:00 PM", "3:30 PM", "Cub Weekend check-in", "Check in, hand off medications, and receive group and campsite assignments.", "routine", "Check-in station", "Cubs, leaders, and families", true),
  event("cub-fri-safety", "Friday", "4:30 PM", "5:30 PM", "Safety briefing & camp tour", "Required emergency, buddy-system, and USFS orientation.", "leader", "Assembly area", "All participants", true),
  event("cub-fri-campfire", "Friday", "7:30 PM", "8:30 PM", "Staff campfire", "Welcome program subject to current fire status.", "program", "Campfire circle"),
  event("cub-sat-craft", "Saturday", "8:55 AM", "10:25 AM", "Ship building & flag design", "Age-adjusted craft rotation for all groups.", "program", "Handicraft", "Groups A, B, and C"),
  event("cub-sat-hunt", "Saturday", "11:15 AM", "12:45 PM", "Grand treasure hunt", "Buddy-system orienteering within approved boundaries.", "program", "Camp trails", "Groups A, B, and C"),
  event("cub-sat-leaders", "Saturday", "2:10 PM", "2:40 PM", "Cub leader meeting", "Program updates while families have supervised free time.", "leader", "Captain's Quarters", "Unit leaders", true),
  event("cub-sat-afternoon", "Saturday", "3:30 PM", "5:00 PM", "Cannon raid & walk the plank", "Age-adjusted games; Group C attends climbing with certified staff.", "program", "Activity field", "Groups A, B, and C"),
  event("cub-sat-campfire", "Saturday", "8:05 PM", "9:05 PM", "Youth campfire", "Pre-approved performances by Cubs and families.", "program", "Campfire circle"),
  event("cub-sun-pack", "Sunday", "8:15 AM", "9:45 AM", "Pack-up & final inspection", "Leave No Trace campsite closeout.", "routine", "Campsites", "All participants", true),
  event("cub-sun-close", "Sunday", "9:55 AM", "10:45 AM", "Closing ceremony & awards", "Weekend recognition and farewell.", "program", "Assembly area", "All participants", true),
];

export function findGuideArticle(slug: string): GuideArticle | undefined {
  return guideArticles.find((article) => article.slug === slug);
}

export function findOfferingSlot(slotId: string) {
  for (const offering of programOfferings) {
    const slot = offering.slots.find((candidate) => candidate.id === slotId);
    if (slot) return { offering, slot };
  }
  return null;
}
