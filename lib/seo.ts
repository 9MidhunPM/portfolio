import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import type { ContentImage } from "@/lib/types";

export const DEFAULT_SOCIAL_IMAGE: ContentImage = {
  src: "/images/midhun-pm.jpg",
  alt: "Midhun P M — full-stack developer and AI systems builder from Kerala",
  width: 1200,
  height: 1600,
};

export function getSocialImages(image?: ContentImage) {
  const selected = image ?? DEFAULT_SOCIAL_IMAGE;

  return [
    {
      url: `${SITE.url}${selected.src}`,
      width: selected.width,
      height: selected.height,
      alt: selected.alt,
    },
  ];
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: ContentImage;
}): Metadata {
  const url = `${SITE.url}${path}`;
  const images = getSocialImages(image);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: images.map((item) => item.url),
    },
    alternates: {
      canonical: url,
    },
  };
}
