import React, { useState } from "react";
import { Check, Sparkles, MessageSquare, Car, Bike, Truck } from "lucide-react";
import { SITE_DATA } from "../config/siteData";
import { createWhatsAppLink } from "../config/contact";

interface PricingProps {
  selectedVehicle?: string;
}

export const Pricing: React.FC<PricingProps> = ({ selectedVehicle }) => {
  // Available vehicle categories: 2 Wheelers, 4 Wheelers, MGV
  const vehicleCategories = SITE_DATA.vehicles;
  
  // Track user-clicked category override; fallback to selectedVehicle prop or default to "four-wheelers"
  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);

  const matchedPropCategory = selectedVehicle
    ? vehicleCategories.find(
        (v) =>
          v.id === selectedVehicle ||
          v.name.toLowerCase() === selectedVehicle.toLowerCase() ||
          v.shortName.toLowerCase() === selectedVehicle.toLowerCase()
      )?.id
    : undefined;

  const activeCategory = userSelectedCategory ?? matchedPropCategory ?? "four-wheelers";

  const currentCategoryData = vehicleCategories.find((v) => v.id === activeCategory) || vehicleCategories[1];
  const plans = SITE_DATA.pricingPlans;

  const getVehicleIcon = (id: string) => {
    switch (id) {
      case "two-wheelers":
        return <Bike size={18} />;
      case "mgv":
        return <Truck size={18} />;
      case "four-wheelers":
      default:
        return <Car size={18} />;
    }
  };

  return (
    <section id="pricing" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)", position: "relative" }}>
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 90vw)",
          height: "350px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">STRUCTURED PRACTICAL MODULES</div>
          <h2 className="section-title">CHOOSE YOUR TRAINING PLAN</h2>
          <p className="section-subtitle">
            Select a vehicle category to explore available training packages. Every plan includes
            practical hands-on driving with dual-control vehicle safety.
          </p>
        </div>

        {/* Visible Vehicle Category Selector Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "28px",
          }}
        >
          {vehicleCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setUserSelectedCategory(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "clamp(8px, 2vw, 12px) clamp(14px, 3.5vw, 22px)",
                  minHeight: "44px",
                  borderRadius: "var(--radius-full)",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(255, 229, 0, 0.22) 0%, rgba(255, 229, 0, 0.08) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  border: isSelected ? "2px solid var(--accent-yellow)" : "1px solid rgba(255, 255, 255, 0.12)",
                  color: isSelected ? "var(--accent-yellow)" : "var(--text-muted)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.82rem, 2.2vw, 0.92rem)",
                  fontWeight: isSelected ? 800 : 600,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isSelected ? "0 0 20px rgba(255, 229, 0, 0.2)" : "none",
                  touchAction: "manipulation",
                }}
              >
                {getVehicleIcon(cat.id)}
                <span>{cat.shortName}</span>
                {isSelected && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent-yellow)",
                      boxShadow: "0 0 8px var(--accent-yellow)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Prominent Active Fleet Banner */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 36px auto",
            padding: "clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)",
            borderRadius: "var(--radius-md)",
            background: "rgba(20, 24, 34, 0.7)",
            border: "1px solid rgba(255, 229, 0, 0.25)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "rgba(255, 229, 0, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-yellow)",
              }}
            >
              {getVehicleIcon(currentCategoryData.id)}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                Selected Category Pricing
              </div>
              <div style={{ fontSize: "0.94rem", fontWeight: 700, color: "var(--text-white)" }}>
                {currentCategoryData.name} — {currentCategoryData.tagline}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "0.78rem",
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {currentCategoryData.badge}
          </div>
        </div>

        {/* 3 Pricing Cards Grid: Group (₹3,000), Semi-Personal (₹5,500), Personal (₹11,000) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 3.5vw, 32px)",
            alignItems: "stretch",
            paddingTop: "20px",
            marginBottom: "50px",
          }}
        >
          {plans.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`glass-card ${isFeatured ? "card-yellow-glow" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "clamp(24px, 3.5vw, 34px) clamp(16px, 3vw, 26px)",
                  borderRadius: "var(--radius-xl)",
                  background: isFeatured
                    ? "linear-gradient(180deg, rgba(26, 32, 48, 0.95) 0%, rgba(14, 18, 28, 0.98) 100%)"
                    : "linear-gradient(180deg, rgba(16, 20, 30, 0.85) 0%, rgba(10, 12, 18, 0.95) 100%)",
                  border: isFeatured
                    ? "2px solid var(--accent-yellow)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "visible",
                  boxShadow: isFeatured
                    ? "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(255, 229, 0, 0.2)"
                    : "var(--shadow-md)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Featured Badge */}
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isFeatured
                        ? "linear-gradient(135deg, #FFE500 0%, #FFCC00 100%)"
                        : "rgba(24, 30, 44, 0.96)",
                      color: isFeatured ? "#000000" : "var(--accent-yellow)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(0.65rem, 1.8vw, 0.72rem)",
                      fontWeight: 800,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      maxWidth: "92%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      boxShadow: isFeatured
                        ? "0 4px 18px rgba(255, 229, 0, 0.45)"
                        : "0 4px 14px rgba(0, 0, 0, 0.6)",
                      border: isFeatured
                        ? "1.5px solid #FFE500"
                        : "1px solid rgba(255, 229, 0, 0.35)",
                      zIndex: 10,
                    }}
                  >
                    {isFeatured && <Sparkles size={11} style={{ display: "inline", marginRight: "4px" }} />}
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <div style={{ marginBottom: "18px", marginTop: plan.badge ? "10px" : "0" }}>
                    <h3
                      style={{
                        fontSize: "clamp(1.25rem, 3.2vw, 1.45rem)",
                        fontWeight: 800,
                        color: "var(--text-white)",
                        marginBottom: "4px",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>{plan.subtitle}</p>
                  </div>

                  {/* Price Block */}
                  <div
                    style={{
                      padding: "14px 0",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "clamp(2rem, 5vw, 2.7rem)",
                          fontWeight: 900,
                          color: isFeatured ? "var(--accent-yellow)" : "var(--text-white)",
                          fontFamily: "var(--font-display)",
                          lineHeight: 1,
                        }}
                      >
                        {plan.priceFormatted}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>/ full course</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "6px 10px",
                        marginTop: "10px",
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <span>⏱ {plan.duration}</span>
                      <span>•</span>
                      <span>🚗 {plan.sessionDuration}</span>
                      <span>•</span>
                      <span>👥 {plan.studentsPerSession}</span>
                    </div>
                  </div>

                  {/* Attention Level Highlight */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: "18px",
                      fontSize: "0.82rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>Instructor Ratio:</span>
                    <strong style={{ color: "var(--accent-yellow)", fontFamily: "var(--font-mono)" }}>
                      {plan.attentionLevel}
                    </strong>
                  </div>

                  {/* Plan Features Checklist */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "26px" }}>
                    {plan.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontSize: "0.85rem",
                          color: "var(--text-body)",
                          lineHeight: 1.45,
                        }}
                      >
                        <Check
                          size={15}
                          color="var(--accent-yellow)"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Now CTA */}
                <a
                  href={createWhatsAppLink({
                    planName: `${plan.name} (${currentCategoryData.shortName})`,
                    timeSlot: "Morning Batches (6-9 AM)",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isFeatured ? "btn btn-primary" : "btn btn-secondary"}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px",
                    minHeight: "48px",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    touchAction: "manipulation",
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Enquire Now</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Clear Notice regarding Pricing Integrity */}
        <div
          style={{
            textAlign: "center",
            fontSize: "0.82rem",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          * Practical driving curriculum with dual-control safety vehicles and verified fuel. Group & Semi-Personal span 20 days; Personal Fast-Track spans 10 days. Licence guidance available separately at ₹3,000.
        </div>
      </div>
    </section>
  );
};
