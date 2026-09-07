/* ============================================================
   v11.0 — STUDY ARCADE + VIDEO STUDIO (arcade.js) · data layer
   Four curriculum games built on the app's verified question bank
   and subject topics, plus lesson-video channels and links.
   ============================================================ */
"use strict";
/* Term/definition pairs for every subject — powers Term Match + Memory Pairs. */
var PAIRS = {
  "Mathematics": [
    { t: "Quadratic equation", d: "An equation of the form ax² + bx + c = 0, solved by factorising, completing the square or the formula" },
    { t: "Mean", d: "The average of a data set: sum of values divided by their count" },
    { t: "Hypotenuse", d: "The longest side of a right-angled triangle, opposite the right angle" },
    { t: "Probability", d: "A number from 0 to 1 measuring how likely an event is to happen" },
    { t: "Gradient", d: "The slope of a line: change in y divided by change in x" },
    { t: "Venn diagram", d: "A picture of overlapping sets showing unions, intersections and complements" }
  ],
  "English Language": [
    { t: "Synonym", d: "A word with the same or nearly the same meaning as another word" },
    { t: "Antonym", d: "A word opposite in meaning to another word" },
    { t: "Simile", d: "A comparison using 'like' or 'as', e.g. brave as a lion" },
    { t: "Metaphor", d: "A direct comparison that says one thing IS another, e.g. time is money" },
    { t: "Conjunction", d: "A joining word such as and, but, because, or, although" },
    { t: "Comprehension", d: "Reading a passage and answering questions about its meaning" }
  ],
  "Biology": [
    { t: "Photosynthesis", d: "Plants making glucose from carbon dioxide and water using sunlight" },
    { t: "Mitosis", d: "Cell division producing two identical daughter cells" },
    { t: "Osmosis", d: "Movement of water through a membrane from dilute to concentrated solution" },
    { t: "Enzyme", d: "A biological catalyst that speeds up chemical reactions in cells" },
    { t: "Habitat", d: "The natural home of an organism — where it lives" },
    { t: "Genotype", d: "The genetic make-up of an organism, e.g. Tt" }
  ],
  "Chemistry": [
    { t: "Atom", d: "The smallest particle of an element that keeps its chemical properties" },
    { t: "Ion", d: "An atom or group of atoms that has gained or lost electrons" },
    { t: "Covalent bond", d: "A bond formed by sharing pairs of electrons between atoms" },
    { t: "pH", d: "A scale 0–14 measuring how acidic or alkaline a solution is" },
    { t: "Catalyst", d: "A substance that speeds a reaction without being used up" },
    { t: "Distillation", d: "Separating liquids by boiling and condensing them again" }
  ],
  "Physics": [
    { t: "Velocity", d: "Speed in a stated direction — a vector quantity" },
    { t: "Acceleration", d: "Rate of change of velocity, measured in m/s²" },
    { t: "Newton's second law", d: "Force equals mass times acceleration (F = ma)" },
    { t: "Refraction", d: "Bending of light as it passes from one medium into another" },
    { t: "Ohm's law", d: "Current is proportional to voltage: V = IR" },
    { t: "Kinetic energy", d: "Energy of motion: ½mv²" }
  ],
  "Agricultural Science": [
    { t: "Soil fertility", d: "The ability of soil to supply nutrients for plant growth" },
    { t: "Manure", d: "Decomposed plant and animal waste used to enrich soil" },
    { t: "Ruminant", d: "A cud-chewing animal like cattle, sheep or goat" },
    { t: "Tillage", d: "Turning and loosening the soil before planting" },
    { t: "Poultry", d: "Domestic birds kept for eggs and meat" },
    { t: "Mulching", d: "Covering soil with leaves or straw to keep moisture" }
  ],
  "Economics": [
    { t: "Scarcity", d: "Limited resources against unlimited wants — the basic economic problem" },
    { t: "Demand", d: "The quantity of a good buyers are willing and able to buy at a price" },
    { t: "Elasticity", d: "How much quantity demanded changes when price changes" },
    { t: "GDP", d: "Total value of goods and services produced in a country in a year" },
    { t: "Inflation", d: "A sustained general rise in the price level" },
    { t: "Opportunity cost", d: "The next best alternative given up when a choice is made" }
  ],
  "Government": [
    { t: "Constitution", d: "The supreme law stating how a state is governed" },
    { t: "Separation of powers", d: "Dividing power among executive, legislature and judiciary" },
    { t: "Suffrage", d: "The right to vote in elections" },
    { t: "Federalism", d: "A system sharing power between a central and component states" },
    { t: "Delegate", d: "A representative who must follow the wishes of those who sent them" },
    { t: "Rule of law", d: "Everyone, including rulers, is subject to the law" }
  ],
  "Literature in English": [
    { t: "Protagonist", d: "The main character at the centre of a story or play" },
    { t: "Irony", d: "Saying or showing the opposite of what is meant or expected" },
    { t: "Stanza", d: "A group of lines forming a unit in a poem" },
    { t: "Theme", d: "The central idea or message a work explores" },
    { t: "Dialogue", d: "Conversation between characters in a play or prose" },
    { t: "Climax", d: "The turning point of highest tension in a plot" }
  ],
  "Geography": [
    { t: "Erosion", d: "Wearing away of the land by water, wind or ice" },
    { t: "Weathering", d: "Breaking down of rocks in place by weather and climate" },
    { t: "Longitude", d: "Lines running north–south; used with time zones" },
    { t: "Delta", d: "A fan of sediments where a river meets a sea or lake" },
    { t: "Population density", d: "Number of people per square kilometre" },
    { t: "Plateau", d: "A high flat landform raised above surrounding country" }
  ],
  "Commerce": [
    { t: "Commerce", d: "The trade and services that move goods from producer to consumer" },
    { t: "Retailer", d: "A trader who sells goods in small quantities to final consumers" },
    { t: "Insurance", d: "A contract paying compensation against specified risks for a premium" },
    { t: "Balance of trade", d: "The difference between a country's exports and imports of goods" },
    { t: "Working capital", d: "Money needed for the day-to-day running of a business" },
    { t: "Advertising", d: "Informing and persuading people to buy a product" }
  ],
  "Computer Studies": [
    { t: "CPU", d: "The processor that fetches, decodes and executes instructions" },
    { t: "Algorithm", d: "A step-by-step set of instructions to solve a problem" },
    { t: "RAM", d: "Volatile working memory that loses data when power goes off" },
    { t: "URL", d: "The address of a web page, e.g. https://example.com" },
    { t: "Compiler", d: "Program that translates source code into machine code" },
    { t: "Firewall", d: "A security system that filters incoming and outgoing network traffic" }
  ],
  "Civic Education": [
    { t: "Citizenship", d: "Legal membership of a state with rights and duties" },
    { t: "Integrity", d: "Being honest and upright even when no one is watching" },
    { t: "Rule of law", d: "The principle that the law governs everyone equally" },
    { t: "Tolerance", d: "Respecting people whose views and ways differ from yours" },
    { t: "Nationalism", d: "Patriotism and loyalty that puts the nation first" },
    { t: "Democracy", d: "Government by the people through free and fair elections" }
  ],
  "Further Mathematics": [
    { t: "Determinant", d: "For matrix [[a,b],[c,d]] the value ad − bc" },
    { t: "Dot product", d: "a·b = |a||b|cosθ, giving the angle between vectors" },
    { t: "Binomial coefficient", d: "C(n,r) = n!/(r!(n−r)!), the numbers in Pascal's triangle" },
    { t: "Derivative", d: "The gradient function dy/dx — rate of change of a curve" },
    { t: "Definite integral", d: "A signed area under a curve between two limits" },
    { t: "Complex conjugate", d: "For z = x + iy, z̄ = x − iy" }
  ],
  "Christian Religious Studies": [
    { t: "Covenant", d: "A solemn binding agreement between God and His people" },
    { t: "The Fall", d: "Adam and Eve's disobedience that brought sin into the world" },
    { t: "Passover", d: "The feast remembering the angel passing over Israelite homes" },
    { t: "Parable", d: "A story Jesus told to teach a truth about God's kingdom" },
    { t: "Pentecost", d: "The coming of the Holy Spirit that gave birth to the church" },
    { t: "Beatitudes", d: "The blessings Jesus taught in the Sermon on the Mount" }
  ],
  "Islamic Religious Studies": [
    { t: "Wahy", d: "The revelation of the Qur'an delivered through Angel Jibril" },
    { t: "Shahadah", d: "The testimony of faith — first pillar of Islam" },
    { t: "Salah", d: "The five daily obligatory prayers" },
    { t: "Zakat", d: "The compulsory poor-due given from wealth" },
    { t: "Hijrah", d: "The migration of the Prophet (SAW) from Makkah to Madinah" },
    { t: "Mizan", d: "The scales on which deeds are weighed on the Last Day" }
  ],
  "Data Processing": [
    { t: "Byte", d: "A group of 8 bits that holds one character" },
    { t: "Volatile memory", d: "Memory that loses its data when power is cut (RAM)" },
    { t: "Primary key", d: "The field that uniquely identifies each record in a table" },
    { t: "Binary", d: "The base-2 number system using only 0 and 1" },
    { t: "Spreadsheet", d: "Software of rows and columns with formulas like SUM" },
    { t: "Phishing", d: "Fraudulent emails or sites that steal personal data" }
  ],
  "Food & Nutrition": [
    { t: "Balanced diet", d: "A diet with all nutrients in the right proportions" },
    { t: "Protein", d: "The body-building nutrient found in meat, fish, beans, eggs" },
    { t: "Scurvy", d: "A deficiency disease caused by lack of vitamin C" },
    { t: "Menu", d: "The written list of dishes planned for a meal or day" },
    { t: "Steaming", d: "Cooking in steam above boiling water — preserves vitamins" },
    { t: "Food preservation", d: "Methods like drying, salting and freezing that keep food safe longer" }
  ],
  "French": [
    { t: "Le genre", d: "Masculin ou féminin — every French noun has a gender" },
    { t: "Le passé composé", d: "The past tense formed with avoir/être + past participle" },
    { t: "Le pronom", d: "A word that replaces a noun: je, tu, il, elle, nous, vous, ils, elles" },
    { t: "La salutation", d: "The greeting that opens a letter: Cher ami, Chère madame…" },
    { t: "Parce que", d: "The connector meaning 'because' — it introduces a cause" },
    { t: "L'accord", d: "Making adjectives agree in gender and number with the noun" }
  ]
};
/* Curated lesson-video library (real, verified links; every entry opens in the
   in-app player). Users can add their own — see the Video Studio tab. */
var VIDEOS = [
  { t: "WAEC & NECO Mathematics — full revision", s: "Mathematics", c: "SS3", id: "U_cHam0p4UE", ch: "Davetuts Academy" },
  { t: "SS3 TV Lesson: Chemical Equilibrium", s: "Chemistry", c: "SS3", id: "8BdV4HenhgU", ch: "Lagos State TV Lessons" },
  { t: "SS3 TV Lesson: Chemistry Practical", s: "Chemistry", c: "SS3", id: "sr4_vP6OnnA", ch: "Lagos State TV Lessons" },
  { t: "Chemistry for SS3 — Lesson 13", s: "Chemistry", c: "SS3", id: "ePCj7vYcMjc", ch: "Mr Osho" }
];
var CHANNELS = [
  { t: "Myschool Nigeria", d: "Free online classroom lessons for WAEC, NECO, JAMB CBT and more", u: "https://www.youtube.com/@MyschoolNigeria/playlists" },
  { t: "Davetuts Academy", d: "Past-question solving and full revisions for WAEC/NECO Mathematics", u: "https://www.youtube.com/@davetutsacademy" },
  { t: "O3SCHOOLS", d: "Nigerian exam-prep channel — WAEC practice, JAMB practice, CBT drills", u: "https://www.youtube.com/@o3schools" },
  { t: "FlashLearners", d: "English, Mathematics and science lessons plus exam tips", u: "https://www.youtube.com/@flashlearners" }
];
