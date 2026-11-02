import React from "react";
import { X, ArrowUpRight } from "lucide-react";

interface FirstVisitTranslationGuideProps {
  isVisible: boolean;
  onDismiss: () => void;
  onTranslateNow: () => void;
}

export const FirstVisitTranslationGuide: React.FC<FirstVisitTranslationGuideProps> = ({
  isVisible,
  onDismiss,
  onTranslateNow,
}) => {
  if (!isVisible) return null;

  return (
    <aside
      aria-label="Language selection guide"
      className="first-visit-tooltip-container"
      style={{
        position: "fixed",
        top: "calc(var(--header-height) + 12px)",
        zIndex: 1050,
        animation: "slideInTooltip 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Upward Pointer Arrow pointing towards the Translate button */}
      <div
        className="tooltip-pointer-arrow"
        style={{
          position: "absolute",
          top: "-9px",
          width: "18px",
          height: "18px",
          background: "#161b26",
          borderTop: "1.5px solid var(--accent-yellow)",
          borderLeft: "1.5px solid var(--accent-yellow)",
          transform: "rotate(45deg)",
          zIndex: 2,
          boxShadow: "-3px -3px 8px rgba(255, 229, 0, 0.25)",
        }}
      />

      {/* Main Tooltip Card */}
      <div
        className="glass-card"
        style={{
          position: "relative",
          padding: "20px 22px",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(180deg, #161b26 0%, #0d0f14 100%)",
          border: "1.5px solid var(--accent-yellow)",
          boxShadow:
            "0 15px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 229, 0, 0.22)",
        }}
      >
        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          aria-label="Dismiss translation suggestion"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "var(--text-muted)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            touchAction: "manipulation",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-white)";
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
          }}
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div style={{ paddingRight: "24px" }}>
          {/* Header Title */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "var(--text-white)",
              lineHeight: 1.35,
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span>🌐 Prefer another language? Translate this website into your language!</span>
          </div>

          {/* Subtext */}
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-body)",
              lineHeight: 1.45,
              marginTop: "8px",
              marginBottom: "16px",
            }}
          >
            Choose your preferred language and explore everything in the language you&apos;re comfortable with.
          </p>

          {/* Action Row */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <button
              onClick={onTranslateNow}
              className="btn btn-primary"
              style={{
                minHeight: "42px",
                padding: "8px 18px",
                fontSize: "0.84rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(255, 229, 0, 0.35)",
                touchAction: "manipulation",
              }}
            >
              <span>Translate Now</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              onClick={onDismiss}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                cursor: "pointer",
                padding: "8px 10px",
                textDecoration: "underline",
                minHeight: "42px",
                display: "inline-flex",
                alignItems: "center",
                touchAction: "manipulation",
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
