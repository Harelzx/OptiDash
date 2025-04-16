import React from 'react';
import Card from '../components/ui/Card';

const SettingsView = ({ toggleDarkMode, isDarkMode }) => (
    <Card title="System Settings">
        <p className="text-gray-500 dark:text-gray-400">Customization options and account settings will be here...</p>
        <div className="space-y-4 mt-4">
            <div>
                <label htmlFor="email-notifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Receive email notifications
                </label>
                <input 
                    id="email-notifications" 
                    type="checkbox" 
                    className="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600" 
                />
            </div>
            
            <div className="flex items-center justify-between">
                <label htmlFor="darkModeToggle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode
                </label>
                <button 
                    id="darkModeToggle" 
                    onClick={toggleDarkMode} 
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
    </Card>
);

export default SettingsView;