import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Info,
  AlertTriangle,
  Lightbulb,
  X,
  Compass,
  ArrowRight,
} from "lucide-react";
import type { ChapterConfig, ComponentCallout, GearPosition } from "../../types/automotive";

interface CockpitHudControlsProps {
  currentChapter: ChapterConfig;
  selectedCallout: ComponentCallout | null;
  onSelectCallout: (callout: ComponentCallout | null) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onSelectChapter: (chapterIndex: number) => void;
  onResetCamera: () => void;
  onExploreCourses?: () => void;
  // Steering Controls
  steeringAngle: number;
  onSetSteeringAngle: (angle: number) => void;
  steeringExploded: boolean;
  onToggleSteeringExplode: () => void;
  // Gear Controls
  gearPosition: GearPosition;
  onSelectGear: (gear: GearPosition) => void;
  // Pedal Controls
  pedalsState: { clutch: boolean; brake: boolean; accel: boolean };
  onTogglePedal: (pedal: "clutch" | "brake" | "accel") => void;
  // Handbrake Controls
  handbrakeEngaged: boolean;
  onToggleHandbrake: () => void;
  // Dashboard Controls
  dashboardState: {
    hazard: boolean;
    turnLeft: boolean;
    turnRight: boolean;
    headlights: boolean;
    tempWarning: boolean;
  };
  onToggleDashboardSwitch: (key: keyof CockpitHudControlsProps["dashboardState"]) => void;
}

export const CockpitHudControls: React.FC<CockpitHudControlsProps> = ({
  currentChapter,
  selectedCallout,
  onSelectCallout,
  onPrevChapter,
  onNextChapter,
  onSelectChapter,
  onResetCamera,
  onExploreCourses,
  steeringAngle,
  onSetSteeringAngle,
  steeringExploded,
  onToggleSteeringExplode,
  gearPosition,
  onSelectGear,
  pedalsState,
  onTogglePedal,
  handbrakeEngaged,
  onToggleHandbrake,
  dashboardState,
  onToggleDashboardSwitch,
}) => {
  return (
    <>
      {/* ===================================================================== */}
      {/* 1. TOP CINEMATIC FLOATING CHAPTER BAR */}
      {/* ===================================================================== */}
      <header
        role="banner"
        style={{
          position: "absolute",
          top: "clamp(12px, 2vw, 24px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          width: "min(96%, 1180px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {/* Left: Chapter Badge & Title */}
        <div
          style={{
            background: "rgba(10, 13, 20, 0.88)",
            border: "1px solid rgba(255, 229, 0, 0.35)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "100px",
            padding: "6px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
            pointerEvents: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 900,
              color: "#000",
              background: "var(--accent-yellow)",
              padding: "3px 8px",
              borderRadius: "100px",
              letterSpacing: "0.06em",
            }}
          >
            {currentChapter.chapterNumber}
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {currentChapter.title}
          </span>
        </div>

        {/* Right: Chapter Stepper Pills */}
        <div
          style={{
            background: "rgba(10, 13, 20, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "100px",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
            pointerEvents: "auto",
          }}
        >
          {[
            { id: 0, label: "01 View" },
            { id: 1, label: "02 Wheel" },
            { id: 2, label: "03 Shifter" },
            { id: 3, label: "04 Pedals" },
            { id: 4, label: "05 Handbrake" },
            { id: 5, label: "06 Dash" },
          ].map((item) => {
            const isActive = item.id === currentChapter.id - 1;
            return (
              <button
                key={item.id}
                onClick={() => onSelectChapter(item.id)}
                style={{
                  background: isActive ? "var(--accent-yellow)" : "transparent",
                  color: isActive ? "#000000" : "rgba(255, 255, 255, 0.75)",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: isActive ? 900 : 600,
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                title={`Jump to ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={onResetCamera}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#fff",
              padding: "5px 8px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Reset cockpit view"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. BOTTOM FLOATING MINIMALIST TELEMETRY & CONTROLS DOCK */}
      {/* ===================================================================== */}
      <footer
        role="contentinfo"
        style={{
          position: "absolute",
          bottom: "clamp(12px, 2.5vw, 28px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          width: "min(96%, 1180px)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {/* Selected Component Inspection Popover (if user clicked a callout) */}
        {selectedCallout && (
          <div
            style={{
              background: "rgba(10, 13, 20, 0.96)",
              border: "1px solid var(--accent-yellow)",
              borderRadius: "18px",
              padding: "16px 20px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8)",
              pointerEvents: "auto",
              maxWidth: "680px",
              alignSelf: "flex-start",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "var(--accent-yellow)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {selectedCallout.category} • {selectedCallout.tag}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "2px 0 0", color: "#fff" }}>
                  {selectedCallout.name}
                </h3>
              </div>
              <button
                onClick={() => onSelectCallout(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.45, marginBottom: "10px" }}>
              {selectedCallout.shortDescription}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--accent-yellow)", fontSize: "0.74rem", fontWeight: 800 }}>
                  <Info size={12} />
                  <span>WHAT IT DOES</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#e2e8f0", margin: "2px 0 0", lineHeight: 1.35 }}>
                  {selectedCallout.whatItDoes}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#ff9900", fontSize: "0.74rem", fontWeight: 800 }}>
                  <AlertTriangle size={12} />
                  <span>WHY YOU MUST KNOW</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#e2e8f0", margin: "2px 0 0", lineHeight: 1.35 }}>
                  {selectedCallout.whyYouMustKnow}
                </p>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 229, 0, 0.08)",
                borderLeft: "3px solid var(--accent-yellow)",
                padding: "6px 10px",
                borderRadius: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--accent-yellow)", fontSize: "0.74rem", fontWeight: 800 }}>
                <Lightbulb size={12} />
                <span>INSTRUCTOR TIP</span>
              </div>
              <p style={{ fontSize: "0.76rem", color: "#fff", margin: "2px 0 0", lineHeight: 1.35 }}>
                {selectedCallout.instructorTip}
              </p>
            </div>
          </div>
        )}

        {/* Floating Telemetry & Interactive Console */}
        <div
          style={{
            background: "rgba(10, 13, 20, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "14px 20px",
            boxShadow: "0 15px 45px rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            pointerEvents: "auto",
          }}
        >
          {/* Left: Chapter Subtitle & Overview */}
          <div style={{ maxWidth: "420px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                }}
              >
                {currentChapter.badge}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>•</span>
              <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 700 }}>
                {currentChapter.subtitle}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.76rem",
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              {currentChapter.description.slice(0, 150)}...
            </p>
          </div>

          {/* Center: Stage-Specific Interactive Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* CHAPTER 2: STEERING WHEEL */}
            {currentChapter.id === 2 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={onToggleSteeringExplode}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "100px",
                    background: steeringExploded ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                    color: steeringExploded ? "#000" : "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Compass size={13} />
                  <span>{steeringExploded ? "Exploded View Active" : "Separate Steering Wheel"}</span>
                </button>

                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => onSetSteeringAngle(-Math.PI / 2)}
                    style={{
                      padding: "5px 8px",
                      borderRadius: "6px",
                      background: steeringAngle === -Math.PI / 2 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                      color: steeringAngle === -Math.PI / 2 ? "#000" : "#fff",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    -90° Left
                  </button>
                  <button
                    onClick={() => onSetSteeringAngle(0)}
                    style={{
                      padding: "5px 8px",
                      borderRadius: "6px",
                      background: steeringAngle === 0 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                      color: steeringAngle === 0 ? "#000" : "#fff",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Center
                  </button>
                  <button
                    onClick={() => onSetSteeringAngle(Math.PI / 2)}
                    style={{
                      padding: "5px 8px",
                      borderRadius: "6px",
                      background: steeringAngle === Math.PI / 2 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                      color: steeringAngle === Math.PI / 2 ? "#000" : "#fff",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    +90° Right
                  </button>
                </div>
              </div>
            )}

            {/* CHAPTER 3: 5-SPEED MANUAL GEAR SHIFTER */}
            {currentChapter.id === 3 && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--accent-yellow)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                  H-PATTERN:
                </span>
                {(["1", "2", "3", "4", "5", "R", "N"] as GearPosition[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => onSelectGear(g)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      background: gearPosition === g ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                      color: gearPosition === g ? "#000" : "#fff",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}

            {/* CHAPTER 4: ABC PEDALS */}
            {currentChapter.id === 4 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => onTogglePedal("clutch")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: pedalsState.clutch ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                    color: pedalsState.clutch ? "#000" : "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  [ C ] CLUTCH
                </button>
                <button
                  onClick={() => onTogglePedal("brake")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: pedalsState.brake ? "#ef4444" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  [ B ] BRAKE
                </button>
                <button
                  onClick={() => onTogglePedal("accel")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: pedalsState.accel ? "#10b981" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  [ A ] ACCEL
                </button>
              </div>
            )}

            {/* CHAPTER 5: HANDBRAKE */}
            {currentChapter.id === 5 && (
              <button
                onClick={onToggleHandbrake}
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  background: handbrakeEngaged ? "#ef4444" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={14} />
                <span>{handbrakeEngaged ? "HANDBRAKE ENGAGED (PARKED)" : "HANDBRAKE RELEASED"}</span>
              </button>
            )}

            {/* CHAPTER 6: DASHBOARD CONTROLS */}
            {currentChapter.id === 6 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => onToggleDashboardSwitch("hazard")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: dashboardState.hazard ? "#ef4444" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  ⚠️ Hazard
                </button>
                <button
                  onClick={() => onToggleDashboardSwitch("headlights")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: dashboardState.headlights ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                    color: dashboardState.headlights ? "#000" : "#fff",
                    border: "none",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  💡 Lights
                </button>
                <button
                  onClick={() => onToggleDashboardSwitch("turnLeft")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: dashboardState.turnLeft ? "#f59e0b" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  ◀ Left
                </button>
                <button
                  onClick={() => onToggleDashboardSwitch("turnRight")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: dashboardState.turnRight ? "#f59e0b" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  ▶ Right
                </button>
                <button
                  onClick={() => onToggleDashboardSwitch("tempWarning")}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: dashboardState.tempWarning ? "#ef4444" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  🌡️ Temp
                </button>

                {onExploreCourses && (
                  <button
                    onClick={onExploreCourses}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "100px",
                      background: "var(--accent-yellow)",
                      color: "#000",
                      border: "none",
                      fontSize: "0.74rem",
                      fontWeight: 900,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>Courses</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Prev / Next Navigation Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={onPrevChapter}
              disabled={currentChapter.id === 1}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: currentChapter.id === 1 ? "rgba(255,255,255,0.2)" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: currentChapter.id === 1 ? "not-allowed" : "pointer",
              }}
              title="Previous chapter"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={onNextChapter}
              disabled={currentChapter.id === 6}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: currentChapter.id === 6 ? "rgba(255,255,255,0.08)" : "var(--accent-yellow)",
                border: "none",
                color: currentChapter.id === 6 ? "rgba(255,255,255,0.2)" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: currentChapter.id === 6 ? "not-allowed" : "pointer",
                fontWeight: 900,
              }}
              title="Next chapter"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
