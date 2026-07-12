const WEATHER_URL = "https://api.weather.gov/stations/QSLA3/observations/latest";

export async function GET() {
  const checkedAt = new Date();
  try {
    const response = await fetch(WEATHER_URL, { headers: { "User-Agent": "CampLawtonLeaderHub/1.0 camp-information" }, signal: AbortSignal.timeout(5000), next: { revalidate: 600 } });
    if (!response.ok) throw new Error("NWS response failed");
    const data = await response.json() as { properties?: { temperature?: { value?: number | null }; textDescription?: string; timestamp?: string } };
    const observedAt = data.properties?.timestamp ? new Date(data.properties.timestamp) : null;
    const temperatureC = data.properties?.temperature?.value;
    const stale = !observedAt || checkedAt.valueOf() - observedAt.valueOf() > 3 * 60 * 60 * 1000;
    return Response.json({ status: stale ? "stale" : "current", temperatureF: temperatureC == null ? null : Math.round(temperatureC * 9 / 5 + 32), description: data.properties?.textDescription || "No description reported", observedAt: observedAt?.toISOString() ?? null, checkedAt: checkedAt.toISOString(), sourceUrl: WEATHER_URL });
  } catch {
    return Response.json({ status: "unavailable", temperatureF: null, description: "Weather feed unavailable", observedAt: null, checkedAt: checkedAt.toISOString(), sourceUrl: WEATHER_URL }, { status: 200 });
  }
}
