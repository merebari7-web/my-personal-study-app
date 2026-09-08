import { LessonNote } from '../types';

export const ADDITIONAL_LESSON_NOTES: LessonNote[] = [
  // 10. SSS 2 Biology - 1st Term Week 1
  {
    id: 'ss2-bio-t1-w1',
    topicId: 'bio-ss-t1-w1',
    subjectId: 'biology-ss',
    subjectName: 'Biology',
    level: 'senior_secondary',
    className: 'SSS 2',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '3rd & 4th Period',
    topic: 'Cellular Respiration & Energy Transformations in Living Organisms',
    subtopics: [
      'Definition of Cellular Aerobic and Anaerobic Respiration',
      'Glycolysis, Krebs (Citric Acid) Cycle, and Electron Transport Chain',
      'Role of ATP (Adenosine Triphosphate) as the Energy Currency of Life',
      'Fermentation in Nigerian Food Processing (Cassava/Garri, Palm Wine, Ogi/Akamu)'
    ],
    nerdcCode: 'NERDC-BIO-SS2-T1-W01',
    bloomLevel: 'Analysis & Biochemical Understanding',
    behavioralObjectives: [
      'Differentiate between external breathing and internal cellular respiration.',
      'Write the balanced summary chemical equation for aerobic cellular respiration.',
      'Outline the three main stages of cellular respiration: Glycolysis, Krebs Cycle, and Oxidative Phosphorylation.',
      'Explain how anaerobic fermentation is utilized locally in Nigeria to produce garri, fufu, and fermented drinks.'
    ],
    previousKnowledge: 'Students understand cell structure, mitochondria, and digestive nutrition from SSS 1 Biology.',
    instructionalMaterials: [
      'Mitochondrion structural 3D chart',
      'Yeast suspension with glucose solution and delivery tube into lime water (CO2 test)',
      'Diagram of ATP/ADP energy phosphorylation cycle'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Bioenergetics (10 mins)',
        teacherActivity: 'Asks students: "Why do athletes and footballers pant heavily during a match in the National Stadium?" Explains that muscles demand rapid conversion of glucose and oxygen into ATP energy molecules.',
        learnerActivity: 'Identify glucose as food substrate and describe energy release during exercise.',
        content: 'Respiration is the catabolic biochemical process by which organic food molecules (primarily glucose) are broken down inside living cells to release usable metabolic energy in the form of ATP.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Aerobic Respiration Stages (25 mins)',
        teacherActivity: 'Breaks down the 3 distinct phases on the board:\n1. Glycolysis (in cytoplasm, produces 2 ATP + 2 Pyruvate, anaerobic).\n2. Krebs Cycle (in mitochondrial matrix, produces NADH, FADH2, CO2).\n3. Electron Transport System (in inner mitochondrial cristae, produces ~32-34 ATP). Total net yield = 36-38 ATP per glucose.',
        learnerActivity: 'Draw schematic diagram of mitochondrion and annotate ATP synthesis sites.',
        content: 'Equation: C6H12O6 + 6O2 -> 6CO2 + 6H2O + 38 ATP.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Anaerobic Respiration & Local Fermentation (25 mins)',
        teacherActivity: 'Demonstrates yeast fermentation generating carbon dioxide (turns lime water milky) and ethanol. Explains lactic acid fermentation in human muscles causing fatigue/cramps.',
        learnerActivity: 'List Nigerian fermented foods (Ogiri, Dawadawa, Iru, Garri, Palm wine) driven by anaerobic microorganisms.',
        content: 'In yeast: C6H12O6 -> 2 C2H5OH (Ethanol) + 2 CO2 + 2 ATP.\nIn animal muscle: C6H12O6 -> 2 Lactic Acid + 2 ATP.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Summary & Evaluation (20 mins)',
        teacherActivity: 'Administers quick evaluation oral questions and sets homework.',
        learnerActivity: 'Answer questions and write down homework assignment.',
        content: 'Summary: Aerobic respiration yields 38 ATP with oxygen. Anaerobic yields only 2 ATP without oxygen.'
      }
    ],
    workedExamples: [
      {
        title: 'Comparison: Aerobic vs Anaerobic Respiration (WAEC Standard)',
        problem: 'Tabulate 4 structural and biochemical differences between Aerobic and Anaerobic Respiration.',
        solution: 'Feature | Aerobic Respiration | Anaerobic Respiration\n1. Oxygen requirement: Requires molecular O2 | Occurs in absence of O2\n2. Site of reaction: Cytoplasm & Mitochondria | Cytoplasm only\n3. End products: Carbon dioxide & Water (CO2 + H2O) | Ethanol & CO2 (plants/yeast) or Lactic Acid (animals)\n4. Energy yield: High yield (36 - 38 ATP per glucose) | Low yield (2 ATP per glucose)\n5. Completeness of breakdown: Complete breakdown of glucose | Incomplete/Partial breakdown.',
        explanation: 'This 5-mark comparison table appears frequently in WAEC Biology Paper 2 Theory.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Yeast Respiration Lab Observation',
        type: 'Practical Demonstration',
        instructions: 'Observe the bubbling in the conical flask containing yeast and warm sugar solution. Verify that the gas bubbled through test tube containing lime water turns it milky (proving CO2 emission).',
        timeAllocation: '12 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. State the precise site of the Krebs cycle inside the eukaryotic cell.',
      '2. Why is ATP referred to as the universal energy currency of the cell?',
      '3. Write the chemical equation for alcoholic fermentation in yeast.'
    ],
    assignment: 'WAEC Biology Past Question: (a) What is oxygen debt? (b) Describe an experiment to demonstrate that germinating bean seeds produce heat during respiration.',
    summaryNotes: 'Cellular respiration releases metabolic energy. Aerobic: Glycolysis -> Krebs Cycle -> Electron Transport Chain (38 ATP). Anaerobic: Fermentation (2 ATP). Mitochondria cristae drive oxidative phosphorylation.',
    referenceBooks: ['Modern Biology for Senior Secondary Schools (Sarojini T. Ramalingam)', 'College Biology (Idodo Umeh)'],
    status: 'published',
    author: 'Dr. (Mrs.) Folashade Ajayi (Ph.D. Biology Ed)',
    authorRole: 'Head of Biological Sciences',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-bio-ss2-01',
        subject: 'Biology',
        className: 'SSS 2',
        term: '1st Term',
        question: 'How many net ATP molecules are produced during the anaerobic glycolysis stage of respiration?',
        options: ['2 ATP', '4 ATP', '36 ATP', '38 ATP'],
        correctIndex: 0,
        explanation: 'Glycolysis yields 4 ATP gross, but consumes 2 ATP, resulting in a net gain of 2 ATP per glucose molecule.',
        difficulty: 'Medium',
        examStandard: 'WAEC'
      }
    ]
  },

  // 11. SSS 1 Economics - 1st Term Week 1
  {
    id: 'ss1-eco-t1-w1',
    topicId: 'eco-ss-t1-w1',
    subjectId: 'economics-ss',
    subjectName: 'Economics',
    level: 'senior_secondary',
    className: 'SSS 1',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    topic: 'Basic Concepts of Economics: Scarcity, Choice, Scale of Preference, and Opportunity Cost',
    subtopics: [
      'Definitions of Economics (Adam Smith, Alfred Marshall, Lionel Robbins)',
      'The Core Concepts: Wants, Scarcity, Choice, Scale of Preference',
      'Opportunity Cost (Real Cost vs Money Cost)',
      'The Production Possibility Frontier (PPF Curve)'
    ],
    nerdcCode: 'NERDC-ECO-SS1-T1-W01',
    bloomLevel: 'Comprehension & Economic Analysis',
    behavioralObjectives: [
      'State Lionel Robbins\' acclaimed 1932 definition of economics.',
      'Explain the relationship between human unlimited wants and scarce economic resources.',
      'Construct a realistic personal scale of preference for a secondary school student.',
      'Distinguish clearly between money cost and opportunity cost with Nigerian market examples.'
    ],
    previousKnowledge: 'Learners understand buying and selling in local markets (e.g. Balogun, Ariaria, Bodija, Wuse) from JSS 3 Business Studies.',
    instructionalMaterials: [
      'Scale of Preference demonstration chart',
      'Sample Nigerian budget extract showing sectoral allocations',
      'Production Possibility Curve graphical display'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: What is Economics? (15 mins)',
        teacherActivity: 'Hands a student ₦5,000 mock cash. Asks: "You want a pair of school shoes (₦5,000), a textbook (₦3,500), and a scientific calculator (₦4,000). Can you buy all three?" Introduces scarcity and choice.',
        learnerActivity: 'Realize that ₦5,000 is insufficient for all three wants; rank desires in order of priority.',
        content: 'Lionel Robbins (1932): "Economics is the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses."'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Scarcity vs Choice & Scale of Preference (20 mins)',
        teacherActivity: 'Defines Scale of Preference as a list of unsatisfied wants arranged in descending order of relative importance or urgency.',
        learnerActivity: 'Draft a personal scale of preference with items ranked 1 to 5.',
        content: 'Scarcity forces Choice. Making a Choice requires a Scale of Preference to maximize satisfaction (Utility).'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Opportunity Cost (Real Cost) (25 mins)',
        teacherActivity: 'Defines Opportunity Cost as the alternative forgone or sacrificed when a choice is made. Illustrates: If a farmer in Benue State uses 5 hectares of land to plant Yam instead of Cassava, the opportunity cost of planting Yam is the Cassava sacrificed.',
        learnerActivity: 'Differentiate Money Cost (amount paid in Naira) from Opportunity Cost (the next best item surrendered).',
        content: 'Opportunity cost is the true economic cost of any decision.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Summary & Class Evaluation (20 mins)',
        teacherActivity: 'Assesses concepts through interactive oral drill and gives take-home essay.',
        learnerActivity: 'Participate actively and write homework.',
        content: 'Summary: Ends are unlimited; resources are scarce. Scale of preference guides rational choice. Opportunity cost is the sacrificed alternative.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Scale of Preference & Opportunity Cost Scenario',
        problem: 'A student has ₦2,000 and needs: (1) Mathematics Textbook = ₦2,000, (2) School Bag = ₦2,000, (3) Pair of Sandals = ₦1,800. He buys the textbook. What is the money cost and what is the opportunity cost?',
        solution: '1. Money Cost = ₦2,000 (the physical currency spent).\n2. Opportunity Cost = The School Bag (the next most important unsatisfied alternative item forgone).\n\nExplanation: Money cost is the financial outlay, whereas opportunity cost is the sacrificed real item.',
        explanation: 'Do not list all other items as opportunity cost; opportunity cost refers strictly to the best single alternative surrendered.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Budgeting & Opportunity Cost Simulation',
        type: 'Pair Work',
        instructions: 'Given a government development budget of ₦50 Million, prioritize between: (A) Constructing a Primary Health Center, (B) Tarring Community Feeder Road, (C) Building Solar Borehole. State your choice and the resulting opportunity cost.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. State Lionel Robbins\' definition of Economics.',
      '2. Why is a scale of preference necessary in daily economic decisions?',
      '3. Differentiate between money cost and opportunity cost.'
    ],
    assignment: '1. Explain 4 reasons why the study of economics is important to the Nigerian government. 2. A consumer wants items A, B, C, D in order of priority costing ₦1000 each, but has only ₦2000. Identify the items chosen and the opportunity cost.',
    summaryNotes: 'Economics studies human allocation of scarce resources among unlimited wants. Basic concepts: Scarcity, Choice, Scale of Preference, Opportunity Cost. Lionel Robbins emphasized scarce means with alternative uses.',
    referenceBooks: ['Comprehensive Economics for Senior Secondary Schools (J.U. Anyaele)', 'Essential Economics for SSS (C.E. Ande)'],
    status: 'published',
    author: 'Mr. Babatunde Fashola (M.Sc. Economics)',
    authorRole: 'Head of Department - Commercial Studies',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-eco-ss1-01',
        subject: 'Economics',
        className: 'SSS 1',
        term: '1st Term',
        question: 'The definition of Economics as "the science which studies human behaviour as a relationship between ends and scarce means which have alternative uses" was given by:',
        options: ['Lionel Robbins', 'Adam Smith', 'David Ricardo', 'John Maynard Keynes'],
        correctIndex: 0,
        explanation: 'Professor Lionel Robbins propounded this acclaimed scientific definition in his 1932 essay.',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      }
    ]
  },

  // 12. JSS 2 Basic Science - 1st Term Week 1
  {
    id: 'js2-sci-t1-w1',
    topicId: 'sci-js-t1-w1',
    subjectId: 'basic-science-jss',
    subjectName: 'Basic Science',
    level: 'junior_secondary',
    className: 'JSS 2',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '2nd & 3rd Period',
    topic: 'Living Things: Habitat, Ecology, and Adaptive Features',
    subtopics: [
      'Definition of Habitat (Aquatic, Terrestrial, Arboreal)',
      'Adaptive Features of Animals in Water (Fish, Tadpoles, Frogs)',
      'Adaptive Features of Plants in Arid/Savanna Regions (Cactus, Acacia, Baobab)',
      'Ecological Zones in Nigeria (Rainforest, Guinea Savanna, Sahel Savanna, Mangrove Swamp)'
    ],
    nerdcCode: 'NERDC-BSC-JS2-T1-W01',
    bloomLevel: 'Comprehension and Application',
    behavioralObjectives: [
      'Define habitat and classify habitats into 3 main types with 2 examples each.',
      'Identify 4 structural adaptations of a tilapia fish for aquatic life.',
      'Explain how xerophytic plants (such as cactus and desert grasses) conserve water in Northern Nigeria.',
      'Match major Nigerian states with their ecological zones (e.g. Sokoto in Sahel; Bayelsa in Mangrove).'
    ],
    previousKnowledge: 'Learners understand basic differences between plants and animals from JSS 1 Basic Science.',
    instructionalMaterials: [
      'Fresh specimen / model of a Tilapia fish showing fins, operculum, scales, and lateral line',
      'Potted Cactus plant showing spines and succulent stem',
      'Map of Nigeria showing ecological vegetation zones'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Habitats (15 mins)',
        teacherActivity: 'Shows pictures of a camel in Kano and a mangrove crab in Port Harcourt. Asks: "Why can\'t a camel survive naturally in a deep river or a fish survive on dry land?" Explains the concept of Habitat and Adaptation.',
        learnerActivity: 'Describe the natural homes of various Nigerian animals (lion in Yankari, crocodile in River Niger).',
        content: 'Habitat is the specific natural environment where an organism lives, feeds, reproduces, and thrives.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Aquatic Adaptations (Tilapia Fish) (25 mins)',
        teacherActivity: 'Passes around the fish specimen. Highlights: Streamlined body shape (cuts through water resistance), Fins (balance and propulsion), Gills covered by operculum (gaseous exchange), Swim bladder (buoyancy), Lateral line (detects vibrations).',
        learnerActivity: 'Sketch and label a fish showing the adaptive structures in workbooks.',
        content: 'Adaptation is any structural, physiological, or behavioral modification that enhances survival.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Terrestrial & Arid Plant Adaptations (20 mins)',
        teacherActivity: 'Examines cactus spines (modified leaves to minimize transpiration) and thick succulent stems (store water). Explains deep tap roots of savanna trees reaching water tables.',
        learnerActivity: 'Touch the waxy cuticle of plant leaves and compare with cactus spines.',
        content: 'Hydrophytes live in water (Water hyacinth); Xerophytes live in dry deserts (Cactus); Mesophytes live in moderate land (Maize, Yam).'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Summary & Evaluation (20 mins)',
        teacherActivity: 'Reviews key concepts and administers quick evaluation.',
        learnerActivity: 'Complete quick-check questions and write assignment.',
        content: 'Summary: Organisms are uniquely adapted to their specific habitats. Aquatic animals have gills and streamlined bodies; desert plants reduce leaf surface area.'
      }
    ],
    workedExamples: [
      {
        title: 'Adaptation Summary Table (BECE Exam Standard)',
        problem: 'List 4 adaptations of a freshwater fish and state the function of each structure.',
        solution: '1. Streamlined spindle shape = Minimizes water friction during swimming.\n2. Filamentous Gills = Extracts dissolved oxygen from water for respiration.\n3. Mucus-coated overlapping scales = Waterproof protection and smooth gliding.\n4. Lateral Line System = Detects vibrations, water currents, and pressure changes in water.',
        explanation: 'Always state both the anatomical structure and its precise biological survival function.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Specimen Anatomy Identification',
        type: 'Pair Work',
        instructions: 'Work in pairs with the tilapia fish diagram. Label: Dorsal fin, Pectoral fin, Pelvic fin, Caudal fin, Operculum, and Lateral line.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. Define the term Habitat with two examples.',
      '2. State two functions of the lateral line on a fish.',
      '3. Why are leaves of desert plants modified into sharp thorns or spines?'
    ],
    assignment: '1. Describe 3 adaptive features of a Toad for life both on land and in water. 2. Draw and neatly label a tilapia fish in your science practical workbook.',
    summaryNotes: 'Habitat is an organism\'s natural home (Aquatic, Terrestrial, Arboreal). Structural adaptations enable organisms to feed, breathe, move, and reproduce successfully in their environment.',
    referenceBooks: ['STAN Basic Science for Junior Secondary Schools Book 2', 'NERDC Universal Basic Education Science Syllabus'],
    status: 'published',
    author: 'Mrs. Abigail Okon (B.Sc. Ed Biology)',
    authorRole: 'Junior Science Coordinator',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-bsc-js2-01',
        subject: 'Basic Science',
        className: 'JSS 2',
        term: '1st Term',
        question: 'Which of the following organs enables a fish to detect sound vibrations and water current changes?',
        options: ['Lateral line', 'Operculum', 'Pectoral fin', 'Swim bladder'],
        correctIndex: 0,
        explanation: 'The lateral line is a sensory system along the sides of a fish that senses water movement and pressure gradients.',
        difficulty: 'Easy',
        examStandard: 'BECE'
      }
    ]
  }
];
