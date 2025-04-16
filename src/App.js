import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// Swipeable import removed as per user's last request to only add swipe
// If you still need swipe, uncomment the next line and the swipe logic below
// import { useSwipeable } from 'react-swipeable';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import GamificationView from './views/GamificationView';
import AlertsView from './views/AlertsView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import ProfileView from './views/ProfileView';

// Import initial data
import {
  initialSensorData,
  initialGamificationData,
  initialAlerts
} from './data/initialData'; // Ensure this path is correct

// ** FIXED: Re-added navItems definition **
const navItems = ['Dashboard', 'Optimization Race', 'Alerts', 'Analytics', 'Settings', 'Profile'];

// Define a threshold for showing/hiding header (e.g., header height)
const HIDE_THRESHOLD = 60; // Adjust based on your actual header height in pixels

function App() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sensorData, setSensorData] = useState(initialSensorData);
  const [gamificationData, setGamificationData] = useState(initialGamificationData);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for header visibility
  const [showHeader, setShowHeader] = useState(true);
  // Ref to track last scroll position
  const lastScrollY = useRef(0);

  // Ref for the main scrollable element
  const mainScrollRef = useRef(null);

  // --- Scroll To Top Helper ---
  const scrollToTop = useCallback(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (!showHeader) {
        // console.log("[scrollToTop] Forcing header to show");
        setShowHeader(true);
    }
    lastScrollY.current = 0; // Reset scroll tracking
  }, [showHeader]); // Added showHeader dependency


  // --- Effects ---
  // (Sensor data simulation effect - unchanged)
  useEffect(() => {
    let intervalId = null;
    if (isAuthenticated) {
      intervalId = setInterval(() => {
        setSensorData(prevData => {
          if (!prevData) return initialSensorData;
          const newTemp = parseFloat((prevData.temperature + (Math.random() - 0.5) * 0.5).toFixed(1));
          const newSpeed = parseFloat((prevData.speed + (Math.random() - 0.5) * 5).toFixed(1));
          const newEnergy = parseFloat((prevData.energyConsumption + (Math.random() - 0.2) * 0.1).toFixed(1));
          const newAccuracy = parseFloat(Math.min(100, Math.max(98, prevData.accuracy + (Math.random() - 0.5) * 0.2)).toFixed(1));
          const newFaults = Math.max(0, prevData.faults + (Math.random() < 0.05 ? 1 : (Math.random() < 0.1 ? -1 : 0)));
          return { ...prevData, temperature: newTemp, speed: newSpeed > 0 ? newSpeed : 0, energyConsumption: newEnergy > 0 ? newEnergy : 0, accuracy: newAccuracy, faults: Math.round(newFaults) };
        });
        if (Math.random() < 0.1) {
          setAlerts(prevAlerts => [{ id: Date.now(), type: Math.random() < 0.5 ? 'warning' : 'danger', message: `Fault detected in sensor ${Math.floor(Math.random() * 5) + 1}`, timestamp: new Date() }, ...prevAlerts].slice(0, 10));
        }
      }, 5000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isAuthenticated]);

  // (Dark mode effect - unchanged)
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  // (Feedback message effect - unchanged)
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => { setFeedbackMessage(''); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  // (Scroll to top on auth change effect - unchanged, uses updated scrollToTop)
   useEffect(() => {
    if (isAuthenticated) {
       const timer = setTimeout(() => {
          scrollToTop();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, scrollToTop]);

  // Effect for Scroll Listener to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = mainScrollRef.current ? mainScrollRef.current.scrollTop : 0;
      const previousScrollY = lastScrollY.current;
      const buffer = 5; // Prevents flicker on minor scroll adjustments

      if (currentScrollY > previousScrollY + buffer && currentScrollY > HIDE_THRESHOLD) {
        // Scrolling Down past threshold
        if (showHeader) setShowHeader(false); // Only set if needed
      } else if (currentScrollY < previousScrollY - buffer || currentScrollY <= HIDE_THRESHOLD) {
         // Scrolling Up OR near/at the top
        if (!showHeader) setShowHeader(true); // Only set if needed
      }
      // Update last scroll position for the next event
      lastScrollY.current = currentScrollY;
    };

    const scrollElement = mainScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check in case content is shorter than threshold
    }

    // Cleanup listener on component unmount
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  // Dependency array includes showHeader to ensure the comparison logic inside uses the latest state
  }, [showHeader]);


  // --- Authentication Functions ---
  const handleLogin = useCallback((username, password) => {
    setLoginError('');
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setCurrentUser({ name: username });
      setCurrentView('Dashboard');
      setGamificationData(initialGamificationData);
      setAlerts(initialAlerts);
      setSensorData(initialSensorData);
      // Scroll handled by useEffect watching isAuthenticated
    } else {
      setLoginError('Invalid username or password.');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginError('');
    setCurrentView('Dashboard');
    setMobileMenuOpen(false);
    scrollToTop(); // Ensures scroll reset and header shown
  }, [scrollToTop]);

  // --- Dark Mode Toggle ---
   const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  // --- Other Helper Functions ---
   const handleClearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const handleDeleteSingleAlert = useCallback((alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  }, []);

   const handleCompleteTask = useCallback((taskId) => {
    let taskCompleted = null;
    setGamificationData(prevData => {
        if (!prevData?.tasks) return prevData;
        const updatedTasks = prevData.tasks.map(task => {
            if (task.id === taskId && !task.isCompleted) {
                taskCompleted = { ...task, isCompleted: true }; return taskCompleted;
            } return task;
        });
        if (taskCompleted) {
            const newTotalPoints = (prevData.totalPoints || 0) + taskCompleted.points;
            const currentLeaderboard = prevData.leaderboard || [];
            const updatedLeaderboard = currentLeaderboard.map(user => user.name === "You" ? { ...user, points: newTotalPoints } : user).sort((a, b) => b.points - a.points);
            if (!updatedLeaderboard.some(user => user.name === "You")) {
               updatedLeaderboard.push({ name: "You", points: newTotalPoints });
               updatedLeaderboard.sort((a, b) => b.points - a.points);
            }
            const newRank = updatedLeaderboard.findIndex(user => user.name === "You") + 1;
            setTimeout(() => setFeedbackMessage(`Task completed! +${taskCompleted.points} pts!`), 0);
            return { ...prevData, tasks: updatedTasks, totalPoints: newTotalPoints, leaderboard: updatedLeaderboard, rank: newRank };
        } return prevData;
    });
  }, []);


  // --- Navigation Logic ---
  const navigateToView = useCallback((view, shouldScrollToTop = true) => {
    // ** FIXED: Check against navItems defined at the top **
    if (navItems.includes(view)) {
        setCurrentView(view);
        if (isMobileMenuOpen) {
            setMobileMenuOpen(false);
        }
        if (shouldScrollToTop) {
            scrollToTop();
        } else {
           // Ensure header is shown after non-scrolling navigation (like potential swipe)
           if (!showHeader) setShowHeader(true);
           lastScrollY.current = mainScrollRef.current ? mainScrollRef.current.scrollTop : 0;
        }
    } else {
        console.warn(`Attempted to navigate to unknown view: ${view}`);
    }
  // Removed showHeader dep as it's handled internally
  }, [isMobileMenuOpen, scrollToTop]);


  // --- Swipe Logic (Commented out, add back if needed) ---
  /*
  const handleSwipe = useCallback((direction) => { ... }, [currentView, navigateToView]);
  const swipeHandlers = useSwipeable({ ... });
  */

  // --- Context value ---
  const contextValue = useMemo(() => ({
     isDarkMode, toggleDarkMode, currentUser,
  }), [isDarkMode, currentUser, toggleDarkMode]);


  // --- Conditional Rendering ---
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} loginError={loginError} />;
  }

  // --- Render Main Application UI ---
  return (
    <AppProvider value={contextValue}>
      <div className={`flex h-screen font-sans ${isDarkMode ? 'dark' : ''}`}>
        <Sidebar
          selectedView={currentView}
          onViewChange={navigateToView} // Uses default scroll-to-top behavior
          // ** FIXED TYPO HERE **
          isMobileMenuOpen={isMobileMenuOpen}
        />
        {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            ></div>
         )}

        {/* Main Content Area Wrapper */}
        {/* Add swipeHandlers here if swipe is re-enabled: {...swipeHandlers} */}
        <div className="flex flex-col flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 relative">

            {/* Header Area (Auto-Hiding) */}
            <div className={`w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 flex-shrink-0 relative z-10
                           bg-white dark:bg-gray-800 shadow-sm dark:border-b dark:border-gray-700
                           transition-transform duration-300 ease-in-out
                           ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
               <Header
                 currentView={currentView}
                 currentUser={currentUser?.name}
                 onLogout={handleLogout}
                 toggleDarkMode={toggleDarkMode}
                 isDarkMode={isDarkMode}
                 setMobileMenuOpen={setMobileMenuOpen}
                 // Remove bg/shadow/border from Header's root element if they exist there
               />
            </div>

            {/* Scrollable Content Area */}
            <main ref={mainScrollRef} className="flex-1 overflow-y-auto">
                 <div className="p-4 md:p-6 w-full max-w-screen-2xl mx-auto">
                    {/* Views Rendered Here */}
                    {currentView === 'Dashboard' && <DashboardView sensorData={sensorData} alerts={alerts} gamificationData={gamificationData} onViewChange={navigateToView} />}
                    {currentView === 'Optimization Race' && <GamificationView gamificationData={gamificationData} onCompleteTask={handleCompleteTask} feedbackMessage={feedbackMessage} />}
                    {currentView === 'Alerts' && <AlertsView alerts={alerts} onClearAlerts={handleClearAlerts} onDeleteAlert={handleDeleteSingleAlert} />}
                    {currentView === 'Analytics' && <AnalyticsView />}
                    {currentView === 'Settings' && <SettingsView toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
                    {currentView === 'Profile' && <ProfileView currentUser={currentUser} gamificationData={gamificationData} />}
                </div>
            </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;