import Link from "next/link";
import { getPublishedSchedule } from "../../lib/content-repository";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday"] as const;

export default async function SchedulePage({ searchParams }: { searchParams: Promise<{ day?: string }> }) {
  const requestedDay = (await searchParams).day;
  const selectedDay = days.find((day) => day === requestedDay) ?? "Monday";
  const schedule = await getPublishedSchedule(selectedDay);

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Camp Lawton home">
          <img src="/images/CLlogo.png" alt="" className="brand-mark" />
          <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#guide">Guide</Link>
          <Link href="/schedule" aria-current="page">Schedule</Link>
          <Link href="/merit-badges">Programs</Link>
          <Link href="/#alerts">Alerts</Link>
        </nav>
      </header>

      <section className="section schedule-page">
        <div className="section-heading">
          <div><div className="section-kicker">Week at a glance</div><h2>Camp schedule</h2></div>
          <p>Choose a day, then open an event for its location, audience, requirements, and preparation details.</p>
        </div>
        <div className="day-tabs schedule-day-tabs" role="tablist" aria-label="Choose a schedule day">
          {days.map((day) => (
            <Link key={day} href={`/schedule?day=${day}`} role="tab" aria-selected={selectedDay === day}>{day}</Link>
          ))}
        </div>
        <div className="schedule-panel">
          <div className="schedule-date">
            <span>Standard day</span><strong>{selectedDay}</strong>
            <small>Times and offerings remain subject to final staff publication.</small>
          </div>
          <div className="timeline">
            {schedule.map((event) => (
              <details className={`timeline-event ${event.kind}`} key={event.id}>
                <summary className="timeline-item">
                  <time>{event.startTime}</time>
                  <span><strong>{event.title}</strong><small>{event.summary}</small></span>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className="event-detail">
                  <dl>
                    <div><dt>Time</dt><dd>{event.startTime}-{event.endTime}</dd></div>
                    <div><dt>Location</dt><dd>{event.location}</dd></div>
                    <div><dt>Audience</dt><dd>{event.audience}</dd></div>
                    <div><dt>Attendance</dt><dd>{event.required ? "Required" : "Optional"}</dd></div>
                  </dl>
                  {event.whatToBring && <p><strong>What to bring:</strong> {event.whatToBring}</p>}
                  {event.accessibilityNotes && <p><strong>Accessibility:</strong> {event.accessibilityNotes}</p>}
                </div>
              </details>
            ))}
            {schedule.length === 0 && <p className="schedule-empty">The detailed {selectedDay} schedule has not been published yet.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
