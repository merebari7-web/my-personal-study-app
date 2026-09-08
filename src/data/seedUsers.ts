import { UserProfile, SubscriptionPlan } from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  teacher: {
    id: 'usr-teacher-01',
    name: 'Mr. Emmanuel Adeyemi',
    email: 'adeyemi.emmanuel@kingscollege.edu.ng',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    schoolName: "King's College, Lagos",
    subjectsTaught: ['General Mathematics', 'Further Mathematics', 'Physics'],
    className: 'SSS 2',
    subscriptionTier: 'teacher_pro',
    studyStreakDays: 45
  },
  student: {
    id: 'usr-student-01',
    name: 'Chiamaka Okon',
    email: 'chiamaka.okon@student.naijaedu.ng',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    schoolName: "Queen's College, Yaba, Lagos",
    className: 'SSS 2',
    studyStreakDays: 14,
    cbtScoreAvg: 82,
    subscriptionTier: 'free'
  },
  parent: {
    id: 'usr-parent-01',
    name: 'Mrs. Folake Ibrahim',
    email: 'folake.ibrahim@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    wards: [
      {
        id: 'wrd-01',
        name: 'Tunde Ibrahim',
        className: 'SSS 2',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
        overallScore: 84,
        completedNotesCount: 28,
        recentQuiz: { subject: 'General Mathematics', score: 88, date: '2026-09-06' }
      },
      {
        id: 'wrd-02',
        name: 'Amina Ibrahim',
        className: 'Basic 5',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        overallScore: 91,
        completedNotesCount: 32,
        recentQuiz: { subject: 'Basic Mathematics', score: 95, date: '2026-09-07' }
      }
    ],
    subscriptionTier: 'free'
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Yakubu Danjuma',
    email: 'danjuma.y@nerdc.gov.ng',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    schoolName: 'NERDC Curriculum Department, Abuja FCT',
    subscriptionTier: 'school_license'
  }
};

export const NAIRA_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    name: 'Free Basic Tier',
    priceNaira: 0,
    billingCycle: 'monthly',
    recommendedFor: 'Students & Casual Learners',
    features: [
      'Access to core NERDC lesson notes (online preview)',
      '5 CBT practice tests per month',
      'Basic search by subject and term',
      'Community student forum access',
      'Standard bandwidth mode'
    ]
  },
  {
    id: 'plan-teacher-pro',
    name: 'Teacher Pro Plan',
    priceNaira: 3500,
    billingCycle: 'monthly',
    popular: true,
    recommendedFor: 'Subject Teachers & Lesson Planners',
    features: [
      'Full, unrestricted access to ALL lesson notes (Basic 1 to SSS 3)',
      'Unlimited 1-Click PDF Lesson Plan Downloads with School Stamp Headers',
      'Full 12-Week NERDC Scheme of Work Generator',
      'Custom Lesson Note Builder & Online Storage',
      'Offline caching & Low-Bandwidth Mode',
      'Classroom Gradebook & Attendance Export',
      'Termly discount: ₦8,500/term (Save 19%)'
    ]
  },
  {
    id: 'plan-school-enterprise',
    name: 'School Enterprise License',
    priceNaira: 25000,
    billingCycle: 'per_term',
    recommendedFor: 'Primary & Secondary Schools, Colleges, Academies',
    features: [
      'Unlimited accounts for all Teachers, Students & Parents',
      'Custom School Logo, Motto & Header on all generated PDF Lesson Notes',
      'School-wide CBT Examination Hall Simulator with Instant Result Sheets',
      'Parent Portal with Real-Time Ward Academic Monitoring',
      'Curriculum Approval & Quality Control CMS for Vice Principals/HODs',
      'Dedicated WhatsApp & Phone Technical Support Desk',
      'Annual Session Rate: ₦70,000/session (Save ₦5,000)'
    ]
  }
];
