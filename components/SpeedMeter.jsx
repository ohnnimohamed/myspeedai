import React from 'react';

const SpeedMeter = ({ speed, status }) => {
  const maxSpeed = 200; // Max speed on the gauge in Mbps
  const speedPercentage = Math.min(speed / maxSpeed, 1);
  const rotation = speedPercentage * 180 - 90; // -90 to 90 degrees

  // New radius and circumference for the gauge to prevent clipping at the top
  const radius = 80;
  const circumference = Math.PI * radius; // Circumference of a semi-circle

  return (
    <div className="relative w-64 h-32 sm:w-80 sm:h-40 md:w-96 md:h-48 mx-auto mb-4">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Gauge Background Arc */}
        <path
          d="M 20 90 A 80 80 0 0 1 180 90" // Scaled down to fit the stroke within the viewbox
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Gauge Progress Arc */}
        <path
          d="M 20 90 A 80 80 0 0 1 180 90" // Scaled down to match background
          stroke="url(#speedGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - speedPercentage),
            transition: 'stroke-dashoffset 0.3s ease-out, stroke 0.3s ease-out',
          }}
        />
        {/* Gradient Definition for speed colors */}
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />   {/* Red for slow speeds */}
            <stop offset="50%" stopColor="#f59e0b" />  {/* Amber for medium speeds */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue for fast speeds */}
          </linearGradient>
        </defs>
        
        {/* Needle */}
        <line
          x1="100"
          y1="90"
          x2="100"
          y2="20"
          stroke="currentColor"
          className="text-gray-600 dark:text-gray-300"
          strokeWidth="2"
          transform={`rotate(${rotation}, 100, 90)`}
          style={{ transition: 'transform 0.3s ease-out' }}
        />
        {/* Needle Hub */}
        <circle cx="100" cy="90" r="5" fill="currentColor" className="text-gray-800 dark:text-gray-100" />
      </svg>
      {/* Adjusted text position for better spacing and to prevent overlap */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <div className="text-4xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-1">
          {speed.toFixed(2)}
        </div>
        <div className="text-sm sm:text-base text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
          {status}
        </div>
      </div>
    </div>
  );
};

export default SpeedMeter;