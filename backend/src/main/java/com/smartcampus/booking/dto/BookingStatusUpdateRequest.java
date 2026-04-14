package com.smartcampus.booking.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingStatusUpdateRequest {

    @NotBlank(message = "Reason is required")
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}