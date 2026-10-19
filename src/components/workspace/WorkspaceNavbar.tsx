import React from 'react';
import {
  Sprout,
  LayoutDashboard,
  Wheat,
  CloudSun,
  ShoppingCart,
  MessageSquare,
  ShieldAlert,
  Bot,
  KeyRound,
  Languages,
  UserCheck
} from 'lucide-react';
import { User, Language } from '../../types';
import { translations } from '../../utils/translations';

interface WorkspaceNavbarProps {
  currentUser: User;
  onSwitchUser: (role: 'farmer' | 'admin') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSubTab: 'dashboard' | 'farms' | 'weather' | 'marketplace' | 'forum' | 'admin';
  setActiveSubTab: (tab: 'dashboard' | 'farms' | 'weather' | 'marketplace' | 'forum' | 'admin') => void;
  cartCount: number;
  onOpenAiDoctor: () => void;
}

export const WorkspaceNavbar: React.FC<WorkspaceNavbarProps> = ({
  currentUser,
  onSwitchUser,
  language,
  onLanguageChange,
  activeSubTab,
  setActiveSubTab,
  cartCount,
  onOpenAiDoctor
}) => {
  const t = (key: keyof typeof translations.en) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Bar: Brand, Role Switcher, Language Switcher, JWT Token */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sprout className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-base tracking-tight">
                  {t('appName')}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Smart Farming MERN
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{t('tagline')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* AI Crop Doctor Button */}
            <button
              onClick={onOpenAiDoctor}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-emerald-600/30 hover:from-purple-600/40 hover:to-emerald-600/40 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all shadow-sm"
              title="Open AI Agronomist Diagnostic Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>{t('aiAssistant')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200">
              <Languages className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-white">English (EN)</option>
                <option value="hi" className="bg-slate-900 text-white">हिंदी (HI)</option>
                <option value="te" className="bg-slate-900 text-white">తెలుగు (TE)</option>
              </select>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-1 p-0.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
              <button
                onClick={() => onSwitchUser('farmer')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors flex items-center space-x-1 ${
                  currentUser.role === 'farmer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>{t('roleFarmer')}</span>
              </button>
              <button
                onClick={() => onSwitchUser('admin')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors flex items-center space-x-1 ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                <span>{t('roleAdmin')}</span>
              </button>
            </div>

            {/* Active JWT Indicator */}
            <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400">
              <KeyRound className="w-3 h-3" />
              <span className="truncate max-w-[130px]">{currentUser.name}</span>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeSubTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('dashboard')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('farms')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeSubTab === 'farms'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>{t('farms')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('weather')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeSubTab === 'weather'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CloudSun className="w-3.5 h-3.5" />
            <span>{t('weather')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('marketplace')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors relative ${
              activeSubTab === 'marketplace'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{t('marketplace')}</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('forum')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeSubTab === 'forum'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('forum')}</span>
          </button>

          {/* Admin Console Tab - Always visible or highlighted if role is admin */}
          <button
            onClick={() => setActiveSubTab('admin')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeSubTab === 'admin'
                ? 'bg-amber-600 text-white shadow'
                : currentUser.role === 'admin'
                ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('admin')}</span>
            {currentUser.role === 'admin' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
