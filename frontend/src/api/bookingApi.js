import axiosClient from "./axiosClient";

const studentHeaders = {
  "X-User-Email": "student@sliit.lk",
  "X-User-Name": "Student User",
  "X-User-Role": "USER",
};

const adminHeaders = {
  "X-User-Email": "admin@sliit.lk",
  "X-User-Name": "Admin User",
  "X-User-Role": "ADMIN",
};

export const createBooking = async (bookingData) => {
  const response = await axiosClient.post("/bookings", bookingData, {
    headers: studentHeaders,
  });
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosClient.get("/bookings/my", {
    headers: studentHeaders,
  });
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axiosClient.get("/bookings", {
    headers: adminHeaders,
  });
  return response.data;
};

export const approveBooking = async (bookingId, reason) => {
  const response = await axiosClient.patch(
    `/bookings/${bookingId}/approve`,
    { reason },
    { headers: adminHeaders }
  );
  return response.data;
};

export const rejectBooking = async (bookingId, reason) => {
  const response = await axiosClient.patch(
    `/bookings/${bookingId}/reject`,
    { reason },
    { headers: adminHeaders }
  );
  return response.data;
};

export const cancelBooking = async (bookingId, reason, asAdmin = false) => {
  const response = await axiosClient.patch(
    `/bookings/${bookingId}/cancel`,
    { reason },
    { headers: asAdmin ? adminHeaders : studentHeaders }
  );
  return response.data;
};