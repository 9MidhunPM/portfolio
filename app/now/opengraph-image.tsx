import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";

import { SITE } from "@/lib/data";

export const alt = `What ${SITE.name} is up to now`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Now",
    title: "What I'm up to now",
  });
}
