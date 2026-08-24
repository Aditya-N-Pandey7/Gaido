import React, { useState, useEffect } from 'react';
import { 
  Heart, ArrowRight, Compass 
} from 'lucide-react';
import { AuthModal } from './components/common/AuthModal';
import { PlannerScreen } from './screens/PlannerScreen';
import { DESTINATION_IMAGES } from './services/api';
import gaidoLogo from '../Gaido_logo.jpeg';

const BACKEND_DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    category: 'FEATURED DESTINATION',
    tag: 'BEACH',
    price: '₹15,000',
    rating: 4.8,
    reviews: '3,210',
    days: '3-5 days',
    description: 'Sun-kissed beaches, Portuguese heritage & calm coastal vibes',
    bgImage: DESTINATION_IMAGES['Goa'].image,
    badges: DESTINATION_IMAGES['Goa'].badges
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    category: 'ROYAL HERITAGE',
    tag: 'CULTURE',
    price: '₹18,000',
    rating: 4.9,
    reviews: '4,520',
    days: '4-6 days',
    description: 'The Pink City of grand palaces, hill forts & vibrant bazaars',
    bgImage: DESTINATION_IMAGES['Jaipur'].image,
    badges: DESTINATION_IMAGES['Jaipur'].badges
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    category: 'HIMALAYAN ADVENTURE',
    tag: 'ADVENTURE',
    price: '₹22,000',
    rating: 4.9,
    reviews: '5,100',
    days: '5-7 days',
    description: 'Snow-capped peaks, Solang Valley sports & serene pine forests',
    bgImage: DESTINATION_IMAGES['Manali'].image,
    badges: DESTINATION_IMAGES['Manali'].badges
  },
  {
    id: 'munnar',
    name: 'Munnar',
    country: 'India',
    category: 'TEA GARDENS',
    tag: 'NATURE',
    price: '₹14,000',
    rating: 4.8,
    reviews: '2,890',
    days: '3-4 days',
    description: 'Rolling green tea plantations & cool mist-covered hills',
    bgImage: DESTINATION_IMAGES['Munnar'].image,
    badges: DESTINATION_IMAGES['Munnar'].badges
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    country: 'India',
    category: 'SPIRITUAL & ANCIENT',
    tag: 'SPIRITUAL',
    price: '₹12,000',
    rating: 4.7,
    reviews: '6,400',
    days: '3-5 days',
    description: 'Sacred Ganges ghats, evening Aarti & spiritual heritage',
    bgImage: DESTINATION_IMAGES['Varanasi'].image,
    badges: DESTINATION_IMAGES['Varanasi'].badges
  }
];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'planner' | 'experiences' | 'guides' | 'community'>('explore');
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);

  const currentHero = BACKEND_DESTINATIONS[selectedDestinationIndex];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1800; // 1.8 seconds loading progress
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setSplashProgress(100);
        setTimeout(() => {
          setShowSplash(false);
        }, 300);
      } else {
        setSplashProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-100 font-sans relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* SPAZORLABS-like Animated Splash Screen overlay */}
      {showSplash && (
        <div className="fixed inset-0 z-50 bg-[#070b12] flex flex-col justify-between p-12 transition-opacity duration-500">
          <div />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(251,191,36,0.15)] animate-pulse">
              <img 
                src={gaidoLogo} 
                alt="Gaido Logo" 
                className="w-16 h-16 object-contain rounded-full"
              />
            </div>
          </div>
          <div className="space-y-6 max-w-7xl mx-auto w-full">
            <div className="text-[64px] font-extrabold font-mono tracking-tighter text-slate-100/90 leading-none select-none">
              {splashProgress} <span className="text-amber-400">%</span>
            </div>
            <div className="w-full h-[1px] bg-slate-800 relative overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-out"
                style={{ width: `${splashProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[28px] font-black tracking-tight text-white uppercase select-none flex items-center gap-1.5">
                  GAI<span className="text-amber-400">DO</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 block font-mono">
                  Your Own Travel App
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase select-none hidden sm:inline">
                Privacy-First Intel Engine
              </span>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'explore' && (
        <div className="absolute top-0 inset-x-0 h-[85vh] overflow-hidden pointer-events-none z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-700 scale-105"
            style={{ backgroundImage: `url('${currentHero.bgImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/60 to-[#0b0d12]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12]/90 via-transparent to-[#0b0d12]/80" />
        </div>
      )}

      {/* Header */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('explore')}>
          <img 
            src={gaidoLogo} 
            alt="Gaido - Your Own Travel App" 
            className="h-10 w-auto object-contain bg-white/95 rounded-lg px-2.5 shadow-sm hover:opacity-90 transition"
          />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => setActiveTab('explore')} 
            className={`transition hover:text-white ${activeTab === 'explore' ? 'text-white font-semibold' : ''}`}
          >
            Explore
          </button>
          <button 
            onClick={() => setActiveTab('planner')} 
            className={`transition hover:text-white flex items-center gap-1.5 ${activeTab === 'planner' ? 'text-amber-400 font-semibold' : ''}`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            AI Planner
          </button>
          <button 
            onClick={() => setActiveTab('experiences')} 
            className={`transition hover:text-white ${activeTab === 'experiences' ? 'text-white font-semibold' : ''}`}
          >
            Experiences
          </button>
          <button 
            onClick={() => setActiveTab('guides')} 
            className={`transition hover:text-white ${activeTab === 'guides' ? 'text-white font-semibold' : ''}`}
          >
            Guides
          </button>
          <button 
            onClick={() => setActiveTab('community')} 
            className={`transition hover:text-white ${activeTab === 'community' ? 'text-white font-semibold' : ''}`}
          >
            Community
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAuthModal(true)}
            className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition"
          >
            Sign In
          </button>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-full transition shadow-[0_0_25px_rgba(251,191,36,0.35)] active:scale-95"
          >
            Start Exploring
          </button>
        </div>
      </header>

      {/* Main View */}
      <main className="relative z-20 max-w-7xl mx-auto px-6">
        {activeTab === 'planner' ? (
          <div className="pt-8 pb-20">
            <PlannerScreen />
          </div>
        ) : (
          <div className="pt-12 pb-24 space-y-24">
            
            <div className="min-h-[60vh] flex flex-col justify-between">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold">
                      {currentHero.category}
                    </span>
                    <div className="h-[1px] w-12 bg-amber-500/40" />
                  </div>

                  <h1 className="text-6xl sm:text-8xl font-serif font-normal tracking-tight text-white capitalize leading-[0.9]">
                    {currentHero.name}
                  </h1>

                  <p className="text-xl sm:text-2xl text-slate-300 font-serif italic max-w-xl">
                    "{currentHero.description}"
                  </p>

                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    {currentHero.country}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => setActiveTab('planner')}
                      className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-full text-sm flex items-center gap-2 transition shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                    >
                      Plan Trip with AI <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex lg:flex-col justify-end gap-3 pt-6 lg:pt-0">
                  {BACKEND_DESTINATIONS.map((dest, idx) => (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDestinationIndex(idx)}
                      className={`relative w-24 h-16 lg:w-32 lg:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedDestinationIndex === idx
                          ? 'border-amber-400 scale-105 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={dest.bgImage} alt={dest.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-white">Backend Destinations</h2>
                  <p className="text-xs text-slate-400 mt-1">Populated directly from your vector database files</p>
                </div>
                <button 
                  onClick={() => setActiveTab('planner')}
                  className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                >
                  Query Local RAG <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BACKEND_DESTINATIONS.map((item) => (
                  <div 
                    key={item.id}
                    className="group bg-[#12151e]/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition duration-300 flex flex-col shadow-xl cursor-pointer"
                    onClick={() => setActiveTab('planner')}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.bgImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-slate-950/70 backdrop-blur-md rounded-md text-[10px] font-mono tracking-widest text-amber-300 border border-amber-500/20 uppercase">
                          {item.tag}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-slate-950/60 backdrop-blur-md rounded-full text-slate-300 hover:text-rose-500 border border-slate-700/50 transition"
                      >
                        <Heart className={`w-4 h-4 ${favorites[item.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-2xl font-serif text-white">{item.name}</h3>
                          <div className="text-right">
                            <span className="text-xl font-bold font-serif text-amber-400">{item.price}</span>
                            <span className="text-[10px] text-slate-500 block">estimated cost</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{item.country}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.badges.map((badge, bIdx) => (
                          <span 
                            key={bIdx}
                            className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[9px] font-mono tracking-wider text-slate-400"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      <AuthModal 
        isOpen={showAuthModal} 
        onLoginSuccess={() => setShowAuthModal(false)} 
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default App;