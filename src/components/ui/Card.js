import React from 'react';

// ** MODIFIED: Removed 'overflow-hidden' from className **
const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 md:p-6 transition-all duration-200 ${className}`}>
    {title && <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-700 dark:text-gray-200">{title}</h3>}
    {/* Ensure children container allows content to flow */}
    <div className="text-gray-900 dark:text-gray-300 w-full">{children}</div>
  </div>
);

export default Card;