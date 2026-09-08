import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  BookOpen,
  Edit3,
  Check,
  Plus
} from 'lucide-react';
import { SchoolLevel, ClassLevel, Term, Subject, SchemeOfWork, SchemeOfWorkWeek } from '../types';
import { SCHOOL_LEVELS, TERMS, TERM_DETAILS, ALL_SUBJECTS } from '../data/seedCurriculum';
import { SEED_SCHEMES_OF_WORK } from '../data/seedSchemesOfWork';
import { pdfService } from '../services/pdfService';
import { storageService } from '../services/storageService';

interface SchemeOfWorkGeneratorProps {
  initialClass?: ClassLevel;
  initialSubjectId?: string;
  initialTerm?: Term;
  lowDataMode: boolean;
}

export const SchemeOfWorkGenerator: React.FC<SchemeOfWorkGeneratorProps> = ({
  initialClass = 'SSS 1',
  initialSubjectId = 'maths-ss',
  initialTerm = '1st Term',
  lowDataMode
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(initialClass);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId);
  const [selectedTerm, setSelectedTerm] = useState<Term>(initialTerm);
  const [academicSession, setAcademicSession] = useState<string>('2026/2027 Academic Session');
  const [editingWeek, setEditingWeek] = useState<number | null>(null);

  // Derive school level from class
  const schoolLevel = useMemo<SchoolLevel>(() => {
    if (selectedClass.startsWith('Basic')) return 'primary';
    if (selectedClass.startsWith('JSS')) return 'junior_secondary';
    return 'senior_secondary';
  }, [selectedClass]);

  const applicableSubjects = useMemo(() => {
    return ALL_SUBJECTS.filter(s => s.applicableLevels.includes(schoolLevel));
  }, [schoolLevel]);

  const currentSubject = useMemo(() => {
    return applicableSubjects.find(s => s.id === selectedSubjectId) || applicableSubjects[0] || ALL_SUBJECTS[0];
  }, [applicableSubjects, selectedSubjectId]);

  // Find or generate 12-week scheme of work
  const currentScheme = useMemo<SchemeOfWork>(() => {
    const existing = SEED_SCHEMES_OF_WORK.find(
      s => s.className === selectedClass && s.subjectId === currentSubject.id && s.term === selectedTerm
    );

    if (existing) {
      return existing;
    }

    // Dynamic standard generator if specific seed not pre-authored
    const generatedWeeks: SchemeOfWorkWeek[] = Array.from({ length: 12 }, (_, i) => {
      const wkNum = i + 1;
      if (wkNum === 7) {
        return {
          week: 7,
          topic: 'MID-TERM BREAK & CONTINUOUS ASSESSMENT TEST (CAT)',
          subtopics: ['Revision of Weeks 1-6', 'Mid-Term CBT Examination', 'Open Day Review'],
          behavioralObjectives: ['Assess learning comprehension of topics covered in 1st half of term'],
          instructionalMaterials: ['CBT Portal & Printed Test Scripts'],
          teacherActivities: 'Administers mid-term test and reviews difficult questions.',
          learnerActivities: 'Take mid-term exam and evaluate performance.',
          evaluation: 'Mid-Term Continuous Assessment (30 marks)',
          period: 'Assessment Week'
        };
      }
      if (wkNum === 11) {
        return {
          week: 11,
          topic: 'REVISION OF TERM SYLLABUS & MOCK REHEARSAL',
          subtopics: ['Review of all terminal topics', 'Past questions problem-solving clinic'],
          behavioralObjectives: ['Consolidate subject knowledge and improve exam readiness'],
          instructionalMaterials: ['WAEC/BECE past question booklets'],
          teacherActivities: 'Facilitates revision workshop and past question drill.',
          learnerActivities: 'Solve timed past question sets individually.',
          evaluation: 'End of term mock CBT quiz',
          period: 'Double Period (80 mins)'
        };
      }
      if (wkNum === 12) {
        return {
          week: 12,
          topic: 'TERMINAL EXAMINATION, MARKING & RECORDING',
          subtopics: ['End of term examinations', 'Collation of CA and Exam scores'],
          behavioralObjectives: ['Demonstrate overall terminal achievement in subject curriculum'],
          instructionalMaterials: ['Official examination scripts'],
          teacherActivities: 'Invigilates and marks exam scripts according to NERDC standard.',
          learnerActivities: 'Sit for terminal examinations.',
          evaluation: 'Terminal Exam (70% + 30% CA = 100%)',
          period: 'Examination Week'
        };
      }

      // Default week pattern based on subject
      return {
        week: wkNum,
        topic: `${currentSubject.name}: Topic Module ${wkNum}`,
        subtopics: ['Key theoretical concepts', 'Practical applications in Nigeria', 'Problem-solving exercises'],
        behavioralObjectives: [
          `Define core principles of Module ${wkNum}`,
          `Explain real-life applications in Nigerian society`,
          `Solve standard examination problems correctly`
        ],
        instructionalMaterials: ['Standard textbook', 'Chalkboard / Charts', 'Visual specimens'],
        teacherActivities: `Explains theoretical framework and demonstrates step-by-step solutions for Module ${wkNum}.`,
        learnerActivities: 'Take notes, answer teacher questions, and work on guided class exercises in pairs.',
        evaluation: `Weekly continuous assessment quiz on Module ${wkNum}`,
        period: 'Double Period (80 mins)'
      };
    });

    return {
      id: `sow-${selectedClass}-${currentSubject.id}-${selectedTerm}`.toLowerCase().replace(/\s+/g, '-'),
      subjectId: currentSubject.id,
      subjectName: currentSubject.name,
      className: selectedClass,
      term: selectedTerm,
      academicSession: academicSession,
      weeks: generatedWeeks
    };
  }, [selectedClass, currentSubject, selectedTerm, academicSession]);

  const schoolName = storageService.getSchoolName();

  const handleExportPDF = () => {
    pdfService.exportSchemeOfWorkPDF(currentScheme, schoolName);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/50 text-xs font-semibold text-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>NERDC 12-Week Scheme of Work Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Nigerian Educational Scheme of Work Generator
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Generate, customize, and download official 12-week Nigerian Ministry of Education Schemes of Work ready for print or PDF export with school approval blocks.
          </p>
        </div>
      </div>

      {/* Control Panel: Class, Subject, Term */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Class Selector */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              1. School Class / Grade
            </label>
            <select
              value={selectedClass}
              onChange={e => {
                const newClass = e.target.value as ClassLevel;
                setSelectedClass(newClass);
                const lvl: SchoolLevel = newClass.startsWith('Basic') ? 'primary' : newClass.startsWith('JSS') ? 'junior_secondary' : 'senior_secondary';
                const subs = ALL_SUBJECTS.filter(s => s.applicableLevels.includes(lvl));
                if (subs.length > 0) setSelectedSubjectId(subs[0].id);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <optgroup label="Senior Secondary (SSS 1 - 3)">
                <option value="SSS 1">SSS 1</option>
                <option value="SSS 2">SSS 2</option>
                <option value="SSS 3">SSS 3</option>
              </optgroup>
              <optgroup label="Junior Secondary (JSS 1 - 3)">
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="JSS 3">JSS 3</option>
              </optgroup>
              <optgroup label="Primary School (Basic 1 - 6)">
                <option value="Basic 1">Basic 1</option>
                <option value="Basic 2">Basic 2</option>
                <option value="Basic 3">Basic 3</option>
                <option value="Basic 4">Basic 4</option>
                <option value="Basic 5">Basic 5</option>
                <option value="Basic 6">Basic 6</option>
              </optgroup>
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              2. NERDC Subject
            </label>
            <select
              value={currentSubject.id}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {applicableSubjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Term Selector */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              3. Academic Term
            </label>
            <select
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value as Term)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {TERMS.map(t => (
                <option key={t} value={t}>
                  {t} ({TERM_DETAILS[t].months})
                </option>
              ))}
            </select>
          </div>

          {/* Academic Session */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              4. Academic Session
            </label>
            <input
              type="text"
              value={academicSession}
              onChange={e => setAcademicSession(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <span className="font-bold text-emerald-800">{currentScheme.weeks.length} Weeks</span>
            <span>•</span>
            <span>{TERM_DETAILS[selectedTerm].description}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Scheme</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF Scheme of Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scheme of Work Document Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-hidden">
        {/* Table Document Header */}
        <div className="text-center pb-6 mb-6 border-b border-slate-200">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase">
            {schoolName}
          </h2>
          <p className="text-sm font-bold text-emerald-800 mt-1">
            NERDC 12-WEEK SCHEME OF WORK — {selectedClass.toUpperCase()} {currentSubject.name.toUpperCase()}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Term: {selectedTerm} ({TERM_DETAILS[selectedTerm].months}) • Academic Session: {academicSession}
          </p>
        </div>

        {/* 12-Week Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-800 text-white font-bold">
                <th className="p-3 rounded-tl-xl w-14">Week</th>
                <th className="p-3 w-48">Topic / Subtopics</th>
                <th className="p-3 w-64">Behavioral Objectives</th>
                <th className="p-3 w-48">Instructional Materials</th>
                <th className="p-3 w-56">Teacher & Learner Activities</th>
                <th className="p-3 rounded-tr-xl w-44">Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentScheme.weeks.map(item => (
                <tr
                  key={item.week}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    item.week === 7 ? 'bg-amber-50/60 font-semibold' : item.week % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'
                  }`}
                >
                  <td className="p-3 align-top font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px]">
                      Wk {item.week}
                    </span>
                  </td>

                  <td className="p-3 align-top font-bold text-slate-900">
                    <div className="text-xs text-emerald-950 mb-1">{item.topic}</div>
                    {item.subtopics && item.subtopics.length > 0 && (
                      <ul className="text-[11px] font-normal text-slate-500 space-y-0.5">
                        {item.subtopics.map((st, i) => (
                          <li key={i}>• {st}</li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="p-3 align-top text-slate-700">
                    <ul className="space-y-1">
                      {item.behavioralObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-3 align-top text-slate-600">
                    <div className="space-y-0.5">
                      {item.instructionalMaterials.map((mat, i) => (
                        <div key={i} className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 inline-block mr-1 mb-1">
                          {mat}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 align-top text-slate-700 text-[11px] space-y-1">
                    <div>
                      <strong className="text-blue-700 font-semibold">Teacher: </strong>
                      <span>{item.teacherActivities}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-700 font-semibold">Learner: </strong>
                      <span>{item.learnerActivities}</span>
                    </div>
                  </td>

                  <td className="p-3 align-top text-slate-700 text-[11px]">
                    <span className="p-1.5 bg-slate-100 rounded block border border-slate-200">
                      {item.evaluation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Approval Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-800 uppercase mb-4">Subject Teacher / Head of Department:</p>
            <div className="border-b border-slate-300 w-56 mb-1"></div>
            <p className="text-[11px]">Signature & Date</p>
          </div>
          <div>
            <p className="font-bold text-slate-800 uppercase mb-4">Principal / Vice-Principal Academics Approval:</p>
            <div className="border-b border-slate-300 w-56 mb-1"></div>
            <p className="text-[11px]">Official School Stamp & Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};
