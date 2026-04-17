import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { NotificationProvider } from './context/NotificationContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import TechnicianDashboard from './pages/TechnicianDashboard.jsx';
import StudentPanel from './pages/student/StudentPanel.jsx';

import RaiseTicket from './pages/RaiseTicket.jsx';
import FacilitiesAssetsPage from './pages/FacilitiesAssetsPage';
import StudentResourcesPage from './pages/StudentResourcesPage';
import StudentResourceDetails from './pages/StudentResourceDetails';
import AboutUs from './pages/AboutUs';
import StudentCalendar from './pages/student/StudentCalendar';
import ResourceAvailabilityCalendar from './pages/admin/ResourceAvailabilityCalendar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTicketsPage from './pages/admin/AdminTicketsPage';
import AdminUserManagement from './pages/admin/AdminUserManagement.jsx';
import AdminNotifications from './pages/admin/AdminNotifications.jsx';
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

        {/* Public Dashboard and Info */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminPanel /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="resources" element={<FacilitiesAssetsPage />} />
          <Route path="resource-calendar" element={<ResourceAvailabilityCalendar />} />
          <Route path="tickets" element={<AdminTicketsPage />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>

        {/* Technician Navigation */}
        <Route path="/technician/tickets" element={<Navigate to="/technician/dashboard" replace />} />
        <Route path="/technician/status" element={<Navigate to="/technician/dashboard" replace />} />
        <Route path="/technician/dashboard" element={<ProtectedRoute roles={['TECHNICIAN']}><TechnicianDashboard /></ProtectedRoute>} />

        {/* Maintenance & Support */}
        <Route path="/raise-ticket" element={<RaiseTicket />} />

        {/* Facilities & Assets are now correctly mapped inside /admin */}

        {/* Student Portal (Wrapped with Sidebar) */}
        <Route path="/student" element={<ProtectedRoute><StudentPanel /></ProtectedRoute>}>
          <Route path="resources" element={<StudentResourcesPage />} />
          <Route path="resources/:id" element={<StudentResourceDetails />} />
          <Route path="calendar" element={<StudentCalendar />} />
          <Route path="tickets" element={<StudentTicketsPage />} />
          <Route path="bookings" element={<MyBookingsPage />} />
        </Route>

        {/* Global/Public Bookings Endpoint */}
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </NotificationProvider>
  );
}

export default App;
