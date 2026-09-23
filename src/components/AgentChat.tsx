"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { links } from "@/lib/content";

/**
 * Live-preview of a TELES AGENT exchange.
 * Messages play in sequence with a typing indicator between turns; replayable.
 * Copy is taken from the knowledge base sample sales responses (§10) and the
 * no-guarantees policy (§14) — the agent qualifies and never quotes blind.
 */

type Msg = { from: "user" | "agent"; text: string };

const SCRIPT: Msg[] = [
  { from: "user", text: "Hi — I run a forex signals channel. Can you help me grow?" },
  {
    from: "agent",
    text: "Thanks for reaching out to TELES ADS. Please share your channel or business link, target audience, preferred countries, campaign goal, and approximate budget. We'll review your requirements and recommend a suitable advertising approach.",
  },
  { from: "user", text: "What about pricing?" },
  {
    from: "agent",
    text: "Our pricing depends on your niche, target audience, campaign duration, platforms, creative requirements, and growth objective. Share your details and we'll prepare the most suitable option.",
  },
  {
    from: "agent",
    text: "Campaign performance depends on many factors — we provide strategy and optimization, and we report results honestly. Ready when you are.",
  },
];

const TYPING_MS = 900;
const READ_MS = 1500;

export default function AgentChat() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [runId, setRunId] = useState(0);
  const wrap = useRef<HTMLDivElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /* start when scrolled into view */
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return setStarted(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setStarted(true), io.disconnect()),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* play the script */
  useEffect(() => {
    if (!started) return;
    clear();
    setShown(0);
    setTyping(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(SCRIPT.length);
      return;
    }

    let t = 400;
    SCRIPT.forEach((m, i) => {
      if (m.from === "agent") {
        timers.current.push(window.setTimeout(() => setTyping(true), t));
        t += TYPING_MS;
        timers.current.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
          }, t),
        );
      } else {
        timers.current.push(window.setTimeout(() => setShown(i + 1), t));
      }
      t += READ_MS;
    });

    return clear;
  }, [started, runId]);

  /* keep the newest message in view inside the panel */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  return (
    <section id="agent-preview" className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-1/2 size-[520px] -translate-y-1/2 rounded-full opacity-[0.10] blur-[150px]"
        style={{ background: "var(--accent)" }}
      />

      <div
        ref={wrap}
        className="relative mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20"
      >
        {/* ── copy ── */}
        <div>
          <p className="label">TELES Agent — Live Preview</p>
          <h2 className="mt-7 text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            Watch a conversation start.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.68] text-muted">
            No lead forms that vanish into a void. TELES AGENT opens with the right questions,
            answers straight, and hands warm leads to the team — the same exchange you see here
            runs on Telegram.
          </p>
          <a
            href={links.agentBot}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-bg transition-transform duration-150 active:scale-[0.97]"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            Try TELES Agent
            <span
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        {/* ── chat panel ── */}
        <div className="rounded-2xl border border-line bg-[#0e0e0f] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          {/* header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="label flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="live-ping absolute inline-flex size-full rounded-full bg-[#3ddc84] opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#3ddc84]" />
              </span>
              TELES Agent · Online
            </p>
            <button
              type="button"
              onClick={replay}
              className="label flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 transition-colors duration-200 hover:border-ink/30 hover:text-ink"
            >
              Replay
              <span aria-hidden="true">↻</span>
            </button>
          </div>

          {/* transcript */}
          <div
            ref={scroller}
            className="flex h-[360px] flex-col gap-3 overflow-y-auto px-5 py-6"
            style={{ overscrollBehavior: "contain" }}
            aria-live="polite"
            aria-label="TELES Agent conversation preview"
          >
            <div className="mt-auto" />
            {SCRIPT.slice(0, shown).map((m, i) => (
              <div
                key={`${runId}-${i}`}
                className={`msg-in flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={
                    m.from === "user"
                      ? "max-w-[82%] rounded-2xl rounded-br-md bg-[#1b1b1d] px-4 py-3 text-[13.5px] leading-[1.55] text-ink"
                      : "max-w-[86%] rounded-2xl rounded-bl-md px-4 py-3 text-[13.5px] leading-[1.55] text-[#1a0b00]"
                  }
                  style={m.from === "agent" ? { background: "var(--accent)" } : undefined}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {typing && (
              <div className="msg-in flex justify-start">
                <span className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#1b1b1d] px-4 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="dot size-1.5 rounded-full bg-muted"
                      style={{ animationDelay: `${d * 160}ms` }}
                    />
                  ))}
                </span>
              </div>
            )}
          </div>

          {/* input (decorative) */}
          <div className="flex items-center gap-3 border-t border-line px-5 py-4">
            <span className="flex-1 truncate text-[13.5px] text-dim">Message TELES AGENT…</span>
            <a
              href={links.agentBot}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open TELES Agent on Telegram"
              className="grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{ background: "var(--accent)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 11.5 21 4l-7 17-3-7-8-2.5Z" fill="#1a0b00" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── floating launcher ─────────────────────────── */

export function ChatLauncher() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const f = () => setShow(window.scrollY > window.innerHeight * 0.8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <a
      href={links.agentBot}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#1a0b00] shadow-[0_18px_40px_-12px_rgba(255,92,0,0.6)]"
      style={{
        background: "var(--accent)",
        paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom) / 2)",
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(14px) scale(0.96)",
        pointerEvents: show ? "auto" : "none",
        transition:
          "opacity 320ms var(--ease-out), transform 320ms var(--ease-out)",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-2.8-.4L4 21l1.6-4a8.2 8.2 0 0 1-1.6-5A8.4 8.4 0 0 1 12.6 3 8.4 8.4 0 0 1 21 11.5Z"
          stroke="#1a0b00"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      Chat with TELES Agent
    </a>
  );
}
