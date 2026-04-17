import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { NotificationProvider } from './context/NotificationContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import TechnicianTickets from './pages/TechnicianTickets.jsx';
import TechnicianStatus from './pages/TechnicianStatus.jsx';
import NotificationPage from './pages/NotificationPage.jsx';

import RaiseTicket from './pages/RaiseTicket.jsx';
import FacilitiesAssetsPage from './pages/FacilitiesAssetsPage';
import StudentResourcesPage from './pages/StudentResourcesPage';
import StudentResourceDetails from './pages/StudentResourceDetails';
import StudentCalendar from './pages/student/StudentCalendar';
import ResourceAvailabilityCalendar from './pages/admin/ResourceAvailabilityCalendar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTicketsPage from './pages/admin/AdminTicketsPage';
import AdminUserManagement from './pages/admin/AdminUserManagement.jsx';
import StudentTicketsPage from './pages/student/StudentTicketsPage';
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminBookingsPage from "./pages/AdminBookingsPage";

function App() {
  return (
    <NotificationProvider>
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
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Public Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Admin Navigation */}
        <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminPanel /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="resource-calendar" element={<ResourceAvailabilityCalendar />} />
          <Route path="tickets" element={<AdminTicketsPage />} />
        </Route>

        {/* Technician Navigation */}
        <Route path="/technician/tickets" element={<ProtectedRoute roles={['TECHNICIAN']}><TechnicianTickets /></ProtectedRoute>} />
        <Route path="/technician/status" element={<ProtectedRoute roles={['TECHNICIAN']}><TechnicianStatus /></ProtectedRoute>} />

        {/* Notifications */}
        <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />

        {/* Maintenance & Support */}
        <Route path="/raise-ticket" element={<RaiseTicket />} />

        {/* Facilities & Assets */}
        <Route path="/resources" element={<FacilitiesAssetsPage />} />

        {/* Student Resources */}
        <Route path="/student/resources" element={<StudentResourcesPage />} />
        <Route path="/student/resources/:id" element={<StudentResourceDetails />} />
        <Route path="/student/calendar" element={<StudentCalendar />} />
        <Route path="/student/tickets" element={<StudentTicketsPage />} />

        {/* Bookings */}
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/admin-bookings" element={<AdminBookingsPage />} />
      </Routes>
    </NotificationProvider>
  );
}

export default App;
