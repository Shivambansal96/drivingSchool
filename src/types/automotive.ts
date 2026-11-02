export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6;

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GearPosition = "N" | "1" | "2" | "3" | "4" | "5" | "R";

export interface ComponentCallout {
  id: string;
  name: string;
  tag: string;
  position3D: [number, number, number]; // [x, y, z] in car coordinate space
  shortDescription: string;
  whatItDoes: string;
  whyYouMustKnow: string;
  instructorTip: string;
  category: "CABIN" | "STEERING" | "GEARBOX" | "PEDALS" | "HANDBRAKE" | "DASHBOARD";
  actionType?: "steering" | "gear" | "pedal" | "handbrake" | "light" | "stalk" | "ignition" | "hazard";
}

export interface ChapterConfig {
  id: ChapterId;
  chapterNumber: string; // "CHAPTER 01", "CHAPTER 02", etc.
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov?: number;
  steeringExplodeOffset: number; // 0 (normal) to 1 (separated forward along column axis)
  steeringRotation: number; // radians
  gearPosition: GearPosition;
  pedals: { clutch: boolean; brake: boolean; accel: boolean };
  handbrakeEngaged: boolean;
  dashboardActive: {
    speedometer: boolean;
    fuelGauge: boolean;
    tempWarning: boolean;
    turnLeft: boolean;
    turnRight: boolean;
    headlights: boolean;
    highBeam: boolean;
    wipers: boolean;
    horn: boolean;
    ignition: "LOCK" | "ACC" | "ON" | "START";
    hazard: boolean;
  };
  calloutIds: string[];
}

export interface ComponentHotspot {
  id: string;
  name: string;
  stage: StageId;
  category: "POWERTRAIN" | "CHASSIS & BRAKING" | "DRIVER CONTROLS" | "SAFETY & SIGNALLING" | "EXTERIOR";
  position3D: [number, number, number];
  shortDescription: string;
  whatItDoes: string;
  whyYouMustKnow: string;
  driverTip: string;
  photoUrl?: string;
  actionType?: "pedal" | "light" | "bonnet" | "wheel" | "steering" | "gear" | "mirror" | "checklist";
}

export interface StageConfig {
  stage: StageId;
  stageNumber: string;
  title: string;
  subtitle: string;
  description: string;
  photoUrl: string;
  photoCaption: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  carRotationY: number;
  bonnetAngle: number;
  driverDoorAngle: number;
  wheelExplodeOffset: number;
  cockpitMode: boolean;
  widgetType?: "overview" | "engine" | "wheel" | "cabin" | "steering" | "pedals" | "gear" | "lights" | "checklist" | "cta";
  activeLights: {
    headlights: boolean;
    leftIndicator: boolean;
    rightIndicator: boolean;
    hazard: boolean;
    brakeLights: boolean;
  };
  hotspotIds: string[];
}

// Runtime export to ensure module integrity in ES bundles
export const AUTOMOTIVE_MODULE_READY = true;
