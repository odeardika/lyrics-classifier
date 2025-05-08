// components/DecisionBar.tsx
import React from 'react';
import Image from 'next/image';

type DecisionBarProps = {
  decisionValue: number;
  distance: number;
};

const DecisionBar: React.FC<DecisionBarProps> = ({ decisionValue, distance }) => {
    const isPositive = decisionValue >= 0;
    const percentage = Math.min(Math.abs(decisionValue) * 100, 100); // Clamp to 100%
  
    const dataPositionStyle = isPositive
      ? { left: `calc(50% + ${percentage / 2}%)` }
      : { right: `calc(50% - ${percentage / 2}%)` };
  
    return (
      <div className="w-full mx-auto space-y-2">
        <div className="">
          Decision Value: {decisionValue}
        </div>
  
        {/* Colored Bar container */}
        <div className="relative h-8 rounded-md overflow-hidden flex">
          {/* Left (Negative class) */}
          <div className="w-1/2 bg-red-400"></div>
          {/* Right (Positive class) */}
          <div className="w-1/2 bg-green-400"></div>
  
          {/* Support Vector marker */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 bg-blue-800 h-full z-10" title="Support Vector"></div>
  
    
          {/* Data Point marker */}
          <Image
            className="absolute top-1/2 -translate-y-1/2  z-10 h-1/2 md:h-3/4"
            style={dataPositionStyle}
            src="/icons/LyricsDataIcon.svg"
            alt="Data Point"
            width={50}
            height={50}
          />
        </div>

        
  
        {/* Axis labels */}
        <div className="flex justify-between text-xs text-slate-900 px-1">
          <span>Sedih</span>
            <div className="text-xs text-center text-gray-600">
              Jarak data dari support vector: {distance}
            </div>
          <span>Bahagia</span>
        </div>
  
        {/* Distance text */}
        
      </div>
    );
  };

export default DecisionBar;
