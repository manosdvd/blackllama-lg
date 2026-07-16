import Link from "next/link";
import { requireStaffRole } from "../../staff-auth";

export default async function StaffSchedulePage() { await requireStaffRole("/staff/schedule", ["director", "program-director"]); return <main className="staff-page"><div className="staff-shell"><header className="staff-top"><div><span>Archived working material</span><h1>Schedule publishing is paused.</h1><p>The draft event inventory remains in the repository, but editing and publication are disabled until the badge catalog and class times receive program approval.</p></div><Link href="/staff">Dashboard</Link></header></div></main>; }
