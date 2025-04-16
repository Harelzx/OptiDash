# OptiDash - Industrial Monitoring Dashboard

OptiDash is a modern, responsive React-based dashboard designed for visualizing simulated industrial sensor data. It provides real-time monitoring insights, incorporates gamification elements to encourage optimization, and features a clean, user-friendly interface with dark mode support.

![Screenshot of OptiDash Dashboard](placeholder_link_to_your_screenshot.jpg) 
*(Replace placeholder_link_to_your_screenshot.jpg with a link to an actual screenshot of your dashboard, like one you uploaded, once you host the image)*

## ✨ Features

* **User Authentication:** Simple login screen (`admin`/`password`) and logout functionality.
* **Real-time Data Simulation:** Simulates dynamic updates for key industrial metrics:
    * Temperature
    * Speed
    * Energy Consumption
    * Accuracy
    * Faults
* **Responsive Dashboard (`DashboardView`)**:
    * **Production Overview:** Displays current operational status, alert counts, and a custom "Operational Score" (calculated from Accuracy, Speed vs. Max, and Faults) with an informational pop-up.
    * **Real-time Sensor Monitoring:** Grid display of current sensor values.
    * **Daily Tasks Summary:** Quick view of pending/completed gamification tasks.
    * **Trend Chart:** Visualizes the trend of a selected metric over the last hour using Recharts.
* **Gamification System (`GamificationView`)**:
    * **Optimization Race:** Tracks user points and rank.
    * **Task List:** Displays daily tasks with point values.
    * **Task Completion:** Allows users to mark tasks as complete, updating points and rank.
    * **Leaderboard:** Shows user rankings based on points.
    * **Rank & Title System:** Assigns user titles based on accumulated points.
    * Feedback messages on task completion.
* **Alerts Management (`AlertsView`)**:
    * Displays a list of recent warning/danger alerts with timestamps.
    * Allows clearing all alerts.
    * Allows deleting individual alerts (with improved mobile tap targets).
* **Analytics View (`AnalyticsView`)**:
    * Placeholder for advanced analytics.
    * Includes example Bar and Line charts (Faults by Type, Weekly OEE Trend) using Recharts.
* **Settings View (`SettingsView`)**:
    * **Dark Mode Toggle:** Switch between light and dark themes.
    * Placeholders for other settings (e.g., notifications).
* **User Profile (`ProfileView`)**:
    * Displays user name, role (static), total points, rank, and title.
    * Shows progress towards the next rank/title.
    * Lists completed tasks.
* **Modern UI & UX:**
    * Built with **React** and styled with **Tailwind CSS**.
    * **Responsive Design:** Adapts layout for various screen sizes (desktop, tablet, mobile).
    * **Mobile Optimizations:** Collapsible sidebar, overlay, improved tap targets, auto-hiding header.
    * **Dark Mode:** Fully supported theme switching.
    * **Component-Based:** Structured using reusable UI (`Card`, `Button`, `SummaryStat`) and feature components.
    * **Context API:** Used for global state management (`AppContext`).
    * **(Optional) Swipe Navigation:** Includes logic (potentially commented out) to allow swiping between views on touch devices using `react-swipeable`.
    * **Accessible Popovers:** Uses Headless UI for reliable and accessible information popovers (e.g., for Op. Score).

## 🛠️ Technologies Used

* **Frontend:** React.js (v18+)
* **Styling:** Tailwind CSS
* **Charting:** Recharts
* **UI Components:** Headless UI (`@headlessui/react`) (for Popover)
* **(Potentially):** `react-swipeable` (for Swipe Gestures)
* **Language:** JavaScript (ES6+)
* **Package Manager:** npm or yarn

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v16 or later recommended)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/opti-dash.git](https://github.com/YOUR_USERNAME/opti-dash.git) 
    # Replace YOUR_USERNAME/opti-dash with your actual repo URL
    cd opti-dash
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    *Ensure `@headlessui/react` and `react-swipeable` (if using) are installed:*
    ```bash
    # npm install @headlessui/react react-swipeable 
    # or
    # yarn add @headlessui/react react-swipeable
    ```

3.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will usually open the application in your default browser at `http://localhost:3000`.

## 💻 Usage

1.  Open the application in your browser.
2.  Log in using the default credentials:
    * **Username:** `admin`
    * **Password:** `password`
3.  Navigate through the different sections using the sidebar menu (or swipe gestures if enabled).
4.  Observe the simulated real-time data updates on the Dashboard.
5.  Interact with the "Optimization Race" view by completing tasks.
6.  View and manage alerts in the "Alerts" section.
7.  Explore the example charts in the "Analytics" view.
8.  Toggle Dark Mode in the "Settings" view. Click the info icon next to "Op. Score" for details.
9.  View your progress in the "Profile" section.
10. Test the responsive design by resizing your browser window or using browser developer tools (Device Mode).
11. Scroll down the content area to see the header auto-hide, and scroll up to see it reappear.

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

## 🔮 Future Improvements

* Replace simulated data with real backend API integration.
* **Database integration (e.g., PostgreSQL, MongoDB) for persistent storage** of user data, gamification progress, alerts, settings, and historical sensor readings.
* **Cloud deployment (e.g., AWS, Azure, Google Cloud, Vercel)** for accessibility and scalability.
* More sophisticated analytics, customizable charts, and reporting features.
* User roles and permissions (e.g., admin vs. operator).
* Full implementation of settings/profile editing and customization.
* Implementation of actual OEE calculation based on required backend data inputs (planned time, stop logs, good/bad counts, ideal cycle time).
* Notifications system (in-app or email/SMS).
* Unit and integration tests.
