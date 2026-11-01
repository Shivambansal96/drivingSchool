import React from "react";
import { ShieldCheck, Clock, Compass, Layers, Car, FileCheck } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      num: "01",
      title: "Three Vehicle Disciplines",
      desc: "Comprehensive training available across Two-Wheelers (scooter/bike), Four-Wheelers (hatchback/sedan), and Heavy Commercial Vehicles (truck/lorry).",
      icon: Car,
      tag: "FULL FLEET RANGE",
    },
    {
      num: "02",
      title: "Multiple Training Formats",
      desc: "Pick the learning atmosphere that matches your comfort: affordable Group Training, balanced Semi-Personal (2 students), or dedicated 1-on-1 Personal Training.",
      icon: Layers,
      tag: "3 FLEXIBLE PLANS",
    },
    {
      num: "03",
      title: "Structured 20-Day Programme",
      desc: "Every package runs for a full 20 calendar days with daily 1-hour driving sessions ensuring steady muscle memory and continuous progression.",
      icon: Clock,
      tag: "20 DAYS CURRICULUM",
    },
    {
      num: "04",
      title: "Convenient Morning Batches",
      desc: "Choose from 06:00 AM, 07:00 AM, or 08:00 AM morning batches designed for serene traffic, clear visibility, and seamless fit around your work or college schedule.",
      icon: Compass,
      tag: "EARLY MORNING SLOTS",
    },
    {
      num: "05",
      title: "Driving Licence Assistance",
      desc: "Get step-by-step guidance for documentation, online Parivahan filing, learner's licence prep, and practical test track simulations for ₹3,000.",
      icon: FileCheck,
      tag: "RTO GUIDANCE",
    },
    {
      num: "06",
      title: "Practical Road Safety Education",
      desc: "Go beyond basic steering. Master traffic signs, signal rules, safe following distance, defensive driving, and pedestrian safety on actual roads.",
      icon: ShieldCheck,
      tag: "DEFENSIVE ROAD AWARENESS",
    },
  ];

  return (
    <section className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.04) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">VERIFIED CORE ADVANTAGES</div>
          <h2 className="section-title">WHY CHOOSE GHOSH MOTOR TRAINING SCHOOL?</h2>
          <p className="section-subtitle">
            A transparent, disciplined approach to driver education built upon comprehensive vehicle
            classes, verified schedules, and personalized instruction.
          </p>
        </div>

        {/* 6 High-Impact Highlight Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: "clamp(20px, 3vw, 28px)",
          }}
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="glass-card"
                style={{
                  padding: "clamp(22px, 3.5vw, 32px)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "linear-gradient(180deg, rgba(16, 20, 30, 0.85) 0%, rgba(10, 12, 18, 0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-yellow)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "2rem",
                        fontWeight: 900,
                        color: "var(--accent-yellow)",
                        lineHeight: 1,
                      }}
                    >
                      {item.num}
                    </div>

                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "rgba(255, 229, 0, 0.1)",
                        border: "1px solid rgba(255, 229, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} color="var(--accent-yellow)" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "var(--accent-yellow)",
                      letterSpacing: "0.08em",
                      marginBottom: "10px",
                    }}
                  >
                    {item.tag}
                  </div>

                  <h4
                    style={{
                      fontSize: "1.28rem",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-body)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
