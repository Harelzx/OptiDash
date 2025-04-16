import React, { createContext, useContext } from 'react';

// Create context
export const AppContext = createContext();

// Export useAppContext hook for easy use in components
export const useAppContext = () => useContext(AppContext);

// Context Provider component
export const AppProvider = ({ children, value }) => {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
