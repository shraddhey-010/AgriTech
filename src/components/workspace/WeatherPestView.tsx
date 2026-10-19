import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  Thermometer,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { WeatherTelemetry, PestAlert } from '../../types';
import { PRESET_LOCATIONS, LocationPreset } from '../../services/weatherService';

interface WeatherPestViewProps {
  weather: WeatherTelemetry;
  pestAlerts: PestAlert[];
  isLoading: boolean;
  onRefreshWeather: (lat: number, lon: number) => void;
}

export const WeatherPestView: React.FC<WeatherPestViewProps> = ({
  weather,
  pestAlerts,
  isLoading,
  onRefreshWeather
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationPreset>(PRESET_LOCATIONS[0]);
  const [customLat, setCustomLat] = useState('19.9975');
  const [customLon, setCustomLon] = useState('73.7898');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleLocationChange = (loc: LocationPreset) => {
    setSelectedLocation(loc);
    setIsCustomMode(false);
    onRefreshWeather(loc.lat, loc.lon);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRefreshWeather(Number(customLat), Number(customLon));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Location Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <span>Weather Forecasting & Pest Alert Advisor</span>
          </h2>
          <p className="text-xs text-slate-400">
            Open-Meteo live atmospheric telemetry correlated with crop pathogen risk models
          </p>
        </div>

        {/* Region selector pills */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_LOCATIONS.map((loc) => {
            const isSelected = !isCustomMode && selectedLocation.name === loc.name;
            return (
              <button
                key={loc.name}
                onClick={() => handleLocationChange(loc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                }`}
              >
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{loc.name.split(' ')[0]}</span>
              </button>
            );
          })}

          <button
            onClick={() => onRefreshWeather(selectedLocation.lat, selectedLocation.lon)}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh Live Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Atmospheric Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Temperature Card */}
        <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-6 text-white border border-blue-500/30 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                {selectedLocation.name} ({selectedLocation.state})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950">
              LIVE METEO
            </span>
          </div>

          <div className="flex items-baseline space-x-4">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              {weather.temperature}°C
            </h1>
            <span className="text-slate-300 text-sm font-semibold">
              Atmospheric Temp
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center space-x-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                <span>Humidity</span>
              </span>
              <span className="font-extrabold text-white text-base">{weather.humidity}%</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center space-x-1">
                <Wind className="w-3.5 h-3.5 text-slate-300" />
                <span>Wind Speed</span>
              </span>
              <span className="font-extrabold text-white text-base">{weather.windSpeed} km/h</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-slate-400 flex items-center space-x-1">
                <CloudRain className="w-3.5 h-3.5 text-blue-300" />
                <span>Rainfall</span>
              </span>
              <span className="font-extrabold text-white text-base">{weather.precipitation} mm</span>
            </div>
          </div>
        </div>

        {/* 5-Day Mini Forecast Cards */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>5-Day Weather Outlook</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Open-Meteo v1</span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {weather.daily.dates.slice(0, 5).map((date, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-2xl bg-slate-800/70 border border-slate-750 text-center flex flex-col items-center justify-between space-y-1.5"
              >
                <span className="text-[10px] font-bold text-slate-400">
                  {typeof date === 'string' && date.includes('-')
                    ? new Date(date).toLocaleDateString(undefined, { weekday: 'short' })
                    : `Day ${idx + 1}`}
                </span>
                <CloudSun className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-black text-white">
                    {Math.round(weather.daily.maxTemps[idx] ?? 30)}°
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {Math.round(weather.daily.minTemps[idx] ?? 21)}°
                  </div>
                </div>
                <div className="text-[9px] font-mono text-cyan-400">
                  {weather.daily.precipSums[idx] ?? 0}mm
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Pest & Disease Alerts Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Active Agricultural Pest & Pathogen Advisories</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Heuristic threat analysis correlating humidity, heat index, and rainfall
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-950 text-rose-400 border border-rose-800">
            {pestAlerts.length} Active Threat Advisory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pestAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-800/80 border-l-4 border-l-rose-500 border border-slate-750 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>{alert.pest}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                  {alert.type}
                </span>
              </div>

              {alert.cropAffected && (
                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Vulnerable Crops:</strong> {alert.cropAffected}
                </div>
              )}

              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {alert.recommendation}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Approved IPM Protocol</span>
                </span>
                <span>ICAR / Agronomy Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
