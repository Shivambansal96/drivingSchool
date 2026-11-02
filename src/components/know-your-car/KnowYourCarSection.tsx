import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createWagonRModel } from "./WagonRModel";
import type { WagonRCarModel } from "./WagonRModel";
import { AUTOMOTIVE_CHAPTERS, COMPONENT_CALLOUTS } from "../../data/automotiveCurriculum";
import type { ChapterConfig, ComponentCallout, GearPosition } from "../../types/automotive";
import { InteractiveCallouts } from "./InteractiveCallouts";
import { CockpitHudControls } from "./CockpitHudControls";

gsap.registerPlugin(ScrollTrigger);

interface KnowYourCarSectionProps {
  onExploreCourses: () => void;
}

export const KnowYourCarSection: React.FC<KnowYourCarSectionProps> = ({ onExploreCourses }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Active Chapter Index (0 to 5)
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [selectedCallout, setSelectedCallout] = useState<ComponentCallout | null>(null);

  // Chapter 2: Steering Wheel State
  const [steeringAngle, setSteeringAngle] = useState<number>(0);
  const [steeringExploded, setSteeringExploded] = useState<boolean>(false);

  // Chapter 3: Gear Lever State
  const [gearPosition, setGearPosition] = useState<GearPosition>("N");

  // Chapter 4: ABC Pedals State
  const [pedalsState, setPedalsState] = useState({
    clutch: false,
    brake: false,
    accel: false,
  });

  // Chapter 5: Handbrake State
  const [handbrakeEngaged, setHandbrakeEngaged] = useState<boolean>(true);

  // Chapter 6: Dashboard State
  const [dashboardState, setDashboardState] = useState({
    hazard: false,
    turnLeft: false,
    turnRight: false,
    headlights: false,
    tempWarning: false,
  });

  // Refs for animation loop to avoid Three.js recreation on state changes
  const pedalsStateRef = useRef(pedalsState);
  useEffect(() => {
    pedalsStateRef.current = pedalsState;
  }, [pedalsState]);

  const dashboardStateRef = useRef(dashboardState);
  useEffect(() => {
    dashboardStateRef.current = dashboardState;
  }, [dashboardState]);

  const steeringAngleRef = useRef(steeringAngle);
  useEffect(() => {
    steeringAngleRef.current = steeringAngle;
  }, [steeringAngle]);

  const steeringExplodedRef = useRef(steeringExploded);
  useEffect(() => {
    steeringExplodedRef.current = steeringExploded;
  }, [steeringExploded]);

  const gearPositionRef = useRef(gearPosition);
  useEffect(() => {
    gearPositionRef.current = gearPosition;
  }, [gearPosition]);

  const handbrakeEngagedRef = useRef(handbrakeEngaged);
  useEffect(() => {
    handbrakeEngagedRef.current = handbrakeEngaged;
  }, [handbrakeEngaged]);

  const currentChapterIndexRef = useRef(currentChapterIndex);
  useEffect(() => {
    currentChapterIndexRef.current = currentChapterIndex;
  }, [currentChapterIndex]);

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
    targetSteeringExplode: number;
    currentSteeringExplode: number;
    targetSteeringAngle: number;
    currentSteeringAngle: number;
    targetCarRotationY: number;
    currentCarRotationY: number;
    isUserDragging: boolean;
    dragDeltaX: number;
  } | null>(null);

  const currentChapter: ChapterConfig =
    AUTOMOTIVE_CHAPTERS[currentChapterIndex] || AUTOMOTIVE_CHAPTERS[0];

  // Helper: toggle ABC pedals
  const handleTogglePedal = (pedal: "clutch" | "brake" | "accel") => {
    setPedalsState((prev) => ({
      ...prev,
      [pedal]: !prev[pedal],
    }));

    // Auto-release after 950ms for realistic mechanical feedback
    setTimeout(() => {
      setPedalsState((prev) => ({
        ...prev,
        [pedal]: false,
      }));
    }, 950);
  };

  // Helper: toggle handbrake
  const handleToggleHandbrake = () => {
    setHandbrakeEngaged((prev) => !prev);
  };

  // Helper: toggle steering exploded view
  const handleToggleSteeringExplode = () => {
    setSteeringExploded((prev) => !prev);
    if (threeRefs.current) {
      threeRefs.current.targetSteeringExplode = !steeringExploded ? 1 : 0;
    }
  };

  // Helper: toggle dashboard switches
  const handleToggleDashboardSwitch = (key: keyof typeof dashboardState) => {
    setDashboardState((prev) => {
      if (key === "hazard") {
        return {
          ...prev,
          hazard: !prev.hazard,
          turnLeft: false,
          turnRight: false,
        };
      }
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  // Handle Callout Selection
  const handleSelectCallout = useCallback((callout: ComponentCallout | null) => {
    setSelectedCallout(callout);
    if (!threeRefs.current) return;

    if (callout) {
      threeRefs.current.carModel.highlightComponent(callout.id);
      const [hx, hy, hz] = callout.position3D;
      const focusTarget = new THREE.Vector3(hx * 0.8, hy, hz * 0.85);
      threeRefs.current.targetCamLookAt.copy(focusTarget);
    } else {
      threeRefs.current.carModel.highlightComponent(null);
    }
  }, []);

  // Programmatic chapter navigation
  const goToChapter = (chapterIdx: number) => {
    const clamped = Math.max(0, Math.min(AUTOMOTIVE_CHAPTERS.length - 1, chapterIdx));
    setCurrentChapterIndex(clamped);
    setSelectedCallout(null);

    const targetChapter = AUTOMOTIVE_CHAPTERS[clamped];
    if (threeRefs.current && targetChapter) {
      const refs = threeRefs.current;
      refs.carModel.highlightComponent(null);

      refs.targetCamPos.set(...targetChapter.cameraPosition);
      refs.targetCamLookAt.set(...targetChapter.cameraTarget);
      refs.targetSteeringExplode = targetChapter.steeringExplodeOffset;
      refs.targetSteeringAngle = targetChapter.steeringRotation;

      setSteeringExploded(targetChapter.steeringExplodeOffset > 0.5);
      setSteeringAngle(targetChapter.steeringRotation);
      setGearPosition(targetChapter.gearPosition);
      setPedalsState(targetChapter.pedals);
      setHandbrakeEngaged(targetChapter.handbrakeEngaged);
    }
  };

  const handleResetCamera = () => {
    goToChapter(currentChapterIndex);
  };

  // Three.js Scene Setup & GSAP ScrollTrigger Integration
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080a0f");
    scene.fog = new THREE.FogExp2(0x080a0f, 0.045);

    // 2. Camera: Begins directly inside RHD cabin in Chapter 1
    const isMob = window.innerWidth <= 900;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const initialChapter = AUTOMOTIVE_CHAPTERS[0];

    const camera = new THREE.PerspectiveCamera(
      initialChapter.cameraFov || (isMob ? 46 : 42),
      width / height,
      0.05,
      80
    );
    camera.position.set(...initialChapter.cameraPosition);
    camera.lookAt(new THREE.Vector3(...initialChapter.cameraTarget));

    // 3. Renderer with PBR support & ACESFilmic tone mapping
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
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    // 4. Cinematic Automotive Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key light entering through windscreen
    const mainKeyLight = new THREE.DirectionalLight(0xfff5e8, 2.4);
    mainKeyLight.position.set(0.35, 2.8, 2.6);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.001;
    scene.add(mainKeyLight);

    // Soft cabin bounce light
    const cabinFill = new THREE.PointLight(0xaaccff, 1.2, 4.5);
    cabinFill.position.set(0.35, 1.1, 0.2);
    scene.add(cabinFill);

    // Golden console rim light
    const yellowRimLight = new THREE.PointLight(0xffe500, 1.5, 3.8);
    yellowRimLight.position.set(0.0, 0.6, 0.4);
    scene.add(yellowRimLight);

    // Footwell courtesy light
    const footwellLight = new THREE.PointLight(0xffe500, 0.8, 1.6);
    footwellLight.position.set(0.35, 0.32, 0.65);
    scene.add(footwellLight);

    // 5. Instantiate 3D Maruti Suzuki WagonR Model
    const carModel = createWagonRModel();
    scene.add(carModel.root);

    // Three references setup
    const refs = {
      scene,
      camera,
      renderer,
      carModel,
      clock: new THREE.Clock(),
      targetCamPos: new THREE.Vector3(...initialChapter.cameraPosition),
      targetCamLookAt: new THREE.Vector3(...initialChapter.cameraTarget),
      currentCamLookAt: new THREE.Vector3(...initialChapter.cameraTarget),
      targetSteeringExplode: 0,
      currentSteeringExplode: 0,
      targetSteeringAngle: 0,
      currentSteeringAngle: 0,
      targetCarRotationY: 0,
      currentCarRotationY: 0,
      isUserDragging: false,
      dragDeltaX: 0,
    };
    threeRefs.current = refs;

    // 6. Mouse / Touch subtle orbit interaction
    let prevX = 0;
    let prevY = 0;
    const onMouseDown = (e: MouseEvent) => {
      refs.isUserDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!refs.isUserDragging) return;
      const deltaX = (e.clientX - prevX) * 0.0012;
      const deltaY = (e.clientY - prevY) * 0.0012;
      prevX = e.clientX;
      prevY = e.clientY;

      refs.targetCamLookAt.x += deltaX;
      refs.targetCamLookAt.y -= deltaY;
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
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!refs.isUserDragging || e.touches.length !== 1) return;
      const deltaX = (e.touches[0].clientX - prevX) * 0.0012;
      const deltaY = (e.touches[0].clientY - prevY) * 0.0012;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;

      refs.targetCamLookAt.x += deltaX;
      refs.targetCamLookAt.y -= deltaY;
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

    // 7. GSAP ScrollTrigger Pinned Continuous Timeline (Chapters 1 to 6)
    let scrollTriggerInstance: ScrollTrigger | null = null;
    const canPin = typeof window !== "undefined";

    if (canPin && sectionRef.current && pinContainerRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: window.innerWidth <= 900 ? "+=2800" : "+=4200",
        pin: pinContainerRef.current,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const numChapters = AUTOMOTIVE_CHAPTERS.length;
          const chapterIdx = Math.min(numChapters - 1, Math.floor(progress * numChapters));
          setCurrentChapterIndex(chapterIdx);

          const chapterProgress = (progress * numChapters) % 1;
          const c1 = AUTOMOTIVE_CHAPTERS[chapterIdx];
          const c2 = AUTOMOTIVE_CHAPTERS[Math.min(numChapters - 1, chapterIdx + 1)];

          if (c1 && c2 && !refs.isUserDragging) {
            // Camera position interpolation
            const lerpedX = THREE.MathUtils.lerp(c1.cameraPosition[0], c2.cameraPosition[0], chapterProgress);
            const lerpedY = THREE.MathUtils.lerp(c1.cameraPosition[1], c2.cameraPosition[1], chapterProgress);
            const lerpedZ = THREE.MathUtils.lerp(c1.cameraPosition[2], c2.cameraPosition[2], chapterProgress);
            refs.targetCamPos.set(lerpedX, lerpedY, lerpedZ);

            // Camera target interpolation
            const targetX = THREE.MathUtils.lerp(c1.cameraTarget[0], c2.cameraTarget[0], chapterProgress);
            const targetY = THREE.MathUtils.lerp(c1.cameraTarget[1], c2.cameraTarget[1], chapterProgress);
            const targetZ = THREE.MathUtils.lerp(c1.cameraTarget[2], c2.cameraTarget[2], chapterProgress);
            refs.targetCamLookAt.set(targetX, targetY, targetZ);

            // CHAPTER 2: Steering Wheel Exploded Separation along column rake
            if (chapterIdx === 1) {
              // During Chapter 2, separates forward then returns before Chapter 3
              const explodeCurve = Math.sin(chapterProgress * Math.PI);
              refs.targetSteeringExplode = explodeCurve;
              refs.targetSteeringAngle = Math.sin(chapterProgress * Math.PI * 2) * 0.45;
            } else {
              refs.targetSteeringExplode = THREE.MathUtils.lerp(
                c1.steeringExplodeOffset,
                c2.steeringExplodeOffset,
                chapterProgress
              );
              refs.targetSteeringAngle = THREE.MathUtils.lerp(
                c1.steeringRotation,
                c2.steeringRotation,
                chapterProgress
              );
            }

            // Sync gear position
            if (c1.gearPosition !== gearPositionRef.current) {
              setGearPosition(c1.gearPosition);
            }

            // Sync handbrake
            setHandbrakeEngaged(c1.handbrakeEngaged);
          }
        },
      });
    }

    // 8. Animation Render Loop
    let animId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = refs.clock.getDelta();
      const elapsedTime = refs.clock.getElapsedTime();

      // Smoothly lerp camera position
      camera.position.lerp(refs.targetCamPos, 0.08);

      // Smoothly lerp camera lookAt
      refs.currentCamLookAt.lerp(refs.targetCamLookAt, 0.08);
      camera.lookAt(refs.currentCamLookAt);

      // Smoothly lerp steering exploded offset
      refs.currentSteeringExplode += (refs.targetSteeringExplode - refs.currentSteeringExplode) * 0.12;

      // Smoothly lerp steering angle
      refs.currentSteeringAngle += (refs.targetSteeringAngle - refs.currentSteeringAngle) * 0.15;

      // Update 3D car model animation
      carModel.updateAnimation({
        steeringExplodeOffset: refs.currentSteeringExplode,
        steeringAngle: steeringAngleRef.current || refs.currentSteeringAngle,
        gearPosition: gearPositionRef.current,
        pedals: pedalsStateRef.current,
        handbrakeEngaged: handbrakeEngagedRef.current,
        lights: {
          headlights: dashboardStateRef.current.headlights,
          leftIndicator: dashboardStateRef.current.turnLeft,
          rightIndicator: dashboardStateRef.current.turnRight,
          hazard: dashboardStateRef.current.hazard,
          brakeLights: pedalsStateRef.current.brake,
        },
        dashboard: {
          tempWarning: dashboardStateRef.current.tempWarning,
          hazard: dashboardStateRef.current.hazard,
          speed: currentChapterIndexRef.current === 0 ? 0 : 45,
        },
        time: elapsedTime,
        delta,
      });

      // Project active Callout 3D Coordinates to 2D Screen Space
      const projected: Record<string, { x: number; y: number; visible: boolean }> = {};
      const activeChapter = AUTOMOTIVE_CHAPTERS[currentChapterIndexRef.current];

      if (activeChapter && activeChapter.calloutIds) {
        activeChapter.calloutIds.forEach((id) => {
          const callout = COMPONENT_CALLOUTS[id];
          if (!callout) return;

          tempVec.set(...callout.position3D);
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

    // 9. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
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
        width: "100%",
        background: "#080a0f",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Pinned Full-Screen Cinematic Viewport */}
      <div
        ref={pinContainerRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Full-Bleed Edge-to-Edge Three.js Canvas */}
        <div
          ref={canvasMountRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />

        {/* Floating Minimalist 3D Leader-Line Callout Pins */}
        <InteractiveCallouts
          calloutIds={currentChapter.calloutIds}
          screenPositions={screenPositions}
          selectedCalloutId={selectedCallout?.id || null}
          onSelectCallout={handleSelectCallout}
        />

        {/* Floating Minimalist Heads-Up Display (HUD) & Controls */}
        <CockpitHudControls
          currentChapter={currentChapter}
          selectedCallout={selectedCallout}
          onSelectCallout={handleSelectCallout}
          onPrevChapter={() => goToChapter(currentChapterIndex - 1)}
          onNextChapter={() => goToChapter(currentChapterIndex + 1)}
          onSelectChapter={goToChapter}
          onResetCamera={handleResetCamera}
          onExploreCourses={onExploreCourses}
          steeringAngle={steeringAngle}
          onSetSteeringAngle={setSteeringAngle}
          steeringExploded={steeringExploded}
          onToggleSteeringExplode={handleToggleSteeringExplode}
          gearPosition={gearPosition}
          onSelectGear={setGearPosition}
          pedalsState={pedalsState}
          onTogglePedal={handleTogglePedal}
          handbrakeEngaged={handbrakeEngaged}
          onToggleHandbrake={handleToggleHandbrake}
          dashboardState={dashboardState}
          onToggleDashboardSwitch={handleToggleDashboardSwitch}
        />
      </div>
    </section>
  );
};
