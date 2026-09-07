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
