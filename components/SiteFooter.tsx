import Link from "next/link";

export default function SiteFooter() {
  return <footer>
    <div className="footer-brand"><img src="/images/CLlogo.png" alt="" className="brand-mark" /><div><strong>Camp Lawton</strong><small>Catalina Council · Arizona</small></div></div>
    <div><strong>Plan</strong><Link href="/plan">Sessions & preparation</Link><Link href="/schedule">Camp schedule</Link><Link href="/merit-badges">Merit badges</Link><Link href="/my-plan">My Plan</Link></div>
    <div><strong>Resources</strong><Link href="/guide">Leader&apos;s guide</Link><Link href="/alerts">Conditions & notices</Link><Link href="/pre-register">Pre-register</Link></div>
    <div><strong>Site</strong><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/staff">Staff workspace</Link><p>Camp information remains subject to final authorized review.</p></div>
  </footer>;
}
