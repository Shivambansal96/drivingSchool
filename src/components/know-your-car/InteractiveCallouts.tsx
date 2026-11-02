import React from "react";
import { COMPONENT_CALLOUTS } from "../../data/automotiveCurriculum";
import type { ComponentCallout } from "../../types/automotive";

interface InteractiveCalloutsProps {
  calloutIds: string[];
  screenPositions: Record<string, { x: number; y: number; visible: boolean }>;
  selectedCalloutId: string | null;
  onSelectCallout: (callout: ComponentCallout) => void;
}

export const InteractiveCallouts: React.FC<InteractiveCalloutsProps> = ({
  calloutIds,
  screenPositions,
  selectedCalloutId,
  onSelectCallout,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 15,
        overflow: "hidden",
      }}
    >
      {calloutIds.map((id, index) => {
        const callout = COMPONENT_CALLOUTS[id];
        const screenPos = screenPositions[id];

        if (!callout || !screenPos || !screenPos.visible) return null;

        const isSelected = selectedCalloutId === id;

        return (
          <button
            key={id}
            onClick={() => onSelectCallout(callout)}
            aria-label={`Inspect ${callout.name}`}
            style={{
              position: "absolute",
              left: `${screenPos.x}%`,
              top: `${screenPos.y}%`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: "8px",
              minWidth: "44px",
              minHeight: "44px",
              touchAction: "manipulation",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              outline: "none",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="group"
          >
            {/* Target Pin Assembly */}
            <div
              style={{
                position: "relative",
                width: isSelected ? "32px" : "24px",
                height: isSelected ? "32px" : "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Outer Pulsing Halo */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: isSelected ? "rgba(255, 229, 0, 0.35)" : "rgba(255, 229, 0, 0.18)",
                  border: "1px solid rgba(255, 229, 0, 0.6)",
                  boxShadow: isSelected ? "0 0 18px rgba(255, 229, 0, 0.9)" : "0 0 10px rgba(255, 229, 0, 0.5)",
                  animation: "hotspotPulse 2s infinite ease-out",
                  transition: "all 0.25s ease",
                }}
              />

              {/* Core Badge */}
              <span
                style={{
                  position: "relative",
                  width: isSelected ? "18px" : "14px",
                  height: isSelected ? "18px" : "14px",
                  borderRadius: "50%",
                  background: isSelected ? "#ffffff" : "var(--accent-yellow)",
                  color: "#000000",
                  fontSize: isSelected ? "11px" : "9px",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.7)",
                  fontFamily: "var(--font-mono)",
                  transition: "all 0.2s ease",
                }}
              >
                {index + 1}
              </span>
            </div>

            {/* Minimalist Floating Label Pill */}
            <div
              style={{
                background: isSelected ? "rgba(10, 13, 20, 0.96)" : "rgba(10, 13, 20, 0.8)",
                border: isSelected
                  ? "1px solid var(--accent-yellow)"
                  : "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "100px",
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6)",
                whiteSpace: "nowrap",
                transform: isSelected ? "scale(1.04)" : "scale(1)",
                transition: "all 0.25s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "var(--accent-yellow)",
                  letterSpacing: "0.06em",
                }}
              >
                {callout.tag}
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {callout.name}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
