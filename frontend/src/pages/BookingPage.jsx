import BookingForm from "../components/BookingForm";
import { createBooking } from "../api/bookingApi";

export default function BookingPage() {
    const handleCreatBooking = async (formData) => {
        await createBooking(formData);
    };

    return (
        <div className="min-h-screen bg-dark-bg px-6 py-10">
            <BookingForm onSubmit={handleCreatBooking} />
        </div>
    );
}