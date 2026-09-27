// =============================================================================
// CAMP LAWTON 2027 — NO-CODE CONFIGURATION ZONE
// =============================================================================
// Non-technical troop leaders and council staff can safely edit dates, fees,
// alert banners, and contact information below without editing HTML/DOM code.
//
// Source of truth: https://scoutingevent.com/011-ScoutCamp2027
// Direct Session 1: https://scoutingevent.com/011-116731-272748
// Direct Session 2: https://scoutingevent.com/011-116731-272749
// =============================================================================

export const CAMP_CONFIG = {
  seasonYear: 2027,
  campName: "Camp Lawton",
  councilName: "Catalina Council, Scouting America",
  establishedYear: 1921,
  elevationFeet: 7900,
  location: {
    address: "12900 E. Organization Ridge Rd, Tucson, AZ 85619",
    coordinates: { lat: 32.4033251, lng: -110.7214508 },
    phone: "520-750-0385",
    urgentSeasonalPhone: "520-576-1263",
    mailAddress: "Scout Name & Unit #, Camp Lawton, PO Box 786, Mt. Lemmon, AZ 85619",
  },

  // Primary Official Black Pug Registration Links
  urls: {
    blackPugMain: "https://scoutingevent.com/011-ScoutCamp2027",
    week1Direct: "https://scoutingevent.com/011-116731-272748",
    week2Direct: "https://scoutingevent.com/011-116731-272749",
    meritBadgeCatalogOneDrive: "https://1drv.ms/w/c/6d737b217ad523c0/IQB2ga1luoQQSJ4c4WdIL9O_AbtphBH2cBMBzctNXCaGVI4?e=92uqlH",
    medicalFormABC: "https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_ABC.pdf",
  },

  // Banner alerts (Set active to false to hide on the live site)
  alertBanner: {
    active: true,
    message: "2027 Registration is open! Sessions capped at 150 youth. Merit badge selection unlocks Feb 1, 2027!",
    ctaText: "Claim Your Spot on Black Pug ↗",
    ctaLink: "https://scoutingevent.com/011-ScoutCamp2027",
  },

  // 4-Tier USFS Coronado National Forest Fire Danger Scale:
  // "LOW" (Green), "MODERATE" (Yellow), "HIGH" (Orange), "EXTREME" (Red)
  currentFireDanger: "MODERATE",

  // 2027 Sessions (Strictly 150 youth participant cap per session)
  sessions: [
    {
      id: "week-1",
      number: 1,
      title: "Scouts BSA Summer Camp Week 1",
      dates: "June 6 – 12, 2027",
      arrival: "Sunday, June 6, 2027 at 2:00 PM MST",
      departure: "Saturday, June 12, 2027 at 10:00 AM MST",
      registrationCloses: "Sunday, May 23, 2027 at 11:59 PM MST",
      capacityCap: 150,
      unitLimit: "Limit one registration per unit",
      directRegistrationUrl: "https://scoutingevent.com/011-116731-272748",
    },
    {
      id: "week-2",
      number: 2,
      title: "Scouts BSA Summer Camp Week 2",
      dates: "June 13 – 19, 2027",
      arrival: "Sunday, June 13, 2027 at 2:00 PM MST",
      departure: "Saturday, June 19, 2027 at 10:00 AM MST",
      registrationCloses: "Sunday, May 30, 2027 at 11:59 PM MST",
      capacityCap: 150,
      unitLimit: "Limit one registration per unit",
      directRegistrationUrl: "https://scoutingevent.com/011-116731-272749",
    },
  ],

  // Fee Structure & Discounts
  fees: {
    youthDeposit: 40,
    inCouncil: {
      standardYouth: 400,
      earlyBirdTier1: {
        deadline: "12/31/2026",
        payAmount: 200,
        creditAmount: 200,
        note: "Pay $200 (including deposit) before 12/31/26 to be Paid In Full.",
      },
      earlyBirdTier2: {
        deadline: "03/31/2027",
        payAmount: 300,
        creditAmount: 100,
        note: "Pay $300 (including deposit) before 3/31/27 to be Paid In Full.",
      },
      adultLeader: 100,
      campershipMax: 360,
    },
    outOfCouncil: {
      standardYouth: 450,
      earlyBirdTier1: {
        deadline: "12/31/2026",
        discountAmount: 50,
        finalPay: 400,
        note: "$50 discount when registered and paid in full by 12/31/26.",
      },
      earlyBirdTier2: {
        deadline: "03/31/2027",
        discountAmount: 25,
        finalPay: 425,
        note: "$25 discount when registered and paid in full by 3/31/27.",
      },
      adultLeader: 100,
    },
    provisional: {
      youthInCouncil: 400,
      youthOutOfCouncil: 450,
      adult: 100,
      note: "For individual Scouts or units with fewer than 2 adult leaders.",
    },
    staff: {
      youthStaff: 0,
      adultStaff: 0,
    },
    included: [
      "Camping fees and tent platform site",
      "Full dining hall meal plan (basic plan; special plans available)",
      "Official 2027 Camp Lawton participant T-shirt and camp patch",
      "Merit badge instruction (supplies for select badges charged at badge sign-up)",
      "Evening campfires, patrol games, and campwide program",
    ],
  },

  // Key Milestones & Dates
  milestones: {
    earlyBirdTier1Deadline: "December 31, 2026",
    meritBadgeRegistrationOpens: "February 1, 2027",
    earlyBirdTier2Deadline: "March 31, 2027",
    campershipApplicationDeadline: "April 15, 2027",
    staffTrainingWeek: "May 28 – 30, 2027",
    week1RegClose: "May 23, 2027",
    week2RegClose: "May 30, 2027",
  },

  // Cancellation & Refund Rules
  refundPolicy: {
    fullRefundDays: 30,
    partialRefundDays: 14,
    partialRefundPercentage: 50,
    emergencyNote: "Cancellations within 2 weeks of camp require coordinator/staff advisor discretion (typically approved for medical or emergency cases).",
  },

  // 2027 Camp Theme
  theme: {
    title: "Pirate Crew Adventures",
    tagline: "Campsites are Ships · The Dining Hall is the Galley",
    honorSociety: "Tribe of Papago (Est. 1923)",
    unitExcellenceStandard: "The Barker Standard",
  },
};
