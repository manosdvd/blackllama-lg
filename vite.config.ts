import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import wranglerConfig from "./wrangler.json";
import { sites } from "./build/sites-vite-plugin";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-0000-0000-000000000000";

const { d1, r2 } = hostingConfig;
const rootD1Binding = wranglerConfig.d1_databases.find((binding) => binding.binding === d1);
const databaseIdOverride = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim();
const configuredDatabaseId = databaseIdOverride || rootD1Binding?.database_id;
const hasProductionDatabase = Boolean(
  configuredDatabaseId && configuredDatabaseId !== SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
);

if (databaseIdOverride && !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(databaseIdOverride)) {
  throw new Error("CLOUDFLARE_D1_DATABASE_ID must be a D1 database UUID.");
}

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const bindingConfig = (command: "build" | "serve") => ({
  // The all-zero ID is useful for Miniflare's local database, but Cloudflare
  // correctly rejects it during deployment. Production builds omit DB until a
  // real ID is committed or supplied by the Workers Builds environment.
  d1_databases: d1 && (command === "serve" || hasProductionDatabase)
    ? [
        {
          binding: d1,
          database_name: rootD1Binding?.database_name ?? "camp-lawton-leader-hub",
          database_id: configuredDatabaseId ?? SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
});

export default defineConfig(async ({ command }) => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  if (command === "build" && d1 && !hasProductionDatabase) {
    console.warn("[cloudflare] No production D1 UUID configured; building the public site without DB-backed forms or staff tools.");
  }

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        configPath: "./.openai/wrangler.vinext.json",
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: bindingConfig(command),
      }),
    ],
    optimizeDeps: {
      exclude: ["@cloudflare/unenv-preset"],
    },
  };
});
