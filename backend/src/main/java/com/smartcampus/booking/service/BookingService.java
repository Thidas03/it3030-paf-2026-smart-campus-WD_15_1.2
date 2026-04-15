package com.smartcampus.booking.service;

import com.smartcampus.booking.dto.BookingCreateRequest;
import com.smartcampus.booking.dto.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(BookingCreateRequest request, String userEmail, String userName);

    List<BookingResponse> getMyBookings(String userEmail);

    List<BookingResponse> getAllBookings();

    BookingResponse approveBooking(String bookingId, String reason);

    BookingResponse rejectBooking(String bookingId, String reason);

    BookingResponse cancelBooking(String bookingId, String userEmail, boolean isAdmin, String reason);
}