package com.smartcampus.booking.service;

import com.smartcampus.booking.dto.BookingCreateRequest;
import com.smartcampus.booking.dto.BookingResponse;
import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.model.BookingStatus;
import com.smartcampus.booking.repository.BookingRepository;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              NotificationService notificationService,
                              UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
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

        userRepository.findByEmail(userEmail).ifPresent(user -> {
            notificationService.createNotification(
                    user.getId(),
                    "Your booking request for " + request.getResourceName() + " has been submitted and is processing.",
                    "BOOKING",
                    saved.getId()
            );
        });

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
        Booking saved = bookingRepository.save(booking);

        userRepository.findByEmail(saved.getUserEmail()).ifPresent(user -> {
            notificationService.createNotification(
                    user.getId(),
                    "Your booking request for " + saved.getResourceName() + " has been APPROVED.",
                    "BOOKING",
                    saved.getId()
            );
        });

        return BookingResponse.fromEntity(saved);
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
        Booking saved = bookingRepository.save(booking);

        userRepository.findByEmail(saved.getUserEmail()).ifPresent(user -> {
            notificationService.createNotification(
                    user.getId(),
                    "Your booking request for " + saved.getResourceName() + " has been REJECTED.",
                    "BOOKING",
                    saved.getId()
            );
        });

        return BookingResponse.fromEntity(saved);
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
        Booking saved = bookingRepository.save(booking);

        userRepository.findByEmail(saved.getUserEmail()).ifPresent(user -> {
            notificationService.createNotification(
                    user.getId(),
                    "Your booking for " + saved.getResourceName() + " has been CANCELLED.",
                    "BOOKING",
                    saved.getId()
            );
        });

        return BookingResponse.fromEntity(saved);
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