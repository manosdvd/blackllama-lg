import { requireStaffRole } from "../../staff-auth";
import EditorClient from "./EditorClient";
import { getArticleForEditor, getEventForEditor } from "../../../lib/content-repository";

export default async function EditorPage({ searchParams }: { searchParams: Promise<{ article?: string; event?: string }> }) {
  const user = await requireStaffRole("/staff/editor", ["director", "program-director"]);
  const query = await searchParams;
  const editorData = await getArticleForEditor(query.article ?? "arrival-and-check-in");
  const scheduleEvent = await getEventForEditor(query.event ?? "mon-flags");

  return (
    <main className="editor-page">
      <div className="editor-shell">
        <header className="editor-header">
          <div><span>Camp Lawton staff</span><h1>Publishing workspace</h1></div>
          <p>Signed in as {user.displayName}. Draft, review, and publish the first public guide slice.</p>
        </header>
        <EditorClient article={editorData.article} revisions={editorData.revisions} scheduleEvent={scheduleEvent} />
      </div>
    </main>
  );
}
