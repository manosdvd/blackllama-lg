import Link from "next/link";
import { PROGRAM_PLANNING_PUBLISHED } from "../lib/site-features";

const links = [
  ["2027 Camp", "/plan"], ["Leader's Guide", "/guide"], ["History", "/history"], ["Map", "/map"],
  ...(PROGRAM_PLANNING_PUBLISHED ? [["Schedule", "/schedule"]] : []),
  ["Badge Survey", "/merit-badges"], ["Alerts", "/alerts"],
];

export default function SiteHeader({ current }: { current?: string }) {
  return <header className="site-header app-header">
    <Link className="brand" href="/" aria-label="Camp Lawton home">
      <img src="/images/logo-ui.webp" alt="" width={96} height={96} className="brand-mark" />
      <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
    </Link>
    <nav aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>)}</nav>
    <div className="header-actions">{PROGRAM_PLANNING_PUBLISHED && <><Link className="plan-link" href="/workspace" prefetch={false}>My Unit</Link><Link className="plan-link" href="/my-plan">My Plan</Link></>}<Link className="button button-small" href="/pre-register">Pre-register</Link></div>
    <details className="mobile-nav"><summary aria-label="Open navigation">Menu</summary><div>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}{PROGRAM_PLANNING_PUBLISHED && <><Link href="/workspace" prefetch={false}>My Unit</Link><Link href="/my-plan">My Plan</Link></>}<Link href="/pre-register">Pre-register</Link></div></details>
  </header>;
}
