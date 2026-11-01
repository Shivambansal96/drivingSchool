import React, { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "../types";

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      title: "Night Drive & Highway Navigation",
      category: "training",
      categoryLabel: "Training Environment",
      image: "/images/gallery_night_drive.jpg",
      description:
        "Real-world evening city street driving session focusing on wet-road illumination, headlights reflection, and intersection scanning.",
    },
    {
      id: "g2",
      title: "Four-Wheeler Sedan & Hatchback Track",
      category: "cars",
      categoryLabel: "Four-Wheelers",
      image: "/images/four_wheelers.jpg",
      description:
        "Modern dual-control training fleet aligned for precision slalom, gradient stop-start, and reverse bay maneuvers.",
    },
    {
      id: "g3",
      title: "Parallel Parking & Cones Test Bay",
      category: "training",
      categoryLabel: "Driving Practice",
      image: "/images/gallery_parking_track.jpg",
      description:
        "Instructor-supervised precision parking training inside official RTO test bay markings with traffic cones.",
    },
    {
      id: "g4",
      title: "Heavy Commercial Truck & Lorry",
      category: "heavy",
      categoryLabel: "Heavy Commercial",
      image: "/images/heavy_vehicles.jpg",
      description:
        "Full-size commercial rig negotiating banked turns on dedicated heavy vehicle training track during morning session.",
    },
    {
      id: "g5",
      title: "Two-Wheeler Scooter & Bike Fleet",
      category: "two_wheelers",
      categoryLabel: "Two-Wheelers",
      image: "/images/two_wheelers.jpg",
      description:
        "Gearless scooty and geared motorcycle fleet parked at the morning training facility for balance and braking sessions.",
    },
    {
      id: "g6",
      title: "Dual-Control Driving Cockpit",
      category: "cars",
      categoryLabel: "Four-Wheelers",
      image: "/images/driving_cockpit.jpg",
      description:
        "Inside the cockpit with instructor dual-pedal supervision, digital instrumentation, and steering wheel ergonomics.",
    },
    {
      id: "g7",
      title: "Dynamic Sports Sedan at Dawn",
      category: "cars",
      categoryLabel: "Four-Wheelers",
      image: "/images/hero_car.jpg",
      description:
        "Electric racing yellow sports sedan on damp asphalt showcasing vehicle dynamics and road presence.",
    },
    {
      id: "g8",
      title: "Smart Driving Licence Dossier",
      category: "training",
      categoryLabel: "Licence Assistance",
      image: "/images/licence_card.jpg",
      description:
        "Modern digital smart driving licence documentation structure and biometric test prep dossier.",
    },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CINEMATIC VISUALS</div>
          <h2 className="section-title">THE TRAINING ENVIRONMENT</h2>
          <p className="section-subtitle">
            Take a visual tour of our diverse vehicle fleet, morning practice tracks, precision
            parking bays, and hands-on learning environment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          {[
            { id: "all", label: "All Visuals" },
            { id: "cars", label: "Four-Wheelers" },
            { id: "two_wheelers", label: "Two-Wheelers" },
            { id: "heavy", label: "Heavy Vehicles" },
            { id: "training", label: "Training & Practice" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--radius-full)",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                fontWeight: 700,
                background: selectedFilter === tab.id ? "var(--accent-yellow)" : "rgba(255, 255, 255, 0.05)",
                color: selectedFilter === tab.id ? "#000000" : "var(--text-body)",
                border:
                  selectedFilter === tab.id
                    ? "1px solid var(--accent-yellow)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="glass-card"
              onClick={() => openLightbox(index)}
              style={{
                cursor: "pointer",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                position: "relative",
                aspectRatio: "16 / 10",
                background: "#0a0c10",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

              {/* Bottom Info Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(8, 9, 12, 0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "18px",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--accent-yellow)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                  }}
                >
                  {item.categoryLabel}
                </span>
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-white)",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h5>
              </div>

              {/* Hover Zoom Icon */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(0, 0, 0, 0.65)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-white)",
                }}
              >
                <ZoomIn size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.94)",
            backdropFilter: "blur(20px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "clamp(12px, 2.5vw, 24px)",
              right: "clamp(12px, 2.5vw, 24px)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2010,
            }}
            title="Close Lightbox (Esc)"
          >
            <X size={22} />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            style={{
              position: "absolute",
              left: "clamp(8px, 2vw, 24px)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2010,
            }}
            title="Previous Image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            style={{
              position: "absolute",
              right: "clamp(8px, 2vw, 24px)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2010,
            }}
            title="Next Image"
          >
            <ChevronRight size={26} />
          </button>

          {/* Main Lightbox Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "960px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              background: "#0c0e14",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9)",
            }}
          >
            <div style={{ position: "relative", width: "100%", maxHeight: "68vh", overflow: "hidden" }}>
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "68vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div style={{ padding: "24px 30px", background: "#0a0c12" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-yellow)",
                    textTransform: "uppercase",
                  }}
                >
                  {filteredItems[lightboxIndex].categoryLabel} • {lightboxIndex + 1} of{" "}
                  {filteredItems.length}
                </span>
              </div>

              <h4
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--text-white)",
                  marginBottom: "8px",
                }}
              >
                {filteredItems[lightboxIndex].title}
              </h4>

              <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.55 }}>
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
