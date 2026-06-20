"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/experience";

export default function ExperienceLogPage() {
  return (
    <div className="w-full h-full flex flex-col bg-(--color-terminal-bg) font-mono text-[13px] text-(--color-pale-green) relative overflow-hidden">
      {/* ================= 1. TOP HEADER TOOLBAR ================= */}
      <div className="flex justify-between items-center border-b border-(--color-terminal-border) bg-(--color-terminal-bg) p-3 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-(--color-pale-green) font-bold flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            /usr/history --readonly
          </span>
        </div>
        <div className="text-[12px] text-(--color-dim-green) flex items-center gap-2">
          <span className="text-(--color-pale-green)">HEAD -&gt; main</span>
          <span className="text-(--color-dim-green)">&gt;</span>
          <span>experience.log</span>
        </div>
      </div>

      {/* ================= 2. MAIN SPLIT LAYOUT ================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* --- LEFT: STICKY STACK TIMELINE --- */}
        <div className="flex-1 overflow-y-auto p-6 relative scrollbar-thin scrollbar-thumb-(--color-terminal-border) scrollbar-track-transparent">
          {/* pb-[60vh] gives the "runway" needed for the last card to scroll up and stack */}
          <div className="max-w-3xl mx-auto space-y-8 pb-[60vh]">
            {EXPERIENCE.map((exp, index) => {
              // 56px offset ensures the top headers of stacked cards remain visible
              const topOffset = 24 + index * 56;

              return (
                <motion.div
                  key={exp.id}
                  style={{ top: `${topOffset}px` }}
                  className="sticky border border-(--color-terminal-border) bg-(--color-terminal-bg)/95 backdrop-blur-md p-5 hover:border-(--color-neon-green)/50 transition-colors shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Custom Expo-Out curve for premium, snappy stop
                  }}
                >
                  {/* Card Telemetry Header */}
                  <div className="flex justify-between items-start mb-4 border-b border-(--color-terminal-border)/30 pb-2">
                    <div>
                      <div className="text-(--color-cyber-cyan) font-bold text-[14px]">
                        commit {exp.id}
                      </div>
                      <div className="text-white text-[15px] font-bold mt-1">
                        {exp.role}
                      </div>
                    </div>
                    <div className="text-(--color-neon-green) font-bold tracking-wider text-[12px] bg-(--color-neon-green)/10 border border-(--color-neon-green)/20 px-2 py-0.5">
                      {exp.duration}
                    </div>
                  </div>

                  {/* Metadata Segment */}
                  <div className="mb-4 space-y-0.5 text-[11px] text-(--color-dim-green)">
                    <div>{`SYS_NODE: ${exp.company} // ${exp.location}`}</div>
                    <div>
                      DIFF_STAT: --- a/experience/role +++ b/experience/role
                    </div>
                  </div>

                  {/* Terminal Log Points */}
                  <div className="space-y-2.5 border-l border-(--color-terminal-border)/40 pl-4 ml-1 text-(--color-pale-green)">
                    {exp.points.map((point, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        <span className="text-(--color-neon-green) mr-1.5 font-bold">
                          +
                        </span>
                        {point}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT: TELEMETRY & SYSTEM INFO SIDEBAR --- */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-(--color-terminal-border) bg-(--color-terminal-bg) p-6 overflow-y-auto shrink-0 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-(--color-terminal-border)/30">
          {/* Section 1: Core System Node Profile */}
          <div className="space-y-3">
            <h3 className="text-(--color-pale-green) font-bold text-[12px] uppercase tracking-wider border-b border-(--color-terminal-border)/30 pb-1">
              OPERATOR_IDENTITY
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-(--color-dim-green)">SEC_LEVEL</span>
                <span className="text-(--color-cyber-cyan) font-bold">
                  LEVEL_4_ENG
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--color-dim-green)">DESIGNATION</span>
                <span className="text-white">FULL_STACK_ARCHITECT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--color-dim-green)">KERNEL_CORE</span>
                <span className="text-(--color-pale-green)">
                  PERN_OPTIMIZED
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Environment Variables */}
          <div className="space-y-3">
            <h3 className="text-(--color-pale-green) font-bold text-[12px] uppercase tracking-wider border-b border-(--color-terminal-border)/30 pb-1">
              ENV_RUNTIME_CONFIG
            </h3>
            <div className="space-y-2 font-mono text-[11px] bg-(--color-terminal-pane)/20 border border-(--color-terminal-border)/40 p-3 rounded-xs select-text">
              <div>
                <span className="text-(--color-cyber-cyan)">NODE_ENV</span>=
                <span className="text-(--color-neon-green)">{`"production"`}</span>
              </div>
              <div>
                <span className="text-(--color-cyber-cyan)">
                  RUNTIME_ENGINE
                </span>
                =<span className="text-yellow-500">{}</span>
              </div>
              <div>
                <span className="text-(--color-cyber-cyan)">DB_LAYER</span>=
                <span className="text-purple-400">{`"Drizzle_ORM"`}</span>
              </div>
              <div>
                <span className="text-(--color-cyber-cyan)">
                  STRICT_VALIDATION
                </span>
                =<span className="text-(--color-neon-green)">{`"Zod_v4"`}</span>
              </div>
              <div>
                <span className="text-(--color-cyber-cyan)">
                  ASYNC_STRATEGY
                </span>
                =<span className="text-white">{`"Edge_Light"`}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Physical Station Box (Preserved Graphic Element) */}
          <div className="space-y-3">
            <h3 className="text-(--color-pale-green) font-bold text-[12px] uppercase tracking-wider border-b border-(--color-terminal-border)/30 pb-1">
              PHYSICAL_STATION
            </h3>
            <div className="w-full h-28 border border-(--color-terminal-border) bg-[#070707] relative flex flex-col justify-end p-3 overflow-hidden select-none">
              <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(transparent,transparent_4px,var(--color-terminal-border)_4px,var(--color-terminal-border)_5px)]"></div>
              <div className="relative z-10 w-full text-left font-mono text-[10px] space-y-0.5">
                <div className="text-(--color-dim-green)">SECTOR: 07-PK</div>
                <div className="text-(--color-neon-green)">
                  THERMAL_NODE: 36°C
                </div>
                <div className="text-(--color-dim-green)">
                  FAN_SPEED: 4200_RPM
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: System Resource Allocations */}
          <div className="space-y-3">
            <h3 className="text-(--color-pale-green) font-bold text-[12px] uppercase tracking-wider border-b border-(--color-terminal-border)/30 pb-1">
              RESOURCE_ALLOCATION
            </h3>
            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between text-[10px] text-(--color-dim-green) mb-1">
                  <span>POSTGRES_POOL</span>
                  <span>14 / 20 CONN</span>
                </div>
                <div className="w-full h-1 bg-(--color-terminal-border)/30 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-(--color-cyber-cyan)"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-(--color-dim-green) mb-1">
                  <span>MEMORY_CACHE</span>
                  <span>184MB / 512MB</span>
                </div>
                <div className="w-full h-1 bg-(--color-terminal-border)/30 rounded-full overflow-hidden">
                  <div className="h-full w-[36%] bg-(--color-neon-green)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. BOTTOM STATUS FOOTER ================= */}
      <div className="h-8 border-t border-(--color-terminal-border) bg-(--color-terminal-bg) flex justify-between items-center px-4 shrink-0 text-[11px] select-none">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-(--color-neon-green) rounded-full animate-pulse"></span>
            CONNECTED
          </span>
          <span className="text-(--color-dim-green) hidden sm:block">
            ENC: AES-256-GCM
          </span>
        </div>
        <div className="flex items-center gap-4 text-(--color-dim-green)">
          <span>STRM_LN: {EXPERIENCE.length * 12}</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
