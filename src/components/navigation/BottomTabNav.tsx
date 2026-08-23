import React from 'react';
import { Compass, Sparkles, BarChart2, Shield, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { TabType } from '../../types';

export const BottomTabNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'planner', label: 'AI Planner', icon: Sparkles },
    { id: 'forecaster', label: 'Forecast', icon: BarChart2 },
    { id: 'safety', label: 'Safety Hub', icon: Shield },
    { id: 'threats', label: 'Alerts', icon: AlertCircle },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 z-50">
      <div className="w-full flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-primary font-bold border-2 border-primary bg-primary/5'
                  : 'text-textGray hover:text-textDark border-2 border-transparent'
              }`}
            >
              <div className="p-0.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-textGray'}`} />
              </div>
              <span className="text-[10px] mt-0.5 leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
