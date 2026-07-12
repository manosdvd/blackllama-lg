import Link from "next/link";
import { bsaSchedule, cubSchedule } from "../../../lib/camp-catalog";
import { requireStaff } from "../../staff-auth";

export default async function StaffSchedulePage() { await requireStaff("/staff/schedule"); return <main className="staff-page"><div className="staff-shell"><header className="staff-top"><div><span>Structured program</span><h1>Schedule inventory</h1><p>Select an event to create a database-backed revision and publish it.</p></div><Link href="/staff">Dashboard</Link></header><section className="staff-content-list">{[...bsaSchedule, ...cubSchedule].map((event) => <article key={event.id}><div><span>{event.day} · {event.startTime}-{event.endTime}</span><h2>{event.title}</h2><p>{event.summary}</p></div><Link className="button button-small" href={`/staff/editor?event=${event.id}`}>Edit</Link></article>)}</section></div></main>; }
