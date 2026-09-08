import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  Heart,
  Globe,
  FileSpreadsheet
} from 'lucide-react';

interface FooterProps {
  onSelectLevel: (lvl: any) => void;
  onOpenSchemeOfWork: () => void;
  onOpenCBT: () => void;
  onOpenPricing: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectLevel,
  onOpenSchemeOfWork,
  onOpenCBT,
  onOpenPricing
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Naija<span className="text-emerald-400">Edu</span>
                </span>
                <p className="text-[11px] text-slate-400">Nigerian Educational Curriculum Resource Hub</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The comprehensive, production-ready educational repository covering the Nigerian Educational Research and Development Council (NERDC) and Universal Basic Education (UBE) curriculum standards across Basic 1 to SSS 3.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% NERDC & Ministry of Education Compliant</span>
            </div>
          </div>

          {/* Col 2: School Levels */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Curriculum Levels
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSelectLevel('primary')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Primary (Basic 1 – 6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLevel('junior_secondary')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Junior Secondary (JSS 1 – 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectLevel('senior_secondary')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Senior Secondary (SSS 1 – 3)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSchemeOfWork}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  12-Week Scheme of Work
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Exam Standards */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Exam Simulators
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenCBT}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  WAEC / SSCE Past CBT
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCBT}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  JAMB / UTME Mock Hall
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCBT}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  BECE Junior Secondary Exam
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCBT}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  National Common Entrance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pricing & Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Educator Resources
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenPricing}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Naira Pricing & School Plans (₦)
                </button>
              </li>
              <li>
                <span className="text-slate-400">PDF Printable Lesson Plans</span>
              </li>
              <li>
                <span className="text-slate-400">Low-Bandwidth Mobile Mode</span>
              </li>
              <li>
                <span className="text-slate-400">Continuous Assessment (CA) System</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NaijaEdu Platform. Aligned to the Nigerian Educational Research and Development Council (NERDC) syllabus.</p>
          <div className="flex items-center space-x-4">
            <span>Built for Nigerian Teachers, Students & Parents</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Hosted on GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
