import React, { useState, useMemo } from 'react';
import Card from '../ui/Card'; // Ensure correct path

// SummaryStat component (Passes click handler up)
const SummaryStat = ({ label, value, icon, color = 'text-blue-500', tooltipText, onInfoClick }) => (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg h-full flex flex-col justify-between">
        <div>
             {icon && <div className={`text-3xl mb-1 ${color}`}>{icon}</div>}
        </div>
        <div>
            <div className="flex items-center justify-center space-x-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                {tooltipText && (
                    <button
                        type="button"
                        onClick={onInfoClick}
                        className="cursor-pointer text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-0.5"
                        aria-label={`More information about ${label}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
        <div>
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</div>
        </div>
    </div>
);

// Constants
const MAX_SPEED = 150; // Adjust as needed

// Helper function
const calculateOperationalScore = (sensorData) => {
    if (!sensorData) return 0;
    const accuracy = sensorData.accuracy ?? 0;
    const speed = sensorData.speed ?? 0;
    const faults = sensorData.faults ?? 0;
    const accuracyFactor = Math.max(0, Math.min(1, accuracy / 100));
    const speedFactor = Math.max(0, Math.min(1, speed / MAX_SPEED));
    const faultFactor = 1 / (1 + Math.max(0, faults));
    const score = accuracyFactor * speedFactor * faultFactor;
    const scorePercentage = isFinite(score) ? score * 100 : 0;
    return scorePercentage;
};


const DashboardSummary = ({ alerts = [], status = "Running", onViewChange, sensorData }) => {
    const safeAlerts = alerts || [];
    const warningCount = safeAlerts.filter(a => a.type === 'warning').length;
    const dangerCount = safeAlerts.filter(a => a.type === 'danger').length;

    const [showOpScoreInfo, setShowOpScoreInfo] = useState(false);

    const toggleOpScoreInfo = (event) => {
        event.stopPropagation();
        setShowOpScoreInfo(prev => !prev);
    };

    const operationalScore = useMemo(() => calculateOperationalScore(sensorData), [sensorData]);
    const operationalScoreDisplay = operationalScore.toFixed(1) + '%';

    const opScoreExplanation = `ציון תפעולי (0-100%): מדד מותאם אישית המראה את 'בריאות' הציוד ברגע זה, מבוסס על שילוב של דיוק, מהירות וכמות תקלות. גבוה יותר = טוב יותר.\nמבוסס על: דיוק (${sensorData?.accuracy?.toFixed(1)}%), מהירות (${sensorData?.speed?.toFixed(1)}/${MAX_SPEED} מ'/דקה), תקלות (${sensorData?.faults ?? 0}).`;

    const handleAlertClick = () => {
        if (onViewChange) {
            onViewChange('Alerts');
        }
    };

    return (
        // ** הוספנו position: relative לקארד עצמו **
        // זה מאפשר לנו למקם את הפופ-אפ יחסית לקארד כולו
        <Card title="Production Overview" className="relative"> {/* <-- הוספנו relative כאן */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Status */}
                <div> {/* אין צורך ב-relative כאן */}
                    <SummaryStat
                        label="Status"
                        value={status}
                        icon="🏭"
                        color={status === "Running" ? 'text-green-500' : 'text-red-500'}
                    />
                </div>

                 {/* Operational Score */}
                <div> {/* אין צורך ב-relative כאן */}
                    <SummaryStat
                        label="Op. Score"
                        value={operationalScoreDisplay}
                        icon="⚙️"
                        color="text-cyan-500"
                        tooltipText={opScoreExplanation} // מאפשר הצגת האייקון
                        onInfoClick={toggleOpScoreInfo}  // הפעלת הפופ-אפ בלחיצה
                    />
                </div>

                {/* Warnings */}
                <div
                    onClick={handleAlertClick} /* ... */
                    title="Number of active non-critical alerts. Click to view." >
                    <SummaryStat label="Warnings" value={warningCount} icon="⚠️" color="text-yellow-500" />
                </div>

                {/* Dangers */}
                <div
                     onClick={handleAlertClick} /* ... */
                     title="Number of active critical alerts. Click to view." >
                    <SummaryStat label="Dangers" value={dangerCount} icon="🔥" color="text-red-500" />
                </div>
            </div>

            {/* *** הפופ-אפ ממוקם עכשיו יחסית לכל הקארד *** */}
            {showOpScoreInfo && (
                // מיקום בפינה הימנית העליונה של הקארד, עם קצת offset
                <div
                    className="absolute z-20 top-4 right-4 w-72 p-3 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700"
                    // אתה יכול לשנות top-4 right-4 למיקום אחר אם תרצה (למשל top-4 left-4)
                >
                    <p className="leading-relaxed whitespace-pre-line">{opScoreExplanation}</p>
                     <button
                        onClick={toggleOpScoreInfo}
                        className="absolute -top-2 -right-2 text-gray-300 bg-gray-700 dark:bg-gray-800 rounded-full p-0.5 hover:text-white focus:outline-none focus:ring-1 focus:ring-white"
                        aria-label="Close score info"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </Card>
    );
};

export default DashboardSummary;