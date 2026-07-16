import { getActiveNotices } from "../../../lib/content-repository";

export async function GET() {
  const notices = await getActiveNotices();
  return Response.json(notices.map((notice) => ({
    ...notice,
    updatedAt: notice.updatedAt.toISOString(),
  })), {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=900" },
  });
}
