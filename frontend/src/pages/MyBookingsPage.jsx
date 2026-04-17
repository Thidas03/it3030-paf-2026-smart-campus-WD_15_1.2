import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack, MdCalendarToday } from "react-icons/md";
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
    <div className="w-full pb-12">
      <div className="mx-auto max-w-7xl pt-8 px-6 md:px-8">
        <div className="mb-8 flex items-center gap-4">
            <div className="bg-gradient-to-br from-accent-500/20 to-primary-500/10 p-3 rounded-xl border border-accent-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
               <MdCalendarToday size={28} className="text-accent-400" />
            </div>
            <div>
               <h1 className="text-2xl font-bold text-white tracking-tight">My Booked Sessions</h1>
               <p className="mt-1 text-dark-muted text-sm">View, track, and manage all your active resource booking requests.</p>
            </div>
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