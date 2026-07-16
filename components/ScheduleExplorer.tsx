"use client";

import { useMemo, useState } from "react";
import type { PublicScheduleEvent } from "../lib/public-content";

export default function ScheduleExplorer({ bsaEvents, cubEvents }: { bsaEvents: PublicScheduleEvent[]; cubEvents: PublicScheduleEvent[] }) {
  const [program, setProgram] = useState<"bsa" | "cub">("bsa");
  const days = program === "bsa" ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] : ["Friday", "Saturday", "Sunday"];
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [audience, setAudience] = useState("all");
  const events = program === "bsa" ? bsaEvents : cubEvents;
  const effectiveDay = days.includes(selectedDay) ? selectedDay : days[0];
  const visible = useMemo(() => events.filter((event) => event.day === effectiveDay && (audience === "all" || event.kind === audience)), [audience, effectiveDay, events]);

  return <>
    <div className="explorer-toolbar"><div className="segmented" aria-label="Program schedule"><button aria-pressed={program === "bsa"} onClick={() => setProgram("bsa")}>BSA weeks</button><button aria-pressed={program === "cub"} onClick={() => setProgram("cub")}>Cub weekend</button></div><label>Event type<select value={audience} onChange={(event) => setAudience(event.target.value)}><option value="all">All events</option><option value="program">Program</option><option value="meal">Meals</option><option value="leader">Leader / required</option><option value="routine">Camp routine</option></select></label></div>
    <div className="day-tabs schedule-day-tabs" role="group" aria-label="Choose schedule day">{days.map((day) => <button key={day} type="button" aria-pressed={effectiveDay === day} onClick={() => setSelectedDay(day)}>{day}</button>)}</div>
    <div className="schedule-panel schedule-explorer-panel"><div className="schedule-date"><span>{program === "bsa" ? "BSA weeks" : "Cub weekend"}</span><strong>{effectiveDay}</strong><small>Open an event for complete planning details. Final times remain subject to staff publication.</small></div><div className="timeline">{visible.map((event) => <details className={`timeline-event ${event.kind}`} key={event.id}><summary className="timeline-item"><time>{event.startTime}</time><span><strong>{event.title}</strong><small>{event.summary}</small></span><i aria-hidden="true">+</i></summary><div className="event-detail"><dl><div><dt>Time</dt><dd>{event.startTime}-{event.endTime}</dd></div><div><dt>Location</dt><dd>{event.location}</dd></div><div><dt>Audience</dt><dd>{event.audience}</dd></div><div><dt>Attendance</dt><dd>{event.required ? "Required" : "Optional"}</dd></div></dl>{event.whatToBring && <p><strong>What to bring:</strong> {event.whatToBring}</p>}{event.accessibilityNotes && <p><strong>Accessibility:</strong> {event.accessibilityNotes}</p>}</div></details>)}{visible.length === 0 && <p className="schedule-empty">No matching events are currently published for {effectiveDay}.</p>}</div></div>
  </>;
}
