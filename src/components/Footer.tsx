import React from "react";
import { MessageSquare, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { SITE_DATA } from "../config/siteData";
import { createWhatsAppLink } from "../config/contact";

interface FooterProps {
  onNavigate?: (page: "home" | "owner" | "contact") => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const brand = SITE_DATA.brand;
  const contact = SITE_DATA.contact;
  const socialLinks = SITE_DATA.socialLinks;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent, page: "home" | "owner" | "contact") => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = page === "home" ? "#/" : `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-darkest)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        paddingTop: "60px",
        paddingBottom: "36px",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Top Multi-Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            marginBottom: "40px",
          }}
        >
          {/* Col 1: Brand Info */}
          <div style={{ maxWidth: "340px" }}>
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

            <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              {brand.description}
            </p>

            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                minHeight: "44px",
                fontSize: "0.84rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                touchAction: "manipulation",
              }}
            >
              <MessageSquare size={15} />
              Enquire on WhatsApp
            </a>
          </div>

          {/* Col 2: Three Pages Quick Navigation */}
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
              Pages
            </h5>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", padding: 0 }}>
              <li>
                <a
                  href="#/"
                  onClick={(e) => handleLinkClick(e, "home")}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-body)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "inline-block",
                    padding: "6px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
                >
                  Home (Courses & Pricing)
                </a>
              </li>
              <li>
                <a
                  href="#/owner"
                  onClick={(e) => handleLinkClick(e, "owner")}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-body)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "inline-block",
                    padding: "6px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
                >
                  Owner & Certifications
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => handleLinkClick(e, "contact")}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-body)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "inline-block",
                    padding: "6px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
                >
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Details */}
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
              Direct Contact
            </h5>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={`tel:${contact.phoneDial}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  padding: "4px 0",
                  minHeight: "40px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
              >
                <Phone size={15} color="var(--accent-yellow)" />
                <span>{contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  padding: "4px 0",
                  minHeight: "40px",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-yellow)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
              >
                <Mail size={15} color="var(--accent-yellow)" />
                <span>{contact.email}</span>
              </a>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.4,
                  overflowWrap: "break-word",
                }}
              >
                <MapPin size={15} color="var(--accent-yellow)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Social Media & Timings */}
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
              Connected Channels
            </h5>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.active ? s.url : undefined}
                  target={s.active ? "_blank" : undefined}
                  rel={s.active ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "0.76rem",
                    background: s.active ? "rgba(255, 229, 0, 0.1)" : "rgba(255, 255, 255, 0.04)",
                    color: s.active ? "var(--accent-yellow)" : "var(--text-dim)",
                    border: s.active ? "1px solid rgba(255, 229, 0, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                    textDecoration: "none",
                    cursor: s.active ? "pointer" : "default",
                  }}
                  title={s.active ? s.name : `${s.name} (Coming soon)`}
                >
                  <span>{s.name}</span>
                  {!s.active && <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>(soon)</span>}
                </a>
              ))}
            </div>

            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              Training Hours: Mon–Sat 6 AM – 9 AM
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            © 2026 {brand.name}. All Rights Reserved. Siliguri, West Bengal.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--text-muted)",
              padding: "8px 14px",
              minHeight: "42px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              touchAction: "manipulation",
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
