/**
 * The working schedule, proposed badge offerings, and personal planner are
 * intentionally retained in the repository for later review, but they are not
 * approved public information. Change this only after the 2027 catalog and
 * times have received final program approval.
 */
export const PROGRAM_PLANNING_PUBLISHED = false;

const scheduleSpecificGuideArticles = new Set([
  "daily-rhythm-and-program",
  "cub-weekend-program",
]);

export function isGuideArticlePublic(slug: string): boolean {
  return PROGRAM_PLANNING_PUBLISHED || !scheduleSpecificGuideArticles.has(slug);
}
