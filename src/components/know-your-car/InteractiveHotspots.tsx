import { COMPONENT_HOTSPOTS } from "../../data/automotiveData";
import type { ComponentHotspot } from "../../types/automotive";

interface InteractiveHotspotsProps {
  hotspotIds: string[];
  screenPositions: Record<string, { x: number; y: number; visible: boolean }>;
  selectedHotspotId: string | null;
  onSelectHotspot: (hotspot: ComponentHotspot) => void;
}

export const InteractiveHotspots: React.FC<InteractiveHotspotsProps> = ({
  hotspotIds,
  screenPositions,
  selectedHotspotId,
  onSelectHotspot,
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
      {hotspotIds.map((id, index) => {
        const hotspot = COMPONENT_HOTSPOTS[id];
        const screenPos = screenPositions[id];

        if (!hotspot || !screenPos || !screenPos.visible) return null;

        const isSelected = selectedHotspotId === id;

        return (
          <button
            key={id}
            onClick={() => onSelectHotspot(hotspot)}
            aria-label={`Inspect ${hotspot.name}`}
            style={{
              position: "absolute",
              left: `${screenPos.x}%`,
              top: `${screenPos.y}%`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: "10px",
              minWidth: "44px",
              minHeight: "44px",
              touchAction: "manipulation",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="group"
          >
            {/* Outer Pulsing Halo */}
            <span
              style={{
                position: "absolute",
                width: isSelected ? "36px" : "28px",
                height: isSelected ? "36px" : "28px",
                borderRadius: "50%",
                background: "rgba(255, 229, 0, 0.25)",
                border: "1px solid rgba(255, 229, 0, 0.6)",
                boxShadow: "0 0 16px rgba(255, 229, 0, 0.8)",
                animation: "hotspotPulse 2s infinite ease-out",
                transition: "all 0.2s ease",
              }}
            />

            {/* Core Badge */}
            <span
              style={{
                position: "relative",
                width: isSelected ? "22px" : "18px",
                height: isSelected ? "22px" : "18px",
                borderRadius: "50%",
                background: isSelected ? "#ffffff" : "var(--accent-yellow)",
                color: "#000000",
                fontSize: "10px",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
                fontFamily: "var(--font-mono)",
                transition: "all 0.2s ease",
              }}
            >
              {index + 1}
            </span>

            {/* Floating Hover / Active Label */}
            <span
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(10, 13, 20, 0.92)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 229, 0, 0.4)",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "0.68rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: isSelected ? "var(--accent-yellow)" : "var(--text-white)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(0,0,0,0.7)",
                opacity: isSelected ? 1 : 0.85,
                pointerEvents: "none",
                letterSpacing: "0.02em",
              }}
            >
              {hotspot.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
