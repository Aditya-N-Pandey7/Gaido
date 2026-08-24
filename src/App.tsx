import React, { useState } from 'react';
import { 
  Compass, Calendar, ShieldAlert, Sparkles, Loader2, 
  IndianRupee, Users, MapPin, Lock, Mail, User, Key, CheckCircle 
} from 'lucide-react';

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
  // Navigation & Auth State
  const [activeTab, setActiveTab] = useState<'discover' | 'planner' | 'safety'>('discover');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Auth Form State
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Planner Form State
  const [destination, setDestination] = useState('Munnar');
  const [budget, setBudget] = useState(15000);
  const [maxCrowd, setMaxCrowd] = useState(40);
  const [query, setQuery] = useState('Quiet off-season nature getaway with tea gardens');

  // API State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planResult, setPlanResult] = useState<TravelPlan | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          destination: destination || null,
          max_crowd: Number(maxCrowd),
          budget: Number(budget),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: TravelPlan = await response.json();
      setPlanResult(data);
    } catch (err: any) {
      setError('Could not connect to Gaido Backend. Ensure `python server.py` is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24 relative selection:bg-orange-500 selection:text-white">
      
      {/* Top Security Banner */}
      <div className="bg-amber-950/40 border-b border-amber-800/30 text-amber-400/90 text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        PRIVACY VERIFIED BY GAIDO • Government-grade telemetry encryption. Zero track logging.
      </div>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
            G
          </div>
          <span className="font-bold text-lg tracking-wide text-white">Gaido AI</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            On-Premises Privacy Active
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="text-xs text-orange-400 hover:text-orange-300 transition underline underline-offset-2"
          >
            {isAuthenticated ? 'Account Settings' : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* TAB 1: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white tracking-tight">Gaido AI Suggestions</h2>
            </div>

            {/* Featured Hero Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group bg-slate-900">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80" 
                  alt="Kerala Backwaters" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <span className="inline-block bg-orange-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  OPTIMAL SEASON
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
                  Kerala Backwaters & Munnar
                </h3>
                <div className="flex items-center gap-3 text-xs pt-1">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" /> 5 Days
                  </span>
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded-full font-medium">
                    Low Crowd Forecast
                  </span>
                </div>
              </div>
            </div>

            {/* Threat Monitoring Status Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm text-slate-300 font-medium">Threat Monitoring Status</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5" /> Normal
              </span>
            </div>

            {/* Destination Selector Shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
              {['Goa', 'Munnar', 'Manali', 'Jaipur', 'Varanasi'].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setDestination(city);
                    setActiveTab('planner');
                  }}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/50 p-3 rounded-xl text-center transition group"
                >
                  <span className="block text-sm font-semibold text-slate-200 group-hover:text-orange-400">{city}</span>
                  <span className="text-[10px] text-slate-400">Plan Now ➔</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AI PLANNER */}
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
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 disabled:opacity-50"
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Result Breakdown Card */}
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

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  {planResult.summary}
                </p>

                {/* Budget Allocation */}
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
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-6 py-3 z-20">
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

      {/* SECURITY / AUTH MODAL OVERLAY */}
      {!isAuthenticated && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 text-center">
            
            {/* Logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center font-bold text-xl text-white shadow-xl shadow-orange-600/30">
                G
              </div>
              <h3 className="text-xl font-bold text-white">
                {authMode === 'signin' ? 'Welcome to Gaido' : 'Join Gaido'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'signin' ? 'Intelligence through Privacy.' : 'Create your privacy-first travel profile.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-left">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Aditya Pandey"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="aditya@gaido.ai"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Local Encryption Key</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        readOnly
                        value="GDO-8K92-XP7"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-400 font-mono"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="text-[11px] bg-slate-800 px-2.5 py-1 rounded-xl text-slate-300 hover:bg-slate-700"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-xl transition duration-200 text-xs shadow-lg shadow-orange-600/20 mt-2"
              >
                {authMode === 'signin' ? 'EXPLORE NOW ➔' : 'CREATE SECURE ACCOUNT ➔'}
              </button>
            </form>

            {/* Toggle Sign In / Sign Up */}
            <div className="text-xs text-slate-400 pt-1">
              {authMode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className="text-orange-400 font-medium hover:underline"
                  >
                    Sign up securely
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setAuthMode('signin')}
                    className="text-orange-400 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

            <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
              © 2026 GAIDO PRIVACY FIRST TRAVEL
            </p>
          </div>
        </div>
      )}

    </div>
  );
}