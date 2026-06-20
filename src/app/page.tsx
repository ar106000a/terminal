import TerminalShell from "@/components/TerminalShell";
import Image from "next/image";

export default function HomeDashboardPage() {
  return (
    <div className="w-full min-h-[calc(100vh-36px)] p-4 bg-(--color-terminal-bg) grid grid-cols-1 xl:grid-cols-12 gap-4 auto-rows-max xl:auto-rows-fr">
      {/* LEFT COLUMN: Main Interactive Console Shell (Forces fixed calculation on desktop) */}
      <main className="xl:col-span-8 h-[60vh] xl:h-[calc(100vh-68px)] flex flex-col">
        <TerminalShell />
      </main>

      <aside className="xl:col-span-4 flex flex-col gap-4 h-auto xl:h-[calc(100vh-68px)] overflow-y-auto xl:overflow-y-hidden">
        {/* NEW: Visual Identification Header */}
        <div className="border border-(--color-terminal-border) bg-(--color-terminal-pane) p-2 flex items-center gap-3">
          <div className="w-16 h-16 bg-[#222] border border-(--color-terminal-border) flex items-center justify-center overflow-hidden">
            {/* PLACEHOLDER FOR IMAGE: Use a 1:1 aspect ratio logo or professional headshot */}
            {/* <span className="text-[10px] text-(--color-dim-green)">
              [ IMAGE ]
            </span> */}
            <Image src="/image.jpg" alt="image pfp" width={200} height={200} />
          </div>
          <div className="font-mono text-[11px] leading-tight">
            <div className="text-(--color-neon-green) font-bold">ALI RAZA</div>
            <div className="text-(--color-pale-green)">SYSTEM ARCHITECT</div>
            <div className="text-(--color-dim-green) mt-1 italic">
              STATUS: ACCEPTING PARTNERSHIPS
            </div>
          </div>
        </div>

        {/* Widget Block 1: Current Operational Focus */}
        <div className="border border-(--color-terminal-border) bg-(--color-terminal-pane) p-4 font-mono text-[12px]">
          <div className="text-(--color-neon-green) font-bold border-b border-(--color-terminal-border) pb-2 mb-3 uppercase tracking-wider">
            CURRENT_FOCUS_STREAM
          </div>
          <div className="space-y-3 text-(--color-pale-green)">
            <div className="flex justify-between">
              <span className="text-(--color-dim-green)">PRIMARY_GOAL</span>
              <span className="text-(--color-text) font-bold">
                AGENCY_INFRA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--color-dim-green)">FELLOWSHIP</span>
              <span className="text-(--color-text)">DEV_WEEKENDS_V2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--color-dim-green)">VALIDATION</span>
              <span className="text-(--color-text)">ZOD_V4_CORE</span>
            </div>
          </div>
        </div>

        {/* Widget Block 2: Active Cluster Nodes */}
        <div className="border border-(--color-terminal-border) bg-(--color-terminal-bg) p-4 font-mono text-[12px] flex-1 flex flex-col">
          <div className="text-(--color-cyber-cyan) font-bold border-b border-(--color-terminal-border)/40 pb-2 mb-3 uppercase tracking-wider">
            ACTIVE_CLUSTER_NODES
          </div>
          <div className="space-y-3 flex-1">
            {/* Mapping these makes it easier to update status later */}
            {[
              { name: "SENTINEL_AUTH", status: "DEVELOPMENT", version: "v1.0" },
              { name: "DEV_BRIEF", status: "ONLINE", version: "v2.1" },
              { name: "FLOWDESK", status: "STAGING", version: "alpha" },
            ].map((node) => (
              <div
                key={node.name}
                className="flex justify-between items-center text-[11px]"
              >
                <span className="text-(--color-pale-green) font-bold">
                  {node.name}
                </span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] border ${
                    node.status === "ONLINE"
                      ? "text-(--color-neon-green) bg-(--color-neon-green)/10 border-(--color-neon-green)/30"
                      : "text-yellow-500 bg-yellow-500/10 border-yellow-500/30 animate-pulse"
                  }`}
                >
                  {node.status}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-(--color-dim-green) border-t border-(--color-terminal-border)/20 pt-2 mt-2">
            INTEGRITY: 100% | TZ: PKT
          </div>
        </div>
      </aside>
    </div>
  );
}
