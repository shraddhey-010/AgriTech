import React from 'react';
import {
  MapPin,
  TrendingUp,
  Thermometer,
  AlertTriangle,
  Droplets,
  Wind,
  CheckCircle2,
  ChevronRight,
  Sprout,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { User, Farm, Crop, WeatherTelemetry, PestAlert, Language } from '../../types';
import { translations } from '../../utils/translations';

interface FarmerDashboardProps {
  currentUser: User;
  farms: Farm[];
  crops: Crop[];
  weather: WeatherTelemetry;
  pestAlerts: PestAlert[];
  language: Language;
  onNavigateToFarms: () => void;
  onNavigateToWeather: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentUser,
  farms,
  crops,
  weather,
  pestAlerts,
  language,
  onNavigateToFarms,
  onNavigateToWeather
}) => {
  const t = (key: keyof typeof translations.en) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const totalAcres = farms.reduce((acc, f) => acc + (f.totalAreaAcre || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <Sprout className="w-3.5 h-3.5" />
              <span>Smart Farming Ecosystem Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {t('welcome')}, {currentUser.name}!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
              Empowering data-driven agricultural decisions across your {farms.length} active registered farm holdings ({totalAcres} Acres).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-xs flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-medium text-white">{currentUser.location || 'Nashik, Maharashtra'}</span>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider">
              Kharif / Rabi Cycle
            </span>
          </div>
        </div>
      </div>

      {/* 4 Top Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Land */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{t('totalHoldings')}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalAcres} <span className="text-sm font-semibold text-slate-400">{t('acres')}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>{farms.length} Farm plots mapped</span>
            <button
              onClick={onNavigateToFarms}
              className="text-emerald-400 font-semibold hover:underline flex items-center"
            >
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </p>
        </div>

        {/* Active Crops */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{t('activeCrops')}</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{crops.length}</div>
          <p className="text-xs text-slate-400 mt-1">Tracked with live NPK & pH telemetry</p>
        </div>

        {/* Ambient Temperature & Weather */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{t('ambientTemp')}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">
            {weather.temperature}°C
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Droplets className="w-3 h-3 text-cyan-400" />
              <span>{weather.humidity}% Hum.</span>
            </span>
            <span className="flex items-center space-x-1">
              <Wind className="w-3 h-3 text-slate-300" />
              <span>{weather.windSpeed} km/h</span>
            </span>
          </p>
        </div>

        {/* Pest Warnings */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{t('activeAlerts')}</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {pestAlerts.length}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span className="text-rose-300 font-semibold">Proactive mitigation</span>
            <button
              onClick={onNavigateToWeather}
              className="text-rose-400 font-semibold hover:underline flex items-center"
            >
              <span>View</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </p>
        </div>
      </div>

      {/* Main Grid: Crop Monitoring Table & Pest Alert Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Crops Overview & Soil Metrics */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Crops Overview & Soil Health Status</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time N-P-K nutrient availability, pH balance, and crop lifecycle
              </p>
            </div>
            <button
              onClick={onNavigateToFarms}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 transition-colors"
            >
              + Add Crop
            </button>
          </div>

          {crops.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <p>No crops logged yet. Click "+ Add Crop" to track your field planting.</p>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-2.5 px-3">Crop & Variety</th>
                    <th className="py-2.5 px-3">Lifecycle</th>
                    <th className="py-2.5 px-3">Soil N-P-K</th>
                    <th className="py-2.5 px-3">pH</th>
                    <th className="py-2.5 px-3">Moisture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {crops.map((crop) => {
                    const isHealthyPh = crop.soilMetrics.pH >= 6.0 && crop.soilMetrics.pH <= 7.5;
                    return (
                      <tr key={crop.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white text-xs">{crop.cropName}</div>
                          <div className="text-[11px] text-slate-400">{crop.variety}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                            {crop.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-200">
                          {crop.soilMetrics.nitrogen_N}-{crop.soilMetrics.phosphorus_P}-{crop.soilMetrics.potassium_K}
                          <span className="text-[9px] text-slate-400 ml-1">kg/ha</span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isHealthyPh
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {crop.soilMetrics.pH.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-200">{crop.soilMetrics.moisturePercent}%</span>
                            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-400 rounded-full"
                                style={{ width: `${Math.min(100, crop.soilMetrics.moisturePercent)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Live Pest Alert Advisor */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Live Pest & Disease Advisor</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Heuristic warning engine based on ambient telemetry
              </p>
            </div>
            <button
              onClick={onNavigateToWeather}
              className="text-xs font-semibold text-slate-300 hover:text-white"
            >
              Forecast &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {pestAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/70 border-l-4 border-l-amber-500 border border-slate-750 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>{alert.pest}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    {alert.type}
                  </span>
                </div>
                {alert.cropAffected && (
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Vulnerable:</strong> {alert.cropAffected}
                  </p>
                )}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {alert.recommendation}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Fertilizer / Agronomy Tip */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Agronomy Advisory:</span> Ensure basal dose of Potassium (K)
              is split evenly between vegetative and flowering stages to reinforce stalk rigidity and pathogen resistance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
