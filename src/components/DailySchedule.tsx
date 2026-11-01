import React from "react";
import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "../config/contact";
import type { ScheduleSlot } from "../types";

export const DailySchedule: React.FC = () => {
  const slots: ScheduleSlot[] = [
    {
      id: "slot-1",
      timeRange: "06:00 AM – 07:00 AM",
      batchName: "BATCH 01: DAWN PATROL",
      description:
        "Quiet, tranquil morning roads with minimal traffic. The ultimate serene atmosphere for complete beginners to master clutch engagement, gear shifts, and smooth steering.",
      roadCondition: "Zero / Light Traffic",
      suitableFor: "Complete Beginners & Nervous Starters",
      iconType: "dawn",
    },
    {
      id: "slot-2",
      timeRange: "07:00 AM – 08:00 AM",
      batchName: "BATCH 02: GOLDEN HOUR",
      description:
        "Moderate ambient morning traffic and clear daylight. Excellent for developing real-world road observation, intersection etiquette, and lane discipline.",
      roadCondition: "Mild Morning Flow",
      suitableFor: "Confidence Building & Intersection Practice",
      iconType: "sunrise",
    },
    {
      id: "slot-3",
      timeRange: "08:00 AM – 09:00 AM",
      batchName: "BATCH 03: CITY FLOW",
      description:
        "Simulates active weekday traffic conditions with pedestrian movement and buses. Ideal for advanced learners preparing for everyday office and city commutes.",
      roadCondition: "Active City Commute Traffic",
      suitableFor: "Final Phase Learners & City Traffic Mastery",
      iconType: "morning",
    },
  ];

  return (
    <section id="schedule" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CONVENIENT MORNING SESSIONS</div>
          <h2 className="section-title">YOUR DAY BEHIND THE WHEEL</h2>
          <p className="section-subtitle">
            Our structured driving sessions run during prime early morning hours to offer optimal road
            conditions, cooler temperatures, and zero disruption to your daily work or college schedule.
          </p>
        </div>

        {/* 3 Morning Time Slot Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: "clamp(18px, 3vw, 24px)",
            marginBottom: "40px",
          }}
        >
          {slots.map((slot, index) => (
            <div
              key={slot.id}
              className="glass-card"
              style={{
                padding: "clamp(22px, 3.5vw, 32px) clamp(16px, 3vw, 26px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(20, 24, 34, 0.8) 0%, rgba(12, 14, 20, 0.95) 100%)",
                position: "relative",
              }}
            >
              <div>
                {/* Header with Animated Clock & Badge */}
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
                      width: "56px",
                      height: "56px",
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
                    {/* SVG Clock with Animated Hands */}
                    <svg width="42" height="42" viewBox="0 0 100 100">
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

                  {/* Batch Tag */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--accent-yellow)",
                      background: "var(--accent-yellow-dim)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255, 229, 0, 0.25)",
                    }}
                  >
                    {slot.batchName}
                  </span>
                </div>

                {/* Time Display */}
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-white)",
                    marginBottom: "12px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {slot.timeRange}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-body)",
                    lineHeight: 1.55,
                    marginBottom: "20px",
                  }}
                >
                  {slot.description}
                </p>

                {/* Parameters */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    background: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "24px",
                    fontSize: "0.8rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Road Condition:</span>
                    <span style={{ color: "var(--text-white)", fontWeight: 600 }}>
                      {slot.roadCondition}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Recommended:</span>
                    <span style={{ color: "var(--accent-yellow)", fontWeight: 600 }}>
                      {slot.suitableFor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Your Slot CTA */}
              <a
                href={createWhatsAppLink({
                  timeSlot: slot.timeRange,
                  type: "slot",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "0.86rem",
                  justifyContent: "space-between",
                }}
              >
                <span>Book Your Slot</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Prominent SUNDAY CLOSED Notice with Calendar Visual */}
        <div
          className="glass-card"
          style={{
            padding: "clamp(20px, 3.5vw, 28px) clamp(16px, 3.5vw, 32px)",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, rgba(30, 20, 24, 0.85) 0%, rgba(18, 14, 18, 0.95) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 84px), 1fr))",
            gap: "clamp(16px, 3vw, 28px)",
            alignItems: "center",
          }}
        >
          {/* Calendar Graphic with Sunday Crossed Out */}
          <div
            style={{
              width: "84px",
              height: "92px",
              background: "#0d0f14",
              borderRadius: "12px",
              border: "2px solid rgba(239, 68, 68, 0.6)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              flexShrink: 0,
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.2)",
            }}
          >
            {/* Calendar Header */}
            <div
              style={{
                background: "var(--accent-red)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
                textAlign: "center",
                padding: "4px 0",
                textTransform: "uppercase",
              }}
            >
              SUN
            </div>

            {/* Calendar Day & Big Red 'X' */}
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "var(--text-muted)",
                position: "relative",
              }}
            >
              CLOSED
              {/* Diagonal Cross Lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "85%",
                    height: "3px",
                    background: "var(--accent-red)",
                    transform: "rotate(45deg)",
                    boxShadow: "0 0 8px var(--accent-red)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "85%",
                    height: "3px",
                    background: "var(--accent-red)",
                    transform: "rotate(-45deg)",
                    boxShadow: "0 0 8px var(--accent-red)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sunday Notice Text */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "var(--accent-red)",
                  background: "rgba(239, 68, 68, 0.15)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                }}
              >
                SUNDAY CLOSED
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Fleet Maintenance & Road Safety Day
              </span>
            </div>

            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-white)",
                marginBottom: "8px",
              }}
            >
              Active Training Schedule: Monday through Saturday
            </h4>

            <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.5 }}>
              On Sundays, our dual-control vehicles undergo strict mechanical inspections, brake
              servicing, sanitization, and tire safety checks. All batch training is conducted
              Monday through Saturday across the three morning slots.
            </p>

            <div
              style={{
                marginTop: "10px",
                fontSize: "0.78rem",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
              }}
            >
              * Note: Time slots shown are informational and subject to batch confirmation upon
              admission.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
