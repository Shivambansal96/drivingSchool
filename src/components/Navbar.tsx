import React, { useState, useEffect } from "react";
import { Menu, X, MessageSquare, ChevronRight, Globe, Award, Home, PhoneCall } from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import { SUPPORTED_LANGUAGES } from "../config/languages";
import { SITE_DATA } from "../config/siteData";

export type AppPage = "home" | "owner" | "contact";

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenTranslateModal: () => void;
  currentLanguage: string;
  isGuideActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenTranslateModal,
  currentLanguage,
  isGuideActive = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  const navPages: { id: AppPage; name: string; href: string; icon: React.ReactNode }[] = [
    { id: "home", name: "Home", href: "#/", icon: <Home size={15} /> },
    { id: "owner", name: "Owner", href: "#/owner", icon: <Award size={15} /> },
    { id: "contact", name: "Contact", href: "#/contact", icon: <PhoneCall size={15} /> },
  ];

  const handleNavClick = (e: React.MouseEvent, pageId: AppPage) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            ? "rgba(8, 9, 12, 0.94)"
            : "linear-gradient(180deg, rgba(8,9,12,0.9) 0%, rgba(8,9,12,0.3) 100%)",
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
            href="#/"
            onClick={(e) => handleNavClick(e, "home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            {/* Steering Wheel Emblem */}
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

          {/* Desktop Navigation Links: Exactly 3 Pages (Home, Owner, Contact) */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="hide-on-mobile"
          >
            {navPages.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.94rem",
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? "var(--accent-yellow)" : "var(--text-body)",
                    transition: "all 0.2s ease",
                    position: "relative",
                    padding: "8px 0",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-white)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-body)";
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2.5px",
                        background: "var(--accent-yellow)",
                        boxShadow: "0 0 10px var(--accent-yellow)",
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
              <span>
                {currentLanguage !== "en"
                  ? SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name || "Translate"
                  : "Translate"}
              </span>
            </button>

            {/* Enquire Now CTA */}
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: "9px 20px",
                fontSize: "0.84rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <MessageSquare size={15} />
              <span>Enquire Now</span>
            </a>
          </div>

          {/* Mobile Right Controls: Translate & Hamburger */}
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
                padding: "8px 12px",
                minHeight: "44px",
                minWidth: "44px",
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
                touchAction: "manipulation",
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
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              style={{
                padding: "10px",
                minHeight: "44px",
                minWidth: "44px",
                color: "var(--text-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "10px",
                cursor: "pointer",
                touchAction: "manipulation",
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
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            position: "fixed",
            top: "var(--header-height)",
            left: 0,
            right: 0,
            bottom: 0,
            height: "calc(100dvh - var(--header-height))",
            background: "rgba(6, 7, 10, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            zIndex: 1200,
            padding: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
            overscrollBehavior: "contain",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Prominent Translate Card */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTranslateModal();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
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

            {/* Exactly 3 Page Links for Mobile */}
            {navPages.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 18px",
                    borderRadius: "var(--radius-md)",
                    background: isActive ? "rgba(255, 229, 0, 0.1)" : "rgba(255, 255, 255, 0.03)",
                    border: isActive ? "1px solid var(--accent-yellow)" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: isActive ? "var(--accent-yellow)" : "var(--text-white)",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: isActive ? 800 : 600,
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {link.icon}
                    <span>{link.name} Page</span>
                  </div>
                  <ChevronRight size={18} color={isActive ? "var(--accent-yellow)" : "var(--text-dim)"} />
                </a>
              );
            })}
          </div>

          {/* Mobile Drawer Bottom Info & WhatsApp CTA */}
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "20px" }}>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px",
                fontSize: "0.95rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                marginBottom: "14px",
              }}
            >
              <MessageSquare size={18} />
              <span>Enquire on WhatsApp</span>
            </a>

            <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-dim)" }}>
              {SITE_DATA.contact.phoneDisplay} • {SITE_DATA.contact.address}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
