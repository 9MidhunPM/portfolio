/**
 * next-sitemap — fallback sitemap generator.
 *
 * The live sitemap and robots.txt are generated dynamically by
 * app/sitemap.ts and app/robots.ts (includes blog posts and project
 * case studies from the content pipeline). This config is kept as a
 * fallback: if the app routes are ever removed, run
 * `npx next-sitemap --config next-sitemap.config.js` after `next build`
 * to emit static public/sitemap.xml + public/robots.txt instead.
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://midhunpm.in",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
