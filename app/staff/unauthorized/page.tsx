import Link from "next/link";

export default function UnauthorizedPage() {
  return <main className="status-page"><div><p className="section-kicker">Staff access</p><h1>Editorial access required</h1><p>Your account is signed in but has not been assigned a Camp Lawton staff role. Ask the Camp Director or site administrator to grant access.</p><Link className="button" href="/">Return home</Link></div></main>;
}
