import { desc } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "../../../db";
import { submissions } from "../../../db/schema";
import { sessions } from "../../../lib/camp-catalog";
import { aggregateBadgeDemand, parsePlanningSnapshot } from "../../../lib/planning-submission";
import { requireStaffRole } from "../../staff-auth";
import { updateSubmissionStatus } from "./actions";

const completionLabel = { complete: "Complete at camp", conditional: "Conditional", partial: "Partial at camp" } as const;

export default async function SubmissionsPage() {
  await requireStaffRole("/staff/submissions", ["director"]);
  let rows: typeof submissions.$inferSelect[] = [];
  let databaseAvailable = true;
  try { rows = await getDb().select().from(submissions).orderBy(desc(submissions.createdAt)); } catch { databaseAvailable = false; }
  const parsed = rows.flatMap((row) => {
    const snapshot = parsePlanningSnapshot(row.snapshot);
    return snapshot ? [{ row, snapshot }] : [];
  });
  const invalidCount = rows.length - parsed.length;
  const demand = aggregateBadgeDemand(parsed.map((item) => item.snapshot));
  const maximumDemand = Math.max(1, ...demand.map((item) => item.interestedCount));

  return <main className="staff-page"><div className="staff-shell">
    <header className="staff-top"><div><span>Planning operations</span><h1>Submissions & demand</h1><p>Planning demand is not enrollment and does not represent reserved seats.</p></div><div><Link href="/staff">Dashboard</Link><Link className="button button-small" href="/staff/submissions/export">Export demand CSV</Link></div></header>
    {!databaseAvailable && <p className="staff-data-warning" role="alert">The camp database is unavailable. Submission totals are not currently loaded.</p>}
    {invalidCount > 0 && <p className="staff-data-warning">{invalidCount} malformed legacy submission{invalidCount === 1 ? " was" : "s were"} excluded from demand totals and need administrative review.</p>}
    <section className="demand-panel"><header><h2>Badge demand</h2><span>{demand.length} selected badges · {parsed.length} unit submission{parsed.length === 1 ? "" : "s"}</span></header><div>
      {demand.map((item) => {
        const sessionSummary = sessions.flatMap((session) => item.sessionCounts[session.id] ? [`${session.shortName}: ${item.sessionCounts[session.id]}`] : []).join(" · ");
        return <article key={item.badge.id}>
          <span>{item.badge.area} · Tier {item.badge.tier}</span>
          <div><strong><Link href={`/merit-badges/${item.badge.id}`}>{item.badge.title}</Link></strong><small>{completionLabel[item.badge.completion]} · {item.unitCount} unit{item.unitCount === 1 ? "" : "s"} · {sessionSummary}</small><small>Priority: {item.priorityCounts["must-have"]} must-have · {item.priorityCounts.strong} strong · {item.priorityCounts["nice-to-have"]} nice-to-have</small>{item.notes.length > 0 && <details><summary>{item.notes.length} planning note{item.notes.length === 1 ? "" : "s"}</summary>{item.notes.map((note, index) => <p key={`${note.unit}-${index}`}><b>{note.unit} · {sessions.find((session) => session.id === note.sessionId)?.shortName ?? note.sessionId}</b>{note.note}</p>)}</details>}</div>
          <i style={{ width: `${item.interestedCount / maximumDemand * 100}%` }} />
          <b>{item.interestedCount} interested</b>
        </article>;
      })}
      {demand.length === 0 && <p>No badge demand has been submitted.</p>}
    </div></section>
    <section className="submission-table"><header><span>Reference</span><span>Unit / session</span><span>Attendance</span><span>Contact</span><span>Status</span></header>{parsed.map(({ row, snapshot }) => {
      const youth = snapshot.attendance.youthMale + snapshot.attendance.youthFemale + snapshot.attendance.youthOther;
      const adults = snapshot.attendance.adultMale + snapshot.attendance.adultFemale + snapshot.attendance.adultOther;
      return <article key={row.id}><div><strong>{row.reference}</strong><small>{row.createdAt.toLocaleDateString()}</small></div><div><strong>{snapshot.unit.unitType} {snapshot.unit.unitNumber}</strong><small>{sessions.find((session) => session.id === snapshot.unit.sessionId)?.shortName ?? snapshot.unit.sessionId} · {snapshot.interests.length} badges</small></div><div><strong>{youth} youth · {adults} adults</strong><small>{snapshot.scouts.length} optional names</small></div><div><strong>{row.contactName}</strong><a href={`mailto:${row.contactEmail}`}>{row.contactEmail}</a></div><form action={updateSubmissionStatus}><input type="hidden" name="id" value={row.id} /><select name="status" defaultValue={row.status} aria-label={`Status for ${row.reference}`}><option value="new">New</option><option value="contacted">Contacted</option><option value="follow-up">Follow-up needed</option><option value="ready">Ready for registration</option><option value="closed">Closed</option><option value="withdrawn">Withdrawn</option></select><button type="submit">Update</button></form></article>;
    })}{parsed.length === 0 && <p className="staff-empty">No planning submissions yet.</p>}</section>
  </div></main>;
}
