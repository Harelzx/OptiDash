# OptiDash - Industrial Monitoring Dashboard

OptiDash is a modern, responsive React-based dashboard designed for visualizing simulated industrial sensor data. It provides real-time monitoring insights, incorporates gamification elements to encourage optimization, and features a clean, user-friendly interface with dark mode support.

![Screenshot of OptiDash Dashboard](placeholder_link_to_your_screenshot.jpg)
*Replace `placeholder_link_to_your_screenshot.jpg` with a real screenshot link after hosting.*

---

## ✨ Features

- **User Authentication:** Simple login screen (`admin` / `password`) and logout.
- **Real-time Data Simulation:** Simulates updates for:
  - Temperature
  - Speed
  - Energy Consumption
  - Accuracy
  - Faults
- **Responsive Dashboard (`DashboardView`)**
  - **Production Overview:** Operational status, alert counts, and "Operational Score" (based on Accuracy, Speed vs. Max, Faults) with an info popover.
  - **Sensor Monitoring Grid:** Real-time metric display.
  - **Daily Tasks Summary:** Completion status of gamified tasks.
  - **Trend Chart:** Last-hour metric trend via Recharts.
- **Gamification (`GamificationView`)**
  - Optimization Race (points, rank)
  - Daily Tasks with point values
  - Task completion + feedback
  - Leaderboard
  - Rank & Title System
- **Alerts (`AlertsView`)**
  - List of alerts with timestamps
  - Delete single or all alerts (mobile-optimized)
- **Analytics (`AnalyticsView`)**
  - Example charts: Faults by Type, Weekly OEE Trend (Recharts)
- **Settings (`SettingsView`)**
  - Dark mode toggle
  - Placeholders for more settings
- **User Profile (`ProfileView`)**
  - Name, static role, total points, rank/title
  - Progress bar to next rank
  - Completed tasks list
- **Modern UI/UX**
  - React + Tailwind CSS
  - Responsive design (desktop, tablet, mobile)
  - Collapsible sidebar, swipe nav (optional), auto-hiding header
  - Fully supported dark mode
  - Component-based structure (Cards, Buttons, Popovers)
  - Context API for global state
  - Accessible popovers via Headless UI

---

## 🛠️ Tech Stack

- **Frontend:** React.js (v18+)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **UI Components:** Headless UI (`@headlessui/react`)
- **Optional:** `react-swipeable` for touch gestures
- **Language:** JavaScript (ES6+)
- **Package Manager:** npm / yarn

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/opti-dash.git
cd opti-dash

# Install dependencies
npm install
# or
yarn install

# (Optional) If using extra libraries
npm install @headlessui/react react-swipeable
# or
yarn add @headlessui/react react-swipeable

# Run the app
npm start
# or
yarn start
```

Visit `http://localhost:3000` to view the dashboard.

---

## 💻 Usage

1. Log in with:
   - **Username:** `admin`
   - **Password:** `password`
2. Navigate via sidebar or swipe (if enabled).
3. Observe real-time updates on the dashboard.
4. Complete gamification tasks to earn points.
5. View/manage alerts.
6. Explore analytics.
7. Toggle light/dark mode.
8. Track your rank and task progress via the profile view.
9. Resize your browser to test responsive design.

---

## 📁 Project Structure (Simplified)

```text
opti-dash/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── gamification/
│   │   ├── alerts/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/
│   │   └── AppContext.js
│   ├── data/
│   │   └── initialData.js
│   ├── views/
│   ├── utils/
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🔮 Future Improvements

- Backend API integration for real sensor data.
- Database support (e.g., PostgreSQL, MongoDB) for persistent user/task/alert history.
- Cloud deployment (e.g., AWS, Vercel, GCP).
- Full analytics + customizable dashboards.
- Admin vs. operator permissions.
- Full profile editing + settings.
- Real OEE metric based on production data.
- Notification system (email/in-app).
- Unit & integration tests.

---

## 📸 Screenshot

> ![Dashboard Screenshot](placeholder_link_to_your_screenshot.jpg)

---

**Made with ❤️ by [Your Name / Team Name]**
