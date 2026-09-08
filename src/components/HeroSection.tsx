import React from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  DownloadCloud,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SchoolLevel, ClassLevel } from '../types';
import { SCHOOL_LEVELS } from '../data/seedCurriculum';

interface HeroSectionProps {
  selectedLevel: SchoolLevel;
  onSelectLevel: (level: SchoolLevel) => void;
  selectedClass: ClassLevel;
  onSelectClass: (c: ClassLevel) => void;
  onOpenSearch: () => void;
  onOpenSchemeGenerator: () => void;
  onOpenCBT: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedLevel,
  onSelectLevel,
  selectedClass,
  onSelectClass,
  onOpenSearch,
  onOpenSchemeGenerator,
  onOpenCBT
}) => {
  const currentLevelObj = SCHOOL_LEVELS.find(l => l.id === selectedLevel) || SCHOOL_LEVELS[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/50 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>100% NERDC Curriculum & UBE Standard Compliant</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-semibold text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>WAEC • JAMB • NECO • BECE • National Common Entrance</span>
          </div>
        </div>

        {/* Hero Main Copy */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            The Complete Curriculum & Lesson Notes Platform for <span className="text-emerald-400 underline decoration-emerald-500/50">Nigerian Schools</span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Instant access to 12-week structured lesson notes, pedagogical schemes of work, WAEC/JAMB CBT practice tests, and downloadable print-ready lesson plans for Teachers, Students & Parents.
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <button
            onClick={onOpenSearch}
            className="w-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-emerald-400/30 hover:border-emerald-400/60 rounded-2xl p-3 sm:p-4 text-left flex items-center justify-between text-emerald-100 shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-emerald-200/80 font-medium">
                Search any topic (e.g., Number Bases, Quadratic Equations, Vowels, National Symbols)...
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-mono">
              Press ⌘K
            </span>
          </button>
        </div>

        {/* School Level Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
          {SCHOOL_LEVELS.map(lvl => {
            const isSelected = selectedLevel === lvl.id;
            return (
              <div
                key={lvl.id}
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onSelectClass(lvl.classes[0]);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'bg-emerald-600/90 border-emerald-300 shadow-lg shadow-emerald-950/40 translate-y-[-2px]'
                    : 'bg-emerald-950/40 border-emerald-700/40 hover:bg-emerald-900/50 hover:border-emerald-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white text-emerald-900' : 'bg-emerald-900 text-emerald-300'}`}>
                    {lvl.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-200" />}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{lvl.name}</h3>
                <p className="text-xs text-emerald-200/80 line-clamp-2">{lvl.description}</p>

                {/* Class pills inside card */}
                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-emerald-500/20">
                  {lvl.classes.map(c => (
                    <button
                      key={c}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLevel(lvl.id);
                        onSelectClass(c);
                      }}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        selectedClass === c && isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-200">
          <button
            onClick={onOpenSchemeGenerator}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 text-white transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300" />
            <span>Generate 12-Week Scheme of Work</span>
          </button>

          <button
            onClick={onOpenCBT}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 text-white transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Launch CBT Exam Hall</span>
          </button>
        </div>
      </div>
    </div>
  );
};
