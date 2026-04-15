import { useEffect, useState } from "react";
import { cancelBooking, getMyBookings } from "../api/bookingApi";
import BookingTable from "../components/BookingTable";

export default function MyBookingsPage(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBookings = async () => {
        try {
            const data = await getMyBookings();
            setBookings(data);
        } catch (error) {
            console.error("Failed to load my Bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleCancel = async (bookingId) =>{
        const reason = window.prompt("enter cancellation reason:");
        if(!reason) return;

        try {
            await cancelBooking(bookingId, reason);
            await loadBookings();
        } catch(error) {
            alert(error?.response?.data?.message || "Failed to cancel booking");
        }
    };

     return (
    <div className="min-h-screen bg-dark-bg px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">My Bookings</h1>
          <p className="mt-2 text-dark-muted">
            View and manage your submitted booking requests.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-6 text-dark-muted backdrop-blur-xl">
            Loading bookings...
          </div>
        ) : (
          <BookingTable bookings={bookings} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}