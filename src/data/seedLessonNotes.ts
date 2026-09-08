import { LessonNote } from '../types';

export const SEED_LESSON_NOTES: LessonNote[] = [
  // 1. SSS 1 General Mathematics - 1st Term Week 1
  {
    id: 'ss1-math-t1-w1',
    topicId: 'math-ss-t1-w1',
    subjectId: 'maths-ss',
    subjectName: 'General Mathematics',
    level: 'senior_secondary',
    className: 'SSS 1',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    topic: 'Number Bases: Conversion from Base 10 to Other Bases and Vice Versa',
    subtopics: [
      'Concept of Place Value in Non-Decimal Bases',
      'Conversion of Base 10 Integers to Base 2 (Binary), Base 8 (Octal), and Base 16 (Hexadecimal)',
      'Conversion of Non-Base 10 Numbers to Base 10 via Expansion',
      'Conversion between Two Non-Base 10 Systems'
    ],
    nerdcCode: 'NERDC-MTH-SS1-T1-W01',
    bloomLevel: 'Application and Analysis',
    behavioralObjectives: [
      'Define what a number base represents and explain why digital computing relies on Base 2 (Binary).',
      'Convert base 10 whole numbers accurately to base 2, 8, and 5 using the repeated division method.',
      'Convert binary, octal, and base 5 numbers to base 10 using place value expansion method.',
      'Perform conversion between two different non-decimal bases (e.g., Base 4 to Base 7 via Base 10 bridge).'
    ],
    previousKnowledge: 'Students are familiar with Base 10 (Denary) arithmetic, place values (Units, Tens, Hundreds), and basic long division with remainders from JSS 3 Basic Mathematics.',
    instructionalMaterials: [
      'Number base conversion chart showing powers of 2, 8, and 10',
      'Binary flashcards and counting beads/abacus',
      'Chalkboard / Whiteboard with multi-colored markers',
      'Scientific calculator (for verification only)'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Introduction & Hook (5 mins)',
        teacherActivity: 'Displays a computer microchip and asks students: "How do smartphones and computers process bank transactions or text messages if they only understand on/off electric switches?" Explains that all digital logic is built on Base 2 (Binary: 0 and 1).',
        learnerActivity: 'Observe the visual aid, respond with ideas on binary switches, and relate Base 10 (fingers/toes counting) to machine codes.',
        content: 'Number base systems define how quantities are grouped. Denary (Base 10) uses digits 0–9. Binary (Base 2) uses digits 0 and 1. Octal (Base 8) uses digits 0–7. A number in base n cannot contain any digit equal to or greater than n.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Conversion from Base 10 to Base n (Successive Division Method) (25 mins)',
        teacherActivity: 'Demonstrates on the board the successive division technique: Divide the decimal number continuously by the target base, writing down the integer quotient and the remainder, until quotient is 0. Read remainders from bottom to top.',
        learnerActivity: 'Follow the board steps, write the successive divisions in notebooks, and practice converting 45_10 to Base 2 and Base 5.',
        content: 'To convert 75_10 to Base 2:\n75 / 2 = 37 R 1\n37 / 2 = 18 R 1\n18 / 2 = 9 R 0\n9 / 2 = 4 R 1\n4 / 2 = 2 R 0\n2 / 2 = 1 R 0\n1 / 2 = 0 R 1\nReading from bottom to top: 75_10 = 1001011_2.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Conversion from Base n to Base 10 (Expansion Method) (25 mins)',
        teacherActivity: 'Explains the expansion rule: Assign powers of the base starting from 0 on the extreme right digit (units place) and increasing leftwards. Multiply each digit by the base raised to its place power and sum them.',
        learnerActivity: 'Assign powers 0, 1, 2... above each digit in 110101_2 and calculate the denary equivalent.',
        content: 'Convert 110101_2 to Base 10:\n= (1 × 2^5) + (1 × 2^4) + (0 × 2^3) + (1 × 2^2) + (0 × 2^1) + (1 × 2^0)\n= 32 + 16 + 0 + 4 + 0 + 1 = 53_10.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Guided Group Practice & Base-to-Base Bridge (15 mins)',
        teacherActivity: 'Presents a two-step challenge: Convert 324_5 to Base 8. Guides learners to first convert 324_5 to Base 10, then convert that Base 10 result to Base 8.',
        learnerActivity: 'Work in pairs: Student A calculates Base 10 conversion, Student B executes Base 8 division. Compare and verify results.',
        content: 'Bridge Rule: Never convert directly from Base a to Base b (unless powers of 2); always convert Base a -> Base 10 -> Base b.'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Evaluation & Summary (10 mins)',
        teacherActivity: 'Administers quick evaluation oral questions and sets homework assignment.',
        learnerActivity: 'Answer rapid-fire questions, record homework in their notes.',
        content: 'Summary: Base indicates group size. Successive division converts Base 10 to Base n. Expansion with powers converts Base n to Base 10.'
      }
    ],
    workedExamples: [
      {
        title: 'Example 1: Decimal to Binary & Octal',
        problem: 'Convert 156_10 to: (a) Binary (Base 2), (b) Octal (Base 8).',
        solution: '(a) Binary conversion:\n156 / 2 = 78 R 0\n78 / 2 = 39 R 0\n39 / 2 = 19 R 1\n19 / 2 = 9 R 1\n9 / 2 = 4 R 1\n4 / 2 = 2 R 0\n2 / 2 = 1 R 0\n1 / 2 = 0 R 1\nReading from bottom to top: 156_10 = 10011100_2.\n\n(b) Octal conversion:\n156 / 8 = 19 R 4\n19 / 8 = 2 R 3\n2 / 8 = 0 R 2\nReading from bottom to top: 156_10 = 234_8.',
        explanation: 'Notice that in octal (Base 8), each group of 3 binary digits maps directly: 010 (2) 011 (3) 100 (4) = 234_8.'
      },
      {
        title: 'Example 2: Unknown Base Equation (WAEC Standard)',
        problem: 'If 23_x + 101_2 = 130_4, find the value of x.',
        solution: 'Step 1: Convert all terms to Base 10:\n23_x = (2 × x^1) + (3 × x^0) = 2x + 3\n101_2 = (1 × 2^2) + (0 × 2^1) + (1 × 2^0) = 4 + 0 + 1 = 5\n130_4 = (1 × 4^2) + (3 × 4^1) + (0 × 4^0) = 16 + 12 + 0 = 28\n\nStep 2: Form algebraic equation in Base 10:\n(2x + 3) + 5 = 28\n2x + 8 = 28\n2x = 28 - 8\n2x = 20\nx = 10\n\nTherefore, the unknown base x is 10.',
        explanation: 'Always express every side of the equation in denary (Base 10) before solving algebraically.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Pair Activity: Computer Memory Bit Coding',
        type: 'Pair Work',
        instructions: 'Given that an 8-bit byte holds values from 0 to 255 in Base 10, determine the binary and hexadecimal representations for the numbers: 64, 127, and 200. Check your partner\'s working.',
        timeAllocation: '8 Minutes'
      },
      {
        taskTitle: 'Class Challenge: Number Base Decryption',
        type: 'Individual',
        instructions: 'Solve: If 110_k = 42_10, calculate the integer value of base k.',
        timeAllocation: '5 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. What is the maximum single digit allowed in Base 7?',
      '2. Convert 89_10 to Base 2.',
      '3. Convert 101101_2 to Base 10.',
      '4. If 43_n = 27_10, determine the value of n.'
    ],
    assignment: 'WAEC Past Questions Practice: \n1. Convert 413_5 to Base 8.\n2. Given that 312_4 + 201_3 = y_10, find y.\n3. Solve for x if 123_x = 38_10.',
    summaryNotes: 'Number base indicates grouping size. Denary = Base 10, Binary = Base 2, Octal = Base 8, Hexadecimal = Base 16. To convert from Base 10 to any Base n: divide repeatedly by n and write remainders in reverse order. To convert from Base n to Base 10: multiply each digit by n raised to its place position from right to left (0, 1, 2...).',
    teacherGuideNotes: 'Ensure students do not write digits equal to or greater than the base (e.g. 35_4 is invalid because digit 5 > base 4). Emphasize writing remainders from bottom to top.',
    referenceBooks: [
      'New General Mathematics for Senior Secondary Schools Book 1 (M.F. Macrae et al.) - Chapter 1',
      'NERDC National Curriculum for Senior Secondary Schools - Mathematics',
      'Essential Mathematics for Senior Secondary Schools 1 (O.A. Oluwasanmi)'
    ],
    status: 'published',
    author: 'Mr. Emmanuel Adeyemi (B.Sc. Ed Maths)',
    authorRole: 'Senior Mathematics Master & WAEC Examiner',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-mth-ss1-01',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '1st Term',
        question: 'What is the value of the binary number 11011_2 in denary (Base 10)?',
        options: ['25', '27', '29', '31'],
        correctIndex: 1,
        explanation: '11011_2 = (1×2^4) + (1×2^3) + (0×2^2) + (1×2^1) + (1×2^0) = 16 + 8 + 0 + 2 + 1 = 27.',
        difficulty: 'Medium',
        examStandard: 'WAEC'
      },
      {
        id: 'cb-mth-ss1-02',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '1st Term',
        question: 'Convert 53_10 to a number in base 2.',
        options: ['110101_2', '110111_2', '101101_2', '111001_2'],
        correctIndex: 0,
        explanation: '53/2 = 26 R 1; 26/2 = 13 R 0; 13/2 = 6 R 1; 6/2 = 3 R 0; 3/2 = 1 R 1; 1/2 = 0 R 1. Bottom to top: 110101_2.',
        difficulty: 'Medium',
        examStandard: 'JAMB/UTME'
      },
      {
        id: 'cb-mth-ss1-03',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '1st Term',
        question: 'If 212_3 = x_10, what is the value of x?',
        options: ['17', '23', '25', '29'],
        correctIndex: 1,
        explanation: '212_3 = (2×3^2) + (1×3^1) + (2×3^0) = (2×9) + 3 + 2 = 18 + 3 + 2 = 23.',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      }
    ]
  },

  // 2. SSS 1 General Mathematics - 2nd Term Week 1
  {
    id: 'ss1-math-t2-w1',
    topicId: 'math-ss-t2-w1',
    subjectId: 'maths-ss',
    subjectName: 'General Mathematics',
    level: 'senior_secondary',
    className: 'SSS 1',
    term: '2nd Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '3rd & 4th Period',
    topic: 'Quadratic Equations: Factorisation Method & Perfect Squares',
    subtopics: [
      'Standard Form of Quadratic Equations (ax² + bx + c = 0)',
      'Factorisation of Trinomials with a = 1 and a > 1',
      'The Zero Product Principle (if A × B = 0, then A = 0 or B = 0)',
      'Forming Quadratic Equations from Given Roots'
    ],
    nerdcCode: 'NERDC-MTH-SS1-T2-W01',
    bloomLevel: 'Application & Problem Solving',
    behavioralObjectives: [
      'Identify quadratic expressions and rearrange quadratic equations into the standard form ax² + bx + c = 0.',
      'Factorise quadratic expressions by finding product-sum pairs.',
      'Solve quadratic equations by applying the zero-product property.',
      'Form a quadratic equation whose roots are given as α and β using x² - (α + β)x + αβ = 0.'
    ],
    previousKnowledge: 'Students can expand binomial expressions such as (x + 3)(x - 4) and factorise linear binomials by grouping.',
    instructionalMaterials: [
      'Algebra tiles showing x², x, and unit constant blocks',
      'Quadratic equation formula chart',
      'Grid whiteboard for graphical intuition'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Second-Degree Polynomials (10 mins)',
        teacherActivity: 'Throws a tennis ball in an arc trajectory. Explains that the path of projectile motion in physics and the area of farm fields follow quadratic relationships of the form ax² + bx + c = 0 where a ≠ 0.',
        learnerActivity: 'Observe projectile curve, state the highest power of x in quadratic equations (degree 2).',
        content: 'A quadratic equation is an equation of the second degree. Standard form: ax² + bx + c = 0, where a, b, and c are real numbers and a ≠ 0.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Factorisation Method (25 mins)',
        teacherActivity: 'Guides students through the Product-Sum rule: For ax² + bx + c, find two numbers p and q such that p × q = a × c and p + q = b. Split the middle term and factor by grouping.',
        learnerActivity: 'Calculate product and sum pairs for given expressions: x² + 7x + 12 and 2x² + 5x - 3.',
        content: 'For 2x² + 5x - 3 = 0:\nProduct = 2 × (-3) = -6\nSum = +5\nFactors: +6 and -1\nSplit middle term: 2x² + 6x - x - 3 = 0\nGrouping: 2x(x + 3) - 1(x + 3) = 0\n(2x - 1)(x + 3) = 0\nRoots: x = 1/2 or x = -3.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Forming Equations from Roots (20 mins)',
        teacherActivity: 'Derives the root-formation formula: (x - α)(x - β) = 0 => x² - (sum of roots)x + (product of roots) = 0.',
        learnerActivity: 'Construct equations when roots are given as 3 and -5; 1/2 and -2/3.',
        content: 'If roots are α and β, the equation is: x² - (α + β)x + αβ = 0.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Class Practice & Common Pitfalls (15 mins)',
        teacherActivity: 'Highlights the common error of dividing both sides by x in equations like x² = 5x (which loses the root x = 0).',
        learnerActivity: 'Solve x² - 5x = 0 correctly by factorising x(x - 5) = 0 => x = 0 or x = 5.',
        content: 'Never cancel variables across the equality sign if they can be zero.'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Summary & Evaluation (10 mins)',
        teacherActivity: 'Reviews key steps and evaluates students with quick questions.',
        learnerActivity: 'Summarize key rules in notebooks and write homework assignment.',
        content: 'Key points: Always equate to 0 first, find product-sum factors, apply zero-product principle.'
      }
    ],
    workedExamples: [
      {
        title: 'Example 1: Solving Trinomial with a > 1',
        problem: 'Solve 6x² - 7x - 5 = 0 using the method of factorisation.',
        solution: 'Step 1: Product = a × c = 6 × (-5) = -30. Sum = b = -7.\nStep 2: Find two factors of -30 that sum to -7: These are -10 and +3 (-10 × 3 = -30, -10 + 3 = -7).\nStep 3: Split middle term:\n6x² - 10x + 3x - 5 = 0\nStep 4: Factorise by grouping in pairs:\n2x(3x - 5) + 1(3x - 5) = 0\n(2x + 1)(3x - 5) = 0\n\nStep 5: Zero Product Principle:\n2x + 1 = 0  => 2x = -1  => x = -1/2\nor\n3x - 5 = 0  => 3x = 5   => x = 5/3\n\nRoots: x = -1/2 or x = 1 2/3.',
        explanation: 'Always verify roots by substituting back into original equation.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Speed Factorisation Relay',
        type: 'Pair Work',
        instructions: 'Work in pairs. Person A solves: x² - 9x + 20 = 0. Person B solves: 3x² - 11x + 6 = 0. Swap and cross-mark.',
        timeAllocation: '10 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. Solve x² - 16 = 0 using difference of two squares.',
      '2. Solve 3x² + 10x + 8 = 0 by factorisation.',
      '3. Form the quadratic equation whose roots are -4 and 7.'
    ],
    assignment: 'Solve the following WAEC questions:\n1. 4x² - 12x + 9 = 0\n2. 5x² = 13x - 6\n3. The product of two consecutive positive odd integers is 143. Find the integers.',
    summaryNotes: 'Standard form: ax² + bx + c = 0. To factorise: split bx into two terms whose coefficients multiply to ac and add to b. Equate each factor to zero to find the roots.',
    referenceBooks: ['New General Mathematics Book 1 (Page 84-92)', 'WAEC Past Questions 2015-2025 Mathematics'],
    status: 'published',
    author: 'Mr. Emmanuel Adeyemi (B.Sc. Ed Maths)',
    authorRole: 'Senior Mathematics Master',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-mth-ss1-04',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '2nd Term',
        question: 'What are the roots of the quadratic equation x² - 5x - 14 = 0?',
        options: ['x = 7 or x = -2', 'x = -7 or x = 2', 'x = 7 or x = 2', 'x = -7 or x = -2'],
        correctIndex: 0,
        explanation: '(x - 7)(x + 2) = 0 => x = 7 or x = -2.',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      },
      {
        id: 'cb-mth-ss1-05',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '2nd Term',
        question: 'Form the quadratic equation whose roots are 3 and -1/2.',
        options: ['2x² - 5x - 3 = 0', '2x² + 5x - 3 = 0', '2x² - 5x + 3 = 0', 'x² - 3x - 1/2 = 0'],
        correctIndex: 0,
        explanation: 'x² - (3 - 1/2)x + (3 × -1/2) = 0 => x² - 5/2 x - 3/2 = 0. Multiply by 2 => 2x² - 5x - 3 = 0.',
        difficulty: 'Medium',
        examStandard: 'JAMB/UTME'
      }
    ]
  },

  // 3. SSS 1 General Mathematics - 3rd Term Week 1
  {
    id: 'ss1-math-t3-w1',
    topicId: 'math-ss-t3-w1',
    subjectId: 'maths-ss',
    subjectName: 'General Mathematics',
    level: 'senior_secondary',
    className: 'SSS 1',
    term: '3rd Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    topic: 'Trigonometry: Trigonometric Ratios (SOH CAH TOA) & Angles of Elevation and Depression',
    subtopics: [
      'Right-Angled Triangle Anatomy: Hypotenuse, Opposite, Adjacent',
      'The Primary Trigonometric Ratios: Sine, Cosine, and Tangent',
      'Application of SOH CAH TOA to Find Unknown Sides and Angles',
      'Angles of Elevation and Depression in Real-Life Nigerian Scenarios'
    ],
    nerdcCode: 'NERDC-MTH-SS1-T3-W01',
    bloomLevel: 'Application & Spatial Reasoning',
    behavioralObjectives: [
      'Define Sine, Cosine, and Tangent ratios in relation to acute angles in a right-angled triangle.',
      'Calculate missing side lengths and acute angles given sufficient triangular data.',
      'Differentiate between an angle of elevation (looking upward) and an angle of depression (looking downward).',
      'Model and solve practical height and distance problems (e.g. height of a telecommunication mast or NEPA electric pole).'
    ],
    previousKnowledge: 'Students are well-grounded in Pythagoras Theorem (a² + b² = c²) and angle properties of plane shapes.',
    instructionalMaterials: [
      'Clinometer / angle measuring apparatus',
      'Right-angled triangle model with labelled sides',
      'Trigonometrical four-figure table / scientific calculator',
      'Diagram chart showing surveyor measuring mast height'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction & SOH CAH TOA Mnemonic (15 mins)',
        teacherActivity: 'Draws a right-angled triangle with acute angle θ. Emphasizes that "Opposite" is the side facing the angle of interest, "Adjacent" is the side next to it, and "Hypotenuse" is the longest side opposite the 90° right angle.',
        learnerActivity: 'Identify Opposite and Adjacent sides when reference angle shifts from base angle to vertex angle.',
        content: 'Mnemonic:\nSOH: Sin θ = Opposite / Hypotenuse\nCAH: Cos θ = Adjacent / Hypotenuse\nTOA: Tan θ = Opposite / Adjacent.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Calculating Unknown Sides and Angles (20 mins)',
        teacherActivity: 'Demonstrates solving for unknown side x when angle is 35° and hypotenuse is 12m. Shows inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) for finding angles.',
        learnerActivity: 'Calculate sin 35° using 4-figure table or calculator and solve for side x.',
        content: 'sin 35° = x / 12 => x = 12 × sin 35° = 12 × 0.5736 = 6.88 m.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Angles of Elevation and Depression (25 mins)',
        teacherActivity: 'Draws a horizontal eye-level line. Demonstrates: Looking UP gives Angle of Elevation. Looking DOWN gives Angle of Depression. Proves that Angle of Elevation = Angle of Depression (Alternate Interior Angles).',
        learnerActivity: 'Sketch word problems into clear geometric right triangles.',
        content: 'Always draw the horizontal line of sight FIRST at the observer\'s position.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Real-Life Problem Solving (10 mins)',
        teacherActivity: 'Presents practical problem: An engineer stands 40m from the base of an MTN telecom mast in Ikeja, Lagos. The angle of elevation to the top of the mast is 52°. Calculate the height of the mast.',
        learnerActivity: 'Identify Tan 52° = height / 40 => height = 40 × tan 52°.',
        content: 'height = 40 × 1.2799 = 51.2 meters.'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Evaluation & Summary (10 mins)',
        teacherActivity: 'Reviews concepts and assigns homework.',
        learnerActivity: 'Attempt oral test and copy homework.',
        content: 'Summary: SOH CAH TOA is exclusively for right triangles. Elevation is measured upwards from horizontal; depression is measured downwards.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Angle of Depression & Mast Height',
        problem: 'From the top of a cliff 60m above sea level, a fisherman in a boat in Bar Beach, Lagos is observed at an angle of depression of 28°. Calculate the horizontal distance of the boat from the foot of the cliff.',
        solution: 'Step 1: Draw diagram.\nTop of cliff height = 60 m.\nAngle of depression from cliff top = 28°.\nBy alternate angles, the angle of elevation from boat to cliff top is also 28°.\n\nStep 2: Apply Tan ratio:\nTan 28° = Opposite / Adjacent\nTan 28° = 60 / d (where d is horizontal distance)\n\nStep 3: Solve for d:\nd = 60 / Tan 28°\nd = 60 / 0.5317\nd = 112.85 m.\n\nThe boat is 112.9 meters from the foot of the cliff.',
        explanation: 'Remember that the angle of depression is measured between the horizontal line of sight and the object, NOT between the vertical cliff and the line of sight.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Outdoor Clinometer Measurement Simulation',
        type: 'Group Work',
        instructions: 'In groups of 4, use the cardboard clinometer to measure the angle of elevation to the school flagpole from a distance of 15 meters. Calculate the flagpole height adding eye-level height (1.4m).',
        timeAllocation: '12 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. In a right triangle, if Opposite = 6cm and Hypotenuse = 10cm, find Sin θ.',
      '2. What is the relationship between the angle of elevation and angle of depression between two points?',
      '3. A ladder 8m long leans against a wall making an angle of 60° with the ground. How high up the wall does it reach?'
    ],
    assignment: 'WAEC Past Questions: 1. An observer on top of a 30m tower spots a car at an angle of depression of 36°. How far is the car from the base of the tower? 2. A tree casts a shadow 18m long when the angle of elevation of the sun is 40°. Find the height of the tree.',
    summaryNotes: 'Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj. Angle of elevation = angle above horizontal. Angle of depression = angle below horizontal. Both angles are numerically equal due to alternate angles along parallel horizontal lines.',
    referenceBooks: ['New General Mathematics SSS 1', 'STAN Mathematics for Senior Secondary Schools'],
    status: 'published',
    author: 'Mr. Emmanuel Adeyemi (B.Sc. Ed Maths)',
    authorRole: 'Senior Mathematics Master',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-mth-ss1-06',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '3rd Term',
        question: 'If tan θ = 3/4 in a right-angled triangle, what is the value of cos θ?',
        options: ['4/5', '3/5', '5/4', '4/3'],
        correctIndex: 0,
        explanation: 'Opposite = 3, Adjacent = 4. Hypotenuse = √(3² + 4²) = √25 = 5. Therefore cos θ = Adj/Hyp = 4/5.',
        difficulty: 'Medium',
        examStandard: 'WAEC'
      },
      {
        id: 'cb-mth-ss1-07',
        subject: 'General Mathematics',
        className: 'SSS 1',
        term: '3rd Term',
        question: 'A 10m ladder rests against a wall. If the base of the ladder is 6m from the wall, find the angle the ladder makes with the ground.',
        options: ['36.87°', '53.13°', '45.00°', '60.00°'],
        correctIndex: 1,
        explanation: 'cos θ = 6 / 10 = 0.6. θ = cos⁻¹(0.6) = 53.13°.',
        difficulty: 'Hard',
        examStandard: 'JAMB/UTME'
      }
    ]
  },

  // 4. SSS 2 English Language - 1st Term Week 1
  {
    id: 'ss2-eng-t1-w1',
    topicId: 'eng-ss-t1-w1',
    subjectId: 'english-ss',
    subjectName: 'English Language',
    level: 'senior_secondary',
    className: 'SSS 2',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '2nd & 3rd Period',
    topic: 'Vocabulary of Law and the Judiciary & Formal Letter Writing',
    subtopics: [
      'Lexis and Structure: Register of the Legal System and Courts of Law',
      'Key Legal Terminology: Plaintiff, Defendant, Bail, Subpoena, Jurisprudence, Acquittal, Conviction',
      'Structure of a Formal Letter to Public Officials (Layout, Salutation, Subject Line, Body, Subscription)',
      'Tone, Register, and Mechanics of Official Correspondence'
    ],
    nerdcCode: 'NERDC-ENG-SS2-T1-W01',
    bloomLevel: 'Application & Linguistic Synthesis',
    behavioralObjectives: [
      'Define and correctly use at least 10 legal register terms in context.',
      'Differentiate between civil law and criminal law terminologies (e.g. plaintiff vs prosecutor; damages vs jail sentence).',
      'Format a two-address formal letter adhering strictly to WAEC marking schemes.',
      'Write an articulate formal letter of petition to a local government chairman concerning community infrastructure.'
    ],
    previousKnowledge: 'Students are familiar with basic informal and semi-formal letter formats and general vocabulary from SSS 1 English Language.',
    instructionalMaterials: [
      'Sample formal letter blueprint chart showing address placement and layout',
      'Glossary chart of Nigerian Court System hierarchy (Supreme Court, Court of Appeal, High Court, Magistrate Court)',
      'Mock court gavel and legal brief extracts'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Specialized Register (10 mins)',
        teacherActivity: 'Presents a simulated courtroom dialogue and asks students to identify words unique to law (e.g. "My Lord", "cross-examination", "objection overruled").',
        learnerActivity: 'Identify legal keywords and discuss the importance of precise vocabulary in professional settings.',
        content: 'Register refers to words and expressions associated with a particular occupation, discipline, or field of human endeavor.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Exploration of Legal Terminology (25 mins)',
        teacherActivity: 'Explains key legal terms with Nigerian court examples: Plaintiff (claimant in civil suit), Defendant (accused), Counsel (barrister/lawyer), Bailiff (court official serving summons), Acquittal (certified not guilty), Conviction (declared guilty).',
        learnerActivity: 'Match legal terms with their definitions in a pair-matching worksheet.',
        content: 'Civil terms: Plaintiff, Defendant, Tort, Compensation, Injunction.\nCriminal terms: Prosecution, Accused, Indictment, Plea, Bail, Acquittal.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Anatomy of a Formal Letter (WAEC Scheme) (25 mins)',
        teacherActivity: 'Details the 7 essential components of a formal letter: 1. Sender\'s address and date (top right), 2. Recipient\'s designation and official address (top left), 3. Formal salutation ("Dear Sir/Madam"), 4. Capitalized or Underlined Subject Heading, 5. Concise multi-paragraph body, 6. Formal complimentary close ("Yours faithfully,"), 7. Signature and Full Name.',
        learnerActivity: 'Draw the structural skeleton of a formal letter in notebooks.',
        content: 'In formal letters, do NOT use contractions (write "do not" instead of "don\'t"). Maintain an objective, courteous, and persuasive tone.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Guided Writing Exercise (10 mins)',
        teacherActivity: 'Guides the class in drafting the opening paragraph and subject heading for a letter to the Commissioner for Education.',
        learnerActivity: 'Write opening sentences stating purpose clearly without informal pleasantries.',
        content: 'Effective opening: "I write to formally draw your attention to the urgent need for laboratory equipment in Government Secondary School..."'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Review and Assignment (10 mins)',
        teacherActivity: 'Recaps letter structure and legal vocabulary; assigns essay topic.',
        learnerActivity: 'Record essay prompt and vocabulary review list.',
        content: 'Summary: Two addresses, formal salutation, explicit heading, no slang/contractions, "Yours faithfully" + signature + full name.'
      }
    ],
    workedExamples: [
      {
        title: 'Model Formal Letter Layout (WAEC Standard)',
        problem: 'Draft the heading, salutation, and opening paragraph of a letter to the Executive Chairman of Ikeja Local Government.',
        solution: 'Top Right:\n24 Awolowo Way,\nIkeja, Lagos State.\n8th September, 2026.\n\nTop Left:\nThe Executive Chairman,\nIkeja Local Government Council,\nIkeja, Lagos State.\n\nSalutation:\nDear Sir,\n\nHeading:\nURGENT APPEAL FOR REHABILITATION OF ACCESS ROADS AND DRAINAGE SYSTEMS IN ALAUSA COMMUNITY\n\nOpening Body:\nI write as the Youth Secretary on behalf of the residents of Alausa Community to respectfully bring to your esteemed office the deteriorating condition of our community access roads and drainage infrastructure...',
        explanation: 'Notice proper capitalization of proper nouns, correct comma usage in addresses, and dignified formal tone.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Legal Vocabulary Fill-in-the-Blank',
        type: 'Individual',
        instructions: 'Complete sentences with the correct legal word: (a) The judge granted the accused _____ pending trial. (b) The _____ failed to prove that the breach of contract occurred. (c) The witness was served a _____ to appear in court.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. What is the difference between an acquittal and a pardon in law?',
      '2. Where is the recipient\'s address placed in a formal letter?',
      '3. Why are contractions (such as "can\'t", "won\'t") penalized in WAEC formal letter examinations?'
    ],
    assignment: 'Write a letter of not less than 450 words to the Minister of Health on the need to upgrade primary healthcare centres in rural communities across your state.',
    summaryNotes: 'Legal register features words like jurisprudence, plaintiff, subpoena, testimony, verdict. Formal letters require two addresses, date, designation, formal salutation ("Dear Sir,"), capitalized/underlined title, non-contracted formal language, and "Yours faithfully,".',
    referenceBooks: ['Intensive English for Senior Secondary Schools 2 (B.O. Oluikpe et al.)', 'WAEC English Language Past Papers & Marking Scheme'],
    status: 'published',
    author: 'Mrs. Funmilayo Adeleke (M.A. English)',
    authorRole: 'Head of English & SSCE Chief Examiner',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-eng-ss2-01',
        subject: 'English Language',
        className: 'SSS 2',
        term: '1st Term',
        question: 'A formal legal document ordering someone to attend court as a witness is called a/an:',
        options: ['Subpoena', 'Affidavit', 'Injunction', 'Bailiff'],
        correctIndex: 0,
        explanation: 'A subpoena is a formal written order issued by a court requiring an individual to appear and give testimony.',
        difficulty: 'Medium',
        examStandard: 'WAEC'
      },
      {
        id: 'cb-eng-ss2-02',
        subject: 'English Language',
        className: 'SSS 2',
        term: '1st Term',
        question: 'Which of the following complimentary closes is required in a formal letter to an official?',
        options: ['Yours faithfully,', 'Yours sincerely,', 'Yours affectionately,', 'Warm regards,'],
        correctIndex: 0,
        explanation: 'When addressing someone by their official designation or "Dear Sir/Madam", "Yours faithfully," is the standard formal close.',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      }
    ]
  },

  // 5. SSS 2 Physics - 1st Term Week 2
  {
    id: 'ss2-phy-t1-w2',
    topicId: 'phy-ss-t1-w2',
    subjectId: 'physics-ss',
    subjectName: 'Physics',
    level: 'senior_secondary',
    className: 'SSS 2',
    term: '1st Term',
    week: 2,
    duration: '80 Minutes (Double Period)',
    period: '4th & 5th Period',
    topic: 'Scalars, Vectors, and Equations of Uniformly Accelerated Motion',
    subtopics: [
      'Distinction between Scalar and Vector Quantities',
      'Vector Resolution: Rectangular Components (Fx = F cos θ, Fy = F sin θ)',
      'Derivation of the Four Equations of Linear Motion (v = u + at, s = ut + 1/2 at², v² = u² + 2as, s = (u+v)/2 t)',
      'Motion Under Gravity (Free Fall and Vertical Throw)'
    ],
    nerdcCode: 'NERDC-PHY-SS2-T1-W02',
    bloomLevel: 'Mathematical Modeling & Experimental Analysis',
    behavioralObjectives: [
      'Differentiate between scalar and vector physical quantities with 4 examples each.',
      'Resolve a vector into two perpendicular rectangular components.',
      'State and apply the four kinematic equations of uniformly accelerated motion.',
      'Solve problems involving objects thrown vertically upward or falling freely under gravity (g = 9.8 m/s² or 10 m/s²).'
    ],
    previousKnowledge: 'Students are familiar with speed, distance, time, and units from SSS 1 Mechanics.',
    instructionalMaterials: [
      'Ticker-timer tape apparatus',
      'Vector resolution graphical chart with force table',
      'Free-fall steel sphere and electronic timer'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Scalars vs Vectors (15 mins)',
        teacherActivity: 'Asks a student to walk 5 steps. Asks: "Did I specify direction?" Differentiates between magnitude-only scalars (mass, time, speed, energy) and magnitude+direction vectors (displacement, velocity, acceleration, force).',
        learnerActivity: 'Classify given quantities (momentum, temperature, pressure, electric field) into scalar and vector tables.',
        content: 'Scalars have magnitude only. Vectors possess both magnitude and a defined spatial direction.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Vector Resolution (20 mins)',
        teacherActivity: 'Draws a force vector F at angle θ to the horizontal x-axis. Derives Fx = F cos θ and Fy = F sin θ.',
        learnerActivity: 'Resolve a force of 50 N acting at 30° to the horizontal into horizontal and vertical components.',
        content: 'Fx = 50 cos 30° = 50 × 0.8660 = 43.3 N (horizontal); Fy = 50 sin 30° = 50 × 0.5 = 25.0 N (vertical).'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Derivation of Kinematic Equations (25 mins)',
        teacherActivity: 'Derives the 4 linear motion equations using velocity-time definitions.',
        learnerActivity: 'Derive v² = u² + 2as by eliminating time t between v = u + at and s = ((u+v)/2)t.',
        content: '1. v = u + at\n2. s = ut + 1/2 at²\n3. v² = u² + 2as\n4. s = ((u + v)/2) × t.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Motion Under Gravity (10 mins)',
        teacherActivity: 'Explains sign conventions for vertical motion: When moving UP, a = -g (retardation). At maximum height, final velocity v = 0. When falling DOWN, a = +g.',
        learnerActivity: 'Calculate time of flight and maximum height of a pebble tossed upward at 20 m/s.',
        content: 'H_max = u² / 2g; Time to peak t = u / g; Total flight time T = 2u / g.'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Summary & Evaluation (10 mins)',
        teacherActivity: 'Reviews key formulas and assesses understanding.',
        learnerActivity: 'Summarize equations and take note of homework.',
        content: 'Summary: Vectors require resolution. The 4 kinematic equations apply ONLY when acceleration is constant.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Vehicle Deceleration & Stopping Distance',
        problem: 'A car travelling along the Lagos-Ibadan Expressway at 72 km/h brakes uniformly to rest in a distance of 40 meters. Calculate: (a) the retardation of the car, (b) the time taken to come to a complete halt.',
        solution: 'Step 1: Convert units to SI:\nInitial velocity u = 72 km/h = (72 × 1000) / 3600 = 20 m/s.\nFinal velocity v = 0 m/s (car comes to rest).\nDisplacement s = 40 m.\n\nStep 2: Calculate acceleration (a):\nv² = u² + 2as\n0² = 20² + 2(a)(40)\n0 = 400 + 80a\n-80a = 400\na = -400 / 80 = -5 m/s².\nRetardation = 5 m/s² (negative indicates deceleration).\n\nStep 3: Calculate time (t):\nv = u + at\n0 = 20 + (-5)t\n5t = 20\nt = 4 seconds.\n\nAnswers: (a) Retardation = 5 m/s², (b) Time taken = 4 seconds.',
        explanation: 'Always ensure velocities are converted from km/h to m/s before substituting into SI equations.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Vector Resultant Calculation',
        type: 'Pair Work',
        instructions: 'Two forces 6 N and 8 N act at a point at right angles (90°) to each other. Calculate the resultant force magnitude and its angle to the 8 N force.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. State two examples of scalar and two examples of vector physical quantities.',
      '2. What is the value of velocity at the highest point of a projectile thrown vertically upward?',
      '3. State the 3rd equation of linear motion relating v, u, a, and s.'
    ],
    assignment: 'WAEC Past Questions Physics: 1. A ball is dropped from the top of a 80m high telecommunication tower. Calculate the time it takes to hit the ground and its impact velocity (Take g = 10 m/s²). 2. A stone is projected vertically upward with an initial velocity of 30 m/s. Find the maximum height reached.',
    summaryNotes: 'Scalar = magnitude only; Vector = magnitude + direction. Resolve vectors with Fx = F cos θ, Fy = F sin θ. The 4 kinematic equations: v=u+at, s=ut+1/2at², v²=u²+2as, s=((u+v)/2)t. Under gravity, a = -g going up, a = +g going down.',
    referenceBooks: ['Senior Secondary School Physics (P.N. Okeke & M.W. Anyakoha)', 'New School Physics for Senior Secondary Schools (M.W. Anyakoha)'],
    status: 'published',
    author: 'Engr. Babatunde Sanusi (M.Eng Physics/Electrical)',
    authorRole: 'Senior Physics Specialist & WAEC Examiner',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-phy-ss2-01',
        subject: 'Physics',
        className: 'SSS 2',
        term: '1st Term',
        question: 'Which of the following physical quantities is a vector?',
        options: ['Electric field intensity', 'Electric potential', 'Speed', 'Mass'],
        correctIndex: 0,
        explanation: 'Electric field intensity has both magnitude and direction (directed away from positive and towards negative charges).',
        difficulty: 'Medium',
        examStandard: 'JAMB/UTME'
      },
      {
        id: 'cb-phy-ss2-02',
        subject: 'Physics',
        className: 'SSS 2',
        term: '1st Term',
        question: 'An object is released from rest from a height of 45 m. Calculate the time taken to reach the ground. (Take g = 10 m/s²).',
        options: ['3.0 s', '4.5 s', '9.0 s', '2.0 s'],
        correctIndex: 0,
        explanation: 's = ut + 1/2 gt². Since u = 0, 45 = 0 + 1/2(10)t² => 45 = 5t² => t² = 9 => t = 3 seconds.',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      }
    ]
  },

  // 6. SSS 1 Chemistry - 1st Term Week 1
  {
    id: 'ss1-chm-t1-w1',
    topicId: 'chm-ss-t1-w1',
    subjectId: 'chemistry-ss',
    subjectName: 'Chemistry',
    level: 'senior_secondary',
    className: 'SSS 1',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    topic: 'Introduction to Chemistry: Particulate Nature of Matter & Atomic Structure',
    subtopics: [
      'Branches of Chemistry (Organic, Inorganic, Physical, Analytical, Industrial)',
      'States of Matter and Kinetic Theory',
      'Subatomic Particles: Protons, Neutrons, Electrons (Charge, Mass, Location)',
      'Atomic Number (Z), Mass Number (A), and Isotopy'
    ],
    nerdcCode: 'NERDC-CHM-SS1-T1-W01',
    bloomLevel: 'Comprehension and Application',
    behavioralObjectives: [
      'Define chemistry and identify 4 industrial applications of chemistry in Nigeria (e.g. petroleum refining in Port Harcourt/Warri, Dangote cement/fertilizer, soap manufacturing).',
      'State the postulates of John Dalton\'s atomic theory and their modern modifications.',
      'Differentiate between protons, neutrons, and electrons in terms of relative charge, relative mass, and position.',
      'Calculate the number of protons, neutrons, and electrons given the standard notation A_Z X.'
    ],
    previousKnowledge: 'Learners understand basic matter states (solid, liquid, gas) from JSS 3 Basic Science.',
    instructionalMaterials: [
      'Bohr model atomic structure display',
      'Periodic table chart (first 20 elements)',
      'Samples of common chemical products: table salt (NaCl), sulfur powder, copper sulfate crystals'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Chemistry & Its Scope (15 mins)',
        teacherActivity: 'Shows a bottle of palm oil and a bar of soap. Asks: "How does raw agricultural produce transform into household soap?" Introduces chemistry as the branch of science dealing with the composition, properties, and transformation of matter.',
        learnerActivity: 'Give examples of chemical changes in everyday Nigerian life (fermentation of cassava for garri, rusting of zinc roofing sheets, burning of firewood).',
        content: 'Chemistry branches: Organic (carbon compounds), Inorganic (non-carbon minerals), Physical (energy & rates), Analytical (detection & purity).'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Subatomic Particles & The Modern Atom (25 mins)',
        teacherActivity: 'Draws the atomic model showing the central dense nucleus (protons + neutrons) surrounded by orbiting electrons in energy levels (K, L, M shells). Explains Rutherford\'s gold foil experiment and Chadwick\'s discovery of the neutron.',
        learnerActivity: 'Construct a comparison table of subatomic particles: Proton (+1, 1 amu), Neutron (0, 1 amu), Electron (-1, 1/1840 amu).',
        content: 'Nucleus contains nucleons (protons and neutrons). Electrons occupy discrete planetary shells (2n² rule).'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Atomic Notation, Isotopes and Relative Atomic Mass (20 mins)',
        teacherActivity: 'Introduces notation ^A_Z X where A = Mass Number (p + n) and Z = Atomic Number (number of protons). Defines Isotopy as the phenomenon where atoms of the same element have the same atomic number but different mass numbers due to different numbers of neutrons.',
        learnerActivity: 'Determine p, n, e for Chlorine-35 and Chlorine-37.',
        content: 'Cl-35: 17 protons, 18 neutrons, 17 electrons.\nCl-37: 17 protons, 20 neutrons, 17 electrons.\nRelative Atomic Mass of Cl = (35 × 75% + 37 × 25%) / 100 = 35.5.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Electronic Configuration (First 20 Elements) (10 mins)',
        teacherActivity: 'Teaches the 2, 8, 8, 2 shell capacity rule for the first 20 elements from Hydrogen to Calcium.',
        learnerActivity: 'Write electronic configurations for Sodium (Na: 2,8,1), Oxygen (O: 2,6), and Calcium (Ca: 2,8,8,2).',
        content: 'Valence electrons determine the chemical reactivity and group number on the periodic table.'
      },
      {
        stepNumber: 5,
        title: 'Step 5: Summary & Evaluation (10 mins)',
        teacherActivity: 'Evaluates understanding through oral and written quick-checks.',
        learnerActivity: 'Complete quick-check questions and write assignment.',
        content: 'Summary: Matter is particulate. Atoms consist of protons, neutrons, and electrons. A = Z + n. Isotopes differ in neutron count.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Subatomic Particle Calculation & Isotopy',
        problem: 'An atom of an element has the symbol ^56_26 Fe. Determine: (a) Number of protons, (b) Number of electrons in Fe³⁺ ion, (c) Number of neutrons in the nucleus.',
        solution: 'From the symbol ^56_26 Fe:\nAtomic Number Z = 26, Mass Number A = 56.\n\n(a) Number of protons = Z = 26.\n(b) In a neutral Fe atom, electrons = protons = 26. In the Fe³⁺ cation, the atom has lost 3 electrons:\nNumber of electrons = 26 - 3 = 23 electrons.\n(c) Number of neutrons = Mass Number (A) - Atomic Number (Z) = 56 - 26 = 30 neutrons.',
        explanation: 'Remember: Cations (positive ions) lose electrons; anions (negative ions) gain electrons. The nucleus (protons & neutrons) never changes during chemical reactions.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'First 20 Elements Configuration Drill',
        type: 'Individual',
        instructions: 'Write the symbol, atomic number, and shell electronic arrangement (K, L, M, N) for: (1) Carbon, (2) Magnesium, (3) Phosphorus, (4) Potassium.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. State two major modifications to John Dalton\'s atomic theory.',
      '2. Why is an atom electrically neutral?',
      '3. What are isotopes? Name two common isotopes of Carbon.'
    ],
    assignment: '1. Chlorine occurs naturally as two isotopes: ³⁵Cl (75% abundance) and ³⁷Cl (25% abundance). Calculate the relative atomic mass of chlorine. 2. Write the electronic configuration of the following ions: Al³⁺, S²⁻, and K⁺.',
    summaryNotes: 'Chemistry studies matter. Atoms contain protons (+1 charge), neutrons (0 charge), and electrons (-1 charge). Mass number A = protons + neutrons. Atomic number Z = protons. Isotopes have identical Z but differing A. Electronic configuration follows the 2n² capacity rule.',
    referenceBooks: ['New School Chemistry for Senior Secondary Schools (Osei Yaw Ababio)', 'Essential Chemistry for Senior Secondary Schools (I.A. Odesina)'],
    status: 'published',
    author: 'Dr. (Mrs.) Chioma Nnamdi (Ph.D. Chem Ed)',
    authorRole: 'Chemistry Chief Examiner & NERDC Consultant',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-chm-ss1-01',
        subject: 'Chemistry',
        className: 'SSS 1',
        term: '1st Term',
        question: 'Which of the following subatomic particles has a relative mass of approximately zero (1/1840 amu)?',
        options: ['Electron', 'Proton', 'Neutron', 'Alpha particle'],
        correctIndex: 0,
        explanation: 'Electrons have negligible mass compared to nucleons (protons and neutrons have mass ~1 amu).',
        difficulty: 'Easy',
        examStandard: 'WAEC'
      },
      {
        id: 'cb-chm-ss1-02',
        subject: 'Chemistry',
        className: 'SSS 1',
        term: '1st Term',
        question: 'How many neutrons are present in the nucleus of an atom represented as ²⁷₁₃Al?',
        options: ['14', '13', '27', '40'],
        correctIndex: 0,
        explanation: 'Number of neutrons = Mass Number (A) - Atomic Number (Z) = 27 - 13 = 14.',
        difficulty: 'Easy',
        examStandard: 'JAMB/UTME'
      }
    ]
  },

  // 7. JSS 1 Mathematics - 1st Term Week 1
  {
    id: 'js1-math-t1-w1',
    topicId: 'math-js-t1-w1',
    subjectId: 'maths-jss',
    subjectName: 'Mathematics (Basic 7-9)',
    level: 'junior_secondary',
    className: 'JSS 1',
    term: '1st Term',
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    topic: 'Whole Numbers: Place Value, Large Numbers up to Billions, and Roman Numerals',
    subtopics: [
      'Reading and Writing Numbers in Words and Figures up to Billions',
      'Place Value and Face Value Analysis',
      'Roman Numerals System (I, V, X, L, C, D, M) and Conversion Rules',
      'Nigerian National Census and Budget Figures as Real-World Large Numbers'
    ],
    nerdcCode: 'NERDC-MTH-JS1-T1-W01',
    bloomLevel: 'Knowledge and Application',
    behavioralObjectives: [
      'Read and write numbers up to billions accurately in figures and in words.',
      'State the place value of any digit in a 9-digit or 10-digit number.',
      'Convert Arabic numerals up to 3,000 into Roman numerals and vice-versa.',
      'Apply large numbers to Nigerian context (e.g. National Budget in Trillions of Naira, Population counts).'
    ],
    previousKnowledge: 'Learners can count, add, and subtract whole numbers up to millions from Primary 6 / Basic 6 Mathematics.',
    instructionalMaterials: [
      'Place value chart showing Billions, Millions, Thousands, and Units periods',
      'Roman Numeral flashcards with basic symbols (I=1, V=5, X=10, L=50, C=100, D=500, M=1000)',
      'Extract of Nigerian Federal Budget figures in Naira'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to Huge Numbers (10 mins)',
        teacherActivity: 'Presents the estimated Nigerian population (over 220,000,000 people) and national GDP. Explains why we need commas to separate groups of three digits (Periods).',
        learnerActivity: 'Read the numbers aloud using appropriate period names: Units, Thousands, Millions, Billions.',
        content: 'Numbers are grouped in triads: Billions | Millions | Thousands | Units. Example: 4,520,318,905 is Four billion, five hundred and twenty million, three hundred and eighteen thousand, nine hundred and five.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Place Value vs Face Value (25 mins)',
        teacherActivity: 'Demonstrates finding the place value of digit 7 in 3,745,892 (Seven hundred thousand = 700,000) vs its face value (7).',
        learnerActivity: 'Write place values for underlined digits in practice numbers.',
        content: 'Place value = Face Value × Position Weight (e.g. 7 × 100,000 = 700,000).'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Roman Numerals System (25 mins)',
        teacherActivity: 'Explains the Roman letters: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). Teaches the additive rule (VI = 5 + 1 = 6) and subtractive rule (IV = 5 - 1 = 4; IX = 10 - 1 = 9; XC = 100 - 10 = 90; CD = 500 - 100 = 400).',
        learnerActivity: 'Convert year numbers and chapter numbers into Roman numerals.',
        content: 'A symbol cannot be repeated more than three times consecutively (e.g. 40 is XL, not XXXX).'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Summary & Classroom Evaluation (20 mins)',
        teacherActivity: 'Administers quick evaluation drill and gives homework.',
        learnerActivity: 'Complete class questions and write assignment in notebooks.',
        content: 'Summary: Large numbers use comma periods. Roman numerals follow additive and subtractive rules.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Converting Year to Roman Numerals',
        problem: 'Write the year 2026 and the number 1984 in Roman numerals.',
        solution: 'For 2026:\n2000 = MM\n20 = XX\n6 = VI\n2026 = MMXXVI.\n\nFor 1984:\n1000 = M\n900 = CM (1000 - 100)\n80 = LXXX (50 + 10 + 10 + 10)\n4 = IV (5 - 1)\n1984 = MCMLXXXIV.',
        explanation: 'Always break the number down into thousands, hundreds, tens, and units before writing Roman numerals.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Pair Roman Numeral Decoding',
        type: 'Pair Work',
        instructions: 'Decode these Roman numerals into Arabic numbers: (a) CMLXXIX, (b) MMCDXLVIII, (c) DCCCLXXXVIII.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. What is the place value of 9 in 89,450,210?',
      '2. Write in figures: Two billion, forty-five million, six hundred thousand and twelve.',
      '3. Convert the Roman numeral MCMLX to Arabic figures.'
    ],
    assignment: '1. Write the place value of each digit in 5,834,209,176.\n2. Convert to Roman numerals: (a) 499, (b) 1,452, (c) 2,890.\n3. Convert to Arabic numerals: (a) CDXCIX, (b) MMMDCCCLXXIV.',
    summaryNotes: 'Whole numbers are grouped in threes by commas. Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtractive rule applies when a smaller numeral precedes a larger one (e.g. IX = 9, XL = 40, CM = 900).',
    referenceBooks: ['MAN Mathematics for Junior Secondary Schools Book 1', 'New General Mathematics for Junior Secondary Schools 1'],
    status: 'published',
    author: 'Mrs. Zainab Usman (B.Ed Mathematics)',
    authorRole: 'Junior Secondary Mathematics Coordinator',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-mth-js1-01',
        subject: 'Mathematics (Basic 7-9)',
        className: 'JSS 1',
        term: '1st Term',
        question: 'What is the Roman numeral for 444?',
        options: ['CDXLIV', 'CCCCXXXXIIII', 'DXLIV', 'CDLIV'],
        correctIndex: 0,
        explanation: '400 = CD, 40 = XL, 4 = IV => CDXLIV.',
        difficulty: 'Medium',
        examStandard: 'BECE'
      },
      {
        id: 'cb-mth-js1-02',
        subject: 'Mathematics (Basic 7-9)',
        className: 'JSS 1',
        term: '1st Term',
        question: 'In the number 783,492,015, what is the place value of the digit 8?',
        options: ['Eighty Million', 'Eight Million', 'Eight Hundred Thousand', 'Eighty Thousand'],
        correctIndex: 0,
        explanation: '8 is in the ten millions place => 80,000,000 (Eighty Million).',
        difficulty: 'Easy',
        examStandard: 'BECE'
      }
    ]
  },

  // 8. Basic 5 Mathematics - 1st Term Week 1
  {
    id: 'pri5-math-t1-w1',
    topicId: 'math-pri-t1-w1',
    subjectId: 'maths-pri',
    subjectName: 'Basic Mathematics',
    level: 'primary',
    className: 'Basic 5',
    term: '1st Term',
    week: 1,
    duration: '60 Minutes (Single Period)',
    period: '2nd Period',
    topic: 'Whole Numbers: Place Value of Numbers up to 1,000,000 and Roman Numerals up to 1,000',
    subtopics: [
      'Counting, Reading, and Writing 6-digit and 7-digit numbers',
      'Identifying Place Value (Units, Tens, Hundreds, Thousands, Ten Thousands, Hundred Thousands, Millions)',
      'Expanded Notation of Whole Numbers',
      'Roman Numerals up to 1,000 (M)'
    ],
    nerdcCode: 'NERDC-MTH-PR5-T1-W01',
    bloomLevel: 'Knowledge and Understanding',
    behavioralObjectives: [
      'Read and write whole numbers up to 1,000,000 correctly in words and figures.',
      'State the place value and expanded value of any digit in a given number.',
      'Convert Arabic numerals up to 1,000 into Roman numerals accurately.',
      'Order and compare large numbers using greater than (>), less than (<), and equal to (=) signs.'
    ],
    previousKnowledge: 'Pupils can read and write numbers up to 100,000 from Basic 4 Mathematics.',
    instructionalMaterials: [
      'Colorful place value pocket chart and abacus',
      'Flashcards with numbers in words and figures',
      'Sample Nigerian currency mock notes (₦1000 notes bundled)'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction & Abacus Demonstration (10 mins)',
        teacherActivity: 'Displays an abacus with beads. Asks pupils: "If a school has 10 bundles of one thousand ₦1000 notes, how much money is that?" Leads them to discover ₦1,000,000 (One Million Naira).',
        learnerActivity: 'Count along in thousands and ten-thousands on the abacus.',
        content: '10 hundreds = 1 thousand; 10 thousands = 1 ten-thousand; 10 ten-thousands = 1 hundred-thousand; 10 hundred-thousands = 1 million.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Place Value Table & Expansion (20 mins)',
        teacherActivity: 'Draws the place value columns: M | HTh | TTh | Th | H | T | U. Guides pupils to expand 654,321 = 600,000 + 50,000 + 4,000 + 300 + 20 + 1.',
        learnerActivity: 'Write numbers in expanded form on miniature slate whiteboards.',
        content: 'Place value tells us the position of a digit, while expanded notation shows the value of each digit.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Roman Numerals up to M (1000) (15 mins)',
        teacherActivity: 'Reviews I, V, X, L, C, D, M. Teaches how to write 90 (XC), 400 (CD), 900 (CM).',
        learnerActivity: 'Write their birth year and age in Roman numerals.',
        content: 'Remember: C = 100, D = 500, M = 1000. 450 is CDL (500-100 + 50).'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Evaluation and Game (15 mins)',
        teacherActivity: 'Conducts "Pass the Place Value Card" game and assigns homework.',
        learnerActivity: 'Participate actively and write homework in exercise books.',
        content: 'Summary: 1,000,000 has 7 digits. Always use commas after every three digits from the right.'
      }
    ],
    workedExamples: [
      {
        title: 'Example: Place Value and Expanded Form',
        problem: 'For the number 847,219:\n(a) Write in words.\n(b) State the place value of 4.\n(c) Write in expanded form.',
        solution: '(a) In words: Eight hundred and forty-seven thousand, two hundred and nineteen.\n(b) The digit 4 is in the Ten-Thousands column. Its place value is 40,000 (Forty Thousand).\n(c) Expanded form: 800,000 + 40,000 + 7,000 + 200 + 10 + 9.',
        explanation: 'Count the position from the right: Units (9), Tens (1), Hundreds (2), Thousands (7), Ten Thousands (4), Hundred Thousands (8).'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Card Match: Figures to Words',
        type: 'Pair Work',
        instructions: 'Match the figure card with the correct word card: (1) 402,015, (2) 1,000,000, (3) 78,904.',
        timeAllocation: '7 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. What is the value of 6 in 683,214?',
      '2. Write in figures: Five hundred and sixteen thousand, four hundred and two.',
      '3. Write the Roman numeral for 750.'
    ],
    assignment: '1. Write in expanded form: (a) 923,456 (b) 508,120.\n2. Write in Roman numerals: (a) 640 (b) 890 (c) 1,000.\n3. Put > or < : (a) 345,670 ___ 354,670 (b) 999,999 ___ 1,000,000.',
    summaryNotes: 'Whole numbers up to 1,000,000 have up to 7 digits. Place values: Units, Tens, Hundreds, Thousands, Ten-Thousands, Hundred-Thousands, Millions. Roman numerals: C=100, D=500, M=1000.',
    referenceBooks: ['Champion Primary Mathematics for Nigerian Schools Book 5', 'NERDC Basic Education Curriculum Primary 5'],
    status: 'published',
    author: 'Mrs. Blessing Okoro (NCE, B.Ed Primary Ed)',
    authorRole: 'Head of Primary Mathematics & UBE Specialist',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-mth-pr5-01',
        subject: 'Basic Mathematics',
        className: 'Basic 5',
        term: '1st Term',
        question: 'Which of the following represents seven hundred thousand and fifty in figures?',
        options: ['700,050', '70,050', '7,000,050', '700,500'],
        correctIndex: 0,
        explanation: '700,000 + 50 = 700,050.',
        difficulty: 'Easy',
        examStandard: 'National Common Entrance'
      },
      {
        id: 'cb-mth-pr5-02',
        subject: 'Basic Mathematics',
        className: 'Basic 5',
        term: '1st Term',
        question: 'What is the Roman numeral for 650?',
        options: ['DCL', 'CDL', 'ML', 'DL'],
        correctIndex: 0,
        explanation: '500 (D) + 100 (C) + 50 (L) = DCL.',
        difficulty: 'Easy',
        examStandard: 'National Common Entrance'
      }
    ]
  },

  // 9. Basic 5 Social Studies & Civic Education - 1st Term Week 1
  {
    id: 'pri5-civic-t1-w1',
    topicId: 'civic-pri-t1-w1',
    subjectId: 'social-civic-pri',
    subjectName: 'Social Studies & Civic Education',
    level: 'primary',
    className: 'Basic 5',
    term: '1st Term',
    week: 1,
    duration: '60 Minutes (Single Period)',
    period: '3rd Period',
    topic: 'National Symbols of Nigeria: The Flag, Coat of Arms, National Anthem, and Pledge',
    subtopics: [
      'Definition of National Symbols and National Identity',
      'The Nigerian Flag: Meaning of Colours (Green-White-Green) and Designer (Taiwo Akinkunmi)',
      'The Nigerian Coat of Arms: Significance of the Eagle, Horses, Y-shape (Niger & Benue), and Flowers (Costus Spectabilis)',
      'Civic Respect: Proper Conduct during National Anthem and Flag Hoisting'
    ],
    nerdcCode: 'NERDC-SSC-PR5-T1-W01',
    bloomLevel: 'Comprehension & Civic Values',
    behavioralObjectives: [
      'Define national symbols and explain why citizens must respect them.',
      'State the meaning of the colors of the Nigerian flag and identify the designer.',
      'Identify and explain the 5 key features of the Nigerian Coat of Arms.',
      'Recite the National Anthem (both stanzas) and the National Pledge with proper posture.'
    ],
    previousKnowledge: 'Pupils see the national flag at morning assembly and recite the pledge daily.',
    instructionalMaterials: [
      'Replica Nigerian Flag on desktop stand',
      'High-resolution picture chart of the Coat of Arms with labelled features',
      'Audio recording of the Nigerian National Anthem ("Arise O Compatriots" / New Anthem)'
    ],
    lessonPresentation: [
      {
        stepNumber: 1,
        title: 'Step 1: Introduction to National Identity (10 mins)',
        teacherActivity: 'Points to the Nigerian flag in the classroom. Asks: "Why does our country have a unique flag different from Ghana or Britain?" Explains that national symbols are official signs and emblems representing the sovereignty and unity of a nation.',
        learnerActivity: 'Identify other Nigerian symbols (Currency, Passport, Coat of Arms).',
        content: 'National symbols foster unity, patriotism, and pride among the 200+ ethnic groups in Nigeria.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: The Nigerian National Flag (15 mins)',
        teacherActivity: 'Discusses the flag designed in 1959 by Pa Michael Taiwo Akinkunmi. Green represents rich agriculture and natural wealth; White represents peace and unity.',
        learnerActivity: 'Draw and color the Nigerian flag in their drawing notebooks.',
        content: 'Rules for the flag: It must never touch the ground; it must be flown at half-mast during national mourning.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: The Nigerian Coat of Arms (20 mins)',
        teacherActivity: 'Breaks down the Coat of Arms: Black Shield (fertile soil), Two White Horses (dignity and pride), Red Eagle (strength and vision), Silver Y-shape (confluence of Rivers Niger and Benue at Lokoja), Yellow Flowers (Costus Spectabilis - national wildflower), Motto: "Unity and Faith, Peace and Progress".',
        learnerActivity: 'Label the blank diagram of the Coat of Arms.',
        content: 'The Coat of Arms is the official seal of the Federal Republic of Nigeria.'
      },
      {
        stepNumber: 4,
        title: 'Step 4: Respect and Civic Duty (15 mins)',
        teacherActivity: 'Demonstrates proper standing posture at attention (hands by the side, no talking, no moving) during the National Anthem.',
        learnerActivity: 'Stand at attention and sing the National Anthem solemnly.',
        content: 'Good citizens respect national symbols and promote peace.'
      }
    ],
    workedExamples: [
      {
        title: 'Summary Table of Coat of Arms Features',
        problem: 'List each feature of the Nigerian Coat of Arms and its national significance.',
        solution: '1. Black Shield = Fertile agricultural soil of Nigeria.\n2. Red Eagle = National strength and foresight.\n3. Two White Horses = Dignity, pride, and majesty.\n4. Wavy Silver \'Y\' = Confluence of River Niger and River Benue.\n5. Yellow Wildflowers = Costus Spectabilis (beauty of the nation).\n6. National Motto = Unity and Faith, Peace and Progress.',
        explanation: 'This question frequently appears in Primary School Common Entrance examinations.'
      }
    ],
    classActivities: [
      {
        taskTitle: 'Group Symbol Quiz',
        type: 'Group Work',
        instructions: 'In groups of 5, one pupil recites a line from the National Pledge while others explain what civic duty it requires from us as good Nigerians.',
        timeAllocation: '8 Minutes'
      }
    ],
    evaluationQuestions: [
      '1. Who designed the Nigerian national flag and in what year?',
      '2. What does the White color in our flag stand for?',
      '3. Name the two major rivers represented by the \'Y\' on the Coat of Arms.',
      '4. What is the national motto written on the Coat of Arms?'
    ],
    assignment: '1. Draw and neatly color the Nigerian National Flag and the Coat of Arms.\n2. Write out the two stanzas of the National Anthem in your exercise book.\n3. List 3 ways you can show respect to national symbols in your school.',
    summaryNotes: 'National symbols represent Nigeria. Flag: Green (agriculture) and White (peace), designed by Pa Taiwo Akinkunmi in 1959. Coat of Arms features: Black Shield (fertile soil), Eagle (strength), Horses (dignity), Y-shape (Niger & Benue confluence), Wildflowers (Costus Spectabilis). Motto: Unity and Faith, Peace and Progress.',
    referenceBooks: ['Civic Education for Primary Schools Book 5 (NERDC)', 'Social Studies for Nigerian Primary Schools Book 5'],
    status: 'published',
    author: 'Mallam Ibrahim Garba (B.Ed Social Studies)',
    authorRole: 'Civic Education Lead & Curriculum Writer',
    updatedAt: '2026-09-01',
    cbtQuestions: [
      {
        id: 'cb-civ-pr5-01',
        subject: 'Social Studies & Civic Education',
        className: 'Basic 5',
        term: '1st Term',
        question: 'Who designed the Nigerian National Flag?',
        options: ['Pa Michael Taiwo Akinkunmi', 'Herbert Macaulay', 'Dr. Nnamdi Azikiwe', 'Chief Obafemi Awolowo'],
        correctIndex: 0,
        explanation: 'Pa Michael Taiwo Akinkunmi designed the national flag in 1959 while studying in London.',
        difficulty: 'Easy',
        examStandard: 'National Common Entrance'
      },
      {
        id: 'cb-civ-pr5-02',
        subject: 'Social Studies & Civic Education',
        className: 'Basic 5',
        term: '1st Term',
        question: 'What does the Red Eagle on the Nigerian Coat of Arms represent?',
        options: ['Strength', 'Agriculture', 'Peace', 'Dignity'],
        correctIndex: 0,
        explanation: 'The Red Eagle represents strength, resilience, and vision.',
        difficulty: 'Easy',
        examStandard: 'National Common Entrance'
      }
    ]
  }
];
