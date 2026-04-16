import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import BookingForm from "../components/BookingForm";
import { createBooking } from "../api/bookingApi";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialResourceId = queryParams.get("resourceId") || "";
  const initialResourceName = queryParams.get("resourceName") || "";
  const initialBookingDate = queryParams.get("bookingDate") || "";
  const initialStartTime = queryParams.get("startTime") || "";
  const initialEndTime = queryParams.get("endTime") || "";

  const handleCreateBooking = async (formData) => {
    await createBooking(formData);
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] relative flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Layers className="h-64 w-64" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-muted hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Previous Page</span>
        </button>

        <BookingForm 
          onSubmit={handleCreateBooking} 
          initialResourceId={initialResourceId}
          initialResourceName={initialResourceName}
          initialBookingDate={initialBookingDate}
          initialStartTime={initialStartTime}
          initialEndTime={initialEndTime}
        />
      </div>
    </div>
  );
}