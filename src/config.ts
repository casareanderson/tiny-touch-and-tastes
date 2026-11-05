// ---------------------------------------------------------------------------
// Tiny Touch & Tastes — single source of truth for site content & settings.
// Edit this file to change copy, prices, availability, links, and images.
// ---------------------------------------------------------------------------

import { withBase } from "./lib/paths";

export const site = {
  name: "Tiny Touch & Tastes",
  shortName: "Tiny Touch & Tastes",
  tagline: "Gentle baby massage & weaning support for new parents",
  // TODO: replace with your real domain when you launch.
  domain: "tinytouchandtastes.co.uk",
  url: "https://tinytouchandtastes.co.uk",

  // Where enquiries & waitlist signups are sent (set via RESEND + CONTACT_EMAIL).
  contactEmail: "hello@tinytouchandtastes.co.uk",

  // Social / review links — set these before launch.
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  // The URL parents use to leave you a Google review (your Google Business page).
  googleReviewUrl: "https://g.page/r/REPLACE-ME/review",

  // Coming-soon mode: shows the waiting-list flow instead of live booking.
  comingSoon: true,
  launchNote:
    "We're not quite open yet — join the waiting list and be first to hear when classes go live.",
} as const;

// ---------------------------------------------------------------------------
// Images. Placeholder SVGs live in /public/images so the site looks complete
// today. Drop your real photos into public/images/ and update the paths here.
// ---------------------------------------------------------------------------
export const images = {
  hero: withBase("/images/hero.svg"),
  founder: withBase("/images/founder-demi.svg"),
  babyMassage: withBase("/images/baby-massage.svg"),
  weaning: withBase("/images/weaning-workshop.svg"),
} as const;

// ---------------------------------------------------------------------------
// Courses & pricing.
// ---------------------------------------------------------------------------
export const babyMassage = {
  name: "Baby Massage",
  price: "£60",
  priceNote: "for a 4-week block",
  duration: "~90 minutes per class",
  blurb:
    "A warm, relaxed four-week course where you learn gentle massage strokes to soothe, settle and bond with your baby.",
  whatToExpect: [
    "A drink and light snacks for you, the grown-up",
    "Baby massage oil provided for every class",
    "Gentle, evidence-based strokes to support bonding, colic relief and sleep",
    "Time at the end to chat and get to know the other parents",
    "Optional beautiful photos of you and your baby together",
  ],
  benefits: [
    { title: "Bonding", text: "Tuned-in touch that deepens the connection between you and your baby." },
    { title: "Colic relief", text: "Gentle tummy strokes to ease trapped wind and settle a fussy tummy." },
    { title: "Sleep support", text: "Calming routines that help your baby wind down and rest more easily." },
    { title: "Confidence", text: "Learn to read your baby's cues in a calm, supportive space." },
  ],
} as const;

export const weaningWorkshop = {
  name: "Weaning Workshop",
  price: "£25",
  priceNote: "per class",
  duration: "Online session",
  blurb:
    "A practical, non-judgmental guide to starting solids — covering everything from first foods to allergens, gagging vs choking, and fussy eating.",
  curriculum: [
    {
      title: "Signs of readiness",
      text: "How to tell when your baby is truly ready for solids — sitting unsupported, loss of the tongue-thrust reflex, hand–eye–mouth coordination — and which signs (night-waking, chewing fists) are red herrings.",
    },
    {
      title: "Weaning approaches",
      text: "Traditional spoon-fed weaning with purées and mashes, baby-led weaning (BLW) with safe finger foods, and combined or hybrid feeding — so you can choose what suits your family.",
    },
    {
      title: "Safety, gagging & choking",
      text: "Telling normal gagging (a reflex) apart from choking, plus food-prep tips to reduce choke hazards — like slicing round foods lengthwise.",
    },
    {
      title: "First foods & nutrition",
      text: "Which foods to begin with — single vegetables, fruits and iron-rich foods — balancing solids with breast milk or formula, and supplements like vitamin D.",
    },
    {
      title: "Introducing allergens",
      text: "Safe timelines and strategies for high-allergy foods such as peanut butter, egg, dairy and sesame, introduced one at a time.",
    },
    {
      title: "Foods & ingredients to avoid",
      text: "Why to avoid honey (infant botulism risk), added salt and sugar, raw shellfish and unpasteurised dairy in early infancy.",
    },
    {
      title: "Equipment & preparation",
      text: "Recommended high chairs, bibs, spoons and mess mats, plus batch cooking, freezing and food hygiene.",
    },
    {
      title: "Preventing fussy eating",
      text: "Responsive feeding, handling food refusal without pressure, and building a positive mealtime environment.",
    },
  ],
} as const;
