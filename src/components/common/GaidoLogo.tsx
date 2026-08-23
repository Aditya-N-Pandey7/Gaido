import React from 'react';

interface Props {
  className?: string;
  showTagline?: boolean;
}

export const GaidoLogo: React.FC<Props> = ({ className = "h-8", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="h-full aspect-square flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 L85 30 L65 65 L50 50 Z" fill="#0284C7" />
        <path d="M85 30 L70 85 L35 65 L50 50 Z" fill="#0369A1" />
        <path d="M70 85 L15 70 L35 35 L50 50 Z" fill="#0284C7" />
        <path d="M15 70 L30 15 L65 30 L50 50 Z" fill="#0C4A6E" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">
          Gaido
        </span>
        {showTagline && (
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-[1px] w-2 bg-slate-400"></div>
            <span className="text-[8px] font-semibold text-slate-600 whitespace-nowrap uppercase tracking-tighter">
              Your Own Travel App
            </span>
            <div className="h-[1px] w-2 bg-slate-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};
