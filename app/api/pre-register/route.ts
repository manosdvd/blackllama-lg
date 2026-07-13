import { getDb } from "../../../db";
import { submissions } from "../../../db/schema";
import { sessions } from "../../../lib/camp-catalog";
import { normalizeSurveyInterests } from "../../../lib/planning-submission";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const count = (value: unknown) => Math.max(0, Math.min(250, Number.isFinite(Number(value)) ? Math.floor(Number(value)) : 0));

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 100_000) return Response.json({ error: "Submission is too large." }, { status: 413 });
  try {
    const input = await request.json() as Record<string, unknown>;
    if (input.website) return Response.json({ reference: "CL-PLANNING-RECEIVED" });
    if (input.consent !== true) return Response.json({ error: "Consent is required." }, { status: 400 });
    const unitType = clean(input.unitType, 30), unitNumber = clean(input.unitNumber, 30), sessionId = clean(input.sessionId, 40);
    const contactName = clean(input.contactName, 100), contactEmail = clean(input.contactEmail, 200).toLowerCase(), contactPhone = clean(input.contactPhone, 40);
    if (!unitType || !unitNumber || !sessions.some((session) => session.id === sessionId)) return Response.json({ error: "Complete the unit and session information." }, { status: 400 });
    if (!contactName || !emailPattern.test(contactEmail)) return Response.json({ error: "Enter a valid primary adult contact." }, { status: 400 });
    const attendance = { youthMale: count(input.youthMale), youthFemale: count(input.youthFemale), youthOther: count(input.youthOther), adultMale: count(input.adultMale), adultFemale: count(input.adultFemale), adultOther: count(input.adultOther) };
    const youthTotal = attendance.youthMale + attendance.youthFemale + attendance.youthOther;
    if (youthTotal < 1 || attendance.adultMale + attendance.adultFemale + attendance.adultOther < 1) return Response.json({ error: "Enter at least one youth and one adult." }, { status: 400 });
    const scouts = Array.isArray(input.scouts) ? input.scouts.slice(0, 250).map((name) => clean(name, 80)).filter(Boolean) : [];
    const interests = normalizeSurveyInterests(input.interests, youthTotal);
    const snapshot = { unit: { unitType, unitNumber, council: clean(input.council, 100), city: clean(input.city, 80), state: clean(input.state, 2), sessionId }, attendance, contacts: { primary: { name: contactName, email: contactEmail, phone: contactPhone }, alternate: { name: clean(input.alternateName, 100), email: clean(input.alternateEmail, 200).toLowerCase() } }, scouts, interests, accommodationFollowUp: input.accommodationFollowUp === true, disclaimerVersion: "2027-planning-v2-survey-catalog" };
    const now = new Date();
    const reference = `CL27-${now.toISOString().slice(2, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    await getDb().insert(submissions).values({ id: crypto.randomUUID(), reference, contactName, contactEmail, contactPhone: contactPhone || null, snapshot: JSON.stringify(snapshot), consentedAt: now, status: "new", createdAt: now, deleteAfter: new Date("2027-08-31T23:59:59Z") });
    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    console.error("Pre-registration submission failed", error);
    return Response.json({ error: "The planning service is temporarily unavailable. Your saved browser draft has not been removed." }, { status: 503 });
  }
}
