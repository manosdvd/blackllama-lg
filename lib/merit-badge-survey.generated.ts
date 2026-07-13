// Generated from masterMB.csv by scripts/generate-merit-badge-survey.mjs. Do not edit directly.
export type SurveyTier = "S" | "A" | "B" | "C" | "D";
export type CampCompletion = "complete" | "conditional" | "partial";
export type MeritBadgeSurveyItem = {
  id: string;
  title: string;
  sourceTitle: string;
  tier: SurveyTier;
  area: "STEM" | "Nature" | "Outdoor Skills" | "Handicraft" | "Eagle's Nest" | "Rendezvous" | "RATA" | "High Adventure";
  completion: CampCompletion;
  sourceStatus: string;
  prerequisites: string | null;
  unavailableAtCamp: string | null;
  classHours: number;
  individualEffort: { minimumHours: number | null; openEnded: boolean; context: string | null; raw: string };
  sourceRow: number;
};

export const CONDITIONAL_COMPLETION_NOTE = "Complete* = Technically doable but requires staffing, equipment, or conditions we can't guarantee will be available.";

export const meritBadgeSurveyCatalog: MeritBadgeSurveyItem[] = [
  {
    "id": "american-business",
    "title": "American Business",
    "sourceTitle": "Am. Business",
    "tier": "D",
    "area": "STEM",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": "Business tours/interviews",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": null,
      "raw": "4"
    },
    "sourceRow": 4
  },
  {
    "id": "american-cultures",
    "title": "American Cultures",
    "sourceTitle": "Am. Cultures",
    "tier": "B",
    "area": "Rendezvous",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": "Cultural community events",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 5
  },
  {
    "id": "american-heritage",
    "title": "American Heritage",
    "sourceTitle": "Am. Heritage",
    "tier": "D",
    "area": "Rendezvous",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": "Historical site visits",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": null,
      "raw": "4"
    },
    "sourceRow": 6
  },
  {
    "id": "american-indian-culture",
    "title": "American Indian Culture",
    "sourceTitle": "American Indian Culture",
    "tier": "S",
    "area": "Rendezvous",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 7
  },
  {
    "id": "animation",
    "title": "Animation",
    "sourceTitle": "Animation",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 8
  },
  {
    "id": "archaeology",
    "title": "Archaeology",
    "sourceTitle": "Archaeology",
    "tier": "A",
    "area": "Rendezvous",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 8,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 9
  },
  {
    "id": "archery",
    "title": "Archery",
    "sourceTitle": "Archery",
    "tier": "S",
    "area": "RATA",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Range Practice",
      "raw": "2 (Range Practice)"
    },
    "sourceRow": 10
  },
  {
    "id": "art",
    "title": "Art",
    "sourceTitle": "Art",
    "tier": "S",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 11
  },
  {
    "id": "astronomy",
    "title": "Astronomy",
    "sourceTitle": "Astronomy",
    "tier": "A",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Night obs.",
      "raw": "3 (Night obs.)"
    },
    "sourceRow": 12
  },
  {
    "id": "athletics",
    "title": "Athletics",
    "sourceTitle": "Athletics",
    "tier": "B",
    "area": "Rendezvous",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "Season participation",
    "classHours": 3,
    "individualEffort": {
      "minimumHours": 10,
      "openEnded": true,
      "context": "Home",
      "raw": "10+ (Home)"
    },
    "sourceRow": 13
  },
  {
    "id": "backpacking",
    "title": "Backpacking",
    "sourceTitle": "Backpacking",
    "tier": "C",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "3 treks (15+ miles total)",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 14
  },
  {
    "id": "basketry",
    "title": "Basketry",
    "sourceTitle": "Basketry",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 3,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": "Weaving",
      "raw": "1 (Weaving)"
    },
    "sourceRow": 15
  },
  {
    "id": "bird-study",
    "title": "Bird Study",
    "sourceTitle": "Bird Study",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": "Observation",
      "raw": "1 (Observation)"
    },
    "sourceRow": 16
  },
  {
    "id": "bugling",
    "title": "Bugling",
    "sourceTitle": "Bugling",
    "tier": "B",
    "area": "STEM",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "3-month troop service",
    "classHours": 2,
    "individualEffort": {
      "minimumHours": 10,
      "openEnded": true,
      "context": "Home",
      "raw": "10+ (Home)"
    },
    "sourceRow": 17
  },
  {
    "id": "camping",
    "title": "Camping",
    "sourceTitle": "Camping",
    "tier": "C",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "20 nights camping",
    "unavailableAtCamp": "20 nights camping (can't finish in 5)",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 18
  },
  {
    "id": "chess",
    "title": "Chess",
    "sourceTitle": "Chess",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Tournament",
      "raw": "2 (Tournament)"
    },
    "sourceRow": 19
  },
  {
    "id": "citizenship-in-the-community",
    "title": "Citizenship in the Community",
    "sourceTitle": "Cit. in Community",
    "tier": "C",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "8 hours service / City meeting",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 0,
      "openEnded": false,
      "context": null,
      "raw": "0"
    },
    "sourceRow": 20
  },
  {
    "id": "citizenship-in-the-nation",
    "title": "Citizenship in the Nation",
    "sourceTitle": "Cit. in Nation",
    "tier": "C",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "Federal facility tour",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 0,
      "openEnded": false,
      "context": null,
      "raw": "0"
    },
    "sourceRow": 21
  },
  {
    "id": "citizenship-in-the-world",
    "title": "Citizenship in the World",
    "sourceTitle": "Cit. in World",
    "tier": "C",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "Foreign consulate/news tracking",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 0,
      "openEnded": false,
      "context": null,
      "raw": "0"
    },
    "sourceRow": 22
  },
  {
    "id": "climbing",
    "title": "Climbing",
    "sourceTitle": "Climbing",
    "tier": "S",
    "area": "High Adventure",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Wall time",
      "raw": "2 (Wall time)"
    },
    "sourceRow": 23
  },
  {
    "id": "communication",
    "title": "Communication",
    "sourceTitle": "Communication",
    "tier": "D",
    "area": "Eagle's Nest",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": "Public meeting / City speeches",
    "classHours": 0,
    "individualEffort": {
      "minimumHours": null,
      "openEnded": false,
      "context": null,
      "raw": "N/A"
    },
    "sourceRow": 24
  },
  {
    "id": "cybersecurity",
    "title": "Cybersecurity",
    "sourceTitle": "Cybersecurity",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Cyber Chip / Cyber certs",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 25
  },
  {
    "id": "cycling",
    "title": "Cycling",
    "sourceTitle": "Cycling",
    "tier": "C",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "50-mile ride",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 26
  },
  {
    "id": "digital-technology",
    "title": "Digital Technology",
    "sourceTitle": "Digital Technology",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Cyber Chip",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 27
  },
  {
    "id": "drafting",
    "title": "Drafting",
    "sourceTitle": "Drafting",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": null,
      "raw": "3"
    },
    "sourceRow": 28
  },
  {
    "id": "electricity",
    "title": "Electricity",
    "sourceTitle": "Electricity",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 29
  },
  {
    "id": "electronics",
    "title": "Electronics",
    "sourceTitle": "Electronics",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 30
  },
  {
    "id": "emergency-preparedness",
    "title": "Emergency Preparedness",
    "sourceTitle": "Emergency Prep.",
    "tier": "C",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "First Aid MB",
    "unavailableAtCamp": null,
    "classHours": 8,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 31
  },
  {
    "id": "energy",
    "title": "Energy",
    "sourceTitle": "Energy",
    "tier": "B",
    "area": "STEM",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "14-day energy audit",
    "unavailableAtCamp": "14-day energy audit",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 5,
      "openEnded": false,
      "context": "Home",
      "raw": "5 (Home)"
    },
    "sourceRow": 32
  },
  {
    "id": "engineering",
    "title": "Engineering",
    "sourceTitle": "Engineering",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 33
  },
  {
    "id": "environmental-science",
    "title": "Environmental Science",
    "sourceTitle": "Environmental Science",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": "Observations",
      "raw": "4 (Observations)"
    },
    "sourceRow": 34
  },
  {
    "id": "exploration",
    "title": "Exploration",
    "sourceTitle": "Exploration",
    "tier": "A",
    "area": "Rendezvous",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 8,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": null,
      "raw": "3"
    },
    "sourceRow": 35
  },
  {
    "id": "family-life",
    "title": "Family Life",
    "sourceTitle": "Family Life",
    "tier": "B",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "90-day chore log",
    "unavailableAtCamp": "90-day chore log / family project",
    "classHours": 3,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 36
  },
  {
    "id": "fingerprinting",
    "title": "Fingerprinting",
    "sourceTitle": "Fingerprinting",
    "tier": "S",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 1,
    "individualEffort": {
      "minimumHours": 0,
      "openEnded": false,
      "context": null,
      "raw": "0"
    },
    "sourceRow": 37
  },
  {
    "id": "fire-safety",
    "title": "Fire Safety",
    "sourceTitle": "Fire Safety",
    "tier": "B",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "Home escape plan",
    "unavailableAtCamp": "Home escape plan / inspection",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": "Home",
      "raw": "4 (Home)"
    },
    "sourceRow": 38
  },
  {
    "id": "first-aid",
    "title": "First Aid",
    "sourceTitle": "First Aid",
    "tier": "A",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "First aid requirements to 1st Class",
    "unavailableAtCamp": null,
    "classHours": 8,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 39
  },
  {
    "id": "fish-and-wildlife-management",
    "title": "Fish and Wildlife Management",
    "sourceTitle": "Fish & Wildlife Mgt.",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 40
  },
  {
    "id": "forestry",
    "title": "Forestry",
    "sourceTitle": "Forestry",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 41
  },
  {
    "id": "game-design",
    "title": "Game Design",
    "sourceTitle": "Game Design",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Playtesting",
      "raw": "3 (Playtesting)"
    },
    "sourceRow": 42
  },
  {
    "id": "geocaching",
    "title": "Geocaching",
    "sourceTitle": "Geocaching",
    "tier": "S",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Field Course",
      "raw": "2 (Field Course)"
    },
    "sourceRow": 43
  },
  {
    "id": "geology",
    "title": "Geology",
    "sourceTitle": "Geology",
    "tier": "A",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 44
  },
  {
    "id": "graphic-arts",
    "title": "Graphic Arts",
    "sourceTitle": "Graphic Arts",
    "tier": "A",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 45
  },
  {
    "id": "hiking",
    "title": "Hiking",
    "sourceTitle": "Hiking",
    "tier": "C",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "5 hikes (10-mile) + 1 (20-mile)",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 30,
      "openEnded": true,
      "context": "Home",
      "raw": "30+ (Home)"
    },
    "sourceRow": 46
  },
  {
    "id": "home-repairs",
    "title": "Home Repairs",
    "sourceTitle": "Home Repairs",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 8,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 47
  },
  {
    "id": "insect-study",
    "title": "Insect Study",
    "sourceTitle": "Insect Study",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 48
  },
  {
    "id": "inventing",
    "title": "Inventing",
    "sourceTitle": "Inventing",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": null,
      "raw": "3"
    },
    "sourceRow": 49
  },
  {
    "id": "leatherwork",
    "title": "Leatherwork",
    "sourceTitle": "Leatherwork",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 50
  },
  {
    "id": "mammal-study",
    "title": "Mammal Study",
    "sourceTitle": "Mammal Study",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 51
  },
  {
    "id": "mining-in-society",
    "title": "Mining in Society",
    "sourceTitle": "Mining in Society",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": "None (Video sub for tour)",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 52
  },
  {
    "id": "model-design-and-building",
    "title": "Model Design and Building",
    "sourceTitle": "Model Design & Bldg.",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": null,
      "raw": "3"
    },
    "sourceRow": 53
  },
  {
    "id": "moviemaking",
    "title": "Moviemaking",
    "sourceTitle": "Moviemaking",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Filming/Editing",
      "raw": "3 (Filming/Editing)"
    },
    "sourceRow": 54
  },
  {
    "id": "music",
    "title": "Music",
    "sourceTitle": "Music",
    "tier": "A",
    "area": "STEM",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": "Bring an instrument",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 55
  },
  {
    "id": "nature",
    "title": "Nature",
    "sourceTitle": "Nature",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 56
  },
  {
    "id": "nuclear-science",
    "title": "Nuclear Science",
    "sourceTitle": "Nuclear Science",
    "tier": "A",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 57
  },
  {
    "id": "orienteering",
    "title": "Orienteering",
    "sourceTitle": "Orienteering",
    "tier": "S",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Field Course",
      "raw": "2 (Field Course)"
    },
    "sourceRow": 58
  },
  {
    "id": "painting",
    "title": "Painting",
    "sourceTitle": "Painting",
    "tier": "A",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Project time",
      "raw": "2 (Project time)"
    },
    "sourceRow": 59
  },
  {
    "id": "personal-fitness",
    "title": "Personal Fitness",
    "sourceTitle": "Personal Fitness",
    "tier": "B",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "12-week fitness log",
    "unavailableAtCamp": "12-week fitness log",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 60
  },
  {
    "id": "personal-management",
    "title": "Personal Management",
    "sourceTitle": "Personal Management",
    "tier": "B",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "13-week budget log",
    "unavailableAtCamp": "13-week budget log",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 61
  },
  {
    "id": "photography",
    "title": "Photography",
    "sourceTitle": "Photography",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Cyber Chip / Totin' Chip",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Shooting photos",
      "raw": "2 (Shooting photos)"
    },
    "sourceRow": 62
  },
  {
    "id": "pioneering",
    "title": "Pioneering",
    "sourceTitle": "Pioneering",
    "tier": "A",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Knots/Lashing to 1st Class",
    "unavailableAtCamp": null,
    "classHours": 6,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": "Building",
      "raw": "4 (Building)"
    },
    "sourceRow": 63
  },
  {
    "id": "plant-science",
    "title": "Plant Science",
    "sourceTitle": "Plant Science",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 64
  },
  {
    "id": "plumbing",
    "title": "Plumbing",
    "sourceTitle": "Plumbing",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 65
  },
  {
    "id": "pottery",
    "title": "Pottery",
    "sourceTitle": "Pottery",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 66
  },
  {
    "id": "programming",
    "title": "Programming",
    "sourceTitle": "Programming",
    "tier": "A",
    "area": "STEM",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": "Cyber Chip",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 67
  },
  {
    "id": "pulp-and-paper",
    "title": "Pulp & Paper",
    "sourceTitle": "Pulp & Paper",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 68
  },
  {
    "id": "reading",
    "title": "Reading",
    "sourceTitle": "Reading",
    "tier": "B",
    "area": "STEM",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "Library service / long reading",
    "classHours": 2,
    "individualEffort": {
      "minimumHours": 10,
      "openEnded": true,
      "context": "Home",
      "raw": "10+ (Home)"
    },
    "sourceRow": 69
  },
  {
    "id": "reptile-and-amphibian-study",
    "title": "Reptile and Amphibian Study",
    "sourceTitle": "Reptile/Amphibian",
    "tier": "C",
    "area": "Nature",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "1-month care/observation log",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 10,
      "openEnded": true,
      "context": "Home",
      "raw": "10+ (Home)"
    },
    "sourceRow": 70
  },
  {
    "id": "rifle-shooting",
    "title": "Rifle Shooting",
    "sourceTitle": "Rifle Shooting",
    "tier": "S",
    "area": "RATA",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Range Practice",
      "raw": "2 (Range Practice)"
    },
    "sourceRow": 71
  },
  {
    "id": "robotics",
    "title": "Robotics",
    "sourceTitle": "Robotics",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": null,
      "raw": "3"
    },
    "sourceRow": 72
  },
  {
    "id": "safety",
    "title": "Safety",
    "sourceTitle": "Safety",
    "tier": "B",
    "area": "STEM",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "Home inspection log",
    "unavailableAtCamp": "Home inspection log",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 4,
      "openEnded": false,
      "context": "Home",
      "raw": "4 (Home)"
    },
    "sourceRow": 73
  },
  {
    "id": "scholarship",
    "title": "Scholarship",
    "sourceTitle": "Scholarship",
    "tier": "B",
    "area": "Eagle's Nest",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "Grade transcripts",
    "unavailableAtCamp": "Grade transcripts / school activities",
    "classHours": 2,
    "individualEffort": {
      "minimumHours": 5,
      "openEnded": false,
      "context": "Home",
      "raw": "5 (Home)"
    },
    "sourceRow": 74
  },
  {
    "id": "scouting-heritage",
    "title": "Scouting Heritage",
    "sourceTitle": "Scouting Heritage",
    "tier": "A",
    "area": "Eagle's Nest",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 75
  },
  {
    "id": "sculpture",
    "title": "Sculpture",
    "sourceTitle": "Sculpture",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 76
  },
  {
    "id": "search-and-rescue",
    "title": "Search and Rescue",
    "sourceTitle": "Search and Rescue",
    "tier": "A",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 6,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Mock Scenario",
      "raw": "3 (Mock Scenario)"
    },
    "sourceRow": 77
  },
  {
    "id": "signs-signals-and-codes",
    "title": "Signs, Signals, and Codes",
    "sourceTitle": "Signs, Signals, Codes",
    "tier": "A",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": null,
      "raw": "2"
    },
    "sourceRow": 78
  },
  {
    "id": "soil-and-water-conservation",
    "title": "Soil and Water Conservation",
    "sourceTitle": "Soil & Water Cons.",
    "tier": "S",
    "area": "Nature",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 79
  },
  {
    "id": "space-exploration",
    "title": "Space Exploration",
    "sourceTitle": "Space Exploration",
    "tier": "A",
    "area": "STEM",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Launch",
      "raw": "2 (Launch)"
    },
    "sourceRow": 80
  },
  {
    "id": "sports",
    "title": "Sports",
    "sourceTitle": "Sports",
    "tier": "B",
    "area": "Outdoor Skills",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": null,
    "unavailableAtCamp": "Full sports season participation",
    "classHours": 2,
    "individualEffort": {
      "minimumHours": 20,
      "openEnded": true,
      "context": "Home",
      "raw": "20+ (Home)"
    },
    "sourceRow": 81
  },
  {
    "id": "surveying",
    "title": "Surveying",
    "sourceTitle": "Surveying",
    "tier": "A",
    "area": "STEM",
    "completion": "conditional",
    "sourceStatus": "Complete*",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Field Work",
      "raw": "3 (Field Work)"
    },
    "sourceRow": 82
  },
  {
    "id": "sustainability",
    "title": "Sustainability",
    "sourceTitle": "Sustainability",
    "tier": "B",
    "area": "Nature",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "Water/Food/Energy logs",
    "unavailableAtCamp": "Month-long home tracking",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 10,
      "openEnded": true,
      "context": "Home",
      "raw": "10+ (Home)"
    },
    "sourceRow": 83
  },
  {
    "id": "theater",
    "title": "Theater",
    "sourceTitle": "Theater",
    "tier": "A",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": null,
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 3,
      "openEnded": false,
      "context": "Rehearsal/Show",
      "raw": "3 (Rehearsal/Show)"
    },
    "sourceRow": 84
  },
  {
    "id": "weather",
    "title": "Weather",
    "sourceTitle": "Weather",
    "tier": "B",
    "area": "Nature",
    "completion": "partial",
    "sourceStatus": "Partial",
    "prerequisites": "7-day weather log",
    "unavailableAtCamp": "7-day weather log",
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 2,
      "openEnded": false,
      "context": "Home/Camp",
      "raw": "2 (Home/Camp)"
    },
    "sourceRow": 85
  },
  {
    "id": "wilderness-survival",
    "title": "Wilderness Survival",
    "sourceTitle": "Wilderness Survival",
    "tier": "S",
    "area": "Outdoor Skills",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Basic first aid knowledge",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 8,
      "openEnded": false,
      "context": "Overnight",
      "raw": "8 (Overnight)"
    },
    "sourceRow": 86
  },
  {
    "id": "wood-carving",
    "title": "Wood Carving",
    "sourceTitle": "Wood Carving",
    "tier": "S",
    "area": "Handicraft",
    "completion": "complete",
    "sourceStatus": "Complete",
    "prerequisites": "Totin' Chip",
    "unavailableAtCamp": null,
    "classHours": 4,
    "individualEffort": {
      "minimumHours": 1,
      "openEnded": false,
      "context": null,
      "raw": "1"
    },
    "sourceRow": 87
  }
];
