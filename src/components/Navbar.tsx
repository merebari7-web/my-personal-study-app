import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Zap,
  GraduationCap,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Award,
  Sparkles,
  Menu,
  X,
  CreditCard,
  Wifi,
  WifiOff,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  lowDataMode: boolean;
  setLowDataMode: (val: boolean) => void;
  onOpenSearch: () => void;
  onOpenPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  lowDataMode,
  setLowDataMode,
  onOpenSearch,
  onOpenPricing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; color: string; desc: string }[] = [
    { role: 'student', label: 'Student Portal', icon: GraduationCap, color: 'text-emerald-600', desc: 'SSCE/BECE CBT & Study Notes' },
    { role: 'teacher', label: 'Teacher Dashboard', icon: BookOpen, color: 'text-blue-600', desc: 'Lesson Planner & Scheme of Work' },
    { role: 'parent', label: 'Parent Portal', icon: Users, color: 'text-purple-600', desc: 'Ward Progress & Score Reports' },
    { role: 'admin', label: 'Admin CMS Panel', icon: ShieldCheck, color: 'text-rose-600', desc: 'Curriculum & Question Bank CMS' }
  ];

  const currentRoleObj = roles.find(r => r.role === userRole) || roles[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Nigerian Banner */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1 px-4 text-center font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2 mx-auto">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-700 text-emerald-100 border border-emerald-600 font-bold">
            🇳🇬 NERDC 2026/2027 CURRICULUM
          </span>
          <span className="hidden sm:inline">Universal Basic Education (UBE) & Senior Secondary Aligned</span>
          <span className="text-emerald-300 hidden md:inline">| Over 300+ Verified Lesson Notes & Scheme of Work</span>
        </div>

        {/* Low Data Mode Toggle Pill */}
        <button
          onClick={() => setLowDataMode(!lowDataMode)}
          className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs transition-colors cursor-pointer ${
            lowDataMode
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-emerald-900/80 hover:bg-emerald-900 text-emerald-200'
          }`}
          title="Toggle Low-Data / Bandwidth Saver Mode for fast mobile browsing"
        >
          {lowDataMode ? <WifiOff className="w-3 h-3 text-slate-950" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
          <span className="text-[11px]">{lowDataMode ? 'Low-Data ON' : 'Data Saver'}</span>
        </button>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentTab('curriculum')}
              className="flex items-center space-x-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Naija<span className="text-emerald-600">Edu</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    NERDC HUB
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Primary & Secondary Schools Nigeria</p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentTab('curriculum')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentTab === 'curriculum' || currentTab === 'lesson-view'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum & Notes</span>
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('scheme-of-work')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentTab === 'scheme-of-work'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Scheme of Work</span>
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('cbt-quiz')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentTab === 'cbt-quiz'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Award className="w-4 h-4" />
                <span>CBT Exam Hall</span>
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <currentRoleObj.icon className="w-4 h-4" />
                <span>My Dashboard</span>
              </span>
            </button>
          </nav>

          {/* Right Actions: Search, Role Switcher, Pricing */}
          <div className="flex items-center space-x-2.5">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 hover:border-emerald-200 transition-colors cursor-pointer flex items-center space-x-1.5"
              title="Search topics, subjects, classes..."
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium text-slate-500">Search ⌘K</span>
            </button>

            {/* Naira Pricing Button */}
            <button
              onClick={onOpenPricing}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Plans (₦)</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <currentRoleObj.icon className="w-3 h-3" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-[11px] font-bold leading-tight">{currentRoleObj.label}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Experience Mode</p>
                  </div>
                  {roles.map(r => {
                    const Icon = r.icon;
                    const isSelected = userRole === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          setUserRole(r.role);
                          setRoleDropdownOpen(false);
                          setCurrentTab('dashboard');
                        }}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center space-x-3 transition-colors cursor-pointer ${
                          isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold">{r.label}</p>
                          <p className="text-[10px] text-slate-500 font-normal">{r.desc}</p>
                        </div>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setCurrentTab('curriculum');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-3 ${
              currentTab === 'curriculum' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Curriculum & Lesson Notes</span>
          </button>

          <button
            onClick={() => {
              setCurrentTab('scheme-of-work');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-3 ${
              currentTab === 'scheme-of-work' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>Scheme of Work Generator</span>
          </button>

          <button
            onClick={() => {
              setCurrentTab('cbt-quiz');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-3 ${
              currentTab === 'cbt-quiz' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
            }`}
          >
            <Award className="w-5 h-5 text-emerald-600" />
            <span>CBT Exam Simulator</span>
          </button>

          <button
            onClick={() => {
              setCurrentTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-3 ${
              currentTab === 'dashboard' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
            }`}
          >
            <currentRoleObj.icon className="w-5 h-5 text-emerald-600" />
            <span>{currentRoleObj.label}</span>
          </button>

          <button
            onClick={() => {
              onOpenPricing();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 flex items-center space-x-3"
          >
            <CreditCard className="w-5 h-5 text-amber-600" />
            <span>Subscription Plans & Pricing (₦)</span>
          </button>
        </div>
      )}
    </header>
  );
};
