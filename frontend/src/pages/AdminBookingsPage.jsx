import { useEffect, useState } from "react";
import { 
    approveBooking,
    rejectBooking,
    cancelBooking,
    getAllBookings,
} from "../api/bookingApi";
import BookingTable from "../components/BookingTable";

export default function AdminBookingsPage(){
    const [booking, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data);
        }catch (error) {
            console.error("Field to load admin bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleApprove = async (bookinId) => {
        const reason = window.prompt("Enter approcal note:");
        if (!reason) return;

        try {
            await approveBooking(bookingId, reason);
            await loadBookings();
        } catch(error) {
            alert(error?.response?.data?.message || "Failed to approve booking");
        }
    };

    const handleReject = async (bookinId) => {
        const reason = window.prompt("Enter rejection note:");
        if (!reason) return;

        try {
            await approveBooking(bookingId, reason);
            await loadBookings();
        } catch(error) {
            alert(error?.response?.data?.message || "Failed to reject booking");
        }
    };

    const handleCancel = async (bookinId) => {
        const reason = window.prompt("Enter cancellation note:");
        if (!reason) return;

        try {
            await approveBooking(bookingId, reason);
            await loadBookings();
        } catch(error) {
            alert(error?.response?.data?.message || "Failed to cancel booking");
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