import React, { useState, useRef } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Layers,
  HeartHandshake,
  Navigation,
} from "lucide-react";
import { SITE_DATA, type CertificateItem } from "../config/siteData";
import { Footer } from "../components/Footer";
import type { AppPage } from "../components/Navbar";

interface OwnerPageProps {
  onNavigate: (page: AppPage) => void;
}

export const OwnerPage: React.FC<OwnerPageProps> = ({ onNavigate }) => {
  const owner = SITE_DATA.owner;
  const brand = SITE_DATA.brand;
  const certificates = SITE_DATA.certificates;

  // Carousel state
  const [currentCertIndex, setCurrentCertIndex] = useState<number>(0);
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);

  // Mobile touch swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleNextCert = () => {
    setCurrentCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrevCert = () => {
    setCurrentCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      handleNextCert();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swiped right
      handlePrevCert();
    }
  };

  const activeCert = certificates[currentCertIndex] || certificates[0];

  return (
    <div className="owner-page-root" style={{ paddingTop: "var(--header-height)", position: "relative" }}>
      {/* Lightbox Modal */}
      {lightboxCert && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setLightboxCert(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "850px",
              width: "100%",
              background: "rgba(16, 20, 30, 0.98)",
              border: "1.5px solid var(--accent-yellow)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 229, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxCert(null)}
              aria-label="Close certificate lightbox"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-yellow)";
                e.currentTarget.style.color = "var(--accent-yellow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              <X size={20} />
            </button>

            <div style={{ maxHeight: "70vh", overflow: "hidden", backgroundColor: "#000000" }}>
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <div style={{ padding: "24px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-yellow)",
                  fontWeight: 800,
                  marginBottom: "6px",
                  letterSpacing: "0.08em",
                }}
              >
                {lightboxCert.badge} • {lightboxCert.year}
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
                {lightboxCert.title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.5, marginBottom: "8px" }}>
                {lightboxCert.description}
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                Issued by: {lightboxCert.issuer}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: OWNER INTRODUCTION */}
      <section className="section-spacing" style={{ backgroundColor: "var(--bg-primary)", position: "relative" }}>
        {/* Ambient lighting glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Section Tag */}
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                fontWeight: 800,
                color: "var(--accent-yellow)",
                background: "var(--accent-yellow-dim)",
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "0.1em",
              }}
            >
              <Award size={15} />
              LEADERSHIP & CREDIBILITY
            </div>
          </div>

          {/* Owner Hero Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
              gap: "clamp(30px, 5vw, 60px)",
              alignItems: "center",
              marginBottom: "60px",
            }}
          >
            {/* Left: Owner Portrait with Badge & Styling */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 229, 0, 0.35)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 229, 0, 0.15)",
                  backgroundColor: "#0d0f14",
                }}
              >
                <img
                  src={owner.photo}
                  alt={owner.name}
                  style={{
                    width: "100%",
                    height: "clamp(340px, 50vw, 480px)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Gradient overlay for bottom badge */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 55%, rgba(8, 9, 12, 0.95) 100%)",
                  }}
                />

                {/* Floating Experience Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    background: "rgba(16, 20, 30, 0.88)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 229, 0, 0.3)",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                      Certified Senior Master Instructor
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>
                      {owner.name}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--accent-yellow)",
                      color: "#000000",
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      padding: "6px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {owner.experienceYears}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Owner Bio & Narrative */}
            <div>
              <h1
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
                  fontWeight: 900,
                  color: "var(--text-white)",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.15,
                  marginBottom: "8px",
                }}
              >
                {owner.name}
              </h1>

              <div
                style={{
                  fontSize: "1.05rem",
                  color: "var(--accent-yellow)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                {owner.role} • {brand.name}
              </div>

              {/* Bio Paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>
                {owner.bio.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontSize: "0.94rem",
                      color: "var(--text-body)",
                      lineHeight: 1.65,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quote Block */}
              <div
                style={{
                  borderLeft: "3px solid var(--accent-yellow)",
                  paddingLeft: "18px",
                  marginBottom: "28px",
                  background: "rgba(255, 229, 0, 0.04)",
                  padding: "14px 18px",
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                }}
              >
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontStyle: "italic",
                    color: "var(--text-white)",
                    lineHeight: 1.55,
                    marginBottom: "6px",
                  }}
                >
                  "{owner.quote}"
                </p>
                <div style={{ fontSize: "0.78rem", color: "var(--accent-yellow)", fontFamily: "var(--font-mono)" }}>
                  — {owner.name}, Founder
                </div>
              </div>

              {/* Key Achievements Checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {owner.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.88rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Credibility Stats Counter Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "20px",
              padding: "clamp(20px, 3.5vw, 32px)",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(180deg, rgba(20, 24, 36, 0.8) 0%, rgba(12, 14, 22, 0.95) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {[
              { label: "Instruction Experience", value: "25+ Years", note: "Continuous driving education in North Bengal" },
              { label: "Motorists Certified", value: "12,000+", note: "Trained across 2W, 4W and commercial MGV" },
              { label: "Fleet Safety Standard", value: "100%", note: "Equipped with dual-pedal emergency intervention" },
              { label: "Government RTO Track Pass", value: "98%+", note: "Structured preparation for LL & DL trials" },
            ].map((stat, sIdx) => (
              <div key={sIdx} style={{ textAlign: "center", padding: "10px" }}>
                <div
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)",
                    fontWeight: 900,
                    color: "var(--accent-yellow)",
                    fontFamily: "var(--font-display)",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-white)", marginBottom: "4px" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", lineHeight: 1.4 }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE DRIVING SCHOOL */}
      <section className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)", position: "relative" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">OUR PEDAGOGY & PHILOSOPHY</div>
            <h2 className="section-title">THE GHOSH MOTOR TRAINING STANDARD</h2>
            <p className="section-subtitle">
              We reject the rush-and-pass model. Driving is a lifelong safety responsibility. Here is
              how we transform tentative learners into relaxed, intuitive, and defensive motorists.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: <ShieldCheck size={26} color="var(--accent-yellow)" />,
                title: "Calm, Anxiety-Free Guidance",
                description:
                  "Fear is the primary reason beginners stall or panic. Our instructors employ a calm, low-pressure vocal style that de-escalates stress, allowing learners to build genuine muscle memory.",
              },
              {
                icon: <Navigation size={26} color="var(--accent-yellow)" />,
                title: "Dual-Control Safety Fleet",
                description:
                  "Every training vehicle features dual co-driver foot pedals. Your instructor has secondary control over brakes and clutch at all times, ensuring absolute safety even in busy market traffic.",
              },
              {
                icon: <Layers size={26} color="var(--accent-yellow)" />,
                title: "Progressive 20-Day Syllabus",
                description:
                  "Day 1 begins on quiet dawn roads with clutch biting-point mastery. By Day 20, students confidently handle parallel parking, bumper-to-bumper city traffic, and anti-stall slope starts.",
              },
              {
                icon: <HeartHandshake size={26} color="var(--accent-yellow)" />,
                title: "All 3 Vehicle Disciplines",
                description:
                  "Structured certified curriculums across Two-Wheelers (scooter & geared bikes), Four-Wheelers (Maruti WagonR & compact SUVs), and Medium Goods Vehicles (MGV commercial transport).",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: "clamp(24px, 3.5vw, 32px)",
                  borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(180deg, rgba(20, 24, 34, 0.85) 0%, rgba(12, 14, 20, 0.95) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "rgba(255, 229, 0, 0.1)",
                    border: "1px solid rgba(255, 229, 0, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: "1.18rem", fontWeight: 800, color: "#ffffff" }}>{pillar.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.6 }}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CERTIFICATIONS AND ACHIEVEMENTS CAROUSEL */}
      <section className="section-spacing" style={{ backgroundColor: "var(--bg-primary)", position: "relative" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">VERIFIED CREDENTIALS</div>
            <h2 className="section-title">CERTIFICATIONS & ACCREDITATIONS</h2>
            <p className="section-subtitle">
              Browse our official training school registration, road safety commendations, and dual-control
              fleet fitness compliance documents. Click any certificate to inspect full resolution.
            </p>
          </div>

          {/* Main Carousel Card */}
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              className="glass-card"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                border: "1.5px solid rgba(255, 229, 0, 0.35)",
                background: "linear-gradient(180deg, rgba(20, 24, 36, 0.92) 0%, rgba(10, 12, 18, 0.98) 100%)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 229, 0, 0.15)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                  alignItems: "center",
                }}
              >
                {/* Certificate Visual Image (Clickable Lightbox Trigger) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxCert(activeCert)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setLightboxCert(activeCert);
                  }}
                  style={{
                    position: "relative",
                    height: "clamp(260px, 45vw, 380px)",
                    backgroundColor: "#000000",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  title="Click to view full certificate"
                >
                  <img
                    src={activeCert.image}
                    alt={activeCert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Lightbox hint overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      right: "14px",
                      background: "rgba(10, 12, 18, 0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 229, 0, 0.4)",
                      color: "var(--accent-yellow)",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>Expand View</span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div style={{ padding: "clamp(24px, 4vw, 40px)", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      color: "var(--accent-yellow)",
                      background: "var(--accent-yellow-dim)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      letterSpacing: "0.08em",
                      alignSelf: "flex-start",
                    }}
                  >
                    <Sparkles size={13} />
                    <span>{activeCert.badge}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "clamp(1.25rem, 3vw, 1.55rem)",
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.25,
                    }}
                  >
                    {activeCert.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.6 }}>
                    {activeCert.description}
                  </p>

                  <div
                    style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "14px",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div>
                      <strong style={{ color: "#ffffff" }}>Issuing Authority:</strong> {activeCert.issuer}
                    </div>
                    <div>
                      <strong style={{ color: "var(--accent-yellow)" }}>Status:</strong> {activeCert.year}
                    </div>
                  </div>

                  {/* Previous / Next Navigation Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={handlePrevCert}
                        aria-label="Previous certificate"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-yellow)";
                          e.currentTarget.style.color = "var(--accent-yellow)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextCert}
                        aria-label="Next certificate"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-yellow)";
                          e.currentTarget.style.color = "var(--accent-yellow)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-dim)" }}>
                      {currentCertIndex + 1} of {certificates.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Pagination Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              {certificates.map((cert, cIdx) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setCurrentCertIndex(cIdx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    background:
                      cIdx === currentCertIndex
                        ? "rgba(255, 229, 0, 0.15)"
                        : "rgba(255, 255, 255, 0.04)",
                    border:
                      cIdx === currentCertIndex
                        ? "1.5px solid var(--accent-yellow)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                    color: cIdx === currentCertIndex ? "var(--accent-yellow)" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: cIdx === currentCertIndex ? "var(--accent-yellow)" : "var(--text-dim)",
                    }}
                  />
                  <span>0{cIdx + 1}. {cert.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OWNER PAGE CLOSING SECTION */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          position: "relative",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.76rem",
              fontWeight: 800,
              color: "var(--accent-yellow)",
              background: "var(--accent-yellow-dim)",
              padding: "4px 12px",
              borderRadius: "var(--radius-sm)",
              marginBottom: "16px",
            }}
          >
            START WITH CONFIDENCE
          </div>

          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              fontWeight: 900,
              color: "var(--text-white)",
              fontFamily: "var(--font-display)",
              marginBottom: "14px",
            }}
          >
            Ready to Start Your Driving Journey?
          </h2>

          <p
            style={{
              fontSize: "0.96rem",
              color: "var(--text-body)",
              lineHeight: 1.6,
              marginBottom: "36px",
            }}
          >
            Learn directly under verified instructional standards. Explore our 20-day training packages
            or get in touch with our admissions desk today.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="btn btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "0.92rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              <span>Explore Training</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "0.92rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              <PhoneCall size={16} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
