import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "Plan a safe, memorable 2027 summer camp and explore the guide, schedules, programs, and live Camp Lawton conditions.";

  return {
    title: "Camp Lawton Leader Hub · 2027",
    description,
    openGraph: {
      title: "Camp Lawton · 2027 Leader Hub",
      description,
      url: origin,
      siteName: "Camp Lawton Leader Hub",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Camp Lawton 2027 Leader Hub" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Camp Lawton · 2027 Leader Hub",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#081510" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
