import React, { useState, useEffect } from 'react';
import { SchoolLevel, ClassLevel, Term, LessonNote, CBTQuestion, UserRole, QuizAttemptResult } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurriculumExplorer } from './components/CurriculumExplorer';
import { LessonNoteViewer } from './components/LessonNoteViewer';
import { SchemeOfWorkGenerator } from './components/SchemeOfWorkGenerator';
import { CBTQuizEngine } from './components/CBTQuizEngine';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminCMSPanel } from './components/AdminCMSPanel';
import { PricingModal } from './components/PricingModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export function App() {
  // Navigation & Screen state
  const [currentTab, setCurrentTab] = useState<string>('curriculum');
  const [userRole, setUserRole] = useState<UserRole>(storageService.getCurrentRole());
  const [lowDataMode, setLowDataMode] = useState<boolean>(storageService.getLowDataMode());

  // Curriculum Filter state
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel>('senior_secondary');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('SSS 1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths-ss');
  const [selectedTerm, setSelectedTerm] = useState<Term>('1st Term');
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Active Lesson Note Viewer state
  const [activeLessonNote, setActiveLessonNote] = useState<LessonNote | null>(null);
  const [activeQuizNote, setActiveQuizNote] = useState<LessonNote | null>(null);

  // Data state
  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>([]);
  const [cbtQuestions, setCbtQuestions] = useState<CBTQuestion[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptResult[]>([]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    setLessonNotes(storageService.getLessonNotes());
    setCbtQuestions(storageService.getCBTQuestions());
    setBookmarkedIds(storageService.getBookmarks());
    setQuizAttempts(storageService.getQuizAttempts());
  }, []);

  // Update storage when role or low-data mode changes
  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    storageService.setCurrentRole(role);
  };

  const handleLowDataToggle = (enabled: boolean) => {
    setLowDataMode(enabled);
    storageService.setLowDataMode(enabled);
  };

  // Lesson Note Actions
  const handleAddLessonNote = (note: LessonNote) => {
    const updated = storageService.addOrUpdateLessonNote(note);
    setLessonNotes(updated);
  };

  const handleDeleteLessonNote = (id: string) => {
    const updated = storageService.deleteLessonNote(id);
    setLessonNotes(updated);
    if (activeLessonNote && activeLessonNote.id === id) {
      setActiveLessonNote(null);
      setCurrentTab('curriculum');
    }
  };

  const handleUpdateLessonNote = (note: LessonNote) => {
    const updated = storageService.addOrUpdateLessonNote(note);
    setLessonNotes(updated);
    if (activeLessonNote && activeLessonNote.id === note.id) {
      setActiveLessonNote(note);
    }
  };

  const handleToggleBookmark = (id: string) => {
    const updated = storageService.toggleBookmark(id);
    setBookmarkedIds(updated);
  };

  const handleAddCBTQuestion = (q: CBTQuestion) => {
    const updated = storageService.addCBTQuestion(q);
    setCbtQuestions(updated);
  };

  const handleOpenLessonNote = (note: LessonNote) => {
    setActiveLessonNote(note);
    setCurrentTab('lesson-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (note: LessonNote) => {
    setActiveQuizNote(note);
    setCurrentTab('cbt-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${lowDataMode ? 'low-data-mode' : ''}`}>
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'curriculum') setActiveLessonNote(null);
        }}
        userRole={userRole}
        setUserRole={handleRoleChange}
        lowDataMode={lowDataMode}
        setLowDataMode={handleLowDataToggle}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-1">
        {/* CURRICULUM VIEW */}
        {currentTab === 'curriculum' && (
          <>
            <HeroSection
              selectedLevel={selectedLevel}
              onSelectLevel={(lvl) => {
                setSelectedLevel(lvl);
                if (lvl === 'primary') setSelectedClass('Basic 5');
                else if (lvl === 'junior_secondary') setSelectedClass('JSS 1');
                else setSelectedClass('SSS 1');
              }}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenSchemeGenerator={() => setCurrentTab('scheme-of-work')}
              onOpenCBT={() => {
                setActiveQuizNote(null);
                setCurrentTab('cbt-quiz');
              }}
            />

            <CurriculumExplorer
              selectedLevel={selectedLevel}
              onSelectLevel={setSelectedLevel}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              selectedSubjectId={selectedSubjectId}
              onSelectSubjectId={setSelectedSubjectId}
              selectedTerm={selectedTerm}
              onSelectTerm={setSelectedTerm}
              selectedWeek={selectedWeek}
              onSelectWeek={setSelectedWeek}
              lessonNotes={lessonNotes}
              onOpenLessonNote={handleOpenLessonNote}
              onStartQuiz={handleStartQuiz}
              onOpenSchemeOfWork={() => setCurrentTab('scheme-of-work')}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              lowDataMode={lowDataMode}
            />
          </>
        )}

        {/* LESSON NOTE VIEWER */}
        {currentTab === 'lesson-view' && activeLessonNote && (
          <LessonNoteViewer
            note={activeLessonNote}
            onBack={() => setCurrentTab('curriculum')}
            onStartQuiz={handleStartQuiz}
            isBookmarked={bookmarkedIds.includes(activeLessonNote.id)}
            onToggleBookmark={handleToggleBookmark}
            lowDataMode={lowDataMode}
          />
        )}

        {/* 12-WEEK SCHEME OF WORK GENERATOR */}
        {currentTab === 'scheme-of-work' && (
          <SchemeOfWorkGenerator
            initialClass={selectedClass}
            initialSubjectId={selectedSubjectId}
            initialTerm={selectedTerm}
            lowDataMode={lowDataMode}
          />
        )}

        {/* CBT QUIZ / EXAM SIMULATOR */}
        {currentTab === 'cbt-quiz' && (
          <CBTQuizEngine
            initialNote={activeQuizNote}
            onFinish={() => {
              if (activeLessonNote) {
                setCurrentTab('lesson-view');
              } else {
                setCurrentTab('curriculum');
              }
            }}
            lowDataMode={lowDataMode}
          />
        )}

        {/* ROLE-BASED DASHBOARD */}
        {currentTab === 'dashboard' && (
          <>
            {userRole === 'teacher' && (
              <TeacherDashboard
                lessonNotes={lessonNotes}
                onAddLessonNote={handleAddLessonNote}
                onDeleteLessonNote={handleDeleteLessonNote}
                onOpenLessonNote={handleOpenLessonNote}
                onOpenSchemeOfWork={() => setCurrentTab('scheme-of-work')}
                lowDataMode={lowDataMode}
              />
            )}

            {userRole === 'student' && (
              <StudentDashboard
                lessonNotes={lessonNotes}
                bookmarkedIds={bookmarkedIds}
                onOpenLessonNote={handleOpenLessonNote}
                onOpenCBT={() => {
                  setActiveQuizNote(null);
                  setCurrentTab('cbt-quiz');
                }}
                onOpenCurriculum={() => setCurrentTab('curriculum')}
                quizAttempts={quizAttempts}
                lowDataMode={lowDataMode}
              />
            )}

            {userRole === 'parent' && (
              <ParentDashboard lowDataMode={lowDataMode} />
            )}

            {userRole === 'admin' && (
              <AdminCMSPanel
                lessonNotes={lessonNotes}
                onAddLessonNote={handleAddLessonNote}
                onDeleteLessonNote={handleDeleteLessonNote}
                onUpdateLessonNote={handleUpdateLessonNote}
                cbtQuestions={cbtQuestions}
                onAddCBTQuestion={handleAddCBTQuestion}
                lowDataMode={lowDataMode}
              />
            )}
          </>
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lessonNotes={lessonNotes}
        onSelectNote={handleOpenLessonNote}
      />

      {/* Naira Subscription Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        lowDataMode={lowDataMode}
      />

      {/* Global Footer */}
      <Footer
        onSelectLevel={(lvl) => {
          setSelectedLevel(lvl);
          if (lvl === 'primary') setSelectedClass('Basic 5');
          else if (lvl === 'junior_secondary') setSelectedClass('JSS 1');
          else setSelectedClass('SSS 1');
          setCurrentTab('curriculum');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSchemeOfWork={() => {
          setCurrentTab('scheme-of-work');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCBT={() => {
          setActiveQuizNote(null);
          setCurrentTab('cbt-quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPricing={() => setIsPricingOpen(true)}
      />
    </div>
  );
}
