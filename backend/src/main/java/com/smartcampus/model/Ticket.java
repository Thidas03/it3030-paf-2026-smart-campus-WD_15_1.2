package com.smartcampus.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String userId;
    private String labName;
    private String description;
    private String status; // PENDING, DIY_SUGGESTED, RESOLVED, ESCALATED
    private String priority; // LOW, MEDIUM, HIGH
    private String aiSuggestion;
    private LocalDateTime createdAt;
}
