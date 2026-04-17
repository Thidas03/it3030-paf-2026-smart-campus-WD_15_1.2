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

    @GetMapping("/technician/{technicianId}")
    public List<Ticket> getTechnicianTickets(@PathVariable String technicianId) {
        return ticketService.getTechnicianTickets(technicianId);
    }

    @PostMapping("/{id}/resolve")
    public Ticket resolveTicket(@PathVariable String id) {
        return ticketService.resolveTicket(id);
    }

    @PostMapping("/{id}/escalate")
    public Ticket escalateTicket(@PathVariable String id) {
        return ticketService.escalateTicket(id);
    }

    @PatchMapping("/{id}/status")
    public Ticket updateTicketStatus(@PathVariable String id, @RequestBody java.util.Map<String, String> updates) {
        return ticketService.updateTicketStatus(id, updates.get("status"));
    }

    @PatchMapping("/{id}/assign")
    public Ticket assignTechnician(@PathVariable String id, @RequestBody java.util.Map<String, String> updates) {
        return ticketService.assignTechnician(id, updates.get("technicianId"));
    }
}
