"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProgramOffering } from "../lib/camp-catalog";

export default function ProgramExplorer({ offerings }: { offerings: ProgramOffering[] }) {
  const [view, setView] = useState<"badge" | "time" | "area">("badge");
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [eagleOnly, setEagleOnly] = useState(false);
  const areas = [...new Set(offerings.map((item) => item.area))];
  const visible = useMemo(() => offerings.filter((item) => (area === "all" || item.area === area) && (!eagleOnly || item.eagleRequired) && `${item.title} ${item.area} ${item.description}`.toLowerCase().includes(query.toLowerCase().trim())), [area, eagleOnly, offerings, query]);
  const grouped = view === "area" ? areas.map((name) => [name, visible.filter((item) => item.area === name)] as const) : view === "time" ? [815, 915, 1015, 1335, 1435, 1535].map((start) => [visible.flatMap((item) => item.slots).find((slot) => slot.start === start)?.label ?? String(start), visible.filter((item) => item.slots.some((slot) => slot.start === start))] as const) : [["All badges", [...visible].sort((a, b) => a.title.localeCompare(b.title))] as const];
  return <>
    <div className="program-tools"><div className="segmented"><button aria-pressed={view === "badge"} onClick={() => setView("badge")}>By badge</button><button aria-pressed={view === "time"} onClick={() => setView("time")}>By time</button><button aria-pressed={view === "area"} onClick={() => setView("area")}>By area</button></div><label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search badges</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search badges..." /></label><label>Area<select value={area} onChange={(event) => setArea(event.target.value)}><option value="all">All areas</option>{areas.map((name) => <option key={name}>{name}</option>)}</select></label><label className="filter-check"><input type="checkbox" checked={eagleOnly} onChange={(event) => setEagleOnly(event.target.checked)} />Eagle-required</label></div>
    <div className="program-groups">{grouped.map(([label, items]) => items.length > 0 && <section key={label}><header><h2>{label}</h2><span>{items.length} offering{items.length === 1 ? "" : "s"}</span></header><div>{items.map((item) => <article className="program-row" key={`${label}-${item.id}`}><div className="program-main"><span>{item.area} · {item.viability}</span><h3>{item.title}{item.eagleRequired && <i>Eagle</i>}</h3><p>{item.description}</p><div className="program-meta"><span>{item.difficulty}</span><span>Capacity {item.capacity}</span><span>{item.fee ? `$${item.fee} materials` : "No fee listed"}</span></div></div><div className="program-slots">{item.slots.map((slot) => <Link key={slot.id} href={`/my-plan?add=${slot.id}`}><strong>{slot.label}</strong><small>{slot.location}</small><span>Add to plan →</span></Link>)}</div><details><summary>Requirements</summary><p><strong>Guidance:</strong> {item.ageGuidance}</p><p><strong>Prerequisites:</strong> {item.prerequisites}</p><p><strong>Outside work:</strong> {item.outsideWork}</p></details></article>)}</div></section>)}</div>
  </>;
}
