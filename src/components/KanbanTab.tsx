import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Filter,
  Search,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { KanbanTask, TaskStatus } from '../types';

interface KanbanTabProps {
  tasks: KanbanTask[];
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onCompleteAllTasks: () => void;
}

export const KanbanTab: React.FC<KanbanTabProps> = ({
  tasks,
  onUpdateTaskStatus,
  onCompleteAllTasks
}) => {
  const [selectedEpic, setSelectedEpic] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const epics = [
    { id: 1, name: 'Project Setup & Config' },
    { id: 2, name: 'Database Development' },
    { id: 3, name: 'Backend Development' },
    { id: 4, name: 'Front-end Development' },
    { id: 5, name: 'Security & Role RBAC' },
    { id: 6, name: 'Monitoring & Optimization' }
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesEpic = selectedEpic === 'all' || t.epicId === selectedEpic;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesEpic && matchesSearch;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'inprogress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed');

  const renderTaskCard = (task: KanbanTask) => {
    return (
      <div
        key={task.id}
        className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm space-y-2.5 group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            Epic {task.epicId}
          </span>
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            <span>{task.estimatedHours}h</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
            {task.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          {task.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 font-medium border border-slate-750"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
          <div>
            {task.status !== 'todo' && (
              <button
                onClick={() =>
                  onUpdateTaskStatus(task.id, task.status === 'completed' ? 'inprogress' : 'todo')
                }
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 text-xs flex items-center space-x-1"
                title="Move Backward"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="text-[10px]">Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1">
            {task.status !== 'completed' && (
              <button
                onClick={() =>
                  onUpdateTaskStatus(task.id, task.status === 'todo' ? 'inprogress' : 'completed')
                }
                className="px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center space-x-1 transition-colors"
                title={task.status === 'todo' ? 'Start Task' : 'Mark Completed'}
              >
                <span>{task.status === 'todo' ? 'Start' : 'Complete'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {task.status === 'completed' && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Kanban Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>AgriTech Project Kanban Board</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            19 Core Stories across 6 Epics. Click to transition tasks and update project evaluation progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter tasks or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
            />
          </div>

          {/* Epic Filter */}
          <select
            value={selectedEpic}
            onChange={(e) =>
              setSelectedEpic(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All 6 Epics</option>
            {epics.map((epic) => (
              <option key={epic.id} value={epic.id}>
                Epic {epic.id}: {epic.name}
              </option>
            ))}
          </select>

          {/* Quick Mark All Completed */}
          <button
            onClick={onCompleteAllTasks}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete All 19 Tasks</span>
          </button>
        </div>
      </div>

      {/* 3 Columns: To Do, In Progress, Completed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* To Do Column */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
              <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">To Do</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {todoTasks.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-500 text-xs p-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" />
                <p>No pending tasks here.</p>
              </div>
            ) : (
              todoTasks.map(renderTaskCard)
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></div>
              <h3 className="font-bold text-sm text-amber-300 uppercase tracking-wider">In Progress</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {inProgressTasks.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-500 text-xs p-4">
                <p>No tasks currently in development.</p>
              </div>
            ) : (
              inProgressTasks.map(renderTaskCard)
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <h3 className="font-bold text-sm text-emerald-300 uppercase tracking-wider">Completed</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800">
              {completedTasks.length}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {completedTasks.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-500 text-xs p-4">
                <p>No completed tasks yet.</p>
              </div>
            ) : (
              completedTasks.map(renderTaskCard)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
