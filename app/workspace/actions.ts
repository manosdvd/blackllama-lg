"use server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "../../db";
import { participants, unitWorkspaces, workspaceMembers } from "../../db/schema";
import { requireChatGPTUser } from "../chatgpt-auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const value = (data: FormData, name: string, max: number) => String(data.get(name) ?? "").trim().slice(0, max);

async function canAccess(workspaceId: string, email: string) {
  const [workspace] = await getDb().select().from(unitWorkspaces).where(eq(unitWorkspaces.id, workspaceId)).limit(1);
  if (!workspace) return null;
  if (workspace.ownerEmail === email) return workspace;
  const [member] = await getDb().select().from(workspaceMembers).where(and(eq(workspaceMembers.workspaceId, workspaceId), eq(workspaceMembers.email, email))).limit(1);
  return member ? workspace : null;
}

export async function createWorkspace(data: FormData) {
  const user = await requireChatGPTUser("/workspace");
  const unitType = value(data, "unitType", 30), unitNumber = value(data, "unitNumber", 30);
  if (!unitType || !unitNumber) return;
  const id = crypto.randomUUID(), now = new Date();
  await getDb().insert(unitWorkspaces).values({ id, name: `${unitType} ${unitNumber}`, council: value(data, "council", 100) || null, unitType, unitNumber, city: value(data, "city", 80) || null, state: value(data, "state", 2).toUpperCase() || null, sessionId: value(data, "sessionId", 40) || null, ownerEmail: user.email, status: "draft", createdAt: now, updatedAt: now });
  await getDb().insert(workspaceMembers).values({ id: crypto.randomUUID(), workspaceId: id, email: user.email, role: "owner", invitedBy: user.email, createdAt: now });
  revalidatePath("/workspace");
}

export async function inviteMember(data: FormData) {
  const user = await requireChatGPTUser("/workspace");
  const workspaceId = value(data, "workspaceId", 80), email = value(data, "email", 200).toLowerCase();
  const [workspace] = await getDb().select().from(unitWorkspaces).where(eq(unitWorkspaces.id, workspaceId)).limit(1);
  if (!workspace || workspace.ownerEmail !== user.email || !emailPattern.test(email)) return;
  const [existing] = await getDb().select().from(workspaceMembers).where(and(eq(workspaceMembers.workspaceId, workspaceId), eq(workspaceMembers.email, email))).limit(1);
  if (!existing) await getDb().insert(workspaceMembers).values({ id: crypto.randomUUID(), workspaceId, email, role: "planner", invitedBy: user.email, createdAt: new Date() });
  revalidatePath("/workspace");
}

export async function addParticipant(data: FormData) {
  const user = await requireChatGPTUser("/workspace");
  const workspaceId = value(data, "workspaceId", 80), displayName = value(data, "displayName", 80);
  if (!displayName || !await canAccess(workspaceId, user.email)) return;
  await getDb().insert(participants).values({ id: crypto.randomUUID(), workspaceId, displayName, program: value(data, "program", 30) || "BSA", rank: value(data, "rank", 40) || null, createdAt: new Date() });
  revalidatePath("/workspace");
}
