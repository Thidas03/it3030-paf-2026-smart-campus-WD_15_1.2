package com.smartcampus.booking.dto;

import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.model.BookingStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class BookingResponse {

    private String id;
    private String resourceId;
    private String resourceName;
    private String userEmail;
    private String userName;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String purpose;
    private Integer expectedAttendees;
    private BookingStatus status;
    private String adminReason;
    private String cancelledReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.id = booking.getId();
        response.resourceId = booking.getResourceId();
        response.resourceName = booking.getResourceName();
        response.userEmail = booking.getUserEmail();
        response.userName = booking.getUserName();
        response.bookingDate = booking.getBookingDate();
        response.startTime = booking.getStartTime();
        response.endTime = booking.getEndTime();
        response.purpose = booking.getPurpose();
        response.expectedAttendees = booking.getExpectedAttendees();
        response.status = booking.getStatus();
        response.adminReason = booking.getAdminReason();
        response.cancelledReason = booking.getCancelledReason();
        response.createdAt = booking.getCreatedAt();
        response.updatedAt = booking.getUpdatedAt();
        return response;
    }

    public String getId() {
        return id;
    }

    public String getResourceId() {
        return resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getPurpose() {
        return purpose;
    }

    public Integer getExpectedAttendees() {
        return expectedAttendees;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public String getAdminReason() {
        return adminReason;
    }

    public String getCancelledReason() {
        return cancelledReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}