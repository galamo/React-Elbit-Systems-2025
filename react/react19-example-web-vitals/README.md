
# React 19 Example App

A small demo single-page app using React 19, React Router, Recharts and web-vitals.
Features:
- Routes: Home, Products (fast), Users (heavy simulated load), Reports
- Reports page: Pie chart (products per category) and Bar chart (users per job)
- Web Vitals reporting: sends metrics to `/api/webvitals` (change endpoint via window.__WEBVITALS_ENDPOINT)

How to run:
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

Notes:
- Products are served instantly from a local in-memory dataset.
- Users are intentionally delayed (2.2s) with large bio strings to simulate heavy payloads.
- The app calls `reportWebVitals()` at startup so metrics are sent for every page load/navigation.
