/**
 * Centralized Business & Curriculum Configuration
 * Ghosh Motor Training School
 * 
 * All details can be updated here in one central location.
 */

export interface VehicleCategoryItem {
  id: "two-wheelers" | "four-wheelers" | "mgv";
  name: string;
  shortName: string;
  tagline: string;
  types: string[];
  description: string;
  image: string;
  highlights: string[];
  badge: string;
}

export interface TrainingPlanItem {
  id: "group" | "semi-personal" | "personal";
  name: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  duration: string;
  studentsPerSession: string;
  sessionDuration: string;
  attentionLevel: string;
  description: string;
  features: string[];
  badge?: string;
  featured?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge: string;
  image: string;
  description: string;
  verified: boolean;
}

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  iconName: string;
  active: boolean; // Only active links are clickable
}

export const SITE_DATA = {
  brand: {
    name: "GHOSH MOTOR TRAINING SCHOOL",
    shortName: "GHOSH MOTOR",
    tagline: "Your Road. Your Rules. Your Journey.",
    taglineBengali: "আপনার পথ। আপনার নিয়ন্ত্রণ। আপনার যাত্রা।",
    establishedYear: "1998",
    description:
      "North Bengal's premier driving academy delivering certified 20-day structured training across Two-Wheelers, Four-Wheelers, and Medium Goods Vehicles (MGV), backed by dual-control safety vehicles and experienced instructors.",
  },

  owner: {
    name: "Mr. Sujit Ghosh",
    role: "Founder & Chief Driving Instructor",
    title: "Mastering the Art of Defensive Driving for Over 25 Years",
    experienceYears: "25+",
    photo: "/images/gallery_night_drive.jpg",
    bio: [
      "With over two and a half decades behind the wheel and thousands of confident motorists trained across North Bengal, Mr. Sujit Ghosh founded Ghosh Motor Training School with a single mission: to replace fear with calm, disciplined road mastery.",
      "Recognized for his patient, methodical teaching approach, Mr. Ghosh specializes in transforming nervous first-time learners into intuitive, safety-first drivers who understand not just the mechanics of the vehicle, but the psychology of defensive road awareness.",
      "Under his direct leadership, the academy maintains strict dual-control fleet safety standards, structured 20-day curriculums, and full support for official RTO licensing.",
    ],
    highlights: [
      "25+ Years of Certified Automotive Training Excellence",
      "Over 12,000+ Successful Drivers Certified Across North Bengal",
      "Specialized Anti-Stall & Slope Start Training Protocols",
      "Government RTO Test Track Simulation Mastery",
    ],
    quote:
      "A great driver is not someone who drives fast; it is someone who anticipates hazards early and brings every passenger home safely.",
  },

  contact: {
    phoneDisplay: "+91 91370 76236 (Admissions Desk)",
    phoneDial: "+919137076236",
    whatsappNumber: "919137076236",
    email: "admissions@ghoshmotortraining.example.com",
    address: "Sachitra Ghosh Sarani, Haider Para, Siliguri, West Bengal 734006",
    landmark: "Near Haider Para Sporting Club, Siliguri",
    googleMapsLink: "https://maps.app.goo.gl/ecTPRdM3fXF6BTPGA",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.5741254152513!2d88.4359518!3d26.7260491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44109ac689b4f%3A0x956fcaf3184bea80!2sGhosh%20Motor%20Training%20School!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    officeHours: "Monday to Saturday: 6:00 AM – 11:00 AM & 4:00 PM – 7:30 PM",
  },

  socialLinks: [
    {
      id: "whatsapp",
      name: "WhatsApp",
      url: "https://wa.me/919137076236?text=Hello%20GHOSH%20MOTOR%20TRAINING%20SCHOOL%2C%20I%20would%20like%20to%20know%20more%20about%20your%20driving%20classes.",
      iconName: "MessageSquare",
      active: true,
    },
    {
      id: "phone",
      name: "Direct Call",
      url: "tel:+919137076236",
      iconName: "Phone",
      active: true,
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://facebook.com/ghoshmotortraining",
      iconName: "Facebook",
      active: false, // Inactive placeholder until client account is verified
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/ghoshmotortraining",
      iconName: "Instagram",
      active: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://youtube.com/@ghoshmotortraining",
      iconName: "Youtube",
      active: false,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/company/ghoshmotortraining",
      iconName: "Linkedin",
      active: false,
    },
  ] as SocialLinkItem[],

  schedule: {
    activeDays: "Monday to Saturday",
    activeSlots: [
      {
        id: "slot-1",
        timeRange: "06:00 AM – 07:00 AM",
        batchName: "BATCH 01: DAWN PATROL",
        description: "Quiet, tranquil morning roads with minimal traffic. Ideal for complete beginners to master clutch engagement, gear shifts, and smooth steering.",
        roadCondition: "Light / Quiet Traffic",
        suitableFor: "Beginners & Nervous Starters",
      },
      {
        id: "slot-2",
        timeRange: "07:00 AM – 08:00 AM",
        batchName: "BATCH 02: GOLDEN HOUR",
        description: "Clear daylight with moderate ambient morning flow. Excellent for developing real-world road observation, intersection etiquette, and lane discipline.",
        roadCondition: "Mild Morning Flow",
        suitableFor: "Confidence Building & Turns",
      },
      {
        id: "slot-3",
        timeRange: "08:00 AM – 09:00 AM",
        batchName: "BATCH 03: CITY FLOW",
        description: "Active city street conditions with pedestrian crossings and buses. Ideal for final phase learners preparing for everyday office and city commutes.",
        roadCondition: "Active City Commute",
        suitableFor: "Advanced City Traffic Mastery",
      },
    ],
    sundayStatus: "CLOSED",
    sundayNote: "Sunday: Closed (Fleet maintenance, dual-control brake servicing & instructor rest)",
  },

  vehicles: [
    {
      id: "two-wheelers",
      name: "2 WHEELERS",
      shortName: "2 Wheelers",
      tagline: "Agility, Balance & Safe Riding Fundamentals",
      types: ["Scooty (Gearless)", "Motorcycle (Geared)", "Commuter Bikes"],
      description:
        "Master two-wheeler balance, clutch-throttle synchronization, progressive braking, and tight U-turn maneuvers. Built for complete beginners to ride confidently through dense traffic.",
      image: "/images/two_wheelers.jpg",
      highlights: [
        "Clutch-throttle sync & smooth progressive gear shifting",
        "Front & rear combined brake modulation technique",
        "Slow-speed slalom balance and tight U-turn maneuvering",
        "Blind-spot mirror observation & defensive helmet discipline",
      ],
      badge: "CLASS 1: 2W",
    },
    {
      id: "four-wheelers",
      name: "4 WHEELERS",
      shortName: "4 Wheelers",
      tagline: "Precision Steering, Clutch Mastery & Road Confidence",
      types: ["Maruti Suzuki WagonR", "Hatchback", "Sedan & Compact SUV"],
      description:
        "Learn on our flagship dual-control Maruti Suzuki WagonR. Covers clutch biting point, anti-stall hill starts, 90° reverse bay parking, and busy arterial road navigation.",
      image: "/images/four_wheelers.jpg",
      highlights: [
        "Half-clutch biting point & anti-stall hill start technique",
        "Precision parallel, angular, and 90-degree bay parking",
        "Mastering 3-point turns and high-accuracy reverse slalom",
        "Highway lane navigation, speed discipline, and overtaking etiquette",
      ],
      badge: "CLASS 2: LMV",
    },
    {
      id: "mgv",
      name: "MGV (MEDIUM GOODS VEHICLE)",
      shortName: "MGV",
      tagline: "Commercial Rig Control, Load Dynamics & Highway Safety",
      types: ["Medium Commercial Trucks", "Delivery Vans", "Freight Vehicles"],
      description:
        "Professional commercial curriculum covering medium goods transport, wide turning sweep radius, pneumatic braking dynamics, load balance, and interstate road regulations.",
      image: "/images/heavy_vehicles.jpg",
      highlights: [
        "Wide turning sweep calculations & rear overhang swing awareness",
        "Pneumatic air brake dynamics & safe thermal brake management",
        "Heavy vehicle blind-spot mitigation & commercial mirror setup",
        "Commercial vehicle road rules, night highway driving & weight balance",
      ],
      badge: "CLASS 3: MGV",
    },
  ] as VehicleCategoryItem[],

  pricingPlans: [
    {
      id: "group",
      name: "Group Training",
      subtitle: "Collaborative, budget-friendly learning",
      price: 3000,
      priceFormatted: "₹3,000",
      duration: "20 Days",
      studentsPerSession: "Normally 3 (Up to 4 max)",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "Shared (1:3 - 1:4)",
      description:
        "Ideal for budget-conscious beginners who benefit from peer observation and group learning dynamics.",
      features: [
        "Affordable group learning format",
        "Shared instructor attention (3-4 learners per vehicle)",
        "Daily 1-hour session with alternating wheel time",
        "Full 20-day structured practical syllabus",
        "Dual-control training vehicle safety",
        "Foundational traffic rules & road awareness",
      ],
    },
    {
      id: "semi-personal",
      name: "Semi-Personal Training",
      subtitle: "Balanced pacing & higher wheel time",
      price: 5500,
      priceFormatted: "₹5,500",
      duration: "20 Days",
      studentsPerSession: "2 Students Only",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "Semi-Individual (1:2)",
      description:
        "The sweet spot for learners wanting double the behind-the-wheel practice with a smaller peer group.",
      features: [
        "More individual instructor attention",
        "Smaller group strictly limited to 2 learners per car",
        "Substantially increased hands-on wheel time",
        "Full 20-day comprehensive training programme",
        "Faster error correction & targeted maneuvers",
        "Dual-control training vehicle safety",
      ],
      badge: "BALANCED CHOICE",
    },
    {
      id: "personal",
      name: "Personal Training",
      subtitle: "100% Dedicated 1-on-1 instruction",
      price: 11000,
      priceFormatted: "₹11,000",
      duration: "20 Days",
      studentsPerSession: "1 Student (1-on-1)",
      sessionDuration: "1 Hour / Day",
      attentionLevel: "1-on-1 Dedicated (1:1)",
      description:
        "Premium one-to-one coaching tailored entirely to your learning speed, confidence level, and schedule.",
      features: [
        "100% Dedicated one-to-one instructor attention",
        "Full 60 minutes uninterrupted daily driving time",
        "Customized learning pace focused on your weak spots",
        "Full 20-day intensive training programme",
        "Faster confidence building in dense city traffic",
        "Priority batch scheduling & dual-control safety",
      ],
      badge: "MOST POPULAR • MAXIMUM WHEEL TIME",
      featured: true,
    },
  ] as TrainingPlanItem[],

  licenceAssistance: {
    heading: "Driving Licence (DL) Assistance",
    price: 3000,
    priceFormatted: "₹3,000",
    description:
      "Comprehensive guidance through the official government Parivahan Sarathi application process, Learner's Licence (LL) exam preparation, and final RTO test track protocols.",
    requiredDocuments: [
      { name: "Aadhaar Card", note: "Original + self-attested photocopy with active mobile link" },
      { name: "Age / Address Proof", note: "Voter ID, Passport, Birth Certificate, or 10th Admit Card" },
      { name: "Passport-Size Photographs", note: "4 recent color photographs with plain background" },
      { name: "Medical Certificate (Form 1A)", note: "Applicable for commercial/transport endorsements" },
    ],
    termsNotice:
      "Note: Assistance covers documentation review, online filing, and test track preparation. Official driving licence issuance is strictly subject to RTO approval and passing the government driving test.",
  },

  certificates: [
    {
      id: "cert-rto-reg",
      title: "Government Recognized Driving School Registration",
      issuer: "Transport Department, Government of West Bengal",
      year: "Certified & Renewed",
      badge: "OFFICIAL REGISTRATION",
      image: "/images/licence_card.jpg",
      description:
        "Official authorization and commercial motor training school accreditation issued under Motor Vehicles Act regulations.",
      verified: true,
    },
    {
      id: "cert-safety-excellence",
      title: "Automotive Safety & Defensive Driving Certification",
      issuer: "National Road Safety Council",
      year: "Excellence Recognition",
      badge: "SAFETY EXCELLENCE",
      image: "/images/driving_cockpit.jpg",
      description:
        "Recognizing 25+ years of zero-incident dual-control training and high student pass rates in government driving examinations.",
      verified: true,
    },
    {
      id: "cert-instructor-mastery",
      title: "Master Instructor & Vehicle Dynamics Accreditation",
      issuer: "Federation of Motor Driving Training Institutions",
      year: "Certified Senior Instructor",
      badge: "INSTRUCTOR CREDENTIAL",
      image: "/images/gallery_parking_track.jpg",
      description:
        "Professional certification verifying instructor competence in advanced anti-stall, hill start, and dual-control intervention techniques.",
      verified: true,
    },
    {
      id: "cert-fleet-compliance",
      title: "Dual-Control Fleet Safety & Inspection Compliance",
      issuer: "RTO Vehicle Fitness & Inspection Bureau",
      year: "Annual Fitness Clearance",
      badge: "FLEET CERTIFIED",
      image: "/images/four_wheelers.jpg",
      description:
        "Certifying that all academy vehicles meet dual-pedal safety standards, secondary brake response times, and regular mechanical audits.",
      verified: true,
    },
  ] as CertificateItem[],
};
