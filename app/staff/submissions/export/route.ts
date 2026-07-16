import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { submissions } from "../../../../db/schema";
import { meritBadgeSurveyCatalog } from "../../../../lib/merit-badge-survey.generated";
import { parsePlanningSnapshot } from "../../../../lib/planning-submission";
import { requireStaffRole } from "../../../staff-auth";

const csv = (value: unknown) => {
  const raw = String(value ?? "");
  const spreadsheetSafe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${spreadsheetSafe.replaceAll('"', '""')}"`;
};

export async function GET() {
  await requireStaffRole("/staff/submissions", ["director"]);
  const rows = await getDb().select().from(submissions).orderBy(desc(submissions.createdAt));
  const headers = ["reference", "status", "submitted_at", "unit_type", "unit_number", "council", "city", "state", "session_id", "youth_total", "adult_total", "contact_name", "contact_email", "contact_phone", "badge_id", "badge_title", "area", "tier", "completion", "interested_count", "priority", "note", "delete_after"];
  const lines = [headers.map(csv).join(",")];

  for (const row of rows) {
    const snapshot = parsePlanningSnapshot(row.snapshot);
    if (!snapshot) continue;
    const youthTotal = snapshot.attendance.youthMale + snapshot.attendance.youthFemale + snapshot.attendance.youthOther;
    const adultTotal = snapshot.attendance.adultMale + snapshot.attendance.adultFemale + snapshot.attendance.adultOther;
    const interests = snapshot.interests.length ? snapshot.interests : [null];
    for (const interest of interests) {
      const badge = interest ? meritBadgeSurveyCatalog.find((item) => item.id === interest.offeringId) : null;
      lines.push([
        row.reference, row.status, row.createdAt.toISOString(), snapshot.unit.unitType, snapshot.unit.unitNumber, snapshot.unit.council,
        snapshot.unit.city, snapshot.unit.state, snapshot.unit.sessionId, youthTotal, adultTotal, row.contactName, row.contactEmail,
        row.contactPhone, badge?.id, badge?.title, badge?.area, badge?.tier, badge?.completion, interest?.interestedCount,
        interest?.priority, interest?.note, row.deleteAfter.toISOString(),
      ].map(csv).join(","));
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="camp-lawton-badge-demand-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
