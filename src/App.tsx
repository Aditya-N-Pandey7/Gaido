import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/navigation/Header';
import { BottomTabNav } from './components/navigation/BottomTabNav';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { TripParametersScreen } from './screens/TripParametersScreen';
import { CrowdForecasterScreen } from './screens/CrowdForecasterScreen';
import { SafetyHubScreen } from './screens/SafetyHubScreen';
import { ThreatIntelligenceScreen } from './screens/ThreatIntelligenceScreen';

export const App: React.FC = () => {
  const { activeTab } = useAppStore();

  const renderScreen = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverScreen />;
      case 'planner':
        return <TripParametersScreen />;
      case 'forecaster':
        return <CrowdForecasterScreen />;
      case 'safety':
        return <SafetyHubScreen />;
      case 'threats':
        return <ThreatIntelligenceScreen />;
      default:
        return <DiscoverScreen />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <main className="mx-auto max-w-md bg-background min-h-screen relative shadow-2xl overflow-hidden border-x border-slate-800">
        <Header />
        {renderScreen()}
        <BottomTabNav />
      </main>
    </div>
  );
};

export default App;
