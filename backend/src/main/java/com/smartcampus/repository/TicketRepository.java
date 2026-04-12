package com.smartcampus.repository;

import com.smartcampus.model.Ticket;
import java.util.List;
import java.util.Optional;

public interface TicketRepository {
    Ticket save(Ticket ticket);
    List<Ticket> findAll();
    Optional<Ticket> findById(String id);
    List<Ticket> findByUserId(String userId);
}
