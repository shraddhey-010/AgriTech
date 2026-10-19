import React from 'react';
import {
  Wallet,
  Award,
  CreditCard,
  Coins,
  ChevronDown,
  Menu,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { User } from '../types';

interface SkillwalletHeaderProps {
  currentUser: User;
  activeMainTab: 'overview' | 'workspace' | 'kanban' | 'skillwallet';
  setActiveMainTab: (tab: 'overview' | 'workspace' | 'kanban' | 'skillwallet') => void;
  credits: { aiTokens: number; credits: number };
  onOpenLinksModal: () => void;
  onResetData: () => void;
}

export const SkillwalletHeader: React.FC<SkillwalletHeaderProps> = ({
  currentUser,
  activeMainTab,
  setActiveMainTab,
  credits,
  onResetData
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand & Platform Link */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <button
              onClick={() => setActiveMainTab('overview')}
              className="flex items-center space-x-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Wallet className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
                  Skillwallet
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                  LMS v2.6
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-800">
              <button
                onClick={() => setActiveMainTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeMainTab === 'overview'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveMainTab('workspace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  activeMainTab === 'workspace'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Workspace</span>
              </button>
              <button
                onClick={() => setActiveMainTab('kanban')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeMainTab === 'kanban'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setActiveMainTab('skillwallet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  activeMainTab === 'skillwallet'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Skill Bank</span>
              </button>
            </nav>
          </div>

          {/* Right Section: Tokens, Credits & Candidate Avatar */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* AI Tokens Counter */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs">
              <span className="font-mono text-slate-400 text-[10px] uppercase font-bold tracking-wider">JWT</span>
              <Coins className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-cyan-300">{credits.aiTokens}</span>
              <span className="text-slate-400 text-[11px]">AI Token</span>
            </div>

            {/* Skill Credits Counter */}
            <button
              onClick={() => setActiveMainTab('skillwallet')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/30 text-xs hover:border-amber-500/60 transition-colors"
              title="Click to view Skill Wallet & Credential Ledger"
            >
              <span className="font-mono text-amber-400 text-[10px] uppercase font-bold tracking-wider">JWT</span>
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-300">{credits.credits}</span>
              <span className="text-slate-300 text-[11px] hidden sm:inline">Credits</span>
            </button>

            {/* User Candidate Avatar */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 pl-2 pr-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors focus:outline-none"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-inner">
                  SC
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold leading-tight text-slate-200">Shraddheya C.</div>
                  <div className="text-[10px] text-emerald-400 leading-none">Full-Stack MERN</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-2 border-b border-slate-700 text-xs">
                    <p className="font-bold text-white">Shraddheya Chhiroliya</p>
                    <p className="text-slate-400 truncate">chhiroliyashraddheya@gmail.com</p>
                    <div className="mt-1 flex items-center space-x-1 text-emerald-400 font-semibold text-[10px]">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Role: Candidate / Developer</span>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setActiveMainTab('overview');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Project Overview & Mentorship
                    </button>
                    <button
                      onClick={() => {
                        setActiveMainTab('skillwallet');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      Skill Card & Credential NFT
                    </button>
                    <button
                      onClick={() => {
                        onResetData();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-amber-300 hover:bg-amber-950/40"
                    >
                      Reset Project Mock Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
