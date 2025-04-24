import React from "react";

type Probabilities = {
  happy: number;
  sad: number;
};

export default function Probabilities({ probabilities }: { probabilities: Probabilities }) { 
  const total = probabilities.happy + probabilities.sad;
  const happyPercent = (probabilities.happy / total) * 100;
  const sadPercent = (probabilities.sad / total) * 100;

  return (
  <div className="w-full mx-auto space-y-4 mb-4">
    <h2 className="mb-2">Probabilitas : </h2>

    {/* Happy Bar */}
    <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-green-700">Bahagia</span>
      <span className="text-sm font-medium text-green-700">
      {happyPercent.toFixed(2)}%
      </span>
    </div>
    <div className="w-full bg-green-100 rounded-md h-6">
      <div
      className="bg-green-500 h-6 rounded-md"
      style={{ width: `${happyPercent}%` }}
      ></div>
    </div>
    </div>

    {/* Sad Bar */}
    <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-red-700">Sedih</span>
      <span className="text-sm font-medium text-red-700">
      {sadPercent.toFixed(2)}%
      </span>
    </div>
    <div className="w-full bg-red-100 rounded-md h-6">
      <div
      className="bg-red-500 h-6 rounded-md"
      style={{ width: `${sadPercent}%` }}
      ></div>
    </div>
    </div>
  </div>
  );
};
