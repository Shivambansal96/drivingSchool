import type { ChapterConfig, ComponentCallout } from "../types/automotive";

// ===========================================================================
// ALL COMPONENT CALLOUTS DICTIONARY (Verified Indian WagonR RHD Layout)
// ===========================================================================
export const COMPONENT_CALLOUTS: Record<string, ComponentCallout> = {
  // --- CHAPTER 1: CABIN & OVERVIEW ---
  "rhd-cockpit": {
    id: "rhd-cockpit",
    name: "Indian Right-Hand-Drive (RHD) Cabin",
    tag: "COCKPIT LAYOUT",
    position3D: [0.35, 0.98, 0.35],
    shortDescription: "Ergonomic high-command driving position optimized for Indian traffic.",
    whatItDoes:
      "Positions the driver at +X (right side of car) with expansive tall-boy glasshouse visibility, upright lumbar support, and all vital controls within comfortable arms' reach.",
    whyYouMustKnow:
      "In India, driving on the left side of the road requires RHD alignment so you can judge oncoming traffic safely when overtaking or turning right.",
    instructorTip:
      "Sit upright with your hips back in the seat. When your wrists rest comfortably on the top of the steering rim without your shoulders lifting, your reach is dialed in.",
    category: "CABIN",
  },
  "high-windscreen": {
    id: "high-windscreen",
    name: "Panoramic High-Visibility Windscreen",
    tag: "VISIBILITY",
    position3D: [0.35, 1.05, 0.72],
    shortDescription: "Wide curved laminated glass minimizing forward blind spots.",
    whatItDoes:
      "Provides a broad 180° field of view over the sloping front bonnet, helping beginners easily spot curbs, pedestrians, and two-wheelers.",
    whyYouMustKnow:
      "Maintaining clean glass inside and out prevents blinding glare from streetlights and high-beam traffic during night driving.",
    instructorTip:
      "Never place notebooks, reflective papers, or idols on the dashboard. They reflect onto the windscreen and cause severe visibility haze.",
    category: "CABIN",
  },

  // --- CHAPTER 2: STEERING WHEEL ---
  "steering-wheel": {
    id: "steering-wheel",
    name: "3-Spoke Urethane Steering Wheel",
    tag: "DIRECTIONAL CONTROL",
    position3D: [0.35, 0.88, 0.44],
    shortDescription: "Electric Power Steering (EPS) wheel with speed-sensitive auto-center assist.",
    whatItDoes:
      "Translates rotational hand inputs through the rack-and-pinion gear to steer the front wheels. Features ~2.8 turns lock-to-lock.",
    whyYouMustKnow:
      "Holding the wheel at the 9-and-3 o'clock position allows you to turn up to 180° without ever crossing your arms over the airbag cover.",
    instructorTip:
      "Never grip the wheel tightly with white knuckles. Relax your fingers; feel the road surface feedback through the electric power assist.",
    category: "STEERING",
    actionType: "steering",
  },
  "airbag-horn": {
    id: "airbag-horn",
    name: "SRS Airbag & Dual-Tone Horn Boss",
    tag: "SAFETY & WARNING",
    position3D: [0.35, 0.88, 0.42],
    shortDescription: "Central steering pad housing pyrotechnic airbag cushion and horn switches.",
    whatItDoes:
      "Deploys in under 35 milliseconds in severe frontal impacts to cushion the driver's head and chest. Pressing firmly sounds the warning horn.",
    whyYouMustKnow:
      "An airbag deploys at over 250 km/h. If your hands or thumbs are hooked inside the steering spokes during an impact, severe wrist injury can occur.",
    instructorTip:
      "Rest your thumbs along the outer rim contour, never wrapped inward across the center horn boss.",
    category: "STEERING",
    actionType: "steering",
  },
  "lighting-stalk": {
    id: "lighting-stalk",
    name: "Right-Hand Column Stalk (Headlights & Blinkers)",
    tag: "SIGNALLING",
    position3D: [0.48, 0.88, 0.42],
    shortDescription: "In Indian RHD cars: Down for Right Turn, Up for Left Turn, Twist for Lights.",
    whatItDoes:
      "Operates parking lamps, low beam, high beam, lane-change flashes, and turn blinkers without lifting your right hand off the steering wheel.",
    whyYouMustKnow:
      "Signalling early gives other motorists 3 to 5 seconds of reaction time before you initiate a lane change or turn.",
    instructorTip:
      "Push DOWN for Right turn (following steering turn direction). Push UP for Left turn. The stalk clicks back to neutral automatically after the turn.",
    category: "STEERING",
    actionType: "stalk",
  },
  "wiper-stalk": {
    id: "wiper-stalk",
    name: "Left-Hand Column Stalk (Windscreen Wipers)",
    tag: "RAIN & MIST",
    position3D: [0.22, 0.88, 0.42],
    shortDescription: "Controls multi-speed wipers and pressurized washer fluid sprays.",
    whatItDoes:
      "Down for Intermittent (INT), Normal (LO), Fast (HI). Pull toward you to spray washer jet and trigger 3 automated wiping strokes.",
    whyYouMustKnow:
      "Using dry wipers on dusty glass scratches the laminated windscreen permanently. Always spray washer fluid before wiping dust away.",
    instructorTip:
      "In light drizzle, use Intermittent mode so the rubber wiper blades don't judder across dry glass.",
    category: "STEERING",
    actionType: "stalk",
  },

  // --- CHAPTER 3: GEAR LEVER ---
  "gear-lever": {
    id: "gear-lever",
    name: "5-Speed Manual H-Pattern Shifter",
    tag: "TRANSMISSION",
    position3D: [0.0, 0.42, 0.32],
    shortDescription: "Short-throw floor-mounted stick matching engine RPM to road speed.",
    whatItDoes:
      "Engages helical gear ratios: 1st (0-15 km/h), 2nd (15-30 km/h), 3rd (30-45 km/h), 4th (45-60 km/h), 5th (60+ km/h cruising), and Reverse (R).",
    whyYouMustKnow:
      "Selecting the wrong gear ratio (e.g., dropping into 1st instead of 3rd at 50 km/h) causes violent engine over-revving and loss of vehicle stability.",
    instructorTip:
      "Cup the knob with an open palm. Never grip it like a joystick. The internal centering spring naturally aligns the stick between 3rd and 4th gear.",
    category: "GEARBOX",
    actionType: "gear",
  },
  "reverse-lockout": {
    id: "reverse-lockout",
    name: "Reverse Gear Engagement & Safety Stop",
    tag: "PARKING & BACKING",
    position3D: [0.04, 0.38, 0.28],
    shortDescription: "Mechanical lockout preventing accidental reverse engagement at speed.",
    whatItDoes:
      "Locks the transmission into reverse idler gear, reversing the drive rotation of front wheels and illuminating rear white backup lights.",
    whyYouMustKnow:
      "Shifting into Reverse while the car is still creeping forward produces harsh gear grinding and damages transmission synchronizer rings.",
    instructorTip:
      "Always bring the vehicle to an absolute 100% complete stop. Press the Clutch pedal fully to the floor, pause 1 second, then slot into Reverse.",
    category: "GEARBOX",
    actionType: "gear",
  },

  // --- CHAPTER 4: ABC PEDALS ---
  "clutch-pedal": {
    id: "clutch-pedal",
    name: "Clutch Pedal [C] (Far Left)",
    tag: "POWER DISCONNECT",
    position3D: [0.24, 0.28, 0.65],
    shortDescription: "Operated EXCLUSIVELY by your LEFT foot. Disconnects engine from transmission.",
    whatItDoes:
      "Pushes the diaphragm release bearing against the spinning clutch pressure plate, freeing the transmission shaft so you can change gears or stop without stalling.",
    whyYouMustKnow:
      "Releasing the clutch abruptly stalls the engine. Resting your left foot on the pedal while driving ('riding the clutch') burns out the friction plate.",
    instructorTip:
      "Identify the 'Biting Point' (where the engine tone dips and the car begins to creep). Hold your left foot steady for 2 seconds before releasing completely.",
    category: "PEDALS",
    actionType: "pedal",
  },
  "brake-pedal": {
    id: "brake-pedal",
    name: "Brake Pedal [B] (Center)",
    tag: "HYDRAULIC STOPPING",
    position3D: [0.35, 0.28, 0.65],
    shortDescription: "Operated EXCLUSIVELY by your RIGHT foot. Clamps front discs & rear drums.",
    whatItDoes:
      "Pressurizes hydraulic brake fluid lines via the vacuum brake booster, clamping front caliper pads onto ventilated discs and illuminating bright rear brake lights.",
    whyYouMustKnow:
      "Progressive braking (gentle squeeze -> firm pressure -> smooth release before full stop) prevents passenger whiplash and stopping skids.",
    instructorTip:
      "Rest your right heel on the floor between the Brake and Accelerator. Pivot your foot on the heel; never lift your entire leg in the air.",
    category: "PEDALS",
    actionType: "pedal",
  },
  "accel-pedal": {
    id: "accel-pedal",
    name: "Accelerator Pedal [A] (Far Right)",
    tag: "THROTTLE & SPEED",
    position3D: [0.46, 0.28, 0.65],
    shortDescription: "Operated EXCLUSIVELY by your RIGHT foot. Regulates air-fuel throttle and RPM.",
    whatItDoes:
      "Communicates with the drive-by-wire Electronic Throttle Control (ETC) to open the throttle valve, feeding combustion air to accelerate smoothly.",
    whyYouMustKnow:
      "Heavy, jerky accelerator stomps waste fuel, spin tyres on wet asphalt, and make passenger travel uncomfortable.",
    instructorTip:
      "Treat the accelerator like there is an egg between the sole of your shoe and the pedal: squeeze gently, never stomp.",
    category: "PEDALS",
    actionType: "pedal",
  },

  // --- CHAPTER 5: HANDBRAKE ---
  "handbrake-lever": {
    id: "handbrake-lever",
    name: "Mechanical Parking Handbrake Lever",
    tag: "PARKING & HILL STARTS",
    position3D: [0.0, 0.38, 0.05],
    shortDescription: "Cable-operated ratchet locking rear brake drums independently of hydraulic lines.",
    whatItDoes:
      "Pulls high-tensile steel cables that mechanically wedge the rear drum shoes against the drums, securely immobilizing the car when parked or paused on slopes.",
    whyYouMustKnow:
      "Essential for hill starts! Holding the car on the handbrake on an incline prevents you from rolling backward into following vehicles when starting.",
    instructorTip:
      "To release: pull up slightly to take pressure off the pawl, press the thumb button firmly, and glide the lever all the way down to the floor.",
    category: "HANDBRAKE",
    actionType: "handbrake",
  },

  // --- CHAPTER 6: DASHBOARD CONTROLS ---
  "speedometer": {
    id: "speedometer",
    name: "Analog Speedometer & Digital Odometer",
    tag: "ROAD SPEED",
    position3D: [0.35, 0.95, 0.55],
    shortDescription: "Clear 0-180 km/h dial with digital trip meters and fuel economy readout.",
    whatItDoes:
      "Measures rotational speed of the front driveshafts to display precise current road speed in kilometers per hour (km/h).",
    whyYouMustKnow:
      "Scanning your speedometer ensures you obey city zone limits (30-40 km/h near schools, 50 km/h arterial roads) and avoid speeding fines.",
    instructorTip:
      "Take quick 1-second glances down at the dial, then return eyes immediately to the road. Never stare at the speedometer while driving.",
    category: "DASHBOARD",
    actionType: "light",
  },
  "fuel-indicator": {
    id: "fuel-indicator",
    name: "Digital Fuel Gauge & Low Fuel Warning",
    tag: "FUEL LEVEL",
    position3D: [0.42, 0.94, 0.55],
    shortDescription: "Bar graph display monitoring 32-litre fuel tank volume with amber warning lamp.",
    whatItDoes:
      "Float sensor in the fuel tank transmits resistance values to display remaining fuel bars and estimated driving range (Distance to Empty).",
    whyYouMustKnow:
      "Running on an almost empty tank causes the submerged electric fuel pump to overheat and sucks tank sediment into the fuel injectors.",
    instructorTip:
      "Refuel whenever your fuel gauge reaches 2 remaining bars or when the amber fuel icon illuminates.",
    category: "DASHBOARD",
  },
  "temp-warning": {
    id: "temp-warning",
    name: "Engine Coolant High-Temperature Warning",
    tag: "OVERHEAT ALERT",
    position3D: [0.28, 0.94, 0.55],
    shortDescription: "Red thermometer symbol indicating dangerous engine coolant overheating.",
    whatItDoes:
      "Monitors engine block coolant jacket temperatures. If coolant exceeds 108°C, the warning illuminates bright red.",
    whyYouMustKnow:
      "Continuing to drive with this red light on will warp the aluminium cylinder head and destroy engine gaskets within minutes.",
    instructorTip:
      "If this red light lights up: immediately pull over safely, turn off the engine, open the bonnet, and never open the radiator cap while hot.",
    category: "DASHBOARD",
  },
  "turn-indicators-dash": {
    id: "turn-indicators-dash",
    name: "Dashboard Amber Turn Blinkers",
    tag: "DIRECTION BLINKERS",
    position3D: [0.35, 0.98, 0.54],
    shortDescription: "Flashing green/amber arrows synchronised with exterior signal lamps.",
    whatItDoes:
      "Flashes at ~90 pulses per minute with an audible relay clicking sound when turn signals or hazard lights are engaged.",
    whyYouMustKnow:
      "If the blinker pulses twice as fast as normal ('rapid flash'), it alerts you that one of your exterior turn indicator bulbs has blown.",
    instructorTip:
      "Check your dashboard arrows to ensure your turn signal canceled after completing a gentle curve on the highway.",
    category: "DASHBOARD",
    actionType: "light",
  },
  "ignition-switch": {
    id: "ignition-switch",
    name: "Ignition Barrel & Key Cylinder",
    tag: "ENGINE START",
    position3D: [0.46, 0.82, 0.44],
    shortDescription: "4-position rotary lock switch: LOCK ➔ ACC ➔ ON ➔ START.",
    whatItDoes:
      "LOCK immobilizes steering; ACC powers audio/accessories; ON energizes fuel pump and ECU; START cranks the 12V starter motor to ignite the engine.",
    whyYouMustKnow:
      "Release the key immediately the instant the engine fires up. Holding the key in START while the engine is running damages the starter pinion gear.",
    instructorTip:
      "Before turning to START, confirm the gearbox is in Neutral, the handbrake is pulled up, and your foot is depressing the Clutch pedal.",
    category: "DASHBOARD",
    actionType: "ignition",
  },
  "hazard-switch": {
    id: "hazard-switch",
    name: "Center Dashboard Hazard Warning Switch",
    tag: "EMERGENCY BLINKERS",
    position3D: [0.0, 0.74, 0.58],
    shortDescription: "Prominent red triangle push-button activating all 4 turn signals simultaneously.",
    whatItDoes:
      "Bypasses turn signal stalk logic to flash front, side, and rear amber lights simultaneously to warn traffic of a stationary breakdown or hazard.",
    whyYouMustKnow:
      "Using hazard lights while driving through rain or fog is illegal in India! It confuses drivers behind you who cannot tell if you are turning.",
    instructorTip:
      "Only use hazard lights when your vehicle is completely stopped on the road due to an emergency, breakdown, or sudden obstacle ahead.",
    category: "DASHBOARD",
    actionType: "hazard",
  },
};

// ===========================================================================
// THE 6 CHOREOGRAPHED AUTOMOTIVE CHAPTERS (1 to 6)
// ===========================================================================
export const AUTOMOTIVE_CHAPTERS: ChapterConfig[] = [
  // =========================================================================
  // CHAPTER 1: DRIVER'S VIEW
  // =========================================================================
  {
    id: 1,
    chapterNumber: "CHAPTER 01",
    title: "DRIVER'S VIEW",
    subtitle: "First-Person Cockpit Perspective in the Maruti Suzuki WagonR",
    badge: "COCKPIT FOUNDATION",
    description:
      "Welcome inside your training vehicle. Sit in the authentic Indian Right-Hand-Drive (RHD) command seat. Look forward through the wide panoramic windscreen: the 3-spoke steering wheel is directly in front of you, the glowing instrument cluster behind it, the 5-speed gear console on your left, and the manual 3-pedal footwell below. Scroll to begin exploring each critical control.",
    cameraPosition: [0.35, 0.98, 0.12], // Driver's true eye point inside RHD cabin
    cameraTarget: [0.35, 0.72, 0.95],   // Looking forward through steering wheel & windscreen
    cameraFov: 42,
    steeringExplodeOffset: 0,
    steeringRotation: 0,
    gearPosition: "N",
    pedals: { clutch: false, brake: false, accel: false },
    handbrakeEngaged: true,
    dashboardActive: {
      speedometer: true,
      fuelGauge: true,
      tempWarning: false,
      turnLeft: false,
      turnRight: false,
      headlights: false,
      highBeam: false,
      wipers: false,
      horn: false,
      ignition: "ON",
      hazard: false,
    },
    calloutIds: ["rhd-cockpit", "high-windscreen"],
  },

  // =========================================================================
  // CHAPTER 2: STEERING WHEEL
  // =========================================================================
  {
    id: 2,
    chapterNumber: "CHAPTER 02",
    title: "STEERING WHEEL & AIRBAG",
    subtitle: "Directional Control, 9-and-3 Ergonomic Grip & Exploded Separation",
    badge: "PRIMARY CONTROL",
    description:
      "Your primary directional command. Observe as the steering wheel separates forward from the column along its mechanical axis. Notice the central SRS airbag pad, the dual-tone horn switches, the right-hand lighting stalk, and the left-hand wiper control. Practice turning left and right, and discover why the 9-and-3 grip gives you instant counter-steering agility.",
    cameraPosition: [0.35, 0.88, 0.38], // Close focus on steering wheel
    cameraTarget: [0.35, 0.65, 0.88],
    cameraFov: 38,
    steeringExplodeOffset: 0.85, // Separated forward along column axis
    steeringRotation: -0.42, // Steering angle rotation
    gearPosition: "N",
    pedals: { clutch: false, brake: false, accel: false },
    handbrakeEngaged: true,
    dashboardActive: {
      speedometer: true,
      fuelGauge: true,
      tempWarning: false,
      turnLeft: true,
      turnRight: false,
      headlights: true,
      highBeam: false,
      wipers: false,
      horn: true,
      ignition: "ON",
      hazard: false,
    },
    calloutIds: ["steering-wheel", "airbag-horn", "lighting-stalk", "wiper-stalk"],
  },

  // =========================================================================
  // CHAPTER 3: GEAR LEVER
  // =========================================================================
  {
    id: 3,
    chapterNumber: "CHAPTER 03",
    title: "5-SPEED MANUAL GEAR LEVER",
    subtitle: "H-Pattern Shifter, Speed Ranges & Reverse Safety Lockout",
    badge: "TRANSMISSION MASTERY",
    description:
      "The camera transitions down to the center console. The WagonR features an ergonomic floor-mounted 5-speed shifter with spring-loaded Neutral return. As you scroll, observe the stick move physically into each gear gate: 1st for standing starts, 2nd for tight 90° city turns, 3rd for responsive urban cruising, 4th for broad avenues, 5th for highway fuel economy, and Reverse with complete halt lockout.",
    cameraPosition: [0.18, 0.58, 0.28], // Over center console looking at gear lever
    cameraTarget: [0.0, 0.35, 0.38],
    cameraFov: 36,
    steeringExplodeOffset: 0, // Returned to column
    steeringRotation: 0,
    gearPosition: "1", // Animated to 1st gear
    pedals: { clutch: true, brake: false, accel: false }, // Clutch in for gear shift
    handbrakeEngaged: false,
    dashboardActive: {
      speedometer: true,
      fuelGauge: true,
      tempWarning: false,
      turnLeft: false,
      turnRight: false,
      headlights: false,
      highBeam: false,
      wipers: false,
      horn: false,
      ignition: "ON",
      hazard: false,
    },
    calloutIds: ["gear-lever", "reverse-lockout"],
  },

  // =========================================================================
  // CHAPTER 4: ABC PEDALS
  // =========================================================================
  {
    id: 4,
    chapterNumber: "CHAPTER 04",
    title: "ABC PEDAL ASSEMBLY",
    subtitle: "Accelerator, Brake & Clutch — Independent Mechanical Depression",
    badge: "FOOTWORK COORDINATION",
    description:
      "The camera pitches down into the driver's footwell to reveal the vital 3-pedal manual transmission layout: Clutch [C] on the left, Brake [B] in the center, and Accelerator [A] on the right. Watch each pedal depress along its realistic mechanical hinge arc. Learn how your left foot controls engine-flywheel disconnection while your right foot pivots smoothly between braking and throttle.",
    cameraPosition: [0.35, 0.38, 0.52], // Looking down into footwell
    cameraTarget: [0.35, 0.15, 0.82],
    cameraFov: 38,
    steeringExplodeOffset: 0,
    steeringRotation: 0,
    gearPosition: "2",
    pedals: { clutch: true, brake: true, accel: false }, // Demonstrating pedal operation
    handbrakeEngaged: false,
    dashboardActive: {
      speedometer: true,
      fuelGauge: true,
      tempWarning: false,
      turnLeft: false,
      turnRight: false,
      headlights: false,
      highBeam: false,
      wipers: false,
      horn: false,
      ignition: "ON",
      hazard: false,
    },
    calloutIds: ["clutch-pedal", "brake-pedal", "accel-pedal"],
  },

  // =========================================================================
  // CHAPTER 5: HANDBRAKE
  // =========================================================================
  {
    id: 5,
    chapterNumber: "CHAPTER 05",
    title: "MECHANICAL HANDBRAKE",
    subtitle: "Ratchet Lever Operation, Parking Safety & Incline Hill Starts",
    badge: "PARKING & GRADIENTS",
    description:
      "Isolating the parking brake between the front seats. Watch the lever lift smoothly, engaging mechanical tension cables that clamp the rear drum shoes to immobilize the vehicle. Master the thumb-button release technique, and understand why the handbrake is the secret to executing flawless, stress-free hill starts without rolling backward.",
    cameraPosition: [0.14, 0.48, 0.12], // Focus on handbrake lever
    cameraTarget: [0.0, 0.28, 0.08],
    cameraFov: 35,
    steeringExplodeOffset: 0,
    steeringRotation: 0,
    gearPosition: "N",
    pedals: { clutch: false, brake: false, accel: false },
    handbrakeEngaged: true, // Handbrake pulled up
    dashboardActive: {
      speedometer: false,
      fuelGauge: true,
      tempWarning: false,
      turnLeft: false,
      turnRight: false,
      headlights: false,
      highBeam: false,
      wipers: false,
      horn: false,
      ignition: "ON",
      hazard: false,
    },
    calloutIds: ["handbrake-lever"],
  },

  // =========================================================================
  // CHAPTER 6: DASHBOARD AND OTHER CONTROLS
  // =========================================================================
  {
    id: 6,
    chapterNumber: "CHAPTER 06",
    title: "DASHBOARD INSTRUMENTS & CONTROLS",
    subtitle: "Gauges, Warning Lamps, Stalk Controls, Ignition & Emergency Flashers",
    badge: "TELEMETRY & ALERTS",
    description:
      "The camera tilts back to frame the entire dashboard binnacle and center fascia. Every essential indicator and control is highlighted: the illuminated analog speedometer, digital fuel bar segments, red engine coolant overheat alert, dashboard turn arrows, rotary headlight switch, multi-speed wipers, ignition key cylinder, and emergency hazard flasher. You now have complete mastery over the WagonR cockpit.",
    cameraPosition: [0.35, 0.85, 0.24], // Wider cockpit frame showing binnacle & dashboard
    cameraTarget: [0.26, 0.64, 0.68],
    cameraFov: 44,
    steeringExplodeOffset: 0,
    steeringRotation: 0,
    gearPosition: "N",
    pedals: { clutch: false, brake: false, accel: false },
    handbrakeEngaged: true,
    dashboardActive: {
      speedometer: true,
      fuelGauge: true,
      tempWarning: true,
      turnLeft: true,
      turnRight: true,
      headlights: true,
      highBeam: false,
      wipers: true,
      horn: true,
      ignition: "START",
      hazard: true,
    },
    calloutIds: [
      "speedometer",
      "fuel-indicator",
      "temp-warning",
      "turn-indicators-dash",
      "ignition-switch",
      "hazard-switch",
    ],
  },
];
