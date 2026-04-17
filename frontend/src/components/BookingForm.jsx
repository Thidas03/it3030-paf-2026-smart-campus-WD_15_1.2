import { useState, useEffect } from "react";
import { Settings, Calendar, Clock, Box, Users, AlignLeft } from "lucide-react";

export default function BookingForm({ 
  onSubmit, 
  initialResourceId = "", 
  initialResourceName = "",
  initialBookingDate = "",
  initialStartTime = "",
  initialEndTime = ""
}) {
  const [formData, setFormData] = useState({
    resourceId: initialResourceId,
    resourceName: initialResourceName,
    bookingDate: initialBookingDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    purpose: "",
    expectedAttendees: 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      resourceId: initialResourceId || prev.resourceId,
      resourceName: initialResourceName || prev.resourceName,
      bookingDate: initialBookingDate || prev.bookingDate,
      startTime: initialStartTime || prev.startTime,
      endTime: initialEndTime || prev.endTime,
    }));
  }, [initialResourceId, initialResourceName, initialBookingDate, initialStartTime, initialEndTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "expectedAttendees" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.resourceId ||
      !formData.resourceName ||
      !formData.bookingDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.purpose
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.endTime <= formData.startTime) {
      setError("End time must be later than start time.");
      return;
    }

    try {
      await onSubmit(formData);
      setSuccess("Booking request submitted successfully.");

      setFormData({
        resourceId: "",
        resourceName: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        expectedAttendees: 1,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit booking.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-white/5 bg-dark-bg/50 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-primary-400 flex-shrink-0">
          <Calendar className="h-8 w-8" />
        </div>
        <div>
          <div className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em] mb-1">
            Reservation System
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Resource Booking</h2>
          <p className="mt-1 text-sm text-slate-300">
            Submit a formal booking request for campus facilities or equipment.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-cyan-300">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-dark-muted">Resource ID</label>
          <input
            type="text"
            name="resourceId"
            value={formData.resourceId}
            onChange={handleChange}
            placeholder="e.g. LAB-101"
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-dark-muted">Resource Name</label>
          <input
            type="text"
            name="resourceName"
            value={formData.resourceName}
            onChange={handleChange}
            placeholder="e.g. Computer Lab A"
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-dark-muted">Booking Date</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-dark-muted">Expected Attendees</label>
          <input
            type="number"
            min="1"
            name="expectedAttendees"
            value={formData.expectedAttendees}
            onChange={handleChange}
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-dark-muted">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-dark-muted">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-dark-muted">Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            placeholder="Explain the purpose of this booking"
            className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-cyber hover:glow-primary px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit Booking Request
          </button>
        </div>
      </form>
    </div>
  );
}