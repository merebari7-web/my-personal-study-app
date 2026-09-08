import { LessonNote, CBTQuestion, QuizAttemptResult, UserProfile, UserRole } from '../types';
import { SEED_LESSON_NOTES } from '../data/seedLessonNotes';
import { ADDITIONAL_LESSON_NOTES } from '../data/seedAdditionalLessonNotes';
import { ALL_CBT_QUESTIONS } from '../data/seedCBTQuestions';
import { DEMO_USERS } from '../data/seedUsers';

const COMBINED_INITIAL_NOTES = [...SEED_LESSON_NOTES, ...ADDITIONAL_LESSON_NOTES];

const STORAGE_KEYS = {
  LESSON_NOTES: 'naijaedu_lesson_notes_v2',
  CBT_QUESTIONS: 'naijaedu_cbt_questions_v2',
  SAVED_BOOKMARKS: 'naijaedu_bookmarks_v2',
  QUIZ_ATTEMPTS: 'naijaedu_quiz_attempts_v2',
  CURRENT_USER_ROLE: 'naijaedu_current_role_v2',
  LOW_DATA_MODE: 'naijaedu_low_data_mode_v2',
  CUSTOM_SCHOOL_NAME: 'naijaedu_custom_school_v2'
};

export const storageService = {
  // Lesson Notes
  getLessonNotes(): LessonNote[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LESSON_NOTES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read notes from localStorage, using seed data:', e);
    }
    // Initialize with seed data
    this.saveLessonNotes(COMBINED_INITIAL_NOTES);
    return COMBINED_INITIAL_NOTES;
  },

  saveLessonNotes(notes: LessonNote[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LESSON_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save lesson notes:', e);
    }
  },

  addOrUpdateLessonNote(note: LessonNote): LessonNote[] {
    const notes = this.getLessonNotes();
    const index = notes.findIndex(n => n.id === note.id);
    let updated: LessonNote[];
    if (index >= 0) {
      updated = [...notes];
      updated[index] = { ...note, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      updated = [{ ...note, updatedAt: new Date().toISOString().split('T')[0] }, ...notes];
    }
    this.saveLessonNotes(updated);
    return updated;
  },

  deleteLessonNote(id: string): LessonNote[] {
    const notes = this.getLessonNotes();
    const filtered = notes.filter(n => n.id !== id);
    this.saveLessonNotes(filtered);
    return filtered;
  },

  // Bookmarks
  getBookmarks(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_BOOKMARKS);
      return stored ? JSON.parse(stored) : ['ss1-math-t1-w1', 'ss2-eng-t1-w1', 'ss2-phy-t1-w2', 'pri5-civic-t1-w1'];
    } catch {
      return ['ss1-math-t1-w1', 'ss2-eng-t1-w1'];
    }
  },

  toggleBookmark(noteId: string): string[] {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(noteId);
    let updated: string[];
    if (index >= 0) {
      updated = bookmarks.filter(id => id !== noteId);
    } else {
      updated = [...bookmarks, noteId];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_BOOKMARKS, JSON.stringify(updated));
    return updated;
  },

  // CBT Questions
  getCBTQuestions(): CBTQuestion[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CBT_QUESTIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading CBT questions:', e);
    }
    localStorage.setItem(STORAGE_KEYS.CBT_QUESTIONS, JSON.stringify(ALL_CBT_QUESTIONS));
    return ALL_CBT_QUESTIONS;
  },

  addCBTQuestion(q: CBTQuestion): CBTQuestion[] {
    const questions = this.getCBTQuestions();
    const updated = [q, ...questions];
    localStorage.setItem(STORAGE_KEYS.CBT_QUESTIONS, JSON.stringify(updated));
    return updated;
  },

  // Quiz Attempts
  getQuizAttempts(): QuizAttemptResult[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      return stored ? JSON.parse(stored) : [
        {
          id: 'attempt-01',
          quizTitle: 'General Mathematics - SS1 Term 1 Quiz',
          subject: 'General Mathematics',
          className: 'SSS 1',
          date: '2026-09-07',
          score: 3,
          totalQuestions: 3,
          percentage: 100,
          waecGrade: 'A1',
          timeSpentSeconds: 95,
          answers: {}
        },
        {
          id: 'attempt-02',
          quizTitle: 'English Language - Lexis & Structure SS2',
          subject: 'English Language',
          className: 'SSS 2',
          date: '2026-09-06',
          score: 2,
          totalQuestions: 2,
          percentage: 100,
          waecGrade: 'A1',
          timeSpentSeconds: 68,
          answers: {}
        }
      ];
    } catch {
      return [];
    }
  },

  saveQuizAttempt(attempt: QuizAttemptResult): QuizAttemptResult[] {
    const attempts = this.getQuizAttempts();
    const updated = [attempt, ...attempts];
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(updated));
    return updated;
  },

  // Active User Role
  getCurrentRole(): UserRole {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ROLE);
      if (stored && ['student', 'teacher', 'parent', 'admin'].includes(stored)) {
        return stored as UserRole;
      }
    } catch {
      // fallback
    }
    return 'student';
  },

  setCurrentRole(role: UserRole): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, role);
  },

  getUserProfile(role: UserRole): UserProfile {
    return DEMO_USERS[role] || DEMO_USERS.student;
  },

  // Low Data Mode
  getLowDataMode(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.LOW_DATA_MODE) === 'true';
    } catch {
      return false;
    }
  },

  setLowDataMode(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.LOW_DATA_MODE, enabled ? 'true' : 'false');
  },

  // Custom School Name
  getSchoolName(): string {
    return localStorage.getItem(STORAGE_KEYS.CUSTOM_SCHOOL_NAME) || 'FEDERAL GOVERNMENT COLLEGE, LAGOS';
  },

  setSchoolName(name: string): void {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SCHOOL_NAME, name);
  }
};
