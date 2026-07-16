export type TribeRank = {
  id: string;
  title: string;
  stage: string;
  requirements: string[];
};

export type TribeProgram = {
  introduction: string;
  ranks: TribeRank[];
  barkerRequirements: string[];
};

export type TribeGuideRank = TribeRank & {
  shortTitle: string;
  audience: string;
  image: string;
  color: string;
};

export const tribeGuideRanks: TribeGuideRank[] = [
  {
    id: "hunter-first-year",
    title: "Hunter — First year",
    shortTitle: "Hunter",
    stage: "First year",
    audience: "Scouts attending Camp Lawton for the first time",
    image: "/images/traditions/hunter.webp",
    color: "forest",
    requirements: [
      "Participate in a service project for Camp Lawton.",
      "Earn one merit badge or complete every requirement available at Model Camp.",
      "Hike one camp trail, such as Mount Bigelow, Eagle Trail, or the Compass Course.",
      "Show Scout spirit.",
    ],
  },
  {
    id: "warrior-second-year",
    title: "Warrior — Second year",
    shortTitle: "Warrior",
    stage: "Second year",
    audience: "Scouts returning for a second Camp Lawton season",
    image: "/images/traditions/warrior.webp",
    color: "rust",
    requirements: [
      "Complete a service project for Camp Lawton.",
      "Earn two merit badges or complete Model Camp.",
      "Hike one camp trail.",
      "Show Scout spirit.",
    ],
  },
  {
    id: "medicine-man-third-year",
    title: "Medicine Man — Third year",
    shortTitle: "Medicine Man",
    stage: "Third year",
    audience: "Scouts returning for a third Camp Lawton season",
    image: "/images/traditions/medicine-man.webp",
    color: "navy",
    requirements: [
      "Complete a service project.",
      "Earn two merit badges.",
      "Demonstrate leadership by volunteering in a program area or tutoring a Scout for two hours.",
      "Hike two camp trails.",
      "Attend a camp chapel service or a unit-run spiritual meeting.",
      "Show Scout spirit.",
    ],
  },
  {
    id: "chief-fourth-year",
    title: "Chief — Fourth year",
    shortTitle: "Chief",
    stage: "Fourth year",
    audience: "Scouts returning for a fourth Camp Lawton season",
    image: "/images/traditions/chief.webp",
    color: "green",
    requirements: [
      "Complete four hours of service projects.",
      "Earn four merit badges.",
      "Demonstrate leadership by volunteering in a program area for four hours during camp.",
      "Hike two camp trails.",
      "Attend a camp chapel service or a unit-run spiritual meeting.",
      "Show Scout spirit.",
    ],
  },
  {
    id: "elder-adult-fifth-year",
    title: "Elder — Adult leader or fifth year",
    shortTitle: "Elder",
    stage: "Adult leader or fifth year",
    audience: "Adult leaders and fifth-year campers",
    image: "/images/traditions/elder.webp",
    color: "teal",
    requirements: [
      "Encourage and support Scouts earning rank in the Tribe of Papago.",
      "Complete a service project.",
      "Hike two camp trails.",
      "Volunteer in a program area for four hours during camp.",
      "Attend a camp chapel service or a unit-run spiritual meeting.",
    ],
  },
  {
    id: "guide-staff",
    title: "Guide — Staff member",
    shortTitle: "Guide",
    stage: "Staff recognition",
    audience: "Camp Lawton staff members serving more than one week",
    image: "/images/traditions/guide.webp",
    color: "violet",
    requirements: [
      "Work on staff for more than one week.",
      "Lead or help lead a Tribe of Papago service project with a unit or during scheduled Tribe time.",
      "Teach at least ten Scouts during a week; staff in non-teaching roles must fulfill their assigned duties to the best of their ability.",
      "Visit a campsite at least once each day.",
      "Learn the purposes of the Tribe of Papago and participate in a ceremony.",
      "Obtain a recommendation from a Scoutmaster.",
      "Obtain a recommendation from the staff member’s Area Director.",
      "Attend chapel or a unit spiritual meeting during at least two weeks.",
      "Lead a unit on one camp trail.",
    ],
  },
];

export const barkerStandardRequirements = [
  "Request and pass a uniform inspection by a senior staff member.",
  "Request and pass a campsite inspection by a senior staff member.",
  "Lead a flag ceremony.",
  "Sing a song at a camp-wide activity.",
  "Perform a skit, song, or story at the camp-wide closing campfire.",
  "Volunteer for cleanup duty in the dining hall and/or shower facilities.",
  "Complete a service project while in camp.",
  "Demonstrate consistent Scout spirit by living the Scout Oath, Law, Motto, and Slogan, along with Leave No Trace and the Outdoor Code, throughout the week.",
  "Request and complete the Barker Standard application form.",
];

function clean(value: string): string {
  return value.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
}

function idFor(value: string): string {
  return clean(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isTribeHeading(value: string): boolean {
  return /^the tribe of papago$/i.test(clean(value));
}

export function parseTribeProgram(source: string): TribeProgram {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const ranks: TribeRank[] = [];
  const barkerRequirements: string[] = [];
  const intro: string[] = [];
  let inTribe = false;
  let inBarker = false;
  let current: TribeRank | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) {
      const heading = clean(h2[1]);
      if (isTribeHeading(heading)) {
        inTribe = true;
        inBarker = false;
        current = null;
      } else if (/^the barker standard$/i.test(heading)) {
        inTribe = false;
        inBarker = true;
        current = null;
      } else {
        inTribe = false;
        inBarker = false;
        current = null;
      }
      continue;
    }
    if (h3) {
      if (inTribe) {
        const title = clean(h3[1]);
        current = { id: idFor(title), title, stage: title.includes("—") ? title.split("—").slice(1).join("—").trim() : "Camp recognition", requirements: [] };
        ranks.push(current);
      }
      continue;
    }
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (bullet && current && inTribe) current.requirements.push(clean(bullet[1]));
    else if (numbered && inBarker) barkerRequirements.push(clean(numbered[1]));
    else if (inTribe && !current && line) intro.push(clean(line));
  }

  return { introduction: intro.join(" "), ranks, barkerRequirements };
}
