export type VehicleCategory = {
  id: string;
  name: string;
  tagline: string;
  types: string[];
  description: string;
  image: string;
  highlights: string[];
  badge: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  duration: string;
  studentsPerSession: string;
  sessionDuration: string;
  attentionLevel: "Shared (1:3 - 1:4)" | "Semi-Individual (1:2)" | "1-on-1 Dedicated (1:1)";
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  whatsappMessage: string;
};

export type ScheduleSlot = {
  id: string;
  timeRange: string;
  batchName: string;
  description: string;
  roadCondition: string;
  suitableFor: string;
  iconType: "dawn" | "sunrise" | "morning";
};

export type DocumentRequirement = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  iconName: string;
  mandatory: boolean;
};

export type LicenceStep = {
  step: string;
  title: string;
  description: string;
  keyDeliverable: string;
};

export type TrafficSign = {
  id: string;
  name: string;
  category: "mandatory" | "cautionary" | "informatory";
  shape: "circle" | "triangle" | "octagon" | "rectangle";
  meaning: string;
  actionRequired: string;
  svgType: string;
};

export type SafetyRule = {
  id: string;
  title: string;
  summary: string;
  ruleDetail: string;
  category: "personal" | "vehicle" | "road";
  importance: "CRITICAL" | "MANDATORY" | "VITAL";
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "cars" | "two_wheelers" | "heavy" | "training";
  categoryLabel: string;
  image: string;
  description: string;
};
