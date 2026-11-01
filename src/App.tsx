import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { VehicleCategories } from "./components/VehicleCategories";
import { Pricing } from "./components/Pricing";
import { DailySchedule } from "./components/DailySchedule";
import { LicenceAssistance } from "./components/LicenceAssistance";
import { TrafficRules } from "./components/TrafficRules";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Gallery } from "./components/Gallery";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { KnowYourCarSection } from "./components/know-your-car/KnowYourCarSection";
import { LanguageSelectorModal } from "./components/LanguageSelectorModal";
import { FirstVisitTranslationGuide } from "./components/FirstVisitTranslationGuide";
import { createWhatsAppLink } from "./config/contact";
import {
  getSavedLanguage,
  isGuideDismissed,
  setGuideDismissed,
  initializeSavedLanguage,
  applyGoogleTranslation,
} from "./config/languages";

export function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string | undefined>(undefined);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(getSavedLanguage());
  const [showFirstVisitGuide, setShowFirstVisitGuide] = useState<boolean>(false);

  // Initialize saved translation preference and first-visit guide
  useEffect(() => {
    initializeSavedLanguage();

    // Show guide only for first-time visitors who haven't dismissed it
    if (!isGuideDismissed() && getSavedLanguage() === "en") {
      const timer = setTimeout(() => {
        setShowFirstVisitGuide(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track scroll position to update active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "know-your-car",
        "vehicles",
        "pricing",
        "schedule",
        "licence",
        "traffic-rules",
        "gallery",
        "contact",
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedVehicleCategory(catName);
    scrollToSection("pricing");
  };

  const handleOpenTranslateModal = () => {
    setIsTranslateModalOpen(true);
    setShowFirstVisitGuide(false);
    setGuideDismissed();
  };

  const handleCloseTranslateModal = () => {
    setIsTranslateModalOpen(false);
  };

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLanguage(langCode);
    applyGoogleTranslation(langCode);
  };

  const handleDismissGuide = () => {
    setShowFirstVisitGuide(false);
    setGuideDismissed();
  };

  return (
    <div className="app-root" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Sticky Navigation with Multi-Language Translation */}
      <Navbar
        activeSection={activeSection}
        onOpenTranslateModal={handleOpenTranslateModal}
        currentLanguage={currentLanguage}
        isGuideActive={showFirstVisitGuide}
      />

      {/* First-Visit Animated Translation Guide Tooltip */}
      <FirstVisitTranslationGuide
        isVisible={showFirstVisitGuide}
        onDismiss={handleDismissGuide}
        onTranslateNow={handleOpenTranslateModal}
      />

      {/* Language Selection Modal */}
      <LanguageSelectorModal
        isOpen={isTranslateModalOpen}
        onClose={handleCloseTranslateModal}
        currentLanguage={currentLanguage}
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Hero Section */}
      <Hero
        onExploreCourses={() => scrollToSection("pricing")}
        onContactUs={() => scrollToSection("contact")}
      />

      {/* Flagship Interactive 3D Automotive Masterclass: Know Your Car Before You Drive */}
      <KnowYourCarSection onExploreCourses={() => scrollToSection("pricing")} />

      {/* Vehicle Categories */}
      <VehicleCategories onSelectCategory={handleSelectCategory} />

      {/* Driving Course Pricing */}
      <Pricing selectedVehicle={selectedVehicleCategory} />

      {/* Daily Training Schedule */}
      <DailySchedule />

      {/* Driving Licence Assistance */}
      <LicenceAssistance />

      {/* Traffic Rules & Road Safety */}
      <TrafficRules />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Cinematic Gallery */}
      <Gallery />

      {/* Contact & Enquiry */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Button: Quick WhatsApp Enquire */}
      <aside
        aria-label="Quick WhatsApp enquiry"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#25D366",
            color: "#000000",
            padding: "14px 22px",
            borderRadius: "var(--radius-full)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.92rem",
            boxShadow: "0 8px 30px rgba(37, 211, 102, 0.45)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(37, 211, 102, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.45)";
          }}
        >
          <MessageSquare size={20} />
          <span className="hide-on-mobile">WhatsApp Enquiry</span>
        </a>
      </aside>
    </div>
  );
}

export default App;
