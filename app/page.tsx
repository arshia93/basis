"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
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

function Scheduler() {
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
    <div style={{ width: "100%", height: 600, overflowY: "auto", overflowX: "hidden", borderRadius: 12 }}>
      <Cal
        namespace="intro"
        calLink="arshiagm/15min"
        style={{ width: "100%", height: "100%" }}
        config={{ layout: "month_view", theme: "light" }}
      />
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
              Turning uncompensated care into reimbursable coverage.
            </h1>

            <p className="sub" style={{ color: P.muted }}>
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
            <Scheduler />
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
