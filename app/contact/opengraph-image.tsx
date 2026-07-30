import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";
import { SITE } from "@/lib/data";

export const alt = `Contact ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Say hello",
    meta: SITE.availability,
  });
}
