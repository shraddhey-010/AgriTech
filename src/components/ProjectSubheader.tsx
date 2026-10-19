import React from 'react';
import {
  FolderKanban,
  LayoutDashboard,
  Sprout,
  Share2,
  ExternalLink,
  Award,
  CheckCircle,
  GitBranch
} from 'lucide-react';
import { ProjectMetadata } from '../types';

interface ProjectSubheaderProps {
  activeMainTab: 'overview' | 'workspace' | 'kanban' | 'skillwallet';
  setActiveMainTab: (tab: 'overview' | 'workspace' | 'kanban' | 'skillwallet') => void;
  progressPercent: number;
  metadata: ProjectMetadata;
  onOpenLinksModal: () => void;
  totalTasks: number;
  completedTasks: number;
}

export const ProjectSubheader: React.FC<ProjectSubheaderProps> = ({
  activeMainTab,
  setActiveMainTab,
  progressPercent,
  metadata,
  onOpenLinksModal,
  totalTasks,
  completedTasks
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Breadcrumb & Project Meta */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
              <span className="font-medium text-slate-300">Program:</span>
              <span className="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Full stack development mern stack
              </span>
              <span className="text-slate-600">•</span>
              <span>Individual Project</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                SC
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span>AgriTech - Empowering farmers through digital technology.</span>
              </h1>
            </div>
          </div>

          {/* Action Button & Links Indicator */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenLinksModal}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Demo and GitHub links!</span>
              {metadata.demoUrl && metadata.githubUrl && (
                <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
              )}
            </button>

            {/* Quick Demo Preview Link if set */}
            {metadata.demoUrl && (
              <a
                href={metadata.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                title="Open Live Deployed Applet in New Tab"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Live App</span>
              </a>
            )}

            {/* Progress Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Progress</div>
                <div className="text-xs font-black text-emerald-400">{progressPercent}%</div>
              </div>
              <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex items-center space-x-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveMainTab('overview')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeMainTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveMainTab('workspace')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeMainTab === 'workspace'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-2 ring-emerald-400/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
            <span>Workspace (Live AgriTech App)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-400 text-slate-950 font-black">
              LIVE
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('kanban')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeMainTab === 'kanban'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Kanban</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-700 text-slate-200">
              {completedTasks}/{totalTasks}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('skillwallet')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeMainTab === 'skillwallet'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Skill Card & Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
