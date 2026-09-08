import React, { useState } from 'react';
import {
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Settings,
  Sparkles,
  Search,
  Download,
  Building
} from 'lucide-react';
import { LessonNote, CBTQuestion, UserRole, ClassLevel, Term } from '../types';
import { ALL_SUBJECTS } from '../data/seedCurriculum';
import { storageService } from '../services/storageService';

interface AdminCMSPanelProps {
  lessonNotes: LessonNote[];
  onAddLessonNote: (note: LessonNote) => void;
  onDeleteLessonNote: (id: string) => void;
  onUpdateLessonNote: (note: LessonNote) => void;
  cbtQuestions: CBTQuestion[];
  onAddCBTQuestion: (q: CBTQuestion) => void;
  lowDataMode: boolean;
}

export const AdminCMSPanel: React.FC<AdminCMSPanelProps> = ({
  lessonNotes,
  onAddLessonNote,
  onDeleteLessonNote,
  onUpdateLessonNote,
  cbtQuestions,
  onAddCBTQuestion,
  lowDataMode
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'cbt-bank' | 'school-config'>('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolNameInput, setSchoolNameInput] = useState(storageService.getSchoolName());
  const [savedSchoolNameSuccess, setSavedSchoolNameSuccess] = useState(false);

  // New CBT Question Form State
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestionData, setNewQuestionData] = useState({
    subject: 'General Mathematics',
    className: 'SSS 1' as ClassLevel,
    term: '1st Term' as Term,
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctIndex: 0,
    explanation: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    examStandard: 'WAEC' as 'WAEC' | 'JAMB/UTME' | 'BECE' | 'National Common Entrance'
  });

  const handleSaveSchoolName = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.setSchoolName(schoolNameInput);
    setSavedSchoolNameSuccess(true);
    setTimeout(() => setSavedSchoolNameSuccess(false), 2500);
  };

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q: CBTQuestion = {
      id: `cbt-custom-${Date.now()}`,
      subject: newQuestionData.subject,
      className: newQuestionData.className,
      term: newQuestionData.term,
      question: newQuestionData.question,
      options: [
        newQuestionData.optionA || 'Option A',
        newQuestionData.optionB || 'Option B',
        newQuestionData.optionC || 'Option C',
        newQuestionData.optionD || 'Option D'
      ],
      correctIndex: Number(newQuestionData.correctIndex),
      explanation: newQuestionData.explanation || 'Direct curriculum answer.',
      difficulty: newQuestionData.difficulty,
      examStandard: newQuestionData.examStandard
    };

    onAddCBTQuestion(q);
    setShowAddQuestionModal(false);
  };

  const handleToggleStatus = (note: LessonNote) => {
    const nextStatus = note.status === 'published' ? 'under_review' : 'published';
    onUpdateLessonNote({
      ...note,
      status: nextStatus
    });
  };

  const filteredNotes = lessonNotes.filter(
    n => n.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
         n.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         n.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-rose-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black">Dr. Yakubu Danjuma</h1>
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold uppercase">
                  Super Admin / CMS Director
                </span>
              </div>
              <p className="text-xs text-rose-200 mt-0.5">
                NERDC Curriculum Review & Content Management Panel • Abuja FCT
              </p>
            </div>
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-rose-300 text-[11px] block">Lesson Notes in Library</span>
            <span className="text-xl font-black text-white">{lessonNotes.length} Notes</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-rose-300 text-[11px] block">CBT Question Bank</span>
            <span className="text-xl font-black text-white">{cbtQuestions.length} Questions</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-rose-300 text-[11px] block">Registered Schools</span>
            <span className="text-xl font-black text-white">1,420 Schools</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <span className="text-rose-300 text-[11px] block">Low-Data Bandwidth Saved</span>
            <span className="text-xl font-black text-emerald-400">~14.2 GB</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'curriculum'
              ? 'border-rose-600 text-rose-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Curriculum & Lesson Notes CMS ({lessonNotes.length})
        </button>
        <button
          onClick={() => setActiveTab('cbt-bank')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'cbt-bank'
              ? 'border-rose-600 text-rose-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          CBT Question Bank Manager ({cbtQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab('school-config')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'school-config'
              ? 'border-rose-600 text-rose-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          School Header & Branding Settings
        </button>
      </div>

      {/* Tab 1: Curriculum Content Manager */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes by topic, subject, or class..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <span className="text-xs text-slate-500 font-bold">
              Showing {filteredNotes.length} of {lessonNotes.length} items
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="p-3">Class & Week</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Topic Title</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Approval Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredNotes.map(note => (
                    <tr key={note.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">
                        {note.className} • Wk {note.week}
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">{note.subjectName}</td>
                      <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{note.topic}</td>
                      <td className="p-3 text-slate-500">{note.author}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleStatus(note)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                            note.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {note.status === 'published' ? '✓ Published' : '⏳ Under Review'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onDeleteLessonNote(note.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Lesson Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CBT Bank Manager */}
      {activeTab === 'cbt-bank' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">NERDC Question Bank</h3>
              <p className="text-xs text-slate-500">Add or manage WAEC, JAMB, BECE multiple choice questions.</p>
            </div>
            <button
              onClick={() => setShowAddQuestionModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add CBT Question</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cbtQuestions.map((q, idx) => (
              <div key={q.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[10px]">
                    {q.examStandard} • {q.subject}
                  </span>
                  <span className="text-slate-400 text-[10px]">{q.className}</span>
                </div>
                <h4 className="font-bold text-slate-900">{q.question}</h4>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-1.5 rounded ${oIdx === q.correctIndex ? 'bg-emerald-100 text-emerald-950 font-bold' : 'bg-slate-50'}`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
                  <strong>Key Explanation:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: School Configuration */}
      {activeTab === 'school-config' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-2xl shadow-xs">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-6">
            <Building className="w-6 h-6 text-emerald-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                School Name & Official PDF Header
              </h3>
              <p className="text-xs text-slate-500">
                This school title appears at the top of all exported lesson note PDFs and Schemes of Work.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSchoolName} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Official School / Institution Name
              </label>
              <input
                type="text"
                required
                value={schoolNameInput}
                onChange={e => setSchoolNameInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Update School Header
            </button>

            {savedSchoolNameSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                ✓ School branding updated! All future PDF lesson notes will generate with this header.
              </div>
            )}
          </form>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add CBT Question</h3>
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="text-slate-400 hover:text-slate-900 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestionSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={newQuestionData.subject}
                    onChange={e => setNewQuestionData({ ...newQuestionData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                  >
                    <option value="General Mathematics">General Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Basic Science">Basic Science</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Standard</label>
                  <select
                    value={newQuestionData.examStandard}
                    onChange={e => setNewQuestionData({ ...newQuestionData, examStandard: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5"
                  >
                    <option value="WAEC">WAEC</option>
                    <option value="JAMB/UTME">JAMB/UTME</option>
                    <option value="BECE">BECE</option>
                    <option value="National Common Entrance">National Common Entrance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Text *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter multiple choice question..."
                  value={newQuestionData.question}
                  onChange={e => setNewQuestionData({ ...newQuestionData, question: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Option A</label>
                  <input
                    type="text"
                    required
                    value={newQuestionData.optionA}
                    onChange={e => setNewQuestionData({ ...newQuestionData, optionA: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Option B</label>
                  <input
                    type="text"
                    required
                    value={newQuestionData.optionB}
                    onChange={e => setNewQuestionData({ ...newQuestionData, optionB: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Option C</label>
                  <input
                    type="text"
                    required
                    value={newQuestionData.optionC}
                    onChange={e => setNewQuestionData({ ...newQuestionData, optionC: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Option D</label>
                  <input
                    type="text"
                    required
                    value={newQuestionData.optionD}
                    onChange={e => setNewQuestionData({ ...newQuestionData, optionD: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Option Key</label>
                  <select
                    value={newQuestionData.correctIndex}
                    onChange={e => setNewQuestionData({ ...newQuestionData, correctIndex: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Difficulty</label>
                  <select
                    value={newQuestionData.difficulty}
                    onChange={e => setNewQuestionData({ ...newQuestionData, difficulty: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Explanation Walkthrough</label>
                <textarea
                  rows={2}
                  placeholder="Step by step reasoning for correct answer..."
                  value={newQuestionData.explanation}
                  onChange={e => setNewQuestionData({ ...newQuestionData, explanation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
