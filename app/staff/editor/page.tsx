import { requireChatGPTUser } from "../../chatgpt-auth";
import EditorClient from "./EditorClient";
import { getArticleForEditor } from "../../../lib/content-repository";

export default async function EditorPage() {
  const user = await requireChatGPTUser("/staff/editor");
  const editorData = await getArticleForEditor("arrival-and-check-in");

  return (
    <main className="editor-page">
      <div className="editor-shell">
        <header className="editor-header">
          <div><span>Camp Lawton staff</span><h1>Publishing workspace</h1></div>
          <p>Signed in as {user.displayName}. Draft, review, and publish the first public guide slice.</p>
        </header>
        <EditorClient article={editorData.article} revisions={editorData.revisions} />
      </div>
    </main>
  );
}
