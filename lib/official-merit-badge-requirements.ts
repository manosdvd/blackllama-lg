// =============================================================================
// OFFICIAL SCOUTING AMERICA MERIT BADGE REQUIREMENTS & OVERVIEWS
// =============================================================================
// Sourced directly from https://www.scouting.org/skills/merit-badges/all/
// and official merit badge child pages.
// Contains complete requirements lists and official badge summaries.
// =============================================================================

export type RequirementItem = {
  number: string | null;
  text: string;
  subRequirements: string[];
};

export type BadgeRequirementData = {
  url: string;
  overview: string;
  requirements: RequirementItem[];
};

export const OFFICIAL_BADGE_REQUIREMENTS: Record<string, BadgeRequirementData> = {
  "environmental-science": {
    "url": "https://www.scouting.org/merit-badges/environmental-science/",
    "overview": "While earning the Environmental Science merit badge, Scouts will get a taste of what it is like to be an environmental scientist, making observations and carrying out experiments to investigate the natural world.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Check out the Digital Resource Guide for the Environmental Science merit badge HERE for information and helpful resources to engage your learning and assist you along on your merit badge journey! The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop. Additional educational resources are available on our Counselor Information Page.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Describe the meaning of environmental science in your own words. Explain how you think we can use science to understand, conserve, and improve our environment.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Ecology. Do the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Choose an area approved by your counselor and observe (sight, sound, and smell) its ecosystem over a two-day period.",
          "(b) Make notes about the living, nonliving (e.g. rocks) and formerly living components. Include information about interactions among the components, including the food chain, predators, native species, and invasive species, and identify how human activities have affected the ecosystem."
        ]
      },
      {
        "number": "3.",
        "text": "Air Pollution. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Learn what Particulate Matter (PM) is, how PM gets into the air, what the harmful effects of PM are, and what is being done to reduce PM in the air. Then, perform an experiment to test for particulates that contribute to air pollution.",
          "(b) Discuss how air pollution and transportation affect each other by giving at least three examples. Then, compare two modes of transportation (e.g., gasoline-powered vs. electric vehicles, gasoline-powered car vs. bicycle, etc.). Air Quality and Transportation (video)",
          "(c) Learn about the Clean Air Act. Make notes on when it was passed, its environmental goals, what progress has been made and what remains to be done to achieve the law's goals. Describe the impact, benefits, and costs of the law as well as what is required to implement and enforce the law."
        ]
      },
      {
        "number": "4.",
        "text": "Water Pollution. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Identify where your community sources water, how it is treated, and disposed. Obtain and review a water quality report from your area.",
          "(b) Identify a local or regional area that experiences periodic flooding and/or drought. Collect facts on prior event(s) and investigate the environmental impacts of these extreme events.",
          "(c) Learn about the Clean Water Act. Make notes on when it was passed, its environmental goals, what progress has been made and what remains to be done to achieve the law's goals. Describe the impact, benefits, and costs of the law as well as what is required to implement and enforce the law."
        ]
      },
      {
        "number": "5.",
        "text": "Land Pollution. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) In an area (yard, park, golf course, farm, etc.) approved by your counselor, make a list of the pesticides, herbicides, and fertilizers used and how often they are applied. Identify the benefits of their use and the environmental impact, including effects on non-target species (including humans), what happens if the chemicals infiltrate into the groundwater, and what happens to any runoff of the chemicals.",
          "(b) Learn about the erosion process and identify an example of where erosion occurs. Determine where the eroded material ends up and how erosion can be minimized.",
          "(c) Learn about a land pollution incident that led to a site being listed on Environmental Protection Agency's Superfund National Priority List. Identify what caused the incident, what the effects were on the environment, what remediation has been done, and the current condition of the site."
        ]
      },
      {
        "number": "6.",
        "text": "Rare, Threatened, or Endangered Species. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Do research on one endangered species found in your state. Learn about its natural habitat, why it is endangered, what is being done to preserve it, and how many individual species are left in the wild. Prepare a 100-word report about the species and include a drawing or photo. Present your report to your patrol or troop.",
          "(b) Do research on one species that was endangered or threatened but that has now recovered. Learn about how the species recovered, and what its new status is. Prepare a 100-word report on the species and include a drawing or photo. Present your report to your patrol or troop.",
          "(c) With your parent or guardian and counselor's approval, work with a natural resource professional to identify a completed project that has been designed to improve the habitat for a threatened or endangered species in your area. Visit the site and report on what you saw to your patrol or troop."
        ]
      },
      {
        "number": "7.",
        "text": "Pollution Prevention, Resource Recovery, and Conservation. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Determine five ways to conserve resources or use resources more efficiently in your home, school, or camp. Practice at least two of these methods for at least one week.",
          "(b) Explain Resource Recovery and why it is important to reduce pollution. Collect samples or take photos of 10 items that can demonstrate the principle of Reduce, Reuse, Recycle. Explain your collection, how these materials are currently handled, and potential improvements.",
          "(c) Identify five items in your household that will become hazardous waste. Explain how they should be properly stored, what special care is needed for disposal, and proper disposal options available in your area."
        ]
      },
      {
        "number": "8.",
        "text": "Pollination. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Investigate pollination and its importance to our environment and ecosystems. Make a list of five pollinators and the plants that attract them in your region. Explain the importance of pollinators and what Scouts can do to support pollinators in their area.",
          "(b) Visit an area with flowering plants during pollination season for an hour to observe pollination. Record which pollinators are attracted to which plant. Explain the importance of pollinators and what Scouts can do to support pollinators in their area.",
          "(c) Learn about the importance of pollination to agriculture, including the economic costs and benefits. Identify four crop-pollinator pairs. Explain the relationship of pollinators to agriculture."
        ]
      },
      {
        "number": "9.",
        "text": "Invasive Species. In your community or camp, investigate two invasive plant or animal species. Learn where the species originated, how they were transported to this ecosystem, their life history, how they are spread, how they impact the native ecosystem, and the recommended means to eradicate or control their spread. Discuss what you learned with your counselor.",
        "subRequirements": []
      },
      {
        "number": "10.",
        "text": "Identify the environmental impact topics that would need to be addressed for a construction project such as building a house, adding a new building to your Scout camp, or one you create on your own that is approved by your counselor. Evaluate the purpose and benefit of the proposed project, alternatives (including a no-action alternative), and any environmental consequences. Discuss with your counselor.",
        "subRequirements": []
      },
      {
        "number": "11.",
        "text": "Identify three career opportunities that would use skills and knowledge in the environmental science field. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
        "subRequirements": []
      }
    ]
  },
  "forestry": {
    "url": "https://www.scouting.org/merit-badges/forestry/",
    "overview": "In working through the Forestry merit badge requirements, Scouts will explore the remarkable complexity of a forest and identify many species of trees and plants and the roles they play in a forest's life cycle. They will also discover some of the resources forests provide to humans and come to understand that people have a very large part to play in sustaining the health of forests.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Scouts must remember to follow the Leave No Trace Seven Principles and the Outdoor Code while on field trips and when collecting specimens. Make sure you have permission of the land manager prior to taking any samples for your collection. Collecting is prohibited in most National and State Parks. Pictures or sketches may suffice for a collection and limit impacted disturbances. NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Prepare a field notebook, make a collection, and identify 15 species of trees, wild shrubs, or vines in a local forested area. Write a description in which you identify and discuss the following:",
        "subRequirements": [
          "(a) The characteristics of leaf, twig, cone, or fruiting bodies",
          "(b) The habitat in which these trees, shrubs, or vines are found",
          "(c) The important ways each tree, shrub, or vine is used by humans or wildlife and whether the species is native or was introduced to the area (If it is not native, explain whether it is considered invasive or potentially invasive.)"
        ]
      },
      {
        "number": "2.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Collect and identify wood samples of 10 species of trees. List several ways the wood of each species can be used.",
          "(b) Find and examine three stumps, logs, or core samples that show variations in the growth rate of their ring patterns. In the field notebook you prepared for requirement 1, describe the location or origin of each example (including elevation, aspect, slope, and the position on the slope), and discuss possible reasons for the variations in growth rate. Photograph or sketch each example.",
          "(c) Find and examine two types of animal, insect, or disease damage to trees. In the field notebook you prepared for requirement 1, identify the damage, explain how the damage was caused, and describe the effects of the damage on the trees. Photograph or sketch each example."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Describe the contributions forests make to:",
          "(1) Our economy in the form of products",
          "(2) Our social well-being, including recreation",
          "(3) Soil protection and increased fertility",
          "(4) Clean water",
          "(5) Clean air (carbon cycling, sequestration)",
          "(6) Wildlife habitat",
          "(7) Fisheries habitat",
          "(8) Threatened and endangered species of plants and animals",
          "(b) Tell which watershed or other source your community relies on for its water supply."
        ]
      },
      {
        "number": "4.",
        "text": "Describe what forest management means, including the following:",
        "subRequirements": [
          "(a) Multiple-use management",
          "(b) Sustainable forest management",
          "(c) Even-aged and uneven-aged management and the silvicultural systems associated with each",
          "(d) Intermediate cuttings",
          "(e) The role of prescribed burning and related forest-management practices"
        ]
      },
      {
        "number": "5.",
        "text": "With your parent or guardian's and counselor's approval, do ONE of the following:",
        "subRequirements": [
          "(a) Visit a managed public or private forest area with the manager or a forester who is familiar with it. Write a brief report describing the type of forest, the management objectives, and the forestry techniques used to achieve the objectives.",
          "(b) With a knowledgeable individual, visit a current or past logging operation or wood-using manufacturing plant. Write a brief report describing the following:",
          "(1) The species and size of trees harvested or used",
          "(2) The origin of the forest or stands of trees utilized (e.g., planted or natural)",
          "(3) The forest's successional stage, its future, and&mdash;if it is a past logging operation&mdash;the regeneration that is occurring, whether planted or natural",
          "(4) Where the trees are coming from (land ownership) or where they are going (type of mill or processing plant)",
          "(5) The products that are made from the trees",
          "(6) How the products are made and used",
          "(7) How waste materials from the logging operation or manufacturing plant are or were disposed of or utilized",
          "(c) Take part in a forest-fire prevention campaign in cooperation with your local fire warden, state wildfire agency, forester, or counselor. Write a brief report describing the campaign, how it will help prevent wildfires, and your part in it."
        ]
      },
      {
        "number": "6.",
        "text": "In your camp, local recreation area (park or equivalent), or neighborhood, do ONE of the following:",
        "subRequirements": [
          "(a) Inventory the trees within a specific area above (campsite, road, trail, street, etc.) that may be a hazard to structures or people. Note the species and hazardous condition, and suggest a remedy (removal or trimming). Make your list available to the proper authority or agency.",
          "(b) Review a hazardous tree report done by a professional for this area and visit those trees and the results of the prescription to prune or remove them."
        ]
      },
      {
        "number": "7.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Describe the consequences to forests that result from FIVE of the following elements: wildfire, absence of fire, destructive insects, loss of pollinating insect population, tree diseases, air pollution, overgrazing, deer or other wildlife overpopulation, improper harvest, and urbanization.",
          "(b) Explain what can be done to reduce the consequences you discussed in 7(a).",
          "(c) Describe what you should do if you discover a forest fire and how a professional firefighting crew might control it. Name your state or local wildfire control agency."
        ]
      },
      {
        "number": "8.",
        "text": "Visit one or more local foresters and write a brief report about the person (or persons) OR write about a forester's occupation including the education, qualifications, career opportunities, and duties related to forestry.",
        "subRequirements": []
      }
    ]
  },
  "mammal-study": {
    "url": "https://www.scouting.org/merit-badges/mammal-study/",
    "overview": "A mammal may weigh as little as 1/12 ounce, as do some shrews, or as much as 150 tons, like the blue whale. It may spring, waddle, swim, or even fly. But if it has milk for its young, has hair of some kind, is relatively intelligent, and has warm blood, then it is a mammal.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: If collecting is permitted, do so ethically and sustainably. Collect sparingly, only taking what you need, and ensure that your collection practices do not harm the surrounding environment. Be aware of and adhere to local laws regarding collection. Pictures or sketches may suffice for a collection and limit impacted disturbances. NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Explain the following terms: animal, invertebrate, vertebrate, and mammal. Name three characteristics that distinguish mammals from all other animals.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Explain how the animal kingdom is classified. Explain where mammals fit in the classification of animals. Classify three mammals from phylum through species.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Spend three hours in two different kinds of natural habitats or at different elevations for a total of 6 hours. List the different mammal species and how many of each you identified by sight or sign. Tell why all mammals do not live in the same kind of habitat.",
          "(b) Spend three hours on five different days in at least a 4-acre area (about the size of 3 football fields) for a total of 15 hours. List the mammal species you identified by sight or sign.",
          "(c) From study and reading, write a simple life history of one nongame mammal that lives in your area. Tell how this mammal lived before its habitat was affected in any way by humans. Tell how it reproduces, what it eats, and its natural habitat. Describe its dependency upon plants and other animals (including humans), and how they depend upon it. Describe how humans have benefited from the mammal you have chosen and whether the mammal has benefited from association with humankind."
        ]
      },
      {
        "number": "4.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Under the guidance of a nature center or natural history museum, make two study skins of rats or mice. Tell the uses of study skins and mounted specimens respectively.",
          "(b) Take good pictures of two kinds of mammals in the wild. Record the date(s), time of day, weather conditions, approximate distance from the animal, habitat conditions, and any other factors you feel may have influenced the animal's activity and behavior.",
          "(c) Write a life history of a native game mammal that lives in your area, covering the points outlined in requirement 3(c). List sources for this information.",
          "(d) Make and bait a tracking pit. Report what mammals and other animals came to the bait.",
          "(e) Visit a natural history museum. Report on how specimens are prepared and cataloged. Explain the purposes of museums.",
          "(f) Write a report of 500 words on a book about a mammal species.",
          "(g) Trace two possible food chains of carnivorous mammals from the soil through four stages to the mammal."
        ]
      },
      {
        "number": "5.",
        "text": "Working with your counselor, select and carry out one project that will influence the numbers of one or more mammals.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Discuss the importance of the Leave No Trace Seven Principles and the Outdoor Code as they relate to Mammal Study. Explain how you have followed the Leave No Trace Seven Principles and the Outdoor Code while in natural areas during field observation, specimen collection, and identification.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from this merit badge to pursue a hobby or healthy lifestyle. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "nature": {
    "url": "https://www.scouting.org/merit-badges/nature/",
    "overview": "There is a very close connection between the soil, the plants, and all animal life, including people. Understanding this connection, and the impact we have upon it, is important to preserving the wilderness, as well as to our own well-being as members of the web of nature.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: In any of the collection requirements, if collecting is permitted, do so ethically and sustainably. Scouts must remember to follow the Leave No Trace Seven Principles and the Outdoor Code while on field trips and when collecting. Collect sparingly, only taking what you need, and ensure that your collection practices do not harm the surrounding environment. Make sure you have permission from the land manager prior to taking any samples for your collections and be aware of and adhere to local laws regarding collection. (Note that collecting is prohibited in most National and State Parks.) Consider purchasing rock, mineral and fossil specimens from commercial rock and mineral shops or from home garden stores. Pictures or sketches may suffice for a collection and limit impacted disturbances. In most cases all specimens should be returned to the wild at the location of original capture after the requirements have been met. Check with your counselor for those instances where the return of these specimens would not be appropriate. Under the Endangered Species Act of 1973, some plants and animals are or may be protected by federal law. The same ones and/or others may be protected by state law. Be sure that you do not collect protected species. Your state may require that you purchase and carry a license to collect certain species. Check with the wildlife and fish and game officials in your state regarding species regulations before you begin to collect.",
        "subRequirements": []
      },
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Name three ways in which plants are important to animals. Name a plant that is protected in your state or region, and explain why it is at risk.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Name three ways in which animals are important to plants. Name an animal that is protected in your state or region, and explain why it is at risk.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Explain the term \"food chain.\" Give an example of a four-step land food chain and a four-step water food chain.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Do ALL the requirements in FIVE of the following fields:",
        "subRequirements": [
          "(a) Birds. Do ALL of the following:",
          "(1) In the field, identify eight species of birds.",
          "(2) Make and set out a birdhouse OR a feeding station OR a birdbath. List what birds used it during a period of one month.",
          "(b) Mammals. Do ALL of the following:",
          "(1) In the field, identify three species of wild mammals.",
          "(2) Make plaster casts of the tracks of a wild mammal.",
          "(c) Reptiles and Amphibians. Do ALL of the following:",
          "(1) Show that you can recognize the venomous snakes in your area.",
          "(2) In the field, identify three species of reptiles or amphibians.",
          "(3) Recognize one species of toad or frog by voice; OR identify one reptile or amphibian by eggs, den, burrow, or other signs.",
          "(d) Insects and Spiders. Do ALL of the following:",
          "(1) Collect and identify either in the field or through photographs 10 species of insects or spiders. Photos may be taken with your own equipment or gathered from other sources.",
          "(2) Hatch an insect from the pupa or cocoon; OR hatch adults from nymphs; OR keep larvae until they form pupae or cocoons; OR keep a colony of ants or bees through one season.",
          "(e) Fish. Do ALL of the following:",
          "(1) Identify two species of fish native to your area.",
          "(2) Collect four kinds of animal food eaten by fish in the wild.",
          "(f) Mollusks and Crustaceans. Do ALL of the following:",
          "(1) Identify five species of mollusks and crustaceans.",
          "(2) Collect, mount, and label six shells.",
          "(g) Plants. Do ALL of the following:",
          "(1) In the field, identify 15 species of wild plants.",
          "(2) Do ONE of the following:",
          "(a) Collect and label the seeds of six plants OR the leaves of 12 plants.",
          "(b) Photograph the seeds of six plants OR the leaves of 12 plants and create a catalog of your photos.",
          "(h) Soils and Rocks. Do ALL of the following:",
          "(1) Collect and identify three different types of soil that represent soils high in sand, clay and humus.",
          "(2) Collect and identify five different types of rocks from your area."
        ]
      },
      {
        "number": "5.",
        "text": "Discuss the importance of the Leave No Trace Seven Principles and the Outdoor Code and how they relate to nature. Explain how you have followed the Leave No Trace Seven Principles and the Outdoor Code while in natural areas during field observation, specimen collection, and identification.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain what succession is to your counselor.",
          "(b) Visit a natural area (forest, grassland, meadow, water feature) and explain what stage of succession (both plant and animal) the area is in. Talk about what community/succession stages may have been there before and what community/succession stages may replace what you see now. Discuss what disturbances or changes have taken place in the past to create this landscape and what changes may occur in the future to change the landscape further."
        ]
      },
      {
        "number": "7.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Identify three career opportunities that would use skills and knowledge in Nature. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(b) Identify how you might use the skills and knowledge in Nature to pursue a personal hobby. Research the additional training required, expenses, and affiliation with organizations that would help you maximize the enjoyment and benefit you might gain from it. Discuss what you learned with your counselor and share what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "oceanography": {
    "url": "https://www.scouting.org/merit-badges/oceanography/",
    "overview": "The oceans cover more than 70 percent of our planet and are the dominant feature of Earth. Wherever you live, the oceans influence the weather, the soil, the air, and the geography of your community. To study the oceans is to study Earth itself.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Name four branches of oceanography. Describe at least five reasons why it is important for people to learn about the oceans.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Explain the following terms: salinity, temperature, and density. Describe how these important properties of seawater are measured by an oceanographer. Discuss the circulation and currents of the ocean. Describe the effects of the oceans on weather and climate.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Describe the characteristics of ocean waves and do the following:",
        "subRequirements": [
          "(a) Point out the differences among the storm surge, tsunami, tidal wave, and tidal bore.",
          "(b) Explain the difference between sea, swell, and surf.",
          "(c) Explain how breakers are formed.",
          "(d) Explain what a rip current is, how to avoid them, and what to do if you are caught in one."
        ]
      },
      {
        "number": "4.",
        "text": "Draw a cross-section of underwater topography. Name and put on your drawing the following: seamount, guyot, rift valley, canyon, trench, and oceanic ridge. Compare the depths in the oceans with the heights of mountains on land. Show what is meant by:",
        "subRequirements": [
          "(a) Continental shelf",
          "(b) Continental slope",
          "(c) Abyssal plain"
        ]
      },
      {
        "number": "5.",
        "text": "List the main salts, gases, and nutrients in seawater. Describe some important properties of water. Tell how the animals and plants of the ocean affect the chemical composition of seawater. Explain how differences in evaporation and precipitation affect the salt content of the oceans.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Describe some of the biologically important properties of seawater. Define benthos, nekton, and plankton. Name some of the plants and animals that make up each of these groups. Describe the place and importance of phytoplankton in the oceanic food chain.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Make a plankton net. Tow the net by a dock, wade with it, hold it in a current, or tow it from a rowboat. Do this for about 20 minutes. Save the sample. Examine it under a microscope or high-power glass. Identify the three most common types of plankton in the sample. Note: May be done in lakes or streams.",
          "(b) Make a series of models (clay or plaster and wood) of a volcanic island. Show the growth of an atoll from a fringing reef through a barrier reef. Describe the Darwinian theory of coral reef formation.",
          "(c) Measure the water temperature at the surface, midwater, and bottom of a body of water four times daily for five consecutive days. You may measure depth with a rock tied to a line. Make a Secchi disk to measure turbidity (how much suspended sedimentation is in the water). Measure the air temperature. Note the cloud cover and roughness of the water. Show your findings (air and water temperature, turbidity) on a graph. Tell how the water temperature changes with air temperature.",
          "(d) Make a model showing the inshore sediment movement by littoral currents, tidal movement, and wave action. Include such formations as high and low waterlines, low-tide terrace, berm, and coastal cliffs. Show how offshore bars are built up and torn down.",
          "(e) Make a wave generator. Show reflection and refraction of waves. Show how groins, jetties, and breakwaters affect these patterns.",
          "(f) With your counselor's and parent or guardian's approval and permission, track and monitor satellite images available on the internet for a specific location for three weeks. Describe what you have learned to your counselor."
        ]
      },
      {
        "number": "8.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Write a 500-word report on a book about oceanography approved by your counselor.",
          "(b) Visit one of the following and write a 500-word report about your visit.",
          "(1) Oceanographic research ship",
          "(2) Oceanographic institute, marine laboratory, or marine aquarium",
          "(c) Explain to your troop, in a five-minute prepared speech, \"Why Oceanography Is Important\" or describe \"Career Opportunities in Oceanography.\" (Before making your speech, show your speech outline to your counselor for approval.)"
        ]
      },
      {
        "number": "9.",
        "text": "Describe four methods that marine scientists use to investigate the ocean, underlying geology, and organisms living in the water.",
        "subRequirements": []
      }
    ]
  },
  "reptile-and-amphibian-study": {
    "url": "https://www.scouting.org/merit-badges/reptile-and-amphibian-study/",
    "overview": "Kids always have been interested in snakes, turtles, lizards, and alligators, as well as frogs and salamanders. Developing knowledge about these captivating creatures leads to an appreciation for all native wildlife; understanding the life cycle of a reptile or amphibian and keeping one as a pet can be a good introduction to natural history; and knowing about venomous species can help Scouts to be prepared to help in case of an emergency.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Scouts must remember to follow the Leave No Trace Seven Principles and the Outdoor Code while on field trips and when collecting specimens. Make sure you have permission of the land manager prior to taking any samples for your collections. Collecting is prohibited in most National and State Parks. Scouts must not use venomous reptiles in fulfilling requirement 8(a). When you decide that keeping your specimen is no longer possible or desired, be sure to find another appropriate home for it or return it to the wild at the location of capture. Check with your counselor for those instances where the return of these specimens would not be appropriate. Under the Endangered Species Act of 1973, some plants and animals are, or may be, protected by federal law. The same ones and/or others may be protected by state law. Be sure that you do not collect protected species. Your state may require that you purchase and carry a license to collect certain species. Check with the wildlife and fish and game officials in your state regarding species regulations before you begin to collect.",
        "subRequirements": []
      },
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Describe the identifying characteristics of six species of reptiles and four species of amphibians found in the United States. For any four of these, make sketches from your own observations or take photographs. Show markings, color patterns, or other characteristics that are important in the identification of each of the four species. Discuss the habits and habitats of all 10 species.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Discuss with your counselor the approximate number of species and general geographic distribution of reptiles and amphibians in the United States. Prepare a list of the most common species found in your local area or state.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Describe the main differences between",
        "subRequirements": [
          "(a) Amphibians and reptiles",
          "(b) Alligators and crocodiles",
          "(c) Toads and frogs",
          "(d) Snakes and lizards"
        ]
      },
      {
        "number": "4.",
        "text": "Explain how reptiles and amphibians are an important component of the natural environment. List four species that are officially protected by the federal government or by the state you live in, and tell why each is protected. List three species of reptiles and three species of amphibians found in your local area that are not protected. Discuss the food habits of all 10 species.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Compare how reptiles reproduce to how amphibians reproduce.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "From observation, describe how snakes move forward. Describe the functions of the muscles, ribs, and belly plates.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Describe in detail six venomous snakes and the one venomous lizard found in the United States. Describe their habits and geographic range. Tell what you should do in case of a bite by a venomous species.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Take custody of one or more reptiles or amphibians in a manner approved by your counselor. Maintain one or more reptiles or amphibians for at least a month. Record food accepted, eating methods, changes in coloration, shedding of skins, and general habits; or keep the eggs of a reptile from the time of laying until hatching; or keep the eggs of an amphibian from the time of laying until their transformation into tadpoles (frogs) or larvae (salamanders). Whichever you choose, keep records of and report to your counselor how you cared for your animal, eggs, or larvae, including lighting, habitat, temperature and humidity maintenance, and any veterinary care requirements. Unless you are the long-term owner, at the conclusion of this study, turn the animal(s) over to another responsible party approved by your counselor.",
          "(b) Choose a reptile or amphibian that you can observe or foster at a local zoo, aquarium, nature center, local rescue, or other such exhibit (such as your classroom or school). Study the specimen weekly for a period of three months. At each visit, sketch the specimen in its captive habitat and note any changes in its coloration, shedding of skins, and general habits and behavior. Discuss with your counselor how the animal you observed was cared for to include its housing and habitat, how the lighting, temperature, and humidity were maintained, and any veterinary care requirements. Find out, either from information you locate on your own or by talking to the caretaker, what this species eats and what are its native habitat and home range, preferred climate, average life expectancy, and natural predators. Also, identify any human-caused threats to its population and any laws that protect the species and its habitat. After the observation period, share what you have learned with your counselor."
        ]
      },
      {
        "number": "9.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Identify at night three kinds of toads or frogs by their voices. Imitate the song of each for your counselor. Stalk each with a flashlight and discover how each sings and from where.",
          "(b) Identify by sight eight species of reptiles or amphibians.",
          "(c) Using visual aids, give a brief talk to a small group on three different reptiles and amphibians."
        ]
      },
      {
        "number": "10.",
        "text": "Tell five superstitions or false beliefs about reptiles and amphibians and give a correct explanation for each. Give seven examples of unusual behavior or other true facts about reptiles and amphibians.",
        "subRequirements": []
      }
    ]
  },
  "sustainability": {
    "url": "https://www.scouting.org/merit-badges/sustainability/",
    "overview": "Learn to reduce waste and teach sustainable practices to others so you can help conserve Earth's resources with the Sustainability Merit Badge. Scouts will develop and implement a plan to reduce their water usage, household food waste, and learn about the sustainability of different energy sources, including fossil fuels, solar, wind, nuclear, hydropower, and geothermal.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Check out the Digital Resource Guide for the Sustainability merit badge HERE for detailed information and helpful resources to engage your learning and assist you along on your merit badge journey! The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Describe the meaning of sustainability in your own words. Explain the importance of sustainability to society and how you can contribute to fulfilling the needs of current generations without compromising the needs of future generations.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Water. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Evaluate your household water usage. If available, review water bills from the past year and evaluate the seasonal changes in water use. Identify three ways to help reduce water consumption.",
          "(b) Explain why water is necessary in our lives. Create a diagram to show how your household gets its clean water from a natural source and what happens with the water after you use it. Tell two ways to preserve your community's access to clean water in the future.",
          "(c) Different areas of the world are affected by either too much (flooding) or too little (drought) water. Explore whether either or both affect where you live. Identify three water conservation or flood mitigation practices (successful or unsuccessful) that have been tried where you live or in an area of the world that interests you."
        ]
      },
      {
        "number": "3.",
        "text": "Food. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Explore the sustainability of different types of plant-based, animal-based and aquaculture food. Identify where four different foods (such as milk, eggs, tuna fish, avocados, or ketchup) come from and how they are processed and transported from the source to you.",
          "(b) Identify four factors that limit the availability of food in different regions of the world. Discuss how each factor influences the sustainability of worldwide food supplies. Share three ways individuals, families, or your community can create their own food sources.",
          "(c) Develop a plan to reduce your household food waste in a sustainable manner. Establish a baseline and then track and record your results for two weeks."
        ]
      },
      {
        "number": "4.",
        "text": "Community. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Create a sketch depicting how you would design a sustainable community and be prepared to explain how the housing, work locations, shops, schools, and transportation systems affect energy, pollution, natural resources, and the economy of the community.",
          "(b) Identify one unsustainable practice in your community and develop a written plan to fix it.",
          "(c) Identify five sustainability factors in housing and rate your own home's sustainability against these factors."
        ]
      },
      {
        "number": "5.",
        "text": "Energy. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Learn about the sustainability of different energy sources, including coal, gas, geothermal, hydro power, nuclear, petroleum, solar, and wind. Identify three common energy sources in the United States and describe how the production and consumption of each of these energy sources affects sustainability.",
          "(b) List eight ways your family consumes energy, such as gas appliances, electricity, heating systems or cooling systems, and transportation. For one home- and one transportation-related energy use, list three ways to help reduce consumption, reduce your carbon footprint, and be a better steward of this resource.",
          "(c) List five ways you and your family could reduce energy consumption in your home, such as adjusting your thermostat, window shades, opening windows, reducing hot-water temperature, and minimizing water consumption. Identify the benefits and risks of each idea and implement if possible."
        ]
      },
      {
        "number": "6.",
        "text": "Stuff. Do ONE of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) Create a list of 15 items of your personal \"stuff.\" Classify each item as an essential need (such as soap) or a desirable want (such as a video game). Identify any excess \"stuff\" you no longer need, working with your family, if possible. Donate, repurpose, or recycle those items you can.",
          "(b) List five ways having too much \"stuff\" affects you, your family, your community, AND the world. For each of the five ways, consider the following aspects: the financial impact, time spent, maintenance, health, storage, and waste generation. Identify practices that can be used to avoid accumulating too much \"stuff.\"",
          "(c) Research the impact waste has on the environment (land, water, air). Find out what the trash vortex is and how it was formed. Explain the number system for plastic recyclables and which plastics are more commonly recycled. Identify the average lifespan of one electronic device in your household, and whether it can be recycled in whole or part."
        ]
      },
      {
        "number": "7.",
        "text": "Do TWO of the following and discuss with your counselor:",
        "subRequirements": [
          "(a) The United Nations lists 17 Sustainable Development Goals. These include Zero Hunger, Clean Water and Sanitation, Affordable and Clean Energy, Sustainable Cities and Community, Responsible Consumption and Production, Climate Action, Life Below Water, and Life on Land. Pick one of these eight and summarize the goal and its current and future impact on you, your family, community, and the world.",
          "(b) Identify how the planetary life-support systems (soil, climate, freshwater, atmospheric, nutrient, oceanic, ecosystems, and species) support life on Earth and interact with one another. Share what happens to the planet's sustainability when these systems are disrupted by natural events or human activity.",
          "(c) Identify how product life cycles (the cycle of design, sourcing, production, use, and disposal or reuse) influence current and future sustainability. Choose one common product to demonstrate how the full product life cycle would apply.",
          "(d) Learn how the world's population affects the sustainability of Earth. Discuss three human activities that may contribute to putting Earth at risk, now and in the future.",
          "(e) Explain the term species (plant or animal) decline. Share the human activities that contribute to species decline, what can be done to help reverse the decline, and its impact on a sustainable environment.",
          "(f) Find a world map that shows the pattern of temperature change for a period of at least 100 years. Identify three factors that scientists believe affect the global weather and temperature. Discuss how climate change impacts sustainability of food, water, or other resources."
        ]
      },
      {
        "number": "8.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) On a campout or other outdoor Scouting activity that you attend, make notes on the sustainability practices you and your fellow Scouts practice. Observe transportation, forestry, soil conservation, water resources, habitat, buildings, campsites, and sanitation. Share what you observed and learned with your counselor.",
          "(b) Discuss with your counselor how living by the Scout Oath, Scout Law, Leave No Trace Seven Principles and the Outdoor Code in your daily life helps promote sustainability.",
          "(c) Identify 5 behavioral changes that you and your family can make to improve the sustainability of your household. Share and discuss each with your counselor."
        ]
      },
      {
        "number": "9.",
        "text": "Learn about career opportunities in the sustainability field. Pick one and find out the education, training, and experience required. Discuss what you have learned with your counselor and explain why this career might interest you.",
        "subRequirements": []
      }
    ]
  },
  "weather": {
    "url": "https://www.scouting.org/merit-badges/weather/",
    "overview": "Meteorology is the study of Earth's atmosphere and its weather and the ways in which temperature, wind, and moisture act together in the environment. In addition to learning how everyday weather is predicted, Scouts can learn about extreme weather such as thunderstorms, tornadoes, and hurricanes, and how to stay safe.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Define meteorology. Explain what weather is and what climate is. Discuss how the weather affects farmers, sailors, aviators, and the outdoor construction industry. Tell why weather forecasts are important to each of these groups.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Name five dangerous weather-related conditions. Give the safety rules for each when outdoors and explain the difference between a severe weather watch and a warning. Discuss the safety rules with your family.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Identify at least two sources of weather forecasts that can be used to prepare for hikes, overnight camping, and other outdoor activities. Name two sources of emergency weather warnings both at home and during outdoor Scout functions.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Explain the difference between high and low pressure systems in the atmosphere. Tell which is related to good and to poor weather. Draw cross sections of a cold front and a warm front, showing the location and movements of the cold and warm air, the frontal slope, the location and types of clouds associated with each type of front, and the location of precipitation.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Tell what causes wind, why it rains, and how lightning and hail are formed.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Identify and describe clouds in the low, middle, and upper levels of the atmosphere. Relate these to specific types of weather.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Draw a diagram of the water cycle and label its major processes. Explain the water cycle to your counselor.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Identify some human activities that can alter the environment, and describe how they affect the climate and people.",
        "subRequirements": []
      },
      {
        "number": "9.",
        "text": "Describe how the tilt of Earth's axis helps determine the climate of a region near the equator, near the poles, and across the area in between.",
        "subRequirements": []
      },
      {
        "number": "10.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Make one of the following instruments: wind vane, anemometer, rain gauge, or hygrometer. Keep a daily weather log for one week using information from this instrument as well as from other sources such as local radio and television stations, NOAA Weather Radio All Hazards, and internet sources (with your parent or guardian's permission). Record the following information at the same time every day: wind direction and speed, temperature, precipitation, and types of clouds. Be sure to make a note of any morning dew or frost. In the log, also list the weather forecasts from radio or television at the same time each day and show how the weather really turned out.",
          "(b) Visit a National Weather Service office or talk with a local radio or television weathercaster, private meteorologist, local agricultural extension service officer, or university meteorology instructor. Find out what type of weather is most dangerous or damaging to your community. Determine how severe weather and flood warnings reach the homes in your community."
        ]
      },
      {
        "number": "11.",
        "text": "Give a talk of at least five minutes to a group (such as your unit or a Cub Scout pack) explaining the outdoor safety rules in the event of lightning, flash floods, and tornadoes. Before your talk, share your outline with your counselor for approval.",
        "subRequirements": []
      },
      {
        "number": "12.",
        "text": "Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
        "subRequirements": []
      }
    ]
  },
  "archery": {
    "url": "https://www.scouting.org/merit-badges/archery/",
    "overview": "Archery is a fun way for Scouts to exercise minds as well as bodies, developing a steady hand, a good eye, and a disciplined mind. This merit badge can provide a thorough introduction to those who are new to the bow and arrow—but even for the experienced archer, earning the badge can help to increase the understanding and appreciation of archery.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain what a projectile is, and why any device that shoots a projectile at high speed must be handled with care and respect, and used only in approved locations.",
          "(b) Explain the five range safety rules.",
          "(c) Explain the four whistle commands used on the range.",
          "(d) Explain how to safely remove arrows from the target and return them to your quiver.",
          "(e) Tell your counselor about your local and state laws for owning and using archery equipment."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Name and point to the parts of an arrow.",
          "(b) Describe three or more different types of arrows.",
          "(c) Name the four principal materials for making arrow shafts.",
          "(d) Do ONE of the following:",
          "(1) Make a complete arrow from a bare shaft using appropriate equipment available to you.",
          "(2) To demonstrate arrow repair, inspect the shafts and prepare and replace at least three vanes, one point, and one nock. You may use as many arrows as necessary to accomplish this. The repairs can be done on wood, fiberglass, or aluminum arrows.",
          "(e) Explain how to properly care for and store arrows."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain the proper use, care, and storage of, as well as the reasons for using tabs, arm guards, shooting gloves, and quivers.",
          "(b) Explain the following terms: draw length, draw weight, mechanical release, and barebow."
        ]
      },
      {
        "number": "4.",
        "text": "Explain the following:",
        "subRequirements": [
          "(a) The difference between an end and a round",
          "(b) The differences among field, target, and 3-D archery",
          "(c) How the five-color World Archery Federation target is scored",
          "(d) How the National Field Archery Association (NFAA) black-and-white field targets and blue indoor targets are scored"
        ]
      },
      {
        "number": "5.",
        "text": "Working under the supervision of a certified USA Archery Level 1 Instructor or a certified long-term camp staff member (i.e., a National Camping School [NCS] Range Activities Director; or a Rangemaster over age 18 who is trained by a NCS Range Activities Director or by a USA Archery Level 1 Instructor), do ONE of the following options: Note: When using a Genesis bow, apply the requirements in Option A.",
        "subRequirements": [
          "Option A&mdash;Recurve Bow or Longbow. Do ALL of the following:",
          "(1) Name and point to the parts of the recurve or longbow you are shooting.",
          "(2) Explain how to properly care for and store recurve bows and longbows.",
          "(3) Demonstrate and explain USA Archery's 11 Steps of Shooting for the bow you are shooting.",
          "(4) Demonstrate the proper way to string a recurve bow or longbow.",
          "(5) Using a bow square, locate and mark with dental floss, crimp-on, or other method, the nocking point on the bowstring of the bow you are using.",
          "(6) Do ONE of the following:",
          "(a) Using a recurve bow or longbow and arrows with a finger release, shoot a single round of ONE of the following:",
          "(1) An NFAA field round of 14 targets and make a score of 60 points",
          "(2) A Scouting America field round of 14 targets and make a score of 80 points",
          "(3) A World Archery/USA Archery indoor round and make a score of 80 points (Indoor rounds may be shot outdoors if this is more convenient.)",
          "(4) An NFAA indoor round and make a score of 50 points (Indoor rounds may be shot outdoors if this is more convenient.)",
          "(b) Shooting 30 arrows in five-arrow ends at an 80-centimeter (32-inch) five-color target at 10 yards and using the 10 scoring regions, make a score of 150 points.",
          "Option B&mdash;Compound Bow. Do ALL of the following:",
          "(1) Name and point to the parts of the compound bow you are shooting.",
          "(2) Explain how to properly care for and store compound bows.",
          "(3) Demonstrate and explain USA Archery's 11 Steps of Shooting for the bow you are shooting.",
          "(4) Explain why it is necessary to have the string or cable on a compound bow replaced at an archery shop.",
          "(5) Locate and mark with dental floss, crimp-on, or other method, the nocking point on the bowstring of the bow you are using.",
          "(6) Do ONE of the following:",
          "(a) Using a compound bow and arrows with a finger release, shoot a single round of ONE of the following:",
          "(1) An NFAA field round of 14 targets and make a score of 70 points",
          "(2) A Scouting America field round of 14 targets and make a score of 90 points",
          "(3) A World Archery/USA Archery indoor round and make a score of 90 points (Indoor rounds may be shot outdoors if this is more convenient.)",
          "(4) An NFAA indoor round and make a score of 60 points (Indoor rounds may be shot outdoors if this is more convenient.)",
          "(b) Shooting at an 80-centimeter (32-inch) five-color target using the 10 scoring regions, make a minimum score of 160 points. Accomplish this in the following manner: Shoot 15 arrows in five-arrow ends, at a distance of 10 yards AND Shoot 15 arrows in five-arrow ends, at a distance of 15 yards."
        ]
      }
    ]
  },
  "rifle-shooting": {
    "url": "https://www.scouting.org/merit-badges/rifle-shooting/",
    "overview": "The Rifle Shooting merit badge shows you how a rifle works, how to handle it safely, and how to care for it. There is much more to shooting than squeezing the trigger. Once you have learned the fundamentals of rifle shooting, you can begin to apply them to various rifle-shooting sports and activities.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain what a projectile is, and why any device that shoots a projectile at high speed must be handled with care and respect, and used only in approved locations.",
          "(b) Explain the basic rules of safe gun handling that apply to all firearms.",
          "(c) Describe how you would react if a friend visiting your home asked to see your or your family's firearm.",
          "(d) Explain the need for, types, and use of eye protection and hearing protection.",
          "(e) Explain the main points of the laws for owning and using guns in your community and state.",
          "(f) Explain how hunting is related to the wise use of renewable wildlife resources.",
          "(g) Successfully complete a state hunter education course, or obtain a copy of the hunting laws for your state, then do the following:",
          "(1) Explain the main points of hunting laws in your state, and any special laws on the use of guns and ammunition, AND",
          "(2) List the kinds of wildlife that can be legally hunted in your state.",
          "(h) Explain to your counselor the proper hygienic guidelines followed while shooting.",
          "(i) Identify places in your community where you can join or be a part of range and target activities.",
          "(j) Discuss with your counselor a list of sources you could contact for information on firearms and their use."
        ]
      },
      {
        "number": "2.",
        "text": "Working under the supervision of a certified National Rifle Association (NRA) rifle instructor and a certified range safety officer, at a nationally authorized camp property or at a commercial firearm range (as defined in the Scouting America National Range and Target Activities Manual ), do ONE of the following options:",
        "subRequirements": [
          "Option A&mdash;Rifle Shooting (Modern Cartridge Type). Do ALL of the following:",
          "(1) Identify the three main parts of a rifle, and tell how they function.",
          "(2) Identify and demonstrate the rules for safely storing and handling a rifle.",
          "(3) Identify the two types of cartridges, their parts, and how they function.",
          "(4) Explain to your counselor what a misfire, hangfire, and squib fire are, and explain the procedures to follow in response to each.",
          "(5) Explain and demonstrate the five fundamentals of shooting a rifle: aiming, breath control, hold control, trigger control, and follow-through.",
          "(6) Demonstrate the knowledge, skills, and attitude necessary to safely shoot a rifle on a range, including understanding and following range procedures and commands.",
          "(7) Explain the basic safety rules for cleaning a rifle, and identify the materials needed.",
          "(8) Demonstrate how to clean a rifle properly and safely.",
          "(9) Discuss what points you would consider in selecting a rifle.",
          "(10) Using a bolt-action .22 caliber rimfire rifle, and shooting from a benchrest or supported prone position at 50 feet, fire five groups (three shots per group) that can be touched by a quarter. Using these targets, explain how to adjust sights to zero a rifle.",
          "(11) Adjust sights to center the group on the target and fire five groups (five shots per group). In the event that your instructor determines it is not practical to adjust the sights&mdash;for instance, on a borrowed rifle&mdash;you may explain (rather than doing) how to adjust the sights, and then fire five groups (five shots per group) in which all shots can be touched by a quarter. According to the target used, each shot in the group must meet the following minimum score: A-32 targets: 9; A-17 or TQ-1 targets: 7; A-36 targets: 5. Note: Other suitable NRA targets may be used if the specified targets are unavailable.",
          "Option B&mdash;Air Rifle Shooting (BB or Pellet). Do ALL of the following:",
          "(1) Identify the three main parts of an air rifle, and explain how they function.",
          "(2) Identify and demonstrate the rules for safely storing and handling an air rifle.",
          "(3) Identify the two most common types of air rifle ammunition.",
          "(4) Explain and demonstrate the five fundamentals of shooting an air rifle: aiming, breath control, hold control, trigger control, and follow-through.",
          "(5) Demonstrate the knowledge, skills, and attitude necessary to safely shoot on a range, including understanding and following range procedures and commands.",
          "(6) Explain the basic safety rules for cleaning an air rifle, and identify the materials needed.",
          "(7) Demonstrate how to clean an air rifle properly and safely.",
          "(8) Discuss what points you would consider in selecting an air rifle.",
          "(9) Using a BB gun or pellet rifle and shooting from a benchrest or supported prone position at 15 feet for BB guns or 33 feet for pellet rifles, fire five groups (three shots per group) that can be touched by a quarter.",
          "(10) Adjust sights to center the group on the target and fire five groups (five shots per group). In the event that your instructor determines it is not practical to adjust the sights&mdash;for instance, on a borrowed air rifle&mdash;you may explain (rather than doing) how to adjust the sights, and then fire five groups (five shots per group) in which all shots can be touched by a quarter. According to the target used, each shot in the group must meet the following minimum score: BB rifle at 15 feet (or 5 meters) using TQ-5 targets: 8; Pellet rifle at 25 feet using TQ-5 targets: 8; Pellet rifle at 33 feet (or 10 meters) using AR-1 targets: 6. Note: Other suitable NRA targets may be used if the specified targets are unavailable.",
          "Option C&mdash;Muzzleloading Rifle Shooting. Do ALL of the following:",
          "(1) Discuss with your counselor a brief history of the development of muzzleloading rifles.",
          "(2) Identify principal parts of muzzleloading rifles and discuss how they function.",
          "(3) Identify and demonstrate the rules for safely storing and handling a muzzleloading rifle.",
          "(4) Identify the various grades of black powder and explain their proper and safe use.",
          "(5) Discuss proper safety procedures pertaining to black powder storage.",
          "(6) Discuss proper components of a load.",
          "(7) Identify proper procedures and accessories used for safely loading a muzzleloading rifle.",
          "(8) Identify the causes of a muzzleloading rifle's failure to fire, and explain what a misfire, hangfire, and squib fire are. Explain and demonstrate proper preventive measures, and the procedures to follow in response to each.",
          "(9) Demonstrate the knowledge, skills, and attitude necessary to safely shoot a muzzleloading rifle on a range, including understanding and following range procedures and commands.",
          "(10) Explain the basic safety rules for cleaning a muzzleloading rifle, and identify the materials needed.",
          "(11) Demonstrate how to clean a muzzleloading rifle properly and safely.",
          "(12) Discuss what points you would consider in selecting a muzzleloading rifle.",
          "(13) Using a muzzleloading rifle of .45 or .50 caliber and shooting from a benchrest or supported prone position, fire three groups (three shots per group) at 50 feet that can be covered by the base of a standard-size soft drink can.",
          "(14) Adjust the sights to center the group on the target and fire three groups (five shots per group). In the event that your instructor determines it is not practical to adjust the sights&mdash;for instance, on a borrowed muzzleloading rifle&mdash;you may explain (rather than doing) how to adjust the sights, and then fire three groups (five shots per group) in which all shots can be covered by the base of a standard-size soft drink can. According to the target used, each shot in the group must meet the following minimum score: at 25 yards using NRA A-23 or NMLRA 50-yard targets: 7; at 50 yards using NRA A-25 or NMLRA 100-yard targets: 7. Note: Other suitable NRA targets may be used if the specified targets are unavailable."
        ]
      },
      {
        "number": "3.",
        "text": "Identify how you could apply the skills and knowledge of safe and responsible use of firearms you learned in this merit badge to pursue a career or personal hobby. Research the additional training and experience you would need, expenses you may incur, and the affiliation with organizations that could help you maximize the positive impact and enjoyment you gain from it. Discuss what you learned with your counselor, and share what short-term and long-term goals you might have if you pursued this.",
        "subRequirements": []
      }
    ]
  },
  "art": {
    "url": "https://www.scouting.org/merit-badges/art/",
    "overview": "This merit badge concentrates on two-dimensional art, specifically drawing and painting in various media, including an introduction to design applications in the fields of graphic arts and industrial design, history and design principles, and how these fields relate to fine art.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Discuss the following with your counselor:",
        "subRequirements": [
          "(a) What art is and what some of the different forms of art are",
          "(b) The importance of art to humankind",
          "(c) What art means to you and how art can make you feel"
        ]
      },
      {
        "number": "2.",
        "text": "Discuss with your counselor the following terms and elements of art: line, value, shape, form, space, color, and texture. Show examples of each element.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Discuss with your counselor the six principles of design: rhythm, balance, proportion, variety, emphasis, and unity.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Render a subject of your choice in FOUR of these ways:",
        "subRequirements": [
          "(a) Pen and ink",
          "(b) Watercolors",
          "(c) Pencil",
          "(d) Pastels",
          "(e) Oil paints",
          "(f) Tempera",
          "(g) Acrylics",
          "(h) Charcoal",
          "(i) Computer drawing or painting"
        ]
      },
      {
        "number": "5.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Design something useful. Make a sketch or model of your design. With your counselor's approval, create a promotional piece for the item using a picture or pictures.",
          "(b) Tell a story with a picture or pictures or using a 3-D rendering.",
          "(c) Design a logo. Share your design with your counselor and explain the significance of your logo. Then, with your parent or guardian's permission and your counselor's approval, put your logo on Scout equipment, furniture, ceramics, or fabric."
        ]
      },
      {
        "number": "6.",
        "text": "With your parent or guardian's permission and your counselor's approval, visit a museum, art exhibit, art gallery, artists' co-op, or artist's workshop. Find out about the art displayed or created there. Discuss what you learned with your counselor.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Find out about three career opportunities in art. Pick one and find out the education, training, and experience required for this profession. Discuss this with your counselor, and explain why this profession might interest you.",
        "subRequirements": []
      }
    ]
  },
  "basketry": {
    "url": "https://www.scouting.org/merit-badges/basketry/",
    "overview": "Basketry is a handy skill for a Scout. A basket can be a sturdy companion on campouts, carrying clothes snugly and efficiently, holding potatoes and corn for roasting over a campfire, or carrying the day's fishing catch back to camp for dinner. Baskets and basket-weaving projects also make great gifts for family and friends.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the hazards you are most likely to encounter while using basketry tools and materials, and what you should do to anticipate, help prevent, mitigate, and respond to these hazards.",
          "(b) Discuss the prevention of and first-aid treatment for injuries, including cuts, scratches, and scrapes, that could occur while working with basketry tools and materials."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Show your counselor that you are able to identify the following types of baskets: plaited, coiled, ribbed, and wicker.",
          "(b) Describe three different types of weaves to your counselor."
        ]
      },
      {
        "number": "3.",
        "text": "Plan and weave the following projects:",
        "subRequirements": [
          "(a) Square basket",
          "(b) Round basket",
          "(c) Campstool seat"
        ]
      }
    ]
  },
  "leatherwork": {
    "url": "https://www.scouting.org/merit-badges/leatherwork/",
    "overview": "Scouts who complete the requirements to earn the Leatherwork merit badge will explore leather's history and its endless uses. They will learn to make a useful leather item using the same types of raw materials that our ancestors used; be challenged to master skills like hand-stitching, lacing, and braiding.; and learn how to preserve and protect leather items so they will last a lifetime and beyond.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the hazards you are most likely to encounter while using leatherwork tools and materials, and what you should do to anticipate, help prevent, mitigate, or lessen these hazards.",
          "(b) Show that you know first aid for injuries or illnesses that could occur while working with leather, including minor cuts and scratches, puncture wounds, ingested poisoning, and reactions from exposure to chemicals such as dyes, cements, and finishes used in leatherworking."
        ]
      },
      {
        "number": "2.",
        "text": "Explain the following:",
        "subRequirements": [
          "(a) Where leather comes from",
          "(b) Kinds of hides that are used to make leather",
          "(c) Five types of leather",
          "(d) Best uses for each type of leather"
        ]
      },
      {
        "number": "3.",
        "text": "Make one or more articles of leather that use at least five of the following steps:",
        "subRequirements": [
          "(a) Pattern layout and transfer",
          "(b) Cutting leather",
          "(c) Punching holes",
          "(d) Carving or stamping surface designs",
          "(e) Applying dye or stain and finish to the project",
          "(f) Assembly by lacing or stitching",
          "(g) Setting snaps and rivets",
          "(h) Dressing edges"
        ]
      },
      {
        "number": "4.",
        "text": "Braid or plait an article out of leather, vinyl lace, or paracord.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Learn about the commercial tanning process. Report about it to your counselor.",
          "(b) Tan the skin of a small animal. Describe the safety precautions you will take and the tanning method that you used.",
          "(c) Recondition or show that you can take proper care of your shoes, a baseball glove, a saddle, furniture, or other articles of leather. Discuss with your counselor the advantages or disadvantages of leather vs. synthetic materials.",
          "(d) Visit a leather-related business. This could be a leathercraft supply company, a tannery, a leather goods or shoe factory, or a saddle shop. Report on your visit to your counselor."
        ]
      }
    ]
  },
  "metalwork": {
    "url": "https://www.scouting.org/merit-badges/metalwork/",
    "overview": "Scouts will begin their work on this merit badge by learning about the properties of metal, how to use simple metalworking tools, and the basic metalworking techniques. Then they will practice using these tools and techniques before concentrating on the more intricate skills of one of four metalworking options.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Read the safety rules for metalwork. Discuss how to be safe while working with metal. Discuss with your counselor the additional safety rules that apply to the metalwork option you choose for requirement 5.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Explain the following terms: native metal, malleable, metallurgy, alloy, nonferrous, and ferrous. Then do the following:",
        "subRequirements": [
          "(a) Name two nonferrous alloys used by pre-Iron Age metalworkers. Name the metals that are combined to form these alloys.",
          "(b) Name three ferrous alloys used by modern metalworkers.",
          "(c) Describe how to work-harden a metal.",
          "(d) Describe how to anneal a nonferrous and a ferrous metal."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Work-harden a piece of 26- or 28-gauge sheet brass or sheet copper. Put a 45-degree bend in the metal, then heavily peen the area along the bend line to work-harden it. Note the amount of effort that is required to overcome the yield point in this unworked piece of metal.",
          "(b) Soften the work-hardened piece from requirement 3(a) by annealing it, and then try to remove the 45-degree bend. Note the amount of effort that is required to overcome the yield point.",
          "(c) Make a temper color index from a flat piece of steel. Using hand tools, make and temper a center punch of medium-carbon or high-carbon steel."
        ]
      },
      {
        "number": "4.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Identify three career opportunities that would use skills and knowledge in metalworking. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(b) Identify how you might use the skills and knowledge in metalworking to pursue a personal hobby. Research the additional training required, expenses, and affiliation with organizations that would help you maximize the enjoyment and benefit you might gain from it. Discuss what you learned with your counselor and share what short-term and long-term goals you might have if you pursued this."
        ]
      },
      {
        "number": "5.",
        "text": "After completing the first four requirements, complete ONE of the following options:",
        "subRequirements": [
          "Option A&mdash;Sheet Metal Mechanic/Tinsmith. Do ALL of the following:",
          "(1) Name and describe the use of the basic sheet metalworking tools.",
          "(2) Create a sketch of two objects to make from sheet metal. Include each component's dimensions on your sketch, which need not be to scale.",
          "(3) Make two objects out of 24- or 26-gauge sheet metal. Use patterns either provided by your counselor or made by you and approved by your counselor. Construct these objects using a metal that is appropriate to the object's ultimate purpose, and using cutting, bending, edging, and either soldering or brazing.",
          "(a) One object also must include at least one riveted component.",
          "(b) If you do not make your objects from zinc-plated sheet steel or tin-plated sheet steel, preserve your work from oxidation.",
          "Option B&mdash;Silversmith. Do ALL of the following:",
          "(1) Name and describe the use of a silversmith's basic tools.",
          "(2) Create a sketch of two objects to make from sheet silver. Include each component's dimensions on your sketch, which need not be to scale.",
          "(3) Make two objects out of 18- or 20-gauge sheet copper. Use patterns either provided by your counselor or made by you and approved by your counselor. Both objects must include a soldered joint. If you have prior silversmithing experience, you may substitute sterling silver, nickel silver, or lead-free pewter.",
          "(a) At least one object must include a sawed component you have made yourself.",
          "(b) At least one object must include a sunken part you have made yourself.",
          "(c) Clean and polish your objects.",
          "Option C&mdash;Founder. Do ALL of the following:",
          "(1) Name and describe the use of the basic parts of a two-piece mold. Name at least three different types of molds.",
          "(2) Create a sketch of two objects to cast in metal. Include each component's dimensions on your sketch, which need not be to scale.",
          "(3) Make two molds, one using a pattern provided by your counselor and another one you have made yourself that has been approved by your counselor. Position the pouring gate and vents yourself. Note: Do not use copyrighted materials as patterns.",
          "(a) Using lead-free pewter, make a casting using a mold provided by your counselor.",
          "(b) Using lead-free pewter, make a casting using the mold that you have made.",
          "Option D&mdash;Blacksmith. Do ALL of the following:",
          "(1) Name and describe the use of a blacksmith's basic tools.",
          "(2) Make a sketch of two objects to hot-forge. Include each component's dimensions on your sketch, which need not be to scale.",
          "(3) Using low-carbon steel at least 1/4 inch thick, perform the following exercises:",
          "(a) Draw out by forging a taper.",
          "(b) Use the horn of the anvil by forging a U -shaped bend.",
          "(c) Form a decorative twist in a piece of square steel.",
          "(d) Use the edge of the anvil to bend metal by forging an L -shaped bend.",
          "(4) Using low-carbon steel at least 1/4 inch thick, make the two objects you sketched that require hot-forging. Be sure you have your counselor's approval before you begin.",
          "(a) Include a decorative twist on one object.",
          "(b) Include a hammer-riveted joint in one object.",
          "(c) Preserve your work from oxidation."
        ]
      }
    ]
  },
  "sculpture": {
    "url": "https://www.scouting.org/merit-badges/sculpture/",
    "overview": "This merit badge introduces Scouts to sculpture, an art form that allows an artist to express what he sees and feels by using these three dimensions by shaping materials such as clay, stone, metal, and wood.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Explain to your counselor the precautions that must be followed for the safe use and operation of a sculptor's tools, equipment, and other materials.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Model in clay a life-size human head. Then sculpt in modeling clay, carve in wood or plaster, or use 3D modeling software to make a small-scale model of an animal or person. Explain to your counselor the method and tools you used to sculpt the figure.",
          "(b) Make a plaster mold of a fruit or vegetable. In this mold, make a copy of the fruit or vegetable. Explain to your counselor the method and tools you used to make the copy.",
          "(c) With your parent or guardian's permission and your counselor's approval, visit a museum, art exhibit, art gallery, artists' co-op, or artist's studio. After your visit, share with your counselor what you have learned. Discuss the importance of visual arts and how it strengthens social tolerance and helps stimulate cultural, intellectual, and personal development."
        ]
      },
      {
        "number": "3.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from this merit badge to pursue a hobby. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "wood-carving": {
    "url": "https://www.scouting.org/merit-badges/wood-carving/",
    "overview": "As with any art, wood carving involves learning the basics of design, along with material selection and tools and techniques, as well as wood-carving safety. The requirements of the Wood Carving merit badge introduce Scouts to an enjoyable hobby and that can become a lifetime activity.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the hazards you are most likely to encounter while wood carving, and what you should do to anticipate, help prevent, mitigate, or lessen these hazards.",
          "(b) Show that you know first aid for injuries that could occur while wood carving, including minor cuts and scratches and splinters."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Earn the Totin' Chip recognition.",
          "(b) Discuss with your counselor your understanding of the Safety Checklist for Carving."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor, orally or in writing, the care and use of five types of tools that you may use in a carving project.",
          "(b) Tell your counselor how to care for and use several types of sharpening devices, then demonstrate that you know how to use these devices."
        ]
      },
      {
        "number": "4.",
        "text": "Using a piece of scrap wood or a project on which you are working, show your counselor that you know how to do the following:",
        "subRequirements": [
          "(a) Paring cut",
          "(b) Basic cut and push cut",
          "(c) V cut",
          "(d) Stop cut or score line"
        ]
      },
      {
        "number": "5.",
        "text": "Tell why different woods are used for different projects. Explain why you chose the type of wood you did for your projects in requirements 6 and 7.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Plan your own or select a project from the Wood Carving merit badge pamphlet and complete a simple carving in the round.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Complete a simple low-relief OR a chip carving project.",
        "subRequirements": []
      }
    ]
  },
  "camping": {
    "url": "https://www.scouting.org/merit-badges/camping/",
    "overview": "Camping is one of the best-known methods of the Scouting movement. When he founded the Scouting movement in the early 1900s, Robert Baden-Powell encouraged every Scout to learn the art of living out-of-doors. He believed a young person able to take care of himself while camping would have the confidence to meet life's other challenges, too.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the most likely hazards you may encounter while participating in camping activities and what you should do to anticipate, help prevent, mitigate, and respond to these hazards.",
          "(b) Discuss with your counselor why it is important to be aware of weather conditions before and during your camping activities. Tell how you can prepare should the weather turn bad during your campouts.",
          "(c) Show that you know first aid for and how to prevent injuries or illnesses that could occur while camping, including hypothermia, frostbite, heat reactions, dehydration, altitude sickness, insect stings, tick bites, snakebite, blisters, and hyperventilation."
        ]
      },
      {
        "number": "2.",
        "text": "Learn the Leave No Trace Seven Principles and the Outdoor Code, and explain what they mean. Write a personal and group plan for implementing these principles on your next outing.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Make a written plan for an overnight trek and show how to get to your camping spot by using a topographical map and one of the following:",
        "subRequirements": [
          "(a) Compass",
          "(b) GPS receiver",
          "(c) Smartphone with a GPS app"
        ]
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Make a duty roster showing how your patrol is organized for an actual overnight campout. List assignments for each member.",
          "(b) Help a Scout patrol or a Webelos Scout unit in your area prepare for an actual campout, including creating the duty roster, menu planning, equipment needs, general planning, and setting up camp."
        ]
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Prepare a list of clothing you would need for overnight campouts in both warm and cold weather. Explain the term \"layering.\"",
          "(b) Discuss footwear for different kinds of weather and how the right footwear is important for protecting your feet.",
          "(c) Explain the proper care and storage of camping equipment (clothing, footwear, bedding).",
          "(d) List the Scout Basic Essentials necessary for any campout, and explain why each item is needed.",
          "(e) Present yourself to your Scoutmaster with your pack for inspection. Be correctly clothed and equipped for an overnight campout."
        ]
      },
      {
        "number": "6.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Describe the features of four types of tents, when and where they could be used, and how to care for tents. Working with another Scout, pitch a tent.",
          "(b) Discuss the importance of camp sanitation and tell why water treatment is essential. Then demonstrate two ways to treat water.",
          "(c) Describe the factors to be considered in deciding where to pitch your tent.",
          "(d) Tell the difference between internal- and external-frame packs. Discuss the advantages and disadvantages of each.",
          "(e) Discuss the types of sleeping bags and what kind would be suitable for different conditions. Explain the proper care of your sleeping bag and how to keep it dry. Make a comfortable ground bed."
        ]
      },
      {
        "number": "7.",
        "text": "Prepare for an overnight campout with your patrol by doing the following:",
        "subRequirements": [
          "(a) Make a checklist of personal and patrol gear that will be needed.",
          "(b) Pack your own gear and your share of the patrol equipment and food for proper carrying. Show that your pack is right for quickly getting what is needed first, and that it has been assembled properly for comfort, weight, balance, size, and neatness."
        ]
      },
      {
        "number": "8.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain the safety procedures for:",
          "(1) Using a propane or butane/propane stove",
          "(2) Using a liquid fuel stove",
          "(3) Proper storage of extra fuel",
          "(b) Discuss the advantages and disadvantages of different types of lightweight cooking stoves.",
          "(c) Prepare a camp menu. Explain how the menu would differ from a menu for a backpacking or float trip. Give recipes and make a food list for your patrol. Plan two breakfasts, three lunches, and two suppers. Discuss how to protect your food against bad weather, animals, and contamination.",
          "(d) While camping in the outdoors, cook at least one breakfast, one lunch, and one dinner for your patrol from the meals you have planned for requirement 8(c). At least one of those meals must be a trail meal requiring the use of a lightweight stove."
        ]
      },
      {
        "number": "9.",
        "text": "Show experience in camping by doing the following:",
        "subRequirements": [
          "(a) Camp for at least 20 nights at designated Scouting activities or events. One long-term camping experience of up to six consecutive nights may be applied toward this requirement. Two nights may be counted toward the total for each additional long-term camping trip. Each night must be spent either under the sky, in a tent you have pitched yourself (if a tent is provided and already set up, you do not need to pitch your own), in a hammock that is safely strung outdoors, in a lean-to, or other three-sided shelter with an open front. Nights spent in indoor lock-in events, cabin camping, hotel stays, or other covered accommodations do not count toward the 20 nights.",
          "(b) On any of these camping experiences, you must do TWO of the following, only with proper preparation and under qualified supervision.",
          "(1) Hike up a mountain, gaining at least 1,000 vertical feet.",
          "(2) Backpack, snowshoe, or cross-country ski for at least 4 miles.",
          "(3) Take a bike trip of at least 15 miles or at least four hours.",
          "(4) Take a nonmotorized trip on the water of at least four hours or 5 miles.",
          "(5) Plan and carry out an overnight snow camping experience.",
          "(6) Rappel down a rappel route of 30 feet or more.",
          "(c) On any of these camping experiences, perform a conservation project approved by the landowner or land managing agency. This can be done alone or with others."
        ]
      },
      {
        "number": "10.",
        "text": "Discuss how the things you did to earn this badge have taught you about personal health and safety, survival, public health, conservation, and good citizenship. In your discussion, tell how Scout spirit and the Scout Oath and Scout Law apply to camping and outdoor ethics.",
        "subRequirements": []
      }
    ]
  },
  "cooking": {
    "url": "https://www.scouting.org/merit-badges/cooking/",
    "overview": "The Cooking merit badge introduces principles of cooking that can be used both at home or in the outdoors. Scouts who earn this badge will learn about food safety, nutritional guidelines, meal planning, and methods of food preparation, and will review the variety of culinary (or cooking) careers available.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Repeating Meals or Menus: The meals prepared for Cooking merit badge requirements 4, 5, and 6 will count only toward this merit badge and may not be used for rank advancement or any other merit badge. Meals prepared for rank advancement or other merit badges may not be counted toward the Cooking merit badge. Menus used for meals in requirements 4, 5, and 6 must not be repeated. Outdoor Cooking: Where local regulations do not allow you to build a fire, the counselor may adjust the requirement to meet the law. The meals in requirements 5 and 6 may be prepared for different trips and need not be prepared consecutively. Scouts working on this badge in summer camp should take into consideration foods that can be obtained at the camp commissary.",
        "subRequirements": []
      },
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Health and safety. Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the most likely hazards you may encounter while participating in cooking activities and what you should do to anticipate, help prevent, mitigate, and respond to these hazards.",
          "(b) Show that you know first aid for and how to prevent injuries or illnesses that could occur while preparing meals and eating, including burns and scalds, cuts, choking, and allergic reactions.",
          "(c) Describe how meat, fish, chicken, eggs, dairy products, and fresh vegetables should be stored, transported, and properly prepared for cooking. Explain how to prevent cross-contamination.",
          "(d) Discuss with your counselor food allergies, food intolerance, and food-related illnesses and diseases. Explain why someone who handles or prepares food needs to be aware of these concerns.",
          "(e) Discuss with your counselor why reading food labels is important. Explain how to identify common allergens such as peanuts, tree nuts, milk, eggs, wheat, soy, and shellfish."
        ]
      },
      {
        "number": "2.",
        "text": "Nutrition. Do the following:",
        "subRequirements": [
          "(a) Using the MyPlate food guide or the current USDA nutrition model, give five examples for EACH of the following food groups, the recommended number of daily servings, and the recommended serving size: (1) Fruits (2) Vegetables (3) Grains (4) Proteins (5) Dairy",
          "(b) Explain why you should limit your intake of oils and sugars.",
          "(c) Track your daily level of activity and your daily caloric need based on your activity for five days. Then, based on the MyPlate food guide, discuss with your counselor an appropriate meal plan for yourself for one day.",
          "(d) Discuss your current eating habits with your counselor and what you can do to eat healthier, based on the MyPlate food guide.",
          "(e) Discuss the following food label terms: calorie, fat, saturated fat, trans fat, cholesterol, sodium, carbohydrate, dietary fiber, sugar, and protein. Explain how to calculate total carbohydrates and nutritional values for two servings, based on the serving size specified on the label."
        ]
      },
      {
        "number": "3.",
        "text": "Cooking Basics. Do the following:",
        "subRequirements": [
          "(a) Discuss the following cooking methods. For each one, describe the equipment needed, how temperature control is maintained, and name at least one food that can be cooked using that method: baking, boiling, broiling, pan frying, simmering, microwaving, air frying, grilling, foil cooking, and Dutch oven.",
          "(b) Discuss the benefits of using a camp stove on an outing vs. a charcoal or wood fire.",
          "(c) Describe for your counselor how to manage your time when preparing a meal so components for each course are ready to serve at the correct time.",
          "(d) Explain and give examples of how taste, texture, and smell impact what we eat."
        ]
      },
      {
        "number": "4.",
        "text": "Cooking at Home. Do the following: Note: The meals for requirement 4 may be prepared on different days, and they need not be prepared consecutively. The requirement calls for Scouts to plan, prepare, and serve one breakfast, one lunch, and one dinner to at least one adult; those served need not be the same for all meals.",
        "subRequirements": [
          "(a) Using the MyPlate food guide or the current USDA nutrition model, plan menus for three full days of meals (three breakfasts, three lunches, and three dinners) plus one dessert. Your menus should include enough to feed yourself and at least one adult, keeping in mind any special needs (such as food allergies) and how you keep your foods safe and free from cross-contamination. List the equipment and utensils needed to prepare and serve these meals.",
          "(b) Find recipes for each meal. Create a shopping list for your meals showing the amount of food needed to prepare for the number of people you will serve. Determine the cost for each meal.",
          "(c) Share and discuss your meal plan and shopping list with your counselor.",
          "(d) Using at least five of the 10 cooking methods from requirement 3, prepare and serve yourself and at least one adult (parent, family member, guardian, or other responsible adult) one breakfast, one lunch, one dinner, and one dessert from the meals you planned.",
          "(e) Time your cooking to have each meal ready to serve at the proper time. Have an adult verify the preparation of the meal to your counselor.",
          "(f) After each meal, ask a person you served to evaluate the meal on presentation and taste, then evaluate your own meal. Discuss what you learned with your counselor, including any adjustments that could have improved or enhanced your meals. Tell how planning and preparation help ensure a successful meal."
        ]
      },
      {
        "number": "5.",
        "text": "Camp Cooking. Do the following:",
        "subRequirements": [
          "(a) Using the MyPlate food guide or the current USDA nutrition model, plan a menu that includes four meals, one snack, and one dessert for your patrol (or a similar size group of up to eight youth, including you) on a camping trip. These four meals must include two breakfasts, one lunch, and one dinner. Additionally, you must plan one snack and one dessert. Your menus should include enough food for each person, keeping in mind any special needs (such as food allergies) and how you keep your foods safe and free from cross-contamination. List the equipment and utensils needed to prepare and serve these meals.",
          "(b) Find or create recipes for the four meals, the snack, and the dessert you have planned. Adjust menu items in the recipes for the number to be served. Create a shopping list and budget to determine the per-person cost.",
          "(c) Share and discuss your menu plans and shopping list with your counselor.",
          "(d) In the outdoors, using your menu plans and recipes for this requirement, cook two of the four meals you planned using either a camp stove OR backpacking stove. Use a skillet OR a Dutch oven over campfire coals for the third meal, and cook the fourth meal in a foil pack OR on a skewer. Serve all of these meals to your patrol or a group of youth.",
          "(e) In the outdoors, using your menu plans and recipes for this requirement, prepare one snack and one dessert. Serve both of these to your patrol or a group of youth.",
          "(f) After each meal, have those you served evaluate the meal on presentation and taste, and then evaluate your own meal. Discuss what you learned with your counselor, including any adjustments that could have improved or enhanced your meals. Tell how planning and preparation help ensure successful outdoor cooking.",
          "(g) Lead the clean-up of equipment, utensils, and the cooking site thoroughly after each meal. Properly store or dispose unused ingredients, leftover food, dishwater and garbage.",
          "(h) Discuss how you followed the Leave No Trace Seven Principles and the Outdoor Code when preparing your meals."
        ]
      },
      {
        "number": "6.",
        "text": "Trail and Backpacking Meals. Do the following:",
        "subRequirements": [
          "(a) Using the MyPlate food guide or the current USDA nutrition model, plan a day of meals for trail hiking or backpacking that includes one breakfast, one lunch, one dinner, and one snack. These meals must consider weight, not require refrigeration and are to be consumed by three to five people (including you). List the equipment and utensils needed to prepare and serve these meals.",
          "(b) Create a shopping list for your meals, showing the amount of food needed to prepare and serve each meal, and the cost for each meal.",
          "(c) Share and discuss your menu and shopping list with your counselor. Your plan must include how to repackage foods for your hike or backpacking trip to eliminate as much bulk, weight, and garbage as possible.",
          "(d) While on a trail hike or backpacking trip, prepare and serve two meals and a snack from the menu planned for this requirement. At least one of those meals must be cooked over a fire, or an approved trail stove (with proper supervision).",
          "(e) After each meal, have those you served evaluate the meal on presentation and taste, then evaluate your own meal. Discuss what you learned with your counselor, including any adjustments that could have improved or enhanced your meals. Tell how planning and preparation help ensure successful trail hiking or backpacking meals.",
          "(f) Explain to your counselor how you should divide the food and cooking supplies among the patrol in order to share the load. Discuss how to properly clean the cooking area and store your food to protect it from animals."
        ]
      },
      {
        "number": "7.",
        "text": "Careers and Hobbies. Do ONE of the following:",
        "subRequirements": [
          "(a) Identify three career opportunities that would use skills and knowledge in cooking. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(b) Identify how you might use the skills and knowledge in cooking to pursue a personal hobby or healthy lifestyle. Research the additional training required, expenses, and affiliation with organizations that would help you maximize the enjoyment and benefit you might gain from it. Discuss what you learned with your counselor and share what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "emergency-preparedness": {
    "url": "https://www.scouting.org/merit-badges/emergency-preparedness/",
    "overview": "Scouts are often called upon to help because they know first aid and they know about the discipline and planning needed to react to an emergency situation. Earning this merit badge helps a Scout to be prepared by learning the actions that can be helpful and needed before, during, and after an emergency.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Emergency Situations. Do the following:",
        "subRequirements": [
          "(a) Discuss with your counselor the aspects of emergency preparedness and include in your discussion the kinds of questions that are important to ask yourself as you consider each of these: prevention, protection, mitigation, response, and recovery.",
          "(b) Using a chart, spreadsheet, or another method approved by your counselor, demonstrate your understanding of each aspect of emergency preparedness listed in requirement 1(a) (prevention, protection, mitigation, response, and recovery) for 10 emergency situations from the list below. Discuss your findings with your counselor.",
          "(1) Home stovetop or oven fire",
          "(2) Home flammable liquid fire",
          "(3) Gas leak in or near a home or with outside cooking",
          "(4) Food poisoning",
          "(5) Automobile crash",
          "(6) Vehicle stalled in the desert",
          "(7) Vehicle trapped in a blizzard",
          "(8) Backcountry injury",
          "(9) Boating or water accident",
          "(10) Toxic chemical spills and releases",
          "(11) Nuclear power plant emergency",
          "(12) Fire or explosion in a public place",
          "(13) Violence in a public place",
          "(14) Wildland fire",
          "(15) Avalanche (snowslide or rockslide)",
          "(16) Earthquake",
          "(17) Tsunami",
          "(18) Major flooding or a flash flood with water outage",
          "(19) Hurricane with power outage",
          "(20) Tornado",
          "(21) Lightning storm"
        ]
      },
      {
        "number": "2.",
        "text": "Planning for Family Emergencies. Do the following:",
        "subRequirements": [
          "(a) At a family meeting, discuss the situations on the chart you created for requirement 1(b) and make emergency plans for sheltering-in-place and for evacuation of your home. Discuss your family meeting and plans with your counselor.",
          "(b) Develop and practice a plan of escape for your family in case of fire in your home. Draw a floor plan with escape routes and a map with a safe meeting place. Discuss your family's home escape plan with your counselor.",
          "(c) Using a checklist in the Emergency Preparedness merit badge pamphlet or one approved by your counselor, prepare or inspect a family disaster kit for sheltering-in-place and for evacuation of your home. Review the needs and uses of the items in a kit with your counselor."
        ]
      },
      {
        "number": "3.",
        "text": "Preventing Accidents and Emergencies. Do ONE of the following:",
        "subRequirements": [
          "(a) Using a home safety checklist included in the Emergency Preparedness merit badge pamphlet or one approved by your counselor, inspect a home (or a similar building near where you live or at a camp) for safety hazards with the help of an adult. Present your completed checklist to and discuss your findings with your counselor.",
          "(b) Develop emergency prevention plans for five family activities outside the home, as approved by your counselor. (Examples are taking a picnic to a park, seeing a movie, attending a worship service, an outing at a beach, traveling to visit a relative, or attending a ball game or concert.) Each plan should include an analysis of possible hazards, proposals to prevent, protect from, mitigate, respond to, and recover from emergencies, and the reasons for the actions that you propose."
        ]
      },
      {
        "number": "4.",
        "text": "Dangerous Situations. Show how you could save a person from the following dangerous situations without putting yourself in danger:",
        "subRequirements": [
          "(a) Live household electric wire",
          "(b) A structure filled with carbon monoxide",
          "(c) Clothes on fire",
          "(d) Drowning, using nonswimming rescues (including accidents on ice)"
        ]
      },
      {
        "number": "5.",
        "text": "Signaling for Help. Do the following:",
        "subRequirements": [
          "(a) Show three ways of attracting and communicating with rescue aircraft or drones.",
          "(b) Show ways to attract the attention of searchers on the ground if you are lost in the wilderness.",
          "(c) Show ways to attract the attention of searchers on the water if you are stranded with a capsized or disabled motorboat or sailboat."
        ]
      },
      {
        "number": "6.",
        "text": "Moving an Injured Person. With another person, show two good ways to transport an injured person out of a remote area using improvised stretchers to conserve the energy of rescuers while ensuring the well-being and protection of the injured person.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "National Incident Management System (NIMS) and Incident Command System (ICS). Do the following:",
        "subRequirements": [
          "(a) Describe the National Incident Management System (NIMS) and the local Incident Command System (ICS).",
          "(b) Find out how your community and its leaders work to manage and to train for disasters. Discuss this information with your counselor.",
          "(c) Discuss how a Scout troop can help in an emergency situation using ICS."
        ]
      },
      {
        "number": "8.",
        "text": "Emergency Service. Do the following:",
        "subRequirements": [
          "(a) Discuss with your counselor the duties that a Scout troop should be prepared to do, the training they need, and the safety precautions they should take for the following emergency services:",
          "(1) Crowd and traffic control",
          "(2) Messenger service during an incident",
          "(3) Collection and distribution services",
          "(4) Group feeding, shelter, and sanitation",
          "(b) Prepare a written plan for mobilizing your troop when needed to do emergency service. If your troop already has a mobilization plan, present the plan to your counselor and tell your part in making the plan work.",
          "(c) Using a checklist in the Emergency Preparedness merit badge pamphlet or one approved by your counselor, prepare or inspect a personal emergency service pack for a mobilization call. Explain the needs and uses of the contents to your counselor.",
          "(d) Take part in an emergency service project, either a real one or a practice exercise, with a Scouting troop or a community agency or at Scout camp or at a school. Review what you learned and practiced with your counselor."
        ]
      },
      {
        "number": "9.",
        "text": "First Aid Merit Badge. Earn the First Aid merit badge.",
        "subRequirements": []
      },
      {
        "number": "10.",
        "text": "Careers. Do ONE of the following:",
        "subRequirements": [
          "(a) Interview an emergency services coordinator or a civil servant about their work in disaster management. Learn about how they chose this career and about their duties. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(b) Identify three career opportunities that would use skills and knowledge in emergency services. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities, and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(c) Identify how you might use the skills and knowledge in the field of emergency preparedness to pursue a personal hobby and/or healthy lifestyle. Research the additional training required, expenses, and affiliation with organizations that would help you maximize the enjoyment and benefit you might gain from it. Discuss what you learned with your counselor and share what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "first-aid": {
    "url": "https://www.scouting.org/merit-badges/first-aid/",
    "overview": "First aid—caring for injured or ill persons until they can receive professional medical care—is an important skill for every Scout. With some knowledge of first aid, a Scout can provide immediate care and help to someone who is hurt or who becomes ill. First aid can help prevent infection and serious loss of blood. It could even save a limb or a life.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Handling a First Aid Emergency. Do the following:",
        "subRequirements": [
          "(a) Explain the steps necessary to assess and handle a first aid emergency, including a safety evaluation of the scene.",
          "(b) Tell how you would obtain emergency medical assistance from your home and from a remote location on a wilderness camping trip.",
          "(c) Demonstrate the precautions you must take to reduce the risk of transmitting an infection between you and the victim while administering first aid, including the safe disposal of used first aid supplies.",
          "(d) Demonstrate evaluation of and management of a patient's airway and breathing.",
          "(e) Demonstrate a thorough examination of an accident victim.",
          "(f) Discuss why shock is an emergency.",
          "(g) Define the term triage and describe examples of triage situations that you may encounter."
        ]
      },
      {
        "number": "2.",
        "text": "Preparing for First Aid Emergencies. Do the following:",
        "subRequirements": [
          "(a) Obtain a copy of the Scout Annual Health and Medical Record and discuss the importance of the form including information on immunizations, allergies, medications, health history, and medical examinations to providing first aid at Scouting events.",
          "(b) Using checklists provided in the First Aid merit badge pamphlet or ones approved by your counselor, do the following:",
          "(1) Assemble a personal first-aid kit for hiking and backpacking. Demonstrate the proper use of each item in your first-aid kit to your counselor.",
          "(2) With your counselor, inspect a unit, home, vehicle, or camp first-aid kit and discuss your findings."
        ]
      },
      {
        "number": "3.",
        "text": "Wounds with No External Bleeding. Describe the symptoms and signs of, show first aid for, and explain prevention of these wounds:",
        "subRequirements": [
          "(a) Closed wounds, such as a bruise (contusion) or a hematoma",
          "(b) Superficial, partial thickness, and full thickness thermal (heat) burns or scalds",
          "(c) Chemical burns",
          "(d) Electrical burns",
          "(e) Sunburn",
          "(f) Snow blindness",
          "(g) Immersion foot, frostnip, frostbite, and ice burns",
          "(h) Abrasions, such as chafing and rope burns",
          "(i) Blisters on the hands, feet, buttocks, and shoulders",
          "(j) Puncture wounds from splinters, rope splinters, nails, and fish hooks",
          "(k) Rash from poisonous plants",
          "(l) Bug bites of chiggers, ticks, mosquitoes, and biting gnats",
          "(m) Bee stings",
          "(n) Bites of spiders",
          "(o) Sting of a scorpion",
          "(p) Bite of a pet or wild mammal or human",
          "(q) Bite of a venomous snake"
        ]
      },
      {
        "number": "4.",
        "text": "Bleeding Wounds. Describe the symptoms and signs of, show first aid for, and explain prevention of these wounds:",
        "subRequirements": [
          "(a) A nosebleed.",
          "(b) An open wound with mild or moderate bleeding, such as a scratch or a scrape (abrasions), or a shallow cut (laceration).",
          "(c) An open wound with severe bleeding such as a deep cut on an arm or leg.",
          "(d) Explain when it is appropriate and is not appropriate to use one or more tourniquets. List some of the benefits and dangers of using a tourniquet. Demonstrate the application of a tourniquet without tightening it."
        ]
      },
      {
        "number": "5.",
        "text": "Breathing Emergencies. Describe the symptoms and signs of, show first aid for, and explain prevention of these conditions affecting breathing:",
        "subRequirements": [
          "(a) Choking",
          "(b) Asthmatic attack",
          "(c) Anaphylaxis from an insect bite or sting or from food or product allergy",
          "(d) Inhalation injuries",
          "(e) Altitude sickness"
        ]
      },
      {
        "number": "6.",
        "text": "Loss of Consciousness. Describe the symptoms and signs of, show first aid for, and explain prevention of these conditions causing loss of consciousness:",
        "subRequirements": [
          "(a) Fainting",
          "(b) Hypoglycemia",
          "(c) Seizure",
          "(d) Drug overdose and alcohol poisoning",
          "(e) Underwater hypoxic blackout",
          "(f) Cold water shock and drowning",
          "(g) Lightning strike and electric shock"
        ]
      },
      {
        "number": "7.",
        "text": "Heart Attack. Do the following:",
        "subRequirements": [
          "(a) Explain what a heart attack is.",
          "(b) Describe the symptoms and signs of a heart attack and first aid for this condition.",
          "(c) Describe the conditions that must exist before performing CPR on a person.",
          "(d) Demonstrate proper CPR technique using a training device approved by your counselor.",
          "(e) Explain the use of an automated external defibrillator (AED).",
          "(f) Demonstrate or simulate the proper use of an AED, using an AED training device if available.",
          "(g) Identify the typical location(s) of one or more AED(s) at public facilities in your community, such as, your school, place of worship, unit meeting place, sports facilities, and/or camp or by using a smart phone app. Discuss the reasons for choosing locations like these."
        ]
      },
      {
        "number": "8.",
        "text": "Muscle and Bone Injuries. Do the following:",
        "subRequirements": [
          "(a) Explain the similarities and differences in a strain, a muscle tear, a tendon rupture, a sprain, a dislocation, a simple fracture, and a compound fracture.",
          "(b) Describe the symptoms and signs of and first aid for a muscle strain, a muscle tear, and a tendon rupture.",
          "(c) Describe the symptoms and signs of, and potential complications of, a sprain, a fracture, and a dislocation.",
          "(d) Demonstrate bandages for these injuries:",
          "(1) Arm slings for forearm or upper arm or collarbone fractures",
          "(2) Elastic wrap and cravat bandages for ankle sprain",
          "(3) Elastic wrap and cravat bandages for wrist sprain or hand injury",
          "(e) Demonstrate the proper procedures for handling and splinting of suspected closed or open fractures or dislocations of the:",
          "(1) Finger and toe",
          "(2) Forearm or wrist",
          "(3) Upper leg",
          "(4) Lower leg or ankle"
        ]
      },
      {
        "number": "9.",
        "text": "Head and Spine Injuries. Do the following:",
        "subRequirements": [
          "(a) Describe the symptoms and signs of, relationships between, possible complications of, and prevention of head, neck, and back injuries.",
          "(b) Describe the symptoms and signs of and first aid for a concussion.",
          "(c) Demonstrate first aid for an open head wound with a triangular or other bandage.",
          "(d) Demonstrate first aid for someone with a suspected neck or back injury."
        ]
      },
      {
        "number": "10.",
        "text": "Moving a Patient. Do the following:",
        "subRequirements": [
          "(a) Describe the conditions under which an injured person should and should not be moved.",
          "(b) If a sick or an injured person must be moved, tell how you would decide the best method. Demonstrate these methods.",
          "(c) By yourself and with a partner, demonstrate how to transport a person from a smoke-filled room.",
          "(d) By yourself and with a partner, demonstrate how to transport a person with a sprained ankle for at least 25 yards.",
          "(e) With helpers under your supervision, improvise a stretcher and move a presumably unconscious person for at least 25 yards."
        ]
      },
      {
        "number": "11.",
        "text": "Heat- and Cold-Related Conditions. Describe the symptoms and signs of, show first aid for, and explain prevention of these conditions associated with exertion and/or heat or cold exposure:",
        "subRequirements": [
          "(a) Dehydration and over-hydration",
          "(b) Heat cramps and muscle pain after exertion",
          "(c) Heat exhaustion",
          "(d) Heat stroke",
          "(e) Chest pains associated with cold exposure",
          "(f) Hypothermia"
        ]
      },
      {
        "number": "12.",
        "text": "Mental Health Conditions. Describe the following:",
        "subRequirements": [
          "(a) Reactions associated with at least three stressful situations, such as mountain backpacking, rappelling, a ropes course, speaking before an audience, making a phone call to an adult, taking a swim test, missing home, lighting a match, trying out for a sports team, meeting someone for the first time, or other stressful circumstances",
          "(b) The actions that you and others should take to prepare for and manage these situations",
          "(c) The indications that someone might be a danger to themselves or others",
          "(d) The actions that you should take if you suspect that someone might be a danger to themselves or others"
        ]
      },
      {
        "number": "13.",
        "text": "Miscellaneous Conditions. Describe the symptoms and signs of, show first aid for, and explain prevention of the following conditions:",
        "subRequirements": [
          "(a) Object in the eye",
          "(b) Broken, chipped, loosened, or knocked out tooth",
          "(c) Vomiting and diarrhea associated with food poisoning",
          "(d) Abdominal pain",
          "(e) Stroke"
        ]
      },
      {
        "number": "14.",
        "text": "With guidance from your counselor, develop a plan to teach a first-aid skill or topic using the EDGE method. Discuss your skill, topic, and plan with your counselor, and then teach your skill or topic to your family or to one or more Scouts.",
        "subRequirements": []
      },
      {
        "number": "15.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Visit an emergency medical station house or training center in person. From the medical first responders that you meet during your visit, learn about how they serve their community and about their careers. Discuss with your counselor what you learned during your tour and interviews.",
          "(b) Interview an emergency medical services professional about their work. Learn about how they chose this career and about their duties. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(c) Identify three career opportunities that would use skills and knowledge in emergency medical services. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities, and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
          "(d) Identify how you might use the skills and knowledge in the field of emergency medical services to pursue a personal hobby and/or healthy lifestyle. Research the additional training required, expenses, and affiliation with organizations that would help you maximize the enjoyment and benefit you might gain from it. Discuss what you learned with your counselor and share what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "geocaching": {
    "url": "https://www.scouting.org/merit-badges/geocaching/",
    "overview": "The word geocache is a combination of “geo,” which means “earth,” and “cache,” which means “a hiding place.” Geocaching describes a hiding place on planet Earth—a hiding place you can find using a GPS unit.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop. Additional educational resources are available on our Counselor Information Page.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the most likely hazards you may encounter while participating in geocaching activities, and what you should do to anticipate, help prevent, mitigate, and respond to these hazards.",
          "(b) Discuss first aid and prevention for the types of injuries or illnesses that could occur while participating in geocaching activities, including cuts, scrapes, snakebite, insect stings, tick bites, exposure to poisonous plants, heat and cold reactions (sunburn, heatstroke, heat exhaustion, hypothermia), and dehydration.",
          "(c) Discuss how to properly plan an activity that uses GPS, including using the buddy system, sharing your plan with others, and considering the weather, route, and proper attire."
        ]
      },
      {
        "number": "2.",
        "text": "Discuss the following with your counselor:",
        "subRequirements": [
          "(a) Why you should never bury a cache",
          "(b) How to use proper geocaching etiquette when hiding or seeking a cache, and how to properly hide, post, maintain, and dismantle a geocache",
          "(c) The Leave No Trace Seven Principles and the Outdoor Code as they apply to geocaching"
        ]
      },
      {
        "number": "3.",
        "text": "Explain the following terms used in geocaching: waypoint, log, cache, accuracy, difficulty and terrain ratings, attributes, and trackable. Choose five additional terms to explain to your counselor.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Explain how the Global Positioning System (GPS) works. Then, using Scouting's EDGE, demonstrate to your counselor the use of a GPS unit. Include marking and editing a waypoint, changing field functions, and changing the coordinate system in the unit.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Show you know how to use a map and compass and explain why this is important for geocaching.",
          "(b) Explain the similarities and differences between GPS navigation and standard map-reading skills and describe the benefits of each."
        ]
      },
      {
        "number": "6.",
        "text": "Describe to your counselor the four steps to finding your first cache. Then mark and edit a waypoint.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "With your parent or guardian's permission, go to www.geocaching.com. Type in your city and state to locate public geocaches in your area. Share with your counselor the posted information about three of those geocaches. Then, pick one of the three and find the cache. Note: To fulfill this requirement, you will need to set up a free user account with www.Geocaching.com. Before doing so, ask your parent or guardian for permission and help.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) If a Cache to Eagle&reg; series exists in your council, visit at least three of the locations in the series. Describe the projects that each cache you visit highlights, and explain how the Cache to Eagle&reg; program helps share our Scouting service with the public.",
          "(b) Create a Scouting-related Travel Bug&reg; that promotes one of the values of Scouting. Release your Travel Bug into a public geocache and, with your parent or guardian's permission, monitor its progress at www.geocaching.com for 30 days. Keep a log, and share this with your counselor at the end of the 30-day period.",
          "(c) Set up and hide a public geocache, following the guidelines in the Geocaching merit badge pamphlet. Before doing so, share with your counselor a three-month maintenance plan for the geocache where you are personally responsible for those three months. After setting up the geocache, with your parent or guardian's permission, follow the logs online for 30 days and share them with your counselor. You must archive the geocache when you are no longer maintaining it.",
          "(d) Explain what Cache In Trash Out (CITO) means, and describe how you have practiced CITO at public geocaches or at a CITO event. Then, either create CITO containers to leave at public caches, or host a CITO event for your unit or for the public."
        ]
      },
      {
        "number": "9.",
        "text": "Plan a geohunt for a youth group such as your troop or a neighboring pack, at school, or your place of worship. Choose a theme, set up a course with at least four waypoints, teach the players how to use a GPS unit, and play the game. Tell your counselor about your experience, and share the materials you used and developed for this event.",
        "subRequirements": []
      }
    ]
  },
  "golf": {
    "url": "https://www.scouting.org/merit-badges/golf/",
    "overview": "Golf is unique because the players police themselves. Other sports depend upon referees or umpires to apply penalties when there are infractions of the rules. In golf, every player is expected to act honorably, and the welfare and integrity of the game rely on every player's honesty. This is why golf often is referred to as a \"gentleman's game.\"",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Discuss safety on the golf course. Show that you know first aid for injuries or illnesses that could occur while golfing, including lightning, heat reactions, sunburn, dehydration, blisters, animal or bug bites, poison ivy exposure, sprains, and strains.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Complete ONE of the following options:",
        "subRequirements": [
          "Option A&mdash;Traditional Golf. Do ALL of the following:",
          "(1) Study the USGA Rules of Golf now in use.",
          "(a) Tell about the three categories of golf etiquette.",
          "(b) Demonstrate that you understand the definitions of golf terms.",
          "(c) Show that you understand the Rules of Amateur Status.",
          "(2) Tell about your understanding of the World Handicap System.",
          "(3) Do the following:",
          "(a) Tell about the early history of golf.",
          "(b) Describe golf's early years in the United States.",
          "(c) Tell about the accomplishments of a top golfer of your choice.",
          "(4) Do the following:",
          "(a) Tell how golf can contribute to a healthy lifestyle, mentally and physically.",
          "(b) Tell how a golf exercise plan can help you play better. Show two exercises that would help improve your game.",
          "(5) Show the following:",
          "(a) The proper grip, stance, posture, and key fundamentals of a good swing",
          "(b) Driver played from a tee",
          "(c) The fairway wood shot",
          "(d) The long iron shot",
          "(e) The short iron shot",
          "(f) The approach, chip-and-run, and pitch shots",
          "(g) A recovery shot from a bunker or heavy rough",
          "(h) A sound putting stroke",
          "(6) Play a minimum of two nine-hole rounds or one 18-hole round of golf with another golfer about your age and with your counselor, or an adult approved by your counselor. Do the following:",
          "(a) Follow the Rules of Golf.",
          "(b) Practice good golf etiquette.",
          "(c) Show respect to fellow golfers, committee, sponsor, and gallery.",
          "(7) Find out about three careers related to traditional golf. Pick one and identify the education, training, and experience required for this profession. Discuss this with your counselor, and explain why this interests you.",
          "Option B&mdash;Disc Golf. Do ALL of the following:",
          "(1) Study the PDGA Official Rules of Disc Golf now in use.",
          "(a) Tell about the six areas of Courtesy (812).",
          "(b) Describe the seven areas of Scoring (808).",
          "(2) Tell about the history of disc golf and why it is an inclusive game.",
          "(3) Do the following:",
          "(a) Tell about the history of disc golf and why it is an inclusive game.",
          "(b) Discuss with your counselor the contributions Ed Headrick made to the sport of disc golf.",
          "(c) Describe the evolution of disc design.",
          "(d) Tell about the accomplishments of a top disc golfer of your choice.",
          "(4) Do the following:",
          "(a) Tell how disc golf can contribute to a healthy lifestyle, mentally and physically.",
          "(b) Tell how a disc golf exercise plan can help you play better. Show two exercises that would help improve your game.",
          "(5) Show the following:",
          "(a) A good throwing grip",
          "(b) A good runup (X-step) when throwing a disc",
          "(c) Backhand shot",
          "(d) Forehand shot",
          "(e) Overhand shot",
          "(f) Rolling shot",
          "(g) A good (in-line) putting stance",
          "(h) A good straddle putting stance",
          "(i) A good putting grip",
          "(j) A good putting motion & follow through",
          "(k) The proper use of a mini-marking disc",
          "(6) Play a minimum of 18-holes of disc golf with another disc golfer about your age and with your counselor, or an adult approved by your counselor. Do the following:",
          "(a) Follow the PDGA Official Rules of Disc Golf .",
          "(b) Practice good disc golf etiquette.",
          "(c) Show respect to fellow disc golfers and other people in the park along with any wildlife, trees, and plants on the property.",
          "(7) Find out about three careers related to disc golf. Pick one and identify the education, training, and experience required for this profession. Discuss this with your counselor, and explain why this interests you."
        ]
      }
    ]
  },
  "orienteering": {
    "url": "https://www.scouting.org/merit-badges/orienteering/",
    "overview": "Orienteering, the use of map and compass to find locations and plan a journey, has been a vital skill for humans for thousands of years. Orienteering is also a recognized sport at the Olympic Games, and thousands of people participate in the sport each year in local clubs and competitions.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Show that you know first aid for the following types of injuries that could occur while orienteering: cuts, scratches, blisters, snakebite, insect stings, tick bites, heat and cold reactions (sunburn, heatstroke, heat exhaustion, hypothermia), dehydration. Explain to your counselor why you should be able to identify poisonous plants and poisonous animals that are found in your area.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Explain what orienteering is.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain how a compass works. Describe the features of an orienteering compass.",
          "(b) In the field, show how to take a compass bearing and follow it."
        ]
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain how a topographic map shows terrain features. Point out and name five terrain features on a map and in the field.",
          "(b) Point out and name 10 symbols on a topographic map.",
          "(c) Explain the meaning of declination . Tell why you must consider declination when using map and compass together.",
          "(d) Show a topographic map with magnetic north-south lines.",
          "(e) Show how to measure distances on a map using an orienteering compass.",
          "(f) Show how to orient a map using a compass."
        ]
      },
      {
        "number": "5.",
        "text": "Set up a 100-meter pace course. Determine your walking and running pace for 100 meters. Tell why it is important to pace-count.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Identify 20 international control description symbols. Tell the meaning of each symbol.",
          "(b) Show a control description sheet and explain the information provided.",
          "(c) Explain the following terms and tell when you would use them: attack point, collecting feature, catching feature, aiming off, contouring, reading ahead, handrail, relocation, and rough versus fine orienteering."
        ]
      },
      {
        "number": "7.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Take part in three orienteering events. One of these must be a cross-country course. Note: While orienteering is primarily an individual sport, Scouting America Youth Protection procedures call for using the buddy system. Requirement 7(a) can be completed by pairs or groups of Scouts.",
          "(b) After each event, write a report with (1) a copy of the master map and control description sheet, (2) a copy of the route you took on the course, (3) a discussion of how you could improve your time between control points, and (4) a list of your major weaknesses on this course. Describe what you could do to improve."
        ]
      },
      {
        "number": "8.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Set up a cross-country course that is at least 2,000 meters long with at least five control markers. Prepare the master map and control description sheet.",
          "(b) Set up a score orienteering course with at least 12 control points and a time limit of at least 60 minutes. Set point values for each control. Prepare the master map and control description sheet."
        ]
      },
      {
        "number": "9.",
        "text": "Act as an official during an orienteering event. This may be during the running of the course you set up for requirement 8.",
        "subRequirements": []
      },
      {
        "number": "10.",
        "text": "Teach orienteering techniques to your patrol, troop, or crew.",
        "subRequirements": []
      }
    ]
  },
  "pioneering": {
    "url": "https://www.scouting.org/merit-badges/pioneering/",
    "overview": "Pioneering—the knowledge of ropes, knots, and splices along with the ability to build rustic structures by lashing together poles and spars—is among the oldest of Scouting's skills. Practicing rope use and completing projects with lashings also allow Scouts to connect with past generations, ancestors who used many of these skills as they sailed the open seas and lived in America's forests and prairies.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: All pioneering projects constructed for this merit badge must comply with height standards as outlined in the Guide to Safe Scouting . Counselors should also ensure that Scouts follow the Leave No Trace Seven Principles and the Outdoor Code in their pioneering projects. Just as hiking and camping without a trace are signs of expert outdoorsmanship, protecting the environment is a mark of responsible pioneering. Minimize impacts to the land.",
        "subRequirements": []
      },
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the most likely hazards you might encounter while participating in pioneering activities and what you should do to anticipate, help prevent, mitigate, and respond to these hazards.",
          "(b) Discuss the prevention of, and first-aid treatment for, injuries and conditions that could occur while working on pioneering projects, including rope splinters, rope burns, cuts, scratches, insect bites and stings, hypothermia, dehydration, heat exhaustion, heatstroke, sunburn, and falls."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Demonstrate the West Country method of whipping a rope.",
          "(b) Demonstrate how to tie a rope tackle and the following knots: clove hitch formed as two half hitches, clove hitch on a bight, butterfly knot, roundturn with two half hitches, and rolling hitch.",
          "(c) Demonstrate and explain when to use the following lashings: square, diagonal, round, shear, tripod, and floor lashing."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Using square and tripod lashings from requirement 2(c), build a Tripod Wash Station (or with your counselor's permission, another camp gadget of your own design).",
          "(b) Using rolling hitches or roundturns with two half hitches, and round lashings from requirements 2(b) and 2(c), build a 15-foot Scout Stave Flagpole (or with your counselor's permission, another camp gadget of your own design).",
          "(c) Using shear, square, and floor lashings, clove hitches on a bight, and rope tackles from requirements 2(b) and 2(c), build a Simple Camp Table (or with your counselor's permission, another camp gadget of your own design)."
        ]
      },
      {
        "number": "4.",
        "text": "Explain the differences between synthetic ropes and natural-fiber ropes. Discuss which types of rope are suitable for pioneering work and why. Include the following in your discussion: breaking strength, safe working loads, and the care and storage of rope.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Explain the uses for the back splice, eye splice, and short splice. View a demonstration on forming each splice.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Using a rope-making device or machine, make a rope at least 6 feet long consisting of three strands, each having three yarns. Whip the ends.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Explain the importance of effectively anchoring a pioneering project. Describe to your counselor the 3-2-1 anchoring system and the log-and-stake anchoring system.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Describe the lashings that are used when building a trestle, how the poles are positioned, and how X braces contribute to the overall structural integrity of a pioneering project.",
        "subRequirements": []
      },
      {
        "number": "9.",
        "text": "Working in a group, (or individually with the help of your counselor) build a full size pioneering structure, using one of the following designs in the Pioneering merit badge pamphlet: Double A-Frame Monkey Bridge, Single A-Frame Bridge, Single Trestle Bridge, Single Lock Bridge, 4x4 Square Climbing Tower, Four Flag Gateway Tower, Double Tripod Chippewa Kitchen, or another type of structure approved in advance by your counselor. Carefully plan the project, assembling and organizing all the materials, referring to the points under Safe Pioneering, and complying with the height restrictions in the Guide to Safe Scouting .",
        "subRequirements": []
      }
    ]
  },
  "search-and-rescue": {
    "url": "https://www.scouting.org/merit-badges/search-and-rescue/",
    "overview": "A search is an emergency situation requiring a team of trained searchers to locate a missing person. A rescue is an emergency situation where a person's location is known – perhaps having just been found by searchers – and he or she must be removed from danger and returned to safety. By working on the Search and Rescue merit badge, you will learn and practice many skills that may someday save a life.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Prohibited Activities The Scouting America's Guide to Safe Scouting states under \"Prohibited Activities\" that flying in aircraft as part of a search and rescue mission is a prohibited activity for youth members. For complete information, see Scouting America's Guide to Safe Scouting.",
        "subRequirements": []
      },
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Hazards and First Aid. Do the following:",
        "subRequirements": [
          "(a) Show or explain first aid for, and prevention of, injuries and conditions that searchers and subjects could develop during an SAR situation, including:",
          "(1) Dehydration",
          "(2) Heatstroke",
          "(3) Hypothermia",
          "(4) Shock",
          "(5) Blisters",
          "(6) Eye injuries",
          "(7) Ankle and knee sprains",
          "(8) Bug bites of chiggers, ticks, mosquitoes, and biting gnats",
          "(9) Bee stings",
          "(10) Bites of spiders",
          "(11) Sting of a scorpion",
          "(12) Bite of a wild mammal",
          "(13) Bite of a venomous snake",
          "(b) Explain how the Scout Basic Essentials address hazards outdoors and help lost Scouts stay safe before they are rescued.",
          "(c) Discuss how the safety gear carried by SAR team members in their field packs address SAR hazards."
        ]
      },
      {
        "number": "2.",
        "text": "Staying and Getting Found. Do the following:",
        "subRequirements": [
          "(a) Explain how a trip plan and the buddy system help Scouts with staying found and getting found.",
          "(b) Explain how seasonal and daily weather changes affect Trip Plans.",
          "(c) Explain and show how a lost Scout could send signals that would alert a ground, airborne, or water SAR team to their location.",
          "(d) Demonstrate how to use a signaling mirror.",
          "(e) Explain how a Personal Locator Beacon (PLB) works and the role of the Air Force Rescue Coordination Center (AFRCC)."
        ]
      },
      {
        "number": "3.",
        "text": "Maps. Using a map, a compass and a GPS device or app approved by your counselor, do the following:",
        "subRequirements": [
          "(a) Point out and explain the 5 D's (Date, Description, Details, Direction or Declination, Distance) of the map.",
          "(b) Choose a location on the map and record the altitude, latitude, longitude, and US National Grid coordinates. Describe how these coordinate systems differ.",
          "(c) Orient the map and take a bearing to another map location. Estimate the distance between, and describe the terrain between, the two locations.",
          "(d) Show a hypothetical place last seen and point out an area on your map that could be used for containment using natural or human-made boundaries."
        ]
      },
      {
        "number": "4.",
        "text": "Incident Command System (ICS). Do the following:",
        "subRequirements": [
          "(a) Explain how a local ICS is organized and how it compares with Scouting's patrol method.",
          "(b) Explain how local community agencies work to train for and manage search and rescue situations."
        ]
      },
      {
        "number": "5.",
        "text": "SAR Teams. Do the following:",
        "subRequirements": [
          "(a) Explain the official duties of a search and rescue team.",
          "(b) Explain the differences between wilderness, urban, and water SARs.",
          "(c) Identify four types of search and rescue teams and explain situations where they are used."
        ]
      },
      {
        "number": "6.",
        "text": "Search and Rescue Procedures. Do the following:",
        "subRequirements": [
          "(a) Explain the difference between search and rescue.",
          "(b) Explain the difference between PLS (place last seen) and LKP (last known point).",
          "(c) Explain the importance of effective communication in SAR operations.",
          "(d) Explain how predictions of \"lost person behavior\" determine SAR search plans for a young child, a teenager, and an adult.",
          "(e) Explain the following terms:",
          "(1) Evaluating search urgency",
          "(2) Establishing confinement",
          "(3) Scent item",
          "(4) Area air scent dog",
          "(5) Briefing and debriefing",
          "(6) Clue awareness",
          "(7) Evidence preservation",
          "(8) Tracking a subject",
          "(9) Locating a subject using attraction",
          "(10) Hasty search",
          "(11) Trail sweep search",
          "(12) Grid search"
        ]
      },
      {
        "number": "7.",
        "text": "Plan and Complete a Search. Do the following with a team of Scouts, friends, or family to execute a practice SAR exercise:",
        "subRequirements": [
          "(a) Choose a hypothetical SAR scenario, either one presented in the Search and Rescue merit badge pamphlet or one approved by your counselor.",
          "(b) Develop an Incident Action Plan (IAP) for a hasty search using the scenario information.",
          "(c) Before the search begins, conduct a PAUSE briefing to review hazards, safety concerns, personal and shared Scout Basic Essentials, and other gear.",
          "(d) Execute the search.",
          "(e) After the search, hold a team debriefing to discuss the search, problems, successful and unsuccessful tactics, and ideas for improvement."
        ]
      },
      {
        "number": "8.",
        "text": "Careers. Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to Search and Rescue merit badge or emergency management. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. With permission of your parent or guardian, your research methods may include an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from this merit badge to serve as a volunteer on a disaster relief team, a wilderness rescue team, or a ski patrol. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursue this."
        ]
      }
    ]
  },
  "wilderness-survival": {
    "url": "https://www.scouting.org/merit-badges/wilderness-survival/",
    "overview": "In their outdoor activities, Scouts learn to bring the clothing and gear they need, to make good plans, and do their best to manage any risks. But now and then, something unexpected happens. When things go wrong, the skills of wilderness survival can help make everything right again.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Hazards and First Aid. Do the following:",
        "subRequirements": [
          "(a) Show or explain first aid for, and prevention of, injuries and conditions that could occur in backcountry settings, including:",
          "(1) Dehydration",
          "(2) Heatstroke",
          "(3) Hypothermia",
          "(4) Shock",
          "(5) Blisters",
          "(6) Eye injuries",
          "(7) Ankle and knee sprains",
          "(8) Bug bites of chiggers, ticks, mosquitoes, and biting gnats",
          "(9) Bee stings",
          "(10) Bites of spiders",
          "(11) Sting of a scorpion",
          "(12) Bite of a wild mammal",
          "(13) Bite of a venomous snake",
          "(b) Explain how the Scout Basic Essentials address hazards of survival situations and are basic to a survival kit.",
          "(c) Explain how a trip plan could help prevent a wilderness survival situation."
        ]
      },
      {
        "number": "2.",
        "text": "Priorities for Survival. Explain the importance of each of the seven priorities of survival in a wilderness location.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Avoiding Panic. Describe ways to avoid panic and to maintain a high level of morale when lost, and explain why this is important.",
        "subRequirements": []
      },
      {
        "number": "4",
        "text": "First Aid Kits. Put together a personal first aid kit and a personal survival kit. Show how items in the kits are used.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Shelter. Do the following:",
        "subRequirements": [
          "(a) Describe the steps you would take to survive in the following exposure conditions:",
          "(1) Cold and snowy",
          "(2) Wet",
          "(3) Hot and dry",
          "(4) Windy",
          "(5) At or on the water",
          "(b) Show that you know the proper clothing to wear while in the outdoors during extremely hot and cold weather and during wet conditions.",
          "(c) Explain how to protect yourself from bears and raccoons.",
          "(d) Describe how to build or find survival shelters in a forest or in snow.",
          "(e) Improvise a natural shelter. For the purpose of this demonstration, use techniques that have little negative impact on the environment. Spend a night in your shelter."
        ]
      },
      {
        "number": "6.",
        "text": "Fire Building. Using three different methods (other than matches), build and light three fires.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Signaling. Do the following:",
        "subRequirements": [
          "(a) Explain and show how lost or stranded Scouts could send signals to attract the attention of ground, airborne, or water search teams.",
          "(b) Demonstrate how to use a signal mirror.",
          "(c) Describe from memory five ground-to-air signals and tell what they mean."
        ]
      },
      {
        "number": "8.",
        "text": "Water. Demonstrate three ways to treat water found in the outdoors to prepare it for drinking.",
        "subRequirements": []
      },
      {
        "number": "9.",
        "text": "Food. Explain why it usually is not wise to eat wild plants or wildlife in a wilderness survival situation.",
        "subRequirements": []
      },
      {
        "number": "10.",
        "text": "Careers. Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. With permission of your parent or guardian, your research methods may include an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from the Wilderness Survival merit badge to pursue a hobby or to serve as volunteer. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursue this."
        ]
      }
    ]
  },
  "wildland-fire-management": {
    "url": "https://www.scouting.org/merit-badges/wildland-fire-management/",
    "overview": "Wildfires cause significant destruction across the U.S. each year, with smoke affecting public health nationwide. Yet fire also plays a beneficial role in many ecosystems, supporting habitats and forest regeneration. Managing this balance between preventing harmful fires and promoting beneficial ones is a growing national challenge. As Scouts, we can help make our homes, camps, and communities more fire-resilient, understand fire's natural role in wildlands, and even explore careers in wildland fire management.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Check out the Digital Resource Guide for the Wildland Fire Management merit badge HERE for detailed information and helpful resources to engage your learning and assist you along on your merit badge journey!",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "History of Wildland Fire. Research and discuss with your counselor the history of wildland fire, its suppression, prevention, and management in the United States.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Harms of Wildfire. Research the harm caused by wildfire in the United States, including annual acres burned for the past three years. Discuss with your counselor. Include the negative impacts that wildfire has on the following:",
        "subRequirements": [
          "(a) Commercial forest products",
          "(b) Fish and wildlife habitat",
          "(c) Soil and water",
          "(d) Recreation and public use",
          "(e) Homes, communities, and human resources",
          "(f) Air quality and public health"
        ]
      },
      {
        "number": "3.",
        "text": "Fire as a Management Tool. Discuss with your counselor how prescribed fire is used to accomplish the following:",
        "subRequirements": [
          "(a) Fuel reduction",
          "(b) Fish and wildlife habitat enhancement",
          "(c) Ecosystem restoration",
          "(d) Forest regeneration",
          "(e) Insect and disease control"
        ]
      },
      {
        "number": "4.",
        "text": "Wildfire Prevention and Mitigation. Discuss the following with your counselor:",
        "subRequirements": [
          "(a) Wildfire Prevention:",
          "(1) The main causes of wildfire in the United States",
          "(2) How you can prevent human caused wildfires in your community and on outings with your unit.",
          "(b) Wildfire Mitigation:",
          "(1) Wildland-Urban Interface",
          "(2) Defensible space and how homes and communities in the wildland-urban interface can be protected from wildfire"
        ]
      },
      {
        "number": "5.",
        "text": "Fire Behavior. Do the following:",
        "subRequirements": [
          "(a) Discuss with your counselor how the fire environment affects wildland fire behavior. Include examples of the influences of weather, topography, and fuel.",
          "(b) Explain how a wildfire can be suppressed by removing heat, fuel, or oxygen.",
          "(c) Draw a diagram to illustrate the parts of a wildfire."
        ]
      },
      {
        "number": "6.",
        "text": "Wildland Firefighter Safety. Do the following:",
        "subRequirements": [
          "(a) Discuss with your counselor the personal protective equipment used by wildland firefighters and its use.",
          "(b) Discuss the following with your counselor, including why each is an important consideration for maintaining personal safety and situational awareness during wildland fire suppression activities:",
          "(1) 10 Standard Firefighting Orders",
          "(2) 18 Watch Out Situations",
          "(3) Lookouts, Communication, Escape Routes, and Safety Zones (LCES)"
        ]
      },
      {
        "number": "7.",
        "text": "Wildfire Suppression Tactics. Do the following:",
        "subRequirements": [
          "(a) Alone or with a small team, using the diagram you created in Requirement 5(c) or a map of a wildfire, and tokens to represent firefighting resources, demonstrate the following wildland fire suppression tactics. Explain under which conditions each tactic would be used:",
          "(1) Direct attack",
          "(2) Indirect attack",
          "(3) Minimum impact suppression tactics",
          "(4) Use of hand crews, machinery, and aircraft",
          "(5) Mop-up",
          "(6) Repair and restoration",
          "(b) Draw a diagram of the Incident Command System. Alone or with your team, explain the responsibilities of the Command and General Staff positions on a wildfire incident."
        ]
      },
      {
        "number": "8.",
        "text": "Wildfire Suppression Tools. Do the following:",
        "subRequirements": [
          "(a) Demonstrate the use of three hand tools unique to wildland fire suppression. Use one of these tools to demonstrate how to construct a fireline.",
          "(b) Discuss seven other tools, equipment, or apparatus that are unique to wildland fire suppression and explain how these resources are used."
        ]
      },
      {
        "number": "9.",
        "text": "Taking Action. Do ONE of the following:",
        "subRequirements": [
          "(a) Develop a fire readiness plan for a wildland area with which you are familiar. The plan should include a map showing available resources, water supplies, natural and manmade barriers, and access. The plan should discuss fuel loads, available fire apparatus, structure protection needs, values at risk, medical and evacuation considerations and potential fire suppression tactics.",
          "(b) Visit with a state or federal forestry official or your local fire warden. Discuss the causes of and types of wildland fire that occur in your area. Discuss the prime fire season(s) in your area. Identify the agency responsible for wildland fire suppression in your area. Discuss what you learned with your counselor.",
          "(c) Conduct a Firewise assessment of a home or a building in the wildland-urban interface, which could include a Scout camp building or facility. Identify potential risks and fire hazards. With your counselor's approval, complete a project to reduce the wildfire risk and increase the preparedness of the building. Write a brief report about what you did and learned from the assessment and project.",
          "(d) Meet with a Fire Prevention Specialist or a local fire official to learn about fire prevention efforts in your community. From what you learned, prepare a fire prevention message (skit, video, or billboard concept) and share with your counselor and troop (or other group approved by your counselor).",
          "(e) Meet with a meteorologist or someone familiar with fire weather and discuss the fire weather concerns and typical fire seasons that exist in your area. Discuss the conditions that lead to a Fire Weather Watch or a Red Flag Warning. Discuss what you learned with your counselor."
        ]
      },
      {
        "number": "10.",
        "text": "Apply Your Learning to a Real Event. Research an historic catastrophic wildland fire incident that occurred in the United States. Discuss with your counselor and/or your troop or a group approved by your counselor the conditions that led to the incident, how the incident was managed, and how the incident could have been prevented. Explain what lessons were learned and how this incident affected future fire suppression policy or suppression tactics.",
        "subRequirements": []
      },
      {
        "number": "11.",
        "text": "Careers in Wildland Fire Management. Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include-with your parent or guardian's permission-an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
        "subRequirements": []
      }
    ]
  },
  "animation": {
    "url": "https://www.scouting.org/merit-badges/animation/",
    "overview": "In Animation merit badge you’ll learn how to create animations, the ways in which animation is used and the fun and exciting career opportunities in animation.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "General Knowledge. Do the following:",
        "subRequirements": [
          "(a) In your own words, describe to your counselor what animation is.",
          "(b) Discuss with your counselor a brief history of animation."
        ]
      },
      {
        "number": "2.",
        "text": "Principles of Animation. Choose five of the following 12 principles of animation, and discuss how each one makes an animation appear more believable: squash and stretch, anticipation, staging, straight ahead action and pose to pose, follow through and overlapping action, slow in and slow out, arcs, secondary action, timing, exaggeration, solid drawing, and appeal.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Projects. With your counselor's approval, choose two animation techniques and do the following for each:",
        "subRequirements": [
          "(a) Technique 1",
          "(1) Plan your animation using thumbnail sketches and/or layout drawings either on paper or using an animation software program.",
          "(2) Create the animation.",
          "(3) Share your animations with your counselor. Explain how you created each one, and discuss any improvements that could be made.",
          "(b) Technique 2",
          "(1) Plan your animation using thumbnail sketches and/or layout drawings.",
          "(2) Create the animation.",
          "(3) Share your animations with your counselor. Explain how you created each one, and discuss any improvements that could be made."
        ]
      },
      {
        "number": "4.",
        "text": "Animation in our World. Do the following:",
        "subRequirements": [
          "(a) Tour an animation studio or a business where animation is used, either in person, via video, or via the internet. Share what you have learned with your counselor.",
          "(b) Discuss with your counselor how animation might be used in the future to make your life more enjoyable and productive."
        ]
      },
      {
        "number": "5.",
        "text": "Careers. Learn about three career opportunities in animation. Pick one and find out about the education, training, and experience required for this profession. Discuss your findings with your counselor. Explain why this profession might interest you.",
        "subRequirements": []
      }
    ]
  },
  "chess": {
    "url": "https://www.scouting.org/merit-badges/chess/",
    "overview": "Chess is among the oldest board games in the world, and it ranks among the most popular games ever created. Chess is played worldwide—even over the Internet. Players meet for fun and in competition, everywhere from kitchen tables and park benches to formal international tournaments.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Discuss with your counselor the history of the game of chess.",
          "(b) Research a famous chess player and what accomplishments made him or her famous. Discuss with your counselor."
        ]
      },
      {
        "number": "2.",
        "text": "Discuss with your counselor the following:",
        "subRequirements": [
          "(a) Why chess is considered a game of planning and strategy.",
          "(b) The benefits of playing chess, including developing critical thinking skills, concentration skills, and decision-making skills, and how these skills can help you in other areas of your life.",
          "(c) Sportsmanship and chess etiquette"
        ]
      },
      {
        "number": "3.",
        "text": "Demonstrate to your counselor that you know each of the following. Then, using Scouting EDGE to teach someone who does not know how to play chess:",
        "subRequirements": [
          "(a) The name of each chess piece",
          "(b) How to set up a chessboard",
          "(c) How each chess piece moves and captures, including: four rules of castling, en passant captures, pawn promotion, check, ways to get out of check, and checkmate",
          "(d) The five ways a game can end in a draw"
        ]
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Demonstrate scorekeeping using the algebraic system of chess notation.",
          "(b) Discuss the differences between the opening, the middle game, and the endgame.",
          "(c) Explain four opening principles. Demonstrate for your counselor the first five moves of the following openings: Ruy Lopez, French Defense, Queen's Gambit Declined, Sicilian Defense.",
          "(d) On a chessboard, demonstrate Scholar's Mate, Fool's Mate, L&eacute;gal Mate, Fried Liver Attack, and Noah's Ark Trap."
        ]
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain four of the following elements of chess strategy: exploiting weaknesses, force, king safety, pawn structure, space, tempo, and clock management.",
          "(b) Explain any five of these chess tactics: clearance sacrifice, decoy, discovered attack, double check, double attack, fork, interposing, overloading, overprotecting, pin, skewer, remove the defender, zwischenzug, and zugzwang.",
          "(c) Set up a chessboard as follows and with White to move first, demonstrate how to force checkmate on the Black king:",
          "(1) White on e1 , the White rooks on a1 and h1 , and the Black king on e5",
          "(2) White king on e1 , White queen on d1 , Black king on e5",
          "(3) White king on e1 , White rook on a1 , Black king on e5",
          "(d) With White king on d4 , White pawn on e3 , and Black king on e6 :",
          "(1) With White to move, demonstrate how White can force Black to allow their pawn to reach the last rank and be promoted to a queen.",
          "(2) With Black to move, demonstrate how Black can force a draw.",
          "(e) Set up and solve five direct-mate problems provided by your counselor."
        ]
      },
      {
        "number": "6.",
        "text": "Explain to your counselor how chess tournaments are run, including the Swiss system tournament format, the round robin tournament format, pairings for each round, time controls, touch move, scoring, and chess ratings.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Play at least three games of chess with other Scouts and/or your counselor. Replay the games from your score sheets and discuss with your counselor how you might have played each game differently.",
          "(b) Play in a scholastic (youth) chess tournament and use your score sheets from that tournament to replay your games with your counselor. Discuss with your counselor how you might have played each game differently.",
          "(c) Organize and run a chess tournament with at least four players, plus you. Have each competitor play at least two games."
        ]
      }
    ]
  },
  "digital-technology": {
    "url": "https://www.scouting.org/merit-badges/digital-technology/",
    "overview": "Comprehend how electronic devices work and how to use them effectively with the Digital Technology Merit Badge. Scouts will give a brief history of the changes in digital technology and discuss how technology today compares with the technology available to previous generations—all while imagining what kinds of devices might be available to them in the future.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "View the Personal Safety Awareness \"Digital Safety\" video (with your parent or guardian's permission).",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Give a brief history of the changes in digital technology over time. Discuss with your counselor how digital technology in your lifetime compares with that of your parent's, grandparent's, or other adult's lifetime.",
          "(b) Describe what kinds of computers or devices you imagine might be available when you are an adult."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor how text, sound, and pictures are digitized for storage.",
          "(b) Describe the difference between lossy and lossless data compression, and give an example where each might be used.",
          "(c) Describe two digital devices and how they are made more useful by their programming.",
          "(d) Discuss the similarities and differences between computers, mobile devices, and gaming consoles.",
          "(e) Explain what a computer network is and the difference between a local area network (LAN) versus a wide area network (WAN)."
        ]
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain what a program or software application or \"app\" is and how a computer uses a CPU and memory to execute it.",
          "(b) Name four software programs or mobile apps you or your family use, and explain how each one helps you.",
          "(c) Describe what malware is, and explain how to protect your digital devices and the information stored on them.",
          "(d) Explain what a barcode, a QR code, and an RFID tag are along with the data they contain and two or more examples where each are used."
        ]
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Describe at least two different ways data can be transferred through the internet.",
          "(b) Using an internet search engine (with a parent or guardian's permission), find ideas from at least three different websites about how to conduct a troop court of honor or campfire program. Present the ideas to your counselor and explain how you used a search engine to find this information.",
          "(c) Use a web browser to connect to an HTTPS (secure) website (with your parent or guardian's permission). Explain to your counselor how to tell whether the site's security certificate can be trusted, and what it means to use this kind of connection."
        ]
      },
      {
        "number": "6.",
        "text": "Do THREE of the following. For each project you complete, copy the files to a backup device and share the finished projects with your counselor.",
        "subRequirements": [
          "(a) Using a spreadsheet or database program, develop a food budget for a patrol weekend campout OR create a troop roster that includes the name, rank, patrol, and telephone number of each Scout. Show your counselor that you can sort the roster by each of the following categories: rank, patrol, and alphabetically by name.",
          "(b) Using a word processor, write a draft letter inviting the parents or guardians of your troop's Scouts to a troop event.",
          "(c) Using a graphics program, design and draw a campsite plan for your troop OR create a flyer for an upcoming troop event, incorporating text and some type of visual such as a photograph or an illustration.",
          "(d) Using a presentation software program, develop a report about a topic approved by your counselor. For your presentation, create at least five slides, with each one incorporating text and some type of visual such as a photograph or an illustration.",
          "(e) Using a digital device, take a picture of a troop activity. Send or transfer this image to a device where it can be shared with your counselor.",
          "(f) Make a digital recording of your voice, transfer the file to a different device, and have your counselor play back the recording.",
          "(g) Create a blog and use it as an online journal of your Scouting activities, including group discussions and meetings, campouts, and other events. Include at least five entries and two photographs or illustrations. Share your blog with your counselor. You need not post the blog to the internet; however, if you choose to go live with your blog, you must first share it with your parent or guardian AND counselor AND get their approval.",
          "(h) Create a webpage for your troop, patrol, school, or place of worship. Include at least three articles and two photographs or illustrations. Include at least one link to a website of interest to your audience. You need not post the page to the internet; however, if you decide to do so, you must first share the webpage with your parent or guardian AND counselor AND get their approval."
        ]
      },
      {
        "number": "7.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor each of these protections and why they exist: copyright, patents, trademarks, trade secrets.",
          "(b) Explain when it is permissible to accept a free copy of a program from a friend.",
          "(c) Discuss with your counselor an article or (with your parent or guardian's permission) a report on the internet about a recent legal case involving an intellectual property dispute."
        ]
      },
      {
        "number": "8.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Describe why it is important to properly dispose of digital technology. List at least three hazardous chemicals that could be used to create digital devices or used inside a digital device.",
          "(b) Explain to your counselor why it is important to use a certified recycler of digital technology hardware or devices.",
          "(c) Do an internet search for an organization that collects discarded digital technology hardware or devices for repurposing or recycling. Find out what happens to that waste. Share with your counselor what you found.",
          "(d) Visit a recycling center that disposes of digital technology hardware or devices. Find out what happens to that waste. Share what you learned with your counselor.",
          "(e) Find a battery recycling center near you and find out what it does to recycle batteries. Share what you have learned with your counselor about the proper methods for recycling batteries."
        ]
      },
      {
        "number": "9.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to the Digital Technology merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from the Digital Technology merit badge to pursue a hobby or interest. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "electricity": {
    "url": "https://www.scouting.org/merit-badges/electricity/",
    "overview": "Learn why electricity plays a significant role in the economy and how energy consumption impacts our daily lives with the Electricity Merit badge. Scouts will demonstrate how to respond to electrical emergencies, explain how a fuse blows or a circuit breaker trips, and complete an electrical home safety inspection. The Electricity Merit Badge is an excellent opportunity for Scouts to learn how to read an electric meter and determine their household's energy cost from meter readings.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Demonstrate that you know how to respond to electrical emergencies by doing the following:",
        "subRequirements": [
          "(a) Explain how to turn off power for a particular circuit and the whole house in the event of an emergency.",
          "(b) Demonstrate how to rescue a person touching a live wire in the home.",
          "(c) Describe how to safely get out of a car in an accident if you suspect a utility wire is on the car.",
          "(d) Show how to render first aid to a person who is unconscious from an apparent electrical shock.",
          "(e) Show how to treat an electrical burn.",
          "(f) Explain what to do in the event of an electrical fire.",
          "(g) Explain what to do if caught out in the open during an electrical storm."
        ]
      },
      {
        "number": "2.",
        "text": "Complete an electrical home safety inspection of your home, using the checklist found in the Electricity merit badge pamphlet or one approved by your counselor. Discuss what you find with your counselor.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Make a simple electromagnet and use it to show magnetic attraction and repulsion.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain the difference between direct current and alternating current, the advantages and disadvantages of each, and give a practical example of the use of each type.",
          "(b) Explain three ways that electricity is produced."
        ]
      },
      {
        "number": "5.",
        "text": "Make a simple drawing to show how a battery and an electric bell work. Describe the purpose of each of the components.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Define what overloading an electric circuit means. Tell what you have done to make sure your home circuits are not overloaded.",
          "(b) Determine if there is an overload on a branch circuit by either getting the current draw from all the equipment plugged into the circuit or use the power equation to calculate the current draws.",
          "(c) Explain why a fuse blows and a circuit breaker trips.",
          "(d) Tell how to find a blown fuse and a tripped circuit breaker in your home. Show how to safely reset the circuit breaker."
        ]
      },
      {
        "number": "7.",
        "text": "Make a floor plan wiring diagram of the lights, switches, and outlets for a room in your home. Show which fuse or circuit breaker protects each one.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Read a meter associated with an electric bill. Determine the total power used since the bill, and the cost of that power.",
          "(b) Explain other charges on the bill that were taxes or fees.",
          "(c) Discuss with your counselor five ways your family can conserve energy."
        ]
      },
      {
        "number": "9.",
        "text": "Explain the following:",
        "subRequirements": [
          "(a) Electrical terms: current, energy, power, resistance, and voltage",
          "(b) Units of measure: ampere (amps), ohms, volts, watts, and watt-hours",
          "(c) Electrical conditions: generating source with example, ground, open circuit, overvoltage, potential difference, and short circuit",
          "(d) Equipment and their use: circuit, conductor, Ground Fault Circuit Interrupter (GFCI), insulator, inverter, rectifier, rheostat, substation, surge protection, solar panel, transformer, transmission and distribution systems, and wind turbine."
        ]
      },
      {
        "number": "10.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Connect a buzzer, bell, or light with a battery. Have a key or switch in the line.",
          "(b) Make and run a simple electric motor (from a kit is acceptable, if approved by your counselor ahead of time).",
          "(c) Build a simple rheostat. Show that it works.",
          "(d) Build a single-pole, double-throw switch. Show that it works.",
          "(e) Explain how 3-way switch wiring works in a lighting circuit.",
          "(f) Connect two lights together in a series circuit along with a battery and a switch. Then connect the same circuit in parallel. Discuss the differences in the two circuits."
        ]
      },
      {
        "number": "11.",
        "text": "Identify three career opportunities that would use skills and knowledge in electricity. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
        "subRequirements": []
      }
    ]
  },
  "engineering": {
    "url": "https://www.scouting.org/merit-badges/engineering/",
    "overview": "Engineers use both science and technology to turn ideas into reality, devising all sorts of things, ranging from a tiny, low-cost battery for your cell phone to a gigantic dam across the mighty Yangtze River in China.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Select a manufactured item in your home (such as a toy or an appliance) and, under adult supervision and with the approval of your counselor, investigate how and why it works as it does. Find out what sort of engineering activities were needed to create it. Discuss with your counselor what you learned and how you got the information.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Select an engineering achievement that has had a major impact on society. Using resources such as the internet (with your parent or guardian's permission), books, and magazines, find out about the engineers who made this engineering feat possible, the special obstacles they had to overcome, and how this achievement has influenced the world today. Tell your counselor what you learned.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Explain the work of six types of engineers. Pick two of the six types and explain how their work is related to engineering.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Visit with an engineer (who may be your counselor, parent or guardian) and do the following:",
        "subRequirements": [
          "(a) Discuss the work this engineer does and the tools the engineer uses.",
          "(b) Discuss with the engineer a current project and the engineer's particular role in it.",
          "(c) Find out how the engineer's work is done and how results are achieved.",
          "(d) Ask to see the reports that the engineer writes concerning the project.",
          "(e) Discuss with your counselor what you learned about engineering from this visit."
        ]
      },
      {
        "number": "5.",
        "text": "Use the systems engineering approach to design an original piece of patrol equipment, a toy or a useful device for the home, office or garage.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Transforming Motion. Using common materials or a construction set, make a simple model that will demonstrate motion. Explain how the model uses basic mechanical elements like levers and inclined planes to demonstrate motion. Describe an example where this mechanism is used in a real product.",
          "(b) Using Electricity. Make a list of 10 electrical appliances in your home. Find out approximately how much electricity each uses in one month. Learn how to find out the amount and cost of electricity used in your home during periods of light and heavy use. List five ways to conserve electricity.",
          "(c) Understanding Electronics. Using an electronic device such as a smartphone or tablet computer, find out how sound, video, text or images travel from one location to another. Explain how the device was designed for ease of use, function, and durability.",
          "(d) Using Materials. Do experiments to show the differences in strength and heat conductivity in wood, metal, and plastic. Discuss with your counselor what you have learned.",
          "(e) Converting Energy. Do an experiment to show how mechanical, heat, chemical, solar, and/or electrical energy may be converted from one or more types of energy to another. Explain your results. Describe to your counselor what energy is and how energy is converted and used in your surroundings.",
          "(f) Moving People. Find out the different ways people in your community get to work. Make a study of traffic flow (number of vehicles and relative speed) in both heavy and light traffic periods. Discuss with your counselor what might be improved to make it easier for people in your community to get where they need to go.",
          "(g) Building an Engineering Project. Enter a project in a science or engineering fair or similar competition. (This requirement may be met by participation on an engineering competition project team.) Discuss with your counselor what your project demonstrates, the kinds of questions visitors to the fair asked you, and how well you were able to answer their questions."
        ]
      },
      {
        "number": "7.",
        "text": "Explain what it means to be a registered Professional Engineer (P.E.). Name the types of engineering work for which registration is most important.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Study the Engineer's Code of Ethics. Explain how it is like the Scout Oath and Law.",
        "subRequirements": []
      },
      {
        "number": "9.",
        "text": "Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
        "subRequirements": []
      }
    ]
  },
  "game-design": {
    "url": "https://www.scouting.org/merit-badges/game-design/",
    "overview": "Games come in almost every shape, size, format, and flavor imaginable. Games can be fast-paced, slow, or anything in between. Some are competitive. Some are cooperative. They may be for individuals, small groups, or thousands of players at a time. They might take seconds to complete or last for years. However you slice it, everyone has played games, and games help make us who we are.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Analyze four games you have played, each from a different medium. Identify the medium, player format, objectives, rules, resources, and theme (if relevant). Discuss with your counselor the play experience, what you enjoy in each game, and what you dislike. Make a chart to compare and contrast the games.",
          "(b) Describe four types of play value and provide an example of a game built around each concept. Discuss with your counselor other reasons people play games."
        ]
      },
      {
        "number": "2.",
        "text": "Discuss with your counselor FIVE of the following 17 game design terms. For each term that you pick, describe how it relates to a specific game: story, setting, characters, play sequence, level design, interface design, difficulty, balance, depth, pace, replay value, age appropriateness, single-player vs. multiplayer, cooperative vs. competitive, turn-based vs. real-time, strategy vs. reflex vs. chance, or abstract vs. thematic.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Define the term intellectual property. Describe the types of intellectual property associated with the game design industry. Describe how intellectual property is protected and why protection is necessary. Define and give an example of a licensed property.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Pick a game where the players can change the rules or objectives (examples: basketball, hearts, chess, kickball). Briefly summarize the standard rules and objectives and play through the game normally.",
          "(b) Propose changes to several rules or objectives. Predict how each change will affect gameplay.",
          "(c) Play the game with one rule or objective change, observing how the players' actions and emotional experiences are affected by the rule change. Repeat this process with two other changes.",
          "(d) Explain to your counselor how the changes affected the actions and experience of the players. Discuss the accuracy of your predictions."
        ]
      },
      {
        "number": "5.",
        "text": "Design a new game. Any game medium or combination of mediums is acceptable. Record your work in a game design notebook.",
        "subRequirements": [
          "(a) Write a vision statement for your game. Identify the medium, player format, objectives, and theme of the game. If suitable, describe the setting, story, and characters.",
          "(b) Describe the reason that someone would want to play your game.",
          "(c) Make a preliminary list of the rules of the game. Define the resources.",
          "(d) Draw the game elements."
        ]
      },
      {
        "number": "6.",
        "text": "Do the following: Note: You must have your counselor's approval of your concept before you begin creating the prototype.",
        "subRequirements": [
          "(a) Prototype your game from requirement 5. If applicable, demonstrate to your counselor that you have addressed player safety through the rules and equipment. Record your work in your game design notebook.",
          "(b) Test your prototype with as many other people as you need to meet the player format. Compare the play experience to your descriptions from requirement 5(b). Correct unclear rules, holes in the rules, dead ends, and obvious rule exploits. Change at least one rule, mechanic, or objective from your first version of the game, and describe why you are making the change. Play the game again. Record in your game design notebook whether or not your change had the expected effect.",
          "(c) Repeat 6(b) at least two more times and record the results in your game design notebook."
        ]
      },
      {
        "number": "7.",
        "text": "Blind test your game. Do the following:",
        "subRequirements": [
          "(a) Write an instruction sheet that includes all of the information needed to play the game. Clearly describe how to set up the game, play the game, and end the game. List the game objectives.",
          "(b) Share your prototype from requirement 6 with a group of players that has not played it or witnessed a previous playtest. Provide them with your instruction sheet(s) and any physical components. Watch them play the game, but do not provide them with instruction. Record their feedback in your game design notebook.",
          "(c) Share your game design notebook with your counselor. Discuss the player reactions to your project and what you learned about the game design process. Based on your testing, determine what you like most about your game and suggest one or more changes."
        ]
      },
      {
        "number": "8.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) With your parent or guardian's permission and your counselor's approval, visit with a professional in the game development industry and ask them about their job and how it fits into the overall development process.",
          "(b) Meet with a professional in game development education and discuss the skills they emphasize in the classroom."
        ]
      }
    ]
  },
  "graphic-arts": {
    "url": "https://www.scouting.org/merit-badges/graphic-arts/",
    "overview": "The field of graphic arts includes many kinds of work in the printing and publishing industries. Graphic arts professionals are involved in the creation of all kinds of printed communication, from business cards to books to billboards. The scope of printing communications is huge.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Review with your counselor the processes for producing printed communications: offset lithography, screen printing, electronic/digital, relief, and gravure. Collect samples of three products, each one produced using a different printing process, or draw diagrams to help you with your description.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Explain the differences between continuous tone, line, and halftone artwork. Describe how digital images can be created and/or stored in a computer.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Design a printed piece (flyer, T-shirt, program, form, etc.). Explain your decisions for the typeface or typefaces you use and the way you arrange the elements in your design. Explain which printing process is best suited for printing your design. If desktop publishing is available, identify what hardware and software would be appropriate for outputting your design.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Produce the design you created for requirement 3 using one of the following printing processes:",
        "subRequirements": [
          "(a) Offset lithography. Make a layout, and produce a plate using a process approved by your counselor. Run the plate and print at least 50 copies.",
          "(b) Screen printing. Make a hand-cut or photographic stencil and attach it to a screen that you have prepared. Mask the screen and print at least 20 copies.",
          "(c) Electronic/digital printing. Create a layout in electronic form, download it to the press or printer, and run 50 copies. If no electronic interface to the press or printer is available, you may print and scan a paper copy of the layout.",
          "(d) Relief printing. Create a layout in electronic form, download it to the press or printer, and run 50 copies. If no electronic interface to the press or printer is available, you may print and scan a paper copy of the layout."
        ]
      },
      {
        "number": "5.",
        "text": "Postpress Operations. Do the following:",
        "subRequirements": [
          "(a) Discuss the finishing operations of padding, drilling, cutting, and trimming with your counselor.",
          "(b) Collect, describe, or identify examples of the following types of binding: perfect, spiral, plastic comb, saddle stitch, and case."
        ]
      },
      {
        "number": "6.",
        "text": "Do ONE of the following, and then describe the highlights of your visit:",
        "subRequirements": [
          "(a) Visit a newspaper printing plant. Follow a story from the editor to the press.",
          "(b) Visit a retail, commercial, or in-plant printing facility. Follow a project from beginning to end.",
          "(c) Visit a school's graphic arts program. Find out what courses are available and what the prerequisites are.",
          "(d) With your parent or guardian's permission, visit three websites that belong to graphic arts professional organizations and/or printing-related companies (suppliers, manufacturers, printers). Print out or download product or service information from two of the sites."
        ]
      },
      {
        "number": "7.",
        "text": "Find out about three career opportunities in graphic arts. Pick one and find out the education, training, and experience required for this profession. Discuss this with your counselor, and explain why this profession might interest you.",
        "subRequirements": []
      }
    ]
  },
  "photography": {
    "url": "https://www.scouting.org/merit-badges/photography/",
    "overview": "Beyond capturing family memories, photography offers a chance to be creative. Many photographers use photography to express their creativity, using lighting, composition, depth, color, and content to make their photographs into more than snapshots. Good photographs tell us about a person, a news event, a product, a place, a scientific breakthrough, an endangered animal, or a time in history.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Check out the Digital Resource Guide for the Photography merit badge HERE for detailed information and helpful resources to engage your learning and assist you along on your merit badge journey! The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Safety. Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the most likely hazards you may encounter while working with photography and what you should do to anticipate, mitigate, prevent, and respond to these hazards. Explain how you would prepare for exposure to environmental situations such as weather, sun, and water.",
          "(b) View the Personal Safety Awareness \"Digital Safety\" video (with your parent or guardian's permission)."
        ]
      },
      {
        "number": "2.",
        "text": "Explain how the following elements and terms can affect the quality of a picture:",
        "subRequirements": [
          "(a) Light&mdash;natural light (ambient/existing), low light (such as at night), and artificial light (such as from a flash)",
          "(b) Exposure&mdash;aperture (f-stops), shutter speed, ISO",
          "(c) Depth of field",
          "(d) Composition&mdash;rule of thirds, leading lines, framing, depth",
          "(e) Angle of view",
          "(f) Stop action and blur motion",
          "(g) Decisive moment (action or expression captured by the photographer)"
        ]
      },
      {
        "number": "3.",
        "text": "Explain the basic parts and operation of a camera. Explain how an exposure is made when you take a picture.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Do TWO of the following, then share your work with your counselor.",
        "subRequirements": [
          "(a) Photograph one subject from two different angles or perspectives.",
          "(b) Photograph one subject from two different light sources&mdash;artificial and natural.",
          "(c) Photograph one subject with two different depth of fields.",
          "(d) Photograph one subject with two different compositional techniques."
        ]
      },
      {
        "number": "5.",
        "text": "Photograph THREE of the following, then share your work with your counselor.",
        "subRequirements": [
          "(a) Close-up of a person",
          "(b) Two to three people interacting",
          "(c) Action shot",
          "(d) Animal shot",
          "(e) Nature shot",
          "(f) Picture of a person&mdash;candid, posed, or camera-aware"
        ]
      },
      {
        "number": "6.",
        "text": "Describe how software allows you to enhance your photograph after it is taken. Select a photo you have taken, then do ONE of the following, and share what you have done with your counselor:",
        "subRequirements": [
          "(a) Crop your photograph.",
          "(b) Adjust the exposure or make a color correction.",
          "(c) Show another way you could improve your picture for impact."
        ]
      },
      {
        "number": "7.",
        "text": "Using images other than those created for requirements 4, 5, and 6, produce a visual story to document an event to photograph OR choose a topic that interests you to photograph. Do the following:",
        "subRequirements": [
          "(a) Plan the images you need to photograph for your photo story.",
          "(b) Share your plan with your counselor, and get your counselor's input and approval before you proceed.",
          "(c) Select eight to 12 images that best tell your story. Arrange your images in order and mount the prints on a poster board, OR create an electronic presentation. Share your visual story with your counselor."
        ]
      },
      {
        "number": "8.",
        "text": "Identify three career opportunities in photography. Pick one and explain to your counselor how to prepare for such a career. Discuss what education and training are required, and why this profession might interest you.",
        "subRequirements": []
      }
    ]
  },
  "plumbing": {
    "url": "https://www.scouting.org/merit-badges/plumbing/",
    "overview": "Plumbing, including pipe fitting, is an important and well-paid occupation. The industry is quite broad. It covers installations and repairs in homes, commercial properties, and factories. Plumbing pipelines are used for water supply, waste drainage, natural-gas heating, and many other purposes.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Describe how a properly working plumbing system protects your family's health and safety.",
          "(b) List five important local health regulations related to plumbing and tell how they protect health and safety.",
          "(c) Describe the safety precautions you must take when making home plumbing repairs."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Make a drawing and explain how a home hot- and cold-water supply system works. Tell how you would make it safe from freezing.",
          "(b) Make a drawing and explain the drainage system of the plumbing in a house. Show and explain the use of drains and vents."
        ]
      },
      {
        "number": "3.",
        "text": "Show how to use five important plumber's tools.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Identify and explain the following terms: washer, retaining nut, plunger (rubber force cup), solder, flux, elbow, tee, nipple, coupling, plug, union, trap, drainpipe, and water meter.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Name the kinds of pipe that are used most often in a plumbing system. Explain why these pipes are used.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Do FOUR of the following, each under the supervision of a knowledgeable adult:",
        "subRequirements": [
          "(a) Visit the plumbing section of a hardware store or home center and identify:",
          "(1) PVC pipe and fittings",
          "(2) CPVC pipe and fittings",
          "(3) PEX pipe and fittings",
          "(4) Copper pipe and fittings",
          "(5) Steel pipe and fittings",
          "(6) Specialty plumbing tools",
          "(b) Cut, clean (debur), PVC or CPVC pipe; solvent weld at least three connections to include a coupling, tee, and elbow.",
          "(c) Cut PEX pipe; make at least one connection using either a quick-connect fitting or a crimp fitting (using specialized tools).",
          "(d) Solder a copper connection using a gas torch.",
          "(e) Replace a kitchen or lavatory faucet.",
          "(f) Remove, clean or replace, and reinstall a sink or lavatory drain trap.",
          "(g) Properly apply pipe thread tape to a pipe or a plumbing connector."
        ]
      },
      {
        "number": "7.",
        "text": "Identify three career opportunities that would use skills and knowledge in plumbing. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
        "subRequirements": []
      }
    ]
  },
  "programming": {
    "url": "https://www.scouting.org/merit-badges/programming/",
    "overview": "Programming merit badge will take you “behind the screen” for a look at the complex codes that make digital devices useful and fun.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Safety. Do the following:",
        "subRequirements": [
          "(a) View the Personal Safety Awareness \"Digital Safety\" video (with your parent or guardian's permission.)",
          "(b) Discuss first aid and prevention for the types of injuries that could occur during programming activities, including repetitive stress injuries and eyestrain."
        ]
      },
      {
        "number": "2.",
        "text": "History. Discuss with your counselor the history of programming and the evolution of programming languages, including at least three milestones related to the advancement or development of programming over time.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "General Knowledge. Do the following:",
        "subRequirements": [
          "(a) Create a list of five popular programming languages in use today and describe which industry or industries they are primarily used in and why.",
          "(b) Describe three different programmed devices you rely on every day."
        ]
      },
      {
        "number": "4.",
        "text": "Intellectual Property. Do the following:",
        "subRequirements": [
          "(a) Explain the four types of intellectual property used to protect computer programs.",
          "(b) Describe the difference between licensing and owning software.",
          "(c) Describe the differences between freeware, open source, and commercial software, and why it is important to respect the terms of use of each."
        ]
      },
      {
        "number": "5.",
        "text": "Project. With your counselor's guidance, select three different programming languages and development environments. For each subrequirement below, do the following: Write or modify a program using the indicated programming language and development environment. The program must take input and produce output based on computations and decisions made on the input. Debug and demonstrate the program to your counselor. Explain how each program processes inputs, makes decisions based on those inputs, and provides outputs based on computations and decision making.",
        "subRequirements": [
          "(a) In the first language and environment, write or modify a program, debug and demonstrate, and explain as above.",
          "(b) In the second language and environment, write or modify a program, debug and demonstrate, and explain as above.",
          "(c) In the third language and environment, write or modify a program, debug and demonstrate, and explain as above."
        ]
      },
      {
        "number": "6.",
        "text": "Careers. Do ONE of the following:",
        "subRequirements": [
          "(a) Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include&mdash;with your parent or guardian's permission&mdash;an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.",
          "(b) Explore how you could use knowledge and skills from this merit badge to pursue a hobby or healthy lifestyle. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this."
        ]
      }
    ]
  },
  "textiles": {
    "url": "https://www.scouting.org/merit-badges/textile/",
    "overview": "People use countless fibers and fabrics in their everyday lives: clothes, carpets, curtains, towels, sheets, upholstered furniture. Add to that list boat sails, book bindings, bandages, flags, sleeping bags, mailbags, airbags, seat belts, backpacks, parachutes, umbrellas, basketball nets, and more.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Discuss with your counselor the importance of textiles. Explain the terms fiber, fabric, and textile. Give examples of textiles you use every day.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Get swatches of two natural fiber fabrics (100 percent cotton, linen, wool or silk; no blends). Get swatches of two synthetic fiber fabrics (nylon, polyester, acrylic, olefin, or spandex). Get a sample of one cellulosic fabric (rayon, acetate or lyocell).",
          "(b) Give the origin, major characteristics, and general content of each type of fiber obtained for 2(a). Explain the difference between a cellulosic manufactured fiber and a synthetic manufactured fiber.",
          "(c) Describe the main steps in making raw fiber into yarn, and yarn into fabric.",
          "(d) Assume you will soon buy a new garment or other textile item. Tell your counselor what fiber or blend of fibers you want the item to be, and give reasons for your choice."
        ]
      },
      {
        "number": "3.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Visit a textile plant, textile products manufacturer, or textile school or college. Report on what you saw and learned.",
          "(b) Weave a belt, headband, placemat, or wall hanging using a simple loom that you have made yourself.",
          "(c) With a magnifying glass, examine a woven fabric, a nonwoven fabric, and a knitted fabric. Sketch what you see. Explain how the three constructions are different.",
          "(d) Make a piece of felt.",
          "(e) Make two natural dyes and use them to dye a garment or a piece of fabric.",
          "(f) Waterproof a fabric.",
          "(g) Demonstrate how to identify fibers, using microscope identification or the breaking test."
        ]
      },
      {
        "number": "4.",
        "text": "Explain the meaning of 10 of the following terms: warp, harness, heddle, shed, aramid, spandex, sliver, yarn, spindle, distaff, loom, cellulose, sericulture, extrusion, carbon fibers, spinneret, staple, worsted, nonwoven, and greige goods.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "List the advantages and disadvantages of natural plant fibers, natural animal fibers, cellulosic manufactured fibers, and synthetic manufactured fibers. Identify and discuss at least four ecological concerns regarding the production and care of textiles.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Explain to your counselor, either verbally or in a written report, five career possibilities in the textile industry. Tell your counselor about two positions that interest you the most and the education, cost of training, and specific duties those positions require.",
        "subRequirements": []
      }
    ]
  },
  "welding": {
    "url": "https://www.scouting.org/merit-badges/welding/",
    "overview": "Welding is the process of joining with a weld – joining or combining similar pieces of metal by heating them with a flame torch or an electric current, then hammering or pressing them together while they are soft. Welding plays a major role in our modern world, and mastery of the skill can lead to exciting career opportunities. Someday, you may have an opportunity to experience exciting new career paths in welding.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain to your counselor the hazards you are most likely to encounter while welding, and what you should do to anticipate, help prevent, mitigate, or lessen these hazards.",
          "(b) Show that you know first aid for, and the prevention of, injuries or illnesses that could occur while welding, including electrical shock, eye injuries, burns, fume inhalation, dizziness, skin irritation, and exposure to hazardous chemicals, including filler metals and welding gases."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) With your counselor, discuss general safety precautions and safety data sheets (SDS) related to welding. Explain the importance of the SDS.",
          "(b) Describe the appropriate safety gear and clothing that must be worn when welding. Then, present yourself properly dressed for welding&mdash;in protective equipment, clothing, and footwear.",
          "(c) Explain and demonstrate the proper care and storage of welding equipment, tools, and protective clothing and footwear."
        ]
      },
      {
        "number": "3.",
        "text": "Explain the terms welding, electrode, slag, and oxidation. Describe the welding process, how heat is generated, what kind of filler metal is added (if any), and what protects the molten metal from the atmosphere.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Name the different mechanical and thermal cutting methods. Choose one method and describe how to use the process. Discuss one advantage and one limitation of this process.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Select two welding processes, and make a list of the different components of the equipment required for each process. Discuss one advantage and one limitation for each process.",
          "(b) Choose one welding process. Set up the process you have chosen, including gas regulators, work clamps, cables, filler materials, and equipment settings. Have your counselor inspect and approve the area for the welding process you have chosen."
        ]
      },
      {
        "number": "6.",
        "text": "After successfully completing requirements 1 through 5, use the equipment you prepared for the welding process in 5(b) to do the following:",
        "subRequirements": [
          "(a) Using a metal scribe or soapstone, sketch your initial onto a metal plate, and weld a bead on the plate following the pattern of your initial.",
          "(b) Cover a small plate (approximately 3\" x 3\" x 1/4\") with weld beads side by side.",
          "(c) Tack two plates together in a square groove butt joint.",
          "(d) Weld the two plates together from 6(c) on both sides.",
          "(e) Tack two plates together in a T joint, have your counselor inspect it, then weld a T joint with fillet weld on both sides.",
          "(f) Tack two plates together in a lap joint, have your counselor inspect it, then weld a lap joint with fillet weld on both sides."
        ]
      },
      {
        "number": "7.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Find out about three career opportunities in the welding industry. Pick one and find out the education, training, and experience required for this profession. Discuss this with your counselor, and explain why the profession might interest you.",
          "(b) Discuss the role of the American Welding Society in the welding profession."
        ]
      }
    ]
  },
  "soil-and-water-conservation": {
    "url": "https://www.scouting.org/merit-badges/soil-and-water-conservation/",
    "overview": "Conservation isn't just the responsibility of soil and plant scientists, hydrologists, wildlife managers, landowners, and the forest or mine owner alone. It is the duty of every person to learn more about the natural resources on which our lives depend so that we can help make sure that these resources are used intelligently and cared for properly.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Tell what soil is. Tell how it is formed.",
          "(b) Describe three kinds of soil. Tell how they are different.",
          "(c) Name the three main plant nutrients in fertile soil. Tell how they can be put back when used up."
        ]
      },
      {
        "number": "2.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Define soil erosion.",
          "(b) Tell why soil erosion is important and how it affects you.",
          "(c) Name three kinds of soil erosion. Describe each.",
          "(d) Take pictures of or draw two kinds of soil erosion."
        ]
      },
      {
        "number": "3.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Tell what is meant by conservation practices.",
          "(b) Describe the effect of three kinds of erosion-control practices.",
          "(c) Take pictures of or draw three kinds of erosion-control practices."
        ]
      },
      {
        "number": "4.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Explain what a watershed is.",
          "(b) Outline the smallest watershed that you can find on a contour map.",
          "(c) Outline, as far as the map will allow, the next larger watershed that also has the smallest one in it.",
          "(d) Explain what a river basin is. Tell why all people living in a river basin should be concerned about land and water use in the basin.",
          "(e) Explain what an aquifer is and why it can be important to communities."
        ]
      },
      {
        "number": "5.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Make a drawing to show the hydrologic cycle.",
          "(b) Demonstrate at least two of the following actions of water in relation to soil: percolation, capillary action, precipitation, evaporation, and transpiration.",
          "(c) Explain how removal of vegetation will affect the way water runs off a watershed.",
          "(d) Tell how uses of forest, range, and farmland affect usable water supply.",
          "(e) Explain how industrial use affects water supply."
        ]
      },
      {
        "number": "6.",
        "text": "Do the following:",
        "subRequirements": [
          "(a) Tell what is meant by water pollution.",
          "(b) Describe common sources of water pollution and explain the effects of each.",
          "(c) Explain the terms: primary water treatment, secondary waste treatment, and biochemical oxygen demand.",
          "(d) Make a drawing showing the principles of complete waste treatment."
        ]
      },
      {
        "number": "7.",
        "text": "Do TWO of the following:",
        "subRequirements": [
          "(a) Make a trip to TWO of the following places. Write a report of more than 500 words about the soil and water and energy conservation practices you saw.",
          "(1) An agricultural experiment",
          "(2) A managed forest or woodlot, range, or pasture",
          "(3) A wildlife refuge or a fish or game management area",
          "(4) A conservation-managed farm or ranch",
          "(5) A managed watershed",
          "(6) A waste-treatment plant",
          "(7) A public drinking water treatment plant",
          "(8) An industry water use installation",
          "(9) A desalinization plant",
          "(b) Plant 100 trees, bushes, and/or vines for a good purpose.",
          "(c) Seed an area of at least one-fifth acre for some worthwhile conservation purposes, using suitable grasses or legumes alone or in a mixture.",
          "(d) Study a soil survey report. Describe the things in it. Using tracing paper and a pen, trace over any of the soil maps, and outline an area with three or more different kinds of soil. List each kind of soil by full name and map symbol.",
          "(e) Make a list of places in your neighborhood, camps, school ground, or park that have erosion, sedimentation, or pollution problems. Describe how these could be corrected through individual or group action.",
          "(f) Carry out any other soil and water conservation project approved by your counselor."
        ]
      }
    ]
  },
  "fish-wildlife-management": {
    "url": "https://www.scouting.org/merit-badges/fish-wildlife-management/",
    "overview": "Learn how animal diversity impacts the planet and the longevity of communities across the globe with the Fish and Wildlife Management Merit Badge. The Fish and Wildlife Merit Badge is a conservation-based merit badge recognizing our ecological impact and responsibility to preserve and protect animal life. Scouts will learn the purpose of fish and wildlife conservation while listing at least three significant problems threatening fish and wildlife resources in their community.",
    "requirements": [
      {
        "number": null,
        "text": "NOTE: Scouts must remember to follow the Leave No Trace Seven Principles and the Outdoor Code while on field trips and when collecting specimens. Make sure you have permission of the land manager prior to taking any samples. Your state may require that you purchase and carry a license to collect certain species. Check with the wildlife and fish and game officials in your state regarding species regulations before you begin to collect. NOTE: The official merit badge pamphlets are now free and downloadable HERE or can be purchased at the Scout Shop.",
        "subRequirements": []
      },
      {
        "number": "1.",
        "text": "Describe the meaning and purposes of fish and wildlife conservation and management.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "List and discuss at least three major problems that continue to threaten your state's fish and wildlife resources.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Describe some ways in which everyone can help with fish and wildlife conservation.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "List and describe five major fish and wildlife management practices used by managers in your state.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Construct, erect, and check regularly at least two artificial nest boxes (wood duck, bluebird, squirrel, etc.) and keep written records for one nesting season.",
          "(b) Construct, erect, and check regularly bird feeders and keep written records daily over a two-week period of the kinds of birds visiting the feeders.",
          "(c) Develop and implement a fishery improvement project or a backyard wildlife habitat improvement project. Share the results with your counselor.",
          "(d) Design and construct a wildlife blind near a game trail, water hole, salt lick, bird feeder, or birdbath and take good photographs or make sketches from the blind of any combination of 10 wild birds, mammals, reptiles, or amphibians."
        ]
      },
      {
        "number": "6.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Observe and record 25 species of wildlife. Your list may include mammals, birds, reptiles, amphibians, and fish. Write down when and where each animal was seen.",
          "(b) List the wildlife species in your state that are classified as endangered, threatened, exotic, non-native, game species, furbearers, or migratory game birds. Discuss with your counselor management practices in place or being developed for at least three of these species.",
          "(c) Start a scrapbook of North American fish and wildlife. Insert markers to divide the book into separate parts for mammals, birds, reptiles, amphibians, and fish. Collect articles on such subjects as life histories, habitat, behavior, and feeding habits on all of the five categories and place them in your notebook accordingly. Articles and pictures may be taken from newspapers or science, nature, and outdoor magazines, or from other sources including the internet (with your parent or guardian's permission). Enter at least five articles on mammals, five on birds, five on reptiles, five on amphibians, and five on fish. Put each animal on a separate sheet in alphabetical order. Include pictures whenever possible."
        ]
      },
      {
        "number": "7.",
        "text": "Do ONE of the following:",
        "subRequirements": [
          "(a) Determine the age of five species of fish from scale samples or identify various age classes of one species in a lake and report the results.",
          "(b) Conduct a creel census on a small lake to estimate catch per unit effort and report the results to your counselor.",
          "(c) Examine the stomach contents of three fish and record the findings. It is not necessary to catch any fish for this option.",
          "(d) Make a freshwater aquarium. Include at least four species of native plants and four species of animal life, such as whirligig beetles, freshwater shrimp, tadpoles, water snails, and golden shiners. After 60 days of observation, discuss with your counselor the life cycles, food chains, and management needs you have recognized. Before completing this requirement, check local laws on releasing these organisms back into the wild, and follow your counselor's direction in disposing of these organisms humanely and safely."
        ]
      },
      {
        "number": "8.",
        "text": "Identify three career opportunities that would use skills and knowledge by fish and wildlife professionals. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research the prospects for employment, starting salary, advancement opportunities and career goals associated with this career. Discuss what you learned with your counselor and whether you might be interested in this career.",
        "subRequirements": []
      }
    ]
  },
  "tfc-scout-tenderfoot": {
    "url": "https://www.scouting.org/skills/merit-badges/all/",
    "overview": "The Trail to First Class: Scout and Tenderfoot program introduces new Scouts to basic outdoor skills, the patrol method, knife/tool safety, knot tying, campsite selection, and foundational first aid.",
    "requirements": [
      {
        "number": "1.",
        "text": "Scout Spirit & Values. Repeat from memory the Scout Oath, Scout Law, Scout motto, and Scout slogan. In your own words, explain their meaning. Demonstrate the Scout sign, salute, and handshake.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Knots & Ropework. Tie the square knot, two half-hitches, and the taut-line hitch. Explain how each is used. Show how to whip and fuse the ends of a rope.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Tool & Knife Safety. Demonstrate pocketknife safety and the rules of the Whittling Chip / Totin' Chip. Explain how to care for and sharpen a knife.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Outdoor Code & Leave No Trace. Describe the Outdoor Code and the principles of Leave No Trace. Explain how to apply them on a mountain campout.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Camping & Gear Preparation. Present yourself in camp clothing, inspect personal camping gear, and show how to pack a backpack properly for camp.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Hiking Safety & Trail Rules. Explain the buddy system and what to do if lost on a trail. Demonstrate the rules of safe hiking on highways and trails.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Basic First Aid. Demonstrate first aid for simple cuts, scrapes, blisters, minor burns, insect bites, stings, nosebleeds, and snakebite prevention.",
        "subRequirements": []
      },
      {
        "number": "8.",
        "text": "Physical Fitness. Record your best efforts in push-ups, pull-ups, sit-ups, and the 1-mile walk/run. Develop a personal fitness improvement plan.",
        "subRequirements": []
      }
    ]
  },
  "tfc-second-class": {
    "url": "https://www.scouting.org/skills/merit-badges/all/",
    "overview": "The Trail to First Class: Second Class program develops self-reliance in the wilderness, focusing on compass navigation, campfire building, camp cooking, swimming safety, and basic search and rescue.",
    "requirements": [
      {
        "number": "1.",
        "text": "Campcraft & Site Selection. Pitch a tent and explain how to select a good campsite. Discuss how to sleep comfortably and stay warm at 8,000 feet elevation.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Fire Building & Stove Safety. Discuss when it is appropriate to use a cooking stove vs. a campfire. Safely build and light a campfire using tinder, kindling, and fuel logs; extinguish it cold to the touch.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Outdoor Camp Cooking. On a campout, plan and cook a hot meal for your patrol using a camp stove or fire. Explain food safety and clean-up procedures.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Compass Navigation. Demonstrate how a compass works and how to orient a map. Walk a compass course with multiple bearing changes.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Wildlife & Nature. Identify six wild animals common to the Coronado National Forest and recognize evidence of animal habits.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Water Rescue & Aquatics. Demonstrate water rescue methods: Reach, Throw, Row, Go (with supervision). Demonstrate the BSA Beginner swim test.",
        "subRequirements": []
      },
      {
        "number": "7.",
        "text": "Intermediate First Aid. Show what to do for shock, hypothermia, heat exhaustion, dehydration, fractures, sprains, and moving an injured person.",
        "subRequirements": []
      }
    ]
  },
  "tfc-first-class": {
    "url": "https://www.scouting.org/skills/merit-badges/all/",
    "overview": "The Trail to First Class: First Class program represents mastery of essential Scoutcraft skills: advanced pioneering and lashings, 10-mile hike navigation, patrol meal planning and cooking, and service leadership.",
    "requirements": [
      {
        "number": "1.",
        "text": "Pioneering & Lashings. Tie the timber hitch and clove hitch. Demonstrate the square lashing, shear lashing, and diagonal lashing by building a camp gadget.",
        "subRequirements": []
      },
      {
        "number": "2.",
        "text": "Topographic Navigation. On a trek or hike, navigate using a topographic map and compass without GPS. Identify contour intervals and land features.",
        "subRequirements": []
      },
      {
        "number": "3.",
        "text": "Patrol Meal Leadership. Serve as patrol cook for three meals (breakfast, lunch, dinner). Prepare a shopping list, budget, and cook all meals over stove or coals.",
        "subRequirements": []
      },
      {
        "number": "4.",
        "text": "Emergency Care & CPR. Demonstrate CPR and first aid for compound fractures, severe bleeding, puncture wounds, and improvised transport of a victim.",
        "subRequirements": []
      },
      {
        "number": "5.",
        "text": "Aquatics Mastery. Successfully pass the BSA Swimmer Test: jump feetfirst into deep water, swim 75 yards in a strong manner, 25 yards on back, and float for 1 minute.",
        "subRequirements": []
      },
      {
        "number": "6.",
        "text": "Conservation & Citizenship. Discuss the constitutional rights and duties of citizenship. Complete service hours on an environmental conservation project.",
        "subRequirements": []
      }
    ]
  }
};

export function getOfficialBadgeData(id: string): {
  overview: string;
  requirements: RequirementItem[];
  dualBadges?: { title: string; overview: string; requirements: RequirementItem[]; url: string }[];
} | null {
  const normalized = id.toLowerCase();
  
  if (normalized === 'soil-and-water-conservation-and-fish-and-wildlife') {
    const sw = OFFICIAL_BADGE_REQUIREMENTS['soil-and-water-conservation'];
    const fw = OFFICIAL_BADGE_REQUIREMENTS['fish-wildlife-management'];
    return {
      overview: 'Combined 2-badge environmental module. Scouts earn both the Soil and Water Conservation merit badge and the Fish and Wildlife Management merit badge through hands-on mountain fieldwork.',
      requirements: [],
      dualBadges: [
        {
          title: 'Soil and Water Conservation',
          overview: sw?.overview ?? '',
          requirements: sw?.requirements ?? [],
          url: sw?.url ?? 'https://www.scouting.org/merit-badges/soil-and-water-conservation/'
        },
        {
          title: 'Fish and Wildlife Management',
          overview: fw?.overview ?? '',
          requirements: fw?.requirements ?? [],
          url: fw?.url ?? 'https://www.scouting.org/merit-badges/fish-wildlife-management/'
        }
      ]
    };
  }

  const exact = OFFICIAL_BADGE_REQUIREMENTS[normalized];
  if (exact) {
    return {
      overview: exact.overview,
      requirements: exact.requirements
    };
  }

  return null;
}
