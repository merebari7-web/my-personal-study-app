export type SchoolLevel = 'primary' | 'junior_secondary' | 'senior_secondary';

export type ClassLevel =
  | 'Basic 1'
  | 'Basic 2'
  | 'Basic 3'
  | 'Basic 4'
  | 'Basic 5'
  | 'Basic 6'
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3'
  | 'SSS 1'
  | 'SSS 2'
  | 'SSS 3';

export type Term = '1st Term' | '2nd Term' | '3rd Term';

export type SubjectCategory =
  | 'General'
  | 'Science'
  | 'Arts & Humanities'
  | 'Commercial'
  | 'Pre-Vocational'
  | 'Languages';

export interface Subject {
  id: string;
  name: string;
  code: string;
  category: SubjectCategory;
  applicableLevels: SchoolLevel[];
  applicableClasses: ClassLevel[];
  description: string;
  icon: string;
  color: string;
  totalLessonNotesCount: number;
}

export interface LessonPresentationStep {
  stepNumber: number;
  title: string;
  teacherActivity: string;
  learnerActivity: string;
  content: string;
  durationMinutes?: number;
}

export interface WorkedExample {
  title: string;
  problem: string;
  solution: string;
  explanation?: string;
}

export interface ClassActivity {
  taskTitle: string;
  type: 'Individual' | 'Pair Work' | 'Group Work' | 'Practical Demonstration';
  instructions: string;
  timeAllocation: string;
}

export interface CBTQuestion {
  id: string;
  topicId?: string;
  subject: string;
  className: ClassLevel;
  term: Term;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examStandard: 'BECE' | 'WAEC' | 'JAMB/UTME' | 'NECO' | 'National Common Entrance';
}

export interface LessonNote {
  id: string;
  topicId: string;
  subjectId: string;
  subjectName: string;
  level: SchoolLevel;
  className: ClassLevel;
  term: Term;
  week: number;
  duration: string;
  period: string;
  topic: string;
  subtopics: string[];
  nerdcCode: string;
  bloomLevel: string;
  behavioralObjectives: string[];
  previousKnowledge: string;
  instructionalMaterials: string[];
  lessonPresentation: LessonPresentationStep[];
  workedExamples: WorkedExample[];
  classActivities: ClassActivity[];
  evaluationQuestions: string[];
  assignment: string;
  summaryNotes: string;
  teacherGuideNotes?: string;
  referenceBooks: string[];
  status: 'published' | 'draft' | 'under_review';
  author: string;
  authorRole: string;
  updatedAt: string;
  cbtQuestions?: CBTQuestion[];
  isCustom?: boolean;
}

export interface SchemeOfWorkWeek {
  week: number;
  topic: string;
  subtopics: string[];
  behavioralObjectives: string[];
  instructionalMaterials: string[];
  teacherActivities: string;
  learnerActivities: string;
  evaluation: string;
  period: string;
}

export interface SchemeOfWork {
  id: string;
  subjectId: string;
  subjectName: string;
  className: ClassLevel;
  term: Term;
  academicSession: string;
  weeks: SchemeOfWorkWeek[];
}

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface Ward {
  id: string;
  name: string;
  className: ClassLevel;
  avatar: string;
  overallScore: number;
  completedNotesCount: number;
  recentQuiz: { subject: string; score: number; date: string };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  schoolName?: string;
  className?: ClassLevel;
  subjectsTaught?: string[];
  wards?: Ward[];
  studyStreakDays?: number;
  cbtScoreAvg?: number;
  subscriptionTier: 'free' | 'teacher_pro' | 'school_license';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceNaira: number;
  billingCycle: 'monthly' | 'per_term' | 'annual';
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface CBTQuizSession {
  id: string;
  title: string;
  subject: string;
  className: ClassLevel;
  term: Term;
  totalQuestions: number;
  timeLimitMinutes: number;
  questions: CBTQuestion[];
}

export interface QuizAttemptResult {
  id: string;
  quizTitle: string;
  subject: string;
  className: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  waecGrade: string;
  timeSpentSeconds: number;
  answers: { [questionId: string]: number };
}
