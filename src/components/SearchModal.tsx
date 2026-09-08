import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronRight, X, Sparkles, Layers } from 'lucide-react';
import { LessonNote } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonNotes: LessonNote[];
  onSelectNote: (note: LessonNote) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lessonNotes,
  onSelectNote
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? lessonNotes.slice(0, 6) : lessonNotes.filter(n => {
    const q = query.toLowerCase();
    return (
      n.topic.toLowerCase().includes(q) ||
      n.subjectName.toLowerCase().includes(q) ||
      n.className.toLowerCase().includes(q) ||
      n.nerdcCode.toLowerCase().includes(q) ||
      n.subtopics.some(st => st.toLowerCase().includes(q)) ||
      n.behavioralObjectives.some(bo => bo.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200">
        {/* Search Header Input */}
        <div className="relative pb-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-emerald-600 absolute left-3 top-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search all NERDC lesson notes (e.g., Number Bases, Vectors, Vowels, Flag)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2 pr-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            {query.trim() === '' ? 'Popular Suggested Lesson Notes' : `Found ${results.length} Matching Notes`}
          </span>

          {results.length > 0 ? (
            results.map(note => (
              <div
                key={note.id}
                onClick={() => {
                  onSelectNote(note);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {note.className} • {note.term}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {note.subjectName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {note.nerdcCode}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {note.topic}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              No lesson notes match "{query}". Try checking your spelling or search by subject.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Use keyboard arrow keys or click to view note</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
