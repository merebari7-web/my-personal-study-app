import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  FileSpreadsheet,
  Download,
  Users,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  Trash2,
  Edit,
  FileText,
  Printer,
  ChevronRight
} from 'lucide-react';
import { LessonNote, ClassLevel, Term, SchoolLevel } from '../types';
import { pdfService } from '../services/pdfService';
import { storageService } from '../services/storageService';

interface TeacherDashboardProps {
  lessonNotes: LessonNote[];
  onAddLessonNote: (note: LessonNote) => void;
  onDeleteLessonNote: (id: string) => void;
  onOpenLessonNote: (note: LessonNote) => void;
  onOpenSchemeOfWork: () => void;
  lowDataMode: boolean;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lessonNotes,
  onAddLessonNote,
  onDeleteLessonNote,
  onOpenLessonNote,
  onOpenSchemeOfWork,
  lowDataMode
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-notes' | 'gradebook' | 'schedule'>('my-notes');

  // Form State for creating custom lesson note
  const [formData, setFormData] = useState({
    topic: '',
    className: 'SSS 1' as ClassLevel,
    subjectName: 'General Mathematics',
    subjectId: 'maths-ss',
    term: '1st Term' as Term,
    week: 1,
    duration: '80 Minutes (Double Period)',
    period: '1st & 2nd Period',
    subtopics: '',
    nerdcCode: 'NERDC-CUSTOM-2026',
    bloomLevel: 'Application & Synthesis',
    behavioralObjectives: '',
    previousKnowledge: '',
    instructionalMaterials: '',
    step1Title: 'Step 1: Introduction & Revision of Previous Knowledge',
    step1Teacher: 'Introduces the lesson topic using everyday Nigerian examples.',
    step1Learner: 'Listen attentively and respond to leading questions.',
    step1Content: 'Fundamental conceptual definitions and background explanations.',
    step2Title: 'Step 2: Core Concept Presentation & Rules',
    step2Teacher: 'Explains principles and demonstrates solutions step by step on the board.',
    step2Learner: 'Take notes and attempt guided practice questions.',
    step2Content: 'Detailed academic theory and application guidelines.',
    step3Title: 'Step 3: Class Activity & Evaluation',
    step3Teacher: 'Evaluates understanding through oral drills and group problem solving.',
    step3Learner: 'Participate in group task and solve evaluation problems.',
    step3Content: 'Summary of key takeaways and conclusions.',
    workedExampleProblem: '',
    workedExampleSolution: '',
    evaluationQuestions: '',
    assignment: ''
  });

  const schoolName = storageService.getSchoolName();

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lvl: SchoolLevel = formData.className.startsWith('Basic')
      ? 'primary'
      : formData.className.startsWith('JSS')
      ? 'junior_secondary'
      : 'senior_secondary';

    const newNote: LessonNote = {
      id: `custom-note-${Date.now()}`,
      topicId: `custom-top-${Date.now()}`,
      subjectId: formData.subjectId,
      subjectName: formData.subjectName,
      level: lvl,
      className: formData.className,
      term: formData.term,
      week: Number(formData.week),
      duration: formData.duration,
      period: formData.period,
      topic: formData.topic || 'Untitled Lesson Topic',
      subtopics: formData.subtopics ? formData.subtopics.split('\n').filter(s => s.trim()) : ['General Overview'],
      nerdcCode: formData.nerdcCode,
      bloomLevel: formData.bloomLevel,
      behavioralObjectives: formData.behavioralObjectives
        ? formData.behavioralObjectives.split('\n').filter(s => s.trim())
        : ['Explain the fundamental concept of the topic', 'Solve practical problems accurately'],
      previousKnowledge: formData.previousKnowledge || 'Learners have basic background knowledge from earlier terms.',
      instructionalMaterials: formData.instructionalMaterials
        ? formData.instructionalMaterials.split('\n').filter(s => s.trim())
        : ['Textbook', 'Chalkboard / Whiteboard', 'Charts & Visual Aids'],
      lessonPresentation: [
        {
          stepNumber: 1,
          title: formData.step1Title,
          teacherActivity: formData.step1Teacher,
          learnerActivity: formData.step1Learner,
          content: formData.step1Content
        },
        {
          stepNumber: 2,
          title: formData.step2Title,
          teacherActivity: formData.step2Teacher,
          learnerActivity: formData.step2Learner,
          content: formData.step2Content
        },
        {
          stepNumber: 3,
          title: formData.step3Title,
          teacherActivity: formData.step3Teacher,
          learnerActivity: formData.step3Learner,
          content: formData.step3Content
        }
      ],
      workedExamples: formData.workedExampleProblem ? [
        {
          title: 'Model Worked Example',
          problem: formData.workedExampleProblem,
          solution: formData.workedExampleSolution || 'Detailed solution steps.'
        }
      ] : [],
      classActivities: [
        {
          taskTitle: 'Pair Problem Solving Task',
          type: 'Pair Work',
          instructions: 'Work in pairs to solve classroom practice questions and cross-check solutions.',
          timeAllocation: '10 Minutes'
        }
      ],
      evaluationQuestions: formData.evaluationQuestions
        ? formData.evaluationQuestions.split('\n').filter(s => s.trim())
        : ['1. Define the main concepts learned today.', '2. Solve the class test problem.'],
      assignment: formData.assignment || 'Complete exercises 1 to 5 in your standard course textbook for next class submission.',
      summaryNotes: 'Comprehensive mastery of the lesson content aligns with standard NERDC terminal syllabus requirements.',
      referenceBooks: ['Standard Nigerian Curriculum Approved Textbooks'],
      status: 'published',
      author: 'Mr. Emmanuel Adeyemi',
      authorRole: 'Subject Teacher',
      updatedAt: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    onAddLessonNote(newNote);
    setShowCreateModal(false);
  };

  const sampleGradebook = [
    { student: 'Chiamaka Okon', class: 'SSS 2', quiz: 'Maths Quadratic Eq', score: '92%', grade: 'A1', status: 'Submitted' },
    { student: 'Tunde Ibrahim', class: 'SSS 2', quiz: 'Physics Vectors', score: '88%', grade: 'A1', status: 'Submitted' },
    { student: 'Emeka Nwosu', class: 'SSS 1', quiz: 'Number Bases', score: '74%', grade: 'B2', status: 'Submitted' },
    { student: 'Fatima Bello', class: 'SSS 2', quiz: 'English Legal Lexis', score: '85%', grade: 'A1', status: 'Submitted' },
    { student: 'Blessing Adebayo', class: 'SSS 1', quiz: 'Chemistry Atoms', score: '68%', grade: 'B3', status: 'Submitted' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Teacher Profile Card */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-blue-400">
              EA
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black">Mr. Emmanuel Adeyemi</h1>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Teacher Pro
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Senior Science Master • {schoolName}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-blue-100">
                  Subjects: General Mathematics, Further Mathematics, Physics
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Lesson Note</span>
            </button>

            <button
              onClick={onOpenSchemeOfWork}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-300" />
              <span>Scheme of Work</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-blue-300 text-[11px] block">Total Lesson Notes</span>
            <span className="text-xl font-black text-white">{lessonNotes.length} Notes</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-blue-300 text-[11px] block">Active Classes</span>
            <span className="text-xl font-black text-white">4 Grade Levels</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-blue-300 text-[11px] block">Student Quizzes Marked</span>
            <span className="text-xl font-black text-white">128 Tests</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-blue-300 text-[11px] block">Curriculum Alignment</span>
            <span className="text-xl font-black text-emerald-400">100% NERDC</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('my-notes')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'my-notes'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Lesson Notes Library ({lessonNotes.length})
        </button>
        <button
          onClick={() => setActiveTab('gradebook')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'gradebook'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Continuous Assessment Gradebook
        </button>
      </div>

      {/* Tab 1: Lesson Notes */}
      {activeTab === 'my-notes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessonNotes.map(note => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {note.className} • {note.term}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Wk {note.week}
                    </span>
                    {note.isCustom && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        Custom Note
                      </span>
                    )}
                  </div>

                  {note.isCustom && (
                    <button
                      onClick={() => onDeleteLessonNote(note.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete Custom Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3
                  onClick={() => onOpenLessonNote(note)}
                  className="text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer mb-2"
                >
                  {note.topic}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {note.behavioralObjectives.join(' • ')}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400">{note.updatedAt}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => pdfService.exportLessonNotePDF(note, schoolName)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenLessonNote(note)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                    >
                      View Note
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Gradebook */}
      {activeTab === 'gradebook' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Recent Student CBT Quiz & Assignment Submissions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-3 rounded-l-lg">Student Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Topic / Test</th>
                  <th className="p-3">CBT Score</th>
                  <th className="p-3">WAEC Grade</th>
                  <th className="p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sampleGradebook.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.student}</td>
                    <td className="p-3 text-slate-600">{row.class}</td>
                    <td className="p-3 text-slate-800">{row.quiz}</td>
                    <td className="p-3 font-bold text-emerald-700">{row.score}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {row.grade}
                      </span>
                    </td>
                    <td className="p-3 text-emerald-600 font-medium">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Custom Lesson Note */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Author New NERDC Lesson Note
                </h2>
                <p className="text-xs text-slate-500">
                  Structured according to Nigerian Ministry of Education lesson plan requirements.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-900 text-sm font-bold p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class / Grade</label>
                  <select
                    value={formData.className}
                    onChange={e => setFormData({ ...formData, className: e.target.value as ClassLevel })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="SSS 1">SSS 1</option>
                    <option value="SSS 2">SSS 2</option>
                    <option value="SSS 3">SSS 3</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="Basic 5">Basic 5</option>
                    <option value="Basic 6">Basic 6</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={formData.subjectName}
                    onChange={e => setFormData({ ...formData, subjectName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="General Mathematics">General Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                    <option value="Basic Science">Basic Science</option>
                    <option value="Basic Technology">Basic Technology</option>
                    <option value="Basic Mathematics">Basic Mathematics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Term</label>
                  <select
                    value={formData.term}
                    onChange={e => setFormData({ ...formData, term: e.target.value as Term })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 font-semibold"
                  >
                    <option value="1st Term">1st Term</option>
                    <option value="2nd Term">2nd Term</option>
                    <option value="3rd Term">3rd Term</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Week (1-12)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.week}
                    onChange={e => setFormData({ ...formData, week: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Period</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={e => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lesson Topic Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Simultaneous Linear and Quadratic Equations"
                  value={formData.topic}
                  onChange={e => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Behavioral Objectives (1 per line)</label>
                <textarea
                  rows={3}
                  placeholder="1. Define the topic principles...&#10;2. Apply the formula to solve equations...&#10;3. Relate concept to Nigerian practical life..."
                  value={formData.behavioralObjectives}
                  onChange={e => setFormData({ ...formData, behavioralObjectives: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Previous Knowledge / Entry Behaviour</label>
                <textarea
                  rows={2}
                  placeholder="Students have basic prior knowledge of..."
                  value={formData.previousKnowledge}
                  onChange={e => setFormData({ ...formData, previousKnowledge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Instructional Materials (1 per line)</label>
                <textarea
                  rows={2}
                  placeholder="Chalkboard & mathematical instruments&#10;Charts showing formulas"
                  value={formData.instructionalMaterials}
                  onChange={e => setFormData({ ...formData, instructionalMaterials: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Step 1 Presentation: Teacher's Explanation</label>
                <textarea
                  rows={3}
                  placeholder="Content details for step 1 presentation..."
                  value={formData.step1Content}
                  onChange={e => setFormData({ ...formData, step1Content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Take-Home Assignment</label>
                <textarea
                  rows={2}
                  placeholder="Homework exercises for students..."
                  value={formData.assignment}
                  onChange={e => setFormData({ ...formData, assignment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                >
                  Save & Publish Lesson Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
