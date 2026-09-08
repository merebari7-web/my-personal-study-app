# 🇳🇬 NaijaEdu — Production-Ready NERDC Curriculum & Educational Portal

> **The Comprehensive Nigerian Primary (Basic 1–6) and Secondary (JSS 1–3, SSS 1–3) Curriculum Resource Hub**  
> 100% aligned with the **Nigerian Educational Research and Development Council (NERDC)** and **Universal Basic Education (UBE)** curriculum frameworks.

---

## 🌟 Overview & Key Features

**NaijaEdu** is an advanced, production-ready educational platform designed specifically for the Nigerian school ecosystem. It serves teachers, students, parents, and school administrators with comprehensive, structured curriculum resources, printable/exportable lesson plans, 12-week schemes of work, and timed WAEC/JAMB/BECE CBT exam simulators.

### 📚 1. Core Content & Curriculum Structure
- **Two School Levels & 12 Classes**:
  - **Primary Education (UBE Lower & Middle Basic)**: Basic 1, Basic 2, Basic 3, Basic 4, Basic 5, Basic 6
  - **Junior Secondary (UBE Upper Basic / BECE)**: JSS 1, JSS 2, JSS 3 (Basic 7, 8, 9)
  - **Senior Secondary (Post-Basic / SSCE, WAEC, NECO, JAMB)**: SSS 1, SSS 2, SSS 3 (Science, Commercial, Arts/Humanities, and Pre-Vocational tracks)
- **Comprehensive Subject Coverage**:
  - *Primary*: Basic Mathematics, English Studies & Phonics, Basic Science & Technology (BST), Social Studies & Civic Education, Cultural & Creative Arts (CCA), Verbal & Quantitative Reasoning.
  - *Junior Secondary*: Mathematics, English Studies, Basic Science, Basic Technology, Business Studies, Social Studies, Civic Education.
  - *Senior Secondary*: General Mathematics, Further Mathematics, English Language, Physics, Chemistry, Biology, Economics, Government, Literature-in-English, Civic Education, Data Processing & ICT, Agricultural Science.
- **3-Term Standard Nigerian Academic Calendar**:
  - **1st Term (Harmattan / Sept–Dec)**: 12 Weeks (Foundational concepts, Mid-term CAT, Terminal Exam)
  - **2nd Term (Lent / Jan–April)**: 12 Weeks (Advanced concepts, practical applications, Terminal Exam)
  - **3rd Term (Easter / April–July)**: 12 Weeks (Curriculum consolidation, Revision, Promotional Exam)
- **Standard Pedagogical Lesson Notes**:
  - Behavioral Objectives (Bloom's Taxonomy)
  - Previous Knowledge / Entry Behaviour
  - Instructional Materials & Teaching Aids
  - Step-by-Step Presentation (Steps I to V with Teacher and Learner activities)
  - Worked Examples & Real-Life Applications
  - Classroom Guided Practice (Pair / Group Work)
  - Formative Evaluation Questions
  - Take-Home Assignments & Research Tasks
  - Teacher's Guide Notes & Approved Textbook References

---

### 🚀 2. Advanced Technical Features
- **⚡ Fast, Low-Data & Low-Bandwidth Mode**: Toggle designed for Nigerian internet conditions (2G/3G connections); eliminates heavy CSS animations and optimizes DOM for minimal data consumption.
- **📄 Downloadable / Printable PDF Lesson Notes**: 1-click export of official lesson plans with school header, teacher signature line, and HOD stamp block via `jsPDF`.
- **📅 12-Week Scheme of Work Generator**: Select Level → Class → Subject → Term to generate a full 12-week NERDC formatted scheme of work ready for print or PDF export.
- **🏆 CBT Exam Simulator (WAEC / JAMB / BECE)**: Interactive timed exam mode or practice mode with question palette (Answered, Flagged, Unanswered), instant score calculation, WAEC grading scale (A1 to F9), confetti celebration, and comprehensive question explanations.
- **🔍 Multi-Level Search & Filter**: Searchable and filterable by Level → Class → Subject → Term → Week + Global instant ⌘K search modal.
- **👥 4 Role-Based Dashboards**:
  - **👨‍🏫 Teacher Dashboard**: Lesson planner, custom lesson note creator, printable lesson plans, CA gradebook, and Scheme of Work access.
  - **🎓 Student Dashboard**: Enrolled class progress, 14-day study streak, XP counter, bookmarked notes, and CBT test history.
  - **👨‍👩‍👧 Parent Dashboard**: Multi-ward monitoring (e.g. Tunde in SSS 2 & Amina in Basic 5), subject mastery bars, and direct teacher inquiry messaging.
  - **🛡️ Admin / CMS Panel**: Full curriculum management (add, edit, review, and approve lesson notes), CBT question bank manager, school branding header configuration, and platform analytics.
- **💳 Naira (₦) Subscription & School Licensing**: Transparent Naira pricing tiers (Free Basic ₦0, Teacher Pro ₦3,500/mo, School Enterprise ₦25,000/term) with simulated Paystack/Flutterwave checkout supporting Debit Cards, Virtual Bank Transfer (Wema/GTBank), and USSD (*737#).

---

## 🏗️ Architecture & Database Schema

### TypeScript Data Models (`src/types/index.ts`)

```typescript
// Lesson Note Structure
export interface LessonNote {
  id: string;
  topicId: string;
  subjectId: string;
  subjectName: string;
  level: 'primary' | 'junior_secondary' | 'senior_secondary';
  className: ClassLevel; // e.g. 'SSS 1', 'Basic 5', 'JSS 2'
  term: '1st Term' | '2nd Term' | '3rd Term';
  week: number; // 1 - 12
  duration: string; // e.g. '80 Minutes (Double Period)'
  period: string; // e.g. '1st & 2nd Period'
  topic: string;
  subtopics: string[];
  nerdcCode: string; // e.g. 'NERDC-MTH-SS1-T1-W01'
  bloomLevel: string; // e.g. 'Application and Analysis'
  behavioralObjectives: string[];
  previousKnowledge: string;
  instructionalMaterials: string[];
  lessonPresentation: Array<{
    stepNumber: number;
    title: string;
    teacherActivity: string;
    learnerActivity: string;
    content: string;
  }>;
  workedExamples: Array<{
    title: string;
    problem: string;
    solution: string;
    explanation?: string;
  }>;
  classActivities: Array<{
    taskTitle: string;
    type: 'Individual' | 'Pair Work' | 'Group Work' | 'Practical Demonstration';
    instructions: string;
    timeAllocation: string;
  }>;
  evaluationQuestions: string[];
  assignment: string;
  summaryNotes: string;
  referenceBooks: string[];
  status: 'published' | 'draft' | 'under_review';
  author: string;
  authorRole: string;
  updatedAt: string;
  cbtQuestions?: CBTQuestion[];
}

// Scheme of Work Structure
export interface SchemeOfWork {
  id: string;
  subjectId: string;
  subjectName: string;
  className: ClassLevel;
  term: Term;
  academicSession: string;
  weeks: Array<{
    week: number;
    topic: string;
    subtopics: string[];
    behavioralObjectives: string[];
    instructionalMaterials: string[];
    teacherActivities: string;
    learnerActivities: string;
    evaluation: string;
    period: string;
  }>;
}

// CBT Question Model
export interface CBTQuestion {
  id: string;
  subject: string;
  className: ClassLevel;
  term: Term;
  question: string;
  options: string[]; // 4 multiple choice options
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examStandard: 'BECE' | 'WAEC' | 'JAMB/UTME' | 'NECO' | 'National Common Entrance';
}
```

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Document & PDF Generation**: `jsPDF`, `html2canvas`
- **State & Offline Storage**: LocalStorage, IndexedDB persistence, Service Worker cache
- **Build Tooling**: Vite 8, Node.js

---

## 🛠️ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/merebari7-web/my-personal-study-app.git
cd my-personal-study-app

# Switch to the working branch
git checkout arena/01a08227-my-personal-study-app

# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 🇳🇬 Aligned National Standards
- **NERDC**: Nigerian Educational Research and Development Council
- **UBEC**: Universal Basic Education Commission
- **WAEC / WASSCE**: West African Examinations Council
- **NECO / SSCE**: National Examinations Council
- **JAMB / UTME**: Joint Admissions and Matriculation Board
- **BECE**: Basic Education Certificate Examination (Junior WAEC)

---

Developed with ❤️ for Nigerian Teachers, Students, and School Leaders.
EOF
