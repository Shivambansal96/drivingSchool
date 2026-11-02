import React from "react";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import { SITE_DATA } from "../config/siteData";

export const DailySchedule: React.FC = () => {
  const slots = SITE_DATA.schedule.activeSlots;

  return (
    <section id="schedule" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)", position: "relative" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">EARLY MORNING BATCH TIMETABLE</div>
          <h2 className="section-title">DAILY TRAINING TIMINGS</h2>
          <p className="section-subtitle">
            Our structured driving sessions run during prime early morning hours to provide clear road
            conditions, minimal traffic congestion, and zero disruption to your daily work or college schedule.
          </p>
        </div>

        {/* 3 Morning Time Slot Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: "clamp(18px, 3vw, 24px)",
            marginBottom: "30px",
          }}
        >
          {slots.map((slot, index) => (
            <div
              key={slot.id}
              className="glass-card"
              style={{
                padding: "clamp(24px, 3.5vw, 32px) clamp(18px, 3vw, 26px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(20, 24, 34, 0.85) 0%, rgba(12, 14, 20, 0.95) 100%)",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.7), 0 0 25px rgba(255, 229, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <div>
                {/* Header with Analog Clock Dial & Batch Tag */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  {/* Stylized Analog Clock Visual */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(10, 13, 20, 0.9)",
                      border: "2px solid var(--accent-yellow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 0 16px rgba(255, 229, 0, 0.25)",
                    }}
                  >
                    <svg width="38" height="38" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                      {/* Hour markers */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <line
                          key={deg}
                          x1="50"
                          y1="10"
                          x2="50"
                          y2="16"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="2"
                          transform={`rotate(${deg} 50 50)`}
                        />
                      ))}
                      {/* Hour Hand */}
                      <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="24"
                        stroke="var(--accent-yellow)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform={`rotate(${index * 30 + 180} 50 50)`}
                      />
                      {/* Minute Hand */}
                      <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="18"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        transform={`rotate(${index * 60} 50 50)`}
                      />
                      <circle cx="50" cy="50" r="3" fill="var(--accent-yellow)" />
                    </svg>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: "var(--accent-yellow)",
                      background: "var(--accent-yellow-dim)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    SLOT 0{index + 1}
                  </span>
                </div>

                {/* Exact Time Window */}
                <div
                  style={{
                    fontSize: "clamp(1.2rem, 3.2vw, 1.45rem)",
                    fontWeight: 900,
                    color: "var(--text-white)",
                    fontFamily: "var(--font-display)",
                    marginBottom: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Clock size={18} color="var(--accent-yellow)" />
                  <span>{slot.timeRange}</span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.76rem",
                    color: "var(--accent-yellow)",
                    fontWeight: 700,
                    marginBottom: "14px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {slot.batchName}
                </div>

                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--text-body)",
                    lineHeight: 1.55,
                    marginBottom: "20px",
                  }}
                >
                  {slot.description}
                </p>

                {/* Road Condition & Target Learner */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    fontSize: "0.78rem",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-dim)" }}>Road Traffic:</span>
                    <strong style={{ color: "var(--text-white)" }}>{slot.roadCondition}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-dim)" }}>Ideal For:</span>
                    <strong style={{ color: "var(--accent-yellow)" }}>{slot.suitableFor}</strong>
                  </div>
                </div>
              </div>

              {/* Reserve Slot Button */}
              <a
                href={createWhatsAppLink({
                  timeSlot: slot.timeRange,
                  planName: slot.batchName,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                <span>Reserve Morning Slot</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* COMPACT SUNDAY BADGE / LINE (Explicit Instruction: Do not give Sunday a large card) */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "12px 20px",
            borderRadius: "var(--radius-md)",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "#ff6b6b",
                background: "rgba(239, 68, 68, 0.16)",
                padding: "3px 8px",
                borderRadius: "4px",
                letterSpacing: "0.06em",
              }}
            >
              SUNDAY: CLOSED
            </span>
            <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
              Fleet maintenance, dual-control brake servicing & instructor rest.
            </span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.78rem",
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <ShieldCheck size={14} color="var(--accent-yellow)" />
            <span>Mon–Sat Active Batches</span>
          </div>
        </div>
      </div>
    </section>
  );
};
