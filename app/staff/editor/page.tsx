import { requireChatGPTUser } from "../../chatgpt-auth";
import EditorClient from "./EditorClient";

export default async function EditorPage() {
  const user = await requireChatGPTUser("/staff/editor");

  return (
    <main className="min-h-screen bg-[var(--paper)] py-12 px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[var(--pine-950)] font-serif mb-2">Staff Editor</h1>
          <p className="text-[var(--muted)]">Welcome back, {user.displayName}. Use this tool to draft and publish guide articles.</p>
        </header>
        <EditorClient />
      </div>
    </main>
  );
}
