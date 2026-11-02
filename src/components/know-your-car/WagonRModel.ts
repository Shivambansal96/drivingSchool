import * as THREE from "three";
import type { GearPosition } from "../../types/automotive";

export interface WagonRCarModel {
  root: THREE.Group;
  bonnetPivot: THREE.Group;
  driverDoorPivot: THREE.Group;
  explodedWheel: {
    group: THREE.Group;
    strut: THREE.Group;
    caliper: THREE.Group;
    disc: THREE.Group;
    rim: THREE.Group;
    tyre: THREE.Group;
    guideLines: THREE.LineSegments;
  };
  cockpit: {
    group: THREE.Group;
    steeringWheel: THREE.Group;
    steeringColumn: THREE.Group;
    steeringGuideLines: THREE.LineSegments;
    clutchPedal: THREE.Group;
    brakePedal: THREE.Group;
    accelPedal: THREE.Group;
    gearLever: THREE.Group;
    handbrake: THREE.Group;
    hazardButton: THREE.Mesh;
    ignitionSwitch: THREE.Group;
    turnSignalL: THREE.Mesh;
    turnSignalR: THREE.Mesh;
    tempWarningIcon: THREE.Mesh;
    speedometerNeedle: THREE.Mesh;
  };
  engineBay: {
    group: THREE.Group;
    engineBlock: THREE.Mesh;
    battery: THREE.Group;
    coolantTank: THREE.Mesh;
    oilDipstick: THREE.Group;
    airFilter: THREE.Mesh;
    radiator: THREE.Group;
  };
  lights: {
    headlightMeshes: THREE.Mesh[];
    headlightSpots: THREE.SpotLight[];
    leftIndicatorMeshes: THREE.Mesh[];
    rightIndicatorMeshes: THREE.Mesh[];
    brakeLightMeshes: THREE.Mesh[];
    underglowLight: THREE.PointLight;
  };
  materials: {
    bodyMaterial: THREE.MeshStandardMaterial;
    bodyRoofMaterial: THREE.MeshStandardMaterial;
    glassMaterial: THREE.MeshStandardMaterial;
    trimMaterial: THREE.MeshStandardMaterial;
    chromeMaterial: THREE.MeshStandardMaterial;
    glowYellow: THREE.MeshBasicMaterial;
    glowAmber: THREE.MeshBasicMaterial;
    glowRed: THREE.MeshBasicMaterial;
  };
  wheels: THREE.Group[];
  updateAnimation: (options: {
    bonnetAngle?: number;
    driverDoorAngle?: number;
    wheelExplodeOffset?: number;
    steeringExplodeOffset?: number;
    steeringAngle?: number;
    gearPosition?: GearPosition;
    pedals: { clutch: boolean; brake: boolean; accel: boolean };
    handbrakeEngaged?: boolean;
    lights: {
      headlights: boolean;
      leftIndicator: boolean;
      rightIndicator: boolean;
      hazard: boolean;
      brakeLights: boolean;
    };
    dashboard?: {
      tempWarning?: boolean;
      hazard?: boolean;
      speed?: number;
    };
    time: number;
    delta: number;
    speed?: number;
  }) => void;
  highlightComponent: (componentId: string | null) => void;
}

export function createWagonRModel(): WagonRCarModel {
  const root = new THREE.Group();
  root.name = "WagonR_CarRoot";

  // ==========================================
  // SHARED PBR MATERIALS
  // ==========================================
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#FFE500"), // Iconic Electric Yellow
    metalness: 0.65,
    roughness: 0.22,
  });

  const bodyRoofMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#101216"), // Dual-tone Contrast Black Floating Roof
    metalness: 0.45,
    roughness: 0.28,
  });

  const trimMaterial = new THREE.MeshStandardMaterial({
    color: 0x14161d,
    metalness: 0.3,
    roughness: 0.72,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f8fd,
    metalness: 0.96,
    roughness: 0.12,
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x09101c,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.82,
  });

  const interiorDarkMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1c24,
    roughness: 0.88,
    metalness: 0.1,
  });

  const glowYellow = new THREE.MeshBasicMaterial({ color: 0xffe500 });
  const glowAmber = new THREE.MeshBasicMaterial({ color: 0xff9900 });
  const glowRed = new THREE.MeshBasicMaterial({ color: 0xff1e28 });
  const glowOff = new THREE.MeshBasicMaterial({ color: 0x2b2d35 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

  // Map to store highlightable components
  const highlightMeshes: Record<string, THREE.Mesh[]> = {};
  const registerHighlight = (key: string, mesh: THREE.Mesh) => {
    if (!highlightMeshes[key]) highlightMeshes[key] = [];
    highlightMeshes[key].push(mesh);
  };

  // =========================================================================
  // 1. CAR EXTERIOR BODYWORK (WagonR Tall-Boy Proportions)
  // Dimensions: Length ~3.65m, Width ~1.62m, Height ~1.675m
  // =========================================================================
  const bodyGroup = new THREE.Group();
  bodyGroup.name = "WagonR_BodyShell";
  root.add(bodyGroup);

  // Lower Main Floorpan & Sill
  const floorGeo = new THREE.BoxGeometry(1.62, 0.22, 3.45);
  const floorMesh = new THREE.Mesh(floorGeo, trimMaterial);
  floorMesh.position.set(0, 0.24, 0);
  floorMesh.receiveShadow = true;
  bodyGroup.add(floorMesh);

  // Main Cabin Lower Shell (Beltline Down)
  const lowerBodyGeo = new THREE.BoxGeometry(1.64, 0.52, 2.3);
  const lowerBodyMesh = new THREE.Mesh(lowerBodyGeo, bodyMaterial);
  lowerBodyMesh.position.set(0, 0.55, -0.15);
  lowerBodyMesh.castShadow = true;
  lowerBodyMesh.receiveShadow = true;
  bodyGroup.add(lowerBodyMesh);

  // Upper Greenhouse (Tall-Boy Roof structure)
  const upperBodyGeo = new THREE.BoxGeometry(1.48, 0.58, 2.05);
  const upperBodyMesh = new THREE.Mesh(upperBodyGeo, bodyRoofMaterial);
  upperBodyMesh.position.set(0, 1.08, -0.22);
  upperBodyMesh.castShadow = true;
  bodyGroup.add(upperBodyMesh);

  // Floating Roof Top Cap
  const roofCapGeo = new THREE.BoxGeometry(1.5, 0.08, 2.15);
  const roofCap = new THREE.Mesh(roofCapGeo, bodyRoofMaterial);
  roofCap.position.set(0, 1.39, -0.22);
  roofCap.castShadow = true;
  bodyGroup.add(roofCap);

  // Front Windshield (Sloped forward)
  const windshieldGeo = new THREE.PlaneGeometry(1.4, 0.72);
  const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
  windshield.position.set(0, 1.05, 0.72);
  windshield.rotation.x = -0.52;
  bodyGroup.add(windshield);
  registerHighlight("windshield-ext", windshield);
  registerHighlight("high-windscreen", windshield);

  // Rear Tailgate Glass (Upright characteristic of WagonR)
  const rearGlassGeo = new THREE.PlaneGeometry(1.36, 0.55);
  const rearGlass = new THREE.Mesh(rearGlassGeo, glassMaterial);
  rearGlass.position.set(0, 1.08, -1.26);
  rearGlass.rotation.y = Math.PI;
  rearGlass.rotation.x = 0.12;
  bodyGroup.add(rearGlass);

  // Left Side Windows
  const sideWindowGeo = new THREE.PlaneGeometry(1.85, 0.44);
  const windowL = new THREE.Mesh(sideWindowGeo, glassMaterial);
  windowL.position.set(-0.75, 1.05, -0.2);
  windowL.rotation.y = -Math.PI / 2;
  bodyGroup.add(windowL);

  // Rear Right Passenger Window (Static)
  const rearWindowR = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.44), glassMaterial);
  rearWindowR.position.set(0.75, 1.05, -0.65);
  rearWindowR.rotation.y = Math.PI / 2;
  bodyGroup.add(rearWindowR);

  // Front Bumper with Lower Air Dam & Fog Housing
  const bumperGeo = new THREE.BoxGeometry(1.64, 0.38, 0.45);
  const bumper = new THREE.Mesh(bumperGeo, bodyMaterial);
  bumper.position.set(0, 0.38, 1.82);
  bumper.castShadow = true;
  bodyGroup.add(bumper);

  // Lower Air Dam Grille (Black honeycomb pattern)
  const airDamGeo = new THREE.BoxGeometry(1.15, 0.16, 0.06);
  const airDam = new THREE.Mesh(airDamGeo, trimMaterial);
  airDam.position.set(0, 0.3, 2.05);
  bodyGroup.add(airDam);

  // Signature Front Chrome Grille with Suzuki 'S' Emblem
  const grilleGeo = new THREE.BoxGeometry(1.22, 0.15, 0.08);
  const grille = new THREE.Mesh(grilleGeo, trimMaterial);
  grille.position.set(0, 0.62, 1.95);
  bodyGroup.add(grille);

  const chromeBarGeo = new THREE.BoxGeometry(1.18, 0.04, 0.09);
  const chromeBar = new THREE.Mesh(chromeBarGeo, chromeMaterial);
  chromeBar.position.set(0, 0.64, 1.96);
  bodyGroup.add(chromeBar);

  const emblemGeo = new THREE.TorusGeometry(0.04, 0.012, 10, 16);
  const emblem = new THREE.Mesh(emblemGeo, chromeMaterial);
  emblem.position.set(0, 0.64, 2.02);
  bodyGroup.add(emblem);

  // Left Passenger Front ORVM (Right driver ORVM mounted to articulated door)
  const orvmL = new THREE.Group();
  orvmL.position.set(-0.84, 0.88, 0.68);
  const mirrorLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.06), bodyRoofMaterial);
  orvmL.add(mirrorLMesh);
  bodyGroup.add(orvmL);

  // Rear Bumper
  const rearBumperGeo = new THREE.BoxGeometry(1.64, 0.38, 0.38);
  const rearBumper = new THREE.Mesh(rearBumperGeo, bodyMaterial);
  rearBumper.position.set(0, 0.38, -1.82);
  rearBumper.castShadow = true;
  bodyGroup.add(rearBumper);
  registerHighlight("boot-ext", rearBumper);

  // =========================================================================
  // 2. ARTICULATED FRONT-RIGHT DRIVER'S DOOR (Indian RHD Layout)
  // Pivots outwards around vertical Y-axis at hinge (z = 0.62)
  // =========================================================================
  const driverDoorPivot = new THREE.Group();
  driverDoorPivot.name = "WagonR_DriverDoorPivot";
  driverDoorPivot.position.set(0.75, 0.58, 0.62); // Hinge line at front pillar
  root.add(driverDoorPivot);

  // Outer Door Panel (Hinged at front, extends backward by 0.95m)
  const doorPanelGeo = new THREE.BoxGeometry(0.08, 0.52, 0.94);
  const doorPanel = new THREE.Mesh(doorPanelGeo, bodyMaterial);
  doorPanel.position.set(0, 0, -0.47);
  doorPanel.castShadow = true;
  driverDoorPivot.add(doorPanel);

  // Door Window Frame & Glass
  const doorWindowGeo = new THREE.PlaneGeometry(0.9, 0.44);
  const doorWindow = new THREE.Mesh(doorWindowGeo, glassMaterial);
  doorWindow.position.set(0, 0.47, -0.47);
  doorWindow.rotation.y = Math.PI / 2;
  driverDoorPivot.add(doorWindow);

  // Inner Door Trim with Armrest & Door Handle
  const innerTrimGeo = new THREE.BoxGeometry(0.06, 0.46, 0.9);
  const innerTrim = new THREE.Mesh(innerTrimGeo, interiorDarkMaterial);
  innerTrim.position.set(-0.04, 0, -0.47);
  driverDoorPivot.add(innerTrim);

  const armrestGeo = new THREE.BoxGeometry(0.08, 0.06, 0.28);
  const armrest = new THREE.Mesh(armrestGeo, interiorDarkMaterial);
  armrest.position.set(-0.08, 0.05, -0.45);
  driverDoorPivot.add(armrest);

  // Exterior Chrome Door Handle
  const handleGeo = new THREE.BoxGeometry(0.03, 0.03, 0.14);
  const handleMesh = new THREE.Mesh(handleGeo, chromeMaterial);
  handleMesh.position.set(0.05, 0.14, -0.82);
  driverDoorPivot.add(handleMesh);

  // Driver's Right-Hand ORVM (Mounted directly to this door)
  const orvmRGroup = new THREE.Group();
  orvmRGroup.position.set(0.06, 0.3, 0.06);
  const mirrorRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.06), bodyRoofMaterial);
  mirrorRMesh.position.set(0.08, 0, 0);
  const mirrorGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.1), chromeMaterial);
  mirrorGlass.position.set(0.08, 0, -0.032);
  mirrorGlass.rotation.y = Math.PI;
  orvmRGroup.add(mirrorRMesh, mirrorGlass);
  driverDoorPivot.add(orvmRGroup);
  registerHighlight("orvm-exterior", mirrorRMesh);
  registerHighlight("mirrors-ext", mirrorRMesh);

  // =========================================================================
  // 3. ARTICULATED BONNET (HOOD)
  // Pivots upward around rear hinge line at X=0, Y=0.82, Z=0.82
  // =========================================================================
  const bonnetPivot = new THREE.Group();
  bonnetPivot.name = "WagonR_BonnetPivot";
  bonnetPivot.position.set(0, 0.82, 0.82);
  root.add(bonnetPivot);

  // Sloping Bonnet Sheetmetal
  const bonnetGeo = new THREE.BoxGeometry(1.48, 0.06, 1.05);
  const bonnet = new THREE.Mesh(bonnetGeo, bodyMaterial);
  bonnet.position.set(0, 0, 0.52);
  bonnet.castShadow = true;
  bonnetPivot.add(bonnet);
  registerHighlight("bonnet-ext", bonnet);

  // Under-Bonnet Acoustic Insulation Liner
  const linerGeo = new THREE.BoxGeometry(1.36, 0.02, 0.95);
  const linerMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.95 });
  const liner = new THREE.Mesh(linerGeo, linerMat);
  liner.position.set(0, -0.035, 0.52);
  bonnetPivot.add(liner);

  // Chrome Metallic Prop Rod
  const propRodGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.72);
  const propRod = new THREE.Mesh(propRodGeo, chromeMaterial);
  propRod.position.set(0.62, -0.22, 0.45);
  propRod.rotation.z = -0.32;
  bonnetPivot.add(propRod);

  // =========================================================================
  // 4. DETAILED ENGINE BAY
  // =========================================================================
  const engineBayGroup = new THREE.Group();
  engineBayGroup.name = "WagonR_EngineBay";
  engineBayGroup.position.set(0, 0.48, 1.25);
  root.add(engineBayGroup);

  const bayFloorGeo = new THREE.BoxGeometry(1.5, 0.08, 1.05);
  const bayFloor = new THREE.Mesh(bayFloorGeo, interiorDarkMaterial);
  bayFloor.position.set(0, -0.05, 0);
  engineBayGroup.add(bayFloor);

  // 1.2L 4-Cylinder Engine Block
  const blockGeo = new THREE.BoxGeometry(0.55, 0.38, 0.45);
  const blockMat = new THREE.MeshStandardMaterial({ color: 0x444855, metalness: 0.7, roughness: 0.4 });
  const engineBlock = new THREE.Mesh(blockGeo, blockMat);
  engineBlock.position.set(-0.08, 0.18, -0.05);
  engineBlock.castShadow = true;
  engineBayGroup.add(engineBlock);
  registerHighlight("engine-block", engineBlock);

  // Cylinder Head Cover (Silver DOHC)
  const headGeo = new THREE.BoxGeometry(0.52, 0.1, 0.42);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xc8cdd8, metalness: 0.85, roughness: 0.25 });
  const headCover = new THREE.Mesh(headGeo, headMat);
  headCover.position.set(-0.08, 0.42, -0.05);
  engineBayGroup.add(headCover);

  // Oil Filler Cap (Yellow)
  const capGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12);
  const capMesh = new THREE.Mesh(capGeo, glowYellow);
  capMesh.position.set(-0.2, 0.48, -0.1);
  engineBayGroup.add(capMesh);

  // 12V 35Ah Battery
  const batteryGroup = new THREE.Group();
  batteryGroup.position.set(-0.52, 0.2, 0.15);
  const battBodyGeo = new THREE.BoxGeometry(0.28, 0.24, 0.22);
  const battMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.6 });
  const battBody = new THREE.Mesh(battBodyGeo, battMat);
  batteryGroup.add(battBody);
  registerHighlight("car-battery", battBody);

  const termGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xee2222 });
  const blackMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const posTerm = new THREE.Mesh(termGeo, redMat);
  posTerm.position.set(0.08, 0.13, 0.06);
  const negTerm = new THREE.Mesh(termGeo, blackMat);
  negTerm.position.set(-0.08, 0.13, 0.06);
  batteryGroup.add(posTerm, negTerm);
  engineBayGroup.add(batteryGroup);

  // Coolant Expansion Reservoir
  const coolantGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.26, 16);
  const coolantMat = new THREE.MeshStandardMaterial({
    color: 0x44ff88,
    transparent: true,
    opacity: 0.78,
    roughness: 0.3,
    metalness: 0.1,
  });
  const coolantTank = new THREE.Mesh(coolantGeo, coolantMat);
  coolantTank.position.set(0.55, 0.22, 0.1);
  engineBayGroup.add(coolantTank);
  registerHighlight("coolant-tank", coolantTank);

  const coolantCap = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 12), trimMaterial);
  coolantCap.position.set(0.55, 0.36, 0.1);
  engineBayGroup.add(coolantCap);

  // Bright Yellow Oil Dipstick
  const dipstickGroup = new THREE.Group();
  dipstickGroup.position.set(0.15, 0.24, 0.22);
  const dipRod = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.38), chromeMaterial);
  dipRod.position.y = 0.19;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 16), glowYellow);
  ring.position.y = 0.38;
  ring.rotation.x = Math.PI / 2;
  dipstickGroup.add(dipRod, ring);
  engineBayGroup.add(dipstickGroup);
  registerHighlight("oil-dipstick", ring);

  // Air Filter Box
  const airFilterGeo = new THREE.BoxGeometry(0.32, 0.18, 0.26);
  const airFilter = new THREE.Mesh(airFilterGeo, trimMaterial);
  airFilter.position.set(-0.45, 0.24, -0.22);
  engineBayGroup.add(airFilter);
  registerHighlight("air-filter", airFilter);

  // Radiator & Fan
  const radiatorGroup = new THREE.Group();
  radiatorGroup.position.set(0, 0.15, 0.52);
  const radCoreGeo = new THREE.BoxGeometry(1.15, 0.32, 0.06);
  const radCoreMat = new THREE.MeshStandardMaterial({ color: 0x333640, metalness: 0.8, roughness: 0.5 });
  const radCore = new THREE.Mesh(radCoreGeo, radCoreMat);
  radiatorGroup.add(radCore);
  registerHighlight("radiator", radCore);
  engineBayGroup.add(radiatorGroup);

  // =========================================================================
  // 5. EXPLODED WHEEL ASSEMBLY
  // =========================================================================
  const wheelExplodedGroup = new THREE.Group();
  wheelExplodedGroup.name = "WagonR_ExplodedWheel";
  root.add(wheelExplodedGroup);

  const baseWheelX = 0.88;
  const wheelY = 0.38;
  const wheelZ = 1.15;

  const strutGroup = new THREE.Group();
  strutGroup.position.set(baseWheelX - 0.12, wheelY + 0.18, wheelZ);
  const shock = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.45), chromeMaterial);
  const springCurve = new THREE.CatmullRomCurve3(
    Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 8;
      const y = (i / 24) * 0.32 - 0.16;
      return new THREE.Vector3(Math.cos(angle) * 0.055, y, Math.sin(angle) * 0.055);
    })
  );
  const spring = new THREE.Mesh(new THREE.TubeGeometry(springCurve, 24, 0.012, 8, false), glowYellow);
  strutGroup.add(shock, spring);
  wheelExplodedGroup.add(strutGroup);
  registerHighlight("suspension-strut", spring);

  const caliperGroup = new THREE.Group();
  caliperGroup.position.set(baseWheelX + 0.02, wheelY + 0.08, wheelZ);
  const caliperMat = new THREE.MeshStandardMaterial({ color: 0xd63031, metalness: 0.85, roughness: 0.3 });
  const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.14, 0.16), caliperMat);
  caliperGroup.add(caliper);
  wheelExplodedGroup.add(caliperGroup);
  registerHighlight("brake-caliper", caliper);

  const discGroup = new THREE.Group();
  discGroup.position.set(baseWheelX + 0.08, wheelY, wheelZ);
  const discGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 24);
  discGeo.rotateZ(Math.PI / 2);
  const discMat = new THREE.MeshStandardMaterial({ color: 0x9fa8b8, metalness: 0.95, roughness: 0.2 });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discGroup.add(discMesh);
  wheelExplodedGroup.add(discGroup);
  registerHighlight("brake-disc", discMesh);

  const rimGroup = new THREE.Group();
  rimGroup.position.set(baseWheelX + 0.12, wheelY, wheelZ);
  const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.18, 24);
  rimGeo.rotateZ(Math.PI / 2);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x88909c, metalness: 0.85, roughness: 0.3 });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimGroup.add(rimMesh);

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 6), chromeMaterial);
    nut.rotateZ(Math.PI / 2);
    nut.position.set(0.1, Math.sin(angle) * 0.08, Math.cos(angle) * 0.08);
    rimGroup.add(nut);
  }
  wheelExplodedGroup.add(rimGroup);
  registerHighlight("alloy-rim", rimMesh);

  const tyreGroup = new THREE.Group();
  tyreGroup.position.set(baseWheelX + 0.14, wheelY, wheelZ);
  const tyreGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 24);
  tyreGeo.rotateZ(Math.PI / 2);
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x16181f, roughness: 0.9, metalness: 0.08 });
  const tyreMesh = new THREE.Mesh(tyreGeo, tyreMat);
  tyreMesh.castShadow = true;
  tyreGroup.add(tyreMesh);
  wheelExplodedGroup.add(tyreGroup);
  registerHighlight("radial-tyre", tyreMesh);
  registerHighlight("tyres-ext", tyreMesh);

  const guideLineMat = new THREE.LineDashedMaterial({
    color: 0xffe500,
    dashSize: 0.05,
    gapSize: 0.03,
    transparent: true,
    opacity: 0,
  });
  const guideLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(baseWheelX - 0.1, wheelY, wheelZ),
    new THREE.Vector3(baseWheelX + 1.25, wheelY, wheelZ),
  ]);
  const guideLines = new THREE.LineSegments(guideLineGeo, guideLineMat);
  guideLines.computeLineDistances();
  wheelExplodedGroup.add(guideLines);

  const wheels: THREE.Group[] = [wheelExplodedGroup];
  const otherPositions = [
    { x: -baseWheelX, y: wheelY, z: wheelZ },  // Front Left
    { x: baseWheelX, y: wheelY, z: -1.25 },   // Rear Right
    { x: -baseWheelX, y: wheelY, z: -1.25 },  // Rear Left
  ];
  otherPositions.forEach((pos) => {
    const wg = new THREE.Group();
    wg.position.set(pos.x, pos.y, pos.z);
    const t = new THREE.Mesh(tyreGeo, tyreMat);
    t.castShadow = true;
    const r = new THREE.Mesh(rimGeo, rimMat);
    wg.add(t, r);
    root.add(wg);
    wheels.push(wg);
  });

  // =========================================================================
  // 6. DETAILED INDIAN RIGHT-HAND DRIVE (RHD) COCKPIT
  // DRIVER POSITION IS STRICTLY AT +X (+0.35m)
  // PASSENGER POSITION IS AT -X (-0.35m)
  // =========================================================================
  const cockpitGroup = new THREE.Group();
  cockpitGroup.name = "WagonR_RHD_Cockpit";
  cockpitGroup.position.set(0, 0.52, 0.1);
  root.add(cockpitGroup);

  // Dual-tone Dashboard Structure
  const dashGeo = new THREE.BoxGeometry(1.42, 0.42, 0.65);
  const dashMesh = new THREE.Mesh(dashGeo, interiorDarkMaterial);
  dashMesh.position.set(0, 0.32, 0.52);
  cockpitGroup.add(dashMesh);
  registerHighlight("rhd-cockpit", dashMesh);

  // AC Louver Vents
  const ventMat = new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.6 });
  const ventCenterL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.02), ventMat);
  ventCenterL.position.set(-0.08, 0.44, 0.72);
  const ventCenterR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.02), ventMat);
  ventCenterR.position.set(0.08, 0.44, 0.72);
  const ventDriverR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.02), ventMat);
  ventDriverR.position.set(0.62, 0.44, 0.65);
  cockpitGroup.add(ventCenterL, ventCenterR, ventDriverR);

  // RHD Instrument Binnacle (Ahead of driver at +X: 0.35m)
  const binnacleGeo = new THREE.BoxGeometry(0.44, 0.14, 0.28);
  const binnacle = new THREE.Mesh(binnacleGeo, interiorDarkMaterial);
  binnacle.position.set(0.35, 0.54, 0.48);
  cockpitGroup.add(binnacle);

  // Illuminated Speedometer Dial & Digital Fuel Bar
  const clusterGeo = new THREE.PlaneGeometry(0.38, 0.1);
  const cluster = new THREE.Mesh(clusterGeo, glowCyan);
  cluster.position.set(0.35, 0.52, 0.35);
  cluster.rotation.x = -0.3;
  cockpitGroup.add(cluster);
  registerHighlight("speedometer", cluster);
  registerHighlight("instrument-cluster", cluster);

  // Speedometer Needle
  const needleGeo = new THREE.BoxGeometry(0.006, 0.06, 0.002);
  needleGeo.translate(0, 0.03, 0);
  const needleMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
  const speedometerNeedle = new THREE.Mesh(needleGeo, needleMat);
  speedometerNeedle.position.set(0.35, 0.52, 0.355);
  speedometerNeedle.rotation.x = -0.3;
  cockpitGroup.add(speedometerNeedle);

  // Fuel Gauge Segment Mesh
  const fuelGeo = new THREE.PlaneGeometry(0.06, 0.02);
  const fuelMesh = new THREE.Mesh(fuelGeo, glowAmber);
  fuelMesh.position.set(0.44, 0.52, 0.352);
  fuelMesh.rotation.x = -0.3;
  cockpitGroup.add(fuelMesh);
  registerHighlight("fuel-indicator", fuelMesh);

  // Engine Temperature Red Warning Icon
  const tempWarnGeo = new THREE.PlaneGeometry(0.025, 0.025);
  const tempWarningIcon = new THREE.Mesh(tempWarnGeo, glowOff);
  tempWarningIcon.position.set(0.26, 0.52, 0.352);
  tempWarningIcon.rotation.x = -0.3;
  cockpitGroup.add(tempWarningIcon);
  registerHighlight("temp-warning", tempWarningIcon);

  // Turn Signal Dashboard Indicators (Left & Right green/amber arrows)
  const turnArrowGeo = new THREE.PlaneGeometry(0.02, 0.02);
  const turnSignalL = new THREE.Mesh(turnArrowGeo, glowOff);
  turnSignalL.position.set(0.31, 0.55, 0.352);
  turnSignalL.rotation.x = -0.3;

  const turnSignalR = new THREE.Mesh(turnArrowGeo, glowOff);
  turnSignalR.position.set(0.39, 0.55, 0.352);
  turnSignalR.rotation.x = -0.3;
  cockpitGroup.add(turnSignalL, turnSignalR);
  registerHighlight("turn-indicators-dash", turnSignalR);

  // Center Hazard Flasher Push Button (Red Triangle)
  const hazardGeo = new THREE.BoxGeometry(0.05, 0.05, 0.02);
  const hazardButton = new THREE.Mesh(hazardGeo, glowRed);
  hazardButton.position.set(0, 0.44, 0.74);
  cockpitGroup.add(hazardButton);
  registerHighlight("hazard-switch", hazardButton);

  // RHD Steering Column at +X: 0.35m
  const steeringColumn = new THREE.Group();
  steeringColumn.name = "SteeringColumn";
  steeringColumn.position.set(0.35, 0.48, 0.38);

  const columnGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.28);
  columnGeo.rotateX(0.45);
  const columnMesh = new THREE.Mesh(columnGeo, trimMaterial);
  steeringColumn.add(columnMesh);

  // Ignition Key Cylinder on Right Side of Steering Column
  const ignitionGroup = new THREE.Group();
  ignitionGroup.position.set(0.08, 0.02, -0.06);
  const ignBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 16), chromeMaterial);
  ignBarrel.rotateZ(Math.PI / 2);
  const ignSlot = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.016, 0.02), trimMaterial);
  ignSlot.position.x = 0.016;
  ignitionGroup.add(ignBarrel, ignSlot);
  steeringColumn.add(ignitionGroup);
  registerHighlight("ignition-switch", ignBarrel);

  // Right-Hand Multi-Function Stalk (Headlights & Turn Signals)
  const stalkGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.14);
  const indStalk = new THREE.Mesh(stalkGeo, trimMaterial);
  indStalk.position.set(0.14, 0.05, -0.05);
  indStalk.rotation.z = Math.PI / 3;
  steeringColumn.add(indStalk);
  registerHighlight("lighting-stalk", indStalk);
  registerHighlight("indicator-stalk", indStalk);

  // Left-Hand Wiper Stalk
  const wiperStalk = new THREE.Mesh(stalkGeo, trimMaterial);
  wiperStalk.position.set(-0.14, 0.05, -0.05);
  wiperStalk.rotation.z = -Math.PI / 3;
  steeringColumn.add(wiperStalk);
  registerHighlight("wiper-stalk", wiperStalk);

  // =========================================================================
  // CHAPTER 2: ARTICULATED & EXPLODED STEERING WHEEL ASSEMBLY
  // Moves forward along the steering rake axis (Y & -Z) during Chapter 2
  // =========================================================================
  const steeringWheel = new THREE.Group();
  steeringWheel.name = "WagonR_SteeringWheel_ExplodedGroup";
  steeringWheel.position.set(0, 0.08, -0.12);
  steeringWheel.rotation.x = 0.45;

  // 3-Spoke Urethane Rim
  const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.022, 12, 28), trimMaterial);
  wheelRim.castShadow = true;

  // Horn Boss & SRS Airbag Cushion Pad
  const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), trimMaterial);
  boss.rotateX(Math.PI / 2);

  // Suzuki Chrome Emblem
  const hornEmblem = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.005, 8, 12), chromeMaterial);
  hornEmblem.position.set(0, 0, 0.02);

  // 3 Spokes
  const spokeGeo = new THREE.BoxGeometry(0.12, 0.025, 0.02);
  const spokeL = new THREE.Mesh(spokeGeo, trimMaterial);
  spokeL.position.set(-0.08, 0, 0);
  const spokeR = new THREE.Mesh(spokeGeo, trimMaterial);
  spokeR.position.set(0.08, 0, 0);
  const spokeB = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.12, 0.02), trimMaterial);
  spokeB.position.set(0, -0.08, 0);

  steeringWheel.add(wheelRim, boss, hornEmblem, spokeL, spokeR, spokeB);
  steeringColumn.add(steeringWheel);
  cockpitGroup.add(steeringColumn);
  registerHighlight("steering-wheel", wheelRim);
  registerHighlight("airbag-horn", boss);
  registerHighlight("airbags", boss);

  // Steering Exploded Guide Line
  const steeringGuideLineMat = new THREE.LineDashedMaterial({
    color: 0xffe500,
    dashSize: 0.04,
    gapSize: 0.02,
    transparent: true,
    opacity: 0,
  });
  const steeringGuideLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.22, -0.45),
  ]);
  const steeringGuideLines = new THREE.LineSegments(steeringGuideLineGeo, steeringGuideLineMat);
  steeringGuideLines.computeLineDistances();
  steeringColumn.add(steeringGuideLines);

  // Center Day/Night IRVM
  const irvmGeo = new THREE.BoxGeometry(0.18, 0.06, 0.02);
  const irvmMesh = new THREE.Mesh(irvmGeo, chromeMaterial);
  irvmMesh.position.set(0, 0.95, 0.42);
  irvmMesh.rotation.x = -0.2;
  cockpitGroup.add(irvmMesh);
  registerHighlight("irvm-interior", irvmMesh);

  // Center Console
  const consoleGeo = new THREE.BoxGeometry(0.24, 0.22, 0.85);
  const consoleMesh = new THREE.Mesh(consoleGeo, interiorDarkMaterial);
  consoleMesh.position.set(0, 0.12, 0.15);
  cockpitGroup.add(consoleMesh);

  // =========================================================================
  // CHAPTER 3: 5-SPEED MANUAL GEAR SHIFTER
  // =========================================================================
  const gearGroup = new THREE.Group();
  gearGroup.name = "WagonR_GearShifter";
  gearGroup.position.set(0, 0.22, 0.32);

  const boot = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.08, 12), trimMaterial);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18), chromeMaterial);
  stick.position.y = 0.09;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), trimMaterial);
  knob.position.y = 0.18;

  // Etched H-Pattern Shift Diagram on Top of Knob
  const shiftBadgeGeo = new THREE.PlaneGeometry(0.03, 0.03);
  const shiftBadge = new THREE.Mesh(shiftBadgeGeo, glowYellow);
  shiftBadge.position.set(0, 0.21, 0);
  shiftBadge.rotation.x = -Math.PI / 2;

  gearGroup.add(boot, stick, knob, shiftBadge);
  cockpitGroup.add(gearGroup);
  registerHighlight("gear-lever", knob);
  registerHighlight("gear-shifter", knob);
  registerHighlight("reverse-lockout", knob);

  // =========================================================================
  // CHAPTER 5: MECHANICAL HANDBRAKE LEVER
  // =========================================================================
  const handbrakeGroup = new THREE.Group();
  handbrakeGroup.name = "WagonR_Handbrake";
  handbrakeGroup.position.set(0, 0.24, 0.05);

  const hbLeverGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.22);
  hbLeverGeo.rotateX(-0.4);
  const hbLever = new THREE.Mesh(hbLeverGeo, trimMaterial);

  const hbButton = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.02), chromeMaterial);
  hbButton.position.set(0, 0.08, -0.06);
  hbButton.rotateX(-0.4);

  handbrakeGroup.add(hbLever, hbButton);
  cockpitGroup.add(handbrakeGroup);
  registerHighlight("handbrake-lever", hbLever);
  registerHighlight("handbrake", hbLever);

  // Driver Seat (+X: 0.35m) & Passenger Seat (-X: -0.35m)
  const seatGeo = new THREE.BoxGeometry(0.48, 0.55, 0.48);
  const headrestGeo = new THREE.BoxGeometry(0.24, 0.18, 0.12);

  const driverSeat = new THREE.Mesh(seatGeo, interiorDarkMaterial);
  driverSeat.position.set(0.35, 0.24, -0.22);
  const driverHeadrest = new THREE.Mesh(headrestGeo, interiorDarkMaterial);
  driverHeadrest.position.set(0.35, 0.62, -0.25);
  cockpitGroup.add(driverSeat, driverHeadrest);

  const passengerSeat = new THREE.Mesh(seatGeo, interiorDarkMaterial);
  passengerSeat.position.set(-0.35, 0.24, -0.22);
  const passengerHeadrest = new THREE.Mesh(headrestGeo, interiorDarkMaterial);
  passengerHeadrest.position.set(-0.35, 0.62, -0.25);
  cockpitGroup.add(passengerSeat, passengerHeadrest);

  // 3-Point Driver Seatbelt
  const seatbeltGeo = new THREE.BoxGeometry(0.04, 0.55, 0.01);
  const seatbeltMat = new THREE.MeshBasicMaterial({ color: 0x333540 });
  const seatbelt = new THREE.Mesh(seatbeltGeo, seatbeltMat);
  seatbelt.position.set(0.52, 0.72, -0.15);
  seatbelt.rotation.z = 0.28;
  cockpitGroup.add(seatbelt);
  registerHighlight("seatbelts", seatbelt);

  // =========================================================================
  // CHAPTER 4: ARTICULATED MANUAL ABC PEDAL BOX (Indian RHD Footwell)
  // Driver Footwell Center is at +X = 0.35m
  // Layout (Left to Right):
  // [C] Clutch at +X = 0.24m
  // [B] Brake at +X = 0.35m
  // [A] Accelerator at +X = 0.46m
  // =========================================================================
  const pedalArmGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22);
  const rubberPadMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.92 });

  // [C] Clutch Pedal
  const clutchGroup = new THREE.Group();
  clutchGroup.position.set(0.24, 0.24, 0.65);
  const cArm = new THREE.Mesh(pedalArmGeo, chromeMaterial);
  cArm.position.y = -0.09;
  const cPad = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.09, 0.025), rubberPadMat);
  cPad.position.set(0, -0.18, 0.02);
  clutchGroup.add(cArm, cPad);
  cockpitGroup.add(clutchGroup);
  registerHighlight("clutch-pedal", cPad);

  // [B] Brake Pedal (Wider pad)
  const brakeGroup = new THREE.Group();
  brakeGroup.position.set(0.35, 0.24, 0.65);
  const bArm = new THREE.Mesh(pedalArmGeo, chromeMaterial);
  bArm.position.y = -0.09;
  const bPad = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.09, 0.025), rubberPadMat);
  bPad.position.set(0, -0.18, 0.02);
  brakeGroup.add(bArm, bPad);
  cockpitGroup.add(brakeGroup);
  registerHighlight("brake-pedal", bPad);

  // [A] Accelerator Pedal (Slim elongated pad)
  const accelGroup = new THREE.Group();
  accelGroup.position.set(0.46, 0.24, 0.65);
  const aArm = new THREE.Mesh(pedalArmGeo, chromeMaterial);
  aArm.position.y = -0.09;
  const aPad = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.12, 0.02), rubberPadMat);
  aPad.position.set(0, -0.18, 0.02);
  accelGroup.add(aArm, aPad);
  cockpitGroup.add(accelGroup);
  registerHighlight("accel-pedal", aPad);

  // =========================================================================
  // 8. EXTERIOR LIGHTING & SIGNALLING
  // =========================================================================
  const headlampGeo = new THREE.BoxGeometry(0.26, 0.22, 0.12);
  const hlL = new THREE.Mesh(headlampGeo, glowOff);
  hlL.position.set(-0.64, 0.68, 1.88);
  bodyGroup.add(hlL);

  const hlR = new THREE.Mesh(headlampGeo, glowOff);
  hlR.position.set(0.64, 0.68, 1.88);
  bodyGroup.add(hlR);
  registerHighlight("headlights-ext", hlR);

  const spotL = new THREE.SpotLight(0xfff8d6, 0, 24, Math.PI / 4, 0.45);
  spotL.position.set(-0.64, 0.68, 1.95);
  spotL.target.position.set(-0.64, 0.2, 8);
  root.add(spotL, spotL.target);

  const spotR = new THREE.SpotLight(0xfff8d6, 0, 24, Math.PI / 4, 0.45);
  spotR.position.set(0.64, 0.68, 1.95);
  spotR.target.position.set(0.64, 0.2, 8);
  root.add(spotR, spotR.target);

  const indGeo = new THREE.BoxGeometry(0.08, 0.08, 0.05);
  const indFL = new THREE.Mesh(indGeo, glowOff);
  indFL.position.set(-0.78, 0.68, 1.86);
  const indFR = new THREE.Mesh(indGeo, glowOff);
  indFR.position.set(0.78, 0.68, 1.86);
  bodyGroup.add(indFL, indFR);
  registerHighlight("indicators-ext", indFR);

  const indRL = new THREE.Mesh(indGeo, glowOff);
  indRL.position.set(-0.75, 0.88, -1.82);
  const indRR = new THREE.Mesh(indGeo, glowOff);
  indRR.position.set(0.75, 0.88, -1.82);
  bodyGroup.add(indRL, indRR);

  const brakeGeo = new THREE.BoxGeometry(0.18, 0.35, 0.06);
  const brakeL = new THREE.Mesh(brakeGeo, glowOff);
  brakeL.position.set(-0.74, 0.88, -1.84);
  const brakeR = new THREE.Mesh(brakeGeo, glowOff);
  brakeR.position.set(0.74, 0.88, -1.84);
  bodyGroup.add(brakeL, brakeR);
  registerHighlight("brake-lights", brakeR);

  const highStopGeo = new THREE.BoxGeometry(0.35, 0.04, 0.04);
  const highStop = new THREE.Mesh(highStopGeo, glowOff);
  highStop.position.set(0, 1.28, -1.83);
  bodyGroup.add(highStop);

  const underglowLight = new THREE.PointLight(0xffe500, 0, 5);
  underglowLight.position.set(0, 0.15, 0);
  root.add(underglowLight);

  // =========================================================================
  // 9. ANIMATION, ARTICULATION & HIGHLIGHT CONTROLLER
  // =========================================================================
  let activeHighlightMesh: THREE.Mesh | null = null;
  const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();

  const highlightComponent = (componentId: string | null) => {
    if (activeHighlightMesh && originalMaterials.has(activeHighlightMesh)) {
      activeHighlightMesh.material = originalMaterials.get(activeHighlightMesh)!;
      activeHighlightMesh = null;
    }

    if (!componentId || !highlightMeshes[componentId] || highlightMeshes[componentId].length === 0) {
      return;
    }

    const mesh = highlightMeshes[componentId][0];
    if (mesh) {
      if (!originalMaterials.has(mesh)) {
        originalMaterials.set(mesh, mesh.material);
      }
      activeHighlightMesh = mesh;
      mesh.material = glowYellow;
    }
  };

  const updateAnimation: WagonRCarModel["updateAnimation"] = (options) => {
    const {
      bonnetAngle = 0,
      driverDoorAngle = 0,
      wheelExplodeOffset = 0,
      steeringExplodeOffset = 0,
      steeringAngle = 0,
      gearPosition = "N",
      pedals,
      handbrakeEngaged = false,
      lights,
      dashboard,
      time,
      delta,
      speed = 0,
    } = options;

    // 1. Articulated Bonnet & Driver Door
    bonnetPivot.rotation.x = -bonnetAngle;
    driverDoorPivot.rotation.y = -driverDoorAngle;

    // 2. Exploded Wheel Assembly along X-axis
    const explode = wheelExplodeOffset;
    caliperGroup.position.x = baseWheelX + 0.02 + 0.22 * explode;
    discGroup.position.x = baseWheelX + 0.08 + 0.44 * explode;
    rimGroup.position.x = baseWheelX + 0.12 + 0.72 * explode;
    tyreGroup.position.x = baseWheelX + 0.14 + 1.05 * explode;
    guideLineMat.opacity = explode * 0.75;

    // Wheel spin
    if (speed > 0) {
      const spin = (speed / 12) * delta;
      wheels.forEach((w) => {
        w.children.forEach((c) => {
          c.rotation.x += spin;
        });
      });
    }

    // 3. CHAPTER 2: STEERING WHEEL EXPLODED SEPARATION & ROTATION
    // Base position is (0, 0.08, -0.12)
    // Moves forward along steering rake axis: Y moves up (+0.12), Z moves forward (-0.26)
    const targetWheelY = 0.08 + 0.12 * steeringExplodeOffset;
    const targetWheelZ = -0.12 - 0.26 * steeringExplodeOffset;
    steeringWheel.position.y += (targetWheelY - steeringWheel.position.y) * 0.2;
    steeringWheel.position.z += (targetWheelZ - steeringWheel.position.z) * 0.2;
    steeringWheel.rotation.z += (steeringAngle - steeringWheel.rotation.z) * 0.25;

    steeringGuideLineMat.opacity = steeringExplodeOffset * 0.8;

    // 4. CHAPTER 3: 5-SPEED GEAR LEVER H-PATTERN
    let targetGearRotX = 0;
    let targetGearRotZ = 0;
    switch (gearPosition) {
      case "1":
        targetGearRotX = 0.24;
        targetGearRotZ = -0.22;
        break;
      case "2":
        targetGearRotX = -0.24;
        targetGearRotZ = -0.22;
        break;
      case "3":
        targetGearRotX = 0.24;
        targetGearRotZ = 0;
        break;
      case "4":
        targetGearRotX = -0.24;
        targetGearRotZ = 0;
        break;
      case "5":
        targetGearRotX = 0.24;
        targetGearRotZ = 0.22;
        break;
      case "R":
        targetGearRotX = -0.24;
        targetGearRotZ = 0.22;
        break;
      case "N":
      default:
        targetGearRotX = 0;
        targetGearRotZ = 0;
        break;
    }
    stick.rotation.x += (targetGearRotX - stick.rotation.x) * 0.25;
    stick.rotation.z += (targetGearRotZ - stick.rotation.z) * 0.25;
    knob.position.x = stick.rotation.z * 0.12;
    knob.position.z = -stick.rotation.x * 0.12;
    shiftBadge.position.x = knob.position.x;
    shiftBadge.position.z = knob.position.z;

    // 5. CHAPTER 4: ABC PEDAL MECHANICAL ARCS
    const targetClutch = pedals.clutch ? -0.35 : 0;
    const targetBrake = pedals.brake ? -0.32 : 0;
    const targetAccel = pedals.accel ? -0.28 : 0;

    clutchGroup.rotation.x += (targetClutch - clutchGroup.rotation.x) * 0.25;
    brakeGroup.rotation.x += (targetBrake - brakeGroup.rotation.x) * 0.25;
    accelGroup.rotation.x += (targetAccel - accelGroup.rotation.x) * 0.25;

    // 6. CHAPTER 5: MECHANICAL HANDBRAKE LEVER
    const targetHbRot = handbrakeEngaged ? 0.38 : -0.4;
    handbrakeGroup.rotation.x += (targetHbRot - handbrakeGroup.rotation.x) * 0.22;

    // 7. CHAPTER 6: DASHBOARD INSTRUMENTS & SIGNALS
    const blinkOn = Math.sin(time * 10) > 0;
    const leftOn = (lights.leftIndicator || lights.hazard) && blinkOn;
    const rightOn = (lights.rightIndicator || lights.hazard) && blinkOn;

    turnSignalL.material = leftOn ? glowAmber : glowOff;
    turnSignalR.material = rightOn ? glowAmber : glowOff;

    const isHazardActive = lights.hazard || (dashboard && dashboard.hazard);
    hazardButton.material = isHazardActive && blinkOn ? glowRed : glowOff;

    const isTempOverheat = dashboard && dashboard.tempWarning;
    tempWarningIcon.material = isTempOverheat ? glowRed : glowOff;

    // Speedometer needle sweep
    const currentSpeed = speed || (dashboard && dashboard.speed) || 0;
    const needleTargetAngle = -0.3 - (currentSpeed / 180) * Math.PI * 1.2;
    speedometerNeedle.rotation.z += (needleTargetAngle - speedometerNeedle.rotation.z) * 0.15;

    // Exterior Lights
    const hlIntensity = lights.headlights ? 5.5 : 0;
    spotL.intensity = hlIntensity;
    spotR.intensity = hlIntensity;
    const hlMat = lights.headlights ? glowYellow : glowOff;
    hlL.material = hlMat;
    hlR.material = hlMat;

    indFL.material = leftOn ? glowAmber : glowOff;
    indRL.material = leftOn ? glowAmber : glowOff;
    indFR.material = rightOn ? glowAmber : glowOff;
    indRR.material = rightOn ? glowAmber : glowOff;

    const brakeActive = lights.brakeLights || pedals.brake;
    const bLightMat = brakeActive ? glowRed : glowOff;
    brakeL.material = bLightMat;
    brakeR.material = bLightMat;
    highStop.material = bLightMat;

    underglowLight.intensity = lights.headlights ? 2.5 : 0.8;
  };

  return {
    root,
    bonnetPivot,
    driverDoorPivot,
    explodedWheel: {
      group: wheelExplodedGroup,
      strut: strutGroup,
      caliper: caliperGroup,
      disc: discGroup,
      rim: rimGroup,
      tyre: tyreGroup,
      guideLines,
    },
    cockpit: {
      group: cockpitGroup,
      steeringWheel,
      steeringColumn,
      steeringGuideLines,
      clutchPedal: clutchGroup,
      brakePedal: brakeGroup,
      accelPedal: accelGroup,
      gearLever: gearGroup,
      handbrake: handbrakeGroup,
      hazardButton,
      ignitionSwitch: ignitionGroup,
      turnSignalL,
      turnSignalR,
      tempWarningIcon,
      speedometerNeedle,
    },
    engineBay: {
      group: engineBayGroup,
      engineBlock,
      battery: batteryGroup,
      coolantTank,
      oilDipstick: dipstickGroup,
      airFilter,
      radiator: radiatorGroup,
    },
    lights: {
      headlightMeshes: [hlL, hlR],
      headlightSpots: [spotL, spotR],
      leftIndicatorMeshes: [indFL, indRL],
      rightIndicatorMeshes: [indFR, indRR],
      brakeLightMeshes: [brakeL, brakeR, highStop],
      underglowLight,
    },
    materials: {
      bodyMaterial,
      bodyRoofMaterial,
      glassMaterial,
      trimMaterial,
      chromeMaterial,
      glowYellow,
      glowAmber,
      glowRed,
    },
    wheels,
    updateAnimation,
    highlightComponent,
  };
}
