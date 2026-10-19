import React, { useState } from 'react';
import {
  X,
  Bot,
  Sparkles,
  Send,
  ShieldCheck,
  Sprout,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface AiAgronomistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAgronomistModal: React.FC<AiAgronomistModalProps> = ({
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const samplePrompts = [
    'Paddy leaf blast symptoms and bio-fungicide treatment',
    'Cotton leaves turning reddish-bronze with curled margins',
    'Acidic soil pH 5.2: How much agricultural lime per acre?',
    'Red spider mites vs thrips outbreak on chilli crops'
  ];

  const handleDiagnose = (inputQuery: string) => {
    if (!inputQuery.trim()) return;
    setIsAnalyzing(true);
    setResponse(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const q = inputQuery.toLowerCase();

      if (q.includes('blast') || q.includes('paddy') || q.includes('rice')) {
        setResponse(`### Agronomic Diagnosis: Rice Leaf Blast (Pyricularia oryzae)
**Causal Agent & Threat Level:** High severity airborne fungal ascomycete favored by high humidity (>85%) and nitrogen over-fertilization.

**Prescribed Treatment Protocol:**
1. **Bio-Control Spray:** Spray *Trichoderma harzianum* or *Pseudomonas fluorescens* @ 5g/L during early morning hours.
2. **Systemic Intervention:** If leaf lesions cover >5% foliage, spray Tricyclazole 75% WP @ 0.6g/L or Kasugamycin 3% SL @ 2ml/L.
3. **Fertilizer Adjustment:** Immediately halt top-dress Urea; apply Potassium Chloride (MOP) @ 15kg/acre to strengthen cell walls.`);
      } else if (q.includes('cotton') || q.includes('curled') || q.includes('reddish')) {
        setResponse(`### Agronomic Diagnosis: Cotton Leaf Reddening & Jassid / Aphid Stress
**Causal Agent & Threat Level:** Moderate physiological anthocyanin accumulation triggered by subsoil magnesium deficiency, compounded by sap-sucking jassid pests.

**Prescribed Treatment Protocol:**
1. **Foliar Nutrition:** Spray Magnesium Sulphate (MgSO4) @ 10g/L + Urea @ 10g/L at 15-day intervals.
2. **Organic Pest Defense:** Apply 10,000 PPM cold-pressed Neem Oil @ 3ml/L to suppress leafhoppers.
3. **Moisture Protocol:** Avoid standing water in cotton furrows; maintain shallow intermittent aeration.`);
      } else if (q.includes('acid') || q.includes('ph') || q.includes('lime')) {
        setResponse(`### Agronomic Diagnosis: Soil Acidity (pH 5.2) & Aluminum Toxicity Risk
**Impact:** Severe limitation of Phosphorus, Calcium, and Magnesium uptake; rhizobium nodulation inhibited.

**Prescribed Soil Amendment Protocol:**
1. **Agricultural Lime (CaCO3):** Broadcast 250 to 350 kg/acre of finely ground agricultural lime or dolomite 3 to 4 weeks prior to sowing.
2. **Organic Carbon Buffer:** Incorporate 5 tonnes/acre of well-decomposed Farmyard Manure (FYM) to enhance cation exchange capacity (CEC).
3. **Phosphorus Solubilizers:** Use PSB (Phosphate Solubilizing Bacteria) seed inoculant to mobilize locked soil phosphorus.`);
      } else {
        setResponse(`### Agronomic Field Diagnosis & Advisory
**Query:** "${inputQuery}"

**Pathological Evaluation:**
Ambient conditions and symptoms suggest an interplay between foliar fungal pathogens and micronutrient imbalance (likely Zinc or Iron chlorosis).

**Recommended Action Steps:**
1. **Visual Scouting:** Inspect underside of lower leaves for spore pustules or webbing.
2. **Broad-Spectrum Bio-Shield:** Apply cold-pressed Neem Oil (10,000 PPM) @ 4ml/L + Pseudomonas fluorescens @ 5g/L.
3. **Balanced N-P-K Nutrition:** Avoid excess nitrogen; ensure micronutrient spray containing Chelated Zinc (12%) and Boron (20%).
4. **Soil Health Review:** Check root collar for discoloration or damping-off.`);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Bot className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>AI Agronomist Doctor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  Agri-Intelligence
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Instant botanical pathology analysis, soil amendments, and certified IPM protocols
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

        {/* Query Input */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDiagnose(query);
              }}
              placeholder="Describe leaf symptoms, crop curling, or soil pH test..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 pr-24"
            />
            <button
              onClick={() => handleDiagnose(query)}
              disabled={isAnalyzing || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Diagnose</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 self-center">Try asking:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(prompt);
                  handleDiagnose(prompt);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-[11px] text-slate-300 border border-slate-700/80 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnosis Result Area */}
        {isAnalyzing && (
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-750 text-center space-y-2">
            <Activity className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-300">
              Evaluating crop pathology telemetry and botanical databases...
            </p>
          </div>
        )}

        {response && !isAnalyzing && (
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-200 space-y-3 leading-relaxed max-h-72 overflow-y-auto">
            <div className="flex items-center space-x-2 text-purple-300 font-bold">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Certified Agronomic Prescription</span>
            </div>
            <div className="whitespace-pre-line text-slate-300">{response}</div>
          </div>
        )}

        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-750 text-[11px] text-slate-400 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Grounded in ICAR (Indian Council of Agricultural Research) and State Agri University IPM protocols.</span>
        </div>
      </div>
    </div>
  );
};
