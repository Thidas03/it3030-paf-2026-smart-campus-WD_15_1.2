package com.smartcampus.controller;

import com.smartcampus.model.Ticket;
import com.smartcampus.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/user/{userId}")
    public List<Ticket> getUserTickets(@PathVariable String userId) {
        return ticketService.getUserTickets(userId);
    }

    @PostMapping("/{id}/resolve")
    public Ticket resolveTicket(@PathVariable String id) {
        return ticketService.resolveTicket(id);
    }

    @PostMapping("/{id}/escalate")
    public Ticket escalateTicket(@PathVariable String id) {
        return ticketService.escalateTicket(id);
    }
}
