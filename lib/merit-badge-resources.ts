export const OFFICIAL_MERIT_BADGE_INDEX_URL = "https://www.scouting.org/skills/merit-badges/all/";
export const MERIT_BADGE_RESOURCES_REVIEWED_ON = "2026-07-14";

const overviewById = {
  "american-business": "Explore how businesses organize money, people, markets, ethics, and careers in a changing economy.",
  "american-cultures": "Study cultural traditions and lived experiences in the United States while practicing respectful cross-cultural understanding.",
  "american-heritage": "Investigate people, places, documents, and events that shaped the United States and connect history with citizenship.",
  "american-indian-culture": "Learn about the distinct histories, languages, arts, traditions, and present-day lives of American Indian peoples.",
  animation: "Plan stories and bring drawings or models to life while exploring animation techniques and creative careers.",
  archaeology: "Use artifacts, sites, records, and ethical field practices to understand how archaeologists reconstruct human history.",
  archery: "Build safe range habits, understand equipment, refine shooting form, and practice scored rounds with disciplined focus.",
  art: "Experiment with drawing, painting, design principles, and visual communication while developing and discussing original work.",
  astronomy: "Observe the night sky and investigate celestial motion, stars, planets, equipment, and astronomy careers.",
  athletics: "Develop a balanced training plan, improve athletic performance, and connect sports participation with lifelong health.",
  backpacking: "Plan and complete low-impact backcountry travel using sound choices about routes, food, equipment, safety, and conditioning.",
  basketry: "Learn weaving materials and construction methods by completing useful basket projects with care and patience.",
  "bird-study": "Practice field identification, observation, habitat awareness, and conservation while building a closer understanding of birds.",
  bugling: "Learn bugle care, musical notation, traditional calls, and the performance skills needed to serve a unit or camp.",
  camping: "Plan safe, responsible outdoor stays while strengthening shelter, cooking, navigation, conservation, and long-term camping experience.",
  chess: "Learn the rules, notation, strategy, tactics, sportsmanship, and tournament traditions of one of the world’s enduring games.",
  "citizenship-in-the-community": "Examine local government, community organizations, public issues, and service through the responsibilities of active citizenship.",
  "citizenship-in-the-nation": "Explore constitutional principles, national institutions, civic rights, historic places, and informed participation in American government.",
  "citizenship-in-the-world": "Compare governments, international relationships, global issues, and the responsibilities people share across national borders.",
  climbing: "Develop safe climbing, rappelling, belaying, communication, equipment, and risk-management habits through supervised practice.",
  communication: "Practice listening, speaking, writing, interviewing, teaching, and meeting leadership across different audiences and settings.",
  cybersecurity: "Build safer digital habits while exploring threats, privacy, networks, defenses, ethical conduct, and cybersecurity careers.",
  cycling: "Maintain a bicycle, ride safely, plan routes, build endurance, and complete a road or mountain-biking progression.",
  "digital-technology": "Understand digital devices, data, online responsibility, intellectual property, troubleshooting, and technology’s continuing evolution.",
  drafting: "Create precise technical drawings that communicate dimensions, materials, and ideas clearly to builders, designers, and engineers.",
  electricity: "Investigate circuits, power generation, measurement, home energy use, and the safety practices surrounding electrical systems.",
  electronics: "Explore components and digital principles, solder and assemble a circuit, troubleshoot it, and consider electronics careers.",
  "emergency-preparedness": "Prepare for hazards by learning prevention, planning, response, recovery, communication, and community-service roles.",
  energy: "Compare energy sources, production, conservation, and environmental tradeoffs while evaluating how homes and communities use power.",
  engineering: "Apply design thinking to real problems while exploring engineering disciplines, tradeoffs, prototypes, ethics, and careers.",
  "environmental-science": "Work like an environmental scientist through field observations and experiments involving ecosystems, pollution, and human impact.",
  exploration: "Study notable expeditions, then plan, prepare, document, and evaluate an exploration of your own.",
  "family-life": "Examine responsibilities, communication, household decisions, and shared projects that help families work and grow together.",
  fingerprinting: "Learn how fingerprints form, how investigators collect and classify them, and how identification supports public safety.",
  "fire-safety": "Understand combustion, prevention, escape planning, burn care, safe equipment use, and responsible action around fire.",
  "first-aid": "Recognize injuries and illnesses, provide immediate care, manage emergencies, and know when professional help is needed.",
  "fish-and-wildlife-management": "Explore habitat, population management, conservation challenges, and practical ways communities can protect fish and wildlife.",
  forestry: "Identify forest species and investigate succession, products, threats, management practices, and careers that sustain healthy forests.",
  "game-design": "Analyze how games work, prototype original rules, test with players, revise from feedback, and explore design careers.",
  geocaching: "Use GPS coordinates responsibly, understand cache etiquette, find hidden locations, and design a safe geocaching experience.",
  geology: "Read Earth’s history through rocks, minerals, landforms, geologic processes, natural resources, and field observation.",
  "graphic-arts": "Explore design and production workflows that turn ideas into clear printed or digital visual communication.",
  hiking: "Build fitness and trail judgment through route planning, safety, navigation, low-impact travel, and progressively longer hikes.",
  "home-repairs": "Practice safe, practical maintenance skills for common household surfaces, fixtures, hardware, and simple repairs.",
  "insect-study": "Observe insect anatomy, behavior, development, habitats, ecological roles, and the remarkable diversity of this animal group.",
  inventing: "Identify a real problem, research prior solutions, develop and test an original idea, and consider protection and entrepreneurship.",
  leatherwork: "Explore leather’s origins and uses while learning safe cutting, tooling, stitching, lacing, finishing, and care.",
  "mammal-study": "Compare mammal characteristics, habitats, life histories, and ecological relationships through observation and a conservation project.",
  "mining-in-society": "Examine how minerals are found and produced, mining’s history and impacts, reclamation, safety, and modern careers.",
  "model-design-and-building": "Turn an idea into scaled drawings and a finished model while comparing materials, methods, and professional uses.",
  moviemaking: "Plan and produce a visual story using scripts, shots, lighting, sound, editing, and responsible media practices.",
  music: "Explore musical traditions, performance, composition, listening, instruments, and the many ways music shapes culture.",
  nature: "Investigate relationships among soil, plants, animals, and people while practicing identification and responsible observation outdoors.",
  "nuclear-science": "Explore atomic structure, radiation, measurement, safety, nuclear applications, energy, and careers in the field.",
  orienteering: "Navigate with maps and compasses, judge distance, choose routes, complete courses, and organize an orienteering activity.",
  painting: "Learn surface preparation, tools, materials, color, safety, and techniques used in both practical and artistic painting.",
  "personal-fitness": "Assess wellness, set goals, follow a sustained exercise plan, and connect physical, mental, and social health.",
  "personal-management": "Build skills in budgeting, saving, time management, goal setting, decision-making, and planning for future responsibilities.",
  photography: "Use light, composition, camera controls, editing, and visual storytelling to create purposeful photographs.",
  pioneering: "Master ropes, knots, splices, lashings, anchors, and teamwork by designing and building useful camp structures.",
  "plant-science": "Investigate plant growth and classification through field or growing projects in agronomy, horticulture, or botany.",
  plumbing: "Learn pipe systems, fittings, tools, repairs, safety, water conservation, and the work of plumbing professionals.",
  pottery: "Create finished ceramic work while learning clay preparation, forming methods, decoration, glazing, firing, and studio safety.",
  programming: "Design, write, test, debug, and document code while comparing languages and exploring software careers.",
  "pulp-and-paper": "Trace paper from fiber to finished product while examining manufacturing, recycling, conservation, and industry careers.",
  reading: "Read across genres, discuss ideas, use library resources, and share books through thoughtful projects and service.",
  "reptile-and-amphibian-study": "Study identification, life cycles, habitats, conservation, safe observation, and care of reptiles and amphibians.",
  "rifle-shooting": "Learn strict firearm and range safety, rifle operation and care, shooting fundamentals, and supervised marksmanship.",
  robotics: "Design, build, program, test, and improve a working robot while exploring robotic systems and careers.",
  safety: "Recognize everyday hazards, prevent injuries, respond to emergencies, and help build safer homes, travel, and communities.",
  scholarship: "Strengthen study habits, classroom performance, research, writing, educational planning, and awareness of learning opportunities.",
  "scouting-heritage": "Trace the people, milestones, traditions, and changing programs that shaped the worldwide and American Scouting movements.",
  sculpture: "Express ideas in three dimensions by planning and shaping materials such as clay, wood, stone, or metal.",
  "search-and-rescue": "Learn how trained teams organize searches, use clues and navigation, manage incidents, and return people to safety.",
  "signs-signals-and-codes": "Decode and use visual, tactile, electronic, and symbolic communication systems for everyday and emergency situations.",
  "soil-and-water-conservation": "Study watersheds, erosion, soil health, conservation practices, and stewardship of essential land and water resources.",
  "space-exploration": "Explore rocketry, spacecraft, missions, space science, safety, and humanity’s past and future beyond Earth.",
  sports: "Examine rules, training, teamwork, officiating, sportsmanship, safety, and sustained participation in chosen sports.",
  surveying: "Measure land with field instruments, bearings, distances, elevations, calculations, and the methods surveyors use professionally.",
  sustainability: "Evaluate how personal and community choices affect water, food, energy, transportation, waste, climate, and future resilience.",
  theater: "Experience live theater from audience and production perspectives through acting, stagecraft, planning, and performance.",
  weather: "Observe the atmosphere, use instruments, interpret forecasts, understand severe weather, and make safer outdoor decisions.",
  "wilderness-survival": "Prepare for unexpected backcountry situations using priorities, shelters, signaling, fire, water, first aid, and sound judgment.",
  "wood-carving": "Practice safe tool handling, design, wood selection, carving cuts, finishing, and the creation of original projects.",
} as const;

export type MeritBadgeResourceId = keyof typeof overviewById;

const eagleRequiredIds = new Set<MeritBadgeResourceId>([
  "camping",
  "citizenship-in-the-community",
  "citizenship-in-the-nation",
  "citizenship-in-the-world",
  "communication",
  "cycling",
  "emergency-preparedness",
  "environmental-science",
  "family-life",
  "first-aid",
  "hiking",
  "personal-fitness",
  "personal-management",
  "sustainability",
]);

export type MeritBadgeResource = {
  id: MeritBadgeResourceId;
  overview: string;
  officialUrl: string;
  reviewedOn: string;
  eagleRequired: boolean;
};

const officialSlugOverrides: Partial<Record<MeritBadgeResourceId, string>> = {
  "fish-and-wildlife-management": "fish-wildlife-management",
};

export const meritBadgeResources = Object.fromEntries(
  Object.entries(overviewById).map(([id, overview]) => {
    const resourceId = id as MeritBadgeResourceId;
    const officialSlug = officialSlugOverrides[resourceId] ?? resourceId;
    return [resourceId, {
      id: resourceId,
      overview,
      officialUrl: `https://www.scouting.org/merit-badges/${officialSlug}/`,
      reviewedOn: MERIT_BADGE_RESOURCES_REVIEWED_ON,
      eagleRequired: eagleRequiredIds.has(resourceId),
    }];
  }),
) as Record<MeritBadgeResourceId, MeritBadgeResource>;

export function getMeritBadgeResource(id: string): MeritBadgeResource | null {
  return meritBadgeResources[id as MeritBadgeResourceId] ?? null;
}
