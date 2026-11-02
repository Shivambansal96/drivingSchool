import React from "react";
import { FileText, Award, MessageSquare, CheckCircle2 } from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import { SITE_DATA } from "../config/siteData";

export const LicenceAssistance: React.FC = () => {
  const data = SITE_DATA.licenceAssistance;

  return (
    <section id="licence" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)", position: "relative" }}>
      <div className="container">
        {/* Compact, Premium Feature Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "clamp(24px, 4vw, 36px)",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, rgba(22, 26, 38, 0.95) 0%, rgba(12, 14, 22, 0.98) 100%)",
            border: "1px solid rgba(255, 229, 0, 0.3)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 229, 0, 0.12)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "clamp(24px, 4vw, 40px)",
              alignItems: "center",
            }}
          >
            {/* Left Column: Heading, Price & Overview */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  background: "var(--accent-yellow-dim)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  letterSpacing: "0.08em",
                  marginBottom: "14px",
                }}
              >
                <Award size={14} />
                OFFICIAL RTO ASSISTANCE
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.95rem)",
                  fontWeight: 800,
                  color: "var(--text-white)",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                {data.heading}
              </h2>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-body)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                {data.description}
              </p>

              {/* Price Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255, 229, 0, 0.25)",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Assistance Fee:</span>
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 900,
                    color: "var(--accent-yellow)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {data.priceFormatted}
                </span>
                <span style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>one-time</span>
              </div>

              <div>
                <a
                  href={createWhatsAppLink({
                    planName: "Driving Licence (DL) Assistance (₹3,000)",
                    timeSlot: "Office Hours",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 24px",
                    minHeight: "48px",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    touchAction: "manipulation",
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Enquire for Licence Guidance</span>
                </a>
              </div>
            </div>

            {/* Right Column: Required Documents Checklist & Disclaimer */}
            <div
              style={{
                background: "rgba(10, 13, 20, 0.6)",
                padding: "clamp(18px, 3vw, 24px)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <FileText size={15} />
                <span>Required Documentation</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {data.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.84rem",
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      color="var(--accent-yellow)"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <strong style={{ color: "var(--text-white)" }}>{doc.name}</strong>
                      <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{doc.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Responsible Disclaimer */}
              <div
                style={{
                  fontSize: "0.74rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.45,
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "12px",
                }}
              >
                {data.termsNotice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
