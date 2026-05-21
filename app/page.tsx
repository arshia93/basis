"use client";

import { useState } from "react";

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

function Scheduler() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Default selected = next available weekday after today
  const nextAvail = (() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    return d;
  })();

  const [selectedDate, setSelectedDate] = useState<Date>(nextAvail);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const monthName = viewMonth.toLocaleString("en-US", { month: "long" });
  const year = viewMonth.getFullYear();

  const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < 42; i++) {
    const dayNum = i - startOffset + 1;
    if (dayNum < 1 || dayNum > daysInMonth) { cells.push(null); continue; }
    cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), dayNum));
  }

  const isAvailable = (d: Date) => {
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    if (d <= today) return false;
    return true;
  };

  const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const times = ["9:00 am", "9:30 am", "10:00 am", "11:30 am", "1:00 pm", "2:30 pm", "3:00 pm", "4:00 pm"];

  const stepMonth = (delta: number) => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + delta, 1));
  };

  if (confirmed && selectedDate && selectedTime) {
    return (
      <div
        className="sch-confirm"
        style={{ borderColor: P.border, background: P.surface }}
      >
        <div className="sch-confirm-mark" style={{ background: P.accent }} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="sch-confirm-h">You&apos;re booked.</h3>
        <p className="sch-confirm-p" style={{ color: P.muted }}>
          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {selectedTime} ET
        </p>
        <p className="sch-confirm-p" style={{ color: P.muted, marginTop: 6 }}>
          A calendar invite is on its way. Reply to it with anything you want me to read beforehand.
        </p>
        <button
          className="sch-reset"
          onClick={() => { setConfirmed(false); setSelectedTime(null); }}
          style={{ color: P.accent }}
        >
          Pick another time
        </button>
      </div>
    );
  }

  return (
    <div
      className="sch"
      style={{
        "--surface": P.surface,
        "--border": P.border,
        "--accent": P.accent,
        "--muted": P.muted,
      } as React.CSSProperties}
    >
      <div className="sch-head">
        <div className="sch-host">
          <div className="sch-avatar" style={{ background: P.accent }}>JC</div>
          <div>
            <div className="sch-host-name">Intro call · Basis</div>
            <div className="sch-host-meta" style={{ color: P.muted }}>
              <span className="sch-pill">15 min</span>
              <span className="sch-dot" aria-hidden="true">·</span>
              <span>Google Meet</span>
              <span className="sch-dot" aria-hidden="true">·</span>
              <span>ET / New York</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sch-body">
        <div className="sch-cal">
          <div className="sch-cal-head">
            <div className="sch-month">{monthName} {year}</div>
            <div className="sch-nav">
              <button className="sch-navbtn" onClick={() => stepMonth(-1)} aria-label="Previous month">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="sch-navbtn" onClick={() => stepMonth(1)} aria-label="Next month">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="sch-dow">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="sch-dow-cell" style={{ color: P.muted }}>{d}</div>
            ))}
          </div>

          <div className="sch-grid">
            {cells.map((d, i) => {
              if (!d) return <div key={i} className="sch-cell sch-cell-empty" />;
              const avail = isAvailable(d);
              const isSel = sameDay(d, selectedDate);
              const isToday = sameDay(d, today);
              return (
                <button
                  key={i}
                  disabled={!avail}
                  className={[
                    "sch-cell",
                    avail ? "sch-cell-avail" : "sch-cell-disabled",
                    isSel ? "sch-cell-sel" : "",
                    isToday ? "sch-cell-today" : "",
                  ].join(" ")}
                  onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                  style={isSel ? { background: P.accent, color: "#fff" } : undefined}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sch-times">
          <div className="sch-times-head" style={{ color: P.muted }}>
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
              : "Select a day"}
          </div>
          <div className="sch-times-list">
            {selectedDate
              ? times.map((t) => {
                  const isSel = selectedTime === t;
                  return (
                    <div key={t} className={`sch-time-row${isSel ? " has-confirm" : ""}`}>
                      <button
                        className={`sch-time${isSel ? " sch-time-sel" : ""}`}
                        onClick={() => setSelectedTime(t)}
                        style={isSel ? { borderColor: P.accent, color: P.accent } : undefined}
                      >
                        {t}
                      </button>
                      {isSel && (
                        <button
                          className="sch-confirm-btn"
                          onClick={() => setConfirmed(true)}
                          style={{ background: P.accent }}
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
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
            <span className="brand-word">Basis</span>
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
              <span className="h1-line">Turning uncompensated care</span>
              <span className="h1-line">into reimbursable coverage.</span>
            </h1>

            <p className="sub" style={{ color: P.muted }}>
              Basis helps hospital revenue teams identify patients eligible for disability-linked Medicaid — and automates the enrollment workflow end-to-end.
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

            <div className="proof" style={{ borderTopColor: P.border }}>
              {/* <div className="proof-row" style={{ color: P.muted }}>
                <span className="proof-label">Built by operators from</span>
                <span className="proof-logos">
                  <span className="proof-logo">Stanford&nbsp;Health</span>
                  <span className="proof-sep" style={{ background: P.border }} />
                  <span className="proof-logo">Waystar</span>
                  <span className="proof-sep" style={{ background: P.border }} />
                  <span className="proof-logo">Oscar</span>
                </span>
              </div> */}
            </div>
          </section>

          <aside className="hero-right" id="book">
            <Scheduler />
            <div className="cal-footnote" style={{ color: P.muted }}>
              Powered by Cal.com · Reschedule anytime from your invite
            </div>
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
