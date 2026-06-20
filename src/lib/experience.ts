// lib/experience.ts
export interface Experience {
  id: string; // The "commit" hash
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: "a9f4e2c",
    role: "Computer Science student",
    company: "Islamia University Bahawalpur",
    location: "BAHAWALPUR",
    duration: "2023 - PRESENT",
    points: [
      "Implemented iterative learning protocols, optimizing data retention throughput by 40% per academic quarter.",

      "Engineered collaborative resource-sharing modules within peer-to-peer research clusters.",

      "Automated core laboratory reporting sequences, reducing manual documentation latency by 15 cycles.",

      "Managed complex time-slicing algorithms to maintain high-availability status across academic and extracurricular nodes.",
    ],
  },
  {
    id: "4c11b8a",
    role: "Software Engineer",
    company: "Self Employed",
    location: "REMOTE_SECTOR",
    duration: "2024 - Present",
    points: [
      "Architected bespoke SaaS solutions, achieving 99.9% uptime for high-traffic client deployments.",
      "Optimized database query execution paths, reducing API response latency by an average of 200ms.",
      "Streamlined CI/CD deployment logic, enabling rapid feature iteration cycles for multiple concurrent projects.",
      "Orchestrated end-to-end infrastructure provisioning, maintaining secure and scalable environments via Infrastructure-as-Code.",
    ],
  },
  {
    id: "e88d042",
    role: "Software Developer II",
    company: "CYPHER_CORE SYSTEMS",
    location: "LONDON_HUB",
    duration: "2024 - 2025",
    points: [
      "Optimized internal data ingestion pipelines for 500k+ events/second.",
      "Redesigned REST API interface for legacy client compatibility.",
      "Contributed to core kernel-level performance debugging efforts.",
    ],
  },
];
