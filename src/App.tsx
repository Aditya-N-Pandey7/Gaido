import React, { useState } from 'react';
import { 
  MapPin, Compass, ShieldCheck, AlertTriangle, ArrowRight, Loader2, 
  User, LogIn, LogOut, Calendar, Search, Sparkles, X 
} from 'lucide-react';
import gaidoLogo from '../Gaido_logo.jpeg';

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
  crowd_score?: number;
  summary: string;
  budget_breakdown: BudgetBreakdown;
  estimated_cost?: number;
  itinerary_highlights: string[];
  itinerary?: string[];
  health_and_safety_advisory: string;
}

interface DestinationCard {
  id: string;
  name: string;
  state: string;
  tag: string;
  crowd: number;
  baseBudget: number;
  bestMonths: string;
  image: string;
  desc: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    id: 'Goa',
    name: 'Goa',
    state: 'Goa',
    tag: 'BEACH & COASTAL',
    crowd: 25,
    baseBudget: 15000,
    bestMonths: 'Nov - Feb (Pleasant) / May (Shoulder)',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    desc: 'Golden sandy beaches, Portuguese architecture, and vibrant coastal cuisine.'
  },
  {
    id: 'Jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tag: 'HERITAGE & FORTS',
    crowd: 45,
    baseBudget: 18000,
    bestMonths: 'Oct - Mar',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    desc: 'The historic Pink City, home to majestic palaces, grand forts, and royal bazaars.'
  },
  {
    id: 'Manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tag: 'SNOW & VALLEY',
    crowd: 38,
    baseBudget: 16500,
    bestMonths: 'Mar - Jun (Greenery) / Dec - Feb (Snow)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    desc: 'High-altitude Himalayan valley retreat with pine forests and cedar trails.'
  },
  {
    id: 'Munnar',
    name: 'Munnar',
    state: 'Kerala',
    tag: 'TEA GARDENS & MIST',
    crowd: 20,
    baseBudget: 14000,
    bestMonths: 'Sep - Mar',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    desc: 'Rolling emerald tea plantations, misty valleys, and fresh mountain air.'
  },
  {
    id: 'Varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tag: 'SPIRITUAL & GHATS',
    crowd: 55,
    baseBudget: 11000,
    bestMonths: 'Oct - Mar',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    desc: 'Ancient spiritual heart along the Ganga river with evening aarti ceremonies.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'planner' | 'bookings'>('discover');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Planner States
  const [preferences, setPreferences] = useState('Quiet getaway with low crowd density and scenic nature');
  const [destination, setDestination] = useState('Goa');
  const [maxCrowd, setMaxCrowd] = useState(40);
  const [budget, setBudget] = useState(15000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TravelPlan | null>(null);

  // Search & Filter state for Discover
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup') {
      setUser({ name: authName || 'Traveler', email: authEmail });
    } else {
      setUser({ name: authEmail.split('@')[0] || 'Traveler', email: authEmail });
    }
    setShowAuthModal(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleGeneratePlan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: preferences,
          destination: destination,
          max_crowd: Number(maxCrowd),
          budget: Number(budget)
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status code: ${response.status}`);
      }

      const data: TravelPlan = await response.json();
      setResult(data);
      setActiveTab('planner');
    } catch (err: any) {
      setError('Unable to reach Gaido Backend. Make sure `python server.py` is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const launchPlannerForDestination = (destName: string, defaultBudget: number) => {
    setDestination(destName);
    setBudget(defaultBudget);
    setActiveTab('planner');
  };

  const filteredDestinations = DESTINATIONS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || item.tag.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const currentDestinationMeta = DESTINATIONS.find(d => d.name === (result?.destination || destination)) || DESTINATIONS[0];
  const displayCost = result?.budget_breakdown?.total ?? result?.estimated_cost ?? budget;
  const displayCrowd = result?.crowd_index ?? result?.crowd_score ?? maxCrowd;
  const displayItinerary = result?.itinerary_highlights || result?.itinerary || [];

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090e18]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Gaido Brand Logo */}
            <div 
              onClick={() => setActiveTab('discover')} 
              className="flex items-center cursor-pointer py-1 bg-white/95 rounded-lg px-2.5 shadow-sm hover:opacity-90 transition"
            >
              <img 
                src={gaidoLogo} 
                alt="Gaido - Your Own Travel App" 
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'discover' 
                    ? 'bg-slate-800 text-amber-400 font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setActiveTab('planner')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'planner' 
                    ? 'bg-slate-800 text-amber-400 font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Trip Planner
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'bookings' 
                    ? 'bg-slate-800 text-amber-400 font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Saved Itineraries
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e1626] border border-slate-800 rounded-xl text-xs text-slate-300">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md shadow-amber-500/20 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* ================= VIEW 1: DISCOVER GRID ================= */}
        {activeTab === 'discover' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
              <h1 className="text-4xl font-serif font-bold text-slate-50 tracking-tight">
                Explore Authentic India
              </h1>
              <p className="text-slate-400 text-sm">
                Discover destinations filtered by low crowd density, seasonal optimal windows, and local verified data.
              </p>

              {/* Search Bar & Filters */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by city, state, or vibe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0e1626] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['ALL', 'BEACH', 'FORTS', 'SNOW', 'TEA', 'SPIRITUAL'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-mono whitespace-nowrap transition border ${
                        selectedTag === tag 
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-500' 
                          : 'bg-[#0e1626] text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredDestinations.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#0e1626] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">{item.name}</h3>
                      <span className="text-[11px] bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded-full font-medium">
                        Crowd: {item.crowd}%
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="space-y-2 border-t border-slate-800/80 pt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-mono">Best Season:</span>
                        <span className="text-slate-300 font-medium">{item.bestMonths}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-mono">Estimated Base:</span>
                        <span className="text-amber-400 font-bold">₹{item.baseBudget.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => launchPlannerForDestination(item.name, item.baseBudget)}
                      className="w-full mt-2 py-2.5 bg-[#090e18] hover:bg-amber-500 hover:text-black text-slate-200 border border-slate-800 hover:border-amber-500 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Plan {item.name} Trip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: AI TRIP PLANNER ================= */}
        {activeTab === 'planner' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center pt-2">
              <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-50">
                Trip Generator
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Customize constraints to synthesize an itinerary.
              </p>
            </div>

            {/* Input Form Card */}
            <div className="bg-[#0e1626] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-5">
              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    Travel Preferences & Intent
                  </label>
                  <textarea
                    rows={3}
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="w-full bg-[#090e18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition resize-none placeholder:text-slate-600"
                    placeholder="Describe your ideal trip..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#090e18] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition cursor-pointer appearance-none"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    <span>Max Crowd Limit:</span>
                    <span className="text-amber-400 font-bold">{maxCrowd}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={maxCrowd}
                    onChange={(e) => setMaxCrowd(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                    Max Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-[#090e18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 mt-2 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Itinerary...
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      Generate Plan for {destination}
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="bg-red-950/40 border border-red-800/80 text-red-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Results Hero Card */}
            <div className="bg-[#0e1626] border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl space-y-6 pb-6">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={currentDestinationMeta.image}
                  alt={result?.destination || destination}
                  className="w-full h-full object-cover brightness-90 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-[#0e1626]/40 to-transparent"></div>

                <div className="absolute bottom-4 left-6 right-6 space-y-1.5">
                  <span className="inline-block bg-amber-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded font-mono uppercase tracking-wider">
                    {currentDestinationMeta.tag}
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-white drop-shadow">
                    {result?.destination || destination}
                  </h2>
                  <div className="flex items-center gap-4 text-xs pt-1">
                    <span className="text-slate-300 font-medium">
                      Estimated Cost: <strong className="text-white">₹{displayCost.toLocaleString()}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/70 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Crowd Score: {displayCrowd}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 space-y-5">
                <h3 className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                  GENERATED ITINERARY
                </h3>

                <div className="bg-[#090e18] border border-slate-800/80 p-4 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {result ? (
                    result.summary
                  ) : (
                    <span className="text-slate-500 italic">
                      Click "Generate Plan for {destination}" above to synthesize your itinerary.
                    </span>
                  )}
                </div>

                {result?.budget_breakdown && (
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-[#090e18] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Stay</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-200">₹{result.budget_breakdown.stay}</span>
                    </div>
                    <div className="bg-[#090e18] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Food & Local</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-200">₹{result.budget_breakdown.food_and_local_travel}</span>
                    </div>
                    <div className="bg-[#090e18] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Buffer</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-200">₹{result.budget_breakdown.buffer}</span>
                    </div>
                  </div>
                )}

                {displayItinerary.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Key Highlights</h4>
                    <div className="space-y-2">
                      {displayItinerary.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result?.health_and_safety_advisory && (
                  <div className="bg-amber-950/20 border border-amber-800/40 p-3.5 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400 block mb-1 font-mono uppercase text-[10px]">Safety Advisory:</strong>
                    {result.health_and_safety_advisory}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: SAVED / BOOKINGS ================= */}
        {activeTab === 'bookings' && (
          <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-amber-400">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">No Saved Plans Yet</h2>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              {user 
                ? "Generate an itinerary in the AI Trip Planner and bookmark it to sync across your off-grid Aegis devices."
                : "Sign in to save generated travel plans, manage offline maps, and synchronize live telemetry."}
            </p>
            {!user ? (
              <button
                onClick={() => setShowAuthModal(true)}
                className="mt-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs shadow-lg shadow-amber-500/20"
              >
                Sign In to Save
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('discover')}
                className="mt-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs"
              >
                Explore Destinations
              </button>
            )}
          </div>
        )}

      </main>

      {/* ================= AUTHENTICATION MODAL ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'login' 
                  ? 'Access your saved trips and off-grid telemetry configurations.' 
                  : 'Start planning authentic, crowd-aware travel itineraries.'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Aditya Pandey"
                    className="w-full bg-[#090e18] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#090e18] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090e18] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition mt-2"
              >
                {authMode === 'login' ? 'Sign In' : 'Register Account'}
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-400">
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-amber-400 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-amber-400 font-semibold hover:underline"
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}