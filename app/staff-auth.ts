import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb, getRuntimeSetting } from "../db";
import { staffRoles } from "../db/schema";
import { requireChatGPTUser, type ChatGPTUser } from "./chatgpt-auth";

export type StaffUser = ChatGPTUser & { role: "director" | "program-director" | "editor" };

export async function requireStaff(returnTo: string): Promise<StaffUser> {
  const user = await requireChatGPTUser(returnTo);
  const configured = (getRuntimeSetting("CAMP_STAFF_EMAILS") ?? "")
    .split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  if (configured.includes(user.email.toLowerCase())) return { ...user, role: "director" };

  try {
    const [entry] = await getDb().select().from(staffRoles).where(eq(staffRoles.email, user.email.toLowerCase())).limit(1);
    if (entry && ["director", "program-director", "editor"].includes(entry.role)) {
      return { ...user, role: entry.role as StaffUser["role"] };
    }
  } catch {
    // A missing database must fail closed for editorial access.
  }
  redirect(`/staff/unauthorized?return_to=${encodeURIComponent(returnTo)}`);
}
