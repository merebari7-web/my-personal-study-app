import { Subject, SchoolLevel, ClassLevel, Term } from '../types';

export const SCHOOL_LEVELS: { id: SchoolLevel; name: string; description: string; classes: ClassLevel[]; badge: string }[] = [
  {
    id: 'primary',
    name: 'Primary Education',
    description: 'Universal Basic Education (UBE) Lower & Middle Basic (Basic 1 to Basic 6)',
    classes: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    badge: 'UBE Basic 1 - 6'
  },
  {
    id: 'junior_secondary',
    name: 'Junior Secondary (JSS)',
    description: 'Universal Basic Education (UBE) Upper Basic (JSS 1 to JSS 3 / Basic 7 - 9)',
    classes: ['JSS 1', 'JSS 2', 'JSS 3'],
    badge: 'UBE Basic 7 - 9 (BECE)'
  },
  {
    id: 'senior_secondary',
    name: 'Senior Secondary (SSS)',
    description: 'Senior Secondary Post-Basic Education (SSS 1 to SSS 3 / WAEC, NECO, JAMB)',
    classes: ['SSS 1', 'SSS 2', 'SSS 3'],
    badge: 'SSCE / UTME Tracks'
  }
];

export const TERMS: Term[] = ['1st Term', '2nd Term', '3rd Term'];

export const TERM_DETAILS: Record<Term, { title: string; months: string; description: string; totalWeeks: number }> = {
  '1st Term': {
    title: 'First Term (Harmattan/Autumn)',
    months: 'September – December',
    description: 'Foundational concepts, baseline entry behaviour assessment, and mid-term evaluations.',
    totalWeeks: 12
  },
  '2nd Term': {
    title: 'Second Term (Lent/Winter)',
    months: 'January – April',
    description: 'Advanced topic development, practical applications, and mock rehearsals.',
    totalWeeks: 12
  },
  '3rd Term': {
    title: 'Third Term (Easter/Promotional)',
    months: 'April – July',
    description: 'Curriculum consolidation, comprehensive revision, and promotional / SSCE / BECE examinations.',
    totalWeeks: 12
  }
};

export const ALL_SUBJECTS: Subject[] = [
  // Senior Secondary Subjects
  {
    id: 'maths-ss',
    name: 'General Mathematics',
    code: 'MTH-SS',
    category: 'General',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Number systems, algebraic processes, trigonometry, statistics, calculus, and coordinate geometry aligned to WAEC/JAMB syllabus.',
    icon: 'Calculator',
    color: '#059669',
    totalLessonNotesCount: 36
  },
  {
    id: 'english-ss',
    name: 'English Language',
    code: 'ENG-SS',
    category: 'General',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Lexis and structure, oral English phonetics, continuous writing (formal & informal), reading comprehension, and summary skills.',
    icon: 'BookOpen',
    color: '#2563eb',
    totalLessonNotesCount: 36
  },
  {
    id: 'physics-ss',
    name: 'Physics',
    code: 'PHY-SS',
    category: 'Science',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Mechanics, heat energy, waves, sound, optics, fields, electricity, and modern atomic physics.',
    icon: 'Zap',
    color: '#7c3aed',
    totalLessonNotesCount: 36
  },
  {
    id: 'chemistry-ss',
    name: 'Chemistry',
    code: 'CHM-SS',
    category: 'Science',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Particulate nature of matter, chemical bonding, periodicity, organic chemistry, redox, and qualitative/quantitative analysis.',
    icon: 'FlaskConical',
    color: '#db2777',
    totalLessonNotesCount: 36
  },
  {
    id: 'biology-ss',
    name: 'Biology',
    code: 'BIO-SS',
    category: 'Science',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Organization of life, ecology, cellular physiology, nutrition, reproduction, genetics, and adaptation.',
    icon: 'Dna',
    color: '#16a34a',
    totalLessonNotesCount: 36
  },
  {
    id: 'further-maths-ss',
    name: 'Further Mathematics',
    code: 'FMT-SS',
    category: 'Science',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Pure mathematics, differential & integral calculus, vectors, dynamics, statics, and probability distributions.',
    icon: 'Binary',
    color: '#4f46e5',
    totalLessonNotesCount: 36
  },
  {
    id: 'economics-ss',
    name: 'Economics',
    code: 'ECO-SS',
    category: 'Commercial',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Microeconomics, demand & supply, national income, money & banking, international trade, and Nigerian economic structure.',
    icon: 'TrendingUp',
    color: '#d97706',
    totalLessonNotesCount: 36
  },
  {
    id: 'government-ss',
    name: 'Government',
    code: 'GOV-SS',
    category: 'Arts & Humanities',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Political concepts, constitutions, organs of government, Nigerian constitutional development, and foreign policy.',
    icon: 'Landmark',
    color: '#dc2626',
    totalLessonNotesCount: 36
  },
  {
    id: 'literature-ss',
    name: 'Literature-in-English',
    code: 'LIT-SS',
    category: 'Arts & Humanities',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'African & non-African prose, drama, poetry, literary devices, and critical textual appreciation for SSCE.',
    icon: 'Feather',
    color: '#9333ea',
    totalLessonNotesCount: 36
  },
  {
    id: 'civic-ss',
    name: 'Civic Education',
    code: 'CIV-SS',
    category: 'General',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Values, citizenship, human rights, rule of law, national consciousness, democracy, and community service.',
    icon: 'ShieldCheck',
    color: '#0284c7',
    totalLessonNotesCount: 36
  },
  {
    id: 'data-processing-ss',
    name: 'Data Processing & ICT',
    code: 'DTP-SS',
    category: 'Pre-Vocational',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Data management, word processing, spreadsheets, database systems, computer networking, and cybersecurity.',
    icon: 'Laptop',
    color: '#0891b2',
    totalLessonNotesCount: 36
  },
  {
    id: 'agric-ss',
    name: 'Agricultural Science',
    code: 'AGR-SS',
    category: 'Pre-Vocational',
    applicableLevels: ['senior_secondary'],
    applicableClasses: ['SSS 1', 'SSS 2', 'SSS 3'],
    description: 'Crop production, soil science, animal husbandry, farm mechanization, and agricultural economics in Nigeria.',
    icon: 'Wheat',
    color: '#65a30d',
    totalLessonNotesCount: 36
  },

  // Junior Secondary Subjects (JSS 1 - 3)
  {
    id: 'maths-jss',
    name: 'Mathematics (Basic 7-9)',
    code: 'MTH-JS',
    category: 'General',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Basic arithmetic, algebra, simple equations, plane shapes, angles, statistics, and BECE examination prep.',
    icon: 'Calculator',
    color: '#059669',
    totalLessonNotesCount: 36
  },
  {
    id: 'english-jss',
    name: 'English Studies',
    code: 'ENG-JS',
    category: 'General',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Grammar, speech work, reading comprehension, vocabulary development, and essay composition.',
    icon: 'BookOpen',
    color: '#2563eb',
    totalLessonNotesCount: 36
  },
  {
    id: 'basic-science-jss',
    name: 'Basic Science',
    code: 'BSC-JS',
    category: 'Science',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Living and non-living things, human body systems, energy transformations, environmental conservation, and scientific inquiry.',
    icon: 'Atom',
    color: '#16a34a',
    totalLessonNotesCount: 36
  },
  {
    id: 'basic-tech-jss',
    name: 'Basic Technology',
    code: 'BTE-JS',
    category: 'Pre-Vocational',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Materials & processing (wood, metal, plastic), technical drawing, simple mechanisms, maintenance, and workshop safety.',
    icon: 'Wrench',
    color: '#ea580c',
    totalLessonNotesCount: 36
  },
  {
    id: 'social-studies-jss',
    name: 'Social Studies & Civic',
    code: 'SOS-JS',
    category: 'Arts & Humanities',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Social environment, culture, institutions, family life, corruption, drug abuse, and national unity.',
    icon: 'Users',
    color: '#9333ea',
    totalLessonNotesCount: 36
  },
  {
    id: 'business-studies-jss',
    name: 'Business Studies',
    code: 'BUS-JS',
    category: 'Commercial',
    applicableLevels: ['junior_secondary'],
    applicableClasses: ['JSS 1', 'JSS 2', 'JSS 3'],
    description: 'Office practice, commerce, bookkeeping, keyboarding, entrepreneurial skills, and consumer rights.',
    icon: 'Briefcase',
    color: '#ca8a04',
    totalLessonNotesCount: 36
  },

  // Primary Subjects (Basic 1 - 6)
  {
    id: 'maths-pri',
    name: 'Basic Mathematics',
    code: 'MTH-PR',
    category: 'General',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'Number recognition, place value, operations (addition, subtraction, multiplication, division), Nigerian currency (Naira/Kobo), fractions, shapes, and measurement.',
    icon: 'Calculator',
    color: '#059669',
    totalLessonNotesCount: 36
  },
  {
    id: 'english-pri',
    name: 'English Studies & Phonics',
    code: 'ENG-PR',
    category: 'General',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'Phonics, letter sounds, vocabulary, grammar (parts of speech, tenses), reading fluency, storytelling, and simple composition.',
    icon: 'BookOpen',
    color: '#2563eb',
    totalLessonNotesCount: 36
  },
  {
    id: 'basic-sci-tech-pri',
    name: 'Basic Science & Technology (BST)',
    code: 'BST-PR',
    category: 'Science',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'Plants and animals, senses, clean water and hygiene, simple tools, computers and everyday technology.',
    icon: 'Sprout',
    color: '#16a34a',
    totalLessonNotesCount: 36
  },
  {
    id: 'social-civic-pri',
    name: 'Social Studies & Civic Education',
    code: 'SSC-PR',
    category: 'Arts & Humanities',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'The family, community helpers, Nigerian national symbols, good manners, rights and responsibilities, and traffic safety.',
    icon: 'HeartHandshake',
    color: '#db2777',
    totalLessonNotesCount: 36
  },
  {
    id: 'cca-pri',
    name: 'Cultural & Creative Arts (CCA)',
    code: 'CCA-PR',
    category: 'Arts & Humanities',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'Drawing, coloring, traditional crafts, Nigerian cultural dances, music, and dramatic performances.',
    icon: 'Palette',
    color: '#8b5cf6',
    totalLessonNotesCount: 36
  },
  {
    id: 'reasoning-pri',
    name: 'Verbal & Quantitative Reasoning',
    code: 'VQR-PR',
    category: 'General',
    applicableLevels: ['primary'],
    applicableClasses: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'],
    description: 'Critical thinking patterns, word codes, letter series, numeric grids, logic puzzles, and National Common Entrance exam prep.',
    icon: 'Brain',
    color: '#0891b2',
    totalLessonNotesCount: 36
  }
];

export const WAEC_GRADING_SCALE = [
  { grade: 'A1', min: 75, max: 100, remark: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { grade: 'B2', min: 70, max: 74, remark: 'Very Good', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { grade: 'B3', min: 65, max: 69, remark: 'Good', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { grade: 'C4', min: 60, max: 64, remark: 'Credit', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { grade: 'C5', min: 55, max: 59, remark: 'Credit', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { grade: 'C6', min: 50, max: 54, remark: 'Credit', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { grade: 'D7', min: 45, max: 49, remark: 'Pass', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { grade: 'E8', min: 40, max: 44, remark: 'Pass', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { grade: 'F9', min: 0, max: 39, remark: 'Fail', color: 'text-rose-600 bg-rose-50 border-rose-200' }
];

export function getGradeForScore(scorePercent: number): { grade: string; remark: string; color: string } {
  const match = WAEC_GRADING_SCALE.find(g => scorePercent >= g.min && scorePercent <= g.max);
  return match || { grade: 'F9', remark: 'Fail', color: 'text-rose-600 bg-rose-50 border-rose-200' };
}
