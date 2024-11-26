import React, { useState } from 'react';

const SongClassifier = () => {
  const [selectedOption, setSelectedOption] = useState('cari lagu');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold mb-6">Song Classifier</h1>
        <div className="flex justify-center gap-4 text-gray-300 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="option"
              value="cari lagu"
              checked={selectedOption === 'cari lagu'}
              onChange={() => setSelectedOption('cari lagu')}
              className="text-blue-500 focus:ring-0"
            />
            <span>Cari Lagu</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="option"
              value="masukan lirik"
              checked={selectedOption === 'masukan lirik'}
              onChange={() => setSelectedOption('masukan lirik')}
              className="text-blue-500 focus:ring-0"
            />
            <span>Masukan Lirik</span>
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Masukan nama lagu atau penyanyi"
            className="w-80 p-3 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button className="absolute right-3 top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongClassifier;
