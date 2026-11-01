import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createWagonRModel } from "./WagonRModel";
import type { WagonRCarModel } from "./WagonRModel";
import { AUTOMOTIVE_STAGES, COMPONENT_HOTSPOTS } from "../../data/automotiveData";
import type { ComponentHotspot, StageConfig, GearPosition } from "../../types/automotive";
import { InteractiveHotspots } from "./InteractiveHotspots";
import { EducationalPanel } from "./EducationalPanel";
import { ManualExplorationModal } from "./ManualExplorationModal";
import type { PresetCategory } from "./ManualExplorationModal";

gsap.registerPlugin(ScrollTrigger);

interface KnowYourCarSectionProps {
  onExploreCourses: () => void;
}

export const KnowYourCarSection: React.FC<KnowYourCarSectionProps> = ({ onExploreCourses }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Responsive device tracking
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const isMobile = windowWidth <= 900;
  const isTablet = windowWidth > 900 && windowWidth <= 1180;

  // Active Stage Index (0 to 9 for 10 scenes)
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedHotspot, setSelectedHotspot] = useState<ComponentHotspot | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);

  // Interactive Widgets State
  const [steeringAngle, setSteeringAngle] = useState<number>(0);
  const [gearPosition, setGearPosition] = useState<GearPosition>("N");
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  // Pedal State (Manual ABC pedals)
  const [pedalsState, setPedalsState] = useState({
    clutch: false,
    brake: false,
    accel: false,
  });

  // Lights State
  const [lightsState, setLightsState] = useState({
    headlights: false,
    leftIndicator: false,
    rightIndicator: false,
    hazard: false,
    brakeLights: false,
  });

  // State refs for animation loop to avoid Three.js recreation
  const pedalsStateRef = useRef(pedalsState);
  useEffect(() => {
    pedalsStateRef.current = pedalsState;
  }, [pedalsState]);

  const lightsStateRef = useRef(lightsState);
  useEffect(() => {
    lightsStateRef.current = lightsState;
  }, [lightsState]);

  const steeringAngleRef = useRef(steeringAngle);
  useEffect(() => {
    steeringAngleRef.current = steeringAngle;
  }, [steeringAngle]);

  const gearPositionRef = useRef(gearPosition);
  useEffect(() => {
    gearPositionRef.current = gearPosition;
  }, [gearPosition]);

  const currentStageIndexRef = useRef(currentStageIndex);
  useEffect(() => {
    currentStageIndexRef.current = currentStageIndex;
  }, [currentStageIndex]);

  // Hotspot 2D Screen Projections
  const [screenPositions, setScreenPositions] = useState<
    Record<string, { x: number; y: number; visible: boolean }>
  >({});

  // Three.js References
  const threeRefs = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    carModel: WagonRCarModel;
    clock: THREE.Clock;
    targetCamPos: THREE.Vector3;
    targetCamLookAt: THREE.Vector3;
    currentCamLookAt: THREE.Vector3;
    targetCarRotationY: number;
    currentCarRotationY: number;
    targetBonnetAngle: number;
    currentBonnetAngle: number;
    targetDoorAngle: number;
    currentDoorAngle: number;
    targetWheelExplode: number;
    currentWheelExplode: number;
    isUserDragging: boolean;
    dragDeltaX: number;
  } | null>(null);

  const currentStage: StageConfig = AUTOMOTIVE_STAGES[currentStageIndex] || AUTOMOTIVE_STAGES[0];

  // Helper to toggle ABC pedals
  const handleTogglePedal = (pedal: "clutch" | "brake" | "accel") => {
    setPedalsState((prev) => ({
      ...prev,
      [pedal]: !prev[pedal],
    }));

    // Auto-release after 900ms to simulate a driver's press and release
    setTimeout(() => {
      setPedalsState((prev) => ({
        ...prev,
        [pedal]: false,
      }));
    }, 900);
  };

  // Helper to toggle lights
  const handleToggleLight = (lightKey: keyof typeof lightsState) => {
    setLightsState((prev) => {
      if (lightKey === "hazard") {
        return {
          ...prev,
          hazard: !prev.hazard,
          leftIndicator: false,
          rightIndicator: false,
        };
      }
      return {
        ...prev,
        [lightKey]: !prev[lightKey],
      };
    });
  };

  // Helper to toggle checklist items
  const handleToggleChecklistItem = (itemId: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Handle Hotspot Selection
  const handleSelectHotspot = useCallback((hotspot: ComponentHotspot | null) => {
    setSelectedHotspot(hotspot);
    if (!threeRefs.current) return;

    if (hotspot) {
      threeRefs.current.carModel.highlightComponent(hotspot.id);
      const [hx, hy, hz] = hotspot.position3D;
      const focusTarget = new THREE.Vector3(hx * 0.7, hy + 0.1, hz * 0.7);
      threeRefs.current.targetCamLookAt.copy(focusTarget);
    } else {
      threeRefs.current.carModel.highlightComponent(null);
    }
  }, []);

  // Preset Views for Manual Mode (PHASE 5)
  const handleSelectPresetView = (view: PresetCategory) => {
    if (!threeRefs.current) return;
    const refs = threeRefs.current;

    switch (view) {
      case "exterior":
        refs.targetCamPos.set(3.8, 1.8, 4.4);
        refs.targetCamLookAt.set(0, 0.65, 0);
        refs.targetBonnetAngle = 0;
        refs.targetDoorAngle = 0;
        refs.targetWheelExplode = 0;
        break;
      case "engine":
        refs.targetCamPos.set(0.0, 2.05, 2.35);
        refs.targetCamLookAt.set(0, 0.72, 1.1);
        refs.targetBonnetAngle = 0.92;
        refs.targetDoorAngle = 0;
        refs.targetWheelExplode = 0;
        break;
      case "cabin":
        refs.targetCamPos.set(0.35, 1.05, 0.15);
        refs.targetCamLookAt.set(0.35, 0.72, 0.95);
        refs.targetBonnetAngle = 0;
        refs.targetDoorAngle = 0.95;
        refs.targetWheelExplode = 0;
        break;
      case "pedals":
        refs.targetCamPos.set(0.35, 0.42, 0.52);
        refs.targetCamLookAt.set(0.35, 0.15, 0.85);
        refs.targetBonnetAngle = 0;
        refs.targetDoorAngle = 0.25;
        refs.targetWheelExplode = 0;
        break;
      case "gearbox":
        refs.targetCamPos.set(0.18, 0.62, 0.22);
        refs.targetCamLookAt.set(0.0, 0.32, 0.42);
        refs.targetBonnetAngle = 0;
        refs.targetDoorAngle = 0;
        refs.targetWheelExplode = 0;
        break;
      case "safety":
        refs.targetCamPos.set(0.42, 0.82, 0.38);
        refs.targetCamLookAt.set(0.32, 0.65, 0.68);
        refs.targetBonnetAngle = 0;
        refs.targetDoorAngle = 0;
        refs.targetWheelExplode = 0;
        break;
    }
  };

  const handleResetCamera = () => {
    handleSelectPresetView("exterior");
  };

  // Direct programmatic stage change (from UI buttons or mobile nav)
  const goToStage = (stageIdx: number) => {
    const clamped = Math.max(0, Math.min(AUTOMOTIVE_STAGES.length - 1, stageIdx));
    setCurrentStageIndex(clamped);
    setSelectedHotspot(null);

    const targetStage = AUTOMOTIVE_STAGES[clamped];
    if (threeRefs.current && targetStage) {
      const refs = threeRefs.current;
      refs.carModel.highlightComponent(null);

      const zoom = isMobile ? 1.25 : 1.0;
      refs.targetCamPos.set(
        targetStage.cameraPosition[0] * zoom,
        targetStage.cameraPosition[1] * (isMobile ? 1.15 : 1.0),
        targetStage.cameraPosition[2] * zoom
      );
      refs.targetCamLookAt.set(...targetStage.cameraTarget);
      refs.targetCarRotationY = targetStage.carRotationY;
      refs.targetBonnetAngle = targetStage.bonnetAngle;
      refs.targetDoorAngle = targetStage.driverDoorAngle;
      refs.targetWheelExplode = targetStage.wheelExplodeOffset;

      setLightsState({
        headlights: targetStage.activeLights.headlights,
        leftIndicator: targetStage.activeLights.leftIndicator,
        rightIndicator: targetStage.activeLights.rightIndicator,
        hazard: targetStage.activeLights.hazard,
        brakeLights: targetStage.activeLights.brakeLights,
      });
    }
  };

  // Three.js Scene Setup & GSAP ScrollTrigger Integration
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080a0f");
    scene.fog = new THREE.FogExp2(0x080a0f, 0.045);

    // 2. Camera
    const isMob = window.innerWidth <= 900;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(isMob ? 44 : 38, width / height, 0.1, 100);

    // 3. Renderer with PBR support & shadow maps
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    mainKeyLight.position.set(6, 9, 7);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.camera.near = 0.5;
    mainKeyLight.shadow.camera.far = 30;
    mainKeyLight.shadow.bias = -0.001;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.95);
    fillLight.position.set(-7, 5, -5);
    scene.add(fillLight);

    const yellowRimLight = new THREE.PointLight(0xffe500, 1.8, 14);
    yellowRimLight.position.set(0, 3.8, -4);
    scene.add(yellowRimLight);

    // 5. Studio Reflective Floor
    const roadGeo = new THREE.PlaneGeometry(50, 50);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x090b10,
      roughness: 0.28,
      metalness: 0.12,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, 0);
    road.receiveShadow = true;
    scene.add(road);

    // Highway Shoulder Striping
    const shoulderGeo = new THREE.PlaneGeometry(0.08, 50);
    const shoulderMat = new THREE.MeshBasicMaterial({ color: 0x3d4352 });
    const shoulderL = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulderL.rotation.x = -Math.PI / 2;
    shoulderL.position.set(-4.2, 0.005, 0);
    scene.add(shoulderL);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 4.2;
    scene.add(shoulderR);

    // Center Dashes
    const dashGeo = new THREE.PlaneGeometry(0.2, 2.4);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffe500 });
    const dashCount = 12;
    const instancedDashes = new THREE.InstancedMesh(dashGeo, dashMat, dashCount);
    instancedDashes.rotation.x = -Math.PI / 2;
    instancedDashes.position.y = 0.01;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < dashCount; i++) {
      dummy.position.set(0, (i - dashCount / 2) * 4.2, 0);
      dummy.updateMatrix();
      instancedDashes.setMatrixAt(i, dummy.matrix);
    }
    instancedDashes.instanceMatrix.needsUpdate = true;
    scene.add(instancedDashes);

    // 6. Instantiate 3D Maruti Suzuki WagonR Model
    const carModel = createWagonRModel();
    scene.add(carModel.root);

    // Three references setup
    const initialStage = AUTOMOTIVE_STAGES[0];
    const initialZoom = isMob ? 1.25 : 1.0;
    const refs = {
      scene,
      camera,
      renderer,
      carModel,
      clock: new THREE.Clock(),
      targetCamPos: new THREE.Vector3(
        initialStage.cameraPosition[0] * initialZoom,
        initialStage.cameraPosition[1] * (isMob ? 1.15 : 1.0),
        initialStage.cameraPosition[2] * initialZoom
      ),
      targetCamLookAt: new THREE.Vector3(...initialStage.cameraTarget),
      currentCamLookAt: new THREE.Vector3(...initialStage.cameraTarget),
      targetCarRotationY: initialStage.carRotationY,
      currentCarRotationY: initialStage.carRotationY,
      targetBonnetAngle: 0,
      currentBonnetAngle: 0,
      targetDoorAngle: 0,
      currentDoorAngle: 0,
      targetWheelExplode: 0,
      currentWheelExplode: 0,
      isUserDragging: false,
      dragDeltaX: 0,
    };
    threeRefs.current = refs;

    // 7. Mouse & Touch Dragging for 360° Car Rotation
    let prevX = 0;
    const onMouseDown = (e: MouseEvent) => {
      refs.isUserDragging = true;
      prevX = e.clientX;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!refs.isUserDragging) return;
      const deltaX = e.clientX - prevX;
      prevX = e.clientX;
      refs.targetCarRotationY += deltaX * 0.0085;
    };

    const onMouseUp = () => {
      if (refs.isUserDragging) {
        refs.isUserDragging = false;
        container.style.cursor = "grab";
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        refs.isUserDragging = true;
        prevX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!refs.isUserDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevX;
      prevX = e.touches[0].clientX;
      refs.targetCarRotationY += deltaX * 0.0085;
    };

    const onTouchEnd = () => {
      refs.isUserDragging = false;
    };

    container.style.cursor = "grab";
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 8. GSAP ScrollTrigger Pinned Timeline (Desktop & Tablet > 900px)
    let scrollTriggerInstance: ScrollTrigger | null = null;
    const canPin = typeof window !== "undefined" && window.innerWidth > 900;

    if (canPin && sectionRef.current && pinContainerRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: window.innerWidth <= 1180 ? "+=4200" : "+=5200", // Pinned length for 10 scenes
        pin: pinContainerRef.current,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const stageIdx = Math.min(AUTOMOTIVE_STAGES.length - 1, Math.floor(progress * AUTOMOTIVE_STAGES.length));
          setCurrentStageIndex(stageIdx);

          // Interpolate stages smoothly within fractional progress
          const stageProgress = (progress * AUTOMOTIVE_STAGES.length) % 1;
          const s1 = AUTOMOTIVE_STAGES[stageIdx];
          const s2 = AUTOMOTIVE_STAGES[Math.min(AUTOMOTIVE_STAGES.length - 1, stageIdx + 1)];

          if (s1 && s2 && !refs.isUserDragging) {
            // Camera position interpolation
            const lerpedX = THREE.MathUtils.lerp(s1.cameraPosition[0], s2.cameraPosition[0], stageProgress);
            const lerpedY = THREE.MathUtils.lerp(s1.cameraPosition[1], s2.cameraPosition[1], stageProgress);
            const lerpedZ = THREE.MathUtils.lerp(s1.cameraPosition[2], s2.cameraPosition[2], stageProgress);
            refs.targetCamPos.set(lerpedX, lerpedY, lerpedZ);

            // Camera target interpolation
            const targetX = THREE.MathUtils.lerp(s1.cameraTarget[0], s2.cameraTarget[0], stageProgress);
            const targetY = THREE.MathUtils.lerp(s1.cameraTarget[1], s2.cameraTarget[1], stageProgress);
            const targetZ = THREE.MathUtils.lerp(s1.cameraTarget[2], s2.cameraTarget[2], stageProgress);
            refs.targetCamLookAt.set(targetX, targetY, targetZ);

            // Car rotation in Scene 01 (walkaround 360)
            if (stageIdx === 0) {
              refs.targetCarRotationY = s1.carRotationY + progress * AUTOMOTIVE_STAGES.length * Math.PI * 0.9;
            } else {
              refs.targetCarRotationY = THREE.MathUtils.lerp(s1.carRotationY, s2.carRotationY, stageProgress);
            }

            // Bonnet angle interpolation
            refs.targetBonnetAngle = THREE.MathUtils.lerp(s1.bonnetAngle, s2.bonnetAngle, stageProgress);

            // Driver door angle interpolation (Scene 04 opens, Scene 10 closes)
            refs.targetDoorAngle = THREE.MathUtils.lerp(s1.driverDoorAngle, s2.driverDoorAngle, stageProgress);

            // Wheel explode interpolation
            refs.targetWheelExplode = THREE.MathUtils.lerp(s1.wheelExplodeOffset, s2.wheelExplodeOffset, stageProgress);
          }
        },
      });
    }

    // 9. Animation Render Loop
    let animId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = refs.clock.getDelta();
      const elapsedTime = refs.clock.getElapsedTime();

      // Lerp camera position smoothly
      camera.position.lerp(refs.targetCamPos, 0.07);

      // Lerp camera lookAt smoothly
      refs.currentCamLookAt.lerp(refs.targetCamLookAt, 0.07);
      camera.lookAt(refs.currentCamLookAt);

      // Lerp car rotation smoothly
      refs.currentCarRotationY += (refs.targetCarRotationY - refs.currentCarRotationY) * 0.08;
      carModel.root.rotation.y = refs.currentCarRotationY;

      // Lerp bonnet, driver door & wheel explode
      refs.currentBonnetAngle += (refs.targetBonnetAngle - refs.currentBonnetAngle) * 0.09;
      refs.currentDoorAngle += (refs.targetDoorAngle - refs.currentDoorAngle) * 0.09;
      refs.currentWheelExplode += (refs.targetWheelExplode - refs.currentWheelExplode) * 0.09;

      // Update 3D Model parts with latest ref values
      carModel.updateAnimation({
        bonnetAngle: refs.currentBonnetAngle,
        driverDoorAngle: refs.currentDoorAngle,
        wheelExplodeOffset: refs.currentWheelExplode,
        pedals: pedalsStateRef.current,
        steeringAngle: steeringAngleRef.current,
        gearPosition: gearPositionRef.current,
        lights: lightsStateRef.current,
        time: elapsedTime,
        delta,
        speed: currentStageIndexRef.current === 9 ? 18 : 0, // Rolls gently in final celebration stage
      });

      // Animate road markings
      if (currentStageIndexRef.current === 9) {
        const offset = (elapsedTime * 3) % 4.2;
        for (let i = 0; i < dashCount; i++) {
          dummy.position.set(0, (i - dashCount / 2) * 4.2 + offset, 0);
          dummy.updateMatrix();
          instancedDashes.setMatrixAt(i, dummy.matrix);
        }
        instancedDashes.instanceMatrix.needsUpdate = true;
      }

      // Compute 2D Screen Positions for active Hotspots
      const projected: Record<string, { x: number; y: number; visible: boolean }> = {};
      const activeStage = AUTOMOTIVE_STAGES[currentStageIndexRef.current];

      if (activeStage && activeStage.hotspotIds) {
        activeStage.hotspotIds.forEach((id) => {
          const hotspot = COMPONENT_HOTSPOTS[id];
          if (!hotspot) return;

          tempVec.set(...hotspot.position3D);
          tempVec.applyMatrix4(carModel.root.matrixWorld);
          tempVec.project(camera);

          const isFront = tempVec.z < 1.0;
          const xPercent = (tempVec.x * 0.5 + 0.5) * 100;
          const yPercent = (-tempVec.y * 0.5 + 0.5) * 100;

          projected[id] = {
            x: Math.max(5, Math.min(95, xPercent)),
            y: Math.max(5, Math.min(95, yPercent)),
            visible: isFront,
          };
        });
        setScreenPositions(projected);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Responsive Resize Observer
    const handleResize = () => {
      const curW = window.innerWidth;
      setWindowWidth(curW);
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.fov = curW <= 900 ? 44 : 38;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      ScrollTrigger.refresh();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      threeRefs.current = null;
    };
  }, []);

  return (
    <section
      id="know-your-car"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--bg-primary)",
        color: "var(--text-white)",
        overflow: "hidden",
        paddingTop: isMobile ? "clamp(36px, 6vw, 56px)" : 0,
        paddingBottom: isMobile ? "clamp(36px, 6vw, 56px)" : 0,
      }}
    >
      {/* Pinned Scroll Container */}
      <div
        ref={pinContainerRef}
        style={{
          width: "100%",
          height: isMobile ? "auto" : "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "center",
          position: "relative",
          padding: isMobile ? "0" : "clamp(12px, 2vw, 24px)",
          boxSizing: "border-box",
        }}
      >
        {/* Background Ambient Glows */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "850px",
            height: "450px",
            background: "radial-gradient(circle, rgba(255, 229, 0, 0.07) 0%, rgba(8, 9, 12, 0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Top Section Header Banner */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? 0 : "clamp(14px, 2.5vw, 28px)",
            left: isMobile ? 0 : "clamp(20px, 3.5vw, 40px)",
            zIndex: 10,
            maxWidth: isMobile ? "100%" : "600px",
            marginBottom: isMobile ? "18px" : 0,
            padding: isMobile ? "0 18px" : 0,
            pointerEvents: isMobile ? "auto" : "none",
          }}
        >
          <div
            className="section-tag"
            style={{
              marginBottom: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--accent-yellow)",
                boxShadow: "0 0 10px var(--accent-yellow)",
              }}
            />
            STEP INSIDE YOUR FIRST DRIVING LESSON
          </div>
          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              margin: 0,
              color: "var(--text-white)",
            }}
          >
            KNOW YOUR WAGONR BEFORE YOU DRIVE.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
              color: "var(--text-muted)",
              margin: "4px 0 0",
            }}
          >
            Every control has a purpose. Every pedal has a technique. Explore India's #1 driving-school training car.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div
          className="container"
          style={{
            height: isMobile ? "auto" : "100%",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1.05fr 0.95fr"
              : "1.15fr 1fr",
            gap: isMobile ? "16px" : "clamp(16px, 2.5vw, 32px)",
            alignItems: isMobile ? "stretch" : "center",
            position: "relative",
            zIndex: 5,
            paddingTop: isMobile ? 0 : "clamp(80px, 12vh, 100px)",
          }}
        >
          {/* Left Column: Interactive 3D Canvas */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "clamp(260px, 40vh, 340px)" : "clamp(340px, 58vh, 680px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: isMobile ? "18px" : "24px",
              overflow: "hidden",
              border: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
              background: isMobile ? "rgba(10, 13, 20, 0.75)" : "transparent",
            }}
          >
            {/* Three.js Canvas Container */}
            <div
              ref={canvasMountRef}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
              }}
            />

            {/* 3D Interactive Hotspot Halos */}
            <InteractiveHotspots
              hotspotIds={currentStage.hotspotIds}
              screenPositions={screenPositions}
              selectedHotspotId={selectedHotspot?.id || null}
              onSelectHotspot={handleSelectHotspot}
            />

            {/* Drag 360 Indicator */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                background: "rgba(10, 13, 20, 0.75)",
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              ✦ DRAG TO ROTATE 360°
            </div>

            {/* Mobile Quick Stage Nav Arrows */}
            {isMobile && (
              <>
                <button
                  onClick={() => goToStage(currentStageIndex - 1)}
                  disabled={currentStageIndex === 0}
                  aria-label="Previous learning stage"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(10, 13, 20, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: currentStageIndex === 0 ? "var(--text-dim)" : "var(--accent-yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: currentStageIndex === 0 ? "not-allowed" : "pointer",
                    zIndex: 20,
                    opacity: currentStageIndex === 0 ? 0.3 : 1,
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => goToStage(currentStageIndex + 1)}
                  disabled={currentStageIndex === AUTOMOTIVE_STAGES.length - 1}
                  aria-label="Next learning stage"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(10, 13, 20, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color:
                      currentStageIndex === AUTOMOTIVE_STAGES.length - 1
                        ? "var(--text-dim)"
                        : "var(--accent-yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      currentStageIndex === AUTOMOTIVE_STAGES.length - 1
                        ? "not-allowed"
                        : "pointer",
                    zIndex: 20,
                    opacity: currentStageIndex === AUTOMOTIVE_STAGES.length - 1 ? 0.3 : 1,
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Right Column: Educational Information Panel */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "auto" : "clamp(340px, 58vh, 680px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <EducationalPanel
              currentStage={currentStage}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={handleSelectHotspot}
              onPrevStage={() => goToStage(currentStageIndex - 1)}
              onNextStage={() => goToStage(currentStageIndex + 1)}
              onSelectStage={(idx) => goToStage(idx)}
              onOpenManualMode={() => setIsManualModalOpen(true)}
              onExploreCourses={onExploreCourses}
              steeringAngle={steeringAngle}
              onSetSteeringAngle={setSteeringAngle}
              pedalsState={pedalsState}
              onTogglePedal={handleTogglePedal}
              gearPosition={gearPosition}
              onSelectGear={setGearPosition}
              lightsState={lightsState}
              onToggleLight={handleToggleLight}
              checklistState={checklistState}
              onToggleChecklistItem={handleToggleChecklistItem}
            />
          </div>
        </div>
      </div>

      {/* Manual Exploration Simulator Modal Overlay */}
      <ManualExplorationModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onSelectPresetView={handleSelectPresetView}
        onResetCamera={handleResetCamera}
        onSelectHotspot={handleSelectHotspot}
        selectedHotspot={selectedHotspot}
      />
    </section>
  );
};
