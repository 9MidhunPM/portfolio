import type { ContentImage } from "@/lib/types";

export function parseContentImage(value: unknown): ContentImage | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const image = value as Record<string, unknown>;
  if (
    typeof image.src !== "string" ||
    typeof image.alt !== "string" ||
    typeof image.width !== "number" ||
    typeof image.height !== "number"
  ) {
    return undefined;
  }

  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}
