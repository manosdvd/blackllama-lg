import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { submissions } from "../../../../db/schema";
import { requireStaff } from "../../../staff-auth";

const csv = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
export async function GET() {
  await requireStaff("/staff/submissions");
  const rows = await getDb().select().from(submissions).orderBy(desc(submissions.createdAt));
  const lines = [["reference", "status", "submitted_at", "contact_name", "contact_email", "contact_phone", "delete_after"].map(csv).join(","), ...rows.map((row) => [row.reference, row.status, row.createdAt.toISOString(), row.contactName, row.contactEmail, row.contactPhone, row.deleteAfter.toISOString()].map(csv).join(","))];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="camp-lawton-planning-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "private, no-store" } });
}
