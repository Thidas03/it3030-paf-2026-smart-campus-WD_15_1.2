import { useEffect, useState } from "react";
import {
  approveBooking,
  rejectBooking,
  cancelBooking,
  getAllBookings,
} from "../api/bookingApi";
import BookingTable from "../components/BookingTable";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getErrorMessage = (err, fallback) => {
    console.error("Full error object:", err);
    console.error("Response data:", err?.response?.data);

    const data = err?.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.errors && Object.keys(data.errors).length > 0) {
      return JSON.stringify(data.errors, null, 2);
    }

    return err?.message || fallback;
  };

  const loadBookings = async () => {
    try {
      setError("");
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load admin bookings."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleApprove = async (bookingId) => {
    const reason = window.prompt("Enter approval reason:");
    if (!reason) return;

    try {
      await approveBooking(bookingId, reason);
      await loadBookings();
    } catch (err) {
      alert(getErrorMessage(err, "Failed to approve booking"));
    }
  };

  const handleReject = async (bookingId) => {
    const reason = window.prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await rejectBooking(bookingId, reason);
      await loadBookings();
    } catch (err) {
      alert(getErrorMessage(err, "Failed to reject booking"));
    }
  };

  const handleCancel = async (bookingId) => {
    const reason = window.prompt("Enter cancellation reason:");
    if (!reason) return;

    try {
      await cancelBooking(bookingId, reason, true);
      await loadBookings();
    } catch (err) {
      alert(getErrorMessage(err, "Failed to cancel booking"));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Admin Booking Review</h1>
          <p className="mt-2 text-dark-muted">
            Review, approve, reject, or cancel booking requests.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-6 text-dark-muted backdrop-blur-xl">
            Loading admin bookings...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-400 backdrop-blur-xl">
            {error}
          </div>
        ) : (
          <BookingTable
            bookings={bookings}
            isAdmin={true}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}