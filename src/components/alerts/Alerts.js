import React from 'react';
import Button from '../ui/Button';
import AlertBadge from '../ui/AlertBadge'; // Assuming this component exists

const Alerts = ({ alerts = [], onClearAlerts, onDeleteAlert }) => ( // Added default for alerts
  <>
    {alerts.length === 0 ? (
      <p className="text-sm text-gray-500 dark:text-gray-400">No new alerts.</p>
    ) : (
      // Added border for scroll container
      <ul className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto -mr-2 pr-2 border-t border-b border-gray-200 dark:border-gray-700 py-2">
        {alerts.map(alert => (
          <li key={alert.id} className="flex items-center justify-between text-sm p-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md group"> {/* Moved group here if needed for other hover effects */}
            <div className="flex-grow mr-2 overflow-hidden"> {/* Added overflow-hidden */}
               <AlertBadge type={alert.type}>{alert.type}</AlertBadge>
               {/* Added truncate to message */}
               <span className="ml-2 text-gray-700 dark:text-gray-300 truncate block">{alert.message}</span>
               <span className="block text-xs text-gray-400 dark:text-gray-500 ml-2 mt-1">
                   {/* Added check for valid date object */}
                   {alert.timestamp instanceof Date && !isNaN(alert.timestamp)
                      ? alert.timestamp.toLocaleString()
                      : (typeof alert.timestamp === 'string' ? alert.timestamp : 'Invalid Date')}
               </span>
            </div>
            {/* **MODIFIED Delete Button** */}
            <button
              onClick={() => onDeleteAlert(alert.id)}
              // REMOVED: opacity-0 group-hover:opacity-100
              // INCREASED padding from p-1 to p-2
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex-shrink-0"
              title="Delete alert"
              aria-label="Delete alert" // Added aria-label
            >
                {/* Consider slightly larger icon if needed: className="w-5 h-5" */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </li>
        ))}
      </ul>
    )}
    {/* Added check for alerts length before showing button */}
    {alerts && alerts.length > 0 && (
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"> {/* Added border */}
        <Button onClick={onClearAlerts} variant="secondary" className="w-full sm:w-auto text-sm"> {/* Adjusted width */}
          Clear All Alerts
        </Button>
      </div>
    )}
  </>
);

export default Alerts;