package com.smartcampus.booking.controller;

import com.smartcampus.booking.dto.BookingCreateRequest;
import com.smartcampus.booking.dto.BookingResponse;
import com.smartcampus.booking.dto.BookingStatusUpdateRequest;
import com.smartcampus.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(
            @Valid @RequestBody BookingCreateRequest request,
            Authentication authentication,
            @RequestHeader(value = "X-User-Email", required = false) String fallbackEmail,
            @RequestHeader(value = "X-User-Name", required = false) String fallbackName
    ) {
        String userEmail = extractUserEmail(authentication, fallbackEmail);
        String userName = extractUserName(authentication, fallbackName);

        return bookingService.createBooking(request, userEmail, userName);
    }

    @GetMapping("/my")
    public List<BookingResponse> getMyBookings(
            Authentication authentication,
            @RequestHeader(value = "X-User-Email", required = false) String fallbackEmail
    ) {
        String userEmail = extractUserEmail(authentication, fallbackEmail);
        return bookingService.getMyBookings(userEmail);
    }

    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PatchMapping("/{bookingId}/approve")
    public BookingResponse approveBooking(
            @PathVariable String bookingId,
            @Valid @RequestBody BookingStatusUpdateRequest request
    ) {
        return bookingService.approveBooking(bookingId, request.getReason());
    }

    @PatchMapping("/{bookingId}/reject")
    public BookingResponse rejectBooking(
            @PathVariable String bookingId,
            @Valid @RequestBody BookingStatusUpdateRequest request
    ) {
        return bookingService.rejectBooking(bookingId, request.getReason());
    }

    @PatchMapping("/{bookingId}/cancel")
    public BookingResponse cancelBooking(
            @PathVariable String bookingId,
            @Valid @RequestBody BookingStatusUpdateRequest request,
            Authentication authentication,
            @RequestHeader(value = "X-User-Email", required = false) String fallbackEmail,
            @RequestHeader(value = "X-User-Role", required = false) String fallbackRole
    ) {
        String userEmail = extractUserEmail(authentication, fallbackEmail);
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().contains("ADMIN") || a.getAuthority().contains("ROLE_ADMIN"));
        
        if (!isAdmin && fallbackRole != null) {
            isAdmin = "ADMIN".equalsIgnoreCase(fallbackRole);
        }

        return bookingService.cancelBooking(bookingId, userEmail, isAdmin, request.getReason());
    }

    private String extractUserEmail(Authentication authentication, String fallbackEmail) {
        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }

        if (fallbackEmail != null && !fallbackEmail.isBlank()) {
            return fallbackEmail;
        }

        throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "User identity not available");
    }

    private String extractUserName(Authentication authentication, String fallbackName) {
        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }

        if (fallbackName != null && !fallbackName.isBlank()) {
            return fallbackName;
        }

        return "Unknown User";
    }
}