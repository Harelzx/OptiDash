import React from 'react';

const MetricDisplay = ({ label, value, unit, icon }) => (
  <div className="text-center p-1 sm:p-2 flex flex-col justify-center items-center h-full">
    {icon && <div className="text-xl sm:text-2xl lg:text-3xl mb-0 sm:mb-1 text-blue-500">{icon}</div>}
    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">{label}</div>
    <div className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
      {(value !== null && value !== undefined) ? (typeof value === 'number' ? value.toFixed(label === 'Faults' ? 0 : 1) : value) : '-'} <span className="text-xs sm:text-sm">{unit}</span>
    </div>
  </div>
);

export default MetricDisplay;
