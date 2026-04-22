import React from "react";
import { Timeline } from "./timeline";

const card: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "12px",
};

const eyebrow: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-accent)",
  marginBottom: "6px",
};

const cardHeading: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "var(--color-text-primary)",
  marginBottom: "6px",
  letterSpacing: "-0.01em",
};

const cardBody: React.CSSProperties = {
  fontSize: "13px",
  color: "var(--color-text-secondary)",
  lineHeight: 1.65,
};

const checkRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "13px",
  color: "var(--color-text-secondary)",
  padding: "6px 0",
};

const checkDot: React.CSSProperties = {
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  backgroundColor: "var(--color-accent-light)",
  border: "1px solid var(--color-accent-muted)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const badge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "9999px",
  fontSize: "11px",
  fontWeight: 600,
};

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M1.5 4.5l2.25 2.25L7.5 2"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeployContent({ isDE }: { isDE: boolean }) {
  const checks = isDE
    ? [
        "Nahtlose Verbindung zu Slack, Teams oder E-Mail",
        "Konfiguration von Interviewabläufen und -tiefe",
        "Festlegung von Umfang, Abteilung und Zielgruppe",
        "Pilot-Review mit dem implicit.ai-Team",
      ]
    : [
        "Connect to Slack, Teams, or email in minutes",
        "Configure interview flows and depth",
        "Set scope, department, and target audience",
        "Pilot review with the implicit.ai team",
      ];

  return (
    <div>
      <div style={card}>
        <p style={eyebrow}>{isDE ? "Setup" : "Setup"}</p>
        <p style={cardHeading}>
          {isDE ? "An einem Nachmittag einsatzbereit" : "Live in an afternoon"}
        </p>
        <p style={cardBody}>
          {isDE
            ? "Keine Umstrukturierung. Keine neuen Tools für Ihre Mitarbeitenden. Implicit.ai integriert sich in die Kommunikationsinfrastruktur, die Ihre Organisation bereits nutzt."
            : "No restructuring. No new tools for your employees. Implicit.ai plugs into the communication infrastructure your organisation already uses."}
        </p>
      </div>
      <div style={{ ...card, padding: "16px 24px" }}>
        {checks.map((item, i) => (
          <div key={i} style={{ ...checkRow, borderBottom: i < checks.length - 1 ? "1px solid var(--color-border-subtle)" : "none" }}>
            <span style={checkDot}>
              <CheckIcon />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewContent({ isDE }: { isDE: boolean }) {
  const questions = isDE
    ? [
        { q: "Wo verliert Ihr Team am meisten Zeit?", a: "Meistens bei internen Abstimmungsprozessen…" },
        { q: "Was würden Sie sofort ändern, wenn Sie könnten?", a: "Die Art, wie wir Wissen zwischen Abteilungen teilen…" },
      ]
    : [
        { q: "Where does your team lose the most time?", a: "Usually in internal alignment processes…" },
        { q: "What would you change immediately if you could?", a: "The way we share knowledge across departments…" },
      ];

  return (
    <div>
      <div style={card}>
        <p style={eyebrow}>{isDE ? "KI-Interviews" : "AI Interviews"}</p>
        <p style={cardHeading}>
          {isDE ? "Stilles Wissen systematisch erfassen" : "Systematically surface tacit knowledge"}
        </p>
        <p style={cardBody}>
          {isDE
            ? "Strukturierte KI-geführte Gespräche erfassen das verteilte Wissen quer durch Ihre gesamte Organisation — mit einer Tiefe, die klassische Befragungen nie erreichen."
            : "Structured AI-led conversations capture the tacit knowledge distributed across your entire organisation — with a depth traditional surveys never reach."}
        </p>
      </div>
      <div style={{ ...card, padding: "16px 24px" }}>
        <p style={{ ...eyebrow, marginBottom: "12px" }}>
          {isDE ? "Beispiel-Interviewauszug" : "Example interview excerpt"}
        </p>
        {questions.map((item, i) => (
          <div key={i} style={{ marginBottom: i < questions.length - 1 ? "14px" : 0 }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
              <span style={{ ...badge, backgroundColor: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-accent-muted)" }}>
                AI
              </span>
              <p style={{ fontSize: "13px", color: "var(--color-text-primary)", fontWeight: 500, lineHeight: 1.5 }}>
                {item.q}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ ...badge, backgroundColor: "var(--color-surface-elevated)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>
                {isDE ? "MA" : "EMP"}
              </span>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5, fontStyle: "italic" }}>
                {item.a}
              </p>
            </div>
            {i < questions.length - 1 && (
              <div style={{ borderBottom: "1px solid var(--color-border-subtle)", margin: "12px 0" }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
        {[
          isDE ? "7.000 FTE erreichbar" : "7,000 FTE reachable",
          isDE ? "30-Min.-Sessions" : "30-min sessions",
          isDE ? "DSGVO-konform" : "GDPR compliant",
        ].map((label) => (
          <span key={label} style={{ ...badge, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)", fontSize: "12px" }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MapContent({ isDE }: { isDE: boolean }) {
  const signals = isDE
    ? [
        { cluster: "Prozessreibung", count: "23 Signale", color: "var(--color-accent)" },
        { cluster: "Digitalisierungslücken", count: "17 Signale", color: "#8b5cf6" },
        { cluster: "Ideen für neue Produkte", count: "11 Signale", color: "#f59e0b" },
      ]
    : [
        { cluster: "Process friction", count: "23 signals", color: "var(--color-accent)" },
        { cluster: "Digitalisation gaps", count: "17 signals", color: "#8b5cf6" },
        { cluster: "New product ideas", count: "11 signals", color: "#f59e0b" },
      ];

  return (
    <div>
      <div style={card}>
        <p style={eyebrow}>{isDE ? "Wissenskarte" : "Knowledge Map"}</p>
        <p style={cardHeading}>
          {isDE ? "Lebender Innovationsatlas" : "A living innovation atlas"}
        </p>
        <p style={cardBody}>
          {isDE
            ? "Stille Signale werden zu validierten Venture Cases. Die Karte zeigt, wo Ihre Organisation Potenzial versteckt — und welche Ideen durch parallele Validierung an Kraft gewinnen."
            : "Silent signals become validated venture cases. The map shows where your organisation hides potential — and which ideas gain strength through parallel validation."}
        </p>
      </div>
      <div style={card}>
        <p style={{ ...eyebrow, marginBottom: "12px" }}>
          {isDE ? "Signalcluster (Pilotbeispiel)" : "Signal clusters (pilot example)"}
        </p>
        {signals.map((s, i) => (
          <div key={i} style={{ marginBottom: i < signals.length - 1 ? "10px" : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)" }}>
                {s.cluster}
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                {s.count}
              </span>
            </div>
            <div style={{ height: "6px", borderRadius: "3px", backgroundColor: "var(--color-border)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: i === 0 ? "72%" : i === 1 ? "54%" : "36%",
                backgroundColor: s.color,
                borderRadius: "3px",
                opacity: 0.85,
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-accent)", letterSpacing: "-0.03em" }}>3</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
            {isDE ? "validierte Venture Cases" : "validated venture cases"}
          </p>
        </div>
        <div style={{ width: "1px", height: "40px", backgroundColor: "var(--color-border)" }} />
        <div>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>51</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
            {isDE ? "geclusterte Signale" : "clustered signals"}
          </p>
        </div>
        <div style={{ width: "1px", height: "40px", backgroundColor: "var(--color-border)" }} />
        <div>
          <p style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>6w</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
            {isDE ? "Pilotlaufzeit" : "pilot duration"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksTimeline({ lang }: { lang: "en" | "de" }) {
  const isDE = lang === "de";

  const data = [
    {
      title: isDE ? "01 Deploy" : "01 Deploy",
      content: <DeployContent isDE={isDE} />,
    },
    {
      title: isDE ? "02 Interviews" : "02 Interviews",
      content: <InterviewContent isDE={isDE} />,
    },
    {
      title: isDE ? "03 Die Karte" : "03 The Map",
      content: <MapContent isDE={isDE} />,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        padding: "80px 0 0",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 32px 48px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-accent)",
            marginBottom: "12px",
          }}
        >
          {isDE ? "Der Prozess" : "The Process"}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
          }}
        >
          {isDE ? "Wie es funktioniert" : "How it works"}
        </h2>
      </div>

      <Timeline data={data} />
    </div>
  );
}
