package com.smartcampus.controller;

import com.smartcampus.model.Notification;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) return ResponseEntity.status(401).build();
        
        return ResponseEntity.ok(notificationService.getUserNotifications(user.get().getId()));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Notification>> getAdminSystemNotifications(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        
        // Very basic mock check. Spring Security ideally handles the /api/admin/** prefix natively
        if (user.isEmpty() || user.get().getRolesAsString().stream().noneMatch(r -> r.equals("ADMIN"))) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(notificationService.getSystemNotifications());
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) return ResponseEntity.status(401).build();
        
        return ResponseEntity.ok(notificationService.getUnreadCount(user.get().getId()));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllRead(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            notificationService.markAllAsRead(user.get().getId());
        }
        return ResponseEntity.ok().build();
    }

    // Temporary endpoint to trigger a notification for testing
    @PostMapping("/test-trigger")
    public ResponseEntity<Notification> triggerTestNotification(
            @RequestParam String userId,
            @RequestParam String message,
            @RequestParam String type,
            @RequestParam String relatedId) {
        return ResponseEntity.ok(notificationService.createNotification(userId, message, type, relatedId));
    }
}
