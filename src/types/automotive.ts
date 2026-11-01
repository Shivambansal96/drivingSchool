export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GearPosition = "N" | "1" | "2" | "3" | "4" | "5" | "R";

export interface ComponentHotspot {
  id: string;
  name: string;
  stage: StageId;
  category: "POWERTRAIN" | "CHASSIS & BRAKING" | "DRIVER CONTROLS" | "SAFETY & SIGNALLING" | "EXTERIOR";
  position3D: [number, number, number]; // [x, y, z] relative to car center
  shortDescription: string;
  whatItDoes: string;
  whyYouMustKnow: string;
  driverTip: string;
  photoUrl?: string; // Real WagonR photographic reference
  actionType?: "pedal" | "light" | "bonnet" | "wheel" | "steering" | "gear" | "mirror" | "checklist";
}

export interface StageConfig {
  stage: StageId;
  stageNumber: string; // e.g. "01 / 10"
  title: string;
  subtitle: string;
  description: string;
  photoUrl: string; // Authentic Maruti Suzuki WagonR photographic asset
  photoCaption: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  carRotationY: number;
  bonnetAngle: number; // 0 to 0.92 radians
  driverDoorAngle: number; // 0 to 1.05 radians (Front Right RHD door)
  wheelExplodeOffset: number; // 0 to 1
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
