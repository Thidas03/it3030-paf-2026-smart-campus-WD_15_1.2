export default function BookingTable({
  bookings,
  isAdmin = false,
  onApprove,
  onReject,
  onCancel,
}) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-6 text-dark-muted backdrop-blur-xl">
        No bookings found.
      </div>
    );
  }

  const statusClasses = {
    PENDING: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    APPROVED: "bg-green-500/15 text-green-300 border-green-500/30",
    REJECTED: "bg-red-500/15 text-red-300 border-red-500/30",
    CANCELLED: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-dark-border bg-dark-card/70 p-4 backdrop-blur-xl">
      <table className="min-w-full text-sm text-dark-text">
        <thead>
          <tr className="border-b border-dark-border text-left text-dark-muted">
            <th className="px-4 py-3">Resource</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Purpose</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b border-dark-border/70 transition hover:bg-white/5"
            >
              <td className="px-4 py-4">
                <div className="font-medium">{booking.resourceName}</div>
                <div className="text-xs text-dark-muted">{booking.resourceId}</div>
              </td>

              <td className="px-4 py-4">{booking.userEmail}</td>
              <td className="px-4 py-4">{booking.bookingDate}</td>
              <td className="px-4 py-4">
                {booking.startTime} - {booking.endTime}
              </td>
              <td className="px-4 py-4">{booking.purpose}</td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    statusClasses[booking.status] || "bg-slate-500/15 text-slate-300 border-slate-500/30"
                  }`}
                >
                  {booking.status}
                </span>
              </td>

              <td className="px-4 py-4 text-dark-muted">
                {booking.adminReason || booking.cancelledReason || "-"}
              </td>

              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {isAdmin && booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => onApprove(booking.id)}
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => onReject(booking.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {(booking.status === "PENDING" || booking.status === "APPROVED") && (
                    <button
                      onClick={() => onCancel(booking.id)}
                      className="rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}