import React, { useState } from 'react';
import {
  Wheat,
  Plus,
  Trash2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  Droplet,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { Farm, Crop, CropStatus, SoilMetrics } from '../../types';

interface FarmsAndCropsViewProps {
  farms: Farm[];
  crops: Crop[];
  onAddFarm: (farm: Omit<Farm, 'id' | 'createdAt'>) => void;
  onDeleteFarm: (id: string) => void;
  onAddCrop: (crop: Omit<Crop, 'id' | 'createdAt'>) => void;
  onUpdateCrop: (
    cropId: string,
    updates: Partial<{ status: CropStatus; soilMetrics: SoilMetrics }>
  ) => void;
}

export const FarmsAndCropsView: React.FC<FarmsAndCropsViewProps> = ({
  farms,
  crops,
  onAddFarm,
  onDeleteFarm,
  onAddCrop,
  onUpdateCrop
}) => {
  // Farm form state
  const [farmName, setFarmName] = useState('');
  const [totalAreaAcre, setTotalAreaAcre] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [irrigationType, setIrrigationType] = useState<Farm['irrigationType']>('Drip');

  // Crop form state
  const [selectedFarmId, setSelectedFarmId] = useState(farms[0]?.id || '');
  const [cropName, setCropName] = useState('');
  const [variety, setVariety] = useState('');
  const [plantedDate, setPlantedDate] = useState('2026-10-01');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2027-03-25');
  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(48);
  const [potassium, setPotassium] = useState(62);
  const [pH, setPH] = useState(6.8);
  const [moisture, setMoisture] = useState(55);

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim() || !totalAreaAcre) return;
    onAddFarm({
      ownerId: 'user-farmer-1',
      farmName: farmName.trim(),
      totalAreaAcre: Number(totalAreaAcre),
      location: {
        district: district.trim() || 'Nashik',
        state: state.trim() || 'Maharashtra'
      },
      irrigationType
    });
    setFarmName('');
    setTotalAreaAcre('');
    setDistrict('');
    setState('');
  };

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName.trim()) return;
    const farm = farms.find((f) => f.id === selectedFarmId) || farms[0];
    onAddCrop({
      farmId: farm?.id || 'farm-1',
      farmName: farm?.farmName || 'Default Plot',
      farmerId: 'user-farmer-1',
      cropName: cropName.trim(),
      variety: variety.trim() || 'Standard Certified',
      plantedDate,
      expectedHarvestDate,
      soilMetrics: {
        nitrogen_N: Number(nitrogen),
        phosphorus_P: Number(phosphorus),
        potassium_K: Number(potassium),
        pH: Number(pH),
        moisturePercent: Number(moisture)
      },
      status: 'Sowing'
    });
    setCropName('');
    setVariety('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-emerald-400" />
            <span>Farm Plots & Crop Cycle Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Map agricultural land parcels, log planting cycles, and calibrate soil nutrient levels
          </p>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Setup Farm Profile */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Setup Farm Profile</h3>
          </div>

          <form onSubmit={handleCreateFarm} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Farm Plot Name</label>
              <input
                type="text"
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="e.g. Godavari Riverfront Sector B"
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Total Area (Acres)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={totalAreaAcre}
                onChange={(e) => setTotalAreaAcre(e.target.value)}
                placeholder="e.g. 12.5"
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">District</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Nashik"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Irrigation Mode</label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value as Farm['irrigationType'])}
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Drip">Drip Irrigation (Water Efficient)</option>
                <option value="Sprinkler">Micro Sprinkler System</option>
                <option value="Canal">Canal / Surface Flow</option>
                <option value="Rainfed">Rainfed / Monsoonal</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Farm Profile</span>
            </button>
          </form>

          {/* Existing Plots list */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400">Registered Parcels ({farms.length})</span>
            <div className="space-y-1.5">
              {farms.map((f) => (
                <div
                  key={f.id}
                  className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{f.farmName}</div>
                    <div className="text-[11px] text-slate-400">
                      {f.totalAreaAcre} Acres • {f.location.district}, {f.location.state} • {f.irrigationType}
                    </div>
                  </div>
                  {farms.length > 1 && (
                    <button
                      onClick={() => onDeleteFarm(f.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400"
                      title="Delete Farm Plot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Register Crop & Soil Profile */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Wheat className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Register Crop & Soil Profile</h3>
          </div>

          <form onSubmit={handleCreateCrop} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Target Farm Plot</label>
                <select
                  value={selectedFarmId}
                  onChange={(e) => setSelectedFarmId(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {farms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.farmName} ({f.totalAreaAcre} Acres)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Crop Name</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Basmati Paddy, Sharbati Wheat, Cotton"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Seed Variety</label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. PB-1121"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Sowing Date</label>
                <input
                  type="date"
                  required
                  value={plantedDate}
                  onChange={(e) => setPlantedDate(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Harvest Date</label>
                <input
                  type="date"
                  required
                  value={expectedHarvestDate}
                  onChange={(e) => setExpectedHarvestDate(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Soil Metrics Calibration Panel */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-750 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Soil Chemistry & Moisture Telemetry</span>
                </span>
                <span className="text-[11px] text-slate-400">Nutrients in kg/ha</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-medium">Nitrogen (N)</label>
                  <input
                    type="number"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(Number(e.target.value))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Phosphorus (P)</label>
                  <input
                    type="number"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(Number(e.target.value))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Potassium (K)</label>
                  <input
                    type="number"
                    value={potassium}
                    onChange={(e) => setPotassium(Number(e.target.value))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Soil pH</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4.0"
                    max="9.5"
                    value={pH}
                    onChange={(e) => setPH(Number(e.target.value))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Moisture %</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={farms.length === 0}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Register Crop Cycle</span>
            </button>
          </form>
        </div>
      </div>

      {/* Active Crops Lifecycle Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Wheat className="w-4 h-4 text-emerald-400" />
              <span>Active Farm Crops & Lifecycle Monitoring</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Change stage or calibrate live N-P-K readings dynamically
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400">{crops.length} Plantings</span>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3 px-3">Crop Name</th>
                <th className="py-3 px-3">Farm Parcel</th>
                <th className="py-3 px-3">Planted & Harvest Period</th>
                <th className="py-3 px-3">Soil Nutrients (N-P-K)</th>
                <th className="py-3 px-3">pH</th>
                <th className="py-3 px-3">Lifecycle Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {crops.map((c) => {
                const isHealthyPh = c.soilMetrics.pH >= 6.0 && c.soilMetrics.pH <= 7.5;
                return (
                  <tr key={c.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white text-xs">{c.cropName}</div>
                      <div className="text-[11px] text-slate-400">{c.variety}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {c.farmName || 'Assigned Parcel'}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>{c.plantedDate}</div>
                      <div className="text-[10px] text-slate-400">to {c.expectedHarvestDate}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-200">
                      {c.soilMetrics.nitrogen_N}-{c.soilMetrics.phosphorus_P}-{c.soilMetrics.potassium_K}
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
                        {c.soilMetrics.pH.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={c.status}
                        onChange={(e) => onUpdateCrop(c.id, { status: e.target.value as CropStatus })}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="Sowing">Sowing</option>
                        <option value="Vegetative">Vegetative</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Harvest-Ready">Harvest-Ready</option>
                        <option value="Harvested">Harvested</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
