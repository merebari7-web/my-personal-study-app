import React, { useState } from 'react';
import {
  Users,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Mail,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Ward } from '../types';

interface ParentDashboardProps {
  wards?: Ward[];
  lowDataMode: boolean;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  wards = [
    {
      id: 'wrd-01',
      name: 'Tunde Ibrahim',
      className: 'SSS 2',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      overallScore: 86,
      completedNotesCount: 28,
      recentQuiz: { subject: 'General Mathematics', score: 92, date: '2026-09-07' }
    },
    {
      id: 'wrd-02',
      name: 'Amina Ibrahim',
      className: 'Basic 5',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      overallScore: 94,
      completedNotesCount: 34,
      recentQuiz: { subject: 'Basic Mathematics', score: 95, date: '2026-09-08' }
    }
  ],
  lowDataMode
}) => {
  const [selectedWardIndex, setSelectedWardIndex] = useState(0);
  const [teacherMessage, setTeacherMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const currentWard = wards[selectedWardIndex] || wards[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherMessage.trim()) return;
    setMessageSent(true);
    setTeacherMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Parent Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-purple-400">
              FI
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black">Mrs. Folake Ibrahim</h1>
                <span className="px-2 py-0.5 rounded bg-purple-700 text-purple-200 text-[10px] font-bold">
                  Parent Portal
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Monitoring 2 Wards • 2026/2027 Nigerian Academic Session
              </p>
            </div>
          </div>

          {/* Ward Switcher Pills */}
          <div className="bg-white/10 p-1.5 rounded-2xl border border-white/20 flex space-x-2">
            {wards.map((ward, idx) => (
              <button
                key={ward.id}
                onClick={() => setSelectedWardIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                  selectedWardIndex === idx
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span>{ward.name}</span>
                <span className="text-[10px] opacity-80 font-normal">({ward.className})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ward Academic Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Ward Overall Average</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{currentWard.overallScore}%</div>
          <span className="text-[10px] text-emerald-600 font-bold">WAEC Distinction Level (A1)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Curriculum Covered</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{currentWard.completedNotesCount} Topics</div>
          <span className="text-[10px] text-slate-500">Out of 36 Termly Topics</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Weekly Study Time</span>
          <div className="text-2xl font-black text-purple-700 mt-1">16.5 Hours</div>
          <span className="text-[10px] text-purple-600">On Track with Daily Goal</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Latest CBT Test</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{currentWard.recentQuiz.score}%</div>
          <span className="text-[10px] text-slate-500">{currentWard.recentQuiz.subject}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Subject Performance Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-6">
              Subject Mastery & Syllabus Progress for {currentWard.name}
            </h3>

            <div className="space-y-4">
              {[
                { subject: 'General Mathematics', score: 92, teacher: 'Mr. Emmanuel Adeyemi', status: 'Excellent' },
                { subject: 'English Language', score: 88, teacher: 'Mrs. Funmilayo Adeleke', status: 'Very Good' },
                { subject: 'Physics / Basic Science', score: 85, teacher: 'Engr. B. Sanusi', status: 'Very Good' },
                { subject: 'Chemistry / BST', score: 82, teacher: 'Dr. Chioma Nnamdi', status: 'Credit' },
                { subject: 'Civic Education & Social Studies', score: 94, teacher: 'Mallam I. Garba', status: 'Excellent' }
              ].map((sub, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{sub.subject}</h4>
                      <p className="text-[11px] text-slate-500">Teacher: {sub.teacher}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-700 text-sm">{sub.score}%</span>
                      <span className="text-[10px] text-slate-500 block">({sub.status})</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Teacher Communication Channel */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Direct Teacher Inquiry
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Send a note directly to {currentWard.name}'s subject teachers or class tutor regarding academic progress or special assistance.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                rows={4}
                required
                placeholder="Type your message to the subject teacher..."
                value={teacherMessage}
                onChange={e => setTeacherMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Note to Teacher</span>
              </button>

              {messageSent && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                  ✓ Note delivered to the subject teacher successfully!
                </div>
              )}
            </form>
          </div>

          {/* Ministry Compliance Badge */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center space-x-2 font-bold text-slate-800 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>UBE & NERDC Certified</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All weekly curriculum progress adheres strictly to the Federal Ministry of Education Scheme of Work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
