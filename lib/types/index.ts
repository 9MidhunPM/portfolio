export interface NavItem {
  label: string;
  href: string;
}

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  image?: ContentImage;
  lastModified: Date;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  image?: ContentImage;
  lastModified: Date;
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}
