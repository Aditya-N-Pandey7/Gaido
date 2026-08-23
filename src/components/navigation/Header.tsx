import React from 'react';
import { Bell } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { GaidoLogo } from '../common/GaidoLogo';

export const Header: React.FC = () => {
  const { user } = useAppStore();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2.5 flex justify-between items-center w-full">
      <GaidoLogo className="h-8" showTagline={true} />
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 relative text-textGray transition">
          <Bell className="w-5 h-5 text-slate-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-white"></span>
        </button>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-xs"
        />
      </div>
    </header>
  );
};
