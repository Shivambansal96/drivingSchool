/**
 * Central Configuration for GHOSH MOTOR TRAINING SCHOOL
 * 
 * IMPORTANT: All contact details, phone numbers, addresses, and map embeds
 * use clearly designated placeholders until actual client details are provided.
 */

export const BRAND_CONFIG = {
  name: "GHOSH MOTOR TRAINING SCHOOL",
  tagline: "Your Road. Your Rules. Your Journey.",
  description:
    "Comprehensive professional driving academy offering structured 20-day training for Two-Wheelers, Four-Wheelers, and Heavy Commercial Vehicles, with dedicated morning batches and licensing assistance.",
  
  // Contact details
  phoneDisplay: "+91 91370 76236",
  phoneDial: "+919137076236",
  whatsappNumber: "919137076236", // Format for wa.me URL (country code without '+' or spaces)
  email: "admissions@ghoshmotortraining.example.com",
  
  address: "Sachitra Ghosh Sarani, Haider Para, Siliguri, West Bengal 734006",
  googleMapsLink: "https://maps.app.goo.gl/ecTPRdM3fXF6BTPGA",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.5741254152513!2d88.4359518!3d26.7260491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44109ac689b4f%3A0x956fcaf3184bea80!2sGhosh%20Motor%20Training%20School!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",

  // Operating Schedule
  schedule: {
    activeDays: "Monday to Saturday",
    activeSlots: [
      { time: "06:00 AM – 07:00 AM", label: "Batch 1: Dawn Session" },
      { time: "07:00 AM – 08:00 AM", label: "Batch 2: Golden Hour" },
      { time: "08:00 AM – 09:00 AM", label: "Batch 3: City Flow" },
    ],
    sundayStatus: "CLOSED",
    sundayNotice: "Sunday is reserved for vehicle fleet maintenance, safety inspections, and instructor rest.",
  },

  // Licence Assistance
  licenceAssistance: {
    price: 3000,
    priceFormatted: "₹3,000",
    termsNotice:
      "Assistance includes documentation, Parivahan filing support, LL test prep, and test track guidance. Licensing is subject to RTO approval and passing the government driving test.",
  },
};

/**
 * Generate a pre-filled WhatsApp link with URL encoded message
 */
export function createWhatsAppLink(options?: {
  planName?: string;
  price?: string;
  category?: string;
  timeSlot?: string;
  type?: "plan" | "licence" | "slot" | "general";
  userName?: string;
}): string {
  const base = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=`;
  let message = "";

  if (options?.type === "licence") {
    message = `Hello Ghosh Motor Training School, I am looking for Driving Licence Assistance (₹3,000 package). Please guide me with required documents and the next steps.`;
  } else if (options?.type === "slot" && options.timeSlot) {
    message = `Hello Ghosh Motor Training School, I would like to enquire about slot availability for the ${options.timeSlot} morning batch. Please share details.`;
  } else if (options?.planName) {
    const priceText = options.price ? ` (${options.price})` : "";
    message = `Hello Ghosh Motor Training School, I am interested in joining the ${options.planName}${priceText} driving course (20-day programme). Please share batch availability and admission details.`;
  } else {
    message = `Hello Ghosh Motor Training School, I am interested in joining your driving academy. Please share details about your available driving courses and admissions.`;
  }

  if (options?.userName) {
    message = `Name: ${options.userName}\n` + message;
  }

  return base + encodeURIComponent(message);
}
