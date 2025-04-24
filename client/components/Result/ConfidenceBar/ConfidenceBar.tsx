// components/ConfidenceBar.tsx
import React from 'react';

type ConfidenceBarProps = {
  score: number; // Should be between 0 and 1
};

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ score }) => {
  const percentage = Math.min(Math.max(score * 100, 0), 100).toFixed(2);

  return (
    <div className="w-full mx-auto mt-4">
      <div className="mb-2">
        Confidence Score: <span className='text-blue-500'>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-md h-8 shadow-inner">
        <div
          className="bg-blue-500 h-8 rounded-md transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceBar;