import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminBookingsPage from "./pages/AdminBookingsPage";

export default function App() {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-cyber-gradient text-white"
        : "border border-dark-border text-dark-text hover:border-primary hover:text-primary"
    }`;

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-dark-text">
        <header className="border-b border-dark-border bg-dark-card/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-4">
            <h1 className="mr-4 text-xl font-bold text-primary">Booking Module</h1>

            <NavLink to="/" className={linkClass}>
              Create Booking
            </NavLink>

            <NavLink to="/my-bookings" className={linkClass}>
              My Bookings
            </NavLink>

            <NavLink to="/admin-bookings" className={linkClass}>
              Admin Review
            </NavLink>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/admin-bookings" element={<AdminBookingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
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
