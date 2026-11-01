import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Gauge, Lightbulb, Palette, Zap } from "lucide-react";

const isWebGLAvailable = (): boolean => {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

export const Hero3DCar: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [paintColor, setPaintColor] = useState<string>("#FFE500"); // Racing Yellow default
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(64);
  const [rpm, setRpm] = useState<number>(3200);
  const [gear, setGear] = useState<string>("D4");
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [webGlSupported] = useState<boolean>(isWebGLAvailable);

  // References to Three.js elements for dynamic updates
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const paintColorRef = useRef<string>(paintColor);
  const headlightsLightRef = useRef<THREE.SpotLight | null>(null);
  const headlightsMeshRef = useRef<THREE.Mesh | null>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const roadLinesRef = useRef<THREE.InstancedMesh | null>(null);

  // Color options
  const colorOptions = [
    { name: "Electric Yellow", hex: "#FFE500" },
    { name: "Stealth Carbon", hex: "#171921" },
    { name: "Apex Silver", hex: "#CBD5E1" },
    { name: "Crimson Race", hex: "#EF4444" },
  ];

  // Update paint color when state changes
  useEffect(() => {
    paintColorRef.current = paintColor;
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.set(paintColor);
    }
  }, [paintColor]);

  // Update headlights
  useEffect(() => {
    if (headlightsLightRef.current) {
      headlightsLightRef.current.intensity = headlightsOn ? 4.5 : 0;
    }
    if (headlightsMeshRef.current && (headlightsMeshRef.current.material as THREE.MeshBasicMaterial)) {
      (headlightsMeshRef.current.material as THREE.MeshBasicMaterial).color.set(
        headlightsOn ? 0xffffff : 0x444444
      );
    }
  }, [headlightsOn]);

  // Throttle Rev Action
  const handleRevEngine = () => {
    if (isRevving) return;
    setIsRevving(true);
    setSpeed(118);
    setRpm(6800);
    setGear("D6");

    setTimeout(() => {
      setSpeed(85);
      setRpm(4200);
      setGear("D5");
    }, 1200);

    setTimeout(() => {
      setSpeed(64);
      setRpm(3200);
      setGear("D4");
      setIsRevving(false);
    }, 2400);
  };

  // Refs to decouple dynamic animation values from React render cycles
  const speedRef = useRef<number>(speed);
  const isRevvingRef = useRef<boolean>(isRevving);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    isRevvingRef.current = isRevving;
  }, [isRevving]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !webGlSupported) return;

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width || container.clientWidth || 600, 240);
      const h = Math.max(rect.height || container.clientHeight || 450, 240);
      return { w, h };
    };

    const { w: initialW, h: initialH } = getContainerSize();

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.032);

    // Camera
    const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 100);

    const updateCameraPosition = (aspect: number) => {
      if (aspect < 0.9) {
        // Narrow mobile portrait
        camera.position.set(4.8, 2.4, 5.8);
      } else if (aspect < 1.3) {
        // Tablet / square
        camera.position.set(4.1, 2.0, 5.0);
      } else {
        // Desktop widescreen
        camera.position.set(3.6, 1.8, 4.4);
      }
      camera.lookAt(0, 0.62, 0);
    };

    updateCameraPosition(initialW / initialH);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(initialW, initialH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting (Studio Showroom Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xccddff, 1.6);
    fillLight.position.set(-6, 6, 4);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    const rimLight = new THREE.DirectionalLight(0x00e5ff, 1.6);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    const underglowLight = new THREE.PointLight(0xffe500, 2.5, 6);
    underglowLight.position.set(0, 0.15, 0);
    scene.add(underglowLight);

    // Headlight Spot
    const headlightSpot = new THREE.SpotLight(0xffffff, 5.0, 26, Math.PI / 4, 0.45, 1);
    headlightSpot.position.set(0, 0.6, 2.2);
    headlightSpot.target.position.set(0, 0, 12);
    scene.add(headlightSpot);
    scene.add(headlightSpot.target);
    headlightsLightRef.current = headlightSpot;

    // ==========================================
    // BUILD 3D AUTOMOTIVE SPORTS SEDAN MODEL
    // ==========================================
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    // Car Body Material (Glossy Automotive Lacquer with Rich Specular Highlight)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paintColorRef.current),
      metalness: 0.52,
      roughness: 0.26,
    });
    bodyMaterialRef.current = bodyMat;

    // Dark trim / Carbon Fiber material
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x14161d,
      metalness: 0.4,
      roughness: 0.5,
    });

    // Glass material (Sleek Tinted Windshield & Windows)
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0e1320,
      metalness: 0.8,
      roughness: 0.08,
      transparent: true,
      opacity: 0.88,
    });

    // Lower Chassis / Main Body
    const lowerBodyGeo = new THREE.BoxGeometry(1.85, 0.45, 4.2);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMat);
    lowerBody.position.y = 0.52;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Front Nose / Hood taper
    const hoodGeo = new THREE.BoxGeometry(1.8, 0.28, 1.3);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0, 0.58, 1.45);
    hood.rotation.x = 0.06;
    hood.castShadow = true;
    carGroup.add(hood);

    // Cabin / Roof (Aerodynamic slope)
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.48, 2.1);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 0.92, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Top Shell
    const roofGeo = new THREE.BoxGeometry(1.44, 0.05, 1.8);
    const roof = new THREE.Mesh(roofGeo, bodyMat);
    roof.position.set(0, 1.17, -0.2);
    carGroup.add(roof);

    // Front Grille
    const grilleGeo = new THREE.BoxGeometry(1.5, 0.25, 0.1);
    const grille = new THREE.Mesh(grilleGeo, trimMat);
    grille.position.set(0, 0.48, 2.11);
    carGroup.add(grille);

    // Front Splitter / Aerodynamic Lip
    const splitterGeo = new THREE.BoxGeometry(1.9, 0.06, 0.4);
    const splitter = new THREE.Mesh(splitterGeo, trimMat);
    splitter.position.set(0, 0.28, 2.05);
    splitter.castShadow = true;
    carGroup.add(splitter);

    // Rear Diffuser & Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.65, 0.05, 0.25);
    const spoiler = new THREE.Mesh(spoilerGeo, trimMat);
    spoiler.position.set(0, 1.05, -2.05);
    carGroup.add(spoiler);

    const spoilerLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.1), trimMat);
    spoilerLeg1.position.set(0.6, 0.92, -2.05);
    carGroup.add(spoilerLeg1);
    const spoilerLeg2 = spoilerLeg1.clone();
    spoilerLeg2.position.set(-0.6, 0.92, -2.05);
    carGroup.add(spoilerLeg2);

    // Headlights (Dual Modern LED Strips)
    const hlGeo = new THREE.BoxGeometry(0.42, 0.1, 0.08);
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hlLeft = new THREE.Mesh(hlGeo, hlMat);
    hlLeft.position.set(0.65, 0.58, 2.11);
    carGroup.add(hlLeft);

    const hlRight = hlLeft.clone();
    hlRight.position.x = -0.65;
    carGroup.add(hlRight);
    headlightsMeshRef.current = hlLeft;

    // Rear Taillights (Futuristic Cyber Red Light Bar)
    const tlGeo = new THREE.BoxGeometry(1.65, 0.08, 0.08);
    const tlMat = new THREE.MeshBasicMaterial({ color: 0xff1e28 });
    const rearLightBar = new THREE.Mesh(tlGeo, tlMat);
    rearLightBar.position.set(0, 0.65, -2.11);
    carGroup.add(rearLightBar);

    // Side Mirrors
    const mirrorGeo = new THREE.BoxGeometry(0.24, 0.1, 0.14);
    const mirrorLeft = new THREE.Mesh(mirrorGeo, trimMat);
    mirrorLeft.position.set(0.92, 0.85, 0.5);
    carGroup.add(mirrorLeft);
    const mirrorRight = mirrorLeft.clone();
    mirrorRight.position.x = -0.92;
    carGroup.add(mirrorRight);

    // WHEELS (4 Detailed Sport Wheels with Rims & Brake Calipers)
    const wheels: THREE.Group[] = [];
    const wheelPositions = [
      { x: 0.95, y: 0.38, z: 1.35 },   // Front Right
      { x: -0.95, y: 0.38, z: 1.35 },  // Front Left
      { x: 0.95, y: 0.38, z: -1.35 },  // Rear Right
      { x: -0.95, y: 0.38, z: -1.35 }, // Rear Left
    ];

    const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 24);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.88,
      metalness: 0.15,
    });

    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.29, 14);
    rimGeo.rotateZ(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd8dbe2,
      metalness: 0.92,
      roughness: 0.22,
    });

    const caliperGeo = new THREE.BoxGeometry(0.08, 0.18, 0.12);
    const caliperMat = new THREE.MeshBasicMaterial({ color: 0xffe500 }); // Electric Yellow Caliper

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheelGroup.add(rim);

      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(pos.x > 0 ? 0.05 : -0.05, 0.1, 0);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
      wheels.push(wheelGroup);
    });

    wheelsRef.current = wheels;
    scene.add(carGroup);

    // ==========================================
    // ANIMATED HIGHWAY ROAD BENEATH CAR
    // ==========================================
    const roadWidth = 9;
    const roadLength = 50;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c12,
      roughness: 0.88,
      metalness: 0.12,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, 0);
    road.receiveShadow = true;
    scene.add(road);

    // Highway Shoulder Lines (Subtle glowing edges)
    const shoulderGeo = new THREE.PlaneGeometry(0.08, 50);
    const shoulderMat = new THREE.MeshBasicMaterial({ color: 0x404859 });
    const shoulderLeft = new THREE.Mesh(shoulderGeo, shoulderMat);
    shoulderLeft.rotation.x = -Math.PI / 2;
    shoulderLeft.position.set(-3.8, 0.005, 0);
    scene.add(shoulderLeft);

    const shoulderRight = shoulderLeft.clone();
    shoulderRight.position.x = 3.8;
    scene.add(shoulderRight);

    // Moving Road Center Lines
    const lineGeo = new THREE.PlaneGeometry(0.2, 2.5);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffe500 });
    const lineCount = 12;
    const instancedLines = new THREE.InstancedMesh(lineGeo, lineMat, lineCount);
    instancedLines.rotation.x = -Math.PI / 2;
    instancedLines.position.y = 0.01;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < lineCount; i++) {
      dummy.position.set(0, (i - lineCount / 2) * 4.2, 0);
      dummy.updateMatrix();
      instancedLines.setMatrixAt(i, dummy.matrix);
    }
    instancedLines.instanceMatrix.needsUpdate = true;
    scene.add(instancedLines);
    roadLinesRef.current = instancedLines;

    // Speed Particles / Road Dust
    const particleCount = 110;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = Math.random() * 2.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffe500,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // INTERACTION & MOUSE / TOUCH DRAG ROTATION
    // ==========================================
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = -0.42;
    let currentRotationY = -0.42;

    const updateCursor = (cursor: string) => {
      container.style.cursor = cursor;
    };

    updateCursor("grab");

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      updateCursor("grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      targetRotationY += deltaX * 0.0085;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        updateCursor("grab");
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      prevMouseX = e.touches[0].clientX;
      targetRotationY += deltaX * 0.0085;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ==========================================
    // ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const curSpeed = speedRef.current;
      const curRevving = isRevvingRef.current;

      // Smooth car rotation with gentle idle breathing when not dragging
      currentRotationY += (targetRotationY - currentRotationY) * 0.09;
      if (!isDragging) {
        carGroup.rotation.y = currentRotationY + Math.sin(elapsedTime * 0.7) * 0.04;
      } else {
        carGroup.rotation.y = currentRotationY;
      }

      // Suspension rumble / engine vibration
      const vibrationIntensity = curRevving ? 0.014 : 0.0025;
      carGroup.position.y = Math.sin(elapsedTime * 26) * vibrationIntensity;

      // Spin Wheels
      const spinSpeed = (curSpeed / 14) * delta;
      wheels.forEach((w) => {
        w.children[0].rotation.x += spinSpeed;
        w.children[1].rotation.x += spinSpeed;
      });

      // Animate Road Dashed Markings
      if (instancedLines) {
        const lineOffset = (elapsedTime * (curSpeed / 5.5)) % 4.2;
        for (let i = 0; i < lineCount; i++) {
          const zPos = (i - lineCount / 2) * 4.2 + lineOffset;
          dummy.position.set(0, zPos, 0);
          dummy.updateMatrix();
          instancedLines.setMatrixAt(i, dummy.matrix);
        }
        instancedLines.instanceMatrix.needsUpdate = true;
      }

      // Animate Particles
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 2; i < particleCount * 3; i += 3) {
        pos[i] -= delta * (curSpeed / 3);
        if (pos[i] < -12) pos[i] = 12;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Dynamic Underglow breathing
      underglowLight.intensity = 2.2 + Math.sin(elapsedTime * 4.5) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler with robust observer
    const handleResize = () => {
      if (!container) return;
      const { w, h } = getContainerSize();
      camera.aspect = w / h;
      updateCameraPosition(w / h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [webGlSupported]);

  return (
    <div className="hero-3d-car-container">
      {/* 3D WebGL Canvas Container */}
      {webGlSupported ? (
        <div
          ref={mountRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "grab",
          }}
          title="Drag to orbit 3D car"
        />
      ) : (
        /* Fallback high-res static render */
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/hero_car.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Floating Interactive Automotive HUD Controls (Bottom / Top Overlay) */}
      <div className="hud-controls-container">
        {/* Speedometer Telemetry Readout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingRight: "14px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Gauge size={18} color="var(--accent-yellow)" />
          <div style={{ fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-white)" }}>
              {speed}
            </span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginLeft: "4px" }}>
              KM/H
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              background: "var(--accent-yellow-dim)",
              color: "var(--accent-yellow)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: 700,
            }}
          >
            {gear}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              marginLeft: "2px",
            }}
          >
            {rpm} RPM
          </span>
        </div>

        {/* Rev Engine Throttle Button */}
        <button
          onClick={handleRevEngine}
          disabled={isRevving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: isRevving ? "var(--accent-yellow)" : "rgba(255, 229, 0, 0.15)",
            color: isRevving ? "#000000" : "var(--accent-yellow)",
            border: "1px solid rgba(255, 229, 0, 0.4)",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            fontFamily: "var(--font-display)",
            fontSize: "0.8rem",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          title="Click to rev the engine and accelerate simulation"
        >
          <Zap size={14} />
          {isRevving ? "THROTTLE ACTIVE!" : "REV THROTTLE"}
        </button>

        {/* Headlight Toggle */}
        <button
          onClick={() => setHeadlightsOn(!headlightsOn)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: headlightsOn ? "rgba(255, 255, 255, 0.15)" : "transparent",
            color: headlightsOn ? "var(--text-white)" : "var(--text-dim)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "6px 12px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
          title="Toggle LED headlights"
        >
          <Lightbulb size={13} color={headlightsOn ? "var(--accent-yellow)" : "currentColor"} />
          {headlightsOn ? "BEAMS ON" : "LIGHTS OFF"}
        </button>

        {/* Paint Color Swatches */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Palette size={14} color="var(--text-muted)" />
          {colorOptions.map((c) => (
            <button
              key={c.hex}
              onClick={() => setPaintColor(c.hex)}
              title={c.name}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: c.hex,
                border: paintColor === c.hex ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.3)",
                transform: paintColor === c.hex ? "scale(1.2)" : "scale(1)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Orbit Tip Tag */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-dim)",
          background: "rgba(10, 13, 20, 0.6)",
          padding: "4px 10px",
          borderRadius: "var(--radius-full)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
        }}
      >
        ✦ DRAG TO ROTATE 360°
      </div>
    </div>
  );
};
