import React from "react";
import { MessageSquare, ArrowUp } from "lucide-react";
import { BRAND_CONFIG, createWhatsAppLink } from "../config/contact";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-darkest)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        paddingTop: "70px",
        paddingBottom: "36px",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Top 4-Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            marginBottom: "40px",
          }}
        >
          {/* Col 1: Brand Info */}
          <div style={{ maxWidth: "320px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #1e2230 0%, #0d0f14 100%)",
                  border: "1.5px solid var(--accent-yellow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-yellow)"
                  strokeWidth="2.2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>

              <div>
                <span
                  className="notranslate"
                  translate="no"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "var(--text-white)",
                  }}
                >
                  GHOSH <span style={{ color: "var(--accent-yellow)" }}>MOTOR</span>
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.15em",
                  }}
                >
                  Training School
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              {BRAND_CONFIG.description}
            </p>

            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: "10px 18px", fontSize: "0.82rem", borderRadius: "var(--radius-full)" }}
            >
              <MessageSquare size={15} />
              Enquire on WhatsApp
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--accent-yellow)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "18px",
              }}
            >
              Navigation
            </h5>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { name: "Home", href: "#home" },
                { name: "Vehicle Categories", href: "#vehicles" },
                { name: "Courses & Pricing", href: "#pricing" },
                { name: "Training Schedule", href: "#schedule" },
                { name: "Driving Licence Assistance", href: "#licence" },
                { name: "Traffic Rules & Safety", href: "#traffic-rules" },
                { name: "Photo Gallery", href: "#gallery" },
                { name: "Contact & Admissions", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-body)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Training Packages & Pricing */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--accent-yellow)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "18px",
              }}
            >
              Course Pricing
            </h5>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.85rem" }}>
              <div>
                <div style={{ color: "var(--text-white)", fontWeight: 700 }}>Group Training</div>
                <div style={{ color: "var(--accent-yellow)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                  ₹3,000 • 20 Days (3–4 Learners)
                </div>
              </div>

              <div>
                <div style={{ color: "var(--text-white)", fontWeight: 700 }}>Semi-Personal Training</div>
                <div style={{ color: "var(--accent-yellow)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                  ₹5,500 • 20 Days (2 Learners)
                </div>
              </div>

              <div>
                <div style={{ color: "var(--text-white)", fontWeight: 700 }}>Personal Training (1-on-1)</div>
                <div style={{ color: "var(--accent-yellow)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                  ₹11,000 • 20 Days (Dedicated)
                </div>
              </div>

              <div>
                <div style={{ color: "var(--text-white)", fontWeight: 700 }}>Licence Assistance</div>
                <div style={{ color: "var(--accent-yellow)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                  ₹3,000 (RTO Guidance)
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Timings & Location Placeholders */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--accent-yellow)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "18px",
              }}
            >
              Session Timings
            </h5>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.84rem" }}>
              <div style={{ color: "var(--text-white)" }}>
                <strong>Monday to Saturday:</strong>
                <div style={{ color: "var(--text-muted)", marginTop: "3px" }}>06:00 AM – 07:00 AM</div>
                <div style={{ color: "var(--text-muted)" }}>07:00 AM – 08:00 AM</div>
                <div style={{ color: "var(--text-muted)" }}>08:00 AM – 09:00 AM</div>
              </div>

              <div
                style={{
                  marginTop: "6px",
                  padding: "6px 10px",
                  background: "rgba(239, 68, 68, 0.12)",
                  borderRadius: "4px",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "var(--accent-red)",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                }}
              >
                SUNDAY CLOSED (Fleet Maintenance)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.8rem",
            color: "var(--text-dim)",
          }}
        >
          <div>
            © 2026 Ghosh Motor Training School. All rights reserved. • Haider Para, Siliguri
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-muted)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-yellow)";
              e.currentTarget.style.borderColor = "var(--accent-yellow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
