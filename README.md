# attendance-app

client/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── authApi.js
│   │   └── attendanceApi.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── attendance/
│   │   │   ├── CameraCapture.jsx
│   │   │   ├── ClockInCard.jsx
│   │   │   └── ClockOutCard.jsx
│   │   │
│   │   └── admin/
│   │       ├── AttendanceTable.jsx
│   │       └── ReportFilter.jsx
│   │
│   ├── hooks/
│   │   ├── useCamera.js
│   │   ├── useGeolocation.js
│   │   └── useAuth.js
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── EmployeeLayout.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── employee/
│   │   │   ├── DashboardPage.jsx
│   │   │   └── AttendancePage.jsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       └── ReportPage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── pdf.js
│   │   └── constants.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json