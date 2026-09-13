import { SITE } from "@/lib/data";

type SitemapImage = {
  path: string;
  images: string[];
};

const imagePages: SitemapImage[] = [
  {
    path: "/about",
    images: ["/images/midhun-pm.jpg"],
  },
  {
    path: "/projects/prism",
    images: ["/images/midhun-pm-ai-innovation-hackathon-adi-shankara.jpeg"],
  },
  {
    path: "/projects/metromind",
    images: [
      "/images/midhun-pm-codex-presenting-card.webp",
      "/images/midhun-pm-codex-presenting.jpg",
      "/images/midhun-pm-codex-badge.jpg",
    ],
  },
  {
    path: "/projects/noolu-pidichaal-mathi",
    images: ["/images/noolu-pidichaal-mathi-noolverse.webp"],
  },
  {
    path: "/blog/taking-thursday-to-openai-codex-community-hackathon-bengaluru",
    images: [
      "/images/midhun-pm-codex-bangalore.jpeg",
      "/images/midhun-pm-codex-invitation-mail.png",
    ],
  },
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const urls = imagePages
    .map(
      ({ path, images }) => `<url>
  <loc>${escapeXml(`${SITE.url}${path}`)}</loc>
${images
  .map(
    (image) => `  <image:image>
    <image:loc>${escapeXml(`${SITE.url}${image}`)}</image:loc>
  </image:image>`
  )
  .join("\n")}
</url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
