import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Navigation,
  ExternalLink,
  Copy,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { SITE_DATA } from "../config/siteData";
import { Footer } from "../components/Footer";
import type { AppPage } from "../components/Navbar";

interface ContactPageProps {
  onNavigate: (page: AppPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const contact = SITE_DATA.contact;
  const socialLinks = SITE_DATA.socialLinks;

  // Form State (Frontend only: compiles to direct WhatsApp enquiry)
  const [selectedCourse, setSelectedCourse] = useState<string>("Four-Wheelers (Personal Training)");
  const [selectedSlot, setSelectedSlot] = useState<string>("07:00 AM – 08:00 AM (Golden Hour)");
  const [fullName, setFullName] = useState<string>("");
  const [userQuery, setUserQuery] = useState<string>("");

  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contact.phoneDial);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contact.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleDirectWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryText = userQuery ? `\nQuery: ${userQuery}` : "";
    const nameText = fullName ? `\nName: ${fullName}` : "";
    const text = encodeURIComponent(
      `Hello GHOSH MOTOR TRAINING SCHOOL, I would like to know more about your driving classes.${nameText}\nInterested Course: ${selectedCourse}\nPreferred Time: ${selectedSlot}${queryText}`
    );
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="contact-page-root" style={{ paddingTop: "var(--header-height)", position: "relative" }}>
      {/* SECTION 1: HEADER & PRIMARY CONTACT CARDS */}
      <section className="section-spacing" style={{ backgroundColor: "var(--bg-primary)", position: "relative" }}>
        {/* Ambient lighting glow */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag">COMMUNICATION & ADMISSIONS</div>
            <h1 className="section-title">CONNECT WITH GHOSH MOTOR</h1>
            <p className="section-subtitle">
              Ready to take the wheel? Reach our admissions desk directly via phone, WhatsApp, email,
              or visit our training grounds in Siliguri.
            </p>
          </div>

          {/* 4 Interactive Action Cards: Phone, WhatsApp, Email, Directions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
              gap: "20px",
              marginBottom: "50px",
            }}
          >
            {/* 1. Direct Phone Call */}
            <div
              className="glass-card"
              style={{
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(22, 26, 38, 0.9) 0%, rgba(12, 14, 22, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255, 229, 0, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <Phone size={20} color="var(--accent-yellow)" />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                  Direct Phone Call
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: "4px" }}>
                  {contact.phoneDisplay}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Instant voice support during office hours
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontSize: "0.82rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  style={{
                    padding: "8px 12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "var(--radius-sm)",
                    color: copiedPhone ? "var(--accent-green)" : "var(--text-muted)",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                  }}
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* 2. WhatsApp Instant Chat */}
            <div
              className="glass-card"
              style={{
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(22, 26, 38, 0.9) 0%, rgba(12, 14, 22, 0.98) 100%)",
                border: "1.5px solid rgba(37, 211, 102, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#25D366";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(37, 211, 102, 0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <MessageSquare size={20} color="#25D366" />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#25D366", textTransform: "uppercase" }}>
                  Instant WhatsApp
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: "4px" }}>
                  Pre-filled Chat
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Fast admissions & course fee guidance
                </div>
              </div>

              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20GHOSH%20MOTOR%20TRAINING%20SCHOOL%2C%20I%20would%20like%20to%20know%20more%20about%20your%20driving%20classes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  fontSize: "0.82rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* 3. Direct Email Link */}
            <div
              className="glass-card"
              style={{
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(22, 26, 38, 0.9) 0%, rgba(12, 14, 22, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255, 229, 0, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <Mail size={20} color="var(--accent-yellow)" />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                  Admissions Email
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginTop: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {contact.email}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Official registration queries & corporate batch
                </div>
              </div>

              <a
                href={`mailto:${contact.email}?subject=Course%20Enquiry%20-%20Ghosh%20Motor%20Training%20School`}
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  fontSize: "0.82rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
                <span>Send Email</span>
              </a>
            </div>

            {/* 4. Google Maps Directions */}
            <div
              className="glass-card"
              style={{
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(180deg, rgba(22, 26, 38, 0.9) 0%, rgba(12, 14, 22, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-yellow)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255, 229, 0, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <MapPin size={20} color="var(--accent-yellow)" />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                  Office Location
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginTop: "4px" }}>
                  Haider Para, Siliguri
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  {contact.landmark}
                </div>
              </div>

              <a
                href={contact.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  fontSize: "0.82rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <Navigation size={14} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT: Direct WhatsApp Enquiry Form + Location & Hours */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "clamp(24px, 4vw, 36px)",
              alignItems: "stretch",
              marginBottom: "60px",
            }}
          >
            {/* Left: Frontend-Only Direct Enquiry Builder */}
            <div
              className="glass-card"
              style={{
                padding: "clamp(24px, 4vw, 36px)",
                borderRadius: "var(--radius-xl)",
                background: "linear-gradient(180deg, rgba(20, 24, 36, 0.92) 0%, rgba(12, 14, 22, 0.98) 100%)",
                border: "1.5px solid rgba(255, 229, 0, 0.3)",
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
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    color: "var(--accent-yellow)",
                    background: "var(--accent-yellow-dim)",
                    padding: "4px 12px",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "14px",
                  }}
                >
                  <MessageSquare size={14} />
                  DIRECT ENQUIRY BUILDER
                </div>

                <h3 style={{ fontSize: "1.55rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
                  Instant WhatsApp Admission Request
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.55, marginBottom: "24px" }}>
                  Configure your course preference below. Submitting directly opens WhatsApp with a
                  formatted message for immediate instructor confirmation. No fake database or delays.
                </p>

                <form onSubmit={handleDirectWhatsAppSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-fullname"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      YOUR FULL NAME (OPTIONAL)
                    </label>
                    <input
                      id="contact-fullname"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {/* Course Category */}
                  <div>
                    <label
                      htmlFor="contact-course-select"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      SELECT VEHICLE & TRAINING PLAN
                    </label>
                    <select
                      id="contact-course-select"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(16, 20, 30, 0.95)",
                        border: "1px solid rgba(255, 229, 0, 0.4)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="4 Wheelers - Personal Training (₹11,000)">4 Wheelers (WagonR) - Personal 1-on-1 (₹11,000)</option>
                      <option value="4 Wheelers - Semi-Personal (₹5,500)">4 Wheelers (WagonR) - Semi-Personal 1:2 (₹5,500)</option>
                      <option value="4 Wheelers - Group Training (₹3,000)">4 Wheelers (WagonR) - Group 1:3-4 (₹3,000)</option>
                      <option value="2 Wheelers - Practical Training (₹3,000)">2 Wheelers (Scooty/Bike) - Foundation (₹3,000)</option>
                      <option value="MGV Commercial - Medium Goods Transport">MGV - Medium Goods Commercial Transport</option>
                      <option value="Driving Licence Assistance (₹3,000)">Driving Licence (DL) Guidance Only (₹3,000)</option>
                    </select>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label
                      htmlFor="contact-slot-select"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      PREFERRED MORNING TIME SLOT
                    </label>
                    <select
                      id="contact-slot-select"
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(16, 20, 30, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="06:00 AM – 07:00 AM (Dawn Patrol - Light Traffic)">06:00 AM – 07:00 AM (Dawn Patrol - Quiet Roads)</option>
                      <option value="07:00 AM – 08:00 AM (Golden Hour - Mild Flow)">07:00 AM – 08:00 AM (Golden Hour - Mild Traffic)</option>
                      <option value="08:00 AM – 09:00 AM (City Flow - City Commute)">08:00 AM – 09:00 AM (City Flow - Active Commute)</option>
                    </select>
                  </div>

                  {/* Custom Note */}
                  <div>
                    <label
                      htmlFor="contact-query-text"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      SPECIFIC QUESTIONS (OPTIONAL)
                    </label>
                    <textarea
                      id="contact-query-text"
                      rows={3}
                      placeholder="e.g. Do you provide slope start practice? When does the next batch start?"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {/* Submit to WhatsApp Button */}
                  <button
                    type="submit"
                    className="btn btn-whatsapp"
                    style={{
                      width: "100%",
                      padding: "14px",
                      fontSize: "0.95rem",
                      borderRadius: "var(--radius-full)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Send Enquiry on WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Embedded Google Maps & Physical Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Responsive Google Maps Iframe */}
              <div
                className="glass-card"
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  border: "1.5px solid rgba(255, 255, 255, 0.12)",
                  height: "320px",
                  position: "relative",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
                }}
              >
                <iframe
                  title="Ghosh Motor Training School Location Map - Siliguri"
                  src={contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "14px",
                    background: "rgba(8, 9, 12, 0.9)",
                    backdropFilter: "blur(10px)",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(255, 229, 0, 0.4)",
                    color: "var(--accent-yellow)",
                    fontSize: "0.78rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  📍 Siliguri Training Ground
                </div>
              </div>

              {/* Address & Business Hours Card */}
              <div
                className="glass-card"
                style={{
                  padding: "clamp(20px, 3.5vw, 28px)",
                  borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(180deg, rgba(20, 24, 34, 0.85) 0%, rgba(12, 14, 20, 0.95) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {/* Physical Address */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
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
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                        TRAINING SCHOOL ADDRESS
                      </div>
                      <div style={{ fontSize: "0.92rem", color: "#ffffff", fontWeight: 700, lineHeight: 1.4, marginTop: "2px" }}>
                        {contact.address}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        {contact.landmark}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <a
                      href={contact.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(255, 229, 0, 0.12)",
                        border: "1px solid rgba(255, 229, 0, 0.35)",
                        color: "var(--accent-yellow)",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "0.76rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                        fontWeight: 700,
                      }}
                    >
                      <Navigation size={13} />
                      <span>Directions</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: copiedAddress ? "var(--accent-green)" : "var(--text-muted)",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "0.76rem",
                        cursor: "pointer",
                      }}
                      title="Copy Address"
                    >
                      {copiedAddress ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "14px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
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
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-yellow)", textTransform: "uppercase" }}>
                      OPERATING TIMINGS
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: 700, marginTop: "2px" }}>
                      {contact.officeHours}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--accent-red)", fontWeight: 700, marginTop: "2px" }}>
                      Sunday: CLOSED (Fleet Maintenance & Instructor Rest)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: SOCIAL MEDIA HUB */}
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "50px", marginBottom: "30px" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  color: "var(--accent-yellow)",
                  background: "var(--accent-yellow-dim)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "8px",
                }}
              >
                <Share2 size={13} />
                OFFICIAL ONLINE PRESENCE
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>
                Connected Channels & Platforms
              </h2>
              <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
                Follow our official announcements, student milestones, and defensive driving tips.
                Only active accounts are linked below.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: "16px",
              }}
            >
              {socialLinks.map((platform) => (
                <div
                  key={platform.id}
                  className="glass-card"
                  style={{
                    padding: "18px",
                    borderRadius: "var(--radius-md)",
                    background: platform.active
                      ? "linear-gradient(135deg, rgba(255, 229, 0, 0.12) 0%, rgba(20, 24, 34, 0.8) 100%)"
                      : "rgba(255, 255, 255, 0.03)",
                    border: platform.active
                      ? "1.5px solid var(--accent-yellow)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "12px",
                    opacity: platform.active ? 1 : 0.65,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>
                      {platform.name}
                    </div>
                    {platform.active ? (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--accent-yellow)",
                          fontFamily: "var(--font-mono)",
                          background: "rgba(255, 229, 0, 0.15)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        ACTIVE
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--text-dim)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        COMING SOON
                      </span>
                    )}
                  </div>

                  {platform.active ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{
                        padding: "7px 12px",
                        fontSize: "0.78rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        textDecoration: "none",
                      }}
                    >
                      <span>Visit Channel</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--text-dim)",
                        fontFamily: "var(--font-mono)",
                        textAlign: "center",
                        padding: "6px",
                      }}
                    >
                      Placeholder
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
