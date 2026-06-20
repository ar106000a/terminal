"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectPage() {
  // --- Form State & Interaction Handling ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial system logs
  const [logs, setLogs] = useState<string[]>([
    "> Awaiting localized client input stream...",
    "> SEC_HANDSHAKE: [OK]",
    "> PACKET_STREAM: STABLE",
    "> NODE_READY: WAITING_FOR_PAYLOAD",
  ]);

  // Auto-scroll ref for the log stream
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Append helper
  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  // Replace the handleSubmit function in your page.tsx

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    addLog("> [ SYSTEM ] COMPILING PAYLOAD...");

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      addLog("> [ AUTH ] INITIATING OAUTH HANDSHAKE...");

      // Transmit to our Next.js API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      addLog("> [ NETWORK ] SECURE TUNNEL ESTABLISHED. TRANSMITTING...");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "TRANSMISSION_SUCCESS") {
        addLog("> [ SUCCESS ] PAYLOAD DELIVERED.");
        addLog("> [ SYSTEM ] TERMINATING UPLINK... NODE_RESET.");
        // Reset the physical form inputs
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("API rejected payload.");
      }
    } catch (error) {
      addLog("> [ FATAL_ERROR ] CONNECTION REFUSED OR TIMED OUT.");
      addLog("> [ SYSTEM ] RETAINING BUFFER FOR RETRY.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    addLog("> PURGING_BUFFER... LOCAL_CACHE_CLEARED.");
  };

  return (
    <div className="w-full min-h-[calc(100vh-36px)] p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[var(--color-terminal-bg)] font-mono text-[12px] sm:text-[13px] text-[var(--color-pale-green)] overflow-hidden">
      {/* ================= LEFT TIER: SECURE CRYPTO SHELL HANDSHAKE ================= */}
      <section className="lg:col-span-7 border border-[var(--color-terminal-border)] bg-[var(--color-terminal-bg)] flex flex-col h-auto lg:h-[calc(100vh-80px)] min-h-[500px]">
        {/* Connection Window Header Chrome */}
        <div className="w-full h-7 border-b border-[var(--color-terminal-border)] flex justify-between items-center px-3 bg-[var(--color-terminal-pane)] select-none shrink-0">
          <div className="text-[11px] text-[var(--color-dim-green)] font-bold uppercase tracking-wider">
            🔒 SECURE_TUNNEL // SSH-2.0-OpenSSH_9.2p1
          </div>
          <div className="text-[var(--color-dim-green)]">ID: 0xBC42</div>
        </div>

        {/* Handshake UI Space */}
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="flex-1 p-4 overflow-y-auto space-y-6 flex flex-col justify-between scrollbar-thin scrollbar-thumb-[var(--color-terminal-border)] scrollbar-track-transparent"
        >
          <div className="space-y-6">
            {/* System Handshake Diagnostic Banner */}
            <div className="text-[11px] text-[var(--color-dim-green)] leading-relaxed space-y-0.5 select-none">
              <p>SSH_MSG_KEXINIT sent. Expecting remote key exchange...</p>
              <p>ECDH Curve25519-SHA256 authenticated successfully.</p>
              <p className="text-[var(--color-neon-green)] font-bold">
                [ SUCCESS ] Interactive payload channel open.
              </p>
            </div>

            {/* Field 1: Remote Identity Handle */}
            <div className="space-y-2 group">
              <label className="block text-[var(--color-dim-green)] font-bold select-none group-focus-within:text-[var(--color-neon-green)] transition-colors">
                IDENT_HANDLE (Your Email Address)
              </label>
              <div className="flex items-center border border-[var(--color-terminal-border)] bg-[var(--color-terminal-pane)] px-3 py-2 focus-within:border-[var(--color-neon-green)] focus-within:shadow-[0_0_8px_rgba(57,255,20,0.15)] transition-all">
                <span className="text-[var(--color-neon-green)] mr-2 font-bold select-none">
                  &gt;
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  placeholder="identity@remote-server.com"
                  className="bg-transparent border-none outline-none w-full text-[var(--color-pale-green)] placeholder-[var(--color-dim-green)] caret-[var(--color-neon-green)] disabled:opacity-50"
                />
              </div>
            </div>

            {/* Field 2: Target Subject Segment */}
            <div className="space-y-2 group">
              <label className="block text-[var(--color-dim-green)] font-bold select-none group-focus-within:text-[var(--color-neon-green)] transition-colors">
                ROUTING_TAG (Subject Vector)
              </label>
              <div className="flex items-center border border-[var(--color-terminal-border)] bg-[var(--color-terminal-pane)] px-3 py-2 focus-within:border-[var(--color-neon-green)] focus-within:shadow-[0_0_8px_rgba(57,255,20,0.15)] transition-all">
                <span className="text-[var(--color-neon-green)] mr-2 font-bold select-none">
                  &gt;
                </span>
                <input
                  type="text"
                  name="subject"
                  required
                  disabled={isSubmitting}
                  placeholder="SYSTEM_CONSULTATION // SAAS_BUILD_OUT"
                  className="bg-transparent border-none outline-none w-full text-[var(--color-pale-green)] placeholder-[var(--color-dim-green)] uppercase caret-[var(--color-neon-green)] disabled:opacity-50"
                />
              </div>
            </div>

            {/* Field 3: Text Data Payload Stream */}
            <div className="space-y-2 group">
              <label className="block text-[var(--color-dim-green)] font-bold select-none group-focus-within:text-[var(--color-neon-green)] transition-colors">
                DATA_PAYLOAD (Transmission Core Body)
              </label>
              <div className="flex items-start border border-[var(--color-terminal-border)] bg-[var(--color-terminal-pane)] px-3 py-2 focus-within:border-[var(--color-neon-green)] focus-within:shadow-[0_0_8px_rgba(57,255,20,0.15)] transition-all min-h-[140px]">
                <span className="text-[var(--color-neon-green)] mr-2 font-bold select-none mt-0.5">
                  &gt;
                </span>
                <textarea
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={5}
                  placeholder="Enter explicit architectural specifications, project constraints, or system requests..."
                  className="bg-transparent border-none outline-none w-full text-[var(--color-pale-green)] placeholder-[var(--color-dim-green)] resize-none caret-[var(--color-neon-green)] disabled:opacity-50 scrollbar-thin scrollbar-thumb-[var(--color-terminal-border)] scrollbar-track-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Execution Button Array */}
          <div className="pt-4 border-t border-[var(--color-terminal-border)]/30 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 border py-2 text-center font-bold transition-all ${
                isSubmitting
                  ? "border-[var(--color-dim-green)] text-[var(--color-dim-green)] bg-transparent cursor-not-allowed"
                  : "border-[var(--color-neon-green)] text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/5 hover:bg-[var(--color-neon-green)] hover:text-[var(--color-terminal-bg)] shadow-[0_0_4px_rgba(57,255,20,0.1)] cursor-pointer"
              }`}
            >
              {isSubmitting
                ? "[ TRANSMITTING_DATA... ]"
                : "root@contact: ~# ping -c 1 user (Send)"}
            </button>
            <button
              type="reset"
              disabled={isSubmitting}
              className="px-6 border border-[var(--color-terminal-border)] py-2 text-center text-[var(--color-dim-green)] hover:text-red-400 hover:border-red-500/50 hover:bg-red-950/20 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              PURGE_BUFFER
            </button>
          </div>
        </form>
      </section>

      {/* ================= RIGHT TIER: NETWORK ROUTING TELEMETRY ================= */}
      <section className="lg:col-span-5 flex flex-col gap-4 h-auto lg:h-[calc(100vh-80px)] min-h-[500px]">
        {/* Secure Port Information Panel */}
        <div className="border border-[var(--color-terminal-border)] bg-[var(--color-terminal-bg)] p-4 space-y-4 flex-1">
          <div className="text-[var(--color-dim-green)] font-bold text-[11px] tracking-wide uppercase">
            🛰️ NODE_CONNECTION_METRICS
          </div>

          <div className="space-y-3 font-mono text-[12px]">
            <div className="p-2.5 border border-[var(--color-terminal-border)]/40 bg-[var(--color-terminal-pane)]">
              <span className="text-[var(--color-dim-green)] text-[10px] block">
                DESTINATION_STATION
              </span>
              <span className="text-[var(--color-pale-green)] font-bold">
                ALI_RAZA // CORE_GATEWAY
              </span>
            </div>

            <div className="p-2.5 border border-[var(--color-terminal-border)]/40 bg-[var(--color-terminal-pane)]">
              <span className="text-[var(--color-dim-green)] text-[10px] block">
                ROUTING_PORT
              </span>
              <span className="text-[var(--color-cyber-cyan)] font-bold">
                PORT 22 // SECURE_SHELL
              </span>
            </div>

            <div className="p-2.5 border border-[var(--color-terminal-border)]/40 bg-[var(--color-terminal-pane)]">
              <span className="text-[var(--color-dim-green)] text-[10px] block">
                VALIDATION_ENGINE
              </span>
              <span className="text-[var(--color-pale-green)]">
                ZOD_V4_CORE_PARSER
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[var(--color-dim-green)] leading-relaxed pt-2">
            Transmissions passing through this interface are compiled safely,
            stripped of malicious scripts, and pushed directly into the backend
            datastore pipeline. Expect diagnostic confirmations shortly after
            execution.
          </p>
        </div>

        {/* Real-time Buffer Stream Monitor Panel */}
        <div className="border border-[var(--color-terminal-border)] bg-[var(--color-terminal-pane)] p-4 h-56 flex flex-col justify-between overflow-hidden">
          <div className="text-[var(--color-dim-green)] font-bold text-[11px] uppercase tracking-wider flex justify-between shrink-0 mb-3 border-b border-[var(--color-terminal-border)]/40 pb-2">
            <span>[ live_egress_stream ]</span>
            <span className="animate-pulse text-[var(--color-neon-green)]">
              ● LIVE
            </span>
          </div>

          {/* Animated Log Output */}
          <div className="flex-1 overflow-y-auto font-mono text-[10px] text-[var(--color-dim-green)] space-y-1.5 scrollbar-thin scrollbar-thumb-[var(--color-terminal-border)] scrollbar-track-transparent pr-2">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  // Dynamically color critical success/system messages
                  className={
                    log.includes("[ SUCCESS ]")
                      ? "text-[var(--color-neon-green)] font-bold"
                      : log.includes("[ SYSTEM ]") || log.includes("[ AUTH ]")
                        ? "text-[var(--color-cyber-cyan)]"
                        : ""
                  }
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logsEndRef} />
          </div>

          <div className="text-right text-[10px] text-[var(--color-dim-green)] border-t border-[var(--color-terminal-border)]/30 pt-2 shrink-0 mt-3">
            SECURE REPLICA // SYS_V3
          </div>
        </div>
      </section>
    </div>
  );
}
