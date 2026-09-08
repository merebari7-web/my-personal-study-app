import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Calendar,
  Layers,
  ChevronRight,
  Download,
  Bookmark,
  BookmarkCheck,
  Award,
  Clock,
  Sparkles,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SchoolLevel, ClassLevel, Term, Subject, LessonNote } from '../types';
import { SCHOOL_LEVELS, TERMS, TERM_DETAILS, ALL_SUBJECTS } from '../data/seedCurriculum';
import { pdfService } from '../services/pdfService';
import { storageService } from '../services/storageService';

interface CurriculumExplorerProps {
  selectedLevel: SchoolLevel;
  onSelectLevel: (lvl: SchoolLevel) => void;
  selectedClass: ClassLevel;
  onSelectClass: (c: ClassLevel) => void;
  selectedSubjectId: string;
  onSelectSubjectId: (id: string) => void;
  selectedTerm: Term;
  onSelectTerm: (t: Term) => void;
  selectedWeek: number | null;
  onSelectWeek: (w: number | null) => void;
  lessonNotes: LessonNote[];
  onOpenLessonNote: (note: LessonNote) => void;
  onStartQuiz: (note: LessonNote) => void;
  onOpenSchemeOfWork: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  lowDataMode: boolean;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  selectedLevel,
  onSelectLevel,
  selectedClass,
  onSelectClass,
  selectedSubjectId,
  onSelectSubjectId,
  selectedTerm,
  onSelectTerm,
  selectedWeek,
  onSelectWeek,
  lessonNotes,
  onOpenLessonNote,
  onStartQuiz,
  onOpenSchemeOfWork,
  bookmarkedIds,
  onToggleBookmark,
  lowDataMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter subjects applicable to the current level
  const applicableSubjects = useMemo(() => {
    return ALL_SUBJECTS.filter(sub => sub.applicableLevels.includes(selectedLevel));
  }, [selectedLevel]);

  // If currently selected subject is not in applicable list, default to first
  const currentSubject = useMemo(() => {
    const found = applicableSubjects.find(s => s.id === selectedSubjectId);
    return found || applicableSubjects[0] || ALL_SUBJECTS[0];
  }, [applicableSubjects, selectedSubjectId]);

  // Categories for the current subjects
  const categories = useMemo(() => {
    const cats = new Set(applicableSubjects.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, [applicableSubjects]);

  const filteredSubjects = useMemo(() => {
    if (selectedCategory === 'All') return applicableSubjects;
    return applicableSubjects.filter(s => s.category === selectedCategory);
  }, [applicableSubjects, selectedCategory]);

  // Filter lesson notes matching Class, Subject, Term, Week and Search Query
  const filteredNotes = useMemo(() => {
    return lessonNotes.filter(note => {
      const matchLevel = note.level === selectedLevel;
      const matchClass = note.className === selectedClass;
      const matchSubject = currentSubject ? (note.subjectId === currentSubject.id || note.subjectName.toLowerCase() === currentSubject.name.toLowerCase()) : true;
      const matchTerm = note.term === selectedTerm;
      const matchWeek = selectedWeek ? note.week === selectedWeek : true;

      const matchSearch = searchQuery.trim() === '' ||
        note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subtopics.some(st => st.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.behavioralObjectives.some(bo => bo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.nerdcCode.toLowerCase().includes(searchQuery.toLowerCase());

      return matchLevel && matchClass && matchSubject && matchTerm && matchWeek && matchSearch;
    });
  }, [lessonNotes, selectedLevel, selectedClass, currentSubject, selectedTerm, selectedWeek, searchQuery]);

  const currentLevelObj = SCHOOL_LEVELS.find(l => l.id === selectedLevel) || SCHOOL_LEVELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Filter Bar: Level & Class Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Level tabs */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              1. Select School Level (UBE / SSCE)
            </label>
            <div className="flex flex-wrap gap-2">
              {SCHOOL_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    onSelectLevel(lvl.id);
                    onSelectClass(lvl.classes[0]);
                    const subs = ALL_SUBJECTS.filter(s => s.applicableLevels.includes(lvl.id));
                    if (subs.length > 0) onSelectSubjectId(subs[0].id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {lvl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Class Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              2. Select Class / Grade
            </label>
            <div className="flex flex-wrap gap-1.5">
              {currentLevelObj.classes.map(c => (
                <button
                  key={c}
                  onClick={() => onSelectClass(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedClass === c
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar (Subjects) + Right Content (Terms & Topics) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Subject Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">NERDC Subjects</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {applicableSubjects.length} Available
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Subject List */}
            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredSubjects.map(sub => {
                const isSelected = currentSubject && currentSubject.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSubjectId(sub.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                      <span className="truncate">{sub.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">
                      {sub.code}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Scheme of Work Button */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={onOpenSchemeOfWork}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                <span>View Full Scheme of Work</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Term Selector, Week Selector & Topic Cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* Term Selector Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {selectedClass} — {currentSubject?.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold">
                    {currentSubject?.code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standard NERDC Curriculum • Organized by Term and Week
                </p>
              </div>

              {/* Term Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {TERMS.map(term => (
                  <button
                    key={term}
                    onClick={() => onSelectTerm(term)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTerm === term
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Term Information Bar */}
            <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-3 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold text-emerald-950">
                  {TERM_DETAILS[selectedTerm].title}
                </span>
                <span className="text-emerald-700">({TERM_DETAILS[selectedTerm].months})</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium hidden sm:inline">
                {TERM_DETAILS[selectedTerm].totalWeeks} Academic Weeks
              </span>
            </div>

            {/* Week Filter Pills (Weeks 1 to 12) */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Filter by Week:
                </span>
                {selectedWeek !== null && (
                  <button
                    onClick={() => onSelectWeek(null)}
                    className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
                  >
                    Show All Weeks
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectWeek(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedWeek === null
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  All Weeks
                </button>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(wk => (
                  <button
                    key={wk}
                    onClick={() => onSelectWeek(wk)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedWeek === wk
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {wk === 7 ? 'Wk 7 (Midterm)' : `Wk ${wk}`}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Explorer Search Box */}
            <div className="mt-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${currentSubject?.name} topics, objectives, or keywords...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Topics & Lesson Notes Grid */}
          <div>
            {filteredNotes.length > 0 ? (
              <div className="space-y-4">
                {filteredNotes.map(note => {
                  const isBookmarked = bookmarkedIds.includes(note.id);
                  return (
                    <div
                      key={note.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition-all group"
                    >
                      {/* Topic Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Week {note.week}
                            </span>
                            <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {note.nerdcCode}
                            </span>
                            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              {note.bloomLevel}
                            </span>
                          </div>
                          <h3
                            onClick={() => onOpenLessonNote(note)}
                            className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
                          >
                            {note.topic}
                          </h3>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={() => onToggleBookmark(note.id)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-50 text-amber-600 border-amber-300'
                              : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson Note'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Subtopics Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {note.subtopics.map((st, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            • {st}
                          </span>
                        ))}
                      </div>

                      {/* Behavioral Objectives Snapshot */}
                      <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs">
                        <p className="font-bold text-slate-700 mb-1">Behavioral Objectives:</p>
                        <ul className="space-y-1 text-slate-600">
                          {note.behavioralObjectives.slice(0, 2).map((obj, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center space-x-3 text-xs text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{note.duration}</span>
                          </span>
                          <span>•</span>
                          <span>{note.period}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Export PDF */}
                          <button
                            onClick={() => pdfService.exportLessonNotePDF(note, storageService.getSchoolName())}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold transition-colors cursor-pointer"
                            title="Download Official PDF Lesson Plan"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">PDF Export</span>
                          </button>

                          {/* Quick CBT Quiz button if available */}
                          {note.cbtQuestions && note.cbtQuestions.length > 0 && (
                            <button
                              onClick={() => onStartQuiz(note)}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5 text-purple-600" />
                              <span>Practice CBT</span>
                            </button>
                          )}

                          {/* Read Full Note */}
                          <button
                            onClick={() => onOpenLessonNote(note)}
                            className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <span>Read Lesson Note</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state / Fallback placeholder when no custom note authored for that exact filter */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Syllabus Scheme Active for {selectedClass} — {currentSubject?.name} ({selectedTerm})
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    The 12-week NERDC Scheme of Work for this subject is fully registered. You can view or generate the complete weekly curriculum grid or author a custom lesson note.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={onOpenSchemeOfWork}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>View 12-Week Scheme of Work</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
