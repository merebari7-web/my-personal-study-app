import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Layers,
  Printer,
  ChevronRight,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CBTQuestion, ClassLevel, Term, LessonNote, QuizAttemptResult } from '../types';
import { ALL_CBT_QUESTIONS } from '../data/seedCBTQuestions';
import { getGradeForScore } from '../data/seedCurriculum';
import { storageService } from '../services/storageService';

interface CBTQuizEngineProps {
  initialNote?: LessonNote | null;
  onFinish?: () => void;
  lowDataMode: boolean;
}

export const CBTQuizEngine: React.FC<CBTQuizEngineProps> = ({
  initialNote,
  onFinish,
  lowDataMode
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialNote ? initialNote.subjectName : 'General Mathematics');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(initialNote ? initialNote.className : 'SSS 1');
  const [examMode, setExamMode] = useState<'timed' | 'practice'>('timed');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [questionId: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes default
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttemptResult | null>(null);

  // Available questions filtered by subject and class (or initial note)
  const activeQuestions = useMemo<CBTQuestion[]>(() => {
    if (initialNote && initialNote.cbtQuestions && initialNote.cbtQuestions.length > 0) {
      return initialNote.cbtQuestions;
    }

    const filtered = ALL_CBT_QUESTIONS.filter(
      q => q.subject.toLowerCase() === selectedSubject.toLowerCase()
    );

    return filtered.length > 0 ? filtered : ALL_CBT_QUESTIONS.slice(0, 5);
  }, [initialNote, selectedSubject]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizCompleted || examMode !== 'timed') return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, examMode]);

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (quizCompleted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    activeQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const gradeObj = getGradeForScore(percentage);

    const timeSpent = examMode === 'timed' ? (600 - secondsRemaining) : 120;

    const result: QuizAttemptResult = {
      id: `attempt-${Date.now()}`,
      quizTitle: initialNote ? `${initialNote.topic} - CBT Practice` : `${selectedSubject} (${selectedClass}) CBT Mock Exam`,
      subject: initialNote ? initialNote.subjectName : selectedSubject,
      className: initialNote ? initialNote.className : selectedClass,
      date: new Date().toISOString().split('T')[0],
      score,
      totalQuestions: total,
      percentage,
      waecGrade: gradeObj.grade,
      timeSpentSeconds: timeSpent,
      answers: userAnswers
    };

    setQuizResult(result);
    setQuizCompleted(true);
    storageService.saveQuizAttempt(result);

    // Trigger celebratory confetti if passed with credit/distinction
    if (percentage >= 50 && !lowDataMode) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRetake = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setSecondsRemaining(600);
    setQuizCompleted(false);
    setQuizResult(null);
    setQuizStarted(true);
  };

  // 1. Initial Start Screen
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white mx-auto flex items-center justify-center shadow-md mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-3">
            🇳🇬 NERDC CBT TEST CENTER
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            WAEC / JAMB / BECE CBT Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Practice realistic computerized tests with authentic multiple-choice questions, instant marking, WAEC grading scale (A1 - F9), and step-by-step explanatory walkthroughs.
          </p>

          {/* Test Configuration */}
          <div className="max-w-md mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-4 mb-8">
            {!initialNote && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="General Mathematics">General Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics (Basic 7-9)">Mathematics (Basic 7-9 / JSS)</option>
                    <option value="Basic Mathematics">Basic Mathematics (Primary)</option>
                    <option value="Social Studies & Civic Education">Social Studies & Civic (Primary)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Class</label>
                  <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value as ClassLevel)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="SSS 1">SSS 1 (Senior Secondary 1)</option>
                    <option value="SSS 2">SSS 2 (Senior Secondary 2)</option>
                    <option value="SSS 3">SSS 3 (WAEC / NECO Candidate)</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3 (BECE Candidate)</option>
                    <option value="Basic 5">Basic 5 (Common Entrance)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Exam Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExamMode('timed')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                    examMode === 'timed'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Timed Mode (10 mins)
                </button>
                <button
                  type="button"
                  onClick={() => setExamMode('practice')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                    examMode === 'practice'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Practice (Untimed)
                </button>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Total Questions: <strong>{activeQuestions.length} Questions</strong></span>
              <span>Passing Grade: <strong>50% (C6 Credit)</strong></span>
            </div>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Begin Computer-Based Test</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Completed Results Screen
  if (quizCompleted && quizResult) {
    const gradeObj = getGradeForScore(quizResult.percentage);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Result Header */}
          <div className="border-b border-slate-200 pb-6 mb-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase mb-2">
              Official CBT Examination Slip
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {quizResult.quizTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Test Completed on {quizResult.date} • Duration: {Math.floor(quizResult.timeSpentSeconds / 60)}m {quizResult.timeSpentSeconds % 60}s
            </p>

            {/* Score Showcase Card */}
            <div className="mt-6 max-w-sm mx-auto bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-md">
              <div className="text-4xl sm:text-5xl font-black tracking-tight mb-1 text-amber-400">
                {quizResult.score} / {quizResult.totalQuestions}
              </div>
              <div className="text-sm font-bold text-emerald-200 mb-3">
                {quizResult.percentage}% Overall Score
              </div>

              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <span>WAEC Equivalent:</span>
                <span className="text-amber-300 font-extrabold text-sm">{gradeObj.grade} ({gradeObj.remark})</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 no-print">
            <button
              onClick={handleRetake}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Result Slip</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Return to Lesson Note</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed Question Walkthrough */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Comprehensive Question Review & Explanations
            </h3>

            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                const wasSkipped = userChoice === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : wasSkipped
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 uppercase">
                          {q.examStandard} • {q.difficulty}
                        </span>
                      </div>
                      {isCorrect ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : wasSkipped ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                          <span>Skipped</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-3">
                      {q.question}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userChoice === oIdx;
                        const isKey = q.correctIndex === oIdx;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl text-xs font-medium border flex items-center justify-between ${
                              isKey
                                ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold'
                                : isChosen && !isCorrect
                                ? 'bg-rose-100/80 border-rose-400 text-rose-950 font-bold'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </span>
                            {isKey && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                            {isChosen && !isKey && <XCircle className="w-4 h-4 text-rose-700" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanatory Walkthrough */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <strong className="text-emerald-800 font-bold">Explanatory Walkthrough: </strong>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Test Taking Screen
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Test Top Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            {currentQ.subject} • {currentQ.className}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Question {currentIndex + 1} of {activeQuestions.length}
          </h2>
        </div>

        {/* Timer */}
        {examMode === 'timed' && (
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold ${
            secondsRemaining < 120
              ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>
        )}

        {/* Finish button */}
        <button
          onClick={handleSubmitQuiz}
          className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
        >
          Submit Exam
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
            {currentQ.examStandard} STANDARD
          </span>
          <button
            onClick={handleToggleFlag}
            className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              flaggedQuestions[currentQ.id]
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'text-slate-500 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-500' : ''}`} />
            <span>{flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
          </button>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = userAnswers[currentQ.id] === oIdx;

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-2xs'
                    : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Next / Prev Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentIndex < activeQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span>Finish & Submit Exam</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Palette Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-600">
          <span>Question Palette ({activeQuestions.length} Total)</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Answered</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Flagged</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              <span>Unattempted</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeQuestions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isFlagged = flaggedQuestions[q.id];
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-slate-900 ring-offset-2'
                    : ''
                } ${
                  isFlagged
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : isAnswered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
