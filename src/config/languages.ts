/**
 * Multi-Language Configuration & Utilities for Ghosh Motor Training School
 */

export interface LanguageOption {
  code: string;
  name: string;        // Native name e.g. "বাংলা", "हिन्दी"
  englishName: string; // e.g. "Bengali", "Hindi"
  script: string;      // Script family or region
  badge?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    englishName: "English",
    script: "Original / Default",
    badge: "Default",
  },
  {
    code: "bn",
    name: "বাংলা",
    englishName: "Bengali",
    script: "West Bengal • Bangla",
    badge: "Local",
  },
  {
    code: "hi",
    name: "हिन्दी",
    englishName: "Hindi",
    script: "National • Devanagari",
    badge: "Popular",
  },
  {
    code: "gu",
    name: "ગુજરાતી",
    englishName: "Gujarati",
    script: "Gujarat",
  },
  {
    code: "mr",
    name: "मराठी",
    englishName: "Marathi",
    script: "Maharashtra",
  },
  {
    code: "ta",
    name: "தமிழ்",
    englishName: "Tamil",
    script: "Tamil Nadu",
  },
  {
    code: "te",
    name: "తెలుగు",
    englishName: "Telugu",
    script: "Andhra Pradesh & Telangana",
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ",
    englishName: "Kannada",
    script: "Karnataka",
  },
  {
    code: "ml",
    name: "മലയാളം",
    englishName: "Malayalam",
    script: "Kerala",
  },
  {
    code: "pa",
    name: "ਪੰਜਾਬੀ",
    englishName: "Punjabi",
    script: "Punjab • Gurmukhi",
  },
  {
    code: "ur",
    name: "اردو",
    englishName: "Urdu",
    script: "Urdu",
  },
];

export const STORAGE_KEYS = {
  SELECTED_LANGUAGE: "ghosh_selected_language",
  GUIDE_DISMISSED: "ghosh_translation_guide_dismissed",
};

/**
 * Get the currently saved language code from localStorage or cookies
 */
export function getSavedLanguage(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_LANGUAGE);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
  } catch {
    // LocalStorage unavailable
  }
  return "en";
}

/**
 * Check if the first-visit translation guide was already dismissed or used
 */
export function isGuideDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.GUIDE_DISMISSED) === "true";
  } catch {
    return false;
  }
}

/**
 * Mark first-visit translation guide as dismissed
 */
export function setGuideDismissed(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GUIDE_DISMISSED, "true");
  } catch {
    // Ignore
  }
}

/**
 * Set the Google Translate cookie and trigger translation
 */
export function applyGoogleTranslation(targetLang: string): boolean {
  try {
    // Save to localStorage for instant restoration across visits
    localStorage.setItem(STORAGE_KEYS.SELECTED_LANGUAGE, targetLang);
    setGuideDismissed();

    if (targetLang === "en") {
      // Clear cookie to revert to original English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = "googtrans=/en/en; path=/;";
    } else {
      // Set the googtrans cookie for both root and current domain
      document.cookie = `googtrans=/en/${targetLang}; path=/;`;
      document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname};`;
    }

    // Try finding the Google Translate combo element
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = targetLang === "en" ? "" : targetLang;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }

    // If combo isn't ready yet or translation reverted to English, reload gently if needed
    if (targetLang === "en") {
      const isCurrentlyTranslated = document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl") ||
        document.querySelector(".goog-te-banner-frame");
      if (isCurrentlyTranslated) {
        window.location.reload();
      }
    }
    return false;
  } catch (err) {
    console.error("Error applying translation:", err);
    return false;
  }
}

/**
 * Initialize translation on boot according to saved preference
 */
export function initializeSavedLanguage(): void {
  const savedLang = getSavedLanguage();
  if (savedLang && savedLang !== "en") {
    // Set cookie immediately so Google Translate initializes with this language
    document.cookie = `googtrans=/en/${savedLang}; path=/;`;
    document.cookie = `googtrans=/en/${savedLang}; path=/; domain=${window.location.hostname};`;

    // Wait for the Google combo element to become available and trigger
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.value = savedLang;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
        clearInterval(interval);
      } else if (attempts > 30) {
        clearInterval(interval);
      }
    }, 250);
  }
}
