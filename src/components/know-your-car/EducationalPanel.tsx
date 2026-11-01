import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Maximize2,
  Sliders,
  Camera,
} from "lucide-react";
import type { StageConfig, ComponentHotspot, GearPosition } from "../../types/automotive";
import { COMPONENT_HOTSPOTS, PRE_DRIVE_CHECKLIST } from "../../data/automotiveData";

interface EducationalPanelProps {
  currentStage: StageConfig;
  selectedHotspot: ComponentHotspot | null;
  onSelectHotspot: (hotspot: ComponentHotspot | null) => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  onSelectStage: (stageIndex: number) => void;
  onOpenManualMode: () => void;
  onExploreCourses: () => void;
  // Steering Controls
  steeringAngle: number;
  onSetSteeringAngle: (angle: number) => void;
  // Pedal Controls
  pedalsState: { clutch: boolean; brake: boolean; accel: boolean };
  onTogglePedal: (pedal: "clutch" | "brake" | "accel") => void;
  // Gear Controls
  gearPosition: GearPosition;
  onSelectGear: (gear: GearPosition) => void;
  // Lights Controls
  lightsState: {
    headlights: boolean;
    leftIndicator: boolean;
    rightIndicator: boolean;
    hazard: boolean;
    brakeLights: boolean;
  };
  onToggleLight: (lightKey: keyof EducationalPanelProps["lightsState"]) => void;
  // Pre-drive Checklist
  checklistState: Record<string, boolean>;
  onToggleChecklistItem: (itemId: string) => void;
}

export const EducationalPanel: React.FC<EducationalPanelProps> = ({
  currentStage,
  selectedHotspot,
  onSelectHotspot,
  onPrevStage,
  onNextStage,
  onSelectStage,
  onOpenManualMode,
  onExploreCourses,
  steeringAngle,
  onSetSteeringAngle,
  pedalsState,
  onTogglePedal,
  gearPosition,
  onSelectGear,
  lightsState,
  onToggleLight,
  checklistState,
  onToggleChecklistItem,
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // Active display content: either the explicitly selected hotspot or current stage
  const activeHotspot = selectedHotspot;
  const stagePhoto = activeHotspot?.photoUrl || currentStage.photoUrl;
  const stagePhotoCaption = activeHotspot
    ? `Reference Photo: ${activeHotspot.name}`
    : currentStage.photoCaption;

  // Pre-drive checklist completion calculation
  const completedChecklistCount = PRE_DRIVE_CHECKLIST.filter((item) => checklistState[item.id]).length;
  const isChecklistComplete = completedChecklistCount === PRE_DRIVE_CHECKLIST.length;

  return (
    <div
      className="educational-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "clamp(18px, 2.5vw, 32px)",
        background: "rgba(10, 13, 20, 0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "24px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75)",
        color: "var(--text-white)",
        position: "relative",
        zIndex: 20,
        overflowY: "auto",
        maxHeight: "calc(100vh - 110px)",
      }}
    >
      {/* ===================================================================== */}
      {/* 1. HEADER & TOP BREADCRUMB */}
      {/* ===================================================================== */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                fontWeight: 900,
                color: "var(--accent-yellow)",
                background: "rgba(255, 229, 0, 0.12)",
                border: "1px solid rgba(255, 229, 0, 0.35)",
                padding: "4px 10px",
                borderRadius: "6px",
                letterSpacing: "0.08em",
              }}
            >
              {currentStage.stageNumber}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              WagonR Learning Masterclass
            </span>
          </div>

          {/* Quick Manual Mode Trigger */}
          <button
            onClick={onOpenManualMode}
            className="btn"
            style={{
              padding: "6px 14px",
              fontSize: "0.75rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "var(--text-white)",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            title="Free 360° orbit & manual component exploration"
          >
            <Compass size={14} color="var(--accent-yellow)" />
            <span>360° Free Orbit</span>
          </button>
        </div>

        {/* Stage Title */}
        <h2
          style={{
            fontSize: "clamp(1.35rem, 2.2vw, 2.1rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--text-white)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          {currentStage.title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
            color: "var(--accent-yellow)",
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: "16px",
          }}
        >
          {currentStage.subtitle}
        </p>

        {/* ===================================================================== */}
        {/* 2. REAL PHOTOGRAPHY INTEGRATION (PHASE 6 REQUIREMENT) */}
        {/* Real WagonR reference photo embedded beside 3D simulation */}
        {/* ===================================================================== */}
        <div
          style={{
            position: "relative",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255, 229, 0, 0.25)",
            marginBottom: "18px",
            background: "#080a10",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "160px" }}>
            <img
              src={stagePhoto}
              alt={stagePhotoCaption}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(8, 10, 16, 0.95) 0%, rgba(8, 10, 16, 0.2) 60%, transparent 100%)",
              }}
            />

            {/* Verified Badge */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(10, 13, 20, 0.85)",
                border: "1px solid rgba(255, 229, 0, 0.4)",
                padding: "4px 10px",
                borderRadius: "100px",
                backdropFilter: "blur(8px)",
              }}
            >
              <Camera size={12} color="var(--accent-yellow)" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  letterSpacing: "0.06em",
                }}
              >
                REAL WAGONR REFERENCE
              </span>
            </div>

            {/* Expand Photo Button */}
            <button
              onClick={() => setPhotoModalOpen(true)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(10, 13, 20, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "6px",
                borderRadius: "50%",
                color: "#fff",
                cursor: "pointer",
              }}
              title="View full resolution reference photo"
            >
              <Maximize2 size={13} />
            </button>

            {/* Photo Caption */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "12px",
                right: "12px",
                fontSize: "0.74rem",
                color: "#e2e8f0",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {stagePhotoCaption}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. COMPONENT DETAILS & EDUCATIONAL BREAKDOWN */}
        {/* ===================================================================== */}
        {activeHotspot ? (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 229, 0, 0.3)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--accent-yellow)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {activeHotspot.category}
                </span>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "2px" }}>
                  {activeHotspot.name}
                </h4>
              </div>
              <button
                onClick={() => onSelectHotspot(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
                title="Deselect component"
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "12px" }}>
              {activeHotspot.shortDescription}
            </p>

            {/* What it Does */}
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                <Info size={13} />
                <span>What It Does</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#e2e8f0", lineHeight: 1.45 }}>
                {activeHotspot.whatItDoes}
              </p>
            </div>

            {/* Why You Must Know */}
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  color: "#ffaa00",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                <AlertTriangle size={13} />
                <span>Why You Must Know</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#e2e8f0", lineHeight: 1.45 }}>
                {activeHotspot.whyYouMustKnow}
              </p>
            </div>

            {/* Ghosh Instructor Tip */}
            <div
              style={{
                background: "rgba(255, 229, 0, 0.08)",
                borderLeft: "3px solid var(--accent-yellow)",
                padding: "8px 12px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  marginBottom: "2px",
                }}
              >
                <Lightbulb size={13} />
                <span>Instructor Tip</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#fff", lineHeight: 1.4 }}>
                {activeHotspot.driverTip}
              </p>
            </div>
          </div>
        ) : (
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.1vw, 0.92rem)",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              marginBottom: "18px",
            }}
          >
            {currentStage.description}
          </p>
        )}

        {/* ===================================================================== */}
        {/* 4. INTERACTIVE STAGE-SPECIFIC WIDGETS (PHASE 4 & 5) */}
        {/* ===================================================================== */}

        {/* SCENE 05: STEERING WHEEL ANGLE SIMULATOR */}
        {currentStage.stage === 5 && (
          <div
            style={{
              background: "rgba(255, 229, 0, 0.06)",
              border: "1px solid rgba(255, 229, 0, 0.35)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sliders size={16} color="var(--accent-yellow)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase" }}>
                  Interactive Steering Angle
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  background: "rgba(0,0,0,0.4)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                {Math.round((steeringAngle * 180) / Math.PI)}°
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step={0.05}
              value={steeringAngle}
              onChange={(e) => onSetSteeringAngle(parseFloat(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--accent-yellow)",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            />

            {/* Quick Turn Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
              <button
                onClick={() => onSetSteeringAngle(-Math.PI)}
                style={{
                  padding: "6px 2px",
                  fontSize: "0.7rem",
                  background: steeringAngle === -Math.PI ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: steeringAngle === -Math.PI ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                -180° Lock
              </button>
              <button
                onClick={() => onSetSteeringAngle(-Math.PI / 2)}
                style={{
                  padding: "6px 2px",
                  fontSize: "0.7rem",
                  background: steeringAngle === -Math.PI / 2 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: steeringAngle === -Math.PI / 2 ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                -90° Left
              </button>
              <button
                onClick={() => onSetSteeringAngle(0)}
                style={{
                  padding: "6px 2px",
                  fontSize: "0.7rem",
                  background: steeringAngle === 0 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: steeringAngle === 0 ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Center
              </button>
              <button
                onClick={() => onSetSteeringAngle(Math.PI / 2)}
                style={{
                  padding: "6px 2px",
                  fontSize: "0.7rem",
                  background: steeringAngle === Math.PI / 2 ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: steeringAngle === Math.PI / 2 ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                +90° Right
              </button>
              <button
                onClick={() => onSetSteeringAngle(Math.PI)}
                style={{
                  padding: "6px 2px",
                  fontSize: "0.7rem",
                  background: steeringAngle === Math.PI ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: steeringAngle === Math.PI ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                +180° Lock
              </button>
            </div>

            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "10px", lineHeight: 1.3 }}>
              * WagonR rack & pinion allows ~2.8 turns lock-to-lock. Always maintain the 9-and-3 grip for rapid counter-steering.
            </p>
          </div>
        )}

        {/* SCENE 06: MANUAL ABC PEDALS INTERACTIVE TEST BENCH */}
        {currentStage.stage === 6 && (
          <div
            style={{
              background: "rgba(255, 229, 0, 0.06)",
              border: "1px solid rgba(255, 229, 0, 0.35)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Zap size={16} color="var(--accent-yellow)" />
              <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase" }}>
                Manual 3-Pedal Test Bench (Click to Depress)
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "12px" }}>
              {/* Clutch */}
              <button
                onClick={() => onTogglePedal("clutch")}
                style={{
                  padding: "12px 8px",
                  borderRadius: "10px",
                  background: pedalsState.clutch ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: pedalsState.clutch ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 900 }}>[ C ]</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>CLUTCH</span>
                <span style={{ fontSize: "0.68rem", opacity: 0.8 }}>Left Foot Only</span>
              </button>

              {/* Brake */}
              <button
                onClick={() => onTogglePedal("brake")}
                style={{
                  padding: "12px 8px",
                  borderRadius: "10px",
                  background: pedalsState.brake ? "#ef4444" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 900 }}>[ B ]</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>BRAKE</span>
                <span style={{ fontSize: "0.68rem", opacity: 0.8 }}>Right Foot Pivot</span>
              </button>

              {/* Accelerator */}
              <button
                onClick={() => onTogglePedal("accel")}
                style={{
                  padding: "12px 8px",
                  borderRadius: "10px",
                  background: pedalsState.accel ? "#10b981" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 900 }}>[ A ]</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>GAS / ACCEL</span>
                <span style={{ fontSize: "0.68rem", opacity: 0.8 }}>Right Foot Pivot</span>
              </button>
            </div>

            <div
              style={{
                fontSize: "0.78rem",
                background: "rgba(0,0,0,0.5)",
                padding: "8px 12px",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
            >
              {pedalsState.clutch ? (
                <span style={{ color: "var(--accent-yellow)", fontWeight: 700 }}>
                  ⚡ Clutch Depressed: Engine flywheel disconnected from gearbox. Ready for gear shift!
                </span>
              ) : pedalsState.brake ? (
                <span style={{ color: "#ef4444", fontWeight: 700 }}>
                  🛑 Brake Depressed: Master cylinder pressurizes calipers. Rear brake lights illuminated!
                </span>
              ) : pedalsState.accel ? (
                <span style={{ color: "#10b981", fontWeight: 700 }}>
                  🚀 Accelerator Depressed: Electronic throttle plate open. Engine RPM ramping!
                </span>
              ) : (
                <span>Click any pedal above to depress it in the 3D cockpit and observe physical response.</span>
              )}
            </div>
          </div>
        )}

        {/* SCENE 07: 5-SPEED MANUAL GEAR SHIFTER SIMULATOR */}
        {currentStage.stage === 7 && (
          <div
            style={{
              background: "rgba(255, 229, 0, 0.06)",
              border: "1px solid rgba(255, 229, 0, 0.35)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={16} color="var(--accent-yellow)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase" }}>
                  5-Speed H-Pattern Shifter
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 900,
                  color: "var(--accent-yellow)",
                  background: "rgba(0,0,0,0.5)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                Selected: {gearPosition === "N" ? "NEUTRAL" : `GEAR ${gearPosition}`}
              </span>
            </div>

            {/* Visual H-Gate Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" }}>
              {(["1", "3", "5", "N"] as GearPosition[]).map((g) => (
                <button
                  key={g}
                  onClick={() => onSelectGear(g)}
                  style={{
                    padding: "10px 4px",
                    borderRadius: "8px",
                    background: gearPosition === g ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                    color: gearPosition === g ? "#000" : "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {g === "N" ? "NEUTRAL" : `${g}st`}
                </button>
              ))}

              {(["2", "4", "R"] as GearPosition[]).map((g) => (
                <button
                  key={g}
                  onClick={() => onSelectGear(g)}
                  style={{
                    padding: "10px 4px",
                    borderRadius: "8px",
                    background: gearPosition === g ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                    color: gearPosition === g ? "#000" : "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {g === "R" ? "REVERSE [R]" : `${g}th`}
                </button>
              ))}
            </div>

            {/* Speed & Purpose Guide */}
            <div
              style={{
                fontSize: "0.78rem",
                background: "rgba(0,0,0,0.5)",
                padding: "8px 12px",
                borderRadius: "8px",
                color: "#e2e8f0",
                lineHeight: 1.4,
              }}
            >
              {gearPosition === "N" && "⚪ Neutral: Engine idles freely without driving wheels. Center spring returns lever here."}
              {gearPosition === "1" && "🟢 1st Gear (0-15 km/h): Maximum torque to get the car moving from standstill. Never start in 2nd."}
              {gearPosition === "2" && "🔵 2nd Gear (15-30 km/h): For taking sharp 90° city turns and crawling through heavy congestion."}
              {gearPosition === "3" && "🟡 3rd Gear (30-45 km/h): Versatile city gear providing good acceleration and fuel efficiency."}
              {gearPosition === "4" && "🟠 4th Gear (45-60 km/h): Smooth intermediate cruising for wide city avenues and ring roads."}
              {gearPosition === "5" && "🟣 5th Gear (60+ km/h): Overdrive gear minimizing engine RPM for highway speed and fuel economy."}
              {gearPosition === "R" && "🔴 Reverse [R]: To back up into parking bays. Car must be 100% stationary before engaging!"}
            </div>
          </div>
        )}

        {/* SCENE 08: INDICATORS, LIGHTS & MIRROR SIMULATOR */}
        {currentStage.stage === 8 && (
          <div
            style={{
              background: "rgba(255, 229, 0, 0.06)",
              border: "1px solid rgba(255, 229, 0, 0.35)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Zap size={16} color="var(--accent-yellow)" />
              <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase" }}>
                Lighting Stalk & Signalling System
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "12px" }}>
              <button
                onClick={() => onToggleLight("headlights")}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: lightsState.headlights ? "var(--accent-yellow)" : "rgba(255,255,255,0.08)",
                  color: lightsState.headlights ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                💡 Headlights {lightsState.headlights ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => onToggleLight("hazard")}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: lightsState.hazard ? "#ef4444" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ⚠️ Hazard Blinkers {lightsState.hazard ? "ACTIVE" : "OFF"}
              </button>

              <button
                onClick={() => onToggleLight("leftIndicator")}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: lightsState.leftIndicator ? "#f59e0b" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ◀ Left Turn Stalk {lightsState.leftIndicator ? "FLASHING" : "OFF"}
              </button>

              <button
                onClick={() => onToggleLight("rightIndicator")}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: lightsState.rightIndicator ? "#f59e0b" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ▶ Right Turn Stalk {lightsState.rightIndicator ? "FLASHING" : "OFF"}
              </button>
            </div>

            <p style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.3 }}>
              * Remember the MSM routine: <strong>Mirror</strong> ➔ <strong>Signal</strong> ➔ <strong>Maneuver</strong>. Always signal 30 meters before turning.
            </p>
          </div>
        )}

        {/* SCENE 09: PRE-DRIVE 6-STEP CHECKLIST */}
        {currentStage.stage === 9 && (
          <div
            style={{
              background: "rgba(255, 229, 0, 0.06)",
              border: "1px solid rgba(255, 229, 0, 0.35)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={18} color="var(--accent-yellow)" />
                <span style={{ fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase" }}>
                  Before You Start The Engine
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  color: isChecklistComplete ? "#10b981" : "var(--accent-yellow)",
                  background: "rgba(0,0,0,0.4)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                {completedChecklistCount} / {PRE_DRIVE_CHECKLIST.length} Verified
              </span>
            </div>

            {/* Checklist Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
              {PRE_DRIVE_CHECKLIST.map((item) => {
                const checked = !!checklistState[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => onToggleChecklistItem(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: checked ? "rgba(16, 185, 129, 0.12)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${checked ? "rgba(16, 185, 129, 0.4)" : "rgba(255,255,255,0.1)"}`,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ marginTop: "2px", color: checked ? "#10b981" : "var(--text-muted)" }}>
                      {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: checked ? "#fff" : "#e2e8f0",
                          textDecoration: checked ? "line-through" : "none",
                        }}
                      >
                        {item.number}. {item.title}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "2px" }}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isChecklistComplete ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid #10b981",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  color: "#10b981",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                }}
              >
                <Sparkles size={16} />
                <span>All cockpit checks passed! You are fully prepared to crank the starter motor safely.</span>
              </div>
            ) : (
              <p style={{ fontSize: "0.74rem", color: "#94a3b8", textAlign: "center" }}>
                Click each routine above to verify your driving posture, mirrors, and controls.
              </p>
            )}
          </div>
        )}

        {/* SCENE 10: READY FOR FIRST DRIVE CTA */}
        {currentStage.stage === 10 && (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 229, 0, 0.15) 0%, rgba(10, 13, 20, 0.8) 100%)",
              border: "1px solid var(--accent-yellow)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--accent-yellow)",
                color: "#000",
                padding: "4px 14px",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontWeight: 900,
                fontSize: "0.75rem",
                marginBottom: "12px",
              }}
            >
              <Sparkles size={14} />
              <span>THEORY COMPLETE</span>
            </div>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>
              NOW YOU KNOW YOUR CAR.
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--accent-yellow)", fontWeight: 700, marginBottom: "16px" }}>
              LET'S LEARN TO DRIVE IT WITH EXPERTS.
            </p>

            <button
              onClick={onExploreCourses}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "14px 20px",
                fontSize: "0.95rem",
                fontWeight: 900,
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(255, 229, 0, 0.4)",
              }}
            >
              <span>EXPLORE OUR DRIVING COURSES</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Available Hotspots in Current Stage (Pill list) */}
        {currentStage.hotspotIds.length > 0 && !activeHotspot && currentStage.stage !== 10 && (
          <div style={{ marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Key Components in This Scene:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {currentStage.hotspotIds.map((hid) => {
                const spot = COMPONENT_HOTSPOTS[hid];
                if (!spot) return null;
                return (
                  <button
                    key={hid}
                    onClick={() => onSelectHotspot(spot)}
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {spot.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 5. FOOTER STAGE STEPPER NAVIGATION (01 / 10 to 10 / 10) */}
      {/* ===================================================================== */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "14px",
          marginTop: "10px",
        }}
      >
        {/* Stage Pill Indicator (01 - 10) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: "4px",
            marginBottom: "12px",
          }}
        >
          {Array.from({ length: 10 }).map((_, idx) => {
            const isActive = idx === currentStage.stage - 1;
            return (
              <button
                key={idx}
                onClick={() => onSelectStage(idx)}
                style={{
                  height: "5px",
                  borderRadius: "100px",
                  background: isActive
                    ? "var(--accent-yellow)"
                    : idx < currentStage.stage - 1
                    ? "rgba(255, 229, 0, 0.4)"
                    : "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  padding: 0,
                }}
                title={`Jump to Scene ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Prev / Next Stage Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={onPrevStage}
            disabled={currentStage.stage === 1}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: currentStage.stage === 1 ? "rgba(255,255,255,0.3)" : "#fff",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "0.82rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: currentStage.stage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "var(--accent-yellow)",
            }}
          >
            Scene {currentStage.stage} of 10
          </span>

          <button
            onClick={onNextStage}
            disabled={currentStage.stage === 10}
            style={{
              background: currentStage.stage === 10 ? "rgba(255,255,255,0.08)" : "var(--accent-yellow)",
              border: "1px solid rgba(255, 229, 0, 0.4)",
              color: currentStage.stage === 10 ? "rgba(255,255,255,0.3)" : "#000",
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "0.82rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: currentStage.stage === 10 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 6. FULL-SCREEN PHOTOGRAPHIC REFERENCE MODAL */}
      {/* ===================================================================== */}
      {photoModalOpen && (
        <div
          onClick={() => setPhotoModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "850px",
              width: "100%",
              background: "#0d1117",
              border: "1px solid var(--accent-yellow)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxHeight: "70vh",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <img
                src={stagePhoto}
                alt={stagePhotoCaption}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#0d1117",
              }}
            >
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
                  {stagePhotoCaption}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--accent-yellow)", fontFamily: "var(--font-mono)" }}>
                  Verified Maruti Suzuki WagonR (Indian RHD Manual Model)
                </p>
              </div>
              <button
                onClick={() => setPhotoModalOpen(false)}
                style={{
                  background: "var(--accent-yellow)",
                  color: "#000",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
