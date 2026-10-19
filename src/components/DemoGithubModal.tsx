import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ProjectMetadata } from '../types';

interface DemoGithubModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ProjectMetadata;
  onSave: (metadata: ProjectMetadata) => void;
}

export const DemoGithubModal: React.FC<DemoGithubModalProps> = ({
  isOpen,
  onClose,
  metadata,
  onSave
}) => {
  const [demoUrl, setDemoUrl] = useState(metadata.demoUrl);
  const [githubUrl, setGithubUrl] = useState(metadata.githubUrl);
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...metadata,
      demoUrl,
      githubUrl,
      mentorStatus: 'Review Requested',
      submittedAt: new Date().toISOString()
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const copyDemo = () => {
    navigator.clipboard.writeText(demoUrl);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const copyGit = () => {
    navigator.clipboard.writeText(githubUrl);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ExternalLink className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Submit Demo & GitHub Links
              </h3>
              <p className="text-xs text-slate-400">
                Update URLs for mentor evaluation and capstone assessment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Links saved successfully! Status updated to "Review Requested".</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Demo Link Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Deployed Demo URL</span>
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://your-applet.run.app"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-emerald-500 pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={copyDemo}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  title="Copy URL"
                >
                  {copiedDemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded text-slate-400 hover:text-emerald-400"
                  title="Test Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Pre-filled with your current AI Studio development and production deployment.
            </p>
          </div>

          {/* GitHub Repository Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
              <Github className="w-3.5 h-3.5 text-purple-400" />
              <span>GitHub Source Code Repository</span>
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/agritech-platform"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-emerald-500 pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={copyGit}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  title="Copy URL"
                >
                  {copiedGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded text-slate-400 hover:text-purple-400"
                  title="Open GitHub"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              The repository containing your server/ and client/ MERN architecture.
            </p>
          </div>

          {/* Mentorship Status preview */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Mentor Status:</span>
              <span className="font-bold text-amber-400">{metadata.mentorStatus}</span>
            </div>
            {metadata.submittedAt && (
              <div className="text-[11px] text-slate-400">
                Last updated: {new Date(metadata.submittedAt).toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Request Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
