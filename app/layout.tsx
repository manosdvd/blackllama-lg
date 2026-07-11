import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Camp Lawton Leader Hub · 2027",
    description: "Plan a safe, memorable 2027 summer camp at Camp Lawton.",
    openGraph: {
      title: "Camp Lawton · 2027 Leader Hub",
      description: "Plan a safe, memorable summer camp.",
      url: origin,
      siteName: "Camp Lawton Leader Hub",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Camp Lawton 2027 Leader Hub" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Camp Lawton · 2027 Leader Hub",
      description: "Plan a safe, memorable summer camp.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
