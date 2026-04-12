package com.smartcampus.repository;

import com.smartcampus.model.Ticket;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class InMemoryTicketRepository implements TicketRepository {
    private final Map<String, Ticket> tickets = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(System.currentTimeMillis());

    @Override
    public Ticket save(Ticket ticket) {
        if (ticket.getId() == null || ticket.getId().isEmpty()) {
            ticket.setId(String.valueOf(idGenerator.incrementAndGet()));
        }
        tickets.put(ticket.getId(), ticket);
        return ticket;
    }

    @Override
    public List<Ticket> findAll() {
        return new ArrayList<>(tickets.values());
    }

    @Override
    public Optional<Ticket> findById(String id) {
        return Optional.ofNullable(tickets.get(id));
    }

    @Override
    public List<Ticket> findByUserId(String userId) {
        return tickets.values().stream()
                .filter(t -> userId.equals(t.getUserId()))
                .collect(Collectors.toList());
    }
}
