import { create } from 'zustand';
import { TabType, UserState } from '../types';

interface AppStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: UserState;
  destination: string;
  setDestination: (d: string) => void;
  budgetFilter: string;
  groupType: 'Couple' | 'Family' | 'Solo';
  setBudgetFilter: (b: string) => void;
  setGroupType: (g: 'Couple' | 'Family' | 'Solo') => void;
  selectedDays: number;
  setSelectedDays: (n: number) => void;
  interests: string[];
  toggleInterest: (interest: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeTab: 'discover',
  setActiveTab: (tab) => set({ activeTab: tab }),
  user: {
    sessionId: 'session_8921',
    name: 'Ananya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  destination: 'Jaipur, Rajasthan',
  setDestination: (destination) => set({ destination }),
  budgetFilter: 'Moderate (₹8,000–₹20,000/day)',
  groupType: 'Couple',
  setBudgetFilter: (budgetFilter) => set({ budgetFilter }),
  setGroupType: (groupType) => set({ groupType }),
  selectedDays: 4,
  setSelectedDays: (selectedDays) => set({ selectedDays }),
  interests: ['Culture', 'Heritage', 'Food'],
  toggleInterest: (interest) =>
    set((state) => ({
      interests: state.interests.includes(interest)
        ? state.interests.filter((i) => i !== interest)
        : [...state.interests, interest],
    })),
}));
