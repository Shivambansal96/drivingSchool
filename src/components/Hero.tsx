import React from "react";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

interface HeroProps {
  onExploreCourses: () => void;
  onContactUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onContactUs }) => {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "calc(var(--header-height) + 20px)",
        paddingBottom: "60px",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Background Cinematic Glows & Speed Lines */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "450px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.08) 0%, rgba(8, 9, 12, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            alignItems: "center",
          }}
        >
          {/* Left Column: Automotive Typography & CTAs */}
          <div style={{ maxWidth: "620px" }}>
            {/* Pill Tag */}
            <div
              className="section-tag"
              style={{
                marginBottom: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent-yellow)",
                  boxShadow: "0 0 10px var(--accent-yellow)",
                }}
              />
              GOVERNMENT APPROVED CURRICULUM • 20-DAY MODULES
            </div>

            {/* Main Heading: Triple Stack Power Typography */}
            <h1
              style={{
                fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--text-white)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              YOUR ROAD.
              <br />
              <span
                style={{
                  color: "var(--accent-yellow)",
                  textShadow: "0 0 35px rgba(255, 229, 0, 0.35)",
                }}
              >
                YOUR RULES.
              </span>
              <br />
              YOUR JOURNEY.
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                color: "var(--text-body)",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "540px",
              }}
            >
              Learn to drive with confidence. From your first two-wheeler ride to mastering
              four-wheelers and heavy vehicles, start your journey with{" "}
              <span className="notranslate" translate="no" style={{ fontWeight: 700, color: "var(--text-white)" }}>
                Ghosh Motor Training School
              </span>.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-cta-group"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                marginBottom: "36px",
              }}
            >
              <button
                onClick={onExploreCourses}
                className="btn btn-primary"
                style={{ padding: "14px 28px", fontSize: "0.95rem" }}
              >
                Explore Courses
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onContactUs}
                className="btn btn-secondary"
                style={{ padding: "14px 24px", fontSize: "0.95rem" }}
              >
                <PhoneCall size={18} />
                Contact Us
              </button>
            </div>

            {/* Telemetry Stat Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 85px), 1fr))",
                gap: "12px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--accent-yellow)",
                  }}
                >
                  3 CLASSES
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  2W, 4W & Heavy Commercial
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text-white)",
                  }}
                >
                  20 DAYS
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  Structured Daily Training
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text-white)",
                  }}
                >
                  06–09 AM
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  3 Morning Batches
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Training Fleet Visual Showcase */}
          <div
            className="hero-fleet-showcase"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {/* Glowing Accent Aura */}
            <div
              style={{
                position: "absolute",
                inset: "-8px",
                background: "radial-gradient(ellipse at center, rgba(255, 229, 0, 0.15) 0%, rgba(255, 229, 0, 0) 70%)",
                filter: "blur(20px)",
                borderRadius: "28px",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Showcase Card */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 229, 0, 0.08)",
                background: "linear-gradient(145deg, rgba(20, 24, 36, 0.95) 0%, rgba(10, 12, 18, 0.98) 100%)",
              }}
            >
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src="/images/assets/wagonR car + bike.jpg"
                  alt="Ghosh Motor Training School Training Fleet - Maruti WagonR and Two Wheeler"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                    aspectRatio: "4 / 3",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Top Corner Pill Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(8, 10, 15, 0.82)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 229, 0, 0.4)",
                    color: "var(--accent-yellow)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  <ShieldCheck size={14} color="var(--accent-yellow)" />
                  GOVT. REGISTERED FLEET
                </div>
              </div>

              {/* Card Footer Bar */}
              <div
                style={{
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(10, 12, 18, 0.8)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Maruti Suzuki WagonR & 2-Wheeler Fleet
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.76rem",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    Dual-Control Safety Pedals • Certified Instructors
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255, 229, 0, 0.12)",
                    border: "1px solid rgba(255, 229, 0, 0.3)",
                    color: "var(--accent-yellow)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  RTO CERTIFIED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
