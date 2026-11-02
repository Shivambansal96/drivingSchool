import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Navbar, type AppPage } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { OwnerPage } from "./pages/OwnerPage";
import { ContactPage } from "./pages/ContactPage";
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
  // Page Routing: "home" | "owner" | "contact"
  const getPageFromHash = (): AppPage => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("owner")) return "owner";
    if (hash.includes("contact")) return "contact";
    return "home";
  };

  const [currentPage, setCurrentPage] = useState<AppPage>(getPageFromHash());
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(getSavedLanguage());
  const [showFirstVisitGuide, setShowFirstVisitGuide] = useState<boolean>(false);

  // Sync hash changes (browser back/forward buttons, direct URLs)
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initialize translation and first-visit guide
  useEffect(() => {
    initializeSavedLanguage();

    if (!isGuideDismissed() && getSavedLanguage() === "en") {
      const timer = setTimeout(() => {
        setShowFirstVisitGuide(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page === "home" ? "#/" : `#/${page}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* Sticky Shared Navigation Bar with Exactly 3 Pages */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
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

      {/* Exactly 3 Separate Pages */}
      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentPage === "owner" && <OwnerPage onNavigate={handleNavigate} />}
      {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}

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
