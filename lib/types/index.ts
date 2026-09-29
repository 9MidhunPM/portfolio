export interface NavItem {
  label: string;
  href: string;
}

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  license?: string;
  acquireLicensePage?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  order: number;
  award?: string;
  seoTitle?: string;
  updated?: string;
  applicationCategory?: string;
  softwareVersion?: string;
  image?: ContentImage;
  lastModified?: Date;
}

export interface PostMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  date: string;
  updated?: string;
  description: string;
  tags: string[];
  readingTime: string;
  image?: ContentImage;
  lastModified?: Date;
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}
