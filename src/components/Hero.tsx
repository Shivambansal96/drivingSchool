import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Hero3DCar } from "./Hero3DCar";

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

          {/* Right Column: 3D Car Visual Attraction */}
          <div
            className="hero-3d-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(340px, 50vh, 560px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Hero3DCar />
          </div>
        </div>
      </div>
    </section>
  );
};
