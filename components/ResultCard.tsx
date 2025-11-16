import React from 'react';

const ResultCard = ({ icon, label, value, unit }) => {
  return (
    <div className="flex items-center p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-sm w-full">
      <div className="p-3 rounded-full bg-primary/10 text-primary dark:text-primary-dark mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{label}</p>
        <p className="text-xl font-bold text-text-light dark:text-text-dark">
          {value} <span className="text-base font-normal">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default ResultCard;