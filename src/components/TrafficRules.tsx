import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  HelpCircle,
  Radio,
} from "lucide-react";
import type { TrafficSign, SafetyRule, QuizQuestion } from "../types";

export const TrafficRules: React.FC = () => {
  // Traffic Signal State (Red, Yellow, Green)
  const [activeSignal, setActiveSignal] = useState<"red" | "yellow" | "green">("red");
  const [autoSignalCycle, setAutoSignalCycle] = useState<boolean>(true);

  // Selected sign category filter
  const [signFilter, setSignFilter] = useState<"all" | "mandatory" | "cautionary" | "informatory">("all");

  // Traffic Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Auto-cycle traffic signal
  useEffect(() => {
    if (!autoSignalCycle) return;
    const interval = setInterval(() => {
      setActiveSignal((prev) => {
        if (prev === "red") return "green";
        if (prev === "green") return "yellow";
        return "red";
      });
    }, 3800);
    return () => clearInterval(interval);
  }, [autoSignalCycle]);

  // Traffic Signs Data
  const trafficSigns: TrafficSign[] = [
    {
      id: "stop",
      name: "STOP",
      category: "mandatory",
      shape: "octagon",
      meaning: "Vehicles must come to a complete stop before the stop line or pedestrian crossing.",
      actionRequired: "Halt completely, scan both directions, proceed only when clear.",
      svgType: "stop",
    },
    {
      id: "give-way",
      name: "GIVE WAY",
      category: "mandatory",
      shape: "triangle",
      meaning: "Yield priority to oncoming traffic on the main road before entering or merging.",
      actionRequired: "Slow down and stop if necessary to let other vehicles pass.",
      svgType: "give-way",
    },
    {
      id: "no-entry",
      name: "NO ENTRY",
      category: "mandatory",
      shape: "circle",
      meaning: "Traffic is strictly prohibited from entering this street or one-way lane.",
      actionRequired: "Do not drive past this sign under any circumstances.",
      svgType: "no-entry",
    },
    {
      id: "speed-limit",
      name: "SPEED LIMIT (50 KM/H)",
      category: "mandatory",
      shape: "circle",
      meaning: "Maximum permissible speed on this roadway is 50 km/h.",
      actionRequired: "Check speedometer and do not exceed the stated limit.",
      svgType: "speed-50",
    },
    {
      id: "u-turn-prohibited",
      name: "U-TURN PROHIBITED",
      category: "mandatory",
      shape: "circle",
      meaning: "Making a 180-degree turn is hazardous and illegal at this intersection or median.",
      actionRequired: "Proceed forward to the next designated turning junction.",
      svgType: "no-uturn",
    },
    {
      id: "no-parking",
      name: "NO PARKING",
      category: "mandatory",
      shape: "circle",
      meaning: "Parking vehicles along this curb or roadway section is strictly prohibited.",
      actionRequired: "You may momentarily halt to drop passengers, but cannot leave car parked.",
      svgType: "no-parking",
    },
    {
      id: "pedestrian-crossing",
      name: "PEDESTRIAN CROSSING",
      category: "cautionary",
      shape: "triangle",
      meaning: "Zebra crossing ahead. Pedestrians have right of way to cross the street.",
      actionRequired: "Reduce speed, be prepared to stop, never overtake at a zebra crossing.",
      svgType: "pedestrian",
    },
    {
      id: "school-ahead",
      name: "SCHOOL AHEAD",
      category: "cautionary",
      shape: "triangle",
      meaning: "School zone vicinity. Children may suddenly cross or step onto the road.",
      actionRequired: "Drop speed to 25 km/h or below and stay hyper-vigilant.",
      svgType: "school",
    },
    {
      id: "railway-crossing",
      name: "RAILWAY CROSSING",
      category: "cautionary",
      shape: "triangle",
      meaning: "Guarded or unguarded railway tracks intersecting the road ahead.",
      actionRequired: "Slow down, listen for train horns, never stop vehicle on tracks.",
      svgType: "railway",
    },
    {
      id: "hospital-ahead",
      name: "HOSPITAL AHEAD",
      category: "informatory",
      shape: "rectangle",
      meaning: "Medical care facility nearby. Strict silence zone.",
      actionRequired: "Refrain from unnecessary honking; give immediate passage to ambulances.",
      svgType: "hospital",
    },
  ];

  const filteredSigns =
    signFilter === "all"
      ? trafficSigns
      : trafficSigns.filter((s) => s.category === signFilter);

  // Road Safety Rules
  const safetyRules: SafetyRule[] = [
    {
      id: "r1",
      title: "Always Wear a Certified Helmet",
      summary: "Non-negotiable life protection for two-wheeler rider and pillion.",
      ruleDetail:
        "Fasten an ISI/DOT-certified full-face helmet with a snug chin strap. Over 70% of fatal two-wheeler trauma is prevented by compliant headgear.",
      category: "personal",
      importance: "MANDATORY",
    },
    {
      id: "r2",
      title: "Always Fasten Your Seatbelt",
      summary: "Three-point occupant restraint for all front and rear occupants.",
      ruleDetail:
        "Seatbelts hold you in the seat frame during sudden deceleration, preventing collision with the steering wheel, dashboard, or ejection.",
      category: "vehicle",
      importance: "MANDATORY",
    },
    {
      id: "r3",
      title: "Obey Stated Speed Limits",
      summary: "Speed is the single greatest determinant of stopping distance.",
      ruleDetail:
        "At 60 km/h your total braking distance is more than double that of 30 km/h. Always adapt speed to weather, rain, road surface, and pedestrian density.",
      category: "road",
      importance: "CRITICAL",
    },
    {
      id: "r4",
      title: "Zero Mobile Phone Use While Driving",
      summary: "Hands-free or handheld, phone usage drastically lowers reaction time.",
      ruleDetail:
        "Texting or talking on mobile increases accident risk by 400%. If an urgent call arrives, safely indicate and park at a designated bay.",
      category: "personal",
      importance: "CRITICAL",
    },
    {
      id: "r5",
      title: "Maintain a Safe 3-Second Following Gap",
      summary: "Buffer distance provides reaction time when the lead vehicle brakes.",
      ruleDetail:
        "Pick a fixed road marker ahead. When the vehicle in front passes it, you must take at least 3 seconds (5 in wet monsoon conditions) to reach it.",
      category: "road",
      importance: "VITAL",
    },
    {
      id: "r6",
      title: "Follow Lane Discipline & Indicate Early",
      summary: "Never swerve lanes abruptly or turn without signaling.",
      ruleDetail:
        "Mirror-Signal-Maneuver protocol. Turn on indicator lights at least 30 meters prior to changing lanes or executing turns at junctions.",
      category: "vehicle",
      importance: "MANDATORY",
    },
    {
      id: "r7",
      title: "Yield to Pedestrians at Crossings",
      summary: "Pedestrians are the most vulnerable road users.",
      ruleDetail:
        "Always slow down approaching zebra crossings. Stop completely if someone has stepped off the curb to cross.",
      category: "road",
      importance: "MANDATORY",
    },
    {
      id: "r8",
      title: "Zero Tolerance for Driving Under the Influence",
      summary: "Alcohol severely impairs depth perception and motor reflexes.",
      ruleDetail:
        "Operating any vehicle under the influence of alcohol or narcotics is a severe criminal offense with zero tolerance.",
      category: "personal",
      importance: "CRITICAL",
    },
    {
      id: "r9",
      title: "Always Carry Valid Driving Documents",
      summary: "Physical documents or verified government mParivahan/DigiLocker.",
      ruleDetail:
        "Mandatory 4 documents: Original Driving Licence, Vehicle Registration Certificate (RC), Valid Insurance Policy, and Pollution Under Control (PUC).",
      category: "vehicle",
      importance: "VITAL",
    },
  ];

  // 5 Realistic Quiz Questions
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does an inverted triangular road sign with a red border signify?",
      options: [
        "Speed Limit 50 km/h",
        "Give Way / Yield right of way to main road traffic",
        "No Entry for commercial trucks",
        "Narrow bridge ahead",
      ],
      correctIndex: 1,
      explanation:
        "An inverted triangle is the international symbol for GIVE WAY. You must slow down and give priority to vehicles on the intersecting road.",
      category: "Road Signs",
    },
    {
      id: 2,
      question: "What is the primary action required when approaching a flashing amber/yellow signal?",
      options: [
        "Accelerate quickly to clear the junction before it turns red",
        "Stop completely and wait for 2 minutes",
        "Slow down and proceed with extreme caution after ensuring the road is clear",
        "Make an immediate U-turn",
      ],
      correctIndex: 2,
      explanation:
        "A flashing amber light instructs drivers to slow down, look both ways, and proceed across the intersection with caution.",
      category: "Traffic Signals",
    },
    {
      id: 3,
      question: "What is the recommended safe following distance in normal dry weather conditions?",
      options: [
        "0.5 seconds / touching bumpers",
        "Minimum 3 seconds between your car and the vehicle ahead",
        "10 car lengths regardless of speed",
        "No distance is required in city limits",
      ],
      correctIndex: 1,
      explanation:
        "The standard defensive driving rule is the 3-Second Rule, which accounts for human perception delay and mechanical braking distance.",
      category: "Defensive Driving",
    },
    {
      id: 4,
      question: "At an uncontrolled roundabout or intersection, which vehicle typically has right of way?",
      options: [
        "The biggest vehicle on the road",
        "Traffic already inside the roundabout or coming from your right",
        "The vehicle driving at the highest speed",
        "Vehicles entering without indicating",
      ],
      correctIndex: 1,
      explanation:
        "Vehicles already circulating inside the roundabout or approaching from the right have right of way before you enter.",
      category: "Right of Way",
    },
    {
      id: 5,
      question: "Which of the following documents is NOT mandatory to carry while driving in India?",
      options: [
        "Valid Driving Licence (DL)",
        "Vehicle Registration Certificate (RC)",
        "Valid Insurance & Pollution Under Control (PUC) certificate",
        "Original Vehicle Purchase Invoice / Cash Receipt",
      ],
      correctIndex: 3,
      explanation:
        "The purchase invoice is not required. You only need your valid DL, RC, active Insurance, and updated PUC certificate (physical or DigiLocker/mParivahan).",
      category: "Legal & Documentation",
    },
  ];

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 4) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFE500", "#10B981", "#ffffff"],
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <section id="traffic-rules" className="section-spacing" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">EDUCATION & ROAD SAFETY</div>
          <h2 className="section-title">KNOW THE RULES. OWN THE ROAD.</h2>
          <p className="section-subtitle">
            True driving mastery is not just mechanical vehicle control — it is complete situational
            awareness, respecting traffic laws, and defensive habits that keep everyone safe.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PART 1: INTERACTIVE TRAFFIC SIGNAL SIMULATOR */}
        {/* ========================================================= */}
        <div
          className="glass-card"
          style={{
            padding: "36px",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, rgba(18, 22, 32, 0.9) 0%, rgba(10, 12, 18, 0.95) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "clamp(20px, 3.5vw, 36px)",
              alignItems: "center",
            }}
          >
            {/* Visual Traffic Signal Light Housing */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#0c0d12",
                  border: "3px solid #222634",
                  borderRadius: "28px",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.8), inset 0 2px 10px rgba(0,0,0,0.9)",
                  width: "120px",
                }}
              >
                {/* Red Light */}
                <button
                  onClick={() => {
                    setActiveSignal("red");
                    setAutoSignalCycle(false);
                  }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      activeSignal === "red"
                        ? "radial-gradient(circle, #ff5252 0%, #d50000 70%)"
                        : "#2a1515",
                    boxShadow:
                      activeSignal === "red"
                        ? "0 0 35px #ff1744, inset 0 0 15px rgba(255,255,255,0.6)"
                        : "inset 0 4px 8px rgba(0,0,0,0.6)",
                    border: activeSignal === "red" ? "2px solid #ffffff" : "2px solid #331515",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  title="Click to activate RED signal"
                />

                {/* Yellow Light */}
                <button
                  onClick={() => {
                    setActiveSignal("yellow");
                    setAutoSignalCycle(false);
                  }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      activeSignal === "yellow"
                        ? "radial-gradient(circle, #ffe500 0%, #ffab00 70%)"
                        : "#2a2612",
                    boxShadow:
                      activeSignal === "yellow"
                        ? "0 0 35px #ffd600, inset 0 0 15px rgba(255,255,255,0.6)"
                        : "inset 0 4px 8px rgba(0,0,0,0.6)",
                    border: activeSignal === "yellow" ? "2px solid #ffffff" : "2px solid #332d12",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  title="Click to activate YELLOW signal"
                />

                {/* Green Light */}
                <button
                  onClick={() => {
                    setActiveSignal("green");
                    setAutoSignalCycle(false);
                  }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      activeSignal === "green"
                        ? "radial-gradient(circle, #00e676 0%, #00c853 70%)"
                        : "#122a18",
                    boxShadow:
                      activeSignal === "green"
                        ? "0 0 35px #00e676, inset 0 0 15px rgba(255,255,255,0.6)"
                        : "inset 0 4px 8px rgba(0,0,0,0.6)",
                    border: activeSignal === "green" ? "2px solid #ffffff" : "2px solid #13331b",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  title="Click to activate GREEN signal"
                />
              </div>

              {/* Cycle Mode Switch */}
              <button
                onClick={() => setAutoSignalCycle(!autoSignalCycle)}
                style={{
                  marginTop: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: autoSignalCycle ? "var(--accent-yellow)" : "var(--text-muted)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Radio size={12} color={autoSignalCycle ? "var(--accent-yellow)" : "currentColor"} />
                {autoSignalCycle ? "AUTO CYCLE: ON" : "AUTO CYCLE: OFF (MANUAL)"}
              </button>
            </div>

            {/* Signal Rule Explanation Card */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--accent-yellow)",
                  background: "var(--accent-yellow-dim)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "14px",
                }}
              >
                INTERACTIVE TRAFFIC SIGNAL PROTOCOL
              </div>

              {activeSignal === "red" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--accent-red)",
                      marginBottom: "12px",
                    }}
                  >
                    RED: STOP
                  </h3>
                  <p style={{ fontSize: "1rem", color: "var(--text-white)", lineHeight: 1.6, marginBottom: "16px" }}>
                    Come to a complete and steady stop behind the painted white stop line or zebra
                    crossing before entering the intersection.
                  </p>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "var(--text-body)" }}>
                    <li>Do not creep forward across the pedestrian zebra line.</li>
                    <li>Wait patiently without revving engine; shifting to neutral saves fuel and clutch wear.</li>
                    <li>Free left turn is only permissible if explicitly marked with a green arrow filter.</li>
                  </ul>
                </div>
              )}

              {activeSignal === "yellow" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--accent-yellow)",
                      marginBottom: "12px",
                    }}
                  >
                    YELLOW: GET READY / CAUTION
                  </h3>
                  <p style={{ fontSize: "1rem", color: "var(--text-white)", lineHeight: 1.6, marginBottom: "16px" }}>
                    Amber warns that the red phase is imminent. Clear the intersection if already
                    crossing, or prepare to halt safely if you can do so without skidding.
                  </p>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "var(--text-body)" }}>
                    <li><strong>Never accelerate</strong> to "beat" a yellow light — this causes fatal T-bone collisions.</li>
                    <li>If already across the stop line when amber illuminates, proceed through with steady speed.</li>
                    <li>Prepare behind the wheel by engaging 1st gear only when amber transitions to green.</li>
                  </ul>
                </div>
              )}

              {activeSignal === "green" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--accent-green)",
                      marginBottom: "12px",
                    }}
                  >
                    GREEN: GO WHEN SAFE
                  </h3>
                  <p style={{ fontSize: "1rem", color: "var(--text-white)", lineHeight: 1.6, marginBottom: "16px" }}>
                    You may proceed across the intersection, provided the way is clear and no
                    pedestrians or emergency vehicles are in transit.
                  </p>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "var(--text-body)" }}>
                    <li>Check left and right before accelerating; late cross-traffic runners are common.</li>
                    <li>Ensure the road ahead has enough clearance so you do not block the junction box.</li>
                    <li>Turning vehicles must yield to oncoming traffic and pedestrians crossing the turn road.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: TRAFFIC SIGNS DIRECTORY */}
        {/* ========================================================= */}
        <div style={{ marginBottom: "70px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-white)" }}>
                Standard Road Signs Directory
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Click on any category to explore official Indian road sign specifications.
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                background: "rgba(0,0,0,0.3)",
                padding: "4px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                { id: "all", label: "All Signs" },
                { id: "mandatory", label: "Mandatory" },
                { id: "cautionary", label: "Cautionary" },
                { id: "informatory", label: "Informatory" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSignFilter(tab.id as any)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: signFilter === tab.id ? "var(--accent-yellow)" : "transparent",
                    color: signFilter === tab.id ? "#000000" : "var(--text-muted)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Signs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "clamp(16px, 2.5vw, 22px)",
            }}
          >
            {filteredSigns.map((s) => (
              <div
                key={s.id}
                className="glass-card"
                style={{
                  padding: "22px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(14, 18, 28, 0.8)",
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                }}
              >
                {/* SVG Sign Graphic */}
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* STOP: Octagon */}
                  {s.svgType === "stop" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <polygon
                        points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
                        fill="#D50000"
                        stroke="#ffffff"
                        strokeWidth="4"
                      />
                      <text
                        x="50"
                        y="60"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="24"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                      >
                        STOP
                      </text>
                    </svg>
                  )}

                  {/* GIVE WAY: Inverted Triangle */}
                  {s.svgType === "give-way" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <polygon points="10,15 90,15 50,85" fill="#ffffff" stroke="#D50000" strokeWidth="12" />
                    </svg>
                  )}

                  {/* NO ENTRY: Red Circle with White Bar */}
                  {s.svgType === "no-entry" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="#D50000" stroke="#ffffff" strokeWidth="3" />
                      <rect x="18" y="42" width="64" height="16" fill="#ffffff" rx="3" />
                    </svg>
                  )}

                  {/* SPEED 50 */}
                  {s.svgType === "speed-50" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#D50000" strokeWidth="10" />
                      <text
                        x="50"
                        y="62"
                        textAnchor="middle"
                        fill="#000000"
                        fontSize="36"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                      >
                        50
                      </text>
                    </svg>
                  )}

                  {/* NO U-TURN */}
                  {s.svgType === "no-uturn" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#D50000" strokeWidth="10" />
                      <path
                        d="M36 68 V38 A14 14 0 0 1 64 38 V65"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="6"
                      />
                      <polygon points="28,45 36,32 44,45" fill="#000000" />
                      <line x1="20" y1="20" x2="80" y2="80" stroke="#D50000" strokeWidth="8" />
                    </svg>
                  )}

                  {/* NO PARKING */}
                  {s.svgType === "no-parking" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="#1565C0" stroke="#D50000" strokeWidth="10" />
                      <text
                        x="50"
                        y="62"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="40"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                      >
                        P
                      </text>
                      <line x1="20" y1="20" x2="80" y2="80" stroke="#D50000" strokeWidth="8" />
                    </svg>
                  )}

                  {/* PEDESTRIAN CROSSING */}
                  {s.svgType === "pedestrian" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <polygon points="50,10 90,85 10,85" fill="#ffffff" stroke="#D50000" strokeWidth="8" />
                      <circle cx="50" cy="40" r="6" fill="#000000" />
                      <line x1="50" y1="46" x2="50" y2="62" stroke="#000000" strokeWidth="4" />
                      <line x1="42" y1="52" x2="58" y2="52" stroke="#000000" strokeWidth="4" />
                      <line x1="50" y1="62" x2="42" y2="76" stroke="#000000" strokeWidth="4" />
                      <line x1="50" y1="62" x2="58" y2="76" stroke="#000000" strokeWidth="4" />
                    </svg>
                  )}

                  {/* SCHOOL AHEAD */}
                  {s.svgType === "school" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <polygon points="50,10 90,85 10,85" fill="#ffffff" stroke="#D50000" strokeWidth="8" />
                      <circle cx="42" cy="38" r="5" fill="#000000" />
                      <circle cx="60" cy="48" r="4" fill="#000000" />
                      <line x1="42" y1="44" x2="42" y2="64" stroke="#000000" strokeWidth="3" />
                      <line x1="60" y1="52" x2="60" y2="68" stroke="#000000" strokeWidth="3" />
                      <line x1="34" y1="74" x2="68" y2="74" stroke="#000000" strokeWidth="3" />
                    </svg>
                  )}

                  {/* RAILWAY */}
                  {s.svgType === "railway" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <polygon points="50,10 90,85 10,85" fill="#ffffff" stroke="#D50000" strokeWidth="8" />
                      <rect x="36" y="44" width="28" height="24" fill="#000000" rx="2" />
                      <circle cx="43" cy="72" r="4" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                      <circle cx="57" cy="72" r="4" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                    </svg>
                  )}

                  {/* HOSPITAL */}
                  {s.svgType === "hospital" && (
                    <svg width="64" height="64" viewBox="0 0 100 100">
                      <rect x="10" y="10" width="80" height="80" rx="8" fill="#1565C0" stroke="#ffffff" strokeWidth="3" />
                      <text
                        x="50"
                        y="66"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="46"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                      >
                        H
                      </text>
                    </svg>
                  )}
                </div>

                {/* Sign Text Details */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color:
                          s.category === "mandatory"
                            ? "var(--accent-red)"
                            : s.category === "cautionary"
                            ? "var(--accent-yellow)"
                            : "var(--accent-cyan)",
                      }}
                    >
                      {s.category}
                    </span>
                  </div>

                  <h5
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      marginBottom: "4px",
                    }}
                  >
                    {s.name}
                  </h5>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-body)",
                      lineHeight: 1.45,
                      marginBottom: "6px",
                    }}
                  >
                    {s.meaning}
                  </p>

                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--text-muted)",
                      fontStyle: "italic",
                    }}
                  >
                    Action: {s.actionRequired}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 3: ROAD SAFETY RULES (VISUAL CARDS) */}
        {/* ========================================================= */}
        <div style={{ marginBottom: "70px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-white)" }}>
              Core Road Safety Fundamentals
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "6px" }}>
              Practiced daily at Ghosh Motor Training School to instill lifelong defensive driving habits.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(16px, 2.5vw, 22px)",
            }}
          >
            {safetyRules.map((rule) => (
              <div
                key={rule.id}
                className="glass-card"
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(16, 20, 30, 0.75)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background:
                          rule.importance === "CRITICAL"
                            ? "rgba(239, 68, 68, 0.15)"
                            : "rgba(255, 229, 0, 0.1)",
                        color:
                          rule.importance === "CRITICAL"
                            ? "var(--accent-red)"
                            : "var(--accent-yellow)",
                        border:
                          rule.importance === "CRITICAL"
                            ? "1px solid rgba(239, 68, 68, 0.3)"
                            : "1px solid rgba(255, 229, 0, 0.3)",
                      }}
                    >
                      {rule.importance}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--text-dim)",
                        textTransform: "uppercase",
                      }}
                    >
                      {rule.category}
                    </span>
                  </div>

                  <h5
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "var(--text-white)",
                      marginBottom: "6px",
                    }}
                  >
                    {rule.title}
                  </h5>

                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--accent-yellow)",
                      marginBottom: "10px",
                    }}
                  >
                    {rule.summary}
                  </div>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-body)", lineHeight: 1.55 }}>
                    {rule.ruleDetail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 4: MINI INTERACTIVE TRAFFIC QUIZ */}
        {/* ========================================================= */}
        <div
          className="glass-card"
          style={{
            padding: "36px",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(135deg, rgba(22, 28, 42, 0.95) 0%, rgba(12, 14, 22, 0.98) 100%)",
            border: "1px solid rgba(255, 229, 0, 0.25)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "28px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  color: "var(--accent-yellow)",
                  marginBottom: "6px",
                }}
              >
                <HelpCircle size={14} />
                INTERACTIVE SKILL TEST
              </div>
              <h4 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-white)" }}>
                Mini Traffic & Road Rules Quiz
              </h4>
            </div>

            {quizSubmitted && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: quizScore >= 4 ? "var(--accent-green)" : "var(--accent-yellow)",
                  }}
                >
                  Your Score: {quizScore} / {quizQuestions.length}
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="btn btn-secondary"
                  style={{ padding: "8px 16px", fontSize: "0.8rem" }}
                >
                  <RotateCcw size={14} />
                  Retry Quiz
                </button>
              </div>
            )}
          </div>

          {/* Questions List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "32px" }}>
            {quizQuestions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];

              return (
                <div
                  key={q.id}
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "22px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "var(--accent-yellow)",
                        background: "var(--accent-yellow-dim)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      Q{qIndex + 1}
                    </span>
                    <h5
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--text-white)",
                        lineHeight: 1.4,
                      }}
                    >
                      {q.question}
                    </h5>
                  </div>

                  {/* Options */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                      gap: "10px",
                    }}
                  >
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      const isCorrect = q.correctIndex === optIndex;

                      let btnStyle: React.CSSProperties = {
                        padding: "12px 16px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        background: isSelected ? "rgba(255, 229, 0, 0.15)" : "rgba(255, 255, 255, 0.03)",
                        color: isSelected ? "var(--accent-yellow)" : "var(--text-body)",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        cursor: quizSubmitted ? "default" : "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        wordBreak: "break-word",
                      };

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle.background = "rgba(16, 185, 129, 0.2)";
                          btnStyle.borderColor = "var(--accent-green)";
                          btnStyle.color = "#ffffff";
                        } else if (isSelected && !isCorrect) {
                          btnStyle.background = "rgba(239, 68, 68, 0.2)";
                          btnStyle.borderColor = "var(--accent-red)";
                          btnStyle.color = "#ffffff";
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectAnswer(q.id, optIndex)}
                          style={btnStyle}
                          disabled={quizSubmitted}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <CheckCircle size={16} color="var(--accent-green)" />}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <XCircle size={16} color="var(--accent-red)" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation once submitted */}
                  {quizSubmitted && (
                    <div
                      style={{
                        marginTop: "14px",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background:
                          selectedOpt === q.correctIndex
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                        border:
                          selectedOpt === q.correctIndex
                            ? "1px solid rgba(16, 185, 129, 0.3)"
                            : "1px solid rgba(239, 68, 68, 0.3)",
                        fontSize: "0.82rem",
                        color: "var(--text-white)",
                        lineHeight: 1.45,
                      }}
                    >
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length < quizQuestions.length}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "0.95rem",
                opacity: Object.keys(userAnswers).length < quizQuestions.length ? 0.5 : 1,
                cursor: Object.keys(userAnswers).length < quizQuestions.length ? "not-allowed" : "pointer",
              }}
            >
              {Object.keys(userAnswers).length < quizQuestions.length
                ? `Answer all questions to submit (${Object.keys(userAnswers).length}/${quizQuestions.length})`
                : "Submit Quiz & Check Results"}
            </button>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "rgba(255, 229, 0, 0.08)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 229, 0, 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-white)",
                  marginBottom: "4px",
                }}
              >
                {quizScore >= 4 ? "Excellent Road Knowledge!" : "Good Effort! Keep Learning Road Rules."}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Our 20-day training curriculum reinforces all of these principles behind the wheel.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
