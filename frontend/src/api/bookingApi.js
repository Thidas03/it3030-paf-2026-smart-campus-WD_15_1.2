import axiosClient from "./axiosClient";

export const createBooking = async (bookingData) => {
    const response = await axiosClient.post("/api/bookings", bookingData);
    return response.data;
};

export const getMyBookings = async () => {
    const response = await axiosClient.get("/api/bookings/my");
    return response.data;
};

export const getAllBookings = async () => {
    const response = await axiosClient.get("/api/bookings");
    return response.data;
};

export const approveBooking = async (bookingId, reason) =>{
    const response = await axiosClient.patch(`/api/bookings/${bookingId}/approve`, {reason});
    return response.data;
};

export const rejectBooking = async (bookingId, reason) =>{
    const response = await axiosClient.patch(`/api/bookings/${bookingId}/reject`, {reason});
    return response.data;
};

export const cancelBooking = async (bookingId, reason) =>{
    const response = await axiosClient.patch(`/api/bookings/${bookingId}/cancel`, {reason});
    return response.data;
};