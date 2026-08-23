import React from 'react';
import { Search, ShieldCheck, Users, Sparkles, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { LeftBorderCard } from '../components/common/LeftBorderCard';
import { DensityBar } from '../components/common/DensityBar';
import { useAppStore } from '../store/useAppStore';

export const DiscoverScreen: React.FC = () => {
  const { user, setActiveTab } = useAppStore();

  return (
    <div className="pb-24 pt-4 px-4 w-full space-y-5 bg-background min-h-screen">
      <div className="bg-gradient-to-r from-primary to-indigo-900 rounded-2xl p-5 text-white shadow-lg space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Gaido AI Engine</span>
            <h1 className="text-2xl font-bold mt-1">Namaste, {user.name} 👋</h1>
          </div>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Where are you traveling in India today? Smart crowd prediction and real-time safety telemetry ready.
        </p>
        <button
          onClick={() => setActiveTab('planner')}
          className="w-full bg-accent hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
        >
          CREATE NEW TRIP PLAN <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Jaipur, Kerala, Varanasi, Taj Mahal..."
          className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start space-x-3 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-[10px] font-bold text-amber-800 tracking-wider">PRIVACY VERIFIED BY GAIDO</span>
          <p className="text-xs text-amber-950 mt-0.5">Government-grade telemetry encryption. Zero track logging.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-textDark flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" /> Gaido AI Suggestions
          </h2>
          <span className="text-xs font-semibold text-primary cursor-pointer">View All</span>
        </div>

        <div className="overflow-x-auto flex space-x-4 pb-2 scrollbar-none">
          <LeftBorderCard borderColor="border-accent" className="min-w-[270px] flex-shrink-0 !p-0 overflow-hidden shadow-sm">
            <div className="relative h-36 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600"
                alt="Kerala Backwaters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end p-3">
                <div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase">Optimal Season</span>
                  <h3 className="text-white font-bold text-base">Kerala Backwaters & Munnar</h3>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-textGray flex items-center gap-1"><Calendar className="w-3 h-3" /> 7 Days</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded-full">Low Crowd Match</span>
              </div>
              <p className="text-xs text-textGray line-clamp-2">
                Route optimized around rainfall and heavy tourism hubs in Munnar.
              </p>
              <button
                onClick={() => setActiveTab('planner')}
                className="w-full bg-primary text-white font-bold text-xs py-2 rounded-lg hover:bg-primary/90 transition"
              >
                VIEW ITINERARY
              </button>
            </div>
          </LeftBorderCard>

          <LeftBorderCard borderColor="border-primary" className="min-w-[270px] flex-shrink-0 !p-0 overflow-hidden shadow-sm">
            <div className="relative h-36 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600"
                alt="Jaipur Forts"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end p-3">
                <div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase">Cultural Peak</span>
                  <h3 className="text-white font-bold text-base">Jaipur Royal Heritage</h3>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-textGray flex items-center gap-1"><Calendar className="w-3 h-3" /> 4 Days</span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-full">Moderate Density</span>
              </div>
              <p className="text-xs text-textGray line-clamp-2">
                Timed fort admissions to skip peak morning crowd queues.
              </p>
              <button
                onClick={() => setActiveTab('planner')}
                className="w-full bg-primary text-white font-bold text-xs py-2 rounded-lg hover:bg-primary/90 transition"
              >
                VIEW ITINERARY
              </button>
            </div>
          </LeftBorderCard>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-textDark flex items-center gap-1.5">
          <Users className="w-4 h-4 text-primary" /> Live Crowd Telemetry
        </h2>

        <div className="bg-white p-4 rounded-xl shadow-sm space-y-2 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-textDark flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Taj Mahal, Agra
            </span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">PEAK CROWD</span>
          </div>
          <DensityBar level={82} />
          <div className="flex justify-between text-[10px] text-textGray font-bold">
            <span>LOW</span>
            <span className="text-warning">CRITICAL (82%)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm space-y-2 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-textDark flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Amer Fort, Jaipur
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">MODERATE</span>
          </div>
          <DensityBar level={45} />
          <div className="flex justify-between text-[10px] text-textGray font-bold">
            <span>LOW</span>
            <span className="text-accent">BALANCED (45%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
