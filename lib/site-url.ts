const fallbackOrigin = "https://camp-lawton-leader-hub-2027.manosdvd.chatgpt.site";

export const siteOrigin = (() => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return fallbackOrigin;
  try {
    return new URL(configured).origin;
  } catch {
    return fallbackOrigin;
  }
})();

export function absoluteSiteUrl(path = "/"): string {
  return new URL(path, `${siteOrigin}/`).toString();
}
