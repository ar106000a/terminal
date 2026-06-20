// lib/terminalFiles.tsx (or wherever you keep your constants)
import { ReactNode } from "react";

// The actual file contents
export const VIRTUAL_FILE_SYSTEM: Record<string, ReactNode> = {
  "bio.md": (
    <div className="space-y-6 text-(--color-pale-green)/90 max-w-2xl leading-relaxed">
      <div>
        <p className="font-bold text-(--color-neon-green) text-[18px]">
          ## ALI RAZA // SYSTEM ARCHITECT & FULL-STACK ENGINEER
        </p>
        <p className="italic text-(--color-dim-green) mt-1">
          {"Building hardened, highly concurrent SaaS systems."}
        </p>
      </div>

      <div>
        <h3 className="font-bold text-(--color-cyber-cyan) border-b border-(--color-terminal-border) pb-1 mb-2">
          [ 01 ] SYSTEM SPECS & CAPABILITIES
        </h3>
        <p>
          I am a full-stack software engineer currently in the final stretch of
          my Computer Science degree. I specialize in deep multi-tenant
          engineering tracks utilizing the PERN vector, high-concurrency Node
          runtimes, and strict data layer boundaries.
        </p>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="text-(--color-neon-green)">●</span>{" "}
            <span className="font-bold">Core Loadout:</span> TypeScript,
            Node.js, Hono.js, Drizzle ORM, React/Next.js, Zod.
          </li>
          <li>
            <span className="text-(--color-neon-green)">●</span>{" "}
            <span className="font-bold">Interface Philosophy:</span>{" "}
            Dark-themed, brutal, sleek, and relentlessly modern.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-(--color-cyber-cyan) border-b border-(--color-terminal-border) pb-1 mb-2">
          [ 02 ] RECENT DEPLOYMENTS
        </h3>
        <ul className="space-y-4">
          <li>
            <span className="font-bold text-(--color-neon-green)">
              DevBrief:
            </span>{" "}
            Shipped a structured build-plan engine in 14 days.
            <a
              href="https://dev-breif.vercel.app"
              target="_blank"
              className="ml-2 underline text-(--color-cyber-cyan)"
            >
              [LIVE LINK]
            </a>
          </li>
          <li>
            <span className="font-bold text-(--color-neon-green)">
              SentinelAuth:
            </span>{" "}
            Multi-tenant AuthaaS with RLS and risk orchestration.
            <a
              href="https://github.com/ar106000a/SentinelAuth"
              target="_blank"
              className="ml-2 underline text-(--color-cyber-cyan)"
            >
              [GITHUB]
            </a>
          </li>
          <li>
            <span className="font-bold text-(--color-neon-green)">
              FlowDesk:
            </span>{" "}
            Freelance management system with Kanban boards, real-time
            WebSockets, and a custom Express.js Auth API (JWT/Bcrypt/Supabase).
            <a
              href="https://github.com/ar106000a/flowdesk-frontend"
              target="_blank"
              className="ml-2 underline text-(--color-cyber-cyan)"
            >
              [GITHUB]
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-(--color-cyber-cyan) border-b border-(--color-terminal-border) pb-1 mb-2">
          [ 03 ] CURRENT TRAJECTORY
        </h3>
        <p>
          Currently scaling the architecture for a new technical solutions
          agency. Deepening engineering expertise through a{" "}
          <span className="text-(--color-neon-green)">
            3-month Dev Weekends Fellowship
          </span>
          , grinding through advanced system design and DSA. Actively hardening
          production systems like SentinelAuth for high-scale deployment.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-(--color-cyber-cyan) border-b border-(--color-terminal-border) pb-1 mb-2">
          [ 04 ] OFF-SCREEN RUNTIME
        </h3>
        <p>
          The obsession with high performance extends beyond the terminal. When
          I am not writing strict database schemas, I am running structured
          high-low athletic microcycles. I train as a fast bowler in cricket
          with a very specific metric in mind: hitting the{" "}
          <span className="text-(--color-neon-green) font-bold">145kph</span>{" "}
          mark. Usually with <span className="italic">Bayan</span> playing on
          the headphones.
        </p>
      </div>
    </div>
  ),
  "projects.json": (
    <div className="text-sm font-mono leading-relaxed p-2 bg-[#1a1a1a] rounded border border-[#333]">
      <div className="text-gray-500 mb-2">{`// project_manifest_v1.0.json`}</div>

      <pre className="text-gray-300">
        {`{
  "portfolio": [`}
        <div className="ml-4">
          {/* SentinelAuth */}
          {`{
    "name": `}
          <span className="text-yellow-300">{"SentinelAuth"}</span>
          {`,
    "type": `}
          <span className="text-yellow-300">{"AuthaaS"}</span>
          {`,
    "link": `}
          <a
            href="https://github.com/ali-raza/sentinel-auth"
            target="_blank"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {"github.com/ali-raza/sentinel-auth"}
          </a>
          {`,
    "status": `}
          <span className="text-green-400">{"Production-Hardened \n"}</span>
          {`},\n`}

          {/* DevBrief */}
          {`{
    "name": `}
          <span className="text-yellow-300">{"DevBrief"}</span>
          {`,
    "type": `}
          <span className="text-yellow-300">{"Build-Plan Engine"}</span>
          {`,
    "link": `}
          <a
            href="https://devbrief.example.com"
            target="_blank"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {"devbrief.example.com"}
          </a>
          {`,
    "status": `}
          <span className="text-green-400">{"Launched\n"}</span>
          {`},\n`}

          {/* FlowDesk */}
          {`{
    "name": `}
          <span className="text-yellow-300">{"FlowDesk"}</span>
          {`,
    "type": `}
          <span className="text-yellow-300">{"Freelance Management"}</span>
          {`,
    "link": `}
          <a
            href="https://github.com/ali-raza/flowdesk"
            target="_blank"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {"github.com/ali-raza/flowdesk"}
          </a>
          {`,
    "status": `}
          <span className="text-green-400">{"Active Development\n"}</span>
          {`}\n`}
        </div>
        {`]}`}
      </pre>
    </div>
  ),
  "stack.sys": (
    <div className="space-y-4 text-(--color-pale-green)/90 font-mono text-sm max-w-xl">
      <div className="text-gray-500">{"// system_architecture_radar.sys"}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-(--color-cyber-cyan) font-bold uppercase">
            Runtime / Language
          </h4>
          <p>TypeScript, Node.js, Hono</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-(--color-cyber-cyan) font-bold uppercase">
            Database / ORM
          </h4>
          <p>PostgreSQL, Drizzle ORM</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-(--color-cyber-cyan) font-bold uppercase">
            Infrastructure
          </h4>
          <p>Vercel, Railway, Render</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-(--color-cyber-cyan) font-bold uppercase">
            Validation
          </h4>
          <p>Zod (v4), Auth API</p>
        </div>
      </div>
    </div>
  ),
  "contact.inf": (
    <div className="space-y-3 font-mono text-sm text-(--color-pale-green)/90">
      <div className="text-gray-500">{"// communication_interface.inf"}</div>
      <div className="space-y-1">
        <p>
          <span className="text-(--color-neon-green)">EMAIL:</span>{" "}
          ar1062000a@gmail.com
        </p>
        <p>
          <span className="text-(--color-neon-green)">GITHUB:</span>{" "}
          <a
            href="https://github.com/ar106000a"
            target="_blank"
            className="underline text-(--color-cyber-cyan)"
          >
            github.com/ar106000a
          </a>
        </p>
        <p>
          <span className="text-(--color-neon-green)">LINKEDIN:</span>{" "}
          <a
            href="https://linkedin.com/in/ali-raza-02391a338"
            target="_blank"
            className="underline text-(--color-cyber-cyan)"
          >
            linkedin.com/in/ali-raza
          </a>
        </p>
        <p className="mt-4 text-gray-400 italic">
          {"Open for technical consulting and SaaS build partnerships."}
        </p>
      </div>
    </div>
  ),
  "metrics.dat": (
    <div className="space-y-4 font-mono text-sm text-(--color-terminal-text)/90">
      <div className="text-gray-500">{"// telemetry_report.dat"}</div>
      <div className="bg-transparent p-3 rounded border border-[#333]">
        <div className="flex justify-between border-b border-[#333] pb-2 mb-2">
          <span>TOTAL_COMMITS</span>
          <span className="text-(--color-neon-green) font-bold">340+</span>
        </div>
        <div className="flex justify-between border-b border-[#333] pb-2 mb-2">
          <span>SYSTEM_UPTIME</span>
          <span className="text-(--color-neon-green) font-bold">99.9%</span>
        </div>
        <div className="flex justify-between border-b border-[#333] pb-2 mb-2">
          <span>FOCUS_HOURS_WEEKLY</span>
          <span className="text-(--color-neon-green) font-bold">45H</span>
        </div>
        <div className="flex justify-between">
          <span>DSA_PROBLEMS_SOLVED</span>
          <span className="text-(--color-neon-green) font-bold">100+</span>
        </div>
      </div>
    </div>
  ),

  //   "sentinel_auth.cfg": (
  //     <div className="space-y-2 text-(--color-pale-green)/90">
  //       <p className="font-bold text-(--color-cyber-cyan) text-lg">
  //         PROJECT: SENTINEL_AUTH (Multi-Tenant AuthaaS)
  //       </p>
  //       <ul className="list-disc list-inside space-y-1 ml-2">
  //         <li>
  //           Built dynamic context isolation tiers directly over strict PostgreSQL
  //           Row-Level Security (RLS).
  //         </li>
  //         <li>Architected advanced risk orchestration flows.</li>
  //       </ul>
  //     </div>
  //   ),

  //   "dev_brief.json": (
  //     <div className="space-y-2 text-(--color-pale-green)/90">
  //       <p className="font-bold text-(--color-cyber-cyan) text-lg">
  //         PROJECT: DEV_BRIEF (Solo SaaS Production Build)
  //       </p>
  //       <ul className="list-disc list-inside space-y-1 ml-2">
  //         <li>
  //           Hardened validation constraints utilizing Zod v4 direct email()
  //           routing.
  //         </li>
  //         <li>Implemented non-optional methods for strict type safety.</li>
  //         <li>
  //           Shipped from concept to structured build plan engine in 14 days.
  //         </li>
  //       </ul>
  //     </div>
  //   ),
};

// Map shortcuts to their actual file names
export const FILE_ALIASES: Record<string, string> = {
  stack: "stack.sys",
  contact:"contact.inf",
  metrics: "metrics.dat",
  bio: "bio.md",
};
