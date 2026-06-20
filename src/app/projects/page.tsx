import { PROJECTS } from "@/lib/projects";

export default async function ProjectsMatrixPage() {
  return (
    <div className="border border-(--color-terminal-border) bg-(--color-terminal-bg) p-4 font-mono text-[11px] flex flex-col flex-1 min-h-0">
      {/* Header stays fixed */}
      <div className="text-(--color-cyber-cyan) font-bold border-b border-(--color-terminal-border)/40 pb-2 mb-3 uppercase tracking-wider flex justify-between shrink-0">
        <span>SYSTEM_MANIFEST_STREAM</span>
        <span className="text-(--color-dim-green)">
          {PROJECTS.length}_ACTIVE_NODES
        </span>
      </div>

      {/* SCROLLABLE AREA: This needs to be flex-1 and min-h-0 */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-(--color-terminal-border) scrollbar-track-transparent">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="border border-(--color-terminal-border) p-3 bg-(--color-terminal-pane)/30 hover:border-(--color-neon-green)/50 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <a
                href={p.link}
                target="_blank"
                className="text-(--color-neon-green) font-bold hover:underline"
              >
                [{p.id}] {p.name}
              </a>
              <span className="text-(--color-dim-green)">{p.version}</span>
            </div>

            <div className="space-y-1.5 text-(--color-pale-green)">
              <div className="flex justify-between">
                <span className="text-(--color-pale-green)">CATEGORY:</span>{" "}
                {p.category}
              </div>
              <div className="flex justify-between text-(--color-cyber-cyan)">
                <span className="text-(--color-pale-green)">STACK:</span>{" "}
                {p.stack.join(", ")}
              </div>
              <div className="mt-2 pt-2 border-t border-(--color-terminal-border)/30">
                <div className="flex justify-between text-(--color-pale-green)">
                  <span>LAST_COMMIT [{p.lastCommit.hash}]:</span>
                  <span className="text-(--color-cyber-cyan)">
                    {p.lastCommit.timestamp}
                  </span>
                </div>
                <div className="text-(--color-cyber-cyan) italic mt-0.5">
                  {`"${p.lastCommit.message}"`}
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-[10px]">
              <span className="text-(--color-pale-green)">
                DELTA_CODE: <span className="text-white">{p.linesChanged}</span>
              </span>
              <span
                className={`px-1.5 py-0.5 border ${
                  p.status === "ONLINE"
                    ? "text-(--color-neon-green) border-(--color-neon-green)/30"
                    : "text-yellow-500 border-yellow-500/30"
                }`}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
