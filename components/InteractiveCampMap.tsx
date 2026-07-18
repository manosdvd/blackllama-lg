"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from "framer-motion";
import { campMapLocations, mapCategoryLabels } from "../lib/camp-map";
import { polygons } from "../lib/polygons";

export default function InteractiveCampMap() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLabelless, setShowLabelless] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredLocations = useMemo(() => {
    return campMapLocations.filter(loc => {
      const matchCat = category === "all" || loc.category === category;
      const matchQuery = !query || loc.title.toLowerCase().includes(query.toLowerCase()) || loc.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, category]);

  if (!isClient) return <div className="min-h-screen bg-[var(--pine-950)] flex items-center justify-center text-[var(--cream)]">Loading Map...</div>;

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.3}
      maxScale={5}
      centerOnInit
      wheel={{ step: 0.1 }}
      doubleClick={{ disabled: true }}
      limitToBounds={false}
      panning={{ velocityDisabled: false }}
    >
      {({ zoomIn, zoomOut, resetTransform, zoomToElement }) => (
        <div className="relative w-full h-[calc(100vh-64px)] bg-[#091510] overflow-hidden font-sans text-slate-100 flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <div className="w-full md:w-96 shrink-0 bg-[var(--paper)]/95 backdrop-blur-xl border-r border-[var(--line)] flex flex-col shadow-2xl z-20 transition-all duration-300 text-[var(--ink)]">
            <div className="p-6 border-b border-[var(--line)] bg-[var(--cream)]/60">
              <h2 className="text-2xl font-bold text-[var(--pine-950)] font-serif">Camp Lawton</h2>
              <p className="text-[var(--muted)] text-sm mt-1">Interactive Map Explorer</p>
              
              <div className="mt-4 space-y-3">
                <input 
                  type="text" 
                  placeholder="Search locations..."
                  className="w-full px-4 py-2 bg-white border border-[var(--line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rust)]/50 text-[var(--ink)] placeholder-[var(--muted)] transition-all"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <div className="flex gap-2 text-xs font-medium flex-wrap">
                  {["all", "campsite", "program", "amenity"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full transition-colors border ${category === cat ? "bg-[var(--rust)] border-[var(--rust)] text-white shadow-lg shadow-[var(--rust)]/20" : "bg-white border-[var(--line)] text-[var(--muted)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"}`}
                    >
                      {cat === "all" ? "All" : mapCategoryLabels[cat as keyof typeof mapCategoryLabels]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              <AnimatePresence>
                {filteredLocations.map(loc => (
                  <motion.button
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={loc.id}
                    onClick={() => {
                      if (selectedId === loc.id) {
                        setSelectedId(null);
                        resetTransform(500, "easeOut");
                      } else {
                        setSelectedId(loc.id);
                        zoomToElement(`pin-${loc.id}-0`, 2, 800, "easeOut");
                      }
                    }}
                    onMouseEnter={() => setHoveredId(loc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 border ${selectedId === loc.id ? "bg-[var(--rust)]/5 border-[var(--rust)]/30 shadow-sm shadow-[var(--rust)]/5" : "bg-transparent border-transparent hover:bg-black/5 hover:border-[var(--line)]"}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className={`font-semibold ${selectedId === loc.id ? "text-[var(--rust)]" : "text-[var(--ink)]"}`}>{loc.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] bg-[var(--cream)] border border-[var(--line)] px-2 py-0.5 rounded-full">{loc.category}</span>
                    </div>
                    
                    <AnimatePresence>
                      {selectedId === loc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-[var(--line)] text-left">
                            {loc.image && (
                              <div className="mb-4 rounded-xl overflow-hidden border border-[var(--line)] shadow-sm">
                                <img src={loc.image} alt={loc.imageAlt || loc.title} className="w-full h-auto object-cover" />
                              </div>
                            )}
                            <p className="text-sm text-[var(--muted)] leading-relaxed font-serif">{loc.description}</p>
                            
                            {(loc.capacity !== undefined || loc.access) && (
                              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                {loc.capacity !== undefined && loc.capacity > 0 && (
                                  <div className="bg-[var(--cream)]/50 rounded-lg p-2 border border-[var(--line)]">
                                    <strong className="block text-[var(--muted)] uppercase tracking-wider text-[10px]">Capacity</strong>
                                    <span className="text-[var(--ink)] font-medium">{loc.capacity} campers</span>
                                  </div>
                                )}
                                {loc.access && (
                                  <div className="bg-[var(--cream)]/50 rounded-lg p-2 border border-[var(--line)]">
                                    <strong className="block text-[var(--muted)] uppercase tracking-wider text-[10px]">Access</strong>
                                    <span className="text-[var(--ink)] font-medium">{loc.access}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {loc.meritBadges && loc.meritBadges.length > 0 && (
                              <div className="mt-4">
                                <strong className="block text-[var(--muted)] uppercase tracking-wider text-[10px] mb-2">Merit Badges</strong>
                                <div className="flex flex-wrap gap-1.5">
                                  {loc.meritBadges.map(badge => (
                                    <span key={badge} className="bg-[var(--gold)]/10 text-[var(--pine-900)] border border-[var(--gold)]/30 px-2 py-0.5 rounded text-[11px] font-medium">
                                      {badge}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {loc.nearby && <p className="text-xs text-[var(--muted)] mt-4 bg-[var(--cream)]/80 p-2.5 rounded-lg border border-[var(--line)]"><span className="font-medium text-[var(--pine-950)] uppercase tracking-wider text-[10px] mr-2">Nearby</span> <span className="font-serif">{loc.nearby}</span></p>}
                            {loc.practical && <p className="text-xs text-[var(--rust)] mt-2 bg-[var(--rust)]/5 p-2.5 rounded-lg border border-[var(--rust)]/20"><span className="font-medium uppercase tracking-wider text-[10px] mr-2">Note</span> <span className="font-serif">{loc.practical}</span></p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
                {filteredLocations.length === 0 && (
                  <div className="text-center p-8 text-[var(--muted)]">No locations found.</div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative cursor-move">
            {/* Top controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button 
                onClick={() => setShowLabelless(!showLabelless)}
                className="px-4 py-2 bg-[var(--pine-900)]/90 backdrop-blur-md border border-[var(--pine-700)] rounded-lg text-sm font-medium text-[var(--cream)] hover:bg-[var(--pine-800)] transition-colors shadow-xl"
              >
                {showLabelless ? "Show Labels" : "Hide Labels"}
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-[var(--pine-900)]/90 backdrop-blur-md p-1.5 rounded-xl border border-[var(--pine-700)] shadow-2xl text-[var(--cream)]">
              <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--pine-800)] text-xl transition-colors">+</button>
              <div className="h-px bg-[var(--pine-800)] mx-2" />
              <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--pine-800)] text-xl transition-colors">−</button>
              <div className="h-px bg-[var(--pine-800)] mx-2" />
              <button onClick={() => resetTransform()} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--pine-800)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            </div>

            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
              {/* Added a responsive container that matches the aspect ratio perfectly and shrinks to fit the height of the screen initially */}
              <div className="relative mx-auto my-auto max-w-full max-h-full" style={{ height: 'calc(100vh - 64px)', aspectRatio: '2400/3164' }}>
                {/* Base Map */}
                <img 
                  src={showLabelless ? "/map/Camp-Lawton-Map labelless.png" : "/map/Camp-Lawton-Map.png"} 
                  alt="Camp Lawton Map"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />

                {/* Spotlight Overlay to dim the rest of the map when an area is highlighted */}
                <motion.div
                  className="absolute inset-0 bg-[#091510] pointer-events-none z-10"
                  initial={false}
                  animate={{ opacity: (hoveredId || selectedId) ? 0.45 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Highlights */}
                {campMapLocations.map(loc => {
                  const isActive = hoveredId === loc.id || selectedId === loc.id;
                  const items = [];
                  
                  if (loc.highlightImage) {
                    items.push(
                      <motion.img
                        key={`hl-${loc.id}`}
                        src={loc.highlightImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          filter: isActive ? "drop-shadow(0 0 25px rgba(226,185,95,0.7)) brightness(1.15)" : "drop-shadow(0 0 0px rgba(0,0,0,0)) brightness(1)"
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    );
                  }
                  if (loc.points) {
                    loc.points.forEach((pt, i) => {
                      if (pt.highlightImage) {
                        items.push(
                          <motion.img
                            key={`hl-${loc.id}-${i}`}
                            src={pt.highlightImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                            initial={false}
                            animate={{
                              opacity: isActive ? 1 : 0,
                              filter: isActive ? "drop-shadow(0 0 25px rgba(226,185,95,0.7)) brightness(1.15)" : "drop-shadow(0 0 0px rgba(0,0,0,0)) brightness(1)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        );
                      }
                    });
                  }
                  return items;
                })}

                {/* Interactive Hitboxes/Pins */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-30 pointer-events-none">
                  {filteredLocations.map(loc => {
                    const pts = loc.points || [{ x: loc.x, y: loc.y, highlightImage: loc.highlightImage }];
                    return pts.map((pt, i) => {
                      const hlPath = pt.highlightImage || loc.highlightImage;
                      const poly = hlPath ? polygons[hlPath] : null;
                      
                      if (poly) {
                        return (
                          <polygon
                            id={`pin-${loc.id}-${i}`}
                            key={`pin-${loc.id}-${i}`}
                            points={poly}
                            className="cursor-pointer outline-none"
                            fill="transparent"
                            stroke="transparent"
                            style={{ pointerEvents: 'all' }}
                            onClick={() => {
                              if (selectedId === loc.id) {
                                setSelectedId(null);
                                resetTransform(500, "easeOut");
                              } else {
                                setSelectedId(loc.id);
                                zoomToElement(`pin-${loc.id}-${i}`, 2, 800, "easeOut");
                              }
                            }}
                            onMouseEnter={() => setHoveredId(loc.id)}
                            onMouseLeave={() => setHoveredId(null)}
                          >
                            <title>{pt.label || loc.title}</title>
                          </polygon>
                        );
                      } else {
                        return (
                          <rect
                            id={`pin-${loc.id}-${i}`}
                            key={`pin-${loc.id}-${i}`}
                            x={pt.x - 1} y={pt.y - 1} width={2} height={2}
                            fill="transparent"
                            className="cursor-pointer outline-none"
                            style={{ pointerEvents: 'all' }}
                            onClick={() => {
                              if (selectedId === loc.id) {
                                setSelectedId(null);
                                resetTransform(500, "easeOut");
                              } else {
                                setSelectedId(loc.id);
                                zoomToElement(`pin-${loc.id}-${i}`, 2, 800, "easeOut");
                              }
                            }}
                            onMouseEnter={() => setHoveredId(loc.id)}
                            onMouseLeave={() => setHoveredId(null)}
                          >
                            <title>{pt.label || loc.title}</title>
                          </rect>
                        );
                      }
                    });
                  })}
                </svg>

              </div>
            </TransformComponent>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
          `}} />
        </div>
      )}
    </TransformWrapper>
  );
}
