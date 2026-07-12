"use client";

import { useEffect, useState } from "react";
import { findOfferingSlot, programOfferings } from "../lib/camp-catalog";

type Scout = { id: string; name: string; selections: string[] };
type PlannerState = { unit: string; session: string; scouts: Scout[] };
type Warning = { level: "error" | "warning"; message: string; slotIds: string[]; alternative?: string };

const initial: PlannerState = { unit: "", session: "bsa-week-2", scouts: [{ id: "scout-1", name: "Scout 1", selections: [] }] };
const toMinutes = (time: number) => Math.floor(time / 100) * 60 + time % 100;
const areaTravel: Record<string, number> = { "Archery Range:Handicraft": 15, "Archery Range:Nature Lodge": 15, "Trailhead:Handicraft": 15, "Trailhead:Nature Lodge": 15 };
function travelMinutes(a: string, b: string) { if (a === b) return 0; return areaTravel[`${a}:${b}`] ?? areaTravel[`${b}:${a}`] ?? 10; }

function warningsFor(selections: string[]): Warning[] {
  const resolved = selections.map(findOfferingSlot).filter(Boolean) as NonNullable<ReturnType<typeof findOfferingSlot>>[];
  const warnings: Warning[] = [];
  for (let index = 0; index < resolved.length; index += 1) for (let next = index + 1; next < resolved.length; next += 1) {
    const a = resolved[index], b = resolved[next];
    if (a.offering.id === b.offering.id) warnings.push({ level: "error", message: `${a.offering.title} is selected more than once.`, slotIds: [a.slot.id, b.slot.id] });
    const aStart = toMinutes(a.slot.start), aEnd = toMinutes(a.slot.end), bStart = toMinutes(b.slot.start), bEnd = toMinutes(b.slot.end);
    if (aStart < bEnd && bStart < aEnd) warnings.push({ level: "error", message: `${a.offering.title} and ${b.offering.title} overlap exactly.`, slotIds: [a.slot.id, b.slot.id], alternative: alternativeFor(a.offering.id, selections) });
    else {
      const first = aStart < bStart ? a : b, second = aStart < bStart ? b : a;
      const available = toMinutes(second.slot.start) - toMinutes(first.slot.end), required = travelMinutes(first.slot.location, second.slot.location);
      if (available < required) warnings.push({ level: "warning", message: `${first.offering.title} to ${second.offering.title} allows ${available} minutes; plan ${required} minutes between locations.`, slotIds: [first.slot.id, second.slot.id], alternative: alternativeFor(second.offering.id, selections) });
    }
  }
  return warnings;
}

function alternativeFor(offeringId: string, selections: string[]) {
  const offering = programOfferings.find((item) => item.id === offeringId);
  const sameBadge = offering?.slots.find((slot) => !selections.includes(slot.id) && warningsForWithoutAlternatives([...selections.filter((id) => findOfferingSlot(id)?.offering.id !== offeringId), slot.id]).length === 0);
  if (sameBadge) return `${offering!.title} at ${sameBadge.label}`;
  const sameArea = programOfferings.find((item) => item.area === offering?.area && item.id !== offeringId && item.slots.some((slot) => warningsForWithoutAlternatives([...selections, slot.id]).length === 0));
  return sameArea ? `${sameArea.title}, a conflict-free ${sameArea.area} alternative` : undefined;
}
function warningsForWithoutAlternatives(selections: string[]) {
  const resolved = selections.map(findOfferingSlot).filter(Boolean) as NonNullable<ReturnType<typeof findOfferingSlot>>[];
  return resolved.flatMap((a, index) => resolved.slice(index + 1).filter((b) => toMinutes(a.slot.start) < toMinutes(b.slot.end) && toMinutes(b.slot.start) < toMinutes(a.slot.end)));
}

export default function PlannerClient({ requestedSlot }: { requestedSlot?: string }) {
  const [state, setState] = useState<PlannerState>(initial);
  const [activeId, setActiveId] = useState("scout-1");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => { try { const saved = localStorage.getItem("camp-lawton-plan"); if (saved) setState(JSON.parse(saved)); } finally { setLoaded(true); } }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (loaded) localStorage.setItem("camp-lawton-plan", JSON.stringify(state)); }, [loaded, state]);
  useEffect(() => { if (!loaded || !requestedSlot || !findOfferingSlot(requestedSlot)) return; const timer = window.setTimeout(() => setState((current) => ({ ...current, scouts: current.scouts.map((scout) => scout.id === activeId && !scout.selections.includes(requestedSlot) ? { ...scout, selections: [...scout.selections, requestedSlot] } : scout) })), 0); return () => window.clearTimeout(timer); }, [activeId, loaded, requestedSlot]);
  const active = state.scouts.find((scout) => scout.id === activeId) ?? state.scouts[0];
  const warnings = warningsFor(active?.selections ?? []);
  const addScout = () => { const id = crypto.randomUUID(); setState((current) => ({ ...current, scouts: [...current.scouts, { id, name: `Scout ${current.scouts.length + 1}`, selections: [] }] })); setActiveId(id); };
  const toggle = (slotId: string) => setState((current) => ({ ...current, scouts: current.scouts.map((scout) => scout.id === active.id ? { ...scout, selections: scout.selections.includes(slotId) ? scout.selections.filter((id) => id !== slotId) : [...scout.selections, slotId] } : scout) }));
  const resolved = (active?.selections ?? []).map(findOfferingSlot).filter(Boolean) as NonNullable<ReturnType<typeof findOfferingSlot>>[];

  return <div className="planner-app">
    <aside className="planner-sidebar"><label><span>Unit</span><input value={state.unit} onChange={(event) => setState({ ...state, unit: event.target.value })} placeholder="Troop 123" /></label><label><span>Session</span><select value={state.session} onChange={(event) => setState({ ...state, session: event.target.value })}><option value="bsa-week-1">BSA Week 1</option><option value="bsa-week-2">BSA Week 2</option><option value="bsa-week-3">BSA Week 3</option></select></label><div className="scout-list"><header><strong>Scouts</strong><button type="button" onClick={addScout} aria-label="Add Scout">+</button></header>{state.scouts.map((scout) => <button key={scout.id} aria-pressed={scout.id === active.id} onClick={() => setActiveId(scout.id)}>{scout.name}<small>{scout.selections.length} classes</small></button>)}</div></aside>
    <section className="planner-work"><header><div><input aria-label="Scout display name" value={active.name} onChange={(event) => setState((current) => ({ ...current, scouts: current.scouts.map((scout) => scout.id === active.id ? { ...scout, name: event.target.value } : scout) }))} /><p>Names stay in this browser until you explicitly include them in a submission.</p></div><button className="button button-secondary" onClick={() => window.print()}>Print plan</button></header>
      {warnings.length > 0 && <div className="planner-warnings">{warnings.map((warning, index) => <article className={warning.level} key={`${warning.message}-${index}`}><strong>{warning.level === "error" ? "Conflict" : "Transition warning"}</strong><p>{warning.message}</p>{warning.alternative && <span>Suggested: {warning.alternative}</span>}</article>)}</div>}
      <div className="personal-agenda">{resolved.sort((a, b) => a.slot.start - b.slot.start).map(({ offering, slot }) => <article key={slot.id} className={warnings.some((warning) => warning.slotIds.includes(slot.id)) ? "has-warning" : ""}><time>{slot.label}</time><div><span>{offering.area}</span><h3>{offering.title}</h3><p>{slot.location} · {offering.prerequisites}</p></div><button onClick={() => toggle(slot.id)} aria-label={`Remove ${offering.title}`}>×</button></article>)}{resolved.length === 0 && <div className="planner-empty"><h2>No classes selected</h2><p>Add a class from the catalog below. Conflicts and transition warnings appear automatically.</p></div>}</div>
      <section className="quick-catalog"><h2>Add a class</h2>{programOfferings.map((offering) => <details key={offering.id}><summary><span>{offering.area}</span><strong>{offering.title}</strong></summary><div>{offering.slots.map((slot) => <button key={slot.id} disabled={active.selections.includes(slot.id)} onClick={() => toggle(slot.id)}><span>{slot.label}</span><small>{slot.location}</small><strong>{active.selections.includes(slot.id) ? "Added" : "Add"}</strong></button>)}</div></details>)}</section>
    </section>
  </div>;
}
