package com.smartcampus.booking.service;

import com.smartcampus.booking.dto.BookingCreateRequest;
import com.smartcampus.booking.dto.BookingResponse;
import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.model.BookingStatus;
import com.smartcampus.booking.repository.BookingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public BookingResponse createBooking(BookingCreateRequest request, String userEmail, String userName) {
        validateTimeRange(request.getStartTime(), request.getEndTime());

        boolean conflictExists = bookingRepository
                .findByResourceIdAndBookingDate(request.getResourceId(), request.getBookingDate())
                .stream()
                .filter(existing -> existing.getStatus() == BookingStatus.PENDING
                        || existing.getStatus() == BookingStatus.APPROVED)
                .anyMatch(existing ->
                        request.getStartTime().isBefore(existing.getEndTime()) &&
                        request.getEndTime().isAfter(existing.getStartTime())
                );

        if (conflictExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Booking conflict: The resource is already booked for the selected time slot."
            );
        }

        Booking booking = new Booking();
        booking.setResourceId(request.getResourceId());
        booking.setResourceName(request.getResourceName());
        booking.setUserEmail(userEmail);
        booking.setUserName(userName);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setPurpose(request.getPurpose());
        booking.setExpectedAttendees(request.getExpectedAttendees());
        booking.setStatus(BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);
        return BookingResponse.fromEntity(saved);
    }

    @Override
    public List<BookingResponse> getMyBookings(String userEmail) {
        return bookingRepository.findByUserEmailOrderByCreatedAtDesc(userEmail)
                .stream()
                .map(BookingResponse::fromEntity)
                .toList();
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(BookingResponse::fromEntity)
                .toList();
    }

    @Override
    public BookingResponse approveBooking(String bookingId, String reason) {
        Booking booking = getBookingOrThrow(bookingId);

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only pending bookings can be approved."
            );
        }

        boolean conflictExists = bookingRepository
                .findByResourceIdAndBookingDate(booking.getResourceId(), booking.getBookingDate())
                .stream()
                .filter(existing -> !existing.getId().equals(booking.getId()))
                .filter(existing -> existing.getStatus() == BookingStatus.APPROVED)
                .anyMatch(existing ->
                        booking.getStartTime().isBefore(existing.getEndTime()) &&
                        booking.getEndTime().isAfter(existing.getStartTime())
                );

        if (conflictExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot approve booking because another approved booking overlaps with this time."
            );
        }

        booking.setStatus(BookingStatus.APPROVED);
        booking.setAdminReason(reason);
        return BookingResponse.fromEntity(bookingRepository.save(booking));
    }

    @Override
    public BookingResponse rejectBooking(String bookingId, String reason) {
        Booking booking = getBookingOrThrow(bookingId);

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only pending bookings can be rejected."
            );
        }

        booking.setStatus(BookingStatus.REJECTED);
        booking.setAdminReason(reason);
        return BookingResponse.fromEntity(bookingRepository.save(booking));
    }

    @Override
    public BookingResponse cancelBooking(String bookingId, String userEmail, boolean isAdmin, String reason) {
        Booking booking = getBookingOrThrow(bookingId);

        boolean owner = booking.getUserEmail().equalsIgnoreCase(userEmail);

        if (!owner && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to cancel this booking");
        }

        if (booking.getStatus() == BookingStatus.REJECTED || booking.getStatus() == BookingStatus.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This booking cannot be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancelledReason(reason);

        return BookingResponse.fromEntity(bookingRepository.save(booking));
    }

    private Booking getBookingOrThrow(String bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
    }

    private void validateTimeRange(LocalTime start, LocalTime end) {
        if (start == null || end == null || !end.isAfter(start)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }
    }
}