import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import styles from "./TerminalShell.module.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HOME://USER@LOCAL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // These paths match our clean rewrites perfectly now
  const navItems = [
    { label: "root", path: "/" },
    { label: "src/projects", path: "/src/projects" },
    { label: "src/experience", path: "/src/experience" },
    { label: "ssh/connect", path: "/ssh/connect" },
  ];

  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} `}
      suppressHydrationWarning
    >
      <head>
        {/* Inline blocker script to instantly sync themes globally across reloads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem("term_matrix_theme") || "dark";
                document.documentElement.setAttribute("data-theme", saved);
                if (saved === "light") {
                  document.documentElement.classList.add("light");
                } else {
                  document.documentElement.classList.remove("light");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-hidden select-none">
        <div className={styles.screen}>
          <div
            className={
              styles.flickerWrapper +
              " h-full w-full flex flex-col font-mono text-[13px]"
            }
          >
            {/* Top Navigation Bar */}
            <header className="w-full h-9 border-b border-(--color-terminal-border) flex justify-between items-center px-4 bg-(--color-terminal-bg) text-(--color-dim-green) font-bold text-[11px]">
              <div>HYBRID_TERMINAL://USER@LOCAL</div>
              <div className="flex space-x-6 text-(--color-pale-green)">
                <span className="text-(--color-neon-green) hover:underline cursor-pointer">
                  SYSTEM
                </span>
                <span className="hover:underline cursor-pointer text-(--color-dim-green)">
                  NETWORK
                </span>
                <span className="hover:underline cursor-pointer text-(--color-dim-green)">
                  STORAGE
                </span>
              </div>
              <div
                className={
                  " flex items-center space-x-2 text-(--color-pale-green)]"
                }
              >
                <span className="animate-pulse">[● ONLINE]</span>
              </div>
            </header>

            {/* Application Split Shell */}
            <div className="flex-1 flex w-full overflow-hidden">
              {/* PERSISTENT SIDEBAR */}
              <aside
                className="hidden md:flex w-60 border-r border-(--color-terminal-border) 
               flex-col justify-between p-4 bg-(--color-terminal-bg) shrink-0"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-(--color-neon-green) font-bold text-[15px] tracking-tight">
                      HYBRID_TERMINAL_V1.0
                    </div>
                    <div className="text-(--color-dim-green) text-[11px]">
                      status: operational
                    </div>
                  </div>

                  <button className="w-full border border-(--color-terminal-border) py-2 text-center text-(--color-pale-green) font-bold hover:bg-(--color-neon-green) hover:text-(--color-terminal-bg) transition-colors cursor-pointer">
                    + NEW_SESSION
                  </button>

                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <a
                        key={item.path}
                        href={item.path}
                        className="group flex items-center px-2 py-1.5 border border-transparent text-(--color-pale-green) hover:bg-(--color-dim-green)/10 hover:border-(--color-terminal-border) transition-all"
                      >
                        <span className="text-(--color-dim-green) group-hover:text-(--color-neon-green) mr-2 font-bold">
                          &lt;&gt;
                        </span>
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="text-(--color-dim-green) text-[11px] space-y-1 border-t border-(--color-terminal-border) pt-4">
                  <div>TTY: /DEV/PTS/0</div>
                  <div>LOC_AUTH: TRUSTED</div>
                </div>
              </aside>

              {/* ROUTE VIEWPORT */}
              <main className="flex-1 flex flex-col bg-(--color-terminal-bg) overflow-y-auto relative">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
