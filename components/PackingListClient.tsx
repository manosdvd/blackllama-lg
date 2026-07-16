"use client";

import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import MarkdownContent from "./MarkdownContent";
import { parsePackingList, type PackingItem, type PackingOwner, type PackingSection } from "../lib/packing-list";

const STORAGE_KEY = "camp-lawton-packing-list:v1";
const STORAGE_VERSION = 1;

type OwnerFilter = "all" | PackingOwner;
type StatusFilter = "all" | "to-pack" | "packed";
type PersonalExtra = { id: string; label: string };
type StoredPackingState = { version: 1; checkedIds: string[]; extras: PersonalExtra[] };

function restoreState(value: unknown, baseIds: ReadonlySet<string>): Omit<StoredPackingState, "version"> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { checkedIds: [], extras: [] };
  const source = value as Record<string, unknown>;
  if (source.version !== STORAGE_VERSION) return { checkedIds: [], extras: [] };

  const extras: PersonalExtra[] = [];
  if (Array.isArray(source.extras)) {
    for (const candidate of source.extras.slice(0, 50)) {
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) continue;
      const extra = candidate as Record<string, unknown>;
      const id = typeof extra.id === "string" && /^personal:[a-z0-9-]{1,100}$/i.test(extra.id) ? extra.id : "";
      const label = typeof extra.label === "string" ? extra.label.trim().replace(/\s+/g, " ").slice(0, 120) : "";
      if (id && label && !extras.some((item) => item.id === id)) extras.push({ id, label });
    }
  }

  const validIds = new Set([...baseIds, ...extras.map((extra) => extra.id)]);
  const checkedIds = Array.isArray(source.checkedIds)
    ? [...new Set(source.checkedIds.filter((id): id is string => typeof id === "string" && validIds.has(id)))]
    : [];
  return { checkedIds, extras };
}

function checkboxId(itemId: string): string {
  return `packing-item-${itemId.replace(/[^a-z0-9_-]/gi, "-")}`;
}

function sectionMark(section: PackingSection): string {
  if (section.owner === "unit") return "U";
  return section.kind === "optional" ? "+" : "P";
}

export default function PackingListClient({ source }: { source: string }) {
  const parsed = useMemo(() => parsePackingList(source), [source]);
  const checklistSections = useMemo(() => parsed.sections.filter((section) => section.kind !== "warning"), [parsed.sections]);
  const warningSections = useMemo(() => parsed.sections.filter((section) => section.kind === "warning"), [parsed.sections]);
  const baseItems = useMemo(() => checklistSections.flatMap((section) => section.items), [checklistSections]);
  const baseIds = useMemo(() => new Set(baseItems.map((item) => item.id)), [baseItems]);
  const hasChecklist = baseItems.length > 0;

  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [extras, setExtras] = useState<PersonalExtra[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [extraLabel, setExtraLabel] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const extraInputId = useId();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const restored = restoreState(JSON.parse(saved), baseIds);
          setCheckedIds(restored.checkedIds);
          setExtras(restored.extras);
        }
      } catch {
        // Storage can be disabled or contain an older/malformed draft.
      } finally {
        setLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [baseIds]);

  useEffect(() => {
    if (!loaded) return;
    try {
      const state: StoredPackingState = { version: STORAGE_VERSION, checkedIds, extras };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The checklist remains usable when private browsing blocks persistence.
    }
  }, [checkedIds, extras, loaded]);

  const checked = useMemo(() => new Set(checkedIds), [checkedIds]);
  const coreItems = useMemo(() => checklistSections.filter((section) => section.kind === "core").flatMap((section) => section.items), [checklistSections]);
  const corePacked = coreItems.filter((item) => checked.has(item.id)).length;
  const progressPercent = coreItems.length ? Math.round((corePacked / coreItems.length) * 100) : 0;
  const normalizedQuery = query.trim().toLowerCase();

  const matchesFilters = (item: PackingItem, section: Pick<PackingSection, "title" | "owner">) => {
    if (ownerFilter !== "all" && section.owner !== ownerFilter) return false;
    if (statusFilter === "packed" && !checked.has(item.id)) return false;
    if (statusFilter === "to-pack" && checked.has(item.id)) return false;
    return !normalizedQuery || `${section.title} ${item.label}`.toLowerCase().includes(normalizedQuery);
  };

  const personalSection = { title: "Personal extras", owner: "participant" as const };
  const visibleCount = checklistSections.reduce((count, section) => count + section.items.filter((item) => matchesFilters(item, section)).length, 0)
    + extras.filter((item) => matchesFilters(item, personalSection)).length;
  const totalPackable = baseItems.length + extras.length;

  const toggle = (id: string) => setCheckedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);

  const addExtra = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = extraLabel.trim().replace(/\s+/g, " ").slice(0, 120);
    if (!label) return;
    const randomId = window.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    setExtras((current) => [...current, { id: `personal:${randomId}`, label }]);
    setExtraLabel("");
    setAnnouncement(`${label} added to personal extras.`);
  };

  const removeExtra = (extra: PersonalExtra) => {
    setExtras((current) => current.filter((item) => item.id !== extra.id));
    setCheckedIds((current) => current.filter((id) => id !== extra.id));
    setAnnouncement(`${extra.label} removed.`);
  };

  const reset = () => {
    if (!checkedIds.length && !extras.length) return;
    if (!window.confirm("Clear every checkmark and delete your personal extras? This cannot be undone.")) return;
    setCheckedIds([]);
    setExtras([]);
    setAnnouncement("Packing checklist cleared.");
  };

  if (!hasChecklist) {
    return <div className="packing-fallback">
      <p className="packing-fallback-note">The current guide is shown below. Interactive controls will return when checklist headings are available.</p>
      <MarkdownContent source={source} />
    </div>;
  }

  return <section className="packing-app" aria-labelledby="packing-title" aria-busy={!loaded}>
    {parsed.introSource && <div className="packing-intro"><MarkdownContent source={parsed.introSource} /></div>}

    <header className="packing-header">
      <div>
        <span className="packing-eyebrow">Your mountain-camp checklist</span>
        <h2 id="packing-title">Pack with confidence</h2>
        <p>This tool follows the current working Leader&apos;s Guide. Recheck it before departure; final camp instructions and current rules control.</p>
      </div>
      <div className="packing-actions">
        <button type="button" className="button button-secondary packing-print" onClick={() => window.print()}>Print checklist</button>
        <button type="button" className="packing-reset" onClick={reset} disabled={!loaded || (!checkedIds.length && !extras.length)}>Clear progress</button>
      </div>
    </header>

    <div className="packing-progress-card">
      <div>
        <p id="packing-progress-label" className="packing-progress-copy" aria-live="polite"><strong>{corePacked} of {coreItems.length}</strong> core items packed</p>
        <span>Optional gear and personal extras do not affect this total.</span>
      </div>
      <strong className="packing-progress-percent" aria-hidden="true">{progressPercent}%</strong>
      <progress aria-labelledby="packing-progress-label" value={corePacked} max={coreItems.length || 1}>{progressPercent}%</progress>
    </div>

    <div className="packing-tools" aria-label="Checklist tools">
      <label className="packing-search">
        <span>Search the list</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try rain gear, forms, or flashlight" />
      </label>
      <label>
        <span>Packing for</span>
        <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value as OwnerFilter)}>
          <option value="all">Everyone</option>
          <option value="participant">Participant</option>
          <option value="unit">Unit &amp; leaders</option>
        </select>
      </label>
      <label>
        <span>Show</span>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
          <option value="all">All items</option>
          <option value="to-pack">Still to pack</option>
          <option value="packed">Packed</option>
        </select>
      </label>
    </div>
    <p className="packing-results" aria-live="polite">Showing {visibleCount} of {totalPackable} packable items</p>

    <div className="packing-sections">
      {checklistSections.map((section) => {
        const sectionVisible = section.items.some((item) => matchesFilters(item, section));
        return <article className={`packing-section packing-section-${section.kind}`} key={section.id} hidden={!sectionVisible}>
          <header>
            <span className="packing-section-mark" aria-hidden="true">{sectionMark(section)}</span>
            <div><span>{section.owner === "unit" ? "Unit & leaders" : section.kind === "optional" ? "Optional" : "Participant"}</span><h3>{section.title}</h3></div>
          </header>
          {section.noteSource && <div className="packing-section-note"><MarkdownContent source={section.noteSource} /></div>}
          <ul className="packing-items">
            {section.items.map((item) => <li className={checked.has(item.id) ? "packing-item packing-item-packed" : "packing-item"} key={item.id} hidden={!matchesFilters(item, section)}>
              <input id={checkboxId(item.id)} type="checkbox" checked={checked.has(item.id)} disabled={!loaded} onChange={() => toggle(item.id)} />
              <label htmlFor={checkboxId(item.id)}><span aria-hidden="true" className="packing-checkmark" /><span>{item.label}</span></label>
            </li>)}
          </ul>
        </article>;
      })}

      <article className="packing-section packing-section-optional packing-personal" hidden={ownerFilter === "unit" || (extras.length > 0 && !extras.some((item) => matchesFilters(item, personalSection)))}>
        <header><span className="packing-section-mark" aria-hidden="true">+</span><div><span>Optional</span><h3>Personal extras</h3></div></header>
        <form className="packing-extra-form" onSubmit={addExtra}>
          <label htmlFor={extraInputId}>Add something your unit or family recommends</label>
          <div><input id={extraInputId} value={extraLabel} onChange={(event) => setExtraLabel(event.target.value)} maxLength={120} placeholder="Example: favorite camp mug" /><button type="submit" disabled={!extraLabel.trim()}>Add item</button></div>
        </form>
        {extras.length > 0 && <ul className="packing-items packing-extra-items">
          {extras.map((item) => <li className={checked.has(item.id) ? "packing-item packing-item-packed" : "packing-item"} key={item.id} hidden={!matchesFilters(item, personalSection)}>
            <input id={checkboxId(item.id)} type="checkbox" checked={checked.has(item.id)} disabled={!loaded} onChange={() => toggle(item.id)} />
            <label htmlFor={checkboxId(item.id)}><span aria-hidden="true" className="packing-checkmark" /><span>{item.label}</span></label>
            <button type="button" className="packing-extra-remove" onClick={() => removeExtra(item)} aria-label={`Remove ${item.label}`}>Remove</button>
          </li>)}
        </ul>}
      </article>

      <div className="packing-empty" hidden={visibleCount > 0}><h3>No items match</h3><p>Try another search or reset the checklist filters.</p></div>
    </div>

    {warningSections.map((section) => <aside className="packing-warnings" key={section.id} aria-labelledby={`${section.id}-heading`}>
      <header><span aria-hidden="true">!</span><div><span>Keep camp safe</span><h2 id={`${section.id}-heading`}>{section.title}</h2></div></header>
      {section.noteSource && <MarkdownContent source={section.noteSource} />}
      <ul>{section.items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
    </aside>)}

    {parsed.supplementalSource && <div className="packing-supplemental"><MarkdownContent source={parsed.supplementalSource} /></div>}
    <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
  </section>;
}
