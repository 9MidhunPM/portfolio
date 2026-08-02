import fs from "node:fs";
import path from "node:path";

const REQUIRED_SOCIAL_ASSETS = ["og-image.png", "apple-touch-icon.png"];

let hasWarned = false;

/**
 * The social images are intentionally committed as static files so external
 * crawlers can fetch stable URLs. Keep the reminder local to development.
 */
export function warnForMissingSocialAssets() {
  if (process.env.NODE_ENV !== "development" || hasWarned) return;

  const missing = REQUIRED_SOCIAL_ASSETS.filter(
    (asset) => !fs.existsSync(path.join(process.cwd(), "public", asset))
  );

  if (missing.length > 0) {
    console.warn(
      `TODO: add ${missing.join(", ")} to public/ before deploying social metadata.`
    );
  }

  hasWarned = true;
}
