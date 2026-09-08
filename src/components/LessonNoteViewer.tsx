import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Printer,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  CheckCircle2,
  ListOrdered,
  HelpCircle,
  FileText,
  Clock,
  UserCheck,
  Share2,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { LessonNote } from '../types';
import { pdfService } from '../services/pdfService';
import { storageService } from '../services/storageService';

interface LessonNoteViewerProps {
  note: LessonNote;
  onBack: () => void;
  onStartQuiz: (note: LessonNote) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  lowDataMode: boolean;
}

export const LessonNoteViewer: React.FC<LessonNoteViewerProps> = ({
  note,
  onBack,
  onStartQuiz,
  isBookmarked,
  onToggleBookmark,
  lowDataMode
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'full' | 'presentation' | 'examples' | 'evaluation'>('full');

  const schoolName = storageService.getSchoolName();

  // Simple Speech synthesis for reading lesson note aloud
  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `Lesson note for ${note.className} ${note.subjectName}. Topic: ${note.topic}. ` +
          `Behavioral objectives: ${note.behavioralObjectives.join('. ')}. ` +
          `Previous knowledge: ${note.previousKnowledge}. ` +
          note.lessonPresentation.map(s => `${s.title}. ${s.content}`).join(' ');

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('Text-to-speech audio reader is not supported in this browser.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Navigation Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
          <span>Back to Curriculum</span>
        </button>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio Reader */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
            title="Read Lesson Note Aloud (Text to Speech)"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{isPlayingAudio ? 'Stop Audio' : 'Audio Reader'}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(note.id)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 text-amber-700 border border-amber-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            title="Copy Lesson Note Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
            <span>{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            title="Print Lesson Plan"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* PDF Download */}
          <button
            onClick={() => pdfService.exportLessonNotePDF(note, schoolName)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>

      {/* Main Lesson Note Card Document */}
      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-slate-900">
        {/* Official Nigerian School Document Header */}
        <div className="border-b-2 border-emerald-800 pb-6 mb-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            🇳🇬 OFFICIAL NERDC CURRICULUM LESSON NOTE PLAN
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            {schoolName}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Ministry of Education & Universal Basic Education (UBE) Standard Format
          </p>

          {/* Metadata Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Subject</span>
              <span className="font-bold text-slate-900">{note.subjectName}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Class & Term</span>
              <span className="font-bold text-slate-900">{note.className} • {note.term}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Week & Period</span>
              <span className="font-bold text-slate-900">Week {note.week} • {note.period}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Duration</span>
              <span className="font-bold text-slate-900">{note.duration}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">NERDC Code</span>
              <span className="font-mono font-bold text-emerald-800">{note.nerdcCode}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Bloom Taxonomy</span>
              <span className="font-semibold text-purple-800">{note.bloomLevel}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Prepared By</span>
              <span className="font-semibold text-slate-800">{note.author}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Date / Status</span>
              <span className="font-semibold text-slate-800">{note.updatedAt} • Verified</span>
            </div>
          </div>
        </div>

        {/* TOPIC BANNER */}
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-2xl mb-8">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block mb-1">
            Lesson Topic:
          </span>
          <h2 className="text-lg sm:text-xl font-black text-emerald-950">
            {note.topic}
          </h2>
          {note.subtopics && note.subtopics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {note.subtopics.map((st, i) => (
                <span key={i} className="text-xs bg-white text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                  {st}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Launch CBT Quiz Banner if questions exist */}
        {note.cbtQuestions && note.cbtQuestions.length > 0 && (
          <div className="no-print bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-200 text-purple-900 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">Interactive CBT Practice Test Available</h4>
                <p className="text-xs text-purple-800">{note.cbtQuestions.length} WAEC/JAMB standard questions configured for this topic.</p>
              </div>
            </div>
            <button
              onClick={() => onStartQuiz(note)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              Start CBT Exam Simulator
            </button>
          </div>
        )}

        {/* 1. BEHAVIORAL OBJECTIVES */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              Behavioral / Learning Objectives
            </h3>
          </div>
          <p className="text-xs text-slate-500 italic mb-3">
            By the end of this lesson, learners should be able to:
          </p>
          <div className="space-y-2">
            {note.behavioralObjectives.map((obj, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800">{obj}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. PREVIOUS KNOWLEDGE */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              Previous Knowledge / Entry Behaviour
            </h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
            {note.previousKnowledge}
          </div>
        </section>

        {/* 3. INSTRUCTIONAL MATERIALS */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              Instructional Materials & Teaching Aids
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {note.instructionalMaterials.map((mat, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{mat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. LESSON PRESENTATION (STEP-BY-STEP) */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              Lesson Presentation & Step-by-Step Content
            </h3>
          </div>

          <div className="space-y-6">
            {note.lessonPresentation.map(step => (
              <div key={step.stepNumber} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                {/* Step Header */}
                <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wide">
                    {step.title}
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono">
                    Step {step.stepNumber} of {note.lessonPresentation.length}
                  </span>
                </div>

                {/* Teacher vs Learner Activity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50 border-b border-slate-200 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                      Teacher's Activity
                    </span>
                    <p className="text-slate-700">{step.teacherActivity}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      Learners' Activity
                    </span>
                    <p className="text-slate-700">{step.learnerActivity}</p>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                  {step.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. WORKED EXAMPLES */}
        {note.workedExamples && note.workedExamples.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-4">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                5
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase">
                Worked Examples & WAEC Standard Solutions
              </h3>
            </div>

            <div className="space-y-4">
              {note.workedExamples.map((ex, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{ex.title}</span>
                  </div>

                  <div className="mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Problem</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{ex.problem}</p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1 font-sans">Detailed Solution</span>
                    {ex.solution}
                  </div>

                  {ex.explanation && (
                    <div className="mt-3 text-xs text-slate-600 italic bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/70">
                      <strong>Examiner's Note:</strong> {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. CLASS ACTIVITIES */}
        {note.classActivities && note.classActivities.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-4">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                6
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase">
                Classroom Activities & Guided Practice
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {note.classActivities.map((act, idx) => (
                <div key={idx} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-emerald-950">{act.taskTitle}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      {act.type} • {act.timeAllocation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{act.instructions}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. EVALUATION QUESTIONS & ASSIGNMENT */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Evaluation */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 mb-3">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                7
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase">
                Evaluation Questions
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              {note.evaluationQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-emerald-700">{idx + 1}.</span>
                  <span>{q.replace(/^[0-9]+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Assignment */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 mb-3">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                8
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase">
                Take-Home Assignment
              </h3>
            </div>
            <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
              {note.assignment}
            </div>
          </div>
        </section>

        {/* Reference Books & Summary Notes */}
        <section className="mb-8 p-4 bg-slate-100/70 rounded-2xl border border-slate-200 text-xs text-slate-700">
          <div className="mb-2">
            <span className="font-bold text-slate-900">Summary Key Takeaways: </span>
            <span>{note.summaryNotes}</span>
          </div>
          {note.referenceBooks && note.referenceBooks.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900">Approved Reference Textbooks: </span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                {note.referenceBooks.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Sign-off / Official Stamp Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-6 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-700 uppercase">Subject Teacher's Endorsement:</p>
            <div className="mt-4 border-b border-slate-300 w-48"></div>
            <p className="text-[11px] mt-1">{note.author} ({note.authorRole})</p>
          </div>
          <div>
            <p className="font-bold text-slate-700 uppercase">HOD / VP Academics Approval:</p>
            <div className="mt-4 border-b border-slate-300 w-48"></div>
            <p className="text-[11px] mt-1">Date Stamp & Signature</p>
          </div>
        </div>
      </article>
    </div>
  );
};
