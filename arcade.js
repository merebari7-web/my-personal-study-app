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

/* Authored questions for the 6 extended subjects (also used by edu.js; kept here so the
   Arcade games cover all 19 subjects even before the Teaching Suite loads). */
var XQ = {
 "Further Mathematics": [
  {
   "q": "If n(A) = 20, n(B) = 24 and n(A ∩ B) = 9, find n(A ∪ B).",
   "o": [
    "35",
    "44",
    "53",
    "29"
   ],
   "a": 0,
   "e": "Using n(A ∪ B) = 20 + 24 − 9 = 35 by the inclusion–exclusion rule."
  },
  {
   "q": "Which of the following is always true for sets A and B?",
   "o": [
    "A ∩ B ⊆ A ∪ B",
    "A ∪ B ⊆ A ∩ B",
    "A ⊆ A ∩ B",
    "A ∩ B = A ∪ B"
   ],
   "a": 0,
   "e": "Every element of A ∩ B belongs to A and to B, so it belongs to A ∪ B. The intersection is always a subset of the union."
  },
  {
   "q": "The statement 'If it rains, the ground is wet' is false when:",
   "o": [
    "it rains and the ground is wet",
    "it rains and the ground is not wet",
    "it does not rain and the ground is wet",
    "it does not rain and the ground is dry"
   ],
   "a": 1,
   "e": "An implication p ⇒ q is false only when p is true and q is false."
  },
  {
   "q": "Given a = (3, 4), find |a|.",
   "o": [
    "5",
    "7",
    "25",
    "3.5"
   ],
   "a": 0,
   "e": "|a| = √(3² + 4²) = √25 = 5."
  },
  {
   "q": "The determinant of the matrix [[2,3],[4,5]] is:",
   "o": [
    "−2",
    "2",
    "22",
    "10"
   ],
   "a": 0,
   "e": "det = (2 × 5) − (3 × 4) = 10 − 12 = −2."
  },
  {
   "q": "If a·b = 0 for non-zero vectors a and b, then the vectors are:",
   "o": [
    "parallel",
    "perpendicular",
    "equal in length",
    "opposite"
   ],
   "a": 1,
   "e": "a·b = |a||b|cosθ = 0 gives cosθ = 0 so θ = 90°, i.e. perpendicular."
  },
  {
   "q": "The coefficient of x² in the expansion of (1 + x)⁴ is:",
   "o": [
    "4",
    "6",
    "8",
    "12"
   ],
   "a": 1,
   "e": "C(4,2) = 4!/(2!2!) = 6."
  },
  {
   "q": "How many terms are in the full expansion of (x + y)⁶?",
   "o": [
    "6",
    "7",
    "8",
    "12"
   ],
   "a": 1,
   "e": "(a + b)ⁿ has n + 1 terms, so 6 + 1 = 7 terms."
  },
  {
   "q": "In the expansion of (2 + x)³ the constant term is:",
   "o": [
    "8",
    "4",
    "2",
    "1"
   ],
   "a": 0,
   "e": "The term with no x is 2³ = 8."
  },
  {
   "q": "If y = 3x² + 2x, find dy/dx.",
   "o": [
    "6x + 2",
    "3x + 2",
    "6x² + 2",
    "3x²"
   ],
   "a": 0,
   "e": "Power rule: 3 × 2x = 6x, and 2x differentiates to 2."
  },
  {
   "q": "The gradient of y = x² at x = 3 is:",
   "o": [
    "6",
    "9",
    "3",
    "12"
   ],
   "a": 0,
   "e": "dy/dx = 2x, so at x = 3 the gradient is 6."
  },
  {
   "q": "At a stationary point where d²y/dx² > 0, the curve has a:",
   "o": [
    "minimum",
    "maximum",
    "point of inflection",
    "vertical asymptote"
   ],
   "a": 0,
   "e": "A positive second derivative means the gradient is increasing, so the point is a local minimum."
  },
  {
   "q": "Evaluate ∫₁³ 2x dx.",
   "o": [
    "8",
    "4",
    "6",
    "16"
   ],
   "a": 0,
   "e": "∫2x dx = x², so [x²]₁³ = 9 − 1 = 8."
  },
  {
   "q": "∫ dx/x² equals:",
   "o": [
    "−1/x + C",
    "1/x + C",
    "−x⁻³/3 + C",
    "ln x² + C"
   ],
   "a": 0,
   "e": "∫x⁻² dx = x⁻¹/(−1) + C = −1/x + C."
  },
  {
   "q": "The constant of integration C is required because:",
   "o": [
    "differentiation removes constants",
    "the function is discontinuous",
    "integrals always diverge",
    "the limits are negative"
   ],
   "a": 0,
   "e": "Any constant has derivative zero, so the antiderivative is only determined up to an added constant."
  },
  {
   "q": "Simplify (2 + 3i) + (4 − i).",
   "o": [
    "6 + 2i",
    "6 + 4i",
    "8 + 2i",
    "6 − 2i"
   ],
   "a": 0,
   "e": "Add real parts: 2 + 4 = 6; add imaginary parts: 3i − i = 2i."
  },
  {
   "q": "If z = 3 + 4i, then |z| =",
   "o": [
    "5",
    "7",
    "25",
    "√7"
   ],
   "a": 0,
   "e": "|z| = √(3² + 4²) = √25 = 5."
  },
  {
   "q": "The conjugate of 5 − 2i is:",
   "o": [
    "5 + 2i",
    "−5 + 2i",
    "−5 − 2i",
    "2 − 5i"
   ],
   "a": 0,
   "e": "The conjugate negates the imaginary part only: 5 + 2i."
  }
 ],
 "Christian Religious Studies": [
  {
   "q": "According to Genesis, what did God create on the fourth day?",
   "o": [
    "Sun, moon and stars",
    "Birds and fish",
    "Land animals",
    "The sea"
   ],
   "a": 0,
   "e": "Day four: God made lights in the sky — the sun, moon and stars — 'for signs and for seasons'."
  },
  {
   "q": "Why did God forbid Adam and Eve from the tree of knowledge of good and evil?",
   "o": [
    "To test their obedience",
    "Because the fruit was poisonous",
    "Because it gave immortality",
    "To punish the serpent"
   ],
   "a": 0,
   "e": "The command tested their love and obedience; eating it was disobedience, not a natural need."
  },
  {
   "q": "The immediate consequence of Adam and Eve's disobedience was:",
   "o": [
    "they hid from God",
    "they gained wisdom",
    "they became immortal",
    "the garden was enlarged"
   ],
   "a": 0,
   "e": "Their eyes were opened and they hid from God — shame and broken fellowship replaced closeness."
  },
  {
   "q": "What was God's command to Abraham in Genesis 12:1?",
   "o": [
    "Leave your country and go to a land I will show you",
    "Build an ark",
    "Lead Israel out of Egypt",
    "Pluck out your eye"
   ],
   "a": 0,
   "e": "God called him to separate from his people and follow, a journey of faith."
  },
  {
   "q": "The sign of the Abrahamic covenant was:",
   "o": [
    "circumcision",
    "the rainbow",
    "the Sabbath",
    "the Passover lamb"
   ],
   "a": 0,
   "e": "Circumcision was the physical sign confirming God's promise to Abraham and his descendants."
  },
  {
   "q": "Abraham's greatest test of faith came when God asked him to:",
   "o": [
    "sacrifice Isaac",
    "leave Egypt",
    "marry twice",
    "build a tower"
   ],
   "a": 0,
   "e": "Offering Isaac showed Abraham trusted God even when the promise seemed impossible."
  },
  {
   "q": "The Passover feast commemorates:",
   "o": [
    "the angel of death passing over Israelite homes",
    "the crossing of the Red Sea",
    "the giving of the Law",
    "the first harvest"
   ],
   "a": 0,
   "e": "The blood of the lamb marked Israelite houses so the destroyer passed over them."
  },
  {
   "q": "Which commandment teaches respect for parents?",
   "o": [
    "Honour your father and mother",
    "You shall not steal",
    "Remember the Sabbath",
    "You shall not covet"
   ],
   "a": 0,
   "e": "The fifth commandment promises long life for honouring parents."
  },
  {
   "q": "Moses received the tablets of the Law at:",
   "o": [
    "Mount Sinai",
    "Mount Moriah",
    "Mount Carmel",
    "Mount Nebo"
   ],
   "a": 0,
   "e": "Sinai is where God made the covenant with Israel and gave the Law through Moses."
  },
  {
   "q": "Amos is known mainly for condemning:",
   "o": [
    "injustice against the poor",
    "the building of the temple",
    "foreign wars",
    "overeating"
   ],
   "a": 0,
   "e": "Amos thundered that empty worship while 'selling the righteous for silver' would not stand before God."
  },
  {
   "q": "On Mount Carmel Elijah challenged the prophets of:",
   "o": [
    "Baal",
    "Asherah",
    "Molech",
    "Dagon"
   ],
   "a": 0,
   "e": "The contest proved that the LORD, not Baal, answers by fire."
  },
  {
   "q": "Isaiah's vision in the temple emphasised God's:",
   "o": [
    "holiness",
    "weakness",
    "distance",
    "anger only"
   ],
   "a": 0,
   "e": "'Holy, holy, holy' is the heart of Isaiah's call, which leads to cleansing and commission."
  },
  {
   "q": "The Beatitudes begin Jesus' teaching recorded in:",
   "o": [
    "the Sermon on the Mount",
    "the Last Supper",
    "the Transfiguration",
    "the Temple cleansing"
   ],
   "a": 0,
   "e": "Matthew 5–7 records the Sermon on the Mount, opening with the Beatitudes."
  },
  {
   "q": "The parable of the Good Samaritan teaches:",
   "o": [
    "love your neighbour whoever they are",
    "never travel at night",
    "priests are useless",
    "the law is enough"
   ],
   "a": 0,
   "e": "The Samaritan — an outsider — showed mercy where the religious leaders did not."
  },
  {
   "q": "At the Last Supper Jesus gave the new commandment to:",
   "o": [
    "love one another",
    "build more churches",
    "memorise the Law",
    "avoid Rome"
   ],
   "a": 0,
   "e": "'Love one another as I have loved you' is the distinguishing mark of his disciples."
  },
  {
   "q": "The church was born publicly at:",
   "o": [
    "Pentecost",
    "Easter",
    "the Ascension",
    "the Transfiguration"
   ],
   "a": 0,
   "e": "The Spirit's coming at Pentecost, with Peter's sermon, began the preaching of the risen Christ."
  },
  {
   "q": "The first Christian martyr was:",
   "o": [
    "Stephen",
    "James",
    "Peter",
    "Philip"
   ],
   "a": 0,
   "e": "Stephen, full of faith and the Spirit, was stoned as the church faced its first persecution."
  },
  {
   "q": "Paul's main mission work was to:",
   "o": [
    "the Gentiles",
    "Egypt only",
    "the priests",
    "the Romans alone"
   ],
   "a": 0,
   "e": "Paul was the apostle to the Gentiles, planting churches across Asia Minor and Greece."
  }
 ],
 "Islamic Religious Studies": [
  {
   "q": "The Qur'an was revealed through which angel?",
   "o": [
    "Jibril (Gabriel)",
    "Mika'il",
    "Israfil",
    "Izra'il"
   ],
   "a": 0,
   "e": "Angel Jibril brought the revelation (wahy) to the Prophet (SAW)."
  },
  {
   "q": "How many surahs does the Qur'an contain?",
   "o": [
    "114",
    "100",
    "50",
    "99"
   ],
   "a": 0,
   "e": "The Qur'an has 114 chapters, each called a surah."
  },
  {
   "q": "The recorded sayings and actions of the Prophet (SAW) are called:",
   "o": [
    "Hadith",
    "Tafsir",
    "Fiqh",
    "Ijma"
   ],
   "a": 0,
   "e": "Hadith is the record of the Prophet's words and deeds, second to the Qur'an as a source."
  },
  {
   "q": "Which is NOT one of the five pillars of Islam?",
   "o": [
    "Sawm (fasting)",
    "Shahadah",
    "Zakat",
    "Iddah"
   ],
   "a": 3,
   "e": "The pillars are Shahadah, Salah, Zakat, Sawm and Hajj; Iddah is the waiting period after a divorce or widowhood."
  },
  {
   "q": "How many times do Muslims pray each day?",
   "o": [
    "five",
    "three",
    "seven",
    "one"
   ],
   "a": 0,
   "e": "Salah is obligatory five times daily: Fajr, Zuhr, Asr, Maghrib and Isha."
  },
  {
   "q": "Spending in charity and caring — the pillar concerned with the poor is:",
   "o": [
    "Zakat",
    "Hajj",
    "Sawm",
    "Shahadah"
   ],
   "a": 0,
   "e": "Zakat purifies wealth by giving a fixed share to those in need."
  },
  {
   "q": "The Hijrah refers to the migration to:",
   "o": [
    "Madinah",
    "Makkah",
    "Jerusalem",
    "Ta'if"
   ],
   "a": 0,
   "e": "The Prophet and his companions migrated from Makkah to Madinah in 622 CE."
  },
  {
   "q": "The first revelation came to the Prophet (SAW) in:",
   "o": [
    "the Cave of Hira",
    "the Ka'bah",
    "the mosque of Quba",
    "Mount Arafat"
   ],
   "a": 0,
   "e": "In the Cave of Hira, Jibril brought the first verses of Surah Al-Alaq."
  },
  {
   "q": "The Islamic calendar (Hijrah calendar) begins in:",
   "o": [
    "622 CE",
    "570 CE",
    "610 CE",
    "632 CE"
   ],
   "a": 0,
   "e": "The year of the Hijrah to Madinah, 622 CE, is year one of the Islamic calendar."
  },
  {
   "q": "The ablution performed before prayer is called:",
   "o": [
    "Wudu",
    "Ghusl",
    "Tayammum only",
    "Ihram"
   ],
   "a": 0,
   "e": "Wudu washes the hands, mouth, nose, face, arms, head and feet as preparation for Salah."
  },
  {
   "q": "Muslims face the ________ when praying.",
   "o": [
    "Qiblah",
    "Sunnah",
    "Mihrab only",
    "Kiswah"
   ],
   "a": 0,
   "e": "All prayers are directed towards the Qiblah, the direction of the Ka'bah in Makkah."
  },
  {
   "q": "The full ceremonial bath after major impurity is called:",
   "o": [
    "Ghusl",
    "Wudu",
    "Tayammum",
    "Sujud"
   ],
   "a": 0,
   "e": "Ghusl washes the whole body with water to restore ritual purity."
  },
  {
   "q": "Which action is forbidden in Islam?",
   "o": [
    "Backbiting",
    "Helping the poor",
    "Honouring parents",
    "Greeting others"
   ],
   "a": 0,
   "e": "Backbiting (gheebah) is compared to eating the flesh of a dead brother — strictly forbidden."
  },
  {
   "q": "The Islamic greeting is:",
   "o": [
    "As-salamu alaykum",
    "Bismillah",
    "Alhamdulillah",
    "Allahu akbar"
   ],
   "a": 0,
   "e": "'As-salamu alaykum' means 'peace be upon you' and spreads love among believers."
  },
  {
   "q": "Trading with false measurement is condemned because it is:",
   "o": [
    "dishonest",
    "lawful",
    "optional",
    "encouraged"
   ],
   "a": 0,
   "e": "The Qur'an condemns giving short measure — honesty in trade is an Islamic obligation."
  },
  {
   "q": "The weighing of deeds on the Last Day is done on the:",
   "o": [
    "Mizan (scales)",
    "Sirat",
    "Ka'bah",
    "Minbar"
   ],
   "a": 0,
   "e": "Every deed will be weighed on the Mizan to show the balance of good and evil."
  },
  {
   "q": "The eternal reward for the righteous is called:",
   "o": [
    "Jannah",
    "Jahannam",
    "Dunya",
    "Ma'ad"
   ],
   "a": 0,
   "e": "Jannah is paradise, the eternal reward prepared for the righteous."
  },
  {
   "q": "Belief in the Last Day directly encourages:",
   "o": [
    "accountability in daily life",
    "fatalism and idleness",
    "escaping work",
    "avoiding society"
   ],
   "a": 0,
   "e": "Knowing that deeds are judged and rewarded moves believers towards honesty and self-restraint."
  }
 ],
 "Data Processing": [
  {
   "q": "The brain of the computer that executes instructions is the:",
   "o": [
    "CPU",
    "RAM",
    "Monitor",
    "Hard disk"
   ],
   "a": 0,
   "e": "The Central Processing Unit fetches, decodes and executes program instructions."
  },
  {
   "q": "Which of these is an output device?",
   "o": [
    "Printer",
    "Scanner",
    "Keyboard",
    "Mouse"
   ],
   "a": 0,
   "e": "A printer presents processed data to the user; the others are input devices."
  },
  {
   "q": "Data that has been processed into a meaningful form is called:",
   "o": [
    "information",
    "raw data",
    "bits",
    "firmware"
   ],
   "a": 0,
   "e": "Processing gives data context and meaning, turning it into information."
  },
  {
   "q": "Convert 1010₂ to denary.",
   "o": [
    "10",
    "8",
    "12",
    "20"
   ],
   "a": 0,
   "e": "1010₂ = 8 + 0 + 2 + 0 = 10 in base 10."
  },
  {
   "q": "How many bits are in one byte?",
   "o": [
    "8",
    "4",
    "16",
    "2"
   ],
   "a": 0,
   "e": "A byte is a group of 8 bits."
  },
  {
   "q": "The hexadecimal system has base:",
   "o": [
    "16",
    "8",
    "10",
    "2"
   ],
   "a": 0,
   "e": "Hexadecimal uses digits 0–9 and A–F, i.e. base 16."
  },
  {
   "q": "Which memory is volatile?",
   "o": [
    "RAM",
    "ROM",
    "Hard disk",
    "Flash drive"
   ],
   "a": 0,
   "e": "RAM loses its contents when power is switched off."
  },
  {
   "q": "Data on a secondary storage device is kept:",
   "o": [
    "permanently",
    "only while power is on",
    "for one second",
    "in cache only"
   ],
   "a": 0,
   "e": "Secondary storage is non-volatile and retains data after the computer is off."
  },
  {
   "q": "A solid-state drive differs from a hard disk because it has:",
   "o": [
    "no moving parts",
    "more moving parts",
    "less capacity always",
    "no storage media"
   ],
   "a": 0,
   "e": "SSDs store data on flash memory chips with no rotating platters."
  },
  {
   "q": "Which is an operating system?",
   "o": [
    "Linux",
    "Microsoft Word",
    "Google Chrome",
    "Photoshop"
   ],
   "a": 0,
   "e": "Linux is an OS; the others are application software."
  },
  {
   "q": "A spreadsheet is best used for:",
   "o": [
    "calculations and data tables",
    "writing essays",
    "editing photos",
    "making calls"
   ],
   "a": 0,
   "e": "Spreadsheets (Excel, Sheets) organise data in rows and columns with formulas."
  },
  {
   "q": "The program that starts the computer and manages resources is the:",
   "o": [
    "operating system",
    "browser",
    "antivirus",
    "compiler"
   ],
   "a": 0,
   "e": "The OS boots the machine and coordinates all hardware and software."
  },
  {
   "q": "The protocol that secures web traffic is:",
   "o": [
    "HTTPS",
    "FTP",
    "SMTP",
    "POP3"
   ],
   "a": 0,
   "e": "HTTPS encrypts data between browser and server. FTP transfers files; SMTP/POP3 handle mail."
  },
  {
   "q": "A 'search engine' is used to:",
   "o": [
    "find information on the web",
    "print documents",
    "store files offline",
    "compile code"
   ],
   "a": 0,
   "e": "Search engines index billions of web pages and return relevant results to queries."
  },
  {
   "q": "Which practice improves online security?",
   "o": [
    "using unique strong passwords",
    "sharing passwords with friends",
    "opening every email attachment",
    "using the same password everywhere"
   ],
   "a": 0,
   "e": "Unique, strong passwords limit the damage if one account is compromised."
  },
  {
   "q": "In a database table, a single row of data is a:",
   "o": [
    "record",
    "field",
    "query",
    "report"
   ],
   "a": 0,
   "e": "Rows are records; columns are fields."
  },
  {
   "q": "The field that uniquely identifies each record is the:",
   "o": [
    "primary key",
    "foreign key",
    "memo field",
    "index"
   ],
   "a": 0,
   "e": "A primary key ensures each record can be found and never duplicated."
  },
  {
   "q": "Which spreadsheet formula adds the range B2 to B10?",
   "o": [
    "=SUM(B2:B10)",
    "=ADD B2-B10",
    "=TOTAL(B2,B10)",
    "=COUNT(B2:B10)"
   ],
   "a": 0,
   "e": "SUM(B2:B10) returns the total of the numbers in the range."
  }
 ],
 "Food & Nutrition": [
  {
   "q": "Which nutrient is the body's main energy source?",
   "o": [
    "Carbohydrates",
    "Proteins",
    "Minerals",
    "Water"
   ],
   "a": 0,
   "e": "Carbohydrates (starch, sugar) are the chief energy foods."
  },
  {
   "q": "Proteins are mainly needed for:",
   "o": [
    "body building and repair",
    "energy only",
    "cooling the body",
    "digestion only"
   ],
   "a": 0,
   "e": "Proteins build, repair and maintain body tissues and make enzymes and hormones."
  },
  {
   "q": "Lack of vitamin C causes:",
   "o": [
    "scurvy",
    "rickets",
    "anaemia",
    "goitre"
   ],
   "a": 0,
   "e": "Scurvy (bleeding gums) results from vitamin C deficiency; rickets is vitamin D deficiency."
  },
  {
   "q": "Which foods belong to the protective group?",
   "o": [
    "Fruits and vegetables",
    "Beans and meat",
    "Rice and yam",
    "Butter and oil"
   ],
   "a": 0,
   "e": "Fruits and vegetables supply vitamins and minerals that protect the body."
  },
  {
   "q": "A meal containing rice, fish, vegetables and groundnut oil is:",
   "o": [
    "balanced",
    "one-sided",
    "unhealthy always",
    "incomplete"
   ],
   "a": 0,
   "e": "It provides energy, protein, protective nutrients and fats — a balanced pattern."
  },
  {
   "q": "Energy needs are HIGHEST for:",
   "o": [
    "a growing teenage athlete",
    "a sleeping baby",
    "an elderly bedridden person",
    "an office worker on leave"
   ],
   "a": 0,
   "e": "Rapid growth plus strenuous activity raises energy requirements sharply."
  },
  {
   "q": "A written list of dishes served at a meal is called a:",
   "o": [
    "menu",
    "recipe",
    "budget",
    "ration"
   ],
   "a": 0,
   "e": "The menu states what will be eaten, planned in advance."
  },
  {
   "q": "Which factor does NOT belong in meal planning?",
   "o": [
    "The colour of the plate",
    "Family budget",
    "Nutrient needs",
    "Availability of food"
   ],
   "a": 0,
   "e": "Budget, needs and availability shape a plan; plate colour is presentation."
  },
  {
   "q": "Buying food in season is encouraged because it is:",
   "o": [
    "cheaper and fresher",
    "always imported",
    "more processed",
    "harder to cook"
   ],
   "a": 0,
   "e": "Seasonal produce costs less, is fresher and often more nutritious."
  },
  {
   "q": "The most common cause of food poisoning is:",
   "o": [
    "harmful bacteria",
    "too much salt",
    "overcooking",
    "eating fruit"
   ],
   "a": 0,
   "e": "Bacteria multiply in food that is not cooked, chilled or handled hygienically."
  },
  {
   "q": "Leftover food should be:",
   "o": [
    "cooled and refrigerated quickly",
    "left on the table overnight",
    "reheated later without care",
    "covered with cloth only"
   ],
   "a": 0,
   "e": "Fast cooling and chilling stop bacterial growth."
  },
  {
   "q": "Before handling food, a cook must:",
   "o": [
    "wash hands with soap",
    "taste the food",
    "wear jewellery",
    "wipe hands on apron"
   ],
   "a": 0,
   "e": "Hand-washing with soap and water is the first rule of food hygiene."
  },
  {
   "q": "Which cooking method preserves most vitamins?",
   "o": [
    "Steaming",
    "Deep frying",
    "Boiling for a long time",
    "Grilling at high heat"
   ],
   "a": 0,
   "e": "Steaming cooks with little water contact, so heat-labile vitamins survive better."
  },
  {
   "q": "Cooking food in hot oil is called:",
   "o": [
    "frying",
    "boiling",
    "steaming",
    "stewing"
   ],
   "a": 0,
   "e": "Frying cooks food in hot oil — shallow or deep."
  },
  {
   "q": "A main reason for cooking food is to:",
   "o": [
    "destroy harmful micro-organisms",
    "increase its weight",
    "remove all vitamins",
    "make it raw again"
   ],
   "a": 0,
   "e": "Heat kills bacteria and parasites, making food safe to eat."
  },
  {
   "q": "Which method preserves fish traditionally by removing moisture?",
   "o": [
    "Drying",
    "Frying",
    "Steaming",
    "Grating"
   ],
   "a": 0,
   "e": "Sun-drying removes water, so bacteria cannot grow."
  },
  {
   "q": "Refrigeration preserves food mainly by:",
   "o": [
    "slowing microbial growth",
    "killing all germs",
    "adding preservatives",
    "cooking it"
   ],
   "a": 0,
   "e": "Low temperature slows bacterial multiplication — it does not sterilise the food."
  },
  {
   "q": "Adding salt to meat or fish preserves it because salt:",
   "o": [
    "draws out water",
    "adds vitamins",
    "raises temperature",
    "removes protein"
   ],
   "a": 0,
   "e": "Salt reduces water activity, denying micro-organisms the moisture they need."
  }
 ],
 "French": [
  {
   "q": "Choisissez le bon article: _____ table.",
   "o": [
    "la",
    "le",
    "les",
    "l'"
   ],
   "a": 0,
   "e": "'Table' est féminin, donc 'la table'."
  },
  {
   "q": "Choisissez le bon article: _____ livre.",
   "o": [
    "un",
    "une",
    "des",
    "la"
   ],
   "a": 0,
   "e": "'Livre' (book) est masculin, donc 'un livre'."
  },
  {
   "q": "Le pluriel de 'un cahier' est:",
   "o": [
    "des cahiers",
    "les cahier",
    "un cahiers",
    "des cahier"
   ],
   "a": 0,
   "e": "Au pluriel on ajoute un -s: des cahiers, avec l'article indéfini pluriel 'des'."
  },
  {
   "q": "Conjuguez: Nous (manger) ___ au présent.",
   "o": [
    "mangeons",
    "mangent",
    "manges",
    "mangez"
   ],
   "a": 0,
   "e": "Avec 'nous', le 1er groupe prend -ons: nous mangeons."
  },
  {
   "q": "Le passé composé de 'je finir' est:",
   "o": [
    "j'ai fini",
    "je finis",
    "je finirai",
    "j'avais finir"
   ],
   "a": 0,
   "e": "Avec l'auxiliaire avoir + participe passé: j'ai fini."
  },
  {
   "q": "Avec l'auxiliaire 'être', le participe passé s'accorde avec:",
   "o": [
    "le sujet",
    "l'objet direct",
    "le verbe",
    "rien"
   ],
   "a": 0,
   "e": "Exemple: elle est allée — accord féminin singulier avec le sujet."
  },
  {
   "q": "Choisissez: une ___ maison.",
   "o": [
    "belle",
    "beau",
    "beaux",
    "bel"
   ],
   "a": 0,
   "e": "'Maison' est féminin, donc l'adjectif prend -e: belle."
  },
  {
   "q": "Le possessif correct: ___ frère (masculin singulier).",
   "o": [
    "mon",
    "ma",
    "mes",
    "ton"
   ],
   "a": 0,
   "e": "Devant un nom masculin singulier: mon frère."
  },
  {
   "q": "Quel pronom remplace 'les élèves'?",
   "o": [
    "ils",
    "elle",
    "tu",
    "nous"
   ],
   "a": 0,
   "e": "'Les élèves' est pluriel masculin, donc 'ils'."
  },
  {
   "q": "La sœur de ma mère est ma:",
   "o": [
    "tante",
    "cousine",
    "grand-mère",
    "nièce"
   ],
   "a": 0,
   "e": "La sœur de la mère est la tante."
  },
  {
   "q": "'Je me lève à six heures' signifie:",
   "o": [
    "I get up at six",
    "I sleep at six",
    "I eat at six",
    "I leave at six"
   ],
   "a": 0,
   "e": "Se lever = to get up."
  },
  {
   "q": "Le repas du matin s'appelle:",
   "o": [
    "le petit-déjeuner",
    "le déjeuner",
    "le dîner",
    "le goûter"
   ],
   "a": 0,
   "e": "Le petit-déjeuner est le repas du matin."
  },
  {
   "q": "Avant de lire un texte, il faut d'abord:",
   "o": [
    "lire les questions",
    "deviner des mots",
    "écrire en français",
    "mémoriser tout"
   ],
   "a": 0,
   "e": "Lire les questions guide la recherche de l'information."
  },
  {
   "q": "'Parce que' introduit:",
   "o": [
    "une cause",
    "une conséquence",
    "un contraste",
    "un lieu"
   ],
   "a": 0,
   "e": "Parce que (because) exprime la cause."
  },
  {
   "q": "Quand on répond à une question de compréhension, on doit:",
   "o": [
    "répondre par une phrase complète",
    "copier le texte entier",
    "répondre au hasard",
    "changer le sujet"
   ],
   "a": 0,
   "e": "Une réponse en phrase complète montre qu'on a compris le texte."
  },
  {
   "q": "Une lettre commence par:",
   "o": [
    "la date et la salutation",
    "la conclusion",
    "la signature seulement",
    "le titre"
   ],
   "a": 0,
   "e": "On écrit la date en haut, puis la salutation: Cher/Chere..."
  },
  {
   "q": "Quel connecteur exprime l'ordre final des idées?",
   "o": [
    "enfin",
    "mais",
    "parce que",
    "si"
   ],
   "a": 0,
   "e": "D'abord, ensuite, enfin organisent le plan du texte."
  },
  {
   "q": "La formule de politesse d'une lettre à un ami est:",
   "o": [
    "Amicalement",
    "Sincèrement vôtre, M. le Président",
    "À qui de droit",
    "Veuillez agréer"
   ],
   "a": 0,
   "e": "À un ami on écrit amicalement; les formules officielles conviennent aux lettres formelles."
  }
 ]
};
/* ============================================================
   v11.0 — STUDY ARCADE + VIDEO STUDIO · engine
   6 study modes (Term Match, Rapid Fire 60s, Flash Cards, Memory Pairs,
   Ladder Challenge, UTME Simulation) + Video Studio + curriculum hub.
   All state lives on-device; XP/merits feed the main app.
   ============================================================ */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function hasLS() { try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return true; } catch (e) { return false; } }
  function store(k, v) {
    if (!hasLS()) return;
    try {
      if (v === undefined) return JSON.parse(localStorage.getItem(k) || "null");
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
  function toast(m, icon) {
    try { if (window.toast) return toast(m, icon); } catch (e) {}
    try { window.toast(m, icon); } catch (e) {}
  }
  function xp(n) { try { if (window.xpAdd && n) { xpAdd(n); return true; } } catch (e) {} return false; }
  function coin(n) { try { if (window.coinsAdd && n) { coinsAdd(n); return true; } } catch (e) {} return false; }
  function bank() {
    try {
      if (typeof CLASSES !== "undefined" && CLASSES && CLASSES.length && CLASSES[0] && CLASSES[0].questions) return CLASSES;
      if (window.QUIZ_RAW && QUIZ_RAW.classes && QUIZ_RAW.classes.length) return QUIZ_RAW.classes;
    } catch (e) {}
    return null;
  }
  function subjList() {
    try { if (window.QUIZ_RAW && Array.isArray(QUIZ_RAW.subj)) return QUIZ_RAW.subj.slice(); } catch (e) {}
    return Object.keys(PAIRS);
  }
  function uid() { var k = "nssc_uid_a"; var v = store(k); if (!v) { v = Math.random().toString(36).slice(2, 10); store(k, v); } return v; }
  var ARC_KEY = "nssc_arc_a";
  function bests() { var b = store(ARC_KEY) || {}; return typeof b === "object" && !Array.isArray(b) ? b : {}; }
  function saveBest(b) { var cur = bests(); cur[b] = { best: M.best, at: Date.now() }; store(ARC_KEY, cur); }

  /* ---------- state ---------- */
  var M = { mode: null, subj: null, round: 0, score: 0, streak: 0, best: 0, lives: 3, secs: 0, moves: 0, t0: 0, deck: [], timer: null, over: false };
  var CUSTOM_VID = "nssc_videos_a";

  /* ---------- overlay + css ---------- */
  var CSS = ""
    + "#arcOv{position:fixed;inset:0;z-index:90;background:rgba(4,10,20,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:0}"
    + "@media(min-width:760px){#arcOv{align-items:center;padding:24px}}"
    + "#arcOv .arc-modal{background:var(--card-solid,#fffaf0);color:var(--ink,#1c1626);width:100%;max-width:860px;max-height:92dvh;border-radius:18px 18px 0 0;overflow:auto;padding:16px;border:1px solid var(--card-border,#ddd2b8)}"
    + "@media(min-width:760px){#arcOv .arc-modal{border-radius:18px;max-height:86vh;padding:22px}}"
    + ".arc-head{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:10px}"
    + ".arc-head h3{margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.05rem;letter-spacing:.02em}"
    + ".arc-x{background:transparent;border:1px solid var(--card-border,#ddd2b8);border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:1rem;color:var(--ink,#1c1626);flex:none}"
    + ".arc-tabs{display:flex;gap:6px;overflow-x:auto;padding:0 0 8px;border-bottom:1px solid var(--card-border,#ddd2b8);margin-bottom:12px}"
    + ".arc-tab{border:1px solid var(--card-border,#ddd2b8);background:var(--bg,#f5efe4);color:var(--ink,#1c1626);border-radius:999px;padding:8px 14px;font-size:.8rem;cursor:pointer;white-space:nowrap;font-family:inherit;min-height:38px}"
    + ".arc-tab.on{background:rgba(201,162,39,.18);border-color:#c9a227;font-weight:800}"
    + ".arc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}"
    + ".arc-tile{border:1px solid var(--card-border,#ddd2b8);background:var(--panel,#fbf7ee);border-radius:14px;padding:14px 12px;text-align:left;cursor:pointer;font-family:inherit;color:var(--ink,#1c1626);transition:.18s;min-height:112px}"
    + ".arc-tile:hover{transform:translateY(-2px);border-color:#c9a227;box-shadow:0 10px 24px -14px rgba(0,0,0,.4)}"
    + ".arc-tile b{display:block;font-size:.95rem;line-height:1.3;margin:6px 0 3px}"
    + ".arc-tile span{font-size:1.4rem}"
    + ".arc-tile small{display:block;color:var(--mut,#8a7a5e);font-size:.72rem;line-height:1.45}"
    + ".arc-best{font-size:.72rem;color:#8a6d1f;font-weight:800;margin-top:8px}"
    + ".arc-sub{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 10px}"
    + ".arc-chip{border:1px solid var(--card-border,#ddd2b8);background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:999px;padding:7px 13px;font-size:.76rem;cursor:pointer;font-family:inherit;min-height:36px}"
    + ".arc-chip.on{background:rgba(201,162,39,.2);border-color:#c9a227;font-weight:800}"
    + ".arc-q{border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:14px 15px;background:var(--panel,#fbf7ee);margin-bottom:10px}"
    + ".arc-qtext{font-size:.95rem;font-weight:700;line-height:1.5;margin-bottom:12px}"
    + ".arc-opts{display:grid;gap:8px;grid-template-columns:1fr}"
    + ".arc-opt{border:1.5px solid var(--card-border,#ddd2b8);background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:11px;padding:11px 12px;font-size:.86rem;text-align:left;cursor:pointer;font-family:inherit;min-height:44px}"
    + ".arc-opt:hover{border-color:#c9a227}"
    + ".arc-opt.good{border-color:#2b8a3e;background:rgba(43,138,62,.12)}"
    + ".arc-opt.bad{border-color:#c92a2a;background:rgba(201,42,42,.12)}"
    + ".arc-opt.dim{opacity:.55}"
    + ".arc-hud{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}"
    + ".arc-pill{background:var(--panel,#fbf7ee);border:1px solid var(--card-border,#ddd2b8);border-radius:999px;padding:6px 12px;font-size:.76rem;font-weight:800}"
    + ".arc-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}"
    + ".arc-btn{border:1.5px solid var(--card-border,#ddd2b8);background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:11px;padding:10px 16px;font-family:inherit;font-size:.82rem;font-weight:800;cursor:pointer;min-height:40px}"
    + ".arc-btn.gold{background:#c9a227;color:#1d1508;border-color:#a67c1e}"
    + ".arc-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}"
    + "@media(max-width:420px){.arc-cards{grid-template-columns:repeat(3,1fr)}}"
    + ".arc-card{aspect-ratio:1;border:1.5px solid var(--card-border,#ddd2b8);border-radius:12px;background:linear-gradient(150deg,#134a7c,#0a2c50);color:#f5ead2;font-size:.74rem;font-weight:800;display:grid;place-items:center;padding:6px;text-align:center;cursor:pointer;font-family:inherit;min-height:52px}"
    + ".arc-card.up{background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626)}"
    + ".arc-card.gone{visibility:hidden;pointer-events:none}"
    + ".arc-vid{border:1px solid var(--card-border,#ddd2b8);border-radius:14px;padding:10px 12px;background:var(--panel,#fbf7ee);margin-bottom:10px}"
    + ".arc-vid iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:10px;background:#000;display:block}"
    + ".arc-vid h4{margin:8px 0 2px;font-size:.9rem}"
    + ".arc-vid small{color:var(--mut,#8a7a5e);font-size:.72rem}"
    + ".arc-play{border:1.5px solid #c9a227;background:rgba(201,162,39,.15);color:var(--ink,#1c1626);border-radius:999px;padding:5px 13px;font-size:.7rem;font-weight:900;cursor:pointer;font-family:inherit;min-height:34px;margin-right:8px}"
    + ".arc-add{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;align-items:center}"
    + ".arc-add input{flex:1 1 180px;border:1.5px solid var(--card-border,#ddd2b8);border-radius:10px;padding:9px 11px;font-size:.82rem;font-family:inherit;background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626);min-height:40px}"
    + ".arc-note{font-size:.72rem;color:var(--mut,#8a7a5e);line-height:1.5;margin:8px 0}"
    + ".arc-pairs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;margin-top:8px}"
    + ".arc-pair{border:1px solid var(--card-border,#ddd2b8);border-radius:10px;padding:9px 11px;background:var(--panel,#fbf7ee);font-size:.75rem;line-height:1.5}"
    + ".arc-pair b{color:#8a6d1f}"
    + ".arc-sheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(38px,1fr));gap:6px;margin:12px 0 4px}"
    + ".arc-cell{border:1.5px solid var(--card-border,#ddd2b8);background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626);border-radius:9px;min-height:38px;font-size:.72rem;font-weight:800;cursor:pointer;font-family:inherit}"
    + ".arc-cell.on{background:rgba(201,162,39,.25);border-color:#c9a227}"
    + ".arc-cell.cur{outline:2px solid #c9a227;outline-offset:-2px}"
    + ".arc-cell.good{background:rgba(43,138,62,.22);border-color:#2b8a3e}"
    + ".arc-cell.bad{background:rgba(201,42,42,.22);border-color:#c92a2a}"
    + ".arc-opt.on-arc{background:rgba(201,162,39,.25);border-color:#c9a227}"
    + ".arc-un{font-size:.72rem;color:var(--mut,#8a7a5e);margin:6px 0 0}"
    + ".arc-time{font-size:1.02rem;padding:7px 14px}"
    + ".arc-total{font-size:1.7rem;font-weight:900;color:#8a6d1f;line-height:1.2}"
    + ".arc-bar{height:10px;border-radius:999px;background:rgba(0,0,0,.08);overflow:hidden;margin:4px 0 2px}"
    + ".arc-bar i{display:block;height:100%;background:linear-gradient(90deg,#c9a227,#e6c453)}"
    + ".arc-fcard{border:1.5px solid var(--card-border,#ddd2b8);border-radius:16px;background:linear-gradient(150deg,#134a7c,#0a2c50);color:#f5ead2;min-height:190px;display:grid;place-items:center;padding:22px;font-size:1.02rem;font-weight:800;text-align:center;line-height:1.55;margin-bottom:12px}"
    + ".arc-fcard.show{background:var(--chip-bg,#fffdf6);color:var(--ink,#1c1626)}";

  function body() { return $("arcBody"); }
  function shell(title, inner, wide) {
    var ov = $("arcOv");
    if (!ov) {
      ov = document.createElement("div"); ov.id = "arcOv";
      ov.innerHTML = '<div class="arc-modal" id="arcModal">' +
        '<div class="arc-head"><h3 id="arcTitle">🎮 Study Arcade</h3><button type="button" class="arc-x" id="arcX" aria-label="Close">✕</button></div>' +
        '<div class="arc-tabs" id="arcTabs"></div><div id="arcBody"></div></div>';
      document.body.appendChild(ov);
      $("arcX").onclick = function () { close(); };
    }
    $("arcTitle").textContent = title;
    body().innerHTML = inner;
    tabs();
    ov.classList.remove("hidden");
    document.body.classList.add("arc-open");
    try { renderGameHud && renderGameHud(); } catch (e) {}
  }
  function close() {
    var ov = $("arcOv");
    if (ov) ov.classList.add("hidden");
    document.body.classList.remove("arc-open");
    if (M.timer) { clearInterval(M.timer); M.timer = null; }
  }
  function tabs() {
    var t = $("arcTabs"); if (!t) return;
    var items = [["open", "🏠 Home"], ["term", "🧠 Term Match"], ["rapid", "⚡ Rapid Fire"], ["cards", "🃏 Flash Cards"], ["memo", "🃏 Memory Pairs"], ["ladder", "🪜 Ladder"], ["utme", "🎓 UTME"], ["videos", "🎬 Studio"], ["hub", "🗺 Curriculum"]];
    t.innerHTML = items.map(function (x) {
      return '<button type="button" class="arc-tab' + (M.mode === x[0] ? " on" : "") + '" onclick="ARC.go(\'' + x[0] + '\')">' + x[1] + "</button>";
    }).join("");
  }

  /* ---------- home ---------- */
  function go(kind, opts) {
    if (kind === "close") return close();
    if (kind !== "open") M.mode = kind;
    else M.mode = "open";
    if (M.timer) { clearInterval(M.timer); M.timer = null; }
    if (kind === "term") return termGo(opts);
    if (kind === "rapid") return rapidGo(opts);
    if (kind === "memo") return memoGo(opts);
    if (kind === "ladder") return ladderGo(opts);
    if (kind === "utme") return utmeGo(opts);
    if (kind === "cards") return cardGo(opts);
    if (kind === "videos") return vidRoute();
    if (kind === "hub") return hubRoute();
    var bs = bests();
    shell("🎮 Study Arcade — play, revise, level up", "" +
      '<p style="margin:0 0 10px;font-size:.8rem;color:var(--mut,#8a7a5e)">Six study modes built on the app\'s verified WAEC/NECO question bank and the full 19-subject curriculum — every correct answer earns XP and merits.</p>' +
      '<div class="arc-grid">' +
      tile("utme", "🎓", "UTME Simulation", "JAMB-style: 4 subjects, 180 questions, timed — see your /400", bs.utme && bs.utme.best ? bs.utme.best + "/400 best" : "") +
      tile("cards", "🃏", "Flash Cards", "Term–definition decks for all 19 subjects — the tricky cards come back first", bs.cards && bs.cards.best ? bs.cards.best + "/6 best" : "") +
      tile("term", "🧠", "Term Match", "Match each term to its definition — 10 rounds, streaks count", bs.term && bs.term.best ? bs.term.best.best + " pts best" : "") +
      tile("rapid", "⚡", "Rapid Fire 60s", "Answer as many real questions as you can in 60 seconds", bs.rapid && bs.rapid.best ? bs.rapid.best.best + " pts best" : "") +
      tile("memo", "🃏", "Memory Pairs", "Flip cards and match term–definition pairs in as few moves as possible", bs.memo && bs.memo.best ? bs.memo.best.best + " moves best" : "") +
      tile("ladder", "🪜", "Ladder Challenge", "10 rungs, 3 lives, ever-tighter timing — climb for the top", bs.ladder && bs.ladder.best ? bs.ladder.best.best + " rungs best" : "") +
      tile("videos", "🎬", "Video Studio", "Curated Nigerian lesson videos + add your own links", "") +
      tile("hub", "🗺", "Curriculum Hub", "Every SS1–SS3 subject with lesson notes in one place", "") +
      "</div>");
  }
  function tile(mode, icon, t, small, best) {
    return '<button type="button" class="arc-tile" onclick="ARC.go(\'' + mode + '\')"><span>' + icon + '</span><b>' + esc(t) + '</b><small>' + esc(small) + '</small>' + (best ? '<div class="arc-best">' + esc(best) + "</div>" : "") + "</button>";
  }

  /* ---------- Term Match ---------- */
  function termGo(opts) {
    var subj = (opts && opts.subj) || M.subj || "Mathematics";
    if (!PAIRS[subj]) subj = Object.keys(PAIRS)[0];
    M.subj = subj;
    M.round = 0; M.score = 0; M.streak = 0; M.over = false;
    var chips = Object.keys(PAIRS).map(function (s) { return '<button type="button" class="arc-chip' + (s === subj ? " on" : "") + '" onclick="ARC.termSub(\'' + esc(s).replace(/'/g, "\\'") + '\')">' + esc(s) + "</button>"; }).join("");
    shell("🧠 Term Match — " + subj, '<div class="arc-sub">' + chips + "</div><div id=\"arcPlay\"></div>");
    termRound();
  }
  function termSub(s) { M.subj = s; termGo(); }
  function termRound() {
    var play = $("arcPlay"); if (!play) return;
    if (M.round >= 10) return termEnd();
    var pairs = PAIRS[M.subj];
    var right = pairs[M.round % pairs.length];
    var wrong = shuffle(pairs.filter(function (p) { return p.t !== right.t; })).slice(0, 3);
    var opts = shuffle([right].concat(wrong));
    M.round++;
    play.innerHTML = '<div class="arc-hud"><span class="arc-pill">Round ' + M.round + "/10</span><span class=\"arc-pill\">Score " + M.score + "</span><span class=\"arc-pill\">Streak 🔥" + M.streak + "</span></div>" +
      '<div class="arc-q"><div class="arc-qtext">' + esc(right.t) + "</div>" +
      '<div class="arc-opts" id="arcTermOpts" data-answer="' + opts.indexOf(right) + '">' +
      opts.map(function (p, i) { return '<button type="button" class="arc-opt" onclick="ARC.pick(' + i + ')">' + esc(p.d) + "</button>"; }).join("") + "</div></div>";
  }
  function pick(i) {
    var opts = $("arcTermOpts"); if (!opts) return;
    var ans = +opts.getAttribute("data-answer");
    var btns = opts.querySelectorAll(".arc-opt");
    Array.prototype.forEach.call(btns, function (b, k) {
      b.classList.add(k === ans ? "good" : "dim");
      if (k === i && i !== ans) b.classList.add("bad");
      b.disabled = true;
    });
    if (i === ans) { M.score += 10 + 2 * M.streak; M.streak++; }
    else M.streak = 0;
    setTimeout(termRound, 650);
  }
  function termEnd() {
    M.best = M.score;
    xp(M.score * 2); coin(M.score >= 60 ? 1 : 0);
    saveBest("term");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">🏁 Final score: ' + M.score + ' pts (streak bonus included)</div>' +
      '<p style="font-size:.78rem;color:var(--mut,#8a7a5e);margin:0 0 10px">Every point is 2 XP toward your level in the main app.</p>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'term\')">Play again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- Rapid Fire 60s ---------- */
  function rapidGo(opts) {
    if (opts && opts.subj) M.subj = opts.subj;
    var secs = (opts && opts.secs) || 60;
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return go("open"); }
    M.secs = secs; M.score = 0; M.streak = 0; M.round = 0; M.over = false;
    M.deck = M.subj ? poolFor(M.subj) : rapidDeck(cls).slice(0, 40);
    if (!M.deck || !M.deck.length) M.deck = rapidDeck(cls).slice(0, 40);
    M.t0 = Date.now();
    var chipSubs = subjList().slice();
    Object.keys(XQ).forEach(function (s) { if (chipSubs.indexOf(s) < 0) chipSubs.push(s); });
    chipSubs.sort();
    var chips = ['<button type="button" class="arc-chip' + (M.subj ? "" : " on") + '" data-s="">All subjects</button>']
      .concat(chipSubs.map(function (s) { return '<button type="button" class="arc-chip' + (M.subj === s ? " on" : "") + '" data-s="' + esc(s) + '">' + esc(s) + "</button>"; })).join("");
    shell("⚡ Rapid Fire — 60 seconds", '<div class="arc-sub" id="arcRSubs">' + chips + '</div><div class="arc-hud"><span class="arc-pill" id="arcClock">⏱ ' + secs + "s</span><span class=\"arc-pill\">Score " + M.score + '</span><span class="arc-pill">Streak 🔥' + M.streak + "</span></div><div id=\"arcPlay\"></div>");
    var rs = $("arcRSubs");
    if (rs) {
      Array.prototype.forEach.call(rs.querySelectorAll(".arc-chip"), function (b) {
        b.onclick = function () { M.subj = b.getAttribute("data-s") || null; rapidGo(); };
      });
    }
    rapidQ();
    M.timer = setInterval(function () {
      var left = Math.max(0, secs - ((Date.now() - M.t0) / 1000 | 0));
      var c = $("arcClock"); if (c) c.textContent = "⏱ " + left + "s";
      if (left <= 0) { clearInterval(M.timer); M.timer = null; rapidEnd(); }
    }, 1000);
  }
  function rapidDeck(cls) {
    /* adaptive: lean on the subjects where this device has the most mistakes */
    var miss = null;
    try { var m = store("nssc_mistakes"); if (m && typeof m === "object") miss = m; } catch (e) {}
    var all = [];
    cls.forEach(function (c) { (c.questions || []).forEach(function (q) { all.push(q); }); });
    if (miss) {
      var hot = [];
      Object.keys(miss).forEach(function (k) {
        var v = miss[k];
        var n = typeof v === "number" ? v : (v && v.n) || 0;
        if (n > 2) hot.push(k);
      });
      if (hot.length) {
        var hotQs = all.filter(function (q) { return hot.indexOf(q.s) >= 0; });
        if (hotQs.length > 20) return shuffle(hotQs).concat(shuffle(all.filter(function (q) { return hot.indexOf(q.s) < 0; })));
      }
    }
    return shuffle(all);
  }
  function poolFor(s) {
    var cls = bank(); if (!cls) return [];
    var qs = [];
    cls.forEach(function (c) { (c.questions || []).forEach(function (q) { if (q.s === s) qs.push(q); }); });
    if (qs.length) return shuffle(qs).slice(0, 40);
    return extraPool(s);
  }
  function extraPool(s) {
    var qs = (XQ[s] || []).slice();
    var pairs = PAIRS[s] || [];
    pairs.forEach(function (p) {
      var ds = shuffle(pairs.filter(function (x) { return x.t !== p.t; }).map(function (x) { return x.d; }));
      var os = [p.d];
      ds.forEach(function (d) { if (os.indexOf(d) < 0 && os.length < 4) os.push(d); });
      if (os.length < 3) return;
      os = shuffle(os);
      qs.push({ q: 'Which statement best describes "' + p.t + '"?', o: os, a: os.indexOf(p.d), e: "Definition: " + p.d });
    });
    return shuffle(qs);
  }
  function rapidQ() {
    var play = $("arcPlay"); if (!play || M.over) return;
    var q = M.deck[M.round % M.deck.length]; M.round++;
    play.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + esc(q.q) + "</div>" +
      '<div class="arc-opts" id="arcRapidOpts" data-answer="' + q.a + '">' +
      q.o.map(function (o, i) { return '<button type="button" class="arc-opt" onclick="ARC.rpick(' + i + ')">' + esc(o) + "</button>"; }).join("") + "</div></div>";
  }
  function rpick(i) {
    var opts = $("arcRapidOpts"); if (!opts || M.over) return;
    var ans = +opts.getAttribute("data-answer");
    var btns = opts.querySelectorAll(".arc-opt");
    Array.prototype.forEach.call(btns, function (b, k) {
      b.classList.add(k === ans ? "good" : "dim"); if (k === i && i !== ans) b.classList.add("bad"); b.disabled = true;
    });
    if (i === ans) { M.score += 10 + 2 * M.streak; M.streak++; } else M.streak = 0;
    try { var sp = document.querySelectorAll("#arcBody .arc-pill")[1]; if (sp) sp.textContent = "Score " + M.score; } catch (e) {}
    setTimeout(rapidQ, 420);
  }
  function rapidEnd() {
    M.over = true; M.best = M.score;
    xp(M.score); coin(M.score >= 400 ? 1 : 0);
    saveBest("rapid");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">⏱ Time! ' + M.score + ' pts — ' + (M.round - 1) + ' questions</div>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'rapid\')">Go again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- Memory Pairs ---------- */
  function memoGo(opts) {
    var subj = (opts && opts.subj) || M.subj || "Mathematics";
    if (!PAIRS[subj]) subj = Object.keys(PAIRS)[0];
    M.subj = subj; M.moves = 0; M.t0 = Date.now(); M.deck = [];
    var pairs = shuffle(PAIRS[subj]).slice(0, 6);
    var cards = [];
    pairs.forEach(function (p, k) {
      cards.push({ k: k, w: "t", t: p.t });
      cards.push({ k: k, w: "d", t: p.d });
    });
    cards = shuffle(cards);
    M.deck = cards;
    var chips = Object.keys(PAIRS).map(function (s) { return '<button type="button" class="arc-chip' + (s === subj ? " on" : "") + '" onclick="ARC.memoSub(\'' + esc(s).replace(/'/g, "\\'") + '\')">' + esc(s) + "</button>"; }).join("");
    shell("🃏 Memory Pairs — " + subj, '<div class="arc-sub">' + chips + '</div><div class="arc-hud"><span class="arc-pill">Moves ' + M.moves + '</span><span class="arc-pill" id="memoTimer">⏱ 0s</span></div><div class="arc-cards" id="memoGrid"></div>');
    renderCards();
    M.timer = setInterval(function () {
      var mt = $("memoTimer"); if (mt) mt.textContent = "⏱ " + ((Date.now() - M.t0) / 1000 | 0) + "s";
    }, 500);
  }
  function memoSub(s) { M.subj = s; memoGo(); }
  function renderCards() {
    var g = $("memoGrid"); if (!g) return;
    g.innerHTML = M.deck.map(function (c, i) {
      return '<button type="button" class="arc-card" data-i="' + i + '" data-k="' + c.k + '" onclick="ARC.flip(' + i + ')">?</button>';
    }).join("");
  }
  var F1 = null, F2 = null, LOCK = false;
  function flip(i) {
    if (LOCK) return;
    var g = $("memoGrid"); if (!g) return;
    var cards = g.children;
    if (F1 === null) { F1 = i; flipShow(cards, i); return; }
    if (F2 === null && i !== F1) {
      F2 = i; flipShow(cards, i); M.moves++;
      var mv = $("memoMoves"); if (!mv) { }
      var hud = document.querySelectorAll(".arc-pill");
      if (hud[0]) hud[0].textContent = "Moves " + M.moves;
      if (M.deck[F1].k === M.deck[F2].k) {
        cards[F1].classList.add("gone"); cards[F2].classList.add("gone");
        var left = g.querySelectorAll(".arc-card:not(.gone)").length;
        if (left === 0) memoEnd();
        F1 = null; F2 = null;
      } else {
        LOCK = true;
        setTimeout(function () {
          if (M.deck[F1]) { flipShow(cards, F1, true); flipShow(cards, F2, true); }
          F1 = null; F2 = null; LOCK = false;
        }, 750);
      }
    }
  }
  function flipShow(cards, i, hide) {
    var c = cards[i]; if (!c) return;
    c.classList.toggle("up", !hide);
    c.textContent = hide ? "?" : (M.deck[i].w === "t" ? M.deck[i].t : M.deck[i].t);
  }
  function memoEnd() {
    clearInterval(M.timer); M.timer = null;
    var secs = (Date.now() - M.t0) / 1000 | 0;
    M.best = M.moves;
    xp(Math.max(10, 60 - M.moves * 2)); coin(M.moves <= 10 ? 1 : 0);
    saveBest("memo");
    var g = $("memoGrid");
    if (g) { g.style.gridTemplateColumns = "1fr"; g.innerHTML = '<div class="arc-q"><div class="arc-qtext">🃏 All matched in ' + M.moves + ' moves (' + secs + 's)</div>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'memo\')">Play again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>'; }
  }

  /* ---------- Ladder Challenge ---------- */
  function ladderGo(opts) {
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return go("open"); }
    M.deck = shuffle(cls.reduce(function (a, c) { return a.concat(c.questions || []); }, [])).slice(0, 10);
    M.round = 0; M.lives = 3; M.score = 0; M.over = false;
    M.secs = (opts && opts.secs) || 20;
    shell("🪜 Ladder Challenge", '<div class="arc-hud"><span class="arc-pill">Rung ' + (M.round + 1) + "/10</span><span class=\"arc-pill\">Lives ❤❤❤</span><span class=\"arc-pill\">Score " + M.score + "</span><span class=\"arc-pill\" id=\"ladClock\">⏱ 20s</span></div><div id=\"arcPlay\"></div>");
    ladderQ();
  }
  function ladderQ() {
    var play = $("arcPlay"); if (!play || M.over) return;
    var q = M.deck[M.round]; M.round++;
    var per = Math.max(6, M.secs - M.round); /* each rung gets a little tighter */
    M.rungSecs = per;
    var play2 = $("arcPlay");
    play2.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + esc(q.q) + "</div>" +
      '<div class="arc-opts" id="arcLadOpts" data-answer="' + q.a + '">' +
      q.o.map(function (o, i) { return '<button type="button" class="arc-opt" onclick="ARC.lpick(' + i + ')">' + esc(o) + "</button>"; }).join("") + "</div></div>";
    M.ladT = Date.now();
    if (M.timer) clearInterval(M.timer);
    M.timer = setInterval(function () {
      var left = Math.max(0, per - ((Date.now() - M.ladT) / 1000 | 0));
      var c = $("ladClock"); if (c) c.textContent = "⏱ " + left + "s";
      if (left <= 0) { clearInterval(M.timer); M.timer = null; ladderMiss(true); }
    }, 1000);
  }
  function lpick(i) {
    if (M.over) return;
    clearInterval(M.timer); M.timer = null;
    var opts = $("arcLadOpts"); if (!opts) return;
    var ans = +opts.getAttribute("data-answer");
    if (i === ans) { M.score += 10 + M.round; }
    else ladderMiss(false);
    if (i === ans) setTimeout(ladderNext, 420);
  }
  function ladderMiss(timeup) {
    if (M.over) return;
    M.lives--;
    var hud = document.querySelectorAll(".arc-pill");
    if (hud[1]) hud[1].textContent = "Lives " + "❤".repeat(Math.max(0, M.lives)) + "🖤".repeat(3 - Math.max(0, M.lives));
    if (M.lives <= 0) { M.over = true; ladderEnd(); return; }
    setTimeout(ladderNext, 500);
  }
  function ladderNext() {
    if (M.over) return;
    if (M.round >= 10) return ladderEnd();
    var hud = document.querySelectorAll(".arc-pill");
    if (hud[0]) hud[0].textContent = "Rung " + (M.round + 1) + "/10";
    ladderQ();
  }
  function ladderEnd() {
    M.over = true; M.best = M.round;
    xp(M.score); coin(M.round >= 8 ? 1 : 0);
    saveBest("ladder");
    var p = $("arcPlay");
    if (p) p.innerHTML = '<div class="arc-q"><div class="arc-qtext">' + (M.lives > 0 ? "🏁 You climbed " + M.round + " rungs!" : "💀 Out of lives at rung " + M.round) + " — " + M.score + " pts</div>" +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" onclick="ARC.go(\'ladder\')">Climb again</button><button type="button" class="arc-btn" onclick="ARC.go(\'open\')">All games</button></div></div>';
  }

  /* ---------- UTME Simulation (JAMB-style) ---------- */
  var UT = null, UPICK = [];
  function utmeGo(opts) {
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return go("open"); }
    var subs = subjList();
    var eng = null;
    subs.forEach(function (s) { if (!eng && /english/i.test(s)) eng = s; });
    if (!eng) eng = subs[0] || "English Language";
    var rest = subs.filter(function (s) { return s !== eng; });
    if (opts && !opts.subjects) { UPICK = []; }
    M.mode = "utme";
    shell("🎓 UTME Simulation Hall — JAMB style", "" +
      '<p class="arc-note" style="font-size:.8rem;line-height:1.6">The real UTME format: <b>4 subjects</b> (English Language + 3 you choose), <b>60 English questions + 40 per other subject = 180 questions</b>, timed, scaled to <b>/400</b>. Built from the app&#39;s verified WAEC/NECO bank — a practice simulation, not an official JAMB paper. Integrity hint: the paper counts tab switches.</p>' +
      '<div class="arc-sub" id="utmeSubs">' + utmeChips(eng, rest) + "</div>" +
      '<div class="arc-add"><label style="font-size:.78rem;font-weight:800">Time <select id="utmeMin" style="border:1.5px solid var(--card-border,#ddd2b8);border-radius:10px;padding:8px 10px;font-family:inherit;min-height:40px;background:var(--opt-bg,#fffdf6);color:var(--ink,#1c1626)"><option value="90">90 min</option><option value="120" selected>120 min</option><option value="150">150 min</option></select></label>' +
      '<span id="utmeCount" style="font-size:.78rem;font-weight:800">0/3 subjects selected</span>' +
      '<button type="button" class="arc-btn gold" id="utmeGo">▶ Start simulation</button></div>');
    var g = $("utmeGo");
    if (g) g.onclick = function () { utmeStart(opts); };
    var box = $("utmeSubs");
    if (box) {
      Array.prototype.forEach.call(box.querySelectorAll(".arc-chip:not([data-lock])"), function (b) {
        b.onclick = function () {
          var n = box.querySelectorAll(".arc-chip.on").length - 1;
          if (b.classList.contains("on")) { b.classList.remove("on"); UPICK = UPICK.filter(function (x) { return x !== b.getAttribute("data-s"); }); }
          else if (n < 3) { b.classList.add("on"); UPICK.push(b.getAttribute("data-s")); }
          else toast("Choose exactly 3 subjects", "⚠️");
          var c = $("utmeCount"); if (c) c.textContent = UPICK.length + "/3 subjects selected";
        };
      });
    }
  }
  function utmeChips(eng, rest) {
    var h = ['<button type="button" class="arc-chip on" data-lock="1">' + esc(eng) + " <span style=\"opacity:.65\">(compulsory)</span></button>"];
    rest.forEach(function (s) { h.push('<button type="button" class="arc-chip" data-s="' + esc(s) + '">' + esc(s) + "</button>"); });
    return h.join("");
  }
  function utmeStart(opts) {
    var cls = bank(); if (!cls) { toast("The question bank is still loading — try again in a moment", "⏳"); return; }
    var subs = subjList();
    var eng = null;
    subs.forEach(function (s) { if (!eng && /english/i.test(s)) eng = s; });
    if (!eng) eng = subs[0] || "English Language";
    var picks = (opts && opts.subjects && opts.subjects.length === 4) ? opts.subjects : [eng].concat(UPICK.slice(0, 3));
    if (picks.length < 4) { toast("Pick English Language + 3 more subjects", "🎓"); return; }
    var paper = [], counts = {};
    picks.forEach(function (s) {
      var pool = [];
      cls.forEach(function (c) { (c.questions || []).forEach(function (q) { if (q.s === s) pool.push(q); }); });
      var need = /english/i.test(s) ? 60 : 40;
      var qs = shuffle(pool.slice()).slice(0, Math.min(need, pool.length));
      counts[s] = qs.length;
      qs.forEach(function (q) { paper.push({ s: s, q: q }); });
    });
    var mins = (opts && opts.secs) || ((+($("utmeMin") && $("utmeMin").value) || 120) * 60);
    UT = { subs: picks, counts: counts, paper: paper, cur: 0, ans: [], secs: mins, t0: Date.now(), over: false, switches: 0, conf: false };
    for (var i = 0; i < paper.length; i++) UT.ans.push(-1);
    M.mode = "utme";
    shell("🎓 UTME Simulation — 180 questions / timed", "" +
      '<div class="arc-hud"><span class="arc-pill arc-time" id="utClock">⏱ ' + fmtT(mins) + '</span><span class="arc-pill" id="utCount2">Answered 0/' + paper.length + '</span><span class="arc-pill">Tab switches <span id="utSw">0</span></span></div>' +
      '<div class="arc-q" id="arcQ"></div>' +
      '<div class="arc-sheet" id="utSheet"></div>' +
      '<div class="arc-actions" style="justify-content:space-between"><button type="button" class="arc-btn" id="utPrev">← Prev</button><button type="button" class="arc-btn" id="utNext">Next →</button><button type="button" class="arc-btn gold" id="utSub">✔ Submit</button></div>' +
      '<p class="arc-un" id="utUn"></p>');
    var pv = $("utPrev"), nx = $("utNext"), sb = $("utSub");
    if (pv) pv.onclick = function () { utmeNav(-1); };
    if (nx) nx.onclick = function () { utmeNav(1); };
    if (sb) sb.onclick = function () { utmeSubmit(false); };
    utmeQ();
    if (M.timer) clearInterval(M.timer);
    M.timer = setInterval(function () {
      if (!UT || UT.over) return;
      var left = Math.max(0, UT.secs - ((Date.now() - UT.t0) / 1000 | 0));
      var c = $("utClock"); if (c) c.textContent = "⏱ " + fmtT(left);
      if (left <= 0) { clearInterval(M.timer); M.timer = null; utmeSubmit(true); }
    }, 1000);
    if (typeof document.addEventListener === "function") document.addEventListener("visibilitychange", utmV);
  }
  function fmtT(s) { s = Math.max(0, s | 0); var m = s / 60 | 0, r = s % 60; return m + ":" + (r < 10 ? "0" : "") + r; }
  function utmV() {
    if (!UT || UT.over) return;
    if (typeof document.hidden !== "undefined" && document.hidden) {
      UT.switches++;
      var w2 = $("utSw"); if (w2) w2.textContent = UT.switches;
    }
  }
  function utmeQ() {
    var box = $("arcQ"); if (!box || !UT) return;
    var p = UT.paper[UT.cur];
    if (p) {
      box.innerHTML = '<div class="arc-hud"><span class="arc-pill">Q' + (UT.cur + 1) + "/" + UT.paper.length + "</span><span class=\"arc-pill\">" + esc(p.s) + "</span></div>" +
        '<div class="arc-qtext">' + esc(p.q.q) + "</div>" +
        '<div class="arc-opts">' + (p.q.o || []).map(function (o, k) {
          return '<button type="button" class="arc-opt' + (UT.ans[UT.cur] === k ? " on-arc" : "") + '" onclick="ARC.utmeSet(' + UT.cur + "," + k + ')">' + ["A", "B", "C", "D"][k] + ". " + esc(o) + "</button>";
        }).join("") + "</div>";
    } else box.innerHTML = "";
    var sheet = $("utSheet");
    if (sheet) {
      sheet.innerHTML = UT.paper.map(function (p2, i) {
        return '<button type="button" class="arc-cell' + (UT.ans[i] > -1 ? " on" : "") + (i === UT.cur ? " cur" : "") + '" onclick="ARC.utmeGrid(' + i + ')">' + (i + 1) + "</button>";
      }).join("");
    }
    var c2 = $("utCount2");
    if (c2) { var n = 0; UT.ans.forEach(function (a) { if (a > -1) n++; }); c2.textContent = "Answered " + n + "/" + UT.paper.length; }
  }
  function utmeSet(qi, oi) {
    if (!UT || UT.over || oi == null || !UT.paper[qi]) return;
    UT.ans[qi] = oi;
    utmeQ();
  }
  function utmeNav(d) { if (!UT || UT.over) return; UT.cur = Math.max(0, Math.min(UT.paper.length - 1, UT.cur + d)); utmeQ(); }
  function utmeGrid(i) { if (!UT || UT.over) return; UT.cur = Math.max(0, Math.min(UT.paper.length - 1, i)); utmeQ(); }
  function utmeTotals() {
    var per = {}, total = 0, correctAll = 0, un = 0;
    UT.ans.forEach(function (a) { if (a < 0) un++; });
    UT.subs.forEach(function (s) {
      var idx = [], n = 0, c = 0;
      UT.paper.forEach(function (p, i) { if (p.s === s) { idx.push(i); n++; } });
      idx.forEach(function (i) { if (UT.ans[i] === UT.paper[i].q.a) c++; });
      var scaled = n ? Math.round((c / n) * 100) : 0;
      per[s] = { n: n, c: c, scale: scaled };
      total += scaled; correctAll += c;
    });
    return { per: per, total: total, correctAll: correctAll, un: un };
  }
  function utmeSubmit(auto) {
    if (!UT || UT.over) return;
    var un = 0; UT.ans.forEach(function (a) { if (a < 0) un++; });
    if (un > 0 && !auto) {
      if (!UT.conf) {
        UT.conf = true;
        var u = $("utUn"); if (u) u.textContent = "⚠ " + un + " unanswered — press Submit again to finish anyway.";
        return;
      }
    }
    UT.over = true;
    if (M.timer) { clearInterval(M.timer); M.timer = null; }
    if (typeof document.removeEventListener === "function") document.removeEventListener("visibilitychange", utmV);
    var t = utmeTotals();
    var bs = bests();
    if (!bs.utme || t.total > bs.utme.best) bs.utme = { best: t.total, at: Date.now(), subs: UT.subs.slice(), per: t.per };
    store(ARC_KEY, bs);
    xp(t.correctAll * 2); coin(t.total >= 260 ? 2 : (t.total >= 200 ? 1 : 0));
    shell("🎓 UTME Simulation — Results", resultsHtml(t));
  }
  function utmeResults() {
    if (!UT || !UT.over) return;
    shell("🎓 UTME Simulation — Results", resultsHtml(utmeTotals()));
  }
  function resultsHtml(t) {
    var rows = UT.subs.map(function (s) {
      var p = t.per[s] || { n: 0, c: 0, scale: 0 };
      return '<div class="arc-pair"><b>' + esc(s) + "</b> · " + p.c + "/" + p.n + " correct → <b>" + p.scale + "/100</b>" +
        '<div class="arc-bar"><i style="width:' + p.scale + '%"></i></div></div>';
    }).join("");
    var verdict = t.total >= 300 ? "Outstanding — university-ready range" : t.total >= 250 ? "Very good — keep pushing" : t.total >= 200 ? "Fair — more drills needed" : "Keep practising — the Curriculum Hub and games will lift this";
    return '<div class="arc-q"><div class="arc-qtext">Your UTME score</div>' +
      '<div class="arc-total">' + t.total + " / 400</div>" +
      '<p style="margin:4px 0 0;font-size:.8rem;color:var(--mut,#8a7a5e)">' + t.correctAll + " correct of " + UT.paper.length + (t.un ? " · " + t.un + " unfinished" : "") + " · tab switches " + UT.switches + "</p>" +
      '<p style="margin:6px 0 0;font-size:.85rem;font-weight:800">' + verdict + "</p>" +
      '<div class="arc-pairs">' + rows + "</div>" +
      '<p class="arc-note">Simulation scoring: each subject scaled to /100, then summed (the 60-question English paper counts equally). A practice estimate, not the official JAMB scale.</p>' +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" data-a="retake">↻ Retake</button><button type="button" class="arc-btn" data-a="open">All games</button>' +
      UT.subs.map(function (s) { return '<button type="button" class="arc-btn" data-r="' + esc(s) + '">Review ' + esc(s) + "</button>"; }).join("") + "</div></div>";
  }
  function utmeReview(s) {
    if (!UT || !UT.over) return toast("Finish a simulation first", "🎓");
    var items = [];
    UT.paper.forEach(function (p, i) {
      if (p.s !== s) return;
      var q = p.q, you = UT.ans[i];
      items.push('<div class="arc-q"><div class="arc-qtext">' + esc(q.q) + "</div>" +
        '<div class="arc-opts">' + q.o.map(function (o, k) {
          return '<div class="arc-opt' + (k === q.a ? " good" : (k === you ? " bad" : " dim")) + '">' + ["A", "B", "C", "D"][k] + ". " + esc(o) + (k === q.a ? " ✔" : (k === you ? " ✘ your answer" : "")) + "</div>";
        }).join("") + "</div>" +
        (q.e ? '<blockquote style="margin:8px 0 0;font-size:.78rem;color:var(--mut,#8a7a5e)">' + esc(q.e) + "</blockquote>" : "") + "</div>");
    });
    shell("📋 Review — " + s + " (UTME)", '<div class="arc-actions"><button type="button" class="arc-btn" data-a="results">↩ Back to results</button><button type="button" class="arc-btn" data-a="open">All games</button></div>' + items.join(""));
    bindActs();
  }
  function bindActs() {
    Array.prototype.forEach.call(document.querySelectorAll("#arcBody [data-a]"), function (b) {
      b.onclick = function () {
        var a = b.getAttribute("data-a");
        if (a === "results") return utmeResults();
        if (a === "retake") return go("utme");
        return go("open");
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll("#arcBody [data-r]"), function (b) {
      b.onclick = function () { utmeReview(b.getAttribute("data-r")); };
    });
  }

  /* ---------- Flash Cards ---------- */
  var CD = null, CARDS_KEY = "nssc_cards_a";
  function cardGo(opts) {
    var subs = Object.keys(PAIRS).sort();
    var subj = (opts && opts.subj) || M.subj || subs[0];
    if (!PAIRS[subj]) subj = subs[0];
    M.subj = subj; M.mode = "cards";
    var chips = subs.map(function (s) { return '<button type="button" class="arc-chip' + (s === subj ? " on" : "") + '" data-s="' + esc(s) + '">' + esc(s) + "</button>"; }).join("");
    shell("🃏 Flash Cards — " + subj, '<div class="arc-sub" id="cardSubs">' + chips + '</div><p class="arc-note">Term → definition. Mark what you know — the deck re-queues the tricky cards first, so a deck is never finished until every card is mastered.</p><div id="arcPlay"></div>');
    var box = $("cardSubs");
    if (box) {
      Array.prototype.forEach.call(box.querySelectorAll(".arc-chip"), function (b) {
        b.onclick = function () { M.subj = b.getAttribute("data-s"); cardGo(); };
      });
    }
    cardStart(subj);
  }
  function cardSub(s) { M.subj = s; cardGo(); }
  function cardStart(subj) {
    var known = {};
    try { var k = store(CARDS_KEY); if (k && typeof k === "object" && !Array.isArray(k)) known = k; } catch (e) {}
    var kn = known[subj] || [];
    var deck = PAIRS[subj].map(function (p, i) { return { p: p, i: i, fresh: kn.indexOf(i) < 0 }; });
    deck.sort(function (a, b) { return (a.fresh ? 0 : 1) - (b.fresh ? 0 : 1); });
    CD = { subj: subj, deck: deck, i: 0, knew: 0, learn: 0, done: false };
    cardQ();
  }
  function cardQ() {
    var play = $("arcPlay"); if (!play) return;
    if (CD.i >= CD.deck.length) return cardEnd();
    var c = CD.deck[CD.i];
    play.innerHTML = '<div class="arc-hud"><span class="arc-pill">Card ' + (CD.i + 1) + "/" + CD.deck.length + '</span><span class="arc-pill">✔ ' + CD.knew + '</span><span class="arc-pill">↻ ' + CD.learn + '</span></div><div class="arc-fcard">' + esc(c.p.t) + '</div><div class="arc-actions" style="justify-content:center"><button type="button" class="arc-btn gold" id="arcFShow">👁 Show answer</button></div>';
    var sh = $("arcFShow"); if (sh) sh.onclick = cardFlip;
  }
  function cardFlip() {
    if (!CD || CD.done) return;
    var play = $("arcPlay"); if (!play) return;
    var c = CD.deck[CD.i];
    play.innerHTML = '<div class="arc-hud"><span class="arc-pill">Card ' + (CD.i + 1) + "/" + CD.deck.length + '</span><span class="arc-pill">✔ ' + CD.knew + '</span><span class="arc-pill">↻ ' + CD.learn + '</span></div><div class="arc-fcard show">' + esc(c.p.d) + '</div><div class="arc-actions" style="justify-content:center"><button type="button" class="arc-btn gold" id="arcFKnow">✔ I knew it</button><button type="button" class="arc-btn" id="arcFNo">↻ Still learning</button></div>';
    var k1 = $("arcFKnow"), k2 = $("arcFNo");
    if (k1) k1.onclick = function () { cardRate(1); };
    if (k2) k2.onclick = function () { cardRate(0); };
  }
  function cardRate(k) {
    if (!CD || CD.done) return;
    var c = CD.deck[CD.i];
    var known = {};
    try { var kv = store(CARDS_KEY); if (kv && typeof kv === "object" && !Array.isArray(kv)) known = kv; } catch (e) {}
    if (!known[CD.subj]) known[CD.subj] = [];
    var kn = known[CD.subj];
    if (k) { CD.knew++; if (kn.indexOf(c.i) < 0) kn.push(c.i); }
    else { CD.learn++; kn = kn.filter(function (x) { return x !== c.i; }); }
    known[CD.subj] = kn;
    store(CARDS_KEY, known);
    CD.i++;
    cardQ();
  }
  function cardEnd() {
    CD.done = true;
    M.best = CD.knew;
    xp(CD.knew * 5); coin(CD.knew === CD.deck.length ? 1 : 0);
    saveBest("cards");
    var play = $("arcPlay"); if (!play) return;
    play.innerHTML = '<div class="arc-q"><div class="arc-qtext">🃏 Deck done — ' + CD.knew + " of " + CD.deck.length + " knew it (" + CD.learn + " still learning)</div>" +
      '<p style="font-size:.78rem;color:var(--mut,#8a7a5e);margin:0 0 10px">' + (CD.learn ? "Those " + CD.learn + " cards are re-queued first next time." : "Perfect — replay this deck the day before your test.") + "</p>" +
      '<div class="arc-actions"><button type="button" class="arc-btn gold" id="arcFRe">↻ Replay deck</button><button type="button" class="arc-btn" data-a="open">All games</button></div></div>';
    var re = $("arcFRe"); if (re) re.onclick = function () { cardStart(CD.subj); };
    bindActs();
  }

  /* ---------- Video Studio ---------- */
  function vidRoute() {
    M.mode = "videos";
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) custom = [];
    var all = VIDEOS.concat(custom);
    var subs = [];
    all.forEach(function (v) { if (v.s && subs.indexOf(v.s) < 0) subs.push(v.s); });
    subs.sort();
    var chips = ['<button type="button" class="arc-chip on" id="vidAll">All subjects</button>']
      .concat(subs.map(function (s) { return '<button type="button" class="arc-chip" data-s="' + esc(s) + '">' + esc(s) + "</button>"; })).join("");
    shell("🎬 Video Studio — lessons on demand", "" +
      '<div class="arc-sub" id="vidChips">' + chips + "</div>" +
      '<div class="arc-add"><input id="vidUrl" placeholder="Paste a YouTube link (watch?v=…, youtu.be/…)" aria-label="Video link"><input id="vidTitle" placeholder="Video title" aria-label="Video title"><button type="button" class="arc-btn" onclick="ARC.addVideo()" id="vidAdd">＋ Add video</button></div>' +
      '<p class="arc-note">Videos stream online (the app saves your list but not the video). Offline? The quiz games and lesson notes still work — videos need internet. Miss your class\'s videos? Paste a link above and they are saved on this device.</p>' +
      '<div id="vidList">' + vidList(all, "") + "</div>" +
      '<h4 style="margin:16px 0 8px;font-size:.95rem">📺 Trusted Nigerian lesson channels</h4>' +
      '<div class="arc-pairs">' + CHANNELS.map(function (c) {
        return '<div class="arc-pair"><b>' + esc(c.t) + "</b> — " + esc(c.d) + ' <a href="' + esc(c.u) + '" target="_blank" rel="noopener" style="color:#8a6d1f;font-weight:800">Open channel ↗</a></div>';
      }).join("") + "</div>");
    var chipsEl = $("vidChips");
    if (chipsEl) {
      Array.prototype.forEach.call(chipsEl.querySelectorAll(".arc-chip"), function (b) {
        b.onclick = function () {
          Array.prototype.forEach.call(chipsEl.querySelectorAll(".arc-chip"), function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          var s = b.getAttribute("data-s") || "";
          $("vidList").innerHTML = vidList(all, s);
        };
      });
    }
  }
  function vidList(all, s) {
    var list = all.filter(function (v) { return !s || v.s === s; });
    if (!list.length) return '<p class="arc-note">No videos in this subject yet — add one above or choose another subject.</p>';
    return list.map(function (v) {
      return '<div class="arc-vid">' +
        (M.nowPlaying === v.id ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.id) + '?autoplay=1" title="' + esc(v.t) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' : "") +
        '<h4>' + esc(v.t) + "</h4><small>" + esc(v.s) + " · " + esc(v.c) + " · " + esc(v.ch || "You") + "</small><div style=\"margin-top:8px\">" +
        '<button type="button" class="arc-play" onclick="ARC.watch(\'' + esc(v.id) + '\')">▶ Watch</button>' +
        (v.user ? '<button type="button" class="arc-btn" style="min-height:34px;padding:4px 12px" onclick="ARC.delVideo(\'' + esc(v.id) + '\')">Remove</button>' : "") +
        "</div></div>";
    }).join("");
  }
  function watch(id) { M.nowPlaying = id; vidRoute(); }
  function youtubeId(url) {
    var m = String(url || "").match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/);
    return m ? m[1] : null;
  }
  function addVideo() {
    var u = $("vidUrl"), t = $("vidTitle");
    var id = youtubeId(u && u.value);
    if (!id) return toast("That does not look like a YouTube link", "⚠️");
    var title = (t && t.value.trim()) || "My video";
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) custom = [];
    custom = custom.filter(function (v) { return v.id !== id; });
    custom.unshift({ t: title, s: "My videos", c: "SS1–SS3", id: id, ch: "You", user: 1 });
    store(CUSTOM_VID, custom);
    toast("Video saved to your list", "🎬");
    vidRoute();
  }
  function delVideo(id) {
    var custom = store(CUSTOM_VID); if (!Array.isArray(custom)) return;
    custom = custom.filter(function (v) { return v.id !== id; });
    store(CUSTOM_VID, custom);
    vidRoute();
  }

  /* ---------- Curriculum Hub ---------- */
  function hubRoute() {
    M.mode = "hub";
    var subs = Object.keys(PAIRS).sort();
    shell("🗺 Curriculum Hub — every SS1–SS3 subject", "" +
      '<p style="font-size:.8rem;color:var(--mut,#8a7a5e);margin:0 0 10px">All ' + subs.length + ' subjects of the Senior Secondary curriculum with lesson notes, worked examples and evaluation questions — tap a subject to open its lesson notes in the Teaching Suite.</p>' +
      '<div class="arc-grid">' + subs.map(function (s) {
        return '<button type="button" class="arc-tile" onclick="ARC.lesson(\'' + esc(s).replace(/'/g, "\\'") + '\')"><span>📘</span><b>' + esc(s) + "</b><small>Lesson notes · worked examples · evaluation</small></button>";
      }).join("") + "</div>");
  }
  function lesson(s) {
    try {
      if (window.EDU && EDU.ready) { EDU.subject(s); EDU.go("notes"); close(); return; }
      if (window.edu) { edu("notes"); setTimeout(function () { try { EDU.subject(s); EDU.go("notes"); } catch (e) {} }, 600); close(); return; }
    } catch (e) {}
    toast("Lesson notes are loading — tap the Teaching Suite button", "📘");
  }

  /* ---------- boot ---------- */
  var CSSID = "arcCss";
  try {
    if (!$("arcCss")) { var st = document.createElement("style"); st.id = CSSID; st.textContent = CSS; document.head.appendChild(st); }
  } catch (e) {}

  window.ARC = {
    ready: true,
    go: go,
    close: close,
    pick: pick, rpick: rpick, flip: flip, lpick: lpick,
    termSub: termSub, memoSub: memoSub, rapidSub: function (s) { M.subj = s || null; rapidGo(); },
    utmeStart: utmeStart, utmeSet: utmeSet, utmeNav: utmeNav, utmeGrid: utmeGrid,
    utmeSubmit: utmeSubmit, utmeReview: utmeReview, utmeResults: utmeResults,
    cardSub: cardSub, cardFlip: cardFlip, cardRate: cardRate,
    cardRestart: function () { if (CD && CD.subj) cardStart(CD.subj); },
    _ut: function () { return UT; }, _cd: function () { return CD; },
    watch: watch, addVideo: addVideo, delVideo: delVideo,
    lesson: lesson,
    _state: function () { return M; }
  };
  window.ARC.ready = true;
})();
