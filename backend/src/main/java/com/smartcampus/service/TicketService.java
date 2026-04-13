package com.smartcampus.service;

import com.smartcampus.model.Ticket;
import com.smartcampus.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private GeminiService geminiService;

    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus("OPEN");
        ticket.setCreatedAt(LocalDateTime.now());
        
        // Get AI suggestion
        String suggestion = geminiService.getDiyFix(ticket.getDescription(), ticket.getLabName());
        ticket.setAiSuggestion(suggestion);
        ticket.setStatus("OPEN");
        
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getUserTickets(String userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Ticket resolveTicket(String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus("RESOLVED");
        return ticketRepository.save(ticket);
    }

    public Ticket escalateTicket(String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus("IN_PROGRESS");
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicketStatus(String id, String status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }
}
