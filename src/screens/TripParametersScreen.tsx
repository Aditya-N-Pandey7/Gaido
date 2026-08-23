import React from 'react';
import { Search, Sparkles, CheckCircle2, Bed, Utensils, Car, Shield, Clock, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const TripParametersScreen: React.FC = () => {
  const {
    destination,
    setDestination,
    groupType,
    setGroupType,
    budgetFilter,
    setBudgetFilter,
    selectedDays,
    setSelectedDays,
    interests,
    toggleInterest,
  } = useAppStore();

  const interestList = ['Culture', 'Heritage', 'Food', 'Nature', 'Shopping', 'Photography'];

  return (
    <div className="pb-24 pt-4 px-4 w-full space-y-5 bg-background min-h-screen">
      <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-primary flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4" /> Gaido Trip Configurator
          </h2>
          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">AI Configurator</span>
        </div>

        <div>
          <label className="text-xs font-semibold text-textGray">Destination & Vibe</label>
          <div className="relative mt-1">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs pr-9 text-textDark focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-textGray">Trip Duration</label>
          <div className="flex gap-2 mt-1">
            {[2, 3, 4, 7].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  selectedDays === days
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-textGray border-gray-200'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-textGray">Budget Profile</label>
          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs mt-1 text-textDark focus:outline-none"
          >
            <option>Moderate (₹8,000–₹20,000/day)</option>
            <option>Luxury (₹25,000+/day)</option>
            <option>Budget (₹2,500–₹6,500/day)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-textGray">Travel Group</label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {(['Couple', 'Family', 'Solo'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setGroupType(type)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  groupType === type
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-textGray border-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-textGray">Focus Interests</label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {interestList.map((tag) => {
              const active = interests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition ${
                    active
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-gray-50 border-gray-200 text-textGray'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Generate Optimized Plan
        </button>

        <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3 rounded-r-xl space-y-1">
          <span className="text-[10px] font-bold text-amber-800 tracking-wider">GAIDO AI CONTEXT</span>
          <p className="text-xs text-amber-950 leading-relaxed">
            Diwali season in {destination} generates extreme local crowd density. Monuments recommended for early morning 07:00 AM visits.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-textDark">Jaipur Festival Lights</h2>
            <p className="text-xs text-textGray font-medium">📅 Nov 10 – Nov 13, 2024 ({selectedDays} Days)</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
            96% MATCH
          </span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
          <div>
            <span className="text-[10px] text-textGray font-bold uppercase tracking-wider">TRIP VIABILITY</span>
            <p className="text-xs font-bold text-success">Optimal • Crowd Density Avoided</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <Bed className="w-4 h-4 text-primary mb-1" />
            <p className="text-[10px] text-textGray">Accommodation</p>
            <p className="text-sm font-bold text-textDark">₹36,000</p>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
              <div className="bg-primary h-1 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <Utensils className="w-4 h-4 text-accent mb-1" />
            <p className="text-[10px] text-textGray">Dining</p>
            <p className="text-sm font-bold text-textDark">₹22,500</p>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
              <div className="bg-accent h-1 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <Car className="w-4 h-4 text-amber-500 mb-1" />
            <p className="text-[10px] text-textGray">Transport</p>
            <p className="text-sm font-bold text-textDark">₹9,500</p>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
              <div className="bg-amber-500 h-1 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl text-white shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-[9px] uppercase font-bold tracking-wider opacity-80">TOTAL EST.</p>
              <p className="text-lg font-extrabold">₹68,000</p>
            </div>
            <span className="text-[8px] bg-white/20 px-2 py-0.5 rounded-full font-semibold self-start">
              WITHIN BUDGET
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-textDark flex items-center justify-between">
          <span>Day 1: Arrival & Illumination</span>
          <span className="text-xs text-primary font-normal cursor-pointer flex items-center gap-0.5">View Day 2 <ChevronRight className="w-3.5 h-3.5" /></span>
        </h3>

        <div className="relative pl-5 space-y-4 border-l-2 border-amber-300 ml-2">
          <div className="relative space-y-1">
            <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-amber-500" />
            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-primary font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> 02:00 PM • 2 hrs</span>
                <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded border border-amber-200/60 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> VERIFIED BY GAIDO
                </span>
              </div>
              <h4 className="font-bold text-xs text-textDark">Check-in at Heritage Haveli</h4>
              <p className="text-xs text-textGray">
                Settle into your boutique accommodation in the old city. Prime location for evening festivities.
              </p>
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500"
                alt="Heritage Haveli"
                className="w-full h-28 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
