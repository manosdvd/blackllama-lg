"use client";

import { useEffect, useState } from "react";

type Conditions = { status: "current" | "stale" | "unavailable"; temperatureF: number | null; description: string; observedAt: string | null; checkedAt: string; sourceUrl: string };

export default function ConditionsPanel() {
  const [conditions, setConditions] = useState<Conditions | null>(null);
  useEffect(() => { fetch("/api/conditions").then((response) => response.json()).then(setConditions).catch(() => setConditions({ status: "unavailable", temperatureF: null, description: "Weather feed unavailable", observedAt: null, checkedAt: new Date().toISOString(), sourceUrl: "https://www.weather.gov/" })); }, []);
  return <article className="condition-card"><span className="condition-icon sky">°</span><div><small>NWS station QSLA3</small><h2>{conditions?.temperatureF != null ? `${conditions.temperatureF}°F · ${conditions.description}` : conditions?.description ?? "Checking conditions..."}</h2><p>{conditions?.status === "current" ? `Observed ${new Date(conditions.observedAt!).toLocaleString()}.` : conditions?.status === "stale" ? "The latest observation is stale; verify conditions with staff." : "Use on-site staff direction when the feed is unavailable."}</p><a href={conditions?.sourceUrl ?? "https://www.weather.gov/"} target="_blank" rel="noreferrer">Open official weather source ↗</a></div></article>;
}
