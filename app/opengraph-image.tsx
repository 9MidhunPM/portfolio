import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";
import { SITE } from "@/lib/data";

export const alt = `${SITE.name} — Software Developer`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: `${SITE.jobTitle} · ${SITE.region}, India`,
    title: SITE.tagline,
    meta: SITE.jobTitle,
  });
}
