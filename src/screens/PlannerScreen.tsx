import React, { useState } from 'react';
import { useTripPlanner } from '../hooks/useTripPlanner';
import { DESTINATION_IMAGES, PlanTripRequest } from '../services/api';
import { Compass, Loader2, AlertCircle, MapPin, ShieldCheck } from 'lucide-react';

export const PlannerScreen: React.FC = () => {
  const { data, loading, error, generatePlan } = useTripPlanner();

  const [formState, setFormState] = useState<PlanTripRequest>({
    query: 'Quiet getaway with low crowd density and scenic nature',
    destination: 'Goa',
    max_crowd: 40,
    budget: 15000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePlan(formState);
  };

  const selectedMeta = DESTINATION_IMAGES[formState.destination] || DESTINATION_IMAGES['Goa'];
  const activeResultMeta = data ? (DESTINATION_IMAGES[data.destination] || selectedMeta) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100 relative">
      {/* Dynamic background photo of selected destination */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-700">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-1000 scale-105 opacity-45 filter blur-[1px]"
          style={{ backgroundImage: `url('${selectedMeta.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/70 to-[#0b0d12]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12]/80 via-transparent to-[#0b0d12]/70" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-5xl font-serif text-white">AI Trip Planner</h1>
        </div>

      {/* Form Input Container */}
      <form onSubmit={handleSubmit} className="bg-[#12151e]/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Travel Preferences & Intent
          </label>
          <textarea
            rows={2}
            value={formState.query}
            onChange={(e) => setFormState({ ...formState, query: e.target.value })}
            className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Destination (Backend Database)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <select
                value={formState.destination}
                onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
              >
                {Object.keys(DESTINATION_IMAGES).map((dest) => (
                  <option key={dest} value={dest} className="bg-slate-900 text-white">
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Max Crowd Limit: {formState.max_crowd}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={formState.max_crowd}
              onChange={(e) => setFormState({ ...formState, max_crowd: Number(e.target.value) })}
              className="w-full accent-amber-400 mt-2"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Max Budget (₹)
            </label>
            <input
              type="number"
              value={formState.budget}
              onChange={(e) => setFormState({ ...formState, budget: Number(e.target.value) })}
              className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(251,191,36,0.25)] active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Compass className="w-4 h-4" /> Generate Plan for {formState.destination}
            </>
          )}
        </button>
      </form>

      {/* Connection Error Message */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <strong className="font-semibold block">Backend Communication Error</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Backend Response View */}
      {data && activeResultMeta && (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#12151e] shadow-2xl">
            <div 
              className="h-56 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${activeResultMeta.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-[#12151e]/40 to-transparent" />
            </div>

            <div className="p-6 relative -mt-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-400 text-slate-950 uppercase">
                  {activeResultMeta.category}
                </span>
                <h3 className="text-3xl font-serif text-white mt-2">{data.destination}</h3>
                {data.budget_breakdown && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 max-w-sm space-y-2.5">
                    <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                      Budget Breakdown
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
                      <div className="text-slate-400">1. Stay:</div>
                      <div className="text-right font-mono text-slate-200">₹{data.budget_breakdown.stay}</div>
                      
                      <div className="text-slate-400">2. Travelling:</div>
                      <div className="text-right font-mono text-slate-200">₹{data.budget_breakdown.travelling}</div>
                      
                      <div className="text-slate-400">3. Emergency Fund:</div>
                      <div className="text-right font-mono text-slate-200">₹{data.budget_breakdown.emergency_fund}</div>
                      
                      <div className="border-t border-slate-800/80 pt-1.5 mt-1 text-slate-300 font-bold">
                        Total Estimated Budget:
                      </div>
                      <div className="border-t border-slate-800/80 pt-1.5 mt-1 text-right font-mono text-amber-400 font-bold">
                        ₹{data.budget_breakdown.total}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Crowd Score: {data.crowd_density_score}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              RAG Engine Generated Itinerary
            </h4>
            {data.itinerary?.map((item) => (
              <div key={item.day} className="p-5 rounded-xl bg-[#12151e]/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase">Day {item.day}</span>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 pl-1">
                  {item.activities.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};