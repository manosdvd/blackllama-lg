"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  campMapLocations,
  mapCategoryLabels,
  type CampMapLocation,
  type MapCategory,
} from "../lib/camp-map";
import MarkdownContent from "./MarkdownContent";

type CategoryFilter = "all" | MapCategory;
type MobileView = "map" | "list";

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All places" },
  { value: "campsite", label: "Campsites" },
  { value: "program", label: "Programs" },
  { value: "amenity", label: "Facilities" },
];

const clampZoom = (value: number) => Math.min(2.2, Math.max(1, value));

const locationMatches = (location: CampMapLocation, category: CategoryFilter, query: string) => {
  const normalized = query.trim().toLowerCase();
  const categoryMatch = category === "all" || location.category === category;
  const queryMatch = !normalized || `${location.title} ${location.description} ${location.nearby} ${mapCategoryLabels[location.category]}`.toLowerCase().includes(normalized);
  return categoryMatch && queryMatch;
};

function CategorySymbol({ category }: { category: MapCategory }) {
  if (category === "campsite") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 19 9-14 9 14M7.5 19 12 12l4.5 7M12 5v14" /></svg>;
  }
  if (category === "program") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7" /><path d="m12 2 1.8 6.2L22 12l-8.2 3.8L12 22l-1.8-6.2L2 12l8.2-3.8L12 2Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>;
}

function CompassArtwork({ category }: { category: MapCategory }) {
  return <div className={`map-detail-placeholder category-${category}`} aria-hidden="true">
    <svg viewBox="0 0 320 250">
      <path className="placeholder-contour" d="M-20 178c47-44 83-56 129-36s75 9 112-24 77-30 119 8" />
      <path className="placeholder-contour" d="M-17 205c54-45 101-52 142-29s76 18 112-12 66-34 105-7" />
      <circle cx="160" cy="116" r="64" />
      <path d="m160 67 16 36 37 14-37 14-16 37-15-37-38-14 38-14 15-36Z" />
      <circle cx="160" cy="117" r="7" />
    </svg>
    <span><CategorySymbol category={category} /></span>
  </div>;
}

export default function InteractiveCampMap() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>("nature");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("map");
  const stageRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const detailWindowRef = useRef<HTMLElement>(null);
  const detailTitleRef = useRef<HTMLHeadingElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; panX: number; panY: number } | null>(null);

  const filteredLocations = useMemo(() => {
    return campMapLocations.filter((location) => locationMatches(location, category, query));
  }, [category, query]);

  const selected = selectedId ? campMapLocations.find((location) => location.id === selectedId) ?? null : null;
  const navigationLocations = selected && filteredLocations.some((location) => location.id === selected.id)
    ? filteredLocations
    : campMapLocations;
  const selectedIndex = selected ? navigationLocations.findIndex((location) => location.id === selected.id) : -1;

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && selectedId) {
        setSelectedId(null);
        window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    const currentSelection = selectedId ? campMapLocations.find((location) => location.id === selectedId) : null;
    if (currentSelection && !locationMatches(currentSelection, category, nextQuery)) setSelectedId(null);
  };

  const updateCategory = (nextCategory: CategoryFilter) => {
    setCategory(nextCategory);
    const currentSelection = selectedId ? campMapLocations.find((location) => location.id === selectedId) : null;
    if (currentSelection && !locationMatches(currentSelection, nextCategory, query)) setSelectedId(null);
  };

  const changeZoom = (change: number) => {
    const next = clampZoom(zoom + change);
    setZoom(next);
    if (next === 1) setPan({ x: 0, y: 0 });
    else setPan((currentPan) => ({ x: currentPan.x * (next / zoom), y: currentPan.y * (next / zoom) }));
  };

  const resetMap = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const centerOnLocation = (location: CampMapLocation, requestedZoom = 1.35) => {
    const stage = stageRef.current;
    if (!stage) return;
    const renderedArtboard = artboardRef.current;
    const artboardWidth = renderedArtboard?.offsetWidth || Math.min(stage.clientWidth * .86, 610);
    const artboardHeight = renderedArtboard?.offsetHeight || artboardWidth * (1052.16 / 798.08);
    const nextZoom = clampZoom(Math.max(zoom, requestedZoom));
    setZoom(nextZoom);
    setPan({
      x: ((50 - location.x) / 100) * artboardWidth * nextZoom,
      y: ((50 - location.y) / 100) * artboardHeight * nextZoom,
    });
  };

  const openLocation = (location: CampMapLocation, trigger: HTMLElement, shouldCenter = false) => {
    lastTriggerRef.current = trigger;
    setSelectedId(location.id);
    if (shouldCenter && window.matchMedia("(max-width: 760px)").matches) setMobileView("map");
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (shouldCenter) centerOnLocation(location);
      detailTitleRef.current?.focus();
      if (window.matchMedia("(max-width: 1300px)").matches) {
        detailWindowRef.current?.scrollIntoView({ block: "center" });
      }
    }));
  };

  const closeDetail = () => {
    setSelectedId(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  };

  const showLocationOnMap = (location: CampMapLocation) => {
    setMobileView("map");
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      centerOnLocation(location);
      stageRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      stageRef.current?.focus({ preventScroll: true });
    }));
  };

  const navigateDetail = (direction: -1 | 1) => {
    if (!navigationLocations.length || selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + navigationLocations.length) % navigationLocations.length;
    const nextLocation = navigationLocations[nextIndex];
    setSelectedId(nextLocation.id);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      centerOnLocation(nextLocation);
      detailTitleRef.current?.focus();
    }));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { pointerX: event.clientX, pointerY: event.clientY, panX: pan.x, panY: pan.y };
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start) return;
    setPan({
      x: start.panX + event.clientX - start.pointerX,
      y: start.panY + event.clientY - start.pointerY,
    });
  };

  const finishDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStartRef.current = null;
    setDragging(false);
  };

  const handleStageKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const panStep = 35;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      changeZoom(.2);
    } else if (event.key === "-") {
      event.preventDefault();
      changeZoom(-.2);
    } else if (event.key === "0") {
      event.preventDefault();
      resetMap();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPan((current) => ({ ...current, x: current.x + panStep }));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPan((current) => ({ ...current, x: current.x - panStep }));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setPan((current) => ({ ...current, y: current.y + panStep }));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setPan((current) => ({ ...current, y: current.y - panStep }));
    }
  };

  return <section className="map-explorer" aria-labelledby="map-explorer-title">
    <div className="map-explorer-heading">
      <div>
        <p className="section-kicker">Explore by place</p>
        <h2 id="map-explorer-title">Find your way around camp.</h2>
      </div>
      <p>Select a marker or browse the location index. Drag to move the map, then use the controls to zoom or return to the full view.</p>
    </div>

    <div className="map-toolbar">
      <div className="map-search">
        <label className="sr-only" htmlFor="camp-map-search">Search camp locations</label>
        <SearchIcon />
        <input id="camp-map-search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search campsites, programs, facilities…" />
        {query && <button type="button" onClick={() => updateQuery("")} aria-label="Clear location search">×</button>}
      </div>
      <div className="map-filter-chips" role="group" aria-label="Filter locations by type">
        {categoryFilters.map((filter) => <button
          type="button"
          key={filter.value}
          aria-pressed={category === filter.value}
          onClick={() => updateCategory(filter.value)}
        >{filter.label}</button>)}
      </div>
      <div className="map-mobile-view" role="group" aria-label="Choose map or list view">
        <button type="button" aria-pressed={mobileView === "map"} onClick={() => setMobileView("map")}>Map</button>
        <button type="button" aria-pressed={mobileView === "list"} onClick={() => setMobileView("list")}>List</button>
      </div>
    </div>

    <div className="map-workspace">
      <aside className={`map-location-index view-${mobileView}`} aria-label="Camp location index">
        <header>
          <div><strong>{filteredLocations.length}</strong><span>{filteredLocations.length === 1 ? "place" : "places"}</span></div>
          <small>North to south</small>
        </header>
        <div className="map-location-list">
          {filteredLocations.map((location) => <button
            type="button"
            key={location.id}
            className={`map-location-row category-${location.category}`}
            aria-pressed={selected?.id === location.id}
            aria-controls="map-location-detail"
            aria-expanded={selected?.id === location.id}
            onClick={(event) => openLocation(location, event.currentTarget, true)}
          >
            <span className="map-location-symbol"><CategorySymbol category={location.category} /></span>
            <span><strong>{location.title}</strong><small>{mapCategoryLabels[location.category]}</small></span>
            <i aria-hidden="true">→</i>
          </button>)}
          {!filteredLocations.length && <div className="map-no-results">
            <span>0</span>
            <strong>No places found</strong>
            <p>Try a broader search or show every category.</p>
            <button type="button" onClick={() => { updateQuery(""); updateCategory("all"); }}>Clear filters</button>
          </div>}
        </div>
      </aside>

      <div
        ref={stageRef}
        className={`map-stage view-${mobileView}${dragging ? " is-dragging" : ""}`}
        aria-label="Interactive Camp Lawton map. Use arrow keys to pan, plus and minus to zoom, or tab to a location marker."
        tabIndex={0}
        onKeyDown={handleStageKeyboard}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
      >
        <div className="map-stage-topline">
          <span><i /> Interactive map</span>
          <span>Updated July 2026</span>
        </div>
        <div className="map-north" aria-hidden="true"><span>N</span><svg viewBox="0 0 28 36"><path d="M14 2 25 31 14 25 3 31 14 2Z" /></svg></div>
        <div
          ref={artboardRef}
          className="map-artboard"
          style={{ transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})` }}
        >
          <div className="map-artwork" aria-hidden="true">
            <img src="/map/Camp-Lawton-Map.png" width={2400} height={3164} alt="" draggable={false} />
          </div>
          {filteredLocations.flatMap((location) => (location.points ?? [{ x: location.x, y: location.y }]).map((point, pointIndex) => (
            <button
              type="button"
              key={`${location.id}-${pointIndex}`}
              className={`map-pin category-${location.category}${selected?.id === location.id ? " is-selected" : ""}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              aria-label={`Open ${point.label ?? location.title}`}
              aria-pressed={selected?.id === location.id}
              aria-controls="map-location-detail"
              aria-expanded={selected?.id === location.id}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => openLocation(location, event.currentTarget)}
            >
              <span className="map-pin-target"><i /></span>
              <span className="map-pin-label">{point.label ?? location.title}</span>
            </button>
          )))}
        </div>
        {!filteredLocations.length && <div className="map-stage-empty"><SearchIcon /><strong>No matching markers</strong><span>Change the search or filter to bring locations back.</span></div>}
        <div className="map-stage-controls" aria-label="Map zoom controls">
          <button type="button" onClick={() => changeZoom(.2)} disabled={zoom >= 2.2} aria-label="Zoom in">+</button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => changeZoom(-.2)} disabled={zoom <= 1} aria-label="Zoom out">−</button>
          <button type="button" className="map-reset" onClick={resetMap} disabled={zoom === 1 && pan.x === 0 && pan.y === 0} aria-label="Reset map view">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M4.8 4.8A9 9 0 1 1 3.6 15" /></svg>
          </button>
        </div>
        <div className="map-legend" aria-hidden="true">
          <span className="category-campsite"><i /> Campsite</span>
          <span className="category-program"><i /> Program</span>
          <span className="category-amenity"><i /> Facility</span>
        </div>
      </div>

      <aside ref={detailWindowRef} id="map-location-detail" className={`map-detail-window${selected ? " is-open" : " is-empty"}`} aria-live="polite" aria-label="Selected location details">
        {selected ? <>
          <button type="button" className="map-detail-close" onClick={closeDetail} aria-label={`Close details for ${selected.title}`}>×</button>
          <figure key={selected.id} className={selected.image ? "has-art" : "has-placeholder"}>
            {selected.image
              ? <img src={selected.image} alt={selected.imageAlt ?? ""} />
              : <CompassArtwork category={selected.category} />}
            {selected.gallery?.map((item) => <img className="map-detail-secondary-art" key={item.src} src={item.src} alt={item.alt} />)}
            <figcaption><span>{mapCategoryLabels[selected.category]}</span><small>Location {String(campMapLocations.indexOf(selected) + 1).padStart(2, "0")}</small></figcaption>
          </figure>
          <div className="map-detail-copy">
            <div className={`map-detail-category category-${selected.category}`}><CategorySymbol category={selected.category} /><span>{mapCategoryLabels[selected.category]}</span></div>
            <h3 ref={detailTitleRef} tabIndex={-1}>{selected.title}</h3>
            <div className="map-detail-description"><MarkdownContent source={selected.description} /></div>
            {(selected.capacity != null || selected.access) && <div className="map-detail-quick-stats">
              {selected.capacity != null && selected.capacity > 0 && <div className="map-stat-badge"><strong>Capacity</strong><span>{selected.capacity} campers</span></div>}
              {selected.access && <div className="map-stat-badge"><strong>Access</strong><span>{selected.access}</span></div>}
            </div>}
            {selected.meritBadges?.length ? <div className="map-detail-badges-list">
              <h4>Potential program subjects</h4>
              <div className="map-badge-chips">{selected.meritBadges.map((badge) => <span className="map-badge-chip" key={badge}>{badge}</span>)}</div>
            </div> : null}
            <dl>
              <div><dt>Orientation</dt><dd>{selected.nearby}</dd></div>
            </dl>
            {selected.practical && <div className="map-practical-note"><span aria-hidden="true">i</span><p>{selected.practical}</p></div>}
          </div>
          <div className="map-detail-actions">
            <button type="button" onClick={() => navigateDetail(-1)} aria-label="Previous location"><span aria-hidden="true">←</span> Previous</button>
            <button type="button" className="map-show-place" onClick={() => showLocationOnMap(selected)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 2V0M12 24v-2M2 12H0M24 12h-2" /></svg>
              Center
            </button>
            <button type="button" onClick={() => navigateDetail(1)} aria-label="Next location">Next <span aria-hidden="true">→</span></button>
          </div>
        </> : <div className="map-detail-empty-state">
          <CompassArtwork category="program" />
          <p className="section-kicker">Location window</p>
          <h3>Choose a place on the map.</h3>
          <p>Select any marker or location name to see artwork, orientation details, and planning notes.</p>
          <button type="button" onClick={() => setSelectedId("nature")}>Open a featured place</button>
        </div>}
      </aside>
    </div>

    <p className="map-source-note"><span>Map note</span> Locations are approximate and intended for trip planning. On-site signs and current staff direction always take precedence.</p>
    <span className="sr-only" aria-live="polite">{selected ? `${selected.title} details opened.` : "Location details closed."}</span>
  </section>;
}
