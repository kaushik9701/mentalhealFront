import React from 'react';

const ProgressCircle = ({ progress }) => {
  return (
    <div className="relative">
      <div className="w-14 h-14">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#4A1E6B"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#EC4899"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
      </div>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-pink-300">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressCircle;