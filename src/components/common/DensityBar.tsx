import React from 'react';

interface Props {
  level: number;
}

export const DensityBar: React.FC<Props> = ({ level }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden my-2">
      <div
        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary via-accent to-warning"
        style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
      />
    </div>
  );
};
