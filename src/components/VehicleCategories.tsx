import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { VehicleCategory } from "../types";

interface VehicleCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const VehicleCategories: React.FC<VehicleCategoriesProps> = ({ onSelectCategory }) => {
  const categories: VehicleCategory[] = [
    {
      id: "two-wheelers",
      name: "TWO-WHEELERS",
      tagline: "Agility, Balance & Safe Riding Fundamentals",
      types: ["Scooty (Gearless)", "Motorcycle / Bike (Geared)", "Commuter & Sports"],
      description:
        "Learn balance, control, braking, turning, and safe road riding. Designed for first-time riders to develop rock-solid confidence in city traffic, slope starts, and defensive riding.",
      image: "/images/two_wheelers.jpg",
      highlights: [
        "Clutch-throttle sync & smooth progressive gear shifting",
        "Front & rear combined brake modulation technique",
        "Slow-speed slalom balance and tight U-turn maneuvering",
        "Blind-spot mirror observation & defensive helmet discipline",
      ],
      badge: "CLASS 1: 2W",
    },
    {
      id: "four-wheelers",
      name: "FOUR-WHEELERS",
      tagline: "Precision Steering, Clutch Mastery & Road Confidence",
      types: ["Hatchback", "Sedan", "SUV & Modern Cars"],
      description:
        "Learn steering, clutch control, gears, parking, reversing, and road driving. Train on dual-control vehicles with experienced instructors covering daily traffic and highway conditions.",
      image: "/images/four_wheelers.jpg",
      highlights: [
        "Half-clutch biting point & anti-stall hill start technique",
        "Precision parallel, angular, and 90-degree bay parking",
        "Mastering 3-point turns and high-accuracy reverse slalom",
        "Highway lane navigation, speed discipline, and overtaking etiquette",
      ],
      badge: "CLASS 2: LMV",
    },
    {
      id: "heavy-vehicles",
      name: "HEAVY VEHICLES",
      tagline: "Commercial Rig Control, Load Dynamics & Highway Safety",
      types: ["Lorry", "Heavy Truck", "Commercial Transport Vehicles"],
      description:
        "Understand vehicle handling, road awareness, turning radius, braking, and heavy-vehicle driving fundamentals. Specialized commercial curriculum for career drivers.",
      image: "/images/heavy_vehicles.jpg",
      highlights: [
        "Wide turning sweep calculations & rear overhang swing awareness",
        "Pneumatic air brake dynamics & safe thermal brake management",
        "Heavy vehicle blind-spot mitigation & mirror positioning",
        "Commercial vehicle road rules, night highway driving & weight balance",
      ],
      badge: "CLASS 3: HMV",
    },
  ];

  return (
    <section id="vehicles" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)" }}>
      {/* Background radial accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">FLEET & DISCIPLINES</div>
          <h2 className="section-title">ONE SCHOOL. EVERY KIND OF DRIVE.</h2>
          <p className="section-subtitle">
            Whether you are stepping onto two wheels for the first time, mastering car driving for
            everyday independence, or training for a professional heavy-vehicle career.
          </p>
        </div>

        {/* 3 Large Vehicle Interactive Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(20px, 3vw, 28px)",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                background: "linear-gradient(180deg, rgba(20, 24, 34, 0.85) 0%, rgba(12, 14, 20, 0.95) 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255, 229, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              {/* Vehicle Visual Header */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(180px, 44vw, 230px)",
                  overflow: "hidden",
                  backgroundColor: "#000",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Dark Gradient Overlay for text contrast */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(8, 9, 12, 0.2) 0%, rgba(8, 9, 12, 0.9) 100%)",
                  }}
                />

                {/* Class Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: "rgba(8, 9, 12, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 229, 0, 0.35)",
                    color: "var(--accent-yellow)",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {cat.badge}
                </div>

                {/* Sub-types pills at bottom of image */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "14px",
                    right: "14px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {cat.types.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        background: "rgba(0, 0, 0, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "var(--text-white)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      marginBottom: "6px",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--accent-yellow)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      marginBottom: "14px",
                    }}
                  >
                    {cat.tagline}
                  </div>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-body)",
                      lineHeight: 1.55,
                      marginBottom: "20px",
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Highlights checklist */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "26px",
                    }}
                  >
                    {cat.highlights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontSize: "0.84rem",
                          color: "var(--text-body)",
                          lineHeight: 1.4,
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="var(--accent-yellow)"
                          style={{ marginTop: "2px", flexShrink: 0 }}
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectCategory(cat.name)}
                  className="btn btn-outline-yellow"
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    fontSize: "0.88rem",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Explore Courses</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
