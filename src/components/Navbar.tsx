import React, { useState, useEffect } from "react";
import { Menu, X, MessageSquare, ChevronRight, Globe } from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import { SUPPORTED_LANGUAGES } from "../config/languages";

interface NavbarProps {
  activeSection: string;
  onOpenTranslateModal: () => void;
  currentLanguage: string;
  isGuideActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenTranslateModal,
  currentLanguage,
  isGuideActive = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Know Your Car", href: "#know-your-car", id: "know-your-car" },
    { name: "Vehicles", href: "#vehicles", id: "vehicles" },
    { name: "Courses & Pricing", href: "#pricing", id: "pricing" },
    { name: "Timings", href: "#schedule", id: "schedule" },
    { name: "Licence Assistance", href: "#licence", id: "licence" },
    { name: "Traffic Rules", href: "#traffic-rules", id: "traffic-rules" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--header-height)",
          background: scrolled
            ? "rgba(8, 9, 12, 0.92)"
            : "linear-gradient(180deg, rgba(8,9,12,0.85) 0%, rgba(8,9,12,0.2) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            {/* Steering Wheel / Crest Emblem */}
            <div
              style={{
                width: "clamp(34px, 4.5vw, 42px)",
                height: "clamp(34px, 4.5vw, 42px)",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1e2230 0%, #0d0f14 100%)",
                border: "1.5px solid var(--accent-yellow)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(255, 229, 0, 0.25)",
                flexShrink: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-yellow)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>

            <div>
              <div
                className="notranslate"
                translate="no"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(0.92rem, 3.8vw, 1.1rem)",
                  letterSpacing: "0.02em",
                  color: "var(--text-white)",
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                GHOSH <span style={{ color: "var(--accent-yellow)" }}>MOTOR</span>
              </div>
              <div
                className="hide-on-compact-mobile"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Training School
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
            className="hide-on-mobile"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--accent-yellow)" : "var(--text-body)",
                    transition: "all 0.2s ease",
                    position: "relative",
                    padding: "6px 0",
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--accent-yellow)",
                        boxShadow: "0 0 8px var(--accent-yellow)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA: Translate & Enquire Now */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
            className="hide-on-mobile"
          >
            {/* Desktop Translate Button */}
            <button
              id="navbar-translate-btn"
              onClick={onOpenTranslateModal}
              className={`translate-btn-desktop ${isGuideActive ? "pulsing-glow" : ""}`}
              aria-label="Translate website language"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background:
                  currentLanguage !== "en"
                    ? "linear-gradient(135deg, rgba(255, 229, 0, 0.22) 0%, rgba(255, 229, 0, 0.08) 100%)"
                    : "rgba(255, 229, 0, 0.08)",
                border: "1.5px solid var(--accent-yellow)",
                color: "var(--accent-yellow)",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-yellow)";
                e.currentTarget.style.color = "#000000";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 229, 0, 0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentLanguage !== "en"
                    ? "rgba(255, 229, 0, 0.16)"
                    : "rgba(255, 229, 0, 0.08)";
                e.currentTarget.style.color = "var(--accent-yellow)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Globe size={16} />
              <span>{currentLanguage !== "en" ? SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || "Translate" : "Translate"}</span>
            </button>

            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: "9px 18px",
                fontSize: "0.84rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              <MessageSquare size={15} />
              Enquire Now
            </a>
          </div>

          {/* Mobile Right Controls: Quick Translate & Hamburger */}
          <div
            className="show-on-mobile-only"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* Mobile Header Translate Button */}
            <button
              onClick={onOpenTranslateModal}
              className={`translate-btn-mobile ${isGuideActive ? "pulsing-glow" : ""}`}
              aria-label="Translate website"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 14px",
                minHeight: "44px",
                minWidth: "44px",
                boxSizing: "border-box",
                borderRadius: "var(--radius-full)",
                background:
                  currentLanguage !== "en"
                    ? "rgba(255, 229, 0, 0.18)"
                    : "rgba(255, 229, 0, 0.08)",
                border: "1.5px solid var(--accent-yellow)",
                color: "var(--accent-yellow)",
                fontSize: "0.82rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Globe size={16} />
              <span className="mobile-translate-label">
                {currentLanguage !== "en"
                  ? SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || "Translate"
                  : "Translate"}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                padding: "10px",
                minHeight: "44px",
                minWidth: "44px",
                boxSizing: "border-box",
                color: "var(--text-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? <X size={22} color="var(--accent-yellow)" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--header-height)",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(6, 7, 10, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            zIndex: 1200,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Prominent Translate Card in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTranslateModal();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, rgba(255, 229, 0, 0.16) 0%, rgba(255, 229, 0, 0.04) 100%)",
                border: "1.5px solid var(--accent-yellow)",
                color: "var(--accent-yellow)",
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Globe size={18} />
                <span>Website Language</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-white)" }}>
                <span>{SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || "English"}</span>
                <ChevronRight size={16} color="var(--accent-yellow)" />
              </div>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background:
                    activeSection === link.id
                      ? "rgba(255, 229, 0, 0.12)"
                      : "rgba(255, 255, 255, 0.03)",
                  border:
                    activeSection === link.id
                      ? "1px solid rgba(255, 229, 0, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                  color: activeSection === link.id ? "var(--accent-yellow)" : "var(--text-white)",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>{link.name}</span>
                <ChevronRight size={18} color="var(--text-muted)" />
              </a>
            ))}
          </div>

          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-md)" }}
            >
              <MessageSquare size={18} />
              Chat on WhatsApp
            </a>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-dim)",
                textAlign: "center",
              }}
            >
              Morning Batches 06:00 AM – 09:00 AM • Sunday Closed
            </div>
          </div>
        </div>
      )}
    </>
  );
};
