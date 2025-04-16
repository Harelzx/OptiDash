// --- Initial Dummy Data ---
export const initialSensorData = { 
  temperature: 75.5, 
  speed: 120.0, 
  energyConsumption: 5.2, 
  accuracy: 99.8, 
  faults: 0 
};

// --- Initial Gamification Data Setup ---
// Define leaderboard first
export const initialLeaderboard = [
    { name: "Michael", points: 310 },
    { name: "Dganit", points: 285 },
    { name: "Victor", points: 250 },
    { name: "Shani", points: 215 },
    { name: "Harel", points: 170 },
    { name: "You", points: 135 }, // Your starting points
    { name: "Noa", points: 95 },
].sort((a, b) => b.points - a.points); // Ensure sorted initially

// Calculate initial rank based on the defined leaderboard
const initialRank = initialLeaderboard.findIndex(user => user.name === "You") + 1;
const initialTotalPoints = initialLeaderboard.find(user => user.name === "You")?.points || 0; // Get points from leaderboard

// Now define the full initial gamification data object
export const initialGamificationData = {
  tasks: [
    { id: 1, description: "Reduce energy consumption by 2%", points: 50, isCompleted: false, icon: '💡' },
    { id: 2, description: "Improve production speed by 5%", points: 70, isCompleted: false, icon: '⚡' },
    { id: 3, description: "Reduce average temperature in machine X", points: 40, isCompleted: false, icon: '🌡️' },
    { id: 4, description: "Zero faults during the shift", points: 100, isCompleted: true, icon: '⚠️' },
    { id: 5, description: "Calibrate sensor Z within tolerance", points: 60, isCompleted: false, icon: '🔧' },
  ],
  totalPoints: initialTotalPoints, // Use points from leaderboard
  rank: initialRank, // Use calculated initial rank
  leaderboard: initialLeaderboard, // Use the defined leaderboard
};

// Initial Alerts Data
export const initialAlerts = [
  { id: 1, type: 'warning', message: 'Abnormal temperature in Station 2', timestamp: new Date(Date.now() - 60000 * 5) },
  { id: 2, type: 'danger', message: 'Critical pressure drop in Unit 5', timestamp: new Date(Date.now() - 60000 * 2) },
  { id: 3, type: 'info', message: 'Software update completed successfully', timestamp: new Date() },
];

// --- Sample Data for Charts ---
export const weeklyOeeData = [
  { name: 'Mon', oee: 82.5, target: 85.0 }, 
  { name: 'Tue', oee: 85.1, target: 85.0 }, 
  { name: 'Wed', oee: 84.8, target: 85.0 }, 
  { name: 'Thu', oee: 86.3, target: 85.5 }, 
  { name: 'Fri', oee: 83.9, target: 85.5 }, 
  { name: 'Sat', oee: 87.0, target: 86.0 }, 
  { name: 'Sun', oee: 86.5, target: 86.0 },
];

export const faultTypeData = [
  { type: 'Mechanical', count: 5, fill: '#8884d8' }, 
  { type: 'Electrical', count: 8, fill: '#82ca9d' }, 
  { type: 'Sensor', count: 3, fill: '#ffc658' }, 
  { type: 'Software', count: 2, fill: '#ff7300' }, 
  { type: 'Other', count: 1, fill: '#d0ed57' },
];

// --- Mapping for Chart Configuration ---
export const metricConfig = {
    Temperature: { dataKey: 'temperature', unit: '°C', color: '#8884d8', domainPadding: 1 },
    Speed: { dataKey: 'speed', unit: 'm/min', color: '#82ca9d', domainPadding: 10 },
    Energy: { dataKey: 'energyConsumption', unit: 'kWh', color: '#ffc658', domainPadding: 0.5 },
    Accuracy: { dataKey: 'accuracy', unit: '%', color: '#ff7300', domain: [95, 100], domainPadding: 0.1 },
    Faults: { dataKey: 'faults', unit: '', color: '#d0ed57', domainPadding: 1, allowDecimals: false },
};

// --- Helper Function for Rank Info ---
export const rankTiers = [
    { title: "Button Polisher", minPoints: 0, nextPoints: 101 },
    { title: "Cable Untangler", minPoints: 101, nextPoints: 151 },
    { title: "Data Dynamo", minPoints: 151, nextPoints: 201 },
    { title: "Efficiency Expert", minPoints: 201, nextPoints: 301 },
    { title: "Optimization Overlord", minPoints: 301, nextPoints: Infinity }, // Highest rank
];
