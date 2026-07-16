import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "../../db";
import { participants, unitWorkspaces, workspaceMembers } from "../../db/schema";
import { sessions } from "../../lib/camp-catalog";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ProgramPlanningPaused from "../../components/ProgramPlanningPaused";
import { PROGRAM_PLANNING_PUBLISHED } from "../../lib/site-features";
import { requireChatGPTUser } from "../chatgpt-auth";
import { addParticipant, createWorkspace, inviteMember } from "./actions";

export default async function WorkspacePage() {
  if (!PROGRAM_PLANNING_PUBLISHED) return <ProgramPlanningPaused tool="planner" />;
  const user = await requireChatGPTUser("/workspace");
  let workspaces: typeof unitWorkspaces.$inferSelect[] = [], memberRows: typeof workspaceMembers.$inferSelect[] = [], scoutRows: typeof participants.$inferSelect[] = [];
  let databaseAvailable = true;
  try {
    const owned = await getDb().select().from(unitWorkspaces).where(eq(unitWorkspaces.ownerEmail, user.email));
    const memberships = await getDb().select().from(workspaceMembers).where(eq(workspaceMembers.email, user.email));
    const workspaceIds = [...new Set([...owned.map((workspace) => workspace.id), ...memberships.map((member) => member.workspaceId)])];
    if (workspaceIds.length) {
      [workspaces, memberRows, scoutRows] = await Promise.all([
        getDb().select().from(unitWorkspaces).where(inArray(unitWorkspaces.id, workspaceIds)),
        getDb().select().from(workspaceMembers).where(inArray(workspaceMembers.workspaceId, workspaceIds)),
        getDb().select().from(participants).where(inArray(participants.workspaceId, workspaceIds)),
      ]);
    }
  } catch { databaseAvailable = false; }
  return <main><SiteHeader /><section className="page-intro workspace-intro"><div><p className="section-kicker">Authenticated unit planning</p><h1>Your unit workspace.</h1><p>Invite adult planners and maintain only the Scout display names needed to coordinate schedules. Health and official registration records stay outside this workspace.</p></div></section><section className="page-content workspace-page">{!databaseAvailable && <p className="staff-data-warning" role="alert">The unit-planning database is unavailable. Your workspace has not been changed; please try again later.</p>}{databaseAvailable && (workspaces.length === 0 ? <section className="create-workspace"><header><span>Start planning</span><h2>Create a unit group</h2><p>Other authenticated adults can be invited after creation.</p></header><form action={createWorkspace}><label><span>Unit type</span><select name="unitType"><option>Troop</option><option>Pack</option><option>Crew</option></select></label><label><span>Unit number</span><input name="unitNumber" required /></label><label><span>Council</span><input name="council" defaultValue="Catalina Council" /></label><label><span>City</span><input name="city" /></label><label><span>State</span><input name="state" defaultValue="AZ" maxLength={2} /></label><label><span>Session</span><select name="sessionId">{sessions.map((session) => <option key={session.id} value={session.id}>{session.name}</option>)}</select></label><button className="button" type="submit">Create workspace</button></form></section> : <div className="workspace-list">{workspaces.map((workspace) => { const members = memberRows.filter((member) => member.workspaceId === workspace.id); const scouts = scoutRows.filter((scout) => scout.workspaceId === workspace.id); const owner = workspace.ownerEmail === user.email; return <article key={workspace.id} className="workspace-panel"><header><div><span>{sessions.find((session) => session.id === workspace.sessionId)?.name ?? "Session not selected"}</span><h2>{workspace.name}</h2><p>{workspace.city}{workspace.city && workspace.state ? ", " : ""}{workspace.state} · {members.length} adult planner{members.length === 1 ? "" : "s"}</p></div><Link className="button button-small" href="/my-plan">Open schedule planner</Link></header><div className="workspace-columns"><section><h3>Scout display names</h3><div className="workspace-roster">{scouts.map((scout) => <div key={scout.id}><strong>{scout.displayName}</strong><span>{scout.program}{scout.rank ? ` · ${scout.rank}` : ""}</span></div>)}{scouts.length === 0 && <p>No Scout names added.</p>}</div><form action={addParticipant}><input type="hidden" name="workspaceId" value={workspace.id} /><input name="displayName" required placeholder="First name and last initial" /><select name="program"><option>BSA</option><option>Cub</option></select><input name="rank" placeholder="Rank (optional)" /><button type="submit">Add</button></form></section><section><h3>Adult planners</h3><div className="workspace-members">{members.map((member) => <div key={member.id}><strong>{member.email}</strong><span>{member.role}</span></div>)}</div>{owner && <form action={inviteMember}><input type="hidden" name="workspaceId" value={workspace.id} /><input type="email" name="email" required placeholder="adult@example.org" /><button type="submit">Invite planner</button></form>}</section></div></article>; })}</div>)}</section><SiteFooter /></main>;
}
