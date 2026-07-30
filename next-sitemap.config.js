/**
 * next-sitemap — fallback sitemap generator.
 *
 * The live sitemap is generated dynamically by app/sitemap.ts (includes
 * blog posts and project case studies from the content pipeline), and
 * robots.txt is served statically from public/robots.txt. There is no
 * app/robots.ts. This config is kept as a fallback: if the app route is
 * ever removed, run
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
