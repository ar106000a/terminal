// lib/projects.ts

export interface Commit {
  hash: string;
  message: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  stack: string[];
  status: string;
  version: string;
  lastCommit: Commit;
  linesChanged: string;
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "0x8F1A",
    name: "SENTINEL_AUTH",
    category: "Security / AuthaaS",
    stack: ["TS", "Hono.js", "Drizzle", "Postgres"],
    status: "BUILDING",
    version: "v1.4.1",
    lastCommit: {
      hash: "a4f2b1d",
      message: "feat: implement lastLoginIp and geospatial data routes",
      timestamp: "2h ago",
    },
    linesChanged: "+12.4K",
  },
  {
    id: "0x3C9B",
    name: "DEV_BRIEF",
    category: "AI / Integrations",
    stack: ["React", "AuthWrapper", "GroqAI", "TS"],
    status: "STABLE",
    version: "v1.0.0",
    lastCommit: {
      hash: "7e91c4b",
      message: "fix: add username based login",
      timestamp: "1d ago",
    },
    linesChanged: "+4.8K",
    link: "https://dev-breif.vercel.app",
  },
  {
    id: "0x7E4D",
    name: "CORE_TERMINAL",
    category: "Interface / Engine",
    stack: ["Next.js", "Tailwind v4", "App router"],
    status: "BUILDING",
    version: "v0.8.0",
    lastCommit: {
      hash: "931fa0e",
      message: "style: map native css variables for phosphor palette",
      timestamp: "15m ago",
    },
    linesChanged: "+1.2K",
  },
];
