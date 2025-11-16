
import React from 'react';

interface AdPlaceholderProps {
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-text-muted-light dark:text-text-muted-dark rounded-lg ${className}`}>
      <p className="text-sm font-semibold">Advertisement</p>
    </div>
  );
};

export default AdPlaceholder;
