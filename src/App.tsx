import React, { useState } from 'react';
import { Compass, Calendar, ShieldAlert, Sparkles, Loader2, IndianRupee, Users, MapPin } from 'lucide-react';

interface BudgetBreakdown {
  stay: number;
  food_and_local_travel: number;
  buffer: number;
  total: number;
}

interface TravelPlan {
  destination: string;
  recommended_month: string;
  crowd_index: number;
  summary: string;
  budget_breakdown: BudgetBreakdown;
  itinerary_highlights: string[];
  health_and_safety_advisory: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'planner' | 'safety'>('planner');
  
  // Planner Form State
  const [destination, setDestination] = useState('Munnar');
  const [budget, setBudget] = useState(15000);
  const [maxCrowd, setMaxCrowd] = useState(40);
  const [query, setQuery] = useState('Quiet off-season nature getaway with tea gardens');
  
  // API State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planResult, setPlanResult] = useState<TravelPlan | null>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          destination: destination || null,
          max_crowd: Number(maxCrowd),
          budget: Number(budget),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status}`);
      }

      const data: TravelPlan = await response.json();
      setPlanResult(data);
    } catch (err: any) {
      setError('Could not connect to Gaido Backend. Make sure `python server.py` is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24">
      {/* Top Banner */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/30">
            G
          </div>
          <span className="font-bold text-lg tracking-wide text-white">Gaido AI</span>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          On-Premises Privacy Active
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        
        {/* TAB 1: AI PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-orange-500 font-semibold">
                <Sparkles className="w-5 h-5" />
                <h2>Smart On-Premises Travel Engine</h2>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Destination */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Destination
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    >
                      <option value="Goa">Goa</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Manali">Manali</option>
                      <option value="Munnar">Munnar</option>
                      <option value="Varanasi">Varanasi</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Total Budget (INR)
                    </label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Crowd Tolerance */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max Crowd Index</span>
                      <span className="text-orange-400 font-mono">{maxCrowd}/100</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={maxCrowd}
                      onChange={(e) => setMaxCrowd(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer mt-2"
                    />
                  </div>
                </div>

                {/* Free Query / Vibes */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Trip Vibes & Preferences</label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Snowy adventures, cultural walks, quiet monsoon retreats"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Running Local RAG Inference...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Personalized Itinerary
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Results Display Card */}
            {planResult && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      {planResult.destination}
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {planResult.recommended_month}
                      </span>
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Crowd Forecast</span>
                    <span className="text-sm font-semibold text-emerald-400 font-mono">
                      {planResult.crowd_index}/100 Index
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  {planResult.summary}
                </p>

                {/* Budget Breakdown Grid */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Estimated Budget Allocation
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-500 block">Stay</span>
                      <span className="text-base font-bold text-slate-200">₹{planResult.budget_breakdown.stay}</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-500 block">Food & Travel</span>
                      <span className="text-base font-bold text-slate-200">₹{planResult.budget_breakdown.food_and_local_travel}</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-500 block">Emergency Buffer</span>
                      <span className="text-base font-bold text-slate-200">₹{planResult.budget_breakdown.buffer}</span>
                    </div>
                    <div className="bg-orange-950/40 p-3 rounded-xl border border-orange-800/50">
                      <span className="text-xs text-orange-400 block font-medium">Estimated Total</span>
                      <span className="text-base font-bold text-orange-300">₹{planResult.budget_breakdown.total}</span>
                    </div>
                  </div>
                </div>

                {/* Itinerary Highlights */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Highlights & Activities
                  </h4>
                  <ul className="space-y-2">
                    {planResult.itinerary_highlights.map((item, index) => (
                      <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Health & Safety Advisory */}
                <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Safety & Health Advisory</h5>
                    <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                      {planResult.health_and_safety_advisory}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Popular Destinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Goa', 'Munnar', 'Manali', 'Jaipur', 'Varanasi'].map((city) => (
                <div key={city} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white">{city}</h4>
                    <p className="text-xs text-slate-400">12 Months of Historical Crowd Data Indexed</p>
                  </div>
                  <button
                    onClick={() => {
                      setDestination(city);
                      setActiveTab('planner');
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-200 border border-slate-700"
                  >
                    Plan Trip ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAFETY HUB */}
        {activeTab === 'safety' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              Safety & Data Sovereignty Hub
            </h3>
            <p className="text-sm text-slate-300">
              Gaido executes all inference on local hardware using an on-premises vector database (ChromaDB) and local LLM runtime (Ollama / Llama 3).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Zero Cloud Data Export</span>
                No search queries or location logs leave your server.
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">DPDP & ISO Aligned</span>
                Meets Indian digital personal data protection guidelines.
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Sticky Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-6 py-3">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center gap-1 text-xs transition ${
              activeTab === 'discover' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center gap-1 text-xs transition ${
              activeTab === 'planner' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>AI Planner</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex flex-col items-center gap-1 text-xs transition ${
              activeTab === 'safety' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span>Safety Hub</span>
          </button>
        </div>
      </nav>
    </div>
  );
}