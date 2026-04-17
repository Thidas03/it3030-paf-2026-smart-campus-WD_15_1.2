import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack, MdCalendarToday, MdCheckCircle } from "react-icons/md";
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

    const approvedBookings = bookings.filter(b => b.status === "APPROVED");
    const latestApproved = approvedBookings.length > 0 ? approvedBookings[0] : null;

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

        {/* Dynamic Success Banner for Latest Approved Booking */}
        {latestApproved && (
           <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 flex items-center gap-5 sm:gap-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <MdCheckCircle size={100} className="text-emerald-500" />
               </div>
               <div className="bg-emerald-500/20 p-3 sm:p-4 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <MdCheckCircle className="text-3xl sm:text-4xl text-emerald-400" />
               </div>
               <div className="relative z-10 w-full pr-8">
                   <h2 className="text-lg sm:text-xl font-bold text-emerald-400 font-sans tracking-tight mb-1 flex items-center gap-2">
                       Booking Approved 
                       <span className="inline-blockpx-2 py-0.5 rounded text-[10px] bg-emerald-500/20 border border-emerald-500/30 uppercase tracking-widest text-emerald-300">
                         Success
                       </span>
                   </h2>
                   <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-medium">
                       Your reservation for <strong className="text-emerald-100">{latestApproved.resourceName}</strong> on <strong className="text-emerald-100">{latestApproved.bookingDate}</strong> starting at <strong className="text-emerald-100">{latestApproved.startTime}</strong> has been officially confirmed by the administration.
                   </p>
               </div>
           </div>
        )}

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