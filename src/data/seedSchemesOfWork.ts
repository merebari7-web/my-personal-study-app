import { SchemeOfWork, ClassLevel, Term } from '../types';

export const SEED_SCHEMES_OF_WORK: SchemeOfWork[] = [
  // SSS 1 General Mathematics - 1st Term
  {
    id: 'sow-ss1-math-t1',
    subjectId: 'maths-ss',
    subjectName: 'General Mathematics',
    className: 'SSS 1',
    term: '1st Term',
    academicSession: '2026/2027 Academic Session',
    weeks: [
      {
        week: 1,
        topic: 'Number Bases (I)',
        subtopics: ['Concept of place values in non-decimal bases', 'Conversion from Base 10 to other bases (2, 5, 8, 16)', 'Conversion from other bases to Base 10'],
        behavioralObjectives: ['Convert denary numbers to binary, octal, and base 5', 'Convert numbers in any base to base 10 using expansion'],
        instructionalMaterials: ['Place value chart', 'Binary flashcards', 'Abacus'],
        teacherActivities: 'Demonstrates repeated division and expansion methods on board.',
        learnerActivities: 'Practice conversions in pairs on workbooks.',
        evaluation: 'Short quiz: Convert 95_10 to Base 2 and 11011_2 to Base 10.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 2,
        topic: 'Number Bases (II) - Operations & Equations',
        subtopics: ['Addition and subtraction in base 2, 5, 8', 'Multiplication in base 2', 'Solving equations involving unknown bases'],
        behavioralObjectives: ['Perform addition and subtraction in binary and base 5', 'Find the value of unknown base in algebraic equations'],
        instructionalMaterials: ['Multiplication grid for base 2 and base 5', 'Sample WAEC past questions'],
        teacherActivities: 'Guides solving equations with unknown base x.',
        learnerActivities: 'Solve given base equations in groups.',
        evaluation: 'Solve for x if 32_x = 17_10.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 3,
        topic: 'Modular Arithmetic',
        subtopics: ['Concept of cyclic numbers', 'Addition, subtraction, and multiplication in modulo systems', 'Application to calendar days and clock arithmetic'],
        behavioralObjectives: ['Compute operations in modulo 2, 5, 7, 12', 'Relate modulo arithmetic to real-world cyclic phenomena'],
        instructionalMaterials: ['12-hour clock face', '7-day week wheel'],
        teacherActivities: 'Illustrates with clock arithmetic (10 o\'clock + 5 hours = 3 o\'clock in mod 12).',
        learnerActivities: 'Calculate day of the week after 100 days using modulo 7.',
        evaluation: 'Evaluate (24 + 19) (mod 5).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 4,
        topic: 'Indices (Laws & Applications)',
        subtopics: ['Laws of indices (multiplication, division, power, zero, negative, fractional)', 'Simplification of algebraic expressions involving indices', 'Exponential equations'],
        behavioralObjectives: ['State and apply all 6 laws of indices', 'Solve simple exponential equations'],
        instructionalMaterials: ['Laws of indices summary chart'],
        teacherActivities: 'Proves laws of indices and solves exponential equations.',
        learnerActivities: 'Simplify complex fractional index expressions.',
        evaluation: 'Solve: 2^(2x-1) = 32.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 5,
        topic: 'Logarithms of Numbers > 1',
        subtopics: ['Standard form A × 10^n (1 ≤ A < 10)', 'Logarithms and antilogarithms using four-figure tables', 'Calculations involving multiplication, division, powers, and roots'],
        behavioralObjectives: ['Convert numbers to standard form and read 4-figure tables', 'Use log tables for multi-step calculations'],
        instructionalMaterials: ['Four-figure logarithm tables', 'Scientific calculators'],
        teacherActivities: 'Demonstrates reading characteristics and mantissa from tables.',
        learnerActivities: 'Calculate 34.56 × 0.892 using log tables.',
        evaluation: 'Evaluate √(45.8 / 3.21) using logarithm table.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 6,
        topic: 'Sets & Set Theory (I)',
        subtopics: ['Definition and notation of sets', 'Types of sets (universal, empty, finite, infinite, subset)', 'Set operations (union, intersection, complement)'],
        behavioralObjectives: ['Represent sets in roster and set-builder notation', 'Find union, intersection, and complement of sets'],
        instructionalMaterials: ['Set diagrams and colored sorting rings'],
        teacherActivities: 'Draws Venn diagrams illustrating union and intersection.',
        learnerActivities: 'Shade Venn diagrams corresponding to (A ∩ B)\'.',
        evaluation: 'Given U = {1..10}, A={primes}, B={odds}, find A\' ∩ B.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 7,
        topic: 'MID-TERM BREAK & CONTINUOUS ASSESSMENT TEST (CAT)',
        subtopics: ['Revision of Weeks 1-6', 'Mid-Term Examination (CBT & Theory)', 'Open Day and Academic Progress Review'],
        behavioralObjectives: ['Demonstrate mastery of topics covered in Weeks 1 to 6'],
        instructionalMaterials: ['CBT Exam Portal', 'Printed test question papers'],
        teacherActivities: 'Administers mid-term tests and reviews answers.',
        learnerActivities: 'Take mid-term examinations and evaluate score reports.',
        evaluation: 'Mid-term Assessment Test (30 marks).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 8,
        topic: 'Sets & Set Theory (II) - Venn Diagrams (2 & 3 Sets)',
        subtopics: ['Two-set and three-set Venn diagrams', 'Cardinals and inclusion-exclusion principle', 'Word problems involving sets in school and commercial contexts'],
        behavioralObjectives: ['Formulate and solve two-set and three-set Venn diagram problems', 'Determine number of elements in intersections and complements'],
        instructionalMaterials: ['Venn diagram worksheets with Nigerian school survey data'],
        teacherActivities: 'Guides solving 3-set problem on students offering Physics, Chem, Bio.',
        learnerActivities: 'Work in groups on survey word problems.',
        evaluation: 'Solve: In a class of 45 students, 28 take Maths, 20 take Physics, 8 take both. How many take neither?',
        period: 'Double Period (80 mins)'
      },
      {
        week: 9,
        topic: 'Simple Equations and Variations (Direct & Inverse)',
        subtopics: ['Linear equations with fractions and brackets', 'Direct variation (y ∝ x => y = kx)', 'Inverse variation (y ∝ 1/x => y = k/x)'],
        behavioralObjectives: ['Solve multi-step linear equations', 'Establish formulas connecting directly and inversely varying quantities'],
        instructionalMaterials: ['Variation graphs and proportionality charts'],
        teacherActivities: 'Explains variation constant k with real examples (distance vs time; speed vs travel time).',
        learnerActivities: 'Calculate unknown constant k and find required values.',
        evaluation: 'If y varies inversely as x, and y = 12 when x = 3, find y when x = 9.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 10,
        topic: 'Joint and Partial Variations',
        subtopics: ['Joint variation (z ∝ xy)', 'Partial variation (y = a + bx or y = ax + b/x)', 'Practical word problems from economics and engineering'],
        behavioralObjectives: ['Model joint and partial variations algebraically', 'Solve simultaneous equations resulting from partial variation data'],
        instructionalMaterials: ['Sample electric bill and taxi fare rate calculation charts'],
        teacherActivities: 'Demonstrates solving partial variation (e.g. Total cost = Fixed cost + Variable cost).',
        learnerActivities: 'Form equations and solve for unknown constants.',
        evaluation: 'WAEC question on partial variation.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 11,
        topic: 'Revision of 1st Term Syllabus',
        subtopics: ['Comprehensive review of all 10 topics', 'WAEC & SSCE past examination question drill', 'Remedial tutoring and mock CBT exam'],
        behavioralObjectives: ['Recall and synthesize all 1st term mathematical concepts', 'Improve speed and accuracy on WAEC-type questions'],
        instructionalMaterials: ['Comprehensive 1st Term Past Question Booklets'],
        teacherActivities: 'Facilitates revision workshop and addresses difficult questions.',
        learnerActivities: 'Solve timed past question sets individually.',
        evaluation: 'End of term mock CBT quiz (40 questions).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 12,
        topic: 'FIRST TERM EXAMINATION & RECORDING',
        subtopics: ['Terminal Examination (Paper 1 Multiple Choice & Paper 2 Theory)', 'Marking, grading, and computation of terminal report sheets'],
        behavioralObjectives: ['Demonstrate comprehensive learning achievement for 1st Term'],
        instructionalMaterials: ['Official examination scripts and question papers'],
        teacherActivities: 'Invigilates and grades examinations according to WAEC rubric.',
        learnerActivities: 'Write formal end-of-term examinations.',
        evaluation: 'First Term Examination (70% + 30% CA = 100%).',
        period: 'Examination Week'
      }
    ]
  },

  // SSS 1 General Mathematics - 2nd Term
  {
    id: 'sow-ss1-math-t2',
    subjectId: 'maths-ss',
    subjectName: 'General Mathematics',
    className: 'SSS 1',
    term: '2nd Term',
    academicSession: '2026/2027 Academic Session',
    weeks: [
      {
        week: 1,
        topic: 'Quadratic Equations (I) - Factorisation Method',
        subtopics: ['Standard form ax² + bx + c = 0', 'Factorising quadratic trinomials', 'Zero-product principle', 'Forming equations from roots'],
        behavioralObjectives: ['Identify quadratic equations and factorise trinomials', 'Solve quadratic equations by zero-product property'],
        instructionalMaterials: ['Algebra tiles', 'Quadratic formula charts'],
        teacherActivities: 'Demonstrates product-sum method and grouping.',
        learnerActivities: 'Solve given trinomials in notebooks.',
        evaluation: 'Solve 2x² - 5x - 3 = 0.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 2,
        topic: 'Quadratic Equations (II) - Completing the Square & Formula Method',
        subtopics: ['Making quadratic expression a perfect square', 'Derivation of quadratic formula x = (-b ± √(b² - 4ac)) / 2a', 'Discriminant analysis (b² - 4ac)'],
        behavioralObjectives: ['Solve quadratics by completing the square', 'Use the almighty formula to solve quadratic equations'],
        instructionalMaterials: ['Formula derivation chart'],
        teacherActivities: 'Derives the quadratic formula from ax² + bx + c = 0 step by step.',
        learnerActivities: 'Apply formula to equations with non-integer roots.',
        evaluation: 'Solve 3x² - 7x + 1 = 0 correct to 2 decimal places.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 3,
        topic: 'Logical Reasoning (Simple & Compound Statements)',
        subtopics: ['Propositions and truth values', 'Negation (~p), Conjunction (p ∧ q), Disjunction (p ∨ q)', 'Conditional (p → q) and Biconditional (p ↔ q) statements', 'Truth tables'],
        behavioralObjectives: ['Construct truth tables for compound statements', 'Identify tautologies and contradictions'],
        instructionalMaterials: ['Truth table template charts'],
        teacherActivities: 'Explains logical connectives with real-life statements.',
        learnerActivities: 'Construct 4-row truth tables for ~(p ∧ q) and ~p ∨ ~q.',
        evaluation: 'Draw truth table for (p → q) ∧ p.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 4,
        topic: 'Geometry of Lines and Angles',
        subtopics: ['Parallel lines and transversals (alternate, corresponding, interior angles)', 'Angle properties of triangles and polygons', 'Sum of interior angles (n - 2) × 180°'],
        behavioralObjectives: ['Calculate unknown angles using parallel line theorems', 'Determine interior and exterior angles of regular n-sided polygons'],
        instructionalMaterials: ['Geometrical instruments (protractor, set squares)', 'Polygon models'],
        teacherActivities: 'Demonstrates angle proofs on whiteboard.',
        learnerActivities: 'Calculate number of sides of polygon with interior angle 150°.',
        evaluation: 'Find interior angle sum of a decagon (10 sides).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 5,
        topic: 'Circle Geometry (Basic Theorems)',
        subtopics: ['Parts of a circle (radius, chord, segment, sector)', 'Angle subtended at the centre is twice angle at circumference', 'Angle in a semicircle is 90°', 'Angles in the same segment are equal'],
        behavioralObjectives: ['State and apply first 3 circle theorems', 'Solve rider problems involving inscribed angles'],
        instructionalMaterials: ['Circle theorem model kit with movable string chords'],
        teacherActivities: 'Demonstrates angle subtended at centre with dynamic geometry.',
        learnerActivities: 'Measure and verify subtended angles on diagram sheets.',
        evaluation: 'Solve for angle x in given circle with centre O.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 6,
        topic: 'Cyclic Quadrilaterals & Tangent Theorems',
        subtopics: ['Opposite angles of a cyclic quadrilateral sum to 180°', 'Exterior angle of a cyclic quadrilateral equals opposite interior angle', 'Radius is perpendicular to tangent at point of contact', 'Lengths of tangents from external point are equal'],
        behavioralObjectives: ['Solve geometrical riders involving cyclic quads and tangents', 'Apply alternate segment theorem'],
        instructionalMaterials: ['Circle tangent chart', 'WAEC geometry past questions'],
        teacherActivities: 'Guides step-by-step geometric proof.',
        learnerActivities: 'Solve WAEC circle geometry rider questions.',
        evaluation: 'Calculate unknown angles in cyclic quadrilateral ABCD.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 7,
        topic: 'MID-TERM BREAK & CONTINUOUS ASSESSMENT TEST (CAT)',
        subtopics: ['Revision of Weeks 1-6', 'Mid-Term Examination (CBT & Theory)', 'Open Day and Parent-Teacher Consultations'],
        behavioralObjectives: ['Assess mid-term learning mastery'],
        instructionalMaterials: ['CBT Assessment portal'],
        teacherActivities: 'Administers mid-term tests and reviews results.',
        learnerActivities: 'Complete mid-term assessment and reflect on weak areas.',
        evaluation: 'Mid-term Assessment Test (30 marks).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 8,
        topic: 'Trigonometric Ratios (I) - SOH CAH TOA',
        subtopics: ['Definitions of Sine, Cosine, Tangent in right-angled triangles', 'Trigonometric values for special angles (30°, 45°, 60°)', 'Solving right-angled triangles'],
        behavioralObjectives: ['Calculate sides and angles using SOH CAH TOA', 'State exact surd values of sin 30°, cos 60°, tan 45°'],
        instructionalMaterials: ['Special angle surd triangles (30-60-90 and 45-45-90)'],
        teacherActivities: 'Derives exact values from equilateral and isosceles triangles.',
        learnerActivities: 'Calculate exact trig expressions without calculator.',
        evaluation: 'Evaluate: sin 60° × cos 30° + sin 30° × cos 60°.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 9,
        topic: 'Angles of Elevation and Depression',
        subtopics: ['Angle of elevation (looking up)', 'Angle of depression (looking down)', 'Measuring heights of towers, trees, masts', 'Horizontal distances'],
        behavioralObjectives: ['Translate real-world word problems into right-angled triangles', 'Calculate heights and distances using tangent and sine'],
        instructionalMaterials: ['Clinometer apparatus', 'Surveying diagrams'],
        teacherActivities: 'Demonstrates clinometer use in the school field.',
        learnerActivities: 'Solve word problems with clear diagrams.',
        evaluation: 'A mast casts a shadow 25m long when elevation is 60°. Find mast height.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 10,
        topic: 'Mensuration of Plane Shapes (Perimeter & Area)',
        subtopics: ['Perimeter and area of triangles, rectangles, parallelograms, trapeziums, rhombuses', 'Area of sector and segment of a circle', 'Length of an arc: (θ/360) × 2πr'],
        behavioralObjectives: ['Calculate arc lengths, sector perimeters, and sector areas', 'Find area of combined composite plane figures'],
        instructionalMaterials: ['Sector and segment visual models'],
        teacherActivities: 'Illustrates cutting sectors from paper circles.',
        learnerActivities: 'Calculate perimeter of a sector with angle 120° and radius 7cm.',
        evaluation: 'Find area of shaded segment of a circle.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 11,
        topic: 'Revision & Mock Examination',
        subtopics: ['Comprehensive review of 2nd term topics', 'Problem-solving clinic and SSCE past questions drill'],
        behavioralObjectives: ['Consolidate all 2nd term mathematical formulas and theorems'],
        instructionalMaterials: ['WAEC mock question packs'],
        teacherActivities: 'Provides targeted remedial coaching on difficult concepts.',
        learnerActivities: 'Attempt full-length past exam papers.',
        evaluation: 'Mock CBT test.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 12,
        topic: 'SECOND TERM EXAMINATION & RECORDING',
        subtopics: ['Terminal examinations, marking, collation of scores, and academic report preparation'],
        behavioralObjectives: ['Demonstrate 2nd Term overall mastery'],
        instructionalMaterials: ['Examination papers and scripts'],
        teacherActivities: 'Conducts examinations and computes terminal continuous assessments.',
        learnerActivities: 'Sit for examinations.',
        evaluation: 'Second Term Examination (100 marks total).',
        period: 'Examination Week'
      }
    ]
  },

  // SSS 2 English Language - 1st Term
  {
    id: 'sow-ss2-eng-t1',
    subjectId: 'english-ss',
    subjectName: 'English Language',
    className: 'SSS 2',
    term: '1st Term',
    academicSession: '2026/2027 Academic Session',
    weeks: [
      {
        week: 1,
        topic: 'Lexis: Vocabulary of the Legal System & Formal Letters',
        subtopics: ['Legal register: plaintiff, defendant, verdict, bail, jurisprudence', 'Two-address formal letter layout for government agencies'],
        behavioralObjectives: ['Use 10 legal terms correctly in context', 'Format formal petition letter to local government authority'],
        instructionalMaterials: ['Legal brief extracts', 'WAEC formal letter marking rubric'],
        teacherActivities: 'Guides drafting of formal letter with proper salutation and subscription.',
        learnerActivities: 'Write a formal letter appealing for road repairs.',
        evaluation: 'Essay assignment: Formal letter to the Minister of Health.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 2,
        topic: 'Grammar: Noun Clauses and Their Grammatical Functions',
        subtopics: ['Definition of noun clause', 'Identification in sentences', 'Functions: Subject of verb, Object of verb, Subject complement, Object of preposition'],
        behavioralObjectives: ['Identify noun clauses in complex sentences', 'State the specific grammatical function of underlined noun clauses'],
        instructionalMaterials: ['Grammar clause analysis chart'],
        teacherActivities: 'Demonstrates clause replacement with pronouns ("What he said was true" => "It was true").',
        learnerActivities: 'Analyze 10 sentences and state clause functions.',
        evaluation: 'Identify the clause and state function: "I know that she will pass the exam."',
        period: 'Double Period (80 mins)'
      },
      {
        week: 3,
        topic: 'Oral English: Vowel Contrasts (/i:/ vs /ɪ/, /æ/ vs /ɑ:/, /ɔ:/ vs /ɒ/)',
        subtopics: ['Monophthongs classification', 'Minimal pair drills: sheep/ship, heart/hat, port/pot', 'Identifying vowel sounds in SSCE multiple choice questions'],
        behavioralObjectives: ['Pronounce vowel contrasts accurately', 'Identify identical vowel phonemes across words'],
        instructionalMaterials: ['IPA phonetics chart', 'Audio pronunciation files'],
        teacherActivities: 'Models mouth shape and vocal tract positioning.',
        learnerActivities: 'Repeat minimal pairs and complete phonetic matching worksheet.',
        evaluation: 'Choose word with same vowel sound as "seat": (a) sit (b) key (c) set.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 4,
        topic: 'Continuous Writing: Article for Publication in National Dailies',
        subtopics: ['Features of newspaper article (Captivating Title, Byline, Body paragraphs, Conclusion)', 'Writing tone: Objective, analytical, persuasive', 'Topic: Curbing Cybercrime (Yahoo-Yahoo) among Nigerian Youths'],
        behavioralObjectives: ['Structure an article for publication with title and byline', 'Develop cohesive paragraphs with logical transitions'],
        instructionalMaterials: ['Selected editorial pages from The Guardian and Punch newspapers'],
        teacherActivities: 'Analyzes award-winning published student articles.',
        learnerActivities: 'Draft outline and write introductory paragraph with hook.',
        evaluation: 'Write article of 400 words on "The Menace of Out-of-School Children in Nigeria".',
        period: 'Double Period (80 mins)'
      },
      {
        week: 5,
        topic: 'Reading Comprehension & Summary Skills (I)',
        subtopics: ['Skimming for main ideas vs Scanning for specific facts', 'Identifying topic sentences in paragraphs', 'Eliminating extraneous details, examples, and repetitions in summary writing'],
        behavioralObjectives: ['Identify topic sentences in given passages', 'Summarize a 400-word text into three distinct points in one sentence each'],
        instructionalMaterials: ['WAEC past summary passages'],
        teacherActivities: 'Demonstrates crossing out illustrations to isolate core assertions.',
        learnerActivities: 'Summarize causes of desertification in Northern Nigeria.',
        evaluation: 'Write a two-sentence summary of the selected passage.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 6,
        topic: 'Grammar: Adjectival Clauses & Relative Pronouns',
        subtopics: ['Relative pronouns: who, whom, whose, which, that', 'Defining vs Non-defining relative clauses', 'Punctuation of relative clauses with commas'],
        behavioralObjectives: ['Form complex sentences using relative pronouns', 'Punctuate non-restrictive relative clauses correctly'],
        instructionalMaterials: ['Sentence combination worksheets'],
        teacherActivities: 'Explains difference between restrictive and non-restrictive clauses.',
        learnerActivities: 'Combine pairs of simple sentences into one using relative clauses.',
        evaluation: 'Combine: "The boy won the prize. His father is a doctor."',
        period: 'Double Period (80 mins)'
      },
      {
        week: 7,
        topic: 'MID-TERM BREAK & CONTINUOUS ASSESSMENT TEST (CAT)',
        subtopics: ['Mid-Term evaluation covering lexis, grammar, oral English, and continuous writing'],
        behavioralObjectives: ['Demonstrate mastery in English Language mid-term exams'],
        instructionalMaterials: ['Assessment question papers & CBT interface'],
        teacherActivities: 'Administers mid-term examination and reviews answers.',
        learnerActivities: 'Take mid-term exam.',
        evaluation: 'Mid-term test (30 marks).',
        period: 'Double Period (80 mins)'
      },
      {
        week: 8,
        topic: 'Lexis: Vocabulary of Agriculture, Ecology, and Climate Change',
        subtopics: ['Terms: Silo, deforestation, erosion, crop rotation, afforestation, greenhouse effect, biodiversity', 'Synonyms and antonyms in context'],
        behavioralObjectives: ['Use 10 environmental and agricultural terms in sentences', 'Select appropriate antonyms in context'],
        instructionalMaterials: ['Agricultural science glossary and news articles on flooding in Nigeria'],
        teacherActivities: 'Explains specialized agricultural terminology.',
        learnerActivities: 'Complete vocabulary replacement exercise.',
        evaluation: 'Replace underlined words with closest in meaning.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 9,
        topic: 'Continuous Writing: Speech Writing (Farewell, Campaign, Assembly)',
        subtopics: ['Audience awareness and register', 'Protocols and salutations to dignitaries', 'Body development with rhetorical devices', 'Inspiring conclusion'],
        behavioralObjectives: ['Format and write an inspiring presidential campaign speech for Senior Prefect'],
        instructionalMaterials: ['Sample speeches of Nigerian historical leaders (Nnamdi Azikiwe, Tafawa Balewa)'],
        teacherActivities: 'Demonstrates oratorical devices: rhetorical questions, repetition, triplets.',
        learnerActivities: 'Deliver 2-minute speech presentation in front of class.',
        evaluation: 'Write speech of 400 words on "Why I should be elected Head Boy/Girl".',
        period: 'Double Period (80 mins)'
      },
      {
        week: 10,
        topic: 'Grammar: Complex Concord (Rules of Agreement)',
        subtopics: ['Subject-Verb agreement with: neither...nor, either...or, as well as, accompanied by, more than one, collective nouns, each/every'],
        behavioralObjectives: ['Apply 8 advanced concord rules accurately', 'Detect and correct subject-verb agreement errors'],
        instructionalMaterials: ['Concord rule summary cards'],
        teacherActivities: 'Explains proximity rule vs true subject rule.',
        learnerActivities: 'Choose correct verb form for 15 tricky sentences.',
        evaluation: 'Select correct option: "Neither the teacher nor the students (was/were) present."',
        period: 'Double Period (80 mins)'
      },
      {
        week: 11,
        topic: 'Revision of 1st Term Topics & WAEC Mock Essay',
        subtopics: ['Revision of summary writing, comprehension, lexis, and grammar', 'Timed essay writing rehearsal'],
        behavioralObjectives: ['Synthesize English language skills under timed exam conditions'],
        instructionalMaterials: ['WAEC mock question packs'],
        teacherActivities: 'Conducts essay feedback and corrections.',
        learnerActivities: 'Write timed essay and peer-review marking.',
        evaluation: 'Complete WAEC Section A Essay in 50 minutes.',
        period: 'Double Period (80 mins)'
      },
      {
        week: 12,
        topic: 'FIRST TERM EXAMINATION & RECORDING',
        subtopics: ['First Term Exam: Paper 1 (Objective & Lexis/Structure), Paper 2 (Essay & Summary), Paper 3 (Test of Orals)'],
        behavioralObjectives: ['Achieve high standard in terminal English examinations'],
        instructionalMaterials: ['Official exam booklets'],
        teacherActivities: 'Invigilates and grades according to WAEC SSCE marking criteria.',
        learnerActivities: 'Complete terminal examination.',
        evaluation: 'First Term Examination (100% total).',
        period: 'Examination Week'
      }
    ]
  }
];
