"use client";

import { useState } from "react";
import { saveArticle, saveNotice, saveScheduleEvent, type EditorResult } from "./actions";

type ArticleDraft = { title: string; slug: string; summary: string; body: string; applicability: string };
type Revision = { revision: number; status: string; author: string; createdAt: Date };
type ScheduleDraft = { id: string; title: string; summary: string; kind: string; dayOfWeek: string; startTime: string; endTime: string; audience: string | null; isRequired: boolean | null; whatToBring: string | null; accessibilityNotes: string | null };

function ResultMessage({ result }: { result: EditorResult | null }) {
  return result && <p className={`editor-result ${result.success ? "success" : "error"}`} role="status">{result.message}</p>;
}

export default function EditorClient({ article, revisions, scheduleEvent }: { article: ArticleDraft; revisions: Revision[]; scheduleEvent: ScheduleDraft }) {
  const [articleResult, setArticleResult] = useState<EditorResult | null>(null);
  const [eventResult, setEventResult] = useState<EditorResult | null>(null);
  const [noticeResult, setNoticeResult] = useState<EditorResult | null>(null);

  async function submit(action: (data: FormData) => Promise<EditorResult>, data: FormData, setter: (result: EditorResult) => void) {
    setter({ success: true, message: "Saving..." });
    setter(await action(data));
  }

  return (
    <div className="editor-stack">
      <section className="editor-panel">
        <header><span>Guide content</span><h2>Arrival & Check-In</h2><p>Save a draft for review or publish it immediately to the public guide.</p></header>
        <form action={(data) => submit(saveArticle, data, setArticleResult)} className="editor-form">
          <div className="editor-two-column">
            <label><span>Title</span><input name="title" required maxLength={120} defaultValue={article.title} /></label>
            <label><span>URL slug</span><input name="slug" required pattern="[a-z0-9-]+" defaultValue={article.slug} /></label>
          </div>
          <label><span>Summary</span><textarea name="summary" required maxLength={320} rows={3} defaultValue={article.summary} /></label>
          <label><span>Applies to</span><input name="applicability" maxLength={200} defaultValue={article.applicability} /></label>
          <label><span>Body (Markdown)</span><textarea name="body" required className="editor-source" rows={18} defaultValue={article.body} /></label>
          <div className="editor-actions">
            <button className="button button-secondary" type="submit" name="intent" value="draft">Save draft</button>
            <button className="button" type="submit" name="intent" value="publish">Publish article</button>
            <a href="/guide/arrival-and-check-in" target="_blank" rel="noreferrer">Open public preview ↗</a>
          </div>
          <ResultMessage result={articleResult} />
        </form>
        {revisions.length > 0 && <div className="revision-history"><h3>Recent revisions</h3>{revisions.map((revision) => <div key={revision.revision}><strong>Revision {revision.revision}</strong><span>{revision.status} by {revision.author}</span><time>{new Date(revision.createdAt).toLocaleString()}</time></div>)}</div>}
      </section>

      <section className="editor-panel">
        <header><span>Structured schedule</span><h2>Add an event</h2><p>Published events appear in the selected day&apos;s agenda.</p></header>
        <form action={(data) => submit(saveScheduleEvent, data, setEventResult)} className="editor-form">
          <input type="hidden" name="eventId" value={scheduleEvent.id} />
          <div className="editor-two-column">
            <label><span>Event title</span><input name="eventTitle" required maxLength={120} defaultValue={scheduleEvent.title} /></label>
            <label><span>Day</span><select name="dayOfWeek" defaultValue={scheduleEvent.dayOfWeek}><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></label>
            <label><span>Start time</span><input name="startTime" required defaultValue={scheduleEvent.startTime} /></label>
            <label><span>End time</span><input name="endTime" required defaultValue={scheduleEvent.endTime} /></label>
          </div>
          <label><span>Summary</span><textarea name="eventSummary" required maxLength={320} rows={3} defaultValue={scheduleEvent.summary} /></label>
          <div className="editor-two-column">
            <label><span>Type</span><select name="kind" defaultValue={scheduleEvent.kind}><option value="program">Program</option><option value="routine">Routine</option><option value="leader">Leader</option><option value="meal">Meal</option></select></label>
            <label><span>Audience</span><input name="audience" maxLength={120} defaultValue={scheduleEvent.audience ?? "All camp"} /></label>
          </div>
          <label><span>What to bring</span><input name="whatToBring" maxLength={320} defaultValue={scheduleEvent.whatToBring ?? ""} /></label>
          <label><span>Accessibility notes</span><textarea name="accessibilityNotes" maxLength={500} rows={2} defaultValue={scheduleEvent.accessibilityNotes ?? ""} /></label>
          <label className="editor-check"><input type="checkbox" name="isRequired" defaultChecked={scheduleEvent.isRequired ?? false} /><span>Attendance is required</span></label>
          <div className="editor-actions"><button className="button button-secondary" type="submit" name="intent" value="draft">Save draft</button><button className="button" type="submit" name="intent" value="publish">Publish event</button></div>
          <ResultMessage result={eventResult} />
        </form>
      </section>

      <section className="editor-panel">
        <header><span>Camp alerts</span><h2>Schedule a notice</h2><p>Notices display on the homepage only during their effective window.</p></header>
        <form action={(data) => submit(saveNotice, data, setNoticeResult)} className="editor-form">
          <div className="editor-two-column">
            <label><span>Notice title</span><input name="noticeTitle" required maxLength={120} /></label>
            <label><span>Urgency</span><select name="urgency" defaultValue="information"><option value="information">Information</option><option value="advisory">Advisory</option><option value="urgent">Urgent</option></select></label>
          </div>
          <label><span>Summary</span><textarea name="noticeContent" required maxLength={500} rows={3} /></label>
          <label><span>Instructions</span><textarea name="instructions" maxLength={500} rows={2} /></label>
          <div className="editor-two-column">
            <label><span>Starts</span><input type="datetime-local" name="startTime" /></label>
            <label><span>Expires</span><input type="datetime-local" name="endTime" /></label>
          </div>
          <label><span>Audience</span><input name="noticeAudience" maxLength={120} placeholder="All sessions" /></label>
          <div className="editor-actions"><button className="button" type="submit">Schedule notice</button></div>
          <ResultMessage result={noticeResult} />
        </form>
      </section>
    </div>
  );
}
