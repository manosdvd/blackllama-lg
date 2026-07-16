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
    body: `## Getting to Camp

Camp Lawton is the first camp on Organization Ridge Road near Mile 20 of the Catalina Highway. If you reach the Palisades Ranger Station, you have gone too far.

The Catalina Highway is paved and safe when driven attentively, but it is steep and winding.

- Watch for cyclists, wildlife, stopped traffic, rockfall, and changing weather.  
- Obey speed limits and no-passing zones.  
- Use pullouts when needed to let faster traffic pass safely.  
- Secure loose gear before beginning the climb.  
- Check fuel, brakes, tires, coolant, and emergency supplies before departure.  
- Download directions before leaving Tucson; cell coverage becomes unreliable on the mountain.  
- On the descent, use a lower gear as appropriate instead of continuously riding the brakes.

## Arrival Window

Arrive between **1:00 and 3:00 PM** on your session’s first day.

- **Week 1:** Tuesday, June 1  
- **Weeks 2 and 3:** Sunday  
- Do not arrive early; staff will still be preparing camp.  
- Contact the Camp Director before the session when a special arrival time is unavoidable.

## Check-In Procedure

1. **Back into your assigned parking space.** Keep emergency routes clear.  
2. **Leave unauthorized vehicles in the parking area.** Do not drive gear into camp without permission.  
3. **Report to check-in** with the unit roster, health forms, accommodation information, and medications.  
4. **Complete medical review.** The Camp Health Officer establishes the medication-control and distribution plan.  
5. **Receive your campsite assignment, current leader materials, and issued equipment.**  
6. **Meet your Troop Friend.** This staff member guides the unit through arrival and serves as a routine liaison.  
7. **Carry equipment to the campsite and set up.**  
8. **Attend the 3:00 PM safety briefing and camp tour.** All Scouts and leaders must attend.

The unit will receive a Fireguard Chart to complete and post in the campsite. It remains posted even when fires are prohibited.

## Arrival Responsibilities

Before evening program begins, leaders should:

- Confirm the full unit roster and buddy assignments  
- Review emergency assembly procedures  
- Locate the Health Lodge, Dining Hall, restrooms, showers, and program areas  
- Secure food and scented items as instructed  
- Verify medication times with the Camp Health Officer  
- Review only the final program information and alternatives distributed by camp staff  
- Establish unit expectations for hydration, uniforms, devices, quiet hours, and free time`,
  },
  {
    title: "Dates, Fees & Registration", slug: "dates-fees-and-registration", category: "Start here", audience: "all", priority: "important", updatedAt: reviewedAt,
    summary: "2027 session dates, planning status, fee publication, and the Black Pug registration boundary.",
    applicability: "All 2027 sessions", tags: ["dates", "fees", "registration", "black pug"],
    body: `| Camp Information | Details |
| :---- | :---- |
| **Session Dates** | **Week 1:** June 1–5, 2027 (Tuesday–Saturday, condensed five-day session) · **Week 2:** June 6–12, 2027 (Sunday–Saturday) · **Week 3:** June 13–19, 2027 (Sunday–Saturday) |
| **Staff Training** | May 28–30, 2027 |
| **Property** | Camp Lawton · Catalina Council, Scouting America · Coronado National Forest · United States Forest Service special-use property |
| **Location** | 32.39806° N, 110.725° W · First camp on Organization Ridge Road near Mile 20 of the Catalina Highway |
| **Mailing Address** | Scout’s Name and Unit Number · Camp Lawton · PO Box 786 · Mt. Lemmon, AZ 85619 |
| **Camp Phone** | 520-576-1263 · Urgent camp-season messages only; leave a message if no one answers |
| **Check-In** | Arrival day, 1:00–3:00 PM · Back vehicles into spaces · No unauthorized vehicles inside camp |
| **Check-Out** | Final Saturday by 11:30 AM unless camp leadership publishes a different session schedule |
| **2027 Theme** | Pirate Crew Adventures · Campsites are Ships · Dining Hall is the Galley |
| **NCAP Status** | Planned under the 2026 National Camp Accreditation Program standards and the current Short-Term Camp Administrator assessment; final current requirements control |
| **Program Status** | The 2027 merit badge list, class schedule, capacities, and fees are still in development · Unit interest survey open |
| **Future Dates** | **2028:** Scout weeks May 30–June 17 · Cub weekend June 23–25. **2029:** Scout weeks May 29–June 16 · Cub weekend June 22–24. |


## Registration boundary

Interest forms on this site are non-binding planning tools. They do not reserve a campsite, register a participant, guarantee a merit badge seat, or collect payment. Official registration will be completed separately through Black Pug in spring.`,
  },
  {
    title: "Packing List", slug: "packing-list", category: "Prepare", audience: "all", priority: "important", updatedAt: new Date("2026-07-16T00:00:00Z"),
    summary: "An interactive, printable checklist for leader documents, mountain-weather gear, sleeping equipment, and items that must remain at home.",
    applicability: "All sessions", tags: ["packing", "gear", "clothing", "forms"],
    body: `## Packing for Camp Lawton

Camp Lawton is a high-elevation mountain camp. Expect wide temperature swings, cool evenings, rugged ground, and fast-changing summer weather. There is no laundry service or washing machine in camp. Pack so every participant can carry their own gear from the parking area to the assigned campsite.

### Unit & Leader Check-In

- Current unit roster, emergency contacts, and official registration materials
- Current health forms and accommodation information requested for check-in
- Medications in their original labeled containers for handoff to the Camp Health Officer
- Current adult registration and training documentation required for the session
- Downloaded driving directions and vehicle emergency supplies
- No-flame alternatives for unit evening activities

The final registration packet and current camp instructions control if they differ from this working guide. Keep sensitive records secured and hand them only to authorized camp personnel.

### Each Participant Should Bring

- Field uniform and activity clothing as directed by the unit  
- Enough shirts, socks, underwear, and sleepwear for the session  
- Warm sleeping bag, pillow, and insulated sleeping pad  
- Rain jacket or poncho  
- Warm layer for evenings  
- Closed-toe shoes suitable for rocky trails  
- Shower shoes for use inside showers only  
- Refillable water bottle or canteen  
- Sun hat, sunscreen, and sunglasses  
- Flashlight or headlamp with extra batteries  
- Toiletries, towel, and personal hygiene supplies  
- Day pack  
- Personal first-aid basics  
- Notebook and writing utensils  
- Scout handbook, Totin’ Chip, Firem’n Chit, compass, and pocketknife when appropriate  
- Laundry bag and secure luggage or lockable storage  
- Trading Post funds or payment method specified in final camp materials

### Useful Optional Gear

- Insect repellent  
- Trekking poles  
- Camera  
- Musical instrument  
- Sewing kit  
- Camp chair when approved for the campsite  
- Books, cards, or quiet games

### Leave at Home

- Personal firearms, ammunition, air guns, bows, arrows, or other projectile equipment unless specifically approved in writing  
- Fireworks, explosives, accelerants, and unauthorized flame devices  
- Hatchets, large sheath knives, novelty weapons, or unsafe tools  
- Alcohol, marijuana, illegal drugs, unauthorized medication, nicotine products, and pornography  
- Pets, except service animals accommodated under current camp and council procedures
- Vulgar or sexually explicit clothing or media  
- Large gaming, television, sound, or computer systems  
- Anything inconsistent with the Scout Oath, Scout Law, or final camp rules`,
  },
  {
    title: "Camp Policies", slug: "camp-policies", category: "Policies", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "National Forest permit requirements, vehicles, wildlife, prohibited items, and quiet operation.",
    applicability: "All visitors and sessions", tags: ["policies", "usfs", "vehicles", "wildlife", "prohibited"],
    body: `## Campwide Rules at a Glance

### Stay With Your Buddy

The buddy system is required for Scout movement throughout camp. Leaders remain responsible for knowing where Scouts are.

### Respect Private and Restricted Areas

Campers and unit leaders may not enter staff housing, the kitchen, maintenance spaces, range areas, another unit’s lodging, or other restricted locations without permission.

### Take Care of Camp

Pick up litter, use equipment properly, conserve water, stay on established routes, and report damage or hazards. Vandalism and reckless behavior are not acceptable.

### Dress and Equip for Safety

Wear closed-toe shoes outdoors, carry water, use lights after dark, and wear all activity-specific protective equipment.

### Speak With Respect

Bullying, slurs, threats, harassment, humiliating discipline, insults, and put-downs are prohibited. Correct behavior without humiliating the person.

### No Pranks or Hazing

Pranks can become unsafe, damage property, disrupt camp, or embarrass someone. Hazing, initiations, secret groups, and retaliatory behavior are prohibited.

### No Unauthorized Weapons or Substances

Weapons, fireworks, alcohol, marijuana, illegal drugs, unauthorized medication, nicotine products, and pornography are prohibited in camp. Report concerns to camp leadership; do not investigate or confront a dangerous situation alone.

### Follow Staff Direction

Safety, weather, fire, range, health, and emergency instructions take immediate priority over the normal schedule.

## Visitors and Camp Security

Visitors must be approved before arrival.

- Every visitor signs in immediately at the location announced by camp and signs out before leaving.  
- Overnight visitors must meet registration, leadership, and medical requirements.  
- Visitors follow all camp rules and remain with their host unit or assigned escort.  
- Report unknown, unescorted, or suspicious people to the Camp Director immediately.  
- Do not confront or remove an unknown person yourself.  
- Refer news media and public-information requests to the Camp Director.

## Leaving Camp and Independent Activities

- Notify camp leadership before a unit or participant leaves camp.  
- Use the official sign-out and sign-in procedure.  
- Provide a roster, destination, route, expected return time, adult leadership, and emergency communication plan.  
- Obtain approval before independent hikes, off-property activities, or use of restricted trails.  
- Conduct headcounts before departure, during the activity, and upon return.  
- Report an early return, missing participant, route change, or delay immediately.

## Vehicles

- Unauthorized vehicles remain in the parking area.  
- Back into all spaces and keep gates, roads, and fire lanes clear.  
- Keep vehicle keys with an adult leader in case evacuation becomes necessary.  
- Keep enough seats and seat belts available to transport the unit unless camp leadership approves another emergency plan.  
- Follow the **10 MPH** camp and access-road speed limit unless a lower limit is posted.  
- Never transport passengers in truck beds, trailers, or unapproved locations.`,
  },
  {
    title: "Health, Safety & Youth Protection", slug: "health-safety-and-youth-protection", category: "Health & safety", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "Medical records, medication control, two-deep leadership, buddy system, and incident reporting.",
    applicability: "All sessions", tags: ["health", "safety", "ypt", "buddy system", "medical"],
    body: `## Safeguarding Youth

All participants are responsible for maintaining Scouting America’s youth-safety standards.

- Maintain two-deep leadership.  
- Never allow one-on-one contact between an adult and a youth who is not their child.  
- Follow current buddy-pairing, lodging, shower, restroom, and changing-area requirements.  
- Adults and youth use separate accommodations as required.  
- No sexual activity or inappropriate public displays of affection are permitted at camp.  
- Discipline must be constructive, positive, and consistent with Scouting values.  
- Corporal punishment, isolation, humiliation, ridicule, hazing, and bullying are prohibited.  
- Report boundary violations, harassment, threats, violence, or unsafe behavior immediately.  
- Do not investigate suspected abuse yourself.  
- Report suspected abuse immediately to the proper authorities as required, then notify the council Scout Executive or Scouts First Helpline at **1-844-SCOUTS1**.

## Camp Health Officer and Medications

A qualified Camp Health Officer is available during the session, with designated backup coverage.

- Turn medications over during medical check-in unless the Camp Health Officer approves another arrangement.  
- Follow the established administration schedule.  
- Youth may carry emergency medication only when authorized under the participant’s plan and camp procedure.  
- Report injuries, illness, allergic reactions, medication errors, or concerning behavior promptly.  
- Retrieve medications at check-out and sign the return record.  
- Contact the participant’s own medical provider before camp regarding complex or ongoing conditions.

## Injuries and Illness

- Stop unsafe activity immediately.  
- Report every significant injury or illness to staff.  
- Minor injuries may be treated from an approved first-aid kit, but camp medical staff should document and evaluate as directed.  
- Do not move a person with a suspected spinal, head, collarbone, or serious mobility-limiting injury unless remaining in place creates an immediate greater danger.  
- Send a runner or radio for the Camp Health Officer.  
- Keep the person calm, protected, and accompanied until relieved.

## Campwide Emergency Signal

The continuous ringing of the large Dining Hall bell is the primary campwide emergency alarm.

When it sounds:

1. Stop normal activity and secure only immediate hazards.  
2. Escort everyone directly to the Parade Grounds at the flagpoles.  
3. Do not detour to campsites or wait for the whole unit before moving.  
4. Reassemble by unit and conduct an immediate count.  
5. Report missing people at once.  
6. Remain quiet and follow camp-leadership instructions.  
7. Do not move vehicles or leave camp until directed unless an immediate threat makes staying unsafe.

A drill will normally occur early in the session. Treat it as a real emergency.

## Missing Person

Report a missing participant immediately. Do not delay while conducting an informal search.

Be ready to provide:

- Name and age  
- Unit number  
- Physical description and clothing  
- Last known location and time seen  
- Medical, emotional, or behavioral concerns  
- Likely destination or recent conflict

Camp leadership will coordinate the search. Keep the radio channel clear, maintain supervision of the remaining Scouts, and do not send unsupervised search groups into the forest.

## Active Threat

An active-threat event is unlikely, but leaders must act decisively.

- Move away from danger when a safe route is available.  
- Shelter and secure the area when escape is unsafe.  
- Silence devices and remain out of sight.  
- Call 911 when safely able.  
- Follow law-enforcement instructions.  
- Physical resistance is a last resort to protect life when no safer option remains.

Location-specific instructions will be covered during the arrival safety briefing.`,
  },
  {
    title: "Daily Rhythm & Program", slug: "daily-rhythm-and-program", category: "Program", audience: "bsa", priority: "normal", updatedAt: reviewedAt,
    summary: "Six merit badge blocks, transition time, meetings, competitions, meals, and evening programs.",
    applicability: "BSA weeks", tags: ["program", "schedule", "merit badges", "evening"],
    body: `## Program Philosophy

Camp Lawton supplements the unit program. Staff provide instruction, facilities, special events, and a supportive camp community; unit leaders remain responsible for supervision, encouragement, and helping each Scout choose a healthy balance of challenge and fun.

## Merit Badges and Model Camp

Standard program days include six 50-minute merit-badge periods with 10-minute transitions.

- Final offerings, prerequisites, and class capacities will be published separately.  
- Some activities may use multiple periods or require work outside class.  
- Completion depends on the Scout meeting every requirement.  
- Friday includes make-up and project-completion time.  
- A first-year Scout or Model Camp track may be offered to support basic outdoor and rank skills. Confirm the final format before registration.

## Standard Daily Rhythm

| Time | Activity |
| :---- | :---- |
| **6:30 AM** | Reveille |
| **6:40–7:00 AM** | Morning Flags |
| **7:10–7:45 AM** | Breakfast |
| **8:15–11:05 AM** | Merit Badge Sessions 1–3 |
| **11:15–11:30 AM** | Captain’s Challenge Staff Duel |
| **11:40 AM–12:25 PM** | Lunch |
| **12:55–1:25 PM** | SPL and Leaders Meeting · Supervised Scout free time |
| **1:35–4:25 PM** | Merit Badge Sessions 4–6 |
| **4:35–5:25 PM** | Campsite Competition or special program |
| **5:35–5:55 PM** | Evening Flags |
| **6:05–6:55 PM** | Dinner |
| **7:25 PM** | Evening Program |
| **9:00–9:55 PM** | Taps and lights out; exact time varies |

Ten-minute transitions and 30-minute post-meal cleanup periods are built into the full schedule. Do not plan unit activities that interfere with required travel, cleanup, flags, meetings, or safety procedures.

## Arrival-Day Program

Weeks 2 and 3 open with:

- Check-in and campsite setup  
- Mandatory safety briefing and tour  
- Totin’ Chit assessment  
- Pirate Crew Muster and crew-flag presentation  
- Evening Flags and Captain’s Feast  
- Campwide Scouts’ Own  
- Staff Campfire

Week 1 follows this arrival sequence on Tuesday.

## Evening Programs

| Day | Program |
| :---- | :---- |
| **Sunday** | Staff Campfire — staff songs, skits, stories, and the opening of the week’s theme |
| **Monday** | G-rated pirate movie; planned feature: *Muppet Treasure Island* |
| **Tuesday** | Karaoke Night followed by pirate first-aid scenarios |
| **Wednesday** | Pirate Lore and Stargazing followed by campcraft challenges |
| **Thursday** | Campfire-kit approval followed by a shorter Youth Campfire showcase |
| **Friday** | Extended Camper Pirate Campfire and final closing program |

All fire-based programs depend on current USFS restrictions. A campfire program may continue without an actual flame.

## Funday and Friday Program

Friday is designed for choice, completion, celebration, and closing experiences.

Planned elements include:

- Individual Funday activities  
- Merit-badge make-up and project completion  
- Art Show and Pirate History Museum  
- Campsite cleanup and Leave No Trace sweep  
- Extended Camper Pirate Campfire  
- Farewell Dinner  
- Closing Campfire and team-building games

## Campsite Competitions

| Day | Competition |
| :---- | :---- |
| **Monday** | Pieces of Eight Scavenger Hunt — navigation and hidden coins |
| **Tuesday** | Secure the Ship’s Rigging — knot-tying challenge |
| **Wednesday** | Pirate Shanty and Tale Preparation |
| **Thursday** | Walk the Plank — Gaga Ball tournament |
| **Friday** | Camper Pirate Campfire and closing-program preparation |

## Captain’s Challenge Staff Duel

Each program day before lunch, staff members face a short pirate-themed challenge such as knot races, riddles, relays, or performance contests. Scouts cheer for their favorites and the results build the week’s camp spirit.

## Pirates and the Celestial Seas

This astronomy presentation connects historical navigation with the night sky. Topics may include:

- Polaris and latitude  
- Dead reckoning  
- The longitude problem  
- Constellation lore  
- The limitations of historical navigation

The program may support selected [Astronomy merit badge](/merit-badges/astronomy) requirements, but credit depends on the official counselor and requirements in effect at camp.

## Bead Program

Scouts may earn themed beads for demonstrated skill, service, and participation. Planned categories include:

- Knots  
- Navigation  
- First aid  
- Outdoor skills  
- Service

Current criteria will be available in the leader packet or Trading Post.

## Range Activities

Camp Lawton plans to offer the [Archery merit badge](/merit-badges/archery) and archery as an open-program activity. Air-rifle programming operates only when approved equipment, range procedures, permit conditions, and qualified staff are all in place.

- Confirm final offerings before the session.  
- Follow every Range Director command immediately.  
- Review posted range procedures.  
- Use only camp-issued or specifically approved equipment.  
- Wear required protective equipment.  
- Never enter or cross a range boundary without permission.  
- Weather, staffing, age, and safety limits will not be waived.`,
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
    body: `## SPL and Leaders Meeting

Camp staff will publish the SPL and adult leader meeting time and location with the final daily information.

The meeting is used to:

- Share program, safety, weather, and fire updates  
- Resolve unit concerns while there is still time to improve the week  
- Coordinate campwide activities and service  
- Review program questions and unit feedback  
- Plan and approve campfire content  
- Gather feedback from SPLs and adult leaders

All unit SPLs and at least one adult leader should attend meetings announced for their session.

## Troop Friend

Each unit is assigned a staff Troop Friend who:

- Conducts or assists with the arrival tour  
- Checks in with the unit during the week  
- Answers routine questions  
- Connects the unit with the correct director or department  
- Supports inspections and departure procedures

The Troop Friend does not replace the Camp Director, Program Director, Camp Health Officer, Ranger, or Range Director for matters requiring their authority.

## Communication and Radios

- The camp phone is **520-576-1263** for urgent messages, not routine personal calls.  
- Cell coverage may be weak or absent.  
- One radio may be issued per campsite or unit depending on availability.  
- Return, charge, or exchange radios as directed.  
- Use radios for official camp business only.  
- Keep calls brief and avoid personal or confidential details over the air.  
- Report significant incidents even when the unit has already handled the immediate problem.

## Leader Responsibilities During Free Time

Scheduled Scout free time does not end unit supervision.

Leaders must:

- Maintain required adult coverage  
- Know where Scouts are  
- Enforce the buddy system  
- Ensure Scouts attend meals, flags, and required activities  
- Respond to health, behavior, and safety concerns  
- Keep Scout activity within approved boundaries  
- Coordinate independent hikes or projects with staff

## Campfire Content Approval

All Scout-presented skits, songs, stories, and performances must be reviewed by staff before presentation.

Content must be:

- Kind and inclusive  
- Appropriate for all ages  
- Free of hazing, humiliation, stereotypes, or put-downs  
- Free of unsafe stunts or unauthorized flame effects  
- Consistent with Scouting values

Camp staff will announce preparation and review times after the program is finalized. Every presentation must receive staff approval before it is shared; staff approval is final.

## Service Projects

Coordinate service with the Ranger, Program Director, or assigned staff leader before beginning.

- Do not cut vegetation, dig, move rocks, paint, build, repair utilities, or alter facilities without approval.  
- Use proper tools and protective equipment.  
- Maintain youth supervision and age-appropriate assignments.  
- Record hours for Tribe of Papago and Barker Standard recognition.

## Raising Concerns

Camp leadership maintains an open-door approach. Bring problems forward promptly rather than waiting for the end-of-week evaluation.

For routine matters, begin with the Troop Friend or appropriate Area Director. Go directly to the Camp Director, Program Director, Ranger, or Camp Health Officer when the issue involves safety, safeguarding youth, health, serious misconduct, or their specific authority.

## Before Departure from Home

- [ ] Confirm adult leadership, registration, and safeguarding-youth requirements  
- [ ] Verify registration for every participant  
- [ ] Organize health forms and emergency contacts  
- [ ] Submit dietary and accommodation needs  
- [ ] Check medication labels and instructions  
- [ ] Share merit badge interests in the non-binding survey; wait for the authorized catalog before building individual plans  
- [ ] Review the packing list and mountain weather  
- [ ] Brief Scouts on vehicles, buddies, privacy, camp rules, and Leave No Trace  
- [ ] Download directions and inspect vehicles  
- [ ] Confirm enough passenger seats remain available in camp  
- [ ] Prepare no-flame evening alternatives

## At Check-In

- [ ] Back into the assigned parking space  
- [ ] Keep emergency access clear  
- [ ] Present roster and health forms  
- [ ] Turn over medications and confirm administration times  
- [ ] Receive current camp information, campsite assignment, and leader packet  
- [ ] Meet the Troop Friend  
- [ ] Post the Fireguard Chart  
- [ ] Establish buddy and lodging assignments  
- [ ] Secure food and scented items  
- [ ] Attend the safety briefing and tour

## During Camp

- [ ] Maintain two-deep leadership and buddy-system compliance  
- [ ] Attend daily SPL and leader meetings  
- [ ] Check weather and fire restrictions  
- [ ] Report injuries, incidents, missing people, and concerns promptly  
- [ ] Secure food, trash, and scented items nightly  
- [ ] Keep Scouts hydrated, rested, supervised, and ready for published activities  
- [ ] Supervise free time and independent activities  
- [ ] Review campfire material with staff  
- [ ] Complete recognition and service paperwork

## Before Departure

- [ ] Clean and inspect the campsite  
- [ ] Return issued equipment  
- [ ] Retrieve medications and valuables  
- [ ] Complete advancement and recognition forms  
- [ ] Sign out visitors and participants  
- [ ] Receive departure clearance  
- [ ] Load only in authorized areas  
- [ ] Descend the mountain safely`,
  },
  {
    title: "Fire, Weather & Wildlife", slug: "fire-weather-and-wildlife", category: "During camp", audience: "all", priority: "critical", updatedAt: reviewedAt,
    summary: "How to interpret online conditions and follow current staff and USFS direction.",
    applicability: "All sessions", tags: ["fire", "weather", "wildlife", "restrictions"],
    body: `## Altitude, Hydration, Heat, and Cold

Camp sits more than 5,000 feet above Tucson. Some participants need time to adjust.

- Pace the first day and allow extra time on hills.  
- Encourage regular water intake and normal meals.  
- Watch for headache, dizziness, unusual fatigue, nausea, confusion, or shortness of breath.  
- Move an affected person to shade or shelter, stop activity, and contact the Health Lodge when symptoms do not resolve quickly.  
- Cold rain, wind, and nighttime temperatures can create hypothermia risk even in summer.

## Lightning and Severe Storms

“When thunder roars, go indoors.”

- Stop exposed activities when thunder is heard or staff suspends the program.  
- The Dining Hall is the primary camp storm shelter unless staff directs otherwise.  
- Fully enclosed hard-topped vehicles may serve as secondary shelter when directed.  
- Tents, open pavilions, trees, and golf carts do not provide reliable lightning protection.  
- Stay away from isolated trees, water, ridgelines, and metal objects.  
- Remain sheltered until staff gives the all clear; the standard safety interval is at least 30 minutes after the last thunder or visible lightning.  
- Units may move to the Dining Hall before the campwide alarm when leaders believe heavier shelter is needed.

## Wildfire

Wildfire is a serious mountain hazard.

- Follow fire restrictions and evacuation orders immediately.  
- Report smoke, flames, or suspicious fire activity.  
- Do not independently investigate a possible fire.  
- Keep roads and gates clear.  
- Keep vehicle keys accessible.  
- Follow the evacuation route and destination assigned by camp leadership.

## Terrain, Trees, and Night Travel

- Wear closed-toe footwear.  
- Carry a flashlight after dark.  
- Stay on designated routes.  
- Do not set up beneath visibly dead, damaged, or unstable trees.  
- Report leaning trees, cracking limbs, washouts, exposed utilities, or trail damage.  
- High winds may close ranges, climbing, trails, or other exposed activities.

## Wildlife

Camp Lawton is active wildlife habitat. Never approach, feed, corner, chase, or handle wildlife.

Animals seen in the area may include squirrels, skunks, bats, turkeys, snakes, spiders, black bears, mountain lions, and many bird species.

When potentially dangerous wildlife is near occupied areas:

1. Keep Scouts back and calm.  
2. Give the animal an escape route.  
3. Notify staff immediately.  
4. Follow the Ranger’s instructions.  
5. Secure food, trash, and scented items.

For a bear or mountain lion, do not run. Make yourself recognizable as a human, remain together, and back away slowly while following staff or emergency guidance.`,
  },
  {
    title: "Departure Checklist", slug: "departure-checklist", category: "Departure", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Campsite inspection, equipment return, medications, records, and departure clearance.",
    applicability: "All sessions", tags: ["departure", "checkout", "medications", "inspection"],
    body: `Before leaving camp:

- Clean the campsite and leave it better than you found it.  
- Complete the campsite inspection with the Troop Friend or designated staff member.  
- Return radios, first-aid kits, keys, and other issued equipment.  
- Retrieve medications from the Camp Health Officer and complete the return record.  
- Collect valuables held in secure storage.  
- Complete Tribe of Papago, Barker Standard, advancement, and service paperwork.  
- Resolve outstanding Trading Post or registration matters.  
- Sign out all participants and visitors.  
- Receive departure clearance from the Camp Director or designee.  
- Load vehicles only in authorized areas.  
- Keep emergency access clear.  
- Depart through the main entrance.  
- Follow the 10 MPH camp and access-road speed limit.  
- Use an appropriate lower gear while descending the mountain to reduce brake overheating.

Final Saturday departure is no later than **11:30 AM** unless camp leadership publishes another session-specific time.`,
  },
  {
    title: "Facilities & Campsites", slug: "facilities-and-campsites", category: "About Lawton", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Sleeping platforms, shared facilities, parking limits, and campsite expectations.",
    applicability: "All sessions", tags: ["facilities", "campsites", "sleeping", "parking"],
    body: `## Campsite Amenities

Most campsites use Adirondack-style shelters with two raised wooden sleeping platforms.

- Bring a sleeping pad and sleeping bag; cots are generally unnecessary.  
- Follow current age, gender, buddy, and lodging rules.  
- Tell camp leadership before arrival when the unit has an odd number of Scouts or needs a lodging accommodation.  
- Do not move shelters, dig trenches, drive stakes, hang hammocks, or alter the site without approval.  
- Keep pathways clear and gear secured.  
- Do not store valuables in communal food or smellables containers.  
- Leave the site cleaner than you found it.

## Showers, Restrooms, and Privacy

Camp provides separate adult and youth facilities with private-use spaces. Follow all posted gender, age, scheduling, and cleaning procedures.

- Wear shower shoes inside the shower area.  
- Open-toe shoes are not permitted elsewhere in camp.  
- Never bring a camera or recording device into a restroom, shower, changing area, or other private space.  
- Adults may enter youth privacy areas only under an authorized procedure or immediate health and safety emergency.

## Meals and the Dining Hall

- Arrive on time and in the uniform specified by the daily schedule.  
- Units share post-meal cleanup responsibilities during the scheduled 30-minute buffer.  
- The kitchen is restricted. Enter only with permission from the Cook or Camp Director.  
- Notify kitchen leadership promptly when a dietary plan is not working.  
- Do not remove food from the Dining Hall without approval.  
- Leaders should model reasonable portions, hydration, courtesy, and cleanup.

## Water and Conservation

Water is limited on the mountain.

- Carry a filled water bottle at all times.  
- Refill often and encourage Scouts to drink regularly.  
- Use only the water needed for drinking, hygiene, and approved cleaning.  
- Report leaking fixtures immediately.  
- Do not waste water for games, cooling, or campsite projects without approval.

## Food, Trash, and “Smellables”

Food and scented items can attract wildlife.

- Plain water is the only routine drink permitted in campsites unless staff approves otherwise.  
- Store food, trash, toothpaste, deodorant, lotion, lip balm, and other scented items in the assigned bear-resistant system.  
- Follow the nightly procedure for moving or securing smellables.  
- Empty unit trash as directed every evening.  
- Never pour food residue, grease, or wastewater onto the ground.  
- Report damaged storage equipment or wildlife activity immediately.

## Uniform and Footwear

- **Field (Class A) uniform:** Flags, chapel or Scouts’ Own, campfires, ceremonies, and formal events  
- **Activity (Class B) uniform:** Merit badges, daily programs, service, and active events  
- **Closed-toe footwear:** Required outdoors and in program areas  
- **Water bottle:** Carried throughout camp

## Devices, Photography, and Quiet Hours

Personal electronics are brought at the owner’s risk.

- Units may set stricter device rules than camp.  
- Device use must not interfere with program, supervision, sleep, meals, flags, or movement through camp.  
- Keep sound from music, games, and videos from disturbing other campsites.  
- Honor posted quiet hours and lights-out times.  
- Follow all council, camp, and unit photo-release rules.  
- Do not post identifiable images of another unit’s Scouts without proper authorization.  
- Never record in private areas.  
- Drones require prior written approval.

## Trading Post, Mail, and Valuables

- The Trading Post accepts payment methods announced in the final packet; do not expect credit tabs.  
- Unit leaders should set reasonable spending expectations before camp.  
- Mail may take several days to reach the mountain.  
- Secure cash, electronics, and valuables. Camp cannot guarantee against loss or damage.  
- Ask at check-in whether limited secure storage is available for critical items.`,
  },
  {
    title: "History & Camp Spirit", slug: "history-and-camp-spirit", category: "About Lawton", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Camp Lawton's mountain setting, long history, traditions, and stewardship responsibility.",
    applicability: "All visitors", tags: ["history", "traditions", "stewardship", "1921"],
    body: `Camp Lawton was established in 1921 to give Southern Arizona Scouts a permanent mountain camp away from the desert heat. The original camp stood near today’s Palisades Ranger Station. It moved to its present site in 1926, and many historic buildings still in use were constructed beginning in the late 1940s.

Camp Lawton exists to support the goals of your unit and the growth of each Scout. Our mission is to create safe, welcoming, and memorable outdoor experiences where Scouts learn by doing, practice leadership, build confidence, and strengthen their connection to Scouting and the outdoors.

Advancement matters, but camp is not a merit-badge factory. The songs, games, campfires, hikes, service, challenges, friendships, and staff relationships are often what Scouts remember longest. The 2027 program is designed around both achievement and adventure.

## Pirate Crew Adventures

Welcome aboard. For 2027, Camp Lawton becomes a fleet of pirate ships. Every campsite is a **Ship**, every unit is a **Pirate Crew**, and every Scout has a chance to earn their sea legs.

The theme draws from the adventurous legends of the Golden Age of Piracy, with an emphasis on teamwork, navigation, outdoor skill, service, and treasure earned through achievement. All programming is land-based.

Please share the relevant portions of this guide with Scouts, parents, guardians, drivers, and other unit leaders before departure.

## The Tribe of Papago

The supplied Camp Lawton program history says Camp Director and Catalina Council Scout Executive Harry B. Ogle established a local honor-camping society before the Order of the Arrow became Scouting’s nationally recognized honor society. The local lodge later adopted the Papago name, while the Tribe continued at Camp Lawton as a returning-camper recognition program built around service, leadership, trail experience, reflection, and Scout spirit.

The historic name and rank terms below are transcribed from the supplied working document. They refer to a Camp Lawton Scouting tradition, not to the Tohono O’odham Nation. This material remains subject to authorized cultural and program review.

These are working requirements. The current staff-issued form and instructions control each season.

Explore the [interactive Tribe of Papago page](/tribe-of-papago) for searchable rank paths, the Barker Standard, and credited archive material.

### Hunter — First Year

- Participate in a service project for Camp Lawton
- Earn one merit badge or complete all available Model Camp requirements  
- Hike one approved camp trail  
- Demonstrate Scout spirit

### Warrior — Second Year

- Complete a service project for Camp Lawton
- Earn two merit badges or complete Model Camp  
- Hike one approved camp trail  
- Demonstrate Scout spirit

### Medicine Man — Third Year

- Complete a service project
- Earn two merit badges  
- Provide two hours of approved program assistance or peer tutoring
- Hike two approved camp trails  
- Attend a camp chapel service or unit-led spiritual meeting
- Demonstrate Scout spirit

### Chief — Fourth Year

- Complete four hours of service projects
- Earn four merit badges
- Volunteer in an approved program area for four hours during camp
- Hike two approved camp trails  
- Attend a camp chapel service or unit-led spiritual meeting
- Demonstrate Scout spirit

### Elder — Adult Leader or Fifth Year

- Encourage Scouts working toward recognition  
- Complete a service project
- Hike two approved camp trails
- Volunteer in an approved program area for four hours during camp
- Attend a camp chapel service or unit-led spiritual meeting

### Guide — Staff Member

- Serve on staff for more than one week  
- Lead or assist with a Tribe of Papago service project
- Teach at least ten Scouts over a week, or fulfill assigned duties to the best of your ability when the role does not involve teaching
- Visit a campsite at least once each day
- Learn the program’s history and purpose  
- Participate in a ceremony
- Obtain recommendations from a Scoutmaster and Area Director
- Attend a chapel service or unit spiritual meeting during at least two weeks of staff service
- Lead a unit on an approved camp trail

Unit leaders track progress and submit completed forms. Patches, rockers, and current requirements are available through the Trading Post or program leadership.

## The Barker Standard

Roy J. Barker (1924–2012) was a longtime Scoutmaster, executive-board member, camp staff member, and mentor whose units were known for service and Scout spirit. The Barker Standard recognizes units that contribute meaningfully to the camp community.

To earn the Barker Standard, a unit must:

1. Request and pass a uniform inspection by a senior staff member.  
2. Request and pass a campsite inspection by a senior staff member.  
3. Lead a flag ceremony.  
4. Sing a song at a campwide activity.  
5. Perform an approved skit, song, or story at a closing campfire.  
6. Complete an assigned camp cleanup duty.  
7. Complete an approved service project.  
8. Consistently demonstrate Scout spirit and live the Scout Oath, Scout Law, motto, slogan, Leave No Trace principles, and Outdoor Code.
9. Complete and submit the Barker Standard application.

Every unit completing the published requirements may receive a Tribe of Papago rocker and ribbon for the unit flag. Staff may select one especially strong unit for additional recognition. Requirements may be adjusted to fit session length and camp needs.

### Roy J. Barker’s wider legacy

The supplied Barker biography records a life that joined entomology, environmental stewardship, and hands-on Scouting leadership. Barker (1924–2012) served as a Cubmaster, Scoutmaster, district chair, Catalina Council Executive Board member, Wood Badge instructor, and Camp Lawton physician. It records his 1969–2002 council-board service, his 1974 Silver Beaver Award, and a 2009 Otis H. Chidester Scout Museum honor. These biographical details are presented as working historical research and should receive source and family review before being treated as a final institutional biography.

The Barker Standard carries that same ethic into unit life: service that improves camp, leadership that teaches by example, and Scout spirit that is visible in ordinary work.`,
  },
  {
    title: "Frequently Asked Questions", slug: "frequently-asked-questions", category: "Help", audience: "all", priority: "normal", updatedAt: reviewedAt,
    summary: "Fast answers about aquatics, connectivity, fires, registration, and 2027 program updates.",
    applicability: "All sessions", tags: ["faq", "help", "aquatics", "registration"],
    body: `## When will the merit badge list and class schedule be available?

Camp Lawton is gathering unit interest before finalizing the 2027 program. The current survey topics are not a published offering list and should not be used to build individual schedules. Authorized offerings, times, capacities, fees, and prerequisites will be shared when program review is complete.

## How large is Camp Lawton?

Camp Lawton is approximately 60 acres. The compact layout helps Scouts learn the property and know the staff, but the elevation and steep terrain make distances feel longer.

## Why is there no aquatics program?

The former pool is no longer available. A future aquatics facility would require major funding, construction approval, and Forest Service authorization. Do not plan for swimming or boating in 2027\.

## Is the planning survey official registration?

No. It helps staff estimate attendance and program demand, but it does not register participants, reserve campsites or classes, collect payment, or replace Black Pug. Follow the official registration instructions when they are released.

## Can our unit arrive early or leave late?

Only by prior arrangement with the Camp Director. The Staff need turnaround time to prepare the property safely.

## Can leaders drive gear to the campsite?

Not unless the Camp Director or Ranger specifically authorizes the vehicle. Assume you will be carrying gear from the parking area to your campsite. Navajo campsite has direct vehicle access, but is usually reserved for special needs units.

## Will we be allowed a campfire in our campsite?

Possibly, but do not count on it. Fire restrictions are set by the Forest Service and can change quickly. Bring a complete no-flame plan. 

## Is food provided? Can we make our own?

Food is provided in the dining hall three meals each day. You may NOT cook or have food in your campsite at any time to prevent attracting wildlife. If you desire to cook your own treats or meals, make arrangements to use the fireplace at the dining hall.   

## Can families or friends visit?

Only with advance approval. Visitors must sign in, follow all camp rules, remain with an escort or host unit, and sign out before leaving.

## Is there laundry in camp?

No washing machine or laundry service is available. Pack enough clothing for the full session.

## What should we do when a Scout is struggling emotionally?

Stay calm, remain present, protect privacy, and involve the appropriate unit and camp leaders. Attend to basics such as water, food, rest, sensory load, and physical illness. Contact camp leadership promptly when a Scout needs more support than the unit can safely provide. In an immediate safety crisis, notify the Camp Health Officer or Camp Director at once.

## Who should receive a complaint or safety concern?

Routine issues may go through the Troop Friend or an Area Director. Health, safeguarding-youth, serious conduct, emergency, or property concerns should go directly to the Administration. If you feel the issue requires escalation beyond camp administration, we kindly request you inform us but your priority is to the safety of your scouts.`,
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
