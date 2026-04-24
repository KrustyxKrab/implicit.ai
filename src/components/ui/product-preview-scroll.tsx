import React from "react";
import { ContainerScroll } from "./container-scroll";

const stagesEN = [
  { id: "01", name: "Listen" },
  { id: "02", name: "Synthesise" },
  { id: "03", name: "Generate" },
  { id: "04", name: "Validate" },
  { id: "05", name: "Converge" },
];

const stagesDE = [
  { id: "01", name: "Zuhören" },
  { id: "02", name: "Synthese" },
  { id: "03", name: "Generieren" },
  { id: "04", name: "Validieren" },
  { id: "05", name: "Zusammenfassen" },
];

const insightsEN = [
  "Approval workflows in logistics slow turnaround by 3 days on average",
  "Knowledge gap identified: shift handover process poorly documented across 4 departments",
  "Process bottleneck in container allocation affects 60% of outbound shipments",
];

const insightsDE = [
  "Genehmigungsworkflows in der Logistik verlangsamen die Durchlaufzeit um durchschnittlich 3 Tage",
  "Identifizierte Wissenslücke: Der Prozess der Schichtübergabe ist in vier Abteilungen unzureichend dokumentiert",
  "Ein Prozessengpass bei der Containerzuweisung betrifft 60 % der ausgehenden Sendungen",
];

export function ProductPreviewScroll({ lang }: { lang: "en" | "de" }) {
  const isDE = lang === "de";

  return (
    <ContainerScroll
      titleComponent={
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-accent)",
              marginBottom: "0.75rem",
            }}
          >
            {isDE ? "Die Plattform" : "The platform"}
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            {isDE ? "Ihre Mitarbeitenden. Gehört." : "Your workforce. Heard."}
          </h2>
        </div>
      }
    >
      <PlatformMockup isDE={isDE} />
    </ContainerScroll>
  );
}

function PlatformMockup({ isDE }: { isDE: boolean }) {
  const stages = isDE ? stagesDE : stagesEN;
  const insights = isDE ? insightsDE : insightsEN;
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-bg)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 16px",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
        <span
          style={{
            marginLeft: "12px",
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            fontWeight: 500,
          }}
        >
          inplicit.ai — Workforce Intelligence Platform
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "148px",
            flexShrink: 0,
            borderRight: "1px solid var(--color-border)",
            padding: "12px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-tertiary)",
              padding: "4px 8px",
              marginBottom: "4px",
            }}
          >
            {isDE ? "Phasen" : "Stages"}
          </p>
          {stages.map((s, i) => (
            <div
              key={s.id}
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                background: i === 2 ? "var(--color-accent-light)" : "transparent",
                border: i === 2 ? "1px solid var(--color-accent-muted)" : "1px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: i === 2 ? "var(--color-accent)" : "var(--color-text-tertiary)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.id}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: i === 2 ? 600 : 400,
                  color: i === 2 ? "var(--color-accent-dark)" : "var(--color-text-secondary)",
                }}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {/* Stage header */}
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "12px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "10px",
                  color: "var(--color-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "2px",
                }}
              >
                {isDE ? "Phase 03 / 5" : "Stage 03 / 5"}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {isDE ? "Erkenntnisse generieren" : "Generating Insights"}
              </p>
            </div>
            <div
              style={{
                padding: "4px 10px",
                background: "var(--color-accent-light)",
                border: "1px solid var(--color-accent-muted)",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-accent)",
                flexShrink: 0,
              }}
            >
              {isDE ? "In Bearbeitung" : "In Progress"}
            </div>
          </div>

          {/* Hypothesis cards */}
          {insights.map((h, i) => (
            <div
              key={i}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                padding: "10px 14px",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "var(--color-accent-light)",
                  border: "1px solid var(--color-accent-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5l2.25 2.25L7.5 2"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {h}
              </p>
            </div>
          ))}

          {/* Progress bar */}
          <div style={{ marginTop: "auto", flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                {isDE ? "Gesamtfortschritt" : "Overall progress"}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-accent)" }}>
                52%
              </span>
            </div>
            <div
              style={{
                height: "4px",
                borderRadius: "2px",
                background: "var(--color-border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "52%",
                  background: "var(--color-accent)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}