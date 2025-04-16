import React from 'react';
import Button from '../ui/Button';

const Header = ({ currentView, currentUser, onLogout, toggleDarkMode, isDarkMode, setMobileMenuOpen }) => (
    <header className="bg-white dark:bg-gray-800 dark:border-b dark:border-gray-700 shadow-sm p-4 flex justify-between items-center flex-shrink-0">
      <div className="flex items-center">
        <button 
            onClick={() => setMobileMenuOpen(true)}
            className="mr-2 text-gray-600 dark:text-gray-200 lg:hidden" 
            aria-label="Open menu"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{currentView}</h1>
      </div>
      <div className="flex items-center space-x-4">
         <span className="hidden sm:inline text-gray-600 dark:text-gray-300">Hello, {currentUser || 'Guest'}</span>
         <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {isDarkMode ? ( 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400"> 
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-6.364-.364l1.591-1.591M3 12H.75m.364-6.364l1.591 1.591M12 6.75A5.25 5.25 0 0012 17.25a5.25 5.25 0 000-10.5z" /> 
              </svg> 
            ) : ( 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500"> 
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /> 
              </svg> 
            )}
         </button>
         <Button onClick={onLogout} variant="secondary" className="text-sm">Logout</Button>
      </div>
    </header>
);

export default Header;