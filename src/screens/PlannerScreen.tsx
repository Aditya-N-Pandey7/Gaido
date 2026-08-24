import React, { useState } from 'react';
import { useTripPlanner } from '../hooks/useTripPlanner';
import { Compass, Sparkles, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export const PlannerScreen: React.FC = () => {
  const { data, loading, error, generatePlan } = useTripPlanner();

  const [formState, setFormState] = useState({
    query: 'Budget-friendly, quiet getaway with low crowd density and scenic nature',
    destination: 'Goa',
    max_crowd: 40,
    budget: 15000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePlan(formState);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 text-slate-100">
      {/* Search Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-orange-400" />
          AI Trip Generator
        </h2>
        <p className="text-xs text-slate-400">
          Powered by local RAG backend & safety threat analysis engine.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
            Travel Intent / Preference
          </label>
          <textarea
            rows={2}
            value={formState.query}
            onChange={(e) => setFormState({ ...formState, query: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Destination
            </label>
            <input
              type="text"
              value={formState.destination}
              onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Max Crowd % ({formState.max_crowd}%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={formState.max_crowd}
              onChange={(e) => setFormState({ ...formState, max_crowd: Number(e.target.value) })}
              className="w-full accent-orange-500 mt-2"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Max Budget (₹)
            </label>
            <input
              type="number"
              value={formState.budget}
              onChange={(e) => setFormState({ ...formState, budget: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-orange-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-orange-500/10"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Querying Local Ollama + ChromaDB...
            </>
          ) : (
            <>
              <Compass className="w-4 h-4" /> Generate Privacy-First Plan
            </>
          )}
        </button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">Connection Error</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Structured Output Render */}
      {data && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{data.destination}</h3>
              <p className="text-xs text-slate-400">Estimated Cost: ₹{data.estimated_cost}</p>
            </div>
            <div className="text-right">
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30">
                Crowd Density: {data.crowd_density_score}%
              </span>
            </div>
          </div>

          {/* Itinerary Items */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">
              Generated Itinerary
            </h4>
            {data.itinerary?.map((item) => (
              <div key={item.day} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-orange-400 uppercase">Day {item.day}</span>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
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
  );
};
