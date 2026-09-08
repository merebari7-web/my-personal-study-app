import { CBTQuestion } from '../types';

export const ALL_CBT_QUESTIONS: CBTQuestion[] = [
  // Mathematics SSS
  {
    id: 'cbt-mth-01',
    subject: 'General Mathematics',
    className: 'SSS 1',
    term: '1st Term',
    question: 'Convert the binary number 110101_2 to decimal (Base 10).',
    options: ['49', '51', '53', '55'],
    correctIndex: 2,
    explanation: '110101_2 = (1×32) + (1×16) + (0×8) + (1×4) + (0×2) + (1×1) = 32 + 16 + 4 + 1 = 53.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-mth-02',
    subject: 'General Mathematics',
    className: 'SSS 1',
    term: '1st Term',
    question: 'If 23_x = 11_10, what is the value of base x?',
    options: ['4', '5', '6', '7'],
    correctIndex: 0,
    explanation: '2x + 3 = 11 => 2x = 8 => x = 4.',
    difficulty: 'Easy',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-mth-03',
    subject: 'General Mathematics',
    className: 'SSS 1',
    term: '2nd Term',
    question: 'Find the roots of the equation 2x² + 7x + 3 = 0.',
    options: ['x = -3 or x = -1/2', 'x = 3 or x = 1/2', 'x = -3 or x = 1/2', 'x = 3 or x = -1/2'],
    correctIndex: 0,
    explanation: '2x² + 6x + x + 3 = 0 => 2x(x + 3) + 1(x + 3) = 0 => (2x + 1)(x + 3) = 0 => x = -1/2 or x = -3.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-mth-04',
    subject: 'General Mathematics',
    className: 'SSS 1',
    term: '3rd Term',
    question: 'A vertical pole 12m high casts a shadow 12√3 m long on the horizontal ground. Find the angle of elevation of the sun.',
    options: ['30°', '45°', '60°', '90°'],
    correctIndex: 0,
    explanation: 'tan θ = 12 / (12√3) = 1 / √3 => θ = 30°.',
    difficulty: 'Medium',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-mth-05',
    subject: 'General Mathematics',
    className: 'SSS 2',
    term: '1st Term',
    question: 'Evaluate log₁₀ 25 + log₁₀ 4 without using mathematical tables.',
    options: ['1', '2', '3', '10'],
    correctIndex: 1,
    explanation: 'log₁₀ 25 + log₁₀ 4 = log₁₀ (25 × 4) = log₁₀ 100 = 2.',
    difficulty: 'Easy',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-mth-06',
    subject: 'General Mathematics',
    className: 'SSS 2',
    term: '2nd Term',
    question: 'In a class of 40 students, 25 offer Physics, 20 offer Chemistry, and 5 offer neither. How many offer both subjects?',
    options: ['10', '12', '15', '8'],
    correctIndex: 0,
    explanation: 'Total = n(P) + n(C) - n(P ∩ C) + n(neither) => 40 = 25 + 20 - x + 5 => 40 = 50 - x => x = 10.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },

  // English Language SSS
  {
    id: 'cbt-eng-01',
    subject: 'English Language',
    className: 'SSS 2',
    term: '1st Term',
    question: 'In legal terminology, the person or party who initiates a lawsuit against another in a civil court is the:',
    options: ['Plaintiff', 'Defendant', 'Bailiff', 'Prosecutor'],
    correctIndex: 0,
    explanation: 'A plaintiff is the individual or entity who files a formal complaint or lawsuit in civil litigation.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-eng-02',
    subject: 'English Language',
    className: 'SSS 2',
    term: '1st Term',
    question: 'Neither the principal nor the teachers _______ present at the emergency briefing yesterday.',
    options: ['was', 'were', 'is', 'are'],
    correctIndex: 1,
    explanation: 'When subjects are joined by "neither...nor", the verb agrees with the closer subject ("teachers", which is plural => "were").',
    difficulty: 'Medium',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-eng-03',
    subject: 'English Language',
    className: 'SSS 1',
    term: '2nd Term',
    question: 'Identify the word that has the same vowel sound as the underlined sound in "cl<u>e</u>rk":',
    options: ['Dark', 'Dusk', 'Dock', 'Deck'],
    correctIndex: 0,
    explanation: 'In standard British/West African English, "clerk" is pronounced /klɑ:k/, sharing the /ɑ:/ sound with "dark" /dɑ:k/.',
    difficulty: 'Hard',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-eng-04',
    subject: 'English Language',
    className: 'SSS 3',
    term: '1st Term',
    question: 'The committee members could not agree on the proposal because their opinions were at _______ with each other.',
    options: ['variance', 'random', 'disposal', 'liberty'],
    correctIndex: 0,
    explanation: '"At variance with" is the standard idiomatic expression meaning in disagreement or conflict.',
    difficulty: 'Medium',
    examStandard: 'JAMB/UTME'
  },

  // Physics SSS
  {
    id: 'cbt-phy-01',
    subject: 'Physics',
    className: 'SSS 2',
    term: '1st Term',
    question: 'A body starts from rest and accelerates uniformly at 4 m/s² for 5 seconds. What is the distance covered?',
    options: ['20 m', '40 m', '50 m', '100 m'],
    correctIndex: 2,
    explanation: 's = ut + 1/2 at² => s = 0(5) + 1/2(4)(5²) = 1/2(4)(25) = 50 meters.',
    difficulty: 'Easy',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-phy-02',
    subject: 'Physics',
    className: 'SSS 2',
    term: '2nd Term',
    question: 'Which of the following processes does NOT require a material medium for heat transfer?',
    options: ['Conduction', 'Convection', 'Radiation', 'Advection'],
    correctIndex: 2,
    explanation: 'Thermal radiation propagates via electromagnetic waves and travels through vacuum (e.g. solar heat reaching Earth).',
    difficulty: 'Easy',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-phy-03',
    subject: 'Physics',
    className: 'SSS 3',
    term: '1st Term',
    question: 'An electric kettle rated 2000 W is connected to a 240 V AC supply. What is the current drawn by the kettle?',
    options: ['0.12 A', '8.33 A', '12.0 A', '48.0 A'],
    correctIndex: 1,
    explanation: 'P = IV => I = P / V = 2000 / 240 = 8.33 Amperes.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },

  // Chemistry SSS
  {
    id: 'cbt-chm-01',
    subject: 'Chemistry',
    className: 'SSS 1',
    term: '1st Term',
    question: 'An atom has 19 protons, 20 neutrons, and 19 electrons. What is its mass number (A)?',
    options: ['19', '20', '39', '58'],
    correctIndex: 2,
    explanation: 'Mass Number A = Protons + Neutrons = 19 + 20 = 39 (Potassium-39).',
    difficulty: 'Easy',
    examStandard: 'WAEC'
  },
  {
    id: 'cbt-chm-02',
    subject: 'Chemistry',
    className: 'SSS 2',
    term: '2nd Term',
    question: 'Which type of chemical bond involves the transfer of electrons from a metallic atom to a non-metallic atom?',
    options: ['Covalent bond', 'Electrovalent (Ionic) bond', 'Dative bond', 'Metallic bond'],
    correctIndex: 1,
    explanation: 'Electrovalent / Ionic bonding occurs when metals donate valence electrons to non-metals, forming oppositely charged ions.',
    difficulty: 'Easy',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-chm-03',
    subject: 'Chemistry',
    className: 'SSS 3',
    term: '1st Term',
    question: 'What is the oxidation number of sulfur in the sulfate ion (SO₄²⁻)?',
    options: ['+4', '+6', '-2', '+2'],
    correctIndex: 1,
    explanation: 'S + 4(-2) = -2 => S - 8 = -2 => S = +6.',
    difficulty: 'Medium',
    examStandard: 'WAEC'
  },

  // Biology SSS
  {
    id: 'cbt-bio-01',
    subject: 'Biology',
    className: 'SSS 2',
    term: '1st Term',
    question: 'Which of the following cell organelles is known as the site of cellular aerobic respiration and ATP synthesis?',
    options: ['Ribosome', 'Mitochondrion', 'Golgi apparatus', 'Lysosome'],
    correctIndex: 1,
    explanation: 'Mitochondria are the powerhouses of the cell where the Krebs cycle and oxidative phosphorylation produce ATP.',
    difficulty: 'Easy',
    examStandard: 'JAMB/UTME'
  },
  {
    id: 'cbt-bio-02',
    subject: 'Biology',
    className: 'SSS 3',
    term: '2nd Term',
    question: 'In human ABO blood group genetics, an individual with blood genotype I^A I^B exhibits:',
    options: ['Complete dominance', 'Codominance', 'Incomplete dominance', 'Epistasis'],
    correctIndex: 1,
    explanation: 'Both alleles A and B are fully expressed in the phenotype, giving blood group AB (Codominance).',
    difficulty: 'Medium',
    examStandard: 'JAMB/UTME'
  },

  // Junior Secondary (JSS) Questions
  {
    id: 'cbt-jss-01',
    subject: 'Mathematics (Basic 7-9)',
    className: 'JSS 2',
    term: '1st Term',
    question: 'Simplify the algebraic expression: 3(2x - 4) - 2(x - 5).',
    options: ['4x - 2', '4x - 22', '4x + 2', '5x - 2'],
    correctIndex: 0,
    explanation: '3(2x - 4) - 2(x - 5) = 6x - 12 - 2x + 10 = (6x - 2x) + (-12 + 10) = 4x - 2.',
    difficulty: 'Medium',
    examStandard: 'BECE'
  },
  {
    id: 'cbt-jss-02',
    subject: 'Basic Science',
    className: 'JSS 1',
    term: '1st Term',
    question: 'Which of the following is an example of a renewable source of energy in Nigeria?',
    options: ['Crude oil', 'Coal', 'Solar energy', 'Natural gas'],
    correctIndex: 2,
    explanation: 'Solar energy from the sun is inexhaustible and renewable, unlike fossil fuels (crude oil, coal, gas).',
    difficulty: 'Easy',
    examStandard: 'BECE'
  },
  {
    id: 'cbt-jss-03',
    subject: 'Basic Technology',
    className: 'JSS 3',
    term: '1st Term',
    question: 'Which drawing instrument is used in technical drawing to draw accurate horizontal lines across a drawing board?',
    options: ['T-Square', 'Protractor', 'French Curve', 'Compass'],
    correctIndex: 0,
    explanation: 'A T-square has a stock that aligns along the edge of the board to draw precise horizontal parallel lines.',
    difficulty: 'Easy',
    examStandard: 'BECE'
  },

  // Primary (Basic 1 - 6) Questions
  {
    id: 'cbt-pri-01',
    subject: 'Basic Mathematics',
    className: 'Basic 5',
    term: '1st Term',
    question: 'What is 45% written as a fraction in its lowest term?',
    options: ['45/100', '9/20', '4/5', '9/10'],
    correctIndex: 1,
    explanation: '45/100 divided by 5/5 = 9/20.',
    difficulty: 'Easy',
    examStandard: 'National Common Entrance'
  },
  {
    id: 'cbt-pri-02',
    subject: 'Social Studies & Civic Education',
    className: 'Basic 5',
    term: '1st Term',
    question: 'At which Nigerian city do Rivers Niger and Benue meet (confluence)?',
    options: ['Lagos', 'Lokoja', 'Abuja', 'Port Harcourt'],
    correctIndex: 1,
    explanation: 'Lokoja, Kogi State is the historic confluence city where River Niger and River Benue merge.',
    difficulty: 'Easy',
    examStandard: 'National Common Entrance'
  },
  {
    id: 'cbt-pri-03',
    subject: 'Basic Science & Technology (BST)',
    className: 'Basic 4',
    term: '1st Term',
    question: 'Which part of a green flowering plant is primarily responsible for absorbing water and dissolved mineral salts from the soil?',
    options: ['Leaves', 'Roots', 'Stem', 'Flowers'],
    correctIndex: 1,
    explanation: 'Roots anchor the plant and absorb water and essential mineral salts through root hair cells.',
    difficulty: 'Easy',
    examStandard: 'National Common Entrance'
  }
];
