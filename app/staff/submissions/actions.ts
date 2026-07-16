"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../db";
import { auditLogs, submissions } from "../../../db/schema";
import { requireStaffRole } from "../../staff-auth";

export async function updateSubmissionStatus(formData: FormData) {
  const user = await requireStaffRole("/staff/submissions", ["director"]);
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "contacted", "follow-up", "ready", "closed", "withdrawn"].includes(status)) return;
  await getDb().update(submissions).set({ status }).where(eq(submissions.id, id));
  await getDb().insert(auditLogs).values({ id: crypto.randomUUID(), actorEmail: user.email, action: "submission.status", objectType: "submission", objectId: id, detail: JSON.stringify({ status }), createdAt: new Date() });
  revalidatePath("/staff/submissions");
  revalidatePath("/staff");
}
