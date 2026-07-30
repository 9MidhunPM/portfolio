import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";
import { SITE } from "@/lib/data";

export const alt = `About ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "A bit about me",
    meta: `${SITE.jobTitle}, ${SITE.region}`,
  });
}
