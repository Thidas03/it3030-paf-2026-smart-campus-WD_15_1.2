import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RaiseTicket from './pages/RaiseTicket.jsx';
import FacilitiesAssetsPage from './pages/FacilitiesAssetsPage';
import StudentResourcesPage from './pages/StudentResourcesPage';
import StudentResourceDetails from './pages/StudentResourceDetails';
import StudentCalendar from './pages/student/StudentCalendar';
import ResourceAvailabilityCalendar from './pages/admin/ResourceAvailabilityCalendar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTicketsPage from './pages/admin/AdminTicketsPage';
import StudentTicketsPage from './pages/student/StudentTicketsPage';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass text-white font-bold',
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Maintenance & Support - Mageepan's part */}
        <Route path="/raise-ticket" element={<RaiseTicket />} />

        {/* Facilities & Assets - Teammate's part */}
        <Route path="/resources" element={<FacilitiesAssetsPage />} />
        <Route path="/admin/resource-calendar" element={<ResourceAvailabilityCalendar />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tickets" element={<AdminTicketsPage />} />

        {/* Student - Teammate's part */}
        <Route path="/student/resources" element={<StudentResourcesPage />} />
        <Route path="/student/resources/:id" element={<StudentResourceDetails />} />
        <Route path="/student/calendar" element={<StudentCalendar />} />
        <Route path="/student/tickets" element={<StudentTicketsPage />} />
      </Routes>
    </>
  );
}

export default App;
