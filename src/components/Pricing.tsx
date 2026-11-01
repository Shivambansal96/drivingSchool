import React from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import type { PricingPlan } from "../types";
import { createWhatsAppLink } from "../config/contact";

interface PricingProps {
  selectedVehicle?: string;
}

export const Pricing: React.FC<PricingProps> = ({ selectedVehicle }) => {
  const plans: PricingPlan[] = [
    {
      id: "group",
      name: "Group Training",
      subtitle: "Collaborative, budget-friendly learning",
      price: 3000,
      priceFormatted: "₹3,000",
      duration: "20 Days",
      studentsPerSession: "Normally 3 (Up to 4 max)",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "Shared (1:3 - 1:4)",
      description:
        "Ideal for budget-conscious beginners who benefit from peer observation and group learning dynamics.",
      features: [
        "Affordable group learning format",
        "Shared instructor attention (3-4 learners per vehicle)",
        "Daily 1-hour session with alternating wheel time",
        "Full 20-day structured syllabus",
        "Dual-control training vehicle safety",
        "Foundational traffic rules & road awareness",
      ],
      whatsappMessage:
        "Hello Ghosh Motor Training School, I am interested in joining the Group Training plan (₹3,000, 20 Days). Please share details.",
    },
    {
      id: "semi-personal",
      name: "Semi-Personal Training",
      subtitle: "Balanced pacing & higher wheel time",
      price: 5500,
      priceFormatted: "₹5,500",
      duration: "20 Days",
      studentsPerSession: "2 Students Only",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "Semi-Individual (1:2)",
      description:
        "The sweet spot for learners wanting double the behind-the-wheel practice with a smaller peer group.",
      features: [
        "More individual instructor attention",
        "Smaller group strictly limited to 2 learners per car",
        "Substantially increased hands-on wheel time",
        "Full 20-day comprehensive training programme",
        "Faster error correction & targeted maneuvers",
        "Dual-control training vehicle safety",
      ],
      badge: "BALANCED CHOICE",
      whatsappMessage:
        "Hello Ghosh Motor Training School, I am interested in joining the Semi-Personal Training plan (₹5,500, 20 Days). Please share details.",
    },
    {
      id: "personal",
      name: "Personal Training",
      subtitle: "100% Dedicated 1-on-1 instruction",
      price: 11000,
      priceFormatted: "₹11,000",
      duration: "20 Days",
      studentsPerSession: "1 Student (1-on-1)",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "1-on-1 Dedicated (1:1)",
      description:
        "Premium one-to-one coaching tailored entirely to your learning speed, confidence level, and schedule.",
      features: [
        "100% Dedicated one-to-one instructor attention",
        "Full 60 minutes uninterrupted daily driving time",
        "Customized learning pace focused on your weak spots",
        "Full 20-day intensive training programme",
        "Faster confidence building in dense city traffic",
        "Priority batch scheduling & dual-control safety",
      ],
      featured: true,
      badge: "MOST POPULAR • MAXIMUM TIME",
      whatsappMessage:
        "Hello Ghosh Motor Training School, I am interested in joining the 1-on-1 Personal Training plan (₹11,000, 20 Days). Please share details.",
    },
  ];

  return (
    <section id="pricing" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "350px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">20-DAY PACKAGES</div>
          <h2 className="section-title">CHOOSE YOUR DRIVING EXPERIENCE</h2>
          <p className="section-subtitle">
            Flexible training options designed around your learning preference. Each plan spans a
            rigorous 20-day training programme with clear distinctions in instructor attention and
            wheel time.
          </p>
          {selectedVehicle && (
            <div
              style={{
                marginTop: "16px",
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--accent-yellow)",
                background: "var(--accent-yellow-dim)",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(255, 229, 0, 0.3)",
              }}
            >
              Selected Fleet Category: <strong>{selectedVehicle}</strong>
            </div>
          )}
        </div>

        {/* 3 Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 3.5vw, 32px)",
            alignItems: "stretch",
            marginBottom: "50px",
            paddingTop: "20px",
          }}
        >
          {plans.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`glass-card ${isFeatured ? "card-yellow-glow animate-pulse-glow" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "clamp(28px, 4vw, 40px) clamp(18px, 3vw, 30px) clamp(24px, 4vw, 36px)",
                  borderRadius: "var(--radius-xl)",
                  background: isFeatured
                    ? "linear-gradient(180deg, rgba(26, 32, 48, 0.95) 0%, rgba(14, 18, 28, 0.98) 100%)"
                    : "linear-gradient(180deg, rgba(16, 20, 30, 0.8) 0%, rgba(10, 12, 18, 0.9) 100%)",
                  border: isFeatured
                    ? "2px solid var(--accent-yellow)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  transform: isFeatured ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.3s ease",
                  overflow: "visible", // Prevent badge from being clipped
                }}
              >
                {/* Top Badge for Featured / Recommended */}
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isFeatured
                        ? "var(--accent-yellow)"
                        : "rgba(22, 27, 40, 0.96)",
                      color: isFeatured ? "#000000" : "var(--text-white)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      lineHeight: 1.2,
                      padding: "5px 16px",
                      borderRadius: "var(--radius-full)",
                      boxShadow: isFeatured
                        ? "0 4px 18px rgba(255, 229, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.5)"
                        : "0 4px 14px rgba(0, 0, 0, 0.7)",
                      border: isFeatured
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255, 255, 255, 0.22)",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 800,
                        color: "var(--text-white)",
                        marginBottom: "6px",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      marginBottom: "24px",
                      paddingBottom: "22px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span
                      className="notranslate"
                      translate="no"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.4rem, 3.5vw, 3.2rem)",
                        fontWeight: 800,
                        color: isFeatured ? "var(--accent-yellow)" : "var(--text-white)",
                        lineHeight: 1,
                      }}
                    >
                      {plan.priceFormatted}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      / 20-Day Course
                    </span>
                  </div>

                  {/* Core Metrics Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "24px",
                      background: "rgba(0, 0, 0, 0.25)",
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                        STUDENTS / CAR
                      </div>
                      <div
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: isFeatured ? "var(--accent-yellow)" : "var(--text-white)",
                          marginTop: "2px",
                        }}
                      >
                        {plan.studentsPerSession}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                        DAILY DURATION
                      </div>
                      <div
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "var(--text-white)",
                          marginTop: "2px",
                        }}
                      >
                        {plan.sessionDuration}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-body)",
                      lineHeight: 1.55,
                      marginBottom: "24px",
                    }}
                  >
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "32px",
                    }}
                  >
                    {plan.features.map((feat, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontSize: "0.86rem",
                          color: "var(--text-body)",
                        }}
                      >
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: isFeatured
                              ? "var(--accent-yellow-dim)"
                              : "rgba(255, 255, 255, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <Check
                            size={12}
                            color={isFeatured ? "var(--accent-yellow)" : "var(--text-muted)"}
                          />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Now CTA Button */}
                <a
                  href={createWhatsAppLink({
                    planName: plan.name,
                    price: plan.priceFormatted,
                    type: "plan",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${isFeatured ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    fontSize: "0.92rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <span>Enquire Now</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Plan Comparison Matrix Table */}
        <div
          className="glass-card"
          style={{
            padding: "clamp(20px, 3.5vw, 32px)",
            borderRadius: "var(--radius-xl)",
            background: "rgba(14, 17, 26, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Sparkles size={20} color="var(--accent-yellow)" />
              <h4 style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "var(--text-white)", margin: 0 }}>
                DIRECT COMPARISON: ATTENTION & TRAINING FORMAT
              </h4>
            </div>

            <div className="swipe-hint-badge">
              <span>← Swipe table horizontally to compare →</span>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "620px",
                fontSize: "0.88rem",
              }}
            >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <th style={{ textAlign: "left", padding: "14px 10px", color: "var(--text-muted)" }}>
                  Training Parameter
                </th>
                <th style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-white)" }}>
                  Group Training (₹3,000)
                </th>
                <th style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-white)" }}>
                  Semi-Personal (₹5,500)
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 10px",
                    color: "var(--accent-yellow)",
                    fontWeight: 800,
                  }}
                >
                  Personal Training (₹11,000)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "14px 10px", color: "var(--text-body)" }}>
                  Instructor Dedication
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-dim)" }}>
                  Shared among 3–4 learners
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-body)" }}>
                  Shared between 2 learners
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 10px",
                    color: "var(--accent-yellow)",
                    fontWeight: 700,
                  }}
                >
                  100% Dedicated to you
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "14px 10px", color: "var(--text-body)" }}>
                  In-Car Daily Wheel Time
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-dim)" }}>
                  Rotational during 1 hour
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-body)" }}>
                  ~30 mins direct driving / day
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 10px",
                    color: "var(--accent-yellow)",
                    fontWeight: 700,
                  }}
                >
                  Full 60 mins non-stop driving
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <td style={{ padding: "14px 10px", color: "var(--text-body)" }}>
                  Customized Learning Speed
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-dim)" }}>
                  Standard group pace
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-body)" }}>
                  Moderate adaptation
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 10px",
                    color: "var(--accent-yellow)",
                    fontWeight: 700,
                  }}
                >
                  100% Customized to your confidence
                </td>
              </tr>

              <tr>
                <td style={{ padding: "14px 10px", color: "var(--text-body)" }}>
                  Total Course Span
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-white)" }}>
                  20 Days
                </td>
                <td style={{ textAlign: "center", padding: "14px 10px", color: "var(--text-white)" }}>
                  20 Days
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "14px 10px",
                    color: "var(--accent-yellow)",
                    fontWeight: 700,
                  }}
                >
                  20 Days
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
};
