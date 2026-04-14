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