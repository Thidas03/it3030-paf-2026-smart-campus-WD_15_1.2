package com.smartcampus.booking.repository;

import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.model.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    List<Booking> findAllByOrderByCreatedAtDesc();

    List<Booking> findByResourceIdAndBookingDate(String resourceId, LocalDate bookingDate);

    List<Booking> findByStatusOrderByCreatedAtDesc(BookingStatus status);
}