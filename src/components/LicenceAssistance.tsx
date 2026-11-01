import React from "react";
import {
  FileText,
  CreditCard,
  Image as ImageIcon,
  Files,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import type { LicenceStep, DocumentRequirement } from "../types";

export const LicenceAssistance: React.FC = () => {
  const steps: LicenceStep[] = [
    {
      step: "01",
      title: "Document Preparation",
      description:
        "Comprehensive verification of Aadhaar, PAN card, address records, and passport photos to ensure full compliance with current RTO documentation standards.",
      keyDeliverable: "Audit & Document Dossier Creation",
    },
    {
      step: "02",
      title: "Application Assistance",
      description:
        "Guidance through official government Parivahan Sarathi portal registration, form filing, category selection, and state fee submission assistance.",
      keyDeliverable: "Accurate Portal Filing & Slot Booking",
    },
    {
      step: "03",
      title: "Learner's Licence (LL) Process",
      description:
        "Mock traffic sign and road safety test preparation to help you clear the mandatory computer-based LL exam with full confidence.",
      keyDeliverable: "LL Test Prep & Guidance Support",
    },
    {
      step: "04",
      title: "Driving Test Preparation",
      description:
        "Intensive simulation on official RTO testing patterns including H-track maneuvering, 8-figure driving, gradient stop-start, and parallel parking.",
      keyDeliverable: "Test Track Maneuver Rehearsal",
    },
    {
      step: "05",
      title: "Driving Licence (DL) Process",
      description:
        "Guidance through final practical test day protocols, inspector trial run procedures, biometric verification, and tracking DL dispatch status.",
      keyDeliverable: "Final Practical Trial Day Support",
    },
  ];

  const documents: DocumentRequirement[] = [
    {
      id: "aadhaar",
      title: "Aadhaar Card",
      subtitle: "Identity & Address Proof",
      details: "Original card + clear self-attested photocopies with updated mobile number link.",
      iconName: "FileText",
      mandatory: true,
    },
    {
      id: "pan",
      title: "PAN Card",
      subtitle: "Government ID Verification",
      details: "Official Permanent Account Number card or verified Form 60 where applicable.",
      iconName: "CreditCard",
      mandatory: true,
    },
    {
      id: "photos",
      title: "Passport-size Photographs",
      subtitle: "Recent Studio Prints",
      details: "4 to 6 recent color photographs with plain light background (no sunglasses).",
      iconName: "ImageIcon",
      mandatory: true,
    },
    {
      id: "other",
      title: "Other Applicable Documents",
      subtitle: "RTO Discretionary Papers",
      details: "Medical Certificate (Form 1A) for commercial applicants, age proof or rental deed if applicable.",
      iconName: "Files",
      mandatory: false,
    },
  ];

  return (
    <section id="licence" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "600px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">RTO PROCESS GUIDANCE</div>
          <h2 className="section-title">YOUR LICENCE. YOUR NEXT MILESTONE.</h2>
          <p className="section-subtitle">
            Navigating licensing procedures can feel overwhelming. Ghosh Motor Training School
            provides structured assistance, document review, and practical track preparation at every
            stage.
          </p>
        </div>

        {/* Feature Hero Card with 3D Smart Card Image */}
        <div
          className="glass-card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 4vw, 36px)",
            alignItems: "center",
            padding: "clamp(20px, 4vw, 36px)",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, rgba(24, 28, 40, 0.9) 0%, rgba(12, 14, 22, 0.95) 100%)",
            border: "1px solid rgba(255, 229, 0, 0.3)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 229, 0, 0.12)",
            marginBottom: "50px",
          }}
        >
          {/* Left Column: Price & Highlights */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--accent-yellow)",
                background: "var(--accent-yellow-dim)",
                padding: "4px 12px",
                borderRadius: "var(--radius-sm)",
                marginBottom: "16px",
              }}
            >
              <Award size={14} />
              COMPREHENSIVE RTO GUIDANCE SERVICE
            </div>

            <h3
              style={{
                fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--text-white)",
                marginBottom: "12px",
              }}
            >
              Driving Licence Assistance
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <span
                className="notranslate"
                translate="no"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 3.8vw, 3.4rem)",
                  fontWeight: 900,
                  color: "var(--accent-yellow)",
                }}
              >
                ₹3,000
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                }}
              >
                Assistance & Process Guidance Fee
              </span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              From drafting your online application on the official transport portal to preparing you
              for the actual track driving test, our experienced coordinators guide you through each
              milestone smoothly and systematically.
            </p>

            {/* Crucial Advisory Box */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "16px",
                background: "rgba(255, 229, 0, 0.06)",
                border: "1px solid rgba(255, 229, 0, 0.25)",
                borderRadius: "var(--radius-md)",
                marginBottom: "28px",
              }}
            >
              <ShieldCheck size={20} color="var(--accent-yellow)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "0.82rem", color: "var(--text-body)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--accent-yellow)" }}>Important Advisory:</strong> We
                provide professional assistance and skill preparation for the licensing process. Final
                licence issuance is strictly subject to applicant eligibility, government RTO
                regulations, and passing the official motor vehicle driving test. We do not guarantee
                unconditional issuance.
              </div>
            </div>

            <a
              href={createWhatsAppLink({ type: "licence" })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: "14px 28px" }}
            >
              <span>Enquire for Licence Assistance</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Right Column: 3D Smart Card Visual */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.7)",
            }}
          >
            <img
              src="/images/licence_card.jpg"
              alt="3D Smart Driving Licence Illustration"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "360px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* 5-Step Illustrated Journey */}
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "36px",
            }}
          >
            <h4
              style={{
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "var(--text-white)",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              The 5-Step Licensing Journey
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "6px" }}>
              A clear, step-by-step roadmap from initial documentation to your permanent driving licence.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "clamp(14px, 2.5vw, 20px)",
            }}
          >
            {steps.map((st) => (
              <div
                key={st.step}
                className="glass-card"
                style={{
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(16, 20, 30, 0.7)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      color: "var(--accent-yellow)",
                      lineHeight: 1,
                      marginBottom: "12px",
                      opacity: 0.9,
                    }}
                  >
                    {st.step}
                  </div>

                  <h5
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text-white)",
                      marginBottom: "10px",
                    }}
                  >
                    {st.title}
                  </h5>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-body)",
                      lineHeight: 1.5,
                      marginBottom: "16px",
                    }}
                  >
                    {st.description}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent-yellow)",
                    padding: "6px 10px",
                    background: "rgba(255, 229, 0, 0.08)",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 229, 0, 0.2)",
                  }}
                >
                  ✓ {st.keyDeliverable}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Section */}
        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <h4
              style={{
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "var(--text-white)",
                textTransform: "uppercase",
              }}
            >
              Required Documents
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "6px" }}>
              Please keep the following standard documents ready when initiating the licensing process.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
              marginBottom: "28px",
            }}
          >
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="glass-card"
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  background: "rgba(14, 18, 28, 0.85)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "10px",
                        background: "rgba(255, 229, 0, 0.12)",
                        border: "1px solid rgba(255, 229, 0, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {doc.id === "aadhaar" && <FileText size={22} color="var(--accent-yellow)" />}
                      {doc.id === "pan" && <CreditCard size={22} color="var(--accent-yellow)" />}
                      {doc.id === "photos" && <ImageIcon size={22} color="var(--accent-yellow)" />}
                      {doc.id === "other" && <Files size={22} color="var(--accent-yellow)" />}
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: doc.mandatory ? "var(--accent-yellow)" : "var(--text-dim)",
                        background: doc.mandatory
                          ? "rgba(255, 229, 0, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        border: doc.mandatory
                          ? "1px solid rgba(255, 229, 0, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {doc.mandatory ? "MANDATORY" : "AS APPLICABLE"}
                    </span>
                  </div>

                  <h5
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text-white)",
                      marginBottom: "4px",
                    }}
                  >
                    {doc.title}
                  </h5>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--accent-yellow)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "10px",
                    }}
                  >
                    {doc.subtitle}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5 }}>
                    {doc.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RTO Variation Disclaimer Notice */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
          >
            <AlertTriangle size={18} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />
            <span>
              * <strong>Document Requirements Notice:</strong> Additional documents (such as Form 1A
              medical fitness certificate for heavy vehicle licenses, age proof affidavit, or
              parental consent for gearless 16-18 age group) may be required depending on applicant
              circumstances and current state transport authority guidelines.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
