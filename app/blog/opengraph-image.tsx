import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";

import { SITE } from "@/lib/data";

export const alt = `Writing by ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Notes from the workbench",
  });
}
