import Link from "next/link";
import { PROGRAM_PLANNING_PUBLISHED } from "../lib/site-features";

export default function SiteFooter() {
  return <footer>
    <div className="footer-brand"><img src="/images/logo-ui.webp" alt="" width={96} height={96} className="brand-mark" /><div><strong>Camp Lawton</strong><small>On the mountain since 1921</small><p>Scout skills, mountain adventure, and traditions carried by generations.</p></div></div>
    <div><strong>Prepare</strong><Link href="/plan">2027 sessions</Link><Link href="/guide/packing-list">Packing checklist</Link><Link href="/guide">Leader&apos;s guide</Link><Link href="/merit-badges">Merit badge survey</Link>{PROGRAM_PLANNING_PUBLISHED && <><Link href="/schedule">Camp schedule</Link><Link href="/my-plan">My Plan</Link></>}</div>
    <div><strong>Resources</strong><Link href="/history">Camp history</Link><Link href="/tribe-of-papago">Tribe of Papago</Link><Link href="/map">Interactive map</Link><Link href="/alerts">Conditions & notices</Link><Link href="/pre-register">Pre-register</Link></div>
    <div><strong>Site</strong><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/staff" prefetch={false}>Staff workspace</Link><p>Camp information remains subject to final authorized review.</p></div>
  </footer>;
}
