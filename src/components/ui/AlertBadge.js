import React from 'react';

const AlertBadge = ({ type, children }) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type] || colors.info}`}>
        {children}
      </span>
    );
};

export default AlertBadge;
