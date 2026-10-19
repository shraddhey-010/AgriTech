import React, { useState } from 'react';
import {
  AlertCircle,
  ExternalLink,
  Code2,
  Database,
  Shield,
  Layers,
  Cpu,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  Terminal,
  Activity
} from 'lucide-react';
import { ProjectMetadata, SkillItem } from '../types';

interface OverviewTabProps {
  metadata: ProjectMetadata;
  onOpenLinksModal: () => void;
  skills: SkillItem[];
  progressPercent: number;
  totalTasks: number;
  completedTasks: number;
  onLaunchWorkspace: () => void;
  onRequestMentorReview: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  metadata,
  onOpenLinksModal,
  skills,
  progressPercent,
  totalTasks,
  completedTasks,
  onLaunchWorkspace,
  onRequestMentorReview
}) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (idx: number) => {
    setExpandedSection(expandedSection === idx ? null : idx);
  };

  const instructionModules = [
    {
      title: '1. Environment Setup',
      icon: Terminal,
      content:
        'Install Node.js (v16+), npm, and MongoDB. Set up the Express.js backend with dependencies for API routing, data handling, authentication, and validation. Create the React.js frontend using Create React App / Vite and integrate libraries such as Axios, React Router, and Tailwind / Bootstrap for building an interactive and multilingual user interface. Configure MongoDB for data storage and manage version control through Git and GitHub for collaborative development.'
    },
    {
      title: '2. Database Design',
      icon: Database,
      content:
        'Use MongoDB to store user, farm, crop, and resource-related data. Collections: Users, Farms, Crops, Orders, and Weather Data. Each collection is linked through unique identifiers to maintain relational integrity. Farmers’ data connects with their farm profiles, crop details, and activity logs, while admins manage content, resources, and user activities through the database.'
    },
    {
      title: '3. Application Development',
      icon: Code2,
      content:
        'Develop modules for: User Registration and Login; Farm Profile Setup and Management; Crop Monitoring and Soil Health Analysis; Weather Forecasting and Pest Alert Notifications; Resource Purchase and Order Tracking; Expert Consultation and Community Forums; Admin Dashboard for System and Content Management. Implement full CRUD operations, routing, and form validation across modules to ensure smooth user interactions and consistent data management.'
    },
    {
      title: '4. Role-Based Security',
      icon: Shield,
      content:
        'Use JWT (JSON Web Tokens) for secure authentication and authorization. Define roles for farmers and admins to control access to specific routes and functionalities. Encrypt passwords using bcrypt and maintain secure session handling on both frontend and backend. Restrict sensitive operations such as database management, resource approval, and content moderation to admin users only.'
    },
    {
      title: '5. Frontend Integration',
      icon: Layers,
      content:
        'Design a responsive, multilingual, and user-friendly interface using React.js and modern CSS. Include navigation menus, farm dashboards, crop tracking interfaces, resource management sections, and expert consultation pages. Integrate Axios for API communication and dynamic rendering of real-time weather data, crop analytics, and soil reports. Provide interactive charts, alerts, and graphical reports for better data visualization and decision-making by farmers.'
    },
    {
      title: '6. Testing & Validation',
      icon: CheckCircle2,
      content:
        'Test all CRUD functionalities, authentication modules, and data-driven workflows. Validate weather forecast accuracy, soil data inputs, and crop record updates. Use Postman / API test runners for proper request-response handling. Ensure UI responsiveness, accessibility, and cross-browser compatibility across devices to support rural and multilingual users.'
    },
    {
      title: '7. Monitoring & Optimization',
      icon: Cpu,
      content:
        'Optimize MongoDB queries for efficient data retrieval and scalability. Implement logging and error-handling mechanisms in Express.js middleware. Refactor controllers and backend services for modularity and easier maintenance. Enhance React performance using lazy loading, code splitting, and caching strategies for real-time updates and faster rendering.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Mentor Review Alert Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 mt-0.5">
            <AlertCircle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Add Demo and GitHub links!</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                Action Required
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Please update the demo and GitHub links so that your mentor can review and evaluate your project.
            </p>
            {metadata.demoUrl && (
              <div className="mt-2 text-xs flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="truncate max-w-md font-mono text-[11px]">{metadata.demoUrl}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={onOpenLinksModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            <span>Update Links</span>
          </button>
          <button
            onClick={onLaunchWorkspace}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Description & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Project Description & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                Agriculture
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                individual
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                Full-Stack MERN
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-400 border border-purple-800">
                Complexity: Medium
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-3">About AgriTech Solution</h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                This Agri-Tech web application is a smart and scalable solution aimed at empowering farmers with
                technology. It integrates modern tools like weather forecasting, soil analysis, and pest alerts to
                streamline farm management. Designed with user-friendliness and data-driven decisions in mind, it
                bridges the gap between traditional farming and modern technology.
              </p>
              <p>
                The platform is tailored to address real-world agricultural challenges using accessible and intuitive
                digital tools. It helps farmers increase crop yield, reduce loss, and adapt to changing environmental
                conditions. The app is responsive and multilingual, ensuring accessibility across different regions and
                literacy levels. By combining technology and farming expertise, this solution paves the way for a
                digitally connected agricultural ecosystem.
              </p>
            </div>

            {/* Quick Workspace Teaser Banner */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Interactive Live App</p>
                <p className="text-sm font-semibold text-white">
                  Experience all modules: Weather, Soil NPK, Pest Alerts, Marketplace & Forum
                </p>
              </div>
              <button
                onClick={onLaunchWorkspace}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <span>Launch App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Project Instructions & Architectural Roadmap</h3>
              </div>
              <span className="text-xs text-slate-400">7 Core Epics / Modules</span>
            </div>

            <div className="space-y-3">
              {instructionModules.map((item, idx) => {
                const Icon = item.icon;
                const isExpanded = expandedSection === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-xl overflow-hidden bg-slate-850/50 hover:border-slate-700 transition-colors"
                  >
                    <button
                      onClick={() => toggleSection(idx)}
                      className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-200">{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Implemented
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed bg-slate-900/60">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Outcome Callout */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 space-y-2">
              <div className="font-bold text-sm text-emerald-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Learning & Project Outcomes</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Built a production-ready smart farming management platform on the MERN stack.</li>
                <li>Implemented role-based JWT security (farmer vs admin) & Open-Meteo live weather telemetry.</li>
                <li>Constructed real-time pest prediction heuristics, soil NPK trackers, and agricultural marketplace.</li>
                <li>Integrated responsive multilingual accessibility (English, Hindi, Telugu).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Project Stats, Mentor, Skills Required */}
        <div className="space-y-6">
          {/* Project Stats Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Project Stats</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Project Progress</span>
                  <span className="font-black text-emerald-400 text-sm">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Total Epics</div>
                  <div className="text-2xl font-black text-white mt-1">6</div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">All 6 Designed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Total Tasks</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{totalTasks}</div>
                  <div className="text-[10px] text-slate-300 font-semibold mt-0.5">
                    {completedTasks} Completed
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Stories & Subtasks</span>
                <span className="font-bold text-slate-200">Total Tasks: 19 | Subtasks: 0</span>
              </div>
            </div>
          </div>

          {/* Mentor Assignment Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Mentor Review</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-700 text-slate-400 mx-auto flex items-center justify-center font-bold text-lg">
                ?
              </div>
              <div className="font-bold text-sm text-slate-200">{metadata.mentorStatus}</div>
              <p className="text-xs text-slate-400">
                {metadata.mentorStatus === 'No mentor assigned yet'
                  ? 'Submit your demo & GitHub repository to request a mentor code review.'
                  : 'Review request submitted! Mentor evaluation in progress.'}
              </p>

              <button
                onClick={onRequestMentorReview}
                className="mt-2 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
              >
                {metadata.mentorStatus === 'No mentor assigned yet'
                  ? 'Request Agronomist Mentor Review'
                  : 'Update Submission Links'}
              </button>
            </div>
          </div>

          {/* Skills Required Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Skills Required</span>
              </h3>
              <span className="text-xs text-emerald-400 font-bold">10/10 Verified</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs flex items-center space-x-1.5 hover:border-emerald-500/50 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-medium text-slate-200">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
