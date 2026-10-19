import React, { useState } from 'react';
import {
  Award,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Coins,
  History,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { SkillItem } from '../types';

interface SkillWalletTabProps {
  skills: SkillItem[];
  credits: { aiTokens: number; credits: number };
  onAddBonusCredits: () => void;
}

export const SkillWalletTab: React.FC<SkillWalletTabProps> = ({
  skills,
  credits,
  onAddBonusCredits
}) => {
  const [copied, setCopied] = useState(false);

  const credentialId = 'SW-MERN-AGRI-2026-97890421';

  const copyCredential = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Holographic Skill Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Verifiable Skill Card</span>
            </h3>

            {/* Holographic Card Container */}
            <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-slate-950 via-emerald-950/60 to-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    SW
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-tight text-white">SKILLWALLET</div>
                    <div className="text-[9px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Developer Credential
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>

              {/* Candidate Info */}
              <div className="pt-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate</div>
                <div className="text-base font-extrabold text-white">Shraddheya Chhiroliya</div>
                <div className="text-xs text-slate-300">Full Stack MERN Developer</div>
              </div>

              {/* Project Title */}
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Capstone Project
                </div>
                <div className="text-xs font-semibold text-emerald-300">
                  AgriTech - Smart Farming Ecosystem
                </div>
              </div>

              {/* Bottom Card Row with QR Code and Hash */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-400">Credential ID</div>
                  <div className="font-mono text-[10px] text-slate-300 flex items-center space-x-1">
                    <span>{credentialId}</span>
                    <button onClick={copyCredential} className="text-slate-400 hover:text-white">
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shadow-inner">
                  {/* Simplified stylized QR code visual */}
                  <div className="w-full h-full bg-slate-950 rounded flex flex-col justify-between p-0.5">
                    <div className="flex justify-between">
                      <div className="w-2 h-2 bg-emerald-400"></div>
                      <div className="w-2 h-2 bg-emerald-400"></div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-1.5 h-1.5 bg-white"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-2 h-2 bg-emerald-400"></div>
                      <div className="w-1 h-1 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cryptographically secured on Skillwallet protocol with immutable evaluation history.</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Skill Bank & Credit Ledger */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Bank Catalog */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Skill Bank & Competency Ledger</h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                10 Assessed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{skill.name}</div>
                      <div className="text-[10px] text-slate-400">{skill.category}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-slate-750">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Credits & Token Ledger */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Skill Credits & Reward Wallet</h3>
              </div>
              <button
                onClick={onAddBonusCredits}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim Milestone Bonus</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-xs font-medium text-slate-400">Skill Credits Balance</div>
                <div className="text-2xl font-black text-amber-300 mt-1">{credits.credits}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Use for mock interviews & mentor reviews</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-xs font-medium text-slate-400">AI Tokens Balance</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">{credits.aiTokens}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Power AI Agronomist diagnoses</div>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center space-x-1 mb-2">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Recent Ledger Transactions</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-750 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Full Stack Project Enrollment</span>
                    <p className="text-[10px] text-slate-400">Base stipend allocation</p>
                  </div>
                  <span className="font-bold text-emerald-400">+300 Credits</span>
                </div>
                {credits.credits > 300 && (
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-750 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">AgriTech Milestone Reward</span>
                      <p className="text-[10px] text-slate-400">Completed all 6 Epics on Kanban</p>
                    </div>
                    <span className="font-bold text-emerald-400">+{credits.credits - 300} Credits</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
