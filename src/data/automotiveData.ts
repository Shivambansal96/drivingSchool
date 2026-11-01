import type { ComponentHotspot, StageConfig } from "../types/automotive";

export const AUTOMOTIVE_STAGES: StageConfig[] = [
  // =========================================================================
  // SCENE 01: MEET YOUR WAGONR
  // =========================================================================
  {
    stage: 1,
    stageNumber: "01 / 10",
    title: "MEET YOUR WAGONR",
    subtitle: "Step inside your first driving lesson. Examine India's most popular learning vehicle.",
    description:
      "A complete walkaround inspection is the first routine every disciplined driver performs. Familiarize yourself with the WagonR's iconic tall-boy proportions, high seating position, wide glasshouse, and clear 360° road visibility before ever turning the key.",
    photoUrl: "/images/wagonr/wagonr_front_exterior.jpg",
    photoCaption: "Maruti Suzuki WagonR - Iconic Tall-Boy Silhouette & Sculpted Chrome Front Fascia",
    cameraPosition: [3.8, 1.8, 4.4],
    cameraTarget: [0, 0.65, 0],
    carRotationY: -0.42,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: false,
    widgetType: "overview",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["headlights-ext", "mirrors-ext", "tyres-ext", "windshield-ext", "boot-ext", "indicators-ext"],
  },

  // =========================================================================
  // SCENE 02: OPEN THE BONNET (WHAT'S UNDER THE HOOD?)
  // =========================================================================
  {
    stage: 2,
    stageNumber: "02 / 10",
    title: "WHAT'S UNDER THE HOOD?",
    subtitle: "Essential engine bay components every driver must inspect before a journey.",
    description:
      "Disciplined drivers don't need to be mechanics, but understanding coolant levels, engine oil dipstick readings, battery terminals, and brake fluid reservoirs prevents highway breakdowns and ensures vehicle longevity.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    photoCaption: "WagonR 1.2L K-Series DualJet Engine Bay - Transverse Layout & Color-Coded Inspection Points",
    cameraPosition: [0.0, 2.05, 2.35],
    cameraTarget: [0, 0.72, 1.1],
    carRotationY: 0,
    bonnetAngle: 0.92, // Smooth open ~53°
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: false,
    widgetType: "engine",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["engine-block", "car-battery", "coolant-tank", "oil-dipstick", "air-filter", "radiator"],
  },

  // =========================================================================
  // SCENE 03: TYRES AND BRAKING
  // =========================================================================
  {
    stage: 3,
    stageNumber: "03 / 10",
    title: "TYRES AND BRAKING",
    subtitle: "Your direct connection to the road and your vehicle's stopping system.",
    description:
      "Explore an exploded view of your vehicle's front-right wheel and braking assembly. Learn how hydraulic fluid pressure clamps the floating brake caliper onto the ventilated steel disc, while coil-spring suspension absorbs road shocks.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    photoCaption: "WagonR Front Wheel Assembly - Ventilated Disc, Caliper Piston & MacPherson Strut",
    cameraPosition: [2.5, 0.7, 1.4],
    cameraTarget: [1.1, 0.42, 1.35],
    carRotationY: -0.25,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 1, // fully exploded
    cockpitMode: false,
    widgetType: "wheel",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["radial-tyre", "alloy-rim", "brake-disc", "brake-caliper", "suspension-strut"],
  },

  // =========================================================================
  // SCENE 04: ENTER THE DRIVER'S CABIN (RHD)
  // =========================================================================
  {
    stage: 4,
    stageNumber: "04 / 10",
    title: "ENTER THE DRIVER'S CABIN",
    subtitle: "The front-right driver door opens. Step inside the authentic Indian RHD interior.",
    description:
      "In India, driving is strictly Right-Hand Drive (RHD). As you open the driver's door and slide onto the high-command seat, note the ergonomic placement of the steering wheel on your right, center gear console, instrument binnacle, and three foot pedals.",
    photoUrl: "/images/wagonr/wagonr_cabin_rhd.jpg",
    photoCaption: "Authentic WagonR RHD Cockpit - Dual-Tone Dashboard, High Command Seating & Clear Lines",
    cameraPosition: [0.35, 1.05, 0.15], // Inside right driver seat
    cameraTarget: [0.35, 0.72, 0.95],   // Looking forward through windscreen & dashboard
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0.95, // Front-Right door open
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "cabin",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["steering-wheel", "instrument-cluster", "gear-shifter", "handbrake", "irvm-interior", "orvm-exterior"],
  },

  // =========================================================================
  // SCENE 05: LEARN THE STEERING WHEEL
  // =========================================================================
  {
    stage: 5,
    stageNumber: "05 / 10",
    title: "LEARN THE STEERING WHEEL",
    subtitle: "Master the 9-and-3 grip, turning geometry, and smooth steering return.",
    description:
      "Your primary directional command. Modern driving instructors emphasize the balanced '9 and 3 o'clock' hand position for maximum turning control and airbag safety. Practice rotating the wheel and observe how turn angles correspond to road turns.",
    photoUrl: "/images/wagonr/wagonr_steering_wheel.jpg",
    photoCaption: "WagonR 3-Spoke Urethane Steering Wheel - 9 & 3 Hand Grip Positions & Center SRS Airbag",
    cameraPosition: [0.35, 0.88, 0.44], // Focused close on steering wheel
    cameraTarget: [0.35, 0.58, 0.88],
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0.35,
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "steering",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["steering-wheel", "instrument-cluster", "airbags"],
  },

  // =========================================================================
  // SCENE 06: UNDERSTAND THE PEDALS (MANUAL TRANSMISSION)
  // =========================================================================
  {
    stage: 6,
    stageNumber: "06 / 10",
    title: "UNDERSTAND THE PEDALS",
    subtitle: "Manual Footwell Layout (Left to Right): Clutch, Brake, Accelerator.",
    description:
      "The foundation of manual driving. Remember the golden rule: Left foot operates ONLY the Clutch. Right foot pivots between Brake (center) and Accelerator (right). Never press the accelerator and brake simultaneously with one foot.",
    photoUrl: "/images/wagonr/wagonr_pedals_abc.jpg",
    photoCaption: "WagonR Manual Transmission 3-Pedal Footwell - Clutch (Left), Brake (Center), Accelerator (Right)",
    cameraPosition: [0.35, 0.42, 0.52], // Camera looking straight down into footwell
    cameraTarget: [0.35, 0.15, 0.85],
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0.25,
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "pedals",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["clutch-pedal", "brake-pedal", "accel-pedal"],
  },

  // =========================================================================
  // SCENE 07: LEARN THE GEAR LEVER
  // =========================================================================
  {
    stage: 7,
    stageNumber: "07 / 10",
    title: "LEARN THE GEAR LEVER",
    subtitle: "Maruti Suzuki WagonR 5-Speed Manual Transmission H-Pattern.",
    description:
      "A manual gearbox matches engine torque to road speed. The WagonR features an ergonomic floor-mounted 5-speed shifter with spring-loaded Neutral return. Gear changes always require pressing the Clutch pedal fully to the floor.",
    photoUrl: "/images/wagonr/wagonr_gear_shifter.jpg",
    photoCaption: "WagonR 5-Speed Manual Gear Stick - Etched H-Gate Shift Pattern & Leatherette Boot",
    cameraPosition: [0.18, 0.62, 0.22], // Angled close over gear shifter & handbrake
    cameraTarget: [0.0, 0.32, 0.42],
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "gear",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["gear-shifter", "handbrake"],
  },

  // =========================================================================
  // SCENE 08: INDICATORS, LIGHTS AND MIRRORS
  // =========================================================================
  {
    stage: 8,
    stageNumber: "08 / 10",
    title: "INDICATORS, LIGHTS AND MIRRORS",
    subtitle: "Right-hand column stalks and 3-mirror awareness eliminate driving blind spots.",
    description:
      "In Indian RHD cars, the right-hand steering stalk controls turn indicators and headlights. Pair your signalling with the MSM (Mirror - Signal - Maneuver) routine to ensure every lane change and turn is safe for all road users.",
    photoUrl: "/images/wagonr/wagonr_lighting_stalk.jpg",
    photoCaption: "WagonR Right-Hand Steering Column Multi-Function Stalk - Rotary Headlight & Blinkers",
    cameraPosition: [0.42, 0.82, 0.38],
    cameraTarget: [0.32, 0.65, 0.68],
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "lights",
    activeLights: {
      headlights: true,
      leftIndicator: false,
      rightIndicator: true,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["indicator-stalk", "headlights-ext", "mirrors-ext", "irvm-interior", "orvm-exterior"],
  },

  // =========================================================================
  // SCENE 09: THE COMPLETE DRIVING POSITION
  // =========================================================================
  {
    stage: 9,
    stageNumber: "09 / 10",
    title: "THE COMPLETE DRIVING POSITION",
    subtitle: "Complete your essential 'BEFORE YOU START THE ENGINE' 6-step cockpit checklist.",
    description:
      "Professional drivers never turn the ignition until their posture, mirrors, controls, and seatbelt are verified. Complete this interactive checklist to confirm you're in the optimal position for relaxed, alert, and safe vehicle control.",
    photoUrl: "/images/wagonr/wagonr_driving_position.jpg",
    photoCaption: "Driver's Eye View - Optimum Horizon Alignment, Clear Windshield & Secure Seatbelt",
    cameraPosition: [0.35, 1.08, 0.08], // Driver's true eye line
    cameraTarget: [0.35, 0.82, 1.2],
    carRotationY: 0,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: true,
    widgetType: "checklist",
    activeLights: {
      headlights: false,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["seatbelts", "steering-wheel", "instrument-cluster", "orvm-exterior", "irvm-interior"],
  },

  // =========================================================================
  // SCENE 10: READY FOR YOUR FIRST DRIVE
  // =========================================================================
  {
    stage: 10,
    stageNumber: "10 / 10",
    title: "READY FOR YOUR FIRST DRIVE",
    subtitle: "NOW YOU KNOW YOUR CAR. LET'S LEARN TO DRIVE IT.",
    description:
      "Congratulations! You have completed the comprehensive visual tour of the Maruti Suzuki WagonR. You understand the engine bay, the braking mechanics, the manual foot pedals, and the essential cabin controls. Now take the next step and get behind the wheel with Ghosh Motor Training School's certified instructors.",
    photoUrl: "/images/wagonr/wagonr_complete_car.jpg",
    photoCaption: "Maruti Suzuki WagonR Training Vehicle - Dual Controls Fitted & Ready for Lessons",
    cameraPosition: [4.2, 1.6, 4.6], // Pull back to studio hero angle
    cameraTarget: [0, 0.65, 0],
    carRotationY: -0.38,
    bonnetAngle: 0,
    driverDoorAngle: 0,
    wheelExplodeOffset: 0,
    cockpitMode: false,
    widgetType: "cta",
    activeLights: {
      headlights: true,
      leftIndicator: false,
      rightIndicator: false,
      hazard: false,
      brakeLights: false,
    },
    hotspotIds: ["headlights-ext", "mirrors-ext", "tyres-ext", "boot-ext"],
  },
];

// ===========================================================================
// COMPONENT HOTSPOTS DICTIONARY (22 Verified Educational Components)
// ===========================================================================
export const COMPONENT_HOTSPOTS: Record<string, ComponentHotspot> = {
  // --- EXTERIOR (Scene 01 & 10) ---
  "headlights-ext": {
    id: "headlights-ext",
    name: "Halogen Headlamps & Turn Indicators",
    stage: 1,
    category: "SAFETY & SIGNALLING",
    position3D: [0.72, 0.72, 1.82],
    shortDescription: "High-visibility swept-back headlamps for clear nighttime road illumination.",
    whatItDoes:
      "Casts low beam (~30-40 meters) for city driving and high beam (~100 meters) for unlit highways. Also houses front amber turn blinkers.",
    whyYouMustKnow:
      "Night collisions are 3x more common. Driving on low beam in city traffic prevents blinding oncoming motorists and auto-rickshaws.",
    driverTip:
      "Always dip to low beam when you see an approaching vehicle within 200 meters or when following another car closely.",
    photoUrl: "/images/wagonr/wagonr_front_exterior.jpg",
    actionType: "light",
  },
  "mirrors-ext": {
    id: "mirrors-ext",
    name: "Electrically Adjustable ORVMs",
    stage: 1,
    category: "SAFETY & SIGNALLING",
    position3D: [0.94, 0.95, 0.68],
    shortDescription: "Outside Rear View Mirrors give you vital awareness of overtaking traffic.",
    whatItDoes:
      "Provides wide-angle visibility along both sides of the vehicle to monitor motorcycles, bicycles, and cars in adjacent lanes.",
    whyYouMustKnow:
      "Failing to check ORVMs before turning or merging is the #1 cause of side-swipe accidents in busy Indian city traffic.",
    driverTip:
      "Adjust so only a tiny sliver of your car's rear door handle is visible. The remaining 90% should reveal the road and blind spot.",
    photoUrl: "/images/wagonr/wagonr_front_exterior.jpg",
    actionType: "mirror",
  },
  "tyres-ext": {
    id: "tyres-ext",
    name: "165/70 R14 Steel Radial Tyres",
    stage: 1,
    category: "CHASSIS & BRAKING",
    position3D: [0.88, 0.38, 1.15],
    shortDescription: "Tubeless radial tyres designed for dependable wet & dry Indian road grip.",
    whatItDoes:
      "Provides traction for acceleration, directional steering, and stopping force while supporting the entire car's weight.",
    whyYouMustKnow:
      "Under-inflated tyres increase braking distance by up to 20% and cause catastrophic highway tyre bursts in hot summer weather.",
    driverTip:
      "Inspect tyre pressure weekly while tyres are cold. Standard WagonR recommendation is 33 PSI front, 30 PSI rear.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },
  "windshield-ext": {
    id: "windshield-ext",
    name: "Laminated High-Visibility Windscreen",
    stage: 1,
    category: "EXTERIOR",
    position3D: [0, 1.12, 0.62],
    shortDescription: "Shatterproof curved laminated glass offering panoramic forward visibility.",
    whatItDoes:
      "Shields occupants from wind, debris, and rain while providing the driver with an unobstructed view of the road ahead.",
    whyYouMustKnow:
      "A dirty or smeared windscreen produces dangerous blinding glare during nighttime driving when struck by oncoming headlights.",
    driverTip:
      "Keep wiper washer fluid topped up with a mild automotive glass cleaning solution. Replace wiper blades annually before the monsoon.",
    photoUrl: "/images/wagonr/wagonr_front_exterior.jpg",
  },
  "boot-ext": {
    id: "boot-ext",
    name: "341-Litre Luggage Boot Space",
    stage: 1,
    category: "EXTERIOR",
    position3D: [0, 0.78, -1.88],
    shortDescription: "Class-leading rear luggage compartment with deep load floor.",
    whatItDoes:
      "Houses baggage, the spare wheel, mechanical scissor jack, and wheel-nut wrench required for roadside emergency tyre changes.",
    whyYouMustKnow:
      "Every candidate must know where the emergency jack and spare wheel are located before undertaking the official RTO driving test.",
    driverTip:
      "Always verify the spare wheel has correct air pressure (36 PSI) so it's ready if you suffer a puncture on the road.",
    photoUrl: "/images/wagonr/wagonr_complete_car.jpg",
  },
  "indicators-ext": {
    id: "indicators-ext",
    name: "Amber Turn Signal Indicators",
    stage: 1,
    category: "SAFETY & SIGNALLING",
    position3D: [-0.72, 0.72, 1.82],
    shortDescription: "Front, side, and rear flashers that communicate your driving intent.",
    whatItDoes:
      "Flashes bright amber at ~90 pulses per minute to signal turns, lane changes, or roadside emergency stops (hazard mode).",
    whyYouMustKnow:
      "Signalling early gives other road users 3-5 seconds of reaction time, preventing rear-end and T-bone collisions.",
    driverTip:
      "Signal at least 30 meters before initiating a turn, not while you are already turning the steering wheel.",
    photoUrl: "/images/wagonr/wagonr_lighting_stalk.jpg",
    actionType: "light",
  },

  // --- ENGINE BAY (Scene 02) ---
  "engine-block": {
    id: "engine-block",
    name: "1.2L K-Series DualJet Petrol Engine",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [-0.08, 0.72, 1.25],
    shortDescription: "4-cylinder 1197cc fuel-efficient powerplant delivering 89 BHP.",
    whatItDoes:
      "Converts petrol combustion into rotational mechanical energy that drives the front wheels via the 5-speed manual transmission.",
    whyYouMustKnow:
      "Understanding engine RPM and smooth throttle input prevents stalling the car when starting from a dead stop in 1st gear.",
    driverTip:
      "Never rev a cold engine immediately after starting. Allow 15-30 seconds of idle for engine oil to circulate through all bearings.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },
  "car-battery": {
    id: "car-battery",
    name: "12V 35Ah Maintenance-Free Lead-Acid Battery",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [-0.52, 0.75, 1.4],
    shortDescription: "Supplies high-crank amperage to start the engine and power cabin electronics.",
    whatItDoes:
      "Stores 12 volts of direct electrical current to power the starter motor, fuel pump, ignition coils, lights, and wipers.",
    whyYouMustKnow:
      "Leaving headlights or cabin lights on with the engine off will drain the battery within hours, stranding your car.",
    driverTip:
      "Inspect terminals for white powdery corrosion. Clean with warm water and petroleum jelly to maintain solid electrical conductivity.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },
  "coolant-tank": {
    id: "coolant-tank",
    name: "Engine Coolant Expansion Reservoir",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [0.55, 0.72, 1.35],
    shortDescription: "Ethylene-glycol coolant reservoir that prevents engine overheating.",
    whatItDoes:
      "Circulates through the engine water jackets and radiator to dissipate combustion heat and prevent catastrophic overheating.",
    whyYouMustKnow:
      "Driving without coolant will cause the engine cylinder head to warp and seize within minutes, resulting in engine failure.",
    driverTip:
      "NEVER open the radiator cap when the engine is hot! Scalding pressurized steam will spray out and cause severe burn injuries.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },
  "oil-dipstick": {
    id: "oil-dipstick",
    name: "Engine Oil Dipstick & Level Gauge",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [0.15, 0.76, 1.45],
    shortDescription: "Bright yellow pull-ring to inspect engine lubricating oil level and health.",
    whatItDoes:
      "Measures the exact volume and color of lubricating oil in the engine sump via two marked dots (Minimum and Maximum).",
    whyYouMustKnow:
      "Low oil causes metal-to-metal friction, severe component wear, and complete engine seizure. Check before long road trips.",
    driverTip:
      "Park on level ground with a cool engine. Pull dipstick, wipe clean with a rag, reinsert fully, and pull again to read the meniscus.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },
  "air-filter": {
    id: "air-filter",
    name: "Engine Intake Air Filter Box",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [-0.45, 0.75, 1.05],
    shortDescription: "High-density pleated paper element trapping dust and airborne particles.",
    whatItDoes:
      "Ensures only clean, debris-free air reaches the throttle body and combustion chambers for optimal air-fuel mixing.",
    whyYouMustKnow:
      "A dust-choked air filter starves the engine of oxygen, reducing fuel mileage by up to 15% and causing sluggish acceleration.",
    driverTip:
      "Inspect every 5,000 km in dusty Indian city conditions. Replace immediately if pleats appear blackened or clogged.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },
  "radiator": {
    id: "radiator",
    name: "Front Radiator & Electric Cooling Fan",
    stage: 2,
    category: "POWERTRAIN",
    position3D: [0, 0.65, 1.75],
    shortDescription: "Aluminium heat exchanger cooled by ram-air and thermostatic fan.",
    whatItDoes:
      "Cools hot engine coolant as it flows through thin aluminium micro-fins before cycling back through the engine block.",
    whyYouMustKnow:
      "Road debris, poly-bags, or mud blocking the radiator fins will cause the temperature gauge needle to spike into the red danger zone.",
    driverTip:
      "If the engine temperature warning illuminates, safely pull over immediately, turn off the engine, and allow it to cool down.",
    photoUrl: "/images/wagonr/wagonr_engine_bay.jpg",
    actionType: "bonnet",
  },

  // --- WHEEL & BRAKES (Scene 03) ---
  "radial-tyre": {
    id: "radial-tyre",
    name: "Steel-Belted Radial Tyre Tread",
    stage: 3,
    category: "CHASSIS & BRAKING",
    position3D: [1.2, 0.38, 1.15],
    shortDescription: "Deep circumferential tread grooves channel water away to prevent aquaplaning.",
    whatItDoes:
      "Delivers longitudinal grip for accelerating and braking, and lateral grip to keep the vehicle stable during cornering.",
    whyYouMustKnow:
      "Worn tyres with less than 2mm tread depth lose grip exponentially on wet monsoon asphalt, leading to uncontrollable skids.",
    driverTip:
      "Check the built-in Tread Wear Indicator (TWI) bars inside the main grooves. When flush with the tread, replace the tyre.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },
  "alloy-rim": {
    id: "alloy-rim",
    name: "14-Inch High-Strength Steel Wheel Rim",
    stage: 3,
    category: "CHASSIS & BRAKING",
    position3D: [1.12, 0.38, 1.15],
    shortDescription: "Reinforced steel wheel with 4 high-tensile retaining lug nuts.",
    whatItDoes:
      "Securely holds the tyre bead under pressure and bolts directly to the rotating wheel hub flange.",
    whyYouMustKnow:
      "Loose lug nuts cause wheel wobble and can cause a wheel to detach at speed. Always tighten in a diagonal cross-star pattern.",
    driverTip:
      "Torque lug nuts to 85-100 Nm. Re-check lug tightness 50 km after replacing a punctured wheel.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },
  "brake-disc": {
    id: "brake-disc",
    name: "Ventilated Cast-Iron Brake Rotor",
    stage: 3,
    category: "CHASSIS & BRAKING",
    position3D: [0.98, 0.38, 1.15],
    shortDescription: "Spinning steel rotor that converts vehicle kinetic energy into thermal heat.",
    whatItDoes:
      "Rotates synchronously with the front wheel. When the brake pedal is depressed, high-friction pads squeeze against both rotor faces.",
    whyYouMustKnow:
      "Brakes become extremely hot during repeated downhill braking. Prolonged light dragging causes 'brake fade' where stopping power drops.",
    driverTip:
      "On steep downhill roads, use engine braking (2nd or 3rd gear) instead of riding the brake pedal continuously.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },
  "brake-caliper": {
    id: "brake-caliper",
    name: "Floating Single-Piston Hydraulic Caliper",
    stage: 3,
    category: "CHASSIS & BRAKING",
    position3D: [0.92, 0.44, 1.15],
    shortDescription: "Hydraulic clamp housing ceramic-metallic brake friction pads.",
    whatItDoes:
      "Multiplies foot effort via hydraulic brake fluid (DOT 4) pressure to clamp the brake pads tightly onto the spinning rotor.",
    whyYouMustKnow:
      "If you hear a high-pitched metallic screeching sound when braking, your brake pads are worn down to their wear sensors.",
    driverTip:
      "If the brake pedal feels spongy or sinks to the floor, pull over immediately. It indicates air in brake lines or a fluid leak.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },
  "suspension-strut": {
    id: "suspension-strut",
    name: "MacPherson Strut with Helical Coil Spring",
    stage: 3,
    category: "CHASSIS & BRAKING",
    position3D: [0.82, 0.58, 1.15],
    shortDescription: "Independent front suspension soaking up potholes and stabilizing the body.",
    whatItDoes:
      "Absorbs road impacts, keeps tyre contact patch flat against the tarmac, and minimizes body roll during tight cornering.",
    whyYouMustKnow:
      "Worn shock absorbers cause excessive bouncing, nose-diving under braking, and increase stopping distances on rough roads.",
    driverTip:
      "Slow down before potholes and speed-breakers, but release the brake pedal just as your tyres roll over to protect suspension dampers.",
    photoUrl: "/images/wagonr/wagonr_wheel_brake.jpg",
    actionType: "wheel",
  },

  // --- CABIN & DRIVER CONTROLS (Scenes 04, 05, 06, 07, 08, 09) ---
  "steering-wheel": {
    id: "steering-wheel",
    name: "Rack & Pinion Power Steering Wheel",
    stage: 5,
    category: "DRIVER CONTROLS",
    position3D: [0.35, 0.88, 0.44],
    shortDescription: "Right-hand-drive electric power steering wheel with SRS airbag.",
    whatItDoes:
      "Translates rotational hand input through the steering rack to swivel the front wheels left or right with electrical assist.",
    whyYouMustKnow:
      "Holding the wheel correctly at '9 and 3' allows you to turn up to 180° without removing either hand, giving instant reaction agility.",
    driverTip:
      "Never turn the steering wheel while the car is completely stationary ('dry steering'). Roll forward slightly to preserve tyre tread and steering rack joints.",
    photoUrl: "/images/wagonr/wagonr_steering_wheel.jpg",
    actionType: "steering",
  },
  "instrument-cluster": {
    id: "instrument-cluster",
    name: "Backlit Instrument Cluster & Speedometer",
    stage: 5,
    category: "DRIVER CONTROLS",
    position3D: [0.35, 0.95, 0.55],
    shortDescription: "Large analog speedometer, digital fuel gauge, and critical warning lamps.",
    whatItDoes:
      "Continuously displays vehicle speed (km/h), engine temperature, fuel level, odometer, and warning lights (battery, oil, check engine, handbrake).",
    whyYouMustKnow:
      "If a RED warning light (e.g. oil pressure or brake fluid) illuminates while driving, you must stop the vehicle immediately.",
    driverTip:
      "Scan the instrument cluster every 10-15 seconds with a brief glance, never staring down and taking your eyes off the road.",
    photoUrl: "/images/wagonr/wagonr_cabin_rhd.jpg",
  },
  "clutch-pedal": {
    id: "clutch-pedal",
    name: "Clutch Pedal [C] (Far Left)",
    stage: 6,
    category: "DRIVER CONTROLS",
    position3D: [0.24, 0.28, 0.65],
    shortDescription: "Operated exclusively by your LEFT foot. Disconnects engine power for gear shifts.",
    whatItDoes:
      "Disengages the clutch friction plate from the flywheel, interrupting torque to the gearbox so you can change gears or stop without stalling.",
    whyYouMustKnow:
      "Releasing the clutch too quickly will stall the engine. Resting your left foot on the pedal ('riding the clutch') burns out the clutch plate in months.",
    driverTip:
      "Find the 'Biting Point' (where the car begins to creep forward) and hold your foot steady for 2 seconds before smoothly releasing it completely.",
    photoUrl: "/images/wagonr/wagonr_pedals_abc.jpg",
    actionType: "pedal",
  },
  "brake-pedal": {
    id: "brake-pedal",
    name: "Brake Pedal [B] (Center)",
    stage: 6,
    category: "DRIVER CONTROLS",
    position3D: [0.35, 0.28, 0.65],
    shortDescription: "Operated exclusively by your RIGHT foot. Activates 4-wheel hydraulic braking.",
    whatItDoes:
      "Controls master cylinder hydraulic pressure to slow or stop the vehicle proportionally to the pressure applied by your foot.",
    whyYouMustKnow:
      "Progressive braking (light press - firm press - smooth release) prevents passengers from lurching forward and stops rear-end collisions.",
    driverTip:
      "In an emergency with ABS, press the brake pedal down with MAXIMUM force. Do not pump the pedal; let the ABS computer pulse for you.",
    photoUrl: "/images/wagonr/wagonr_pedals_abc.jpg",
    actionType: "pedal",
  },
  "accel-pedal": {
    id: "accel-pedal",
    name: "Accelerator Pedal [A] (Far Right)",
    stage: 6,
    category: "DRIVER CONTROLS",
    position3D: [0.46, 0.28, 0.65],
    shortDescription: "Operated exclusively by your RIGHT foot. Controls engine throttle and vehicle speed.",
    whatItDoes:
      "Opens the electronic throttle body valve, feeding air and fuel into the cylinders to increase engine RPM and vehicle road speed.",
    whyYouMustKnow:
      "Gentle, progressive accelerator inputs deliver maximum fuel economy, smooth passenger comfort, and prevent wheel spin on slippery roads.",
    driverTip:
      "Pivot your right heel on the floor between the brake and accelerator. Never lift your entire leg to switch between pedals.",
    photoUrl: "/images/wagonr/wagonr_pedals_abc.jpg",
    actionType: "pedal",
  },
  "gear-shifter": {
    id: "gear-shifter",
    name: "5-Speed + Reverse Manual Gear Shifter",
    stage: 7,
    category: "DRIVER CONTROLS",
    position3D: [0.0, 0.42, 0.32],
    shortDescription: "H-pattern floor-mounted stick selector matching engine torque to speed.",
    whatItDoes:
      "Selects gear ratios: 1st (0-15 km/h), 2nd (15-30 km/h), 3rd (30-45 km/h), 4th (45-60 km/h), 5th (60+ km/h cruising), and Reverse (R).",
    whyYouMustKnow:
      "Selecting the wrong gear (e.g. 1st instead of 3rd at high speed) causes extreme engine over-revving and potential gearbox destruction.",
    driverTip:
      "Guide the lever gently with an open palm. The spring naturally centers the lever between 3rd and 4th gear when in Neutral.",
    photoUrl: "/images/wagonr/wagonr_gear_shifter.jpg",
    actionType: "gear",
  },
  "handbrake": {
    id: "handbrake",
    name: "Mechanical Parking Handbrake Lever",
    stage: 7,
    category: "DRIVER CONTROLS",
    position3D: [0.0, 0.38, 0.05],
    shortDescription: "Cable-operated ratchet locking rear brake drums when parked.",
    whatItDoes:
      "Pulls high-tension steel cables that mechanically force the rear drum brake shoes against the drums, immobilizing the vehicle when parked.",
    whyYouMustKnow:
      "Essential for hill starts! Holding the car on the handbrake on an incline prevents rolling backward into the car behind you.",
    driverTip:
      "To release: pull up slightly, press the thumb button fully, and push the lever down to the floor until the dash handbrake light turns off.",
    photoUrl: "/images/wagonr/wagonr_gear_shifter.jpg",
  },
  "indicator-stalk": {
    id: "indicator-stalk",
    name: "Right-Hand Steering Column Multi-Stalk",
    stage: 8,
    category: "DRIVER CONTROLS",
    position3D: [0.48, 0.88, 0.42],
    shortDescription: "In Indian RHD cars: Up for Left Turn, Down for Right Turn, Rotary for Lights.",
    whatItDoes:
      "Operates turn signals, headlights (parking, low beam, high beam), and high-beam flasher without removing your hands from the wheel.",
    whyYouMustKnow:
      "Turning without indicating is an illegal traffic offence and the primary cause of urban two-wheeler collisions.",
    driverTip:
      "Push DOWN for Right Turn. Push UP for Left Turn. The stalk automatically clicks back to neutral after completing the turn.",
    photoUrl: "/images/wagonr/wagonr_lighting_stalk.jpg",
    actionType: "light",
  },
  "irvm-interior": {
    id: "irvm-interior",
    name: "Day / Night Inside Rear-View Mirror (IRVM)",
    stage: 8,
    category: "SAFETY & SIGNALLING",
    position3D: [0, 1.25, 0.35],
    shortDescription: "Center windscreen mirror framing the entire rear glass window.",
    whatItDoes:
      "Provides direct rearward visibility of vehicles following directly behind you without lateral blind spots.",
    whyYouMustKnow:
      "Always glance at your IRVM BEFORE braking firmly. Knowing if a heavy truck is tailgating you allows you to adjust braking distance.",
    driverTip:
      "At night, flip the small bottom toggle tab toward you. It engages the anti-glare prism, deflecting blinding high-beams behind you.",
    photoUrl: "/images/wagonr/wagonr_driving_position.jpg",
    actionType: "mirror",
  },
  "orvm-exterior": {
    id: "orvm-exterior",
    name: "Right-Hand Driver's Side ORVM",
    stage: 8,
    category: "SAFETY & SIGNALLING",
    position3D: [0.94, 0.95, 0.68],
    shortDescription: "Door-mounted side mirror covering the immediate right overtaking blind spot.",
    whatItDoes:
      "Reveals fast-moving vehicles in your right blind spot before you merge, overtake, or turn into side streets.",
    whyYouMustKnow:
      "Adjusting this mirror incorrectly creates a huge dangerous blind spot where a motorcycle or car can disappear entirely.",
    driverTip:
      "Keep the horizon line in the middle of the mirror. Your car body should occupy only the innermost 10% of the glass.",
    photoUrl: "/images/wagonr/wagonr_driving_position.jpg",
    actionType: "mirror",
  },
  "seatbelts": {
    id: "seatbelts",
    name: "3-Point ELR Seatbelt with Pre-tensioner",
    stage: 9,
    category: "SAFETY & SIGNALLING",
    position3D: [0.55, 0.92, -0.15],
    shortDescription: "Primary life-saving passenger restraint with emergency locking retractor.",
    whatItDoes:
      "Restrains the driver securely against the seatback in sudden deceleration, preventing impact with the steering wheel and windshield.",
    whyYouMustKnow:
      "Without a fastened seatbelt, the rapid inflation of the SRS steering airbag during a crash can cause fatal neck injuries.",
    driverTip:
      "Ensure the lap belt rests flat across your pelvic hip bones, not soft stomach tissue. Listen for the distinct metallic 'CLICK'.",
    photoUrl: "/images/wagonr/wagonr_driving_position.jpg",
    actionType: "checklist",
  },
  "airbags": {
    id: "airbags",
    name: "Dual Front SRS Airbag Module",
    stage: 5,
    category: "SAFETY & SIGNALLING",
    position3D: [0.35, 0.88, 0.42],
    shortDescription: "Driver steering boss pyrotechnic cushion deploying within 30 milliseconds.",
    whatItDoes:
      "Inflates instantly upon severe frontal impact to cushion the driver's head and chest from striking rigid vehicle components.",
    whyYouMustKnow:
      "Airbags are supplementary restraints. They ONLY work safely when occupants are wearing their 3-point seatbelts.",
    driverTip:
      "Never place phone mounts, decorative idols, or stickers on the center steering pad. In a crash, they become dangerous projectiles.",
    photoUrl: "/images/wagonr/wagonr_steering_wheel.jpg",
  },
};

// ===========================================================================
// PRE-DRIVE 6-STEP CHECKLIST (Scene 09 Curriculum)
// ===========================================================================
export interface PreDriveChecklistItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export const PRE_DRIVE_CHECKLIST: PreDriveChecklistItem[] = [
  {
    id: "seat-adjustment",
    number: "01",
    title: "Adjust Driver Seat & Backrest",
    description: "Slide seat so your left knee remains slightly bent with Clutch fully depressed to floor. Backrest upright for lumbar support.",
    iconName: "UserCheck",
  },
  {
    id: "mirrors-setup",
    number: "02",
    title: "Align All 3 Mirrors (IRVM + Both ORVMs)",
    description: "Center IRVM frames rear windscreen. ORVMs show 10% car body and 90% road with horizon centered.",
    iconName: "Maximize2",
  },
  {
    id: "seatbelt-fastened",
    number: "03",
    title: "Fasten 3-Point Seatbelt (Listen for Click)",
    description: "Pull webbing smoothly across chest and hips. Confirm tongue locks securely into red buckle release.",
    iconName: "ShieldCheck",
  },
  {
    id: "neutral-handbrake",
    number: "04",
    title: "Verify Neutral Gear & Handbrake Engaged",
    description: "Wiggle gear stick left-to-right to confirm spring-loaded Neutral position. Handbrake lever pulled firmly up.",
    iconName: "CheckCircle2",
  },
  {
    id: "depress-clutch",
    number: "05",
    title: "Fully Depress Clutch & Foot Brake",
    description: "Always start the engine with left foot on Clutch and right foot on Brake to eliminate accidental lurch.",
    iconName: "Footprints",
  },
  {
    id: "surrounding-scan",
    number: "06",
    title: "Check Surroundings & Blind Spots",
    description: "Scan front, side windows, mirrors, and glance over right shoulder before disengaging handbrake to roll out.",
    iconName: "Eye",
  },
];
