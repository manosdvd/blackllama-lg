import type { Metadata, Viewport } from "next";
import { siteOrigin } from "../lib/site-url";
import "./globals.css";

const description = "Discover Camp Lawton, explore the working 2027 Leader's Guide, share unit and merit badge interest, and check camp history, maps, notices, and mountain conditions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Camp Lawton Leader Hub · 2027", template: "%s · Camp Lawton" },
  description,
  applicationName: "Camp Lawton Leader Hub",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Camp Lawton · 2027 Leader Hub",
    description,
    url: "/",
    siteName: "Camp Lawton Leader Hub",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Camp Lawton 2027 Leader Hub" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camp Lawton · 2027 Leader Hub",
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#081510" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <div id="main-content" tabIndex={-1}>{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker'in navigator){addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}`,
          }}
        />
      </body>
    </html>
  );
}
