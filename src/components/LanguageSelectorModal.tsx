import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Search,
  Check,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  SUPPORTED_LANGUAGES,
  type LanguageOption,
  applyGoogleTranslation,
} from "../config/languages";

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageSelect: (langCode: string) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "popular" | "bengali" | "hindi">("all");
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    onClose();
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter languages based on search query
  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    if (categoryFilter === "popular" && !["bn", "hi", "en"].includes(lang.code)) {
      return false;
    }
    if (categoryFilter === "bengali" && lang.code !== "bn") {
      return false;
    }
    if (categoryFilter === "hindi" && lang.code !== "hi") {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.englishName.toLowerCase().includes(q) ||
      lang.script.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const handleSelect = (lang: LanguageOption) => {
    onLanguageSelect(lang.code);
    applyGoogleTranslation(lang.code);
    onClose();
  };

  const handleResetEnglish = () => {
    onLanguageSelect("en");
    applyGoogleTranslation("en");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "580px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(180deg, #131722 0%, #0c0e14 100%)",
          border: "1px solid rgba(255, 229, 0, 0.35)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 229, 0, 0.15)",
          overflow: "hidden",
          animation: "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "clamp(16px, 3vw, 22px) clamp(16px, 3.5vw, 24px) 14px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255, 229, 0, 0.12)",
                border: "1px solid rgba(255, 229, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-yellow)",
              }}
            >
              <Globe size={20} />
            </div>
            <div>
              <h3
                id="language-modal-title"
                style={{
                  fontSize: "1.18rem",
                  fontWeight: 800,
                  color: "var(--text-white)",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Choose Your Language
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--accent-yellow)",
                    fontFamily: "var(--font-mono)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: "rgba(255, 229, 0, 0.1)",
                    border: "1px solid rgba(255, 229, 0, 0.2)",
                  }}
                >
                  ভাষা / भाषा
                </span>
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                Select your preferred language to translate the entire website instantly.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-white)";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Quick Chips */}
        <div style={{ padding: "12px clamp(16px, 3.5vw, 24px)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Search Box */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                color: "var(--accent-yellow)",
                pointerEvents: "none",
              }}
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language (e.g. Hindi, বাংলা, Tamil)..."
              style={{
                width: "100%",
                padding: "12px 14px 12px 42px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-white)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-yellow)";
                e.target.style.boxShadow = "0 0 12px rgba(255, 229, 0, 0.25)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { id: "all", label: "All Languages (11)" },
              { id: "bengali", label: "বাংলা (Bengali)", highlight: true },
              { id: "hindi", label: "हिन्दी (Hindi)" },
              { id: "popular", label: "Popular" },
            ].map((chip) => {
              const active = categoryFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setCategoryFilter(chip.id as any)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: active
                      ? "var(--accent-yellow)"
                      : chip.highlight
                      ? "rgba(255, 229, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                    color: active ? "#000000" : chip.highlight ? "var(--accent-yellow)" : "var(--text-muted)",
                    border: active
                      ? "1px solid var(--accent-yellow)"
                      : chip.highlight
                      ? "1px solid rgba(255, 229, 0, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Grid */}
        <div
          style={{
            padding: "8px clamp(16px, 3.5vw, 24px) 20px",
            overflowY: "auto",
            maxHeight: "360px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            gap: "10px",
          }}
        >
          {filteredLanguages.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "36px 12px",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              No languages matched &quot;{searchQuery}&quot;. Please check the spelling or view all languages.
            </div>
          ) : (
            filteredLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(255, 229, 0, 0.18) 0%, rgba(255, 229, 0, 0.05) 100%)"
                      : "rgba(255, 255, 255, 0.03)",
                    border: isSelected
                      ? "1.5px solid var(--accent-yellow)"
                      : "1px solid rgba(255, 255, 255, 0.07)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(255, 229, 0, 0.4)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: isSelected ? "var(--accent-yellow)" : "var(--text-white)",
                          fontFamily: lang.code === "bn" ? "'Noto Sans Bengali', sans-serif" : lang.code === "hi" || lang.code === "mr" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
                        }}
                      >
                        {lang.name}
                      </span>
                      {lang.badge && (
                        <span
                          style={{
                            fontSize: "0.62rem",
                            padding: "1px 6px",
                            borderRadius: "3px",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            background:
                              lang.badge === "Local"
                                ? "rgba(37, 211, 102, 0.15)"
                                : "rgba(255, 229, 0, 0.12)",
                            color:
                              lang.badge === "Local"
                                ? "var(--accent-green)"
                                : "var(--accent-yellow)",
                            border:
                              lang.badge === "Local"
                                ? "1px solid rgba(37, 211, 102, 0.3)"
                                : "1px solid rgba(255, 229, 0, 0.3)",
                          }}
                        >
                          {lang.badge}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {lang.englishName} • {lang.script}
                    </div>
                  </div>

                  {isSelected ? (
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "var(--accent-yellow)",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 10px rgba(255, 229, 0, 0.5)",
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                      }}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer with Reset to Original English */}
        <div
          style={{
            padding: "12px clamp(16px, 3.5vw, 24px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "rgba(8, 10, 15, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--text-dim)" }}>
            <Sparkles size={14} color="var(--accent-yellow)" />
            <span>Translations powered for seamless native Indian languages.</span>
          </div>

          <button
            onClick={handleResetEnglish}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              borderRadius: "var(--radius-md)",
              background: currentLanguage === "en" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 229, 0, 0.1)",
              border: currentLanguage === "en" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 229, 0, 0.3)",
              color: currentLanguage === "en" ? "var(--text-muted)" : "var(--accent-yellow)",
              fontSize: "0.78rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <RotateCcw size={13} />
            <span>Reset to English (Original)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
