import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { KnowYourCarSection } from "../components/know-your-car/KnowYourCarSection";
import { VehicleCategories } from "../components/VehicleCategories";
import { Pricing } from "../components/Pricing";
import { DailySchedule } from "../components/DailySchedule";
import { LicenceAssistance } from "../components/LicenceAssistance";
import { Footer } from "../components/Footer";
import type { AppPage } from "../components/Navbar";

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string>("four-wheelers");

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
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

  const handleSelectVehicle = (categoryId: string) => {
    setSelectedVehicleCategory(categoryId);
    scrollToPricing();
  };

  return (
    <main id="home-page" style={{ position: "relative" }}>
      {/* 1. Hero & Realistic 3D WagonR Masterclass Experience */}
      <Hero
        onExploreCourses={scrollToPricing}
        onContactUs={() => onNavigate("contact")}
      />

      <KnowYourCarSection onExploreCourses={scrollToPricing} />

      {/* 2. Vehicles Section (2 Wheelers, 4 Wheelers, MGV) */}
      <VehicleCategories onSelectCategory={handleSelectVehicle} />

      {/* 3. Interactive Pricing Section */}
      <Pricing selectedVehicle={selectedVehicleCategory} />

      {/* 4. Training Timings (with compact Sunday note) */}
      <DailySchedule />

      {/* 5. Driving Licence Assistance (Compact & Premium) */}
      <LicenceAssistance />

      {/* 6. Home Page Footer */}
      <Footer onNavigate={onNavigate} />
    </main>
  );
};
