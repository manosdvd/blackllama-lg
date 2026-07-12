export type PublicArticle = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  applicability: string;
  priority: string;
  updatedAt: Date;
};

export type PublicScheduleEvent = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  summary: string;
  kind: string;
  location: string;
  audience: string;
  required: boolean;
  whatToBring: string | null;
  accessibilityNotes: string | null;
};

export type PublicNotice = {
  id: string;
  title: string;
  summary: string;
  instructions: string | null;
  urgency: string;
  source: string;
  updatedAt: Date;
};

export const arrivalArticle: PublicArticle = {
  title: "Arrival & Check-In",
  slug: "arrival-and-check-in",
  summary: "Arrival windows, parking, paperwork, medication handoff, and the required first-day safety briefing.",
  applicability: "BSA week-long, condensed BSA, and Cub weekend",
  priority: "important",
  updatedAt: new Date("2026-07-11T00:00:00Z"),
  body: `## Before you leave

- Bring a signed unit roster and current Annual Health and Medical Records.
- Keep medications in their original labeled containers for check-in.
- Confirm accommodation needs with camp staff before traveling.

## Arrival window

Week 1 arrives Tuesday. Weeks 2 and 3 arrive Sunday. The standard check-in window is **1:00-3:00 PM**. Follow session-specific instructions if staff publish a change.

## Parking and gear

Back vehicles into marked spaces. Vehicles are not permitted beyond the designated parking area. Plan for the unit to carry its gear from parking to the assigned campsite.

## Required briefing

All Scouts and leaders attend the **3:00 PM safety briefing**. Unit leaders should tell staff immediately if a delayed arrival will affect attendance.`,
};

export const mondaySchedule: PublicScheduleEvent[] = [
  ["flags", "6:40 AM", "7:00 AM", "Morning flags", "Opening ceremony for all camp.", "routine", "Flag field", "All camp", true],
  ["breakfast", "7:10 AM", "7:45 AM", "Breakfast", "Meal service with a cleanup buffer afterward.", "meal", "Dining area", "All camp", true],
  ["sessions-1-3", "8:15 AM", "11:05 AM", "Merit badge sessions 1-3", "Three 50-minute program blocks with ten-minute transitions.", "program", "Program areas", "Scouts", false],
  ["lunch", "11:40 AM", "12:25 PM", "Lunch", "Midday meal service with cleanup afterward.", "meal", "Dining area", "All camp", true],
  ["leader-meeting", "12:55 PM", "1:25 PM", "SPL & leaders meeting", "Daily program updates and unit coordination.", "leader", "Location posted at check-in", "SPLs and unit leaders", true],
  ["sessions-4-6", "1:35 PM", "4:25 PM", "Merit badge sessions 4-6", "Three afternoon program blocks with ten-minute transitions.", "program", "Program areas", "Scouts", false],
  ["competition", "4:35 PM", "5:35 PM", "Campsite competition", "Orienteering and scavenger challenge.", "program", "All camp", "Units", false],
  ["dinner", "6:05 PM", "6:55 PM", "Dinner", "Evening meal service with cleanup afterward.", "meal", "Dining area", "All camp", true],
  ["evening-program", "7:25 PM", "8:30 PM", "Evening program", "All-camp program; final details are announced with the session schedule.", "program", "Location announced", "All camp", false],
].map(([id, startTime, endTime, title, summary, kind, location, audience, required]) => ({
  id: String(id), day: "Monday", startTime: String(startTime), endTime: String(endTime), title: String(title),
  summary: String(summary), kind: String(kind), location: String(location), audience: String(audience),
  required: Boolean(required), whatToBring: null, accessibilityNotes: null,
}));

export const planningNotice: PublicNotice = {
  id: "planning-notice",
  title: "2027 schedule planning",
  summary: "Schedules are preliminary. Final program details will be posted before registration opens.",
  instructions: "Review this site again before your unit departs.",
  urgency: "information",
  source: "Camp Lawton staff",
  updatedAt: new Date("2026-07-11T00:00:00Z"),
};
