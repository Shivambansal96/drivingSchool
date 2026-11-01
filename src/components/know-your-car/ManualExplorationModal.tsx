import React, { useState } from "react";
import { X, RotateCcw, Compass } from "lucide-react";
import { COMPONENT_HOTSPOTS } from "../../data/automotiveData";
import type { ComponentHotspot } from "../../types/automotive";

export type PresetCategory = "exterior" | "engine" | "cabin" | "pedals" | "gearbox" | "safety";

interface ManualExplorationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPresetView: (view: PresetCategory) => void;
  onResetCamera: () => void;
  onSelectHotspot: (hotspot: ComponentHotspot) => void;
  selectedHotspot: ComponentHotspot | null;
}

export const ManualExplorationModal: React.FC<ManualExplorationModalProps> = ({
  isOpen,
  onClose,
  onSelectPresetView,
  onResetCamera,
  onSelectHotspot,
  selectedHotspot,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  if (!isOpen) return null;

  const categories = [
    { key: "ALL", label: "All Components" },
    { key: "EXTERIOR", label: "Exterior" },
    { key: "POWERTRAIN", label: "Engine Bay" },
    { key: "DRIVER CONTROLS", label: "Driver Controls" },
    { key: "CHASSIS & BRAKING", label: "Braking & Wheels" },
    { key: "SAFETY & SIGNALLING", label: "Safety & Mirrors" },
  ];

  const allHotspots = Object.values(COMPONENT_HOTSPOTS);
  const filteredHotspots =
    activeCategory === "ALL"
      ? allHotspots
      : allHotspots.filter((h) => h.category === activeCategory);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(6, 8, 12, 0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "auto",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* Top Floating Simulator Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(10, 13, 20, 0.95)",
          borderBottom: "1px solid rgba(255, 229, 0, 0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              background: "var(--accent-yellow)",
              color: "#000000",
              fontSize: "0.72rem",
              fontWeight: 900,
              fontFamily: "var(--font-mono)",
              padding: "4px 8px",
              borderRadius: "4px",
              letterSpacing: "0.06em",
            }}
          >
            FREE EXPLORATION MODE
          </span>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "var(--text-white)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Maruti Suzuki WagonR 3D Learning Sandbox
          </h2>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              display: "none",
            }}
            className="hide-on-mobile"
          >
            Drag anywhere on the car to orbit 360° • Select category to reposition camera
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={onResetCamera}
            className="btn"
            style={{
              padding: "8px 14px",
              fontSize: "0.78rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text-white)",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
            title="Reset to default 3/4 camera view"
          >
            <RotateCcw size={14} />
            <span>Reset View</span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{
              padding: "8px 18px",
              fontSize: "0.82rem",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <span>Exit Exploration</span>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Bottom Control Hub */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(96%, 1100px)",
          background: "rgba(12, 15, 23, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 229, 0, 0.3)",
          borderRadius: "20px",
          padding: "16px 20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* PHASE 5: 6 Dedicated Category Presets */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Compass size={16} color="var(--accent-yellow)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--text-white)",
                textTransform: "uppercase",
              }}
            >
              Focus Category:
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <button
              onClick={() => onSelectPresetView("exterior")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🚗 Exterior
            </button>
            <button
              onClick={() => onSelectPresetView("engine")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🔧 Engine Bay
            </button>
            <button
              onClick={() => onSelectPresetView("cabin")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🪑 Driver's Cabin
            </button>
            <button
              onClick={() => onSelectPresetView("pedals")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🦶 ABC Pedals
            </button>
            <button
              onClick={() => onSelectPresetView("gearbox")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🕹️ 5-Speed Gearbox
            </button>
            <button
              onClick={() => onSelectPresetView("safety")}
              className="btn"
              style={{
                padding: "6px 12px",
                fontSize: "0.76rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--text-white)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
              }}
            >
              🛡️ Safety & Mirrors
            </button>
          </div>
        </div>

        {/* Hotspot Chips Bar */}
        <div>
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "8px",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.74rem",
                  fontWeight: activeCategory === c.key ? 800 : 500,
                  borderRadius: "100px",
                  background: activeCategory === c.key ? "var(--accent-yellow)" : "rgba(255,255,255,0.06)",
                  color: activeCategory === c.key ? "#000" : "#fff",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingTop: "4px",
              scrollbarWidth: "none",
            }}
          >
            {filteredHotspots.map((h) => {
              const isSelected = selectedHotspot?.id === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => onSelectHotspot(h)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: isSelected ? "var(--accent-yellow)" : "rgba(255, 255, 255, 0.06)",
                    color: isSelected ? "#000000" : "var(--text-white)",
                    border: isSelected
                      ? "1px solid var(--accent-yellow)"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    fontSize: "0.78rem",
                    fontWeight: isSelected ? 800 : 500,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{h.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
