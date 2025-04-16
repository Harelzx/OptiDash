import React from 'react';

const Sidebar = ({ selectedView, onViewChange, isMobileMenuOpen }) => {
    const navItems = ['Dashboard', 'Optimization Race', 'Alerts', 'Analytics', 'Settings', 'Profile'];
    
    return (
        <nav className={`w-64 bg-gray-800 text-white h-screen p-4 flex flex-col flex-shrink-0 fixed lg:static z-30 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <h2 className="text-2xl font-bold mb-6">OptiDash</h2>
            <ul className="space-y-2">
                {navItems.map(item => (
                    <li key={item}>
                        <button 
                            onClick={() => onViewChange(item)} 
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${selectedView === item ? 'bg-blue-600' : ''}`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-auto text-xs text-gray-400">Version 1.0.0</div>
        </nav>
    );
};

export default Sidebar;