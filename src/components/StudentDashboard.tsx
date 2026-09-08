import React from 'react';
import {
  GraduationCap,
  Flame,
  Award,
  BookOpen,
  BookmarkCheck,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { LessonNote, QuizAttemptResult } from '../types';

interface StudentDashboardProps {
  lessonNotes: LessonNote[];
  bookmarkedIds: string[];
  onOpenLessonNote: (note: LessonNote) => void;
  onOpenCBT: () => void;
  onOpenCurriculum: () => void;
  quizAttempts: QuizAttemptResult[];
  lowDataMode: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lessonNotes,
  bookmarkedIds,
  onOpenLessonNote,
  onOpenCBT,
  onOpenCurriculum,
  quizAttempts,
  lowDataMode
}) => {
  const bookmarkedNotes = lessonNotes.filter(n => bookmarkedIds.includes(n.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Student Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md border-2 border-amber-300">
              CO
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black">Chiamaka Okon</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-700 text-emerald-200 text-[10px] font-bold">
                  SSS 2 Science
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Queen's College, Yaba, Lagos • SSCE Candidate Track
              </p>
            </div>
          </div>

          {/* Streak & XP Badges */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div>
                <span className="text-xs font-bold text-amber-300 block">14 Days</span>
                <span className="text-[10px] text-emerald-200">Study Streak</span>
              </div>
            </div>

            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-emerald-300 block">1,450 XP</span>
                <span className="text-[10px] text-emerald-200">Curriculum Mastery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Progress Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-emerald-300 text-[11px] block">Average CBT Score</span>
            <span className="text-xl font-black text-white">88% (A1 Distinction)</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-emerald-300 text-[11px] block">Lesson Notes Read</span>
            <span className="text-xl font-black text-white">{bookmarkedIds.length + 12} Topics</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-emerald-300 text-[11px] block">CBT Tests Taken</span>
            <span className="text-xl font-black text-white">{quizAttempts.length} Tests</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-emerald-300 text-[11px] block">Target SSCE Exam</span>
            <span className="text-xl font-black text-amber-300">May/June 2027</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Bookmarks & Test History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Saved / Bookmarked Lesson Notes */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <BookmarkCheck className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900">
                  My Saved Lesson Notes ({bookmarkedNotes.length})
                </h2>
              </div>
              <button
                onClick={onOpenCurriculum}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
              >
                Browse All Notes →
              </button>
            </div>

            {bookmarkedNotes.length > 0 ? (
              <div className="space-y-3">
                {bookmarkedNotes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => onOpenLessonNote(note)}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                          {note.className} • Wk {note.week}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {note.subjectName}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {note.topic}
                      </h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                No bookmarked lesson notes yet. Click the bookmark icon on any topic to save for quick study!
              </div>
            )}
          </div>

          {/* CBT Quiz Performance History */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Recent CBT Mock Exam Records
                </h2>
              </div>
              <button
                onClick={onOpenCBT}
                className="text-xs font-bold text-purple-700 hover:text-purple-900"
              >
                Launch Exam Simulator →
              </button>
            </div>

            <div className="space-y-3">
              {quizAttempts.map(att => (
                <div
                  key={att.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 block">{att.date} • {att.subject}</span>
                    <h4 className="font-bold text-slate-900">{att.quizTitle}</h4>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-700">{att.score}/{att.totalQuestions} ({att.percentage}%)</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                      {att.waecGrade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Revision Tools & Fast Shortcuts */}
        <div className="space-y-6">
          {/* Quick CBT Practice Card */}
          <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-6 text-white shadow-md">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-bold mb-1">WAEC / JAMB Speed Rehearsal</h3>
            <p className="text-xs text-purple-200 mb-4 leading-relaxed">
              Timed 10-minute simulation with authentic past questions and instant marking.
            </p>
            <button
              onClick={onOpenCBT}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              Start Quick Quiz Now
            </button>
          </div>

          {/* Nigerian Flashcard Summary Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Daily Study Flashcard
              </h3>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 mb-3">
              <p className="font-bold text-emerald-900 mb-1">📐 Trigonometry Rule (SOH CAH TOA):</p>
              <p className="leading-relaxed">
                Sin θ = Opp / Hyp • Cos θ = Adj / Hyp • Tan θ = Opp / Adj. Remember: Angle of elevation = Angle of depression!
              </p>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center">
              New flashcard refreshes every 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
