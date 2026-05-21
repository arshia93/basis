"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const P = {
  bg: "#F4EFE4",
  ink: "#0F172A",
  muted: "#475569",
  accent: "#0F172A",
  check: "#0F172A",
  border: "rgba(15,23,42,0.10)",
  surface: "#FFFFFF",
};

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="check"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type CellState = "empty" | "disabled" | "avail" | "today" | "sel";

const CAL_ATTRS = {
  "data-cal-link": "arshiagm/15min",
  "data-cal-namespace": "intro",
  "data-cal-config": '{"layout":"month_view","theme":"light"}',
};

// May 2026 grid (Sun–Sat). May 1 = Fri. Today = May 20 (Wed). Selected preview = May 21.
const CALENDAR_CELLS: Array<{ day: number | null; state: CellState }> = [
  ...Array.from({ length: 5 }, () => ({ day: null, state: "empty" as const })),
  { day: 1, state: "disabled" }, { day: 2, state: "disabled" },
  { day: 3, state: "disabled" }, { day: 4, state: "disabled" }, { day: 5, state: "disabled" },
  { day: 6, state: "disabled" }, { day: 7, state: "disabled" }, { day: 8, state: "disabled" }, { day: 9, state: "disabled" },
  { day: 10, state: "disabled" }, { day: 11, state: "disabled" }, { day: 12, state: "disabled" },
  { day: 13, state: "disabled" }, { day: 14, state: "disabled" }, { day: 15, state: "disabled" }, { day: 16, state: "disabled" },
  { day: 17, state: "disabled" }, { day: 18, state: "disabled" }, { day: 19, state: "disabled" },
  { day: 20, state: "today" },
  { day: 21, state: "sel" },
  { day: 22, state: "avail" }, { day: 23, state: "disabled" },
  { day: 24, state: "disabled" }, { day: 25, state: "avail" }, { day: 26, state: "avail" },
  { day: 27, state: "avail" }, { day: 28, state: "avail" }, { day: 29, state: "avail" }, { day: 30, state: "disabled" },
  { day: 31, state: "disabled" },
  ...Array.from({ length: 6 }, () => ({ day: null, state: "empty" as const })),
];

const TIME_SLOTS = ["9:00am", "10:30am", "1:00pm", "2:30pm"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function BookingCard() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "intro" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="sch">
      <div className="sch-head">
        <div className="sch-host">
          <div className="sch-avatar" style={{ background: P.ink }}>AM</div>
          <div>
            <div className="sch-host-name">Speak with Basis</div>
            <div className="sch-host-meta" style={{ color: P.muted }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>15 min intro call</span>
              <span className="sch-dot">·</span>
              <span className="sch-pill">Google Meet</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sch-body">
        <div className="sch-cal">
          <div className="sch-cal-head">
            <div className="sch-month">
              May <span style={{ color: P.muted, fontWeight: 400 }}>2026</span>
            </div>
            <div className="sch-nav">
              <span className="sch-navbtn" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </span>
              <span className="sch-navbtn" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </div>

          <div className="sch-dow">
            {DOW.map((d) => (
              <div key={d} className="sch-dow-cell" style={{ color: P.muted }}>{d}</div>
            ))}
          </div>

          <div className="sch-grid">
            {CALENDAR_CELLS.map((c, i) => {
              if (c.state === "empty") {
                return <div key={i} className="sch-cell sch-cell-empty" aria-hidden="true" />;
              }
              const cls = ["sch-cell"];
              if (c.state === "disabled") cls.push("sch-cell-disabled");
              if (c.state === "avail") cls.push("sch-cell-avail");
              if (c.state === "today") cls.push("sch-cell-today");
              if (c.state === "sel") cls.push("sch-cell-sel");
              const interactive = c.state !== "disabled";
              return (
                <button
                  key={i}
                  type="button"
                  className={cls.join(" ")}
                  disabled={c.state === "disabled"}
                  aria-label={`May ${c.day}, 2026`}
                  {...(interactive ? CAL_ATTRS : {})}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sch-times">
          <div className="sch-times-head" style={{ color: P.muted }}>Thu, May 21</div>
          <div className="sch-times-list">
            {TIME_SLOTS.map((t) => (
              <div key={t} className="sch-time-row">
                <button type="button" className="sch-time" {...CAL_ATTRS}>{t}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sch-foot">
        <button type="button" className="sch-book-cta" {...CAL_ATTRS}>
          <span>Book a meeting</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page" style={{ background: P.bg, color: P.ink }}>
      {/* Nav */}
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/basis-full-logo.svg" alt="Basis" className="brand-logo" />
          </div>
          {/* <nav className="nav-links" style={{ color: P.muted }}>
            <a href="#how" className="nav-secondary">How it works</a>
            <a href="#for" className="nav-secondary">For revenue teams</a>
            <a href="#security" className="nav-secondary">Security</a>
            <span className="nav-divider" style={{ background: P.border }} />
            <a className="nav-cta" href="#book" style={{ color: P.ink }}>
              Book a call
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </nav> */}
        </div>
      </header>

      {/* Hero */}
      <main className="hero">
        <div className="hero-grid">
          <section className="hero-left">
            {/* <div className="eyebrow" style={{ color: P.muted }}>
              <span className="eyebrow-dot" style={{ background: P.check }} />
              <span>For hospital revenue cycle teams</span>
            </div> */}

            <h1 className="h1">
              Turning uncompensated care into reimbursable coverage.
            </h1>

            <p>
             Now enrolling pilot hospitals and clinics.
            </p>

            {/* <ul className="checks" style={{ color: P.ink }}>
              <li>
                <CheckIcon color={P.check} />
                <span>Talking to <strong>10 RCM leaders</strong> this month</span>
              </li>
              <li>
                <CheckIcon color={P.check} />
                <span><strong>15 minutes</strong>, on your calendar</span>
              </li>
              <li>
                <CheckIcon color={P.check} />
                <span>No pitch — questions about your workflow</span>
              </li>
            </ul> */}

            {/* <div className="proof" style={{ borderTopColor: P.border }}>
              <div className="proof-row" style={{ color: P.muted }}>
                <span className="proof-label">Built by operators from</span>
                <span className="proof-logos">
                  <span className="proof-logo">Stanford&nbsp;Health</span>
                  <span className="proof-sep" style={{ background: P.border }} />
                  <span className="proof-logo">Waystar</span>
                  <span className="proof-sep" style={{ background: P.border }} />
                  <span className="proof-logo">Oscar</span>
                </span>
              </div>
            </div> */}
          </section>

          <aside className="hero-right" id="book">
            <BookingCard />
            {/* <div className="cal-footnote" style={{ color: P.muted }}>
              Powered by Cal.com · Reschedule anytime from your invite
            </div> */}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="foot" style={{ color: P.muted, borderTopColor: P.border }}>
        <div className="foot-inner">
          <div className="foot-l">© 2026 Basis Coverage, Inc.</div>
          <div className="foot-r">
            <a href="mailto:team@basiscoverage.com">team@basiscoverage.com</a>
            {/* <span className="foot-sep" style={{ background: P.border }} />
            <a href="#">Privacy</a>
            <span className="foot-sep" style={{ background: P.border }} />
            <a href="#">HIPAA &amp; security</a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
