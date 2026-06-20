"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FILE_ALIASES, VIRTUAL_FILE_SYSTEM } from "@/lib/terminalFiles";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const VALID_COMMANDS = [
  "help",
  "ls",
  "cat",
  "clear",
  "goto",
  "cd",
  "whoami",
  "date",
  "uptime",
  "theme",
  "sudo",
];
const VALID_FILES = [...Object.keys(VIRTUAL_FILE_SYSTEM)];

export default function TerminalShell() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "system --init",
      output: (
        <div className="text-(--color-dim-green) space-y-1">
          <p>HYBRID_CORE_TERMINAL v4.1.0-PRODUCTION (x86_64-pc-linux-gnu)</p>
          <p>Subsystem sync initialized via local environment records... OK.</p>
          <p>
            Type{" "}
            <span className="text-(--color-neon-green) font-bold">help</span> to
            drop comprehensive command logs.
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("term_command_history");
      if (savedHistory) {
        try {
          return JSON.parse(savedHistory);
        } catch (e) {
          console.log("Error received while retrieving command history , ", e);
        }
      }
    }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [temporaryInput, setTemporaryInput] = useState("");

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const trimmedInput = input.trim();
      const currentTokens = trimmedInput ? trimmedInput.split(/\s+/) : [];

      // Preserve the trailing space so "cd " doesn't collapse into "cd"
      if (input.endsWith(" ") && trimmedInput) {
        currentTokens.push("");
      }

      const currentLastToken =
        currentTokens[currentTokens.length - 1]?.toLowerCase() || "";

      if (currentTokens.length === 1 && currentLastToken) {
        // Base command autocomplete
        const match = VALID_COMMANDS.find((cmd) =>
          cmd.startsWith(currentLastToken),
        );
        if (match) setInput(match + " ");
      } else if (
        currentTokens.length === 2 &&
        currentTokens[0].toLowerCase() === "cat"
      ) {
        // Cat file autocomplete (Upgraded to loop!)
        const exactFileIndex = VALID_FILES.indexOf(currentLastToken);

        if (exactFileIndex !== -1) {
          const nextFile =
            VALID_FILES[(exactFileIndex + 1) % VALID_FILES.length];
          setInput(`cat ${nextFile}`);
        } else {
          const matches = VALID_FILES.filter((file) =>
            file.startsWith(currentLastToken),
          );
          if (matches.length > 0) setInput(`cat ${matches[0]}`);
        }
      } else if (
        currentTokens.length === 2 &&
        (currentTokens[0].toLowerCase() === "goto" ||
          currentTokens[0].toLowerCase() === "cd")
      ) {
        const cmd = currentTokens[0].toLowerCase();
        const targets = ["projects", "experience", "connect"];

        // 1. Check if what is currently typed is ALREADY a valid target
        const exactMatchIndex = targets.indexOf(currentLastToken);

        if (exactMatchIndex !== -1) {
          // 2. We are actively cycling! Grab the NEXT item in the array.
          const nextTarget = targets[(exactMatchIndex + 1) % targets.length];
          setInput(`${cmd} ${nextTarget}`);
        } else {
          // 3. Not cycling yet, do standard prefix filtering
          const matches = targets.filter((t) => t.startsWith(currentLastToken));
          if (matches.length > 0) {
            setInput(`${cmd} ${matches[0]}`);
          }
        }
      }
    }

    // ... ArrowUp / ArrowDown logic remains the same down here

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex === 0) setTemporaryInput(input);
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (nextIndex === -1) {
        setHistoryIndex(-1);
        setInput(temporaryInput);
      }
    }
  };

  const handleCommandExecution = (e: React.SubmitEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const updatedHistory = [...commandHistory, trimmedInput];
    setCommandHistory(updatedHistory);
    localStorage.setItem(
      "term_command_history",
      JSON.stringify(updatedHistory),
    );
    setHistoryIndex(-1);

    const args = trimmedInput.split(/\s+/);
    const baseCommand = args[0].toLowerCase();
    const flags = args.slice(1).filter((arg) => arg.startsWith("-"));
    const normalArgs = args.slice(1).filter((arg) => !arg.startsWith("-"));

    let commandOutput: React.ReactNode = "";

    switch (baseCommand) {
      case "help":
        commandOutput = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-(--color-terminal-text)/90 max-w-2xl">
            <div>
              <span className="text-(--color-neon-green) font-bold">help</span>{" "}
              - Display system capabilities matrix.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                ls [-l | -a | -la]
              </span>{" "}
              - List allocation files and payloads.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                cat [file]
              </span>{" "}
              - Buffer raw system details to stdout.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                goto [target]
              </span>{" "}
              - Direct routing pipeline update.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                whoami
              </span>{" "}
              - Identity parameters validation output.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                date / uptime
              </span>{" "}
              - Telemetry runtime execution stamps.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">
                theme [dark|light]
              </span>{" "}
              - Toggle active visual architecture interface.
            </div>
            <div>
              <span className="text-(--color-neon-green) font-bold">clear</span>{" "}
              - Flush current line buffers.
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "whoami":
        commandOutput = (
          <div className="text-(--color-pale-green)">
            <span className="text-(--color-terminal-text) font-bold">
              Ali-Raza
            </span>{" "}
            full-stack-engineer // computer-science-student
          </div>
        );
        break;

      case "date":
        commandOutput = <span>{new Date().toUTCString()}</span>;
        break;

      case "uptime":
        const uptimeSeconds = Math.floor(performance.now() / 1000);
        commandOutput = (
          <span>
            up {Math.floor(uptimeSeconds / 60)} min, local sequence core
            operational efficiency optimal.
          </span>
        );
        break;

      case "sudo":
        commandOutput = (
          <span className="text-red-500 font-bold">
            ERR: guest is not in the sudoers file. This incident will be
            reported.
          </span>
        );
        break;

      case "theme":
        const targetTheme = normalArgs[0]?.toLowerCase();
        if (targetTheme === "light" || targetTheme === "dark") {
          document.documentElement.setAttribute("data-theme", targetTheme);
          if (targetTheme === "light") {
            document.documentElement.classList.add("light");
          } else {
            document.documentElement.classList.remove("light");
          }
          localStorage.setItem("term_matrix_theme", targetTheme);
          commandOutput = (
            <span className="text-(--color-neon-green)">
              Interface structural variables shifted to {targetTheme} palette.
            </span>
          );
        } else {
          commandOutput = (
            <span className="text-red-500">Usage: theme [dark | light]</span>
          );
        }
        break;

      case "ls":
        const isLongForm = flags.includes("-l");
        const isAllForm = flags.includes("-a");
        const isLongAllForm = flags.includes("-la");
        if (isLongAllForm) {
          commandOutput = (
            <div className="space-y-1 text-(--color-pale-green)">
              <p>-rw-r--r-- 1 guest staff 512 Jun 15 17:39 .env.production</p>
              <p>-rw-r--r-- 1 guest staff 1024 Jun 15 17:39 bio.md</p>
              <p>-rw-r--r-- 1 guest staff 2048 Jun 15 17:39 contact.inf</p>
              <p>-rw-r--r-- 1 guest staff 4096 Jun 15 17:39 metrics.dat</p>
              <p>-rw-r--r-- 1 guest staff 8192 Jun 15 17:39 projects.json</p>
            </div>
          );
        } else if (isLongForm) {
          commandOutput = (
            <div className="space-y-1 text-(--color-pale-green)">
              {isAllForm && (
                <p>-rw-r--r-- 1 guest staff 512 Jun 15 17:39 .env.production</p>
              )}
              <p>-rw-r--r-- 1 guest staff 1024 Jun 15 17:39 bio.md</p>
              <p>-rw-r--r-- 1 guest staff 2048 Jun 15 17:39 contact.inf</p>
              <p>-rw-r--r-- 1 guest staff 4096 Jun 15 17:39 metrics.dat</p>
              <p>-rw-r--r-- 1 guest staff 8192 Jun 15 17:39 projects.json</p>
            </div>
          );
        } else {
          commandOutput = (
            <div className="flex flex-wrap gap-6 text-(--color-cyber-cyan) font-bold">
              {isAllForm && (
                <span className="text-amber-600">.env.production</span>
              )}
              <span>bio.md</span>
              <span>projects.json</span>
              <span>contact.inf</span>
              <span>metrics.dat</span>
            </div>
          );
        }
        break;

      case "cat": {
        const rawTarget = normalArgs[0]?.toLowerCase();

        // 1. Handle missing arguments
        if (!rawTarget) {
          commandOutput = (
            <span className="text-red-500">
              ERR: Missing file pointer descriptor. Target syntax: cat
              [filename]
            </span>
          );
          break;
        }

        // 2. The Easter Egg
        if (rawTarget === ".env.production") {
          commandOutput = (
            <span className="text-red-400 font-bold">
              ACCESS ENFORCEMENT DISALLOWED: Decryption keys missing.
            </span>
          );
          break;
        }

        // 3. Resolve aliases (if 'devbrief' is typed, it becomes 'dev_brief.json')
        const actualFileName = FILE_ALIASES[rawTarget] || rawTarget;

        // 4. Look up the file in our dictionary
        const fileContent = VIRTUAL_FILE_SYSTEM[actualFileName];

        if (fileContent) {
          commandOutput = fileContent;
        } else {
          commandOutput = (
            <span className="text-red-500">
              ERR: File descriptor target unallocated: {rawTarget}
            </span>
          );
        }
        break;
      }

      case "goto":
        const targetSector = normalArgs[0]?.toLowerCase();
        if (["projects", "experience", "connect"].includes(targetSector)) {
          commandOutput = (
            <span className="text-(--color-neon-green)">
              Mapping destination to /{targetSector}...
            </span>
          );
          setTimeout(() => {
            if (targetSector === "connect") router.push("/ssh/connect");
            else router.push(`/src/${targetSector}`);
          }, 500);
        } else {
          commandOutput = (
            <span className="text-red-500">
              ERR: Unknown virtual track reference: {normalArgs[0]}
            </span>
          );
        }
        break;

      case "cd":
        const targetSectorCd = normalArgs[0]?.toLowerCase();
        if (["projects", "experience", "connect"].includes(targetSectorCd)) {
          commandOutput = (
            <span className="text-(--color-neon-green)">
              Mapping destination to /{targetSectorCd}...
            </span>
          );
          setTimeout(() => {
            if (targetSectorCd === "connect") router.push("/ssh/connect");
            else router.push(`/src/${targetSectorCd}`);
          }, 500);
        } else {
          commandOutput = (
            <span className="text-red-500">
              ERR: Unknown virtual track reference: {normalArgs[0]}
            </span>
          );
        }
        break;

      default:
        commandOutput = (
          <span className="text-red-500">
            bash: command unrecognized: &apos;{baseCommand}&apos;. Run
            &apos;help&apos;.
          </span>
        );
    }

    setHistory((prev) => [
      ...prev,
      { command: trimmedInput, output: commandOutput },
    ]);
    setInput("");
  };

  return (
    <div
      onClick={focusTerminal}
      className="w-full h-full flex flex-col bg-(--color-terminal-bg) border border-(--color-terminal-border) font-mono text-[13px] text-(--color-pale-green) cursor-text select-text overflow-hidden"
    >
      <style>{`
        .terminal-scroll-area { scrollbar-width: none; -ms-overflow-style: none; }
        .terminal-scroll-area::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Shell Control Bar */}
      <div className="w-full h-7 border-b border-(--color-terminal-border) flex justify-between items-center px-3 bg-(--color-terminal-pane) select-none shrink-0">
        <div className="text-[11px] text-(--color-dim-green)] font-bold flex items-center gap-1.5">
          <span>⚙️ BASH_SESSION</span>
          <span className="text-(--color-terminal-border)">|</span>
          <span>TTY:/dev/pts/1</span>
        </div>
        <div className="text-[11px] text-(--color-neon-green) font-bold">
          SYS_ACTIVE
        </div>
      </div>

      {/* Terminal Content Logger Track */}
      <div className="terminal-scroll-area flex-1 p-4 overflow-y-auto space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 wrap-break-word">
            <div className="flex items-center space-x-2">
              <span className="text-(--color-neon-green) font-bold">
                guest@portfolio:~$
              </span>
              <span className="text-(--color-terminal-text) font-medium">
                {item.command}
              </span>
            </div>
            <div className="pl-4 border-l border-(--color-terminal-border)/20 text-(--color-pale-green)/90 leading-relaxed">
              {item.output}
            </div>
          </div>
        ))}

        {/* Real-time Buffered Prompt Form */}
        <form
          onSubmit={handleCommandExecution}
          className="flex items-center space-x-2 pt-1"
        >
          <span className="text-(--color-neon-green) font-bold shrink-0">
            guest@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-(--color-terminal-text) font-mono text-[13px] caret-(--color-terminal-text)"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
