import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_DATA } from "../config/siteData";

interface VehicleCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const VehicleCategories: React.FC<VehicleCategoriesProps> = ({ onSelectCategory }) => {
  const categories = SITE_DATA.vehicles;

  return (
    <section id="vehicles" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)", position: "relative" }}>
      {/* Background radial accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CERTIFIED TRAINING DISCIPLINES</div>
          <h2 className="section-title">ONE ACADEMY. EVERY CATEGORY OF DRIVE.</h2>
          <p className="section-subtitle">
            Whether mastering two-wheel balance, developing complete four-wheel passenger car mastery,
            or advancing to professional medium goods transport.
          </p>
        </div>

        {/* 3 Large Vehicle Interactive Cards: 2 Wheelers, 4 Wheelers, MGV */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))",
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
                  height: "clamp(190px, 44vw, 230px)",
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
                    background: "linear-gradient(180deg, rgba(8, 9, 12, 0.15) 0%, rgba(8, 9, 12, 0.9) 100%)",
                  }}
                />

                {/* Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(10, 12, 18, 0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 229, 0, 0.4)",
                    color: "var(--accent-yellow)",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {cat.badge}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "clamp(20px, 3.5vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(1.2rem, 3.2vw, 1.38rem)",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      marginBottom: "6px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {cat.name}
                  </h3>

                  <div
                    style={{
                      color: "var(--accent-yellow)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {cat.tagline}
                  </div>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-body)",
                      lineHeight: 1.6,
                      marginBottom: "18px",
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Vehicle Types Included Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "18px",
                    }}
                  >
                    {cat.types.map((type) => (
                      <span
                        key={type}
                        style={{
                          fontSize: "0.74rem",
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "var(--text-muted)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Key Syllabus Highlights */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                      marginBottom: "24px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                      paddingTop: "14px",
                    }}
                  >
                    {cat.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.45,
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          color="var(--accent-yellow)"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore Pricing CTA */}
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="btn btn-secondary"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    fontSize: "0.86rem",
                    cursor: "pointer",
                  }}
                >
                  <span>Explore Training & Pricing</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
