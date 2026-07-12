"use client";
import { useState } from "react";
import { saveArticle } from "./actions";

export default function EditorClient() {
  const [status, setStatus] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("Saving...");
    try {
      await saveArticle(formData);
      setStatus("Saved successfully!");
      // Reset form could go here
    } catch (e) {
      setStatus("Error saving article.");
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <label className="flex flex-col gap-2">
        <span className="font-bold text-[var(--pine-900)] text-sm">Title</span>
        <input name="title" required className="border border-[var(--line)] p-3 rounded" placeholder="e.g. 2027 Medical Forms" />
      </label>
      
      <label className="flex flex-col gap-2">
        <span className="font-bold text-[var(--pine-900)] text-sm">Summary</span>
        <textarea name="summary" required className="border border-[var(--line)] p-3 rounded" rows={3} placeholder="A short summary of this article..." />
      </label>
      
      <label className="flex flex-col gap-2">
        <span className="font-bold text-[var(--pine-900)] text-sm">Body (Markdown)</span>
        <textarea name="body" required className="border border-[var(--line)] p-3 rounded font-mono text-sm" rows={15} placeholder="# Heading\n\nContent goes here..." />
      </label>
      
      <div className="flex items-center gap-4 mt-2">
        <button type="submit" className="button">Save Article</button>
        {status && <span className="text-sm font-bold text-[var(--rust)]">{status}</span>}
      </div>
    </form>
  );
}
