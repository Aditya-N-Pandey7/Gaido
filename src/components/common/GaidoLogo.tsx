import React from 'react';
import gaidoLogo from '../../../Gaido_logo.jpeg';

interface Props {
  className?: string;
  showTagline?: boolean;
}

export const GaidoLogo: React.FC<Props> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={gaidoLogo} 
        alt="Gaido - Your Own Travel App" 
        className="h-full w-auto object-contain"
      />
    </div>
  );
};

