import React from 'react';

interface Props {
  borderColor?: string;
  children: React.ReactNode;
  className?: string;
}

export const LeftBorderCard: React.FC<Props> = ({ borderColor = 'border-accent', children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${borderColor} ${className}`}>
      {children}
    </div>
  );
};
