export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  points: string[];
}

export interface ProjectItem {
  name: string;
  stack: string[];
  description: string;
  badge?: string;
  isCoralBadge?: boolean;
  github?: string;
  live?: string;
}

export interface SkillsCategory {
  category: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  grade?: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface TerminalCommand {
  command: string;
  output: string;
}
