import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG, createWhatsAppLink } from "../config/contact";

export const ContactSection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("Personal Training (₹11,000)");
  const [selectedSlot, setSelectedSlot] = useState<string>("07:00 AM – 08:00 AM");
  const [fullName, setFullName] = useState<string>("");
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(BRAND_CONFIG.phoneDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BRAND_CONFIG.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppLink({
      planName: selectedCourse,
      timeSlot: selectedSlot,
      userName: fullName || undefined,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CONNECT & ENROL</div>
          <h2 className="section-title">READY TO TAKE THE WHEEL?</h2>
          <p className="section-subtitle">
            Take the first step toward road mastery and complete driving independence. Reach out
            directly via WhatsApp or explore our training grounds.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 4vw, 36px)",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Direct WhatsApp Enquiry Builder */}
          <div
            className="glass-card"
            style={{
              padding: "clamp(22px, 4vw, 36px)",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(180deg, rgba(20, 24, 36, 0.9) 0%, rgba(12, 14, 22, 0.98) 100%)",
              border: "1px solid rgba(255, 229, 0, 0.3)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.7), 0 0 30px rgba(255, 229, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--accent-yellow)",
                  background: "var(--accent-yellow-dim)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "16px",
                }}
              >
                <MessageSquare size={14} />
                DIRECT WHATSAPP ENQUIRY
              </div>

              <h3
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 800,
                  color: "var(--text-white)",
                  marginBottom: "8px",
                }}
              >
                Instant Admission Chat
              </h3>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-body)",
                  lineHeight: 1.55,
                  marginBottom: "26px",
                }}
              >
                Select your preferred course plan and morning time slot below. Clicking the button
                instantly generates a customized enquiry message in WhatsApp for immediate response.
              </p>

              <form onSubmit={handleSendWhatsApp} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Select Course / Package
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "#0c0e16",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "var(--accent-yellow)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Personal Training (₹11,000)">Personal Training (1-on-1, ₹11,000)</option>
                    <option value="Semi-Personal Training (₹5,500)">Semi-Personal Training (2 Learners, ₹5,500)</option>
                    <option value="Group Training (₹3,000)">Group Training (3-4 Learners, ₹3,000)</option>
                    <option value="Licence Assistance (₹3,000)">Driving Licence Assistance (₹3,000)</option>
                    <option value="Two-Wheeler Training">Two-Wheeler (Scooty / Bike) Training</option>
                    <option value="Heavy Commercial Vehicle Training">Heavy Commercial Vehicle Training</option>
                    <option value="General Enquiry">General Information Enquiry</option>
                  </select>
                </div>

                {/* Preferred Batch */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Preferred Morning Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "#0c0e16",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="06:00 AM – 07:00 AM">Batch 1: 06:00 AM – 07:00 AM (Dawn)</option>
                    <option value="07:00 AM – 08:00 AM">Batch 2: 07:00 AM – 08:00 AM (Golden Hour)</option>
                    <option value="08:00 AM – 09:00 AM">Batch 3: 08:00 AM – 09:00 AM (City Flow)</option>
                    <option value="Flexible / Subject to Discussion">Flexible / Discuss via Chat</option>
                  </select>
                </div>

                {/* Submit to WhatsApp Button */}
                <button
                  type="submit"
                  className="btn btn-whatsapp"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "0.98rem",
                    borderRadius: "var(--radius-md)",
                    marginTop: "8px",
                  }}
                >
                  <MessageSquare size={18} />
                  Start WhatsApp Enquiry Now
                </button>
              </form>
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.76rem",
                color: "var(--text-dim)",
                textAlign: "center",
              }}
            >
              Direct contact number configured in central config: <strong>{BRAND_CONFIG.phoneDisplay}</strong>
            </div>
          </div>

          {/* Right Column: Contact Details & Google Maps Embed */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Contact Placeholders Card */}
            <div
              className="glass-card"
              style={{
                padding: "clamp(20px, 3.5vw, 28px)",
                borderRadius: "var(--radius-xl)",
                background: "rgba(16, 20, 30, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
              }}
            >
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-white)",
                  marginBottom: "18px",
                }}
              >
                Official Academy Information
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Phone */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        background: "rgba(255, 229, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={18} color="var(--accent-yellow)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        PHONE ENQUIRY (PLACEHOLDER)
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-white)" }}>
                        {BRAND_CONFIG.phoneDisplay}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: copiedPhone ? "var(--accent-green)" : "var(--text-muted)",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="Copy phone"
                  >
                    {copiedPhone ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                    {copiedPhone ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Address */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        background: "rgba(255, 229, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={18} color="var(--accent-yellow)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        TRAINING GROUND & OFFICE LOCATION
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.45 }}>
                        {BRAND_CONFIG.address}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <a
                      href={BRAND_CONFIG.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(255, 229, 0, 0.12)",
                        border: "1px solid rgba(255, 229, 0, 0.35)",
                        color: "var(--accent-yellow)",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}
                      title="Open in Google Maps"
                    >
                      <ExternalLink size={13} />
                      Directions
                    </a>

                    <button
                      onClick={handleCopyAddress}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: copiedAddress ? "var(--accent-green)" : "var(--text-muted)",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      title="Copy address"
                    >
                      {copiedAddress ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                      {copiedAddress ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Schedule Status */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: "rgba(255, 229, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} color="var(--accent-yellow)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      OPERATIONAL HOURS
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--text-white)", fontWeight: 600 }}>
                      Monday to Saturday: 06:00 AM – 09:00 AM
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--accent-red)", fontWeight: 700, marginTop: "2px" }}>
                      Sunday: CLOSED (Fleet Maintenance)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Container */}
            <div
              className="glass-card"
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                height: "260px",
                position: "relative",
              }}
            >
              <iframe
                title="Ghosh Motor Training School Location Map - Siliguri"
                src={BRAND_CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  background: "rgba(8, 9, 12, 0.88)",
                  backdropFilter: "blur(8px)",
                  padding: "5px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--accent-yellow)",
                  border: "1px solid rgba(255, 229, 0, 0.3)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                📍 Ghosh Motor Training School • Haider Para, Siliguri
              </div>

              <a
                href={BRAND_CONFIG.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(8, 9, 12, 0.88)",
                  backdropFilter: "blur(8px)",
                  padding: "5px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-yellow)";
                  e.currentTarget.style.color = "var(--accent-yellow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <span>Open in Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
