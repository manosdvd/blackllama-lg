import Link from "next/link";

type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday";

type ScheduleEvent = {
  time: string;
  title: string;
  detail: string;
  kind: "routine" | "program" | "leader" | "meal";
};

const days: DayKey[] = ["Monday", "Tuesday", "Wednesday", "Thursday"];

const scheduleByDay: Record<DayKey, ScheduleEvent[]> = {
  Monday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · location posted at check-in", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campsite competition", detail: "Orienteering and scavenger challenge", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Evening program", detail: "All-camp program; details announced with the final schedule", kind: "program" },
  ],
  Tuesday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campsite competition", detail: "Knot-tying challenge", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Karaoke night", detail: "Optional all-camp evening program", kind: "program" },
  ],
  Wednesday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campfire preparation", detail: "Campsite creative time for Friday campfire", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Stargazing program", detail: "Astronomy and celestial navigation", kind: "program" },
  ],
  Thursday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Final regular afternoon blocks", kind: "program" },
    { time: "4:35 PM", title: "Gaga ball tournament", detail: "Campsite competition", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Campfire kit approval", detail: "All Friday skits, songs, and stories require staff review", kind: "leader" },
  ],
};

export default function SchedulePage({
  searchParams,
}: {
  searchParams: { day?: string };
}) {
  const selectedDay = (searchParams.day as DayKey) || "Monday";

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Camp Lawton home">
          <img src="/images/CLlogo.png" alt="CL Logo" className="brand-mark" />
          <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Guide</Link>
          <Link href="/schedule" aria-current="page">Schedule</Link>
          <Link href="/merit-badges">Programs</Link>
          <Link href="/#alerts">Alerts</Link>
        </nav>
      </header>
      
      <section className="section">
        <div className="section-heading light">
          <div>
            <div className="section-kicker">Week at a glance</div>
            <h2>Camp Schedule</h2>
          </div>
          <p>Standard Monday–Thursday pattern from the 2027 guide. Ten-minute transitions and meal cleanup buffers are included.</p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="Choose a schedule day">
          {days.map((day) => (
            <Link
              key={day}
              href={`/schedule?day=${day}`}
              className="button button-small"
              style={{ opacity: selectedDay === day ? 1 : 0.6 }}
              role="tab"
              aria-selected={selectedDay === day}
            >
              {day}
            </Link>
          ))}
        </div>
        <div className="schedule-panel" style={{ marginTop: "2rem" }}>
          <div className="schedule-date">
            <span>Standard day</span><strong>{selectedDay}</strong><small>Exact offerings may change before camp.</small>
          </div>
          <div className="timeline">
            {scheduleByDay[selectedDay]?.map((event) => (
              <div className={`timeline-item ${event.kind}`} key={`${event.time}-${event.title}`}>
                <time>{event.time}</time>
                <span><strong>{event.title}</strong><small>{event.detail}</small></span>
                <i aria-hidden="true">→</i>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
